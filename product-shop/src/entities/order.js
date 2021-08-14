import { Validation } from '../Validation.js';

export class Order {
  constructor(products, totalPrice, date = new Date()) {
    this.products = products;
    this.totalPrice = Validation.validatePositiveNumber(totalPrice);
    this.date = Validation.validateDate(date);
  }
}
