# Object Static Methods: keys, values, entries, assign, is & More

## Object.keys() — Get Own Enumerable Property Names

Returns an array of the object's own enumerable property names (keys).

```javascript
const user = { name: "John", age: 25, city: "Boston" };
console.log(Object.keys(user)); // ["name", "age", "city"]
```

Non-enumerable properties (defined with `enumerable: false`) are excluded.

```javascript
const obj = {};
Object.defineProperty(obj, "hidden", { value: 42, enumerable: false });
console.log(Object.keys(obj)); // []
```

## Object.values() — Get Own Enumerable Property Values

```javascript
const user = { name: "John", age: 25, city: "Boston" };
console.log(Object.values(user)); // ["John", 25, "Boston"]
```

## Object.entries() — Get Key-Value Pairs

Returns an array of `[key, value]` arrays.

```javascript
const user = { name: "John", age: 25 };
console.log(Object.entries(user));
// [["name", "John"], ["age", 25]]

// Convert to Map
const map = new Map(Object.entries(user));
console.log(map.get("name")); // "John"

// Loop with destructuring
for (const [key, value] of Object.entries(user)) {
    console.log(`${key}: ${value}`);
}
```

## Object.fromEntries() — Reverse of entries

Converts an array of `[key, value]` pairs into an object.

```javascript
const entries = [["name", "John"], ["age", 25]];
const obj = Object.fromEntries(entries);
console.log(obj); // { name: "John", age: 25 }

// Useful with Map
const map = new Map([["a", 1], ["b", 2]]);
const objFromMap = Object.fromEntries(map);

// Transform object values
const prices = { apple: 1.5, banana: 2.0 };
const withTax = Object.fromEntries(
    Object.entries(prices).map(([key, value]) => [key, value * 1.1])
);
// { apple: 1.65, banana: 2.2 }
```

## Object.assign() — Copy Properties

Copies own enumerable properties from source objects to a target object.

```javascript
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);
console.log(target); // { a: 1, b: 2, c: 3 }
```

### Shallow Clone

```javascript
const original = { name: "John", address: { city: "Boston" } };
const clone = Object.assign({}, original);
clone.address.city = "NYC";
console.log(original.address.city); // "NYC" — nested is shared!
```

### Merging Objects

```javascript
const defaults = { theme: "light", lang: "en" };
const userPrefs = { theme: "dark" };
const config = Object.assign({}, defaults, userPrefs);
console.log(config); // { theme: "dark", lang: "en" }
```

Later sources overwrite earlier ones.

## Object.is() — Strict Equality with Two Exceptions

Unlike `===`, `Object.is()` treats `-0` and `+0` as different, and `NaN` as equal to itself.

```javascript
console.log(Object.is(NaN, NaN));    // true  (NaN === NaN is false)
console.log(Object.is(0, -0));       // false (0 === -0 is true)
console.log(Object.is(25, 25));      // true
```

## Object.groupBy() (ES2024)

Groups object elements by a string key returned by the callback.

```javascript
const inventory = [
    { name: "Apple", type: "fruit" },
    { name: "Carrot", type: "vegetable" },
    { name: "Banana", type: "fruit" },
];

const grouped = Object.groupBy(inventory, item => item.type);
// {
//   fruit: [{ name: "Apple", type: "fruit" }, { name: "Banana", type: "fruit" }],
//   vegetable: [{ name: "Carrot", type: "vegetable" }]
// }
```

## Property Order Guarantees

ES2015+ guarantees:

```javascript
const obj = { b: 1, a: 2, 1: "first", 0: "second" };
// Integer-like keys (0, 1) → in ascending numeric order
// String keys (a, b) → in insertion order
// Symbol keys → in insertion order

console.log(Object.keys(obj));
// ["0", "1", "b", "a"] or similar — integer keys sorted
```

| Property Type | Order |
|--------------|-------|
| Integer indices (0, 1, 2) | Ascending numeric |
| String keys | Insertion order |
| Symbol keys | Insertion order |

## Object.freeze() — Make Object Immutable (Shallow)

`Object.freeze(obj)` prevents adding, removing, or changing properties. Nested objects are NOT frozen.

```javascript
const user = { name: "Alice", address: { city: "Boston" } };
Object.freeze(user);
user.name = "Bob";          // ❌ silently fails (TypeError in strict mode)
user.address.city = "NYC";  // ✅ works — shallow freeze!

// Check
Object.isFrozen(user);           // true
Object.isFrozen(user.address);   // false
```

### Deep Freeze Helper

```javascript
function deepFreeze(obj) {
    const props = Object.getOwnPropertyNames(obj);
    for (const prop of props) {
        const value = obj[prop];
        if (value && typeof value === "object") deepFreeze(value);
    }
    return Object.freeze(obj);
}
```

## Object.seal() — Prevent Add/Delete, Allow Changes

```javascript
const user = { name: "Alice", age: 25 };
Object.seal(user);
user.name = "Bob";     // ✅ allowed
delete user.name;      // ❌ cannot delete
Object.isSealed(user); // true
```

### freeze vs seal vs preventExtensions

| Method | Add | Delete | Change |
|--------|-----|--------|--------|
| `preventExtensions()` | ❌ | ✅ | ✅ |
| `Object.seal()` | ❌ | ❌ | ✅ |
| `Object.freeze()` | ❌ | ❌ | ❌ |

## Property Checking

### `in` Operator — Checks Own AND Inherited

```javascript
const obj = { own: "yes" };
console.log("own" in obj);        // true
console.log("toString" in obj);   // true — inherited from prototype
```

### `hasOwnProperty()` — Own Properties Only

```javascript
obj.hasOwnProperty("own");       // true
obj.hasOwnProperty("toString");  // false — inherited
```

### `Object.hasOwn()` (ES2022) — Safe Version

Works even on objects with no prototype (unlike `.hasOwnProperty()`):

```javascript
const obj = Object.create(null); // no prototype!
obj.own = "yes";
obj.hasOwnProperty("own");      // ❌ TypeError — method doesn't exist
Object.hasOwn(obj, "own");      // ✅ true — static method, always safe
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What properties does this object have? | `Object.keys(obj)` for own enumerable string keys |
| What are the values? | `Object.values(obj)` |
| Need key-value pairs for iteration? | `Object.entries(obj)` |
| How to convert Map to object? | `Object.fromEntries(map)` |
| How to merge two objects? | `Object.assign(target, ...sources)` or spread `{...a, ...b}` |
| Is this a shallow or deep copy? | `Object.assign` and spread are shallow |
| Are NaN and NaN equal with Object.is? | Yes. Unlike `===` |
| What order do properties appear? | Integer keys sorted, then insertion order for strings |
| Is the object frozen? | `Object.isFrozen(obj)` |
| Is the object sealed? | `Object.isSealed(obj)` |
| Does `in` check inherited properties? | Yes |
| Does `hasOwnProperty` check inherited? | No — own only |
| Why use `Object.hasOwn()`? | Works with `Object.create(null)` objects (ES2022) |
## Next Steps

[Back to Chapter 7](07-project.md): Projects
[Proceed to Module 4 Chapter 13](../04-arrays-objects/13-destructuring.md): Object & Array Destructuring to learn about destructuring.
