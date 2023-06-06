import { chromium } from "@playwright/test";

describe("Launch Browser", () => {
  test("Open letcode", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await browser.newPage();
    await page.goto("https://letcode.in/");
  });
});
