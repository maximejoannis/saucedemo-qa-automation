const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const config = require('../config');
const { parseFunctionalMap } = require('../parsers/functional-map-parser');
const { validateFeatureMap } = require('../validators/result-validator');

test('extrait les fonctionnalités du référentiel réel', () => {
  const markdown = fs.readFileSync(config.functionalMapPath, 'utf8');
  const result = parseFunctionalMap(markdown);

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

test('refuse un identifiant de fonctionnalité dupliqué', () => {
  const invalidResult = {
    features: [
      {
        id: 'F01',
        name: 'Fonction A',
        domain: 'Domaine',
        description: 'Description A',
        preconditions: [],
        expectedResults: [],
      },
      {
        id: 'F01',
        name: 'Fonction B',
        domain: 'Domaine',
        description: 'Description B',
        preconditions: [],
        expectedResults: [],
      },
    ],
  };

  assert.throws(() => validateFeatureMap(invalidResult), /dupliqué/);
});
