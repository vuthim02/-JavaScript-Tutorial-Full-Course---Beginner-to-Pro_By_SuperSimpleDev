# Level 91 - extends and super keyword basics (Module 19: Inheritance)

## Error Snippets

### Error 1: Missing super() in constructor
**Description:** Create a Dog subclass that extends Animal. Call super with name parameter.
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}
class Dog extends Animal {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
}
const d = new Dog("Buddy", "Lab");
```

### Error 2: Wrong super() argument order
**Description:** Extend Employee from Person. Pass name and age to super.
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
class Employee extends Person {
  constructor(name, age, id) {
    super(age, name);
    this.id = id;
  }
}
const e = new Employee("Alice", 30, "E123");
```

### Error 3: Using this before super()
**Description:** Create a Car subclass that extends Vehicle. Initialize this.make before calling super.
```javascript
class Vehicle {
  constructor(type) {
    this.type = type;
  }
}
class Car extends Vehicle {
  constructor(type, make) {
    this.make = make;
    super(type);
  }
}
const c = new Car("sedan", "Toyota");
```

### Error 4: Missing extends keyword
**Description:** Make Student inherit from Person using extends.
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return "Hello";
  }
}
class Student Person {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }
}
const s = new Student("Bob", "A");
```

### Error 5: super() called twice
**Description:** Create a Manager subclass extending Employee. Call super only once.
```javascript
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
}
class Manager extends Employee {
  constructor(name, salary, dept) {
    super(name, salary);
    super(name, salary);
    this.dept = dept;
  }
}
const m = new Manager("Carol", 80000, "Sales");
```

### Error 6: Forgetting super in subclass constructor
**Description:** Extend Rectangle from Shape. Call super with width and height.
```javascript
class Shape {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }
}
class Rectangle extends Shape {
  constructor(w, h, color) {
    this.color = color;
  }
}
const r = new Rectangle(5, 10, "red");
```

### Error 7: super used in non-subclass method
**Description:** Create a standalone class Utils with a method that incorrectly uses super.
```javascript
class Utils {
  log(msg) {
    super.log(msg);
  }
}
const u = new Utils();
```

### Error 8: Extending from a non-class
**Description:** Create a class that extends from a string instead of a class.
```javascript
const Base = "base";
class Derived extends Base {
  constructor() {
    super();
  }
}
const d = new Derived();
```

### Error 9: super() in method context with wrong parent
**Description:** Override toString in a Book class and call super.toString() but the parent lacks it.
```javascript
class Item {
  constructor(title) {
    this.title = title;
  }
}
class Book extends Item {
  constructor(title, author) {
    super(title);
    this.author = author;
  }
  toString() {
    return super.toString() + " by " + this.author;
  }
}
const b = new Book("JS Guide", "Tim");
```

### Error 10: Calling super() outside constructor
**Description:** Try to call super() inside an arrow function within constructor.
```javascript
class Parent {
  constructor() {
    this.x = 10;
  }
}
class Child extends Parent {
  constructor() {
    const fn = () => super();
    fn();
  }
}
const c = new Child();
```

### Error 11: Missing super in derived class with no own constructor
**Description:** Let Dog extend Animal without defining constructor, but access this before super would be needed.
```javascript
class Animal {
  constructor(name) {
    this.name = name;
    this.sound = "generic";
  }
}
class Dog extends Animal {
  bark() {
    return this.sound;
  }
  constructor() {
    this.sound = "woof";
  }
}
const d = new Dog();
```

### Error 12: super used with dot notation incorrectly
**Description:** Attempt to access parent property using super.property but property is not static.
```javascript
class Base {
  constructor() {
    this.value = 42;
  }
}
class Derived extends Base {
  getValue() {
    return super.value;
  }
}
const d = new Derived();
```

### Error 13: super() after return statement
**Description:** Call super() after returning early in constructor.
```javascript
class A {
  constructor(x) {
    this.x = x;
  }
}
class B extends A {
  constructor(x, y) {
    return { x, y };
    super(x);
  }
}
const b = new B(1, 2);
```

### Error 14: Inconsistent super signature with parent
**Description:** Parent expects three arguments but child passes two.
```javascript
class Polygon {
  constructor(sides, length, color) {
    this.sides = sides;
    this.length = length;
    this.color = color;
  }
}
class Square extends Polygon {
  constructor(length) {
    super(length);
  }
}
const s = new Square(5);
```

### Error 15: Trying to extend undefined variable
**Description:** Extend from a variable that is not defined yet.
```javascript
class Child extends ParentClass {
  constructor() {
    super();
  }
}
const ParentClass = class {
  constructor() {
    this.type = "parent";
  }
};
const c = new Child();
```

### Error 16: Using super in a class that does not extend anything
**Description:** Create a standalone class calling super in constructor.
```javascript
class Solo {
  constructor() {
    super();
    this.name = "solo";
  }
}
const s = new Solo();
```

### Error 17: Forgetting new keyword with subclass
**Description:** Instantiate a subclass without the new keyword.
```javascript
class Car {
  constructor(make) {
    this.make = make;
  }
}
class Tesla extends Car {
  constructor(make, model) {
    super(make);
    this.model = model;
  }
}
const t = Tesla("Tesla", "Model 3");
```

### Error 18: super refers to wrong parent in chain
**Description:** Create a three-level chain where middle class forgets super.
```javascript
class GrandParent {
  constructor() {
    this.family = "grand";
  }
}
class Parent extends GrandParent {
  constructor() {
    this.family = "parent";
  }
}
class Child extends Parent {
  constructor() {
    super();
    this.family = "child";
  }
}
const c = new Child();
```

### Error 19: Passing undefined to super implicitly
**Description:** Call super without arguments when parent requires them.
```javascript
class Config {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }
}
class DevConfig extends Config {
  constructor() {
    super();
  }
}
const d = new DevConfig();
```

### Error 20: Using super in static method incorrectly
**Description:** Try to call non-static parent method via super in static context.
```javascript
class MathBase {
  add(a, b) {
    return a + b;
  }
}
class MathChild extends MathBase {
  static add(a, b) {
    return super.add(a, b) * 2;
  }
}
const m = new MathChild();
console.log(MathChild.add(2, 3));
```

### Error 21: Extending from a class expression inside a function
**Description:** Define a class extending a class expression that is scoped inside a function.
```javascript
function createClass() {
  return class Base {
    constructor(v) {
      this.v = v;
    }
  };
}
class Derived extends createClass() {
  constructor(v, w) {
    super(v);
    this.w = w;
  }
}
const d = new Derived(1, 2);
```

### Error 22: super in arrow function losing context
**Description:** Use super inside an arrow function stored in a property.
```javascript
class A {
  getX() {
    return 5;
  }
}
class B extends A {
  constructor() {
    super();
    this.getXArrow = () => super.getX();
  }
}
const b = new B();
const fn = b.getXArrow;
console.log(fn());
```

### Error 23: Constructor returns non-object after super
**Description:** Return a primitive from subclass constructor.
```javascript
class BaseClass {
  constructor(v) {
    this.v = v;
  }
}
class DerivedClass extends BaseClass {
  constructor(v, w) {
    super(v);
    this.w = w;
    return 42;
  }
}
const d = new DerivedClass(1, 2);
```

### Error 24: Double inheritance with circular dependency
**Description:** Create two classes that try to extend each other.
```javascript
class A extends B {
  constructor() {
    super();
  }
}
class B extends A {
  constructor() {
    super();
  }
}
const a = new A();
```

### Error 25: Missing parentheses on super call
**Description:** Write super without parentheses in constructor.
```javascript
class Parent {
  constructor(msg) {
    this.msg = msg;
  }
}
class Child extends Parent {
  constructor(msg) {
    super msg;
  }
}
const c = new Child("hello");
```

### Error 26: Calling super on wrong prototype
**Description:** Override a method and call super.method but it doesn't exist on parent prototype.
```javascript
class Animal {
  eat() {
    return "eating";
  }
}
class Dog extends Animal {
  sleep() {
    return super.sleep();
  }
}
const d = new Dog();
console.log(d.sleep());
```

### Error 27: super in getter without proper parent
**Description:** Define a getter that uses super but parent lacks the property.
```javascript
class Parent {
  constructor() {
    this._name = "parent";
  }
}
class Child extends Parent {
  get name() {
    return super.name;
  }
}
const c = new Child();
console.log(c.name);
```

### Error 28: Attempting to extend a primitive wrapper
**Description:** Extend from Number primitive value instead of Number class.
```javascript
const five = 5;
class MyNumber extends five {
  constructor() {
    super();
  }
}
const m = new MyNumber();
```

### Error 29: super before this in computed property
**Description:** Try to use this in a computed property name before super.
```javascript
class A {
  constructor() {
    this.id = 1;
  }
}
class B extends A {
  constructor() {
    this["prop" + this.id] = "value";
    super();
  }
}
const b = new B();
```

### Error 30: Extending from function without callable constructor
**Description:** Extend from a function that returns a non-object.
```javascript
function OldStyle() {
  return "not an object";
}
class NewStyle extends OldStyle {
  constructor() {
    super();
  }
}
const n = new NewStyle();
```

### Error 31: Incorrect super call with spread operator
**Description:** Pass arguments to super using spread in wrong order.
```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Point3D extends Point {
  constructor(z, ...coords) {
    super(...coords);
    this.z = z;
  }
}
const p = new Point3D(3, 1, 2);
```

### Error 32: super in class field initializer
**Description:** Use super() in a class field initializer, not constructor.
```javascript
class Base {
  constructor() {
    this.baseProp = "base";
  }
}
class Derived extends Base {
  field = super();
  constructor() {
    super();
  }
}
const d = new Derived();
```

### Error 33: Missing super call in chain with mixin pattern
**Description:** Create a mixin-style chain where one level omits super.
```javascript
class A {
  constructor() {
    this.a = 1;
  }
}
class B extends A {
  constructor() {
    this.b = 2;
  }
}
class C extends B {
  constructor() {
    super();
    this.c = 3;
  }
}
const c = new C();
```

### Error 34: super used with new.target incorrectly
**Description:** Access new.target after super call with wrong logic.
```javascript
class Parent {
  constructor() {
    if (new.target === Parent) {
      this.type = "parent";
    }
  }
}
class Child extends Parent {
  constructor() {
    super();
    if (new.target !== Child) {
      this.type = "not child";
    }
  }
}
const c = new Child();
```

### Error 35: Extending from a getter property
**Description:** Try to extend from a getter that returns a class.
```javascript
const container = {
  get BaseClass() {
    return class {
      constructor() {
        this.ok = true;
      }
    };
  }
};
class Derived extends container.BaseClass {
  constructor() {
    super();
  }
}
const d = new Derived();
```

### Error 36: super in object literal method
**Description:** Use super in a plain object method shorthand.
```javascript
const obj = {
  name: "test",
  greet() {
    return super.toString();
  }
};
console.log(obj.greet());
```

### Error 37: Constructor returning a different object after super
**Description:** Return a different object reference from subclass constructor.
```javascript
class A {
  constructor() {
    this.a = 1;
  }
}
class B extends A {
  constructor() {
    super();
    return { b: 2 };
  }
}
const b = new B();
```

### Error 38: Forgetting to use super when extending built-in Array
**Description:** Extend Array class without properly calling super.
```javascript
class MyArray extends Array {
  constructor(...args) {
    this.custom = true;
  }
}
const arr = new MyArray(1, 2, 3);
```

### Error 39: super in eval context
**Description:** Attempt to use super inside eval within a class method.
```javascript
class A {
  getVal() {
    return 10;
  }
}
class B extends A {
  runEval() {
    return eval("super.getVal()");
  }
}
const b = new B();
console.log(b.runEval());
```

### Error 40: Using super in nested class
**Description:** Define a nested class that tries to use super from outer class.
```javascript
class Outer {
  constructor() {
    this.value = "outer";
  }
  Inner = class extends Outer {
    constructor() {
      super();
      this.inner = "inner";
    }
  };
}
const o = new Outer();
const i = new o.Inner();
```

### Error 41: super in destructuring pattern
**Description:** Attempt to use super inside a destructuring expression.
```javascript
class A {
  constructor() {
    this.x = 10;
    this.y = 20;
  }
}
class B extends A {
  constructor() {
    super();
    const { x, y } = super;
  }
}
const b = new B();
```

### Error 42: Extending null without proper handling
**Description:** Try to extend null without a constructor.
```javascript
class NullClass extends null {
  constructor() {
    super();
  }
}
const n = new NullClass();
```

### Error 43: super in static initializer block
**Description:** Use super inside static initialization block.
```javascript
class A {
  static value = 5;
}
class B extends A {
  static {
    super.value = 10;
  }
}
console.log(B.value);
```

### Error 44: Invalid super access in template literal
**Description:** Use super inside a template literal tagged function.
```javascript
class A {
  tag(strings) {
    return strings[0];
  }
}
class B extends A {
  test() {
    return super.tag`hello`;
  }
}
const b = new B();
console.log(b.test());
```

### Error 45: Calling parent constructor with mismatched type
**Description:** Pass a string to super where number is expected without conversion.
```javascript
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
}
class Weather extends Temperature {
  constructor(celsius) {
    super(celsius + " degrees");
  }
}
const w = new Weather(25);
```

### Error 46: Using super() in async constructor context
**Description:** Try to make a constructor async and use super.
```javascript
class A {
  constructor(v) {
    this.v = v;
  }
}
class B extends A {
  async constructor(v) {
    super(v);
    this.loaded = await Promise.resolve(true);
  }
}
const b = new B(5);
```

### Error 47: super in generator method
**Description:** Use super inside a generator method.
```javascript
class A {
  *values() {
    yield 1;
    yield 2;
  }
}
class B extends A {
  *values() {
    yield* super.values();
    yield 3;
  }
}
const b = new B();
console.log([...b.values()]);
```

### Error 48: Missing super in subclass that has own constructor with default params
**Description:** Constructor uses default parameters but omits super call.
```javascript
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}
class Derived extends Base {
  constructor(a = 1, b = 2) {
    this.a = a;
    this.b = b;
  }
}
const d = new Derived();
```

### Error 49: Using super to access constructor property
**Description:** Try to access this.constructor via super incorrectly.
```javascript
class A {
  constructor() {
    this.type = "A";
  }
}
class B extends A {
  getType() {
    return super.constructor.type;
  }
}
const b = new B();
console.log(b.getType());
```

### Error 50: super call with array destructuring
**Description:** Pass destructured array to super incorrectly.
```javascript
class A {
  constructor(...args) {
    this.args = args;
  }
}
class B extends A {
  constructor() {
    const arr = [1, 2, 3];
    super([...arr]);
  }
}
const b = new B();
```

### Error 51: Extending a class after it was reassigned
**Description:** Extend a class variable that gets reassigned before instantiation.
```javascript
class A {
  constructor() {
    this.name = "A";
  }
}
class B extends A {
  constructor() {
    super();
  }
}
A = class {
  constructor() {
    this.name = "NewA";
  }
};
const b = new B();
```

### Error 52: super in default parameter expression
**Description:** Use super() as a default parameter value.
```javascript
class A {
  constructor() {
    this.x = 5;
  }
}
class B extends A {
  constructor(y = super()) {
    this.y = y;
  }
}
const b = new B();
```

### Error 53: Calling super() inside a setter
**Description:** Use super() inside a setter method of a subclass.
```javascript
class A {
  constructor() {
    this._val = 0;
  }
}
class B extends A {
  set value(v) {
    super();
    this._val = v;
  }
}
const b = new B();
b.value = 5;
```

### Error 54: Using super with computed property name
**Description:** Try to access super[computedKey] where key doesn't exist on parent.
```javascript
class A {
  constructor() {
    this.items = [];
  }
}
class B extends A {
  getItem(idx) {
    return super["items"][idx];
  }
}
const b = new B();
console.log(b.getItem(0));
```

### Error 55: Extending from a class defined inside a conditional
**Description:** Try to extend a class that is conditionally defined.
```javascript
if (true) {
  class ConditionalBase {
    constructor() {
      this.ok = true;
    }
  }
}
class Derived extends ConditionalBase {
  constructor() {
    super();
  }
}
const d = new Derived();
```

### Error 56: super in class with Symbol species
**Description:** Override Symbol.species but fail to use super correctly.
```javascript
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
  constructor(...args) {
    super(...args);
  }
  first() {
    return this[0];
  }
}
const ma = new MyArray(1, 2, 3);
const mapped = ma.map(x => x * 2);
```

### Error 57: Calling super() in a class with no parent
**Description:** Add super() call in a class that does not use extends.
```javascript
class Standalone {
  constructor() {
    super();
    this.name = "standalone";
  }
}
const s = new Standalone();
```

### Error 58: super inside private field initializer
**Description:** Use super() inside a private field declaration.
```javascript
class A {
  constructor() {
    this.x = 1;
  }
}
class B extends A {
  #priv = super();
  constructor() {
    super();
  }
}
const b = new B();
```

### Error 59: Using super in a class that extends a Proxy
**Description:** Extend from a Proxy wrapping a class.
```javascript
class Target {
  constructor() {
    this.value = "target";
  }
}
const Proxied = new Proxy(Target, {});
class Derived extends Proxied {
  constructor() {
    super();
  }
}
const d = new Derived();
```

### Error 60: Forgetting super in derived class with no explicit constructor
**Description:** Subclass has a field initializer that depends on this, which requires super first.
```javascript
class Base {
  constructor() {
    this.loaded = false;
  }
  init() {
    this.loaded = true;
  }
}
class Derived extends Base {
  state = this.loaded;
}
const d = new Derived();
```

### Error 61: super in dynamic import handler
**Description:** Use super inside a dynamic import .then handler.
```javascript
class A {
  getMsg() {
    return "from A";
  }
}
class B extends A {
  load() {
    import("./some.js").then(() => super.getMsg());
  }
}
const b = new B();
```

### Error 62: Calling super with more arguments than parent expects
**Description:** Pass extra arguments to super that parent doesn't use but causes issue.
```javascript
class A {
  constructor(x) {
    this.x = x;
  }
}
class B extends A {
  constructor(x, y, z) {
    super(x, y, z);
  }
}
const b = new B(1, 2, 3);
```

### Error 63: Using super() in a class expression assigned to variable
**Description:** Create anonymous class expression extending another and call super incorrectly.
```javascript
const Base = class {
  constructor(v) {
    this.v = v;
  }
};
const Derived = class extends Base {
  constructor(v) {
    super();
    this.v = v;
  }
};
const d = new Derived(42);
```

### Error 64: Method override that calls super but changes signature
**Description:** Override a method and call super with different arguments than received.
```javascript
class Printer {
  print(text) {
    return text.toUpperCase();
  }
}
class LoudPrinter extends Printer {
  print(text, times) {
    return super.print(text).repeat(times);
  }
}
const lp = new LoudPrinter();
console.log(lp.print("hello", 3));
```

### Error 65: Constructor accidentally returns super() result
**Description:** Return super() from constructor explicitly.
```javascript
class A {
  constructor(v) {
    this.v = v;
  }
}
class B extends A {
  constructor(v) {
    return super(v);
  }
}
const b = new B(5);
```

### Error 66: super in abstract method pattern
**Description:** Try to use super to call an unimplemented method.
```javascript
class AbstractBase {
  mustImplement() {
    throw new Error("implement me");
  }
}
class Concrete extends AbstractBase {
  doWork() {
    super.mustImplement();
  }
}
const c = new Concrete();
c.doWork();
```

### Error 67: Inline super call with ternary
**Description:** Use super inside a ternary expression.
```javascript
class A {
  constructor(x) {
    this.x = x;
  }
}
class B extends A {
  constructor(x) {
    super(x ? x : 0);
  }
}
const b = new B();
```

### Error 68: Calling parent method with wrong this context
**Description:** Extract parent method and call it with wrong context.
```javascript
class A {
  show() {
    return this.name;
  }
}
class B extends A {
  constructor() {
    super();
    this.name = "B";
  }
  show() {
    const parentShow = super.show;
    return parentShow();
  }
}
const b = new B();
console.log(b.show());
```

### Error 69: Using super in a Proxy handler
**Description:** Define a Proxy handler that tries to use super.
```javascript
class A {
  getVal() {
    return 42;
  }
}
class B extends A {
  constructor() {
    super();
    return new Proxy(this, {
      get(target, prop) {
        return super.getVal();
      }
    });
  }
}
const b = new B();
```

### Error 70: Extending a frozen class
**Description:** Try to extend a class that has been Object.frozen.
```javascript
class Freezable {
  constructor() {
    this.x = 1;
  }
}
Object.freeze(Freezable);
class Thawed extends Freezable {
  constructor() {
    super();
  }
}
const t = new Thawed();
```

## Issue Snippets

### Issue 1: Redundant super call with no parent constructor logic
**Description:** Subclass constructor does nothing but call super with same args.
```javascript
 class Base {
  constructor(name) {
    this.name = name;
  }
}
class Derived extends Base {
  constructor(name) {
    super(name);
  }
}
```

### Issue 2: Unused constructor parameter in subclass
**Description:** Subclass constructor has unused parameter.
```javascript
class Shape {
  constructor(type) {
    this.type = type;
  }
}
class Circle extends Shape {
  constructor(type, radius) {
    super(type);
  }
}
```

### Issue 3: Empty subclass with no additional functionality
**Description:** Subclass adds nothing to parent.
```javascript
class Animal {
  speak() {
    return "sound";
  }
}
class Dog extends Animal {
}
```

### Issue 4: Overusing inheritance for utility class
**Description:** Subclass only needs one method but inherits many unused ones.
```javascript
class Database {
  connect() {}
  query() {}
  disconnect() {}
  backup() {}
  restore() {}
}
class UserDB extends Database {
  findUsers() {
    this.query("SELECT * FROM users");
  }
}
```

### Issue 5: Calling parent method unnecessarily
**Description:** Override calls super then overrides the result anyway.
```javascript
class Config {
  getSettings() {
    return { theme: "dark" };
  }
}
class AppConfig extends Config {
  getSettings() {
    const settings = super.getSettings();
    return { theme: "light" };
  }
}
```

### Issue 6: super() in subclass with no parent constructor parameters
**Description:** Parent constructor takes no params but child still calls super() with args.
```javascript
class Base {
  constructor() {
    this.initialized = true;
  }
}
class Derived extends Base {
  constructor(name) {
    super(name);
    this.name = name;
  }
}
```

### Issue 7: Mixing extends with object composition poorly
**Description:** Class inherits from parent but also duplicates parent logic.
```javascript
class Engine {
  start() {
    return "vroom";
  }
}
class Car extends Engine {
  start() {
    return super.start();
  }
  drive() {
    return "driving";
  }
}
```

### Issue 8: Deep inheritance chain without clear purpose
**Description:** Four-level inheritance with minimal additions at each level.
```javascript
class A { constructor() { this.a = 1; } }
class B extends A { constructor() { super(); this.b = 2; } }
class C extends B { constructor() { super(); this.c = 3; } }
class D extends C { constructor() { super(); this.d = 4; } }
```

### Issue 9: Not leveraging super for code reuse
**Description:** Override method duplicates code from parent instead of calling super.
```javascript
class Logger {
  log(msg) {
    console.log(new Date().toISOString() + ": " + msg);
  }
}
class ErrorLogger extends Logger {
  log(msg) {
    console.log(new Date().toISOString() + ": ERROR: " + msg);
  }
}
```

### Issue 10: Constructor parameter name conflict with parent
**Description:** Subclass constructor shadowing parent's parameter name but using differently.
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}
class Employee extends Person {
  constructor(name, name) {
    super(name);
    this.employeeName = name;
  }
}
```

