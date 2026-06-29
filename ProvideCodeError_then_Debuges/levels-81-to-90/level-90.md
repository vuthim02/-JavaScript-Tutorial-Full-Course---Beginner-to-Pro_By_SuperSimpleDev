# Level 90: Module 18 – OOP Patterns, instanceof, Refactoring Procedural to OOP

## Error Snippets (70)

### Error 1: instanceof with primitive types
**Description:** instanceof only works with objects, not primitives
```javascript
console.log('hello' instanceof String);
console.log(42 instanceof Number);
```
### Error 2: instanceof with different realms
**Description:** instanceof fails across iframe/context boundaries
```javascript
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const arr = new iframe.contentWindow.Array();
console.log(arr instanceof Array);
```
### Error 3: Forgetting new.target check
**Description:** Not checking if function was called with new
```javascript
function Person(name) {
  this.name = name;
}
const p = Person('Alice'); // Modifies global object
```
### Error 4: typeof vs instanceof confusion
**Description:** Using typeof where instanceof is needed
```javascript
class MyClass {}
const obj = new MyClass();
console.log(typeof obj);
```
### Error 5: instanceof with minified class names
**Description:** Class name changes after minification
```javascript
class MyClass {}
const obj = new MyClass();
console.log(obj.constructor.name); // Might change
```
### Error 6: Using instanceof instead of duck typing
**Description:** instanceof creates tight coupling
```javascript
class Bird { fly() {} }
class Airplane { fly() {} }
function makeFly(thing) {
  if (thing instanceof Bird) {
    thing.fly();
  }
}
```
### Error 7: Object.create without proper initialization
**Description:** Object.create doesn't call constructor
```javascript
class Person {
  constructor(name) { this.name = name; }
}
const p = Object.create(Person.prototype);
console.log(p.name);
```
### Error 8: Calling constructor manually without new
**Description:** Constructor called as regular function
```javascript
class MyClass {
  constructor() { this.value = 42; }
}
const obj = MyClass.call({});
console.log(obj.value);
```
### Error 9: Prototype chain circular reference
**Description:** Circular prototype chain causes errors
```javascript
const obj = {};
Object.setPrototypeOf(obj, obj);
```
### Error 10: Setting __proto__ after object creation
**Description:** Modifying __proto__ is very slow
```javascript
const obj = {};
obj.__proto__ = SomeClass.prototype;
```
### Error 11: Not using Object.getPrototypeOf
**Description:** Using __proto__ instead of standard API
```javascript
class MyClass {}
const obj = new MyClass();
console.log(obj.__proto__);
```
### Error 12: Prototype pollution via Object.assign
**Description:** Accidentally polluting prototype
```javascript
function merge(target, source) {
  for (const key in source) {
    target[key] = source[key];
  }
  return target;
}
merge({}, JSON.parse('{"__proto__": {"polluted": true}}'));
```
### Error 13: Constructor stealing without prototype
**Description:** Inheritance via constructor stealing only
```javascript
function Parent(name) { this.name = name; }
function Child(name) {
  Parent.call(this, name);
}
const c = new Child('Alice');
console.log(c instanceof Parent);
```
### Error 14: Forgetting to set prototype in constructor stealing
**Description:** Incomplete inheritance implementation
```javascript
function Parent(name) { this.name = name; }
Parent.prototype.greet = function() { return 'Hi'; };
function Child(name) {
  Parent.call(this, name);
}
const c = new Child('Alice');
c.greet();
```
### Error 15: Overwriting prototype object
**Description:** Replacing prototype instead of extending
```javascript
function MyClass() {}
MyClass.prototype = {
  method1() { return 1; },
  method2() { return 2; }
};
```
### Error 16: Factory function without new safety
**Description:** Factory doesn't handle being called with new
```javascript
function createPerson(name) {
  return { name };
}
const p = new createPerson('Alice');
console.log(p);
```
### Error 17: Mixing class and prototype syntax
**Description:** Using prototype after class definition
```javascript
class MyClass {
  method1() {}
}
MyClass.prototype.method2 = function() {};
```
### Error 18: Object.setPrototypeOf with frozen objects
**Description:** Cannot set prototype on frozen objects
```javascript
const obj = Object.freeze({});
Object.setPrototypeOf(obj, { method() {} });
```
### Error 19: instanceof with Symbol.hasInstance override
**Description:** Custom instanceof logic breaks expectations
```javascript
class MyArray {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}
console.log([] instanceof MyArray);
console.log({} instanceof MyArray);
```
### Error 20: Using new on arrow function
**Description:** Arrow functions cannot be constructors
```javascript
const Person = (name) => {
  this.name = name;
};
const p = new Person('Alice');
```
### Error 21: Prototype property shadowing
**Description:** Instance property shadows prototype method
```javascript
class MyClass {
  constructor() { this.method = 'string'; }
  method() { return 'function'; }
}
const obj = new MyClass();
console.log(obj.method());
```
### Error 22: Calling prototype method on primitive
**Description:** Primitives auto-box but prototype methods can't be called directly
```javascript
console.log(String.prototype.toUpperCase.call(42));
```
### Error 23: Forgetting constructor in prototype reassignment
**Description:** Reassigning prototype breaks constructor reference
```javascript
function MyClass() {}
MyClass.prototype = {
  method() {}
};
const obj = new MyClass();
console.log(obj.constructor === MyClass);
```
### Error 24: instanceof with null
**Description:** null is not an instance of anything
```javascript
console.log(null instanceof Object);
```
### Error 25: Using constructor for type checking
**Description:** constructor can be overwritten
```javascript
class MyClass {}
const obj = new MyClass();
obj.constructor = function() {};
console.log(obj.constructor === MyClass);
```
### Error 26: Prototype chain with null
**Description:** Object.create(null) has no prototype
```javascript
const obj = Object.create(null);
console.log(obj instanceof Object);
console.log(obj.toString());
```
### Error 27: Not checking type before calling methods
**Description:** Assuming object has certain methods
```javascript
function process(data) {
  return data.toUpperCase();
}
process(null);
```
### Error 28: instanceof with bound functions
**Description:** Bound functions are not constructors
```javascript
function MyClass() {}
const Bound = MyClass.bind(null);
const obj = new Bound();
console.log(obj instanceof MyClass);
```
### Error 29: Using class syntax incorrectly with prototype
**Description:** Mixing old and new inheritance patterns
```javascript
class Parent {}
class Child extends Parent {}
Child.prototype = Object.create(Parent.prototype);
```
### Error 30: Object.create with undefined proto
**Description:** Creating object with undefined prototype
```javascript
const obj = Object.create(undefined);
console.log(obj.toString());
```
### Error 31: Prototype method defined after instance creation
**Description:** Adding methods to prototype after creating instances
```javascript
function MyClass() {}
const obj = new MyClass();
MyClass.prototype.method = function() { return 42; };
console.log(obj.method());
```
### Error 32: Wrong this in prototype methods
**Description:** Calling prototype method without correct this
```javascript
function MyClass(value) { this.value = value; }
MyClass.prototype.getValue = function() { return this.value; };
const fn = MyClass.prototype.getValue;
console.log(fn());
```
### Error 33: Forgetting new in chained constructors
**Description:** Nested constructor call without new
```javascript
class Address {
  constructor(street) { this.street = street; }
}
class Person {
  constructor(name, street) {
    this.name = name;
    this.address = Address(street);
  }
}
```
### Error 34: Dynamic prototype change not reflected
**Description:** Changing prototype doesn't update existing instances
```javascript
function Parent() {}
function Child() {}
const c = new Child();
Child.prototype = new Parent();
console.log(c instanceof Parent);
```
### Error 35: Prototype chain too long
**Description:** Very long prototype chain hurts performance
```javascript
function A() {}; function B() {}; function C() {};
function D() {}; function E() {}; function F() {};
B.prototype = new A(); C.prototype = new B();
D.prototype = new C(); E.prototype = new D();
F.prototype = new E();
```
### Error 36: Using prototype without new
**Description:** Calling function without new when it uses this
```javascript
function Car(make) {
  this.make = make;
}
const car = Car('Toyota');
console.log(car.make);
```
### Error 37: Object.create with properties descriptor
**Description:** Second argument to Object.create uses property descriptors
```javascript
const obj = Object.create(null, {
  name: 'Alice' // Should be { value: 'Alice' }
});
```
### Error 38: Checking instanceof after cross-realm
**Description:** instanceof fails for objects from different realms
```javascript
const worker = new Worker('data:,'); // Blob not available, conceptual
```
### Error 39: Constructor with no prototype linkage
**Description:** Constructor that doesn't set up prototype
```javascript
function MyClass() {
  this.method = function() {};
}
// No prototype methods
```
### Error 40: Using new with factory return
**Description:** Factory returns object, new is unnecessary
```javascript
function createPerson(name) {
  return { name };
}
const p = new createPerson('Alice');
```
### Error 41: Overwriting constructor property
**Description:** Accidentally overwriting .constructor
```javascript
function MyClass() {}
MyClass.prototype = { method() {} };
const obj = new MyClass();
console.log(obj.constructor);
```
### Error 42: Missing Object.create in extends polyfill
**Description:** Old inheritance polyfill missing prototype setup
```javascript
function inherit(Child, Parent) {
  Child.prototype = Parent.prototype; // Wrong! Should use Object.create
}
```
### Error 43: instanceof not working with async functions
**Description:** Async functions always return promises
```javascript
class MyClass {}
async function createInstance() {
  return new MyClass();
}
const result = createInstance();
console.log(result instanceof MyClass);
```
### Error 44: Using hasOwnProperty with null prototype
**Description:** Null prototype objects lack hasOwnProperty
```javascript
const obj = Object.create(null);
obj.name = 'test';
console.log(obj.hasOwnProperty('name'));
```
### Error 45: Prototype method not enumerable
**Description:** for...in skips prototype methods
```javascript
function MyClass() {}
MyClass.prototype.method = function() {};
const obj = new MyClass();
for (const key in obj) console.log(key);
```
### Error 46: Comparing constructor by reference
**Description:** Constructor reference changes with inheritance
```javascript
class Parent {}
class Child extends Parent {}
const c = new Child();
console.log(c.constructor === Parent);
```
### Error 47: Using new on method
**Description:** Methods are not constructors by default
```javascript
class MyClass {
  method() {}
}
const m = new MyClass();
new m.method();
```
### Error 48: Not using super in constructor inheritance
**Description:** Manual parent constructor call misses prototype setup
```javascript
function Parent(name) { this.name = name; }
function Child(name) {
  Parent.call(this, name);
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
// Works but verbose
```
### Error 49: instanceof with Symbol.hasInstance on non-class
**Description:** Symbol.hasInstance only works on functions
```javascript
const obj = {
  [Symbol.hasInstance](instance) {
    return 'name' in instance;
  }
};
console.log({ name: 'test' } instanceof obj);
```
### Error 50: Constructor return object vs primitive
**Description:** Constructor returning object vs primitive behavior
```javascript
function MyClass() {
  return { custom: 'object' };
}
const obj = new MyClass();
console.log(obj instanceof MyClass);
```
### Error 51: Calling class without new via Reflect.construct
**Description:** Reflect.construct replaces new
```javascript
class MyClass {
  constructor(x) { this.x = x; }
}
const obj = Reflect.construct(MyClass, [42]);
console.log(obj instanceof MyClass);
```
### Error 52: Forgetting prototype methods are shared
**Description:** Reference-type properties on prototype are shared
```javascript
function MyClass() {}
MyClass.prototype.items = [];
const a = new MyClass();
const b = new MyClass();
a.items.push(1);
console.log(b.items);
```
### Error 53: instance.constructor after prototype reassignment
**Description:** Constructor reference lost after prototype change
```javascript
class MyClass {}
const obj = new MyClass();
Object.setPrototypeOf(obj, {});
console.log(obj.constructor);
```
### Error 54: Forgetting to return in factory function
**Description:** Factory function returns nothing
```javascript
function createUser(name) {
  const user = {};
  user.name = name;
  // forgot return
}
const u = createUser('Alice');
```
### Error 55: Prototype chain with circular reference via mixin
**Description:** Mixins creating circular prototype chain
```javascript
const mixin1 = { method() {} };
const mixin2 = { method() {} };
Object.setPrototypeOf(mixin1, mixin2);
Object.setPrototypeOf(mixin2, mixin1);
```
### Error 56: Extending native objects incorrectly
**Description:** Extending Array without proper species
```javascript
class MyArray extends Array {
  constructor(...args) { super(...args); }
  first() { return this[0]; }
}
const arr = MyArray.from([1, 2, 3]);
console.log(arr instanceof MyArray);
```
### Error 57: typeof null === 'object'
**Description:** The famous JavaScript language quirk
```javascript
console.log(typeof null);
console.log(null instanceof Object);
```
### Error 58: Not checking for null/undefined before instanceof
**Description:** instanceof throws on non-object
```javascript
function checkType(val) {
  return val instanceof Object;
}
console.log(checkType(null));
```
### Error 59: Using constructor.name for logic
**Description:** constructor.name changes with minification
```javascript
class MyClass {}
function process(obj) {
  if (obj.constructor.name === 'MyClass') {
    // ...
  }
}
```
### Error 60: Mistaking factory for constructor
**Description:** Factory function that looks like a constructor
```javascript
function User(name) {
  return { name };
}
const u = new User('Alice');
console.log(u instanceof User);
```
### Error 61: Prototype property as array
**Description:** Array on prototype is shared across instances
```javascript
function Team() {}
Team.prototype.members = [];
const t1 = new Team();
const t2 = new Team();
t1.members.push('Alice');
```
### Error 62: Enumerable prototype properties in Object.keys
**Description:** Object.keys doesn't include prototype properties
```javascript
function MyClass() {}
MyClass.prototype.shared = 'value';
const obj = new MyClass();
obj.own = 'own';
console.log(Object.keys(obj));
```
### Error 63: Forgetting to reset constructor after prototype swap
**Description:** Constructor reference wrong after prototype change
```javascript
function Child() {}
Child.prototype = Object.create(Parent.prototype);
// Missing: Child.prototype.constructor = Child;
```
### Error 64: instanceof with ES6 class vs ES5 function
**Description:** Different constructor patterns with instanceof
```javascript
class ClassVersion {}
function FuncVersion() {}
console.log(new ClassVersion() instanceof ClassVersion);
console.log(new FuncVersion() instanceof FuncVersion);
```
### Error 65: Detached prototype via Object.setPrototypeOf
**Description:** Changing prototype of existing instance
```javascript
const obj = { name: 'test' };
Object.setPrototypeOf(obj, { greet() { return 'Hi'; } });
console.log(obj.greet());
```
### Error 66: Constructor function re-assigned
**Description:** Constructor variable reassigned after instance creation
```javascript
function MyClass() {}
const obj = new MyClass();
function MyClass() {} // Duplicate
console.log(obj instanceof MyClass);
```
### Error 67: Check if function is a class
**Description:** Detecting class vs function
```javascript
function isClass(fn) {
  return typeof fn === 'function' && fn.toString().startsWith('class');
}
```
### Error 68: Using .constructor after prototype chain modification
**Description:** Constructor property unreliable after prototype chain changes
```javascript
class Parent {}
class Child extends Parent {}
const c = new Child();
Object.setPrototypeOf(c, Parent.prototype);
console.log(c.constructor);
```
### Error 69: instanceof with Proxy
**Description:** Proxy can interfere with instanceof
```javascript
class MyClass {}
const ProxyClass = new Proxy(MyClass, {});
const obj = new ProxyClass();
console.log(obj instanceof MyClass);
```
### Error 70: Object.prototype.toString.call vs instanceof
**Description:** Using toString for type checking vs instanceof
```javascript
console.log(Object.prototype.toString.call([]));
console.log(Object.prototype.toString.call({}));
console.log([] instanceof Array);
```

