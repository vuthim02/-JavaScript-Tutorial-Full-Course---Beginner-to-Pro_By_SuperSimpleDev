# Object Extra Methods: `freeze`, `seal`, `fromEntries`, `hasOwn`

<img src="https://media.giphy.com/media/E470LZUmy2Jiw/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## `Object.freeze()` — Make Object Immutable

### Syntax

```javascript
Object.freeze(obj) // returns the same object (now frozen)
```

### Behavior

Prevents **adding**, **removing**, or **changing** any properties. The object becomes **immutable** at the top level. **Shallow** — nested objects are NOT frozen.

```javascript
const user = { name: "Alice", address: { city: "Boston" } };
Object.freeze(user);

user.name = "Bob";        // ❌ silently fails (TypeError in strict mode)
user.age = 25;            // ❌ cannot add
delete user.name;         // ❌ cannot delete

// Nested objects are NOT frozen!
user.address.city = "NYC"; // ✅ works — shallow freeze!

// Check if frozen
Object.isFrozen(user); // true
Object.isFrozen(user.address); // false
```

### Deep Freeze Helper

```javascript
function deepFreeze(obj) {
    const props = Object.getOwnPropertyNames(obj);
    for (const prop of props) {
        const value = obj[prop];
        if (value && typeof value === "object") {
            deepFreeze(value);
        }
    }
    return Object.freeze(obj);
}

const config = deepFreeze({
    api: { url: "https://api.example.com", key: "abc" }
});
config.api.url = "https://evil.com"; // ❌ fails — deeply frozen
```

---

## `Object.seal()` — Prevent Add/Delete, Allow Changes

### Syntax

```javascript
Object.seal(obj) // returns the same object (now sealed)
```

### Behavior

Prevents **adding** or **removing** properties, but **allows changing** existing ones.

```javascript
const user = { name: "Alice", age: 25 };
Object.seal(user);

user.name = "Bob";    // ✅ allowed — existing property can change
user.age = 30;        // ✅ allowed
user.city = "Boston"; // ❌ fails — cannot add
delete user.name;     // ❌ fails — cannot delete

Object.isSealed(user); // true
Object.isFrozen(user); // false
```

### `freeze` vs `seal` vs `preventExtensions`

| Method                | Add  | Delete | Change | Description                    |
|-----------------------|------|--------|--------|--------------------------------|
| `preventExtensions()` | ❌   | ✅     | ✅     | Just prevents new properties   |
| `Object.seal()`       | ❌   | ❌     | ✅     | Prevents add + delete          |
| `Object.freeze()`     | ❌   | ❌     | ❌     | Prevents all changes           |

---

## `Object.fromEntries()` — Pairs to Object

### Syntax

```javascript
Object.fromEntries(iterableOfPairs) // returns new object
```

### Behavior

The reverse of `Object.entries()`. Takes an iterable of `[key, value]` pairs and returns a new object.

```javascript
const entries = [["name", "Alice"], ["age", 25], ["city", "Boston"]];
const obj = Object.fromEntries(entries);
// { name: "Alice", age: 25, city: "Boston" }
```

### Common Use Cases

```javascript
// Transform object values (complement to Object.entries)
const scores = { alice: 85, bob: 72, charlie: 91 };
const doubled = Object.fromEntries(
    Object.entries(scores).map(([name, score]) => [name, score * 2])
);
// { alice: 170, bob: 144, charlie: 182 }

// Filter object properties
const passing = Object.fromEntries(
    Object.entries(scores).filter(([_, score]) => score >= 80)
);
// { alice: 85, charlie: 91 }

// Convert Map to object
const map = new Map([["a", 1], ["b", 2]]);
Object.fromEntries(map); // { a: 1, b: 2 }

// Handle duplicate keys — last wins
Object.fromEntries([["x", 1], ["x", 2]]);
// { x: 2 } — later entry overrides earlier
```

---

## Property Checking: `in` and `hasOwnProperty`

### `in` Operator — Checks Own AND Inherited

```javascript
const obj = { own: "yes" };
console.log("own" in obj);        // true
console.log("toString" in obj);   // true — inherited from Object.prototype
```

### `hasOwnProperty()` — Own Properties Only

```javascript
const obj = { own: "yes" };
console.log(obj.hasOwnProperty("own"));     // true
console.log(obj.hasOwnProperty("toString")); // false — inherited, not own
```

### `Object.hasOwn()` (ES2022) — Safe Version

```javascript
// Safer than obj.hasOwnProperty() — works with Object.create(null)
const obj = Object.create(null); // no prototype!
obj.own = "yes";

obj.hasOwnProperty("own");  // ❌ TypeError — hasOwnProperty doesn't exist
Object.hasOwn(obj, "own");  // ✅ true — static method, always safe
Object.hasOwn(obj, "toString"); // false
```

---

## Reverse Engineering Questions

### For `Object.freeze()` / `Object.seal()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is the object fully immutable?        | `freeze()` is shallow — nested objects can change   |
| Can I change existing properties?     | `seal()`: yes. `freeze()`: no.                      |
| What happens in strict mode?          | Silent failures become TypeError                    |
| How to check if frozen?               | `Object.isFrozen(obj)`                              |
| How to check if sealed?               | `Object.isSealed(obj)`                              |

### For `Object.fromEntries()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What does it do?                      | Converts `[key, value]` pairs to an object          |
| What is the input format?             | Any iterable of key-value pairs (array, Map, etc.)  |
| What is `fromEntries` the reverse of? | `Object.entries()`                                  |
| How are duplicate keys handled?       | Last value wins                                     |
| When to use?                          | Transforming/filtering objects via entries          |

### For property checking

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does `in` check inherited properties? | Yes                                                 |
| Does `hasOwnProperty` check inherited?| No — own properties only                            |
| Why use `Object.hasOwn()`?            | Works with `Object.create(null)` objects            |
| When was `Object.hasOwn()` added?     | ES2022                                              |
## Next Steps

[Back to Chapter 23](23-es2023-immutable-methods.md): ES2023 Immutable Array Methods
[Proceed to Chapter 25](25-for-loops-iteration.md): Iterating Arrays and Objects: `for...of`, `for...in`, and `for` to learn about iterating arrays and objects: `for...of`, `for...in`, and `for`.
