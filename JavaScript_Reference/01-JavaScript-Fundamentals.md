# JavaScript Fundamentals - Complete Reference

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

## Table of Contents

1. [JavaScript Data Types](#1-javascript-data-types)
2. [Variables: var, let, const](#2-variables-var-let-const)
3. [All JavaScript Operators](#3-all-javascript-operators)
4. [Control Flow](#4-control-flow)
5. [Type Conversion](#5-type-conversion)
6. [Type Checking](#6-type-checking)

---

## 1. JavaScript Data Types

JavaScript has **8 data types** divided into two categories:

### Overview Table

| Category | Types |
|----------|-------|
| **Primitives (7)** | `undefined`, `null`, `boolean`, `number`, `bigint`, `string`, `symbol` |
| **Objects (1)** | `object` (includes `Array`, `Function`, `Date`, `Map`, `Set`, class instances, etc.) |

### Key Characteristics

| Aspect | Primitives | Objects |
|--------|-----------|---------|
| Storage | Stack (fixed memory) | Heap (dynamic memory) |
| Mutability | Immutable | Mutable |
| Passing | Passed by value | Passed by reference |
| Properties | Cannot have properties (auto-boxing creates temporary wrapper) | Can have properties |
| Comparison | Compared by value | Compared by reference |

---

### 1.1 undefined

A variable that has been declared but not assigned a value. It is JavaScript's default for uninitialized variables, missing function parameters, and non-existent object properties.

```javascript
let x;
console.log(x); // undefined

function greet(name) {
  console.log(name);
}
greet(); // undefined (missing argument)

const obj = {};
console.log(obj.name); // undefined (non-existent property)

// typeof returns "undefined"
typeof undefined; // "undefined"
```

**Gotcha:** `undefined` is not the same as `null`. `undefined` means "not assigned", while `null` means "intentionally empty".

```javascript
let a;
let b = null;

console.log(a === b); // false (different types)
console.log(a == b);  // true (loose equality treats them as equal)
```

---

### 1.2 null

Represents the **intentional absence** of any value. You explicitly assign `null` when you want to represent "empty" or "unknown".

```javascript
let user = null;
console.log(user); // null

// typeof returns "object" - THIS IS A FAMOUS BUG in JavaScript
typeof null; // "object" (historical bug from 1995, cannot be fixed without breaking the web)

// null == undefined is true
null == undefined; // true
null === undefined; // false
```

**Historical Bug:** `typeof null === "object"` is a bug from JavaScript's first implementation. The early engine stored type tags in the lower bits of values; `null` was represented as a null pointer (all-zero bits) which looked like the object tag.

---

### 1.3 boolean

Represents a logical entity with two values: `true` and `false`.

```javascript
let isTrue = true;
let isFalse = false;

typeof true;  // "boolean"
typeof false; // "boolean"

// Boolean() for explicit conversion
Boolean(0);         // false
Boolean(1);         // true
Boolean("");        // false
Boolean("hello");   // true
Boolean(null);      // false
Boolean(undefined); // false
Boolean(NaN);       // false
Boolean([]);        // true (arrays are objects)
Boolean({});        // true (objects are truthy)
```

**The 8 Falsy Values (Memorize These!):**
```javascript
false
0
-0
0n      // BigInt zero
""      // empty string
null
undefined
NaN
```

**Everything else is truthy**, including:
```javascript
"0"       // non-empty string (TRUTHY!)
" "       // space-only string (TRUTHY!)
[]        // empty array (TRUTHY!)
{}        // empty object (TRUTHY!)
-1        // negative numbers (TRUTHY!)
Infinity  // (TRUTHY!)
```

---

### 1.4 number

JavaScript uses **64-bit IEEE 754 floating-point** for numbers. There is only ONE numeric type for integers and decimals.

```javascript
let int = 42;
let float = 3.14;
let negative = -100;

// Special values
Infinity;    // Infinity
-Infinity;   // -Infinity
NaN;         // Not a Number

// Safe integer range
Number.MAX_SAFE_INTEGER; // 9007199254740991  (2^53 - 1)
Number.MIN_SAFE_INTEGER; // -9007199254740991

// NaN is unique - it's not equal to anything, including itself!
NaN === NaN; // false
Number.isNaN(NaN); // true (use this!)

// Floating-point precision gotcha
0.1 + 0.2; // 0.30000000000000004
0.1 + 0.2 === 0.3; // false

// Use Math.abs for comparison
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON; // true

// Special numeric values
typeof Infinity; // "number"
typeof NaN;      // "number" (NaN is a number - a failed computation)

// Octal (prefix 0 or 0o)
0o10; // 8

// Hexadecimal (prefix 0x)
0xff; // 255

// Binary (prefix 0b)
0b1010; // 10

// Exponent notation
1e3;    // 1000
2.5e2;  // 250
```

---

### 1.5 bigint

For integers **larger than `Number.MAX_SAFE_INTEGER`** (2^53 - 1). Created with the `n` suffix or `BigInt()`.

```javascript
const big = 9007199254740993n;
const alsoBig = BigInt("9007199254740993");

typeof big; // "bigint"

// Can't mix bigint with number!
// 10n + 20; // TypeError
// 10n == 10; // TypeError (use ==)

// Comparison operators work (but not ===)
10n == 10;  // true (loose equality)
10n === 10; // false (strict equality - different types)

// Use BigInt() to convert
BigInt(42);      // 42n
BigInt("42");    // 42n
BigInt(true);    // 1n
BigInt(false);   // 0n

// Division truncates (like integer division)
20n / 7n; // 2n (not 2.857...)
```

---

### 1.6 string

A sequence of UTF-16 code units. Strings are **immutable** - operations create new strings.

```javascript
// Three ways to create strings
let single = 'Hello';
let double = "Hello";
let template = `Hello`;

// Template literals (backticks) - ES6
let name = "World";
let greeting = `Hello, ${name}!`; // "Hello, World!"

// Multi-line strings
let multi = `Line 1
Line 2
Line 3`;

// String properties and methods
let str = "Hello, World!";
str.length;            // 13
str[0];                // "H"
str.charAt(0);         // "H"
str.toUpperCase();     // "HELLO, WORLD!"
str.toLowerCase();     // "hello, world!"
str.includes("World"); // true
str.indexOf("World");  // 7
str.slice(0, 5);       // "Hello"
str.split(", ");       // ["Hello", "World!"]
str.replace("World", "JS"); // "Hello, JS!"
str.trim();            // removes whitespace from both ends

// Strings are immutable
let s = "hello";
s[0] = "H";
console.log(s); // "hello" (unchanged!)

// typeof
typeof "hello"; // "string"
typeof '';      // "string"
typeof `template`; // "string"
```

**String Conversion Gotcha:**
```javascript
"" + 1;   // "1" (string concatenation)
" " + 0;  // " 0" (space is string, forces string concatenation)
"" + {};  // "[object Object]"
[] + [];  // "" (both convert to empty strings)
[] + {};  // "[object Object]"
{} + [];  // 0 (block statement + array = 0)
```

---

### 1.7 symbol

Creates a **unique and immutable** identifier. Primarily used as hidden object property keys.

```javascript
// Creating symbols
let sym1 = Symbol();
let sym2 = Symbol("description"); // optional description for debugging

// Every symbol is unique
Symbol() === Symbol(); // false
Symbol("foo") === Symbol("foo"); // false

// typeof
typeof Symbol(); // "symbol"

// Using as object keys
const MY_KEY = Symbol("myKey");
const obj = {
  [MY_KEY]: "secret value"
};
console.log(obj[MY_KEY]); // "secret value"

// Symbols are not enumerable in for...in
for (let key in obj) {
  console.log(key); // nothing logged (symbol keys skipped)
}

// Object.keys() also skips symbols
Object.keys(obj); // []

// But Object.getOwnPropertySymbols() gets them
Object.getOwnPropertySymbols(obj); // [Symbol(myKey)]

// Global symbols
const globalSym = Symbol.for("globalSymbol");
const sameSym = Symbol.for("globalSymbol");
globalSym === sameSym; // true

// Symbol.toPrimitive (covered in Type Conversion)
```

---

### 1.8 object

The **only non-primitive type**. Everything that is not a primitive is an object. Includes arrays, functions, dates, regexps, maps, sets, and plain objects.

```javascript
// Plain object
const person = {
  name: "John",
  age: 30
};

// Array (special object)
const arr = [1, 2, 3];

// Function (special object)
function greet() { return "hello"; }

// Date
const date = new Date();

// RegExp
const regex = /pattern/;

// Map and Set
const map = new Map();
const set = new Set();

// All of these are objects
typeof {};          // "object"
typeof [];          // "object"
typeof function(){}; // "function" (special case!)
typeof new Date();  // "object"
typeof /regex/;     // "object"

// Objects are passed by reference
const a = { x: 1 };
const b = a; // b references the same object
b.x = 2;
console.log(a.x); // 2 (modified!)

// Objects are mutable
const obj = { x: 1 };
obj.y = 2;           // add property
obj.x = 3;           // modify property
delete obj.y;        // delete property

// Objects are compared by reference, not value
{} === {};       // false (different objects)
const same = {};
same === same;   // true (same reference)
```

---

### 1.9 Array (Special Object)

Arrays are objects with numeric keys and special methods. There is **no separate "array" type** at the language level.

```javascript
const arr = [1, 2, 3, 4, 5];

// Array properties
arr.length; // 5

// Array methods
arr.push(6);        // add to end: [1,2,3,4,5,6]
arr.pop();          // remove from end: [1,2,3,4,5]
arr.unshift(0);     // add to start: [0,1,2,3,4,5]
arr.shift();        // remove from start: [1,2,3,4,5]
arr.indexOf(3);     // 2 (index of value)
arr.includes(3);    // true
arr.find(x => x > 3); // 4
arr.filter(x => x > 3); // [4, 5]
arr.map(x => x * 2); // [2, 4, 6, 8, 10]
arr.reduce((sum, x) => sum + x, 0); // 15
arr.slice(1, 3);    // [2, 3]
arr.splice(1, 2);   // removes [2, 3]

// Type checking
typeof []; // "object" (not "array"!)
Array.isArray([]); // true
Array.isArray({}); // false

// Arrays are objects - they have properties
const arr2 = [1, 2, 3];
arr2.foo = "bar";
arr2.foo; // "bar"
```

---

### 1.10 Function (Special Object)

Functions are objects with a `[[Call]]` internal slot. They can be assigned to variables, passed as arguments, and returned from other functions.

```javascript
// Function declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Function expression
const greet2 = function(name) {
  return `Hello, ${name}!`;
};

// Arrow function (ES6)
const greet3 = (name) => `Hello, ${name}!`;

// Functions are objects
typeof greet; // "function"
greet instanceof Object; // true

// Functions can have properties
greet.customProp = "custom";
greet.customProp; // "custom"

// Function as constructor
function Person(name) {
  this.name = name;
}
const john = new Person("John");
john instanceof Person; // true
```

---

## 2. Variables: var, let, const

### 2.1 var

- **Function-scoped** (or globally scoped if declared outside a function)
- **Hoisted** and initialized to `undefined`
- **Can be re-declared** in the same scope
- **Creates a property on the global object** when declared globally

```javascript
function example() {
  console.log(x); // undefined (hoisted)
  var x = 10;
  console.log(x); // 10
}

// var ignores block scope
if (true) {
  var y = 5;
}
console.log(y); // 5 (accessible outside the block!)

// var can be re-declared
var z = 1;
var z = 2; // No error

// var in loops - classic closure problem
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 (not 0, 1, 2!)
// Because var is function-scoped, i is shared across all iterations

// var creates global property
var globalVar = "I'm global";
console.log(window.globalVar); // "I'm global" (in browsers)
```

### 2.2 let

- **Block-scoped** (limited to the nearest `{}` block)
- **Hoisted** but **NOT initialized** (Temporal Dead Zone)
- **Cannot be re-declared** in the same scope
- **Can be reassigned**

```javascript
// let is block-scoped
if (true) {
  let a = 10;
  console.log(a); // 10
}
// console.log(a); // ReferenceError: a is not defined

// let cannot be re-declared
let b = 1;
// let b = 2; // SyntaxError: Identifier 'b' has already been declared

// let can be reassigned
let c = 1;
c = 2; // OK

// let in loops - works correctly!
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 (each iteration has its own i)

// Temporal Dead Zone
// console.log(d); // ReferenceError: Cannot access 'd' before initialization
let d = 5;
console.log(d); // 5

// typeof with TDZ
// typeof e; // ReferenceError (unlike var which would return "undefined")
let e = 10;
```

### 2.3 const

- **Block-scoped** (same as let)
- **Must be initialized** at declaration
- **Cannot be reassigned**
- **Prevents re-declaration**

```javascript
// const must be initialized
// const f; // SyntaxError: Missing initializer in const declaration

// const cannot be reassigned
const g = 1;
// g = 2; // TypeError: Assignment to constant variable

// BUT - const objects/arrays CAN be mutated!
const obj = { x: 1 };
obj.x = 2; // OK - mutating the object
console.log(obj.x); // 2

// obj = {}; // TypeError - can't reassign the binding

const arr = [1, 2, 3];
arr.push(4); // OK - mutating the array
console.log(arr); // [1, 2, 3, 4]

// arr = [5, 6, 7]; // TypeError - can't reassign the binding

// const in block scope
if (true) {
  const h = 10;
  console.log(h); // 10
}
// console.log(h); // ReferenceError

// const with destructuring
const [a, b] = [1, 2];
const { name, age } = { name: "John", age: 30 };
```

### 2.4 Hoisting Comparison

```javascript
// var - hoisted and initialized to undefined
console.log(a); // undefined
var a = 5;

// let - hoisted but NOT initialized (TDZ)
// console.log(b); // ReferenceError
let b = 5;

// const - hoisted but NOT initialized (TDZ)
// console.log(c); // ReferenceError
const c = 5;

// function declarations - fully hoisted
greet(); // "Hello!" - works before declaration
function greet() {
  console.log("Hello!");
}

// function expressions - follow variable rules
// sayHi(); // TypeError: sayHi is not a function
var sayHi = function() {
  console.log("Hi!");
};

// const sayHi2 = function() {
//   console.log("Hi!");
// };
// sayHi2(); // ReferenceError (TDZ)
```

### 2.5 Temporal Dead Zone (TDZ) Deep Dive

```javascript
// The TDZ is the period from the start of the block until the declaration
// is reached. During this time, the variable is "dead" and cannot be accessed.

function example() {
  // TDZ starts here for x
  console.log(x); // ReferenceError
  // TDZ continues...
  let x = 10;
  // TDZ ends here
  console.log(x); // 10
}

// TDZ is temporal (time-based), not positional (code-based)
function anotherExample() {
  // Even though this function is defined before the declaration,
  // it will only cause an error if called before the declaration
  function inner() {
    console.log(y); // ReferenceError if called before declaration
  }
  
  let y = 5;
  inner(); // OK - called after declaration
}

// TDZ with typeof
// typeof undeclared; // undefined (no error for undeclared variables)
// typeof undeclaredLet; // ReferenceError (TDZ)
let undeclaredLet = 1;
```

### 2.6 Best Practices

```javascript
// 1. Use const by default
const config = { apiUrl: "https://api.example.com" };

// 2. Use let when you need to reassign
let counter = 0;
counter++;

// 3. Avoid var entirely
// var causes scoping bugs and hoisting confusion

// 4. Declare variables close to their usage
function processUser(user) {
  const name = user.name;
  const age = user.age;
  // ... use name and age
}

// 5. Use block scoping to your advantage
for (let i = 0; i < 10; i++) {
  const item = items[i];
  // item is scoped to this iteration
}
```

### 2.7 Complete Comparison Table

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| Scope | Function | Block | Block |
| Hoisting | Yes (initialized to `undefined`) | Yes (TDZ) | Yes (TDZ) |
| Re-declaration | Allowed | Not allowed | Not allowed |
| Reassignment | Allowed | Allowed | Not allowed |
| Initializer required | No | No | Yes |
| Global property | Yes | No | No |
| Use case | Legacy code | Variables that change | Variables that don't change |

---

## 3. All JavaScript Operators

### 3.1 Arithmetic Operators

Perform mathematical operations on numbers.

```javascript
// Addition (+)
5 + 3;          // 8
"Hello" + " " + "World"; // "Hello World" (string concatenation)
"5" + 3;        // "53" (string, because one operand is string)
5 + "3";        // "53" (string, because one operand is string)

// Subtraction (-)
10 - 4;         // 6
"10" - 4;       // 6 (string converted to number)
5 - "3";        // 2

// Multiplication (*)
6 * 7;          // 42
"6" * "7";      // 42 (strings converted to numbers)

// Division (/)
20 / 4;         // 5
20 / 3;         // 6.666666666666667
5 / 0;          // Infinity
-5 / 0;         // -Infinity

// Remainder/Modulo (%)
5 % 2;          // 1
10 % 3;         // 1
-5 % 2;         // -1 (sign follows dividend)
5 % -2;         // 1

// Exponentiation (**)
2 ** 3;         // 8 (2^3)
4 ** 0.5;       // 2 (square root)
2 ** -2;        // 0.25 (1/4)

// Increment (++)
let x = 5;
x++;   // x is now 6 (post-increment: returns old value, then increments)
++x;   // x is now 7 (pre-increment: increments, then returns new value)

// Decrement (--)
let y = 5;
y--;   // y is now 4 (post-decrement)
--y;   // y is now 3 (pre-decrement)

// Unary plus (+) - converts to number
+true;     // 1
+"5";      // 5
+"";       // 0
+null;     // 0
+undefined; // NaN
+"hello";  // NaN

// Unary negation (-) - negates and converts to number
-"5";      // -5
-true;     // -1
```

**Key Gotcha - The + Operator:**
```javascript
// + is overloaded: string concatenation OR numeric addition
// If ANY operand is a string, string concatenation happens
"5" + 3;    // "53" (string)
"5" + true; // "5true" (string)
"5" + null; // "5null" (string)

// All other math operators ALWAYS convert to numbers
"5" - 3;    // 2 (number)
"5" * 2;    // 10 (number)
"5" / 2;    // 2.5 (number)
"5" % 2;    // 1 (number)
```

---

### 3.2 Assignment Operators

Assign values to variables.

```javascript
// Simple assignment
let x = 5;

// Compound assignment
x += 5;   // x = x + 5 → 10
x -= 3;   // x = x - 3 → 7
x *= 2;   // x = x * 2 → 14
x /= 7;   // x = x / 7 → 2
x %= 3;   // x = x % 3 → 2
x **= 3;  // x = x ** 3 → 8

// Bitwise assignment
x <<= 1;  // x = x << 1
x >>= 1;  // x = x >> 1
x >>>= 1; // x = x >>> 1
x &= 3;   // x = x & 3
x |= 3;   // x = x | 3
x ^= 3;   // x = x ^ 3

// Logical assignment (ES2021)
let a = 0;
a ||= 10;  // a = a || 10 → 10 (a was falsy)
// Equivalent to: a || (a = 10)

let b = "hello";
b &&= "world";  // b = b && "world" → "world" (b was truthy)
// Equivalent to: b && (b = "world")

let c = null;
c ??= "default";  // c = c ?? "default" → "default" (c was null/undefined)
// Equivalent to: c ?? (c = "default")

// Destructuring assignment
let [p, q, r] = [1, 2, 3];
let { name, age } = { name: "John", age: 30 };

// Comma operator in assignment
let m, n;
m = n = 5; // both m and n are 5

// Be careful with var x = y = 1
// var x = y = 1; // y becomes implicit global!
```

---

### 3.3 Comparison Operators

Compare two values and return a boolean.

```javascript
// Equal to (==) - LOOSE equality (type coercion!)
5 == 5;        // true
5 == "5";      // true (string converted to number)
null == undefined; // true
0 == false;    // true
"" == false;   // true
" " == false;  // true
"0" == false;  // true

// Not equal to (!=) - LOOSE inequality
5 != "5";      // false (same as 5 == "5")
null != undefined; // false

// Strict equal (===) - NO type coercion
5 === 5;       // true
5 === "5";     // false (different types)
null === undefined; // false
0 === false;   // false

// Strict not equal (!==)
5 !== "5";     // true
null !== undefined; // true
0 !== false;   // true

// Greater than (>)
5 > 3;         // true
"5" > 3;       // true (string converted to number)
5 > "3";       // true

// Greater than or equal (>=)
5 >= 5;        // true

// Less than (<)
5 < 3;         // false

// Less than or equal (<=)
5 <= 5;        // true

// String comparison (lexicographical)
"apple" < "banana"; // true
"2" > "10";         // true (compares character codes: '2' > '1')
"2" > 10;           // false (string converted to number)
```

**Gotcha - Loose Equality:**
```javascript
// Some surprising == results
[] == false;       // true
[] == ![];         // true (![] is false, then [] == false)
[0] == false;      // true
"" == 0;           // true
" " == 0;          // true
null == undefined; // true
null == 0;         // false (null only equals null/undefined with ==)
null == false;     // false
undefined == false; // false

// Recommendation: ALWAYS use ===
```

---

### 3.4 Logical Operators

Used with boolean values, but return **one of the operands** (not necessarily a boolean).

```javascript
// Logical AND (&&)
true && true;     // true
true && false;    // false
false && true;    // false
false && false;   // false

// Short-circuit: returns first falsy value, or last value if all truthy
"hello" && 5;     // 5 (both truthy, returns last)
"" && "world";    // "" (first is falsy, returns it)
null && "world";  // null (first is falsy, returns it)
0 && false;       // 0 (first is falsy, returns it)

// Logical OR (||)
true || true;     // true
true || false;    // true
false || true;    // true
false || false;   // false

// Short-circuit: returns first truthy value, or last value if all falsy
"hello" || 5;     // "hello" (first is truthy, returns it)
"" || "world";    // "world" (first is falsy, returns it)
null || undefined; // undefined (both falsy, returns last)
0 || false;       // false (both falsy, returns last)

// Logical NOT (!)
!true;    // false
!false;   // true
!"hello"; // false (truthy value)
!"";      // true (empty string is falsy)
!0;       // true
!null;    // true
!undefined; // true
!NaN;     // true

// Double NOT (!!) - converts to boolean
!!true;      // true
!!"hello";   // true
!!0;         // false
!!null;      // false

// Practical uses
const name = "John";
const displayName = name || "Anonymous"; // "John"

const config = null;
const settings = config || {}; // {}

// Nullish coalescing (??) - returns first nullish value
null ?? "default";      // "default"
undefined ?? "default"; // "default"
0 ?? "default";         // 0 (not nullish!)
"" ?? "default";        // "" (not nullish!)
false ?? "default";     // false (not nullish!)
```

---

### 3.5 Bitwise Operators

Operate on 32-bit binary representations of numbers.

```javascript
// Bitwise AND (&)
5 & 3;     // 1 (0101 & 0011 = 0001)
12 & 5;    // 4 (1100 & 0101 = 0100)

// Bitwise OR (|)
5 | 3;     // 7 (0101 | 0011 = 0111)
12 | 5;    // 17 (1100 | 0101 = 1101)

// Bitwise XOR (^)
5 ^ 3;     // 6 (0101 ^ 0011 = 0110)
12 ^ 5;    // 9 (1100 ^ 0101 = 1001)

// Bitwise NOT (~) - inverts all bits
~5;        // -6 (~0101 = ...11111010)
~0;        // -1
~-1;       // 0

// Left shift (<<)
5 << 1;    // 10 (0101 << 1 = 1010)
5 << 2;    // 20 (0101 << 2 = 10100)

// Right shift (>>) - sign-propagating
10 >> 1;   // 5 (1010 >> 1 = 0101)
-10 >> 1;  // -5 (preserves sign)

// Unsigned right shift (>>>) - zero-fill
10 >>> 1;  // 5
-10 >>> 1; // 2147483643 (fills with zeros)

// Practical uses
// Fast multiplication/division by powers of 2
5 << 1;   // 10 (5 * 2)
5 << 2;   // 20 (5 * 4)
20 >> 1;  // 10 (20 / 2)
20 >> 2;  // 5 (20 / 4)

// Check if number is odd/even
5 & 1;    // 1 (odd)
4 & 1;    // 0 (even)

// Swap two variables without temp
let a = 5, b = 3;
a ^= b;
b ^= a;
a ^= b;
// a = 3, b = 5
```

---

### 3.6 Ternary Operator (Conditional)

The only JavaScript operator that takes three operands.

```javascript
// Syntax: condition ? exprIfTrue : exprIfFalse
let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// Equivalent if/else
if (age >= 18) {
  status = "adult";
} else {
  status = "minor";
}

// Nested ternaries (use sparingly!)
let score = 85;
let grade = score >= 90 ? "A" 
          : score >= 80 ? "B" 
          : score >= 70 ? "C" 
          : "F";

// Practical examples
const isLoggedIn = true;
const message = isLoggedIn ? "Welcome back!" : "Please log in";

const discount = isMember ? 20 : 0;

// Ternary with function calls
const result = isValid ? processValid(data) : handleInvalid(data);
```

---

### 3.7 typeof Operator

Returns a string indicating the type of the operand's value.

```javascript
// Primitives
typeof undefined; // "undefined"
typeof null;      // "object" (FAMOUS BUG!)
typeof true;      // "boolean"
typeof 42;        // "number"
typeof 42n;       // "bigint"
typeof "hello";   // "string"
typeof Symbol();  // "symbol"

// Objects
typeof {};        // "object"
typeof [];        // "object" (arrays are objects!)
typeof function(){}; // "function" (special case!)
typeof new Date(); // "object"
typeof /regex/;    // "object"
typeof null;       // "object" (bug - null is primitive!)

// Usage
typeof x !== "undefined"; // check if variable exists
typeof x === "string";    // check type

// typeof with undeclared variables (no error!)
typeof undeclaredVar; // "undefined" (no ReferenceError!)

// typeof with TDZ (let/const)
// let myVar = 5;
// typeof myVar; // ReferenceError (TDZ)
```

**Complete typeof Table:**

| Value | typeof Returns |
|-------|---------------|
| `undefined` | `"undefined"` |
| `null` | `"object"` (bug!) |
| `true`/`false` | `"boolean"` |
| `42`, `3.14`, `NaN`, `Infinity` | `"number"` |
| `9n` | `"bigint"` |
| `"hello"` | `"string"` |
| `Symbol()` | `"symbol"` |
| `function(){}` | `"function"` |
| `{}`, `[]`, `new Date()`, etc. | `"object"` |

---

### 3.8 instanceof Operator

Tests whether the prototype property of a constructor appears anywhere in the prototype chain of an object.

```javascript
// Basic usage
[] instanceof Array;      // true
{} instanceof Object;     // true
function(){} instanceof Function; // true
new Date() instanceof Date; // true
/regex/ instanceof RegExp; // true

// Inheritance
[] instanceof Object;     // true (Array inherits from Object)
new Person() instanceof Person; // true
new Person() instanceof Object; // true

// Primitives always return false
"hello" instanceof String; // false
42 instanceof Number;      // false
true instanceof Boolean;   // false

// Works with classes
class Animal {}
class Dog extends Animal {}
const dog = new Dog();
dog instanceof Dog;   // true
dog instanceof Animal; // true
dog instanceof Object; // true

// Handwritten instanceof implementation
function myInstanceOf(obj, Constructor) {
  let proto = Object.getPrototypeOf(obj);
  while (proto !== null) {
    if (proto === Constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
```

---

### 3.9 in Operator

Checks if a property exists in an object.

```javascript
const obj = { a: 1, b: 2, c: 3 };

"a" in obj;    // true
"d" in obj;    // false

// Checks inherited properties too
"toString" in obj; // true (inherited from Object.prototype)

// With arrays (indices are keys)
const arr = [1, 2, 3];
0 in arr;       // true
"0" in arr;     // true
3 in arr;       // false (length is 3, but index 3 doesn't exist)

// for...in uses the in operator internally
for (let key in obj) {
  console.log(key); // "a", "b", "c"
}

// hasOwnProperty vs in
obj.hasOwnProperty("a");   // true (own property)
obj.hasOwnProperty("toString"); // false (inherited)
"toString" in obj; // true (includes inherited)
```

---

### 3.10 delete Operator

Removes a property from an object.

```javascript
const obj = { a: 1, b: 2, c: 3 };
delete obj.b;
console.log(obj); // { a: 1, c: 3 }

// Returns true if successful
delete obj.a; // true

// Cannot delete variables declared with var/let/const
let x = 5;
// delete x; // false (in strict mode: SyntaxError)

// Cannot delete non-configurable properties
const obj2 = {};
Object.defineProperty(obj2, 'x', { value: 1, configurable: false });
delete obj2.x; // false

// Returns true even for non-existent properties
delete obj.nonExistent; // true

// Arrays - doesn't change length, creates sparse array
const arr = [1, 2, 3];
delete arr[1];
console.log(arr); // [1, empty × 1, 3]
arr.length; // 3 (unchanged!)

// delete only removes the property, not the variable
const obj3 = { a: 1 };
delete obj3;
// obj3 still exists!
```

---

### 3.11 void Operator

Evaluates an expression and returns `undefined`. Rarely used.

```javascript
// void always returns undefined
void 0;           // undefined
void(0);          // undefined
void "hello";     // undefined
void function(){}(); // undefined

// Practical use: void 0 as undefined
const undef = void 0; // undef is undefined

// Used in href to prevent navigation
// <a href="javascript:void(0)">Click me</a>

// void with immediately invoked functions
void function() {
  console.log("IIFE executed");
}();
```

---

### 3.12 Comma Operator

Evaluates each operand from left to right and returns the value of the last operand.

```javascript
// Returns the last value
let x = (1, 2, 3); // x = 3

// Most useful in for loops
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(i, j);
}

// Multiple expressions in for loop
let a = 0;
for (a++, b = 10; a < b; a++, b--) {
  console.log(a, b);
}

// In return statements
function example() {
  return (1, 2, 3); // returns 3
}

// With side effects
let result = (console.log("first"), console.log("second"), 42);
// Logs "first", then "second", result is 42
```

---

### 3.13 Optional Chaining (?.)

Safely access nested properties without errors. Returns `undefined` if the value is `null` or `undefined`.

```javascript
// Property access
const user = {
  name: "John",
  address: {
    city: "New York"
  }
};

user?.address?.city;     // "New York"
user?.address?.zipCode;  // undefined (no error!)
user?.phone?.number;     // undefined (no error!)

// Without optional chaining
// user.phone.number; // TypeError: Cannot read properties of undefined

// Bracket notation
const key = "name";
user?.[key]; // "John"

const missing = "age";
user?.[missing]; // undefined

// Method calls
const obj = {
  greet() {
    return "Hello!";
  }
};

obj.greet?.();    // "Hello!"
obj.farewell?.(); // undefined (no error!)

// Array access
const arr = [1, 2, 3];
arr?.[0];     // 1
arr?.[10];    // undefined
null?.[0];    // undefined

// Combined with other operators
const city = user?.address?.city?.toUpperCase(); // "NEW YORK"
const zip = user?.address?.zipCode?.toString(); // undefined

// Short-circuiting
let x = 0;
user?.method?.(x++); // x is not incremented if method doesn't exist
```

**Three forms:**
```javascript
obj?.prop        // property access
obj?.[expr]      // bracket notation
obj.method?.()   // method call
```

---

### 3.14 Nullish Coalescing (??)

Returns the right-hand side operand when the left is `null` or `undefined`. Unlike `||`, it preserves other falsy values.

```javascript
// Basic usage
null ?? "default";       // "default"
undefined ?? "default";  // "default"
0 ?? "default";          // 0 (not nullish!)
"" ?? "default";         // "" (not nullish!)
false ?? "default";      // false (not nullish!)

// vs ||
null || "default";       // "default"
0 || "default";          // "default" (0 is falsy!)
"" || "default";         // "default" (empty string is falsy!)
false || "default";      // "default" (false is falsy!)

// Practical uses
const port = config.port ?? 3000;      // preserves 0
const name = user.name ?? "Anonymous"; // preserves ""
const debug = config.debug ?? true;    // preserves false

// Short-circuiting
null ?? console.log("this runs");      // logs
"hello" ?? console.log("this doesn't"); // doesn't log

// Cannot mix with && or || without parentheses
// null ?? true && false; // SyntaxError
(null ?? true) && false; // false
null ?? (true && false); // false

// With optional chaining
const user = { profile: { name: "John" } };
const name = user?.profile?.name ?? "Unknown";
const age = user?.profile?.age ?? 0; // preserves 0 if age is set to 0
```

---

### 3.15 All Operators - Complete Precedence Table

| Precedence | Operator(s) | Associativity |
|------------|-------------|---------------|
| 18 | Grouping `()` | n/a |
| 17 | `.`, `?.`, `[]`, `()`, `new x(y)` | Left-to-right |
| 16 | `new x` (no args) | n/a |
| 15 | `x++`, `x--` (postfix) | n/a |
| 14 | `++x`, `--x`, `!`, `~`, `+`, `-`, `typeof`, `void`, `delete`, `await` | n/a |
| 13 | `**` | Right-to-left |
| 12 | `*`, `/`, `%` | Left-to-right |
| 11 | `+`, `-` | Left-to-right |
| 10 | `<<`, `>>`, `>>>` | Left-to-right |
| 9 | `<`, `<=`, `>`, `>=`, `in`, `instanceof` | Left-to-right |
| 8 | `==`, `!=`, `===`, `!==` | Left-to-right |
| 7 | `&` | Left-to-right |
| 6 | `^` | Left-to-right |
| 5 | `\|` | Left-to-right |
| 4 | `&&` | Left-to-right |
| 3 | `\|\|`, `??` | Left-to-right |
| 2 | `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `**=`, `<<=`, `>>=`, `>>>=`, `&=`, `^=`, `\|=`, `&&=`, `\|\|=`, `??=`, `?:`, `=>` | Right-to-left |
| 1 | `,` | Left-to-right |

---

## 4. Control Flow

### 4.1 if/else Statements

```javascript
// Basic if
if (condition) {
  // executed if condition is truthy
}

// if...else
if (isLoggedIn) {
  showDashboard();
} else {
  showLoginPage();
}

// if...else if...else
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "F";
}

// Single line (without braces - not recommended)
if (x > 0) console.log("positive");

// Truthy/falsy values
if (true) { }    // runs
if (1) { }       // runs (truthy)
if ("hello") { } // runs (truthy)
if (0) { }       // skipped (falsy)
if ("") { }      // skipped (falsy)
if (null) { }    // skipped (falsy)
if (undefined) { } // skipped (falsy)
if (NaN) { }     // skipped (falsy)
if ([]) { }      // runs (objects are truthy!)
if ({}) { }      // runs (objects are truthy!)

// Assignment in condition (not recommended)
if (x = 5) { }  // x is now 5, condition is truthy
```

**Gotcha - Boolean Object vs Primitive:**
```javascript
if (new Boolean(false)) { } // RUNS! (object is truthy)
if (Boolean(false)) { }     // skipped (primitive false)
```

---

### 4.2 switch Statement

```javascript
// Basic switch
switch (expression) {
  case value1:
    // executed if expression === value1
    break;
  case value2:
    // executed if expression === value2
    break;
  default:
    // executed if no case matches
}

// Real example
const day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of work week");
    break;
  case "Friday":
    console.log("End of work week");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
  default:
    console.log("Mid-week");
}

// Fall-through (intentional)
switch (month) {
  case "December":
  case "January":
  case "February":
    console.log("Winter");
    break;
  case "March":
  case "April":
  case "May":
    console.log("Spring");
    break;
  // ...
}

// Fall-through (unintentional bug)
switch (fruit) {
  case "apple":
    console.log("Found apple");
    // No break! Falls through to next case!
  case "banana":
    console.log("Found banana"); // This also runs!
    break;
}

// Switch uses strict equality (===)
switch ("5") {
  case 5:
    console.log("number"); // not executed
    break;
  case "5":
    console.log("string"); // executed
    break;
}

// Multiple cases with same code
switch (action) {
  case "create":
  case "update":
  case "delete":
    console.log("Modifying data");
    break;
  case "read":
    console.log("Reading data");
    break;
}
```

---

### 4.3 for Loop

```javascript
// Basic for loop
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// Multiple variables
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(i, j);
}

// Infinite loop
for (;;) {
  // runs forever (use break to exit)
}

// Loop with continue
for (let i = 0; i < 10; i++) {
  if (i === 5) continue; // skip 5
  console.log(i); // 0, 1, 2, 3, 4, 6, 7, 8, 9
}

// Loop with break
for (let i = 0; i < 100; i++) {
  if (i === 10) break; // stop at 10
  console.log(i); // 0, 1, 2, ..., 9
}

// Nested loops
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    console.log(i, j);
  }
}
```

---

### 4.4 for...in Loop

Iterates over **enumerable property keys** of an object.

```javascript
// Object properties
const person = { name: "John", age: 30, city: "NYC" };
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}
// "name: John", "age: 30", "city: NYC"

