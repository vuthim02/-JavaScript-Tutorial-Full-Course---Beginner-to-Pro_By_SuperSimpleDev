# 18 — Proxy

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Intercepting Operations

A Proxy wraps an object and intercepts operations on it.

```javascript
new Proxy(target, handler);
```

- `target`: the original object
- `handler`: object with "traps" (methods that intercept operations)

---

## Common Traps

| Trap | Intercepts |
|------|------------|
| `get(target, key, receiver)` | Reading a property |
| `set(target, key, value, receiver)` | Writing a property |
| `has(target, key)` | `in` operator |
| `deleteProperty(target, key)` | `delete` operator |
| `ownKeys(target)` | `Object.keys()`, `for...in` |
| `apply(target, thisArg, args)` | Function call |
| `construct(target, args)` | `new` operator |

---

## Example: get Trap

```javascript
let proxy = new Proxy(user, {
    get(obj, key) {
        console.log(`Accessing property: ${key}`);
        return obj[key];
    }
});

proxy.name; // Logs "Accessing property: name", returns "John"
```

---

## Example: set Trap (Validation)

```javascript
const user = { name: "John", age: 25 };

const proxy = new Proxy(user, {
    set(target, key, value) {
        if (key === "age") {
            if (typeof value !== "number" || value < 0 || value > 150) {
                throw new Error("Invalid age");
            }
        }
        target[key] = value;
        return true; // Signal success
    }
});

proxy.age = 30;   // Works
proxy.age = -5;   // Error: Invalid age
proxy.age = "young"; // Error: Invalid age
```

---

## Example: has Trap (Hiding Properties)

```javascript
const sensitive = { password: "secret", name: "John" };

const proxy = new Proxy(sensitive, {
    has(target, key) {
        if (key === "password") return false;
        return key in target;
    }
});

console.log("password" in proxy); // false (hidden)
console.log("name" in proxy);     // true
```

---

## Example: deleteProperty Trap

```javascript
const protected = new Proxy({ name: "John", id: 42 }, {
    deleteProperty(target, key) {
        if (key === "id") {
            throw new Error("Cannot delete id");
        }
        delete target[key];
        return true;
    }
});

delete protected.name; // Works
delete protected.id;   // Error: Cannot delete id
```

---

## Example: apply Trap (Function Proxy)

```javascript
function add(a, b) {
    return a + b;
}

const loggedAdd = new Proxy(add, {
    apply(target, thisArg, args) {
        console.log(`Called with: ${args}`);
        const result = Reflect.apply(target, thisArg, args);
        console.log(`Result: ${result}`);
        return result;
    }
});

loggedAdd(3, 4);
// Called with: 3,4
// Result: 7
```

---

## Example: construct Trap

```javascript
class User {
    constructor(name) {
        this.name = name;
    }
}

const ProxyUser = new Proxy(User, {
    construct(target, args) {
        console.log(`Creating User with: ${args}`);
        const instance = Reflect.construct(target, args);
        instance.createdAt = Date.now(); // Auto-add timestamp
        return instance;
    }
});

const u = new ProxyUser("John");
// Creating User with: John
console.log(u.name);       // "John"
console.log(u.createdAt);  // 1700000000000
```

---

## Example: Default Values with Proxy

```javascript
function withDefaults(target, defaults) {
    return new Proxy(target, {
        get(target, key) {
            if (!(key in target)) {
                return defaults[key]; // Return default for missing keys
            }
            return target[key];
        }
    });
}

const user = withDefaults({ name: "John" }, { age: 0, role: "viewer" });

console.log(user.name); // "John" (from object)
console.log(user.age);  // 0 (default)
console.log(user.role); // "viewer" (default)
```

---

## Example: Revocable Proxy

```javascript
const { proxy, revoke } = Proxy.revocable({ name: "John" }, {
    get(target, key) {
        console.log(`Accessing ${key}`);
        return target[key];
    }
});

console.log(proxy.name); // "Accessing name" + "John"
revoke(); // Proxy is now disabled
console.log(proxy.name); // TypeError: Cannot perform 'get' on a proxy that has been revoked
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Who intercepted access? | A Proxy with a `get` trap on the object. |
| Is there validation on write? | Check for a `set` trap that checks values before assigning. |
| Why did this property return a default value? | The `get` trap checks `key in target` and returns a default. |
| Is the Proxy revoked? | `Proxy.revocable()` returns a `revoke` function. After calling it, the proxy throws. |
## Next Steps

[Back to Chapter 17](17-intl.md): 17 — Internationalization API (Intl)
[Proceed to Chapter 19](19-reflect.md): 19 — Reflect API to learn about 19 — reflect api.
