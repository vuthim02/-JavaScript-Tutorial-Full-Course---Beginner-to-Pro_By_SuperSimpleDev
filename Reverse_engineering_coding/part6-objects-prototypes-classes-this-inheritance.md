# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

## Part 6 — Objects, Prototypes, Classes, Constructors, `this`, and the Prototype Chain

---

# Mission

This part explains one of the deepest topics in JavaScript.

Many developers use objects every day without understanding:

- How objects are stored in memory.
- What prototypes are.
- Why inheritance works.
- How `this` is determined.
- What classes really are.
- How methods are shared.
- Why the prototype chain exists.

Frameworks and runtimes like:

- Node.js
- React
- Vue.js

depend heavily on these concepts.

---

# Chapter 1 — Objects Are Collections of Properties

## Object Literal

The simplest way to create an object is with literal syntax:

```javascript
const user = {
    name: "John",
    age: 25
};
```

## Internal Memory Structure

```text
Variable: user (stack)
              │
              ▼
┌─────────────────────────────────────────────┐
│ Object (heap)                                │
│ ┌─────────────────────────────────────────┐ │
│ │ Hidden Class (Shape / Map) reference    │ │
│ │ Property Store:                         │ │
│ │   "name" → "John"  (inline or external) │ │
│ │   "age"  → 25      (inline or external) │ │
│ │ __proto__ → Object.prototype            │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

**Key insight:** JavaScript engines (V8) use "hidden classes" (shapes) to optimize property access. Objects with the same set of properties share the same hidden class, enabling fast property lookups similar to statically-typed languages.

## Accessing Properties

```javascript
// Dot notation — property name must be a valid identifier
user.name;   // "John"

// Bracket notation — property name is a string expression
user["name"]; // "John"

// Dynamic keys
const key = "age";
user[key];    // 25

// Non-existent property
console.log(user.salary); // undefined — no error
```

### Why Both Exist

| Notation   | When to Use                                   |
|------------|-----------------------------------------------|
| Dot        | Static, known property names (most common).   |
| Bracket    | Dynamic property names, or names with spaces/special characters. |

## Modifying Properties

```javascript
user.age = 30;          // modify existing
user.city = "Boston";   // add new property
```

## Deleting Properties

```javascript
delete user.age;        // returns true if deleted
delete user.nonexistent; // returns true (no error)
delete user;            // false — cannot delete variable, only property
```

## Property Descriptors

Every property has a descriptor that controls its behavior:

```javascript
const user = { name: "John" };

const descriptor = Object.getOwnPropertyDescriptor(user, "name");
// {
//   value: "John",
//   writable: true,     // can be changed
//   enumerable: true,   // appears in for...in and Object.keys
//   configurable: true  // can be deleted or descriptor changed
// }

// Define a non-writable, non-enumerable, non-configurable property
Object.defineProperty(user, "id", {
    value: 12345,
    writable: false,
    enumerable: false,
    configurable: false
});

user.id = 99999;           // silently ignored (strict mode: TypeError)
console.log(user.id);      // 12345
console.log(Object.keys(user)); // ["name"] — id is not enumerable
delete user.id;            // false — not configurable
```

### Property Descriptor Fields

| Field          | Default     | Meaning                                          |
|----------------|-------------|---------------------------------------------------|
| `value`        | `undefined` | The property's value.                             |
| `writable`     | `false`     | Can the value be changed?                         |
| `enumerable`   | `false`     | Appears in `for...in` and `Object.keys()`?        |
| `configurable` | `false`     | Can the descriptor be changed or property deleted?|
| `get`          | `undefined` | Getter function.                                  |
| `set`          | `undefined` | Setter function.                                  |

## Preventing Object Modification

```javascript
const obj = { a: 1 };

// Prevent adding new properties
Object.preventExtensions(obj);
obj.b = 2; // silently ignored (strict: TypeError)

// Seal — prevent add/delete, all properties become non-configurable
Object.seal(obj);
delete obj.a; // false

// Freeze — prevent add/delete/change (all properties become read-only)
Object.freeze(obj);
obj.a = 99; // silently ignored (strict: TypeError)
```

**Note:** All of these are **shallow** — nested objects are not affected.

```javascript
const obj = Object.freeze({ nested: { value: 1 } });
obj.nested.value = 2; // works! nested object is not frozen
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Why object instead of array?          | Named keys for semantic access; order not important. |
| Which property stores the data?       | Read property names to understand the data shape.   |
| What happens if a property does not exist? | Returns `undefined` — no error.                |
| Is the property writable/enumerable/configurable? | Check the descriptor.            |
| Is the object frozen/sealed/extensible? | Check with `Object.isFrozen()`, `Object.isSealed()`, `Object.isExtensible()`. |

---

# Chapter 2 — Methods

## What Is a Method?

A method is a function stored as an object property.

```javascript
const user = {
    name: "John",
    greet: function() {
        console.log("Hello, " + this.name);
    }
};

// ES6 shorthand
const user2 = {
    name: "Jane",
    greet() {
        console.log("Hello, " + this.name);
    }
};
```

## Memory

```text
user
 ↓
┌──────────────────────────────┐
│ Object                       │
│ name: "John"                 │
│ greet: reference ────────────┼──→ Function Object (heap)
└──────────────────────────────┘     name: "greet"
                                     body: console.log(...)
```

The function object is **not** stored inside the object — only a **reference** to it is stored. Multiple objects can reference the same function.

## Calling Methods

```javascript
user.greet();   // dot notation
user["greet"](); // bracket notation

const methodName = "greet";
user[methodName](); // dynamic method call
```

## Method Binding — The `this` Problem

```javascript
const user = { name: "John", greet() { console.log(this.name); } };

// Works — `this` is user
user.greet(); // "John"

// Broken — `this` is undefined (strict) or global
const fn = user.greet;
fn(); // TypeError: Cannot read properties of undefined
```

**Fix:** Bind the method explicitly.

```javascript
const boundFn = user.greet.bind(user);
boundFn(); // "John"
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this property a value or a function?| Check the value type.                               |
| How is `this` determined?             | By the object on the left of the dot at call time.  |
| Is the method extracted and called separately? | If so, `this` may be lost.               |
| Is the method stored per-instance or shared? | On the prototype (shared) if via class. |

---

# Chapter 3 — Dynamic Properties

## Adding Properties After Creation

```javascript
const user = { name: "John" };
user.age = 25;          // add
user["city"] = "Boston"; // add with bracket
```

## Removing Properties

```javascript
delete user.age;
```

## Computed Property Names (ES6)

```javascript
const key = "dynamicKey";
const obj = {
    [key]: "dynamic value",
    [`computed_${key}`]: "also dynamic"
};
// { dynamicKey: "dynamic value", computed_dynamicKey: "also dynamic" }
```

## Property Presence Check

```javascript
const user = { name: "John" };

// Using 'in' operator (checks own + inherited)
"name" in user;     // true
"toString" in user; // true (inherited)

// Using hasOwnProperty
user.hasOwnProperty("name");    // true
user.hasOwnProperty("toString"); // false

// Using Object.hasOwn (ES2022)
Object.hasOwn(user, "name");    // true

// Using !== undefined (falsy for missing AND for undefined values)
user.name !== undefined; // true — but fails if value is actually undefined
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is the property name fixed or computed? | Check for `[expression]` in literal or `variable[key]` assignment. |
| Are properties added dynamically?     | Dynamic addition causes shape transitions (slower).  |
| Is the property being deleted?        | `delete` — impacts shape and performance.           |
| How to check if a property exists?    | `in` operator checks own + inherited. `hasOwnProperty` checks own only. |

---

# Chapter 4 — Object References Deep Dive

## The Fundamental Rule

