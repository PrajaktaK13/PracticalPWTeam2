/*
Mouse Actions in Playwright:
1. Hover:

Hover means moving the mouse pointer over an element without clicking it.

Real-life example: When you move your mouse over a menu such as Products, a submenu appears.

2. Left Click:

A left click is the normal mouse click used to select a button, open a link, or submit a form.

3. Double-click action:

 Double-click performs two clicks in quick succession on an element.

 4. Right click action:

 Right click action performs right click on an element.

*/

// Ex:

const { test, expect } = require('@playwright/test');

test('Mouse click hover actions', async ({ page }) => {
    await page.goto('https://www.amazon.in/');

    const accountListButton= page.locator("span[class='nav-line-2 ']");

    const signinSection= page.locator('#nav-al-signin');

    accountListButton.hover();   // mouse hover

    await page.waitForTimeout(2000);

    await expect(signinSection).toBeVisible();    

    const updateLocation= page.locator("#glow-ingress-line2");

    await updateLocation.click(); // left click

    const locationPopUp= page.locator("#a-popover-header-1");

    await expect(locationPopUp).toBeVisible();

    await expect(locationPopUp).toHaveText('Choose your location');

});

test('Mouse double click actions',async ({page})=>{

    await page.goto("https://demoqa.com/buttons");

    const doubleClickButton= page.locator("#doubleClickBtn");

    doubleClickButton.dblclick();  // double click

    const doubleMessage= page.locator("#doubleClickMessage");

    await expect(doubleMessage).toHaveText("You have done a double click");

    const rightClickButton= page.locator("#rightClickBtn");

    await rightClickButton.click({ button: 'right' });  // righ click

    const rightMessage= page.locator("#rightClickMessage");

    await expect(rightMessage).toHaveText("You have done a right click");
});

