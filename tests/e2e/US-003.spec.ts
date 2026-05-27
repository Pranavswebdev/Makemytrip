import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).disableRules([
    "color-contrast",
  ]);

const otp = (page: Page) => page.locator('input[maxlength="1"]');

test.describe("US-003 — Email Verification Code", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/verify");
  });

  test("AC: renders heading and four single-digit inputs", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /verification code/i }),
    ).toBeVisible();
    await expect(otp(page)).toHaveCount(4);
  });

  test("AC: Continue is disabled until all four digits are filled", async ({
    page,
  }) => {
    await expect(page.getByRole("button", { name: "Continue" })).toBeDisabled();
    for (let i = 0; i < 4; i++) await otp(page).nth(i).fill(String(i + 1));
    await expect(page.getByRole("button", { name: "Continue" })).toBeEnabled();
  });

  test("AC: entering a digit auto-advances focus to the next box", async ({
    page,
  }) => {
    await otp(page).first().fill("1");
    await expect(otp(page).nth(1)).toBeFocused();
  });

  test("AC: backspace on an empty box moves focus to the previous box", async ({
    page,
  }) => {
    await otp(page).first().fill("1");
    await otp(page).nth(1).press("Backspace");
    await expect(otp(page).first()).toBeFocused();
  });

  test("AC: a valid 4-digit code advances into the app (Home)", async ({
    page,
  }) => {
    for (let i = 0; i < 4; i++) await otp(page).nth(i).fill(String(i + 1));
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page).toHaveURL(/\/home/);
  });

  test("AC: Resend shows a confirmation toast", async ({ page }) => {
    await page.getByRole("button", { name: "Resend" }).click();
    await expect(page.getByText(/code resent/i)).toBeVisible();
  });

  test("AC: Go Back returns to the previous auth screen", async ({ page }) => {
    // Arrive at verify through the real signup flow so history has a prior entry.
    await page.goto("/signup");
    await page.getByLabel("Your Email").fill("new@user.com");
    await page.getByLabel("Your Password", { exact: true }).fill("password123");
    await page.getByLabel("Re-Enter Password").fill("password123");
    await page.getByRole("button", { name: "Sign Up" }).click();
    await expect(page).toHaveURL(/\/verify/);
    await page.getByRole("button", { name: "Go Back" }).click();
    await expect(page).toHaveURL(/\/signup/);
  });

  test("negative: a non-numeric key does not populate a box", async ({
    page,
  }) => {
    await otp(page).first().press("a");
    await expect(otp(page).first()).toHaveValue("");
  });

  test("boundary: three of four digits keeps Continue disabled", async ({
    page,
  }) => {
    for (let i = 0; i < 3; i++) await otp(page).nth(i).fill(String(i + 1));
    await expect(page.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  test("a11y: verification screen has no WCAG A/AA violations", async ({
    page,
  }) => {
    const results = await axe(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
