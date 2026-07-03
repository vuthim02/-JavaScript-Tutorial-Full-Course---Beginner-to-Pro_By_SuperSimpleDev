# 10 — WeakMap & WeakSet

## WeakMap: Memory-Aware Key-Value Store

Keys must be objects. Values can be anything.

```javascript
let wm = new WeakMap();
```

---

## Example

```javascript
let user = { name: "John" };
let metadata = { lastLogin: Date.now() };

wm.set(user, metadata);

// Later:
console.log(wm.get(user)); // { lastLogin: ... }
```

---

## Automatic Garbage Collection

When the key object is no longer referenced:

```javascript
let user = { name: "John" };
wm.set(user, "some data");

user = null; // The WeakMap entry is automatically removed
             // GC can collect the { name: "John" } object
```

---

## WeakMap Limitations

| Feature | Map | WeakMap |
|---------|-----|---------|
| Key types | Any | Object only |
| Iterable | Yes | No |
| `.size` | Yes | No |
| `.clear()` | Yes | No |
| `.keys()`, `.values()`, `.entries()` | Yes | No |
| Prevents GC of keys | Yes (holds strong reference) | No (weak reference) |

```javascript
const wm = new WeakMap();

// These will throw:
wm.size;         // undefined (not available)
wm.keys();       // TypeError: wm.keys is not a function
for (let k of wm) {} // TypeError: wm is not iterable
wm.clear();      // TypeError: wm.clear is not a function
```

---

## Use Case 1: Private Data

```javascript
const privateData = new WeakMap();

class Person {
    constructor(name) {
        privateData.set(this, { name });
    }

    getName() {
        return privateData.get(this).name;
    }
}

const p = new Person("John");
console.log(p.getName()); // "John"
console.log(p.name);      // undefined (private)
```

---

## Use Case 2: Caching without Memory Leaks

```javascript
const cache = new WeakMap();

function process(obj) {
    if (cache.has(obj)) {
        return cache.get(obj);
    }

    const result = expensiveComputation(obj);
    cache.set(obj, result);
    return result;
}
// When obj is no longer used, the cache entry is automatically cleaned up
```

---

## Use Case 3: DOM Node Metadata

```javascript
const nodeData = new WeakMap();

function trackClicks(element) {
    if (!nodeData.has(element)) {
        nodeData.set(element, { clickCount: 0 });
    }

    element.addEventListener("click", () => {
        const data = nodeData.get(element);
        data.clickCount++;
        console.log(`Clicked ${data.clickCount} times`);
    });
}
// When element is removed from DOM, the WeakMap entry is GC'd automatically
```

---

## WeakSet

Similar to WeakMap but stores only object values (no key-value pairs).

```javascript
let ws = new WeakSet();

let user1 = { name: "Alice" };
let user2 = { name: "Bob" };

ws.add(user1);
ws.add(user2);

console.log(ws.has(user1)); // true

user1 = null; // user1 is removed from WeakSet automatically
```

---

## Use Case: Marking Objects

```javascript
const processed = new WeakSet();

function processItem(item) {
    if (processed.has(item)) {
        return; // Already processed
    }

    // ... do processing ...
    processed.add(item);
}

// When item is no longer referenced, it's auto-removed from WeakSet
```

---

## WeakSet Limitations

```javascript
const ws = new WeakSet();

ws.add({}); // Works
ws.add(42); // TypeError: Invalid value used in weak set (must be object)

ws.size;        // undefined
ws.forEach();   // TypeError
for (let v of ws) {} // TypeError
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Should memory disappear automatically? | Use WeakMap/WeakSet if you want entries to be GC'd when keys are no longer referenced. |
| Why can't I iterate a WeakMap? | Because the contents could change at any time (when GC runs). Iteration would be unpredictable. |
| When to use WeakMap over Map? | When the key has a limited lifetime and you don't want to prevent GC. |
| When to use WeakSet? | When you need to "tag" objects without preventing their garbage collection. |
| Can WeakSet hold primitives? | No. Only objects. |
| How is WeakSet different from Set? | WeakSet holds weak references (GC-friendly), is not iterable, has no `.size`. |
## Next Steps

[Back to Chapter 9](09-set.md): 09 — Set
[Proceed to Module 6 Chapter 2](../06-prototypes-classes/02-property-descriptors.md): Property Descriptors, Freeze & Seal to learn about property descriptors.
