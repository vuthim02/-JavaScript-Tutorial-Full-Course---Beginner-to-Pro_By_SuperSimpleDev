# Task Queues: Macrotask vs Microtask

## Macrotask Queue (Lower Priority)

One macrotask is processed per event loop iteration.

### Examples

```
setTimeout
setInterval
setImmediate (Node.js)
DOM events (click, keydown, mousemove)
I/O callbacks (Node.js)
UI rendering
```

### Multiple Macrotasks

```javascript
setTimeout(() => console.log("A"), 0);
setTimeout(() => console.log("B"), 0);
setTimeout(() => console.log("C"), 0);

// Output: A B C (one per event loop iteration)
```

Each callback is a separate macrotask, processed one per iteration, FIFO order.

### Macrotask Queue Behavior

```
Event Loop Iteration 1:
  - Process macrotask A (log "A")
  - Drain microtasks (none)

Event Loop Iteration 2:
  - Process macrotask B (log "B")
  - Drain microtasks (none)

Event Loop Iteration 3:
  - Process macrotask C (log "C")
  - Drain microtasks (none)
```

## Microtask Queue (Higher Priority)

Microtasks are processed **immediately after the current task**, before the next macrotask.

### Contains

```
Promise.then / catch / finally
queueMicrotask()
MutationObserver (browser)
process.nextTick (Node.js – even higher priority)
```

### Example

```javascript
console.log("A");

setTimeout(() => console.log("B"));

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

Output:

```
A
D
C
B
```

### Execution Breakdown

```
Synchronous code:
  log("A") → "A"
  setTimeout → macrotask queue: [log("B")]
  Promise.resolve().then(...) → microtask queue: [log("C")]
  log("D") → "D"

Stack empty → drain microtask queue:
  log("C") → "C"
  microtask queue: []

Stack empty → pick next macrotask:
  log("B") → "B"
  macrotask queue: []
```

### Microtask Inside Microtask

```javascript
Promise.resolve()
    .then(() => {
        console.log("A");
        Promise.resolve().then(() => console.log("B"));
    })
    .then(() => console.log("C"));

// Output: A B C
```

Tracing:

```
1. p1 handler: logs "A", queues microtask for "B", returns undefined
2. p1 fulfills → p1.then handler (for "C") queued as microtask
3. "B" microtask runs: logs "B"
4. "C" microtask runs: logs "C"
```

### Microtask Starvation

If microtasks keep queueing new microtasks, macrotasks never run:

```javascript
function loop() {
    Promise.resolve().then(loop);
}

loop();

setTimeout(() => console.log("Never runs"), 1000);
```

The `setTimeout` callback never executes because microtasks are infinite.

## Q&A

| Question | Answer |
|----------|--------|
| Promise callbacks? | Microtask queue (`.then()`, `.catch()`, `.finally()`). |
| Timer callbacks? | Macrotask queue (`setTimeout`, `setInterval`). |
| Which queue has priority? | Microtask queue is drained completely before next macrotask. |
| Can microtasks starve macrotasks? | Yes. If microtasks queue more microtasks, macrotasks never run. |
| What about `queueMicrotask()`? | Explicit microtask queueing, same priority as promise callbacks. |
## Next Steps

[Back to Chapter 14](14-event-loop.md): Event Loop
[Proceed to Chapter 16](16-event-listeners.md): Event Listeners to learn about event listeners.
