# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

## Part 19 — Design Patterns in JavaScript: Singleton, Factory, Observer, Module, Decorator, Command, and More

---

# Mission

Design patterns are reusable, battle-tested solutions to recurring software design problems.

Every production codebase — from Express middleware to React internals to Node.js core — is built on top of these patterns.

By the end of this part you will be able to:

- Recognize each pattern by its structure and intent.
- Implement every pattern in idiomatic JavaScript.
- Choose the right pattern for a given problem.
- Reverse engineer existing codebases by identifying the patterns they use.

---

# Big Picture

Design patterns fall into three categories:

| Category     | Focus                                      |
|-------------|--------------------------------------------|
| **Creational**  | Object creation mechanisms                 |
| **Structural**  | Object composition and relationships       |
| **Behavioral**  | Object communication and responsibility    |

JavaScript's dynamic typing, first-class functions, and prototypal inheritance make some patterns simpler — and some unnecessary — compared to statically-typed languages.

**Key insight:** Patterns are not recipes to copy. They are *vocabulary* for describing solutions. The same pattern can look very different in different codebases.

---

# Overall Map

## Creational Patterns (5)

| # | Pattern       | What It Does                                      |
|---|---------------|---------------------------------------------------|
| 1 | Singleton     | Ensures only one instance of a class              |
| 2 | Factory Method| Creates objects via a method instead of `new`     |
| 3 | Abstract Factory| Creates families of related objects             |
| 4 | Builder       | Constructs complex objects step by step           |
| 5 | Prototype     | Clones objects via a prototype                    |

## Structural Patterns (6)

| # | Pattern   | What It Does                                      |
|---|-----------|---------------------------------------------------|
| 6 | Adapter   | Makes incompatible interfaces work together       |
| 7 | Decorator | Adds behavior to objects dynamically              |
| 8 | Facade    | Simplifies a complex subsystem                    |
| 9 | Proxy     | Controls access to another object                 |
| 10| Module    | Encapsulates private state                        |
| 11| Mixin     | Composes behaviors across classes                 |

## Behavioral Patterns (7)

| # | Pattern                 | What It Does                                  |
|---|-------------------------|-----------------------------------------------|
| 12| Observer                | One-to-many dependency notification           |
| 13| Mediator                | Centralizes communication between components  |
| 14| Command                 | Encapsulates requests as objects              |
| 15| Strategy                | Swaps algorithms at runtime                   |
| 16| State                   | Changes behavior based on internal state      |
| 17| Iterator                | Traverses collections uniformly               |
| 18| Chain of Responsibility | Passes requests along a chain of handlers     |

---

# Chapter 1 — Singleton Pattern

## What Problem It Solves

Some resources must have *exactly one* instance:

- Database connection pool
- Logger
- Configuration manager
- Cache

Without Singleton, creating multiple instances of these resources wastes memory and can corrupt state (e.g., two logger instances writing to the same file simultaneously).

## Implementation

The classic Singleton ensures a class can only be instantiated once. Subsequent calls return the same instance.

```javascript
class Singleton {
    constructor() {
        if (Singleton._instance) {
            return Singleton._instance;
        }
        this.createdAt = Date.now();
        Singleton._instance = this;
    }

    static getInstance() {
        if (!Singleton._instance) {
            Singleton._instance = new Singleton();
        }
        return Singleton._instance;
    }
}

const a = new Singleton();
const b = new Singleton();
console.log(a === b); // true
```

## Modern Singleton with Module System

ES modules are singletons by nature — they execute once and cache the exports.

```javascript
// logger.js
class Logger {
    log(message) {
        console.log(`[${Date.now()}] ${message}`);
    }
}

export default new Logger();

// app.js
import logger from "./logger.js";
logger.log("App started");
```

## Real-World Use Case

A database connection manager that reuses the same pool across the entire application:

```javascript
class DatabasePool {
    constructor() {
        if (DatabasePool._instance) {
            return DatabasePool._instance;
        }
        this.connections = [];
        this.maxSize = 10;
        DatabasePool._instance = this;
    }

    async connect(uri) {
        // In a real app: pg.Pool or mongoose.createConnection
        this.uri = uri;
        console.log(`Connected to ${uri}`);
        return this;
    }

    query(sql) {
        // Execute query against the pool
        console.log(`Executing: ${sql}`);
    }
}

// Any file in the project
const pool1 = new DatabasePool();
const pool2 = new DatabasePool();
console.log(pool1 === pool2); // true
```

## Reverse Engineering Questions

1. What happens if the Singleton constructor throws an error? Is the instance still cached?
2. How would you make a Singleton work correctly with `async` initialization?
3. How do you reset a Singleton (e.g., for testing between test cases)?
4. Why is it difficult to unit test code that imports a Singleton directly?
5. How could two library versions in `node_modules` each create their own Singleton instance? How would you solve this?

---

# Chapter 2 — Factory Method Pattern

## What Problem It Solves

Creating objects with `new` hard-codes the class. When the exact type is only known at runtime, or when creation logic is complex or scattered, you centralize it in a factory.

## Implementation

```javascript
class Car {
    constructor(model) {
        this.model = model;
        this.type = "car";
    }

    drive() {
        return `Driving car ${this.model}`;
    }
}

class Truck {
    constructor(model) {
        this.model = model;
        this.type = "truck";
    }

    drive() {
        return `Driving truck ${this.model}`;
    }
}

class VehicleFactory {
    createVehicle(type, model) {
        switch (type) {
            case "car":
                return new Car(model);
            case "truck":
                return new Truck(model);
            default:
                throw new Error(`Unknown vehicle type: ${type}`);
        }
    }
}

const factory = new VehicleFactory();
const myCar = factory.createVehicle("car", "Sedan");
const myTruck = factory.createVehicle("truck", "Pickup");
```

## Factory with Configuration Object

```javascript
class UserFactory {
    createUser({ role, name, email }) {
        const base = { name, email, createdAt: new Date() };
        switch (role) {
            case "admin":
                return { ...base, permissions: ["read", "write", "delete"], role };
            case "editor":
                return { ...base, permissions: ["read", "write"], role };
            case "viewer":
                return { ...base, permissions: ["read"], role };
            default:
                throw new Error(`Unknown role: ${role}`);
        }
    }
}
```

## Real-World Use Case

React's `createElement` and `createRoot` are factories. Express's route factory creates route handlers. `fetch` returns a Response factory.

```javascript
// jQuery-style DOM factory
function $(selector) {
    if (typeof selector === "string") {
        return document.querySelector(selector);
    }
    if (typeof selector === "function") {
        document.addEventListener("DOMContentLoaded", selector);
    }
    throw new Error("Invalid argument to $");
}
```

## Reverse Engineering Questions

1. Why would you choose a factory over a constructor?
2. When does a factory become an anti-pattern (too many types)?
3. How would you implement a factory that caches created objects?
4. What testing advantages does a factory provide over `new`?

---

# Chapter 3 — Abstract Factory Pattern

## What Problem It Solves

When you need to create *families* of related objects that must work together, an abstract factory provides a single entry point without specifying concrete classes.

## Implementation

```javascript
// Abstract product interfaces (not strictly needed in JS but good convention)
class Button {
    render() { throw new Error("Must implement render()"); }
}

class Checkbox {
    render() { throw new Error("Must implement render()"); }
}

// Concrete products for Windows
class WindowsButton extends Button {
    render() { return "Windows-style button"; }
}

class WindowsCheckbox extends Checkbox {
    render() { return "Windows-style checkbox"; }
}

// Concrete products for Mac
class MacButton extends Button {
    render() { return "Mac-style button"; }
}

class MacCheckbox extends Checkbox {
    render() { return "Mac-style checkbox"; }
}

// Abstract factory
class GUIFactory {
    createButton() { throw new Error("Must implement createButton()"); }
    createCheckbox() { throw new Error("Must implement createCheckbox()"); }
}

// Concrete factories
class WindowsFactory extends GUIFactory {
    createButton() { return new WindowsButton(); }
    createCheckbox() { return new WindowsCheckbox(); }
}

class MacFactory extends GUIFactory {
    createButton() { return new MacButton(); }
    createCheckbox() { return new MacCheckbox(); }
}

// Usage
function createUI(factory) {
    const button = factory.createButton();
    const checkbox = factory.createCheckbox();
    return { button, checkbox };
}

const os = navigator.platform.startsWith("Win") ? "windows" : "mac";
const factory = os === "windows" ? new WindowsFactory() : new MacFactory();
const ui = createUI(factory);
console.log(ui.button.render()); // "Windows-style button" or "Mac-style button"
```

