import { User } from './entities/user.js';
import { Product } from './entities/product.js';
import { Admin } from './entities/admin.js';
import { Order } from './entities/order.js';
import { Validation } from './validation.js';
//  import { NotFoundError } from './customErrors.js';

let products = [
  new Product('Fresh Avocados', 6.5, 4),
  new Product('Apollo Broccoli', 5.5, 6),
  new Product('Baby Carrots', 3, 12),
  new Product('Sweet Corncobs', 2, 14),
  new Product('Goat and Sheep Cheese', 5, 4),
];

function main() {
  valid();
  invalid();
}

function valid() {
  console.log('\n!---------- All products 🌽 ----------!');
  console.log(products);

  console.log('\n!---------- Admin create product 🧅 ----------!');
  let admin = new Admin('Admin', 10000);

  const newProduct = admin.createProduct('Onion', 1.5, 8);
  products.push(newProduct);

  console.log(products);

  console.log('\n\n!---------- Add 🛒 ----------!');

  const user = new User('Pasha', 110);
  addToCart(products.slice(0, 3), user);

  console.log(user.getCart());

  const productTitle = products[0].title;
  console.log(`\n!---------- Remove '${productTitle}' 🛒 ----------!`);

  user.getCart().removeProduct(productTitle);
  console.log(user.getCart());

  console.log('\n\n!---------- Checkout 1 🛒 ----------!');
  user.getCart().checkout(user, products);
  showAll(user);

  console.log('\n!---------- Checkout 2 🛒 ----------!');
  addToCart(products.slice(-2), user);
  user.getCart().checkout(user, products);
  showAll(user);

  console.log('\n\n!---------- Order history (asc, date) 🚚 ----------!');
  console.log(user.showOrderHistory('asc', 'date'));

  console.log('\n!---------- Order history (asc, totalPrice) 🚚 ----------!');
  console.log(user.showOrderHistory('asc', 'totalPrice'));

  console.log('\n!---------- Order history (desc, totalPrice) 🚚 ----------!');
  console.log(user.showOrderHistory('desc', 'totalPrice'));
}

function addToCart(prod, user) {
  for (let i = 0; i < prod.length; i++) {
    user
      .getCart()
      .addProduct(new Product(...Object.values({ ...prod[i], amount: i + 1 })));
  }
}

function showAll(user) {
  console.log('\n!--------- Products 🌽 ---------!');
  console.log(products);

  console.log('\n!--------- Cart 🛒 ---------!');
  console.log(user.getCart());

  console.log('\n!--------- User 🙋 ---------!');
  console.log(user);
}

function invalid() {
  console.log('\n!--------- String validation 📝 ---------!\n');
  try {
    new User('Abc12 23', 78);
  } catch (error) {
    console.error(error.message);
  }

  console.log('\n!--------- Posistive number validation 🔢 ---------!\n');
  try {
    new User('User', -78);
  } catch (error) {
    console.error(error.message);
  }

  console.log('\n!--------- Date validation 📆 ---------!\n');
  try {
    new Order([new Product('test', 50, 2)], 100, '13-11a-2021');
  } catch (error) {
    console.error(error.message);
  }

  console.log('\n!--------- intInRange validation ⛰ ---------!\n');
  try {
    Validation.intInRange(12, 13, 19);
  } catch (error) {
    console.error(error.message);
  }

  console.log('\n!--------- user balance 🛒 ---------!\n');
  try {
    const user = new User('test', 2);
    user.getCart().addProduct(products[0]);
    user.getCart().checkout(user, products);
  } catch (error) {
    if (typeof error !== typeof Error) {
      // FIXME: Error type
      console.error(error.message);
    }
  }

  console.log('\n!--------- Cart is empty 🛒 ---------!\n');
  try {
    const user = new User('test', 100);
    user.getCart().checkout(user, products);
  } catch (error) {
    if (typeof error !== typeof Error) {
      // FIXME: Error type
      console.error(error.message);
    }
  }
}

main();
