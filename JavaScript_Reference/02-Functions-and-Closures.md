# JavaScript Functions and Closures - Complete Reference

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

## Table of Contents

1. [Function Declarations vs Expressions vs Arrow Functions](#1-function-declarations-vs-expressions-vs-arrow-functions)
2. [Parameters: Default, Rest, Arguments Object, Destructuring](#2-parameters-default-rest-arguments-object-destructuring)
3. [Return Values](#3-return-values)
4. [First-Class Functions](#4-first-class-functions)
5. [Higher-Order Functions](#5-higher-order-functions)
6. [Closures](#6-closures)
7. [IIFE (Immediately Invoked Function Expressions)](#7-iife-immediately-invoked-function-expressions)
8. [Recursion](#8-recursion)
9. [Generator Functions (function*)](#9-generator-functions-function)
10. [Async Functions (async/await)](#10-async-functions-asyncawait)
11. [Callback Functions and Callback Patterns](#11-callback-functions-and-callback-patterns)
12. [Partial Application and Currying](#12-partial-application-and-currying)
13. [Function Overloading Patterns](#13-function-overloading-patterns)
14. [The `this` Keyword](#14-the-this-keyword)
15. [call(), apply(), bind()](#15-call-apply-bind)
16. [Execution Context and Call Stack](#16-execution-context-and-call-stack)
17. [Scope Chain](#17-scope-chain)
18. [Variable Environment and Lexical Environment](#18-variable-environment-and-lexical-environment)
19. [Memory Management in Functions](#19-memory-management-in-functions)
20. [Function Hoisting](#20-function-hoisting)

---

## 1. Function Declarations vs Expressions vs Arrow Functions

### 1.1 Function Declaration

A function declaration defines a named function using the `function` keyword. It stands alone as a statement.

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

**Key characteristics:**
- Starts with the `function` keyword
- Must have a name
- Stands alone as a statement (not part of an assignment)
- **Fully hoisted** - can be called before its declaration in the code

```javascript
// Works! Function declarations are hoisted
console.log(add(2, 5)); // 7

function add(a, b) {
  return a + b;
}
```

**Behind the scenes**, during the creation phase of execution, JavaScript rearranges the code:

```javascript
function add(a, b) {
  return a + b;
}
console.log(add(2, 5)); // Now safe to call
```

### 1.2 Function Expression

A function expression defines a function and assigns it to a variable. The function can be named or anonymous.

```javascript
// Anonymous function expression
const multiply = function(x, y) {
  return x * y;
};

// Named function expression (useful for recursion and debugging)
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};
```

**Key characteristics:**
- Function is assigned to a variable
- Can be anonymous (no name after `function`)
- Ends with a semicolon (like any variable assignment)
- **NOT hoisted** - only the variable declaration is hoisted, not the function assignment

```javascript
// This causes an error!
console.log(greet("Alice")); // ReferenceError: Cannot access 'greet' before initialization

const greet = function(name) {
  return "Hello, " + name + "!";
};
```

### 1.3 Arrow Functions (ES6+)

Arrow functions provide a shorter syntax and lexically bind `this`.

```javascript
// Full syntax
const add = (a, b) => {
  return a + b;
};

// Concise body (implicit return for single expressions)
const add = (a, b) => a + b;

// Single parameter (parentheses optional)
const double = x => x * 2;

// No parameters (requires empty parentheses)
const sayHello = () => "Hello!";

// Returning an object literal (requires parentheses around the object)
const createPerson = (name, age) => ({ name, age });
```

**Key characteristics:**
- Shorter syntax with `=>`
- **Lexically bind `this`** - they don't have their own `this`, they inherit from the enclosing scope
- Cannot be used as constructors (no `new`)
- No `arguments` object
- No `prototype` property
- Cannot be used as generator functions

```javascript
const obj = {
  name: 'Alice',
  regular: function() {
    console.log(this.name); // 'Alice' - this refers to obj
  },
  arrow: () => {
    console.log(this.name); // undefined - this refers to outer scope
  }
};
```

### 1.4 Comparison Table

| Feature | Function Declaration | Function Expression | Arrow Function |
|---|---|---|---|
| **Syntax** | `function name() {}` | `const name = function() {}` | `const name = () => {}` |
| **Hoisting** | Fully hoisted | Not hoisted | Not hoisted |
| **`this` binding** | Dynamic (depends on call) | Dynamic (depends on call) | Lexical (enclosing scope) |
| **`arguments` object** | Yes | Yes | No |
| **Can be constructor** | Yes | Yes | No |
| **`prototype` property** | Yes | Yes | No |
| **Use case** | General-purpose functions | Callbacks, conditional functions | Callbacks, functional programming |

### 1.5 When to Use Each

**Use Function Declarations when:**
- Creating general-purpose utility functions
- You want the function available throughout the scope
- Writing helper functions that might be called anywhere

**Use Function Expressions when:**
- Passing functions as arguments (callbacks)
- Creating functions conditionally
- Working with modern JavaScript patterns
- You want to control when the function is available

**Use Arrow Functions when:**
- Writing callbacks for array methods (`map`, `filter`, `reduce`)
- You want to preserve `this` from the outer scope
- Writing short, simple functions
- Working with functional programming patterns

---

## 2. Parameters: Default, Rest, Arguments Object, Destructuring

### 2.1 Default Parameters (ES6+)

Default parameters allow named parameters to be initialized with default values if no value or `undefined` is passed.

```javascript
function multiply(a, b = 1) {
  return a * b;
}

console.log(multiply(5, 2)); // 10
console.log(multiply(5));    // 5 (b defaults to 1)
```

**Key rules:**
- Default values are evaluated at call time (not once at definition)
- Earlier parameters are available to later default parameters
- Only `undefined` triggers the default (not `null` or other falsy values)

```javascript
function greet(name = "World", greeting = `Hello ${name}`) {
  return `${greeting}, ${name}!`;
}

greet("David", "Hi");  // ["David", "Hi", "Hi David"]
greet("David");        // ["David", "Hello David", "Hello David"]
```

**Destructured parameter with default value:**

```javascript
function preFilledArray([x = 1, y = 2] = []) {
  return x + y;
}

preFilledArray();    // 3
preFilledArray([]);  // 3
preFilledArray([2]); // 4
```

### 2.2 Rest Parameters (ES6+)

Rest parameters allow a function to accept an indefinite number of arguments as an array.

```javascript
function sum(...theArgs) {
  let total = 0;
  for (const arg of theArgs) {
    total += arg;
  }
  return total;
}

console.log(sum(1, 2, 3));    // 6
console.log(sum(1, 2, 3, 4)); // 10
```

**Rules:**
- A function definition can only have **one** rest parameter
- The rest parameter **must be the last** parameter in the function definition
- Trailing commas are not allowed after the rest parameter
- Rest parameters **cannot have a default value**

```javascript
function myFun(a, b, ...manyMoreArgs) {
  console.log("a", a);
  console.log("b", b);
  console.log("manyMoreArgs", manyMoreArgs);
}

myFun("one", "two", "three", "four", "five");
// a, one
// b, two
// manyMoreArgs, ["three", "four", "five"]
```

### 2.3 The `arguments` Object

The `arguments` object is an array-like object accessible inside functions that contains the values of the arguments passed to that function.

```javascript
function func1(a, b, c) {
  console.log(arguments[0]); // 1
  console.log(arguments[1]); // 2
  console.log(arguments[2]); // 3
  console.log(arguments.length); // 3
}

func1(1, 2, 3);
```

**Key characteristics:**
- Array-like (has `length` property and indexed access) but is NOT a real array
- No array methods like `forEach()`, `map()`, etc.
- In non-strict mode with simple parameters, changing `arguments[i]` changes the parameter and vice versa
- In strict mode or with rest/default/destructured parameters, `arguments` and parameters are NOT linked

**Converting to real Array:**

```javascript
const args = Array.prototype.slice.call(arguments);
// or
const args = Array.from(arguments);
// or
const args = [...arguments];
```

**Note:** In modern code, rest parameters should be preferred over `arguments`.

### 2.4 Destructuring Parameters

Destructuring allows you to unpack values from arrays or properties from objects into distinct variables in function parameters.

```javascript
// Object destructuring in parameters
function greet({ name, age, country = "Unknown" }) {
  return `Hello ${name}, age ${age}, from ${country}`;
}

greet({ name: "John", age: 30 }); // "Hello John, age 30, from Unknown"
greet({ name: "John", age: 30, country: "USA" }); // "Hello John, age 30, from USA"

// Array destructuring in parameters
function getFirst([first, second]) {
  return first;
}

getFirst([10, 20, 30]); // 10

// Nested destructuring
function processUser({ name, address: { city, zipCode } }) {
  return `${name} lives in ${city} ${zipCode}`;
}
```

---

## 3. Return Values

Every function in JavaScript returns a value. If no explicit `return` statement is used, the function returns `undefined`.

```javascript
function noReturn() {
  let x = 5;
}
console.log(noReturn()); // undefined

function withReturn() {
  return 42;
}
console.log(withReturn()); // 42
```

**Key points:**
- `return` immediately exits the function
- A function can return any type: primitive, object, array, function, etc.
- Multiple return statements can be used for different conditions
- Arrow functions with concise body have implicit return

```javascript
// Multiple return paths
function abs(x) {
  if (x >= 0) return x;
  return -x;
}

// Implicit return (arrow functions)
const double = x => x * 2;

// Returning a function (closures)
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const triple = createMultiplier(3);
console.log(triple(5)); // 15
```

---

## 4. First-Class Functions

In JavaScript, functions are "first-class citizens" (or first-class objects). This means functions are treated like any other value in the language.

### 4.1 Capabilities of First-Class Functions

**1. Stored in variables:**

```javascript
const greet = function(name) {
  return `Hello, ${name}!`;
};

const multiply = (a, b) => a * b;

console.log(greet("Alice")); // "Hello, Alice!"
console.log(multiply(4, 5)); // 20
```

**2. Passed as arguments to other functions:**

```javascript
function doSomething(callback) {
  callback();
}

function sayHello() {
  console.log("Hello!");
}

doSomething(sayHello); // "Hello!"
```

**3. Returned as values from functions:**

```javascript
function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = createGreeter("Hello");
const sayGoodbye = createGreeter("Goodbye");

console.log(sayHello("John")); // "Hello, John!"
console.log(sayGoodbye("John")); // "Goodbye, John!"
```

**4. Assigned properties of objects (methods):**

```javascript
const calculator = {
  add: function(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};

console.log(calculator.add(5, 3)); // 8
```

**5. Stored in data structures:**

```javascript
const operations = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => a / b
];

console.log(operations[0](10, 5)); // 15
console.log(operations[2](10, 5)); // 50
```

---

## 5. Higher-Order Functions

A higher-order function is a function that either:
1. Takes one or more functions as arguments
2. Returns a new function as its result

### 5.1 Built-in Higher-Order Functions

**Array methods:**

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - transforms each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - selects elements based on condition
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce - accumulates values into single result
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// forEach - executes function for each element
numbers.forEach(n => console.log(n));

// find - returns first element matching condition
const firstEven = numbers.find(n => n % 2 === 0);
console.log(firstEven); // 2

// every - tests if all elements pass condition
const allPositive = numbers.every(n => n > 0);
console.log(allPositive); // true

// some - tests if at least one element passes condition
const hasNegative = numbers.some(n => n < 0);
console.log(hasNegative); // false

// sort - sorts elements
const unsorted = [3, 1, 4, 1, 5, 9];
const sorted = unsorted.sort((a, b) => a - b);
console.log(sorted); // [1, 1, 3, 4, 5, 9]
```

**Event listeners:**

```javascript
document.getElementById("myButton").addEventListener("click", function() {
  console.log("Button clicked!");
});
```

### 5.2 Custom Higher-Order Functions

```javascript
// Function that returns a function
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Function that takes a function as argument
function repeat(times, action) {
  for (let i = 0; i < times; i++) {
    action(i);
  }
}

repeat(3, (i) => console.log(`Iteration ${i}`));

// Function composition
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}

const add1 = x => x + 1;
const double2 = x => x * 2;
const doubleAfterAdd1 = compose(double2, add1);

console.log(doubleAfterAdd1(3)); // 8 ((3+1)*2)
```

### 5.3 Benefits

- **Abstraction**: Separate "what to do" from "how to do it"
- **Reusability**: Write generic functions, pass specific behavior
- **Readability**: Code reads at a higher level
- **Composition**: Build complex behavior from simple functions

---

## 6. Closures

### 6.1 What is a Closure?

A closure is a function that **remembers and can access variables from its outer (lexical) scope**, even after the outer function has finished executing and its execution context has been removed from the call stack.

**The Golden Rule:** A closure is a function bundled with its surrounding state (its lexical environment). Functions carry their birthplace with them.

```javascript
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log(`Outer: ${outerVariable}, Inner: ${innerVariable}`);
  };
}

const myClosure = outerFunction("outside");
myClosure("inside"); // Output: "Outer: outside, Inner: inside"

// outerFunction has finished executing, but innerFunction
// still has access to outerVariable through the closure
```

### 6.2 How Closures Work (Complete Mechanics)

**Step 1: Lexical Scope is Determined at Write Time**

```javascript
const global = 'I am global';

function outer() {
  const outerVar = 'I am outer';

  function inner() {
    const innerVar = 'I am inner';
    console.log(global);   // Accessible
    console.log(outerVar); // Accessible
    console.log(innerVar); // Accessible
  }

  inner();
}

outer();
```

**Step 2: Inner Function Creates a Closure**

When `inner()` is created inside `outer()`, it captures a reference to `outer()`'s lexical environment. This reference is the closure.

**Step 3: Outer Function Returns, Closure Persists**

```javascript
function makeCounter() {
  let count = 0;

  return function increment() {
    count++;    // increment closes over 'count'
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// makeCounter has returned, but 'count' persists via the closure
```

### 6.3 Lexical Scope vs Dynamic Scope

JavaScript uses **lexical scoping**: variable accessibility is determined by where functions are **defined** in the code, not where they are **called**.

```javascript
let x = 10;

function log() {
  console.log(x);
}

function run() {
  let x = 20;
  log(); // Outputs 10, not 20!
}

run();
```

### 6.4 Practical Uses of Closures

**1. Data Privacy / Module Pattern:**

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
account.deposit(500);    // 1500
account.withdraw(200);   // 1300
console.log(account.getBalance()); // 1300
// balance is not directly accessible - it's private!
```

**2. Function Factories:**

```javascript
function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");

sayHello("John"); // "Hello, John!"
sayHi("Jane");    // "Hi, Jane!"
```

**3. Memoization (Caching):**

```javascript
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

const expensiveCalculation = memoize(function(n) {
  console.log("Computing...");
  return n * n;
});

expensiveCalculation(4); // "Computing..." - 16
expensiveCalculation(4); // 16 (cached, no "Computing...")
```

**4. Event Handlers:**

```javascript
function setupButton(buttonId) {
  let clickCount = 0;
  const button = document.getElementById(buttonId);

  button.addEventListener("click", function() {
    clickCount++;
    console.log(`Button clicked ${clickCount} times`);
  });
}
```

**5. Iterators and Generators:**

```javascript
function createRangeIterator(start, end) {
  let current = start;

  return {
    next() {
      if (current <= end) {
        return { value: current++, done: false };
      }
      return { done: true };
    }
  };
}
```

### 6.5 The Classic Loop Closure Pitfall

```javascript
// BUG: All callbacks log 3, not 0, 1, 2
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3

// FIX 1: Use let (creates a new binding per iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2

// FIX 2: IIFE (works with var, pre-ES6 pattern)
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
// Output: 0, 1, 2
```

**Why the bug happens:** With `var`, there is only one `i` binding for the entire loop. All callbacks close over the same variable, which has the value `3` by the time they execute.

### 6.6 Memory Considerations

- Closures keep references to outer variables alive in memory
- This can prevent garbage collection of those variables
- Be mindful of what variables closures capture
- Release references when no longer needed

---

## 7. IIFE (Immediately Invoked Function Expressions)

### 7.1 What is an IIFE?

An IIFE is a function that **executes immediately after it is defined**. It combines function definition and invocation in one statement.

```javascript
(function() {
  console.log("I run immediately!");
})();
```

**How it works:**
1. The parentheses `(function() {...})` wrap the function definition, making it a function expression
2. The trailing `()` immediately invokes that function expression
3. Everything inside the IIFE stays contained within its own scope

### 7.2 Syntax Variations

```javascript
// Classic IIFE
(function() {
  console.log("Classic IIFE");
})();

// Arrow function IIFE
(() => {
  console.log("Arrow IIFE");
})();

// Using unary operator
!(function() {
  console.log("Using !");
})();

// Using void
void (function() {
  console.log("Using void");
})();

// Using + operator
+(function() {
  console.log("Using +");
})();

// IIFE with parameters and return value
const result = (function(a, b) {
  return a + b;
})(10, 20);

console.log(result); // 30

// Named IIFE (useful for recursion)
(function countDown(n) {
  if (n > 0) {
    console.log(n);
    countDown(n - 1);
  }
})(5);
```

### 7.3 Why Use IIFEs?

**1. Avoid Global Scope Pollution (Pre-ES6):**

```javascript
// Without IIFE - variable pollutes global scope
var config = { apiUrl: "https://api.example.com" };

// With IIFE - variable is contained
(function() {
  var config = { apiUrl: "https://api.example.com" };
  // config is only accessible here
})();
```

**2. Create Private Scope:**

```javascript
var counter = (function() {
  var count = 0;

  return {
    increment: function() { count++; },
    decrement: function() { count--; },
    getCount: function() { return count; }
  };
})();

counter.increment();
counter.increment();
console.log(counter.getCount()); // 2
// count is private, not accessible directly
```

**3. Module Pattern:**

```javascript
const MyApp = (function() {
  // Private namespace
  const privateStuff = {
    count: 0,
    increment() { this.count++; }
  };

  // Public API
  return {
    version: "1.0.0",
    getCount() { return privateStuff.count; },
    increment() { privateStuff.increment(); }
  };
})();
```

**4. Initialization Code:**

```javascript
(function() {
  // Setup code that runs once
  const data = fetchData();
  initializeApp(data);
})();
```

### 7.4 Modern Alternatives

- **ES6 Modules** (`import`/`export`) for code organization
- **Block scoping** (`let`/`const`) for temporary variables
- **Classes** for encapsulation

---

## 8. Recursion

### 8.1 What is Recursion?

Recursion is a programming technique where a function calls itself to solve a problem by breaking it down into smaller, simpler subproblems.

Every recursive function needs:
1. **Base case**: The condition that stops the recursion
2. **Recursive case**: The part where the function calls itself with a modified argument

```javascript
// Factorial: n! = n * (n-1)!
function factorial(n) {
  // Base case
  if (n <= 1) return 1;
  // Recursive case
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

### 8.2 How Recursion Works (Call Stack)

```javascript
function pow(x, n) {
  if (n === 1) return x;
  return x * pow(x, n - 1);
}

pow(2, 3);
// Execution flow:
// pow(2, 3) → 2 * pow(2, 2)
// pow(2, 2) → 2 * pow(2, 1)
// pow(2, 1) → 2 (base case)
// pow(2, 2) → 2 * 2 = 4
// pow(2, 3) → 2 * 4 = 8
```

**Call stack visualization:**

```
pow(2, 3)   ← pushed
pow(2, 2)   ← pushed
pow(2, 1)   ← pushed (base case hit)
pow(2, 1)   ← popped (returns 2)
pow(2, 2)   ← popped (returns 4)
pow(2, 3)   ← popped (returns 8)
```

### 8.3 Common Recursive Problems

**Fibonacci:**

```javascript
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Optimized with memoization
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 0) return 0;
  if (n === 1) return 1;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}
```

**Tree Traversal:**

```javascript
function traverseTree(node) {
  if (!node) return;
  console.log(node.value);
  traverseTree(node.left);
  traverseTree(node.right);
}
```

**Merge Sort:**

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}
```

### 8.4 Tail Call Optimization (TCO)

TCO is an optimization where if the recursive call is the **last operation** in the function, the engine can reuse the current stack frame instead of creating a new one.

```javascript
// NOT tail-recursive (multiplies AFTER the recursive call)
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1); // multiplication happens after call
}

// Tail-recursive (accumulator pattern)
function tcoFactorial(n, acc = 1) {
  if (n === 1) return acc;
  return tcoFactorial(n - 1, acc * n); // recursive call is LAST operation
}

tcoFactorial(5); // 120
```

**Status of TCO in JavaScript:**
- Required by ES6 specification
- Safari is the only browser that fully supports it
- V8 (Chrome/Node.js) does NOT implement TCO
- Use trampolining or iteration as alternatives

### 8.5 When to Use Recursion vs Iteration

**Use recursion for:**
- Tree/graph traversal
- Divide-and-conquer algorithms (merge sort, quicksort)
- Problems with naturally recursive structure (Fibonacci, factorials)
- Backtracking problems (N-Queens, maze solving)

**Use iteration for:**
- Simple loops
- Performance-critical code
- When recursion depth might be too deep

---

## 9. Generator Functions (function*)

### 9.1 What are Generator Functions?

Generator functions are special functions that can **pause execution at any point and resume later**. They are defined using the `function*` syntax and use the `yield` keyword to pause and return values.

```javascript
function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = simpleGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

### 9.2 How Generators Work

Unlike regular functions that run to completion when called, generators return a special **Generator object** that manages execution.

**Generator object has three methods:**
- `next()` - resumes execution until next `yield`
- `return()` - finishes the generator
- `throw()` - throws an error into the generator

```javascript
function* numberGenerator() {
  console.log("Starting");
  yield 1;
  console.log("After first yield");
  yield 2;
  console.log("After second yield");
  return 3;
}

const gen = numberGenerator();
gen.next(); // "Starting" → { value: 1, done: false }
gen.next(); // "After first yield" → { value: 2, done: false }
gen.next(); // "After second yield" → { value: 3, done: true }
```

### 9.3 Sending Values to Generators

You can send values back to the generator using `next(value)`:

```javascript
function* conversation() {
  const name = yield "What is your name?";
  const age = yield `Hello ${name}, how old are you?`;
  return `${name} is ${age} years old`;
}

const gen = conversation();
console.log(gen.next());          // { value: "What is your name?", done: false }
console.log(gen.next("Alice"));   // { value: "Hello Alice, how old are you?", done: false }
console.log(gen.next(25));        // { value: "Alice is 25 years old", done: true }
```

### 9.4 Ways to Define Generators

```javascript
// Function declaration
function* numberGenerator() {
  yield 1;
}

// Function expression
const wordGenerator = function*() {
  yield 'Hello';
};

// Object method
const obj = {
  *charGenerator() {
    yield 'A';
  }
};

// Class method
class GeneratorClass {
  *stringGenerator() {
    yield 'X';
  }
}
```

### 9.5 Delegation with yield*

The `yield*` expression delegates to another iterable:

```javascript
function* concatenate(iter1, iter2) {
  yield* iter1;
  yield* iter2;
}

function* numbers() {
  yield 1;
  yield 2;
}

function* letters() {
  yield 'a';
  yield 'b';
}

const combined = concatenate(numbers(), letters());
// Yields: 1, 2, 'a', 'b'
```

### 9.6 Error Handling

```javascript
function* errorHandlingGenerator() {
  try {
    yield 'Start';
    throw new Error('Something went wrong');
    yield 'This will not execute';
  } catch (err) {
    yield `Caught error: ${err.message}`;
  }
  yield 'End';
}

const gen = errorHandlingGenerator();
console.log(gen.next().value); // "Start"
console.log(gen.next().value); // "Caught error: Something went wrong"
console.log(gen.next().value); // "End"
```

### 9.7 Practical Use Cases

**1. Pagination:**

```javascript
function* paginate(items, pageSize) {
  for (let i = 0; i < items.length; i += pageSize) {
    yield items.slice(i, i + pageSize);
  }
}

const items = Array.from({length: 10}, (_, i) => i + 1);
const pages = paginate(items, 3);

for (const page of pages) {
  console.log('Page:', page);
}
// Page: [1, 2, 3]
// Page: [4, 5, 6]
// Page: [7, 8, 9]
// Page: [10]
```

**2. Infinite Sequences:**

```javascript
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
```

**3. Lazy Evaluation:**

```javascript
function* map(iterable, fn) {
  for (const item of iterable) {
    yield fn(item);
  }
}

function* filter(iterable, predicate) {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item;
    }
  }
}

// Process only what you need
const numbers = range(1, 1000000);
const result = take(
  filter(map(numbers, n => n * 2), n => n > 10),
  5
);
```

---

## 10. Async Functions (async/await)

### 10.1 The Problem: Callback Hell

Before Promises and async/await, JavaScript used callbacks for async operations:

```javascript
// Callback hell - hard to read and maintain
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      console.log(c);
    });
  });
});
```

### 10.2 Promises

A Promise is an object representing the eventual completion or failure of an asynchronous operation.

```javascript
const promise = new Promise((resolve, reject) => {
  // Do async work
  const success = true;
  if (success) {
    resolve("Data loaded!");
  } else {
    reject("Error loading data");
  }
});

promise
  .then(data => console.log(data))
  .catch(error => console.error(error))
  .finally(() => console.log("Done"));
```

**Promise states:**
- **Pending**: initial state
- **Fulfilled**: operation completed successfully
- **Rejected**: operation failed

**Promise chaining:**

```javascript
fetch('/api/user')
  .then(response => response.json())
  .then(user => fetch(`/api/posts/${user.id}`))
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```

### 10.3 Async/Await

`async/await` is syntactic sugar on top of Promises that makes asynchronous code look and feel synchronous.

```javascript
async function loadUser() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error("Failed to load user:", error);
  }
}
```

**Key points:**
- `async` keyword before `function` makes it an async function
- `await` keyword pauses execution until a Promise resolves
- `await` can only be used inside `async` functions
- `async` functions always return a Promise
- If you return a non-Promise value, it's automatically wrapped in a Promise

### 10.4 Parallel Execution

```javascript
// Sequential (slow)
async function sequential() {
  const user = await fetchUser();
  const posts = await fetchPosts();
  return { user, posts };
}

// Parallel (fast)
async function parallel() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
  return { user, posts };
}

// Promise.allSettled - waits for all, reports status
async function allSettled() {
  const results = await Promise.allSettled([
    fetchUser(),
    fetchPosts()
  ]);

  results.forEach(result => {
    if (result.status === 'fulfilled') {
      console.log(result.value);
    } else {
      console.log(result.reason);
    }
  });
}

// Promise.race - first to settle wins
async function race() {
  const result = await Promise.race([
    fetch('/api/fast'),
    fetch('/api/slow')
  ]);
  return result;
}
```

### 10.5 Error Handling Patterns

```javascript
// try/catch
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    return await response.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error; // Re-throw if needed
  }
}

// Higher-order function for retries
async function retry(fn, times) {
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === times - 1) throw err;
    }
  }
}

// Usage
const data = await retry(() => fetch('/api/data').then(r => r.json()), 3);
```

---

## 11. Callback Functions and Callback Patterns

### 11.1 What is a Callback?

A callback is a function passed as an argument to another function, which is then executed ("called back") at a later time.

```javascript
function greet(name, formatter) {
  const formatted = formatter(name);
  console.log(`Hello, ${formatted}!`);
}

function toUpper(text) {
  return text.toUpperCase();
}

greet("John", toUpper); // "Hello, JOHN!"
```

### 11.2 Synchronous vs Asynchronous Callbacks

**Synchronous callbacks** execute immediately:

```javascript
[1, 2, 3].map(function(n) {
  return n * 2;
}); // [2, 4, 6]

[1, 2, 3].forEach(function(n) {
  console.log(n);
}); // Logs 1, 2, 3 immediately
```

**Asynchronous callbacks** execute later:

```javascript
console.log("Before");

setTimeout(function() {
  console.log("Timeout"); // Executed after 1 second
}, 1000);

console.log("After");
// Output: Before, After, Timeout (after 1s)
```

### 11.3 Error-First Callback Pattern (Node.js)

In Node.js, the convention is to pass an error as the first argument and the result as the second:

```javascript
function readFile(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}

readFile('file.txt', (err, data) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("Data:", data);
});
```

### 11.4 Common Callback Patterns

**Event handlers:**

```javascript
button.addEventListener("click", function(event) {
  console.log("Button clicked!");
});

