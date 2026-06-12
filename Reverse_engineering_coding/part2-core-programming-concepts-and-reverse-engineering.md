# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

## Part 2 — Core Programming Concepts + Reverse Engineering Tactics

---

# Goal

By the end of Part 2, you should understand:

- How JavaScript executes code.
- How memory works.
- How functions really work.
- Why closures exist.
- How objects and arrays are stored.
- The difference between value and reference.
- How to reverse engineer code instead of memorizing it.

---

# Chapter 1 — Expressions vs Statements

## What Is an Expression?

An **expression** is any piece of code that **produces a value**. Expressions are the building blocks of all computation in JavaScript.

```javascript
10               // → 10
5 + 3            // → 8
true             // → true
"Hello"          // → "Hello"
x * y            // → depends on x and y
Math.sqrt(16)    // → 4
a ? b : c        // → b if a is truthy, otherwise c
```

Every expression can be placed anywhere a value is expected:

```javascript
let result = (5 + 3) * 2;        // expression inside expression
console.log(Math.sqrt(25));      // expression as argument
if (age > 18) { }                // expression as condition
```

### Types of Expressions

| Type                  | Example              | Produces        |
|-----------------------|----------------------|-----------------|
| Literal               | `42`                 | the number 42   |
| Variable reference    | `name`               | value of `name` |
| Arithmetic            | `a + b`              | numeric result  |
| String                | `"Hello" + "World"`  | concatenated string |
| Logical               | `a && b`             | truthy/falsy    |
| Comparison            | `x > 5`              | boolean         |
| Assignment expression | `x = 5`              | the assigned value (5) |
| Function call         | `foo()`              | return value (or undefined) |
| Ternary               | `a ? b : c`          | b or c          |
| Array literal         | `[1, 2, 3]`          | array           |
| Object literal        | `{ a: 1 }`           | object          |

### Assignment as Expression

```javascript
let x;
console.log(x = 10); // 10 — the assignment expression itself evaluates to 10
```

This is why you can chain assignments:

```javascript
let a, b, c;
a = b = c = 5;
// Equivalent to: a = (b = (c = 5))
// c = 5 evaluates to 5, then b = 5 evaluates to 5, then a = 5
```

## What Is a Statement?

A **statement** performs an action. Statements are the instructions that make up a program. They do not necessarily produce a value.

```javascript
let x = 10;              // variable declaration statement
if (x > 5) { }           // if statement
for (let i = 0; i < 5; i++) { }  // for loop statement
return x;                // return statement (inside a function)
throw new Error();       // throw statement
break;                   // break statement
```

### Expression Statements

Some statements contain expressions:

```javascript
console.log("Hello");    // expression statement (function call expression + semicolon)
x = 5;                   // expression statement (assignment expression + semicolon)
```

The semicolon turns an expression into a statement in many cases.

### The Expression-Statement Distinction in Practice

```javascript
// This is valid — a literal expression as a statement
42;
"hello";
true;

// This is valid — arithmetic expression as a statement
5 + 3;

// None of these do anything useful, but they are syntactically valid
```

### Statements That Are Not Expressions

```javascript
let x = 5;               // declaration — does not produce a value
if (true) { }            // conditional — no value
for (;;) { }             // loop — no value
function foo() { }       // function declaration — no value (unlike function expression)
```

### Key Insight: Function Declarations vs Function Expressions

```javascript
// Function declaration — a STATEMENT
function add(a, b) {
    return a + b;
}

// Function expression — an EXPRESSION (produces a function value)
const add = function(a, b) {
    return a + b;
};

// Arrow function — an EXPRESSION
const add = (a, b) => a + b;
```

A function declaration cannot be used directly as a value; a function expression can.

## Reverse Engineering Questions

### For `5 + 3`

| Question                          | Answer                                              |
|-----------------------------------|-----------------------------------------------------|
| Does this produce a value?        | Yes.                                                |
| What value?                       | `8` (the number 8).                                 |
| Is this an expression?            | Yes — an arithmetic expression.                     |
| Where can this appear?            | Anywhere a value is expected: assignment, argument, return, condition. |
| What is the AST node type?        | `BinaryExpression` with operator `+`.               |
| Can it be a statement?            | Yes: `5 + 3;` — expression statement, but useless.  |

### For `if (age > 18)`

| Question                          | Answer                                              |
|-----------------------------------|-----------------------------------------------------|
| Is this calculating something?    | No — the `if` is a statement that controls flow.    |
| Is `age > 18` an expression?      | Yes — it is a comparison expression producing `true` or `false`. |
| What executes if condition is true? | The block `{ }` following the condition.          |
| Does the `if` itself produce a value? | No. It is a statement, not an expression.      |

### Detecting expressions vs statements when reverse engineering

When reading code, ask: "If I put this on the right side of `=` or inside `console.log()`, would it work?"

```javascript
// Works — expression
console.log(5 + 3);         // 8
let x = 5 + 3;              // OK

// Would NOT work — statement
console.log(let y = 5);     // SyntaxError
let x = if (true) { };      // SyntaxError
```

---

# Chapter 2 — Scope

## What Is Scope?

**Scope** defines where a variable is **visible** and **accessible** in your code. It is the region of the program where a variable name can be referenced.

JavaScript has three levels of scope:

```
     Global Scope
         ↑
    Function Scope
         ↑
     Block Scope
```

## Global Scope

Variables declared at the top level (outside any function or block) are in the **global scope**. They are accessible from anywhere in the program.

```javascript
let name = "John";           // global scope

function show() {
    console.log(name);       // accessible — finds name in global scope
}

if (true) {
    console.log(name);       // accessible
}

console.log(name);           // accessible
```

### Global Memory Diagram

```text
┌─────────────────────────────────────┐
│           Global Memory             │
│                                     │
│   name ───────── "John"             │
│   show ───────── function object    │
└─────────────────────────────────────┘
```

**Dangers of globals:**
- Name collisions with other scripts or libraries.
- Hard to track which code modifies the variable.
- Memory lives for the entire program lifetime (not garbage collected until page unload).

## Function Scope

Variables declared with `var` inside a function are scoped to that function. They are not accessible outside.

```javascript
function test() {
    let age = 25;            // function-scoped (let inside function)
    var old = 50;            // function-scoped (var inside function)
    console.log(age);        // 25
    console.log(old);        // 50
}

console.log(age);            // ReferenceError: age is not defined
console.log(old);            // ReferenceError: old is not defined
```

### Function Scope Memory Diagram (during execution)

```text
┌─────────────────────────────────────┐
│         Global Memory               │
│                                     │
│   test ───────── function object    │
└─────────────────────────────────────┘
         ↓ (when test() is called)
┌─────────────────────────────────────┐
│      test() Execution Context       │
│                                     │
│   age ───────── 25                  │
│   old ───────── 50                  │
└─────────────────────────────────────┘
```

When `test()` finishes, its execution context is destroyed and `age` and `old` cease to exist.

## Block Scope

Introduced by `let` and `const`. A **block** is any code between `{ }` — in an `if`, `for`, `while`, or standalone.

```javascript
{
    let x = 10;              // block-scoped
    const y = 20;            // block-scoped
    var z = 30;              // NOT block-scoped — function scoped (or global if at top)
}

console.log(x);              // ReferenceError: x is not defined
console.log(y);              // ReferenceError: y is not defined
console.log(z);              // 30 — var ignores block scope!
```

### Block Scope in Control Structures

```javascript
if (true) {
    let message = "Hello";
    console.log(message);    // "Hello"
}
console.log(message);        // ReferenceError

for (let i = 0; i < 3; i++) {
    console.log(i);          // 0, 1, 2
}
console.log(i);              // ReferenceError (with let)
// With var i: console.log(i) would be 3 — var leaks the loop variable
```

### Why Block Scope Matters

Without block scope, loops and conditionals leak variables:

```javascript
// Problem with var
for (var i = 0; i < 5; i++) {
    // i leaks outside
}
console.log(i); // 5 — i is still accessible

// Solution with let
for (let j = 0; j < 5; j++) {
    // j is contained
}
console.log(j); // ReferenceError
```

## Scope Chain

When you reference a variable, JavaScript searches:

```
Current Scope
   ↓ (not found?)
Parent Scope
   ↓ (not found?)
Grandparent Scope
   ↓ (not found?)
...
Global Scope
   ↓ (not found?)
ReferenceError
```

```javascript
let globalVar = "I am global";

function outer() {
    let outerVar = "I am outer";

    function inner() {
        let innerVar = "I am inner";
        console.log(innerVar);   // found in current scope
        console.log(outerVar);   // found in parent scope
        console.log(globalVar);  // found in global scope
    }
}
```

**Visual scope chain:**

```text
inner() scope:        innerVar
    ↑
outer() scope:        outerVar
    ↑
Global scope:         globalVar
```

## Reverse Engineering Questions

### For `console.log(score)`

| Question                       | Answer                                                             |
|--------------------------------|--------------------------------------------------------------------|
| Where is score declared?       | Trace up the scope chain until you find the declaration.           |
| Is it global?                  | If declared at top level, outside all functions/blocks.            |
| Is it local?                   | If declared inside the current function or block.                  |
| Does it exist at all?          | If not found in any scope → `ReferenceError`.                      |
| Which scope contains it?       | The first scope in the chain where `score` is declared.            |
| What is the scope chain depth? | Count how many nested scopes separate reference from declaration.  |

### When reverse engineering

```javascript
function process() {
    let result = compute();
    // How do I know if result exists here?
    // Answer: it was declared in the same function scope — yes.
}

function process() {
    if (true) {
        let temp = 10;
    }
    console.log(temp);
    // Does temp exist here? No — block-scoped to the if block.
}
```

---

# Chapter 3 — Block Scope in Depth

## `let` and `const` Are Block-Scoped

```javascript
{
    let x = 10;
    const y = 20;
    console.log(x, y); // 10, 20
}
console.log(x); // ReferenceError
console.log(y); // ReferenceError
```

## `var` Is NOT Block-Scoped

```javascript
{
    var x = 10;
}
console.log(x); // 10 — var ignores the block boundary
```

`var` is only scoped to **functions**, not to blocks.