### Issue 11: Extending concrete class instead of using interface
**Description:** Class extends a concrete implementation when it only needs the interface.
```javascript
class FileSystem {
  readFile(path) { return "content"; }
  writeFile(path, data) {}
  deleteFile(path) {}
  listFiles() { return []; }
}
class CachedFileReader extends FileSystem {
  readFile(path) {
    return "cached content";
  }
}
```

### Issue 12: Not using super for property initialization
**Description:** Subclass manually sets properties that parent constructor already sets.
```javascript
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}
class Book extends Product {
  constructor(name, price, author) {
    super(name, price);
    this.name = name;
    this.price = price;
    this.author = author;
  }
}
```

### Issue 13: Using class inheritance for singletons
**Description:** Extending a singleton class defeats the singleton pattern.
```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
  }
}
class SubSingleton extends Singleton {
  constructor() {
    super();
  }
}
const a = new Singleton();
const b = new SubSingleton();
```

### Issue 14: Overriding non-virtual method pattern
**Description:** Override a method that shouldn't be overridden but JS allows it.
```javascript
class Calculator {
  add(a, b) {
    return a + b;
  }
}
class BrokenCalculator extends Calculator {
  add(a, b) {
    return a * b;
  }
}
```

### Issue 15: Inheritance used where composition would be cleaner
**Description:** A Car class extends Engine instead of composing it.
```javascript
class Engine {
  start() {
    return "engine started";
  }
}
class Car extends Engine {
  drive() {
    return this.start() + " and moving";
  }
}
```