// Iterates over inherited properties too
for (let key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key); // only own properties
  }
}

// Arrays (NOT recommended - use for...of instead)
const arr = ["a", "b", "c"];
for (let index in arr) {
  console.log(index); // "0", "1", "2" (strings, not numbers!)
}

// Strings
const str = "hello";
for (let char in str) {
  console.log(char); // "0", "1", "2", "3", "4" (indices)
}

// Gotcha: for...in gives string keys
for (let key in { a: 1 }) {
  console.log(typeof key); // "string" (not number!)
}
```

---

### 4.5 for...of Loop (ES6)

Iterates over **iterable values** (arrays, strings, Maps, Sets, etc.).

```javascript
// Arrays
const arr = ["a", "b", "c"];
for (let value of arr) {
  console.log(value); // "a", "b", "c"
}

// Strings
const str = "hello";
for (let char of str) {
  console.log(char); // "h", "e", "l", "l", "o"
}

// Maps
const map = new Map([["a", 1], ["b", 2]]);
for (let [key, value] of map) {
  console.log(key, value); // "a" 1, "b" 2
}

// Sets
const set = new Set([1, 2, 3]);
for (let value of set) {
  console.log(value); // 1, 2, 3
}

// Objects are NOT iterable!
const obj = { a: 1, b: 2 };
// for (let v of obj) {} // TypeError: obj is not iterable

