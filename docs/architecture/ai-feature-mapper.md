# AI Feature Mapper

## Objectif

L'AI Feature Mapper est un agent spécialisé chargé de construire une cartographie fonctionnelle du framework d'automatisation.

Son rôle est d'établir des liens entre :

- le référentiel fonctionnel ;
- le code du framework Playwright ;
- les fonctionnalités réellement observées dans l'application.

Il ne calcule pas le taux de couverture fonctionnelle. Cette responsabilité appartient au Coverage Analyzer.

---

# Responsabilités

L'agent est responsable de :

- analyser le référentiel fonctionnel ;
- explorer l'application via les outils Playwright ;
- analyser les Page Objects ;
- analyser les scénarios Playwright ;
- identifier les fonctionnalités implémentées ;
- produire une cartographie structurée.

---

# Hors périmètre

L'agent ne doit pas :

- générer des tests ;
- modifier des tests ;
- réparer des tests ;
- calculer la couverture fonctionnelle ;
- produire des recommandations.

Ces responsabilités appartiennent à d'autres composants.

---

# Entrées

L'agent exploite les sources suivantes :

## Documentation

- docs/functional-map.md
- docs/user-stories.md
- docs/business-rules.md
- docs/glossary.md

## Framework

- src/pages/
- src/fixtures/
- tests/

## Application

Exploration dynamique réalisée avec les outils Playwright.

---

# Sorties

L'agent produit une représentation structurée des fonctionnalités découvertes.

Chaque fonctionnalité possède :

- un identifiant ;
- un nom ;
- les Page Objects associés ;
- les scénarios associés ;
- les observations réalisées.

---

# Outils utilisés

L'agent s'appuie sur :

- Playwright (exploration de l'application)
- Playwright Planner
- Analyse statique du dépôt
- Raisonnement assisté par IA

---

# Principe de fonctionnement

L'agent agit en plusieurs étapes :

1. Lecture du référentiel fonctionnel.
2. Exploration de l'application.
3. Analyse des Page Objects.
4. Analyse des tests Playwright.
5. Construction de la cartographie fonctionnelle.
6. Génération d'un modèle de connaissances structuré.

---

# Résultat attendu

L'agent fournit une cartographie fiable et exploitable par les composants suivants :

- Coverage Analyzer
- AI Recommendations
- Dashboard
