import { Product } from './../src/entities/product.js';

const product = new Product('Fresh Avocados', 6.5, 4);

test('test substractAmount (RangeError)', () => {
  expect(() => {
    product.substractAmount(7);
  }).toThrow(RangeError);
});

test('test substractAmount (successful)', () => {
  product.substractAmount(2);
  expect(product.amount).toBe(2);
});