### Issue 16: Deep class hierarchy for configuration
**Description:** Configuration classes with deep inheritance for simple property differences.
```javascript
class BaseConfig {
  constructor() {
    this.host = "localhost";
    this.port = 8080;
  }
}
class DevConfig extends BaseConfig {
  constructor() {
    super();
    this.debug = true;
  }
}
class StagingConfig extends DevConfig {
  constructor() {
    super();
    this.host = "staging.example.com";
  }
}
class ProdConfig extends StagingConfig {
  constructor() {
    super();
    this.host = "example.com";
    this.debug = false;
  }
}
```

### Issue 17: Using extends for just one shared static method
**Description:** Subclass exists only to access one static method of parent.
```javascript
class Utilities {
  static formatDate(d) {
    return d.toISOString();
  }
  static formatCurrency(n) {
    return "$" + n;
  }
}
class OrderHelper extends Utilities {
  static process(order) {
    return this.formatDate(order.date);
  }
}
```

### Issue 18: Constructor does nothing besides super
**Description:** Subclass constructor is empty apart from super.
```javascript
class BaseShape {
  constructor(name) {
    this.name = name;
  }
}
class Square extends BaseShape {
  constructor(name) {
    super(name);
  }
}
```

### Issue 19: Using extends for classes with no relationship
**Description:** A User class extends a Database class - no logical relationship.
```javascript
class Database {
  query(sql) { return []; }
}
class User extends Database {
  login(username, password) {
    return this.query("SELECT * FROM users");
  }
}
```

