/*
Multiple windows/pages in Playwright:

First, let's understand the difference between a browser, page, and new tab.
- Browser: The browser instance, such as Chromium.
- Page: A single tab in the browser.
- Multiple pages: Multiple tabs or windows opened within the same browser context.

For example, imagine you are testing a website:
1. You open the application in the first tab.
2. You click a link that opens another tab.
3. You need to switch to that new tab and perform some actions.
Playwright provides two useful approaches.
*/

// Approach 1: Handle a new tab using context.waitForEvent('page')

const { test, expect } = require('@playwright/test');

test('Handle multiple pages', async ({ page, context }) => {

    await page.goto('https://demoqa.com/browser-windows');

    const newPagePromise = context.waitForEvent('page');

    await page.locator('#tabButton').click();

    const newPage = await newPagePromise;

    await newPage.waitForLoadState();

    const title= newPage.locator('#sampleHeading');

    console.log('New page title:', await title.innerText());
});


// Handle multiple windows

test('Handle multiple windows', async ({ page, context }) => {

    await page.goto('https://demoqa.com/browser-windows');

    const newPagePromise = context.waitForEvent('page');

    await page.locator('#windowButton').click();

    const newPage = await newPagePromise;

    await newPage.waitForLoadState();

    const title= newPage.locator('#sampleHeading');

    console.log('New page title:', await title.innerText());
    

     // Handle New Window Message
    const messagePromise = context.waitForEvent('page');

    await page.locator('#messageWindowButton').click();

    const messageWindow = await messagePromise;

    await messageWindow.waitForLoadState();

    const message = await messageWindow.locator('body').innerText();

    console.log('Message:', message);
});


