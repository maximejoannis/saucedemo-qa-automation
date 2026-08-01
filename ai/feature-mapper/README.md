# Architecture interne de l’AI Feature Mapper

## Objectif

Ce document décrit l’architecture technique interne de l’**AI Feature Mapper**.

L’agent doit collecter, structurer et rapprocher les informations issues :

- du référentiel fonctionnel ;
- du framework Playwright ;
- de l’exploration dynamique de l’application.

Sa sortie est une cartographie descriptive des fonctionnalités. Il ne calcule aucun taux de couverture.

---

# Principes d’architecture

L’AI Feature Mapper respecte les principes suivants :

- séparation claire des responsabilités ;
- indépendance vis-à-vis de l’exécution des tests ;
- résultats structurés et versionnables ;
- traçabilité des associations produites ;
- possibilité de remplacer le fournisseur IA ;
- validation systématique des sorties ;
- absence de modification automatique du code source.

L’agent ne doit jamais modifier :

- les tests Playwright ;
- les Page Objects ;
- les fixtures ;
- le référentiel fonctionnel.

---

# Vue d’ensemble

```text
                         AI Feature Mapper
                                │
                                ▼
                         Agent Orchestrator
                                │
          ┌─────────────────────┼─────────────────────┐
          ▼                     ▼                     ▼
  Documentation Tool      Repository Tool      Exploration Tool
          │                     │                     │
          ▼                     ▼                     ▼
   Référentiel métier     Code Playwright      Application réelle
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                ▼
                         Normalized Model
                                │
                                ▼
                           AI Matcher
                                │
                                ▼
                         Result Validator
                                │
                                ▼
                       Feature Map JSON
```

---

# Structure proposée

```text
ai/
└── feature-mapper/
    ├── agent.js
    ├── config.js
    ├── README.md
    │
    ├── tools/
    │   ├── documentation-tool.js
    │   ├── repository-tool.js
    │   └── playwright-explorer-tool.js
    │
    ├── parsers/
    │   ├── functional-map-parser.js
    │   ├── user-stories-parser.js
    │   ├── business-rules-parser.js
    │   ├── page-object-parser.js
    │   └── test-parser.js
    │
    ├── models/
    │   ├── feature.js
    │   ├── code-reference.js
    │   ├── observation.js
    │   └── feature-association.js
    │
    ├── matcher/
    │   ├── deterministic-matcher.js
    │   └── ai-matcher.js
    │
    ├── prompts/
    │   └── feature-matching.prompt.md
    │
    ├── validators/
    │   ├── input-validator.js
    │   └── result-validator.js
    │
    ├── reporters/
    │   └── json-reporter.js
    │
    └── output/
        └── feature-map.json
```

---

# Composants

## 1. Agent Orchestrator

Fichier :

```text
ai/feature-mapper/agent.js
```

L’orchestrateur pilote l’exécution complète de l’agent.

### Responsabilités

- charger la configuration ;
- appeler les outils dans le bon ordre ;
- centraliser les données collectées ;
- déclencher les rapprochements ;
- valider les résultats ;
- générer la sortie finale ;
- gérer les erreurs d’exécution.

### Ordre d’exécution

```text
1. Charger la configuration
2. Lire le référentiel fonctionnel
3. Analyser le dépôt Playwright
4. Explorer l’application
5. Normaliser les informations
6. Exécuter les rapprochements déterministes
7. Soumettre les cas ambigus au raisonnement IA
8. Valider le résultat
9. Générer feature-map.json
```

L’orchestrateur ne contient pas directement de logique de parsing ou de navigation.

---

## 2. Configuration

Fichier :

```text
ai/feature-mapper/config.js
```

La configuration centralise les chemins et les paramètres de l’agent.

Exemple de responsabilités :

- emplacement de `docs/functional-map.md` ;
- emplacement des User Stories ;
- emplacement des règles métier ;
- répertoire des Page Objects ;
- répertoire des tests ;
- URL de l’application ;
- seuil minimal de confiance ;
- activation ou désactivation de l’exploration dynamique ;
- emplacement du fichier de sortie.

Aucun chemin important ne doit être codé directement dans les composants.

---

# Outils de l’agent

## 3. Documentation Tool

Fichier :

```text
ai/feature-mapper/tools/documentation-tool.js
```

