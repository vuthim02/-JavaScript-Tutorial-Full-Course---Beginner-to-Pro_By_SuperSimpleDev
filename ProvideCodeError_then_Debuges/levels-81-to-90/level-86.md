# Level 86: Module 18 – OOP Basics – Classes, Constructors, Methods

## Error Snippets (70)

### Error 1: Missing new keyword when calling constructor
**Description:** Calling a class constructor without new returns undefined
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}
const alice = Person('Alice');
console.log(alice.name);
```
### Error 2: Class declaration without constructor
**Description:** Class has no constructor but tries to initialize properties
```javascript
class User {
  name = 'Alice';
}
const u = new User();
console.log(u.name);
```
### Error 3: Method definition with function keyword
**Description:** Class methods should not use function keyword
```javascript
class Calculator {
  function add(a, b) {
    return a + b;
  }
}
```
### Error 4: Missing comma between class methods
**Description:** Methods in a class body don't need commas (unlike object literals)
```javascript
class Formatter {
  toUpper(str) { return str.toUpperCase(); }
  toLower(str) { return str.toLowerCase(); }
}
```
### Error 5: Constructor with return value
**Description:** Constructor should not explicitly return a value
```javascript
class Config {
  constructor() {
    return { debug: true };
  }
}
const c = new Config();
console.log(c.debug);
```
### Error 6: Using let or const inside class body
**Description:** Class body only supports methods, not variable declarations
```javascript
class Logger {
  let prefix = '[LOG]';
  log(msg) { console.log(prefix + msg); }
}
```
### Error 7: Calling instance method without instance
**Description:** Static context missing when calling method on class
```javascript
class MathUtils {
  add(a, b) { return a + b; }
}
const result = MathUtils.add(2, 3);
console.log(result);
```
### Error 8: Forgetting this in method
**Description:** Instance property accessed without this
```javascript
class Counter {
  constructor() { this.count = 0; }
  increment() {
    count++;
  }
}
const c = new Counter();
c.increment();
console.log(c.count);
```
### Error 9: Class expression not assigned
**Description:** Class expression must be assigned to a variable
```javascript
const MyClass = class {
  constructor() {}
};
new MyClass();
```
### Error 10: Duplicate constructor in class
**Description:** A class can only have one constructor
```javascript
class User {
  constructor(name) { this.name = name; }
  constructor(name, age) { this.name = name; this.age = age; }
}
```
### Error 11: Arrow function as constructor
**Description:** Arrow functions cannot be constructors
```javascript
const Person = () => {
  this.name = 'Alice';
};
const p = new Person();
```
### Error 12: Method names with trailing comma
**Description:** Trailing comma in method parameter list causes error
```javascript
class Printer {
  print(text,) {
    console.log(text);
  }
}
```
### Error 13: Accessing class before declaration
**Description:** Classes are not hoisted like functions
```javascript
const obj = new MyClass();
class MyClass {}
```
### Error 14: Missing parentheses in constructor call
**Description:** new must be followed by constructor call with parentheses
```javascript
class Point {
  constructor(x, y) { this.x = x; this.y = y; }
}
const p = new Point;
console.log(p.x);
```
### Error 15: Assigning to class name
**Description:** Class name is const-like and cannot be reassigned
```javascript
class MyClass {}
MyClass = 'something else';
```
### Error 16: Wrong this reference in nested function
**Description:** Regular function inside method loses this context
```javascript
class Timer {
  constructor() { this.seconds = 0; }
  start() {
    setInterval(function() {
      this.seconds++;
    }, 1000);
  }
}
const t = new Timer();
t.start();
```
### Error 17: Overwriting constructor parameter with this
**Description:** Accidentally overwriting constructor parameter
```javascript
class Person {
  constructor(name) {
    const name = name.toUpperCase();
    this.name = name;
  }
}
```
### Error 18: Using class as a function
**Description:** Classes cannot be invoked as functions without new
```javascript
class Vehicle {
  constructor(type) { this.type = type; }
}
const car = Vehicle('car');
```
### Error 19: Method with reserved name
**Description:** Using reserved words as method names
```javascript
class Builder {
  delete() { /* clean up */ }
  class() { /* classify */ }
}
```
### Error 20: Returning wrong type from constructor
**Description:** Constructor returns primitive which is ignored
```javascript
class Wrapper {
  constructor(value) {
    return value;
  }
}
const w = new Wrapper(42);
console.log(w);
```
### Error 21: Extra comma after class method
**Description:** Comma after method definition in class body
```javascript
class Parser {
  parse(input) { return input.trim(); },
  format(output) { return output.toUpperCase(); }
}
```
### Error 22: Class body with expressions
**Description:** Class body can't contain arbitrary expressions
```javascript
class Helper {
  const VERSION = '1.0';
  console.log('class loaded');
  help() { return 'help'; }
}
```
### Error 23: Not calling super in derived class constructor
**Description:** Derived class must call super() before using this
```javascript
class Animal { constructor(name) { this.name = name; } }
class Dog extends Animal {
  constructor(name, breed) {
    this.breed = breed;
    this.name = name;
  }
}
```
### Error 24: Calling super before accessing this
**Description:** this accessed before super() in derived class
```javascript
class Animal { constructor(name) { this.name = name; } }
class Cat extends Animal {
  constructor(name, color) {
    this.color = color;
    super(name);
  }
}
```
### Error 25: Wrong number of constructor arguments
**Description:** Passing wrong number of arguments to constructor
```javascript
class Rectangle {
  constructor(width, height) { this.width = width; this.height = height; }
}
const square = new Rectangle(10);
console.log(square.height);
```
### Error 26: Constructor with async keyword
**Description:** Constructors cannot be async
```javascript
class Database {
  async constructor(url) {
    this.connection = await connect(url);
  }
}
```
### Error 27: Using var in class body
**Description:** Class body doesn't support var declarations
```javascript
class Store {
  var items = [];
  add(item) { items.push(item); }
}
```
### Error 28: Method defined outside class body
**Description:** Method added via assignment instead of class body
```javascript
class Shape {}
Shape.getArea = function() { return 0; };
```
```
### Error 29: Class with no name
**Description:** Anonymous class expression without assignment is useless
```javascript
new class {
  constructor() { this.id = 1; }
};
```
### Error 30: This in static initializer referring to instance
**Description:** Static blocks run in class context, not instance
```javascript
class Config {
  static {
    this.timeout = 5000;
    this.name = this.constructor.name;
  }
}
```
### Error 31: Generator method without asterisk
**Description:** Generator method needs asterisk before name
```javascript
class Sequence {
  range(start, end) {
    for (let i = start; i <= end; i++) yield i;
  }
}
```
### Error 32: Accessor without get/set keyword
**Description:** Property accessors need get or set prefix
```javascript
class User {
  constructor() { this._name = ''; }
  name(val) {
    if (val) this._name = val;
    return this._name;
  }
}
```
### Error 33: Setter without exactly one parameter
**Description:** Setters must have exactly one parameter
```javascript
class Pair {
  set both(a, b) {
    this.a = a;
    this.b = b;
  }
}
```
### Error 34: Getter with parameters
**Description:** Getters cannot have parameters
```javascript
class List {
  get first() { return this[0]; }
  get last() { return this[this.length - 1]; }
}
```
### Error 35: Duplicate class declarations
**Description:** Cannot declare the same class twice in the same scope
```javascript
class A {}
class A {}
```
### Error 36: Missing return in getter
**Description:** Getter should return a value
```javascript
class Counter {
  constructor() { this._count = 0; }
  get count() { this._count; }
}
```
### Error 37: Constructor with getter/setter same name
**Description:** Cannot have constructor parameter with same name as accessor
```javascript
class Temperature {
  constructor(celsius) { this.celsius = celsius; }
  get celsius() { return this._celsius; }
  set celsius(value) { this._celsius = value; }
}
```
### Error 38: Using delete on class property
**Description:** Class prototype methods are non-configurable
```javascript
class MyClass {
  method() {}
}
delete MyClass.prototype.method;
```
### Error 39: Assigning to method property
**Description:** Overwriting class method via prototype
```javascript
class Calculator {
  add(a, b) { return a + b; }
}
Calculator.prototype.add = function(a, b) { return a - b; };
```
### Error 40: Method returns this but not used for chaining
**Description:** Fluent API method returns this but caller ignores
```javascript
class Query {
  constructor() { this.query = ''; }
  select(fields) { this.query = `SELECT ${fields}`; return this; }
  from(table) { this.query += ` FROM ${table}`; return this; }
}
const q = new Query();
q.select('*').from('users');
console.log(q.query);
```
### Error 41: Constructor property initialized twice
**Description:** Class field and constructor both initialize same property
```javascript
class User {
  name = 'Default';
  constructor(name) {
    this.name = name;
  }
}
```
### Error 42: Forgetting this in method call chain
**Description:** Method calls other method without this
```javascript
class Form {
  validate() { return true; }
  submit() {
    if (validate()) {
      console.log('submitted');
    }
  }
}
```
### Error 43: Class field with computed name
**Description:** Computed property names in class fields need brackets
```javascript
class MyClass {
  ['field' + 1] = 'value';
}
```
### Error 44: Arrow function as class method loses prototype
**Description:** Arrow function methods are not on the prototype
```javascript
class MyClass {
  method = () => {
    return 'arrow';
  }
}
```
### Error 45: Too many constructor parameters
**Description:** Constructor with excessive parameters is hard to use
```javascript
class User {
  constructor(name, email, age, address, phone, role, status, createdAt) {
    this.name = name;
    this.email = email;
    // ... too many
  }
}
```
### Error 46: Class field without initializer but accessed
**Description:** Class field declared but not initialized
```javascript
class Container {
  items;
  add(item) { this.items.push(item); }
}
```
### Error 47: Using arguments object in arrow method
**Description:** Arrow functions don't have arguments binding
```javascript
class Logger {
  log = () => {
    console.log(arguments);
  }
}
```
### Error 48: Confusing class declaration with object literal
**Description:** Using commas between methods like an object literal
```javascript
class Actions {
  run() { return 'running'; },
  walk() { return 'walking'; }
}
```
### Error 49: Method shadowing built-in name
**Description:** Overriding toString with wrong signature
```javascript
class Item {
  toString(val) {
    return `Item: ${val}`;
  }
}
```
### Error 50: Class that tries to extend non-constructor
**Description:** extends requires a constructor/class
```javascript
class MyArray extends [1, 2, 3] {}
```
### Error 51: Constructor with spread in parameters
**Description:** Spread operator in constructor before named params
```javascript
class Point {
  constructor(...args, x, y) {
    this.x = x;
    this.y = y;
  }
}
```
### Error 52: Not passing arguments to super
**Description:** super() called without arguments when parent needs them
```javascript
class Animal {
  constructor(name) { this.name = name; }
}
class Dog extends Animal {
  constructor() {
    super();
  }
}
```
### Error 53: This in class static initialization block
**Description:** this in static block refers to class itself
```javascript
class Registry {
  static items = [];
  static {
    this.add('default');
  }
  static add(item) { this.items.push(item); }
}
```
### Error 54: Using new.target in regular function
**Description:** new.target is undefined in non-constructor functions
```javascript
function regularFunction() {
  console.log(new.target);
}
regularFunction();
```
### Error 55: Method with destructured parameter type error
**Description:** Destructured parameter with invalid default
```javascript
class Parser {
  parse({ data = null } = {}) {
    return data.toString();
  }
}
```
### Error 56: Class field declaration before super
**Description:** Class fields are initialized before super() in derived class
```javascript
class Animal { constructor() { this.alive = true; } }
class Bird extends Animal {
  wings = 2;
  constructor() {
    this.canFly = true;
    super();
  }
}
```
### Error 57: Calling constructor as plain function
**Description:** Using class constructor without new throws TypeError
```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
  }
}
const s1 = Singleton();
```
### Error 58: Class extends null incorrectly
**Description:** extends null creates a class that doesn't work with new
```javascript
class NullClass extends null {
  constructor() {}
}
const obj = new NullClass();
```
### Error 59: Accessing prototype property incorrectly
**Description:** Wrong syntax for accessing class prototype
```javascript
class MyClass {}
console.log(MyClass.prototype.constructor);
```
### Error 60: Method using outer this context
**Description:** Method defined with arrow function captures outer this
```javascript
const outer = this;
class MyClass {
  constructor() {
    this.value = 42;
  }
  method = () => {
    console.log(this.value);
  }
}
```
### Error 61: Forgetting new.target check in constructor
**Description:** Constructor not protected against non-new calls
```javascript
class SafeClass {
  constructor() {
    if (!new.target) throw new Error('Must use new');
  }
}
const obj = SafeClass();
```
### Error 62: Wrong property enumeration in class
**Description:** Class fields are enumerable, methods are not
```javascript
class User {
  name = 'Alice';
  greet() { return 'Hello'; }
}
const u = new User();
for (const key in u) console.log(key);
```
### Error 63: Class body with generator and yield
**Description:** yield used outside generator context
```javascript
class DataSource {
  fetch() {
    const data = getData();
    yield data;
  }
}
```
### Error 64: Static initialization block with await
**Description:** Static blocks cannot use await
```javascript
class Config {
  static {
    const data = await fetch('/config');
    this.settings = data;
  }
}
```
### Error 65: Multiple constructors via default params trick
**Description:** Trying to simulate multiple constructors
```javascript
class User {
  constructor(name = 'default', age = 0) {
    if (arguments.length === 1 && typeof name === 'number') {
      this.name = 'User';
      this.age = name;
    } else {
      this.name = name;
      this.age = age;
    }
  }
}
```
### Error 66: Setter that doesn't update value
**Description:** Setter modifies but getter doesn't reflect change
```javascript
class Square {
  set side(value) {
    this._side = value;
    this._area = value * value;
  }
  get side() { return this._side; }
  get area() { return this._area; }
}
```
### Error 67: Class with no constructor but field initialization
**Description:** Class fields work but constructor might be needed
```javascript
class Logger {
  prefix = '[LOG]';
  log(msg) { console.log(this.prefix + msg); }
}
const l = new Logger();
l.log('test');
```
### Error 68: Forgetting to bind event handler method
**Description:** Method loses this when passed as callback
```javascript
class Button {
  constructor(text) { this.text = text; }
  click() { console.log(this.text + ' clicked'); }
}
const btn = new Button('Submit');
document.addEventListener('click', btn.click);
```
### Error 69: Incorrect instanceof check
**Description:** Checking instanceof with non-class constructor
```javascript
class A {}
const a = new A();
console.log(a instanceof A);
console.log(A instanceof Function);
```
### Error 70: Constructor name collision with method
**Description:** Having a method named constructor in the class
```javascript
class MyClass {
  constructor() { this.x = 1; }
  constructor() { return 'not a constructor'; }
}
```

