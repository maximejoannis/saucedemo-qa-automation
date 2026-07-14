# Matrice de traçabilité

Cette matrice relie chacun des 50 cas du catalogue fonctionnel à son mode de couverture actuel.

## Légende

- **Automatisé** : le cas est couvert par la suite Playwright.
- **Manuel** : le cas reste dans le référentiel et doit être exécuté manuellement.
- **Non retenu** : le cas ne fait pas partie du périmètre de validation actuel.

## Synthèse

| Statut | Nombre | Pourcentage |
|---|---:|---:|
| Automatisé | 42 | 84 % |
| Manuel | 8 | 16 % |
| Non retenu | 0 | 0 % |
| **Total** | **50** | **100 %** |

> Les 42 cas automatisés sont couverts par 36 fonctions de test. Certains tests regroupent plusieurs contrôles cohérents d’un même parcours, ce qui explique la différence entre le nombre de cas couverts et le nombre de tests Playwright.

## Détail par cas de test

| ID | User story / critère | Cas de test | Priorité | Statut | Référence automatisée / mode d’exécution |
|---|---|---|---|---|---|
| TC-US01-AC01-01 | US01-AC01 | Connexion standard valide | Haute | **Automatisé** | [`tests/us01-authentication/ac01-login.spec.js`](../tests/us01-authentication/ac01-login.spec.js) — `TC-US01-AC01-01 connexion standard valide @smoke` |
| TC-US01-AC01-02 | US01-AC01 | Connexion problem_user | Haute | **Automatisé** | [`tests/us01-authentication/ac01-login.spec.js`](../tests/us01-authentication/ac01-login.spec.js) — `TC-US01-AC01-02 connexion problem_user autorisée` |
| TC-US01-AC01-03 | US01-AC01 | Connexion performance_glitch_user | Moyenne | **Automatisé** | [`tests/us01-authentication/ac01-login.spec.js`](../tests/us01-authentication/ac01-login.spec.js) — `TC-US01-AC01-03 connexion performance_glitch_user autorisée` |
| TC-US01-AC01-04 | US01-AC01 | Soumission par clic | Moyenne | **Automatisé** | [`tests/us01-authentication/ac01-login.spec.js`](../tests/us01-authentication/ac01-login.spec.js) — `TC-US01-AC01-01 connexion standard valide @smoke — soumission par clic via LoginPage.login` |
| TC-US01-AC01-05 | US01-AC01 | Nouvelle session après déconnexion | Haute | **Automatisé** | [`tests/us01-authentication/ac01-login.spec.js`](../tests/us01-authentication/ac01-login.spec.js) — `TC-US01-AC01-05 déconnexion puis nouvelle connexion` |
| TC-US01-AC02-01 | US01-AC02 | Mot de passe invalide | Haute | **Automatisé** | [`tests/us01-authentication/ac01-login.spec.js`](../tests/us01-authentication/ac01-login.spec.js) — `TC-US01-AC02-01 mot de passe invalide` |
| TC-US01-AC02-02 | US01-AC02 | Utilisateur bloqué | Haute | **Automatisé** | [`tests/us01-authentication/ac01-login.spec.js`](../tests/us01-authentication/ac01-login.spec.js) — `TC-US01-AC02-02 utilisateur bloqué` |
| TC-US01-AC02-03 | US01-AC02 | Username vide | Moyenne | **Automatisé** | [`tests/us01-authentication/ac01-login.spec.js`](../tests/us01-authentication/ac01-login.spec.js) — `TC-US01-AC02-03 username obligatoire` |
| TC-US01-AC02-04 | US01-AC02 | Password vide | Moyenne | **Automatisé** | [`tests/us01-authentication/ac01-login.spec.js`](../tests/us01-authentication/ac01-login.spec.js) — `TC-US01-AC02-04 password obligatoire` |
| TC-US01-AC02-05 | US01-AC02 | Deux champs vides | Haute | **Automatisé** | [`tests/us01-authentication/ac01-login.spec.js`](../tests/us01-authentication/ac01-login.spec.js) — `TC-US01-AC02-05 deux champs vides` |
| TC-US02-AC01-01 | US02-AC01 | Nombre de produits | Haute | **Automatisé** | [`tests/us02-catalogue/ac01-catalogue.spec.js`](../tests/us02-catalogue/ac01-catalogue.spec.js) — `TC-US02-AC01-01 six produits affichés` |
| TC-US02-AC01-02 | US02-AC01 | Données produit | Haute | **Automatisé** | [`tests/us02-catalogue/ac01-catalogue.spec.js`](../tests/us02-catalogue/ac01-catalogue.spec.js) — `TC-US02-AC01-02 données obligatoires présentes pour chaque produit` |
| TC-US02-AC01-03 | US02-AC01 | Lien détail | Moyenne | **Automatisé** | [`tests/us02-catalogue/ac01-catalogue.spec.js`](../tests/us02-catalogue/ac01-catalogue.spec.js) — `TC-US02-AC01-03 lien détail puis TC-US02-AC01-04 retour catalogue` |
| TC-US02-AC01-04 | US02-AC01 | Retour catalogue | Moyenne | **Automatisé** | [`tests/us02-catalogue/ac01-catalogue.spec.js`](../tests/us02-catalogue/ac01-catalogue.spec.js) — `TC-US02-AC01-03 lien détail puis TC-US02-AC01-04 retour catalogue` |
| TC-US02-AC01-05 | US02-AC01 | Boutons panier | Haute | **Automatisé** | [`tests/us02-catalogue/ac01-catalogue.spec.js`](../tests/us02-catalogue/ac01-catalogue.spec.js) — `TC-US02-AC01-05 un bouton Add to cart par produit` |
| TC-US02-AC02-01 | US02-AC02 | Tri A-Z | Haute | **Automatisé** | [`tests/us02-catalogue/ac01-catalogue.spec.js`](../tests/us02-catalogue/ac01-catalogue.spec.js) — `TC-US02-AC02-01 tri A-Z` |
| TC-US02-AC02-02 | US02-AC02 | Tri Z-A | Haute | **Automatisé** | [`tests/us02-catalogue/ac01-catalogue.spec.js`](../tests/us02-catalogue/ac01-catalogue.spec.js) — `TC-US02-AC02-02 tri Z-A` |
| TC-US02-AC02-03 | US02-AC02 | Prix croissant | Moyenne | **Automatisé** | [`tests/us02-catalogue/ac01-catalogue.spec.js`](../tests/us02-catalogue/ac01-catalogue.spec.js) — `TC-US02-AC02-03 tri prix croissant` |
| TC-US02-AC02-04 | US02-AC02 | Prix décroissant | Moyenne | **Automatisé** | [`tests/us02-catalogue/ac01-catalogue.spec.js`](../tests/us02-catalogue/ac01-catalogue.spec.js) — `TC-US02-AC02-04 tri prix décroissant` |
| TC-US02-AC02-05 | US02-AC02 | Changement successif | Haute | **Automatisé** | [`tests/us02-catalogue/ac01-catalogue.spec.js`](../tests/us02-catalogue/ac01-catalogue.spec.js) — `TC-US02-AC02-05 changement successif de tri` |
| TC-US03-AC01-01 | US03-AC01 | Ajout d’un produit | Haute | **Automatisé** | [`tests/us03-panier/ac01-panier.spec.js`](../tests/us03-panier/ac01-panier.spec.js) — `TC-US03-AC01-01 ajout un produit` |
| TC-US03-AC01-02 | US03-AC01 | Ajout de trois produits | Haute | **Automatisé** | [`tests/us03-panier/ac01-panier.spec.js`](../tests/us03-panier/ac01-panier.spec.js) — `TC-US03-AC01-02 ajout trois produits` |
| TC-US03-AC01-03 | US03-AC01 | Retrait catalogue | Moyenne | **Automatisé** | [`tests/us03-panier/ac01-panier.spec.js`](../tests/us03-panier/ac01-panier.spec.js) — `TC-US03-AC01-03 retrait depuis catalogue` |
| TC-US03-AC01-04 | US03-AC01 | Retrait panier | Moyenne | **Automatisé** | [`tests/us03-panier/ac01-panier.spec.js`](../tests/us03-panier/ac01-panier.spec.js) — `TC-US03-AC01-04 retrait depuis panier` |
| TC-US03-AC01-05 | US03-AC01 | Retrait partiel | Haute | **Automatisé** | [`tests/us03-panier/ac01-panier.spec.js`](../tests/us03-panier/ac01-panier.spec.js) — `TC-US03-AC01-05 retrait partiel conserve deux produits` |
| TC-US03-AC02-01 | US03-AC02 | Panier vide | Haute | **Automatisé** | [`tests/us03-panier/ac01-panier.spec.js`](../tests/us03-panier/ac01-panier.spec.js) — `TC-US03-AC02-01 panier vide` |
| TC-US03-AC02-02 | US03-AC02 | Contenu exact | Haute | **Automatisé** | [`tests/us03-panier/ac01-panier.spec.js`](../tests/us03-panier/ac01-panier.spec.js) — `TC-US03-AC02-02 contenu exact de deux produits` |
| TC-US03-AC02-03 | US03-AC02 | Persistance navigation | Moyenne | **Manuel** | À exécuter manuellement selon les données et le résultat attendu du catalogue. |
| TC-US03-AC02-04 | US03-AC02 | Continuer achats | Moyenne | **Automatisé** | [`tests/us03-panier/ac01-panier.spec.js`](../tests/us03-panier/ac01-panier.spec.js) — `TC-US03-AC02-04 continuer les achats revient au catalogue` |
| TC-US03-AC02-05 | US03-AC02 | Accès checkout | Haute | **Automatisé** | [`tests/us03-panier/ac01-panier.spec.js`](../tests/us03-panier/ac01-panier.spec.js) — `TC-US03-AC02-05 accès au checkout depuis un panier non vide` |
| TC-US04-AC01-01 | US04-AC01 | Prénom manquant | Haute | **Automatisé** | [`tests/us04-checkout/ac01-informations.spec.js`](../tests/us04-checkout/ac01-informations.spec.js) — `TC-US04-AC01-01 prénom requis` |
| TC-US04-AC01-02 | US04-AC01 | Nom manquant | Haute | **Automatisé** | [`tests/us04-checkout/ac01-informations.spec.js`](../tests/us04-checkout/ac01-informations.spec.js) — `TC-US04-AC01-02 nom requis` |
| TC-US04-AC01-03 | US04-AC01 | Code postal manquant | Moyenne | **Automatisé** | [`tests/us04-checkout/ac01-informations.spec.js`](../tests/us04-checkout/ac01-informations.spec.js) — `TC-US04-AC01-03 code postal requis` |
| TC-US04-AC01-04 | US04-AC01 | Tous champs vides | Moyenne | **Automatisé** | [`tests/us04-checkout/ac01-informations.spec.js`](../tests/us04-checkout/ac01-informations.spec.js) — `TC-US04-AC01-04 tous les champs vides` |
| TC-US04-AC01-05 | US04-AC01 | Correction après erreur | Haute | **Automatisé** | [`tests/us04-checkout/ac01-informations.spec.js`](../tests/us04-checkout/ac01-informations.spec.js) — `TC-US04-AC01-05 correction après erreur autorise la navigation` |
| TC-US04-AC02-01 | US04-AC02 | Données nominales | Haute | **Automatisé** | [`tests/us04-checkout/ac01-informations.spec.js`](../tests/us04-checkout/ac01-informations.spec.js) — `TC-US04-AC02-01 données nominales valides` |
| TC-US04-AC02-02 | US04-AC02 | Valeurs avec tiret | Haute | **Manuel** | À exécuter manuellement selon les données et le résultat attendu du catalogue. |
| TC-US04-AC02-03 | US04-AC02 | Code postal alphanumérique | Moyenne | **Manuel** | À exécuter manuellement selon les données et le résultat attendu du catalogue. |
| TC-US04-AC02-04 | US04-AC02 | Valeurs longues | Moyenne | **Manuel** | À exécuter manuellement selon les données et le résultat attendu du catalogue. |
| TC-US04-AC02-05 | US04-AC02 | Retour annulation | Haute | **Manuel** | À exécuter manuellement selon les données et le résultat attendu du catalogue. |
| TC-US05-AC01-01 | US05-AC01 | Récapitulatif 1 produit | Haute | **Automatisé** | [`tests/us05-e2e/ac01-commande.spec.js`](../tests/us05-e2e/ac01-commande.spec.js) — `TC-US05-AC01-01/03/04 récapitulatif et montants cohérents` |
| TC-US05-AC01-02 | US05-AC01 | Récapitulatif 3 produits | Haute | **Manuel** | À exécuter manuellement selon les données et le résultat attendu du catalogue. |
| TC-US05-AC01-03 | US05-AC01 | Taxe visible | Moyenne | **Automatisé** | [`tests/us05-e2e/ac01-commande.spec.js`](../tests/us05-e2e/ac01-commande.spec.js) — `TC-US05-AC01-01/03/04 récapitulatif et montants cohérents` |
| TC-US05-AC01-04 | US05-AC01 | Total cohérent | Moyenne | **Automatisé** | [`tests/us05-e2e/ac01-commande.spec.js`](../tests/us05-e2e/ac01-commande.spec.js) — `TC-US05-AC01-01/03/04 récapitulatif et montants cohérents` |
| TC-US05-AC01-05 | US05-AC01 | Annuler récapitulatif | Haute | **Manuel** | À exécuter manuellement selon les données et le résultat attendu du catalogue. |
| TC-US05-AC02-01 | US05-AC02 | Finaliser 1 produit | Haute | **Automatisé** | [`tests/us05-e2e/ac01-commande.spec.js`](../tests/us05-e2e/ac01-commande.spec.js) — `TC-US05-AC02-01 achat d’un produit @smoke @critical` |
| TC-US05-AC02-02 | US05-AC02 | Finaliser plusieurs produits | Haute | **Manuel** | À exécuter manuellement selon les données et le résultat attendu du catalogue. |
| TC-US05-AC02-03 | US05-AC02 | Texte expédition | Moyenne | **Automatisé** | [`tests/us05-e2e/ac01-commande.spec.js`](../tests/us05-e2e/ac01-commande.spec.js) — `TC-US05-AC02-03/04/05 confirmation, retour et panier réinitialisé` |
| TC-US05-AC02-04 | US05-AC02 | Retour produits | Moyenne | **Automatisé** | [`tests/us05-e2e/ac01-commande.spec.js`](../tests/us05-e2e/ac01-commande.spec.js) — `TC-US05-AC02-03/04/05 confirmation, retour et panier réinitialisé` |
| TC-US05-AC02-05 | US05-AC02 | Panier après commande | Haute | **Automatisé** | [`tests/us05-e2e/ac01-commande.spec.js`](../tests/us05-e2e/ac01-commande.spec.js) — `TC-US05-AC02-03/04/05 confirmation, retour et panier réinitialisé` |

## Backlog manuel

Les huit cas suivants restent à exécuter manuellement tant qu’ils ne sont pas ajoutés à la suite Playwright :

- `TC-US03-AC02-03` — Persistance navigation : Produit conservé.
- `TC-US04-AC02-02` — Valeurs avec tiret : Accès autorisé.
- `TC-US04-AC02-03` — Code postal alphanumérique : Comportement accepté par l’application.
- `TC-US04-AC02-04` — Valeurs longues : Aucune erreur technique.
- `TC-US04-AC02-05` — Retour annulation : Retour au panier.
- `TC-US05-AC01-02` — Récapitulatif 3 produits : Trois lignes et sous-total $55.97.
- `TC-US05-AC01-05` — Annuler récapitulatif : Retour catalogue.
- `TC-US05-AC02-02` — Finaliser plusieurs produits : Confirmation affichée.

Aucun cas du catalogue n’est actuellement classé **Non retenu**.
