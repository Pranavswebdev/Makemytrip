import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).disableRules([
    "color-contrast",
  ]);

test.describe("US-005 — Home / Popular Spaces", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/home");
  });

  test("AC: header has notification bell and a search entry point", async ({
    page,
  }) => {
    await expect(
      page.getByRole("button", { name: /notifications/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /search spaces/i }),
    ).toBeVisible();
  });

  test("AC: Popular Spaces section renders seed cards with Rs pricing", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Popular Spaces" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Avanzel Hotel/i }),
    ).toBeVisible();
    await expect(page.getByText(/Rs\s?[\d,]+/).first()).toBeVisible();
  });

  test("AC: tapping the search bar opens Search", async ({ page }) => {
    await page.getByRole("button", { name: /search spaces/i }).click();
    await expect(page).toHaveURL(/\/search/);
  });

  test("AC: tapping a space card opens its detail page", async ({ page }) => {
    await page.getByRole("button", { name: /Avanzel Hotel/i }).click();
    await expect(page).toHaveURL(/\/space\/avanzel-hotel/);
  });

  test("AC: the 'Where To?' selector opens the location picker", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /where to/i }).click();
    await expect(page).toHaveURL(/\/where-to/);
  });

  test("AC: Home tab is active in the bottom navigation", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Home" })).toHaveClass(
      /text-accent/,
    );
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

  test("a11y: Home has no WCAG A/AA violations", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Popular Spaces" }),
    ).toBeVisible();
    const results = await axe(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
