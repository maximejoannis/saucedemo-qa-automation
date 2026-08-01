const fs = require('node:fs');
const path = require('node:path');

class AIReasoningEngine {
  constructor(client) {
    this.client = client;
  }

  async execute(context) {
    const prompt = this.buildPrompt(context);

    const response = await this.client.complete(prompt);

    return this.parseResponse(response);
  }

  buildPrompt(context) {
    return `
Tu es un expert QA automatisation Playwright certifié ISTQB.

Ton objectif est de cartographier les fonctionnalités de l'application avec les tests automatisés.

Tu dois répondre UNIQUEMENT en JSON.

Fonctionnalités :

${JSON.stringify(context.features, null, 2)}

Page Objects :

${JSON.stringify(context.pageObjects, null, 2)}

Tests :

${JSON.stringify(context.tests, null, 2)}

Retourne un tableau JSON au format :

[
  {
    "featureId": "...",
    "featureName": "...",
    "pageObjects": [],
    "tests": [],
    "confidence": 0.95
  }
]
`;
  }

  parseResponse(response) {
    if (typeof response === 'string') {
      return JSON.parse(response);
    }

    return response;
  }

  save(outputPath, mapping) {
    fs.writeFileSync(
      outputPath,
      JSON.stringify(mapping, null, 2),
      'utf8',
    );
  }
}

module.exports = {
  AIReasoningEngine,
};
