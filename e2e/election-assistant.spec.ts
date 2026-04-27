import { test, expect } from "@playwright/test";

test("supports the localized profile and assistant flow", async ({ page }) => {
  await page.route("**/api/assistant", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        answer: "Mocked process answer from the assistant.",
        sourceMode: "gemini"
      })
    });
  });

  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Understand what to do next");
  await expect(
    page.getByRole("heading", { name: "Integrated and demo-ready Google platform touchpoints" })
  ).toBeVisible();
  await expect(page.getByText("Google Maps Platform")).toBeVisible();
  await expect(page.getByText("Cloud Translation", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Verify voter registration" })).toHaveAttribute(
    "href",
    /calendar\.google\.com/
  );

  await page.locator("#page-language").selectOption("Hindi");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("मतदान दिवस");

  await page.getByLabel("नाम").fill("Meera");
  await page.getByLabel("पंजीकरण स्थिति").selectOption("completed");
  await page.getByLabel("वर्तमान चुनाव चरण").selectOption("polling-day");
  await expect(page.locator(".timeline-item.active")).toContainText("मतदान दिवस");

  await page.getByLabel("प्रश्न").fill("मतदान दिवस पर क्या साथ रखना चाहिए?");
  await page.getByRole("button", { name: "सहायक से पूछें" }).click();
  await expect(page.getByText("Mocked process answer from the assistant.")).toBeVisible();
});
