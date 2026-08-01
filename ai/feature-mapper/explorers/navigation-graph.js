class NavigationGraph {
  constructor() {
    this.pages = new Map();
    this.transitions = [];
  }

  addPage(observation) {
    if (!observation || !observation.url) {
      return;
    }

    if (!this.pages.has(observation.url)) {
      this.pages.set(observation.url, {
        name: observation.title,
        url: observation.url,
        buttons: observation.buttons || [],
        links: observation.links || [],
        inputs: observation.inputs || [],
      });
    }
  }

  addTransition(from, action, to) {
    if (!from || !to) {
      return;
    }

    const exists = this.transitions.some(
      (transition) =>
        transition.from === from && transition.to === to && transition.action === action
    );

    if (!exists) {
      this.transitions.push({
        from,
        action,
        to,
      });
    }
  }

  getPages() {
    return [...this.pages.values()];
  }

  getTransitions() {
    return [...this.transitions];
  }

  toJSON() {
    return {
      pages: this.getPages(),
      transitions: this.getTransitions(),
    };
  }
}

module.exports = {
  NavigationGraph,
};
