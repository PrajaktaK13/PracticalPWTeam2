const { test, expect } = require('@playwright/test');

test('Practice locator actions', async ({ page }) => {

    await page.goto('https://demoqa.com/automation-practice-form');

    // 1. Fill text fields
    await page.locator('#firstName').fill('Prajakta');
    await page.locator('#lastName').fill('Kawade');

    // 2. Enter email
    await page.locator('#userEmail').type('prajakta@example.com');

    // 3. Select a radio button
    await page.locator("input[name='gender']").nth(2).click();

    // 4. Enter mobile number
    await page.locator('#userNumber').fill('9876543210');

    // 5. Select state using the dropdown widget
    await page.locator('#state').click();
    await page.getByText('NCR', { exact: true }).click();

    // 6. Focus and blur an input
    await page.locator('#firstName').focus();
    await page.locator('#firstName').blur();

    // 7. Verify entered value
    await expect(page.locator('#firstName')).toHaveValue('Prajakta');

    console.log('All practiced actions completed');
});