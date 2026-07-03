# 08 — Map

## Limitations of Objects

```javascript
const obj = {};
obj["name"] = "John";
```

Problems:
1. Keys are always strings (or symbols)
2. No order guarantee (though modern engines preserve insertion order for string keys)
3. No `.size` property
4. Not iterable by default (can't `for...of`)
5. No built-in methods for common operations

---

## Map: A Better Key-Value Store

```javascript
let map = new Map();

map.set("name", "John");   // Add
map.get("name");           // "John" – Read
map.delete("name");        // true (false if key didn't exist)
```

---

## Map Methods

```javascript
const map = new Map();

map.set("key", "value");          // Add/update entry
map.get("key");                   // Read entry ("value")
map.has("key");                   // Check existence (true/false)
map.delete("key");                // Remove entry (true/false)
map.clear();                      // Remove all entries
map.size;                         // Number of entries

// Iteration
map.keys();                       // Iterator over keys
map.values();                     // Iterator over values
map.entries();                    // Iterator over [key, value] pairs (default)
map.forEach((value, key) => {});  // Callback for each entry

// Convert to array
const entries = [...map];              // [[key1, val1], [key2, val2]]
const keys = [...map.keys()];
const values = [...map.values()];
```

---

## Map vs Object

| Feature | Object | Map |
|---------|--------|-----|
| Key types | String or Symbol | Any type (object, function, primitive) |
| Key order | Integer keys first, then insertion order | Insertion order |
| Size | Manual (`Object.keys(obj).length`) | `.size` property |
| Iteration | `for...in`, `Object.keys/values/entries` | `for...of`, `.keys()`, `.values()`, `.entries()` |
| Performance | Good for small, static sets | Good for frequent additions/removals |
| JSON support | `JSON.stringify` native | No direct serialization |
| Prototype | Has prototype (may cause key collisions) | No prototype chain interference |

---

## Object Keys in Map

```javascript
const user = { name: "John" };
const settings = { theme: "dark" };

const map = new Map();
map.set(user, "admin");
map.set(settings, { fontSize: 14 });

console.log(map.get(user));     // "admin"
console.log(map.get(settings)); // { fontSize: 14 }
```

---

## Map Initialization

```javascript
// From array of [key, value] pairs
const map = new Map([
    ["name", "John"],
    ["age", 30],
    ["role", "admin"]
]);

console.log(map.size); // 3

// From another Map
const clone = new Map(map);

// Chaining
map.set("a", 1).set("b", 2).set("c", 3);
```

---

## Map Serialization

```javascript
const map = new Map([
    ["name", "John"],
    ["age", 30]
]);

// Convert to object (if keys are strings)
const obj = Object.fromEntries(map);
console.log(obj); // { name: "John", age: 30 }

// Convert to JSON
const json = JSON.stringify(Object.fromEntries(map));

// Restore from JSON
const restored = new Map(Object.entries(JSON.parse(json)));
```

---

## Object Key Problem: Objects Convert Keys to Strings

```javascript
const obj = {};

obj[1] = "A";
obj["1"] = "B"; // Overwrites the same key

console.log(obj); // { "1": "B" }
```

Number `1` is coerced to string `"1"`.

---

## Map Preserves Key Type

```javascript
const map = new Map();

map.set(1, "A");   // Number key
map.set("1", "B"); // String key – different!

console.log(map.get(1));  // "A"
console.log(map.get("1")); // "B"
console.log(map.size);     // 2 (two distinct keys)
```

---

## NaN as a Key

```javascript
const map = new Map();
map.set(NaN, "not a number");
console.log(map.get(NaN)); // "not a number"

const obj = {};
obj[NaN] = "works";
console.log(obj[NaN]); // "works" but NaN becomes string "NaN"
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Need ordered keys? | Use Map (guaranteed insertion order). |
| Need object keys? | Use Map (objects as keys). Object converts keys to strings. |
| Need size property? | Map has `.size`. Object needs `Object.keys().length`. |
| Use Map? | When you need non-string keys, frequent additions/removals, or iteration. |
| Why is 1 and "1" the same in an object? | Objects coerce keys to strings. |
| Why are they different in a Map? | Map uses strict equality for keys (same-value-zero). |
| Can I use objects as keys in an object? | No. Objects become "[object Object]" as string keys. Use Map. |
## Next Steps

[Back to Chapter 7](07-yield.md): 07 — yield: Pause, Resume, and Two-Way Communication
[Proceed to Chapter 9](09-set.md): 09 — Set to learn about 09 — set.
