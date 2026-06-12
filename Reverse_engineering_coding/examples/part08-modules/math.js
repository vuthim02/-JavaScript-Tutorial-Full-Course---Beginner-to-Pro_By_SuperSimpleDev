/**
 * math.js — CommonJS module exporting utility functions
 * Use with: node main.js
 */

// Helper: add two numbers
function add(a, b) {
  return a + b;
}

// Helper: subtract two numbers
function subtract(a, b) {
  return a - b;
}

// Helper: multiply two numbers
function multiply(a, b) {
  return a * b;
}

// Helper: divide two numbers
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

// Helper: calculate average of an array
function average(numbers) {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

// Export functions using module.exports
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  average,
};
