/*
Bootstrap and custom dropdowns
Unlike a native dropdown, a custom dropdown is often built using elements such as div, button, and li instead of the HTML select tag.
1. Native dropdown

Uses the HTML select element. Playwright can use selectOption().

await page.locator('#country').selectOption('India');


2. Custom dropdown

Uses clickable elements. Usually, click the dropdown first, then click the desired option.

await page.locator('#countryDropdown').click();
await page.getByText('India', { exact: true }).click();
*/

const {test, expect}= require('@playwright/test');

test('Custom dropDown test', async ({page})=>{
    await page.goto('https://demoqa.com/select-menu');
    
    const dropDown = page.locator("div[class='css-19bb58m']").first();

    await dropDown.click();

    //await page.pause();

    await page.getByText('Group 1, option 1', { exact: true }).click();

    const dropdown= page.locator("div[class='css-19bb58m']").first();

    await page.pause();

    await expect(dropDown).toHaveText('Group 1, option 1');    
    
});

/*
Bootstrap dropdown:

A dropdown built using Bootstrap's ready-made styling and JavaScript behavior. Internally, 
it commonly uses buttons, <div> elements, and links.

Example: https://getbootstrap.com/docs/5.3/components/dropdowns/

Playwright: usually click() the button, then click() the option.s
*/

test('Bootstrap dropdown', async ({page})=>{
    await page.goto("https://getbootstrap.com/docs/5.3/components/dropdowns/");

    const dropDownBtn= page.locator("div.dropdown>button.btn").nth(0);

    await dropDownBtn.click();

    const actionOption = page.getByRole('link', { name: 'Another action', exact: true }).first();

    await expect(actionOption).toBeVisible();
   
    await actionOption.click();   
});

/*
What is the actual difference?
Feature	                           Custom dropdown	                  Bootstrap dropdown
Who builds it?	               Developer or UI library	              Bootstrap framework
Appearance	                     Depends on the design	         Uses Bootstrap styling by default
Behavior	                Developer or library controls it	Bootstrap provides dropdown behavior
Playwright handling	      Usually click and select an option	 Usually click and select an option

For both custom and Bootstrap dropdowns, the Playwright steps are often identical.
The main difference is how the dropdown was built, not how we automate it.
*/