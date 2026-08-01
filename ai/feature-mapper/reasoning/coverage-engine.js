class CoverageEngine {
  calculate(mapping) {
    const summary = {
      features: mapping.length,
      covered: 0,
      partiallyCovered: 0,
      notCovered: 0,
      coverage: 0,
    };

    const details = mapping.map((feature) => {
      let status = feature.status;

      if (!status) {
        if (feature.confidence >= 80) {
          status = 'covered';
        } else if (feature.confidence >= 40) {
          status = 'partially-covered';
        } else {
          status = 'not-covered';
        }
      }

      switch (status) {
        case 'covered':
          summary.covered++;
          break;

        case 'partially-covered':
          summary.partiallyCovered++;
          break;

        default:
          summary.notCovered++;
          break;
      }

      return {
        featureId: feature.featureId,
        featureName: feature.featureName,
        status,
        confidence: feature.confidence,
        tests: feature.tests,
        pageObjects: feature.pageObjects,
      };
    });

    if (summary.features > 0) {
      summary.coverage = Number(
        ((summary.covered / summary.features) * 100).toFixed(2),
      );
    }

    return {
      summary,
      details,
    };
  }
}

module.exports = {
  CoverageEngine,
};
