# SauceDemo QA Automation

> Framework d'automatisation End-to-End construit avec **Playwright**, conçu selon les bonnes pratiques QA modernes et destiné à évoluer vers un **framework QA intelligent** capable de cartographier les fonctionnalités de l'application et de mesurer automatiquement la couverture fonctionnelle des tests.

[![Playwright Tests](https://github.com/maximejoannis/saucedemo-qa-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/maximejoannis/saucedemo-qa-automation/actions/workflows/playwright.yml)
[![Code Quality](https://img.shields.io/badge/Code%20Quality-ESLint%20%2B%20Prettier-4B32C3?logo=eslint)](https://maximejoannis.github.io/saucedemo-qa-automation/quality/)
![Node](https://img.shields.io/badge/Node-24.x-green)
![Playwright](https://img.shields.io/badge/Playwright-1.56-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

# Sommaire

- Présentation
- Objectifs
- Fonctionnalités automatisées
- Architecture
- Stack technique
- Structure du projet
- Installation
- Exécution
- Reporting
- Qualité du code
- Intégration Continue
- Vision IA
- Roadmap

---

# Présentation

Ce projet automatise les principaux parcours utilisateurs du site **SauceDemo** à l'aide de **Playwright Test**.

Il applique les pratiques recommandées pour un framework QA moderne :

- Page Object Model (POM)
- séparation des données de test
- fixtures Playwright
- exécution parallèle
- reporting HTML et Allure
- intégration continue GitHub Actions
- qualité de code avec ESLint et Prettier

Le dépôt constitue également la base d'un futur **framework QA augmenté par l'IA**, capable d'analyser automatiquement les fonctionnalités couvertes par les tests.

---

# Objectifs

Le framework poursuit plusieurs objectifs :

- automatiser les parcours critiques de l'application ;
- produire des tests fiables, lisibles et maintenables ;
- faciliter l'évolution des scénarios grâce au Page Object Model ;
- fournir des rapports d'exécution détaillés ;
- préparer l'intégration d'outils d'analyse assistés par IA.

---

# Fonctionnalités automatisées

Les scénarios actuellement couverts concernent :

| Domaine | Couverture |
|----------|------------|
| Authentification | ✅ |
| Catalogue produits | ✅ |
| Tri des produits | ✅ |
| Ajout au panier | ✅ |
| Suppression du panier | ✅ |
| Consultation du panier | ✅ |
| Checkout | ✅ |
| Validation complète d'une commande | ✅ |

## Statistiques actuelles

| Élément | Valeur |
|---------|--------|
| Tests automatisés | **43** |
| Suites de tests | **5** |
| Navigateurs | Chromium, Firefox |
| Page Objects | ✔ |
| Fixtures | ✔ |
| Global Setup | ✔ |
| Storage State | ✔ |
| Allure Report | ✔ |
| HTML Report | ✔ |
| GitHub Actions | ✔ |

---

# Architecture

Le framework suit une architecture **Page Object Model**.

```text
                        GitHub Actions
                               │
                               ▼
                       Playwright Runner
                               │
             ┌─────────────────┴─────────────────┐
             ▼                                   ▼
        Global Setup                        Fixtures
             │                                   │
             └──────────────┬────────────────────┘
                            ▼
                      Page Objects
                            │
                            ▼
                       SauceDemo App
                            │
                            ▼
                    HTML / Allure Reports

                     (Roadmap)
                  AI Quality Assistant
```

Chaque couche possède une responsabilité clairement définie.

### Page Objects

Les Page Objects encapsulent :

- les locators ;
- les actions utilisateur ;
- les assertions réutilisables.

### Fixtures

Les fixtures injectent automatiquement les objets nécessaires aux scénarios afin d'éviter les duplications de code.

### Données de test

Les données sont centralisées dans `src/data` afin de séparer les scénarios métier des données manipulées.

### Global Setup

Le `global-setup.js` prépare l'environnement Playwright avant l'exécution des tests, notamment via la gestion de l'authentification persistée (`storageState`).

---

# Stack technique

| Technologie | Utilisation |
|-------------|-------------|
| Playwright | Automatisation E2E |
| JavaScript ES6 | Développement |
| Node.js | Runtime |
| Allure | Reporting |
| HTML Reporter | Reporting natif |
| ESLint | Analyse statique |
| Prettier | Formatage |
| GitHub Actions | Intégration continue |

---

# Structure du projet

```text
.
├── .github/
│   └── workflows/
├── playwright/
│   └── .auth/
├── scripts/
├── src/
│   ├── data/
│   ├── fixtures/
│   └── pages/
├── tests/
│   ├── us01-authentication/
│   ├── us02-catalog/
│   ├── us03-cart/
│   ├── us04-checkout/
│   └── us05-e2e/
├── global-setup.js
├── playwright.config.js
└── package.json
```

---

# Installation

```bash
npm ci
```

Installation des navigateurs :

```bash
npx playwright install
```

---

# Exécution

Suite complète :

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

# Reporting

## Rapport HTML

```bash
npx playwright show-report
```

## Rapport Allure

```bash
npm run allure:generate
npm run allure:open
```

---

# Qualité du code

Analyse :

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

Rapport qualité :

```bash
npm run quality:report
```

---

# Intégration Continue

Le projet s'appuie sur **GitHub Actions** afin de :

- installer les dépendances ;
- exécuter les tests Playwright ;
- publier les rapports ;
- garantir la stabilité du framework à chaque évolution.

---

# Vision IA

Le framework est conçu pour évoluer vers une plateforme d'automatisation assistée par l'intelligence artificielle.

L'objectif est de développer un **AI Quality Assistant** capable d'analyser automatiquement le dépôt afin de produire une vision fonctionnelle de l'application testée.

À terme, cet assistant pourra :

- cartographier automatiquement les fonctionnalités de l'application ;
- identifier les User Stories couvertes ;
- associer les fonctionnalités aux Page Objects et aux scénarios Playwright ;
- calculer le taux de couverture fonctionnelle des tests ;
- détecter les fonctionnalités non automatisées ;
- proposer de nouveaux scénarios de tests ;
- générer une matrice de traçabilité entre exigences et tests automatisés.

Cette approche vise à transformer le framework en un outil d'aide à la décision pour les équipes QA, au-delà de la simple exécution des tests.

---

# Roadmap

## Version actuelle

- ✅ Framework Playwright
- ✅ Page Object Model
- ✅ Fixtures
- ✅ Global Setup
- ✅ HTML Report
- ✅ Allure Report
- ✅ GitHub Actions
- ✅ ESLint & Prettier

## Évolutions prévues

- 🔄 AI Feature Mapper
- 🔄 Functional Coverage Analyzer
- 🔄 Requirements ↔ Tests Matrix
- 🔄 AI Test Recommendations
- 🔄 Dashboard de couverture fonctionnelle
- 🔄 Génération assistée de scénarios Playwright

---

# Licence

Ce projet est distribué sous licence **MIT**.
