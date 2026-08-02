# 🚀 Automatisation avec Playwright de l'application web open source sauce demo intégrant un agent de cartographie fonctionnelle

[![Playwright](https://img.shields.io/badge/Playwright-1.61.1-2EAD33?logo=playwright\&logoColor=white)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js\&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript\&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![ESLint](https://img.shields.io/badge/ESLint-Code%20Quality-4B32C3?logo=eslint\&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-Code%20Formatter-F7B93E?logo=prettier\&logoColor=black)](https://prettier.io/)
[![Allure](https://img.shields.io/badge/Allure-Test%20Report-orange)](https://allurereport.org/)

> **Framework d'automatisation des tests End-to-End intégrant un agent QA capable de cartographier les fonctionnalités métier, de corréler les tests Playwright et de générer un rapport de couverture fonctionnelle des tests automatisés.**

---

# 📖 Présentation

Ce projet fournit un framework d'automatisation des tests End-to-End développé avec **Playwright**.

En complément des fonctionnalités classiques d'un framework QA, il intègre un **AI Feature Mapper Agent** capable d'analyser automatiquement le dépôt afin de :

* cartographier les fonctionnalités métier ;
* analyser les Page Objects ;
* analyser les tests Playwright ;
* corréler les fonctionnalités avec les tests automatisés ;
* calculer la couverture fonctionnelle ;
* générer un rapport HTML et JSON.

L'objectif est d'apporter une vision **métier** de la qualité des tests automatisés, au-delà de la simple exécution des scénarios.

---

# ✨ Fonctionnalités

## 🧪 Framework Playwright

* Tests End-to-End avec Playwright
* Architecture Page Object Model (POM)
* Gestion des données de test
* Exécution parallèle
* Multi-navigateurs
* Compatible GitHub Actions

## 🛠️ Qualité du code

* ESLint
* Prettier
* Vérification automatique de la qualité
* Rapport qualité

## 📊 Reporting

* Rapport HTML Playwright
* Rapport Allure
* Rapport qualité
* Rapport de couverture fonctionnelle (HTML & JSON)

## 🤖 AI Feature Mapper Agent

* Analyse du référentiel fonctionnel
* Analyse des Page Objects
* Analyse des tests Playwright
* Corrélation fonctionnalités ↔ tests
* Calcul de la couverture fonctionnelle
* Génération d'un rapport de couverture

---

# 🚀 Installation

```bash
npm install
```

Installation des navigateurs Playwright :

```bash
npx playwright install
```

Sous Linux / Codespaces :

```bash
npx playwright install --with-deps
```

---

# ▶️ Commandes principales

## Exécution des tests

```bash
npm test
```

Mode Headed :

```bash
npm run test:headed
```

Interface Playwright :

```bash
npm run test:ui
```

---

## Qualité du code

Analyse ESLint :

```bash
npm run lint
```

Correction automatique :

```bash
npm run lint:fix
```

Formatage :

```bash
npm run format
```

Vérification du formatage :

```bash
npm run format:check
```

Contrôle qualité :

```bash
npm run quality
```

Rapport qualité :

```bash
npm run quality:report
```

---

## Rapports

Rapport Allure :

```bash
npm run allure:generate
npm run allure:open
```

Cartographie fonctionnelle :

```bash
npm run ai:map-features
```

Tests de l'agent :

```bash
npm run test:ai
```

Rapport de couverture fonctionnelle :

```bash
npm run ai:report
```

Rapport enrichi avec les résultats Playwright :

```bash
npm run test:coverage
npm run ai:report:executed
```

## 🌐 Rapports en ligne

Les principaux rapports du projet sont accessibles directement depuis GitHub Pages :

* 📈 **Rapport Allure** : https://maximejoannis.github.io/saucedemo-qa-automation/
* 🛠️ **Rapport Qualité** : https://maximejoannis.github.io/saucedemo-qa-automation/quality/
* 🧹 **Rapport ESLint** : https://maximejoannis.github.io/saucedemo-qa-automation/quality/eslint-report.html

Ces rapports sont mis à jour automatiquement à chaque publication du projet.


## 📊 Rapports disponibles

Le projet publie automatiquement plusieurs rapports permettant d'analyser la qualité du framework et la couverture fonctionnelle des tests automatisés.

| Rapport                                | Description                                     | Accès                                                                              |
| -------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| 🧪 Rapport Playwright                  | Rapport HTML généré après l'exécution des tests | Local (`playwright-report/`)                                                       |
| 📈 Rapport Allure                      | Rapport détaillé des exécutions Playwright      | https://maximejoannis.github.io/saucedemo-qa-automation/                           |
| 🛠️ Rapport Qualité                    | Rapport global ESLint / Prettier                | https://maximejoannis.github.io/saucedemo-qa-automation/quality/                   |
| 🧹 Rapport ESLint                      | Analyse détaillée de la qualité du code         | https://maximejoannis.github.io/saucedemo-qa-automation/quality/eslint-report.html |
| 🤖 Cartographie fonctionnelle          | Cartographie générée par l'AI Feature Mapper    | `ai/feature-mapper/output/feature-map.json`                                        |
| 📑 Rapport de couverture fonctionnelle | Rapport HTML de couverture fonctionnelle        | `ai/feature-mapper/output/coverage-report.html`                                    |
| 📄 Rapport JSON de couverture          | Rapport exploitable par d'autres outils         | `ai/feature-mapper/output/coverage-report.json`                                    |

> **Remarque :** les rapports Allure, Qualité et ESLint sont publiés automatiquement via **GitHub Pages**. Les rapports de couverture fonctionnelle sont générés localement par l'AI Feature Mapper et peuvent également être publiés selon le même principe.


---

# 🏗️ Structure du projet

```text
.
├── ai/
│   └── feature-mapper/
├── docs/
├── reports/
├── scripts/
├── src/
├── tests/
├── playwright.config.js
├── package.json
└── README.md
```

---

# 📚 Documentation

La documentation complète du projet est disponible dans le dossier `docs/`.

Elle comprend notamment :

* Présentation du projet
* Architecture
* AI Feature Mapper
* Correlation Engine
* Coverage Engine
* Rapport de couverture fonctionnelle

---

# 🛠️ Technologies

* Playwright
* Node.js
* JavaScript
* ESLint
* Prettier
* Allure Report
