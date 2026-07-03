# Array Internals: Memory Structure and Properties

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

## Accessing and Modifying Elements

```javascript
numbers[0]   // 10 — bracket notation converts 0 to "0"
numbers[1]   // 20
numbers[2]   // 30
numbers[100] // undefined — no error, just undefined

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

## Performance Characteristics

| Operation | Complexity | Note |
|-----------|-----------|------|
| `push` / `pop` (end) | O(1) | Fast — use for stacks |
| `shift` / `unshift` (start) | O(n) | Slow for large arrays — reindexes all elements |
| `splice` (middle) | O(n) | Reindexes elements after the insertion/removal point |
| `sort` | O(n log n) | TimSort algorithm (varies by engine) |
| Access by index `arr[i]` | O(1) | Fast — direct property lookup |
| `indexOf` / `includes` | O(n) | Linear scan |
| `map` / `filter` / `reduce` | O(n) | Creates new array (except reduce) |

## V8 Elements Kinds

V8 tracks an internal "elements kind" tag on every array for optimization:

| Tag | Description | Speed |
|-----|-------------|-------|
| `PACKED_SMI_ELEMENTS` | All integers | Fastest |
| `PACKED_DOUBLE_ELEMENTS` | All numbers (includes floats) | Fast |
| `PACKED_ELEMENTS` | Mixed types | Normal |
| `HOLEY_*` | Any of above with gaps | Slower — hole checks needed |

```javascript
const a = [1, 2, 3];       // PACKED_SMI_ELEMENTS
a.push(4.5);                // downgrades to PACKED_DOUBLE_ELEMENTS
a.push("x");                // downgrades to PACKED_ELEMENTS
a[100] = 5;                 // downgrades to HOLEY_ELEMENTS
```

Each downgrade is permanent and irreversible — maintain homogeneous, dense arrays for best performance.

## `delete` vs `splice`

```javascript
const a = [1, 2, 3, 4];
delete a[1];                // [1, empty, 3, 4] — leaves a hole, length unchanged
console.log(a.length);      // 4

const b = [1, 2, 3, 4];
b.splice(1, 1);             // [1, 3, 4] — removes element, reindexes, length decremented
console.log(b.length);      // 3
```

Use `splice` for removal, not `delete`.

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

**Performance note:** For queues with many elements, `shift` is O(n). Use an index-based queue or a proper deque for large-scale FIFO operations.

## Creating Arrays with `Array.from()` and `Array.of()`

`Array.from()` and `Array.of()` are static methods that create arrays with specific behaviors:

```javascript
// Array.from — from iterables or array-like objects
Array.from("hello");              // ["h", "e", "l", "l", "o"]
Array.from(new Set([1, 2, 3]));   // [1, 2, 3]
Array.from({ length: 3 }, (_, i) => i * 10); // [0, 10, 20] — mapFn!
Array.from([1, 2, 3], x => x * 2); // [2, 4, 6] — mapFn on existing array

// Array.of — avoids single-argument Array() pitfall
Array.of(3);     // [3] — single element
Array.of(1, 2, 3); // [1, 2, 3]

// Array(3) vs Array.of(3):
new Array(3);    // [empty × 3] — length 3, no elements
Array.of(3);     // [3] — one element with value 3
```

## Array Methods Quick Reference

| Category       | Methods                                                      |
|----------------|--------------------------------------------------------------|
| **Mutating**   | `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()`, `reverse()`, `fill()` |
| **Non-mutating** | `slice()`, `map()`, `filter()`, `reduce()`, `forEach()`, `find()`, `some()`, `every()`, `flat()`, `flatMap()` |
| **Search**     | `indexOf()`, `lastIndexOf()`, `includes()`, `find()`, `findIndex()` |
| **ES2023 immutable** | `toSorted()`, `toSpliced()`, `toReversed()`, `with()` |
| **Static**     | `Array.from()`, `Array.of()`, `Array.isArray()`              |

## Reverse Engineering Questions

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
| What is the time complexity of `shift`? | O(n) — reindexes all remaining elements |
| What V8 elements kind is this array?   | Determined by homogeneity and density |
| Is `delete` or `splice` correct here? | `splice` for removal; `delete` leaves gaps |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-array-methods-push-pop.md): `push()` — Add to End to learn about `push()` — add to end.
