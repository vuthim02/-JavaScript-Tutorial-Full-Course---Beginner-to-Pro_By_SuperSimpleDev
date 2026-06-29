# Chaining Methods

<img src="https://media.giphy.com/media/l46ChKeGsmsfE3Un6/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What is the input to the chain?       | The starting array/object.                          |
| What is each step doing?              | Each method transforms or filters.                  |
| How many intermediate arrays?         | One per non-terminal method (filter, map, slice).   |
| Could this be more readable?          | Very long chains may need step variables.           |
| Is performance a concern?             | For large data, consider combining operations.      |

---

# Senior Engineer Reverse Engineering Checklist

## Array Operations

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| Is this operation destructive?        | Does it modify the original? (splice, sort, push, pop, shift, unshift) |
| Does it mutate original memory?       | Check if the method returns a new array or reuses the same. |
| Does it create new memory?            | map, filter, slice, reduce all create new arrays.    |
| What is the time complexity?          | O(1): push/pop. O(n): shift/unshift/splice/filter/map/reduce. O(n log n): sort. |
| What is the space complexity?         | New arrays mean O(n) additional memory.              |
| Is this the right method?             | map (transform), filter (select), find (one), reduce (aggregate). |

## Object Operations

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| Is this a shallow or deep operation?  | Spread/Object.assign are shallow.                    |
| Which references are shared?          | Nested objects/arrays after shallow copy.            |
| Which references are independent?     | Top-level primitives after shallow copy.             |
| Why use array instead of object?      | Ordered numeric indexing vs named keys.              |
| Why use object instead of array?      | Semantic keys, O(1) property access.                 |
| Can this create bugs from shared references? | Mutation through one reference affecting others. |

## Immutability

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| Is data being mutated?                | Look for property assignments, push, sort, etc.      |
| Is data being replaced?               | Look for spread, map, filter — creating new objects. |
| Is immutability required?             | React state, Redux, shared data structures.          |
| Are there side effects?               | Mutations in functions are side effects.             |

## Code Comprehension

| Question                              | Why It Matters                                       |
|---------------------------------------|------------------------------------------------------|
| What is the data flow?                | Input → transform → output.                          |
| What is the shape of data?            | Object keys and value types, array structure.        |
| Can I rewrite this from scratch?      | True understanding.                                  |
| Can I identify potential bugs?        | Off-by-one, mutation side effects, deep vs shallow.  |
| What would break if I removed a line? | Understand essential vs accidental complexity.       |
## Next Steps

[Back to Chapter 18](18-immutability.md): Immutability
[Proceed to Chapter 20](20-projects-part1.md): Projects 1-3 to learn about projects 1-3.
