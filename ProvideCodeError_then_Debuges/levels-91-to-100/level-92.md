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
}# Level 92 - Prototype chain and method overriding (Module 19: Inheritance)

## Error Snippets

### Error 1: Overriding method without calling parent
**Description:** Dog extends Animal. Override speak() but don't call parent version.
```javascript
class Animal {
  speak() {
    return "Animal speaks";
  }
}
class Dog extends Animal {
  speak() {
    return "Woof";
  }
}
const d = new Dog();
```

### Error 2: Incorrect prototype assignment
**Description:** Manually set prototype to wrong object.
```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return "Hello";
};
function Student(name, grade) {
  Person.call(this, name);
  this.grade = grade;
}
Student.prototype = Person;
const s = new Student("Alice", "A");
```

### Error 3: Method override that breaks polymorphism
**Description:** Override a method and change return type incompatibly.
```javascript
class Collection {
  getItems() {
    return [1, 2, 3];
  }
}
class SingleItem extends Collection {
  getItems() {
    return 42;
  }
}
const c = new SingleItem();
console.log(c.getItems().length);
```

### Error 4: Forgetting to set constructor after prototype reassignment
**Description:** Reassign prototype but forget to fix constructor reference.
```javascript
function Vehicle() {}
Vehicle.prototype.drive = function() {
  return "driving";
};
function Car() {}
Car.prototype = Object.create(Vehicle.prototype);
const c = new Car();
console.log(c.constructor === Car);
```

### Error 5: Overriding non-existent method and calling super
**Description:** Try to call super on a method that doesn't exist in prototype chain.
```javascript
class A {}
class B extends A {
  show() {
    return super.show();
  }
}
const b = new B();
```

### Error 6: Circular prototype chain
**Experiment:** Create objects referencing each other as prototypes.
```javascript
const a = {};
const b = {};
Object.setPrototypeOf(a, b);
Object.setPrototypeOf(b, a);
```

### Error 7: Method override with wrong parameter count
**Description:** Override a method but pass wrong number of args to super.
```javascript
class Formatter {
  format(text, align) {
    return text.padStart(align);
  }
}
class JSONFormatter extends Formatter {
  format(text) {
    return super.format(text, "left", true);
  }
}
const f = new JSONFormatter();
```

### Error 8: Missing prototype link for inherited methods
**Description:** Create subclass but forget to link prototype.
```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return this.name + " speaks";
};
function Cat(name) {
  Animal.call(this, name);
}
const c = new Cat("Whiskers");
console.log(c.speak());
```

### Error 9: Overriding in constructor instead of prototype
**Description:** Define method inside constructor instead of on prototype, wasting memory.
```javascript
class Base {
  constructor() {
    this.getName = function() {
      return "base";
    };
  }
}
class Derived extends Base {
  constructor() {
    super();
    this.getName = function() {
      return "derived";
    };
  }
}
const d = new Derived();
```

### Error 10: Using arrow function for prototype method
**Description:** Assign arrow function to prototype, losing dynamic this.
```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = () => {
  return "Hi, I'm " + this.name;
};
const p = new Person("Bob");
console.log(p.greet());
```

### Error 11: Override and ignore super return value
**Description:** Method override calculates result but ignores super's return.
```javascript
class Calculator {
  compute(a, b) {
    return a + b;
  }
}
class Multiplier extends Calculator {
  compute(a, b) {
    super.compute(a, b);
    return a * b;
  }
}
const m = new Multiplier();
console.log(m.compute(3, 4));
```

### Error 12: Prototype chain too deep for method lookup
**Description:** Create 100-level deep chain causing stack overflow.
```javascript
let obj = {};
for (let i = 0; i < 100; i++) {
  obj = Object.create(obj);
}
obj.method();
```

### Error 13: Overriding static method as instance method
**Description:** Try to override a static method with an instance method.
```javascript
class Config {
  static getDefault() {
    return { theme: "light" };
  }
}
class AppConfig extends Config {
  getDefault() {
    return { theme: "dark" };
  }
}
const c = new AppConfig();
console.log(c.getDefault());
```

### Error 14: Forgetting that properties shadow prototype methods
**Description:** Set a property that shadows a prototype method.
```javascript
class Player {
  move() {
    return "moving";
  }
}
const p = new Player();
p.move = "standing";
console.log(p.move());
```

### Error 15: Override in child but parent method uses this differently
**Description:** Parent method uses this in a way that breaks when child overrides other methods.
```javascript
class A {
  getValue() {
    return this.value;
  }
  process() {
    return this.getValue() * 2;
  }
}
class B extends A {
  getValue() {
    return "string";
  }
}
const b = new B();
b.value = 5;
console.log(b.process());
```

### Error 16: Method override in constructor called before super
**Description:** Call an overridden method in parent constructor that relies on child state.
```javascript
class Parent {
  constructor() {
    this.init();
  }
  init() {
    this.data = "parent";
  }
}
class Child extends Parent {
  constructor() {
    super();
    this.data = "child";
  }
  init() {
    this.data = "child init";
  }
}
const c = new Child();
```

### Error 17: Prototype method modification affecting siblings
**Description:** Modify a prototype method after instantiation, affecting all instances.
```javascript
class Dog {
  bark() {
    return "Woof";
  }
}
const d1 = new Dog();
Dog.prototype.bark = function() {
  return "Bark";
};
const d2 = new Dog();
console.log(d1.bark());
```

### Error 18: Incorrect super.prop for data properties
**Description:** Try to access parent data property via super (only works for methods).
```javascript
class A {
  constructor() {
    this.x = 10;
  }
}
class B extends A {
  constructor() {
    super();
  }
  getX() {
    return super.x;
  }
}
const b = new B();
console.log(b.getX());
```

