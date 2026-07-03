# Promises

## What is a Promise?

A Promise represents a **future value** — the result of an asynchronous operation that hasn't completed yet.

## Three States

```
┌────────────┐
│  Pending   │
└─────┬──────┘
      │
      ├──────────────→ ┌────────────┐
      │                │ Fulfilled  │  (resolve called)
      │                └────────────┘
      │
      └──────────────→ ┌────────────┐
                       │ Rejected   │  (reject called or error thrown)
                       └────────────┘
```

Once settled, state is **immutable** — it cannot change.

## Creating a Promise

```javascript
let promise = new Promise((resolve, reject) => {
    // Do async work
});
```

The executor function runs **synchronously** when the Promise is constructed.

## Resolve vs Reject

```javascript
let promise = new Promise((resolve, reject) => {
    let success = Math.random() > 0.5;

    if (success) {
        resolve(100);      // → Fulfilled with value 100
    } else {
        reject("Error");   // → Rejected with reason "Error"
    }
});
```

## The Executor Runs Synchronously

```javascript
console.log("A");

new Promise(() => {
    console.log("B"); // Runs immediately
});

console.log("C");
// Output: A B C
```

But `resolve()` / `reject()` called inside can be sync or async.

## Promise.resolve() and Promise.reject()

```javascript
// Immediately fulfilled promise
const p1 = Promise.resolve(42);
p1.then(value => console.log(value)); // 42

// Immediately rejected promise
const p2 = Promise.reject(new Error("Fail"));
p2.catch(err => console.error(err)); // Error: Fail
```

## Promise with Async Operation

```javascript
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Done waiting");
        }, ms);
    });
}

delay(1000).then(msg => console.log(msg));
// After 1s: "Done waiting"
```

## What Happens After Reject

```javascript
const p = new Promise((resolve, reject) => {
    reject("First reject");
    resolve("This is ignored"); // No effect – already settled
    reject("Also ignored");     // No effect
});

p.then(console.log).catch(console.error); // Only "First reject"
```

## Q&A

| Question | Answer |
|----------|--------|
| Is operation finished? | Check promise state: pending = not finished, fulfilled = success, rejected = failure. |
| Success? | `.then()` will fire. |
| Failure? | `.catch()` will fire. |
| Can a promise change from fulfilled to rejected? | No. Immutable once settled. |
| Does the executor run immediately? | Yes, synchronously, during `new Promise(executor)`. |
| What if you call both resolve and reject? | Only the first call wins. The rest are ignored. |
| Can you inspect state of a promise? | Not directly (no `.state` property). Must use `.then` / `.catch`. |
## Next Steps

[Back to Chapter 6](06-callback-hell.md): Callback Hell (Pyramid of Doom)
[Proceed to Chapter 8](08-then-catch-finally.md): then(), catch(), finally() to learn about then(), catch(), finally().