// Get entries with Object.entries
for (let [key, value] of Object.entries(obj)) {
  console.log(key, value); // "a" 1, "b" 2
}

// with entries()
const arr2 = ["a", "b", "c"];
for (let [index, value] of arr2.entries()) {
  console.log(index, value); // 0 "a", 1 "b", 2 "c"
}
```

---

### 4.6 while Loop

Repeats while a condition is true. Condition is checked **before** each iteration.

```javascript
// Basic while
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// Infinite loop
while (true) {
  // use break to exit
}

// With break
while (true) {
  const input = readline();
  if (input === "quit") break;
}

// With continue
let j = 0;
while (j < 10) {
  j++;
  if (j % 2 === 0) continue; // skip even numbers
  console.log(j); // 1, 3, 5, 7, 9
}
```

---

### 4.7 do...while Loop

Body executes **at least once** before the condition is checked.

```javascript
// Basic do...while
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);

// Executes at least once
let x = 100;
do {
  console.log(x); // 100 (runs once even though condition is false)
} while (x < 5);

// Practical example: user input
let password;
do {
  password = prompt("Enter password:");
} while (password !== "secret");
console.log("Access granted!");
```

---

### 4.8 break Statement

Exits the nearest loop or switch immediately.

```javascript
// Break in for loop
for (let i = 0; i < 100; i++) {
  if (i === 10) break; // exit loop
  console.log(i); // 0-9
}

