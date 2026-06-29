# Object Internals: Hidden Classes, Properties, Methods & References

<img src="https://media.giphy.com/media/3oEjI9xj49ehuAGLQY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


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
fn(); // TypeError — this is undefined (strict)
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
## Next Steps

[Back to Module Overview](README.md)
[Proceed to Chapter 2](02-property-descriptors.md): Property Descriptors & Object.defineProperty to learn about property descriptors & object.defineproperty.