In JavaScript, objects are **always passed and assigned by reference**. The variable does not contain the object — it contains a memory address pointing to the object.

```javascript
const a = { value: 10 };
const b = a;        // b gets a COPY of the REFERENCE

b.value = 20;       // mutation — affects the shared object
console.log(a.value); // 20
```

## Memory Diagram

```text
Stack:                  Heap:
a: 0x7ffe1234 ─────────→ ┌────────────────┐
b: 0x7ffe1234 ─────────→ │ { value: 20 }  │
                         └────────────────┘
```

Both `a` and `b` hold the same memory address (0x7ffe1234). They point to the same object.

## Reassignment vs Mutation

```javascript
const obj = { value: 10 };

// Mutation — changes the object's contents
obj.value = 20;

// Reassignment — changes what obj points to (but obj is const, so this fails)
obj = { value: 30 }; // TypeError
```

With `let`:

```javascript
let obj = { value: 10 };
obj = { value: 20 }; // reassignment — obj now points to a new object
// The old object { value: 10 } is now unreachable → GC eligible
```

## Comparing Objects

```javascript
// Objects are compared by REFERENCE, not by value
{} === {}            // false — two different objects
[] === []            // false

const a = {};
const b = a;
a === b;             // true — same reference

// To compare by value, write a function:
function shallowEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => a[key] === b[key]);
}

shallowEqual({ a: 1 }, { a: 1 }); // true
shallowEqual({ a: 1 }, { a: 2 }); // false
```

## Const Does Not Make Objects Immutable

```javascript
const obj = { value: 1 };
obj.value = 2;          // allowed — const protects the reference, not the object
obj = { value: 3 };     // TypeError — const prevents reassignment
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is the object copied or shared?       | Objects are always shared by reference.             |
| Does mutation through one variable affect another? | Yes — if they reference the same object. |
| Is this reassignment or mutation?     | `obj.prop = x` — mutation. `obj = newObj` — reassignment. |
| How do I create an independent copy?  | Shallow: `{...obj}`. Deep: `structuredClone(obj)`.  |
| Is `const` preventing mutation?       | No — const prevents reassignment, not mutation.     |

---

# Chapter 5 — The `this` Keyword: Core Rules

## What Is `this`?

`this` is a special keyword that refers to the **execution context** of a function. Its value is determined by **how the function is called**, not where it is defined (with the exception of arrow functions).

## The Five Rules of `this`

### Rule 1: Default Binding (Global)

When a function is called as a plain function call (not as a method, not with `new`, not with `call/apply/bind`):

```javascript
function showThis() {
    console.log(this);
}

showThis();
// Non-strict mode: window (browser) / global (Node)
// Strict mode: undefined
```

**The strict mode difference:**

```javascript
"use strict";
function showThis() {
    console.log(this);
}
showThis(); // undefined
```

### Rule 2: Implicit Binding (Method Call)

When a function is called as a method of an object (`obj.method()`), `this` refers to that object.

```javascript
const user = {
    name: "John",
    greet() {
        console.log(this.name);
    }
};

user.greet(); // "John" — this → user
```

**The "left of the dot" rule:**

```javascript
const user1 = { name: "Alice", greet() { console.log(this.name); } };
const user2 = { name: "Bob", greet() { console.log(this.name); } };

user1.greet(); // "Alice" — this → user1
user2.greet(); // "Bob" — this → user2
```

**The reference is what matters:**

```javascript
const user = { name: "John", greet() { console.log(this.name); } };
const anotherUser = { name: "Jane" };

anotherUser.greet = user.greet; // assign the method
anotherUser.greet(); // "Jane" — this → anotherUser (left of the dot)
```

### Rule 3: Explicit Binding (`call`, `apply`, `bind`)

You can explicitly set `this` using these methods.

**`call` — immediate invocation, arguments listed:**

```javascript
function introduce(greeting) {
    console.log(`${greeting}, I'm ${this.name}`);
}

const user = { name: "Alice" };
introduce.call(user, "Hello"); // "Hello, I'm Alice"
```

**`apply` — immediate invocation, arguments as array:**

```javascript
introduce.apply(user, ["Hi"]); // "Hi, I'm Alice"
```

**`bind` — returns a new function with `this` permanently bound:**

```javascript
const boundIntroduce = introduce.bind(user);
boundIntroduce("Hey"); // "Hey, I'm Alice"
```

`bind` is permanent — even `call`/`apply` cannot override it:

```javascript
const bound = introduce.bind(user);
bound.call({ name: "Other" }, "Hi"); // "Hi, I'm Alice" — ignores the call override!
```

### Rule 4: Constructor Binding (`new`)

When a function is called with `new`, `this` refers to the newly created object.

```javascript
function User(name) {
    this.name = name; // this → newly created object
}

const u = new User("John");
console.log(u.name); // "John"
```

### Rule 5: Arrow Functions (Lexical `this`)

Arrow functions do **not** have their own `this`. They inherit `this` from the enclosing (lexical) scope.

```javascript
const user = {
    name: "John",
    greet: () => {
        console.log(this.name); // this is NOT user — it's the outer scope (global)
    }
};

user.greet(); // undefined (or "" in browser)

// Where arrows shine — inside other methods
const user2 = {
    name: "Jane",
    greet() {
        const inner = () => console.log(this.name);
        inner(); // "Jane" — inherits this from greet's scope
    }
};

user2.greet(); // "Jane"
```

## `this` Determination Priority

```text
1. new binding              → new object
2. explicit binding         → explicitly set object
   (call, apply, bind)
3. implicit binding         → object on left of dot
   (obj.method())
4. default binding          → global (non-strict) or undefined (strict)
```

Arrow functions ignore all of the above — lexical `this` wins.

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Who called this function?             | How was it invoked? (plain, method, new, call/apply/bind) |
| What object is on the left of the dot?| That's `this` for method calls.                     |
| Is this an arrow function?            | If yes, `this` is lexical (from enclosing scope).   |
| Is strict mode enabled?               | Affects default binding (global vs undefined).      |
| Was `bind` used to create this function? | `this` is permanently fixed — even call/apply can't override. |

---

# Chapter 6 — `this` in Different Contexts

## Global Context

```javascript
// In a browser:
console.log(this); // window

// In Node.js (module scope):
console.log(this); // module.exports (empty object)
// At the REPL:
console.log(this); // global
```

## Regular Function Call

```javascript
function show() {
    console.log(this);
}

show();
// Non-strict: global object
// Strict: undefined
```

## Method Call

```javascript
const obj = {
    name: "test",
    method() {
        console.log(this.name);
    }
};

obj.method(); // "test"
```

## Event Handler (DOM)

```javascript
button.addEventListener("click", function() {
    console.log(this); // button element
});

// Arrow function — this is lexical
button.addEventListener("click", () => {
    console.log(this); // window (or enclosing scope)
});
```

## Constructor Call

```javascript
function Person(name) {
    this.name = name;
    console.log(this); // new Person instance
}

const p = new Person("Alice");
```

## `call`/`apply`/`bind`

```javascript
function logThis() {
    console.log(this);
}

const target = { id: 1 };

logThis.call(target);   // { id: 1 }
logThis.apply(target);  // { id: 1 }
logThis.bind(target)(); // { id: 1 }
```

## Arrow Functions

```javascript
const arrow = () => console.log(this);
arrow(); // this is from enclosing scope

// Inside a class
class Button {
    constructor(text) {
        this.text = text;
        // Arrow captures class instance this
        this.handleClick = () => console.log(this.text);
    }
}
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| How was the function invoked?         | Method? Plain? Constructor? Call/apply/bind?        |
| Is this an arrow function?            | Lexical `this`.                                     |
| Is strict mode on?                    | Affects plain call (global vs undefined).           |
| Was the function created with `bind`? | `this` is permanently fixed.                        |
| Is this inside a class method?        | Class methods use strict mode by default.           |