## Real-World Use Case

UI component libraries (Material UI, Ant Design) use abstract factories to generate platform-specific components from a single API.

```javascript
// A notification system that supports email, SMS, and push
class EmailNotifier { send(message) { /* send email */ } }
class SMSNotifier { send(message) { /* send SMS */ } }
class PushNotifier { send(message) { /* send push */ } }

class NotificationFactory {
    createEmailNotifier() { return new EmailNotifier(); }
    createSMSNotifier() { return new SMSNotifier(); }
    createPushNotifier() { return new PushNotifier(); }
}
```

## Reverse Engineering Questions

1. How does Abstract Factory differ from Factory Method?
2. When would you need multiple families of objects in the same application?
3. How would you test code that uses an abstract factory?

---

# Chapter 4 — Builder Pattern

## What Problem It Solves

Some objects require many configuration steps. A constructor with 15 parameters is unreadable and error-prone. The Builder separates construction from representation.

## Implementation

```javascript
class Pizza {
    constructor() {
        this.size = "medium";
        this.cheese = false;
        this.pepperoni = false;
        this.mushrooms = false;
        this.olives = false;
    }

    describe() {
        const toppings = [];
        if (this.cheese) toppings.push("cheese");
        if (this.pepperoni) toppings.push("pepperoni");
        if (this.mushrooms) toppings.push("mushrooms");
        if (this.olives) toppings.push("olives");
        return `${this.size} pizza with ${toppings.join(", ")}`;
    }
}

class PizzaBuilder {
    constructor() {
        this.pizza = new Pizza();
    }

    setSize(size) {
        this.pizza.size = size;
        return this;
    }

    addCheese() {
        this.pizza.cheese = true;
        return this;
    }

    addPepperoni() {
        this.pizza.pepperoni = true;
        return this;
    }

    addMushrooms() {
        this.pizza.mushrooms = true;
        return this;
    }

    addOlives() {
        this.pizza.olives = true;
        return this;
    }

    build() {
        return this.pizza;
    }
}

const pizza = new PizzaBuilder()
    .setSize("large")
    .addCheese()
    .addPepperoni()
    .addMushrooms()
    .build();

console.log(pizza.describe());
// "large pizza with cheese, pepperoni, mushrooms"
```

## Builder with Director

A director orchestrates the building steps for common configurations:

```javascript
class PizzaDirector {
    static makeMargherita() {
        return new PizzaBuilder()
            .setSize("medium")
            .addCheese()
            .build();
    }

    static makePepperoniLovers() {
        return new PizzaBuilder()
            .setSize("large")
            .addCheese()
            .addPepperoni()
            .build();
    }
}

const margherita = PizzaDirector.makeMargherita();
```

## Real-World Use Case

HTTP request builders (Axios, Fetch wrappers), ORM query builders (Knex, Prisma), and URL builders use the Builder pattern.

```javascript
class QueryBuilder {
    constructor(table) {
        this._table = table;
        this._where = [];
        this._orderBy = null;
        this._limit = null;
        this._select = ["*"];
    }

    select(...fields) {
        this._select = fields;
        return this;
    }

    where(column, operator, value) {
        this._where.push({ column, operator, value });
        return this;
    }

    orderBy(column, direction = "ASC") {
        this._orderBy = { column, direction };
        return this;
    }

    limit(n) {
        this._limit = n;
        return this;
    }

    build() {
        let sql = `SELECT ${this._select.join(", ")} FROM ${this._table}`;
        if (this._where.length > 0) {
            const conditions = this._where.map(
                w => `${w.column} ${w.operator} ${typeof w.value === "string" ? `'${w.value}'` : w.value}`
            );
            sql += ` WHERE ${conditions.join(" AND ")}`;
        }
        if (this._orderBy) {
            sql += ` ORDER BY ${this._orderBy.column} ${this._orderBy.direction}`;
        }
        if (this._limit !== null) {
            sql += ` LIMIT ${this._limit}`;
        }
        return sql;
    }
}

const query = new QueryBuilder("users")
    .select("id", "name", "email")
    .where("age", ">", 18)
    .orderBy("name")
    .limit(10)
    .build();

console.log(query);
// "SELECT id, name, email FROM users WHERE age > 18 ORDER BY name ASC LIMIT 10"
```

## Reverse Engineering Questions

1. What is the difference between a Builder and a Factory?
2. How does method chaining (fluent interface) relate to Builder?
3. Why does the Builder pattern work well for constructing immutable objects?
4. When would using a Director be over-engineering?

---

# Chapter 5 — Prototype Pattern

## What Problem It Solves

Creating objects from scratch is expensive. Cloning an existing object (a *prototype*) is faster and preserves the original's state.

## Implementation

The `Object.create()` method implements the Prototype pattern natively:

```javascript
const carPrototype = {
    init(model) {
        this.model = model;
        return this;
    },

    drive() {
        return `Driving ${this.model}`;
    },

    clone() {
        return Object.create(Object.getPrototypeOf(this));
    }
};

const car1 = Object.create(carPrototype).init("Sedan");
const car2 = car1.clone().init("SUV");

console.log(car1.drive()); // "Driving Sedan"
console.log(car2.drive()); // "Driving SUV"
```

## Prototype with Class-Based Clone

```javascript
class GameCharacter {
    constructor(name, health, level, abilities) {
        this.name = name;
        this.health = health;
        this.level = level;
        this.abilities = abilities;
    }

    clone() {
        // Deep clone to avoid shared references
        return new GameCharacter(
            this.name,
            this.health,
            this.level,
            [...this.abilities]
        );
    }

    introduce() {
        return `${this.name} (Lv.${this.level}) - HP: ${this.health}`;
    }
}

const orcPrototype = new GameCharacter("Grunt", 100, 1, ["punch", "roar"]);

const orc1 = orcPrototype.clone();
orc1.name = "Orc #1";

const orc2 = orcPrototype.clone();
orc2.name = "Orc #2";

console.log(orc1.introduce()); // "Orc #1 (Lv.1) - HP: 100"
console.log(orc2.introduce()); // "Orc #2 (Lv.1) - HP: 100"
```

## Real-World Use Case

Redux Toolkit's `createSlice` uses prototypes under the hood. Game engines clone enemy patterns from prototypes. V8 itself uses prototype-based object shapes.

```javascript
// Configuration prototype pattern
const defaultConfig = {
    host: "localhost",
    port: 3000,
    timeout: 5000,
    retries: 3,
    headers: {
        "Content-Type": "application/json"
    }
};

function createConfig(overrides) {
    const config = Object.create(defaultConfig);
    return Object.assign(config, overrides);
}

const devConfig = createConfig({ port: 8080 });
console.log(devConfig.host);   // "localhost" (inherited from prototype)
console.log(devConfig.port);   // 8080 (own property)
console.log(devConfig.timeout); // 5000 (inherited)
```

## Reverse Engineering Questions

1. How does the Prototype pattern relate to JavaScript's built-in prototype chain?
2. What is the difference between shallow clone and deep clone in this pattern?
3. Why is `Object.create(null)` useful for prototype-less objects?
4. When would cloning be more expensive than creating a new object?

---

# Chapter 6 — Adapter Pattern

## What Problem It Solves

Two parts of a system expect different interfaces. Instead of modifying either one, you write an *adapter* that translates calls from one interface to the other.

## Implementation

