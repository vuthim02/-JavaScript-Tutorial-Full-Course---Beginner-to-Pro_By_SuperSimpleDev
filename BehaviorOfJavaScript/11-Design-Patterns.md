# JavaScript Design Patterns — Complete Reference

> **Design patterns** are reusable solutions to commonly occurring problems in software design. They are templates/blueprints you adapt to solve specific problems — not code you copy-paste.
> Patterns give you a shared vocabulary to discuss architectural decisions with other developers.

---

## Table of Contents

1. [Creational Patterns](#1-creational-patterns)
2. [Structural Patterns](#2-structural-patterns)
3. [Behavioral Patterns](#3-behavioral-patterns)
4. [Module Patterns](#4-module-patterns)
5. [Architectural Patterns (MVC/MVP/MVVM)](#5-architectural-patterns)
6. [State Management Patterns (Flux/Redux/UDF)](#6-state-management-patterns)
7. [React / Frontend Patterns](#7-react--frontend-patterns)
8. [Performance / Utility Patterns](#8-performance--utility-patterns)

---

# 1. Creational Patterns

Creational patterns deal with object creation mechanisms, controlling how and when objects are created.

---

## 1. Singleton Pattern

**Intent:** Ensure a class has only one instance and provide a global point of access to it.

**Use case:** Database connections, configuration managers, logging services, caching.

**ES Module Singleton (simplest modern approach):**
```javascript
// db.js — modules are cached after first import, so this IS a singleton
import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export default pool;
// Every file that imports db.js gets the SAME pool instance
```

**Class-based Singleton with lazy initialization:**
```javascript
class Logger {
  static #instance = null;
  #logs = [];

  constructor() {
    if (Logger.#instance) return Logger.#instance;
    Logger.#instance = this;
  }

  log(message) {
    this.#logs.push({ message, timestamp: Date.now() });
    console.log(`[LOG] ${message}`);
  }

  getLogs() { return [...this.#logs]; }
}

const logger1 = new Logger();
const logger2 = new Logger();
console.log(logger1 === logger2); // true
```

**IIFE Singleton (legacy):**
```javascript
const Singleton = (function () {
  let instance;

  function createInstance(name) {
    return { name, createdAt: Date.now() };
  }

  return {
    getInstance(name) {
      if (!instance) instance = createInstance(name);
      return instance;
    },
  };
})();

const a = Singleton.getInstance('first');
const b = Singleton.getInstance('second');
console.log(a === b); // true
```

> **Note:** In modern JavaScript, ES modules are already singletons. Use class-based singletons only when you need lazy initialization or complex lifecycle management.

---

## 1.2 Factory Pattern

**Intent:** Provide a way to create objects without specifying the exact class. Encapsulates object creation logic into a dedicated factory function.

**Use case:** Creating different types of UI components, API clients, notification systems.

```javascript
// Simple Factory
function createNotification(type, message) {
  const base = { id: crypto.randomUUID(), message, createdAt: new Date() };

  switch (type) {
    case 'email':
      return { ...base, type: 'email', subject: message.slice(0, 50) };
    case 'sms':
      return { ...base, type: 'sms', phone: null };
    case 'push':
      return { ...base, type: 'push', icon: 'bell' };
    default:
      throw new Error(`Unknown notification type: ${type}`);
  }
}

const notification = createNotification('email', 'Your order shipped!');
```

**Class-based Factory:**
```javascript
class Car {
  constructor(make, model) { this.make = make; this.model = model; }
  drive() { console.log(`Driving a ${this.make} ${this.model}`); }
}

class Sedan extends Car {
  constructor(make, model) { super(make, model); this.type = 'Sedan'; }
}

class SUV extends Car {
  constructor(make, model) { super(make, model); this.type = 'SUV'; }
}

class CarFactory {
  createCar(type, make, model) {
    switch (type.toLowerCase()) {
      case 'sedan': return new Sedan(make, model);
      case 'suv':   return new SUV(make, model);
      default: throw new Error(`Unsupported car type: ${type}`);
    }
  }
}

const factory = new CarFactory();
const mySedan = factory.createCar('sedan', 'Honda', 'Civic');
mySedan.drive(); // Driving a Honda Civic
```

**When to use:**
- Object creation involves complex logic, validation, or configuration
- You want to decouple code from specific class implementations
- You need to create different types based on runtime input

---

## 1.3 Abstract Factory Pattern

**Intent:** Provide an interface for creating families of related objects without specifying their concrete classes. A "factory of factories."

**Use case:** Cross-platform UI (Windows vs Mac), multi-database support, theme systems.

```javascript
class Button {
  render() { console.log('Rendering generic button'); }
}
class WindowsButton extends Button {
  render() { console.log('Rendering Windows-style button'); }
}
class MacButton extends Button {
  render() { console.log('Rendering Mac-style button'); }
}

class Checkbox {
  render() { console.log('Rendering generic checkbox'); }
}
class WindowsCheckbox extends Checkbox {
  render() { console.log('Rendering Windows-style checkbox'); }
}
class MacCheckbox extends Checkbox {
  render() { console.log('Rendering Mac-style checkbox'); }
}

// Abstract Factory
class UIFactory {
  createButton() { throw new Error('Must implement createButton'); }
  createCheckbox() { throw new Error('Must implement createCheckbox'); }
}

class WindowsUIFactory extends UIFactory {
  createButton() { return new WindowsButton(); }
  createCheckbox() { return new WindowsCheckbox(); }
}

class MacUIFactory extends UIFactory {
  createButton() { return new MacButton(); }
  createCheckbox() { return new MacCheckbox(); }
}

// Client code doesn't know which concrete factory it's using
function buildUI(factory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  button.render();
  checkbox.render();
}

buildUI(new WindowsUIFactory()); // Windows-style button & checkbox
buildUI(new MacUIFactory());     // Mac-style button & checkbox
```

---

## 1.4 Builder Pattern

**Intent:** Construct complex objects step by step. Separates construction logic from the final object representation.

**Use case:** HTTP request builders, complex configurations, query builders, HTML builders.

```javascript
class Car {
  constructor() { this.parts = []; }
  addPart(part) { this.parts.push(part); }
  describe() { return `Car with parts: ${this.parts.join(', ')}`; }
}

class CarBuilder {
  constructor() { this.car = new Car(); }

  addEngine() { this.car.addPart('engine'); return this; }
  addWheels() { this.car.addPart('wheels'); return this; }
  addDoors()  { this.car.addPart('doors');  return this; }
  addGPS()    { this.car.addPart('GPS');    return this; }
  build()     { return this.car; }
}

// Method chaining
const car = new CarBuilder()
  .addEngine()
  .addWheels()
  .addDoors()
  .addGPS()
  .build();

console.log(car.describe()); // Car with parts: engine, wheels, doors, GPS
```

**HTTP Request Builder:**
```javascript
class RequestBuilder {
  constructor() {
    this._url = '';
    this._method = 'GET';
    this._headers = {};
    this._body = null;
  }

  url(url)         { this._url = url; return this; }
  method(method)   { this._method = method; return this; }
  header(k, v)     { this._headers[k] = v; return this; }
  body(body)       { this._body = body; return this; }

  async send() {
    const response = await fetch(this._url, {
      method: this._method,
      headers: this._headers,
      body: this._body ? JSON.stringify(this._body) : undefined,
    });
    return response.json();
  }
}

// Usage
const data = await new RequestBuilder()
  .url('https://api.example.com/users')
  .method('POST')
  .header('Content-Type', 'application/json')
  .body({ name: 'John', age: 30 })
  .send();
```

**When to use:** Object has many optional properties, construction involves multiple steps, you want to avoid "telescoping constructors."

---

## 1.5 Prototype Pattern

**Intent:** Create new objects by copying (cloning) an existing object (the prototype). Natural fit for JavaScript since JS uses prototype-based inheritance natively.

**Use case:** Cloning configurations, creating object templates, duplicating complex objects.

```javascript
// Using Object.create
const enemy = {
  attack:   () => console.log('Pim Pam Pum!'),
  flyAway:  () => console.log('Flyyyy like an eagle!'),
};

const bug1 = Object.create(enemy);
bug1.name = 'Bug McFly';
bug1.greet = function() { console.log(`I'm ${this.name}, work with me!`); };

bug1.attack(); // Pim Pam Pum!
bug1.greet();  // I'm Bug McFly, work with me!
```

**Clone method:**
```javascript
class Car {
  constructor(make, model) { this.make = make; this.model = model; }
  clone() { return new Car(this.make, this.model); }
}

const car1 = new Car('Toyota', 'Corolla');
const car2 = car1.clone();

console.log(car1 === car2);          // false (different instances)
console.log(car1.make === car2.make); // true (same values)
```

**Deep Clone with structuredClone (modern JS):**
```javascript
const original = {
  name: 'Config',
  settings: { theme: 'dark', nested: { lang: 'en' } },
};

const deepClone = structuredClone(original);
deepClone.settings.theme = 'light';
console.log(original.settings.theme); // 'dark' (unaffected)
```

---

# 2. Structural Patterns

Structural patterns deal with object composition — simplifying relationships between entities.

---

## 2.1 Observer Pattern (Pub/Sub)

**Intent:** Define a subscription mechanism that notifies multiple objects about events. When one object (subject) changes state, all dependents (observers) are notified automatically.

**Use case:** DOM events, state management, real-time updates, event-driven architectures, React reactivity.

```javascript
class EventBus {
  #listeners = new Map();

  on(event, callback) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(callback);
    // Return unsubscribe function
    return () => this.#listeners.get(event)?.delete(callback);
  }

  emit(event, data) {
    const callbacks = this.#listeners.get(event);
    if (callbacks) {
      for (const cb of callbacks) cb(data);
    }
  }

  once(event, callback) {
    const unsubscribe = this.on(event, (data) => {
      callback(data);
      unsubscribe();
    });
    return unsubscribe;
  }
}

// Usage
const bus = new EventBus();
const unsub = bus.on('user:login', (user) => {
  console.log(`${user.name} logged in`);
});
bus.emit('user:login', { name: 'Alice' }); // Alice logged in
unsub(); // Unsubscribe
```

**Classic Publisher/Subscriber:**
```javascript
const pubSub = {};

pubSub.events = {};

pubSub.subscribe = function (event, callback) {
  if (!this.events[event]) this.events[event] = [];
  this.events[event].push(callback);
};

pubSub.unsubscribe = function (event, callback) {
  this.events[event] = this.events[event].filter((cb) => cb !== callback);
};

pubSub.publish = function (event, data) {
  if (!this.events[event]) return;
  this.events[event].forEach((callback) => callback(data));
};
```

---

## 2.2 Mediator Pattern

**Intent:** Reduce coupling between components by making them communicate through a mediator object instead of directly.

**Use case:** Chat rooms, air traffic control, UI form coordination, event buses.

```javascript
class ChatRoom {
  constructor() { this.users = {}; }

  register(user) {
    this.users[user.name] = user;
    user.chatRoom = this;
  }

  send(message, from, to) {
    if (to) {
      to.receive(message, from);
    } else {
      // Broadcast to all except sender
      for (const key of Object.keys(this.users)) {
        if (this.users[key] !== from) {
          this.users[key].receive(message, from);
        }
      }
    }
  }
}

class User {
  constructor(name) { this.name = name; this.chatRoom = null; }

  send(message, to) { this.chatRoom.send(message, this, to); }
  receive(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
}

const room = new ChatRoom();
const alice = new User('Alice');
const bob = new User('Bob');
room.register(alice);
room.register(bob);

alice.send('Hello everyone!');      // Alice to Bob: Hello everyone!
alice.send('Hey Bob!', bob);        // Alice to Bob: Hey Bob!
```

---

## 2.3 Event Emitter Pattern

**Intent:** A specialized Observer where objects emit named events and listeners subscribe to those events by name.

**Use case:** Node.js core, custom event systems, component communication.

```javascript
class EventEmitter {
  constructor() { this.events = {}; }

  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return this;
  }

  off(event, callback) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) return this;
    this.events[event].forEach((callback) => callback(...args));
    return this;
  }

  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }
}

// Usage
const emitter = new EventEmitter();
emitter.on('data', (chunk) => console.log('Received:', chunk));
emitter.emit('data', 'hello'); // Received: hello
```

---

## 2.4 Decorator Pattern

**Intent:** Dynamically add behavior to an object without modifying its structure. Wraps the original object with additional functionality.

**Use case:** Logging, caching, authentication middleware, adding features without subclassing.

```javascript
// Function Decorator
function withLogging(fn) {
  return function (...args) {
    console.log(`Calling ${fn.name} with`, args);
    const result = fn(...args);
    console.log(`Result:`, result);
    return result;
  };
}

function add(a, b) { return a + b; }

const loggedAdd = withLogging(add);
loggedAdd(2, 3);
// Calling add with [2, 3]
// Result: 5
```

**Pizza ordering system:**
```javascript
class Pizza {
  cost() { return 5; }
  description() { return 'Plain pizza'; }
}

function withCheese(pizza) {
  const prevCost = pizza.cost.bind(pizza);
  const prevDesc = pizza.description.bind(pizza);
  pizza.cost = () => prevCost() + 2;
  pizza.description = () => prevDesc() + ' + cheese';
  return pizza;
}

function withPepperoni(pizza) {
  const prevCost = pizza.cost.bind(pizza);
  const prevDesc = pizza.description.bind(pizza);
  pizza.cost = () => prevCost() + 3;
  pizza.description = () => prevDesc() + ' + pepperoni';
  return pizza;
}

const myPizza = withCheese(withPepperoni(new Pizza()));
console.log(myPizza.description()); // Plain pizza + cheese + pepperoni
console.log(myPizza.cost());        // 10
```

---

## 2.5 Proxy Pattern

**Intent:** Provide a surrogate/placeholder for another object to control access to it. Intercepts and redefines fundamental operations.

**Use case:** Validation, caching, lazy loading, access control, logging. Native ES6 `Proxy` implements this pattern.

```javascript
// Caching Proxy
const realAPI = {
  fetchData(id) {
    console.log(`Fetching ${id} from Server...`);
    return `Data for ${id}`;
  },
};

const cache = {};

const proxyAPI = new Proxy(realAPI, {
  get(target, key) {
    if (key === 'fetchData') {
      return (id) => {
        if (cache[id]) {
          console.log(`Cache hit for ${id}`);
          return cache[id];
        }
        const result = target.fetchData(id);
        cache[id] = result;
        return result;
      };
    }
  },
});

console.log(proxyAPI.fetchData(1)); // Fetching 1 from Server... → Data for 1
console.log(proxyAPI.fetchData(1)); // Cache hit for 1 → Data for 1
```

**Validation Proxy:**
```javascript
const validator = {
  set(target, prop, value) {
    if (prop === 'age') {
      if (typeof value !== 'number' || value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
    target[prop] = value;
    return true;
  },
};

const person = new Proxy({}, validator);
person.age = 25;    // OK
// person.age = -5; // Error: Age must be a positive number
```

---

## 2.6 Facade Pattern

**Intent:** Provide a simplified interface to a complex subsystem. Hides complexity behind a clean wrapper.

**Use case:** API wrappers, library wrappers, complex subsystem orchestration.

```javascript
class CPU {
  execute() { console.log('CPU executing...'); }
}
class Memory {
  load() { console.log('Loading data into memory...'); }
}
class HardDrive {
  read() { console.log('Reading data from hard drive...'); }
}

// Facade
class Computer {
  constructor(cpu, memory, hardDrive) {
    this.cpu = cpu;
    this.memory = memory;
    this.hardDrive = hardDrive;
  }

  start() {
    console.log('Starting computer...');
    this.cpu.execute();
    this.memory.load();
    this.hardDrive.read();
    console.log('Computer ready!');
  }
}

// Usage — one simple call instead of three
const computer = new Computer(new CPU(), new Memory(), new HardDrive());
computer.start();
```

---

## 2.7 Adapter Pattern

**Intent:** Allow incompatible interfaces to work together. Acts as a bridge/translator between two interfaces.

**Use case:** API migration, integrating third-party libraries, data format conversion.

```javascript
// Old interface (expected by the app)
class OldCalculator {
  operations(v1, v2, op) {
    if (op === 'add') return v1 + v2;
    if (op === 'sub') return v1 - v2;
  }
}

// New interface (incompatible)
class NewCalculator {
  add(v1, v2) { return v1 + v2; }
  sub(v1, v2) { return v1 - v2; }
}

// Adapter — makes NewCalculator work with OldCalculator's interface
class CalcAdapter {
  constructor() { this.newCalc = new NewCalculator(); }
  operations(v1, v2, op) {
    if (op === 'add') return this.newCalc.add(v1, v2);
    if (op === 'sub') return this.newCalc.sub(v1, v2);
  }
}

const adaptedCalc = new CalcAdapter();
console.log(adaptedCalc.operations(10, 5, 'add')); // 15
```

---

## 2.8 Composite Pattern

**Intent:** Compose objects into tree structures and let you treat individual objects and compositions uniformly.

**Use case:** File systems, UI component trees, menu systems, organizational charts.

```javascript
class Component {
  operation() { throw new Error('Must implement'); }
}

class Leaf extends Component {
  constructor(name) { super(); this.name = name; }
  operation() { return this.name; }
}

class Composite extends Component {
  constructor(name) {
    super();
    this.name = name;
    this.children = [];
  }

  add(child) { this.children.push(child); return this; }

  operation() {
    const results = this.children.map((child) => child.operation());
    return `${this.name}: [${results.join(', ')}]`;
  }
}

// Build tree
const root = new Composite('root');
const branch1 = new Composite('branch1');
branch1.add(new Leaf('leaf1')).add(new Leaf('leaf2'));
const branch2 = new Composite('branch2');
branch2.add(new Leaf('leaf3'));
root.add(branch1).add(branch2);

console.log(root.operation());
// root: [branch1: [leaf1, leaf2], branch2: [leaf3]]
```

---

## 2.9 Flyweight Pattern

**Intent:** Minimize memory usage by sharing common state between similar objects. Stores shared (intrinsic) state separately from unique (extrinsic) state.

**Use case:** Text editors (shared character objects), particle systems, game objects with shared textures.

```javascript
class FlyweightFactory {
  constructor() { this.flyweights = {}; }

  get(key) {
    if (!this.flyweights[key]) {
      this.flyweights[key] = { key, createdAt: Date.now() };
    }
    return this.flyweights[key];
  }

  getCount() { return Object.keys(this.flyweights).length; }
}

// Shared intrinsic state — only unique make-model combos stored
const flyweights = new FlyweightFactory();

class Car {
  constructor(make, model, color) {
    this.flyweight = flyweights.get(`${make}-${model}`); // shared
    this.color = color; // unique (extrinsic) state
  }
}

const cars = [];
for (let i = 0; i < 10000; i++) {
  cars.push(new Car(
    ['Toyota', 'Honda', 'Ford'][i % 3],
    ['Corolla', 'Civic', 'Mustang'][i % 3],
    ['red', 'blue', 'white'][i % 3],
  ));
}

console.log(`Cars: ${cars.length}, Flyweights: ${flyweights.getCount()}`);
// Cars: 10000, Flyweights: 3
```

---

# 3. Behavioral Patterns

Behavioral patterns deal with communication and interaction between objects.

---

## 3.1 Chain of Responsibility Pattern

**Intent:** Pass a request along a chain of handlers. Each handler decides either to process the request or pass it to the next handler.

**Use case:** Middleware pipelines, validation chains, logging levels, event bubbling.

```javascript
class Handler {
  constructor() { this.next = null; }
  setNext(handler) { this.next = handler; return handler; }
  handle(request) { throw new Error('Must implement'); }
}

class AuthHandler extends Handler {
  handle(request) {
    if (request.token) {
      console.log('Auth: verified');
      if (this.next) return this.next.handle(request);
    } else {
      console.log('Auth: rejected — no token');
      return 'Unauthorized';
    }
  }
}

class ValidateHandler extends Handler {
  handle(request) {
    if (request.body) {
      console.log('Validate: passed');
      if (this.next) return this.next.handle(request);
    } else {
      console.log('Validate: failed — no body');
      return 'Bad Request';
    }
  }
}

class LogHandler extends Handler {
  handle(request) {
    console.log('Log:', JSON.stringify(request));
    if (this.next) return this.next.handle(request);
    return 'OK';
  }
}

// Build chain
const auth = new AuthHandler();
const validate = new ValidateHandler();
const log = new LogHandler();
auth.setNext(validate).setNext(log);

console.log(auth.handle({ token: 'abc', body: { data: 1 } })); // OK
console.log(auth.handle({ body: {} }));                          // Unauthorized
```

---

## 3.2 Command Pattern

**Intent:** Encapsulate a request as an object, allowing parameterization, queuing, logging, and undo/redo.

**Use case:** Undo/redo systems, command queues, transaction systems, macro recording.

```javascript
class Light {
  turnOn() { console.log('Light is ON'); }
  turnOff() { console.log('Light is OFF'); }
}

class Command {
  execute() { throw new Error('execute() must be implemented'); }
  undo() { throw new Error('undo() must be implemented'); }
}

class TurnOnCommand extends Command {
  constructor(light) { super(); this.light = light; }
  execute() { this.light.turnOn(); }
  undo() { this.light.turnOff(); }
}

class TurnOffCommand extends Command {
  constructor(light) { super(); this.light = light; }
  execute() { this.light.turnOff(); }
  undo() { this.light.turnOn(); }
}

// Invoker
class RemoteControl {
  constructor() { this.commands = {}; this.history = []; }

  setCommand(slot, command) { this.commands[slot] = command; }

  pressButton(slot) {
    if (this.commands[slot]) {
      this.commands[slot].execute();
      this.history.push(this.commands[slot]);
    }
  }

  pressUndo() {
    if (this.history.length > 0) this.history.pop().undo();
  }
}

const light = new Light();
const remote = new RemoteControl();
remote.setCommand('A', new TurnOnCommand(light));
remote.setCommand('B', new TurnOffCommand(light));

remote.pressButton('A'); // Light is ON
remote.pressButton('B'); // Light is OFF
remote.pressUndo();      // Light is ON (undo turnOff)
```

---

## 3.3 State Pattern

**Intent:** Allow an object to alter its behavior when its internal state changes. The object appears to change its class.

**Use case:** UI states (loading/success/error), order processing (pending/paid/shipped), game states.

```javascript
class State {
  handle(context) { throw new Error('Must implement'); }
}

class ActiveState extends State {
  handle(context) {
    console.log('State: Active');
    context.state = new InactiveState();
  }
}

class InactiveState extends State {
  handle(context) {
    console.log('State: Inactive');
    context.state = new ActiveState();
  }
}

class ToggleButton {
  constructor() { this.state = new ActiveState(); }
  click() { this.state.handle(this); }
}

const button = new ToggleButton();
button.click(); // State: Active → switches to Inactive
button.click(); // State: Inactive → switches to Active
```

---

## 3.4 Strategy Pattern

**Intent:** Define a family of algorithms, encapsulate each one, and make them interchangeable. Algorithms vary independently from clients.

**Use case:** Sorting strategies, payment methods, validation rules, compression algorithms.

```javascript
// Strategies as functions
const sortStrategies = {
  ascending:  (a, b) => a - b,
  descending: (a, b) => b - a,
  byLength:   (a, b) => a.length - b.length,
};

function sort(array, strategy = 'ascending') {
  return [...array].sort(sortStrategies[strategy]);
}

console.log(sort([3, 1, 2], 'descending'));                  // [3, 2, 1]
console.log(sort(['banana', 'apple', 'cherry'], 'byLength'));
// ['apple', 'banana', 'cherry']
```

**Payment strategies:**
```javascript
class PayPal {
  pay(amount) { return `Paid $${amount} via PayPal`; }
}

class CreditCard {
  pay(amount) { return `Paid $${amount} via Credit Card`; }
}

class PaymentProcessor {
  constructor(strategy) { this.strategy = strategy; }
  setStrategy(strategy) { this.strategy = strategy; }
  pay(amount) { return this.strategy.pay(amount); }
}

const processor = new PaymentProcessor(new PayPal());
console.log(processor.pay(100));  // Paid $100 via PayPal
processor.setStrategy(new CreditCard());
console.log(processor.pay(100));  // Paid $100 via Credit Card
```

---

## 3.5 Iterator Pattern

**Intent:** Provide a way to access elements of a collection sequentially without exposing its underlying representation.

**Use case:** Custom collections, tree traversals, paginated data, generators. JavaScript has built-in iterators via `Symbol.iterator` and `for...of`.

```javascript
// Custom Iterable using Symbol.iterator
class Range {
  constructor(start, end) { this.start = start; this.end = end; }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) return { value: current++, done: false };
        return { done: true };
      },
    };
  }
}

for (const num of new Range(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}

console.log([...new Range(1, 3)]); // [1, 2, 3]
```

**Manual Iterator:**
```javascript
class Iterator {
  constructor(collection) { this.collection = collection; this.index = 0; }
  first()          { this.index = 0; return this.collection[0]; }
  next()           { return this.collection[++this.index]; }
  isDone()         { return this.index >= this.collection.length; }
  currentItem()    { return this.collection[this.index]; }
}
```

---

## 3.6 Memento Pattern

**Intent:** Capture and externalize an object's internal state so it can be restored later without violating encapsulation.

**Use case:** Undo/redo, game save states, text editor history, snapshots.

```javascript
class Memento {
  constructor(state) { this._state = state; }
  getState() { return this._state; }
}

class Editor {
  constructor() { this._content = ''; }

  type(words) { this._content += words; }
  getContent() { return this._content; }
  save() { return new Memento(this._content); }
  restore(memento) { this._content = memento.getState(); }
}

class History {
  constructor() { this.stack = []; }
  push(memento) { this.stack.push(memento); }
  pop() { return this.stack.pop(); }
}

const editor = new Editor();
const history = new History();

editor.type('Hello');
history.push(editor.save());

editor.type(' Hello World');
console.log(editor.getContent()); // Hello Hello World

editor.restore(history.pop());
console.log(editor.getContent()); // Hello
```

---

## 3.7 Visitor Pattern

**Intent:** Add new operations to an object structure without modifying the elements. Separates algorithm from object structure.

**Use case:** AST processing (compilers/linters), document export (PDF/HTML/Markdown), operations on complex data structures.

```javascript
class Paragraph {
  constructor(text) { this.text = text; }
  accept(visitor) { return visitor.visitParagraph(this); }
}

class Heading {
  constructor(text, level) { this.text = text; this.level = level; }
  accept(visitor) { return visitor.visitHeading(this); }
}

class Link {
  constructor(url) { this.url = url; }
  accept(visitor) { return visitor.visitLink(this); }
}

// Visitors
class HTMLExporter {
  visitParagraph(el) { return `<p>${el.text}</p>`; }
  visitHeading(el)   { return `<h${el.level}>${el.text}</h${el.level}>`; }
  visitLink(el)      { return `<a href="${el.url}">${el.url}</a>`; }
}

class MarkdownExporter {
  visitParagraph(el) { return el.text; }
  visitHeading(el)   { return '#'.repeat(el.level) + ' ' + el.text; }
  visitLink(el)      { return `[${el.url}](${el.url})`; }
}

// Usage
const elements = [
  new Heading('Title', 1),
  new Paragraph('Some text here'),
  new Link('https://example.com'),
];

const htmlExporter = new HTMLExporter();
elements.forEach((el) => console.log(el.accept(htmlExporter)));
// <h1>Title</h1>
// <p>Some text here</p>
// <a href="https://example.com">https://example.com</a>
```

---

## 3.8 Template Method Pattern

**Intent:** Define the skeleton of an algorithm in a base class, letting subclasses override specific steps without changing the algorithm's structure.

**Use case:** Data processing pipelines, report generation, game AI behavior.

```javascript
class DataProcessor {
  // Template method
  process(data) {
    const cleaned    = this.clean(data);
    const transformed = this.transform(cleaned);
    return this.output(transformed);
  }

  clean(data) { return data.filter((d) => d != null); }
  transform(data) { throw new Error('Subclass must implement transform'); }
  output(data) { return data; }
}

class CSVProcessor extends DataProcessor {
  transform(data) { return data.map((d) => d.split(',').join(' | ')); }
}

class JSONProcessor extends DataProcessor {
  transform(data) { return data.map((d) => JSON.stringify(d)); }
}

const csv = new CSVProcessor();
console.log(csv.process([null, 'a,b', 'c,d'])); // ['a | b', 'c | d']
```

---

# 4. Module Patterns

---

## 4.1 Module Pattern (IIFE)

**Intent:** Encapsulate code into reusable units with private and public parts using immediately invoked function expressions.

```javascript
const ShoppingCart = (function () {
  // Private state
  let items = [];

  function _validate(item) {
    return item && item.name && item.price;
  }

  // Public API
  return {
    addItem(item) {
      if (_validate(item)) {
        items.push(item);
        console.log(`${item.name} added to cart.`);
      }
    },
    removeItem(item) {
      items = items.filter((i) => i !== item);
    },
    getItems() { return [...items]; },
    getTotal() { return items.reduce((sum, i) => sum + i.price, 0); },
  };
})();

ShoppingCart.addItem({ name: 'Laptop', price: 999 });
console.log(ShoppingCart.getTotal()); // 999
// console.log(ShoppingCart.items); // undefined (private!)
```

> **Status in 2026:** Dead for new code. ES modules supersede this pattern entirely.

---

## 4.2 Revealing Module Pattern

**Intent:** A variation of the Module pattern where all functions are defined as private variables and then returned via an object literal, "revealing" only the public API.

```javascript
const Counter = (function () {
  let count = 0;  // private

  function increment() { count++; }
  function decrement() { count--; }
  function getCount()  { return count; }

  // Revealing public interface
  return {
    up: increment,
    down: decrement,
    value: getCount,
  };
})();

Counter.up();
Counter.up();
console.log(Counter.value()); // 2
```

> **Status in 2026:** Dead for new code. Same reason — ES modules supersede it entirely.

---

## 4.3 ES6 Module Pattern

**Intent:** The modern standard for JavaScript modules using `import`/`export` syntax. Private by default, public via explicit exports.

```javascript
// math.js (private by default)
const PI = 3.14159;
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }

export { PI, add, subtract };

// main.js
import { add, PI } from './math.js';
console.log(add(2, 3)); // 5
// console.log(PI);      // 3.14159 (only what's exported is accessible)
```

**Default & Named exports:**
```javascript
export default class UserService {
  getUser(id) { /* ... */ }
}

export function formatDate(date) { /* ... */ }
export const MAX_RETRIES = 3;
```

**Key features of ES Modules:**
- Module-scoped variables are genuinely private
- Tree-shakable (unused exports removed by bundlers)
- Cached after first import (natural singleton behavior)
- Support dynamic imports: `const module = await import('./module.js')`

---

# 5. Architectural Patterns

---

## 5.1 MVC (Model-View-Controller)

**Intent:** Separate application into three interconnected components:
- **Model**: Data and business logic
- **View**: UI/rendering
- **Controller**: Handles user input, updates Model, updates View

```javascript
class UserModel {
  constructor() { this.users = []; }
  add(user) { this.users.push(user); }
  getAll() { return [...this.users]; }
}

class UserView {
  render(users) {
    console.log('--- User List ---');
    users.forEach((u) => console.log(`${u.name} (${u.email})`));
  }
}

class UserController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  addUser(name, email) {
    this.model.add({ name, email });
    this.view.render(this.model.getAll());
  }
}

const controller = new UserController(new UserModel(), new UserView());
controller.addUser('Alice', 'alice@mail.com');
controller.addUser('Bob', 'bob@mail.com');
```

**Characteristics:**
- Two-way data flow (View ↔ Controller ↔ Model)
- Good for traditional server-rendered apps and forms-heavy UIs
- Can lead to tangled dependencies in large apps

---

## 5.2 MVP (Model-View-Presenter)

**Intent:** Like MVC, but the Presenter mediates between Model and View. The View is passive — it never talks to the Model directly.
- **Model**: Data and business logic
- **View**: Passive UI (delegates events to Presenter)
- **Presenter**: Contains all presentation logic

```javascript
class UserModel {
  constructor() { this.data = []; }
  save(item) { this.data.push(item); }
  getAll() { return [...this.data]; }
}

// Passive View — delegates everything to presenter
class UserView {
  constructor() { this.presenter = null; }
  setPresenter(presenter) { this.presenter = presenter; }
  displayUsers(users) { console.log('Displaying:', users); }
  onAddButton(name) { this.presenter.handleAdd(name); }
}

class UserPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    view.setPresenter(this);
  }

  handleAdd(name) {
    this.model.save({ name, date: new Date() });
    this.view.displayUsers(this.model.getAll());
  }
}
```

**Key difference from MVC:** View is completely passive — it never talks to the Model directly.

---

## 5.3 MVVM (Model-View-ViewModel)

**Intent:** Separate UI from business logic with data binding:
- **Model**: Data layer
- **View**: UI/display
- **ViewModel**: Exposes data and commands that the View binds to; handles view logic

```javascript
class Observable {
  constructor(value) {
    this._value = value;
    this.listeners = [];
  }

