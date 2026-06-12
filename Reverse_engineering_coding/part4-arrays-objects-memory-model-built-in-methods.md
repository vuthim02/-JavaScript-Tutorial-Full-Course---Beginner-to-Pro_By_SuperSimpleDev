# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

## Part 4 — Arrays, Objects, Memory Model, Built-in Methods, and Reverse Engineering

---

# Mission

This section is one of the most important in JavaScript.

Almost everything in modern JavaScript depends on:

- Arrays
- Objects
- References
- Built-in methods
- Immutability
- Memory model

Frameworks like:

- React
- Vue.js
- Angular
- Node.js

all heavily rely on these concepts.

---

# Chapter 1 — Arrays: Internal Memory Structure

## What Is an Array?

An **array** is an ordered, integer-indexed collection of values. Under the hood, arrays are **objects** with special behavior.

```javascript
let numbers = [10, 20, 30];
```

## Memory Diagram

```text
Variable: numbers (stack)
              │
              ▼
┌──────────────────────────────────────┐
│ Array Object (heap)                  │
│ ┌─────┬─────┬─────┬─────┬──────┐    │
│ │ "0" │ "1" │ "2" │ "3" │ ...  │    │
│ ├─────┼─────┼─────┼─────┼──────┤    │
│ │ 10  │ 20  │ 30  │     │      │    │
│ └─────┴─────┴─────┴─────┴──────┘    │
│ length: 3                            │
│ __proto__: Array.prototype           │
└──────────────────────────────────────┘
```

**Key insight:** Array indices are actually **string property keys** (`"0"`, `"1"`, `"2"`). JavaScript engines optimize this internally (V8 uses "elements" store for numeric keys), but conceptually, arrays are objects.

## Accessing Elements

```javascript
numbers[0]   // 10  — bracket notation converts 0 to "0"
numbers[1]   // 20
numbers[2]   // 30
numbers[100] // undefined — no error, just undefined
```

## Modifying Elements

```javascript
numbers[1] = 50;
// numbers → [10, 50, 30]
```

## Array Creation — Multiple Ways

```javascript
// Literal (preferred — fastest, clearest)
const arr1 = [1, 2, 3];

// Array constructor — tricky with single argument
const arr2 = new Array(3);        // [empty × 3] — length 3, no elements
const arr3 = new Array(1, 2, 3);  // [1, 2, 3]

// Array.of — avoids the single-number constructor trap
const arr4 = Array.of(3);         // [3]

// Array.from — from iterables or array-like
const arr5 = Array.from("hello");        // ["h", "e", "l", "l", "o"]
const arr6 = Array.from({ length: 3 });  // [undefined, undefined, undefined]
const arr7 = Array.from({ length: 3 }, (_, i) => i * 10); // [0, 10, 20]

// Spread
const arr8 = [...[1, 2], 3, 4];          // [1, 2, 3, 4]
```

## Sparse Arrays

```javascript
const sparse = [];
sparse[0] = "a";
sparse[100] = "b";
console.log(sparse.length); // 101
console.log(sparse[1]);     // undefined
console.log(sparse[50]);    // undefined
```

**Memory:** Sparse arrays with large gaps are stored as "dictionary mode" (hash table) internally, which is slower but memory-efficient for wide gaps.

## Reverse Engineering Questions

### For any array

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Why array instead of object?          | Need ordered collection with numeric indices.       |
| Does order matter?                    | Position indicates sequence, priority, or rank.     |
| Can duplicate values exist?           | Yes — arrays allow duplicates.                      |
| Which index contains what data?       | Trace by numeric index position.                    |
| Is this array dense or sparse?        | Sparse arrays have gaps — check for missing indices. |
| What is the length?                   | `arr.length` — may be larger than element count if sparse. |
| Is the array homogeneous?             | All same type? Or mixed (valid but unusual).        |
| Is the array being mutated?           | Check methods: push, pop, splice, sort — all mutate. |

---

# Chapter 2 — Array Properties and Characteristics

## The `length` Property

`length` is not simply the count of elements. It is always one greater than the highest index:

```javascript
const arr = [1, 2, 3];
console.log(arr.length); // 3

// Setting length truncates the array
arr.length = 2;
console.log(arr); // [1, 2]

// Setting length greater than actual extends it (sparse)
arr.length = 5;
console.log(arr); // [1, 2, empty × 3]

// Clearing an array by setting length to 0
arr.length = 0;
console.log(arr); // []
```

## Array Detection

```javascript
const arr = [1, 2, 3];

typeof arr;               // "object" — arrays are objects
Array.isArray(arr);       // true — the reliable check
arr instanceof Array;     // true — but may fail across different realms (iframes)

// Why Array.isArray is essential:
const iframe = document.createElement("iframe");
document.body.appendChild(iframe);
const iframeArray = iframe.contentWindow.Array;
const arr2 = new iframeArray(1, 2, 3);
arr2 instanceof Array;    // false — different global
Array.isArray(arr2);      // true — works across realms
```

## Array-Like Objects

Some objects look like arrays but aren't:

```javascript
// The arguments object
function test() {
    console.log(Array.isArray(arguments)); // false
    console.log(arguments.length);         // 3
    console.log(arguments[0]);             // "a"
}
test("a", "b", "c");

// NodeList (DOM)
const divs = document.querySelectorAll("div");
Array.isArray(divs); // false

// Convert array-like to array:
const args = Array.from(arguments);
const divsArr = [...divs];
```

## Array as Stack / Queue

```javascript
// Stack (LIFO) — push/pop
const stack = [];
stack.push(1);        // [1]
stack.push(2);        // [1, 2]
stack.pop();          // returns 2, stack→[1]

// Queue (FIFO) — push/shift
const queue = [];
queue.push(1);        // [1]
queue.push(2);        // [1, 2]
queue.shift();        // returns 1, queue→[2]
```

---

# Chapter 3 — `push()` — Add to End

## Syntax

```javascript
arr.push(element1, element2, ...) // returns new length
```

## Behavior

Adds one or more elements to the **end** of the array. **Mutates** the original array.

```javascript
const nums = [1, 2];
const newLength = nums.push(3, 4);

console.log(nums);       // [1, 2, 3, 4]
console.log(newLength);  // 4

// Push one element (most common)
nums.push(5);
```

## Memory

```text
Before push:
nums → [1, 2]

After nums.push(3):
nums → [1, 2, 3]    (same array object, expanded)
```

## Performance

`push()` is O(1) — constant time. Adding to the end does not require reindexing.

## Merging Arrays with `push` + Spread

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
arr1.push(...arr2);
console.log(arr1); // [1, 2, 3, 4]
```

## Reverse Engineering Questions

### For `push()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which side of the array changes?      | The end (right side).                                |
| Is the original modified?             | Yes — `push()` mutates the original array.          |
| What is the return value?             | The new length of the array.                        |
| Can I add multiple elements at once?  | Yes: `arr.push(1, 2, 3)`.                           |
| What is the time complexity?          | O(1) — constant time.                               |

---

# Chapter 4 — `pop()` — Remove from End

## Syntax

```javascript
arr.pop() // returns the removed element
```

## Behavior

Removes the **last** element from the array and returns it. **Mutates** the original array.

```javascript
const nums = [1, 2, 3];
const removed = nums.pop();

console.log(removed);  // 3
console.log(nums);     // [1, 2]
console.log(nums.length); // 2
```

## Empty Array

```javascript
const empty = [];
console.log(empty.pop()); // undefined — no element to remove
console.log(empty);       // []
```

## Performance

`pop()` is O(1) — constant time. No reindexing needed.

## Pairing `push` and `pop` (Stack)

```javascript
const stack = [];
stack.push("a");
stack.push("b");
stack.push("c");

console.log(stack.pop()); // "c"
console.log(stack.pop()); // "b"
console.log(stack.pop()); // "a"
console.log(stack.pop()); // undefined
```

## Reverse Engineering Questions

### For `pop()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which element disappears?             | The last element (highest index).                    |
| Does the array shrink?                | Yes — length decreases by 1.                         |
| Is the original modified?             | Yes — `pop()` mutates the original array.           |
| What is the return value?             | The removed element, or `undefined` if empty.        |
| What happens on an empty array?       | Returns `undefined`, array stays empty.             |
| What is the time complexity?          | O(1) — constant time.                               |

