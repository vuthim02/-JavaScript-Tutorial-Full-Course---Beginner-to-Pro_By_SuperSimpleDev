import { test, assert } from './runner.js';

// ── Scope & Hoisting ────────────────────────────────────────

test('let is block-scoped', () => {
  let x = 'outer';
  {
    let x = 'inner';
    assert.equal(x, 'inner');
  }
  assert.equal(x, 'outer');
});

test('const is also block-scoped', () => {
  const y = 'outer';
  {
    const y = 'inner';
    assert.equal(y, 'inner');
  }
  assert.equal(y, 'outer');
});

test('var ignores blocks but respects functions', () => {
  var z = 1;
  if (true) { var z = 2; }
  assert.equal(z, 2); // same variable — block doesn't scope var
});

test('hoisting with function declarations', () => {
  // function is hoisted — can call before declaration
  assert.equal(hoistedFn(), 'hoisted');
  function hoistedFn() { return 'hoisted'; }
});

test('hoisting with let/const — temporal dead zone', () => {
  // let and const are hoisted but not initialized
  // accessing them before declaration throws ReferenceError
  // This test verifies the TDZ exists
  let threw = false;
  try {
    eval('console.log(tdzVar); let tdzVar = 1;');
  } catch {
    threw = true;
  }
  assert.equal(threw, true);
});

// ── Type Coercion & Conversion ──────────────────────────────

test('implicit coercion with + operator', () => {
  assert.equal('5' + 3, '53');   // string concatenation wins
  assert.equal(3 + '5', '35');
  assert.equal(3 + 5 + '7', '87'); // left-to-right: 3+5=8, then 8+'7'='87'
});

test('implicit coercion with -, *, /', () => {
  assert.equal('10' - 3, 7);
  assert.equal('10' * '2', 20);
  assert.equal('10' / '2', 5);
  assert.equal('hello' - 1, NaN);
});

test('explicit conversion', () => {
  assert.equal(Number('42'), 42);
  assert.equal(Number(''), 0);
  assert.equal(Number('abc'), NaN);
  assert.equal(String(42), '42');
  assert.equal(Boolean(0), false);
  assert.equal(Boolean(''), false);
  assert.equal(Boolean('false'), true); // non-empty string is truthy
});

test('truthy and falsy values', () => {
  const falsy = [false, 0, -0, 0n, '', null, undefined, NaN];
  for (const v of falsy) {
    assert.equal(Boolean(v), false);
  }
  assert.equal(Boolean('0'), true);  // non-empty string
  assert.equal(Boolean([]), true);   // empty array is truthy
  assert.equal(Boolean({}), true);   // empty object is truthy
});

// ── Expressions vs Statements ───────────────────────────────

test('expressions produce values', () => {
  assert.equal(typeof (2 + 2), 'number');
  assert.equal(typeof ('hello'), 'string');
  assert.equal(typeof (x => x * 2), 'function');
});

test('statements do not produce values', () => {
  // if, for, while are statements — can't assign them
  // But function declarations are statements too
  function works() { return 1; }
  assert.equal(works(), 1);
});

// ── Strict Mode ─────────────────────────────────────────────

test('strict mode prevents undeclared variables', () => {
  'use strict';
  let threw = false;
  try {
    eval('undeclaredVar = 42;');
  } catch {
    threw = true;
  }
  assert.equal(threw, true);
});

test('strict mode makes this undefined in plain functions', () => {
  'use strict';
  function showThis() {
    return typeof this;
  }
  // In sloppy mode, this would be 'object' (global/window)
  // In strict mode, this is undefined
  // We test inside eval so 'use strict' at module scope applies
  assert.equal(showThis.call(undefined), 'undefined');
});

// ── Optional Chaining & Nullish Coalescing ──────────────────

test('optional chaining prevents TypeError', () => {
  const obj = null;
  // Without optional chaining: obj?.property -> undefined instead of crash
  assert.equal(obj?.property, undefined);
  assert.equal(obj?.nested?.value, undefined);
});

test('optional chaining works with function calls', () => {
  const obj = { fn: () => 'result' };
  assert.equal(obj.fn?.(), 'result');
  const empty = {};
  assert.equal(empty.fn?.(), undefined);
});

test('nullish coalescing ?? picks value for null/undefined only', () => {
  assert.equal(null ?? 'default', 'default');
  assert.equal(undefined ?? 'default', 'default');
  assert.equal(0 ?? 'default', 0);     // 0 is not nullish
  assert.equal('' ?? 'default', '');   // '' is not nullish
  assert.equal(false ?? 'default', false);
});

test('?? vs || — || treats all falsy as default', () => {
  assert.equal(0 || 'default', 'default');   // 0 is falsy
  assert.equal(0 ?? 'default', 0);           // 0 is not nullish
  assert.equal('' || 'default', 'default');
  assert.equal('' ?? 'default', '');
});

// ── Closure Exercises ───────────────────────────────────────

test('closure retains access to outer scope', () => {
  function makeCounter() {
    let count = 0;
    return function() {
      count += 1;
      return count;
    };
  }
  const counter = makeCounter();
  assert.equal(counter(), 1);
  assert.equal(counter(), 2);
  assert.equal(counter(), 3);
});

test('each closure has its own scope', () => {
  function makeCounter(start) {
    return function() {
      start += 1;
      return start;
    };
  }
  const a = makeCounter(10);
  const b = makeCounter(100);
  assert.equal(a(), 11);
  assert.equal(a(), 12);
  assert.equal(b(), 101);
  assert.equal(b(), 102);
  // a is still separate
  assert.equal(a(), 13);
});
