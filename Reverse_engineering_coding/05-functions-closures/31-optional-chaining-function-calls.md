# Optional Chaining & Nullish Coalescing with Functions

## Optional Chaining with Function Calls `?.()`

### Syntax

```javascript
obj.method?.()
```

### Behavior

Safely calls a method only if it exists. If `obj.method` is `null` or `undefined`, the expression returns `undefined` instead of throwing.

```javascript
const user = {
    name: "Alice",
    greet() { console.log("Hello!"); }
};

const userWithoutGreet = {
    name: "Bob"
};

// ❌ Without optional chaining — TypeError
userWithoutGreet.greet(); // TypeError: userWithoutGreet.greet is not a function

// ✅ With optional chaining — safe
userWithoutGreet.greet?.(); // undefined — no error
user.greet?.();             // "Hello!"

// Chaining with nested methods
const result = data?.processor?.process?.();
// If data, data.processor, or data.processor.process is null/undefined → undefined
```

### Use Cases

```javascript
// 1. Optional event handlers
function handleClick(callback) {
    callback?.(); // only call if provided
}
handleClick();           // no error
handleClick(() => console.log("clicked")); // "clicked"

// 2. Optional cleanup in destroy methods
class Component {
    destroy() {
        this.onDestroy?.(); // call if exists
        this.cleanup?.();
    }
}

// 3. API response with optional methods
const apiResult = await fetchData();
apiResult?.items?.forEach?.(item => process(item));
```

---

## Nullish Coalescing Operator `??`

### Syntax

```javascript
value ?? defaultValue
```

### Behavior

Returns `defaultValue` only if `value` is `null` or `undefined`. Unlike `||` which treats ALL falsy values (0, `""`, `false`) as defaults.

```javascript
// ❌ || operator — treats 0, "", false as missing
const count = 0;
console.log(count || 10);    // 10 — WRONG! 0 is a valid value
const name = "";
console.log(name || "Guest"); // "Guest" — WRONG! "" is a valid value

// ✅ ?? operator — only null/undefined trigger default
const count = 0;
console.log(count ?? 10);    // 0 — correct!
const name = "";
console.log(name ?? "Guest"); // "" — correct!
const value = null;
console.log(value ?? "default"); // "default"
```

### With Functions

```javascript
// Default function if none provided
function process(data, transform) {
    const fn = transform ?? (x => x); // identity function as default
    return fn(data);
}

process(42);                     // 42 (identity)
process(42, n => n * 2);        // 84

// Safe configuration defaults
function createApp(config) {
    return {
        port: config.port ?? 3000,
        host: config.host ?? "localhost",
        onStart: config.onStart ?? (() => {}),
        onError: config.onError ?? ((err) => console.error(err))
    };
}
```

---

## Combining `?.()` and `??`

```javascript
// Safely call optional method, provide default behavior
const greeting = user.greet?.() ?? "Hello, stranger!";
console.log(greeting); // if user.greet exists, its return; otherwise default

// Optional transform with fallback
function formatData(data, formatter) {
    return formatter?.(data) ?? data?.toString() ?? "no data";
}

formatData({ name: "Alice" }, null);
// data.toString() → "[object Object]" — but that's not useful
// Better:
function formatData(data, formatter) {
    const result = formatter?.(data);
    return result ?? String(data) ?? "no data";
}
```

### Practical Example: Configuration with Defaults

```javascript
function createLogger(config = {}) {
    return {
        // Method may or may not be provided
        log: config.log?.() ?? ((msg) => console.log(msg)),
        // Property may be missing, fallback to default
        level: config.level ?? "info",
        // Optional transform with fallback
        format: (msg) => config.format?.(msg) ?? `[${new Date().toISOString()}] ${msg}`
    };
}

const logger = createLogger({
    level: "debug",
    format: (msg) => `${msg}!!!`
});
logger.log("hello"); // "hello!!!" — custom format
```

---

## `?.` for Dynamic Property Access

```javascript
const users = {
    alice: { role: "admin" },
    bob: null
};

// Access potentially missing properties
const role = users.alice?.role;   // "admin"
const role2 = users.bob?.role;    // undefined — no error!
const role3 = users.charlie?.role; // undefined — no error!

// Dynamic keys
function getRole(username) {
    return users[username]?.role ?? "guest";
}
console.log(getRole("alice"));   // "admin"
console.log(getRole("bob"));     // "guest" (bob is null → undefined → "guest")
console.log(getRole("unknown")); // "guest"
```

---

## Reverse Engineering Questions

### For Optional Chaining `?.()`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What does `?.()` do?                  | Calls a method only if it's not null/undefined      |
| What does it return if method missing?| `undefined`                                         |
| Can you chain after `?.()`?           | Yes — `obj?.method?.()?.result`                     |
| When to use?                          | Optional callbacks, optional API methods, config    |
| When NOT to use?                      | When the method is required (hides bugs)            |
| Does `?.()` short-circuit?            | Yes — if left side is null/undefined, rest is skipped |

### For Nullish Coalescing `??`

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| When does `??` trigger default?       | Only when the value is `null` or `undefined`        |
| How is `??` different from `||`?      | `||` triggers on all falsy (0, "", false, null, undefined) |
| Can `??` be chained?                  | Yes — `a ?? b ?? c` returns first non-nullish       |
| Can `??` be used with `&&` or `||`?   | Syntax error — use parentheses: `(a ?? b) && c`     |
## Next Steps

[Back to Module 3 Chapter 6](../03-control-flow/06-error-handling.md): Error Handling — try/catch, finally & Custom Errors
[Proceed to Module 6](../06-prototypes-classes/README.md): Objects, Prototypes, Classes, Constructors, `this` to learn about prototypal inheritance and object-oriented JavaScript.
