# Chapter 8 — Truthy and Falsy Values

## Overview

Every value in JavaScript is either truthy or falsy when used in a boolean context.

---

## The 6 Falsy Values

```javascript
Boolean(false)     // false
Boolean(0)         // false
Boolean(-0)        // false
Boolean(0n)        // false (BigInt zero)
Boolean('')        // false (empty string)
Boolean(null)      // false
Boolean(undefined) // false
Boolean(NaN)       // false
```

**Every other value is truthy**, including:
- All numbers except `0` and `-0` (including negative numbers)
- All strings except `''`
- All objects and arrays (even empty ones `{}` and `[]`)
- `Infinity` and `-Infinity`

---

## Truthy/Falsy Gotchas

```javascript
// Empty arrays are TRUTHY
Boolean([]);     // true
if ([]) console.log("runs!");

// Empty objects are TRUTHY
Boolean({});     // true

// "0" is TRUTHY (non-empty string)
Boolean("0");    // true

// Boolean() vs !!
Boolean(0);      // false
!!0;             // false (same thing)
```

---

## Practical Use

```javascript
// Default values
const name = userInput || 'Anonymous';

// Better with nullish coalescing (only checks null/undefined)
const name = userInput ?? 'Anonymous';

// Conditional execution
const items = list && list.length;
```

---

## Next Steps

[Back to Chapter 7](07-type-coercion-and-conversion.md): Type Coercion and Conversion
[Proceed to Chapter 9](09-optional-chaining-nullish-coalescing.md): Optional Chaining and Nullish Coalescing
