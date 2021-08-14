import { User } from './user.js';
import { Product } from './product.js';

export class Admin extends User {
  constructor(name, balance) {
    super(name, balance);
  }

  createProduct(title, price, amount) {
    var product = new Product(title, price, amount);
    return product;
  }
}
