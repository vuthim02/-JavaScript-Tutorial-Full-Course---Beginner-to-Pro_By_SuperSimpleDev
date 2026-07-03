# `sort()` — Ordering Elements

## Syntax

```javascript
arr.sort(compareFunction) // returns the same array (mutated)
```

## Default Behavior

`sort()` converts elements to **strings** and sorts lexicographically (dictionary order). **Mutates** the original array. Returns the same array reference.

```javascript
const nums = [100, 2, 50, 20, 10];

nums.sort();
console.log(nums); // [10, 100, 20, 2, 50] — lexicographic, WRONG for numbers!
```

**Why?** String comparison: `"100" < "2"` because `"1" < "2"` lexicographically.

## Custom Compare Function

```javascript
arr.sort((a, b) => a - b);   // ascending (numeric)
arr.sort((a, b) => b - a);   // descending (numeric)
```

**How the compare function works:**

| Compare result | Meaning                     |
|----------------|-----------------------------|
| `a - b < 0`    | `a` should come before `b`  |
| `a - b === 0`  | Order unchanged             |
| `a - b > 0`    | `b` should come before `a`  |

## Examples

### Numbers

```javascript
const nums = [100, 2, 50, 20, 10];

// Ascending
nums.sort((a, b) => a - b);
// [2, 10, 20, 50, 100]

// Descending
nums.sort((a, b) => b - a);
// [100, 50, 20, 10, 2]
```

### Strings (locale-aware)

```javascript
const words = ["réservé", "cliché", "café", "adieu"];
words.sort((a, b) => a.localeCompare(b, "fr"));
// ["adieu", "café", "cliché", "réservé"]
```

### Objects by property

```javascript
const users = [
    { name: "Charlie", age: 35 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];

// By age
users.sort((a, b) => a.age - b.age);

// By name (alphabetically)
users.sort((a, b) => a.name.localeCompare(b.name));
```

### Multi-criteria sort

```javascript
users.sort((a, b) => {
    if (a.age !== b.age) return a.age - b.age;
    return a.name.localeCompare(b.name);
});
```

## Sort Stability (ES2019+)

Since ES2019, `sort()` is **stable** — elements with equal sort keys retain their original relative order:

```javascript
const students = [
    { name: "Alice", grade: "B" },
    { name: "Bob", grade: "A" },
    { name: "Charlie", grade: "B" },
    { name: "Diana", grade: "A" }
];

students.sort((a, b) => a.grade.localeCompare(b.grade));
// Result: Bob(A), Diana(A), Alice(B), Charlie(B)
```

## Shuffling (Not `sort` with Random)

```javascript
// BAD — biased, not truly random
arr.sort(() => Math.random() - 0.5);

// GOOD — Fisher-Yates shuffle
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is the original modified?             | Yes — `sort()` mutates the original array.          |
| Is the sort alphabetical or numeric?  | Default: alphabetical (string-based). Numeric: provide a compare function. |
| What does the compare function return?| Negative, zero, or positive — controls sort order.  |
| Is the sort stable?                   | Yes (ES2019+) — equal elements keep relative order. |
| How to sort descending?               | `arr.sort((a, b) => b - a)` for numbers.            |
| How to sort objects?                  | Provide a compare function that accesses the relevant property. |
| Return value?                         | The same array reference (mutated in place).        |
## Next Steps

[Back to Chapter 10](10-array-methods-reduce.md): `reduce()` — Aggregate to Single Value
[Proceed to Chapter 12](12-objects-internals.md): Objects: Internal Structure to learn about objects: internal structure.
