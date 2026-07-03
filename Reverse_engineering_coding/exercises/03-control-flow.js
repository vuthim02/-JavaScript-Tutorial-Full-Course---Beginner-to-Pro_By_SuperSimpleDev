import { test, assert } from './runner.js';

// ── Execution Tracing — Boolean Logic ──────────────────────

test('truth table: AND, OR, NOT', () => {
  assert.equal(true && true, true);
  assert.equal(true && false, false);
  assert.equal(false || true, true);
  assert.equal(false || false, false);
  assert.equal(!true, false);
  assert.equal(!false, true);
});

test('short-circuit: && returns first falsy', () => {
  assert.equal(0 && 5, 0);
  assert.equal(null && 'x', null);
  assert.equal(3 && 7, 7);   // both truthy → last value
});

test('short-circuit: || returns first truthy', () => {
  assert.equal(0 || 5, 5);
  assert.equal(null || 'x', 'x');
  assert.equal(3 || 7, 3);   // first truthy → short-circuits
});

// ── Loops ──────────────────────────────────────────────────

test('for loop sum 1 to 10', () => {
  let sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += i;
  }
  assert.equal(sum, 55);
});

test('while loop — count down', () => {
  let i = 5;
  const result = [];
  while (i > 0) {
    result.push(i);
    i--;
  }
  assert.deepEqual(result, [5, 4, 3, 2, 1]);
});

test('for...of iterates values', () => {
  const items = ['a', 'b', 'c'];
  const collected = [];
  for (const item of items) {
    collected.push(item);
  }
  assert.deepEqual(collected, ['a', 'b', 'c']);
});

test('for...in iterates keys', () => {
  const obj = { x: 10, y: 20 };
  const keys = [];
  for (const key in obj) {
    keys.push(key);
  }
  assert.deepEqual(keys.sort(), ['x', 'y']);
});

// ── Error Handling ─────────────────────────────────────────

test('try/catch catches thrown error', () => {
  const result = [];
  try {
    throw new Error('boom');
  } catch (e) {
    result.push(e.message);
  }
  assert.deepEqual(result, ['boom']);
});

test('finally always runs', () => {
  let finallyRan = false;
  try {
    // no error
  } finally {
    finallyRan = true;
  }
  assert.equal(finallyRan, true);
});

test('throwing and catching custom error', () => {
  function divide(a, b) {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  }
  assert.equal(divide(10, 2), 5);
  let caught = false;
  try {
    divide(1, 0);
  } catch (e) {
    caught = true;
    assert.equal(e.message, 'Division by zero');
  }
  assert.equal(caught, true);
});

// ── Execution Tracing: Call Stack ──────────────────────────

test('trace: nested function calls on the stack', () => {
  function one() { return two(); }
  function two() { return three(); }
  function three() { return 'done'; }
  // Trace the call stack:
  // stack: [one] → [one, two] → [one, two, three] → pop three → pop two → pop one
  assert.equal(one(), 'done');
});

test('trace: recursive factorial', () => {
  function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
  }
  // fact(4) expands: 4 * fact(3) → 4 * 3 * fact(2) → 4 * 3 * 2 * fact(1) → 4 * 3 * 2 * 1
  assert.equal(fact(4), 24);
  assert.equal(fact(5), 120);
});

// ── Practical: Algorithmic Thinking ────────────────────────

test('find max in array', () => {
  function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) max = arr[i];
    }
    return max;
  }
  assert.equal(findMax([3, 7, 2, 9, 5]), 9);
  assert.equal(findMax([-5, -2, -10]), -2);
});

test('palindrome checker', () => {
  function isPalindrome(s) {
    const reversed = s.split('').reverse().join('');
    return s === reversed;
  }
  assert.equal(isPalindrome('racecar'), true);
  assert.equal(isPalindrome('hello'), false);
  assert.equal(isPalindrome('a'), true);
});

test('prime checker', () => {
  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(17), true);
  assert.equal(isPrime(4), false);
  assert.equal(isPrime(1), false);
});