  get value() { return this._value; }

  set value(newValue) {
    this._value = newValue;
    this.listeners.forEach((fn) => fn(newValue));
  }

  subscribe(fn) { this.listeners.push(fn); }
}

class UserViewModel {
  constructor() {
    this.userName  = new Observable('');
    this.userEmail = new Observable('');
  }

  setUser(name, email) {
    this.userName.value  = name;
    this.userEmail.value = email;
  }
}

// View binds to ViewModel
const vm = new UserViewModel();
vm.userName.subscribe((name) => console.log(`View update: name = ${name}`));
vm.userEmail.subscribe((email) => console.log(`View update: email = ${email}`));

vm.setUser('Alice', 'alice@mail.com');
// View update: name = Alice
// View update: email = alice@mail.com
```

**Used in:** Vue.js, Knockout.js, WPF, Angular (partially).

---

# 6. State Management Patterns

---

## 6.1 Flux Pattern

**Intent:** Facebook's application architecture for managing data flow in React applications using **unidirectional data flow**.

**Four main parts:**
- **Dispatcher**: Central hub that receives actions and distributes to stores
- **Stores**: Hold application state and business logic
- **Views**: React components that render based on store data
- **Actions**: Plain objects describing what happened

```javascript
// Action Types
const ActionTypes = {
  ADD_TODO:    'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
};