## Block Scope in `for` Loops — The Classic Closure Problem

The difference between `var` and `let` in loops is critical.

### With `var` — One Variable

```javascript
var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs.push(function() { console.log(i); });
}
funcs[0](); // 3
funcs[1](); // 3
funcs[2](); // 3
```

**Why?** There is only ONE variable `i`. By the time any function runs, `i` has already reached 3.

### With `let` — New Variable Per Iteration

```javascript
var funcs = [];
for (let i = 0; i < 3; i++) {
    funcs.push(function() { console.log(i); });
}
funcs[0](); // 0
funcs[1](); // 1
funcs[2](); // 2
```

**Why?** `let` creates a new binding for `i` in each iteration. Each function closes over its own `i`.

## Standalone Blocks

Blocks can exist without any control structure:

```javascript
{
    let temp = "temporary";
    // do something with temp
}
// temp is gone — clean memory
```

This is useful for limiting variable lifetime without creating a function.

## Nested Block Scope

```javascript
{
    let a = 1;
    {
        let b = 2;
        {
            let c = 3;
            console.log(a, b, c); // 1, 2, 3
        }
        console.log(a, b);       // 1, 2
        // console.log(c);       // ReferenceError
    }
    console.log(a);              // 1
    // console.log(b);           // ReferenceError
    // console.log(c);           // ReferenceError
}
```

## Reverse Engineering Questions

### Why does `let` behave differently from `var`?

| Aspect              | `let` / `const`                  | `var`                            |
|---------------------|----------------------------------|----------------------------------|
| Scope               | Block-scoped                     | Function-scoped                  |
| Hoisting            | Hoisted but not initialized (TDZ)| Hoisted and initialized to `undefined` |
| Redeclaration       | Not allowed in same scope        | Allowed                          |
| Global property     | Does not create `window` property | Creates `window` property (in browsers) |
| Loop iteration      | New binding per iteration        | Single binding across iterations |

### When reverse engineering, how to detect block scope issues?

```javascript
// Suspicious pattern — likely a bug
for (var i = 0; i < items.length; i++) {
    setTimeout(function() {
        console.log(items[i]); // i will be items.length when this runs
    }, 100);
}

// Fixed with let
for (let i = 0; i < items.length; i++) {
    setTimeout(function() {
        console.log(items[i]); // correct — each timeout captures its own i
    }, 100);
}
```

---

# Chapter 4 — Hoisting in Depth

## What Is Hoisting?

**Hoisting** is JavaScript's behavior of moving **declarations** to the top of their containing scope before code execution. The declaration is "hoisted" but the assignment stays in place.

## Hoisting with `var`

```javascript
console.log(x);      // undefined (not ReferenceError!)
var x = 10;
console.log(x);      // 10
```

The engine interprets this as:

```javascript
var x;               // hoisted — declaration moved to top
console.log(x);      // undefined — value hasn't been assigned yet
x = 10;              // stays in place
console.log(x);      // 10
```

### Understanding the `undefined`

The variable `x` exists from the start of its scope (thanks to hoisting), but its value is `undefined` until the assignment line executes.

```javascript
function example() {
    console.log(x);  // undefined
    var x = 5;
    console.log(x);  // 5
}
```

## Hoisting with `let` and `const`

```javascript
console.log(a);      // ReferenceError: Cannot access 'a' before initialization
let a = 5;
```

`let` and `const` are **hoisted** (they exist in their scope from the start) but they are **not initialized**. They are in a **Temporal Dead Zone (TDZ)** from the start of the scope until the declaration line.

```javascript
{
    // TDZ starts here for 'a'
    // console.log(a);  // ReferenceError if uncommented
    let a = 5;
    // TDZ ends here
    console.log(a);  // 5
}
```

### Temporal Dead Zone (TDZ) Visualization

```text
{
    // ─────────────────────────────────────
    // TEMPORAL DEAD ZONE for variable 'a'
    // a exists but is uninitialized
    // Any access → ReferenceError
    // ─────────────────────────────────────

    let a = 5;
    
    // ─────────────────────────────────────
    // a is now initialized
    // Can be accessed
    // ─────────────────────────────────────
}
```

## Hoisting with Functions

### Function Declarations — Fully Hoisted

```javascript
greet();            // "Hello!" — works!

function greet() {
    console.log("Hello!");
}
```

The entire function is hoisted — both the name and the body.

```javascript
// The engine sees this:
function greet() {      // hoisted entirely
    console.log("Hello!");
}
greet();                // "Hello!"
```

### Function Expressions — Not Hoisted (as values)

```javascript
greet();            // TypeError: greet is not a function

var greet = function() {
    console.log("Hello!");
};
```

With `var`, only the declaration `greet` is hoisted (as `undefined`), not the assignment.

```javascript
var greet;          // hoisted as undefined
greet();            // TypeError: greet is not a function (undefined is not callable)
greet = function() {
    console.log("Hello!");
};
```

With `let`, the same TDZ rules apply:

```javascript
greet();            // ReferenceError — TDZ for greet
let greet = function() {
    console.log("Hello!");
};
```

## Hoisting Order of Precedence

1. **Function declarations** are hoisted first (before variables).
2. **Variable declarations** are hoisted after functions.
3. If a variable name conflicts with a function name, the variable declaration does NOT overwrite the function (but assignment does).

```javascript
console.log(foo);   // [Function: foo] — function wins over variable name

var foo = "bar";
function foo() {
    return "baz";
}

console.log(foo);   // "bar" — after assignment, variable value wins
```

The engine sees:

```javascript
function foo() {        // hoisted first
    return "baz";
}
var foo;                // hoisted second — ignored (already exists)
console.log(foo);       // [Function: foo]
foo = "bar";            // assignment — changes the value
console.log(foo);       // "bar"
```

## Practical Implications of Hoisting

### Bad Practice #1: Using variable before declaration

```javascript
// Confusing — avoid
var name = "John";
function display() {
    console.log(name);   // undefined (local name hoisted, not global)
    var name = "Jane";
    console.log(name);   // "Jane"
}
display();
```

The engine sees:

```javascript
var name = "John";
function display() {
    var name;            // hoisted — shadows global
    console.log(name);   // undefined
    name = "Jane";
    console.log(name);   // "Jane"
}
```

### Bad Practice #2: Block-scoped function declarations

```javascript
if (true) {
    function sayHi() {
        console.log("Hi");
    }
}
sayHi(); // Works in non-strict mode, Error in strict mode (ES6)
```

In strict mode, function declarations inside blocks are block-scoped.

## Reverse Engineering Questions

### For `console.log(a);` when `a` hasn't been declared yet

| Question                       | Answer                                                             |
|--------------------------------|--------------------------------------------------------------------|
| Has `a` been declared?         | If you get `undefined`, yes (var). If `ReferenceError`, maybe not declared (or let/const in TDZ). |
| Which keyword was used?        | `var` → undefined. `let`/`const` → ReferenceError (TDZ).           |
| Is this intentional or a bug?  | `undefined` from `var` hoisting is usually unintentional and confusing. |
| What should the developer do?  | Move the declaration before the usage, or use `let`/`const`.       |

### Hoisting detection table

| Code Pattern                                  | What actually happens                              |
|-----------------------------------------------|----------------------------------------------------|
| `console.log(x); var x = 5;`                  | `undefined` printed (x hoisted, not initialized)   |
| `console.log(x); let x = 5;`                  | `ReferenceError` (TDZ)                             |
| `foo(); function foo() {}`                     | Works — function fully hoisted                     |
| `foo(); var foo = function() {}`               | `TypeError` — foo is `undefined` at call time      |
| `foo(); let foo = () => {}`                    | `ReferenceError` — TDZ                             |

---

# Chapter 5 — Functions in Depth

## What Is a Function?

A **function** is a reusable block of code that performs a specific task. Functions are **first-class objects** in JavaScript — they can be assigned to variables, passed as arguments, returned from other functions, and stored in data structures.

## Function Declaration

```javascript
function greet() {
    console.log("Hello");
}

greet(); // "Hello"
```

**Characteristics:**
- Hoisted entirely (can be called before declaration).
- Creates a named function in the current scope.
- Must have a name.

## Function Expression

```javascript
const greet = function() {
    console.log("Hello");
};

greet(); // "Hello"
```

**Characteristics:**
- NOT hoisted (behaves like variable assignment).
- Can be anonymous or named.
- More flexible — can be assigned conditionally.

### Named Function Expression

```javascript
const greet = function sayHello() {
    console.log("Hello");
    console.log(sayHello); // function reference available inside
};

greet();     // "Hello"
sayHello();  // ReferenceError — not in outer scope
```

The name is only accessible inside the function itself, useful for recursion.

## Arrow Functions (ES6)

```javascript
const greet = () => {
    console.log("Hello");
};

// Single expression — implicit return
const add = (a, b) => a + b;

// Single parameter — no parentheses needed
const square = x => x * x;

// No parameters — parentheses required
const hello = () => "Hello";
```

**Key differences from regular functions:**
- No `this` binding (inherits `this` from surrounding scope).
- No `arguments` object.
- Cannot be used as constructors (no `new`).
- Cannot be used as methods (if `this` access is needed).
- No `prototype` property.

## Immediately Invoked Function Expression (IIFE)

```javascript
(function() {
    let privateVar = "secret";
    console.log("IIFE executed");
})(); // "IIFE executed"

// With arrow
(() => {
    console.log("Arrow IIFE");
})();
```

**Purpose:** Creates a new scope for variables, avoiding global pollution. Pre-ES6, this was the only way to create block-like scope.

## Function Parameters vs Arguments

**Parameters** are the placeholders in the function definition.
**Arguments** are the actual values passed when calling.

```javascript
function square(number) {   // number is a PARAMETER
    return number * number;
}

square(5);                  // 5 is an ARGUMENT
```

### Default Parameters (ES6)

```javascript
function greet(name = "Guest") {
    console.log(`Hello, ${name}`);
}

greet("John");   // "Hello, John"
greet();         // "Hello, Guest"
greet(undefined); // "Hello, Guest" — undefined triggers default
greet(null);     // "Hello, null" — null does NOT trigger default
```

