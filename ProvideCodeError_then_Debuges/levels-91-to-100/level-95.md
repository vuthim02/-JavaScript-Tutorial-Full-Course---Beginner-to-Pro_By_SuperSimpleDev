# Level 95 - Built-in classes and advanced inheritance (Module 19: Inheritance)

## Error Snippets

### Error 1: Extending Array without proper constructor
**Description:** Custom Array subclass missing constructor super call.
```javascript
class MyArray extends Array {
  constructor(...args) {
    this.custom = true;
  }
}
const arr = new MyArray(1, 2, 3);
```

### Error 2: Overriding static Symbol.species incorrectly
**Description:** Wrong return type from species getter.
```javascript
class MyArray extends Array {
  static get [Symbol.species]() {
    return "Array";
  }
}
const arr = new MyArray(1, 2, 3);
const mapped = arr.map(x => x * 2);
```

### Error 3: Modifying built-in prototype
**Description:** Add method to Array.prototype, causing conflicts.
```javascript
Array.prototype.customMethod = function() {
  return "custom";
};
const arr = [1, 2, 3];
for (const key in arr) {
  console.log(key);
}
```

### Error 4: Extending Function with class
**Description:** Try to extend the Function built-in.
```javascript
class MyFunction extends Function {
  constructor() {
    super("return 42");
  }
}
const f = new MyFunction();
console.log(f());
```

### Error 5: Extending Date with incorrect super
**Description:** Date subclass constructor not passing args correctly.
```javascript
class MyDate extends Date {
  constructor(year, month, day) {
    super();
    this.setFullYear(year, month, day);
  }
}
const d = new MyDate(2024, 0, 15);
console.log(d.getFullYear());
```

### Error 6: Using RegExp subclass with wrong exec override
**Description:** Override exec but break expected return structure.
```javascript
class MyRegExp extends RegExp {
  exec(str) {
    const result = super.exec(str);
    return result ? result[0] : null;
  }
}
const re = new MyRegExp("\\d+");
const match = "abc123".match(re);
```

### Error 7: Error subclass missing message
**Description:** Custom error doesn't pass message to parent.
```javascript
class ValidationError extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
  }
}
throw new ValidationError(["field required"]);
```

### Error 8: Extending Array and breaking length
**Description:** Override push but don't update length correctly.
```javascript
class FixedArray extends Array {
  push(...items) {
    return this.length;
  }
}
const arr = new FixedArray(1, 2, 3);
arr.push(4);
```

### Error 9: Extending Map with broken iteration
**Description:** Custom Map subclass breaks forEach.
```javascript
class MyMap extends Map {
  set(key, value) {
    super.set(key, { value, timestamp: Date.now() });
  }
  get(key) {
    return super.get(key).value;
  }
}
const m = new MyMap();
m.set("a", 1);
m.forEach((v, k) => console.log(k, v));
```

### Error 10: Extending Set with wrong constructor
**Description:** Set subclass doesn't pass iterable to super.
```javascript
class MySet extends Set {
  constructor(items) {
    super();
    items.forEach(i => this.add(i));
  }
}
const s = new MySet([1, 2, 3]);
```

### Error 11: Overriding then on Promise subclass
**Description:** Custom Promise breaks thenable chain.
```javascript
class MyPromise extends Promise {
  then(onFulfilled, onRejected) {
    return super.then(onFulfilled, onRejected);
  }
}
const p = new MyPromise(resolve => resolve(42));
p.then(v => console.log(v));
```

### Error 12: Extending WeakMap incorrectly
**Description:** WeakMap subclass with non-object keys.
```javascript
class MyWeakMap extends WeakMap {
  set(key, value) {
    return super.set(key, value);
  }
}
const wm = new MyWeakMap();
wm.set("string", 1);
```

### Error 13: Extending Boolean with wrong constructor
**Description:** Boolean subclass doesn't behave as expected.
```javascript
class MyBoolean extends Boolean {
  constructor(value) {
    super(value);
    this.isCustom = true;
  }
}
const b = new MyBoolean(true);
console.log(b ? "true" : "false");
```

### Error 14: Extending Number and losing numeric context
**Description:** Number subclass breaks in arithmetic.
```javascript
class MyNumber extends Number {
  constructor(value) {
    super(value);
    this.label = "custom";
  }
}
const n = new MyNumber(5);
console.log(n + 3);
```

