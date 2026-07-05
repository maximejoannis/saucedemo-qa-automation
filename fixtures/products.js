// learn: les produits attendus servent à vérifier le catalogue, le panier et les totaux.
// build: les slugs correspondent aux data-test id utilisés par SauceDemo.
// deploy: la centralisation limite la maintenance si le catalogue de démo change.
const products = {
  backpack: { name: 'Sauce Labs Backpack', slug: 'sauce-labs-backpack', price: 29.99 },
  bikeLight: { name: 'Sauce Labs Bike Light', slug: 'sauce-labs-bike-light', price: 9.99 },
  boltTShirt: { name: 'Sauce Labs Bolt T-Shirt', slug: 'sauce-labs-bolt-t-shirt', price: 15.99 },
  fleeceJacket: { name: 'Sauce Labs Fleece Jacket', slug: 'sauce-labs-fleece-jacket', price: 49.99 },
  onesie: { name: 'Sauce Labs Onesie', slug: 'sauce-labs-onesie', price: 7.99 },
  redTShirt: { name: 'Test.allTheThings() T-Shirt (Red)', slug: 'test.allthethings()-t-shirt-(red)', price: 15.99 },
};

const productSort = {
  nameDesc: [
    products.redTShirt.name,
    products.onesie.name,
    products.fleeceJacket.name,
    products.boltTShirt.name,
    products.bikeLight.name,
    products.backpack.name,
  ],
  priceAsc: [7.99, 9.99, 15.99, 15.99, 29.99, 49.99],
};

module.exports = { products, productSort };