element.addEventListener("input", handleInput);
```

**Timers:**

```javascript
setTimeout(callback, 1000);
setInterval(callback, 5000);
```

**Array methods:**

```javascript
[1, 2, 3].forEach(callback);
[1, 2, 3].map(callback);
[1, 2, 3].filter(callback);
```

**HTTP requests (pre-fetch):**

```javascript
xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    callback(null, data);
  } else {
    callback(new Error("Request failed"));
  }
};
```

### 11.5 Callback Hell and Solutions

```javascript
// Callback hell
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      getYetMoreData(c, function(d) {
        console.log(d);
      });
    });
  });
});

// Solution 1: Named functions
function handleA(a) {
  getMoreData(a, handleB);
}
function handleB(b) {
  getEvenMoreData(b, handleC);
}
function handleC(c) {
  getYetMoreData(c, handleD);
}
function handleD(d) {
  console.log(d);
}
getData(handleA);

// Solution 2: Promises
getData()
  .then(getMoreData)
  .then(getEvenMoreData)
  .then(getYetMoreData)
  .then(console.log)
  .catch(handleError);

// Solution 3: Async/await
async function getDataChain() {
  const a = await getData();
  const b = await getMoreData(a);
  const c = await getEvenMoreData(b);
  const d = await getYetMoreData(c);
  console.log(d);
}
```

---

## 12. Partial Application and Currying

### 12.1 Partial Application

Partial application is a technique where a function is pre-applied with some of its parameters, returning a new function that accepts the rest.

```javascript
function buildUri(scheme, domain, path) {
  return `${scheme}://${domain}/${path}`;
}