## Issue Snippets (30)

### Issue 1: Procedural code instead of OOP
**Description:** Using functions and global state instead of classes
```javascript
let users = [];
function addUser(name) { users.push({ name }); }
function removeUser(id) { users.splice(id, 1); }
function findUser(name) { return users.find(u => u.name === name); }
function getUserCount() { return users.length; }
```
### Issue 2: Global state mutation everywhere
**Description:** Functions modify global state unpredictably
```javascript
let cart = [];
let total = 0;
function addToCart(item) {
  cart.push(item);
  total += item.price;
}
function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
}
```
### Issue 3: Long functions with many responsibilities
**Description:** Functions doing too many things
```javascript
function processOrder(orderData) {
  // validate order
  if (!orderData.items || orderData.items.length === 0) return { error: 'No items' };
  // calculate prices
  let total = 0;
  orderData.items.forEach(item => { total += item.price * item.quantity; });
  // apply discount
  if (orderData.coupon) { total *= 0.9; }
  // calculate tax
  total *= 1.08;
  // save to database
  db.orders.insert({ data: orderData, total });
  // send email
  email.send(orderData.email, 'Order confirmed');
  // return result
  return { success: true, total };
}
```
### Issue 4: Using switch on type instead of polymorphism
**Description:** Type-based switching instead of class hierarchy
```javascript
function calculatePay(employee) {
  switch (employee.type) {
    case 'fulltime': return employee.salary;
    case 'parttime': return employee.hours * employee.rate;
    case 'contractor': return employee.hours * employee.rate * 1.2;
    case 'intern': return 0;
  }
}
```
### Issue 5: Data clumps not encapsulated
**Description:** Related data fields passed around separately
```javascript
function createUser(firstName, lastName, email, phone, street, city, zip) {
  // ...
}
function updateUser(id, firstName, lastName, email, phone, street, city, zip) {
  // ...
}
```
### Issue 6: Primitive obsession
**Description:** Using primitives instead of small objects
```javascript
function calculateDiscount(price, customerType, orderDate, isHoliday, loyaltyPoints) {
  // All primitives
}
```
### Issue 7: Long parameter list
**Description:** Too many function parameters
```javascript
function createOrder(customerName, customerEmail, items, shippingAddress, billingAddress, paymentMethod, couponCode, giftMessage) {
  // Too many parameters
}
```
### Issue 8: Shotgun surgery pattern
**Description:** One change requires modifying many functions
```javascript
// Adding a 'phone' field requires changes in:
function validateUser(data) { /* ... */ }
function saveUser(data) { /* ... */ }
function displayUser(data) { /* ... */ }
function formatUser(data) { /* ... */ }
```
### Issue 9: Feature envy
**Description:** Function more interested in another object's data
```javascript
function calculateOrderTotal(order) {
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  return total;
}
// Should be a method on Order
```
### Issue 10: Lazy class
**Description:** Class that doesn't do enough
```javascript
class NameHolder {
  constructor(name) { this.name = name; }
  getName() { return this.name; }
}
```
### Issue 11: Inappropriate intimacy
**Description:** Classes too coupled to each other's internals
```javascript
class Point {
  constructor(x, y) { this.x = x; this.y = y; }
}
class Line {
  constructor(p1, p2) { this.p1 = p1; this.p2 = p2; }
  length() {
    const dx = this.p2.x - this.p1.x; // Accessing Point internals
    const dy = this.p2.y - this.p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
```
### Issue 12: Message chain
**Description:** Long chain of method calls
```javascript
function getCustomerCity(order) {
  return order.getCustomer().getAddress().getCity();
}
```
### Issue 13: Middle man
**Description:** Class that delegates everything to another class
```javascript
class DataProxy {
  constructor(source) { this.source = source; }
  getData() { return this.source.getData(); }
  saveData(d) { return this.source.saveData(d); }
  deleteData(id) { return this.source.deleteData(id); }
  updateData(id, d) { return this.source.updateData(id, d); }
}
```
### Issue 14: Speculative generality
**Description:** Over-designed for future use cases
```javascript
class AbstractBaseFactoryProvider {
  createFactory(type) { /* ... */ }
}
class ConcreteFactoryProvider extends AbstractBaseFactoryProvider {
  createFactory(type) { /* ... */ }
}
// Only one factory ever used
```
### Issue 15: Temporary field
**Description:** Field only set in certain conditions
```javascript
class Order {
  constructor() {
    this.items = [];
    this.discountCode = null;
    this.appliedDiscount = null;
    this.discountedTotal = null;
    this.couponValidationResult = null;
  }
}
```
### Issue 16: Alternative classes with different interfaces
**Description:** Two classes do the same thing but have different methods
```javascript
class CsvExporter { output(data) { /* CSV */ } }
class JsonWriter { write(data) { /* JSON */ } }
class XmlFormatter { format(data) { /* XML */ } }
```
### Issue 17: Divergent change
**Description:** One class changes for multiple reasons
```javascript
class Report {
  constructor(data) { this.data = data; }
  generateHTML() { /* HTML format */ }
  generatePDF() { /* PDF format */ }
  generateCSV() { /* CSV format */ }
  sendEmail() { /* email delivery */ }
  saveToFile() { /* file storage */ }
  print() { /* printing */ }
}
```
### Issue 18: Refused bequest
**Description:** Subclass doesn't want inherited members
```javascript
class Bird {
  fly() { return 'flying'; }
  eat() { return 'eating'; }
  layEggs() { return 'eggs'; }
}
class Penguin extends Bird {
  fly() { throw new Error('Cannot fly'); }
}
```
### Issue 19: Parallel inheritance hierarchies
**Description:** One hierarchy mirrors another unnecessarily
```javascript
class Player {}
class Enemy {}
class PlayerAI {}
class EnemyAI {}
class PlayerRenderer {}
class EnemyRenderer {}
```
### Issue 20: Incomplete library class
**Description:** Library class doesn't have needed methods
```javascript
// Using a Date object but needing business days calculation
function addBusinessDays(date, days) {
  // External utility function
}
```
### Issue 21: Data class (anemic domain model)
**Description:** Class only holds data, no behavior
```javascript
class UserData {
  constructor(id, name, email, role, status, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
```
### Issue 22: Call super anti-pattern
**Description:** Every overridden method must call super
```javascript
class Lifecycle {
  init() { this.setup(); }
  render() { this.draw(); }
  destroy() { this.cleanup(); }
}
class Component extends Lifecycle {
  init() { super.init(); /* extra */ }
  render() { super.render(); /* extra */ }
  destroy() { super.destroy(); /* extra */ }
}
```
### Issue 23: Functional decomposition of objects
**Description:** Procedural code disguised in a class
```javascript
class OrderProcessor {
  process(order) {
    const validated = this.validate(order);
    if (!validated) return { error: 'Invalid' };
    const calculated = this.calculate(validated);
    const saved = this.save(calculated);
    const notified = this.notify(saved);
    return notified;
  }
  validate(o) { /* ... */ }
  calculate(o) { /* ... */ }
  save(o) { /* ... */ }
  notify(o) { /* ... */ }
}
```
### Issue 24: Hidden dependencies
**Description:** Class uses globals or singletons directly
```javascript
class ReportGenerator {
  generate() {
    const data = Database.getInstance().query('SELECT * FROM data');
    const formatted = new Formatter().format(data);
    EmailService.getInstance().send('admin@test.com', formatted);
  }
}
```
### Issue 25: Too many dependencies injected
**Description:** Constructor takes too many dependencies
```javascript
class OrderService {
  constructor(database, emailService, paymentGateway, logger, cache, analytics, validator) {
    // Too many dependencies
  }
}
```
### Issue 26: Callback hell vs OOP methods
**Description:** Nested callbacks instead of clean method calls
```javascript
function processOrder(orderId) {
  getOrder(orderId, (order) => {
    getCustomer(order.customerId, (customer) => {
      getAddress(customer.addressId, (address) => {
        calculateShipping(address, (shipping) => {
          sendConfirmation(order, customer, address, shipping);
        });
      });
    });
  });
}
```
### Issue 27: Magic numbers instead of named constants
**Description:** Raw numbers used throughout
```javascript
function calculate(price) {
  if (price > 100) return price * 0.9;
  if (price > 50) return price * 0.95;
  return price;
}
```
### Issue 28: Not using dependency injection
**Description:** Creating dependencies inside methods
```javascript
class UserService {
  getUser(id) {
    const db = new Database(); // Created here
    return db.findUser(id);
  }
}
```
### Issue 29: Tell, Don't Ask violation
**Description:** Asking object for data then making decisions
```javascript
function processOrder(order) {
  if (order.getStatus() === 'pending' && order.getTotal() > 0) {
    order.setStatus('processing');
  }
}
```
### Issue 30: Law of Demeter violation
**Description:** Talking to strangers through chains
```javascript
class OrderProcessor {
  getCustomerCountry(order) {
    return order.getCustomer().getAddress().getCountry();
  }
}
```