### Error 19: Overriding method with incompatible types
**Description:** Override a method that is expected to return an array but returns object.
```javascript
class ItemProvider {
  getItems() {
    return ["a", "b"];
  }
}
class SingleProvider extends ItemProvider {
  getItems() {
    return { item: "a" };
  }
}
const p = new SingleProvider();
for (const item of p.getItems()) {}
```

### Error 20: prototype pollution via constructor
**Description:** Modify prototype through constructor property.
```javascript
function User(name) {
  this.name = name;
}
User.prototype.log = function() {
  console.log(this.name);
};
const u = new User("test");
u.constructor.prototype.log = function() {
  console.log("HACKED");
};
```

### Error 21: Override of hasOwnProperty check
**Description:** Override hasOwnProperty on prototype directly.
```javascript
const obj = {};
obj.hasOwnProperty = function() {
  return false;
};
console.log(obj.hasOwnProperty("toString"));
```

### Error 22: Using __proto__ instead of Object.create
**Description:** Directly assign __proto__ in constructor function.
```javascript
function Base() {
  this.base = true;
}
Base.prototype.doBase = function() {
  return "base done";
};
function Derived() {
  this.__proto__ = Base.prototype;
  this.derived = true;
}
const d = new Derived();
console.log(d.doBase());
```

### Error 23: Method override that breaks contract
**Description:** Override add method to remove items instead.
```javascript
class Stack {
  push(item) {
    this.items.push(item);
  }
  pop() {
    return this.items.pop();
  }
}
class ReverseStack extends Stack {
  push(item) {
    return this.items.shift();
  }
}
const s = new ReverseStack();
s.items = [];
s.push(1);
```

### Error 24: Inherited method relies on this but context is lost
**Description:** Extract method from prototype and call without context.
```javascript
class Util {
  greet() {
    return "Hello " + this.name;
  }
}
class Person extends Util {
  constructor(name) {
    super();
    this.name = name;
  }
}
const p = new Person("Alice");
const fn = p.greet;
console.log(fn());
```

### Error 25: Override Symbol.hasInstance incorrectly
**Description:** Customize instanceof check but break it.
```javascript
class MyArray {
  static [Symbol.hasInstance](instance) {
    return false;
  }
}
const arr = new MyArray();
console.log(arr instanceof MyArray);
```

### Error 26: Extending native objects and overriding methods
**Description:** Extend Array and override push to not add items.
```javascript
class NoPushArray extends Array {
  push(...items) {
    return this.length;
  }
}
const arr = new NoPushArray(1, 2, 3);
arr.push(4);
console.log(arr.length);
```

### Error 27: Prototype chain break with Object.setPrototypeOf
**Description:** Disconnect an instance from its class prototype.
```javascript
class MyClass {
  getVal() {
    return 42;
  }
}
const obj = new MyClass();
Object.setPrototypeOf(obj, null);
console.log(obj.getVal());
```

### Error 28: Calling parent method with this not set
**Description:** Use parent method via prototype directly without correct this.
```javascript
function A() {}
A.prototype.show = function() {
  return this.val;
};
function B() {
  this.val = 10;
}
B.prototype = A.prototype;
const b = new B();
console.log(b.show());
```

### Error 29: Polymorphism broken by type check
**Description:** Parent method checks instanceof which fails for child.
```javascript
class Parent {
  identify() {
    if (this instanceof Parent) return "I am parent";
    return "unknown";
  }
}
class Child extends Parent {
  identify() {
    return super.identify();
  }
}
const c = new Child();
console.log(c.identify());
```

### Error 30: Method override in object literal pattern
**Description:** Override a prototype method on a plain object.
```javascript
const proto = {
  greet() {
    return "Hi";
  }
};
const obj = Object.create(proto);
obj.greet = "Hello";
console.log(obj.greet());
```

### Error 31: Missing return in overridden method
**Description:** Override a method that should return a value but doesn't.
```javascript
class Factory {
  create() {
    return { type: "generic" };
  }
}
class SpecificFactory extends Factory {
  create() {
    const item = super.create();
    item.type = "specific";
  }
}
const f = new SpecificFactory();
const item = f.create();
```

### Error 32: Using class syntax but mixing with prototype manipulation
**Description:** Define class then manually mess with prototype, breaking things.
```javascript
class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count++;
  }
}
Counter.prototype.increment = function() {
  this.count += 2;
};
const c = new Counter();
c.increment();
```

### Error 33: Prototype method uses closure variable incorrectly
**Description:** Method defined in constructor loses access to prototype methods.
```javascript
class MyClass {
  constructor() {
    this.action = function() {
      return this.helper();
    };
  }
  helper() {
    return "helped";
  }
}
const m = new MyClass();
const fn = m.action;
console.log(fn());
```

### Error 34: Override constructor property on prototype
**Description:** Set prototype.constructor to a different class.
```javascript
class A {
  constructor() {
    this.type = "A";
  }
}
class B extends A {
  constructor() {
    super();
    this.type = "B";
  }
}
B.prototype.constructor = A;
const b = new B();
console.log(b.constructor.name);
```

### Error 35: Shadowing method with property in constructor
**Description:** Assign a value to method name in constructor.
```javascript
class Service {
  fetch() {
    return "data";
  }
}
class ProxyService extends Service {
  constructor() {
    super();
    this.fetch = "cached";
  }
}
const p = new ProxyService();
console.log(p.fetch());
```

### Error 36: Trying to override non-writable prototype property
**Description:** Attempt to override a read-only prototype property.
```javascript
class Immutable {
  get version() {
    return "1.0";
  }
}
class Mutable extends Immutable {
  get version() {
    return "2.0";
  }
}
const m = new Mutable();
console.log(m.version);
```

