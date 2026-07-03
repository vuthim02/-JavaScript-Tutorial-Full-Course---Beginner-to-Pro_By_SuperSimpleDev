# Callback Functions

## Definition

A callback is a function passed into another function to be executed later.

```javascript
setTimeout(() => {
    console.log("Hello");
}, 1000);
```

The arrow function is the callback. Executed later (after 1 second).

## Callbacks Are Everywhere

```javascript
// Event callback
button.addEventListener("click", () => {
    console.log("Clicked");
});

// Promise callback
fetch("/api")
    .then(response => response.json())
    .then(data => console.log(data));

// Array callback (synchronous)
[1, 2, 3].map(x => x * 2);
arr.filter(x => x > 0);
arr.sort((a, b) => a - b);

// Node.js callback (error-first)
fs.readFile("file.txt", (err, data) => {
    if (err) return console.error(err);
    console.log(data.toString());
});
```

## Synchronous vs Asynchronous Callbacks

```javascript
// SYNCHRONOUS callback – executes immediately
function syncCallback(cb) {
    cb(); // Called before syncCallback returns
}
syncCallback(() => console.log("Sync"));
console.log("After"); // "Sync" then "After"

// ASYNCHRONOUS callback – executes later
function asyncCallback(cb) {
    setTimeout(cb, 1000);
}
asyncCallback(() => console.log("Async"));
console.log("After"); // "After" then (1s later) "Async"
```

## How to Identify Sync vs Async

```
SYNC callback:    Called inside function body before return
ASYNC callback:   Called after function returns (via Web API + queue)
```

## Callback Hell Setup

When async callbacks are nested:

```javascript
// One level – fine
login(user, () => { showDashboard(); });

// Two levels – ok
login(user, () => {
    loadProfile(() => { showDashboard(); });
});

// Three levels – getting ugly
login(user, () => {
    loadProfile(() => {
        loadOrders(() => { showDashboard(); });
    });
});
```

## Error-First Callback Pattern (Node.js)

```javascript
const fs = require("fs");

// Error-first convention: first argument is error, second is result
function readJSON(path, callback) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            callback(err); // Pass error, no result
            return;
        }
        try {
            const parsed = JSON.parse(data);
            callback(null, parsed); // null error, pass result
        } catch (parseErr) {
            callback(parseErr);
        }
    });
}

readJSON("/data/config.json", (err, config) => {
    if (err) {
        console.error("Failed to load config:", err);
        return;
    }
    console.log("Config loaded:", config);
});
```

This pattern ensures errors are never silently swallowed.

## Q&A

| Question | Answer |
|----------|--------|
| Who calls this callback? | For `setTimeout`, the Web API. For `addEventListener`, the browser event system. For `map`, the JS engine (synchronously). |
| When will it execute? | Sync callbacks run immediately; async callbacks run after stack is empty. |
| Is this callback sync or async? | Check if called before or after outer function returns. |
| What pattern does this callback follow? | Error-first (Node.js: `(err, result) => {}`) or success-only (`result => {}`). |
| Can the callback be called more than once? | With raw callbacks, yes (if library has bugs or is malicious). Promises prevent this. |
| Why use error-first convention? | Ensures errors are always handled explicitly. Prevents silent failures in async operations. |
## Next Steps

[Back to Chapter 4](04-set-timeout.md): setTimeout
[Proceed to Chapter 6](06-callback-hell.md): Callback Hell (Pyramid of Doom) to learn about callback hell (pyramid of doom).
