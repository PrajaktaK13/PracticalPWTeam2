/*
Types of timeouts in Playwright
Playwright has several timeout types. Each one controls a different operation.
1. Types of timeouts:

Timeout type	       Default timeout	             What it controls
Test timeout	        30 seconds	                How long one test can run
Expect timeout	        5 seconds	                How long an assertion retries
Action timeout	    No timeout by default	        Actions such as click() and fill()
Navigation timeout	No timeout by default	        Operations such as page.goto()
Global timeout	    No timeout by default	      Maximum duration of the entire test run

The action and navigation timeouts default to no separate limit, 
but the overall test timeout can still stop the operation. 
These values can be configured in playwright.config.js.


Remember these five questions:
- Test timeout: How long can one test run?
- Expect timeout: How long can an assertion retry?
- Action timeout: How long can an action wait?
- Navigation timeout: How long can navigation take?
- Global timeout: How long can the entire run take?
*/
const {test, expect}= require ('@playwright/test');

test.setTimeout(60000);                                  // test timeout

test('Types of TimeOuts', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls',{
         timeout: 15000                                                       // navigation timeout
    });

    const removeButton = page.getByRole('button', { name: 'Remove' });
    const addButton = page.getByRole('button', { name: 'Add' });

    await expect(removeButton).toBeVisible({ timeout: 10000 });  // expect timeout
    await removeButton.click({ timeout: 10000 });                // action timeout

    
});
/*
Test Timeout vs Global Timeout:

Feature	                 Test Timeout	                                        Global Timeout
Meaning         	Maximum time allowed for one test to finish	    Maximum time allowed for the entire test run
Applies to	                Each individual test	                All tests running in that Playwright command
Config option	               timeout	                                          globalTimeout
If time expires	T         hat test fails due to timeout	                  The entire test run is stopped
Default	                         30 seconds	                                    0 — no global limit

*/