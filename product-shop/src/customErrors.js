export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class CartIsEmptyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CartIsEmptyError';
  }
}
