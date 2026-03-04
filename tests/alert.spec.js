import { test, expect } from '@playwright/test';

test('Alert Handling',async({page})=>{
    
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain('confirm');
        expect(dialog.message()).toContain('Press a button!');
        await dialog.accept();
    });
    await page.getByRole('button',{name:'Confirmation Alert'}).scrollIntoViewIfNeeded();
    await page.getByRole('button',{name:'Confirmation Alert'}).click();

    
})