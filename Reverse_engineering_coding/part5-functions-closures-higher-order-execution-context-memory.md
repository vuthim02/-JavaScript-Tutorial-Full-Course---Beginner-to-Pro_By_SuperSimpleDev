# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

## Part 5 — Functions, Closures, Higher-Order Functions, Execution Contexts, and Memory Internals

---

# Mission

Functions are the heart of JavaScript.

Modern JavaScript frameworks and libraries such as:

- React
- Vue.js
- Node.js
- Express

are built heavily around functions and closures.

Understanding this section deeply separates beginners from engineers.

---

# Big Picture

A function is:

- A **value** — can be stored in a variable, array, or object.
- An **object** — has properties and methods.
- **Reusable code** — defined once, called many times.
- A **first-class citizen** — can be passed as an argument, returned from a function, and assigned to a variable.
- Something that can be **stored, passed, and returned**.

```javascript
// A function is a value
const fn = function greet() { console.log("Hello"); };

// A function is an object — we can add custom properties
fn.customName = "myFunction";
fn(); // "Hello"
console.log(fn.name); // "greet" (name is read-only, set by the function declaration)
console.log(fn.customName); // "myFunction"

// A function can be stored in an array
const arr = [fn, fn, fn];

// A function can be passed
function run(f) { f(); }
run(fn);

// A function can be returned
function create() { return fn; }
const newFn = create();
newFn(); // "Hello"
```

---

# Chapter 1 — Function Declaration

## Syntax

```javascript
function greet() {
    console.log("Hello");
}
```

## Characteristics

- **Hoisted entirely** — can be called before its definition in the source code.
- Creates a named function in the current scope.
- Must have a name.

```javascript
// Works because of hoisting
sayHello();

function sayHello() {
    console.log("Hello!"); // "Hello!"
}
```

## Memory Representation

```text
Global Execution Context (Creation Phase)
┌─────────────────────────────────────────┐
│ Variable Environment:                   │
│   sayHello: <function reference>        │
│   (Function Object stored in heap)      │
└─────────────────────────────────────────┘

Heap:
┌─────────────────────────────────────────┐
│ Function Object                          │
│ ┌─────────────────────────────────────┐ │
│ │ name: "sayHello"                    │ │
│ │ length: 0 (number of parameters)    │ │
│ │ prototype: { constructor: ... }     │ │
│ │ [[Environment]]: global scope ref   │ │
│ │ [[Call]]: (internal code)           │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Properties of Function Objects

```javascript
function add(a, b) {
    return a + b;
}

console.log(add.name);       // "add"
console.log(add.length);     // 2 (number of parameters)
console.log(add.toString()); // "function add(a, b) { return a + b; }"
console.log(add.prototype);  // { constructor: add }
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Who calls this function?              | Trace call sites in the code.                       |
| What happens if nobody calls it?      | Dead code — occupies memory but never executes.     |
| What inputs does it need?             | Look at the parameter list.                         |
| Does it return something?             | Check for `return` keyword.                         |
| Is it hoisted?                        | Yes — function declarations are fully hoisted.      |
| Where is it defined?                  | Top-level or nested inside another function?        |
| What is its `name` property?          | The identifier after `function` keyword.            |
| What is its `length` property?        | The number of formal parameters.                    |

---

# Chapter 2 — Function Expression

## Syntax

```javascript
const greet = function() {
    console.log("Hello");
};

// Named function expression
const greet = function sayHello() {
    console.log("Hello");
    console.log(sayHello); // function reference available inside
};
```

## Characteristics

- **NOT hoisted as a value** — behaves like variable assignment.
- The variable is hoisted (with `var` -> `undefined`, with `let`/`const` -> TDZ), but the function is not assigned until execution reaches the line.
- Can be **anonymous** (no name) or **named** (name only visible inside function scope).
- More **flexible** — can be assigned conditionally.

### Not Hoisted

```javascript
// ReferenceError (let) or TypeError (var — undefined not callable)
greet();
const greet = function() { console.log("Hello"); };
```

```javascript
// With var — the variable is hoisted as undefined
console.log(greet); // undefined
var greet = function() { console.log("Hello"); };
```

### Named Function Expression — Why Use It?

```javascript
const factorial = function calc(n) {
    if (n <= 1) return 1;
    return n * calc(n - 1);  // use the name for recursion
};

console.log(factorial(5)); // 120
console.log(calc);         // ReferenceError — name not in outer scope
```

**Benefits:**
- Self-documenting (name appears in stack traces).
- Allows recursion even if the outer variable is reassigned.
- Name does not pollute the outer scope.

### Conditional Assignment

```javascript
let greet;
if (isMorning) {
    greet = function() { console.log("Good morning"); };
} else {
    greet = function() { console.log("Hello"); };
}
greet();
```

## Function Declaration vs Function Expression — Comparison

| Aspect                | Declaration                        | Expression                         |
|-----------------------|------------------------------------|------------------------------------|
| Hoisting              | Fully hoisted (name + body)        | Variable hoisted, function is not  |
| Must have name?       | Yes                                | No (anonymous allowed)             |
| Can be conditional?   | No (avoid in blocks)               | Yes                                |
| Stack trace name      | Declaration name                   | Variable name or expression name   |
| Use in callbacks      | Less common                        | Very common                        |
| Syntax                | `function name() {}`               | `const name = function() {}`       |

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this a declaration or expression?  | Check if `function` keyword follows `=` or `(` (assignment context) or is standalone (declaration). |
| Is hoisting involved?                 | Expression: variable hoisted, function not.         |
| Can it be called before this line?    | No (ReferenceError or TypeError).                   |
| Is it anonymous?                      | Look for a name between `function` and `()`.        |
| Why was it written as expression?     | Conditional assignment, callback, or to limit hoisting. |

---

# Chapter 3 — Arrow Functions

## Syntax Variations

```javascript
// No parameters — parentheses required
const hello = () => "Hello";

// Single parameter — parentheses optional
const square = x => x * x;

// Multiple parameters — parentheses required
const add = (a, b) => a + b;

// Block body — explicit return required
const sum = (a, b) => {
    const result = a + b;
    return result;
};

// Returning an object literal — wrap in parentheses
const createUser = (name, age) => ({ name, age });
// Without parentheses: { name, age } is parsed as a block, not an object!
```

## Arrow vs Regular Function — Key Differences

### 1. `this` Binding

Arrow functions **do not have their own `this`**. They inherit `this` from the enclosing lexical scope.

```javascript
// Regular function — gets its own `this` from how it's called
const obj1 = {
    name: "Alice",
    greet: function() {
        console.log(this.name); // "Alice" — `this` is obj1
    }
};

// Arrow function — inherits `this` from surrounding scope
const obj2 = {
    name: "Bob",
    greet: () => {
        console.log(this.name); // undefined — `this` is the outer scope (global/window)
    }
};

obj1.greet(); // "Alice"
obj2.greet(); // undefined (or "" in browser global scope)
```

### 2. No `arguments` Object

```javascript
function regular() {
    console.log(arguments); // [1, 2, 3]
}

const arrow = () => {
    console.log(arguments); // ReferenceError: arguments is not defined
};

regular(1, 2, 3);
arrow(1, 2, 3);
```

**Solution for arrows:** Use rest parameters.

```javascript
const arrow = (...args) => {
    console.log(args); // [1, 2, 3]
};
```

### 3. Cannot Be Used as Constructor

```javascript
const Person = (name) => {
    this.name = name;
};

const alice = new Person("Alice"); // TypeError: Person is not a constructor
```

Arrow functions have no `[[Construct]]` internal method, no `prototype` property.

### 4. No `prototype` Property

```javascript
function regular() {}
console.log(regular.prototype); // { constructor: regular }

const arrow = () => {};
console.log(arrow.prototype); // undefined
```

### 5. Cannot Be Used as Methods (if `this` access is needed)

```javascript
const obj = {
    value: 42,
    // Bad — `this` is not obj
    badMethod: () => {
        console.log(this.value); // undefined
    },
    // Good — `this` is obj
    goodMethod() {
        console.log(this.value); // 42
    }
};
```

## When Prefer Arrow Functions

- Short callbacks (`.map`, `.filter`, `.reduce`).
- When you need lexical `this` (e.g., inside a class method that contains a callback).
- Simple transformations that fit on one line.

```javascript
// Event listener with lexical this
class Button {
    constructor(text) {
        this.text = text;
    }

    bind() {
        // Arrow captures `this` from the class instance
        document.querySelector("button")
            .addEventListener("click", () => {
                console.log(this.text); // Correct — `this` is the instance
            });
    }
}
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is the return implicit?               | Yes, if body is a single expression without `{}`.   |
| How many parameters?                  | Check the left side of `=>`.                        |
| Is curly brace present?               | `{}` means block body — need explicit `return`.     |
| Does it use `this`?                   | If so, note it's lexical (from enclosing scope).    |
| Is it used as a constructor?          | If yes, this is a bug — arrows cannot construct.    |
| How does it access arguments?         | Must use rest parameters (`...args`).               |

---

# Chapter 4 — Functions Are First-Class Citizens

## What Does "First-Class" Mean?

In JavaScript, functions are **first-class citizens**, meaning they:

1. Can be **stored** in variables, arrays, and objects.
2. Can be **passed** as arguments to other functions.
3. Can be **returned** from other functions.
4. Can have **properties** and **methods** assigned to them.

## Stored in Variables

```javascript
const greet = function(name) {
    console.log("Hello, " + name);
};

// Reassigning
const sayHi = greet;
sayHi("Alice"); // "Hello, Alice"
```

## Stored in Arrays

```javascript
const operations = [
    x => x * 2,
    x => x + 1,
    x => x ** 2
];

