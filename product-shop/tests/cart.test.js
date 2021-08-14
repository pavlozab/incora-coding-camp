import { Cart } from '../src/entities/cart.js';
import { Product } from '../src/entities/product.js';
import { User } from '../src/entities/user.js';
import { NotFoundError, CartIsEmptyError } from '../src/customErrors.js';

const products = [
  new Product('Fresh Avocados', 6.5, 4),
  new Product('Apollo Broccoli', 5.5, 6),
  new Product('Baby Carrots', 3, 3),
];

const defUser = new User('test', 100);
const defCart = defUser.getCart();

function generateCart(cart, prod) {
  prod.forEach(product => cart.addProduct(product));
  return cart;
}

test('test addProduct (returns created product)', () => {
  const cart = new Cart();
  const product = products[0];

  cart.addProduct(product);

  expect(cart.products).toEqual([product]);
});

test('test removeProduct (successful)', () => {
  const cart = new Cart();
  generateCart(cart, products);

  expect(cart.products).toEqual(products);

  cart.removeProduct('Baby Carrots');

  expect(cart.products).toEqual([
    new Product('Fresh Avocados', 6.5, 4),
    new Product('Apollo Broccoli', 5.5, 6),
  ]);
});

test('test removeProduct (throw NotFoundError)', () => {
  const cart = new Cart();
  generateCart(cart, products);

  expect(cart.products).toEqual(products);

  expect(() => {
    cart.removeProduct('None');
  }).toThrow(NotFoundError);
});

test('test withdraw (successful)', () => {
  const cart = new Cart();
  generateCart(cart, products);

  cart.withdraw();

  expect(cart.products).toEqual([]);
});

test('test checkout (cart is empty)', () => {
  expect(() => {
    defUser.getCart().checkout(defUser, products);
  }).toThrow(CartIsEmptyError);
});

test('test checkout (user balance is too low)', () => {
  const user = new User('test', 4);
  const cart = user.getCart();

  cart.addProduct(new Product('Fresh Avocados', 6.5, 1));

  expect(() => {
    cart.checkout(user, products);
  }).toThrow(RangeError);
});

test('test checkout (product has not been found)', () => {
  defCart.addProduct(new Product('Avocado', 6.5, 1));

  expect(() => {
    defCart.checkout(defUser, products);
  }).toThrow(NotFoundError);

  defCart.withdraw();
});

test('test checkout (product quantity)', () => {
  defCart.addProduct(new Product('Fresh Avocados', 3, 12));

  expect(() => {
    defCart.checkout(defUser, products);
  }).toThrow(RangeError);
});

test('test checkout (successful)', () => {
  const user = new User('test', 999);
  const cart = user.getCart();

  const productsForOrder = [
    new Product('Fresh Avocados', 6.5, 1),
    new Product('Baby Carrots', 3, 2),
  ];

  const productsAfter = [
    new Product('Fresh Avocados', 6.5, 3),
    new Product('Apollo Broccoli', 5.5, 6),
    new Product('Baby Carrots', 3, 1),
  ];

  cart.addProduct(productsForOrder[0]);
  cart.addProduct(productsForOrder[1]);

  cart.checkout(user, products);

  expect(cart.products).toEqual([]);
  expect(user.balance).toBe(986.5);
  expect(products).toEqual(productsAfter);
  expect(user.orders[0].products).toEqual(productsForOrder);
});
