import { test, assert } from './runner.js';

// ── Values & Primitives ─────────────────────────────────────

test('typeof returns the correct types', () => {
  assert.equal(typeof 42, 'number');
  assert.equal(typeof 'hello', 'string');
  assert.equal(typeof true, 'boolean');
  assert.equal(typeof undefined, 'undefined');
  assert.equal(typeof null, 'object'); // historical JS quirk
  assert.equal(typeof Symbol('id'), 'symbol');
  assert.equal(typeof 9007199254740991n, 'bigint');
});

test('null vs undefined behave differently', () => {
  assert.equal(null == undefined, true);  // loose equality
  assert.equal(null === undefined, false); // strict equality
  assert.equal(typeof null, 'object');
  assert.equal(typeof undefined, 'undefined');
});

test('BigInt arithmetic works', () => {
  const a = 100n;
  const b = 20n;
  assert.equal(a + b, 120n);
  assert.equal(a * b, 2000n);
  assert.equal(a / b, 5n); // truncates toward zero
  assert.equal(a % b, 0n);
});

// ── Variables (let, const, var) ─────────────────────────────

test('const cannot be reassigned', () => {
  const x = 10;
  // x = 20; // would throw TypeError
  assert.equal(x, 10);
});

test('let can be reassigned but not re-declared in same scope', () => {
  let y = 1;
  y = 2;
  assert.equal(y, 2);
});

test('var is function-scoped (not block-scoped)', () => {
  if (true) {
    var z = 99;
  }
  assert.equal(z, 99); // z leaks out of the block
});

test('variable hoisting with var', () => {
  assert.equal(typeof hoistedVar, 'undefined'); // hoisted but not initialized
  var hoistedVar = 'now initialized';
  assert.equal(hoistedVar, 'now initialized');
});

// ── Arithmetic Operators & Precedence ───────────────────────

test('basic arithmetic', () => {
  assert.equal(10 + 5, 15);
  assert.equal(10 - 5, 5);
  assert.equal(10 * 5, 50);
  assert.equal(10 / 3, 3.3333333333333335);
  assert.equal(10 % 3, 1);
  assert.equal(2 ** 3, 8);
});

test('operator precedence (PEMDAS)', () => {
  assert.equal(2 + 3 * 4, 14);   // multiplication first
  assert.equal((2 + 3) * 4, 20); // parens override
  assert.equal(2 ** 3 * 2, 16);  // exponent first
});

test('NaN is the only value not equal to itself', () => {
  assert.equal(NaN === NaN, false);
  assert.equal(isNaN(NaN), true);
  assert.equal(Number.isNaN(NaN), true);
});

test('floating point imprecision exists', () => {
  assert.equal(0.1 + 0.2 !== 0.3, true);
  // Use toFixed or rounding for money
  const sum = (0.1 * 10 + 0.2 * 10) / 10;
  assert.equal(sum, 0.3);
});

// ── Comparison Operators ────────────────────────────────────

test('strict vs loose equality', () => {
  assert.equal(5 == '5', true);
  assert.equal(5 === '5', false);
  assert.equal(0 == false, true);
  assert.equal(0 === false, false);
  assert.equal('' == false, true);
  assert.equal('' === false, false);
});

test('relational operators work on strings lexicographically', () => {
  assert.equal('apple' < 'banana', true);
  assert.equal('Apple' < 'apple', true);  // uppercase < lowercase
});

// ── Logical Operators ───────────────────────────────────────

test('AND, OR, NOT basics', () => {
  assert.equal(true && false, false);
  assert.equal(true || false, true);
  assert.equal(!true, false);
  assert.equal(!0, true);
});

test('short-circuit evaluation — OR returns first truthy', () => {
  assert.equal(0 || 'default', 'default');
  assert.equal('' || 'fallback', 'fallback');
  assert.equal(null || 'value', 'value');
  assert.equal(undefined || 42, 42);
});

test('short-circuit evaluation — AND returns first falsy', () => {
  assert.equal(0 && 'never', 0);
  assert.equal('ok' && 'both', 'both');
  assert.equal(true && 42, 42);
});

// ── Assignment Operators ────────────────────────────────────

