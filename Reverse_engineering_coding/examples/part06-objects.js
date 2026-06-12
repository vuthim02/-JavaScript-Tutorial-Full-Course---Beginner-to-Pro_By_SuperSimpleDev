/**
 * PART 6 — Objects, prototypes, classes, inheritance, this, property descriptors
 * Run with: node part06-objects.js
 */

// ---------------------------------------------------------------
// 1. Object creation — literals, new Object(), Object.create()
// ---------------------------------------------------------------

// Object literal (most common)
const user = {
  name: 'Alice',
  age: 25,
  greet() {
    return `Hi, I'm ${this.name}`;
  },
};
console.log('object literal:', user.greet());

// new Object() constructor
const obj2 = new Object();
obj2.name = 'Bob';
console.log('new Object():', obj2);

// Object.create() with prototype
const proto = { type: 'prototype' };
const obj3 = Object.create(proto);
obj3.ownProp = 'own';
console.log('Object.create() proto:', obj3.type, 'own:', obj3.ownProp);

// ---------------------------------------------------------------
// 2. this binding — depends on how function is called
// ---------------------------------------------------------------

// Method call — `this` is the object
const car = {
  brand: 'Toyota',
  getBrand() {
    return this.brand;
  },
};
console.log('method call this:', car.getBrand()); // 'Toyota'

// Standalone call — `this` is undefined (strict) or global
const standalone = car.getBrand;
// console.log(standalone()); // TypeError (strict) or undefined

// Explicit binding with call, apply, bind
console.log('call:', standalone.call(car));
console.log('apply:', standalone.apply(car));

const bound = standalone.bind(car);
console.log('bind:', bound());

// Arrow functions — capture `this` from enclosing lexical scope
const arrowCar = {
  brand: 'Honda',
  getBrand: () => this.brand, // `this` is NOT the object
  getBrandMethod() {
    return this.brand;
  },
};
console.log('arrow this (wrong):', arrowCar.getBrand()); // undefined
console.log('method this (right):', arrowCar.getBrandMethod()); // 'Honda'

// ---------------------------------------------------------------
// 3. Prototypes — JS inheritance mechanism
// ---------------------------------------------------------------

function Animal(species) {
  this.species = species;
}

// Add method to prototype — shared by all instances
Animal.prototype.breathe = function () {
  return `${this.species} is breathing`;
};

const dog = new Animal('Dog');
const cat = new Animal('Cat');
console.log('prototype method:', dog.breathe());
console.log('prototype method:', cat.breathe());
console.log('same prototype?', dog.__proto__ === Animal.prototype); // true

// Prototype chain lookup
console.log('dog.breathe exists:', 'breathe' in dog); // true
console.log('dog.toString exists:', 'toString' in dog); // true (from Object.prototype)

// ---------------------------------------------------------------
// 4. Prototypal inheritance
// ---------------------------------------------------------------

function Mammal(species, furColor) {
  Animal.call(this, species); // Call parent constructor
  this.furColor = furColor;
}

// Set up the prototype chain
Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;

Mammal.prototype.suckle = function () {
  return `${this.species} is suckling`;
};

const puppy = new Mammal('Dog', 'brown');
console.log('inherited:', puppy.breathe()); // from Animal
console.log('own:', puppy.suckle()); // from Mammal

// ---------------------------------------------------------------
// 5. ES6 Classes — syntactic sugar over prototypes
// ---------------------------------------------------------------

class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  start() {
    return `${this.make} ${this.model} is starting`;
  }
}

const myCar = new Vehicle('Toyota', 'Corolla');
console.log('class:', myCar.start());

// Static method
class MathUtils {
  static add(a, b) {
    return a + b;
  }
}
console.log('static method:', MathUtils.add(5, 3));

// Getter / setter
class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }

  get fahrenheit() {
    return this._celsius * 9 / 5 + 32;
  }

  set fahrenheit(value) {
    this._celsius = (value - 32) * 5 / 9;
  }
}

const temp = new Temperature(100);
console.log('getter fahrenheit:', temp.fahrenheit);
temp.fahrenheit = 212;
console.log('setter → celsius:', temp._celsius);

// ---------------------------------------------------------------
// 6. Class inheritance (extends)
// ---------------------------------------------------------------

class ElectricCar extends Vehicle {
  constructor(make, model, batteryRange) {
    super(make, model); // Call parent constructor
    this.batteryRange = batteryRange;
  }

  charge() {
    return `Charging ${this.make} ${this.model}`;
  }

  // Override parent method
  start() {
    return `${super.start()} silently (electric)`;
  }
}

const tesla = new ElectricCar('Tesla', 'Model 3', 350);
console.log('extends:', tesla.start());
console.log('extends:', tesla.charge());

// ---------------------------------------------------------------
// 7. Object.defineProperty — fine-grained control over properties
// ---------------------------------------------------------------

const account = { balance: 0 };

// Define a read-only property
Object.defineProperty(account, 'accountType', {
  value: 'checking',
  writable: false,
  enumerable: true,
  configurable: false,
});

console.log('defineProperty:', account.accountType);
// account.accountType = 'savings'; // TypeError (strict) or silently fails

// Define a getter/setter via defineProperty
let _balance = 0;
Object.defineProperty(account, 'formattedBalance', {
  get() {
    return `$${_balance.toFixed(2)}`;
  },
  set(value) {
    _balance = value;
  },
  enumerable: true,
});

account.formattedBalance = 100;
console.log('defineProperty getter/setter:', account.formattedBalance);

// ---------------------------------------------------------------
// 8. Property descriptors — examine property metadata
// ---------------------------------------------------------------

const descriptor = Object.getOwnPropertyDescriptor(account, 'accountType');
console.log('property descriptor:', descriptor);
// { value: 'checking', writable: false, enumerable: true, configurable: false }
