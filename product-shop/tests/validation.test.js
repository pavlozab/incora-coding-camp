import { Admin } from '../src/entities/admin.js';
import { Order } from '../src/entities/order.js';
import { Validation } from '../src/validation.js';

test('test string validation', () => {
  expect(() => {
    new Admin('admin 123', 1100);
  }).toThrow(TypeError);
});

test('test positiveNumber validation', () => {
  expect(() => {
    new Admin('admin', -1100);
  }).toThrow(RangeError);
});

test('test date validation', () => {
  expect(() => {
    new Order([], 100, '12-12a-2221');
  }).toThrow(TypeError);
});

test('test intInRange validation', () => {
  expect(() => {
    Validation.intInRange(12, 13, 14);
  }).toThrow(RangeError);
});
