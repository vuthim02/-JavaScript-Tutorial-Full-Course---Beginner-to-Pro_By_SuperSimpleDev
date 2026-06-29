# Level 131 - Modular app architecture (import/export + OOP)

## Error Snippets

### Error 1: Missing export keyword
**Description:** Export a helper function from utils.js so it can be imported.
```javascript
// utils.js
function formatDate(date) {
  return date.toISOString();
}
// app.js
import { formatDate } from "./utils.js";
console.log(formatDate(new Date()));
```

### Error 2: Default import without default export
**Description:** Fix the import to match the named export in math.js.
```javascript
// math.js
export const add = (a, b) => a + b;
// app.js
import add from "./math.js";
console.log(add(2, 3));
```

### Error 3: Named import mismatch
**Description:** Import the correct exported name from config.js.
```javascript
// config.js
export const API_URL = "https://api.example.com";
// app.js
import { apiUrl } from "./config.js";
console.log(apiUrl);
```

### Error 4: Missing type="module" in script tag
**Description:** Load app.js as an ES module in HTML.
```javascript
// index.html
<script src="app.js"></script>
// app.js
import { greet } from "./greet.js";
console.log(greet("World"));
```

### Error 5: Circular import dependency
**Description:** Fix the circular dependency between a.js and b.js.
```javascript
// a.js
import { bFunc } from "./b.js";
export const aFunc = () => bFunc();
// b.js
import { aFunc } from "./a.js";
export const bFunc = () => aFunc();
```

### Error 6: Class not exported
**Description:** Export the User class so main.js can use it.
```javascript
// models/User.js
class User {
  constructor(name) {
    this.name = name;
  }
}
// main.js
import { User } from "./models/User.js";
const u = new User("Alice");
```

### Error 7: Importing from wrong path
**Description:** Correct the import path to point to helpers.js in the same directory.
```javascript
// src/app.js
import { capitalize } from "./helpers/helpers.js";
// src/helpers/helpers.js
export const capitalize = s => s.toUpperCase();
```

### Error 8: Mixed default and named import syntax error
**Description:** Fix the import that mixes default and named incorrectly.
```javascript
// lib.js
export default class Logger {}
export const logLevel = "info";
// app.js
import Logger, { logLevel } from "./lib.js";
```

### Error 9: Dynamic import without await
**Description:** Use await with the dynamic import() call.
```javascript
// app.js
function loadModule() {
  import("./module.js").then(m => m.run());
}
```

### Error 10: Re-export with wrong name
**Description:** Re-export the add function with the correct name from operations.js.
```javascript
// math.js
export const add = (a, b) => a + b;
// operations.js
export { add as sum } from "./math.js";
// app.js
import { add } from "./operations.js";
```

### Error 11: Static import inside function
**Description:** Move the import statement to the top of the file.
```javascript
// app.js
function greet() {
  import { format } from "./format.js";
  return format("Hello");
}
```

### Error 12: Multiple default exports
**Description:** Only one default export is allowed per module.
```javascript
// utils.js
export default function parse(str) { return JSON.parse(str); }
export default function stringify(obj) { return JSON.stringify(obj); }
```

### Error 13: Importing non-exported variable
**Description:** The variable secret is not exported from config.js.
```javascript
// config.js
const secret = "abc123";
export const apiKey = "key123";
// app.js
import { secret, apiKey } from "./config.js";
```

### Error 14: This binding in class method lost with module
**Description:** Fix the this context in the event handler.
```javascript
// app.js
import { Button } from "./Button.js";
const btn = new Button();
btn.onClick(); // undefined error
// Button.js
export class Button {
  constructor() { this.label = "Click"; }
  onClick() { console.log(this.label); }
}
```

### Error 15: Private field without #
**Description:** Use proper private field syntax with #.
```javascript
class Account {
  constructor(balance) {
    this.balance = balance;
  }
  getBalance() { return this.balance; }
}
const acc = new Account(100);
```

### Error 16: Attempting to access private field from outside
**Description:** The #pin field is private and cannot be accessed directly.
```javascript
class ATM {
  #pin = "1234";
  validate(input) { return this.#pin === input; }
}
const atm = new ATM();
console.log(atm.#pin);
```

### Error 17: Missing static keyword
**Description:** Make the create method static on the User class.
```javascript
class User {
  constructor(name) { this.name = name; }
  create(name) { return new User(name); }
}
const u = User.create("Alice");
```

