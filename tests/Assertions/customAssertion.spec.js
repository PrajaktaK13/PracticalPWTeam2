/*
What is a custom assertion?
A custom assertion is a check that you create to verify a condition specific to your application or testing requirement.

For example, imagine your application displays a successful login message:

Welcome, Prajakta!

You want to verify that the message contains the logged-in user's name. 
You can write a reusable custom assertion instead of repeating the same check in multiple tests.

There are different ways to create custom assertions. 
We'll start with a simple helper function, then learn Playwright's more advanced approach.
*/

import { test, expect } from '@playwright/test';

function assertWelcomeMessage(message) {
    expect(message).toContain('Prajakta');
}

test('Check welcome message', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const welcomeMessage = 'Welcome, Prajakta!';

    assertWelcomeMessage(welcomeMessage);

    console.log('Custom assertion passed');
});