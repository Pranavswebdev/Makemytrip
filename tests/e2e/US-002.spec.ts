import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).disableRules([
    "color-contrast",
  ]);

const fill = async (page: Page, email: string, pw: string, confirm: string) => {
  await page.getByLabel("Your Email").fill(email);
  await page.getByLabel("Your Password", { exact: true }).fill(pw);
  await page.getByLabel("Re-Enter Password").fill(confirm);
};

test.describe("US-002 — Sign Up", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signup");
  });

  test("AC: renders logo, heading and all form fields", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Sign Up" }),
    ).toBeVisible();
    await expect(page.getByLabel("Your Email")).toBeVisible();
    await expect(
      page.getByLabel("Your Password", { exact: true }),
    ).toBeVisible();
    await expect(page.getByLabel("Re-Enter Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();
  });

  test("AC: mock Google and Apple buttons are present", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /Google/i }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /Apple/i })).toBeVisible();
  });

  test("AC: email field validates basic email format", async ({ page }) => {
    await page.getByLabel("Your Email").fill("not-an-email");
    await page.getByLabel("Your Password", { exact: true }).click();
    await expect(
      page.getByText(/please enter a valid email address/i),
    ).toBeVisible();
  });

  test("AC: Sign Up is disabled until inputs are valid", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Sign Up" })).toBeDisabled();
    await fill(page, "new@user.com", "password123", "password123");
    await expect(page.getByRole("button", { name: "Sign Up" })).toBeEnabled();
  });

  test("AC: valid submission advances to the verification screen", async ({
    page,
  }) => {
    await fill(page, "new@user.com", "password123", "password123");
    await page.getByRole("button", { name: "Sign Up" }).click();
    await expect(page).toHaveURL(/\/verify/);
    await expect(
      page.getByRole("heading", { name: /verification code/i }),
    ).toBeVisible();
  });

  test("AC: 'Already Has An Account?' navigates to Login", async ({ page }) => {
    await page.getByRole("button", { name: /already has an account/i }).click();
    await expect(page).toHaveURL(/\/login/);
  });

  test("negative: mismatched passwords are blocked with a message", async ({
    page,
  }) => {
    await fill(page, "new@user.com", "password123", "different456");
    await expect(page.getByText(/passwords don't match/i)).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Up" })).toBeDisabled();
  });

  test("boundary: an XSS-style payload in email is treated as invalid", async ({
    page,
  }) => {
    await page.getByLabel("Your Email").fill("<script>alert(1)</script>");
    await page.getByLabel("Your Password", { exact: true }).click();
    await expect(
      page.getByText(/please enter a valid email address/i),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Up" })).toBeDisabled();
  });

  test("a11y: Sign Up screen has no WCAG A/AA violations", async ({ page }) => {
    const results = await axe(page).analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("US-002 — Sign Up (mobile)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("mobile: form fits without horizontal overflow", async ({ page }) => {
    await page.goto("/signup");
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });
});