### Rest Parameters (ES6)

```javascript
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
```

Rest parameters collect all remaining arguments into a real array (unlike `arguments`).

### The `arguments` Object (Legacy)

```javascript
function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

console.log(sum(1, 2, 3)); // 6
```

`arguments` is an array-like object (not a real array), available only in regular functions (not arrows).

## Return Values

### Implicit Return

```javascript
// Arrow functions with single expression
const double = x => x * 2;
console.log(double(5)); // 10
```

### Explicit Return

```javascript
function double(x) {
    return x * 2;
}
```

### Functions Without Return → `undefined`

```javascript
function noReturn() {
    let x = 5;
    // no return statement
}
console.log(noReturn()); // undefined
```

### The `return` Statement Stops Execution

```javascript
function check(value) {
    if (value < 0) {
        return "negative";
        // Anything after this line inside the if block is dead code
    }
    console.log("Value is non-negative");
    return "non-negative";
}

console.log(check(-5)); // "negative" — console.log never runs
```

## Function Memory Model

```javascript
function greet() {
    console.log("Hello");
}
```

In memory:

```text
┌─────────────────────────────────────┐
│           Global Scope              │
│                                     │
│   greet ────────→ [Function Object] │
│                    ┌──────────────┐ │
│                    │ name: "greet"│ │
│                    │ body: ...    │ │
│                    │ [[Scope]]:   │ │
│                    │  global      │ │
│                    └──────────────┘ │
└─────────────────────────────────────┘
```

Functions are objects. They have properties like `name`, `length`, and `prototype`. They also have an internal `[[Scope]]` property that stores the lexical environment where the function was created.

```javascript
function foo() {}
console.log(foo.name);       // "foo"
console.log(foo.length);     // 0 (number of parameters)
```

## Pure Functions vs Side Effects

### Pure Function

```javascript
function add(a, b) {
    return a + b;
}
```

- Same input → same output.
- No side effects (no mutation, no I/O, no network calls).

### Impure Function (with side effects)

```javascript
let counter = 0;
function increment() {
    counter++;       // modifies external state
    return counter;
}
```

```javascript
function logAndAdd(a, b) {
    console.log("Adding");  // side effect: I/O
    return a + b;
}
```

**Reverse engineering insight:** Pure functions are easier to understand, test, and reverse engineer because they have no hidden dependencies.

## Higher-Order Functions

A function that takes a function as an argument or returns a function.

```javascript
// Takes a function
function operate(a, b, operation) {
    return operation(a, b);
}

const result = operate(5, 3, (x, y) => x + y);
console.log(result); // 8

// Returns a function
function createMultiplier(multiplier) {
    return function(value) {
        return value * multiplier;
    };
}

const double = createMultiplier(2);
console.log(double(5)); // 10
```

## Recursion

A function that calls itself.

```javascript
function factorial(n) {
    if (n <= 1) return 1;      // base case
    return n * factorial(n - 1); // recursive case
}

console.log(factorial(5)); // 120
```

**Call stack for `factorial(3)`:**

```text
factorial(3)
  → 3 * factorial(2)
      → 2 * factorial(1)
          → return 1    (base case)
      → return 2 * 1 = 2
  → return 3 * 2 = 6
```

## Reverse Engineering Questions

### For any function definition

| Question                              | Answer                                               |
|---------------------------------------|------------------------------------------------------|
| Why create this function?             | To encapsulate reusable logic or create a new scope. |
| Can the code be reused?               | If called multiple times, yes. Otherwise, maybe refactor. |
| Who calls it?                         | Trace call sites to understand usage.                |
| What happens if nobody calls it?      | Dead code — wasted memory, no execution.             |
| What is the input (parameters)?       | What data does it need?                              |
| What is the output (return value)?    | What does it produce?                                |
| Are there side effects?               | Does it modify external state?                       |
| Is it pure or impure?                 | Deterministic or not?                                |
| What scope does it capture?           | Check closures and free variables.                   |
| Can it be replaced with an arrow?     | Depends on `this` usage, `arguments`, constructor use. |

### When reverse engineering unknown code

```javascript
function mystery(a, b) {
    return a * b;
}
// Q: What does this do?
// A: Multiplies two numbers — pure function, predictable.

function mystery2() {
    console.log("Hello");
}
// Q: What does this do?
// A: Outputs "Hello" — has side effect (console I/O), no return.
```

---

# Chapter 6 — Parameters and Arguments

## Parameters Are Placeholders

Parameters are variables defined in the function signature that receive values when the function is called.

```javascript
function square(number) {
    // number is a parameter — a local variable
    return number * number;
}
```

## Arguments Are the Actual Values

Arguments are the values passed to the function at call time.

```javascript
square(5);    // 5 is an argument
square(10);   // 10 is an argument
```

## How Parameters and Arguments Match

### Positional Matching

```javascript
function divide(a, b) {
    return a / b;
}

divide(10, 2);  // a=10, b=2 → 5
divide(2, 10);  // a=2, b=10 → 0.2
```

Position matters. The first argument goes to the first parameter, etc.

### Fewer Arguments Than Parameters

```javascript
function greet(name, greeting) {
    console.log(greeting + ", " + name);
}

greet("John");           // "undefined, John" — greeting is undefined
```

Unfilled parameters are `undefined`.

### More Arguments Than Parameters

```javascript
function add(a, b) {
    console.log(a + b);
}

add(1, 2, 3, 4, 5);     // 3 — extra arguments are ignored
```

Extra arguments can be accessed via `arguments` or rest parameters.

## Pass by Value vs Pass by Reference

### Primitives Are Passed by Value

```javascript
function change(x) {
    x = 100;                // reassigns the local parameter
}

let num = 5;
change(num);
console.log(num);           // 5 — unchanged
```

**Memory diagram:**

```text
Before call:              During call:
num ───── 5               num ───── 5
                          x ───── 5 (copy of value)

x = 100:
                          num ───── 5
                          x ───── 100 (local copy changed, original unaffected)
```

### Objects Are Passed by "Value of the Reference"

```javascript
function changeName(user) {
    user.name = "Jane";     // mutates the object
}

let person = { name: "John" };
changeName(person);
console.log(person.name);   // "Jane" — object was mutated
```

**Memory diagram:**

```text
Before call:
person ─────→ { name: "John" }

During call (user = person):
person ─────→ { name: "John" }
user ────────↗

user.name = "Jane":
person ─────→ { name: "Jane" }
user ────────↗
```

### Reassignment Inside Function Does NOT Affect Original

```javascript
function replaceObject(obj) {
    obj = { name: "New" };  // reassigns local parameter
}

let person = { name: "John" };
replaceObject(person);
console.log(person.name);   // "John" — original object unchanged
```

**Memory diagram:**

```text
Before:                         During obj = { name: "New" }:
person ─────→ { name: "John" }  person ─────→ { name: "John" }
                                obj ─────→ { name: "New" }  (new object)
                                Original reference unchanged.
```

## Destructuring Parameters (ES6)

```javascript
// Object destructuring
function greet({ name, age }) {
    console.log(`${name} is ${age} years old`);
}

greet({ name: "John", age: 25 }); // "John is 25 years old"

// Array destructuring
function sum([a, b, c]) {
    return a + b + c;
}

console.log(sum([1, 2, 3])); // 6

// With defaults
function configure({ host = "localhost", port = 8080 } = {}) {
    console.log(`Connecting to ${host}:${port}`);
}

configure({ port: 3000 }); // "Connecting to localhost:3000"
configure();               // "Connecting to localhost:8080"
```

## Reverse Engineering Questions

### For function parameters

| Question                          | Answer                                              |
|-----------------------------------|-----------------------------------------------------|
| Which values enter this function? | The arguments passed at call sites.                 |
| Where do they come from?          | Trace the call sites — variables, literals, results. |
| Can there be multiple inputs?     | Yes, as many parameters as defined (plus rest).     |
| What if a parameter is missing?   | It becomes `undefined`.                              |
| What if extra arguments are passed? | Ignored unless accessed via `arguments` or rest.   |
| Is the parameter mutated?         | Check for reassignment or property mutation.        |
| Is this a pure function?          | Does it depend only on parameters and return a value? |

### Reverse engineering parameter patterns

```javascript
// API callback pattern
function handleResponse(error, data) {
    // Convention: error-first callback
    // First arg: error (null if success)
    // Second arg: data
}

// Options object pattern
function createUser({ name, email, role = "user" }) {
    // Single options object — flexible, self-documenting
}

// Builder pattern with chaining
function configure()
    .setHost("localhost")
    .setPort(3000)
    .build();
```

---

# Chapter 7 — Return Values

## Every Function Returns Something

If no explicit `return` is used, the function returns `undefined`.

```javascript
function noReturn() {
    // no return
}
console.log(noReturn()); // undefined

function justReturn() {
    return;              // empty return
}
console.log(justReturn()); // undefined
```

## The `return` Keyword

`return` does two things:
1. **Produces a value** — the expression after `return` becomes the function's result.
2. **Exits the function** — any code after `return` is not executed.

```javascript
function multiply(a, b) {
    return a * b;
    console.log("This never runs"); // dead code
}

let result = multiply(3, 4);
console.log(result); // 12
```

## Multiple Return Points

```javascript
function classifyNumber(n) {
    if (n > 0) {
        return "positive";
    } else if (n < 0) {
        return "negative";
    } else {
        return "zero";
    }
}
```

## Returning Functions (Closure Factory)

```javascript
function createCounter(start) {
    let count = start;
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter(10);
console.log(counter()); // 11
console.log(counter()); // 12
```

## Early Return Pattern

```javascript
function processUser(user) {
    if (!user) {
        return null;            // early return for invalid input
    }
    if (!user.isActive) {
        return { error: "User inactive" }; // early return for invalid state
    }
    // main logic
    return { success: true, data: user };
}
```

**Advantage:** Avoids deeply nested `if/else` chains. The "happy path" is at the end, not nested inside.

## Return Value Memory

```javascript
function createArray() {
    return [1, 2, 3];    // creates a new array in memory
}

const arr = createArray(); // arr references the returned array
```

Memory:

