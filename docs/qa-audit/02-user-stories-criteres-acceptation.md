# User stories et critères d'acceptation

## US-001 — Se connecter (haute)

En tant que visiteur, je veux m'authentifier afin d'accéder au catalogue.

- `AC-US001-01` Un compte actif avec les identifiants valides ouvre le catalogue.
- `AC-US001-02` Un identifiant ou mot de passe absent produit un message ciblé et aucun accès.
- `AC-US001-03` Des identifiants incorrects sont refusés avec un message explicite.
- `AC-US001-04` Un compte verrouillé est refusé avec le message dédié.

## US-002 — Consulter le catalogue (haute)

En tant que client authentifié, je veux voir les produits afin de choisir un article.

- `AC-US002-01` Chaque produit expose nom, image, description, prix et action panier.
- `AC-US002-02` Le catalogue de référence contient six produits sans doublon.

## US-003 — Trier le catalogue (moyenne)

En tant que client, je veux trier les produits afin de les comparer.

- `AC-US003-01` Le tri A-Z et Z-A respecte l'ordre lexical des noms.
- `AC-US003-02` Le tri prix croissant et décroissant respecte la valeur numérique.
- `AC-US003-03` Le tri ne modifie ni le nombre ni les données des produits.

## US-004 — Consulter un produit (haute)

En tant que client, je veux ouvrir une fiche produit afin d'en voir les détails.

- `AC-US004-01` Le nom ou l'image ouvre la fiche correspondante.
- `AC-US004-02` Nom, image, description et prix restent cohérents avec le catalogue.
- `AC-US004-03` Le retour ramène au catalogue.

## US-005 — Ajouter au panier (haute)

En tant que client, je veux ajouter un article afin de préparer une commande.

- `AC-US005-01` Add to cart ajoute une seule unité, devient Remove et incrémente le badge.
- `AC-US005-02` Plusieurs produits distincts peuvent être ajoutés et le badge reflète la quantité totale.
- `AC-US005-03` L'ajout depuis une fiche est reflété dans le catalogue et le panier.

## US-006 — Retirer du panier (haute)

En tant que client, je veux retirer un article afin de corriger ma sélection.

- `AC-US006-01` Remove retire l'article et décrémente le badge.
- `AC-US006-02` Retirer le dernier article masque le badge et produit un panier vide.

## US-007 — Consulter le panier (haute)

En tant que client, je veux contrôler ma sélection avant le checkout.

- `AC-US007-01` Le panier présente quantité, nom, description et prix exacts.
- `AC-US007-02` Continue Shopping revient au catalogue sans perdre le panier.
- `AC-US007-03` Un panier vide est affiché sans ligne produit et sans badge.

## US-008 — Fournir les informations client (haute)

En tant qu'acheteur, je veux saisir mes coordonnées afin de continuer la commande.

- `AC-US008-01` Prénom, nom et code postal non vides permettent de continuer.
- `AC-US008-02` L'absence du prénom affiche `Error: First Name is required`.
- `AC-US008-03` L'absence du nom affiche `Error: Last Name is required`.
- `AC-US008-04` L'absence du code postal affiche `Error: Postal Code is required`.

## US-009 — Contrôler le récapitulatif (haute)

En tant qu'acheteur, je veux vérifier la commande et les montants avant confirmation.

- `AC-US009-01` Tous les articles, quantités et prix du panier sont repris.
- `AC-US009-02` Sous-total, taxe et total sont affichés; total = sous-total + taxe.
- `AC-US009-03` Les informations de paiement et livraison simulées sont affichées.

## US-010 — Finaliser la commande (haute)

En tant qu'acheteur, je veux confirmer afin de terminer le parcours.

- `AC-US010-01` Finish mène à une confirmation explicite.
- `AC-US010-02` Back Home retourne au catalogue avec un panier vide.

## US-011 — Annuler ou revenir (moyenne)

En tant qu'acheteur, je veux annuler une étape afin de modifier ma décision.

- `AC-US011-01` Cancel depuis les informations revient au panier sans perte.
- `AC-US011-02` Cancel depuis le récapitulatif revient au catalogue sans finaliser.

## US-012 — Gérer la session (haute)

En tant que client, je veux me déconnecter afin de protéger ma session.

- `AC-US012-01` Logout revient à l'écran de connexion.
- `AC-US012-02` Après déconnexion, une URL privée ne doit pas redonner accès sans authentification.
- `AC-US012-03` Une actualisation authentifiée conserve un état cohérent.

## US-013 — Réinitialiser l'application (moyenne)

En tant que testeur/client, je veux réinitialiser l'état afin de repartir proprement.

- `AC-US013-01` Reset App State vide le panier et restaure les actions Add to cart.
- `AC-US013-02` La réinitialisation ne déconnecte pas l'utilisateur.

## US-014 — Utiliser le menu (basse)

En tant que client, je veux naviguer via le menu afin d'accéder aux actions globales.

- `AC-US014-01` Open Menu expose All Items, About, Logout et Reset App State.
- `AC-US014-02` All Items revient au catalogue et Close Menu masque le panneau.

## Questions Product Owner

- Le checkout d'un panier vide doit-il être interdit ?
- Quels formats et longueurs sont admis pour les coordonnées ? Les espaces seuls sont-ils valides ?
- Quel taux et quelle règle d'arrondi fiscal sont attendus ?
- Quelle durée de session et quelle persistance après fermeture sont voulues ?
- Les anomalies des profils dégradés doivent-elles toutes être détectées ou seulement servir de démonstration ?
