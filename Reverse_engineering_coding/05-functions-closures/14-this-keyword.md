# `this` Keyword — All 5 Contexts

## Rule: `this` is Determined by HOW the Function Is Called

There are exactly 5 rules, in priority order:

```
Priority (highest to lowest):
1. new binding
2. Explicit binding (call/apply/bind)
3. Implicit binding (method call)
4. Default binding (plain call)
5. Arrow (lexical — not really a binding)
```

## Rule 1 — Default Binding (Lowest Priority)

Plain function call — no object, no `new`, no explicit binding.

```javascript
function greet() {
    console.log(this);
}

// Non-strict mode: this = global (window in browser, global in Node)
greet(); // Window / global

// Strict mode: this = undefined
"use strict";
greet(); // undefined
```
## Rule 2 — Implicit Binding

Called as a method on an object — `this` = the object before the dot.

```javascript
const user = {
    name: "Alice",
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
};

user.greet(); // "Hello, I'm Alice" — this = user
```

### Implicit Binding Loss (Common Bug)

```javascript
const user = {
    name: "Alice",
    greet() { console.log(this.name); }
};

const fn = user.greet; // reference is copied, context is LOST
fn(); // undefined — `this` is now global/undefined

// Also lost in callbacks:
setTimeout(user.greet, 1000); // undefined — same problem
```

**Fix:**

```javascript
// Option 1: Arrow function wrapper
setTimeout(() => user.greet(), 1000); // ✅ calls user.greet() as method

// Option 2: bind()
const boundGreet = user.greet.bind(user);
setTimeout(boundGreet, 1000); // ✅
```

## Rule 3 — Explicit Binding (`call` / `apply` / `bind`)

Manually specify `this`. See the call/apply/bind chapter for full deep dive.

```javascript
function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
}

const alice = { name: "Alice" };
const bob   = { name: "Bob" };

greet.call(alice, "Hello", "!");   // "Hello, Alice!"
greet.apply(bob, ["Hi", "?"]);     // "Hi, Bob?"
const aliceGreeter = greet.bind(alice, "Hey");
aliceGreeter(".");                 // "Hey, Alice."
```

## Rule 4 — `new` Binding

When a function is called with `new`:
1. A new empty object is created
2. `this` is set to that new object
3. The object's `[[Prototype]]` is set to `Constructor.prototype`
4. If the constructor doesn't return an object, `this` is returned automatically

```javascript
function Person(name, age) {
    // `this` is the new empty object
    this.name = name;
    this.age  = age;
    // return this; ← implicit
}

const alice = new Person("Alice", 25);
console.log(alice.name); // "Alice"
console.log(alice.age);  // 25
```

## Rule 5 — Arrow Functions (Lexical `this`)

Arrow functions do **not** have their own `this`. They capture `this` from the **surrounding lexical scope** at definition time — and it never changes.

```javascript
class Timer {
    constructor() {
        this.ticks = 0;
    }

    start() {
        // Regular function: this = undefined (lost in callback)
        // Arrow function: this = the Timer instance (lexical capture)
        setInterval(() => {
            this.ticks++; // ✅ always the Timer instance
            console.log(this.ticks);
        }, 1000);
    }
}

const t = new Timer();
t.start(); // 1, 2, 3, ...
```
## `this` in Classes

```javascript
class Dog {
    constructor(name) {
        this.name = name;
    }

    bark() {
        console.log(`${this.name} says: Woof!`);
    }

    // Arrow property — `this` permanently bound to instance
    fetch = () => {
        console.log(`${this.name} fetches!`);
    }
}

const rex = new Dog("Rex");
rex.bark();   // "Rex says: Woof!"

// Method reference — loses this
const bark = rex.bark;
bark(); // undefined says: Woof!  ← bug!

// Arrow property — never loses this
const fetch = rex.fetch;
fetch(); // "Rex fetches!" ← always works
```

## `this` in Event Listeners

```javascript
class Button {
    constructor(label) {
        this.label = label;
        this.el = document.createElement("button");
        this.el.textContent = label;
    }

    addClickHandler() {
        // ❌ Regular function — `this` becomes the DOM element
        this.el.addEventListener("click", function() {
            console.log(this.label); // undefined — this = DOM element
        });

        // ✅ Arrow function — lexical this = Button instance
        this.el.addEventListener("click", () => {
            console.log(this.label); // "OK" — this = Button instance
        });
    }
}
```

## `this` Reverse Engineering Checklist

| Call Pattern | `this` Value |
|-------------|-------------|
| `fn()` (non-strict) | `globalThis` |
| `fn()` (strict) | `undefined` |
| `obj.fn()` | `obj` |
| `fn.call(ctx)` | `ctx` |
| `fn.apply(ctx)` | `ctx` |
| `fn.bind(ctx)()` | `ctx` (permanent) |
| `new Fn()` | new object |
| Arrow function | Outer `this` (captured at definition) |
## Next Steps

[Back to Chapter 13](13-recursion-and-execution-context.md): Recursion Internals
[Proceed to Chapter 15](15-call-apply-bind.md): `call()` / `apply()` / `bind()` to learn about `call()` / `apply()` / `bind()`.

## Next Steps

[Back to Chapter 13](13-recursion-and-execution-context.md): Recursion Internals
[Proceed to Chapter 15](15-call-apply-bind.md): `call()` / `apply()` / `bind()` to learn about `call()` / `apply()` / `bind()`.
