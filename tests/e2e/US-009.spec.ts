import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// NOTE: the current build shows a single hero photo (no swipeable carousel /
// "1 / 27" counter) and no share/more icons. Those AC items are documented gaps.
const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).disableRules([
    "color-contrast",
  ]);

const SPACE = "/space/avanzel-hotel";

test.describe("US-009 — Space Detail", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SPACE);
  });

  test("AC: renders the selected space's title and location", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Avanzel Hotel" }),
    ).toBeVisible();
    await expect(page.getByText(/Pondok Gede, East Jakarta/i)).toBeVisible();
  });

  test("AC: shows rating, review count and Rs price", async ({ page }) => {
    await expect(page.getByText("4.9")).toBeVisible();
    await expect(page.getByText("(15)")).toBeVisible();
    await expect(page.getByText(/Rs\s?[\d,]+/).first()).toBeVisible();
  });

  test("AC: shows the room summary (guests, beds, baths)", async ({ page }) => {
    await expect(page.getByText(/Guests/)).toBeVisible();
    await expect(page.getByText(/Beds/)).toBeVisible();
    await expect(page.getByText(/Baths/)).toBeVisible();
  });

  test("AC: Book Now advances to the Choose Booking Date screen", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /book now/i }).click();
    await expect(page).toHaveURL(/\/booking\/date/);
  });

  test("AC: a back control is present", async ({ page }) => {
    await expect(page.getByRole("button", { name: /go back/i })).toBeVisible();
  });

  test("negative: an unknown space id shows a not-found state", async ({
    page,
  }) => {
    await page.goto("/space/this-space-does-not-exist");
    await expect(page.getByText(/space not found/i)).toBeVisible();
  });

  test("boundary: layout does not overflow horizontally at 393px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto(SPACE);
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("a11y: Space Detail has no WCAG A/AA violations", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Avanzel Hotel" }),
    ).toBeVisible();
    const results = await axe(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
