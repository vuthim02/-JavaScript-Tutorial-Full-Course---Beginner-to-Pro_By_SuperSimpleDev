# Absolute JavaScript Ecosystem Mastery

## Part 1 — Foundations + Reverse Engineering Tactics

---

# Mission

The goal is not merely to memorize syntax.

You want to understand JavaScript deeply enough that you can:

- Read any JavaScript code.
- Rebuild programs from scratch.
- Understand frameworks.
- Build web apps, mobile apps, desktop apps, servers, AI tools, IoT systems, and cloud applications.
- Reverse engineer other people's code.

---

# The Entire JavaScript Ecosystem Roadmap

```
Level 0   — Computer Fundamentals
Level 1   — JavaScript Language Foundations
Level 2   — Core Programming Concepts
Level 3   — DOM and Browser
Level 4   — Advanced JavaScript
Level 5   — Asynchronous Programming
Level 6   — Modules and Package Management
Level 7   — Tooling Ecosystem
Level 8   — TypeScript
Level 9   — Frontend Ecosystem
Level 10  — Backend Ecosystem
Level 11  — Databases
Level 12  — Authentication
Level 13  — Testing
Level 14  — Architecture
Level 15  — Performance
Level 16  — Security
Level 17  — DevOps
Level 18  — Cloud
Level 19  — Mobile Development
Level 20  — Desktop Applications
Level 21  — Game Development
Level 22  — AI and Machine Learning
Level 23  — IoT
Level 24  — Distributed Systems
Level 25  — System Design
Level 26  — Open Source Engineering
```

---

# Part 1

Today we start with:

## Level 1 — JavaScript Language Foundations

---

# 1. What is JavaScript?

## Definition

JavaScript is:

| Characteristic     | Meaning                                                                 |
|--------------------|-------------------------------------------------------------------------|
| High-level         | Abstracts away memory management, CPU instructions, and system details. |
| Dynamically typed  | Variable types are determined at runtime, not declared explicitly.      |
| Multi-paradigm     | Supports object-oriented, functional, imperative, and event-driven styles. |
| Prototype-based    | Uses prototypes for inheritance rather than classical classes.          |
| Event-driven       | Designed to respond to events (clicks, timers, network responses).      |
| Single-threaded    | Executes one command at a time on the main thread.                      |
| Garbage-collected  | Automatically reclaims memory that is no longer referenced.             |

## Where JavaScript Runs

| Environment   | Description                                                        |
|---------------|--------------------------------------------------------------------|
| Browsers      | Chrome, Firefox, Safari, Edge — the original runtime.              |
| Node.js       | Server-side runtime built on V8.                                   |
| Bun           | Modern runtime focused on speed (uses JavaScriptCore).              |
| Deno          | Secure runtime by Node.js creator, supports TypeScript natively.   |
| Electron      | Framework for building desktop apps with JS.                       |
| React Native  | Framework for building mobile apps with JS.                        |
| Embedded      | Devices like drones, smartwatches, IoT — JerryScript, Moddable.    |

## Reverse Engineering Question

> Why was JavaScript created?

**Answer:** To make web pages interactive.

Before JavaScript, web pages were static HTML with no dynamic behavior. Forms required full page reloads. User interaction was limited to clicking links. JavaScript was created in 1995 by Brendan Eich at Netscape to allow developers to write code that runs in the browser and responds to user actions without server round-trips.

## Deeper Reverse Engineering

Instead of memorizing abstract facts, train yourself to ask:

| Question                                          | Why It Matters                                                     |
|---------------------------------------------------|--------------------------------------------------------------------|
| What problem does JavaScript solve?               | Reveals the *purpose* of every feature.                            |
| Why is HTML alone insufficient?                   | HTML is markup — it describes structure, not behavior.             |
| Why can't CSS process logic?                      | CSS is declarative styling — no variables, loops, or conditions.   |
| What happens if JavaScript does not exist?        | Web becomes static documents, not applications.                    |
| What makes JavaScript different from Java?        | Avoids confusion between two entirely different languages.         |
| Why was it created in 10 days?                    | First version of JS was built in ~10 days — explains quirks.      |
| Why is it now the most used language in the world?| Ubiquity in browsers, Node.js, and ever-expanding ecosystem.      |

---

# 2. JavaScript Engine

## What Is a JavaScript Engine?

A JavaScript engine is a program that executes JavaScript code. It reads source code, parses it, compiles it to machine code, and runs it on the CPU.

## Major Engines

| Engine         | Created By   | Used In                              |
| -------------- | ------------ | ------------------------------------ |
| V8             | Google       | Chrome, Node.js, Deno, Electron      |
| SpiderMonkey   | Mozilla      | Firefox                              |
| JavaScriptCore | Apple        | Safari, Bun                          |
| Chakra         | Microsoft    | Legacy Edge (pre-Chromium)           |

## Execution Pipeline

```text
JavaScript Source Code
       ↓
     Parser
       ↓
  AST (Abstract Syntax Tree)
       ↓
  Interpreter (Ignition in V8)
       ↓
  Compiler (TurboFan in V8)
       ↓
     Machine Code
       ↓
       CPU
```

### Step-by-Step Breakdown

**Step 1 — Parser**
The parser reads the raw source code character by character and converts it into a structured tree called an **Abstract Syntax Tree (AST)**. It checks for syntax errors at this stage. If you have a missing parenthesis or bracket, this is where it fails.

