import { test, expect } from '@playwright/test';

test.describe.configure({mode:'parallel'})
test("Handling child windows",async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);

    await newPage.waitForLoadState('domcontentloaded');

    const text = await newPage.locator(".red").textContent();
    const splitting = text.split('@');
    const email = splitting[1].split(' ')[0];
    expect(email).toBe('rahulshettyacademy.com');

    await page.locator("#username").fill("Mithunraj");
    expect(await page.locator("#username").inputValue()).toBe("Mithunraj");

});

test('Static dropdown options',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const dropdown = await page.locator("select.form-control");
    await dropdown.selectOption("teach");

});