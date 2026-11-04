/*
What is an event handler?
An event is something that happens in the browser.

For example:
- A JavaScript alert appears.
- A new page or tab opens.
- A console message is generated.
- A request is sent to the server.
- A page navigation happens.
- An error occurs on the page.

An event handler is a function that executes when a particular event occurs.

Interview definition:

page.on() is a Playwright method used to register an event listener on a page.
The registered callback executes whenever the specified event occurs.
*/


const { test, expect } = require('@playwright/test');

test('Capture browser console messages', async ({ page }) => {

    // Listen for console events
    page.on('console', message => {

        console.log('Console type:', message.type());
        console.log('Console text:', message.text());

    });

    await page.goto('https://the-internet.herokuapp.com');

    //Generate a console message from the page
    await page.evaluate(() => {
        console.log('Hello from browser console!');
        console.error('This is a sample error');
    });

    await page.pause();

});

// page.on('request') : It listens whenever the browser sends a network request.

/*
page.on('request', request => {
    console.log(request.url());
});

Here:
- page.on() – registers an event listener.
- 'request' – listens for outgoing requests.
- request – contains information about the request.
- request.url() – gives the request URL.


Method	                              Purpose
request.url()	                  Gets request URL
request.method()	         Gets GET, POST, PUT, DELETE, etc.
request.resourceType()	   Gets resource type, such as document, script, image, xhr or fetch
request.postData()	            Gets the request body, if available
*/


test('Capture network requests', async ({ page }) => {

    // Listen for outgoing requests
    page.on('request', request => {

        if(request.method()=== 'GET'){
            console.log('Request URL:', request.url());
            console.log('Request Method:', request.method());
            console.log("Request resource:", request.resourceType);
            console.log("Request Body",request.postData());
        }        

    });

    // Open website
    await page.goto('https://the-internet.herokuapp.com/');

});

/*
What will happen?
1. Playwright registers the request listener.
2. The website starts loading.
3. The browser sends network requests.
4. Every time a request is sent, the callback executes.
5. It prints the request URL and HTTP method.
*/



// page.on('response'): It is an event listener that captures responses received by the browser.

/*
page.on('response', response => {
    console.log(response.url());
    console.log(response.status());
});


Here:
Part	Meaning
'response'	Event name
response	Callback parameter (you can give it another variable name)
response.url()	Gets the response URL
response.status()	Gets HTTP status code
*/

test('Capture network responses', async ({ page }) => {

    // Listen for server responses
    page.on('response', response => {

        console.log('Response URL:', response.url());
        console.log('Status Code:', response.status());

    });

    // Open website
    await page.goto('https://the-internet.herokuapp.com/');

});

// request.url() gives the URL where the browser sends the request.
// response.url() gives the URL associated with the response received from the server.


// pageerror:Sometimes a website has a JavaScript error while running.

test('Capture JavaScript errors', async ({ page }) => {

    page.on('pageerror', error => {
        console.log('Captured JavaScript Error:', error.message);
    });

    await page.goto('https://the-internet.herokuapp.com/');

    try {
        await page.evaluate(() => {
            let result;
            console.log(result.name);
        });
    } catch (error) {
        console.log('Error caught by test:', error.message);
    }

});


//page.on('close'):It listens for an event when a browser page or tab is closed.


test('Capture page close event', async ({ page }) => {

    page.on('close', () => {
        console.log('Browser page is closed');
    });

    await page.goto('https://the-internet.herokuapp.com/');

    await page.close();

});