import { test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("axe probe - login", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("heading", { name: "Log In" }).waitFor();
  const r = await new AxeBuilder({ page }).analyze();
  console.log(
    "LOGIN violations:\n" +
      r.violations.map((v) => `${v.id} [${v.impact}] x${v.nodes.length}`).join("\n"),
  );
});

test("axe probe - home", async ({ page }) => {
  await page.goto("/login");
  await page.getByPlaceholder("example@gmail.com").fill("demo@jiva.com");
  await page.getByPlaceholder("123@!#").fill("password123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByText("Popular Spaces").waitFor();
  const r = await new AxeBuilder({ page }).analyze();
  console.log(
    "HOME violations:\n" +
      r.violations.map((v) => `${v.id} [${v.impact}] x${v.nodes.length}`).join("\n"),
  );
});
