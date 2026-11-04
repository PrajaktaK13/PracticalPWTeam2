/*
Types of built-in locators
Locator	                         Purpose
getByRole()	        Finds elements by their role and optionally their accessible name
getByText()	        Finds elements by visible text
getByLabel()	    Finds form controls using their associated label
getByPlaceholder()	Finds input fields using placeholder text
getByAltText()	    Finds images using their alternative text
getByTitle()	    Finds elements using their title attribute
getByTestId()	    Finds elements using a test ID attribute
*/

// getByRole() locates an element based on its accessibility role and, optionally, its accessible name.
const {test,expect}= require ('@playwright/test');
test('Built-in Locators', async ({ page }) => {
    await page.goto('https://www.amazon.in');

    const signInButton = page.getByRole('Link', {
        name: 'Amazon.in'
    });

    await expect(signInButton).toBeVisible();

    const amazonLogo= page.getByText('Fashion', {
    exact: true
});

    await expect(amazonLogo).toBeVisible();

    const accountList= page.getByText('Account & Lists' , {
        exact: true
    });

    await accountList.click();

    const mobileInput = page.getByLabel('Enter mobile number or email');

    await expect(mobileInput).toBeVisible();

    await page.goBack();

    const searchBar = page.getByPlaceholder('Search Amazon.in');

    await expect(searchBar).toBeVisible();

    const festivalImage= page.getByAltText('Jan26_Event');

    await expect(festivalImage).toBeVisible();

    // const title = page.getByTitle('Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in');

    // await expect(title).toBeVisible();

    await accountList.click();

    const signup= page.getByText('Create a free business account' , {
        exact: true
    });

    await signup.click();

     const enterEmail = page.getByTestId('businessEmail-test-id');

    await expect(enterEmail).toBeVisible();
    
});


