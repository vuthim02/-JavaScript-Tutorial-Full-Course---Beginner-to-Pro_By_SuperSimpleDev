import { test, assert } from './runner.js';

// Exercises for Module 07-async-js
// Topics: Promises, async/await, fetch, event loop, error handling

// --- Synchronous vs Asynchronous ---

test('console.log executes immediately (synchronous)', () => {
  let executed = false;
  Promise.resolve().then(() => { executed = true; });
  assert.equal(executed, false);
});

// --- Promises ---

test('Promise resolves with a value', async () => {
  const p = Promise.resolve(42);
  const result = await p;
  assert.equal(result, 42);
});

test('Promise.reject creates a rejected promise', async () => {
  const p = Promise.reject(new Error('fail'));
  try {
    await p;
    assert.fail('should have thrown');
  } catch (err) {
    assert.equal(err.message, 'fail');
  }
});

test('Promise.all resolves when all promises resolve', async () => {
  const p1 = Promise.resolve(1);
  const p2 = Promise.resolve(2);
  const p3 = Promise.resolve(3);
  const results = await Promise.all([p1, p2, p3]);
  assert.deepEqual(results, [1, 2, 3]);
});

test('Promise.all rejects if any promise rejects', async () => {
  const p1 = Promise.resolve(1);
  const p2 = Promise.reject(new Error('oops'));
  const p3 = Promise.resolve(3);
  try {
    await Promise.all([p1, p2, p3]);
    assert.fail('should have thrown');
  } catch (err) {
    assert.equal(err.message, 'oops');
  }
});

test('Promise.allSettled returns status for each promise', async () => {
  const p1 = Promise.resolve('ok');
  const p2 = Promise.reject(new Error('bad'));
  const results = await Promise.allSettled([p1, p2]);
  assert.equal(results[0].status, 'fulfilled');
  assert.equal(results[0].value, 'ok');
  assert.equal(results[1].status, 'rejected');
  assert.equal(results[1].reason.message, 'bad');
});

test('Promise.race returns first settled result', async () => {
  const fast = new Promise((resolve) => setTimeout(() => resolve('fast'), 10));
  const slow = new Promise((resolve) => setTimeout(() => resolve('slow'), 100));
  const result = await Promise.race([fast, slow]);
  assert.equal(result, 'fast');
});

// --- Async/Await ---

test('async function returns a promise', () => {
  async function getValue() { return 42; }
  const result = getValue();
  assert.equal(result instanceof Promise, true);
});

test('await unwraps a promise value', async () => {
  async function getValue() { return 'hello'; }
  const result = await getValue();
  assert.equal(result, 'hello');
});

test('async function can catch errors with try/catch', async () => {
  async function fail() {
    throw new Error('boom');
  }
  try {
    await fail();
    assert.fail('should have thrown');
  } catch (err) {
    assert.equal(err.message, 'boom');
  }
});

// --- Promise Chaining ---

test('then chains transform values sequentially', async () => {
  const result = await Promise.resolve(1)
    .then((x) => x + 1)
    .then((x) => x * 3)
    .then((x) => x - 1);
  assert.equal(result, 5);
});

test('catch handles errors in a chain', async () => {
  const result = await Promise.resolve(1)
    .then(() => { throw new Error('chain error'); })
    .catch(() => 99);
  assert.equal(result, 99);
});

test('finally runs regardless of success or failure', async () => {
  let finallyRan = false;
  await Promise.resolve(1)
    .then(() => { throw new Error('err'); })
    .catch(() => {})
    .finally(() => { finallyRan = true; });
  assert.equal(finallyRan, true);
});

// --- setTimeout / Event Loop ---

test('setTimeout defers execution', async () => {
  let value = 'before';
  await new Promise((resolve) => {
    setTimeout(() => {
      value = 'after';
      resolve();
    }, 10);
  });
  assert.equal(value, 'after');
});

test('microtasks run before macrotasks', async () => {
  const order = [];
  order.push('start');

  setTimeout(() => order.push('macro'), 0);
  Promise.resolve().then(() => order.push('micro'));

  // Wait for macrotask to complete
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.deepEqual(order, ['start', 'micro', 'macro']);
});

// --- Error Handling ---

test('unhandled rejection can be caught with unhandledrejection', (done) => {
  const handler = (event) => {
    event.preventDefault();
    window.removeEventListener('unhandledrejection', handler);
    done();
  };
  window.addEventListener('unhandledrejection', handler);
  Promise.reject(new Error('test'));
});

test('aggregateError collects multiple errors', async () => {
  const errors = [new Error('a'), new Error('b')];
  try {
    await Promise.any([
      Promise.reject(errors[0]),
      Promise.reject(errors[1]),
    ]);
    assert.fail('should have thrown');
  } catch (err) {
    assert.equal(err instanceof AggregateError, true);
    assert.equal(err.errors.length, 2);
  }
});
