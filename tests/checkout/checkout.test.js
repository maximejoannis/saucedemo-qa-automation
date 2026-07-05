const { test } = require('../testBase');
const { products } = require('../../fixtures/products');
const { checkoutData } = require('../../fixtures/checkoutData');

const checkoutErrorCases = [
  { title: 'erreur prénom obligatoire', customer: checkoutData.emptyFirstName, message: 'First Name is required' },
  { title: 'erreur nom obligatoire', customer: checkoutData.emptyLastName, message: 'Last Name is required' },
  { title: 'erreur code postal obligatoire', customer: checkoutData.emptyPostalCode, message: 'Postal Code is required' },
];

async function openCheckout(productsPage, cartPage) {
  await productsPage.addToCart(products.backpack);
  await productsPage.openCart();
  await cartPage.checkout();
}

test.describe('Checkout SauceDemo', () => {
  test.beforeEach(async ({ authenticatedPage, productsPage, cartPage, checkoutPage }) => {
    await openCheckout(productsPage, cartPage);
    await checkoutPage.expectInformationStep();
  });

  test('@regression @checkout accès au formulaire checkout', async ({ checkoutPage }) => {
    await checkoutPage.expectInformationStep();
  });

  test('@regression @checkout validation du formulaire avec données valides', async ({ checkoutPage }) => {
    await checkoutPage.submitInformation(checkoutData.validCustomer);
    await checkoutPage.expectOverviewStep();
  });

  for (const { title, customer, message } of checkoutErrorCases) {
    test(`@regression @checkout ${title}`, async ({ checkoutPage }) => {
      await checkoutPage.submitInformation(customer);
      await checkoutPage.expectErrorContains(message);
    });
  }

  test('@regression @checkout vérification du récapitulatif commande', async ({ checkoutPage }) => {
    await checkoutPage.submitInformation(checkoutData.validCustomer);
    await checkoutPage.expectOverviewStep();

    await checkoutPage.expectSummary({
      productNames: [products.backpack.name],
      subtotal: products.backpack.price,
    });
  });

  test('@regression @checkout finalisation de commande', async ({ checkoutPage, checkoutCompletePage }) => {
    await checkoutPage.submitInformation(checkoutData.validCustomer);
    await checkoutPage.finishOrder();

    await checkoutCompletePage.expectOrderCompleted();
  });
});
