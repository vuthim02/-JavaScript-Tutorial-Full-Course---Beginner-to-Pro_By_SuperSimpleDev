# Module 17: Inheritance

**Duration:** ~41 minutes  
**Video Timestamp:** 18:51:50 - 19:32:59

## Learning Objectives

- Master inheritance in JavaScript
- Understand prototype chain
- Implement multiple levels of inheritance
- Use mixins for multiple inheritance
- Understand when to use inheritance vs composition

## Prototype Chain

Every object in JavaScript has a prototype, forming a chain:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const john = new Person('John');

// Prototype chain:
// john -> Person.prototype -> Object.prototype -> null
console.log(john.__proto__ === Person.prototype);  // true
```

## ES6 Class Inheritance

### Basic Inheritance

```javascript
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
    super(name);  // Must call super before using 'this'
    this.breed = breed;
  }
  
  speak() {
    return `${this.name} barks!`;
  }
}

const dog = new Dog('Rex', 'German Shepherd');
console.log(dog.speak());     // Rex barks!
console.log(dog instanceof Animal);  // true
```

### Multi-Level Inheritance

```javascript
class LivingThing {
  constructor(name) {
    this.name = name;
  }
}

class Animal extends LivingThing {
  constructor(name, type) {
    super(name);
    this.type = type;
  }
}

class Mammal extends Animal {
  constructor(name, furColor) {
    super(name, 'mammal');
    this.furColor = furColor;
  }
}

class Dog extends Mammal {
  constructor(name, breed, furColor) {
    super(name, furColor);
    this.breed = breed;
  }
}

const dog = new Dog('Buddy', 'Labrador', 'golden');
console.log(dog instanceof LivingThing);  // true
console.log(dog instanceof Animal);      // true
console.log(dog instanceof Mammal);      // true
console.log(dog instanceof Dog);        // true
```

## Method Overriding

### Override with super Call

```javascript
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
    this.speed = 0;
  }
  
  accelerate(amount) {
    this.speed += amount;
    return `Accelerating to ${this.speed} mph`;
  }
}

class ElectricCar extends Vehicle {
  constructor(make, model, batteryCapacity) {
    super(make, model);
    this.batteryCapacity = batteryCapacity;
    this.batteryLevel = 100;
  }
  
  accelerate(amount) {
    const result = super.accelerate(amount);
    this.batteryLevel -= amount * 0.5;
    return `${result}, Battery: ${this.batteryLevel}%`;
  }
}

const tesla = new ElectricCar('Tesla', 'Model 3', 75);
console.log(tesla.accelerate(30));  // Accelerating to 30 mph, Battery: 85%
```

## Super Keyword

The `super` keyword calls the parent class constructor or methods:

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello, ${this.name}`;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
  
  greet() {
    return `${super.greet()}, age ${this.age}`;
  }
}

const child = new Child('Alice', 10);
console.log(child.greet());  // Hello, Alice, age 10
```

## Mixins

JavaScript doesn't support multiple inheritance, but mixins provide a workaround:

### Basic Mixin

```javascript
const Flyable = {
  fly() {
    return `${this.name} is flying`;
  }
};

const Swimmable = {
  swim() {
    return `${this.name} is swimming`;
  }
};

class Animal {
  constructor(name) {
    this.name = name;
  }
}

// Mix in abilities
Object.assign(Animal.prototype, Flyable, Swimmable);

const duck = new Animal('Duck');
console.log(duck.fly());   // Duck is flying
console.log(duck.swim());  // Duck is swimming
```

### Mixin Factory

```javascript
const Serializable = (BaseClass) => class extends BaseClass {
  toJSON() {
    const obj = {};
    for (const key of Object.keys(this)) {
      if (typeof this[key] !== 'function') {
        obj[key] = this[key];
      }
    }
    return obj;
  }
  
  static fromJSON(data) {
    return new this(data);
  }
};

class User {
  constructor({ name, email }) {
    this.name = name;
    this.email = email;
  }
}

const PersistentUser = Serializable(User);
const user = new PersistentUser({ name: 'John', email: 'john@example.com' });
console.log(user.toJSON());
```

## Inheritance vs Composition

### When to Use Inheritance (Is-A)

```javascript
// Dog is an Animal
class Animal { /* ... */ }
class Dog extends Animal { /* ... */ }
```

### When to Use Composition (Has-A / Can-Do)

```javascript
// Dog has abilities
class Dog {
  constructor(name) {
    this.name = name;
    this.abilities = [];
  }
  
  addAbility(ability) {
    this.abilities.push(ability);
  }
}
```

## Built-in Classes

JavaScript has built-in classes you can extend:

```javascript
class SpecialArray extends Array {
  unique() {
    return [...new Set(this)];
  }
  
  even() {
    return this.filter(n => n % 2 === 0);
  }
}

const arr = new SpecialArray(1, 2, 2, 3, 3, 4);
console.log(arr.unique());  // [1, 2, 3, 4]
console.log(arr.even());    // [2, 2, 4]
```

## Practical Examples

### 1. User Role System

```javascript
class User {
  constructor(email) {
    this.email = email;
    this.isActive = true;
  }
}

class Customer extends User {
  constructor(email, customerId) {
    super(email);
    this.customerId = customerId;
    this.orders = [];
  }
}

class Employee extends User {
  constructor(email, employeeId, department) {
    super(email);
    this.employeeId = employeeId;
    this.department = department;
  }
}

class Admin extends Employee {
  constructor(email) {
    super(email, 'admin', 'Admin');
    this.permissions = ['read', 'write', 'delete', 'manage'];
  }
}
```

### 2. Shape Hierarchy

```javascript
class Shape {
  getArea() {
    throw new Error('Not implemented');
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  getArea() {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

// Polymorphism
const shapes = [new Rectangle(5, 10), new Circle(7)];
shapes.forEach(shape => {
  console.log(shape.getArea());
});
```

## Practice Exercises

### Exercise 17.1: Employee Hierarchy
Create Manager and Executive classes that extend Employee.

### Exercise 17.2: Payment System
Create CashPayment and CreditCardPayment classes that extend Payment.

### Exercise 17.3: Animal Kingdom
Create a hierarchy of animals with different abilities.

## Summary

- Inheritance creates "is-a" relationships
- Use `extends` for class inheritance
- Call `super()` in constructor before using `this`
- Use `super.methodName()` to call parent methods
- Mixins provide multiple inheritance-like behavior
- Favor composition over inheritance when appropriate

## Next Steps

Proceed to Module 18: Backend, Callbacks, and Async/Await.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)
