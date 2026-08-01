const DOMAIN_PATTERN = /^#\s+Domaine\s+\d+\s+[—-]\s+(.+)$/;
const FEATURE_PATTERN = /^##\s+(F\d{2,})\s+[—-]\s+(.+)$/;
const SECTION_PATTERN = /^###\s+(.+)$/;

function normalizeSectionName(sectionName) {
  const normalized = sectionName.trim().toLowerCase();

  if (normalized === 'description') return 'description';
  if (normalized === 'préconditions' || normalized === 'preconditions') return 'preconditions';
  if (normalized === 'résultat attendu' || normalized === 'résultats attendus') {
    return 'expectedResults';
  }

  return null;
}

function cleanContent(lines) {
  return lines
    .map((line) => line.trim())
    .filter((line) => line && line !== '---')
    .map((line) => line.replace(/^[-*]\s+/, '').trim());
}

function finalizeFeature(feature, sectionBuffers) {
  if (!feature) return null;

  const descriptionLines = cleanContent(sectionBuffers.description || []);
  const preconditions = cleanContent(sectionBuffers.preconditions || []);
  const expectedResults = cleanContent(sectionBuffers.expectedResults || []);

  return {
    ...feature,
    description: descriptionLines.join(' '),
    preconditions,
    expectedResults,
  };
}

function parseFunctionalMap(markdown) {
  if (typeof markdown !== 'string' || markdown.trim() === '') {
    throw new TypeError('Le contenu de la cartographie fonctionnelle doit être une chaîne non vide.');
  }

  const features = [];
  let currentDomain = null;
  let currentFeature = null;
  let currentSection = null;
  let sectionBuffers = {};

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();
    const domainMatch = line.match(DOMAIN_PATTERN);
    const featureMatch = line.match(FEATURE_PATTERN);
    const sectionMatch = line.match(SECTION_PATTERN);

    if (domainMatch) {
      const finalizedFeature = finalizeFeature(currentFeature, sectionBuffers);
      if (finalizedFeature) features.push(finalizedFeature);

      currentFeature = null;
      currentSection = null;
      sectionBuffers = {};
      currentDomain = domainMatch[1].trim();
      continue;
    }

    if (featureMatch) {
      const finalizedFeature = finalizeFeature(currentFeature, sectionBuffers);
      if (finalizedFeature) features.push(finalizedFeature);

      if (!currentDomain) {
        throw new Error(`La fonctionnalité ${featureMatch[1]} n'est rattachée à aucun domaine.`);
      }

      currentFeature = {
        id: featureMatch[1],
        name: featureMatch[2].trim(),
        domain: currentDomain,
      };
      currentSection = null;
      sectionBuffers = {};
      continue;
    }

    if (sectionMatch && currentFeature) {
      currentSection = normalizeSectionName(sectionMatch[1]);
      if (currentSection && !sectionBuffers[currentSection]) {
        sectionBuffers[currentSection] = [];
      }
      continue;
    }

    if (currentFeature && currentSection) {
      sectionBuffers[currentSection].push(rawLine);
    }
  }

  const finalizedFeature = finalizeFeature(currentFeature, sectionBuffers);
  if (finalizedFeature) features.push(finalizedFeature);

  return { features };
}

module.exports = { parseFunctionalMap };
