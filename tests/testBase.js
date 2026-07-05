const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { CheckoutCompletePage } = require('../pages/CheckoutCompletePage');
const { users } = require('../fixtures/users');

const test = base.test.extend({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  productsPage: async ({ page }, use) => use(new ProductsPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  checkoutCompletePage: async ({ page }, use) => use(new CheckoutCompletePage(page)),
  authenticatedPage: async ({ page }, use) => {
    // learn: cette fixture documente le prérequis commun aux tests catalogue, panier et checkout.
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // build: chaque test repart d'une nouvelle page authentifiée et indépendante.
    await loginPage.open();
    await loginPage.login(users.standard);
    await productsPage.expectLoaded();

    // deploy: limite les duplications et réduit le risque de divergence en CI.
    await use(page);
  },
});

module.exports = { test, expect: base.expect };
