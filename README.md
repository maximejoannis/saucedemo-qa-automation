# SauceDemo QA Automation

Framework d’automatisation QA construit avec **Playwright JavaScript** sur l’application e-commerce de démonstration **SauceDemo**.

L’objectif est de sécuriser les parcours critiques : authentification, catalogue produits, panier, checkout et confirmation de commande, avec une architecture maintenable de type **Page Object Model**, des données de test centralisées et une exécution CI/CD GitHub Actions.

## Application sous test

| Élément | Valeur |
|---|---|
| Nom | SauceDemo |
| URL | https://www.saucedemo.com/ |
| Type | Application web e-commerce de démonstration |
| Outil | Playwright |
| Langage | JavaScript |
| Navigateur CI | Chromium |

## Objectifs QA

- Vérifier la connexion avec un utilisateur valide.
- Vérifier les erreurs d’authentification.
- Vérifier l’affichage du catalogue produits.
- Vérifier l’ajout et le retrait de produits au panier.
- Vérifier le contenu du panier.
- Vérifier les contrôles obligatoires du checkout.
- Vérifier le récapitulatif de commande.
- Sécuriser le parcours complet d’achat.
- Générer un rapport HTML exploitable.
- Exécuter les tests automatiquement via GitHub Actions.

## Architecture du projet

```text
saucedemo-qa-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── docs/
│   ├── cadrage-qa.md
│   └── strategie-de-test.md
├── fixtures/
│   ├── checkoutData.js
│   ├── products.js
│   └── users.js
├── pages/
│   ├── CartPage.js
│   ├── CheckoutCompletePage.js
│   ├── CheckoutPage.js
│   ├── LoginPage.js
│   └── ProductsPage.js
├── tests/
│   ├── cart/
│   │   └── cart.test.js
│   ├── checkout/
│   │   └── checkout.test.js
│   ├── e2e/
│   │   └── purchase-flow.test.js
│   ├── login/
│   │   └── login.test.js
│   ├── products/
│   │   └── product.test.js
│   └── testBase.js
├── playwright.config.js
├── package.json
└── README.md
```

## Approche Page Object Model

Le projet sépare clairement :

- les **sélecteurs** dans les classes `pages/` ;
- les **actions métier** dans les méthodes POM ;
- les **assertions réutilisables** dans les pages ;
- les **données de test** dans `fixtures/` ;
- les **scénarios** dans `tests/`.

Cette approche réduit la duplication, améliore la lisibilité et facilite la maintenance.

## Principe learn, build, deploy

Des commentaires sont ajoutés dans le code selon trois intentions :

- **learn** : expliquer le choix QA ou technique pour faciliter l’apprentissage ;
- **build** : montrer comment l’architecture est construite et réutilisée ;
- **deploy** : indiquer ce qui rend les tests fiables en pipeline CI/CD.

## Jeux de données de test

### Utilisateurs acceptés

Tous les utilisateurs utilisent le mot de passe `secret_sauce`.

| Profil | Username | Usage QA |
|---|---|---|
| Standard | `standard_user` | Parcours nominal |
| Locked out | `locked_out_user` | Erreur utilisateur bloqué |
| Problem | `problem_user` | Profil instable côté application |
| Performance glitch | `performance_glitch_user` | Profil lent côté application |
| Error | `error_user` | Profil générant des erreurs applicatives |
| Visual | `visual_user` | Profil utile pour régressions visuelles |

Les données sont centralisées dans `fixtures/users.js`.

### Produits

Les produits, slugs de sélecteurs et prix attendus sont centralisés dans `fixtures/products.js`.

### Checkout

Les données client valides et les variantes négatives sont centralisées dans `fixtures/checkoutData.js`.

## Couverture automatisée

| Module | Tests couverts | Tags |
|---|---|---|
| Authentification | Connexion valide, mot de passe invalide, utilisateur bloqué, champs obligatoires | `@login`, `@smoke`, `@regression` |
| Catalogue | Affichage, ajout, retrait, multi-ajout, tri nom/prix | `@products`, `@smoke`, `@regression` |
| Panier | Panier vide, contenu, suppression, retour catalogue | `@cart`, `@regression` |
| Checkout | Formulaire, champs obligatoires, récapitulatif, finalisation | `@checkout`, `@regression` |
| E2E | Achat complet multi-produits | `@e2e`, `@critical`, `@smoke` |

## Installation

```bash
npm install
npx playwright install
```

## Exécution locale

```bash
npm test
```

Exécution headed :

```bash
npm run test:headed
```

Mode UI Playwright :

```bash
npm run test:ui
```

Afficher le rapport HTML :

```bash
npm run report
```

## Exécution par tags

```bash
npm run test:smoke
npm run test:critical
npm run test:regression
```

Ou directement :

```bash
npx playwright test --grep @smoke
npx playwright test --grep @critical
npx playwright test --grep @regression
```

## Reporting

La configuration Playwright génère :

- un rapport HTML ;
- des screenshots en cas d’échec ;
- des vidéos en cas d’échec ;
- des traces au premier retry.

Configuration clé :

```js
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
}
```

## Pipeline CI/CD

Le workflow `.github/workflows/playwright.yml` exécute les tests :

- au push sur `main` ;
- sur pull request vers `main` ;
- manuellement via `workflow_dispatch`.

Étapes principales :

1. Checkout du repository.
2. Installation de Node.js.
3. Installation des dépendances avec `npm ci`.
4. Installation du navigateur Chromium Playwright.
5. Exécution de la suite de tests.
6. Publication du rapport HTML en artifact.
7. Publication des résultats de test en artifact.

## Bonnes pratiques appliquées

- Architecture Page Object Model.
- Tests indépendants.
- Données centralisées dans des fixtures.
- Tags fonctionnels et métier.
- Pas de `waitForTimeout`.
- Assertions orientées comportement utilisateur.
- Sélecteurs `data-test` stables.
- Steps Playwright pour documenter les parcours critiques.
- Reporting et traces activés pour faciliter le debug.
- Pipeline GitHub Actions prêt pour la CI/CD.

## Commandes utiles

```bash
npm test
npm run test:smoke
npm run test:critical
npm run test:regression
npm run test:headed
npm run test:ui
npm run report
npm run lint:syntax
```

## Critères d’acceptation du framework

Le framework est considéré opérationnel si :

- tous les tests `@smoke` passent ;
- le parcours `@critical` passe ;
- le rapport HTML est généré ;
- les screenshots, vidéos et traces sont disponibles en cas d’échec ;
- le pipeline GitHub Actions publie les artifacts ;
- les tests restent lisibles, indépendants et maintenables.
