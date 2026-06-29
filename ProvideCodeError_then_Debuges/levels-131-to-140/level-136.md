# Level 136 - Unit testing existing OOP code

## Error Snippets

### Error 1: Testing private method directly
**Description:** Private class methods cannot be accessed in tests.
```javascript
class Service {
  #calculate() { return 42; }
}
// Test tries to access #calculate
```

### Error 2: Not creating instance before testing
**Description:** Class methods need an instance to be called on.
```javascript
class Calculator {
  add(a, b) { return a + b; }
}
// Test calls Calculator.add(1, 2) without instance
```

### Error 3: Mocking non-existent method
**Description:** Spy on a method that does not exist.
```javascript
class User {
  save() {}
}
spyOn(User.prototype, "fetch"); // method does not exist
```

### Error 4: Arrow function class method not spyable
**Description:** Arrow function class properties cannot be spied on with prototype.
```javascript
class Logger {
  log = () => { console.log("log"); };
}
spyOn(Logger.prototype, "log");
```

### Error 5: Not restoring static method spy
**Description:** Static method spy persists across tests.
```javascript
class Config {
  static getUrl() { return "/api"; }
}
// Spy on getUrl in one test, forget to restore
```

### Error 6: Testing abstract class directly
**Description:** Abstract class should not be instantiated directly.
```javascript
class Animal {
  constructor() {
    if (new.target === Animal) throw new Error("Abstract");
  }
}
it("should create animal", function() {
  new Animal();
});
```

### Error 7: Relying on class implementation details
**Description:** Test accesses internal properties with underscore convention.
```javascript
class Counter {
  constructor() { this._count = 0; }
  increment() { this._count++; }
}
it("increments", function() {
  const c = new Counter();
  c.increment();
  expect(c._count).toBe(1);
});
```

### Error 8: Not testing subclass behavior
**Description:** Testing parent class but not subclass overrides.
```javascript
class Shape { area() { return 0; } }
class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
  area() { return Math.PI * this.r * this.r; }
}
// Tests only cover Shape
```

### Error 9: Forgetting to call super in mock
**Description:** Mocked subclass method does not call super.
```javascript
class Base {
  validate() { return true; }
}
class Child extends Base {
  validate() { return super.validate() && this.check(); }
}
// Mock validate but skip super call
```

### Error 10: Testing static method on instance
**Description:** Static methods are called on the class, not instances.
```javascript
class MathUtils {
  static add(a, b) { return a + b; }
}
it("adds", function() {
  const m = new MathUtils();
  expect(m.add(2, 3)).toBe(5);
});
```

### Error 11: Getter not returning value in test
**Description:** Getter must return a value.
```javascript
class Person {
  constructor(name) { this._name = name; }
  get name() { return this._name; }
}
it("gets name", function() {
  const p = new Person("Alice");
  expect(p.name).toBe("Alice");
});
```

### Error 12: Setter not called as property
**Description:** Setter is called as a method, not property assignment.
```javascript
class Person {
  set name(val) { this._name = val; }
  get name() { return this._name; }
}
it("sets name", function() {
  const p = new Person();
  p.name("Alice"); // should be p.name = "Alice"
  expect(p.name).toBe("Alice");
});
```

### Error 13: Testing constructor side effects incorrectly
**Description:** Constructor side effects make testing difficult.
```javascript
class Logger {
  constructor() {
    this.logger = new FileLogger("app.log");
    this.logger.init();
  }
}
// Test creates Logger and triggers file init
```

### Error 14: Not mocking Date in time-based class
**Description:** Class uses new Date() internally, making tests time-dependent.
```javascript
class AgeCalculator {
  getAge(birthDate) {
    return new Date().getFullYear() - birthDate.getFullYear();
  }
}
```

