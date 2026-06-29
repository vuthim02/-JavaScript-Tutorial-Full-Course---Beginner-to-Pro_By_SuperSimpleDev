# `shift()` — Remove from Beginning

<img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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

---

# `unshift()` — Add to Beginning

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

### For `shift()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which side of the array changes?      | The beginning (left side).                           |
| Is the original modified?             | Yes — `shift()` mutates the original array.         |
| What happens to remaining indices?    | All shift left by one — their indices change.       |
| What is the time complexity?          | O(n) — linear. Each element is reindexed.           |
| When would I use this?                | Implementing a queue (FIFO) or processing a list from front. |

### For `unshift()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which side of the array changes?      | The beginning (left side).                           |
| Is the original modified?             | Yes — `unshift()` mutates the original array.       |
| What happens to existing elements?    | All shift right — their indices increase.           |
| What is the time complexity?          | O(n) — linear.                                      |
| Can I add multiple elements?          | Yes: `arr.unshift(1, 2, 3)`.                        |
| Return value?                         | The new length of the array.                        |
## Next Steps

[Back to Chapter 2](02-array-methods-push-pop.md): `push()` — Add to End
[Proceed to Chapter 4](04-array-methods-slice-splice.md): `slice()` — Non-Destructive Extraction to learn about `slice()` — non-destructive extraction.
