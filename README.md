# SauceDemo QA Automation

[![Playwright Tests](https://github.com/maximejoannis/saucedemo-qa-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/maximejoannis/saucedemo-qa-automation/actions/workflows/playwright.yml)

Rapport Allure publié : https://maximejoannis.github.io/saucedemo-qa-automation

Suite de tests end-to-end du site [SauceDemo](https://www.saucedemo.com/) réalisée avec **Playwright** en JavaScript et structurée autour d’une traçabilité entre user stories, critères d’acceptation et cas de test.

La suite couvre les parcours d’authentification, de consultation et de tri du catalogue, de gestion du panier, de saisie des informations client et de finalisation de commande.

## État du projet

- **36 tests Playwright** répartis dans **5 fichiers de spécification** ;
- exécution sur **Chromium et Firefox** ;
- architecture **Page Object Model** ;
- fixtures et données de test centralisées ;
- rapports **Playwright HTML** et **Allure** ;
- exécution parallèle activée hors CI ;
- 2 retries et 1 worker en CI ;
- traces au premier retry, captures d’écran en cas d’échec et vidéos conservées en cas d’échec ;
- workflow GitHub Actions exécuté sur les push et pull requests vers `main` ;
- rapport Allure publié sur GitHub Pages hors pull request.

## Prérequis

- Node.js et npm ;
- accès à `https://www.saucedemo.com/` ;
- Java pour l’utilisation de la CLI Allure.

Le workflow CI utilise la version LTS de Node.js.

## Installation

Depuis la racine du projet :

```bash
npm ci
npx playwright install
```

Sur une machine Linux nécessitant également les dépendances système des navigateurs :

```bash
npx playwright install --with-deps
```

## Exécuter les tests

### Toute la suite

```bash
npm test
```

Équivalent :

```bash
npx playwright test
```

### Mode navigateur visible

```bash
npm run test:headed
```

### Interface graphique Playwright

```bash
npm run test:ui
```

### Un navigateur précis

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

### Un fichier de tests

```bash
npx playwright test tests/us01-authentication/ac01-login.spec.js
```

### Un test par son titre

```bash
npx playwright test -g "TC-US01-AC01-01"
```

### Tests marqués smoke

```bash
npx playwright test -g "@smoke"
```

Les tags actuellement présents dans la suite sont `@smoke` et `@critical`.

### Vérification de stabilité

Rejouer chaque test cinq fois :

```bash
npx playwright test --repeat-each=5
```

Forcer quatre workers :

```bash
npx playwright test --workers=4
```

### Débogage

```bash
npx playwright test --debug
```

Pour ouvrir l’inspecteur Playwright avec `PWDEBUG` :

```bash
PWDEBUG=1 npx playwright test
```

Sous PowerShell :

```powershell
$env:PWDEBUG=1; npx playwright test
```

## Rapports

### Rapport HTML Playwright

Le rapport est généré dans `playwright-report/` après l’exécution.

```bash
npx playwright show-report
```

En CI, ce dossier est publié comme artefact pendant 30 jours.

### Rapport Allure

Les résultats bruts sont écrits dans `allure-results/` par le reporter configuré dans `playwright.config.js`.

Générer le rapport avec le script du projet :

```bash
npm run allure:generate
```

Le rapport est généré dans `allure-report/`.

L’ouvrir :

```bash
npm run allure:open
```

Il est aussi possible de le servir directement depuis les résultats :

```bash
npx allure serve allure-results
```

En CI, les résultats bruts, le rapport HTML Allure et le rapport Playwright sont publiés comme artefacts. Le rapport Allure HTML est également déployé sur GitHub Pages pour les exécutions hors pull request.

## Architecture

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
├── docs/
│   ├── 01-user-stories-acceptance-criteria.md
│   ├── 02-test-cases.md
│   ├── 03-traceability-matrix.md
│   ├── cadrage-qa.md
│   └── strategie-de-test.md
├── src/
│   ├── data/
│   │   ├── checkout.js
│   │   ├── products.js
│   │   └── users.js
│   ├── fixtures/
│   │   └── test.js
│   └── pages/
│       ├── CartPage.js
│       ├── CheckoutPage.js
│       ├── InventoryPage.js
│       └── LoginPage.js
├── tests/
│   ├── us01-authentication/
│   ├── us02-catalogue/
│   ├── us03-panier/
│   ├── us04-checkout/
│   └── us05-e2e/
├── package.json
├── package-lock.json
└── playwright.config.js
```

### `src/pages/`

Contient les Page Objects. Les locators et les actions propres à chaque écran y sont centralisés afin de limiter la duplication dans les tests.

### `src/fixtures/`

Expose les Page Objects sous forme de fixtures Playwright et fournit la fixture `authenticatedPage`, qui réalise une connexion standard avant les scénarios nécessitant un utilisateur authentifié.

### `src/data/`

Centralise les utilisateurs, produits et données de checkout utilisés par les scénarios.

### `tests/`

Regroupe les spécifications par user story. Les tests utilisent notamment les attributs `data-test` exposés par SauceDemo.

### `docs/`

Contient :

- le cadrage QA ;
- la stratégie de test ;
- les user stories et critères d’acceptation ;
- le catalogue de 50 cas de test fonctionnels ;
- la matrice de traçabilité et le backlog des cas manuels.

## Documentation fonctionnelle

- [Cadrage QA](docs/cadrage-qa.md)
- [Stratégie de test](docs/strategie-de-test.md)
- [User stories et critères d’acceptation](docs/01-user-stories-acceptance-criteria.md)
- [Catalogue des cas de test](docs/02-test-cases.md)
- [Matrice de traçabilité](docs/03-traceability-matrix.md)

## Convention d’identification

Chaque cas suit le format :

```text
TC-USxx-ACxx-nn
```

Exemple :

```text
TC-US03-AC02-05
```

- `US03` : user story « Gestion du panier » ;
- `AC02` : deuxième critère d’acceptation ;
- `05` : cinquième cas de test du critère.

Certains tests automatisés couvrent plusieurs cas fonctionnels proches. La matrice de traçabilité associe alors plusieurs cas au même test Playwright.

## Configuration Playwright

Les principaux choix définis dans `playwright.config.js` sont :

- `testDir: './tests'` ;
- timeout de test de 30 secondes ;
- `fullyParallel: true` ;
- `forbidOnly` activé en CI ;
- 2 retries en CI et aucun retry en local ;
- 1 worker en CI ;
- projets Desktop Chrome et Desktop Firefox ;
- `trace: 'on-first-retry'` ;
- `screenshot: 'only-on-failure'` ;
- `video: 'retain-on-failure'` ;
- reporters console, HTML et Allure.

## Traçabilité et couverture

Le référentiel contient **50 cas fonctionnels** :

- **42 cas automatisés** ;
- **8 cas conservés en exécution manuelle** ;
- **0 cas non retenu**.

Les 42 cas automatisés sont couverts par 36 fonctions de test, certains scénarios regroupant plusieurs vérifications d’un même parcours.

Consulter la matrice complète : [`docs/03-traceability-matrix.md`](docs/03-traceability-matrix.md).

## Intégration continue

Le workflow [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) :

1. récupère le dépôt ;
2. installe Node.js LTS et les dépendances avec `npm ci` ;
3. installe les navigateurs Playwright et leurs dépendances système ;
4. exécute la suite avec `npm test` ;
5. génère le rapport Allure ;
6. publie les rapports Playwright et Allure comme artefacts pendant 30 jours ;
7. déploie le rapport Allure sur GitHub Pages hors pull request.