// Action Creators
const TodoActions = {
  addTodo(text) {
    Dispatcher.dispatch({ type: ActionTypes.ADD_TODO, text });
  },
  toggleTodo(id) {
    Dispatcher.dispatch({ type: ActionTypes.TOGGLE_TODO, id });
  },
  deleteTodo(id) {
    Dispatcher.dispatch({ type: ActionTypes.DELETE_TODO, id });
  },
};

// Store (simplified)
class TodoStore extends EventEmitter {
  constructor() {
    super();
    this.todos = [];
    Dispatcher.register((action) => {
      switch (action.type) {
        case ActionTypes.ADD_TODO:
          this.todos.push({
            id: Date.now(),
            text: action.text,
            complete: false,
          });
          this.emit('change');
          break;
        case ActionTypes.TOGGLE_TODO:
          this.todos = this.todos.map((t) =>
            t.id === action.id ? { ...t, complete: !t.complete } : t,
          );
          this.emit('change');
          break;
      }
    });
  }
  getAll() { return [...this.todos]; }
}
```

**Data flow:** View → Action → Dispatcher → Store → View

---

## 6.2 Redux Pattern

**Intent:** A predictable state container inspired by Flux with key simplifications: single store, pure reducers, no dispatcher.

**Three Principles:**
1. Single source of truth (one store)
2. State is read-only (dispatch actions to change it)
3. Changes via pure reducer functions only

```javascript
// 1. Actions
const increment     = () => ({ type: 'counter/increment' });
const decrement     = () => ({ type: 'counter/decrement' });
const incrementBy   = (amount) => ({ type: 'counter/incrementBy', payload: amount });

