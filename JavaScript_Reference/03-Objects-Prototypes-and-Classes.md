# JavaScript Objects, Prototypes, and Classes — Complete Research

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

A comprehensive reference covering every aspect of JavaScript objects, prototypes, and classes.

---

## Table of Contents

1. [Object Creation](#1-object-creation)
2. [Object Properties](#2-object-properties)
3. [Property Enumeration](#3-property-enumeration)
4. [Property Access](#4-property-access)
5. [Property Existence](#5-property-existence)
6. [Object Mutation](#6-object-mutation)
7. [Prototype Chain](#7-prototype-chain)
8. [Prototypal Inheritance Mechanics](#8-prototypal-inheritance-mechanics)
9. [ES6 Classes](#9-es6-classes)
10. [Class Inheritance: extends and super](#10-class-inheritance-extends-and-super)
11. [Mixins](#11-mixins)
12. [Symbol Usage with Objects](#12-symbol-usage-with-objects)
13. [Object Destructuring](#13-object-destructuring)
14. [Spread/Rest with Objects](#14-spreadrest-with-objects)
15. [Computed Property Names](#15-computed-property-names)
16. [Object.fromEntries() and Object.groupBy()](#16-objectfromentries-and-objectgroupby)
17. [Structured Cloning](#17-structured-cloning)
18. [WeakRef and FinalizationRegistry](#18-weakref-and-finalizationregistry)
19. [Proxy and Reflect](#19-proxy-and-reflect)
20. [All Built-in Object Methods](#20-all-built-in-object-methods)

---

## 1. Object Creation

JavaScript offers multiple ways to create objects, each with different use cases and trade-offs.

### 1.1 Object Literal Syntax

The most common and recommended way to create objects.

```js
// Empty object
const obj = {};

// Object with properties
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};

// Object with method
const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};

// Shorthand property names (ES6)
const name = "Alice", age = 30;
const user = { name, age }; // { name: "Alice", age: 30 }
```

### 1.2 Constructor Functions

Pre-ES6 way to create reusable object templates.

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const john = new Person("John", 30);
console.log(john.greet()); // "Hello, I'm John"
```

**What `new` does under the hood:**
1. Creates a new empty object `{}`
2. Links the prototype: `[[Prototype]]` → `Constructor.prototype`
3. Binds `this` to the new object
4. Executes the constructor function
5. Returns the object (unless constructor returns a different object)

### 1.3 Object.create()

Creates a new object with a specified prototype and optional property descriptors.

```js
// Create object with null prototype (no inherited properties)
const bareObj = Object.create(null);

// Create object with specific prototype
const animal = { eats: true };
const rabbit = Object.create(animal);
console.log(rabbit.eats); // true (inherited)
console.log(Object.getPrototypeOf(rabbit) === animal); // true

// Create object with property descriptors
const obj = Object.create({}, {
  prop1: {
    value: 42,
    writable: true,
    enumerable: true,
    configurable: true
  },
  prop2: {
    get() {
      return this.prop1 * 2;
    },
    enumerable: true,
    configurable: true
  }
});
console.log(obj.prop2); // 84
```

### 1.4 Class Syntax (ES6+)

Modern syntax for creating object templates.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

const alice = new Person("Alice", 25);
console.log(alice.greet()); // "Hello, I'm Alice"
```

### 1.5 The `new Object()` Constructor

Not recommended; use literals instead.

```js
const obj = new Object();
obj.name = "test";

// Equivalent to:
const obj2 = { name: "test" };
```

### 1.6 Singleton Pattern

```js
const singleton = new function() {
  this.name = "Singleton";
  this.getInstance = function() {
    return this;
  };
};
```

---

## 2. Object Properties

### 2.1 Data Properties vs Accessor Properties

Every property has a **property descriptor** — a record containing metadata about the property.

#### Data Properties

Have a `[[Value]]` and `[[Writable]]` attribute:

```js
const obj = {};

// Using defineProperty (defaults: writable=false, enumerable=false, configurable=false)
Object.defineProperty(obj, 'name', {
  value: 'Alice',
  writable: true,      // can be changed with =
  enumerable: true,    // shows up in for...in, Object.keys()
  configurable: true   // can be deleted, descriptor can be changed
});

console.log(obj.name); // "Alice"
```

#### Accessor Properties

Have `[[Get]]` and `[[Set]]` functions instead of a value:

```js
const person = {
  firstName: "John",
  lastName: "Doe",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
};

console.log(person.fullName); // "John Doe" (getter invoked)
person.fullName = "Jane Smith"; // setter invoked
console.log(person.firstName); // "Jane"
```

### 2.2 Property Descriptors

Each property descriptor is an object with these keys:

#### Common to Both Types:
- **`configurable`** (default: `false` via defineProperty, `true` via literal)
  - If `false`: property cannot be deleted, descriptor cannot be changed
  - Irreversible once set to `false` (except `writable: true → false`)
- **`enumerable`** (default: `false` via defineProperty, `true` via literal)
  - If `true`: property shows up in `for...in`, `Object.keys()`, etc.

#### Data Descriptor Additional Keys:
- **`value`** (default: `undefined`)
  - The actual value of the property
- **`writable`** (default: `false` via defineProperty, `true` via literal)
  - If `true`: value can be changed with `=` operator

#### Accessor Descriptor Additional Keys:
- **`get`** (default: `undefined`)
  - Function called when property is read
- **`set`** (default: `undefined`)
  - Function called when property is set

> **Important**: When using `Object.defineProperty()`, descriptor defaults are `false`/`undefined`. When using literal syntax or assignment, defaults are `true` for writable/enumerable/configurable.

### 2.3 Working with Descriptors

```js
const obj = { name: "test" };

// Get descriptor
const desc = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(desc);
// { value: "test", writable: true, enumerable: true, configurable: true }

// Define new property with specific descriptor
Object.defineProperty(obj, 'id', {
  value: 123,
  writable: false,
  enumerable: false,
  configurable: false
});

// Define accessor property
Object.defineProperty(obj, 'displayName', {
  get() {
    return this.name.toUpperCase();
  },
  set(value) {
    this.name = value.toLowerCase();
  },
  enumerable: true,
  configurable: true
});

// Define multiple properties
Object.defineProperties(obj, {
  prop1: { value: 1, writable: true, enumerable: true, configurable: true },
  prop2: { value: 2, writable: false, enumerable: true, configurable: true }
});

// Get all own property descriptors
const allDescs = Object.getOwnPropertyDescriptors(obj);
```

---

## 3. Property Enumeration

### 3.1 `for...in` Loop

Iterates over all **enumerable string-keyed** properties including inherited ones.

```js
const parent = { inherited: true };
const child = Object.create(parent);
child.own1 = "a";
child.own2 = "b";

for (const key in child) {
  console.log(key);
}
// "own1", "own2", "inherited"
```

Use `Object.hasOwn()` or `hasOwnProperty()` to filter only own properties:

```js
for (const key in child) {
  if (Object.hasOwn(child, key)) {
    console.log(key);
  }
}
// "own1", "own2"
```

### 3.2 `Object.keys()`

Returns an array of **own enumerable string-keyed** property names.

```js
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj)); // ["a", "b", "c"]
```

### 3.3 `Object.values()`

Returns an array of **own enumerable string-keyed** property values.

```js
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.values(obj)); // [1, 2, 3]
```

### 3.4 `Object.entries()`

Returns an array of **own enumerable string-keyed** `[key, value]` pairs.

```js
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.entries(obj)); // [["a", 1], ["b", 2], ["c", 3]]
```

### 3.5 `Object.getOwnPropertyNames()`

Returns an array of **all own** property names (including non-enumerable, but excluding Symbol properties).

```js
const obj = {};
Object.defineProperty(obj, 'hidden', {
  value: 42,
  enumerable: false
});
obj.visible = 1;

console.log(Object.getOwnPropertyNames(obj)); // ["hidden", "visible"]
console.log(Object.keys(obj)); // ["visible"] (non-enumerable excluded)
```

### 3.6 `Object.getOwnPropertySymbols()`

Returns an array of own Symbol-keyed properties.

```js
const sym = Symbol("test");
const obj = { [sym]: "value", a: 1 };

console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(test)]
console.log(Object.keys(obj)); // ["a"] (symbols excluded)
```

### 3.7 `Object.getOwnPropertyDescriptors()`

Returns all own property descriptors of an object.

```js
const obj = { name: "test" };
const descriptors = Object.getOwnPropertyDescriptors(obj);
console.log(descriptors.name);
// { value: "test", writable: true, enumerable: true, configurable: true }
```

### 3.8 Enumerability Classification

| Method | Enumerable Own | Non-Enumerable Own | Inherited | Symbol |
|--------|:-:|:-:|:-:|:-:|
| `for...in` | ✓ | | ✓ | |
| `Object.keys()` | ✓ | | | |
| `Object.values()` | ✓ | | | |
| `Object.entries()` | ✓ | | | |
| `Object.getOwnPropertyNames()` | ✓ | ✓ | | |
| `Object.getOwnPropertySymbols()` | | | | ✓ |
| `Object.getOwnPropertyDescriptors()` | ✓ | ✓ | | ✓ |
| `Reflect.ownKeys()` | ✓ | ✓ | | ✓ |

---

## 4. Property Access

### 4.1 Dot Notation

```js
const obj = { name: "Alice", age: 30 };
console.log(obj.name); // "Alice"

// With expression results in syntax error for non-identifier names
// obj.123; // SyntaxError
```

### 4.2 Bracket Notation

Allows dynamic property access and property names that aren't valid identifiers.

```js
const obj = { "my-name": "Alice", "123": "number" };

// String keys
console.log(obj["my-name"]); // "Alice"

// Numeric keys
console.log(obj[123]); // "number"

// Dynamic keys
const key = "name";
console.log(obj[key]); // undefined (key doesn't exist)

// Computed expressions
const prop = "age";
console.log(obj[prop]); // 30

// Accessing with variables
function getProperty(obj, propName) {
  return obj[propName];
}
```

### 4.3 Optional Chaining (`?.`)

Safely access deeply nested properties without throwing if an intermediate is `null`/`undefined`.

```js
const user = {
  address: {
    street: "123 Main St"
  }
};

// Safe access
console.log(user?.address?.street); // "123 Main St"
console.log(user?.phone?.number);   // undefined (no error)

// With methods
console.log(user.getName?.());     // undefined (no error)

// With arrays
const arr = [1, 2, 3];
console.log(arr?.[0]);             // 1

// With dynamic keys
const key = "address";
console.log(user?.[key]?.street);  // "123 Main St"

// Short-circuit evaluation
user?.address?.print?.(); // Does nothing if print doesn't exist
```

---

## 5. Property Existence

### 5.1 `in` Operator

Checks if a property exists anywhere in the prototype chain.

```js
const obj = { a: 1 };
const proto = { b: 2 };
Object.setPrototypeOf(obj, proto);

console.log("a" in obj);  // true (own)
console.log("b" in obj);  // true (inherited)
console.log("c" in obj);  // false
```

### 5.2 `hasOwnProperty()`

Checks if an object has the property as an **own** property (not inherited).

```js
const obj = { a: 1 };
const proto = { b: 2 };
Object.setPrototypeOf(obj, proto);

console.log(obj.hasOwnProperty("a")); // true (own)
console.log(obj.hasOwnProperty("b")); // false (inherited)
console.log(obj.hasOwnProperty("toString")); // false (inherited from Object.prototype)
```

> **Warning**: `obj.hasOwnProperty()` can fail if the object has a property named `hasOwnProperty`. Use `Object.prototype.hasOwnProperty.call(obj, prop)` as a safe alternative.

### 5.3 `Object.hasOwn()` (ES2022)

The recommended modern replacement for `hasOwnProperty()`. Works on any object, including those with null prototype.

```js
const obj = { a: 1 };
console.log(Object.hasOwn(obj, "a")); // true

// Works on objects created with null prototype
const bare = Object.create(null);
bare.prop = 42;
console.log(Object.hasOwn(bare, "prop")); // true

// Safe for all cases — no prototype chain issues
console.log(Object.hasOwn({ hasOwnProperty: () => true }, "hasOwnProperty")); // false
```

### 5.4 Checking for `undefined` vs Existence

```js
const obj = { a: undefined, b: null };

// Bracket/dot access can't distinguish "missing" from "undefined"
console.log(obj.a);   // undefined
console.log(obj.c);   // undefined

// Use 'in' or hasOwn to check existence
console.log("a" in obj);      // true
console.log("c" in obj);      // false
console.log(Object.hasOwn(obj, "a")); // true
console.log(Object.hasOwn(obj, "c")); // false
```

---

## 6. Object Mutation

### 6.1 `Object.preventExtensions()`

Prevents **adding new properties**. Existing properties can still be modified or deleted.

```js
const obj = { a: 1 };
Object.preventExtensions(obj);

obj.b = 2;       // Silently fails (or throws in strict mode)
obj.a = 100;     // Works — modifying existing property
delete obj.a;    // Works — deleting existing property

console.log(Object.isExtensible(obj)); // false
console.log(obj); // { a: 100 }
```

### 6.2 `Object.seal()`

Prevents **adding new properties** AND **deleting existing properties**. Existing property **values** can still be changed.

```js
const obj = { a: 1, b: 2 };
Object.seal(obj);

obj.c = 3;       // Silently fails
obj.a = 100;     // Works — modifying value
delete obj.b;    // Silently fails

console.log(Object.isSealed(obj)); // true
console.log(obj); // { a: 100, b: 2 }
```

**Under the hood**: `Object.seal()` calls `Object.preventExtensions()` and sets all existing property descriptors to `configurable: false`.

### 6.3 `Object.freeze()`

Makes an object **completely immutable**. No adding, deleting, or modifying property values.

```js
const obj = { a: 1, b: { c: 2 } };
Object.freeze(obj);

obj.a = 100;     // Silently fails
obj.c = 3;       // Silently fails
delete obj.a;    // Silently fails

console.log(Object.isFrozen(obj)); // true
console.log(obj); // { a: 1, b: { c: 2 } }

// WARNING: freeze is SHALLOW!
obj.b.c = 999;   // Works! Nested object is NOT frozen
console.log(obj.b.c); // 999
```

### 6.4 Feature Comparison Matrix

| Feature | Default | preventExtensions | seal | freeze |
|---------|:-------:|:-----------------:|:----:|:------:|
| Add new properties | ✓ | ✗ | ✗ | ✗ |
| Remove existing properties | ✓ | ✓ | ✗ | ✗ |
| Change existing property values | ✓ | ✓ | ✓ | ✗ |
| Change property descriptors | ✓ | ✓ | ✗ | ✗ |

### 6.5 Deep Freeze Utility

```js
function deepFreeze(obj) {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach(prop => {
    if (obj[prop] !== null
      && (typeof obj[prop] === "object" || typeof obj[prop] === "function")
      && !Object.isFrozen(obj[prop])) {
      deepFreeze(obj[prop]);
    }
  });
  return obj;
}

const config = { db: { host: "localhost", port: 5432 } };
deepFreeze(config);
config.db.port = 9999; // Silently fails
```

---

## 7. Prototype Chain

### 7.1 `[[Prototype]]` — The Internal Slot

Every JavaScript object has an internal property `[[Prototype]]` — a link to another object. This is **not directly accessible** in code (it's an engine internal).

### 7.2 `Object.getPrototypeOf(obj)`

The **recommended** way to get an object's prototype.

```js
const obj = {};
const proto = Object.getPrototypeOf(obj);
console.log(proto === Object.prototype); // true

// Prototype chain: obj → Object.prototype → null
```

### 7.3 `Object.setPrototypeOf(obj, newProto)`

Sets an object's prototype. **Performance warning**: can break engine optimizations.

```js
const parent = { greet() { return "Hello!"; } };
const child = {};
Object.setPrototypeOf(child, parent);

console.log(child.greet()); // "Hello!" (inherited)
console.log(Object.getPrototypeOf(child) === parent); // true
```

> **Best Practice**: Prefer `Object.create()` over `Object.setPrototypeOf()` for setting up inheritance, as it doesn't break optimizations.

### 7.4 `__proto__` (Legacy/Non-Standard)

An accessor property on `Object.prototype` that gets/sets `[[Prototype]]`. Not recommended.

```js
const obj = {};
const proto = { x: 10 };

// Setting via __proto__
obj.__proto__ = proto;
console.log(obj.x); // 10

// Same as:
Object.setPrototypeOf(obj, proto);
```

> **Warning**: `__proto__` is a de-facto standard but not officially part of the spec for all objects. Use `Object.getPrototypeOf()` and `Object.create()` instead.

### 7.5 Prototype Chain Termination

The chain always ends at `null`:

```
obj → Object.prototype → null
```

For arrays:
```
[1,2,3] → Array.prototype → Object.prototype → null
```

For functions:
```
fn → Function.prototype → Object.prototype → null
```

### 7.6 Property Lookup

When accessing a property, JavaScript:
1. Looks on the object itself (own property)
2. If not found, walks up the prototype chain
3. Continues until found or chain ends at `null`
4. Returns `undefined` if not found anywhere

```js
const parent = { color: "red" };
const child = Object.create(parent);
child.size = "large";

console.log(child.size);     // "large" (own)
console.log(child.color);    // "red" (inherited)
console.log(child.material); // undefined (not found)
```

---

## 8. Prototypal Inheritance Mechanics

### 8.1 Constructor Function Inheritance

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Restore constructor

Dog.prototype.bark = function() {
  return `${this.name} barks`;
};

const rex = new Dog("Rex", "German Shepherd");
console.log(rex.speak()); // "Rex makes a sound" (inherited)
console.log(rex.bark());  // "Rex barks" (own)
console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true
```

### 8.2 `new` Keyword Internals

```js
// What happens with: const obj = new Constructor(args)

// 1. Create empty object
const obj = {};

// 2. Set prototype
Object.setPrototypeOf(obj, Constructor.prototype);

// 3. Execute constructor with this = obj
const result = Constructor.call(obj, ...args);

// 4. Return obj (unless constructor returns an object)
return (typeof result === "object" && result !== null) ? result : obj;
```

### 8.3 `instanceof` Operator

Checks if `Constructor.prototype` appears anywhere in the object's prototype chain.

```js
function Parent() {}
function Child() {}
Child.prototype = Object.create(Parent.prototype);

const obj = new Child();

console.log(obj instanceof Child);  // true
console.log(obj instanceof Parent); // true
console.log(obj instanceof Object); // true

// Manual implementation of instanceof
function myInstanceof(obj, Constructor) {
  let proto = Object.getPrototypeOf(obj);
  while (proto !== null) {
    if (proto === Constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
```

### 8.4 Prototype Method Overriding

```js
function Vehicle() {}
Vehicle.prototype.start = function() {
  return "Vehicle is starting";
};

function Car() {}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

// Override parent method
Car.prototype.start = function() {
  return "Car is starting";
};

const myCar = new Car();
console.log(myCar.start()); // "Car is starting"

// Call parent method from child
Car.prototype.start = function() {
  const parentResult = Vehicle.prototype.start.call(this);
  return `${parentResult} (in a car)`;
};
```

---

## 9. ES6 Classes

### 9.1 Class Declaration and Expression

```js
// Declaration
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

// Expression (can be anonymous)
const Square = class {
  constructor(side) {
    this.side = side;
  }
};

// Named expression
const Cube = class CubeClass {
  constructor(side) {
    this.side = side;
  }
};
```

> **Note**: Class declarations are NOT hoisted like function declarations. They exist in the TDZ (Temporal Dead Zone) until the declaration is reached.

### 9.2 Constructor

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    // Return is implicitly `this`
    // If you return a different object, that object is used instead
  }
}

const p = new Person("Alice", 30);
```

### 9.3 Methods

Methods are defined on the class prototype (shared by all instances).

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  // Instance method — on prototype
  speak() {
    return `${this.name} makes a noise`;
  }

  // Getter — called as property, not function
  get info() {
    return `Name: ${this.name}`;
  }

  // Setter
  set name(value) {
    this._name = value.toUpperCase();
  }

  get name() {
    return this._name;
  }
}
```

### 9.4 Static Methods and Fields

Defined on the class itself, not on instances.

```js
class MathUtils {
  static PI = 3.14159;
  static displayName = "MathUtils";

  static add(a, b) {
    return a + b;
  }

  static {
    // Static initialization block (ES2022)
    console.log("MathUtils class initialized");
  }
}

console.log(MathUtils.PI);         // 3.14159
console.log(MathUtils.add(1, 2));  // 3

// Not accessible on instances
const m = new MathUtils();
m.PI;       // undefined
m.add;      // undefined
```

### 9.5 Private Fields (`#`)

Truly private fields and methods — not accessible from outside the class.

```js
class BankAccount {
  #balance;
  #owner;

  constructor(owner, initialBalance) {
    this.#owner = owner;
    this.#balance = initialBalance;
  }

  // Private method
  #validate(amount) {
    return amount > 0 && amount <= this.#balance;
  }

  // Private getter
  get #accountInfo() {
    return `${this.#owner}: $${this.#balance}`;
  }

  deposit(amount) {
    if (!this.#validate(amount)) throw new Error("Invalid amount");
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (!this.#validate(amount)) throw new Error("Invalid funds");
    this.#balance -= amount;
    return this.#balance;
  }

  get balance() {
    return this.#balance;
  }
}

const account = new BankAccount("Alice", 1000);
console.log(account.balance);   // 1000
// console.log(account.#balance); // SyntaxError
// account.#validate(100);        // SyntaxError
```

### 9.6 Static Private Fields and Methods

```js
class Counter {
  static #count = 0;

  static #validateId(id) {
    return typeof id === "string" && id.length > 0;
  }

  constructor(id) {
    if (!Counter.#validateId(id)) throw new Error("Invalid ID");
    this.id = id;
    Counter.#count++;
  }

  static getCount() {
    return Counter.#count;
  }
}
```

### 9.7 Public Class Fields

```js
class User {
  name = "Anonymous";  // Public field with default value
  age;                 // Public field (undefined default)

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

### 9.8 `this` in Classes

In class bodies, code runs in **strict mode** automatically.

```js
class Animal {
  speak() {
    return this;
  }

  static eat() {
    return this;
  }
}

const obj = new Animal();
const speak = obj.speak;
speak(); // undefined (not bound)

const eat = Animal.eat;
eat(); // undefined (not bound)
```

---

## 10. Class Inheritance: extends and super

### 10.1 Basic extends

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // MUST call super() before using `this`
    this.breed = breed;
  }

  speak() {
    return `${this.name} barks`;
  }

  fetch(item) {
    return `${this.name} fetches the ${item}`;
  }
}

const rex = new Dog("Rex", "Labrador");
console.log(rex.speak());    // "Rex barks"
console.log(rex.fetch("ball")); // "Rex fetches the ball"
console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true
```

### 10.2 Rules for `super()`

1. Must call `super()` before accessing `this` in a derived constructor
2. If a derived class has no constructor, one is automatically provided: `constructor(...args) { super(...args); }`
3. `super()` calls the parent constructor and returns the created object
4. Only one `super()` call is allowed per constructor

```js
class Base {
  constructor(x) {
    this.x = x;
  }
}

class Derived extends Base {
  constructor(x, y) {
    super(x);         // Call parent constructor
    this.y = y;       // Now `this` is available
  }
}
```

### 10.3 `super` for Method Calls

```js
class Parent {
  greet() {
    return "Hello from Parent";
  }
}

class Child extends Parent {
  greet() {
    const parentGreet = super.greet(); // Call parent method
    return `${parentGreet} + Hello from Child`;
  }
}

const child = new Child();
console.log(child.greet()); // "Hello from Parent + Hello from Child"
```

### 10.4 Extending Built-in Classes

```js
class CustomArray extends Array {
  sum() {
    return this.reduce((acc, val) => acc + val, 0);
  }
}

const arr = new CustomArray(1, 2, 3);
console.log(arr.sum());  // 6
console.log(arr instanceof CustomArray); // true
console.log(arr instanceof Array);       // true
```

### 10.5 `super` Property Access

```js
class Parent {
  constructor() {
    this.x = 1;
  }
}

class Child extends Parent {
  constructor() {
    super();
    console.log(super.x); // 1 (access parent's property)
  }
}
```

### 10.6 Static Inheritance

```js
class Parent {
  static create() {
    return new this();
  }
}

class Child extends Parent {
  static info() {
    return "I am Child";
  }
}

const instance = Child.create(); // Works — inherits static method
console.log(instance instanceof Child); // true
```

---

## 11. Mixins

Since JavaScript only supports single-class inheritance, mixins provide a way to compose behavior from multiple sources.

### 11.1 Object.assign Mixin Pattern

```js
const Serializable = {
  serialize() {
    return JSON.stringify(this);
  },
  deserialize(json) {
    return Object.assign(this, JSON.parse(json));
  }
};

const Loggable = {
  log() {
    console.log(this.toString());
  }
};

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

Object.assign(User.prototype, Serializable, Loggable);

const user = new User("Alice", "alice@example.com");
console.log(user.serialize());
// '{"name":"Alice","email":"alice@example.com"}'
user.log();
```

### 11.2 Mixin as Function (Mixin Factory)

```js
const Timestamped = (superclass) => class extends superclass {
  createdAt = new Date();

  getAge() {
    return Date.now() - this.createdAt.getTime();
  }
};

const Activatable = (superclass) => class extends superclass {
  isActive = false;

  activate() {
    this.isActive = true;
    this.onActivate?.();
  }

  deactivate() {
    this.isActive = false;
  }
};

class Base {}

class SmartWidget extends Activatable(Timestamped(Base)) {
  constructor(name) {
    super();
    this.name = name;
  }

  onActivate() {
    console.log(`${this.name} activated`);
  }
}

const widget = new SmartWidget("MyWidget");
widget.activate(); // "MyWidget activated"
console.log(widget.getAge()); // age in ms
```

### 11.3 Trait Object Mixin with Apply Helper

```js
function applyTraits(target, ...traits) {
  for (const trait of traits) {
    for (const key of Reflect.ownKeys(trait)) {
      if (key === "constructor") continue;
      Object.defineProperty(target, key, {
        value: trait[key],
        writable: true,
        configurable: true,
        enumerable: true
      });
    }
  }
}

const EventEmitter = {
  on(event, callback) {
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(callback);
  },
  emit(event, ...args) {
    this._events?.[event]?.forEach(cb => cb(...args));
  }
};

class MyClass {}
applyTraits(MyClass.prototype, EventEmitter);

const obj = new MyClass();
obj.on("data", (msg) => console.log(msg));
obj.emit("data", "Hello!"); // "Hello!"
```

---

## 12. Symbol Usage with Objects

### 12.1 Unique Property Keys

```js
const ID = Symbol("id");
const obj = {
  [ID]: 123,
  name: "Alice"
};

console.log(obj[ID]);     // 123
console.log(Object.keys(obj)); // ["name"] — symbols excluded
```

### 12.2 `Symbol.iterator`

Makes an object iterable with `for...of`, spread, destructuring.

```js
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
}

const range = new Range(1, 5);
for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}
console.log([...range]); // [1, 2, 3, 4, 5]
```

### 12.3 `Symbol.toPrimitive`

Controls how an object converts to a primitive value.

```js
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case "number": return this.celsius;
      case "string": return `${this.celsius}°C`;
      case "default": return this.celsius;
      default: return this.celsius;
    }
  }
}

const temp = new Temperature(25);
console.log(+temp);           // 25 (number hint)
console.log(`${temp}`);       // "25°C" (string hint)
console.log(temp + 5);        // 30 (default hint)
```

### 12.4 `Symbol.toStringTag`

Controls the result of `Object.prototype.toString()`.

```js
class Collection {
  get [Symbol.toStringTag]() {
    return "Collection";
  }
}

const coll = new Collection();
console.log(Object.prototype.toString.call(coll)); // "[object Collection]"
```

### 12.5 `Symbol.hasInstance`

Customizes `instanceof` behavior.

```js
class EvenNumber {
  static [Symbol.hasInstance](num) {
    return typeof num === "number" && num % 2 === 0;
  }
}

console.log(4 instanceof EvenNumber);  // true
console.log(3 instanceof EvenNumber);  // false
```

### 12.6 Other Well-Known Symbols

```js
// Symbol.isConcatSpreadable — controls Array.concat behavior
const arr = [1, 2, 3];
arr[Symbol.isConcatSpreadable] = false;
console.log([4, 5].concat(arr)); // [4, 5, [1, 2, 3]]

// Symbol.match — customizes String.match()
class MyPattern {
  [Symbol.match](str) {
    return str === "hello" ? ["hello"] : null;
  }
}
console.log("hello".match(new MyPattern())); // ["hello"]

// Symbol.replace — customizes String.replace()

// Symbol.search — customizes String.search()

// Symbol.split — customizes String.split()

// Symbol.species — controls the constructor for derived objects

// Symbol.unscopables — excludes properties from `with` statements
```

---

## 13. Object Destructuring

### 13.1 Basic Destructuring

```js
const user = {
  name: "Alice",
  age: 30,
  city: "New York"
};

// Without destructuring
const name = user.name;
const age = user.age;

// With destructuring
const { name: userName, age: userAge } = user;
console.log(userName); // "Alice"
console.log(userAge);  // 30
```

### 13.2 Renaming Properties

```js
const { name: myName, age: myAge } = user;
console.log(myName); // "Alice"
console.log(myAge);  // 30
```

### 13.3 Default Values

```js
const { name, age, role = "user" } = user;
console.log(role); // "user" (not in object, so default is used)
```

### 13.4 Nested Destructuring

```js
const person = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "Boston",
    state: { code: "MA", name: "Massachusetts" }
  }
};

const {
  name: pName,
  address: { street, state: { code: stateCode } }
} = person;

console.log(pName);      // "Alice"
console.log(street);     // "123 Main St"
console.log(stateCode);  // "MA"
```

### 13.5 Rest Properties

```js
const { name, ...rest } = { name: "Alice", age: 30, city: "NYC", role: "admin" };
console.log(name); // "Alice"
console.log(rest); // { age: 30, city: "NYC", role: "admin" }
```

### 13.6 Destructuring in Function Parameters

```js
function greet({ name, age = 0, greeting = "Hello" }) {
  return `${greeting}, ${name}! You are ${age}.`;
}

console.log(greet({ name: "Alice", age: 30 })); // "Hello, Alice! You are 30."
console.log(greet({ name: "Bob" })); // "Hello, Bob! You are 0."
```

### 13.7 Computed Property Names in Destructuring

```js
const prop = "name";
const { [prop]: value } = { name: "Alice" };
console.log(value); // "Alice"
```

---

## 14. Spread/Rest with Objects

### 14.1 Spread Operator with Objects (Shallow Copy)

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log(obj2); // { a: 1, b: 2, c: 3 }

// Overriding properties
const defaults = { color: "red", size: "medium", theme: "light" };
const custom = { ...defaults, theme: "dark", fontSize: 14 };
console.log(custom);
// { color: "red", size: "medium", theme: "dark", fontSize: 14 }

// Shallow copy
const original = { name: "Alice", nested: { x: 1 } };
const copy = { ...original };
copy.name = "Bob";
console.log(original.name); // "Alice" (independent)
copy.nested.x = 999;
console.log(original.nested.x); // 999 (shared reference — shallow!)
```

### 14.2 Spread in Function Calls

```js
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6
```

### 14.3 Rest Parameter in Functions

```js
function logAll(first, second, ...rest) {
  console.log(first);  // "a"
  console.log(second); // "b"
  console.log(rest);   // ["c", "d", "e"]
}

logAll("a", "b", "c", "d", "e");
```

### 14.4 Rest in Destructuring

```js
// Array rest
const [a, b, ...remaining] = [1, 2, 3, 4, 5];
console.log(remaining); // [3, 4, 5]

// Object rest
const { id, ...userData } = { id: 1, name: "Alice", age: 30, email: "a@b.com" };
console.log(id);       // 1
console.log(userData); // { name: "Alice", age: 30, email: "a@b.com" }
```

### 14.5 Merging Objects

```js
const merged = {
  ...{ a: 1 },
  ...{ b: 2 },
  ...{ a: 3, c: 4 }
};
console.log(merged); // { a: 3, b: 2, c: 4 }
```

---

## 15. Computed Property Names

### 15.1 In Object Literals

```js
const prop = "name";
const prefix = "_";

const obj = {
  [prop]: "Alice",
  [`${prefix}private`]: true,
  ["method"]() { return "hello"; },
  [Symbol.iterator]() { /* ... */ }
};

console.log(obj.name);       // "Alice"
console.log(obj._private);   // true
console.log(obj.method());   // "hello"
```

### 15.2 In Class Definitions

```js
const METHOD_NAME = "greet";

class MyClass {
  [METHOD_NAME]() {
    return "Hello!";
  }
}

const obj = new MyClass();
console.log(obj.greet()); // "Hello!"
```

### 15.3 Dynamic Property Access

```js
const key = "name";
const obj = { name: "Alice", age: 30 };

console.log(obj[key]); // "Alice"

// Dynamic key creation
function createProperty(name, value) {
  return { [`_${name}`]: value };
}

console.log(createProperty("count", 42)); // { _count: 42 }
```

### 15.4 Computed Property Names with Symbols

```js
const sym = Symbol("id");
const obj = {
  [sym]: 42,
  name: "test"
};

console.log(obj[sym]); // 42
```

---

## 16. Object.fromEntries() and Object.groupBy()

### 16.1 `Object.fromEntries()`

The reverse of `Object.entries()`. Converts an iterable of `[key, value]` pairs into an object.

```js
// From Array of pairs
const entries = [["name", "Alice"], ["age", 30], ["city", "NYC"]];
const obj = Object.fromEntries(entries);
console.log(obj); // { name: "Alice", age: 30, city: "NYC" }

// From Map
const map = new Map([["a", 1], ["b", 2]]);
const fromMap = Object.fromEntries(map);
console.log(fromMap); // { a: 1, b: 2 }

// Transform object: double all values
const prices = { apple: 1, banana: 2, cherry: 3 };
const doubled = Object.fromEntries(
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
console.log(doubled); // { apple: 2, banana: 4, cherry: 6 }

// Filter object: only values > 1
const filtered = Object.fromEntries(
  Object.entries(prices).filter(([_, value]) => value > 1)
);
console.log(filtered); // { banana: 2, cherry: 3 }

// From URL search params
const params = new URLSearchParams("name=Alice&age=30");
const fromParams = Object.fromEntries(params);
console.log(fromParams); // { name: "Alice", age: "30" }
```

### 16.2 `Object.groupBy()` (ES2024)

Groups elements of an iterable by a callback function's return value.

```js
const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 9 },
  { name: "bananas", type: "fruit", quantity: 5 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 12 },
  { name: "fish", type: "meat", quantity: 22 },
];

// Group by type
const grouped = Object.groupBy(inventory, ({ type }) => type);
console.log(grouped);
// {
//   vegetables: [{ name: "asparagus", ... }],
//   fruit: [{ name: "bananas", ... }, { name: "cherries", ... }],
//   meat: [{ name: "goat", ... }, { name: "fish", ... }]
// }

// Group numbers into low/mid/high
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const byRange = Object.groupBy(numbers, n =>
  n <= 3 ? "low" : n <= 7 ? "mid" : "high"
);
console.log(byRange);
// { low: [1, 2, 3], mid: [4, 5, 6, 7], high: [8, 9, 10] }

// Group by first character
const words = ["apple", "banana", "avocado", "blueberry"];
const byFirst = Object.groupBy(words, w => w[0]);
console.log(byFirst);
// { a: ["apple", "avocado"], b: ["banana", "blueberry"] }
```

> **Note**: `Object.groupBy()` returns a null-prototype object. There's also `Map.groupBy()` which returns a `Map` (useful when keys aren't strings).

---

## 17. Structured Cloning

### 17.1 `structuredClone()` (ES2022)

Creates a deep clone of a value using the structured clone algorithm.

```js
const original = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "Boston"
  },
  hobbies: ["reading", "gaming"],
  date: new Date(),
  regex: /test/gi,
  map: new Map([["key", "value"]]),
  set: new Set([1, 2, 3])
};

const clone = structuredClone(original);

// Deep clone — nested objects are independent
clone.address.city = "NYC";
console.log(original.address.city); // "Boston" (unchanged)

clone.hobbies.push("coding");
console.log(original.hobbies); // ["reading", "gaming"] (unchanged)
```

### 17.2 What `structuredClone` Supports

**Supported types:**
- `Array`, `ArrayBuffer`, `Boolean`, `DataView`, `Date`
- `Error` types (Error, TypeError, RangeError, etc.)
- `Map`, `Set`, `Number`, `String`, `RegExp`
- Plain objects, `TypedArray`, `Blob`, `File`, `ImageData`

**NOT supported:**
- `Function` objects (throws `DataCloneError`)
- DOM nodes (throws `DataCloneError`)
- Property descriptors, setters, getters
- Prototype chain (clone is plain object)
- Symbol properties
- Class private fields (`#field`)
- `lastIndex` property of RegExp

### 17.3 Transferable Objects

```js
const buffer = new ArrayBuffer(1024);
const clone = structuredClone(buffer, { transfer: [buffer] });
console.log(buffer.byteLength); // 0 (transferred, detached)
console.log(clone.byteLength);  // 1024
```

### 17.4 Limitations vs Spread Operator

```js
const original = { nested: { x: 1 } };

// Spread: shallow copy
const shallow = { ...original };
shallow.nested.x = 999;
console.log(original.nested.x); // 999 (shared reference!)

// structuredClone: deep copy
const deep = structuredClone(original);
deep.nested.x = 1;
console.log(original.nested.x); // 999 (independent)
```

---

## 18. WeakRef and FinalizationRegistry

Both are ES2021 features for advanced memory management.

### 18.1 Strong vs Weak References

```js
// Strong reference — prevents garbage collection
let obj = { data: "important" };
let strongRef = obj;
obj = null;
console.log(strongRef.data); // "important" (still alive)

// Weak reference — does NOT prevent garbage collection
let obj2 = { data: "important" };
const weakRef = new WeakRef(obj2);
console.log(weakRef.deref()); // { data: "important" }
obj2 = null;
// After GC, deref() returns undefined
```

### 18.2 `WeakRef` API

```js
const obj = { name: "test", data: new Array(1000000) };
const ref = new WeakRef(obj);

// Dereference the object
const derefed = ref.deref();
if (derefed) {
  console.log(derefed.name); // "test"
}

// After strong reference is removed and GC runs:
// ref.deref() → undefined
```

**Key characteristics:**
- `deref()` returns the object if still alive, `undefined` otherwise
- The reference is automatically cleared when the object is garbage collected
- Timing of GC is non-deterministic

### 18.3 `FinalizationRegistry`

Registers a callback that fires when an object is garbage collected.

```js
const registry = new FinalizationRegistry((heldValue) => {
  console.log(`Cleaned up: ${heldValue}`);
});

let obj = { resource: "database connection" };
registry.register(obj, "db-connection");

// When obj is garbage collected, callback fires:
// "Cleaned up: db-connection"

obj = null; // Object eligible for GC
```

### 18.4 Unregistering

```js
const registry = new FinalizationRegistry((value) => {
  console.log("Cleaned:", value);
});

const obj = { data: 42 };
const token = {};
registry.register(obj, "my-object", token);

// Cancel before GC
registry.unregister(token);
```

### 18.5 WeakRef Cache Pattern

```js
class WeakRefCache {
  #cache = new Map();
  #registry = new FinalizationRegistry(key => {
    this.#cache.delete(key);
  });

  set(key, value) {
    this.#cache.set(key, new WeakRef(value));
    this.#registry.register(value, key);
  }

  get(key) {
    const ref = this.#cache.get(key);
    if (!ref) return undefined;
    const obj = ref.deref();
    if (!obj) {
      this.#cache.delete(key);
      return undefined;
    }
    return obj;
  }
}
```

### 18.6 Important Caveats

- **GC timing is non-deterministic** — never rely on when cleanup happens
- **Callbacks are NOT guaranteed to run** — e.g., at page unload
- **WeakRef and FinalizationRegistry are independent** — they don't depend on each other
- **Use sparingly** — most apps don't need these; prefer regular caching patterns
- `WeakMap` and `WeakSet` also use weak references internally

---

## 19. Proxy and Reflect

### 19.1 Proxy Basics

A `Proxy` wraps an object and intercepts operations via "traps".

```js
const target = { name: "Alice", age: 30 };
const handler = {
  get(target, prop, receiver) {
    console.log(`Accessing: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    console.log(`Setting: ${prop} = ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const proxy = new Proxy(target, handler);
proxy.name;          // Logs: "Accessing: name" → "Alice"
proxy.age = 31;      // Logs: "Setting: age = 31"
```

### 19.2 All Proxy Traps

| Trap | Intercepts | Arguments |
|------|-----------|-----------|
| `get(target, prop, receiver)` | `obj.prop` / `obj[prop]` | property name |
| `set(target, prop, value, receiver)` | `obj.prop = value` | property, value |
| `has(target, prop)` | `prop in obj` | property name |
| `deleteProperty(target, prop)` | `delete obj.prop` | property name |
| `apply(target, thisArg, args)` | `fn()` (function call) | arguments |
| `construct(target, args, newTarget)` | `new Constructor()` | arguments |
| `getPrototypeOf(target)` | `Object.getPrototypeOf()` | — |
| `setPrototypeOf(target, proto)` | `Object.setPrototypeOf()` | prototype |
| `isExtensible(target)` | `Object.isExtensible()` | — |
| `preventExtensions(target)` | `Object.preventExtensions()` | — |
| `defineProperty(target, prop, desc)` | `Object.defineProperty()` | descriptor |
| `getOwnPropertyDescriptor(target, prop)` | `Object.getOwnPropertyDescriptor()` | — |
| `ownKeys(target)` | `Object.keys()`, `Reflect.ownKeys()` | — |

### 19.3 Practical Proxy Examples

#### Validation Proxy

```js
function createValidated(target, validators) {
  return new Proxy(target, {
    set(target, prop, value) {
      const validate = validators[prop];
      if (validate && !validate(value)) {
        throw new TypeError(`Invalid value for ${prop}: ${value}`);
      }
      target[prop] = value;
      return true;
    }
  });
}

const user = createValidated({}, {
  age: (v) => typeof v === "number" && v >= 0 && v <= 150,
  name: (v) => typeof v === "string" && v.length > 0
});

user.name = "Alice"; // OK
user.age = 30;       // OK
// user.age = -1;    // TypeError
```

#### Negative Array Indexing

```js
function createNegativeArray(arr) {
  return new Proxy(arr, {
    get(target, prop) {
      const index = Number(prop);
      if (Number.isInteger(index) && index < 0) {
        return target[target.length + index];
      }
      return target[prop];
    }
  });
}

const arr = createNegativeArray([1, 2, 3, 4, 5]);
console.log(arr[-1]); // 5
console.log(arr[-2]); // 4
```

#### Default Values

```js
function withDefaults(obj, defaults) {
  return new Proxy(obj, {
    get(target, prop) {
      return prop in target ? target[prop] : defaults[prop];
    }
  });
}

const config = withDefaults({ port: 3000 }, {
  host: "localhost",
  port: 8080,
  debug: false
});

console.log(config.port);  // 3000 (own)
console.log(config.host);  // "localhost" (default)
console.log(config.debug); // false (default)
```

### 19.4 Reflect API

`Reflect` provides methods that mirror every Proxy trap, used to implement default behavior.

```js
// Common Reflect methods
Reflect.get(obj, prop);
Reflect.set(obj, prop, value);
Reflect.has(obj, prop);         // 'prop' in obj
Reflect.deleteProperty(obj, prop); // delete obj[prop]
Reflect.construct(Constructor, args);
Reflect.apply(fn, thisArg, args);
Reflect.ownKeys(obj);           // [...Object.getOwnPropertyNames(), ...Object.getOwnPropertySymbols()]
Reflect.defineProperty(obj, prop, desc);
Reflect.getOwnPropertyDescriptor(obj, prop);
Reflect.getPrototypeOf(obj);
Reflect.setPrototypeOf(obj, proto);
Reflect.isExtensible(obj);
Reflect.preventExtensions(obj);
```

### 19.5 Why Use Reflect with Proxy

```js
const handler = {
  // Without Reflect — manual forwarding
  get(target, prop) {
    return target[prop]; // Doesn't handle receiver correctly
  },

  // With Reflect — correct forwarding
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver);
  }
};
```

`Reflect.get/set` correctly handle:
- `this` binding in getters/setters
- Prototype chain traversal
- Proper return values for boolean traps (`has`, `deleteProperty`, etc.)

---

## 20. All Built-in Object Methods

### 20.1 Static Methods

| Method | Description |
|--------|-------------|
| `Object.assign(target, ...sources)` | Copies own enumerable properties from sources to target |
| `Object.create(proto, descriptors)` | Creates object with specified prototype and descriptors |
| `Object.defineProperty(obj, prop, desc)` | Defines/modifies a property with specific descriptor |
| `Object.defineProperties(obj, props)` | Defines/modifies multiple properties |
| `Object.entries(obj)` | Returns array of `[key, value]` pairs |
| `Object.freeze(obj)` | Freezes object (deeply immutable surface) |
| `Object.fromEntries(iterable)` | Creates object from iterable of `[key, value]` pairs |
| `Object.getOwnPropertyDescriptor(obj, prop)` | Returns property descriptor |
| `Object.getOwnPropertyDescriptors(obj)` | Returns all property descriptors |
| `Object.getOwnPropertyNames(obj)` | Returns array of all own property names (non-enumerable included, symbols excluded) |
| `Object.getOwnPropertySymbols(obj)` | Returns array of own Symbol-keyed properties |
| `Object.getPrototypeOf(obj)` | Returns the prototype of an object |
| `Object.groupBy(items, callbackFn)` | Groups iterable elements by callback result (ES2024) |
| `Object.hasOwn(obj, prop)` | Checks if object has own property (ES2022) |
| `Object.is(value1, value2)` | Determines if two values are the same value (handles +0/-0, NaN) |
| `Object.isExtensible(obj)` | Checks if object is extensible |
| `Object.isFrozen(obj)` | Checks if object is frozen |
| `Object.isSealed(obj)` | Checks if object is sealed |
| `Object.keys(obj)` | Returns array of own enumerable string-keyed property names |
| `Object.preventExtensions(obj)` | Prevents adding new properties |
| `Object.seal(obj)` | Seals object (no add/delete, but values modifiable) |
| `Object.setPrototypeOf(obj, proto)` | Sets the prototype of an object |
| `Object.values(obj)` | Returns array of own enumerable string-keyed property values |

### 20.2 Instance Methods

| Method | Description |
|--------|-------------|
| `obj.hasOwnProperty(prop)` | **Deprecated** — use `Object.hasOwn()` instead |
| `obj.isPrototypeOf(obj2)` | Checks if `obj` is in `obj2`'s prototype chain |
| `obj.propertyIsEnumerable(prop)` | Checks if property is enumerable |
| `obj.toLocaleString()` | Returns localized string representation |
| `obj.toString()` | Returns string representation (`"[object Object]"`) |
| `obj.valueOf()` | Returns the object's primitive value (typically the object itself) |

### 20.3 `Object.is()` Details

Unlike `===`, `Object.is()` handles special cases:

```js
// These are different with === but same with Object.is:
Object.is(+0, -0);           // false (=== is true)
Object.is(NaN, NaN);         // true  (=== is false)

// Otherwise behaves like ===
Object.is(1, 1);             // true
Object.is("hello", "hello"); // true
Object.is(1, 2);             // false
```

### 20.4 `Object.assign()` Details

```js
// Shallow copy
const target = { a: 1 };
const copy = Object.assign({}, target);
console.log(copy); // { a: 1 }

// Merge objects (last wins)
const merged = Object.assign({}, { a: 1, b: 2 }, { b: 3, c: 4 });
console.log(merged); // { a: 1, b: 3, c: 4 }

// Returns target (mutates it)
const result = Object.assign(target, { x: 10 });
console.log(result === target); // true
console.log(target); // { a: 1, x: 10 }
```

### 20.5 `Object.entries()` / `Object.values()` / `Object.keys()` Caveats

```js
const obj = { a: 1, b: 2 };

// All return arrays (not iterables)
Object.keys(obj);    // ["a", "b"] — real Array
Object.values(obj);  // [1, 2]
Object.entries(obj); // [["a", 1], ["b", 2]]

// These are static methods, not instance methods
// obj.keys() does NOT work — use Object.keys(obj)

// Non-enumerable and symbol properties are excluded
Object.defineProperty(obj, 'hidden', {
  value: 42,
  enumerable: false
});
obj[Symbol("id")] = 99;

Object.keys(obj); // ["a", "b"] — hidden and symbol excluded
```

---

## Quick Reference: Method Selection Guide

| Task | Recommended Method |
|------|--------------------|
| Check own property existence | `Object.hasOwn(obj, prop)` |
| Get prototype | `Object.getPrototypeOf(obj)` |
| Set prototype (new objects) | `Object.create(proto)` |
| Set prototype (existing) | `Object.setPrototypeOf(obj, proto)` |
| Shallow copy | `{ ...obj }` or `Object.assign({}, obj)` |
| Deep copy | `structuredClone(obj)` |
| Iterate keys | `Object.keys(obj)` |
| Iterate values | `Object.values(obj)` |
| Iterate key-value pairs | `Object.entries(obj)` |
| Make immutable | `Object.freeze(obj)` |
| Seal (allow value changes) | `Object.seal(obj)` |
| Prevent additions | `Object.preventExtensions(obj)` |
| Custom property behavior | `new Proxy(target, handler)` |
| Convert entries to object | `Object.fromEntries(iterable)` |
| Group array items | `Object.groupBy(array, callback)` |
| Check value equality | `Object.is(a, b)` |

---

*This document covers all 20 major topics of JavaScript objects, prototypes, and classes with complete code examples and explanations.*
