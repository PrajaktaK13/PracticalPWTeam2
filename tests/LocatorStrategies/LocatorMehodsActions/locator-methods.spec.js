/*
locator()
Definition: The locator() method finds one or more elements on a webpage using a CSS selector, 
XPath, or another supported selector.
*/

// Locator methods:
const {test, expect}= require ('@playwright/test');

test('Practice locator methods', async ({ page }) => {
    await page.goto('https://www.amazon.in');

    await page.waitForLoadState('domcontentloaded');

    console.log('Page title:', await page.title());

    const searchBox = page.locator('#twotabsearchtextbox');

    await searchBox.waitFor({ state: 'visible' });

    console.log('Count:', await searchBox.count());
    console.log('Visible:', await searchBox.isVisible());
    console.log('Editable:',await searchBox.isEditable());
    console.log("Enable:",await searchBox.isEditable());
    console.log("Hidden:",await searchBox.isHidden());

  
    console.log('Count after waiting:', await searchBox.count());

    await searchBox.fill('laptop');

    console.log('Input value:', await searchBox.inputValue());

    await expect(searchBox).toHaveValue('laptop');
});

// innertext, textcontent

/*
innerText(): Gets the text as it is visibly rendered to the user.
textContent():Gets the text content contained in the element, including text that may not be visible.
*/

test('Get innerText', async ({ page }) => {
    await page.goto('https://www.amazon.in');

    const text = await page.locator('#nav-logo-sprites').innerText();

    console.log(text);
});

test('Get textContent', async ({ page }) => {
    await page.goto('https://www.amazon.in');

    const text = await page.locator("span[class='nav-line-2']").first().textContent();

    console.log(text);
});

/*
What is the difference?
Feature	                              innerText()	       textContent()
Gets visible, rendered text	             Yes	               Not necessarily
Includes hidden text	                Generally no	            Yes
Considers rendered layout	              Yes	                    No
Can include text from child elements	  Yes	                    Yes
Typical use	                        Check text users see	Read all text content

Remember: both methods return a string or null for textContent()
 when the element has no text content. In Playwright, both are asynchronous locator methods, so use await.
*/
