# Object Internals: Hidden Classes, Properties, Methods & References

## Object Literal

```javascript
const user = { name: "John", age: 25 };
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

JavaScript engines (V8) use "hidden classes" (shapes) to optimize property access. Objects with the same properties share the same hidden class, enabling fast property lookups.

## Accessing Properties

```javascript
user.name;       // "John" — dot notation
user["name"];    // "John" — bracket notation
const key = "age";
user[key];       // 25 — dynamic key
console.log(user.salary); // undefined — no error for non-existent
```

## Modifying & Deleting Properties

```javascript
user.age = 30;          // modify
user.city = "Boston";   // add
delete user.age;        // true
delete user;            // false — cannot delete variable
```

## Methods

```javascript
const user = {
    name: "John",
    greet: function() { console.log("Hello, " + this.name); }
};
// ES6 shorthand
const user2 = { name: "Jane", greet() { console.log("Hello, " + this.name); } };
```

**Memory:** The function object is not stored inside the object — only a reference to it.

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

### Method Binding — The `this` Problem

```javascript
user.greet(); // "John"
const fn = user.greet;
"use strict";
fn(); // TypeError — this is undefined (strict mode)
// Without "use strict", this would be the global object (window)
```

**Fix:** `const boundFn = user.greet.bind(user);`

## Dynamic Properties & Computed Names

```javascript
user.age = 25;
user["city"] = "Boston";
delete user.age;

const key = "dynamicKey";
const obj = {
    [key]: "dynamic value",
    [`computed_${key}`]: "also dynamic"
};
```

### Property Presence Check

```javascript
"name" in user;              // true (own + inherited)
user.hasOwnProperty("name"); // true (own only)
Object.hasOwn(user, "name"); // true (ES2022)
```

## Object References Deep Dive

Objects are always passed and assigned by reference.

```javascript
const a = { value: 10 };
const b = a;
b.value = 20;
console.log(a.value); // 20
```

```text
Stack:                  Heap:
a: 0x7ffe1234 ─────────→ ┌────────────────┐
b: 0x7ffe1234 ─────────→ │ { value: 20 }  │
                         └────────────────┘
```

### Reassignment vs Mutation

```javascript
const obj = { value: 10 };
obj.value = 20;            // mutation — allowed
obj = { value: 30 };       // TypeError — const prevents reassignment
```

### Property Descriptors

Every property has three internal attributes:

| Attribute | Controls | Default |
|-----------|----------|---------|
| `writable` | Can the value be changed? | `true` |
| `enumerable` | Does it appear in `for...in` / `Object.keys()`? | `true` |
| `configurable` | Can the descriptor itself be changed or the property deleted? | `true` |

```javascript
const obj = { x: 1 };
console.log(Object.getOwnPropertyDescriptor(obj, "x"));
// { value: 1, writable: true, enumerable: true, configurable: true }

Object.defineProperty(obj, "x", { writable: false });
obj.x = 2; // silently fails (or TypeError in strict mode)
```

### Getters and Setters

Properties can be backed by functions instead of values:

```javascript
const user = {
    firstName: "John",
    lastName: "Doe",
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(value) {
        [this.firstName, this.lastName] = value.split(" ");
    }
};
console.log(user.fullName); // "John Doe"
user.fullName = "Jane Smith";
console.log(user.firstName); // "Jane"
```

### The Prototype Chain

Every object has an internal `[[Prototype]]` link. When you access `obj.prop`, JS first checks `obj`, then follows the prototype chain:

```text
user ──→ User.prototype ──→ Object.prototype ──→ null

user.toString() works because JS finds toString on Object.prototype,
even though user itself doesn't have it.
```

### Property Enumeration Order

Integer keys come first (ascending), then string keys (insertion order), then symbols (insertion order):

```javascript
const obj = { b: 1, a: 2, 2: 3, 1: 4 };
console.log(Object.keys(obj)); // ["1", "2", "b", "a"]
```

### Comparing Objects

```javascript
{} === {}            // false — different references
const a = {}, b = a;
a === b;             // true

function shallowEqual(a, b) {
    if (a === b) return true;
    const keysA = Object.keys(a), keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => a[key] === b[key]);
}
// Note: NaN !== NaN, so shallowEqual({a: NaN}, {a: NaN}) returns false
// Use Object.is for NaN/-0 correctness
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why object instead of array? | Named keys for semantic access; order not important |
| What happens if a property does not exist? | Returns `undefined` — no error |
| Is the property name fixed or computed? | Check for `[expression]` or `variable[key]` |
| Are properties added dynamically? | Dynamic addition causes shape transitions (slower) |
| How is `this` determined? | By the object on the left of the dot at call time |
| Is the method extracted and called separately? | If so, `this` may be lost |
| Is the object copied or shared? | Objects are always shared by reference |
| Does mutation through one variable affect another? | Yes — if they reference the same object |
| How do I create an independent copy? | Shallow: `{...obj}`. Deep: `structuredClone(obj)` |
| Is `const` preventing mutation? | No — const prevents reassignment, not mutation |
| What does `Object.defineProperty` let me do? | Control writable, enumerable, configurable per property |
| How does `obj.toString()` work when `obj` has no `toString`? | Prototype chain — JS walks up to Object.prototype |
| Why are integer keys ordered differently? | V8 stores numeric-indexed properties separately, sorted ascending |
| What does `"inline or external"` mean in the memory diagram? | V8 stores properties with known shape inline; dynamic additions go to external properties store |
| How can I detect NaN correctly when comparing? | Use `Object.is(a, b)` instead of `===` for NaN/-0 safety |
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-property-descriptors.md): Property Descriptors & Object.defineProperty to learn about property descriptors & object.defineproperty.
