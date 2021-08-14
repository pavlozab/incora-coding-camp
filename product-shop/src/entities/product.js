import { Validation } from '../Validation.js';

export class Product {
  constructor(title, price, amount) {
    this.title = Validation.validateString(title);
    this.price = Validation.validatePositiveNumber(price);
    this.amount = Validation.validatePositiveNumber(amount);
  }

  substractAmount(amount) {
    amount = Validation.intInRange(amount, 1, this.amount);
    this.amount -= amount;
  }

  getTotalPrice() {
    return this.amount * this.price;
  }
}
