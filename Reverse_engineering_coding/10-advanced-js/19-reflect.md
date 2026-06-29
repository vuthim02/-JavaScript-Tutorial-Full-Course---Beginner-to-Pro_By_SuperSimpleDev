# 19 — Reflect API

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Companion to Proxy

Reflect provides methods that correspond to Proxy traps. Inside Proxy handlers, use Reflect to perform the **default behavior**.

```javascript
Reflect.get()
Reflect.set()
Reflect.has()
Reflect.deleteProperty()
Reflect.defineProperty()
Reflect.ownKeys()
Reflect.apply()
Reflect.construct()
```

---

## Inside Proxy Handlers

```javascript
const proxy = new Proxy(target, {
    get(target, key, receiver) {
        console.log(`Get ${String(key)}`);
        return Reflect.get(target, key, receiver); // Default get behavior
    },

    set(target, key, value, receiver) {
        console.log(`Set ${String(key)} = ${value}`);
        return Reflect.set(target, key, value, receiver); // Default set behavior
    }
});
```

---

## Why Use Reflect Instead of Direct Access?

```javascript
// Without Reflect – might miss special behaviors
const proxy = new Proxy(target, {
    get(target, key) {
        return target[key]; // Direct access
        // PROBLEM: doesn't handle getters properly
        // PROBLEM: doesn't pass receiver
        // PROBLEM: doesn't work with Proxies
    }
});

// With Reflect – correct default behavior
const proxy = new Proxy(target, {
    get(target, key, receiver) {
        return Reflect.get(target, key, receiver); // Correct
        // Handles: getters, receiver, nested proxies, symbol keys
    }
});
```

---

## Reflect Methods

```javascript
const obj = { name: "John" };

// Get
console.log(Reflect.get(obj, "name")); // "John"

// Set
Reflect.set(obj, "name", "Jane");
console.log(obj.name); // "Jane"

// Has
console.log(Reflect.has(obj, "name")); // true

// Delete
Reflect.deleteProperty(obj, "name");
console.log(Reflect.has(obj, "name")); // false

// OwnKeys
console.log(Reflect.ownKeys(obj)); // ["name"]

// Define property
Reflect.defineProperty(obj, "id", { value: 1, writable: false });

// Apply
Reflect.apply(Math.max, null, [1, 2, 3]); // 3

// Construct
const date = Reflect.construct(Date, [2025, 0, 15]);
```

---

## Reflect.ownKeys vs Object.keys

```javascript
const obj = {
    name: "John",
    [Symbol("id")]: 123
};

console.log(Object.keys(obj));     // ["name"] – excludes symbols, non-enumerable
console.log(Reflect.ownKeys(obj)); // ["name", Symbol(id)] – includes symbols
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which Reflect method performs this operation? | `get` for reading, `set` for writing, `has` for `in`, etc. |
| Why use Reflect in Proxy handlers? | To correctly implement the default behavior (handles getters, receiver, proxies). |
| What is the difference between Reflect.get and direct access? | `Reflect.get` properly handles getters and the `receiver` parameter. |
## Next Steps

[Back to Chapter 18](18-proxy.md): 18 — Proxy
[Proceed to Chapter 20](20-metaprogramming.md): 20 — Meta-programming to learn about 20 — meta-programming.
