import { test, expect } from '@playwright/test';

test("Amazon E2E Workflow",async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.amazon.in/");
    const continue_shp_btn = page.locator(".a-button-text");
    if(await page.getByRole('button', { name: 'Continue shopping' }).isVisible()){
        await continue_shp_btn.click();
        await expect(page.locator("#nav-search-submit-button")).toBeVisible();
    }

    await page.locator("input#twotabsearchtextbox").fill("iphone 17 pro max");
    await page.locator("#nav-search-submit-button").click();
    await expect(page.locator(".a-size-base.a-spacing-small.a-spacing-top-small.a-text-normal")).toBeVisible();
    await page.locator("a.a-link-normal.s-line-clamp-2.s-line-clamp-3-for-col-12.s-link-style.a-text-normal span").first().waitFor();
    const products = page.locator('a.a-link-normal.s-line-clamp-2.s-line-clamp-3-for-col-12.s-link-style.a-text-normal');
    const productToClick = products.filter({ hasText: /iPhone 17 Pro Max 512 GB/i }).first();

// ensure visible and scroll into view
    await productToClick.scrollIntoViewIfNeeded();
    await productToClick.waitFor({ state: 'visible' });

// click and handle new tab
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        productToClick.click()
    ]);

    await newPage.waitForLoadState('domcontentloaded');
    await expect(newPage.locator('#productTitle')).toContainText('iPhone 17 Pro Max');
    

});