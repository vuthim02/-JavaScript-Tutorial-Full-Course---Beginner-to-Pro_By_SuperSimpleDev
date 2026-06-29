# Level 85: Module 17 – Test Coverage & Advanced Testing

## Error Snippets (70)

### Error 1: Not testing boundary conditions
**Description:** Only testing normal values, not min/max boundaries
```javascript
function isAdult(age) {
  return age >= 18;
}
it('checks adult', () => {
  expect(isAdult(20)).toBe(true);
});
```
### Error 2: Not testing empty states
**Description:** Never testing with empty arrays or strings
```javascript
function firstElement(arr) {
  return arr[0];
}
it('returns first element', () => {
  expect(firstElement([1, 2, 3])).toBe(1);
});
```
### Error 3: Not testing null inputs
**Description:** Function crashes when given null
```javascript
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
it('capitalizes string', () => {
  expect(capitalize('hello')).toBe('Hello');
});
```
### Error 4: Testing coverage without actually covering branches
**Description:** All branches not tested despite overall coverage
```javascript
function getDiscount(price, isMember) {
  if (isMember) return price * 0.9;
  return price;
}
it('discount for members', () => {
  expect(getDiscount(100, true)).toBe(90);
});
```
### Error 5: Not testing error paths
**Description:** Only testing happy path, never catch blocks
```javascript
function parseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}
it('parses valid JSON', () => {
  expect(parseJSON('{"a":1}')).toEqual({ a: 1 });
});
```
### Error 6: Assuming test coverage equals quality
**Description:** High coverage but tests don't verify behavior
```javascript
it('test function', () => {
  const result = myFunction(1, 2);
  expect(result).toBeDefined();
});
```
### Error 7: Not testing edge case large inputs
**Description:** Function breaks with very large inputs
```javascript
function sumArray(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
it('sums array', () => {
  expect(sumArray([1, 2, 3])).toBe(6);
});
```
### Error 8: Not testing negative values
**Description:** Function assumes positive numbers only
```javascript
function sqrt(value) {
  return Math.sqrt(value);
}
it('calculates square root', () => {
  expect(sqrt(9)).toBe(3);
});
```
### Error 9: Not testing with undefined inputs
**Description:** Function crashes with undefined
```javascript
function greet(name) {
  return `Hello ${name.toUpperCase()}`;
}
it('greets user', () => {
  expect(greet('Alice')).toBe('Hello ALICE');
});
```
### Error 10: Not testing NaN inputs
**Description:** Function returns NaN silently
```javascript
function double(n) {
  return n * 2;
}
it('doubles number', () => {
  expect(double(5)).toBe(10);
});
```
### Error 11: Testing all combinations exhaustively
**Description:** Too many test cases without strategic coverage
```javascript
it('adds numbers', () => {
  for (let i = 0; i < 1000; i++) {
    expect(add(i, 1)).toBe(i + 1);
  }
});
```
### Error 12: Not testing function with no arguments
**Description:** Function breaks when called with no arguments
```javascript
function multiply(a, b) {
  return a * b;
}
it('multiplies', () => {
  expect(multiply(2, 3)).toBe(6);
});
```
### Error 13: Not testing type coercion edge cases
**Description:** Function behaves differently with string numbers
```javascript
function add(a, b) {
  return a + b;
}
it('adds numbers', () => {
  expect(add(1, 2)).toBe(3);
});
```
### Error 14: Not testing with special characters
**Description:** Function fails with special characters
```javascript
function sanitize(input) {
  return input.replace(/</g, '&lt;');
}
it('sanitizes input', () => {
  expect(sanitize('hello')).toBe('hello');
});
```
### Error 15: Not testing Unicode input
**Description:** Function breaks with Unicode characters
```javascript
function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-');
}
it('slugifies text', () => {
  expect(slugify('Hello World')).toBe('hello-world');
});
```
### Error 16: Not testing recursion base case
**Description:** Recursive function not tested at the base case
```javascript
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
it('calculates factorial', () => {
  expect(factorial(5)).toBe(120);
});
```
### Error 17: Not testing with Boolean inputs
**Description:** Function receives boolean but expects other type
```javascript
function isEven(n) {
  return n % 2 === 0;
}
it('checks even', () => {
  expect(isEven(4)).toBe(true);
});
```
### Error 18: Not testing excessive whitespace
**Description:** Function doesn't handle extra whitespace
```javascript
function trimName(name) {
  return name.trim();
}
it('trims name', () => {
  expect(trimName('Alice')).toBe('Alice');
});
```
### Error 19: Not testing concurrent modifications
**Description:** Race conditions not covered
```javascript
class Counter {
  constructor() { this.count = 0; }
  increment() { this.count++; }
}
it('increments counter', () => {
  const c = new Counter();
  c.increment();
  expect(c.count).toBe(1);
});
```
### Error 20: Not testing with prototype pollution
**Description:** Tests don't cover prototype pollution vulnerabilities
```javascript
function merge(target, source) {
  for (const key in source) target[key] = source[key];
  return target;
}
it('merges objects', () => {
  expect(merge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
});
```
### Error 21: Test only covering first branch of if-else
**Description:** Only testing the if branch, not the else
```javascript
function getStatus(score) {
  if (score >= 60) return 'pass';
  else return 'fail';
}
it('passes', () => {
  expect(getStatus(75)).toBe('pass');
});
```
### Error 22: Not testing default parameters
**Description:** Not verifying default parameter behavior
```javascript
function greet(name = 'Guest') {
  return `Hello ${name}`;
}
it('greets by name', () => {
  expect(greet('Alice')).toBe('Hello Alice');
});
```
### Error 23: Not testing spread operator edge cases
**Description:** Tests don't cover empty spread
```javascript
function combine(...args) {
  return args.reduce((a, b) => a + b, 0);
}
it('combines numbers', () => {
  expect(combine(1, 2, 3)).toBe(6);
});
```
### Error 24: Not testing destructuring defaults
**Description:** Destructured parameters with defaults not tested
```javascript
function createUser({ name = 'Anonymous', age = 0 } = {}) {
  return { name, age };
}
it('creates user with name', () => {
  expect(createUser({ name: 'Alice' }).name).toBe('Alice');
});
```
### Error 25: Not testing short-circuit evaluation
**Description:** Not testing cases where short-circuit matters
```javascript
function getDisplayName(user) {
  return user.name || user.email || 'Unknown';
}
it('gets display name', () => {
  expect(getDisplayName({ name: 'Alice' })).toBe('Alice');
});
```
### Error 26: Not testing ternary operator branches
**Description:** Only one branch of ternary is tested
```javascript
function getFee(isMember) {
  return isMember ? 10 : 20;
}
it('member fee', () => {
  expect(getFee(true)).toBe(10);
});
```
### Error 27: Not testing switch statement cases
**Description:** Not covering all switch cases
```javascript
function getColor(code) {
  switch (code) {
    case 'R': return 'Red';
    case 'G': return 'Green';
    case 'B': return 'Blue';
    default: return 'Unknown';
  }
}
it('red color', () => {
  expect(getColor('R')).toBe('Red');
});
```
### Error 28: Not testing for loop boundary
**Description:** Loop off-by-one errors not detected
```javascript
function createRange(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) result.push(i);
  return result;
}
it('creates range', () => {
  expect(createRange(1, 3)).toEqual([1, 2, 3]);
});
```
### Error 29: Not testing while loop exit condition
**Description:** Infinite loop risk not tested
```javascript
function countDown(n) {
  const result = [];
  while (n > 0) result.push(n--);
  return result;
}
it('counts down', () => {
  expect(countDown(3)).toEqual([3, 2, 1]);
});
```
### Error 30: Not testing callback edge cases
**Description:** Callback called with wrong number of arguments
```javascript
function forEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) callback(arr[i], i, arr);
}
it('iterates array', () => {
  const spy = jasmine.createSpy();
  forEach([1, 2], spy);
  expect(spy).toHaveBeenCalledTimes(2);
});
```
### Error 31: Not testing array-like objects
**Description:** Function only works with real arrays, not array-like
```javascript
function toArray(args) {
  return Array.prototype.slice.call(args);
}
it('converts to array', () => {
  expect(toArray([1, 2, 3])).toEqual([1, 2, 3]);
});
```
### Error 32: Not testing prototype chain lookups
**Description:** Not testing inherited property access
```javascript
function hasProperty(obj, key) {
  return obj[key] !== undefined;
}
it('checks property', () => {
  const obj = { a: 1 };
  expect(hasProperty(obj, 'a')).toBe(true);
});
```
### Error 33: Not testing symbol-keyed properties
**Description:** Symbol-keyed properties not tested
```javascript
const sym = Symbol('key');
const obj = { [sym]: 'secret' };
it('accesses symbol', () => {
  expect(obj[sym]).toBe('secret');
});
```
### Error 34: Not testing getter/setter side effects
**Description:** Getters with side effects need coverage
```javascript
class User {
  constructor() { this._name = ''; this.log = []; }
  get name() { return this._name; }
  set name(val) { this._name = val; this.log.push(`set: ${val}`); }
}
it('sets name', () => {
  const u = new User();
  u.name = 'Alice';
  expect(u.name).toBe('Alice');
});
```
### Error 35: Not testing exception in catch block
**Description:** The catch block itself could throw
```javascript
function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    throw new Error('Parse failed');
  }
}
it('parses valid', () => {
  expect(safeParse('{}')).toEqual({});
});
```
### Error 36: Not testing finally block
**Description:** finally block cleanup not verified
```javascript
function processWithCleanup(data) {
  let cleaned = false;
  try {
    return process(data);
  } finally {
    cleaned = true;
  }
}
it('processes data', () => {
  expect(processWithCleanup({})).toBeDefined();
});
```
### Error 37: Not testing nested ternary
**Description:** Multiple levels of ternary not covered
```javascript
function getPrice(type, isNew) {
  return type === 'book' ? (isNew ? 20 : 10) : (isNew ? 100 : 50);
}
it('book price', () => {
  expect(getPrice('book', true)).toBe(20);
});
```
### Error 38: Not testing logical operator precedence
**Description:** Tests don't verify operator precedence
```javascript
function canAccess(age, isMember, isAdmin) {
  return age >= 18 && isMember || isAdmin;
}
it('admin access', () => {
  expect(canAccess(20, false, true)).toBe(true);
});
```
### Error 39: Not testing comma operator
**Description:** Comma operator behavior not tested
```javascript
function processAndReturn(x) {
  return (doSideEffect(x), x * 2);
}
it('processes and returns', () => {
  expect(processAndReturn(5)).toBe(10);
});
```
### Error 40: Not testing with frozen objects
**Description:** Function mutates frozen objects
```javascript
function addProperty(obj, key, value) {
  obj[key] = value;
  return obj;
}
it('adds property', () => {
  expect(addProperty({}, 'a', 1)).toEqual({ a: 1 });
});
```
### Error 41: Not testing sealed objects
**Description:** Object.seal behavior not tested
```javascript
function configure(obj, key, value) {
  obj[key] = value;
  return obj;
}
it('configures object', () => {
  expect(configure({ a: 1 }, 'a', 2)).toEqual({ a: 2 });
});
```
### Error 42: Not testing with non-extensible objects
**Description:** Object.preventExtensions not tested
```javascript
function extend(obj, key, value) {
  obj[key] = value;
  return obj;
}
it('extends object', () => {
  expect(extend({}, 'a', 1)).toEqual({ a: 1 });
});
```
### Error 43: Not testing getter that throws
**Description:** Getter throws but test doesn't catch it
```javascript
class Config {
  get secret() {
    throw new Error('Access denied');
  }
}
it('accesses config', () => {
  const c = new Config();
  expect(c.secret).toBeDefined();
});
```
### Error 44: Not testing setter validation
**Description:** Setter allows invalid values
```javascript
class Temperature {
  constructor() { this._celsius = 0; }
  set celsius(value) {
    this._celsius = value;
  }
  get celsius() { return this._celsius; }
}
it('sets temperature', () => {
  const t = new Temperature();
  t.celsius = 25;
  expect(t.celsius).toBe(25);
});
```
### Error 45: Not testing Symbol.toPrimitive
**Description:** Object-to-primitive conversion not tested
```javascript
class Money {
  constructor(value) { this.value = value; }
  [Symbol.toPrimitive](hint) {
    return hint === 'string' ? `$${this.value}` : this.value;
  }
}
it('formats money', () => {
  const m = new Money(50);
  expect(String(m)).toBe('$50');
});
```
### Error 46: Not testing async generator edge cases
**Description:** Async generators not fully tested
```javascript
async function* range(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
it('creates range', async () => {
  const gen = range(1, 3);
  expect((await gen.next()).value).toBe(1);
});
```
### Error 47: Not testing proxy traps
**Description:** Proxy handler traps not covered
```javascript
const handler = {
  get(target, prop) {
    return prop in target ? target[prop] : 'default';
  }
};
const proxy = new Proxy({ a: 1 }, handler);
it('proxy get', () => {
  expect(proxy.a).toBe(1);
});
```
### Error 48: Not testing Reflect API behavior
**Description:** Reflect-based operations not tested
```javascript
function getProperty(obj, key) {
  return Reflect.get(obj, key);
}
it('gets property', () => {
  expect(getProperty({ a: 1 }, 'a')).toBe(1);
});
```
### Error 49: Not testing dynamic property access
**Description:** Bracket notation with variable not tested
```javascript
function getByKey(obj, key) {
  return obj[key];
}
it('gets by key', () => {
  expect(getByKey({ name: 'Alice' }, 'name')).toBe('Alice');
});
```
### Error 50: Not testing constructor return value
**Description:** Constructor that returns a different object
```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
  }
}
it('creates singleton', () => {
  const a = new Singleton();
  const b = new Singleton();
  expect(a).toBe(b);
});
```
### Error 51: Not testing with document.all
**Description:** Legacy browser objects not considered
```javascript
function isDefined(value) {
  return value !== undefined && value !== null;
}
it('checks defined', () => {
  expect(isDefined(0)).toBe(true);
});
```
### Error 52: Not testing sparse arrays
**Description:** Arrays with holes not tested
```javascript
function processArray(arr) {
  return arr.map(x => x * 2);
}
it('processes array', () => {
  expect(processArray([1, , 3])).toEqual([2, , 6]);
});
```
### Error 53: Not testing array index edge cases
**Description:** Out-of-bounds access not covered
```javascript
function safeGet(arr, index) {
  return arr[index];
}
it('gets element', () => {
  expect(safeGet([1, 2, 3], 1)).toBe(2);
});
```
### Error 54: Not testing negative array indices
**Description:** Negative indices not supported like Python
```javascript
function lastElement(arr) {
  return arr[arr.length - 1];
}
it('gets last', () => {
  expect(lastElement([1, 2, 3])).toBe(3);
});
```
### Error 55: Not testing array buffer/typed arrays
**Description:** Typed array edge cases not tested
```javascript
function sumTypedArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) sum += arr[i];
  return sum;
}
it('sums typed array', () => {
  const arr = new Uint8Array([1, 2, 3]);
  expect(sumTypedArray(arr)).toBe(6);
});
```
### Error 56: Not testing Map with object keys
**Description:** Object keys in Map have reference semantics
```javascript
function createLookup(items) {
  const map = new Map();
  items.forEach(item => map.set(item.id, item));
  return map;
}
it('creates lookup', () => {
  const items = [{ id: 1, name: 'Alice' }];
  const map = createLookup(items);
  expect(map.get(1)).toBeDefined();
});
```
### Error 57: Not testing Set with NaN
**Description:** NaN is treated as equal to itself in Set
```javascript
function uniqueValues(arr) {
  return [...new Set(arr)];
}
it('finds unique', () => {
  expect(uniqueValues([1, 2, 2, 3])).toEqual([1, 2, 3]);
});
```
### Error 58: Not testing WeakMap/WeakSet
**Description:** Weak references in tests not covered
```javascript
function cacheResult(fn) {
  const cache = new WeakMap();
  return (obj) => {
    if (!cache.has(obj)) cache.set(obj, fn(obj));
    return cache.get(obj);
  };
}
it('caches result', () => {
  const fn = cacheResult(o => o.value * 2);
  expect(fn({ value: 5 })).toBe(10);
});
```
### Error 59: Not testing RegExp edge cases
**Description:** Regex with special flags not tested
```javascript
function extractEmails(text) {
  return text.match(/[\w.-]+@[\w.-]+\.\w+/g) || [];
}
it('extracts emails', () => {
  expect(extractEmails('contact@test.com')).toEqual(['contact@test.com']);
});
```
### Error 60: Not testing with null prototype objects
**Description:** Object.create(null) behavior not tested
```javascript
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
it('has own property', () => {
  expect(hasOwn({ a: 1 }, 'a')).toBe(true);
});
```
### Error 61: Not testing async iteration complete
**Description:** Async iterator return/throw not tested
```javascript
async function* asyncSequence() {
  yield 1;
  yield 2;
}
it('async sequence', async () => {
  const gen = asyncSequence();
  expect((await gen.next()).value).toBe(1);
});
```
### Error 62: Not testing BigInt values
**Description:** BigInt operations not tested
```javascript
function addLarge(a, b) {
  return a + b;
}
it('adds numbers', () => {
  expect(addLarge(1n, 2n)).toBe(3n);
});
```
### Error 63: Not testing Intl API
**Description:** Internationalization not tested
```javascript
function formatCurrency(amount, locale = 'en-US') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(amount);
}
it('formats currency', () => {
  expect(formatCurrency(50)).toBe('$50.00');
});
```
### Error 64: Not testing Temporal API
**Description:** Date/time operations edge cases not covered
```javascript
function getNextDay(date) {
  const next = new Date(date);
  next.setDate(next.getDate() + 1);
  return next;
}
it('gets next day', () => {
  const result = getNextDay(new Date('2026-01-01'));
  expect(result.getDate()).toBe(2);
});
```
### Error 65: Not testing with atob/btoa edge cases
**Description:** Base64 encoding edge cases not covered
```javascript
function encodeBase64(str) {
  return btoa(str);
}
it('encodes base64', () => {
  expect(encodeBase64('hello')).toBe('aGVsbG8=');
});
```
### Error 66: Not testing EncodedURI components
**Description:** URL encoding edge cases not tested
```javascript
function encodeQueryParam(value) {
  return encodeURIComponent(value);
}
it('encodes param', () => {
  expect(encodeQueryParam('hello world')).toBe('hello%20world');
});
```
### Error 67: Not testing structuredClone
**Description:** Modern deep clone edge cases not covered
```javascript
function cloneDeep(obj) {
  return structuredClone(obj);
}
it('clones object', () => {
  expect(cloneDeep({ a: 1 })).toEqual({ a: 1 });
});
```
### Error 68: Not testing at() method on arrays/strings
**Description:** Modern .at() method not tested with negative indices
```javascript
function getLastItem(arr) {
  return arr.at(-1);
}
it('gets last item', () => {
  expect(getLastItem([1, 2, 3])).toBe(3);
});
```
### Error 69: Not testing with hasOwnPropertyName
**Description:** Object.hasOwn() static method not tested
```javascript
function hasField(obj, field) {
  return Object.hasOwn(obj, field);
}
it('has field', () => {
  expect(hasField({ a: 1 }, 'a')).toBe(true);
});
```
### Error 70: Not testing error.cause chain
**Description:** Error chaining with cause not tested
```javascript
function throwWithCause() {
  try {
    JSON.parse('invalid');
  } catch (e) {
    throw new Error('Parse failed', { cause: e });
  }
}
it('throws with cause', () => {
  expect(() => throwWithCause()).toThrow();
});
```

