/*
What does multiple frame navigation mean?
Imagine a webpage contains multiple iframes:
- Frame 1 displays a login page.
- Frame 2 displays a dashboard.
- Frame 3 displays a profile page.
During test execution, these frames may navigate from one URL to another. For example, clicking a link inside an iframe may load a different page inside that same iframe.

This is called frame navigation.
2. Important methods
Method	                                 Purpose
page.frames()	                Gets all frames on the page
frame.url()	                    Gets the current URL of a frame
frame.goto(url)	                Navigates a frame to another URL
frame.waitForURL()	            Waits until a frame reaches a URL
page.on('framenavigated')	    Listens for frame navigation events
*/

const { test, expect } = require('@playwright/test');

test('Multiple frame navigation', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/nested_frames');

    // Get all frames
    const allFrames = page.frames();

    console.log('Total frames:', allFrames.length);

    // Print each frame URL
    for (const frame of allFrames) {
        console.log('Frame URL:', frame.url());
    }

    page.on('framenavigated', (frame) => {
        if(frame.name=='frame_top'){
              console.log('Frame navigated to:', frame.url());
        }
       
    });

    // const frame1 = allFrames[1];

    // navigate frame to oter url
    // await frame1.goto('https://example.com');

    // console.log('Current frame URL:', frame1.url());

    // wait for navigation
    // await frame1.waitForURL('https://example.com');

    // console.log('Frame navigated successfully!');

// for (const frame of allFrames) {

//     const text = await frame.locator('body').innerText({
//             timeout: 5000
//         });
//     console.log('Frame Name:', frame.name());
//     console.log('Frame Text:', text);
//}

    const frame2= allFrames[2];   

    const text = await frame2.locator('body').innerText();

    console.log(text);

});

// test each locators of each frame.