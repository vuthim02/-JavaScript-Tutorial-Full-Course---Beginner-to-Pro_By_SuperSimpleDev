# Level 87: Module 18 – The `this` Keyword, Binding & Context

## Error Snippets (70)

### Error 1: this in regular function losing context
**Description:** Regular function inside method doesn't capture this from method
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
### Error 2: this in arrow function referring to wrong scope
**Description:** Arrow function in object literal captures global this, not object
```javascript
const obj = {
  value: 42,
  getValue: () => {
    return this.value;
  }
};
console.log(obj.getValue());
```
### Error 3: This in event handler pointing to DOM element
**Description:** Event handler this refers to element, not class instance
```javascript
class Button {
  constructor(label) { this.label = label; }
  handleClick() {
    console.log(this.label + ' clicked');
  }
}
const btn = new Button('Submit');
document.querySelector('button').addEventListener('click', btn.handleClick);
```
### Error 4: Forgetting to bind method passed as callback
**Description:** Method loses this when passed as standalone reference
```javascript
class Logger {
  constructor(prefix) { this.prefix = prefix; }
  log(msg) { console.log(this.prefix + msg); }
}
const logger = new Logger('[APP]');
['hello', 'world'].forEach(logger.log);
```
### Error 5: this in nested object method
**Description:** this in nested object refers to the inner object
```javascript
const app = {
  name: 'MyApp',
  modules: {
    name: 'Auth',
    getName() {
      return this.name;
    }
  }
};
console.log(app.modules.getName());
```
### Error 6: this in static method referring to instance
**Description:** Static method's this is the class, not an instance
```javascript
class Config {
  constructor() { this.value = 'test'; }
  static getValue() {
    return this.value;
  }
}
const c = new Config();
console.log(Config.getValue());
```
### Error 7: this in global scope
**Description:** this at the top level refers to global object or module.exports
```javascript
console.log(this === window);
```
### Error 8: this in constructor returning different object
**Description:** Constructor returning an object makes this refer to returned object
```javascript
class Custom {
  constructor() {
    this.name = 'instance';
    return { name: 'other' };
  }
}
const c = new Custom();
console.log(c.name);
```
### Error 9: this in class field arrow function
**Description:** Arrow function in class field captures this of instance
```javascript
class MyClass {
  value = 42;
  getValue = () => {
    return this.value;
  }
}
const obj = new MyClass();
const fn = obj.getValue;
console.log(fn());
```
### Error 10: this in setTimeout with object method
**Description:** setTimeout runs function with global this
```javascript
const obj = {
  name: 'Object',
  delayed() {
    setTimeout(function() {
      console.log(this.name);
    }, 100);
  }
};
obj.delayed();
```
### Error 11: this in prototype method called without object
**Description:** Calling prototype method directly loses this
```javascript
class Person {
  constructor(name) { this.name = name; }
  greet() { return 'Hi, ' + this.name; }
}
const greet = Person.prototype.greet;
console.log(greet());
```
### Error 12: this in destructured method
**Description:** Destructuring a method from object loses its this
```javascript
const calculator = {
  value: 10,
  add(x) { return this.value + x; }
};
const { add } = calculator;
console.log(add(5));
```
### Error 13: this in getter called from wrong context
**Description:** Getter this depends on what object it's accessed on
```javascript
class User {
  constructor(name) { this._name = name; }
  get name() { return this._name; }
}
const u = new User('Alice');
const getName = Object.getOwnPropertyDescriptor(User.prototype, 'name').get;
console.log(getName());
```
### Error 14: this in tagged template literal
**Description:** Tagged template receives different this
```javascript
function tag(strings, ...values) {
  return this.prefix + strings[0];
}
const obj = { prefix: '>>' };
obj.tag = tag;
console.log(obj.tag`hello`);
```
### Error 15: this in eval context
**Description:** eval has its own this context
```javascript
const obj = { x: 10 };
eval('console.log(this.x)');
```
### Error 16: this in arrow function with call/apply
**Description:** call/apply cannot rebind arrow function's this
```javascript
const obj = { value: 42 };
const arrow = () => this.value;
console.log(arrow.call(obj));
```
### Error 17: this in function called from global setTimeout
**Description:** setTimeout's callback this is the global object
```javascript
const name = 'Global';
const obj = { name: 'Object' };
setTimeout(function() {
  console.log(this.name);
}, 100);
```
### Error 18: this in bound function losing arguments
**Description:** bind creates a new function; arguments passed separately
```javascript
function multiply(a, b) { return a * b; }
const double = multiply.bind(null, 2);
console.log(double(5, 10)); // What is this?
```
### Error 19: this in immediate IIFE
**Description:** IIFE loses outer this by default
```javascript
const obj = {
  value: 'test',
  init() {
    (function() {
      console.log(this.value);
    })();
  }
};
obj.init();
```
### Error 20: this in class field default value
**Description:** Class field initializers run with instance this
```javascript
class MyClass {
  value = this.getName();
  getName() { return 'Alice'; }
}
console.log(new MyClass().value);
```
### Error 21: this in super call
**Description:** super.prop refers to parent's this, which is child instance
```javascript
class Parent {
  constructor() { this.name = 'Parent'; }
}
class Child extends Parent {
  constructor() {
    super();
    console.log(super.name);
  }
}
new Child();
```
### Error 22: this in nested arrow inside regular function
**Description:** Arrow inside regular captures surrounding this
```javascript
const obj = {
  values: [1, 2, 3],
  multiply(factor) {
    return this.values.map(function(v) {
      return v * this.factor; // this is wrong here
    });
  }
};
```
### Error 23: this in Promise executor
**Description:** Promise executor receives this = undefined in strict mode
```javascript
class Task {
  constructor() { this.data = 'task data'; }
  run() {
    return new Promise(function(resolve) {
      resolve(this.data);
    });
  }
}
```
### Error 24: this in default parameter
**Description:** Default parameters have their own scope for this
```javascript
const obj = {
  value: 10,
  method(x = this.value) {
    return x;
  }
};
console.log(obj.method());
```
### Error 25: this in object setter
**Description:** Setter's this is the object it's defined on
```javascript
const obj = {
  _value: 0,
  set value(v) {
    this._value = v;
  }
};
const setter = Object.getOwnPropertyDescriptor(obj, 'value').set;
setter(42);
console.log(obj._value);
```
### Error 26: this in Proxy get trap
**Description:** Proxy handler's this is the handler, not the target
```javascript
const handler = {
  name: 'handler',
  get(target, prop) {
    return this.name;
  }
};
const proxy = new Proxy({}, handler);
console.log(proxy.anything);
```
### Error 27: this in Reflect methods
**Description:** Reflect methods pass receiver for this
```javascript
const obj = { x: 1 };
console.log(Reflect.get(obj, 'x'));
```
### Error 28: this in function with new.target
**Description:** new.target is undefined in regular calls
```javascript
function MyClass() {
  if (!new.target) {
    return new MyClass();
  }
  this.value = 1;
}
const result = MyClass();
console.log(result.value);
```
### Error 29: this in mixin functions
**Description:** Mixin's this depends on how it's called
```javascript
const sayHiMixin = {
  sayHi() {
    return `Hi, ${this.name}`;
  }
};
class User {
  constructor(name) { this.name = name; }
}
Object.assign(User.prototype, sayHiMixin);
console.log(new User('Alice').sayHi());
```
### Error 30: this in computed property name
**Description:** Computed property name expression has no this
```javascript
const obj = {
  name: 'test',
  ['prefix_' + this.name]: 'value'
};
console.log(obj.prefix_test);
```
### Error 31: this in arrow in constructor
**Description:** Arrow in constructor captures constructor's this
```javascript
class MyClass {
  constructor() {
    this.value = 42;
    const fn = () => this.value;
    this.get = fn;
  }
}
const obj = new MyClass();
console.log(obj.get());
```
### Error 32: this in function returned from method
**Description:** Returned function loses original this
```javascript
const obj = {
  value: 10,
  getAdder() {
    return function(x) {
      return this.value + x;
    };
  }
};
const adder = obj.getAdder();
console.log(adder(5));
```
### Error 33: this in array method callback
**Description:** Array method callback thisArg not provided
```javascript
const obj = {
  multiplier: 2,
  double(arr) {
    return arr.map(function(n) {
      return n * this.multiplier;
    });
  }
};
```
### Error 34: this in generator function
**Description:** Generator function this varies based on how called
```javascript
class Sequence {
  constructor(start) { this.start = start; }
  *gen() {
    yield this.start;
    yield this.start + 1;
  }
}
const seq = new Sequence(10);
const g = seq.gen();
console.log(g.next().value);
```
### Error 35: this in async function
**Description:** Async function follows same this rules as regular functions
```javascript
class Fetcher {
  constructor(url) { this.url = url; }
  async fetch() {
    return await fetch(this.url);
  }
}
const f = new Fetcher('/api/data');
const fetchFn = f.fetch;
fetchFn();
```
### Error 36: this in destructured object property
**Description:** Destructuring changes this reference
```javascript
const config = {
  name: 'config',
  getName() { return this.name; }
};
const { getName } = config;
console.log(getName());
```
### Error 37: this in class extends expression
**Description:** extends expression evaluates with undefined this
```javascript
const mixin = (Base) => class extends Base {
  getValue() { return this.value; }
};
class Base { constructor() { this.value = 'base'; } }
const Mixed = mixin(Base);
const obj = new Mixed();
console.log(obj.getValue());
```
### Error 38: this in with statement (deprecated)
**Description:** with statement changes this resolution
```javascript
const obj = { x: 10 };
with (obj) {
  console.log(x);
}
```
### Error 39: this in getter/setter descriptor
**Description:** Descriptor this depends on the object
```javascript
let value = 0;
const descriptor = {
  get() { return value; },
  set(v) { value = v; }
};
Object.defineProperty({}, 'prop', descriptor);
```
### Error 40: this in Symbol.toPrimitive
**Description:** toPrimitive's this is the object it's called on
```javascript
const obj = {
  value: 42,
  [Symbol.toPrimitive](hint) {
    return this.value;
  }
};
console.log(+obj);
```
### Error 41: this in weak reference callbacks
**Description:** WeakRef deref doesn't maintain this
```javascript
class MyClass {
  constructor() { this.ref = new WeakRef(this); }
  getInstance() {
    return this.ref.deref();
  }
}
```
### Error 42: this in FinalizationRegistry callback
**Description:** Cleanup callback has its own this
```javascript
class Resource {
  constructor() {
    const registry = new FinalizationRegistry(() => {
      console.log(this.name + ' cleaned');
    });
    registry.register(this, 'cleanup');
  }
}
```
### Error 43: this in array destructuring default
**Description:** Default value in destructuring has its own scope
```javascript
const obj = {
  value: 42,
  getFirst(arr = [this.value]) {
    return arr[0];
  }
};
console.log(obj.getFirst());
```
### Error 44: this in rest parameter function
**Description:** Rest parameters don't affect this binding
```javascript
const obj = {
  value: 10,
  sum(...args) {
    return args.reduce((a, b) => a + b, this.value);
  }
};
const sum = obj.sum;
console.log(sum(1, 2, 3));
```
### Error 45: this in tail call optimization
**Description:** TCO doesn't change this binding
```javascript
function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc);
}
```
### Error 46: this in accessor property from prototype
**Description:** Accessor defined on prototype uses instance as this
```javascript
class Parent {
  get value() { return this._value || 0; }
  set value(v) { this._value = v; }
}
class Child extends Parent {}
const c = new Child();
c.value = 42;
console.log(c.value);
```
### Error 47: this in method borrowed from another object
**Description:** Borrowing a method from a different object
```javascript
const obj1 = { name: 'obj1', getName() { return this.name; } };
const obj2 = { name: 'obj2' };
obj2.getName = obj1.getName;
console.log(obj2.getName());
```
### Error 48: this in Object.assign mixin
**Description:** Assign mixes methods but this depends on caller
```javascript
const canEat = { eat() { return this.food; } };
class Animal {
  constructor(food) { this.food = food; }
}
Object.assign(Animal.prototype, canEat);
const a = new Animal('grass');
console.log(a.eat());
```
### Error 49: this in function property on class instance
**Description:** Function assigned to instance property has instance this
```javascript
class MyClass {
  constructor() {
    this.method = function() { return this; };
  }
}
const obj = new MyClass();
const fn = obj.method;
console.log(fn() === obj);
```
### Error 50: this in arrow function with new (impossible)
**Description:** Arrow functions cannot be constructors
```javascript
const Arrow = () => { this.x = 1; };
const obj = new Arrow();
```
### Error 51: this in static initialization block
**Description:** Static block this refers to the class constructor
```javascript
class MyClass {
  static {
    this.x = 10;
    console.log(this.name);
  }
}
```
### Error 52: this in module scope
**Description:** ES modules have undefined this at top level
```javascript
// In an ES module:
console.log(this);
```
### Error 53: this in setTimeout with arrow function
**Description:** Arrow in setTimeout captures surrounding this
```javascript
class Timer {
  constructor() { this.seconds = 0; }
  start() {
    setTimeout(() => {
      this.seconds++;
    }, 1000);
  }
}
const t = new Timer();
t.start();
```
### Error 54: this in nested ternary evaluation
**Description:** Ternary doesn't affect this binding
```javascript
const obj = { val: 1 };
const result = true ? obj.getValue() : 0;
```
### Error 55: this in class field arrow vs prototype method
**Description:** Arrow field creates per-instance function
```javascript
class A {
  method1() { return 'proto'; }
  method2 = () => { return 'field'; }
}
const a = new A();
console.log(a.hasOwnProperty('method1'), a.hasOwnProperty('method2'));
```
### Error 56: this in call with primitive receiver
**Description:** Call with primitive this gets wrapped
```javascript
function getType() { return typeof this; }
console.log(getType.call(42));
```
### Error 57: this in null receiver (strict mode)
**Description:** null/undefined this results in global in sloppy, undefined in strict
```javascript
function checkThis() {
  return this;
}
console.log(checkThis.call(null));
```
### Error 58: this in bound function new call
**Description:** new ignores bind, creates new instance
```javascript
function MyClass(value) {
  this.value = value;
}
const BoundClass = MyClass.bind(null, 42);
const obj = new BoundClass();
console.log(obj.value);
```
### Error 59: this in arrow function as object method
**Description:** Arrow defined as object method doesn't get object this
```javascript
const obj = {
  name: 'test',
  show: () => console.log(this.name)
};
obj.show();
```
### Error 60: this in function in class field initializer
**Description:** Regular function in class field gets instance this
```javascript
class MyClass {
  value = 42;
  fn = function() { return this.value; };
}
const obj = new MyClass();
console.log(obj.fn());
```
### Error 61: this in indirect eval
**Description:** Indirect eval uses global this
```javascript
const obj = { x: 1 };
const evil = eval;
evil('console.log(this.x)');
```
### Error 62: this in getter defined on global object
**Description:** Global getter this is the global object
```javascript
Object.defineProperty(globalThis, 'myProp', {
  get() { return this; }
});
console.log(myProp);
```
### Error 63: this in spread element in function call
**Description:** Spread doesn't affect this binding
```javascript
const obj = { value: 10, add(x, y) { return this.value + x + y; } };
const args = [1, 2];
console.log(obj.add(...args));
```
### Error 64: this in tagged template from different context
**Description:** Tagged template this is the calling context
```javascript
function tag(strings) {
  return this.name;
}
const obj = { name: 'test', tag };
console.log(obj.tag`hello`);
```
### Error 65: this in optional chaining
**Description:** Optional chaining doesn't affect this binding
```javascript
const obj = { method() { return this; } };
const result = obj?.method();
console.log(result === obj);
```
### Error 66: this in nullish coalescing
**Description:** ?? doesn't affect this
```javascript
const obj = { method() { return this; } };
const result = obj.method() ?? 'default';
console.log(result === obj);
```
### Error 67: this in logical assignment
**Description:** &&=, ||=, ??= don't affect this
```javascript
const obj = { x: null };
obj.x ??= this;
console.log(obj.x);
```
### Error 68: this in decorator (legacy)
**Description:** Decorator functions have their own this context
```javascript
function log(target, key, descriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args) {
    console.log(`Calling ${key} with this=`, this);
    return original.apply(this, args);
  };
}
class MyClass {
  @log
  method() { return 42; }
}
```
### Error 69: this in Symbol.species accessor
**Description:** Symbol.species is a static accessor
```javascript
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
const arr = new MyArray(1, 2, 3);
const mapped = arr.map(x => x * 2);
console.log(mapped instanceof MyArray);
```
### Error 70: this in Proxy construct trap
**Description:** Construct trap this is the handler
```javascript
const handler = {
  construct(target, args) {
    return new target(...args);
  }
};
const ProxyClass = new Proxy(class {}, handler);
const obj = new ProxyClass();
console.log(obj instanceof ProxyClass);
```

