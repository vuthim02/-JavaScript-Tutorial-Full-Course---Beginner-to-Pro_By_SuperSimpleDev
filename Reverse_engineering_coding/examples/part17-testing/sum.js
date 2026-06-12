/**
 * sum.js — simple functions to test with Jest
 */

// Sum two numbers
function sum(a, b) {
  return a + b;
}

// Multiply two numbers
function multiply(a, b) {
  return a * b;
}

// Check if a number is even
function isEven(n) {
  return n % 2 === 0;
}

// Find the maximum value in an array
function max(arr) {
  if (arr.length === 0) throw new Error('Array must not be empty');
  return Math.max(...arr);
}

// Reverse a string
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Export all functions for testing
module.exports = { sum, multiply, isEven, max, reverseString };