Cet outil donne accès au référentiel fonctionnel.

### Sources

```text
docs/functional-map.md
docs/user-stories.md
docs/business-rules.md
docs/glossary.md
```

### Responsabilités

- lire les documents ;
- appeler les parsers correspondants ;
- vérifier les références entre documents ;
- produire un modèle fonctionnel normalisé.

### Sortie attendue

```json
{
  "features": [],
  "userStories": [],
  "businessRules": [],
  "glossary": []
}
```

---

## 4. Repository Tool

Fichier :

```text
ai/feature-mapper/tools/repository-tool.js
```

Cet outil analyse statiquement le framework Playwright.

### Périmètre analysé

```text
src/pages/
src/fixtures/
tests/
global-setup.js
playwright.config.js
```

### Responsabilités

- découvrir les fichiers concernés ;
- identifier les Page Objects ;
- extraire les méthodes publiques ;
- identifier les tests et leurs titres ;
- retrouver les imports et dépendances ;
- identifier les fixtures utilisées ;
- relever les locators et actions significatives ;
- conserver les chemins et numéros de ligne utiles.

Cet outil ne détermine pas seul qu’une fonctionnalité est couverte. Il fournit uniquement des éléments observables.

### Exemple de sortie

```json
{
  "pageObjects": [
    {
      "name": "LoginPage",
      "file": "src/pages/LoginPage.js",
      "methods": [
        {
          "name": "login",
          "line": 18
        }
      ]
    }
  ],
  "tests": [
    {
      "title": "permet à un utilisateur valide de se connecter",
      "file": "tests/us01-authentication/ac01-login.spec.js",
      "pageObjects": ["LoginPage"]
    }
  ]
}
```

---

## 5. Playwright Explorer Tool

Fichier :

```text
ai/feature-mapper/tools/playwright-explorer-tool.js
```

Cet outil assure l’exploration dynamique de l’application.

Il constitue le point d’intégration avec les capacités d’exploration Playwright et le Planner.

### Responsabilités

- lancer une session de navigation isolée ;
- explorer les écrans accessibles ;
- observer les éléments interactifs ;
- identifier les transitions entre écrans ;
- relever les comportements visibles ;
- produire des observations structurées ;
- conserver les preuves utiles à la cartographie.

### Exemples d’observations

```json
{
  "page": "Inventory",
  "url": "https://www.saucedemo.com/inventory.html",
  "actions": ["trier les produits", "ajouter un produit au panier", "ouvrir le panier"],
  "source": "playwright-exploration"
}
```

### Restrictions

L’outil d’exploration ne doit pas :

- modifier les fichiers du dépôt ;
- générer automatiquement de nouveaux tests ;
- réparer les tests existants ;
- conclure seul à une association fonctionnelle ;
- exécuter des actions destructrices hors du périmètre prévu.

Le Planner apporte des observations et des parcours. La décision finale appartient au Feature Mapper.

---

# Parsers

## 6. Parsers documentaires

Les parsers documentaires transforment les fichiers Markdown en objets structurés.

### `functional-map-parser.js`

Extrait notamment :

- l’identifiant de la fonctionnalité ;
- son nom ;
- son domaine ;
- sa description ;
- ses préconditions ;
- ses résultats attendus.

### `user-stories-parser.js`

Extrait :

- l’identifiant de la User Story ;
- son intitulé ;
- le besoin utilisateur ;
- les fonctionnalités associées ;
- les critères d’acceptation.

### `business-rules-parser.js`

Extrait :

- l’identifiant de la règle ;
- son intitulé ;
- sa description ;
- les fonctionnalités concernées.

---

## 7. Parsers du dépôt

### `page-object-parser.js`

Extrait :

- le nom de la classe ;
- le fichier source ;
- les locators ;
- les méthodes ;
- les appels Playwright ;
- les assertions éventuelles.

### `test-parser.js`

Extrait :

- les blocs `describe` ;
- les titres des tests ;
- les étapes éventuelles ;
- les fixtures utilisées ;
- les Page Objects appelés ;
- les méthodes invoquées ;
- les données de test employées.

L’analyse doit reposer autant que possible sur la structure syntaxique JavaScript plutôt que sur de simples expressions régulières.

---

# Modèle de données

