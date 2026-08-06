# Chapter 11 — Type Coercion Overview

## Overview

A brief introduction to how JavaScript automatically converts values between types.

---

## What is Type Coercion?

Type coercion is JavaScript's automatic conversion of values from one type to another.

```javascript
'5' + 3     // "53"  (number coerced to string)
'5' - 3     // 2     (string coerced to number)
true + 1    // 2     (boolean coerced to number)
'' == false  // true  (loose equality coercion)
```

---

## Implicit vs Explicit

| Type | Example | Description |
|------|---------|-------------|
| Implicit | `'5' + 3` | JS engine converts automatically |
| Explicit | `Number('5')` | Developer controls the conversion |

---

## Quick Reference

| To Number | To String | To Boolean |
|-----------|-----------|------------|
| `Number('42')` | `String(42)` | `Boolean(1)` |
| `+'42'` | `42 + ''` | `!!42` |
| `parseInt('42')` | `42.toString()` | `Boolean('')` |

---

## Next Steps

[Back to Chapter 10](10-assignment-operators.md): Assignment Operators
[Proceed to Chapter 12](12-input-and-output.md): Input and Output
