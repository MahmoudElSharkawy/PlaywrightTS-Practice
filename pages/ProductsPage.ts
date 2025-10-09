import { type Page, type Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  readonly productLabel: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productLabel = page.locator('.product_label');
  }

    // todo: Add allure steps in actions

  async assertLoginSuccess() {
    await expect(this.productLabel).toHaveText('Products');
  }

}