```javascript
// Existing interface (old system)
class OldCalculator {
    compute(a, b, operation) {
        switch (operation) {
            case "add": return a + b;
            case "sub": return a - b;
            default: return NaN;
        }
    }
}

// New interface (expected by the client)
class NewCalculator {
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
}

// Adapter makes OldCalculator work with NewCalculator interface
class CalculatorAdapter {
    constructor() {
        this.calculator = new OldCalculator();
    }

    add(a, b) {
        return this.calculator.compute(a, b, "add");
    }

    subtract(a, b) {
        return this.calculator.compute(a, b, "sub");
    }
}

// Client code expecting the new interface
function performOperations(calc) {
    console.log(calc.add(10, 5));      // 15
    console.log(calc.subtract(10, 5)); // 5
}

const adapter = new CalculatorAdapter();
performOperations(adapter);
```

## Adapter for Third-Party APIs

```javascript
// Third-party library
class StripePayment {
    charge(amount, currency) {
        return { status: "success", transactionId: `stripe_${Date.now()}` };
    }
}

// Our application expects this interface
class PaymentProcessor {
    pay(amountInUSD) { throw new Error("Must implement pay()"); }
}

class StripeAdapter extends PaymentProcessor {
    constructor() {
        super();
        this.stripe = new StripePayment();
    }

    pay(amountInUSD) {
        const result = this.stripe.charge(amountInUSD, "usd");
        return result.status === "success";
    }
}

const processor = new StripeAdapter();
const paid = processor.pay(29.99);
```

## Real-World Use Case

Promise-based adapters for callback-based APIs. The `util.promisify` function in Node.js is a universal adapter:

```javascript
const fs = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
// Now fs.readFile's callback interface is adapted to a promise interface
readFileAsync("/path/to/file.txt", "utf8").then(console.log);
```

## Reverse Engineering Questions

1. How does Adapter differ from Facade?
2. When would you need a two-way adapter?
3. What are the performance implications of using adapters in a hot path?
4. How would you test an adapter without the real underlying system?

---

# Chapter 7 — Decorator Pattern

## What Problem It Solves

You need to add behavior to individual objects without modifying the class. Subclassing every combination leads to class explosion. Decorators wrap an object with new behavior.

## Implementation

```javascript
class Coffee {
    cost() { return 5; }
    description() { return "Coffee"; }
}

class MilkDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost() + 2;
    }

    description() {
        return `${this.coffee.description()}, Milk`;
    }
}

class SugarDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost() + 1;
    }

    description() {
        return `${this.coffee.description()}, Sugar`;
    }
}

class WhippedCreamDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost() + 3;
    }

    description() {
        return `${this.coffee.description()}, Whipped Cream`;
    }
}

// Usage
let myCoffee = new Coffee();
myCoffee = new MilkDecorator(myCoffee);
myCoffee = new SugarDecorator(myCoffee);
myCoffee = new WhippedCreamDecorator(myCoffee);

console.log(myCoffee.description()); // "Coffee, Milk, Sugar, Whipped Cream"
console.log(myCoffee.cost());        // 11
```

## Decorator Using Function Composition

```javascript
function withLogging(fn) {
    return function (...args) {
        console.log(`Calling with args: ${JSON.stringify(args)}`);
        const result = fn(...args);
        console.log(`Result: ${JSON.stringify(result)}`);
        return result;
    };
}

function withTiming(fn) {
    return function (...args) {
        const start = performance.now();
        const result = fn(...args);
        const elapsed = performance.now() - start;
        console.log(`Took ${elapsed.toFixed(2)}ms`);
        return result;
    };
}

function withRetry(fn, maxRetries = 3) {
    return async function (...args) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await fn(...args);
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                console.log(`Retry ${i + 1}/${maxRetries}`);
            }
        }
    };
}

// Compose decorators
const fetchData = withRetry(withLogging(withTiming(async (url) => {
    const response = await fetch(url);
    return response.json();
})));
```

## Real-World Use Case

Express middleware is a chain of decorators. Higher-Order Components (HOCs) in React are decorators. TypeScript's "experimentalDecorators" implement this pattern at the language level.

```javascript
// Express-style middleware decorator
function withAuth(handler) {
    return function (req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        return handler(req, res, next);
    };
}

function withLogging(handler) {
    return function (req, res, next) {
        console.log(`${req.method} ${req.url}`);
        return handler(req, res, next);
    };
}

const protectedHandler = withAuth(withLogging(async (req, res) => {
    res.json({ data: "sensitive" });
}));
```

## Reverse Engineering Questions

1. How does the Decorator pattern differ from inheritance?
2. What is the "transparent wrapper" concept?
3. Why does the order of decorators matter?
4. How would you remove a specific decorator at runtime?
5. What are the downsides of heavy decorator chains?

---

# Chapter 8 — Facade Pattern

## What Problem It Solves

A complex subsystem with many classes and interactions is hard to use. A *facade* provides a simple, unified interface to the subsystem.

## Implementation

```javascript
// Complex subsystem
class CPU {
    freeze() { console.log("CPU frozen"); }
    jump(position) { console.log(`CPU jumping to ${position}`); }
    execute() { console.log("CPU executing"); }
}

class Memory {
    load(position, data) {
        console.log(`Memory loading "${data}" at ${position}`);
    }
}

class HardDrive {
    read(lba, size) {
        return `data_from_sector_${lba}`;
    }
}

// Facade
class ComputerFacade {
    constructor() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }

    start() {
        this.cpu.freeze();
        this.memory.load(0, this.hardDrive.read(0, 1024));
        this.cpu.jump(0);
        this.cpu.execute();
        console.log("Computer started successfully");
    }
}

// Client
const computer = new ComputerFacade();
computer.start();
// CPU frozen
// Memory loading "data_from_sector_0" at 0
// CPU jumping to 0
// CPU executing
// Computer started successfully
```

## Real-World Use Case

JavaScript libraries like jQuery are facades over the DOM API. Axios is a facade over XMLHttpRequest or `fetch`.

```javascript
// DOM manipulation facade
class DOMManipulator {
    constructor(selector) {
        this.element = document.querySelector(selector);
    }

    hide() {
        this.element.style.display = "none";
        return this;
    }

    show() {
        this.element.style.display = "";
        return this;
    }

    text(content) {
        if (content === undefined) {
            return this.element.textContent;
        }
        this.element.textContent = content;
        return this;
    }

    on(event, handler) {
        this.element.addEventListener(event, handler);
        return this;
    }

    attr(name, value) {
        if (value === undefined) {
            return this.element.getAttribute(name);
        }
        this.element.setAttribute(name, value);
        return this;
    }
}

const title = new DOMManipulator("#title");
title.text("Hello").show().on("click", () => console.log("Clicked!"));
```

## Reverse Engineering Questions

1. How is Facade different from Adapter?
2. Does Facade hide the subsystem or just simplify it?
3. When should you create multiple facades for the same subsystem?
4. How does Facade affect testability?

---

# Chapter 9 — Proxy Pattern

## What Problem It Solves

You need to control access to an object — for lazy initialization, access control, logging, caching, or validation. The Proxy pattern provides a surrogate that controls access to the real object.

## JavaScript Has a Built-In Proxy

The `Proxy` constructor lets you intercept fundamental operations on any object.

```javascript
const target = {
    name: "Secret Vault",
    secret: "The password is 1234"
};

const handler = {
    get(obj, prop) {
        if (prop === "secret") {
            return "ACCESS DENIED";
        }
        return Reflect.get(obj, prop);
    },

    set(obj, prop, value) {
        if (prop === "secret") {
            throw new Error("Cannot modify secret directly");
        }
        return Reflect.set(obj, prop, value);
    }
};

const proxy = new Proxy(target, handler);
console.log(proxy.name);   // "Secret Vault"
console.log(proxy.secret); // "ACCESS DENIED"
// proxy.secret = "new";   // Error: Cannot modify secret directly
```

## Virtual Proxy (Lazy Initialization)