let value = 5;
for (const op of operations) {
    value = op(value);
}
console.log(value); // ((5 * 2) + 1)^2 = 121
```

## Stored in Objects (Methods)

```javascript
const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    }
};

console.log(calculator.add(5, 3)); // 8
```

## Passed as Arguments (Callbacks)

```javascript
function processUser(user, callback) {
    const result = callback(user);
    console.log("Processed:", result);
}

processUser({ name: "Alice", age: 25 }, u => u.name.toUpperCase());
// "Processed: ALICE"
processUser({ name: "Alice", age: 25 }, u => u.age * 2);
// "Processed: 50"
```

## Returned from Functions (Factory Functions / Closures)

```javascript
function createMultiplier(factor) {
    return function(x) {
        return x * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15
```

## Functions with Properties

```javascript
function greet(name) {
    console.log("Hello, " + name);
    greet.callCount = (greet.callCount || 0) + 1;
}

greet("Alice"); // "Hello, Alice"
greet("Bob");   // "Hello, Bob"
console.log(greet.callCount); // 2
```

**Note:** While possible, attaching properties to functions is uncommon. Use closures or a Map instead for production code.

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is the function being called or passed? | `greet()` — called. `greet` — passed (reference). |
| Is it stored somewhere?               | Variable, array, object property?                   |
| Is it an argument to another function?| Yes — it's a callback.                              |
| Is it returned from another function? | Yes — it's a closure/factory result.                |
| What is the difference between `greet` and `greet()`? | `greet` is a reference, `greet()` calls it. |

---

# Chapter 5 — Parameters and Arguments

## Parameters Are Local Variables

Parameters are variables that receive the values passed to the function. They are scoped to the function body.

```javascript
function add(a, b) {
    // a and b are parameters — local variables
    console.log(a, b); // 5, 3
    return a + b;
}

add(5, 3); // 5 and 3 are arguments
```

## Memory During Call

```text
Execution Context for add(5, 3):
┌───────────────────────────────┐
│ Variable Environment:          │
│   a: 5  (parameter)           │
│   b: 3  (parameter)           │
│   (local variables if any)     │
└───────────────────────────────┘
```

## Fewer Arguments Than Parameters — Undefined

```javascript
function greet(name, greeting) {
    console.log(greeting + ", " + name);
}

greet("John");          // "undefined, John" — greeting is undefined
greet("John", "Hello"); // "Hello, John"
```

## More Arguments Than Parameters — Ignored (or accessed via rest)

```javascript
function log(a) {
    console.log(a);
}

log(1, 2, 3, 4); // 1 — extras are ignored
```

Use rest parameters to capture extras:

```javascript
function logAll(a, ...rest) {
    console.log(a, rest);
}
logAll(1, 2, 3, 4); // 1 [2, 3, 4]
```

## Pass by Value (Always)

```javascript
function modify(x) {
    x = 100; // reassignment — local only
}

let num = 5;
modify(num);
console.log(num); // 5 — unchanged
```

For objects — the reference value is copied:

```javascript
function modify(obj) {
    obj.value = 100; // mutation — affects original
    obj = {};        // reassignment — local only
}

const data = { value: 5 };
modify(data);
console.log(data.value); // 100 — mutation visible
console.log(Object.keys(data).length); // 1 (still has "value")
```

## Destructuring Parameters

### Object Destructuring

```javascript
function greet({ name, age }) {
    console.log(`${name} is ${age} years old`);
}

greet({ name: "Alice", age: 25 }); // "Alice is 25 years old"
```

### Array Destructuring

```javascript
function sum([a, b, c]) {
    return a + b + c;
}

console.log(sum([1, 2, 3])); // 6
```

### With Defaults and Fallback

```javascript
function configure({
    host = "localhost",
    port = 8080,
    ssl = false
} = {}) {
    console.log(`Connecting to ${host}:${port} (SSL: ${ssl})`);
}

configure({ port: 3000 });           // localhost:3000 (SSL: false)
configure();                         // localhost:8080 (SSL: false)
```

The `= {}` ensures the entire parameter defaults to an empty object if no argument is passed.

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Where do argument values come from?   | Trace call sites — literal, variable, expression.   |
| Which arguments enter the function?   | Positionally matched to parameters.                 |
| What happens when an argument is missing? | Parameter becomes `undefined`.                  |
| What if extra arguments are passed?   | Ignored (unless rest parameter `...args`).          |
| Are parameters mutated?               | Check for reassignment or property mutation.        |
| Is destructuring used?                | Check for `{}` or `[]` in the parameter list.       |
| Are default values provided?          | Check for `=` in the parameter list.                |

---

# Chapter 6 — Default Parameters

## Syntax

```javascript
function greet(name = "Guest") {
    console.log("Hello, " + name);
}

greet("John");  // "Hello, John"
greet();        // "Hello, Guest"
greet(undefined); // "Hello, Guest" — undefined triggers default
greet(null);    // "Hello, null" — null does NOT trigger default
```

## How Defaults Work Internally

Default parameters are evaluated **at call time**, not at definition time:

```javascript
function createDefault() {
    return "default value";
}

function test(value = createDefault()) {
    console.log(value);
}

test("explicit"); // "explicit"
test();           // "default value" — createDefault() called here
test();           // "default value" — called again (each call re-evaluates)
```

## Default Values Can Reference Previous Parameters

```javascript
function fullPrice(basePrice, tax = basePrice * 0.1) {
    return basePrice + tax;
}

console.log(fullPrice(100));    // 110 (tax = 10)
console.log(fullPrice(100, 20)); // 120 (tax = 20, overrides default)
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What happens when an argument is missing? | The default value is used.                      |
| When is the default evaluated?        | At call time, not at definition.                    |
| Can the default reference other parameters? | Yes — earlier parameters can be used.         |
| Does `null` trigger the default?      | No — only `undefined` (or missing argument).        |
| Does `undefined` trigger the default?  | Yes — explicitly passing `undefined` triggers it.   |

---

# Chapter 7 — Rest Parameters

## Syntax

```javascript
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

## Rest Parameters Collect All Remaining Arguments

```javascript
function log(level, ...messages) {
    console.log(`[${level}]`, ...messages);
}

log("INFO", "Server started", "on port", 3000);
// [INFO] Server started on port 3000
```

## Rest Must Be Last Parameter

```javascript
function invalid(...first, second) { } // SyntaxError

function valid(first, ...rest) { }     // OK
```

## Rest vs the `arguments` Object

```javascript
function oldWay() {
    console.log(arguments);               // array-like, NOT array
    console.log(arguments.length);        // 3
    console.log(arguments[0]);            // 1
    // arguments.map(x => x)              // TypeError — not an array!
    const args = Array.from(arguments);   // must convert
}

function newWay(...args) {
    console.log(args);                    // real array
    console.log(Array.isArray(args));     // true
    return args.reduce((a, b) => a + b);  // works directly
}

oldWay(1, 2, 3);
newWay(1, 2, 3);
```

## Rest Parameters in Arrow Functions

```javascript
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
```

Unlike `arguments`, rest parameters work in arrow functions.

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| How many arguments are expected?      | Rest parameters accept unlimited arguments.         |
| What type is the rest parameter?      | A real `Array`.                                     |
| Where is the rest parameter positioned? | Always the last parameter.                        |
| Is `arguments` also available?        | Only in regular functions — not in arrow functions. |
| Why use rest instead of `arguments`?  | Rest is a real array, works in arrows, clearer.     |

---

# Chapter 8 — Callback Functions

## What Is a Callback?

A **callback** is a function passed as an argument to another function, to be executed later (or at a specific point).

```javascript
function greet(name) {
    console.log("Hello, " + name);
}

function processUser(name, callback) {
    // Do some work...
    console.log("Processing " + name);
    // Execute the callback
    callback(name);
}

processUser("Alice", greet);
// Output:
// Processing Alice
// Hello, Alice
```

## Synchronous vs Asynchronous Callbacks

### Synchronous Callback — Executed Immediately

```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach takes a callback — called synchronously for each element
numbers.forEach(function(n) {
    console.log(n * 2); // 2, 4, 6, 8, 10 (runs before next line)
});

console.log("Done"); // runs AFTER forEach completes
```

### Asynchronous Callback — Executed Later

```javascript
console.log("Start");

setTimeout(function() {
    console.log("Timeout (2000ms later)");
}, 2000);

console.log("End");

// Output:
// Start
// End
// Timeout (2000ms later)
```

## Callback Patterns

### Error-First Callbacks (Node.js style)

```javascript
const fs = require("fs");

fs.readFile("data.txt", "utf-8", function(error, data) {
    if (error) {
        console.error("Error reading file:", error.message);
        return;
    }
    console.log("File data:", data);
});
```

**Convention:**
- First argument: `error` (null if success).
- Second argument: `data` (valid only if no error).

### Event Handlers

```javascript
document.querySelector("button")
    .addEventListener("click", function(event) {
        console.log("Button clicked!", event);
    });
```

### Array Methods

```javascript
const result = [1, 2, 3, 4, 5]
    .filter(n => n % 2 === 0)     // callback: keep evens
    .map(n => n * 10)             // callback: multiply by 10
    .reduce((sum, n) => sum + n, 0); // callback: accumulate
```

## Callback Hell (Pyramid of Doom)

```javascript
// Nested callbacks — hard to read and maintain
getUser(function(user) {
    getPosts(user.id, function(posts) {
        getComments(posts[0].id, function(comments) {
            getLikes(comments[0].id, function(likes) {
                console.log(likes);
            });
        });
    });
});
```

**Solutions:** Promises, async/await (covered in later parts).

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is the function executed immediately or later? | Synchronous: immediate. Asynchronous: queued. |
| What is the callback's purpose?       | Transform data? Handle event? Process result?       |
| What arguments does the callback receive? | Check how it's called in the host function.    |
| When is the callback called?          | After I/O? On user event? After array iteration?    |
| Is there potential for callback hell? | Nested callbacks indicate need for Promises.        |

---

# Chapter 9 — Higher-Order Functions

## Definition

A **higher-order function** is a function that does at least one of the following:

1. Takes one or more functions as **arguments**.
2. Returns a function as its **result**.

## Example: Function as Argument

```javascript
function operate(a, b, operation) {
    return operation(a, b);
}

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(operate(5, 3, add));      // 8
console.log(operate(5, 3, multiply)); // 15
```

## Example: Function as Return Value

```javascript
function createMultiplier(factor) {
    return function(x) {
        return x * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

## Common Built-in Higher-Order Functions

### Array Methods

```javascript
// All of these take callbacks (higher-order)
[1, 2, 3].map(n => n * 2);
[1, 2, 3].filter(n => n > 1);
[1, 2, 3].reduce((a, b) => a + b, 0);
[1, 2, 3].find(n => n === 2);
[1, 2, 3].some(n => n > 2);
[1, 2, 3].every(n => n > 0);
[1, 2, 3].forEach(n => console.log(n));
```

### Function Composition

```javascript
const compose = (f, g) => x => f(g(x));

const double = x => x * 2;
const square = x => x * x;

const doubleThenSquare = compose(square, double);
console.log(doubleThenSquare(3)); // (3*2)^2 = 36

const squareThenDouble = compose(double, square);
console.log(squareThenDouble(3)); // (3^2)*2 = 18
```

### Partial Application

```javascript
function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs);
    };
}

function greet(greeting, name) {
    return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, "Hello");
const sayGoodbye = partial(greet, "Goodbye");

console.log(sayHello("Alice")); // "Hello, Alice!"
console.log(sayGoodbye("Bob")); // "Goodbye, Bob!"
```

### Currying

```javascript
// Curried version — each argument returns a new function
const curriedGreet = greeting => name => `${greeting}, ${name}!`;

const sayHello = curriedGreet("Hello");
console.log(sayHello("Alice")); // "Hello, Alice!"
console.log(curriedGreet("Hi")("Bob")); // "Hi, Bob!"
```

### Debounce (Real-World Example)

```javascript
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Usage — input handler won't fire on every keystroke
const handleInput = debounce(function(event) {
    console.log("Searching:", event.target.value);
}, 300);

// Only calls the function after 300ms of no typing
inputElement.addEventListener("input", handleInput);
```

### Throttle

```javascript
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

// Usage — scroll handler fires at most once per 100ms
window.addEventListener("scroll", throttle(() => {
    console.log("Scrolled");
}, 100));
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which function is the input?          | The callback/argument function.                     |
| Which function is the output?         | The returned function.                              |
| What does the higher-order function add? | Timing control? Data transformation? Behavioral wrapping? |
| Is this an array method?              | map, filter, reduce, etc.                           |
| Is this a utility (debounce, compose)? | Often used in production codebases.               |
| What's the purpose of the wrapping?   | To extend or modify the behavior of the inner function. |

---

# Chapter 10 — Anonymous Functions

## What Is an Anonymous Function?

A function without a name.

```javascript
// Anonymous function expression
const greet = function() {
    console.log("Hello");
};

// Anonymous arrow function
const greet = () => console.log("Hello");
```

## Common Use Cases

### Callbacks

```javascript
setTimeout(function() {
    console.log("1 second passed");
}, 1000);

// Arrow version
setTimeout(() => console.log("1 second passed"), 1000);
```

### Array Methods

```javascript
const doubled = [1, 2, 3].map(function(n) { return n * 2; });
const doubledArrow = [1, 2, 3].map(n => n * 2);
```

### Event Handlers

```javascript
button.addEventListener("click", function() {
    console.log("Clicked");
});
```

### IIFE (Immediately Invoked Function Expression)

```javascript
(function() {
    console.log("IIFE runs immediately");
})();
```

## Named vs Anonymous — Stack Traces

Anonymous functions show as `<anonymous>` in stack traces, making debugging harder.

```javascript
// Hard to debug — stack trace shows "<anonymous>"
setTimeout(function() {
    throw new Error("Oops");
}, 1000);

// Better — stack trace shows "handleError"
setTimeout(function handleError() {
    throw new Error("Oops");
}, 1000);

// Arrow — stack trace shows variable name
const handleError = () => { throw new Error("Oops"); };
setTimeout(handleError, 1000);
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does this function need a name?       | If it's not reused by name, anonymous is fine.      |
| Will it be reused?                    | If yes, assign to a variable (named or variable name). |
| Is debugging important here?          | Name the function for better stack traces.          |
| Is this an IIFE?                      | Anonymous function called immediately.              |
| Is this a callback?                   | Anonymous functions are common as callbacks.        |

---

# Chapter 11 — IIFE (Immediately Invoked Function Expression)

## Syntax

```javascript
// Classic IIFE
(function() {
    console.log("Runs immediately");
})();

// With arrow
(() => {
    console.log("Runs immediately");
})();

// With parameters
(function(name) {
    console.log("Hello, " + name);
})("Alice");
```

## Why Use an IIFE?

### 1. Create Private Scope (Pre-ES6 Module Pattern)

Before `let` and `const` introduced block scope, IIFEs were the only way to create private scope:

```javascript
// Global scope pollution — bad
let privateVar = "secret";
function privateFn() { console.log(privateVar); }

// IIFE — variables are scoped to the function
(function() {
    let privateVar = "secret";
    function privateFn() {
        console.log(privateVar);
    }
    // Only explicitly exposed things are accessible
    window.publicApi = {
        doSomething: privateFn
    };
})();

console.log(privateVar); // ReferenceError (if not using var)
// Only window.publicApi.doSomething() is accessible
```

### 2. Module Pattern (Revealing Module)

```javascript
const counterModule = (function() {
    let count = 0;  // private variable

    function increment() { count++; }
    function decrement() { count--; }
    function getCount() { return count; }

    // Reveal only the public API
    return {
        increment,
        decrement,
        getCount
    };
})();

console.log(counterModule.getCount()); // 0
counterModule.increment();
counterModule.increment();
console.log(counterModule.getCount()); // 2
console.log(counterModule.count);      // undefined — private
```

### 3. Avoid Creating Global Variables

```javascript
// Without IIFE — creates a global
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i); // 5, 5, 5, 5, 5
    }, i * 100);
}

// With IIFE — each iteration gets its own scope
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j); // 0, 1, 2, 3, 4
        }, j * 100);
    })(i);
}
```

### 4. Static Initialization

```javascript
const config = (function() {
    const env = process.env.NODE_ENV || "development";
    return {
        env,
        port: env === "production" ? 80 : 3000,
        debug: env !== "production",
        apiUrl: env === "production"
            ? "https://api.example.com"
            : "http://localhost:3000/api"
    };
})();
// config is immediately initialized with the computed values
```

## Modern Alternatives to IIFE

```javascript
// Block scope with let/const (ES6)
{
    let privateVar = "secret";
    const publicApi = { doSomething() { console.log(privateVar); } };
}
// privateVar is gone, publicApi exists (if declared outside)

// ES6 modules — file-scoped by default
// file: counter.js
let count = 0; // not global — module-scoped
export function increment() { count++; }
export function getCount() { return count; }
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Why not use a normal function?        | IIFE runs immediately — no need to call separately. |
| Why execute immediately?              | To create a scope, initialize data, or avoid globals. |
| What values are returned/exposed?     | The returned object is the public API.              |
| What variables remain private?        | Variables inside the IIFE but not returned.         |
| Could modern syntax replace this?     | Block scope (`{}`) or ES6 modules.                  |

---

# Chapter 12 — Scope Chain in Depth

## Lexical Scope Review

JavaScript uses **lexical (static) scoping** — the scope of a variable is determined by where the function/variable is **defined** in the source code, not where it is called.

## The Scope Chain

When a variable is referenced, JavaScript searches:

```
Current Scope
    ↓ (not found?)
Enclosing (Parent) Scope
    ↓ (not found?)
Grandparent Scope
    ↓ (not found?)
...
Global Scope
    ↓ (not found?)
ReferenceError
```

## Visual Example

```javascript
const global = "global";

function outer() {
    const outerVar = "outer";

    function middle() {
        const middleVar = "middle";

        function inner() {
            const innerVar = "inner";
            console.log(innerVar);   // "inner" — found in current scope
            console.log(middleVar);  // "middle" — found in parent (middle) scope
            console.log(outerVar);   // "outer" — found in grandparent (outer) scope
            console.log(global);     // "global" — found in global scope
        }

        inner();
    }

    middle();
}

outer();
```

## Scope Chain Resolution

```text
inner() scope:
  innerVar: "inner"
  (searches here first)
         ↑
middle() scope:
  middleVar: "middle"
         ↑
outer() scope:
  outerVar: "outer"
         ↑
Global scope:
  global: "global"
  outer: <function>
         ↑
null (end of chain — ReferenceError if not found)
```

## Shadowing

When a variable in an inner scope has the same name as one in an outer scope:

```javascript
let x = "global";

function outer() {
    let x = "outer"; // shadows global x

    function inner() {
        let x = "inner"; // shadows outer x
        console.log(x);  // "inner"
    }

    inner();
    console.log(x); // "outer"
}

outer();
console.log(x); // "global"
```

The inner scope's `x` "shadows" (hides) the outer one. There is no way to access the outer `x` from within `inner()` (unlike some languages with `super` or `global` keywords).

## Scope Chain and Closures

The scope chain is captured at function definition time. This is what makes closures work:

```javascript
function createCounter() {
    let count = 0;  // in createCounter's scope

    return function() {
        count++;    // count is found in the parent scope via the chain
        return count;
    };
}

const counter = createCounter();
// counter's scope chain:
//   anonymous function scope → createCounter scope (count is here) → global
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Where is this variable defined?       | Walk up the scope chain from the current scope.     |
| Is it local?                          | Check the current function/block scope.             |
| Is it in a parent scope?              | Check each enclosing scope outward.                 |
| Is it in the global scope?            | If not found in any nested scope, check global.     |
| Is it shadowing?                      | An inner scope variable with the same name as an outer one. |
| Can I access the shadowed variable?   | No — the inner name takes precedence.               |
| What is the full scope chain?         | Walk from current to global for any variable reference. |

---

# Chapter 13 — Closures (Expanded)

## The Core Definition

A **closure** is a function that "remembers" its lexical environment even after the outer function has returned. The function **closes over** the variables it references from its outer scope.

```javascript
function createGreeter(greeting) {
    // greeting is a parameter — local to createGreeter
    return function(name) {
        console.log(`${greeting}, ${name}!`);
        // greeting is referenced here — creates a closure
    };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");

sayHello("Alice"); // "Hello, Alice!"
sayHi("Bob");      // "Hi, Bob!"

// createGreeter has already returned, but greeting still exists
// because the returned functions hold a reference to it.
```

## How Closures Work Internally

```javascript
function outer() {
    let x = 10;
    function inner() {
        console.log(x);
    }
    return inner;
}

const fn = outer();
fn(); // 10
```

**Memory after `outer()` returns:**

```text
Call Stack:                 Heap:
┌─────────────────────┐    ┌──────────────────────────────┐
│ Global Context      │    │ fn (function object)          │
│   fn: reference ────┼───→│  [[Environment]]: reference ──┼──┐
└─────────────────────┘    │  name: "inner"               │  │
                           └──────────────────────────────┘  │
                                                             │
                           ┌──────────────────────────────┐  │
                           │ outer() Lexical Environment   │←─┘
                           │  x: 10 (still alive!)        │
                           └──────────────────────────────┘
```

The `[[Environment]]` internal slot of the function keeps a reference to the lexical environment where it was created. As long as the function exists, that environment (including `x`) cannot be garbage collected.

## Production Closure Patterns

### Pattern 1: Data Privacy (Module)

```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance; // PRIVATE — cannot be accessed from outside

    return {
        deposit(amount) {
            if (amount <= 0) throw new Error("Invalid amount");
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
account.deposit(500);      // 1500
account.withdraw(200);     // 1300
console.log(account.balance); // undefined — PRIVATE
console.log(account.getBalance()); // 1300 — controlled access
```

**Key insight:** There is absolutely no way to access or modify `balance` except through the returned methods. This is true encapsulation.

### Pattern 2: Function Factory

```javascript
function createGreeter(language) {
    const greetings = {
        en: "Hello",
        es: "Hola",
        fr: "Bonjour",
        de: "Hallo",
        ja: "こんにちは"
    };

    return function(name) {
        const greeting = greetings[language] || greetings.en;
        console.log(`${greeting}, ${name}!`);
    };
}

const greetEn = createGreeter("en");
const greetEs = createGreeter("es");
const greetJa = createGreeter("ja");

greetEn("Alice"); // "Hello, Alice!"
greetEs("Bob");   // "Hola, Bob!"
greetJa("Charlie"); // "こんにちは, Charlie!"
```

### Pattern 3: Memoization (Caching)

```javascript
function createMemoizedFunction(fn) {
    const cache = new Map();

    return function(arg) {
        if (cache.has(arg)) {
            console.log("Cache hit for", arg);
            return cache.get(arg);
        }

        console.log("Computing for", arg);
        const result = fn(arg);
        cache.set(arg, result);
        return result;
    };
}

const slowFibonacci = n => {
    if (n <= 1) return n;
    return slowFibonacci(n - 1) + slowFibonacci(n - 2);
};

const memoizedFib = createMemoizedFunction(slowFibonacci);

console.log(memoizedFib(40)); // Computes, then caches
console.log(memoizedFib(40)); // Cache hit — instant
console.log(memoizedFib(41)); // Partially computed from cache
```

### Pattern 4: Event Handlers with State

```javascript
function createClickCounter(button) {
    let count = 0;

    button.addEventListener("click", function() {
        count++;
        button.textContent = `Clicked ${count} times`;
    });
}

// Each button gets its own independent count
createClickCounter(document.getElementById("btn1"));
createClickCounter(document.getElementById("btn2"));
```

### Pattern 5: Iterators

```javascript
function createRangeIterator(start, end) {
    let current = start;

    return {
        next() {
            if (current > end) {
                return { done: true, value: undefined };
            }
            return { done: false, value: current++ };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const range = createRangeIterator(1, 5);
console.log(range.next()); // { done: false, value: 1 }
console.log(range.next()); // { done: false, value: 2 }
// ... up to 5, then { done: true }
```

### Pattern 6: Partial Application (Pre-filling Arguments)

```javascript
function multiply(a, b) {
    return a * b;
}

function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs);
    };
}

const double = partial(multiply, 2);
const triple = partial(multiply, 3);
const quadruple = partial(multiply, 4);

console.log(double(5));  // 10
console.log(triple(5));  // 15
console.log(quadruple(5)); // 20
```

## Closure Memory Leaks

Closures keep variables alive. This is intentional, but can cause leaks if not managed.

### Bad: Accidental Retention of Large Data

```javascript
function createProcessor(data) {
    // data is a huge array
    return {
        getDataLength() {
            return data.length;     // closure retains the ENTIRE data array
        },
        processItem(index) {
            return data[index];     // still retains everything
        }
        // Even if you only need a small part, the whole data is kept
    };
}

const hugeData = new Array(10000000).fill("data");
const processor = createProcessor(hugeData);
// hugeData is retained in memory as long as processor exists!
```

**Fix:** Extract only what's needed before creating the closure.

```javascript
function createProcessor(data) {
    const length = data.length;     // extract only what's needed
    return {
        getDataLength() {
            return length;
        },
        processItem(index) {
            return data[index];     // still retains data — be careful
        }
    };
}
```

### Bad: Closures in Loops (Classic Problem)

```javascript
// Problem
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i); // 5, 5, 5, 5, 5
    }, i * 100);
}

// Fix with IIFE (pre-ES6)
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j); // 0, 1, 2, 3, 4
        }, j * 100);
    })(i);
}

// Fix with let (ES6)
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i); // 0, 1, 2, 3, 4
    }, i * 100);
}
```

### Freeing Closure Memory

```javascript
const counter = createCounter();
// ... use counter ...
counter = null; // Now the closure's environment can be garbage collected
```

## Reverse Engineering Questions

| Question                                | Answer                                              |
|-----------------------------------------|-----------------------------------------------------|
| Why wasn't the variable destroyed?      | Because a function still references it (closure).   |
| Which function holds the reference?     | The inner function that was returned or passed.     |
| What memory remains alive?              | The entire lexical environment chain that's referenced. |
| How long does it live?                  | As long as the closure function exists.             |
| Can I access the closed-over variable?  | Only through the exposed methods.                   |
| Is this intentional or a memory leak?   | Intentional: data privacy, caching, state. Leak: forgotten references. |
| What is captured by reference?          | Objects are captured by reference — mutation visible to all closures. |

---

# Chapter 14 — Factory Functions

## What Is a Factory Function?

A **factory function** is a function that returns a new object. It's a pattern for creating objects without using `class` or `new`.

```javascript
function createPerson(name, age) {
    return {
        name,
        age,
        greet() {
            console.log(`Hello, I'm ${this.name}`);
        },
        birthday() {
            this.age++;
        }
    };
}

const alice = createPerson("Alice", 25);
const bob = createPerson("Bob", 30);

alice.greet();  // "Hello, I'm Alice"
bob.greet();    // "Hello, I'm Bob"
alice.birthday();
console.log(alice.age); // 26
```

## Factory vs Constructor

```javascript
// Constructor (with new)
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function() {
        console.log(`Hello, I'm ${this.name}`);
    };
}
const alice = new Person("Alice", 25);

