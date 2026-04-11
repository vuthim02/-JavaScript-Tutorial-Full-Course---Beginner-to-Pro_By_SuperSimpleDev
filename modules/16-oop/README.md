# Module 16: Object-Oriented Programming

**Duration:** ~202 minutes  
**Video Timestamp:** 15:29:41 - 18:51:50

## Learning Objectives

- Understand OOP concepts in JavaScript
- Create and use classes
- Implement constructors and methods
- Use static methods and properties
- Understand encapsulation
- Apply OOP patterns in real projects

## What is Object-Oriented Programming?

OOP is a programming paradigm that organizes code around "objects" rather than functions. It provides:

- **Encapsulation**: Bundle data and methods together
- **Abstraction**: Hide complex implementation details
- **Inheritance**: Reuse code through class hierarchies
- **Polymorphism**: Same interface, different implementations

## Classes (ES6+)

### Basic Class Syntax

```javascript
class Person {
  // Constructor
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // Method
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

// Create instances
const john = new Person('John', 30);
const jane = new Person('Jane', 25);

console.log(john.greet());    // Hello, I'm John
```

### Class Constructor

```javascript
class User {
  constructor(email, username) {
    if (!email.includes('@')) {
      throw new Error('Invalid email');
    }
    
    this.email = email;
    this.username = username;
    this.createdAt = new Date();
    this.isActive = true;
  }
}
```

## Class Methods

### Instance Methods

```javascript
class Calculator {
  constructor(initialValue = 0) {
    this.result = initialValue;
  }
  
  add(value) {
    this.result += value;
    return this;  // Enable chaining
  }
  
  subtract(value) {
    this.result -= value;
    return this;
  }
  
  getResult() {
    return this.result;
  }
}

// Method chaining
const result = new Calculator(10)
  .add(5)
  .multiply(2)
  .subtract(3)
  .getResult();

console.log(result);  // 27
```

### Getters and Setters

```javascript
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }
  
  // Getter
  get area() {
    return this._width * this._height;
  }
  
  // Setter
  set width(value) {
    if (value > 0) {
      this._width = value;
    }
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.area);  // 50
```

### Private Fields (#)

Modern JavaScript supports truly private fields:

```javascript
class BankAccount {
  #balance = 0;  // Private field
  
  constructor(accountNumber) {
    this.accountNumber = accountNumber;
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return this.#balance;
    }
  }
  
  getBalance() {
    return this.#balance;
  }
}
```

## Static Methods and Properties

Static methods belong to the class itself, not instances:

```javascript
class MathHelper {
  static PI = 3.14159;
  
  static circleArea(radius) {
    return this.PI * radius * radius;
  }
}

console.log(MathHelper.PI);           // 3.14159
console.log(MathHelper.circleArea(5)); // 78.53975
```

## Class Inheritance

### extends Keyword

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
    super(name);  // Call parent constructor
    this.breed = breed;
  }
  
  speak() {
    return `${this.name} barks: Woof!`;
  }
}

const dog = new Dog('Rex', 'German Shepherd');
console.log(dog.speak());  // Rex barks: Woof!
```

### Using super

```javascript
class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  
  getInfo() {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  constructor(make, model, year, numDoors) {
    super(make, model, year);
    this.numDoors = numDoors;
  }
  
  getInfo() {
    return super.getInfo() + ` (${this.numDoors} doors)`;
  }
}
```

## Converting to OOP

### Procedural vs OOP

```javascript
// Procedural
let cart = [];
function addToCart(product) { cart.push(product); }
function removeFromCart(productId) { /* ... */ }

// OOP
class Cart {
  #items = [];
  
  addItem(product) {
    this.#items.push(product);
  }
  
  removeItem(productId) {
    this.#items = this.#items.filter(i => i.id !== productId);
  }
  
  get total() {
    return this.#items.reduce((sum, item) => sum + item.price, 0);
  }
}
```

## this Keyword

### In Methods

```javascript
class Counter {
  constructor() {
    this.count = 0;
  }
  
  increment() {
    this.count++;
    return this;  // Return self for chaining
  }
  
  decrement() {
    this.count--;
    return this;
  }
}

const counter = new Counter();
counter.increment().increment().decrement();
console.log(counter.count);  // 1
```

### Arrow Functions and this

Arrow functions don't have their own `this`:

```javascript
class MyClass {
  name = 'MyClass';
  
  regularMethod() {
    return this.name;  // Works
  }
  
  // Arrow function - 'this' is inherited from surrounding scope
  arrowMethod = () => {
    return this.name;  // Inherits 'this' from constructor
  }
}
```

## Practical Example: E-commerce Cart

```javascript
class Product {
  #price;
  
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.#price = price;
    this.category = category;
  }
  
  get price() { return this.#price; }
  set price(value) { if (value >= 0) this.#price = value; }
}

class CartItem {
  #quantity;
  
  constructor(product) {
    this.product = product;
    this.#quantity = 1;
  }
  
  get quantity() { return this.#quantity; }
  set quantity(value) { if (value >= 0) this.#quantity = value; }
  
  get subtotal() {
    return this.product.price * this.#quantity;
  }
}

class ShoppingCart {
  #items = [];
  
  addItem(product, quantity = 1) {
    const existing = this.#items.find(
      item => item.product.id === product.id
    );
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.#items.push(new CartItem(product));
    }
  }
  
  get total() {
    return this.#items.reduce((sum, item) => sum + item.subtotal, 0);
  }
}
```

## instanceof Operator

```javascript
class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

const dog = new Dog();
console.log(dog instanceof Dog);      // true
console.log(dog instanceof Animal);   // true
console.log(dog instanceof Cat);      // false
```

## Practice Exercises

### Exercise 16.1: Bank Account Class
Create a BankAccount class with deposit and withdraw methods.

### Exercise 16.2: Product Class
Create a Product class with price validation.

### Exercise 16.3: Shape Hierarchy
Create Rectangle and Circle classes with area methods.

## Summary

- Classes provide clean OOP syntax in JavaScript
- Use `constructor` for initialization
- `extends` for inheritance
- `super` to call parent methods
- Private fields (`#`) for encapsulation
- Static methods belong to the class

## Next Steps

Proceed to Module 17: Inheritance for more advanced inheritance patterns.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)