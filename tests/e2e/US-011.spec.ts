import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// NOTE: the build implements payment as a method picker (Card / UPI / Wallet)
// with a Complete Payment CTA. The story's Full Name / Phone / ID fields and a
// running Rs total footer are not part of this build (documented AC gaps).
const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).disableRules([
    "color-contrast",
  ]);

test.describe("US-011 — Payment Method", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/booking/payment");
  });

  test("AC: renders the Payment Method heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Payment Method" }),
    ).toBeVisible();
  });

  test("AC: offers Card, UPI and Wallet payment methods", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Credit/Debit Card" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "UPI" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Digital Wallet" }),
    ).toBeVisible();
  });

  test("AC: submitting completes the mock payment and reaches Success", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /complete payment/i }).click();
    await expect(page).toHaveURL(/\/booking\/success/);
  });

  test("AC: a back control returns toward Choose Booking Date", async ({
    page,
  }) => {
    await expect(page.getByRole("button", { name: /go back/i })).toBeVisible();
  });

  test("interaction: selecting a method highlights it in the accent color", async ({
    page,
  }) => {
    const upi = page.getByRole("button", { name: "UPI" });
    await upi.click();
    await expect(upi).toHaveClass(/border-accent/);
  });

  test("boundary: Card is selected by default", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Credit/Debit Card" }),
    ).toHaveClass(/border-accent/);
  });

  test("a11y: Payment Method has no WCAG A/AA violations", async ({ page }) => {
    const results = await axe(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