### Issue 20: Parent constructor has side effects
**Description:** Calling super triggers unwanted side effects in child.
```javascript
class Analytics {
  constructor() {
    this.track("instance created");
  }
  track(event) {
    console.log(event);
  }
}
class UserAnalytics extends Analytics {
  constructor(name) {
    super();
    this.name = name;
  }
}
```

### Issue 21: Missing method override that should exist
**Description:** Subclass forgets to override a method that needs different behavior.
```javascript
class Animal {
  sound() {
    return "generic";
  }
}
class Cat extends Animal {
  purr() {
    return "purr";
  }
}
```

### Issue 22: Over-engineering with abstract base class
**Description:** Base class has only one subclass, making abstraction unnecessary.
```javascript
class PaymentGateway {
  process(amount) {
    throw new Error("abstract");
  }
  refund(transactionId) {
    throw new Error("abstract");
  }
}
class StripeGateway extends PaymentGateway {
  process(amount) { return "processed"; }
  refund(id) { return "refunded"; }
}
```

### Issue 23: Using extends to access private-like members
**Description:** Subclass accesses parent properties that should be encapsulated.
```javascript
class BankAccount {
  constructor() {
    this._balance = 0;
  }
}
class SavingsAccount extends BankAccount {
  getBalance() {
    return this._balance;
  }
}
```

