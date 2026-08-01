const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const config = require('../config');
const { runFeatureMapper } = require('../agent');

test('génère la cartographie fonctionnelle à partir du référentiel', () => {
  const result = runFeatureMapper();

  assert.equal(result.metadata.agent, 'AI Feature Mapper');
  assert.equal(result.metadata.version, 'v1');
  assert.equal(result.metadata.schemaVersion, '1.0.0');
  assert.equal(result.metadata.source, 'docs/functional-map.md');

  assert.equal(result.summary.featuresAnalyzed, 14);
  assert.equal(result.features.length, 14);

  assert.deepEqual(result.features[0], {
    id: 'F01',
    name: 'Connexion utilisateur',
    domain: 'Authentification',
    description:
      "Permet à un utilisateur valide de s'authentifier afin d'accéder au catalogue des produits.",
    preconditions: [
      "L'utilisateur se trouve sur la page de connexion.",
      'Un compte valide est disponible.',
    ],
    expectedResults: ["L'utilisateur est authentifié.", 'Le catalogue des produits est affiché.'],
  });
});

test('écrit le résultat dans feature-map.json', () => {
  const result = runFeatureMapper();

  assert.equal(fs.existsSync(config.outputPath), true);

  const generatedReport = JSON.parse(fs.readFileSync(config.outputPath, 'utf8'));

  assert.equal(generatedReport.metadata.agent, 'AI Feature Mapper');
  assert.equal(generatedReport.metadata.schemaVersion, config.schemaVersion);
  assert.equal(generatedReport.summary.featuresAnalyzed, result.summary.featuresAnalyzed);
  assert.deepEqual(generatedReport.features, result.features);
});

test('contient toutes les fonctionnalités attendues', () => {
  const result = runFeatureMapper();

  const featureIds = result.features.map((feature) => feature.id);

  assert.deepEqual(featureIds, [
    'F01',
    'F02',
    'F03',
    'F10',
    'F11',
    'F12',
    'F20',
    'F21',
    'F22',
    'F23',
    'F30',
    'F31',
    'F32',
    'F33',
  ]);
});