// 2. Reducer (pure function)
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'counter/increment':
      return { ...state, count: state.count + 1 };
    case 'counter/decrement':
      return { ...state, count: state.count - 1 };
    case 'counter/incrementBy':
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
}

// 3. Redux Toolkit (modern approach)
import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment:    (state) => { state.count += 1; },   // Immer handles immutability
    decrement:    (state) => { state.count -= 1; },
    incrementBy:  (state, action) => { state.count += action.payload; },
  },
});

export const { increment, decrement, incrementBy } = counterSlice.actions;
export default configureStore({ reducer: { counter: counterSlice.reducer } });
```

**React-Redux connection:**
```javascript
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

**Key difference from Flux:** Single store, pure reducers instead of mutable stores, no dispatcher (simpler API).

---

## 6.3 Unidirectional Data Flow (UDF)

**Intent:** Data flows in one direction through the application: State → View → Action → State. No two-way bindings.

```javascript
// UDF Cycle
// 1. State describes the condition of the app at a specific point in time
const state = { count: 0 };

// 2. UI is rendered based on that state
function render(state) {
  return `Count: ${state.count}`;
}

// 3. When something happens, state is updated based on what occurred
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { ...state, count: state.count + 1 };
    case 'DECREMENT': return { ...state, count: state.count - 1 };
    default: return state;
  }
}

// 4. UI re-renders based on the new state
let currentState = state;
currentState = reducer(currentState, { type: 'INCREMENT' });
console.log(render(currentState)); // Count: 1
```

