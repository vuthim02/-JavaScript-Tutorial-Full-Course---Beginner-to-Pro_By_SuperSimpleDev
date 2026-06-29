# `push()` — Add to End

<img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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

---

# `pop()` — Remove from End

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

### For `push()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which side of the array changes?      | The end (right side).                                |
| Is the original modified?             | Yes — `push()` mutates the original array.          |
| What is the return value?             | The new length of the array.                        |
| Can I add multiple elements at once?  | Yes: `arr.push(1, 2, 3)`.                           |
| What is the time complexity?          | O(1) — constant time.                               |

### For `pop()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which element disappears?             | The last element (highest index).                    |
| Does the array shrink?                | Yes — length decreases by 1.                         |
| Is the original modified?             | Yes — `pop()` mutates the original array.           |
| What is the return value?             | The removed element, or `undefined` if empty.        |
| What happens on an empty array?       | Returns `undefined`, array stays empty.             |
| What is the time complexity?          | O(1) — constant time.                               |
## Next Steps

[Back to Chapter 1](01-array-internals.md): Array Internals: Memory Structure and Properties
[Proceed to Chapter 3](03-array-methods-shift-unshift.md): `shift()` — Remove from Beginning to learn about `shift()` — remove from beginning.