// Partial application
const buildHttpsUri = buildUri.bind(null, 'https');

buildHttpsUri('twitter.com', 'favicon.ico');
// "https://twitter.com/favicon.ico"

buildHttpsUri('google.com', '');
// "https://google.com/"
```

**Manual partial application:**

```javascript
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function multiply(a, b, c) {
  return a * b * c;
}

const multiplyByTwo = partial(multiply, 2);
console.log(multiplyByTwo(3, 4)); // 24

const multiplyByTwoAndThree = partial(multiply, 2, 3);
console.log(multiplyByTwoAndThree(4)); // 24
```

### 12.2 Currying

Currying transforms a function with multiple arguments into a series of functions, each taking a single argument.

```javascript
// Manual currying
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6
console.log(curriedSum(1, 2, 3)); // 6
```

**Manual currying without utility:**

```javascript
function add(x) {
  return function(y) {
    return function(z) {
      return x + y + z;
    };
  };
}

add(1)(2)(3); // 6
```

### 12.3 Differences Between Currying and Partial Application

| Feature | Currying | Partial Application |
|---|---|---|
| **Transformation** | Converts single function into many unary functions | Fixes some arguments, returns new function |
| **Function Calls** | Multiple calls needed (one per argument) | Fewer calls |
| **Arity** | Always produces unary functions | Can accept multiple arguments |
| **Use Case** | Function composition, point-free style | Pre-configuring functions with default values |

### 12.4 Practical Applications

**Logging:**

```javascript
function log(level, timestamp, message) {
  console.log(`[${level}] ${timestamp}: ${message}`);
}

