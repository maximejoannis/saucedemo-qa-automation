# SauceDemo QA Automation

[![Playwright Tests](https://github.com/maximejoannis/saucedemo-qa-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/maximejoannis/saucedemo-qa-automation/actions/workflows/playwright.yml)
![Node](https://img.shields.io/badge/Node-24.x-green)
![Playwright](https://img.shields.io/badge/Playwright-1.56-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

Rapport Allure publié :
https://maximejoannis.github.io/saucedemo-qa-automation

Suite de tests End-to-End du site **SauceDemo** réalisée avec **Playwright** en JavaScript.

Le projet est structuré selon le pattern **Page Object Model (POM)**. 

---

# Sommaire

- Présentation
- Fonctionnalités
- Stack technique
- Structure du projet
- Prérequis
- Installation
- Exécution des tests
- Rapports
- Architecture
- Traçabilité
- Configuration Playwright
- Intégration Continue
- Roadmap

---

# Présentation

Cette suite automatise les principaux parcours fonctionnels de SauceDemo :

- authentification
- consultation du catalogue
- tri des produits
- ajout et suppression d'articles
- gestion du panier
- saisie des informations client
- finalisation d'une commande

Le projet a été conçu afin de démontrer une approche QA professionnelle basée sur :

- Playwright
- Page Object Model
- séparation des données de test
- fixtures Playwright
- documentation QA
- traçabilité exigences ↔ cas de test ↔ automatisation

---

# Fonctionnalités

Le projet comprend actuellement :

- 43 tests Playwright
- 5 fichiers de spécifications
- exécution sur Chromium et Firefox
- architecture Page Object Model
- fixtures Playwright
- données de test centralisées
- rapport HTML Playwright
- rapport Allure
- exécution parallèle
- retries configurés en CI
- captures d'écran sur échec
- vidéos sur échec
- traces Playwright au premier retry
- workflow GitHub Actions

---

# Stack technique

| Outil | Version |
|--------|----------|
| Node.js | LTS recommandée |
| Playwright | 1.61.1 |
| JavaScript | ES6 |
| Allure Reporter | oui |
| GitHub Actions | oui |

---

# Structure du projet

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
├── src/
│   ├── data/
│   │   ├── checkout.js
│   │   ├── products.js
│   │   └── users.js
│   │
│   ├── fixtures/
│   │   └── test.js
│   │
│   └── pages/
│       ├── LoginPage.js
│       ├── InventoryPage.js
│       ├── CartPage.js
│       └── CheckoutPage.js
│
├── tests/
│   ├── us01-authentication/
│   ├── us02-catalogue/
│   ├── us03-panier/
│   ├── us04-checkout/
│   └── us05-e2e/
│
├── playwright.config.js
├── package.json
└── README.md
```

# Architecture

## Page Objects

Les Page Objects centralisent :

- les locators
- les actions utilisateur
- les assertions communes

Cela permet :

- une maintenance simplifiée
- moins de duplication
- une meilleure lisibilité

---

## Fixtures

Les fixtures exposent :

- les différents Page Objects
- une fixture `authenticatedPage` permettant de démarrer un scénario déjà connecté.

---

## Données de test

Les données sont isolées dans :

```
src/data/
```

On y retrouve :

- utilisateurs
- produits
- informations de checkout

---

# Prérequis

Installer :

- Node.js LTS
- npm
- Java (pour Allure)

Le projet nécessite également un accès à :

https://www.saucedemo.com/

---

# Installation

Installer les dépendances :

```bash
npm ci
```

Installer les navigateurs Playwright :

```bash
npx playwright install
```

Sous Linux :

```bash
npx playwright install --with-deps
```

---

# Exécution des tests

## Toute la suite

```bash
npm test
```

ou

```bash
npx playwright test
```

---

## Mode Headed

```bash
npm run test:headed
```

---

## Interface Playwright

```bash
npm run test:ui
```

---

## Chromium

```bash
npx playwright test --project=chromium
```

---

## Firefox

```bash
npx playwright test --project=firefox
```

---

## Un fichier

```bash
npx playwright test tests/us01-authentication/ac01-login.spec.js
```

---

## Un seul test

```bash
npx playwright test -g "TC-US01-AC01-01"
```

---

## Tests Smoke

```bash
npx playwright test -g "@smoke"
```

Les tags disponibles sont :

- @smoke
- @critical

---

## Vérification de stabilité

Exécuter chaque test cinq fois :

```bash
npx playwright test --repeat-each=5
```

Utiliser quatre workers :

```bash
npx playwright test --workers=4
```

---

## Débogage

```bash
npx playwright test --debug
```

ou

```bash
PWDEBUG=1 npx playwright test
```

PowerShell :

```powershell
$env:PWDEBUG=1
npx playwright test
```

---

# Rapports

## Rapport HTML

Après une exécution :

```bash
npx playwright show-report
```

Le rapport est généré dans :

```
playwright-report/
```

---

## Rapport Allure

Génération :

```bash
npm run allure:generate
```

Ouverture :

```bash
npm run allure:open
```

Ou directement :

```bash
npx allure serve allure-results
```

Les résultats sont générés dans :

```
allure-results/
```

Le rapport HTML est généré dans :

```
allure-report/
```

# Convention des identifiants

Chaque cas de test suit le format :

```
TC-USxx-ACxx-nn
```

Exemple :

```
TC-US03-AC02-05
```

où :

- US = User Story
- AC = Acceptance Criteria
- nn = numéro du cas

---

# Traçabilité

Le référentiel contient :

- 50 cas de test fonctionnels
- 42 cas automatisés
- 8 cas manuels

Les 42 cas automatisés sont couverts par :

- 43 tests Playwright

Certains scénarios automatisés couvrent plusieurs cas fonctionnels.

---

# Configuration Playwright

Le projet utilise notamment :

- dossier de tests : `tests/`
- timeout : 30 secondes
- exécution parallèle
- `forbidOnly` activé en CI
- retries :
  - 0 en local
  - 2 en CI
- 1 worker en CI
- projets Chromium et Firefox
- trace au premier retry
- screenshot uniquement en cas d'échec
- vidéo uniquement en cas d'échec
- reporters :
  - List
  - HTML
  - Allure

---

# Intégration Continue

Le workflow GitHub Actions :

1. récupération du dépôt
2. installation de Node.js LTS
3. installation des dépendances
4. installation des navigateurs Playwright
5. exécution des tests
6. génération du rapport Allure
7. publication des artefacts
8. déploiement du rapport Allure sur GitHub Pages (hors Pull Request)

---

# Auteur

Projet de démonstration QA Automation réalisé avec :

- Playwright
- JavaScript
- Page Object Model
- GitHub Actions
- Allure Report

dans une démarche conforme aux bonnes pratiques Playwright/ISTQB et d'automatisation des tests.

## Rapport qualité du code

Le pipeline GitHub Actions exécute ESLint et Prettier, génère un rapport HTML puis le publie sur GitHub Pages :

- Rapport Allure : https://maximejoannis.github.io/saucedemo-qa-automation/
- Rapport qualité : https://maximejoannis.github.io/saucedemo-qa-automation/quality/
- Rapport ESLint détaillé : https://maximejoannis.github.io/saucedemo-qa-automation/quality/eslint-report.html

Génération locale du rapport qualité :

```bash
npm run quality:report
```

Le rapport est créé dans `quality-report/`. ESLint et Prettier restent les contrôles bloquants du pipeline ; la génération HTML n'ajoute pas de quality gate supplémentaire.
