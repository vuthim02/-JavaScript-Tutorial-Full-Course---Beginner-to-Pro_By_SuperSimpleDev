# 20 — Meta-programming

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Programs That Manipulate Programs

Meta-programming is code that writes, modifies, or inspects other code (or itself).

Examples in JavaScript:

```
Proxy          – intercept operations on objects
Reflect        – perform default operations
Property descriptors – control property behavior
Object.freeze / seal / preventExtensions – lock objects
Symbol.wellKnown – customize built-in behavior
eval / Function – execute code from strings (avoid)
```

---

## Proxy: The Most Powerful Meta-programming Tool

```javascript
// Validation
const validated = new Proxy(target, {
    set: (t, k, v) => { /* validate */ return true; }
});

// Logging
const logged = new Proxy(target, {
    get: (t, k) => { console.log(k); return t[k]; }
});

// Virtual properties
const virtual = new Proxy({}, {
    get: (t, k) => k in t ? t[k] : `Virtual: ${String(k)}`
});

// Performance monitoring
const monitored = new Proxy(fn, {
    apply: (t, thisArg, args) => {
        const start = performance.now();
        const result = Reflect.apply(t, thisArg, args);
        console.log(`Took ${performance.now() - start}ms`);
        return result;
    }
});
```

---

## Property Descriptors Control Behavior

```javascript
// Make an API immutable
const config = { apiKey: "abc", endpoint: "https://api.example.com" };
Object.freeze(config); // No changes allowed

// Hide internal properties
Object.defineProperty(obj, "internal", {
    value: secret,
    enumerable: false, // Hidden from loops
    writable: false    // Read-only
});
```

---

## Well-Known Symbols Customize Built-ins

```javascript
class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    // Customize toString
    get [Symbol.toStringTag]() {
        return "Range";
    }

    // Make iterable
    [Symbol.iterator]() {
        let current = this.start;
        let last = this.end;
        return {
            next() {
                if (current <= last) {
                    return { value: current++, done: false };
                }
                return { done: true };
            }
        };
    }
}

const r = new Range(1, 5);
console.log(Object.prototype.toString.call(r)); // "[object Range]"
console.log([...r]); // [1, 2, 3, 4, 5]
```

---

## Frameworks Use Meta-programming Extensively

| Framework | Meta-programming Feature |
|-----------|--------------------------|
| Vue.js 3 | Proxy for reactive system |
| Vue.js 2 | Object.defineProperty for reactivity |
| Angular | Property descriptors for change detection |
| MobX | Proxy for observable state |
| Immer | Proxy for immutable state drafts |
| React (ESLint) | Static analysis (not runtime meta) |

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is meta-programming involved? | Check for `Proxy`, `Reflect`, `Object.defineProperty`, `Symbol.*`. |
| Which mechanism is used? | Proxy (interception), Descriptors (control), Symbols (customization). |
| Why would a framework use Proxy? | To detect changes to objects (reactive state). |
## Next Steps

[Back to Chapter 19](19-reflect.md): 19 — Reflect API
[Proceed to Chapter 21](21-memory-behavior.md): 21 — Memory Behavior to learn about 21 — memory behavior.
