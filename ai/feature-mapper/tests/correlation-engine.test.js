const test = require('node:test');
const assert = require('node:assert/strict');

const {
  CorrelationEngine,
} = require('../reasoning/correlation-engine');

test('associe une fonctionnalité au bon Page Object et au bon test', () => {
  const engine = new CorrelationEngine();

  const mapping = engine.correlate({
    features: [
      {
        id: 'F01',
        name: 'Connexion utilisateur',
        description: 'Permet à un utilisateur valide de se connecter.',
      },
    ],

    pageObjects: [
      {
        name: 'LoginPage',
      },
    ],

    tests: [
      {
        title: 'permet à un utilisateur valide de se connecter',
        suite: 'Authentification',
        pageObjects: ['LoginPage'],
        methods: ['login'],
      },
    ],
  });

  assert.equal(mapping.length, 1);

  assert.equal(mapping[0].featureId, 'F01');
  assert.equal(mapping[0].status, 'covered');
  assert.equal(mapping[0].confidence, 100);

  assert.deepEqual(mapping[0].pageObjects, [
    'LoginPage',
  ]);

  assert.deepEqual(mapping[0].tests, [
    'permet à un utilisateur valide de se connecter',
  ]);
});

test('retourne not-covered lorsqu’aucun test ne correspond', () => {
  const engine = new CorrelationEngine();

  const mapping = engine.correlate({
    features: [
      {
        id: 'F99',
        name: 'Fonctionnalité inexistante',
        description: '',
      },
    ],

    pageObjects: [],

    tests: [],
  });

  assert.equal(mapping[0].status, 'not-covered');
  assert.equal(mapping[0].confidence, 0);
});

test('associe plusieurs tests à une même fonctionnalité', () => {
  const engine = new CorrelationEngine();

  const mapping = engine.correlate({
    features: [
      {
        id: 'F20',
        name: 'Panier',
        description: 'Ajouter un produit au panier',
      },
    ],

    pageObjects: [
      {
        name: 'InventoryPage',
      },
    ],

    tests: [
      {
        title: 'ajoute un produit au panier',
        suite: 'Panier',
        pageObjects: ['InventoryPage'],
        methods: ['addProductToCart'],
      },
      {
        title: 'supprime un produit du panier',
        suite: 'Panier',
        pageObjects: ['InventoryPage'],
        methods: ['removeProduct'],
      },
    ],
  });

  assert.equal(mapping[0].status, 'covered');
  assert.equal(mapping[0].tests.length, 2);
});
