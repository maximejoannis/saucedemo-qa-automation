const { expect } = require('@playwright/test');

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
  }

  addToCart(product) {
    // learn: le slug produit vient de la fixture products.js.
    return this.page.locator(`[data-test="add-to-cart-${product.slug}"]`).click();
  }

  removeFromCart(product) {
    // build: même convention de sélecteur pour retirer depuis le catalogue.
    return this.page.locator(`[data-test="remove-${product.slug}"]`).click();
  }

  removeButton(product) {
    return this.page.locator(`[data-test="remove-${product.slug}"]`);
  }

  addButton(product) {
    return this.page.locator(`[data-test="add-to-cart-${product.slug}"]`);
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortBy(option) {
    await this.sortSelect.selectOption(option);
  }

  async getProductNames() {
    return this.productNames.allTextContents();
  }

  async getProductPrices() {
    const pricesText = await this.productPrices.allTextContents();
    return pricesText.map((price) => Number(price.replace('$', '')));
  }

  async expectLoaded() {
    // deploy: vérifie le catalogue complet avant d'enchaîner les scénarios critiques.
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.title).toHaveText('Products');
  }

  async expectProductCount(count) {
    await expect(this.inventoryItems).toHaveCount(count);
  }

  async expectCartBadge(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async expectCartBadgeHidden() {
    await expect(this.cartBadge).toBeHidden();
  }
}

module.exports = { ProductsPage };
