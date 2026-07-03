# Data Types and the typeof Operator

## The 7 Data Types

JavaScript has 7 primitive types and 1 reference type (object):

| Type | Example | typeof Result | Mutability |
|------|---------|---------------|------------|
| **number** | `42`, `3.14`, `Infinity`, `NaN` | `"number"` | Immutable |
| **string** | `"hello"`, `'world'`, `` `hi` `` | `"string"` | Immutable |
| **boolean** | `true`, `false` | `"boolean"` | Immutable |
| **undefined** | `undefined` | `"undefined"` | Immutable |
| **null** | `null` | `"object"` (bug!) | Immutable |
| **symbol** | `Symbol("id")` | `"symbol"` | Immutable |
| **bigint** | `42n`, `BigInt(42)` | `"bigint"` | Immutable |
| **object** | `{}`, `[]`, `function() {}` | `"object"` or `"function"` | Mutable |

## The typeof Operator

```javascript
typeof 42;             // "number"
typeof "hello";        // "string"
typeof true;           // "boolean"
typeof undefined;      // "undefined"
typeof null;           // "object"  ← famous JavaScript bug!
typeof Symbol("id");   // "symbol"
typeof 42n;            // "bigint"
typeof {};             // "object"
typeof [];             // "object"
typeof function() {};  // "function"
```

### The typeof null Bug

```javascript
typeof null === "object";  // true — this is a bug from JS's first version
// To properly check for null:
value === null             // use strict equality
```

### Checking Array vs Object

```javascript
typeof [];               // "object" — not helpful!
Array.isArray([]);       // true     — correct check
Array.isArray({});       // false

// instanceof also works:
[] instanceof Array;     // true
{} instanceof Array;     // false
```

## undefined vs null

| Feature | undefined | null |
|---------|-----------|------|
| Meaning | Variable not assigned | Intentional "no value" |
| Type | `"undefined"` | `"object"` (bug) |
| How it appears | Default uninitialized | Assigned by developer |
| JSON serialization | Omitted from JSON | Included as `null` |
| Common use | Unset variables, missing return | Intentional empty value |

```javascript
let a;
console.log(a);          // undefined

let b = null;
console.log(b);          // null

console.log(undefined == null);  // true  (loose equality)
console.log(undefined === null); // false (strict equality)
```

## NaN — Not a Number

NaN is the only value not equal to itself:

```javascript
typeof NaN;              // "number" (confusingly!)
NaN === NaN;             // false — the only value with this property
NaN !== NaN;             // true

// Correct NaN checks:
isNaN(NaN);              // true
Number.isNaN(NaN);       // true (preferred — doesn't coerce)

Number.isNaN("hello");   // false
isNaN("hello");          // true — coerces "hello" to NaN first
```

## Primitives Are Immutable

Primitives cannot be changed. Operations return new values:

```javascript
let str = "hello";
str.toUpperCase();       // "HELLO"
console.log(str);        // "hello" — original unchanged

// Objects ARE mutable:
let arr = [1, 2, 3];
arr.push(4);
console.log(arr);        // [1, 2, 3, 4] — original changed
```

## Reverse Engineering Q&A

| Question | Answer |
|----------|--------|
| What type is this value? | Use `typeof` for primitives, `Array.isArray()` for arrays, `=== null` for null |
| Is this value truthy or falsy? | Only `false`, `0`, `""`, `null`, `undefined`, `NaN` are falsy |
| Is this a primitive or object? | Primitives: number, string, boolean, null, undefined, symbol, bigint. Everything else is object. |
| Could this be NaN? | NaN is the only value that is not `===` to itself — use `Number.isNaN()` |
| Is this null or undefined? | `=== null` vs `=== undefined` — or `== null` to check both |
| What is the typeof result? | Always a string. Remember: `typeof null` returns `"object"` (bug) |
| Is the variable actually declared? | `typeof notDeclared` returns `"undefined"` without throwing an error |
## Next Steps

[Back to Chapter 5](05-value-vs-reference-mutation.md): Value vs Reference and Mutation
[Proceed to Chapter 7](07-type-coercion-and-conversion.md): Type Coercion and Explicit Conversion to learn about type coercion and explicit conversion.
