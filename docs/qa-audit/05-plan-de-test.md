# Plan de test détaillé

## Organisation des campagnes

| Campagne | Objectif | Sélection | Fréquence | Responsable | Sortie |
|---|---|---|---|---|---|
| Smoke | Aptitude du build | P0 nominaux | Chaque build | CI QA | 100 % passant |
| Régression | Couverture métier | P0 + P1 | Quotidien/release | QA | Seuils stratégie |
| Négative | Rejets et erreurs | Tags negative/error | Quotidien | CI QA | Messages et état corrects |
| Cross-browser | Compatibilité | P0 + tris/fiches | Avant release | QA | Aucun majeur |
| Exploratoire | Découverte | Profils spéciaux, historique, données atypiques | Sprint | QA | Charters et anomalies |
| Accessibilité | WCAG/usage clavier | Pages clés | Avant release | QA/A11y | Aucun blocage clavier |

## Lots d'exécution

1. Authentification : champs requis, valide, invalide, verrouillé, accès direct.
2. Catalogue : présence et cohérence des six articles, quatre tris, fiche/retour.
3. Panier : 0/1/N articles, ajout depuis deux surfaces, retrait, navigation, reset.
4. Checkout : validations, annulation, récapitulatif, calcul multi-article, finish.
5. Session/navigation : refresh, back/forward, logout, URL privées.
6. Non fonctionnel : responsive, zoom, clavier, lecteur d'écran, temps perçu.

## Préparation

- Vérifier la disponibilité de la page de login et la liste des comptes affichée.
- Réinitialiser l'état; utiliser un contexte navigateur vierge par test P0.
- Enregistrer le jeu de produits attendu sans coder en dur les éléments non contractuels dans tous les tests.
- Étiqueter build, navigateur, viewport et profil dans le rapport.

## Jeux de données

| Jeu | Prénom | Nom | Code postal | But |
|---|---|---|---|---|
| D-01 | Ada | Lovelace | 75001 | Nominal |
| D-02 | vide | Lovelace | 75001 | Prénom requis |
| D-03 | Ada | vide | 75001 | Nom requis |
| D-04 | Ada | Lovelace | vide | Code requis |
| D-05 | espaces | espaces | espaces | Limite à clarifier |
| D-06 | Élodie | O'Connor-Smith | 75001 | Unicode/spéciaux |
| D-07 | 256 caractères | 256 caractères | 256 caractères | Robustesse |

## Tests non fonctionnels

- Accessibilité : ordre de tabulation, noms accessibles, focus visible, contraste, zoom 200 %, messages d'erreur annoncés, alternatives des images.
- Responsive : absence de recouvrement/coupure, menu et checkout utilisables aux trois viewports.
- Performance : définir avec le PO; proposition p95 navigation catalogue <2 s hors profil `performance_glitch_user` et absence de blocage >100 ms.
- Sécurité fonctionnelle : routes privées après logout, absence de secrets personnels, aucune donnée client dans l'URL, session non réutilisable après déconnexion.
- Compatibilité : parité fonctionnelle des P0 sur Chrome, Firefox et WebKit.

## Rapport et décision

Publier résultats par priorité, couverture US/AC, anomalies par sévérité, flakiness, durée, environnement. Bloquer la release si P0 échoue, si une route privée est accessible après logout, si le total est incohérent ou si une commande invalide peut être finalisée.

