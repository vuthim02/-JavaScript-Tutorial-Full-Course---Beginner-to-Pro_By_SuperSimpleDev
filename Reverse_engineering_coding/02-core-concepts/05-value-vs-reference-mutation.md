# Value vs Reference and Mutation

## The Most Important Concept for Beginners

JavaScript has two kinds of values:

| Type | Examples | Stored as | Behavior |
|------|---------|-----------|---------|
| **Primitive** | `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint` | Directly as the value | **Copied** when assigned |
| **Reference** | `object`, `array`, `function` | As a pointer to the object | **Pointer is copied** when assigned |

---

## Primitives Are Copied by Value

When you copy a primitive, you get a **completely independent copy**. Changing one has NO effect on the other.

```javascript
let a = 10;
let b = a;   // b gets a COPY of the value 10

b = 20;      // change b...

console.log(a);   // 10 ← a is UNCHANGED
console.log(b);   // 20
```

---

## Objects/Arrays Are Copied by Reference

When you "copy" an object, you copy the **reference** (the arrow pointing to the object), NOT the object itself. Both variables point to the SAME object.

```javascript
let obj1 = { color: "blue" };
let obj2 = obj1;    // obj2 copies the REFERENCE, not the object

obj2.color = "red";   // change through obj2...

console.log(obj1.color);  // "red" ← CHANGED! Both point to the same object!
console.log(obj2.color);  // "red"
```

---

## Comparing Values vs References

```javascript
// Primitives: compared by VALUE
5 === 5;               // true
"hello" === "hello";   // true

// Objects/Arrays: compared by REFERENCE (memory location)
{} === {};             // false — two different objects
[] === [];             // false — two different arrays

const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
arr1 === arr2;         // false — different objects

const arr3 = arr1;     // same reference
arr3 === arr1;         // true
```

---

## Reassignment vs Mutation — A Critical Distinction

| Action | What it changes | Does it affect other references? |
|--------|----------------|--------------------------------|
| **Reassignment** | What the variable POINTS TO | ❌ No — only changes local variable |
| **Mutation** | The CONTENTS of the object | ✅ Yes — all references see the change |

```javascript
// REASSIGNMENT
let obj = { value: 1 };
let ref = obj;

obj = { value: 2 };       // obj points to a NEW object
console.log(obj.value);   // 2
console.log(ref.value);   // 1 — ref still points to the original

// MUTATION
let a = { value: 1 };
let b = a;
a.value = 999;            // mutate the object
console.log(b.value);     // 999 — b sees the change!
```

---

## JavaScript Is Always Pass by Value

Every time you pass an argument to a function, it is **passed by value**. The confusion comes from what "value" means for objects:
- For primitives: the **data itself** is copied
- For objects: the **reference (pointer)** is copied

```javascript
// Primitives — function cannot change the caller's variable
function tryToChange(x) { x = 999; }
let num = 42;
tryToChange(num);
console.log(num);  // 42 ← UNCHANGED!

// Objects — function CAN mutate the shared object
function modifyUser(user) { user.name = "Modified"; }
const myUser = { name: "Tim" };
modifyUser(myUser);
console.log(myUser.name);  // "Modified" — mutation IS visible
```

**Reassignment inside a function does NOT affect the caller — only mutation does:**

```javascript
function mutate(obj) { obj.value = "x"; }    // ✅ visible outside
function replace(obj) { obj = { x: 1 }; }     // ❌ NOT visible outside

let test = { value: "original" };
mutate(test);   console.log(test.value);  // "x"
replace(test);  console.log(test.value);  // "x" (replace had no effect)
```

---

## Shallow Copy vs Deep Copy

### Shallow Copy

A **shallow copy** creates a new object and copies all top-level properties. Nested objects are **shared**.

```javascript
const original = {
    name: "Tim",
    settings: { theme: "dark" }
};

const shallow = { ...original };   // spread = shallow copy

shallow.name = "Alice";            // ✅ independent (primitive)
console.log(original.name);        // "Tim" — unchanged

shallow.settings.theme = "light";  // ⚠️ shared (reference!)
console.log(original.settings.theme); // "light" — changed!
```

### Deep Copy

A **deep copy** creates a completely independent clone at every nesting level.

```javascript
const original = {
    name: "Tim",
    address: { city: "Phnom Penh" },
    scores: [95, 87]
};

// Method 1: structuredClone() — modern standard (recommended)
const deep = structuredClone(original);

deep.address.city = "Singapore";
deep.scores.push(100);

console.log(original.address.city);  // "Phnom Penh" ← unchanged ✅
console.log(original.scores);        // [95, 87] ← unchanged ✅

// Method 2: JSON round-trip — works everywhere, but loses functions/dates
const deep2 = JSON.parse(JSON.stringify(original));
```

### Quick Copy Reference

| Method | Shallow? | Deep? | Handles functions? | Handles circular refs? |
|--------|---------|------|-------------------|----------------------|
| `{...obj}` / `[...arr]` | ✅ | ❌ | kept | safe |
| `Object.assign({}, obj)` | ✅ | ❌ | kept | safe |
| `JSON.parse(JSON.stringify())` | ❌ | ✅ | ❌ lost | 💥 crash |
| `structuredClone(obj)` | ❌ | ✅ | ❌ lost | ✅ handled |

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this a primitive or reference type? | Check with `typeof` or look at the value |
| If I copy this variable, is the copy independent? | Primitives: yes. Objects/arrays: no |
| Are these two variables pointing to the same object? | Use `===` to compare |
| Was this object mutated or the variable reassigned? | Mutation changes contents; reassignment changes the pointer |
| Will modifying one affect the other? | Only if they share a reference |

### Quick Test

```javascript
// Predict: primitive → independent copy, reference → shared
let x = 5; 
let y = x; y = 10; 
console.log(x);   // ? → 5
let arr = [1, 2, 3];
let c = arr; c.push(4); 
console.log(arr);  // ? → [1,2,3,4]
let obj = { n: 1 }; 
let ref = obj;
ref = { n: 999 };
console.log(obj.n);  // ? → 1
```
## Next Steps

[Back to Chapter 4](04-hoisting-and-tdz.md): Hoisting and the Temporal Dead Zone
[Proceed to Chapter 6](06-data-types-and-typeof.md): Data Types and the typeof Operator to learn about data types and the typeof operator.
