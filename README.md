# SauceDemo QA Automation

[![Playwright Tests](https://github.com/maximejoannis/saucedemo-qa-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/maximejoannis/saucedemo-qa-automation/actions/workflows/playwright.yml)
[![Allure Report] : https://maximejoannis.github.io/saucedemo-qa-automation

Suite de tests end-to-end du site [SauceDemo](https://www.saucedemo.com/) réalisée avec **Playwright** et structurée selon une approche de traçabilité ISTQB.

La suite couvre les parcours essentiels d’authentification, de consultation du catalogue, de gestion du panier, de saisie des informations client et de finalisation de commande.

## État du projet

- **36 tests Playwright** répartis dans **5 fichiers de spécification** ;
- exécution sur **Chromium** ;
- architecture **Page Object Model** ;
- fixtures et données de test centralisées ;
- rapports **Playwright HTML** et **Allure** ;
- exécution parallèle activée hors CI ;
- traces au premier retry, captures et vidéos conservées en cas d’échec.

La suite a été validée localement avec succès lors de plusieurs exécutions complètes, avec `--repeat-each=5` et avec `--workers=4`.

## Prérequis

- Node.js 18 ou supérieur ;
- npm ;
- accès à `https://www.saucedemo.com/` ;
- Java uniquement pour certaines utilisations de la CLI Allure selon l’environnement.

## Installation

Depuis la racine du projet :

```bash
npm ci
npx playwright install chromium
```

Sur une machine Linux nécessitant les dépendances système du navigateur :

```bash
npx playwright install --with-deps chromium
```

## Exécuter les tests

### Toute la suite

```bash
npx playwright test
```

### Mode navigateur visible

```bash
npx playwright test --headed
```

### Interface graphique Playwright

```bash
npx playwright test --ui
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

### Vérification de la stabilité

Chaque test est rejoué cinq fois :

```bash
npx playwright test --repeat-each=5
```

Exécution avec quatre workers :

```bash
npx playwright test --workers=4
```

### Débogage

```bash
npx playwright test --debug
```

Pour afficher les étapes et les locators dans l’inspecteur Playwright :

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

### Rapport Allure

Les résultats bruts sont écrits dans `allure-results/` par le reporter configuré dans `playwright.config.js`.

Générer le rapport :

```bash
npx allure generate allure-results --clean -o allure-report
```

Ouvrir le rapport généré :

```bash
npx allure open allure-report
```

Ou générer et servir le rapport directement :

```bash
npx allure serve allure-results
```

## Architecture

```text
.
├── docs/
│   ├── 01-user-stories-acceptance-criteria.md
│   ├── 02-test-cases.md
│   └── 03-traceability-matrix.md
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
└── playwright.config.js
```

### `src/pages/`

Contient les Page Objects. Les locators et les actions propres à chaque écran y sont centralisés afin de limiter la duplication et de rendre les tests plus faciles à maintenir.

### `src/fixtures/`

Expose les Page Objects sous forme de fixtures Playwright et fournit la fixture `authenticatedPage`, qui réalise une connexion standard avant les scénarios nécessitant un utilisateur authentifié.

### `src/data/`

Centralise les utilisateurs, produits et données de checkout utilisés par les scénarios.

### `tests/`

Les spécifications sont regroupées par user story. Les tests utilisent des assertions web-first Playwright et des locators stables, notamment les attributs `data-test` exposés par SauceDemo.

### `docs/`

Contient :

- les user stories et critères d’acceptation ;
- le catalogue des 50 cas de test fonctionnels ;
- la matrice de traçabilité détaillée, avec le statut de chaque cas.

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

Certains tests automatisés couvrent plusieurs cas fonctionnels proches. La matrice précise alors le même test de référence pour chacun des cas couverts.

## Configuration Playwright

Les principaux choix sont définis dans `playwright.config.js` :

- `fullyParallel: true` ;
- `forbidOnly` activé en CI ;
- 2 retries en CI et aucun retry en local ;
- un seul worker en CI ;
- projet Chromium Desktop ;
- `trace: 'on-first-retry'` ;
- `screenshot: 'only-on-failure'` ;
- `video: 'retain-on-failure'` ;
- reporters console, HTML et Allure.

## Traçabilité et couverture

Le référentiel contient 50 cas fonctionnels :

- **42 cas couverts par la suite automatisée** ;
- **8 cas conservés en exécution manuelle** ;
- **0 cas non retenu**.

Les 42 cas automatisés sont couverts par 36 fonctions de test, certains scénarios regroupant plusieurs vérifications cohérentes d’un même parcours.

Consulter la matrice complète : [`docs/03-traceability-matrix.md`](docs/03-traceability-matrix.md).

## Intégration continue

L’intégration au dépôt GitHub sera réalisée dans une prochaine étape. Le workflow devra au minimum :

1. installer Node.js et les dépendances avec `npm ci` ;
2. installer Chromium et ses dépendances ;
3. exécuter `npx playwright test` ;
4. publier `playwright-report/` et `allure-results/` comme artefacts, y compris en cas d’échec.
