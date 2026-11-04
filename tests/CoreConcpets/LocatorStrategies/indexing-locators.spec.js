/*
What is indexing?
Sometimes a locator matches multiple elements on a webpage, but you want to select only one of them.

For example, on Amazon, the word Fashion might appear multiple times. If your locator finds four matching elements, you can use indexing to select the one you need.

Playwright provides the .nth() method for this.
2. Using .nth(index)
Syntax:
page.locator('your-selector').nth(index);


Remember: indexing starts from 0, not 1.
*/

const {test,expect}= require ('@playwright/test');
test('Indexing Locators', async ({ page }) => {
    
    await page.goto('https://www.amazon.in');

    for(let i=0; i<=10; i++){

    const toolBar= page.locator("a[class='nav-a  ']").nth(i);

    await expect(toolBar).toBeVisible();

    let toolBarText= await toolBar.textContent();

    console.log(toolBarText);

    }
    
});

// first() and last().