### Error 18: Incorrect super() in subclass module
**Description:** Super must be called before accessing this.
```javascript
// models/Person.js
export class Person {
  constructor(name) { this.name = name; }
}
// models/Student.js
import { Person } from "./Person.js";
export class Student extends Person {
  constructor(name, grade) {
    this.grade = grade;
    super(name);
  }
}
```

### Error 19: Importing a class without new keyword
**Description:** Instantiate the imported class using new.
```javascript
// car.js
export class Car {
  constructor(make) { this.make = make; }
}
// app.js
import { Car } from "./car.js";
const myCar = Car("Toyota");
```

### Error 20: Named export as default import
**Description:** Import named export correctly from theme.js.
```javascript
// theme.js
export const darkTheme = { bg: "#000" };
// app.js
import darkTheme from "./theme.js";
```

### Error 21: Exporting const after declaration
**Description:** Fix the export of the constant.
```javascript
const MAX_SIZE = 100;
export MAX_SIZE;
```

### Error 22: Exporting variable without braces
**Description:** Use correct export syntax for named exports.
```javascript
const pi = 3.14;
export pi;
```

### Error 23: Forgetting .js extension in import
**Description:** Add the .js extension to the import path.
```javascript
import { helper } from "./utils";
```

### Error 24: Import from node_modules without path
**Description:** Import lodash correctly from node_modules.
```javascript
import lodash from "lodash";
```

### Error 25: Private static field syntax
**Description:** Use correct private static field syntax.
```javascript
class Config {
  static #secret = "key";
  static getSecret() { return this.#secret; }
}
console.log(Config.#secret);
```

### Error 26: Extending built-in class without super
**Description:** Extend Array and forget to call super in constructor.
```javascript
class MyArray extends Array {
  constructor(...args) {
    // missing super
  }
}
const arr = new MyArray(1, 2, 3);
```

### Error 27: Async module top-level import
**Description:** Dynamic import returns a promise that must be awaited.
```javascript
async function load() {
  const mod = import("./module.js");
  mod.run();
}
```

### Error 28: Export list with comma missing
**Description:** Fix the export list syntax.
```javascript
function a() {}
function b() {}
export { a b };
```

### Error 29: Import star without as alias
**Description:** Use import * with an alias.
```javascript
import * from "./utils.js";
```

### Error 30: Module-level this reference
**Description:** In ES modules, top-level this is undefined.
```javascript
// app.js
console.log(this);
```

### Error 31: Static method called on instance
**Description:** Call static method on the class, not instance.
```javascript
class MathUtils {
  static add(a, b) { return a + b; }
}
const m = new MathUtils();
console.log(m.add(2, 3));
```

### Error 32: Getter without return
**Description:** Add a return statement to the getter.
```javascript
class Circle {
  constructor(r) { this.r = r; }
  get area() {
    Math.PI * this.r * this.r;
  }
}
const c = new Circle(5);
console.log(c.area);
```

### Error 33: Setter without parameter
**Description:** A setter must have exactly one parameter.
```javascript
class Person {
  set fullName() {
    console.log("setting name");
  }
}
const p = new Person();
p.fullName = "Alice";
```

### Error 34: Constructor returning object
**Description:** Return a different object from constructor.
```javascript
class Singleton {
  constructor() {
    this.data = "real";
    return { data: "fake" };
  }
}
const s = new Singleton();
console.log(s.data);
```

### Error 35: Extending from class expression before definition
**Description:** Use class expression defined before the extends.
```javascript
const Child = class extends Parent {};
const Parent = class {};
const c = new Child();
```

### Error 36: Forgetting new.target check
**Description:** Add a guard to prevent direct instantiation of abstract class.
```javascript
class Animal {
  constructor() {
    // should check new.target
  }
}
const a = new Animal();
```

### Error 37: Incorrect instanceof with module classes
**Description:** Fix instanceof check across module boundaries.
```javascript
// types.js
export class TypeA {}
// app.js
import { TypeA } from "./types.js";
const obj = new TypeA();
console.log(obj instanceof Object);
```

### Error 38: Missing export for destructured import
**Description:** Fix the import to match the destructured export.
```javascript
// data.js
export const data = { user: "Alice", age: 30 };
// app.js
import { user } from "./data.js";
```