---

# Chapter 5 — `shift()` — Remove from Beginning

## Syntax

```javascript
arr.shift() // returns the removed element
```

## Behavior

Removes the **first** element and shifts all remaining elements one index left. **Mutates** the original array.

```javascript
const nums = [1, 2, 3, 4];
const removed = nums.shift();

console.log(removed);  // 1
console.log(nums);     // [2, 3, 4]
console.log(nums[0]);  // 2 — former index 1 is now index 0
```

## Performance

`shift()` is O(n) — linear time. Every element must be reindexed after removal.

```text
Before shift: [A, B, C, D]    (A at index 0, B at 1, C at 2, D at 3)
After shift:  [B, C, D]       (B moves to 0, C to 1, D to 2)
```

For large arrays, `shift()` is expensive. Use it sparingly. Consider a different data structure (linked list, or reverse the array and use `pop()`).

## Reverse Engineering Questions

### For `shift()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which side of the array changes?      | The beginning (left side).                           |
| Is the original modified?             | Yes — `shift()` mutates the original array.         |
| What happens to remaining indices?    | All shift left by one — their indices change.       |
| What is the time complexity?          | O(n) — linear. Each element is reindexed.           |
| When would I use this?                | Implementing a queue (FIFO) or processing a list from front. |

---

# Chapter 6 — `unshift()` — Add to Beginning

## Syntax

```javascript
arr.unshift(element1, element2, ...) // returns new length
```

## Behavior

Adds one or more elements to the **beginning** of the array. All existing elements are shifted right. **Mutates** the original array.

```javascript
const nums = [3, 4, 5];
const newLength = nums.unshift(1, 2);

console.log(nums);       // [1, 2, 3, 4, 5]
console.log(newLength);  // 5
```

## Performance

`unshift()` is O(n) — linear time. All existing elements must be reindexed to higher positions.

```text
Before unshift: [A, B, C]    (A at 0, B at 1, C at 2)
After unshift(1, 2): [1, 2, A, B, C]
    (A moves to 2, B to 3, C to 4)
```

## Reverse Engineering Questions

### For `unshift()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which side of the array changes?      | The beginning (left side).                           |
| Is the original modified?             | Yes — `unshift()` mutates the original array.       |
| What happens to existing elements?    | All shift right — their indices increase.           |
| What is the time complexity?          | O(n) — linear.                                      |
| Can I add multiple elements?          | Yes: `arr.unshift(1, 2, 3)`.                        |
| Return value?                         | The new length of the array.                        |

---

# Chapter 7 — `slice()` — Non-Destructive Extraction

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

### Copy an array

```javascript
const copy = arr.slice(); // simple shallow copy
```

### Convert array-like to array

```javascript
const args = Array.prototype.slice.call(arguments);
// Modern alternative: Array.from(arguments)
```

### Get last N elements

```javascript
const lastThree = scores.slice(-3);
```

### Remove elements without mutation (immutable alternative to splice)

```javascript
// Instead of: arr.splice(1, 2) — mutates
const newArr = [...arr.slice(0, 1), ...arr.slice(3)]; // removes indices 1 and 2
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

---

# Chapter 8 — `splice()` — Destructive Insert/Remove

## Syntax

```javascript
arr.splice(start, deleteCount, item1, item2, ...) // returns array of removed items
```

- `start` — index to start changing. Negative allowed.
- `deleteCount` — number of elements to remove. 0 to insert without removing.
- `item1, item2, ...` — elements to insert at `start`.

## Behavior

**Mutates** the original array. Can remove, insert, or replace elements.

### Remove Elements

```javascript
const arr = [1, 2, 3, 4, 5];
const removed = arr.splice(1, 2);  // remove 2 elements starting at index 1

console.log(arr);      // [1, 4, 5]
console.log(removed);  // [2, 3]
```

### Insert Elements (deleteCount = 0)

```javascript
const arr = [1, 2, 5];
arr.splice(2, 0, 3, 4);      // insert at index 2, remove 0 elements

console.log(arr);      // [1, 2, 3, 4, 5]
```

### Replace Elements

```javascript
const arr = [1, 2, 3, 4];
arr.splice(1, 2, "a", "b");  // remove 2 from index 1, insert "a","b"

console.log(arr);      // [1, "a", "b", 4]
```

### Negative Start

```javascript
const arr = [1, 2, 3, 4, 5];
arr.splice(-2, 1);     // remove 1 element starting at index -2 (second from end)

console.log(arr);      // [1, 2, 3, 5]
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

### For `splice()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is the original array modified?       | Yes — `splice()` is destructive.                    |
| Which indexes disappear?              | Those in the range `[start, start + deleteCount)`.  |
| What is returned?                     | An array of the removed elements.                    |
| What does `splice(2, 0, "x")` do?    | Inserts "x" at index 2 without removing anything.   |
| Can I insert and remove simultaneously? | Yes — deleteCount controls removal, subsequent args are insertion. |
| What is the time complexity?          | O(n) — elements may need reindexing.                |

---

# Chapter 9 — `indexOf()` — Find First Occurrence

## Syntax

```javascript
arr.indexOf(searchElement, fromIndex) // returns index or -1
```

- `searchElement` — value to search for (uses strict equality `===`).
- `fromIndex` — optional. Where to start searching. Negative allowed.

## Behavior

Returns the first index where `searchElement` is found, or `-1` if not found.

```javascript
const nums = [10, 20, 30, 20, 40];

nums.indexOf(20);       // 1 — first occurrence
nums.indexOf(99);       // -1 — not found

// With fromIndex
nums.indexOf(20, 2);    // 3 — start searching from index 2
nums.indexOf(20, -2);   // 3 — fromIndex = length - 2 = 3
```

## `lastIndexOf()`

```javascript
nums.lastIndexOf(20);   // 3 — last occurrence
nums.lastIndexOf(20, 2); // 1 — search backward from index 2
```

## Limitation: Cannot Find NaN

```javascript
const arr = [NaN];
arr.indexOf(NaN);        // -1  — NaN === NaN is false!
arr.includes(NaN);       // true — includes uses SameValueZero
```

## Reverse Engineering Questions

### For `indexOf()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does the value exist in the array?    | If `indexOf` returns -1, it does not.               |
| Which index contains the value?       | The first matching position.                        |
| What comparison does it use?          | Strict equality (`===`).                             |
| Can it find NaN?                      | No — use `includes()` for NaN detection.            |
| What if there are duplicates?         | Returns the first occurrence. Use `lastIndexOf()` for the last. |
| Return value for not found?           | `-1` — not `undefined` or `null`.                   |

---

# Chapter 10 — `includes()` — Existence Check

## Syntax

```javascript
arr.includes(searchElement, fromIndex) // returns boolean
```

## Behavior

Returns `true` if the array contains `searchElement`, `false` otherwise. Uses **SameValueZero** comparison (handles NaN correctly).

```javascript
const nums = [10, 20, 30];

nums.includes(20);      // true
nums.includes(99);      // false
nums.includes(10, 1);   // false — start searching from index 1

// NaN detection (unlike indexOf)
const arr = [NaN];
arr.includes(NaN);      // true
```

## `indexOf` vs `includes`

| Aspect                | `indexOf`                        | `includes`                     |
|-----------------------|----------------------------------|--------------------------------|
| Return value          | Index or -1                      | Boolean                        |
| NaN detection         | No (NaN === NaN is false)        | Yes (SameValueZero)            |
| Readability           | `if (arr.indexOf(x) !== -1)`     | `if (arr.includes(x))`         |
| When to use           | Need the position                | Only need existence            |

## Reverse Engineering Questions

### For `includes()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does the array contain this value?    | Returns boolean — true if found, false otherwise.   |
| Can it detect NaN?                    | Yes — unlike `indexOf()`.                           |
| Is the array modified?                | No — non-destructive.                               |
| What comparison does it use?          | SameValueZero (handles NaN, treats -0 and 0 as same). |

---

# Chapter 11 — `map()` — Transform Each Element

## Syntax

```javascript
const newArray = arr.map(callback(currentValue, index, array))
```

## Behavior

