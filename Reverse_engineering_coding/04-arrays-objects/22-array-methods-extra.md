# Extra Array Methods: `forEach`, `flat`, `flatMap`, `at`

## `forEach()` — Execute for Each Element

### Syntax

```javascript
arr.forEach(callback(currentValue, index, array))
```

### Behavior

Executes a callback for every element. **Mutates** the original array (if callback mutates it). Returns `undefined`. Non-chainable.

```javascript
const nums = [1, 2, 3];
let sum = 0;

nums.forEach(n => { sum += n; });
console.log(sum); // 6

// With index
nums.forEach((n, i) => {
    console.log(`Index ${i}: ${n}`);
});
// Index 0: 1
// Index 1: 2
// Index 2: 3
```

### `forEach` vs `map`

| Aspect        | `forEach()`                      | `map()`                           |
|---------------|----------------------------------|-----------------------------------|
| Return value  | `undefined`                      | New array                         |
| Purpose       | Side effects (logging, mutations)| Transform each element            |
| Chainable     | No                               | Yes                               |
| Use case      | "Do something with each element" | "Create a new transformed array"  |

### Internal Implementation

```javascript
function forEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i, arr);
    }
}
```

### Cannot Break Out Early

```javascript
// ❌ forEach cannot break or return early
[1, 2, 3, 4, 5].forEach(n => {
    if (n > 3) return; // just skips this callback, doesn't stop
    console.log(n);    // still logs 1, 2, 3
});

// ✅ Use for...of or some() to break early
for (const n of [1, 2, 3, 4, 5]) {
    if (n > 3) break;
    console.log(n); // 1, 2, 3
}
```

---

## `flat()` — Flatten Nested Arrays

### Syntax

```javascript
arr.flat(depth) // depth defaults to 1
```

### Behavior

Creates a **new array** with sub-array elements concatenated up to the specified depth. **Non-destructive**.

```javascript
const nested = [1, [2, [3, [4]]]];

nested.flat();       // [1, 2, [3, [4]]] — 1 level
nested.flat(2);      // [1, 2, 3, [4]]   — 2 levels
nested.flat(Infinity); // [1, 2, 3, 4]   — fully flat

// Empty slots are removed
const sparse = [1, , 2, [3, , 4]];
sparse.flat(); // [1, 2, 3, 4]
```

### Internal Implementation

```javascript
function flat(arr, depth = 1) {
    const result = [];
    for (const item of arr) {
        if (Array.isArray(item) && depth > 0) {
            result.push(...flat(item, depth - 1));
        } else {
            result.push(item);
        }
    }
    return result;
}
```

---

## `flatMap()` — Map Then Flatten

### Syntax

```javascript
arr.flatMap(callback(currentValue, index, array))
```

### Behavior

Equivalent to `arr.map(callback).flat(1)` but more efficient — only one intermediate array is created.

```javascript
const sentences = ["hello world", "foo bar baz"];

// map + flat (creates 2 arrays)
sentences.map(s => s.split(" ")).flat();
// ["hello", "world", "foo", "bar", "baz"]

// flatMap (creates 1 array — more efficient)
sentences.flatMap(s => s.split(" "));
// ["hello", "world", "foo", "bar", "baz"]
```

### Common Use Cases

```javascript
// Double each element and flatten
[1, 2, 3].flatMap(n => [n, n * 2]);
// [1, 2, 2, 4, 3, 6]

// Filter and map in one pass
[1, 2, 3, 4, 5, 6].flatMap(n =>
    n % 2 === 0 ? [] : [n * 10]
);
// [10, 30, 50]  — odd numbers multiplied by 10

// Handle null/undefined by returning empty array
const data = [{ id: 1 }, null, { id: 2 }, undefined];
data.flatMap(d => d ? [d.id] : []);
// [1, 2]
```

---

## `at()` — Relative Indexing (ES2022)

### Syntax

```javascript
arr.at(index) // supports negative indices
```

### Behavior

Returns the element at the given index. With negative numbers, counts from the end. **Non-destructive**.

```javascript
const nums = [10, 20, 30, 40, 50];

nums.at(0);    // 10
nums.at(2);    // 30
nums.at(-1);   // 50  — last element
nums.at(-2);   // 40  — second to last
nums.at(100);  // undefined — out of bounds (no error)
nums.at(-100); // undefined
```

### `at()` vs Bracket Notation

| Aspect          | `arr[i]`           | `arr.at(i)`          |
|-----------------|--------------------|----------------------|
| Positive index  | `arr[2]` → 30      | `arr.at(2)` → 30     |
| Negative index  | `arr[-1]` → undefined | `arr.at(-1)` → 50  |
| Out of bounds   | `undefined`        | `undefined`          |
| Method call     | No (operator)      | Yes (function call)  |
| Use case        | General access     | Getting last / nth from end |

---

## Reverse Engineering Questions

### For `forEach()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is the original modified?             | Depends on callback — forEach doesn't inherently mutate |
| What is the return value?             | `undefined` — not chainable                         |
| Can you break out of forEach?         | No — use `for...of`, `some()`, or `every()`         |
| When to use forEach?                  | For side effects (logging, DOM updates, mutations)  |
| When NOT to use forEach?              | When building a new array (use map/filter/reduce)   |
| What parameters does callback get?    | `value`, `index`, `array`                           |

### For `flat()` and `flatMap()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does `flat()` mutate the original?    | No — returns a new array                            |
| What does `flat()` remove?            | Empty slots in addition to flattening               |
| What depth to fully flatten?          | `Infinity`                                          |
| What is `flatMap()` shorthand for?    | `arr.map(fn).flat(1)` — but more efficient          |
| When to prefer `flatMap()` over `map()` + `flat()`? | Always — it creates one array instead of two |
| Can `flatMap()` filter?               | Yes — return `[]` to exclude, `[value]` to include  |

### For `at()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| How to get the last element?          | `arr.at(-1)`                                        |
| How to get the second to last?        | `arr.at(-2)`                                        |
| Does `at()` mutate the array?         | No — non-destructive                                |
| What if index is out of bounds?       | Returns `undefined`                                 |
| When was `at()` added?                | ES2022                                              |
## Next Steps

[Back to Chapter 21](21-projects-part2.md): Projects 4-5
[Proceed to Chapter 23](23-es2023-immutable-methods.md): ES2023 Immutable Array Methods to learn about es2023 immutable array methods.
