# Synchronous vs Asynchronous Execution
<img src="https://miro.medium.com/v2/resize:fit:1400/1*DKk0FVYVE5aSi88g7UqpzA.gif" >
## Synchronous Execution

Each operation blocks until it finishes. The call stack processes one function at a time from top to bottom.

```javascript
console.log("A");
console.log("B");
console.log("C");
```

Output:

```
A
B
C
```

**Call stack timeline:**

```
t=0:  [Global]
t=0:  [Global, console.log("A")]
t=0:  [Global]
t=0:  [Global, console.log("B")]
t=0:  [Global]
t=0:  [Global, console.log("C")]
t=0:  [Global]
t=0:  []
```

Everything waits. No interleaving. No concurrency.

## Blocking Example

```javascript
function wait(seconds) {
    const start = Date.now();
    while (Date.now() - start < seconds * 1000) {
        // Busy-wait: completely blocks the thread
    }
}

console.log("Start");
wait(3);  // Browser freezes for 3 seconds
console.log("End");
```

Output (after 3 second freeze):

```
Start
End
```

## Why Blocking is a Problem

| Scenario | Effect |
|----------|--------|
| Network request (3s) | Entire page frozen for 3s |
| Large file parse (500ms) | Buttons unresponsive for 500ms |
| Image processing (2s) | Animations stop, UI dead |

## The Problem

If JavaScript waits for a 10-second download:

```javascript
downloadHugeFile();
console.log("Done");
```

Browser freezes for 10 seconds.

## What Happens During a Freeze

```
User tries to click a button
         │
         ▼
Click event enqueued → but stack is blocked by downloadHugeFile()
         │
         ▼
Event Loop cannot process the click (stack not empty)
         │
         ▼
After 10 seconds, stack empties → click finally processed
         │
         ▼
User already closed the tab
```

## The Real Cost

```
10 second freeze = 50% of users will leave
               = 0 conversions during that time
               = Broken user trust
```

## The Solution: Non-blocking Execution

1. Start the long operation
2. Return immediately
3. Get notified when done
4. Handle the result later

## Q&A

| Question | Answer |
|----------|--------|
| Which line executes first? | Line 1 |
| Can line 3 run before line 2? | No. Synchronous code is strictly sequential. |
| What happens to the call stack during `wait(3)`? | `wait` sits on the stack for 3 seconds. No other code can execute. |
| How can you detect blocking code in production? | Chrome DevTools Performance tab shows long tasks (>50ms) in red. |
| What is the RAIL model? | Response (<50ms), Animation (<16ms), Idle (50ms chunks), Load (<1s initial). |
| Why does a freeze happen? | The call stack is occupied. The event loop cannot push new work. |
| Can the browser render during a freeze? | No. Rendering is also a task that needs the stack empty. |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-call-stack.md): The Call Stack to learn about the call stack.
