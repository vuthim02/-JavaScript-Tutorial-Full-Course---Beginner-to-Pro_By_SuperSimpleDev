# Event Loop — The Six Phases

<img src="https://media.giphy.com/media/l0HlwKpPGceLgQC9W/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


```
   ┌──────────┐
   │  Timers  │   ← setTimeout, setInterval callbacks
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Pending  │   ← I/O callbacks deferred to next iteration
   │ Callbacks│
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Idle,   │   ← Internal use
   │ Prepare  │
   └────┬─────┘
        ▼
   ┌──────────┐
   │   Poll   │   ← Retrieve new I/O events, execute callbacks
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Check   │   ← setImmediate callbacks
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Close    │   ← close event callbacks (socket.on('close'))
   │ Callbacks│
   └──────────┘
```

---

## Phase Details

### 1. Timers Phase

```javascript
setTimeout(() => {
    console.log('Timer callback');
}, 0);
// Executes in the timers phase when the threshold is reached
// "0" means "as soon as possible", not "immediately"
// Minimum delay: 1ms (clamped by OS)
```

### 2. Pending Callbacks

Executes I/O callbacks deferred to the next loop iteration. For example, `TCP error` callbacks.

### 3. Idle/Prepare

Internal use only.

### 4. Poll Phase

**Most important phase**. Does:

- If timers are due → loop back to timers phase.
- If `setImmediate` callbacks are queued → proceed to check phase.
- Otherwise, wait for new I/O events (blocking with timeout).

```javascript
const fs = require('fs');

fs.readFile('file.txt', () => {
    console.log('I/O callback — executes in poll phase');
});

setImmediate(() => {
    console.log('Check phase — after poll');
});

setTimeout(() => {
    console.log('Timers phase — before poll on next iteration');
}, 0);
```

### 5. Check Phase

Executes `setImmediate()` callbacks.

```javascript
setImmediate(() => {
    console.log('Check phase: runs after poll');
});
```

### 6. Close Callbacks

Executes close event callbacks (e.g., `socket.on('close')`).

---

## Microtasks Between Phases

After each phase, the event loop processes:

1. **`process.nextTick()` queue** — entire queue is drained.
2. **Promise microtask queue** — entire queue is drained.

```javascript
console.log('Start');

setTimeout(() => console.log('Timer'), 0);
setImmediate(() => console.log('Immediate'));

Promise.resolve().then(() => console.log('Promise'));
process.nextTick(() => console.log('NextTick'));

console.log('End');

// Output:
// Start
// End
// NextTick        ← drained after each phase, before macrotasks
// Promise         ← drained after nextTick
// Timer/Immediate ← depends on phase (order varies)
```

---

## setImmediate vs setTimeout(fn, 0)

In the event loop:

- If both are called from the **main module**, the order depends on the phase when the loop starts.
- If both are called from an **I/O callback**, `setImmediate` always runs first (check phase after poll).

```javascript
const fs = require('fs');

fs.readFile(__filename, () => {
    setTimeout(() => console.log('timeout'), 0);
    setImmediate(() => console.log('immediate'));
});
// Output:
// immediate
// timeout
```

---

## Q&A

| Question | Answer |
|----------|--------|
| Which phase is this callback in? | Depends on what triggered it |
| Macrotask or microtask? | Macrotask: timers, I/O, setImmediate. Microtask: nextTick, Promise |
| Will this block the event loop? | Long synchronous code blocks all phases |
| Starvation possible? | Infinite microtasks starve macrotasks |
## Next Steps

[Back to Chapter 1](01-node-architecture.md): Node.js Architecture — V8 + libuv + Node APIs
[Proceed to Chapter 3](03-thread-pool.md): Thread Pool — libuv Internals to learn about thread pool — libuv internals.