// Factory
function createPerson(name, age) {
    return {
        name,
        age,
        greet() {
            console.log(`Hello, I'm ${this.name}`);
        }
    };
}
const bob = createPerson("Bob", 30);
```

| Aspect                  | Factory                              | Constructor                    |
|-------------------------|--------------------------------------|--------------------------------|
| `new` required?         | No — just call the function          | Yes — forgot `new` causes bugs |
| `this` binding          | Not used (lexical)                   | `this` refers to new instance  |
| Return value            | Object explicitly                    | Implicitly `this`              |
| Prototype inheritance   | Manual (`Object.create`) or direct   | Automatic via `prototype`      |

## Factory with Private Variables (Closure)

```javascript
function createCounter(name) {
    let count = 0;  // private

    return {
        increment() {
            count++;
            console.log(`${name}: ${count}`);
        },
        decrement() {
            count--;
            console.log(`${name}: ${count}`);
        },
        getCount() {
            return count;
        },
        reset() {
            count = 0;
        }
    };
}

const c1 = createCounter("Counter A");
const c2 = createCounter("Counter B");

c1.increment(); // "Counter A: 1"
c1.increment(); // "Counter A: 2"
c2.increment(); // "Counter B: 1"
console.log(c1.getCount()); // 2
console.log(c1.count);     // undefined — private
```

## Factory with Composition (Mixins)

Instead of inheritance, factories can compose behaviors:

```javascript
const canEat = {
    eat() { console.log(`${this.name} is eating`); }
};

