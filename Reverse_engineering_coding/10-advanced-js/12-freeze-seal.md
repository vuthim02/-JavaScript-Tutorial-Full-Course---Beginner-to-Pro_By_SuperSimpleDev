# 12 — Object.freeze, Object.seal, Object.preventExtensions

## Object.freeze()

Completely locks an object. Cannot add, delete, or modify properties.

```javascript
const user = { name: "John", age: 30 };
Object.freeze(user);

user.name = "Jane";  // Ignored (strict mode: TypeError)
user.city = "NYC";   // Ignored
delete user.age;     // Ignored

console.log(user); // { name: "John", age: 30 }
```

Deep freeze (shallow by default):

```javascript
function deepFreeze(obj) {
    Object.freeze(obj);
    for (const key of Object.getOwnPropertyNames(obj)) {
        const val = obj[key];
        if (val && typeof val === "object" && !Object.isFrozen(val)) {
            deepFreeze(val);
        }
    }
    return obj;
}
```

---

## Object.seal()

Can modify existing properties. Cannot add or delete.

```javascript
const user = { name: "John" };
Object.seal(user);

user.name = "Jane";  // Works (modify allowed)
user.age = 30;       // Ignored (add blocked)
delete user.name;    // Ignored (delete blocked)
```

---

## Object.preventExtensions()

Only blocks new properties.

```javascript
const user = { name: "John" };
Object.preventExtensions(user);

user.age = 30;    // Ignored (add blocked)
user.name = "Jane"; // Works (modify allowed)
delete user.name;   // Works (delete allowed)
```

---

## Shallow Nature

All three methods are **shallow** — nested objects are not affected:

```javascript
const user = {
    name: "John",
    address: { city: "NYC" }
};

Object.freeze(user);

user.address.city = "LA"; // Works! Nested object is not frozen
console.log(user.address.city); // "LA"

// The reference itself is frozen though:
user.address = {}; // Ignored (property is read-only)
```

Use `deepFreeze()` (shown above) to recursively freeze nested objects.

---

## Strict Mode Behavior

In strict mode, ignored operations throw `TypeError` instead of silently failing:

```javascript
"use strict";
const user = { name: "John" };
Object.freeze(user);

user.name = "Jane"; // TypeError: Cannot assign to read-only property
```

---

## Checking the State

```javascript
Object.isFrozen(obj);           // true if frozen
Object.isSealed(obj);           // true if sealed
Object.isExtensible(obj);       // false if preventExtensions was called
```

These checks work on any object:

```javascript
const obj = { a: 1 };
console.log(Object.isExtensible(obj)); // true

Object.preventExtensions(obj);
console.log(Object.isExtensible(obj)); // false
console.log(Object.isSealed(obj));     // false (properties can still be deleted)

Object.seal(obj);
console.log(Object.isSealed(obj));     // true
console.log(Object.isFrozen(obj));     // false (properties can still be modified)

Object.freeze(obj);
console.log(Object.isFrozen(obj));     // true
```

---

## Comparison

| Method | Add properties | Delete properties | Modify properties | Reconfigure descriptors |
|--------|---------------|------------------|------------------|------------------------|
| `freeze()` | No | No | No | No |
| `seal()` | No | No | Yes | No |
| `preventExtensions()` | No | Yes | Yes | Yes (if configurable) |

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is object frozen? | `Object.isFrozen(obj)` returns true. |
| Is object sealed? | `Object.isSealed(obj)` returns true (but not frozen). |
| Can this object be extended? | `Object.isExtensible(obj)` returns false if preventExtensions/seal/freeze was called. |
| Why can't I add a property? | The object is sealed, frozen, or had `preventExtensions` called. |
## Next Steps

[Back to Module 6 Chapter 2](../06-prototypes-classes/02-property-descriptors.md): Property Descriptors, Freeze & Seal
[Proceed to Module 2 Chapter 9](../02-core-concepts/09-optional-chaining-nullish-coalescing.md): Optional Chaining (?.) and Nullish Coalescing (??) to learn about optional chaining and nullish coalescing.
