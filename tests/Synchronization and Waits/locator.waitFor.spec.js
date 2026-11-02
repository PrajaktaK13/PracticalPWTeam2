/*
What is locator.waitFor()?
Simple definition: locator.waitFor() makes Playwright wait until an element reaches a specified state.

Interview definition: locator.waitFor() waits for a locator to satisfy a specified state, 
such as visible, attached, hidden, or detached. By default, it waits for the element to become visible.


*/


const { test, expect } = require('@playwright/test');

test('Practice locator.waitFor visible', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

    const checkbox = page.locator('#checkbox');

    // Wait until the checkbox is visible
    await checkbox.waitFor({
        state: 'visible',
        timeout: 5000
    });

    await expect(checkbox).toBeVisible();
});


test('Wait for loader to become hidden', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    await page.getByRole('button', { name: 'Start' }).click();

    const loader = page.locator('#loading');

    await loader.waitFor({ state: 'hidden' });

    console.log('Loader is now hidden');
});

test('Wait for element to be attached', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.getByRole('button', { name: 'Start' }).click();

    const finish = page.locator('#finish');

    await finish.waitFor({ state: 'attached' });

    console.log('Element is added to DOM');
});

