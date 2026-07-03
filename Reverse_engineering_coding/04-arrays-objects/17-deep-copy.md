# Deep Copy

## What Is a Deep Copy?

A **deep copy** creates a completely independent clone. No references are shared between original and copy at any level — everything is recursively duplicated.

```javascript
const original = {
    name: "John",
    address: {
        city: "Boston",
        coordinates: { lat: 42.36, lng: -71.06 }
    },
    hobbies: ["reading", "coding"],
    birth: new Date(2000, 0, 1)
};
```

## Method 1: `structuredClone()` (ES2023, Node 17+, modern browsers)

```javascript
const deep = structuredClone(original);

deep.address.city = "NYC";
console.log(original.address.city); // "Boston" — unaffected!

deep.hobbies.push("gaming");
console.log(original.hobbies); // ["reading", "coding"] — unaffected!
```

**What it handles correctly:**
- Primitives, nested objects, arrays
- `Date`, `Map`, `Set`, `RegExp`, `ArrayBuffer`, `Blob`, `File`, `ImageData`
- Circular references (without crashing)

**What it does NOT handle:**
- Functions (throws `DataCloneError`)
- DOM nodes (throws)
- `WeakMap`, `WeakSet` (not supported)
- `Symbol` properties (dropped)
- Class instances lose their prototype chain (become plain objects)

## Method 2: `JSON.parse(JSON.stringify(obj))`

```javascript
const deep = JSON.parse(JSON.stringify(original));
```

**Limitations:**
- Loses `undefined` values (removes properties entirely)
- Loses `Symbol` keys
- Loses functions (removed)
- `Date` becomes string
- `RegExp` becomes `{}`
- `NaN` becomes `null`
- `Infinity` becomes `null`
- Circular references → `TypeError`

```javascript
const obj = {
    value: undefined,
    fn: () => {},
    date: new Date(),
    regex: /hello/g,
    nan: NaN,
    inf: Infinity
};

JSON.parse(JSON.stringify(obj));
// { date: "2024-...", regex: {}, nan: null, inf: null }
// value and fn are gone
```

## Method 3: Manual Recursive Function

```javascript
function deepClone(value, seen = new WeakMap()) {
    if (value === null || typeof value !== "object") {
        return value;
    }
    if (seen.has(value)) return seen.get(value);
    if (value instanceof Date) return new Date(value);
    if (value instanceof RegExp) return new RegExp(value);
    if (value instanceof Map) {
        const clone = new Map();
        seen.set(value, clone);
        value.forEach((v, k) => clone.set(k, deepClone(v, seen)));
        return clone;
    }
    if (value instanceof Set) {
        const clone = new Set();
        seen.set(value, clone);
        value.forEach(v => clone.add(deepClone(v, seen)));
        return clone;
    }
    if (Array.isArray(value)) {
        const clone = new Array(value.length);
        seen.set(value, clone);
        for (let i = 0; i < value.length; i++) {
            clone[i] = deepClone(value[i], seen);
        }
        return clone;
    }
    const clone = Object.create(Object.getPrototypeOf(value));
    seen.set(value, clone);
    for (const key of Reflect.ownKeys(value)) {
        clone[key] = deepClone(value[key], seen);
    }
    return clone;
}
```

## Method 4: Third-Party Libraries

```javascript
// Lodash
import _ from "lodash";
const deep = _.cloneDeep(original);

// Ramda
import R from "ramda";
const deep = R.clone(original);
```

## Performance Comparison

| Method               | Speed      | Safety                     | Best For                     |
|----------------------|------------|----------------------------|------------------------------|
| `structuredClone()`  | Fastest    | High (native)              | Most use cases (modern env)  |
| `JSON` round-trip    | Medium     | Low (loses types)          | Simple serializable data     |
| Manual recursive     | Slowest    | Complete control           | Custom cloning logic         |
| Lodash `cloneDeep`   | Medium     | High (battle-tested)       | Legacy environments          |

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this truly independent at all levels? | Yes — no shared references between original and copy. |
| Are there functions or Symbols?       | `structuredClone()` drops functions. JSON drops both. |
| Are there circular references?        | `JSON` method crashes. `structuredClone()` handles them. |
| Are there Date, Map, Set, RegExp?     | `structuredClone()` preserves them. JSON converts them. |
| Is performance a concern?             | Deep copy is O(n) — for huge objects, consider immutability instead. |
| Should I use shallow or deep?         | Shallow is faster. Deep only if independent nested objects are required. |
## Next Steps

[Back to Chapter 16](16-shallow-copy.md): Shallow Copy
[Proceed to Chapter 18](18-immutability.md): Immutability to learn about immutability.