## Issue Snippets (30)

### Issue 1: Checking only statement coverage
**Description:** Tests pass but branch and function coverage are low
```javascript
// Istanbul reports 100% statement coverage but only 50% branch
```
### Issue 2: Missing edge cases for boundary testing
**Description:** Not testing minimum and maximum values
```javascript
function validateAge(age) {
  return age >= 0 && age <= 150;
}
it('validates age', () => {
  expect(validateAge(25)).toBe(true);
});
```
### Issue 3: Not testing with real-world data shapes
**Description:** Test data is too simplified
```javascript
it('processes user data', () => {
  const result = processUser({ name: 'Alice' });
  expect(result).toBeDefined();
});
```
### Issue 4: Test coverage blind spot for async error paths
**Description:** Async errors paths not covered in coverage reports
```javascript
async function fetchData() {
  const res = await fetch('/api/data');
  return res.json();
}
it('fetches data', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
```
### Issue 5: Code coverage but no mutation testing
**Description:** Tests pass but don't detect logic errors
```javascript
function isEven(n) {
  return n % 2 === 0;
}
it('checks even', () => {
  expect(isEven(2)).toBe(true);
  expect(isEven(3)).toBe(false);
});
```
### Issue 6: Testing only public API, missing internal edge cases
**Description:** Internal helper functions have no coverage
```javascript
class Parser {
  parse(input) {
    return this._tokenize(input).map(this._parseToken);
  }
  _tokenize(input) { return input.split(' '); }
  _parseToken(token) { return token.toUpperCase(); }
}
it('parses input', () => {
  const p = new Parser();
  expect(p.parse('hello world')).toEqual(['HELLO', 'WORLD']);
});
```
### Issue 7: Not using code coverage thresholds
**Description:** Coverage dropping below threshold goes unnoticed
```javascript
// No coverage threshold in CI configuration
```
### Issue 8: Ignoring uncovered lines in coverage report
**Description:** Red lines in coverage report not addressed
```javascript
// /* istanbul ignore next */ used excessively
```
### Issue 9: Over-reliance on integration test coverage
**Description:** Integration tests cover code but with slow feedback
```javascript
// 90% coverage from integration tests, unit tests cover 10%
```
### Issue 10: Not testing error boundary conditions
**Description:** Error handling paths not covered
```javascript
function processWithRetry(fn, retries) {
  for (let i = 0; i < retries; i++) {
    try { return fn(); }
    catch (e) { if (i === retries - 1) throw e; }
  }
}
it('succeeds on first try', () => {
  const fn = jasmine.createSpy().and.returnValue('success');
  expect(processWithRetry(fn, 3)).toBe('success');
});
```
### Issue 11: Not testing all enum values
**Description:** Some enum values not covered
```javascript
const Status = { PENDING: 'pending', ACTIVE: 'active', INACTIVE: 'inactive', DELETED: 'deleted' };
function getStatusLabel(status) {
  const labels = { pending: 'Waiting', active: 'Active', inactive: 'Inactive', deleted: 'Removed' };
  return labels[status] || 'Unknown';
}
it('returns label', () => {
  expect(getStatusLabel('pending')).toBe('Waiting');
});
```
### Issue 12: Not testing with falsy values systematically
**Description:** Only testing truthy inputs
```javascript
function toBool(value) {
  return !!value;
}
it('converts to bool', () => {
  expect(toBool(1)).toBe(true);
});
```
### Issue 13: Missing edge case for array mutations during iteration
**Description:** Array modified during iteration not tested
```javascript
function filterInPlace(arr, predicate) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (!predicate(arr[i])) arr.splice(i, 1);
  }
  return arr;
}
it('filters array', () => {
  expect(filterInPlace([1, 2, 3, 4], n => n % 2 === 0)).toEqual([2, 4]);
});
```
### Issue 14: Not testing with default parameter variations
**Description:** Default parameters only tested with defaults
```javascript
function createConfig(timeout = 5000, retries = 3) {
  return { timeout, retries };
}
it('creates config', () => {
  expect(createConfig()).toEqual({ timeout: 5000, retries: 3 });
});
```
### Issue 15: Not covering short function returns
**Description:** Arrow function implicit returns not tested
```javascript
const double = x => x * 2;
it('doubles', () => {
  expect(double(5)).toBe(10);
});
```
### Issue 16: Not testing callback error parameter
**Description:** Error-first callbacks not tested
```javascript
function readConfig(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) return callback(err);
    callback(null, JSON.parse(data));
  });
}
it('reads config', (done) => {
  readConfig('/path/to/config.json', (err, data) => {
    expect(err).toBeNull();
    done();
  });
});
```
### Issue 17: Coverage not integrated with CI pipeline
**Description:** Coverage reports not generated in CI
```javascript
// No 'npm run coverage' in CI config
```
### Issue 18: Not testing performance edge cases
**Description:** Not testing with large datasets or many iterations
```javascript
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  arr.forEach(item => seen.has(item) ? duplicates.add(item) : seen.add(item));
  return [...duplicates];
}
it('finds duplicates', () => {
  expect(findDuplicates([1, 2, 2, 3, 3, 3])).toEqual([2, 3]);
});
```
### Issue 19: Missing tests for module initialization order
**Description:** Circular dependencies not tested
```javascript
// a.js imports b.js, b.js imports a.js
```
### Issue 20: Not testing environment-specific behavior
**Description:** Browser vs Node behavior not covered
```javascript
function getGlobal() {
  return typeof window !== 'undefined' ? window : global;
}
it('gets global object', () => {
  expect(getGlobal()).toBeDefined();
});
```
### Issue 21: Not testing deprecated API warnings
**Description:** Deprecation warnings not verified
```javascript
function oldMethod() {
  console.warn('Deprecated: use newMethod instead');
  return newMethod();
}
it('calls old method', () => {
  expect(oldMethod()).toBeDefined();
});
```
### Issue 22: Not covering fallthrough in switch
**Description:** Intentional fallthrough not tested
```javascript
function getDays(month) {
  switch (month) {
    case 4: case 6: case 9: case 11: return 30;
    case 2: return 28;
    default: return 31;
  }
}
it('gets days', () => {
  expect(getDays(4)).toBe(30);
});
```
### Issue 23: Not testing optional chaining edge cases
**Description:** Optional chaining with deeply nested props
```javascript
function getNestedConfig(obj) {
  return obj?.settings?.theme?.name ?? 'default';
}
it('gets config', () => {
  expect(getNestedConfig({ settings: { theme: { name: 'dark' } } })).toBe('dark');
});
```
### Issue 24: Not testing nullish coalescing
**Description:** ?? operator edge cases not covered
```javascript
function getPort(config) {
  return config.port ?? 3000;
}
it('gets port', () => {
  expect(getPort({ port: 0 })).toBe(0);
});
```
### Issue 25: Not covering logical assignment operators
**Description:** &&=, ||=, ??= operators not tested
```javascript
function setDefaults(config) {
  config.timeout ||= 5000;
  config.retries ??= 3;
  return config;
}
it('sets defaults', () => {
  expect(setDefaults({})).toEqual({ timeout: 5000, retries: 3 });
});
```
### Issue 26: Not testing for...of with various iterables
**Description:** Custom iterables not tested
```javascript
class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) yield i;
  }
}
it('iterates range', () => {
  const range = new Range(1, 3);
  expect([...range]).toEqual([1, 2, 3]);
});
```
### Issue 27: Not testing with template literal tags
**Description:** Tagged template literals not tested
```javascript
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ? `<mark>${values[i]}</mark>` : ''), '');
}
it('highlights', () => {
  expect(highlight`Hello ${'world'}`).toBe('Hello <mark>world</mark>');
});
```
### Issue 28: Not testing function.length and .name
**Description:** Function metadata not verified
```javascript
function createNamedFunction(name, fn) {
  Object.defineProperty(fn, 'name', { value: name });
  return fn;
}
it('creates named function', () => {
  const fn = createNamedFunction('myFunc', () => {});
  expect(fn.name).toBe('myFunc');
});
```
### Issue 29: Not covering tail call optimization
**Description:** Recursive functions not tested for stack overflow
```javascript
function sumRecursive(n, acc = 0) {
  if (n === 0) return acc;
  return sumRecursive(n - 1, acc + n);
}
it('sums recursively', () => {
  expect(sumRecursive(5)).toBe(15);
});
```
### Issue 30: Not testing with stale closure values
**Description:** Closure capturing old variable values
```javascript
function createCallbacks() {
  const callbacks = [];
  for (var i = 0; i < 3; i++) {
    callbacks.push(() => i);
  }
  return callbacks;
}
it('creates callbacks', () => {
  const cbs = createCallbacks();
  expect(cbs[0]()).toBe(0);
});
```