```text
createArray() call:
   ┌──────────────────┐
   │ creates [1, 2, 3] │
   └────────┬─────────┘
            ↓ returned
arr ───────→ [1, 2, 3]
```

## Reverse Engineering Questions

### For any function

| Question                           | Answer                                                |
|------------------------------------|-------------------------------------------------------|
| Does this function produce output? | Check for `return` keyword. If none, returns `undefined`. |
| Does it modify something instead?  | Check for mutations to parameters or external variables. |
| What if `return` is removed?       | The function becomes `void` — callers will get `undefined`. |
| What is the return type?           | Determined by the returned expression.                 |
| Is the return value used?          | Check call sites — assigned to variable? Passed to another function? |
| Is the return value ignored?       | `someFunction();` — possible bug or intentional side-effect call. |

### Reverse engineering return patterns

```javascript
// Pattern 1: Always returns a value
function add(a, b) { return a + b; }

// Pattern 2: Sometimes returns, sometimes not
function maybe(x) {
    if (x > 0) return x;
    // implicit undefined for x <= 0
}

// Pattern 3: Returns different types
function parse(input) {
    if (input === "true") return true;
    if (input === "1") return 1;
    return input;
}
// Danger: callers must handle multiple return types

// Pattern 4: Returns a function
function getHandler(type) {
    if (type === "admin") return adminHandler;
    return userHandler;
}
```

---

# Chapter 8 — Execution Context

## What Is an Execution Context?

An **execution context** is the environment created when JavaScript code runs. It contains:
- The **variable environment** (local variables, function declarations, parameters).
- The **lexical environment** (scope chain reference).
- The **`this` binding**.
- A reference to the **outer environment**.

## Types of Execution Context

| Type            | Created When                              |
|-----------------|-------------------------------------------|
| Global Context  | When the script first starts running.     |
| Function Context | Each time a function is called.          |
| Eval Context    | When `eval()` is called (rare, avoid).    |

## Global Execution Context

When JavaScript starts running, the global execution context is created:

```javascript
let globalVar = "I am global";

function foo() {
    let localVar = "I am local";
}
```

**Global context:**
```text
Global Execution Context
┌─────────────────────────────────────┐
│ Variable Environment:               │
│   globalVar: "I am global"          │
│   foo: <function reference>         │
│                                     │
│ Outer Environment: null             │
│                                     │
│ this: window (browser) / global (Node) │
└─────────────────────────────────────┘
```

## Function Execution Context

Each function call creates a new execution context:

```javascript
function greet(name) {
    let message = "Hello, " + name;
    return message;
}

greet("John");
```

**When `greet("John")` is called:**

```text
Function Execution Context for greet("John")
┌─────────────────────────────────────┐
│ Variable Environment:               │
│   name: "John" (parameter)          │
│   message: "Hello, John"            │
│                                     │
│ Outer Environment: Global EC         │
│                                     │
│ this: depends on how called         │
│   (global object in strict mode,    │
│    or window in non-strict)         │
└─────────────────────────────────────┘
```

## Execution Context Lifecycle

1. **Creation Phase:**
   - Create the variable object (arguments, parameters, declarations).
   - Set up the scope chain.
   - Determine the `this` value.

2. **Execution Phase:**
   - Execute code line by line.
   - Assign values to variables.

```javascript
function example(a) {
    var b = 10;
    let c = 20;
    function inner() {}
}
```

**Creation phase for `example(5)`:**

```text
Variable Environment after creation:
  a: 5 (parameter)
  b: undefined (var hoisting)
  inner: function reference (function declaration hoisting)
  c: <uninitialized> (let — TDZ)
```

**During execution:**

```text
b = 10;
c = 20;  // TDZ ends for c
```

## Execution Context and Memory

Each context is stored on the **call stack** (see Chapter 9). When a function returns, its context is popped from the stack and becomes eligible for garbage collection — **unless** something outside still references variables inside (closure).

## Reverse Engineering Questions

### For any function

| Question                                    | Answer                                                 |
|---------------------------------------------|--------------------------------------------------------|
| Which variables belong to this function?    | Parameters, local declarations (`let`, `const`, `var`). |
| When are they created?                      | At the creation phase of this execution context.        |
| When are they destroyed?                   | When the execution context is popped from the stack (unless closure). |
| What is the outer environment?              | Where this function was defined (lexical scope).        |
| What is `this` bound to?                   | Depends on how the function was called.                 |
| How many execution contexts exist now?      | Count the call stack depth.                             |

### Debugging with execution context in mind

```javascript
function debugExample() {
    let x = 10;
    debugger; // pause here — inspect current context
    let y = 20;
}
```

Use the debugger to inspect:
- **Local variables** (current context).
- **Scope chain** (closures, parent scopes).
- **`this`** binding.
- **Call stack** (all active contexts).

---

# Chapter 9 — Call Stack

## What Is the Call Stack?

The **call stack** is a data structure that tracks the execution of function calls. It works on the **LIFO** (Last In, First Out) principle — the last function pushed onto the stack is the first one popped off.

## How the Call Stack Works

```javascript
function one() {
    two();
}

function two() {
    three();
}

function three() {
    console.log("Done");
}

one();
```

### Step-by-step stack visualization

**Step 1: Global context is created**

```text
Call Stack (bottom → top):
┌─────────────────────┐
│  Global Context      │
└─────────────────────┘
```

**Step 2: `one()` is called**

```text
┌─────────────────────┐
│  one() EC           │  ← top (most recent)
├─────────────────────┤
│  Global Context      │
└─────────────────────┘
```

**Step 3: `one()` calls `two()`**

```text
┌─────────────────────┐
│  two() EC           │  ← top
├─────────────────────┤
│  one() EC           │
├─────────────────────┤
│  Global Context      │
└─────────────────────┘
```

**Step 4: `two()` calls `three()`**

```text
┌─────────────────────┐
│  three() EC         │  ← top
├─────────────────────┤
│  two() EC           │
├─────────────────────┤
│  one() EC           │
├─────────────────────┤
│  Global Context      │
└─────────────────────┘
```

**Step 5: `three()` finishes, is popped**

```text
┌─────────────────────┐
│  two() EC           │  ← top
├─────────────────────┤
│  one() EC           │
├─────────────────────┤
│  Global Context      │
└─────────────────────┘
```

**Step 6: `two()` finishes, is popped**

```text
┌─────────────────────┐
│  one() EC           │  ← top
├─────────────────────┤
│  Global Context      │
└─────────────────────┘
```

**Step 7: `one()` finishes, is popped**

```text
┌─────────────────────┐
│  Global Context      │
└─────────────────────┘
```

## Call Stack and Recursion

Recursion uses the call stack intensively:

```javascript
function countdown(n) {
    if (n <= 0) {
        console.log("Done");
        return;
    }
    console.log(n);
    countdown(n - 1);
}

countdown(3);
```

**Stack at its deepest point (when `n = 0`):**

```text
┌─────────────────────┐
│  countdown(0) EC    │  ← top
├─────────────────────┤
│  countdown(1) EC    │
├─────────────────────┤
│  countdown(2) EC    │
├─────────────────────┤
│  countdown(3) EC    │
├─────────────────────┤
│  Global Context      │
└─────────────────────┘
```

## Stack Overflow

If recursion never reaches a base case (or the base case is too deep), the stack runs out of space:

```javascript
function infinite() {
    infinite(); // no base case
}

infinite(); // RangeError: Maximum call stack size exceeded
```

**Typical stack size limits:**

| Environment | Approximate Limit |
|-------------|------------------|
| Node.js     | ~10,000 frames   |
| Chrome      | ~10,000 frames   |
| Firefox     | ~30,000 frames   |

## Call Stack and Error Messages

When an error is thrown, the call stack is included in the stack trace:

```javascript
function a() { b(); }
function b() { c(); }
function c() { throw new Error("Something broke"); }

a();
```

**Error output:**

```
Error: Something broke
    at c (file.js:4:11)
    at b (file.js:2:21)
    at a (file.js:1:21)
    at Object.<anonymous> (file.js:6:1)
```

The stack trace shows the path from the error back to the entry point. This is invaluable for reverse engineering.

## Call Stack and Asynchronous Code

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

console.log("End");
```

**Output:**
```
Start
End
Timeout
```

**Why?** The `setTimeout` callback is placed in the **task queue**, not on the call stack. It runs only after the call stack is empty.

```
Call Stack:                          Task Queue:
┌─────────────────────┐              ┌──────────────┐
│  Global Context      │              │ callback()   │
│  console.log("Start")│              └──────────────┘
│  setTimeout(...)      │              
│  console.log("End")   │              
└─────────────────────┘              
                                    (After global context pops)
Call Stack:                          Task Queue:
┌─────────────────────┐              ┌──────────────┐
│  callback() EC      │              │ (empty)      │
│  console.log("Timeout")│            └──────────────┘
└─────────────────────┘              
```

## Reverse Engineering Questions

### For call stack analysis

| Question                          | Answer                                              |
|-----------------------------------|-----------------------------------------------------|
| Which function entered first?     | The bottom of the call stack (global, then first function called). |
| Which function exits first?       | The top of the call stack (most recently called).   |
| What happens during recursion?    | The same function appears multiple times on the stack with different parameters. |
| How deep is my recursion?         | The number of identical frames on the stack.        |
| What happens on stack overflow?   | `RangeError: Maximum call stack size exceeded`.     |
| How can I inspect the call stack? | - `console.trace()` prints current stack.<br>- Debugger shows call stack panel.<br>- Error objects contain `.stack`. |

### Practical call stack inspection

```javascript
function traceCallStack() {
    console.trace("Current stack trace");
}

function first() { second(); }
function second() { third(); }
function third() { traceCallStack(); }

first();
```

Output:
```
Trace: Current stack trace
    at traceCallStack (file.js:2:13)
    at third (file.js:8:5)
    at second (file.js:7:5)
    at first (file.js:6:5)
    at Object.<anonymous> (file.js:10:1)