**Benefits:**
- **Predictable:** Only one way to change state (dispatch actions)
- **Debuggable:** Action history enables time-travel debugging
- **Testable:** Pure reducers are easy to test in isolation

---

# 7. React / Frontend Patterns

---

## 7.1 Higher-Order Component (HOC) Pattern

**Intent:** A function that takes a component and returns a new component with enhanced behavior.

```javascript
// HOC that adds loading state
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <div>Loading...</div>;
    return <WrappedComponent {...props} />;
  };
}

const UserListWithLoading = withLoading(UserList);

// HOC for authentication
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const user = useUser();
    if (!user) return <Navigate to="/login" />;
    return <WrappedComponent {...props} user={user} />;
  };
}

const ProtectedDashboard = withAuth(Dashboard);
```

---

## 7.2 Custom Hooks Pattern

**Intent:** Extract reusable stateful logic into custom hooks, enabling logic sharing between components.

```javascript
// Custom hook for API fetching
function useFetch(url) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <Spinner />;
  if (error)   return <ErrorMessage error={error} />;
  return <h1>{user.name}</h1>;
}
```

---

## 7.3 Render Props Pattern

**Intent:** A component uses a function (render prop) to render its content, giving parent control over rendering logic.

```javascript
function MouseTracker({ children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
      {children(pos)}
    </div>
  );
}

// Usage
<MouseTracker>
  {({ x, y }) => <p>Mouse is at ({x}, {y})</p>}
</MouseTracker>
```

