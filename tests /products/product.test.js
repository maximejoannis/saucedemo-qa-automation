const { test, expect } = require('../testBase');
const { products, productSort } = require('../../fixtures/products');

test.describe('Catalogue produits SauceDemo', () => {
  test('@smoke @products affichage du catalogue produits', async ({ authenticatedPage, productsPage }) => {
    await productsPage.expectLoaded();
    await productsPage.expectProductCount(6);
  });

  test('@regression @products ajout d’un produit au panier', async ({ authenticatedPage, productsPage }) => {
    await productsPage.addToCart(products.backpack);

    await productsPage.expectCartBadge(1);
    await expect(productsPage.removeButton(products.backpack)).toBeVisible();
  });

  test('@regression @products ajout de plusieurs produits au panier', async ({ authenticatedPage, productsPage }) => {
    await productsPage.addToCart(products.backpack);
    await productsPage.addToCart(products.bikeLight);
    await productsPage.addToCart(products.boltTShirt);

    await productsPage.expectCartBadge(3);
  });

  test('@regression @products retrait d’un produit depuis le catalogue', async ({ authenticatedPage, productsPage }) => {
    await productsPage.addToCart(products.backpack);
    await productsPage.expectCartBadge(1);

    await productsPage.removeFromCart(products.backpack);

    await productsPage.expectCartBadgeHidden();
    await expect(productsPage.addButton(products.backpack)).toBeVisible();
  });

  test('@regression @products tri des produits de Z à A', async ({ authenticatedPage, productsPage }) => {
    await productsPage.sortBy('za');

    await expect(await productsPage.getProductNames()).toEqual(productSort.nameDesc);
  });

  test('@regression @products tri des produits par prix croissant', async ({ authenticatedPage, productsPage }) => {
    await productsPage.sortBy('lohi');

    await expect(await productsPage.getProductPrices()).toEqual(productSort.priceAsc);
  });
});