```javascript
class ExpensiveImage {
    constructor(filename) {
        this.filename = filename;
        this._loadFromDisk();
    }

    _loadFromDisk() {
        console.log(`Loading ${this.filename} from disk... (expensive)`);
    }

    display() {
        console.log(`Displaying ${this.filename}`);
    }
}

class ImageProxy {
    constructor(filename) {
        this.filename = filename;
        this._realImage = null;
    }

    display() {
        if (!this._realImage) {
            this._realImage = new ExpensiveImage(this.filename);
        }
        this._realImage.display();
    }
}

const image = new ImageProxy("photo.jpg");
// Nothing loaded yet
image.display();
// Loading photo.jpg from disk... (expensive)
// Displaying photo.jpg
image.display();
// Displaying photo.jpg (no load)
```

## Caching Proxy

```javascript
function createCachingProxy(fn) {
    const cache = new Map();

    return new Proxy(fn, {
        apply(target, thisArg, args) {
            const key = JSON.stringify(args);

            if (cache.has(key)) {
                console.log(`Cache hit for ${key}`);
                return cache.get(key);
            }

            console.log(`Cache miss for ${key}`);
            const result = Reflect.apply(target, thisArg, args);
            cache.set(key, result);
            return result;
        }
    });
}

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const cachedFib = createCachingProxy(fibonacci);
console.log(cachedFib(40)); // Computed
console.log(cachedFib(40)); // Cache hit
```

## Real-World Use Case

Vue.js 3's reactivity system uses Proxies. MobX uses Proxies. Validation libraries use Proxies to intercept object mutations.

```javascript
// Validation proxy
function createValidatedUser(userSchema) {
    return new Proxy(userSchema, {
        set(obj, prop, value) {
            if (prop === "age" && (typeof value !== "number" || value < 0 || value > 150)) {
                throw new Error(`Invalid age: ${value}`);
            }
            if (prop === "email" && !value.includes("@")) {
                throw new Error(`Invalid email: ${value}`);
            }
            return Reflect.set(obj, prop, value);
        }
    });
}

const user = createValidatedUser({ name: "Alice", age: 30, email: "alice@example.com" });
user.age = 31;   // OK
// user.age = -5; // Error: Invalid age: -5
```

## Reverse Engineering Questions

1. What is the difference between Proxy and Decorator?
2. How does JavaScript's `Proxy` differ from the classic GoF Proxy pattern?
3. What performance impact does Proxy have?
4. Can a Proxy be detected from the client code?

---

# Chapter 10 — Module Pattern

## What Problem It Solves

JavaScript before ES modules had no built-in encapsulation. Variables leaked globally. The Module pattern uses closures to create private state and expose a controlled public API.

## Implementation (IIFE-Based Module)

```javascript
const UserModule = (function () {
    // Private
    const users = [];
    let nextId = 1;

    function validateEmail(email) {
        return email.includes("@");
    }

    // Public
    return {
        add(name, email) {
            if (!validateEmail(email)) {
                throw new Error("Invalid email");
            }
            const user = { id: nextId++, name, email };
            users.push(user);
            return user;
        },

        find(id) {
            return users.find(u => u.id === id) || null;
        },

        getAll() {
            return [...users]; // Return a copy to prevent mutation
        },

        remove(id) {
            const index = users.findIndex(u => u.id === id);
            if (index !== -1) {
                return users.splice(index, 1)[0];
            }
            return null;
        },

        get count() {
            return users.length;
        }
    };
})();

console.log(UserModule.add("Alice", "alice@example.com"));
console.log(UserModule.count);                // 1
// console.log(UserModule.users);             // undefined (private)
// console.log(UserModule.validateEmail());   // undefined (private)
```

## Revealing Module Pattern

A variation where you define all functions privately, then reveal only the ones you want:

```javascript
const Calculator = (function () {
    // All private
    function add(a, b) { return a + b; }
    function subtract(a, b) { return a - b; }
    function multiply(a, b) { return a * b; }
    function divide(a, b) {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    }

    // Reveal public API
    return {
        add,
        subtract,
        multiply,
        divide
    };
})();
```

## ES Module Pattern

ES modules provide encapsulation natively — everything is private unless exported:

```javascript
// counter.js
let count = 0;

export function increment() {
    count += 1;
    return count;
}

export function decrement() {
    count -= 1;
    return count;
}

export function getCount() {
    return count;
}

// app.js
import { increment, getCount } from "./counter.js";
console.log(increment()); // 1
console.log(getCount());  // 1
// console.log(count);    // ReferenceError: count is not defined
```

## Real-World Use Case

Every npm package is a module. jQuery, Lodash, and modern frameworks all use module patterns. Node.js's CommonJS modules are the same concept with a different syntax:

```javascript
// Node.js module pattern
const privateVar = "secret";

function privateHelper() {
    return privateVar.toUpperCase();
}

module.exports = {
    publicMethod() {
        return privateHelper();
    }
};
```

## Reverse Engineering Questions

1. How does the Module pattern relate to the Single Responsibility Principle?
2. Why is the Revealing Module pattern preferred over the classic Module pattern?
3. How does tree-shaking work with ES modules but not with IIFE modules?
4. What happens to module-level state when a module is imported in multiple files?
5. How would you test private functions in a module?

---

# Chapter 11 — Mixin Pattern

## What Problem It Solves

JavaScript classes support single inheritance. When you need to share behavior across unrelated classes, *mixins* allow composing behaviors horizontally.

## Implementation

```javascript
// Mixins
const LoggerMixin = {
    log(message) {
        console.log(`[${this.constructor.name}] ${message}`);
    },

    error(message) {
        console.error(`[${this.constructor.name}] ERROR: ${message}`);
    }
};

const TimestampMixin = {
    getTimestamp() {
        return new Date().toISOString();
    }
};

const SerializableMixin = {
    toJSON() {
        return JSON.stringify({ ...this });
    },

    fromJSON(json) {
        Object.assign(this, JSON.parse(json));
        return this;
    }
};

// Base class
class User {
    constructor(name) {
        this.name = name;
    }
}

// Apply mixins
Object.assign(User.prototype, LoggerMixin, TimestampMixin, SerializableMixin);

const user = new User("Alice");
user.log("User created");                        // "[User] User created"
console.log(user.getTimestamp());                // "2026-06-11T..."
console.log(user.toJSON());                      // '{"name":"Alice"}'
```

## Mixin with Class Composition

```javascript
function applyMixins(targetClass, ...mixins) {
    for (const mixin of mixins) {
        Object.getOwnPropertyNames(mixin.prototype).forEach(name => {
            if (name !== "constructor") {
                targetClass.prototype[name] = mixin.prototype[name];
            }
        });
    }
}

class Flyable {
    fly() {
        return `${this.name} is flying`;
    }
}

class Swimmable {
    swim() {
        return `${this.name} is swimming`;
    }
}

class Duck {
    constructor(name) {
        this.name = name;
    }
}

applyMixins(Duck, Flyable, Swimmable);
const donald = new Duck("Donald");
console.log(donald.fly());   // "Donald is flying"
console.log(donald.swim());  // "Donald is swimming"
```

## Real-World Use Case

React's higher-order components are mixins. Redux's `connect()` function is a mixin. Many utility libraries provide mixin factories:

```javascript
// EventEmitter mixin
const EventEmitterMixin = {
    _events: {},

    on(event, handler) {
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(handler);
        return this;
    },

    emit(event, ...args) {
        const handlers = this._events[event];
        if (handlers) {
            handlers.forEach(handler => handler(...args));
        }
        return this;
    },

    off(event, handler) {
        const handlers = this._events[event];
        if (handlers) {
            this._events[event] = handlers.filter(h => h !== handler);
        }
        return this;
    }
};

class Store {
    constructor(state = {}) {
        this.state = state;
    }
}

Object.assign(Store.prototype, EventEmitterMixin);
const store = new Store({ count: 0 });
store.on("change", () => console.log("State changed"));
store.emit("change"); // "State changed"
```

## Reverse Engineering Questions

1. How do mixins differ from multiple inheritance (as in C++)?
2. What happens if two mixins define the same method?
3. How does composition via mixins relate to the "composition over inheritance" principle?
4. What are the pitfalls of mixins in large codebases?

---

# Chapter 12 — Observer Pattern

## What Problem It Solves

When one object (the *subject*) changes state, many other objects (the *observers*) need to be notified automatically. Polling is inefficient — the observer pattern pushes updates.

## Implementation

