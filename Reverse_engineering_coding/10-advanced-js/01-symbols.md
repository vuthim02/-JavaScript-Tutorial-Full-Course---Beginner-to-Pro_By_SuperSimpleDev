# 01 — Symbol

## What is a Symbol?

A **unique** and **immutable** primitive value, used as object property keys.

```javascript
const id = Symbol();
console.log(typeof id); // "symbol"
```

Every Symbol is unique:

```javascript
const s1 = Symbol();
const s2 = Symbol();
console.log(s1 === s2); // false – always different
```

---

## Why Symbols Exist

Normal object keys are strings:

```javascript
let user = {
    name: "John"
};
```

Keys are strings like `"name"`.

**Problem:** String keys can collide.

```javascript
// Your code
user.id = 1;

// Library code (same user object)
user.id = 999; // Conflict! Your id is overwritten
```

---

## Solution: Symbols as Property Keys

```javascript
const id = Symbol("id"); // Description is optional

let user = {
    name: "John",
    [id]: 1   // Symbol key – not a string
};
```

Access:

```javascript
user[id]      // 1 – works
user.id       // undefined – "id" string key, different from Symbol("id")
```

---

## Memory Layout

```
user (object in heap)
 │
 ├── "name" (string key) → "John"
 │
 └── Symbol(id) (symbol key) → 1
       │
       └── Only accessible if you have the Symbol reference
```

---

## Symbols are Not Enumerable

```javascript
const sym = Symbol("secret");
const obj = {
    name: "John",
    [sym]: "hidden"
};

for (let key in obj) {
    console.log(key); // "name" (symbol key skipped)
}

console.log(Object.keys(obj));          // ["name"] – symbol keys excluded
console.log(Object.getOwnPropertyNames(obj)); // ["name"] – symbol keys excluded
```

To find symbol keys:

```javascript
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(secret)]
```

---

## Symbol Descriptions

```javascript
const s1 = Symbol("user id");
const s2 = Symbol("user id");

console.log(s1.description); // "user id" – just a description, not the value
console.log(s1 === s2);      // false – descriptions don't affect uniqueness
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is property string? | Check if the key is in quotes or accessed with `.` (string). |
| Or Symbol? | Check if the key is created with `Symbol()` and accessed with bracket notation. |
| Why can't I see this property in Object.keys? | It's a Symbol key. Use `Object.getOwnPropertySymbols()`. |
| Why can't I access user.id? | The key is a Symbol, not the string "id". You need the Symbol reference. |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-well-known-global-symbols.md): 02 — Well-Known Symbols & Global Symbols to learn about 02 — well-known symbols & global symbols.
