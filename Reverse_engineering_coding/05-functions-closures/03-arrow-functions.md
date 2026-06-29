# Arrow Functions

<img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Syntax Variations

```javascript
// No params → parentheses required
const hello = () => "Hello";

// One param → parentheses optional
const double = x => x * 2;

// Multiple params → parentheses required
const add = (a, b) => a + b;

// Block body → explicit return required
const clamp = (val, min, max) => {
    if (val < min) return min;
    if (val > max) return max;
    return val;
};

// Returning an object → wrap in parentheses!
const makeUser = (name, age) => ({ name, age });
// ⚠️ Without parens: { name, age } = a block, not an object
```

## The 5 Big Differences From Regular Functions

### 1. No own `this` — Lexical Inheritance

```javascript
// Regular function — this depends on HOW it's called
const obj1 = {
    name: "Alice",
    greet: function() {
        console.log(this.name); // "Alice" — obj1 is `this`
    }
};

// Arrow — this is inherited from surrounding scope
const obj2 = {
    name: "Bob",
    greet: () => {
        console.log(this.name); // undefined — global `this`
    }
};

obj1.greet(); // "Alice"
obj2.greet(); // undefined
```

### 2. No `arguments` Object

```javascript
function regular() {
    console.log(arguments); // Arguments [1, 2, 3]
}

const arrow = () => {
    console.log(arguments); // ❌ ReferenceError
};

// ✅ Solution: rest parameters
const arrowFixed = (...args) => {
    console.log(args); // [1, 2, 3]
};
```

### 3. Cannot Be a Constructor

```javascript
const Person = (name) => { this.name = name; };
new Person("Alice"); // ❌ TypeError: Person is not a constructor
```

### 4. No `prototype` Property

```javascript
function Regular() {}
console.log(Regular.prototype); // { constructor: Regular }

const Arrow = () => {};
console.log(Arrow.prototype);   // undefined
```

### 5. Cannot Use `new.target`

Arrow functions cannot be `new`-called, so `new.target` inside them always inherits from the enclosing function (or is `undefined`).

## When to Prefer Arrows

```javascript
// ✅ Short callbacks
[1, 2, 3].map(n => n * 2);

// ✅ Lexical `this` inside class methods
class Timer {
    constructor() {
        this.seconds = 0;
    }
    start() {
        setInterval(() => {
            this.seconds++; // ✅ `this` = Timer instance
            console.log(this.seconds);
        }, 1000);
    }
}

// ❌ Bad: arrow as object method
const obj = {
    value: 42,
    getValue: () => this.value // `this` is not obj!
};
```

## Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| Implicit return? | Yes, if no `{}` |
| Does it use `this`? | Inherited from outer scope |
| Can it be `new`-ed? | Never |
| How to access all args? | Use `...rest` |
| Has `prototype`? | No |
## Next Steps

[Back to Chapter 2](02-function-expressions-and-anonymous.md): Function Expression
[Proceed to Chapter 4](04-first-class-citizens-and-parameters.md): First-Class Citizens to learn about first-class citizens.
