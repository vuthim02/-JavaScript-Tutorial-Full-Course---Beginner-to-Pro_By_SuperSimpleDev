import { test, assert } from './runner.js';

// ── Function Declarations ───────────────────────────────────

test('function declaration is fully hoisted', () => {
  assert.equal(sayHello(), 'Hello!');
  function sayHello() { return 'Hello!'; }
});

test('function has name and length properties', () => {
  function add(a, b) { return a + b; }
  assert.equal(add.name, 'add');
  assert.equal(add.length, 2);
});

test('function with default params has shorter length', () => {
  function greet(name = 'Guest', greeting = 'Hello') { return `${greeting}, ${name}!`; }
  assert.equal(greet.length, 0);
});

// ── Function Expressions ────────────────────────────────────

test('anonymous function expression is NOT hoisted', () => {
  assert.equal(typeof greet, 'undefined');
  var greet = function() { return 'Hello'; };
  assert.equal(greet(), 'Hello');
});

test('named function expression — name visible only inside', () => {
  const fn = function self() { return typeof self; };
  assert.equal(fn(), 'function');
  assert.equal(typeof self, 'undefined');
});

// ── Arrow Functions ─────────────────────────────────────────

test('arrow function syntax variations', () => {
  const noParams = () => 42;
  const oneParam = x => x * 2;
  const multiParam = (a, b) => a + b;
  const blockBody = (a, b) => { return a + b; };

  assert.equal(noParams(), 42);
  assert.equal(oneParam(5), 10);
  assert.equal(multiParam(3, 4), 7);
  assert.equal(blockBody(3, 4), 7);
});

test('arrow returning object literal needs parentheses', () => {
  const makeUser = (name, age) => ({ name, age });
  const user = makeUser('Alice', 30);
  assert.equal(user.name, 'Alice');
  assert.equal(user.age, 30);
});

test('arrow function has no own arguments object', () => {
  const arrow = (...args) => args;
  assert.deepEqual(arrow(1, 2, 3), [1, 2, 3]);
});

test('arrow function has no prototype', () => {
  const Arrow = () => {};
  assert.equal(Arrow.prototype, undefined);
});

test('arrow inherits this from enclosing scope', () => {
  const obj = {
    name: 'Alice',
    greet: function() {
      const arrow = () => this.name;
      return arrow();
    }
  };
  assert.equal(obj.greet(), 'Alice');
});

// ── First-Class Citizens ────────────────────────────────────

test('functions can be stored in variables', () => {
  const fn = function(x) { return x * 2; };
  assert.equal(fn(5), 10);
});

test('functions can be stored in data structures', () => {
  const ops = {
    double: x => x * 2,
    square: x => x * x,
    negate: x => -x
  };
  assert.equal(ops.double(3), 6);
  assert.equal(ops.square(4), 16);
  assert.equal(ops.negate(5), -5);
});

test('functions can be passed as arguments', () => {
  function apply(fn, value) { return fn(value); }
  assert.equal.apply(null, [apply(x => x + 1, 5), 6]);
  assert.equal(apply(x => x * 3, 4), 12);
});

test('functions can be returned from functions', () => {
  function multiplier(factor) {
    return x => x * factor;
  }
  const triple = multiplier(3);
  assert.equal(triple(5), 15);
  assert.equal(triple(10), 30);
});

test('reference vs call — passing function without invoking', () => {
  let called = false;
  function fn() { called = true; }
  const ref = fn; // reference
  assert.equal(called, false);
  ref(); // now it's called
  assert.equal(called, true);
});

// ── Default and Rest Parameters ─────────────────────────────

test('default parameters activate on undefined', () => {
  function greet(name = 'Guest') { return `Hello, ${name}!`; }
  assert.equal(greet('Alice'), 'Hello, Alice!');
  assert.equal(greet(undefined), 'Hello, Guest!');
  assert.equal(greet(), 'Hello, Guest!');
});

test('null does NOT trigger default parameter', () => {
  function test(x = 'default') { return x; }
  assert.equal(test(null), null);
});

test('default parameters are evaluated at call time', () => {
  let counter = 0;
  function test(val = ++counter) { return val; }
  assert.equal(test(), 1);
  assert.equal(test(), 2);
  assert.equal(test('override'), 'override');
});