test('compound assignment operators', () => {
  let x = 10;
  x += 5;  assert.equal(x, 15);
  x -= 3;  assert.equal(x, 12);
  x *= 2;  assert.equal(x, 24);
  x /= 4;  assert.equal(x, 6);
  x %= 4;  assert.equal(x, 2);
  x **= 3; assert.equal(x, 8);
});

// ── If/Else & Ternary ───────────────────────────────────────

test('if/else if/else chain', () => {
  function scoreGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }
  assert.equal(scoreGrade(95), 'A');
  assert.equal(scoreGrade(85), 'B');
  assert.equal(scoreGrade(72), 'C');
  assert.equal(scoreGrade(64), 'D');
  assert.equal(scoreGrade(50), 'F');
});

test('ternary operator', () => {
  const age = 20;
  const status = age >= 18 ? 'adult' : 'minor';
  assert.equal(status, 'adult');
});

test('switch statement', () => {
  function dayName(n) {
    switch (n) {
      case 0: return 'Sunday';
      case 1: return 'Monday';
      case 2: return 'Tuesday';
      case 3: return 'Wednesday';
      case 4: return 'Thursday';
      case 5: return 'Friday';
      case 6: return 'Saturday';
      default: return 'Invalid';
    }
  }
  assert.equal(dayName(0), 'Sunday');
  assert.equal(dayName(6), 'Saturday');
  assert.equal(dayName(7), 'Invalid');
});

// ── String Methods ──────────────────────────────────────────

test('string basics', () => {
  const s = '  Hello, World!  ';
  assert.equal(s.length, 17);
  assert.equal(s.trim(), 'Hello, World!');
  assert.equal(s.trim().toLowerCase(), 'hello, world!');
  assert.equal(s.trim().toUpperCase(), 'HELLO, WORLD!');
});

test('string searching', () => {
  const s = 'The quick brown fox';
  assert.equal(s.indexOf('quick'), 4);
  assert.equal(s.indexOf('dog'), -1);
  assert.equal(s.includes('fox'), true);
  assert.equal(s.startsWith('The'), true);
  assert.equal(s.endsWith('fox'), true);
});

test('string slicing', () => {
  const s = 'JavaScript';
  assert.equal(s.slice(0, 4), 'Java');
  assert.equal(s.slice(4), 'Script');
  assert.equal(s.slice(-6), 'Script');
});

test('string replace and split', () => {
  const s = 'apple,banana,cherry';
  const replaced = s.replace('apple', 'avocado');
  assert.equal(replaced, 'avocado,banana,cherry');
  const parts = s.split(',');
  assert.deepEqual(parts, ['apple', 'banana', 'cherry']);
});

// ── Practical: FizzBuzz (from beginner projects) ────────────

test('FizzBuzz works', () => {
  function fizzBuzz(n) {
    if (n % 15 === 0) return 'FizzBuzz';
    if (n % 3 === 0) return 'Fizz';
    if (n % 5 === 0) return 'Buzz';
    return String(n);
  }
  assert.equal(fizzBuzz(1), '1');
  assert.equal(fizzBuzz(3), 'Fizz');
  assert.equal(fizzBuzz(5), 'Buzz');
  assert.equal(fizzBuzz(15), 'FizzBuzz');
  assert.equal(fizzBuzz(30), 'FizzBuzz');
  assert.equal(fizzBuzz(7), '7');
});

// ── Practical: Temperature Converter ─────────────────────────

test('temperature converter', () => {
  function celsiusToFahrenheit(c) {
    return c * 9/5 + 32;
  }
  function fahrenheitToCelsius(f) {
    return (f - 32) * 5/9;
  }
  assert.equal(celsiusToFahrenheit(0), 32);
  assert.equal(celsiusToFahrenheit(100), 212);
  assert.equal(fahrenheitToCelsius(32), 0);
  assert.equal(fahrenheitToCelsius(212), 100);
});

// ── Practical: Even/Odd Check ───────────────────────────────

test('even/odd checker', () => {
  function isEven(n) {
    return n % 2 === 0;
  }
  assert.equal(isEven(2), true);
  assert.equal(isEven(3), false);
  assert.equal(isEven(0), true);
  assert.equal(isEven(-2), true);
  assert.equal(isEven(-3), false);
});
