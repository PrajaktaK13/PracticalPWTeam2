/*
What is locator.waitFor()?
Simple definition: locator.waitFor() makes Playwright wait until an element reaches a specified state.

Interview definition: locator.waitFor() waits for a locator to satisfy a specified state, 
such as visible, attached, hidden, or detached. By default, it waits for the element to become visible.


*/


const { test, expect } = require('@playwright/test');

test('Practice locator.waitFor()', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

    const checkbox = page.locator('#checkbox');

    // Wait until the checkbox is visible
    await checkbox.waitFor({
        state: 'visible',
        timeout: 5000
    });

    await expect(checkbox).toBeVisible();
});
