import {CartIsEmptyError, NotFoundError} from './../customErrors.js';

export class Cart {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(productName) {
    const productIndex = this.products.findIndex(
      product => product.title === productName,
    );

    if (productIndex === -1) {
      throw new NotFoundError(`Product '${productName}' has not been found`);
    } else {
      this.products.splice(productIndex, 1);
    }
  }

  withdraw() {
    this.products.length = 0;
  }

  checkout(user, allProducts) {
    // step 0: check cart
    if (!this.products.length) {
      throw new CartIsEmptyError('Cart is empty');
    }

    const totalPrice = this.getTotalPrice();

    // step 1: check user balance
    if (!user.checkBalance(totalPrice)) {
      throw new RangeError('User balance is too low');
    }

    // step 2: check product quantity
    for (let product of this.products) {
      const indexOfProduct = allProducts.findIndex(
        prod => prod.title === product.title,
      );

      if (indexOfProduct === -1) {
        throw new NotFoundError(
          `Product '${product.title}' has not been found`,
        );
      }

      let currentProduct = allProducts[indexOfProduct];

      if (currentProduct.amount < product.amount) {
        throw new RangeError('Out of stock');
      }

      currentProduct.substractAmount(product.amount);
    }

    // step 3: update user balance
    user.updateBalance(totalPrice);

    // step 4: addOrder
    user.addOrder([...this.products], totalPrice);

    // step 5: withdraw
    this.withdraw();
  }

  getTotalPrice() {
    return this.products.reduce(
        (accumulator, curentProduct) =>
            accumulator + curentProduct.getTotalPrice(),
        0,
    );
  }

}
