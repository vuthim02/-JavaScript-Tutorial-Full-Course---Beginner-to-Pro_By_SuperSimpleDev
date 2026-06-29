# Object Static Methods: keys, values, entries, assign, is & More

<img src="https://media.giphy.com/media/MdA16VIoXKKxNE8Stk/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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
## Next Steps

[Back to Chapter 7](07-project.md): Projects
[Proceed to Chapter 9](09-destructuring-spread.md): Object Destructuring & Spread Operator to learn about object destructuring & spread operator.
