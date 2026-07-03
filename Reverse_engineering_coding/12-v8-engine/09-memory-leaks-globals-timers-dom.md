# 09 — Memory Leaks: Globals, Timers & Detached DOM

## Global Variables

### The Problem

```javascript
function setUser(name) {
    user = name;  // No let/const/var — accidental global!
}

setUser("John");
```

In non-strict mode, assignment to undeclared variable creates a property on the global object.

```javascript
// What actually happens:
window.user = "John";  // browser
globalThis.user = "John"; // Node
```

The global object is a **root**. Global variables are never GC'd until the page closes.

### Detection

```javascript
'use strict';

function setUser(name) {
    user = name;  // ReferenceError in strict mode
}
```

### Prevention

- Always use `'use strict'`.
- Use `let`, `const`, or `var`.
- Lint with ESLint `no-undef` rule.

## Forgotten Timers

### The Problem

```javascript
function startUpdates() {
    setInterval(() => {
        // fetch data, update DOM, etc.
    }, 1000);
}

startUpdates();
// Later the component is destroyed
// But the interval continues forever
```

The interval callback references variables in its closure. As long as the interval is active:
- The callback is referenced by the timer system.
- Everything the callback closes over is retained.
- **Never collected.**

### Retained Memory

```javascript
function startUpdates() {
    let hugeData = new Array(10000000);

    setInterval(() => {
        console.log(hugeData.length); // Closure keeps hugeData alive
    }, 1000);
}

startUpdates();
// hugeData can never be GC'd while interval runs
```

### The Fix

```javascript
const intervalId = setInterval(() => {
    // do work
}, 1000);

// When stopping:
clearInterval(intervalId);
```

### Pattern: Self-Cleaning Timeout

```javascript
function startUpdates(duration) {
    const intervalId = setInterval(() => {
        // do work
    }, 1000);

    setTimeout(() => clearInterval(intervalId), duration);
}
```

## Detached DOM Nodes

### The Problem

```javascript
let button = document.getElementById('myButton');
button.addEventListener('click', () => {
    console.log('clicked');
});

// Later: remove the button from DOM
button.remove();
// But: `button` variable still exists
// And: the event listener still references the callback
// And: the callback closes over `button`
// The DOM node is detached but NOT GC'd
```

The DOM node is no longer in the document tree (detached), but JavaScript still holds a reference to it.

### How It Leaks

```
DOM Tree                  JavaScript Heap
┌─────────────┐          ┌──────────────┐
│ document     │          │  button (var)│
│   └── ...    │          │       │      │
└─────────────┘          │       ▼      │
                          │  ┌─────────┐ │
The node is removed      │  │ button  │ │
from the DOM but         │  │ element │ │
still referenced         │  │ (hidden)│ │
in JS                    │  └─────────┘ │
                          └──────────────┘
```

### The Fix

```javascript
button.removeEventListener('click', handler);
button = null;  // Allow GC to reclaim the element
```

Or use a `WeakRef` / `AbortController`:

```javascript
const controller = new AbortController();
button.addEventListener('click', handler, { signal: controller.signal });

// Later:
controller.abort(); // Removes all listeners on that signal
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this variable global? | Check if declared with `let`/`const`/`var` |
| Does `x = 5` create a global? | Yes, in non-strict mode |
| Can globals be collected? | Only if removed from global object |
| Is interval cleared? | If not, memory leak |
| What does the callback retain? | Entire closure scope |
| Is this node in the DOM tree? | If no, but referenced → detached node leak |
## Next Steps

[Back to Chapter 8](08-generational-gc.md): 08 — Generational Garbage Collection
[Proceed to Chapter 10](10-memory-leaks-closures-caches.md): 10 — Memory Leaks: Closures & Cache Growth to learn about 10 — memory leaks: closures & cache growth.
