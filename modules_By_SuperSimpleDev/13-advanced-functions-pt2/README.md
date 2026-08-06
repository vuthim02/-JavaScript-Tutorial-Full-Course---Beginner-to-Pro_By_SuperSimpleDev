# Module 12: Advanced Functions (Part 2)

**Duration:** ~49 minutes  
**Video Timestamp:** 10:10:22 - 10:58:57

## Learning Objectives

- Master the `this` keyword in different contexts
- Understand `call`, `apply`, and `bind`
- Learn about `bind` for function borrowing
- Work with constructor functions
- Understand prototype chain basics

## The `this` Keyword

`this` refers to the object that's currently executing the function. Its value depends on how the function is called.

### `this` in Methods

```javascript
const person = {
  name: 'John',
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

console.log(person.greet());  // Hello, I'm John
```

### `this` in Regular Functions

```javascript
function sayHi() {
  console.log(this);  // In browser: Window object
  return `Hi, ${this.name}`;
}

sayHi();  // Hi, undefined (in strict mode)
```

### `this` in Arrow Functions

Arrow functions don't have their own `this`:

```javascript
const person = {
  name: 'John',
  // Arrow function - 'this' is inherited from surrounding scope
  greet: () => {
    return `Hello, I'm ${this.name}`;  // 'this' is NOT person
  }
};

console.log(person.greet());  // Hello, I'm undefined
```

### `this` in Event Handlers

```javascript
const button = document.querySelector('button');

button.addEventListener('click', function() {
  console.log(this);  // button element
});

button.addEventListener('click', () => {
  console.log(this);  // Window (or undefined in module)
});
```

## call(), apply(), and bind()

### call()

Invokes a function with a specific `this` value:

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'Alice' };

console.log(greet.call(person, 'Hello', '!'));  // Hello, Alice!
```

### apply()

Similar to `call()`, but arguments as array:

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'Bob' };

console.log(greet.apply(person, ['Hi', '.']));  // Hi, Bob.
```

### bind()

Creates a new function with `this` bound:

```javascript
function greet(greeting) {
  return `${greeting}, ${this.name}`;
}

const person = { name: 'Charlie' };

const boundGreet = greet.bind(person);
console.log(boundGreet('Hey'));  // Hey, Charlie

// With arguments
const boundGreetWithHello = greet.bind(person, 'Hello');
console.log(boundGreetWithHello());  // Hello, Charlie
```

### Practical Use: Function Borrowing

```javascript
const person1 = {
  name: 'Alice',
  greet() {
    return `Hi, I'm ${this.name}`;
  }
};

const person2 = { name: 'Bob' };

// Borrow greet method
console.log(person1.greet.call(person2));  // Hi, I'm Bob
```

### Practical Use: Array-like Arguments

```javascript
function sumAll() {
  // Convert arguments to real array
  const args = Array.prototype.slice.call(arguments);
  return args.reduce((acc, n) => acc + n, 0);
}

// Or with rest params (modern)
function sumAllModern(...args) {
  return args.reduce((acc, n) => acc + n, 0);
}

console.log(sumAll(1, 2, 3, 4, 5));  // 15
```

## Constructor Functions

Functions used to create objects (pre-ES6 classes):

### Basic Constructor

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    return `Hi, I'm ${this.name}`;
  };
}

const john = new Person('John', 30);
const jane = new Person('Jane', 25);

console.log(john.name);      // John
console.log(jane.greet());    // Hi, I'm Jane
```

### How `new` Works

```javascript
function Person(name) {
  // this = {} (implicit)
  this.name = name;
  // return this (implicit)
}

const person = new Person('John');

// Equivalent to:
function Person(name) {
  // Actually this happens:
  // const this = Object.create(Person.prototype);
  this.name = name;
  // return this;
}
```

## Prototype

Every function has a `prototype` property:

```javascript
function Person(name) {
  this.name = name;
}

// Add method to prototype (shared by all instances)
Person.prototype.greet = function() {
  return `Hi, I'm ${this.name}`;
};

Person.prototype.age = 0;

const john = new Person('John');
const jane = new Person('Jane');

console.log(john.greet());   // Hi, I'm John
console.log(jane.greet());   // Hi, I'm Jane
console.log(john.__proto__ === Person.prototype);  // true
```

### Prototype Chain

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

function Dog(name) {
  Animal.call(this, name);  // Call parent constructor
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
  return `${this.name} barks`;
};

const dog = new Dog('Rex');
console.log(dog.speak());           // Rex barks (Dog's method)
console.log(dog instanceof Dog);   // true
console.log(dog instanceof Animal); // true
```

## bind() with Event Handlers