Creates a **new array** where each element is the result of calling the callback on each element. **Non-destructive** — original is unchanged.

```javascript
const nums = [1, 2, 3];

const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
console.log(nums);    // [1, 2, 3] — unchanged
```

## How It Works Internally

```javascript
// Conceptual implementation of map
function map(arr, callback) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(callback(arr[i], i, arr));
    }
    return result;
}
```

## Callback Parameters

```javascript
["a", "b", "c"].map((value, index, array) => {
    console.log(value, index, array);
    return value.toUpperCase();
});
// "a" 0 ["a", "b", "c"]
// "b" 1 ["a", "b", "c"]
// "c" 2 ["a", "b", "c"]
// Result: ["A", "B", "C"]
```

## Common Use Cases

### Extract properties

```javascript
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

const names = users.map(user => user.name);
// ["Alice", "Bob", "Charlie"]
```

### Transform data format

```javascript
const products = [
    { id: 1, price: 10 },
    { id: 2, price: 20 }
];

const formatted = products.map(p => ({
    ...p,
    price: `$${p.price.toFixed(2)}`
}));
// [{ id: 1, price: "$10.00" }, { id: 2, price: "$20.00" }]
```

### Render JSX (React)

```javascript
items.map(item => <li key={item.id}>{item.name}</li>);
```

### Callback with index

```javascript
["a", "b", "c"].map((char, i) => `${i + 1}. ${char}`);
// ["1. a", "2. b", "3. c"]
```

## Chaining `map()`

```javascript
[1, 2, 3]
    .map(n => n * 2)     // [2, 4, 6]
    .map(n => n + 1);    // [3, 5, 7]
```

## Reverse Engineering Questions

### For `map()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is the original array modified?       | No — `map()` is non-destructive.                     |
| Is a new array created?               | Yes — every call returns a new array.               |
| What is the length of the result?     | Same as the original array.                          |
| What happens during transformation?   | Each element is passed through the callback.        |
| What if the callback returns nothing? | The new array will contain `undefined` at that position. |
| Is `map()` always the right choice?   | Only if you need a transformed array of same length. |
| What is the time complexity?          | O(n) — linear.                                       |

---

# Chapter 12 — `filter()` — Select Matching Elements

## Syntax

```javascript
const newArray = arr.filter(callback(currentValue, index, array))
```

## Behavior

Creates a **new array** containing only elements for which the callback returns a truthy value. **Non-destructive**.

```javascript
const nums = [1, 2, 3, 4, 5];

const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
console.log(nums);  // [1, 2, 3, 4, 5] — unchanged
```

## How It Works Internally

```javascript
function filter(arr, callback) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            result.push(arr[i]);
        }
    }
    return result;
}
```

## Common Use Cases

### Remove falsy values

```javascript
const mixed = [0, "hello", false, null, 42, undefined, ""];
const truthy = mixed.filter(Boolean);
// ["hello", 42]
// Boolean as callback: Boolean(0)=false, Boolean("hello")=true, etc.
```

### Search/filter data

```javascript
const products = [
    { name: "Laptop", price: 1200, inStock: true },
    { name: "Phone", price: 800, inStock: false },
    { name: "Tablet", price: 500, inStock: true }
];

const inStock = products.filter(p => p.inStock);
const affordable = products.filter(p => p.price < 1000);
```

### Filter with index

```javascript
const everyOther = ["a", "b", "c", "d", "e"].filter((_, i) => i % 2 === 0);
// ["a", "c", "e"]
```

### Remove specific element (immutable)

```javascript
const arr = [1, 2, 3, 4, 5];
const without3 = arr.filter(n => n !== 3);
// [1, 2, 4, 5]
```

## Reverse Engineering Questions

### For `filter()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which condition keeps elements?       | Elements where callback returns truthy are kept.    |
| Which elements are removed?           | Those where callback returns falsy.                 |
| Is the original modified?             | No — non-destructive.                               |
| What is the length of the result?     | Zero or more — never more than the original.        |
| What if all elements pass?            | Returns a shallow copy of the entire array.         |
| What if no elements pass?             | Returns an empty array `[]`.                        |
| Is a new array created?               | Yes.                                                |

---

# Chapter 13 — `find()` — Get First Match

## Syntax

```javascript
arr.find(callback(currentValue, index, array)) // returns element or undefined
```

## Behavior

Returns the **value** of the **first** element for which the callback returns truthy. Returns `undefined` if no element matches. **Non-destructive**.

```javascript
const nums = [5, 10, 20, 15, 30];

const firstOver12 = nums.find(n => n > 12);
console.log(firstOver12); // 20 — first element > 12

const firstOver100 = nums.find(n => n > 100);
console.log(firstOver100); // undefined — none match
```

## `findIndex()` — Returns Index, Not Value

```javascript
const index = nums.findIndex(n => n > 12);
console.log(index); // 2 (value 20 at index 2)
// Returns -1 if not found
```

## Common Use Cases

### Find object by property

```javascript
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: "Bob" }
```

### Find and use immediately

```javascript
const product = products.find(p => p.sku === requestedSku);
if (product) {
    // use product
}
```

## `find` vs `filter`

| Aspect        | `find()`                          | `filter()`                         |
|---------------|-----------------------------------|------------------------------------|
| Return value  | Single element (or `undefined`)   | Array of all matches (may be empty)|
| Stops at      | First match (short-circuits)      | Always checks all elements         |
| Performance   | Faster if only one match needed   | Always O(n)                        |
| Use case      | "Get the one"                     | "Get all that match"               |

## Reverse Engineering Questions

### For `find()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Do we need one element or multiple?   | `find()` returns exactly one — the first match.     |
| What is returned if nothing matches?  | `undefined`.                                         |
| Does it check all elements?           | No — stops at the first matching element.           |
| Is the original modified?             | No — non-destructive.                                |

---

# Chapter 14 — `some()` — At Least One Match

## Syntax

```javascript
arr.some(callback(currentValue, index, array)) // returns boolean
```

## Behavior

Returns `true` if the callback returns truthy for **at least one** element. Returns `false` if no element matches. **Short-circuits** (stops on first match). **Non-destructive**.

```javascript
const nums = [1, 3, 8, 5, 7];

const hasEven = nums.some(n => n % 2 === 0);
console.log(hasEven); // true — 8 is even

const hasNegative = nums.some(n => n < 0);
console.log(hasNegative); // false — none negative
```

## Short-Circuit Behavior

```javascript
// The callback is only called until the first truthy result
[1, 2, 3, 4, 5].some(n => {
    console.log(n);    // 1, 2, 3 (stops at 3 because it's the first > 2)
    return n > 2;
});
```

## Use Cases

### Check permissions

```javascript
const userRoles = ["user", "editor"];
const isAdmin = userRoles.some(role => role === "admin");
```

### Validate data

```javascript
const hasInvalidField = fields.some(f => !f.isValid);
if (hasInvalidField) {
    showErrors();
}
```

### Empty array

```javascript
[].some(() => true);  // false — no elements, no match
```

## Reverse Engineering Questions

### For `some()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Need one match?                       | Yes — `some()` returns true if at least one matches.|
| Does it always iterate all elements?  | No — short-circuits on first match.                 |
| What if the array is empty?           | Returns `false` (vacuously false).                   |
| Is the original modified?             | No — non-destructive.                                |
| Return type?                          | Boolean.                                             |

---

# Chapter 15 — `every()` — All Must Match

## Syntax

```javascript
arr.every(callback(currentValue, index, array)) // returns boolean
```

## Behavior

Returns `true` if the callback returns truthy for **every** element. Returns `false` as soon as one element fails. **Short-circuits** (stops on first failure). **Non-destructive**.

```javascript
const nums = [2, 4, 6, 8, 10];

const allEven = nums.every(n => n % 2 === 0);
console.log(allEven); // true — all are even

const allPositive = nums.every(n => n > 0);
console.log(allPositive); // true

const mixed = [2, 4, 5, 8];
const allEven2 = mixed.every(n => n % 2 === 0);
console.log(allEven2); // false — 5 is not even
```

## Short-Circuit Behavior

```javascript
[1, 2, 3, 4, 5].every(n => {
    console.log(n);    // 1, 2, 3 (stops at 3 because 3 < 2 is false)
    return n < 2;
});
```