```

---

# Chapter 10 — Lexical Environment

## What Is Lexical Environment?

**Lexical environment** is the internal JavaScript structure that maps variable names to their values within a scope. It consists of:
- An **environment record** (where variables are stored).
- A reference to the **outer environment** (parent scope).

## Lexical Nesting (Scope Chain)

Variables are resolved by searching **outward** through nested lexical environments.

```javascript
let country = "USA";            // global lexical env

function outer() {
    let city = "Boston";        // outer's lexical env

    function inner() {
        let street = "Main St"; // inner's lexical env
        console.log(street);    // found in inner
        console.log(city);      // not in inner → search outer → found
        console.log(country);   // not in inner or outer → search global → found
    }

    inner();
}

outer();
```

**Lexical environment chain:**

```text
inner() Lexical Environment
┌───────────────────────────────┐
│ Environment Record:           │
│   street: "Main St"           │
│                               │
│ Outer: outer() Lexical Env    │
└──────────┬────────────────────┘
           │ reference ([[OuterEnv]])
           ↓
outer() Lexical Environment
┌───────────────────────────────┐
│ Environment Record:           │
│   city: "Boston"              │
│                               │
│ Outer: Global Lexical Env     │
└──────────┬────────────────────┘
           │ reference
           ↓
Global Lexical Environment
┌───────────────────────────────┐
│ Environment Record:           │
│   country: "USA"              │
│   outer: <function>           │
│   inner: <function>           │
│                               │
│ Outer: null                   │
└───────────────────────────────┘
```

## Lexical vs Dynamic Scope

JavaScript uses **lexical (static) scoping** — where a variable is accessible is determined by where the function is **defined**, not where it is **called**.

```javascript
let x = "global";

function foo() {
    console.log(x);  // "global" (lexical: wherever foo is defined)
}

function bar() {
    let x = "local";
    foo();           // "global" — not "local"!
}

bar();
```

**Contrast with dynamic scoping (hypothetical):**

```javascript
// If JavaScript were dynamically scoped:
function bar() {
    let x = "local";
    foo();           // would print "local" — scope from caller
}
```

JavaScript's lexical scoping means you can determine scope just by reading the code structure, without knowing the call chain.

## Lexical Environment and Closures

When a function is defined, it captures the current lexical environment. This is the foundation of closures.

```javascript
function createCounter() {
    let count = 0;           // in createCounter's lexical env

    return function() {      // this inner function captures the env
        count++;             // accesses count from outer env
        return count;
    };
}

const counter = createCounter();
```

Even though `createCounter()` has finished executing, its lexical environment is preserved because the returned function still references it.

## The `[[Environment]]` Internal Slot

When a function is created, it gets an internal `[[Environment]]` reference pointing to the current lexical environment. This is how closures remember where they were born.

```javascript
function greet(name) {
    return function() {
        console.log("Hello, " + name);
    };
}

const sayHi = greet("John");
// sayHi.[[Environment]] → greet's lexical environment
// which contains name: "John"
```

## Reverse Engineering Questions

### For lexical environment

| Question                               | Answer                                              |
|----------------------------------------|-----------------------------------------------------|
| Where will JavaScript search next?     | The outer (parent) lexical environment.             |
| Does this variable exist locally?      | Check current environment record first.             |
| If not local, search parent scope?     | Follow the `[[OuterEnv]]` reference.                |
| If not found anywhere?                 | `ReferenceError` — variable is not defined.         |
| Is this lexical scope or dynamic?      | Lexical — determined by code structure, not call chain. |
| What does the environment chain look like? | Walk from current scope up to global.           |

### Reverse engineering scope resolution

```javascript
const a = 1;
function one() {
    const b = 2;
    function two() {
        const c = 3;
        console.log(a); // where is a found?
        // 1: own env (two) — no
        // 2: parent env (one) — no
        // 3: global env — yes! a = 1
    }
    two();
}
one();
```

---

# Chapter 11 — Closures

## What Is a Closure?

A **closure** is a function that **remembers** the variables from its lexical scope even after the outer function has finished executing.

```javascript
function outer() {
    let count = 0;

    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}

let counter = outer();

counter(); // 1
counter(); // 2
counter(); // 3
```

## Why Does This Work?

Normally, when `outer()` finishes, its local variables (`count`) would be garbage collected. But because `inner()` still references `count`, and `inner()` is returned and assigned to `counter`, the variable `count` is **preserved in memory**.

## Closure Memory Diagram

```text
After outer() returns:

counter ──────→ inner function object
                 ┌────────────────────┐
                 │ [[Environment]] →  │  ─── preserves outer's env
                 │ name: "inner"      │
                 └────────────────────┘

Preserved Lexical Environment:
┌─────────────────────────────┐
│ count: 3                    │  ← still alive!
└─────────────────────────────┘
```

## Practical Uses of Closures

### 1. Data Privacy (Module Pattern)

```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance;  // private variable

    return {
        deposit: function(amount) {
            balance += amount;
            console.log(`Deposited ${amount}. Balance: ${balance}`);
        },
        withdraw: function(amount) {
            if (amount > balance) {
                console.log("Insufficient funds");
                return;
            }
            balance -= amount;
            console.log(`Withdrew ${amount}. Balance: ${balance}`);
        },
        getBalance: function() {
            return balance;
        }
    };
}

const account = createBankAccount(1000);
account.deposit(500);        // Deposited 500. Balance: 1500
account.withdraw(2000);      // Insufficient funds
console.log(account.balance); // undefined — balance is private
console.log(account.getBalance()); // 1500 — access through closure
```

**Key insight:** There is NO way to access `balance` from outside except through the returned methods. This is true encapsulation.

### 2. Function Factories

```javascript
function multiplyBy(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

Each returned function closes over its own `factor`.

### 3. Event Handlers

```javascript
function createButtonHandler(buttonId) {
    return function() {
        console.log(`Button ${buttonId} clicked`);
    };
}

document.getElementById("btn1")
    .addEventListener("click", createButtonHandler(1));
document.getElementById("btn2")
    .addEventListener("click", createButtonHandler(2));
```

### 4. Partial Application (Currying)

```javascript
function log(level) {
    return function(message) {
        console.log(`[${level}] ${message}`);
    };
}

const info = log("INFO");
const warn = log("WARN");
const error = log("ERROR");

info("System started");  // [INFO] System started
error("Crash!");         // [ERROR] Crash!
```

### 5. Iterators

```javascript
function createRange(start, end) {
    let current = start;
    return {
        next: function() {
            if (current > end) {
                return { done: true };
            }
            return { value: current++, done: false };
        }
    };
}

const range = createRange(1, 5);
console.log(range.next()); // { value: 1, done: false }
console.log(range.next()); // { value: 2, done: false }
// ...
```

## Closure and Memory

Closures keep variables alive. This is powerful but can cause **memory leaks** if not managed:

```javascript
function createLeak() {
    let largeData = new Array(1000000).fill("💣");

    return function() {
        console.log("I reference largeData:", largeData.length);
        // largeData cannot be garbage collected as long as this function exists
    };
}

const leaky = createLeak();
// largeData is 1 million elements, still in memory!
```

**To free closure memory:** Set the closure reference to `null`:

```javascript
leaky = null; // now largeData can be garbage collected
```

## Classic Closure Problem (Loop with `var`)

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i); // 5, 5, 5, 5, 5
    }, i * 1000);
}
```

**Why?** All 5 timeouts share the same `i` variable (function-scoped `var`). By the time the callbacks execute, the loop has finished and `i` = 5.

**Solutions:**

### Solution 1: IIFE (Pre-ES6)

```javascript
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j); // 0, 1, 2, 3, 4
        }, j * 1000);
    })(i);
}
```

Each IIFE creates a new scope with its own `j`.

### Solution 2: `let` (ES6)

```javascript
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i); // 0, 1, 2, 3, 4
    }, i * 1000);
}
```

`let` creates a new binding for each iteration.

## Reverse Engineering Questions

### For closures

| Question                                | Answer                                              |
|-----------------------------------------|-----------------------------------------------------|
| Why wasn't the variable destroyed?      | Because a function still references it (closure).   |
| Who still references it?                | The inner function returned or passed elsewhere.    |
| What memory remains alive?              | The entire lexical environment chain that is referenced. |
| How long does it live?                  | As long as the closure function exists.             |
| Can I access the closed-over variable?  | Only through the closure function's methods (encapsulated). |
| Is this intentional or a memory leak?   | Intentional if needed for state. Leak if unneeded but retained. |

### Detecting closures in unknown code

```javascript
function detectClosure() {
    let secret = "hidden";

    return {
        getSecret: function() {
            return secret;
        }
    };
}

const obj = detectClosure();
// obj.getSecret still has access to secret
// Even though detectClosure() finished long ago
```

**Signs of a closure:**
1. A function returns another function.
2. A function references variables from its outer scope.
3. Variables remain accessible after the outer function exits.
4. Multiple calls to the same factory produce independent state.

---

# Chapter 12 — Arrays

## What Is an Array?

An **array** is an ordered collection of values. Arrays in JavaScript are dynamic (can grow/shrink) and can hold mixed types.

```javascript
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, null, { name: "John" }, [1, 2]];
```

## Array Creation

```javascript
// Literal syntax (preferred)
const arr = [1, 2, 3];

// Array constructor
const arr2 = new Array(3);     // [empty × 3] — length 3, no elements
const arr3 = new Array(1, 2);  // [1, 2]

// Array.of
const arr4 = Array.of(3);      // [3] — avoids the single-number constructor issue

// Array.from
const arr5 = Array.from("hello"); // ["h", "e", "l", "l", "o"]
const arr6 = Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]

// Spread operator
const arr7 = [...[1, 2], 3];   // [1, 2, 3]
```

## Array Memory

```javascript
let numbers = [1, 2, 3];
```

Memory:

```text
numbers
  ↓
┌──────────────────────────────────────────┐
│ Array Object                             │
│ ┌────┬────┬────┬────┬────┬────┬────┬─── │
│ │ 0  │ 1  │ 2  │ 3  │ 4  │... │     │   │
│ ├────┼────┼────┼────┼────┼────┼────┼─── │
│ │ 1  │ 2  │ 3  │    │    │    │     │   │
│ └────┴────┴────┴────┴────┴────┴────┴─── │
│ length: 3                                 │
└──────────────────────────────────────────┘
```

Arrays are objects under the hood. The indices are property keys (`"0"`, `"1"`, `"2"`). The `length` property is automatically updated.

## Accessing Elements

```javascript
const fruits = ["apple", "banana", "cherry"];