const curriedLog = curry(log);

const errorLog = curriedLog('ERROR');
const errorLogNow = errorLog(new Date().toISOString());

errorLogNow("Something went wrong");
```

**Event handling:**

```javascript
function addEventListener(event, element, handler) {
  element.addEventListener(event, handler);
}

const curriedAddEventListener = curry(addEventListener);
const onClick = curriedAddEventListener('click');

onClick(document.getElementById('btn'), handleClick);
```

---

## 13. Function Overloading Patterns

### 13.1 JavaScript Does NOT Support Native Overloading

Unlike languages like Java or C++, JavaScript does not support function overloading natively. If two functions share the same name, the last defined function overwrites the previous one.

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

function greet(name, age) {
  return `Hello, ${name}, age ${age}!`;
}

greet("John"); // "Hello, John, age undefined!" - second function overwrites first
```

### 13.2 Pattern 1: Checking `arguments.length`

```javascript
function greet() {
  if (arguments.length === 1) {
    return `Hello, ${arguments[0]}!`;
  } else if (arguments.length === 2) {
    return `Hello, ${arguments[0]}, age ${arguments[1]}!`;
  } else {
    return "Hello, stranger!";
  }
}

greet("John");           // "Hello, John!"
greet("John", 30);       // "Hello, John, age 30!"
```

