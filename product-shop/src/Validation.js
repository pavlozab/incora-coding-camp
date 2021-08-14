export class Validation {
  static validatePositiveNumber(value) {
    if (value * 1 <= 0) {
      throw new RangeError(`Value( ${value} ) must be a positive number`);
    }
    return value;
  }

  static validateString(value) {
    if (typeof value !== 'string' || value.search(/^[a-zA-Z\s]*$/) === -1) {
      throw new TypeError(
        `Value(${value}) must be a string, containing letters and spaces only`,
      );
    }

    return value;
  }

  static validateDate(value) {
    if (!Date.parse(value)) {
      throw new TypeError(`Value(${value}) must be a date format`);
    }

    return value;
  }

  static intInRange(val, min, max) {
    val *= 1; // val * 1
    if (val !== Math.round(val) || min > val || val > max) {
      throw new RangeError(
        `Value(${val}) must be an integer in range [${min}, ${max}]`,
      );
    }
    return val;
  }
}
