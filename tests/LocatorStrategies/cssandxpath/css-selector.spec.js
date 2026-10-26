/*
What is a locator?
A locator is a way to identify an element on a web page so Playwright can interact with it or verify it.
*/



const { test, expect } = require('@playwright/test');

const locators={
    searchBar: "[id='twotabsearchtextbox']",
    helloSignin:".nav-line-1.nav-progressive-content",
    accountsList:"span.nav-line-2  "
}

test('Practice CSS selectors on Gmail', async ({ page }) => {
    await page.goto("https://www.amazon.in/");

    const searchBar = page.locator(locators.searchBar);  // with id

    await expect(searchBar).toBeVisible();

    await page.waitForTimeout(3000);

    const helloSignin= page.locator(locators.helloSignin);// with class

    await expect(helloSignin.last()).toBeVisible();

    const accountsList= page.locator(locators.helloSignin);// with tag+class

    await expect(accountsList.last()).toBeVisible();

    const search= page.locator("input").nth(5);  // with tag

    await expect(search).toBeVisible();

    const electronics=page.locator("div.nav-div a.nav-a  ").nth(9);   //descendent combinater

    await expect(electronics).toBeVisible();

    const giftCards= page.locator("div.nav-div>a.nav-a  ").nth(8);    // child combinator

    await expect (giftCards).toBeVisible(); 

    const cart= page.locator("span[class*='nav-cart-icon']");  // contaians with

    await expect(cart).toBeVisible();

    
});

// check all the syllabus from css selectors frm JS.
// inbuilt locators.
// in object