/*
Basic element interactions
Imagine you are testing a login page. You need to enter a username, click Login, and check whether the button is visible and enabled.

Playwright provides methods to interact with web elements.

Method	           Simple meaning

click()	           Click an element
fill('text')	   Enter text into an input
clear()	           Clear an input field
isVisible()	       Check whether an element is visible
isEnabled()	       Check whether an element is enabled
isDisabled()	   Check whether an element is disabled
isChecked()	       Check whether a checkbox or radio button is selected

*/


const { test, expect } = require('@playwright/test');

test('Basic element interactions', async ({ page }) => {

    await page.setContent(`
        <h1>Login Page</h1>

        <label for="username">Username</label>
        <input id="username" type="text">

        <button id="login">Login</button>
    `);

    // Locate the username textbox
    const username = page.getByLabel('Username');

    // Check whether the textbox is visible
    console.log('Visible:', await username.isVisible());

    // Enter text
    await username.fill('Prajakta');

    // Verify the entered text
    await expect(username).toHaveValue('Prajakta');

    // Clear the textbox
    await username.clear();

    // Verify that the textbox is empty
    await expect(username).toHaveValue('');// assertion.

    // Locate the Login button
    const loginButton = page.getByRole('button', {
        name: 'Login'
    });

    // Check whether the button is enabled
    console.log('Enabled:', await loginButton.isEnabled());

    // Click the button
    await loginButton.click();
});

// diffrence between fill() and type().