const canSleep = {
    sleep() { console.log(`${this.name} is sleeping`); }
};

const canPlay = {
    play() { console.log(`${this.name} is playing`); }
};

function createPet(name) {
    return {
        name,
        ...canEat,
        ...canSleep,
        ...canPlay
    };
}

const pet = createPet("Rex");
pet.eat();   // "Rex is eating"
pet.sleep(); // "Rex is sleeping"
pet.play();  // "Rex is playing"
```

## Factory with Validation

```javascript
function createUser(data) {
    if (!data.name || typeof data.name !== "string") {
        throw new Error("Invalid name");
    }
    if (data.age !== undefined && (typeof data.age !== "number" || data.age < 0)) {
        throw new Error("Invalid age");
    }

    return {
        name: data.name,
        age: data.age ?? null,
        createdAt: new Date(),
        isActive: true,

        disable() {
            this.isActive = false;
        }
    };
}
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Why repeatedly write object literals? | Factory automates object creation.                  |
| Can object creation be automated?     | Yes — that's the point of factories.                |
| What is the shape of created objects? | The returned object literal defines the shape.      |
| Are there private variables?          | Check for variables declared in the factory body not returned. |
| Is composition used?                  | Check for spread of behavior objects.               |
| Is validation included?               | Check for checks before the return statement.       |

