# Hoisting and the Temporal Dead Zone

<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1719413365715/6dc5f12b-05a3-4fcf-b4ba-d050355d5164.gif" alt="Animated GIF" style="width:400px; height:300px;">



## What Is Hoisting?

**Hoisting** is JavaScript's behavior of moving variable *declarations* to the top of their scope before code runs. But the details differ between `var`, `let`, and `const`.

---

## How `var` Hoists

```javascript
console.log(a); // undefined (no error — but why?)
var a = 10;
console.log(a); // 10
```

JavaScript sees this as:

```javascript
var a;           // Declaration moved to top — initialized as undefined
console.log(a);  // undefined
a = 10;          // Assignment stays in place
console.log(a);  // 10
```

The variable exists from the start of its scope, but its value is `undefined` until the assignment line runs.

---

## How `let` and `const` Hoist

```javascript
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;
```

`let` and `const` are *technically* hoisted (the engine knows they exist), but they are placed in a **Temporal Dead Zone (TDZ)**.

---

## The Temporal Dead Zone (TDZ)

<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1663333436509/vAEBrYtKJ.gif" alt="Animated GIF" style="width:400px; height:300px;">

---
The TDZ is the period between entering scope and the actual declaration where the variable exists but cannot be accessed.

```
Start of block
      ↓
   [TDZ starts] ← let b is hoisted here but is inaccessible
      ↓
   console.log(b) ← ReferenceError — you're in the TDZ
      ↓
   let b = 10;   ← TDZ ends here — b is now accessible
      ↓
   console.log(b) ← 10
```

The TDZ is a *feature*, not a bug. It prevents you from using a variable before it's been properly initialized.

---

## Reverse Engineering: Variables

**For any variable declaration you see:**

| Question | Answer |
|---|---|
| Where does this variable live in memory? | Primitives → stack. Objects → heap (variable holds a reference). |
| When is it created? | When execution reaches the declaration (or at scope top for `var`) |
| When is it destroyed? | When it goes out of scope (garbage collector cleans it up) |
| Can I access it before this line? | Only `var` (returns `undefined`). `let`/`const` throw a ReferenceError (TDZ). |
| What is its initial value? | `undefined` for `var` and `let`; `const` must be initialized immediately |
| Can its type change? | Yes — you can reassign a `let` variable to a different type |

**For `const user = { age: 20 }`:**

| Question | Answer |
|---|---|
| Is the object constant? | No — only the *reference* is constant. The object's contents can change. |
| Can I do `user.age = 30`? | Yes — mutating the object is allowed |
| Can I do `user = {}`? | No — reassignment is what `const` prevents |
| How do I make the object truly immutable? | `Object.freeze(user)` — but only a shallow freeze |

**Pattern recognition:**

```javascript
let x = ...    // This value is expected to change later
const x = ...  // This value should stay the same
var x = ...    // Legacy code — watch out for scope issues
```
## Next Steps

[Back to Chapter 5](05-variables.md): Variables
[Proceed to Chapter 7](07-arithmetic-operators.md): Arithmetic Operators to learn about arithmetic operators.
