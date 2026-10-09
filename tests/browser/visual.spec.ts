import { test } from "@playwright/test";

for (const viewport of [
  { name: "desktop", width: 1440, height: 960 },
  { name: "mobile", width: 390, height: 844 },
]) {
  test(`${viewport.name}: capture product and company storytelling`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const region of [
      { route: "/", selector: ".featured-section", name: "featured" },
      { route: "/", selector: ".vision-section", name: "vision" },
      {
        route: "/products/opero",
        selector: ".platform-diagram",
        name: "platform",
      },
      {
        route: "/products/opero",
        selector: ".early-access-section",
        name: "early-access",
      },
      { route: "/contact", selector: ".lead-form", name: "contact-form" },
    ]) {
      await page.goto(region.route);
      // Isolated section captures omit fixed page chrome to prevent it covering the region.
      await page.addStyleTag({
        content: ".site-header, .skip-link { visibility: hidden !important; }",
      });
      await page.locator(region.selector).scrollIntoViewIfNeeded();
      await page.locator(region.selector).screenshot({
        path: `.impeccable/review/${viewport.name}-${region.name}.png`,
        animations: "disabled",
      });
    }
  });
}
