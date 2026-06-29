# Objects: Internal Structure

<img src="https://media.giphy.com/media/3oEjI9xj49ehuAGLQY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Is an Object?

An **object** is a collection of key-value pairs (properties in ECMAScript terminology). Keys are strings or Symbols. Values can be any type.

```javascript
const user = {
    name: "John",
    age: 25,
    "computed-key": true,      // quotes needed for non-identifier keys
    [Symbol("id")]: 12345       // Symbol key
};
```

## Memory Diagram

```text
Variable: user (stack)
              │
              ▼
┌─────────────────────────────────────────┐
│ Object (heap)                           │
│ ┌─────────────────────────────────┐     │
│ │ Property Store (hash map / dict)│     │
│ │ "name"         → "John"         │     │
│ │ "age"          → 25             │     │
│ │ "computed-key" → true           │     │
│ │ Symbol(id)     → 12345          │     │
│ │ __proto__      → Object.prototype│     │
│ └─────────────────────────────────┘     │
└─────────────────────────────────────────┘
```

JavaScript engines optimize objects internally. V8 uses "shapes" (hidden classes) to optimize property access — objects with the same property structure share shapes for fast property lookup.

## Property Access

```javascript
// Dot notation — static key, must be valid identifier
user.name;    // "John"

// Bracket notation — dynamic key, any string
user["name"]; // "John"
const key = "age";
user[key];    // 25

// Non-existent property
user.phone;   // undefined — no error, just undefined
```

## Property Access Performance

```javascript
const obj = { a: 1, b: 2 };
// Accessing obj.a is O(1) — direct lookup via shape
// Deleting and adding properties dynamically causes shape transitions (slower)
```

---

# `Object.keys()`, `Object.values()`, `Object.entries()`

## `Object.keys()`

Returns an **array** of the object's own enumerable property names (keys).

```javascript
const user = { name: "John", age: 25, city: "Boston" };
const keys = Object.keys(user);
console.log(keys); // ["name", "age", "city"]
```

## `Object.values()`

Returns an **array** of the object's own enumerable property **values**.

```javascript
const values = Object.values(user);
console.log(values); // ["John", 25, "Boston"]
```

## `Object.entries()`

Returns an **array** of `[key, value]` pairs.

```javascript
const entries = Object.entries(user);
console.log(entries);
// [["name", "John"], ["age", 25], ["city", "Boston"]]
```

## Common Use Cases

```javascript
// Iterating an object
for (const [key, value] of Object.entries(user)) {
    console.log(key, value);
}

// Transform object values
const prices = { apple: 1.5, banana: 0.8, cherry: 2.0 };
const doubled = Object.fromEntries(
    Object.entries(prices).map(([item, price]) => [item, price * 2])
);
// { apple: 3.0, banana: 1.6, cherry: 4.0 }

// Filter object properties
const scores = { Alice: 90, Bob: 55, Charlie: 72, Diana: 40 };
const passing = Object.fromEntries(
    Object.entries(scores).filter(([, score]) => score >= 60)
);
// { Alice: 90, Charlie: 72 }

// Count object size
Object.keys(obj).length;  // number of own enumerable properties
```

## Reverse Engineering Questions

### For objects

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Why an object instead of an array?    | Named keys for semantic access; order irrelevant (for most use cases). |
| Why not an array?                     | Arrays are for ordered, numeric-indexed collections. |
| What keys does this object have?      | Read property names — they describe the data structure. |
| What are the value types?             | Strings, numbers, nested objects, functions, etc.   |
| Is the shape known or dynamic?        | Objects added/deleted properties dynamically are slower. |
| Are there Symbol keys?                | Not visible via `Object.keys()` — use `Object.getOwnPropertySymbols()`. |

### For Object.keys/values/entries

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What does `Object.keys()` return?     | Array of property names (strings).                  |
| What does `Object.values()` return?   | Array of property values (any types).               |
| What does `Object.entries()` return?  | Array of [key, value] pairs.                        |
| Are these methods destructive?        | No — they return arrays, do not modify the object.  |
| Do they include inherited properties? | No — own enumerable properties only.                |
| Do they include Symbol keys?          | No — use `Object.getOwnPropertySymbols()`.          |
| Do they include non-enumerable properties? | No — only enumerable.                         |
## Next Steps

[Back to Chapter 11](11-array-methods-sort.md): `sort()` — Ordering Elements
[Proceed to Chapter 13](13-destructuring.md): Destructuring to learn about destructuring.
