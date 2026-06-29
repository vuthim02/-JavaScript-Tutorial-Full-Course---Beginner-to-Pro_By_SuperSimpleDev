# 24 — Senior Reverse Engineering Checklist & Part 10 Summary

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Senior Reverse Engineering Checklist

Whenever reading advanced JavaScript ask:

### Is this iterable?

Check for `[Symbol.iterator]` method. If not, you cannot use `for...of`.

### Which iterator provides values?

Look for `[Symbol.iterator]` or a generator function.

### Is execution paused by yield?

If you see `function*` and `yield`, execution can pause and resume.

### Why use Map instead of object?

Need object keys? Need insertion order? Need `.size`? Frequent additions/removals?

### Why use Set?

Need unique values? Removing duplicates? Set operations (union, intersection)?

### Can memory disappear automatically?

Using WeakMap/WeakSet? If yes, GC can collect entries when keys are no longer referenced.

### Why property cannot change?

Check the descriptor: `Object.getOwnPropertyDescriptor(obj, key)`. If `writable: false`, read-only.

### Is object frozen?

Check `Object.isFrozen(obj)`. If frozen, nothing can change.

### Is Proxy intercepting operations?

Check for `new Proxy(target, handler)`. The handler traps reveal what's intercepted.

### Which Reflect method performs operation?

Inside Proxy handlers, `Reflect.get`, `Reflect.set`, etc. implement default behavior.

### Is meta-programming involved?

Proxy, Reflect, Descriptors, Symbols, defineProperty – these are meta-programming tools.

### Can garbage collector free memory?

Check for strong references: closures, Map, event listeners, arrays.

---

---

## Project Examples

### Range Iterator

```javascript
function range(start, end, step = 1) {
    return {
        [Symbol.iterator]() {
            let current = start;
            return {
                next() {
                    if ((step > 0 && current <= end) || (step < 0 && current >= end)) {
                        const value = current;
                        current += step;
                        return { value, done: false };
                    }
                    return { done: true };
                }
            };
        }
    };
}

console.log([...range(1, 10, 2)]);   // [1, 3, 5, 7, 9]
console.log([...range(10, 0, -3)]);  // [10, 7, 4, 1]
```

### Infinite Fibonacci Generator

```javascript
function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
for (let i = 0; i < 10; i++) {
    console.log(fib.next().value); // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
}
```

### Immutable Configuration

```javascript
function createConfig(defaults) {
    const config = { ...defaults };

    function deepFreeze(obj) {
        Object.freeze(obj);
        for (const val of Object.values(obj)) {
            if (val && typeof val === "object") deepFreeze(val);
        }
        return obj;
    }

    const frozen = deepFreeze(config);

    return new Proxy(frozen, {
        get(target, key) {
            if (key in target) return target[key];
            return undefined;
        },
        set() { throw new Error("Configuration is immutable"); },
        deleteProperty() { throw new Error("Configuration is immutable"); }
    });
}

const config = createConfig({
    apiUrl: "https://api.example.com",
    timeout: 5000
});

console.log(config.apiUrl); // "https://api.example.com"
// config.timeout = 10000;  // Error: Configuration is immutable
```

### Duplicate Remover

```javascript
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

console.log(removeDuplicates([1, 2, 2, 3, 1, 4, 3])); // [1, 2, 3, 4]
```

---

## Part 10 Summary

| Concept | Key Takeaway |
|---------|-------------|
| Symbol | Unique, immutable property key (prevents collisions) |
| Global Symbol | `Symbol.for("key")` – shared across realms |
| Iterator Protocol | `{ next() { return { value, done } } }` |
| for...of Internals | Calls `Symbol.iterator`, loops until `done: true` |
| Custom Iterator | Add `[Symbol.iterator]()` to any object |
| Generators | `function*` with `yield` – pausable functions |
| yield | Pause + return value + receive value via next(arg) |
| yield* | Delegate to another generator/iterable |
| Map | Key-value store (any key type, ordered, iterable) |
| Set | Unique values (any type, deduplication) |
| WeakMap | Object keys only, GC-friendly (no iteration) |
| WeakSet | Object values only, GC-friendly (no iteration) |
| Property Descriptors | `writable`, `enumerable`, `configurable` |
| Object.freeze() | Completely immutable (shallow) |
| Object.seal() | Can modify, cannot add/delete |
| Optional chaining | `?.` – safe access (returns undefined) |
| Nullish coalescing | `??` – default for null/undefined only |
| BigInt | Large integers (`123n`), cannot mix with Number |
| Regular Expressions | Patterns for searching/replacing text |
| Tagged Template Literals | Function\`template\` – custom string processing |
| Intl API | Locale-aware formatting (numbers, dates, currencies) |
| Proxy | Intercept object operations (get, set, has, etc.) |
| Reflect | Default behavior for Proxy traps |
| Meta-programming | Code that inspects/modifies other code |
| Memory Behavior | Heap for objects, stack for calls, GC for unreachable |
| WeakMap/WeakSet | Prevent memory leaks (weak references) |
| **ES2022-ES2024** | 14 new features (see chapters 22-23) |
## Next Steps

[Back to Chapter 23](23-es2024.md): 23 — ES2024 Features & Summary
[Proceed to Module 11](../11-data-structures/README.md): Data Structures, Algorithms, Big-O Analysis to learn about data structures and algorithms.
