class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postalCode = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    this.finishButton = page.getByRole('button', { name: 'Finish', exact: true });
    this.cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });
    this.error = page.locator('[data-test="error"]');
    this.summaryItems = page.locator('[data-test="inventory-item"]');
    this.summaryNames = page.locator('[data-test="inventory-item-name"]');
    this.summaryPrices = page.locator('[data-test="inventory-item-price"]');
    this.subtotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
    this.completeHeader = page.getByText('Thank you for your order!', { exact: true });
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.getByRole('button', { name: 'Back Home', exact: true });
  }

  async fillCustomer({ firstName = '', lastName = '', postalCode = '' }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async backHome() {
    await this.backHomeButton.click();
  }

  async displayedAmount(locator) {
    const text = await locator.textContent();
    const match = text?.match(/\$([0-9]+(?:\.[0-9]{2})?)/);
    if (!match) throw new Error(`Montant introuvable dans : ${text}`);
    return Number(match[1]);
  }
}

module.exports = { CheckoutPage };
