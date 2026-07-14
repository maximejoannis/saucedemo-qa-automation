class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByText('Products', { exact: true });
    this.items = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sort = page.locator('[data-test="product-sort-container"]');
    this.names = page.locator('[data-test="inventory-item-name"]');
    this.descriptions = page.locator('[data-test="inventory-item-desc"]');
    this.prices = page.locator('[data-test="inventory-item-price"]');
    this.addButtons = page.getByRole('button', { name: 'Add to cart', exact: true });
    this.menuButton = page.getByRole('button', { name: 'Open Menu', exact: true });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.detailName = page.locator('[data-test="inventory-item-name"]');
    this.detailPrice = page.locator('[data-test="inventory-item-price"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  async add(productSlug) {
    await this.page.locator(`[data-test="add-to-cart-${productSlug}"]`).click();
  }

  async remove(productSlug) {
    await this.page.locator(`[data-test="remove-${productSlug}"]`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async openProduct(name) {
    await this.page
      .locator('[data-test$="-title-link"]')
      .filter({ hasText: name })
      .click();
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async selectSort(option) {
    await this.sort.selectOption(option);
  }

  async productNames() {
    return this.names.allTextContents();
  }

  async productPrices() {
    const prices = await this.prices.allTextContents();
    return prices.map((price) => Number(price.replace('$', '')));
  }
}

module.exports = { InventoryPage };