### Issue 24: Constructor calling super with mutation
**Description:** Modifying arguments before passing to super creates confusion.
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}
class Employee extends Person {
  constructor(name, id) {
    name = name.toUpperCase();
    super(name);
    this.id = id;
  }
}
```

### Issue 25: Unnecessary inheritance for code organization
**Description:** Using inheritance purely for namespacing methods.
```javascript
class StringUtils {
  static capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
}
class NameFormatter extends StringUtils {
  static format(name) {
    return this.capitalize(name);
  }
}
```

### Issue 26: Subclass with contradictory behavior
**Description:** Override makes child violate parent's contract.
```javascript
class Container {
  add(item) {
    this.items.push(item);
  }
}
class ReadOnlyContainer extends Container {
  add(item) {
    throw new Error("cannot add");
  }
}
```

### Issue 27: Calling super in getter that has no parent getter
**Description:** Getter calls super.prop where prop is a regular method on parent.
```javascript
class Father {
  getAge() {
    return 50;
  }
}
class Son extends Father {
  get age() {
    return super.age;
  }
}
```

### Issue 28: Using super for property access instead of method
**Description:** Confusing super.property with super.method().
```javascript
class Config {
  constructor() {
    this.timeout = 5000;
  }
}
class SpecificConfig extends Config {
  getTimeout() {
    return super.timeout || 3000;
  }
}
```

### Issue 29: extends used with non-class function incorrectly
**Description:** Incorrectly using extends with a constructor function pattern.
```javascript
function Vehicle(type) {
  this.type = type;
}
Vehicle.prototype.drive = function() {
  return "driving";
};
class Car extends Vehicle {
  constructor(type, make) {
    super(type);
    this.make = make;
  }
}
```

### Issue 30: Overriding constructor completely but still calling super
**Description:** Subclass constructor overrides all parent initialization but still calls super.
```javascript
class Animal {
  constructor(name) {
    this.name = name;
    this.alive = true;
  }
}
class Robot extends Animal {
  constructor(name) {
    super(name);
    this.alive = false;
    this.battery = 100;
  }
}
```

## Modify Snippets

### Modify 1: Add subclass with super call
**Description:** Animal class exists. Create a Bird subclass that calls super with name and adds canFly property.
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + " makes a sound";
  }
}
// Create Bird subclass here
```

