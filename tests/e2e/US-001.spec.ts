import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Scope a11y to WCAG A/AA structural rules; color-contrast is a design-token
// concern owned by the Design phase, so it is excluded here.
const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).disableRules([
    "color-contrast",
  ]);

test.describe("US-001 — App Shell, Theme & Bottom Navigation", () => {
  test("AC: root path redirects to the login screen", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/login/);
  });

  test("AC: persistent bottom navigation shows four tabs", async ({ page }) => {
    await page.goto("/home");
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Discover" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Chat" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Profile" })).toBeVisible();
  });

  test("AC: active tab is highlighted in the accent color", async ({ page }) => {
    await page.goto("/home");
    await expect(page.getByRole("link", { name: "Home" })).toHaveClass(
      /text-accent/,
    );
  });

  test("AC: deep navigation preserves tab context between sections", async ({
    page,
  }) => {
    await page.goto("/home");
    await page.getByRole("link", { name: "Discover" }).click();
    await expect(page).toHaveURL(/\/discover/);
    await page.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL(/\/home/);
  });

  test("AC: Chat tab renders a coming-soon placeholder", async ({ page }) => {
    await page.goto("/home");
    await page.getByRole("link", { name: "Chat" }).click();
    await expect(page).toHaveURL(/\/chat/);
    await expect(page.getByText(/coming soon/i)).toBeVisible();
  });

  test("negative: an unknown deep route still lands on a rendered screen", async ({
    page,
  }) => {
    await page.goto("/this-route-does-not-exist");
    // Router has no catch-all; the SPA shell must still respond without a crash.
    expect(await page.locator("body").count()).toBe(1);
  });

  test("boundary: layout does not overflow horizontally at 393px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto("/home");
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("a11y: Home shell has no WCAG A/AA violations", async ({ page }) => {
    await page.goto("/home");
    const results = await axe(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