---

# Chapter 15 — Recursion Internals

## Review of Recursion

A function that calls itself.

```javascript
function countdown(n) {
    if (n === 0) {        // base case
        console.log("Done");
        return;
    }
    console.log(n);        // 3, 2, 1
    countdown(n - 1);     // recursive call
}

countdown(3);
```

## Call Stack Visualization

### Building Up (Calls)

```text
countdown(3) called
  → countdown(2) called
      → countdown(1) called
          → countdown(0) called (base case — no more recursion)
```

```text
Stack during execution (deepest point):

┌─────────────────────┐
│ countdown(0)        │  ← top (currently executing)
├─────────────────────┤
│ countdown(1)        │
├─────────────────────┤
│ countdown(2)        │
├─────────────────────┤
│ countdown(3)        │
├─────────────────────┤
│ Global Context       │
└─────────────────────┘
Maximum depth: 4 frames
```

### Unwinding (Returns)

```text
countdown(0) returns (base case)
  → countdown(1) returns
      → countdown(2) returns
          → countdown(3) returns
```

## Recursive Factorial — Step by Step

```javascript
function factorial(n) {
    if (n <= 1) return 1;       // base case
    return n * factorial(n - 1); // recursive case
}

console.log(factorial(4)); // 24
```

### Calculation Steps

```text
factorial(4):
  → 4 * factorial(3)
      → 3 * factorial(2)
          → 2 * factorial(1)
              → return 1 (base case)
          → return 2 * 1 = 2
      → return 3 * 2 = 6
  → return 4 * 6 = 24
```

### Stack Frames

Each frame holds:
- The parameter `n` (value varies per frame).
- The return address (where to continue after the recursive call returns).
- The local variables.

```text
factorial(4) — n=4, waiting for factorial(3) to return
factorial(3) — n=3, waiting for factorial(2) to return
factorial(2) — n=2, waiting for factorial(1) to return
factorial(1) — n=1, returns 1 immediately
```

## Recursive Fibonacci — The Call Tree

```javascript
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
```

### Call Tree for `fib(4)`

```text
                 fib(4)
                /      \
          fib(3)        fib(2)
          /    \        /    \
     fib(2)   fib(1) fib(1) fib(0)
     /    \
 fib(1) fib(0)
```

**Problem:** `fib(2)` is computed three times! This is why naive recursion is exponential (O(2^n)) for Fibonacci.

## Tail Recursion

A recursive call is **tail-recursive** if it is the **last operation** in the function, and its result is returned directly without further computation.

```javascript
// NOT tail-recursive — multiplication happens AFTER the recursive call
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // pending multiplication
}

// Tail-recursive — accumulator carries the result forward
function factorialTail(n, acc = 1) {
    if (n <= 1) return acc;
    return factorialTail(n - 1, n * acc); // no pending operation
}
```

**Tail Call Optimization (TCO):** Some engines can reuse the current stack frame for tail calls, preventing stack growth. However, V8 (Chrome, Node.js) does NOT implement TCO for performance and debugging reasons.

## Converting Recursion to Iteration

Every recursive function can be rewritten iteratively:

```javascript
// Recursive
function factorialR(n) {
    if (n <= 1) return 1;
    return n * factorialR(n - 1);
}

// Iterative
function factorialI(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Iterative with manual stack (for tree traversal)
function traverseTree(root) {
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        console.log(node.value);
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
}
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which parameter changes each call?    | The argument that moves toward the base case.       |
| Where is the base case?               | The condition that stops recursion.                 |
| Does recursion eventually stop?       | Only if the base case is reachable for all inputs.  |
| What is the depth of recursion?       | How many frames on the stack before base case.      |
| Is this stack-safe?                   | Can it overflow for large inputs?                   |
| Is this tail-recursive?               | Is the recursive call the last operation?           |
| Could this be rewritten iteratively?  | Yes — all recursion can be converted to iteration.  |
| What is the time complexity?          | Count how many recursive calls are made.            |
| What is the space complexity?         | Stack depth × memory per frame.                     |

---

# Chapter 16 — Execution Context (Detailed)

## What Is an Execution Context?

An **execution context** is the environment in which JavaScript code is evaluated and executed. It contains everything needed to track the execution state.

## Types of Execution Context

| Type                | Created When                              |
|---------------------|-------------------------------------------|
| Global Context      | When the script first starts. Only one.   |
| Function Context    | Each time a function is called.           |
| Eval Context        | When `eval()` is called (rare, avoid).    |

## Execution Context Components

Each execution context has:

1. **Variable Environment** — stores variable bindings (`let`, `const`, `var`, function declarations, parameters).
2. **Lexical Environment** — the scope chain (reference to outer environment).
3. **`this` Binding** — determined by how the function is called.
4. **Outer Environment Reference** — points to the parent execution context's lexical environment.

## Creation Phase vs Execution Phase

### Phase 1: Creation Phase

When a function is called, before any code inside it executes, the engine:

1. Creates the execution context object.
2. Sets up the **scope chain** (copies the `[[Environment]]` from the function object).
3. Determines the **`this` value**.
4. Creates the **variable environment**:
   - Parameters are assigned.
   - Function declarations are hoisted (stored with their body).
   - Variables declared with `var` are hoisted and initialized to `undefined`.
   - Variables declared with `let` and `const` are hoisted but **not initialized** (TDZ).

### Phase 2: Execution Phase

Code is executed line by line. Assignments happen, function calls are made, etc.

## Detailed Example

```javascript
function example(a) {
    var b = 10;
    let c = 20;
    const d = 30;

    function inner() {
        console.log("inner");
    }

    console.log(a, b, c, d);
    inner();
}

