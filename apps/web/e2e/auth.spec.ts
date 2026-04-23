import { readFileSync } from "node:fs";

import { test, expect } from "@playwright/test";

import { TEST_USER_FIXTURE } from "./global-setup";

function readTestUser() {
  const raw = readFileSync(TEST_USER_FIXTURE, "utf-8");
  return JSON.parse(raw) as { email: string; password: string };
}

test.describe("Authentication", () => {
  test("sign up with email and access dashboard", async ({ page }) => {
    await page.goto("/sign-up");

    await page.getByLabel("Name").fill("New User");
    await page
      .getByLabel("Email")
      .fill(`newuser-${String(Date.now())}@example.com`);
    await page.getByLabel("Password").fill("NewPassword123!");
    await page.getByRole("button", { name: "Sign up", exact: true }).click();

    await page.waitForURL(/\/dashboard/, { timeout: 15000 });
  });

  test("sign in with email and access dashboard", async ({ page }) => {
    await page.goto("/sign-in");

    const { email, password } = readTestUser();

    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Sign in", exact: true }).click();

    await page.waitForURL(/\/dashboard/, { timeout: 15000 });
  });

  test("unauthenticated user is redirected to sign-in", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL(/\/sign-in/);
  });
});