### Error 37: Prototype chain with Proxy intercept
**Description:** Create proxy on prototype that interferes with method lookup.
```javascript
class Model {
  getData() {
    return { id: 1 };
  }
}
const handler = {
  get(target, prop) {
    if (prop === "getData") return undefined;
    return target[prop];
  }
};
Model.prototype = new Proxy(Model.prototype, handler);
const m = new Model();
console.log(m.getData());
```

### Error 38: Override in constructor but call super version
**Description:** Define method in constructor that tries to call prototype method.
```javascript
class A {
  doSomething() {
    return "A done";
  }
}
class B extends A {
  constructor() {
    super();
    this.doSomething = function() {
      return super.doSomething();
    };
  }
}
const b = new B();
console.log(b.doSomething());
```

### Error 39: Incorrect super in static method
**Description:** Call super.method() in static context where parent has instance method.
```javascript
class Parent {
  greet() {
    return "hello";
  }
}
class Child extends Parent {
  static greet() {
    return super.greet();
  }
}
console.log(Child.greet());
```

### Error 40: Override with undefined return
**Description:** Method returns undefined instead of expected value.
```javascript
class Converter {
  toNumber(val) {
    return Number(val);
  }
}
class StrictConverter extends Converter {
  toNumber(val) {
    if (typeof val !== "string") return;
    return super.toNumber(val);
  }
}
const c = new StrictConverter();
const result = c.toNumber(42);
```

### Error 41: Multiple levels of override losing context
**Description:** Three-level chain where each override calls super with wrong args.
```javascript
class A {
  calc(x) {
    return x;
  }
}
class B extends A {
  calc(x) {
    return super.calc(x + 1);
  }
}
class C extends B {
  calc(x) {
    return super.calc(x * 2);
  }
}
const c = new C();
console.log(c.calc(5));
```

### Error 42: Object.setPrototypeOf circular reference
**Description:** Create circular prototype chain with setPrototypeOf.
```javascript
const obj1 = { name: "first" };
const obj2 = { name: "second" };
Object.setPrototypeOf(obj1, obj2);
Object.setPrototypeOf(obj2, obj1);
```

### Error 43: Override in child breaks parent method that uses this.constructor
**Description:** Parent method uses this.constructor but child overrides it.
```javascript
class Model {
  static create() {
    return new this();
  }
  clone() {
    return new this.constructor();
  }
}
class User extends Model {
  constructor() {
    super();
    this.role = "user";
  }
}
const u = new User();
const cloned = u.clone();
```

### Error 44: Inconsistent override that changes method semantics
**Description:** Override a getter as a method or vice versa.
```javascript
class Rectangle {
  get area() {
    return this.w * this.h;
  }
}
class Square extends Rectangle {
  area() {
    return this.w * this.w;
  }
}
const s = new Square();
s.w = 5;
s.h = 5;
console.log(s.area);
```

### Error 45: Prototype method incorrectly bound in constructor
**Description:** Bind prototype method to different object in constructor.
```javascript
class Handler {
  constructor() {
    this.handle = this.handle.bind(null);
  }
  handle() {
    return this.toString();
  }
}
const h = new Handler();
console.log(h.handle());
```

### Error 46: Override with destructuring that loses arguments
**Description:** Override method uses destructuring but loses rest of args.
```javascript
class Printer {
  print(...args) {
    return args.join(", ");
  }
}
class FancyPrinter extends Printer {
  print({ color, ...rest }) {
    return super.print(rest);
  }
}
const p = new FancyPrinter();
console.log(p.print("hello", "world"));
```

### Error 47: Using prototype to add methods after instantiation
**Description:** Add method to prototype after creating instance, then call it.
```javascript
class Clock {
  constructor() {
    this.time = Date.now();
  }
}
const c = new Clock();
Clock.prototype.show = function() {
  return this.time;
};
console.log(c.show());
```

### Error 48: Override constructor return value
**Description:** Subclass constructor returns a primitive.
```javascript
class Base {
  constructor() {
    this.base = true;
  }
}
class Derived extends Base {
  constructor() {
    super();
    return "string";
  }
}
const d = new Derived();
```

### Error 49: Incorrect super in arrow function inside method
**Description:** Arrow function inside method uses super incorrectly.
```javascript
class A {
  getVal() {
    return 10;
  }
}
class B extends A {
  getDouble() {
    const fn = () => super.getVal();
    return fn;
  }
}
const b = new B();
console.log(b.getDouble()());
```

### Error 50: Prototype chain with null prototype
**Description:** Create object with null prototype and try to call methods.
```javascript
const obj = Object.create(null);
obj.name = "test";
console.log(obj.toString());
```

### Error 51: Override conflicts with inheritance of static methods
**Description:** Instance method tries to override static method from parent.
```javascript
class MathUtils {
  static sum(a, b) {
    return a + b;
  }
}
class AdvancedMath extends MathUtils {
  sum(a, b) {
    return a + b + 0;
  }
}
const m = new AdvancedMath();
console.log(m.sum(1, 2));
```

### Error 52: Inconsistent override in getter/setter pair
**Description:** Override only getter but not setter.
```javascript
class Account {
  get balance() {
    return this._balance;
  }
  set balance(v) {
    this._balance = v;
  }
}
class SavingsAccount extends Account {
  get balance() {
    return this._balance + this._interest;
  }
}
const s = new SavingsAccount();
s.balance = 100;
```

### Error 53: Prototype chain pollution through constructor
**Description:** Access constructor.prototype and modify it.
```javascript
class SecureClass {
  get secret() {
    return "secret";
  }
}
const s = new SecureClass();
s.constructor.prototype.getSecret = function() {
  return "hacked";
};
```