## Use Cases

### Validate all items

```javascript
const allValid = items.every(item => item.validate());
if (allValid) {
    submitForm();
}
```

### Check array properties

```javascript
const allNumbers = arr.every(item => typeof item === "number");
const allUnique = arr.every((item, i) => arr.indexOf(item) === i);
```

### Empty array

```javascript
[].every(() => false); // true — vacuously true!
```

**Key insight:** `[].every(fn)` always returns `true` because there are no elements to fail. This matches mathematical logic conventions.

## `some()` vs `every()` — Truth Table

| Condition              | `some()` | `every()` |
|------------------------|----------|-----------|
| All match              | true     | true      |
| Some match, some don't | true     | false     |
| None match             | false    | false     |
| Empty array            | false    | true      |

## Reverse Engineering Questions

### For `every()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Need all to match?                    | Yes — `every()` returns true only if all pass.       |
| Does it always iterate all elements?  | No — short-circuits on first falsy result.          |
| What if the array is empty?           | Returns `true` (vacuously true).                     |
| Is the original modified?             | No — non-destructive.                                |
| Return type?                          | Boolean.                                             |

---

# Chapter 16 — `reduce()` — Aggregate to Single Value

## Syntax

```javascript
arr.reduce(callback(accumulator, currentValue, index, array), initialValue)
```

## Behavior

Executes a callback for each element, carrying forward an **accumulator** value. Returns the final accumulator.

```javascript
const nums = [1, 2, 3, 4];

const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(sum); // 10
```

## How It Works Internally

```javascript
function reduce(arr, callback, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < arr.length; i++) {
        accumulator = callback(accumulator, arr[i], i, arr);
    }
    return accumulator;
}
```

## Step-by-Step Execution

```text
nums: [1, 2, 3, 4]
acc starts: 0

Iteration 1: acc = 0 + 1 = 1
Iteration 2: acc = 1 + 2 = 3
Iteration 3: acc = 3 + 3 = 6
Iteration 4: acc = 6 + 4 = 10

Final: 10
```

## Common Use Cases

### Sum

```javascript
[1, 2, 3, 4, 5].reduce((acc, n) => acc + n, 0); // 15
```

### Product

```javascript
[1, 2, 3, 4].reduce((acc, n) => acc * n, 1); // 24
```

### Maximum

```javascript
[3, 7, 2, 9, 5].reduce((acc, n) => n > acc ? n : acc, -Infinity); // 9
```

### Group by property

```javascript
const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 25 }
];

const groupedByAge = people.reduce((acc, person) => {
    const key = person.age;
    if (!acc[key]) acc[key] = [];
    acc[key].push(person);
    return acc;
}, {});

// { "25": [{ name: "Alice" }, { name: "Charlie" }], "30": [{ name: "Bob" }] }
```

### Building an object from pairs

```javascript
const pairs = [["name", "Alice"], ["age", 25], ["city", "Boston"]];

const obj = pairs.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
}, {});

// { name: "Alice", age: 25, city: "Boston" }
```

### Flatten array of arrays

```javascript
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, arr) => acc.concat(arr), []);
// [1, 2, 3, 4, 5, 6]
```

### Count occurrences

```javascript
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];

const counts = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});

// { apple: 3, banana: 2, orange: 1 }
```

### Without initialValue

If no `initialValue` is provided, the first element is used as the accumulator and iteration starts from the second element:

```javascript
[1, 2, 3].reduce((acc, n) => acc + n);
// Step 1: acc = 1 (first element), n = 2 → 3
// Step 2: acc = 3, n = 3 → 6
// Result: 6

// Risk: empty array without initialValue throws TypeError:
[].reduce((acc, n) => acc + n); // TypeError: Reduce of empty array with no initial value
```

**Always provide an initial value** unless you are 100% sure the array is non-empty.

## `reduceRight()`

Same as `reduce()` but processes from **right to left**:

```javascript
const arr = ["a", "b", "c"];
arr.reduce((acc, s) => acc + s, "");      // "abc"
arr.reduceRight((acc, s) => acc + s, ""); // "cba"
```

## Reverse Engineering Questions

### For `reduce()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What is the accumulator?              | The value carried forward — its type depends on the problem. |
| What value is carried forward?        | Whatever the callback returns becomes the next accumulator. |
| What is the initial value?            | The starting point before any elements are processed. |
| What does the callback return?        | The updated accumulator for the next iteration.     |
| What is the final return value?       | The accumulator after processing all elements.      |
| Is the original array modified?       | No — non-destructive.                               |
| What is `reduce()` used for?          | Aggregating, transforming arrays to single values or objects. |
| Is `reduce()` always the best choice? | For sum/max, `reduce` is clear. For complex operations, it can be hard to read — consider a loop. |

---

# Chapter 17 — `sort()` — Ordering Elements

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
// Sort by age ascending, then by name alphabetically
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

// Sort by grade — stable sort preserves insertion order within same grade
students.sort((a, b) => a.grade.localeCompare(b.grade));

// Diana and Bob (A) keep their relative order: Bob, then Diana
// Alice and Charlie (B) keep their relative order: Alice, then Charlie
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

### For `sort()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is the original modified?             | Yes — `sort()` mutates the original array.          |
| Is the sort alphabetical or numeric?  | Default: alphabetical (string-based). Numeric: provide a compare function. |
| What does the compare function return?| Negative, zero, or positive — controls sort order.  |
| Is the sort stable?                   | Yes (ES2019+) — equal elements keep relative order. |
| How to sort descending?               | `arr.sort((a, b) => b - a)` for numbers.            |
| How to sort objects?                  | Provide a compare function that accesses the relevant property. |
| Return value?                         | The same array reference (mutated in place).        |

---

# Chapter 18 — Objects: Internal Structure

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

## Property Access Performance

```javascript
const obj = { a: 1, b: 2 };
// Accessing obj.a is O(1) — direct lookup via shape
// Deleting and adding properties dynamically causes shape transitions (slower)
```

## Accessing Properties

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

---

# Chapter 19 — `Object.keys()`, `Object.values()`, `Object.entries()`

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

### Iterating an object

```javascript
// Using for...in (includes inherited enumerable)
for (const key in user) {
    if (user.hasOwnProperty(key)) {
        console.log(key, user[key]);
    }
}

// Using Object.entries (own enumerable only)
for (const [key, value] of Object.entries(user)) {
    console.log(key, value);
}

// Using forEach
Object.entries(user).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});
```

### Transform object values

```javascript
const prices = { apple: 1.5, banana: 0.8, cherry: 2.0 };

const doubled = Object.fromEntries(
    Object.entries(prices).map(([item, price]) => [item, price * 2])
);
// { apple: 3.0, banana: 1.6, cherry: 4.0 }
```

### Filter object properties

```javascript
const scores = { Alice: 90, Bob: 55, Charlie: 72, Diana: 40 };

const passing = Object.fromEntries(
    Object.entries(scores).filter(([, score]) => score >= 60)
);
// { Alice: 90, Charlie: 72 }
```

### Count object size

```javascript
Object.keys(obj).length;  // number of own enumerable properties
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What does `Object.keys()` return?     | Array of property names (strings).                  |
| What does `Object.values()` return?   | Array of property values (any types).               |
| What does `Object.entries()` return?  | Array of [key, value] pairs.                        |
| Are these methods destructive?        | No — they return arrays, do not modify the object.  |
| Do they include inherited properties? | No — own enumerable properties only.                |
| Do they include Symbol keys?          | No — use `Object.getOwnPropertySymbols()`.          |
| Do they include non-enumerable properties? | No — only enumerable.                         |

---

# Chapter 20 — Destructuring

## Array Destructuring

Extract values from arrays into variables based on **position**.

```javascript
const nums = [10, 20, 30, 40, 50];

// Basic
const [a, b] = nums;
console.log(a, b); // 10 20

// Skip elements with commas
const [first, , third] = nums;
console.log(first, third); // 10 30

// Rest pattern
const [head, ...tail] = nums;
console.log(head); // 10
console.log(tail); // [20, 30, 40, 50]

// Default values
const [p, q, r = 99] = [1, 2];
console.log(p, q, r); // 1, 2, 99