```javascript
class Subject {
    constructor() {
        this._observers = new Set();
    }

    subscribe(observer) {
        this._observers.add(observer);
        return () => this._observers.delete(observer); // Return unsubscribe function
    }

    unsubscribe(observer) {
        this._observers.delete(observer);
    }

    notify(data) {
        for (const observer of this._observers) {
            observer.update(data);
        }
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }

    update(data) {
        console.log(`${this.name} received: ${JSON.stringify(data)}`);
    }
}

// Usage
const newsAgency = new Subject();

const alice = new Observer("Alice");
const bob = new Observer("Bob");

const unsubscribeCharlie = newsAgency.subscribe({ update(data) {
    console.log(`Charlie (anonymous) received: ${JSON.stringify(data)}`);
}});

newsAgency.subscribe(alice);
newsAgency.subscribe(bob);

newsAgency.notify({ headline: "Breaking News!" });
// Alice received: {"headline":"Breaking News!"}
// Bob received: {"headline":"Breaking News!"}
// Charlie (anonymous) received: {"headline":"Breaking News!"}

newsAgency.unsubscribe(alice);
newsAgency.notify({ headline: "Update" });
// Bob received: {"headline":"Update"}
// Charlie (anonymous) received: {"headline":"Update"}
```

## Observer with Event Emitter (Node.js Style)

Node.js's `EventEmitter` is a full implementation of the Observer pattern:

```javascript
const EventEmitter = require("events");

class OrderSystem extends EventEmitter {
    createOrder(orderData) {
        console.log("Order created");
        this.emit("order:created", orderData);
    }

    payOrder(orderId) {
        console.log("Order paid");
        this.emit("order:paid", orderId);
    }

    shipOrder(orderId) {
        console.log("Order shipped");
        this.emit("order:shipped", orderId);
    }
}

const orders = new OrderSystem();

// Observers subscribe to events
orders.on("order:created", (data) => {
    console.log(`Notification: New order #${data.id}`);
});

orders.on("order:created", (data) => {
    console.log(`Analytics: Order value $${data.total}`);
});

orders.on("order:paid", (orderId) => {
    console.log(`Inventory: Reserve items for order #${orderId}`);
});

orders.createOrder({ id: 123, total: 49.99 });
// Order created
// Notification: New order #123
// Analytics: Order value $49.99
```

## Real-World Use Case

React's `useEffect` is an observer pattern. Redux's `store.subscribe()` is an observer. DOM events (`addEventListener`) are the Observer pattern. RxJS is an entire library built on this pattern.

```javascript
// DOM observer
const button = document.querySelector("#myButton");
button.addEventListener("click", () => console.log("Clicked!"));
// The button is the subject, the callback is the observer
```

## Reverse Engineering Questions

1. What is the difference between push-based and pull-based observers?
2. How would you handle errors in one observer without breaking others?
3. What happens when an observer subscribes inside a notification?
4. How does memory leak happen with observers that are never unsubscribed?
5. Compare Observer pattern vs Publish-Subscribe pattern.

---

# Chapter 13 — Mediator Pattern

## What Problem It Solves

When many components communicate directly, they become tightly coupled — a "spaghetti" of references. A *mediator* centralizes communication so components interact only with the mediator, not with each other.

## Implementation

```javascript
class ChatMediator {
    constructor() {
        this.users = new Map();
    }

    addUser(user) {
        this.users.set(user.name, user);
        user.setMediator(this);
    }

    send(message, from, to) {
        if (to) {
            // Direct message
            const recipient = this.users.get(to);
            if (recipient) {
                recipient.receive(message, from);
            }
        } else {
            // Broadcast
            for (const [name, user] of this.users) {
                if (name !== from) {
                    user.receive(message, from);
                }
            }
        }
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.mediator = null;
    }

    setMediator(mediator) {
        this.mediator = mediator;
    }

    send(message, to = null) {
        console.log(`${this.name} sends: "${message}"`);
        this.mediator.send(message, this.name, to);
    }

    receive(message, from) {
        console.log(`${this.name} receives from ${from}: "${message}"`);
    }
}

const chat = new ChatMediator();
const alice = new User("Alice");
const bob = new User("Bob");
const charlie = new User("Charlie");

chat.addUser(alice);
chat.addUser(bob);
chat.addUser(charlie);

alice.send("Hello everyone!");
// Alice sends: "Hello everyone!"
// Bob receives from Alice: "Hello everyone!"
// Charlie receives from Alice: "Hello everyone!"

bob.send("Hey Alice!", "Alice");
// Bob sends: "Hey Alice!"
// Alice receives from Bob: "Hey Alice!"
```

## Real-World Use Case

Air traffic control is the classic metaphor. In frontend, form components communicate through a form mediator. Dialog/modal systems use a mediator.

```javascript
// Form mediator
class FormMediator {
    constructor() {
        this.fields = {};
    }

    registerField(name, field) {
        this.fields[name] = field;
        field.setMediator(this);
    }

    notify(sender, event) {
        if (event === "change") {
            this.validate();
        }
        if (event === "submit") {
            this.handleSubmit(sender);
        }
    }

    validate() {
        const values = {};
        for (const [name, field] of Object.entries(this.fields)) {
            values[name] = field.getValue();
            field.setError(null);
        }

        if (values.email && !values.email.includes("@")) {
            this.fields.email.setError("Invalid email");
        }

        if (values.password && values.password.length < 6) {
            this.fields.password.setError("Password too short");
        }
    }

    handleSubmit(sender) {
        this.validate();
        // Check for errors...
        console.log("Form submitted!");
    }
}

class FormField {
    constructor(name) {
        this.name = name;
        this.value = "";
        this.error = null;
        this.mediator = null;
    }

    setMediator(mediator) {
        this.mediator = mediator;
    }

    setValue(value) {
        this.value = value;
        this.mediator.notify(this, "change");
    }

    getValue() {
        return this.value;
    }

    setError(error) {
        this.error = error;
        if (error) {
            console.log(`Error on ${this.name}: ${error}`);
        }
    }
}
```

## Reverse Engineering Questions

1. How does Mediator differ from Observer?
2. When does a mediator become a "god object" anti-pattern?
3. How would you test components that communicate through a mediator?
4. Compare Mediator vs Event Bus. What are the trade-offs?

---

# Chapter 14 — Command Pattern

## What Problem It Solves

You need to parameterize objects with operations, queue operations, support undo/redo, or log changes. The Command pattern turns a request into a standalone object.

## Implementation

```javascript
// Receiver
class TextEditor {
    constructor() {
        this.content = "";
    }

    insert(text, position = this.content.length) {
        const before = this.content.slice(0, position);
        const after = this.content.slice(position);
        this.content = before + text + after;
    }

    delete(start, end) {
        const before = this.content.slice(0, start);
        const after = this.content.slice(end);
        this.content = before + after;
    }

    getContent() {
        return this.content;
    }
}

// Command interface (conceptual)
class Command {
    execute() { throw new Error("Must implement execute()"); }
    undo() { throw new Error("Must implement undo()"); }
}

// Concrete commands
class InsertCommand extends Command {
    constructor(editor, text, position) {
        super();
        this.editor = editor;
        this.text = text;
        this.position = position;
    }

    execute() {
        this.editor.insert(this.text, this.position);
    }

    undo() {
        this.editor.delete(this.position, this.position + this.text.length);
    }
}

class DeleteCommand extends Command {
    constructor(editor, start, end) {
        super();
        this.editor = editor;
        this.start = start;
        this.end = end;
        this.deletedText = "";
    }

    execute() {
        this.deletedText = this.editor.getContent().slice(this.start, this.end);
        this.editor.delete(this.start, this.end);
    }

    undo() {
        this.editor.insert(this.deletedText, this.start);
    }
}

// Invoker
class CommandHistory {
    constructor() {
        this.history = [];
        this.index = -1;
    }

    execute(command) {
        command.execute();
        this.history = this.history.slice(0, this.index + 1);
        this.history.push(command);
        this.index++;
    }

    undo() {
        if (this.index >= 0) {
            this.history[this.index].undo();
            this.index--;
        }
    }