## Modification Snippets (50)

### Modify 1: Add boundary tests for age validation
**Description:** Add tests for boundary values 0, 1, 17, 18, 19, 150
```javascript
function isAdult(age) {
  return age >= 18;
}
describe('isAdult', () => {
  it('adult age', () => {
    expect(isAdult(25)).toBe(true);
  });
  // Add boundary tests
});
```
### Modify 2: Add test for empty/null/undefined inputs
**Description:** Test the capitalize function with edge case inputs
```javascript
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
describe('capitalize', () => {
  it('capitalizes normal string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
  // Add tests for empty string, null, undefined
});
```
### Modify 3: Cover all branches of if-else
**Description:** Add tests for both branches of getDiscount
```javascript
function getDiscount(price, isMember) {
  if (isMember) return price * 0.9;
  return price;
}
describe('getDiscount', () => {
  it('applies member discount', () => {
    expect(getDiscount(100, true)).toBe(90);
  });
  // Add non-member test
});
```
### Modify 4: Add tests for error catch blocks
**Description:** Cover the catch block of parseJSON
```javascript
function parseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return { error: e.message };
  }
}
describe('parseJSON', () => {
  it('parses valid JSON', () => {
    expect(parseJSON('{"a":1}')).toEqual({ a: 1 });
  });
  // Add invalid JSON test
});
```
### Modify 5: Add test for default parameter behavior
**Description:** Test greet with and without the name argument
```javascript
function greet(name = 'Guest') {
  return `Hello ${name}`;
}
describe('greet', () => {
  it('greets by name', () => {
    expect(greet('Alice')).toBe('Hello Alice');
  });
  // Add test without argument
});
```
### Modify 6: Add tests for all switch cases
**Description:** Cover every case in the switch statement
```javascript
function getColorName(code) {
  switch (code) {
    case 'R': return 'Red';
    case 'G': return 'Green';
    case 'B': return 'Blue';
    default: return 'Unknown';
  }
}
describe('getColorName', () => {
  it('returns Red for R', () => {
    expect(getColorName('R')).toBe('Red');
  });
  // Add tests for G, B, and unknown
});
```
### Modify 7: Add test for floating point precision using toBeCloseTo
**Description:** Fix the test to use toBeCloseTo for floating point
```javascript
it('adds floating point', () => {
  expect(0.1 + 0.2).toBe(0.3);
});
```
### Modify 8: Add tests for large number inputs
**Description:** Test sumArray with large numbers and large arrays
```javascript
function sumArray(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
describe('sumArray', () => {
  it('sums small array', () => {
    expect(sumArray([1, 2, 3])).toBe(6);
  });
  // Add test for large numbers
  // Add test for large array
});
```
### Modify 9: Add tests for negative number inputs
**Description:** Test functions with negative number inputs
```javascript
function absolute(n) {
  return n < 0 ? -n : n;
}
describe('absolute', () => {
  it('positive number', () => {
    expect(absolute(5)).toBe(5);
  });
  // Add test for negative number
});
```
### Modify 10: Add test for NaN inputs
**Description:** Test that functions handle NaN gracefully
```javascript
function isPositive(n) {
  return n > 0;
}
describe('isPositive', () => {
  it('positive number', () => {
    expect(isPositive(5)).toBe(true);
  });
  // Add test for NaN
});
```
### Modify 11: Add test for recursion base case
**Description:** Test factorial with the base case (0 and 1)
```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
describe('factorial', () => {
  it('calculates factorial of 5', () => {
    expect(factorial(5)).toBe(120);
  });
  // Add tests for 0, 1
});
```
### Modify 12: Add tests for all ternary branches
**Description:** Cover both branches of the ternary operator
```javascript
function getFee(isMember) {
  return isMember ? 10 : 20;
}
describe('getFee', () => {
  it('member fee', () => {
    expect(getFee(true)).toBe(10);
  });
  // Add non-member test
});
```
### Modify 13: Add tests for for-loop boundaries
**Description:** Test createRange with various start/end combinations
```javascript
function createRange(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) result.push(i);
  return result;
}
describe('createRange', () => {
  it('creates range 1-3', () => {
    expect(createRange(1, 3)).toEqual([1, 2, 3]);
  });
  // Test single element, empty, reversed
});
```
### Modify 14: Add test for while loop exit condition
**Description:** Test countDown ensures proper loop termination
```javascript
function countDown(n) {
  const result = [];
  while (n > 0) result.push(n--);
  return result;
}
describe('countDown', () => {
  it('counts down from 3', () => {
    expect(countDown(3)).toEqual([3, 2, 1]);
  });
  // Test with 0, 1
});
```
### Modify 15: Add coverage for logical operators
**Description:** Test all combinations of logical operators
```javascript
function canAccess(age, isMember, isAdmin) {
  return (age >= 18 && isMember) || isAdmin;
}
describe('canAccess', () => {
  it('admin always accesses', () => {
    expect(canAccess(16, false, true)).toBe(true);
  });
  // Add more combinations
});
```
### Modify 16: Add test for getter/setter validation
**Description:** Test that setter validates input
```javascript
class Temperature {
  constructor() { this._celsius = 0; }
  set celsius(value) {
    if (value < -273.15) throw new Error('Below absolute zero');
    this._celsius = value;
  }
  get celsius() { return this._celsius; }
}
describe('Temperature', () => {
  it('sets valid temperature', () => {
    const t = new Temperature();
    t.celsius = 25;
    expect(t.celsius).toBe(25);
  });
  // Add test for invalid temperature
});
```
### Modify 17: Add coverage for finally block
**Description:** Verify that finally block always executes
```javascript
function processWithCleanup(data) {
  let cleaned = false;
  try {
    return JSON.parse(data);
  } finally {
    cleaned = true;
  }
}
describe('processWithCleanup', () => {
  it('processes valid data', () => {
    expect(processWithCleanup('{"a":1}')).toEqual({ a: 1 });
  });
  // Add test that cleaned is always true
});
```
### Modify 18: Add tests for array-like objects
**Description:** Test toArray with arguments and NodeList
```javascript
function toArray(args) {
  return Array.from(args);
}
describe('toArray', () => {
  it('converts array', () => {
    expect(toArray([1, 2, 3])).toEqual([1, 2, 3]);
  });
  // Test with arguments, string, Set
});
```
### Modify 19: Add test for frozen objects
**Description:** Test that frozen objects cannot be modified
```javascript
function addProperty(obj, key, value) {
  if (Object.isFrozen(obj)) throw new Error('Cannot modify frozen object');
  obj[key] = value;
  return obj;
}
describe('addProperty', () => {
  it('adds to normal object', () => {
    expect(addProperty({}, 'a', 1)).toEqual({ a: 1 });
  });
  // Add test for frozen object
});
```
### Modify 20: Add test for Map with object keys
**Description:** Test reference semantics of object keys in Map
```javascript
const userCache = new Map();
function cacheUser(user) {
  userCache.set(user, user);
}
function getCachedUser(user) {
  return userCache.get(user);
}
describe('userCache', () => {
  // Test that object identity matters
});
```
### Modify 21: Add test for Set with NaN and objects
**Description:** Test Set behavior with special values
```javascript
function unique(arr) {
  return [...new Set(arr)];
}
describe('unique', () => {
  it('removes duplicates', () => {
    expect(unique([1, 2, 2, 3])).toEqual([1, 2, 3]);
  });
  // Test with NaN, objects, mixed types
});
```
### Modify 22: Add mutation test for isEven
**Description:** Verify test detects logic errors
```javascript
function isEven(n) {
  return n % 2 === 0;
}
// Add mutation-aware tests that would catch:
// function isEven(n) { return n % 2 !== 0; }
```
### Modify 23: Add coverage for all Status enum values
**Description:** Test getStatusLabel with all Status values
```javascript
const Status = { PENDING: 'pending', ACTIVE: 'active', INACTIVE: 'inactive', DELETED: 'deleted' };
function getStatusLabel(status) {
  const labels = { pending: 'Waiting', active: 'Active', inactive: 'Inactive', deleted: 'Removed' };
  return labels[status] || 'Unknown';
}
describe('getStatusLabel', () => {
  // Test all status values
});
```
### Modify 24: Add test for falsy value handling
**Description:** Test toBool with all falsy values
```javascript
function toBool(value) {
  return !!value;
}
describe('toBool', () => {
  // Test with 0, '', null, undefined, NaN, false
  it('converts truthy', () => {
    expect(toBool(1)).toBe(true);
  });
});
```
### Modify 25: Add coverage for edge cases in filterInPlace
**Description:** Test array mutation during iteration
```javascript
function filterInPlace(arr, predicate) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (!predicate(arr[i])) arr.splice(i, 1);
  }
  return arr;
}
describe('filterInPlace', () => {
  // Test: empty, all match, none match, single element
});
```
### Modify 26: Add test for Symbol-keyed properties
**Description:** Test access to Symbol-keyed properties
```javascript
const sym = Symbol('key');
function createObject() {
  return { [sym]: 'secret', visible: 'public' };
}
describe('createObject', () => {
  // Test access to both symbol and string keys
});
```
### Modify 27: Add tests for getter that throws
**Description:** Test that accessing a throwing getter is caught
```javascript
class SecureConfig {
  get secret() {
    if (!this.authorized) throw new Error('Unauthorized');
    return 'top-secret';
  }
  authorize() { this.authorized = true; }
}
describe('SecureConfig', () => {
  // Test unauthorized access throws
  // Test authorized access returns value
});
```
### Modify 28: Add coverage for all proxy traps
**Description:** Test various Proxy handler traps
```javascript
const handler = {
  get(target, prop) { return prop in target ? target[prop] : 'default'; },
  set(target, prop, value) { target[prop] = value; return true; },
  has(target, prop) { return prop in target || prop === 'virtual'; }
};
describe('proxy handler', () => {
  // Test get, set, has traps
});
```
### Modify 29: Add test for Reflect operations
**Description:** Test Reflect-based property operations
```javascript
function setProperty(obj, key, value) {
  return Reflect.set(obj, key, value);
}
function getProperty(obj, key) {
  return Reflect.get(obj, key);
}
describe('Reflect operations', () => {
  // Test set and get
});
```
### Modify 30: Add test for BigInt operations
**Description:** Test with BigInt values
```javascript
function add(a, b) {
  return a + b;
}
describe('add with BigInt', () => {
  // Test addition of BigInt values
});
```
### Modify 31: Add test for structuredClone edge cases
**Description:** Test structuredClone with various data types
```javascript
function clone(obj) {
  return structuredClone(obj);
}
describe('clone', () => {
  // Test with Date, RegExp, Map, Set, ArrayBuffer
});
```
### Modify 32: Add test for Intl formatting
**Description:** Test locale-specific formatting
```javascript
function formatDate(date, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale).format(date);
}
describe('formatDate', () => {
  // Test with different locales
});
```
### Modify 33: Add test for at() method
**Description:** Test the .at() method with various indices
```javascript
function getElement(arr, index) {
  return arr.at(index);
}
describe('getElement', () => {
  // Test positive, negative, out-of-bounds indices
});
```
### Modify 34: Add coverage for optional chaining
**Description:** Test nested optional chaining scenarios
```javascript
function getThemeColor(config) {
  return config?.theme?.colors?.primary ?? '#000';
}
describe('getThemeColor', () => {
  // Test: full config, partial config, null config
});
```
### Modify 35: Add test for nullish coalescing
**Description:** Test ?? operator with 0 and empty string
```javascript
function getCount(config) {
  return config.count ?? 10;
}
describe('getCount', () => {
  // Test with count: 0, count: null, no count
});
```
### Modify 36: Add coverage for logical assignment
**Description:** Test ||=, &&=, ??= operators
```javascript
function mergeConfig(base, override) {
  base.timeout ??= 5000;
  base.retries ||= 3;
  base.debug &&= override.debug;
  return base;
}
describe('mergeConfig', () => {
  // Test all assignment operators
});
```
### Modify 37: Add test for custom iterable
**Description:** Test custom iterable with for...of
```javascript
class Fibonacci {
  constructor(limit) { this.limit = limit; }
  *[Symbol.iterator]() {
    let a = 0, b = 1;
    while (a <= this.limit) { yield a; [a, b] = [b, a + b]; }
  }
}
describe('Fibonacci', () => {
  // Test iteration
});
```
### Modify 38: Add test for tagged template literals
**Description:** Test tagged template literal function
```javascript
function html(strings, ...values) {
  return strings.reduce((acc, str, i) =>
    acc + str + (values[i] ? String(values[i]).replace(/</g, '&lt;') : ''), '');
}
describe('html tag', () => {
  // Test with safe and unsafe values
});
```
### Modify 39: Add test for error.cause chain
**Description:** Test error chaining with cause
```javascript
class AppError extends Error {
  constructor(message, cause) {
    super(message, { cause });
    this.name = 'AppError';
  }
}
function processData(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    throw new AppError('Invalid data', e);
  }
}
describe('processData', () => {
  // Test error chain
});
```
### Modify 40: Add coverage for event listener lifecycle
**Description:** Test adding, removing, and firing events
```javascript
class EventTarget {
  constructor() { this.listeners = {}; }
  addEventListener(type, handler) {
    (this.listeners[type] ||= []).push(handler);
  }
  removeEventListener(type, handler) {
    this.listeners[type] = (this.listeners[type] || []).filter(h => h !== handler);
  }
  dispatchEvent(type, data) {
    (this.listeners[type] || []).forEach(h => h(data));
  }
}
describe('EventTarget', () => {
  // Test full lifecycle
});
```
### Modify 41: Add test for AbortController integration
**Description:** Test abort signal handling
```javascript
async function fetchWithAbort(url, signal) {
  const response = await fetch(url, { signal });
  return response.json();
}
describe('fetchWithAbort', () => {
  // Test normal completion
  // Test abort
});
```
### Modify 42: Add test for module pattern edge cases
**Description:** Test module with private state
```javascript
const createCounter = (initial = 0) => {
  let count = initial;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => { count = initial; },
    getCount: () => count
  };
};
describe('createCounter', () => {
  // Test all operations
});
```
### Modify 43: Add coverage for array reduce edge cases
**Description:** Test reduce with various initial values and empty arrays
```javascript
function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
describe('sum', () => {
  // Test: normal, empty, single element
});
```
### Modify 44: Add test for function composition edge cases
**Description:** Test compose with zero, one, and multiple functions
```javascript
function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}
describe('compose', () => {
  // Test with 0, 1, 3 functions
});
```
### Modify 45: Add coverage for Promise combinators
**Description:** Test Promise.all, allSettled, race, any
```javascript
async function firstSuccess(promises) {
  return Promise.any(promises);
}
describe('firstSuccess', () => {
  // Test with all succeeding
  // Test with some failing
});
```
### Modify 46: Add test for WeakRef and FinalizationRegistry
**Description:** Test weak references and cleanup
```javascript
function createWeakCache() {
  const cache = new WeakMap();
  return {
    set(key, value) { cache.set(key, value); },
    get(key) { return cache.get(key); }
  };
}
describe('WeakCache', () => {
  // Test that entries can be garbage collected
});
```
### Modify 47: Add test for SharedArrayBuffer and Atomics
**Description:** Test shared memory operations
```javascript
function createSharedCounter(initial = 0) {
  const buffer = new SharedArrayBuffer(4);
  const view = new Int32Array(buffer);
  Atomics.store(view, 0, initial);
  return {
    increment: () => Atomics.add(view, 0, 1),
    decrement: () => Atomics.sub(view, 0, 1),
    getValue: () => Atomics.load(view, 0)
  };
}
describe('SharedCounter', () => {
  // Test atomic operations
});
```
### Modify 48: Add test for URLPattern matching
**Description:** Test URL pattern matching
```javascript
function matchApiRoute(url) {
  const pattern = new URLPattern({ pathname: '/api/:version/:resource' });
  return pattern.test(url);
}
describe('matchApiRoute', () => {
  // Test matching and non-matching URLs
});
```
### Modify 49: Add coverage for import assertions
**Description:** Test dynamic import with assertions
```javascript
async function loadJSON(path) {
  return import(path, { assert: { type: 'json' } });
}
describe('loadJSON', () => {
  // Test JSON module loading
});
```
### Modify 50: Add test for Temporal API transitions
**Description:** Test date/time arithmetic with Temporal
```javascript
function getNextWeekStart() {
  const now = Temporal.Now.plainDateISO();
  const daysUntilMonday = (8 - now.dayOfWeek) % 7 || 7;
  return now.add({ days: daysUntilMonday });
}
describe('getNextWeekStart', () => {
  // Test correct week calculation
});
```
