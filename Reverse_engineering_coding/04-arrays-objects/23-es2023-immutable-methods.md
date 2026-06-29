# ES2023 Immutable Array Methods

<img src="https://media.giphy.com/media/E470LZUmy2Jiw/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## The Problem They Solve

Before ES2023, many common array operations **mutated** the original array (`sort()`, `splice()`, `reverse()`, `splice()`). To work immutably, you'd need manual workarounds:

```javascript
// Old way — mutable then copy to avoid mutation
const arr = [3, 1, 2];
const sorted = [...arr].sort((a, b) => a - b);
// arr is unchanged, sorted is [1, 2, 3]
```

ES2023 introduced **immutable alternatives** for these common operations. They never mutate the original — they always return a new array.

---

## `toSorted()` — Immutable Sort

### Syntax

```javascript
arr.toSorted(compareFunction) // returns new sorted array
```

### Behavior

Like `sort()` but **does not mutate** — returns a **new** sorted array.

```javascript
const nums = [3, 1, 4, 1, 5];
const sorted = nums.toSorted((a, b) => a - b);

console.log(sorted); // [1, 1, 3, 4, 5]
console.log(nums);   // [3, 1, 4, 1, 5] — unchanged!
```

### Without Compare Function

```javascript
const words = ["banana", "cherry", "apple"];
words.toSorted(); // ["apple", "banana", "cherry"] (lexicographic)
// original unchanged
```

---

## `toSpliced()` — Immutable Splice

### Syntax

```javascript
arr.toSpliced(start, deleteCount, ...items) // returns new array
```

### Behavior

Like `splice()` but **does not mutate** — returns a **new** array.

```javascript
const arr = [1, 2, 3, 4, 5];

// Remove elements (immutable)
const removed = arr.toSpliced(1, 2);
console.log(removed); // [1, 4, 5]
console.log(arr);     // [1, 2, 3, 4, 5] — unchanged

// Insert elements (immutable)
const inserted = arr.toSpliced(2, 0, "a", "b");
console.log(inserted); // [1, 2, "a", "b", 3, 4, 5]

// Replace elements (immutable)
const replaced = arr.toSpliced(1, 2, "x", "y");
console.log(replaced); // [1, "x", "y", 4, 5]
```

---

## `toReversed()` — Immutable Reverse

### Syntax

```javascript
arr.toReversed() // returns new reversed array
```

### Behavior

Like `reverse()` but **does not mutate** — returns a **new** reversed array.

```javascript
const arr = [1, 2, 3, 4, 5];
const reversed = arr.toReversed();

console.log(reversed); // [5, 4, 3, 2, 1]
console.log(arr);      // [1, 2, 3, 4, 5] — unchanged
```

---

## `with()` — Immutable Element Update

### Syntax

```javascript
arr.with(index, value) // returns new array with element at index replaced
```

### Behavior

Returns a new array where the element at the given index is replaced with the given value. **Non-destructive**.

```javascript
const arr = [10, 20, 30, 40, 50];
const updated = arr.with(2, 99);

console.log(updated); // [10, 20, 99, 40, 50]
console.log(arr);     // [10, 20, 30, 40, 50] — unchanged

// Negative index — works like at()
const lastUpdated = arr.with(-1, 999);
console.log(lastUpdated); // [10, 20, 30, 40, 999]
```

### Immutable Update Pattern Before `with()`

```javascript
// Before ES2023 — required map or spread
const oldArr = [10, 20, 30, 40, 50];

// With map
const updated1 = oldArr.map((n, i) => i === 2 ? 99 : n);

// With spread + slice
const updated2 = [...oldArr.slice(0, 2), 99, ...oldArr.slice(3)];

// With (ES2023) — cleanest
const updated3 = oldArr.with(2, 99);
```

---

## Comparison Table

| Mutable Method | Immutable Alternative | Description                  |
|----------------|----------------------|------------------------------|
| `sort()`       | `toSorted()`         | Sort elements                |
| `splice()`     | `toSpliced()`        | Insert/remove/replace        |
| `reverse()`    | `toReversed()`       | Reverse order                |
| `arr[i] = v`   | `arr.with(i, v)`     | Update element at index      |

---

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Do these mutate the original?         | No — all return new arrays                          |
| What ES version added these?          | ES2023                                              |
| What is `toSorted()` equivalent to?   | `[...arr].sort(fn)` but cleaner                     |
| What is `toSpliced()` equivalent to?  | Manual spread/slice patterns                        |
| What is `toReversed()` equivalent to? | `[...arr].reverse()`                                |
| What is `with()` equivalent to?       | `arr.map((n,i) => i===idx ? val : n)`              |
| When to use these?                    | Immutable codebases, React state, Redux reducers    |
| Are these supported everywhere?       | Node 20+, Chrome 110+, Firefox 115+, Safari 16+     |
## Next Steps

[Back to Chapter 22](22-array-methods-extra.md): Extra Array Methods: `forEach`, `flat`, `flatMap`, `at`
[Proceed to Chapter 24](24-object-extra-methods.md): Object Extra Methods: `freeze`, `seal`, `fromEntries`, `hasOwn` to learn about object extra methods: `freeze`, `seal`, `fromentries`, `hasown`.