### Error 39: Renamed import without as
**Description:** Use as keyword for renaming imports.
```javascript
import { add as addition } from "./math.js";
console.log(add(2, 3));
```

### Error 40: Side-effect import misunderstanding
**Description:** Import side-effect module which runs without exported bindings.
```javascript
// polyfill.js
Array.prototype.shuffle = function() { return this.sort(() => Math.random() - 0.5); };
// app.js
import { shuffle } from "./polyfill.js";
```

### Error 41: Accessing module globals incorrectly
**Description:** Use import.meta.url instead of __dirname.
```javascript
// app.js
console.log(__dirname);
```

### Error 42: Static initialization block syntax
**Description:** Fix the static initialization block syntax.
```javascript
class DB {
  static connection = null;
  static {
    connection = "connected";
  }
}
```

### Error 43: Private method called from outside
**Description:** Access a private method (#method) from outside the class.
```javascript
class Service {
  #fetchData() { return "data"; }
  getData() { return this.#fetchData(); }
}
const s = new Service();
s.#fetchData();
```

### Error 44: Extending native class wrong super args
**Description:** Extend Map and pass wrong arguments to super.
```javascript
class MyMap extends Map {
  constructor() {
    super("a", 1, "b", 2);
  }
}
const m = new MyMap();
```

### Error 45: Export default an expression incorrectly
**Description:** Export default a class expression correctly.
```javascript
export default class {
  constructor() { this.id = 1; }
}
```

### Error 46: Import with missing file extension
**Description:** Add .js extension to import path.
```javascript
import { Component } from "./Component.js";
// Component.jsx
export class Component {}
```

### Error 47: Bundle import with commonjs
**Description:** Mixing ES module imports with require.
```javascript
import fs from "fs";
const path = require("path");
```

### Error 48: Re-export default from another module
**Description:** Re-export default correctly from another module.
```javascript
// Helper.js
export default class Helper {}
// index.js
export { Helper } from "./Helper.js";
```

### Error 49: Dynamic import without .then
**Description:** Handle the promise returned by dynamic import.
```javascript
const mod = await import("./module.js");
// mod is now loaded
```

### Error 50: Module scope pollution
**Description:** Variables in modules are scoped to the module.
```javascript
// a.js
const x = 10;
// b.js
console.log(x); // ReferenceError
```

### Error 51: Chaining class methods without return this
**Description:** Fix method chaining by returning this.
```javascript
class Query {
  where() {}
  limit() {}
  execute() { return "results"; }
}
const q = new Query().where().limit().execute();
```

### Error 52: Private field declaration after use
**Description:** Declare private fields before using them.
```javascript
class Counter {
  increment() { this.#count++; }
  #count = 0;
}
const c = new Counter();
c.increment();
```

### Error 53: Static getter without static keyword
**Description:** Add static keyword to the getter.
```javascript
class Config {
  get version() { return "1.0"; }
}
console.log(Config.version);
```

### Error 54: Import default destructured
**Description:** Default export cannot be destructured.
```javascript
// obj.js
export default { a: 1, b: 2 };
// app.js
import { a } from "./obj.js";
```

### Error 55: Exporting same name twice
**Description:** Duplicate export names cause syntax error.
```javascript
export const value = 1;
export const value = 2;
```

### Error 56: Async static method with wrong this
**Description:** Use this correctly in async static methods.
```javascript
class API {
  static async fetch() {
    return this.get("/data");
  }
  static get(path) { return "fetched"; }
}
```

### Error 57: Importing .json without assert
**Description:** Use import assert for JSON modules.
```javascript
import data from "./data.json";
```

### Error 58: Private field in extends chain
**Description:** Private fields are not inherited by subclasses.
```javascript
class Parent {
  #value = 10;
  getValue() { return this.#value; }
}
class Child extends Parent {
  getParentValue() { return this.#value; }
}
const c = new Child();
```

### Error 59: Import side effect and value
**Description:** Side-effect import runs module code.
```javascript
// logger.js
console.log("Logger loaded");
export const log = msg => console.log(msg);
// app.js
import "./logger.js";
```

### Error 60: Forgetting const in exported variable
**Description:** Export declaration must have const/let/var.
```javascript
export name = "app";
```

### Error 61: Using undefined import binding
**Description:** Import bindings are read-only.
```javascript
// config.js
export let mode = "dev";
// app.js
import { mode } from "./config.js";
mode = "prod";
```

### Error 62: Missing async on function with await
**Description:** Add async to function using top-level await inside.
```javascript
function load() {
  const data = await fetch("/api");
  return data.json();
}
```

### Error 63: Nested class not exported
**Description:** Export the inner class from the module.
```javascript
class Outer {
  static Inner = class {
    run() { return "running"; }
  };
}
// app.js
import { Outer } from "./outer.js";
const inner = new Outer.Inner();
```

### Error 64: Wrong property key access using super
**Description:** Use super only for method calls, not properties.
```javascript
class Base { constructor() { this.x = 1; } }
class Derived extends Base {
  getX() { return super.x; }
}
```

### Error 65: Mismatched import/export braces
**Description:** Fix the brace syntax in export.
```javascript
const a = 1;
const b = 2;
export { a, b };
// app.js
import { a, b } from "./mod.js";
```

### Error 66: Import all then destructure
**Description:** Import the module namespace then use its members.
```javascript
import * as utils from "./utils.js";
const { format } = utils;
```

### Error 67: Trying to import before declaration
**Description:** Import hoisting does not apply to module scope like function hoisting.
```javascript
// a.js
export const x = 1;
// b.js
console.log(x); // temporal dead zone
import { x } from "./a.js";
```

### Error 68: Export with semicolon after braces
**Description:** No semicolon after export {} blocks.
```javascript
export { add, subtract };
```

### Error 69: Class method as event handler losing this
**Description:** Bind this in class methods used as callbacks.
```javascript
class UI {
  constructor() { this.name = "App"; }
  render() {
    button.addEventListener("click", this.handleClick);
  }
  handleClick() { console.log(this.name); }
}
```

### Error 70: Async generator method syntax
**Description:** Fix the async generator method syntax.
```javascript
class DataStream {
  async *generate() {
    yield 1;
    yield 2;
  }
}
```

## Issue Snippets

### Issue 1: Unused imported module
**Description:** The import is never used in the file.
```javascript
import { format } from "./format.js";
import { parse } from "./parse.js";
function greet(name) {
  return "Hello " + name;
}
```

### Issue 2: Importing entire library for one function
**Description:** Only import what is needed from lodash.
```javascript
import _ from "lodash";
const result = _.capitalize("hello");
```

### Issue 3: Directly mutating imported binding
**Description:** Imported bindings are read-only, but the object itself can be mutated.
```javascript
import { config } from "./config.js";
config.apiUrl = "https://new.url";
```

### Issue 4: Class with too many responsibilities
**Description:** The User class handles both data and display logic.
```javascript
export class User {
  constructor(name) { this.name = name; }
  save() { /* db save */ }
  render() { return `<div>${this.name}</div>`; }
  validate() { return this.name.length > 0; }
  sendEmail() { /* email logic */ }
}
```

### Issue 5: Hardcoded module paths
**Description:** Module paths should not have hardcoded version numbers.
```javascript
import { api } from "./v2/api.js";
```

### Issue 6: Deep inheritance chain
**Description:** Four-level inheritance is hard to maintain.
```javascript
class Animal {}
class Mammal extends Animal {}
class Dog extends Mammal {}
class Poodle extends Dog {}
```

### Issue 7: Breaking LSP by changing method signature
**Description:** Subclass changes the return type of parent method.
```javascript
class Base {
  getData() { return { status: "ok" }; }
}
class Derived extends Base {
  getData() { return "string instead of object"; }
}
```

### Issue 8: Import side-effect only without reason
**Description:** Importing a module only for its side effect with no clear reason.
```javascript
import "./polyfills.js";
```

### Issue 9: Module exporting mutable globals
**Description:** Module exports a mutable array that can be modified by consumers.
```javascript
export const items = [];
// Consumers can push/pop items
```

### Issue 10: Using export default for named class
**Description:** A named class is exported as default, making it harder to rename on import.
```javascript
export default class UserService {
  fetch() { return "data"; }
}
```

### Issue 11: Class with getter but no setter
**Description:** Read-only property with getter but no setter for consistency.
```javascript
class Person {
  constructor(name) { this._name = name; }
  get name() { return this._name; }
}
```

### Issue 12: Exposing internal implementation via exports
**Description:** Internal helper function is exported along with the public API.
```javascript
export function parseInput(input) { return input.trim(); }
export function process(input) { return parseInput(input).toUpperCase(); }
export function internalHelper(input) { return input.split(""); }
```

### Issue 13: Mixing class and function styles
**Description:** Inconsistent use of class vs factory function patterns.
```javascript
export class Config {
  static get(key) { return this.values[key]; }
  static values = {};
}
export function createConfig() { return new Config(); }
```

### Issue 14: Circular reference via static properties
**Description:** Two classes reference each other through static properties.
```javascript
class A { static bRef = B; }
class B { static aRef = A; }
```

### Issue 15: Unused class properties
**Description:** Class declares properties that are never used.
```javascript
class Report {
  constructor(data) {
    this.data = data;
    this.temp = null;
    this.cache = {};
  }
  generate() { return this.data; }
}
```

### Issue 16: Exporting too many symbols
**Description:** A single module exports 15+ symbols, violating single responsibility.
```javascript
export const a = 1, b = 2, c = 3, d = 4, e = 5;
export const f = 6, g = 7, h = 8, i = 9, j = 10;
export const k = 11, l = 12, m = 13, n = 14, o = 15;
```

### Issue 17: Inline require in module file
**Description:** Mixing require with ES module imports.
```javascript
import { readFile } from "fs";
const path = require("path");
```

### Issue 18: Forgetting to export error class
**Description:** Custom error class is not exported from module.
```javascript
class ValidationError extends Error {
  constructor(msg) { super(msg); this.name = "ValidationError"; }
}
export function validate(data) {
  if (!data) throw new ValidationError("No data");
}
```

### Issue 19: Default export object with no tree-shaking
**Description:** Exporting a single object default prevents tree-shaking unused members.
```javascript
export default {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};
```

### Issue 20: Module-level side effects
**Description:** Module runs side-effect code at import time.
```javascript
console.log("Module loaded");
const startTime = Date.now();
export function elapsed() { return Date.now() - startTime; }
```

### Issue 21: Class stored in variable prevents hoisting
**Description:** Class expression assigned to const is not hoisted.
```javascript
const c = new MyClass();
const MyClass = class {};
```

### Issue 22: Static property referencing instance
**Description:** Static method tries to use instance properties via this.
```javascript
class Counter {
  count = 0;
  static increment() { this.count++; }
}
```

### Issue 23: Overriding non-virtual method
**Description:** Subclass overrides a method that was not designed for extension.
```javascript
class Base {
  finalize() { return "done"; }
}
class Derived extends Base {
  finalize() { return "overridden"; }
}
```

### Issue 24: Missing boundary checks in class
**Description:** Class method does not validate input ranges.
```javascript
class Counter {
  constructor() { this.value = 0; }
  add(n) { this.value += n; }
  subtract(n) { this.value -= n; }
}
```

### Issue 25: Exporting mutable object reference
**Description:** Module exports an object that consumers can mutate.
```javascript
export const state = { user: null, token: null };
```

### Issue 26: Unused constructor parameters passed to super
**Description:** Constructor receives extra params that are not used.
```javascript
class Base {
  constructor(a) { this.a = a; }
}
class Derived extends Base {
  constructor(a, b, c) {
    super(a);
    // b and c unused
  }
}
```

### Issue 27: Missing type checking in class constructor
**Description:** Constructor does not validate parameter types.
```javascript
class Temperature {
  constructor(value) { this.value = value; }
  toFahrenheit() { return this.value * 9 / 5 + 32; }
}
```

### Issue 28: Public class field without initialization
**Description:** Public class field is undefined but used before assignment.
```javascript
class App {
  config;
  init() { console.log(this.config.apiUrl); }
}
```

### Issue 29: Barrel export with circular risk
**Description:** Index.js re-exports from many modules that may import each other.
```javascript
export { User } from "./User.js";
export { Product } from "./Product.js";
export { Order } from "./Order.js";
// Order imports User internally
```

### Issue 30: Dynamic import inside loop
**Description:** Dynamic import inside a loop creates multiple network requests.
```javascript
const mods = ["a", "b", "c"];
for (const m of mods) {
  const mod = await import(`./${m}.js`);
}
```

## Modify Snippets

### Modify 1: Create a module that exports a Greeter class
**Description:** Export a Greeter class with a greet method that returns "Hello, {name}!".
```javascript
// greeter.js
// Create and export Greeter class here
```

### Modify 2: Import and use the User class
**Description:** Import User from ./models/User.js and create a new instance.
```javascript
// app.js
// Import User and create instance with name "Alice"
```

### Modify 3: Add default export to utility function
**Description:** Create a default export of a function that capitalizes strings.
```javascript
// capitalize.js
// Export default function that returns str.toUpperCase()
```

### Modify 4: Create a named export for a constant
**Description:** Export a constant named PI with value 3.14159.
```javascript
// constants.js
// Export named constant PI
```

### Modify 5: Import multiple named exports
**Description:** Import add and subtract from ./math.js using named import syntax.
```javascript
// calculator.js
// Import add and subtract from ./math.js
```

### Modify 6: Create a subclass that imports parent
**Description:** Create Admin class extending User, import User from ./User.js.
```javascript
// models/Admin.js
// Import User, create Admin subclass with role property
```

### Modify 7: Re-export a function from another module
**Description:** In index.js, re-export formatDate from ./dateUtils.js.
```javascript
// index.js
// Re-export formatDate from ./dateUtils.js
```

### Modify 8: Use import * to import all exports
**Description:** Import all exports from ./helpers.js as helpers.
```javascript
// app.js
// Import all as helpers from ./helpers.js
```

### Modify 9: Add static factory method to class
**Description:** Add a static create method to the User class that creates instance.
```javascript
// models/User.js
export class User {
  constructor(name) { this.name = name; }
  // Add static create method
}
```

### Modify 10: Create a private field in class
**Description:** Add a private #id field to the Entity class.
```javascript
// models/Entity.js
export class Entity {
  constructor(id) { /* set #id */ }
  getId() { return this.#id; }
}
```

### Modify 11: Export and import a class with getter
**Description:** Create a Temperature class with getter for celsius.
```javascript
// temperature.js
// Export Temperature class with getter
```

### Modify 12: Import default and named together
**Description:** Import default export Logger and named export logLevel from ./logger.js.
```javascript
// app.js
// Import Logger (default) and logLevel (named)
```

### Modify 13: Create a module with side-effect only
**Description:** Create a polyfill module that adds shuffle to Array.
```javascript
// polyfills.js
// Add shuffle method to Array.prototype
```

### Modify 14: Dynamic import for lazy loading
**Description:** Use dynamic import to load ./heavyModule.js inside an async function.
```javascript
// app.js
async function loadHeavy() {
  // Dynamic import heavyModule
}
```

### Modify 15: Export a class with private method
**Description:** Create a Calculator class with private #add method.
```javascript
// calculator.js
// Export Calculator class with private #add method
```

### Modify 16: Named export with alias
**Description:** Export add as sum using export alias syntax.
```javascript
// math.js
const add = (a, b) => a + b;
// Export add as sum
```

### Modify 17: Import with alias
**Description:** Import the default export from ./React.js as React.
```javascript
// app.js
// Import default from React.js as React
```

### Modify 18: Create an abstract base class pattern
**Description:** Create a Shape base class that throws if instantiated directly.
```javascript
// models/Shape.js
// Export Shape class with new.target check
```

### Modify 19: Export async function
**Description:** Create and export an async function fetchData that returns "data".
```javascript
// api.js
// Export async function fetchData
```

### Modify 20: Create class with instance property
**Description:** Create a Book class with title and author properties set in constructor.
```javascript
// models/Book.js
// Export Book class with constructor
```

### Modify 21: Create a module with getter/setter
**Description:** Create a Person class with get/set for fullName.
```javascript
// models/Person.js
// Export Person class with fullName getter/setter
```

### Modify 22: Import then extend built-in class
**Description:** Import EventEmitter from events and extend it.
```javascript
// app.js
// Import EventEmitter, extend it into AppEmitter class
```

### Modify 23: Create export with destructuring
**Description:** Export a pre-defined object with destructured values.
```javascript
// config.js
const appConfig = { port: 3000, host: "localhost" };
// Export port and host as named exports
```

### Modify 24: Chain class methods with return this
**Description:** Make the Query class methods chainable by returning this.
```javascript
// query.js
export class Query {
  where(field, val) { /* return this */ }
  orderBy(field) { /* return this */ }
  execute() { return "done"; }
}
```

### Modify 25: Create a singleton with module pattern
**Description:** Export a single instance using module-level instance.
```javascript
// db.js
// Export getInstance function that returns singleton
```

### Modify 26: Add static initialization block
**Description:** Add a static init block that sets default values.
```javascript
// config.js
export class Config {
  static defaults = {};
  // Add static initialization block
}
```

### Modify 27: Import for type only (JSDoc)
**Description:** Use import to reference a type in JSDoc comment.
```javascript
// app.js
// Import User class for JSDoc type reference
```

### Modify 28: Create barrel exports
**Description:** Create an index.js that re-exports all from User, Product, Order.
```javascript
// models/index.js
// Re-export all from User.js, Product.js, Order.js
```

### Modify 29: Export generator function
**Description:** Create and export a generator function that yields numbers.
```javascript
// generators.js
// Export generator function countUp
```

### Modify 30: Async generator export
**Description:** Create and export an async generator that yields delayed numbers.
```javascript
// stream.js
// Export async generator function
```

### Modify 31: Use import.meta.url
**Description:** Log import.meta.url to see current module URL.
```javascript
// app.js
// Log import.meta.url
```

### Modify 32: Create class with toString override
**Description:** Override toString in User class to return name.
```javascript
// models/User.js
export class User {
  constructor(name) { this.name = name; }
  // Override toString
}
```

### Modify 33: Export a Map as constant
**Description:** Export a Map containing country code mappings.
```javascript
// country.js
// Export constant countryCodes as a Map
```

### Modify 34: Import and use Symbol as key
**Description:** Create and export a symbol, import and use it as property key.
```javascript
// symbols.js
// Export a Symbol named idSymbol
```

### Modify 35: Create mixin pattern with modules
**Description:** Export a mixin function that adds methods to a class.
```javascript
// mixins/sayHi.js
// Export mixin that adds sayHi method
```

### Modify 36: Class field declaration shorthand
**Description:** Use public class field syntax for default values.
```javascript
// counter.js
export class Counter {
  // Use class field: count = 0
  increment() { this.count++; }
}
```

### Modify 37: Create a static factory with validation
**Description:** Add a static fromJSON method to User that validates input.
```javascript
// models/User.js
export class User {
  constructor(name, age) { this.name = name; this.age = age; }
  // Add static fromJSON method
}
```

### Modify 38: Import and use a class from subdirectory
**Description:** Import Service from ./services/AuthService.js.
```javascript
// app.js
// Import AuthService from services subdirectory
```

### Modify 39: Create module with conditional export
**Description:** Export different functions based on environment variable.
```javascript
// platform.js
// Export platform-specific implementation
```

### Modify 40: Export default anonymous class
**Description:** Export default an anonymous class with a run method.
```javascript
// runner.js
// Export default anonymous class with run method
```

### Modify 41: Create a class with Symbol.iterator
**Description:** Make a Range class iterable using Symbol.iterator.
```javascript
// range.js
export class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  // Implement Symbol.iterator
}
```

### Modify 42: Import Node.js built-in module
**Description:** Import and use the fs module to read a file.
```javascript
// fileReader.js
// Import fs, export readFile function
```

### Modify 43: Create class with default parameter values
**Description:** Create a Config class with default values in constructor.
```javascript
// config.js
export class Config {
  // Constructor with default values
}
```

### Modify 44: Export error classes
**Description:** Create and export NotFoundError and ValidationError.
```javascript
// errors.js
// Export custom error classes
```

### Modify 45: Import class decorator pattern
**Description:** Import and apply a logging wrapper to a class method.
```javascript
// app.js
// Import withLogging wrapper
```

### Modify 46: Create module-level async init
**Description:** Use top-level await to initialize a module.
```javascript
// db.js
// Use top-level await to initialize connection
```

### Modify 47: Export a class with method overloading via rest params
**Description:** Create a Printer class with a print method that accepts variable args.
```javascript
// printer.js
export class Printer {
  // print method using rest parameters
}
```

### Modify 48: Set up import map reference
**Description:** Create an import map entry for lodash in HTML.
```javascript
// index.html
// Add importmap for lodash
```

### Modify 49: Create a factory function alongside class
**Description:** Export a factory function and a class from the same module.
```javascript
// widgets.js
// Export Button class and createButton factory
```

### Modify 50: Two modules with cross-export
**Description:** Create types.js and validators.js where validators imports types.
```javascript
// types.js - export UserType
// validators.js - import UserType and export validateUser
```
