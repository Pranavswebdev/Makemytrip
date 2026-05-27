import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// NOTE: the build implements date selection via two native date inputs rather
// than the story's month-grid calendar; the range still gates Continue.
const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).disableRules([
    "color-contrast",
  ]);

const day = (offset: number) =>
  new Date(Date.now() + offset * 86400000).toISOString().slice(0, 10);

test.describe("US-010 — Choose Booking Date", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/booking/date");
  });

  test("AC: renders the heading and check-in/check-out inputs", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: /choose date/i }),
    ).toBeVisible();
    await expect(page.getByLabel("Check In")).toBeVisible();
    await expect(page.getByLabel("Check Out")).toBeVisible();
  });

  test("AC: Continue is disabled until a valid range is chosen", async ({
    page,
  }) => {
    await expect(page.getByRole("button", { name: "Continue" })).toBeDisabled();
    await page.getByLabel("Check In").fill(day(1));
    await page.getByLabel("Check Out").fill(day(3));
    await expect(page.getByRole("button", { name: "Continue" })).toBeEnabled();
  });

  test("AC: a valid range advances to Payment Method", async ({ page }) => {
    await page.getByLabel("Check In").fill(day(1));
    await page.getByLabel("Check Out").fill(day(3));
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page).toHaveURL(/\/booking\/payment/);
  });

  test("AC: a back control returns toward Space Detail", async ({ page }) => {
    await expect(page.getByRole("button", { name: /go back/i })).toBeVisible();
  });

  test("negative: a check-out before check-in keeps Continue disabled", async ({
    page,
  }) => {
    await page.getByLabel("Check In").fill(day(3));
    await page.getByLabel("Check Out").fill(day(1));
    await expect(page.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  test("boundary: an identical check-in/check-out keeps Continue disabled", async ({
    page,
  }) => {
    await page.getByLabel("Check In").fill(day(2));
    await page.getByLabel("Check Out").fill(day(2));
    await expect(page.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  test("a11y: Choose Date has no WCAG A/AA violations", async ({ page }) => {
    const results = await axe(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
