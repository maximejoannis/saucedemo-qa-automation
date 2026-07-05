# SauceDemo QA Automation

![Playwright](https://github.com/maximejoannis/saucedemo-qa-automation/actions/workflows/playwright.yml/badge.svg)

Framework d'automatisation QA développé avec **Playwright** et **JavaScript** sur l'application e-commerce de démonstration **SauceDemo**.

L'objectif de ce projet est de sécuriser les parcours critiques de l'application (authentification, catalogue produits, panier, checkout et confirmation de commande) grâce à une architecture **Page Object Model (POM)**, des données de test centralisées et une exécution automatisée via **GitHub Actions**.

---

# Sommaire

- [Application sous test](#application-sous-test)
- [Objectifs QA](#objectifs-qa)
- [Architecture](#architecture)
- [Approche Page Object Model](#approche-page-object-model)
- [Principe *learn, build, deploy*](#principe-learn-build-deploy)
- [Documentation](#documentation)
- [Jeux de données de test](#jeux-de-données-de-test)
- [Couverture automatisée](#couverture-automatisée)
- [Installation](#installation)
- [Exécution locale](#exécution-locale)
- [Exécution par tags](#exécution-par-tags)
- [Reporting](#reporting)
- [Pipeline CI/CD](#pipeline-cicd)
- [Bonnes pratiques appliquées](#bonnes-pratiques-appliquées)
- [Commandes utiles](#commandes-utiles)
- [Critères d'acceptation du framework](#critères-dacceptation-du-framework)

---

# Application sous test

| Élément | Valeur |
|----------|--------|
| Nom | SauceDemo |
| URL | https://www.saucedemo.com/ |
| Type | Application web e-commerce de démonstration |
| Outil | Playwright |
| Langage | JavaScript |
| Navigateur CI | Chromium |

---

# Objectifs QA

Le framework permet de valider les principaux parcours fonctionnels de l'application :

- Vérifier la connexion avec un utilisateur valide.
- Vérifier les erreurs d'authentification.
- Vérifier l'affichage du catalogue produits.
- Vérifier l'ajout et le retrait de produits au panier.
- Vérifier le contenu du panier.
- Vérifier les contrôles obligatoires du checkout.
- Vérifier le récapitulatif de commande.
- Sécuriser le parcours complet d'achat.
- Générer un rapport HTML exploitable.
- Exécuter automatiquement les tests via GitHub Actions.

---

# Architecture

Le projet suit une architecture **Page Object Model (POM)** afin de séparer les responsabilités :

- **pages/** : objets représentant les pages de l'application ;
- **tests/** : scénarios Playwright organisés par domaine fonctionnel ;
- **fixtures/** : données de test centralisées ;
- **docs/** : documentation fonctionnelle et stratégie de test ;
- **.github/workflows/** : pipeline GitHub Actions.

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

---

# Approche Page Object Model

Le projet applique le pattern **Page Object Model (POM)** afin de séparer clairement les responsabilités :

- les **sélecteurs** sont centralisés dans les classes du dossier `pages/` ;
- les **actions métier** sont regroupées dans les méthodes des Page Objects ;
- les **assertions réutilisables** sont définies dans les pages ;
- les **données de test** sont centralisées dans le dossier `fixtures/` ;
- les **scénarios** sont organisés dans le dossier `tests/`.

Cette approche réduit la duplication du code, améliore la lisibilité des scénarios et facilite la maintenance du framework.

---

# Principe *learn, build, deploy*

Des commentaires sont présents dans le code afin d'expliciter certains choix techniques et fonctionnels.

- **learn** : expliquer un choix QA ou technique afin de faciliter l'apprentissage ;
- **build** : montrer la construction et l'organisation du framework ;
- **deploy** : mettre en évidence les éléments permettant une exécution fiable en pipeline CI/CD.

---

# Documentation

La documentation du projet est disponible dans le dossier **docs/**.

| Document | Description |
|----------|-------------|
| `cadrage-qa.md` | Présentation du contexte, du périmètre et des objectifs QA |
| `strategie-de-test.md` | Stratégie de test et couverture fonctionnelle |

---

# Jeux de données de test

## Utilisateurs

Tous les utilisateurs utilisent le mot de passe :

```text
secret_sauce
```

| Profil | Username | Usage QA |
|----------|----------|----------|
| Standard | `standard_user` | Parcours nominal |
| Locked out | `locked_out_user` | Erreur utilisateur bloqué |
| Problem | `problem_user` | Profil instable côté application |
| Performance glitch | `performance_glitch_user` | Profil lent côté application |
| Error | `error_user` | Profil générant des erreurs applicatives |
| Visual | `visual_user` | Profil utile pour les régressions visuelles |

Les données sont centralisées dans `fixtures/users.js`.

## Produits

Les produits, les sélecteurs et les prix attendus sont centralisés dans `fixtures/products.js`.

## Checkout

Les données client valides et les variantes négatives sont centralisées dans `fixtures/checkoutData.js`.

---

# Couverture automatisée

| Module | Tests couverts | Tags |
|----------|----------------|------|
| Authentification | Connexion valide, mot de passe invalide, utilisateur bloqué, champs obligatoires | `@login` `@smoke` `@regression` |
| Catalogue | Affichage, ajout, retrait, multi-ajout, tri nom/prix | `@products` `@smoke` `@regression` |
| Panier | Panier vide, contenu, suppression, retour catalogue | `@cart` `@regression` |
| Checkout | Formulaire, champs obligatoires, récapitulatif, finalisation | `@checkout` `@regression` |
| E2E | Achat complet multi-produits | `@e2e` `@critical` `@smoke` |

---

# Installation

```bash
npm install
npx playwright install
```

---

# Exécution locale

Lancer toute la suite :

```bash
npm test
```

Mode navigateur visible :

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

---

# Exécution par tags

Scripts npm :

```bash
npm run test:smoke
npm run test:critical
npm run test:regression
```

Ou directement avec Playwright :

```bash
npx playwright test --grep @smoke
npx playwright test --grep @critical
npx playwright test --grep @regression
```

---

# Reporting

La configuration Playwright génère automatiquement :

- un rapport HTML ;
- des captures d'écran en cas d'échec ;
- des vidéos en cas d'échec ;
- des traces lors du premier retry.

Configuration :

```javascript
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
}
```

---

# Pipeline CI/CD

Le workflow `.github/workflows/playwright.yml` exécute automatiquement les tests :

- lors d'un **push** sur `main` ;
- lors d'une **Pull Request** vers `main` ;
- lors d'une exécution manuelle via `workflow_dispatch`.

Étapes principales :

1. Checkout du dépôt.
2. Installation de Node.js.
3. Installation des dépendances avec `npm ci`.
4. Installation du navigateur Chromium.
5. Exécution des tests Playwright.
6. Publication du rapport HTML en artifact.
7. Publication des résultats de test en artifact.

---

# Bonnes pratiques appliquées

- Architecture Page Object Model.
- Tests indépendants.
- Données de test centralisées.
- Tags fonctionnels et métier.
- Pas de `waitForTimeout`.
- Assertions orientées comportement utilisateur.
- Utilisation de sélecteurs `data-test`.
- Utilisation des étapes Playwright pour documenter les parcours critiques.
- Reporting et traces activés pour faciliter l'analyse des échecs.
- Pipeline GitHub Actions prêt pour la CI/CD.

---

# Commandes utiles

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

---

# Critères d'acceptation du framework

Le framework est considéré comme opérationnel lorsque :

- tous les tests `@smoke` sont exécutés avec succès ;
- le parcours `@critical` est validé ;
- le rapport HTML est généré ;
- les captures d'écran, vidéos et traces sont disponibles en cas d'échec ;
- le pipeline GitHub Actions publie correctement les artifacts ;
- les tests restent lisibles, indépendants et maintenables.

---

Ce projet constitue une base d'automatisation de tests maintenable pour sécuriser les parcours critiques de l'application SauceDemo et accompagner les campagnes de non-régression.