**Step 2 — AST (Abstract Syntax Tree)**
The AST is a tree representation of your code. Each node in the tree represents a construct in your code — a variable declaration, a function call, an operator, etc. For example:

```javascript
let x = 10;
```

The AST would contain:
- A `VariableDeclaration` node
  - A `VariableDeclarator` node
    - An `Identifier` node (`x`)
    - A `NumericLiteral` node (`10`)

**Step 3 — Interpreter**
The interpreter (Ignition in V8) walks the AST and starts executing the code immediately. This is why JavaScript can start running before full compilation finishes. It produces **bytecode** — an intermediate representation between source code and machine code.

**Step 4 — Compiler**
The compiler (TurboFan in V8) takes frequently executed code (hot paths) and compiles them into optimized **machine code**. This is called **Just-In-Time (JIT) compilation**. The compiler makes assumptions about types and generates fast code. If those assumptions break, it deoptimizes and falls back to the interpreter.

**Step 5 — Machine Code**
Machine code is binary instructions that the CPU can execute directly. This is the final transformation — from human-readable JavaScript to raw 0s and 1s.

**Step 6 — CPU**
The Central Processing Unit executes the machine code instructions. It performs arithmetic, moves data between memory and registers, and controls program flow.

## Reverse Engineering Questions

When you see:

```javascript
let x = 10;
```

Train yourself to ask every question in the table below:

| Question                              | Answer                                                              |
|---------------------------------------|---------------------------------------------------------------------|
| Who reads this code?                  | The JavaScript engine (V8, SpiderMonkey, etc.).                     |
| Does the CPU understand JavaScript?   | No. CPUs only understand machine code (binary instructions).        |
| What must happen first?               | Parsing — converting source text into an AST.                       |
| What does the parser create?          | An Abstract Syntax Tree (AST).                                     |
| Who converts AST into machine code?   | The compiler (TurboFan in V8).                                      |
| Who finally executes?                 | The CPU executes machine code.                                      |
| What if there's a syntax error?       | Parsing fails, engine throws a `SyntaxError`, code never runs.      |
| Why is there both interpreter and compiler? | Interpreter starts fast; compiler optimizes hot paths.         |
| What does "JIT" mean?                 | Just-In-Time compilation — compiling during execution, not ahead.   |
| What happens when types change?       | Optimized code is discarded (deoptimization), falls back to interpreter. |

---

# 3. Values

## Everything Is a Value

In JavaScript, everything that you can assign to a variable or pass to a function is a **value**. Values are the atomic units of data.

```javascript
10          // number value
3.14        // number value
true        // boolean value
"hello"     // string value
null        // null value
undefined   // undefined value
```

## Categories of Values

Values in JavaScript fall into two broad categories:

```
        Values
       /       \
  Primitive    Object
```

## Primitive Types

Primitives are immutable — they cannot be changed after creation. When you "modify" a primitive, you are actually creating a new value.

### Number

Represents both integers and floating-point numbers. All numbers in JavaScript are IEEE 754 64-bit double-precision floating-point numbers.

```javascript
42          // integer
3.14        // float
-5          // negative
Infinity    // special: represents infinity
NaN         // special: Not a Number
```

**Internal details:**
- 64 bits total: 1 sign bit, 11 exponent bits, 52 fraction bits.
- Safe integer range: `-(2^53 - 1)` to `2^53 - 1` (about 9 quadrillion).
- Beyond that range, integer precision is lost.

### String

Represents textual data. Strings are sequences of UTF-16 code units. Strings are **immutable** — every operation that appears to modify a string actually creates a new string.

```javascript
"hello"           // double quotes
'world'           // single quotes
`template`        // template literals (backticks)
"line 1\nline 2"  // escape sequences
```

**Internal details:**
- Each character is 16 bits (UTF-16).
- Strings are stored in the string pool (interned) for efficiency.
- Immutability means no method ever changes the original string.

### Boolean

Represents logical truth values.

```javascript
true
false
```

Booleans are the result of comparison operations and are used in conditional logic.

### Undefined

A variable that has been declared but not assigned a value has the value `undefined`.

```javascript
let a;
// a is undefined
```

**Key insight:** `undefined` is a value. It is not "nothing" — it is a specific value meaning "no value assigned."

### Null

Represents the intentional absence of any object value.

```javascript
let b = null;
```

**Key distinction:** `null` is explicitly assigned by the programmer to indicate "no value." `undefined` means "not yet assigned."

### Symbol (ES6)

A unique and immutable primitive, often used as object property keys to avoid name collisions.

```javascript
const sym1 = Symbol("description");
const sym2 = Symbol("description");
// sym1 !== sym2   — every Symbol is unique
```

### BigInt (ES2020)

For integers larger than `Number.MAX_SAFE_INTEGER` (2^53 - 1).

```javascript
const big = 1000000000000000000n;  // note the 'n' suffix
const big2 = BigInt("9999999999999999999");
```

## Type Checking

Use `typeof` to check the type of a value:

```javascript
typeof 42                // "number"
typeof "hello"           // "string"
typeof true              // "boolean"
typeof undefined         // "undefined"
typeof null              // "object" — this is a historical bug
typeof Symbol()          // "symbol"
typeof 100n              // "bigint"
typeof {}                // "object"
typeof []                // "object"
typeof function(){}      // "function"
```