fruits[0]    // "apple"
fruits[1]    // "banana"
fruits[fruits.length - 1] // "cherry"
fruits[100]  // undefined — no error, just undefined
```

## Adding and Removing Elements

### End of Array

```javascript
const arr = [1, 2];
arr.push(3);        // [1, 2, 3] — adds to end (returns new length)
arr.pop();          // [1, 2] — removes from end (returns removed element)
```

### Beginning of Array

```javascript
arr.unshift(0);     // [0, 1, 2] — adds to front (returns new length)
arr.shift();        // [1, 2] — removes from front (returns removed element)
```

**Performance note:** `unshift` and `shift` are O(n) — they re-index all elements. `push` and `pop` are O(1).

### Middle of Array

```javascript
// splice — the swiss army knife
const arr = [1, 2, 3, 4, 5];

arr.splice(2, 1);            // removes 1 element at index 2 → [1, 2, 4, 5]
arr.splice(2, 0, "a", "b");  // inserts at index 2 → [1, 2, "a", "b", 4, 5]
arr.splice(2, 2, "x");       // replaces 2 elements at index 2 → [1, 2, "x", 5]
```

## Iterating Over Arrays

```javascript
const arr = [10, 20, 30];

// for loop (most control)
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// for...of (ES6 — values)
for (const value of arr) {
    console.log(value);
}

// forEach
arr.forEach((value, index) => {
    console.log(index, value);
});

// while
let i = 0;
while (i < arr.length) {
    console.log(arr[i]);
    i++;
}
```

## Array Methods — Transformation

```javascript
const arr = [1, 2, 3, 4, 5];

// map — create new array by transforming each element
const doubled = arr.map(x => x * 2);     // [2, 4, 6, 8, 10]

// filter — keep elements that pass a test
const evens = arr.filter(x => x % 2 === 0); // [2, 4]

// reduce — accumulate values
const sum = arr.reduce((acc, x) => acc + x, 0); // 15
const max = arr.reduce((acc, x) => x > acc ? x : acc, -Infinity); // 5

// flatMap — map then flatten one level
const pairs = arr.flatMap(x => [x, x * 2]);
// [1, 2, 2, 4, 3, 6, 4, 8, 5, 10]
```

## Array Methods — Searching

```javascript
const arr = [10, 20, 30, 40, 50];

arr.indexOf(30);         // 2
arr.indexOf(100);        // -1
arr.includes(30);        // true
arr.find(x => x > 25);   // 30 (first match)
arr.findIndex(x => x > 25); // 2
arr.some(x => x > 40);   // true (at least one matches)
arr.every(x => x > 0);   // true (all match)
```

## Array Methods — Slicing and Splicing

```javascript
const arr = [1, 2, 3, 4, 5];

// slice — creates a new array (does NOT modify original)
arr.slice(1, 3);     // [2, 3]  (from index 1 to before index 3)
arr.slice(2);        // [3, 4, 5] (from index 2 to end)
arr.slice(-2);       // [4, 5]  (last 2 elements)

// splice — modifies the original array
arr.splice(1, 2);    // removes 2 elements starting at index 1
// arr is now [1, 4, 5]
```

## Array Methods — Ordering

```javascript
const arr = [3, 1, 4, 1, 5, 9, 2, 6];

arr.sort();          // [1, 1, 2, 3, 4, 5, 6, 9] (lexicographic by default!)

// Numeric sort (correct)
arr.sort((a, b) => a - b);   // ascending
arr.sort((a, b) => b - a);   // descending

arr.reverse();       // reverses in place
```

**Important:** `sort()` converts elements to strings by default! `[1, 10, 2].sort()` → `[1, 10, 2]` (because "10" < "2" lexicographically).

## Array Methods — Joining and Splitting

```javascript
// join — array → string
["a", "b", "c"].join("-");  // "a-b-c"
["a", "b", "c"].join("");   // "abc"
[1, 2, 3].join();           // "1,2,3"

// split — string → array
"a,b,c".split(",");         // ["a", "b", "c"]
"hello".split("");          // ["h", "e", "l", "l", "o"]
```

## Multidimensional Arrays

```javascript
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

matrix[0][1]; // 2
matrix[2][2]; // 9
```

## Arrays Are Objects

```javascript
const arr = [1, 2, 3];
typeof arr;              // "object"
arr instanceof Array;    // true
Array.isArray(arr);      // true (recommended check)

arr["key"] = "value";    // works — arrays are objects
arr.length;              // still 3 (non-numeric keys don't affect length)
```

## Reverse Engineering Questions

### For arrays

| Question                            | Answer                                              |
|-------------------------------------|-----------------------------------------------------|
| Why array instead of object?        | Need ordered collection with numeric indices.       |
| Why does order matter?              | Position indicates sequence or priority.            |
| Which index stores what value?      | Trace by numeric index position.                    |
| Is this array homogeneous or mixed? | Same type throughout? Or varied types (usually indicates flexibility or poor design)? |
| What is the length?                 | Number of elements.                                  |
| Is the array mutated?               | Check if methods like `push`, `pop`, `splice`, `sort`, `reverse` are called. |
| Are methods chained?                | `arr.filter(...).map(...).reduce(...)` — functional pipeline. |

### Reverse engineering array operations

```javascript
const result = arr
    .filter(x => x.active)        // step 1: keep active items
    .map(x => x.name)             // step 2: extract names
    .sort();                      // step 3: sort alphabetically

// This is equivalent to:
// 1. Create filtered array
// 2. Create mapped array from filtered
// 3. Sort the mapped array

// Each step creates a NEW array (immutable pattern)
```

---

# Chapter 13 — Objects

## What Is an Object?

An **object** is a collection of key-value pairs (properties). Keys are strings (or Symbols), values can be any type.

```javascript
let user = {
    name: "John",
    age: 25,
    isActive: true
};
```

## Object Memory

```javascript
let user = { name: "John", age: 25 };
```

Memory:

```text
user
  ↓
┌──────────────────────────────┐
│ Object (heap)                │
│ ┌──────────────────────────┐ │
│ │ name: "John"             │ │
│ │ age: 25                  │ │
│ │ __proto__: Object.prototype│ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

The variable `user` holds a **reference** to the object in heap memory.

## Accessing Properties

```javascript
const user = { name: "John", age: 25 };

// Dot notation
user.name;   // "John"

// Bracket notation
user["name"]; // "John"

// Bracket notation with variable
const key = "age";
user[key];    // 25

// Computed property names (ES6)
const dynamicKey = "status";
const obj = {
    [dynamicKey]: "active"
};
// obj.status = "active"
```

## Adding and Modifying Properties

```javascript
const user = { name: "John" };

user.age = 25;           // add new property
user["isActive"] = true; // add with bracket notation

user.name = "Jane";      // modify existing property

// Using Object.assign
Object.assign(user, { role: "admin", age: 30 });

// Using spread (creates new object)
const updatedUser = { ...user, age: 30 };
```

## Deleting Properties

```javascript
const user = { name: "John", age: 25, temp: "remove me" };

delete user.temp;            // true (property removed)
delete user.nonexistent;     // true (no error)
delete user;                 // false (cannot delete variable)
```

## Checking Property Existence

```javascript
const user = { name: "John" };

"name" in user;              // true (checks own + inherited)
"toString" in user;          // true (inherited from Object.prototype)

user.hasOwnProperty("name"); // true (own property only)
user.hasOwnProperty("toString"); // false (inherited)

user.name !== undefined;     // true, but false if value is undefined

// Optional chaining (ES2020)
user?.address?.city;         // undefined instead of TypeError
```

## Methods

Functions as object properties are called **methods**.

```javascript
const user = {
    name: "John",
    greet: function() {
        console.log("Hello, " + this.name);
    },
    // Method shorthand (ES6)
    sayHi() {
        console.log("Hi, " + this.name);
    },
    // Arrow function (NOT a method — no own this)
    sayBye: () => {
        console.log("Bye, " + this.name); // this refers to surrounding scope, not user
    }
};

user.greet(); // "Hello, John"
user.sayHi(); // "Hi, John"
user.sayBye(); // "Bye, undefined" (because this is not user)
```

## Object Iteration

```javascript
const user = { name: "John", age: 25, city: "Boston" };

// for...in — iterates keys (including inherited)
for (const key in user) {
    if (user.hasOwnProperty(key)) {   // filter inherited
        console.log(key, user[key]);
    }
}

// Object.keys — returns array of own keys
Object.keys(user);     // ["name", "age", "city"]

// Object.values — returns array of own values
Object.values(user);   // ["John", 25, "Boston"]

// Object.entries — returns array of [key, value] pairs
Object.entries(user);  // [["name","John"], ["age",25], ["city","Boston"]]

// Iterate entries
Object.entries(user).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});
```

## Property Descriptors

Every property has a **descriptor** that defines its behavior:

```javascript
const user = { name: "John" };

const descriptor = Object.getOwnPropertyDescriptor(user, "name");
// {
//   value: "John",
//   writable: true,   // can be changed
//   enumerable: true, // appears in for...in and Object.keys
//   configurable: true // can be deleted or descriptor changed
// }

// Define property with custom descriptor
Object.defineProperty(user, "id", {
    value: 12345,
    writable: false,    // read-only
    enumerable: false,  // hidden from iteration
    configurable: false // cannot be reconfigured or deleted
});
```

## Object Destructuring (ES6)

```javascript
const user = { name: "John", age: 25, city: "Boston" };

// Basic destructuring
const { name, age } = user;
console.log(name, age); // "John", 25

// Renaming
const { name: userName, age: userAge } = user;
console.log(userName, userAge); // "John", 25

// Default values
const { name, role = "user" } = user;
console.log(role); // "user"

// Rest of object
const { name, ...rest } = user;
console.log(rest); // { age: 25, city: "Boston" }

// Nested destructuring
const person = { address: { city: "NYC", zip: 10001 } };
const { address: { city } } = person;
console.log(city); // "NYC"
```