    redo() {
        if (this.index < this.history.length - 1) {
            this.index++;
            this.history[this.index].execute();
        }
    }
}

// Usage
const editor = new TextEditor();
const history = new CommandHistory();

history.execute(new InsertCommand(editor, "Hello", 0));
history.execute(new InsertCommand(editor, " World", 5));
console.log(editor.getContent()); // "Hello World"

history.undo();
console.log(editor.getContent()); // "Hello"

history.redo();
console.log(editor.getContent()); // "Hello World"
```

## Command with Functions

JavaScript's first-class functions make Command trivially simple:

```javascript
function createCommand(execute, undo) {
    return { execute, undo };
}

const commands = [];
const history2 = {
    execute(command) {
        command.execute();
        commands.push(command);
    },
    undo() {
        const cmd = commands.pop();
        if (cmd) cmd.undo();
    }
};

const addFive = createCommand(
    () => { value += 5; },
    () => { value -= 5; }
);

let value = 10;
history2.execute(addFive);
console.log(value); // 15
history2.undo();
console.log(value); // 10
```

## Real-World Use Case

Redux actions and reducers are a Command pattern variant. `git` operations are commands with undo/redo. Text editors (VSCode, Vim) use Command patterns for every operation.

```javascript
// Transaction commands for a banking system
class DepositCommand {
    constructor(account, amount) {
        this.account = account;
        this.amount = amount;
    }

    execute() {
        this.account.balance += this.amount;
        this.account.transactions.push(`+${this.amount}`);
    }

    undo() {
        this.account.balance -= this.amount;
        this.account.transactions.push(`UNDO: -${this.amount}`);
    }
}

class WithdrawCommand {
    constructor(account, amount) {
        this.account = account;
        this.amount = amount;
    }

    execute() {
        if (this.account.balance < this.amount) {
            throw new Error("Insufficient funds");
        }
        this.account.balance -= this.amount;
        this.account.transactions.push(`-${this.amount}`);
    }

    undo() {
        this.account.balance += this.amount;
        this.account.transactions.push(`UNDO: +${this.amount}`);
    }
}
```

## Reverse Engineering Questions

1. How does the Command pattern enable undo/redo?
2. What is the relationship between Command and Strategy?
3. How would you persist commands for crash recovery?
4. When is the Command pattern over-engineering?

---

# Chapter 15 — Strategy Pattern

## What Problem It Solves

An object needs to use different algorithms at different times. Instead of conditional statements (`if`/`switch`), you encapsulate each algorithm and make them interchangeable.

## Implementation

```javascript
// Strategy interface (conceptual)
class SortStrategy {
    sort(data) { throw new Error("Must implement sort()"); }
}

// Concrete strategies
class BubbleSort extends SortStrategy {
    sort(data) {
        const arr = [...data];
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }
}

class QuickSort extends SortStrategy {
    sort(data) {
        if (data.length <= 1) return data;
        const arr = [...data];
        const pivot = arr[Math.floor(arr.length / 2)];
        const left = arr.filter(x => x < pivot);
        const middle = arr.filter(x => x === pivot);
        const right = arr.filter(x => x > pivot);
        return [...this.sort(left), ...middle, ...this.sort(right)];
    }
}

class BuiltInSort extends SortStrategy {
    sort(data) {
        return [...data].sort((a, b) => a - b);
    }
}

// Context
class Sorter {
    constructor(strategy = new BuiltInSort()) {
        this._strategy = strategy;
    }

    setStrategy(strategy) {
        this._strategy = strategy;
    }

    sort(data) {
        const start = performance.now();
        const result = this._strategy.sort(data);
        const elapsed = performance.now() - start;
        console.log(`${this._strategy.constructor.name} took ${elapsed.toFixed(2)}ms`);
        return result;
    }
}

// Usage
const sorter = new Sorter();
const data = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));

sorter.setStrategy(new QuickSort());
sorter.sort(data);

sorter.setStrategy(new BubbleSort());
sorter.sort(data);
```

## Strategy with Functions

Since strategies are single-method objects, we can use functions directly:

```javascript
const strategies = {
    percentage(price, discount) {
        return price * (1 - discount / 100);
    },
    fixed(price, discount) {
        return Math.max(0, price - discount);
    },
    buyOneGetOne(price, quantity) {
        return price * Math.ceil(quantity / 2);
    }
};

class PriceCalculator {
    constructor(strategy = "percentage") {
        this.strategy = strategies[strategy];
    }

    setStrategy(name) {
        this.strategy = strategies[name];
    }

    calculate(price, quantity, discount) {
        return this.strategy(price, discount, quantity);
    }
}

const calc = new PriceCalculator("percentage");
console.log(calc.calculate(100, 1, 10)); // 90 (10% off)

calc.setStrategy("fixed");
console.log(calc.calculate(100, 1, 15)); // 85 ($15 off)
```

## Real-World Use Case

Express middleware functions are strategies. Authentication strategies in Passport.js. Compression algorithms (gzip, brotli). Logging levels and formats.

```javascript
// Authentication strategies (Passport.js style)
const authStrategies = {
    jwt: (req) => {
        const token = req.headers.authorization?.split(" ")[1];
        // Verify JWT...
        return { id: 1, role: "user" };
    },
    session: (req) => {
        // Check session cookie...
        return req.session?.user || null;
    },
    apiKey: (req) => {
        // Check API key in header...
        return req.headers["x-api-key"] === "secret" ? { id: 1, role: "admin" } : null;
    }
};

class Authenticator {
    constructor(strategies = ["jwt", "session"]) {
        this.strategies = strategies;
    }

    authenticate(req) {
        for (const name of this.strategies) {
            const user = authStrategies[name](req);
            if (user) return { user, strategy: name };
        }
        return { user: null, strategy: null };
    }
}
```

## Reverse Engineering Questions

1. How does Strategy differ from State?
2. What advantages do function-based strategies have over class-based ones?
3. How would you dynamically load strategies from a configuration file?
4. When would using Strategy be worse than a simple `if/else`?

---

# Chapter 16 — State Pattern

## What Problem It Solves

An object's behavior depends on its internal state. With many states, conditionals become unmanageable. The State pattern delegates behavior to state objects.

## Implementation

```javascript
// State interface
class State {
    constructor(player) {
        this.player = player;
    }

    play() { throw new Error("Must implement play()"); }
    pause() { throw new Error("Must implement pause()"); }
    stop() { throw new Error("Must implement stop()"); }
    next() { throw new Error("Must implement next()"); }
    previous() { throw new Error("Must implement previous()"); }
}

// Concrete states
class PlayingState extends State {
    play() {
        console.log("Already playing");
    }

    pause() {
        console.log("Pausing playback");
        this.player.setState(this.player.pausedState);
    }

    stop() {
        console.log("Stopping playback");
        this.player.setState(this.player.stoppedState);
    }

    next() {
        console.log("Skipping to next track");
    }

    previous() {
        console.log("Going back to previous track");
    }
}

class PausedState extends State {
    play() {
        console.log("Resuming playback");
        this.player.setState(this.player.playingState);
    }

    pause() {
        console.log("Already paused");
    }

    stop() {
        console.log("Stopping playback");
        this.player.setState(this.player.stoppedState);
    }

    next() {
        console.log("Skipping to next track (paused)");
    }

    previous() {
        console.log("Going back to previous track (paused)");
    }
}

class StoppedState extends State {
    play() {
        console.log("Starting playback from beginning");
        this.player.setState(this.player.playingState);
    }

    pause() {
        console.log("Cannot pause — player is stopped");
    }

    stop() {
        console.log("Already stopped");
    }

    next() {
        console.log("Cannot skip — player is stopped");
    }

    previous() {
        console.log("Cannot go back — player is stopped");
    }
}

// Context
class MusicPlayer {
    constructor() {
        this.playingState = new PlayingState(this);
        this.pausedState = new PausedState(this);
        this.stoppedState = new StoppedState(this);
        this.state = this.stoppedState;
    }

    setState(state) {
        this.state = state;
    }