// Break in while loop
while (true) {
  const data = fetchData();
  if (!data) break;
  process(data);
}

// Break in switch (prevents fall-through)
switch (x) {
  case 1:
    console.log("one");
    break; // exits switch
  case 2:
    console.log("two");
    break;
}

// Break only exits the innermost loop
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) break; // only breaks inner loop
    console.log(i, j);
  }
}
```

---

### 4.9 continue Statement

Skips to the next iteration of the current loop.

```javascript
// Continue in for loop
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue; // skip even numbers
  console.log(i); // 1, 3, 5, 7, 9
}

// Continue in while loop
let i = 0;
while (i < 10) {
  i++;
  if (i % 2 === 0) continue;
  console.log(i); // 1, 3, 5, 7, 9
}

// Continue skips the rest of the current iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue; // skip when i is 2
  console.log(i); // 0, 1, 3, 4
}
```

---

### 4.10 Labeled Statements

Labels allow `break` and `continue` to target specific loops.

```javascript
// Labeled break - exits outer loop
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outerLoop;
    console.log(i, j);
  }
}
// Output: 0 0, 0 1, 0 2

// Labeled continue - continues outer loop
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue outerLoop;
    console.log(i, j);
  }
}
// Output: 0 0, 1 0, 2 0

// Find in 2D array
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

