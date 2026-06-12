/**
 * sum.test.js — Jest tests for the functions in sum.js
 * Run with: npx jest
 * Or: npm test (if configured)
 */

const { sum, multiply, isEven, max, reverseString } = require('./sum');

// ---------------------------------------------------------------
// Test suite for sum
// ---------------------------------------------------------------

describe('sum', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('adds 0 + 0 to equal 0', () => {
    expect(sum(0, 0)).toBe(0);
  });

  test('adds negative numbers correctly', () => {
    expect(sum(-1, -2)).toBe(-3);
  });

  test('adds positive and negative numbers', () => {
    expect(sum(5, -3)).toBe(2);
  });
});

// ---------------------------------------------------------------
// Test suite for multiply
// ---------------------------------------------------------------

describe('multiply', () => {
  test('multiplies 2 * 3 to equal 6', () => {
    expect(multiply(2, 3)).toBe(6);
  });

  test('multiply by 0 equals 0', () => {
    expect(multiply(5, 0)).toBe(0);
  });

  test('multiply by 1 equals the same number', () => {
    expect(multiply(7, 1)).toBe(7);
  });

  test('multiply negative numbers', () => {
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(-2, -3)).toBe(6);
  });
});

// ---------------------------------------------------------------
// Test suite for isEven
// ---------------------------------------------------------------

describe('isEven', () => {
  test('returns true for even numbers', () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(0)).toBe(true);
    expect(isEven(-4)).toBe(true);
  });

  test('returns false for odd numbers', () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(3)).toBe(false);
    expect(isEven(-1)).toBe(false);
  });
});

// ---------------------------------------------------------------
// Test suite for max
// ---------------------------------------------------------------

describe('max', () => {
  test('returns the maximum number in an array', () => {
    expect(max([1, 2, 3])).toBe(3);
    expect(max([-10, -5, -1])).toBe(-1);
  });

  test('works with a single element', () => {
    expect(max([42])).toBe(42);
  });

  test('throws error for empty array', () => {
    expect(() => max([])).toThrow('Array must not be empty');
  });
});

// ---------------------------------------------------------------
// Test suite for reverseString
// ---------------------------------------------------------------

describe('reverseString', () => {
  test('reverses a normal string', () => {
    expect(reverseString('hello')).toBe('olleh');
  });

  test('reverses an empty string', () => {
    expect(reverseString('')).toBe('');
  });

  test('reverses a palindrome', () => {
    expect(reverseString('racecar')).toBe('racecar');
  });

  test('reverses a string with spaces', () => {
    expect(reverseString('hello world')).toBe('dlrow olleh');
  });
});
