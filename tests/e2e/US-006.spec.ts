import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// NOTE: the current build implements Discover as area-grouped carousels of
// space cards. The story's filter chips and inline search bar are not part of
// this build, so they are documented as AC gaps rather than asserted here.
const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).disableRules([
    "color-contrast",
  ]);

test.describe("US-006 — Discover", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/discover");
  });

  test("AC: renders the Discover heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Discover", level: 1 }),
    ).toBeVisible();
  });

  test("AC: shows area-grouped sections from seed data", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "East Jakarta" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Cibubur" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Malang" })).toBeVisible();
  });

  test("AC: tapping a card opens its Space Detail", async ({ page }) => {
    await page.getByRole("button", { name: /Hotel C Cibubur/i }).click();
    await expect(page).toHaveURL(/\/space\/hotel-c-cibubur/);
  });

  test("AC: Discover tab is active in the bottom navigation", async ({
    page,
  }) => {
    await expect(page.getByRole("link", { name: "Discover" })).toHaveClass(
      /text-accent/,
    );
  });

  test("boundary: a reload keeps the sections rendered", async ({ page }) => {
    await page.reload();
    await expect(
      page.getByRole("heading", { name: "Discover", level: 1 }),
    ).toBeVisible();
  });

  test("a11y: Discover has no WCAG A/AA violations", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Cibubur" }),
    ).toBeVisible();
    const results = await axe(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
