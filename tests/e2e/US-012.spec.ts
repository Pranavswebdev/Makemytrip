import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).disableRules([
    "color-contrast",
  ]);

test.describe("US-012 — Booking Success", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/booking/success");
  });

  test("AC: shows the confirmation heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /booking confirmed/i }),
    ).toBeVisible();
  });

  test("AC: shows the confirmation subtitle", async ({ page }) => {
    await expect(page.getByText(/confirmation email has been sent/i)).toBeVisible();
  });

  test("AC: displays a booking total in Rs", async ({ page }) => {
    await expect(page.getByText(/Rs\s?15,000/)).toBeVisible();
  });

  test("AC: Back returns the user to Home", async ({ page }) => {
    await page.getByRole("button", { name: /back to home/i }).click();
    await expect(page).toHaveURL(/\/home/);
    await expect(
      page.getByRole("heading", { name: "Popular Spaces" }),
    ).toBeVisible();
  });

  test("boundary: layout does not overflow horizontally at 393px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto("/booking/success");
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("a11y: Booking Success has no WCAG A/AA violations", async ({ page }) => {
    const results = await axe(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