### 13.3 Pattern 2: Using Default Parameters

```javascript
function greet(name, age) {
  if (age === undefined) {
    return `Hello, ${name}!`;
  }
  return `Hello, ${name}, age ${age}!`;
}
```

### 13.4 Pattern 3: Type Checking

```javascript
function process(input) {
  if (typeof input === 'string') {
    return input.toUpperCase();
  } else if (typeof input === 'number') {
    return input.toFixed(2);
  } else if (Array.isArray(input)) {
    return input.join(', ');
  }
}
```

### 13.5 Pattern 4: Object Parameter Pattern

```javascript
function processUser(options) {
  const { name, age, email } = options;
  // Process based on what's provided
}

processUser({ name: "John" });
processUser({ name: "John", age: 30 });
processUser({ name: "John", age: 30, email: "john@example.com" });
```

### 13.6 Pattern 5: Using a Dispatch Object

```javascript
const handlers = {
  string: (input) => input.toUpperCase(),
  number: (input) => input.toFixed(2),
  array: (input) => input.join(', ')
};

function process(input) {
  const type = Array.isArray(input) ? 'array' : typeof input;
  return handlers[type](input);
}
```

---

## 14. The `this` Keyword

### 14.1 What is `this`?

`this` is a special keyword whose value is determined at **call time** (for regular functions), not at declaration time. Its value depends on **how** the function is called.

### 14.2 The Four Binding Rules

**Rule 1: Default Binding (Global Context)**

When a function is called without any context, `this` defaults to the global object (`window` in browsers, `global` in Node.js). In strict mode, `this` is `undefined`.

```javascript
function showThis() {
  console.log(this);
}

showThis(); // window (non-strict) or undefined (strict)

'use strict';
function strictThis() {
  console.log(this); // undefined
}
strictThis();
```

**Rule 2: Implicit Binding (Method Call)**

When a function is called as a property of an object, `this` refers to the object.

```javascript
const person = {
  name: 'Alice',
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

person.greet(); // "Hello, I'm Alice" - this = person
```

**Nested objects:**

```javascript
const obj = {
  name: 'Outer',
  nested: {
    name: 'Inner',
    greet() {
      console.log(this.name); // 'Inner' - only the immediate object matters
    }
  }
};

obj.nested.greet(); // "Inner"
```

**Rule 3: Explicit Binding (call, apply, bind)**

You can explicitly set `this` using `call()`, `apply()`, or `bind()`.

```javascript
function greet() {
  console.log(`Hello, ${this.name}`);
}

const person = { name: 'Bob' };

greet.call(person);    // "Hello, Bob" - this = person
greet.apply(person);   // "Hello, Bob" - this = person
const boundGreet = greet.bind(person);
boundGreet();          // "Hello, Bob" - this = person permanently
```

**Rule 4: `new` Binding (Constructor)**

When a function is called with `new`, `this` refers to the newly created object.

```javascript
function Person(name) {
  this.name = name;
}

const alice = new Person('Alice');
console.log(alice.name); // "Alice" - this = newly created object
```

### 14.3 Binding Priority

When multiple rules apply, the priority is:

**new > explicit (bind) > implicit > default**

```javascript
function foo() {
  console.log(this.a);
}

const obj1 = { a: 1, foo };
const obj2 = { a: 2 };

obj1.foo();             // 1 (implicit)
obj1.foo.call(obj2);    // 2 (explicit overrides implicit)
new obj1.foo();         // undefined (new overrides implicit)
```