### Error 54: Override with default parameters mismatch
**Description:** Override method with different default parameter values.
```javascript
class Timer {
  start(delay = 0, interval = 1000) {
    return { delay, interval };
  }
}
class FastTimer extends Timer {
  start(delay = 100, interval = 500) {
    return super.start(delay, interval);
  }
}
const t = new FastTimer();
console.log(t.start());
```

### Error 55: Prototype method uses super but no parent method
**Description:** Define method on child that calls super.method() where parent is plain object.
```javascript
const parent = {
  greet() {
    return "hello";
  }
};
const child = {
  greet() {
    return super.greet() + " world";
  }
};
Object.setPrototypeOf(child, parent);
console.log(child.greet());
```

### Error 56: Override that calls super with wrong this
**Description:** Extract super method and call with explicit this.
```javascript
class A {
  show() {
    return this.name;
  }
}
class B extends A {
  constructor(name) {
    super();
    this.name = name;
  }
  show() {
    const s = super.show;
    return s.call({ name: "wrong" });
  }
}
const b = new B("correct");
console.log(b.show());
```

### Error 57: Method hiding due to property shadowing in chain
**Description:** Parent and child both define same data property name.
```javascript
class Parent {
  constructor() {
    this.value = "parent";
  }
}
class Child extends Parent {
  constructor() {
    super();
    this.value = "child";
  }
  getValue() {
    return this.value;
  }
}
const c = new Child();
```

### Error 58: Override method that is used in parent constructor
**Description:** Parent constructor calls a method that child overrides, causing unexpected behavior.
```javascript
class Document {
  constructor() {
    this.load();
  }
  load() {
    this.content = "default";
  }
}
class PDFDocument extends Document {
  constructor() {
    super();
  }
  load() {
    this.content = "PDF content";
    this.pages = 0;
  }
}
const doc = new PDFDocument();
```

### Error 59: Manual prototype assignment without Object.create
**Description:** Directly assign Child.prototype = Parent.prototype.
```javascript
function Parent() {}
Parent.prototype.method = function() {
  return "parent";
};
function Child() {}
Child.prototype = Parent.prototype;
Child.prototype.method = function() {
  return "child";
};
const p = new Parent();
const c = new Child();
console.log(p.method());
```

### Error 60: Override in class field vs prototype method
**Description:** Class field shadows prototype method.
```javascript
class Greeter {
  greet = function() {
    return "field hello";
  };
  greet() {
    return "method hello";
  }
}
const g = new Greeter();
console.log(g.greet());
```

### Error 61: Multiple inheritance simulation causing method ambiguity
**Description:** Fake multiple inheritance leads to wrong method being called.
```javascript
class A {
  method() {
    return "A";
  }
}
class B {
  method() {
    return "B";
  }
}
class C extends A {
  constructor() {
    super();
    Object.assign(C.prototype, B.prototype);
  }
}
const c = new C();
console.log(c.method());
```

### Error 62: Delete method from prototype after instantiation
**Description:** Delete a prototype method then try to call it on instance.
```javascript
class Service {
  fetch() {
    return "data";
  }
}
const s = new Service();
delete Service.prototype.fetch;
console.log(s.fetch());
```

### Error 63: Override with spread of super result
**Description:** Call super and spread result, but super returns undefined.
```javascript
class A {
  getData() {
    return { a: 1 };
  }
}
class B extends A {
  getData() {
    return { ...super.getData(), b: 2 };
  }
}
class C extends B {
  getData() {
    return super.getData();
  }
}
const c = new C();
console.log(c.getData());
```

### Error 64: Prototype chain with getter overriding
**Description:** Override a getter in prototype with another getter.
```javascript
class Config {
  get setting() {
    return this._setting || "default";
  }
}
class DevConfig extends Config {
  get setting() {
    return "dev";
  }
}
const c = new DevConfig();
c._setting = "custom";
console.log(c.setting);
```

### Error 65: Method override that returns super call directly but super is async
**Description:** Override async method but don't await super.
```javascript
class DataService {
  async getData() {
    return await Promise.resolve({ data: "value" });
  }
}
class CacheService extends DataService {
  getData() {
    const data = super.getData();
    return data;
  }
}
const cs = new CacheService();
cs.getData().then(d => console.log(d));
```

### Error 66: Override valueOf but return wrong type
**Description:** valueOf should return primitive but returns object.
```javascript
class Wrapper {
  constructor(val) {
    this.val = val;
  }
  valueOf() {
    return this.val;
  }
}
class StringWrapper extends Wrapper {
  valueOf() {
    return { original: this.val };
  }
}
const sw = new StringWrapper("hello");
console.log(sw + " world");
```

### Error 67: Prototype property that is an object shared across instances
**Description:** Define object on prototype that gets mutated by one instance.
```javascript
class SharedData {
  constructor() {
    this.items = [];
  }
}
SharedData.prototype.shared = [];
const a = new SharedData();
const b = new SharedData();
a.shared.push("from a");
console.log(b.shared);
```

### Error 68: Override Symbol.iterator badly
**Description:** Override iterator to return non-iterator object.
```javascript
class MyCollection {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
  }
}
class BadCollection extends MyCollection {
  [Symbol.iterator]() {
    return "not an iterator";
  }
}
const bc = new BadCollection();
console.log([...bc]);
```

### Error 69: Super in object method shorthand with prototype
**Description:** Create object with method shorthand that uses super but no parent.
```javascript
const obj = {
  name: "obj",
  show() {
    return super.name;
  }
};
console.log(obj.show());
```

### Error 70: Method override with wrong signature for native methods
**Description:** Override native toString with wrong parameter pattern.
```javascript
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  toString(extra) {
    return this.name + ": $" + this.price + extra;
  }
}
const p = new Product("Book", 20);
console.log("Product: " + p);
```

