/*
1. What is a hard assertion?
A hard assertion stops the current test immediately when an assertion fails. 
Playwright uses hard assertions by default.
*/

const { test, expect } = require('@playwright/test');

test('Hard assertion example', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await expect(page.locator('#login-button')).toBeVisible();

    console.log('Step 1 completed');

    await expect(page.locator('#wrong-id')).toBeVisible();

    console.log('Step 2 completed'); // not get printed
});

/*
What is a soft assertion?
A soft assertion records the failure but allows the test to continue executing.
*/

test('Soft assertion example', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await expect.soft(page.locator('#login-button')).toBeVisible();

    console.log('Step 1 completed');

    await expect.soft(page.locator('#wrong-id')).toBeVisible();

    console.log('Step 2 completed');// will get printed

    console.log('Test execution reached the end'); // will get printed
});

/*
Hard assertion	                                      Soft assertion
Uses expect(...)	                                Uses expect.soft(...)
Stops the test at failure	                        Continues after failure
Failure is reported	                               Failure is recorded and reported
Useful when later steps depend on the assertion	  Useful when checking several independent items

Memory trick: Hard = Stop. Soft = Continue.
*/