## Issue Snippets (30)

### Issue 1: Overusing arrow functions to fix this
**Description:** Using arrow functions everywhere instead of proper binding
```javascript
class Timer {
  constructor() { this.count = 0; }
  start = () => {
    setInterval(() => {
      this.count++;
    }, 1000);
  }
  stop = () => {
    clearInterval(this._interval);
  }
}
```
### Issue 2: Not understanding implicit binding loss
**Description:** Passing method as callback without bind
```javascript
class User {
  constructor(name) { this.name = name; }
  greet() { console.log('Hello ' + this.name); }
}
const user = new User('Alice');
setTimeout(user.greet, 1000);
```
### Issue 3: Using self = this pattern instead of arrow/bind
**Description:** Old pattern of capturing this to a variable
```javascript
class Timer {
  constructor() { this.seconds = 0; }
  start() {
    const self = this;
    setInterval(function() {
      self.seconds++;
    }, 1000);
  }
}
```
### Issue 4: Unnecessary bind in constructor
**Description:** Binding methods that don't need binding
```javascript
class Counter {
  constructor() {
    this.count = 0;
    this.increment = this.increment.bind(this);
  }
  increment() {
    this.count++;
  }
  getCount() {
    return this.count;
  }
}
```
### Issue 5: Confusing this in object literal methods
**Description:** Mixing regular and arrow methods in object literals
```javascript
const obj = {
  name: 'obj',
  regular() { return this.name; },
  arrow: () => { return this.name; },
  inner: {
    name: 'inner',
    method() { return this.name; }
  }
};
```
### Issue 6: Not passing thisArg to array methods
**Description:** Forgetting the second argument to map/filter/forEach
```javascript
class Processor {
  constructor(factor) { this.factor = factor; }
  process(arr) {
    return arr.map(function(item) {
      return item * this.factor;
    });
  }
}
```
### Issue 7: Binding methods multiple times
**Description:** Creating new bound functions every render
```javascript
class Component {
  constructor() { this.count = 0; }
  render() {
    const btn = document.createElement('button');
    btn.addEventListener('click', this.handleClick.bind(this));
    btn.addEventListener('mouseover', this.handleHover.bind(this));
  }
}
```
### Issue 8: Losing this in destructured imports
**Description:** Imported methods lose their original this
```javascript
import { validate } from './validator';
const obj = { name: 'test' };
obj.validate = validate;
obj.validate();
```
### Issue 9: This in nested callbacks in class methods
**Description:** Multiple levels of nested callbacks lose this
```javascript
class DataService {
  constructor() { this.data = []; }
  load() {
    fetch('/api/data')
      .then(function(res) { return res.json(); })
      .then(function(data) {
        this.data = data;
      });
  }
}
```
### Issue 10: Not realizing this in event handlers
**Description:** React event handlers and this
```javascript
class Toggle extends React.Component {
  constructor() { this.state = { on: false }; }
  handleClick() {
    this.setState({ on: !this.state.on });
  }
  render() {
    return <button onClick={this.handleClick}>Toggle</button>;
  }
}
```
### Issue 11: This in setTimeout with object literal
**Description:** Object literal method passed to setTimeout loses this
```javascript
const obj = {
  name: 'test',
  delayed() {
    setTimeout(function() {
      console.log(this.name);
    }, 100);
  }
};
```
### Issue 12: Implicit and explicit binding confusion
**Description:** Not understanding binding precedence
```javascript
function foo() { console.log(this.x); }
const obj1 = { x: 1, foo };
const obj2 = { x: 2 };
obj1.foo();
obj1.foo.call(obj2);
const bound = obj1.foo.bind(obj1);
bound.call(obj2);
```
### Issue 13: This in class field vs prototype confusion
**Description:** Not knowing when methods are created per instance vs shared
```javascript
class A {
  method1() {} // On prototype
  method2 = () => {} // On instance
}
```
### Issue 14: This in React.createClass (legacy)
**Description:** Old React auto-binding behavior
```javascript
const MyComponent = React.createClass({
  handleClick() {
    console.log(this); // Auto-bound
  }
});
```
### Issue 15: This in jQuery event handlers
**Description:** jQuery sets this to DOM element in event handlers
```javascript
class Widget {
  constructor() { this.name = 'widget'; }
  bind() {
    $('#btn').click(function() {
      console.log(this.name); // this is button, not Widget
    });
  }
}
```
### Issue 16: This in async generator
**Description:** Async generator this depends on how it's invoked
```javascript
class Stream {
  constructor() { this.data = [1, 2, 3]; }
  async *generate() {
    for (const item of this.data) {
      yield await Promise.resolve(item);
    }
  }
}
```
### Issue 17: This in (new Function) constructors
**Description:** Function created with new Function has global this
```javascript
const fn = new Function('return this');
console.log(fn());
```
### Issue 18: Not accounting for strict mode this = undefined
**Description:** In strict mode, default this is undefined
```javascript
'use strict';
function showThis() {
  console.log(this);
}
showThis(); // undefined
```
### Issue 19: This in module getter context
**Description:** Module exports getter loses this
```javascript
let _value = 0;
export function getValue() { return _value; }
export function setValue(v) { _value = v; }
```
### Issue 20: This in Web Worker context
**Description:** Workers have different global this
```javascript
self.onmessage = function(e) {
  console.log(this); // self
};
```
### Issue 21: This in Service Worker
**Description:** Service worker this is the worker global scope
```javascript
self.addEventListener('install', function(event) {
  console.log(this); // self
});
```
### Issue 22: This in constructor that returns object
**Description:** Returning an object from constructor changes this
```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}
```
### Issue 23: This in Proxy apply trap
**Description:** Apply trap receives target this
```javascript
const handler = {
  apply(target, thisArg, args) {
    return target.apply(thisArg, args);
  }
};
```
### Issue 24: This in dynamic import callback
**Description:** Dynamic import then callback has its own this
```javascript
class ModuleLoader {
  constructor() { this.modules = []; }
  load(path) {
    import(path).then(function(module) {
      this.modules.push(module);
    });
  }
}
```
### Issue 25: This in Symbol.toStringTag
**Description:** toStringTag doesn't affect this
```javascript
class MyClass {
  get [Symbol.toStringTag]() { return 'MyClass'; }
}
const obj = new MyClass();
console.log(Object.prototype.toString.call(obj));
```
### Issue 26: This in iterator return/throw
**Description:** Iterator return/throw methods have their own this
```javascript
class MyIterable {
  constructor() { this.items = [1, 2, 3]; }
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({ value: this.items[index++], done: index > this.items.length })
    };
  }
}
```
### Issue 27: This in async event emitter
**Description:** Async event handlers have different this
```javascript
class AsyncEmitter {
  async emit(event) {
    const handlers = this.listeners[event];
    for (const handler of handlers) {
      await handler();
    }
  }
}
```
### Issue 28: This in RxJS subscriptions
**Description:** Observable subscription callbacks lose this
```javascript
class DataStream {
  constructor() { this.data = []; }
  subscribe(observable) {
    observable.subscribe(function(value) {
      this.data.push(value);
    });
  }
}
```
### Issue 29: This in Vue.js methods
**Description:** Vue methods this is the Vue instance
```javascript
new Vue({
  data: { count: 0 },
  methods: {
    increment() {
      this.count++;
    }
  }
});
```
### Issue 30: This in Angular zone callbacks
**Description:** Angular zone.run outside has different this
```javascript
class MyService {
  constructor(private zone: NgZone) {}
  runOutside() {
    this.zone.runOutsideAngular(() => {
      // this is MyService
    });
  }
}
```