**Note:** `typeof null === "object"` is a well-known bug from the first version of JavaScript that cannot be fixed without breaking existing code. To check for `null`, use `value === null`.

## Reverse Engineering Questions

### For numbers

| Question                                  | Answer                                                              |
|-------------------------------------------|---------------------------------------------------------------------|
| Why is 42 a number?                       | Because the JavaScript engine interprets it as a numeric literal.   |
| Where is it stored?                       | In memory — either on the stack (as a primitive) or in the heap (as a boxed Number object). |
| How many bytes does it occupy?            | 8 bytes (64-bit floating point).                                    |
| Is it mutable?                            | No. Primitives are immutable.                                       |
| Can a number become a string?             | Yes, via explicit conversion (`String(42)`) or implicit (`42 + ""`). |
| What happens if I add 0.1 + 0.2?          | You get `0.30000000000000004` due to floating-point precision.      |
| Why does NaN === NaN return false?        | IEEE 754 specifies that NaN is not equal to itself.                 |
| What happens at Number.MAX_VALUE + 1?     | It becomes `Infinity`.                                              |

### For strings

| Question                                    | Answer                                                            |
|---------------------------------------------|-------------------------------------------------------------------|
| Why are strings immutable?                  | For performance — immutability allows memory sharing and caching. |
| How does memory store characters?           | As UTF-16 code units (16 bits each) in contiguous memory.         |
| What happens when concatenating strings?    | A new string is allocated, and both original strings are copied.  |
| How expensive is string concatenation?      | O(n) — each concatenation creates a new string and copies data.   |
| Why is "hello"[0] === "h"?                  | Strings are array-like, indexed by position (zero-based).         |
| Can I modify a character in a string?       | No. Strings are immutable — you must create a new string.         |

### For booleans

| Question                                  | Answer                                                              |
|-------------------------------------------|---------------------------------------------------------------------|
| Why does `false` exist?                   | To represent logical falseness in conditions and comparisons.       |
| What values are falsy?                    | `false`, `0`, `""`, `null`, `undefined`, `NaN`.                    |
| What values are truthy?                   | Everything else — including `"0"`, `[]`, `{}`, `Infinity`.         |

### For undefined vs null

| Question                                  | Answer                                                              |
|-------------------------------------------|---------------------------------------------------------------------|
| Why do both exist?                        | Historical design choice. `null` from Java influence, `undefined` is JS-specific. |
| When should I use null?                   | When you want to explicitly signal "no value" (e.g., cleared reference). |
| When should I use undefined?              | Let JavaScript use it naturally for uninitialized variables. Don't assign it manually. |
| What does `==` say about them?            | `null == undefined` is `true` (loose equality).                     |
| What does `===` say about them?           | `null === undefined` is `false` (strict equality).                  |

---

# 4. Variables

## What Is a Variable?

A variable is a **named reference to a value** stored in memory. The variable itself does not contain the value — it points to where the value is stored.

```javascript
let age = 25;
```

Memory representation:

```text
Variable name: age
Address:       0x7ffe1234
Value stored:  25
```

Think of a variable as a labeled box. The label is the variable name; the box holds the value.

## Declaring Variables

JavaScript has three keywords for declaring variables:

| Keyword   | Scope       | Mutable | Hoisted    | Can Redeclare | Temporal Dead Zone |
|-----------|-------------|---------|------------|---------------|--------------------|
| `let`     | Block       | Yes     | Yes (not initialized) | No  | Yes              |
| `const`   | Block       | No      | Yes (not initialized) | No  | Yes              |
| `var`     | Function    | Yes     | Yes (initialized to `undefined`) | Yes | No               |

### let

`let` declares a block-scoped, mutable variable. Use it when the value needs to change.

```javascript
let count = 1;
count = 2;     // OK
count = count + 1;  // OK

let count = 3; // Error: cannot redeclare in same scope
```

Block scope means the variable exists only within the nearest `{}` block:

```javascript
{
    let x = 10;
    console.log(x); // 10
}
console.log(x); // ReferenceError: x is not defined
```

### const

`const` declares a block-scoped variable that cannot be **reassigned**. The value itself may still be mutable if it is an object or array.

```javascript
const pi = 3.14;
pi = 3.14159; // TypeError: Assignment to constant variable.

const user = { name: "John" };
user.name = "Jane"; // OK — the object is mutated, not the variable reference
user = {};          // TypeError: Assignment to constant variable.
```

**Key rule:** The binding between the variable name and the value is constant. The contents of the value (if it is an object) are not protected.

### var (Legacy)

`var` is the old way of declaring variables. It has function scope (not block scope) and is hoisted with `undefined` initialization.

```javascript
var x = 10;
var x = 20; // OK — redeclaration is allowed
```

```javascript
{
    var y = 30;
}
console.log(y); // 30 — var is NOT block-scoped
```

**Why `var` is problematic:**
- No block scope leads to accidental leaks.
- Hoisting to `undefined` can mask missing declarations.
- Redeclaration hides bugs.

**Modern rule:** Use `const` by default. Use `let` when you need to reassign. Never use `var`.

## Naming Rules

