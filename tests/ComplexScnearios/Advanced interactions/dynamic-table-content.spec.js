/*
Dynamic Tables — What are they?
A dynamic table is a table whose data can change based on user actions or application behaviour.

For example:
- New records appear after clicking a button.
- Rows are added or removed.
- Table data changes after searching or filtering.
- Values update without reloading the entire page.

Static vs Dynamic tables:

     Static table	                              Dynamic table
Data generally remains unchanged.	    Data can change during execution.
Fixed set of records.	                Records may be added or removed.
Straightforward row selection.	        Locators may need to adapt to changing data.
*/

const { test, expect } = require('@playwright/test');
const { after } = require('node:test');

test('Dyanamic table content', async ({ page }) => {

    await page.goto("https://practice.expandtesting.com/dynamic-table");

    const table = page.locator('.table.table-striped');

    // Check the no of rows
    const rows = table.locator('tbody tr');

    console.log("Total Rows:", await rows.count());


    // check the no of rows in chrome

    //  const chromeRow = rows.filter({
    //  has: table.getByText('Chrome')
    //    });


    const chromeRow = rows.filter({
        hasText: 'Chrome'
    });

    console.log('Chrome row count:', await chromeRow.count());

    //print all column headers:
    const headers = await table.locator('thead th').allInnerTexts();

    const cpuIndex = headers.indexOf('CPU');

    const chromRow = rows.filter({
        hasText: 'Chrome'
    });

    console.log(await chromRow.innerText());
    const cpuValue = await chromRow.locator('td').nth(cpuIndex).innerText();

    console.log('Chrome CPU:', cpuValue);

    const beforeRefresh = cpuValue;

    await page.reload();

    // Re-read the table after refresh
    const updatedHeaders = await table.locator('thead th').allInnerTexts();
    const updatedCpuIndex = updatedHeaders.indexOf('CPU');

    const updatedRows = table.locator('tbody tr');
    const updatedChromeRow = updatedRows.filter({
        hasText: 'Chrome'
    });

    const afterRefresh = await updatedChromeRow
        .locator('td')
        .nth(updatedCpuIndex)
        .innerText();

    console.log('Before refresh:', beforeRefresh);
    console.log('After refresh:', afterRefresh);
    console.log('Value changed:', beforeRefresh !== afterRefresh);


    const chromeDeatils=await page.locator('#chrome-cpu');
    
    await expect(chromeDeatils).toContainText(afterRefresh);  
});

// bottom text should be asserted.

// check the value