### 14.4 Arrow Functions and `this`

Arrow functions **do not have their own `this`**. They inherit `this` from the enclosing lexical scope (where they are defined, not where they are called).

```javascript
const person = {
  name: 'Charlie',
  regular: function() {
    console.log(this.name); // 'Charlie' - this = person
  },
  arrow: () => {
    console.log(this.name); // undefined - this = outer scope
  }
};

person.regular(); // 'Charlie'
person.arrow();   // undefined
```

**Practical use - preserving `this` in callbacks:**

```javascript
class Timer {
  constructor() {
    this.seconds = 0;
  }

  start() {
    // Arrow function preserves `this` from start() method
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
}

// Without arrow function, `this` would be lost in setInterval callback
```

### 14.5 Common Pitfalls

**Losing `this` in callbacks:**

```javascript
const user = {
  name: 'Alice',
  greet() {
    console.log(`Hello, ${this.name}`);
  }
};

setTimeout(user.greet, 1000); // "Hello, undefined" - this is lost!

// Fix 1: bind
setTimeout(user.greet.bind(user), 1000);

// Fix 2: arrow function wrapper
setTimeout(() => user.greet(), 1000);
```

**Arrow functions in object methods (don't do this):**

```javascript
const obj = {
  name: 'test',
  // Don't use arrow functions for object methods!
  method: () => {
    console.log(this.name); // undefined
  }
};
```

### 14.6 `this` in Different Contexts

| Context | `this` Value |
|---|---|
| Global scope | `window` (browser) / `global` (Node.js) |
| Strict mode global | `undefined` |
| Object method | The object |
| Regular function call | Global / `undefined` (strict) |
| `new` constructor | Newly created object |
| `call/apply` | First argument |
| `bind` | Bound value |
| Arrow function | Enclosing lexical scope |
| Event handler | Element that triggered the event |
| Class method | Instance of the class |
| `setTimeout` callback | Global (non-arrow) / enclosing scope (arrow) |

---

## 15. call(), apply(), bind()

### 15.1 `call()`

`call()` invokes a function immediately with a specified `this` value and arguments passed **individually**.

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'Alice' };

greet.call(person, 'Hello', '!'); // "Hello, Alice!"
```

**Syntax:**

```javascript
function.call(thisArg, arg1, arg2, ...)
```

**Use cases:**

```javascript
// Method borrowing
const numbers = [3, 1, 4, 1, 5, 9];
const max = Math.max.apply(null, numbers); // 9

// Using call on array-like objects
function slice args() {
  return Array.prototype.slice.call(args);
}

// Constructor chaining
function Animal(name) {
  this.name = name;
}

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}
```

### 15.2 `apply()`

`apply()` invokes a function immediately with a specified `this` value and arguments passed as an **array**.

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'Bob' };

greet.apply(person, ['Hi', '!!']); // "Hi, Bob!!"
```

**Syntax:**

```javascript
function.apply(thisArg, [argsArray])
```

**Use cases:**

```javascript
// Finding max in an array
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers); // 7

// Applying function to array elements
function sum(a, b, c) {
  return a + b + c;
}
const args = [1, 2, 3];
sum.apply(null, args); // 6
```

### 15.3 `bind()`

`bind()` creates a **new function** with a permanently bound `this` value. It does NOT immediately invoke the function.

```javascript
function greet() {
  return `Hello, ${this.name}`;
}

const person = { name: 'Charlie' };
const greetPerson = greet.bind(person);

greetPerson(); // "Hello, Charlie" - this is always person
```

**Syntax:**

```javascript
const newFunction = function.bind(thisArg, arg1, arg2, ...)
```

**Use cases:**

```javascript
// Fixing `this` in callbacks
class Timer {
  constructor() {
    this.seconds = 0;
    setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    this.seconds++;
    console.log(this.seconds);
  }
}

// Partial application
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2); // a is pre-set to 2
double(5); // 10
double(3); // 6
```

### 15.4 Comparison Table

| Method | Execution | Arguments | Returns | `this` |
|---|---|---|---|---|
| `call()` | Immediately | Individually | Function's return value | First argument |
| `apply()` | Immediately | Array | Function's return value | First argument |
| `bind()` | Later (returns new function) | Individually or partially | New function with bound `this` | First argument (permanent) |

### 15.5 Method Borrowing

```javascript
const person1 = {
  name: "John",
  greet: function() {
    return `Hello, I'm ${this.name}`;
  }
};

const person2 = { name: "Jane" };

// Borrow the greet method
person1.greet.call(person2);  // "Hello, I'm Jane"
person1.greet.apply(person2); // "Hello, I'm Jane"

const janeGreet = person1.greet.bind(person2);
janeGreet(); // "Hello, I'm Jane"
```

---

## 16. Execution Context and Call Stack

### 16.1 What is Execution Context?

An execution context is the environment where JavaScript code is evaluated and executed. It's a conceptual container that includes all the information needed to run a piece of code.

### 16.2 Types of Execution Context

**1. Global Execution Context:**
- Created when a script first runs
- Only one global context exists
- Creates the `window` object (browser) or `global` object (Node.js)
- Sets `this` to the global object

**2. Function Execution Context:**
- Created every time a function is called
- Can be as many as there are function calls
- Each has its own `arguments` object and `this`

**3. Eval Execution Context:**
- Created when code is executed inside `eval()`
- Generally avoided in modern JavaScript

### 16.3 Two Phases of Execution Context

**Phase 1: Creation Phase (Memory Phase)**

Before executing code, JavaScript scans the code and sets up memory:

```javascript
var x = 10;
function foo() { return 5; }

// During creation phase:
// x is hoisted and set to undefined
// foo is hoisted with its full function definition
```

**Phase 2: Execution Phase (Code Phase)**

Code is executed line by line:

```javascript
// After creation phase memory:
// x: undefined
// foo: function

// Execution phase:
// x gets assigned 10
// function calls are executed
```

### 16.4 The Call Stack

The call stack is a LIFO (Last In, First Out) data structure that tracks function calls. It maintains the order of execution of execution contexts.

```javascript
function first() {
  console.log("Starting first");
  second();
  console.log("Ending first");
}

function second() {
  console.log("Starting second");
  third();
  console.log("Ending second");
}

function third() {
  console.log("Inside third");
}

first();
```

**Call stack visualization:**

```
Step 1: Global context pushed
└─ [Global Execution Context]

Step 2: first() called, pushed
├─ [first() Execution Context]
└─ [Global Execution Context]

Step 3: second() called, pushed
├─ [second() Execution Context]
├─ [first() Execution Context]
└─ [Global Execution Context]

Step 4: third() called, pushed
├─ [third() Execution Context]
├─ [second() Execution Context]
├─ [first() Execution Context]
└─ [Global Execution Context]

Step 5: third() finishes, popped
├─ [second() Execution Context]
├─ [first() Execution Context]
└─ [Global Execution Context]

Step 6: second() finishes, popped
├─ [first() Execution Context]
└─ [Global Execution Context]

Step 7: first() finishes, popped
└─ [Global Execution Context]
```

**Output:**
```
Starting first
Starting second
Inside third
Ending second
Ending first
```

### 16.5 Stack Overflow

The call stack has a finite size. If too many function calls are pushed without popping (e.g., infinite recursion), you get a **stack overflow**:

```javascript
function infinite() {
  infinite(); // Never returns!
}

