import { Validation } from '../Validation.js';
import { Order } from './order.js';
import { Cart } from './cart.js';

export class User {
  constructor(name, balance) {
    this.name = Validation.validateString(name);
    this.balance = Validation.validatePositiveNumber(balance);

    this.orders = [];
    this.cart = new Cart();
  }

  showOrderHistory(sortType = 'asc', sortBy = 'date') {
    const sortFunc =
      sortType === 'desc'
        ? (a, b) => (a[sortBy] > b[sortBy] ? -1 : 1)
        : (a, b) => (a[sortBy] < b[sortBy] ? -1 : 1);

    return this.orders.sort(sortFunc);
  }

  getCart() {
    return this.cart;
  }

  addOrder(products, totalPrice, date = new Date()) {
    const newOrder = new Order(products, totalPrice, date);
    this.orders.push(newOrder);
  }

  checkBalance(value) {
    return value < this.balance;
  }

  updateBalance(value) {
    if (this.checkBalance(value)) {
      this.balance -= value;
    } else {
      throw new RangeError(`Your balance (${this.balance}) is too low.`);
    }
  }
}
