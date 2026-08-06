# Chapter 9 — Mixins

## Overview

Mixins are a way to compose behavior from multiple sources when JavaScript only supports single inheritance.

---

## Function-Based Mixins

```javascript
const Serializable = (superclass) => class extends superclass {
    serialize() {
        return JSON.stringify(this);
    }
};

const Loggable = (superclass) => class extends superclass {
    log() {
        console.log(this.toString());
    }
};

class User {
    constructor(name) { this.name = name; }
}

class SerializableUser extends Serializable(User) {
    toString() { return `User(${this.name})`; }
}

class FullUser extends Serializable(Loggable(User)) {
    toString() { return `FullUser(${this.name})`; }
}

const u = new FullUser('Alice');
u.serialize(); // '{"name":"Alice"}'
u.log();       // "FullUser(Alice)"
```

---

## Object.assign Mixin Pattern

```javascript
const canEat = {
    eat() { this.energy++; return this; },
};

const canWalk = {
    walk() { this.energy--; return this; },
};

function createAnimal(name) {
    const animal = { name, energy: 10 };
    return Object.assign(animal, canEat, canWalk);
}

const dog = createAnimal('Rex');
dog.eat().walk();
```

---

## Class-Based Mixins (ES2022+)

```javascript
const Greetings = (Base) => class extends Base {
    greet() { return `Hello, ${this.name}`; }
};

const Farewells = (Base) => class extends Base {
    farewell() { return `Goodbye, ${this.name}`; }
};

class Person {
    constructor(name) { this.name = name; }
}

class FriendlyPerson extends Farewells(Greetings(Person)) {}

const p = new FriendlyPerson('Alice');
p.greet();     // "Hello, Alice"
p.farewell();  // "Goodbye, Alice"
```

---

## Next Steps

[Back to Chapter 8](08-object-static-methods.md): Object Static Methods
[Proceed to Chapter 10](10-getters-setters.md): Getters and Setters
