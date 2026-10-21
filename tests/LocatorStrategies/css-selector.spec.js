/*
What is a locator?
A locator is a way to identify an element on a web page so Playwright can interact with it or verify it.
*/



const { test, expect } = require('@playwright/test');

test('Practice CSS selectors on Gmail', async ({ page }) => {

    // Open Gmail
    await page.goto('https://accounts.google.com/');

    // Locate the email field using its name attribute
    const emailField = page.locator('#identifierId');

    // Verify that the email field is visible
    await expect(emailField).toBeVisible();
    await emailField.fill("prajakta@gmail.com");

    await page.waitForTimeout(3000);

    console.log('Email field is visible');

    // Locate the Next button using its ID
    const nextButton = page.getByRole('button', { name: 'Next' });
    //const nextButton= page.locator('span[class="VfPpkd-vQzf8d"]').nth(2);

    // Verify that the Next button is visible
    await expect(nextButton).toBeVisible();

    await nextButton.click();
    await page.waitForTimeout(3000);

    console.log('Next button is visible');
});
