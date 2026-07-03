# 09 — Set

## Unique Values Only

Stores unique values of any type.

```javascript
let set = new Set();
```

Add:

```javascript
set.add(10);
set.add(10); // Ignored (duplicate)
set.add(20);
```

Result: `Set(2) { 10, 20 }`

---

## Set Methods

```javascript
const set = new Set();

set.add("apple");         // Add value
set.has("apple");         // Check existence (true/false)
set.delete("apple");      // Remove value (true/false)
set.clear();              // Remove all values
set.size;                 // Number of values

// Iteration
set.values();             // Iterator over values (same as keys())
set.keys();               // Same as values() (for Map compatibility)
set.entries();            // Iterator over [value, value] pairs
set.forEach(value => {});

// Convert to array
const arr = [...set];
const arr2 = Array.from(set);
```

---

## Removing Duplicates from Arrays

```javascript
const arr = [1, 1, 2, 2, 3, 3, 1, 2];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3]
```

---

## Set Operations

```javascript
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

// Union
const union = new Set([...a, ...b]);
console.log([...union]); // [1, 2, 3, 4, 5, 6]

// Intersection
const intersection = new Set([...a].filter(x => b.has(x)));
console.log([...intersection]); // [3, 4]

// Difference
const difference = new Set([...a].filter(x => !b.has(x)));
console.log([...difference]); // [1, 2]
```

---

## Set with Objects

```javascript
const set = new Set();
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 1 }; // Same content, different reference

set.add(obj1);
set.add(obj2);
set.add(obj3); // Different reference → different entry

console.log(set.size); // 3 (all are distinct references)

set.add(obj1); // Duplicate reference → ignored
console.log(set.size); // 3
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why use Set? | When you need unique values and don't need key-value pairs. |
| How to remove duplicates from array? | `[...new Set(arr)]`. |
| Can Set hold mixed types? | Yes: `set.add(1).add("1").add({})` – all distinct. |
| How is equality determined? | SameValueZero (like `===` but `NaN` equals `NaN`). |
## Next Steps

[Back to Chapter 8](08-map.md): 08 — Map
[Proceed to Chapter 10](10-weakmap-weakset.md): 10 — WeakMap & WeakSet to learn about 10 — weakmap & weakset.