## Issue Snippets

### Issue 1: Redundant method override that does nothing new
**Description:** Override method that just calls super with same args.
```javascript
class Animal {
  move() {
    return "moving";
  }
}
class Dog extends Animal {
  move() {
    return super.move();
  }
}
```

### Issue 2: Deep inheritance chain with little value
**Description:** Five levels of inheritance where each only adds one trivial property.
```javascript
class A { constructor() { this.a = 1; } }
class B extends A { constructor() { super(); this.b = 2; } }
class C extends B { constructor() { super(); this.c = 3; } }
class D extends C { constructor() { super(); this.d = 4; } }
class E extends D { constructor() { super(); this.e = 5; } }
```

### Issue 3: Method override changes behavior drastically
**Description:** Override that reverses the parent method logic entirely.
```javascript
class Sorter {
  sort(arr) {
    return arr.sort((a, b) => a - b);
  }
}
class ReverseSorter extends Sorter {
  sort(arr) {
    return arr.sort((a, b) => b - a);
  }
}
```

### Issue 4: Not using super for shared logic
**Description:** Override duplicates the parent method code completely.
```javascript
class Logger {
  log(msg) {
    const formatted = "[" + new Date().toISOString() + "] " + msg;
    console.log(formatted);
  }
}
class WarnLogger extends Logger {
  log(msg) {
    const formatted = "[" + new Date().toISOString() + "] WARN: " + msg;
    console.log(formatted);
  }
}
```

### Issue 5: Prototype chain too long for simple extension
**Description:** Creating a chain of 6 classes for a simple shape hierarchy.
```javascript
class Shape { }
class Polygon extends Shape { }
class Quadrilateral extends Polygon { }
class Rectangle extends Quadrilateral { }
class Square extends Rectangle { }
class TinySquare extends Square { }
```

### Issue 6: Override returns different type than parent
**Description:** Parent returns number, child returns string from same method.
```javascript
class Parser {
  parse(input) {
    return parseInt(input);
  }
}
class StringParser extends Parser {
  parse(input) {
    return input.toString();
  }
}
```

### Issue 7: Override that breaks Liskov substitution
**Description:** Child method throws error where parent doesn't.
```javascript
class Repository {
  get(id) {
    return { id, name: "item" };
  }
}
class StrictRepository extends Repository {
  get(id) {
    if (!id) throw new Error("ID required");
    return super.get(id);
  }
}
```

### Issue 8: Inheritance for code reuse instead of composition
**Description:** Class extends another just to use one utility method.
```javascript
class StringHelper {
  truncate(s, len) {
    return s.slice(0, len);
  }
}
class ReportGenerator extends StringHelper {
  generate(data) {
    return this.truncate(data.toString(), 100);
  }
}
```

### Issue 9: Override that calls super but ignores result
**Description:** Method calls super but uses its own separate logic.
```javascript
class Base {
  process(data) {
    return data.trim();
  }
}
class Derived extends Base {
  process(data) {
    super.process(data);
    return data.toUpperCase();
  }
}
```

### Issue 10: Prototype method defined in wrong place
**Description:** Defining prototype-like methods using this instead of prototype.
```javascript
class User {
  constructor(name) {
    this.name = name;
    this.greet = function() {
      return "Hello " + this.name;
    };
  }
}
```

### Issue 11: Override with side effect that alters parent's assumptions
**Description:** Child's override changes behavior in way parent wouldn't expect.
```javascript
class Counter {
  increment() {
    this.count++;
  }
  getCount() {
    return this.count;
  }
}
class DoublingCounter extends Counter {
  increment() {
    this.count += 2;
  }
}
```

### Issue 12: Shallow prototype chain usage for deep behavior change
**Description:** Only one override but it completely changes the class purpose.
```javascript
class Vehicle {
  move() {
    return "moving on land";
  }
}
class Boat extends Vehicle {
  move() {
    return "moving on water";
  }
}
```

### Issue 13: Calling super with unnecessary re-wrapping
**Description:** Call super then immediately unwrap/re-wrap the result.
```javascript
class Formatter {
  format(val) {
    return val.toString();
  }
}
class Wrapper extends Formatter {
  format(val) {
    const result = super.format(val);
    return String(result);
  }
}
```

### Issue 14: Composition would work better than override
**Description:** Class overrides every method of parent, negating inheritance value.
```javascript
class NetworkClient {
  send(data) { return "sent"; }
  receive() { return "received"; }
  connect() { return "connected"; }
  disconnect() { return "disconnected"; }
}
class MockClient extends NetworkClient {
  send(data) { return "mock sent"; }
  receive() { return "mock received"; }
  connect() { return "mock connected"; }
  disconnect() { return "mock disconnected"; }
}
```

### Issue 15: Override that calls super but changes argument types
**Description:** Convert arguments to different types before passing to super.
```javascript
class Calculator {
  add(a, b) {
    return a + b;
  }
}
class StringCalculator extends Calculator {
  add(a, b) {
    return super.add(String(a), String(b));
  }
}
```

### Issue 16: Overriding methods that are already final in intent
**Description:** Override a method that was designed to not be overridden.
```javascript
class Singleton {
  static getInstance() {
    if (!this._instance) this._instance = new this();
    return this._instance;
  }
}
class BrokenSingleton extends Singleton {
  static getInstance() {
    return new this();
  }
}
```

### Issue 17: Prototype chain with diamond problem
**Description:** Simulating diamond inheritance with prototype mixins.
```javascript
class A { method() { return "A"; } }
class B extends A { method() { return "B"; } }
class C extends A { method() { return "C"; } }
class D extends B { }
Object.assign(D.prototype, C.prototype);
```