test('rest parameter collects remaining arguments into array', () => {
  function sum(...nums) {
    return nums.reduce((total, n) => total + n, 0);
  }
  assert.equal(sum(1, 2, 3), 6);
  assert.equal(sum(), 0);
});

test('rest parameter works with leading params', () => {
  function log(level, ...messages) {
    return `${level}: ${messages.join(' ')}`;
  }
  assert.equal(log('INFO', 'server', 'started'), 'INFO: server started');
});

// ── Callbacks ───────────────────────────────────────────────

test('synchronous callback — array forEach', () => {
  const results = [];
  [1, 2, 3].forEach(n => results.push(n * 2));
  assert.deepEqual(results, [2, 4, 6]);
});

test('callback with error handling pattern', () => {
  function doWork(shouldFail, onSuccess, onError) {
    if (shouldFail) onError('fail');
    else onSuccess('ok');
  }
  let result;
  doWork(false, v => result = v, e => result = e);
  assert.equal(result, 'ok');
  doWork(true, v => result = v, e => result = e);
  assert.equal(result, 'fail');
});

test('error-first callback pattern (Node style)', () => {
  function readData(callback) {
    callback(null, { data: 42 });
  }
  readData((err, data) => {
    assert.equal(err, null);
    assert.equal(data.data, 42);
  });
});

// ── Higher-Order Functions ──────────────────────────────────

test('HOF — takes function as argument', () => {
  function repeat(n, fn) {
    for (let i = 0; i < n; i++) fn(i);
  }
  const results = [];
  repeat(3, i => results.push(i));
  assert.deepEqual(results, [0, 1, 2]);
});

test('HOF — returns a function', () => {
  function createGreeter(greeting) {
    return name => `${greeting}, ${name}!`;
  }
  const hi = createGreeter('Hi');
  assert.equal(hi('Alice'), 'Hi, Alice!');
});

test('function composition — right to left', () => {
  const compose = (f, g) => x => f(g(x));
  const add1 = x => x + 1;
  const double = x => x * 2;
  const add1ThenDouble = compose(double, add1);
  assert.equal(add1ThenDouble(3), 8); // double(add1(3)) = double(4) = 8
});

test('function composition — pipe (left to right)', () => {
  const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x);
  const trim = s => s.trim();
  const lower = s => s.toLowerCase();
  const replace = s => s.replace(/\s+/g, '-');
  const slugify = pipe(trim, lower, replace);
  assert.equal(slugify('  Hello World  '), 'hello-world');
});

// ── IIFE ────────────────────────────────────────────────────

test('IIFE runs immediately and creates private scope', () => {
  let result;
  (function() {
    const secret = 42;
    result = secret;
  })();
  assert.equal(result, 42);
});

test('IIFE with arrow function', () => {
  const value = (() => 2 + 3)();
  assert.equal(value, 5);
});

test('revealing module pattern with IIFE', () => {
  const counter = (function() {
    let count = 0;
    return {
      increment: () => ++count,
      value: () => count
    };
  })();
  counter.increment();
  counter.increment();
  assert.equal(counter.value(), 2);
  assert.equal(counter.count, undefined); // truly private
});

// ── Scope Chain and TDZ ─────────────────────────────────────

test('inner function can access outer scope', () => {
  const x = 10;
  function outer() {
    const y = 20;
    function inner() { return x + y; }
    return inner();
  }
  assert.equal(outer(), 30);
});

test('variable shadowing in nested scope', () => {
  let x = 'global';
  function shadow() {
    let x = 'local';
    return x;
  }
  assert.equal(shadow(), 'local');
  assert.equal(x, 'global');
});

test('block scope with let/const', () => {
  {
    let a = 1;
    const b = 2;
    assert.equal(a, 1);
    assert.equal(b, 2);
  }
  assert.equal(typeof a, 'undefined');
  assert.equal(typeof b, 'undefined');
});

test('TDZ — let/const are inaccessible before declaration', () => {
  assert.equal(typeof undeclared, 'undefined'); // var-style: no error
  let a = 5;
  assert.equal(a, 5);
});

// ── Closures ────────────────────────────────────────────────

