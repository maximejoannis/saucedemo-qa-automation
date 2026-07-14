class CartPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemQuantities = page.locator('[data-test="item-quantity"]');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout', exact: true });
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async remove(productSlug) {
    await this.page.locator(`[data-test="remove-${productSlug}"]`).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async names() {
    return this.itemNames.allTextContents();
  }
}

module.exports = { CartPage };
