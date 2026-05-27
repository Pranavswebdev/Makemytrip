import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  reporter: [["html", { outputFolder: "playwright-report" }], ["list"]],
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:4321",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    // ── Desktop engines (chromium, firefox, webkit) ──
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },

    // ── Mobile viewports ──
    { name: "mobile-chrome", use: { ...devices["Pixel 5"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 14"] } },
  ],
  // Port 5173 is occupied by the DevMind harness; serve the app on its own port.
  webServer: {
    command: "npm run dev -- --port 4321 --strictPort",
    url: "http://localhost:4321",
    reuseExistingServer: false,
    timeout: 120000,
  },
});
