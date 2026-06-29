# Level 88: Module 18 – Private Fields, Encapsulation, Getters & Setters

## Error Snippets (70)

### Error 1: Private field syntax using underscore
**Description:** Using underscore convention doesn't enforce privacy
```javascript
class BankAccount {
  constructor(balance) {
    this._balance = balance;
  }
}
const acc = new BankAccount(100);
acc._balance = -50; // No protection
```
### Error 2: Using # private field incorrectly (static)
**Description:** Private fields are instance-specific, not accessible statically
```javascript
class MyClass {
  #value = 42;
  static getValue() {
    return this.#value;
  }
}
```
### Error 3: Accessing private field from outside class
**Description:** Private fields cannot be accessed from outside the class
```javascript
class Person {
  #ssn = '123-45-6789';
}
const p = new Person();
console.log(p.#ssn);
```
### Error 4: Private field not declared
**Description:** Private fields must be declared before use
```javascript
class User {
  constructor(name) {
    this.#name = name;
  }
}
```
### Error 5: Duplicate private field declaration
**Description:** Private fields cannot be declared twice
```javascript
class Test {
  #x = 1;
  #x = 2;
}
```
### Error 6: Private field name conflict with method
**Description:** Private field and method cannot have same name
```javascript
class Example {
  #method = 42;
  #method() { return this.#method; }
}
```
### Error 7: Getter recursion infinite loop
**Description:** Getter referencing itself causes stack overflow
```javascript
class Person {
  constructor(name) { this._name = name; }
  get name() { return this.name; }
  set name(v) { this.name = v; }
}
```
### Error 8: Setter infinite loop
**Description:** Setter calling itself with = operator
```javascript
class Temperature {
  set celsius(value) {
    this.celsius = value;
  }
}
```
### Error 9: Getter/setter without underscore backing field
**Description:** Accessor tries to use same name property as backing field
```javascript
class Rectangle {
  constructor(w, h) { this.width = w; this.height = h; }
  get area() { return this.width * this.height; }
}
```
### Error 10: Private field in extends with no super
**Description:** Derived class cannot access parent's private fields
```javascript
class Parent {
  #secret = 'parent secret';
}
class Child extends Parent {
  reveal() { return this.#secret; }
}
```
### Error 11: Private field accessed via this in static
**Description:** Static methods cannot access instance private fields
```javascript
class Config {
  #value = 'config';
  static getValue(instance) {
    return instance.#value;
  }
}
```
### Error 12: Assigning to private field from prototype
**Description:** Private fields cannot be set via prototype
```javascript
class MyClass {
  #x = 1;
}
MyClass.prototype.#x = 2;
```
### Error 13: Private field with computed name
**Description:** Computed property names don't work with # syntax
```javascript
const field = '#x';
class MyClass {
  [field] = 42;
}
```
### Error 14: Private getter not supported in older syntax
**Description:** Private getters need correct syntax
```javascript
class MyClass {
  #value = 10;
  get #value() { return this.#value; }
}
```
### Error 15: Private setter syntax error
**Description:** Private setter must have exactly one parameter
```javascript
class MyClass {
  #value = 0;
  set #value(v1, v2) { this.#value = v1; }
}
```
### Error 16: Private field initialized twice
**Description:** Private field in class body and in constructor
```javascript
class MyClass {
  #x = 1;
  constructor() {
    this.#x = 2;
  }
}
```
### Error 17: Private field not initialized
**Description:** Private field read but never assigned
```javascript
class Container {
  #items;
  add(item) { this.#items.push(item); }
}
```
### Error 18: Passing private field to function
**Description:** Private field reference passed to external function
```javascript
class Secure {
  #key = 'secret';
  leak() { return this.#key; }
}
```
### Error 19: Checking private field existence with hasOwnProperty
**Description:** Private fields are not own properties
```javascript
class Test {
  #x = 1;
}
const t = new Test();
console.log(t.hasOwnProperty('#x'));
```
### Error 20: Using delete on private field
**Description:** Private fields cannot be deleted
```javascript
class MyClass {
  #x = 1;
  remove() { delete this.#x; }
}
```
### Error 21: Private field name starts with double underscore
**Description:** # is the only private syntax, not __
```javascript
class MyClass {
  __hidden = 'value'; // Not private
}
```
### Error 22: Getter returns undefined but expects value
**Description:** Getter doesn't return the backing field
```javascript
class Counter {
  constructor() { this._count = 0; }
  get count() { return; }
  set count(v) { this._count = v; }
}
```
### Error 23: Setter not validating input
**Description:** Setter allows invalid values
```javascript
class User {
  constructor() { this._age = 0; }
  set age(value) { this._age = value; }
  get age() { return this._age; }
}
```
### Error 24: Getter/setter type mismatch
**Description:** Getter returns different type than setter accepts
```javascript
class Product {
  constructor() { this._price = 0; }
  set price(v) { this._price = parseFloat(v); }
  get price() { return `$${this._price.toFixed(2)}`; }
}
```
### Error 25: Public and private field with same name
**Description:** Cannot have both public and private fields with same name
```javascript
class Test {
  x = 1;
  #x = 2;
}
```
### Error 26: Private static field syntax
**Description:** Private static fields need correct ordering
```javascript
class Config {
  static #instances = 0;
  constructor() { Config.#instances++; }
}
```
### Error 27: Accessing private static from instance
**Description:** Instance method accessing static private field
```javascript
class Logger {
  static #prefix = '[LOG]';
  log(msg) { console.log(this.#prefix + msg); }
}
```
### Error 28: Private method called from outside
**Description:** Private methods cannot be called externally
```javascript
class Calculator {
  #validate(n) { return typeof n === 'number'; }
  add(a, b) { return a + b; }
}
const calc = new Calculator();
calc.#validate(5);
```
### Error 29: Private method defined with function keyword
**Description:** Private methods can't use function keyword in class
```javascript
class MyClass {
  #function myMethod() {}
}
```
### Error 30: Setter called without argument
**Description:** Setter must be called with a value
```javascript
class Box {
  set content(v) { this._content = v; }
}
const b = new Box();
b.content = ;
```
### Error 31: Getter called as method
**Description:** Getter accessed with () as if it's a method
```javascript
class Circle {
  constructor(r) { this.r = r; }
  get area() { return Math.PI * this.r * this.r; }
}
const c = new Circle(5);
console.log(c.area());
```
### Error 32: Private field in object literal
**Description:** Private fields only work in classes, not objects
```javascript
const obj = {
  #hidden: 'value'
};
```
### Error 33: Using this.# in constructor parameter
**Description:** Can't destructure to private fields
```javascript
class Person {
  #name;
  constructor({ #name }) {
    this.#name = #name;
  }
}
```
### Error 34: Private field with Object.defineProperty
**Description:** Cannot define private fields via defineProperty
```javascript
class MyClass {}
Object.defineProperty(MyClass.prototype, '#x', { value: 1 });
```
### Error 35: Private field in eval
**Description:** eval cannot access private fields
```javascript
class MyClass {
  #x = 42;
  reveal() { return eval('this.#x'); }
}
```
### Error 36: Getter throwing when property not set
**Description:** Getter called before setter
```javascript
class User {
  get name() { return this._name.toUpperCase(); }
  set name(v) { this._name = v; }
}
const u = new User();
console.log(u.name);
```
### Error 37: Setter that doesn't store value
**Description:** Setter validates but forgets to assign
```javascript
class Validator {
  set email(v) {
    if (!v.includes('@')) throw new Error('Invalid');
    // forgot: this._email = v;
  }
  get email() { return this._email; }
}
```
### Error 38: Private field in toString template
**Description:** Private field reference in template literal
```javascript
class Person {
  #name = 'Alice';
  toString() { return `Person: ${this.#name}`; }
}
```
### Error 39: Private field in JSON.stringify
**Description:** Private fields are not included in JSON
```javascript
class User {
  #password = 'secret';
  constructor(name) { this.name = name; }
}
const u = new User('Alice');
console.log(JSON.stringify(u));
```
### Error 40: Private field in spread operator
**Description:** Private fields don't spread
```javascript
class MyClass {
  #x = 1;
  y = 2;
}
const obj = new MyClass();
console.log({ ...obj });
```
### Error 41: Private field with in operator
**Description:** in operator doesn't work with private fields
```javascript
class Test {
  #x = 1;
}
const t = new Test();
console.log('#x' in t);
```
### Error 42: Private field in for...in
**Description:** Private fields don't appear in for...in loops
```javascript
class MyClass {
  #secret = 'hidden';
  visible = 'shown';
}
const obj = new MyClass();
for (const key in obj) console.log(key);
```
### Error 43: Private field in Object.keys
**Description:** Private fields not returned by Object.keys
```javascript
class MyClass {
  #x = 1;
  y = 2;
}
console.log(Object.keys(new MyClass()));
```
### Error 44: Private static getter wrong reference
**Description:** Accessing private static getter from static method
```javascript
class Config {
  static get #secret() { return 'secret-key'; }
  static getSecret() { return this.#secret; }
}
```
### Error 45: Private setter without getter
**Description:** Writing a private setter without a matching getter
```javascript
class WriteOnly {
  set #value(v) { this._value = v; }
  setValue(v) { this.#value = v; }
}
```
### Error 46: Private getter without setter
**Description:** Read-only property with private getter but no setter
```javascript
class ReadOnly {
  get #value() { return 42; }
  getValue() { return this.#value; }
}
```
### Error 47: Private field in class extends null
**Description:** Private field access in class extending null
```javascript
class NullExtended extends null {
  #x = 1;
  getX() { return this.#x; }
}
```
### Error 48: Private field in Proxy trap
**Description:** Proxy handler cannot intercept private field access
```javascript
class Secret {
  #value = 'secret';
}
const proxy = new Proxy(new Secret(), {});
console.log(proxy.#value);
```
### Error 49: Private field name starting with digit
**Description:** Private field names must be valid identifiers
```javascript
class MyClass {
  #1st = 'first';
}
```
### Error 50: Private field in destructuring
**Description:** Cannot destructure private fields
```javascript
class MyClass {
  #x = 1;
  #y = 2;
  getCoords() {
    const { #x, #y } = this;
    return { x: #x, y: #y };
  }
}
```
### Error 51: Private field in default parameter
**Description:** Private field as default parameter value
```javascript
class MyClass {
  #default = 42;
  method(x = this.#default) { return x; }
}
```
### Error 52: Overriding private field in subclass
**Description:** Subclass cannot override parent's private field
```javascript
class Parent {
  #field = 'parent';
}
class Child extends Parent {
  #field = 'child'; // Different field
}
```
### Error 53: Private field in Object.assign
**Description:** Object.assign doesn't copy private fields
```javascript
class MyClass {
  #x = 1;
  y = 2;
}
const a = new MyClass();
const b = {};
Object.assign(b, a);
console.log(b.#x);
```
### Error 54: Private field in structuredClone
**Description:** structuredClone doesn't clone private fields
```javascript
class MyClass {
  #data = [1, 2, 3];
  constructor() { this.public = 'visible'; }
}
const obj = new MyClass();
const cloned = structuredClone(obj);
console.log(cloned.#data);
```
### Error 55: Getter used before setter with object literal
**Description:** Getter on object literal accessed before set
```javascript
const obj = {
  get value() { return this._value; },
  set value(v) { this._value = v; }
};
console.log(obj.value);
```
### Error 56: Multiple getters for same property
**Description:** Cannot have more than one getter for a property
```javascript
class MyClass {
  get value() { return 1; }
  get value() { return 2; }
}
```
### Error 57: Accessor and data property same name
**Description:** Cannot have both accessor and data property with same name
```javascript
class MyClass {
  prop = 1;
  get prop() { return 2; }
}
```
### Error 58: Private field with this.# in static block
**Description:** this in static block refers to class, not instance
```javascript
class MyClass {
  static #count = 0;
  static {
    this.#count++;
  }
}
```
### Error 59: Private field accessed in class expression
**Description:** Private field in unnamed class expression
```javascript
const MyClass = class {
  #value = 42;
  getValue() { return this.#value; }
};
```
### Error 60: Private field with same name in prototype
**Description:** Accidentally defining same private field on prototype
```javascript
class MyClass {
  #method() {}
}
MyClass.prototype.#method = function() {};
```
### Error 61: Getter/setter for same property in different classes
**Description:** Inheritance of accessor properties
```javascript
class Parent {
  get value() { return 'parent'; }
}
class Child extends Parent {
  get value() { return 'child'; }
}
```
### Error 62: Object.defineProperty on class with private fields
**Description:** defineProperty doesn't affect private fields
```javascript
class MyClass {
  #x = 1;
  constructor() {
    Object.defineProperty(this, '#x', { value: 2 });
  }
}
```
### Error 63: Private field in WeakMap-style encapsulation
**Description:** Using WeakMap for private data alongside # syntax
```javascript
const privates = new WeakMap();
class MyClass {
  #x = 1;
  constructor() {
    privates.set(this, { y: 2 });
  }
}
```
### Error 64: Setter with rest parameter
**Description:** Setters must have exactly one parameter, not rest
```javascript
class MyClass {
  set values(...args) {
    this._values = args;
  }
}
```
### Error 65: Getter defining property that already exists
**Description:** Getter on property that already has a value
```javascript
const obj = {
  name: 'Alice',
  get name() { return this._name; },
  set name(v) { this._name = v; }
};
```
### Error 66: Private method before private field
**Description:** Order of private members doesn't matter in class body
```javascript
class MyClass {
  #method() { return this.#field; }
  #field = 42;
}
```
### Error 67: Private field in Symbol.species
**Description:** Cannot use private fields in Symbol.species
```javascript
class MyArray extends Array {
  static get [Symbol.species]() {
    return this.#privateSpecies;
  }
  static #privateSpecies = Array;
}
```
### Error 68: Accessor in class field initializer
**Description:** Accessor property defined in class field syntax
```javascript
class MyClass {
  get value = () => 42;
}
```
### Error 69: Private field in console.log
**Description:** Private field value displayed in console
```javascript
class Secret {
  #pin = 1234;
  constructor() { console.log(this.#pin); }
}
```
### Error 70: Private field naming collision with library
**Description:** Private field name conflicts with transpiled output
```javascript
class MyClass {
  #value = 1; // Some transpilers use _value
  _value = 2; // Conflict
}
```

## Issue Snippets (30)

### Issue 1: Not using private fields when needed
**Description:** Internal state exposed as public properties
```javascript
class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
    this.transactions = [];
  }
  withdraw(amount) {
    if (amount > this.balance) throw new Error('Insufficient funds');
    this.balance -= amount;
    this.transactions.push({ type: 'withdraw', amount });
  }
}
```
### Issue 2: Unnecessary getters and setters
**Description:** Getters/setters that add no logic or validation
```javascript
class Person {
  constructor(name) {
    this._name = name;
    this._age = age;
  }
  get name() { return this._name; }
  set name(v) { this._name = v; }
  get age() { return this._age; }
  set age(v) { this._age = v; }
}
```
### Issue 3: Mutable exposed array/object references
**Description:** Returning internal array reference allows external mutation
```javascript
class ShoppingCart {
  constructor() { this._items = []; }
  get items() { return this._items; }
  addItem(item) { this._items.push(item); }
}
const cart = new ShoppingCart();
cart.items.push('malicious'); // External mutation
```
### Issue 4: Not validating in setters
**Description:** Setter accepts any value without validation
```javascript
class User {
  constructor() { this._email = ''; }
  set email(value) { this._email = value; }
  get email() { return this._email; }
}
```
### Issue 5: Using underscore convention instead of # private
**Description:** Still relying on naming convention for privacy
```javascript
class Config {
  constructor() {
    this._secretKey = 'abc123';
    this._apiEndpoint = 'https://api.example.com';
  }
  getSecret() { return this._secretKey; }
}
```
### Issue 6: Exposing internal implementation via getters
**Description:** Getter returns internal data structure directly
```javascript
class DataStore {
  constructor() {
    this._data = new Map();
  }
  get data() { return this._data; }
  set(key, value) { this._data.set(key, value); }
}
```
### Issue 7: Getter with side effects
**Description:** Getter modifies state when called
```javascript
class Counter {
  constructor() { this._count = 0; }
  get count() {
    this._count++;
    return this._count;
  }
}
```
### Issue 8: Setter that silently ignores invalid input
**Description:** Setter doesn't throw on invalid input
```javascript
class Temperature {
  constructor() { this._celsius = 0; }
  set celsius(value) {
    if (typeof value === 'number') {
      this._celsius = value;
    }
    // Silently ignores non-numbers
  }
}
```
### Issue 9: Exposing mutable array with getter
**Description:** Getter returns internal array that can be mutated
```javascript
class TodoList {
  constructor() { this._todos = []; }
  get todos() { return this._todos; }
  add(text) { this._todos.push({ text, done: false }); }
}
```
### Issue 10: Not using private methods for internal logic
**Description:** Internal helper methods exposed publicly
```javascript
class PaymentProcessor {
  validateCard(card) { /* internal validation */ }
  charge(amount, card) {
    if (this.validateCard(card)) {
      // process
    }
  }
}
```
### Issue 11: Getter returning new object each call
**Description:** Creates unnecessary garbage
```javascript
class Point {
  constructor(x, y) { this._x = x; this._y = y; }
  get coords() { return { x: this._x, y: this._y }; }
}
```
### Issue 12: Over-encapsulation of simple properties
**Description:** Hiding properties that don't need protection
```javascript
class Product {
  #name;
  #price;
  #sku;
  constructor(name, price, sku) {
    this.#name = name;
    this.#price = price;
    this.#sku = sku;
  }
  get name() { return this.#name; }
  get price() { return this.#price; }
  get sku() { return this.#sku; }
}
```
### Issue 13: Setter without type checking
**Description:** Setter doesn't verify type
```javascript
class Score {
  constructor() { this._points = 0; }
  set points(value) {
    this._points = value;
  }
}
```
### Issue 14: Private field with no accessor
**Description:** Private field has no way to read from outside
```javascript
class SecretHolder {
  #secret = 'hidden';
  // No way to access #secret externally
}
```
### Issue 15: Public property that should be private
**Description:** Internal state meant to be private is public
```javascript
class Timer {
  constructor() { this._startTime = null; this._elapsed = 0; }
  start() { this._startTime = Date.now(); }
  stop() { this._elapsed += Date.now() - this._startTime; this._startTime = null; }
}
```
### Issue 16: Encapsulation via WeakMap but mixing with # fields
**Description:** Inconsistent encapsulation approach
```javascript
const _data = new WeakMap();
class User {
  #name;
  constructor(name, email) {
    this.#name = name;
    _data.set(this, { email });
  }
}
```
### Issue 17: Getter doing expensive computation without caching
**Description:** Expensive operation repeated each time getter is called
```javascript
class Report {
  constructor(data) { this._data = data; }
  get summary() {
    return this._data
      .map(/* expensive transformation */)
      .filter(/* expensive filter */);
  }
}
```
### Issue 18: Setter that doesn't trigger side effects
**Description:** Setter for dependent property without updating related values
```javascript
class Rectangle {
  constructor() { this._width = 0; this._height = 0; this._area = 0; }
  set width(v) { this._width = v; }
  set height(v) { this._height = v; }
  get area() { return this._area; }
}
```
### Issue 19: Exposing internal Map/Set directly
**Description:** Returning reference to internal collection
```javascript
class UserRegistry {
  #users = new Map();
  get users() { return this.#users; }
  add(user) { this.#users.set(user.id, user); }
}
```
### Issue 20: Not freezing returned objects
**Description:** Returned mutable objects from getters can be modified
```javascript
class Config {
  #settings = { theme: 'dark', lang: 'en' };
  get settings() { return this.#settings; }
}
```
### Issue 21: Private field used only in one method
**Description:** Field could be a local variable instead
```javascript
class Logger {
  #format = '[%s]';
  log(msg) { console.log(this.#format, msg); }
}
```
### Issue 22: Unnecessarily exposing setters
**Description:** Read-only properties with public setters
```javascript
class User {
  #createdAt;
  constructor() { this.#createdAt = new Date(); }
  get createdAt() { return this.#createdAt; }
  set createdAt(value) { this.#createdAt = value; } // Shouldn't exist
}
```
### Issue 23: Getter/setter for computed property that never changes
**Description:** Computed value that could be a constructor initialization
```javascript
class Circle {
  constructor(radius) { this._radius = radius; }
  get area() { return Math.PI * this._radius ** 2; }
  get circumference() { return 2 * Math.PI * this._radius; }
}
```
### Issue 24: Setter calling other setters causing side effects
**Description:** Cascading setters cause unexpected behavior
```javascript
class Square {
  set side(v) { this._side = v; this.area = v * v; }
  set area(v) { this._area = v; this._side = Math.sqrt(v); }
}
```
### Issue 25: Not making immutable copies in getters
**Description:** Getter returns reference to internal state
```javascript
class StateManager {
  #state = { count: 0 };
  get state() { return this.#state; }
  setState(newState) { this.#state = { ...this.#state, ...newState }; }
}
```
### Issue 26: Getter throwing non-standard errors
**Description:** Getter throwing instead of returning a safe default
```javascript
class User {
  #name;
  get name() {
    if (!this.#name) throw new Error('Name not set');
    return this.#name;
  }
}
```
### Issue 27: Private methods that are too long
**Description:** Long private methods defeat encapsulation purpose
```javascript
class DataProcessor {
  #processData() { /* 100 lines */ }
  #validateInput() { /* 50 lines */ }
  #formatOutput() { /* 60 lines */ }
}
```
### Issue 28: Using getter for async operation
**Description:** Getters cannot be async
```javascript
class DataService {
  #cache = new Map();
  get data() {
    if (this.#cache.has('data')) return this.#cache.get('data');
    return fetch('/api/data').then(r => r.json());
  }
}
```
### Issue 29: Setter used as method
**Description:** Setter called as if it's a regular method
```javascript
class Config {
  set(key, value) { this['_' + key] = value; }
  get(key) { return this['_' + key]; }
}
```
### Issue 30: Not using accessor for consistent API
**Description:** Mixing property access and method calls for similar concepts
```javascript
class User {
  getFullName() { return `${this.firstName} ${this.lastName}`; }
  get age() { return this._age; }
  setAge(v) { this._age = v; }
}
```

## Modification Snippets (50)

### Modify 1: Convert underscore prefix to # private field
**Description:** Use real private field syntax instead of convention
```javascript
class BankAccount {
  constructor(balance) {
    this._balance = balance;
  }
  getBalance() { return this._balance; }
}
```
### Modify 2: Add getter with validation
**Description:** Add a getter that safely returns a property
```javascript
class User {
  constructor(name) {
    this._name = name;
  }
  getName() { return this._name; }
}
// Add getter for name
```
### Modify 3: Add setter with validation
**Description:** Add a setter that validates age
```javascript
class Person {
  constructor(age) {
    this._age = age;
  }
}
// Add getter/setter that validates 0-150
```
### Modify 4: Use private method for internal logic
**Description:** Convert internal helper to private method
```javascript
class Calculator {
  add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Invalid input');
    }
    return a + b;
  }
  subtract(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Invalid input');
    }
    return a - b;
  }
}
// Extract validation to private method
```
### Modify 5: Return defensive copy in getter
**Description:** Return a copy instead of internal reference
```javascript
class ShoppingCart {
  constructor() { this._items = []; }
  get items() { return this._items; }
  addItem(item) { this._items.push(item); }
}
```
### Modify 6: Add private field for internal state
**Description:** Use # private field for internal counter
```javascript
class Counter {
  constructor() { this.count = 0; }
  increment() { this.count++; }
  getCount() { return this.count; }
}
```
### Modify 7: Implement read-only property via getter
**Description:** Add getter without setter for read-only access
```javascript
class User {
  constructor(name, createdAt) {
    this.name = name;
    this.createdAt = createdAt;
  }
}
// Make createdAt read-only
```
### Modify 8: Fix infinite loop in getter/setter
**Description:** Fix getter/setter that recurses infinitely
```javascript
class Temperature {
  get celsius() { return this.celsius; }
  set celsius(value) { this.celsius = value; }
}
```
### Modify 9: Add private field validation
**Description:** Validate in setter and store in private field
```javascript
class Product {
  constructor(price) {
    this._price = price;
  }
  get price() { return this._price; }
  set price(value) { this._price = value; }
}
// Add validation: price > 0
```
### Modify 10: Encapsulate internal array
**Description:** Prevent external mutation of internal array
```javascript
class TodoList {
  constructor() {
    this.todos = [];
  }
  add(text) { this.todos.push({ text, done: false }); }
  getTodos() { return this.todos; }
}
```
### Modify 11: Add private static field
**Description:** Use private static field for instance counter
```javascript
class User {
  constructor(name) { this.name = name; }
  static getCount() { return 0; }
}
// Add private static #count
```
### Modify 12: Implement lazy getter with caching
**Description:** Cache computed value in getter
```javascript
class Report {
  constructor(data) { this._data = data; }
  get summary() {
    return this._data.map(/* expensive */).filter(/* expensive */);
  }
}
```
### Modify 13: Add computed getter
**Description:** Add a getter that computes full name
```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
// Add fullName getter
```
### Modify 14: Encapsulate with private field and public getter
**Description:** Make password read-only after construction
```javascript
class User {
  constructor(password) {
    this.password = password; // Should not be changeable
  }
}
// Make password private with only getter
```
### Modify 15: Add setter that triggers update
**Description:** Setter that updates dependent computed property
```javascript
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
    this._area = width * height;
  }
  get area() { return this._area; }
}
// Add setters that update area
```
### Modify 16: Use private field for configuration
**Description:** Encapsulate configuration values
```javascript
class HttpClient {
  constructor(baseURL, timeout) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }
  fetch(path) { return fetch(this.baseURL + path); }
}
// Make config private
```
### Modify 17: Add type-checking setter
**Description:** Ensure setter only accepts correct type
```javascript
class Score {
  constructor(points) { this._points = points; }
  set points(value) { this._points = value; }
  get points() { return this._points; }
}
// Add type checking
```
### Modify 18: Implement read-only collection view
**Description:** Return read-only view of internal collection
```javascript
class Team {
  #members = [];
  addMember(person) { this.#members.push(person); }
  getMembers() { return this.#members; }
}
// Return a copy or frozen array
```
### Modify 19: Add private method for validation
**Description:** Extract validation to private method
```javascript
class FormValidator {
  validate(data) {
    const errors = [];
    if (!data.name) errors.push('Name required');
    if (!data.email) errors.push('Email required');
    if (!data.email.includes('@')) errors.push('Invalid email');
    return errors;
  }
}
```
### Modify 20: Use private field for dependency
**Description:** Encapsulate injected dependency
```javascript
class UserService {
  constructor(apiClient) { this.apiClient = apiClient; }
  getUsers() { return this.apiClient.fetch('/users'); }
}
```
### Modify 21: Add setter with range validation
**Description:** Validate numeric range in setter
```javascript
class Thermostat {
  constructor() { this._temperature = 20; }
  set temperature(value) { this._temperature = value; }
  get temperature() { return this._temperature; }
}
// Validate range 10-30
```
### Modify 22: Implement immutable getter
**Description:** Return frozen object from getter
```javascript
class AppConfig {
  #settings = { theme: 'light', lang: 'en' };
  get settings() { return this.#settings; }
}
// Return frozen copy
```
### Modify 23: Add private symbol for hidden property
**Description:** Use Symbol as alternative to # for privacy
```javascript
class MyClass {
  constructor() {
    this._hidden = 'value';
  }
}
// Use Symbol instead
```
### Modify 24: Refactor to use private field instead of closure
**Description:** Replace closure-based privacy with # field
```javascript
function createCounter() {
  let count = 0;
  return {
    increment() { count++; },
    getCount() { return count; }
  };
}
// Convert to class with #count
```
### Modify 25: Add getter for formatted value
**Description:** Return formatted string from getter
```javascript
class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }
}
// Add formatted getter: "$50.00"
```
### Modify 26: Make constructor parameters private
**Description:** Use private fields with public getters
```javascript
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
```
### Modify 27: Add setter that converts types
**Description:** Accept string but store number
```javascript
class Age {
  constructor(value) { this._value = value; }
  get value() { return this._value; }
  set value(v) { this._value = v; }
}
// Accept both string and number
```
### Modify 28: Encapsulate state with getter/setter
**Description:** Protect internal data with accessor properties
```javascript
class GameCharacter {
  constructor(name, health, mana) {
    this.name = name;
    this.health = health;
    this.mana = mana;
  }
}
// Add validation: health 0-100, mana 0-50
```
### Modify 29: Add private method for logging
**Description:** Extract logging to private method
```javascript
class UserService {
  createUser(data) {
    console.log(`Creating user: ${data.name}`);
    // ... create user
    console.log('User created');
  }
  deleteUser(id) {
    console.log(`Deleting user: ${id}`);
    // ... delete user
    console.log('User deleted');
  }
}
```
### Modify 30: Implement observable getter/setter
**Description:** Notify listeners on property change
```javascript
class ObservableProperty {
  constructor(value) {
    this._value = value;
    this._listeners = [];
  }
  get value() { return this._value; }
  // Setter that notifies listeners
}
```
### Modify 31: Use private field for timestamp
**Description:** Make creation timestamp immutable
```javascript
class Record {
  constructor(data) {
    this.data = data;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
// createdAt should be immutable
```
### Modify 32: Add validation to existing setter
**Description:** Guard against invalid values
```javascript
class Email {
  constructor(address) { this._address = address; }
  get address() { return this._address; }
  set address(value) { this._address = value; }
}
// Validate email format
```
### Modify 33: Implement private field for singleton instance
**Description:** Store singleton instance in private field
```javascript
class Logger {
  static instance;
  log(msg) { console.log(msg); }
  static getInstance() {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }
}
// Use #instance private field
```
### Modify 34: Add getter for derived property
**Description:** Compute value from existing fields
```javascript
class Order {
  constructor(items, taxRate) {
    this.items = items;
    this.taxRate = taxRate;
  }
}
// Add subtotal, tax, total getters
```
### Modify 35: Use private field for cache
**Description:** Encapsulate cache inside class
```javascript
class DataService {
  fetchData(id) {
    // No caching
    return fetch(`/api/data/${id}`).then(r => r.json());
  }
}
// Add private #cache
```
### Modify 36: Add setter that enforces constraints
**Description:** Prevent setting invalid combinations
```javascript
class Coupon {
  constructor(code, discount, type) {
    this.code = code;
    this.discount = discount;
    this.type = type;
  }
}
// Validate: percentage 0-100, fixed > 0
```
### Modify 37: Encapsulate sensitive data
**Description:** Hide sensitive fields from serialization
```javascript
class User {
  constructor(name, ssn, password) {
    this.name = name;
    this.ssn = ssn;
    this.password = password;
  }
}
// Make ssn and password private
```
### Modify 38: Implement private method for format conversion
**Description:** Extract formatting to private method
```javascript
class DateFormatter {
  format(date, locale) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  formatDateTime(date, locale) {
    const datePart = this.format(date, locale);
    const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return `${datePart} ${time}`;
  }
}
```
### Modify 39: Add getter for safe array access
**Description:** Return defensive copy of internal array
```javascript
class Playlist {
  #songs = [];
  addSong(song) { this.#songs.push(song); }
  getSongs() { return this.#songs; }
}
```
### Modify 40: Use private static method for validation
**Description:** Extract validation to private static method
```javascript
class Validator {
  static validateEmail(email) { return email.includes('@'); }
  static validatePhone(phone) { return phone.length >= 10; }
  static validateUser(user) {
    return this.validateEmail(user.email) && this.validatePhone(user.phone);
  }
}
```
### Modify 41: Implement write-only setter
**Description:** Setter that accepts but doesn't expose value
```javascript
class Authenticator {
  set password(value) {
    // Hash and store, but never expose
  }
  authenticate(input) {
    // Compare hash
  }
}
```
### Modify 42: Add private field for states
**Description:** Track internal state privately
```javascript
class TrafficLight {
  constructor() { this.currentColor = 'red'; }
  change() {
    if (this.currentColor === 'red') this.currentColor = 'green';
    else if (this.currentColor === 'green') this.currentColor = 'yellow';
    else this.currentColor = 'red';
  }
}
// Use #state private field
```
### Modify 43: Implement lazy initialization in getter
**Description:** Initialize only when first accessed
```javascript
class HeavyResource {
  constructor() {
    this.data = this.loadData(); // Always loads
  }
  loadData() { /* expensive */ }
}
// Lazy load in getter
```
### Modify 44: Add validation to prevent empty values
**Description:** Setter rejects empty strings
```javascript
class User {
  constructor() { this._name = ''; }
  set name(value) { this._name = value; }
  get name() { return this._name; }
}
// Reject empty or whitespace-only names
```
### Modify 45: Encapsulate flags with getter
**Description:** Use getter for boolean state checks
```javascript
class Document {
  constructor() { this.isSaved = false; this.isDirty = false; }
  edit() { this.isDirty = true; }
  save() { this.isDirty = false; this.isSaved = true; }
}
// Add getters that compute state
```
### Modify 46: Implement private field for subscriptions
**Description:** Encapsulate observer list
```javascript
class EventBus {
  constructor() { this.subscribers = {}; }
  on(event, handler) {
    if (!this.subscribers[event]) this.subscribers[event] = [];
    this.subscribers[event].push(handler);
  }
  emit(event, data) {
    (this.subscribers[event] || []).forEach(h => h(data));
  }
}
```
### Modify 47: Add getter for enumeration
**Description:** Return read-only view of internal Map
```javascript
class Registry {
  #items = new Map();
  register(key, value) { this.#items.set(key, value); }
  get(key) { return this.#items.get(key); }
}
// Add keys/values/entries getters
```
### Modify 48: Add setter with side effect logging
**Description:** Log changes when property is set
```javascript
class AuditedProperty {
  constructor(value) { this._value = value; this._changes = []; }
  get value() { return this._value; }
  set value(v) { this._value = v; }
}
// Log changes in setter
```
### Modify 49: Use private field for deduplication
**Description:** Track unique items internally
```javascript
class UniqueList {
  constructor() { this.items = []; }
  add(item) {
    if (!this.items.includes(item)) this.items.push(item);
  }
}
// Use #set for O(1) lookup
```
### Modify 50: Implement protected property pattern
**Description:** Simulate protected access for subclasses
```javascript
class Animal {
  constructor(name) { this._name = name; }
}
class Dog extends Animal {
  bark() { return `${this._name} says woof!`; }
}
// Use Symbol or convention for protected-like access
```