| Rule                                           | Valid Example      | Invalid Example   |
|------------------------------------------------|--------------------|--------------------|
| Must start with letter, `_`, or `$`             | `let name`         | `let 1name`        |
| Can contain letters, digits, `_`, `$`           | `let user1`        | `let user-name`    |
| Cannot be a reserved keyword                    | `let myLet`        | `let let`          |
| Case-sensitive                                  | `name !== Name`    | —                  |
| Use camelCase by convention                     | `let firstName`    | `let first_name` (valid but unconventional) |

## Variable Hoisting

### How `var` hoists

```javascript
console.log(a); // undefined (not ReferenceError!)
var a = 10;
```

The engine sees this as:

```javascript
var a;          // hoisted to top, initialized with undefined
console.log(a); // undefined
a = 10;         // assignment stays in place
```

### How `let` and `const` hoist

```javascript
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;
```

`let` and `const` are hoisted but **not initialized**. They exist in a **Temporal Dead Zone (TDZ)** from the start of the block until the declaration is reached. Accessing them during TDZ throws a `ReferenceError`.

## Reverse Engineering Questions

### For any variable declaration

| Question                                    | Answer                                                               |
|---------------------------------------------|----------------------------------------------------------------------|
| Where does this variable live in memory?    | Stack (primitives) or heap (objects, if the variable holds a reference). |
| When is it created?                         | When execution reaches the declaration (or at the top of scope for `var`). |
| When is it destroyed?                       | When it goes out of scope (garbage collector may reclaim later).     |
| Can I access it before this line?           | Only for `var` (returns `undefined`). For `let`/`const`, TDZ throws. |
| What is its initial value?                  | `undefined` for `var` and `let`; `const` must be initialized at declaration. |
| What is its type?                            | Determined by the value assigned — can change via reassignment.      |

### For `const user = { age: 20 }`

| Question                                    | Answer                                                               |
|---------------------------------------------|----------------------------------------------------------------------|
| Is the string/property constant?             | No. The const protects the variable reference, not the object.       |
| Can object contents change?                  | Yes. `user.age = 30` is allowed.                                     |
| Why does this work?                          | Because `const` prevents reassignment of `user` to a different object, but the object itself is mutable. |
| Can I freeze the object?                     | Yes: `Object.freeze(user)` — but only shallow freeze.                |

### Detecting variable patterns when reverse engineering

When reading unknown code, look for:

```javascript
let x = ...   // Value is expected to change later
const x = ... // Value should stay the same (or it's an object reference)
var x = ...   // Legacy code or old codebase — be cautious of scope leaks
```

---

# 5. Operators

## What Is an Operator?

An operator is a symbol that performs an operation on one or more **operands** (values) and produces a result.

```javascript
5 + 3
// 5 and 3 are operands
// +   is the operator
// 8   is the result
```

## Arithmetic Operators

| Operator | Name            | Example          | Result |
|----------|-----------------|------------------|--------|
| `+`      | Addition        | `5 + 3`          | `8`    |
| `-`      | Subtraction     | `5 - 3`          | `2`    |
| `*`      | Multiplication  | `5 * 3`          | `15`   |
| `/`      | Division        | `5 / 3`          | `1.666...` |
| `%`      | Modulus (remainder) | `5 % 3`      | `2`    |
| `**`     | Exponentiation  | `5 ** 3`         | `125`  |
| `++`     | Increment       | `let x=5; x++`   | `6`    |
| `--`     | Decrement       | `let x=5; x--`   | `4`    |
| `+` (unary) | Unary plus | `+"5"`          | `5`    |
| `-` (unary) | Unary minus | `-5`           | `-5`   |

### Pre-increment vs Post-increment

```javascript
let a = 5;
let b = a++; // b = 5, a = 6 (post-increment: returns old value first)

let c = 5;
let d = ++c; // d = 6, c = 6 (pre-increment: increments first, returns new value)
```

## Comparison Operators

| Operator | Name                  | Example        | Result |
|----------|-----------------------|----------------|--------|
| `>`      | Greater than          | `5 > 3`        | `true`  |
| `<`      | Less than             | `5 < 3`        | `false`  |
| `>=`     | Greater than or equal | `5 >= 5`       | `true`  |
| `<=`     | Less than or equal    | `5 <= 3`       | `false`  |
| `==`     | Loose equality        | `5 == "5"`     | `true`  |
| `===`    | Strict equality       | `5 === "5"`    | `false`  |
| `!=`     | Loose inequality      | `5 != "5"`     | `false`  |
| `!==`    | Strict inequality     | `5 !== "5"`    | `true`  |

### Loose Equality (`==`) — The Abstract Equality Comparison

`==` performs **type coercion** before comparison. If the types differ, JavaScript converts one or both operands to the same type according to a complex set of rules.

```javascript
1 == "1"        // true (string "1" is coerced to number 1)
0 == false      // true (false is coerced to 0)
"" == false     // true (both coerced to 0)
null == undefined // true (special rule)
[] == false     // true ([] is coerced to 0)
[1] == 1        // true ([1] coerced to "1" coerced to 1)
```

### Strict Equality (`===`) — The Recommended Choice

`===` checks both **type** and **value** without coercion. If types differ, the result is immediately `false`.

```javascript
1 === "1"       // false (number !== string)
0 === false     // false (number !== boolean)
null === undefined // false (null !== undefined)
```

**Rule:** Always use `===` (and `!==`) unless you have a specific reason to use `==`.

## Logical Operators

