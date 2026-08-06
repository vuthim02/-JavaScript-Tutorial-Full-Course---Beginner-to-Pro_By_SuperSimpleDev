# Chapter 6 — Type Checking and typeof

## Overview

This lesson covers how JavaScript identifies and checks data types at runtime.

---

## typeof Operator

The `typeof` operator returns a string indicating the type of the operand.

```javascript
typeof undefined;    // "undefined"
typeof true;         // "boolean"
typeof 42;           // "number"
typeof "hello";      // "string"
typeof Symbol();     // "symbol"
typeof 42n;          // "bigint"
typeof function(){}; // "function"
typeof {};           // "object"
typeof [];           // "object"
typeof null;         // "object" (historical bug)
```

---

## Common Gotchas

| Expression | Result | Why |
|-----------|--------|-----|
| `typeof undefined` | `"undefined"` | Intentional design |
| `typeof null` | `"object"` | Legacy bug from first JS engine |
| `typeof []` | `"object"` | Arrays are objects |
| `typeof NaN` | `"number"` | NaN is a numeric value |

---

## Type Checking Patterns

```javascript
// Check for array
Array.isArray([]);           // true
Array.isArray({});           // false

// Check for null
value === null;              // only reliable way

// Check for object (excluding null)
typeof value === 'object' && value !== null;
```

---

## Next Steps

[Back to Chapter 5](05-variables.md): Variables — let, const, and var
[Proceed to Chapter 7](07-arithmetic-operators.md): Arithmetic Operators
