import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync } from "node:fs";

const routes = ["/", "/products", "/products/opero", "/about", "/contact"];
const sizes = [
  { name: "desktop", width: 1440, height: 960 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];
mkdirSync(".impeccable/review", { recursive: true });

for (const size of sizes)
  for (const route of routes)
    test(`${size.name}: ${route} renders accessibly without overflow`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.emulateMedia({ reducedMotion: "reduce" });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main h1")).toHaveCount(1);
      await expect(
        page.getByRole("link", { name: "Polysyne home", exact: true }).first(),
      ).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(new URL(canonical!).pathname).toBe(route);
      await page.screenshot({
        path: `.impeccable/review/${size.name}${route === "/" ? "" : route.replaceAll("/", "-")}.png`,
        animations: "disabled",
      });
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        accessibility.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
      expect(errors).toEqual([]);
      await page.screenshot({
        path: `.impeccable/review/${size.name}${route === "/" ? "" : route.replaceAll("/", "-")}.png`,
        animations: "disabled",
      });
    });

test("mobile navigation traps focus, supports Escape, and navigates", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() =>
        document.querySelector("dialog")?.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(dialog).not.toBeVisible();
});
test("dashboard switches all conceptual views with keyboard", async ({
  page,
}) => {
  await page.goto("/products/opero");
  const dashboard = page.locator(".dashboard-wrap");
  await dashboard.scrollIntoViewIfNeeded();
  await expect(dashboard).toContainText("Sample data");
  for (const label of ["Workflows", "Schedule", "Customers", "Overview"]) {
    const button = dashboard.getByRole("button", { name: label });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(button).toHaveAttribute("aria-pressed", "true");
  }
});
test("contact validates accessibly and never fakes disconnected submission", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByLabel("Name", { exact: false }).first()).toBeFocused();
  await expect(page.locator(".field-error")).toHaveCount(5);
  await page.getByLabel("Name", { exact: false }).first().fill("Alex Morgan");
  await page.getByLabel("Email", { exact: false }).fill("alex@example.test");
  await page.getByLabel("Inquiry type").selectOption("Business Inquiry");
  await page
    .getByLabel("Message")
    .fill("We would like to learn more about your platform.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.locator(".form-failure")).toContainText(
    "have not been submitted",
  );
  await expect(page.locator(".form-success")).toHaveCount(0);
  await expect(page.getByLabel("Email", { exact: false })).toHaveValue(
    "alex@example.test",
  );
});
test("early access validates business fields and consent", async ({ page }) => {
  await page.goto("/products/opero#early-access");
  await page.getByRole("button", { name: "Register my interest" }).click();
  await expect(page.locator(".field-error")).toHaveCount(7);
  await expect(page.getByLabel("Business name")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByLabel("Industry", { exact: false })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByLabel("Business size")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
});
test("successful UI state requires an explicit accepted response", async ({
  page,
}) => {
  // Test the connected form in a build with LEAD_API_URL; disconnected builds stay honest.
  await page.goto("/contact");
  test.skip(
    (await page.locator(".form-notice").count()) > 0,
    "Backend intentionally unconfigured in this build.",
  );
  let attempt = 0;
  await page.route("**/api/leads", async (route) => {
    attempt++;
    if (attempt === 1)
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ accepted: false }),
      });
    else {
      await new Promise((resolve) => setTimeout(resolve, 400));
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ accepted: true }),
      });
    }
  });
  await page.getByLabel("Name", { exact: false }).first().fill("Alex Morgan");
  await page.getByLabel("Email", { exact: false }).fill("alex@example.test");
  await page.getByLabel("Inquiry type").selectOption("General Inquiry");
  await page
    .getByLabel("Message")
    .fill("A test inquiry for the acceptance flow.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.locator(".form-failure")).toContainText("couldn't send");
  await expect(page.getByLabel("Email", { exact: false })).toHaveValue(
    "alex@example.test",
  );
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(
    page.getByRole("button", { name: "Sending your details" }),
  ).toBeDisabled();
  await expect(page.locator(".form-success")).toBeVisible();
  await page.getByRole("button", { name: "Send another inquiry" }).click();
  await expect(page.getByLabel("Email", { exact: false })).toHaveValue("");
});
test("SEO endpoints, share images, missing page, and security headers", async ({
  request,
}) => {
  const response = await request.get("/");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  const image = await request.get("/api/og?page=/products/opero");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  expect((await request.get("/a-page-that-does-not-exist")).status()).toBe(404);
});
