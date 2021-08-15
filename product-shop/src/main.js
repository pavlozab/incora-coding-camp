import { User } from './entities/user.js';
import { Product } from './entities/product.js';
import { Admin } from './entities/admin.js';
import { Order } from './entities/order.js';
import { Validation } from './validation.js';
import { CartIsEmptyError, NotFoundError } from './customErrors.js';

let products = [
  new Product('Fresh Avocados', 6.5, 4),
  new Product('Apollo Broccoli', 5.5, 6),
  new Product('Baby Carrots', 3, 12),
  new Product('Sweet Corncobs', 2, 14),
  new Product('Goat and Sheep Cheese', 5, 4),
];

function main() {
  valid();
  errors();

  console.log();
}

function valid() {
  console.log('\n!---------- All products 🌽 ----------!');
  console.log(products);

  console.log('\n\n!---------- Admin create product 🧅 ----------!');
  let admin = new Admin('Admin', 10000);

  const newProduct = admin.createProduct('Onion', 1.5, 8);
  products.push(newProduct);

  console.log(products);

  console.log('\n\n!---------- Add 🛒 ----------!');

  const user = new User('Pasha', 110);
  addToCart(products.slice(0, 3), user);

  console.log(user.getCart());

  const productTitle = products[0].title;
  console.log(`\n\n!---------- Remove '${productTitle}' 🛒 ----------!`);

  user.getCart().removeProduct(productTitle);
  console.log(user.getCart());

  console.log('\n\n!---------- Checkout 1 🛒 ----------!');
  user.getCart().checkout(user, products);
  showAll(user);

  console.log('\n\n!---------- Checkout 2 🛒 ----------!');
  addToCart(products.slice(-2), user);
  user.getCart().checkout(user, products);
  showAll(user);

  for (const by of ['date', 'totalPrice']) {
    for (const type of ['asc', 'desc']) {
      console.log(
        `\n!---------- Order history (${type}, ${by}) 🚚 ----------!`,
      );
      console.log(user.showOrderHistory(type, by));
    }
  }
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

function errors() {
  const defUser = new User('Default', 100);
  const defCart = defUser.getCart();

  console.log(
    `
!---------       Errors ⛔️      ---------!
!--------- String validation 📝 ---------!
`,
  );
  try {
    new User('Abc12 23', 78);
  } catch (error) {
    showError(error);
  }

  console.log('\n\n!--------- Positive number validation 🔢 ---------!');
  try {
    new User('User', -78);
  } catch (error) {
    showError(error);
  }

  console.log('\n\n!--------- Date validation 📆 ---------!');
  try {
    new Order([new Product('test', 50, 2)], 100, '13-11a-2021');
  } catch (error) {
    showError(error);
  }

  console.log('\n\n!--------- intInRange validation ⛰ ---------!');
  try {
    Validation.intInRange(12, 13, 19);
  } catch (error) {
    showError(error);
  }

  console.log('\n\n!--------- User balance 🛒 ---------!');
  try {
    const user = new User('test', 2);
    user.getCart().addProduct(products[0]);
    user.getCart().checkout(user, products);
  } catch (error) {
    if (error instanceof RangeError) {
      showError(error);
    }
  }

  console.log('\n\n!--------- Cart is empty 🛒 ---------!');
  try {
    defCart.checkout(defUser, products);
  } catch (error) {
    if (error instanceof CartIsEmptyError) {
      showError(error);
    }
  }

  console.log('\n\n!--------- Product has not been found 🛒 ---------!');
  try {
    defCart.addProduct(new Product('Avocado', 6.5, 1));
    defCart.checkout(defUser, products);
  } catch (error) {
    if (error instanceof NotFoundError) {
      showError(error);
    }
  } finally {
    defCart.withdraw();
  }

  console.log('\n\n!--------- Product amount 🛒 ---------!');
  try {
    defCart.addProduct(new Product('Fresh Avocados', 6.5, 13));
    defCart.checkout(defUser, products);
  } catch (error) {
    if (error instanceof RangeError) {
      showError(error);
    }
  } finally {
    defCart.withdraw();
  }
}

function showError(error) {
  console.error(error.message + '\nError name: ' + error.name);
}

main();
