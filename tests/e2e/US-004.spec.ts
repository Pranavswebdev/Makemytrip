import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).disableRules([
    "color-contrast",
  ]);

test.describe("US-004 — Log In", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("AC: renders logo, heading, email/password fields and Login button", async ({
    page,
  }) => {
    await expect(page.getByRole("heading", { name: "Log In" })).toBeVisible();
    await expect(page.getByLabel("Your Email")).toBeVisible();
    await expect(page.getByLabel("Your Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("AC: Forget Password control is present", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /forget password/i }),
    ).toBeVisible();
  });

  test("AC: a link to Sign Up is available", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();
  });

  test("AC: mock Google and Apple buttons are present", async ({ page }) => {
    await expect(page.getByRole("button", { name: /Google/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Apple/i })).toBeVisible();
  });

  test("AC: email format is validated", async ({ page }) => {
    await page.getByLabel("Your Email").fill("nope");
    await page.getByLabel("Your Password").click();
    await expect(
      page.getByText(/please enter a valid email address/i),
    ).toBeVisible();
  });

  test("AC: successful login with seed credentials routes to Home", async ({
    page,
  }) => {
    await page.getByLabel("Your Email").fill("demo@jiva.com");
    await page.getByLabel("Your Password").fill("password123");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL(/\/home/);
  });

  test("AC: Sign Up link navigates to the sign-up screen", async ({ page }) => {
    await page.getByRole("button", { name: "Sign Up" }).click();
    await expect(page).toHaveURL(/\/signup/);
  });

  test("negative: invalid credentials show an inline error", async ({
    page,
  }) => {
    await page.getByLabel("Your Email").fill("wrong@user.com");
    await page.getByLabel("Your Password").fill("wrongpass");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText(/invalid email or password/i)).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test("boundary: Login stays disabled until both fields are valid", async ({
    page,
  }) => {
    await expect(page.getByRole("button", { name: "Login" })).toBeDisabled();
    await page.getByLabel("Your Email").fill("demo@jiva.com");
    await expect(page.getByRole("button", { name: "Login" })).toBeDisabled();
    await page.getByLabel("Your Password").fill("password123");
    await expect(page.getByRole("button", { name: "Login" })).toBeEnabled();
  });

  test("a11y: Log In screen has no WCAG A/AA violations", async ({ page }) => {
    const results = await axe(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
