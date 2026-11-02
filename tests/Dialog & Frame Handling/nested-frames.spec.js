/*
What is a nested iframe?
        A nested iframe means an iframe inside another iframe.

     - Main webpage contains a parent iframe.
     - Parent iframe contains another iframe (child iframe).
     - Login button is inside the child iframe.

How do we handle nested iframes?
    We can use frameLocator() multiple times.
*/

// const { expect } = require("@playwright/test");

//Ex:

// const parentFrame = page.frameLocator('#parentFrame');

// const childFrame = parentFrame.frameLocator('#childFrame');

// await childFrame.locator('#login').click();

/*
Understand the sequence
1. page.frameLocator() locates the parent iframe.
2. parentFrame.frameLocator() locates the child iframe inside the parent.
3. childFrame.locator() locates an element inside the child iframe.
4. click() performs the action.

 Definition: 
       "Nested iframes are frames embedded inside other frames. 
In Playwright, we can handle them by chaining frameLocator() methods to locate the parent frame, 
child frame, and then the required element."

*/ 


const {test, expect}= require ('@playwright/test');

test('Nested iframes', async ({page})=>{

    await page.goto("https://demoqa.com/nestedframes");

    const parentFrame= await page.frameLocator('#frame1');

   const childFrame = parentFrame.frameLocator('iframe');

     // Get parent frame text
    const parentText = await parentFrame.locator('body').innerText();

    // Get child frame text
    const childText = await childFrame.locator('body').innerText();

    console.log('Parent Frame:', parentText);
    console.log('Child Frame:', childText);
})