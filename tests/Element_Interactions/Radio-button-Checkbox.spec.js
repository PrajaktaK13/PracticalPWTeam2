/*
Understand the difference:

Radio buttons — select one option

Example: Choose one payment method: Cash, Card, or UPI. Usually,
 1. You can select only one option in a group.
 2. You can not deselect the selected option.

Checkboxes — select multiple options

Example: Choose your hobbies: Singing, Dancing, and Reading. 
1. You can select more than one.
2. You can deselect the selected option.

Method	                           Purpose
check()	                           Selects a radio button or checkbox
uncheck()	                       Unselects a checkbox
isChecked()	                       Returns true or false
toBeChecked()	                   Asserts that the element is checked
toBeChecked({ checked: false })    Asserts that the element is unchecked

Interview definition: 
Radio buttons allow the user to choose one option from a group, whereas checkboxes allow the user to 
select multiple independent options.
*/

const { test, expect } = require('@playwright/test');


test('Radio button Checkbox test', async ({ page }) => {

    await page.goto(
        'https://demo-qa-app.azurewebsites.net/automation-practice-form'
    );

    // Locate the second gender radio button
    const femaleLabel = page.locator('label[for="gender-radio-2"]');
    const femaleRadio = page.locator('#gender-radio-2');
 
    await femaleLabel.click();
 
    await expect(femaleRadio).toBeChecked();
});


test('Radio button Checkbox test1', async ({ page }) => {

    await page.goto(
        'https://www.playwrightautomation.com/practice.html?utm_source=chatgpt.com'
    );

       // Locate the second gender radio button
    const gender= await page.locator("#gender-male");

    console.log('Count:', await gender.count());
    console.log('Visible:', await gender.isVisible());
    console.log('Enabled:', await gender.isEnabled());

    // Select the radio button
    await gender.check();

    // Verify that it is selected
    await expect(gender).toBeChecked();

});
