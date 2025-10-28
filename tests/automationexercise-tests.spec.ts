import { test, expect, Page, BrowserContext } from '@playwright/test';
import * as allure from "allure-js-commons";
import { LoginPageAe } from '../pages/automationexercise/LoginPageAe';
import { HeaderPageAe } from '../pages/automationexercise/HeaderPageAe';
import { HomePageAe } from '../pages/automationexercise/HomePageAe';
import { ApisAeUserManagement } from '../apis/automationexercise/ApisAeUserManagement';
import * as fs from 'fs';

let context: BrowserContext;
let page: Page;

let loginPage: LoginPageAe;
let homePage: HomePageAe;
let headerPage: HeaderPageAe;
let apisAeUserManagement: ApisAeUserManagement;

let testData: any;

const timestamp = new Date().toISOString().replace(/[-T:.]/g, "").slice(0, 17);

test.describe('Automation Exercise Login Test Cases', () => {

  test('Test Case 2: Login User with correct email and password', async () => {
    allure.feature('Automation Exercise Login Test Cases');
    const email = testData.emailAddress + timestamp + '@test.com';
    await homePage.navigate();
    await headerPage.clickOnSignupLoginLink();
    await loginPage.login(email, testData.password);
    await headerPage.assertUserLoggedinSuccessfully(testData.username);
  });

  test.beforeAll(async () => {
    testData = JSON.parse(fs.readFileSync('./resources/test-data/automationexercise-testJsonFile.json', 'utf8'));
  });

  test.beforeEach(async ({ request, browser }) => {
    apisAeUserManagement = new ApisAeUserManagement(request);
    await apisAeUserManagement.createUser(testData.username, testData.emailAddress + timestamp + '@test.com', testData.password)

    context = await browser.newContext({ ignoreHTTPSErrors: true });
    page = await context.newPage();
    loginPage = new LoginPageAe(page);
    homePage = new HomePageAe(page);
    headerPage = new HeaderPageAe(page);
  });

  test.afterEach(async () => {
    await context.close();
  });

});