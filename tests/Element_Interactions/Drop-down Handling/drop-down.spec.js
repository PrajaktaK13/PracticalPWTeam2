/*

*/

// 1. Native dropdown — single select
const { test, expect } = require('@playwright/test');

test('Select an option from dropdown', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dropdown');

    const dropdown = page.locator('#dropdown');

    await dropdown.selectOption('1');

    await expect(dropdown).toHaveValue('1');

});


// 2. Multiple select


test('Select multiple dropdown options', async ({ page }) => {

    await page.goto("https://jstestingacademy.co.in/qa-demo/forms/dropdowns.html")

    const dropdown = page.locator('#select-role');

    await dropdown.selectOption('Automation Tester');

    await page.pause();

    await expect(dropdown).toHaveValue('automation');

    const skillsDropdown = page.locator('#select-skills');

    await skillsDropdown.selectOption(['Java', 'Python']);

    await expect(skillsDropdown).toHaveValues(['java','python']);
});

