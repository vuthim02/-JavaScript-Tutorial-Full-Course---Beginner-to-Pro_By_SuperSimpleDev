# Level 89: Module 18 – Static Methods, Inheritance & super

## Error Snippets (70)

### Error 1: Calling instance method as static
**Description:** Static context cannot access instance methods
```javascript
class Calculator {
  add(a, b) { return a + b; }
  static multiply(a, b) { return a * b; }
}
Calculator.add(2, 3);
```
### Error 2: Static method calling instance method via this
**Description:** this in static method refers to class, not instance
```javascript
class User {
  greet() { return 'Hello'; }
  static create() {
    return this.greet();
  }
}
```
### Error 3: Not calling super() in derived constructor
**Description:** Derived class constructor must call super() before using this
```javascript
class Animal { constructor(name) { this.name = name; } }
class Dog extends Animal {
  constructor(name, breed) {
    this.breed = breed;
    super(name);
  }
}
```
### Error 4: Calling super() outside derived class
**Description:** super() only valid in derived class constructor
```javascript
class Base {
  constructor() {
    super();
  }
}
```
### Error 5: super.prop used in wrong context
**Description:** super.prop only works inside method override
```javascript
class Parent {
  greet() { return 'Hello'; }
}
class Child extends Parent {
  test() {
    return super.greet();
  }
}
const c = new Child();
c.test();
```
### Error 6: Forgetting super in method override
**Description:** Override doesn't call parent method
```javascript
class Vehicle {
  start() { return 'Engine starting'; }
}
class Car extends Vehicle {
  start() { return 'Car ready'; }
}
```
### Error 7: super() called multiple times
**Description:** super() can only be called once
```javascript
class Parent { constructor() {} }
class Child extends Parent {
  constructor() {
    super();
    super();
  }
}
```
### Error 8: Calling super with wrong arguments
**Description:** Passing wrong arguments to parent constructor
```javascript
class Person {
  constructor(name, age) { this.name = name; this.age = age; }
}
class Student extends Person {
  constructor(name, age, grade) {
    super(name);
    this.grade = grade;
  }
}
```
### Error 9: Accessing this before super()
**Description:** this is not initialized until super() returns
```javascript
class Parent { constructor() { this.x = 1; } }
class Child extends Parent {
  constructor() {
    this.y = 2;
    super();
  }
}
```
### Error 10: Static method with same name as instance method
**Description:** Shadowing instance method with static method
```javascript
class MyClass {
  draw() { return 'drawing'; }
  static draw() { return 'static draw'; }
}
```
### Error 11: Overriding static method in subclass incorrectly
**Description:** Static method override doesn't use super correctly
```javascript
class Parent {
  static greet() { return 'Hello'; }
}
class Child extends Parent {
  static greet() { return super.greet() + ' world'; }
}
```
### Error 12: Missing method in subclass for abstract-like pattern
**Description:** Subclass doesn't implement required method
```javascript
class Shape {
  getArea() { throw new Error('Must implement'); }
}
class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
}
```
### Error 13: Using this in static method for class property
**Description:** Static method should use class name, not this
```javascript
class Config {
  static timeout = 5000;
  static getTimeout() {
    return Config.timeout;
  }
}
```
### Error 14: Static and instance property name collision
**Description:** Static property with same name as instance property
```javascript
class Counter {
  static count = 0;
  count = 0;
  increment() { this.count++; }
}
```
### Error 15: extends with non-class function
**Description:** extends requires a valid constructor
```javascript
function Base() {}
class Derived extends Base {}
```
### Error 16: extends with expression that isn't a constructor
**Description:** extends expression must evaluate to a class/function
```javascript
const mixin = () => {};
class MyClass extends mixin() {}
```
### Error 17: Forgetting new.target in static factory
**Description:** Not checking new.target in inherited factory
```javascript
class Parent {
  static create() {
    return new this();
  }
}
class Child extends Parent {}
```
### Error 18: Calling instance method from static via prototype
**Description:** Static method accessing instance through prototype
```javascript
class MyClass {
  instanceMethod() { return 42; }
  static staticMethod() {
    return MyClass.prototype.instanceMethod();
  }
}
```
### Error 19: super in arrow function
**Description:** Arrow functions don't have their own super
```javascript
class Parent { greet() { return 'Hi'; } }
class Child extends Parent {
  greet() {
    const fn = () => super.greet();
    return fn();
  }
}
```
### Error 20: Static method inheriting non-static
**Description:** Static methods don't inherit from instance
```javascript
class Parent {
  greet() { return 'hello'; }
  static create() { return new this(); }
}
class Child extends Parent {}
console.log(Child.create()); // Works
```
### Error 21: super used outside class method
**Description:** super keyword only valid in class methods
```javascript
class Parent { method() {} }
class Child extends Parent {}
Child.prototype.method = function() {
  super.method();
};
```
### Error 22: Mixin with duplicate super calls
**Description:** Multiple inheritance via mixins causes super issues
```javascript
const MixinA = (Base) => class extends Base { method() { return 'A'; } };
const MixinB = (Base) => class extends Base { method() { return 'B'; } };
class Base { method() { return 'Base'; } }
class Derived extends MixinB(MixinA(Base)) {}
```
### Error 23: Constructor returns wrong type with new
**Description:** Constructor returns non-object, new ignores it
```javascript
class MyClass {
  constructor() {
    return 42;
  }
}
const obj = new MyClass();
console.log(obj instanceof MyClass);
```
### Error 24: Using class name instead of this in instance method
**Description:** Hard-coding class name instead of using this.constructor
```javascript
class User {
  constructor(name) { this.name = name; }
  clone() {
    return new User(this.name);
  }
}
```
### Error 25: Not using super in toString override
**Description:** toString override ignores parent's toString
```javascript
class Person {
  constructor(name) { this.name = name; }
  toString() { return this.name; }
}
class Employee extends Person {
  constructor(name, role) { super(name); this.role = role; }
  toString() { return this.role; }
}
```
### Error 26: Static property defined outside class
**Description:** Static property initialized after class definition
```javascript
class MyClass {}
MyClass.staticProp = 42;
```
### Error 27: extends before class declaration
**Description:** extends references class that doesn't exist yet
```javascript
class Child extends Parent {}
class Parent {}
```
### Error 28: super.prop in getter/setter
**Description:** super.prop in accessor refers to parent's accessor
```javascript
class Parent {
  get value() { return 'parent'; }
}
class Child extends Parent {
  get value() { return super.value + ' child'; }
}
```
### Error 29: Static getter/setter inheritance
**Description:** Static accessors inherited by subclasses
```javascript
class Parent {
  static get config() { return { env: 'prod' }; }
}
class Child extends Parent {}
console.log(Child.config);
```
### Error 30: Calling parent static method from child instance
**Description:** Instance method trying to call parent's static via super
```javascript
class Parent {
  static helper() { return 'help'; }
}
class Child extends Parent {
  doWork() {
    return super.helper();
  }
}
```
### Error 31: Overriding non-writable static property
**Description:** Cannot override non-writable static property
```javascript
class Parent {
  static get NAME() { return 'Parent'; }
}
class Child extends Parent {
  static get NAME() { return 'Child'; }
}
```
### Error 32: Not spreading super constructor args
**Description:** Super constructor takes different args than child
```javascript
class Point {
  constructor(x, y) { this.x = x; this.y = y; }
}
class Point3D extends Point {
  constructor(x, y, z) {
    super();
    this.z = z;
  }
}
```
### Error 33: Calling super in nested function inside method
**Description:** Nested function loses super reference
```javascript
class Parent { getName() { return 'Parent'; } }
class Child extends Parent {
  getName() {
    return function() {
      return super.getName();
    }();
  }
}
```
### Error 34: Static method using arguments object
**Description:** Static method shouldn't rely on arguments object
```javascript
class Calculator {
  static sum() {
    return Array.from(arguments).reduce((a, b) => a + b, 0);
  }
}
```
### Error 35: Class field shadowing parent getter
**Description:** Instance field overrides parent getter/setter
```javascript
class Parent {
  get value() { return 42; }
}
class Child extends Parent {
  value = 10;
}
```
### Error 36: Not using Object.setPrototypeOf for static inheritance
**Description:** Static methods not inherited properly
```javascript
class Parent {
  static helper() { return 'help'; }
}
class Child extends Parent {}
// Child.helper works automatically
```
### Error 37: Contradictory extends and class body
**Description:** Extends but constructor doesn't match parent
```javascript
class Animal {
  constructor(type) { this.type = type; }
}
class Dog extends Animal {
  constructor() {
    super('mammal');
    this.breed = 'unknown';
  }
}
```
### Error 38: Method override without matching signature
**Description:** Overridden method has different parameters
```javascript
class Shape {
  draw(color) { return `Drawing in ${color}`; }
}
class Circle extends Shape {
  draw() { return 'Drawing circle'; }
}
```
### Error 39: Using this in static initialization block for instance
**Description:** Static block this is class, not instance
```javascript
class MyClass {
  static {
    this.instanceProp = 'value'; // Static, not instance
  }
}
```
### Error 40: super in object literal method
**Description:** super in object literal only works if it has __proto__ or parent
```javascript
const parent = { greet() { return 'Hello'; } };
const child = {
  greet() {
    return super.greet() + '!';
  }
};
Object.setPrototypeOf(child, parent);
```
### Error 41: Calling parent constructor from static factory
**Description:** Using new this() vs new Parent() in static method
```javascript
class Parent {
  constructor() { this.type = 'parent'; }
  static create() { return new Parent(); }
}
class Child extends Parent {
  constructor() { super(); this.type = 'child'; }
}
const c = Child.create();
console.log(c.type);
```
### Error 42: Static method shadowing inherited static
**Description:** Static method in child hides parent's static
```javascript
class Parent {
  static getId() { return 1; }
}
class Child extends Parent {
  static getId() { return 2; }
}
console.log(Parent.getId());
```
### Error 43: Bypassing super by calling parent prototype directly
**Description:** Manually calling parent prototype method
```javascript
class Parent { method() { return 'parent'; } }
class Child extends Parent {
  method() {
    return Parent.prototype.method.call(this) + ' child';
  }
}
```
### Error 44: Static method that needs instance data
**Description:** Static method requires instance but isn't called on instance
```javascript
class User {
  constructor(name) { this.name = name; }
  static greet(user) { return `Hello ${user.name}`; }
}
```
### Error 45: extends with dynamic class expression
**Description:** Dynamic extends evaluates once at definition
```javascript
function getBase() { return class Base {}; }
class Derived extends getBase() {}
// getBase() is called once
```
### Error 46: Super in getter/setter in object assigned via Object.setPrototypeOf
**Description:** super in object with manually set prototype
```javascript
const parent = { value: 42 };
const child = {
  get value() { return super.value; }
};
Object.setPrototypeOf(child, parent);
console.log(child.value);
```
### Error 47: Not using super for inherited accessor
**Description:** Override getter without calling parent getter
```javascript
class Person {
  constructor(name) { this._name = name; }
  get name() { return this._name; }
}
class Employee extends Person {
  constructor(name, role) { super(name); this._role = role; }
  get name() { return `${this._name} (${this._role})`; }
}
```
### Error 48: Multiple extends in chain with missing super
**Description:** Deep inheritance chain missing super somewhere
```javascript
class A { constructor() { this.a = 1; } }
class B extends A { constructor() { super(); this.b = 2; } }
class C extends B { constructor() { this.c = 3; } }
```
### Error 49: Static field initializer referencing class
**Description:** Static field uses class name before initialized
```javascript
class MyClass {
  static instances = [];
  static {
    MyClass.instances.push('created');
  }
}
```
### Error 50: Calling super on non-overridden method
**Description:** super.method() where parent doesn't have method
```javascript
class Parent {}
class Child extends Parent {
  method() {
    return super.method();
  }
}
```
### Error 51: Using 'this' in extends clause
**Description:** this in extends clause is undefined
```javascript
class Base {}
class Wrapper {
  static derive() {
    class Derived extends this {} // 'this' is Wrapper
    return Derived;
  }
}
```
### Error 52: Constructor with super but parent lacks constructor
**Description:** super() called but parent has no explicit constructor
```javascript
class Parent {
  // implicit constructor
}
class Child extends Parent {
  constructor() {
    super(42);
  }
}
```
### Error 53: Static getter recursively calling itself
**Description:** Static getter referencing itself
```javascript
class Config {
  static get timeout() {
    return Config.timeout || 5000;
  }
}
```
### Error 54: Not overriding Symbol.hasInstance
**Description:** instanceof checks with custom class
```javascript
class MyArray {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}
console.log([] instanceof MyArray);
```
### Error 55: super() in constructor that conditionally returns
**Description:** super() must be called before return in constructor
```javascript
class Parent { constructor() {} }
class Child extends Parent {
  constructor(cond) {
    if (cond) {
      super();
      return;
    }
    super();
  }
}
```
### Error 56: Inheriting from built-in without super
**Description:** Extending built-in types without correct super call
```javascript
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}
```
### Error 57: Static getter in class expression
**Description:** Static getter in class expression assigned to variable
```javascript
const MyClass = class {
  static get version() { return '1.0'; }
};
console.log(MyClass.version);
```
### Error 58: Forgetting static in static getter
**Description:** Instance getter instead of static getter
```javascript
class Config {
  get defaults() { return { timeout: 5000 }; }
}
```
### Error 59: Overriding non-overridable static property
**Description:** Static property from built-in that can't be overridden
```javascript
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
```
### Error 60: super in method defined in constructor
**Description:** Method defined in constructor using function expression
```javascript
class Parent { greet() { return 'Hello'; } }
class Child extends Parent {
  constructor() {
    super();
    this.greet = function() {
      return super.greet();
    };
  }
}
```
### Error 61: Static initialization block with this.constructor
**Description:** this.constructor in static block
```javascript
class MyClass {
  static {
    console.log(this.constructor);
  }
}
```
### Error 62: Mixing super with spread operator
**Description:** Spreading super.args incorrectly
```javascript
class Point {
  constructor(x, y) { this.x = x; this.y = y; }
}
class Point3D extends Point {
  constructor(...args) {
    super(...args);
    this.z = 0;
  }
}
```
### Error 63: Class that extends itself
**Description:** Circular extends
```javascript
class Self extends Self {}
```
### Error 64: super in static method calling instance method
**Description:** super in static cannot call instance methods
```javascript
class Parent {
  instanceMethod() { return 'instance'; }
}
class Child extends Parent {
  static staticMethod() {
    return super.instanceMethod();
  }
}
```
### Error 65: Not using super when overriding constructor behavior
**Description:** Constructor override doesn't call super
```javascript
class Component {
  constructor(element) {
    this.element = element;
  }
}
class Button extends Component {
  constructor(text) {
    this.text = text;
  }
}
```
### Error 66: Private field before super()
**Description:** Class fields initialized before super()
```javascript
class Parent { constructor() {} }
class Child extends Parent {
  value = 42;
  constructor() {
    console.log(this.value);
    super();
  }
}
```
### Error 67: Overwriting prototype after extends
**Description:** Replacing prototype after class definition
```javascript
class Parent { method() { return 1; } }
class Child extends Parent {}
Child.prototype.method = function() { return 2; };
```
### Error 68: Calling super from static getter to get instance
**Description:** super in static context refers to parent class
```javascript
class Parent {
  static get instance() { return new Parent(); }
}
class Child extends Parent {
  static get instance() {
    return super.instance;
  }
}
```
### Error 69: Forgetting to define Symbol.hasInstance
**Description:** Custom instanceof with static Symbol.hasInstance
```javascript
class Range {
  static [Symbol.hasInstance](num) {
    return num >= this.min && num <= this.max;
  }
}
console.log(5 instanceof Range);
```
### Error 70: Dynamic extends with condition
**Description:** Conditional extends needs ternary or function
```javascript
class Base {}
const condition = true;
class Derived extends condition ? Base : Object {}
```