// Swap variables
let x = 5, y = 10;
[x, y] = [y, x];
console.log(x, y); // 10, 5

// Nested destructuring
const matrix = [[1, 2], [3, 4]];
const [[a1, a2], [b1, b2]] = matrix;
console.log(a1, a2, b1, b2); // 1, 2, 3, 4
```

## Object Destructuring

Extract values from objects into variables based on **key name**.

```javascript
const user = { name: "John", age: 25, city: "Boston" };

// Basic — variable names must match property names
const { name, age } = user;
console.log(name, age); // "John" 25

// Renaming
const { name: userName, age: userAge } = user;
console.log(userName, userAge); // "John" 25

// Default values
const { name, role = "user" } = user;
console.log(role); // "user"

// Rest of object (ES2018)
const { name, ...rest } = user;
console.log(rest); // { age: 25, city: "Boston" }
```

### Nested Object Destructuring

```javascript
const person = {
    name: "Alice",
    address: {
        city: "NYC",
        zip: 10001,
        coordinates: { lat: 40.71, lng: -74.01 }
    }
};

// Destructure nested properties
const { address: { city, zip } } = person;
console.log(city, zip); // "NYC" 10001

// With renaming at multiple levels
const { address: { coordinates: { lat: latitude } } } = person;
console.log(latitude); // 40.71
```

## Destructuring in Function Parameters

### Array parameter

```javascript
function sum([a, b, c]) {
    return a + b + c;
}
console.log(sum([1, 2, 3])); // 6
```

### Object parameter

```javascript
function greet({ name, age }) {
    console.log(`Hello, ${name}! You are ${age}.`);
}
greet({ name: "Alice", age: 25 }); // "Hello, Alice! You are 25."

// With defaults
function configure({ host = "localhost", port = 8080, ssl = false } = {}) {
    console.log(`Connecting to ${host}:${port} (SSL: ${ssl})`);
}
configure({ port: 3000, ssl: true });
// "Connecting to localhost:3000 (SSL: true)"
configure();
// "Connecting to localhost:8080 (SSL: false)"
```

## Reverse Engineering Questions

### For destructuring

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which values are being extracted?     | Depending on pattern — position (array) or key (object). |
| Is this array or object destructuring?| Check `[]` vs `{}` on the left side of assignment.   |
| Are default values being used?        | Check for `=` inside the destructuring pattern.     |
| Is there a rest pattern?              | Check for `...` at the end of the pattern.          |
| Is destructuring in parameters?       | Function parameters can destructure directly.       |
| Are nested properties extracted?      | Check for nested patterns `{}` or `[]` within.      |

---

# Chapter 21 — Spread Operator (`...`)

## Array Spread

Expands an array into individual elements.

```javascript
// Copy array (shallow)
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]
console.log(copy === original); // false — different references

// Concatenate arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4]

// Insert between elements
const middle = [3, 4];
const result = [1, 2, ...middle, 5, 6];
// [1, 2, 3, 4, 5, 6]

// Convert string to array
const chars = [..."hello"];
console.log(chars); // ["h", "e", "l", "l", "o"]

// Max of numbers
const numbers = [10, 5, 20, 8];
console.log(Math.max(...numbers)); // 20

// Push multiple elements (avoid spread in push for perf with large arrays)
arr.push(...[4, 5, 6]);
```

## Object Spread (ES2018)

```javascript
// Copy object (shallow)
const original = { a: 1, b: 2 };
const copy = { ...original };
console.log(copy); // { a: 1, b: 2 }

// Merge objects (later keys override earlier)
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 3, c: 4 }

// Add/override property immutably
const user = { name: "Alice", age: 25 };
const updated = { ...user, age: 26, city: "Boston" };
console.log(updated); // { name: "Alice", age: 26, city: "Boston" }
console.log(user); // { name: "Alice", age: 25 } — unchanged

// Remove property (with destructuring + rest)
const { age, ...withoutAge } = user;
console.log(withoutAge); // { name: "Alice" }

// Provide defaults
const defaults = { host: "localhost", port: 8080 };
const config = { ...defaults, ...userConfig };
// userConfig values override defaults
```

## Spread vs Rest

| Aspect          | Spread                              | Rest                                |
|-----------------|-------------------------------------|-------------------------------------|
| Context         | Used in arrays/objects **literals** and function **calls** | Used in destructuring patterns and function **parameters** |
| Purpose         | Expands elements/properties         | Collects remaining elements/properties |
| Example (array) | `[...arr]`                          | `const [a, ...rest] = arr`          |
| Example (obj)   | `{...obj}`                          | `const {a, ...rest} = obj`          |
| Example (fn)    | `fn(...args)`                       | `function fn(...args) {}`           |

## Performance Considerations

```javascript
// For small to medium arrays/objects, spread is fine.
// For very large arrays, concat or push may be faster:
const large = new Array(1000000).fill(0);
// Spread: const copy = [...large];   // OK but allocation heavy
// Slice: const copy = large.slice(); // slightly faster
```

## Reverse Engineering Questions

### For spread

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this spread or rest?               | Spread is used in value contexts, rest in assignment/parameter. |
| Is the copy shallow or deep?          | Shallow — only top-level properties/values are copied. |
| Are nested objects shared?            | Yes — spread is shallow. Use `structuredClone()` for deep. |
| Does the original change?             | No — spread creates new objects/arrays (non-destructive). |
| What is the order of merged properties? | Later spreads override earlier ones (key order: insertion order). |

---

# Chapter 22 — Rest Operator (`...`)

## Rest in Array Destructuring

Collects remaining elements into a new array.

```javascript
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// Must be last element
const [a, ...rest, b] = [1, 2, 3, 4]; // SyntaxError!

// Can be empty
const [a, ...rest] = [1];
console.log(rest); // []
```

## Rest in Object Destructuring

Collects remaining own enumerable properties into a new object.

```javascript
const user = { name: "John", age: 25, city: "Boston", role: "admin" };
const { name, role, ...details } = user;
console.log(name);    // "John"
console.log(role);    // "admin"
console.log(details); // { age: 25, city: "Boston" }
```

## Rest in Function Parameters

Collects all remaining arguments into a real array.

```javascript
function sum(...numbers) {
    console.log(Array.isArray(numbers)); // true
    return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3, 4)); // 10

// With named parameters
function log(level, ...messages) {
    console.log(`[${level}]`, ...messages);
}
log("INFO", "Server started", "on port", 3000);
// [INFO] Server started on port 3000
```

## Rest vs `arguments`

```javascript
function oldWay() {
    console.log(arguments);       // array-like, NOT a real array
    console.log(Array.isArray(arguments)); // false
}

function newWay(...args) {
    console.log(args);            // real Array
    console.log(Array.isArray(args)); // true
}
```

## Reverse Engineering Questions

### For rest

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What does rest collect?               | Remaining elements/properties/arguments.             |
| Where must rest be positioned?        | Always the last in the pattern.                      |
| What type does rest produce?          | Array (for array destructuring and params) or object (for object destructuring). |
| Is rest different from spread?        | Yes — rest collects, spread expands.                |
| Does rest work in arrow functions?    | Yes — rest parameters work in all function types.   |

---

# Chapter 23 — References in Depth

## The Core Concept

Primitives: stored directly in the variable (on the stack). Objects: the variable holds a **reference** (memory address) pointing to the object in the heap.

```javascript
// Primitive — value stored directly
let a = 10;
let b = a;      // b gets a copy of 10
a = 20;
console.log(b); // 10 — unchanged

// Object — reference stored
let x = { value: 10 };
let y = x;      // y gets a copy of the reference (same object)
x.value = 20;
console.log(y.value); // 20 — same object, both references see the change
```

## Memory Diagrams

### Primitives

```text
Stack:
a: 10
b: 10    (independent copy)
```

### Objects

```text
Stack:                  Heap:
x: @1234 ─────────────→ { value: 10 }
y: @1234 ─────────────↗
```

## Comparing References

```javascript
// Objects are compared by reference, not by value
{} === {}           // false — two different objects
[] === []           // false

const obj1 = { a: 1 };
const obj2 = obj1;  // same reference
obj1 === obj2       // true

