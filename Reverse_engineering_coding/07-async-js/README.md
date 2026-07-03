# Part 7 — Asynchronous JavaScript

Split from the main `part7-asynchronous-javascript.md` into focused subtopic files.

## Files

| # | File | Topic |
|---|------|-------|
| 01 | [01-sync-vs-async.md](01-sync-vs-async.md) | Synchronous vs asynchronous execution, blocking code, and the problem it solves |
| 02 | [02-call-stack.md](02-call-stack.md) | Call stack mechanics, stack overflow, stack traces |
| 03 | [03-web-apis.md](03-web-apis.md) | Web APIs / Node APIs — what runs outside the JS engine |
| 04 | [04-set-timeout.md](04-set-timeout.md) | `setTimeout` in depth: execution trace, minimum delay, cancellation |
| 05 | [05-callbacks.md](05-callbacks.md) | Callback functions, sync vs async callbacks |
| 06 | [06-callback-hell.md](06-callback-hell.md) | Pyramid of Doom, inversion of control |
| 07 | [07-promises.md](07-promises.md) | Promise states, creation, resolve/reject |
| 08 | [08-then-catch-finally.md](08-then-catch-finally.md) | `.then()`, `.catch()`, `.finally()` methods |
| 09 | [09-promise-chaining.md](09-promise-chaining.md) | Promise chaining, error propagation |
| 10 | [10-async-await.md](10-async-await.md) | `async` functions, `await`, top-level await |
| 11 | [11-fetch-api.md](11-fetch-api.md) | Fetch API, response handling, AbortController |
| 12 | [12-promise-all.md](12-promise-all.md) | `Promise.all()` — parallel execution |
| 13 | [13-promise-race-allsettled-any.md](13-promise-race-allsettled-any.md) | `Promise.race()`, `.allSettled()`, `.any()` |
| 14 | [14-event-loop.md](14-event-loop.md) | Event loop algorithm, architecture, full cycle |
| 15 | [15-task-queues.md](15-task-queues.md) | Macrotask queue vs microtask queue, starvation |
| 16 | [16-event-listeners.md](16-event-listeners.md) | Event listeners, propagation, async handlers |
| 17 | [17-error-handling.md](17-error-handling.md) | Async error handling, try/catch, global handlers |
| 18 | [18-concurrency-patterns.md](18-concurrency-patterns.md) | Sequential vs parallel execution, mixed patterns |
| 19 | [19-debounce-throttle.md](19-debounce-throttle.md) | Debouncing and throttling implementations |
| 20 | [21-review-checklist.md](21-review-checklist.md) | Senior reverse engineering checklist + summary |
| 21 | [22-projects.md](22-projects.md) | Project examples: timer, API client, retry, search |
| 22 | [23-set-interval.md](23-set-interval.md) | `setInterval` & `clearInterval`, drift, recursive setTimeout vs setInterval |
| 23 | [24-request-animation-frame.md](24-request-animation-frame.md) | `requestAnimationFrame`, FPS control, delta-time animation |
| 24 | [25-web-workers.md](25-web-workers.md) | Web Workers, message passing, transferable objects, worker types |
| 25 | [26-generators-async-iteration.md](26-generators-async-iteration.md) | Generators, `yield`, `yield*`, `async function*`, `for await...of` |

## Usage

Each file is self-contained (100-200 lines) with code examples and Q&A tables.
Read in order for a complete course, or jump to specific topics as needed.

## Practice

Test your understanding with coding exercises:

```bash
node ../exercises/07-async-js.js
```

## Next Steps

[Back to Module 6](../06-prototypes-classes/README.md): Objects, Prototypes, Classes, Constructors, `this`

[Proceed to Module 8](../08-modules-build/README.md): Modules, npm, Bundlers & Build Tools to learn about modules and build tooling in JavaScript.
