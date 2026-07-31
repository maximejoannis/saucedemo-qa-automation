const { test, expect } = require("../../src/fixtures/test");
const { validCustomer } = require("../../src/data/checkout");
const { products } = require("../../src/data/products");

const selectedProducts = [
  products.backpack,
  products.bikeLight,
  products.boltTShirt,
];

async function reachOverview({ inventoryPage, cartPage, checkoutPage }) {
  await inventoryPage.add(products.backpack.slug);
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillCustomer(validCustomer);
  await checkoutPage.continue();
}

async function reachOverviewWithProducts({
  inventoryPage,
  cartPage,
  checkoutPage,
  selectedProducts,
}) {
  for (const product of selectedProducts) {
    await inventoryPage.add(product.slug);
  }

  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutPage.fillCustomer(validCustomer);
  await checkoutPage.continue();
}

test.describe("US05 - Commande | Récapitulatif et finalisation", () => {
  test("TC-US05-AC01-01/03/04 récapitulatif et montants cohérents", async ({
    authenticatedPage: _authenticatedPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await reachOverview({
      inventoryPage,
      cartPage,
      checkoutPage,
    });

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(checkoutPage.summaryItems).toHaveCount(1);
    await expect(checkoutPage.summaryNames).toHaveText(products.backpack.name);
    await expect(checkoutPage.summaryPrices).toHaveText(
      `$${products.backpack.price}`,
    );
    await expect(checkoutPage.tax).toBeVisible();

    const subtotal = await checkoutPage.displayedAmount(checkoutPage.subtotal);
    const tax = await checkoutPage.displayedAmount(checkoutPage.tax);
    const total = await checkoutPage.displayedAmount(checkoutPage.total);

    expect(subtotal).toBe(products.backpack.price);
    expect(Number((subtotal + tax).toFixed(2))).toBe(total);
  });

  test("TC-US05-AC01-02 récapitulatif avec trois produits", async ({
    authenticatedPage: _authenticatedPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await reachOverviewWithProducts({
      inventoryPage,
      cartPage,
      checkoutPage,
      selectedProducts,
    });

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(checkoutPage.summaryItems).toHaveCount(3);

    await expect(checkoutPage.summaryNames).toHaveText([
      products.backpack.name,
      products.bikeLight.name,
      products.boltTShirt.name,
    ]);

    const expectedSubtotal = Number(
      selectedProducts
        .reduce((sum, product) => sum + product.price, 0)
        .toFixed(2),
    );

    const displayedSubtotal = await checkoutPage.displayedAmount(
      checkoutPage.subtotal,
    );

    const tax = await checkoutPage.displayedAmount(checkoutPage.tax);

    const total = await checkoutPage.displayedAmount(checkoutPage.total);

    expect(displayedSubtotal).toBe(expectedSubtotal);
    expect(Number((displayedSubtotal + tax).toFixed(2))).toBe(total);
  });

  test("TC-US05-AC01-05 annulation depuis le récapitulatif retourne au catalogue", async ({
    authenticatedPage: _authenticatedPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await reachOverview({
      inventoryPage,
      cartPage,
      checkoutPage,
    });

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(checkoutPage.cancelButton).toBeVisible();

    await checkoutPage.cancel();

    await expect(page).toHaveURL(/\/inventory\.html$/);
  });

  test("TC-US05-AC02-01 achat d’un produit @smoke @critical", async ({
    authenticatedPage: _authenticatedPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await reachOverview({
      inventoryPage,
      cartPage,
      checkoutPage,
    });

    await checkoutPage.finish();

    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(checkoutPage.completeHeader).toBeVisible();
  });

  test("TC-US05-AC02-02 achat de trois produits", async ({
    authenticatedPage: _authenticatedPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await reachOverviewWithProducts({
      inventoryPage,
      cartPage,
      checkoutPage,
      selectedProducts,
    });

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(checkoutPage.summaryItems).toHaveCount(3);

    await checkoutPage.finish();

    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(checkoutPage.completeHeader).toBeVisible();
  });

  test("TC-US05-AC02-03/04/05 confirmation, retour et panier réinitialisé", async ({
    authenticatedPage: _authenticatedPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await reachOverview({
      inventoryPage,
      cartPage,
      checkoutPage,
    });

    await checkoutPage.finish();

    await expect(checkoutPage.completeText).toContainText("dispatched");

    await checkoutPage.backHome();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.cartBadge).toHaveCount(0);

    await inventoryPage.openCart();

    await expect(cartPage.items).toHaveCount(0);
  });
});
