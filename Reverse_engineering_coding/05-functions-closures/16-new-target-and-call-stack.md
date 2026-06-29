# `new.target`

<img src="https://media.giphy.com/media/l0HlwKpPGceLgQC9W/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Is `new.target`?

`new.target` is a meta-property available inside functions and constructors. It tells you **whether** the function was called with `new`, and **which** constructor was called.

```javascript
function Person(name) {
    if (!new.target) {
        throw new Error("Person must be called with new!");
    }
    this.name = name;
}

new Person("Alice"); // ✅ works
Person("Alice");     // ❌ Error: Person must be called with new!
```

## `new.target` Values

```javascript
function Foo() {
    console.log(new.target);
}

Foo();         // undefined — called without new
new Foo();     // function Foo — called with new
```

## Detecting Subclasses

In inheritance, `new.target` points to the **actual constructor called**, not the parent:

```javascript
class Animal {
    constructor() {
        console.log(new.target.name);
    }
}

class Dog extends Animal {
    constructor() {
        super(); // calls Animal's constructor
    }
}

new Animal(); // "Animal"
new Dog();    // "Dog" ← new.target = Dog (not Animal!)
```

## Abstract Class Pattern

```javascript
// "Abstract" class — cannot be instantiated directly
class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error("Shape is abstract — use a subclass");
        }
        // subclasses pass through fine
    }

    area() { throw new Error("area() must be implemented"); }
}

class Circle extends Shape {
    constructor(radius) {
        super(); // new.target = Circle, not Shape — OK
        this.radius = radius;
    }
    area() { return Math.PI * this.radius ** 2; }
}

new Shape();  // ❌ Error: Shape is abstract
new Circle(5); // ✅ works
```

## Flexible Constructor (With or Without `new`)

```javascript
function createUser(name) {
    if (!new.target) {
        return new createUser(name); // auto-wrap with new
    }
    this.name = name;
}

const a = new createUser("Alice"); // ✅ explicit new
const b = createUser("Bob");       // ✅ auto new — same result
console.log(a.name); // "Alice"
console.log(b.name); // "Bob"
```

---

# Call Stack (Detailed)

## What Is the Call Stack?

A **LIFO (Last In, First Out)** data structure tracking which execution contexts are active. When a function is called, its context is **pushed**. When it returns, it's **popped**.

## Detailed Walkthrough

```javascript
function one() {
    console.log("one start");
    two();
    console.log("one end");
}
function two() {
    console.log("two start");
    three();
    console.log("two end");
}
function three() {
    console.log("three");
}
one();
```

```
Call: one()
Stack: [Global] [one]

Call: two() from inside one()
Stack: [Global] [one] [two]

Call: three() from inside two()
Stack: [Global] [one] [two] [three]

three() returns
Stack: [Global] [one] [two]

two() returns
Stack: [Global] [one]

one() returns
Stack: [Global]

Output:
one start → two start → three → two end → one end
```

## Inspecting the Stack

```javascript
function a() { b(); }
function b() { c(); }
function c() {
    console.trace(); // prints the call stack
    // Prints: c → b → a → ...
}
a();

// In a thrown error, .stack property has the trace
function explode() {
    throw new Error("Boom!");
}
try { explode(); }
catch (e) { console.log(e.stack); }
```

## Stack and Async

```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");

// Output: A → D → C → B
// Why: A and D are synchronous (stack).
// C is a microtask (runs when stack empty, before macrotasks).
// B is a macrotask (setTimeout — runs after microtasks).
```

## Reverse Engineering Checklist

### For `new.target`

| Question | Answer |
|----------|--------|
| Was the function called with `new`? | Check `new.target` — undefined if not, constructor fn if yes. |
| Which constructor was actually called? | `new.target` shows the original constructor, even in subclass `super()` calls. |
| How to enforce `new`? | Check `if (!new.target) throw new Error(...)`. |
| How to allow both patterns? | Auto-wrap: `return new.target ? this : new Constructor()`. |

### For Call Stack

| Question | Answer |
|----------|--------|
| Which function is currently executing? | The top of the stack. |
| Which function called this one? | One frame down in the stack. |
| Is the stack growing without returning? | Likely infinite recursion — will cause stack overflow. |
| What is the maximum stack depth? | Browser-specific (~10k-50k frames). |
| How to view the stack? | `console.trace()` or `err.stack` in a caught error. |
## Next Steps

[Back to Chapter 15](15-call-apply-bind.md): `call()` / `apply()` / `bind()`
[Proceed to Chapter 17](17-async-functions.md): Async Functions & `async`/`await` to learn about async functions & `async`/`await`.