search: for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (matrix[i][j] === 5) {
      console.log(`Found 5 at ${i},${j}`);
      break search;
    }
  }
}
```

---

## 5. Type Conversion

### 5.1 Overview

JavaScript can only convert to **three primitive types**: String, Number, or Boolean.

| Target Type | Explicit Method | Common Implicit Triggers |
|-------------|----------------|--------------------------|
| String | `String(value)` | `+` with a string, template literals |
| Number | `Number(value)` | Math operators (`- * / %`), comparisons |
| Boolean | `Boolean(value)` | `if`, `while`, `!`, `&&`, `||`, `? :` |

### 5.2 Explicit Type Conversion

```javascript
// To String
String(123);       // "123"
String(true);      // "true"
String(null);      // "null"
String(undefined); // "undefined"
String(NaN);       // "NaN"
String([]);        // ""
String([1, 2, 3]); // "1,2,3"
String({});        // "[object Object]"
(123).toString();  // "123"
true.toString();   // "true"
[1,2,3].toString(); // "1,2,3"

// To Number
Number("123");      // 123
Number("12.34");    // 12.34
Number("");         // 0
Number(" ");        // 0
Number("hello");    // NaN
Number(true);       // 1
Number(false);      // 0
Number(null);       // 0
Number(undefined);  // NaN
Number(NaN);        // NaN
Number([]);         // 0
Number([1]);        // 1
Number([1, 2]);     // NaN
Number({});         // NaN

