/*
Input handling and textbox interactions.
1. Important textbox methods
Method	               What it does
fill('Hello')	       Enters text, replacing existing text
clear()	               Removes the existing text
press('Enter')	       Presses a keyboard key
type('Hello')	       Types text character by character
inputValue()	       Returns the current value of an input
toHaveValue('Hello')   Verifies the input's value

Interview tip: Prefer fill() for normal text entry. 
Use press() when you need to press a specific key. type() is available 
but deprecated in newer Playwright versions; use pressSequentially() when 
character-by-character typing is needed.
*/


const { test, expect } = require('@playwright/test');

test('Textbox interactions', async ({ page }) => {

    await page.goto("https://demo-qa-app.azurewebsites.net/automation-practice-form");

    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');

    // 1. Enter text
    await firstName.fill('Prajakta');
    await lastName.fill('Kawade');

    // 2. Read the current input value
    const firstNameValue = await firstName.inputValue();
    console.log('firstName:', firstNameValue);

    const lastNameValue = await lastName.inputValue();
    console.log('lastName:', lastNameValue);

    // 3. Verify the value
    await expect(firstName).toHaveValue('Prajakta');


    // 4. Press a keyboard key
    await firstName.press('Enter');
});
