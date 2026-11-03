const {test, expect}= require('@playwright/test');

// date picker
async function selectDate(page, date){

    const [month, day, year] = date.split("/");

    console.log('Day:', day);
    console.log('Month:', month);
    console.log('Year:', year);

    await page.locator('#datePickerMonthYearInput').click();

    const selYear = await page.locator('.react-datepicker__year-select');

    await selYear.selectOption(year);

    const selMonth = await page.locator('.react-datepicker__month-select');

    await selMonth.selectOption(String(Number(month) - 1));
    
    const selDate = await page.getByText(String(Number(day)), { exact: true });

    await selDate.click();
}

// DateTime picker
async function selectTime(page, dateTime){

    console.log(dateTime);    

let result = dateTime.match(
    /^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})\s+(\d{1,2}:\d{2})$/    // When the pattern matches, JavaScript returns an array:
);
console.log(result);

    let [month, day, year, time] = result.slice(1);

    console.log(month);
    console.log(day);
    console.log(year);
    console.log(time);

    await page.locator('#dateAndTimePickerInput').click();

    const selYear = await page.locator('.react-datepicker__year-read-view');

    await selYear.click();

    await page.getByRole('button', {
        name:year
    }).click();

    const selMonth = await page.locator('.react-datepicker__month-read-view');

    selMonth.click();

      await page.getByRole('button', {
        name:month
    }).click();    
    
    const selDate = await page.getByText(String(Number(day)), { exact: true });

    await selDate.click();   

    const selTime = await page.getByRole('option', { name: time });

    await selTime.click();     

}

module.exports = { selectDate, selectTime };






