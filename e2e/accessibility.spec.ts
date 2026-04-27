import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

test("has no automatically detectable accessibility violations on the initial page", async ({ page }) => {
  await page.goto("/");

  const scan = await new AxeBuilder({ page }).analyze();

  expect(scan.violations).toEqual([]);
});
