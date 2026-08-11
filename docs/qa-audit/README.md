> **Contexte documentaire**
>
> Cette documentation a été élaborée a posteriori, après la réalisation initiale
> du projet d’automatisation. Elle constitue un référentiel d’audit et de
> consolidation QA.
>
> Elle ne représente pas les spécifications historiques ayant piloté le
> développement initial des tests. Elle sert à évaluer la couverture existante,
> identifier les écarts et guider les évolutions futures.

# Référentiel QA — SauceDemo

Analyse réalisée le 11 août 2026 sur [SauceDemo](https://www.saucedemo.com/) à partir d'une exploration de l'interface publique.

## Objectif et périmètre

Ce référentiel couvre l'authentification, le catalogue, les fiches produit, les tris, le panier, le checkout, le menu, la réinitialisation et la déconnexion. Les liens sociaux et le site institutionnel Sauce Labs sont hors périmètre fonctionnel. Aucun test intrusif, de charge ou d'exploitation de vulnérabilité n'a été mené.

## Conventions

- `US-nnn` : user story.
- `AC-USnnn-nn` : critère d'acceptation.
- `SC-nnn` : scénario Gherkin.
- `TC-nnn` : cas de test.
- P0 : critique, à chaque build/déploiement ; P1 : régression régulière ; P2 : complémentaire/exploratoire.
- Un test négatif est réussi quand l'application refuse correctement l'action.

## Comptes observés

`standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user` et `visual_user`; mot de passe de démonstration commun affiché par le site : `secret_sauce`.

Les profils dégradés servent à éprouver la robustesse. Leurs anomalies intentionnelles ne constituent pas les exigences de référence.

## Documents

1. [Cartographie fonctionnelle](01-cartographie-fonctionnelle.md)
2. [User stories et critères](02-user-stories-criteres-acceptation.md)
3. [Scénarios Gherkin](03-scenarios-gherkin.md)
4. [Stratégie de test](04-strategie-de-test.md)
5. [Plan de test](05-plan-de-test.md)
6. [Cas de test](06-cas-de-test.md)
7. [Matrice de traçabilité](07-matrice-tracabilite.md)

## Hypothèses et limites

- L'application est un démonstrateur : paiement, stock, expédition et commande ne sont pas reliés à des systèmes réels.
- Les règles de longueur, format ou caractères autorisés des champs client ne sont pas affichées ; seuls les champs obligatoires sont confirmés.
- L'arrondi fiscal, la persistance inter-session, la durée de session et les contrats API nécessitent une spécification produit.
- Les contrôles responsive, multi-navigateurs, performance et accessibilité sont proposés mais n'ont pas été exhaustivement exécutés.

