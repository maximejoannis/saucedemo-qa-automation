const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.cartList = page.locator('[data-test="cart-list"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
  }

  async fillInformation(customer) {
    // learn: les champs sont remplis depuis checkoutData.js pour rendre les cas data-driven.
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.postalCodeInput.fill(customer.postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async submitInformation(customer) {
    // build: action composée utilisée par checkout et par le parcours E2E.
    await this.fillInformation(customer);
    await this.continue();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async expectInformationStep() {
    await expect(this.page).toHaveURL(/checkout-step-one/);
    await expect(this.title).toHaveText('Checkout: Your Information');
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
  }

  async expectOverviewStep() {
    await expect(this.page).toHaveURL(/checkout-step-two/);
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async expectErrorContains(message) {
    await expect(this.errorMessage).toContainText(message);
  }

  async expectSummary({ productNames, subtotal }) {
    for (const productName of productNames) {
      await expect(this.cartList).toContainText(productName);
    }
    // deploy: le total article est validé avant finalisation pour détecter les régressions métier.
    await expect(this.subtotalLabel).toContainText(`Item total: $${subtotal.toFixed(2)}`);
    await expect(this.taxLabel).toBeVisible();
    await expect(this.totalLabel).toBeVisible();
  }
}

module.exports = { CheckoutPage };