example(5);
```

### Creation Phase for `example(5)`

```text
ExecutionContext for example(5):
┌──────────────────────────────────────────────┐
│ Creation Phase:                               │
│                                               │
│ 1. Scope Chain:                               │
│    [example's LexicalEnv, Global LexicalEnv]  │
│                                               │
│ 2. 'this' binding: depends on call pattern    │
│    (example(): non-strict → global)           │
│                                               │
│ 3. Variable Environment:                      │
│    a: 5               (parameter)             │
│    inner: <function>  (function declaration)  │
│    b: undefined       (var hoisted)           │
│    c: <uninitialized> (let — TDZ)             │
│    d: <uninitialized> (const — TDZ)           │
└──────────────────────────────────────────────┘
```

### Execution Phase for `example(5)`

```text
Execution Phase — line by line:

1: var b = 10;        → b = 10 (initialization leaves TDZ)
2: let c = 20;        → c = 20 (leaves TDZ)
3: const d = 30;      → d = 30 (leaves TDZ)
4: function inner(){} → already hoisted, nothing to do
5: console.log(...);  → executes, accesses a, b, c, d
6: inner();           → calls inner, creates new execution context
```

## The `this` Keyword

`this` is determined by **how the function is called**, not where it is defined.

```javascript
// Global context
console.log(this); // window (browser) / global (Node)

// Regular function call
function showThis() {
    console.log(this);
}
showThis(); // window (non-strict) / undefined (strict)

// Method call
const obj = { name: "test", showThis };
obj.showThis(); // obj

// Constructor call
function Person(name) {
    this.name = name;
}
const p = new Person("Alice"); // this → new object

// Arrow function
const arrow = () => console.log(this);
arrow(); // this from outer scope (lexical)
```

## Execution Context Lifecycle

```text
1. Function called → Create execution context
2. Creation phase → set up scope, this, hoisting
3. Push context onto call stack
4. Execution phase → run code line by line
5. Function returns → pop context off stack
6. Context becomes eligible for GC (unless closure retains it)
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What variables exist in this context? | Parameters, local declarations (let, const, var), inner function declarations. |
| When are they created?                | During the creation phase.                          |
| When are they destroyed?              | When the context is popped from the stack (unless retained by closure). |
| What is `this` bound to?              | Depends on call pattern: method, function, constructor, arrow. |
| What is the scope chain?              | Current context → outer context → ... → global.     |
| Is a variable in the TDZ?             | `let`/`const` before initialization line.           |

---

# Chapter 17 — Call Stack (Detailed)

## What Is the Call Stack?

The **call stack** is a LIFO (Last In, First Out) data structure that tracks which execution contexts are currently active. When a function is called, its context is **pushed** onto the stack. When it returns, its context is **popped** off.

## Stack Frame Contents

Each stack frame contains:
- The function name.
- Parameter values.
- Local variables.
- Return address (where to continue after the function returns).

## Detailed Example

```javascript
function one() {
    console.log("one starts");
    two();
    console.log("one ends");
}

function two() {
    console.log("two starts");
    three();
    console.log("two ends");
}

function three() {
    console.log("three runs");
}

one();
console.log("All done");
```

### Step-by-Step Stack

**Step 1: Global context**

```text
Stack (bottom → top):
┌─────────────────────┐
│ Global Context       │
└─────────────────────┘
```

**Step 2: `one()` is called**

```text
┌─────────────────────┐
│ one()                │ ← executing
├─────────────────────┤
│ Global Context       │
└─────────────────────┘
```

**Step 3: `one()` calls `two()`**

```text
┌─────────────────────┐
│ two()                │ ← executing
├─────────────────────┤
│ one()                │
├─────────────────────┤
│ Global Context       │
└─────────────────────┘
```

**Step 4: `two()` calls `three()`**

```text
┌─────────────────────┐
│ three()              │ ← executing
├─────────────────────┤
│ two()                │
├─────────────────────┤
│ one()                │
├─────────────────────┤
│ Global Context       │
└─────────────────────┘
```

**Step 5: `three()` returns**

```text
┌─────────────────────┐
│ two()                │ ← executing (continues from after three())
├─────────────────────┤
│ one()                │
├─────────────────────┤
│ Global Context       │
└─────────────────────┘
```

**Step 6: `two()` returns**

```text
┌─────────────────────┐
│ one()                │ ← executing (continues from after two())
├─────────────────────┤
│ Global Context       │
└─────────────────────┘
```

**Step 7: `one()` returns**

```text
┌─────────────────────┐
│ Global Context       │ ← executing
└─────────────────────┘
```

**Step 8: Program finishes**

```text
(empty — global context may remain in some environments)
```

### Output

```text
one starts
two starts
three runs
two ends
one ends
All done
```

## Stack Overflow

When the call stack exceeds its limit (typically ~10k-50k frames):

```javascript
function recurse() {
    recurse(); // no base case
}
recurse(); // RangeError: Maximum call stack size exceeded
```

### Detecting Stack Overflow

```javascript
function dangerousRecursion(depth = 0) {
    try {
        console.log(depth);
        dangerousRecursion(depth + 1);
    } catch (e) {
        console.log("Stack overflow at depth:", depth);
    }
}

dangerousRecursion();
// "Stack overflow at depth: <~10000>"
```

## The Stack and Async Code

```javascript
console.log("A");

setTimeout(() => {
    console.log("B"); // runs AFTER the stack is empty
}, 0);

console.log("C");
```

### Stack Behavior

```text
1. Global: console.log("A") — pushes, runs, pops
2. Global: setTimeout(...) — pushes, schedules callback, pops
3. Global: console.log("C") — pushes, runs, pops
4. Global context done. Stack is EMPTY.
5. Event loop picks up the callback from the task queue.
6. callback: console.log("B") — pushes, runs, pops
```

**Output:** `A C B`

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which function entered last?          | The top of the stack at any point.                  |
| Which function exits first?           | The top of the stack returns first (LIFO).          |
| What is the current stack depth?      | Count the number of frames.                         |
| What happens during recursion?        | Same function appears multiple times with different args. |
| What happens on stack overflow?       | `RangeError: Maximum call stack size exceeded`.     |
| How to inspect the call stack?        | `console.trace()` prints current stack. Debugger shows stack panel. Error objects contain `.stack`. |
| Why does async code run later?        | Callbacks are queued and only execute when the stack is empty. |

---

# Chapter 18 — Garbage Collection

## What Is Garbage Collection?

JavaScript automatically manages memory. The **garbage collector (GC)** identifies memory that is no longer reachable and reclaims it. You do not need to manually allocate or deallocate memory (unlike C/C++).

## Reachability

The GC's core concept: an object is **reachable** if it can be accessed from a **root** through a chain of references.

**Roots typically include:**
- Global variables (window/globalThis).
- Currently executing function's local variables and parameters.
- Variables on the call stack.
- Global object properties.

```javascript
// Example — reachability
let user = { name: "Alice" }; // reachable from root (global)
user = null;                   // object is no longer reachable → GC eligible
```

## Mark-and-Sweep Algorithm

Most modern JavaScript engines use **mark-and-sweep**:

```text
Phase 1 — MARK:
  Start from roots.
  Recursively traverse all reachable objects.
  Mark each object as "reachable".

Phase 2 — SWEEP:
  Iterate through heap memory.
  Reclaim memory of unmarked objects.
```

## Generational Collection (V8)

Modern engines optimize by dividing objects into **generations**:

- **Young Generation (Nursery):** New objects. Collected frequently (minor GC). Most objects die young.
- **Old Generation:** Objects that survived multiple collections. Collected less frequently (major GC).

```text
New object
  ↓ (allocation)
Nursery
  ↓ (survives GC)
Survivor space
  ↓ (survives multiple GC)
Old generation
```

## When Does GC Run?

- When memory is full.
- After a certain number of allocations.
- During idle time (browsers).
- Periodically based on heuristics.

You cannot force GC to run in JavaScript (though `global.gc()` exists in Node with `--expose-gc` flag).

## Examples of Reachability

```javascript
function createUser() {
    const user = { name: "Bob" };   // reachable during function execution
    return user;
}

const result = createUser();        // result now references the object
// The object is still reachable via `result`

result = null;                       // object becomes unreachable → GC eligible
```

### Closures Keep References

```javascript
function createCounter() {
    let count = 0;      // part of closure environment
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
// count is still reachable through counter's closure
// Even though createCounter() finished, count is NOT GC eligible

counter = null;          // Now count becomes unreachable → GC eligible
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does anything still reference this object? | Check all variables, closures, arrays, objects. |
| Is this variable still in scope?      | If not, and no other references exist → GC eligible. |
| Is this closure retaining memory?     | If a function is still accessible, its closure environment is retained. |
| Why isn't memory freed?               | There is a remaining reference somewhere (closure, global, event listener, timer). |
| Could this cause a memory leak?       | If memory grows continuously and is never freed, yes. |

---

# Chapter 19 — Memory Leaks

## What Is a Memory Leak?

A **memory leak** occurs when memory that is no longer needed is not released because the GC still considers it reachable. The program's memory usage grows over time, eventually causing performance degradation or crashes.

## Common JavaScript Memory Leaks

### 1. Accidental Global Variables

```javascript
function leak() {
    leakedVar = "I'm global!"; // no let/const/var — becomes global!
}

leak();
// leakedVar is now on the global object — never GC'd
```

**Fix:** Use strict mode (`"use strict"`) or always declare variables.

### 2. Forgotten Timers

```javascript
function startTimer() {
    const hugeData = new Array(10000000).fill("data");

    setInterval(() => {
        console.log(hugeData.length); // closure retains hugeData
    }, 1000);
}

startTimer();
// hugeData is never freed because the interval keeps running
```

**Fix:** Clear timers when no longer needed.

```javascript
const timerId = setInterval(() => { ... }, 1000);
// Later:
clearInterval(timerId);
```

### 3. Detached DOM References

```javascript
const elements = [];

function createButton() {
    const button = document.createElement("button");
    button.textContent = "Click me";
    document.body.appendChild(button);
    elements.push(button); // reference still exists even if DOM node is removed
}

// Later: button is removed from DOM
document.body.removeChild(button);
// BUT: button is still in `elements` array → memory leak!
```

**Fix:** Remove references when DOM nodes are removed, or use WeakRef/WeakMap.

### 4. Forgotten Event Listeners

```javascript
class Page {
    constructor() {
        this.data = new Array(1000000).fill("data");
        document.querySelector("button")
            .addEventListener("click", () => {
                console.log(this.data.length); // closure retains `this`
            });
        // When Page is destroyed, the event listener still holds a reference to `this`
    }
}

// The event listener keeps the Page instance alive as long as the button exists!
```

**Fix:** Remove event listeners when the component is destroyed.

```javascript
class Page {
    constructor() {
        this.data = new Array(1000000).fill("data");
        this.handler = () => console.log(this.data.length);
        document.querySelector("button")
            .addEventListener("click", this.handler);
    }

    destroy() {
        document.querySelector("button")
            .removeEventListener("click", this.handler);
    }
}
```

### 5. Growing Caches Without Limits

```javascript
const cache = {};

function processData(key, data) {
    cache[key] = data; // cache grows forever — never evicts old entries
    // process...
}
```

**Fix:** Use bounded caches (LRU, TTL) or `WeakMap` for keys that have their own lifecycle.

```javascript
// WeakMap — entries are GC'd when the key object is GC'd
const cache = new WeakMap();

function processData(key, data) {
    cache.set(key, data);
    // When `key` goes out of scope and is GC'd, the cache entry is automatically removed
}
```

### 6. Closures with Unnecessary Data

```javascript
function createLogger() {
    const hugeConfig = new Array(10000000).fill("config"); // never used by inner function
    return function(message) {
        console.log(message); // only needs `message`, but retains `hugeConfig`
    };
}
```

**Fix:** Only capture what the inner function actually needs.

```javascript
function createLogger() {
    const neededConfig = getRelevantConfig(); // only what's needed
    return function(message) {
        console.log(neededConfig.prefix + message);
    };
}
```

## Detecting Memory Leaks

### Chrome DevTools
1. Open **Performance** tab → Record → Interact with the app → Stop.
2. Look for memory growth without corresponding drops (sawtooth pattern).
3. Open **Memory** tab → Take heap snapshots before and after → Compare.

### Node.js
```bash
node --inspect server.js
# Open chrome://inspect in Chrome
# Use the Memory tab to take snapshots
```

```javascript
// Node — programmatic memory usage
const used = process.memoryUsage();
console.log(`Heap used: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`);
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Why isn't memory freed?               | There is still a reachable reference somewhere.     |
| Who still references this object?     | Check global variables, closures, arrays, DOM references, event listeners, timers. |
| Is this variable part of a closure?   | If the closure function still exists, the environment is retained. |
| Is an event listener still attached?  | Event listeners keep the handler's scope alive.     |
| Is a timer or interval still running? | Timers keep their callback's scope alive.           |
| Is data being added to a cache without eviction? | Caches must have size limits. |
| Could DOM references be retained after removal? | Remove references when removing DOM nodes. |

---

# Chapter 20 — Function Composition

## What Is Function Composition?

**Function composition** is combining two or more functions to produce a new function. The output of one function becomes the input of the next.

```javascript
const compose = (f, g) => x => f(g(x));

const double = x => x * 2;
const square = x => x * x;

const doubleThenSquare = compose(square, double);
// doubleThenSquare(3) = square(double(3)) = square(6) = 36

const squareThenDouble = compose(double, square);
// squareThenDouble(3) = double(square(3)) = double(9) = 18
```

## Composing Multiple Functions

```javascript
function compose(...fns) {
    return function(initialValue) {
        return fns.reduceRight((value, fn) => fn(value), initialValue);
    };
}

const add1 = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const process = compose(square, double, add1);
// process(3) = square(double(add1(3))) = square(double(4)) = square(8) = 64

console.log(process(3)); // 64
```

## Pipe (Left-to-Right)

`compose` is right-to-left. `pipe` is left-to-right:

```javascript
function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((value, fn) => fn(value), initialValue);
    };
}

const process = pipe(add1, double, square);
// process(3) = square(double(add1(3))) = 64 (same result, but reads left-to-right)

console.log(process(3)); // 64
```

## Real-World Composition

### Data Transformation Pipeline

```javascript
const processUserData = pipe(
    parseJSON,
    validateUser,
    normalizeFields,
    anonymizePII,
    formatResponse
);

const result = processUserData(rawUserInput);
```

### String Processing

```javascript
const cleanText = pipe(
    text => text.trim(),
    text => text.toLowerCase(),
    text => text.replace(/[^a-z0-9\s]/g, ""),
    text => text.split(/\s+/).filter(Boolean),
    words => [...new Set(words)]  // deduplicate
);

console.log(cleanText("  Hello! Hello, World?  "));
// ["hello", "world"]
```

## Composition vs Chaining

```javascript
// Chaining — methods on an object
const result = [1, 2, 3]
    .map(x => x * 2)
    .filter(x => x > 2)
    .reduce((a, b) => a + b, 0);
// Chaining works when all methods are on the same type (Array)

// Composition — functions applied in order
const result2 = pipe(
    arr => arr.map(x => x * 2),
    arr => arr.filter(x => x > 2),
    arr => arr.reduce((a, b) => a + b, 0)
)([1, 2, 3]);
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What is the data flow direction?      | Right-to-left (compose) or left-to-right (pipe).    |
| What is the input to the composed function? | The innermost (compose) or first (pipe) function's input. |
| What is the final output?             | The result of the outermost (compose) or last (pipe) function. |
| Can functions be reused?              | Yes — composition maximizes reusability.            |
| Is this point-free style?             | Functions composed without mentioning their arguments explicitly. |

---

# Chapter 21 — Pure Functions

## Definition

A **pure function** has two properties:

1. **Same input → same output** (deterministic).
2. **No side effects** (does not modify external state, perform I/O, or mutate arguments).

```javascript
// PURE — deterministic, no side effects
function add(a, b) {
    return a + b;
}

// IMPURE — depends on external state
let taxRate = 0.1;
function calculatePrice(base) {
    return base + base * taxRate; // if taxRate changes, output changes for same input
}

// IMPURE — modifies external state
let total = 0;
function addToTotal(value) {
    total += value; // side effect: modifies external variable
    return total;
}

// IMPURE — I/O operation
function logAndAdd(a, b) {
    console.log("Adding", a, b); // side effect: console I/O
    return a + b;
}

// IMPURE — mutates argument
function addToArray(arr, value) {
    arr.push(value); // side effect: mutates the input array
    return arr;
}
```

## Why Pure Functions Matter

### 1. Predictability

```javascript
// Pure — easy to reason about
const result = add(5, 3); // always 8, guaranteed

// Impure — depends on unknown state
const result2 = calculatePrice(100); // depends on current taxRate
```

### 2. Testability

```javascript
// Pure — no setup needed
test("add returns sum", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
});

