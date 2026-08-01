/**
 * CorrelationEngine
 *
 * Associe automatiquement les fonctionnalités aux artefacts Playwright.
 */
class CorrelationEngine {
  correlate({ features, pageObjects, tests }) {
    return features.map((feature) => {
      const keywords = this.extractKeywords(feature);

      const matchingPageObjects = pageObjects.filter((pageObject) =>
        this.matches(pageObject.name, keywords)
      );

      const matchingTests = tests.filter((test) => {
        const searchableText = [
          test.title,
          test.suite,
          ...(test.pageObjects || []),
          ...(test.methods || []),
        ]
          .join(' ')
          .toLowerCase();

        return keywords.some((keyword) => searchableText.includes(keyword));
      });

      const confidence = this.computeConfidence(matchingPageObjects, matchingTests);

      return {
        featureId: feature.id,
        featureName: feature.name,
        pageObjects: matchingPageObjects.map((p) => p.name),
        tests: matchingTests.map((t) => t.title),
        confidence,
        status: confidence >= 80 ? 'covered' : 'not-covered',
      };
    });
  }

  extractKeywords(feature) {
    return `${feature.id} ${feature.name} ${feature.description || ''}`
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .split(/\s+/)
      .filter((word) => word.length >= 3);
  }

  matches(value, keywords) {
    const text = value.toLowerCase();

    return keywords.some((keyword) => text.includes(keyword));
  }

  computeConfidence(pageObjects, tests) {
    let score = 0;

    if (pageObjects.length > 0) {
      score += 40;
    }

    if (tests.length > 0) {
      score += 60;
    }

    return score;
  }
}

module.exports = {
  CorrelationEngine,
};