## Modification Snippets (50)

### Modify 1: Fix this in setTimeout callback
**Description:** Use arrow function to preserve this in Timer.start
```javascript
class Timer {
  constructor() { this.seconds = 0; }
  start() {
    setInterval(function() {
      this.seconds++;
    }, 1000);
  }
}
```
### Modify 2: Bind method for event handler
**Description:** Bind handleClick to preserve this in event handler
```javascript
class Button {
  constructor(label) { this.label = label; }
  handleClick() {
    console.log(this.label + ' clicked');
  }
  attach() {
    document.querySelector('button').addEventListener('click', this.handleClick);
  }
}
```
### Modify 3: Use bind in constructor
**Description:** Bind method in constructor for reliable this
```javascript
class Logger {
  constructor(prefix) { this.prefix = prefix; }
  log(msg) { console.log(this.prefix + msg); }
  start() {
    ['hello', 'world'].forEach(this.log);
  }
}
```
### Modify 4: Use thisArg in array methods
**Description:** Pass this as second argument to forEach
```javascript
class Multiplier {
  constructor(factor) { this.factor = factor; }
  multiply(arr) {
    return arr.map(function(n) {
      return n * this.factor;
    });
  }
}
```
### Modify 5: Convert regular function to arrow
**Description:** Replace regular callback with arrow in Promise
```javascript
class DataService {
  constructor() { this.data = []; }
  load() {
    fetch('/api/data')
      .then(function(res) { return res.json(); })
      .then(function(data) {
        this.data = data;
      });
  }
}
```
### Modify 6: Fix this in nested object method
**Description:** Use arrow function or capture outer this
```javascript
const app = {
  name: 'MyApp',
  modules: {
    name: 'Auth',
    getName() {
      return this.name;
    },
    getAppName() {
      return app.name; // Fix to use correct this
    }
  }
};
```
### Modify 7: Preserve this in destructured method
**Description:** Keep this when destructuring method from object
```javascript
const calculator = {
  value: 10,
  add(x) { return this.value + x; }
};
const { add } = calculator;
console.log(add(5));
```
### Modify 8: Fix this in IIFE inside method
**Description:** Capture this for IIFE inside class method
```javascript
class ConfigLoader {
  constructor() { this.config = {}; }
  load() {
    (function() {
      this.config = { theme: 'dark' };
    })();
  }
}
```
### Modify 9: Correct this in Promise executor
**Description:** Fix this reference inside Promise constructor
```javascript
class Task {
  constructor() { this.data = 'task data'; }
  run() {
    return new Promise(function(resolve) {
      resolve(this.data);
    });
  }
}
```
### Modify 10: Fix this in generator method
**Description:** Use correct this reference in generator
```javascript
class Sequence {
  constructor(start) { this.start = start; }
  *gen() {
    yield this.start;
    yield this.start + 1;
  }
}
const seq = new Sequence(10);
const g = seq.gen();
```
### Modify 11: Preserve this in async function passed as callback
**Description:** Keep this when extracting async method
```javascript
class Fetcher {
  constructor(url) { this.url = url; }
  async fetch() {
    return await fetch(this.url);
  }
}
const f = new Fetcher('/api/data');
const fetchFn = f.fetch;
fetchFn();
```
### Modify 12: Fix this in class field arrow for callback
**Description:** Use class field arrow to capture this
```javascript
class MyClass {
  value = 42;
  getValue() { return this.value; }
}
const obj = new MyClass();
const fn = obj.getValue;
console.log(fn());
```
### Modify 13: Use call to invoke with correct this
**Description:** Use .call to explicitly set this
```javascript
const obj = { name: 'test' };
function greet() { return 'Hello ' + this.name; }
console.log(greet());
```
### Modify 14: Use apply for variadic this
**Description:** Use .apply to pass array with correct this
```javascript
const obj = { multiplier: 2 };
function multiplyAll(...nums) {
  return nums.map(n => n * this.multiplier);
}
console.log(multiplyAll(1, 2, 3));
```
### Modify 15: Use arrow function in object method
**Description:** Convert object method to arrow where appropriate
```javascript
const obj = {
  values: [1, 2, 3],
  multiply(factor) {
    return this.values.map(function(v) {
      return v * factor;
    });
  }
};
```
### Modify 16: Fix this in class extends with mixin
**Description:** Ensure correct this in mixin methods
```javascript
const sayHiMixin = {
  sayHi() { return `Hi, ${this.name}`; }
};
class User {
  constructor(name) { this.name = name; }
}
Object.assign(User.prototype, sayHiMixin);
console.log(new User('Alice').sayHi());
```
### Modify 17: Correct this in method borrowing
**Description:** Fix this when borrowing method from another object
```javascript
const obj1 = { name: 'obj1', getName() { return this.name; } };
const obj2 = { name: 'obj2' };
obj2.getName = obj1.getName;
console.log(obj2.getName());
```
### Modify 18: Fix this in returned function
**Description:** Use arrow to preserve this in returned function
```javascript
const obj = {
  value: 10,
  getAdder() {
    return function(x) {
      return this.value + x;
    };
  }
};
const adder = obj.getAdder();
console.log(adder(5));
```
### Modify 19: Fix this in Proxy handler
**Description:** Use correct this reference in Proxy trap
```javascript
const handler = {
  name: 'handler',
  get(target, prop) {
    return this.name;
  }
};
const proxy = new Proxy({}, handler);
console.log(proxy.anything);
```
### Modify 20: Fix this in static method
**Description:** Use class name instead of this in static
```javascript
class Config {
  constructor() { this.value = 'test'; }
  static getValue() {
    return this.value;
  }
}
const c = new Config();
console.log(Config.getValue());
```
### Modify 21: Use arrow function for React event handler
**Description:** Fix this binding in React component
```javascript
class Toggle extends React.Component {
  constructor() { this.state = { on: false }; }
  handleClick() {
    this.setState({ on: !this.state.on });
  }
  render() {
    return <button onClick={this.handleClick}>Toggle</button>;
  }
}
```
### Modify 22: Fix this in jQuery event handler
**Description:** Use arrow or bind in jQuery handler
```javascript
class Widget {
  constructor() { this.name = 'widget'; }
  bind() {
    $('#btn').click(function() {
      console.log(this.name);
    });
  }
}
```
### Modify 23: Correct this in Vue method
**Description:** Ensure this works in Vue method callbacks
```javascript
new Vue({
  data: { count: 0 },
  methods: {
    delayedIncrement() {
      setTimeout(function() {
        this.count++;
      }, 1000);
    }
  }
});
```
### Modify 24: Fix this in Angular zone callback
**Description:** Use arrow function or capture this in zone
```javascript
class MyService {
  constructor(private zone: NgZone) {}
  runOutside() {
    this.zone.runOutsideAngular(function() {
      console.log(this);
    });
  }
}
```
### Modify 25: Use bind to partially apply arguments
**Description:** Use bind with null this to create partial function
```javascript
function multiply(a, b) { return a * b; }
const double = multiply(2);
console.log(double(5));
```
### Modify 26: Fix this in RxJS subscription
**Description:** Use arrow or bind in observable subscribe
```javascript
class DataStream {
  constructor() { this.data = []; }
  subscribe(observable) {
    observable.subscribe(function(value) {
      this.data.push(value);
    });
  }
}
```
### Modify 27: Fix this in dynamic import
**Description:** Preserve this in dynamic import .then callback
```javascript
class ModuleLoader {
  constructor() { this.modules = []; }
  load(path) {
    import(path).then(function(module) {
      this.modules.push(module);
    });
  }
}
```
### Modify 28: Correct this in forEach with object method
**Description:** Fix this in array forEach callback
```javascript
class Processor {
  constructor(factor) { this.factor = factor; }
  process(arr) {
    arr.forEach(function(item) {
      console.log(item * this.factor);
    });
  }
}
```
### Modify 29: Fix this in requestAnimationFrame
**Description:** Preserve this in animation frame callback
```javascript
class Animator {
  constructor() { this.position = 0; }
  animate() {
    requestAnimationFrame(function() {
      this.position++;
      this.animate();
    });
  }
}
```
### Modify 30: Use arrow function in addEventListener
**Description:** Fix this in event listener
```javascript
class Dropdown {
  constructor() { this.open = false; }
  toggle() {
    document.addEventListener('click', function() {
      this.open = false;
    });
  }
}
```
### Modify 31: Correct this in Worker message handler
**Description:** Fix this Web Worker message handler
```javascript
class WorkerClient {
  constructor() { this.worker = new Worker('worker.js'); this.results = []; }
  init() {
    this.worker.onmessage = function(e) {
      this.results.push(e.data);
    };
  }
}
```
### Modify 32: Fix this in setInterval with class
**Description:** Use arrow function in setInterval
```javascript
class Poller {
  constructor() { this.data = null; }
  start() {
    setInterval(function() {
      this.data = fetch('/api/update');
    }, 5000);
  }
}
```
### Modify 33: Fix this in callback-based API
**Description:** Preserve this in Node.js callback pattern
```javascript
class FileReader {
  constructor() { this.content = ''; }
  read(path) {
    require('fs').readFile(path, 'utf8', function(err, data) {
      this.content = data;
    });
  }
}
```
### Modify 34: Correct this in Redux middleware
**Description:** Fix this in custom Redux middleware
```javascript
class AnalyticsMiddleware {
  constructor() { this.events = []; }
  middleware() {
    return function(store) {
      return function(next) {
        return function(action) {
          this.events.push(action.type);
          return next(action);
        };
      };
    };
  }
}
```
### Modify 35: Fix this in Express middleware
**Description:** Use correct this in Express route handler
```javascript
class Router {
  constructor() { this.routes = []; }
  register(app) {
    app.get('/api', function(req, res) {
      this.routes.push(req.path);
      res.json({ ok: true });
    });
  }
}
```
### Modify 36: Fix this in Mongoose schema methods
**Description:** Correct this in Mongoose instance methods
```javascript
const userSchema = new mongoose.Schema({ name: String, age: Number });
userSchema.methods.isAdult = function() {
  return this.age >= 18;
};
// Usage: user.isAdult()
```
### Modify 37: Fix this in Sequelize hooks
**Description:** Correct this in Sequelize lifecycle hooks
```javascript
const User = sequelize.define('User', { name: DataTypes.STRING });
User.beforeCreate(function(user) {
  console.log(this); // model class, not instance
});
```
### Modify 38: Use arrow in Promise.all callbacks
**Description:** Fix this in Promise.all then callback
```javascript
class DataAggregator {
  constructor() { this.data = []; }
  loadAll(urls) {
    return Promise.all(urls.map(url => fetch(url)))
      .then(function(responses) {
        this.data = responses;
      });
  }
}
```
### Modify 39: Fix this in async/await with Promise callback
**Description:** Correct this when mixing async/await with Promise callbacks
```javascript
class Service {
  constructor() { this.cache = new Map(); }
  async getData(key) {
    if (this.cache.has(key)) return this.cache.get(key);
    return fetch(`/api/${key}`).then(function(res) {
      this.cache.set(key, res);
      return res;
    });
  }
}
```
### Modify 40: Fix this in lodash _.forEach callback
**Description:** Use correct this in lodash iteratee
```javascript
class Summer {
  constructor() { this.total = 0; }
  sum(arr) {
    _.forEach(arr, function(n) {
      this.total += n;
    });
  }
}
```
### Modify 41: Fix this in D3.js callback
**Description:** Correct this in D3 event handlers
```javascript
class Chart {
  constructor() { this.data = []; }
  render(svg) {
    svg.selectAll('circle')
      .data(this.data)
      .on('click', function(d) {
        console.log(this.data); // Wrong this
      });
  }
}
```
### Modify 42: Fix this in Three.js animation loop
**Description:** Fix this in Three.js render loop
```javascript
class Scene3D {
  constructor() { this.cubes = []; }
  animate(renderer) {
    renderer.setAnimationLoop(function() {
      this.cubes.forEach(c => c.rotation.x += 0.01);
    });
  }
}
```
### Modify 43: Fix this in socket.io event handler
**Description:** Correct this in socket.io connection handler
```javascript
class ChatServer {
  constructor() { this.clients = []; }
  listen(io) {
    io.on('connection', function(socket) {
      this.clients.push(socket);
    });
  }
}
```
### Modify 44: Fix this in WebSocket message handler
**Description:** Correct this in WebSocket onmessage
```javascript
class WSClient {
  constructor(url) { this.socket = new WebSocket(url); this.messages = []; }
  connect() {
    this.socket.onmessage = function(event) {
      this.messages.push(event.data);
    };
  }
}
```
### Modify 45: Fix this in Promise.finally callback
**Description:** Correct this in Promise finally block
```javascript
class ResourceManager {
  constructor() { this.locked = false; }
  async use(callback) {
    this.locked = true;
    return callback().finally(function() {
      this.locked = false;
    });
  }
}
```
### Modify 46: Fix this in async generator
**Description:** Correct this in async generator method
```javascript
class Counter {
  constructor() { this.value = 0; }
  async *countUp() {
    while (true) {
      yield this.value;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}
```
### Modify 47: Fix this in Symbol.iterator
**Description:** Correct this in custom iterator
```javascript
class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  [Symbol.iterator]() {
    return {
      current: this.start,
      next: function() {
        if (this.current <= this.end) {
          return { value: this.current++, done: false };
        }
        return { done: true };
      }
    };
  }
}
```
### Modify 48: Fix this in IntersectionObserver callback
**Description:** Correct this in IntersectionObserver handler
```javascript
class LazyLoader {
  constructor() { this.images = []; }
  observe() {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) this.images.push(entry.target);
      });
    });
  }
}
```
### Modify 49: Fix this in MutationObserver callback
**Description:** Correct this in MutationObserver handler
```javascript
class ChangeTracker {
  constructor() { this.changes = 0; }
  observe(element) {
    const observer = new MutationObserver(function(mutations) {
      this.changes += mutations.length;
    });
    observer.observe(element, { childList: true });
  }
}
```
### Modify 50: Fix this in ResizeObserver callback
**Description:** Correct this in ResizeObserver handler
```javascript
class ElementWatcher {
  constructor() { this.dimensions = new Map(); }
  watch(element) {
    const observer = new ResizeObserver(function(entries) {
      entries.forEach(entry => {
        this.dimensions.set(entry.target, entry.contentRect);
      });
    });
    observer.observe(element);
  }
}
```
