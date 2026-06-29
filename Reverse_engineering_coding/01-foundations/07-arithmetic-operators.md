# Arithmetic Operators

<img src="https://imgs.search.brave.com/cmX6fIxqBgkVGsBLII6dCQ_k-oFkfO6IoNMQfngWH6E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTEuZ2lwaHkuY29t/L21lZGlhL3YxLlky/bGtQVGM1TUdJM05q/RXhjalE0T0RFM01X/NXhkVGcxY21Kek5X/eHhOSEIxTUdKdGRX/RjVNM0Y0TW1reWEy/SnZaSGRyT1NabGNE/MTJNVjluYVdaelgz/TmxZWEpqYUNaamRE/MW4vRGZTWGlSNjBX/OU1WcS8xMDAuZ2lm.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Is an Operator?

An operator is a **symbol that performs an operation** on one or more values (called operands) and produces a result.

```javascript
5 + 3
// ↑   ↑
// 5 and 3 are operands
//   + is the operator
// = 8 is the result
```

---

## Arithmetic Operators

| Operator | Name | Example | Result |
|---|---|---|---|
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraction | `5 - 3` | `2` |
| `*` | Multiplication | `5 * 3` | `15` |
| `/` | Division | `5 / 3` | `1.666...` |
| `%` | Modulus (remainder) | `5 % 3` | `2` |
| `**` | Exponentiation | `5 ** 3` | `125` |
| `++` | Increment | `x++` or `++x` | depends |
| `--` | Decrement | `x--` or `--x` | depends |
| `+` (unary) | Convert to number | `+"5"` | `5` |
| `-` (unary) | Negate | `-5` | `-5` |

**Modulus `%`** gives you the **remainder** after division. `5 % 3 = 2` because 5 ÷ 3 = 1 with a remainder of 2. Very useful for checking even/odd: `number % 2 === 0` means even.

---

## Pre-increment vs Post-increment

This trips up many beginners:

```javascript
let a = 5;
let b = a++; // POST: use a's CURRENT value first, THEN increment
// b = 5, a = 6

let c = 5;
let d = ++c; // PRE: increment c FIRST, THEN use the new value
// d = 6, c = 6
```

**Simple rule:**
- `a++` → "give me the old value, THEN add 1"
- `++a` → "add 1 FIRST, THEN give me the new value"

---

## Operator Precedence

Operators have a priority order — just like math class (multiplication before addition).

```javascript
2 + 3 * 4     // = 14 (not 20) — * runs first
(2 + 3) * 4   // = 20 — parentheses () override precedence
```

**PEMDAS/BODMAS order:**
1. **P**arentheses / **B**rackets `()`
2. **E**xponents / **O**rders `**`
3. **M**ultiplication `*` and **D**ivision `/` (left to right)
4. **A**ddition `+` and **S**ubtraction `-` (left to right)

```javascript
10 - 5 + 2          // 7  (left to right)
10 - (5 + 2)        // 3  (parentheses first)
2 * 3 + 4 * 5       // 26 (multiplications first: 6 + 20)
2 ** 3 + 4 ** 2     // 24 (exponents first: 8 + 16)
```

> **Tip:** Don't memorize the full precedence table. Use **parentheses** to make your intent clear.

---

## The Math Object

JavaScript's built-in `Math` object has useful methods:

### Rounding

```javascript
Math.round(2.5)   // 3 — round to nearest integer
Math.round(2.4)   // 2
Math.floor(2.9)   // 2 — round DOWN
Math.ceil(2.1)    // 3 — round UP
Math.trunc(2.9)   // 2 — remove decimal part (no rounding)
```

### Other Useful Methods

```javascript
Math.abs(-5)       // 5 — absolute value
Math.sqrt(16)      // 4 — square root
Math.max(1, 5, 3)  // 5 — returns largest
Math.min(1, 5, 3)  // 1 — returns smallest
Math.pow(2, 3)     // 8 — same as 2 ** 3
Math.PI            // 3.141592653589793 — π constant
```

### Math.random() — Random Numbers

```javascript
Math.random() // Returns a random number between 0 (inclusive) and 1 (exclusive)

// Random integer from 1 to 10:
let randomNum = Math.floor(Math.random() * 10) + 1;

// Random integer from min to max (inclusive):
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

---

## Money Calculations — The Right Way

Floating-point numbers have precision issues:

```javascript
0.1 + 0.2 // 0.30000000000000004 (not 0.3!)
```

**Always work in cents (integers):**

```javascript
// WRONG: $19.99 + $5.99
// 19.99 + 5.99 → 25.980000000000004 ❌

// RIGHT: work in cents
let item1 = 1999; // $19.99
let item2 = 599;  // $5.99
let total = item1 + item2; // 2598 cents = $25.98

// Convert back for display:
let totalDollars = total / 100;
console.log(totalDollars.toFixed(2)); // "25.98"
```

---

## Reverse Engineering: Arithmetic

| Question | Answer |
|---|---|
| What is `0.1 + 0.2`? | `0.30000000000000004` — floating-point precision issue |
| How do I avoid money errors? | Work in cents (integers), not dollars (floats) |
| How do I get a random number 1-10? | `Math.floor(Math.random() * 10) + 1` |
| What does `a++` do vs `++a`? | `a++` returns old value then increments; `++a` increments first |
| How do I round to 2 decimals? | `num.toFixed(2)` returns a string; wrap with `Number()` for a number |
## Next Steps

[Back to Chapter 6](06-hoisting-and-tdz.md): Hoisting and the Temporal Dead Zone
[Proceed to Chapter 8](08-comparison-operators.md): Comparison Operators to learn about comparison operators.
