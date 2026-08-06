# Chapter 3 — The Prototype Chain

## Overview

Every JavaScript object has an internal link to another object called its prototype. This chain of prototypes is how property lookup and inheritance work.

---

## How Prototype Lookup Works

```javascript
const animal = { eats: true };
const rabbit = { jumps: true };

Object.setPrototypeOf(rabbit, animal);

rabbit.jumps; // true (own property)
rabbit.eats;  // true (inherited from animal)
rabbit.walks; // undefined (not found in chain)
```

---

## Visualizing the Chain

```javascript
function Dog(name) {
    this.name = name;
}
Dog.prototype.bark = function () {
    return `${this.name} says woof`;
};

const rex = new Dog('Rex');

// rex → Dog.prototype → Object.prototype → null
console.log(rex.__proto__ === Dog.prototype);            // true
console.log(Dog.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null);         // true
```

---

## hasOwnProperty vs in

```javascript
const obj = { a: 1 };
Object.setPrototypeOf(obj, { b: 2 });

obj.hasOwnProperty('a'); // true (own)
obj.hasOwnProperty('b'); // false (inherited)
'a' in obj;              // true
'b' in obj;              // true (includes inherited)
```

---

## Modifying Prototypes at Runtime

```javascript
function Person(name) {
    this.name = name;
}

const alice = new Person('Alice');
const bob = new Person('Bob');

Person.prototype.greet = function () {
    return `Hi, I'm ${this.name}`;
};

// Both instances see the new method
alice.greet(); // "Hi, I'm Alice"
bob.greet();   // "Hi, I'm Bob"
```

---

## Next Steps

[Back to Chapter 2](02-property-descriptors.md): Property Descriptors
[Proceed to Chapter 4](04-prototypes.md): Prototypes and the new Operator
