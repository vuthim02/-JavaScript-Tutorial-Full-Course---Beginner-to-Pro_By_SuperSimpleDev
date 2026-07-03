# Senior Reverse Engineering Checklist

Whenever reading asynchronous code, ask these questions:

## Is operation synchronous or asynchronous?

Look for callbacks, promises, `async/await`, timers, fetch, event listeners.

## Who owns this callback?

Does a library own it? The runtime? Can it be called multiple times?

## Which queue?

- **Microtask?** (Promise, queueMicrotask)
- **Macrotask?** (setTimeout, setInterval, event listener, I/O)

## What starts execution?

User action? Timer? Network response? Promise resolution?

## What pauses execution?

`await`? Missing callback? Deadlock? Race condition?

## Is code sequential?

Could it be parallel? Are there dependencies between operations?

## Can tasks run concurrently?

If independent, use `Promise.all`. If dependent, chain them.

## Which promise resolves first?

Trace the timings. Are there race conditions?

## What happens on failure?

Is there a `.catch()`? A `try/catch`? An unhandled rejection?

## Will memory be cleaned?

Are timers cleared? Listeners removed? Closures released?

## Can callback run multiple times?

Raw callbacks can be invoked multiple times (unlike promises).

## Is there a race condition?

When multiple async operations compete, verify which one settles first and whether that matters for correctness.

## Are promises properly awaited?

Unawaited promise calls lead to unhandled rejections and unexpected execution order.

## How to approach unfamiliar async code?

1. Identify all async operations (fetch, setTimeout, events, promises)
2. Trace the execution order using the event loop model
3. Determine which operations are sequential vs parallel
4. Check error handling paths
5. Verify cleanup (timers, listeners, subscriptions)

---

# Part 7 Summary

| Concept | Key Takeaway |
|---------|-------------|
| Synchronous | Blocking, sequential, LIFO stack |
| Asynchronous | Non-blocking, deferred execution |
| setTimeout | Deferred callback (macrotask) |
| Call Stack | Single-threaded, LIFO |
| Web APIs | Environment-provided, run outside engine |
| Callback | Function executed later |
| Callback Hell | Deeply nested async callbacks |
| Promise | Future value (pending/fulfilled/rejected) |
| .then() | Handles fulfillment |
| .catch() | Handles rejection |
| .finally() | Always runs |
| Chaining | Flat async sequence |
| async function | Always returns promise |
| await | Pauses current async function |
| Fetch API | Browser HTTP client (returns promise) |
| Promise.all | Parallel, short-circuits on error |
| Promise.race | First settled wins |
| Promise.allSettled | All results, never rejects |
| Promise.any | First success wins |
| Event Loop | Coordinates stack + queues |
| Macrotask Queue | setTimeout, events, I/O |
| Microtask Queue | Promise callbacks, higher priority |
| Event Listeners | User interaction → macrotask |
| Error Handling | try/catch with async/await, .catch() in chains |
| Sequential | One at a time, depends on previous |
| Parallel | All at once with Promise.all |
| Debouncing | Wait until pause before executing |
| Throttling | Limit execution rate |
| Memory Leaks | Forgotten timers, listeners, closures |
## Next Steps

[Back to Module 12 Chapter 9](../12-v8-engine/09-memory-leaks-globals-timers-dom.md): Memory Leaks — Globals, Timers & DOM
[Proceed to Chapter 22](22-projects.md): Projects to learn about projects.
