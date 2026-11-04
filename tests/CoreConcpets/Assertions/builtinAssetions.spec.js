
/*
What is an assertion?
An assertion is a check that verifies whether the actual result matches the expected result.

For example, when testing a login page:
- Expected result: The dashboard should appear after successful login.
- Actual result: The dashboard appears.
- Assertion: Pass ✅
If the dashboard does not appear, the assertion fails ❌.

Types of Playwright assertions:

Playwright has three main categories to learn.

Type	                  What it checks	                              Example
Locator assertions	    Whether an element is visible, enabled, etc.	toBeVisible()
Page assertions          	Page title or URL	                        toHaveTitle()
General assertions	        Values, strings, conditions	                   toBe()

What are built-in assertions?
Built-in assertions are ready-made checks provided by Playwright to verify whether an application behaves as expected.

For example, when testing a login page, we may want to check:
- Is the login button visible?
- Is the username field empty?
- Does the page display the correct title?
- Is the error message displayed after invalid login?
Playwright provides assertions for these checks through expect().


Common built-in assertions:

Here are the main assertions to understand first.

Assertion	     What it checks
toBeVisible()	Element is visible
toBeHidden()	Element is hidden or absent
toHaveText()	Element has the expected text
toContainText()	Element contains the expected text
toHaveValue()	Input has the expected value
toBeEnabled()	Element is enabled
toBeDisabled()	Element is disabled
toHaveTitle()	Page has the expected title
toHaveURL()	    Page has the expected URL
toHaveCount()	Locator matches the expected number of elements

These are examples of auto-retrying assertions when used with Playwright's locator or page assertions.

*/
const { test, expect } = require('@playwright/test');

test('Built-in assertions practice', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Check that the username field is visible
    await expect(page.locator('#user-name')).toBeVisible();

    await expect(page.locator('#user-name')).toHaveCount(1);

    // Check the page title
    await expect(page).toHaveTitle('Swag Labs');
    // Check that the login button is enabled    
    await expect(page.locator('#login-button')).toBeEnabled();

    const loginButton = page.locator('#login-button');

    // Check the exact text
    await expect(loginButton).toHaveText('Login');

    // Check that the text contains a word
    await expect(loginButton).toContainText('Log');

    // Check the username field's value
    await expect(page.locator('#user-name')).toHaveValue('');

    console.log('All assertions passed');
});


/* toHaveText() vs toContainText()
Assertion	                        Meaning
toHaveText('Swag Labs')	Checks for the expected text match.
toContainText('Swag')	Checks whether the element's text contains Swag.
*/

