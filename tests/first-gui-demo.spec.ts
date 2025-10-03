import { test, expect, Locator } from '@playwright/test';

let username_input: Locator;
let password_input: Locator;
let login_button: Locator;


test.describe('Swag labs Login Test Cases', () => {

  test('Valid login', async ({ page }) => {
    await username_input.fill('standard_user');
    await password_input.fill('secret_sauce');
    await login_button.click();
    await expect(page.locator('.product_label')).toHaveText('Products');
  });

  test('Lockedout user login', async ({ page }) => {
    await username_input.fill('locked_out_user');
    await password_input.fill('secret_sauce');
    await login_button.click();
    await expect(page.locator('h3')).toHaveText('Epic sadface: Sorry, this user has been locked odut.');
  });

});

test.beforeEach(async ({ page }) => {
  username_input = page.locator('#user-name');
  password_input = page.locator('#password');
  login_button = page.locator('#login-button');
  
  await page.goto('https://www.saucedemo.com/v1/index.html');
});

test.afterEach(async ({ page, browser }) => {
  await page.close(); // Close the page after each test
  await browser.close(); // Close the browser after each test
});
