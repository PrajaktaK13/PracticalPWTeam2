
/*
Maximize

The browser window fills the available desktop area. The title bar and taskbar may still be visible.
Full screen

The browser content occupies the screen, hiding the usual browser controls.

*/

const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

test('Maximize browser window', async () => {

    const browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']
    });

    const context = await browser.newContext({
        viewport: null
    });

    const page = await context.newPage();

    await page.goto('https://www.google.com');

    await expect(page).toHaveTitle(/Google/);

    await page.waitForTimeout(3000);

    await browser.close();
});


// Full screen

test('Open browser in full screen', async () => {

    const browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']
    });

    const context = await browser.newContext({
        viewport: null
    });

    const page = await context.newPage();

    await page.goto('https://www.google.com');
    await page.waitForTimeout(1000);

    await page.keyboard.press('F11');

    await expect(page).toHaveTitle(/Google/);

    await page.waitForTimeout(5000);

    await browser.close();
});