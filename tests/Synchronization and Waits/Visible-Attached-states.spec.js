/*
Visible vs Attached states
These two states are easy to confuse, but they are important in Playwright interviews and real automation.

1. Understand the difference
Imagine a webpage with three buttons.

Button 1: Visible

Login: Exists in the DOM and is visible.


Button 2: Attached but hidden

Submit (display: none)

Exists in the DOM, but isn't visible.


Button 3: Detached

The button has been removed from the DOM.

Remember: Visible elements are attached, but attached elements are not necessarily visible.
*/

const { test, expect } = require('@playwright/test');

test('visible attached state test', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

    const removeButton= page.getByRole('button', { name: 'Remove' });

    await expect(removeButton).toBeVisible();

    await removeButton.click();

    await expect(removeButton).toBeAttached();
    await expect(removeButton).toBeVisible();

});



test('visible and attached test', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

    const removeButton = page.getByRole('button', { name: 'Remove' });
    const addButton = page.getByRole('button', { name: 'Add' });

    await expect(removeButton).toBeVisible();
    await removeButton.click();

    // Wait until the button changes to Add
    await expect(addButton).toBeVisible();
    //await expect(removeButton).toBeAttached();

    // The old Remove locator should no longer match
    await expect(removeButton).toHaveCount(0);
});
