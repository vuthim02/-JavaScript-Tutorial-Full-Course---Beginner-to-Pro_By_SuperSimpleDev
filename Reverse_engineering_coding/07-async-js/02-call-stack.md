# The Call Stack

<img src="https://media.giphy.com/media/l0HlwKpPGceLgQC9W/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What is the Call Stack?

A LIFO (Last In, First Out) data structure that tracks function execution.

```
Push: function call
Pop:  function return
```

## Example

```javascript
function one() { two(); }
function two() { three(); }
function three() { console.log("Done"); }

one();
```

## Stack Trace Visualization

```
t=0:  [Global]
t=1:  [Global, one]
t=2:  [Global, one, two]
t=3:  [Global, one, two, three]
t=4:  [Global, one, two, three, console.log]  // "Done"
t=4:  [Global, one, two, three]
t=4:  [Global, one, two]
t=4:  [Global, one]
t=4:  [Global]
t=4:  []
```

## Stack Overflow

When the stack exceeds its maximum size (usually ~10,000 frames).

```javascript
function explode() { explode(); }
explode();
// RangeError: Maximum call stack size exceeded
```

## Stack Trace in Errors

```javascript
function a() { b(); }
function b() { c(); }
function c() { throw new Error("Boom"); }
a();
```

Output:

```
Error: Boom
    at c (script.js:3:23)
    at b (script.js:2:15)
    at a (script.js:1:15)
    at Global (script.js:5:1)
```

The stack trace shows the **path** to the error.

## Async Stack Traces

Modern engines preserve async stack traces:

```javascript
async function a() { await b(); }
async function b() { await c(); }
async function c() { throw new Error("Async Boom"); }

a().catch(err => console.log(err.stack));
```

Output:

```
Error: Async Boom
    at c (script.js:7:11)
    at async b (script.js:4:5)
    at async a (script.js:1:5)
```

Note the `async` markers.

## Q&A

| Question | Answer |
|----------|--------|
| Which function entered last? | `three()` |
| Which exits first? | `three()` — LIFO order |
| How many frames can the stack hold? | ~10,000 (varies by engine, ~1MB size limit) |
| How do you read a stack trace? | Bottom is entry point, top is where error occurred. |
| What causes stack overflow? | Infinite recursion or extremely deep call chain. |
| Can you inspect the stack programmatically? | `console.trace()` prints current stack; `new Error().stack` captures it. |
| Are async functions on the same stack? | No. `await` suspends the function; the continuation runs in a new microtask on an empty stack. |
## Next Steps

[Back to Chapter 1](01-sync-vs-async.md): Synchronous vs Asynchronous Execution
[Proceed to Chapter 3](03-web-apis.md): Web APIs and Node APIs to learn about web apis and node apis.
