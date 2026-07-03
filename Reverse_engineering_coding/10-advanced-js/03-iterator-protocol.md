# 03 — Iterator Protocol

## What is an Iterator?

An object that provides sequential access to values. It contains a `next()` method that returns:

```javascript
{
    value: <any>,
    done: <boolean>
}
```

---

## The Protocol

```javascript
// An object is iterable if it has Symbol.iterator
// Symbol.iterator is a function that returns an iterator
// The iterator has next() → { value, done }
```

---

## Example: Array Iterator

```javascript
let arr = [10, 20, 30];

let iterator = arr[Symbol.iterator]();
```

First call: `iterator.next()` → `{ value: 10, done: false }`

Second: `iterator.next()` → `{ value: 20, done: false }`

Third: `iterator.next()` → `{ value: 30, done: false }`

Fourth (exhausted): `iterator.next()` → `{ value: undefined, done: true }`

---

## Memory Diagram

```
Array [10, 20, 30]
 │
 └── [Symbol.iterator] → function (creates iterator)
                           │
                           ▼
                        Iterator Object
                         │
                         └── next() → { value: 10, done: false }
                                      { value: 20, done: false }
                                      { value: 30, done: false }
                                      { value: undefined, done: true }
```

---

## Iterable vs Iterator

```
Iterable: an object with [Symbol.iterator] method
  └── [Symbol.iterator]() → returns an Iterator

Iterator: an object with next() method
  └── next() → { value: any, done: boolean }
```

An iterable can create multiple independent iterators. Each call to `[Symbol.iterator]()` returns a fresh iterator with its own internal state.

---

## Checking if Something is Iterable

```javascript
function isIterable(obj) {
    return obj != null && typeof obj[Symbol.iterator] === "function";
}

console.log(isIterable([1, 2, 3]));     // true
console.log(isIterable("hello"));       // true
console.log(isIterable(new Map()));     // true
console.log(isIterable(new Set()));     // true
console.log(isIterable({}));            // false
console.log(isIterable(null));          // false
```

---

## Built-in Iterables

```javascript
// Arrays
[1, 2, 3][Symbol.iterator]();

// Strings
"Hello"[Symbol.iterator]();

// Maps
new Map()[Symbol.iterator]();

// Sets
new Set()[Symbol.iterator]();

// NodeList
document.querySelectorAll("div")[Symbol.iterator]();

// arguments (legacy)
function() { arguments[Symbol.iterator](); }
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How does for...of work internally? | It calls `Symbol.iterator`, gets an iterator, and repeatedly calls `next()` until `done: true`. |
| Is this object iterable? | Check if it has `[Symbol.iterator]` property and it's a function. |
| What happens if I call next() after iteration ends? | Returns `{ done: true }` indefinitely. |
| Can an object be both iterable and an iterator? | Yes. Example: a generator is both (it has `[Symbol.iterator]` that returns itself, and `next()`). |
| Are plain objects iterable? | No. They don't have `[Symbol.iterator]` by default. |
| What types are iterable in JavaScript? | Array, String, Map, Set, NodeList, TypedArray, arguments, generators. |
## Next Steps

[Back to Chapter 2](02-well-known-global-symbols.md): 02 — Well-Known Symbols & Global Symbols
[Proceed to Chapter 4](04-for-of-manual.md): 04 — Manual Iterator Usage & for...of Internals to learn about 04 — manual iterator usage & for...of internals.