    play() { this.state.play(); }
    pause() { this.state.pause(); }
    stop() { this.state.stop(); }
    next() { this.state.next(); }
    previous() { this.state.previous(); }
}

const player = new MusicPlayer();
player.play();   // "Starting playback from beginning"
player.pause();  // "Pausing playback"
player.play();   // "Resuming playback"
player.next();   // "Skipping to next track"
player.stop();   // "Stopping playback"
player.pause();  // "Cannot pause — player is stopped"
```

## Real-World Use Case

HTTP connection states, promise states (pending/fulfilled/rejected), UI component states (loading/empty/error/success), game character states (idle/walking/jumping/attacking).

```javascript
// Promise-like state machine
class SimplePromise {
    constructor() {
        this._state = "pending";
        this._handlers = [];
        this._stateMachine = {
            pending: {
                resolve() { this._transition("fulfilled"); },
                reject() { this._transition("rejected"); }
            },
            fulfilled: {
                resolve() { /* no-op */ },
                reject() { /* no-op */ }
            },
            rejected: {
                resolve() { /* no-op */ },
                reject() { /* no-op */ }
            }
        };
    }

    _transition(newState) {
        this._state = newState;
        this._handlers.forEach(h => h());
    }

    resolve() {
        this._stateMachine[this._state].resolve.call(this);
    }

    reject() {
        this._stateMachine[this._state].reject.call(this);
    }

    get state() {
        return this._state;
    }
}
```

## Reverse Engineering Questions

1. How does State differ from Strategy? (Both swap objects at runtime.)
2. When does State become overkill compared to a simple state variable?
3. How would you persist and restore state?
4. What is a *finite state machine* and how does it relate to this pattern?

---

# Chapter 17 — Iterator Pattern

## What Problem It Solves

Different data structures (arrays, trees, maps) need a uniform way to traverse their elements without exposing their internal structure.

## JavaScript Built-In Iterator Protocol

JavaScript has a standard iterator protocol: objects with a `next()` method that returns `{ value, done }`.

```javascript
// Manual iterator
function createRangeIterator(start, end, step = 1) {
    let current = start;

    return {
        next() {
            if (current >= end) {
                return { value: undefined, done: true };
            }
            const value = current;
            current += step;
            return { value, done: false };
        },

        [Symbol.iterator]() {
            return this;
        }
    };
}

const range = createRangeIterator(0, 5, 1);
console.log([...range]); // [0, 1, 2, 3, 4]
```

## Custom Iterable with Generator

```javascript
class TreeNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    // In-order traversal iterator
    *[Symbol.iterator]() {
        if (this.left) {
            yield* this.left;
        }
        yield this.value;
        if (this.right) {
            yield* this.right;
        }
    }
}

//       1
//      / \
//     2   3
//    / \
//   4   5

const root = new TreeNode(1,
    new TreeNode(2,
        new TreeNode(4),
        new TreeNode(5)
    ),
    new TreeNode(3)
);

console.log([...root]); // [4, 2, 5, 1, 3]
```

## Custom Iterator Class

```javascript
class LinkedList {
    constructor() {
        this.head = null;
    }

    add(value) {
        const node = { value, next: null };
        if (!this.head) {
            this.head = node;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = node;
    }

    [Symbol.iterator]() {
        let current = this.head;

        return {
            next() {
                if (!current) {
                    return { value: undefined, done: true };
                }
                const value = current.value;
                current = current.next;
                return { value, done: false };
            }
        };
    }
}

const list = new LinkedList();
list.add("a");
list.add("b");
list.add("c");

for (const item of list) {
    console.log(item); // "a", "b", "c"
}
```

## Real-World Use Case

`Array.prototype[Symbol.iterator]`, `Map.prototype[Symbol.iterator]`, `Set.prototype[Symbol.iterator]`. Spread operator `[...iterable]` and `for...of` both depend on the iterator protocol. React's generator-based state management.

```javascript
// Pagination iterator
class PaginatedAPI {
    constructor(url, pageSize = 10) {
        this.url = url;
        this.pageSize = pageSize;
    }

    async *[Symbol.asyncIterator]() {
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            const response = await fetch(`${this.url}?page=${page}&limit=${this.pageSize}`);
            const data = await response.json();
            yield* data.items;
            hasMore = data.hasMore;
            page++;
        }
    }
}

// Usage
// for await (const item of new PaginatedAPI("/api/users")) {
//     console.log(item);
// }
```

## Reverse Engineering Questions

1. What is the difference between iterable and iterator?
2. How does `yield*` work for delegation?
3. Why is it important that an iterator can also be iterable?
4. What happens if you modify a collection while iterating over it?

---

# Chapter 18 — Chain of Responsibility Pattern

## What Problem It Solves

A request should be processed by one of several handlers, but the sender should not know which handler. The handlers are chained, and each decides whether to process the request or pass it to the next.

## Implementation

```javascript
class Handler {
    constructor() {
        this.nextHandler = null;
    }

    setNext(handler) {
        this.nextHandler = handler;
        return handler; // For chaining
    }

    handle(request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}

class AuthenticationHandler extends Handler {
    handle(request) {
        if (!request.token) {
            return { error: "Authentication required", status: 401 };
        }
        console.log("Authentication passed");
        return super.handle(request);
    }
}

class AuthorizationHandler extends Handler {
    handle(request) {
        if (request.role !== "admin") {
            return { error: "Insufficient permissions", status: 403 };
        }
        console.log("Authorization passed");
        return super.handle(request);
    }
}

class ValidationHandler extends Handler {
    handle(request) {
        if (!request.body || Object.keys(request.body).length === 0) {
            return { error: "Request body is required", status: 400 };
        }
        console.log("Validation passed");
        return super.handle(request);
    }
}

class CacheHandler extends Handler {
    constructor() {
        super();
        this.cache = new Map();
    }

    handle(request) {
        const key = JSON.stringify(request);
        if (this.cache.has(key)) {
            return { cached: true, data: this.cache.get(key) };
        }
        const result = super.handle(request);
        if (result && !result.error) {
            this.cache.set(key, result.data);
        }
        return result;
    }
}

class BusinessLogicHandler extends Handler {
    handle(request) {
        // Process the request
        return { data: `Processed by ${request.role}`, status: 200 };
    }
}

// Build the chain
const auth = new AuthenticationHandler();
const authorization = new AuthorizationHandler();
const validation = new ValidationHandler();
const cache = new CacheHandler();
const businessLogic = new BusinessLogicHandler();

auth
    .setNext(authorization)
    .setNext(validation)
    .setNext(cache)
    .setNext(businessLogic);

// Test
const validRequest = {
    token: "abc",
    role: "admin",
    body: { action: "delete" }
};

const invalidRequest = {
    token: "abc",
    role: "user",
    body: { action: "read" }
};

console.log(auth.handle(validRequest));
// Authentication passed
// Authorization passed
// Validation passed
// { data: "Processed by admin", status: 200 }

console.log(auth.handle(invalidRequest));
// Authentication passed
// { error: "Insufficient permissions", status: 403 }
```

## Chain with Functions

```javascript
function createMiddleware(...handlers) {
    return function (request) {
        let index = 0;

        function next() {
            const handler = handlers[index++];
            if (handler) {
                return handler(request, next);
            }
            return { data: "No handler processed", status: 500 };
        }

        return next();
    };
}

const pipeline = createMiddleware(
    (req, next) => {
        if (!req.token) return { error: "Unauthorized", status: 401 };
        console.log("Auth OK");
        return next();
    },
    (req, next) => {
        if (req.role !== "admin") return { error: "Forbidden", status: 403 };
        console.log("Role OK");
        return next();
    },
    (req, next) => {
        return { data: `Hello ${req.role}`, status: 200 };
    }
);

console.log(pipeline({ token: "x", role: "admin" }));
// Auth OK
// Role OK
// { data: "Hello admin", status: 200 }
```

## Real-World Use Case

Express/Koa middleware is a chain of responsibility. Each middleware handles the request or passes it to the `next()` function. Error handling middleware at the end of the chain.

```javascript
// Express-style middleware chain
class MiddlewareChain {
    constructor() {
        this.middlewares = [];
    }