---

# Chapter 7 — Arrow Functions and `this`

## Why Arrows Don't Have Their Own `this`

Arrow functions were designed specifically to solve the problem of losing `this` in callbacks. They do not have their own `this` binding — they **capture** `this` from the enclosing lexical scope at the time they are defined.

## The Classic Problem (Before Arrow Functions)

```javascript
function Timer() {
    this.seconds = 0;

    // Problem: regular function inside setInterval
    setInterval(function() {
        this.seconds++; // this is NOT the Timer instance — it's global/undefined
        console.log(this.seconds); // NaN or error
    }, 1000);
}

new Timer();
```

**Old solutions:**

```javascript
// Solution 1: cache this
function Timer() {
    this.seconds = 0;
    const self = this; // cache
    setInterval(function() {
        self.seconds++;
        console.log(self.seconds);
    }, 1000);
}

// Solution 2: bind
function Timer() {
    this.seconds = 0;
    setInterval(function() {
        this.seconds++;
        console.log(this.seconds);
    }.bind(this), 1000);
}
```

## The Arrow Solution

```javascript
function Timer() {
    this.seconds = 0;

    setInterval(() => {
        this.seconds++; // this is from Timer's scope
        console.log(this.seconds);
    }, 1000);
}

new Timer(); // 1, 2, 3...
```

## Arrow Functions as Object Methods — Pitfall

```javascript
const obj = {
    value: 42,
    method: () => {
        console.log(this.value); // undefined — this is NOT obj
    }
};

obj.method(); // undefined
```

**Why?** The arrow function captures `this` from the enclosing scope (the global scope where `obj` is defined), not from `obj`.

## Arrow Functions in Classes

```javascript
class Button {
    constructor(text) {
        this.text = text;
        // Arrow function method — this is lexically bound to the instance
        this.handleClick = () => {
            console.log(this.text);
        };
    }
}

const btn = new Button("Click me");
btn.handleClick(); // "Click me"

// Even if extracted:
const fn = btn.handleClick;
fn(); // "Click me" — this is still the Button instance!
```

**Trade-off:** Arrow methods in classes create a new function per instance (not shared on the prototype), using more memory.

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this an arrow function?            | Check for `=>` syntax.                              |
| Where does `this` come from?          | The enclosing (lexical) scope at definition time.   |
| Why was an arrow used here?           | To capture outer `this` (callback, class field).    |
| Could a regular function break here?  | If `this` is expected to be the outer scope, yes.   |
| Is this arrow used as an object method? | If yes, `this` is NOT the object — likely a bug. |

---

# Chapter 8 — Constructor Functions

## The Constructor Pattern (Pre-ES6)

Before `class` syntax, JavaScript used constructor functions to create objects.

```javascript
function User(name, age) {
    // this → new empty object (when called with new)
    this.name = name;
    this.age = age;
    // No return — implicitly returns this
}

const user = new User("John", 25);
console.log(user); // { name: "John", age: 25 }
```

## What `new` Does

When a function is called with `new`, four things happen:

1. **Creates** a new empty object `{}`.
2. **Links** the new object's prototype to the function's `prototype` property.
3. **Binds** `this` to the new object.
4. **Returns** the new object (unless the function returns an object explicitly).

```javascript
function User(name) {
    // Step 1–3: JavaScript does:
    // const this = Object.create(User.prototype);

    this.name = name; // Step 4: assign properties

    // Step 5: implicit return this
}

// What new does manually:
function myNew(Constructor, ...args) {
    // 1. Create new object
    const obj = {};
    // 2. Link prototype
    Object.setPrototypeOf(obj, Constructor.prototype);
    // 3. Bind this and call constructor
    const result = Constructor.apply(obj, args);
    // 4. Return the object (or result if it's an object)
    return typeof result === "object" && result !== null ? result : obj;
}
```

## Forgetting `new` — The Bug

```javascript
function User(name) {
    this.name = name;
}

const user = User("John"); // forgot new!
// In non-strict mode: this → global, so user.name is actually global.name
console.log(user);        // undefined (no return)
console.log(global.name); // "John" — polluting global scope!

// In strict mode:
// TypeError: Cannot set property 'name' of undefined
```

**Defensive pattern:**

```javascript
function User(name) {
    if (!(this instanceof User)) {
        return new User(name); // auto-new
    }
    this.name = name;
}

User("John"); // works — auto-new
new User("Jane"); // also works
```

## Return Value from Constructor

```javascript
function Constructor() {
    this.value = "will be returned";

    // If you return a primitive, it's ignored:
    return "ignored primitive";
}
console.log(new Constructor()); // { value: "will be returned" }

// If you return an object, THAT object is returned instead:
function Constructor2() {
    this.value = "will be lost";
    return { custom: "object" };
}
console.log(new Constructor2()); // { custom: "object" }
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Was the function called with `new`?   | Check for `new` keyword. If missing, `this` is wrong. |
| What is the constructor's `prototype`?| Methods added here are shared across all instances.  |
| Is there a defensive `instanceof` check? | Some constructors auto-correct for missing `new`. |
| What does `new` return?               | The new object (unless constructor returns an object). |

---

# Chapter 9 — Prototypes: The Foundation

## What Is a Prototype?

Every object in JavaScript has an internal (hidden) property called `[[Prototype]]` (accessible via `__proto__` or `Object.getPrototypeOf()`). This is a reference to another object — the **prototype**.

When you access a property on an object, JavaScript first checks the object itself. If not found, it checks the object's `[[Prototype]]`, then that object's `[[Prototype]]`, and so on, until reaching `null`.

## The Default Prototype Chain

```javascript
const obj = {};
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null
```

Chain:

```text
obj → Object.prototype → null
```

## Prototype with Arrays

```javascript
const arr = [1, 2, 3];
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null
```

Chain:

```text
arr → Array.prototype → Object.prototype → null
```

## Finding Methods on the Prototype

```javascript
const arr = [1, 2, 3];

// arr itself has no push method
console.log(arr.hasOwnProperty("push")); // false

// But Array.prototype does
console.log(Array.prototype.hasOwnProperty("push")); // true

// When we call arr.push(4), JavaScript:
// 1. Looks for "push" on arr → not found
// 2. Looks on arr.[[Prototype]] (Array.prototype) → found!
// 3. Calls it with this = arr
arr.push(4);
```

## `__proto__` vs `prototype`

This is a major source of confusion:

- **`__proto__`** — the actual prototype of an object instance (the `[[Prototype]]`).
- **`prototype`** — a property on **constructor functions** that becomes the `__proto__` of objects created with `new`.

```javascript
function User(name) {
    this.name = name;
}

User.prototype.greet = function() { console.log("Hi, " + this.name); };

const user = new User("John");

console.log(user.__proto__ === User.prototype); // true
console.log(User.prototype.__proto__ === Object.prototype); // true
console.log(User.__proto__ === Function.prototype); // true
```

```text
user
    __proto__ → User.prototype
                    __proto__ → Object.prototype
                                    __proto__ → null
```

## Property Shadowing

If an object has its own property with the same name as a prototype property, it **shadows** (hides) the prototype property:

```javascript
const parent = { value: 10 };
const child = Object.create(parent);
console.log(child.value); // 10 — from parent

child.value = 20; // creates OWN property on child
console.log(child.value); // 20 — own property shadows parent
console.log(parent.value); // 10 — parent unchanged
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does the object own this property?    | Check with `hasOwnProperty()`.                      |
| Or does the prototype provide it?     | If `hasOwnProperty` is false, check the prototype chain. |
| How many levels were searched?        | Walk the chain: obj → prototype → ... → null.       |
| Is a prototype property being shadowed? | Check if the object has an own property with the same name. |

