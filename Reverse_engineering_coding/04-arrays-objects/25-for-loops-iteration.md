# Iterating Arrays and Objects: `for...of`, `for...in`, and `for`

## `for...of` — Iterate Array Values (ES2015)

### Syntax

```javascript
for (const element of iterable) {
    // element is each value
}
```

### Behavior

Iterates over **values** of any iterable (arrays, strings, Maps, Sets, generators).

```javascript
const fruits = ["apple", "banana", "cherry"];

for (const fruit of fruits) {
    console.log(fruit);
}
// apple
// banana
// cherry

// With index — use .entries()
for (const [index, fruit] of fruits.entries()) {
    console.log(`${index}: ${fruit}`);
}
// 0: apple
// 1: banana
// 2: cherry
```

### Works With Any Iterable

```javascript
// String
for (const char of "hello") {
    console.log(char); // "h", "e", "l", "l", "o"
}

// Set
for (const item of new Set([1, 2, 3, 2, 1])) {
    console.log(item); // 1, 2, 3
}

// Map
for (const [key, value] of new Map([["a", 1], ["b", 2]])) {
    console.log(key, value);
}
```

### `for...of` vs `forEach`

```javascript
// forEach — cannot break
arr.forEach(n => {
    if (n > 2) return; // just skips this callback, doesn't stop
    console.log(n);
});

// for...of — can break/continue/return
for (const n of arr) {
    if (n > 2) break;   // ✅ stops iteration
    console.log(n);
}
```

---

## `for...in` — Iterate Object Keys

### Syntax

```javascript
for (const key in object) {
    // key is each property name (string)
}
```

### Behavior

Iterates over **keys** (property names) of an object, including inherited enumerable properties.

```javascript
const user = { name: "Alice", age: 25, city: "Boston" };

for (const key in user) {
    console.log(`${key}: ${user[key]}`);
}
// name: Alice
// age: 25
// city: Boston
```

### **WARNING:** Iterates Inherited Properties

```javascript
// Inherited properties are included!
Object.prototype.customProp = "inherited";
const obj = { a: 1, b: 2 };

for (const key in obj) {
    console.log(key); // "a", "b", "customProp"
}

// ✅ Filter with hasOwnProperty
for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(key); // "a", "b" only
    }
}
```

### **WARNING:** Don't Use `for...in` on Arrays

```javascript
const arr = [10, 20, 30];

for (const index in arr) {
    console.log(index, arr[index]);
    // "0" 10, "1" 20, "2" 30
}

// ⚠️ Problems:
// 1. Keys are strings ("0", "1", "2"), not numbers
// 2. Iterates ALL enumerable properties, not just indices
// 3. Slower than for...of or for loops

// ✅ Always use for...of for arrays
for (const value of arr) {
    console.log(value); // 10, 20, 30
}
```

---

## Classic `for` Loop — Full Control

### Syntax

```javascript
for (initialization; condition; increment) {
    // body
}
```

### Behavior

Most flexible — gives full control over index, step, direction.

```javascript
const arr = [10, 20, 30, 40, 50];

// Forward
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // 10, 20, 30, 40, 50
}

// Reverse
for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]); // 50, 40, 30, 20, 10
}

// Every other element
for (let i = 0; i < arr.length; i += 2) {
    console.log(arr[i]); // 10, 30, 50
}
```

### Performance Comparison

```javascript
// Fastest for large arrays (no function call overhead)
for (let i = 0; i < arr.length; i++) { /* ... */ }

// Same speed, cached length
for (let i = 0, len = arr.length; i < len; i++) { /* ... */ }

// Readable, slightly slower (function call per iteration)
arr.forEach(n => { /* ... */ });

// Readable, breakable, good for most cases
for (const n of arr) { /* ... */ }
```

---

## Choosing the Right Loop

| Loop        | Use For                         | Values     | Can Break? | Best For                    |
|-------------|---------------------------------|------------|------------|-----------------------------|
| `for`       | Arrays (need index / control)   | Elements   | ✅         | Performance, custom stepping|
| `for...of`  | Arrays / iterables              | Values     | ✅         | Most array iteration        |
| `for...in`  | Objects (own + inherited keys)  | Keys       | ✅         | Object property enumeration |
| `forEach()` | Arrays (side effects)           | Elements   | ❌         | Logging, DOM updates        |
| `map()`     | Arrays (transform)              | Elements   | ❌         | Creating new arrays         |

---

## Reverse Engineering Questions

### For `for...of`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does it iterate values or keys?       | Values                                              |
| Can you break out of it?              | Yes — `break`, `continue`, `return` all work        |
| Does it work with objects?            | No — objects are not iterable (unless they have Symbol.iterator) |
| What types are iterable?              | Arrays, strings, Maps, Sets, generators, NodeLists  |

### For `for...in`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does it iterate values or keys?       | Keys (property names)                               |
| Does it include inherited properties? | Yes — filter with `hasOwnProperty()`                |
| Should it be used on arrays?          | No — use `for...of` or `for` for arrays             |
| What types does it work with?         | Any object (inherits from Object.prototype)         |

### General

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which loop is fastest?                | Classic `for` loop — no function call overhead      |
| Which loop is most readable?          | `for...of` for arrays, `for...in` for objects       |
| When can't I use `for...of`?          | When I need the index or custom stepping            |
| When must I use `for...in`?           | When iterating object property names                |
## Next Steps

[Back to Module 6 Chapter 8](../06-prototypes-classes/08-object-static-methods.md): Object Static Methods (`keys`, `values`, `assign`, `groupBy`)
[Proceed to Module 5](../05-functions-closures/README.md): Functions & Closures to learn about functions and closures in JavaScript.
