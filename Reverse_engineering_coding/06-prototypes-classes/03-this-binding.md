# The `this` Keyword: Binding Rules & call/apply/bind

<img src="https://media.giphy.com/media/SvFocn0wNMx0iv2rYz/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Is `this`?

`this` refers to the execution context of a function. Its value is determined by **how the function is called**, not where it is defined (except arrow functions).

## The Five Rules

### Rule 1: Default Binding (Global)

```javascript
function showThis() { console.log(this); }
showThis(); // global (non-strict) / undefined (strict)
```

### Rule 2: Implicit Binding (Method Call)

```javascript
const user = { name: "John", greet() { console.log(this.name); } };
user.greet(); // "John" — this → user

const anotherUser = { name: "Jane" };
anotherUser.greet = user.greet;
anotherUser.greet(); // "Jane" — this → anotherUser (left of the dot)
```

### Rule 3: Explicit Binding (call, apply, bind)

```javascript
function introduce(greeting) {
    console.log(`${greeting}, I'm ${this.name}`);
}
const user = { name: "Alice" };

introduce.call(user, "Hello");  // "Hello, I'm Alice"
introduce.apply(user, ["Hi"]);  // "Hi, I'm Alice"

const bound = introduce.bind(user);
bound("Hey"); // "Hey, I'm Alice"

// bind is permanent
bound.call({ name: "Other" }, "Hi"); // "Hi, I'm Alice" — ignores override
```

### Rule 4: Constructor Binding (new)

```javascript
function User(name) { this.name = name; }
const u = new User("John");
console.log(u.name); // "John"
```

### Rule 5: Arrow Functions (Lexical this)

```javascript
const user = {
    name: "John",
    greet: () => { console.log(this.name); } // NOT user — outer scope
};
user.greet(); // undefined

const user2 = {
    name: "Jane",
    greet() {
        const inner = () => console.log(this.name);
        inner(); // "Jane" — inherits from greet's scope
    }
};
```

### Priority

```text
1. new binding              → new object
2. explicit binding         → explicitly set object (call, apply, bind)
3. implicit binding         → object on left of dot
4. default binding          → global (non-strict) or undefined (strict)
```

Arrow functions ignore all of the above — lexical `this` wins.

## `this` in Different Contexts

```javascript
// Global
console.log(this); // window (browser) / module.exports (Node)

// Regular function
function show() { console.log(this); }
show(); // global (non-strict) / undefined (strict)

// Method
const obj = { name: "test", method() { console.log(this.name); } };
obj.method(); // "test"

// Constructor
function Person(name) { this.name = name; console.log(this); }
const p = new Person("Alice");

// call/apply/bind
function logThis() { console.log(this); }
const target = { id: 1 };
logThis.call(target);   // { id: 1 }
logThis.apply(target);  // { id: 1 }
logThis.bind(target)(); // { id: 1 }
```

## Arrow Functions Deep Dive

### The Classic Problem

```javascript
function Timer() {
    this.seconds = 0;
    setInterval(function() {
        this.seconds++; // this is NOT Timer — it's global/undefined
    }, 1000);
}
```

**Old solutions:**

```javascript
function Timer() {
    this.seconds = 0;
    const self = this;
    setInterval(function() { self.seconds++; }, 1000);
}
// Or: setInterval(function() { this.seconds++; }.bind(this), 1000);
```

### The Arrow Solution

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

### Arrow Functions in Classes

```javascript
class Button {
    constructor(text) {
        this.text = text;
        this.handleClick = () => { console.log(this.text); };
    }
}
const btn = new Button("Click me");
const fn = btn.handleClick;
fn(); // "Click me" — still the Button instance!
```

**Trade-off:** Arrow methods create a new function per instance (not shared on the prototype).

## call, apply, bind — In Depth

### Partial Application with bind

```javascript
function multiply(a, b) { return a * b; }
const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);
console.log(double(5));  // 10
```

### Borrowing Methods

```javascript
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
const result = Array.prototype.slice.call(arrayLike, 1);
console.log(result); // ["b", "c"]
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Who called this function? | How was it invoked? (plain, method, new, call/apply/bind) |
| What object is on the left of the dot? | That's `this` for method calls |
| Is this an arrow function? | If yes, `this` is lexical |
| Is strict mode enabled? | Affects default binding (global vs undefined) |
| Was `bind` used? | `this` is permanently fixed |
| Is the method extracted and called separately? | If so, `this` may be lost |
## Next Steps

[Back to Chapter 2](02-property-descriptors.md): Property Descriptors & Object.defineProperty
[Proceed to Chapter 4](04-prototypes.md): Prototypes & the Prototype Chain to learn about prototypes & the prototype chain.
