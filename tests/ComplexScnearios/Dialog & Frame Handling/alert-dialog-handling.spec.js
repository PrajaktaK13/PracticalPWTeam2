/*
Alert/Dialog handling
1. What is a Dialog in Playwright?
A dialog is a small browser popup that appears to display a message or ask the user for confirmation or input.

For example, when you click a button and the browser displays:
example.com says

Are you sure you want to continue?
Cancel
OK

These dialogs are created using JavaScript.

2. Types of JavaScript dialogs:

There are three important types:

      A. Alert: 

         Displays a message with an OK button.
            // alert('Login successful!');

      B. Confirm

        Displays a message with OK and Cancel buttons.
            // confirm('Do you want to delete this file?');
          - OK returns true.
          - Cancel returns false.

       C. Prompt

         Asks the user to enter some text.
            // prompt('Enter your name');

3. How do we handle dialogs in Playwright?
Playwright provides a dialog event.

We can listen for this event using:

             page.on('dialog', async dialog => {
             console.log(dialog.message());
             await dialog.accept();
         });

Method	                           Purpose
dialog.accept()	                  Clicks OK
dialog.dismiss()	             Clicks Cancel
dialog.message()	           Gets dialog message
dialog.type()	         Returns alert, confirm or prompt
dialog.defaultValue()	   Gets the default prompt value

For a prompt, we can also pass text:
     await dialog.accept('Prajakta');


page.on(parameter1, parameter2);

Parameter	Meaning
parameter1	Event name that you want to listen for
parameter2	Callback function that executes when that event occurs

*/

// Alert:

const { test, expect } = require('@playwright/test');

test('Handle JavaScript Alert', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    await page.pause();

    page.on('dialog', async dialog => {          // whenever dialog appears execute this function.

        await page.pause();
        console.log('Dialog type:', dialog.type());
        console.log('Dialog message:', dialog.message());

        await page.pause();

        await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Alert' }).click(); 
    // here after clicking on this button, dialog appears so program get shifted to "page.on" function to handle dialog.

    await page.pause();

    await expect(page.locator('#result'))
        .toHaveText('You successfully clicked an alert');
});


// Confirm

test('Handle JS Confirm', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');    

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();


    page.on('dialog', async dialog => {

        console.log(dialog.type());
        console.log(dialog.message());

        await dialog.dismiss();
    });


    await expect(page.locator('#result'))
        .toHaveText('You clicked: Cancel');

});

// JavaScript Prompt

test('Handle JS Prompt', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');    


    page.on('dialog', async dialog => {

        console.log(dialog.type());
        console.log(dialog.message());       

        await dialog.accept('Prajakta');
        
    });

    await page.getByRole('button', { name: 'Click for JS Prompt'}).click();

    await expect(page.locator('#result'))
        .toHaveText('You entered: Prajakta');

});

//page.once.

/*
- page.on() – listens for an event every time it occurs.
- page.once() – listens for an event only once, then automatically removes the listener.

1. Difference between page.on() and page.once()
Think of a doorbell:
- page.on() is like someone answering the doorbell every time it rings.
- page.once() is like someone answering only the first time. After that, the listener is removed.

*/



test('Verify page.once()', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    let dialogCount = 0;

    page.once('dialog', async dialog => {
        dialogCount++;

        console.log('Dialog handled:', dialog.message());

        await dialog.accept();
    });

    // First alert
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();

    // Second alert
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();

    console.log('Number of dialogs handled:', dialogCount);

    expect(dialogCount).toBe(1);
});
