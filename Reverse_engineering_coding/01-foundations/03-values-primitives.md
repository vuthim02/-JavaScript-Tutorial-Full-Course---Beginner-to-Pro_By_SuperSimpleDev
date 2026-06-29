# Values and Primitives

<img src="https://imgs.search.brave.com/JoNe1Ro3lu0bqaO35JrDfN1dQzKF1F_aPP0jcc9QKsc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTAuZ2lwaHkuY29t/L21lZGlhL3YxLlky/bGtQVGM1TUdJM05q/RXhZelpzWTJsc05U/aHNheko1ZG5jNE1U/TnlPVzh6WW10NU9E/TTRaamR2WW1jemFY/Sm9ORFJwYVNabGNE/MTJNVjluYVdaelgz/TmxZWEpqYUNaamRE/MW4vNDJISjI2Uzdi/dmJtVmhjYVIyLzIw/MC5naWY.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Everything Is a Value

In JavaScript, **a value is any piece of data** you can work with.

```javascript
10          // This is a value (a number)
3.14        // This is a value (a number)
true        // This is a value (a boolean)
"hello"     // This is a value (a string)
null        // This is a value (null)
undefined   // This is a value (undefined)
```

---

## Two Categories of Values

```
        All Values
       /           \
  Primitive       Object
  (simple)        (complex)
```

**Primitives** are simple, single pieces of data. They are **immutable** — once created, they cannot be changed. There are 7 primitive types.

**Objects** are complex collections of data. They are mutable.

---

## Primitive Type 1: Number

JavaScript uses a **single Number type** for all numbers. Every number is stored as a 64-bit floating-point value (IEEE 754 standard).

```javascript
42          // Whole number (integer)
3.14        // Decimal number (float)
-5          // Negative number
Infinity    // Positive infinity
-Infinity   // Negative infinity
NaN         // "Not a Number" — an invalid number result
```

| Detail | Value |
|---|---|
| Total storage | 64 bits (8 bytes) per number |
| Safe integer range | About ±9 quadrillion |

**Common gotcha:**

```javascript
0.1 + 0.2   // 0.30000000000000004 (not exactly 0.3!)
```

This happens because of how floating-point numbers are stored in binary. It affects all languages, not just JavaScript.

---

## Primitive Type 2: String

A string is a **sequence of characters**. Strings are immutable — every operation that seems to modify a string actually creates a new one.

```javascript
"hello"              // Double quotes
'world'              // Single quotes (same thing)
`template literal`   // Backticks — allows embedded expressions
```

**Key escape sequences:**

| Escape | What it produces |
|---|---|
| `\n` | New line |
| `\t` | Tab |
| `\\` | Literal backslash |
| `\"` | Literal double quote |
| `\'` | Literal single quote |

**Template literals (backticks):**

```javascript
const name = "Alice";
const age = 30;
console.log(`Hello, my name is ${name} and I am ${age} years old.`);
```

The `${}` syntax lets you embed any JavaScript expression inside a string.

---

## Primitive Type 3: Boolean

A boolean represents a logical truth value — only two possibilities:

```javascript
true    // Yes, correct, on
false   // No, incorrect, off
```

Booleans are almost always the result of comparisons:

```javascript
5 > 3      // true
10 === 5   // false
"a" !== "b" // true
```

---

## Reverse Engineering: Values

**For any number you see:**

| Question | Answer |
|---|---|
| Where is this stored? | In memory — 8 bytes (64 bits) for every number |
| Is a number mutable? | No — primitives are immutable |
| What is `0.1 + 0.2`? | `0.30000000000000004` — floating-point precision issue |
| Why does `NaN === NaN` return `false`? | NaN is never equal to anything, including itself |
| How do I check if something is NaN? | Use `Number.isNaN(value)` |

**For any string you see:**

| Question | Answer |
|---|---|
| Why are strings immutable? | Performance — allows memory sharing and optimization |
| What happens when you concatenate strings? | A brand new string is created |
| How do I access the first character? | `"hello"[0]` → `"h"` (zero-indexed) |
| Can I change a character in a string? | No — you must create a new string |
## Next Steps

[Back to Chapter 2](02-javascript-engines.md): JavaScript Engines
[Proceed to Chapter 4](04-null-undefined-symbol-bigint.md): Null, Undefined, Symbol, BigInt, and typeof to learn about null, undefined, symbol, bigint, and typeof.
