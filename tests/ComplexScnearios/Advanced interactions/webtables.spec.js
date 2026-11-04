/*
What is a web table?
A web table is used to display data in rows and columns on a webpage.

For example:
Employee Details
ID	Name	Department	Salary
101	Rahul	QA	40,000
102	Priya	Development	55,000
103	Amit	QA	45,000


Here:
- Rows (tr) represent individual records.
- Columns (td) represent individual data fields.
- Headers (th) describe the columns.
- Table (table) contains the complete structure.


<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>101</td>
            <td>Rahul</td>
            <td>QA</td>
        </tr>

        <tr>
            <td>102</td>
            <td>Priya</td>
            <td>Development</td>
        </tr>
    </tbody>
</table>


Important tags:

Tag               	Meaning
table	       Complete table
thead	      Table header section
tbody	        Table body section
tr	                Table row
th	               Header cell
td	                Data cell
*/

const {test, expect}= require ('@playwright/test');

test('Webtables test', async ({page})=>{

    await page.goto("https://demoqa.com/webtables");

    const table = page.locator("table[class='-striped -highlight table table-striped table-bordered table-hover']");


    // get rows with header
    const rowsWithHeader= table.locator('tr');

    console.log("Total Rows with header:",await rowsWithHeader.count());

    // get rows without header
    const rows = table.locator('tbody tr');

    console.log('Total rows without header:', await rows.count());

    // Get cells

    const cells= table.locator('tbody td');

    console.log("Total cells:",await cells.count());

    // get specific row
    const secondRow= table.locator('tbody tr').nth(1);

    console.log('Second Row:',await secondRow.innerText());

    // get specific cell
    const firstRow= table.locator('tbody tr').first();

    const name= await firstRow.locator('td').first().innerText();

    console.log("Name:",name);

    // Print all names

    for (let i = 0; i < await rows.count(); i++) {

    const row = rows.nth(i);

    const name = await row.locator('td').nth(0).innerText();

    console.log('First Name:', name);

    }

    // find the row by name.

    for (let i = 0; i < await rows.count(); i++) {

    const row = rows.nth(i);

    const name = await row.locator('td').nth(0).innerText();

    if(name==="Alden"){
         console.log(await row.innerText());

         const email= await row.locator('td').nth(3).innerText();
         console.log("Email:",email);
       } 

    }

});

test('Update data in tables', async ({page})=>{

    await page.goto("https://demoqa.com/webtables");

    const table = page.locator("table[class='-striped -highlight table table-striped table-bordered table-hover']");

    const rows = table.locator('tbody tr');

    const aldenRow = rows.filter({
    has: page.getByText('Alden')
});

await aldenRow.locator('#edit-record-2').click();

// Locate the modal
const modal = page.locator('.modal-content');

// Update salary inside the modal
await modal.locator('#salary').fill('50000');

// Save
await modal.getByRole('button', { name: 'Submit' }).click();

await expect(aldenRow.locator('td').nth(4)).toHaveText('50000');

});


test('Delete row in tables', async ({page})=>{

    await page.goto("https://demoqa.com/webtables");

    const table = page.locator("table[class='-striped -highlight table table-striped table-bordered table-hover']");

    const rows = table.locator('tbody tr');

    const aldenRow = rows.filter({
    has: page.getByText('Alden')
});

await aldenRow.locator('#delete-record-2').click();
});
