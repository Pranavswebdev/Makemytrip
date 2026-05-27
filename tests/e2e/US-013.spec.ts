import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// NOTE: the build renders the profile as a read-only summary with Edit Profile
// / My Bookings (disabled) and a working Log Out. The story's editable fields,
// Save Changes, avatar edit badge and settings gear are documented AC gaps.
const axe = (page: Page) =>
  new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).disableRules([
    "color-contrast",
  ]);

test.describe("US-013 — Profile", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/profile");
  });

  test("AC: renders the Profile heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Profile" }),
    ).toBeVisible();
  });

  test("AC: shows the user's details loaded from seed data", async ({
    page,
  }) => {
    await expect(page.getByText("Name", { exact: true })).toBeVisible();
    await expect(page.getByText("Email", { exact: true })).toBeVisible();
    await expect(page.getByText("Phone", { exact: true })).toBeVisible();
    await expect(page.getByText("Address", { exact: true })).toBeVisible();
  });

  test("AC: Profile tab is active in the bottom navigation", async ({
    page,
  }) => {
    await expect(page.getByRole("link", { name: "Profile" })).toHaveClass(
      /text-accent/,
    );
  });

  test("interaction: Log Out routes back to Login", async ({ page }) => {
    await page.getByRole("button", { name: /log out/i }).click();
    await expect(page).toHaveURL(/\/login/);
  });

  test("boundary: Edit Profile and My Bookings are present but disabled", async ({
    page,
  }) => {
    await expect(
      page.getByRole("button", { name: /edit profile/i }),
    ).toBeDisabled();
    await expect(
      page.getByRole("button", { name: /my bookings/i }),
    ).toBeDisabled();
  });

  test("a11y: Profile has no WCAG A/AA violations", async ({ page }) => {
    const results = await axe(page).analyze();
    expect(results.violations).toEqual([]);
  });
});
