/*
Pagination handling:

Pagination means displaying table records across multiple pages instead of showing all records together.
*/

const {test, expect}= require ('@playwright/test');

test('Pagination test', async ({page})=>{

    await page.goto("https://assertqa.com/practice/webtables");

    const table =page.locator('table');
    const rows = table.locator('tbody tr');

    console.log('Rows on current page:', await rows.count());

    // navigate to next page
    const nextButton = page.locator('[data-cy="pagination-next"]');

    console.log(await nextButton.count());

    await nextButton.click();

    console.log(await page.locator('[data-cy="pagination-info"]').innerText());

    await expect(rows).toHaveCount(5);

    // naviagate to prevous page
    const prevButton= page.locator('[data-cy="pagination-prev"]');

    await prevButton.click();

    //naviagte to first and last page
    const firstButton = page.locator('[data-cy="pagination-first"]');
    const lastButton = page.locator('[data-cy="pagination-last"]');

    await lastButton.click();

    await expect(page.locator('[data-cy="pagination-info"]'))
    .toHaveText('Page 3 of 3');

    await firstButton.click();

    await expect(page.locator('[data-cy="pagination-info"]'))
    .toHaveText('Page 1 of 3');


    const dropdown = page.locator('select').nth(2);

    console.log(await dropdown.count());

    await dropdown.selectOption('10');

    console.log('Rows displayed:', await rows.count());

    await expect(rows).toHaveCount(10);

})

// use functions.