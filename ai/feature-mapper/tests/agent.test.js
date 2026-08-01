const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const config = require('../config');
const { runFeatureMapper } = require('../agent');

test('génère la cartographie fonctionnelle à partir du référentiel', () => {
  const result = runFeatureMapper();

  assert.equal(result.metadata.agent, 'AI Feature Mapper');
  assert.equal(result.metadata.version, 'v3');
  assert.equal(result.metadata.schemaVersion, '1.1.0');
  assert.deepEqual(result.metadata.sources, [
    'docs/functional-map.md',
    'src/pages/',
    'tests/',
  ]);

  assert.equal(result.summary.featuresAnalyzed, 14);
  assert.equal(result.features.length, 14);
  assert.equal(result.summary.pageObjectsAnalyzed, 4);
  assert.equal(result.repository.pageObjects.length, 4);
  assert.equal(result.summary.testFilesAnalyzed, 5);
  assert.equal(result.summary.testsAnalyzed, 43);
  assert.equal(result.testAnalysis.tests.length, 43);

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
  assert.deepEqual(generatedReport.testAnalysis, result.testAnalysis);
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
