const { test } = require('../testBase');
const { products } = require('../../fixtures/products');
const { checkoutData } = require('../../fixtures/checkoutData');

test.describe('Parcours achat complet SauceDemo', () => {
  test('@smoke @critical @e2e achat complet de plusieurs produits', async ({
    authenticatedPage,
    productsPage,
    cartPage,
    checkoutPage,
    checkoutCompletePage,
  }) => {
    const selectedProducts = [products.backpack, products.bikeLight, products.boltTShirt];
    const subtotal = selectedProducts.reduce((sum, product) => sum + product.price, 0);

    await test.step('learn - sélectionner les produits du parcours critique', async () => {
      for (const product of selectedProducts) {
        await productsPage.addToCart(product);
      }
      await productsPage.expectCartBadge(selectedProducts.length);
    });

    await test.step('build - contrôler le panier avant checkout', async () => {
      await productsPage.openCart();
      await cartPage.expectLoaded();
      await cartPage.expectProducts(selectedProducts.map((product) => product.name));
    });

    await test.step('build - renseigner les informations client', async () => {
      await cartPage.checkout();
      await checkoutPage.expectInformationStep();
      await checkoutPage.submitInformation(checkoutData.validCustomer);
      await checkoutPage.expectOverviewStep();
    });

    await test.step('deploy - valider le récapitulatif et finaliser la commande', async () => {
      await checkoutPage.expectSummary({
        productNames: selectedProducts.map((product) => product.name),
        subtotal,
      });
      await checkoutPage.finishOrder();
      await checkoutCompletePage.expectOrderCompleted();
    });
  });
});
