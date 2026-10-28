/*
Drag and drop means selecting an element with the mouse, moving it to another location, 
and releasing it there.
*/

const { test, expect } = require('@playwright/test');


test('Drag and drop test', async ({ page }) => {

    await page.goto('https://demoqa.com/droppable');

    const source = page.locator('#draggable');
    const target = page.locator('#droppable').first(); 

    await page.waitForTimeout(3000);
    await source.dragTo(target);    

    await expect(target).toHaveText('Dropped!');
    
});