## Modification Snippets (50)

### Modify 1: Refactor procedural code to class
**Description:** Convert global functions to a UserManager class
```javascript
let users = [];
function addUser(name) { users.push({ name }); }
function removeUser(id) { users.splice(id, 1); }
function findUser(name) { return users.find(u => u.name === name); }
function getUserCount() { return users.length; }
```
### Modify 2: Encapsulate global state into class
**Description:** Refactor cart functions to a ShoppingCart class
```javascript
let cart = [];
let total = 0;
function addToCart(item) {
  cart.push(item);
  total += item.price;
}
function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
}
function getTotal() { return total; }
```
### Modify 3: Replace switch with polymorphism
**Description:** Use class hierarchy instead of type switch
```javascript
function calculatePay(employee) {
  switch (employee.type) {
    case 'fulltime': return employee.salary;
    case 'parttime': return employee.hours * employee.rate;
    case 'contractor': return employee.hours * employee.rate * 1.2;
  }
}
// Create Employee base class with subclasses
```
### Modify 4: Extract data clump to class
**Description:** Encapsulate address fields into a class
```javascript
function createUser(firstName, lastName, email, phone, street, city, zip) {
  return { firstName, lastName, email, phone, street, city, zip };
}
```
### Modify 5: Fix instanceof usage to use polymorphism
**Description:** Replace instanceof checks with polymorphic method
```javascript
function getArea(shape) {
  if (shape instanceof Circle) return Math.PI * shape.radius ** 2;
  if (shape instanceof Square) return shape.side ** 2;
  if (shape instanceof Rectangle) return shape.width * shape.height;
}
```
### Modify 6: Add new.target guard
**Description:** Prevent constructor from being called without new
```javascript
function Person(name) {
  this.name = name;
}
const p = Person('Alice');
```
### Modify 7: Fix factory function to work with/without new
**Description:** Make factory safe for both calling patterns
```javascript
function createPerson(name) {
  return { name };
}
const p1 = createPerson('Alice');
const p2 = new createPerson('Bob');
```
### Modify 8: Use Object.create for inheritance
**Description:** Implement classical inheritance pattern
```javascript
function Animal(name) { this.name = name; }
Animal.prototype.greet = function() { return 'Hi'; };
function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}
Dog.prototype.bark = function() { return 'Woof'; };
```
### Modify 9: Convert long function to class with methods
**Description:** Break down a long procedural function
```javascript
function processOrder(orderData) {
  if (!orderData.items || orderData.items.length === 0) return { error: 'No items' };
  let total = 0;
  orderData.items.forEach(item => { total += item.price * item.quantity; });
  if (orderData.coupon) { total *= 0.9; }
  total *= 1.08;
  db.orders.insert({ data: orderData, total });
  email.send(orderData.email, 'Order confirmed');
  return { success: true, total };
}
```
### Modify 10: Add parameter object pattern
**Description:** Replace long parameter list with config object
```javascript
function createUser(firstName, lastName, email, phone, street, city, zip, country, role) {
  // Too many parameters
}
```
### Modify 11: Fix function that modifies global state
**Description:** Encapsulate counter in a class
```javascript
let count = 0;
function increment() { count++; }
function decrement() { count--; }
function getCount() { return count; }
function reset() { count = 0; }
```
### Modify 12: Convert callback pattern to class methods
**Description:** Replace nested callbacks with class methods
```javascript
function processOrder(orderId) {
  getOrder(orderId, (order) => {
    getCustomer(order.customerId, (customer) => {
      getAddress(customer.addressId, (address) => {
        calculateShipping(address, (shipping) => {
          sendConfirmation(order, customer, address, shipping);
        });
      });
    });
  });
}
```
### Modify 13: Implement strategy pattern
**Description:** Refactor switch-based code to strategy pattern
```javascript
function sort(data, algorithm) {
  switch (algorithm) {
    case 'bubble': return bubbleSort(data);
    case 'quick': return quickSort(data);
    case 'merge': return mergeSort(data);
  }
}
```
### Modify 14: Extract validation to class
**Description:** Create a validator class
```javascript
function validateUser(data) {
  const errors = [];
  if (!data.name) errors.push('Name required');
  if (!data.email) errors.push('Email required');
  if (!data.email.includes('@')) errors.push('Invalid email');
  if (data.age < 0 || data.age > 150) errors.push('Invalid age');
  return errors;
}
```
### Modify 15: Fix prototype pollution vulnerability
**Description:** Safe object merge
```javascript
function merge(target, source) {
  for (const key in source) {
    if (key === '__proto__') continue;
    target[key] = source[key];
  }
  return target;
}
```
### Modify 16: Convert to factory function
**Description:** Create a factory function with private state
```javascript
class Counter {
  constructor() { this._count = 0; }
  increment() { this._count++; }
  getCount() { return this._count; }
}
```
### Modify 17: Use Object.freeze for constants
**Description:** Replace magic numbers with frozen constants
```javascript
function calculateDiscount(price, customerType) {
  if (customerType === 'premium' && price > 100) return price * 0.9;
  if (customerType === 'regular' && price > 200) return price * 0.95;
  return price;
}
```
### Modify 18: Refactor to use dependency injection
**Description:** Inject dependencies instead of creating inside
```javascript
class ReportService {
  generate() {
    const db = new Database();
    const data = db.query('SELECT * FROM reports');
    const email = new EmailService();
    email.send('admin@test.com', data);
  }
}
```
### Modify 19: Implement Tell, Don't Ask
**Description:** Move logic into the object
```javascript
function processOrder(order) {
  if (order.status === 'pending' && order.total > 0) {
    order.status = 'processing';
  }
}
```
### Modify 20: Fix Law of Demeter violation
**Description:** Reduce method chaining
```javascript
function getCustomerCountry(order) {
  return order.customer.address.country;
}
```
### Modify 21: Extract cohesive class from god object
**Description:** Split a large class into focused classes
```javascript
class Application {
  constructor() {
    this.db = new Database();
    this.cache = new Cache();
    this.email = new EmailService();
    this.logger = new Logger();
  }
  start() { /* start everything */ }
  processData() { /* process */ }
  sendReports() { /* email */ }
  cleanup() { /* cleanup */ }
}
```
### Modify 22: Add type checking with instanceof guard
**Description:** Guard against invalid types
```javascript
function processData(data) {
  return data.map(x => x * 2);
}
```
### Modify 23: Refactor primitive obsession
**Description:** Create value objects for primitives
```javascript
function createOrder(customerName, customerEmail, street, city, zip, cardNumber, expiryMonth, expiryYear) {
  // All primitives
}
```
### Modify 24: Implement builder pattern
**Description:** Create a builder for complex object construction
```javascript
class Pizza {
  constructor(size, crust, sauce, cheese, toppings) {
    // Too many parameters
  }
}
```
### Modify 25: Convert anemic domain model to rich model
**Description:** Add behavior to data-only class
```javascript
class User {
  constructor(name, email, status, role) {
    this.name = name;
    this.email = email;
    this.status = status;
    this.role = role;
  }
}
// Add behavior methods
```
### Modify 26: Implement observer pattern
**Description:** Add event notification to class
```javascript
class ShoppingCart {
  constructor() { this.items = []; }
  addItem(item) { this.items.push(item); }
  removeItem(id) { this.items = this.items.filter(i => i.id !== id); }
}
// Add observer support
```
### Modify 27: Refactor to use composition over inheritance
**Description:** Replace inheritance with composition
```javascript
class Engine { start() {} }
class Car extends Engine {
  drive() { this.start(); }
}
```
### Modify 28: Add null object pattern
**Description:** Create null object to avoid null checks
```javascript
function getLogger(name) {
  if (name === 'production') return new ProductionLogger();
  return null; // Causes null checks everywhere
}
```
### Modify 29: Implement decorator pattern
**Description:** Add decorator class for additional behavior
```javascript
class Coffee { cost() { return 5; } }
class MilkCoffee extends Coffee { cost() { return 6; } }
class SugarCoffee extends Coffee { cost() { return 5.5; } }
// Refactor to proper decorator pattern
```
### Modify 30: Convert function chain to fluent interface
**Description:** Make methods chainable
```javascript
function query() { /* ... */ }
function where(condition) { /* ... */ }
function orderBy(field) { /* ... */ }
function limit(n) { /* ... */ }
// Convert to a class with chainable methods
```
### Modify 31: Implement factory method pattern
**Description:** Create factory methods for different types
```javascript
class Document {
  constructor(type) {
    if (type === 'pdf') { /* PDF setup */ }
    else if (type === 'html') { /* HTML setup */ }
    else if (type === 'text') { /* Text setup */ }
  }
}
```
### Modify 32: Add repository pattern
**Description:** Abstract data access behind repository
```javascript
// Direct database calls everywhere
function getUser(id) { return db.query('SELECT * FROM users WHERE id = ?', [id]); }
function saveUser(user) { return db.insert('users', user); }
```
### Modify 33: Implement unit of work pattern
**Description:** Track changes and commit together
```javascript
// Multiple separate database calls
function updateOrder(order) { db.orders.update(order); }
function updateInventory(items) { db.inventory.update(items); }
function logChange(log) { db.audit.insert(log); }
```
### Modify 34: Add specification pattern
**Description:** Encapsulate business rules
```javascript
function isEligibleForDiscount(order) {
  return order.total > 100 && order.customer.isMember && !order.hasCoupon;
}
```
### Modify 35: Refactor to use template method
**Description:** Extract algorithm skeleton to base class
```javascript
// Duplicated algorithm structure
function generateHTMLReport(data) { fetch(data); format(); renderHTML(); }
function generatePDFReport(data) { fetch(data); format(); renderPDF(); }
function generateCSVReport(data) { fetch(data); format(); renderCSV(); }
```
### Modify 36: Implement command pattern
**Description:** Encapsulate operations as objects
```javascript
// Direct function calls
function saveDocument(doc) { /* save */ }
function printDocument(doc) { /* print */ }
function emailDocument(doc) { /* email */ }
```
### Modify 37: Add memento pattern for undo
**Description:** Save and restore object state
```javascript
class TextEditor {
  constructor() { this.text = ''; }
  type(text) { this.text += text; }
}
// Add undo capability
```
### Modify 38: Implement state pattern
**Description:** Encapsulate state-specific behavior
```javascript
class TrafficLight {
  constructor() { this.state = 'red'; }
  change() {
    if (this.state === 'red') this.state = 'green';
    else if (this.state === 'green') this.state = 'yellow';
    else if (this.state === 'yellow') this.state = 'red';
  }
}
```
### Modify 39: Refactor to use mediator pattern
**Description:** Reduce coupling between classes
```javascript
class ChatRoom {
  sendMessage(user, message) { /* direct user-to-user */ }
}
class User {
  send(message) { this.room.sendMessage(this, message); }
}
```
### Modify 40: Add visitor pattern
**Description:** Separate algorithm from object structure
```javascript
class Element { accept(v) {} }
class TextElement extends Element {}
class ImageElement extends Element {}
// Implement export visitor
```
### Modify 41: Implement chain of responsibility
**Description:** Create handler chain for processing
```javascript
function validate(data) { /* ... */ }
function sanitize(data) { /* ... */ }
function process(data) { /* ... */ }
function format(data) { /* ... */ }
// All called in order manually
```
### Modify 42: Add proxy pattern for access control
**Description:** Control access to real object
```javascript
class RealAPI {
  fetchData() { return sensitiveData; }
}
// Add proxy that checks permissions
```
### Modify 43: Implement flyweight pattern
**Description:** Share common state across objects
```javascript
class Character {
  constructor(char, font, size, color, bold, italic) {
    // Intrinsic and extrinsic mixed
  }
}
```
### Modify 44: Convert async callbacks to class methods
**Description:** Replace callback pyramid with clean class
```javascript
function loadData(url) {
  return fetch(url)
    .then(r => r.json())
    .then(d => process(d))
    .then(r => save(r))
    .catch(e => handle(e));
}
```
### Modify 45: Add plugin/extension system
**Description:** Make class extensible via plugins
```javascript
class CoreProcessor {
  process(data) {
    // Core processing
  }
}
// Add plugin registration
```
### Modify 46: Implement service locator pattern
**Description:** Central registry for services
```javascript
// Manual dependency passing everywhere
function handler(req, res, db, email, logger) {
  // ...
}
```
### Modify 47: Add façade pattern
**Description:** Simplify complex subsystem interface
```javascript
// Complex subsystem
class CPU { freeze() {}; jump(pos) {}; execute() {}; }
class Memory { load(pos, data) {}; }
class HardDrive { read(lba, size) {}; }
// Add ComputerFacade
```
### Modify 48: Implement adapter pattern
**Description:** Make incompatible interfaces work together
```javascript
class OldAPI {
  getUser(id) { return { id, name: 'Old', email: 'old@test.com' }; }
}
class NewAPI {
  fetchUser(id) { return { id, displayName: 'New', emailAddress: 'new@test.com' }; }
}
// Add adapter
```
### Modify 49: Refactor to use async/await with classes
**Description:** Convert promise chains to async methods
```javascript
class DataService {
  loadAndProcess() {
    return fetch('/api/data')
      .then(r => r.json())
      .then(d => this.transform(d))
      .then(d => this.save(d));
  }
}
```
### Modify 50: Create proper encapsulation boundary
**Description:** Refactor to hide implementation details
```javascript
class TemperatureConverter {
  toCelsius(f) { return (f - 32) * 5 / 9; }
  toFahrenheit(c) { return c * 9 / 5 + 32; }
  // Internal helper exposed
  validateRange(temp) { return temp > -273.15; }
}
```
