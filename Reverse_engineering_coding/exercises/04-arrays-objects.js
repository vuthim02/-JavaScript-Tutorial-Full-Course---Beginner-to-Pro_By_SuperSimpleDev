import { test, assert } from './runner.js';

// ── Array Basics ───────────────────────────────────────────

test('array literals and indexing', () => {
  const arr = [10, 20, 30];
  assert.equal(arr[0], 10);
  assert.equal(arr[2], 30);
  assert.equal(arr[100], undefined);
});

test('array length and truncation', () => {
  const arr = [1, 2, 3, 4, 5];
  assert.equal(arr.length, 5);
  arr.length = 3;
  assert.deepEqual(arr, [1, 2, 3]);
});

test('sparse arrays', () => {
  const sparse = [];
  sparse[0] = 'a';
  sparse[5] = 'b';
  assert.equal(sparse.length, 6);
  assert.equal(sparse[1], undefined);
  assert.equal('1' in sparse, false); // index 1 doesn't exist
});

// ── Array Methods ──────────────────────────────────────────

test('push adds to end, pop removes from end', () => {
  const stack = [];
  stack.push(1);
  stack.push(2);
  stack.push(3);
  assert.equal(stack.pop(), 3);
  assert.equal(stack.pop(), 2);
  assert.deepEqual(stack, [1]);
});

test('unshift adds to front, shift removes from front', () => {
  const q = [2];
  q.unshift(1);
  assert.deepEqual(q, [1, 2]);
  assert.equal(q.shift(), 1);
  assert.deepEqual(q, [2]);
});

test('map returns new transformed array', () => {
  const nums = [1, 2, 3];
  const doubled = nums.map(n => n * 2);
  assert.deepEqual(doubled, [2, 4, 6]);
  assert.deepEqual(nums, [1, 2, 3]); // original unchanged
});

test('filter selects matching elements', () => {
  const nums = [1, 2, 3, 4, 5];
  const evens = nums.filter(n => n % 2 === 0);
  assert.deepEqual(evens, [2, 4]);
});

test('reduce accumulates values', () => {
  const nums = [1, 2, 3, 4];
  const sum = nums.reduce((acc, n) => acc + n, 0);
  assert.equal(sum, 10);
  const product = nums.reduce((acc, n) => acc * n, 1);
  assert.equal(product, 24);
});

test('find returns first match or undefined', () => {
  const nums = [5, 12, 8, 130, 44];
  assert.equal(nums.find(n => n > 10), 12);
  assert.equal(nums.find(n => n > 200), undefined);
});

test('some and every', () => {
  const nums = [1, 2, 3, 4, 5];
  assert.equal(nums.some(n => n > 4), true);
  assert.equal(nums.some(n => n > 10), false);
  assert.equal(nums.every(n => n > 0), true);
  assert.equal(nums.every(n => n > 3), false);
});

test('includes and indexOf', () => {
  const arr = [1, 2, 3, 2, 1];
  assert.equal(arr.includes(2), true);
  assert.equal(arr.includes(99), false);
  assert.equal(arr.indexOf(2), 1);
  assert.equal(arr.indexOf(99), -1);
  assert.equal(arr.lastIndexOf(2), 3);
});

test('flat flattens nested arrays', () => {
  const nested = [1, [2, [3, [4]]]];
  assert.deepEqual(nested.flat(1), [1, 2, [3, [4]]]);
  assert.deepEqual(nested.flat(2), [1, 2, 3, [4]]);
  assert.deepEqual(nested.flat(Infinity), [1, 2, 3, 4]);
});

test('sort mutates and returns the array', () => {
  const arr = [3, 1, 4, 1, 5, 9];
  arr.sort((a, b) => a - b);
  assert.deepEqual(arr, [1, 1, 3, 4, 5, 9]);
});

// ── Object Manipulation ────────────────────────────────────

test('object property access', () => {
  const obj = { name: 'Alice', age: 30 };
  assert.equal(obj.name, 'Alice');
  assert.equal(obj['age'], 30);
  assert.equal(obj.salary, undefined);
});

test('object.keys, values, entries', () => {
  const obj = { a: 1, b: 2, c: 3 };
  assert.deepEqual(Object.keys(obj), ['a', 'b', 'c']);
  assert.deepEqual(Object.values(obj), [1, 2, 3]);
  assert.deepEqual(Object.entries(obj), [['a', 1], ['b', 2], ['c', 3]]);
});

test('object spread creates shallow copy', () => {
  const original = { x: 1, y: 2 };
  const copy = { ...original, z: 3 };
  assert.deepEqual(copy, { x: 1, y: 2, z: 3 });
  assert.notEqual(copy, original); // different reference
});

// ── Reference vs Value ─────────────────────────────────────

test('objects are shared by reference', () => {
  const a = { value: 10 };
  const b = a;
  b.value = 20;
  assert.equal(a.value, 20); // mutation through shared reference
});

test('primitives are copied by value', () => {
  let x = 10;
  let y = x;
  y = 20;
  assert.equal(x, 10); // x is unchanged
  assert.equal(y, 20);
});

// ── Destructuring ──────────────────────────────────────────

test('array destructuring', () => {
  const [first, second, ...rest] = [1, 2, 3, 4, 5];
  assert.equal(first, 1);
  assert.equal(second, 2);
  assert.deepEqual(rest, [3, 4, 5]);
});

test('object destructuring with rename', () => {
  const user = { name: 'Bob', age: 25 };
  const { name: userName, age: userAge } = user;
  assert.equal(userName, 'Bob');
  assert.equal(userAge, 25);
});

// ── Spread vs Rest ─────────────────────────────────────────

test('spread merges arrays', () => {
  const a = [1, 2];
  const b = [3, 4];
  const merged = [...a, ...b];
  assert.deepEqual(merged, [1, 2, 3, 4]);
});

test('spread merges objects (last wins)', () => {
  const defaults = { theme: 'light', lang: 'en' };
  const overrides = { theme: 'dark' };
  const config = { ...defaults, ...overrides };
  assert.deepEqual(config, { theme: 'dark', lang: 'en' });
});

// ── Practical: Array Challenges ────────────────────────────

test('chaining: filter then map', () => {
  const nums = [1, 2, 3, 4, 5, 6];
  const result = nums
    .filter(n => n % 2 === 0)     // [2, 4, 6]
    .map(n => n * 10);             // [20, 40, 60]
  assert.deepEqual(result, [20, 40, 60]);
});

test('groupBy with reduce', () => {
  const items = [
    { type: 'fruit', name: 'apple' },
    { type: 'fruit', name: 'banana' },
    { type: 'veggie', name: 'carrot' },
  ];
  const grouped = items.reduce((acc, item) => {
    (acc[item.type] = acc[item.type] || []).push(item.name);
    return acc;
  }, {});
  assert.deepEqual(grouped, {
    fruit: ['apple', 'banana'],
    veggie: ['carrot'],
  });
});
