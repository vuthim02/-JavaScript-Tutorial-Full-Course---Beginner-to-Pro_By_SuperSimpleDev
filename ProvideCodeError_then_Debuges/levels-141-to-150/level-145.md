# Level 145 - Class hierarchy design (inheritance + composition) (Modules 19-20: Inheritance, Backend, Async/Await)

## Error Snippets

### Error 1: Missing super() in derived class constructor
**Description:** Call super() in the Manager constructor before using this.
```javascript
class Employee {
  constructor(name) {
    this.name = name;
  }
}
class Manager extends Employee {
  constructor(name, department) {
    this.name = name;
    this.department = department;
  }
}
```

### Error 2: super() called after accessing this
**Description:** Move super() before any this access in the constructor.
```javascript
class Animal {
  constructor(type) {
    this.type = type;
  }
}
class Dog extends Animal {
  constructor(name) {
    this.name = name;
    super("mammal");
  }
}
```

### Error 3: Calling super() twice
**Description:** Call super() exactly once in the constructor.
```javascript
class Parent {
  constructor(x) {
    this.x = x;
  }
}
class Child extends Parent {
  constructor(x, y) {
    super(x);
    super(x);
    this.y = y;
  }
}
```

### Error 4: Missing extends keyword
**Description:** Use the extends keyword to inherit from another class.
```javascript
class Vehicle {
  start() { return "vroom"; }
}
class Car Vehicle {
  constructor() {
    super();
  }
}
```

### Error 5: Forgetting super in subclass with no own constructor
**Description:** Define an explicit constructor that calls super with the correct args.
```javascript
class Base {
  constructor(name) {
    this.name = name;
  }
}
class Derived extends Base {
  constructor(name, extra) {
    this.extra = extra;
  }
}
```

### Error 6: Using this in class field initializer before super
**Description:** Initialize class fields after calling super in the constructor.
```javascript
class Parent {
  constructor() {
    this.parentProp = true;
  }
}
class Child extends Parent {
  childProp = this.parentProp ? "yes" : "no";
  constructor() {
    super();
  }
}
```

### Error 7: Private field access in subclass
**Description:** Access a private field defined in the parent class.
```javascript
class Parent {
  #secret = "hidden";
}
class Child extends Parent {
  reveal() {
    return this.#secret;
  }
}
```

### Error 8: Overriding a non-existent method
**Description:** Override a method that exists in the parent class.
```javascript
class Shape {
  area() { return 0; }
}
class Circle extends Shape {
  area() { return Math.PI * this.r * this.r; }
  nonExistent() { return super.nonExistent(); }
}
```

### Error 9: Wrong method signature override
**Description:** Override the parent method with the same parameter signature.
```javascript
class Repository {
  save(entity) { return "saved"; }
}
class UserRepository extends Repository {
  save(entity, options) {
    return super.save(entity);
  }
}
```

### Error 10: Composition over inheritance not used
**Description:** Use composition (has-a) instead of inheritance (is-a) for unrelated classes.
```javascript
class Engine {
  start() { return "started"; }
}
class Car extends Engine {
  drive() { return this.start() + " driving"; }
}
```

### Error 11: Circular inheritance chain
**Description:** Create a non-circular inheritance hierarchy.
```javascript
class A extends B {}
class B extends A {}
```

### Error 12: Extending from a primitive
**Description:** Extend from a class, not a primitive value.
```javascript
class MyArray extends "array" {
  constructor() {
    super();
  }
}
```

### Error 13: Static method overridden incorrectly
**Description:** Override a static method in the subclass using the static keyword.
```javascript
class Model {
  static find(id) { return "finding"; }
}
class UserModel extends Model {
  find(id) { return super.find(id); }
}
```

### Error 14: Getter not overridden properly
**Description:** Override the parent getter in the subclass.
```javascript
class Person {
  get fullName() { return this.first + " " + this.last; }
}
class Employee extends Person {
  fullName() { return super.fullName + " (Employee)"; }
}
```

### Error 15: Calling super in a method of a non-subclass
**Description:** Use super only in classes that extend another class.
```javascript
class Standalone {
  log() {
    super.log();
  }
}
```

### Error 16: Forgetting to pass all arguments to super
**Description:** Pass all required arguments from subclass to parent constructor.
```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Point3D extends Point {
  constructor(x, y, z) {
    super(x);
    this.z = z;
  }
}
```

### Error 17: Extending from a function that is not a constructor
**Description:** Use a class or constructor function as the base.
```javascript
const Mixin = {};
class MyClass extends Mixin {
  constructor() { super(); }
}
```

### Error 18: Private static field access outside class
**Description:** Access a private static field from within the class.
```javascript
class Config {
  static #apiKey = "abc123";
  static getKey() { return Config.#apiKey; }
}
console.log(Config.#apiKey);
```