| Operator | Name   | Example               | Result                  |
|----------|--------|-----------------------|-------------------------|
| `&&`     | AND    | `true && false`       | `false`                 |
| `\|\|`   | OR     | `true \|\| false`     | `true`                  |
| `!`      | NOT    | `!true`               | `false`                 |

### Short-Circuit Evaluation

Logical operators do not always evaluate both operands.

**`&&` — Stops at first falsy value:**
```javascript
false && anything    // false (anything is NOT evaluated)
true && "hello"      // "hello" (evaluates and returns second operand)
```

**`||` — Stops at first truthy value:**
```javascript
true || anything     // true (anything is NOT evaluated)
false || "hello"     // "hello" (evaluates and returns second operand)
```

**Common patterns:**

```javascript
// Default value (pre-ES2020)
const name = input || "default";

// Guard operator (execute only if condition is true)
isLoggedIn && renderDashboard();

// Nullish coalescing (ES2020) — better for default values
const name = input ?? "default";
// Unlike ||, ?? only falls through for null/undefined, not for 0 or ""
```

## Assignment Operators

| Operator | Example     | Equivalent       |
|----------|-------------|------------------|
| `=`      | `x = 5`     | `x = 5`          |
| `+=`     | `x += 3`    | `x = x + 3`      |
| `-=`     | `x -= 3`    | `x = x - 3`      |
| `*=`     | `x *= 3`    | `x = x * 3`      |
| `/=`     | `x /= 3`    | `x = x / 3`      |
| `%=`     | `x %= 3`    | `x = x % 3`      |
| `**=`    | `x **= 3`   | `x = x ** 3`     |
| `&&=`    | `x &&= 5`   | `x = x && 5`     |
| `\|\|=`  | `x \|\|= 5` | `x = x \|\| 5`   |
| `??=`    | `x ??= 5`   | `x = x ?? 5`     |

### Logical Assignment Operators (ES2021)

```javascript
// AND assignment — assigns only if x is truthy
let x = 1;
x &&= 5;     // x = 5 (because 1 is truthy)

let y = 0;
y &&= 5;     // y = 0 (because 0 is falsy, no assignment)

// OR assignment — assigns only if x is falsy
let a = null;
a ||= "default"; // a = "default"

// Nullish assignment — assigns only if x is null/undefined
let b = 0;
b ??= "default"; // b = 0 (0 is not null/undefined)
```

## Operator Precedence

Operators have a precedence order that determines which operations execute first. Higher precedence binds tighter.

```javascript
2 + 3 * 4      // 14 (not 20) — multiplication has higher precedence than addition
(2 + 3) * 4    // 20 — parentheses override precedence
```

**Simple rule:** When in doubt, use parentheses `()` to make intent explicit.

## Reverse Engineering Questions

### For `a += 5`

| Question             | Answer                |
|----------------------|-----------------------|
| What is the equivalent form? | `a = a + 5`  |
| Why use `+=` instead?        | Concise, idiomatic, avoids repeating variable name. |
| What happens to the type?     | Depends on `a` — if `a` is a string, `+=` concatenates. |

### For `===`

| Question                     | Answer                                                            |
|------------------------------|-------------------------------------------------------------------|
| Why not use `==`?            | `==` performs type coercion, leading to unexpected results.       |
| What does `1 == "1"` become? | `true` (JavaScript coerces the string to a number).               |
| What does `1 === "1"` become?| `false` (different types, no coercion).                           |
| When would I ever use `==`?  | Only when you explicitly want type coercion (rare).               |
| What about `null == undefined`? | `true` — this is the one case where `==` is commonly tolerated. |

### For short-circuit evaluation

When reading:

```javascript
const value = a || b;
```

| Question                     | Answer                                                             |
|------------------------------|--------------------------------------------------------------------|
| What is `value` if `a` is truthy? | `a` (b is never evaluated)                                    |
| What is `value` if `a` is falsy?  | `b`                                                             |
| What is NOT evaluated?            | The operand that is skipped due to short-circuiting           |
| Why does this matter?             | If `b` is a function call with side effects, those side effects don't happen. |

---

# 6. Type Conversion

## What Is Type Conversion?

Type conversion is the process of converting a value from one type to another. JavaScript provides both **implicit** (automatic) and **explicit** (manual) conversion.

## Implicit Conversion (Coercion)

JavaScript automatically converts types when operators are applied to mismatched types.

### String Coercion — The `+` Operator

When one operand is a string, `+` becomes string concatenation:

```javascript
"5" + 1       // "51"  (number coerced to string)
"Hello" + 42  // "Hello42"
3 + " days"   // "3 days"
"5" + true    // "5true"
"5" + null    // "5null"
"5" + undefined // "5undefined"
```

**Why?** The `+` operator is overloaded: if either operand is a string, it prefers string concatenation over numeric addition.

### Numeric Coercion — Other Arithmetic Operators

For `-`, `*`, `/`, `%`, `**`, JavaScript converts strings to numbers:

```javascript
"5" - 1       // 4  (string "5" coerced to number 5)
"10" * "2"    // 20
"20" / 2      // 10
"5" - "3"     // 2
"10" - true   // 9  (true coerced to 1)
"10" - false  // 10 (false coerced to 0)
"10" - null   // 10 (null coerced to 0)
"abc" - 1     // NaN ("abc" cannot become a number)
```

### Boolean Coercion — Logical Context

In conditions (`if`, `while`, `&&`, `||`, `!`), values are coerced to boolean:

