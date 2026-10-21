/*
What is XPath?
Interview definition: XPath (XML Path Language) is a way to locate elements in an HTML 
or XML document using the element's structure, attributes, text, and relationships with other elements.
*/


/*
1. Absolute xpath vs Relative xpath:
/ Absolute XPath:Starts from the root of the HTML document and follows the complete path to the element.

e.g: /html/body/div[1]/div[2]/input

Disadvantage: If the page structure changes, the XPath can break.

2 Relative xpath: Finds an element based on its attributes, text, or relationships.

e.g: //input[@placeholder="Search mail"]

*/

// Relative xpath example from amazon.com

const {test, expect} = require ('@playwright/test');

test('Test relative xpath', async ({page}) =>{

    await page.goto('https://www.amazon.com/');

    const searchBox= page.locator("//input[@id='twotabsearchtextbox']");

    await expect(searchBox).toBeVisible();

    await searchBox.fill('mobile');

    await page.waitForTimeout(3000);

    const searchButton= page.locator("//div[@class='nav-search-submit nav-sprite']");

    await expect(searchButton).toBeVisible();

    await searchButton.click();  

    await page.waitForTimeout(3000);

    const firstResult = page.locator("//a[@class='a-link-normal s-line-clamp-3 s-link-style a-text-normal']").nth(0);

    await firstResult.click();

});