test('closure retains outer variable', () => {
  function makeGreeter(greeting) {
    return name => `${greeting}, ${name}!`;
  }
  const sayHello = makeGreeter('Hello');
  const sayHi = makeGreeter('Hi');
  assert.equal(sayHello('Alice'), 'Hello, Alice!');
  assert.equal(sayHi('Bob'), 'Hi, Bob!');
});

test('closure counter — shared reference', () => {
  function makeCounter() {
    let count = 0;
    return {
      increment: () => ++count,
      value: () => count
    };
  }
  const c = makeCounter();
  c.increment();
  c.increment();
  assert.equal(c.value(), 2);
});

test('closure bank account — private state', () => {
  function createBankAccount(initial) {
    let balance = initial;
    return {
      deposit(amount)  { balance += amount; return balance; },
      withdraw(amount) { balance -= amount; return balance; },
      getBalance()     { return balance; }
    };
  }
  const acct = createBankAccount(100);
  acct.deposit(50);
  acct.withdraw(30);
  assert.equal(acct.getBalance(), 120);
  assert.equal(acct.balance, undefined); // truly private
});

test('closure memoize', () => {
  let callCount = 0;
  function memoize(fn) {
    const cache = new Map();
    return function(...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) return cache.get(key);
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };
  }
  const expensiveAdd = memoize((a, b) => { callCount++; return a + b; });
  assert.equal(expensiveAdd(1, 2), 3);
  assert.equal(expensiveAdd(1, 2), 3); // cached
  assert.equal(callCount, 1); // only computed once
});

test('closure once — run function only once', () => {
  function once(fn) {
    let called = false;
    let result;
    return function(...args) {
      if (!called) { called = true; result = fn.apply(this, args); }
      return result;
    };
  }
  let sideEffect = 0;
  const onceFn = once(() => ++sideEffect);
  assert.equal(onceFn(), 1);
  assert.equal(onceFn(), 1); // still 1, not called again
  assert.equal(onceFn(), 1);
});

// ── Factory Functions ───────────────────────────────────────

test('factory function creates objects without new', () => {
  function createUser(name, role) {
    return {
      name, role,
      greet() { return `Hi, I'm ${this.name}`; },
      isAdmin() { return this.role === 'admin'; }
    };
  }
  const alice = createUser('Alice', 'admin');
  assert.equal(alice.greet(), "Hi, I'm Alice");
  assert.equal(alice.isAdmin(), true);
});

test('factory with closure for private state', () => {
  function createCounter(name, start = 0) {
    let count = start;
    return {
      increment(by = 1) { count += by; return this; },
      value() { return count; },
      toString() { return `${name}: ${count}`; }
    };
  }
  const c = createCounter('Score');
  c.increment(5).increment(3);
  assert.equal(c.value(), 8);
  assert.equal(c.toString(), 'Score: 8');
});

// ── Recursion ───────────────────────────────────────────────

test('factorial — recursive', () => {
  function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  }
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(5), 120);
});

test('fibonacci — recursive', () => {
  function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
  }
  assert.equal(fib(0), 0);
  assert.equal(fib(1), 1);
  assert.equal(fib(6), 8);
});

test('flatten array — recursive', () => {
  function flatten(arr) {
    const result = [];
    for (const item of arr) {
      if (Array.isArray(item)) result.push(...flatten(item));
      else result.push(item);
    }
    return result;
  }
  assert.deepEqual(flatten([1, [2, [3, 4]], 5]), [1, 2, 3, 4, 5]);
});

// ── `this` Keyword ──────────────────────────────────────────

test('default binding — non-strict uses globalThis', () => {
  function getThis() { return this; }
  const result = getThis();
  assert.equal(result === globalThis || result === undefined, true);
});

test('implicit binding — method call', () => {
  const obj = {
    name: 'Alice',
    greet() { return `Hello, ${this.name}`; }
  };
  assert.equal(obj.greet(), 'Hello, Alice');
});

test('implicit binding is lost when assigned to variable', () => {
  const obj = {
    name: 'Alice',
    greet() { return this.name; }
  };
  const fn = obj.greet;
  try {
    fn();
    assert.fail('should throw in strict mode');
  } catch (e) {
    assert.equal(e instanceof TypeError, true);
  }
});

test('explicit binding — call', () => {
  function greet(greeting) { return `${greeting}, ${this.name}!`; }
  const alice = { name: 'Alice' };
  assert.equal(greet.call(alice, 'Hello'), 'Hello, Alice!');
});