    use(fn) {
        this.middlewares.push(fn);
        return this;
    }

    execute(req, res) {
        let index = 0;

        const next = () => {
            const middleware = this.middlewares[index++];
            if (middleware) {
                middleware(req, res, next);
            }
        };

        next();
    }
}

const app = new MiddlewareChain();

app.use((req, res, next) => {
    console.log("Logger:", req.url);
    next();
});

app.use((req, res, next) => {
    req.user = { id: 1, name: "Alice" };
    next();
});

app.use((req, res, next) => {
    res.body = `Hello ${req.user.name}`;
    console.log(res.body); // "Hello Alice"
});
```

## Reverse Engineering Questions

1. How does Chain of Responsibility differ from a simple `if/else` chain?
2. What happens if no handler in the chain processes the request?
3. How would you handle errors thrown by a handler?
4. Can a handler both process the request AND pass it forward? When would this be useful?

---

# Classification Comparison Table

| Category     | Pattern                | Intent                                          | When to Use                                        |
|-------------|------------------------|-------------------------------------------------|----------------------------------------------------|
| **Creational**  | Singleton          | One instance of a class                         | Global config, logger, connection pool             |
| **Creational**  | Factory Method     | Object creation without specifying class        | Dynamic type selection, complex creation           |
| **Creational**  | Abstract Factory   | Families of related objects                     | Cross-platform UI, theming systems                 |
| **Creational**  | Builder            | Step-by-step construction                       | Complex objects, fluent APIs, query builders       |
| **Creational**  | Prototype          | Clone existing objects                          | Object reuse, avoiding costly creation             |
| **Structural**  | Adapter            | Match incompatible interfaces                   | Third-party integration, legacy code               |
| **Structural**  | Decorator          | Add behavior dynamically                        | Middleware, HOCs, logging, caching                 |
| **Structural**  | Facade             | Simplify a subsystem                            | Library APIs, complex tool wrappers                |
| **Structural**  | Proxy              | Control access to an object                     | Lazy loading, validation, caching, logging         |
| **Structural**  | Module             | Encapsulate private state                       | Any JS codebase, library design                    |
| **Structural**  | Mixin              | Compose behaviors across classes                | Horizontal code reuse, utility sharing             |
| **Behavioral**  | Observer           | One-to-many notification                        | Event systems, pub/sub, reactive UIs               |
| **Behavioral**  | Mediator           | Centralize communication                        | Chat systems, form coordination, Air traffic ctrl  |
| **Behavioral**  | Command            | Encapsulate requests as objects                 | Undo/redo, transactions, job queues                |
| **Behavioral**  | Strategy           | Swap algorithms at runtime                      | Sorting, pricing, auth strategies                  |
| **Behavioral**  | State              | Change behavior based on state                  | Finite state machines, workflow engines            |
| **Behavioral**  | Iterator           | Traverse collections uniformly                  | Custom data structures, pagination                 |
| **Behavioral**  | Chain of Resp.     | Pass request along handlers                     | Middleware, pipeline processing, validation chains |

---

# Reverse Engineering Questions

## Fundamental Questions

1. What distinguishes a design pattern from a simple algorithm?
2. Why do some patterns look nearly identical in dynamic languages like JavaScript (e.g., Command and Strategy)?
3. Which patterns become unnecessary or trivial in JavaScript due to first-class functions and dynamic typing?

## Pattern Recognition

4. When reverse engineering a codebase, what cues indicate the use of each pattern?
5. How can you distinguish Adapter from Facade in an unfamiliar codebase?
6. What are the telltale signs of a Singleton (module-level instance, static property, restricted constructor)?

## Trade-Off Questions

7. When does using a design pattern become over-engineering?
8. How do patterns affect testability? Which patterns make testing harder?
9. What is the relationship between design patterns and SOLID principles?
10. How do patterns evolve as a codebase grows from small to large?

## JavaScript-Specific Questions

11. How does JavaScript's `Proxy` built-in relate to the Proxy pattern? Does it replace it?
12. Why is the Module pattern less relevant now that ES modules are standard?
13. How do JavaScript closures make some patterns (Module, Command, Strategy) simpler than in Java?
14. Which pattern does `Array.prototype.map` implement? (Hint: it's not in this list — it's a separate functional pattern.)
15. How does the Iterator pattern enable lazy evaluation in JavaScript?

## Design Questions

16. Your team has 15 legacy classes that each handle logging differently. Which pattern would you use to unify them?
17. A checkout system needs to support multiple payment gateways. Which pattern would you choose?
18. A document editor needs multi-level undo/redo. Which pattern is most appropriate?
19. You are building a real-time dashboard that updates 20 UI widgets when data changes. Which pattern fits?
20. A form with 30 interdependent fields needs validation orchestration. Which pattern would you use?

## Implementation Questions

21. Implement a Singleton that survives hot module replacement (HMR).
22. Implement a caching Proxy that invalidates entries after a TTL.
23. Implement an Observable class with lazy subscription (only starts work when first subscriber arrives).
24. Implement a middleware pipeline that can be interrupted at any point.
25. Implement a finite state machine for a TCP connection (CLOSED, LISTEN, SYN_SENT, SYN_RECEIVED, ESTABLISHED, FIN_WAIT, CLOSE_WAIT, CLOSED).

---

# Summary Table

| Pattern             | Category     | Key JS Feature Used       | Difficulty |
|--------------------|-------------|---------------------------|------------|
| Singleton          | Creational   | Static property, module cache | Easy    |
| Factory Method     | Creational   | First-class functions     | Easy        |
| Abstract Factory   | Creational   | Polymorphism via classes  | Medium      |
| Builder            | Creational   | Method chaining           | Easy        |
| Prototype          | Creational   | `Object.create()`, `__proto__` | Medium  |
| Adapter            | Structural   | Wrapper object            | Easy        |
| Decorator          | Structural   | Function composition, wrapping | Medium  |
| Facade             | Structural   | Simplified API            | Easy        |
| Proxy              | Structural   | `Proxy` built-in, closures | Medium     |
| Module             | Structural   | Closures, IIFE, ES modules | Easy       |
| Mixin              | Structural   | `Object.assign()`, `prototype` | Medium |
| Observer           | Behavioral   | Callbacks, `EventEmitter` | Medium      |
| Mediator           | Behavioral   | Central dispatcher        | Medium      |
| Command            | Behavioral   | Object + function pairs   | Medium      |
| Strategy           | Behavioral   | Function objects, first-class | Easy    |
| State              | Behavioral   | State objects, delegation | Medium      |
| Iterator           | Behavioral   | `Symbol.iterator`, generators | Medium |
| Chain of Resp.     | Behavioral   | Linked functions, `next()` | Medium     |

---

# Key Takeaways

- **Creational** patterns abstract object creation — they make a system independent of how its objects are created.
- **Structural** patterns compose objects and classes into larger structures while keeping them flexible.
- **Behavioral** patterns distribute responsibility and define how objects interact.
- JavaScript's dynamic nature makes some patterns simpler but also means some are built into the language (Proxy, Iterator, Module).
- The best pattern is the simplest one that solves the problem. Over-applying patterns is as harmful as not knowing them.
- Patterns are a vocabulary for communication — knowing them lets you read and reason about code faster.

---

# Next Part (Part 20)

We enter one of the most important areas of modern frontend engineering:

## Part 20 — State Management: Redux, Zustand, Jotai, and Beyond

Including:

- The state management problem: why global state is hard.
- Flux architecture: unidirectional data flow.
- Redux: store, reducers, actions, dispatch, middleware.
- Redux Toolkit: `createSlice`, `configureStore`, RTK Query.
- Zustand: minimal state management with hooks.
- Jotai: atomic state management.
- Valtio: proxy-based state.
- Context API vs external state libraries.
- Normalization and selectors.
- Performance optimizations: `useSelector`, `React.memo`, selectors with `reselect`.
- Persistence, middleware, devtools.
- Testing state logic.
- Reverse engineering state management patterns in production apps.

---

*This is Part 19 of the ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY curriculum. Continue to Part 20 for state management.*