## Issue Snippets (30)

### Issue 1: Deep inheritance hierarchy
**Description:** Too many levels of inheritance makes code fragile
```javascript
class Animal {}
class Mammal extends Animal {}
class Primate extends Mammal {}
class Hominid extends Primate {}
class Human extends Hominid {}
class Employee extends Human {}
```
### Issue 2: Using static methods as namespace
**Description:** Static-only class used as a namespace
```javascript
class MathUtils {
  static add(a, b) { return a + b; }
  static subtract(a, b) { return a - b; }
  static multiply(a, b) { return a * b; }
  static divide(a, b) { return a / b; }
}
```
### Issue 3: Not using super in overridden methods
**Description:** Override replaces parent behavior without extending it
```javascript
class BaseValidator {
  validate(data) {
    const errors = [];
    if (!data.name) errors.push('Name required');
    return errors;
  }
}
class UserValidator extends BaseValidator {
  validate(data) {
    const errors = [];
    if (!data.email) errors.push('Email required');
    if (!data.password) errors.push('Password required');
    return errors;
  }
}
```
### Issue 4: Inheritance where composition is better
**Description:** Using extends when has-a relationship exists
```javascript
class Engine { start() {} }
class Car extends Engine {
  drive() { this.start(); }
}
```
### Issue 5: Overriding methods with incompatible signatures
**Description:** Child method has different parameter types than parent
```javascript
class Parser {
  parse(text) { /* parse string */ }
}
class JSONParser extends Parser {
  parse(obj) { /* parse object */ }
}
```
### Issue 6: Calling super from arrow function in method
**Description:** Arrow function captures super incorrectly
```javascript
class Parent { getName() { return 'Parent'; } }
class Child extends Parent {
  getName() {
    const arrow = () => super.getName();
    return arrow();
  }
}
```
### Issue 7: Static method that should be instance method
**Description:** Static method takes instance as first parameter
```javascript
class User {
  constructor(name) { this.name = name; }
  static greet(user) {
    return `Hello ${user.name}`;
  }
}
```
### Issue 8: Not using polymorphic dispatch
**Description:** Checking type instead of using overridden methods
```javascript
class Shape {}
class Circle extends Shape {}
class Square extends Shape {}
function getArea(shape) {
  if (shape instanceof Circle) return Math.PI * shape.r ** 2;
  if (shape instanceof Square) return shape.side ** 2;
}
```
### Issue 9: Overusing static factory instead of constructor
**Description:** Multiple static factories when constructor could work
```javascript
class User {
  static fromName(name) { return new User(name, 'user@test.com'); }
  static fromEmail(email) { return new User('Unknown', email); }
  static fromAdmin() { return new User('Admin', 'admin@test.com', 'admin'); }
}
```
### Issue 10: Base class doing too much
**Description:** Common base class has too many responsibilities
```javascript
class AppComponent {
  constructor() {
    this.render();
    this.bindEvents();
    this.loadData();
    this.initializePlugins();
  }
}
```
### Issue 11: Missing abstract method check
**Description:** No runtime check for unimplemented abstract methods
```javascript
class Database {
  connect() { throw new Error('Not implemented'); }
  query(sql) { throw new Error('Not implemented'); }
  close() { throw new Error('Not implemented'); }
}
```
### Issue 12: Inheritance chain too wide
**Description:** Too many sibling classes at the same level
```javascript
class Button {}
class PrimaryButton extends Button {}
class SecondaryButton extends Button {}
class DangerButton extends Button {}
class GhostButton extends Button {}
class LinkButton extends Button {}
class IconButton extends Button {}
```
### Issue 13: Not using super in constructor for validation
**Description:** Child constructor forgets parent validation
```javascript
class Product {
  constructor(name, price) {
    if (!name) throw new Error('Name required');
    if (price < 0) throw new Error('Invalid price');
  }
}
class DiscountedProduct extends Product {
  constructor(name, price, discount) {
    super(name, price);
    this.discount = discount;
  }
}
```
### Issue 14: Static property mutation across classes
**Description:** Shared mutable static state via inheritance
```javascript
class Config {
  static settings = { theme: 'light' };
}
class ExtendedConfig extends Config {}
ExtendedConfig.settings.theme = 'dark';
console.log(Config.settings.theme);
```
### Issue 15: Diamond problem via mixins
**Description:** Two mixins both override the same method
```javascript
const Loggable = (Base) => class extends Base { save() { console.log('log'); super.save(); } };
const Cacheable = (Base) => class extends Base { save() { console.log('cache'); super.save(); } };
class Model { save() { console.log('save'); } }
class User extends Cacheable(Loggable(Model)) {}
```
### Issue 16: super in getter causing side effects
**Description:** Calling parent getter that has side effects
```javascript
class Parent {
  get value() {
    console.log('accessed');
    return this._value;
  }
}
class Child extends Parent {
  get value() {
    return super.value + '!';
  }
}
```
### Issue 17: Not using polymorphism for algorithms
**Description:** Switch statement instead of polymorphic methods
```javascript
class Report {
  generate(format) {
    switch (format) {
      case 'PDF': return this.generatePDF();
      case 'HTML': return this.generateHTML();
      case 'CSV': return this.generateCSV();
    }
  }
}
```
### Issue 18: Final/protected methods not simulated
**Description:** Methods overridden when they shouldn't be
```javascript
class Lifecycle {
  init() { /* critical setup */ }
  render() { /* to be overridden */ }
}
class MyComponent extends Lifecycle {
  init() { /* accidentally overrides critical setup */ }
}
```
### Issue 19: Circular static dependency
**Description:** Static methods calling each other cyclically
```javascript
class A {
  static method1() { return B.method2(); }
}
class B {
  static method2() { return A.method1(); }
}
```
### Issue 20: Superfluous override that just calls super
**Description:** Override that adds no value
```javascript
class Parent {
  process(data) { /* complex logic */ }
}
class Child extends Parent {
  process(data) {
    return super.process(data);
  }
}
```
### Issue 21: Static initialization side effects
**Description:** Static block modifies external state
```javascript
class PluginLoader {
  static {
    console.log('Plugin loader initialized');
    window.__plugins = [];
  }
}
```
### Issue 22: Inheritance used for code reuse only
**Description:** Extending just to reuse a method
```javascript
class Helper {
  formatDate(date) { return date.toISOString(); }
}
class Report extends Helper {
  generate() { return this.formatDate(new Date()); }
}
```
### Issue 23: Not overriding Symbol.hasInstance for custom classes
**Description:** instanceof doesn't work as expected
```javascript
class Collection {
  static [Symbol.hasInstance](obj) {
    return 'items' in obj;
  }
}
```
### Issue 24: Parent constructor called with wrong context
**Description:** Using Parent.call(this) instead of super()
```javascript
class Parent { constructor(x) { this.x = x + 1; } }
class Child extends Parent {
  constructor(x) {
    Parent.call(this, x);
  }
}
```
### Issue 25: Inconsistent method override patterns
**Description:** Some methods call super, some don't
```javascript
class BaseComponent {
  init() { /* setup */ }
  render() { /* render */ }
  destroy() { /* cleanup */ }
}
class MyComponent extends BaseComponent {
  init() { super.init(); /* extra setup */ }
  render() { /* replaces, doesn't call super */ }
  destroy() { /* replaces, doesn't call super */ }
}
```
### Issue 26: Static method returning new this vs new class
**Description:** Static factory doesn't work with subclass
```javascript
class Model {
  static find(id) {
    return new Model(id); // Should be new this(id)
  }
}
class User extends Model {}
const user = User.find(1);
console.log(user instanceof User);
```
### Issue 27: Using extends for one-off customization
**Description:** Creating subclass for a single instance
```javascript
class BaseDialog {}
class ConfirmDialog extends BaseDialog {}
const dialog = new ConfirmDialog();
// Only one instance needed
```
### Issue 28: Mixin order dependence
**Description:** Mixin application order affects behavior
```javascript
const withLogging = (Base) => class extends Base { save() { console.log('log'); return super.save(); } };
const withValidation = (Base) => class extends Base { save() { this.validate(); return super.save(); } };
// Order matters: new (withLogging(withValidation(Model)))()
```
### Issue 29: Forgetting static methods are inherited
**Description:** Static methods from parent available on child
```javascript
class Parent { static helper() { return 'helper'; } }
class Child extends Parent {}
console.log(Child.helper()); // Works, but may be unexpected
```
### Issue 30: Overriding toString without calling super
**Description:** toString override loses class information
```javascript
class Person {
  constructor(name) { this.name = name; }
  toString() { return `Person: ${this.name}`; }
}
class Employee extends Person {
  constructor(name, role) { super(name); this.role = role; }
  toString() { return `Employee: ${this.name} (${this.role})`; }
}
```

