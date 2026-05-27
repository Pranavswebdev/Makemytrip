import { test, expect } from "@playwright/test";

test.describe("smoke — app shell", () => {
  test("index redirects to the Log In screen", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Log In" })).toBeVisible();
  });

  test("logging in with seed credentials reaches Home", async ({ page }) => {
    await page.goto("/login");
    await page.getByPlaceholder("example@gmail.com").fill("demo@jiva.com");
    await page.getByPlaceholder("123@!#").fill("password123");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Popular Spaces")).toBeVisible();
  });
});