### Issue 18: Override that accesses private fields incorrectly
**Description:** Child tries to access parent's private fields through methods.
```javascript
class Account {
  #balance = 0;
  getBalance() {
    return this.#balance;
  }
}
class SavingsAccount extends Account {
  getBalance() {
    return super.getBalance() + this.#balance;
  }
}
```

### Issue 19: Missing method override that should exist
**Description:** Child class doesn't override a method that should behave differently.
```javascript
class Animal {
  sound() {
    return "generic";
  }
}
class Duck extends Animal {
  swim() {
    return "swimming";
  }
}
```

### Issue 20: Override with misleading name
**Description:** Method name no longer matches what it does after override.
```javascript
class FileHandler {
  save(data) {
    return "saved to disk";
  }
}
class CloudHandler extends FileHandler {
  save(data) {
    return "uploaded to cloud";
  }
}
```

### Issue 21: Using extends when a simple function would suffice
**Description:** Extending a class just to add one static factory method.
```javascript
class DateHelper {
  static now() {
    return new Date();
  }
}
class CustomDate extends DateHelper {
  static today() {
    return this.now().toDateString();
  }
}
```

### Issue 22: Redundant override of method that already does what's needed
**Description:** Override that does exactly what parent does.
```javascript
class Config {
  getPort() {
    return process.env.PORT || 3000;
  }
}
class DevConfig extends Config {
  getPort() {
    return super.getPort();
  }
}
```

### Issue 23: Class hierarchy with inappropriate coupling
**Description:** Superclass knows about subclass details through overridden methods.
```javascript
class GameCharacter {
  attack() {
    return this.getDamage() + " damage";
  }
}
class Warrior extends GameCharacter {
  getDamage() {
    return 15;
  }
}
class Mage extends GameCharacter {
  getDamage() {
    return 10;
  }
}
```

### Issue 24: Override that violates parent's postconditions
**Description:** Child returns value that doesn't satisfy parent's contract.
```javascript
class Authenticator {
  authenticate(token) {
    if (token.length < 10) return null;
    return { user: "test" };
  }
}
class WeakAuthenticator extends Authenticator {
  authenticate(token) {
    return { user: "test" };
  }
}
```

### Issue 25: Prototype pollution from iterating
**Description:** Using for-in loop shows inherited prototype methods.
```javascript
class Data {
  constructor() {
    this.items = [];
  }
}
Data.prototype.method = function() {};
const d = new Data();
for (const key in d) {
  console.log(key);
}
```

### Issue 26: Override with extra validation that blocks valid parent calls
**Description:** Child adds validation that rejects inputs parent would accept.
```javascript
class Queue {
  enqueue(item) {
    this.items.push(item);
  }
}
class LimitedQueue extends Queue {
  enqueue(item) {
    if (this.items.length >= 10) return;
    super.enqueue(item);
  }
}
```

### Issue 27: Override that changes return type completely
**Description:** Parent returns object, child returns string.
```javascript
class Builder {
  build(config) {
    return { ...config };
  }
}
class StringBuilder extends Builder {
  build(config) {
    return JSON.stringify(config);
  }
}
```

### Issue 28: Unused super call in constructor
**Description:** Constructor calls super but parent constructor does nothing useful.
```javascript
class Base {
  constructor() {}
}
class Derived extends Base {
  constructor(name) {
    super();
    this.name = name;
  }
}
```

### Issue 29: Method override order dependency
**Description:** Behavior depends on whether overridden method is called from parent.
```javascript
class Document {
  print() {
    return this.getContent();
  }
  getContent() {
    return "document";
  }
}
class Report extends Document {
  getContent() {
    return "report data";
  }
}
```

### Issue 30: Override that uses super in a chain of three but skips middle
**Description:** Child calls super.method which goes directly to grandparent.
```javascript
class A {
  method() {
    return "A";
  }
}
class B extends A {
  method() {
    return "B";
  }
}
class C extends B {
  method() {
    return super.method();
  }
}
```

## Modify Snippets

### Modify 1: Add method override with super
**Description:** Shape has area(). Create Circle that overrides area() and does not need super.
```javascript
class Shape {
  area() {
    return 0;
  }
}
// Create Circle extending Shape that overrides area()
```

### Modify 2: Add method override calling super
**Description:** Employee has work(). Create Manager that overrides work() and calls super.
```javascript
class Employee {
  work() {
    return "Doing tasks";
  }
}
// Create Manager extending Employee
```

### Modify 3: Chain of three overrides
**Description:** Create A -> B -> C where each adds to the method result.
```javascript
class A {
  getMessage() {
    return "A";
  }
}
// Create B extends A, override getMessage to add "B"
// Create C extends B, override getMessage to add "C"
```

### Modify 4: Override with parameter transformation
**Description:** Formatter has format(text). Create BoldFormatter that wraps super result.
```javascript
class Formatter {
  format(text) {
    return text.trim();
  }
}
// Create BoldFormatter that calls super then adds bold tags
```

### Modify 5: Override getter with super
**Description:** Rectangle has area getter. Create Square that overrides area.
```javascript
class Rectangle {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }
  get area() {
    return this.w * this.h;
  }
}
// Create Square extending Rectangle with w === h
```

### Modify 6: Override setter with super
**Description:** Account has balance setter. Create VipAccount that adds logging.
```javascript
class Account {
  set balance(val) {
    this._balance = val;
  }
  get balance() {
    return this._balance;
  }
}
// Create VipAccount that logs on balance change using super
```

### Modify 7: Override static method with super
**Description:** Model has static find(). Create User that overrides it.
```javascript
class Model {
  static find(id) {
    return { id };
  }
}
// Create User extending Model that adds role to result
```

