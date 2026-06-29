# `slice()` — Non-Destructive Extraction

<img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Syntax

```javascript
arr.slice(startIndex, endIndex) // returns new array
```

- `startIndex` — where to begin (inclusive). Default: 0. May be negative (from end).
- `endIndex` — where to end (exclusive). Default: array length. May be negative.

## Behavior

Returns a **new array** containing a shallow copy of a portion of the original. **Does NOT mutate** the original.

```javascript
const arr = [1, 2, 3, 4, 5];

// Basic slicing
arr.slice(1, 4);     // [2, 3, 4]  (index 1 to before 4)
arr.slice(2);        // [3, 4, 5]  (from index 2 to end)
arr.slice();         // [1, 2, 3, 4, 5]  (shallow copy of entire array)

// Negative indices (from end)
arr.slice(-2);       // [4, 5]  (last 2 elements)
arr.slice(1, -1);    // [2, 3, 4]  (from index 1 to one before the end)
arr.slice(-3, -1);   // [3, 4]  (from index -3 to before -1)
```

## Memory

```text
arr → [1, 2, 3, 4, 5]

slice(1, 4):
       ↓
result → [2, 3, 4]   (new array, separate memory)
```

## Use Cases

```javascript
// Copy an array
const copy = arr.slice(); // simple shallow copy

// Convert array-like to array
const args = Array.prototype.slice.call(arguments);
// Modern alternative: Array.from(arguments)

// Get last N elements
const lastThree = scores.slice(-3);

// Remove elements without mutation (immutable alternative to splice)
const newArr = [...arr.slice(0, 1), ...arr.slice(3)]; // removes indices 1 and 2
```

---

# `splice()` — Destructive Insert/Remove

## Syntax

```javascript
arr.splice(start, deleteCount, item1, item2, ...) // returns array of removed items
```

- `start` — index to start changing. Negative allowed.
- `deleteCount` — number of elements to remove. 0 to insert without removing.
- `item1, item2, ...` — elements to insert at `start`.

## Behavior

**Mutates** the original array. Can remove, insert, or replace elements.

```javascript
// Remove Elements
const arr = [1, 2, 3, 4, 5];
const removed = arr.splice(1, 2);  // remove 2 elements starting at index 1
console.log(arr);      // [1, 4, 5]
console.log(removed);  // [2, 3]

// Insert Elements (deleteCount = 0)
const arr2 = [1, 2, 5];
arr2.splice(2, 0, 3, 4);      // insert at index 2, remove 0 elements
console.log(arr2);      // [1, 2, 3, 4, 5]

// Replace Elements
const arr3 = [1, 2, 3, 4];
arr3.splice(1, 2, "a", "b");  // remove 2 from index 1, insert "a","b"
console.log(arr3);      // [1, "a", "b", 4]

// Negative Start
const arr4 = [1, 2, 3, 4, 5];
arr4.splice(-2, 1);     // remove 1 element starting at index -2 (second from end)
console.log(arr4);      // [1, 2, 3, 5]
```

## Performance

`splice()` is O(n) for both removal (reindexing) and insertion (shifting). For very large arrays, repeated splice operations can be slow.

## Immutable Alternative to Splice

```javascript
// Remove (immutable)
const arr = [1, 2, 3, 4, 5];
const removed = arr.slice(1, 3);  // [2, 3] — removed elements
const newArr = [...arr.slice(0, 1), ...arr.slice(3)]; // [1, 4, 5]

// Insert (immutable)
const inserted = [...arr.slice(0, 2), "a", "b", ...arr.slice(2)];
```

## Reverse Engineering Questions

### For `slice()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does the original array change?       | No — `slice()` is non-destructive.                   |
| Is new memory created?                | Yes — a new array is allocated.                      |
| Are nested objects shared?            | Yes — shallow copy. Nested objects/arrays still share references. |
| What does `arr.slice()` without args do? | Shallow copy of the entire array.               |
| What is the return value?             | A new array containing the sliced elements.         |
| What happens if start > end?          | Returns empty array `[]`.                            |

### For `splice()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is the original array modified?       | Yes — `splice()` is destructive.                    |
| Which indexes disappear?              | Those in the range `[start, start + deleteCount)`.  |
| What is returned?                     | An array of the removed elements.                    |
| What does `splice(2, 0, "x")` do?    | Inserts "x" at index 2 without removing anything.   |
| Can I insert and remove simultaneously? | Yes — deleteCount controls removal, subsequent args are insertion. |
| What is the time complexity?          | O(n) — elements may need reindexing.                |
## Next Steps

[Back to Chapter 3](03-array-methods-shift-unshift.md): `shift()` — Remove from Beginning
[Proceed to Chapter 5](05-array-methods-search.md): `indexOf()` — Find First Occurrence to learn about `indexof()` — find first occurrence.