### Error 15: Extending String and breaking length
**Description:** String subclass where length is inconsistent.
```javascript
class MyString extends String {
  constructor(str) {
    super(str);
    this.custom = true;
  }
}
const s = new MyString("hello");
console.log(s.length, s.custom);
```

### Error 16: Extending Uint8Array without proper init
**Description:** Typed array subclass not initialized correctly.
```javascript
class Buffer extends Uint8Array {
  constructor(size) {
    super();
    this.size = size;
  }
}
const buf = new Buffer(10);
```

### Error 17: Override Symbol.species returning non-constructor
**Description:** Species getter returns non-callable.
```javascript
class MyArray extends Array {
  static get [Symbol.species]() {
    return {};
  }
}
const arr = new MyArray(1, 2, 3);
const sliced = arr.slice(1);
```

### Error 18: Extending Proxy (not constructable)
**Description:** Try to extend Proxy class directly.
```javascript
class MyProxy extends Proxy {
  constructor(target, handler) {
    super(target, handler);
  }
}
const p = new MyProxy({}, {});
```

### Error 19: Extending class that uses new.target
**Description:** Subclass breaks parent's new.target check.
```javascript
class Singleton {
  constructor() {
    if (new.target !== Singleton) {
      throw new Error("Cannot extend Singleton");
    }
  }
}
class SubSingleton extends Singleton {
  constructor() {
    super();
  }
}
const s = new SubSingleton();
```

### Error 20: Extending Error and using .stack
**Description:** Access .stack property before it's available.
```javascript
class CustomError extends Error {
  constructor(msg) {
    super(msg);
    console.log(this.stack);
  }
}
throw new CustomError("test");
```

### Error 21: Extending RegExp and using test
**Description:** RegExp subclass test method returns wrong result.
```javascript
class MyRegExp extends RegExp {
  test(str) {
    return "yes";
  }
}
const re = new MyRegExp("\\d+");
console.log(re.test("abc"));
```

### Error 22: Extending Array with non-standard return from slice
**Description:** Slice doesn't return correct type.
```javascript
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
  constructor(...args) {
    super(...args);
  }
}
const arr = new MyArray(1, 2, 3);
const sliced = arr.slice(0, 1);
console.log(sliced instanceof MyArray);
```

### Error 23: Extending Intl.DateTimeFormat
**Description:** Try to extend Intl API class.
```javascript
class MyDateFormat extends Intl.DateTimeFormat {
  constructor(locale, options) {
    super(locale, options);
  }
}
const df = new MyDateFormat("en-US");
console.log(df.format(new Date()));
```

### Error 24: Extending Object directly
**Description:** Extending Object breaks property behavior.
```javascript
class MyObject extends Object {
  constructor(obj) {
    super(obj);
  }
}
const o = new MyObject({ a: 1 });
console.log(o.a);
```

### Error 25: Override valueOf on Number subclass incorrectly
**Description:** valueOf returns non-primitive.
```javascript
class MyNumber extends Number {
  valueOf() {
    return { value: this };
  }
}
const n = new MyNumber(10);
console.log(n + 5);
```

### Error 26: Extending Function and losing callability
**Description:** Function subclass is not callable correctly.
```javascript
class Multiply extends Function {
  constructor() {
    super("a", "b", "return a * b");
  }
}
const m = new Multiply();
console.log(m.call(null, 3, 4));
```

### Error 27: Extending Symbol (not possible)
**Description:** Attempt to extend primitive wrapper Symbol.
```javascript
class MySymbol extends Symbol {
  constructor(desc) {
    super(desc);
  }
}
const s = new MySymbol("test");
```

### Error 28: Extending Web API class (DOMException)
**Description:** Try to extend browser built-in outside browser.
```javascript
class MyException extends DOMException {
  constructor(msg) {
    super(msg, "CustomError");
  }
}
throw new MyException("test");
```

### Error 29: Modifying built-in method signature
**Description:** Override Array.includes with wrong parameters.
```javascript
Array.prototype.includes = function(item, fromIndex, extra) {
  return extra ? true : false;
};
const arr = [1, 2, 3];
console.log(arr.includes(1));
```

### Error 30: Extending Array and using flatMap incorrectly
**Description:** flatMap returns wrong species type.
```javascript
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}
const arr = new MyArray([1], [2], [3]);
const result = arr.flatMap(x => x);
```

