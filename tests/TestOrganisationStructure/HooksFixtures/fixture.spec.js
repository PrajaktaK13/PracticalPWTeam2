/*
What is a Fixture in Playwright?
A fixture is a reusable setup mechanism that provides the resources a test needs and manages 
their lifecycle automatically.

Let's understand with a real-life example.

Imagine you are testing a login page.

Before testing, you need:
1. A browser.
2. A browser context.
3. A page.
4. The application URL opened in that page.

You need these resources before your test can interact with the application.

Instead of manually creating all these resources for every test, Playwright provides built-in fixtures.

*/
// For example:

const { test, expect } = require('@playwright/test');

test('Login test', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/login');

    await page.locator('#username').fill('tomsmith');

});

// Look carefully at this line:
async ({ page }) => {
}

/*
Where did page come from?

You did not create it using:
const page = await browser.newPage();

Playwright provided it automatically through its built-in page fixture.

2. How does the page fixture work?

Behind the scenes, Playwright manages the lifecycle:

Test starts

Playwright creates a BrowserContext

Playwright creates a Page

Your test uses page

Test finishes

Playwright automatically closes the Page and Context


This is why you generally don't need to manually create and close a page for every test when using Playwright Test.

3. Fixtures are not just for pages:

Playwright provides several built-in fixtures:

Fixture	                        What it provides
browser	                        Browser instance
context	                         Browser context
page	                        Browser tab/page
request	                      API request context
browserName	               Name of the browser being used
playwright	                 Playwright library instance
*/