---

# Chapter 10 — The Prototype Chain in Depth

## How Property Lookup Works

```javascript
const animal = {
    eat() { console.log("Eating"); }
};

const dog = Object.create(animal);
dog.bark = function() { console.log("Woof"); };

const myDog = Object.create(dog);
myDog.name = "Rex";

// When we access:
myDog.name    // "Rex" — found on myDog (own property)
myDog.bark()  // "Woof" — found on dog (prototype)
myDog.eat()   // "Eating" — found on animal (grandparent prototype)
```

## Full Chain Walk

```text
myDog
    name: "Rex"
    __proto__ → dog
                    bark: function
                    __proto__ → animal
                                    eat: function
                                    __proto__ → Object.prototype
                                                    toString: function
                                                    hasOwnProperty: function
                                                    __proto__ → null
```

## Setting vs Getting Properties

Setting a property **never** modifies the prototype chain:

```javascript
const parent = { value: 10 };
const child = Object.create(parent);

child.value = 20;  // creates OWN property on child — does NOT modify parent
console.log(parent.value); // 10

// To modify a prototype property, do it explicitly:
parent.value = 30;
```

## The Prototype Chain is Live

If you modify a prototype after creating an object, all objects inheriting from it see the change:

```javascript
function User(name) { this.name = name; }
User.prototype.greet = function() { console.log("Hi, " + this.name); };

const u1 = new User("Alice");
const u2 = new User("Bob");

u1.greet(); // "Hi, Alice"

// Add method to prototype AFTER instances exist
User.prototype.sayBye = function() { console.log("Bye, " + this.name); };

u1.sayBye(); // "Bye, Alice" — works! live chain
u2.sayBye(); // "Bye, Bob" — works!
```

## Performance Implications

- Property lookup walks the chain — deeper chains are slower.
- Modern engines optimize this with inline caching (IC).
- Polymorphic property access (different shapes at the same call site) can deoptimize.
- For hot paths, keep prototype chains shallow.

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Where was the property found in the chain? | Walk from object → prototype → ... → null. |
| How many levels were traversed?       | Deeper chains are slower.                           |
| Is the prototype chain live?          | Yes — modifications are visible to existing objects. |
| Is property access monomorphic or polymorphic? | Same shape → fast. Different shapes → slower. |

---

# Chapter 11 — Adding Methods to Prototypes

## Shared Methods for Constructor Instances

```javascript
function User(name) {
    this.name = name;
}

// Add method to prototype — shared by ALL instances
User.prototype.greet = function() {
    console.log("Hello, " + this.name);
};

User.prototype.getInfo = function() {
    return { name: this.name, type: "user" };
};

const u1 = new User("Alice");
const u2 = new User("Bob");

u1.greet(); // "Hello, Alice"
u2.greet(); // "Hello, Bob"

console.log(u1.greet === u2.greet); // true — same function reference
```

## Memory Efficiency

```javascript
// WITHOUT prototype — each instance has its own copy
function User(name) {
    this.name = name;
    this.greet = function() { console.log("Hi, " + this.name); };
    // Each new User() creates a NEW function object
}

const u1 = new User("A");
const u2 = new User("B");
console.log(u1.greet === u2.greet); // false — two separate function objects

// WITH prototype — one function shared
function User(name) {
    this.name = name;
}
User.prototype.greet = function() { console.log("Hi, " + this.name); };

console.log(u1.greet === u2.greet); // true — shared
```

**Memory difference for 10,000 instances:**

```text
Without prototype: 10,000 function objects × N bytes each = large
With prototype: 1 function object shared across all = tiny
```

## Adding to Built-in Prototypes (Monkey Patching)

```javascript
// Adding a method to all arrays
Array.prototype.first = function() {
    return this[0];
};

Array.prototype.last = function() {
    return this[this.length - 1];
};

console.log([1, 2, 3].first()); // 1
console.log([1, 2, 3].last());  // 3
```

**Warning:** Modifying built-in prototypes is generally **bad practice** because:
1. Future JavaScript versions might add a method with the same name (breaking change).
2. Other libraries may conflict.
3. Makes code harder to reason about (surprising behavior).

## Replacing vs Extending Prototypes

```javascript
// BAD: Replacing the entire prototype breaks instanceof
User.prototype = {
    greet() { console.log("Hi"); }
};
const u = new User("Alice");
console.log(u instanceof User); // true (only because prototype.constructor is set)

// BETTER: Extend, don't replace
User.prototype.greet = function() { console.log("Hi"); };
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is every object storing its own method? | Check if method is defined inside the constructor (own) or on `.prototype` (shared). |
| Are methods shared?                   | If on `.prototype`, all instances share one function. |
| Is this built-in prototype being modified? | Monkey patching — risky, but occasionally used for polyfills. |
| Is the prototype being replaced or extended? | Replace breaks `instanceof`. Extend is safer. |

---

# Chapter 12 — `Object.create()`

## Creating Objects with a Specific Prototype

`Object.create(proto, propertiesObject)` creates a new object with the specified prototype.

```javascript
const animal = {
    speak() { console.log("Some sound"); },
    eat() { console.log("Eating"); }
};

const dog = Object.create(animal);
dog.bark = function() { console.log("Woof"); };

dog.speak(); // "Some sound" — from animal
dog.bark();  // "Woof" — own
dog.eat();   // "Eating" — from animal

console.log(Object.getPrototypeOf(dog) === animal); // true
```

## Chain via `Object.create`

```javascript
const animal = { alive: true };
const mammal = Object.create(animal);
mammal.hasFur = true;
const dog = Object.create(mammal);
dog.bark = () => "Woof";

console.log(dog.alive);  // true — from animal
console.log(dog.hasFur); // true — from mammal
console.log(dog.bark()); // "Woof" — own
```

## With Property Descriptors

```javascript
const obj = Object.create(null, {
    name: {
        value: "John",
        writable: true,
        enumerable: true,
        configurable: true
    }
});

console.log(obj.name); // "John"
console.log(Object.getPrototypeOf(obj)); // null — no prototype!
```

## Creating Objects with No Prototype

```javascript
const pure = Object.create(null);
console.log(pure.toString); // undefined — no Object.prototype
console.log(pure.__proto__); // undefined
```

**Use case:** Safe dictionaries — no inherited keys like `toString`, `hasOwnProperty`.

```javascript
const dict = Object.create(null);
dict["key"] = "value";
console.log("toString" in dict); // false — no inherited properties!
```

## Polyfill for `Object.create`

```javascript
if (!Object.create) {
    Object.create = function(proto) {
        function F() {}
        F.prototype = proto;
        return new F();
    };
}
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Who is the prototype (parent)?        | The argument passed to `Object.create()`.           |
| Which object provides which methods?  | Walk the chain from the created object upward.      |
| Does this object have a prototype at all? | `Object.create(null)` has no prototype.         |
| Why use `Object.create`?              | Fine-grained control over prototype, or no prototype for dictionaries. |

---

# Chapter 13 — Class Syntax (ES6)

## What Is a Class?

ES6 `class` is **syntactic sugar** over the prototype-based constructor pattern. It does NOT introduce a new class-based inheritance model — it uses prototypes under the hood.

```javascript
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }

    birthday() {
        this.age++;
    }
}

const user = new User("Alice", 25);
user.greet();    // "Hello, I'm Alice"
user.birthday();
console.log(user.age); // 26
```

## What the Class Syntax Actually Does

```javascript
class User {
    constructor(name) { this.name = name; }
    greet() { console.log("Hi"); }
}

// Equivalent prototype code:
function User(name) {
    this.name = name;
}
User.prototype.greet = function() {
    console.log("Hi");
};
```