```javascript
if ("hello") { }       // "hello" is truthy — executes
if (0) { }             // 0 is falsy — does not execute
if ([]) { }            // [] is truthy — executes (empty array is truthy!)
if (null) { }          // null is falsy — does not execute
```

### Falsy Values (coerce to `false` in boolean context)

There are exactly 6 falsy values in JavaScript:

| Value      | Type      | Why it's falsy |
|------------|-----------|----------------|
| `false`    | boolean   | Literal false  |
| `0`        | number    | Zero            |
| `""`       | string    | Empty string    |
| `null`     | null      | No value        |
| `undefined`| undefined | No value        |
| `NaN`      | number    | Not a Number    |

Everything else is truthy, including `"0"`, `"false"`, `[]`, `{}`, `Infinity`, `-1`.

### Loose Equality (`==`) Coercion

`==` follows a complex coercion algorithm. Some key rules:

1. **Same type** → compare directly (like `===`).
2. **null == undefined** → `true`.
3. **Number vs String** → coerce string to number.
4. **Boolean vs any** → coerce boolean to number (`true` → 1, `false` → 0).
5. **Object vs Primitive** → coerce object using `ToPrimitive` (often calls `.toString()` or `.valueOf()`).

```javascript
0 == false      // true  (false → 0, then 0 === 0)
"" == false     // true  (false → 0, "" → 0, then 0 === 0)
[] == false     // true  ([] → "" → 0, false → 0)
[1] == 1        // true  ([1] → "1" → 1)
[1,2] == "1,2"  // true  ([1,2] → "1,2")
```

## Explicit Conversion

You manually convert using built-in functions:

### To Number

```javascript
Number("5")           // 5
Number("5.5")         // 5.5
Number("")            // 0
Number("abc")         // NaN
Number(true)          // 1
Number(false)         // 0
Number(null)          // 0
Number(undefined)     // NaN

// Alternative syntax (unary +)
+"5"                  // 5
+true                 // 1

// parseInt and parseFloat
parseInt("42px")      // 42  (stops at non-numeric)
parseInt("1010", 2)   // 10  (binary to decimal)
parseFloat("3.14em")  // 3.14
```

### To String

```javascript
String(42)            // "42"
String(true)          // "true"
String(null)          // "null"
String(undefined)     // "undefined"
String([1,2,3])       // "1,2,3"
String({})            // "[object Object]"

// Alternative: .toString()
(42).toString()       // "42"
true.toString()       // "true"
null.toString()       // TypeError! null has no toString
undefined.toString()  // TypeError! undefined has no toString
```

### To Boolean

```javascript
Boolean(1)            // true
Boolean(0)            // false
Boolean("hello")      // true
Boolean("")           // false
Boolean(null)         // false
Boolean(undefined)    // false
Boolean(NaN)          // false
Boolean([])           // true (empty array!)
Boolean({})           // true (empty object!)

// Alternative: double NOT
!!1                   // true
!!0                   // false
!!"hello"             // true
```

## Reverse Engineering Questions

### For `"5" + 1`

| Question                     | Answer                                                             |
|------------------------------|--------------------------------------------------------------------|
| Why is the result `"51"` (not 6)? | String concatenation: the `+` operator prefers string when either operand is a string. |
| Why string concatenation?           | Historical design — `+` is overloaded for addition and concatenation. String concatenation was deemed more useful for the web (building HTML). |
| Which operand dominates?           | The string operand dominates — if either operand is a string, the result is string. |
| What rules does JavaScript follow? | The Abstract Equality Comparison algorithm + the `+` operator algorithm in the ECMAScript specification. |

### For `Number("abc")`

| Question                     | Answer                                                             |
|------------------------------|--------------------------------------------------------------------|
| Why is the result `NaN`?     | "abc" cannot be parsed as a valid number. NaN means "Not a Number." |
| What is NaN?                 | A special numeric value representing an unrepresentable numeric result. |
| How do I check for NaN?      | `Number.isNaN(value)` — NOT `value === NaN` (NaN is never equal to anything). |

### For `!!value`

| Question                     | Answer                                                             |
|------------------------------|--------------------------------------------------------------------|
| What does `!!` do?           | First `!` coerces to boolean and negates; second `!` negates again — result is the boolean equivalent. |
| Is there a simpler way?      | `Boolean(value)` — more explicit and readable.                     |
| When would I use this?       | When you need a guaranteed boolean (not truthy/falsy) from any value. |

---

# 7. Input and Output

## Output

### console.log

The primary way to output values during development.

```javascript
console.log("Hello, World!");
console.log(42);
console.log({ name: "Alice", age: 30 });
console.log([1, 2, 3]);

// Multiple values
console.log("Value:", 42, "Status:", true);

// Formatted output
console.log("User: %s, Age: %d", "Alice", 30);
// %s = string, %d = number, %o = object, %c = CSS style
```

### Other console methods

```javascript
console.error("Something went wrong");   // stderr output (red in most terminals)
console.warn("This might be an issue");  // warning output (yellow)
console.info("FYI");                     // informational
console.debug("Debug detail");           // verbose
console.table([{a:1,b:2}, {a:3,b:4}]); // tabular display
console.group("Section");                // grouped/collapsible output
console.time("label");                   // timing
console.timeEnd("label");
console.trace();                         // stack trace
```

### alert (Browser)

