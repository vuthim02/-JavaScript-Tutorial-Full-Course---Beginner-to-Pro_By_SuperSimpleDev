# `call()` / `apply()` / `bind()`

## `call()` — Call Immediately With Specific `this` and Individual Args

```javascript
function introduce(greeting, punctuation) {
    return `${greeting}, I'm ${this.name}${punctuation}`;
}

const alice = { name: "Alice" };
const bob   = { name: "Bob" };

introduce.call(alice, "Hello", "!");  // "Hello, I'm Alice!"
introduce.call(bob,   "Hi",   "?");  // "Hi, I'm Bob?"
```

**Signature:** `fn.call(thisArg, arg1, arg2, ...)`

## `apply()` — Call Immediately, Args as Array

```javascript
introduce.apply(alice, ["Hello", "!"]); // "Hello, I'm Alice!"
introduce.apply(bob,   ["Hi",   "?"]); // "Hi, I'm Bob?"
```

**Signature:** `fn.apply(thisArg, [arg1, arg2, ...])`

**Classic `apply` trick — spread before spread syntax existed:**

```javascript
const nums = [3, 1, 4, 1, 5, 9, 2, 6];

// Old way
Math.max.apply(null, nums); // 9

// Modern way (same result)
Math.max(...nums); // 9
```

## `bind()` — Returns a New Function With Permanent `this`

```javascript
function greet(greeting) {
    return `${greeting}, ${this.name}!`;
}

const alice = { name: "Alice" };
const aliceGreet = greet.bind(alice);

aliceGreet("Hello"); // "Hello, Alice!"
aliceGreet("Hi");    // "Hi, Alice!" — this is ALWAYS alice

// Can also pre-fill arguments (partial application)
const aliceSayHello = greet.bind(alice, "Hello");
aliceSayHello(); // "Hello, Alice!"
```

**Signature:** `fn.bind(thisArg, arg1?, arg2?, ...)` → returns new function

## Practical Patterns

### Borrowing Methods

```javascript
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };

// Array-like but not actually an Array
// Borrow Array.prototype.map
const result = Array.prototype.map.call(arrayLike, s => s.toUpperCase());
console.log(result); // ["A", "B", "C"]

// Borrow hasOwnProperty safely
const obj = Object.create(null); // no prototype!
obj.key = "value";
// obj.hasOwnProperty("key") ← would throw — no prototype
Object.prototype.hasOwnProperty.call(obj, "key"); // ✅ true
```

### Fixing Lost `this` in Callbacks

```javascript
class EventHandler {
    constructor() {
        this.count = 0;
        // Bind once in constructor — creates a stable reference
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.count++;
        console.log(`Clicked ${this.count} times`);
    }

    attach(element) {
        element.addEventListener("click", this.handleClick);
    }

    detach(element) {
        element.removeEventListener("click", this.handleClick);
        // ✅ works because we saved the bound reference
    }
}
```

### Partial Application With `bind`

```javascript
function multiply(a, b) { return a * b; }

const double = multiply.bind(null, 2); // `this` = null (unused), a = 2 pre-filled
const triple = multiply.bind(null, 3);

double(5); // 10
triple(5); // 15

// Real-world: pre-filling log level
function log(level, message) {
    console.log(`[${level}] ${message}`);
}
const info  = log.bind(null, "INFO");
const error = log.bind(null, "ERROR");
info("Server started");   // [INFO] Server started
error("Connection lost"); // [ERROR] Connection lost
```

## `call` vs `apply` vs `bind` — Summary

| Method | Calls immediately? | Args format | Returns |
|--------|-------------------|-------------|---------|
| `call` | ✅ Yes | Individual: `fn.call(ctx, a, b)` | Function's return value |
| `apply`| ✅ Yes | Array: `fn.apply(ctx, [a, b])` | Function's return value |
| `bind` | ❌ No  | Individual (pre-fill): `fn.bind(ctx, a)` | New bound function |

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Is the function called immediately? | `call`/`apply` = yes. `bind` = no (returns new function). |
| What is the `this` context? | Explicitly set by the first argument. |
| Are function arguments provided individually or as an array? | `call` = individual. `apply` = array. |
| Is `bind` being used for pre-filling args? | Yes — partial application via `bind(ctx, arg1, arg2)`. |
| How to safely borrow methods? | `Array.prototype.map.call(arrayLike, fn)`. |
| How to fix lost `this` in callbacks? | `fn.bind(this)` or arrow function wrapper. |
## Next Steps

[Back to Chapter 14](14-this-keyword.md): `this` Keyword — All 5 Contexts
[Proceed to Chapter 16](16-new-target-and-call-stack.md): `new.target` to learn about `new.target`.
