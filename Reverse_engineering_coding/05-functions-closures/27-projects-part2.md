# Projects — Part 2

## Project 4 — Infinite Lazy Sequence (Generators)

```javascript
// Infinite generators — computed lazily, no memory overflow
function* naturals(from = 0) {
    while (true) yield from++;
}

function* take(n, iter) {
    for (const v of iter) {
        if (n-- <= 0) return;
        yield v;
    }
}

function* map(fn, iter) {
    for (const v of iter) yield fn(v);
}

function* filter(pred, iter) {
    for (const v of iter) if (pred(v)) yield v;
}

function* zip(...iters) {
    const its = iters.map(i => i[Symbol.iterator]());
    while (true) {
        const results = its.map(i => i.next());
        if (results.some(r => r.done)) return;
        yield results.map(r => r.value);
    }
}

// First 10 squares of even natural numbers
const result = [
    ...take(10,
        map(n => n * n,
            filter(n => n % 2 === 0,
                naturals(1))))
];
console.log(result); // [4, 16, 36, 64, 100, 144, 196, 256, 324, 400]
```

## Project 5 — WeakRef Smart Cache

```javascript
function createSmartCache(ttlMs = 60_000) {
    const cache   = new Map();
    const timers  = new Map();
    const registry = new FinalizationRegistry((key) => {
        // Object was GC'd — clean up
        cache.delete(key);
        const t = timers.get(key);
        if (t) { clearTimeout(t); timers.delete(key); }
    });

    return {
        set(key, value) {
            // Clear any existing timer
            const existingTimer = timers.get(key);
            if (existingTimer) clearTimeout(existingTimer);

            cache.set(key, new WeakRef(value));
            registry.register(value, key);

            // TTL expiry
            const timer = setTimeout(() => {
                cache.delete(key);
                timers.delete(key);
            }, ttlMs);
            timers.set(key, timer);
        },

        get(key) {
            const ref = cache.get(key);
            if (!ref) return undefined;
            const value = ref.deref();
            if (!value) {
                cache.delete(key);
                timers.delete(key);
                return undefined;
            }
            return value;
        },

        delete(key) {
            const timer = timers.get(key);
            if (timer) clearTimeout(timer);
            timers.delete(key);
            cache.delete(key);
        },

        size() { return cache.size; }
    };
}

// Usage
const cache = createSmartCache(5000); // 5s TTL
let bigObj = { data: new Array(1000000).fill(0) };
cache.set("key", bigObj);

cache.get("key"); // { data: [...] }
bigObj = null;    // allow GC

// After ~5s or GC: cache.get("key") returns undefined
```

## Project 6 — Full Async State Machine (Generators + Async/Await)

```javascript
async function* stateMachine(initialState, transitions) {
    let state = initialState;

    while (true) {
        yield state; // emit current state

        const transition = transitions[state];
        if (!transition) return; // terminal state

        const action = await new Promise(resolve => {
            // Wait for an action (in real app: user input, event, etc.)
            setTimeout(() => resolve(transition.defaultAction), 1000);
        });

        const nextState = transition.on?.[action] ?? transition.default;
        if (!nextState) return;
        state = nextState;
    }
}

// Traffic light state machine
const trafficLight = stateMachine("red", {
    red:    { defaultAction: "go",   on: { go: "green"  }, default: "green"  },
    green:  { defaultAction: "slow", on: { slow: "yellow" }, default: "yellow" },
    yellow: { defaultAction: "stop", on: { stop: "red"   }, default: "red"    },
});

// Consume
(async () => {
    let count = 0;
    for await (const state of trafficLight) {
        console.log("Light:", state);
        if (++count >= 6) break; // red→green→yellow→red→green→yellow
    }
})();
```


## Next Steps

[Back to Chapter 26](26-projects-part1.md): Projects — Part 1
[Proceed to Chapter 28](28-mastery-map-and-next.md): Complete Function Mastery Map to learn about complete function mastery map.