---

## 7.4 Provider Pattern

**Intent:** Pass data down the component tree via React Context, avoiding prop drilling.

```javascript
const ThemeContext = React.createContext('light');

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <Toolbar />
    </ThemeProvider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button className={theme} onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}
```

---

## 7.5 Container / Presentational Pattern

**Intent:** Separate components into two types:
- **Container**: Handles data fetching, state, logic (knows about Redux/store)
- **Presentational**: Renders UI, receives data via props (no awareness of data source)

```javascript
// Container (logic/data)
function UserListContainer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return <UserList users={users} onDelete={handleDelete} />;
}

// Presentational (UI only)
function UserList({ users, onDelete }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
          <button onClick={() => onDelete(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 7.6 Compound Components Pattern

**Intent:** Components that work together to form a complete UI unit, sharing implicit state via Context.

```javascript
const ToggleContext = React.createContext();

function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn((o) => !o);
  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

Toggle.On = function ToggleOn({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? children : null;
};

Toggle.Off = function ToggleOff({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? null : children;
};

Toggle.Button = function ToggleButton() {
  const { on, toggle } = useContext(ToggleContext);
  return <button onClick={toggle}>{on ? 'On' : 'Off'}</button>;
};

// Usage — clean, declarative API
<Toggle>
  <Toggle.On>The light is on</Toggle.On>
  <Toggle.Off>The light is off</Toggle.Off>
  <Toggle.Button />
</Toggle>
```

---

# 8. Performance / Utility Patterns

---

## 8.1 Memoization Pattern

**Intent:** Cache the results of expensive function calls and return the cached result when the same inputs occur again.

```javascript
// Generic memoize function
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log('Computing...');
  return n * n;
});