### Modify 8: Override toString with super
**Description:** Item has toString. Create Book that extends and adds author info.
```javascript
class Item {
  constructor(title) {
    this.title = title;
  }
  toString() {
    return this.title;
  }
}
// Create Book extending Item with author
```

### Modify 9: Override with conditional super call
**Description:** Handler has handle(request). Create AuthHandler that checks auth first.
```javascript
class Handler {
  handle(request) {
    return "Handled: " + request.path;
  }
}
// Create AuthHandler that checks auth, then calls super.handle
```

### Modify 10: Override multiple methods with super
**Description:** UIComponent has render and update. Create Button that overrides both.
```javascript
class UIComponent {
  render() {
    return "<div></div>";
  }
  update(props) {
    return "updated with " + JSON.stringify(props);
  }
}
// Create Button extending UIComponent
```

### Modify 11: Override Symbol.toPrimitive with super
**Description:** Amount has toPrimitive. Create TaxedAmount that extends.
```javascript
class Amount {
  constructor(val) {
    this.val = val;
  }
  [Symbol.toPrimitive](hint) {
    if (hint === "string") return "$" + this.val;
    return this.val;
  }
}
// Create TaxedAmount that adds tax
```

### Modify 12: Override iterator with super delegation
**Description:** List has iterator. Create FilteredList that filters during iteration.
```javascript
class List {
  constructor(items) {
    this.items = items;
  }
  *[Symbol.iterator]() {
    yield* this.items;
  }
}
// Create FilteredList that only yields even numbers
```

### Modify 13: Override with result aggregation
**Description:** Calculator has compute. Create Aggregator that sums parent results.
```javascript
class Calculator {
  compute(values) {
    return values.reduce((s, v) => s + v, 0);
  }
}
// Create Aggregator that also counts the number of calls
```

### Modify 14: Override method that returns promise
**Description:** DataLoader has load. Create CachedLoader that caches super results.
```javascript
class DataLoader {
  async load(url) {
    const res = await fetch(url);
    return res.json();
  }
}
// Create CachedLoader that checks cache before calling super
```

### Modify 15: Override with error handling wrapping super
**Description:** Service has call. Create SafeService that wraps super with try/catch.
```javascript
class Service {
  call(api) {
    return "result from " + api;
  }
}
// Create SafeService extending Service with error handling
```

### Modify 16: Override to add pre-processing
**Description:** Serializer has serialize. Create PreprocessingSerializer that sanitizes input.
```javascript
class Serializer {
  serialize(data) {
    return JSON.stringify(data);
  }
}
// Create PreprocessingSerializer that sanitizes data first
```

### Modify 17: Override to add post-processing
**Description:** Fetcher has fetch. Create PostProcessor that transforms super result.
```javascript
class Fetcher {
  async fetch(url) {
    const res = await fetch(url);
    return res.json();
  }
}
// Create PostProcessor that transforms the fetched data
```

### Modify 18: Override with super in chain for middleware pattern
**Description:** Create middleware chain where each layer calls super.
```javascript
class Middleware {
  process(req) {
    return req;
  }
}
// Create LoggerMiddleware, AuthMiddleware, CacheMiddleware chain
```

### Modify 19: Override to limit parent functionality
**Description:** Queue has enqueue. Create BoundedQueue that limits size.
```javascript
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item) {
    this.items.push(item);
  }
  dequeue() {
    return this.items.shift();
  }
}
// Create BoundedQueue that limits to 10 items
```

### Modify 20: Override with super for coalescing
**Description:** Config has get. Create CascadingConfig that checks multiple sources.
```javascript
class Config {
  get(key) {
    return this[key] || null;
  }
}
// Create CascadingConfig that checks env vars then super
```

### Modify 21: Override async generator with super
**Description:** Stream has async generator. Create TransformStream that transforms.
```javascript
class Stream {
  async *generate() {
    yield 1;
    yield 2;
    yield 3;
  }
}
// Create TransformStream that doubles values from super
```

### Modify 22: Override with super in class extending Map
**Description:** Create ConfigMap extending Map that overrides set/get with case-insensitive keys.
```javascript
// Create ConfigMap extending Map
```

### Modify 23: Override Symbol.hasInstance
**Description:** Create a class that overrides instanceof behavior.
```javascript
class Collection {}
// Extend Collection to also match arrays as instances
```

### Modify 24: Override with super in nested calls
**Description:** A calls B which calls C where each adds processing.
```javascript
class Step1 {
  process(data) {
    return data;
  }
}
// Create Step2 that adds timestamp
// Create Step3 that validates output
```

### Modify 25: Override to add debouncing
**Description:** SearchService has search. Create DebouncedSearch that debounces.
```javascript
class SearchService {
  async search(query) {
    const res = await fetch("/search?q=" + query);
    return res.json();
  }
}
// Create DebouncedSearch with 300ms debounce
```

### Modify 26: Override valueOf and toString with super
**Description:** Price has valueOf. Create DiscountedPrice that extends.
```javascript
class Price {
  constructor(amount) {
    this.amount = amount;
  }
  valueOf() {
    return this.amount;
  }
  toString() {
    return "$" + this.amount;
  }
}
// Create DiscountedPrice with discount percentage
```

### Modify 27: Override with super for fallback chain
**Description:** Cache has get. Create TieredCache that checks L1 then L2 then super.
```javascript
class Cache {
  constructor() {
    this.store = new Map();
  }
  get(key) {
    return this.store.get(key);
  }
  set(key, val) {
    this.store.set(key, val);
  }
}
// Create TieredCache with memory and persistent layers
```