### Error 19: Using new.target incorrectly
**Description:** Check new.target to prevent direct instantiation of abstract class.
```javascript
class AbstractClass {
  constructor() {
    if (new.target === AbstractClass) {
      throw new Error("Cannot instantiate abstract class");
    }
  }
}
```

### Error 20: Overriding constructor without calling super
**Description:** Call super() in the subclass constructor.
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  constructor(name, color) {
    this.color = color;
  }
}
```

### Error 21: Assigning to this before calling super in derived class
**Description:** Assign properties after calling super().
```javascript
class Base {
  constructor() {
    this.baseProp = true;
  }
}
class Derived extends Base {
  constructor() {
    this.derivedProp = true;
    super();
  }
}
```

### Error 22: Super reference in arrow function inside method
**Description:** Use super in regular function or method shorthand, not arrow.
```javascript
class Parent {
  greet() { return "hello"; }
}
class Child extends Parent {
  greet = () => super.greet() + " world";
}
```

### Error 23: Extending from built-in with wrong constructor
**Description:** Properly extend a built-in class like Array with correct constructor.
```javascript
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
  first() { return this[0]; }
}
```

### Error 24: Missing return from factory method
**Description:** Return the new instance from a static factory method.
```javascript
class User {
  static create(name) {
    new User(name);
  }
  constructor(name) {
    this.name = name;
  }
}
```

### Error 25: Not calling super in lifecycle method
**Description:** Call super.componentDidMount in a React component override.
```javascript
class MyComponent extends React.Component {
  componentDidMount() {
    this.loadData();
  }
}
```

### Error 26: Mixin conflict with class hierarchy
**Description:** Resolve naming conflicts when using multiple mixins.
```javascript
const Loggable = {
  log() { console.log("log"); }
};
const Serializable = {
  log() { console.log("serialize"); }
};
class Model {
  constructor() { this.data = {}; }
}
Object.assign(Model.prototype, Loggable, Serializable);
```

### Error 27: Not using super in overridden toString
**Description:** Call super.toString() in the overridden method.
```javascript
class Product {
  toString() { return this.name; }
}
class Book extends Product {
  toString() { return this.author + " - " + this.name; }
}
```

### Error 28: Accessing static property on instance
**Description:** Access static properties on the class, not the instance.
```javascript
class Counter {
  static count = 0;
  increment() { Counter.count++; }
}
const c = new Counter();
console.log(c.count);
```

### Error 29: Extending class with no constructor that needs super
**Description:** If the extended class has no constructor, no super is needed.
```javascript
class Plain {
  sayHi() { return "hi"; }
}
class Greeter extends Plain {
  constructor() {
    super();
  }
  sayHi() { return super.sayHi() + " there"; }
}
```

### Error 30: Infinite recursion via super call
**Description:** Avoid calling the same method on super that is currently executing.
```javascript
class Base {
  method() { return "base"; }
}
class Derived extends Base {
  method() {
    return super.method() + " derived";
  }
}
```

### Error 31: Using super in class field initializer
**Description:** Access super only in methods or constructor, not field initializers.
```javascript
class Parent {
  getName() { return "parent"; }
}
class Child extends Parent {
  name = super.getName();
  constructor() {
    super();
  }
}
```

### Error 32: Forgetting to call super in async constructor
**Description:** Call super() before any await in the constructor.
```javascript
class Base {
  constructor() {
    this.initialized = true;
  }
}
class Derived extends Base {
  async constructor() {
    await loadData();
    super();
  }
}
```

### Error 33: Private method override
**Description:** Private methods cannot be overridden in subclasses.
```javascript
class Parent {
  #privateMethod() { return "parent"; }
}
class Child extends Parent {
  #privateMethod() { return "child"; }
}
```

### Error 34: Calling class as regular function
**Description:** Instantiate the class using the new keyword.
```javascript
class MyClass {
  constructor(val) {
    this.val = val;
  }
}
const obj = MyClass(42);
```

### Error 35: Super not used in static method override
**Description:** Use super in static methods to call parent static methods.
```javascript
class Parent {
  static identify() { return "parent"; }
}
class Child extends Parent {
  static identify() { return "child"; }
}
```

### Error 36: Overwriting prototype property
**Description:** Instead of overwriting, use proper method overriding.
```javascript
class Widget {
  render() { return "<div></div>"; }
}
class Button extends Widget {
  render() { return "<button></button>"; }
}
Button.prototype.render = function() { return "<a></a>"; };
```

### Error 37: Missing new.target check in abstract classes
**Description:** Add a new.target check to prevent direct instantiation.
```javascript
class Database {
  constructor() {
    throw new Error("Abstract class");
  }
}
```

### Error 38: Forgetting to return from super call
**Description:** Return the result of super.method() when chaining.
```javascript
class Wrapper {
  process(data) { return data; }
}
class Validator extends Wrapper {
  process(data) {
    super.process(data);
  }
}
```

### Error 39: Wrong this binding in super call
**Description:** Ensure this refers to the correct object in super calls.
```javascript
class Parent {
  constructor() {
    this.x = 10;
  }
}
class Child extends Parent {
  constructor() {
    super();
    console.log(this.x);
  }
}
```

### Error 40: Class expression without proper name
**Description:** Assign the class expression to a variable.
```javascript
const MyClass = class {
  constructor() {}
};
```

### Error 41: Extending from a class that throws in constructor
**Description:** Handle the parent constructor throwing in the subclass.
```javascript
class Fragile {
  constructor() {
    throw new Error("Cannot create");
  }
}
class Robust extends Fragile {
  constructor() {
    try {
      super();
    } catch (e) {
      this.fallback = true;
    }
  }
}
```

### Error 42: Static property inheritance confusion
**Description:** Static properties are inherited in the prototype chain.
```javascript
class Parent {
  static config = { env: "production" };
}
class Child extends Parent {}
console.log(Child.config);
```

### Error 43: Using super in object literal
**Description:** Use super only inside class method definitions.
```javascript
const obj = {
  greet() {
    return super.greet();
  }
};
```

### Error 44: Symbol.species misuse in subclass
**Description:** Override Symbol.species in a subclass of a built-in.
```javascript
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
```

### Error 45: Class field shadowing parent getter
**Description:** Avoid shadowing a parent getter with a class field.
```javascript
class Person {
  get title() { return "Mr."; }
}
class Employee extends Person {
  title = "Dr.";
}
```

### Error 46: Not forwarding constructor args to super
**Description:** Forward all constructor arguments to the parent class.
```javascript
class Shape {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}
class Rect extends Shape {
  constructor(width, height, color) {
    super();
    this.color = color;
  }
}
```

### Error 47: Deep inheritance hierarchy
**Description:** Flatten a deep inheritance chain into composition.
```javascript
class A { a() {} }
class B extends A { b() {} }
class C extends B { c() {} }
class D extends C { d() {} }
class E extends D { e() {} }
```

### Error 48: Circular reference in super constructor
**Description:** Avoid passing this to another constructor before super().
```javascript
class Parent {
  constructor(child) {
    this.child = child;
  }
}
class Child extends Parent {
  constructor() {
    super(new Parent(this));
  }
}
```

### Error 49: Using super in a static method incorrectly
**Description:** Call super in static methods to access parent static methods.
```javascript
class Parent {
  static create() { return new this(); }
}
class Child extends Parent {
  static create() {
    return super.create();
  }
}
```

### Error 50: Not using super in getter/setter override
**Description:** Call super.getter or super.setter in the override.
```javascript
class Rectangle {
  constructor(w, h) { this.w = w; this.h = h; }
  get area() { return this.w * this.h; }
}
class Square extends Rectangle {
  constructor(s) { super(s, s); }
  get area() { return this.w * this.w; }
}
```

### Error 51: Inheriting from multiple classes
**Description:** JavaScript does not support multiple inheritance; use mixins.
```javascript
class A { a() {} }
class B { b() {} }
class C extends A, B {
  constructor() { super(); }
}
```

### Error 52: .constructor property not inherited
**Description:** The constructor property points to the class function.
```javascript
class Parent {}
class Child extends Parent {}
const c = new Child();
console.log(c.constructor === Child);
```

### Error 53: Forgetting super in derived class with spread args
**Description:** Forward all arguments using spread to super.
```javascript
class Base {
  constructor(...args) {
    this.args = args;
  }
}
class Derived extends Base {
  constructor(...args) {
    super("extra", ...args);
  }
}
```

### Error 54: Private field not accessible in subclass
**Description:** Use protected or public fields instead of private for subclass access.
```javascript
class Parent {
  #value = 42;
}
class Child extends Parent {
  getValue() {
    return this.#value;
  }
}
```

### Error 55: Overriding valueOf or toString without super
**Description:** Call super.valueOf() or super.toString() in the override.
```javascript
class Item {
  toString() { return "item"; }
}
class SpecialItem extends Item {
  toString() { return "special"; }
}
```

### Error 56: Using arguments object in arrow function
**Description:** Use rest parameters instead of arguments in arrow functions within methods.
```javascript
class Logger {
  log = () => {
    console.log(arguments);
  }
}
```

### Error 57: Missing static keyword for static methods
**Description:** Add the static keyword for methods that should be called on the class.
```javascript
class MathUtils {
  add(a, b) { return a + b; }
}
```

### Error 58: Instanceof check not working across realms
**Description:** Use duck typing or a brand check instead of instanceof across realms.
```javascript
function isMyClass(obj) {
  return obj instanceof MyClass;
}
```

### Error 59: Super in class field initializer before constructor
**Description:** Call super() in the constructor before using class field initializers.
```javascript
class Parent {
  constructor() { this.ok = true; }
}
class Child extends Parent {
  status = this.ok ? "good" : "bad";
  constructor() {
    super();
  }
}
```

### Error 60: Not checking instanceof before downcasting
**Description:** Check with instanceof before accessing subclass-specific methods.
```javascript
function process(animal) {
  animal.bark();
}
```

### Error 61: Forgetting method override is permanent
**Description:** Once overridden, the original method is replaced on the prototype.
```javascript
class Store {
  save() { return "saved"; }
}
class CacheStore extends Store {
  save() { return "cached"; }
}
const store = new CacheStore();
store.save();
```

### Error 62: Wrong property descriptor in subclass
**Description:** Use Object.defineProperty correctly in subclasses.
```javascript
class Configurable {
  get value() { return this._value; }
}
class Extended extends Configurable {
  constructor() {
    super();
    Object.defineProperty(this, "value", { value: 42 });
  }
}
```

### Error 63: Extending native Error class
**Description:** Properly extend the Error class with correct prototype chain.
```javascript
class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = "AppError";
  }
}
```

### Error 64: Calling non-static method statically
**Description:** Call instance methods on instances, not on the class.
```javascript
class Greeter {
  sayHi() { return "hi"; }
}
Greeter.sayHi();
```

### Error 65: Private static method inaccessible from instance
**Description:** Private static methods can only be called from within the class.
```javascript
class Helper {
  static #secret() { return "secret"; }
  work() { Helper.#secret(); }
}
```

### Error 66: Derived class can't access private static
**Description:** Subclasses cannot access parent's private static members.
```javascript
class Parent {
  static #secret = "hidden";
}
class Child extends Parent {
  static tryAccess() { return Parent.#secret; }
}
```

### Error 67: Property not initialized before method call
**Description:** Initialize properties before calling methods that depend on them.
```javascript
class InitOrder {
  constructor() {
    this.load();
    this.data = [];
  }
  load() { this.data.push("loaded"); }
}
```

### Error 68: Missing abstract method check
**Description:** Throw an error if a required method is not implemented in subclass.
```javascript
class AbstractWidget {
  render() {
    throw new Error("render() must be implemented");
  }
}
class MyWidget extends AbstractWidget {
  render() { return "<div/>"; }
}
```

### Error 69: Object literal vs class instantiation
**Description:** Use the class with new keyword instead of calling it like a function.
```javascript
const config = Config();
```

### Error 70: Using super in a nested class
**Description:** Use super correctly in nested class hierarchies.
```javascript
class Outer {
  static value = "outer";
}
class Inner extends Outer {
  static getValue() { return super.value; }
}
```

## Issue Snippets

### Issue 1: Deep inheritance instead of composition
**Description:** Use composition to share behavior instead of deep inheritance.
```javascript
class Animal {
  eat() {}
  sleep() {}
  breathe() {}
  move() {}
  makeSound() {}
}
class Dog extends Animal {
  bark() {}
  fetch() {}
}
class Cat extends Animal {
  meow() {}
  scratch() {}
}
```

### Issue 2: Base class with too many responsibilities
**Description:** Split the large base class into smaller focused classes.
```javascript
class AppComponent {
  constructor() {}
  render() {}
  fetchData() {}
  validate() {}
  formatOutput() {}
  logActivity() {}
  handleError() {}
}
```

### Issue 3: Unused constructor parameter in subclass
**Description:** Use or remove the unused parameter in the subclass.
```javascript
class Shape {
  constructor(type) { this.type = type; }
}
class Circle extends Shape {
  constructor(type, radius) {
    super(type);
  }
}
```

### Issue 4: Empty subclass with no additions
**Description:** Remove the subclass if it adds no value.
```javascript
class Animal {
  speak() { return "sound"; }
}
class Dog extends Animal {}
```

### Issue 5: Inheriting from utility class with many methods
**Description:** Use composition with only the needed utilities.
```javascript
class Utility {
  formatDate() {}
  parseCSV() {}
  encrypt() {}
  decrypt() {}
  sendEmail() {}
  generateReport() {}
}
class UserService extends Utility {
  findUsers() {}
}
```

### Issue 6: Method override changes contract
**Description:** Maintain the parent method contract in the override.
```javascript
class PaymentGateway {
  process(amount) { return { status: "success", amount }; }
}
class StripeGateway extends PaymentGateway {
  process(amount, currency) {
    return { status: "success", amount, currency };
  }
}
```

### Issue 7: Redundant super call in method
**Description:** Remove the super call if the override adds no behavior.
```javascript
class Base {
  init() { this.ready = true; }
}
class Derived extends Base {
  init() {
    super.init();
  }
}
```

### Issue 8: Missing composition for shared behavior
**Description:** Use a mixin or composed object instead of inheritance for shared logic.
```javascript
class LoggerMixin {
  log(msg) { console.log(msg); }
}
class ServiceA extends LoggerMixin {}
class ServiceB extends LoggerMixin {}
```

### Issue 9: Fragile base class problem
**Description:** Avoid making assumptions about base class implementation details.
```javascript
class BaseList {
  constructor(items) {
    this.items = [...items];
    this.count = items.length;
  }
}
class FilteredList extends BaseList {
  constructor(items) {
    super(items);
    this.filtered = this.items.filter(Boolean);
  }
}
```

### Issue 10: Class handles too many unrelated concerns
**Description:** Split the class into single-responsibility classes.
```javascript
class UserManager {
  constructor(db, emailer, logger, cache) {}
  createUser() {}
  sendWelcomeEmail() {}
  logActivity() {}
  cacheUserData() {}
  validateUser() {}
  generateReport() {}
}
```

### Issue 11: Inheritance used for code reuse only
**Description:** Use composition (import utility functions) instead of inheritance for reuse.
```javascript
class MathOps {
  static add(a, b) { return a + b; }
  static multiply(a, b) { return a * b; }
}
class Calculator extends MathOps {
  compute(a, b, op) {
    return op === "add" ? this.add(a, b) : this.multiply(a, b);
  }
}
```

### Issue 12: Diamond problem with mixins
**Description:** Resolve conflicts when multiple mixins define the same method.
```javascript
const CanLog = { log() { console.log("log"); } };
const CanSave = { log() { console.log("save"); } };
class Model {}
Object.assign(Model.prototype, CanLog, CanSave);
```

### Issue 13: Class exposes internal implementation
**Description:** Use private fields to hide internal details.
```javascript
class Counter {
  constructor() {
    this._count = 0;
  }
  increment() { this._count++; }
}
```

### Issue 14: Not using factory method over constructor
**Description:** Use a static factory method for complex object creation.
```javascript
class User {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.permissions = data.permissions;
  }
}
```

### Issue 15: Constructor does too much work
**Description:** Move complex initialization out of the constructor.
```javascript
class DatabaseConnection {
  constructor(config) {
    this.config = config;
    this.connect();
    this.validateSchema();
    this.loadDefaults();
    this.startPool();
  }
}
```

### Issue 16: Inheritance level too deep
**Description:** Limit class hierarchy depth to 2-3 levels.
```javascript
class Entity {}
class LivingThing extends Entity {}
class Animal extends LivingThing {}
class Mammal extends Animal {}
class Dog extends Mammal {}
class Labrador extends Dog {}
```

### Issue 17: Using extends for enums
**Description:** Use plain objects or enums instead of class inheritance.
```javascript
class Status {
  static PENDING = "pending";
  static APPROVED = "approved";
}
class OrderStatus extends Status {
  static SHIPPED = "shipped";
}
```

### Issue 18: Overusing protected properties
**Description:** Prefer private with getters/setters over protected.
```javascript
class Base {
  constructor() {
    this._internal = [];
  }
}
class Derived extends Base {
  manipulate() {
    this._internal.push("data");
  }
}
```

### Issue 19: Class hierarchy for data only
**Description:** Use plain objects or interfaces for data structures.
```javascript
class PersonData {
  constructor(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
  }
}
class EmployeeData extends PersonData {
  constructor(name, age, email, id) {
    super(name, age, email);
    this.id = id;
  }
}
```

### Issue 20: Static factory in base class not used
**Description:** Use the static factory method from the base class.
```javascript
class Model {
  static create(data) { return new this(data); }
}
class User extends Model {
  constructor(data) { super(); this.data = data; }
}
```

### Issue 21: Null checks repeated in every subclass
**Description:** Handle null/undefined in the base class instead.
```javascript
class Component {
  render() {}
}
class Header extends Component {
  render() {
    if (!this.props) return null;
    return "<header/>";
  }
}
class Footer extends Component {
  render() {
    if (!this.props) return null;
    return "<footer/>";
  }
}
```

### Issue 22: Base class depends on subclass implementation
**Description:** The base class should not assume specific subclass behavior.
```javascript
class BaseModel {
  save() {
    if (this.validate()) {
      this.persist();
    }
  }
}
class UserModel extends BaseModel {
  validate() { return this.name != null; }
}
```

### Issue 23: Method override with different error handling
**Description:** Use consistent error handling between parent and child methods.
```javascript
class Service {
  fetch() {
    throw new Error("Not implemented");
  }
}
class UserService extends Service {
  async fetch() {
    return await api.get("/users");
  }
}
```

### Issue 24: Multiple levels of constructor chaining
**Description:** Keep constructor chaining to a minimum.
```javascript
class A { constructor(x) { this.x = x; } }
class B extends A { constructor(x, y) { super(x); this.y = y; } }
class C extends B { constructor(x, y, z) { super(x, y); this.z = z; } }
```

### Issue 25: Not using Object.create for prototype chain
**Description:** Use class syntax instead of manually setting prototypes.
```javascript
function Animal(name) {
  this.name = name;
}
function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype);
```

### Issue 26: Unnecessary abstract base class
**Description:** Remove the abstract class if only one subclass exists.
```javascript
class PaymentMethod {
  pay() { throw new Error("Abstract"); }
}
class CreditCard extends PaymentMethod {
  pay(amount) { return "Paid " + amount; }
}
```

### Issue 27: Shared mutable state in base class
**Description:** Avoid shared mutable state in the base class prototype.
```javascript
class Base {
  constructor() {
    this.items = [];
  }
}
class DerivedA extends Base {
  add(item) { this.items.push(item); }
}
class DerivedB extends Base {
  add(item) { this.items.push(item); }
}
```

### Issue 28: Class extends from a third-party library class
**Description:** Use composition with the third-party class instead of inheritance.
```javascript
class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
```

### Issue 29: Missing super call in error constructor
**Description:** Call super(message) in the custom error class.
```javascript
class ValidationError extends Error {
  constructor(errors) {
    this.errors = errors;
    this.name = "ValidationError";
  }
}
```

### Issue 30: Too many conditional checks based on class type
**Description:** Use polymorphism instead of instanceof checks.
```javascript
function processShape(shape) {
  if (shape instanceof Circle) return shape.radius * Math.PI * 2;
  if (shape instanceof Square) return shape.side * 4;
  if (shape instanceof Triangle) return shape.sideA + shape.sideB + shape.sideC;
}
```

## Modify Snippets

### Modify 1: Add super() call to subclass constructor
**Description:** Call super(name) in the Manager constructor before using this.
```javascript
class Employee {
  constructor(name) { this.name = name; }
}
class Manager extends Employee {
  constructor(name, dept) {
    this.name = name;
    this.dept = dept;
  }
}
```

### Modify 2: Fix method override with super call
**Description:** Call super.speak() in the Dog class speak() method.
```javascript
class Animal {
  speak() { return "sound"; }
}
class Dog extends Animal {
  speak() { return "woof"; }
}
```

### Modify 3: Convert deep inheritance to composition
**Description:** Replace the deep hierarchy with composed objects.
```javascript
class Engine { start() { return "started"; } }
class Transmission { shift() { return "shifted"; } }
class Car extends Engine {
  drive() { return this.start(); }
}
```

### Modify 4: Add static method with super
**Description:** Call super.create() in the UserModel's static create method.
```javascript
class Model {
  static create(data) { return new this(data); }
}
class User extends Model {
  constructor(data) { super(); this.data = data; }
  static create(data) { return new this(data); }
}
```

### Modify 5: Abstract base class with required method
**Description:** Make the base class throw if a required method is not implemented.
```javascript
class ReportGenerator {
  generate() {}
}
class PDFReport extends ReportGenerator {
  generate() { return "pdf content"; }
}
```

### Modify 6: Fix private field access in subclass
**Description:** Use a protected getter instead of a private field.
```javascript
class Parent {
  #secret = "hidden";
}
class Child extends Parent {
  reveal() { return this.#secret; }
}
```

### Modify 7: Add missing super in getter override
**Description:** Call super.area in the Square getter.
```javascript
class Rectangle {
  constructor(w, h) { this.w = w; this.h = h; }
  get area() { return this.w * this.h; }
}
class Square extends Rectangle {
  constructor(s) { super(s, s); }
}
```

### Modify 8: Fix constructor argument forwarding to super
**Description:** Forward all arguments to the parent constructor.
```javascript
class Shape {
  constructor(w, h) { this.w = w; this.h = h; }
}
class ColoredShape extends Shape {
  constructor(w, h, color) {
    super();
    this.color = color;
  }
}
```

### Modify 9: Add mixin to class
**Description:** Use Object.assign to add mixin methods to the class prototype.
```javascript
class User {
  constructor(name) { this.name = name; }
}
const Loggable = {
  log() { console.log(this.name); }
};
```

### Modify 10: Fix circular inheritance
**Description:** Remove the circular extends reference.
```javascript
class A extends B {}
class B extends A {}
```

### Modify 11: Add abstract method check
**Description:** Throw an error if a subclass doesn't implement the required method.
```javascript
class DataSource {
  fetch() {}
}
class API extends DataSource {
  fetch() { return fetch("/api/data"); }
}
```

### Modify 12: Use composition instead of extends for utility
**Description:** Use a utility object as a property instead of inheriting from it.
```javascript
class Logger {
  log(msg) { console.log(msg); }
}
class UserService extends Logger {
  findUser(id) { return { id }; }
}
```

### Modify 13: Add proper constructor to subclass
**Description:** Define the constructor with super call in the subclass.
```javascript
class Animal {
  constructor(name) { this.name = name; }
}
class Bird extends Animal {
  fly() { return this.name + " flies"; }
}
```

### Modify 14: Fix static method override
**Description:** Use the static keyword when overriding a static method.
```javascript
class Config {
  static get(key) { return "value"; }
}
class AppConfig extends Config {
  get(key) { return "app-" + key; }
}
```

### Modify 15: Add new.target check to abstract class
**Description:** Prevent direct instantiation of the abstract base class.
```javascript
class Database {
  connect() { throw new Error("Abstract"); }
}
class MySQL extends Database {
  connect() { return "MySQL connected"; }
}
```

### Modify 16: Convert prototype-based inheritance to classes
**Description:** Rewrite using class and extends syntax.
```javascript
function Vehicle(type) {
  this.type = type;
}
Vehicle.prototype.start = function() { return "started"; };
function Car(type, model) {
  Vehicle.call(this, type);
  this.model = model;
}
Car.prototype = Object.create(Vehicle.prototype);
```

### Modify 17: Add super to lifecycle method
**Description:** Call super.componentDidMount in the React component.
```javascript
class MyComponent extends React.Component {
  componentDidMount() {
    this.loadData();
  }
}
```

### Modify 18: Fix incorrect extends target
**Description:** Extend from the correct class, not a primitive.
```javascript
class MyCollection extends "array" {
  constructor() { super(); }
}
```

### Modify 19: Add proper Symbol.species to subclass
**Description:** Override Symbol.species to return the parent class.
```javascript
class MyArray extends Array {
  // need species
}
```

### Modify 20: Convert inheritance to interface-like pattern
**Description:** Use a base class with abstract methods.
```javascript
class Printer {
  print() {}
}
class LaserPrinter extends Printer {
  print() { console.log("laser printing"); }
}
class InkjetPrinter extends Printer {
  print() { console.log("inkjet printing"); }
}
```

### Modify 21: Add missing return from override
**Description:** Return the result of super.process() from the override.
```javascript
class Processor {
  process(data) { return data; }
}
class Validator extends Processor {
  process(data) {
    super.process(data);
  }
}
```

### Modify 22: Fix this before super error
**Description:** Move super() before this usage in constructor.
```javascript
class Base {
  constructor() { this.base = true; }
}
class Derived extends Base {
  constructor() {
    this.derived = true;
    super();
  }
}
```

### Modify 23: Add factory method to class
**Description:** Add a static factory method that returns a new instance.
```javascript
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}
```

### Modify 24: Fix multiple inheritance attempt
**Description:** Use mixins instead of multiple extends.
```javascript
class A { a() {} }
class B { b() {} }
class C extends A, B {
  constructor() { super(); }
}
```

### Modify 25: Add super in toString override
**Description:** Call super.toString() in the subclass toString.
```javascript
class Item {
  toString() { return "item"; }
}
class SpecialItem extends Item {
  toString() { return "special " + super.toString(); }
}
```

### Modify 26: Fix class field shadowing parent getter
**Description:** Use super.getter instead of shadowing with a field.
```javascript
class Person {
  get title() { return "Mr."; }
}
class Employee extends Person {
  title = "Dr.";
}
```

### Modify 27: Add error handling to abstract method call
**Description:** Wrap the super.method() call in try/catch.
```javascript
class Base {
  risky() { throw new Error("danger"); }
}
class Safe extends Base {
  risky() {
    super.risky();
  }
}
```

### Modify 28: Fix private method access across classes
**Description:** Use a protected method instead of a private one.
```javascript
class Parent {
  #helper() { return "help"; }
}
class Child extends Parent {
  useHelper() { return this.#helper(); }
}
```

### Modify 29: Add proper constructor forwarding with rest
**Description:** Use rest parameters to forward all args to super.
```javascript
class Base {
  constructor(a, b, c) {
    this.a = a; this.b = b; this.c = c;
  }
}
class Derived extends Base {
  constructor(a, b, c, d) {
    this.d = d;
  }
}
```

### Modify 30: Split large base class using composition
**Description:** Extract concerns into separate classes and compose them.
```javascript
class Monster {
  constructor(name) { this.name = name; }
  attack() {}
  defend() {}
  move() {}
  speak() {}
  heal() {}
  transform() {}
}
```

### Modify 31: Fix non-class extends with class
**Description:** Change the extends target to a proper class.
```javascript
const Mixin = { method() {} };
class MyClass extends Mixin {
  constructor() { super(); }
}
```

### Modify 32: Add class hierarchy for polymorphism
**Description:** Create a base class and subclasses that share an interface.
```javascript
function calculateArea(shape) {
  if (shape.type === "circle") return Math.PI * shape.r * shape.r;
  if (shape.type === "rect") return shape.w * shape.h;
}
```

### Modify 33: Fix super in arrow function
**Description:** Use a method shorthand instead of arrow function for super access.
```javascript
class Parent {
  getName() { return "parent"; }
}
class Child extends Parent {
  getName = () => super.getName() + " child";
}
```

### Modify 34: Add missing static keyword
**Description:** Make the method static if it doesn't use instance data.
```javascript
class MathHelper {
  add(a, b) { return a + b; }
}
```

### Modify 35: Fix async constructor pattern
**Description:** Move async initialization to a static factory method.
```javascript
class Config {
  async constructor() {
    this.data = await fetch("/api/config").then(r => r.json());
  }
}
```

### Modify 36: Add mixin application helper
**Description:** Create a function that applies mixins to a class.
```javascript
class User {
  constructor(name) { this.name = name; }
}
```

### Modify 37: Fix constructor calling without new
**Description:** Add a check to ensure the class is instantiated with new.
```javascript
class SecureClass {
  constructor() {}
}
const obj = SecureClass();
```

### Modify 38: Add Symbol.hasInstance for custom instanceof
**Description:** Customize instanceof behavior for the class.
```javascript
class MyClass {}
const obj = new MyClass();
console.log(obj instanceof MyClass);
```

### Modify 39: Fix missing new.target in abstract
**Description:** Use new.target correctly to prevent direct instantiation.
```javascript
class Abstraction {
  constructor() {
    throw new Error("Abstract");
  }
}
```

### Modify 40: Convert inheritance tree to flat composition
**Description:** Replace class hierarchies with composed behavior objects.
```javascript
class Bird {
  constructor() { this.flying = true; }
  fly() {}
}
class Penguin extends Bird {
  constructor() {
    super();
    this.flying = false;
  }
}
```

### Modify 41: Fix duplicate super call
**Description:** Remove the duplicate super() call from the constructor.
```javascript
class Base { constructor(x) { this.x = x; } }
class Derived extends Base {
  constructor(x, y) {
    super(x);
    super(x);
    this.y = y;
  }
}
```

### Modify 42: Add proper base class constructor
**Description:** Define the base class constructor that subclasses will call.
```javascript
class Shape {}
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
}
```

### Modify 43: Fix property initialization order
**Description:** Move the property initialization after the super call.
```javascript
class Base { constructor() { this.ready = true; } }
class Derived extends Base {
  status = this.ready ? "ok" : "not";
  constructor() {
    super();
  }
}
```

### Modify 44: Add class-level JSDoc types
**Description:** Document the class with JSDoc type annotations.
```javascript
class User {
  constructor(name) { this.name = name; }
}
```

### Modify 45: Fix diamond problem with mixins
**Description:** Resolve method name conflicts between mixins.
```javascript
const MixinA = { save() { console.log("A"); } };
const MixinB = { save() { console.log("B"); } };
class Model {}
Object.assign(Model.prototype, MixinA, MixinB);
```

### Modify 46: Extract interface from class
**Description:** Create a separate interface definition for the class contract.
```javascript
class PaymentGateway {
  processPayment(amount) { return "processed"; }
}
class StripeGateway extends PaymentGateway {}
```

### Modify 47: Fix class expression name scoping
**Description:** Use the class name correctly inside the class expression.
```javascript
const MyClass = class LocalName {
  static identify() { return LocalName.name; }
};
```

### Modify 48: Add validation to setter override
**Description:** Add validation logic in the setter override while calling super.setter.
```javascript
class Person {
  set age(val) { this._age = val; }
}
class Employee extends Person {
  set age(val) {
    if (val < 0) throw new Error("Invalid age");
  }
}
```

### Modify 49: Convert class hierarchy to strategy pattern
**Description:** Replace inheritance-based polymorphism with strategy composition.
```javascript
class PaymentProcessor {
  process(type, amount) {
    if (type === "credit") return amount * 1.02;
    if (type === "debit") return amount * 1.01;
    if (type === "paypal") return amount * 1.03;
  }
}
```

### Modify 50: Fix missing super in derived constructor with computed properties
**Description:** Call super() before defining computed properties.
```javascript
class Base { constructor() { this.base = true; } }
class Derived extends Base {
  constructor() {
    const computed = "value";
    super();
    this.computed = computed;
  }
}
```