// Impure — requires setup
test("calculatePrice uses tax rate", () => {
    taxRate = 0.2;
    expect(calculatePrice(100)).toBe(120);
    taxRate = 0.1; // must clean up
});
```

### 3. Caching (Memoization)

```javascript
// Pure function can be memoized safely
const memoizedAdd = (function() {
    const cache = new Map();
    return function(a, b) {
        const key = `${a},${b}`;
        if (cache.has(key)) return cache.get(key);
        const result = a + b;
        cache.set(key, result);
        return result;
    };
})();
```

### 4. Parallelization

Pure functions can safely run in parallel (web workers, serverless functions) because they don't share state.

### 5. Debugging

```javascript
// If a pure function gives wrong output, the bug MUST be in the function itself.
// If an impure function gives wrong output, the bug could be in the function
// OR in any external state it depends on.
```

## Making Impure Functions Pure

### Extract Side Effects

```javascript
// Impure
function saveUser(user) {
    validate(user);
    database.insert(user);
    email.sendWelcome(user);
    return { success: true };
}

// Pure core + impure shell
function validateUser(user) {
    // pure validation logic
    return user.name && user.email ? [] : ["Invalid user"];
}

// The impure shell orchestrates side effects
function saveUserHandler(user) {
    const errors = validateUser(user);
    if (errors.length > 0) return { success: false, errors };

    database.insert(user);   // side effect — unavoidable
    email.sendWelcome(user); // side effect — unavoidable
    return { success: true };
}
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does the function modify external variables? | Check for assignments to variables not in its scope. |
| Does it mutate its arguments?         | Check for push, pop, splice, property assignment on parameters. |
| Does it perform I/O?                  | console.log, fetch, database calls, file system — all side effects. |
| Is the output predictable?            | Same input always same output?                     |
| Is the function testable?             | Pure functions need no setup or mocks.             |
| Can this function be memoized?        | Only if pure.                                       |

---

# Chapter 22 — Side Effects

## What Are Side Effects?

A **side effect** is any observable change in the program's state that occurs outside the function's local scope.

## Common Side Effects

```javascript
// 1. Modifying a global or outer scope variable
let counter = 0;
function increment() { counter++; }

// 2. Modifying function arguments
function addItem(arr, item) { arr.push(item); }

// 3. Console I/O
function greet(name) { console.log("Hello, " + name); }

// 4. Network requests (fetch, XMLHttpRequest)
function fetchData() { fetch("/api/data"); }

// 5. DOM manipulation
function updateHeading(text) { document.querySelector("h1").textContent = text; }

// 6. File system operations (Node.js)
function readFile() { fs.readFileSync("data.txt"); }

// 7. Database operations
function saveToDB(data) { db.insert(data); }

// 8. Math.random (non-deterministic)
function randomRoll() { return Math.floor(Math.random() * 6) + 1; }

// 9. Date.now (non-deterministic)
function getTimestamp() { return Date.now(); }

// 10. Throwing exceptions
function divide(a, b) {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
}
```

## Managing Side Effects

### Strategy 1: Push Side Effects to the Boundaries

```javascript
// Inner logic — pure
function calculateTotal(items) {
    return items
        .filter(item => item.quantity > 0)
        .reduce((total, item) => total + item.price * item.quantity, 0);
}

// Boundary — impure
function handleCheckout(userId, items) {
    const total = calculateTotal(items); // pure
    database.chargeUser(userId, total);  // side effect
    email.sendReceipt(userId, total);    // side effect
    return total;
}
```

### Strategy 2: Control Side Effects with Wrappers

```javascript
function withLogging(fn) {
    return function(...args) {
        console.log(`Calling ${fn.name} with`, args);
        const result = fn(...args);
        console.log(`Result:`, result);
        return result;
    };
}

const addWithLogging = withLogging((a, b) => a + b);
addWithLogging(5, 3);
// Calling (anonymous) with [5, 3]
// Result: 8
```

## Side Effects and Functional Programming

Functional programming aims to minimize side effects by pushing them to the edges of the system, keeping the core logic pure.

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What side effects does this function have? | Check for mutations, I/O, network, console, timers, DOM. |
| Are the side effects necessary?       | Some I/O is unavoidable (saving data). Some is accidental (global mutation). |
| Can the side effects be isolated?     | Extract pure logic from impure orchestration.       |
| Could the side effect cause a bug?    | If multiple parts of the code interact through global state, yes. |

---

# Chapter 23 — Senior Engineer Reverse Engineering Checklist

## Complete Question Set for Functions

### Call Site

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| Who calls this function?              | Understanding the call graph reveals the program flow. |
| What are the inputs (arguments)?      | Parameters define the function's interface.          |
| What is the output (return value)?    | The function's result.                               |
| Is the return value used?             | If ignored, maybe it's called for side effects.      |

