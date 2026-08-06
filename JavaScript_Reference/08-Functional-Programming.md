# Functional Programming in JavaScript

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

A comprehensive guide to all functional programming concepts, patterns, and techniques in JavaScript.

---

## Table of Contents

1. [Pure Functions](#1-pure-functions)
2. [Side Effects](#2-side-effects)
3. [Immutability](#3-immutability)
4. [First-Class Functions](#4-first-class-functions)
5. [Higher-Order Functions](#5-higher-order-functions)
6. [Closures](#6-closures)
7. [Currying](#7-currying)
8. [Partial Application](#8-partial-application)
9. [Function Composition](#9-function-composition)
10. [Point-Free Style](#10-point-free-style)
11. [Functor (map)](#11-functor-map)
12. [Monad (flatMap/chain)](#12-monad-flatmapchain)
13. [Function Pipe](#13-function-pipe)
14. [Recursion](#14-recursion)
15. [Tail Call Optimization](#15-tail-call-optimization)
16. [Memoization](#16-memoization)
17. [Debouncing](#17-debouncing)
18. [Throttling](#18-throttling)
19. [Lazy Evaluation](#19-lazy-evaluation)
20. [Transducers](#20-transducers)
21. [Algebraic Data Types](#21-algebraic-data-types)
22. [Pattern Matching](#22-pattern-matching)
23. [Curry vs Uncurry](#23-curry-vs-uncurry)
24. [Combinators](#24-combinators)
25. [Function Identity (id)](#25-function-identity)
26. [Flip, Once, Negate Utilities](#26-flip-once-negate-utilities)
27. [Reducer Pattern](#27-reducer-pattern)
28. [Immutable Data Structures](#28-immutable-data-structures)
29. [FP Libraries](#29-fp-libraries)
30. [OOP vs FP in JavaScript](#30-oop-vs-fp-in-javascript)
31. [Practical FP Patterns](#31-practical-fp-patterns)
32. [Avoiding Mutation](#32-avoiding-mutation)
33. [Function Composition with Pipe and Compose](#33-function-composition-with-pipe-and-compose)
34. [Monad Patterns (Maybe, Either)](#34-monad-patterns-maybe-either)
35. [Lens Pattern for Immutable Updates](#35-lens-pattern-for-immutable-updates)

---

## 1. Pure Functions

A pure function always returns the same output for the same input and produces no side effects.

```javascript
// Pure
function add(a, b) {
    return a + b;
}

add(2, 3); // 5
add(2, 3); // 5 (always)

// Impure - depends on external state
let tax = 0.1;
function calculateTotal(price) {
    return price + price * tax; // depends on external `tax`
}

// Impure - modifies external state
let count = 0;
function increment() {
    count++; // side effect
}

// Pure version
function incrementPure(count) {
    return count + 1;
}
```

### Why Pure Functions Matter

- **Testable**: No setup/teardown needed
- **Cacheable**: Same input always gives same output
- **Reference-free**: No hidden dependencies
- **Parallelizable**: No shared state concerns

---

## 2. Side Effects

A side effect is any interaction with the outside world from within a function.

```javascript
// Side effects include:
function example(x) {
    // Modifying external variable
    globalVar = x;

    // Modifying a property of an object passed in
    obj.prop = x;

    // Writing to console
    console.log(x);

    // Writing to the DOM
    document.title = x;

    // Making network requests
    fetch('/api/data');

    // Modifying the filesystem
    fs.writeFile('file.txt', x);

    // Triggering side effects
    alert(x);

    // Modifying the arguments object
    arguments[0] = x;

    // Math.random() - non-deterministic
    return x + Math.random();
}
```

### Managing Side Effects

```javascript
// Functional core, imperative shell pattern
function pureCore(input) {
    return input.map(x => x * 2).filter(x => x > 10);
}

function impureShell(data) {
    const result = pureCore(data); // pure computation
    renderToDOM(result);           // side effect at the boundary
    return result;
}
```

---

## 3. Immutability

Data that cannot be changed after creation.

```javascript
// Primitive immutability
let x = 5;
x = 10; // Creates new value, doesn't mutate 5

// String immutability
let str = "hello";
str[0] = "H"; // No effect
str = "Hello"; // Creates new string

// Object immutability
const person = Object.freeze({
    name: "John",
    age: 30
});

person.age = 31; // Silently fails (or throws in strict mode)
person.name; // "John"

// Array immutability with methods
const arr = [1, 2, 3];

// Mutating (avoid)
arr.push(4);
arr[0] = 99;
arr.splice(0, 1);

// Non-mutating (prefer)
const arr2 = [...arr, 4];        // add
const arr3 = arr.filter(x => x !== 2); // remove
const arr4 = arr.map(x => x * 2);      // transform
const arr5 = arr.slice(1);              // copy portion

// Object spread for shallow immutability
const updated = { ...person, age: 31 };

// Nested immutability
const state = {
    user: {
        name: "John",
        address: {
            city: "NYC"
        }
    }
};

// Manual deep update
const newState = {
    ...state,
    user: {
        ...state.user,
        address: {
            ...state.user.address,
            city: "Boston"
        }
    }
};
```

---

## 4. First-Class Functions

Functions are values - they can be assigned, passed, and returned.

```javascript
// Assign to variable
const greet = function(name) {
    return `Hello, ${name}`;
};

const greetArrow = (name) => `Hello, ${name}`;

// Store in data structures
const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b
};

operations.add(2, 3); // 5

// Array of functions
const validators = [
    (v) => v !== null,
    (v) => v !== undefined,
    (v) => typeof v === 'string',
    (v) => v.length > 0
];

// Return from function
function createMultiplier(factor) {
    return (number) => number * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

double(5); // 10
triple(5); // 15

// Pass as argument
function applyOperation(a, b, operation) {
    return operation(a, b);
}

applyOperation(2, 3, (a, b) => a + b); // 5
applyOperation(2, 3, (a, b) => a * b); // 6
```

---

## 5. Higher-Order Functions

Functions that take functions as arguments or return functions.

```javascript
// Takes function as argument
function filter(array, predicate) {
    const result = [];
    for (const item of array) {
        if (predicate(item)) {
            result.push(item);
        }
    }
    return result;
}

filter([1, 2, 3, 4, 5], (x) => x > 3); // [4, 5]

// Returns function
function createGreeter(greeting) {
    return (name) => `${greeting}, ${name}!`;
}

const hello = createGreeter("Hello");
const hola = createGreeter("Hola");

hello("John"); // "Hello, John!"
hola("John");  // "Hola, John!"

// Both
function compose(f, g) {
    return (...args) => f(g(...args));
}

// Built-in higher-order functions
const numbers = [1, 2, 3, 4, 5];

numbers.map(x => x * 2);           // [2, 4, 6, 8, 10]
numbers.filter(x => x % 2 === 0);   // [2, 4]
numbers.reduce((acc, x) => acc + x, 0); // 15
numbers.every(x => x > 0);          // true
numbers.some(x => x > 4);           // true
numbers.find(x => x > 3);           // 4
numbers.findIndex(x => x > 3);      // 3
```

---

## 6. Closures

A closure is a function that remembers the variables from its lexical scope.

```javascript
// Basic closure
function createCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2

// Closure in loop
function createFunctions() {
    const fns = [];
    for (var i = 0; i < 3; i++) {
        fns.push(() => i); // shares same `i`
    }
    return fns;
}

createFunctions().map(f => f()); // [3, 3, 3]

// Fix with let
function createFunctionsFixed() {
    const fns = [];
    for (let i = 0; i < 3; i++) {
        fns.push(() => i); // each has own `i`
    }
    return fns;
}

createFunctionsFixed().map(f => f()); // [0, 1, 2]

// Practical closures
function createLogger(prefix) {
    return (message) => {
        console.log(`[${prefix}] ${message}`);
    };
}

const errorLog = createLogger("ERROR");
const infoLog = createLogger("INFO");

errorLog("Something went wrong"); // [ERROR] Something went wrong
infoLog("Server started");        // [INFO] Server started

// Closure for private state
function createBankAccount(initialBalance) {
    let balance = initialBalance;
    const transactions = [];

    return {
        deposit(amount) {
            balance += amount;
            transactions.push({ type: 'deposit', amount, balance });
            return this;
        },
        withdraw(amount) {
            if (amount > balance) throw new Error("Insufficient funds");
            balance -= amount;
            transactions.push({ type: 'withdraw', amount, balance });
            return this;
        },
        getBalance() {
            return balance;
        },
        getTransactions() {
            return [...transactions];
        }
    };
}
```

---

## 7. Currying

Converting a function with multiple arguments into a sequence of functions each taking one argument.

```javascript
// Manual currying
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return (...args2) => curried.apply(this, args.concat(args2));
    };
}

// Usage
const add = curry((a, b) => a + b);
const add10 = add(10);

add(1)(2);      // 3
add(1, 2);      // 3
add10(5);        // 15

// Practical currying
const log = curry((level, timestamp, message) => {
    console.log(`[${level}] ${timestamp}: ${message}`);
});

const errorLog = log("ERROR");
const errorLogNow = errorLog(new Date().toISOString());

errorLogNow("Disk full"); // [ERROR] 2026-07-12T...: Disk full

// Curried string operations
const replace = curry((regex, replacement, string) => {
    return string.replace(regex, replacement);
});

const replaceSpaces = replace(/\s/g);
const replaceSpacesWithDash = replaceSpaces("-");

replaceSpacesWithDash("hello world"); // "hello-world"

// Curried array operations
const map = curry((fn, arr) => arr.map(fn));
const filter = curry((fn, arr) => arr.filter(fn));
const reduce = curry((fn, init, arr) => arr.reduce(fn, init));

const double = x => x * 2;
const isEven = x => x % 2 === 0;
const sum = (a, b) => a + b;

const doubleAll = map(double);
const filterEvens = filter(isEven);

doubleAll([1, 2, 3]);       // [2, 4, 6]
filterEvens([1, 2, 3, 4]); // [2, 4]

// Pipeline
const process = pipe(
    filterEvens,
    doubleAll,
    reduce(sum, 0)
);

process([1, 2, 3, 4, 5, 6]); // 2 + 4 + 6 = 12
```

---

## 8. Partial Application

Fixing some arguments of a function, returning a new function with fewer arguments.

```javascript
// Manual partial application
function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs);
    };
}

function multiply(a, b, c) {
    return a * b * c;
}

const double = partial(multiply, 2);
const triple = partial(multiply, 3);

double(4, 5);  // 40
triple(4, 5);  // 60

// Practical partial application
function fetchJSON(url, options = {}) {
    return fetch(url, options).then(r => r.json());
}

const fetchAuth = partial(fetchJSON, '/api/data', {
    headers: { 'Authorization': 'Bearer token' }
});

fetchAuth(); // Uses preset URL and headers

// Bind as partial application
function greet(greeting, name) {
    return `${greeting}, ${name}!`;
}

const sayHello = greet.bind(null, "Hello");
sayHello("John"); // "Hello, John!"

// Partial application in pipelines
const mapWith = partial(map, partial);
const filterWith = partial(filter, partial);
```

---

## 9. Function Composition

Combining two or more functions to produce a new function.

```javascript
// compose: right to left
function compose(...fns) {
    return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

// pipe: left to right
function pipe(...fns) {
    return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

const trim = s => s.trim();
const toLowerCase = s => s.toLowerCase();
const split = (sep) => (s) => s.split(sep);
const join = (sep) => (arr) => arr.join(sep);
const mapArr = (fn) => (arr) => arr.map(fn);
const reverse = (arr) => [...arr].reverse();

// compose: right to left
const shout = compose(
    join(" "),
    reverse,
    mapArr(s => s.toUpperCase()),
    split(" ")
);

shout("hello world from javascript");
// "JAVASCRIPT FROM WORLD HELLO"

// pipe: left to right
const normalize = pipe(
    trim,
    toLowerCase,
    split(" "),
    mapArr(s => s.charAt(0).toUpperCase() + s.slice(1)),
    join(" ")
);

normalize("  hELLO wORLD  "); // "Hello World"

// Composing with multiple arguments
function composeN(...fns) {
    return (...args) => fns.reduceRight((acc, fn, i) =>
        i === fns.length - 1 ? fn(...acc) : fn(acc)
    , args);
}

// Composing validation functions
const validate = pipe(
    (data) => ({ ...data, name: data.name?.trim() }),
    (data) => ({ ...data, email: data.email?.toLowerCase() }),
    (data) => {
        if (!data.name) throw new Error("Name required");
        if (!data.email) throw new Error("Email required");
        return data;
    }
);

validate({ name: "  John  ", email: "  JOHN@EMAIL.COM  " });
// { name: "John", email: "john@email.com" }
```

---

## 10. Point-Free Style

Defining functions without mentioning their arguments.

```javascript
// Point-ful (mentions argument)
const getFullNames = (users) => users.map(u => `${u.first} ${u.last}`);

// Point-free
const getFullName = (u) => `${u.first} ${u.last}`;
const getFullNames = users => users.map(getFullName);

// Even more point-free with compose
const toUpper = s => s.toUpperCase();
const exclaim = s => s + "!";

// Point-ful
const loud = (x) => toUpper(exclaim(x));

// Point-free
const loud = compose(toUpper, exclaim);

// Practical examples
const words = s => s.split(' ');
const head = arr => arr[0];
const toUpper = s => s.toUpperCase();

const firstWordUpper = compose(toUpper, head, words);
firstWordUpper("hello world"); // "HELLO"

// With curry
const map = curry((fn, arr) => arr.map(fn));
const getLength = s => s.length;
const getLengths = map(getLength);

getLengths(["hello", "world"]); // [5, 5]

// Using flip for point-free
const flip = (fn) => (a, b) => fn(b, a);

const subtract = (a, b) => a - b;
const flipSubtract = flip(subtract);

flipSubtract(5, 3); // -2 (3 - 5)
```

---

## 11. Functor (map)

A functor is a type that implements `map` - applying a function to a wrapped value.

```javascript
// Array is a functor
[1, 2, 3].map(x => x * 2); // [2, 4, 6]

// Maybe functor
class Maybe {
    constructor(value) {
        this._value = value;
    }

    static of(value) {
        return new Maybe(value);
    }

    static empty() {
        return new Maybe(null);
    }

    isNothing() {
        return this._value === null || this._value === undefined;
    }

    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value));
    }

    getOrElse(defaultValue) {
        return this.isNothing() ? defaultValue : this._value;
    }

    toString() {
        return this.isNothing() ? 'Maybe(Nothing)' : `Maybe(${this._value})`;
    }
}

// Usage
const someValue = Maybe.of(5);
const nullValue = Maybe.of(null);

someValue.map(x => x * 2).toString();    // "Maybe(10)"
nullValue.map(x => x * 2).toString();    // "Maybe(Nothing)"

// Safe property access
const user = { name: "John", address: { city: "NYC" } };
const noUser = null;

const getCity = (u) => Maybe.of(u)
    .map(user => user.address)
    .map(addr => addr.city);

getCity(user).getOrElse("Unknown");     // "NYC"
getCity(noUser).getOrElse("Unknown");   // "Unknown"

// Either functor (left/right)
class Either {
    constructor(value) {
        this._value = value;
    }

    static left(value) {
        return new Left(value);
    }

    static right(value) {
        return new Right(value);
    }
}

class Left extends Either {
    map(fn) {
        return this;
    }

    fold(leftFn, rightFn) {
        return leftFn(this._value);
    }
}

class Right extends Either {
    map(fn) {
        return Either.right(fn(this._value));
    }

    fold(leftFn, rightFn) {
        return rightFn(this._value);
    }
}

// Usage
const validate = (x) => x > 0
    ? Either.right(x)
    : Either.left("Must be positive");

validate(5).fold(
    err => `Error: ${err}`,
    val => `Value: ${val}`
); // "Value: 5"

validate(-1).fold(
    err => `Error: ${err}`,
    val => `Value: ${val}`
); // "Error: Must be positive"
```

---

## 12. Monad (flatMap/chain)

A monad is a functor with a `flatMap` (or `chain`) method that flattens nested wrapped values.

```javascript
// The problem monads solve
const maybe = Maybe.of(5);
// maybe.map(x => Maybe.of(x * 2)) => Maybe(Maybe(10)) - nested!

// flatMap/chain flattens
class Maybe {
    // ... from Functor example

    flatMap(fn) {
        return this.isNothing() ? this : fn(this._value);
    }

    // alias
    chain(fn) {
        return this.flatMap(fn);
    }
}

// Usage
const user = { name: "John", address: { city: "NYC" } };

// With map - nested
const nested = Maybe.of(user)
    .map(u => Maybe.of(u.address))
    .map(maybeAddr => maybeAddr.map(a => a.city));
// Maybe(Maybe(Maybe("NYC"))) - ugly!

// With flatMap - clean
const clean = Maybe.of(user)
    .flatMap(u => Maybe.of(u.address))
    .flatMap(addr => Maybe.of(addr.city));
// Maybe("NYC")

// Maybe as null safety chain
const findUser = (id) => {
    const users = { 1: { name: "John", address: { city: "NYC" } } };
    return Maybe.of(users[id]);
};

const getCity = (id) =>
    findUser(id)
        .flatMap(user => Maybe.of(user.address))
        .flatMap(addr => Maybe.of(addr.city));

getCity(1).getOrElse("Unknown"); // "NYC"
getCity(99).getOrElse("Unknown"); // "Unknown"

// Promise is also a monad
fetch('/api/user')
    .then(response => response.json())  // flatMap equivalent
    .then(user => fetch(`/api/posts/${user.id}`)) // flatMap
    .then(response => response.json())
    .then(posts => console.log(posts));
```

---

## 13. Function Pipe

Applying a series of functions left to right.

```javascript
// Simple pipe
function pipe(...fns) {
    return (input) => fns.reduce((acc, fn) => fn(acc), input);
}

// With multiple arguments support
function pipe(...fns) {
    return (first, ...rest) =>
        fns.reduce((acc, fn) => fn(acc), fns[0](first, ...rest));
}

// Usage
const processUser = pipe(
    (user) => ({ ...user, name: user.name.trim() }),
    (user) => ({ ...user, name: user.name.toUpperCase() }),
    (user) => ({ ...user, email: user.email.toLowerCase() }),
    (user) => ({ ...user, initials: user.name.split(' ').map(n => n[0]).join('') })
);

processUser({
    name: "  john doe  ",
    email: "  JOHN@EMAIL.COM  "
});
// { name: "JOHN DOE", email: "john@email.com", initials: "JD" }

// Pipe for data transformation
const rawData = [
    { name: "John", age: 25, active: true },
    { name: "Jane", age: 30, active: false },
    { name: "Bob", age: 35, active: true },
    { name: "Alice", age: 28, active: true }
];

const getActiveUserNames = pipe(
    (users) => users.filter(u => u.active),
    (users) => users.map(u => u.name),
    (names) => names.sort()
);

getActiveUserNames(rawData); // ["Alice", "Bob", "John"]

// Pipe with async functions
const asyncPipe = (...fns) => async (input) => {
    let result = input;
    for (const fn of fns) {
        result = await fn(result);
    }
    return result;
};

const fetchData = asyncPipe(
    async (url) => fetch(url),
    async (response) => response.json(),
    async (data) => data.results
);
```

---

## 14. Recursion

A function calling itself.

```javascript
// Factorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

factorial(5); // 120

// Fibonacci
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

fibonacci(10); // 55

// Tree traversal
function flattenTree(node) {
    if (!node.children || node.children.length === 0) {
        return [node];
    }
    return [node, ...node.children.flatMap(flattenTree)];
}

// Deep clone
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(deepClone);
    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
    );
}

// Sum nested arrays
function sumNested(arr) {
    return arr.reduce((sum, item) =>
        sum + (Array.isArray(item) ? sumNested(item) : item)
    , 0);
}

sumNested([1, [2, 3], [4, [5, 6]]]); // 21

// Directory structure
function findFiles(dir, extension) {
    const results = [];
    for (const item of readdirSync(dir)) {
        const fullPath = join(dir, item);
        if (statSync(fullPath).isDirectory()) {
            results.push(...findFiles(fullPath, extension));
        } else if (item.endsWith(extension)) {
            results.push(fullPath);
        }
    }
    return results;
}
```

---

## 15. Tail Call Optimization

Optimizing recursive calls by making the recursive call the last operation.

```javascript
// NOT tail-recursive (must multiply after returning)
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1); // not tail call
}

// Tail-recursive (accumulator pattern)
function factorialTCO(n, acc = 1) {
    if (n <= 1) return acc;
    return factorialTCO(n - 1, n * acc); // tail call
}

factorialTCO(5); // 120

// Fibonacci tail-recursive
function fibTCO(n, a = 0, b = 1) {
    if (n === 0) return a;
    if (n === 1) return b;
    return fibTCO(n - 1, b, a + b);
}

fibTCO(10); // 55

// Generic trampoline
function trampoline(fn) {
    return function(...args) {
        let result = fn(...args);
        while (typeof result === 'function') {
            result = result();
        }
        return result;
    };
}

const factorialTramp = trampoline(function f(n, acc = 1) {
    if (n <= 1) return acc;
    return () => f(n - 1, n * acc);
});

factorialTramp(10000); // Works without stack overflow!

// Sum with trampoline
const sumTramp = trampoline(function f(arr, acc = 0) {
    if (arr.length === 0) return acc;
    const [head, ...tail] = arr;
    return () => f(tail, acc + head);
});

sumTramp(Array.from({ length: 100000 }, (_, i) => i + 1)); // 5000050000
```

---

## 16. Memoization

Caching the results of expensive function calls.

```javascript
// Basic memoization
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

// Usage
const expensiveCalc = memoize((n) => {
    console.log(`Computing ${n}...`);
    return n * n * n;
});

expensiveCalc(4); // Computing 4... - 64
expensiveCalc(4); // 64 (cached, no log)

// Memoize with Map (supports non-serializable keys)
function memoizeMap(fn) {
    const cache = new WeakMap();
    return function(...args) {
        const key = args[0]; // Use first arg as key
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// LRU Cache
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) this.cache.delete(key);
        this.cache.set(key, value);
        if (this.cache.size > this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }
    }
}

// Memoize with TTL (Time To Live)
function memoizeTTL(fn, ttl) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        const cached = cache.get(key);
        if (cached && Date.now() - cached.time < ttl) {
            return cached.value;
        }
        const result = fn.apply(this, args);
        cache.set(key, { value: result, time: Date.now() });
        return result;
    };
}

const fetchUser = memoizeTTL(fetchUserById, 60000); // Cache for 1 minute
```

---

## 17. Debouncing

Delaying function execution until after a pause in calls.

```javascript
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Usage
const search = debounce((query) => {
    console.log(`Searching: ${query}`);
    fetch(`/api/search?q=${query}`);
}, 300);

input.addEventListener('input', (e) => search(e.target.value));

// Debounce with immediate option
function debounceImmediate(fn, delay) {
    let timeoutId;
    let isFirstCall = true;
    return function(...args) {
        if (isFirstCall) {
            fn.apply(this, args);
            isFirstCall = false;
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            isFirstCall = true;
        }, delay);
    };
}

// Cancel debounce
function debounceCancelable(fn, delay) {
    let timeoutId;
    const debounced = function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
    debounced.cancel = () => clearTimeout(timeoutId);
    return debounced;
}

const searchCancelable = debounceCancelable(search, 300);
// Later:
searchCancelable.cancel();
```

---

## 18. Throttling

Limiting function execution to once per time period.

```javascript
function throttle(fn, interval) {
    let lastTime = 0;
    let timeoutId;
    return function(...args) {
        const now = Date.now();
        const remaining = interval - (now - lastTime);
        if (remaining <= 0) {
            clearTimeout(timeoutId);
            lastTime = now;
            fn.apply(this, args);
        } else {
            timeoutId = setTimeout(() => {
                lastTime = Date.now();
                fn.apply(this, args);
            }, remaining);
        }
    };
}

// Usage
const handleScroll = throttle(() => {
    console.log("Scroll position:", window.scrollY);
}, 100);

window.addEventListener('scroll', handleScroll);

// Throttle with trailing option
function throttleTrailing(fn, interval) {
    let lastTime = 0;
    let timeoutId;
    return function(...args) {
        const now = Date.now();
        const remaining = interval - (now - lastTime);
        clearTimeout(timeoutId);
        if (remaining <= 0) {
            lastTime = now;
            fn.apply(this, args);
        } else {
            timeoutId = setTimeout(() => {
                lastTime = Date.now();
                fn.apply(this, args);
            }, remaining);
        }
    };
}
```

---

## 19. Lazy Evaluation

Computing values only when needed.

```javascript
// Lazy generator
function* lazyRange(start, end) {
    for (let i = start; i < end; i++) {
        yield i;
    }
}

// Lazy map
function* lazyMap(iterable, fn) {
    for (const item of iterable) {
        yield fn(item);
    }
}

// Lazy filter
function* lazyFilter(iterable, fn) {
    for (const item of iterable) {
        if (fn(item)) yield item;
    }
}

// Lazy evaluation allows processing infinite sequences
const naturalNumbers = lazyRange(1, Infinity);
const squares = lazyMap(naturalNumbers, x => x * x);
const evens = lazyFilter(squares, x => x % 2 === 0);

// Only computes what's needed
const first5Evens = [];
for (const even of evens) {
    first5Evens.push(even);
    if (first5Evens.length === 5) break;
}
// [4, 16, 36, 64, 100]

// Lazy evaluation with closures
function lazy(fn) {
    let value;
    let computed = false;
    return () => {
        if (!computed) {
            value = fn();
            computed = true;
        }
        return value;
    };
}

const expensive = lazy(() => {
    console.log("Computing...");
    return 42;
});

expensive(); // "Computing..." - 42
expensive(); // 42 (no log)

// Lazy property access
function lazyProperty(obj, key, computeFn) {
    let value;
    let computed = false;
    Object.defineProperty(obj, key, {
        get() {
            if (!computed) {
                value = computeFn();
                computed = true;
            }
            return value;
        },
        configurable: true
    });
}

const data = {};
lazyProperty(data, 'expensiveData', () => {
    console.log("Computing...");
    return [1, 2, 3, 4, 5];
});

// Only computes when accessed
data.expensiveData; // "Computing..." - [1, 2, 3, 4, 5]
data.expensiveData; // [1, 2, 3, 4, 5]
```

---

## 20. Transducers

Composing transformations without intermediate collections.

```javascript
// Transducer is a function that takes a reducer and returns a new reducer
// They compose without creating intermediate arrays

// Map transducer
const mapTransducer = (fn) => (reducer) => (acc, val) => {
    return reducer(acc, fn(val));
};

// Filter transducer
const filterTransducer = (predicate) => (reducer) => (acc, val) => {
    return predicate(val) ? reducer(acc, val) : acc;
};

// Take transducer
const takeTransducer = (n) => (reducer) => {
    let count = 0;
    return (acc, val) => {
        if (count >= n) return acc;
        count++;
        return reducer(acc, val);
    };
};

// Compose transducers (right to left)
function compose(...fns) {
    return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

// Transduce function
function transduce(xform, reducer, initial, collection) {
    const xformReducer = xform(reducer);
    return collection.reduce(xformReducer, initial);
}

// Usage: map + filter in one pass, no intermediate arrays
const xform = compose(
    mapTransducer(x => x * 2),
    filterTransducer(x => x > 4)
);

const result = transduce(
    xform,
    (acc, val) => [...acc, val],
    [],
    [1, 2, 3, 4, 5]
);

// [6, 8, 10] - computed in a single pass

// Take only first 3
const xformWithTake = compose(
    mapTransducer(x => x * 2),
    filterTransducer(x => x > 4),
    takeTransducer(3)
);

const result2 = transduce(
    xformWithTake,
    (acc, val) => [...acc, val],
    [],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);

// [6, 8, 10] - only 3 elements
```

---

## 21. Algebraic Data Types

Composite types defined by their algebra (structure + operations).

```javascript
// Sum type (one of several types)
// Product type (combination of types)

// Option/Maybe type
class Some {
    constructor(value) {
        this.value = value;
    }
    map(fn) { return new Some(fn(this.value)); }
    flatMap(fn) { return fn(this.value); }
    getOrElse(defaultValue) { return this.value; }
    toString() { return `Some(${this.value})`; }
}

class None {
    map(fn) { return this; }
    flatMap(fn) { return this; }
    getOrElse(defaultValue) { return defaultValue; }
    toString() { return 'None'; }
}

const Option = {
    from: (value) => value != null ? new Some(value) : new None()
};

// Usage
const divide = (a, b) => b === 0 ? new None() : new Some(a / b);

divide(10, 2)
    .map(x => x * 2)
    .getOrElse(0); // 10

divide(10, 0)
    .map(x => x * 2)
    .getOrElse(0); // 0

// Either type (Left for error, Right for success)
class Left {
    constructor(value) {
        this.value = value;
    }
    map(fn) { return this; }
    flatMap(fn) { return this; }
    fold(leftFn, rightFn) { return leftFn(this.value); }
}

class Right {
    constructor(value) {
        this.value = value;
    }
    map(fn) { return new Right(fn(this.value)); }
    flatMap(fn) { return fn(this.value); }
    fold(leftFn, rightFn) { return rightFn(this.value); }
}

const Either = {
    left: (value) => new Left(value),
    right: (value) => new Right(value)
};

// Result type
const tryParse = (json) => {
    try {
        return Either.right(JSON.parse(json));
    } catch (e) {
        return Either.left(e.message);
    }
};

tryParse('{"valid": true}')
    .fold(
        err => console.error(err),
        data => console.log(data)
    ); // { valid: true }

tryParse('invalid json')
    .fold(
        err => console.error(err),
        data => console.log(data)
    ); // "Unexpected token i in JSON at position 0"
```

---

## 22. Pattern Matching

Matching values against patterns.

```javascript
// Simple pattern matching with match expression
function match(value, patterns) {
    for (const [predicate, handler] of patterns) {
        if (predicate(value)) return handler(value);
    }
    throw new Error("No match found");
}

// Usage
const describe = (x) => match(x, [
    [v => v === 0, () => "zero"],
    [v => v > 0, () => "positive"],
    [v => v < 0, () => "negative"]
]);

describe(5);  // "positive"
describe(-3); // "negative"
describe(0);  // "zero"

// Pattern matching with objects
function matchShape(obj, patterns) {
    const type = obj?.constructor?.name || typeof obj;
    for (const [pattern, handler] of patterns) {
        if (typeof pattern === 'function' && obj instanceof pattern) {
            return handler(obj);
        }
        if (typeof pattern === 'string' && type === pattern) {
            return handler(obj);
        }
    }
    throw new Error("No match");
}

// Algebraic data type pattern matching
class Success {
    constructor(value) { this.value = value; }
}
class Failure {
    constructor(error) { this.error = error; }
}

const handleResult = (result) => matchShape(result, [
    [Success, (s) => `Success: ${s.value}`],
    [Failure, (f) => `Failure: ${f.error}`]
]);

handleResult(new Success(42)); // "Success: 42"
handleResult(new Failure("error")); // "Failure: error"

// Future: TC39 Pattern Matching proposal
// if (value) {
//     case { type: 'success', data }:
//         return data;
//     case { type: 'error', message }:
//         throw new Error(message);
// }
```

---

## 23. Curry vs Uncurry

```javascript
// Curry: multi-arg to nested single-arg
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return (...args2) => curried.apply(this, args.concat(args2));
    };
}

// Uncurry: nested single-arg to multi-arg
function uncurry(fn) {
    return function(...args) {
        let result = fn;
        for (const arg of args) {
            result = result(arg);
        }
        return result;
    };
}

// Example
const curriedAdd = curry((a, b, c) => a + b + c);
curriedAdd(1)(2)(3); // 6
curriedAdd(1, 2)(3); // 6

const uncurriedAdd = uncurry(curriedAdd);
uncurriedAdd(1, 2, 3); // 6

// Auto-uncurry
function autoUncurry(fn) {
    return function(...args) {
        let result = fn;
        for (const arg of args) {
            if (typeof result === 'function') {
                result = result(arg);
            } else {
                return result;
            }
        }
        return result;
    };
}
```

---

## 24. Combinators

Functions that only use their arguments to determine the result.

```javascript
// I combinator (Identity)
const I = (x) => x;

// K combinator (Constant)
const K = (x) => (y) => x;

// S combinator (Substitution)
const S = (f) => (g) => (x) => f(x)(g(x));

// B combinator (Compose)
const B = (f) => (g) => (x) => f(g(x));

// C combinator (Flip)
const C = (f) => (a) => (b) => f(b)(a);

// W combinator (Duplicate)
const W = (f) => (x) => f(x)(x);

// Usage
K(5)(10);  // 5 (always returns first arg)

const compose = B;
const flip = C;

const add = (a) => (b) => a + b;
const double = (x) => x * 2;

const doubleAfterAdd = B(double)(add(3));
doubleAfterAdd(4); // 14 (double(add(3)(4)) = double(7) = 14)

// Practical combinators
const tap = (fn) => (x) => { fn(x); return x; };
const when = (pred) => (fn) => (x) => pred(x) ? fn(x) : x;
const unless = (pred) => when(x => !pred(x));

const log = tap(console.log);
const doublePositive = when(x => x > 0)(double);

[1, -2, 3].map(doublePositive); // [2, -2, 6]
```

---

## 25. Function Identity

The identity function returns its argument unchanged.

```javascript
const id = (x) => x;

// Properties
id(5); // 5
id("hello"); // "hello"
id([1, 2, 3]); // [1, 2, 3]

// Use as default value
const greet = (name = id("World")) => `Hello, ${name}!`;

// Use in composition (neutral element)
compose(id, f) === f; // true
compose(f, id) === f; // true

// Use in reduce as initial value
[1, 2, 3].reduce((acc, x) => acc + x, id(0)); // 6

// Monad return (of)
const Identity = {
    of: (x) => x,
    map: (fn) => (x) => fn(x),
    flatMap: (fn) => (x) => fn(x)
};

// Lens getter/setter
const lens = (getter, setter) => ({
    get: getter,
    set: setter
});

const view = (lens) => lens.get;
const set = (lens) => (value) => (obj) => lens.set(value)(obj);
const over = (lens) => (fn) => (obj) => lens.set(fn(lens.get(obj)))(obj);
```

---

## 26. Flip, Once, Negate Utilities

```javascript
// Flip: swap first two arguments
const flip = (fn) => (a, b) => fn(b, a);

const subtract = (a, b) => a - b;
const flipSubtract = flip(subtract);

subtract(5, 3);      // 2
flipSubtract(5, 3);  // -2

// Once: execute function only once
function once(fn) {
    let called = false;
    let result;
    return function(...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

const initialize = once(() => {
    console.log("Initializing...");
    return { ready: true };
});

initialize(); // "Initializing..." - { ready: true }
initialize(); // { ready: true } (no log)

// Negate: flip boolean result of predicate
const negate = (fn) => (...args) => !fn(...args);

const isEven = (n) => n % 2 === 0;
const isOdd = negate(isEven);

[1, 2, 3, 4].filter(isOdd); // [1, 3]

// Compose with negate
const filterEvens = compose(filter, negate(isEven));

// once with fallback
function onceWithFallback(fn, fallback) {
    let called = false;
    let result;
    return function(...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        } else {
            result = fallback.apply(this, args);
        }
        return result;
    };
}
```

---

## 27. Reducer Pattern

A reducer processes a collection into a single value.

```javascript
// Basic reducer
function reducer(accumulator, currentValue) {
    return accumulator + currentValue;
}

[1, 2, 3, 4].reduce(reducer, 0); // 10

// Object reducer
const transactions = [
    { type: 'income', amount: 100 },
    { type: 'expense', amount: 50 },
    { type: 'income', amount: 200 },
    { type: 'expense', amount: 30 }
];

const balance = transactions.reduce((acc, t) => {
    return {
        ...acc,
        [t.type]: acc[t.type] + t.amount
    };
}, { income: 0, expense: 0 });

// { income: 300, expense: 80 }

// State machine reducer
function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, {
                id: Date.now(),
                text: action.text,
                done: false
            }];
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id
                    ? { ...todo, done: !todo.done }
                    : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
}

// Reducer for data transformation pipeline
const pipeline = [
    (data) => data.filter(x => x.active),
    (data) => data.map(x => x.value),
    (data) => data.reduce((sum, x) => sum + x, 0)
];

const result = pipeline.reduce((data, step) => step(data), inputData);

// Reducer for DOM operations
const domOperations = [
    (el) => el.appendChild(createHeader()),
    (el) => el.appendChild(createContent()),
    (el) => el.appendChild(createFooter())
];

const container = domOperations.reduce((el, op) => {
    op(el);
    return el;
}, document.createElement('div'));
```

---

## 28. Immutable Data Structures

```javascript
// Using libraries
import { Map, List, fromJS } from 'immutable';

const state = Map({
    users: List([
        Map({ name: "John", age: 25 }),
        Map({ name: "Jane", age: 30 })
    ]),
    count: 0
});

const newState = state
    .update('count', c => c + 1)
    .update('users', users => users.push(Map({ name: "Bob", age: 35 })));

state.get('count');   // 0
newState.get('count'); // 1

// Manual immutable updates
const immutableUpdate = (obj, path, value) => {
    const [head, ...rest] = path;
    if (rest.length === 0) {
        return { ...obj, [head]: value };
    }
    return {
        ...obj,
        [head]: immutableUpdate(obj[head], rest, value)
    };
};

const state2 = { user: { address: { city: "NYC" } } };
const state3 = immutableUpdate(state2, ['user', 'address', 'city'], "Boston");

// Using produce (like Immer)
function produce(baseRecipe) {
    let state = { ...baseRecipe };
    const proxy = new Proxy(state, {
        get(target, prop) {
            return target[prop];
        },
        set(target, prop, value) {
            target = { ...target, [prop]: value };
            return true;
        }
    });
    return proxy;
}

// Immer pattern (simplified)
function produce(base, recipe) {
    const draft = JSON.parse(JSON.stringify(base));
    recipe(draft);
    return draft;
}

const newState2 = produce(
    { user: { name: "John", age: 25 } },
    (draft) => {
        draft.user.age = 26;
    }
);
```

---

## 29. FP Libraries

### Ramda

```javascript
import * as R from 'ramda';

// Auto-curried functions
R.map(x => x * 2, [1, 2, 3]); // [2, 4, 6]
R.map(x => x * 2)([1, 2, 3]); // [2, 4, 6]

// Pipe
const processUser = R.pipe(
    R.prop('name'),
    R.trim,
    R.toUpper
);

// Lens
const nameLens = R.lensProp('name');
R.view(nameLens, { name: "John" }); // "John"
R.set(nameLens, "Jane", { name: "John" }); // { name: "Jane" }

// Common utilities
R.merge({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }
R.pick(['a', 'b'], { a: 1, b: 2, c: 3 }); // { a: 1, b: 2 }
R.omit(['c'], { a: 1, b: 2, c: 3 }); // { a: 1, b: 2 }
R.path(['user', 'name'], { user: { name: "John" } }); // "John"
```

### lodash/fp

```javascript
import _ from 'lodash/fp';

// Auto-curried, data-last
_.map(x => x * 2)([1, 2, 3]); // [2, 4, 6]
_.filter(x => x > 2)([1, 2, 3, 4]); // [3, 4]

// Flow (pipe)
const process = _.flow(
    _.filter(x => x.active),
    _.map('name'),
    _.sortBy(x => x)
);
```

### fp-ts

```javascript
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';

const greeting = pipe(
    O.of("John"),
    O.map(name => `Hello, ${name}!`),
    O.getOrElse(() => "Hello, World!")
);

// Either for error handling
const parseJSON = (str) =>
    pipe(
        E.tryCatch(
            () => JSON.parse(str),
            () => "Invalid JSON"
        )
    );
```

---

## 30. OOP vs FP in JavaScript

```javascript
// OOP approach
class BankAccount {
    #balance;

    constructor(owner, balance) {
        this.owner = owner;
        this.#balance = balance;
    }

    deposit(amount) {
        this.#balance += amount;
        return this;
    }

    withdraw(amount) {
        if (amount > this.#balance) throw new Error("Insufficient funds");
        this.#balance -= amount;
        return this;
    }

    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount("John", 1000);
account.deposit(500).withdraw(200);
account.getBalance(); // 1300

// FP approach
const createAccount = (owner, balance) => ({
    owner,
    balance
});

const deposit = (amount, account) => ({
    ...account,
    balance: account.balance + amount
});

const withdraw = (amount, account) => {
    if (amount > account.balance) throw new Error("Insufficient funds");
    return { ...account, balance: account.balance - amount };
};

const account2 = createAccount("John", 1000);
const account3 = deposit(500, account2);
const account4 = withdraw(200, account3);
account4.balance; // 1300
account2.balance; // 1000 (original unchanged)
```

| Aspect | OOP | FP |
|--------|-----|-----|
| State | Mutable, encapsulated | Immutable, passed through |
| Identity | Objects have identity | Values are anonymous |
| Inheritance | Class hierarchy | Function composition |
| Side Effects | Methods modify state | Pure functions avoid effects |
| Testing | Need setup/teardown | Pure functions are easy to test |
| Concurrency | Need locks | No shared state |
| Code Style | Classes, new | Functions, composition |

---

## 31. Practical FP Patterns

```javascript
// 1. Data transformation pipeline
const users = [
    { name: "John", age: 25, active: true },
    { name: "Jane", age: 30, active: false },
    { name: "Bob", age: 35, active: true }
];

const getActiveAdultNames = pipe(
    (users) => users.filter(u => u.active),
    (users) => users.filter(u => u.age >= 30),
    (users) => users.map(u => u.name),
    (names) => names.sort()
);

// 2. Validation with Either
const validateEmail = (email) =>
    email.includes('@')
        ? Either.right(email)
        : Either.left('Invalid email');

const validateAge = (age) =>
    age >= 0 && age <= 150
        ? Either.right(age)
        : Either.left('Invalid age');

const validateUser = (user) =>
    pipe(
        validateEmail(user.email),
        (emailResult) => emailResult.fold(
            Either.left,
            () => validateAge(user.age)
        ),
        (ageResult) => ageResult.fold(
            Either.left,
            (age) => Either.right({ ...user, email: user.email.toLowerCase(), age })
        )
    );

// 3. Middleware pattern (Express-like)
const createApp = () => {
    const middlewares = [];

    return {
        use(fn) {
            middlewares.push(fn);
            return this;
        },
        async run(context) {
            let index = 0;
            const next = async () => {
                if (index < middlewares.length) {
                    await middlewares[index++](context, next);
                }
            };
            await next();
            return context;
        }
    };
};

// 4. Lens pattern for nested updates
const lensPath = (path) => ({
    get: (obj) => path.reduce((o, k) => o?.[k], obj),
    set: (val) => (obj) => {
        const result = { ...obj };
        let current = result;
        for (let i = 0; i < path.length - 1; i++) {
            current[path[i]] = { ...current[path[i]] };
            current = current[path[i]];
        }
        current[path[path.length - 1]] = val;
        return result;
    }
});

const userLens = lensPath(['user', 'name']);
const state = { user: { name: "John" } };
userLens.get(state); // "John"
userLens.set("Jane")(state); // { user: { name: "Jane" } }
```

---

## 32. Avoiding Mutation

```javascript
// Object spread (shallow)
const original = { a: 1, b: { c: 2 } };
const copy = { ...original, a: 2 };
copy.a; // 2
original.a; // 1

// Nested: manual spread
const updated = {
    ...original,
    b: { ...original.b, c: 3 }
};

// Object.assign (same as spread)
const copy2 = Object.assign({}, original);

// Array methods that return new arrays
const arr = [1, 2, 3, 4, 5];

// Mutating (avoid)
arr.push(6);
arr.pop();
arr.splice(2, 1);
arr[0] = 99;
arr.sort();
arr.reverse();

// Non-mutating (prefer)
[...arr, 6];           // push
arr.slice(0, -1);      // pop
[...arr.slice(0, 2), ...arr.slice(3)]; // splice
arr.map((x, i) => i === 0 ? 99 : x); // set by index
[...arr].sort();       // sort
[...arr].reverse();    // reverse

// ES2023+ immutable array methods
arr.toSorted();        // returns new sorted array
arr.toReversed();      // returns new reversed array
arr.toSpliced(2, 1);   // returns new spliced array
arr.with(0, 99);       // returns new array with value at index replaced

// structuredClone for deep cloning
const deep = { a: { b: { c: 1 } } };
const deepCopy = structuredClone(deep);
deepCopy.a.b.c = 2;
deep.a.b.c; // 1 (unchanged)

// JSON deep clone (with limitations)
const jsonCopy = JSON.parse(JSON.stringify(deep));
// Limitation: loses functions, undefined, Date, RegExp, etc.
```

---

## 33. Function Composition with Pipe and Compose

```javascript
// pipe: left to right
function pipe(...fns) {
    return (input) => fns.reduce((acc, fn) => fn(acc), input);
}

// compose: right to left
function compose(...fns) {
    return (input) => fns.reduceRight((acc, fn) => fn(acc), input);
}

// Async pipe
async function asyncPipe(...fns) {
    return (input) => {
        let result = input;
        for (const fn of fns) {
            result = await fn(result);
        }
        return result;
    };
}

// Compose with multiple arguments
function composeN(...fns) {
    return (...args) => {
        const [first, ...rest] = fns;
        return rest.reduce((acc, fn) => fn(acc), first(...args));
    };
}

// Compose for validation
const validateAndTransform = pipe(
    (data) => ({ ...data, name: data.name?.trim() }),
    (data) => ({ ...data, email: data.email?.toLowerCase() }),
    (data) => {
        if (!data.name) throw new Error("Name is required");
        return data;
    },
    (data) => ({ ...data, createdAt: new Date().toISOString() })
);

// Compose for data processing
const processSalesData = compose(
    (total) => total.toFixed(2),
    (arr) => arr.reduce((sum, x) => sum + x, 0),
    (items) => items.map(item => item.price * item.quantity),
    (data) => data.filter(item => item.quantity > 0)
);
```

---

## 34. Monad Patterns (Maybe, Either)

```javascript
// Maybe Monad (null safety)
class Maybe {
    constructor(value) {
        this._value = value;
    }

    static of(value) {
        return value == null ? Maybe.empty() : new Maybe(value);
    }

    static empty() {
        return new Maybe(null);
    }

    isNothing() {
        return this._value == null;
    }

    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value));
    }

    flatMap(fn) {
        return this.isNothing() ? this : fn(this._value);
    }

    getOrElse(defaultValue) {
        return this.isNothing() ? defaultValue : this._value;
    }

    orElse(fn) {
        return this.isNothing() ? fn() : this;
    }

    filter(predicate) {
        return this.flatMap(v => predicate(v) ? this : Maybe.empty());
    }

    toString() {
        return this.isNothing() ? 'Maybe(Nothing)' : `Maybe(${this._value})`;
    }
}

// Maybe in practice
const safeDivide = (a, b) => b === 0 ? Maybe.empty() : Maybe.of(a / b);
const safeParseInt = (str) => {
    const num = parseInt(str);
    return isNaN(num) ? Maybe.empty() : Maybe.of(num);
};

const result = safeParseInt("42")
    .flatMap(n => safeDivide(100, n))
    .map(x => x.toFixed(2))
    .getOrElse("Invalid");

// Either Monad (error handling)
class Left {
    constructor(value) { this._value = value; }
    map(fn) { return this; }
    flatMap(fn) { return this; }
    fold(leftFn, rightFn) { return leftFn(this._value); }
    getOrElse(defaultValue) { return defaultValue; }
    orElse(fn) { return fn(this._value); }
    toString() { return `Left(${this._value})`; }
}

class Right {
    constructor(value) { this._value = value; }
    map(fn) { return new Right(fn(this._value)); }
    flatMap(fn) { return fn(this._value); }
    fold(leftFn, rightFn) { return rightFn(this._value); }
    getOrElse(defaultValue) { return this._value; }
    orElse(fn) { return this; }
    toString() { return `Right(${this._value})`; }
}

const Either = {
    left: (v) => new Left(v),
    right: (v) => new Right(v),
    tryCatch: (fn) => {
        try { return Either.right(fn()); }
        catch (e) { return Either.left(e.message); }
    }
};

// Either in practice
const validateName = (name) =>
    name && name.length >= 2
        ? Either.right(name.trim())
        : Either.left("Name must be at least 2 characters");

const validateAge = (age) =>
    typeof age === 'number' && age >= 0 && age <= 150
        ? Either.right(age)
        : Either.left("Age must be between 0 and 150");

const createUser = (name, age) =>
    validateName(name).fold(
        Either.left,
        (validName) => validateAge(age).fold(
            Either.left,
            (validAge) => Either.right({ name: validName, age: validAge })
        )
    );

createUser("John", 25).fold(
    (err) => console.error(err),
    (user) => console.log(user)
); // { name: "John", age: 25 }

createUser("", -1).fold(
    (err) => console.error(err),
    (user) => console.log(user)
); // "Name must be at least 2 characters"
```

---

## 35. Lens Pattern for Immutable Updates

```javascript
// Lens: a pair of getter and setter functions
const lens = (getter, setter) => ({
    get: getter,
    set: setter
});

// Create lens from path
const lensProp = (key) =>
    lens(
        (obj) => obj[key],
        (val) => (obj) => ({ ...obj, [key]: val })
    );

const lensPath = (path) =>
    lens(
        (obj) => path.reduce((o, k) => o?.[k], obj),
        (val) => (obj) => {
            if (path.length === 0) return val;
            const [head, ...rest] = path;
            return {
                ...obj,
                [head]: rest.length === 0
                    ? val
                    : lensPath(rest).set(val)(obj[head] || {})
            };
        }
    );

// Operations
const view = (lens) => lens.get;
const set = (lens) => (val) => lens.set(val);
const over = (lens) => (fn) => (obj) => lens.set(fn(lens.get(obj)))(obj);

// Compose lenses
const composeLens = (outer, inner) =>
    lens(
        (obj) => inner.get(outer.get(obj)),
        (val) => (obj) => outer.set(inner.set(val)(outer.get(obj)))(obj)
    );

// Usage
const nameLens = lensProp('name');
const ageLens = lensProp('age');
const addressLens = lensProp('address');
const cityLens = lensProp('city');

const user = {
    name: "John",
    age: 25,
    address: {
        city: "NYC",
        zip: "10001"
    }
};

view(nameLens)(user); // "John"
set(nameLens)("Jane")(user); // { ...user, name: "Jane" }
over(ageLens)(x => x + 1)(user); // { ...user, age: 26 }

// Nested lens
const userCityLens = composeLens(addressLens, cityLens);
view(userCityLens)(user); // "NYC"
set(userCityLens)("Boston")(user);
// { name: "John", age: 25, address: { city: "Boston", zip: "10001" } }

// Practical: updating nested state
const state = {
    todo: {
        items: [
            { id: 1, text: "Learn FP", done: false },
            { id: 2, text: "Practice", done: false }
        ],
        filter: "all"
    },
    user: {
        name: "John",
        preferences: {
            theme: "light",
            language: "en"
        }
    }
};

const themeLens = lensPath(['user', 'preferences', 'theme']);
const newTheme = set(themeLens)("dark")(state);
// Only user.preferences.theme changes, rest is immutable

const toggleDoneLens = (id) =>
    lens(
        (state) => state.todo.items.find(i => i.id === id),
        (newItem) => (state) => ({
            ...state,
            todo: {
                ...state.todo,
                items: state.todo.items.map(i =>
                    i.id === id ? newItem : i
                )
            }
        })
    );

const toggled = over(toggleDoneLens(1))(
    item => ({ ...item, done: true })
)(state);
```

---

## Summary

| Concept | Key Takeaway |
|---------|-------------|
| Pure Functions | Same input → same output, no side effects |
| Immutability | Never modify data, create new copies |
| Higher-Order Functions | Functions as values |
| Currying | Convert multi-arg to single-arg chains |
| Composition | Combine functions to build pipelines |
| Monads | Handle null/errors elegantly with Maybe/Either |
| Transducers | Compose transformations without intermediate arrays |
| Lenses | Immutable nested state updates |
| Reducers | Process collections into single values |
| FP Libraries | Ramda, lodash/fp, fp-ts |

### When to Use FP

- Data transformation pipelines
- State management (Redux, Zustand)
- Validation and error handling
- Testing (pure functions are easy to test)
- Concurrency (no shared state)
- Composing complex operations from simple ones

### When to Mix with OOP

- UI components (class or hooks)
- Domain models with behavior
- When encapsulation is needed
- When identity matters

---

## References

- [Mostly Adequate Guide to FP](https://mostly-adequate.gitbook.io/mostly-adequate-guide/)
- [Professor Frisby's FP Course](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript)
- [Ramda Documentation](https://ramdajs.com/docs/)
- [fp-ts Documentation](https://fp-ts.github.io/docs/)
- [Immer](https://immerjs.github.io/immer/)