expensiveCalc(4); // Computing... → 16
expensiveCalc(4); // 16 (from cache, no computation)
```

**React memoization:**
```javascript
import React, { useMemo, useCallback } from 'react';

function Parent({ items, filter }) {
  // useMemo: memoize expensive computations
  const filteredItems = useMemo(
    () => items.filter((i) => i.category === filter),
    [items, filter],
  );

  // useCallback: memoize function references
  const handleClick = useCallback((item) => {
    console.log('Clicked:', item.name);
  }, []);

  return filteredItems.map((item) => (
    <MemoizedItem key={item.id} item={item} onClick={handleClick} />
  ));
}

// React.memo: memoize component renders (skip re-render if props unchanged)
const MemoizedItem = React.memo(function Item({ item, onClick }) {
  return <div onClick={() => onClick(item)}>{item.name}</div>;
});
```

---

## 8.2 Lazy Loading Pattern

**Intent:** Defer loading of code or resources until they are actually needed.

```javascript
// React.lazy + Suspense for code splitting
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/heavy" element={<HeavyComponent />} />
      </Routes>
    </Suspense>
  );
}
```

```javascript
// Intersection Observer lazy loading for images
function LazyImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef}>
      {loaded ? <img src={src} alt={alt} /> : <div className="placeholder" />}
    </div>
  );
}
```

```javascript
// Dynamic imports (vanilla JS)
async function loadFeature() {
  const { Feature } = await import('./feature.js');
  return new Feature();
}
```

---

## 8.3 Throttle / Debounce Pattern

**Intent:** Rate-limiting patterns for controlling how often a function is called.
- **Debounce**: Delays execution until a pause in calls (e.g., search input)
- **Throttle**: Executes at most once per time interval (e.g., scroll handler)

```javascript
// Debounce: execute after user stops typing
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', debounce((e) => {
  console.log('Searching for:', e.target.value);
}, 300));
```

```javascript
// Throttle: execute at most once per interval
function throttle(fn, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      return fn.apply(this, args);
    }
  };
}

window.addEventListener('scroll', throttle(() => {
  console.log('Scroll position:', window.scrollY);
}, 200));
```

```javascript
// Lodash implementations (battle-tested)
import { debounce, throttle } from 'lodash';
const debouncedSearch = debounce(search, 300);
const throttledScroll = throttle(handleScroll, 200);
```

---

## 8.4 Retry Pattern

**Intent:** Automatically retries failed operations a configurable number of times with optional exponential backoff.

```javascript
async function retry(fn, { maxRetries = 3, delay = 1000, backoff = 2 } = {}) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      const waitTime = delay * Math.pow(backoff, attempt - 1);
      console.log(`Attempt ${attempt} failed, retrying in ${waitTime}ms...`);
      await new Promise((r) => setTimeout(r, waitTime));
    }
  }
}

