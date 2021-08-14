import { User } from './user.js';
import { Product } from './product.js';

export class Admin extends User {
  constructor(name, balance) {
    super(name, balance);
  }

  createProduct(title, price, amount) {
    return new Product(title, price, amount);
  }
}