### Error 31: Extending RegExp with sticky flag issues
**Description:** Override exec causing infinite loop with sticky.
```javascript
class MyRegExp extends RegExp {
  exec(str) {
    const result = super.exec(str);
    return result;
  }
}
const re = new MyRegExp("\\d", "y");
re.exec("123");
```

### Error 32: Extending Set and breaking has
**Description:** Override has but break internal logic.
```javascript
class MySet extends Set {
  has(value) {
    return false;
  }
}
const s = new MySet([1, 2, 3]);
console.log(s.has(1));
```

### Error 33: Extending Map and overriding get with side effects
**Description:** get method has side effects that break iteration.
```javascript
class MyMap extends Map {
  get(key) {
    this.delete(key);
    return super.get(key);
  }
}
const m = new MyMap([["a", 1]]);
m.forEach((v, k) => console.log(k, v));
```

### Error 34: Extending WeakSet incorrectly
**Description:** WeakSet subclass with wrong add.
```javascript
class MyWeakSet extends WeakSet {
  add(value) {
    if (typeof value !== "object") throw new Error("object required");
    return super.add(value);
  }
}
const ws = new MyWeakSet();
ws.add("string");
```

### Error 35: Extending Promise and using catch
**Description:** Override catch but break chaining.
```javascript
class MyPromise extends Promise {
  catch(onRejected) {
    return super.catch(onRejected);
  }
}
const p = new MyPromise((_, reject) => reject("error"));
p.catch(e => console.log(e));
```

### Error 36: Extending DataView incorrectly
**Description:** DataView subclass constructor wrong.
```javascript
class MyDataView extends DataView {
  constructor(buffer, byteOffset, byteLength) {
    super(buffer, byteOffset, byteLength);
  }
}
const buf = new ArrayBuffer(16);
const dv = new MyDataView(buf, 0, 16);
```

### Error 37: Extending ArrayBuffer
**Description:** Try to extend ArrayBuffer.
```javascript
class MyBuffer extends ArrayBuffer {
  constructor(byteLength) {
    super(byteLength);
  }
}
const buf = new MyBuffer(16);
```

### Error 38: Override constructor on built-in without super
**Description:** Extend Set without calling super in constructor.
```javascript
class CustomSet extends Set {
  constructor() {
    this.items = [];
  }
  add(item) {
    this.items.push(item);
  }
}
const s = new CustomSet();
s.add(1);
```

### Error 39: Extending SharedArrayBuffer
**Description:** Extend SharedArrayBuffer (may not be available).
```javascript
class MySharedBuffer extends SharedArrayBuffer {
  constructor(size) {
    super(size);
  }
}
const buf = new MySharedBuffer(16);
```

### Error 40: Extending Symbol.species chain breaking
**Description:** Custom species breaks method chaining.
```javascript
class A extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}
class B extends A {
  static get [Symbol.species]() {
    return A;
  }
}
const arr = new B(1, 2, 3);
const mapped = arr.map(x => x * 2);
console.log(mapped instanceof B);
```

### Error 41: Extending TypedArray with wrong constructor
**Description:** Int32Array subclass not initialized properly.
```javascript
class MyInt32 extends Int32Array {
  constructor(length) {
    super();
  }
}
const arr = new MyInt32(5);
```

### Error 42: Forgetting new when instantiating built-in subclass
**Description:** Call subclass without new.
```javascript
class MyError extends Error {
  constructor(msg) {
    super(msg);
  }
}
const e = MyError("test");
```

### Error 43: Extending Error and using captureStackTrace
**Description:** Error.captureStackTrace not called properly.
```javascript
class AppError extends Error {
  constructor(msg) {
    super(msg);
    Error.captureStackTrace(this, this.constructor);
  }
}
throw new AppError("failed");
```

### Error 44: Override static method on built-in incorrectly
**Description:** Override Array.from but break contract.
```javascript
class MyArray extends Array {
  static from(source) {
    return new MyArray(...source);
  }
}
const arr = MyArray.from("hello");
console.log(arr.length);
```

### Error 45: Extending RegExp and using Symbol.replace
**Description:** Custom replace method returns wrong type.
```javascript
class MyRegExp extends RegExp {
  [Symbol.replace](str, replacement) {
    return "replaced";
  }
}
const re = new MyRegExp("world");
"hello world".replace(re, "all");
```