// Usage
async function fetchData() {
  return retry(
    async () => {
      const res = await fetch('/api/data');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    { maxRetries: 5, delay: 500, backoff: 2 },
  );
}
```

---

## 8.5 Circuit Breaker Pattern

**Intent:** Prevent an application from repeatedly trying to execute an operation that is likely to fail. After a threshold of failures, the circuit "opens" and all calls fail fast.

**Use case:** Microservices, API gateway, preventing cascade failures.

```javascript
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout     = options.resetTimeout || 30000;
    this.state = 'CLOSED';   // CLOSED → OPEN → HALF_OPEN
    this.failureCount = 0;
    this.lastFailureTime = null;
  }

  async call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime >= this.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit is OPEN — call blocked');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      console.log('Circuit OPENED — too many failures');
    }
  }
}

// Usage
const breaker = new CircuitBreaker({ failureThreshold: 3, resetTimeout: 10000 });

async function fetchUser(id) {
  return breaker.call(async () => {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  });
}
```

---

## 8.6 Pool Pattern

**Intent:** Pre-create and manage a fixed set of reusable resources (connections, threads, objects) instead of creating/destroying them repeatedly.

**Use case:** Database connection pools, worker threads, object pools in games.

```javascript
class ObjectPool {
  constructor(createFn, { minSize = 2, maxSize = 10 } = {}) {
    this.createFn = createFn;
    this.pool = [];
    this.inUse = new Set();
    this.maxSize = maxSize;

    // Pre-populate
    for (let i = 0; i < minSize; i++) {
      this.pool.push(this.createFn());
    }
  }

  acquire() {
    let obj = this.pool.pop();
    if (!obj && this.inUse.size < this.maxSize) {
      obj = this.createFn();
    }
    if (!obj) throw new Error('Pool exhausted — no available objects');
    this.inUse.add(obj);
    return obj;
  }

  release(obj) {
    if (this.inUse.has(obj)) {
      this.inUse.delete(obj);
      this.pool.push(obj);
    }
  }

  get available() { return this.pool.length; }
  get used()      { return this.inUse.size; }
}

// Usage
const connPool = new ObjectPool(
  () => ({ id: Date.now(), connected: true }),
  { minSize: 3, maxSize: 10 },
);

const conn1 = connPool.acquire();
const conn2 = connPool.acquire();
console.log(connPool.available); // 1
connPool.release(conn1);
console.log(connPool.available); // 2
```

**Real-world: database connection pool with node-postgres:**
```javascript
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  database: 'mydb',
  max: 20,                  // max connections
  idleTimeoutMillis: 30000,
});

async function query(sql, params) {
  const client = await pool.connect();
  try {
    return await client.query(sql, params);
  } finally {
    client.release(); // Always release back to pool
  }
}
```

---

# Pattern Selection Guide

| Problem | Pattern |
|---------|---------|
| Need exactly one instance | **Singleton** (or ES module export) |
| Create objects based on config/type | **Factory** |
| Create families of related objects | **Abstract Factory** |
| Complex object construction step-by-step | **Builder** |
| Clone objects from a template | **Prototype** |
| Notify multiple listeners of changes | **Observer / EventEmitter** |
| Centralize communication between components | **Mediator** |
| Add behavior without modifying original | **Decorator** |
| Control access to an object | **Proxy** |
| Simplify a complex subsystem | **Facade** |
| Make incompatible interfaces work together | **Adapter** |
| Treat individual and composite objects uniformly | **Composite** |
| Share common state to reduce memory | **Flyweight** |
| Process requests in a chain | **Chain of Responsibility** |
| Encapsulate actions as objects (undo/redo) | **Command** |
| Change behavior based on internal state | **State** |
| Swap algorithms at runtime | **Strategy** |
| Define algorithm skeleton with customizable steps | **Template Method** |
| Traverse collections without exposing internals | **Iterator** |
| Capture and restore object state | **Memento** |
| Add operations to object structures without changing them | **Visitor** |
| Encapsulate private state in a module | **Module (IIFE or ES modules)** |
| Pass data down without prop drilling | **Provider / Context** |
| Extract reusable logic from components | **Custom Hooks** |
| Cache expensive computations | **Memoization** |
| Defer loading until needed | **Lazy Loading** |
| Control call frequency | **Throttle / Debounce** |
| Automatically retry failed operations | **Retry** |
| Prevent cascade failures | **Circuit Breaker** |
| Manage reusable resource set | **Pool** |

---

# Quick Reference: Which Patterns Are Still Relevant in 2026?

| Pattern | Status | Reason |
|---------|--------|--------|
| Observer / Pub-Sub | ✅ Essential | Foundation of all reactive systems |
| Factory | ✅ Essential | Cleaner with functions, invaluable for DI |
| Strategy | ✅ Essential | First-class functions make it trivial |
| Proxy | ✅ Essential | Now a native language feature (ES6 Proxy) |
| Decorator | ✅ Standardized | TC39 decorator proposal shipping natively |
| Command | ✅ Useful | Undo/redo, job queues, retries |
| Composite | ✅ Useful | File systems, component trees |
| Facade | ✅ Useful | API wrappers, subsystem simplification |
| Adapter | ✅ Useful | API migration, library integration |
| Chain of Responsibility | ✅ Useful | Middleware pipelines, validation |
| Singleton | ⚠️ Often misused | Modules are singletons — use them instead |
| Module (IIFE) | ❌ Dead | ES modules supersede entirely |
| Revealing Module | ❌ Dead | ES modules supersede entirely |

---

# References

- [Gang of Four — Design Patterns: Elements of Reusable Object-Oriented Software](https://en.wikipedia.org/wiki/Design_Patterns)
- [Refactoring Guru — Design Patterns](https://refactoring.guru/design-patterns)
- [Addy Osmani — Learning JavaScript Design Patterns (O'Reilly)](https://www.oreilly.com/library/view/learning-javascript-design/9781491971444/)
- [JavaScript Design Patterns — freeCodeCamp](https://www.freecodecamp.org/news/javascript-design-patterns-explained/)
- [33 JavaScript Concepts — Design Patterns](https://33jsconcepts.com/concepts/design-patterns)
- [Redux Documentation — Concepts and Data Flow](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)
- [Facebook Flux Architecture](https://github.com/facebookarchive/flux)
