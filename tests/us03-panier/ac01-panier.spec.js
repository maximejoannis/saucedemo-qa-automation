const { test, expect } = require('../../src/fixtures/test');
const { products } = require('../../src/data/products');

const selectedProducts = [products.backpack, products.bikeLight, products.boltTShirt];

test.describe('US03 - Panier', () => {
  test.beforeEach(async ({ authenticatedPage }) => {});

  test('TC-US03-AC02-01 panier vide', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.openCart();

    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(cartPage.items).toHaveCount(0);
  });

  test('TC-US03-AC01-01 ajout un produit', async ({ inventoryPage }) => {
    await inventoryPage.add(products.backpack.slug);

    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(
      inventoryPage.page.locator(`[data-test="remove-${products.backpack.slug}"]`),
    ).toBeVisible();
  });

  test('TC-US03-AC01-02 ajout trois produits', async ({ inventoryPage }) => {
    for (const product of selectedProducts) await inventoryPage.add(product.slug);

    await expect(inventoryPage.cartBadge).toHaveText('3');
  });

  test('TC-US03-AC01-03 retrait depuis catalogue', async ({ inventoryPage }) => {
    await inventoryPage.add(products.backpack.slug);
    await inventoryPage.remove(products.backpack.slug);

    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('TC-US03-AC01-04 retrait depuis panier', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.add(products.backpack.slug);
    await inventoryPage.openCart();
    await cartPage.remove(products.backpack.slug);

    await expect(cartPage.items).toHaveCount(0);
  });

  test('TC-US03-AC01-05 retrait partiel conserve deux produits', async ({
    inventoryPage,
    cartPage,
  }) => {
    for (const product of selectedProducts) await inventoryPage.add(product.slug);
    await inventoryPage.openCart();
    await cartPage.remove(products.bikeLight.slug);

    await expect(cartPage.items).toHaveCount(2);
    await expect(inventoryPage.cartBadge).toHaveText('2');
    await expect.poll(() => cartPage.names()).toEqual([
      products.backpack.name,
      products.boltTShirt.name,
    ]);
  });

  test('TC-US03-AC02-02 contenu exact de deux produits', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.add(products.backpack.slug);
    await inventoryPage.add(products.bikeLight.slug);
    await inventoryPage.openCart();

    await expect(cartPage.items).toHaveCount(2);
    await expect(cartPage.itemQuantities).toHaveText(['1', '1']);
    await expect.poll(() => cartPage.names()).toEqual([
      products.backpack.name,
      products.bikeLight.name,
    ]);
  });

  test('TC-US03-AC02-04 continuer les achats revient au catalogue', async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.openCart();
    await cartPage.continueShopping();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.title).toBeVisible();
  });

  test('TC-US03-AC02-05 accès au checkout depuis un panier non vide', async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.add(products.backpack.slug);
    await inventoryPage.openCart();
    await cartPage.checkout();

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });
});
