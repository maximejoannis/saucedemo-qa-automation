const test = require('node:test');
const assert = require('node:assert/strict');

const { CoverageEngine } = require('../reasoning/coverage-engine');

test('should calculate global coverage correctly', () => {
  const engine = new CoverageEngine();

  const result = engine.calculate([
    {
      featureId: 'F01',
      featureName: 'Connexion',
      confidence: 100,
      status: 'covered',
      tests: ['login.spec.js'],
      pageObjects: ['LoginPage'],
    },
    {
      featureId: 'F02',
      featureName: 'Utilisateur bloqué',
      confidence: 100,
      status: 'covered',
      tests: ['blocked-user.spec.js'],
      pageObjects: ['LoginPage'],
    },
    {
      featureId: 'F03',
      featureName: 'Déconnexion',
      confidence: 0,
      status: 'not-covered',
      tests: [],
      pageObjects: [],
    },
  ]);

  assert.equal(result.summary.features, 3);
  assert.equal(result.summary.covered, 2);
  assert.equal(result.summary.partiallyCovered, 0);
  assert.equal(result.summary.notCovered, 1);
  assert.equal(result.summary.coverage, 66.67);
});

test('should calculate partial coverage correctly', () => {
  const engine = new CoverageEngine();

  const result = engine.calculate([
    {
      featureId: 'F20',
      featureName: 'Panier',
      confidence: 60,
      status: 'partially-covered',
      tests: ['cart.spec.js'],
      pageObjects: ['InventoryPage'],
    },
  ]);

  assert.equal(result.summary.features, 1);
  assert.equal(result.summary.covered, 0);
  assert.equal(result.summary.partiallyCovered, 1);
  assert.equal(result.summary.notCovered, 0);
  assert.equal(result.summary.coverage, 0);
});

test('should return 100 percent coverage', () => {
  const engine = new CoverageEngine();

  const result = engine.calculate([
    {
      featureId: 'F01',
      featureName: 'Connexion',
      confidence: 100,
      status: 'covered',
      tests: ['login.spec.js'],
      pageObjects: ['LoginPage'],
    },
    {
      featureId: 'F20',
      featureName: 'Panier',
      confidence: 100,
      status: 'covered',
      tests: ['cart.spec.js'],
      pageObjects: ['InventoryPage'],
    },
  ]);

  assert.equal(result.summary.coverage, 100);
});

test('should return 0 percent coverage', () => {
  const engine = new CoverageEngine();

  const result = engine.calculate([
    {
      featureId: 'F01',
      featureName: 'Connexion',
      confidence: 0,
      status: 'not-covered',
      tests: [],
      pageObjects: [],
    },
    {
      featureId: 'F20',
      featureName: 'Panier',
      confidence: 0,
      status: 'not-covered',
      tests: [],
      pageObjects: [],
    },
  ]);

  assert.equal(result.summary.coverage, 0);
});

test('should return an empty summary when no feature exists', () => {
  const engine = new CoverageEngine();

  const result = engine.calculate([]);

  assert.equal(result.summary.features, 0);
  assert.equal(result.summary.covered, 0);
  assert.equal(result.summary.partiallyCovered, 0);
  assert.equal(result.summary.notCovered, 0);
  assert.equal(result.summary.coverage, 0);

  assert.deepEqual(result.details, []);
});
