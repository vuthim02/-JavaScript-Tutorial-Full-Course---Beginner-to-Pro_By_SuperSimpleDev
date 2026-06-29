# Immutability

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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

```javascript
const history = [];
let state = { count: 0 };

history.push(state);                 // save snapshot
state = { ...state, count: 1 };     // new state
state = { ...state, count: 2 };     // another state

// Undo:
state = history.pop();
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

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is data being mutated or replaced?    | Check for assignment to properties vs creating new objects. |
| Are there side effects?               | Mutations of function parameters are side effects.  |
| Is this code predictable?             | Immutable code is more predictable — same input always produces same output. |
| Is immutability necessary here?       | For React state, Redux reducers, shared data — yes. For local variables — not always. |
| What is the performance cost?         | Creating new objects has overhead. For frequent updates on large data, consider Immer or manual optimization. |
## Next Steps

[Back to Chapter 17](17-deep-copy.md): Deep Copy
[Proceed to Chapter 19](19-chaining-performance.md): Chaining Methods to learn about chaining methods.
