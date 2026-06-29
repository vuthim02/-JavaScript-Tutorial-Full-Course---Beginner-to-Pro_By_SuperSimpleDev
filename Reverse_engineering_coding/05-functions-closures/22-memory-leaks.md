# Memory Leaks

<img src="https://media.giphy.com/media/NSzHiAwAcazs7dcDr9/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Is a Memory Leak?

Memory that is **no longer needed** but **still reachable** — so the GC cannot reclaim it. The program's heap grows without bound.

## The 6 Most Common Leak Patterns

### 1. Accidental Globals

```javascript
function processData() {
    result = []; // ❌ forgot `let/const/var` — becomes global!
    for (let i = 0; i < 10000; i++) {
        result.push({ index: i, data: "..." });
    }
}
processData();
// `result` is now on `window`/`global` — never GC'd!

// ✅ Fix: always declare variables
function processData() {
    const result = []; // local — GC'd when function returns
}
```

### 2. Forgotten Timers

```javascript
function startPolling() {
    const hugeData = loadAllUsers(); // 100MB of data

    setInterval(() => {
        // closure retains hugeData forever
        console.log(`Polling ${hugeData.length} users`);
    }, 5000);
    // interval never cleared → hugeData lives forever!
}

// ✅ Fix: save and clear the timer ID
function startPolling() {
    const hugeData = loadAllUsers();
    const id = setInterval(() => {
        console.log(`Polling ${hugeData.length} users`);
    }, 5000);

    return () => clearInterval(id); // return cleanup function
}
const stop = startPolling();
// Later:
stop(); // clears interval → hugeData becomes GC eligible
```

### 3. Forgotten Event Listeners

```javascript
// ❌ Leak: listener holds reference to this, keeping component alive
class UserPanel {
    constructor() {
        this.data = loadUserData(); // large object
        document.addEventListener("resize", () => {
            this.render(); // `this` is captured in closure
        });
        // Even if UserPanel "destroyed", listener keeps it alive
    }
}

// ✅ Fix: remove listener on cleanup
class UserPanel {
    constructor() {
        this.data = loadUserData();
        this._onResize = () => this.render();
        document.addEventListener("resize", this._onResize);
    }
    destroy() {
        document.removeEventListener("resize", this._onResize);
        this.data = null;
    }
}
```

### 4. Detached DOM Nodes

```javascript
const detachedCache = [];

function createHeavyElement() {
    const el = document.createElement("div");
    el.innerHTML = "<p>".repeat(10000);
    document.body.appendChild(el);
    detachedCache.push(el); // ← holds reference
    document.body.removeChild(el); // removed from DOM
    // BUT: detachedCache still references it → NOT GC'd!
}

// ✅ Fix: use WeakRef or clear the array
const cache = new WeakMap(); // or clear references manually
```

### 5. Unbounded Caches

```javascript
// ❌ Cache grows forever
const cache = {};
function compute(key) {
    if (!cache[key]) {
        cache[key] = heavyComputation(key);
    }
    return cache[key];
}

// ✅ Fix: bounded cache (LRU pattern)
class LRUCache {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.cache = new Map();
    }
    get(key) {
        if (!this.cache.has(key)) return undefined;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value); // move to end (most recently used)
        return value;
    }
    set(key, value) {
        if (this.cache.has(key)) this.cache.delete(key);
        if (this.cache.size >= this.maxSize) {
            this.cache.delete(this.cache.keys().next().value); // evict oldest
        }
        this.cache.set(key, value);
    }
}
```

### 6. Closures Capturing Large Data

```javascript
// ❌ Inner function only needs `config.id`, but captures entire config
function createHandler(config) {
    return function handle(event) {
        // only uses config.id
        console.log(`Event ${event.type} on ${config.id}`);
        // But config (possibly huge) is kept alive by this closure!
    };
}

// ✅ Extract only what's needed
function createHandler(config) {
    const { id } = config; // extract only `id`
    // config itself can now be GC'd
    return function handle(event) {
        console.log(`Event ${event.type} on ${id}`);
    };
}
```

## Detecting Leaks

```javascript
// Browser: Chrome DevTools → Memory → Take Heap Snapshot
// Compare snapshots over time — growing objects are the leak

// Node.js: Check heap usage
setInterval(() => {
    const { heapUsed, heapTotal } = process.memoryUsage();
    console.log(`Heap: ${(heapUsed / 1024 / 1024).toFixed(1)}MB / ${(heapTotal / 1024 / 1024).toFixed(1)}MB`);
}, 5000);
```

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Is there an accidental global? | Check for undeclared variables (`x = value` without `let/const/var`). |
| Is there a timer that's never cleared? | `setInterval`/`setTimeout` that holds references via closure. |
| Is there an event listener not removed? | DOM elements or global objects with dangling listeners. |
| Is there an unbounded cache? | `Map` or object used as cache without size limit. |
| Does a closure capture more than needed? | Extract only the needed properties before the closure. |
| Are there detached DOM nodes? | References to removed DOM elements held in JS variables or arrays. |
| How to detect leaks? | Heap snapshots in Chrome DevTools, comparing growth over time. |
## Next Steps

[Back to Chapter 21](21-garbage-collection.md): Garbage Collection
[Proceed to Chapter 23](23-weakref-finalization.md): `WeakRef` & `FinalizationRegistry` to learn about `weakref` & `finalizationregistry`.