// parseInt and parseFloat
parseInt("123abc");    // 123 (stops at non-digit)
parseInt("abc123");    // NaN
parseInt("12.34");     // 12 (truncates decimal)
parseInt("10", 10);    // 10 (base 10)
parseInt("0xff", 16);  // 255 (base 16)
parseFloat("3.14");    // 3.14
parseFloat("3.14abc"); // 3.14

// To Boolean
Boolean(0);         // false
Boolean(-0);        // false
Boolean(0n);        // false
Boolean("");        // false
Boolean(null);      // false
Boolean(undefined); // false
Boolean(NaN);       // false

Boolean(1);         // true
Boolean(-1);        // true
Boolean("0");       // true (non-empty string!)
Boolean(" ");       // true (non-empty string!)
Boolean([]);        // true (arrays are objects)
Boolean({});        // true (objects are truthy)
Boolean(Infinity);  // true
Boolean(-Infinity); // true
```

### 5.3 Implicit Type Coercion

JavaScript automatically converts types when operators or functions expect a different type.

```javascript
// String concatenation with +
"5" + 3;          // "53" (number → string)
"5" + true;       // "5true" (boolean → string)
"5" + null;       // "5null" (null → string)
"5" + undefined;  // "5undefined" (undefined → string)

// Numeric operations (always convert to number)
"5" - 3;          // 2 (string → number)
"5" * "2";        // 10 (both → number)
"10" / "2";       // 5 (both → number)
"10" % "3";       // 1 (both → number)
+"5";             // 5 (unary + → number)
-"5";             // -5 (unary - → number)

