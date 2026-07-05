const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartList = page.locator('[data-test="cart-list"]');
    this.items = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  remove(product) {
    // learn: suppression pilotée par un objet produit plutôt qu'une chaîne hardcodée.
    return this.page.locator(`[data-test="remove-${product.slug}"]`).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async expectLoaded() {
    // build: assertion commune utilisée par les tests panier et E2E.
    await expect(this.page).toHaveURL(/cart/);
    await expect(this.cartList).toBeVisible();
  }

  async expectEmpty() {
    await expect(this.items).toHaveCount(0);
  }

  async expectProducts(productNames) {
    for (const productName of productNames) {
      await expect(this.cartList).toContainText(productName);
    }
    // deploy: contrôle du nombre d'articles pour éviter les faux positifs en pipeline.
    await expect(this.items).toHaveCount(productNames.length);
  }

  async expectCartBadgeHidden() {
    await expect(this.cartBadge).toBeHidden();
  }
}

module.exports = { CartPage };
