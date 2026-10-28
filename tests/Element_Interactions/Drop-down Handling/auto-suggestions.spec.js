/*
Auto-complete dropdown
An auto-complete dropdown shows suggestions as you type.

For example, when you type Ind in a country field,
 it might suggest India and Indonesia. You then select the required suggestion.
*/

const {test, expect}= require('@playwright/test');

test('AutoDropDown test', async ({page})=>{
    await page.goto('https://www.playwrightautomation.com/practice.html');
    
    const dropDown = page.getByPlaceholder('Search for Products');

    await page.pause();

    await dropDown.fill('smart');  
    
    await page.pause();

    for(let i=0; i<8; i++){
       const prodName= page.locator("li[class='as-item']").nth(i)
       const name = page.locator("li[class='as-item']").nth(i).textContent();
       console.log(await name);
       if(await name === 'Smart Monitor'){
        await prodName.click();   
        break;           
       }
    }
    await expect(dropDown).toHaveValue('Smart Monitor');
    
});