### Error 46: Extending Function and using bind
**Description:** Function subclass breaks bind behavior.
```javascript
class MyFunction extends Function {
  constructor() {
    super("return this.x");
  }
}
const fn = new MyFunction();
const bound = fn.bind({ x: 42 });
console.log(bound());
```

### Error 47: Extending Map and using clear incorrectly
**Description:** Override clear but break internal state.
```javascript
class MyMap extends Map {
  clear() {
    this._cleared = true;
  }
}
const m = new MyMap([["a", 1]]);
m.clear();
console.log(m.size);
```

### Error 48: Extending Set and overriding Symbol.iterator
**Description:** Iterator returns wrong values.
```javascript
class MySet extends Set {
  *[Symbol.iterator]() {
    yield "custom";
  }
}
const s = new MySet([1, 2, 3]);
console.log([...s]);
```

### Error 49: Extending Promise and using resolve/reject statics
**Description:** Static methods don't return correct subclass.
```javascript
class MyPromise extends Promise {
  static resolve(value) {
    return super.resolve(value);
  }
}
const p = MyPromise.resolve(42);
console.log(p instanceof MyPromise);
```

### Error 50: Extending URL (not available in Node.js)
**Description:** Try to extend URL class incorrectly.
```javascript
class MyURL extends URL {
  constructor(url, base) {
    super(url, base);
    this.custom = true;
  }
}
const u = new MyURL("https://example.com");
```

### Error 51: Extending Boolean and using ! operator
**Description:** Boolean subclass negation doesn't work.
```javascript
class MyBoolean extends Boolean {
  constructor(v) {
    super(v);
  }
}
const b = new MyBoolean(false);
console.log(!b);
```

### Error 52: Extending Number and using instanceof checks
**Description:** Number subclass instanceof behaves unexpectedly.
```javascript
class MyNumber extends Number {}
const n = new MyNumber(5);
console.log(n instanceof Number);
```

### Error 53: Extending String and using charAt
**Description:** String subclass charAt returns wrong type.
```javascript
class MyString extends String {
  charAt(index) {
    return this[index];
  }
}
const s = new MyString("hello");
console.log(s.charAt(0));
```

### Error 54: Extending Date and using toJSON
**Description:** Date subclass toJSON returns wrong format.
```javascript
class MyDate extends Date {
  toJSON() {
    return this.getFullYear() + "-" + (this.getMonth() + 1);
  }
}
const d = new MyDate(2024, 0, 15);
console.log(JSON.stringify(d));
```

### Error 55: Extending Error and using name property
**Description:** Error subclass name not set correctly.
```javascript
class MyError extends Error {}
const e = new MyError("test");
console.log(e.name);
```

### Error 56: Extending Int8Array and iterating
**Description:** Typed array iteration broken.
```javascript
class MyInt8 extends Int8Array {
  constructor(length) {
    super(length);
  }
}
const arr = new MyInt8(3);
arr[0] = 1;
arr[1] = 2;
console.log([...arr]);
```

### Error 57: Extending Map and using entries
**Description:** entries() returns wrong values.
```javascript
class MyMap extends Map {
  entries() {
    return super.entries();
  }
}
const m = new MyMap([["a", 1]]);
for (const [k, v] of m) {
  console.log(k, v);
}
```

### Error 58: Extending Set and using difference (ES2025)
**Description:** difference method returns wrong type.
```javascript
class MySet extends Set {
  difference(other) {
    return new Set(super.difference(other));
  }
}
const s1 = new MySet([1, 2, 3]);
const s2 = new MySet([2]);
const diff = s1.difference(s2);
```

### Error 59: Extending Array and overriding length setter
**Description:** Override length setter incorrectly.
```javascript
class MyArray extends Array {
  set length(n) {
    if (n > 100) throw new Error("max 100");
    super.length = n;
  }
}
const arr = new MyArray(1, 2, 3);
arr.length = 50;
```

### Error 60: Extending RegExp and using flags
**Description:** Flags getter returns wrong value.
```javascript
class MyRegExp extends RegExp {
  get flags() {
    return super.flags + "g";
  }
}
const re = new MyRegExp("test", "i");
console.log(re.flags);
```

