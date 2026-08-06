# Collection of Absolutely All Concepts — JavaScript

> A comprehensive, hierarchical catalog of every concept a JavaScript developer must know — from beginner foundations to deep engine internals and modern full-stack DevOps. This document serves as the master reference for the entire course.

---

## Table of Contents

1. [JavaScript Foundations — Parts 1-9](#level-1-javascript-foundations)
2. [Core Language Mastery — Parts 10-18](#level-2-core-language-mastery)
3. [Asynchronous JavaScript — Parts 19-26](#level-3-asynchronous-javascript)
4. [Browser Environment & DOM — Parts 27-36](#level-4-browser-environment--dom)
5. [Node.js & Backend — Parts 37-49](#level-5-nodejs--backend)
6. [Modern Frontend — Parts 50-60](#level-6-modern-frontend)
7. [Engineering & Tooling — Parts 61-70](#level-7-engineering--tooling)
8. [Deep Internals — Parts 71-78](#level-8-deep-internals)
9. [Advanced Browser APIs — Parts 79-86](#level-9-advanced-browser-apis)
10. [Data Visualization, Animation & Graphics — Parts 87-92](#level-10-data-visualization-animation--graphics)
11. [Legacy JavaScript Ecosystem — Parts 93-95](#level-11-legacy-javascript-ecosystem)
12. [Forms, Intl & Advanced UI Patterns — Parts 96-100](#level-12-forms-intl--advanced-ui-patterns)
13. [GraphQL, Realtime & Websocket Engineering — Parts 101-104](#level-13-graphql-realtime--websocket-engineering)
14. [CLI Development & Scripting — Parts 105-107](#level-14-cli-development--scripting)
15. [Monorepos, Publishing & Release Engineering — Parts 108-111](#level-15-monorepos-publishing--release-engineering)
16. [SEO, Accessibility & Content — Parts 112-115](#level-16-seo-accessibility--content)
17. [Data Structures, Algorithms & CS in JS — Parts 116-119](#level-17-data-structures-algorithms--cs-in-js)
18. [Complete JS Library & Tool Catalog — Parts 120-126](#level-18-complete-js-library--tool-catalog)
19. [Universal Concepts (Cross-Cutting)](#universal-concepts)

---

# Level 1: JavaScript Foundations

## 1.1 What Is JavaScript [Part 1]

- **JavaScript (JS)** — High-level, interpreted, dynamically-typed, multi-paradigm programming language
- **History** — Created by Brendan Eich at Netscape in 1995 (10 days), originally called Mocha then LiveScript then JavaScript
- **ECMAScript (ES)** — The standardized specification of JavaScript (ECMA-262)
- **TC39** — Technical Committee 39 that governs ECMAScript evolution
- **ES6 / ES2015** — The major modernization of JavaScript (classes, modules, arrow functions, promises)
- **Yearly Releases** — ES2016, ES2017, ES2018, ... each year's feature set
- **JavaScript vs Java** — Completely unrelated languages (marketing confusion from 1995)
- **JavaScript vs TypeScript** — TS = JS + static types + newer features
- **JavaScript Engines** — V8 (Chrome/Node), SpiderMonkey (Firefox), JavaScriptCore (Safari), Chakra (legacy Edge)
- **Runtime Environments** — Browser (client) and Node.js (server)
- **Everywhere JavaScript** — Frontend (98%+ of websites), backend (Node.js), mobile (React Native), desktop (Electron), IoT, databases (MongoDB)
- **Interpreted vs Compiled** — JIT (Just-In-Time) compiled in modern engines
- **Scripting Language** — Designed to be embedded and automate other applications
- **Where JS Runs** — Browser (V8/SpiderMonkey/JSC), Server (Node/Deno/Bun), Native (Electron/React Native)

## 1.2 Getting Started [Part 2]

- **Including JS in HTML** — `<script>` tag, external `<script src="">`, `<script defer>`, `<script async>`
- **Console** — `console.log()`, `console.error()`, `console.warn()`, `console.table()`, `console.time()`
- **Inline vs External Scripts** — Inline in HTML vs separate .js files
- **Browser DevTools** — Console, Elements, Sources, Network, Performance, Application tabs
- **Node.js REPL** — `node` command opens interactive shell
- **Code Editors** — VS Code, WebStorm, Sublime, Vim, Neovim
- **Prettier** — Automatic code formatting
- **Semicolons** — Optional (ASI — Automatic Semicolon Insertion)
- **Strict Mode** — `"use strict"` directive for safer code
- **Comments** — `//` single line, `/* */` multi-line, JSDoc `/** */`
- **Hello World** — `console.log("Hello World")`
- **The `script` tag placement** — `<body>` end vs `<head>` (render blocking)
- **Naming Conventions** — camelCase (variables), PascalCase (classes), UPPER_SNAKE_CASE (constants)

## 1.3 Variables and Constants [Part 3]

- **var** — Legacy, function-scoped, hoisted (initialized to undefined), can redeclare
- **let** — ES6+, block-scoped, can reassign, cannot redeclare in same scope
- **const** — ES6+, block-scoped, cannot reassign, must be initialized (objects still mutable)
- **Block Scope** — `{}` creates scope for let/const
- **Temporal Dead Zone (TDZ)** — Accessing let/const before declaration throws ReferenceError
- **Hoisting** — Declarations moved to top (var/function), let/const hoisted but in TDZ
- **Global Scope** — Variables outside any function/block
- **Global Object** — `window` (browser) / `global` (Node) / `globalThis` (universal)
- **Variable Naming Rules** — Letters, digits, $, _, cannot start with digit, not reserved keywords
- **Reserved Keywords** — if, else, for, while, class, function, return, const, etc.
- **Garbage Collection Hint** — Set to null to allow GC
- **Destructuring Assignment** — `const { a, b } = obj; const [x, y] = arr`

## 1.4 Data Types [Part 4]

- **Primitive Types** — immutable, stored by value
  - **undefined** — declared but not assigned
  - **null** — intentional absence of value
  - **boolean** — true/false
  - **number** — IEEE 754 double precision (integers, floats, NaN, Infinity)
  - **bigint** — arbitrary precision integers (`123n`)
  - **string** — Unicode text, single/double/backtick quotes
  - **symbol** — unique immutable identifier
- **Reference Types** — mutable, stored by reference
  - **Object** — key-value collection
  - **Array** — ordered list
  - **Function** — callable object
  - **Date, Map, Set, WeakMap, WeakSet, RegExp, Error** — built-in objects
- **typeof operator** — `typeof 42 === 'number'`
- **Type Coercion** — Implicit type conversion
  - `"5" + 2 === "52"` (string concat wins)
  - `"5" - 2 === 3` (numeric coercion)
  - `==` vs `===` (loose vs strict equality)
- **NaN (Not a Number)** — `NaN === NaN` is false, use `Number.isNaN()`
- **Truthy & Falsy Values** — falsy: false, 0, "", null, undefined, NaN; everything else truthy
- **Autoboxing** — Primitive `.toUpperCase()` works (temporary wrapper object)
- **Number Methods** — `toFixed()`, `toPrecision()`, `Number.parseInt()`, `Number.parseFloat()`
- **BigInt Operations** — Cannot mix with regular number types
- **Symbol.for()** — Global symbol registry
- **String Methods** — `.length`, `.includes()`, `.indexOf()`, `.slice()`, `.split()`, `.replace()`, `.toUpperCase()`

## 1.5 Operators [Part 5]

- **Arithmetic** — `+ - * / % **` (addition, subtraction, multiplication, division, remainder, exponentiation)
- **Assignment** — `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `**=`
- **Comparison** — `==`, `===`, `!=`, `!==`, `<`, `>`, `<=`, `>=`
- **Logical** — `&&` (AND), `||` (OR), `!` (NOT), `??` (nullish coalescing)
- **Short-circuit Evaluation** — `a && b`, `a || b` (returns operand, not boolean)
- **Nullish Coalescing** — `a ?? b` (returns b only if a is null/undefined)
- **Optional Chaining** — `obj?.prop`, `arr?.[0]`, `fn?.()` (safe nested access)
- **Ternary** — `condition ? value1 : value2`
- **Unary** — `+x` (to number), `-x`, `!x`, `typeof x`, `void`, `delete`
- **Increment/Decrement** — `++x`, `x++`, `--x`, `x--` (prefix vs postfix)
- **Bitwise** — `& | ^ ~ << >> >>>`
- **Spread** — `...array` (expand), `...object` (copy)
- **Rest** — `function(...args)`, `const [first, ...rest] = arr`
- **Operator Precedence** — PEMDAS-like table, parentheses override
- **Comma Operator** — `(a, b)` evaluates both returns last
- **in operator** — `'key' in object`
- **instanceof** — `obj instanceof Class`
- **delete** — Remove object property or array element

## 1.6 Control Flow [Part 6]

- **if / else if / else** — Conditional branching
- **switch / case** — Multi-way branching (uses strict equality)
- **Ternary Chains** — Nested ternaries (use sparingly)
- **for Loop** — `for (init; condition; increment)`
- **for...of** — Iterate over iterables (arrays, strings, Maps, Sets)
- **for...in** — Iterate over enumerable object keys (avoid on arrays)
- **while Loop** — Check-then-execute
- **do...while Loop** — Execute-then-check (runs at least once)
- **break** — Exit loop/switch
- **continue** — Skip to next iteration
- **Labels** — `outer: for(...)` — break/continue named loops
- **try/catch/finally** — Error handling
- **Guard Clauses** — Early return to avoid nested ifs
- **Error-first pattern** — Node callback convention `(err, data)`

## 1.7 Functions [Part 7]

- **Function Declarations** — `function name(params) {}` (hoisted)
- **Function Expressions** — `const fn = function() {}` (not hoisted)
- **Arrow Functions** — `const fn = (params) => {}` (lexical `this`, no `arguments`, no constructor)
- **Anonymous Functions** — Functions without names (callbacks, IIFEs)
- **IIFE (Immediately Invoked Function Expression)** — `(function(){})()`
- **Parameters vs Arguments** — Definition vs actual values passed
- **Default Parameters** — `function fn(a = 10) {}`
- **Rest Parameters** — `function fn(...args) {}`
- **Return Statement** — Return value or undefined; `return` exits early
- **Function Arguments Object** — Legacy `arguments` (array-like)
- **First-Class Functions** — Functions are values (can be passed, returned, stored)
- **Higher-Order Functions** — Functions that take/return functions (map, filter, reduce)
- **Callbacks** — Functions passed as arguments
- **Pure Functions** — Same input → same output, no side effects
- **Immediately Invoked Function Expression** — Encapsulation pattern
- **Recursion** — Function calling itself (base case + recursive case)
- **Function Name Property** — `fn.name`
- **Arity** — `fn.length` (number of declared parameters)

## 1.8 Arrays [Part 8]

- **Array Creation** — `[]`, `new Array(n)`, `Array.from()`, `Array.of()`
- **Access & Modification** — `arr[0]`, `arr.length`, push/pop/shift/unshift
- **push/pop** — Add/remove from end
- **shift/unshift** — Add/remove from beginning (slow)
- **Array Methods**
  - **Iteration** — `forEach()`, `map()`, `filter()`, `reduce()`, `reduceRight()`
  - **Search** — `indexOf()`, `lastIndexOf()`, `includes()`, `find()`, `findIndex()`, `findLast()`
  - **Sorting** — `sort()`, `reverse()` (note: sort is lexicographic by default)
  - **Slicing** — `slice()`, `splice()` (splice modifies)
  - **Concatenation** — `concat()`, spread `[...a, ...b]`
  - **Testing** — `every()`, `some()`
  - **Flattening** — `flat()`, `flatMap()`
  - **Joining** — `join()`, `toString()`
  - **Filling** — `fill()`, `copyWithin()`
  - **Reducing** — `reduce()`, `reduceRight()`
- **Array Destructuring** — `const [a, b] = arr`
- **Spread in Arrays** — `[...arr, newItem]`
- **Multidimensional Arrays** — Arrays of arrays
- **Array-Like Objects** — `arguments`, `NodeList`, `HTMLCollection` (convert with `Array.from()`)
- **Typed Arrays** — Int8Array, Uint8Array, Float64Array, etc.
- **Sparse Arrays** — Arrays with holes (`[1, , 3]`)
- **Sorting with Comparator** — `arr.sort((a, b) => a - b)`
- **Mutating vs Non-mutating** — push/splice/sort mutate; map/filter/slice return new
- **Performance Note** — shift/unshift are O(n), push/pop are O(1)
- **Array.isArray()** — Check if value is array (typeof [] is "object")

## 1.9 Objects [Part 9]

- **Object Creation** — Object literal `{}`, `new Object()`, `Object.create()`, class instances
- **Properties** — key: value pairs, keys are strings or symbols
- **Property Access** — Dot notation `obj.prop`, Bracket notation `obj["prop"]`
- **Computed Keys** — `{ [dynamicKey]: value }`
- **Methods** — Functions as property values; shorthand `{ method() {} }`
- **Object Methods**
  - `Object.keys()`, `Object.values()`, `Object.entries()`
  - `Object.assign(target, source)` — Copy properties
  - `Object.freeze()` — Prevent modifications (shallow)
  - `Object.seal()` — Prevent add/delete (properties still mutable)
  - `Object.preventExtensions()`
  - `Object.hasOwn()` / `hasOwnProperty()`
  - `Object.fromEntries()`
  - `Object.create(proto)` — Object with specific prototype
  - `Object.getPrototypeOf()` / `Object.setPrototypeOf()`
- **Spread Operator in Objects** — `{ ...a, ...b }`
- **Nested Objects** — Objects within objects
- **References vs Copies** — `const b = a` (same reference); `{...a}` shallow copy; `structuredClone()` deep copy
- **Shallow vs Deep Copy** — spread only copies top level
- **Getters/Setters** — `get prop()`, `set prop(value)`
- **Property Descriptors** — `Object.getOwnPropertyDescriptor()`, `Object.defineProperty()`
  - writable, enumerable, configurable attributes
- **Property Flags** — writable, enumerable, configurable
- **Inheritance via Prototypes** — Objects inherit from other objects
- **`this` in Objects** — Method context binding
- **Optional Chaining** — `obj?.a?.b?.c`
- **JSON Methods** — `JSON.stringify()`, `JSON.parse()` (JSON ≠ JS objects)

---

# Level 2: Core Language Mastery

## 2.1 Strings and Text Processing [Part 10]

- **String Basics** — Primitive vs String object
- **Quotes** — Single, double, template literals (backticks)
- **Template Literals** — `${expression}` interpolation, multi-line strings, tagged templates
- **Tagged Templates** — `` tag`...` `` — custom string processing function
- **String Methods (Complete)**
  - `.length`, `.charAt()`, `.charCodeAt()`, `.codePointAt()`
  - `.slice()`, `.substring()`, `.substr()` (deprecated)
  - `.toUpperCase()`, `.toLowerCase()`
  - `.trim()`, `.trimStart()`, `.trimEnd()`
  - `.split()`, `.join()` (array method)
  - `.includes()`, `.startsWith()`, `.endsWith()`
  - `.indexOf()`, `.lastIndexOf()`
  - `.replace()`, `.replaceAll()` (regex support)
  - `.padStart()`, `.padEnd()`
  - `.repeat()`
  - `.match()`, `.search()`, `.matchAll()`
  - `.normalize()` (Unicode normalization)
  - `.localeCompare()`
  - `.at()` (negative indexing)
- **Unicode** — UTF-16 encoding, code points, surrogate pairs, `\u{1F600}`
- **String Comparison** — Lexicographic with `<`, `>` 
- **String Immutability** — Strings cannot be modified in place
- **Escape Characters** — `\n`, `\t`, `\\`, `\'`, `\"`, `\uXXXX`
- **Raw String Access** — `String.raw` for template literals

## 2.2 Numbers and Math [Part 11]

- **Number Type** — IEEE 754 double-precision floating point (64-bit)
- **Integer Precision** — Safe integers up to `Number.MAX_SAFE_INTEGER` (2^53 - 1)
- **Floating Point Issues** — `0.1 + 0.2 !== 0.3` (binary representation)
- **Number Methods**
  - `Number.parseInt()`, `Number.parseFloat()`
  - `Number.isInteger()`, `Number.isNaN()`, `Number.isFinite()`
  - `Number.MAX_SAFE_INTEGER`, `Number.MIN_SAFE_INTEGER`
  - `Number.MAX_VALUE`, `Number.MIN_VALUE`
  - `Number.EPSILON`
- **Global Number Functions** — `parseInt()`, `parseFloat()`, `isNaN()`, `isFinite()`
- **Math Object**
  - Constants: `Math.PI`, `Math.E`, `Math.LN2`, `Math.LN10`, `Math.SQRT2`
  - Rounding: `Math.round()`, `Math.floor()`, `Math.ceil()`, `Math.trunc()`
  - Abs/Extremes: `Math.abs()`, `Math.max()`, `Math.min()`
  - Power: `Math.pow()`, `Math.sqrt()`, `Math.cbrt()`, `Math.exp()`, `Math.log()`, `Math.log2()`, `Math.log10()`
  - Random: `Math.random()` (0 ≤ x < 1)
  - Trig: `Math.sin()`, `Math.cos()`, `Math.tan()`, `Math.atan()`, `Math.asin()`, `Math.acos()`
  - Sign: `Math.sign()`
- **BigInt** — `123456789012345678901234567890n` — arbitrary precision
- **Base Conversions** — `toString(16)`, `parseInt(str, base)`
- **Currency/Money Handling** — `Intl.NumberFormat`, avoid float for money
- **Precision Solutions** — `toFixed()`, decimal libraries (decimal.js, bignumber.js)
- **Infinity / -Infinity** — Division by zero results

## 2.3 Scope and Closures [Part 12]

- **Global Scope** — Accessible everywhere
- **Function Scope** — var-scoped to function
- **Block Scope** — let/const scoped to `{}`
- **Lexical Scope** — Nested functions access outer variables (static scoping)
- **Scope Chain** — Inner → outer → global lookup order
- **Closure** — Function + its lexical environment
  - Inner function retains access to outer variables after outer returns
  - Used for: data privacy, module pattern, factory functions, memoization
- **Common Closure Use Cases**
  - Private variables (module pattern)
  - Function factories
  - Event handlers
  - Currying
  - Partial application
- **Closure Pitfalls** — Loop variable capture (`var` in loops)
- **IIFE and Closures** — Encapsulation before let/const existed
- **Module Pattern** — Revealing module pattern via closure
- **Garbage Collection of Closures** — V8 optimizes; beware retaining large objects
- **Hoisting Review** — var (undefined), function declarations (fully hoisted), let/const (TDZ)

## 2.4 `this` Keyword Deep Dive [Part 13]

- **`this`** — Special keyword referring to execution context
- **Rule 1: Default Binding** — `this` = global object (window/global), or undefined in strict mode
- **Rule 2: Implicit Binding** — `this` = object the method is called on (`obj.method()`)
- **Rule 3: Explicit Binding** — `.call()`, `.apply()`, `.bind()`
  - `fn.call(obj, arg1, arg2)`
  - `fn.apply(obj, [arg1, arg2])`
  - `const bound = fn.bind(obj)` — permanent binding
- **Rule 4: New Binding** — `this` = new instance in constructor
- **Rule 5: Arrow Functions** — Lexical `this` (inherits from outer scope, cannot be rebound)
- **`this` in Event Handlers** — Element that fired the event
- **`this` in Class Methods** — Class instance (binding often needed)
- **`this` in Node.js** — `this` at top level = `module.exports`
- **Binding Priority** — new > explicit (bind) > implicit > default
- **Bound Functions** — `.bind()` creates permanently bound function
- **`this` Pitfalls** — Extracting methods (`const fn = obj.method`), callbacks losing context

## 2.5 Prototypes and Inheritance [Part 14]

- **Prototype** — Object that serves as a template for other objects
- **Prototype Chain** — `obj → Object.prototype → null`
- **`__proto__`** — Legacy accessor (avoid, use `Object.getPrototypeOf()`)
- **`Object.prototype`** — Base of all objects
- **`constructor` property** — Points back to function that created instance
- **`new` Keyword** — Creates object with prototype linkage
- **`instanceof`** — Checks prototype chain
- **Class Syntax Sugar** — `class` is syntactic sugar over prototypes
- **`extends`** — Inheritance keyword
- **`super`** — Call parent constructor/methods
- **Method Overriding** — Redefining inherited methods
- **Property Shadowing** — Own property hides prototype property
- **`Object.create(proto)`** — Explicit prototype setting (classical inheritance pattern)
- **`Function.prototype.call/apply/bind`** — Also inherited via prototype chain
- **Prototype Pollution** — Security issue via `__proto__` assignment (in JSON.parse)
- **Mixins** — `Object.assign(Class.prototype, mixinObject)`
- **Differential Inheritance** — Object inherits from other objects

## 2.6 Classes and OOP [Part 15]

- **Classes** — ES6 class syntax
  - `class Name { }`
  - `constructor() {}` — Initialization
  - `methods() {}` — Instance methods
  - `static methods() {}` — Called on class itself
  - `get/set` — Accessors
  - `#privateField` — Private fields (`#`)
  - `#privateMethod()` — Private methods
- **Class Expressions** — `const C = class {}`
- **Field Declarations** — `count = 0` (instance fields), `static count = 0`
- **Private Members** — `#` prefix (real privacy, not underscore convention)
- **Static Initialization Blocks** — `static { }` (ES2022)
- **Inheritance** — `class Child extends Parent`
- **`super()`** — Must call before `this` in child constructor
- **Abstract Classes Pattern** — Base class with `throw new Error("abstract")`
- **`new.target`** — Check if called with new
- **OOP Pillars**
  - **Encapsulation** — Hide internal state (private fields, closures)
  - **Inheritance** — Reuse behavior via extends/prototypes
  - **Polymorphism** — Same interface, different implementations
  - **Abstraction** — Hide complexity behind simple interface
- **Composition over Inheritance** — Prefer composing objects/functions
- **`Object.freeze()` vs private fields** — Real vs enforced privacy
- **Four Ways to Create Objects**
  1. Object literal `{}`
  2. Factory function
  3. Constructor function
  4. Class
- **Constructor Functions (pre-ES6)** — `function Person(name) { this.name = name }` + `new`

## 2.7 ES6+ Modern Features [Part 16]

- **let & const** — Block-scoped variables
- **Arrow Functions** — Concise syntax, lexical `this`
- **Template Literals** — Backtick strings with interpolation
- **Destructuring** — Object & array pattern matching
- **Spread & Rest** — `...` operator
- **Default Parameters** — Inline defaults
- **Classes** — Class syntax
- **Modules (import/export)** — Native module system
- **Promises** — Async operation handling
- **Symbols** — New primitive type
- **Map, Set, WeakMap, WeakSet** — New collections
- **`for...of`** — Iterating iterables
- **Generators** — `function*`, `yield`
- **`Number` & `Math` additions** — Number.isInteger, Math.sign, etc.
- **`String` additions** — includes, startsWith, repeat, padStart
- **`Object` additions** — Object.assign, Object.entries, Object.values
- **`Array` additions** — find, findIndex, includes, flat
- **Async Functions** — `async`/`await` (ES2017)
- **Object Spread** — `{...obj}` (ES2018)
- **Optional Chaining** — `?.` (ES2020)
- **Nullish Coalescing** — `??` (ES2020)
- **BigInt** — `123n` (ES2020)
- **Private Class Fields** — `#` (ES2022)
- **`Array.at()`, `String.at()`** — Negative indexing (ES2022)
- **Top-level await** — Await at module scope (ES2022)
- **`Object.hasOwn()`** — Safer hasOwnProperty (ES2022)
- **`toSorted()`, `toReversed()`, `toSpliced()`, `with()`** — Immutable array methods (ES2023)
- **`Array.fromAsync()`** — Async array creation (ES2024)
- **`Promise.withResolvers()`** — External promise resolution (ES2024)
- **`Object.groupBy()`, `Map.groupBy()`** — Grouping (ES2024)
- **RegExp `v` flag** — Enhanced unicode (ES2024)

## 2.8 Error Handling [Part 17]

- **try / catch / finally** — Error handling block
- **throw** — Manually raise errors
- **Error Object** — `new Error("message")`, `.message`, `.name`, `.stack`
- **Error Types**
  - `Error` — Generic
  - `TypeError` — Wrong type used
  - `ReferenceError` — Undefined variable
  - `SyntaxError` — Invalid syntax
  - `RangeError` — Number out of range
  - `URIError` — Invalid URI functions
  - `EvalError` — eval() issues
  - `AggregateError` — Multiple errors (Promise.any)
- **Custom Error Classes** — `class MyError extends Error {}`
- **catch Binding** — `catch (err)` (optional binding ES2019)
- **finally** — Always runs (cleanup)
- **Error Propagation** — Rethrow, callback patterns, promise rejection
- **Error Stack Traces** — `.stack` for debugging
- **Error in Async Code** — Promise `.catch()`, try/catch with await
- **Unhandled Rejections** — `process.on('unhandledRejection')`, `window.onunhandledrejection`
- **Global Error Handlers** — `window.onerror`, `process.on('uncaughtException')`
- **Custom Error Factories** — Factory pattern for errors
- **Error.cause** — Chaining errors (ES2022)
- **Fail-Fast Principle** — Throw early, validate inputs

## 2.9 Iterators and Generators [Part 18]

- **Iterables** — Objects with `[Symbol.iterator]`
- **Iterator Protocol** — `{ next() → { value, done } }`
- **`Symbol.iterator`** — Well-known symbol for iterable protocol
- **Built-in Iterables** — String, Array, Map, Set, NodeList, arguments, generators
- **`for...of` Loop** — Uses iterator protocol
- **Spread & Rest with Iterables** — `[...iterable]`
- **Generators** — `function* name() {}`
  - **yield** — Pause and return value
  - **yield*** — Delegate to another generator/iterable
  - **Generator Return** — `gen.return(value)`
  - **Generator Throw** — `gen.throw(error)`
  - **Two-Way Communication** — `gen.next(value)` passes value back in
- **Infinite Generators** — Endless sequences with lazy evaluation
- **Generator Use Cases** — Lazy sequences, infinite streams, state machines, async workflows
- **Async Iterators** — `[Symbol.asyncIterator]`, `for await...of`
- **Async Generators** — `async function*` with `await` + `yield`
- **Custom Iterables** — Implement `[Symbol.iterator]()` manually
- **Lazy Evaluation** — Compute values only when needed
- **Generator Delegation** — `yield* otherGen`

---

# Level 3: Asynchronous JavaScript

## 3.1 Event Loop & Concurrency Model [Part 19]

- **Single-Threaded** — One call stack, one thing at a time
- **Non-Blocking** — Async operations don't block the thread
- **Concurrency vs Parallelism** — Concurrent (interleaved) vs parallel (simultaneous, workers)
- **Call Stack** — LIFO structure of function calls
- **Heap** — Memory allocation for objects
- **Callback Queue (Task Queue / Macrotask Queue)** — Queued callbacks
- **Microtask Queue** — Promise callbacks, queueMicrotask (higher priority)
- **Event Loop Steps**
  1. Execute all synchronous code (call stack)
  2. Process all microtasks (until empty)
  3. Take ONE macrotask from queue
  4. Repeat
- **Render Steps** — Browser paints between macrotask batches
- **Macrotasks** — setTimeout, setInterval, setImmediate, I/O events, UI events, MessageChannel
- **Microtasks** — Promise.then/catch/finally, queueMicrotask, MutationObserver, await continuations
- **Ordering Example** — `setTimeout(fn, 0)` vs `Promise.resolve().then(fn)` → microtask first
- **Starving the Stack** — Blocking with synchronous code
- **Blocking vs Non-blocking** — Synchronous long tasks vs async delegation
- **`setTimeout` minimum delay** — 4ms clamping for nested timers
- **`queueMicrotask()`** — Schedule microtask explicitly
- **Task Prioritization** — Priority queue (browser-specific: user interaction tasks)
- **Why event loop** — Enables async I/O without threads

## 3.2 Callbacks [Part 20]

- **Callback** — Function passed as argument, executed later
- **Asynchronous Callbacks** — Executed after async operation completes
- **Synchronous Callbacks** — forEach, map, filter (execute immediately)
- **Callback Hell** — Nested callbacks pyramid
- **Error-First Callbacks (Node)** — `(err, result)` convention
- **Callback Timing** — Async callbacks always after current call stack empties
- **Callback Inversion** — Losing control flow to nested functions
- **`setTimeout(fn, 0)`** — Defer execution
- **Callback Alternatives** — Promises, async/await, event emitters

## 3.3 Promises [Part 21]

- **Promise** — Object representing eventual completion/failure of async operation
- **Promise States** — pending → fulfilled / rejected (settled)
- **Promise Constructor** — `new Promise((resolve, reject) => {})`
- **Resolve/Reject** — Settle the promise
- **`.then(onFulfilled, onRejected)`** — Success/failure handlers, returns new promise (chainable)
- **`.catch(onRejected)`** — Error handling
- **`.finally(onFinally)`** — Cleanup regardless of outcome
- **Promise Chaining** — Return values propagate down chain
- **Promise Resolution** — Returned promise unwraps nested promises
- **Static Methods**
  - `Promise.resolve(value)`, `Promise.reject(reason)`
  - `Promise.all([...])` — Waits all, fails fast on rejection
  - `Promise.allSettled([...])` — Waits all, reports each status
  - `Promise.race([...])` — First to settle wins
  - `Promise.any([...])` — First to fulfill wins (ES2021)
  - `Promise.withResolvers()` — Create with external control (ES2024)
- **Promise Combinators** — all, allSettled, race, any
- **Thenable** — Object with `.then()` method (interoperability)
- **Promise Anti-Patterns**
  - Explicit promise construction (unless wrapping non-promise APIs)
  - Promise nesting (avoid, use chaining)
  - Swallowed errors (missing catch)
- **Fulfilled vs Rejected** — Settlement doesn't re-trigger
- **Error Propagation** — Rejections propagate through chain until caught
- **Promisification** — Wrapping callbacks in promises (`util.promisify`)
- **Synchronous then** — `.then()` on already-resolved promise still async

## 3.4 Async / Await [Part 22]

- **async function** — Declares function returning promise
- **await** — Pauses async function until promise settles
- **await Value** — Result of resolved promise (or the value itself)
- **Error Handling with try/catch** — Cleaner than .catch chains
- **Async Function Return** — Return value becomes resolved promise
- **Awaiting in Loops** — `for await` for async iterables; sequential vs `Promise.all` in loops
- **Sequential vs Parallel** — `await a(); await b()` vs `Promise.all([a(), b()])`
- **Top-Level Await** — Modules can await at top level (ES2022)
- **Async IIFE** — `(async () => {})()` for non-module scripts
- **Await in Conditionals** — await can't be inside non-async callback
- **Async Generator** — `async function*` combines async + generators
- **for await...of** — Consume async iterables
- **`await` with thenables** — Works with any thenable
- **Race Conditions** — Multiple awaited operations needing synchronization
- **`Promise.all` vs `await` sequential** — Performance difference
- **Async Error Flow** — Unhandled rejection → crash or unhandledrejection

## 3.5 Timers & Scheduling [Part 23]

- **setTimeout(callback, delay)** — One-time delay
- **setInterval(callback, delay)** — Repeated execution
- **clearTimeout(id)** / **clearInterval(id)** — Cancel timers
- **setImmediate (Node)** — Run after current poll phase
- **process.nextTick (Node)** — Run before next event loop iteration (highest priority)
- **Nested setTimeout** — Recursive scheduling instead of setInterval (adaptive)
- **Debounce** — Delay execution until calls stop
- **Throttle** — Limit execution rate
- **requestAnimationFrame (browser)** — Sync with screen refresh (60fps)
- **requestIdleCallback (browser)** — Run when browser is idle
- **Timer Phase Order (Node)** — timers → I/O callbacks → idle/prepare → poll → check → close callbacks
- **Zero Delay** — setTimeout(fn, 0) — still queued after current execution
- **Clamping** — 4ms minimum for nested/nested timers (browsers)
- **Scheduling vs Interval Drift** — setInterval can drift
- **Immediate vs nextTick** — setImmediate runs in check phase, nextTick before everything

## 3.6 Microtasks vs Macrotasks Deep Dive [Part 24]

- **Microtask Queue** — High priority, drained before next macrotask
- **Macrotask Queue** — Lower priority, one per event loop iteration
- **Sources of Microtasks** — Promise reactions, queueMicrotask, MutationObserver, await
- **Sources of Macrotasks** — setTimeout, setInterval, setImmediate, I/O, user events, MessageChannel
- **Draining Order** — Entire microtask queue drained before next macrotask
- **Microtasks Added During Drain** — Also processed (can starve)
- **Example Trace** — Predict output order of mixed sync/async code
- **Why Microtasks First** — Promise callbacks should run before rendering
- **Browser Rendering Gap** — Rendering happens between macrotasks
- **Node Process** — process.nextTick queue runs before microtasks (in Node)

## 3.7 Worker Threads & Web Workers [Part 25]

- **Web Workers (Browser)** — True parallelism via threads
- **Dedicated Workers** — `new Worker('worker.js')`
- **Shared Workers** — Shared across multiple contexts (SharedWorker)
- **Service Workers** — Network proxy, caching, offline, PWA
  - Lifecycle: register → install → activate → idle → terminate
  - Intercepts fetch events
  - Cache API
  - Background sync
  - Push notifications
- **Worker Communication**
  - `postMessage(message)` / `onmessage`
  - MessageChannel (two-way pipes)
  - `MessagePort`
- **Worker Restrictions** — No DOM access, no window, limited APIs
- **Transferable Objects** — Move ownership without copy (ArrayBuffer)
- **Structured Clone Algorithm** — Message serialization
- **Worker Threads (Node.js)** — `worker_threads` module
  - `new Worker(__filename, { workerData })`
  - `parentPort` / `postMessage`
  - `SharedArrayBuffer` for shared memory
  - `Atomics` for synchronization
- **mainThread vs worker** — `isMainThread`
- **Thread Pool** — Node's libuv thread pool (default 4, UV_THREADPOOL_SIZE)
- **CPU-bound Work** — Move heavy computation to workers
- **Offloading Strategies** — When to use workers
- **Termination** — `worker.terminate()`

## 3.8 Streams & Async Iterators [Part 26]

- **Node.js Streams** — Event-based data flow
  - **Readable** — Read data (`fs.createReadStream`)
  - **Writable** — Write data
  - **Duplex** — Both (net.Socket)
  - **Transform** — Modify data while passing (zlib, crypto)
- **Backpressure** — Slow consumer signals to slow producer
- **Stream Events** — 'data', 'end', 'error', 'finish', 'drain', 'close', 'pipe'
- **Stream Piping** — `readable.pipe(writable)`
- **Stream Methods** — `.pipe()`, `.on()`, `.destroy()`, `.pause()`, `.resume()`, `.read()`, `.write()`
- **`stream/promises`** — `pipeline()`, `finished()`
- **Object Mode Streams** — Stream objects not buffers
- **Readable.from()** — Create stream from iterable
- **Web Streams API** — `ReadableStream`, `WritableStream`, `TransformStream` (browser + Node)
  - `ReadableStreamDefaultReader`
  - `stream.pipeThrough(transform)`
- **Async Iteration with Streams** — `for await (const chunk of stream)`
- **Memory Efficiency** — Process chunks instead of loading whole file
- **TextDecoderStream** — Decode bytes to text streams
- **Buffers** — Node.js Buffer class, `Buffer.from()`, `.toString()`, alloc
- **Backpressure in web streams** — `.enqueue()`, desiredSize
- **Streaming Data Processing** — CSV, JSON streaming (JSONStream, etc.)

---

# Level 4: Browser Environment & DOM

## 4.1 Document Object Model (DOM) [Part 27]

- **DOM** — Programming interface for HTML/XML documents (tree structure)
- **DOM Tree** — Document → html → head/body → elements → text nodes
- **Node Types** — Element, Text, Comment, Document, DocumentFragment, Attribute
- **Selecting Elements**
  - `document.getElementById(id)`
  - `document.querySelector(selector)` — CSS selector (first match)
  - `document.querySelectorAll(selector)` — NodeList
  - `document.getElementsByClassName()`
  - `document.getElementsByTagName()`
- **Traversing DOM**
  - Parent: `.parentElement`, `.parentNode`
  - Children: `.children`, `.childNodes`, `.firstChild`, `.lastChild`, `.firstElementChild`
  - Siblings: `.nextSibling`, `.previousSibling`, `.nextElementSibling`, `.previousElementSibling`
- **Creating/Modifying Elements**
  - `document.createElement(tag)`
  - `element.textContent`, `element.innerHTML`
  - `node.appendChild(child)`, `node.insertBefore()`
  - `element.append(...nodes)`, `element.prepend(...nodes)`
  - `element.remove()`, `parent.removeChild(child)`
  - `element.replaceWith()`, `element.replaceChild()`
  - `element.cloneNode(deep)`
- **Attributes** — `getAttribute()`, `setAttribute()`, `removeAttribute()`, `hasAttribute()`
- **Properties vs Attributes** — `.value`, `.id`, `.className` vs `getAttribute`
- **Class Manipulation** — `classList.add()`, `classList.remove()`, `classList.toggle()`, `classList.contains()`
- **Styles** — `element.style.color = 'red'`, `getComputedStyle()`
- **Data Attributes** — `data-*`, `element.dataset`
- **Text Manipulation** — textContent vs innerText vs innerHTML
- **NodeList vs HTMLCollection** — Static vs live collections
- **DocumentFragment** — Off-DOM container for batch operations (performance)
- **Document Ready** — DOMContentLoaded vs load vs DOMContentLoaded order
- **Shadow DOM** — Encapsulation (part of Web Components)
- **Element Size & Position** — offsetWidth, clientWidth, scrollWidth, getBoundingClientRect()
- **`isConnected`** — Element attached to document

## 4.2 Event System [Part 28]

- **Events** — Actions/occurrences in the browser
- **Event Types**
  - **Mouse** — click, dblclick, mousedown, mouseup, mouseover, mouseout, mousemove, contextmenu
  - **Keyboard** — keydown, keyup, keypress (deprecated)
  - **Touch** — touchstart, touchmove, touchend, touchcancel
  - **Focus** — focus, blur, focusin, focusout
  - **Form** — submit, change, input, reset
  - **Window** — load, resize, scroll, unload, beforeunload, pageshow, pagehide
  - **Clipboard** — copy, cut, paste
  - **Drag & Drop** — dragstart, dragend, dragover, drop, dragenter, dragleave
  - **Media** — play, pause, ended, timeupdate
  - **Network** — online, offline
  - **Custom Events** — `new CustomEvent()`
- **Event Registration**
  - `element.onclick = handler` (single handler, property)
  - `element.addEventListener('click', handler)` (multiple, recommended)
  - `element.removeEventListener()` (must match function reference)
- **Event Object** — `event.type`, `event.target`, `event.currentTarget`, `event.timeStamp`
- **Event Propagation** — 3 phases
  1. **Capture phase** — window → target
  2. **Target phase** — reaches target
  3. **Bubble phase** — target → window
- **Capturing vs Bubbling** — `addEventListener('click', fn, true)` enables capture
- **`event.stopPropagation()`** — Stop bubbling/capturing
- **`event.stopImmediatePropagation()`** — Stop other listeners on same element too
- **`event.preventDefault()`** — Cancel default behavior (links, forms)
- **Event Delegation** — Listen on parent, use `event.target` matching
- **Bubbling Events vs Non-bubbling** — focus/scroll/resize don't bubble
- **`event.target` vs `event.currentTarget`** — Origin vs listener element
- **Dispatch Events** — `element.dispatchEvent(new Event('name'))`
- **Passive Listeners** — `{ passive: true }` (performance, scroll)
- **Once Listeners** — `{ once: true }` — auto-remove
- **Event Handler `this`** — Binds to element (unless arrow function)
- **Composition Events** — Keycode differences, `event.key`, `event.code`
- **Wheel/Mouse Coordinates** — clientX/Y, pageX/Y, screenX/Y, offsetX/Y
- **Pointer Events** — Unified mouse/touch/pen (pointerdown, pointermove)

## 4.3 Browser APIs [Part 29]

- **BOM (Browser Object Model)** — window, navigator, location, history, screen
- **window Object** — Global scope in browser
- **location** — `location.href`, `location.pathname`, `location.search`, `location.reload()`, `location.replace()`
- **history** — `history.pushState()`, `history.replaceState()`, `history.back()`, `history.forward()`, `history.go()`
- **navigator** — `navigator.userAgent`, `navigator.language`, `navigator.geolocation`, `navigator.clipboard`
- **alert/confirm/prompt** — Blocking dialogs (avoid in production)
- **screen** — `screen.width`, `screen.height`, `screen.orientation`
- **Timers** — setTimeout, setInterval, requestAnimationFrame, requestIdleCallback
- **Timing** — `performance.now()`, `Date.now()`, `performance.mark()`/`measure()`
- **URL API** — `new URL()`, `.searchParams`, `URLSearchParams`
- **AbortController** — Cancel fetch requests (`AbortSignal`)
- **BroadcastChannel** — Cross-tab communication
- **ResizeObserver** — Observe element size changes
- **IntersectionObserver** — Lazy loading, infinite scroll, scroll animations
- **MutationObserver** — Watch DOM changes
- **Fullscreen API** — `requestFullscreen()`, `exitFullscreen()`
- **Geolocation** — `navigator.geolocation.getCurrentPosition()`
- **Vibration API** — Mobile vibration
- **Network Information** — `navigator.connection`
- **Battery API** — Battery status (deprecated in some browsers)
- **Device Orientation** — Accelerometer, gyroscope
- **Page Visibility API** — `document.visibilityState`, visibilitychange
- **`document.title`**, **`document.domain`** — Document properties
- **`document.execCommand`** — Legacy clipboard (deprecated)

## 4.4 Fetch & HTTP [Part 30]

- **fetch()** — Modern HTTP request API
  - `fetch(url, { method, headers, body, credentials })`
  - Returns promise of Response
- **Response Object** — `.status`, `.ok`, `.headers`, `.text()`, `.json()`, `.blob()`, `.arrayBuffer()`, `.formData()`
- **Request Options** — method, headers, body, mode, credentials, cache, redirect, signal
- **Headers** — `new Headers()`, `.set()`, `.get()`, `.append()`, `.delete()`, `.has()`
- **HTTP Methods** — GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
- **Status Codes**
  - 2xx Success: 200 OK, 201 Created, 204 No Content
  - 3xx Redirect: 301, 302, 304 Not Modified
  - 4xx Client Error: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests
  - 5xx Server Error: 500, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout
- **Request Headers** — Content-Type, Authorization, Accept, Cache-Control, User-Agent, Origin
- **Response Headers** — Content-Type, Set-Cookie, Cache-Control, ETag, Location
- **CORS (Cross-Origin Resource Sharing)** — Origin, Access-Control-Allow-Origin, preflight
  - Simple vs Preflight requests
  - `Access-Control-Allow-Origin: *`
- **Content Types** — `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`
- **FormData** — Build multipart requests
- **XMLHttpRequest (XHR)** — Legacy HTTP API (still used)
- **Axios** — Popular HTTP library (promise-based, interceptors)
- **Cancellation** — AbortController + AbortSignal
- **JSON** — `response.json()`, JSON.stringify/parse
- **Query Strings** — URLSearchParams
- **Request Deduplication** — Avoid duplicate fetch calls
- **Retry Logic** — Automatic retries for transient failures
- **Timeout** — AbortController-based timeout
- **SSE (Server-Sent Events)** — One-way streaming via EventSource

## 4.5 Storage APIs [Part 31]

- **localStorage** — Persistent key-value storage (per origin)
  - `localStorage.setItem()`, `.getItem()`, `.removeItem()`, `.clear()`
  - Sync API, string values only
  - ~5MB limit
- **sessionStorage** — Per-tab, cleared on close
- **Cookies** — Small data sent with requests
  - `document.cookie`
  - Attributes: expires, max-age, domain, path, Secure, HttpOnly, SameSite
  - Size limit ~4KB, sent on every request
  - HttpOnly (not JS accessible), Secure (HTTPS only), SameSite (CSRF protection)
- **IndexedDB** — Full NoSQL database in browser
  - Object stores, indexes, transactions
  - Async API (IDBRequest), promises via wrappers
  - Large storage (quota-based)
  - `indexedDB.open()`, objectStore, transactions
  - Libraries: Dexie.js, idb
- **Cache API** — Cache for requests/responses (service workers)
  - `caches.open()`, `.add()`, `.match()`, `.put()`, `.delete()`
- **Web SQL** — Deprecated
- **File System Access API** — Read/write local files
- **OPFS (Origin Private File System)** — High-performance file storage
- **Storage Quotas** — `navigator.storage.estimate()`
- **Storage Security** — XSS → cookie theft, don't store sensitive in localStorage
- **When to use what** — Cookies (auth, small), localStorage (prefs), IndexedDB (structured data)

## 4.6 Canvas & Graphics [Part 32]

- **Canvas 2D API** — Immediate-mode 2D graphics
  - `canvas.getContext('2d')`
  - Drawing: fillRect, strokeRect, fillText, arc, beginPath, moveTo, lineTo
  - Styles: fillStyle, strokeStyle, lineWidth, globalAlpha, shadowBlur
  - Transformations: translate, rotate, scale, transform
  - Images: drawImage, getImageData, putImageData, createImageData
  - Text: font, textAlign, textBaseline, measureText
  - Gradients: createLinearGradient, createRadialGradient
  - Patterns: createPattern
  - Compositing: globalCompositeOperation
  - Animation loop: requestAnimationFrame
- **WebGL** — 3D graphics API
  - WebGL1 / WebGL2 (based on OpenGL ES)
  - Shaders (GLSL)
  - Buffers, textures, programs
  - Vertex/fragment shaders
- **WebGPU** — Modern GPU API (successor of WebGL)
  - Compute shaders, render pipelines
  - Device, queue, buffer concepts
- **SVG** — Vector graphics (part of DOM)
  - `<svg>`, `<path>`, `<circle>`, `<rect>`, `<text>`
  - SMIL animations, CSS animations
  - Manipulated via DOM
- **CSS vs Canvas vs SVG vs WebGL** — Choosing the right tech
- **Three.js** — Popular 3D library on WebGL
- **Canvas Libraries** — Fabric.js, Konva, p5.js, D3 (SVG/canvas)
- **Canvas Performance** — OffscreenCanvas, dirty rects, layer caching
- **Image Manipulation** — Pixels via getImageData/putImageData
- **Animation** — requestAnimationFrame best practices

## 4.7 WebSockets & Real-Time [Part 33]

- **WebSocket** — Full-duplex communication over TCP
  - `new WebSocket('ws://...')` or `wss://`
  - Events: open, message, error, close
  - Methods: send(), close()
  - Binary & text frames
- **WebSocket vs HTTP** — Persistent connection vs request-response
- **Handshake** — HTTP upgrade (`101 Switching Protocols`)
- **Real-Time Architecture**
  - Polling (legacy)
  - Long-polling
  - Server-Sent Events (SSE) — one-way
  - WebSocket — full-duplex
- **WebSocket Libraries** — Socket.io, ws (Node), SockJS, uWebSockets
- **Socket.io** — Event-based with rooms, namespaces, auto-reconnect, fallbacks
- **Reconnection** — Handling drops, heartbeat (ping/pong)
- **Backpressure** — Buffering when client slow
- **WebSocket Security** — wss://, origin validation, auth token in handshake
- **Room/Channel Pattern** — Broadcasting to groups
- **Scaling WebSockets** — Redis adapter, sticky sessions, multiple nodes
- **Message Protocol** — JSON, MessagePack, binary framing

## 4.8 Web Components [Part 34]

- **Web Components** — Encapsulated, reusable custom elements
- **Three Pillars**
  1. **Custom Elements** — `customElements.define('my-el', class extends HTMLElement)`
     - Lifecycle: connectedCallback, disconnectedCallback, attributeChangedCallback, adoptedCallback
     - `observedAttributes`
  2. **Shadow DOM** — Encapsulated DOM + styles
     - `attachShadow({ mode: 'open' | 'closed' })`
     - `:host`, `::slotted()` selectors
     - Style isolation
  3. **HTML Templates** — `<template>` element (inert markup), `<slot>` for content projection
- **Custom Element APIs** — `element.attachShadow()`, `:defined`, `upgradeElement`
- **Light DOM vs Shadow DOM** — External content vs encapsulated
- **Slots** — Named slots, fallback content, slotchange event
- **Styling Web Components** — CSS custom properties (design tokens)
- **Benefits** — Framework-agnostic, reusable, encapsulation
- **Libraries** — Lit (Google), Stencil, SkateJS, Haunted
- **Interop with Frameworks** — React/Vue/Angular can use custom elements
- **Element Upgrade** — When definition is registered

## 4.9 Browser Security [Part 35]

- **XSS (Cross-Site Scripting)** — Injecting malicious scripts
  - **Stored XSS** — Persisted in database
  - **Reflected XSS** — In URL/request
  - **DOM-based XSS** — Client-side injection
  - Prevention: escape output, never use innerHTML with untrusted input, CSP
- **CSRF (Cross-Site Request Forgery)** — Forged authenticated requests
  - Prevention: SameSite cookies, CSRF tokens, custom headers
- **CORS** — Cross-origin policy (server-controlled)
- **SOP (Same-Origin Policy)** — Browser's security boundary
- **CSP (Content Security Policy)** — Whitelist allowed resources
  - `Content-Security-Policy: default-src 'self'`
  - script-src, style-src, img-src directives
  - Nonces, hashes, report-only mode
- **Clickjacking** — Transparent overlay attacks, X-Frame-Options/frame-ancestors
- **X-Frame-Options** — DENY/SAMEORIGIN
- **SQL Injection** — (server-side, via backend JS)
- **HSTS (HTTP Strict Transport Security)** — Force HTTPS
- **HTTPS / TLS** — Encrypted transport
- **Secure Headers** — X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy
- **Cookie Security** — HttpOnly, Secure, SameSite
- **Token Storage** — localStorage vs cookie vs memory (in-memory safest for tokens)
- **Sandboxing** — iframe sandbox attribute
- **Subresource Integrity (SRI)** — `integrity="sha256-..."` for CDN scripts
- **Trusted Types** — Prevent DOM XSS sinks (innerHTML)
- **Sanitization** — DOMPurify library
- **Content Security Report** — report-uri/report-to
- **OAuth Security** — PKCE, state parameter
- **iframe security** — sandbox, allow attributes
- **Phishing vectors** — Open redirects, URL spoofing

## 4.10 Browser Performance [Part 36]

- **Rendering Pipeline** — DOM → CSSOM → Render Tree → Layout → Paint → Composite
- **Critical Rendering Path** — HTML → CSS → JS blocking
- **Render Blocking Resources** — CSS blocks render, JS blocks parse (without defer/async)
- **`defer` vs `async`** — defer (ordered, after parse) vs async (immediate, unordered)
- **Web Vitals**
  - **LCP (Largest Contentful Paint)** — Loading (target < 2.5s)
  - **INP (Interaction to Next Paint)** — Interactivity (target < 200ms, replaces FID)
  - **CLS (Cumulative Layout Shift)** — Visual stability (target < 0.1)
  - **FCP (First Contentful Paint)** — < 1.8s
  - **TTFB (Time to First Byte)** — Server response
- **Performance Tools** — Lighthouse, PageSpeed, Chrome DevTools Performance, WebPageTest
- **Bundle Size Optimization** — Tree shaking, code splitting, minification
- **Image Optimization** — WebP/AVIF, lazy loading (`loading="lazy"`), srcset
- **Lazy Loading** — IntersectionObserver, dynamic import()
- **Code Splitting** — Route-based, vendor bundles
- **Caching** — HTTP cache headers, ETag, Cache-Control, Service Worker caching
- **CDN** — Content delivery
- **Preloading** — `<link rel="preload">`, `<link rel="preconnect">`, `<link rel="dns-prefetch">`
- **Compression** — Gzip, Brotli
- **Minification** — Terser, esbuild
- **Tree Shaking** — Remove unused exports
- **Long Tasks** — >50ms blocks main thread
- **Web Worker Offloading** — Move heavy tasks off main thread
- **Layout Thrashing** — Read/write cycles forcing reflow
- **Reflow vs Repaint** — Layout (expensive) vs paint
- **Avoid Layout Thrashing** — Batch reads/writes
- **Debounce/Throttle scroll/resize handlers**
- **Passive event listeners** — scroll performance
- **RAIL Model** — Response, Animation, Idle, Load
- **65/95 Performance Budgets** — Enforce limits in CI
- **`content-visibility` CSS** — Skip offscreen rendering

---

# Level 5: Node.js & Backend

## 5.1 Node.js Fundamentals [Part 37]

- **Node.js** — JavaScript runtime built on V8 (Chrome's engine)
- **Created by** — Ryan Dahl (2009)
- **npm** — Node Package Manager
- **Event-Driven Architecture** — Non-blocking I/O via event loop
- **libuv** — C library providing event loop + thread pool
- **Node vs Browser** — No DOM, has fs/process/http, CommonJS + ESM
- **node command** — `node app.js`, `node -e`, `node -p`, `node --watch`
- **Process** — `process.argv`, `process.env`, `process.cwd()`, `process.exit()`, `process.platform`, `process.version`
- **Global Objects** — `global`, `process`, `Buffer`, `console`, `setTimeout`, `__dirname`, `__filename`
- **`__dirname` vs `__filename`** — Directory vs file path (CJS only)
- **Event Emitter** — `events` module, `EventEmitter` class, `.on()`, `.emit()`, `.once()`, `.off()`
- **Module Scope** — Each file has its own scope (not global)
- **Node Version Managers** — nvm, fnm, volta
- **Run Types** — `node`, `ts-node`, `nodemon`, `tsx`, `bun`, `deno`
- **Node LTS vs Current** — Long-term support releases
- **ECMAScript support** — Modern features available

## 5.2 Node.js Core Modules [Part 38]

- **fs (File System)**
  - `fs.readFile()`, `fs.writeFile()`, `fs.appendFile()`, `fs.rename()`, `fs.unlink()`, `fs.mkdir()`, `fs.rmdir()`, `fs.readdir()`, `fs.stat()`
  - `fs.createReadStream()`, `fs.createWriteStream()`
  - `fs.promises` — Promise-based API
  - `fs.watch()` — File watching
  - Sync vs Async vs Callback vs Promise APIs
- **path** — `path.join()`, `path.resolve()`, `path.basename()`, `path.dirname()`, `path.extname()`, `path.parse()`, `path.sep`
- **os** — `os.cpus()`, `os.platform()`, `os.release()`, `os.totalmem()`, `os.freemem()`, `os.homedir()`, `os.networkInterfaces()`
- **events** — `EventEmitter`
- **http / https** — `http.createServer()`, `http.request()`, `http.get()`
- **url** — `new URL()`, `url.parse()`, `url.format()`, `URLSearchParams`
- **querystring** — `querystring.parse()`, `querystring.stringify()`
- **crypto** — `crypto.createHash()`, `crypto.createHmac()`, `crypto.randomBytes()`, `crypto.createCipheriv()`, `crypto.pbkdf2()`
- **util** — `util.promisify()`, `util.format()`, `util.inspect()`, `util.callbackify()`
- **child_process** — `exec()`, `execFile()`, `spawn()`, `fork()`, `execSync()`
- **worker_threads** — `Worker`, `parentPort`, `workerData`
- **stream** — Readable, Writable, Transform, Duplex
- **net** — TCP servers/clients (`net.createServer()`)
- **dns** — `dns.lookup()`, `dns.resolve()`
- **assert** — `assert()`, `assert.strictEqual()`, `assert.deepStrictEqual()`, `assert.throws()`
- **timers** — setTimeout, setInterval, setImmediate
- **zlib** — `zlib.gzip()`, `zlib.gunzip()`, `zlib.deflate()`
- **buffer** — `Buffer.from()`, `.alloc()`, `.toString()`, `.concat()`
- **cluster** — Multi-core process clustering
- **readline** — CLI input (`readline.createInterface()`)
- **process** — Lifecycle, env, argv, signals, `process.nextTick()`

## 5.3 Modules & Package Management [Part 39]

- **CommonJS (CJS)** — `require()`, `module.exports`
  - `exports` vs `module.exports`
  - `require.resolve()`
  - Caching (modules cached after first require)
  - `module`, `exports`, `require`, `__dirname`, `__filename`
- **ES Modules (ESM)** — `import` / `export`
  - Named exports, default exports
  - Static analysis, tree-shaking friendly
  - `import * as ns`, `import()`, `export default`
  - Top-level await
- **ESM vs CJS Differences** — Static vs dynamic, `.mjs`/`.cjs` extensions, `"type": "module"` in package.json
- **Module Resolution** — node_modules lookup, package exports field
- **package.json** — Manifest file
  - name, version, description, main, type, scripts, dependencies, devDependencies, peerDependencies, engines, exports, bin
- **Dependency Types**
  - **dependencies** — Runtime
  - **devDependencies** — Build/test only
  - **peerDependencies** — Host environment requirements
  - **optionalDependencies** — Optional install
- **Semver (Semantic Versioning)** — MAJOR.MINOR.PATCH
  - ^ (compatible), ~ (patch), exact versions
  - ^1.2.3 — ≥1.2.3 <2.0.0
  - ~1.2.3 — ≥1.2.3 <1.3.0
- **package-lock.json** — Deterministic dependency tree
- **npm Commands** — install, uninstall, update, list, outdated, audit, run, publish, version, link, ci
- **npm Registry** — Public package registry
- **yarn** — Alternative package manager
- **pnpm** — Efficient, disk-space-saving package manager
- **npx** — Run packages without installing
- **Semantic Import** — Node built-ins prefixed with `node:`
- **Monorepos** — Multiple packages in one repo (npm workspaces, turborepo, lerna, nx)
- **Package Publishing** — npm publish, private registries, scopes (@scope/pkg)
- **Security** — `npm audit`, `npm audit fix`, supply chain attacks
- **ESLint/Prettier configs as packages**

## 5.4 Express & Web Frameworks [Part 40]

- **Express.js** — Minimal web framework for Node
  - `app.get/post/put/delete`
  - `app.use()` — Middleware
  - `req`, `res` objects
  - `res.json()`, `res.send()`, `res.status()`, `res.redirect()`, `res.render()`
  - Routing params (`:id`)
  - Error middleware
  - Static files (`express.static`)
- **Middleware Pattern** — Functions between request and response
  - `(req, res, next)`
  - Built-in: express.json(), express.urlencoded(), express.static()
  - Third-party: cors, morgan, helmet, cookie-parser, multer
  - Custom middleware
- **Request Object** — `req.params`, `req.query`, `req.body`, `req.headers`, `req.cookies`, `req.ip`, `req.path`
- **Response Object** — `res.status()`, `res.send()`, `res.json()`, `res.set()`, `res.cookie()`
- **Error Handling** — `app.use((err, req, res, next) => {})`
- **Express Alternatives**
  - **Fastify** — High performance, schema validation
  - **Koa** — Express successor (async/await middleware)
  - **Hapi** — Enterprise, config-driven
  - **NestJS** — Angular-style, TypeScript-first, modular
  - **Hono** — Edge-native, fast, tiny
- **NestJS Deep Dive**
  - Modules, controllers, providers, services
  - Dependency Injection (DI)
  - Decorators: @Controller, @Get, @Post, @Injectable, @Module
  - Guards, interceptors, pipes, filters
  - TypeORM/Prisma integration
  - Testing with Jest
- **Route Organization** — Routers, controllers, versioning
- **Request Validation** — zod, joi, express-validator, class-validator
- **Body Parsing** — JSON, urlencoded, raw, multipart
- **Serving Static Files** — express.static, nginx for production
- **Rate Limiting** — express-rate-limit
- **Production Considerations** — clustering, PM2, environment config

## 5.5 REST APIs & GraphQL [Part 41]

- **REST (Representational State Transfer)** — Architectural style
  - Resources + HTTP methods
  - Stateless, cacheable, layered
  - CRUD: GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE
- **REST Conventions** — /api/users/:id, plural nouns, nested resources
- **API Response Design** — Status codes, error format, pagination, filtering
- **Pagination** — limit/offset, cursor-based, page-based
- **Versioning** — /v1/users, header versioning
- **API Documentation** — Swagger/OpenAPI, Redoc, Postman
- **OpenAPI 3.0** — Standard spec for REST APIs
- **Swagger UI** — Interactive docs
- **GraphQL** — Query language for APIs (Facebook/Meta)
  - Single endpoint, client-specified fields
  - Schema + resolvers
  - Queries, mutations, subscriptions
  - Apollo Server, GraphQL Yoga
  - N+1 problem (solved with DataLoader)
  - Fragments, variables, aliases, directives
- **GraphQL vs REST** — Tradeoffs (over-fetching vs flexibility)
- **tRPC** — End-to-end typesafe APIs (TypeScript)
- **gRPC** — High-performance RPC (protobuf)
- **API Testing Tools** — Postman, Insomnia, curl, Thunder Client
- **Mock Servers** — MSW (Mock Service Worker), json-server
- **JSON:API spec** — Standard REST format
- **Idempotency** — Same request → same result (PUT, DELETE)
- **OpenAPI Generators** — Codegen for clients/servers

## 5.6 Databases & ORMs [Part 42]

- **SQL Databases**
  - **PostgreSQL** — Advanced open-source, JSONB, extensions
  - **MySQL / MariaDB** — Popular, widely used
  - **SQLite** — Embedded file-based
- **NoSQL Databases**
  - **MongoDB** — Document store (BSON), rich queries
  - **Redis** — In-memory key-value, caching, pub/sub
  - **Cassandra** — Distributed wide-column
  - **Elasticsearch** — Search engine (Lucene)
- **Connecting from Node** — pg (PostgreSQL), mysql2, mongodb drivers
- **ORMs (Object-Relational Mappers)**
  - **Prisma** — Modern TS-first ORM, schema-first
    - schema.prisma, migrations, Prisma Client
  - **TypeORM** — Entity/class-based
  - **Sequelize** — Promise-based, popular for MySQL/Postgres
  - **Mongoose** — MongoDB ODM (schema-based)
  - **Drizzle ORM** — Lightweight TS SQL ORM
  - **Knex** — SQL query builder
- **Query Builders** — knex, sql-template-strings
- **Migrations** — Versioned schema changes
  - `prisma migrate`, `sequelize-cli`, `knex migrate`
- **Connection Pooling** — pg Pool, mysql2 createPool
- **Transactions** — ACID, BEGIN/COMMIT/ROLLBACK
- **Indexing** — B-tree, partial, unique indexes
- **Data Modeling** — One-to-one, one-to-many, many-to-many
- **Database Drivers** — pg, mysql2, better-sqlite3, mongodb
- **Redis Usage** — Caching, sessions, rate limiting, queues
  - `redis` client, `ioredis`
  - BullMQ (Redis-backed queues)
- **Database Backups** — pg_dump, mysqldump, mongodump
- **Query Performance** — EXPLAIN, slow query logs, indexes

## 5.7 Authentication & Authorization [Part 43]

- **Authentication** — Verifying identity (who are you?)
- **Authorization** — Permissions (what can you do?)
- **Session-Based Auth**
  - Cookie + server-side session store
  - express-session, Redis session store
  - Session fixation protection
- **Token-Based Auth**
  - **JWT (JSON Web Token)** — Signed tokens
    - Header.payload.signature
    - HS256 (HMAC) vs RS256 (RSA)
    - jwt.sign(), jwt.verify(), expiresIn
    - Access token + refresh token pattern
  - **OAuth 2.0** — Delegated authorization
    - Authorization code flow, PKCE
    - Providers: Google, GitHub, etc.
  - **OIDC (OpenID Connect)** — Identity layer on OAuth2
  - **Passport.js** — Authentication middleware
    - Strategies: Local, JWT, OAuth2, Google, GitHub
  - **Auth libraries** — NextAuth/Auth.js, Clerk, Auth0, Supabase Auth
- **Password Hashing** — bcrypt, argon2, scrypt
  - Salt, cost factor, never store plaintext
- **RBAC (Role-Based Access Control)** — Roles → permissions
- **ABAC (Attribute-Based Access Control)** — Policy-based
- **CASL / Casbin** — Authorization libraries
- **Middleware Guards** — Protect routes by role/token
- **Refresh Token Rotation** — Security best practice
- **Session vs JWT Comparison** — Revocation, statelessness
- **Rate Limiting** — Prevent brute force
- **2FA / MFA** — TOTP (otplib), SMS, authenticator apps
- **Email Verification** — Magic links, verification tokens
- **Password Reset** — Secure token flows
- **Account Lockout** — After failed attempts
- **Audit Logging** — Track auth events
- **SSO (Single Sign-On)** — SAML, OIDC

## 5.8 Real-Time Backend [Part 44]

- **WebSocket Server** — `ws` library, `socket.io`
- **Socket.io Architecture**
  - Engine.IO (transport layer) — polling fallback
  - Rooms & namespaces
  - Events: emit, on, broadcast, to(room)
  - Middleware (socket.use)
  - Reconnection, heartbeat
- **Server-Sent Events (SSE)** — One-way server push
  - `text/event-stream`
  - Auto-reconnect, simple HTTP
- **Message Queues**
  - **BullMQ** — Redis-backed job queue (Node)
  - **RabbitMQ** — AMQP broker
  - **Kafka** — Distributed event streaming
  - **Redis Pub/Sub** — Simple pub/sub
- **Patterns** — Pub/Sub, Request/Reply, Queue/Workers
- **Chat App Architecture** — Rooms, presence, typing indicators
- **Realtime Databases** — Firebase Realtime Database, Supabase Realtime
- **Scaling** — Horizontal websocket servers, Redis adapter (socket.io-redis)
- **Presence Detection** — Online/offline tracking
- **Synchronization** — Yjs, CRDTs for collaborative editing
- **Polling vs Push** — When to use which

## 5.9 Microservices & Architecture [Part 45]

- **Monolith vs Microservices** — Tradeoffs
- **Service Communication**
  - REST over HTTP
  - gRPC (protobuf, HTTP/2)
  - Message brokers (RabbitMQ, Kafka)
- **Service Discovery** — Registries, DNS-based
- **API Gateway** — Central entry point
  - Kong, Traefik, Nginx, Express gateway
- **Load Balancing** — Round-robin, least connections, consistent hashing
- **Circuit Breaker** — Fail-fast pattern (opossum library)
- **Retries & Backoff** — Exponential backoff, jitter
- **Bulkheads** — Isolate failures per service
- **Timeouts** — Avoid cascading failures
- **Distributed Tracing** — OpenTelemetry, Jaeger, Zipkin
- **Log Aggregation** — ELK, Loki, Datadog
- **Configuration Management** — env vars, config files, config services
- **Secrets Management** — Vault, env, AWS Secrets Manager
- **Containerization** — Docker for microservices
- **Orchestration** — Kubernetes, Docker Compose
- **Event-Driven Architecture** — Event sourcing, CQRS, outbox pattern
- **Serverless Functions** — AWS Lambda, Vercel, Netlify Functions
- **12-Factor App** — Best practices for modern apps
  - Codebase, dependencies, config, backing services, build/release/run, processes, port binding, concurrency, disposability, dev/prod parity, logs, admin processes

## 5.10 Deployment & Production [Part 46]

- **Environment Variables** — process.env, dotenv, .env files
- **Configuration Management** — Production vs dev config
- **Process Managers** — PM2, systemd, forever
  - PM2: `pm2 start`, `pm2 logs`, `pm2 monit`, `pm2 reload`, cluster mode
- **Deployment Platforms**
  - **Vercel** — Frontend/Serverless
  - **Netlify** — Frontend/Serverless
  - **Heroku** — PaaS
  - **Railway, Render** — Modern PaaS
  - **Fly.io** — Distributed apps
  - **AWS** — EC2, Elastic Beanstalk, Lambda, ECS, EKS
  - **Docker** — Containerized deployment
- **CI/CD** — GitHub Actions, GitLab CI, Jenkins
  - Stages: lint → test → build → deploy
- **Logging in Production** — pino, winston, morgan, structured JSON logs
- **Error Tracking** — Sentry, Bugsnag, Rollbar
- **APM (Application Performance Monitoring)** — New Relic, Datadog, Elastic APM
- **Health Checks** — /health endpoints, readiness vs liveness
- **Graceful Shutdown** — SIGTERM handling, close servers
- **Reverse Proxy** — Nginx, Caddy (SSL termination, static files)
- **SSL/TLS in Production** — Let's Encrypt, certbot
- **Zero-Downtime Deployments** — Rolling, blue-green, canary
- **Backups & Recovery** — Database dumps, restore testing
- **Scaling Node.js** — cluster module, PM2 cluster, horizontal scaling, load balancer
- **Dockerfile for Node** — Multi-stage builds, alpine images, node user (not root)
- **`NODE_ENV`** — production vs development
- **Feature Flags** — Gradual rollouts (LaunchDarkly, Unleash)
- **Node Security** — helmet, input validation, dependency audit

---

# Level 6: Modern Frontend

## 6.1 React Ecosystem [Part 47]

- **React** — Component-based UI library (Facebook/Meta, 2013)
- **JSX** — JavaScript XML syntax
  - `{expression}` interpolation, camelCase props, className
  - Fragments `<>...</>`, conditional rendering, lists with keys
- **Components**
  - **Function Components** — Modern standard
  - **Class Components** — Legacy (componentDidMount, etc.)
  - **Props** — Read-only input data
  - **State** — Component-local mutable data
- **Hooks (React 16.8+)**
  - **useState** — State management
  - **useEffect** — Side effects (fetch, subscriptions)
    - Dependency array, cleanup function
  - **useContext** — Context consumption
  - **useReducer** — Complex state logic
  - **useRef** — Mutable refs, DOM references
  - **useMemo** — Memoized values
  - **useCallback** — Memoized functions
  - **useLayoutEffect** — Synchronous effects
  - **useId** — Unique IDs (SSR safety)
  - **useTransition** — Non-blocking updates
  - **useDeferredValue** — Deferred rendering
  - **useSyncExternalStore** — External stores
  - **Custom Hooks** — Reusable logic (useFetch, useLocalStorage)
- **Rules of Hooks** — Top level only, hooks in components/hooks only
- **Component Lifecycle (Class)** — Mounting/updating/unmounting phases
- **Props Drilling** — Passing props through many layers (solution: Context)
- **Context API** — Global state without prop drilling
  - `createContext`, `Provider`, `useContext`
- **React Rendering** — Virtual DOM diffing, reconciliation
- **Reconciliation** — Efficient DOM updates
- **Keys** — Stable identity for list items
- **Event Handling** — Synthetic events, delegation
- **Conditional Rendering** — &&, ternary, early return
- **Lists & Keys** — map + key
- **Forms in React** — Controlled vs uncontrolled components
- **Controlled vs Uncontrolled** — Value via state vs DOM ref
- **Portals** — Render outside DOM tree (modals)
- **Refs** — useRef, forwardRef, useImperativeHandle
- **Error Boundaries** — Class components catching errors
- **React Compiler** — Automatic memoization (2024+)
- **Suspense** — Async rendering, fallbacks
  - React.lazy — Code splitting
- **Server Components (RSC)** — Server-rendered React components
- **Concurrent Mode / Features** — Concurrent rendering
- **React 19 Features** — Actions, useOptimistic, useActionState, ref as prop
- **React DevTools** — Profiler, components tree
- **Key Libraries** — react-router, react-query (TanStack Query), zustand, react-hook-form

## 6.2 Vue Ecosystem [Part 48]

- **Vue.js** — Progressive framework (Evan You, 2014)
- **Vue 3** — Composition API (vs Options API)
- **Reactivity System** — Reactive proxies (Proxy-based in Vue 3)
  - `ref()`, `reactive()`, `computed()`
- **Template Syntax**
  - `{{ interpolation }}`, `v-bind:` (`:`), `v-on:` (`@`), `v-model`, `v-if`, `v-for`, `v-show`, `v-html`, `v-text`, `v-cloak`, `v-pre`, `v-once`
- **Directives** — v-if/v-else, v-for (with key), v-model (form binding), v-show (display:none)
- **Computed Properties** — Cached derived values
- **Watchers** — watch(), watchEffect()
- **Lifecycle Hooks** — onMounted, onUpdated, onBeforeUnmount, onCreated, onBeforeMount
- **Components** — defineComponent, props, emits, slots
- **Props & Emits** — Parent-child communication
- **Slots** — Content projection (named slots, scoped slots)
- **Provide/Inject** — Ancestor-descendant data
- **Composition API** — setup(), script setup, composables (like hooks)
- **Options API** — data, methods, computed, watch (Vue 2 style)
- **`<script setup>`** — Modern component authoring
- **Transition** — Enter/leave animations
- **Teleport** — Like React portals
- **Vue Router** — Client-side routing (createRouter)
- **Pinia** — Vue's official state management (replaces Vuex)
  - Stores, actions, getters, setup stores
- **Vuex** — Legacy state (Vue 2 era)
- **Nuxt.js** — Vue meta-framework (SSR/SSG)
  - File-based routing, server API, auto-imports
  - Nitro server engine
  - Nuxt 4 features
- **Vuetify, Element Plus, Naive UI** — Component libraries
- **Vue DevTools** — Browser extension
- **Vite** — Build tool (created by Vue team)

## 6.3 Angular [Part 49]

- **Angular** — Full-featured TypeScript framework (Google)
- **Angular 2+ vs AngularJS** — Complete rewrite (2016)
- **Architecture**
  - **Modules** — NgModules (NgModule decorator)
  - **Components** — @Component, templates, styles
  - **Templates** — HTML + Angular syntax
    - `{{ }}`, `*ngIf`, `*ngFor`, `[property]`, `(event)`, `[(ngModel)]`
  - **Services** — Injectable business logic (@Injectable)
  - **DI (Dependency Injection)** — Built-in DI container
- **Directives** — Structural (*ngIf, *ngFor, *ngSwitch) & attribute (ngClass, ngStyle)
- **Pipes** — Transform output (uppercase, date, async, custom)
- **RxJS** — Reactive programming core (Observables everywhere)
- **Standalone Components** — Modern (no NgModule needed, Angular 14+)
- **Signals** — New reactive primitive (Angular 16+)
- **Router** — Angular Router (routes, guards, lazy loading)
- **Forms** — Template-driven vs Reactive forms (FormControl, FormGroup)
- **HTTP Client** — HttpClient, interceptors
- **Change Detection** — Zone.js, onPush strategy
- **Lifecycle Hooks** — ngOnInit, ngOnDestroy, ngOnChanges, ngAfterViewInit
- **Testing** — Jasmine + Karma, TestBed, Testing Library
- **Angular CLI** — ng new, ng generate, ng build, ng serve, ng test
- **Angular Universal** — SSR
- **Material (Angular)** — Official component library (CDK)
- **Deferred Views** — @defer blocks (lazy content, Angular 17+)
- **Control Flow Syntax** — @if, @for, @switch (Angular 17+)

## 6.4 Svelte & Solid [Part 50]

- **Svelte** — Compiler-based framework (Rich Harris, 2016)
  - No virtual DOM — compiles to vanilla JS
  - Reactivity at compile time
- **Svelte Syntax**
  - `{expression}`, `{#if}`, `{#each}`, `{#await}`, `{#key}`
  - `let count = 0` — reactive declarations
  - `$:` reactive statements
  - `$store` — Store auto-subscription
- **Stores** — writable, readable, derived, custom stores
- **Components** — .svelte files, props (export let), events (createEventDispatcher), slots
- **Transitions** — Built-in transitions (fade, fly, slide)
- **Motion** — spring, tweened stores
- **Svelte 5** — Runes (`$state`, `$derived`, `$props`, `$effect`)
- **SvelteKit** — Official meta-framework
  - File-based routing, SSR/SSG, server load functions
  - Adapters (Node, Vercel, Netlify, static)
  - Endpoints, actions
- **SolidJS** — Fine-grained reactive framework
  - Signals, memos, stores
  - createSignal, createEffect, createMemo, createResource
  - JSX-based but fine-grained updates
  - No re-render (granular DOM updates)
- **Solid vs React** — Signals vs hooks
- **SolidStart** — Solid meta-framework

## 6.5 State Management [Part 51]

- **Client State** — UI state, form state
- **Server State** — Data from APIs (caching, invalidation)
- **Local Component State** — useState
- **Global State Solutions**
  - **Redux / Redux Toolkit** — Predictable state container
    - Actions, reducers, store, dispatch, selectors
    - Redux Toolkit: createSlice, createAsyncThunk
    - Immer (immutable updates)
    - Redux DevTools
  - **Zustand** — Minimal, hook-based store
  - **Jotai** — Atomic state (bottom-up)
  - **Recoil** — Meta's atom-based state
  - **MobX** — Observable-based reactive state
  - **XState** — State machines
  - **Signals** — (Preact/Solid/Angular)
- **Server State Libraries**
  - **TanStack Query (React Query)** — Data fetching, caching, invalidation
    - useQuery, useMutation, staleTime, refetchOnWindowFocus
  - **SWR** — Stale-while-revalidate (Vercel)
  - **Apollo Client** — GraphQL state
  - **Redux Toolkit Query** — RTK Query
- **State Management Patterns**
  - Unidirectional data flow
  - Actions → Reducer → Store → View
  - Immutability
- **URL as State** — Route-based state
- **Persisted State** — Redux-persist, zustand persist
- **Form State** — react-hook-form, Formik, final-form

## 6.6 Routing [Part 52]

- **Client-Side Routing** — SPA navigation without page reload
- **History API** — pushState, replaceState, popstate
- **Hash Routing** — #/path (legacy, works without server config)
- **Browser Routing** — Clean URLs (requires server fallback)
- **React Router** — Standard for React
  - createBrowserRouter, Route, Link, useNavigate, useParams, useLocation, useSearchParams
  - Nested routes, layouts, loaders, actions
  - Code splitting via lazy()
- **TanStack Router** — Type-safe routing
- **Vue Router** — createRouter, routes, router-link, router-view
  - Route guards, lazy loading
- **Next.js Routing** — File-based (app router)
  - Pages: page.js, layout.js, loading.js, error.js
  - Dynamic segments [id]
  - Link, useRouter, redirect
- **Nuxt Routing** — File-based pages/
- **SvelteKit Routing** — File-based +route
- **Route Guards** — Auth redirects, role-based access
- **Route Transitions** — Animations on navigation
- **Query Parameters** — Search state
- **Deep Linking** — Direct URL access
- **404 Handling** — Fallback routes

## 6.7 Styling Solutions [Part 53]

- **Plain CSS** — Global stylesheets
- **CSS Modules** — Scoped class names
  - `import styles from './x.module.css'`
- **CSS-in-JS** — Styles in JS
  - **Styled Components** — Tagged template literals
  - **Emotion** — CSS-in-JS
  - **JSS** — (older)
- **Utility-First CSS**
  - **Tailwind CSS** — Utility classes
    - Configuration, custom theme, dark mode
    - @tailwind directives, @apply
    - Just-in-Time (JIT) compilation
    - Tailwind v4 (CSS-first config)
  - **UnoCSS** — Atomic CSS engine
  - **Windi CSS** — (legacy Tailwind alternative)
- **Preprocessors**
  - **Sass/SCSS** — Variables, nesting, mixins, functions, partials
  - **Less** — CSS preprocessor
  - **PostCSS** — CSS transformation framework (autoprefixer, nesting)
- **CSS Variables** — Custom properties, theming
- **Design Systems** — Tokens, components, documentation
- **Responsive Design** — Media queries, breakpoints, fluid grids
- **BEM Methodology** — Block Element Modifier naming
- **CSS Frameworks** — Bootstrap, Bulma, Foundation
- **Component Libraries (styling)**
  - Material UI (MUI), Ant Design, Chakra UI, Radix UI, shadcn/ui, NextUI, Mantine, Headless UI, Vuetify, Element Plus, PrimeNG
- **Headless Components** — Radix, Headless UI, react-aria (logic without styles)
- **Styled System** — Style props
- **Dark Mode** — prefers-color-scheme, class strategy, media strategy

## 6.8 SSR, SSG & Meta-Frameworks [Part 54]

- **CSR (Client-Side Rendering)** — Render in browser (classic SPA)
- **SSR (Server-Side Rendering)** — Render HTML on server
  - Pros: SEO, faster first paint
  - Cons: server load, TTFB
- **SSG (Static Site Generation)** — Pre-render at build time
- **ISR (Incremental Static Regeneration)** — Next.js partial SSG
- **Hydration** — Attach JS to server HTML
- **Rehydration / Resumability** — Qwik concept
- **Streaming SSR** — Render HTML progressively
- **Meta-Frameworks**
  - **Next.js** — React (App Router, RSC, Server Actions)
  - **Nuxt** — Vue
  - **SvelteKit** — Svelte
  - **Astro** — Islands architecture (content-first, any framework)
  - **Remix** — React (fullstack, nested routes)
  - **SolidStart** — Solid
  - **Qwik City** — Qwik
  - **Gatsby** — React SSG (GraphQL data layer)
  - **Eleventy (11ty)** — Simple SSG
- **Islands Architecture** — Interactive islands in static HTML (Astro)
- **Server Actions** — Next.js mutations
- **Edge Rendering** — Deploy to edge networks (Cloudflare Workers, Vercel Edge)
- **Cache Strategies** — Static, ISR, dynamic
- **SEO Considerations** — Meta tags, structured data, sitemap, canonical
- **Headless CMS Integration** — Contentful, Sanity, Strapi, Prismic
- **MDX** — Markdown + JSX

## 6.9 Micro-Frontends [Part 55]

- **Micro-Frontends** — Split frontend by domain/team
- **Composition Approaches**
  - **Module Federation** (Webpack 5) — Share modules across builds
  - **iframe** — Isolation but poor UX
  - **Web Components** — Framework-agnostic boundaries
  - **Single-SPA** — Framework orchestration router
  - **Micro-Frontend frameworks** — qiankun, Luigi
- **Integration Patterns** — Build-time, runtime, server-side composition
- **Shared State** — Event bus, CustomEvent, browser storage
- **Shared Dependencies** — Singleton patterns, versioning
- **Styling Isolation** — CSS scoping, shadow DOM
- **Team Boundaries** — Conway's Law alignment
- **Routing** — App shell + micro-app routing
- **Communication** — postMessage, CustomEvents, shared bus
- **Testing** — End-to-end across fragments
- **Tradeoffs** — Complexity, bundle size, performance

## 6.10 Frontend Architecture Patterns [Part 56]

- **Component Architecture** — Composition, presentational vs container
- **Presentational vs Container Components** — UI vs logic separation
- **Hooks Architecture** — Custom hooks for logic reuse
- **Feature-Based Structure** — Folders per feature
- **Layered Architecture** — UI → services → data
- **Clean Architecture** — Entities, use cases, adapters, frameworks
- **Repository Pattern** — Data access abstraction
- **DTO (Data Transfer Objects)** — Shape data between layers
- **API Layer** — Centralized fetch calls
- **Error Handling Layer** — Centralized errors/toasts
- **State Location** — Component, context, global, server
- **Folder Structure Patterns** — Feature-first, layer-first
- **Monorepo Frontend** — Shared packages
- **Module Boundaries** — Enforced via ESLint rules
- **Scalability Considerations** — Code splitting, lazy routes, bundle budgets

---

# Level 7: Engineering & Tooling

## 7.1 TypeScript [Part 57]

- **TypeScript** — Typed superset of JavaScript (Microsoft, 2012)
- **Compiler** — `tsc`, tsconfig.json
- **tsconfig.json** — Configuration
  - target, module, strict, outDir, rootDir, lib, jsx, paths, moduleResolution, esModuleInterop, sourceMap, declaration
- **Type Annotations** — `let n: number`, `function f(a: string): void`
- **Primitive Types** — string, number, boolean, null, undefined, bigint, symbol, any, unknown
- **Structural Typing** — Duck typing based on shape
- **Interfaces** — `interface User { name: string }`
- **Type Aliases** — `type ID = string`
- **Interfaces vs Types** — Extends vs intersection, declaration merging
- **Union Types** — `string | number`
- **Intersection Types** — `A & B`
- **Literal Types** — `type Direction = 'left' | 'right'`
- **Generics** — `function identity<T>(x: T): T`
  - Generic constraints (`T extends SomeType`)
  - Generic interfaces, classes, functions
- **Arrays & Tuples** — `string[]`, `[string, number]`
- **Enums** — Numeric, string, const enums
- **Type Inference** — Automatic type deduction
- **Type Narrowing** — typeof, instanceof, in, discriminated unions, type predicates
- **Discriminated Unions** — Literal field to distinguish
- **Utility Types**
  - Partial<T>, Required<T>, Readonly<T>, Pick<T, K>, Omit<T, K>, Record<K, V>, Exclude, Extract, NonNullable, ReturnType, Parameters, Awaited, InstanceType
- **Mapped Types** — `{ [K in keyof T]: ... }`
- **Conditional Types** — `T extends U ? X : Y`
- **Template Literal Types** — `` `prefix${T}` ``
- **`keyof` & `typeof` operators**
- **Classes in TS** — Access modifiers (public, private, protected), readonly, parameter properties, abstract
- **Decorators** — Class/method/property decorators
- **Modules in TS** — import/export typing
- **Ambient Declarations** — .d.ts files, declare keyword
- **Type Declaration Files (.d.ts)** — Library types
- **`any` vs `unknown` vs `never`** — Unsafe, unknown-safe, never-unreachable
- **`strict` Mode** — strictNullChecks, noImplicitAny, etc.
- **`strictNullChecks`** — null/undefined handling
- **NonNull Assertion** — `x!`
- **Definite Assignment** — `let x!: number`
- **Type Assertions** — `as Type`, `<Type>` (angle-bracket)
- **Module Resolution** — node, bundler, classic
- **ts-node / tsx** — Run TS directly
- **ESLint for TS** — typescript-eslint
- **TypeScript with React** — React.FC, props typing, useRef typing
- **Type Safety Benefits** — Catch errors at compile time
- **TypeScript in the ecosystem** — Most frameworks now TS-first
- **`satisfies` operator** — Type-check without changing inferred type

## 7.2 Build Tools & Bundlers [Part 58]

- **Why Bundlers** — Combine modules, transform code, optimize
- **Bundler Evolution** — Browserify → Webpack → Vite/esbuild/Turbopack
- **Webpack** — The classic bundler
  - Entry, output, loaders, plugins
  - config: webpack.config.js
  - Loaders: babel-loader, ts-loader, css-loader, style-loader, file-loader
  - Plugins: HtmlWebpackPlugin, MiniCssExtractPlugin, terser-webpack-plugin
  - Code splitting (splitChunks, dynamic import)
  - Module Federation
  - HMR (Hot Module Replacement)
- **Vite** — Modern dev server + bundler (Evan You)
  - Native ESM dev server
  - esbuild for deps, Rollup for production
  - Instant HMR, no config by default
  - create-vite scaffolds
- **esbuild** — Extremely fast bundler (Go-based)
- **Rollup** — Library bundler (tree-shaking focus)
- **Parcel** — Zero-config bundler
- **Turbopack** — Rust-based (Next.js bundler, by Vercel)
- **Rspack** — Rust webpack-compatible (ByteDance)
- **Transpilers**
  - **Babel** — JS → JS (polyfills, modern syntax)
    - @babel/preset-env, @babel/preset-react, @babel/preset-typescript
    - Plugins, targets, browserslist
  - **SWC** — Rust-based transpiler (Next.js uses it)
  - **esbuild transform**
- **Minifiers** — Terser, esbuild, SWC minify
- **Tree Shaking** — Remove dead code (ESM only)
- **Code Splitting** — Split bundles for lazy loading
- **Source Maps** — Map compiled code → original
- **browserslist** — Browser support matrix
- **PostCSS** — CSS transforms (autoprefixer, etc.)
- **Package Mappers** — .env, DefinePlugin
- **Build Configs** — .env, .babelrc, browserslist, postcss.config.js
- **Cache Busting** — Content hashes in filenames
- **Assets** — Images, fonts, SVGs handling
- **Multi-Entry Builds** — Multiple pages

## 7.3 Testing [Part 59]

- **Testing Levels**
  - **Unit Tests** — Test isolated functions/components
  - **Integration Tests** — Test combined units
  - **E2E Tests** — Test full user flows (browser)
  - **Snapshot Tests** — Compare rendered output
  - **Visual Regression** — Screenshot comparison
- **Test Runners**
  - **Jest** — All-in-one (Meta)
    - describe/it/test, expect, matchers
    - Mocking (jest.fn, jest.mock)
    - Coverage (istanbul)
    - Watch mode, snapshot testing
  - **Vitest** — Vite-native test runner (fast)
  - **Mocha** — Flexible runner
  - **Jasmine** — BDD
  - **node:test** — Node built-in
- **Assertion Libraries** — Chai, expect (Jest)
- **Mocking** — Mock functions, modules, timers
  - jest.fn(), jest.mock(), jest.spyOn()
  - Mock timers (fake timers)
  - Mock service worker (MSW) for API mocking
- **Testing React**
  - **React Testing Library (RTL)** — DOM testing philosophy
    - render(), screen, fireEvent, userEvent, waitFor
    - Queries: getBy, queryBy, findBy
  - **Testing Library family** — @testing-library/vue, /angular, /svelte
  - **@testing-library/jest-dom** — Custom matchers
  - **React component testing patterns** — Testing behavior not implementation
- **Component Testing** — Storybook + Vitest + RTL
- **E2E Testing**
  - **Cypress** — Time-travel, real browser
    - cy.get, cy.click, cy.intercept, custom commands
  - **Playwright** — Modern E2E (Microsoft)
    - Auto-waiting, cross-browser, traces
    - Codegen, parallel workers
  - **Puppeteer** — Headless Chrome control
- **Test Data** — Factories (faker.js, @faker-js/faker), fixtures
- **Coverage Tools** — c8, Istanbul, coverage thresholds
- **TDD (Test-Driven Development)** — Red → Green → Refactor
- **BDD (Behavior-Driven Development)** — Gherkin (Cucumber)
- **Contract Testing** — Pact
- **CI Integration** — Run tests in pipelines
- **Testing Async Code** — async/await in tests, fake timers
- **Test Performance** — Parallelization, test sharding
- **Snapshot Testing** — When to use (avoid overuse)
- **Code Coverage Metrics** — Lines, branches, functions, statements
- **Mutation Testing** — Stryker

## 7.4 Code Quality & Linting [Part 60]

- **ESLint** — Static code analysis
  - Config: .eslintrc / eslint.config.js (flat config)
  - Rules: errors, warnings, off
  - Plugins: react, typescript, jsx-a11y, import, prettier
  - `npx eslint .`, --fix
  - AirBnB / Standard / Google configs
- **Prettier** — Opinionated code formatter
  - Config: .prettierrc
  - Semi, singleQuote, trailingComma, printWidth, tabWidth
  - Integration: prettier-eslint
- **ESLint vs Prettier** — Lint (correctness) vs format (style)
- **StyleLint** — CSS linting
- **Husky** — Git hooks (pre-commit)
- **lint-staged** — Lint only staged files
- **Hooks** — pre-commit, pre-push
- **Type Checking** — tsc --noEmit in CI
- **Code Reviews** — PR-based quality
- **EditorConfig** — Editor consistency
- **SonarQube** — Static analysis platform
- **SonarLint** — IDE integration
- **Code Complexity** — Cyclomatic complexity tools
- **Bundle Analysis** — webpack-bundle-analyzer, source-map-explorer
- **Dependency Check** — npm audit, Dependabot, Renovate

## 7.5 Debugging [Part 61]

- **console API** — log, error, warn, info, debug, table, trace, dir, group, time, timeLog, assert, count
- **Breakpoints** — Set in DevTools Sources
  - Line breakpoints, conditional, DOM, event listener, URL
- **Debugger Statement** — `debugger;`
- **Chrome DevTools Debugging**
  - Sources panel, call stack, scope, watch
  - Step over/into/out
  - Blackbox scripts
- **Node.js Debugging**
  - `node --inspect`, `node --inspect-brk`
  - Chrome DevTools attach
  - VS Code debugger (launch.json)
- **VS Code Debugger** — launch.json configurations, attach to Node
- **React DevTools** — Components tree, props/state, profiler
- **Vue DevTools** — Components, store, router tabs
- **Redux DevTools** — Time-travel debugging, action log
- **Network Tab** — Requests, responses, timings, throttling
- **Performance Profiling**
  - Performance tab — recordings, flame charts
  - Memory heap snapshots
  - Lighthouse audit
- **Post-mortem Debugging** — Error logs, crash reports
- **Stack Traces** — Reading and understanding
- **Error Source Maps** — In production debugging
- **Remote Debugging** — Mobile devices (Chrome DevTools on Android)
- **Debugging Libraries** — debug (Node), util.debuglog
- **Logging Best Practices** — Structured logs, levels, correlation IDs
- **`console.trace()`** — Log stack trace
- **Performance.now()** — High-res timing
- **Source Maps in Production** — Security consideration

## 7.6 Performance Optimization [Part 62]

- **Core Performance Concepts**
  - Time to Interactive (TTI), Total Blocking Time (TBT), Speed Index
  - First Input Delay (FID) → INP
- **Optimization Areas**
  - **JS Execution** — Reduce main-thread work, code splitting
  - **DOM Manipulation** — Batch updates, DocumentFragment, avoid reflow
  - **Network** — Minimize requests, caching, HTTP/2, CDN
  - **Memory** — Avoid leaks, clean up listeners
- **React Performance**
  - React.memo, useMemo, useCallback
  - Code splitting (React.lazy)
  - Virtualized lists (react-window, react-virtualized)
  - Avoid unnecessary re-renders
- **Virtualization** — Only render visible items
- **Debouncing/Throttling** — Input handlers, scroll, resize
- **Web Workers** — Offload CPU tasks
- **Service Worker Caching** — Offline, fast repeat visits
- **Image Optimization** — Formats, sizes, lazy loading
- **Font Optimization** — font-display, preload, subsetting
- **Critical CSS** — Inline above-the-fold styles
- **HTTP Caching** — Cache-Control, ETag, immutable
- **Prefetch/Preload** — Anticipate needs
- **Profiling Workflow** — Measure → Optimize → Re-measure
- **Bundle Budgets** — Enforce max sizes
- **Chrome DevTools Performance** — Flame charts, long tasks
- **Rendering Performance** — Layers, compositing, transform/opacity animations
- **Memory Leak Detection** — Heap snapshots, detached DOM nodes
- **Lightweight Alternatives** — Replace heavy libs (dayjs vs moment)
- **JIT Performance** — Monomorphic code, avoid deopts
- **Big O Awareness** — Algorithm choice

## 7.7 Security in JS Applications [Part 63]

- **Frontend Security**
  - XSS prevention (escaping, CSP, sanitizers)
  - Secure cookies
  - CSRF protection
  - Clickjacking protection
  - Dependency vulnerabilities (npm audit)
- **Node.js Security**
  - **Injection Attacks** — SQLi, NoSQLi, Command injection
    - Parameterized queries, input validation
  - **DoS (Denial of Service)** — Rate limiting, timeouts, payload limits
  - **Path Traversal** — Validate file paths
  - **SSRF (Server-Side Request Forgery)** — Validate URLs
  - **Prototype Pollution** — Prevent via safe merging
  - **Header Injection** — Validate input in headers
- **OWASP Top 10** — Web security risks
  1. Broken Access Control
  2. Cryptographic Failures
  3. Injection
  4. Insecure Design
  5. Security Misconfiguration
  6. Vulnerable & Outdated Components
  7. Identification & Authentication Failures
  8. Software & Data Integrity Failures
  9. Logging & Monitoring Failures
  10. SSRF
- **Secure Development Practices**
  - Input validation (zod, joi)
  - Output escaping
  - Least privilege
  - Secrets management (never hardcode)
  - Dependency scanning (Snyk, npm audit)
  - Security headers (helmet)
- **helmet** — Secure headers middleware
- **rate-limiter** — Express rate limiting
- **JWT Security** — Algorithm confusion, expiration, audience
- **Content Security Policy** — Header config
- **Supply Chain Security** — Lock files, signed packages, SBOM
- **Sensitive Data Handling** — PII, tokens, masking, encryption at rest
- **Compliance** — GDPR, CCPA, HIPAA (data handling)

## 7.8 Web Vitals & Metrics [Part 64]

- **Core Web Vitals**
  - **LCP** — Loading (largest content)
  - **INP** — Interaction responsiveness (replaces FID)
  - **CLS** — Visual stability
- **Other Metrics**
  - **FCP** — First content paint
  - **TTFB** — Server response time
  - **TTI** — Time to interactive
  - **TBT** — Total blocking time
  - **FMP** — First meaningful paint (deprecated)
  - **FID** — First input delay (legacy)
- **web-vitals library** — Measure in real user monitoring (RUM)
- **CrUX (Chrome User Experience Report)** — Field data
- **Lighthouse** — Lab-based auditing
  - Performance, accessibility, best practices, SEO scores
- **RUM vs Lab** — Real user vs simulated
- **Performance Budgets** — Bundle size, LCP thresholds
- **RUM Tools** — Sentry, Datadog RUM, New Relic Browser, LogRocket
- **Session Replay** — LogRocket, Sentry Replay (watch user sessions)
- **Metric Optimization Strategies** — Per metric
- **A/B Testing Impact** — Performance metrics as guardrails

## 7.9 Design Patterns [Part 65]

- **Creational Patterns**
  - **Factory** — Create objects via function
  - **Singleton** — Single instance (module pattern)
  - **Builder** — Fluent object construction
  - **Prototype** — Clone existing objects
- **Structural Patterns**
  - **Module** — Encapsulation (IIFE, ESM)
  - **Decorator** — Wrap to add behavior
  - **Adapter** — Interface adaptation
  - **Proxy** — Intercept operations
  - **Facade** — Simplified interface
  - **Composite** — Tree structures
  - **Mixin** — Combine behaviors
- **Behavioral Patterns**
  - **Observer** — Subject/observer (EventEmitter)
  - **Pub/Sub** — Decoupled event bus
  - **Strategy** — Swap algorithms
  - **Command** — Encapsulate action
  - **State** — State machine
  - **Middleware/Chain of Responsibility** — Pipeline handlers
  - **Iterator** — Sequential access
  - **Template Method** — Skeleton with overrides
- **Modern Patterns**
  - **Hooks Pattern** — Reusable logic
  - **Render Props** — Share code via props
  - **Higher-Order Components (HOC)** — Wrapper components
  - **Compound Components** — Implicit state sharing
  - **Controlled Components** — State above
  - **Provider Pattern** — Context-based sharing
  - **Container/Presentational** — Separation
  - **Error Boundary Pattern**
  - **Anti-Corruption Layer** — Boundary with legacy
  - **Repository Pattern** — Data abstraction
- **Functional Patterns**
  - **Currying** — Partial application
  - **Memoization** — Cache results
  - **Composition** — Compose functions
  - **Pipeline** — Data through functions
  - **Monads (Maybe, Either)** — Safe wrappers
- **Promise Patterns** — Retry, timeout, allSettled usage
- **Async Patterns** — Promise queue, batch processing, pool

## 7.10 Software Architecture [Part 66]

- **Architecture Styles**
  - **MVC (Model-View-Controller)** — Separation of concerns
  - **MVP / MVVM** — Variants (Vue, Angular styles)
  - **Layered Architecture** — Presentation → Business → Data
  - **Clean Architecture** — Dependency rule
  - **Hexagonal (Ports & Adapters)** — Isolate core
  - **Event-Driven** — Event-based communication
  - **Microservices** — Distributed services
  - **Monolithic** — Single deployable
- **Design Principles**
  - **SOLID**
    - S — Single Responsibility
    - O — Open/Closed
    - L — Liskov Substitution
    - I — Interface Segregation
    - D — Dependency Inversion
  - **DRY** — Don't Repeat Yourself
  - **KISS** — Keep It Simple
  - **YAGNI** — You Aren't Gonna Need It
  - **Composition over Inheritance**
  - **Separation of Concerns**
  - **Law of Demeter** — Minimize coupling
- **Architectural Patterns**
  - Feature-based folders
  - Domain-driven design (DDD)
  - CQRS (Command Query Responsibility Segregation)
  - Event Sourcing
  - Saga pattern (distributed transactions)
- **Frontend Architecture** — Component tree design, data flow
- **Backend Architecture** — Services, layers, modules
- **API Design** — REST, RPC, GraphQL choices
- **Error Handling Architecture** — Global handlers, error codes
- **Logging Architecture** — Centralized, structured
- **Monorepo vs Polyrepo** — Tradeoffs
- **Architecture Decision Records (ADR)** — Document decisions

---

# Level 8: Deep Internals

## 8.1 V8 Engine Internals [Part 67]

- **V8** — Chrome/Node's JavaScript engine (C++, Google)
- **Pipeline** — Parser → AST → Ignition → TurboFan
- **Parser** — Source → AST (Abstract Syntax Tree)
  - Preparsing (lazy parsing)
- **Ignition** — Bytecode interpreter
  - Bytecode generation
  - Register-based
- **TurboFan** — JIT optimizing compiler
  - Profile-guided optimization
  - Inlining, escape analysis, constant folding
- **JIT (Just-In-Time Compilation)** — Compile hot code at runtime
- **Hidden Classes** — Object shape tracking (maps)
  - Property access optimization
  - Transitioning on shape change
- **Inline Caches (ICs)** — Cache property lookups
- **Deoptimization** — Roll back optimized code
- **Monomorphic vs Polymorphic** — Call site optimization
- **Memory Model**
  - **Young Generation** — New objects (scavenger, semi-space)
  - **Old Generation** — Survivors (mark-sweep-compact)
  - **Mark-Sweep-Compact GC** — Main GC algorithm
  - **Scavenger** — Minor GC (copying)
  - **Generational GC** — Objects promoted between generations
  - **Incremental GC** — Chunked pauses
  - **Concurrent/Parallel GC** — Background threads
  - **Major vs Minor GC** — Full vs young collections
- **Optimization Killers** — try/catch, eval, with, arguments
- **Arrays** — Elements kinds (packed/holey, SMIs/doubles)
- **String** — Cons strings, slicing
- **`--trace-*` flags** — Trace optimization/deoptimization
- **Heap Statistics** — `v8.getHeapStatistics()`, process.memoryUsage()
- **WeakRef & FinalizationRegistry** — Weak references
- **Snapshots** — V8 start-up snapshots

## 8.2 Memory Management & GC [Part 68]

- **Memory Allocation** — Heap (objects), Stack (primitives/frames)
- **Mark-and-Sweep** — Reachability-based GC
- **Reference Counting** — (Not used in modern JS engines, cyclic issue)
- **Roots** — Global, stack, registry, active closures
- **Reachability** — Objects reachable from roots are kept
- **Garbage Collection Triggers** — Memory pressure, thresholds
- **Memory Leaks**
  - Global variables
  - Event listeners (never removed)
  - Timers retaining references
  - Closures capturing large objects
  - Detached DOM nodes
  - Accumulating caches
- **Detecting Leaks**
  - Heap snapshots (DevTools Memory)
  - Allocation timelines
  - process.memoryUsage (Node)
- **Stack vs Heap** — Primitives vs objects
- **Shallow vs Retained size** — Object size semantics
- **Weak References** — WeakRef, WeakMap, WeakSet
  - WeakMap keys must be objects (no enumeration)
  - Use for caching, metadata
- **FinalizationRegistry** — Cleanup hooks after GC
- **Memory Profiling** — Chrome DevTools, node --heap-prof
- **ArrayBuffer & SharedArrayBuffer** — Binary data, memory
- **Buffers (Node)** — External memory (off-heap)
- **Buffer Pooling** — Reuse buffers
- **Memory Pressure Handling** — Graceful degradation
- **`--max-old-space-size`** — Node memory tuning
- **Detached windows** — Retained via closures

## 8.3 Event Loop Internals (Node.js) [Part 69]

- **libuv** — Event loop implementation (C)
- **Node Event Loop Phases**
  1. **timers** — setTimeout/setInterval callbacks
  2. **pending callbacks** — I/O callbacks deferred
  3. **idle, prepare** — Internal
  4. **poll** — Retrieve new I/O events (blocking wait)
  5. **check** — setImmediate callbacks
  6. **close callbacks** — socket close events
- **process.nextTick** — Runs between each phase (before microtasks)
- **Microtasks (Node)** — Promise reactions, nextTick priority
- **`process.nextTick` vs `setImmediate`** — When they run
- **UV_THREADPOOL_SIZE** — Default 4, for fs/crypto/dns
- **I/O Operations** — Handled by OS/kernel (async)
- **Blocking Operations** — Delegated to thread pool
- **Timer Precision** — Not exact (ms resolution)
- **Poll Phase Blocking** — I/O waiting
- **Event Loop Iteration** — Full cycle through phases
- **Watching Event Loop** — `node --trace-event-categories` or `--prof`
- **`monitorEventLoopDelay`** — HTTP server metric
- **Clinic.js** — Performance profiling tools (doctor, bubbleprof, flame)

## 8.4 Browser Rendering Pipeline [Part 70]

- **Critical Rendering Path** — HTML → DOM, CSS → CSSOM, Render Tree, Layout, Paint, Composite
- **DOM Construction** — HTML parsing → DOM tree
- **CSSOM Construction** — CSS parsing → styles
- **Render Tree** — DOM + CSSOM combination
- **Layout (Reflow)** — Compute geometry
- **Paint** — Draw pixels (rasterization)
- **Composite** — Layer combination on GPU
- **Reflow Triggers** — DOM changes, style changes, viewport
- **Repaint** — Visual-only changes
- **Layer Promotion** — transform/opacity → compositor thread
- **Layout Thrashing** — Forced synchronous layout
- **RequestAnimationFrame** — Sync with frame
- **Frame Budget** — 16.7ms at 60fps
- **Long Tasks** — Blocking main thread >50ms
- **Browser Processes** — Main, GPU, Renderer, Network, Storage
- **Threads in Renderer** — Main, compositor, raster, worker
- **V8 + Blink + Skia + Chromium** — Browser stack
- **CSS Containment** — content-visibility, contain
- **Paint Areas** — Minimize repaint regions
- **GPU Acceleration** — Compositing, canvas, WebGL

## 8.5 WebAssembly (WASM) [Part 71]

- **WebAssembly** — Binary instruction format (runs in browsers, Node)
- **Purpose** — High-performance compute, languages other than JS
- **Use Cases** — Games, video/image processing, crypto, ML inference, Figma
- **WASM vs JS** — Performance for CPU-heavy work
- **Languages → WASM** — Rust, C/C++, Go, AssemblyScript (TS-like)
- **Compile Targets** — `wasm32` targets
- **WebAssembly.instantiate** — Load modules
- **WASI (WebAssembly System Interface)** — System access (files, stdio)
- **Emscripten** — C/C++ → WASM toolchain
- **wasm-bindgen** — Rust ↔ JS interop
- **SIMD** — Vector instructions in WASM
- **Threads** — Shared memory (SharedArrayBuffer)
- **Memory Model** — Linear memory, exports/imports
- **WasmEdge / Wasmtime / Wasmer** — Runtime implementations
- **Edge computing** — WASM on edge (Cloudflare Workers, Fastly)
- **AssemblyScript** — TypeScript-like language for WASM
- **WebGPU + WASM** — Future of graphics compute

## 8.6 Transpilers & Language Supersets [Part 72]

- **TypeScript** — Typed superset
- **CoffeeScript** — Ruby-like → JS (legacy)
- **JSX** — XML-like extension (React)
- **Flow** — Facebook's type checker (deprecated-ish)
- **Babel Transforms** — New syntax → older
- **Polyfills** — core-js, @babel/polyfill, whatwg-fetch
- **The Problem** — Feature detection, browser support
- **Feature Detection** — `'fetch' in window`
- **Compile Targets** — ES5 vs ES6 vs ES2020
- **AssemblyScript** — TS → WASM
- **ReasonML / ReScript** — OCaml-like → JS
- **Elm** — Purely functional → JS (compiler)
- **ClojureScript, Scala.js, Kotlin/JS** — JVM languages → JS
- **Fable** — F# → JS
- **Nim, Dart (compiles to JS)** — Others
- **Babel Plugins & Presets** — Transformation ecosystem
- **Babel vs TypeScript (transpilation)** — Overlapping roles
- **Ahead-of-Time (AOT) vs Just-in-Time (JIT)** — Compile strategies

## 8.7 JavaScript Runtimes (Beyond Node) [Part 73]

- **Node.js** — V8-based (2009)
- **Deno** — V8-based, secure by default (Ryan Dahl, 2018)
  - Built-in TypeScript
  - URL imports, no node_modules
  - Permissions (--allow-net)
  - deno.land registry
- **Bun** — Zig-based runtime (2022)
  - Bundler, test runner, package manager built-in
  - Fast startup, native TS support
- **Service Workers** — Browser background runtime
- **Workers (Cloudflare)** — V8 isolates at edge
- **Browsers** — V8, SpiderMonkey, JavaScriptCore
- **QuickJS** — Embeddable small engine (Figma uses)
- **Hermes** — React Native engine (Meta)
- **JavaScriptCore (JSC)** — Safari (Nitro)
- **J2V8 / GraalJS** — JVM-embedded JS
- **Runtimes Comparison** — Node vs Deno vs Bun
- **Edge Runtimes** — Vercel Edge, Netlify Edge, Cloudflare Workers

## 8.8 Reactive Programming [Part 74]

- **Reactive Programming** — Data flow + change propagation
- **Observables** — Streams of values over time
- **RxJS** — Reactive Extensions for JS
  - Observable, Observer, Subscription
  - Operators: map, filter, mergeMap, switchMap, debounceTime, take, tap, catchError
  - Subjects (Subject, BehaviorSubject, ReplaySubject, AsyncSubject)
  - Cold vs Hot observables
  - Angular relies on RxJS
- **Streams** — Event streams, value streams
- **Functional Reactive Programming (FRP)**
- **Signals (Fine-grained reactivity)** — Preact Signals, Solid, Angular Signals
  - Track/untrack, derived signals, effects
- **The Observer Pattern** — Foundation
- **pub/sub** — Event emitters
- **Reactive State in UI** — View reacts to state changes
- **Async Stream Handling** — Observables vs Promises vs Events
- **Backpressure** — Rate control in streams
- **FRP Libraries** — RxJS, most.js, xstream, Kefir, bacon.js

## 8.9 JavaScript Ecosystem Timeline & Trends [Part 75]

- **1995** — JavaScript created (Netscape)
- **1996** — Submitted to ECMA
- **1997** — ES1 standardized
- **1999** — ES3 (finally, try/catch, regex)
- **2005** — AJAX boom (Google Suggest)
- **2006** — jQuery (DOM manipulation for all)
- **2009** — Node.js, ES5
- **2010** — Backbone, AngularJS, npm
- **2013** — React, Electron
- **2014** — Vue, Docker era
- **2015** — ES6/ES2015 (huge modernization), Babel
- **2016-2019** — TypeScript rise, GraphQL, WebAssembly, Deno
- **2020** — Vite, esbuild, React 17, ESM everywhere
- **2021-2023** — React 18 (concurrent), Next.js App Router, Bun, Signals
- **2024-2026** — React Compiler, TypeScript 5.x, Vite 6/7, Tailwind v4, Node 22/24
- **Current Trends**
  - TypeScript-first development
  - Server Components & islands architecture
  - Edge computing
  - AI-assisted development (Copilot, Cursor)
  - Fine-grained reactivity (signals)
  - Compiler-driven optimization
- **The State of JS survey** — Ecosystem statistics
- **npm trends** — Package download data

## 8.10 JavaScript Patterns in the Wild [Part 76]

- **Module Pattern** — Encapsulation
- **Revealing Module Pattern** — Expose selected API
- **Namespace Pattern** — Avoid globals
- **Singleton in JS** — Modules as singletons
- **Factory Function Pattern** — Object creation
- **Prototype Pattern** — Cloning
- **Mixin Pattern** — Behavior composition
- **Decorator Pattern** — Wrapping
- **Proxy Pattern** — Interception (JS Proxy object)
- **Observer / PubSub** — Event-driven
- **Chain of Responsibility** — Middleware (Express)
- **Command Pattern** — Undo/redo (editors)
- **Strategy Pattern** — Swappable algorithms
- **State Pattern** — Finite state machines
- **Adapter Pattern** — API compatibility
- **Facade Pattern** — Simplified front
- **Builder Pattern** — Fluent chains
- **Caching Pattern** — Memoization, LRU cache
- **Debounce/Throttle Pattern** — Event rate control
- **Promise Queue Pattern** — Sequential async
- **Retry Pattern** — Transient failures
- **Circuit Breaker Pattern** — Fault tolerance
- **Batching Pattern** — Group requests
- **Event Sourcing Pattern** — State from events

---

# Level 9: Advanced Browser APIs

## 9.1 Web Audio API [Part 79]

- **Web Audio API** — High-level audio processing graph
- **AudioContext** — Entry point, manages audio hardware
- **Audio Graph** — Nodes connected: source → effect → destination
- **AudioNode Types**
  - Source nodes: OscillatorNode, AudioBufferSourceNode, MediaElementSource, MediaStreamSource
  - Effects: GainNode, BiquadFilterNode, DelayNode, ConvolverNode, CompressorNode, WaveShaperNode
  - Destination: AudioDestinationNode (speakers)
  - AnalyserNode — Frequency/waveform data
  - ChannelSplitter / ChannelMerger
  - StereoPannerNode, PannerNode (spatial)
- **Audio Context** — `new AudioContext()`, `audioContext.sampleRate`, `.currentTime`, `.resume()`
- **Creating Sound** — `oscillator = context.createOscillator()`, `.frequency.value`, `.type` (sine/square/sawtooth/triangle)
- **AudioBuffer** — Sample data, `context.createBuffer()`, `.getChannelData()`
- **Loading Audio** — `fetch(url) → arrayBuffer → decodeAudioData()`
- **Gain** — Volume control (`gain.gain.value = 0.5`)
- **Playback** — `bufferSource.start(time)`, `.stop()`, `.playbackRate`
- **Audio Processing (Worklets)** — AudioWorklet (main thread non-blocking processing)
- **Media Element** — `MediaElementAudioSourceNode` (connect HTMLAudioElement)
- **Recording** — MediaRecorder + getUserMedia
- **Visualization** — AnalyserNode + requestAnimationFrame + Canvas
- **Microphone Access** — `navigator.mediaDevices.getUserMedia({ audio: true })`
- **Web Audio Libraries** — Tone.js, Howler.js (audio player), Pizzicato, wavesurfer.js

## 9.2 Speech APIs [Part 80]

- **Web Speech API** — Two parts: recognition (STT) + synthesis (TTS)
- **SpeechSynthesis (TTS)** — Browser text-to-speech
  - `speechSynthesis.speak(utterance)`
  - `SpeechSynthesisUtterance` — text, voice, pitch, rate, volume
  - `speechSynthesis.getVoices()`, `.cancel()`, `.pause()`, `.resume()`
  - Voice selection, onvoiceschanged
- **SpeechRecognition (STT)** — Speech-to-text
  - `new SpeechRecognition()`
  - Continuous, interim results, language
  - Events: onresult, onerror, onend
  - `interimResults`, `maxAlternatives`
- **Browser Support** — Chrome/Edge good, Firefox partial
- **Libraries** — react-speech-recognition, SpeechSynthesis polyfills

## 9.3 Media Devices & Streaming [Part 81]

- **getUserMedia** — Camera/microphone access
  - `navigator.mediaDevices.getUserMedia({ video: true, audio: true })`
  - Constraints: width/height, facingMode, frameRate
  - Returns MediaStream (Promise-based)
  - Requires HTTPS + permission
- **MediaDevices API** — `enumerateDevices()`, `getDisplayMedia()`, `getUserMedia()`
- **MediaStreamTrack** — Individual tracks, `.stop()`, `.getSettings()`, `.getCapabilities()`
- **Display Capture** — `getDisplayMedia()` (screen sharing)
- **Recording** — MediaRecorder API
  - `new MediaRecorder(stream)`, `.start()`, `.stop()`
  - `ondataavailable`, `dataavailable` events
  - Produce blob → webm video/audio
- **Video Elements** — `<video>` with MediaStream as srcObject
- **WebRTC**
  - Peer-to-peer real-time communication
  - RTCPeerConnection, RTCSessionDescription, RTCIceCandidate
  - SDP (Session Description Protocol) — offer/answer
  - ICE candidates, STUN, TURN servers
  - DataChannels (binary/text)
  - Libraries: PeerJS, Socket.io + simple-peer, Daily.co
- **Image Capture API** — Take photos from camera stream (ImageCapture, grabFrame)
- **Permissions API** — `navigator.permissions.query({ name: 'camera' })`
- **Speech & Video conferencing architecture** — SFU (Selective Forwarding Unit) vs MCU (Multi-point Conferencing Unit)

## 9.4 Notifications, Push & Background [Part 82]

- **Notifications API** — `Notification.requestPermission()`, `new Notification(title, options)`
  - body, icon, badge, tag, data, silent, requireInteraction
  - `notification.onclick`, `.close()`
- **Permission States** — granted, denied, default
- **Push API** — Server-to-browser push (via service worker)
  - `PushManager.subscribe()`, applicationServerKey (VAPID)
  - push event in SW, showNotification()
  - Requires service worker + VAPID key
- **VAPID** — Voluntary Application Server Identification (Web Push protocol)
- **Web Push protocol** — Encrypted push payloads (RFC 8030)
- **Background Sync** — `sync` event in SW (offline data sync)
- **Periodic Background Sync** — `periodicsync` events
- **Notification Click** — Focus window, close notification
- **Permission UX** — Ask contextually, not on load
- **Web Push Libraries** — web-push (Node), Firebase Cloud Messaging (FCM)

## 9.5 File APIs & Drag & Drop [Part 83]

- **File API**
  - `<input type="file">` — FileList
  - File object — name, size, type, lastModified
  - `FileReader` — readAsText, readAsDataURL, readAsArrayBuffer, readAsBinaryString
  - `reader.onload`, `reader.onerror`, `reader.result`
  - `URL.createObjectURL(file)` — Preview images
- **Drag & Drop API**
  - draggable attribute
  - Events: dragstart, drag, dragenter, dragleave, dragover, drop, dragend
  - `dataTransfer.setData()`, `.getData()`, `.files`, `.dropEffect`
  - Drop zones, preventDefault on dragover
- **Drag & Drop Libraries** — dnd-kit, react-beautiful-dnd, SortableJS, interact.js
- **File System Access API** — `showOpenFilePicker()`, `showSaveFilePicker()`, `showDirectoryPicker()`
  - FileSystemFileHandle, `.createWritable()`
  - Permission checks
- **File System Observer** — Watch file/dir changes
- **OPFS (Origin Private File System)** — `navigator.storage.getDirectory()`
  - Sync access handles in workers
- **Downloading Files** — `<a download href="blob:">`, blob URLs
- **Upload Progress** — fetch + XMLHttpRequest upload events
- **Blob** — `new Blob([data], {type})`, `.slice()`, `.text()`, `.arrayBuffer()`
- **Streams from files** — ReadableStream for large files
- **Archive extraction** — JSZip, FFlate (zip in browser)
- **File upload libraries** — Dropzone, react-dropzone, uppy (tus resumable)
- **Tus protocol** — Resumable uploads

## 9.6 Clipboard, Selection & Text APIs [Part 84]

- **Clipboard API** — `navigator.clipboard.readText()`, `.writeText()`, `.read()`, `.write()`
  - Requires focus + permissions
  - `clipboard.read()` — ClipboardItem (images etc.)
- **Legacy fallback** — `document.execCommand('copy')`
- **Selection API** — `window.getSelection()`, `range`, `selectNodeContents()`
- **Range API** — `document.createRange()`, `.selectNode()`, `.extractContents()`, `.cloneContents()`
- **Contenteditable** — `contenteditable="true"` (rich text)
- **Rich Text Editing** — `document.execCommand` (legacy), Selection + Range for custom editors
- **Editing Libraries** — TipTap, ProseMirror, Slate, Quill, Lexical
- **Input Events** — beforeinput, input, compositionstart/end
- **Text Track API** — Subtitles/captions (WebVTT)

## 9.7 Sensors, Hardware & Device APIs [Part 85]

- **Geolocation API** — `getCurrentPosition()`, `watchPosition()`, position.coords
- **Device Orientation** — deviceorientation, devicemotion events (accelerometer, gyroscope)
- **Vibration API** — `navigator.vibrate(pattern)`
- **Battery API** — `navigator.getBattery()`, level, charging, chargingTime
- **Gamepad API** — `navigator.getGamepads()`, gamepadconnected, gamepaddisconnected
- **Web Bluetooth** — `navigator.bluetooth.requestDevice()`, GATT services/characteristics
- **Web Serial** — `navigator.serial.requestPort()` (Arduino, hardware)
- **WebUSB** — Communicate with USB devices
- **HID API** — Human Interface Devices (keyboards, mice, game controllers)
- **Screen Wake Lock** — `navigator.wakeLock.request('screen')`
- **EyeDropper API** — Color picker from screen
- **Web NFC** — Read/write NFC tags
- **Network Info** — `navigator.connection`, effectiveType, downlink, saveData
- **Online/Offline** — online, offline events, navigator.onLine
- **Page Lifecycle** — visibilitychange, pageshow, pagehide, freeze, resume
- **Storage Manager** — `navigator.storage.persist()`, `.estimate()`, `.persisted()`

## 9.8 Web Crypto & Secure Random [Part 86]

- **Web Crypto API** — `window.crypto.subtle` (cryptographic primitives)
- **SubtleCrypto** — Encrypt, decrypt, sign, verify, digest, generateKey, deriveKey, importKey, exportKey, wrapKey, unwrapKey
- **Algorithms** — AES-GCM, AES-CBC, AES-CTR, RSA-OAEP, RSA-PSS, ECDSA, ECDH, HMAC, SHA-1/256/384/512, PBKDF2, HKDF
- **crypto.getRandomValues()** — Secure random numbers
- **crypto.randomUUID()** — Generate UUID v4
- **Encryption Example** — AES-GCM: generateKey → encrypt(iv, data) → ciphertext+iv
- **Hashing** — `crypto.subtle.digest('SHA-256', data)`
- **Key Generation** — `crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign','verify'])`
- **Key Storage** — IndexedDB (non-extractable keys)
- **JWT in browser** — Sign/verify using Web Crypto
- **Safe Storage** — Don't store secrets client-side; use HttpOnly cookies
- **Web Authentication API (WebAuthn)** — FIDO2 passkeys
  - `navigator.credentials.create()` / `.get()`
  - PublicKeyCredential, authenticatorAttestationResponse
  - Passkeys, hardware security keys (YubiKey)
  - attestation & assertion

---

# Level 10: Data Visualization, Animation & Graphics

## 10.1 D3.js [Part 87]

- **D3 (Data-Driven Documents)** — SVG/Canvas visualization library (Mike Bostock)
- **Core Concepts**
  - Data join — enter/update/exit pattern
  - Selections — `d3.select()`, `d3.selectAll()`
  - Scales — `d3.scaleLinear()`, `d3.scaleBand()`, `d3.scaleOrdinal()`, `d3.scaleTime()`
  - Axes — `d3.axisLeft()`, `d3.axisBottom()`
  - Shapes — `d3.arc()`, `d3.line()`, `d3.area()`, `d3.pie()`
  - Transitions — `.transition()`, `.duration()`, `.ease()`
  - Enter/Exit — `.enter()`, `.exit()`, `.merge()`
- **Data Loading** — `d3.csv()`, `d3.json()`, `d3.tsv()`
- **Layouts** — Force simulation (force-directed graphs), chord, tree, treemap, cluster, pack, partition, histogram
- **Geo & Maps** — `d3.geoPath()`, `d3.geoMercator()`, TopoJSON/GeoJSON, choropleth maps
- **Random & Stat** — d3-random, d3-array (min, max, extent, bisect, quantile), d3-interpolate
- **Scales Types** — Linear, log, pow, time, band, point, quantize, quantile, threshold, ordinal, diverging
- **D3 Modules** — d3-array, d3-axis, d3-brush, d3-chord, d3-color, d3-drag, d3-force, d3-format, d3-geo, d3-hierarchy, d3-interpolate, d3-scale, d3-selection, d3-shape, d3-transition, d3-zoom
- **d3-zoom & d3-brush** — Zooming/panning, brushing selection
- **D3 vs Libraries** — Raw power vs convenience wrappers

## 10.2 Chart Libraries [Part 88]

- **Chart.js** — Simple, canvas-based
  - Chart types: line, bar, radar, doughnut, pie, polarArea, bubble, scatter, mixed
  - Config, options, datasets, scales, plugins
- **Recharts** — React chart library (composable components)
  - LineChart, BarChart, AreaChart, PieChart, RadarChart
- **Victory** — React chart components (Formidable)
- **ECharts** — Powerful (Apache), canvas, massive config
  - 20+ chart types, maps, 3D, dataZoom
- **Highcharts** — Commercial, SVG, popular in enterprise
- **ApexCharts** — SVG, modern, free
- **Nivo** — React + D3, themes
- **Plotly.js** — Scientific charts (contour, 3D, surface), large data
- **visx** — Airbnb, low-level React + D3 primitives
- **uPlot** — Ultra-fast, micro-charts, big datasets
- **Frappe Charts** — Simple, modern SVG
- **C3.js** — D3 wrapper (legacy)
- **Comparison** — Ease vs flexibility vs performance

## 10.3 Three.js & 3D Graphics [Part 89]

- **Three.js** — 3D library on WebGL (mrdoob)
- **Scene Graph** — Scene, Camera, Renderer, Mesh
- **Core Objects**
  - Scene, PerspectiveCamera, OrthographicCamera
  - Mesh (geometry + material)
  - Geometry: BoxGeometry, SphereGeometry, PlaneGeometry, BufferGeometry
  - Materials: MeshBasicMaterial, MeshStandardMaterial, MeshPhongMaterial, MeshLambertMaterial, MeshPhysicalMaterial
  - Light: AmbientLight, DirectionalLight, PointLight, SpotLight, HemisphereLight
  - Group, Object3D, Sprite, Points
- **Renderer** — WebGLRenderer, `.setSize()`, `.render(scene, camera)`
- **Animation Loop** — requestAnimationFrame, Clock, AnimationsMixer
- **Cameras** — Perspective vs Orthographic, position, lookAt
- **Controls** — OrbitControls, PointerLockControls, DragControls, FlyControls
- **Loaders** — GLTFLoader, OBJLoader, FBXLoader, TextureLoader, DRACOLoader
- **Textures** — TextureLoader, CubeTexture, environment maps
- **Shadows** — Shadow mapping, `.castShadow`, `.receiveShadow`
- **Raycasting** — Object picking (intersections)
- **Particles** — Points, PointsMaterial, custom shaders
- **Post-processing** — EffectComposer, BloomPass, UnrealBloomPass
- **Shaders** — ShaderMaterial, GLSL, uniforms, vertex/fragment
- **Physics** — rapier, cannon-es, Ammo.js (physx)
- **Animation** — GSAP + three, useFrame (react-three-fiber)
- **React Three Fiber** — React renderer for Three.js
  - <Canvas>, useFrame, useLoader, useThree
  - drei (helpers library)
- **Performance** — Instancing (InstancedMesh), draw calls, Level of Detail (LOD)
- **Loading Models** — glTF standard, draco/meshopt compression
- **WebGPU in Three** — WebGPURenderer

## 10.4 Animation Libraries [Part 90]

- **GSAP (GreenSock)** — Professional animation library
  - gsap.to(), gsap.from(), gsap.fromTo(), gsap.timeline()
  - Easing, stagger, duration, delay, repeat, yoyo
  - ScrollTrigger — Scroll-linked animations
  - Draggable, SplitText, MotionPath
  - `gsap.to(el, { x: 100, opacity: 0.5, duration: 1 })`
- **Framer Motion** — React animation library
  - motion components (`<motion.div>`)
  - animate, initial, exit, whileHover, whileTap, variants
  - AnimatePresence (enter/exit), layout animations
  - useScroll, useTransform, useInView
  - Gestures: drag, pan, hover, tap
  - Lazy motion (Motion One)
- **Motion One** — Lightweight Framer Motion core
- **React Spring** — Spring-physics animations
  - useSpring, useTransition, useTrail, useChain
- **Popmotion** — Animation engine (base of Framer Motion)
- **Anime.js** — Lightweight, declarative
- **Velocity.js** — jQuery-era
- **Lottie** — After Effects animations
  - lottie-web, @lottiefiles/react-lottie-player
  - JSON animation files, bodymovin export
- **CSS Animations vs JS** — transform/opacity GPU-accelerated
- **FLIP technique** — First, Last, Invert, Play (layout animations)
- **WAAPI (Web Animations API)** — Native browser animation
  - `element.animate()`, keyframes, options, Animation object
  - `animation.play()`, `.pause()`, `.reverse()`, `.cancel()`, `.finished`
  - waapi vs CSS vs JS libraries
- **Scroll Animations** — ScrollTrigger, Locomotive Scroll, Lenis (smooth scroll)
- **Text Animations** — SplitText, Split.js, Type.js, Typed.js (typing effect)

## 10.5 SVG & Canvas Libraries [Part 91]

- **SVG.js** — Manipulate SVG (like jQuery for SVG)
- **Snap.svg** — SVG manipulation (Adobe)
- **Raphael.js** — Legacy SVG/VML
- **Two.js** — Resolution-independent drawing API
- **Paper.js** — Vector graphics scripting (Tween.js)
- **PixiJS** — 2D WebGL renderer (games, sprites)
  - Application, Container, Sprite, Graphics, Ticker
  - Texture, TilingSprite, filters
  - Very fast sprite rendering
- **Konva.js** — Canvas + scene graph (desktop drawing, annotations)
- **Fabric.js** — Canvas object model (rich text, images, objects)
  - Rect, Circle, Image, Text objects, selection, serialization
- **p5.js** — Creative coding (Processing port)
  - setup(), draw() loop, shapes, noise, mouse interaction
- **Rough.js** — Hand-drawn sketch style graphics
- **Charting on Canvas vs SVG** — Performance vs crispness

## 10.6 WebGL, WebGPU & Shaders [Part 92]

- **WebGL 1/2** — GPU rendering API (OpenGL ES)
- **WebGL Pipeline** — Vertex shader → Primitive assembly → Rasterization → Fragment shader → Output
- **GLSL (GL Shading Language)** — Shader language
  - Vertex shader (positions), fragment shader (colors)
  - Attributes, uniforms, varyings, textures (sampler2D)
- **Typical WebGL Setup**
  - Get context → compile shaders → link program → create buffers → bind attributes → draw call (gl.drawArrays/drawElements)
- **Geometry** — Buffer creation (VBO), vertex attribute pointers, element index buffers
- **Textures** — gl.createTexture(), texImage2D, texture units, filtering/wrapping
- **Transforms** — Model/view/projection matrices, matrix libraries (gl-matrix)
- **Three.js** — Abstraction over raw WebGL
- **WebGPU (Modern)** — Next-gen GPU API (2023+, browsers rolling out)
  - Adapter, Device, Queue, CommandEncoder
  - RenderPass, ShaderModule (WGSL), BindGroup, Pipeline
  - Compute shaders
- **WGSL** — WebGPU Shading Language
- **Compute Shaders** — GPU general computation (GPGPU)
- **Physics/Simulation** — GPU particles, fluid simulation
- **Libraries** — regl (functional WebGL), OGL, Babylon.js, PlayCanvas
- **Game Engines** — Three.js, Babylon.js, PlayCanvas, Phaser (2D games), PixiJS
- **Phaser** — 2D game framework (sprites, physics, scenes, audio, input)
- **Babylon.js** — Full 3D engine (scenes, physics, materials, GUI)

---

# Level 11: Legacy JavaScript Ecosystem

## 11.1 jQuery & DOM Libraries [Part 93]

- **jQuery** — DOM manipulation library (John Resig, 2006)
  - $ selector engine — `$('#id')`, `$('.class')`, `$('tag')`
  - Chainable methods — `.addClass()`, `.css()`, `.html()`, `.text()`, `.attr()`, `.val()`
  - Events — `.on()`, `.off()`, `.trigger()`, `.click()`, `.hover()`
  - AJAX — `$.ajax()`, `$.get()`, `$.post()`, `$.getJSON()`
  - Effects — `.fadeIn()`, `.slideUp()`, `.animate()`
  - `.each()`, `.map()`, `.filter()`
  - `.append()`, `.prepend()`, `.remove()`, `.clone()`
  - `.find()`, `.children()`, `.parent()`, `.siblings()`, `.closest()`
  - `.data()`, `.prop()`
  - Cross-browser compatibility (its original purpose)
- **jQuery UI** — Widgets (accordion, autocomplete, datepicker, dialog, slider, tabs)
- **jQuery Mobile** — Mobile framework (dead)
- **Zepto** — Minimal jQuery alternative for mobile
- **Why jQuery declined** — Native querySelector, fetch, classList replaced it
- **jQuery Plugins** — Huge ecosystem (validation, select2, slick carousel)
- **jQuery AJAX** — XMLHttpRequest wrapper, before fetch
- **Migration** — Modern equivalents: querySelector, fetch, addEventListener

## 11.2 Early MV* Frameworks [Part 94]

- **Backbone.js** — Minimal MV framework (2010)
  - Models, Collections, Views, Routers
  - Events (Backbone.Events)
  - Synced with REST
  - Underpinned many early SPAs
- **Underscore.js** — Utility library (template engine, _.each, _.map, _.extend)
- **AngularJS (1.x)** — Full framework (Google, 2010)
  - Two-way data binding
  - Directives (ng-model, ng-repeat, ng-click, ng-show)
  - Scope, dependency injection, $http, $route
  - Controllers, services, filters
  - Digest cycle (dirty checking)
- **Ember.js** — Ambitious framework (2011)
  - Handlebars templates, Ember Data, computed properties
  - Router, components, services
  - Glimmer rendering engine
- **Knockout.js** — MVVM (observables, bindings)
- **CanJS** — MVVM framework
- **Aurelia** — Modern ES6 framework
- **Ext JS / Sencha** — Enterprise widgets
- **Dojo Toolkit** — AMD modules, dijit widgets
- **Meteor** — Full-stack reactive framework
  - Minimongo, DDP protocol, pub/sub
  - Real-time by default
- **Derby.js / Racer** — Realtime MVC
- **Comparison** — Why React/Vue replaced these (declarative, virtual DOM, unidirectional)

## 11.3 Legacy Tools & Patterns [Part 95]

- **XMLHttpRequest (XHR)** — Pre-fetch AJAX
  - xhr.open(), xhr.send(), onreadystatechange
  - readyState 0-4, responseText
- **JSONP** — JSON with padding (cross-domain pre-CORS)
  - `<script>` tag loading, callback param
- **document.write** — Blocking script insertion (legacy)
- **eval()** — Code execution (dangerous, slow)
- **with statement** — Scope manipulation (strict mode disallowed)
- **arguments.callee** — Self-reference in functions (removed strict)
- **var** — Function-scoped (pre-let)
- **Callbacks only** — Pre-Promise async patterns
- **IIFE module pattern** — Pre-ESM code organization
- **AMD (RequireJS)** — Asynchronous Module Definition
  - define(), require()
- **CommonJS early** — require/module.exports (Node)
- **Grunt / Gulp** — Task runners (pre-npm scripts)
  - Gruntfile.js, gulpfile.js (streams)
- **Bower** — Frontend package manager (dead, replaced by npm/yarn)
- **Yeoman** — Scaffolding generator
- **Browserify** — Bundle CJS for browser (pre-Webpack)
- **ES5 Shim/Polyfill era** — es5-shim, HTML5shiv
- **Modernizr** — Feature detection library
- **Vendor Prefixing** — -webkit-, -moz-, -ms- (autoprefixer solves)
- **IE6/7/8 era hacks** — Conditional comments, box-model hacks
- **Prototype.js / Script.aculo.us** — Early frameworks
- **MooTools** — Early framework
- **YUI (Yahoo UI)** — Early library
- **Mistake patterns** — Global namespace pollution, DOM string concatenation, inline events

---

# Level 12: Forms, Intl & Advanced UI Patterns

## 12.1 Forms Deep Dive [Part 96]

- **HTML Form Elements** — input (types), select, textarea, button, fieldset, label, datalist
- **Input Types** — text, password, email, number, date, time, url, tel, checkbox, radio, file, range, color, search, hidden
- **Form Attributes** — name, value, placeholder, required, pattern, min, max, minlength, maxlength, disabled, readonly, autocomplete, multiple, accept, step
- **Native Validation** — HTML5 constraint validation API
  - `form.checkValidity()`, `element.validity` (valueMissing, typeMismatch, patternMismatch, tooShort, tooLong, rangeUnderflow, rangeOverflow, stepMismatch, customError, valid)
  - `setCustomValidity()`, `reportValidity()`
  - `:invalid` / `:valid` CSS pseudo-classes
- **Form Events** — submit, change, input, focus, blur, invalid, reset
- **FormData API** — `new FormData(form)`, `.get()`, `.append()`, `.entries()`
- **Controlled vs Uncontrolled (React)**
  - Controlled — state-driven value, onChange handler
  - Uncontrolled — DOM managed, refs
  - Default values, defaultChecked
- **React Hook Form** — Performant forms
  - register(), handleSubmit, watch, formState, errors
  - Controller for custom components
  - Validation with zod/yup resolvers
  - useFieldArray (dynamic fields)
  - Mode: onChange/onBlur/onSubmit
- **Formik** — Forms for React (legacy style)
  - useFormik, validationSchema (yup), Field, Form components
- **Zod Integration** — schema validation
  - `z.object({ email: z.string().email() })`
  - Form-level + field-level schemas
- **Form State Management** — Dirty, touched, errors, values, submit state
- **File Upload Forms** — multipart/form-data, file input styling, previews
- **Multi-Step Forms** — Wizard pattern, state per step, validation per step
- **Debounced Validation** — Async validation (username availability)
- **Accessibility in Forms** — labels, aria-describedby, error announcements (role="alert"), focus management
- **Floating labels** — UI pattern
- **AutoComplete** — autocomplete attribute values, datalist vs custom
- **Form Security** — CSRF tokens, honeypot fields, rate limiting, server validation (never trust client)
- **Form Libraries (other)** — TanStack Form, react-final-form, Vue: vee-validate, Vuelidate

## 12.2 Internationalization (i18n) [Part 97]

- **i18n** — Internationalization (locale support)
- **l10n** — Localization (translations)
- **Locale** — Language + region (en-US, de-DE, zh-CN, fr-FR)
- **Intl API** — Built-in internationalization
  - `Intl.NumberFormat` — Number/currency formatting
    - `new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })`
  - `Intl.DateTimeFormat` — Date formatting
  - `Intl.RelativeTimeFormat` — "3 days ago"
  - `Intl.PluralRules` — Plural categories (one, few, many, other)
  - `Intl.Collator` — Locale-aware sorting
  - `Intl.ListFormat` — "a, b, and c"
  - `Intl.Segmenter` — Text segmentation (words/graphemes)
  - `Intl.DisplayNames` — Locale names
  - `Intl.DurationFormat` — Duration (ES2023+)
  - `Intl.Locale` — Locale object
- **ICU Message Format** — Message syntax with placeholders & plurals
- **i18next** — Popular i18n framework
  - t('key'), namespaces, interpolation
  - Plurals, contexts, nesting
  - Language detection, backend loaders
  - react-i18next (useTranslation, Trans component)
  - Next.js integration (i18next + app router)
- **Vue i18n** — vue-i18n
- **Format.js** — react-intl ecosystem (FormatJS)
- **Translation Workflow** — POT/PO files, gettext, Lokalise, Crowdin, Transifex
- **RTL (Right-to-Left)** — Arabic/Hebrew support (dir="rtl")
- **Date/Time in Locales** — Time zones, calendars (Gregorian, Islamic, Buddhist)
- **Number differences** — Decimal separators (1,5 vs 1.5), digit grouping
- **Currency & Units** — Intl.NumberFormat units (km/h, percent)
- **Text direction** — dir attribute, CSS logical properties
- **Best Practices** — Externalize strings, don't concatenate, key-based lookups, lazy-load locales
- **Language Negotiation** — Accept-Language header, navigator.language, fallback chains

## 12.3 Date & Time in JS [Part 98]

- **Date Object** — `new Date()`, `new Date('2025-01-01')`, `new Date(ms)`, `new Date(y, m, d, h, mi, s)`
- **Date Methods** — getFullYear, getMonth, getDate, getDay, getHours, getMinutes, getSeconds, getMilliseconds
- **UTC Methods** — getUTCFullYear, getUTCMonth, toISOString, getTimezoneOffset
- **Timestamps** — `Date.now()`, `date.getTime()` (ms since epoch)
- **Formatting** — toString, toDateString, toLocaleString, toLocaleDateString, toLocaleTimeString, Intl.DateTimeFormat
- **Parsing** — `new Date(string)` (Date.parse), format caveats
- **Time Zones**
  - UTC vs local
  - IANA time zone database (`Intl.DateTimeFormat(...).resolvedOptions().timeZone`)
  - `Date` timezone handling (local for most methods)
- **Temporal API** — Modern date/time proposal (TC39)
  - Temporal.PlainDate, Temporal.PlainTime, Temporal.PlainDateTime, Temporal.ZonedDateTime, Temporal.Instant, Temporal.Duration
  - Timezone-safe arithmetic
  - (In progress / available in polyfills)
- **Day.js** — Lightweight library (2KB)
  - .format(), .add(), .subtract(), .diff(), .isBefore(), .utc()
- **date-fns** — Functional date utilities
  - format(), addDays(), differenceInDays(), isSameDay()
  - Tree-shakeable, immutable
- **Luxon** — DateTime (by JS Foundation)
  - Timezone first-class, immutable
- **Moment.js** — Legacy (huge, in maintenance mode — use alternatives)
- **Duration & Intervals** — date-fns intervalToDuration, Temporal.Duration
- **Calendar calculations** — addMonths (overflow), leap years
- **Best Practice** — Store timestamps in UTC (ISO 8601), format at display time

## 12.4 Regular Expressions Deep Dive [Part 99]

- **RegExp Object** — `/pattern/flags` literal, `new RegExp('pattern', 'flags')`
- **Flags** — g (global), i (case-insensitive), m (multiline), s (dotall), u (unicode), y (sticky), v (unicode sets, ES2024)
- **Character Classes** — \d \w \s \D \W \S ., [a-z], [^...], \b (word boundary)
- **Quantifiers** — *, +, ?, {n}, {n,}, {n,m}, lazy (*?, +?, ??)
- **Anchors** — ^ start, $ end, \b boundary
- **Groups** — (capture), (?:non-capture), (?<name> named), \1 backreference, (?=lookahead), (?!negative lookahead), (?<=lookbehind), (?<!negative lookbehind)
- **Alternation** — a|b
- **Methods**
  - String: `.match()`, `.matchAll()`, `.replace()`, `.replaceAll()`, `.search()`, `.split()`
  - RegExp: `.test()`, `.exec()`
- **Global & Sticky** — lastIndex behavior
- **Unicode** — \p{L}, \p{N}, \p{Script=Greek}, \p{Emoji}, case folding, u flag
- **Performance** — ReDoS (catastrophic backtracking), avoid nested quantifiers, atomic groups (JS lacks), timeouts
- **Common Patterns** — Email, URL, phone, IP, dates, HTML tags, slugify, whitespace normalize
- **Building Regex** — Verbose composition, test tools (regex101, regexr)
- **Lookarounds** — Assertions without consuming
- **RegExp in validation** — zod.regex, form patterns
- **Escaping** — Escaping metacharacters, RegExp.escape()

## 12.5 Advanced UI Patterns & Techniques [Part 100]

- **Virtual Scrolling / Windowing** — Render only visible items
  - react-window (FixedSizeList, VariableSizeList), react-virtualized, @tanstack/virtual
- **Infinite Scroll** — IntersectionObserver sentinel
- **Tabs & Accordions** — Accessibility (keyboard, aria)
- **Modals & Dialogs** — `<dialog>` element, focus trap, aria-modal
  - Native dialog.showModal(), close()
- **Tooltips & Popovers** — Positioning, flip/fallback, hover vs click
- **Dropdown Menus** — Keyboard navigation, click outside
- **Autocomplete/Suggest** — Debounce, async results, keyboard
- **Toast Notifications** — Non-blocking feedback
- **Skeleton Loading** — Loading placeholders
- **Optimistic Updates** — Update UI before server confirm
- **Undo/Redo** — Command pattern, history stack
- **Drag & Drop reorder** — dnd-kit, sortable lists
- **Resizable panels** — Splitter, resize handles
- **Carousels/Sliders** — Accessibility, touch swipe
- **Context Menus** — Custom right-click menus
- **Command Palette** — Ctrl+K search UI (cmdk)
- **Hotkeys** — Keyboard shortcuts (react-hotkeys-hook, hotkeys-js)
- **Copy to Clipboard** — Feedback pattern
- **Empty states** — Good UX for no data
- **Progressive Enhancement** — Core function without JS
- **Web Components vs Framework Components** — Reuse across apps
- **Headless UI Components** — Logic only, style yourself (Radix, Headless UI, Ariakit, react-aria)
- **Compound Component Pattern** — Context-shared API (accordion, tabs)
- **Render Props / Slot API** — Flexible composition
- **Fluid Layouts** — CSS Grid + Flexbox integration
- **Dark Mode & Theming** — CSS variables, prefers-color-scheme, theme persistence

---

# Level 13: GraphQL, Realtime & Websocket Engineering

## 13.1 GraphQL Deep Dive [Part 101]

- **GraphQL** — Query language for APIs (Facebook 2012, public 2015)
- **Core Concepts**
  - Schema Definition Language (SDL)
  - Types: scalar, object, interface, union, enum, input
  - Scalars: String, Int, Float, Boolean, ID, custom scalars
  - Query, Mutation, Subscription root types
  - Fields & arguments
  - Resolvers — Functions that fetch field data
  - Fragments — Reusable field sets
  - Variables — Parameterized queries
  - Directives — @include(if:), @skip(if:), custom
  - Aliases — Rename results
  - Operation types & names
  - Introspection — Query the schema itself
- **Execution** — Resolver tree traversal, rootValue, context
- **N+1 Problem** — Resolver per item → N queries
  - **DataLoader** — Batch + cache per request
- **Servers** — Apollo Server, GraphQL Yoga, express-graphql, Mercurius (Fastify), graphql-js (reference)
- **Clients** — Apollo Client, urql, Relay
  - Apollo: useQuery, useMutation, cache (InMemoryCache), ApolloProvider
  - urql: lightweight, document caching
  - Relay: Meta, fragments, strong compiler
- **State in GraphQL Clients** — Normalized cache, fragments
- **Federation** — Composing subgraphs (Apollo Federation, GraphQL Mesh)
- **Subscriptions** — Real-time over WebSockets
  - graphql-ws protocol, subscriptions-transport-ws (legacy)
  - pubsub backends (Redis, in-memory)
- **Security**
  - Query complexity, depth limiting, cost analysis
  - Persisted queries (allowlist)
  - Rate limiting, timeout
  - Batch attacks
- **GraphQL vs REST** — Over-fetching vs flexibility, versioning, caching
- **Codegen** — graphql-codegen (typed clients, hooks)
- **Tools** — GraphiQL, Apollo Studio, Altair, Insomnia
- **Mocking** — graphql-tools mocks, MSW

## 13.2 WebSocket Engineering Deep Dive [Part 102]

- **WebSocket Protocol (RFC 6455)** — Frame-based, full-duplex
- **Frames** — Text (0x1), Binary (0x2), Ping (0x9), Pong (0xA), Close (0x8), Continuation (0x0)
- **Handshake** — HTTP Upgrade request, Sec-WebSocket-Key, Sec-WebSocket-Accept, 101 response
- **Node.js ws Library**
  - WebSocketServer, ws, connection event
  - ws.send(), ws.on('message'), ws.close()
  - JSON message encoding
  - ping/pong (isAlive heartbeat)
- **Socket.io (Detailed)**
  - Namespaces — `io.of('/namespace')` (isolation)
  - Rooms — `socket.join('room')`, `io.to('room').emit()`
  - Events — custom + built-in (connect, disconnect)
  - Acknowledgement — emit with callback
  - Middleware — socket.use((socket, next) => {})
  - Adapters — in-memory, Redis (multi-node)
  - Engine.IO — transport: websocket/polling, upgrade
  - Client: io(), socket.on(), socket.emit()
  - Reconnection, heartbeat, binary support
- **Broadcasting** — All clients, rooms, exclude sender
- **Presence** — Track online users (join user-room, heartbeat)
- **Scaling**
  - Sticky sessions (same node per client)
  - Redis adapter (`@socket.io/redis-adapter`)
  - Message broker for cross-node pub/sub
  - Horizontal scaling (load balancer, AWS ALB)
- **Backpressure Handling** — Slow clients, buffering, disconnect
- **Security** — Origin check, token auth, TLS (wss), message validation, rate limiting, max payload
- **WebSocket vs SSE vs Long-polling** — Use case matrix
- **Realtime Architecture Patterns**
  - Pub/Sub broadcast
  - Request/Response over socket
  - Presence system
  - Typing indicators
  - Notifications
- **Libraries** — ws, socket.io, uWebSockets.js (fast C++), SockJS, Faye, ActionCable (Rails)
- **Testing** — ws clients in tests, socket.io-client, mock server

## 13.3 Message Queues & Event-Driven Architecture [Part 103]

- **Message Queue** — Decouple producers/consumers
- **Patterns** — Pub/Sub, Work Queue (competing consumers), Fanout, Topic, Direct exchange
- **BullMQ** — Redis job queue
  - Queue, Worker, Job lifecycle (waiting, active, completed, failed, delayed)
  - Retries, backoff, concurrency, rate limiting
  - Job scheduling, repeatable jobs, priority
  - Bull Board (UI), repeat, pause/resume
- **Redis Pub/Sub** — Simple pub/sub channels (fire-and-forget)
- **Redis Streams** — Persistent log-based queues
- **RabbitMQ** — AMQP broker (exchanges, bindings, queues)
  - amqplib client
- **Kafka** — Distributed event streaming
  - Topics, partitions, consumer groups, offsets
  - kafkajs client
- **SQS (AWS)** — Managed queue
- **Event Sourcing** — Store events as source of truth
- **Outbox Pattern** — Reliable event publishing (DB + outbox table + relay)
- **Idempotency** — Consumer processes event once
- **DLQ (Dead Letter Queue)** — Failed message handling
- **Ordering Guarantees** — Partition keys
- **At-least-once vs At-most-once vs Exactly-once** — Delivery semantics
- **Background Job Examples** — Emails, image processing, report generation, notifications
- **Worker Processes** — Separate Node processes consuming queues

## 13.4 Event-Driven & Reactive Architectures [Part 104]

- **Event Bus** — Central event channel
- **EventEmitter (Node)** — `.on()`, `.once()`, `.emit()`, `.removeListener()`, `.error` event
- **Custom Events (browser)** — `new CustomEvent('name', { detail })`
- **Micro-event buses** — mitt, tiny-emitter (library)
- **State Machines** — XState
  - States, events, transitions, guards, actions, context
  - useMachine hook, Actor model
  - Visualizer (Stately)
- **Actor Model** — Isolated actors communicating by messages
- **Functional Reactive Programming** — RxJS
  - Observable creation: of, from, interval, fromEvent
  - Transformation: map, pluck, scan, buffer
  - Filtering: filter, take, first, skip, distinctUntilChanged, debounceTime, throttleTime, sampleTime
  - Combination: combineLatest, forkJoin, withLatestFrom, concat, merge, zip
  - Error: catchError, retry, retryWhen
  - Utility: tap, delay, timeout, finalize
  - Hot vs Cold observables, multicast, share, shareReplay
  - Subject: Subject, BehaviorSubject, ReplaySubject, AsyncSubject
  - Higher-order: mergeMap, switchMap, concatMap, exhaustMap
- **Backpressure** — Control flow in streams
- **Event Loop coordination** — Synchronizing async events
- **Signals (modern)** — Fine-grained reactivity (Preact, Solid, Angular, TC39 proposal)
  - signal(), computed(), effect()
  - Track, update, untrack
  - Framework: @preact/signals-react, Angular signals

---

# Level 14: CLI Development & Scripting

## 14.1 Building CLI Tools [Part 105]

- **Node CLI Basics** — `#!/usr/bin/env node` shebang
- **process.argv** — Parse arguments
- **Bin in package.json** — `"bin": { "mycli": "./bin/cli.js" }`, npm link
- **Argument Parsing**
  - **Commander.js** — program.command(), .option(), .argument()
    - `.version()`, `.helpOption()`, subcommands
  - **Yargs** — argv parsing, .command(), .options(), .demandCommand()
  - **minimist** — Minimal parser
  - **cac** — Modern minimal
  - **clap** — (Bun)
- **Interactive Prompts** — Inquirer.js
  - prompt types: input, password, list, checkbox, confirm, editor, number
  - validation, default, filter
  - @clack/prompts (modern, polished)
- **Styling Output** — chalk (colors), picocolors (tiny)
- **Spinners** — ora
- **Progress Bars** — cli-progress
- **Table Output** — cli-table3, cli-table, console.table
- **User Input (stdin)** — readline module, prompt-sync
- **Environment Variables** — process.env, dotenv, dotenv-cli
- **Exit Codes** — process.exit(0/1/2)
- **Signal Handling** — SIGINT (Ctrl+C), SIGTERM cleanup
- **Help & Docs** — Auto-generated help (commander), --help
- **Error Output** — stderr, error formatting, exit codes
- **Shebang & Executable Permissions** — chmod +x
- **Real-world CLIs** — create-vite, vite, next, tsc, eslint, prettier
- **Testing CLIs** — execa, cross-spawn, shelljs
- **Distribution** — npm publish, npx usage
- **Frameworks** — gluegun, oclif (Heroku), meow
- **Configuration Files** — Loading JSON/YAML, config directories (XDG)
- **GitHub Actions integration** — CLIs used in CI

## 14.2 Node Scripting & Automation [Part 106]

- **Scripts in package.json** — "scripts": { "build": "..." }
  - npm run build, pre/post hooks (prebuild, postbuild)
  - Passing args (npm run build -- --watch)
  - npm-run-all, concurrently (parallel scripts)
- **Node Scripting Patterns**
  - Reading files, processing, writing
  - Batch processing (image resize, rename files)
  - Data transformations (CSV/JSON)
  - Globbing — fast-glob, glob
  - Watch mode — node --watch, chokidar, nodemon
- **Shell Interaction** — child_process
  - exec (shell), spawn (streaming), fork (new Node process), execFile
  - execSync, spawnSync
  - Shell safety (spawn args, not strings)
- **CLI Utilities** — chalk, minimist for quick scripts
- **fs automation** — Rename files, organize directories
- **Scraping** — cheerio (jQuery on server), puppeteer
- **Automation Tools** — npm scripts, Makefile, GitHub Actions, Husky hooks
- **Scheduling** — node-cron, cron-parser
- **Report generation** — PDF (pdfkit, puppeteer print), Excel (exceljs), CSV
- **Email from scripts** — nodemailer
- **Environment Management** — dotenv, cross-env
- **Error handling in scripts** — exit codes, try/catch, logging

## 14.3 Interactive & Terminal UX [Part 107]

- **TUI (Terminal User Interface)** — Full terminal apps
- **Libraries** — blessed, blessed-contrib (dashboards), ink (React for CLIs), react-blessed, clack
- **Ink** — React components rendered to terminal
  - <Text>, <Box>, <Spacer>, useState/useEffect in terminal
  - Custom key bindings (useInput)
- **Terminal Graphics** — ANSI escape codes, box-drawing characters
- **Alternate screen** — Full-screen mode
- **Keyboard Input** — Raw mode, keypress events (keypress module)
- **Mouse support** — Enable in terminals
- **Colors & 256-color/truecolor** — ANSI 256, RGB
- **Terminal size** — process.stdout.columns/rows, resize events
- **Non-blocking input** — readline raw mode
- **Command history & completion** — readline, prompt autocomplete
- **Multi-select lists** — Checkbox prompts
- **Progress feedback** — Progress bars, spinners
- **Signals** — SIGWINCH (resize)
- **CLI testing** — PTY (node-pty), playwright for terminal, expect

---

# Level 15: Monorepos, Publishing & Release Engineering

## 15.1 Monorepo Tooling [Part 108]

- **Monorepo** — Multiple packages in one repository
- **Pros** — Shared code, atomic commits, single CI, consistency
- **Cons** — Scale, permission boundaries, tooling complexity
- **Workspaces**
  - **npm workspaces** — "workspaces": ["packages/*"]
  - **yarn workspaces** — yarn workspaces
  - **pnpm workspaces** — Efficient symlinked node_modules
- **Turborepo** — Build orchestration (Vercel)
  - turbo.json, tasks, cache, remote caching, dependsOn
  - Pipeline: build depends on ^build
- **Nx** — Monorepo framework (Nrwl)
  - Projects, generators, executors
  - Dependency graph, affected commands, computation caching
  - Integrated vs package-based repos
  - Nx Console (IDE)
- **Lerna** — Legacy monorepo tool (publishing focus)
  - Fixed vs independent versioning
- **Rush** — Microsoft monorepo
- **Bazel** — Build system (scalable)
- **Shared Packages** — UI library, types, utils, configs
- **Versioning** — Changesets, semantic-release
- **Dependency Management** — Workspace protocol (workspace:*, link:)
- **Testing across packages** — Affected tests only
- **CI Optimization** — Caching (turbo, nx), task distribution
- **Publishing from monorepos** — Changesets CLI (release workflow)
- **Commit conventions** — Conventional Commits, semantic versioning
- **Tools comparison** — pnpm + changesets, turborepo, nx

## 15.2 Package Publishing [Part 109]

- **npm publish** — Publishing process
- **Package Versioning** — Semantic Versioning (semver)
  - Major (breaking), Minor (feature), Patch (fix)
  - Prerelease (1.0.0-beta.1), dist-tags (latest, beta, next, canary)
- **Preparing a Package**
  - "main", "exports", "types", "files", "sideEffects"
  - Build step (tsup, tsc, rollup)
  - README, LICENSE, CHANGELOG
  - .npmignore / "files" allowlist
  - Dual ESM/CJS builds ("exports": { "import": ..., "require": ... })
  - .d.ts type declarations
- **Scoped Packages** — @scope/package (private by default)
- **npm link** — Local development linking
- **Publishing Flow**
  - npm version (patch/minor/major)
  - npm publish
  - Tagging (latest, beta)
- **semantic-release** — Automated versioning
  - Commit message → version bump
  - Generates changelog, tags, releases
  - GitHub releases, npm publish automation
- **Changesets** — Monorepo release tool
  - .changeset files, changeset version, changeset publish
  - Version packages independently
- **Release Branches** — Release branches, hotfix flows
- **Private Registries** — npm enterprise, Verdaccio, GitHub Packages
- **Registry Auth** — .npmrc authToken, CI tokens
- **Publishing to multiple registries** — npmjs + GitHub + custom
- **Deprecating packages** — npm deprecate
- **Package Security** — provenance (npm provenance), signing, 2FA
- **Documentation** — README, API docs (typedoc, docusaurus), examples
- **CI/CD Pipeline for publishing** — GitHub Actions (npm publish on tag)
- **Test before publish** — prepublishOnly, prepack scripts

## 15.3 Release Engineering & Versioning [Part 110]

- **Release Strategies** — Trunk-based, git-flow
- **Git Flow** — main, develop, feature, release, hotfix branches
- **Trunk-Based** — Short-lived branches, feature flags
- **Semver Automation** — Conventional commits (feat, fix, BREAKING CHANGE)
- **Changelog Generation** — conventional-changelog, git-cliff, semantic-release
- **Release Candidates** — RC builds for testing
- **Canary Releases** — Frequent pre-releases (vite, next use canary)
- **Dist-tags** — latest, beta, rc, next, canary
- **Backporting** — Cherry-pick fixes to LTS/release branches
- **LTS (Long-Term Support)** — Node LTS schedule (even versions)
- **Versioning of apps vs libraries** — CalVer (2025.01) vs SemVer
- **Rollbacks** — Revert releases, previous versions
- **Feature Flags** — Ship features disabled, enable remotely
- **Migration guides** — Document breaking changes
- **Lockfiles discipline** — Commit package-lock.json for apps
- **Release Notes** — User-focused summaries

## 15.4 CI/CD for JS Projects [Part 111]

- **GitHub Actions**
  - .github/workflows/*.yml
  - jobs, steps, runs-on, services
  - actions: checkout, setup-node, cache
  - Node matrix testing (node 18/20/22)
  - npm ci (from lockfile), npm run lint, npm test, npm run build
  - Upload artifacts, deploy
  - Conditional (on: push, pull_request, tags)
  - Secrets (env, secrets)
  - Caching (node_modules, turbo/nx cache)
- **GitLab CI** — .gitlab-ci.yml, stages, runners, artifacts
- **Jenkins** — Pipeline as Code (Jenkinsfile)
- **CircleCI** — Config-driven CI
- **Verification** — Type check, lint, format check, unit tests, e2e tests, bundle size check
- **Code Coverage Gate** — Enforce minimum coverage
- **Security Scans** — npm audit, Snyk, CodeQL
- **Deploy** — Vercel, Netlify, AWS, GH Pages
- **Preview Deployments** — PR environments
- **Environment Matrix** — OS + Node version matrix
- **Test Parallelization** — Sharding, CI splits
- **Monorepo CI** — Affected builds (turbo filter, nx affected)
- **Cache Keys** — Deterministic cache invalidation
- **Timeouts & Concurrency** — CI performance

---

# Level 16: SEO, Accessibility & Content

## 16.1 SEO for JavaScript Apps [Part 112]

- **Why SEO matters for JS** — Google renders JS, but SSR helps
- **Crawling & Indexing** — Googlebot executes JS (crawling budget)
- **Rendering Strategies for SEO**
  - **SSR** — Full HTML on server (best SEO)
  - **SSG** — Pre-rendered static (best performance + SEO)
  - **ISR** — Next.js incremental
  - **Prerendering** — Dynamic rendering (bot detection)
  - **CSR** — Worst for SEO (empty shell)
- **Meta Tags** — title, meta description, canonical, Open Graph, Twitter Cards
  - `<title>`, `<meta name="description">`
  - `<link rel="canonical">`
  - og:title, og:image, og:description, og:type, og:url
  - twitter:card, twitter:image
- **Structured Data (Schema.org)** — JSON-LD
  - Article, Product, FAQPage, BreadcrumbList, Organization, Person
  - `<script type="application/ld+json">`
- **Next.js SEO** — Metadata API (generateMetadata, viewport), dynamic metadata
- **Sitemap** — XML sitemap, robots.txt
  - sitemap.xml (Next.js app/sitemap.ts)
  - robots.txt directives (allow/disallow, sitemap)
- **International SEO** — hreflang tags, localized URLs
- **Performance → SEO** — Core Web Vitals influence ranking
- **Content** — Heading hierarchy (h1-h6), semantic HTML
- **Links** — Internal linking, descriptive anchor text
- **Client-side routing SEO** — History API URLs (not hash)
- **Analytics** — Google Analytics 4, Plausible, GA events
- **Search Console** — Indexing status, URL inspection
- **Redirects** — 301 vs 302, server config
- **Technical SEO Tools** — Lighthouse, Ahrefs, Screaming Frog
- **JavaScript SEO pitfalls** — No JS content for bots, broken navigation, missing titles
- **AMP (Accelerated Mobile Pages)** — Legacy Google format (declining)

## 16.2 Accessibility (a11y) [Part 113]

- **WCAG (Web Content Accessibility Guidelines)** — 2.1/2.2 AA/AAA
- **Four Principles (POUR)** — Perceivable, Operable, Understandable, Robust
- **Semantic HTML** — Use native elements (button, nav, main, aside, header, footer)
- **ARIA (Accessible Rich Internet Applications)**
  - Roles — role="button", role="dialog", role="navigation", role="tab", role="alert"
  - States & properties — aria-expanded, aria-checked, aria-hidden, aria-label, aria-labelledby, aria-describedby, aria-live, aria-current
  - aria-live regions (polite/assertive) — Screen reader announcements
- **Keyboard Accessibility** — All interactions keyboard-usable
  - Tab order, focus states (visible :focus-visible)
  - Focus management — Focus trap in modals, focus restore
  - skip-to-content link
- **Screen Readers** — NVDA, JAWS, VoiceOver, TalkBack
- **Forms a11y** — label element, error messages associated (aria-describedby), role="alert"
- **Images** — alt text (decorative alt=""), aria-hidden
- **Color & Contrast** — Contrast ratio ≥ 4.5:1 (AA), not color-only signals
- **Motion** — prefers-reduced-motion (disable animations)
- **Media** — Captions, transcripts, audio descriptions
- **Landmarks** — header, nav, main, footer roles for navigation
- **Headings** — Logical hierarchy
- **Links & Buttons** — Meaningful text
- **Dynamic Content** — aria-live for updates
- **Testing**
  - Automated: axe-core, Lighthouse, eslint-plugin-jsx-a11y
  - jest-axe, cypress-axe, Playwright axe
  - Manual: keyboard walkthrough, screen reader
- **Focus-visible** — `:focus-visible` CSS
- **Accessible Components** — Radix, Headless UI (a11y built-in)
- **Design Systems & a11y** — Tokens for contrast, focus states
- **React a11y** — React handles some ARIA, jsx-a11y lint rules
- **Reduced data** — prefers-reduced-data (legacy)

## 16.3 Content Management (Headless CMS) [Part 114]

- **Headless CMS** — Content backend with API delivery
- **Popular Headless CMS**
  - **Contentful** — SaaS, rich API
  - **Sanity** — Real-time, GROQ queries
  - **Strapi** — Open-source Node.js (self-hosted)
  - **Directus** — Open-source, DB-driven
  - **Prismic** — Slice-based (slices)
  - **Keystone** — Node.js, schema-first
  - **Payload** — TypeScript headless CMS
- **CMS Integration in JS apps**
  - Fetch via REST/GraphQL
  - Webhooks → revalidate (ISR)
  - Next.js: @sanity/client, contentful SDK, server components
  - Preview mode (draft content)
- **Content Modeling** — Content types, fields, references
- **MDX** — Markdown + JSX (mdx-bundler, next-mdx-remote)
- **Static Content** — Markdown files, frontmatter, content collections
  - Next.js contentlayer (deprecated) → Content Collections
  - Astro content collections
- **Search** — Algolia, Meilisearch, Typesense (full-text)
  - Search indexing from content
  - Facets, typo tolerance
- **RSS** — RSS feed generation
- **Rich text rendering** — Slate/serialization, HTML sanitization

## 16.4 Progressive Web Apps (PWA) [Part 115]

- **PWA** — Web app with app-like experience
- **PWA Requirements** — HTTPS, manifest, service worker
- **Web App Manifest** — manifest.json
  - name, short_name, start_url, display (standalone), icons, theme_color, background_color
  - orientation, scope, description
- **Service Worker (Deep)**
  - Registration, update flow (activate)
  - Lifecycle: installing, waiting, activating, activated, redundant
  - skipWaiting(), clients.claim()
  - Events: install, activate, fetch, message, push, sync, notificationclick
  - Scope limits
- **Caching Strategies**
  - **Cache First** — Serve from cache, fetch fallback
  - **Network First** — Online-fresh, offline-cache
  - **Stale-While-Revalidate** — Serve cache + update in background
  - **Network Only** — No cache
  - **Cache Only** — Offline content
- **Runtime Caching** — Cache API in fetch handler
- **Precache** — Install-time caching of app shell
- **Offline Experience** — Offline fallback page, offline queue
- **Push Notifications** — Push + Notification (see Part 82)
- **Add to Home Screen** — beforeinstallprompt, installability
- **App Shell Model** — Minimal HTML/JS/CSS shell cached
- **Update Management** — New version detection, update prompt
- **PWA Libraries/Tools** — Workbox (build SWs), vite-plugin-pwa, next-pwa, pwabuilder
- **Workbox** — Service worker library
  - generateSW, injectManifest
  - Strategies: CacheFirst, NetworkFirst, StaleWhileRevalidate, registerRoute
  - Precaching, runtime caching, offline fallback
- **Web App Stores** — PWAs in app stores (Play, Windows)
- **iOS/Android differences** — Safari PWA support differences

---

# Level 17: Data Structures, Algorithms & CS in JS

## 17.1 Data Structures in JS [Part 116]

- **Primitives & Composite** — Built-in structures
- **Array** — Dynamic array (methods, performance)
- **Object** — Hash map (key → value), property order
- **Map** — Keyed collections (any key type, ordered, size)
  - set/get/has/delete/clear, iteration, performance vs object
- **Set** — Unique values
  - add/has/delete, iteration, union/intersection patterns
- **WeakMap** — Weak keys (GC-friendly, no iteration)
- **WeakSet** — Weak object references
- **Typed Arrays** — Binary data buffers (Int8, Uint8, Float32...)
  - DataView for mixed types
  - ArrayBuffer, SharedArrayBuffer
- **Linked List** — Singly/doubly (custom implementation)
  - Insert/delete O(1) vs array O(n)
- **Stack** — LIFO (array push/pop, or custom)
- **Queue** — FIFO (array shift is O(n), use pointer or linked list)
- **Deque** — Double-ended
- **Binary Tree** — Node-based hierarchy
- **Binary Search Tree (BST)** — Ordered tree
- **Heap** — Priority queue (binary heap, min/max)
- **Graph** — Adjacency list/matrix, directed/undirected, weighted
- **Hash Table** — Buckets, collision handling
- **Trie** — Prefix tree (autocomplete)
- **Union-Find (Disjoint Set)** — Connectivity
- **Bloom Filter** — Probabilistic membership
- **LRU Cache** — Map + linked list pattern
- **Circular Buffer** — Fixed-size ring
- **Big-O Analysis** — Time/space complexity of operations
- **Performance considerations** — Array operations, object property access

## 17.2 Algorithms in JS [Part 117]

- **Sorting Algorithms**
  - Built-in: Array.prototype.sort (TimSort in V8)
  - Bubble Sort, Insertion Sort, Selection Sort (O(n²))
  - Merge Sort, Quick Sort, Heap Sort (O(n log n))
  - Counting/Radix (non-comparison)
  - Stability, in-place, adaptive
- **Searching**
  - Linear Search
  - Binary Search (sorted arrays)
  - Interpolation Search
- **Graph Algorithms**
  - BFS (Breadth-First Search) — Shortest path in unweighted
  - DFS (Depth-First Search) — Preorder/inorder/postorder
  - Dijkstra — Single-source shortest path (weighted)
  - A* — Heuristic search
  - Bellman-Ford — Negative weights
  - Floyd-Warshall — All-pairs
  - Topological Sort (DAG)
  - Minimum Spanning Tree (Kruskal, Prim)
  - Cycle detection (DFS, union-find)
- **Tree Algorithms**
  - Tree traversals
  - Balanced BST (AVL, Red-Black)
  - Heap operations (sift-up, sift-down)
  - Trie operations
- **Recursion & Backtracking** — Permutations, combinations, N-Queens, Sudoku
- **Dynamic Programming** — Memoization, tabulation
  - Fibonacci, Knapsack, LCS, edit distance, coin change, grid paths
- **Greedy Algorithms** — Activity selection, Huffman coding, coin problem
- **Divide & Conquer** — Merge sort, binary search, fast exponentiation
- **Two Pointers** — Sliding window problems
- **Sliding Window** — Subarray problems
- **Hash-based algorithms** — Frequency counting, grouping
- **String Algorithms** — KMP, Rabin-Karp, palindrome, anagram, longest common prefix
- **Bit Manipulation** — XOR tricks, bit masks, counting bits
- **Math algorithms** — GCD/LCM (Euclid), primality, factorization, modular arithmetic
- **Big-O Cheatsheet** — Arrays, linked lists, trees, hash tables, heaps
- **Problem-solving patterns** — Frequency counter, sliding window, two pointers, recursion
- **Complexity limits** — 10⁸ operations/sec rule
- **When to use what** — Practical decision matrix
- **Coding challenge platforms** — LeetCode, Codewars, HackerRank

## 17.3 Functional Programming in JS [Part 118]

- **Functional Programming (FP)** — Pure functions, immutability
- **Pure Functions** — Deterministic, no side effects
- **Immutability** — Never mutate data
  - Spread, structuredClone, immutable libs (Immer)
  - Immer — Draft state → produce next state
- **Side Effects** — I/O, mutation (isolate them)
- **Higher-Order Functions** — map, filter, reduce
- **Function Composition** — compose(f, g)(x) = f(g(x))
- **Currying** — f(a)(b)(c), partial application
- **Partial Application** — Fix arguments (bind, closures)
- **Point-Free Style** — Function without explicit args
- **Declarative vs Imperative** — Describe what vs how
- **Closures in FP** — Encapsulation
- **Recursion in FP** — Base case, tail calls (V8 TCO caveats)
- **Memoization** — Caching (lodash.memoize, custom)
- **Lazy Evaluation** — Generators, deferred computation
- **Functors** — .map over containers (Array, Promise, Observable)
- **Monads** — .flatMap (Promise.then, Array.flatMap)
- **Either / Maybe** — Error handling without exceptions
  - fp-ts, ramda ecosystem
- **Transducers** — Composable reducers
- **Lodash/fp & Ramda** — FP utility libraries
  - Ramda: R.map, R.filter, R.compose, R.pipe, R.curry, R.assoc
- **FP Tradeoffs** — Performance, readability for teams
- **FRP connection** — Reactive streams + FP

## 17.4 JSON, Data & Serialization [Part 119]

- **JSON** — JavaScript Object Notation (data format)
- **JSON.stringify()** — Serialization
  - replacer, space, toJSON() method
  - Key order, undefined/function/symbol skipped
  - Circular reference errors
- **JSON.parse()** — Deserialization
  - reviver
  - Never trust parsed data (prototype pollution risk)
- **JSON Limits** — No dates (string), no undefined, no NaN (null), no functions
- **BigJSON** — BigInt serialization (custom)
- **Streaming JSON** — JSONStream, JSON.parse for large files
- **Serialization Formats**
  - JSON, YAML, XML, CSV, TOML, MessagePack (binary), Protobuf (gRPC), BSON (MongoDB)
- **Structured Clone** — structuredClone() (deep clone with types)
- **Escape/Unicode** — \u sequences, unicode escape handling
- **JSON Schema** — Validate JSON structure
  - Ajv validator, zod can generate JSON Schema
- **YAML in JS** — js-yaml, yaml libraries
- **CSV in JS** — papaparse (parsing/streaming), csv-parser
- **XML in JS** — fast-xml-parser, xml2js
- **Protobuf in JS** — protobufjs, @grpc/proto-loader
- **Binary serialization** — MessagePack (msgpackr), Avro
- **Data integrity** — JSON stringify determinism (canonical JSON)
- **Content-Type handling** — application/json vs text/plain
- **Localization data** — JSON-based translations

---

# Level 18: Complete JS Library & Tool Catalog

## 18.1 Utility & Functional Libraries [Part 120]

- **Lodash** — Utility library (drop-in functions)
  - _.get, _.set, _.debounce, _.throttle, _.cloneDeep, _.groupBy, _.uniqBy, _.orderBy, _.pick, _.omit, _.chunk, _.flattenDeep, _.merge
  - Lodash/fp — Functional variant
  - Modern alternative — Native methods + optional chaining
- **Ramda** — Functional utilities (curry-first, compose)
- **Underscore** — Legacy utility (pre-Lodash)
- **immer** — Immutable state updates (produce, draft)
- **nanoid** — Tiny unique ID generator
- **uuid** — UUID v4/v7
- **crypto-random-string** — Random strings
- **date-fns / dayjs / luxon** — Dates (see Part 98)
- **decimal.js / bignumber.js / big.js** — Decimal arithmetic
- **dotenv** — Environment loading
- **fuse.js** — Fuzzy search
- **string utilities** — change-case (camelCase etc.), slugify
- **zod / joi / yup / valibot** — Validation (see forms)
- **immer, structuredClone, deepmerge** — Object merging
- **p-map / p-limit / p-retry / p-queue** — Async utilities (sindresorhus)
  - p-limit (concurrency), p-retry (retries), p-queue (queue)
- **execa** — Child process API
- **fast-glob** — File globbing
- **ajv** — JSON schema validation
- **sanitize-html / DOMPurify** — HTML sanitization
- **cheerio** — Server-side jQuery (HTML parsing)
- **cloc / bundlephobia** — Size analysis

## 18.2 HTTP, Data & Networking Libraries [Part 121]

- **HTTP Clients**
  - **axios** — Promise HTTP client
    - Interceptors, timeouts, baseURL, cancel tokens/AbortSignal
    - Response transforms, concurrent requests (axios.all)
    - Instances (create)
  - **fetch** (native) — Response, AbortController
  - **got** — Powerful HTTP (Node)
  - **node-fetch** — Fetch for Node (pre-18)
  - **ky** — Tiny fetch wrapper
  - **superagent** — Legacy
  - **request** — Deprecated (avoid)
- **GraphQL Clients** — Apollo Client, urql, Relay
- **gRPC** — grpc-js, connect-rpc
- **WebSocket** — ws, socket.io-client, uws
- **SSE** — EventSource, @microsoft/fetch-event-source
- **Data Parsing**
  - papaparse (CSV), js-yaml (YAML), fast-xml-parser (XML)
  - protobufjs (Protobuf), msgpackr (MessagePack)
- **Search** — algoliasearch, meilisearch, typesense
- **Network info** — is-ip, public-ip
- **Rate limiting clients** — p-ratelimit, limiter
- **Upload** — uppy, tus-js-client
- **Mocking** — MSW (Mock Service Worker), mswjs, Nock (Node)

## 18.3 Framework-Specific Libraries [Part 122]

- **React Ecosystem**
  - Router: react-router, @tanstack/react-router, wouter, next/navigation
  - Forms: react-hook-form, formik, @tanstack/react-form
  - Data: @tanstack/react-query, SWR, RTK Query, Apollo, urql
  - State: redux, zustand, jotai, mobx, recoil, xstate
  - UI: MUI, Ant Design, Chakra, Radix, shadcn/ui, Mantine, NextUI, Headless UI, Tailwind
  - Animation: framer-motion, react-spring, motion
  - Tables: TanStack Table, react-table, ag-Grid, MUI X
  - Virtual: @tanstack/react-virtual, react-window
  - Drag: dnd-kit, react-beautiful-dnd (deprecated)
  - Charts: recharts, victory, visx, nivo
  - Icons: lucide-react, react-icons, heroicons
  - Utilities: clsx (class merge), tailwind-merge
- **Vue Ecosystem**
  - Router: vue-router
  - State: pinia, vuex
  - Forms: vee-validate, vuelidate
  - UI: Vuetify, Element Plus, Naive UI, Quasar, PrimeVue, TDesign
  - Data: vue-query (@tanstack/vue-query), vue-apollo
  - Animations: @vueuse/motion
  - Utils: @vueuse/core (composable utilities)
- **Angular Ecosystem**
  - UI: Angular Material, PrimeNG, NG-ZORRO, Nebular
  - State: NgRx (Store, Effects), Akita, ngxs
  - RxJS everywhere
  - Forms: reactive forms (built-in)
- **Svelte Ecosystem**
  - State: svelte stores (writable), runes
  - UI: Skeleton, shadcn-svelte, Flowbite-Svelte
  - Data: @tanstack/svelte-query
- **Cross-framework** — TanStack suite (query, router, table, virtual, form), Headless UI, Radix (React), Ark UI
- **CSS/UI Kits** — Bootstrap, Tailwind, Bulma, Foundation

## 18.4 Desktop, Mobile & Cross-Platform [Part 123]

- **Desktop**
  - **Electron** — Chromium + Node (VS Code, Slack, Discord, Figma, Notion)
    - Main process, renderer process, preload script
    - IPC (ipcMain, ipcRenderer), contextBridge
    - BrowserWindow, dialog, Menu, Tray, shell
    - electron-builder / electron-forge (packaging)
    - Security: contextIsolation, sandbox
  - **Tauri** — Rust core + webview (lighter than Electron)
  - **NW.js** — Legacy Electron alternative
- **Mobile**
  - **React Native** — Native components from JS (Meta)
    - Components: View, Text, Image, FlatList, Pressable
    - StyleSheet, flexbox
    - Navigation: react-navigation, expo-router
    - AsyncStorage, NativeModules
    - New Architecture (Fabric, TurboModules, Hermes)
    - Expo (framework: managed/prebuild)
    - react-native-reanimated, gesture-handler
  - **Expo** — RN toolchain
    - expo start, Expo Go, EAS Build (cloud builds), EAS Update (OTA)
  - **Ionic / Capacitor** — Web → native wrapper
    - Capacitor (modern), Cordova (legacy)
  - **NativeScript** — Native UI via JS
  - **Flutter** — (Dart, not JS, reference)
- **Web→Native shared code** — React Native Web, Tauri web stack
- **Progressive Web Apps** — Browser-based alternative (see Part 115)
- **Packaging/Publishing mobile** — App Store, Play Store, signing, TestFlight
- **Capacitor plugins** — Camera, Push, InAppBrowser

## 18.5 Server, Database & Cloud Libraries [Part 124]

- **Frameworks** — express, fastify, koa, hapi, nestjs, hono, adonis, sails
- **Validation** — zod, joi, class-validator, ajv
- **ORM/ODM** — prisma, typeorm, sequelize, mongoose, knex, drizzle-orm, objection
- **Databases (drivers)** — pg, mysql2, better-sqlite3, mongodb, redis (ioredis/node-redis), @elastic/elasticsearch
- **Auth** — passport, jsonwebtoken, bcrypt, argon2, @auth0/nextjs-auth0, Lucia, better-auth, iron-session
- **Sessions** — express-session, cookie-session
- **Caching** — node-cache, memory-cache, redis
- **Queues** — bullmq, bee-queue, kafkajs, amqplib
- **Rate limiting** — express-rate-limit, rate-limiter-flexible, p-ratelimit
- **Scheduling** — node-cron, croner, agenda
- **Security** — helmet, cors, csurf, sanitize-html, rate-limit, bcrypt
- **Logging** — pino, winston, morgan, pino-http, log4js
- **Error tracking** — @sentry/node, bugsnag
- **Monitoring** — prom-client, @opentelemetry/sdk-node
- **File upload** — multer, formidable, busboy
- **Email** — nodemailer, @sendgrid/mail, resend, postmark
- **Webhooks** — svix, standard webhooks
- **Serverless** — @aws-sdk/client-lambda, vercel node, @netlify/functions
- **Templating** — ejs, handlebars, pug (server rendering)
- **Web scraping** — puppeteer, playwright, cheerio, axios + parsing
- **Testing server** — supertest

## 18.6 Build, Dev & Quality Libraries [Part 125]

- **Bundlers** — webpack, vite, esbuild, rollup, parcel, turbopack, rspack
- **Transpilers** — babel, swc, esbuild, tsc
- **Minifiers** — terser, esbuild, swc, uglify (legacy)
- **Task runners** — npm scripts, gulp (legacy), grunt (legacy), just, turbo
- **Linting** — eslint, @typescript-eslint, stylelint, prettier, oxlint, biome
- **Biome** — Fast JS/TS/JSON/CSS formatter + linter (Rust)
- **Testing** — jest, vitest, mocha, jasmine, cypress, playwright, puppeteer, ava, tape, node:test, supertest
- **Assertions** — chai, expect, power-assert
- **Mocking** — sinon, msw, nock, testdouble
- **Coverage** — c8, istanbul, vitest coverage
- **Formatting** — prettier, biome, dprint
- **Hooks** — husky, lint-staged, lefthook
- **Type checking** — tsc, typechecking in CI
- **Package managers** — npm, yarn (classic/berry), pnpm, bun
- **Version management** — nvm, fnm, volta, n, asdf
- **Environment** — dotenv, cross-env, dotenv-expand
- **Docs** — typedoc, docusaurus, storybook, VitePress, Mintlify
- **Storybook** — Component development environment
  - stories, CSF (Component Story Format), addons, args, controls, testing
- **Codegen** — graphql-codegen, openapi-generator, prisma generate, tRPC
- **Docker for Node** — node:*-alpine images, multi-stage
- **Debug** — node:inspector, chrome devtools protocol
- **Analyzers** — webpack-bundle-analyzer, vite-bundle-visualizer, source-map-explorer, knip (unused deps)

## 18.7 Data Visualization, Charts & Graphs Catalog [Part 126]

- **General Charts** — Chart.js, Recharts, ECharts, ApexCharts, Highcharts, Victory, Nivo, Frappe
- **Low-level/SVG** — D3.js, SVG.js, Snap.svg, visx
- **Fast/Canvas** — uPlot, PixiJS charts
- **Scientific** — Plotly.js, vis.js (graphs/networks), sigma.js (graphs)
- **Maps/Geo** — Leaflet (interactive maps), MapLibre GL, deck.gl (large-scale data), Mapbox GL JS, OpenLayers
  - GeoJSON, tile layers, markers, popups
- **3D** — Three.js, Babylon.js, PlayCanvas, react-three-fiber
- **Graph/Network** — cytoscape.js, vis-network, sigma.js, d3-force
- **Timeline/Gantt** — dhtmlxGantt, Frappe Gantt
- **Word/Text** — d3-cloud (word clouds), WordCloud2
- **Statistical** — jstat, simple-statistics, d3-array, stdlib
- **Finance** — lightweight-charts (TradingView), trading-vue-js
- **Sparklines** — react-sparklines, sparkline
- **Tableau/BI integrations** — embedding
- **React Data Grid** — AG Grid (powerful), Glide Data Grid, TanStack Table, react-data-grid
- **Diagramming** — mermaid (diagrams from text), drawio, JointJS, React Flow
  - **React Flow** — Node-based graphs (workflows, mindmaps)
- **Editor/Code display** — CodeMirror 6, Monaco (VS Code), Prism.js, highlight.js, Shiki
- **Rich text** — TipTap, ProseMirror, Slate, Lexical, Quill, CKEditor, TinyMCE
- **Markdown** — marked, markdown-it, remark/rehype (unified), MDX
- **PDF** — pdf-lib, jsPDF, react-pdf, pdf.js (viewer)
- **QR codes** — qrcode, react-qr-code
- **Barcode** — JsBarcode
- **Files/Archive** — JSZip, fflate, jszip
- **Excel** — exceljs, SheetJS (xlsx), handsontable
- **Icons** — lucide, font-awesome, heroicons, react-icons, phosphor
- **Animations** — GSAP, framer-motion, anime.js, react-spring, Lottie
- **Sound** — Tone.js, Howler.js, wavesurfer.js
- **Video** — video.js, hls.js (HLS streaming), plyr, video-react
- **Image** — sharp (server), canvas filters, jimp, browser-image-compression
- **3D models** — gltf viewers, model-viewer
- **Video conferencing** — LiveKit, Daily.co, Vonage/OpenTok, Twilio Video, Zoom SDK
- **Geo/location** — Leaflet, geolib, turf.js (geospatial analysis)

---

# Universal Concepts

## Cross-Cutting Principles

### Language Principles
- **Semantics over Syntax** — Understand behavior, not just keywords
- **Predictability** — Prefer explicit over implicit (===, strict mode)
- **Immutability** — Reduces bugs in shared state
- **Fail Fast** — Validate early, throw clear errors
- **Single Source of Truth** — Avoid duplicated state
- **Separation of Concerns** — Isolate responsibilities
- **Don't Repeat Yourself (DRY)** — Abstract repeated logic
- **Occam's Razor** — Prefer the simplest solution

### Ecosystem Principles
- **ECMAScript Proposal Lifecycle** — Stage 0 (strawperson) → 1 (proposal) → 2 (draft) → 3 (candidate) → 4 (finished)
- **Can I Use** — Browser feature support database
- **caniuse / MDN / tc39.es** — Authoritative references
- **The Compatibility Problem** — Transpile + polyfill for older browsers
- **Progressive Enhancement** — Work without JS, enhance with it
- **Graceful Degradation** — Fallbacks for missing features
- **Backwards Compatibility** — Never break the web

### Design System Principles
- **Design Tokens** — Colors, spacing, typography as variables
- **Atomic Design** — Atoms → Molecules → Organisms → Templates → Pages
- **Component Reusability** — Build once, use everywhere
- **Accessibility (a11y)** — WCAG, ARIA, semantic HTML
  - Keyboard navigation, screen readers, contrast, focus management
- **Internationalization (i18n)** — i18next, locale data
  - Locales, pluralization, formatting (Intl API)
- **Responsive Design** — All device sizes

### Performance Principles
- **Measure Before Optimizing** — Profile first
- **Perceived Performance** — Skeleton screens, optimistic UI
- **Progressive Loading** — Lazy, prioritized
- **Cache Everything Possible** — HTTP, memory, SW
- **Minimize Round Trips** — Batching, multiplexing
- **The Cost of JavaScript** — Parse, compile, execute, memory
- **Interaction Latency Budget** — <100ms perceived

### Security Principles
- **Never Trust Input** — Validate all external data
- **Escape on Output** — Context-aware encoding
- **Least Privilege** — Minimal access
- **Defense in Depth** — Multiple layers
- **Fail Secure** — Default deny
- **Security Headers by Default**
- **Dependency Hygiene** — Keep deps updated, minimal, vetted
- **Secret Management** — Environment, vaults, never in code/git
- **Data Privacy** — PII minimization, encryption

### Networking Fundamentals (for JS)
- **HTTP/1.1 vs HTTP/2 vs HTTP/3** — Multiplexing, QUIC
- **TCP vs UDP** — Reliability vs speed
- **TLS Handshake** — Encryption setup
- **DNS Resolution** — Lookup time
- **Latency & Bandwidth** — Impact on JS apps
- **CDNs** — Global distribution
- **Cookies & Headers** — Request metadata
- **WebSockets** — Persistent connection
- **EventSource (SSE)** — Server push
- **Caching Headers** — Cache-Control, ETag, Vary
- **HTTP Semantics** — Methods, status, idempotency

### Database Fundamentals (for JS)
- **ACID vs BASE** — Consistency models
- **CRUD Operations** — Create/Read/Update/Delete
- **Indexes** — Query performance
- **Normalization** — Schema design
- **Transactions** — Atomic operations
- **Migrations** — Schema versioning
- **Connection Pooling** — Resource efficiency
- **Caching Layer** — Redis in front of DB
- **Backups & Replication** — Data safety
- **CAP Theorem** — Consistency, Availability, Partition tolerance

## JavaScript Environment Quick Reference

### Global Objects (Browser)
| Object | Purpose |
|--------|---------|
| window | Global scope, browser window |
| document | DOM entry point |
| navigator | Browser/app info |
| location | Current URL |
| history | Navigation history |
| console | Debug output |
| fetch | HTTP requests |
| localStorage / sessionStorage | Client storage |
| indexDB | Browser database |
| WebSocket | Realtime socket |
| Worker / SharedWorker | Parallel threads |
| requestAnimationFrame | Render-synced animation |
| IntersectionObserver | Viewport detection |
| performance | Timing & metrics |

### Global Objects (Node.js)
| Object | Purpose |
|--------|---------|
| global / globalThis | Global scope |
| process | Process info & control |
| Buffer | Binary data |
| __dirname / __filename | File paths (CJS) |
| require / module | Module system (CJS) |
| console | Logging |
| timers | setTimeout etc. |
| structuredClone | Deep cloning |
| fetch / WebSocket | (Node 18+) Web APIs |

### Node.js Built-in Modules
| Module | Purpose |
|--------|---------|
| fs | File system |
| path | Path handling |
| http / https | HTTP servers/clients |
| events | EventEmitter |
| stream | Data streams |
| crypto | Encryption/hashing |
| child_process | Spawn processes |
| os | OS information |
| util | Utilities |
| url | URL parsing |
| querystring | Query parsing |
| net | TCP networking |
| dns | DNS resolution |
| zlib | Compression |
| worker_threads | Threads |
| cluster | Multi-process |
| readline | CLI input |
| assert | Testing assertions |
| readline | Line input |
| timers | Scheduling |
| buffer | Binary buffers |
| process | Runtime lifecycle |

### Common npm Packages
| Category | Packages |
|----------|----------|
| HTTP | express, fastify, koa, axios, got, node-fetch |
| Validation | zod, joi, yup |
| Dates | dayjs, date-fns, luxon |
| ORM | prisma, typeorm, sequelize, mongoose, drizzle |
| Auth | jsonwebtoken, bcrypt, passport, next-auth |
| Testing | jest, vitest, mocha, cypress, playwright |
| Linting | eslint, prettier, stylelint |
| React | react-dom, react-router, redux, zustand, react-query |
| Bundling | webpack, vite, esbuild, rollup |
| Server | nestjs, hono, socket.io |
| Utils | lodash, uuid, dotenv, debug |
| Logging | pino, winston, morgan |
| Scheduling | node-cron, bullmq |
| State | redux, zustand, jotai, mobx, xstate |
| Forms | react-hook-form, formik |
| TypeScript | typescript, ts-node, tsx, @types/* |
| CLI | commander, yargs, inquirer, chalk |

### Key Configuration Files
| File | Purpose |
|------|---------|
| package.json | Project manifest |
| package-lock.json | Locked dependency tree |
| tsconfig.json | TypeScript config |
| .eslintrc / eslint.config.js | Linting config |
| .prettierrc | Formatting config |
| .babelrc / babel.config.js | Babel config |
| webpack.config.js | Webpack config |
| vite.config.ts | Vite config |
| next.config.js | Next.js config |
| .env / .env.local | Environment variables |
| .gitignore | Git exclusions |
| .npmrc | npm configuration |
| .nvmrc | Node version |
| vitest.config.ts / jest.config.ts | Test config |
| tailwind.config.ts | Tailwind config |
| postcss.config.js | PostCSS config |
| .dockerignore / Dockerfile | Container config |

### Common CLI Commands
| Category | Commands |
|----------|----------|
| Node | node file.js, node --watch, node --inspect |
| npm | npm init, npm install, npm run, npm test, npm audit, npm publish |
| npx | npx create-vite, npx tsc, npx eslint |
| TypeScript | tsc, tsc --noEmit, tsc --watch |
| Tests | npm test, vitest run, jest, cypress open |
| Build | npm run build, vite build, next build |
| Dev | npm run dev, vite, next dev |
| Package Mgmt | pnpm add, yarn add, npm uninstall |
| Debug | node --inspect-brk, npx tsx |

---

> **Total Concepts Cataloged: 2500+** across 18 levels + universal topics
>
> Sources: ECMAScript specification (tc39.es), MDN Web Docs, Node.js documentation, V8 blog, React/Vue/Angular/Svelte/Solid docs, TypeScript handbook, web.dev, OWASP, W3C (Web Audio/WebRTC/File/Push/WebAuthn specs), W3C WAI & WCAG, Google SEO/Web.dev documentation, GraphQL spec, socket.io/ws docs, D3/Three.js/GSAP docs, and standard JS engineering references (2025-2026).
>
> Major additions: JS history & TC39, full core language (types/operators/functions/objects), closures & this-binding rules, ES6+ features per year, async model (event loop/microtasks/promises/streams), DOM & browser APIs, browser security (XSS/CSRF/CSP), Web Vitals & performance, Node.js core modules, Express/NestJS, REST/GraphQL/tRPC, databases & ORMs (Prisma/TypeORM/Mongoose), auth (JWT/OAuth/sessions), microservices & 12-factor, React/Vue/Angular/Svelte/Solid ecosystems, state management, meta-frameworks (Next/Nuxt/SvelteKit/Astro), TypeScript deep dive, build tools (Vite/Webpack/esbuild), testing (Jest/Vitest/Playwright/Cypress), debugging & profiling, design patterns, V8 internals & GC, event loop internals, browser rendering pipeline, WebAssembly, reactive programming (RxJS/Signals), modern runtimes (Node/Deno/Bun), advanced browser APIs (Web Audio/Speech/MediaDevices/WebRTC/Push/File/Clipboard/Web Crypto/WebAuthn), data visualization & animation (D3/Chart.js/Three.js/GSAP/Framer Motion/WebGL/WebGPU), legacy ecosystem (jQuery/Backbone/AngularJS/Ember), forms & Intl/i18n deep dives, date/time (Temporal/date-fns), regex deep dive, advanced UI patterns, GraphQL & WebSocket engineering, message queues & event-driven architecture, CLI development & terminal UX, monorepos (Turborepo/Nx/pnpm/Changesets), publishing & semantic-release, CI/CD for JS, SEO for JS apps, accessibility (WCAG/ARIA), headless CMS & PWA (Service Workers/Workbox), data structures & algorithms & functional programming, JSON/serialization, and the complete JS library & tool catalog.
