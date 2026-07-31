const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  authenticatedPage: async ({ page, inventoryPage }, use) => {
    await page.goto('/inventory.html', { waitUntil: 'domcontentloaded' });
    await base.expect(page).toHaveURL(/\/inventory\.html$/);
    await base.expect(inventoryPage.title).toBeVisible();
    await use(page);
  },
});

module.exports = { test, expect: base.expect };