## 8. Feature

Une fonctionnalité provenant du référentiel.

```json
{
  "id": "F20",
  "name": "Ajouter un produit au panier",
  "domain": "Panier",
  "description": "Ajoute un produit au panier.",
  "expectedResults": ["Le produit apparaît dans le panier."]
}
```

---

## 9. Code Reference

Une référence vers un élément du framework.

```json
{
  "type": "pageObjectMethod",
  "name": "InventoryPage.addProductToCart",
  "file": "src/pages/InventoryPage.js",
  "line": 24
}
```

Types possibles :

- `pageObject`;
- `pageObjectMethod`;
- `test`;
- `fixture`;
- `data`;
- `configuration`.

---

## 10. Observation

Un comportement observé pendant l’exploration dynamique.

```json
{
  "page": "Inventory",
  "action": "Ajouter Sauce Labs Backpack au panier",
  "result": "Le compteur du panier passe à 1",
  "source": "playwright-exploration"
}
```

---

## 11. Feature Association

Une association proposée par l’agent.

```json
{
  "featureId": "F20",
  "pageObjects": [
    {
      "name": "InventoryPage",
      "methods": ["addProductToCart"]
    }
  ],
  "tests": [
    {
      "file": "tests/us03-panier/ac01-panier.spec.js",
      "title": "ajoute un produit au panier"
    }
  ],
  "observations": [
    {
      "page": "Inventory",
      "action": "Ajouter un produit au panier"
    }
  ],
  "confidence": 0.96,
  "status": "matched",
  "evidence": [
    "La méthode addProductToCart correspond à l’action décrite par F20.",
    "Le test vérifie la présence du produit dans le panier.",
    "Le comportement a été observé pendant l’exploration."
  ]
}
```

---

# Stratégie de rapprochement

## 12. Deterministic Matcher

Fichier :

```text
ai/feature-mapper/matcher/deterministic-matcher.js
```

Ce composant traite les associations qui peuvent être établies sans IA.

### Signaux exploitables

- identifiants explicites ;
- noms identiques ou proches ;
- dossier de User Story ;
- imports entre tests et Page Objects ;
- appels directs de méthodes ;
- correspondances issues du glossaire ;
- relations explicites dans la documentation.

### Exemple

```text
Fonctionnalité : Ajouter un produit au panier
Méthode : addProductToCart
Test : ajoute un produit au panier
```

Une association forte peut être produite sans solliciter le modèle IA.

---

## 13. AI Matcher

Fichier :

```text
ai/feature-mapper/matcher/ai-matcher.js
```

Le raisonnement IA intervient uniquement lorsque les règles déterministes sont insuffisantes.

### Cas concernés

- noms ambigus ;
- méthodes génériques ;
- test couvrant plusieurs comportements ;
- fonctionnalité répartie sur plusieurs Page Objects ;
- correspondance reposant sur le sens métier ;
- divergence entre documentation, code et observation.

### Entrée transmise à l’IA

L’IA reçoit uniquement le contexte utile :

- la fonctionnalité concernée ;
- les références de code candidates ;
- les tests candidats ;
- les observations Playwright ;
- les termes pertinents du glossaire.

Elle ne reçoit pas inutilement l’intégralité du dépôt.

### Sortie attendue

La réponse doit être structurée :

```json
{
  "featureId": "F31",
  "associations": [],
  "confidence": 0.82,
  "decision": "matched",
  "justification": []
}
```

Décisions possibles :

- `matched` ;
- `partially-matched` ;
- `ambiguous` ;
- `not-found`.

Le statut `not-found` indique seulement qu’aucune correspondance n’a été identifiée. Il ne constitue pas encore un verdict de couverture.

---

# Validation

## 14. Input Validator

Le validateur d’entrée contrôle notamment :

- l’unicité des identifiants de fonctionnalités ;
- l’existence des documents requis ;
- la validité des références entre documents ;
- l’existence des dossiers configurés ;
- la lisibilité des fichiers sources.

Une erreur bloquante doit interrompre proprement l’exécution.

---

## 15. Result Validator

Le validateur de résultat vérifie :

- qu’aucune fonctionnalité n’a disparu ;
- que chaque chemin de fichier existe ;
- que les scores de confiance sont compris entre `0` et `1` ;
- que chaque association comporte une preuve ;
- que les valeurs de statut sont autorisées ;
- qu’aucune sortie IA libre ne contourne le schéma attendu.

