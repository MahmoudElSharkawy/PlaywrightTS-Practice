import { type Page, type Locator, expect } from '@playwright/test';
import { step, StepContext } from 'allure-js-commons';

export class ProductsPage {
  readonly page: Page;

  readonly productLabel: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productLabel = page.locator('.product_label');
  }

  async assertLoginSuccess() {
    await step("Navigate to Login Page", async () => {
      await expect(this.productLabel).toHaveText('Products');
    });
  }

}