const { test } = require('../testBase');
const { products } = require('../../fixtures/products');

test.describe('Panier SauceDemo', () => {
  test('@regression @cart consultation du panier vide', async ({ authenticatedPage, productsPage, cartPage }) => {
    await productsPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectEmpty();
  });

  test('@regression @cart vérification du contenu du panier', async ({ authenticatedPage, productsPage, cartPage }) => {
    await test.step('learn - ajouter deux produits depuis le catalogue', async () => {
      await productsPage.addToCart(products.backpack);
      await productsPage.addToCart(products.bikeLight);
      await productsPage.expectCartBadge(2);
    });

    await test.step('build - ouvrir le panier', async () => {
      await productsPage.openCart();
      await cartPage.expectLoaded();
    });

    await test.step('deploy - vérifier le contenu attendu', async () => {
      await cartPage.expectProducts([products.backpack.name, products.bikeLight.name]);
    });
  });

  test('@regression @cart suppression d’un produit depuis le panier', async ({ authenticatedPage, productsPage, cartPage }) => {
    await productsPage.addToCart(products.backpack);
    await productsPage.openCart();

    await cartPage.expectProducts([products.backpack.name]);
    await cartPage.remove(products.backpack);

    await cartPage.expectEmpty();
    await cartPage.expectCartBadgeHidden();
  });

  test('@regression @cart retour au catalogue depuis le panier', async ({ authenticatedPage, productsPage, cartPage }) => {
    await productsPage.openCart();
    await cartPage.continueShopping();

    await productsPage.expectLoaded();
  });
});
