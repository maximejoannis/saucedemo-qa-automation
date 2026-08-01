const { PlaywrightExplorer } = require('../explorers/playwright-explorer');
const { NavigationGraph } = require('../explorers/navigation-graph');

class BrowserExplorationTool {
  constructor(config) {
    this.config = config;
  }

  async execute() {
    const explorer = new PlaywrightExplorer({
      baseURL: this.config.baseURL,
      headless: this.config.headless,
    });

    const graph = new NavigationGraph();

    await explorer.start();

    try {
      await explorer.login(this.config.username, this.config.password);

      const observations = await explorer.explore();

      observations.forEach((observation) => {
        graph.addPage(observation);
      });

      for (let i = 0; i < observations.length - 1; i++) {
        graph.addTransition(observations[i].url, 'navigation', observations[i + 1].url);
      }

      return {
        observations,
        navigationGraph: graph.toJSON(),
      };
    } finally {
      await explorer.stop();
    }
  }
}

module.exports = {
  BrowserExplorationTool,
};