// To compare objects by value (shallow):
function shallowEquals(a, b) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => a[key] === b[key]);
}
shallowEquals({ a: 1 }, { a: 1 }); // true
```

## Const and References

```javascript
const obj = { name: "John" };
obj.name = "Jane";    // OK — mutating the object
obj = { name: "Bob" }; // TypeError — cannot reassign const reference
```

## Reverse Engineering Questions

### For references

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this value primitive or reference? | Primitives: number, string, boolean, null, undefined, symbol, bigint. Reference: object, array, function. |
| Is the data copied or shared?         | Primitives: independent copy. Objects: shared reference. |
| Are two variables pointing to the same object? | Check if they were assigned the same reference. |
| What happens if I reassign a reference? | The original object is unchanged; the variable points to a new object. |
| What happens if I mutate an object?   | All references to that object see the mutation.     |
| How do I create an independent copy?  | Shallow: spread/assign. Deep: `structuredClone()`.  |

---

# Chapter 24 — Shallow Copy

## What Is a Shallow Copy?

A **shallow copy** creates a new object/array at the top level, but nested objects/arrays still share references with the original.

## Methods for Shallow Copy

### Object spread (`...`)

```javascript
const original = {
    name: "John",
    address: { city: "Boston", zip: 10001 }
};

const copy = { ...original };
copy.name = "Jane";           // independent change
copy.address.city = "NYC";    // ALSO changes original.address.city!

console.log(original.name);        // "John" — unchanged
console.log(original.address.city); // "NYC" — changed!
```

### `Object.assign()`

```javascript
const copy = Object.assign({}, original);
// Same behavior as spread
```

### Array spread (`...`)

```javascript
const arr = [1, 2, { a: 1 }];
const arrCopy = [...arr];

