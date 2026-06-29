# Promise.race(), Promise.allSettled(), Promise.any()

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Promise.race() — First Settled Wins

Returns a promise that settles with the first promise to settle (fulfill or reject).

```javascript
Promise.race([p1, p2]);
```

### Useful For: Timeout Systems

```javascript
function withTimeout(promise, ms) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Timeout")), ms);
    });
    return Promise.race([promise, timeout]);
}

try {
    const result = await withTimeout(fetch("/slow-api"), 3000);
    console.log("Got result:", result);
} catch (err) {
    console.error("Failed or timed out:", err.message);
}
```

### Important: Promise.race Does Not Cancel Losers

```javascript
const slow = new Promise(resolve => {
    setTimeout(() => {
        console.log("Slow still finished");
        resolve("Slow");
    }, 2000);
});

const fast = new Promise(resolve => {
    setTimeout(() => resolve("Fast"), 500);
});

Promise.race([fast, slow]).then(console.log);
// After 500ms: "Fast"
// After 2000ms: "Slow still finished" (loser still runs)
```

## Promise.allSettled() — Wait for All (Even Failures)

Returns when **all** promises settle. Never rejects.

```javascript
Promise.allSettled([p1, p2]);
```

### Result Structure

```javascript
const results = await Promise.allSettled([
    fetch("/success").then(r => r.json()),
    fetch("/fail").then(r => r.json()),
]);

// results: { status: "fulfilled", value: ... }
//          { status: "rejected",  reason: ... }
```

### Example

```javascript
const promises = [
    Promise.resolve(1),
    Promise.reject("Error"),
    Promise.resolve(3),
];

Promise.allSettled(promises).then(results => {
    results.forEach((result, i) => {
        if (result.status === "fulfilled") {
            console.log(`Promise ${i} fulfilled:`, result.value);
        } else {
            console.log(`Promise ${i} rejected:`, result.reason);
        }
    });
});
```

## Promise.any() — First Success Wins

Returns as soon as **one** promise fulfills. Ignores rejections until all reject.

```javascript
Promise.any([p1, p2]);
```

### If All Reject

```javascript
Promise.any([
    Promise.reject("A"),
    Promise.reject("B"),
]).catch(err => {
    console.log(err instanceof AggregateError); // true
    console.log(err.errors); // ["A", "B"]
});
```

### Use Case: Fastest Successful Server

```javascript
const servers = [
    fetch("https://us-east.server.com/data"),
    fetch("https://eu-west.server.com/data"),
];

try {
    const fastest = await Promise.any(servers);
    const data = await fastest.json();
    console.log("Got data from fastest server:", data);
} catch (err) {
    console.error("All servers failed:", err.errors);
}
```

## Combinator Summary

| Method | Short-circuits | Resolves | Rejects |
|--------|---------------|----------|---------|
| `Promise.all` | First rejection | Array of values | First error |
| `Promise.allSettled` | Never | Array of result objects | Never |
| `Promise.race` | First settlement | First settled value | First settled reason |
| `Promise.any` | First fulfillment | First fulfilled value | `AggregateError` (all) |

## Visual Decision Tree

```
Need all results?
    ├─ Yes → Need all even if some fail?
    │        ├─ Yes → Promise.allSettled
    │        └─ No  → Promise.all
    └─ No  → Need first result?
             ├─ Any result (success or failure)?
             │       └─ Promise.race
             └─ Only success?
                     └─ Promise.any
```

## Q&A

| Question | Answer |
|----------|--------|
| Does `Promise.race` cancel losers? | No. They continue executing. Results are ignored. |
| When use `Promise.race`? | Timeouts, request racing (fastest server), user interaction timeouts. |
| Does `Promise.allSettled` ever reject? | No. Always fulfills with array of result objects. |
| When use `allSettled` instead of `all`? | When you need partial results even if some operations fail. |
| What if one fulfills and another rejects in `Promise.any`? | Resolves with first fulfillment. Rejection ignored. |
| How is `any` different from `race`? | `race` settles on first (success or failure). `any` only settles on first success. |
## Next Steps

[Back to Chapter 12](12-promise-all.md): Promise.all()
[Proceed to Chapter 14](14-event-loop.md): Event Loop to learn about event loop.
