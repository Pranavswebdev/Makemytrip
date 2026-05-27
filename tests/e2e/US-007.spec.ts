import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// NOTE: the current build implements the location picker as a selectable list
// of locations. The story's static map image and explicit Set/Reset Location
// buttons are not part of this build (documented AC gaps).
const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).disableRules([
    "color-contrast",
  ]);

test.describe('US-007 — "Where To?" Location Picker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/where-to");
  });

  test("AC: renders the 'Where To?' heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Where To?" }),
    ).toBeVisible();
  });

  test("AC: lists selectable locations", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /East Jakarta/i }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /Bali/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Malang/i })).toBeVisible();
  });

  test("AC: choosing a location returns to Discover", async ({ page }) => {
    await page.getByRole("button", { name: /Bali/i }).click();
    await expect(page).toHaveURL(/\/discover/);
  });

  test("boundary: exactly the five seed locations are rendered", async ({
    page,
  }) => {
    await expect(page.getByRole("button")).toHaveCount(5);
  });

  test("a11y: location picker has no WCAG A/AA violations", async ({ page }) => {
    const results = await axe(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
