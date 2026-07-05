// learn: les données checkout couvrent les cas positifs et les champs obligatoires.
// build: les variantes négatives facilitent les tests data-driven.
// deploy: les données fictives sont sûres pour l'exécution locale et GitHub Actions.
const checkoutData = {
  validCustomer: { firstName: 'Maxime', lastName: 'JOANNIS', postalCode: '94340' },
  emptyFirstName: { firstName: '', lastName: 'JOANNIS', postalCode: '94340' },
  emptyLastName: { firstName: 'Maxime', lastName: '', postalCode: '94340' },
  emptyPostalCode: { firstName: 'Maxime', lastName: 'JOANNIS', postalCode: '' },
};

module.exports = { checkoutData };
