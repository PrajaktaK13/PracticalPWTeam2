/*
What are keyboard actions?
Keyboard actions allow Playwright to simulate a user pressing keys such as Enter, Tab, Escape, Backspace, and arrow keys.

Real-life example: On a login page, you type your username, press Tab to move to the password field, enter your password, and press Enter to submit.
2. Important keyboard methods
Method	                                     Purpose
locator.press('Enter')	                    Press Enter while focused on an element
locator.press('Tab')	                    Press Tab while focused on an element
locator.press('Escape')	                    Press Escape
locator.press('Backspace')	                Press Backspace
page.keyboard.press('Enter')	            Press Enter at the page level
locator.pressSequentially('Hello')	        Type text character by character

Memory trick: 
press() presses a key; 
fill() enters a complete text value.
*/


const { test, expect } = require('@playwright/test');

test('Practice arrow keys and Delete', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');

    const input = page.locator('#target');
    const result = page.locator('#result');

    await input.fill('Hello');

    // Move cursor to the beginning
    await input.press('Home');

    // Move one character to the right
    await input.press('ArrowRight');

    await expect(result).toHaveText('You entered: RIGHT');

    await input.press('ArrowLeft');

    await expect(result).toHaveText('You entered: LEFT');    
        

    // await input.press('Enter');  
    
    // await page.pause();

    // await expect(result).toHaveText('You entered: ENTER');

    // Delete the character after the cursor
    await input.press('Delete');

    console.log('Current text:', await input.inputValue());

    // Check which key was pressed
    await expect(result).toHaveText('You entered: DELETE');
});





test('Check Enter key', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');

    const input = page.locator('#target');
    const result = page.locator('#result');

    await input.click();
    await input.press('Enter');

    console.log('Result:', await result.innerText());
});