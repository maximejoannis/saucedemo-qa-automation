# AI Feature Mapper

## Documentation technique

### Présentation

L'AI Feature Mapper est un agent QA spécialisé dans l'analyse de la
couverture fonctionnelle des tests automatisés Playwright.

Son objectif est de transformer un référentiel fonctionnel, des Page
Objects et des tests Playwright en un rapport de couverture
fonctionnelle explicable.

---

# Objectifs

- Cartographier les fonctionnalités métier
- Analyser les Page Objects
- Analyser les tests Playwright
- Corréler les fonctionnalités avec les tests
- Calculer la couverture fonctionnelle
- Générer un rapport HTML et JSON

---

# Architecture

```text
Référentiel fonctionnel
        │
        ▼
Functional Repository Analyzer
        │
        ▼
Page Object Analyzer
        │
        ▼
Playwright Test Analyzer
        │
        ▼
Correlation Engine
        │
        ▼
Coverage Engine
        │
        ▼
Execution Evidence Analyzer (optionnel)
        │
        ▼
Coverage Report Generator
```

---

# Structure

```text
feature-mapper/
├── analyzers/
├── execution/
├── output/
├── reasoning/
├── report/
├── tests/
├── agent.js
└── config.js
```

---

# Fonctionnement

1.  Lecture du référentiel fonctionnel.
2.  Analyse des Page Objects.
3.  Analyse des tests Playwright.
4.  Construction de la cartographie fonctionnelle.
5.  Corrélation des fonctionnalités avec les tests.
6.  Calcul de la couverture.
7.  Lecture des résultats Playwright (optionnelle).
8.  Génération de :
    - feature-map.json
    - coverage-report.json
    - coverage-report.html

---

# Correlation Engine

Le moteur de corrélation associe les fonctionnalités aux tests à partir
des informations disponibles dans le dépôt :

- identifiants fonctionnels ;
- domaines métier ;
- mots-clés ;
- Page Objects utilisés ;
- méthodes appelées ;
- titres des tests.

Les associations sont déterministes et reproductibles.

---

# Coverage Engine

Le moteur calcule :

- le nombre de fonctionnalités recensées ;
- le nombre de fonctionnalités couvertes ;
- le nombre de fonctionnalités non couvertes ;
- la couverture globale ;
- la couverture par domaine.

Le rapport explique toujours la formule utilisée.

---

# Résultats d'exécution Playwright

Lorsque les résultats Playwright sont disponibles, l'agent distingue :

- tests associés ;
- tests exécutés ;
- tests réussis ;
- tests échoués.

Cette étape enrichit le rapport avec des preuves d'exécution.

---

# Commandes

```bash
npm run ai:map-features
npm run test:ai
npm run ai:coverage-report
npm run ai:report
npm run test:coverage
npm run ai:report:executed
```

---

# Livrables

- feature-map.json
- coverage-report.json
- coverage-report.html

---

# Limites

L'agent produit une mesure de couverture fonctionnelle basée sur les
informations présentes dans le dépôt et, si disponible, sur les
résultats Playwright.

Il ne remplace pas une revue QA et n'utilise pas de modèle de langage
(LLM).

---

# Évolutions

- amélioration des règles de corrélation ;
- enrichissement des preuves d'exécution ;
- traçabilité plus fine entre fonctionnalités, Page Objects et tests.