arrCopy[0] = 99;        // independent
arrCopy[2].a = 999;     // ALSO changes original[2].a!
```

### `Array.prototype.slice()`

```javascript
const arrCopy = arr.slice();
```

### `Array.prototype.concat()`

```javascript
const arrCopy = [].concat(arr);
```

## Memory Diagram (Shallow Copy)

```text
original ───→ { name: "John", address: ──→ { city: "Boston" } }
copy ───────→ { name: "Jane", address: ──↗
                                         (same nested object)
```

## When Shallow Copy Is Sufficient

- The object/array has no nesting (all values are primitives).
- You intend to share nested objects.
- Performance matters and deep copy overhead is not justified.

```javascript
// Flat object — shallow copy is fully independent
const flat = { a: 1, b: 2, c: 3 };
const flatCopy = { ...flat }; // fully independent (all primitives)

// Array of primitives
const numbers = [1, 2, 3, 4, 5];
const numbersCopy = [...numbers]; // fully independent
```

## Reverse Engineering Questions

### For shallow copy

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this a shallow copy?               | Check for spread, `Object.assign`, `slice`, `concat` — all shallow. |
| Are there nested objects?             | If yes, they are shared between original and copy.  |
| Does mutating the copy affect the original? | Only at nested levels (objects/arrays within). |
| What level of nesting is independent? | Top-level primitives are independent.               |
| Why use shallow instead of deep?      | Faster, less memory, intentional sharing.           |

---

# Chapter 25 — Deep Copy

## What Is a Deep Copy?

A **deep copy** creates a completely independent clone. No references are shared between original and copy at any level — everything is recursively duplicated.

```javascript
const original = {
    name: "John",
    address: {
        city: "Boston",
        coordinates: { lat: 42.36, lng: -71.06 }
    },
    hobbies: ["reading", "coding"],
    birth: new Date(2000, 0, 1)
};

// Options for deep copy:
```

## Method 1: `structuredClone()` (ES2023, Node 17+, modern browsers)

```javascript
const deep = structuredClone(original);

deep.address.city = "NYC";
console.log(original.address.city); // "Boston" — unaffected!

deep.hobbies.push("gaming");
console.log(original.hobbies); // ["reading", "coding"] — unaffected!
```

**What it handles correctly:**
- Primitives, nested objects, arrays
- `Date`, `Map`, `Set`, `RegExp`, `ArrayBuffer`, `Blob`, `File`, `ImageData`
- Circular references (without crashing)

**What it does NOT handle:**
- Functions (throws `DataCloneError`)
- DOM nodes (throws)
- `WeakMap`, `WeakSet` (not supported)
- `Symbol` properties (dropped)
- Class instances lose their prototype chain (become plain objects)

## Method 2: `JSON.parse(JSON.stringify(obj))`

```javascript
const deep = JSON.parse(JSON.stringify(original));
```

**Limitations:**
- Loses `undefined` values (removes properties entirely)
- Loses `Symbol` keys
- Loses functions (removed)
- `Date` becomes string
- `RegExp` becomes `{}`
- `NaN` becomes `null`
- `Infinity` becomes `null`
- Circular references → `TypeError`

```javascript
const obj = {
    value: undefined,
    fn: () => {},
    date: new Date(),
    regex: /hello/g,
    nan: NaN,
    inf: Infinity
};

JSON.parse(JSON.stringify(obj));
// { date: "2024-...", regex: {}, nan: null, inf: null }
// value and fn are gone
```

## Method 3: Manual Recursive Function

```javascript
function deepClone(value, seen = new WeakMap()) {
    // Handle primitives and functions
    if (value === null || typeof value !== "object") {
        return value;
    }

    // Handle circular references
    if (seen.has(value)) return seen.get(value);

    // Handle Date
    if (value instanceof Date) return new Date(value);

    // Handle RegExp
    if (value instanceof RegExp) return new RegExp(value);

    // Handle Map
    if (value instanceof Map) {
        const clone = new Map();
        seen.set(value, clone);
        value.forEach((v, k) => clone.set(k, deepClone(v, seen)));
        return clone;
    }

    // Handle Set
    if (value instanceof Set) {
        const clone = new Set();
        seen.set(value, clone);
        value.forEach(v => clone.add(deepClone(v, seen)));
        return clone;
    }

    // Handle Array
    if (Array.isArray(value)) {
        const clone = new Array(value.length);
        seen.set(value, clone);
        for (let i = 0; i < value.length; i++) {
            clone[i] = deepClone(value[i], seen);
        }
        return clone;
    }

    // Handle Object
    const clone = Object.create(Object.getPrototypeOf(value));
    seen.set(value, clone);
    for (const key of Reflect.ownKeys(value)) {
        clone[key] = deepClone(value[key], seen);
    }
    return clone;
}
```

## Method 4: Third-Party Libraries

```javascript
// Lodash
import _ from "lodash";
const deep = _.cloneDeep(original);

// Ramda
import R from "ramda";
const deep = R.clone(original);
```

## Performance Comparison

| Method               | Speed      | Safety                     | Best For                     |
|----------------------|------------|----------------------------|------------------------------|
| `structuredClone()`  | Fastest    | High (native)              | Most use cases (modern env)  |
| `JSON` round-trip    | Medium     | Low (loses types)          | Simple serializable data     |
| Manual recursive     | Slowest    | Complete control           | Custom cloning logic         |
| Lodash `cloneDeep`   | Medium     | High (battle-tested)       | Legacy environments          |

## Reverse Engineering Questions

### For deep copy

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this truly independent at all levels? | Yes — no shared references between original and copy. |
| Are there functions or Symbols?       | `structuredClone()` drops functions. JSON drops both. |
| Are there circular references?        | `JSON` method crashes. `structuredClone()` handles them. |
| Are there Date, Map, Set, RegExp?     | `structuredClone()` preserves them. JSON converts them. |
| Is performance a concern?             | Deep copy is O(n) — for huge objects, consider immutability instead. |
| Should I use shallow or deep?         | Shallow is faster. Deep only if independent nested objects are required. |

---

# Chapter 26 — Immutability

## What Is Immutability?

**Immutability** means never modifying data after creation. Instead of changing an existing object, you create a **new** object with the desired changes.

```javascript
// Mutable (mutates original)
const user = { name: "Alice", age: 25 };
user.age = 26;           // bad — mutates the original object

// Immutable (creates new object)
const updatedUser = { ...user, age: 26 };
// user is still { name: "Alice", age: 25 }
```

## Why Immutability Matters

### Predictability

Mutable code can have hidden side effects:

```javascript
// Mutable — hard to trace
let state = { count: 0 };
function increment() {
    state.count++;   // mutates global state
}
increment();
// Who modified state? Hard to tell in large codebases.

// Immutable — predictable
function increment(state) {
    return { ...state, count: state.count + 1 };
}
const state = { count: 0 };
const newState = increment(state);
// state is unchanged; newState has the update.
```

### Change Detection

Frameworks like React can detect changes by comparing references:

```javascript
// Mutable — React cannot detect the change
const state = { count: 0 };
state.count = 1;              // same reference — React sees no change
setState(state);              // won't re-render!

// Immutable — new reference signals change
const newState = { ...state, count: 1 };  // new reference
setState(newState);            // React detects change, re-renders
```

### Undo/Time Travel

Immutability enables easy undo:

```javascript
const history = [];
let state = { count: 0 };

history.push(state);                 // save snapshot
state = { ...state, count: 1 };     // new state
state = { ...state, count: 2 };     // another state

// Undo:
state = history.pop();
```

### Debugging

Bug? Compare snapshots:

```javascript
console.log("Before:", { ...state });  // snapshot
// ... operations ...
console.log("After:", { ...state });   // comparison
```

## Immutable Update Patterns

### Objects

```javascript
// Add/update property
const updated = { ...obj, newKey: value };

// Remove property (using destructuring)
const { removeMe, ...rest } = obj;
const cleaned = rest;

// Update nested property
const updatedNested = {
    ...obj,
    address: { ...obj.address, city: "NYC" }
};
```

### Arrays

```javascript
const arr = [1, 2, 3, 4, 5];

// Add to end
const added = [...arr, 6];       // [1, 2, 3, 4, 5, 6]

// Add to beginning
const prepended = [0, ...arr];   // [0, 1, 2, 3, 4, 5]

// Remove by index
const removed = arr.filter((_, i) => i !== 2); // [1, 2, 4, 5]

// Update element by index
const updated = arr.map((n, i) => i === 2 ? 99 : n); // [1, 2, 99, 4, 5]

// Insert at index
const inserted = [...arr.slice(0, 2), 99, ...arr.slice(2)]; // [1, 2, 99, 3, 4, 5]
```

## Libraries for Immutability

- **Immer** — most popular. Uses `produce` with mutable syntax but produces immutable state:
  ```javascript
  import { produce } from "immer";
  const nextState = produce(state, draft => {
      draft.user.name = "Jane";    // looks mutable, but produces new state
  });
  ```
- **Immutable.js** — persistent data structures with full immutability guarantees.

## Tradeoffs

| Aspect              | Mutable                       | Immutable                      |
|---------------------|-------------------------------|--------------------------------|
| Performance         | Fast (no new allocations)     | Slower (new objects created)   |
| Memory              | Lower (in-place updates)      | Higher (garbage collection)    |
| Predictability      | Less (side effects hidden)    | More (data flow is explicit)   |
| Debugging           | Harder (who changed what?)    | Easier (snapshots, time travel)|
| React/Redux         | Breaks change detection       | Required for correct behavior  |

## Reverse Engineering Questions

### For immutability

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is data being mutated or replaced?    | Check for assignment to properties vs creating new objects. |
| Are there side effects?               | Mutations of function parameters are side effects.  |
| Is this code predictable?             | Immutable code is more predictable — same input always produces same output. |
| Is immutability necessary here?       | For React state, Redux reducers, shared data — yes. For local variables — not always. |
| What is the performance cost?         | Creating new objects has overhead. For frequent updates on large data, consider Immer or manual optimization. |

---

# Chapter 27 — Chaining Methods

## What Is Chaining?

Method chaining calls multiple methods on the same object/array in sequence, where each method returns a value that the next method is called on.

```javascript
const result = [1, 2, 3, 4, 5, 6]
    .filter(n => n % 2 === 0)     // [2, 4, 6]
    .map(n => n * 10)             // [20, 40, 60]
    .reduce((sum, n) => sum + n, 0); // 120
```

## How Chaining Works

Each method returns a new array (for `filter`, `map`, `slice`, etc.), so you can call the next method on the result.

```javascript
// Step by step:
const step1 = [1, 2, 3, 4, 5, 6].filter(n => n % 2 === 0);
// step1 = [2, 4, 6]

const step2 = step1.map(n => n * 10);
// step2 = [20, 40, 60]

const step3 = step2.reduce((sum, n) => sum + n, 0);
// step3 = 120
```

## Common Chainable Array Methods

```javascript
const data = [
    { name: "Alice", age: 25, score: 85 },
    { name: "Bob", age: 30, score: 72 },
    { name: "Charlie", age: 22, score: 91 },
    { name: "Diana", age: 28, score: 64 }
];

const result = data
    .filter(p => p.score >= 70)           // [{Alice}, {Bob}, {Charlie}]
    .sort((a, b) => a.age - b.age)        // [{Charlie}, {Alice}, {Bob}]
    .map(p => p.name);                    // ["Charlie", "Alice", "Bob"]

console.log(result);
// ["Charlie", "Alice", "Bob"]
```

## Performance Consideration

Each chained method creates a new intermediate array:

```javascript
// Chained — creates 3 arrays
const result = arr
    .filter(fn1)    // creates array A
    .map(fn2)       // creates array B
    .reduce(fn3);   // produces final value

// Loop — creates 0 intermediate arrays
function process(arr) {
    const filtered = [];
    for (const item of arr) {
        if (fn1(item)) {
            const transformed = fn2(item);
            filtered.push(transformed);
        }
    }
    return filtered.reduce(fn3);
}
```

For small to medium arrays, chaining is fine. For arrays with 100k+ elements, a single loop may be significantly faster.

## Readability vs Performance

```javascript
// Readable (chained)
const youngActiveNames = users
    .filter(u => u.age < 30)
    .filter(u => u.active)
    .map(u => u.name);

// Performant (single loop)
const youngActiveNames = [];
for (const u of users) {
    if (u.age < 30 && u.active) {
        youngActiveNames.push(u.name);
    }
}
```

## Reverse Engineering Questions

### For chaining

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What is the input to the chain?       | The starting array/object.                          |
| What is each step doing?              | Each method transforms or filters.                  |
| How many intermediate arrays?         | One per non-terminal method (filter, map, slice).   |
| Could this be more readable?          | Very long chains may need step variables.           |
| Is performance a concern?             | For large data, consider combining operations.      |

---

# Chapter 28 — Senior Engineer Reverse Engineering Checklist

## Complete Question Set for Arrays and Objects

### Array Operations

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| Is this operation destructive?        | Does it modify the original? (splice, sort, push, pop, shift, unshift) |
| Does it mutate original memory?       | Check if the method returns a new array or reuses the same. |
| Does it create new memory?            | map, filter, slice, reduce all create new arrays.    |
| What is the time complexity?          | O(1): push/pop. O(n): shift/unshift/splice/filter/map/reduce. O(n log n): sort. |
| What is the space complexity?         | New arrays mean O(n) additional memory.              |
| Is this the right method?             | map (transform), filter (select), find (one), reduce (aggregate). |

### Object Operations

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| Is this a shallow or deep operation?  | Spread/Object.assign are shallow.                    |
| Which references are shared?          | Nested objects/arrays after shallow copy.            |
| Which references are independent?     | Top-level primitives after shallow copy.             |
| Why use array instead of object?      | Ordered numeric indexing vs named keys.              |
| Why use object instead of array?      | Semantic keys, O(1) property access.                 |
| Can this create bugs from shared references? | Mutation through one reference affecting others. |

### Immutability

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| Is data being mutated?                | Look for property assignments, push, sort, etc.      |
| Is data being replaced?               | Look for spread, map, filter — creating new objects. |
| Is immutability required?             | React state, Redux, shared data structures.          |
| Are there side effects?               | Mutations in functions are side effects.             |

### Code Comprehension

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| What is the data flow?                | Input → transform → output.                          |
| What is the shape of data?            | Object keys and value types, array structure.        |
| Can I rewrite this from scratch?      | True understanding.                                  |
| Can I identify potential bugs?        | Off-by-one, mutation side effects, deep vs shallow.  |
| What would break if I removed a line? | Understand essential vs accidental complexity.       |

---

# Chapter 29 — Projects

## Project 1: Student Management System

```javascript
function createStudentManager() {
    const students = [];

    return {
        addStudent(student) {
            if (!student.name || typeof student.age !== "number" || !student.grade) {
                throw new Error("Invalid student data");
            }
            students.push({ ...student, id: Date.now() });
        },

        removeStudent(id) {
            const index = students.findIndex(s => s.id === id);
            if (index === -1) throw new Error("Student not found");
            students.splice(index, 1);
        },

        findByName(name) {
            return students.filter(s =>
                s.name.toLowerCase().includes(name.toLowerCase())
            );
        },

        filterByGrade(minGrade) {
            return students.filter(s => s.grade >= minGrade);
        },

        getAverageAge() {
            if (students.length === 0) return 0;
            return students.reduce((sum, s) => sum + s.age, 0) / students.length;
        },

        sortByGrade(direction = "desc") {
            return [...students].sort((a, b) =>
                direction === "desc" ? b.grade - a.grade : a.grade - b.grade
            );
        },

        getSummary() {
            return {
                total: students.length,
                averageGrade: students.reduce((s, n) => s + n.grade, 0) / students.length || 0,
                oldest: students.reduce((max, s) => s.age > max.age ? s : max, students[0]),
                youngest: students.reduce((min, s) => s.age < min.age ? s : min, students[0])
            };
        },

        getAllStudents() {
            return [...students]; // return copy to prevent external mutation
        }
    };
}

// Usage
const manager = createStudentManager();
manager.addStudent({ name: "Alice", age: 20, grade: 85 });
manager.addStudent({ name: "Bob", age: 22, grade: 72 });
manager.addStudent({ name: "Charlie", age: 19, grade: 91 });
console.log(manager.getSummary());
```

## Project 2: Shopping Cart

```javascript
function createCart() {
    let items = [];

    return {
        addItem(product, quantity = 1) {
            const existing = items.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        updateQuantity(productId, quantity) {
            const item = items.find(item => item.id === productId);
            if (!item) throw new Error("Item not found");
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
            }
        },

        getTotal() {
            return items.reduce((total, item) => total + item.price * item.quantity, 0);
        },

        getItemCount() {
            return items.reduce((count, item) => count + item.quantity, 0);
        },

        applyDiscount(percent) {
            const factor = 1 - percent / 100;
            return items.map(item => ({
                ...item,
                price: item.price * factor
            }));
        },

        getItems() {
            return [...items]; // defensive copy
        },

        clear() {
            items = [];
        }
    };
}

const cart = createCart();
cart.addItem({ id: 1, name: "Laptop", price: 1200 }, 1);
cart.addItem({ id: 2, name: "Mouse", price: 25 }, 2);
console.log(`Total: $${cart.getTotal()}`);  // Total: $1250
console.log(`Items: ${cart.getItemCount()}`); // Items: 3
```

## Project 3: Inventory System with Object Operations

```javascript
function createInventory() {
    let stock = {};

    return {
        addItem(sku, item) {
            stock[sku] = { ...item, sku };
        },

        updateStock(sku, quantity) {
            if (!stock[sku]) throw new Error(`SKU ${sku} not found`);
            stock[sku].quantity = quantity;
            return stock[sku];
        },

        getItem(sku) {
            return stock[sku] ? { ...stock[sku] } : null;
        },

        getAllItems() {
            return Object.entries(stock).map(([sku, item]) => ({ sku, ...item }));
        },

        filterByPrice(maxPrice) {
            return Object.values(stock)
                .filter(item => item.price <= maxPrice)
                .sort((a, b) => a.price - b.price);
        },

        getLowStock(threshold = 5) {
            return Object.entries(stock)
                .filter(([_, item]) => item.quantity < threshold)
                .map(([sku, item]) => ({ sku, quantity: item.quantity }));
        },

        getTotalValue() {
            return Object.values(stock).reduce(
                (total, item) => total + item.price * item.quantity, 0
            );
        },

        removeItem(sku) {
            const { [sku]: removed, ...rest } = stock;
            stock = rest;
            return removed || null;
        },

        getSummary() {
            const items = Object.values(stock);
            return {
                totalItems: items.length,
                totalUnits: items.reduce((s, i) => s + i.quantity, 0),
                totalValue: this.getTotalValue(),
                categories: [...new Set(items.map(i => i.category))]
            };
        }
    };
}
```

## Project 4: Statistics Calculator

```javascript
function createStatsCalculator() {
    return {
        sum(numbers) {
            return numbers.reduce((acc, n) => acc + n, 0);
        },

        average(numbers) {
            if (numbers.length === 0) return 0;
            return this.sum(numbers) / numbers.length;
        },

        min(numbers) {
            return Math.min(...numbers);
        },

        max(numbers) {
            return Math.max(...numbers);
        },

        range(numbers) {
            return this.max(numbers) - this.min(numbers);
        },

        median(numbers) {
            const sorted = [...numbers].sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            if (sorted.length % 2 === 0) {
                return (sorted[mid - 1] + sorted[mid]) / 2;
            }
            return sorted[mid];
        },

        mode(numbers) {
            const counts = numbers.reduce((acc, n) => {
                acc[n] = (acc[n] || 0) + 1;
                return acc;
            }, {});

            const maxCount = Math.max(...Object.values(counts));
            return Object.entries(counts)
                .filter(([_, count]) => count === maxCount)
                .map(([num]) => Number(num));
        },

        variance(numbers) {
            const avg = this.average(numbers);
            return numbers.reduce((acc, n) => acc + (n - avg) ** 2, 0) / numbers.length;
        },

        stdDev(numbers) {
            return Math.sqrt(this.variance(numbers));
        },

        allStats(numbers) {
            return {
                sum: this.sum(numbers),
                average: this.average(numbers),
                min: this.min(numbers),
                max: this.max(numbers),
                range: this.range(numbers),
                median: this.median(numbers),
                mode: this.mode(numbers),
                variance: this.variance(numbers),
                stdDev: this.stdDev(numbers),
                count: numbers.length
            };
        }
    };
}

const stats = createStatsCalculator();
const data = [1, 2, 2, 3, 4, 4, 4, 5, 6, 7];
console.log(stats.allStats(data));
```

## Project 5: Immutable Todo List

```javascript
function createTodoApp() {
    let todos = [];

    return {
        addTodo(text) {
            const newTodo = {
                id: Date.now(),
                text,
                completed: false,
                createdAt: new Date().toISOString()
            };
            todos = [...todos, newTodo];
            return todos;
        },

        toggleTodo(id) {
            todos = todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            return todos;
        },

        updateText(id, text) {
            todos = todos.map(todo =>
                todo.id === id ? { ...todo, text } : todo
            );
            return todos;
        },

        removeTodo(id) {
            todos = todos.filter(todo => todo.id !== id);
            return todos;
        },

        clearCompleted() {
            todos = todos.filter(todo => !todo.completed);
            return todos;
        },

        getActive() {
            return todos.filter(todo => !todo.completed);
        },

        getCompleted() {
            return todos.filter(todo => todo.completed);
        },

        getStats() {
            return {
                total: todos.length,
                active: this.getActive().length,
                completed: this.getCompleted().length
            };
        },

        getAllTodos() {
            return [...todos]; // immutable — return copy
        }
    };
}
```

---

## Next: Part 5

**Part 5 — Functions, Closures, Higher-Order Functions, Execution Context, and Memory Internals**

Including:

- Function objects and the `Function` constructor
- Function declarations vs expressions vs arrows (expanded)
- IIFE patterns and modules
- Callback functions and patterns
- Higher-order functions
- Closures (expanded — production patterns)
- Factory functions and composition
- Recursion internals (call stack, memory)
- Execution contexts (creation, execution, destruction)
- Scope chain resolution (REPL, debugger)
- Call stack internals (heap stack frames)
- Garbage collection (mark-and-sweep, generational)
- Memory leaks (closures, DOM references, detached DOM, global references)
- V8 optimization hints (monomorphic vs polymorphic, hidden classes)
- Reverse engineering tactics used by senior JavaScript engineers
