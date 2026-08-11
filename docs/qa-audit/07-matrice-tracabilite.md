# Matrice de traçabilité

| User story | Critères | Scénario(s) Gherkin        | Cas positifs   | Cas négatifs/erreurs/limites        | Auto  |
| ---------- | -------- | -------------------------- | -------------- | ----------------------------------- | ----- |
| US-001     | 01–04    | Authentification (4)       | TC-001         | TC-002–005                          | P0    |
| US-002     | 01–02    | Catalogue complet          | TC-006         | TC-007                              | P0/P1 |
| US-003     | 01–03    | Trier produits             | TC-008–011     | TC-012                              | P1    |
| US-004     | 01–03    | Ouvrir/quitter fiche       | TC-013–015     | TC-007 transversal                  | P1    |
| US-005     | 01–03    | Ajouter 1/N/fiche          | TC-016,017,019 | TC-018                              | P0/P1 |
| US-006     | 01–02    | Retirer dernier            | TC-020         | TC-021 limite                       | P0    |
| US-007     | 01–03    | Panier/continuer/vide      | TC-022,023     | TC-024 limite                       | P0/P1 |
| US-008     | 01–04    | Coordonnées + plan négatif | TC-025,029     | TC-026–031                          | P0–P2 |
| US-009     | 01–03    | Récapitulatif              | TC-032,033,035 | TC-034 limite                       | P0/P1 |
| US-010     | 01–02    | Finaliser/retour           | TC-036,037     | TC-038 erreur                       | P0/P1 |
| US-011     | 01–02    | Deux annulations           | TC-039,040     | — non pertinent                     | P1    |
| US-012     | 01–03    | Logout/route/refresh       | TC-041,043     | TC-042,047 sécurité                 | P0/P1 |
| US-013     | 01–02    | Reset                      | TC-044         | État corrompu couvert par assertion | P1    |
| US-014     | 01–02    | Menu                       | TC-045,046     | — faible valeur                     | P2    |

## Couverture

- 14 user stories et 38 critères d'acceptation couverts.
- Chaque critère possède au moins un scénario Gherkin et un cas de test.
- Les cas négatifs non pertinents (par exemple « annulation invalide ») ne sont pas fabriqués artificiellement; les contrôles d'état et erreurs transverses assurent la robustesse.
- Les règles non spécifiées (espaces, longueurs, fiscalité générale, panier vide vers checkout) sont identifiées comme questions PO et non utilisées comme verdict contractuel.

## Synthèse des risques

1. Session ou routes privées accessibles après logout.
2. État panier incohérent entre catalogue, fiche et checkout.
3. Commande acceptée avec données obligatoires manquantes.
4. Total/taxe incohérents, notamment sur plusieurs articles et arrondis.
5. Profils dégradés masquant des régressions ou créant des faux échecs.