Common pattern in React-style code:

```javascript
class Counter {
  constructor() {
    this.count = 0;
    
    // Bind methods to preserve 'this'
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  
  increment() {
    this.count++;
    console.log(this.count);
  }
  
  decrement() {
    this.count--;
    console.log(this.count);
  }
}

const counter = new Counter();

button.addEventListener('click', counter.increment);
```

## Function Composition

Combining small functions into larger ones:

```javascript
const compose = (...fns) => (x) => 
  fns.reduceRight((acc, fn) => fn(acc), x);

const pipe = (...fns) => (x) =>
  fns.reduce((acc, fn) => fn(acc), x);

// Example functions
const double = x => x * 2;
const addOne = x => x + 1;
const square = x => x * x;

// Compose (right to left): square(addOne(double(2)))
const transform = compose(square, addOne, double);
console.log(transform(2));  // square(addOne(double(2))) = square(5) = 25

// Pipe (left to right): double(addOne(square(2)))
const transformPipe = pipe(double, addOne, square);
console.log(transformPipe(2));  // double(addOne(square(2))) = double(5) = 10
```

## Currying

Transform a function with multiple arguments into a sequence of functions:

```javascript
// Regular function
function add(a, b, c) {
  return a + b + c;
}

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(add(1, 2, 3));         // 6
console.log(curriedAdd(1)(2)(3));  // 6

// With arrow syntax
const arrowCurriedAdd = a => b => c => a + b + c;

// Partial application
const add1 = curriedAdd(1);
const add1And2 = add1(2);
console.log(add1And2(3));  // 6
```

### Practical Currying

```javascript
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

## Error Handling in Functions

### try-catch

```javascript
function divide(a, b) {
  try {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  } catch (error) {
    console.log('Error:', error.message);
    return undefined;
  }
}

console.log(divide(10, 2));  // 5
console.log(divide(10, 0)); // Error: Division by zero, returns undefined
```

### Custom Error Types

```javascript
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError('name', 'Name is required');
  }
  if (user.age < 0) {
    throw new ValidationError('age', 'Age cannot be negative');
  }
  return true;
}

try {
  validateUser({ name: '', age: 25 });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Validation error in ${error.field}: ${error.message}`);
  }
}
```

## Practice Exercises

### Exercise 12.1: Bind Counter
Create a counter class that works with bound methods.

```javascript
class Counter {
  constructor() {
    this.count = 0;
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  
  increment() { this.count++; return this.count; }
  decrement() { this.count--; return this.count; }
  getCount() { return this.count; }
}

const counter = new Counter();
const increment = counter.increment;

console.log(increment());  // 1
console.log(increment());  // 2
console.log(counter.getCount());  // 2
```

### Exercise 12.2: Function Borrowing
Create a function that borrows array methods.

```javascript
function printElements() {
  // Borrow forEach
  Array.prototype.forEach.call(arguments, (item, index) => {
    console.log(`${index}: ${item}`);
  });
}

printElements('a', 'b', 'c');
// 0: a
// 1: b
// 2: c
```

### Exercise 12.3: Curried Calculator
Create a curried calculator.

```javascript
function createCalculator() {
  return function(initial) {
    let result = initial;
    
    const calculator = {
      add(value) { result += value; return calculator; },
      subtract(value) { result -= value; return calculator; },
      multiply(value) { result *= value; return calculator; },
      divide(value) { result /= value; return calculator; },
      result() { return result; }
    };
    
    return calculator;
  };
}

const calc = createCalculator()(10);
console.log(calc.add(5).multiply(2).subtract(3).result());  // 27
```

### Exercise 12.4: Prototype Inheritance
Create an inheritance chain with prototypes.

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

Animal.prototype.describe = function() {
  return `${this.name} is an animal`;
};

function Cat(name, color) {
  Animal.call(this, name);
  this.color = color;
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.speak = function() {
  return `${this.name} meows`;
};

Cat.prototype.describe = function() {
  return `${Animal.prototype.describe.call(this)}, specifically a ${this.color} cat`;
};

const cat = new Cat('Whiskers', 'orange');
console.log(cat.speak());    // Whiskers meows
console.log(cat.describe()); // Whiskers is an animal, specifically a orange cat
```

## Summary

- `this` depends on how a function is called
- Arrow functions inherit `this` from surrounding scope
- `call()` and `apply()` invoke functions with specific `this`
- `bind()` creates new functions with bound `this`
- Constructor functions create objects with `new`
- Prototype allows method sharing between instances
- Function composition and currying enable functional patterns

## Next Steps

Proceed to Module 13: Amazon Project and Git to apply your knowledge in a real project.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)