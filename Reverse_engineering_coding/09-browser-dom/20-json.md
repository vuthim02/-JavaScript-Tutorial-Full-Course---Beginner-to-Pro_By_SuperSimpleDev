# JSON — Serialization and Deserialization

<img src="https://media.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Basic Usage

Convert object to string:

```javascript
JSON.stringify()
```

Restore string to object:

```javascript
JSON.parse()
```

---

## JSON.stringify Options

```javascript
const user = {
    name: "John",
    age: 30,
    role: "admin",
    password: "secret",
    createdAt: new Date()
};

// Pretty print
console.log(JSON.stringify(user, null, 2));
// {
//   "name": "John",
//   "age": 30,
//   "role": "admin",
//   "password": "secret",
//   "createdAt": "2025-01-15T10:30:00.000Z"
// }

// With replacer (filter keys)
const safe = JSON.stringify(user, ["name", "age", "role"]);
// {"name":"John","age":30,"role":"admin"} — password excluded
```

---

## JSON.parse with Reviver

```javascript
const json = '{"name":"John","birth":"1990-01-01T00:00:00.000Z"}';

const user = JSON.parse(json, (key, value) => {
    if (key === "birth") return new Date(value); // Convert date string back to Date
    return value;
});

console.log(user.birth instanceof Date); // true
```

---

## Storage Example

```javascript
localStorage.setItem("user", JSON.stringify(user));

const restored = JSON.parse(localStorage.getItem("user"));
```

---

## What JSON Cannot Serialize

```javascript
const bad = {
    func: () => console.log("hi"),  // Functions → removed
    undef: undefined,                // undefined → removed
    symbol: Symbol("id"),            // Symbols → removed
    nan: NaN,                        // NaN → null
    inf: Infinity,                   // Infinity → null
    date: new Date(),                // Date → string (works, but need reviver)
    map: new Map([["a", 1]]),        // Map → "{}" (empty object)
    set: new Set([1, 2, 3]),         // Set → "{}" (empty object)
    circular: {}                     // Circular reference → Error
};
bad.circular.self = bad; // Circular → throws TypeError
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is the data a string or an object? | If it came from `JSON.stringify`, it's a string. Parse with `JSON.parse`. |
| Why is `[object Object]` stored? | Forgot to call `JSON.stringify` — the object's toString was used. |
| Why is `undefined` missing? | JSON cannot represent `undefined`; it's omitted. Use `null` instead. |
## Next Steps

[Back to Chapter 19](19-storage.md): Storage
[Proceed to Chapter 21](21-location-history.md): Location Object to learn about location object.
