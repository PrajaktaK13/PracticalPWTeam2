/*
What is synchronization?
   Synchronization means making sure your test waits until the web page or element is ready before 
   performing an action.

Imagine you are testing a login page.
1. You open the login page.
2. The username field takes 3 seconds to appear.
3. Your test tries to enter the username immediately.
If the field isn't ready, the test might fail.

Synchronization helps us handle situations like this.

What is auto-waiting in Playwright?
   Playwright's auto-waiting mechanism automatically waits for the required conditions
 to be satisfied before performing supported actions on elements.

 Playwright automatically checks whether the button is ready to be clicked. It doesn't immediately 
 click a button that is still hidden or disabled.

For a click action, Playwright checks conditions such as:

- Visible: The button is visible.
- Stable: The button isn't moving or animating.
- Receives events: The button isn't blocked by another element.
- Enabled: The button can be clicked.
If these conditions aren't satisfied, Playwright waits and retries until they are satisfied or the timeout is reached.
*/

// Autowaiting example:

const { test, expect } = require('@playwright/test');

test('Login button test', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByRole('button', { name: 'Login' }).click();

});

// fixed waiting example:



test('Login button test with wait', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.waitForTimeout(5000);  // adding extra wait here.

    await page.getByRole('button', { name: 'Login' }).click();

});

/*
Auto-waiting vs fixed waiting:

Auto-waiting	                                              Fixed waiting
Waits for the required condition	                    Waits for a specified duration
Usually faster	                                            Can waste time
More reliable for normal interactions	          Can still fail if the page takes longer than expected
Built into supported actions	                            Uses waitForTimeout
*/


// Check theory.