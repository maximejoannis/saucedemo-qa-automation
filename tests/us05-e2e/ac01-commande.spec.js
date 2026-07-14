const { test, expect } = require('../../src/fixtures/test');
const { validCustomer } = require('../../src/data/checkout');
const { products } = require('../../src/data/products');

async function reachOverview({ inventoryPage, cartPage, checkoutPage }) {
  await inventoryPage.add(products.backpack.slug);
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillCustomer(validCustomer);
  await checkoutPage.continue();
}

test.describe('US05 - Commande | Récapitulatif et finalisation', () => {
  test('TC-US05-AC01-01/03/04 récapitulatif et montants cohérents', async ({
    authenticatedPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await reachOverview({ inventoryPage, cartPage, checkoutPage });

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(checkoutPage.summaryItems).toHaveCount(1);
    await expect(checkoutPage.summaryNames).toHaveText(products.backpack.name);
    await expect(checkoutPage.summaryPrices).toHaveText(`$${products.backpack.price}`);
    await expect(checkoutPage.tax).toBeVisible();

    const subtotal = await checkoutPage.displayedAmount(checkoutPage.subtotal);
    const tax = await checkoutPage.displayedAmount(checkoutPage.tax);
    const total = await checkoutPage.displayedAmount(checkoutPage.total);

    expect(subtotal).toBe(products.backpack.price);
    expect(Number((subtotal + tax).toFixed(2))).toBe(total);
  });

  test('TC-US05-AC02-01 achat d’un produit @smoke @critical', async ({
    authenticatedPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await reachOverview({ inventoryPage, cartPage, checkoutPage });
    await checkoutPage.finish();

    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(checkoutPage.completeHeader).toBeVisible();
  });

  test('TC-US05-AC02-03/04/05 confirmation, retour et panier réinitialisé', async ({
    authenticatedPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await reachOverview({ inventoryPage, cartPage, checkoutPage });
    await checkoutPage.finish();

    await expect(checkoutPage.completeText).toContainText('dispatched');
    await checkoutPage.backHome();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.cartBadge).toHaveCount(0);

    await inventoryPage.openCart();
    await expect(cartPage.items).toHaveCount(0);
  });
});