### Modify 2: Add constructor with super
**Description:** Vehicle class exists. Create a Truck subclass that calls super(type) and adds loadCapacity.
```javascript
class Vehicle {
  constructor(type) {
    this.type = type;
  }
  getInfo() {
    return "Type: " + this.type;
  }
}
// Create Truck subclass here
```

### Modify 3: Override method and use super
**Description:** Employee class has work(). Create a Developer subclass that overrides work() and calls super.
```javascript
class Employee {
  work() {
    return "Working on tasks";
  }
}
// Create Developer subclass that overrides work()
```

### Modify 4: Three-level inheritance
**Description:** Create Animal -> Mammal -> Dog three-level chain with super at each level.
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}
// Create Mammal extending Animal
// Create Dog extending Mammal
```

### Modify 5: Add static method with super
**Description:** BaseModel has static find(). Create UserModel that extends it and overrides find with super call.
```javascript
class BaseModel {
  static find(id) {
    return "Finding record " + id;
  }
}
// Create UserModel extending BaseModel
```

### Modify 6: Extend built-in Array
**Description:** Create a CustomArray that extends Array and adds a first() method.
```javascript
// Create CustomArray extending Array with first() and last() methods
```

### Modify 7: Add getter with super
**Description:** Rectangle has area getter. Create Square that extends it and overrides area.
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
// Create Square extending Rectangle
```

### Modify 8: Add method with super in chain
**Description:** BaseLogger has log(). Create FileLogger extending it with timestamp, then ConsoleLogger extending FileLogger.
```javascript
class BaseLogger {
  log(msg) {
    return msg;
  }
}
// Create FileLogger that adds timestamp
// Create ConsoleLogger that formats output
```

### Modify 9: Constructor with validation and super
**Description:** Product has constructor validation. Create DigitalProduct extending it.
```javascript
class Product {
  constructor(name, price) {
    if (!name) throw new Error("name required");
    this.name = name;
    this.price = price;
  }
}
// Create DigitalProduct extending Product with downloadLink
```

### Modify 10: Use super in setter
**Description:** Account has balance setter with validation. Create SavingsAccount that adds interest rate.
```javascript
class Account {
  set balance(val) {
    if (val < 0) throw new Error("negative balance");
    this._balance = val;
  }
  get balance() {
    return this._balance;
  }
}
// Create SavingsAccount extending Account with interestRate
```