### Error 61: Extending Error and using toJSON
**Description:** Error subclass serialization missing properties.
```javascript
class HttpError extends Error {
  constructor(status, msg) {
    super(msg);
    this.status = status;
  }
}
const e = new HttpError(404, "Not found");
console.log(JSON.stringify(e));
```

### Error 62: Extending Uint16Array and using slice
**Description:** Typed array slice returns wrong type.
```javascript
class MyUint16 extends Uint16Array {
  static get [Symbol.species]() {
    return Uint16Array;
  }
}
const arr = new MyUint16([1, 2, 3]);
const sliced = arr.slice(0, 1);
console.log(sliced instanceof MyUint16);
```

### Error 63: Override Symbol.toStringTag on built-in extension
**Description:** Wrong string tag breaks type detection.
```javascript
class MyArray extends Array {
  get [Symbol.toStringTag]() {
    return "MyArray";
  }
}
const arr = new MyArray(1, 2, 3);
console.log(Object.prototype.toString.call(arr));
```

### Error 64: Extending WeakRef incorrectly
**Description:** WeakRef subclass with wrong constructor.
```javascript
class MyWeakRef extends WeakRef {
  constructor(target) {
    super(target);
  }
}
const ref = new MyWeakRef({});
```

### Error 65: Extending FinalizationRegistry incorrectly
**Description:** FinalizationRegistry subclass with wrong callback.
```javascript
class MyRegistry extends FinalizationRegistry {
  constructor(callback) {
    super(callback);
  }
}
const reg = new MyRegistry(() => {});
```

### Error 66: Extending BigInt64Array
**Description:** BigInt typed array subclass not initialized.
```javascript
class MyBigInt extends BigInt64Array {
  constructor(length) {
    super(length);
  }
}
const arr = new MyBigInt(5);
```

### Error 67: Extending Atomics (not constructable)
**Description:** Try to extend non-constructible Atomics.
```javascript
class MyAtomics extends Atomics {
  constructor() {
    super();
  }
}
```

### Error 68: Extending JSON (not constructable)
**Description:** Try to extend non-constructible JSON.
```javascript
class MyJSON extends JSON {
  constructor() {
    super();
  }
}
```

### Error 69: Extending Math (not constructable)
**Description:** Try to extend non-constructible Math.
```javascript
class MyMath extends Math {
  constructor() {
    super();
  }
}
```

### Error 70: Extending Reflect (not constructable)
**Description:** Try to extend non-constructible Reflect.
```javascript
class MyReflect extends Reflect {
  constructor() {
    super();
  }
}
```

## Issue Snippets

### Issue 1: Unnecessary extension of Array
**Description:** Adding one method via inheritance when utility function works.
```javascript
class EnhancedArray extends Array {
  first() { return this[0]; }
}
```

### Issue 2: Extending built-in without adding value
**Description:** Empty subclass of Error adds nothing.
```javascript
class AppError extends Error {}
```

### Issue 3: Overriding species but never using it
**Description:** Defining Symbol.species with no benefit.
```javascript
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
```

### Issue 4: Extending multiple built-ins unnecessarily
**Description:** Two separate subclasses that could be one.
```javascript
class UserError extends Error {}
class UserValidationError extends Error {}
```

### Issue 5: Using extends Array instead of Set
**Description:** Array extension when Set semantics are better.
```javascript
class UniqueArray extends Array {
  push(item) {
    if (!this.includes(item)) super.push(item);
  }
}
```

### Issue 6: Extending Error with too many subclasses
**Description:** One error class per possible error type.
```javascript
class NotFoundError extends Error {}
class ValidationError extends Error {}
class AuthError extends Error {}
class DatabaseError extends Error {}
class NetworkError extends Error {}
```

### Issue 7: Forgetting to use species with map/filter
**Description:** map and filter return wrong type.
```javascript
class ImmutableArray extends Array {
  push(...items) { throw new Error("immutable"); }
}
```

### Issue 8: Extending String for formatting helpers
**Description:** String subclass for formatting functions.
```javascript
class FormattedString extends String {
  bold() { return "**" + this + "**"; }
  italic() { return "*" + this + "*"; }
}
```

### Issue 9: Extending Number for currency
**Description:** Number subclass for money handling.
```javascript
class Currency extends Number {
  format() { return "$" + this.toFixed(2); }
}
```

