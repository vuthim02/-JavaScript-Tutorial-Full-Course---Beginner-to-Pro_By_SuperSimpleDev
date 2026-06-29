# Memory Leaks in Async Code

<img src="https://media.giphy.com/media/NSzHiAwAcazs7dcDr9/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## The Danger of Forgotten Timers

Repeated timers that are never stopped:

```javascript
// Memory leak!
setInterval(() => {}, 1000);
// Forgot to stop — runs forever
```

The callback (and its closure) cannot be garbage collected.

## Closures Holding Large Objects

```javascript
function createLeak() {
    const hugeData = new Array(1000000).fill("data");

    setInterval(() => {
        // hugeData is in the closure → never GC'd
        console.log(hugeData.length);
    }, 1000);
}

createLeak();
// hugeData lives forever because the closure keeps a reference
```

## Forgotten Event Listeners

```javascript
class Component {
    mount() {
        this.handler = () => { this.update(); };
        window.addEventListener("resize", this.handler);
        // If component is unmounted but handler not removed:
        // → component cannot be GC'd
        // → handler still runs (accessing unmounted component)
    }

    destroy() {
        // Must do this:
        window.removeEventListener("resize", this.handler);
    }
}
```

## Unresolved Promises

```javascript
function leakingPromise() {
    return new Promise((resolve) => {
        // Promise never resolves → .then() callbacks wait forever
    });
}

const leak = leakingPromise();
leak.then(() => {
    // This callback is held forever
});
```

## Detached DOM Nodes

```javascript
const elements = [];

function leak() {
    const div = document.createElement("div");
    div.textContent = "Hello";
    document.body.appendChild(div);
    elements.push(div); // Reference stored in array

    // Even after removing from DOM, div is still referenced by `elements`
}
```

## Preventing Memory Leaks

```javascript
// 1. Clean up timers
const timerId = setInterval(fn, 1000);
clearInterval(timerId);

// 2. Remove event listeners
element.removeEventListener("click", handler);

// 3. Clear references
data = null;

// 4. Use WeakMap / WeakSet for optional references
const cache = new WeakMap();

// 5. Avoid retaining large objects in closures
function safe() {
    const data = getHugeData();
    process(data);
    // data goes out of scope after function returns
}
```

## Detecting Memory Leaks

```javascript
// Chrome DevTools:
// 1. Performance tab → record activity
// 2. Memory tab → take heap snapshots
// 3. Look for detached DOM nodes, growing counts

// Node.js:
console.log(process.memoryUsage());
// { rss, heapTotal, heapUsed, external }
```

## Q&A

| Question | Answer |
|----------|--------|
| What causes a closure to leak? | A reference to the closure is held by a long-lived object (timer, event listener, global). |
| How do forgotten event listeners cause leaks? | Listener holds reference to the bound object, preventing GC. |
| Can promises cause memory leaks? | Yes, if they never settle or are held in a long-lived array. |
| How to detect a memory leak? | Growing memory over time, heap snapshots showing retained objects. |
| What tool do you use? | Chrome DevTools Memory tab, Node.js `--inspect`, `process.memoryUsage()`. |
## Next Steps

[Back to Chapter 19](19-debounce-throttle.md): Debouncing and Throttling
[Proceed to Chapter 21](21-review-checklist.md): Senior Reverse Engineering Checklist to learn about senior reverse engineering checklist.
