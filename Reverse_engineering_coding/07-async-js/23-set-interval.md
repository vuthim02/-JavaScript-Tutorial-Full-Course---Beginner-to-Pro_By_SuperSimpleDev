# setInterval & clearInterval

<img src="https://media.giphy.com/media/3oEjI9xj49ehuAGLQY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What is setInterval?

Repeatedly executes a callback at a fixed interval (in milliseconds).

```javascript
const intervalId = setInterval(() => {
    console.log("Tick");
}, 1000); // Every 1000ms
```

## Stopping the Interval

```javascript
let counter = 0;
const intervalId = setInterval(() => {
    counter++;
    console.log(counter);
    if (counter >= 5) {
        clearInterval(intervalId);
        console.log("Stopped");
    }
}, 500);
// Output: 1 2 3 4 5 Stopped
```

## setInterval vs Recursive setTimeout

```javascript
// setInterval — fires every N ms, regardless of execution time
setInterval(() => {
    heavyWork(); // Takes 300ms
}, 1000);
// Gap between end and next start: ~700ms
// But if heavyWork takes >1000ms, calls overlap!

// Recursive setTimeout — waits for completion before next
function tick() {
    heavyWork(); // Takes 300ms
    setTimeout(tick, 1000);
}
// Next call starts 1000ms AFTER previous finishes
// Gap between end and next start: always 1000ms
```

### Drift Problem with setInterval

```javascript
// setInterval drifts — callback execution time pushes schedule
let scheduled = Date.now() + 1000;
setInterval(() => {
    const now = Date.now();
    console.log("Drift:", now - scheduled);
    heavyWork(); // Takes 200ms
    scheduled += 1000;
}, 1000);

// Recursive setTimeout self-corrects
function schedule() {
    const start = Date.now();
    setTimeout(() => {
        heavyWork();
        schedule(); // Schedule next from completion
    }, Math.max(0, 1000 - (Date.now() - start)));
}
```

## Clearing All Intervals

```javascript
// Clear all intervals (cleanup for tests)
const highestId = setTimeout(() => {}, 0);
for (let i = 1; i <= highestId; i++) {
    clearInterval(i);
}
```

## Minimum Delay & Nesting

Like `setTimeout`, `setInterval` has a 4ms minimum after 5+ levels of nesting.

## Passing Arguments

```javascript
function greet(name) {
    console.log(`Hello, ${name}!`);
}

const intervalId = setInterval(greet, 2000, "Alice");
// Every 2s: "Hello, Alice!"

clearInterval(intervalId);
```

## Common Pitfall: Forgetting to Clear

```javascript
function startPolling() {
    setInterval(async () => {
        const data = await fetch("/api/status");
        // If component unmounts, this still runs!
    }, 5000);
}
// Memory leak! Timer never cleared
```

**Always save the interval ID and clear on cleanup.**

## Performance Concerns

Each interval keeps its callback + closure in memory. Many concurrent intervals can degrade performance.

## Use Cases

| Use Case | Interval |
|----------|----------|
| Polling server status | 5-30 seconds |
| UI clock / timer | 1000ms |
| Animation fallback | 16ms (60fps) |
| Auto-save draft | 30-60 seconds |

## setInterval in Node.js

```javascript
// Node.js addional: setImmediate and unref()
const timer = setInterval(() => {
    console.log("Running");
}, 1000);

// Don't keep process alive just for this timer
timer.unref(); // Process can exit even if timer is active

// Re-enable
timer.ref();
```

## Q&A

| Question | Answer |
|----------|--------|
| What does setInterval return? | A timer ID (number in browser, object in Node.js) |
| How do you stop it? | `clearInterval(intervalId)` |
| Does setInterval guarantee exact timing? | No — minimum delay, subject to stack availability |
| What if callback takes longer than interval? | Callbacks will queue and may overlap |
| Difference from recursive setTimeout? | setInterval schedules at fixed rate regardless of execution time |
| What happens when page is hidden? | Browsers throttle to 1 call per second minimum |
| Can interval run after clearInterval? | No — but if a callback is already queued, it still runs |
## Next Steps

[Back to Chapter 22](22-projects.md): Projects
[Proceed to Chapter 24](24-request-animation-frame.md): requestAnimationFrame to learn about requestanimationframe.