### Issue 10: Extending Date with too many helpers
**Description:** Date subclass with many utility methods.
```javascript
class AppDate extends Date {
  isWeekend() { return this.getDay() === 0 || this.getDay() === 6; }
  isToday() { return this.toDateString() === new Date().toDateString(); }
  addDays(n) { return new Date(this.getTime() + n * 86400000); }
}
```

### Issue 11: Overriding species to return Array from custom class
**Description:** Lose custom methods after map/filter.
```javascript
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
  first() { return this[0]; }
}
```

### Issue 12: Extending Function for delayed execution
**Description:** Function subclass for deferring calls.
```javascript
class DelayedFunction extends Function {
  constructor(fn, delay) {
    super();
    this.fn = fn;
    this.delay = delay;
  }
}
```

### Issue 13: Extending built-in for singleton pattern
**Description:** Making a singleton Error subclass.
```javascript
class SingletonError extends Error {
  static instance = new SingletonError("singleton");
  constructor(msg) {
    super(msg);
    if (SingletonError.instance) return SingletonError.instance;
    SingletonError.instance = this;
  }
}
```

### Issue 14: Unused Symbol.species in Promise extension
**Description:** Promise species defined but never used.
```javascript
class MyPromise extends Promise {
  static get [Symbol.species]() { return Promise; }
}
```

### Issue 15: Extending Set but using array methods
**Description:** Set subclass that tries to use array methods.
```javascript
class ListSet extends Set {
  map(fn) {
    return [...this].map(fn);
  }
  filter(fn) {
    return [...this].filter(fn);
  }
}
```

### Issue 16: Extending built-in for naming only
**Description:** Creating subclass just to rename the class.
```javascript
class MyError extends Error {}
```

### Issue 17: Extending Array with mutable length
**Description:** Override splice but not other mutating methods.
```javascript
class ProtectedArray extends Array {
  splice(...args) { throw new Error("read-only"); }
}
```

### Issue 18: Extending RegExp with pre/post processing
**Description:** RegExp subclass with hooks that break spec.
```javascript
class LoggingRegExp extends RegExp {
  exec(str) {
    console.log("Executing on:", str);
    return super.exec(str);
  }
}
```

### Issue 19: Extending Map with default values
**Description:** Map subclass that returns default for missing keys.
```javascript
class DefaultMap extends Map {
  get(key) { return super.get(key) ?? "default"; }
}
```

### Issue 20: Extending Array with array-like behavior issues
**Description:** Subclass where instanceof checks are slow.
```javascript
class TaggedArray extends Array {
  constructor(tag, ...items) {
    super(...items);
    this.tag = tag;
  }
}
```

### Issue 21: Extending Promise with non-standard methods
**Description:** Adding methods that don't match Promise spec.
```javascript
class MyPromise extends Promise {
  timeout(ms) {
    return Promise.race([this, new Promise((_, r) => setTimeout(r, ms))]);
  }
}
```

### Issue 22: Extending WeakMap for caching
**Description:** WeakMap subclass overriding get/set.
```javascript
class Cache extends WeakMap {
  set(key, value) {
    return super.set(key, { value, timestamp: Date.now() });
  }
}
```

### Issue 23: Extending Boolean just to add methods
**Description:** Adding string methods to Boolean.
```javascript
class SmartBoolean extends Boolean {
  toYesNo() { return this ? "Yes" : "No"; }
}
```

### Issue 24: Extending Buffer in Node.js incorrectly
**Description:** Buffer extension pattern that breaks.
```javascript
class MyBuffer extends Buffer {
  constructor(size) {
    super(size);
  }
}
```

### Issue 25: Extending EventEmitter (Node.js) with wrong super
**Description:** EventEmitter subclass not calling super.
```javascript
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {
  constructor() {
    this.custom = true;
  }
}
```

### Issue 26: Extending built-in but not accepting all constructor forms
**Description:** Array subclass only works with one constructor pattern.
```javascript
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}
```

### Issue 27: Overriding Symbol.toPrimitive on Number subclass
**Description:** Confusing type coercion behavior.
```javascript
class MyNumber extends Number {
  [Symbol.toPrimitive](hint) {
    if (hint === "string") return "custom";
    return 0;
  }
}
```

### Issue 28: Extending Error and losing stack trace
**Description:** Stack trace not properly captured.
```javascript
class AppError extends Error {
  constructor(msg) {
    super(msg);
    this.stack = "custom stack";
  }
}
```

