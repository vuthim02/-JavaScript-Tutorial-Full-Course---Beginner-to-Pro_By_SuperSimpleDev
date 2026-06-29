# then(), catch(), finally()

<img src="https://media.giphy.com/media/UcK7JalnjCz0k/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## The .then() Method

Attaches fulfillment and rejection handlers to a promise. Returns a new promise.

```javascript
promise.then(value => {
    console.log(value);
});
```

## Two Arguments

```javascript
promise.then(
    function onFulfilled(value) { /* success */ },
    function onRejected(error)   { /* failure */ }
);
```

The second argument handles errors — equivalent to `.catch()` for that specific `.then()`.

## Return Value of .then()

```javascript
const p1 = Promise.resolve(1);
const p2 = p1.then(value => {
    return value + 1;
});
p2.then(v => console.log(v)); // 2
```

Every `.then()` returns a **new promise** settled with the handler's return value.

## Returning a Promise from .then() (Flattening)

```javascript
Promise.resolve(1)
    .then(value => {
        return Promise.resolve(value + 1);
    })
    .then(value => {
        console.log(value); // 2 (waited for inner promise)
    });
```

This is called **auto-unwrapping** or **thenable flattening**.

## The .catch() Method

Handles rejections. Equivalent to `.then(null, onRejected)`.

```javascript
promise.catch(error => { });
```

## catch() Returns a Fulfilled Promise (Unless It Throws)

```javascript
Promise.reject("Error")
    .catch(err => {
        console.log("Caught:", err);
        return "Recovered";
    })
    .then(value => {
        console.log(value); // "Recovered"
    });
```

## Positioning of .catch() Matters

```javascript
// Catch at END – catches any error in the chain
step1()
    .then(step2)
    .then(step3)
    .catch(finalErrorHandler);

// Catch in MIDDLE – recovers for subsequent steps
step1()
    .catch(err => { console.warn("step1 failed"); return default; })
    .then(step2)
    .then(step3)
    .catch(finalErrorHandler);
```

## The .finally() Method

Always runs, regardless of fulfillment or rejection.

```javascript
promise.finally(() => {
    console.log("Cleanup");
});
```

**Key properties:**
1. No arguments — receives nothing
2. Does not change the promise state — passes through original value/reason
3. Returns a new promise that mirrors the original

```javascript
function loadData() {
    showSpinner();
    return fetch("/data")
        .then(response => response.json())
        .finally(() => {
            hideSpinner(); // Always called
        });
}
```

## Pass-Through Behavior

```javascript
Promise.resolve(42)
    .finally(() => { console.log("Cleanup"); })
    .then(value => { console.log(value); }); // Still 42

Promise.reject("Error")
    .finally(() => { console.log("Cleanup"); })
    .catch(err => { console.log(err); }); // Still "Error"
```

If `.finally()` throws, the promise rejects with that new error.

## Q&A

| Question | Answer |
|----------|--------|
| Does `.then()` run synchronously? | No. Handler runs as a **microtask** after current code. |
| What does `.then()` return? | A new promise. |
| What if handler throws? | Returned promise rejects with the error. |
| Does `.catch()` catch errors from `.then()` handlers? | Yes. If a `.then()` throws, the next `.catch()` catches it. |
| Can `.catch()` recover from an error? | Yes. If it returns a value (not throwing), the chain continues as fulfilled. |
| Does `.finally()` know the state? | No. It receives no arguments. |
| Can `.finally()` change the promise value? | No. It passes through the original value/reason (unless it throws). |
## Next Steps

[Back to Chapter 7](07-promises.md): Promises
[Proceed to Chapter 9](09-promise-chaining.md): Promise Chaining to learn about promise chaining.
