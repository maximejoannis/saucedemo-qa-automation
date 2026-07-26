const { test, expect } = require('../../src/fixtures/test');
const { validCustomer } = require('../../src/data/checkout');
const { products } = require('../../src/data/products');

test.describe('US04 - Checkout | Informations client', () => {
  test.beforeEach(async ({
    authenticatedPage,
    inventoryPage,
    cartPage,
    page,
  }) => {
    await inventoryPage.add(products.backpack.slug);
    await inventoryPage.openCart();
    await cartPage.checkout();

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test('TC-US04-AC01-01 prénom requis', async ({ checkoutPage }) => {
    await checkoutPage.fillCustomer({
      lastName: validCustomer.lastName,
      postalCode: validCustomer.postalCode,
    });

    await checkoutPage.continue();

    await expect(checkoutPage.error).toContainText(
      'First Name is required',
    );
  });

  test('TC-US04-AC01-02 nom requis', async ({ checkoutPage }) => {
    await checkoutPage.fillCustomer({
      firstName: validCustomer.firstName,
      postalCode: validCustomer.postalCode,
    });

    await checkoutPage.continue();

    await expect(checkoutPage.error).toContainText(
      'Last Name is required',
    );
  });

  test('TC-US04-AC01-03 code postal requis', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillCustomer({
      firstName: validCustomer.firstName,
      lastName: validCustomer.lastName,
    });

    await checkoutPage.continue();

    await expect(checkoutPage.error).toContainText(
      'Postal Code is required',
    );
  });

  test('TC-US04-AC01-04 tous les champs vides', async ({
    checkoutPage,
  }) => {
    await checkoutPage.continue();

    await expect(checkoutPage.error).toContainText(
      'First Name is required',
    );
  });

  test(
    'TC-US04-AC01-05 correction après erreur autorise la navigation',
    async ({ page, checkoutPage }) => {
      await checkoutPage.continue();

      await expect(checkoutPage.error).toContainText(
        'First Name is required',
      );

      await checkoutPage.fillCustomer(validCustomer);
      await checkoutPage.continue();

      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    },
  );

  test('TC-US04-AC02-01 données nominales valides', async ({
    page,
    checkoutPage,
  }) => {
    await checkoutPage.fillCustomer(validCustomer);
    await checkoutPage.continue();

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  });

  test(
    'TC-US04-AC02-02 nom avec tiret accepté',
    async ({ page, checkoutPage }) => {
      await checkoutPage.fillCustomer({
        firstName: 'Jean-Pierre',
        lastName: validCustomer.lastName,
        postalCode: validCustomer.postalCode,
      });

      await checkoutPage.continue();

      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    },
  );

  test(
  'TC-US04-AC02-03 code postal alphanumérique accepté',
  async ({ page, checkoutPage }) => {
    await checkoutPage.fillCustomer({
      firstName: validCustomer.firstName,
      lastName: validCustomer.lastName,
      postalCode: 'H2X 1Y4',
    });

    await checkoutPage.continue();

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  },
);

  test(
    'TC-US04-AC02-05 annulation retourne au panier',
    async ({ page, checkoutPage }) => {
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
      await expect(checkoutPage.cancelButton).toBeVisible();

      await checkoutPage.cancel();

      await expect(page).toHaveURL(/\/cart\.html$/);
    },
  );
});