**Verification:**

```javascript
console.log(typeof User); // "function" — not a new type
console.log(User.prototype); // { constructor: User, greet: f }
console.log(User.prototype.constructor === User); // true

const u = new User("Alice");
console.log(u.__proto__ === User.prototype); // true
console.log(u.greet === User.prototype.greet); // true
```

## Key Differences from Constructor Functions

| Aspect                  | Class Syntax                                    | Constructor Function                      |
|-------------------------|-------------------------------------------------|-------------------------------------------|
| Hoisting                | Not hoisted (TDZ)                              | Hoisted (function declaration)            |
| Strict mode             | Always strict                                   | Depends on `"use strict"`                 |
| Callable without `new`  | TypeError                                       | Functions (pollutes global)               |
| Methods enumerable      | Non-enumerable                                  | Configurable                              |
| `[[IsClassConstructor]]`| Internal flag — prevents calling without `new`  | No flag                                   |

```javascript
// Class cannot be called without new
User(); // TypeError: Class constructor User cannot be invoked without 'new'

// Constructor function CAN be called without new (bug)
function OldUser(name) { this.name = name; }
OldUser("John"); // pollutes global in non-strict mode
```

## Class Fields (ES2022+)

```javascript
class User {
    // Public field (on every instance)
    name = "Anonymous";
    age = 0;

    // Private field (not accessible outside)
    #id;

    constructor(name, id) {
        this.name = name;
        this.#id = id;
    }

    getId() {
        return this.#id;
    }
}

const u = new User("Alice", 12345);
console.log(u.name);   // "Alice"
console.log(u.#id);    // SyntaxError — private field!
console.log(u.getId()); // 12345
```

**Private fields vs closures:**

| Aspect         | `#` Private Fields                   | Closure Variables            |
|----------------|---------------------------------------|------------------------------|
| Syntax         | `#field`                              | `let privateVar` in constructor |
| Accessibility  | Only inside class methods             | Only inside closure methods  |
| Inheritance    | NOT accessible in subclasses          | NOT accessible in subclasses |
| Performance    | Slightly faster (native)              | Closure overhead             |

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this a class or a constructor?     | Class syntax is modern. Under the hood: prototypes. |
| Is the class hoisted?                 | No — classes are in TDZ until declaration.          |
| Can this be called without `new`?     | No — TypeError.                                     |
| Are there private fields?             | Check for `#` prefix on fields.                     |
| Is strict mode enabled?               | Yes — always in classes.                            |

---

# Chapter 14 — Methods Inside Classes

## Where Methods Live

Class methods are stored on the **prototype**, not on each instance.

```javascript
class User {
    constructor(name) { this.name = name; }

    greet() { console.log("Hi, " + this.name); }
}

const u1 = new User("Alice");
const u2 = new User("Bob");

console.log(u1.hasOwnProperty("name"));  // true — instance property
console.log(u1.hasOwnProperty("greet")); // false — on prototype
console.log(u1.greet === u2.greet);      // true — shared
console.log(u1.greet === User.prototype.greet); // true
```

## Memory Diagram

```text
User.prototype
┌─────────────────────────────┐
│ constructor: User            │
│ greet: function              │ ← shared across all instances
└─────────────────────────────┘
        ↑ __proto__                    ↑ __proto__
        │                               │
u1 ─────┘            u2 ───────────────┘
┌─────────────┐      ┌─────────────┐
│ name: Alice │      │ name: Bob   │
│ greet: (ref)│      │ greet: (ref)│
└─────────────┘      └─────────────┘
```

Only one `greet` function object exists in memory — all instances reference it.

## Class Methods and `this`

```javascript
class Button {
    constructor(text) {
        this.text = text;
    }

    click() {
        console.log(this.text);
    }
}

const btn = new Button("Submit");
const handler = btn.click;

handler(); // TypeError: Cannot read properties of undefined (reading 'text')
// Because `this` is undefined in strict mode (class methods are strict)
```

**Fixes:**

```javascript
// 1. Bind in constructor
class Button {
    constructor(text) {
        this.text = text;
        this.click = this.click.bind(this); // bind the method
    }

    click() {
        console.log(this.text);
    }
}

// 2. Arrow field (creates per-instance function)
class Button {
    constructor(text) { this.text = text; }
    click = () => { console.log(this.text); }; // arrow — lexical this
}

// 3. Bind at call site
handler.bind(btn)();
```

## Getter and Setter Methods

```javascript
class User {
    constructor(first, last) {
        this.firstName = first;
        this.lastName = last;
    }

    // Getter
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    // Setter
    set fullName(value) {
        [this.firstName, this.lastName] = value.split(" ");
    }
}

const u = new User("John", "Doe");
console.log(u.fullName);    // "John Doe" — getter, no () needed!
u.fullName = "Jane Smith"; // setter called
console.log(u.firstName);   // "Jane"
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Where is the method stored?           | On the prototype (shared) or on the instance (arrow fields)? |
| Is the method shared across instances?| If on prototype, yes. If in constructor or arrow field, no. |
| What happens if the method is extracted? | `this` may be lost — need `.bind()` or arrow. |
| Is this a getter/setter?              | Check for `get`/`set` keywords. Called without `()`. |

---

# Chapter 15 — Inheritance with `extends`

## Basic Inheritance

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a sound`);
    }

    eat() {
        console.log(`${this.name} is eating`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // call parent constructor
        this.breed = breed;
    }

    // Override method
    speak() {
        console.log(`${this.name} barks`);
    }

    // New method
    fetch() {
        console.log(`${this.name} is fetching`);
    }
}

const dog = new Dog("Rex", "German Shepherd");
dog.eat();    // "Rex is eating" — inherited
dog.speak();  // "Rex barks" — overridden
dog.fetch();  // "Rex is fetching" — own
```

## The Prototype Chain with `extends`

```javascript
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true
console.log(Object.getPrototypeOf(Dog) === Animal); // true (static inheritance)
```

Chain for `dog` instance:

```text
dog
    __proto__ → Dog.prototype
                    __proto__ → Animal.prototype
                                    __proto__ → Object.prototype
                                                    __proto__ → null
```

## `super` Keyword

### `super()` — Call Parent Constructor

```javascript
class Child extends Parent {
    constructor() {
        super(); // must be called before using `this`
        // After super(), this is initialized
    }
}
```

**Rules:**
- `super()` must be called in the derived constructor before accessing `this`.
- If you don't define a constructor in the child, JavaScript automatically calls `super(...args)`.

### `super.method()` — Call Parent Method

```javascript
class Dog extends Animal {
    speak() {
        super.speak(); // call parent's speak first
        console.log("...and wags tail");
    }
}

const dog = new Dog("Rex");
dog.speak();
// "Rex makes a sound"
// "...and wags tail"
```

### `super` with Static Methods

```javascript
class Parent {
    static identify() {
        return "I am parent";
    }
}

class Child extends Parent {
    static identify() {
        return super.identify() + " and child";
    }
}

console.log(Child.identify()); // "I am parent and child"
```

## Overriding in Detail

```javascript
class Shape {
    constructor(name) {
        this.name = name;
    }

    area() {
        return 0; // default
    }

    describe() {
        return `A ${this.name} with area ${this.area()}`;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius ** 2;
    }
}

class Square extends Shape {
    constructor(side) {
        super("Square");
        this.side = side;
    }

    area() {
        return this.side ** 2;
    }
}