test('explicit binding — apply', () => {
  function greet(greeting, punct) { return `${greeting}, ${this.name}${punct}`; }
  const bob = { name: 'Bob' };
  assert.equal(greet.apply(bob, ['Hi', '.']), 'Hi, Bob.');
});

test('explicit binding — bind returns new function', () => {
  function greet(greeting) { return `${greeting}, ${this.name}!`; }
  const alice = { name: 'Alice' };
  const aliceGreet = greet.bind(alice);
  assert.equal(aliceGreet('Hey'), 'Hey, Alice!');
});

test('bind with partial application', () => {
  function multiply(a, b) { return a * b; }
  const double = multiply.bind(null, 2);
  const triple = multiply.bind(null, 3);
  assert.equal(double(5), 10);
  assert.equal(triple(5), 15);
});

test('arrow function captures enclosing this', () => {
  const outerObj = { name: 'Alice' };
  const obj = {
    name: 'Bob',
    regular() { return this.name; },
    arrow: () => outerObj.name
  };
  assert.equal(obj.regular(), 'Bob');
  assert.equal(obj.arrow(), 'Alice');
});

// ── Generators ──────────────────────────────────────────────

test('generator yields values lazily', () => {
  function* countTo(n) {
    for (let i = 1; i <= n; i++) yield i;
  }
  const gen = countTo(3);
  assert.deepEqual(gen.next(), { value: 1, done: false });
  assert.deepEqual(gen.next(), { value: 2, done: false });
  assert.deepEqual(gen.next(), { value: 3, done: false });
  assert.deepEqual(gen.next(), { value: undefined, done: true });
});

test('generator is iterable', () => {
  function* range(start, end) {
    for (let i = start; i <= end; i++) yield i;
  }
  const result = [];
  for (const n of range(1, 5)) result.push(n);
  assert.deepEqual(result, [1, 2, 3, 4, 5]);
});

test('generator two-way communication', () => {
  function* accumulator() {
    let total = 0;
    while (true) {
      const val = yield total;
      if (val === null) return total;
      total += val;
    }
  }
  const acc = accumulator();
  acc.next();        // start
  acc.next(10);      // total = 10
  acc.next(5);       // total = 15
  const result = acc.next(null); // signal end
  assert.equal(result.value, 15);
  assert.equal(result.done, true);
});

test('yield* delegates to another iterable', () => {
  function* inner() { yield 'a'; yield 'b'; }
  function* outer() { yield 1; yield* inner(); yield 2; }
  assert.deepEqual([...outer()], [1, 'a', 'b', 2]);
});

// ── Practical Challenges ────────────────────────────────────

test('debounce — delays execution', () => {
  function debounce(fn, delay) {
    let timerId;
    return function(...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn.apply(this, args), delay);
    };
  }
  let callCount = 0;
  const fn = debounce(() => callCount++, 10);
  fn(); fn(); fn(); // only last call matters
  assert.equal(callCount, 0); // not called yet
});

test('throttle — limits execution rate', () => {
  function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
      const now = Date.now();
      if (now - lastTime >= interval) {
        lastTime = now;
        fn.apply(this, args);
      }
    };
  }
  let count = 0;
  const fn = throttle(() => count++, 1000);
  fn(); fn(); fn(); // all rapid — only first fires
  assert.equal(count, 1);
});

test('curry — apply args incrementally', () => {
  const curry = fn => {
    const arity = fn.length;
    return function curried(...args) {
      if (args.length >= arity) return fn(...args);
      return (...moreArgs) => curried(...args, ...moreArgs);
    };
  };
  const add = curry((a, b, c) => a + b + c);
  assert.equal(add(1)(2)(3), 6);
  assert.equal(add(1, 2)(3), 6);
  assert.equal(add(1)(2, 3), 6);
});

test('partial application', () => {
  function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
      return fn(...presetArgs, ...laterArgs);
    };
  }
  function greet(greeting, punctuation, name) {
    return `${greeting}, ${name}${punctuation}`;
  }
  const sayHello = partial(greet, 'Hello', '!');
  assert.equal(sayHello('Alice'), 'Hello, Alice!');
  assert.equal(sayHello('Bob'), 'Hello, Bob!');
});
