# `indexOf()` — Find First Occurrence

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

---

# `includes()` — Existence Check

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

### For `indexOf()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does the value exist in the array?    | If `indexOf` returns -1, it does not.               |
| Which index contains the value?       | The first matching position.                        |
| What comparison does it use?          | Strict equality (`===`).                             |
| Can it find NaN?                      | No — use `includes()` for NaN detection.            |
| What if there are duplicates?         | Returns the first occurrence. Use `lastIndexOf()` for the last. |
| Return value for not found?           | `-1` — not `undefined` or `null`.                   |

### For `includes()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does the array contain this value?    | Returns boolean — true if found, false otherwise.   |
| Can it detect NaN?                    | Yes — unlike `indexOf()`.                           |
| Is the array modified?                | No — non-destructive.                               |
| What comparison does it use?          | SameValueZero (handles NaN, treats -0 and 0 as same). |
## Next Steps

[Back to Chapter 4](04-array-methods-slice-splice.md): `slice()` — Non-Destructive Extraction
[Proceed to Chapter 6](06-array-methods-map.md): `map()` — Transform Each Element to learn about `map()` — transform each element.