```javascript
alert("Hello!"); // Shows a modal dialog with a message
```

### confirm (Browser)

```javascript
const result = confirm("Are you sure?"); // OK = true, Cancel = false
```

## Input

### prompt (Browser)

```javascript
const name = prompt("What is your name?");
// Returns the user's input as a string, or null if canceled
```

**Warning:** `prompt()` always returns a string. If you need a number, convert it:

```javascript
const age = Number(prompt("How old are you?"));
```

### Node.js — readline

```javascript
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is your name? ", (answer) => {
    console.log(`Hello, ${answer}!`);
    rl.close();
});
```

### Node.js — readline-sync (third-party, synchronous)

```bash
npm install readline-sync
```

```javascript
const readlineSync = require("readline-sync");
const name = readlineSync.question("What is your name? ");
console.log(`Hello, ${name}!`);
```

### Deno

```javascript
const name = prompt("What is your name?");
console.log(`Hello, ${name}!`);
```

## Reverse Engineering Questions

### For `console.log(score)`

| Question                         | Answer                                                             |
|----------------------------------|--------------------------------------------------------------------|
| Where does `score` come from?    | It must be defined somewhere in scope — a variable, parameter, or property. |
| Is it defined?                   | If not, you get `ReferenceError: score is not defined`.            |
| What type is it?                 | Determined by the value assigned to it. Could be any type.         |
| Is it local or global?           | Check if it's declared inside a function (local) or at top level (global). |
| Can it be undefined?             | Yes, if it was declared but never assigned, or if a function returns nothing. |
| Why would someone log this?      | Debugging — they suspect this value is wrong or need to inspect it. |
| What might be the next step?     | If it's a bug, the developer would trace where the value originated. |

---

# 8. First Projects

## Project 1: Temperature Converter

Converts Celsius to Fahrenheit.

```javascript
let celsius = 30;
let fahrenheit = (celsius * 9 / 5) + 32;

console.log(fahrenheit); // 86
```

**Reverse engineering breakdown:**

| Code                          | What it does                                                 |
|-------------------------------|--------------------------------------------------------------|
| `let celsius = 30;`           | Declares a variable `celsius` and assigns the value 30.      |
| `(celsius * 9 / 5) + 32`     | Applies the formula `C * 9/5 + 32`.                          |
| `console.log(fahrenheit)`     | Outputs the result to the console.                           |

**Variations:**

```javascript
// Interactive version with prompt
function convertCelsiusToFahrenheit() {
    let celsius = Number(prompt("Enter temperature in Celsius:"));
    let fahrenheit = (celsius * 9 / 5) + 32;
    console.log(`${celsius}°C = ${fahrenheit}°F`);
}

// Reverse: Fahrenheit to Celsius
let f = 86;
let c = (f - 32) * 5 / 9;
console.log(c); // 30
```

## Project 2: Circle Area

Calculates the area of a circle given its radius.

```javascript
const pi = 3.14;
let radius = 5;

let area = pi * radius ** 2;

console.log(area); // 78.5
```

**Reverse engineering breakdown:**

| Code                          | What it does                                                 |
|-------------------------------|--------------------------------------------------------------|
| `const pi = 3.14;`            | Declares a constant `pi` — this value should not change.     |
| `let radius = 5;`             | Declares a mutable variable for the radius.                  |
| `radius ** 2`                 | Exponentiation operator — raises to the power of 2.          |
| `pi * radius ** 2`            | Applying the formula `πr²`.                                  |
| `console.log(area)`           | Outputs the result.                                          |

**Variations:**

```javascript
// More precise with Math.PI
const pi = Math.PI; // 3.141592653589793
let radius = 5;
let area = pi * radius ** 2;
console.log(area); // 78.53981633974483

// Circumference
let circumference = 2 * pi * radius;
console.log(circumference);

// Interactive
function circleArea(radius) {
    return Math.PI * radius ** 2;
}
console.log(circleArea(5));
```

## Project 3: Age Calculator

Calculates age from birth year.

```javascript
let birthYear = 2000;
let currentYear = 2026;

let age = currentYear - birthYear;

console.log(age); // 26
```

**Reverse engineering breakdown:**

| Code                          | What it does                                                 |
|-------------------------------|--------------------------------------------------------------|
| `let birthYear = 2000;`       | Stores the birth year.                                       |
| `let currentYear = 2026;`     | Stores the current year (hardcoded — not ideal).             |
| `currentYear - birthYear`     | Simple subtraction to compute age.                           |
| `console.log(age)`            | Outputs the result.                                          |

**Improvements:**

```javascript
// Dynamic year
const birthYear = 2000;
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;
console.log(age);

// More accurate (accounts for month)
function getAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
console.log(getAge(new Date(2000, 5, 15))); // May 15, 2000
```

## Project 4: Simple Calculator

```javascript
const num1 = Number(prompt("Enter first number:"));
const operator = prompt("Enter operator (+, -, *, /):");
const num2 = Number(prompt("Enter second number:"));

let result;

if (operator === "+") {
    result = num1 + num2;
} else if (operator === "-") {
    result = num1 - num2;
} else if (operator === "*") {
    result = num1 * num2;
} else if (operator === "/") {
    result = num1 / num2;
} else {
    result = "Invalid operator";
}

console.log(`${num1} ${operator} ${num2} = ${result}`);
```

