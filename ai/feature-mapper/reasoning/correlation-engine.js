class CorrelationEngine {
  constructor() {
    this.aliases = {
      connexion: ['login', 'authenticate', 'authentication'],
      authentification: ['login', 'authenticate', 'authentication'],
      utilisateur: ['user'],

      catalogue: ['inventory', 'product', 'products'],
      produit: ['product', 'inventory'],
      produits: ['product', 'inventory'],
      tri: ['sort', 'filter'],

      panier: ['cart'],
      ajouter: ['add'],
      retirer: ['remove'],
      supprimer: ['remove'],
      consulter: ['view', 'open', 'display'],

      commande: ['checkout', 'order'],
      validation: ['finish', 'complete', 'checkout'],
      confirmation: ['complete', 'confirmation'],
      informations: ['information', 'customer'],
      client: ['customer'],
      récapitulatif: ['overview', 'summary'],
    };
  }

  correlate({ features, pageObjects, tests }) {
    return features.map((feature) => {
      const keywords = this.extractKeywords(feature);

      const matchingPageObjects = pageObjects.filter((pageObject) =>
        this.matchesPageObject(pageObject, keywords)
      );

      const matchingTests = tests.filter((testCase) => this.matchesTest(testCase, keywords));

      const confidence = this.computeConfidence(matchingPageObjects, matchingTests);

      return {
        featureId: feature.id,
        featureName: feature.name,
        pageObjects: matchingPageObjects.map((pageObject) => pageObject.name),
        tests: [...new Set(matchingTests.map((testCase) => testCase.title))],
        testReferences: matchingTests.map((testCase) => ({
          title: testCase.title,
          suite: testCase.suite || null,
          file: testCase.file || null,
          line: testCase.line || null,
        })),
        confidence,
        status: this.determineStatus(confidence),
      };
    });
  }

  extractKeywords(feature) {
    const text = [feature.name, feature.description || '', feature.domain || ''].join(' ');

    const baseKeywords = this.tokenize(text);
    const expandedKeywords = new Set(baseKeywords);

    for (const keyword of baseKeywords) {
      const aliases = this.aliases[keyword] || [];

      for (const alias of aliases) {
        expandedKeywords.add(alias);
      }
    }

    return [...expandedKeywords];
  }

  tokenize(value) {
    return this.normalize(value)
      .split(/\s+/)
      .filter((word) => word.length >= 3);
  }

  normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .trim();
  }

  matchesPageObject(pageObject, keywords) {
    const searchableText = [
      pageObject.name,
      ...(pageObject.methods || []).map((method) =>
        typeof method === 'string' ? method : method.name
      ),
      ...(pageObject.locators || []).map((locator) =>
        typeof locator === 'string' ? locator : locator.name
      ),
    ].join(' ');

    return this.matches(searchableText, keywords);
  }

  matchesTest(testCase, keywords) {
    const methodCalls = testCase.methodCalls || testCase.methods || [];

    const searchableText = [
      testCase.title,
      testCase.suite,
      ...(testCase.fixtures || []),
      ...(testCase.pageObjects || []),
      ...methodCalls.map((methodCall) => {
        if (typeof methodCall === 'string') {
          return methodCall;
        }

        return [methodCall.object, methodCall.method, methodCall.name].filter(Boolean).join(' ');
      }),
    ].join(' ');

    return this.matches(searchableText, keywords);
  }

  matches(value, keywords) {
    const normalizedValue = this.normalize(value);

    return keywords.some((keyword) => normalizedValue.includes(this.normalize(keyword)));
  }

  computeConfidence(pageObjects, tests) {
    let score = 0;

    if (pageObjects.length > 0) {
      score += 40;
    }

    if (tests.length > 0) {
      score += 60;
    }

    return Math.min(score, 100);
  }

  determineStatus(confidence) {
    if (confidence >= 80) {
      return 'covered';
    }

    if (confidence >= 40) {
      return 'partially-covered';
    }

    return 'not-covered';
  }
}

module.exports = {
  CorrelationEngine,
};
