/*
Different states in Playwright
Let's understand the different states of a web element. These are important for the next topics, especially locator.waitFor().
1. The four main states
Imagine you are testing a Login button on a webpage.

1. Visible: The element exists in the page and is visible to the user.

Example: The Login button is displayed on the screen.


2. Attached: The element exists in the page's DOM (the browser's document structure). It may or may not be visible.

Example: A Login button exists in the HTML but is hidden using CSS.


3. Hidden: The element exists in the DOM but isn't visible, or the element is detached from the DOM.

Example: A button has display: none.


4. Detached: The element no longer exists in the DOM.

Example: A popup is removed from the page after you close it.


Memory trick:
- Attached = exists in the DOM.
- Detached = doesn't exist in the DOM.
- Visible = displayed.
- Hidden = not displayed, or detached.
*/

const {test, expect}= require ('@playwright/test');

test('Different states test', async ({page})=>{
    await page.goto("https://www.saucedemo.com/");

    const loginButton = page.locator('#login-button');

    // Check visibility
    await expect(loginButton).toBeVisible();

    // Check that it exists in the DOM
    await expect(loginButton).toBeAttached();    

    // Check that it is hidden
    //await expect(loginButton).toBeHidden();
    
})