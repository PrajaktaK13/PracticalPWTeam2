/*
Date Picker in Playwright
A date picker is a calendar UI that allows users to select a date, month, and year.

There are two common types:

1. Native date picker

Built into the browser using HTML:
<input type="date">

Here, fill() is convenient because we can directly enter the date.


2. Custom date picker

A calendar created using HTML, CSS, and JavaScript. 
It may have Next/Previous month buttons and clickable date cells.

We need to interact with its calendar elements,
such as month navigation buttons and date cells, using locators and click actions.

Feature	                            Native	                                 Custom
Created by	                        Browser	                             Website developer
HTML	                       input type="date"	                 Usually divs, buttons, etc.
Appearance	                    Browser-dependent	                   Website-controlled
Select                           date Often fill()	                       Usually click date
Month navigation	             Browser handles it	                        We automate it
Playwright difficulty	             Easier	                                More involved */



// Native Date picker

const { test, expect } = require('@playwright/test');

const {selectDate, selectTime}=  require('./calender');

test('Native date picker', async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const datePicker= await page.locator('#datepicker');

    await datePicker.fill('12/11/2024');    

    await expect(datePicker).toHaveValue('12/11/2024');
});


// Custom date picker

test('Custom date picker', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const year = '2024';
    const month = 'May';
    const date = '24';

    const dateInput = page.locator('#datepicker');

    // Open calendar
    await dateInput.click();

    const monthYearLocator = page.locator('.ui-datepicker-title');

    const prevButton = page.locator('.ui-icon.ui-icon-circle-triangle-w');

    const requiredDate = month + ' ' + year;

    let monthYearLabel = (await monthYearLocator.innerText())
        .replace(/\u00A0/g, ' ')
        .trim();

    let count = 0;
    const maxAttempts = 60;

    // Navigate to the required month and year
    while (monthYearLabel !== requiredDate && count < maxAttempts) {

        await prevButton.click();

        monthYearLabel = (await monthYearLocator.innerText())
            .replace(/\u00A0/g, ' ')
            .trim();

        count++;
    }

    // Verify that the required month was reached
    expect(monthYearLabel).toBe(requiredDate);

    // Select required date
    const selDate = page.getByRole('link', {
        name: date,
        exact: true
    });

    await selDate.click();

    // Verify selected date
    await expect(dateInput).toHaveValue('05/24/2024');

});

// create another file for date function and write only for drop down type date pickers.

test('datepicker test', async ({page})=>{
    
    await page.goto("https://demoqa.com/date-picker");

    await selectDate(page,"05/13/2024");

    await page.waitForTimeout(3000);    

    await expect(page.locator('#datePickerMonthYearInput'))
        .toHaveValue('05/13/2024');

});


test('DateTime test', async ({page})=>{

    await page.goto("https://demoqa.com/date-picker");

    await selectTime(page,"May 13,2024 02:30");     
    
    await expect(page.locator('#dateAndTimePickerInput'))
        .toHaveValue('May 13, 2024 2:30 AM');  

});




