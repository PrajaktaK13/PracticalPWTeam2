/*
Auto-Retrying vs. Non-Retrying Assertions
1. Auto-retrying assertion
Example:
await expect(page.locator('#login-button')).toBeVisible();


Playwright repeatedly checks whether the Login button is visible until the assertion passes or the timeout is reached.
2. Non-retrying assertion
Example:
const isVisible = await page.locator('#login-button').isVisible();

console.log(isVisible);


isVisible() checks the current state and returns true or false without automatically retrying.
Remember this difference
Auto-retrying	                                            sNon-retrying
Keeps checking until success or timeout	            Checks the current state
Example: await expect(locator).toBeVisible()	    Example: await locator.isVisible()
Useful when an element may appear after a delay	    Useful when you need the current state

Important: isVisible() is a locator method, not an assertion. It returns a Boolean value.
The assertion expect(isVisible).toBe(true) does not retry the visibility check.
*/

/*
Why do we need retrying assertions?
Imagine you open a login page. The Login button takes 3 seconds to appear because the page is loading.

If Playwright checks immediately, the button might not be visible yet. 
We need a way to wait for the expected condition.
*/

// Auto-retrying assertions
// Definition: An auto-retrying assertion repeatedly checks a condition until it passes or the timeout is reached.

const { test, expect } = require('@playwright/test');

test('Auto-retrying assertion', async ({ page }) => {
    
    await page.goto('https://www.saucedemo.com/');

    const loginButton = page.locator('#login-button');

    await expect(loginButton).toBeVisible({ timeout: 5000 });

    console.log('Login button is visible');
});


// Non-retrying checks
//Definition: A non-retrying check evaluates the condition once and returns the current result.

test('Non-retrying check', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const loginButton = page.locator('#login-button');

    const result = await loginButton.isVisible();

    console.log('Is login button visible?', result);

    expect(result).toBe(true);
});