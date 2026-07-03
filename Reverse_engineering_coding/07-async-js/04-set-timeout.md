# setTimeout

## How setTimeout Works

The timer is managed by the Web API environment, not by the JavaScript engine.

```javascript
console.log("A");
setTimeout(() => {
    console.log("B");
}, 1000);
console.log("C");
```

Output:

```
A
C
B
```

Many beginners expect `A B C`. Wrong.

## Step-by-Step Execution Trace

**Step 1:** `console.log("A")` executes on the stack. Output: `A`.

**Step 2:** `setTimeout()` is encountered. The timer registration is handed to the Web API environment. The timer runs **outside** JavaScript.

```
Web APIs:
  ┌──────────────────────────────┐
  │ Timer: 1000ms                │
  │ Callback: ()=>console.log(B) │
  └──────────────────────────────┘
```

**Step 3:** `console.log("C")` executes. Output: `C`.

**After 1000ms:** The Web API timer fires. The callback enters the **Task Queue**:

```
Task Queue (Macrotask):
  ┌──────────────────────────────┐
  │ ()=>console.log("B")         │
  └──────────────────────────────┘
```

**When stack empty:** The Event Loop pushes the callback onto the stack. Output: `B`.

## Key Insight: setTimeout(fn, 0)

Even with 0 delay, the callback is **deferred**:

```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// Output: A C B
```

The callback must wait for:
1. Current synchronous code to finish
2. All pending microtasks to drain
3. The event loop to pick the next macrotask

## Nested setTimeout

```javascript
setTimeout(function tick() {
    console.log("tick");
    setTimeout(tick, 500);
}, 500);
```

Unlike `setInterval`, this guarantees a delay between the **end** of one execution and the **start** of the next.

## Passing Arguments

```javascript
function greet(name) {
    console.log("Hello, " + name);
}
setTimeout(greet, 1000, "Alice");
// After 1s: "Hello, Alice"
```

## Cancelling setTimeout

```javascript
const timerId = setTimeout(() => {
    console.log("This never runs");
}, 5000);
clearTimeout(timerId); // Cancelled
```

## The Minimum Delay Rule

| Nested Call Depth | Minimum Delay |
|------------------|---------------|
| 1st - 5th call   | 0ms           |
| 6th+ call        | 4ms           |

HTML spec mandates 4ms minimum after 5 nested calls:

```javascript
let depth = 0;
function recurse() {
    depth++;
    console.log(depth, Date.now());
    setTimeout(recurse, 0);
}
recurse();
// After depth 5, each call is ~4ms apart
```

## setTimeout with Strings (Do Not Use)

```javascript
setTimeout("console.log('evil')", 1000); // Works but uses eval()
```

Never pass a string. Always pass a function reference.

## Q&A

| Question | Answer |
|----------|--------|
| Who owns the timer? | The Web API environment, not the JS engine. |
| Is callback immediately executed? | No. Deferred until stack is empty. |
| What must happen before callback runs? | Stack empty, microtasks drained, event loop picks it up. |
| Actual minimum delay of `setTimeout(fn, 0)`? | 0ms in theory, but cannot run until current execution finishes. |
| What if stack never empties? | The callback never runs. |
| Does `setTimeout` block? | No. Returns immediately. Timer runs in background. |
| Can you rely on exact 1000ms timing? | No. It's a minimum delay. Busy stack = much later. |
| Difference between setInterval and recursive setTimeout? | setInterval drifts (delay from schedule). Recursive setTimeout waits for completion before next. |
## Next Steps

[Back to Chapter 3](03-web-apis.md): Web APIs and Node APIs
[Proceed to Chapter 5](05-callbacks.md): Callback Functions to learn about callback functions.
