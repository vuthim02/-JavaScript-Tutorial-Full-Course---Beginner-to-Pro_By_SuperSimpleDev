# 10 — Memory Leaks: Closures & Cache Growth

<img src="https://media.giphy.com/media/Npdl9kOaKFJHuRCBGx/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Closures Holding Large Data

### The Problem

```javascript
function createProcessor() {
    let hugeDataset = new Array(1000000).fill('data');

    return function process(id) {
        // Only uses id, never uses hugeDataset
        return `Processing ${id}`;
    };
}

const processor = createProcessor();
// processor retains hugeDataset via closure
// even though hugeDataset is never used
```

The inner function closes over `hugeDataset`. Even though the function never accesses it, the variable is retained because the engine cannot safely determine that it's unused in all possible scenarios.

### Visual

```
Closure scope:
┌─────────────────────────┐
│ hugeDataset (1M items)  │ ← retained forever
│ process (inner fn)      │
└─────────────────────────┘
```

### The Fix

```javascript
function createProcessor() {
    let hugeDataset = new Array(1000000).fill('data');

    // Null out before returning
    let result = function process(id) {
        return `Processing ${id}`;
    };

    hugeDataset = null;  // Allow GC to reclaim
    return result;
}
```

Or move the large data elsewhere:

```javascript
function createProcessor() {
    // Don't include huge data in closure
    return function process(id) {
        return `Processing ${id}`;
    };
}
```

## Cache Growth

### The Problem

```javascript
const cache = {};

function getData(key) {
    if (!cache[key]) {
        cache[key] = expensiveComputation(key);
    }
    return cache[key];
}
```

Over time, `cache` grows unbounded. If called with many unique keys, memory usage grows forever.

### The Fix: LRU Cache

**LRU** = **Least Recently Used**. Evicts the oldest entries when the cache reaches a size limit.

```javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // Map preserves insertion order
    }

    get(key) {
        if (!this.cache.has(key)) return undefined;

        // Move to end (most recently used)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // Delete least recently used (first entry)
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        this.cache.set(key, value);
    }
}

const cache = new LRUCache(100);
```

### Alternative Eviction Strategies

| Strategy | Description |
|----------|-------------|
| **LRU** | Least Recently Used — evict oldest accessed entry |
| **LFU** | Least Frequently Used — evict least accessed entry |
| **TTL** | Time-To-Live — evict entries older than a threshold |
| **FIFO** | First In, First Out — evict oldest inserted entry |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which variable keeps object alive? | Any variable in the closure chain |
| Is the variable actually used? | May be unused but still retained |
| How to break the closure? | Null the variable before returning |
| Can cache grow forever? | Need size limit / eviction policy |
| What eviction strategy? | LRU, LFU, TTL, FIFO |
| Is `Map` better than `{}` for cache? | Yes (insertion order, `.delete()` works correctly) |
## Next Steps

[Back to Chapter 9](09-memory-leaks-globals-timers-dom.md): 09 — Memory Leaks: Globals, Timers & Detached DOM
[Proceed to Chapter 11](11-hidden-classes.md): 11 — Hidden Classes (Shapes) to learn about 11 — hidden classes (shapes).
