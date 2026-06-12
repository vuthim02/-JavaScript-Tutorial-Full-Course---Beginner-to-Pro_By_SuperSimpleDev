/**
 * PART 4 — Array methods, immutability, spread, destructuring
 * Run with: node part04-arrays.js
 */

// ---------------------------------------------------------------
// 1. Array creation
// ---------------------------------------------------------------

const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'two', true, null, { name: 'Alice' }];
const empty = new Array(5); // sparse array of length 5
const fromString = Array.from('hello');
console.log('Array.from("hello"):', fromString);

// ---------------------------------------------------------------
// 2. map — transform each element into a new array
// ---------------------------------------------------------------

const doubled = numbers.map(function (n) {
  return n * 2;
});
console.log('map (double):', doubled);

// Arrow function shorthand
const tripled = numbers.map(n => n * 3);
console.log('map (triple):', tripled);

// ---------------------------------------------------------------
// 3. filter — keep elements that pass a test
// ---------------------------------------------------------------

const evens = numbers.filter(function (n) {
  return n % 2 === 0;
});
console.log('filter (evens):', evens);

const odds = numbers.filter(n => n % 2 !== 0);
console.log('filter (odds):', odds);

// ---------------------------------------------------------------
// 4. reduce — accumulate values into a single result
// ---------------------------------------------------------------

const sum = numbers.reduce(function (accumulator, current) {
  return accumulator + current;
}, 0);
console.log('reduce (sum):', sum);

// Find the maximum value
const max = numbers.reduce((acc, n) => (n > acc ? n : acc), -Infinity);
console.log('reduce (max):', max);

// ---------------------------------------------------------------
// 5. find — returns first element that passes the test
// ---------------------------------------------------------------

const firstEven = numbers.find(n => n % 2 === 0);
console.log('find (first even):', firstEven);

// ---------------------------------------------------------------
// 6. some — returns true if ANY element passes the test
// ---------------------------------------------------------------

const hasNegative = numbers.some(n => n < 0);
console.log('some (has negative):', hasNegative);

const hasEven = numbers.some(n => n % 2 === 0);
console.log('some (has even):', hasEven);

// ---------------------------------------------------------------
// 7. every — returns true if ALL elements pass the test
// ---------------------------------------------------------------

const allPositive = numbers.every(n => n > 0);
console.log('every (all positive):', allPositive);

const allEven = numbers.every(n => n % 2 === 0);
console.log('every (all even):', allEven);

// ---------------------------------------------------------------
// 8. includes — check if array contains a value
// ---------------------------------------------------------------

console.log('includes(3):', numbers.includes(3));
console.log('includes(10):', numbers.includes(10));

// ---------------------------------------------------------------
// 9. Spread operator (...) — copy and merge arrays
// ---------------------------------------------------------------

const original = [1, 2, 3];

// Shallow copy
const copy = [...original];
console.log('spread copy:', copy);

// Merge arrays
const merged = [...original, 4, 5, 6];
console.log('spread merge:', merged);

// Immutable insert at position
const inserted = [...original.slice(0, 2), 99, ...original.slice(2)];
console.log('immutable insert:', inserted);

// ---------------------------------------------------------------
// 10. Immutability patterns — never mutate the original
// ---------------------------------------------------------------

const items = [{ id: 1, done: false }, { id: 2, done: true }];

// Immutable toggle — create new object inside new array
const toggled = items.map(item =>
  item.id === 1 ? { ...item, done: !item.done } : item
);
console.log('immutable toggle:', toggled);
console.log('original unchanged:', items);

// Immutable remove
const removed = items.filter(item => item.id !== 2);
console.log('immutable remove:', removed);

// Immutable add
const added = [...items, { id: 3, done: false }];
console.log('immutable add:', added);

// ---------------------------------------------------------------
// 11. Destructuring arrays
// ---------------------------------------------------------------

const rgb = [255, 128, 64];
const [red, green, blue] = rgb;
console.log('destructured:', red, green, blue);

// Skip elements
const [, , third] = rgb;
console.log('third element:', third);

// Rest pattern
const [first, ...rest] = rgb;
console.log('rest:', first, rest);

// Default values
const [a, b, c = 0, d = 100] = [1, 2];
console.log('defaults:', a, b, c, d);

// ---------------------------------------------------------------
// 12. Chaining methods
// ---------------------------------------------------------------

const result = numbers
  .filter(n => n > 2)
  .map(n => n * 10)
  .reduce((acc, n) => acc + n, 0);
console.log('chained (filter >2, *10, sum):', result);
