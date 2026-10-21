

//location permission
const { test, expect, chromium } = require('@playwright/test');

test('Check location permission', async ({ page, context }) => {

    await context.grantPermissions(['geolocation']); // Allow location access.

    await context.setGeolocation({   // Set a fake location for testing
        latitude: 18.5204,
        longitude: 73.8567
    });

    await page.goto('https://permission.site/');  // Open the website.
 
    const permission = await page.evaluate(async () => {  // Run JavaScript inside the browser page.
        const result = await navigator.permissions.query({  //Check the location permission state.
            name: 'geolocation'
        });

        return result.state;
    });

    console.log('Location permission:', permission);

    expect(permission).toBe('granted');   // Verify that permission is granted.
});

/*
We use page.evaluate() because navigator.permissions.query() is a browser Web API. 
We want to ask the browser webpage for the current location permission state.
The result might be "granted", "denied", or "prompt".

page.evaluate() is a Playwright method used to execute JavaScript in the browser 
page and return the result to the test.
*/



// test locale

test('test locale', async ({ page }) => {

    const locale = await page.evaluate(() => navigator.language);// reads the language preference from the browser.

    console.log('Browser locale:', locale);

    //expect(locale).toBe('en-US');

});



// camera permissions

test('Check camera permission', async ({ page, context }) => {

    // Grant camera permission
    await context.grantPermissions(['camera']);

    // Open a website
    await page.goto('https://permission.site/');

    // Check camera permission state
    const permission = await page.evaluate(async () => {
        const result = await navigator.permissions.query({
            name: 'camera'
        });
        
        return result.state;
    });

    console.log('Camera permission:', permission);
   

    // Verify camera permission
       expect(permission).toBe('granted');
});

/*
navigator — provides access to browser features.
.permissions — accesses the browser's Permissions API.
.query() — asks for the current permission status.
{ name: 'camera' } — specifies which permission we want to check.
 */

// disable push notifications


test('Disable browser push notifications', async ({ browser }) => {

    const context = await browser.newContext({
        permissions: [] // Does not grant any optional browser permissions to this context.
    });

    const page = await context.newPage();

    await page.goto('https://www.google.com');

    console.log('Browser notifications are not granted');

    await expect(page).toHaveTitle(/Google/);

    await context.close();
});



test('Disable browser notifications', async () => {

    const browser = await chromium.launch({
        headless: false,
        args: ['--disable-notifications']
    });

    const page = await browser.newPage();

    await page.goto('https://www.google.com');

    const notificationPermission = await page.evaluate(async () => {
        const result = await navigator.permissions.query({
            name: 'notifications'
        });

        return result.state;
    });

    console.log('Notification permission:', notificationPermission);

    expect(notificationPermission).toBe('denied');

    await browser.close();
});


/*
Remember the key difference:
- Grant permission → allow access.
- Check permission → verify the permission state.
- Test functionality → verify that the feature actually works.
*/

// to leran camera with args