// Comparison operators
"5" > 3;          // true (string → number)
"5" < "10";       // true (string comparison)
5 == "5";         // true (loose equality → coercion)
5 === "5";        // false (strict equality → no coercion)

// Logical operators
!0;               // true (0 → false)
!"hello";         // false (truthy → false)
if ("hello") {}   // runs (string → boolean)

// Bitwise operators
"5" | 0;          // 5 (string → number)
"5" & 1;          // 1 (string → number)

// Arithmetic operators
let x = "5";
x++;              // x is 6 (string → number)
x--;              // x is 5
x += 10;          // x is 15
x -= 5;           // x is 10

// Object to primitive conversion
[] + [];          // "" (both → empty string)
[] + {};          // "[object Object]"
{} + [];          // 0 (block + array = 0)
[1] + [2];        // "12" (string concatenation)
[1, 2] + [3, 4]; // "1,23,4"
```

### 5.4 Object to Primitive Conversion (ToPrimitive)

When objects need to be converted to primitives, JavaScript follows this algorithm:

```javascript
// ToPrimitive algorithm:
// 1. Check for Symbol.toPrimitive method
// 2. If not found, call valueOf() or toString() based on hint
// 3. If neither returns a primitive, throw TypeError

// Hint types:
// "number" - for numeric operations (Number(), math, comparisons)
// "string" - for string operations (String(), template literals)
// "default" - for + operator and == (usually treated as "number")

// Example: valueOf and toString
const obj = {
  valueOf() {
    return 42;
  },
  toString() {
    return "hello";
  }
};

Number(obj);   // 42 (valueOf called first)
String(obj);   // "hello" (toString called first)
obj + 0;       // 42 (default hint, valueOf first)
obj + "";      // "42" (string hint? Actually default → valueOf first → "42")

// Symbol.toPrimitive (ES6)
const obj2 = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return 42;
    if (hint === "string") return "hello";
    return "default";
  }
};

Number(obj2);   // 42
String(obj2);   // "hello"
obj2 + "";      // "default"

// Array conversion
[1, 2, 3].toString(); // "1,2,3"
[1, 2, 3] + "";       // "1,2,3"
+[1, 2, 3];           // NaN (can't convert "1,2,3" to number)
+[];                  // 0 (empty string → 0)
+[1];                 // 1

// Date conversion
const date = new Date();
date[Symbol.toPrimitive]("string"); // "Tue Jul 08 2025 ..."
date[Symbol.toPrimitive]("number"); // timestamp (milliseconds)
date + "";             // date as string (default is "string" for Date!)
date - 0;              // timestamp (number conversion)
```

### 5.5 The == Algorithm (Loose Equality)

```javascript
// Simplified == algorithm:
// 1. If same type, compare directly (like ===)
// 2. null == undefined is true
// 3. If one is string and other is number, convert string to number
// 4. If one is boolean, convert it to number
// 5. If one is object and other is primitive, convert object to primitive

// Examples:
null == undefined;     // true (special rule)
null == 0;             // false (null only equals null/undefined)
null == false;         // false
undefined == 0;        // false
undefined == false;    // false

"" == 0;               // true (string → number: 0 == 0)
" " == 0;              // true (string → number: 0 == 0)
"0" == false;          // true (both → number: 0 == 0)
"0" == 0;              // true (string → number)
false == "0";          // true (both → number: 0 == 0)

[] == false;           // true (both → number: 0 == 0)
[] == 0;               // true ([] → "" → 0)
[0] == false;          // true (both → number: 0 == 0)
[""] == false;         // true (both → number: 0 == 0)
[null] == 0;           // true ([null] → "" → 0)

" \t\n" == 0;          // true (whitespace → "" → 0)
```

### 5.6 Gotchas and Edge Cases

```javascript
// Classic gotchas
[] + [];           // "" (both convert to empty string)
[] + {};           // "[object Object]"
{} + [];           // 0 (block statement + array)

// Boolean gotchas
new Boolean(false); // truthy! (it's an object)
Boolean(false);     // false (primitive)

// Number gotchas
0.1 + 0.2;         // 0.30000000000000004
0.1 + 0.2 === 0.3; // false

// String gotchas
"5" + 3;           // "53" (string)
"5" - 3;           // 2 (number)
+"5";              // 5 (number)

// Null/undefined gotchas
null + 1;           // 1 (null → 0)
undefined + 1;      // NaN (undefined → NaN)
null == undefined;  // true
null === undefined; // false

// Array to number
Number([]);         // 0
Number([1]);        // 1
Number([1, 2]);     // NaN

// Object to number
Number({});         // NaN
Number({valueOf() { return 42; }}); // 42

// Empty string
Number("");         // 0
Boolean("");        // false
"" == 0;            // true

// Space string
Number(" ");        // 0
Boolean(" ");       // true
" " == 0;           // true
```

---

## 6. Type Checking

### 6.1 typeof Operator

Best for **primitive type checking** and checking if a variable exists.

```javascript
// Primitive types (accurate)
typeof undefined; // "undefined"
typeof true;      // "boolean"
typeof 42;        // "number"
typeof 42n;       // "bigint"
typeof "hello";   // "string"
typeof Symbol();  // "symbol"