## Modification Snippets (50)

### Modify 1: Add super call in derived constructor
**Description:** Fix the Dog constructor to properly call super
```javascript
class Animal { constructor(name) { this.name = name; } }
class Dog extends Animal {
  constructor(name, breed) {
    this.breed = breed;
    this.name = name;
  }
}
```
### Modify 2: Add super in overridden method
**Description:** Call parent method in Car.start override
```javascript
class Vehicle {
  start() { return 'Engine starting'; }
}
class Car extends Vehicle {
  start() { return 'Car ready'; }
}
```
### Modify 3: Convert static method to use class name
**Description:** Fix static method to use class name instead of this
```javascript
class Config {
  static timeout = 5000;
  static getTimeout() {
    return this.timeout;
  }
}
```
### Modify 4: Add abstract-like validation
**Description:** Add runtime check for unimplemented method
```javascript
class Shape {
  getArea() { /* no implementation */ }
}
class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
}
```
### Modify 5: Use super for constructor args spread
**Description:** Fix super call to pass all arguments
```javascript
class Point {
  constructor(x, y) { this.x = x; this.y = y; }
}
class Point3D extends Point {
  constructor(x, y, z) {
    super();
    this.z = z;
  }
}
```
### Modify 6: Add static factory method
**Description:** Add a static method that creates instances
```javascript
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}
// Add User.createAdmin(name) and User.createGuest()
```
### Modify 7: Use new this() in static factory
**Description:** Ensure static factory works with subclasses
```javascript
class Model {
  static find(id) {
    return new Model(id);
  }
}
class User extends Model {}
```
### Modify 8: Override toString with super call
**Description:** Call parent toString in override
```javascript
class Person {
  constructor(name) { this.name = name; }
  toString() { return this.name; }
}
class Employee extends Person {
  constructor(name, role) { super(name); this.role = role; }
  toString() { return this.role; }
}
```
### Modify 9: Add static property for instance count
**Description:** Track instance count with static property
```javascript
class User {
  constructor(name) {
    this.name = name;
  }
}
// Add static count that increments in constructor
```
### Modify 10: Refactor inheritance to composition
**Description:** Replace extends with composition pattern
```javascript
class Engine {
  start() { return 'vroom'; }
}
class Car extends Engine {
  drive() { return this.start() + ' moving'; }
}
```
### Modify 11: Add super in setter override
**Description:** Call parent setter in child setter
```javascript
class Person {
  constructor() { this._name = ''; }
  set name(v) { this._name = v; }
  get name() { return this._name; }
}
class Employee extends Person {
  constructor() { super(); this._role = ''; }
  set name(v) { this._name = v + ' (Employee)'; }
}
```
### Modify 12: Implement polymorphic method
**Description:** Use overriding instead of type checks
```javascript
function getArea(shape) {
  if (shape.type === 'circle') return Math.PI * shape.radius ** 2;
  if (shape.type === 'square') return shape.side ** 2;
}
```
### Modify 13: Fix static method that uses instance data
**Description:** Convert static method to instance method
```javascript
class User {
  constructor(name) { this.name = name; }
  static greet(user) { return `Hello ${user.name}`; }
}
```
### Modify 14: Add parent method call in async override
**Description:** Call super in async method override
```javascript
class BaseService {
  async fetch(url) {
    const res = await fetch(url);
    return res.json();
  }
}
class UserService extends BaseService {
  async fetch(url) {
    // Add caching but still call parent
  }
}
```
### Modify 15: Use super in getter for computed property
**Description:** Extend parent getter with super
```javascript
class Product {
  constructor(price) { this._price = price; }
  get price() { return this._price; }
}
class DiscountedProduct extends Product {
  constructor(price, discount) {
    super(price);
    this.discount = discount;
  }
  get price() {
    // Apply discount to parent price
  }
}
```
### Modify 16: Implement abstract class pattern
**Description:** Create base class with required method
```javascript
// Create a Database base class with abstract connect/query/close
class MySQLDatabase extends Database {}
class PostgreSQLDatabase extends Database {}
```
### Modify 17: Add static method for validation
**Description:** Add static validation helper to class
```javascript
class Validator {
  static isEmail(str) { return str.includes('@'); }
  static isPhone(str) { return str.length >= 10; }
}
// Add static validate method
```
### Modify 18: Fix extends order for mixins
**Description:** Reorder mixin application for correct behavior
```javascript
const withLogging = (Base) => class extends Base { save() { console.log('log'); return super.save(); } };
const withCache = (Base) => class extends Base { save() { return super.save(); } };
class Model { save() { return 'saved'; } }
class User extends withLogging(withCache(Model)) {}
```
### Modify 19: Use super in error override
**Description:** Extend parent error message
```javascript
class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AppError';
  }
}
class NotFoundError extends AppError {
  constructor(resource) {
    super(`Not found`);
  }
}
```
### Modify 20: Implement chain of inheritance with super
**Description:** Build a proper inheritance chain
```javascript
class A { method() { return 'A'; } }
class B extends A { method() { return 'B'; } }
class C extends B { method() { return 'C'; } }
// Add super calls so C returns "CBA"
```
### Modify 21: Add static method for comparison
**Description:** Static method to compare instances
```javascript
class Person {
  constructor(name, age) { this.name = name; this.age = age; }
}
// Add Person.compare that sorts by age
```
### Modify 22: Implement template method pattern
**Description:** Use inheritance with template method
```javascript
class ReportGenerator {
  generate() {
    this.fetchData();
    this.formatData();
    this.output();
  }
  fetchData() { throw new Error('Implement'); }
  formatData() { throw new Error('Implement'); }
  output() { throw new Error('Implement'); }
}
// Implement PDFReport and HTMLReport
```
### Modify 23: Fix static method returning subclass instance
**Description:** Use new this() instead of new ClassName()
```javascript
class Model {
  static create(data) {
    return new Model(data);
  }
}
class User extends Model {}
```
### Modify 24: Add Symbol.species to custom class
**Description:** Control what type is returned by derived methods
```javascript
class MyArray extends Array {
  // Override Symbol.species to return Array
}
```
### Modify 25: Use static getter for configuration
**Description:** Provide static configuration via getter
```javascript
class DatabaseConfig {
  // Static getter for host, port, credentials
}
class MySQLConfig extends DatabaseConfig {}
```
### Modify 26: Refactor to use super in constructor validation
**Description:** Add validation in base constructor
```javascript
class Vehicle {
  constructor(make, model) {
    if (!make) throw new Error('Make required');
    this.make = make;
    this.model = model;
  }
}
class Car extends Vehicle {
  constructor(make, model, doors) {
    super(make, model);
    this.doors = doors;
  }
}
// Add Truck that also extends Vehicle
```
### Modify 27: Add override guard with new.target
**Description:** Prevent instantiation of base class
```javascript
class AbstractClass {
  constructor() {
    if (new.target === AbstractClass) {
      throw new Error('Cannot instantiate abstract class');
    }
  }
}
// Implement a concrete subclass
```
### Modify 28: Implement strategy pattern via inheritance
**Description:** Use subclass for different strategies
```javascript
class SortStrategy {
  sort(data) { throw new Error('Implement'); }
}
class BubbleSort extends SortStrategy {}
class QuickSort extends SortStrategy {}
```
### Modify 29: Add mixin with super handling
**Description:** Create a mixin that properly calls super
```javascript
const Timestampable = (Base) => class extends Base {
  save() {
    this.updatedAt = new Date();
    return super.save();
  }
};
class Model { save() { return 'saved'; } }
class User extends Timestampable(Model) {}
```
### Modify 30: Fix diamond problem with mixin order
**Description:** Reorder mixins to resolve method resolution
```javascript
const A = (Base) => class extends Base { method() { return 'A' + super.method(); } };
const B = (Base) => class extends Base { method() { return 'B' + super.method(); } };
class Base { method() { return ''; } }
class Derived extends B(A(Base)) {}
console.log(new Derived().method());
```
### Modify 31: Add static init block for setup
**Description:** Use static initialization block
```javascript
class PluginManager {
  static plugins = [];
  // Add static block to initialize
}
```
### Modify 32: Implement super() in async constructor-like pattern
**Description:** Handle async setup in class hierarchy
```javascript
class BaseModel {
  constructor(data) { this.data = data; }
}
class UserModel extends BaseModel {
  constructor(data) {
    super(data);
    // Can't await, so use init method
  }
  async init() { /* async setup */ }
}
```
### Modify 33: Use super for getter with caching
**Description:** Add caching layer via super
```javascript
class ExpensiveService {
  get data() { return computeExpensiveValue(); }
}
class CachedService extends ExpensiveService {
  get data() {
    // Add caching, call super if not cached
  }
}
```
### Modify 34: Implement clone via constructor
**Description:** Use this.constructor for cloning
```javascript
class User {
  constructor(name) { this.name = name; }
  clone() {
    return new User(this.name); // Fix to use this.constructor
  }
}
```
### Modify 35: Fix missing super in computed property method
**Description:** Add super call in overridden computed method
```javascript
class Order {
  getTotal() { return this.items.reduce((s, i) => s + i.price, 0); }
}
class DiscountedOrder extends Order {
  getTotal() { return this.getTotal() * 0.9; } // Recursive!
}
```
### Modify 36: Add static method for common queries
**Description:** Static query methods on model
```javascript
class User {
  constructor(data) { this.data = data; }
  // Add static find(id), findAll(), findByEmail()
}
```
### Modify 37: Implement visitor pattern with inheritance
**Description:** Use visitor via class hierarchy
```javascript
class Element { accept(visitor) {} }
class TextElement extends Element {}
class ImageElement extends Element {}
// Implement visitor
```
### Modify 38: Use super for lifecycle hooks
**Description:** Component lifecycle with super calls
```javascript
class Component {
  mounted() { /* setup */ }
  beforeDestroy() { /* cleanup */ }
}
class MyComponent extends Component {
  mounted() { /* forgot to call super.mounted() */ }
}
```
### Modify 39: Add static method for unit conversion
**Description:** Static utility methods on unit class
```javascript
class Temperature {
  constructor(celsius) { this.celsius = celsius; }
  // Add Temperature.fromFahrenheit(f) and toFahrenheit()
}
```
### Modify 40: Implement fluent interface with inheritance
**Description:** Ensure method chaining works with inheritance
```javascript
class BaseQuery {
  where(condition) { return this; }
}
class UserQuery extends BaseQuery {
  withPosts() { return this; }
}
// Fix so chaining works: new UserQuery().where('x').withPosts()
```
### Modify 41: Use super in Symbol.toPrimitive
**Description:** Extend type coercion in subclass
```javascript
class Money {
  constructor(amount) { this.amount = amount; }
  [Symbol.toPrimitive](hint) {
    return hint === 'string' ? `$${this.amount}` : this.amount;
  }
}
class TaxedMoney extends Money {
  constructor(amount, taxRate) {
    super(amount);
    this.taxRate = taxRate;
  }
  [Symbol.toPrimitive](hint) {
    // Include tax in conversion
  }
}
```
### Modify 42: Add static method for configuration validation
**Description:** Static validation of class configuration
```javascript
class AppConfig {
  static validate(config) {
    // Validate required fields
  }
}
// Call AppConfig.validate before creating instance
```
### Modify 43: Implement null object pattern via inheritance
**Description:** Create null object subclass
```javascript
class Logger {
  log(msg) { console.log(msg); }
}
class NullLogger extends Logger {
  log(msg) { /* do nothing */ }
}
```
### Modify 44: Use super in adapter pattern
**Description:** Extend adaptee with super
```javascript
class OldAPI {
  getUser(id) { return { id, name: 'Old' }; }
}
class NewAPI extends OldAPI {
  getUser(id) {
    const user = super.getUser(id);
    return { ...user, email: `${user.name}@test.com` };
  }
}
```
### Modify 45: Fix method override with different return type
**Description:** Ensure consistent return type in overrides
```javascript
class Parser {
  parse(text) { return text.split(','); }
}
class JSONParser extends Parser {
  parse(text) { return JSON.parse(text); } // Returns object
}
```
### Modify 46: Add static method for default instances
**Description:** Factory method for common defaults
```javascript
class Button {
  constructor(text, color, size) { /* many params */ }
  // Add Button.primary(), Button.danger(), Button.ghost()
}
```
### Modify 47: Use super in error boundary pattern
**Description:** Extend error handling in subclass
```javascript
class SafeComponent {
  handleError(error) {
    console.error(error);
    return null;
  }
}
class ReportingComponent extends SafeComponent {
  handleError(error) {
    // Send to error reporting service AND call parent
  }
}
```
### Modify 48: Implement bridge pattern with inheritance
**Description:** Separate abstraction from implementation
```javascript
class Renderer { render(shape) {} }
class SVGRenderer extends Renderer {}
class CanvasRenderer extends Renderer {}
class Shape { constructor(renderer) { this.renderer = renderer; } }
// Complete the bridge pattern
```
### Modify 49: Add static method for deserialization
**Description:** Static fromJSON method
```javascript
class Person {
  constructor(name, age) { this.name = name; this.age = age; }
  toJSON() { return { name: this.name, age: this.age }; }
  // Add Person.fromJSON(data)
}
```
### Modify 50: Use super in composite pattern
**Description:** Tree structure with super for child delegation
```javascript
class UIComponent {
  render() { return ''; }
}
class CompositeComponent extends UIComponent {
  constructor() {
    super();
    this.children = [];
  }
  add(child) { this.children.push(child); }
  render() {
    // Combine children's render with parent
  }
}
```