### State

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| Is state being changed?               | Look for mutations to parameters or external variables. |
| Is the function pure?                 | Pure = predictable, testable, cacheable.             |
| Is memory shared?                     | Objects passed as arguments are shared — mutations affect the caller. |
| Are there side effects?               | console, fetch, DOM, timers, database — all side effects. |

### Closure

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| Are closures involved?                | If inner functions reference outer variables, closures exist. |
| What variables are captured?          | Only used variables are retained — but entire scope may be kept. |
| How long do captured variables live?  | As long as the closure function exists.              |
| Could this be a memory leak?          | If the closure lives longer than intended.           |

### Execution

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| What is on the call stack?            | The current execution context chain.                 |
| Which execution context owns this variable? | Walk the scope chain to find the definition. |
| How deep is the recursion?            | Could it overflow?                                   |
| Is this function synchronous or async? | Async functions return Promises — need await or .then. |

### Memory

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| Can garbage collector remove this memory? | Only if no reachable references remain.           |
| Why does this variable still exist?   | Some reference keeps it alive (closure, global, DOM). |
| Is there a memory leak?              | If memory grows without bound.                       |
| Are event listeners cleaned up?       | Forgotten listeners keep components alive.           |
| Are timers cleared?                   | Timers keep their callbacks' scope alive.            |

### Design

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| Is this a higher-order function?      | Does it take or return functions?                    |
| Is this a factory function?           | Does it create and return objects?                   |
| Is this a callback?                   | Is it passed to be called later?                     |
| Is this an IIFE?                      | Does it run immediately to create scope?             |
| Can I rewrite this from scratch?      | True understanding.                                  |
| What would break if I removed this line? | Understand essential vs accidental complexity. |

---

# Chapter 24 — Projects

## Project 1: Counter Closure with Multiple Operations

```javascript
function createAdvancedCounter(initialValue = 0) {
    let count = initialValue;
    const history = [];

    return {
        increment(step = 1) {
            count += step;
            history.push({ operation: "+" + step, value: count });
            return count;
        },
        decrement(step = 1) {
            count -= step;
            history.push({ operation: "-" + step, value: count });
            return count;
        },
        reset() {
            count = initialValue;
            history.length = 0;
            return count;
        },
        getCount() {
            return count;
        },
        getHistory() {
            return [...history]; // defensive copy
        },
        undo() {
            const last = history.pop();
            if (last) {
                count = last.value - parseInt(last.operation);
            }
            return count;
        }
    };
}

const counter = createAdvancedCounter(10);
console.log(counter.increment(5));  // 15
console.log(counter.increment(3));  // 18
console.log(counter.decrement(4));  // 14
console.log(counter.undo());        // 18 (undo the decrement)
console.log(counter.getHistory());  // [{+5,15}, {+3,18}]
```

## Project 2: Calculator Factory with Memory

```javascript
function createCalculator() {
    let memory = 0;

    return {
        add(a, b) {
            const result = a + b;
            memory = result;
            return result;
        },
        subtract(a, b) {
            const result = a - b;
            memory = result;
            return result;
        },
        multiply(a, b) {
            const result = a * b;
            memory = result;
            return result;
        },
        divide(a, b) {
            if (b === 0) throw new Error("Division by zero");
            const result = a / b;
            memory = result;
            return result;
        },
        power(a, b) {
            const result = a ** b;
            memory = result;
            return result;
        },
        memoryRecall() {
            return memory;
        },
        memoryClear() {
            memory = 0;
        },
        chain(initial) {
            let current = initial;
            const api = {
                add(n) { current += n; return api; },
                subtract(n) { current -= n; return api; },
                multiply(n) { current *= n; return api; },
                divide(n) {
                    if (n === 0) throw new Error("Division by zero");
                    current /= n;
                    return api;
                },
                result() { return current; }
            };
            return api;
        }
    };
}

const calc = createCalculator();
console.log(calc.add(10, 5));        // 15
console.log(calc.memoryRecall());    // 15

// Chain pattern
const result = calc.chain(10)
    .add(5)
    .multiply(2)
    .subtract(3)
    .result();
console.log(result); // ((10 + 5) * 2) - 3 = 27
```

## Project 3: Todo Manager with Closures

```javascript
function createTodoManager() {
    let todos = [];
    let idCounter = 0;

    function generateId() {
        return ++idCounter;
    }

    return {
        add(text) {
            if (!text || typeof text !== "string") {
                throw new Error("Invalid todo text");
            }
            const todo = {
                id: generateId(),
                text,
                completed: false,
                createdAt: new Date().toISOString()
            };
            todos = [...todos, todo];
            return todo;
        },

        remove(id) {
            const removed = todos.find(t => t.id === id);
            todos = todos.filter(t => t.id !== id);
            return removed;
        },

        toggle(id) {
            todos = todos.map(t =>
                t.id === id ? { ...t, completed: !t.completed } : t
            );
            return todos.find(t => t.id === id);
        },

        update(id, updates) {
            todos = todos.map(t =>
                t.id === id ? { ...t, ...updates } : t
            );
            return todos.find(t => t.id === id);
        },

        getAll() {
            return [...todos]; // defensive copy
        },

        getActive() {
            return todos.filter(t => !t.completed);
        },

        getCompleted() {
            return todos.filter(t => t.completed);
        },

        search(query) {
            return todos.filter(t =>
                t.text.toLowerCase().includes(query.toLowerCase())
            );
        },

        sortByDate(direction = "desc") {
            return [...todos].sort((a, b) => {
                const diff = new Date(a.createdAt) - new Date(b.createdAt);
                return direction === "desc" ? -diff : diff;
            });
        },

        getStats() {
            return {
                total: todos.length,
                active: this.getActive().length,
                completed: this.getCompleted().length,
                completionRate: todos.length > 0
                    ? Math.round((this.getCompleted().length / todos.length) * 100) + "%"
                    : "0%"
            };
        },

        clearCompleted() {
            const removed = this.getCompleted();
            todos = todos.filter(t => !t.completed);
            return removed;
        }
    };
}

const manager = createTodoManager();
manager.add("Learn JavaScript");
manager.add("Build a project");
manager.add("Master closures");
manager.toggle(2);
console.log(manager.getStats());
// { total: 3, active: 2, completed: 1, completionRate: "33%" }
```

## Project 4: Event Emitter (Pub/Sub Pattern)

```javascript
function createEventEmitter() {
    const events = new Map();

    return {
        on(eventName, handler) {
            if (!events.has(eventName)) {
                events.set(eventName, new Set());
            }
            events.get(eventName).add(handler);

            // Return unsubscribe function
            return () => {
                events.get(eventName)?.delete(handler);
            };
        },

        off(eventName, handler) {
            events.get(eventName)?.delete(handler);
        },

        emit(eventName, ...args) {
            const handlers = events.get(eventName);
            if (!handlers) return false;
            handlers.forEach(handler => handler(...args));
            return true;
        },

        once(eventName, handler) {
            const wrapped = (...args) => {
                handler(...args);
                this.off(eventName, wrapped);
            };
            return this.on(eventName, wrapped);
        },

        clear(eventName) {
            if (eventName) {
                events.delete(eventName);
            } else {
                events.clear();
            }
        },

        listenerCount(eventName) {
            return events.get(eventName)?.size || 0;
        },

        eventNames() {
            return [...events.keys()];
        }
    };
}

// Usage
const emitter = createEventEmitter();

const unsub = emitter.on("data", payload => {
    console.log("Received:", payload);
});

emitter.on("error", err => {
    console.error("Error:", err.message);
});

emitter.emit("data", { id: 1, value: "test" }); // "Received: {id:1, value:'test'}"
unsub(); // unsubscribe
emitter.emit("data", { id: 2 }); // nothing — handler removed
```

## Project 5: Rate Limiter (Higher-Order Function)

```javascript
function createRateLimiter(limit, windowMs) {
    const calls = [];

    return function(fn) {
        return function(...args) {
            const now = Date.now();
            // Remove expired timestamps
            while (calls.length > 0 && calls[0] <= now - windowMs) {
                calls.shift();
            }

            if (calls.length >= limit) {
                const waitTime = windowMs - (now - calls[0]);
                throw new Error(
                    `Rate limit exceeded. Try again in ${Math.ceil(waitTime / 1000)} seconds.`
                );
            }

            calls.push(now);
            return fn(...args);
        };
    };
}

// Usage
const limiter = createRateLimiter(3, 1000); // 3 calls per second
const limitedFn = limiter((name) => {
    console.log("Hello, " + name);
});

limitedFn("A"); // OK (1)
limitedFn("B"); // OK (2)
limitedFn("C"); // OK (3)
// limitedFn("D"); // Error — rate limit exceeded
```

---

## Next: Part 6

**Part 6 — Objects, Prototypes, Classes, Inheritance, `this`, Constructors, and the Prototype Chain**

Including:

- The prototype chain (full memory model)
- `__proto__` vs `prototype`
- `Object.create()`
- Constructor functions and `new`
- `instanceof` operator
- ES6 `class` syntax (syntactic sugar)
- Private fields and methods
- Static methods and properties
- Getters and setters
- Inheritance and `extends`
- `super` keyword
- Mixins and composition
- Polymorphism
- The `this` keyword in all contexts (implicit, explicit, default, arrow)
- `call()`, `apply()`, `bind()`
- Built-in prototypes (`Array.prototype`, `Function.prototype`, etc.)
- Monkey patching pitfalls
- Performance implications of prototype chains
- Reverse engineering tactics for class-based code