## Project 5: Swap Two Variables

```javascript
let a = 5;
let b = 10;

// Method 1: Using a temporary variable
let temp = a;
a = b;
b = temp;

console.log(a, b); // 10 5

// Method 2: Using destructuring (ES6)
[a, b] = [b, a];
```

## Project 6: Even or Odd Check

```javascript
const number = Number(prompt("Enter a number:"));
const isEven = number % 2 === 0;

console.log(`${number} is ${isEven ? "even" : "odd"}`);
```

---

# 9. Reverse Engineering Tactical Training

## The Core Habit

For every piece of code you encounter, train yourself to systematically answer these questions. Do not skip any. Do this until it becomes automatic.

### Level 1 — Code Comprehension

| Question                                      | What It Uncovers                                             |
|-----------------------------------------------|--------------------------------------------------------------|
| What problem does this code solve?            | The purpose — why was it written?                            |
| Why is this specific line needed?             | Would the code work without it?                              |
| What if I remove it?                          | Tests the necessity of each line.                            |
| Can I write it another way?                   | Deepens understanding of alternatives.                       |
| Which value changes?                          | Identifies mutable state.                                    |
| Which value stays constant?                   | Identifies constants and configuration.                      |
| Where is the data stored?                     | Variable, parameter, property, or global?                    |
| How does memory change during execution?      | Stack and heap allocation.                                   |

### Level 2 — Engine Perspective

| Question                                              | What It Uncovers                                             |
|-------------------------------------------------------|--------------------------------------------------------------|
| What happens inside the JavaScript engine?             | Parsing, compilation, execution, optimization.              |
| When is this line executed?                            | During parsing? Interpretation? Compilation?                |
| How many times is this code path executed?             | Hot vs cold paths — tells you what the JIT may optimize.    |
| What does the AST look like for this code?             | The tree structure of the syntax.                           |
| What bytecode does this produce?                       | Lower-level representation.                                 |

### Level 3 — Mastery

| Question                                              | What It Uncovers                                             |
|-------------------------------------------------------|--------------------------------------------------------------|
| Can I rebuild this without looking at the original?    | Tests recall and true understanding.                        |
| Can I explain this to a complete beginner?             | Tests clarity of understanding.                             |
| Can I teach this concept?                              | Teaching reveals gaps in knowledge.                         |
| What would happen in a different runtime?              | Browser vs Node vs Deno vs Bun.                             |
| How would I write this differently?                    | Personal style and preference.                              |

## Practical Exercise Template

When studying any code snippet, create a table like this:

```javascript
let result = (5 + 3) * 2; // Example code
```

| Question                    | Answer                                             |
|-----------------------------|----------------------------------------------------|
| What problem does this solve? | Computes `(5 + 3) * 2 = 16`.                      |
| Why is this line needed?    | To store the computed result in a variable.        |
| What if I remove `let`?     | `result` becomes a global variable (in non-strict mode) or throws `ReferenceError` (in strict mode). |
| Can I write it another way? | `let result = 16;` (hardcoded) or `let result = ((5 + 3) * 2);` (extra parens). |
| Which value changes?        | `result` is being assigned — it changes.            |
| Which value stays constant? | `5`, `3`, `2` are literal constants.               |
| Where is the data stored?   | In the variable `result` on the stack.             |
| Does CPU understand this?   | No, the JS engine compiles it to machine code.     |
| Can I rebuild this?         | Write it from memory after 5 minutes.              |

## Reverse Engineering Workflow

When you encounter unfamiliar code, follow this workflow:

```
Step 1: READ the code.
        ↓
Step 2: IDENTIFY the purpose.
        ↓
Step 3: TRACE the data flow.
        (Where does each value come from? Where does it go?)
        ↓
Step 4: MODIFY one line at a time.
        (What breaks? What changes?)
        ↓
Step 5: REWRITE from memory.
        (Without looking at the original.)
        ↓
Step 6: TEACH the code to someone else.
        (Or write an explanation.)
```

## The "5 Whys" Technique for Code

Adapted from Toyota's root cause analysis. For each line of code, ask "Why?" five times.

```javascript
let age = currentYear - birthYear; // Line of code
```

1. **Why is age computed this way?** Because age is the difference between current year and birth year.
2. **Why use subtraction?** Because time is linear and age increases by one per year.
3. **Why not account for month/day?** Because this is a simplified calculation.
4. **Why simplify?** Because the requirements didn't need month-level precision.
5. **Why was year-only precision acceptable?** Because the application displays approximate age, not exact age.

This technique reveals assumptions, design decisions, and potential improvements.

---

## Next: Part 2

Part 2 will enter **Core Programming Concepts**:

1. Expressions vs Statements
2. Scope (Global, Function, Block)
3. Hoisting in Depth
4. Block Scope with `let` and `const`
5. Functions (Declarations, Expressions, Arrow)
6. Parameters and Arguments
7. Return Values
8. Execution Context
9. The Call Stack
10. Lexical Environment
11. Closures
12. Objects (Literals, Properties, Methods)
13. Arrays
14. Deep vs Shallow Copy
15. Memory Model (Stack vs Heap)
16. Pass by Value vs Pass by Reference
17. The Event Loop (Introduction)

Each topic will include:
- Detailed explanation
- Code examples
- Memory diagrams
- Reverse engineering questions
- Practical exercises
- "What if I remove this?" analysis
