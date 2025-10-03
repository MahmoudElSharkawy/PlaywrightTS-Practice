import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object for the Swag Labs Login Page.
 */
export class LoginPage {
  readonly page: Page;
  readonly url: string = 'https://www.saucedemo.com/v1/index.html';

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Initialize Locators
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('h3');
  }

  /**
   * Navigates to the Swag Labs login page.
   */
  async goto() {
    await this.page.goto(this.url);
  }

  /**
   * Performs the login action.
   * @param username The username to enter.
   * @param password The password to enter.
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Asserts that the locked-out user error message is displayed.
   */
  async assertOnErrorMessage(errorMessage: string) {
    await expect(this.errorMessage).toHaveText(errorMessage);
  }

}