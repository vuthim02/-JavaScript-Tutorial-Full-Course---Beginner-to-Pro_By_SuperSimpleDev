# 04 — Manual Iterator Usage & for...of Internals

## Walking Through an Iterator

```javascript
let arr = [10, 20, 30];

let iterator = arr[Symbol.iterator]();

let result;

while (!(result = iterator.next()).done) {
    console.log(result.value); // 10, 20, 30
}
```

---

## Spread Operator Uses Iteration

```javascript
// Spread calls Symbol.iterator internally
const arr = [1, 2, 3];
const copy = [...arr]; // Creates new array via iteration

const str = "Hi";
const chars = [...str]; // ['H', 'i']
```

---

## Array.from Uses Iteration

```javascript
const set = new Set([1, 2, 3]);
const arr = Array.from(set); // [1, 2, 3] – uses iteration

// Also accepts a map function
const doubled = Array.from(set, x => x * 2); // [2, 4, 6]
```

---

## Destructuring Uses Iteration

```javascript
const [a, b] = [10, 20]; // Works because arrays are iterable

const [x, y] = "Hi";     // Strings are iterable too
console.log(x, y);        // "H" "i"
```

---

## for...of Internals

Code:

```javascript
for (let x of arr) {
    console.log(x);
}
```

Internally:

```javascript
let iterator = arr[Symbol.iterator]();

while (true) {
    let result = iterator.next();

    if (result.done)
        break;

    console.log(result.value);
}
```

---

## for...of with Break

```javascript
for (let x of arr) {
    if (x > 15) break;
    console.log(x);
}
```

Internally calls `return()` on the iterator if it exists (for cleanup in generators).

---

## for...of over Non-Iterables

```javascript
const obj = { name: "John" };

for (let x of obj) {
    // TypeError: obj is not iterable
}
```

Fix: make it iterable (add `Symbol.iterator`).

---

## for...of vs for...in

| Feature | `for...of` | `for...in` |
|---------|------------|------------|
| Iterates over | Values | Keys (property names) |
| Works on | Iterables (Array, Map, Set, String) | Objects (any enumerable properties) |
| Includes prototype properties | No | Yes |
| Use with | Arrays, iterables | Plain objects, debugging |

```javascript
const arr = ["a", "b", "c"];

for (let x of arr) console.log(x); // "a", "b", "c" (values)
for (let x in arr) console.log(x); // "0", "1", "2" (indices)
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What triggers iteration? | `for...of`, spread (`...`), `Array.from()`, destructuring, `Promise.all()` (for iterables). |
| Can I manually iterate? | Yes. Get the iterator, call `next()` in a loop until `done`. |
| What if an object is not iterable? | `for...of` throws `TypeError`. Add `Symbol.iterator` to make it iterable. |
| Which iterator supplies values? | The object's `[Symbol.iterator]()` function. |
| Does `for...of` work on plain objects? | No. Plain objects are not iterable by default. |
| Can I break out of `for...of`? | Yes. `break`, `return`, or `throw` all work. |
| Does `for...of` handle the iterator cleanup? | Yes. It calls `iterator.return()` if the loop exits early. |
## Next Steps

[Back to Chapter 3](03-iterator-protocol.md): 03 — Iterator Protocol
[Proceed to Chapter 5](05-custom-iterators.md): 05 — Custom Iterators to learn about 05 — custom iterators.
