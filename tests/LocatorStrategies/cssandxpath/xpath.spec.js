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

    await page.goto("https://www.amazon.in/");
    
        const searchBar = page.locator("//input[@id='twotabsearchtextbox']");  // with id
    
        await expect(searchBar).toBeVisible();
    
        await page.waitForTimeout(3000);
    
        const helloSignin= page.locator("//span[@class='nav-line-1 nav-progressive-content']").last();// with class
    
        await expect(helloSignin.last()).toBeVisible();
    
        const accountsList= page.locator("//span[@class='nav-line-2 ']").first();// with tag+class
    
        await expect(accountsList.last()).toBeVisible();
    
        const search= page.locator("//input").nth(5);  // with tag
    
        await expect(search).toBeVisible();
    
        const electronics=page.locator("//div[@class='nav-div']//a[@class='nav-a  ']").nth(6);   //descendent combinater
    
        await expect(electronics).toBeVisible();
    
        const giftCards= page.locator("//div[@class='nav-div']/a[@class='nav-a  ']").nth(8);    // child combinator
    
        await expect (giftCards).toBeVisible(); 

        const cart= page.locator("//span[contains(@class, 'nav-cart-icon')]");  // contaians with

        await expect(cart).toBeVisible();

    
        // following, adjecent sibling in css and xpath         
        // and or concept , text() , check full xpath.
        // indexing in xpath.
        // normalize space, normalize text
});

test('Practice sibling locators', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    // CSS adjacent sibling
    const usernameInput = page.locator("//label/following-sibling::input[1]");

    // XPath following sibling
    const passwordInput = page.locator("//label[text()='Password']/following-sibling::input");

    console.log('Username matches:', await usernameInput.count());
    console.log('Password matches:', await passwordInput.count());
});

test('Practice and or in xpath', async ({ page }) => {
    await page.goto('https://www.amazon.in/');

    // and 
    const returnOrders = page.locator("//span[@class='nav-line-2' and text()='& Orders']");

    // or
    const All = page.locator("//span[@class='hm-icon-label' or text()='All']");

    console.log('returnOrders matches:', await returnOrders.count());
    console.log('All:', await All.count());
});

/* normalize-space() in XPath:
Sometimes HTML contains extra spaces or line breaks:

<button>
    Login
</button>

This XPath may not match as expected:
//button[text()='Login']

Instead of we can use:
//button[normalize-space(.)='Login']
*/