### Issue 29: Extending Map with non-spec-compliant delete
**Description:** Delete returns wrong boolean.
```javascript
class MyMap extends Map {
  delete(key) {
    super.delete(key);
    return true;
  }
}
```

### Issue 30: Extending Array without considering sparse arrays
**Description:** Sparse array handling broken.
```javascript
class MyArray extends Array {
  map(fn) {
    return super.map(fn);
  }
}
```

## Modify Snippets

### Modify 1: Create custom Array subclass
**Description:** Extend Array with first(), last(), isEmpty() methods.
```javascript
// Create EnhancedArray extending Array
```

### Modify 2: Custom Error class hierarchy
**Description:** Create HttpError, ValidationError, AuthError extending Error.
```javascript
// Create error hierarchy with statusCode property
```

### Modify 3: Extend Map with default value
**Description:** Create DefaultMap that returns default for missing keys.
```javascript
// Create DefaultMap extending Map
```

### Modify 4: Extend Set with set operations
**Description:** Create MathSet with union, intersection, difference.
```javascript
// Create MathSet extending Set
```

### Modify 5: Custom Promise with timeout
**Description:** Create TimedPromise that rejects after timeout.
```javascript
// Create TimedPromise extending Promise
```

### Modify 6: Extend RegExp with match info
**Description:** Create InfoRegExp that tracks match count.
```javascript
// Create InfoRegExp extending RegExp
```

### Modify 7: Custom Date with formatting
**Description:** Create FormattedDate extending Date with format method.
```javascript
// Create FormattedDate extending Date
```

### Modify 8: Extend WeakMap for DOM caching
**Description:** Create DOMCache that maps DOM elements to data.
```javascript
// Create DOMCache extending WeakMap
```

### Modify 9: Custom String with truncation
**Description:** Create SmartString extending String with truncate, ellipsis.
```javascript
// Create SmartString extending String
```

### Modify 10: Extend Array with shuffle
**Description:** Create ShuffleArray extending Array with Fisher-Yates shuffle.
```javascript
// Create ShuffleArray extending Array
```

### Modify 11: Custom Number with precision
**Description:** Create PrecisionNumber extending Number with fixed decimal.
```javascript
// Create PrecisionNumber extending Number
```

### Modify 12: Extend Error with serialization
**Description:** Create SerializableError with toJSON method.
```javascript
// Create SerializableError extending Error
```

### Modify 13: Extend Map with event emission
**Description:** Create ObservableMap that emits on set/delete/clear.
```javascript
// Create ObservableMap extending Map
```

### Modify 14: Custom Array with undo support
**Description:** Create UndoArray that tracks mutations for undo.
```javascript
// Create UndoArray extending Array
```

### Modify 15: Extend Promise with retry
**Description:** Create RetryPromise that auto-retries on reject.
```javascript
// Create RetryPromise extending Promise
```

### Modify 16: Extend Set with serialization
**Description:** Create JSONSet extending Set with toJSON/fromJSON.
```javascript
// Create JSONSet extending Set
```

### Modify 17: Custom Date with business days
**Description:** Create BusinessDate with addBusinessDays, isBusinessDay.
```javascript
// Create BusinessDate extending Date
```

### Modify 18: Extend Function with debounce
**Description:** Create DebouncedFunction extending Function.
```javascript
// Create DebouncedFunction extending Function
```

### Modify 19: Extend WeakSet for object tracking
**Description:** Create Tracker extending WeakSet with access count.
```javascript
// Create Tracker extending WeakSet
```

### Modify 20: Custom Uint8Array with hex methods
**Description:** Create HexArray extending Uint8Array with toHex/fromHex.
```javascript
// Create HexArray extending Uint8Array
```

### Modify 21: Extend RegExp with named groups helper
**Description:** Create NamedRegExp that simplifies named group access.
```javascript
// Create NamedRegExp extending RegExp
```

### Modify 22: Extend Map with TTL
**Description:** Create TTLMap extending Map that auto-expires entries.
```javascript
// Create TTLMap extending Map
```

### Modify 23: Custom Array with pagination
**Description:** Create PaginatedArray with page(), perPage() methods.
```javascript
// Create PaginatedArray extending Array
```

### Modify 24: Extend Promise with finally logging
**Description:** Create LoggedPromise that logs completion.
```javascript
// Create LoggedPromise extending Promise
```

