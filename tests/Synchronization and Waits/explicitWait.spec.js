/*
An explicit wait means telling Playwright to wait for a specific condition before continuing.

For example, wait until a success message appears after clicking Submit.

waitForTimeout()?
It makes Playwright pause for a fixed amount of time.

Explicit wait	                                             Fixed wait
Waits for a specific condition	                       Waits for a fixed duration
Continues as soon as the condition is satisfied	       Waits for the full duration
Usually preferred in automation	                   Can make tests slow or unreliable

Interview tip: Prefer condition-based waits over fixed delays. Playwright already provides auto-waiting for 
many actions and assertions, so add explicit waits only when you need to wait for a particular state.
*/

const {test, expect}= require ('@playwright/test');

test('explicit wait test', async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/dynamic_controls");

    const enableButton= page.getByRole('button',{name:'Enable'});
    await enableButton.click();
    const message= page.locator("#message");

    await message.waitFor({
        state:'visible',
        timeout:5000
    });

    await expect(message).toBeVisible();
    //await expect(message).toBeVisible({ timeout: 5000 });
});

/*
Quick comparison
Method	                                      What does it wait for?
locator.waitFor()	                       A particular element state
expect(locator).toBeVisible()	              An expected UI condition
page.waitForSelector()	                 An element matching a selector
page.waitForResponse()	                   A matching network response
*/

// page.waitForLoadState()

test('Wait for page load state', async ({ page }) => {

    await page.goto('https://www.amazon.in');

    await page.waitForLoadState('domcontentloaded');

    console.log('DOM is ready');
});

/*
Important: page.goto() already waits for the load event by default. So you don't always need to add another waitForLoadState('load').
Remember the difference
- locator.waitFor() → waits for an element's state.
- page.waitForLoadState() → waits for a page loading state.
*/


// page.waitForNavigation()

/*
waitForResponse()?
Simple definition: It waits until the browser receives a response from a particular API request.

Real-life example:

Imagine you open an application and click the Login button.
1. Application sends login credentials to the server.
2. Server processes the request.
3. Server sends a response (success or failure).
4. Application displays the result.
We can use page.waitForResponse() to wait for that server response.
*/

test('Wait for API response', async ({ page }) => {

    await page.goto('https://playwrightlab.github.io/index.html');

    const responsePromise = page.waitForResponse(
        response => response.url().includes('/users')
    );

    await page.getByRole('button', { name: 'Fetch Users' }).click();

    const response = await responsePromise;

    console.log('Status:', response.status());
    console.log('URL:', response.url());
     // check timeOut also in test.
});


// waitForRequest(): It waits until the browser sends a particular network request to the server.

test('Wait for API request', async ({ page }) => {

    await page.goto('https://playwrightlab.github.io/index.html');

    const requestPromise = page.waitForRequest(
        request => request.url().includes('/users')
    );

    await page.getByRole('button', { name: 'Fetch Users' }).click();

    const request = await requestPromise;

    console.log('Request URL:', request.url());
    console.log('Request Method:', request.method());

});


/*
Remember these four methods
Method	                       Waits for
waitForURL()	            Page URL change
waitForRequest()	         Request sent
waitForResponse()	       Response received
waitForLoadState()	      Page loading state
*/

// waitForselector example

/* page.waitForSelector()?
page.waitForSelector() waits until an element matching a CSS or XPath selector reaches a particular state.

page.waitForSelector() is a Playwright method used to wait for an element to appear, become visible, 
or become hidden before performing the next action.*/



test('Wait for selector example', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    // Click on Start button
    await page.getByRole('button', { name: 'Start' }).click();

    // Wait until Hello World becomes visible
    await page.waitForSelector('#finish', {
        state: 'visible',
        timeout: 10000
    });

    // Verify the text
    await expect(page.locator('#finish'))
        .toHaveText('Hello World!');

});