## Issue Snippets (30)

### Issue 1: Class doing too many things
**Description:** Single class handles multiple responsibilities
```javascript
class UserManager {
  constructor() {
    this.users = [];
    this.db = new Database();
    this.email = new EmailService();
    this.logger = new Logger();
    this.validator = new Validator();
  }
  createUser(data) { /* validate, save, send email, log */ }
  deleteUser(id) { /* delete from DB, send notification, log */ }
  sendNewsletter() { /* completely different feature */ }
  generateReport() { /* reporting functionality */ }
}
```
### Issue 2: Not using encapsulation
**Description:** All properties are public and mutable
```javascript
class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
    this.accountNumber = '';
  }
}
const acc = new BankAccount();
acc.balance = -1000; // Direct modification allowed
```
### Issue 3: Long constructor with many parameters
**Description:** Constructor takes too many positional arguments
```javascript
class Product {
  constructor(name, price, category, description, sku, weight, dimensions, color, brand, rating) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.sku = sku;
    this.weight = weight;
    this.dimensions = dimensions;
    this.color = color;
    this.brand = brand;
    this.rating = rating;
  }
}
```
### Issue 4: Properties that should be private are exposed
**Description:** Internal state accessible from outside
```javascript
class Counter {
  constructor() { this._count = 0; }
  increment() { this._count++; }
  get count() { return this._count; }
}
const c = new Counter();
c._count = 100; // Underscore convention not enforced
```
### Issue 5: Methods that don't use this
**Description:** Static methods should be used instead of instance methods
```javascript
class StringUtils {
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  isEmail(str) {
    return str.includes('@');
  }
}
// Usage requires creating instance
const utils = new StringUtils();
utils.capitalize('hello');
```
### Issue 6: Deep inheritance hierarchy
**Description:** Too many levels of inheritance
```javascript
class Animal {}
class Mammal extends Animal {}
class Primate extends Mammal {}
class Hominid extends Primate {}
class Human extends Hominid {}
class ModernHuman extends Human {}
```
### Issue 7: God class pattern
**Description:** One class knows and does everything
```javascript
class Application {
  constructor() { /* init everything */ }
  // 2000 lines with UI, business logic, data access, networking
}
```
### Issue 8: Using class for simple data containers
**Description:** Plain objects would suffice instead of classes
```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getX() { return this.x; }
  getY() { return this.y; }
}
const p = new Point(1, 2);
```
### Issue 9: Not using default parameter values in constructor
**Description:** Constructor manually checks for undefined
```javascript
class Config {
  constructor(timeout, retries) {
    this.timeout = timeout !== undefined ? timeout : 5000;
    this.retries = retries !== undefined ? retries : 3;
  }
}
```
### Issue 10: Mutable default parameters in constructor
**Description:** Shared mutable default parameter
```javascript
class Cart {
  constructor(items = []) {
    this.items = items;
  }
}
const a = new Cart();
const b = new Cart();
a.items.push('apple');
console.log(b.items); // ['apple'] - shared!
```
### Issue 11: Class used as namespace only
**Description:** Class with only static methods, no instances
```javascript
class MathHelper {
  static add(a, b) { return a + b; }
  static subtract(a, b) { return a - b; }
  static multiply(a, b) { return a * b; }
  static divide(a, b) { return a / b; }
}
```
### Issue 12: Not using computed property names in class
**Description:** Repetitive getter definitions
```javascript
class StatusCodes {
  get OK() { return 200; }
  get NOT_FOUND() { return 404; }
  get SERVER_ERROR() { return 500; }
  get BAD_REQUEST() { return 400; }
}
```
### Issue 13: Constructor does too much work
**Description:** Constructor has side effects
```javascript
class DatabaseConnection {
  constructor(url) {
    this.url = url;
    this.connect(); // Side effect in constructor
    this.validateConnection();
    this.loadSchemas();
  }
  connect() { /* ... */ }
  validateConnection() { /* ... */ }
  loadSchemas() { /* ... */ }
}
```
### Issue 14: Getter/Setter for every property
**Description:** Unnecessary accessors that add no logic
```javascript
class Person {
  constructor(name, age) {
    this._name = name;
    this._age = age;
  }
  get name() { return this._name; }
  set name(value) { this._name = value; }
  get age() { return this._age; }
  set age(value) { this._age = value; }
}
```
### Issue 15: Class with no methods, just properties
**Description:** Class acts as a struct/data container
```javascript
class UserDTO {
  constructor(id, name, email, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
```
### Issue 16: Not using static factory methods
**Description:** Complex constructor logic better in factory
```javascript
class User {
  constructor(data) {
    if (typeof data === 'string') {
      this.id = parseInt(data);
      this.name = 'Unknown';
    } else if (Array.isArray(data)) {
      this.id = data[0];
      this.name = data[1];
    } else {
      this.id = data.id;
      this.name = data.name;
    }
  }
}
```
### Issue 17: Over-engineering simple data with classes
**Description:** Creating class hierarchy for straightforward data
```javascript
class Shape {}
class Polygon extends Shape {}
class Quadrilateral extends Polygon {}
class Rectangle extends Quadrilateral {}
class Square extends Rectangle {}
```
### Issue 18: Class name doesn't reflect responsibility
**Description:** Vague or misleading class names
```javascript
class Manager {
  constructor() { this.data = []; }
  process() { /* unclear what is processed */ }
  handle() { /* unclear what is handled */ }
  doStuff() { /* very vague */ }
}
```
### Issue 19: Methods returning different types
**Description:** Method returns different types based on input
```javascript
class Finder {
  find(id) {
    if (!id) return false;
    if (typeof id === 'string') return this.findById(parseInt(id));
    return this.findById(id);
  }
}
```
### Issue 20: Not using class composition
**Description:** Using inheritance when composition is better
```javascript
class Car extends Engine {
  constructor() {
    super();
    this.wheels = [];
    this.doors = [];
  }
}
// Better: Car has an Engine, not is an Engine
```
### Issue 21: Law of Demeter violation in methods
**Description:** Method chains through multiple objects
```javascript
class ReportGenerator {
  getCustomerCity(order) {
    return order.getCustomer().getAddress().getCity();
  }
}
```
### Issue 22: Class with no cohesion
**Description:** Methods in the class are unrelated
```javascript
class Utils {
  formatDate(date) { /* date formatting */ }
  calculateTax(amount) { /* tax calculation */ }
  sendEmail(to, subject) { /* email sending */ }
  validatePhone(number) { /* phone validation */ }
}
```
### Issue 23: Not using destructuring in constructor
**Description:** Constructor manually assigns each property
```javascript
class User {
  constructor(config) {
    this.name = config.name;
    this.email = config.email;
    this.age = config.age;
    this.role = config.role;
    this.active = config.active;
  }
}
```
### Issue 24: Class that recreates built-in functionality
**Description:** Rewriting existing JavaScript features
```javascript
class MyArray {
  constructor() { this.data = {}; this.length = 0; }
  push(item) { this.data[this.length] = item; this.length++; }
  pop() { const item = this.data[this.length - 1]; delete this.data[this.length - 1]; this.length--; return item; }
  get(index) { return this.data[index]; }
}
```
### Issue 25: Inconsistent method naming conventions
**Description:** Mixing different naming styles in one class
```javascript
class UserService {
  getUser() { /* ... */ }
  create_user() { /* ... */ }
  DeleteUser() { /* ... */ }
  validate_Email() { /* ... */ }
}
```
### Issue 26: Feature envy in methods
**Description:** Method is more interested in another class's data
```javascript
class OrderProcessor {
  calculateTotal(order) {
    let total = 0;
    for (const item of order.items) {
      total += item.price * item.quantity;
    }
    return total;
  }
}
```
### Issue 27: Refused bequest in subclass
**Description:** Subclass doesn't need parent's methods
```javascript
class Bird {
  fly() { return 'flying'; }
  eat() { return 'eating'; }
}
class Penguin extends Bird {
  fly() { throw new Error('Penguins cannot fly'); }
}
```
### Issue 28: Using instanceof for type checking
**Description:** Relying on instanceof instead of polymorphism
```javascript
class Processor {
  process(data) {
    if (data instanceof Array) {
      return data.join(',');
    } else if (data instanceof Object) {
      return JSON.stringify(data);
    }
  }
}
```
### Issue 29: Duplicate code across methods
**Description:** Repeated logic in multiple methods
```javascript
class DataManager {
  saveUser(user) {
    this.validate(user);
    this.log('Saving user');
    db.insert('users', user);
  }
  saveProduct(product) {
    this.validate(product);
    this.log('Saving product');
    db.insert('products', product);
  }
}
```
### Issue 30: Class with too many empty lines
**Description:** Poor formatting makes class hard to read
```javascript
class Example {


  constructor() {}


  method1() {}


  method2() {}


}
```

