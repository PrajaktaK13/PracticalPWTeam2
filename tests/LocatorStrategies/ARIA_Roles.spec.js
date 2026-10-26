/*
An ARIA role describes what an element does on a webpage, 
helping assistive technologies understand its purpose.

For example:

Login- Role: button

Forgot password?-Role: link

Email-Role: textbox

Remember me-Role: checkbox

Think of it this way: role = what the element is; accessible name = what identifies it.

2. How do we use getByRole()?

Syntax:
page.getByRole('role', { name: 'accessible name' });


For example, suppose the webpage contains:

<button>Login</button>
<a href="/forgot-password">Forgot password?</a>
<input aria-label="Email">


You can locate these elements using:
const loginButton = page.getByRole('button', {
    name: 'Login'
});

const forgotPassword = page.getByRole('link', {
    name: 'Forgot password?'
});

const emailInput = page.getByRole('textbox', {
    name: 'Email'
});


Notice that getByRole() uses the role, not the HTML tag or CSS class.

Also, role names are generally lowercase, such as 'button', 'link', and 'textbox'.

3. Common ARIA roles to remember
Element or purpose	            Role
Button	                       button
Hyperlink	                    link
Text input	                   textbox
Checkbox	                   checkbox
Radio button	                radio
Dropdown/select	               combobox
Heading	                        heading
Image	                          img
Navigation section	            navigation
Main page content	              main

Some roles depend on the element's HTML and attributes. For example, <input type="password"> 
does not normally have the textbox role; use getByLabel() or another suitable locator for password fields.
*/


// Ex:


const { test, expect } = require('@playwright/test');

test('Practice ARIA roles', async ({ page }) => {

    await page.goto("https://www.amazon.in/");

    await page.waitForTimeout(3000);
     const shortCut = page.getByRole('heading', {
         name: 'Keyboard shortcuts'
     });   


    const playButton = page.getByRole('button', {
        name: 'play'
    }).first();

    await page.waitForTimeout(3000);
    const accountList= page.getByText('Account & Lists' , {
        exact: true
    });
    await accountList.click();

    const signup= page.getByText('Create a free business account' , {
        exact: true
    });

    await signup.click();

    const email= page.getByLabel('textbox', {
        name:'Enter an email. Work email preferred.'
    });
    

    // const loginButton = page.getByRole('button', {
    //     name: 'Login'
    // });

    // const forgotPassword = page.getByRole('link', {
    //     name: 'Forgot password?'
    // });

    await expect(shortCut).toBeVisible();
    await expect(playButton).toBeVisible();
    await expect(email).toBeVisible();
    // await expect(loginButton).toBeVisible();
    // await expect(forgotPassword).toBeVisible();
});