### Modify 11: Override toString with super
**Description:** Person has toString(). Create Student that extends and uses super.toString.
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  toString() {
    return this.name;
  }
}
// Create Student extending Person that adds grade to toString
```

### Modify 12: Add mixin-like super pattern
**Description:** Create a class hierarchy where a method calls super multiple levels.
```javascript
class A {
  getValue() {
    return "A";
  }
}
// Create B extends A, override getValue to add "B"
// Create C extends B, override getValue to add "C"
```

### Modify 13: Extend Error class
**Description:** Create a custom AppError that extends Error with statusCode.
```javascript
// Create AppError extending Error with statusCode property
```

### Modify 14: Add factory static method with super
**Description:** Shape has static create(). Create Circle that extends and uses super.create.
```javascript
class Shape {
  static create(type) {
    return new Shape(type);
  }
  constructor(type) {
    this.type = type;
  }
}
// Create Circle extending Shape with radius
```

### Modify 15: Use super for optional parent call
**Description:** UIComponent has render(). Create Button that conditionally calls super.render.
```javascript
class UIComponent {
  render() {
    return "<div></div>";
  }
}
// Create Button extending UIComponent
```

### Modify 16: Constructor with object destructuring and super
**Description:** Config accepts object. Create DatabaseConfig that extends and adds options.
```javascript
class Config {
  constructor({ host, port } = {}) {
    this.host = host || "localhost";
    this.port = port || 5432;
  }
}
// Create DatabaseConfig extending Config with database name
```

### Modify 17: Add computed property with super
**Description:** Order has total. Create DiscountedOrder that overrides total using super.
```javascript
class Order {
  constructor(items) {
    this.items = items;
  }
  get total() {
    return this.items.reduce((s, i) => s + i.price, 0);
  }
}
// Create DiscountedOrder that applies discount to total
```

### Modify 18: Override Symbol.iterator with super usage
**Description:** Collection has iterator. Create FilteredCollection that wraps super iteration.
```javascript
class Collection {
  constructor(items) {
    this.items = items;
  }
  *[Symbol.iterator]() {
    yield* this.items;
  }
}
// Create FilteredCollection that filters while iterating
```

### Modify 19: Add async method with super
**Description:** DataService has fetch(). Create CachedService that extends and caches super.fetch results.
```javascript
class DataService {
  async fetch(url) {
    const res = await fetch(url);
    return res.json();
  }
}
// Create CachedService extending DataService
```

### Modify 20: Add method with super to handle missing parent
**Description:** Base has optional method. Create Derived that checks and calls super only if method exists.
```javascript
class Base {
  optional() {
    return "base optional";
  }
}
// Create Derived that calls super.optional() if it exists
```

### Modify 21: Extend Map with custom methods
**Description:** Create an EnhancedMap that extends Map with toObject and fromObject.
```javascript
// Create EnhancedMap extending Map with toObject() and static fromObject()
```

### Modify 22: Add method chaining with super
**Description:** QueryBuilder has methods returning this. Create ExtendedQueryBuilder that adds more.
```javascript
class QueryBuilder {
  select(...fields) {
    this._fields = fields;
    return this;
  }
  from(table) {
    this._table = table;
    return this;
  }
}
// Create ExtendedQueryBuilder with where() and order() methods
```

### Modify 23: Constructor defaults with super
**Description:** Animal has defaults. Create Pet that extends with more defaults.
```javascript
class Animal {
  constructor(name = "unknown", age = 0) {
    this.name = name;
    this.age = age;
  }
}
// Create Pet extending Animal with owner and species defaults
```

### Modify 24: Add private field with super
**Description:** BankAccount has private #balance. Create SavingsAccount that extends and uses it.
```javascript
class BankAccount {
  #balance = 0;
  deposit(amount) {
    this.#balance += amount;
  }
  getBalance() {
    return this.#balance;
  }
}
// Create SavingsAccount extending BankAccount with interest
```

### Modify 25: Override static factory with super
**Description:** Model has static create. Create Admin extending User with factory override.
```javascript
class User {
  static create(data) {
    return new User(data);
  }
  constructor(data) {
    this.name = data.name;
  }
}
// Create Admin extending User with static create override
```

### Modify 26: Add super in generator delegation
**Description:** Tree has DFS iterator. Create BinarySearchTree that uses super's iteration.
```javascript
class Tree {
  *nodes() {
    yield "root";
  }
}
// Create BinarySearchTree extending Tree with ordered traversal
```

### Modify 27: Conditional super call with arguments
**Description:** Event class constructor takes options. Create ClickEvent that filters options to super.
```javascript
class Event {
  constructor({ type, timestamp, ...rest }) {
    this.type = type;
    this.timestamp = timestamp || Date.now();
    this.data = rest;
  }
}
// Create ClickEvent extending Event with x, y coordinates
```

### Modify 28: Override valueOf with super
**Description:** Money has valueOf. Create TaxedMoney that adds tax via super.
```javascript
class Money {
  constructor(amount) {
    this.amount = amount;
  }
  valueOf() {
    return this.amount;
  }
}
// Create TaxedMoney extending Money with tax rate
```

### Modify 29: Add method that wraps super return
**Description:** Serializer has toJSON. Create DateSerializer that wraps super result.
```javascript
class Serializer {
  toJSON(obj) {
    return JSON.stringify(obj);
  }
}
// Create DateSerializer that handles Date objects specially
```

### Modify 30: Extend Set with union/intersect
**Description:** Create a MathSet that extends Set with union, intersect, difference methods.
```javascript
// Create MathSet extending Set with union, intersect, difference
```

### Modify 31: Constructor super with spread from parent
**Description:** Base takes rest params. Create Derived that passes args via spread.
```javascript
class Base {
  constructor(...args) {
    this.args = args;
  }
}
// Create Derived that prepends an argument before passing to super
```

### Modify 32: Add async generator with super
**Description:** DataStream has async iterator. Create FilteredStream that uses super.
```javascript
class DataStream {
  async *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
  }
}
// Create FilteredStream extending DataStream
```

### Modify 33: Implement Template Method pattern with super
**Description:** Game has template method play(). Create Chess that implements steps.
```javascript
class Game {
  play() {
    this.initialize();
    this.takeTurn();
    this.endGame();
  }
  initialize() {}
  takeTurn() {}
  endGame() {}
}
// Create Chess extending Game with super calls in overrides
```

### Modify 34: Override toPrimitive with super
**Description:** Dimension has [Symbol.toPrimitive]. Create EnhancedDimension that extends.
```javascript
class Dimension {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }
  [Symbol.toPrimitive](hint) {
    if (hint === "string") return this.w + "x" + this.h;
    return this.w * this.h;
  }
}
// Create EnhancedDimension adding depth
```

### Modify 35: Add decorator-like method with super
**Description:** Service has execute. Create LoggedService that logs before/after super.execute.
```javascript
class Service {
  execute(input) {
    return "processed: " + input;
  }
}
// Create LoggedService that adds logging around execute
```

### Modify 36: Extend WeakMap for caching
**Description:** Create a Cache extending WeakMap with ttl support.
```javascript
// Create Cache extending WeakMap with set and get ttl support
```

### Modify 37: Super in multiple inheritance via prototype chain
**Description:** Create mixin-like pattern using Object.assign with super calls.
```javascript
const CanFly = {
  fly() {
    return "flying";
  }
};
class Bird {
  chirp() {
    return "chirp";
  }
}
// Create FlyingBird that mixes CanFly into Bird's prototype
```

### Modify 38: Validate arguments before super
**Description:** User requires valid email. Create AdminUser that validates before super.
```javascript
class User {
  constructor(email) {
    this.email = email;
  }
}
// Create AdminUser that validates email format before super
```

### Modify 39: Super in chain with bound methods
**Description:** Component has handleClick. Create Button that calls super with bound context.
```javascript
class Component {
  handleClick(event) {
    return "clicked at " + event.clientX;
  }
}
// Create Button that wraps super.handleClick with additional logic
```

### Modify 40: Create logger hierarchy with super
**Description:** AbstractLogger has log level methods. Create concrete loggers.
```javascript
class AbstractLogger {
  log(level, msg) {
    return "[" + level + "] " + msg;
  }
}
// Create InfoLogger and ErrorLogger extending AbstractLogger
```

### Modify 41: Super in method that returns promise
**Description:** AuthService has authenticate. Create OAuthService that extends.
```javascript
class AuthService {
  authenticate(credentials) {
    return Promise.resolve(credentials.user);
  }
}
// Create OAuthService extending AuthService with token flow
```

### Modify 42: Override class field with getter using super
**Description:** Config has default timeout. Create ExtendedConfig with getter.
```javascript
class Config {
  timeout = 5000;
}
// Create ExtendedConfig that overrides timeout with conditional logic
```

### Modify 43: Add instance counter via super chain
**Description:** Track instance count across class hierarchy.
```javascript
class Base {
  static count = 0;
  constructor() {
    Base.count++;
  }
}
// Create Derived that also increments its own counter
```

### Modify 44: Super in multiple inheritance with this
**Description:** Create a class that inherits from a mixin-built class.
```javascript
function mixin(Base) {
  return class extends Base {
    mixinMethod() {
      return "from mixin";
    }
  };
}
class Core {
  coreMethod() {
    return "core";
  }
}
// Create FinalClass using mixin on Core
```

### Modify 45: Add super to existing override
**Description:** Given class with overridden method, add super call.
```javascript
class Base {
  format(data) {
    return data.toString();
  }
}
class Derived extends Base {
  format(data) {
    return data.toUpperCase();
  }
}
// Modify Derived.format to call super.format then transform
```

### Modify 46: Create chain with Symbol.species
**Description:** Custom array subclass that controls return type of map/filter.
```javascript
// Create TypedArray extending Array with Symbol.species override
```

### Modify 47: Add error boundary with super
**Description:** Service has call(). Create SafeService that wraps super.call with try/catch.
```javascript
class Service {
  call(api) {
    if (api === "fail") throw new Error("fail");
    return "success";
  }
}
// Create SafeService extending Service with error handling
```

### Modify 48: Super in proxy-like wrapper pattern
**Description:** Create a wrapper class that delegates to parent with interception.
```javascript
class Repository {
  get(id) {
    return { id, name: "item" };
  }
}
// Create CachedRepository extending Repository with cache layer
```

### Modify 49: Override instanceOf check with super
**Description:** Create a class that customizes instanceof via Symbol.hasInstance.
```javascript
class BaseCollection {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}
// Create ExtendedCollection that also matches Set instances
```

### Modify 50: Complete inheritance chain with validation
**Description:** Build a full class hierarchy for a library system.
```javascript
class LibraryItem {
  constructor(title, year) {
    this.title = title;
    this.year = year;
  }
}
// Create Book, Magazine, and DVD extending LibraryItem
// Each with unique properties and method overrides using super
```
