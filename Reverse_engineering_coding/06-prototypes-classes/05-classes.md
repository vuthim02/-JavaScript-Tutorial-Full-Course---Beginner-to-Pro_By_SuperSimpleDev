# ES6+ Class Syntax, Inheritance & instanceof

## What Is a Class?

ES6 `class` is syntactic sugar over prototype-based constructors.

```javascript
class User {
    constructor(name) { this.name = name; }
    greet() { console.log(`Hello, ${this.name}`); }
}
const user = new User("Alice");
```

### Equivalent Prototype Code

```javascript
function User(name) { this.name = name; }
User.prototype.greet = function() { console.log(`Hello, ${this.name}`); };
console.log(typeof User); // "function"
```

### Key Differences

| Aspect | Class | Constructor Function |
|--------|-------|---------------------|
| Hoisting | Not hoisted (TDZ) | Hoisted |
| Strict mode | Always strict | Configurable |
| Called without `new` | TypeError | Works (pollutes global) |

### Class Fields (ES2022+)

```javascript
class User {
    name = "Anonymous";
    #id; // private
    constructor(name, id) { this.name = name; this.#id = id; }
    getId() { return this.#id; }
}
console.log(u.#id); // SyntaxError
```

## Methods Inside Classes

Methods are on the prototype — shared across instances.

```javascript
class User {
    constructor(name) { this.name = name; }
    greet() { console.log("Hi, " + this.name); }
}
const u1 = new User("Alice"), u2 = new User("Bob");
console.log(u1.hasOwnProperty("greet")); // false
console.log(u1.greet === u2.greet);      // true
```

### Class Methods and `this`

```javascript
class Button {
    constructor(text) { this.text = text; }
    click() { console.log(this.text); }
}
const btn = new Button("Submit");
btn.click(); // "Submit"
const handler = btn.click;
handler(); // TypeError — this is undefined (strict)
```

**Fixes:** Bind in constructor or use arrow field.

```javascript
class Button {
    constructor(text) { this.text = text; this.click = this.click.bind(this); }
    click() { console.log(this.text); }
}
class Button2 {
    constructor(text) { this.text = text; }
    click = () => { console.log(this.text); }; // per-instance, not shared
}
```

### Getters & Setters

```javascript
class Circle {
    constructor(r) { this._radius = r; }
    get radius() { return this._radius; }
    set radius(v) { if (v <= 0) throw new Error("Must be positive"); this._radius = v; }
}
```

## Static Members

Belong to the class itself, not instances.

```javascript
class MathUtils { static add(a, b) { return a + b; } }
console.log(MathUtils.add(5, 3)); // 8
class Config { static apiUrl = "https://api.example.com"; } // ES2022+

class Parent { static greet() { return "Hello"; } }
class Child extends Parent {}
console.log(Child.greet()); // "Hello" — Child.__proto__ === Parent
```

## Inheritance with `extends`

```javascript
class Animal {
    constructor(name) { this.name = name; }
    speak() { console.log(`${this.name} makes a sound`); }
}
class Dog extends Animal {
    constructor(name, breed) { super(name); this.breed = breed; }
    speak() { console.log(`${this.name} barks`); } // override
}
new Dog("Rex").speak(); // "Rex barks"
// dog → Dog.prototype → Animal.prototype → Object.prototype → null
```

### `super`

- `super()` — calls parent constructor, must be called before `this`.
- `super.method()` — calls parent method with child's `this`.

```javascript
class Dog extends Animal {
    speak() { super.speak(); console.log("...wags tail"); }
}
```

### Polymorphism via Overriding

```javascript
class Shape { area() { return 0; } describe() { return `Area: ${this.area()}`; } }
class Circle extends Shape { constructor(r) { super(); this.radius = r; } area() { return Math.PI * this.radius ** 2; } }
class Square extends Shape { constructor(s) { super(); this.side = s; } area() { return this.side ** 2; } }
[new Circle(5), new Square(4)].forEach(s => console.log(s.describe()));
```

## `instanceof` Operator

Checks if `Constructor.prototype` is in the object's prototype chain.

```javascript
function User(name) { this.name = name; }
const user = new User("John");
console.log(user instanceof User);   // true
console.log(user instanceof Object); // true

class Animal {} class Dog extends Animal {}
const d = new Dog();
console.log(d instanceof Dog);    // true
console.log(d instanceof Animal); // true
```

### Conceptual Implementation

```javascript
function myInstanceof(obj, Ctor) {
    let proto = Object.getPrototypeOf(obj);
    while (proto) { if (proto === Ctor.prototype) return true; proto = Object.getPrototypeOf(proto); }
    return false;
}
```

**Cross-realm caveat:** Arrays from another iframe fail `instanceof Array` — use `Array.isArray()`.

## Built-in Constructors

```text
{} → Object.prototype → null
[] → Array.prototype → Object.prototype → null
fn → Function.prototype → Object.prototype → null
```

### Subclassing Built-ins

```javascript
class MyArray extends Array {
    first() { return this[0]; }
    sum() { return this.reduce((a, b) => a + b, 0); }
}
const arr = new MyArray(1, 2, 3);
console.log(arr.first()); // 1
console.log(arr instanceof Array); // true
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this a class or constructor? | Class is syntactic sugar over prototypes |
| Is the class hoisted? | No — TDZ until declaration |
| Can this be called without `new`? | No — TypeError |
| Are there private fields? | Check for `#` prefix |
| Where is the method stored? | Prototype (shared) or instance (arrow field)? |
| Is the method shared? | If on prototype, yes. If arrow field, no |
| Are static members inherited? | Yes — via constructor `__proto__` chain |
## Next Steps

[Back to Chapter 4](04-prototypes.md): Prototypes & the Prototype Chain
[Proceed to Chapter 6](06-encapsulation-polymorphism.md): Encapsulation, Polymorphism & Composition to learn about encapsulation, polymorphism & composition.
