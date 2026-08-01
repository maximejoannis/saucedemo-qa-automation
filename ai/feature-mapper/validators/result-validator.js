const FEATURE_ID_PATTERN = /^F\d{2,}$/;

function validateFeatureMap(featureMap) {
  if (!featureMap || !Array.isArray(featureMap.features)) {
    throw new TypeError('Le résultat doit contenir une liste de fonctionnalités.');
  }

  if (featureMap.features.length === 0) {
    throw new Error('Aucune fonctionnalité n’a été extraite du référentiel.');
  }

  const ids = new Set();

  for (const feature of featureMap.features) {
    if (!FEATURE_ID_PATTERN.test(feature.id)) {
      throw new Error(`Identifiant de fonctionnalité invalide : ${feature.id}`);
    }

    if (ids.has(feature.id)) {
      throw new Error(`Identifiant de fonctionnalité dupliqué : ${feature.id}`);
    }

    if (!feature.name || !feature.domain || !feature.description) {
      throw new Error(`La fonctionnalité ${feature.id} est incomplète.`);
    }

    if (!Array.isArray(feature.preconditions) || !Array.isArray(feature.expectedResults)) {
      throw new Error(`Les listes de la fonctionnalité ${feature.id} sont invalides.`);
    }

    ids.add(feature.id);
  }
}

module.exports = { validateFeatureMap };