infinite(); // RangeError: Maximum call stack size exceeded
```

**Typical limits:**
- Chrome: ~10,000-15,000 frames
- Firefox: ~50,000 frames
- Node.js: ~11,000 frames

### 16.6 Stack Frame

Each element in the call stack is a "stack frame" containing:
- The function that was invoked
- Parameters passed to the function
- Local variables
- The return address

---

## 17. Scope Chain

### 17.1 What is Scope?

Scope determines where variables and functions are accessible in your code. JavaScript has three types of scope:

**1. Global Scope:**
- Variables declared outside any function or block
- Accessible everywhere
- Only one global scope per program

```javascript
var globalVar = "I'm global";

function example() {
  console.log(globalVar); // Accessible
}
```

**2. Function Scope:**
- Variables declared inside a function
- Only accessible within that function
- Each function call creates a new scope

```javascript
function example() {
  var localVar = "I'm local";
  console.log(localVar); // Accessible
}

console.log(localVar); // ReferenceError!
```

**3. Block Scope (ES6+):**
- Variables declared with `let` or `const` inside a block `{}`
- Only accessible within that block

```javascript
if (true) {
  let blockLet = "I'm block-scoped";
  const blockConst = "I'm also block-scoped";
  var notBlockScoped = "I escape the block!";
}

console.log(notBlockScoped); // Works!
// console.log(blockLet);    // ReferenceError!
// console.log(blockConst);  // ReferenceError!
```

### 17.2 Scope Chain

When a variable is accessed, JavaScript looks up the scope chain:

1. **Local scope** (current function/block)
2. **Outer function scopes** (going up the nesting)
3. **Global scope**

```javascript
var global = "global";

function outer() {
  var outerVar = "outer";

  function middle() {
    var middleVar = "middle";

    function inner() {
      var innerVar = "inner";

      // All accessible!
      console.log(innerVar);   // Found in inner scope
      console.log(middleVar);  // Found in middle scope
      console.log(outerVar);   // Found in outer scope
      console.log(global);     // Found in global scope
    }

    inner();
  }

  middle();
}

outer();
```

### 17.3 Variable Shadowing

When a variable in an inner scope has the same name as a variable in an outer scope, the inner variable "shadows" the outer one:

```javascript
var x = 10;

function outer() {
  var x = 20;

  function inner() {
    var x = 30;
    console.log(x); // 30 - inner x shadows outer x
  }

  inner();
  console.log(x); // 20 - outer x
}

