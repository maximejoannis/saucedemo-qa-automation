# Scénarios Gherkin

```gherkin
Fonctionnalité: Authentification
  @US-001 @AC-US001-01 @P0 @smoke
  Scénario: Connexion d'un compte actif
    Étant donné que je suis sur la page de connexion
    Quand je saisis "standard_user" et "secret_sauce"
    Alors le catalogue "Products" est affiché

  @US-001 @AC-US001-02 @P0 @negative
  Plan du scénario: Champ obligatoire absent
    Étant donné que je suis sur la page de connexion
    Quand je saisis "<utilisateur>" et "<mot_de_passe>"
    Et je demande la connexion
    Alors l'accès est refusé avec "<message>"
    Exemples:
      | utilisateur  | mot_de_passe | message                            |
      |              | secret_sauce | Username is required               |
      | standard_user|               | Password is required               |

  @US-001 @AC-US001-03 @P0 @negative
  Scénario: Identifiants incorrects
    Quand je me connecte avec "bad_user" et "bad_password"
    Alors le message contient "Username and password do not match"

  @US-001 @AC-US001-04 @P0 @negative
  Scénario: Compte verrouillé
    Quand je me connecte avec "locked_out_user" et "secret_sauce"
    Alors le message contient "this user has been locked out"

Fonctionnalité: Catalogue et fiche produit
  Contexte:
    Étant donné que je suis connecté comme "standard_user"

  @US-002 @AC-US002-01 @AC-US002-02 @P0
  Scénario: Afficher le catalogue complet
    Alors six produits distincts sont affichés
    Et chacun possède un nom, une image, une description, un prix et une action panier

  @US-003 @AC-US003-01 @AC-US003-02 @AC-US003-03 @P1
  Plan du scénario: Trier les produits
    Quand je sélectionne le tri "<tri>"
    Alors les produits sont ordonnés selon "<ordre>"
    Et les six mêmes produits sont présents
    Exemples:
      | tri                  | ordre            |
      | Name (A to Z)        | nom croissant    |
      | Name (Z to A)        | nom décroissant  |
      | Price (low to high)  | prix croissant   |
      | Price (high to low)  | prix décroissant |

  @US-004 @AC-US004-01 @AC-US004-02 @AC-US004-03 @P1
  Scénario: Ouvrir puis quitter une fiche
    Quand j'ouvre "Sauce Labs Backpack"
    Alors la fiche reprend le nom, la description et le prix "$29.99"
    Quand je sélectionne "Back to products"
    Alors le catalogue est affiché

Fonctionnalité: Panier
  Contexte:
    Étant donné que je suis connecté comme "standard_user"

  @US-005 @AC-US005-01 @P0 @smoke
  Scénario: Ajouter un produit
    Quand j'ajoute "Sauce Labs Backpack"
    Alors le badge du panier vaut 1
    Et l'action du produit devient "Remove"

  @US-005 @AC-US005-02 @P0
  Scénario: Ajouter plusieurs produits
    Quand j'ajoute trois produits distincts
    Alors le badge du panier vaut 3
    Et le panier contient ces trois produits une fois chacun

  @US-005 @AC-US005-03 @P1
  Scénario: Ajouter depuis une fiche produit
    Étant donné que la fiche "Sauce Labs Bike Light" est ouverte
    Quand j'ajoute le produit
    Alors le panier contient "Sauce Labs Bike Light"

  @US-006 @AC-US006-01 @AC-US006-02 @P0
  Scénario: Retirer le dernier produit
    Étant donné que le panier contient un produit
    Quand je retire ce produit
    Alors le panier ne contient aucune ligne produit
    Et le badge n'est plus affiché

  @US-007 @AC-US007-01 @AC-US007-02 @P0
  Scénario: Contrôler le panier et poursuivre les achats
    Étant donné que le Backpack est dans le panier
    Alors sa quantité vaut 1 et son prix vaut "$29.99"
    Quand je sélectionne "Continue Shopping"
    Alors le catalogue est affiché et le badge vaut 1

  @US-007 @AC-US007-03 @P1 @negative
  Scénario: Afficher un panier vide
    Étant donné qu'aucun produit n'a été ajouté
    Quand j'ouvre le panier
    Alors aucune ligne produit ni badge n'est affiché

Fonctionnalité: Checkout
  Contexte:
    Étant donné que je suis connecté comme "standard_user"
    Et que le Backpack est dans le panier
    Et que j'ai ouvert le checkout

  @US-008 @AC-US008-01 @P0 @smoke
  Scénario: Continuer avec les coordonnées requises
    Quand je saisis "Ada", "Lovelace" et "75001"
    Et je sélectionne "Continue"
    Alors le récapitulatif est affiché

  @US-008 @AC-US008-02 @AC-US008-03 @AC-US008-04 @P0 @negative
  Plan du scénario: Refuser un champ requis absent
    Quand je saisis "<prenom>", "<nom>" et "<code>"
    Et je sélectionne "Continue"
    Alors je reste à l'étape informations
    Et le message vaut "<message>"
    Exemples:
      | prenom | nom      | code  | message                        |
      |        | Lovelace | 75001 | Error: First Name is required  |
      | Ada    |          | 75001 | Error: Last Name is required   |
      | Ada    | Lovelace |       | Error: Postal Code is required |

  @US-009 @AC-US009-01 @AC-US009-02 @AC-US009-03 @P0
  Scénario: Contrôler le récapitulatif du Backpack
    Quand je fournis des coordonnées valides
    Alors le Backpack apparaît avec quantité 1 et prix "$29.99"
    Et le sous-total vaut "$29.99", la taxe "$2.40" et le total "$32.39"
    Et les informations de paiement et livraison sont affichées

  @US-010 @AC-US010-01 @AC-US010-02 @P0 @smoke
  Scénario: Finaliser puis revenir au catalogue
    Étant donné que le récapitulatif est affiché
    Quand je sélectionne "Finish"
    Alors une confirmation explicite est affichée
    Quand je sélectionne "Back Home"
    Alors le catalogue est affiché avec un panier vide

  @US-011 @AC-US011-01 @P1
  Scénario: Annuler depuis les informations
    Quand je sélectionne "Cancel"
    Alors le panier est affiché avec le Backpack

  @US-011 @AC-US011-02 @P1
  Scénario: Annuler depuis le récapitulatif
    Étant donné que le récapitulatif est affiché
    Quand je sélectionne "Cancel"
    Alors le catalogue est affiché et aucune confirmation n'existe

Fonctionnalité: Session et menu
  @US-012 @AC-US012-01 @AC-US012-02 @P0
  Scénario: Se déconnecter et protéger les routes
    Étant donné que je suis connecté
    Quand je sélectionne "Logout"
    Alors la page de connexion est affichée
    Quand je tente d'ouvrir directement le catalogue
    Alors je suis refusé ou redirigé vers la connexion

  @US-012 @AC-US012-03 @P1
  Scénario: Actualiser une session active
    Étant donné que je suis connecté et qu'un produit est au panier
    Quand j'actualise la page
    Alors la page reste utilisable et l'état est cohérent

  @US-013 @AC-US013-01 @AC-US013-02 @P1
  Scénario: Réinitialiser l'état
    Étant donné que deux produits sont au panier
    Quand je sélectionne "Reset App State"
    Alors le badge disparaît et les actions redeviennent "Add to cart"
    Et je reste authentifié

  @US-014 @AC-US014-01 @AC-US014-02 @P2
  Scénario: Utiliser le menu global
    Quand j'ouvre le menu
    Alors All Items, About, Logout et Reset App State sont visibles
    Quand je ferme le menu
    Alors le panneau n'est plus visible
```