### Error 15: Testing private field indirectly
**Description:** Private field (#) accessed through public method.
```javascript
class Wallet {
  #balance = 0;
  add(amount) { this.#balance += amount; }
  get balance() { return this.#balance; }
}
it("adds money", function() {
  const w = new Wallet();
  w.add(100);
  expect(w.balance).toBe(100);
});
```

### Error 16: Using toBe for class instance comparison
**Description:** toBe uses reference identity; use toEqual for instance comparison.
```javascript
class User {
  constructor(name) { this.name = name; }
}
it("creates user", function() {
  expect(new User("Alice")).toBe(new User("Alice"));
});
```

### Error 17: Not testing error cases in class methods
**Description:** Class methods that throw are not tested.
```javascript
class BankAccount {
  withdraw(amount) {
    if (amount > this.balance) throw new Error("Insufficient funds");
  }
}
```

### Error 18: Class property not initialized
**Description:** Class field initialized outside constructor may be undefined.
```javascript
class App {
  config;
  start() { console.log(this.config.port); }
}
```

### Error 19: Testing async class method without await
**Description:** Async method returns a promise that must be awaited.
```javascript
class API {
  async fetchData() { return { id: 1 }; }
}
it("fetches data", function() {
  const api = new API();
  const data = api.fetchData();
  expect(data.id).toBe(1);
});
```

### Error 20: Not cleaning up class instances
**Description:** Class instances with subscriptions not cleaned up.
```javascript
class Store {
  constructor() { this.subscribers = []; }
  subscribe(fn) { this.subscribers.push(fn); }
}
// Test creates Store but never destroys it
```

### Error 21: Class method modifies external state
**Description:** Method has side effects outside the class.
```javascript
class Analytics {
  track(event) {
    window.dataLayer.push(event);
  }
}
// Test affects window.dataLayer
```

### Error 22: Testing method that depends on DOM
**Description:** Class method uses DOM APIs not available in test.
```javascript
class Renderer {
  render() {
    const div = document.createElement("div");
    div.textContent = "Hello";
    return div;
  }
}
```

### Error 23: Not providing constructor dependencies
**Description:** Constructor requires arguments that are missing in test.
```javascript
class Service {
  constructor(apiUrl) { this.apiUrl = apiUrl; }
}
it("creates service", function() {
  const s = new Service();
  expect(s.apiUrl).toBeDefined();
});
```

### Error 24: Spy on constructor
**Description:** Spying on constructor requires special handling.
```javascript
class User {
  constructor(name) { this.name = name; }
}
spyOn(User, "constructor");
```

### Error 25: Testing method that reads from global
**Description:** Method uses global variable not set in test.
```javascript
class Theme {
  getCurrent() {
    return window.theme || "light";
  }
}
```

### Error 26: Incorrect mocking of chained methods
**Description:** Chained methods need to return this to continue chain.
```javascript
class QueryBuilder {
  where(cond) { this.cond = cond; }
  execute() { return []; }
}
// Mock where to return the instance
```

### Error 27: Testing class with mixed sync/async
**Description:** Method sometimes returns sync, sometimes async (bad practice).
```javascript
class Cache {
  get(key) {
    if (this.cache[key]) return this.cache[key];
    return this.fetch(key); // returns promise
  }
}
```

### Error 28: Not testing inheritance chain methods
**Description:** Inherited methods not explicitly tested in subclass context.
```javascript
class Animal { speak() { return "sound"; } }
class Dog extends Animal {}
// No test that Dog.speak() works
```

### Error 29: Creating class with new.target pattern
**Description:** Testing a class that uses new.target for singleton.
```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
  }
}
```

### Error 30: Not resetting singleton between tests
**Description:** Singleton state persists across tests.
```javascript
// Singleton instance from test 1 affects test 2
```

### Error 31: Testing private fields with string eval
**Description:** Using eval to access private fields in tests.
```javascript
it("accesses private field", function() {
  const w = new Wallet();
  expect(eval("w.#balance")).toBe(0);
});
```

### Error 32: Method returns this incorrectly
**Description:** Chainable methods must return this.
```javascript
class Counter {
  constructor() { this.count = 0; }
  increment() { this.count++; }
}
it("chains", function() {
  const c = new Counter();
  c.increment().increment();
  expect(c.count).toBe(2);
});
```

### Error 33: Testing class with complex dependencies
**Description:** No dependency injection makes testing hard.
```javascript
class OrderService {
  constructor() {
    this.db = new Database("production");
    this.email = new EmailService();
    this.logger = new FileLogger();
  }
}
```

### Error 34: Forgetting to mock Math.random
**Description:** Class uses Math.random that gives unpredictable results.
```javascript
class Lottery {
  pick() { return Math.random() > 0.5 ? "win" : "lose"; }
}
```

### Error 35: Not testing edge cases in validation class
**Description:** Validation class not tested with boundary values.
```javascript
class Validator {
  isValidAge(age) {
    return age >= 0 && age <= 150;
  }
}
```

### Error 36: Testing class with module-level state
**Description:** Class depends on module-level mutable state.
```javascript
let instanceCount = 0;
class User {
  constructor() { instanceCount++; }
}
```

### Error 37: Not using factory in tests
**Description:** Creating class instances with complex setup repeated.
```javascript
it("test1", function() {
  const s = new Service("url", "key", "region");
  expect(s.call()).toBeDefined();
});
it("test2", function() {
  const s = new Service("url", "key", "region");
  expect(s.call()).toBeDefined();
});
```

### Error 38: Testing getter that has side effects
**Description:** Getter performs operations beyond returning a value.
```javascript
class Counter {
  get value() {
    this.logAccess();
    return this._value;
  }
}
```

### Error 39: Not testing Symbol.species
**Description:** Classes extending built-ins with Symbol.species not tested.
```javascript
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
```

### Error 40: Instanceof check in class method untested
**Description:** Method checks instanceof and behaves differently.
```javascript
class Container {
  add(item) {
    if (item instanceof Product) this.products.push(item);
    else this.items.push(item);
  }
}
```

### Error 41: Testing toJSON method
**Description:** toJSON method affects JSON.stringify behavior.
```javascript
class User {
  constructor(name, password) { this.name = name; this.password = password; }
  toJSON() { return { name: this.name }; }
}
```

### Error 42: Static getter test
**Description:** Static getter tested incorrectly as instance getter.
```javascript
class Config {
  static get apiUrl() { return "/api"; }
}
it("has api url", function() {
  const c = new Config();
  expect(c.apiUrl).toBe("/api");
});
```

### Error 43: Method override without super call
**Description:** Override method that should call super not tested correctly.
```javascript
class Base { init() { this.ready = true; } }
class Derived extends Base {
  init() { this.initialized = true; } // forgot super.init()
}
```

### Error 44: Not testing class field default values
**Description:** Class field default values should be tested.
```javascript
class Settings {
  theme = "light";
  pageSize = 10;
}
it("has defaults", function() {
  // missing tests
});
```

### Error 45: Testing private static fields
**Description:** Private static fields inaccessible from tests.
```javascript
class Secret {
  static #key = "secret-key";
  static getKey() { return this.#key; }
}
```

### Error 46: Class mixing concerns
**Description:** Class handles data, validation, and persistence.
```javascript
class User {
  constructor(data) { this.data = data; }
  validate() { return true; }
  save() { fetch("/api/users", { method: "POST" }); }
  render() { return "<div>" + this.data.name + "</div>"; }
}
```

### Error 47: Not using objectContaining for partial match
**Description:** Testing full class instance when only certain properties matter.
```javascript
it("creates user", function() {
  const u = new User("Alice", 30);
  expect(u).toEqual(new User("Alice", 30));
});
```

### Error 48: Inherited static method confusion
**Description:** Static methods are inherited but this binding is confusing.
```javascript
class Animal { static create() { return new this(); } }
class Dog extends Animal {}
// this in create() refers to Dog when called on Dog
```

### Error 49: Method name collision with test helper
**Description:** Class method named same as test helper function.
```javascript
class Data {
  it() { return "data"; }
}
// Shadows Jasmine's it function
```

### Error 50: Testing deprecated methods
**Description:** Class has deprecated methods that still need tests.
```javascript
class OldAPI {
  /** @deprecated Use newMethod instead */
  oldMethod() { return "old"; }
  newMethod() { return "new"; }
}
```

### Error 51: Class with EventEmitter not tested
**Description:** Event-emitting class does not have event tests.
```javascript
class Button extends EventEmitter {
  click() { this.emit("click", { x: 0, y: 0 }); }
}
```

### Error 52: Method returns promise but also throws
**Description:** Method throws synchronously for some paths, async for others.
```javascript
class Service {
  call() {
    if (!this.isReady) throw new Error("Not ready");
    return fetch("/api");
  }
}
```

### Error 53: Not checking this in method call
**Description:** Method relies on this being bound correctly.
```javascript
class UI {
  constructor(name) { this.name = name; }
  render() {
    return "<div>" + this.name + "</div>";
  }
}
// Test with detached method call
```

### Error 54: Testing computer property method
**Description:** Computed property names in class not easily tested.
```javascript
const METHOD = "process";
class Processor {
  [METHOD]() { return "processed"; }
}
```

### Error 55: Generator method in class
**Description:** Generator methods return iterators.
```javascript
class Range {
  *generate(start, end) {
    for (let i = start; i <= end; i++) yield i;
  }
}
```

### Error 56: Mixin composition testing
**Description:** Classes composed with mixins need composition tests.
```javascript
const Loggable = Base => class extends Base {
  log() { console.log("logged"); }
};
class App extends Loggable(Object) {}
```

### Error 57: Async generator in class
**Description:** Async generator methods need special async iteration testing.
```javascript
class Stream {
  async *fetchPages() {
    for (let i = 1; i <= 3; i++) {
      yield await fetch("/page/" + i);
    }
  }
}
```

### Error 58: Testing Symbol.toStringTag
**Description:** Custom toStringTag affects Object.prototype.toString.
```javascript
class CustomClass {
  get [Symbol.toStringTag]() { return "CustomClass"; }
}
```

### Error 59: Class with default export untested
**Description:** Default exported class not imported correctly in test.
```javascript
export default class Service {}
// Test: import Service from "./Service.js";
```

### Error 60: Not testing private method through public
**Description:** Private methods tested indirectly but not thoroughly.
```javascript
class Calculator {
  #validate(n) { return typeof n === "number"; }
  add(a, b) {
    if (!this.#validate(a) || !this.#validate(b)) throw new Error("Invalid");
    return a + b;
  }
}
```

### Error 61: Static method calling instance method
**Description:** Static method that uses this assumes instance context.
```javascript
class Factory {
  static create(data) {
    return new this(data); // this is Factory
  }
  constructor(data) { this.data = data; }
}
```

### Error 62: Testing frozen/sealed class
**Description:** Object.freeze or Object.seal on class prototype.
```javascript
class Constants {
  static get MAX() { return 100; }
}
Object.freeze(Constants);
```

### Error 63: Subclass does not call super in overridden method
**Description:** Override without super breaks parent behavior.
```javascript
class Base {
  save() { this.validate(); this.persist(); }
}
class Child extends Base {
  save() { this.persist(); } // skipped validate
}
```

### Error 64: Testing class that uses Proxy
**Description:** Class returns Proxy from constructor.
```javascript
class Reactive {
  constructor(data) {
    return new Proxy(data, {
      set(target, key, value) { target[key] = value; return true; }
    });
  }
}
```

### Error 65: Not testing Reflect-based methods
**Description:** Class uses Reflect for metaprogramming.
```javascript
class Meta {
  callMethod(name, ...args) {
    return Reflect.apply(this[name], this, args);
  }
}
```

### Error 66: Testing class decorator
**Description:** Decorated class needs decorator applied in test.
```javascript
function sealed(constructor) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
@sealed
class User {}
```

### Error 67: Class with Symbol.hasInstance
**Description:** Custom instanceof behavior.
```javascript
class Range {
  static [Symbol.hasInstance](obj) {
    return obj >= this.min && obj <= this.max;
  }
  static min = 1;
  static max = 10;
}
```

### Error 68: Not testing optional method existence
**Description:** Interface-like methods may not be implemented in subclass.
```javascript
class Plugin {
  init() { throw new Error("Not implemented"); }
}
class MyPlugin extends Plugin {
  // forgot to implement init
}
```

### Error 69: Method overload via rest params untested
**Description:** Method handles different argument counts.
```javascript
class Format {
  format(...args) {
    if (args.length === 1) return String(args[0]);
    if (args.length === 2) return args[0] + ": " + args[1];
  }
}
```

### Error 70: Testing class with private static method
**Description:** Private static method called from public static method.
```javascript
class Auth {
  static #hash(pw) { return pw.split("").reverse().join(""); }
  static login(pw) { return this.#hash(pw) === "drowssap"; }
}
```

## Issue Snippets

### Issue 1: No test file for class
**Description:** Classes exist but have no corresponding test file.
```javascript
// src/services/AuthService.js exists
// spec/AuthService.spec.js does not exist
```

### Issue 2: Testing all methods in one test
**Description:** Every class method tested in a single it block.
```javascript
it("user class", function() {
  const u = new User("Alice", 30);
  expect(u.getName()).toBe("Alice");
  expect(u.getAge()).toBe(30);
  expect(u.isAdult()).toBe(true);
  expect(u.toJSON()).toEqual({ name: "Alice", age: 30 });
});
```

### Issue 3: Tests depend on class instance order
**Description:** Shared class instance mutated across tests.
```javascript
describe("Queue", function() {
  let q = new Queue();
  it("enqueues", function() { q.enqueue("a"); expect(q.size()).toBe(1); });
  it("dequeues", function() { expect(q.dequeue()).toBe("a"); });
});
```

### Issue 4: Not testing constructor validation
**Description:** Constructor accepts invalid input without error.
```javascript
class User {
  constructor(name) { this.name = name; }
}
// No test for empty string, null, undefined
```

### Issue 5: Over-mocking class internals
**Description:** Mocking methods that should be tested together.
```javascript
it("processes order", function() {
  spyOn(Order.prototype, "validate");
  spyOn(Order.prototype, "calculateTotal");
  spyOn(Order.prototype, "applyDiscount");
  spyOn(Order.prototype, "save");
  const o = new Order();
  o.process();
  expect(o.validate).toHaveBeenCalled();
});
```

### Issue 6: Testing only public API of large class
**Description:** Large class has many methods but low test coverage.
```javascript
// 20 methods, only 5 have tests
```

### Issue 7: No tests for static methods
**Description:** Static factory or utility methods left untested.
```javascript
class UserFactory {
  static createAdmin() { return new User("admin", "admin@test.com"); }
  static createGuest() { return new User("guest", null); }
}
```

### Issue 8: Inconsistent naming of test files
**Description:** Test files don't match class file naming.
```javascript
// User.js -> userSpec.js, user_test.js, test_user.js
```

### Issue 9: Not testing inherited methods
**Description:** Testing methods only on parent class, not subclass instances.
```javascript
// Dog extends Animal with no tests for Dog
```

### Issue 10: No test for getter/setter pair
**Description:** Getter/setter not tested as a unit.
```javascript
class Temperature {
  get celsius() { return this._celsius; }
  set celsius(v) { this._celsius = v; }
}
```

### Issue 11: Duplicate test setup for each describe
**Description:** Creating class instances with same config in multiple describes.
```javascript
describe("Feature A", function() {
  const s = new Service("url", "key");
  it("test1", function() {});
});
describe("Feature B", function() {
  const s = new Service("url", "key");
  it("test2", function() {});
});
```

### Issue 12: Tests not covering class defaults
**Description:** Class default property values not verified.
```javascript
class Pagination {
  constructor() {
    this.page = 1;
    this.pageSize = 20;
  }
}
```

### Issue 13: No boundary tests for setters
**Description:** Setter not tested with min/max values.
```javascript
class Range {
  set min(v) {
    if (v > this.max) throw new Error("Min > Max");
    this._min = v;
  }
}
```

### Issue 14: Missing teardown for class side effects
**Description:** Class modifies global state without cleanup.
```javascript
class ThemeManager {
  setTheme(theme) { document.body.className = theme; }
}
```

### Issue 15: Not using beforeEach for new instances
**Description:** Fresh instances not created between tests.
```javascript
describe("Counter", function() {
  let c = new Counter();
  it("starts at 0", function() { expect(c.count).toBe(0); });
  it("increments", function() { c.increment(); expect(c.count).toBe(1); });
});
```

### Issue 16: Testing only happy path of class
**Description:** All tests pass with perfect inputs but edge cases untested.
```javascript
// validateEmail("user@example.com") tested
// validateEmail("") not tested
// validateEmail(null) not tested
```

### Issue 17: Class instantiation inside test description
**Description:** Creating instance in describe scope shares state.
```javascript
describe("Suite", function() {
  const db = new Database(); // created once
  it("test", function() {});
});
```

### Issue 18: Not testing async initialization
**Description:** Class has async init method not tested.
```javascript
class App {
  async init() { this.data = await fetch("/api/init"); }
}
```

### Issue 19: Testing concrete implementation instead of interface
**Description:** Tests break when implementation changes but interface stays same.
```javascript
it("stores internally", function() {
  const s = new Stack();
  s.push(1);
  expect(s._items.length).toBe(1);
});
```

### Issue 20: No test for null/undefined handling
**Description:** Method called with null/undefined not tested.
```javascript
class Greeter {
  greet(name) { return "Hello, " + (name || "Guest"); }
}
// null and undefined paths not tested
```

### Issue 21: Class method returns this not used
**Description:** Fluent interface not tested as fluent.
```javascript
it("configures", function() {
  const c = new Config();
  c.setHost("localhost");
  c.setPort(3000);
  // should chain: c.setHost("localhost").setPort(3000)
});
```

### Issue 22: Not testing class with thrown exceptions
**Description:** Method throws but no test for exception type.
```javascript
class Calculator {
  divide(a, b) {
    if (b === 0) throw new DivideByZeroError();
    return a / b;
  }
}
```

### Issue 23: Testing private helpers indirectly
**Description:** Private helper methods tested through public methods but no coverage.
```javascript
class Report {
  generate() { return this.#format(this.#fetch()); }
  #fetch() { return "data"; }
  #format(d) { return d.toUpperCase(); }
}
```

### Issue 24: No test for empty state of collection class
**Description:** Collection class not tested when empty.
```javascript
class Stack {
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
}
// Empty stack behavior not tested
```

### Issue 25: Over-specifying mock return values
**Description:** Mocks with exact return values create brittle tests.
```javascript
spyOn(service, "getUser").and.returnValue({ id: 1, name: "Alice", email: "a@b.com", phone: "123" });
```

### Issue 26: Not testing class toString/ valueOf
**Description:** Custom toString or valueOf not tested.
```javascript
class Money {
  constructor(amount) { this.amount = amount; }
  toString() { return "$" + this.amount.toFixed(2); }
}
```

### Issue 27: No performance test for class methods
**Description:** Methods that should be efficient not tested for performance.
```javascript
class Sorter {
  sort(arr) { return arr.sort((a, b) => a - b); }
}
```

### Issue 28: Testing class event emissions
**Description:** Class emits events but listeners not tested.
```javascript
class Timer {
  constructor() { this.listeners = {}; }
  on(event, fn) { (this.listeners[event] = this.listeners[event] || []).push(fn); }
  emit(event, ...args) { (this.listeners[event] || []).forEach(fn => fn(...args)); }
}
```

### Issue 29: No test for capacity limits
**Description:** Collection class with capacity limits not tested.
```javascript
class BoundedQueue {
  constructor(limit) { this.limit = limit; this.items = []; }
  enqueue(item) {
    if (this.items.length >= this.limit) throw new Error("Full");
    this.items.push(item);
  }
}
```

### Issue 30: Using real class in unit test for its dependency
**Description:** Testing class A with real instance of class B instead of mock.
```javascript
it("order service", function() {
  const db = new Database(); // real database
  const email = new EmailService(); // real email
  const service = new OrderService(db, email);
});
```

## Modify Snippets

### Modify 1: Create a test for a simple Calculator class
**Description:** Write a test for Calculator.add() method.
```javascript
class Calculator {
  add(a, b) { return a + b; }
}
// Write test for add
```

### Modify 2: Test class instantiation
**Description:** Write a test that creates a User instance and checks it is defined.
```javascript
class User {
  constructor(name) { this.name = name; }
}
// Write test for instantiation
```

### Modify 3: Test getter method
**Description:** Write a test for the fullName getter.
```javascript
class Person {
  constructor(first, last) { this.first = first; this.last = last; }
  get fullName() { return this.first + " " + this.last; }
}
// Test fullName getter
```

### Modify 4: Test setter method
**Description:** Write a test for the age setter with validation.
```javascript
class Person {
  set age(v) {
    if (v < 0) throw new Error("Invalid age");
    this._age = v;
  }
  get age() { return this._age; }
}
// Test setter with valid and invalid values
```

### Modify 5: Test static method
**Description:** Write a test for static create method.
```javascript
class User {
  static createGuest() { return new User("Guest"); }
  constructor(name) { this.name = name; }
}
// Test static createGuest
```

### Modify 6: Test that method throws
**Description:** Test that BankAccount.withdraw throws on insufficient funds.
```javascript
class BankAccount {
  constructor() { this.balance = 0; }
  withdraw(amount) {
    if (amount > this.balance) throw new Error("Insufficient");
    this.balance -= amount;
  }
}
// Test withdraw throws
```

### Modify 7: Test async class method
**Description:** Write a test for an async fetch method on API class.
```javascript
class API {
  async fetchData() { return { data: "test" }; }
}
// Test async method with await
```

### Modify 8: Test class with spy on method
**Description:** Create a spy on the save method of User class.
```javascript
class User {
  save() { return "saved"; }
}
// Spy on save and verify called
```

### Modify 9: Test subclass method override
**Description:** Test that Dog.speak() returns "Woof" and calls parent?
```javascript
class Animal { speak() { return "Sound"; } }
class Dog extends Animal { speak() { return "Woof"; } }
// Test Dog.speak() override
```

### Modify 10: Test private method through public
**Description:** Test that #validate is called when add() is invoked.
```javascript
class SafeCalc {
  #validate(n) { return typeof n === "number"; }
  add(a, b) {
    if (!this.#validate(a) || !this.#validate(b)) throw new Error();
    return a + b;
  }
}
// Test that validation works via add
```

### Modify 11: Add beforeEach for class instance
**Description:** Create a new Stack instance before each test.
```javascript
describe("Stack", function() {
  let stack;
  // Add beforeEach
  it("pushes item", function() { });
  it("pops item", function() { });
});
```

### Modify 12: Test class with constructor params
**Description:** Test that Config class stores provided values.
```javascript
class Config {
  constructor(host, port) { this.host = host; this.port = port; }
}
// Test constructor params
```

### Modify 13: Test method chaining
**Description:** Test that QueryBuilder methods return this.
```javascript
class QB {
  constructor() { this.q = ""; }
  where(c) { this.q += " WHERE " + c; return this; }
  orderBy(c) { this.q += " ORDER BY " + c; return this; }
}
// Test chaining returns this
```

### Modify 14: Test class with default values
**Description:** Test that Pagination has default page size.
```javascript
class Pagination {
  constructor() { this.page = 1; this.limit = 10; }
}
// Test defaults
```

### Modify 15: Test array returned from class method
**Description:** Test that getItems() returns an array.
```javascript
class Cart {
  constructor() { this.items = []; }
  add(item) { this.items.push(item); }
  getItems() { return this.items; }
}
// Test array returned
```

### Modify 16: Test object returned from class method
**Description:** Test that getUser() returns object with correct shape.
```javascript
class UserService {
  getUser(id) { return { id, name: "Alice" }; }
}
// Test returned object shape
```

### Modify 17: Test class with EventEmitter
**Description:** Test that Button emits click event.
```javascript
class Button extends EventEmitter {
  click() { this.emit("click", { x: 0, y: 0 }); }
}
// Test event emission
```

### Modify 18: Test class that uses Math.random
**Description:** Mock Math.random to test Lottery class deterministically.
```javascript
class Lottery {
  pick() { return Math.random() > 0.5 ? "win" : "lose"; }
}
// Mock Math.random to test both outcomes
```

### Modify 19: Test instanceof check
**Description:** Test that created object is instance of the class.
```javascript
class Animal {}
// Test instanceof
```

### Modify 20: Test class property count
**Description:** Test that User object has exactly 3 properties.
```javascript
class User {
  constructor(name, email, age) {
    this.name = name; this.email = email; this.age = age;
  }
}
// Test property count
```

### Modify 21: Test method with default parameter
**Description:** Test greet method with and without argument.
```javascript
class Greeter {
  greet(name = "Guest") { return "Hello, " + name; }
}
// Test both cases
```

### Modify 22: Test class with Symbol.iterator
**Description:** Test that Range class is iterable.
```javascript
class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  *[Symbol.iterator]() { for (let i = this.start; i <= this.end; i++) yield i; }
}
// Test iteration
```

### Modify 23: Test mixin applied to class
**Description:** Test that mixin methods work on the class.
```javascript
const TimestampMixin = Base => class extends Base {
  get timestamp() { return Date.now(); }
};
class Record extends TimestampMixin(Object) {}
// Test timestamp method
```

### Modify 24: Test singleton class
**Description:** Test that Singleton returns same instance.
```javascript
class Singleton {
  constructor() {
    if (Singleton._instance) return Singleton._instance;
    Singleton._instance = this;
  }
}
// Test singleton behavior
```

### Modify 25: Test frozen class constants
**Description:** Test that constant values on frozen class are correct.
```javascript
class MathConstants {
  static get PI() { return 3.14159; }
}
Object.freeze(MathConstants);
// Test PI value
```

### Modify 26: Test class with Symbol.species
**Description:** Test that extending MyArray returns correct type.
```javascript
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
// Test species behavior
```

### Modify 27: Test getter for computed property
**Description:** Test fullName combines first and last.
```javascript
class Person {
  constructor(first, last) { this.first = first; this.last = last; }
  get fullName() { return this.first + " " + this.last; }
}
// Test computed getter
```

### Modify 28: Test toJSON method
**Description:** Test that JSON.stringify calls toJSON correctly.
```javascript
class User {
  constructor(name, pwd) { this.name = name; this.pwd = pwd; }
  toJSON() { return { name: this.name }; }
}
// Test JSON.stringify result
```

### Modify 29: Test class with static factory method
**Description:** Test the static factory creates correct instances.
```javascript
class User {
  static fromJSON(json) { return new User(json.name, json.age); }
  constructor(name, age) { this.name = name; this.age = age; }
}
// Test fromJSON factory
```

### Modify 30: Test valueOf method
**Description:** Test that Money valueOf returns numeric amount.
```javascript
class Money {
  constructor(amount) { this.amount = amount; }
  valueOf() { return this.amount; }
}
// Test valueOf
```

### Modify 31: Test class with private static
**Description:** Test public method that uses private static field.
```javascript
class Auth {
  static #secret = "key";
  static validate(input) { return input === this.#secret; }
}
// Test validate
```

### Modify 32: Test subclass super call
**Description:** Test that subclass calls super method correctly.
```javascript
class Base { save() { return "base"; } }
class Derived extends Base { save() { return super.save() + "-derived"; } }
// Test super call in chain
```

### Modify 33: Test class method with rest params
**Description:** Test sum method with variable arguments.
```javascript
class Calculator {
  sum(...nums) { return nums.reduce((a, b) => a + b, 0); }
}
// Test rest params
```

### Modify 34: Test spread operator in class method
**Description:** Test merge method that spreads objects.
```javascript
class Merger {
  merge(...objs) { return Object.assign({}, ...objs); }
}
// Test object spread
```

### Modify 35: Test class that caches results
**Description:** Test that memoize method caches results.
```javascript
class Memoizer {
  constructor() { this.cache = new Map(); }
  compute(n) {
    if (this.cache.has(n)) return this.cache.get(n);
    const result = n * 2;
    this.cache.set(n, result);
    return result;
  }
}
// Test caching behavior
```

### Modify 36: Test class with computed property name
**Description:** Test method with computed name using symbol.
```javascript
const METHOD = "compute";
class Processor {
  [METHOD](val) { return val * 2; }
}
// Test computed method
```

### Modify 37: Test that class throws on new.target
**Description:** Test abstract class cannot be instantiated.
```javascript
class AbstractBase {
  constructor() {
    if (new.target === AbstractBase) throw new Error("Abstract");
  }
}
// Test instantiation throws
```

### Modify 38: Test class with Proxy return
**Description:** Test class that returns Proxy from constructor.
```javascript
class Reactive {
  constructor(data) {
    return new Proxy(data, {
      get(target, key) { return target[key]; }
    });
  }
}
// Test proxy behavior
```

### Modify 39: Test Symbol.hasInstance
**Description:** Test custom instanceof behavior.
```javascript
class MyNumber {
  static [Symbol.hasInstance](obj) { return typeof obj === "number"; }
}
// Test instanceof
```

### Modify 40: Test class with getter that validates
**Description:** Test getter that validates before returning.
```javascript
class SafeArray {
  constructor(arr) { this.arr = arr; }
  get first() {
    if (this.arr.length === 0) throw new Error("Empty");
    return this.arr[0];
  }
}
// Test getter with valid/empty cases
```

### Modify 41: Test private static method via public
**Description:** Test public method that uses private static.
```javascript
class HashService {
  static #hash(s) { return btoa(s); }
  static encode(s) { return this.#hash(s); }
}
// Test encode which uses private static
```

### Modify 42: Test class with Symbol.toStringTag
**Description:** Test toString returns correct tag.
```javascript
class Custom {
  get [Symbol.toStringTag]() { return "Custom"; }
}
// Test Object.prototype.toString
```

### Modify 43: Test class with async generator
**Description:** Test async generator yields values.
```javascript
class AsyncStream {
  async *generate() { yield 1; yield 2; yield 3; }
}
// Test async generator
```

### Modify 44: Test chain of inherited classes
**Description:** Test three-level inheritance chain.
```javascript
class A { method() { return "A"; } }
class B extends A { method() { return super.method() + "B"; } }
class C extends B { method() { return super.method() + "C"; } }
// Test chain
```

### Modify 45: Test class using field initializer
**Description:** Test public field initialized to default.
```javascript
class Config {
  timeout = 5000;
  retries = 3;
}
// Test field defaults
```

### Modify 46: Test class with optional chaining
**Description:** Test method that uses optional chaining internally.
```javascript
class SafeAccess {
  getCity(user) { return user?.address?.city; }
}
// Test with different object shapes
```

### Modify 47: Test nullish coalescing in class
**Description:** Test method using ?? operator.
```javascript
class ConfigReader {
  getPort(config) { return config?.port ?? 3000; }
}
// Test ?? behavior
```

### Modify 48: Test class with dynamic import
**Description:** Test class that dynamically imports modules.
```javascript
class LazyLoader {
  async load(name) { return import("./modules/" + name + ".js"); }
}
// Test dynamic import
```

### Modify 49: Test class that registers itself
**Description:** Test class that adds itself to a registry.
```javascript
const registry = new Map();
class Plugin {
  static register(name, cls) { registry.set(name, cls); }
}
// Test registration
```

### Modify 50: Test that class follows interface contract
**Description:** Test that class has required methods.
```javascript
class Component {
  render() { return ""; }
  mount() {}
  destroy() {}
}
// Test interface compliance
```