## Object Shorthand (ES6)

```javascript
const name = "John";
const age = 25;

// Shorthand property
const user = { name, age }; // same as { name: name, age: age }

// Shorthand method
const obj = {
    toString() { return "custom"; } // same as toString: function() { ... }
};
```

## Object Spread (ES2018)

```javascript
const defaults = { host: "localhost", port: 8080, secure: false };
const config = { ...defaults, port: 3000, secure: true };

// config = { host: "localhost", port: 3000, secure: true }
// Later properties override earlier ones
```

## Factory Functions

```javascript
function createUser(name, age) {
    return {
        name,
        age,
        greet() {
            console.log(`Hello, I'm ${this.name}`);
        }
    };
}

const user1 = createUser("Alice", 30);
const user2 = createUser("Bob", 25);
```

## Reverse Engineering Questions

### For objects

| Question                            | Answer                                              |
|-------------------------------------|-----------------------------------------------------|
| Why an object instead of an array?  | Named keys for semantic access; order not important. |
| Why not an array?                   | Arrays are for ordered, numeric-indexed collections. |
| Which property stores what data?    | Read property names to understand data structure.    |
| What is the shape of this object?   | What keys does it have? What types are the values?  |
| Is there inheritance?               | Check `__proto__`, `instanceof`, or inherited methods. |
| Is the object mutable?              | Unless frozen/sealed, objects are mutable.           |
| Is this a plain object or class instance? | Check `constructor`, `instanceof`, `prototype`. |

### Reverse engineering unknown object

```javascript
const data = {
    id: 42,
    name: "Widget",
    price: 9.99,
    categories: ["tools", "hardware"],
    inStock: true,
    dimensions: { width: 10, height: 5 }
};
// This is likely a product object with nested dimensions object.
```

---

# Chapter 14 — Reference vs Value

## The Fundamental Distinction

JavaScript has two categories of values:

| Category   | Types                           | Storage     | Behavior                |
|------------|---------------------------------|-------------|-------------------------|
| Primitive  | number, string, boolean, null, undefined, symbol, bigint | Stack (value) | Copied by value  |
| Reference  | object, array, function         | Heap (object) | Copied by reference |

## Primitives Are Copied by Value

```javascript
let a = 10;
let b = a;    // b gets a COPY of the value 10

b = 20;

console.log(a); // 10 — unchanged
console.log(b); // 20
```

**Memory:**

```text
a → 10
b → 10   (separate copy)

After b = 20:
a → 10   (unchanged)
b → 20
```

## Objects Are Copied by Reference

```javascript
let x = { age: 20 };
let y = x;     // y gets a COPY OF THE REFERENCE, not a new object

y.age = 50;

console.log(x.age); // 50 — changed!
console.log(y.age); // 50
```

**Memory:**

```text
x ──┐
    ├──→ { age: 20 }
y ──┘

After y.age = 50:
x ──┐
    ├──→ { age: 50 } (same object, modified)
y ──┘
```

## Comparing Primitives vs References

```javascript
// Primitives — compared by value
5 === 5;                    // true
"hello" === "hello";        // true

// Objects — compared by reference
{} === {};                  // false (different objects, different references)
[] === [];                  // false

const a = {};
const b = a;
a === b;                    // true (same reference)
```

## Reassignment vs Mutation

**Reassignment:** Changing what a variable points to.

```javascript
let obj = { value: 1 };
obj = { value: 2 };  // obj now points to a new object; old object may be garbage collected
```

**Mutation:** Changing the contents of the object that a variable points to.

```javascript
const obj = { value: 1 };
obj.value = 2;       // obj still points to the same object; contents changed
```

### Visual Distinction

```text
Reassignment:
obj ───→ { value: 1 }   (old object)
obj ───→ { value: 2 }   (new object assigned)

Mutation:
obj ───→ { value: 1 } → { value: 2 }  (same object, property changed)
```

## Function Parameters — Pass by Value (of Reference)

This is a common point of confusion. JavaScript is **always pass-by-value**.

- For primitives, the value itself is copied.
- For objects, the reference (a memory address) is copied.

```javascript
function modify(obj) {
    obj.value = "changed";  // mutates the original object
    obj = {};               // reassigns local parameter — does NOT affect original
}

const original = { value: "original" };
modify(original);

console.log(original.value); // "changed" — mutation worked
console.log(original);       // { value: "changed" } — reassignment inside function did nothing
```

**Visual:**

```text
During modify(original):

Outside:                Inside (at start):
original ───→ {value: "original"} ←── obj

Inside (after mutation):
original ───→ {value: "changed"} ←── obj

Inside (after reassignment):
original ───→ {value: "changed"}
obj ───→ {}  (new object, local only)
```

## Detecting Value vs Reference

```javascript
function detectBehavior(value) {
    if (typeof value === "object" && value !== null) {
        console.log("Reference type — mutations affect original");
    } else {
        console.log("Primitive type — copied by value");
    }
}
```

## Reverse Engineering Questions

### For any variable assignment

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this value primitive or reference? | Check the type.                                     |
| Is this copied or shared?             | Primitives: independent copy. Objects: shared reference. |
| Are two variables pointing to the same memory? | If both reference the same object, mutating one affects the other. |
| What happens when I reassign?         | Primitives: no effect on other variables. References: other variables still point to old object. |
| What happens when I mutate?           | Primitives: cannot mutate (immutable). References: all references see the mutation. |

### Value vs Reference — practical detection

```javascript
let a = 5;
let b = a;
b = 10;
// a is still 5 — independent

let x = [1, 2];
let y = x;
y.push(3);
// x is now [1, 2, 3] — shared reference
```

---

# Chapter 15 — Shallow Copy

## What Is Shallow Copy?

A **shallow copy** creates a new object that copies the top-level properties. For nested objects and arrays, the **references** are copied, not the nested objects themselves.

```javascript
const original = {
    name: "John",
    age: 25,
    address: {
        city: "Boston",
        zip: 10001
    },
    hobbies: ["reading", "coding"]
};
```

## Methods for Shallow Copy

### 1. Object Spread (ES2018)

```javascript
const copy = { ...original };

copy.name = "Jane";           // OK — independent at top level
copy.address.city = "NYC";   // Also changes original.address.city!
```

### 2. Object.assign

```javascript
const copy = Object.assign({}, original);
// Same behavior as spread
```

### 3. Array Spread

```javascript
const arr = [1, 2, { a: 1 }];
const arrCopy = [...arr];

arrCopy[0] = 10;        // OK — independent
arrCopy[2].a = 99;      // Also changes original[2].a!
```

### 4. Array.prototype.slice

```javascript
const arrCopy = arr.slice();
```

### 5. Array.prototype.concat

```javascript
const arrCopy = [].concat(arr);
```

## The Shallow Copy Problem

```javascript
const original = {
    nested: { value: 42 }
};

const copy = { ...original };

copy.nested.value = 100;

