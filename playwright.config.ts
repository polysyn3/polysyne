import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:3100",
    headless: true,
    launchOptions: {
      ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
        ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
        : {}),
    },
    trace: "retain-on-failure",
  },
  ...(process.env.TEST_BASE_URL
    ? {}
    : {
        webServer: {
          command: "bun run start --port 3100",
          url: "http://127.0.0.1:3100",
          reuseExistingServer: false,
          timeout: 30000,
        },
      }),
});