const shapes = [new Circle(5), new Square(4)];
shapes.forEach(s => console.log(s.describe()));
// "A Circle with area 78.53981633974483"
// "A Square with area 16"
```

This is **polymorphism** — the same method name (`describe`) calls different `area()` implementations depending on the object type.

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Who is the parent class?              | The class after `extends`.                          |
| Is `super()` called in the constructor? | Required before accessing `this` in derived class. |
| Which methods are inherited?          | All prototype methods.                              |
| Which methods are overridden?         | Child methods with the same name as parent.         |
| What does the prototype chain look like? | Child → Child.prototype → Parent.prototype → Object.prototype → null. |
| Is the parent method called via `super`? | If `super.method()` is used, parent logic is extended, not replaced. |

---

# Chapter 16 — `super` in Depth

## `super` as a Function (Constructor)

```javascript
class A {
    constructor(x) {
        this.x = x;
    }
}

class B extends A {
    constructor(x, y) {
        super(x); // calls A.constructor with this
        this.y = y;
    }
}
```

**What happens when `super(x)` executes:**

1. Create a new object with `B.prototype` as its prototype.
2. Call `A.constructor` with `this` bound to that object and `x` as argument.
3. After `super()` returns, `this` is initialized and can be used.

## `super` as an Object (Method Access)

```javascript
class Parent {
    method() { return "parent"; }
}

class Child extends Parent {
    method() {
        return super.method() + " + child";
    }
}
```

`super.method()` accesses the method from the parent's prototype, but with `this` bound to the child instance.

**Proof:**

```javascript
class Parent {
    method() {
        console.log(this.constructor.name); // this is the CHILD instance
    }
}

class Child extends Parent {
    method() {
        super.method(); // logs "Child", not "Parent"
    }
}
```

## `super` with Static Methods

```javascript
class Parent {
    static greet() { return "Hello"; }
}

class Child extends Parent {
    static greet() {
        return super.greet() + " World";
    }
}

console.log(Child.greet()); // "Hello World"
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| What does `super()` do?               | Calls the parent constructor.                       |
| Why must `super()` be called first?   | To initialize `this` before the child constructor uses it. |
| What does `super.method()` do?        | Calls the parent's method with the child's `this`.  |
| Can `super` be used outside a derived class? | No — SyntaxError if used where no parent exists. |

---

# Chapter 17 — Static Methods and Properties

## Static Methods

Static methods belong to the **class itself**, not to instances.

```javascript
class MathUtils {
    static add(a, b) {
        return a + b;
    }

    static multiply(a, b) {
        return a * b;
    }
}

console.log(MathUtils.add(5, 3));      // 8
console.log(MathUtils.multiply(5, 3)); // 15

const utils = new MathUtils();
console.log(utils.add); // undefined — static methods are NOT on instances
```

## Static Properties (ES2022+)

```javascript
class Config {
    static apiUrl = "https://api.example.com";
    static timeout = 5000;
    static environment = "production";
}

console.log(Config.apiUrl); // "https://api.example.com"
```

## How Static Members Work Under the Hood

```javascript
class User {
    static kind = "user";
    static create(name) {
        return new User(name);
    }
}

// Equivalent:
function User(name) {
    this.name = name;
}
User.kind = "user";
User.create = function(name) {
    return new User(name);
};
```

Static members are properties on the **constructor function** itself, not on `.prototype`.

## Static Inheritance

```javascript
class Parent {
    static greet() { return "Hello"; }
}

class Child extends Parent {}

console.log(Child.greet()); // "Hello" — inherited!
```

This works because `Child.__proto__ === Parent` (the child constructor inherits from the parent constructor).

## Private Static Fields

```javascript
class Counter {
    static #total = 0;

    static increment() {
        this.#total++;
    }

    static getTotal() {
        return this.#total;
    }
}

Counter.increment();
Counter.increment();
console.log(Counter.getTotal()); // 2
console.log(Counter.#total);     // SyntaxError: private
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does the method belong to the instance or the class? | Static → class. Non-static → instance/prototype. |
| How is it called?                     | `ClassName.staticMethod()` vs `instance.method()`.  |
| Can static methods use `this`?        | Yes — `this` refers to the class itself.            |
| Are static members inherited?         | Yes — the child's `__proto__` points to the parent constructor. |

---

# Chapter 18 — Getters and Setters

## Getter

A getter is a function that intercepts property **reading**. It looks like a property but computes the value dynamically.

```javascript
class Circle {
    constructor(radius) {
        this._radius = radius;
    }

    get radius() {
        return this._radius;
    }

    get area() {
        return Math.PI * this._radius ** 2;
    }

    get circumference() {
        return 2 * Math.PI * this._radius;
    }
}

const c = new Circle(5);
console.log(c.radius);       // 5 — no () needed!
console.log(c.area);         // 78.54...
console.log(c.circumference); // 31.42...
```

## Setter

A setter intercepts property **writing**.

```javascript
class Circle {
    constructor(radius) {
        this._radius = radius;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        if (value <= 0) {
            throw new Error("Radius must be positive");
        }
        this._radius = value;
    }
}

const c = new Circle(5);
c.radius = 10; // setter called — validates
console.log(c.radius); // 10 — getter called
c.radius = -5; // Error: Radius must be positive
```

## Getter/Setter in Object Literals

```javascript
const user = {
    _name: "",
    get name() {
        return this._name || "Anonymous";
    },
    set name(value) {
        if (typeof value !== "string") throw new Error("Name must be a string");
        this._name = value.trim();
    }
};

user.name = "  John  ";
console.log(user.name); // "John"
```

## `Object.defineProperty` Getters/Setters

```javascript
const obj = {};
let _value = 0;

Object.defineProperty(obj, "value", {
    get() { return _value; },
    set(v) {
        if (v < 0) throw new Error("Value must be non-negative");
        _value = v;
    },
    enumerable: true,
    configurable: true
});

obj.value = 5;
console.log(obj.value); // 5
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is this a real property or computed?  | Getters/setters compute values dynamically.         |
| Is there validation in the setter?    | Setters can validate, transform, or reject values.  |
| How is it accessed?                   | Like a property — no `()` needed.                   |
| Is there a backing field?             | Usually `_name` or `#name` private field.           |

---

# Chapter 19 — `instanceof` Operator

## What `instanceof` Checks

`instanceof` checks whether the `prototype` property of a constructor appears anywhere in the object's prototype chain.

```javascript
function User(name) { this.name = name; }
const user = new User("John");

console.log(user instanceof User);     // true
console.log(user instanceof Object);   // true
console.log(user instanceof Array);    // false
```

## How It Works

```javascript
// What instanceof does conceptually:
function myInstanceof(obj, Constructor) {
    let proto = Object.getPrototypeOf(obj);
    while (proto !== null) {
        if (proto === Constructor.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}
```

## With Classes

```javascript
class Animal {}
class Dog extends Animal {}

const d = new Dog();

console.log(d instanceof Dog);    // true
console.log(d instanceof Animal); // true (Animal.prototype is in the chain)
console.log(d instanceof Object); // true (Object.prototype is in the chain)
```

## Caveats

### Cross-Realm (iframes, different Node contexts)

```javascript
const iframe = document.createElement("iframe");
document.body.appendChild(iframe);
const iframeArray = iframe.contentWindow.Array;
const arr = new iframeArray(1, 2, 3);

console.log(arr instanceof Array); // false — Array !== iframeArray
console.log(Array.isArray(arr));    // true — works across realms
```

### Changing `prototype` After Creation

```javascript
function User() {}
const u = new User();
User.prototype = {}; // break the link
console.log(u instanceof User); // false — prototype was replaced
```

## `Symbol.hasInstance`

You can customize `instanceof` behavior:

```javascript
class MyArray {
    static [Symbol.hasInstance](instance) {
        return Array.isArray(instance);
    }
}

console.log([] instanceof MyArray); // true
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which constructor's prototype is checked? | The right side of `instanceof`.                 |
| Is the prototype in the chain?        | Walk the chain from the object upward.              |
| Could cross-realm issues exist?       | If objects come from different iframes/vm contexts. |
| Has the prototype been changed after construction? | If so, instanceof may give unexpected results. |

---

# Chapter 20 — Built-in Constructors

## Core Built-in Constructors

JavaScript provides several built-in constructors, each with a `.prototype` that provides methods.

```javascript
// Object
const obj = {};
// obj → Object.prototype → null

// Array
const arr = [];
// arr → Array.prototype → Object.prototype → null
arr.push(1);
arr.map(x => x);
arr.filter(x => true);
// All these methods come from Array.prototype

// Function
function fn() {}
// fn → Function.prototype → Object.prototype → null
console.log(fn.call, fn.apply, fn.bind); // from Function.prototype

// Date
const date = new Date();
// date → Date.prototype → Object.prototype → null

// RegExp
const regex = /hello/;
// regex → RegExp.prototype → Object.prototype → null

// Map
const map = new Map();
// map → Map.prototype → Object.prototype → null

// Set
const set = new Set();
// set → Set.prototype → Object.prototype → null

// Promise
const promise = new Promise(() => {});
// promise → Promise.prototype → Object.prototype → null

// Error
const err = new Error("oops");
// err → Error.prototype → Object.prototype → null
```

## Checking Where Methods Come From

```javascript
const arr = [1, 2, 3];

// Is `push` on the array itself?
console.log(arr.hasOwnProperty("push")); // false

// Where does it come from?
console.log(Array.prototype.hasOwnProperty("push")); // true

// Full chain:
console.log(Object.getOwnPropertyNames(Array.prototype).slice(0, 5));
// ["constructor", "push", "pop", "shift", "unshift", ...]
```

## Extending Built-ins

```javascript
// Adding a method to Array.prototype
Array.prototype.sum = function() {
    return this.reduce((a, b) => a + b, 0);
};

console.log([1, 2, 3].sum()); // 6
```

**Warning:** Again, modifying built-in prototypes is risky (conflicts with future JS versions, other libraries, and makes code less predictable).

## Subclassing Built-ins

```javascript
class MyArray extends Array {
    // Custom methods on top of Array
    first() { return this[0]; }
    last() { return this[this.length - 1]; }
    sum() { return this.reduce((a, b) => a + b, 0); }
}

const arr = new MyArray(1, 2, 3, 4, 5);
console.log(arr.first()); // 1
console.log(arr.last());  // 5
console.log(arr.sum());   // 15
console.log(arr instanceof Array); // true — inherited prototype chain
console.log(arr instanceof MyArray); // true
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which prototype supplies this method? | Check the chain: Array.prototype, Object.prototype, etc. |
| Is this a built-in or custom class?   | Check constructor name or `instanceof`.             |
| Is the built-in prototype being extended? | Monkey patching — check for modifications to `.prototype`. |
| Can I subclass this built-in?         | Yes — use `extends` with built-in constructors.     |

---

# Chapter 21 — Encapsulation

## What Is Encapsulation?

Encapsulation is hiding internal implementation details and exposing only a controlled public interface.

## Encapsulation via Conventions

```javascript
class User {
    constructor(name) {
        this._name = name; // underscore convention: "private"
    }

    getName() {
        return this._name;
    }

    setName(value) {
        if (typeof value !== "string") throw new Error("Invalid name");
        this._name = value.trim();
    }
}
```

**Problem:** The `_` prefix is just a convention — it does NOT prevent access.

```javascript
const u = new User("John");
console.log(u._name); // "John" — still accessible
u._name = "Hacker";    // works
```

## Private Fields with `#` (ES2022+)

```javascript
class BankAccount {
    #balance = 0;   // TRUE private field

    constructor(initialBalance) {
        if (initialBalance < 0) throw new Error("Negative initial balance");
        this.#balance = initialBalance;
    }

    deposit(amount) {
        if (amount <= 0) throw new Error("Invalid deposit amount");
        this.#balance += amount;
        return this.#balance;
    }

    withdraw(amount) {
        if (amount > this.#balance) throw new Error("Insufficient funds");
        this.#balance -= amount;
        return this.#balance;
    }

    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(1000);
console.log(account.getBalance()); // 1000
console.log(account.#balance);     // SyntaxError: Private field '#balance' must be declared
account.#balance = 5000;           // SyntaxError
```

**Private fields are truly private:**
- Cannot be accessed from outside the class.
- Not returned by `Object.keys()`, `Object.entries()`, etc.
- Not inherited by subclasses.

## Private Methods

```javascript
class AuthService {
    #validatePassword(password) {
        return password.length >= 8;
    }

    #hashPassword(password) {
        // hash logic...
        return "hashed:" + password;
    }

    register(email, password) {
        if (!this.#validatePassword(password)) {
            throw new Error("Password too weak");
        }
        const hashed = this.#hashPassword(password);
        return { email, passwordHash: hashed };
    }
}

const auth = new AuthService();
auth.register("user@test.com", "secure123");
auth.#validatePassword("test"); // SyntaxError — private!
```

## Encapsulation via Closures (Pre-ES2022)

```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance; // private via closure

    return {
        deposit(amount) {
            if (amount <= 0) throw new Error("Invalid amount");
            balance += amount;
            return balance;
        },
        withdraw(amount) {
            if (amount > balance) throw new Error("Insufficient funds");
            balance -= amount;
            return balance;
        },
        getBalance() {
            return balance;
        }
    };
}

const acc = createBankAccount(1000);
console.log(acc.getBalance()); // 1000
console.log(acc.balance);      // undefined — truly private
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Which data is private?                | `#` fields or closure variables.                    |
| How is it accessed?                   | Only through public methods.                        |
| Is this convention-based or enforced? | `#` is enforced. `_` is convention only.            |
| Can subclasses access private fields? | No — private fields are not inherited.              |
| Is closure encapsulation used?        | Check for variables declared in the constructor/function body. |

---

# Chapter 22 — Polymorphism

## What Is Polymorphism?

Polymorphism means "many forms" — different classes can implement the same method name with different behaviors. Code that expects a certain interface works with any class that implements that interface.

## Polymorphism via Inheritance

```javascript
class Animal {
    speak() {
        console.log("Some generic sound");
    }
}

class Dog extends Animal {
    speak() {
        console.log("Woof!");
    }
}

class Cat extends Animal {
    speak() {
        console.log("Meow!");
    }
}

class Duck extends Animal {
    speak() {
        console.log("Quack!");
    }
}

// Polymorphic function — works with ANY Animal subclass
function makeAnimalSpeak(animal) {
    animal.speak(); // calls the appropriate override
}

makeAnimalSpeak(new Dog());  // "Woof!"
makeAnimalSpeak(new Cat());  // "Meow!"
makeAnimalSpeak(new Duck()); // "Quack!"
makeAnimalSpeak(new Animal()); // "Some generic sound"
```

## Polymorphism via Duck Typing

JavaScript doesn't require formal interfaces. If an object has the right methods, it can be used:

```javascript
// "If it walks like a duck and quacks like a duck, it's a duck."
function makeSound(speaker) {
    // No instanceof check needed — just call the method
    console.log(speaker.speak());
}

class Dog {
    speak() { return "Woof!"; }
}

class Cat {
    speak() { return "Meow!"; }
}

// Even a plain object works:
const robot = {
    speak() { return "Beep boop"; }
};

makeSound(new Dog());   // "Woof!"
makeSound(new Cat());   // "Meow!"
makeSound(robot);       // "Beep boop"
```

## Polymorphism in Practice (Strategy Pattern)

