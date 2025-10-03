import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object for the Swag Labs Login Page.
 */
export class ProductsPage {
  readonly page: Page;

  readonly productLabel: Locator; // Locator for asserting successful login

  constructor(page: Page) {
    this.page = page;
    // Initialize Locators
    this.productLabel = page.locator('.product_label');
  }

  /**
 * Asserts that the user has successfully logged in by checking the products label.
 */
  async assertLoginSuccess() {
    await expect(this.productLabel).toHaveText('Products');
  }

}