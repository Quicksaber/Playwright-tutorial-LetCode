// @ts-check
const { test, expect } = require("@playwright/test");
const { chromium } = require("@playwright/test");

test.describe("Upload file", () => {
  const filepath0 = "fixtures/downloads/QRCodes.pdf";

  test.only("upload file using set input files", async ({ page }) => {
    await page.goto("https://commitquality.com/");
    await expect(page.locator("a[data-testid='navbar-practice']")).toHaveText(
      "Practice"
    );
    await page.locator("a[data-testid='navbar-practice']").click();
    await page.locator('[data-testid="practice-file-upload"]').click();

    await page.setInputFiles("#file-input", filepath0);
    await page.locator('button[type="submit"]').click();
    await page.pause();

    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toContain("alert");

      expect(dialog.message()).toContain("File successfully uploaded!");

      await dialog.accept();
    });
  });

  test("Non-Input File Upload", async ({ page }) => {
    await page.goto("http://autopract.com/selenium/upload2/");

    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),

      // Click on Select Files button
      page.locator("a#pickfiles").click(),
    ]);

    await fileChooser.setFiles(filepath0);

    // Click on Upload Files Link
    await page.locator("a#uploadfiles").click();
  });
});
