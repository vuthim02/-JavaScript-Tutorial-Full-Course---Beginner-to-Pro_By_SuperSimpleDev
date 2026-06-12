/**
 * main.js — imports and uses functions from math.js (CommonJS)
 * Run with: node main.js
 */

// Import the math module (CommonJS — require)
const math = require('./math');

// Use the imported functions
console.log('Math module demo:');
console.log('add(5, 3):', math.add(5, 3)); // 8
console.log('subtract(10, 4):', math.subtract(10, 4)); // 6
console.log('multiply(6, 7):', math.multiply(6, 7)); // 42
console.log('divide(20, 5):', math.divide(20, 5)); // 4
console.log('average([1, 2, 3, 4, 5]):', math.average([1, 2, 3, 4, 5])); // 3

// Destructured import
const { add, multiply: mul } = require('./math');
console.log('destructured add:', add(10, 20));
console.log('destructured multiply:', mul(10, 20));
