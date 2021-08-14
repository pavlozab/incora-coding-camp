import { Validation } from '../Validation.js';
import { Order } from './order.js';
import { Cart } from './cart.js';

export class User {
  constructor(name, balance) {
    this.name = Validation.validateString(name);
    this.balance = Validation.validatePositiveNumber(balance);

    this.orders = new Array();
    this.cart = new Cart();
  }

  showOrderHistory(sortType = 'asc', sortBy = 'date') {
    // check sortBy and sortType
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
    // throw exception 🤷
    return value < this.balance;
  }

  updateBalance(value) {
    if (this.checkBalance(value)) {
      this.balance -= value;
    } else {
      throw new Error(
        `Balance is too low. Your balance: ${this.balance} and your total price: ${value}`, // FIXME: custom exception
      );
    }
  }
}
