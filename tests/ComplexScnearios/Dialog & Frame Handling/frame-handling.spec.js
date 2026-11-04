/*
What is a Frame?
A frame is an HTML document embedded inside another HTML document.

For example, imagine a webpage containing a YouTube video. The video may be displayed inside an iframe.

Main page: The webpage you open.
Iframe: A separate webpage embedded inside the main page.
Parent page: The webpage containing the iframe.
Child frame: The embedded webpage.

Real-life example
Imagine opening an online shopping website.

Inside the website:
- You have the main shopping page.
- A payment gateway is embedded inside an iframe.
- You need to enter card details inside that iframe.
Playwright needs to identify the iframe before interacting with elements inside it.


How do we handle frames in Playwright?
Playwright provides these methods:
Method	Purpose
page.frameLocator()	Locate an iframe and interact with its elements
page.frames()	Get all frames on a page
page.frame()	Find a frame using its name or URL

We'll learn these one by one with practical examples.
*/

const { test, expect } = require('@playwright/test');

test('Handle basic iframe', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/iframe');

    const frame = page.frameLocator('#mce_0_ifr');

    await frame.locator('body').fill('Hello Playwright');

    await page.pause();

});

/*
page.frames()
We just learned how to locate an iframe using frameLocator().

Now let's learn how to get all frames available on a webpage.
const allFrames = page.frames();

console.log('Total frames:', allFrames.length);


Understand the code:

- page.frames() returns an array containing all frames on the page, including the main frame.
- allFrames.length returns the total number of frames.
Important: If a webpage has one iframe, the total count will usually be 2:

1. Main page frame
2. Embedded iframe
*/




test('Multiple frames', async ({ page }) => {

await page.goto('https://the-internet.herokuapp.com/iframe');

const allFrames = page.frames();

console.log('Total frames:', allFrames.length);

for (const frame of allFrames) {
    console.log('Frame URL:', frame.url());
}
});

/*
Important difference:

Method	What it returns
page.frames()	Array of all frames
page.frameLocator()	Locator to interact with an iframe
page.frame()	A specific Frame object
*/



// page.frame(): page.frame() helps us access a specific frame directly.

/*It returns a Frame object, which we can use to interact with elements inside that frame.

Example:const myFrame = page.frame({ name: 'frameName' });


frame using its URL: const myFrame = page.frame({ url: /some-url/ });

Difference between frameLocator() and frame()
frameLocator()	                                        frame()
Returns a FrameLocator	                          Returns a Frame object
Uses locator-based interaction	                   Uses Frame methods
Supports auto-waiting for locators	            Does not provide locator auto-waiting by itself
Supports frameLocator() for nested iframes	   Supports childFrames() for inspecting nested frames
Supports getByRole(), getByText(), locator()	Supports url(), name(), goto(), locator()
*/

test('find a frame from frames', async ({ page }) => {

await page.goto('https://the-internet.herokuapp.com/iframe');

const allFrames = page.frames();

console.log('Total frames:', allFrames.length);

for (const frame of allFrames) {
    console.log('Frame URL:', frame.url());
    console.log('Is this the main frame?', frame === page.mainFrame());
}

   // Find a specific frame
    const myFrame = page.frame({ url: /about:srcdoc/ });

 // Locate iframe using frameLocator
    const frame1 = page.frameLocator('#mce_0_ifr');

    // Enter text inside iframe
    await frame1.locator('body').fill('Hello Playwright');
    
    // Get innerText using Frame object
     console.log('Iframe text:', await frame1.locator('body').innerText());     

});

// read frame and framelocator.