### Modify 25: Extend Error with HTTP context
**Description:** Create HTTPError extending Error with status, headers, body.
```javascript
// Create HTTPError extending Error
```

### Modify 26: Custom Set with LRU eviction
**Description:** Create LRUSet extending Set with max size eviction.
```javascript
// Create LRUSet extending Set
```

### Modify 27: Extend Int32Array with math methods
**Description:** Create MathArray extending Int32Array with sum, avg, max, min.
```javascript
// Create MathArray extending Int32Array
```

### Modify 28: Extend Map with reverse lookup
**Description:** Create BiMap extending Map that also maps values to keys.
```javascript
// Create BiMap extending Map
```

### Modify 29: Custom String with template interpolation
**Description:** Create TemplateString extending String with interpolate.
```javascript
// Create TemplateString extending String
```

### Modify 30: Extend Date with relative time
**Description:** Create RelativeDate with fromNow(), from(date) methods.
```javascript
// Create RelativeDate extending Date
```

### Modify 31: Extend Array with binary search
**Description:** Create SortedArray extending Array that maintains sort order.
```javascript
// Create SortedArray extending Array
```

### Modify 32: Custom Error with cause chain
**Description:** Create ChainedError extending Error that chains causes.
```javascript
// Create ChainedError extending Error
```

### Modify 33: Extend Set with fuzzy matching
**Description:** Create FuzzySet extending Set with similarity-based lookup.
```javascript
// Create FuzzySet extending Set
```

### Modify 34: Extend Map with transform views
**Description:** Create TransformMap extending Map with mapKeys/mapValues.
```javascript
// Create TransformMap extending Map
```

### Modify 35: Custom Promise with progress
**Description:** Create ProgressPromise extending Promise with progress events.
```javascript
// Create ProgressPromise extending Promise
```

### Modify 36: Extend WeakMap with auto-cleanup
**Description:** Create AutoCleanWeakMap that removes stale entries.
```javascript
// Create AutoCleanWeakMap extending WeakMap
```

### Modify 37: Extend Array with grouping
**Description:** Create GroupArray extending Array with groupBy, partition.
```javascript
// Create GroupArray extending Array
```

### Modify 38: Custom Symbol.species example
**Description:** Create FilteredArray where map/filter return original type.
```javascript
// Create FilteredArray extending Array with correct Symbol.species
```

### Modify 39: Extend Number with rounding modes
**Description:** Create RoundingNumber extending Number with floor/ceil/round.
```javascript
// Create RoundingNumber extending Number
```

### Modify 40: Extend Error with severity levels
**Description:** Create LeveledError extending Error with severity levels.
```javascript
// Create LeveledError extending Error
```

### Modify 41: Extend Map with observable changes
**Description:** Create ObservableMap extending Map with subscribe/notify.
```javascript
// Create ObservableMap extending Map
```

### Modify 42: Custom Array with chunk/window methods
**Description:** Create ChunkArray extending Array with chunk, slidingWindow.
```javascript
// Create ChunkArray extending Array
```

### Modify 43: Extend String with word operations
**Description:** Create WordString extending String with wordCount, truncateWords.
```javascript
// Create WordString extending String
```

### Modify 44: Extend Set with ordered insertion
**Description:** Create OrderedSet extending Set that maintains insertion order.
```javascript
// Create OrderedSet extending Set
```

### Modify 45: Extend Promise with allSettled helper
**Description:** Create AllPromise extending Promise with static allSettledImproved.
```javascript
// Create AllPromise extending Promise
```

### Modify 46: Custom Error with error codes
**Description:** Create CodeError extending Error with code property.
```javascript
// Create CodeError extending Error
```

### Modify 47: Extend Float64Array with statistical methods
**Description:** Create StatsArray extending Float64Array with variance, stddev.
```javascript
// Create StatsArray extending Float64Array
```

### Modify 48: Extend Map with merge/combine
**Description:** Create MergeableMap extending Map with merge, combine, subtract.
```javascript
// Create MergeableMap extending Map
```

### Modify 49: Custom String with ANSI formatting
**Description:** Create ANSIString extending String with color formatting.
```javascript
// Create ANSIString extending String
```

### Modify 50: Full built-in extension library
**Description:** Create a library of enhanced built-in classes.
```javascript
// Create LibArray, LibMap, LibSet, LibError, LibPromise
// Each with 3+ additional useful methods
```
