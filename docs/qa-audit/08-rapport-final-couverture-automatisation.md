# Rapport final de couverture des tests automatisés

**Projet :** SauceDemo QA Automation  
**Date d'analyse :** 11 août 2026  
**Périmètre :** couverture des cas de test de référence par les tests Playwright présents dans `saucedemo-qa-automation-main(2).zip`

## Référentiel et méthode

Les documents `02-user-stories-criteres-acceptation.md`, `06-cas-de-test.md` et `07-matrice-tracabilite.md` constituent le référentiel fonctionnel. Les cas `TC-nnn` sont l'unité de mesure.

Un cas est déclaré automatisé uniquement lorsqu'au moins un test Playwright reproduit ses préconditions essentielles, exécute l'action et vérifie substantiellement le résultat attendu au moyen d'assertions. Une correspondance seulement partielle est classée comme non couverte. Les statuts d'exécution `passed`, `failed`, `skipped` ou `flaky` ne participent pas au calcul : ce rapport mesure la présence d'une couverture automatisée, pas le taux de réussite.

Les dossiers techniques `us01` à `us05` de l'archive ne sont pas assimilés directement aux quatorze user stories du référentiel. La correspondance repose sur le comportement et les assertions du code.

## 1. Taux global de couverture automatisée

| Cas inclus | Cas automatisés | Cas non automatisés |       Taux |
| ---------: | --------------: | ------------------: | ---------: |
|         44 |              22 |                  22 | **50,0 %** |

```text
22 ÷ 44 × 100 = 50,0 %
```

## 2. Taux de couverture automatisée par user story

| User story                               | TC inclus | TC automatisés  | TC non automatisés     |        Taux | Preuves principales                                                                                                             |
| ---------------------------------------- | --------: | --------------- | ---------------------- | ----------: | ------------------------------------------------------------------------------------------------------------------------------- |
| US-001 — Se connecter                    |         5 | TC-001 à TC-005 | —                      | **100,0 %** | `ac01-login.spec.js` : connexion standard, champs requis, identifiants invalides et utilisateur verrouillé                      |
| US-002 — Consulter le catalogue          |         2 | —               | TC-006, TC-007         |   **0,0 %** | Catalogue partiellement contrôlé, mais image non vérifiée et aucune comparaison complète des profils `problem`/`visual`         |
| US-003 — Trier le catalogue              |         5 | TC-008 à TC-011 | TC-012                 |  **80,0 %** | `ac01-catalogue.spec.js` : quatre ordres vérifiés ; pas de contrôle explicite du même ensemble complet après chaque tri         |
| US-004 — Consulter un produit            |         3 | TC-015          | TC-013, TC-014         |  **33,3 %** | Retour catalogue vérifié ; description absente des assertions et aucune ouverture par l'image du Bike Light                     |
| US-005 — Ajouter au panier               |         4 | TC-016          | TC-017 à TC-019        |  **25,0 %** | Ajout simple vérifié ; lignes des trois produits, double ajout et ajout depuis une fiche non couverts complètement              |
| US-006 — Retirer du panier               |         2 | TC-020, TC-021  | —                      | **100,0 %** | Retrait partiel et retrait du dernier article vérifiés dans `ac01-panier.spec.js`                                               |
| US-007 — Consulter le panier             |         3 | TC-023          | TC-022, TC-024         |  **33,3 %** | Navigation et conservation du badge couvertes ; description/prix et absence du badge sur panier vide non vérifiés               |
| US-008 — Fournir les informations client |         4 | TC-025 à TC-028 | —                      | **100,0 %** | `ac01-informations.spec.js` : données nominales et trois validations obligatoires                                               |
| US-009 — Contrôler le récapitulatif      |         4 | TC-034          | TC-032, TC-033, TC-035 |  **25,0 %** | Calcul multi-articles couvert ; quantités/prix complets, taxe exacte et informations paiement/livraison insuffisamment vérifiés |
| US-010 — Finaliser la commande           |         3 | TC-036, TC-037  | TC-038                 |  **66,7 %** | Confirmation, retour et panier vide couverts ; aucun scénario avec `error_user`                                                 |
| US-011 — Annuler ou revenir              |         2 | —               | TC-039, TC-040         |   **0,0 %** | URLs de retour vérifiées, mais conservation du produit et absence de confirmation non explicitement contrôlées                  |
| US-012 — Gérer la session                |         4 | TC-041          | TC-042, TC-043, TC-047 |  **25,0 %** | Logout couvert ; routes privées, actualisation avec panier et retour navigateur après logout non couverts                       |
| US-013 — Réinitialiser l'application     |         1 | —               | TC-044                 |   **0,0 %** | Aucun test de `Reset App State`                                                                                                 |
| US-014 — Utiliser le menu                |         2 | —               | TC-045, TC-046         |   **0,0 %** | Aucun contrôle du contenu, de la fermeture ou de la navigation du menu                                                          |

## 3. Taux de couverture automatisée par priorité

La priorité utilisée est celle attribuée à chaque cas de test dans `06-cas-de-test.md`. Le périmètre et les exclusions restent identiques au calcul global.

| Priorité            | Cas inclus | Cas automatisés | Cas non automatisés |       Taux |
| ------------------- | ---------: | --------------: | ------------------: | ---------: |
| P0 — Critique       |         23 |              16 |                   7 | **69,6 %** |
| P1 — Important      |         19 |               6 |                  13 | **31,6 %** |
| P2 — Complémentaire |          2 |               0 |                   2 |  **0,0 %** |
| **Total**           |     **44** |          **22** |              **22** | **50,0 %** |

```text
P0 : 16 ÷ 23 × 100 = 69,6 %
P1 :  6 ÷ 19 × 100 = 31,6 %
P2 :  0 ÷  2 × 100 =  0,0 %
```

Le contrôle de cohérence est satisfait : `23 + 19 + 2 = 44` cas inclus et `16 + 6 + 0 = 22` cas automatisés.

## Exclusions du dénominateur

- `TC-029`, `TC-030` et `TC-031` : résultats attendus encore soumis à une décision personnelle et non suffisamment déterministes.
- `TC-048`, `TC-049` et `TC-050` : cas transverses sans rattachement à une user story.
- `TC-048` et `TC-049` sont en outre manuels ou seulement partiellement automatisables.

## Règle appliquée aux couvertures partielles

Les cas dont le test automatise le parcours mais n'asserte qu'une partie du résultat attendu sont comptés comme non automatisés. Cela concerne notamment la présence des images du catalogue, la cohérence complète d'une fiche produit, les détails et prix du panier, la taxe exacte, les informations de paiement/livraison et l'état conservé après certaines navigations.
