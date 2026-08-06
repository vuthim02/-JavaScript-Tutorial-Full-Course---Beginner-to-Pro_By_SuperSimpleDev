# Complete ES6+ Modern JavaScript Reference

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

A comprehensive guide to all ES6 (ECMAScript 2015) and later features.

---

## Table of Contents

1. [Arrow Functions](#1-arrow-functions)
2. [Template Literals](#2-template-literals)
3. [Destructuring](#3-destructuring)
4. [Spread Operator (...)](#4-spread-operator)
5. [Rest Parameters](#5-rest-parameters)
6. [Default Parameters](#6-default-parameters)
7. [let and const](#7-let-and-const)
8. [Classes](#8-classes)
9. [Modules (import/export)](#9-modules)
10. [Map, Set, WeakMap, WeakSet](#10-map-set-weakmap-weakset)
11. [Symbol](#11-symbol)
12. [Iterators and Generators](#12-iterators-and-generators)
13. [Promises](#13-promises)
14. [Proxy and Reflect](#14-proxy-and-reflect)
15. [for...of Loop](#15-forof-loop)
16. [Computed Property Names](#16-computed-property-names)
17. [Object Static Methods](#17-object-static-methods)
18. [String Methods](#18-string-methods)
19. [Array Methods](#19-array-methods)
20. [Number Methods](#20-number-methods)
21. [Math Methods](#21-math-methods)
22. [Optional Chaining (?.)](#22-optional-chaining)
23. [Nullish Coalescing (??)](#23-nullish-coalescing)
24. [Logical Assignment Operators](#24-logical-assignment-operators)
25. [at() Method](#25-at-method)
26. [Object.hasOwn()](#26-objecthasown)
27. [Structured Clone Algorithm](#27-structured-clone-algorithm)
28. [Temporal API](#28-temporal-api)
29. [Top-Level Await](#29-top-level-await)
30. [import.meta](#30-importmeta)

---

## 1. Arrow Functions

Arrow functions provide a shorter syntax for writing functions and do **not** bind their own `this`. They inherit `this` from the enclosing lexical scope.

### Syntax Variations

```js
// Full form
const add = (a, b) => {
  return a + b;
};

// Implicit return (single expression)
const add = (a, b) => a + b;

// Single parameter (parentheses optional)
const double = n => n * 2;

// No parameters (empty parentheses required)
const greet = () => "Hello!";

// Returning an object literal (wrap in parentheses)
const makeUser = (name, age) => ({ name, age });
```

### Lexical `this`

Arrow functions do **not** have their own `this`. They inherit from the enclosing scope:

```js
const listMembers = {
  name: "Alice",
  members: ["Bob", "Charlie"],
  listMembers() {
    // Regular function: 'this' would be lost in callback
    this.members.forEach((member) => {
      // Arrow function inherits 'this' from listMembers
      console.log(`${member} is a member of ${this.name}`);
    });
  },
};
```

### When NOT to Use Arrow Functions

- **Object methods**: Arrow functions inherit `this` from the outer scope, not the object
- **Constructor functions**: Arrow functions cannot be used with `new`
- **Prototype methods**: They don't have their own `this`
- **Event handlers**: Where `this` should reference the element

```js
// WRONG - arrow function as method
const obj = {
  name: "Alice",
  greet: () => {
    console.log(this.name); // undefined (in modules) or global
  },
};

// RIGHT - regular function or method shorthand
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name); // "Alice"
  },
};
```

---

## 2. Template Literals

Template literals use backticks (`` ` ``) instead of quotes. They support string interpolation, multiline strings, and tagged templates.

### String Interpolation

```js
const name = "Alice";
const count = 5;
const message = `Hello, ${name}! You have ${count} notifications.`;
```

### Multi-line Strings

```js
const html = `
  <div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
  </div>
`;
```

### Expressions Inside Interpolation

```js
const status = `Status: ${isActive ? "Active" : "Inactive"}`;
const price = `Total: $${(quantity * unitPrice).toFixed(2)}`;
```

### Tagged Template Literals

A tag function receives the string parts and interpolated values separately:

```js
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<b>${values[i]}</b>` : "");
  }, "");
}

const name = "Alice";
const result = highlight`Hello ${name}, welcome!`;
// "Hello <b>Alice</b>, welcome!"
```

Libraries like `styled-components`, `lit-html`, and `graphql-tag` use tagged templates for custom processing (escaping HTML, building SQL queries, constructing typed queries).

---

## 3. Destructuring

Destructuring extracts values from arrays and objects into distinct variables.

### Object Destructuring

```js
const user = { name: "Alice", age: 30, city: "NYC" };

// Basic
const { name, age } = user;

// Renaming
const { name: userName, age: userAge } = user;

// Default values
const { name, age, country = "USA" } = user;

// Nested destructuring
const person = {
  address: { street: "123 Main", city: "NYC" },
};
const { address: { street, city } } = person;
```

### Array Destructuring

```js
const arr = [1, 2, 3, 4, 5];

// Basic
const [first, second] = arr; // 1, 2

// Skipping elements
const [first, , third] = arr; // 1, 3

// Rest pattern
const [first, ...rest] = arr; // 1, [2, 3, 4, 5]

// Default values
const [a = 10, b = 20] = [5]; // 5, 20

// Swap variables
let x = 1, y = 2;
[x, y] = [y, x]; // x=2, y=1
```

### Destructuring in Function Parameters

```js
function greet({ name, age, country = "USA" }) {
  return `Hello ${name}, ${age}, from ${country}`;
}

greet({ name: "Alice", age: 30 });
```

---

## 4. Spread Operator (...)

The spread operator expands iterables into individual elements.

### Spread with Arrays

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Copy an array (shallow copy)
const copy = [...arr1];
copy.push(4);
console.log(arr1); // [1, 2, 3] - original unchanged

// Add elements
const extended = [0, ...arr1, 4]; // [0, 1, 2, 3, 4]
```

### Spread with Objects

```js
const defaults = { theme: "light", fontSize: 14, lang: "en" };
const userSettings = { theme: "dark", fontSize: 18 };

// Merge objects (later properties override earlier ones)
const config = { ...defaults, ...userSettings };
// { theme: 'dark', fontSize: 18, lang: 'en' }

// Shallow clone
const copy = { ...defaults };

// Add/override a property immutably
const updated = { ...user, lastLogin: new Date() };
```

### Spread with Function Calls

```js
const numbers = [3, 1, 4, 1, 5, 9];
const max = Math.max(...numbers); // 9
```

### Spread Creates SHALLOW Copies

Spreading an object only copies one level deep. Nested objects are shared references.

```js
const original = { nested: { value: 1 } };
const copy = { ...original };
copy.nested.value = 2;
console.log(original.nested.value); // 2 - affected!
```

For deep cloning, use `structuredClone()`.

---

## 5. Rest Parameters

Rest parameters collect multiple elements into an array. Same `...` syntax as spread, but opposite direction.

### Rest in Function Parameters

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4); // 10
```

### Rest Must Be Last Parameter

```js
function greet(greeting, ...names) {
  return names.map((name) => `${greeting}, ${name}!`);
}

greet("Hello", "Alice", "Bob"); // ["Hello, Alice!", "Hello, Bob!"]
```

### Rest in Destructuring

```js
const [first, second, ...others] = [1, 2, 3, 4, 5];
// first=1, second=2, others=[3, 4, 5]

const { name, ...rest } = { name: "Alice", age: 30, city: "NYC" };
// name="Alice", rest={ age: 30, city: "NYC" }
```

---

## 6. Default Parameters

Default parameters allow named parameters to be initialized with default values if no value or `undefined` is passed.

```js
function greet(name = "World") {
  return `Hello, ${name}!`;
}

greet(); // "Hello, World!"
greet("Alice"); // "Hello, Alice!"

// Default values can be expressions
function append(arr = [], element) {
  return [...arr, element];
}

// Destructuring with defaults
function createUser({ name = "Anonymous", age = 0 } = {}) {
  return { name, age };
}
```

---

## 7. let and const

### `let`

- Declares a **block-scoped** variable
- Can be reassigned
- Not hoisted (in the same way as `var`) — subject to the **Temporal Dead Zone (TDZ)**
- Cannot be redeclared in the same scope

```js
let count = 0;
count = 1; // OK

if (true) {
  let x = 10;
}
// console.log(x); // ReferenceError - x is block-scoped
```

### `const`

- Declares a **block-scoped** variable that cannot be reassigned
- Must be initialized at declaration
- Same TDZ rules as `let`
- For objects/arrays, the binding is constant (the value can still be mutated)

```js
const PI = 3.14159;
// PI = 3; // TypeError

const user = { name: "Alice" };
user.name = "Bob"; // OK - mutating the object
// user = {}; // TypeError - can't reassign
```

### var vs let vs const

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function | Block | Block |
| Hoisting | Yes (initialized as undefined) | TDZ | TDZ |
| Redeclaration | Yes | No | No |
| Reassignment | Yes | Yes | No |

### Best Practice

Use `const` by default. Use `let` only when reassignment is needed. Never use `var`.

---

## 8. Classes

ES6 classes provide syntactic sugar over prototype-based inheritance.

### Basic Class

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

const alice = new Person("Alice", 30);
alice.greet(); // "Hello, I'm Alice"
```

### Static Methods and Properties

```js
class MathUtils {
  static PI = 3.14159;

  static add(a, b) {
    return a + b;
  }
}

MathUtils.PI; // 3.14159
MathUtils.add(1, 2); // 3
```

### Inheritance

```js
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  study() {
    return `${this.name} is studying`;
  }
}

const bob = new Student("Bob", 20, "A");
bob.greet(); // "Hello, I'm Bob" (inherited)
bob.study(); // "Bob is studying"
```

### Getters and Setters

```js
class Circle {
  #radius; // Private field

  constructor(radius) {
    this.#radius = radius;
  }

  get area() {
    return Math.PI * this.#radius ** 2;
  }

  set radius(value) {
    if (value < 0) throw new Error("Radius cannot be negative");
    this.#radius = value;
  }
}
```

### Private Fields and Methods (ES2022)

```js
class BankAccount {
  #balance = 0;

  #validate(amount) {
    return amount > 0;
  }

  deposit(amount) {
    if (this.#validate(amount)) {
      this.#balance += amount;
    }
  }

  get balance() {
    return this.#balance;
  }
}
```

### Static Initialization Blocks (ES2022)

```js
class MyClass {
  static config;

  static {
    // Complex initialization logic
    MyClass.config = JSON.parse('{"key": "value"}');
  }
}
```

---

## 9. Modules (import/export)

ES6 modules provide a native dependency system. Each file is a module with its own scope.

### Named Exports

```js
// utils.js
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export class Calculator {
  add(a, b) { return a + b; }
}

// Or export at the end
const PI = 3.14159;
function add(a, b) { return a + b; }
export { PI, add };
```

### Default Export

```js
// Person.js - one default export per module
export default class Person {
  constructor(name) {
    this.name = name;
  }
}

// Another file
import Person from "./Person.js";
```

### Named Imports

```js
import { PI, add } from "./utils.js";

// With aliases
import { add as sum, multiply as product } from "./utils.js";
```

### Namespace Import

```js
import * as MathUtils from "./utils.js";
MathUtils.PI;
MathUtils.add(1, 2);
```

### Default + Named Imports

```js
import fetchData, { API_URL, TIMEOUT } from "./api.js";
```

### Re-exporting (Barrel Modules)

```js
// components/index.js
export { Button } from "./Button.js";
export { Input } from "./Input.js";
export { Card } from "./Card.js";

// Re-export all from a module
export * from "./utils.js";

// Re-export specific items with rename
export { default as User } from "./User.js";
```

### Dynamic import()

```js
// Load module on demand
async function loadModule() {
  const module = await import("./heavy-module.js");
  module.doSomething();
}

// Conditional import
if (condition) {
  const module = await import("./module-a.js");
  module.initialize();
} else {
  const module = await import("./module-b.js");
  module.initialize();
}
```

### Import Attributes

```js
import data from "./data.json" with { type: "json" };
import wasm from "./module.wasm" with { type: "javascript" };
```

### Key Rules

- Modules are automatically in strict mode
- Import declarations are hoisted
- Imported bindings are live (updated by the exporting module)
- You cannot reassign imported bindings
- Only string literal specifiers are allowed in static imports
- Must be `type="module"` in HTML script tags

---

## 10. Map, Set, WeakMap, WeakSet

### Map

A collection of key-value pairs where keys can be any type (objects, functions, primitives). Maintains insertion order.

```js
// Creating Maps
const map = new Map();
const map2 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);

// Basic operations
map.set("name", "Alice");
map.set(42, "number key");
map.set(true, "boolean key");

map.get("name"); // "Alice"
map.has("name"); // true
map.size; // 3
map.delete("name");

// Iteration
for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}

map.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// Get all keys/values/entries
const keys = [...map.keys()];
const values = [...map.values()];
const entries = [...map.entries()];

// Chaining
map.set("a", 1).set("b", 2).set("c", 3);
```

### Set

A collection of unique values. Maintains insertion order.

```js
const set = new Set([1, 2, 3, 2, 1]);
console.log(set); // Set {1, 2, 3}

// Operations
set.add(4);
set.has(2); // true
set.delete(1);
set.size; // 3

// Iteration
for (const value of set) {
  console.log(value);
}

// Remove duplicates from array
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)]; // [1, 2, 3]

// Set methods (ES2025)
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);

setA.union(setB); // Set {1, 2, 3, 4}
setA.intersection(setB); // Set {2, 3}
setA.difference(setB); // Set {1}
setA.symmetricDifference(setB); // Set {1, 4}
setA.isSubsetOf(setB); // false
setA.isSupersetOf(setB); // false
setA.isDisjointFrom(setB); // false
```

### WeakMap

A collection of key/value pairs where **keys must be objects or non-registered symbols**. Keys are held weakly (garbage collected if no other reference exists). Not iterable.

```js
const weakMap = new WeakMap();

const obj = {};
weakMap.set(obj, "some value");
weakMap.get(obj); // "some value"
weakMap.has(obj); // true
weakMap.delete(obj);

// Use cases:
// 1. Private data storage
const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, { password: "secret" });
  }

  getPassword() {
    return privateData.get(this).password;
  }
}

// 2. Caching/memoization
const cache = new WeakMap();

function process(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = expensiveOperation(obj);
  cache.set(obj, result);
  return result;
}

// 3. DOM element tracking
const visited = new WeakMap();
function track(element) {
  visited.set(element, true);
}
```

### WeakSet

A collection of objects/symbols held weakly. Not iterable. Values must be objects or non-registered symbols.

```js
const weakSet = new WeakSet();

const obj = {};
weakSet.add(obj);
weakSet.has(obj); // true
weakSet.delete(obj);

// Use case: marking objects
const processed = new WeakSet();

function process(obj) {
  if (processed.has(obj)) return;
  // process the object
  processed.add(obj);
}
```

### Comparison

| Feature | Map | WeakMap | Set | WeakSet |
|---|---|---|---|---|
| Keys/Values | Any type | Objects/symbols only | Values only | Objects/symbols only |
| Iterable | Yes | No | Yes | No |
| Size property | Yes | No | Yes | No |
| GC of keys | No | Yes | N/A | Yes |
| Use case | General purpose | Private data, caching | Unique values | Marking objects |

---

## 11. Symbol

A `Symbol` is a **primitive value** that is guaranteed to be unique. Symbols are used to add unique property keys to objects that won't collide with any other code.

### Creating Symbols

```js
const sym1 = Symbol();
const sym2 = Symbol("description"); // description is for debugging only

Symbol("foo") === Symbol("foo"); // false - each symbol is unique
typeof Symbol(); // "symbol"
```

### Symbols as Property Keys

```js
const MY_KEY = Symbol();
const obj = {
  [MY_KEY]: "value",
  regular: "other",
};

obj[MY_KEY]; // "value"
obj.regular; // "other"
```

### Global Symbol Registry

```js
// Create a global symbol
const globalSym = Symbol.for("mySymbol");
const sameSym = Symbol.for("mySymbol");
globalSym === sameSym; // true

Symbol.keyFor(globalSym); // "mySymbol"
```

### Well-Known Symbols

Well-known symbols serve as "protocols" for built-in JavaScript operations:

```js
// Symbol.iterator - default iterator for an object
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
}

for (const num of new Range(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Symbol.hasInstance - custom instanceof behavior
class Even {
  static [Symbol.hasInstance](num) {
    return num % 2 === 0;
  }
}

2 instanceof Even; // true
3 instanceof Even; // false

// Symbol.toPrimitive - custom type conversion
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.celsius;
    if (hint === "string") return `${this.celsius}°C`;
    return this.celsius;
  }
}

const temp = new Temperature(25);
+temp; // 25
`${temp}`; // "25°C"
temp + 5; // 30
```

### Other Well-Known Symbols

| Symbol | Purpose |
|---|---|
| `Symbol.iterator` | Default iterator (used by `for...of`) |
| `Symbol.asyncIterator` | Default async iterator (used by `for await...of`) |
| `Symbol.hasInstance` | Customizes `instanceof` behavior |
| `Symbol.toPrimitive` | Custom type conversion |
| `Symbol.toStringTag` | Customizes `Object.prototype.toString()` |
| `Symbol.species` | Constructor for derived objects |
| `Symbol.match` | Customizes `String.prototype.match()` |
| `Symbol.replace` | Customizes `String.prototype.replace()` |
| `Symbol.split` | Customizes `String.prototype.split()` |
| `Symbol.search` | Customizes `String.prototype.search()` |

### Key Points

- Symbols are not enumerable in `for...in` loops
- `Object.getOwnPropertySymbols()` returns symbol properties
- `typeof` returns `"symbol"` for symbols
- Symbols cannot be implicitly converted to strings

---

## 12. Iterators and Generators

### Iterators

An iterator is an object that defines a sequence and a `next()` method returning `{ value, done }`.

```js
const iterator = {
  current: 0,
  last: 5,
  next() {
    if (this.current <= this.last) {
      return { value: this.current++, done: false };
    }
    return { value: undefined, done: true };
  },
};

iterator.next(); // { value: 0, done: false }
iterator.next(); // { value: 1, done: false }
// ... until done is true
```

### Iterable Protocol

An object is iterable if it has a `[Symbol.iterator]()` method returning an iterator:

```js
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

const range = new Range(1, 3);
for (const num of range) {
  console.log(num); // 1, 2, 3
}
```

### Generators

Generator functions are written with `function*` syntax. They return a generator object that conforms to both the iterable and iterator protocols.

```js
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }
```

### Generator Features

```js
// Yield with expressions
function* calc() {
  const a = yield "What is 2 + 2?";
  const b = yield "What is 3 * 3?";
  return a + b;
}

const calc2 = calc();
calc2.next(); // { value: "What is 2 + 2?", done: false }
calc2.next(4); // { value: "What is 3 * 3?", done: false }
calc2.next(9); // { value: 13, done: true }

// yield* to delegate to another generator
function* inner() {
  yield "a";
  yield "b";
}

function* outer() {
  yield* inner();
  yield "c";
}

[...outer()]; // ["a", "b", "c"]

// Infinite sequences
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
fib.next().value; // 0
fib.next().value; // 1
fib.next().value; // 1
fib.next().value; // 2
```

### Generator Methods

| Method | Description |
|---|---|
| `next(value)` | Resumes execution, passing `value` as the result of the last `yield` |
| `return(value)` | Finishes the generator, returning `{ value, done: true }` |
| `throw(error)` | Throws an error into the generator |

### Iterator Helper Methods (ES2025)

The `Iterator` class provides helper methods like `map()`, `filter()`, `take()`, `drop()`:

```js
const iter = [1, 2, 3, 4, 5].values();
const result = iter
  .map((x) => x * 2)
  .filter((x) => x > 4)
  .take(2);
[...result]; // [6, 8]
```

---

## 13. Promises

A `Promise` represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

### Creating Promises

```js
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Operation completed");
  } else {
    reject(new Error("Operation failed"));
  }
});
```

### Consuming Promises

```js
promise
  .then((result) => {
    console.log(result); // "Operation completed"
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Done regardless of outcome");
  });
```

### Promise Chaining

```js
fetch("/api/user")
  .then((res) => res.json())
  .then((user) => fetch(`/api/posts/${user.id}`))
  .then((res) => res.json())
  .then((posts) => console.log(posts))
  .catch((error) => console.error(error));
```

### Static Methods

```js
// Promise.all - resolve when ALL promises resolve
const results = await Promise.all([
  fetch("/api/users"),
  fetch("/api/posts"),
  fetch("/api/comments"),
]);

// Promise.allSettled - resolve when ALL settle (fulfill or reject)
const results = await Promise.allSettled([
  fetch("/api/users"),
  fetch("/api/posts"),
]);
// [{ status: "fulfilled", value: ... }, { status: "rejected", reason: ... }]

// Promise.race - resolve/reject when FIRST settles
const result = await Promise.race([
  fetch("/api/fast"),
  fetch("/api/slow"),
]);

// Promise.any - resolve when FIRST fulfills (ignores rejections)
const result = await Promise.any([
  fetch("/api/server1"),
  fetch("/api/server2"),
]);

// Promise.resolve - create a resolved promise
const resolved = Promise.resolve("value");

// Promise.reject - create a rejected promise
const rejected = Promise.reject(new Error("fail"));

// Promise.withResolvers (ES2024)
const { promise, resolve, reject } = Promise.withResolvers();
```

### async/await

Syntactic sugar over promises that makes async code look synchronous:

```js
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed:", error);
    throw error;
  }
}

// Parallel execution
async function loadAll() {
  const [users, posts] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
  ]);
  return { users, posts };
}
```

### Key Points

- An async function always returns a promise
- `await` pauses execution until the promise settles
- `await` can only be used inside async functions (or at module top-level)
- Unhandled promise rejections crash Node.js processes
- `async/await` has the same concurrency semantics as promise chains

---

## 14. Proxy and Reflect

### Proxy

A `Proxy` wraps an object and intercepts fundamental operations (reading, writing, property access, etc.).

```js
const target = {
  message1: "hello",
  message2: "world",
};

const handler = {
  get(target, prop, receiver) {
    if (prop === "message2") {
      return "overridden";
    }
    return Reflect.get(target, prop, receiver);
  },
};

const proxy = new Proxy(target, handler);
console.log(proxy.message1); // "hello"
console.log(proxy.message2); // "overridden"
```

### Proxy Traps (All 13)

| Trap | Intercepts |
|---|---|
| `get(target, prop, receiver)` | Reading a property |
| `set(target, prop, value, receiver)` | Writing to a property |
| `has(target, prop)` | `in` operator |
| `deleteProperty(target, prop)` | `delete` operator |
| `apply(target, thisArg, args)` | Function call |
| `construct(target, args)` | `new` operator |
| `getPrototypeOf(target)` | `Object.getPrototypeOf()` |
| `setPrototypeOf(target, proto)` | `Object.setPrototypeOf()` |
| `isExtensible(target)` | `Object.isExtensible()` |
| `preventExtensions(target)` | `Object.preventExtensions()` |
| `defineProperty(target, prop, descriptor)` | `Object.defineProperty()` |
| `getOwnPropertyDescriptor(target, prop)` | `Object.getOwnPropertyDescriptor()` |
| `ownKeys(target)` | `Object.keys()`, `for...in`, etc. |

### Practical Examples

```js
// Validation proxy
const validator = {
  set(target, prop, value) {
    if (prop === "age" && typeof value !== "number") {
      throw new TypeError("Age must be a number");
    }
    if (prop === "age" && (value < 0 || value > 150)) {
      throw new RangeError("Age must be 0-150");
    }
    target[prop] = value;
    return true;
  },
};

const person = new Proxy({}, validator);
person.age = 25; // OK
// person.age = "old"; // TypeError

// Reactive objects (like Vue.js)
function makeObservable(target) {
  const handlers = [];

  target.observe = function (handler) {
    handlers.push(handler);
  };

  return new Proxy(target, {
    set(target, property, value, receiver) {
      const success = Reflect.set(...arguments);
      if (success) {
        handlers.forEach((handler) => handler(property, value));
      }
      return success;
    },
  });
}
```

### Reflect

`Reflect` provides static methods that correspond 1:1 with Proxy traps. It's used to forward operations to the original object.

```js
// Each Reflect method corresponds to a Proxy trap
Reflect.get(target, prop, receiver);
Reflect.set(target, prop, value, receiver);
Reflect.has(target, prop);
Reflect.deleteProperty(target, prop);
Reflect.construct(target, args);
Reflect.apply(target, thisArg, args);
Reflect.ownKeys(target);
// ... etc.
```

### Why Use Reflect?

```js
const proxy = new Proxy(user, {
  get(target, prop, receiver) {
    // Reflect.get preserves correct 'this' for getters
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    return Reflect.set(target, prop, value, receiver);
  },
});
```

---

## 15. for...of Loop

The `for...of` loop iterates over **iterable objects** (Array, String, Map, Set, NodeList, arguments, generators, user-defined iterables).

### Syntax

```js
for (const value of iterable) {
  // do something with value
}
```

### With Arrays

```js
const arr = ["a", "b", "c"];
for (const value of arr) {
  console.log(value); // "a", "b", "c"
}
```

### With Strings

```js
const str = "Hello";
for (const char of str) {
  console.log(char); // "H", "e", "l", "l", "o"
}
```

### With Maps

```js
const map = new Map([["a", 1], ["b", 2]]);
for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}
```

### With Sets

```js
const set = new Set([1, 2, 3]);
for (const value of set) {
  console.log(value); // 1, 2, 3
}
```

### With break, continue, return

```js
for (const value of [1, 2, 3, 4, 5]) {
  if (value === 3) break;
  console.log(value); // 1, 2
}
```

### for...of vs for...in

| `for...in` | `for...of` |
|---|---|
| Iterates over **property keys** | Iterates over **values** |
| Includes prototype chain | Only own iterable values |
| Good for objects | Good for arrays, strings, maps, sets |
| Returns string keys | Returns values |

### Custom Iterables

```js
class Fibonacci {
  constructor(limit) {
    this.limit = limit;
  }

  *[Symbol.iterator]() {
    let a = 0, b = 1;
    while (a < this.limit) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

for (const num of new Fibonacci(10)) {
  console.log(num); // 0, 1, 1, 2, 3, 5, 8
}
```

### for await...of (Async Iteration)

```js
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

for await (const value of asyncGenerator()) {
  console.log(value); // 1, 2, 3
}
```

---

## 16. Computed Property Names

ES6 allows you to use expressions as property names in object literals by wrapping them in square brackets `[]`.

```js
// Variable as property name
const prop = "foo";
const obj = { [prop]: "bar" };
console.log(obj.foo); // "bar"

// Expression as property name
const prefix = "machine";
const config = {
  [prefix + " name"]: "server",
  [prefix + " hours"]: 10000,
};
console.log(config["machine name"]); // "server"

// Template literal as property name
const fieldNumber = 3;
const data = {
  [`field${fieldNumber}`]: 15,
};
console.log(data.field3); // 15

// Computed method names
const methodName = "sayHello";
const obj2 = {
  [methodName]() {
    return "Hello!";
  },
};
obj2.sayHello(); // "Hello!"

// Symbol as property name
const MY_KEY = Symbol("myKey");
const obj3 = {
  [MY_KEY]: "value",
};
```

### Key Points

- Any expression can be used (variables, function calls, template literals, etc.)
- Computed property names cannot use shorthand syntax: `{ [var] }` is a SyntaxError
- Duplicate computed property names are allowed (last one wins)
- JSON.parse() will reject computed property names

---

## 17. Object Static Methods

### Object.assign()

Copies all enumerable own properties from source objects to a target object.

```js
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

Object.assign(target, source1, source2);
// target: { a: 1, b: 3, c: 5, d: 6 }

// Common use: shallow clone
const clone = Object.assign({}, original);

// Common use: merge with defaults
const settings = Object.assign({}, defaults, userSettings);
```

### Object.entries()

Returns an array of a given object's own enumerable string-keyed property `[key, value]` pairs.

```js
const obj = { a: 1, b: 2, c: 3 };
Object.entries(obj); // [["a", 1], ["b", 2], ["c", 3]]

// Useful for iteration
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}

// Convert to Map
const map = new Map(Object.entries(obj));
```

### Object.fromEntries()

Creates a new object from an iterable of key-value pairs.

```js
const entries = [["a", 1], ["b", 2], ["c", 3]];
Object.fromEntries(entries); // { a: 1, b: 2, c: 3 }

// Convert Map to object
const map = new Map([["a", 1], ["b", 2]]);
const obj = Object.fromEntries(map);

// Transform object
const transformed = Object.fromEntries(
  Object.entries(obj).filter(([key, value]) => value > 1)
);

// URL search params to object
const params = new URLSearchParams("name=Alice&age=30");
const paramsObj = Object.fromEntries(params);
```

### Object.values()

Returns an array of a given object's own enumerable string-keyed property values.

```js
const obj = { a: 1, b: 2, c: 3 };
Object.values(obj); // [1, 2, 3]
```

### Object.keys()

Returns an array of a given object's own enumerable string-keyed property names.

```js
const obj = { a: 1, b: 2, c: 3 };
Object.keys(obj); // ["a", "b", "c"]
```

### Comparison

| Method | Returns |
|---|---|
| `Object.keys()` | Array of keys |
| `Object.values()` | Array of values |
| `Object.entries()` | Array of `[key, value]` pairs |
| `Object.fromEntries()` | Object from entries |
| `Object.assign()` | Modified target object |

---

## 18. String Methods

### includes()

Performs a case-sensitive search to determine whether a string contains another string.

```js
const str = "Hello, World!";
str.includes("World"); // true
str.includes("world"); // false (case-sensitive)
str.includes("World", 7); // false (start position)
```

### startsWith()

Determines whether a string begins with the characters of another string.

```js
const str = "Hello, World!";
str.startsWith("Hello"); // true
str.startsWith("World", 7); // true (start position)
```

### endsWith()

Determines whether a string ends with the characters of another string.

```js
const str = "Hello, World!";
str.endsWith("World!"); // true
str.endsWith("Hello", 5); // true (search length)
```

### repeat()

Constructs and returns a new string containing the specified number of copies.

```js
"abc".repeat(2); // "abcabc"
"abc".repeat(0); // ""
"abc".repeat(-1); // RangeError
```

### padStart() / padEnd()

Pads the current string with another string until it reaches the given length.

```js
"5".padStart(3, "0"); // "005"
"5".padEnd(3, "0"); // "500"
"hello".padStart(20); // "               hello" (spaces)
"abc".padStart(10, "xyz"); // "xyzxyzxabc"

// Formatting
"42".padStart(6, "0"); // "000042"
"hello".padEnd(10, "."); // "hello....."
```

### trimStart() / trimEnd()

Removes whitespace from the beginning/end of a string.

```js
"  hello  ".trimStart(); // "hello  "
"  hello  ".trimEnd(); // "  hello"
"  hello  ".trim(); // "hello" (both sides)

// trimLeft/trimRight are aliases
"  hello  ".trimLeft(); // "hello  "
```

### at()

Returns the character at the given index. Supports negative integers for relative indexing from the end.

```js
const str = "Hello";
str.at(0); // "H"
str.at(-1); // "o"
str.at(-2); // "l"

// Equivalent to
str[str.length - 1]; // "o"
```

---

## 19. Array Methods

### Array.from()

Creates a new array from an iterable or array-like object.

```js
// From iterable
Array.from([1, 2, 3]); // [1, 2, 3]

// From string
Array.from("hello"); // ["h", "e", "l", "l", "o"]

// From Set
Array.from(new Set([1, 2, 3, 2, 1])); // [1, 2, 3]

// From array-like object
Array.from({ 0: "a", 1: "b", length: 2 }); // ["a", "b"]

// With map function
Array.from([1, 2, 3], (x) => x * 2); // [2, 4, 6]

// Generate range
Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
```

### Array.of()

Creates an array from its arguments.

```js
Array.of(1); // [1]
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(7); // [7] (unlike Array(7) which creates 7 empty slots)
```

### find()

Returns the **first** element that satisfies the testing function.

```js
const numbers = [5, 12, 8, 130, 44];
const found = numbers.find((n) => n > 10); // 12

// With index
numbers.find((value, index) => index > 2 && value > 10); // 130
```

### findIndex()

Returns the **index** of the first element that satisfies the testing function.

```js
const numbers = [5, 12, 8, 130, 44];
numbers.findIndex((n) => n > 10); // 1
numbers.findIndex((n) => n > 200); // -1 (not found)
```

### findLast() (ES2023)

Returns the **last** element that satisfies the testing function.

```js
const numbers = [5, 12, 8, 130, 44];
numbers.findLast((n) => n > 10); // 44
```

### findLastIndex() (ES2023)

Returns the **index** of the last element that satisfies the testing function.

```js
const numbers = [5, 12, 8, 130, 44];
numbers.findLastIndex((n) => n > 10); // 4
```

### includes()

Determines whether an array includes a certain value.

```js
const arr = [1, 2, 3];
arr.includes(2); // true
arr.includes(4); // false
arr.includes(2, 2); // false (start from index 2)

// With NaN (unlike indexOf)
[NaN].includes(NaN); // true
[NaN].indexOf(NaN); // -1
```

### flat()

Creates a new array with sub-array elements concatenated up to the specified depth.

```js
[1, [2, 3], [4, [5]]].flat(); // [1, 2, 3, 4, [5]] (depth 1)
[1, [2, [3, [4]]]].flat(2); // [1, 2, 3, [4]]
[1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]

// Remove empty slots
[1, , 3, , 5].flat(); // [1, 3, 5]
```

### flatMap()

Maps each element and then flattens the result by one level. Same as `map().flat(1)`.

```js
const sentences = ["Hello world", "Goodbye world"];
sentences.flatMap((s) => s.split(" "));
// ["Hello", "world", "Goodbye", "world"]

// Filter and map in one pass
const nums = [1, 2, 3, 4, 5];
nums.flatMap((n) => (n % 2 === 0 ? [n, n * 2] : []));
// [2, 4, 4, 8]
```

### copyWithin()

Shallow copies part of an array to another location without modifying its length.

```js
[1, 2, 3, 4, 5].copyWithin(0, 3); // [4, 5, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(1, 3, 4); // [1, 4, 3, 4, 5]
```

### fill()

Fills all or part of an array with a value.

```js
Array(5).fill(42); // [42, 42, 42, 42, 42]
[1, 2, 3, 4].fill(0, 1, 3); // [1, 0, 0, 4]
```

### keys(), values(), entries()

Return iterators for keys (indices), values, or entries (`[index, value]`).

```js
const arr = ["a", "b", "c"];

for (const key of arr.keys()) {
  console.log(key); // 0, 1, 2
}

for (const value of arr.values()) {
  console.log(value); // "a", "b", "c"
}

for (const [index, value] of arr.entries()) {
  console.log(`${index}: ${value}`);
}
```

### every()

Tests whether **all** elements pass the testing function.

```js
[1, 2, 3].every((n) => n > 0); // true
[1, -2, 3].every((n) => n > 0); // false
```

### some()

Tests whether **at least one** element passes the testing function.

```js
[1, 2, 3].some((n) => n > 2); // true
[1, 2, 3].some((n) => n > 5); // false
```

### filter()

Creates a new array with elements that pass the testing function.

```js
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter((n) => n % 2 === 0); // [2, 4]
```

### map()

Creates a new array with the results of calling a function on every element.

```js
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2); // [2, 4, 6]
```

### reduce()

Reduces an array to a single value by executing a reducer function on each element.

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, val) => acc + val, 0); // 15

// Flatten array
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.reduce((acc, val) => acc.concat(val), []); // [1, 2, 3, 4, 5]

// Count occurrences
const words = ["apple", "banana", "apple", "cherry"];
const counts = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
// { apple: 2, banana: 1, cherry: 1 }
```

### reduceRight()

Same as `reduce()`, but iterates from right to left.

```js
const numbers = [1, 2, 3];
const result = numbers.reduceRight((acc, val) => acc + val, 0); // 6
```

### sort() with Compare Function

```js
const numbers = [10, 1, 21, 2];

// Default: lexicographic (wrong for numbers)
numbers.sort(); // [1, 10, 2, 21]

// Ascending
numbers.sort((a, b) => a - b); // [1, 2, 10, 21]

// Descending
numbers.sort((a, b) => b - a); // [21, 10, 2, 1]

// Sort objects
const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
];
users.sort((a, b) => a.age - b.age);
```

### Immutable Array Methods (ES2023)

These return new arrays without modifying the original:

```js
const arr = [3, 1, 4, 1, 5];

arr.toSorted(); // [1, 1, 3, 4, 5] (new array)
arr.toReversed(); // [5, 1, 4, 1, 3]
arr.toSpliced(1, 2); // [3, 5] (remove 2 elements at index 1)
arr.with(0, 99); // [99, 1, 4, 1, 5] (replace at index 0)
```

---

## 20. Number Methods

### Number.isNaN()

Determines whether the passed value is the number `NaN`. Does **not** coerce the parameter.

```js
Number.isNaN(NaN); // true
Number.isNaN(42); // false
Number.isNaN("NaN"); // false (unlike global isNaN)
Number.isNaN("hello"); // false

// Global isNaN coerces
isNaN("NaN"); // true
isNaN("hello"); // true
```

### Number.isFinite()

Determines whether the passed value is a finite number.

```js
Number.isFinite(42); // true
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite(NaN); // false
Number.isFinite("42"); // false (doesn't coerce)
```

### Number.isInteger()

Determines whether the passed value is an integer.

```js
Number.isInteger(42); // true
Number.isInteger(42.0); // true
Number.isInteger(42.1); // false
Number.isInteger("42"); // false
Number.isInteger(NaN); // false
Number.isInteger(Infinity); // false
```

### Number.isSafeInteger()

Determines whether the provided value is a safe integer (between `-(2^53 - 1)` and `2^53 - 1`).

```js
Number.isSafeInteger(42); // true
Number.isSafeInteger(2 ** 53); // 9007199254740992 - false
Number.isSafeInteger(2 ** 53 - 1); // 9007199254740991 - true
Number.isSafeInteger(2 ** 53 + 1); // false
Number.isSafeInteger(3.14); // false
```

### Number.parseInt()

Parses a string and returns an integer. Same as global `parseInt()`.

```js
Number.parseInt("42"); // 42
Number.parseInt("42px"); // 42
Number.parseInt("0x1A"); // 26 (hex)
Number.parseInt("0o17"); // 15 (octal)
Number.parseInt("10", 2); // 2 (binary)
Number.parseInt("hello"); // NaN
```

### Number.parseFloat()

Parses a string and returns a floating point number. Same as global `parseFloat()`.

```js
Number.parseFloat("3.14"); // 3.14
Number.parseFloat("3.14px"); // 3.14
Number.parseFloat("0xFF"); // 0 (doesn't recognize hex prefix)
Number.parseFloat("hello"); // NaN
```

### Number Constants

| Constant | Value | Description |
|---|---|---|
| `Number.EPSILON` | 2.220446049250313e-16 | Difference between 1 and smallest value > 1 |
| `Number.MAX_SAFE_INTEGER` | 9007199254740991 (2^53 - 1) | Maximum safe integer |
| `Number.MIN_SAFE_INTEGER` | -9007199254740991 (-(2^53 - 1)) | Minimum safe integer |
| `Number.MAX_VALUE` | 1.7976931348623157e+308 | Largest positive representable number |
| `Number.MIN_VALUE` | 5e-324 | Smallest positive representable number |
| `Number.NaN` | NaN | Not-a-Number |
| `Number.POSITIVE_INFINITY` | Infinity | Positive infinity |
| `Number.NEGATIVE_INFINITY` | -Infinity | Negative infinity |

### Comparing Number Methods

| Method | NaN | "42" | 42.0 | Infinity | 42.1 |
|---|---|---|---|---|---|
| `Number.isNaN()` | true | false | false | false | false |
| `Number.isFinite()` | false | false | true | false | true |
| `Number.isInteger()` | false | false | true | false | false |
| `Number.isSafeInteger()` | false | false | true | false | false |

---

## 21. Math Methods

### Math.trunc()

Returns the integer part of a number by removing any fractional digits.

```js
Math.trunc(42.84); // 42
Math.trunc(-42.84); // -42
Math.trunc(-0.123); // -0
Math.trunc("42px"); // NaN
Math.trunc(Infinity); // Infinity
```

**Differs from Math.floor()**: `Math.trunc(-1.5)` is `-1`, while `Math.floor(-1.5)` is `-2`.

### Math.sign()

Returns the sign of a number: `1` for positive, `-1` for negative, `0` for zero.

```js
Math.sign(5); // 1
Math.sign(-5); // -1
Math.sign(0); // 0
Math.sign(-0); // -0
Math.sign("hello"); // NaN
```

### Math.cbrt()

Returns the cube root of a number.

```js
Math.cbrt(27); // 3
Math.cbrt(-8); // -2
Math.cbrt(0); // 0
Math.cbrt("8"); // 2 (coerces string to number)
```

### Math.hypot()

Returns the square root of the sum of squares of its arguments (hypotenuse).

```js
Math.hypot(3, 4); // 5 (√(9+16))
Math.hypot(5, 12); // 13
Math.hypot(1, 1, 1); // √3 ≈ 1.732
Math.hypot(); // 0
```

### Math.log2()

Returns the base-2 logarithm of a number.

```js
Math.log2(8); // 3 (2^3 = 8)
Math.log2(1); // 0 (2^0 = 1)
Math.log2(0); // -Infinity
Math.log2(-1); // NaN
```

### Math.log10()

Returns the base-10 logarithm of a number.

```js
Math.log10(100); // 2 (10^2 = 100)
Math.log10(1); // 0 (10^0 = 1)
Math.log10(0); // -Infinity
Math.log10(-1); // NaN
```

### Math.fround()

Returns the nearest 32-bit single precision float representation of a number.

```js
Math.fround(1.5); // 1.5
Math.fround(1.337); // 1.3370000123977661
Math.fround(Infinity); // Infinity
```

### Other Notable Math Methods

| Method | Description | Example |
|---|---|---|
| `Math.abs(x)` | Absolute value | `Math.abs(-5)` → `5` |
| `Math.ceil(x)` | Round up | `Math.ceil(4.1)` → `5` |
| `Math.floor(x)` | Round down | `Math.floor(4.9)` → `4` |
| `Math.round(x)` | Round to nearest | `Math.round(4.5)` → `5` |
| `Math.max(a,b,...)` | Largest value | `Math.max(1,5,3)` → `5` |
| `Math.min(a,b,...)` | Smallest value | `Math.min(1,5,3)` → `1` |
| `Math.pow(x,y)` | x to the power y | `Math.pow(2,3)` → `8` |
| `Math.sqrt(x)` | Square root | `Math.sqrt(16)` → `4` |
| `Math.random()` | Random 0-1 | `Math.random()` → `0.723...` |
| `Math.exp(x)` | e^x | `Math.exp(1)` → `2.718...` |
| `Math.log(x)` | Natural log | `Math.log(Math.E)` → `1` |
| `Math.clz32(x)` | Leading zeros in 32-bit | `Math.clz32(1)` → `31` |
| `Math.imul(x,y)` | 32-bit multiply | `Math.imul(3,4)` → `12` |

---

## 22. Optional Chaining (?.)

The optional chaining operator (`?.`) accesses an object's property or calls a function, returning `undefined` instead of throwing an error if the value is `null` or `undefined`.

### Property Access

```js
const user = {
  address: {
    street: "123 Main St",
  },
};

user?.address?.street; // "123 Main St"
user?.phone?.number; // undefined (no error)
```

### Method Calls

```js
const user = {
  greet() {
    return "Hello!";
  },
};

user?.greet(); // "Hello!"
user?.getName(); // undefined (no error)
```

### Computed Property Access

```js
const obj = {};
const key = "name";
obj?.[key]; // undefined
```

### Array Access

```js
const arr = [1, 2, 3];
arr?.[0]; // 1
arr?.[10]; // undefined
```

### Chaining

```js
const user = {
  address: {
    street: "123 Main St",
    city: {
      name: "NYC",
    },
  },
};

user?.address?.city?.name; // "NYC"
user?.address?.zip?.code; // undefined (no error)
```

### Short-Circuiting

```js
// If left side is null/undefined, right side is NOT evaluated
user?.getName(); // If user is null, getName() is NOT called
```

### Key Points

- `?.` is like `.`, but returns `undefined` if the value is `null` or `undefined`
- Cannot be used with private fields (`#`)
- Can be chained
- Short-circuits: if left operand is nullish, the entire chain returns `undefined`

---

## 23. Nullish Coalescing (??)

The nullish coalescing operator (`??`) returns its right-hand side operand when its left-hand side operand is `null` or `undefined`.

### Basic Usage

```js
const nullValue = null;
const undefinedValue = undefined;
const zero = 0;
const emptyString = "";

nullValue ?? "default"; // "default"
undefinedValue ?? "default"; // "default"
zero ?? "default"; // 0 (NOT nullish)
emptyString ?? "default"; // "" (NOT nullish)
```

### vs || Operator

```js
const count = 0;

// || treats 0 as falsy
count || 10; // 10

// ?? only treats null/undefined as nullish
count ?? 10; // 0

const name = "";

name || "Anonymous"; // "Anonymous"
name ?? "Anonymous"; // ""
```

### Real-World Usage

```js
// Setting configuration defaults
const config = {
  duration: userDuration ?? 1000,
  speed: userSpeed ?? 25,
  color: userColor ?? "blue",
};

// Function with nullable parameter
function greet(name) {
  const displayName = name ?? "World";
  return `Hello, ${displayName}!`;
}

// Short-circuit assignment
let x;
x ??= 10; // Assigns 10 if x is null/undefined
```

### Key Points

- Only returns the right operand when the left is `null` or `undefined`
- Does NOT treat `0`, `""`, `false`, etc. as nullish (unlike `||`)
- Short-circuits: only evaluates the right side if the left side is nullish

---

## 24. Logical Assignment Operators (ES2021)

### Logical AND Assignment (&&=)

Only evaluates the right operand and assigns to the left if the left operand is **truthy**.

```js
let x = 1;
x &&= 2; // equivalent to x && (x = 2); x is now 2

let y = 0;
y &&= 2; // y is still 0 (falsy, no assignment)

const z = 0;
z &&= 2; // z is still 0 (short-circuits, no error on const)
```

### Logical OR Assignment (||=)

Only evaluates the right operand and assigns to the left if the left operand is **falsy**.

```js
let x;
x ||= 10; // equivalent to x || (x = 10); x is now 10

let y = "hello";
y ||= "default"; // y is still "hello" (truthy, no assignment)

const z = "hello";
z ||= "default"; // z is still "hello" (short-circuits, no error on const)
```

### Nullish Coalescing Assignment (??=)

Only evaluates the right operand and assigns to the left if the left operand is **null or undefined**.

```js
let x;
x ??= 10; // equivalent to x ?? (x = 10); x is now 10

let y = 0;
y ??= 10; // y is still 0 (not nullish)

const z = 0;
z ??= 10; // z is still 0 (short-circuits, no error on const)
```

### Summary Table

| Operator | Equivalent | Condition for Assignment |
|---|---|---|
| `x &&= y` | `x && (x = y)` | x is truthy |
| `x \|\|= y` | `x \|\| (x = y)` | x is falsy |
| `x ??= y` | `x ?? (x = y)` | x is null or undefined |

### Key Points

- All three are **short-circuiting**: the right operand is only evaluated if the left doesn't prevent assignment
- No assignment error on `const` if the left side is truthy/nullish (short-circuits)
- Return value is that of the logical operation without the assignment

---

## 25. at() Method

The `at()` method takes an integer and returns the element at that index. Negative integers count back from the last element.

### Array.at()

```js
const arr = [1, 2, 3, 4, 5];
arr.at(0); // 1
arr.at(2); // 3
arr.at(-1); // 5 (last element)
arr.at(-2); // 4
arr.at(10); // undefined

// Equivalent to:
arr[arr.length - 1]; // 5
```

### String.at()

```js
const str = "Hello";
str.at(0); // "H"
str.at(-1); // "o" (last character)
str.at(-2); // "l"
str.at(10); // undefined
```

### Key Points

- Supports negative indexing (relative from the end)
- Returns `undefined` for out-of-bounds access
- Available on `Array.prototype.at()`, `String.prototype.at()`, `TypedArray.prototype.at()`

---

## 26. Object.hasOwn()

`Object.hasOwn()` determines whether an object has a property as its own property. It's the preferred alternative to `Object.prototype.hasOwnProperty()`.

```js
const obj = { name: "Alice", age: 30 };

Object.hasOwn(obj, "name"); // true
Object.hasOwn(obj, "toString"); // false (inherited)
Object.hasOwn(obj, "missing"); // false

// Works with objects without a prototype
const noProto = Object.create(null);
noProto.key = "value";
Object.hasOwn(noProto, "key"); // true

// Better than hasOwnProperty
obj.hasOwnProperty("name"); // true (but can be overridden)
Object.hasOwn(obj, "name"); // true (safer)
```

### Key Points

- Preferred over `obj.hasOwnProperty()` which can be overridden or missing on null-prototype objects
- Takes the object as the first argument (not `this`)
- Returns `true` for own properties, `false` for inherited or non-existent

---

## 27. Structured Clone Algorithm

The `structuredClone()` method creates a **deep clone** of a value using the structured clone algorithm. Unlike `JSON.parse(JSON.stringify())`, it handles many more types and supports circular references.

### Basic Usage

```js
const original = {
  name: "Alice",
  nested: { value: 42 },
  date: new Date(),
  regex: /hello/gi,
  map: new Map([["key", "value"]]),
  set: new Set([1, 2, 3]),
};

const clone = structuredClone(original);
clone.nested.value = 100;
console.log(original.nested.value); // 42 - original unaffected
```

### With Transferable Objects

```js
const buffer = new ArrayBuffer(1024);
const clone = structuredClone(buffer, { transfer: [buffer] });
// Original buffer is detached (unusable)
```

### Supported Types

- All JavaScript primitives (except `symbol`)
- `Object`
- `Array`
- `ArrayBuffer`
- `Boolean`, `Number`, `String`
- `Date`
- `Error` types (Error, TypeError, RangeError, etc.)
- `Map` and `Set`
- `RegExp`
- `TypedArray` (Int8Array, Float32Array, etc.)
- `DataView`
- Plain objects, arrays, and their nested combinations

### NOT Supported

- Functions (throws DataCloneError)
- DOM nodes
- Symbols
- Property descriptors, setters/getters
- Class instances (without custom handling)

### Comparison

| Feature | `structuredClone()` | `JSON.parse(JSON.stringify())` |
|---|---|---|
| Circular references | Yes | No (throws) |
| Date objects | Yes (as Date) | Yes (as string) |
| RegExp | Yes | Empty object |
| Map/Set | Yes | Empty object |
| Functions | No | No |
| undefined | Yes | Removed from objects |
| NaN/Infinity | Yes | null |
| Performance | Good | Slower for large objects |

---

## 28. Temporal API

The Temporal API is a comprehensive date/time API that replaces the legacy `Date` object. It reached **Stage 4** in March 2026 and is being merged into the ECMAScript specification.

### Key Features

- First-class support for all time zones, including DST-safe arithmetic
- Strongly-typed objects for dates, times, date/time values, year/month values, month/day values, "zoned" date/time values, and durations
- Immutability for all Temporal objects
- String serialization via standardized formats (ISO 8601, RFC 3339, RFC 9557)
- Full support for non-Gregorian calendars

### Temporal Objects

```js
// Temporal.PlainDate - calendar date (no time, no time zone)
const date = Temporal.PlainDate.from("2026-07-12");
date.year; // 2026
date.month; // 7
date.day; // 12

// Temporal.PlainTime - time of day
const time = Temporal.PlainTime.from("14:30:00");
time.hour; // 14
time.minute; // 30

// Temporal.PlainDateTime - date + time (no time zone)
const dt = Temporal.PlainDateTime.from("2026-07-12T14:30:00");

// Temporal.ZonedDateTime - date + time + time zone
const zdt = Temporal.ZonedDateTime.from("2026-07-12T14:30:00[America/New_York]");
zdt.hour; // 14
zdt.timeZoneId; // "America/New_York"

// Temporal.Instant - absolute point in time (UTC)
const instant = Temporal.Instant.from("2026-07-12T19:30:00Z");

// Temporal.Duration - amount of time
const duration = Temporal.Duration.from({ hours: 1, minutes: 30 });

// Temporal.YearMonth - year/month without day
const yearMonth = Temporal.YearMonth.from("2026-07");

// Temporal.MonthDay - month/day without year
const monthDay = Temporal.MonthDay.from("07-12");
```

### Arithmetic

```js
const date = Temporal.PlainDate.from("2026-07-12");
const nextWeek = date.add({ days: 7 });
const lastMonth = date.subtract({ months: 1 });

// Duration
const duration = Temporal.Duration.from({ hours: 1, minutes: 30 });
const sum = Temporal.Duration.from({ hours: 2 }).add(duration);
// PT3H30M

// Comparison
date.equals(nextWeek); // false
date.until(nextWeek); // P7D
```

### Calendar Support

```js
// Non-Gregorian calendars
const hebrewDate = Temporal.PlainDate.from({
  year: 5786,
  month: 11,
  day: 1,
  calendar: "hebrew",
});
```

### Timezone Support

```js
const zdt = Temporal.ZonedDateTime.from("2026-07-12T14:30:00-04:00[America/New_York]");

// Convert to another timezone
const tokyoTime = zdt.withTimeZone("Asia/Tokyo");
tokyoTime.hour; // 3 (next day)

// DST handling
const duringDST = Temporal.ZonedDateTime.from("2026-03-08T02:30:00[America/New_York]");
// Correctly handles spring forward transition
```

### Immutability

```js
const date = Temporal.PlainDate.from("2026-07-12");
date.add({ days: 1 }); // Returns new object, original unchanged
// date.day is still 12
```

---

## 29. Top-Level Await

Top-level `await` allows the `await` keyword to be used at the top level of an ECMAScript module, outside of async functions.

### Basic Usage

```js
// colors.js
const response = await fetch("../data/colors.json");
const colors = await response.json();

export default await colors;
```

### In Main Module

```js
// main.js
import colors from "./modules/colors.js";
import { Canvas } from "./modules/canvas.js";

// main.js won't execute until colors.js has finished its top-level await
// But canvas.js will load in parallel (sibling modules)
```

### Key Behaviors

```js
// Sequential execution within a module
const data1 = await fetch("/api/data1");
const json1 = await data1.json();
const data2 = await fetch(`/api/data2/${json1.id}`);
const json2 = await data2.json();

// Top-level await pauses THIS module's evaluation
// It does NOT block other modules from loading
// Sibling modules continue loading in parallel
```

### Error Handling

```js
try {
  const response = await fetch("/api/data");
  const data = await response.json();
  export default data;
} catch (error) {
  console.error("Failed to load:", error);
  export default null;
}
```

### Key Points

- Only works in modules (not in scripts)
- Pauses the current module's evaluation, not the entire program
- Sibling modules continue to load and execute
- Parent modules wait for child modules with top-level await
- All modules in the dependency graph are evaluated asynchronously

---

## 30. import.meta

`import.meta` is a meta-property that exposes context-specific metadata to a JavaScript module.

### import.meta.url

Returns the URL of the current module.

```js
// In a module file
console.log(import.meta.url);
// "https://example.com/modules/my-module.js"

// Useful for resolving relative paths
const imageUrl = new URL("./images/logo.png", import.meta.url);
const img = document.createElement("img");
img.src = imageUrl.href;
```

### import.meta.resolve()

Resolves a module specifier to a URL using the current module's URL as base.

```js
// Resolve a relative path
const moduleUrl = import.meta.resolve("./helper.js");
const module = await import(moduleUrl);

// Resolve a bare specifier
const lodashUrl = import.meta.resolve("lodash");

// Equivalent to new URL(specifier, import.meta.url).href
// But more explicit and less ambiguous
```

### Key Points

- `import.meta` is only available in modules (not in scripts)
- `import.meta.url` returns the URL of the current module
- `import.meta.resolve()` is a function that resolves module specifiers
- The object is extensible - host environments can add properties
- `import.meta` is an object, not a class instance
- Different from `import()` which dynamically loads modules

```js
// import.meta vs import()
import.meta.url; // URL of current module (synchronous)
import("./module.js"); // Load another module (returns Promise)
```

### Browser Support

`import.meta.url` is supported in all modern browsers when using `<script type="module">`.

`import.meta.resolve()` is supported in Chrome 105+, Firefox 106+, Safari 16.4+, and Node.js 20.8+.

---

## Quick Reference: ES Version History

| Version | Year | Key Features |
|---|---|---|
| ES2015 (ES6) | 2015 | let/const, arrow functions, classes, modules, template literals, destructuring, spread/rest, Promises, Map/Set, Symbol, generators, for...of |
| ES2016 | 2016 | Array.prototype.includes, exponentiation operator (**) |
| ES2017 | 2017 | async/await, Object.entries/values, String padding, trailing commas in function params |
| ES2018 | 2018 | Rest/spread properties, async iteration, Promise.finally, RegExp improvements |
| ES2019 | 2019 | Array.flat/flatMap, Object.fromEntries, String.trimStart/trimEnd, optional catch binding, Symbol.description |
| ES2020 | 2020 | Optional chaining (?.), nullish coalescing (??), Promise.allSettled/any, BigInt, globalThis, dynamic import(), export * as ns |
| ES2021 | 2021 | Logical assignment (&&=, \|\|=, ??=), String.replaceAll, Promise.any, numeric separators, WeakRef, FinalizationRegistry |
| ES2022 | 2022 | Class fields (public/private), static blocks, top-level await, Object.hasOwn(), Array.at(), cause on Error |
| ES2023 | 2023 | Array.toSorted/toReversed/toSpliced/with, Hashbang grammar, WeakMap.getOrInsert/getOrInsertComputed |
| ES2024 | 2024 | Set methods (union, intersection, etc.), ArrayBuffer.resize, structuredClone transfer, Promise.withResolvers, Object.groupBy, Map.groupBy |
| ES2025 | 2025 | Set methods (difference, symmetricDifference, isSubsetOf, etc.), Iterator helpers, RegExp.escape, import.meta.resolve |
| ES2026 | 2026 | Temporal API (Stage 4), decorators (Stage 3) |