```javascript
// Different "strategies" for formatting output
class PlainFormatter {
    format(items) {
        return items.join(", ");
    }
}

class HtmlFormatter {
    format(items) {
        return `<ul>\n${items.map(i => `  <li>${i}</li>`).join("\n")}\n</ul>`;
    }
}

class JsonFormatter {
    format(items) {
        return JSON.stringify(items, null, 2);
    }
}

// Context that uses any formatter
class DataExporter {
    constructor(formatter) {
        this.formatter = formatter;
    }

    export(data) {
        const formatted = this.formatter.format(data);
        console.log(formatted);
    }
}

const data = ["Apple", "Banana", "Cherry"];

new DataExporter(new PlainFormatter()).export(data);
// Apple, Banana, Cherry

new DataExporter(new HtmlFormatter()).export(data);
// <ul>
//   <li>Apple</li>
//   <li>Banana</li>
//   <li>Cherry</li>
// </ul>

new DataExporter(new JsonFormatter()).export(data);
// [
//   "Apple",
//   "Banana",
//   "Cherry"
// ]
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does this method exist on multiple classes? | Different classes, same method name.          |
| Is the method being overridden?        | Check if child class has a method with the same name as parent. |
| Is the code programmed to an interface? | It calls a method without caring about the concrete type. |
| Is duck typing used?                  | Check if any object with the right method is accepted. |

---

# Chapter 23 — `call`, `apply`, `bind` in Depth

## `call`

Calls a function with a specified `this` value and individual arguments.

```javascript
function introduce(greeting, punctuation) {
    console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const user = { name: "Alice" };

introduce.call(user, "Hello", "!"); // "Hello, I'm Alice!"
```

## `apply`

Like `call`, but arguments are passed as an array.

```javascript
introduce.apply(user, ["Hi", "."]); // "Hi, I'm Alice."
```

## `bind`

Returns a **new function** with `this` permanently bound (and optionally, some arguments pre-filled).

```javascript
const boundIntroduce = introduce.bind(user, "Hey");
boundIntroduce("!!"); // "Hey, I'm Alice!!"
```

### Partial Application with `bind`

```javascript
function multiply(a, b) {
    return a * b;
}

const double = multiply.bind(null, 2); // pre-fill a = 2
const triple = multiply.bind(null, 3); // pre-fill a = 3

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

### `bind` Cannot Be Overridden

Once bound, even `call`/`apply` cannot change `this`:

```javascript
const obj = { name: "Original" };
const bound = introduce.bind(obj, "Hi");
bound.call({ name: "Other" }, "!!"); // "Hi, I'm Original!!" — ignores the call override!
```

## Use Cases

### Borrowing Methods

```javascript
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };

// Array methods don't work on array-like objects
// But we can borrow them:
const result = Array.prototype.slice.call(arrayLike, 1);
console.log(result); // ["b", "c"]

// Or:
const result2 = Array.from(arrayLike);
```

### Creating Bound Functions for Event Handlers

```javascript
class Button {
    constructor(text) {
        this.text = text;
        this.handleClick = this.handleClick.bind(this); // bind once in constructor
    }

    handleClick(event) {
        console.log(this.text, "clicked");
    }

    render() {
        const btn = document.createElement("button");
        btn.textContent = this.text;
        btn.addEventListener("click", this.handleClick);
        return btn;
    }
}
```

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Is `call`/`apply`/`bind` being used?  | Check for explicit `this` manipulation.             |
| What is `this` being set to?          | The first argument.                                  |
| Is `bind` creating a new function?    | Yes — returns a new function with fixed `this`.     |
| Is `this` permanently fixed?          | After `bind`, even `call`/`apply` can't override.   |
| Is a method being borrowed?           | Check for `Array.prototype.method.call(arrayLike)`. |

---

# Chapter 24 — Project: Full Student Management System

```javascript
// ─── Base Person ───
class Person {
    constructor(name, age) {
        if (new.target === Person) {
            throw new Error("Person is abstract — cannot instantiate");
        }
        this.name = name;
        this.age = age;
    }

    introduce() {
        return `Hi, I'm ${this.name}, age ${this.age}`;
    }

    birthday() {
        this.age++;
        return this.age;
    }
}

// ─── Student ───
class Student extends Person {
    #grades = [];  // private

    constructor(name, age, studentId) {
        super(name, age);
        this.studentId = studentId;
    }

    addGrade(subject, score) {
        if (score < 0 || score > 100) {
            throw new Error("Score must be 0-100");
        }
        this.#grades.push({ subject, score, date: new Date() });
    }

    getAverage() {
        if (this.#grades.length === 0) return 0;
        const sum = this.#grades.reduce((s, g) => s + g.score, 0);
        return Math.round((sum / this.#grades.length) * 100) / 100;
    }

    getGradeReport() {
        return {
            student: this.name,
            id: this.studentId,
            average: this.getAverage(),
            grades: [...this.#grades]  // defensive copy
        };
    }

    introduce() {
        return `${super.introduce()} (ID: ${this.studentId}, Avg: ${this.getAverage()})`;
    }
}

// ─── Teacher ───
class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
        this.#students = [];
    }

    #students;  // private

    addStudent(student) {
        if (!(student instanceof Student)) {
            throw new Error("Must be a Student instance");
        }
        this.#students.push(student);
    }

    getStudentCount() {
        return this.#students.length;
    }

    introduce() {
        return `${super.introduce()} — I teach ${this.subject}`;
    }
}

// ─── Course ───
class Course {
    static #courseCount = 0;
    static getCourseCount() { return this.#courseCount; }

    #students = [];

    constructor(name, teacher) {
        if (!(teacher instanceof Teacher)) {
            throw new Error("Teacher must be a Teacher instance");
        }
        this.name = name;
        this.teacher = teacher;
        Course.#courseCount++;
    }

    enroll(student) {
        if (!(student instanceof Student)) {
            throw new Error("Must be a Student instance");
        }
        this.#students.push(student);
        this.teacher.addStudent(student);
    }

    getRoster() {
        return this.#students.map(s => ({
            name: s.name,
            id: s.studentId,
            average: s.getAverage()
        })).sort((a, b) => b.average - a.average); // sort by grade descending
    }

    getClassAverage() {
        if (this.#students.length === 0) return 0;
        const sum = this.#students.reduce((s, st) => s + st.getAverage(), 0);
        return Math.round((sum / this.#students.length) * 100) / 100;
    }
}

// ─── Usage ───
const teacher = new Teacher("Ms. Smith", 35, "Math");
const course = new Course("Algebra", teacher);

const alice = new Student("Alice", 16, "S001");
const bob = new Student("Bob", 17, "S002");
const charlie = new Student("Charlie", 16, "S003");

alice.addGrade("Algebra", 95);
alice.addGrade("Algebra", 88);
bob.addGrade("Algebra", 72);
bob.addGrade("Algebra", 85);
charlie.addGrade("Algebra", 91);

course.enroll(alice);
course.enroll(bob);
course.enroll(charlie);

console.log("Roster:", course.getRoster());
console.log("Class Average:", course.getClassAverage());
console.log("Total Courses:", Course.getCourseCount());
console.log(alice.introduce()); // "Hi, I'm Alice, age 16 (ID: S001, Avg: 91.5)"
console.log(teacher.introduce()); // "Hi, I'm Ms. Smith, age 35 — I teach Math"
```

---

## Next: Part 7

**Part 7 — Asynchronous JavaScript**

Including:

- Event loop (full walkthrough)
- Web APIs (setTimeout, fetch, DOM events)
- Callbacks and callback hell
- Promises (states, chaining, static methods)
- `async`/`await`
- Microtask queue vs Macrotask queue
- `Fetch` API
- Error handling in async code
- Concurrency vs parallelism
- Web Workers
- Reverse engineering tactics for async code
