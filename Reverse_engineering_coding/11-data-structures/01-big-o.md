# Big O: Time and Space Complexity

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Measuring Growth, Not Speed

Without Big O, processing 10 elements might seem fast — but 10 million elements may become extremely slow. Big O measures **growth rate** — how time or space increases as input size grows.

Every problem involves: Input (raw data) → Data Structure (organized storage) → Algorithm (transformation steps) → Output (result).

When reading code, ask: What data structure stores info? Which algorithm manipulates it? Time complexity? Space complexity? Can it scale? Better approach?

## Common Big O Categories

| Notation | Name | Example |
|---|---|---|
| O(1) | Constant | Array access by index |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Single loop |
| O(n log n) | Linearithmic | Merge sort, Quick sort (avg) |
| O(n²) | Quadratic | Nested loops |
| O(2ⁿ) | Exponential | Recursive Fibonacci (naive) |
| O(n!) | Factorial | Permutations (traveling salesman) |

## Visualizing Growth

```
n = 10:
  O(1)=1  O(log n)=~3  O(n)=10  O(n log n)=~33  O(n²)=100  O(2ⁿ)=1024  O(n!)=3,628,800

n = 100:
  O(1)=1  O(log n)=~7  O(n)=100  O(n log n)=~664  O(n²)=10,000  O(2ⁿ)=1.26e30  O(n!)=9.3e157
```

## Big O Rules

### 1. Drop Constants

```javascript
// O(n) not O(2n)
for (let i = 0; i < n; i++) { /* 1 */ }
for (let i = 0; i < n; i++) { /* 2 */ }
// Still O(n) — constant factor is dropped
```

### 2. Drop Lower-Order Terms

```javascript
// O(n²) not O(n² + n)
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) { }
}
for (let i = 0; i < n; i++) { }
// O(n² + n) → O(n²) — n is insignificant compared to n²
```

### 3. Consider Worst Case

```javascript
// Array search: O(n) worst case (element at end or not present)
function find(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}
```

## Space Complexity

```javascript
// O(1) space — no extra memory proportional to input
function sum(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) total += arr[i];
    return total;
}

// O(n) space — creates array proportional to input
function double(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) result.push(arr[i] * 2);
    return result;
}

// O(n²) space — 2D matrix
function matrix(n) {
    const m = [];
    for (let i = 0; i < n; i++) m.push(new Array(n).fill(0));
    return m;
}
```

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Does operation depend on input size? | If yes, it's not O(1). Check loops, recursion, or method complexity. |
| Nested loop? | Likely O(n²) or higher. Each nesting level adds a factor of n. |
| Recursion? | Trace the recursion tree. If it branches exponentially, O(2ⁿ). |
| Divide by two? | Likely O(log n) — binary search, tree operations, divide-and-conquer. |
| Single loop? | O(n) — linear scan. |
| What about built-in methods? | `.sort()` is typically O(n log n). `.indexOf()` is O(n). `Map.get()` is O(1). |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-arrays.md): Arrays to learn about arrays.