console.log(original.nested.value); // 100 — the nested object is SHARED
```

**Memory:**

```text
original ───→ { nested: ──→ { value: 42 } }
copy ───────→ { nested: ──↗
                        (same nested object!)
```

## When Shallow Copy Is Sufficient

```javascript
// Flat object — no nesting
const flat = { a: 1, b: 2, c: 3 };
const flatCopy = { ...flat }; // fully independent — all primitives

// Array of primitives
const numbers = [1, 2, 3, 4, 5];
const numbersCopy = [...numbers]; // fully independent
```

## Reverse Engineering Questions

### For shallow copy

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this a shallow copy?               | Check if using spread, Object.assign, or slice — all shallow. |
| Are there nested objects?             | If yes, they are shared between original and copy.  |
| Does mutating the copy affect the original? | Only nested objects/arrays share memory.      |
| What level of nesting is independent? | Top-level primitives are independent. Nested objects/arrays share references. |

---

# Chapter 16 — Deep Copy

## What Is Deep Copy?

A **deep copy** creates a completely independent clone. No references are shared between original and copy at any level of nesting.

```javascript
const original = {
    name: "John",
    address: {
        city: "Boston",
        coordinates: { lat: 42.36, lng: -71.06 }
    },
    hobbies: ["reading", "coding"]
};

const deep = deepCopy(original); // hypothetical

deep.address.city = "NYC";
console.log(original.address.city); // "Boston" — unaffected
```

## Methods for Deep Copy

### 1. `structuredClone()` (ES2023 / available in modern runtimes)

```javascript
const deep = structuredClone(original);
```

**Advantages:**
- Handles circular references.
- Preserves `Date`, `Map`, `Set`, `RegExp`, `ArrayBuffer`, etc.
- Built-in, no dependencies.

**Limitations:**
- Cannot clone functions, DOM nodes, `WeakMap`, `WeakSet`, `Symbol` properties.
- Not available in older browsers/Node < 17.

### 2. `JSON.parse(JSON.stringify(obj))`

```javascript
const deep = JSON.parse(JSON.stringify(original));
```

**Advantages:**
- Works everywhere.
- Simple.

**Limitations:**
- Loses `undefined`, `Symbol`, functions.
- Loses special objects: `Date` becomes string, `RegExp` becomes `{}`.
- Cannot handle circular references (throws error).
- `NaN` and `Infinity` become `null`.

### 3. Manual Recursive Copy

```javascript
function deepCopy(value) {
    if (value === null || typeof value !== "object") {
        return value; // primitive — return as-is
    }

    if (Array.isArray(value)) {
        return value.map(item => deepCopy(item));
    }

    const result = {};
    for (const key of Object.keys(value)) {
        result[key] = deepCopy(value[key]);
    }
    return result;
}
```

### 4. Third-party libraries

```javascript
// Lodash
import _ from "lodash";
const deep = _.cloneDeep(original);
```

## Deep Copy with Circular References

```javascript
const circular = { name: "circular" };
circular.self = circular;

// JSON.parse(JSON.stringify(circular)) — TypeError: Converting circular structure to JSON
structuredClone(circular); // Works!
```

## Deep Copy Memory

```text
Original:                          Deep Copy:

original ───→ { name: "John" }    deep ───→ { name: "John" }
               ┌──────────┐                  ┌──────────┐
               │ address ───→ { city: }      │ address ───→ { city: }
               └──────────┘                  └──────────┘
                             ↑ DIFFERENT objects ↑
```

## Performance Considerations

- Deep copy is O(n) where n is the total number of properties across all nesting levels.
- `structuredClone()` is optimized native code — prefer it.
- `JSON` round-trip involves serialization + parsing — slower but universal.
- Deep copies on large objects can be expensive.

## Reverse Engineering Questions

### For deep copy

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this truly independent?            | Check if it uses `structuredClone`, `JSON` round-trip, or recursive copy. |
| Are there circular references?        | If yes, `JSON` method will fail. Use `structuredClone`. |
| Are there functions/symbols?          | `structuredClone` drops functions, `JSON` drops functions/symbols/undefined. |
| Should I use shallow or deep copy?    | Shallow is faster — use it unless nested objects must be independent. |
| How expensive is this deep copy?      | O(n) — for large objects, consider immutability patterns instead. |

---

# Chapter 17 — Pass by Value (Detailed)

## JavaScript Is Always Pass by Value

Every argument in JavaScript is passed by value. This is a firm rule with no exceptions.

- **Primitives:** The value itself is copied.
- **Objects:** The reference (pointer to the object) is copied.

```javascript
// Proof: re-assigning inside function never affects caller
function test(a, b) {
    a = 100;           // primitive — local copy changed
    b = { new: true }; // reference — local pointer changed to new object
}

let x = 5;
let y = { old: true };

test(x, y);

console.log(x);        // 5 — unchanged
console.log(y);        // { old: true } — unchanged (still points to original object)
```

## Pass by Value for Primitives

```javascript
function increment(n) {
    n++;                // n is a local copy
    return n;
}

let num = 5;
increment(num);
console.log(num);       // 5 — unchanged

num = increment(num);   // must reassign to capture the return value
console.log(num);       // 6
```

## Pass by Value for Objects (Pass by "Value of the Reference")

```javascript
function mutateOrReplace(obj) {
    obj.prop = "mutated";   // mutates the object (visible outside)
    obj = { newProp: "new" }; // reassigns LOCAL variable (NOT visible outside)
}

const original = { prop: "original" };
mutateOrReplace(original);

console.log(original.prop);    // "mutated" — mutation visible
console.log(original.newProp); // undefined — reassignment not visible
```

**Inside the function:**

```text
Before mutation:
obj ───→ { prop: "original" } ←── original

After mutation:
obj ───→ { prop: "mutated" } ←── original

After reassignment:
obj ───→ { newProp: "new" }  (local — no relation to original)
original ───→ { prop: "mutated" }  (unchanged reference)
```

## Why People Call It "Pass by Reference" (and Why They Are Wrong)

Some languages (C++, C#, PHP) have true pass-by-reference where the function can change the caller's variable itself. JavaScript does NOT have this.

```javascript
// True pass-by-reference (hypothetical — NOT JavaScript)
// In C++: void change(int &x) { x = 10; }
// The caller's variable itself is modified.

// JavaScript — cannot do this:
function change(x) {
    x = 10; // only changes local copy
}
let y = 5;
change(y);
// y is still 5
```

## Practical Implications

### Pattern: Mutate to communicate back

```javascript
function loadUserData(user) {
    user.loaded = true;
    user.timestamp = Date.now();
    // Mutates the original — caller sees changes without return
}

const user = { name: "John" };
loadUserData(user);
console.log(user.loaded); // true
```

### Pattern: Return new value instead

```javascript
function withTimestamp(user) {
    return { ...user, loaded: true, timestamp: Date.now() };
    // Returns new object — immutable pattern
}

const user = { name: "John" };
const updatedUser = withTimestamp(user);
```

## Reverse Engineering Questions

### For any function call

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does the function modify its arguments? | Check for property mutations (visible).           |
| Does the function reassign the parameter? | Not visible outside (local only).               |
| Is the original value affected?        | Yes if mutated. No if only reassigned.              |
| Should I use mutation or return?       | Mutation is simple but creates coupling. Return is pure but allocates. |
| Does this function have side effects?  | Mutation is a side effect.                           |

---

# Reverse Engineering Tactical Training

## The Complete Question Set

For every piece of code you encounter, systematically answer every applicable question:

### Storage

| Question                                | Purpose                                        |
|-----------------------------------------|-------------------------------------------------|
| Where is this variable stored?          | Stack (primitive) or heap (reference)?          |
| Who owns this variable?                 | Which execution context? Which object?          |
| Who created it?                         | Declaration, parameter, property creation?      |
| Which execution context contains it?    | Global, function, block?                        |
| Is it primitive or reference?           | Determines copy/mutation behavior.              |

### Execution

| Question                                | Purpose                                        |
|-----------------------------------------|-------------------------------------------------|
| Which function called this one?         | Use the call stack to trace.                    |
| What is on the call stack right now?    | Depth of execution context.                     |
| Will this memory survive?               | Closure? Global? Local?                         |
| What gets destroyed when this returns?  | The execution context and its local variables.  |
| Is the value copied or shared?          | Pass by value (copy) or reference (share)?      |

### Modification

| Question                                | Purpose                                        |
|-----------------------------------------|-------------------------------------------------|
| What happens if I remove this line?     | Tests necessity — would the program break?      |
| Can I rebuild this code from scratch?   | True understanding test.                        |
| Can I explain this to a beginner?       | Clarity of understanding test.                  |
| What assumptions does this code make?   | Reveals implicit dependencies.                  |
| Is this code "defensive" or "optimistic"? | Does it handle edge cases?                    |

---

# Reverse Engineering Exercises

## Exercise 1: Rebuild a Calculator

Without looking at any reference, implement:

```javascript
function add(a, b) { /* ... */ }
function subtract(a, b) { /* ... */ }
function multiply(a, b) { /* ... */ }
function divide(a, b) { /* ... */ }
```

Then chain them:

```javascript
function calculate(expression) {
    // Input: "5 + 3 * 2"
    // Output: 11
}
```

**Questions to ask yourself:**
- What type is each parameter?
- What type is the return value?
- How do I handle division by zero?
- How do I follow operator precedence?

## Exercise 2: Student Object

```javascript
function createStudent(name, age, grade) {
    // Return an object with name, age, grade properties
    // Add a method that returns "name - grade"
}

const student = createStudent("Alice", 20, "A");
// student.name === "Alice"
// student.info() === "Alice - A"
```

**Questions to ask yourself:**
- Is `name` a primitive or reference?
- Can the student's grade be changed later?
- How do I add methods to the object?

## Exercise 3: Array Average

```javascript
function average(numbers) {
    // Input: [80, 90, 100]
    // Output: 90
}
```

**Variations:**
- What if the array is empty? (return NaN? 0? undefined?)
- What if the array contains non-numbers?
- What if the array is very large (performance)?

## Exercise 4: Counter Closure

```javascript
function createCounter(start) {
    // Return a function that increments and returns a counter
    // Starting from `start`
}

const counter = createCounter(0);
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

**Questions to ask yourself:**
- Where is the counter variable stored?
- Why is it not destroyed after `createCounter` returns?
- Can I create multiple independent counters?

## Exercise 5: Nested Functions — Call Stack Visualization

```javascript
function outer() {
    console.log("outer");
    middle();
}

function middle() {
    console.log("middle");
    inner();
}

function inner() {
    console.log("inner");
}

outer();
```

**Manual stack visualization:**

Without running it, write down:
1. The call stack at each `console.log`.
2. The order of "outer", "middle", "inner" printed.
3. What the stack looks like when `inner()` is executing.

## Exercise 6: Value vs Reference Detection

```javascript
// For each pair, predict the output WITHOUT running:

// Example A
let a = [1, 2, 3];
let b = a;
b.push(4);
console.log(a); // ?

// Example B
let c = [1, 2, 3];
let d = [...c];
d.push(4);
console.log(c); // ?

// Example C
let e = { x: 1, y: { z: 2 } };
let f = { ...e };
f.x = 10;
f.y.z = 20;
console.log(e.x, e.y.z); // ?

// Example D
function process(g) {
    g = { newValue: 100 };
}
let h = { value: 5 };
process(h);
console.log(h.value); // ?
```

## Exercise 7: Closure Memory Analysis

```javascript
function createLogger(prefix) {
    let logs = [];

    return {
        log: function(message) {
            logs.push(`[${prefix}] ${message}`);
        },
        getLogs: function() {
            return [...logs]; // return a copy
        },
        clear: function() {
            logs = [];
        }
    };
}

const logger = createLogger("APP");
logger.log("started");
logger.log("processing");
console.log(logger.getLogs());
```

**Questions:**
- What variables does the closure preserve?
- Is `logs` accessible from outside? How is it protected?
- Why return `[...logs]` instead of `logs` directly?
- What happens to `logs` when `logger` goes out of scope?

## Exercise 8: Scope Chain Tracing

```javascript
const global = "global";

function A() {
    const aVar = "A";

    function B() {
        const bVar = "B";

        function C() {
            const cVar = "C";
            console.log(global); // Found where?
            console.log(aVar);   // Found where?
            console.log(bVar);   // Found where?
            console.log(cVar);   // Found where?
        }

        C();
    }

    B();
}

A();
```

**Tracing by hand:**
1. When `C` looks up `global`, in which scopes does it search?
2. What would happen if `B` also declared `aVar`? Which one would `C` find?
3. Draw the lexical environment chain.

---

## Next: Part 3

**Part 3 — Control Flow + Iteration + Error Handling + Reverse Engineering**

Including:

- `if`, `else`, `else if`
- `switch` statement
- Ternary operator (`? :`)
- `for`, `while`, `do...while` loops
- `for...in`, `for...of`
- `break`, `continue`, labels
- Recursion in depth
- Stack overflow and tail call optimization
- `try`, `catch`, `finally`
- `throw` and custom errors
- Error objects and stack traces
- Debugging strategies
- Defensive programming patterns
- Algorithmic thinking
- Reverse engineering tactics used by senior JavaScript engineers

Each topic with full code examples, memory diagrams, edge cases, and the complete reverse engineering question set.