// Reference types
typeof null;      // "object" (BUG!)
typeof [];        // "object" (can't distinguish from {})
typeof {};        // "object"
typeof new Date(); // "object"
typeof /regex/;   // "object"
typeof function(){}; // "function" (special case!)

// Safe check for undeclared variables
typeof undeclaredVar; // "undefined" (no ReferenceError!)
// undeclaredVar;      // ReferenceError

// Usage
if (typeof x === "undefined") {
  console.log("x is not defined");
}

if (typeof x === "string") {
  console.log(x.toUpperCase());
}
```

### 6.2 instanceof Operator

Best for **object type checking** and checking class hierarchy.

```javascript
// Works with objects
[] instanceof Array;         // true
{} instanceof Object;        // true
new Date() instanceof Date;  // true
/regex/ instanceof RegExp;   // true
function(){} instanceof Function; // true

// Primitives always return false
"hello" instanceof String;  // false
42 instanceof Number;       // false
true instanceof Boolean;    // false

// Class hierarchy
class Animal {}
class Dog extends Animal {}
const dog = new Dog();

dog instanceof Dog;     // true
dog instanceof Animal;  // true
dog instanceof Object;  // true

// Custom instanceof
class MyArray extends Array {}
const arr = new MyArray(1, 2, 3);
arr instanceof MyArray; // true
arr instanceof Array;   // true

// Handwritten instanceof
function myInstanceOf(obj, Constructor) {
  let proto = Object.getPrototypeOf(obj);
  while (proto !== null) {
    if (proto === Constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
```

### 6.3 Object.prototype.toString.call()

Most **accurate** method for type checking objects.

```javascript
// Basic usage
Object.prototype.toString.call(123);          // "[object Number]"
Object.prototype.toString.call("hello");      // "[object String]"
Object.prototype.toString.call(true);         // "[object Boolean]"
Object.prototype.toString.call(null);         // "[object Null]"
Object.prototype.toString.call(undefined);    // "[object Undefined]"
Object.prototype.toString.call(Symbol());     // "[object Symbol]"
Object.prototype.toString.call({});           // "[object Object]"
Object.prototype.toString.call([]);           // "[object Array]"
Object.prototype.toString.call(new Date());   // "[object Date]"
Object.prototype.toString.call(/regex/);      // "[object RegExp]"
Object.prototype.toString.call(function(){}); // "[object Function]"
Object.prototype.toString.call(Math);         // "[object Math]"
Object.prototype.toString.call(JSON);         // "[object JSON]"

// Custom type checking function
function type(value) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  
  const baseType = typeof value;
  if (baseType !== "object" && baseType !== "function") {
    return baseType;
  }
  
  const tag = Object.prototype.toString.call(value).slice(8, -1);
  return tag;
}

// Usage
type(123);         // "Number"
type("hello");     // "String"
type([]);          // "Array"
type({});          // "Object"
type(new Date());  // "Date"
type(/regex/);     // "RegExp"
type(null);        // "null"
type(undefined);   // "undefined"
type(function(){}); // "Function"

// Better array check
Array.isArray([]);         // true
Array.isArray({});         // false
Object.prototype.toString.call([]); // "[object Array]"
```

### 6.4 Other Type Checking Methods

```javascript
// Array.isArray() - Best for arrays
Array.isArray([]);         // true
Array.isArray([1, 2, 3]);  // true
Array.isArray(new Array()); // true
Array.isArray({});         // false
Array.isArray(null);       // false

// Number.isNaN() - Best for NaN checking
Number.isNaN(NaN);         // true
Number.isNaN("hello");     // false
Number.isNaN(undefined);   // false
isNaN(NaN);                // true (global isNaN coerces!)
isNaN("hello");            // true (coerces to NaN!)

// Number.isFinite()
Number.isFinite(42);       // true
Number.isFinite(Infinity); // false
Number.isFinite("42");     // false

// null and undefined checks
value === null;
value === undefined;
value == null; // true for both null and undefined

// Boolean checking
typeof value === "boolean";

// Function checking
typeof value === "function";
value instanceof Function;
typeof value === "function" || value instanceof Function;

// Plain object checking
typeof value === "object" && value !== null && !Array.isArray(value);
value.constructor === Object;
Object.prototype.toString.call(value) === "[object Object]";

// Symbol checking
typeof value === "symbol";

// BigInt checking
typeof value === "bigint";
```

### 6.5 Complete Type Checking Comparison

| Method | Primitives | Objects | Arrays | null | undefined | NaN | Functions |
|--------|-----------|---------|--------|------|-----------|-----|-----------|
| `typeof` | Accurate (except null → "object") | "object" | "object" | "object" (bug) | "undefined" | "number" | "function" |
| `instanceof` | Always false | true | true | Error | Error | false | true |
| `Object.prototype.toString.call()` | "[object Type]" | "[object Object]" | "[object Array]" | "[object Null]" | "[object Undefined]" | "[object Number]" | "[object Function]" |
| `Array.isArray()` | false | false | true | false | false | false | false |

### 6.6 Best Practices

```javascript
// 1. Use typeof for primitives and checking if variable exists
if (typeof x === "string") { /* ... */ }
if (typeof x !== "undefined") { /* ... */ }

// 2. Use Array.isArray() for arrays
if (Array.isArray(value)) { /* ... */ }

// 3. Use instanceof for custom classes and objects
if (value instanceof Date) { /* ... */ }
if (value instanceof RegExp) { /* ... */ }

// 4. Use Object.prototype.toString.call() for most accurate object type
const type = Object.prototype.toString.call(value).slice(8, -1);

// 5. Use Number.isNaN() (not global isNaN!)
Number.isNaN(value); // correct
isNaN(value);        // incorrect (coerces!)

// 6. Use === for null/undefined checks
value === null;      // exact null check
value === undefined; // exact undefined check
value == null;       // both null and undefined

// 7. Don't use typeof for objects (except functions)
typeof [] === "object" // true - not helpful!
typeof {} === "object" // true - not helpful!
```

---

## Quick Reference Summary

### Data Types at a Glance
```js
Primitives: undefined, null, boolean, number, bigint, string, symbol
Objects: object (includes Array, Function, Date, Map, Set, etc.)
```

### Variables at a Glance
```js
var   → function-scoped, hoisted with undefined, re-declarable
let   → block-scoped, hoisted with TDZ, reassignable, not re-declarable
const → block-scoped, hoisted with TDZ, not reassignable, not re-declarable
```

### Key Gotchas
```js
typeof null === "object"           // 30-year-old bug
typeof NaN === "number"            // NaN is a number
[] == ![]                         // true (![] is false, [] == false)
null == undefined                  // true
null === undefined                 // false
0.1 + 0.2 !== 0.3                 // floating-point precision
"5" + 3 === "53"                  // string concatenation
"5" - 3 === 2                     // numeric conversion
```

### Type Conversion Rules
```js
ToBoolean: false, 0, -0, 0n, "", null, undefined, NaN
ToNumber:  undefined→NaN, null→0, true→1, false→0, ""→0
ToString:  undefined→"undefined", null→"null", true→"true", false→"false"
ToPrimitive: Symbol.toPrimitive → valueOf()/toString() based on hint
```

[02-Functions-and-Closures.md](02-Functions-and-Closures.md)