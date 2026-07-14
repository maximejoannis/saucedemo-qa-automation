const { test, expect } = require('../../src/fixtures/test');
const { products } = require('../../src/data/products');

const ascendingNames = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Onesie',
  'Test.allTheThings() T-Shirt (Red)',
];

test.describe('US02 - Catalogue', () => {
  test.beforeEach(async ({ authenticatedPage }) => {});

  test('TC-US02-AC01-01 six produits affichés', async ({ inventoryPage }) => {
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('TC-US02-AC01-02 chaque produit affiche nom, description et prix', async ({
    inventoryPage,
  }) => {
    await expect(inventoryPage.names).toHaveCount(6);
    await expect(inventoryPage.descriptions).toHaveCount(6);
    await expect(inventoryPage.prices).toHaveCount(6);

    for (let index = 0; index < 6; index += 1) {
      await expect(inventoryPage.names.nth(index)).not.toHaveText('');
      await expect(inventoryPage.descriptions.nth(index)).not.toHaveText('');
      await expect(inventoryPage.prices.nth(index)).toHaveText(/^\$\d+\.\d{2}$/);
    }
  });

  test('TC-US02-AC01-03 lien détail puis TC-US02-AC01-04 retour catalogue', async ({
    page,
    inventoryPage,
  }) => {
    await inventoryPage.openProduct(products.backpack.name);

    await expect(page).toHaveURL(/\/inventory-item\.html/);
    await expect(inventoryPage.detailName).toHaveText(products.backpack.name);
    await expect(inventoryPage.detailPrice).toHaveText(`$${products.backpack.price}`);

    await inventoryPage.backToProducts();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.title).toBeVisible();
  });

  test('TC-US02-AC01-05 un bouton Add to cart par produit', async ({ inventoryPage }) => {
    await expect(inventoryPage.addButtons).toHaveCount(6);
  });

  test('TC-US02-AC02-01 tri A-Z', async ({ inventoryPage }) => {
    await inventoryPage.selectSort('az');
    await expect.poll(() => inventoryPage.productNames()).toEqual(ascendingNames);
  });

  test('TC-US02-AC02-02 tri Z-A', async ({ inventoryPage }) => {
    await inventoryPage.selectSort('za');

    await expect.poll(() => inventoryPage.productNames()).toEqual([...ascendingNames].reverse());
  });

  test('TC-US02-AC02-03 tri prix croissant', async ({ inventoryPage }) => {
    await inventoryPage.selectSort('lohi');

    await expect.poll(() => inventoryPage.productPrices()).toEqual([
      7.99,
      9.99,
      15.99,
      15.99,
      29.99,
      49.99,
    ]);
  });

  test('TC-US02-AC02-04 tri prix décroissant', async ({ inventoryPage }) => {
    await inventoryPage.selectSort('hilo');

    await expect.poll(() => inventoryPage.productPrices()).toEqual([
      49.99,
      29.99,
      15.99,
      15.99,
      9.99,
      7.99,
    ]);
  });

  test('TC-US02-AC02-05 changement successif de tri', async ({ inventoryPage }) => {
    await inventoryPage.selectSort('az');
    await expect.poll(() => inventoryPage.productNames()).toEqual(ascendingNames);

    await inventoryPage.selectSort('hilo');
    await expect.poll(() => inventoryPage.productPrices()).toEqual([
      49.99,
      29.99,
      15.99,
      15.99,
      9.99,
      7.99,
    ]);
  });
});
