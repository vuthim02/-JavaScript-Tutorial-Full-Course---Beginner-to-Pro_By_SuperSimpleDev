# Object-Oriented Programming in JavaScript — Complete Reference

> Comprehensive research covering all OOP concepts, patterns, and advanced techniques in JavaScript.

---

## Table of Contents

1. [OOP Principles](#1-oop-principles)
2. [Constructor Functions](#2-constructor-functions)
3. [Prototype-Based OOP](#3-prototype-based-oop)
4. [ES6 Classes](#4-es6-classes)
5. [Inheritance with Classes](#5-inheritance-with-classes)
6. [Multiple Inheritance Patterns (Mixins)](#6-multiple-inheritance-patterns-mixins)
7. [Diamond Problem](#7-diamond-problem)
8. [Polymorphism in JavaScript](#8-polymorphism-in-javascript)
9. [Abstract Classes Pattern](#9-abstract-classes-pattern)
10. [Interface Pattern (Duck Typing)](#10-interface-pattern-duck-typing)
11. [Factory Pattern for OOP](#11-factory-pattern-for-oop)
12. [SOLID Principles in JavaScript](#12-solid-principles-in-javascript)
13. [Composition vs Inheritance](#13-composition-vs-inheritance)
14. [Object.create() for Prototypal Inheritance](#14-objectcreate-for-prototypal-inheritance)
15. [Property Descriptors and Object.defineProperty()](#15-property-descriptors-and-objectdefineproperty)
16. [Sealed vs Frozen Objects](#16-sealed-vs-frozen-objects)
17. [Object.groupBy / Map.groupBy](#17-objectgroupby--mapgroupby)
18. [Enum Pattern in JavaScript](#18-enum-pattern-in-javascript)
19. [Namespace Pattern](#19-namespace-pattern)
20. [Module Pattern (Revealing Module)](#20-module-pattern-revealing-module)
21. [Singleton Pattern with Classes](#21-singleton-pattern-with-classes)
22. [Decorator Pattern with Classes](#22-decorator-pattern-with-classes)
23. [Proxy-Based Metaprogramming](#23-proxy-based-metaprogramming)
24. [Symbol-Based Protocols](#24-symbol-based-protocols)
25. [Comparison of OOP Approaches](#25-comparison-of-oop-approaches)

---

## 1. OOP Principles

Object-Oriented Programming is a paradigm that organizes code around **objects** — data structures containing data fields and methods — rather than functions and logic alone.

### 1.1 Encapsulation

**Bundling data and methods that operate on that data within a single unit, with controlled access to that data.**

```javascript
class BankAccount {
  #balance = 0; // truly private field

  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount <= 0) throw new RangeError('Deposit must be positive');
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error('Insufficient funds');
    this.#balance -= amount;
  }

  get balance() { return this.#balance; } // read-only access
}
```

**Key points:**
- Private fields (`#field`) are enforced by the JavaScript engine — accessing them outside the class is a `SyntaxError`
- Traditional pre-ES2022: underscore convention `_private`, closures, or `WeakMap`
- Benefits: prevents accidental modification, simplifies API, isolates changes

### 1.2 Abstraction

**Hiding complex implementation details and exposing only essential information.**

```javascript
class Color {
  #values;

  constructor(r, g, b) {
    this.#values = [r, g, b];
  }

  // Public interface — hides how RGB is stored internally
  getRed() { return this.#values[0]; }
  setRed(value) {
    if (value < 0 || value > 255) throw new RangeError('Invalid RGB');
    this.#values[0] = value;
  }
}
```

- Achieved through private fields/methods and public getters/setters
- The consumer doesn't need to know internal representation

### 1.3 Inheritance

**A mechanism allowing one object (child) to acquire properties and methods from another (parent).**

```javascript
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}

class Dog extends Animal {
  speak() { return `${this.name} barks`; }
}
```

- Promotes code reuse
- Creates hierarchical "is-a" relationships
- JavaScript implements inheritance through **prototype chains**

### 1.4 Polymorphism

**The ability of objects of different classes to respond to the same method in different ways.**

```javascript
class Shape {
  area() { throw new Error('area() must be implemented'); }
}

class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
  area() { return Math.PI * this.r ** 2; }
}

class Rectangle extends Shape {
  constructor(w, h) { super(); this.w = w; this.h = h; }
  area() { return this.w * this.h; }
}

const shapes = [new Circle(5), new Rectangle(4, 6)];
shapes.forEach(s => console.log(s.area())); // each calls its own area()
```

- Achieved via method overriding, duck typing, and JavaScript's dynamic dispatch

---

## 2. Constructor Functions

### 2.1 Complete Mechanics

Constructor functions are regular functions invoked with `new`. They serve as blueprints for creating objects.

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.greet = function() {
  return `Hi, I'm ${this.name}`;
};

const alice = new User('Alice', 30);
```

### 2.2 The `new` Keyword — Step-by-Step

When `new Constructor(args)` is called, JavaScript performs **four steps**:

1. **Create** — A new empty object `{}` is allocated
2. **Link prototype** — The new object's `[[Prototype]]` is set to `Constructor.prototype`
3. **Execute constructor** — The constructor runs with `this` bound to the new object
4. **Return** — If the constructor returns a non-primitive, that value is returned; otherwise the new object is returned

```javascript
function myNew(Constructor, ...args) {
  // Step 1: create object with linked prototype
  const obj = Object.create(Constructor.prototype);

  // Step 2: execute constructor with this = obj
  const result = Constructor.apply(obj, args);

  // Step 3: return result if object, otherwise obj
  return (result !== null && (typeof result === 'object' || typeof result === 'function'))
    ? result
    : obj;
}
```

### 2.3 Return Value Rules

| Constructor returns | `new` returns |
|---|---|
| Nothing (`undefined`) | The newly created `this` object |
| A primitive (string, number, boolean) | The newly created `this` (primitive is ignored) |
| An object/function | That returned object (overrides `this`) |

### 2.4 `new.target`

Inside a constructor, `new.target` is `undefined` when called without `new`, and references the constructor when called with `new`. Used to guard against missing `new`:

```javascript
function User(name) {
  if (!new.target) return new User(name); // auto-new
  this.name = name;
}
```

- Arrow functions **cannot** be used as constructors (they lack `[[Construct]]`)

---

## 3. Prototype-Based OOP

### 3.1 `__proto__` vs `prototype`

| | `__proto__` | `prototype` |
|---|---|---|
| **Exists on** | All objects | Only functions |
| **Purpose** | Points to the prototype of the object | Points to the object that becomes the prototype for instances |
| **Access** | `obj.__proto__` (deprecated) | `Constructor.prototype` |
| **Modern equivalent** | `Object.getPrototypeOf(obj)` | Direct property |

```javascript
function Foo() {}
const foo = new Foo();

foo.__proto__ === Foo.prototype;     // true
Object.getPrototypeOf(foo) === Foo.prototype; // true (modern)
Foo.__proto__ === Function.prototype;          // true (constructor's own prototype)
```

### 3.2 Prototype Chain

When accessing a property, JavaScript looks:
1. On the object itself (own property)
2. On the object's `[[Prototype]]`
3. On that prototype's `[[Prototype]]`
4. ...until `Object.prototype` → `null`

```
instance → Constructor.prototype → Object.prototype → null
```

### 3.3 `Object.getPrototypeOf()` / `Object.setPrototypeOf()`

```javascript
const obj = {};
const proto = { greet() { return 'hello'; } };

Object.setPrototypeOf(obj, proto);
Object.getPrototypeOf(obj) === proto; // true

obj.greet(); // 'hello' (found on prototype)
```

**Warning:** `Object.setPrototypeOf()` can break performance optimization. Prefer `Object.create()` at object creation time.

### 3.4 Prototype for Method Sharing

Methods placed on the constructor's prototype are shared by all instances, saving memory:

```javascript
function User(name) {
  this.name = name; // instance property (unique per instance)
}

User.prototype.greet = function() {
  return `Hi, ${this.name}`; // shared method
};

const a = new User('A');
const b = new User('B');
a.greet === b.greet; // true (same function reference)
```

### 3.5 `hasOwnProperty()`

Checks if a property exists directly on the object (not on the prototype chain):

```javascript
const user = { name: 'Alice' };
user.hasOwnProperty('name');    // true
user.hasOwnProperty('toString'); // false (inherited from Object.prototype)
```

Modern alternative: `Object.hasOwn(obj, prop)` (ES2022)

### 3.6 `isPrototypeOf()`

Checks if an object exists in another object's prototype chain:

```javascript
function Animal() {}
function Dog() {}
Dog.prototype = Object.create(Animal.prototype);

const d = new Dog();
Animal.prototype.isPrototypeOf(d); // true
Dog.prototype.isPrototypeOf(d);    // true
```

### 3.7 `propertyIsEnumerable()`

Returns `true` if a property is enumerable (shows up in `for...in` loops and `Object.keys()`):

```javascript
const obj = { x: 1 };
obj.propertyIsEnumerable('x');          // true
obj.propertyIsEnumerable('toString');   // false (inherited, non-enumerable)
```

---

## 4. ES6 Classes

ES6 classes are **syntactic sugar** over prototype-based inheritance — they use prototypes under the hood.

### 4.1 Class Declaration vs Expression

```javascript
// Declaration
class Person {
  constructor(name) { this.name = name; }
}

// Expression
const Person = class {
  constructor(name) { this.name = name; }
};

// Named expression (useful for recursion/self-reference)
const Person = class PersonInner {
  constructor(name) { this.name = name; }
};
```

**Key difference:** Class declarations are NOT hoisted (unlike function declarations). You cannot use a class before it's defined.

### 4.2 Constructor

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

const u = new User('Alice', 'alice@example.com');
```

- Only one `constructor` allowed per class
- `this` refers to the newly created instance

### 4.3 Instance Methods

```javascript
class Calculator {
  constructor(value) { this.value = value; }

  add(n) { this.value += n; return this; } // returns `this` for chaining
  subtract(n) { this.value -= n; return this; }
  result() { return this.value; }
}

new Calculator(5).add(3).subtract(1).result(); // 7
```

Methods defined in the class body are placed on the **prototype** (shared by all instances).

### 4.4 Static Methods and Static Blocks

```javascript
class MathUtils {
  static PI = 3.14159;

  static add(a, b) { return a + b; }

  static fromJSON(data) {
    const obj = JSON.parse(data);
    return new MathUtils(obj.value);
  }

  // Static block — runs once at class definition time
  static {
    console.log('MathUtils loaded');
    // Can access private static fields
  }
}

MathUtils.add(2, 3); // 5
MathUtils.PI;         // 3.14159
```

- Static methods/fields belong to the **class**, not instances
- `this` inside static methods refers to the class itself
- Multiple static blocks run in declaration order
- Static methods are inherited by subclasses

### 4.5 Getters and Setters (Accessor Properties)

```javascript
class Temperature {
  #celsius;

  constructor(celsius) { this.#celsius = celsius; }

  get celsius() { return this.#celsius; }
  set celsius(value) {
    if (value < -273.15) throw new Error('Below absolute zero');
    this.#celsius = value;
  }

  get fahrenheit() { return (this.#celsius * 9) / 5 + 32; }
  set fahrenheit(value) { this.#celsius = ((value - 32) * 5) / 9; }
}

const t = new Temperature(100);
t.fahrenheit;    // 212 (getter — looks like a property)
t.fahrenheit = 32; // setter — validates and converts
t.celsius;       // 0
```

### 4.6 Private Fields (`#privateField`)

```javascript
class Counter {
  #count = 0; // must be declared before use

  increment() { this.#count++; }
  get value() { return this.#count; }
}

const c = new Counter();
c.increment();
c.value;        // 1
// c.#count;    // SyntaxError — truly private
```

**Key properties of private fields:**
- `#` is part of the field name: `#x` and `x` are completely different properties
- Must be declared in the class body before use
- Cannot be created dynamically via assignment
- Not accessible from subclasses (unlike `protected` in other languages)
- Not visible in `Object.keys()`, `JSON.stringify()`, or spread syntax

### 4.7 Private Methods

```javascript
class User {
  #password;

  constructor(name, password) {
    this.name = name;
    this.#password = this.#hash(password);
  }

  #hash(s) {
    return [...s].reverse().join(''); // toy example
  }

  authenticate(input) {
    return this.#hash(input) === this.#password;
  }
}
```

- Private methods are not on the `.prototype` — only on the instance
- Private getters/setters also possible with `get #x()` / `set #x(v)`

### 4.8 Static Private Fields

```javascript
class Logger {
  static #defaultLevel = 'info';
  static #seenIds = new Set();

  static log(id, msg) {
    if (Logger.#seenIds.has(id)) return;
    Logger.#seenIds.add(id);
    console[Logger.#defaultLevel](msg);
  }
}
```

**Important:** Always access static private fields through the class name, not `this` (to avoid issues in subclasses).

### 4.9 Instance Fields (Class Fields)

```javascript
class User {
  name = 'Anonymous';  // public instance field
  #secret = 42;        // private instance field

  greet() { return `Hi, ${this.name}`; }
}
```

- Field initializers run **before** the constructor body (for base classes)
- In derived classes, fields initialize after `super()` returns
- Fields can have computed values and reference `this`

### 4.10 Computed Method Names

```javascript
const methodName = 'greet';

class Person {
  constructor(name) { this.name = name; }

  [methodName]() { return `Hello, ${this.name}`; }

  get ['to' + 'String']() { return `Person: ${this.name}`; }

  static [Symbol.iterator]() { /* ... */ }
}

new Person('Alice').greet(); // "Hello, Alice"
```

### 4.11 Evaluation Order

1. Class is defined (method/field keys computed)
2. Methods and accessors installed on prototype (instance) or class (static)
3. `extends` clause evaluated
4. `constructor` method and super class resolved
5. Field values and static blocks evaluated in declaration order

---

## 5. Inheritance with Classes

### 5.1 `extends` Keyword

```javascript
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}

class Dog extends Animal {
  speak() { return `${this.name} barks`; }
}
```

### 5.2 `super()` Call

In a derived class constructor, `super()` **must** be called before using `this`:

```javascript
class Dog extends Animal {
  constructor(name, breed) {
    super(name);          // MUST be first — initializes `this`
    this.breed = breed;
  }
}
```

- `super()` calls the parent class constructor
- Without it, `this` is uninitialized → `ReferenceError`

### 5.3 `super.method()`

```javascript
class SavingsAccount extends BankAccount {
  #limit;

  constructor(owner, balance, limit) {
    super(owner, balance);
    this.#limit = limit;
  }

  withdraw(amount) {
    if (amount > this.#limit) throw new Error('Over limit');
    return super.withdraw(amount); // delegate to parent
  }
}
```

### 5.4 Method Overriding

The subclass provides its own implementation of a parent method:

```javascript
class Base {
  greet() { return 'Hello from Base'; }
}

class Derived extends Base {
  greet() {
    return 'Hello from Derived'; // overrides Base.greet
  }
}
```

### 5.5 Superclass and Subclass

- **Superclass (parent/base):** the class being extended
- **Subclass (child/derived):** the class that extends another

Static methods are also inherited:

```javascript
class Parent {
  static create() { return new this(); }
}

class Child extends Parent {}
Child.create(); // creates a Child instance (this === Child in static)
```

### 5.6 `new.target` with Inheritance

`new.target` in a base constructor points to the actual subclass being instantiated:

```javascript
class Base {
  constructor() {
    console.log(new.target.name); // logs the subclass name, not 'Base'
  }
}
```

---

## 6. Multiple Inheritance Patterns (Mixins)

JavaScript only supports **single inheritance** via `extends`. To combine behaviors from multiple sources, use **mixins**.

### 6.1 Class Expression Mixins

A mixin is a function that takes a class and returns a new class with additional methods:

```javascript
const Serializable = (Base) => class extends Base {
  serialize() {
    return JSON.stringify(this);
  }
};

const Loggable = (Base) => class extends Base {
  log(msg) {
    console.log(`[${this.constructor.name}] ${msg}`);
  }
};

class User extends Serializable(Loggable(Entity)) {
  constructor(id, name) {
    super(id);
    this.name = name;
  }
}

const u = new User(1, 'Alice');
u.log('created');            // [User] created
console.log(u.serialize());  // JSON string
u instanceof Entity;         // true
```

### 6.2 Prototype Assignment Mixins

```javascript
const EventEmitter = {
  on(event, fn) {
    this._listeners = this._listeners || {};
    (this._listeners[event] = this._listeners[event] || []).push(fn);
  },
  emit(event, ...args) {
    (this._listeners?.[event] || []).forEach(fn => fn(...args));
  }
};

class User {
  constructor(name) { this.name = name; }
}

Object.assign(User.prototype, EventEmitter);

const u = new User('Alice');
u.on('save', () => console.log('saved'));
u.emit('save'); // 'saved'
```

### 6.3 Functional Mixins (Composable Factory Functions)

```javascript
const withTimestamp = (obj) => ({
  ...obj,
  createdAt: new Date(),
  updatedAt: new Date()
});

const withId = (obj) => ({
  ...obj,
  id: crypto.randomUUID()
});

const createUser = (data) => withId(withTimestamp({ ...data, type: 'user' }));

createUser({ name: 'Alice' });
// { id: '...', createdAt: ..., updatedAt: ..., name: 'Alice', type: 'user' }
```

---

## 7. Diamond Problem

The **diamond problem** occurs when a class inherits from two parents who both inherit from the same grandparent, and both parents override the same method:

```
      Base
     /    \
   A        B
     \    /
       C
```

Which `method()` does `C` use — `A`'s or `B`'s?

### In JavaScript

JavaScript avoids this by enforcing **single inheritance** with `extends`. With mixins, the **last mixin applied wins**:

```javascript
const MixinA = (Base) => class extends Base {
  greet() { return 'Hello from A'; }
};

const MixinB = (Base) => class extends Base {
  greet() { return 'Hello from B'; }
};

class MyClass extends MixinB(MixinA(Base)) {}
new MyClass().greet(); // 'Hello from B' — last mixin wins
```

**Resolution strategies:**
- **Composition:** Instead of inheriting from both, hold references to behavior objects and delegate explicitly
- **Method resolution order:** Some languages (Python C3 linearization) define a deterministic order; JavaScript relies on mixin application order

---

## 8. Polymorphism in JavaScript

### 8.1 Method Overriding (Subtype Polymorphism)

```javascript
class Vehicle {
  move() { return 'Moving'; }
}

class Car extends Vehicle {
  move() { return 'Driving'; }
}

class Boat extends Vehicle {
  move() { return 'Sailing'; }
}

function startJourney(vehicle) {
  console.log(vehicle.move()); // calls the appropriate version
}
```

### 8.2 Duck Typing (Structural Polymorphism)

> "If it walks like a duck and quacks like a duck, it's a duck."

```javascript
class Dog {
  speak() { return 'Woof!'; }
}

class Cat {
  speak() { return 'Meow!'; }
}

function makeItSpeak(animal) {
  console.log(animal.speak()); // works with any object that has speak()
}

makeItSpeak(new Dog()); // 'Woof!'
makeItSpeak(new Cat()); // 'Meow!'
makeItSpeak({ speak: () => 'Hello!' }); // 'Hello!' — no class needed
```

### 8.3 Parametric Polymorphism (via Generics in TypeScript)

```typescript
function first<T>(arr: T[]): T { return arr[0]; }
first([1, 2, 3]);       // 3
first(['a', 'b']);       // 'a'
```

### 8.4 Ad-hoc Polymorphism (Operator Overloading)

JavaScript doesn't support true operator overloading, but `Symbol.toPrimitive` allows custom conversion behavior:

```javascript
const Money = {
  valueOf() { return 42; },
  toString() { return '$42'; }
};

Money + 8; // 50 (valueOf called)
`${Money}`; // '$42' (toString called)
```

---

## 9. Abstract Classes Pattern

JavaScript has no `abstract` keyword (natively). Simulate abstract classes with a base class that throws:

```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('Shape is abstract — cannot instantiate directly');
    }
  }

  area() {
    throw new Error('area() must be implemented by subclass');
  }

  describe() {
    return `Area: ${this.area()}`; // concrete method using abstract method
  }
}

class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
  area() { return Math.PI * this.r ** 2; }
}

new Shape();        // Error: Shape is abstract
new Circle(5).describe(); // 'Area: 78.539...'
```

**Patterns for abstraction:**
- Constructor guard: `if (new.target === ClassName)` or `if (this.constructor === ClassName)`
- Method that throws: "must be implemented"
- Convention-based: naming methods as `_doSomething()` to signal they should be overridden

---

## 10. Interface Pattern (Duck Typing)

JavaScript has no `interface` keyword. Use structural typing (duck typing) and conventions:

### 10.1 Duck Typing

```javascript
function render(item) {
  // Contract: item must have a render() method
  return item.render();
}

class Button {
  render() { return '<button>'; }
}

class Card {
  render() { return '<div>'; }
}

render(new Button()); // '<button>'
render(new Card());   // '<div>'
```

### 10.2 Runtime Assertions

```javascript
class PaymentProcessor {
  #strategy;

  constructor(strategy) {
    if (typeof strategy.processPayment !== 'function') {
      throw new TypeError('strategy must implement processPayment()');
    }
    this.#strategy = strategy;
  }

  process(amount) { return this.#strategy.processPayment(amount); }
}
```

### 10.3 Abstract Base Class as Interface

```javascript
class Serializable {
  serialize() { throw new Error('Must implement serialize()'); }
  static deserialize(json) { throw new Error('Must implement deserialize()'); }
}

class User extends Serializable {
  constructor(name) { super(); this.name = name; }
  serialize() { return JSON.stringify({ name: this.name }); }
  static deserialize(json) { return new User(JSON.parse(json).name); }
}
```

### 10.4 JSDoc Contract Pattern

```javascript
/**
 * @typedef {Object} Renderer
 * @property {(data: any) => string} render
 * @property {() => void} cleanup
 */

/** @param {Renderer} renderer */
function display(renderer) {
  console.log(renderer.render({ title: 'Hello' }));
}
```

---

## 11. Factory Pattern for OOP

### 11.1 Simple Factory Function

```javascript
function createUser(name, role) {
  const base = { name, role, createdAt: new Date() };

  if (role === 'admin') {
    return { ...base, permissions: ['read', 'write', 'delete'] };
  }
  return { ...base, permissions: ['read'] };
}

const admin = createUser('Alice', 'admin');
const user = createUser('Bob', 'user');
```

### 11.2 Factory with Private State (Closures)

```javascript
function createCounter(initial = 0) {
  let count = initial; // private via closure

  return {
    increment() { count++; },
    decrement() { count--; },
    get value() { return count; }
  };
}

const c = createCounter(10);
c.increment();
c.value;   // 11
// c.count; // undefined — truly private
```

### 11.3 Factory vs Constructor

| Feature | Factory Function | Constructor/Class |
|---|---|---|
| `new` required | No | Yes |
| `instanceof` | Doesn't work | Works |
| Privacy | Closures (truly private) | Private fields (`#`) |
| Methods on prototype | No (own properties) | Yes (shared via prototype) |
| Flexibility | Can return different shapes | Always returns class instance |
| Memory | Each instance has own methods | Shared prototype methods |

---

## 12. SOLID Principles in JavaScript

### 12.1 Single Responsibility Principle (SRP)

> A class/module should have only one reason to change.

```javascript
// BAD: one class does everything
class UserManager {
  authenticate(user) { /* ... */ }
  sendEmail(user, msg) { /* ... */ }
  generateReport(users) { /* ... */ }
}

// GOOD: separate concerns
class AuthService { authenticate(user) { /* ... */ } }
class EmailService { sendEmail(user, msg) { /* ... */ } }
class ReportService { generateReport(users) { /* ... */ } }
```

### 12.2 Open/Closed Principle (OCP)

> Open for extension, closed for modification.

```javascript
// BAD: must modify to add new shipping
function getShippingCost(type, order) {
  if (type === 'ground') return order.weight * 1.5;
  if (type === 'air') return order.weight * 3;
  // must edit this function to add 'drone'
}

// GOOD: extend without modification
const shippingStrategies = {
  ground: (order) => order.weight * 1.5,
  air: (order) => order.weight * 3,
};
// To add drone: shippingStrategies.drone = (order) => ...
```

### 12.3 Liskov Substitution Principle (LSP)

> Subtypes must be usable wherever the base type is expected.

```javascript
class Bird {
  fly() { return 'flying'; }
}

class Penguin extends Bird {
  fly() { throw new Error('Penguins cannot fly!'); } // VIOLATION — breaks expectations
}

// Better: separate flying birds
class FlyingBird {
  fly() { return 'flying'; }
}

class Penguin {
  swim() { return 'swimming'; }
}
```

### 12.4 Interface Segregation Principle (ISP)

> Clients should not be forced to depend on interfaces they don't use.

```javascript
// BAD: fat interface
class SmartDevice {
  print() {}
  scan() {}
  fax() {}
}

// GOOD: segregated
class Printer { print() {} }
class Scanner { scan() {}
class FaxMachine { fax() {} }

class AllInOne extends Printer {
  // composes only what it needs
}
```

In JavaScript (duck typing), ISP manifests as: prefer small, focused functions/modules over large ones.

### 12.5 Dependency Inversion Principle (DIP)

> Depend on abstractions, not concrete implementations.

```javascript
// BAD
class MySQLDatabase {
  save(data) { /* ... */ }
}

class UserService {
  constructor() {
    this.db = new MySQLDatabase(); // tightly coupled
  }
}

// GOOD: depend on abstraction
class UserService {
  constructor(database) {
    this.db = database; // inject any compatible database
  }
}

const service = new UserService(new MySQLDatabase());
const testService = new UserService(new InMemoryDatabase());
```

---

## 13. Composition vs Inheritance

### 13.1 Inheritance (IS-A)

```javascript
class Animal {}
class Dog extends Animal {} // Dog IS-A Animal
```

**Problems:**
- Deep hierarchies are rigid
- Changes to parent affect all children
- Multiple inheritance not supported
- Tight coupling

### 13.2 Composition (HAS-A)

```javascript
class Dog {
  constructor(barkBehavior, eatBehavior) {
    this.bark = barkBehavior;
    this.eat = eatBehavior;
  }
}

const loudBark = () => 'WOOF!';
const kibble = () => 'eating kibble';

const rex = new Dog(loudBark, kibble);
rex.bark(); // 'WOOF!'
```

**Advantages:**
- Swap behaviors at runtime
- Each behavior testable in isolation
- No diamond problem
- More flexible and composable

### 13.3 Composition with Classes

```javascript
class Validator {
  validate(data) { return data.length > 0; }
}

class Logger {
  log(msg) { console.log(msg); }
}

class Form {
  constructor() {
    this.validator = new Validator();
    this.logger = new Logger();
  }

  submit(data) {
    if (this.validator.validate(data)) {
      this.logger.log('Submitted!');
      return true;
    }
    return false;
  }
}
```

**Rule of thumb:** Start with composition. Reach for inheritance only when the relationship is genuinely "is-a" and shallow (2 levels deep max).

---

## 14. `Object.create()` for Prototypal Inheritance

`Object.create(proto, propertiesObject)` creates a new object with the specified prototype.

### 14.1 Basic Usage

```javascript
const animal = { eats: true, walk() { return 'walking'; } };
const dog = Object.create(animal);

dog.barks = true;
dog.__proto__ === animal; // true
dog.eats;                // true (inherited)
```

### 14.2 Creating Objects with `null` Prototype

```javascript
const dict = Object.create(null);
dict.toString; // undefined — no inherited properties from Object.prototype
```

### 14.3 Setting Property Descriptors

```javascript
const obj = Object.create(prototype, {
  name: { value: 'Alice', writable: true, enumerable: true, configurable: true },
  age: { value: 30, writable: false } // read-only
});
```

### 14.4 Inheritance Chain Setup

```javascript
function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { return `${this.name} speaks`; };

function Dog(name) {
  Animal.call(this, name); // call parent constructor
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // fix constructor reference

Dog.prototype.bark = function() { return `${this.name} barks`; };
```

### 14.5 Shallow Copy with `Object.create`

```javascript
const copy = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);
```

---

## 15. Property Descriptors and `Object.defineProperty()`

### 15.1 Property Descriptor Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `value` | any | `undefined` | The property's value |
| `writable` | boolean | `false` | Can the value be changed? |
| `get` | function | `undefined` | Getter function |
| `set` | function | `undefined` | Setter function |
| `configurable` | boolean | `false` | Can the property be deleted or reconfigured? |
| `enumerable` | boolean | `false` | Does it show up in `for...in` / `Object.keys()`? |

### 15.2 Data vs Accessor Descriptors

```javascript
const obj = {};

// Data descriptor
Object.defineProperty(obj, 'x', {
  value: 42,
  writable: true,
  enumerable: true,
  configurable: true
});

// Accessor descriptor
Object.defineProperty(obj, 'temperature', {
  get() { return this._temp; },
  set(val) { this._temp = val; },
  enumerable: true,
  configurable: true
});
```

### 15.3 Defaults with `Object.defineProperty()`

By default, properties created with `Object.defineProperty()` are:
- `writable: false`
- `enumerable: false`
- `configurable: false`

Properties in object literals are `true` for all three.

### 15.4 `Object.defineProperties()`

```javascript
Object.defineProperties(obj, {
  firstName: { value: 'Alice', writable: true },
  lastName: { value: 'Smith', writable: true },
  fullName: {
    get() { return `${this.firstName} ${this.lastName}`; },
    enumerable: true
  }
});
```

---

## 16. Sealed vs Frozen Objects

### 16.1 `Object.preventExtensions()`

- Prevents adding new properties
- Existing properties can still be modified/deleted

```javascript
const obj = { x: 1 };
Object.preventExtensions(obj);
obj.y = 2;  // fails (silent in sloppy, TypeError in strict)
obj.x = 10; // works
Object.isExtensible(obj); // false
```

### 16.2 `Object.seal()`

- Prevents adding **or removing** properties
- Existing properties can still be modified (if writable)
- All properties become `configurable: false`

```javascript
const obj = { x: 1, y: 2 };
Object.seal(obj);

obj.z = 3;      // fails (can't add)
delete obj.x;   // fails (can't delete)
obj.x = 10;     // works (writable by default)
Object.isSealed(obj); // true
```

### 16.3 `Object.freeze()`

- Prevents adding, removing, **or modifying** properties
- Makes all properties `writable: false` and `configurable: false`
- Shallow only — nested objects are not frozen

```javascript
const obj = { x: 1, nested: { y: 2 } };
Object.freeze(obj);

obj.x = 10;         // fails (silent or TypeError in strict)
obj.nested.y = 99;  // WORKS — nested object not frozen!
Object.isFrozen(obj); // true
```

### 16.4 Deep Freeze

```javascript
function deepFreeze(obj) {
  Object.freeze(obj);
  for (const key of Object.getOwnPropertyNames(obj)) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Object.isFrozen(obj[key])) {
      deepFreeze(obj[key]);
    }
  }
  return obj;
}
```

### 16.5 Comparison

| Operation | `preventExtensions` | `seal` | `freeze` |
|---|---|---|---|
| Add properties | No | No | No |
| Delete properties | Yes | No | No |
| Modify values | Yes | Yes | No |
| Change descriptors | Yes | No | No |
| Change prototype | Yes | Yes | No |

---

## 17. Object.groupBy / Map.groupBy

ES2024 static methods for grouping iterable elements.

### 17.1 `Object.groupBy()`

Returns a **null-prototype object** (prevents collisions with `Object.prototype`):

```javascript
const inventory = [
  { name: 'asparagus', type: 'vegetables', quantity: 5 },
  { name: 'bananas', type: 'fruit', quantity: 0 },
  { name: 'goat', type: 'meat', quantity: 23 },
  { name: 'cherries', type: 'fruit', quantity: 12 },
  { name: 'fish', type: 'meat', quantity: 22 },
];

const grouped = Object.groupBy(inventory, ({ type }) => type);
// {
//   vegetables: [{ name: 'asparagus', ... }],
//   fruit: [{ name: 'bananas', ... }, { name: 'cherries', ... }],
//   meat: [{ name: 'goat', ... }, { name: 'fish', ... }]
// }
```

### 17.2 `Map.groupBy()`

Returns a **`Map`** — supports non-string keys:

```javascript
const even = { label: 'even' };
const odd = { label: 'odd' };

const grouped = Map.groupBy([1, 2, 3, 4, 5], (num) =>
  num % 2 === 0 ? even : odd
);

grouped.get(even); // [2, 4]
grouped.get(odd);  // [1, 3, 5]
```

### 17.3 When to Use Which

| Use `Object.groupBy` when | Use `Map.groupBy` when |
|---|---|
| You want destructuring | You need non-string keys |
| Group keys are strings | Group keys are objects |
| You need a plain object result | You need `Map` methods (`.size`, `.has()`) |

---

## 18. Enum Pattern in JavaScript

JavaScript has no native `enum` type. Common patterns:

### 18.1 Frozen Object

```javascript
const Direction = Object.freeze({
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
});

function move(direction) {
  if (!Object.values(Direction).includes(direction)) {
    throw new Error(`Invalid direction: ${direction}`);
  }
  // ...
}

move(Direction.UP);   // works
move('DIAGONAL');      // Error
```

### 18.2 Symbol-Based Enums

```javascript
const Status = {
  PENDING: Symbol('PENDING'),
  ACTIVE: Symbol('ACTIVE'),
  DELETED: Symbol('DELETED')
};

// Prevents name collisions between different enums
const OrderStatus = {
  PENDING: Symbol('PENDING'), // different Symbol from Status.PENDING
};
```

### 18.3 Class-Based Enums

```javascript
class Color {
  static RED = new Color('red');
  static GREEN = new Color('green');
  static BLUE = new Color('blue');

  #name;

  constructor(name) {
    this.#name = name;
  }

  toString() { return this.#name; }
}

Color.RED.toString(); // 'red'
Color.RED instanceof Color; // true
```

### 18.4 TypeScript Enums (for reference)

```typescript
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
```

---

## 19. Namespace Pattern

Before ES6 modules, namespaces were used to avoid global namespace pollution:

### 19.1 Object Literal Namespace

```javascript
const MyApp = {
  Models: {},
  Views: {},
  Utils: {
    formatDate(d) { return d.toISOString(); }
  }
};

MyApp.Models.User = class User { /* ... */ };
MyApp.Utils.formatDate(new Date());
```

### 19.2 IIFE Namespace

```javascript
const ShoppingCart = (function() {
  let items = [];

  return {
    addItem(item) { items.push(item); },
    getCount() { return items.length; }
  };
})();
```

### 19.3 ES6 Modules (Modern Replacement)

```javascript
// utils.js
export function formatDate(d) { return d.toISOString(); }

// main.js
import { formatDate } from './utils.js';
```

**In 2025+:** Namespace patterns are **dead**. ES modules provide everything namespaces offered and more.

---

## 20. Module Pattern (Revealing Module)

### 20.1 Classic Module Pattern (IIFE)

```javascript
const Calculator = (function() {
  let result = 0; // private

  function add(x) { result += x; }
  function subtract(x) { result -= x; }
  function getResult() { return result; }

  return { add, subtract, getResult }; // public API
})();

Calculator.add(5);
Calculator.subtract(2);
Calculator.getResult(); // 3
```

### 20.2 Revealing Module Pattern

```javascript
const Counter = (function() {
  let count = 0; // private

  function increment() { count++; }
  function decrement() { count--; }
  function getCount() { return count; }

  return {
    increment,     // reveal these
    decrement,
    getCount       // and this
    // count is hidden
  };
})();
```

### 20.3 Modern ES Module Pattern

```javascript
// counter.js
let count = 0; // module-scoped (private to module)

export function increment() { count++; }
export function decrement() { count--; }
export function getCount() { return count; }
```

### 20.4 Module Pattern with Class

```javascript
// user.js
const #privateField = Symbol('private');

class User {
  #secret;

  constructor(name) {
    this.name = name;
    this.#secret = crypto.randomUUID();
  }

  get secret() { return this.#secret; }
}

export { User };
```

---

## 21. Singleton Pattern with Classes

Ensures only one instance of a class exists.

### 21.1 Classic Implementation

```javascript
class Database {
  static #instance = null;

  #connection;

  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }
    this.#connection = this.#connect();
    Database.#instance = this;
  }

  #connect() { return { connected: true }; }

  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
    }
    return Database.#instance;
  }
}

const db1 = new Database();
const db2 = new Database();
db1 === db2; // true
```

### 21.2 ES Module Singleton (Simpler)

```javascript
// config.js — module exports are cached; only one instance exists
class Config {
  #values = {};

  set(key, value) { this.#values[key] = value; }
  get(key) { return this.#values[key]; }
}

export default new Config();
```

### 21.3 When to Use

- Configuration managers
- Database connection pools
- Logging services

**Caution:** Singletons introduce hidden dependencies and make testing harder. Prefer dependency injection when possible.

---

## 22. Decorator Pattern with Classes

Adds behavior to objects dynamically by wrapping them.

### 22.1 Class-Based Decorator

```javascript
class BaseAPI {
  async fetch(url) {
    const res = await fetch(url);
    return res.json();
  }
}

class CachedAPI {
  #inner;
  #cache = new Map();

  constructor(api) { this.#inner = api; }

  async fetch(url) {
    if (this.#cache.has(url)) return this.#cache.get(url);
    const data = await this.#inner.fetch(url);
    this.#cache.set(url, data);
    return data;
  }
}

class LoggedAPI {
  #inner;

  constructor(api) { this.#inner = api; }

  async fetch(url) {
    console.log(`Fetching ${url}`);
    const data = await this.#inner.fetch(url);
    console.log(`Fetched ${url}`);
    return data;
  }
}

// Compose: logging → caching → real API
const api = new LoggedAPI(new CachedAPI(new BaseAPI()));
```

### 22.2 Function Decorator

```javascript
function withLogging(fn) {
  return function(...args) {
    console.log(`Calling ${fn.name} with`, args);
    const result = fn.apply(this, args);
    console.log(`${fn.name} returned`, result);
    return result;
  };
}

function add(a, b) { return a + b; }

const loggedAdd = withLogging(add);
loggedAdd(2, 3);
// Calling add with [2, 3]
// add returned 5
```

### 22.3 TC39 Decorators (Stage 3, shipping 2025-2026)

```javascript
function logged(value, { kind, name }) {
  if (kind === 'method') {
    return function(...args) {
      console.log(`Calling ${name}`);
      return value.call(this, ...args);
    };
  }
}

class Calculator {
  @logged
  add(a, b) { return a + b; }
}
```

---

## 23. Proxy-Based Metaprogramming

### 23.1 Proxy Fundamentals

`Proxy` intercepts and customizes fundamental operations on objects:

```javascript
const handler = {
  get(target, prop, receiver) {
    console.log(`Accessed: ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    console.log(`Set ${String(prop)} = ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);
user.name;      // logs "Accessed: name", returns 'Alice'
user.age = 31;  // logs "Set age = 31"
```

### 23.2 Available Traps

| Trap | Intercepts |
|---|---|
| `get(target, prop, receiver)` | Property read |
| `set(target, prop, value, receiver)` | Property write |
| `has(target, prop)` | `in` operator |
| `deleteProperty(target, prop)` | `delete` operator |
| `apply(target, thisArg, args)` | Function call |
| `construct(target, args)` | `new` operator |
| `getPrototypeOf(target)` | `Object.getPrototypeOf()` |
| `setPrototypeOf(target, proto)` | `Object.setPrototypeOf()` |
| `isExtensible(target)` | `Object.isExtensible()` |
| `preventExtensions(target)` | `Object.preventExtensions()` |
| `getOwnPropertyDescriptor(target, prop)` | `Object.getOwnPropertyDescriptor()` |
| `defineProperty(target, prop, desc)` | `Object.defineProperty()` |
| `ownKeys(target)` | `Object.keys()`, `Reflect.ownKeys()` |

### 23.3 Practical Uses

**Validation:**
```javascript
function validated(target, schema) {
  return new Proxy(target, {
    set(obj, prop, value) {
      if (schema[prop] && !schema[prop](value)) {
        throw new TypeError(`Invalid value for ${String(prop)}: ${value}`);
      }
      return Reflect.set(obj, prop, value);
    }
  });
}

const user = validated({}, {
  age: (v) => typeof v === 'number' && v >= 0
});

user.age = 25;  // works
user.age = -1;  // TypeError
```

**Default values:**
```javascript
const handler = {
  get(target, prop) {
    return prop in target ? target[prop] : 42;
  }
};

const obj = new Proxy({}, handler);
obj.x; // 42 (default)
```

**Reactivity (Vue 3 pattern):**
```javascript
function reactive(obj, onChange) {
  return new Proxy(obj, {
    set(target, prop, value) {
      const oldValue = target[prop];
      target[prop] = value;
      if (oldValue !== value) onChange(prop, value, oldValue);
      return true;
    }
  });
}
```

### 23.4 `Reflect` API

`Reflect` provides methods mirroring every Proxy trap, for forwarding operations:

```javascript
const handler = {
  get(target, prop, receiver) {
    // Always use Reflect to preserve correct `this` binding
    return Reflect.get(target, prop, receiver);
  }
};
```

**Key benefit:** `Reflect.get(target, prop, receiver)` correctly handles getter `this` binding when accessed through the proxy.

---

## 24. Symbol-Based Protocols

Well-known Symbols customize JavaScript's built-in behavior.

### 24.1 `Symbol.iterator`

Makes an object iterable with `for...of`, spread, destructuring:

```javascript
class Range {
  constructor(start, end) { this.start = start; this.end = end; }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        return current <= end
          ? { value: current++, done: false }
          : { done: true };
      }
    };
  }
}

[...new Range(1, 5)]; // [1, 2, 3, 4, 5]
for (const n of new Range(1, 3)) console.log(n); // 1, 2, 3
```

### 24.2 `Symbol.toPrimitive`

Controls how an object converts to a primitive:

```javascript
class Money {
  constructor(amount) { this.amount = amount; }

  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':  return this.amount;
      case 'string':  return `$${this.amount}`;
      case 'default': return this.amount;
    }
  }
}

const price = new Money(42);
+price;        // 42 (number)
`${price}`;    // '$42' (string)
price + 8;     // 50 (default → number)
```

### 24.3 `Symbol.hasInstance`

Customizes `instanceof` behavior:

```javascript
class EvenNumber {
  static [Symbol.hasInstance](value) {
    return typeof value === 'number' && value % 2 === 0;
  }
}

4 instanceof EvenNumber;  // true
3 instanceof EvenNumber;  // false
```

### 24.4 `Symbol.toStringTag`

Customizes `Object.prototype.toString()`:

```javascript
class Collection {
  get [Symbol.toStringTag]() { return 'Collection'; }
}

const c = new Collection();
Object.prototype.toString.call(c); // '[object Collection]'
```

### 24.5 `Symbol.isConcatSpreadable`

Controls `Array.prototype.concat` behavior:

```javascript
class Matrix {
  constructor(data) { this.data = data; }
  get [Symbol.isConcatSpreadable]() { return true; }
}
```

### 24.6 `Symbol.match` / `Symbol.replace` / `Symbol.search` / `Symbol.split`

Customize `String.prototype.match()`, `.replace()`, `.search()`, `.split()`:

```javascript
class Version {
  constructor(str) { this.str = str; }
  static [Symbol.match](str) { return str.match(/\d+\.\d+/g); }
}

'v1.2 and v3.4'.match(Version); // ['1.2', '3.4']
```

### 24.7 `Symbol.species`

Controls what constructor is used for derived objects:

```javascript
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
```

### 24.8 `Symbol.asyncIterator`

Makes an object work with `for await...of`:

```javascript
class AsyncRange {
  constructor(start, end) { this.start = start; this.end = end; }

  async *[Symbol.asyncIterator]() {
    for (let i = this.start; i <= this.end; i++) {
      await new Promise(r => setTimeout(r, 100));
      yield i;
    }
  }
}
```

### 24.9 Complete Symbol Table

| Symbol | Purpose |
|---|---|
| `Symbol.iterator` | Default iterator for `for...of` |
| `Symbol.asyncIterator` | Default async iterator for `for await...of` |
| `Symbol.toPrimitive` | Custom type conversion |
| `Symbol.hasInstance` | Custom `instanceof` |
| `Symbol.toStringTag` | Custom `Object.prototype.toString()` |
| `Symbol.isConcatSpreadable` | Controls `Array.concat` |
| `Symbol.match` | Custom `String.prototype.match()` |
| `Symbol.matchAll` | Custom `String.prototype.matchAll()` |
| `Symbol.replace` | Custom `String.prototype.replace()` |
| `Symbol.search` | Custom `String.prototype.search()` |
| `Symbol.split` | Custom `String.prototype.split()` |
| `Symbol.species` | Constructor for derived objects |
| `Symbol.unscopables` | Excludes from `with` bindings |

---

## 25. Comparison of OOP Approaches

### 25.1 Prototype-Based vs Class-Based vs Factory Functions

| Feature | Raw Prototypes | ES6 Classes | Factory Functions |
|---|---|---|---|
| **Syntax** | Verbose, manual | Clean, familiar | Simplest |
| **`new` required** | Yes (for constructors) | Yes | No |
| **`instanceof`** | Works | Works | Doesn't work |
| **Inheritance** | Manual prototype wiring | `extends`/`super` | Composition |
| **Method sharing** | Via `.prototype` | Via `.prototype` (implicit) | Own properties per instance |
| **Privacy** | Closures / WeakMap | `#private` fields | Closures |
| **`this` binding** | Context-dependent | Must use `this` | Can avoid `this` entirely |
| **Flexibility** | High (runtime changes) | Medium (structured) | High (return anything) |
| **Type safety** | None | Better with TypeScript | None (without TS) |
| **Modern usage** | Library internals | Framework code, React | Functional, utility code |

### 25.2 When to Use Each

**Use raw prototypes when:**
- Building polyfills or library internals
- Need runtime prototype mutation
- Performance-critical code with shared methods

**Use ES6 classes when:**
- Building clear inheritance hierarchies
- Working with frameworks (React, Angular)
- Need `instanceof` checks
- Team is familiar with classical OOP
- TypeScript is in use

**Use factory functions when:**
- Need composition over inheritance
- Want true encapsulation via closures
- Don't need `instanceof`
- Building lightweight utility objects
- Need flexible object shapes

### 25.3 The Modern JavaScript Verdict

```
                    ┌─────────────────────────────────────────┐
                    │         WHICH OOP APPROACH?              │
                    │                                          │
                    │  Need instanceof checks?                 │
                    │    YES → ES6 Class                       │
                    │    NO  ↓                                  │
                    │  Need clear inheritance hierarchy?       │
                    │    YES → ES6 Class with extends           │
                    │    NO  ↓                                  │
                    │  Need multiple behaviors?                 │
                    │    YES → Factory + Composition            │
                    │    NO  ↓                                  │
                    │  Need truly private data?                 │
                    │    YES → Either (closures or #fields)     │
                    │    NO  ↓                                  │
                    │  Building simple utilities?               │
                    │    YES → Factory functions                │
                    │    NO  → ES6 Class (default choice)       │
                    └─────────────────────────────────────────┘
```

### 25.4 Key Takeaways

1. **Prototypes are the engine, classes are the steering wheel.** Understand prototypes to debug; use classes to write.
2. **Composition beats inheritance** in most real-world codebases. Prefer HAS-A over IS-A.
3. **Private fields (`#`) are hard private** — enforced by the engine, not convention.
4. **`new` is a protocol:** create → link prototype → bind `this` → return.
5. **Factory functions** are simpler for composition and avoid `this` pitfalls.
6. **Mixins** solve multiple-inheritance needs without the diamond problem (last mixin wins).
7. **Proxy + Reflect** enable powerful metaprogramming (validation, reactivity, logging).
8. **Well-known Symbols** are JavaScript's protocol system — customize `instanceof`, iteration, type conversion, and more.
9. **Object.freeze/seal** provide immutability guarantees at the object level.
10. **SOLID principles** apply to JavaScript — adapt them to the language's strengths (duck typing, first-class functions, modules).

---

## Sources

- MDN Web Docs: Object-oriented programming, Classes, Private elements, Proxy, Symbol
- ECMAScript 2025 Language Specification
- javascript.info: Constructor, operator "new"; Prototype methods
- Exploring JavaScript (ES2025 Edition): Classes, Metaprogramming
- TC39 Proposals: Mixins, First-Class Protocols, Array Grouping
- Dev.to, Medium, CSS-Tricks: OOP patterns, SOLID principles, Design patterns
- 33 JavaScript Concepts: Factories & Classes, Design Patterns
