const { expect } = require('@playwright/test');

class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.header = page.locator('[data-test="complete-header"]');
    this.text = page.locator('[data-test="complete-text"]');
  }

  async expectOrderCompleted() {
    // deploy: assertion finale du parcours critique d'achat.
    await expect(this.page).toHaveURL(/checkout-complete/);
    await expect(this.header).toHaveText('Thank you for your order!');
    await expect(this.text).toContainText('Your order has been dispatched');
  }
}

module.exports = { CheckoutCompletePage };