Une sortie invalide ne doit pas être enregistrée comme résultat final.

---

# Fichier de sortie

## 16. `feature-map.json`

Chemin proposé :

```text
ai/feature-mapper/output/feature-map.json
```

Structure générale :

```json
{
  "metadata": {
    "generatedAt": "ISO-8601",
    "agent": "AI Feature Mapper",
    "schemaVersion": "1.0.0"
  },
  "summary": {
    "featuresAnalyzed": 0,
    "matched": 0,
    "partiallyMatched": 0,
    "ambiguous": 0,
    "notFound": 0
  },
  "features": []
}
```

La section `summary` décrit uniquement les résultats de cartographie.

Elle ne doit contenir :

- ni taux de couverture ;
- ni verdict de qualité ;
- ni recommandation de tests.

---

# Traçabilité des décisions

Chaque association doit préciser son origine.

Sources possibles :

```text
documentation
static-analysis
playwright-exploration
deterministic-matching
ai-reasoning
```

Une association ne doit jamais être enregistrée uniquement sous la forme :

```text
L’IA pense que cette fonctionnalité correspond à ce test.
```

Elle doit être accompagnée d’éléments vérifiables :

- nom du fichier ;
- titre du test ;
- méthode appelée ;
- comportement observé ;
- règle de correspondance ;
- justification sémantique.

---

# Gestion de la confiance

La confiance exprime la solidité d’une association, pas la couverture de la fonctionnalité.

Proposition de classification :

|            Score | Interprétation           |
| ---------------: | ------------------------ |
|      0,90 à 1,00 | Association forte        |
|      0,70 à 0,89 | Association probable     |
|      0,50 à 0,69 | Association ambiguë      |
| inférieur à 0,50 | Association insuffisante |

Un score élevé ne signifie pas que la fonctionnalité est complètement testée. Il signifie seulement que le lien identifié est solide.

---

# Gestion des erreurs

L’agent doit distinguer :

## Erreurs bloquantes

- référentiel fonctionnel absent ;
- configuration invalide ;
- fichier de sortie impossible à écrire ;
- schéma de données invalide.

## Erreurs non bloquantes

- Page Object impossible à analyser ;
- exploration d’un écran inaccessible ;
- test ambigu ;
- absence de correspondance ;
- réponse IA invalide après validation.

Les erreurs non bloquantes doivent apparaître dans le résultat, sans être transformées en associations supposées.

---

# Exécution

Une commande dédiée sera ajoutée ultérieurement au projet :

```bash
npm run ai:map-features
```

Cette commande exécutera uniquement l’AI Feature Mapper.

Elle ne lancera pas :

- la suite complète des tests ;
- le Coverage Analyzer ;
- la génération de recommandations ;
- le Dashboard.

---

# Découpage d’implémentation

L’architecture sera implémentée progressivement.

## Version 1 — Référentiel

- configuration ;
- lecture de `functional-map.md` ;
- parsing des fonctionnalités ;
- validation ;
- génération d’un premier JSON.

## Version 2 — Analyse statique

- analyse des Page Objects ;
- analyse des tests ;
- création des références de code.

## Version 3 — Exploration Playwright

- intégration de l’outil d’exploration ;
- collecte des pages, actions et transitions ;
- production d’observations structurées.

## Version 4 — Rapprochement

- règles déterministes ;
- raisonnement IA pour les cas ambigus ;
- scores de confiance ;
- preuves et justifications.

## Version 5 — Stabilisation

- validation complète ;
- tests unitaires de l’agent ;
- gestion des erreurs ;
- documentation d’utilisation.

---

# Critères de fin de l’étape 3

L’étape AI Feature Mapper sera considérée comme terminée lorsque :

- toutes les fonctionnalités du référentiel sont présentes dans la sortie ;
- le dépôt Playwright est analysé sans modification ;
- l’application peut être explorée via Playwright ;
- les associations sont structurées et justifiées ;
- les cas ambigus restent explicitement identifiés ;
- le fichier `feature-map.json` respecte un schéma stable ;
- aucun taux de couverture n’est calculé ;
- aucun test n’est généré ou modifié.
