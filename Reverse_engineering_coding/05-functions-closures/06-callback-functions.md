# Callback Functions

## What Is a Callback?

A **callback** is a function passed to another function to be called at a specific moment.

```javascript
function doWork(data, onSuccess, onError) {
    try {
        const result = processData(data);
        onSuccess(result);
    } catch (err) {
        onError(err);
    }
}

doWork(
    myData,
    result => console.log("Done:", result),
    err    => console.error("Failed:", err.message)
);
```

## Synchronous vs Asynchronous Callbacks

```javascript
// SYNCHRONOUS — callback runs immediately, inline
[1, 2, 3].forEach(n => console.log(n)); // 1 2 3
console.log("after forEach");           // runs AFTER forEach finishes

// ASYNCHRONOUS — callback is scheduled for later
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// Output: A → C → B
// Even with 0ms delay, B runs after the call stack clears
```

## Error-First Callbacks (Node.js Convention)

```javascript
const fs = require("fs");

// Convention: first arg is error (null if success), second is result
fs.readFile("data.txt", "utf-8", (error, data) => {
    if (error) {
        console.error("Failed:", error.message);
        return; // ← always return after handling the error!
    }
    console.log("Success:", data);
});
```

## Array Method Callbacks

```javascript
const result = [1, 2, 3, 4, 5]
    .filter(n  => n % 2 === 0)       // callback: keep evens → [2, 4]
    .map(n     => n * 10)            // callback: transform → [20, 40]
    .reduce((sum, n) => sum + n, 0); // callback: accumulate → 60
```

## Callback Hell — The Problem

```javascript
getUser(userId, function(user) {
    getPosts(user.id, function(posts) {
        getComments(posts[0].id, function(comments) {
            getLikes(comments[0].id, function(likes) {
                // ← we are deep inside the "pyramid of doom"
                console.log(likes);
            });
        });
    });
});
```

**Solutions:** Promises and async/await (covered in a later chapter).

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Called immediately or later? | Sync = immediate, Async = queued |
| What args does callback receive? | Check how host function calls it |
| Is there an error argument? | Look for `(err, result)` pattern |
| Nested callbacks? | Signals need for Promises |
## Next Steps

[Back to Chapter 5](05-default-and-rest-parameters.md): Default Parameters
[Proceed to Chapter 7](07-higher-order-functions.md): Higher-Order Functions to learn about higher-order functions.
