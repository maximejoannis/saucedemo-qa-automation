const test = require('node:test');
const assert = require('node:assert/strict');

const { CorrelationEngine } = require('../reasoning/correlation-engine');

test('should correlate a feature with a matching Page Object and test', () => {
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

  const feature = mapping[0];

  assert.equal(feature.featureId, 'F01');
  assert.equal(feature.featureName, 'Connexion utilisateur');

  assert.equal(feature.status, 'covered');
  assert.equal(feature.confidence, 100);

  assert.deepEqual(feature.pageObjects, ['LoginPage']);

  assert.deepEqual(feature.tests, ['permet à un utilisateur valide de se connecter']);
});

test('should return not-covered when nothing matches', () => {
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

  assert.equal(mapping.length, 1);

  const feature = mapping[0];

  assert.equal(feature.featureId, 'F99');
  assert.equal(feature.status, 'not-covered');
  assert.equal(feature.confidence, 0);

  assert.deepEqual(feature.pageObjects, []);
  assert.deepEqual(feature.tests, []);
});

test('should correlate multiple tests with one feature', () => {
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

  assert.equal(mapping.length, 1);

  const feature = mapping[0];

  assert.equal(feature.status, 'covered');
  assert.equal(feature.confidence, 100);

  assert.equal(feature.pageObjects.length, 1);
  assert.equal(feature.tests.length, 2);
});

test('should correlate several features independently', () => {
  const engine = new CorrelationEngine();

  const mapping = engine.correlate({
    features: [
      {
        id: 'F01',
        name: 'Connexion',
        description: '',
      },
      {
        id: 'F20',
        name: 'Panier',
        description: '',
      },
    ],

    pageObjects: [
      {
        name: 'LoginPage',
      },
      {
        name: 'InventoryPage',
      },
    ],

    tests: [
      {
        title: 'connexion utilisateur',
        suite: 'Authentification',
        pageObjects: ['LoginPage'],
        methods: ['login'],
      },
      {
        title: 'ajoute un produit au panier',
        suite: 'Panier',
        pageObjects: ['InventoryPage'],
        methods: ['addProductToCart'],
      },
    ],
  });

  assert.equal(mapping.length, 2);

  assert.equal(mapping[0].status, 'covered');
  assert.equal(mapping[1].status, 'covered');
});

test('should never return a confidence greater than 100', () => {
  const engine = new CorrelationEngine();

  const mapping = engine.correlate({
    features: [
      {
        id: 'F01',
        name: 'Connexion',
        description: '',
      },
    ],

    pageObjects: [
      {
        name: 'LoginPage',
      },
    ],

    tests: [
      {
        title: 'connexion',
        suite: 'Authentification',
        pageObjects: ['LoginPage'],
        methods: ['login'],
      },
      {
        title: 'connexion administrateur',
        suite: 'Authentification',
        pageObjects: ['LoginPage'],
        methods: ['login'],
      },
      {
        title: 'connexion utilisateur bloqué',
        suite: 'Authentification',
        pageObjects: ['LoginPage'],
        methods: ['login'],
      },
    ],
  });

  assert.ok(mapping[0].confidence <= 100);
});
