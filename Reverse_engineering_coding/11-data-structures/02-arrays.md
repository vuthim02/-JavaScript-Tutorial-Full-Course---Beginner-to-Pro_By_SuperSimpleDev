# Arrays

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Contiguous Memory

```javascript
let arr = [10, 20, 30];
```

```
Address    Value
1000       10    ← arr[0]
1008       20    ← arr[1]
1016       30    ← arr[2]
```

Array elements are stored in **contiguous** memory locations. Each element takes the same amount of space (8 bytes for a reference in JS).

## Access by Index — O(1)

```javascript
arr[1]  // 20
```

The engine calculates: `baseAddress + (index * elementSize)`. No matter if the array has 10 or 10 million elements, this calculation is constant time.

## push() — Amortized O(1)

```javascript
arr.push(40); // Add to end
```

If there's room in the allocated memory, it's O(1). If the array needs to grow (reallocate), it copies all elements — but this happens rarely, so the **amortized** cost is O(1).

## pop() — O(1)

```javascript
arr.pop(); // Remove from end
```

Simply decrements the length. No elements are moved.

## shift() — O(n)

```javascript
arr.shift(); // Remove from front
```

Every element must be **shifted left** by one position:

```
Before: [10, 20, 30]  →  After: [20, 30, undefined], length: 2
```

## unshift() — O(n)

```javascript
arr.unshift(5); // Add to front
```

Every element must be **shifted right** by one position:

```
Before: [10, 20, 30]  →  After: [5, 10, 20, 30]
```

## splice() — O(n)

```javascript
arr.splice(1, 1);    // Remove at index 1 — O(n) (shift left)
arr.splice(1, 0, 5); // Insert at index 1 — O(n) (shift right)
```

`slice()` (not `splice`) is O(n) — it copies elements to a new array. Be careful not to confuse them.

## Array Complexity Summary

| Operation | Complexity | Notes |
|---|---|---|
| Access by index | O(1) | Direct memory calculation |
| push() | O(1) amortized | May trigger resize |
| pop() | O(1) | Just decrement length |
| shift() | O(n) | Every element shifts left |
| unshift() | O(n) | Every element shifts right |
| splice() | O(n) | Shifts remaining elements |
| indexOf() | O(n) | Linear search |
| includes() | O(n) | Linear search |
| sort() | O(n log n) | Timsort (V8) |
| filter() | O(n) | Creates new array |
| map() | O(n) | Creates new array |
| reduce() | O(n) | Single pass |
| forEach() | O(n) | Single pass |

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Does data move? | `shift()` and `unshift()` move all elements. `splice()` moves elements after the affected index. |
| Which elements shift? | For `shift()`: all elements shift left by one. For `unshift()`: all shift right by one. |
| Is `shift()` expensive? | Yes, O(n). For frequent front insertions/removals, use a linked list or deque instead. |
| Is array access always O(1)? | Yes. Index calculation is constant. |
| Why is `pop()` O(1) but `shift()` O(n)? | `pop` changes only the length. `shift` must move every element in memory. |
## Next Steps

[Back to Chapter 1](01-big-o.md): Big O: Time and Space Complexity
[Proceed to Chapter 3](03-linked-lists.md): Singly Linked List to learn about singly linked list.