### Modify 28: Override with super and method forwarding
**Description:** Router has route. Create PrefixRouter that adds prefix.
```javascript
class Router {
  route(path) {
    return "Routing: " + path;
  }
}
// Create PrefixRouter that adds /api prefix before super call
```

### Modify 29: Override to add metrics
**Description:** Database has query. Create MonitoredDB that tracks query time.
```javascript
class Database {
  async query(sql) {
    return "results";
  }
}
// Create MonitoredDB that times queries
```

### Modify 30: Override with super for retry logic
**Description:** API has call. Create RetryAPI that retries on failure.
```javascript
class API {
  async call(endpoint) {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error("fail");
    return res.json();
  }
}
// Create RetryAPI that retries up to 3 times
```

### Modify 31: Override to add rate limiting
**Description:** Fetcher has fetch. Create RateLimitedFetcher that limits calls.
```javascript
class Fetcher {
  async fetch(url) {
    return (await fetch(url)).json();
  }
}
// Create RateLimitedFetcher with max 5 calls per second
```

### Modify 32: Override with super for object pooling
**Description:** Connection has create. Create PooledConnection that reuses connections.
```javascript
class Connection {
  static create() {
    return new Connection();
  }
}
// Create PooledConnection with connection pool
```

### Modify 33: Override to add caching with TTL
**Description:** DataSource has get. Create TTLDataSource that caches with expiry.
```javascript
class DataSource {
  async get(key) {
    return "value for " + key;
  }
}
// Create TTLDataSource with 60 second cache
```

### Modify 34: Override with super for input validation
**Description:** Calculator has calculate. Create SafeCalculator that validates.
```javascript
class Calculator {
  calculate(a, b, op) {
    if (op === "+") return a + b;
    if (op === "-") return a - b;
  }
}
// Create SafeCalculator that validates inputs before super
```

### Modify 35: Override to add access control
**Description:** Resource has access. Create ProtectedResource with role check.
```javascript
class Resource {
  access(user) {
    return "accessed";
  }
}
// Create ProtectedResource that checks user role
```

### Modify 36: Override with super for data transformation pipeline
**Description:** Pipeline has process. Create DataPipeline with multiple stages.
```javascript
class Pipeline {
  process(data) {
    return data;
  }
}
// Create DataPipeline that chains: validate, transform, enrich
```

### Modify 37: Override to add subscription/observer pattern
**Description:** Store has update. Create ObservableStore that notifies listeners.
```javascript
class Store {
  update(data) {
    this.data = data;
  }
}
// Create ObservableStore with subscribers
```

### Modify 38: Override with super for batching
**Description:** Writer has write. Create BatchWriter that batches writes.
```javascript
class Writer {
  write(item) {
    return "wrote " + item;
  }
}
// Create BatchWriter that batches up to 10 items
```

### Modify 39: Override to add encryption
**Description:** Messenger has send. Create SecureMessenger that encrypts.
```javascript
class Messenger {
  send(msg) {
    return "sent: " + msg;
  }
}
// Create SecureMessenger that encrypts messages
```

### Modify 40: Override with super for fallback chain
**Description:** Renderer has render. Create FallbackRenderer with multiple backends.
```javascript
class Renderer {
  render(template) {
    return "rendered";
  }
}
// Create FallbackRenderer that tries multiple methods
```

### Modify 41: Override to add memoization
**Description:** Computer has compute. Create MemoizedComputer that caches results.
```javascript
class Computer {
  compute(n) {
    return n * 2;
  }
}
// Create MemoizedComputer that caches results by argument
```

### Modify 42: Override with super for audit trail
**Description:** Repository has save. Create AuditedRepository that logs changes.
```javascript
class Repository {
  save(entity) {
    return "saved";
  }
}
// Create AuditedRepository that records all changes
```

### Modify 43: Override to add schema validation
**Description:** Store has put. Create ValidatedStore that checks schema.
```javascript
class Store {
  put(key, value) {
    this.data[key] = value;
  }
}
// Create ValidatedStore that validates against schema
```

### Modify 44: Override with super for multi-tenancy
**Description:** Database has query. Create TenantDatabase that scopes queries.
```javascript
class Database {
  query(sql) {
    return "results";
  }
}
// Create TenantDatabase that adds tenant filter
```

### Modify 45: Override to add circuit breaker
**Description:** Client has call. Create CircuitBreakerClient that fails fast.
```javascript
class Client {
  async call(service) {
    return "response from " + service;
  }
}
// Create CircuitBreakerClient with circuit breaker pattern
```

### Modify 46: Override with super for content negotiation
**Description:** API has respond. Create NegotiatingAPI that handles formats.
```javascript
class API {
  respond(data) {
    return JSON.stringify(data);
  }
}
// Create NegotiatingAPI that supports JSON and XML
```

### Modify 47: Override to add pagination
**Description:** Finder has find. Create PaginatedFinder with cursor support.
```javascript
class Finder {
  find(query) {
    return [{ id: 1 }, { id: 2 }];
  }
}
// Create PaginatedFinder with page/cursor support
```

### Modify 48: Override with super for retry with backoff
**Description:** Client has request. Create RetryWithBackoff that implements exponential backoff.
```javascript
class Client {
  async request(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    return res.json();
  }
}
// Create RetryWithBackoff with exponential backoff
```

### Modify 49: Override to add event emission
**Description:** Service has execute. Create EventEmittingService that emits events.
```javascript
class Service {
  execute(task) {
    return "executed " + task;
  }
}
// Create EventEmittingService that emits before/after events
```

### Modify 50: Complete prototype chain analysis
**Description:** Build a full hierarchy and analyze the prototype chain.
```javascript
class GrandParent {
  familyName() {
    return "Smith";
  }
}
// Create Parent extending GrandParent
// Create Child extending Parent
// Add method at each level that shows the prototype chain
