import { Cart } from './../src/entities/cart.js';
import { Product } from './../src/entities/product.js';
import { User } from './../src/entities/user.js';
import { NotFoundError } from './../src/customErrors.js';

const products = [
  new Product('Fresh Avocados', 6.5, 4),
  new Product('Apollo Broccoli', 5.5, 6),
  new Product('Baby Carrots', 3, 3),
];

function generateCart(cart, prod) {
  prod.forEach(product => cart.addProduct(product));
  return cart;
}

test('test addProduct. Returns created product', () => {
  const cart = new Cart();
  const product = products[0];

  cart.addProduct(product);

  expect(cart.products).toEqual([product]);
});

test('test removeProduct (valid name)', () => {
  const cart = new Cart();
  generateCart(cart, products);

  expect(cart.products).toEqual(products);

  cart.removeProduct('Baby Carrots');

  expect(cart.products).toEqual([
    new Product('Fresh Avocados', 6.5, 4),
    new Product('Apollo Broccoli', 5.5, 6),
  ]);
});

test('test removeProduct (invalid name)', () => {
  const cart = new Cart();
  generateCart(cart, products);

  expect(cart.products).toEqual(products);

  expect(() => {
    cart.removeProduct('None');
  }).toThrow(NotFoundError);
});

test('test withdraw', () => {
  const cart = new Cart();
  generateCart(cart, products);

  cart.withdraw();

  expect(cart.products).toEqual([]);
});

test('test checkout (empty cart)', () => {
  const user = new User('test', 100);
  expect(() => {
    user.getCart().checkout(user, products);
  }).toThrow(Error); // FIXME:
});

test('test checkout (balance is too low)', () => {
  const user = new User('test', 4);

  user.getCart().addProduct(new Product('Fresh Avocados', 6.5, 1));

  expect(() => {
    user.getCart().checkout(user, products);
  }).toThrow(Error); // FIXME:
});

test('test checkout (product has not been found)', () => {
  const user = new User('test', 100);

  user.getCart().addProduct(new Product('Avocado', 6.5, 1));

  expect(() => {
    user.getCart().checkout(user, products);
  }).toThrow(Error); // FIXME:
});

test('test checkout (product quantity)', () => {
  const user = new User('test', 100);

  user.getCart().addProduct(new Product('Baby Carrots', 3, 12));

  expect(() => {
    user.getCart().checkout(user, products);
  }).toThrow(Error); // FIXME:
});

test('test checkout (successful)', () => {
  const user = new User('test', 999);

  const productsForOrder = [
    new Product('Fresh Avocados', 6.5, 1),
    new Product('Baby Carrots', 3, 2),
  ];

  const productsAfter = [
    new Product('Fresh Avocados', 6.5, 3),
    new Product('Apollo Broccoli', 5.5, 6),
    new Product('Baby Carrots', 3, 1),
  ];

  user.getCart().addProduct(productsForOrder[0]);
  user.getCart().addProduct(productsForOrder[1]);

  user.getCart().checkout(user, products);

  expect(user.getCart().products).toEqual([]);
  expect(user.balance).toBe(986.5);
  expect(products).toEqual(productsAfter);
  expect(user.orders[0].products).toEqual(productsForOrder);
});