## Modification Snippets (50)

### Modify 1: Create Person class with constructor
**Description:** Convert the factory function to a class
```javascript
function createPerson(name, age) {
  return { name, age, greet() { return `Hi, I'm ${this.name}`; } };
}
```
### Modify 2: Add method to class
**Description:** Add a greet method to the User class
```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}
```
### Modify 3: Fix constructor to initialize property
**Description:** Add missing property initialization in constructor
```javascript
class Counter {
  increment() {
    this.count++;
  }
  getCount() {
    return this.count;
  }
}
```
### Modify 4: Add static method to class
**Description:** Add a static method to create default instances
```javascript
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}
// Add static method User.createGuest()
```
### Modify 5: Implement getter for computed property
**Description:** Add a getter that computes full name
```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
// Add fullName getter
```
### Modify 6: Add setter with validation
**Description:** Add a setter that validates age range
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this._age = age;
  }
  // Add age getter/setter with validation (0-150)
}
```
### Modify 7: Fix method to use this correctly
**Description:** Fix the method to access instance properties with this
```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  getArea() {
    return width * height;
  }
}
```
### Modify 8: Add default parameter values to constructor
**Description:** Use default parameters in constructor
```javascript
class Config {
  constructor(timeout, retries) {
    this.timeout = timeout;
    this.retries = retries;
  }
}
// Add defaults: timeout=5000, retries=3
```
### Modify 9: Implement method chaining
**Description:** Return this from methods to enable chaining
```javascript
class QueryBuilder {
  constructor() {
    this.query = '';
  }
  select(fields) {
    this.query = `SELECT ${fields}`;
  }
  from(table) {
    this.query += ` FROM ${table}`;
  }
  where(condition) {
    this.query += ` WHERE ${condition}`;
  }
}
```
### Modify 10: Add toString method
**Description:** Implement toString for meaningful string representation
```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
// Add toString that returns "(x, y)"
```
### Modify 11: Create class with private helper method
**Description:** Refactor to use a private helper method
```javascript
class Calculator {
  calculate(operation, a, b) {
    if (operation === 'add') {
      // validate numbers
      if (typeof a !== 'number' || typeof b !== 'number') throw new Error('Invalid');
      return a + b;
    }
    if (operation === 'subtract') {
      if (typeof a !== 'number' || typeof b !== 'number') throw new Error('Invalid');
      return a - b;
    }
  }
}
// Extract validation into a helper method
```
### Modify 12: Convert procedural code to class
**Description:** Refactor the module pattern into a class
```javascript
const counterModule = (() => {
  let count = 0;
  return {
    increment() { count++; },
    decrement() { count--; },
    getCount() { return count; },
    reset() { count = 0; }
  };
})();
```
### Modify 13: Add factory static method
**Description:** Add a static factory method for common creation patterns
```javascript
class User {
  constructor(name, email, role) {
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
// Add User.createAdmin(email) and User.createGuest()
```
### Modify 14: Implement class hierarchy
**Description:** Create a base class and extend it
```javascript
// Create Animal base class with speak method
// Create Dog and Cat that extend Animal
```
### Modify 15: Add validation to class constructor
**Description:** Validate inputs in the constructor
```javascript
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}
// Add validation: name required, price > 0
```
### Modify 16: Refactor to use getter instead of method
**Description:** Convert a no-argument method to a getter
```javascript
class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  getArea() {
    return Math.PI * this.radius * this.radius;
  }
  getCircumference() {
    return 2 * Math.PI * this.radius;
  }
}
```
### Modify 17: Add computed property with getter
**Description:** Add a getter that depends on other properties
```javascript
class Order {
  constructor(items) {
    this.items = items;
  }
}
// Add total getter that sums item prices
```
### Modify 18: Implement singleton pattern with class
**Description:** Create a singleton class
```javascript
class Logger {
  log(message) {
    console.log(message);
  }
}
// Ensure only one instance can exist
```
### Modify 19: Use destructuring in constructor
**Description:** Refactor constructor to use destructuring
```javascript
class User {
  constructor(config) {
    this.name = config.name;
    this.email = config.email;
    this.age = config.age;
    this.role = config.role;
  }
}
```
### Modify 20: Add method overload through defaults
**Description:** Use default parameters for flexible method
```javascript
class Greeter {
  greet(name, greeting) {
    if (!greeting) greeting = 'Hello';
    return `${greeting}, ${name}!`;
  }
}
```
### Modify 21: Fix inheritance with super call
**Description:** Add proper super call in derived class
```javascript
class Vehicle {
  constructor(type) {
    this.type = type;
  }
  start() { return `${this.type} starting`; }
}
class Car extends Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
}
```
### Modify 22: Implement proper encapsulation with closures
**Description:** Use closure-based private state
```javascript
class SecretHolder {
  constructor(secret) {
    this.secret = secret; // Should be private
  }
  getSecret() {
    return this.secret;
  }
}
```
### Modify 23: Add instance counter with static property
**Description:** Use static property to track instances
```javascript
class User {
  constructor(name) {
    this.name = name;
  }
}
// Add static count property and increment in constructor
```
### Modify 24: Refactor switch statement to polymorphism
**Description:** Replace type-based switch with subclass polymorphism
```javascript
class Payment {
  process(amount) {
    switch (this.type) {
      case 'credit': return 'Processing credit';
      case 'debit': return 'Processing debit';
      case 'paypal': return 'Processing paypal';
    }
  }
}
```
### Modify 25: Add iterator to class
**Description:** Make class iterable with Symbol.iterator
```javascript
class Playlist {
  constructor() {
    this.songs = [];
  }
  add(song) { this.songs.push(song); }
}
// Make Playlist iterable
```
### Modify 26: Implement valueOf for object comparison
**Description:** Add valueOf to enable comparison operators
```javascript
class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }
}
// Add valueOf for comparing Money instances
```
### Modify 27: Add toJSON for serialization
**Description:** Implement toJSON for custom JSON serialization
```javascript
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password; // Should not be serialized
  }
}
// Add toJSON to exclude password
```
### Modify 28: Implement comparison methods
**Description:** Add equals and compareTo methods
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
// Add equals method
```
### Modify 29: Add event emitter capability to class
**Description:** Mix in event emitter functionality
```javascript
class Button {
  constructor(label) {
    this.label = label;
  }
  click() {
    // Notify listeners
  }
}
// Add on/emit methods
```
### Modify 30: Refactor to extract smaller classes
**Description:** Split a large class into focused classes
```javascript
class ReportGenerator {
  fetchData() { /* DB query */ }
  formatData() { /* formatting */ }
  generateHTML() { /* HTML generation */ }
  sendEmail() { /* email delivery */ }
  saveToDisk() { /* file saving */ }
}
// Split into DataFetcher, ReportFormatter, EmailService
```
### Modify 31: Add type checking with Symbol.hasInstance
**Description:** Customize instanceof behavior
```javascript
class Range {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }
}
// Custom instanceof to check if number falls in range
```
### Modify 32: Implement builder pattern
**Description:** Create a builder class for complex construction
```javascript
class Pizza {
  constructor(size, crust, cheese, toppings, sauce) {
    // Too many parameters
  }
}
// Create PizzaBuilder class
```
### Modify 33: Add caching to class method
**Description:** Implement memoization for expensive methods
```javascript
class DataService {
  async fetchData(id) {
    const response = await fetch(`/api/data/${id}`);
    return response.json();
  }
}
// Add caching layer
```
### Modify 34: Implement class validator
**Description:** Add validation decorators or methods
```javascript
class FormModel {
  constructor(data) {
    this.username = data.username;
    this.email = data.email;
    this.age = data.age;
  }
}
// Add validate() method that checks all fields
```
### Modify 35: Convert to use class fields syntax
**Description:** Use class field declarations instead of constructor assignment
```javascript
class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count++;
  }
}
```
### Modify 36: Add private method convention
**Description:** Use underscore prefix for private methods
```javascript
class Calculator {
  calculate(operation, a, b) {
    if (!this.isValid(a) || !this.isValid(b)) throw new Error('Invalid');
    if (operation === 'add') return a + b;
  }
  isValid(n) { return typeof n === 'number'; }
}
```
### Modify 37: Implement fluent interface
**Description:** Make all setters chainable
```javascript
class EmailBuilder {
  constructor() {
    this._to = '';
    this._subject = '';
    this._body = '';
  }
  setTo(email) { this._to = email; }
  setSubject(subject) { this._subject = subject; }
  setBody(body) { this._body = body; }
  send() { console.log(`To: ${this._to}\nSubject: ${this._subject}\n${this._body}`); }
}
```
### Modify 38: Add proxy for access control
**Description:** Use Proxy to control access to class properties
```javascript
class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }
  withdraw(amount) {
    if (amount > this.balance) throw new Error('Insufficient funds');
    this.balance -= amount;
  }
}
// Add proxy that requires authorization
```
### Modify 39: Implement observable class
**Description:** Make class properties observable
```javascript
class Observable {
  constructor() {
    this.observers = [];
  }
  // Base observable functionality
}
// Extend for reactive properties
```
### Modify 40: Add serialization/deserialization
**Description:** Add fromJSON static method and toJSON instance method
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
// Add Person.fromJSON and toJSON
```
### Modify 41: Refactor parameters to config object
**Description:** Use config object instead of many parameters
```javascript
class Server {
  constructor(host, port, protocol, timeout, retries, ssl) {
    this.host = host;
    this.port = port;
    this.protocol = protocol;
    this.timeout = timeout;
    this.retries = retries;
    this.ssl = ssl;
  }
}
```
### Modify 42: Add Symbol.species for derived objects
**Description:** Customize which constructor is used for derived objects
```javascript
class MyArray extends Array {
  // Custom array methods
}
// Override Symbol.species to return Array
```
### Modify 43: Implement dispose pattern
**Comment:** Add cleanup method for resource management
```javascript
class FileHandler {
  constructor(path) {
    this.file = fs.openSync(path, 'w');
  }
  write(data) {
    fs.writeSync(this.file, data);
  }
}
// Add close/dispose method
```
### Modify 44: Add type conversion methods
**Description:** Implement toString, valueOf, toPrimitive
```javascript
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
}
// Add conversions to Fahrenheit, Kelvin
```
### Modify 45: Create mixin for shared behavior
**Description:** Use a mixin function to add common behavior
```javascript
class User { constructor(name) { this.name = name; } }
class Product { constructor(title) { this.title = title; } }
// Mix in logging capability to both
```
### Modify 46: Add method timing decorator
**Description:** Add performance measurement to methods
```javascript
class DataProcessor {
  process(data) {
    // Expensive operation
    return data.map(x => x * 2);
  }
}
// Add timing wrapper
```
### Modify 47: Implement class versioning
**Description:** Handle migration between class versions
```javascript
class UserV1 {
  constructor(name) { this.name = name; }
}
class UserV2 {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}
// Add migration from V1 to V2
```
### Modify 48: Add batch operations to collection class
**Description:** Add bulk methods to a collection class
```javascript
class ItemCollection {
  constructor() { this.items = []; }
  add(item) { this.items.push(item); }
  remove(id) { this.items = this.items.filter(i => i.id !== id); }
}
// Add addMultiple, removeMultiple, clear
```
### Modify 49: Implement retry logic in class method
**Description:** Add retry capability to a method
```javascript
class ApiClient {
  async fetch(url) {
    const response = await fetch(url);
    return response.json();
  }
}
// Add retry on failure
```
### Modify 50: Add change tracking to class
**Description:** Track property changes on instances
```javascript
class Profile {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.age = data.age;
  }
}
// Add change tracking: what changed, original values
```
