import { test, expect } from '@playwright/test';
import * as allure from "allure-js-commons";
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import * as fs from 'fs';

let loginPage: LoginPage;
let productsPage: ProductsPage;

let testData: any;

test.describe('Swag Labs Login Test Cases', () => {

  test('Valid login - Should redirect to the products page', async () => {
    allure.feature('Swag Labs Login Test Cases');
    await loginPage.login(testData.username, testData.password)
    await productsPage.assertLoginSuccess();
  });

  test('Locked out user login - Should show an error message', async () => {
    allure.feature('Swag Labs Login Test Cases');
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.assertOnErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Invalid password login - Should show a credential error message', async () => {
    allure.feature('Swag Labs Login Test Cases');
    await loginPage.login('standard_user', 'wrong_password');
    await loginPage.assertOnErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/testJsonFile.json', 'utf8'));
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.goto();
  });

});