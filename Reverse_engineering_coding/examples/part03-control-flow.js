/**
 * PART 3 — Control flow, loops, error handling, recursion
 * Run with: node part03-control-flow.js
 */

// ---------------------------------------------------------------
// 1. if / else if / else — conditional branching
// ---------------------------------------------------------------

const age = 20;

if (age < 13) {
  console.log('Child');
} else if (age < 20) {
  console.log('Teenager');
} else if (age < 65) {
  console.log('Adult');
} else {
  console.log('Senior');
}

// Ternary operator (expression, not statement)
const status = age >= 18 ? 'Adult' : 'Minor';
console.log('Ternary status:', status);

// ---------------------------------------------------------------
// 2. switch — multiple discrete cases
// ---------------------------------------------------------------

const day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = 'Monday';
    break;
  case 2:
    dayName = 'Tuesday';
    break;
  case 3:
    dayName = 'Wednesday';
    break;
  case 4:
    dayName = 'Thursday';
    break;
  case 5:
    dayName = 'Friday';
    break;
  case 6:
  case 7:
    dayName = 'Weekend';
    break;
  default:
    dayName = 'Invalid day';
}

console.log('Switch day:', dayName);

// ---------------------------------------------------------------
// 3. for loop — classic
// ---------------------------------------------------------------

console.log('Counting with for loop:');
for (let i = 1; i <= 5; i++) {
  console.log('  i =', i);
}

// ---------------------------------------------------------------
// 4. while loop
// ---------------------------------------------------------------

let count = 0;
console.log('Counting with while loop:');
while (count < 3) {
  console.log('  count =', count);
  count++;
}

// ---------------------------------------------------------------
// 5. do...while — always executes at least once
// ---------------------------------------------------------------

let x = 10;
console.log('do...while (condition is false but runs once):');
do {
  console.log('  x =', x);
  x++;
} while (x < 10);

// ---------------------------------------------------------------
// 6. for...of — iterate over iterable values
// ---------------------------------------------------------------

const fruits = ['apple', 'banana', 'cherry'];
console.log('for...of over array:');
for (const fruit of fruits) {
  console.log('  fruit:', fruit);
}

// ---------------------------------------------------------------
// 7. for...in — iterate over enumerable property keys
// ---------------------------------------------------------------

const person = { name: 'Alice', age: 25, city: 'Paris' };
console.log('for...in over object:');
for (const key in person) {
  console.log(`  ${key}: ${person[key]}`);
}

// ---------------------------------------------------------------
// 8. break and continue
// ---------------------------------------------------------------

console.log('break at 3:');
for (let i = 0; i < 5; i++) {
  if (i === 3) break;
  console.log('  i =', i);
}

console.log('continue (skip 2):');
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log('  i =', i);
}

// ---------------------------------------------------------------
// 9. try / catch / finally — error handling
// ---------------------------------------------------------------

console.log('try/catch/finally:');
try {
  const result = riskyOperation(0);
  console.log('Result:', result);
} catch (error) {
  console.log('Caught error:', error.message);
} finally {
  console.log('Finally block always runs');
}

function riskyOperation(divisor) {
  if (divisor === 0) {
    throw new Error('Cannot divide by zero');
  }
  return 10 / divisor;
}

// ---------------------------------------------------------------
// 10. Recursion — factorial
// ---------------------------------------------------------------

function factorial(n) {
  // Base case: stop when n is 0 or 1
  if (n <= 1) return 1;
  // Recursive case: n! = n * (n-1)!
  return n * factorial(n - 1);
}

console.log('factorial(5):', factorial(5)); // 120

// ---------------------------------------------------------------
// 11. Recursion — fibonacci (inefficient but clear)
// ---------------------------------------------------------------

function fibonacci(n) {
  // Base cases
  if (n === 0) return 0;
  if (n === 1) return 1;
  // Recursive case: fib(n) = fib(n-1) + fib(n-2)
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('fibonacci(7):', fibonacci(7)); // 13

// ---------------------------------------------------------------
// 12. Recursion — fibonacci with memoization (optimized)
// ---------------------------------------------------------------

function memoizedFibonacci() {
  const cache = {};

  return function fib(n) {
    if (n in cache) return cache[n];
    if (n === 0) return 0;
    if (n === 1) return 1;
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}

const fibFast = memoizedFibonacci();
console.log('memoized fibonacci(40):', fibFast(40)); // 102334155 (fast)
