# Object Equality & Comparison

## Reference Equality (===)

Objects are compared by **reference** (memory address), not by value.

```javascript
const a = { value: 1 };
const b = { value: 1 };
const c = a;

console.log(a === b); // false — different references
console.log(a === c); // true — same reference
console.log(a == b);  // false — == also uses reference for objects
```

## Shallow Equality

Compares own properties with `===`.

```javascript
function shallowEqual(objA, objB) {
    if (Object.is(objA, objB)) return true;
    if (typeof objA !== "object" || objA === null ||
        typeof objB !== "object" || objB === null) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    return keysA.every(key =>
        Object.hasOwn(objB, key) && objA[key] === objB[key]
    );
}

console.log(shallowEqual({ a: 1, b: 2 }, { b: 2, a: 1 })); // true
console.log(shallowEqual({ a: { nested: 1 } }, { a: { nested: 1 } })); // false — nested objects are different refs
```

## Deep Equality

Recursively compares all nested properties.

```javascript
function deepEqual(a, b) {
    if (Object.is(a, b)) return true;
    if (typeof a !== "object" || a === null ||
        typeof b !== "object" || b === null) {
        return false;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    return keysA.every(key =>
        Object.hasOwn(b, key) && deepEqual(a[key], b[key])
    );
}

const obj1 = { a: 1, b: { c: 2, d: [3, 4] } };
const obj2 = { a: 1, b: { c: 2, d: [3, 4] } };
console.log(deepEqual(obj1, obj2)); // true
```

**Caveats:** Does not handle cyclic references, special objects (Date, Map, Set), or prototype chains.

## Object.is() — The Most Precise Equality

```javascript
console.log(Object.is(NaN, NaN));       // true
console.log(Object.is(0, -0));          // false
console.log(Object.is(42, 42));         // true
console.log(Object.is(null, null));     // true
console.log(Object.is(undefined, undefined)); // true
```

Use when you need `SameValueZero` semantics.

## JSON Serialization Comparison

Quick but limited deep comparison:

```javascript
function jsonEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

console.log(jsonEqual({ a: 1 }, { a: 1 })); // true

// Problems:
console.log(jsonEqual({ a: 1, b: 2 }, { b: 2, a: 1 })); // true (order depends)
// But:
const x = { a: 1, b: 2 };
const y = { b: 2, a: 1 };
console.log(JSON.stringify(x)); // {"a":1,"b":2}
console.log(JSON.stringify(y)); // {"b":2,"a":1} — different!
```

Not reliable for equality — property order matters in stringify.

## SameValueZero Algorithm

Used by `Map`, `Set`, `Array.prototype.includes()`:

```javascript
// SameValueZero: NaN equals NaN
const set = new Set([NaN]);
console.log(set.has(NaN)); // true

// Array.includes uses SameValueZero
console.log([NaN].includes(NaN)); // true
// indexOf uses Strict Equality
console.log([NaN].indexOf(NaN)); // -1
```

## Comparing Sets of Keys

```javascript
function haveSameKeys(a, b) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => key in b);
}

console.log(haveSameKeys({ a: 1, b: 2 }, { b: 3, a: 4 })); // true — different values, same keys
```

## Equality in React / Redux

```javascript
// React uses Object.is for comparison
// ShouldComponentUpdate / React.memo use shallow equality
const prevProps = { items: [1, 2, 3] };
const nextProps = { items: [1, 2, 3] };
console.log(prevProps.items === nextProps.items); // false — different array

// Immutable updates preserve referential equality for unchanged branches
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Are these two objects the same reference? | Use `===` or `Object.is()` |
| Are these two objects deeply equal? | Use `deepEqual()` or `structuredClone` + compare |
| Does the object contain a certain value? | Use `Object.values()` + `includes()` for shallow |
| Does NaN equal itself here? | Depends: `===` says no, `Object.is()` says yes, SameValueZero says yes |
| Is this a shallow or deep comparison? | Check if nested objects are compared by reference or recursively |
| What about property order in comparison? | `===` is reference, so irrelevant. `JSON.stringify` depends on order |
## Next Steps

[Back to Chapter 10](10-getters-setters.md): Getters & Setters in Plain Objects
[Proceed to Chapter 12](12-review-checklist.md): Part 6 Review & Reverse Engineering Checklist to learn about part 6 review & reverse engineering checklist.
