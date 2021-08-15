import { Admin } from '../src/entities/admin.js';
import { Product } from '../src/entities/product.js';

test('create product (successful)', () => {
  const admin = new Admin('admin', 1000);

  expect(admin.createProduct('Fresh Avocados', 6.5, 4)).toEqual(
    new Product('Fresh Avocados', 6.5, 4),
  );
});