outer();
console.log(x); // 10 - global x
```

### 17.4 Scope Chain and Closures

The scope chain is what makes closures possible. Each function has a reference to its outer lexical environment, creating a chain:

```javascript
function outer() {
  let count = 0;

  return function inner() {
    count++; // Accesses count through the scope chain
    return count;
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
```

---

## 18. Variable Environment and Lexical Environment

### 18.1 Variable Environment

The variable environment is where `var` declarations and function declarations are stored. It's part of the execution context.

```javascript
function example() {
  var x = 10;
  function inner() {}
}

// Variable environment of example contains:
// x: 10
// inner: function reference
```

**Key characteristics:**
- Contains `var` declarations (function-scoped)
- Contains function declarations
- Created during the creation phase
- `var` variables are initialized to `undefined` during creation

### 18.2 Lexical Environment

The lexical environment is an internal structure that stores variable declarations and has a reference to its outer lexical environment.

**Composition:**
1. **Environment Record**: Stores all local variables, functions, parameters
2. **Reference to outer lexical environment**: Points to the environment where the function was created

```javascript
function outer() {
  let a = 1;

  function inner() {
    let b = 2;
    console.log(a + b); // Accesses 'a' through outer lexical environment
  }

  inner();
}

outer();
```

**Lexical Environment Chain Visualization:**

```
Global Lexical Environment
  ├── outer() Lexical Environment
  │     ├── a: 1
  │     ├── outer ref → Global LE
  │     └── inner() Lexical Environment
  │           ├── b: 2
  │           └── inner ref → outer() LE
```

### 18.3 Lexical vs Dynamic Scope

JavaScript uses **lexical (static) scoping**: variable accessibility is determined by where functions are **defined**, not where they are **called**.

```javascript
let x = 10;

function log() {
  console.log(x);
}

function run() {
  let x = 20;
  log(); // Outputs 10, not 20!
}

run();
```

If JavaScript used dynamic scoping, `log()` would output `20` because it's called inside `run()` where `x` is `20`. But with lexical scoping, `log()` always uses the `x` from where it was **defined** (global scope).

### 18.4 How Lexical Environment Enables Closures

When a function is created, it gets a reference to its lexical environment. This reference persists even after the function returns:

```javascript
function createCounter() {
  let count = 0; // Lives in createCounter's lexical environment

  return function increment() {
    count++; // References count through lexical environment
    return count;
  };
}

const counter = createCounter();
// createCounter has returned, but increment() still has
// a reference to createCounter's lexical environment
```

### 18.5 Block Lexical Environment (let/const)

```javascript
{
  let x = 10;
  const y = 20;
  // Block creates its own lexical environment
}

// x and y are not accessible here
```

---

## 19. Memory Management in Functions

### 19.1 Memory Lifecycle

1. **Allocation**: Memory is allocated when objects are created
2. **Usage**: Read and write operations
3. **Release**: Memory is freed when no longer needed

```javascript
// Allocation
const num = 42;           // Allocates memory for number
const str = "Hello";     // Allocates memory for string
const obj = { a: 1 };    // Allocates memory for object

// Usage
console.log(str);        // Uses allocated memory

// Release (automatic in JavaScript)
num = null;              // Number memory can be freed
```

### 19.2 Stack vs Heap Memory

**Stack Memory:**
- Stores primitive values (numbers, strings, booleans, null, undefined)
- Stores references to objects
- Automatic memory management
- Fixed size

```javascript
let x = 10;          // x is on the stack
let y = x;           // y gets a copy of the value (both on stack)

x = 20;              // x changes, y remains 10
```

**Heap Memory:**
- Stores objects and functions
- Dynamic memory allocation
- Managed by garbage collector

```javascript
const obj1 = { a: 1 };   // Object on heap, reference on stack
const obj2 = obj1;        // obj2 gets reference to same object

obj2.a = 2;
console.log(obj1.a);     // 2 - both reference same object!
```

### 19.3 Garbage Collection

JavaScript uses automatic garbage collection. The main algorithm is **Mark-and-Sweep**:

1. **Mark phase**: Start from root objects (global object, current stack)
2. Mark all objects reachable from roots
3. Visit marked objects and mark their references
4. Continue until all reachable objects are visited

5. **Sweep phase**: Remove all unmarked objects

```javascript
function example() {
  let obj = { data: "large object" };
  // obj is reachable

  obj = null; // obj reference is removed
  // The object is now unreachable and will be garbage collected
}
```

### 19.4 Memory Leaks

Common causes of memory leaks:

**1. Accidental Global Variables:**

```javascript
function leak() {
  leakedVar = "I'm a global variable!"; // No var/let/const!
}
```

**2. Forgotten Timers/Callbacks:**

```javascript
function setup() {
  const data = largeData;

  setInterval(function() {
    // data is referenced and won't be garbage collected
    console.log(data);
  }, 1000);
}

// Fix: Clear the interval when done
const interval = setInterval(...);
clearInterval(interval); // Stop the reference
```

**3. Closures Holding References:**

```javascript
function createHandler() {
  const hugeData = getHugeData();

  return function handler() {
    // handler closes over hugeData
    // hugeData can't be garbage collected
    console.log("handled");
  };
}
```

**4. DOM References:**

```javascript
function addElement() {
  const element = document.createElement('div');
  document.body.appendChild(element);

  // Later, remove the element
  document.body.removeChild(element);
}
```

### 19.5 Memory Management Best Practices

```javascript
// Nullify references when done
function processData() {
  const data = loadData();
  // process data...
  return result; // Return what you need
  // data goes out of scope and can be GC'd
}

// Use WeakMap/WeakSet for object references
const cache = new WeakMap();

function process(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  const result = expensiveOperation(obj);
  cache.set(obj, result);
  return result;
}
// When obj is GC'd, the WeakMap entry is also removed

// Avoid memory leaks in event listeners
function setup() {
  const handler = () => console.log("clicked");
  button.addEventListener("click", handler);

  // Cleanup when component is destroyed
  return () => button.removeEventListener("click", handler);
}
```

### 19.6 Garbage Collection Optimizations

- **Generational collection**: Objects split into "new" and "old" groups; new objects are checked more frequently
- **Incremental collection**: Large object sets are processed in small parts
- **Idle-time collection**: GC runs only while CPU is idle

---

## 20. Function Hoisting

### 20.1 What is Hoisting?

Hoisting is JavaScript's behavior where variable and function declarations appear to be "moved" to the top of their scope during the compilation phase (before code execution).

**Important:** The code isn't actually physically moved. This happens inside the JavaScript engine during the creation phase of execution context.

### 20.2 Function Declaration Hoisting

Function declarations are **fully hoisted** - both the name and the function body are available before the declaration.

```javascript
// This works!
console.log(add(2, 5)); // 7

function add(a, b) {
  return a + b;
}
```

**Behind the scenes:**

```javascript
// Creation phase: function is fully hoisted
function add(a, b) {
  return a + b;
}

// Execution phase: code runs
console.log(add(2, 5)); // 7
```

### 20.3 Function Expression Hoisting

Function expressions are **NOT hoisted**. Only the variable declaration is hoisted, not the function assignment.

```javascript
// This causes an error!
console.log(multiply(2, 5)); // ReferenceError: Cannot access 'multiply' before initialization

const multiply = function(a, b) {
  return a * b;
};
```

**Behind the scenes:**

```javascript
// Creation phase: only variable declaration is hoisted
let multiply; // or var multiply (depends on keyword)

// Execution phase:
console.log(multiply(2, 5)); // TypeError: multiply is not a function
multiply = function(a, b) {
  return a * b;
};
```

### 20.4 Arrow Function Hoisting

Arrow functions follow the same rules as function expressions - they are **NOT hoisted**.

```javascript
// This causes an error!
const add = (a, b) => a + b;
console.log(add(2, 5)); // Works because add is defined before use

// But this doesn't work:
console.log(add(2, 5)); // ReferenceError
const add = (a, b) => a + b;
```

### 20.5 Variable Hoisting

**`var` declarations** are hoisted and initialized to `undefined`:

```javascript
console.log(x); // undefined (not an error!)
var x = 5;
console.log(x); // 5
```

**`let` and `const` declarations** are hoisted but NOT initialized (Temporal Dead Zone):

```javascript
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

### 20.6 Class Hoisting

Class declarations are hoisted but NOT initialized (like `let`/`const`):

```javascript
const instance = new MyClass(); // ReferenceError
class MyClass {}
```

### 20.7 Hoisting Order

When multiple declarations exist, the order of hoisting is:

1. Function declarations (fully hoisted)
2. `var` declarations (hoisted with `undefined`)
3. `let` and `const` declarations (hoisted but uninitialized - TDZ)
4. Class declarations (hoisted but uninitialized - TDZ)

```javascript
console.log(typeof func); // "function"
console.log(typeof varVariable); // "undefined"
// console.log(typeof letVariable); // ReferenceError

function func() {}
var varVariable = 1;
let letVariable = 2;
```

### 20.8 Named Function Expressions

Named function expressions have the name available only inside the expression itself:

```javascript
const f = function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1); // Works! Name is available inside
};

console.log(typeof factorial); // "undefined" - name not available outside
```

### 20.9 Best Practices

```javascript
// GOOD: Use function declarations for hoisting
greet(); // Works

function greet() {
  console.log("Hello!");
}

// AVOID: Calling functions before declaration with expressions
// BAD PRACTICE:
doSomething(); // Error!
const doSomething = () => console.log("something");

// BETTER: Declare before use
const doSomething = () => console.log("something");
doSomething(); // Works

// Use `const` and `let` instead of `var`
const x = 10; // Block-scoped, no TDZ confusion in practice
```

### 20.10 Hoisting Summary Table

| Declaration | Hoisted? | Initialized? | Available Before Declaration? |
|---|---|---|---|
| Function Declaration | Yes | Yes (full function) | Yes |
| Function Expression | No (only variable) | Depends on keyword | No |
| Arrow Function | No (only variable) | Depends on keyword | No |
| `var` | Yes | `undefined` | Yes (but `undefined`) |
| `let` | Yes | No (TDZ) | No (ReferenceError) |
| `const` | Yes | No (TDZ) | No (ReferenceError) |
| Class Declaration | Yes | No (TDZ) | No (ReferenceError) |

---

## Summary of Key Concepts

| Concept | Key Points |
|---|---|
| **Function Types** | Declarations (hoisted), expressions (not hoisted), arrow functions (lexical `this`) |
| **Parameters** | Default values, rest parameters, destructuring, `arguments` object |
| **First-Class Functions** | Can be assigned, passed, returned like any value |
| **Higher-Order Functions** | Take or return functions; enable abstraction and composition |
| **Closures** | Function + its lexical environment; enables data privacy, memoization, factories |
| **IIFE** | Immediately invoked; creates private scope |
| **Recursion** | Function calls itself; needs base case; watch stack overflow |
| **Generators** | `function*` with `yield`; can pause/resume execution |
| **Async/Await** | Syntactic sugar over Promises; makes async code look synchronous |
| **Callbacks** | Functions passed as arguments; error-first pattern in Node.js |
| **Currying/Partial Application** | Transform functions for better composition and reuse |
| **Function Overloading** | Not native in JS; simulate with `arguments.length` or type checking |
| **`this` Keyword** | Determined by call-site; 4 binding rules; arrow functions use lexical `this` |
| **call/apply/bind** | Control `this` explicitly; `bind` returns new function |
| **Execution Context** | Environment for code execution; creation + execution phases |
| **Call Stack** | LIFO structure tracking function calls; stack overflow if too deep |
| **Scope Chain** | Variable lookup goes from local → outer → global |
| **Lexical Environment** | Local variables + reference to outer environment; enables closures |
| **Memory Management** | Stack (primitives) vs Heap (objects); garbage collection via mark-and-sweep |
| **Hoisting** | Declarations moved to top during creation phase; behavior varies by declaration type |

[03-Objects-Prototypes-and-Classes.md](03-Objects-Prototypes-and-Classes.md)