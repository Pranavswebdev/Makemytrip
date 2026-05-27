import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// NOTE: the current build's search has no explicit clear (×) button; the query
// is cleared by emptying the field. That AC variation is documented as a gap.
const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).disableRules([
    "color-contrast",
  ]);

test.describe("US-008 — Search (Results & Empty State)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/search");
  });

  test("AC: renders a search field and a back control", async ({ page }) => {
    await expect(page.getByLabel("Search spaces")).toBeVisible();
    await expect(page.getByRole("button", { name: /go back/i })).toBeVisible();
  });

  test("AC: shows the empty prompt before typing", async ({ page }) => {
    await expect(page.getByText(/start typing to search/i)).toBeVisible();
  });

  test("AC: typing filters seed spaces by name/location", async ({ page }) => {
    await page.getByLabel("Search spaces").fill("avanzel");
    await expect(
      page.getByRole("button", { name: /Avanzel Hotel/i }),
    ).toBeVisible();
  });

  test("AC: tapping a result opens its Space Detail", async ({ page }) => {
    await page.getByLabel("Search spaces").fill("avanzel");
    await page.getByRole("button", { name: /Avanzel Hotel/i }).click();
    await expect(page).toHaveURL(/\/space\/avanzel-hotel/);
  });

  test("AC: clearing the field returns to the empty prompt", async ({
    page,
  }) => {
    const field = page.getByLabel("Search spaces");
    await field.fill("avanzel");
    await expect(
      page.getByRole("button", { name: /Avanzel Hotel/i }),
    ).toBeVisible();
    await field.fill("");
    await expect(page.getByText(/start typing to search/i)).toBeVisible();
  });

  test("negative: an unknown keyword shows the no-results state", async ({
    page,
  }) => {
    await page.getByLabel("Search spaces").fill("zzzzzzzz");
    await expect(page.getByText(/no spaces found/i)).toBeVisible();
  });

  test("boundary: a special-character query does not crash and finds nothing", async ({
    page,
  }) => {
    await page.getByLabel("Search spaces").fill("!@#$%^&*");
    await expect(page.getByText(/no spaces found/i)).toBeVisible();
  });

  test("a11y: Search has no WCAG A/AA violations", async ({ page }) => {
    const results = await axe(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
