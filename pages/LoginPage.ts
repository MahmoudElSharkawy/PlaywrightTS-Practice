import { type Page, type Locator, expect } from '@playwright/test';
// import * as allure from "allure-js-commons";
import { step, StepContext } from 'allure-js-commons';

export class LoginPage {
  readonly page: Page;
  readonly url: string = 'https://www.saucedemo.com/v1/index.html';

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    //  Locators
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('h3');
  }

  // todo: Add allure steps in actions

  async goto() {
    await step("Navigate to Login Page", async () => {
      await this.page.goto(this.url);
    });
  }

  async login(username: string, password: string) {
    await step("User Login", async (context: StepContext) => {
      // await allure.parameter('username', username);
      await context.parameter("Username", username);
      await context.parameter("Password", password);
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    });
  }

  async assertOnErrorMessage(errorMessage: string) {
    await step("Assert on Error Message", async (context: StepContext) => {
      await context.parameter("Error Message", errorMessage);
      await expect(this.errorMessage).toHaveText(errorMessage);
    });
  }

}