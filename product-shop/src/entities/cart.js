import { NotFoundError } from './../customErrors.js';

export class Cart {
  constructor() {
    this.products = new Array();
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(productName) {
    const productIndex = this.products.findIndex(
      product => product.title === productName,
    );

    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
    } else {
      throw new NotFoundError(`Product '${productName}' has not been found`);
    }
  }

  withdraw() {
    this.products.length = 0; // FIXME: check better solution
  }

  checkout(user, allProducts) {
    // step0 : cart is empty
    if (!this.products.length) {
      throw new Error('Custom Error. cart is empty'); // FIXME: custom exception
    }

    const totalPrice = this.getTotalPrice();

    // step1 : check user balance
    if (!user.checkBalance(totalPrice)) {
      throw new Error('User balance is too low'); // FIXME: custom exception
    }

    // step2 : check products quantity if not threw custom exception and stop else change original product quantity
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
        throw new Error('Product out of stock'); // FIXME: custom exception
      }

      currentProduct.substractAmount(product.amount);
    }

    // step3 : edit user balance
    user.updateBalance(totalPrice);

    // step4 : addOrder
    user.addOrder([...this.products], totalPrice);

    // step5 : withdraw
    this.withdraw();
  }

  getTotalPrice() {
    const totalPrice = this.products.reduce(
      (accumulator, curentProduct) =>
        accumulator + curentProduct.getTotalPrice(),
      0,
    );

    return totalPrice;
  }
}
