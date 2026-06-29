# Level 93 - Mixins and composition patterns (Module 19: Inheritance)

## Error Snippets

### Error 1: Mixin overwriting existing method
**Description:** Apply a mixin that overwrites an existing method silently.
```javascript
const CanFly = {
  fly() { return "flying"; }
};
class Bird {
  fly() { return "bird flying"; }
}
Object.assign(Bird.prototype, CanFly);
const b = new Bird();
```

### Error 2: Mixin with conflicting property names
**Description:** Two mixins both define the same property name.
```javascript
const HasName = { label: "unnamed" };
const HasLabel = { label: "untitled" };
class Widget {}
Object.assign(Widget.prototype, HasName, HasLabel);
const w = new Widget();
```

### Error 3: Forgetting to return from mixin function
**Description:** Mixin factory function doesn't return the class.
```javascript
const Loggable = (Base) => {
  class extends Base {
    log(msg) {
      console.log(msg);
    }
  }
};
class App {}
class LoggedApp extends Loggable(App) {}
const app = new LoggedApp();
```

### Error 4: Mixin that uses super but no parent method exists
**Description:** Mixin method calls super.method where method doesn't exist.
```javascript
const TimestampMixin = (Base) => class extends Base {
  save() {
    this.timestamp = Date.now();
    return super.save();
  }
};
class Model {}
class TimestampModel extends TimestampMixin(Model) {}
const m = new TimestampModel();
m.save();
```

### Error 5: Multiple mixins with same super call chain
**Description:** Two mixins both override same method and call super, causing chain break.
```javascript
const A = (Base) => class extends Base {
  process() { return "A:" + super.process(); }
};
const B = (Base) => class extends Base {
  process() { return "B:" + super.process(); }
};
class Base {
  process() { return "base"; }
}
class Derived extends A(B(Base)) {}
const d = new Derived();
```

### Error 6: Applying mixin after instantiation
**Description:** Apply a mixin to the prototype after creating an instance.
```javascript
const mixin = {
  newMethod() { return "new"; }
};
class MyClass {}
const obj = new MyClass();
Object.assign(MyClass.prototype, mixin);
console.log(obj.newMethod());
```

### Error 7: Mixin using private fields incorrectly
**Description:** Mixin tries to access private fields of the target class.
```javascript
const DebugMixin = (Base) => class extends Base {
  debug() {
    return "State: " + this.#state;
  }
};
class Counter {
  #state = 0;
  increment() { this.#state++; }
}
class DebugCounter extends DebugMixin(Counter) {}
const dc = new DebugCounter();
```

### Error 8: Composition with missing delegation
**Description:** Compose an object but forget to delegate one method.
```javascript
class Engine {
  start() { return "engine start"; }
}
class Car {
  constructor() {
    this.engine = new Engine();
  }
  drive() { return "driving"; }
}
const c = new Car();
console.log(c.start());
```

### Error 9: Mixin applied to wrong target
**Description:** Apply mixin to constructor function instead of prototype.
```javascript
const FlyMixin = {
  fly() { return "soaring"; }
};
function Airplane() {}
Object.assign(Airplane, FlyMixin);
const plane = new Airplane();
console.log(plane.fly());
```

### Error 10: Mixin with state shared across instances
**Description:** Mixin defines state on prototype that gets shared.
```javascript
const CounterMixin = {
  count: 0,
  increment() { this.count++; }
};
class MyClass {}
Object.assign(MyClass.prototype, CounterMixin);
const a = new MyClass();
const b = new MyClass();
a.increment();
```

### Error 11: Mixin using this but called out of context
**Description:** Extract mixin method and call without correct this.
```javascript
const SayHello = {
  hello() { return "Hello " + this.name; }
};
class Person {
  constructor(name) { this.name = name; }
}
Object.assign(Person.prototype, SayHello);
const p = new Person("Alice");
const fn = p.hello;
console.log(fn());
```

### Error 12: Composition circular dependency
**Description:** Two composed objects reference each other.
```javascript
class A {
  constructor() {
    this.b = new B(this);
  }
}
class B {
  constructor(a) {
    this.a = a;
  }
}
const a = new A();
```

### Error 13: Multiple mixin application order bug
**Description:** Mixin application order changes behavior unexpectedly.
```javascript
const Logger = (Base) => class extends Base {
  save() { console.log("logging"); return super.save(); }
};
const Validator = (Base) => class extends Base {
  save() { console.log("validating"); return super.save(); }
};
class Model {
  save() { return "saved"; }
}
const Ordered = Logger(Validator(Model));
const m = new Ordered();
m.save();
```

### Error 14: Mixin that returns wrong type
**Description:** Mixin factory returns an object instead of a class.
```javascript
const Serializable = (Base) => {
  return {
    toJSON() { return JSON.stringify(this); }
  };
};
class Data {}
const Extended = Serializable(Data);
```

### Error 15: Overwriting constructor with mixin
**Description:** Mixin replaces the constructor instead of wrapping it.
```javascript
const InitMixin = (Base) => class extends Base {
  constructor() {
    this.initialized = true;
  }
};
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
const InitPoint = InitMixin(Point);
const p = new InitPoint(1, 2);
```

### Error 16: Mixin with no-op base class
**Description:** Mixin expects a class but gets undefined.
```javascript
const Mixin = (Base) => class extends Base {
  extra() { return "extra"; }
};
class Final extends Mixin() {}
const f = new Final();
```

### Error 17: Composition leaking internal reference
**Description:** Composed object exposes internal component directly.
```javascript
class Engine {
  constructor() {
    this.oilLevel = "full";
  }
}
class Car {
  constructor() {
    this.engine = new Engine();
  }
}
const c = new Car();
c.engine.oilLevel = "empty";
```

### Error 18: Mixin that uses static but not marked static
**Description:** Mixin defines instance method that should be static.
```javascript
const StaticMixin = {
  create() { return new this(); }
};
class Model {}
Object.assign(Model, StaticMixin);
const m = Model.create();
```

### Error 19: Forgetting to call super in mixin override
**Description:** Mixin overrides a method but doesn't call super.
```javascript
const LogMixin = (Base) => class extends Base {
  save() {
    console.log("log before");
  }
};
class Repository {
  save() { return "saved"; }
}
class LoggedRepo extends LogMixin(Repository) {}
const r = new LoggedRepo();
r.save();
```

### Error 20: Composition with incomplete interface
**Description:** Composed object doesn't implement all required methods.
```javascript
class Printer {
  constructor(writer) {
    this.writer = writer;
  }
  print(text) {
    return this.writer.write(text);
  }
}
const writer = { write: null };
const p = new Printer(writer);
p.print("hello");
```

### Error 21: Mixin name collision with class method
**Description:** Mixin method has same name as existing class method.
```javascript
const ToStringMixin = {
  toString() { return "mixed"; }
};
class User {
  constructor(name) { this.name = name; }
  toString() { return this.name; }
}
Object.assign(User.prototype, ToStringMixin);
const u = new User("Alice");
```

### Error 22: Using mixin on a frozen object
**Description:** Try to assign mixin methods to a frozen class.
```javascript
class Config {}
Object.freeze(Config.prototype);
const Extension = {
  extra() { return "extra"; }
};
Object.assign(Config.prototype, Extension);
```

### Error 23: Mixin calling non-existent parent constructor
**Description:** Mixin expects parent to have a constructor with specific behavior.
```javascript
const InitMixin = (Base) => class extends Base {
  constructor(...args) {
    super(...args);
    if (!this.id) this.id = Date.now();
  }
};
class Simple {}
const Enhanced = InitMixin(Simple);
const e = new Enhanced();
```

### Error 24: Composition with deep nesting causing performance issues
**Description:** Wrap an object in 100 layers of composition.
```javascript
function wrap(obj) {
  return {
    get() { return obj.get(); }
  };
}
let obj = { get: () => "value" };
for (let i = 0; i < 100; i++) {
  obj = wrap(obj);
}
console.log(obj.get());
```

### Error 25: Mixin that relies on this.constructor
**Description:** Mixin uses this.constructor but it's modified by another mixin.
```javascript
const FactoryMixin = (Base) => class extends Base {
  static create() { return new this(); }
};
const NamedMixin = (Base) => class extends Base {
  static get name() { return "Named"; }
};
class Model {}
const Final = FactoryMixin(NamedMixin(Model));
console.log(Final.create());
```

### Error 26: Mixin with Symbol properties not transferred
**Description:** Mixin defines Symbol-keyed method but assign doesn't copy it.
```javascript
const IterableMixin = {
  [Symbol.iterator]: function*() { yield* this.items; }
};
class Collection {
  constructor() { this.items = []; }
}
Object.assign(Collection.prototype, IterableMixin);
const c = new Collection();
c.items = [1, 2];
console.log([...c]);
```

### Error 27: Composition with broken delegation chain
**Description:** Delegate to child object but child references parent.
```javascript
class Parent {
  constructor() {
    this.child = new Child(this);
  }
  getName() { return "parent"; }
}
class Child {
  constructor(parent) {
    this.parent = parent;
  }
  getName() { return this.parent.getName() + "'s child"; }
}
const p = new Parent();
console.log(p.child.getName());
```

### Error 28: Mixin applied to class after extends
**Description:** Apply mixin to prototype after class definition, overriding methods.
```javascript
class Animal {
  speak() { return "animal"; }
}
const DogMixin = {
  speak() { return "woof"; }
};
Object.assign(Animal.prototype, DogMixin);
class Dog extends Animal {}
const d = new Dog();
```

### Error 29: Mixin with no way to access base class
**Description:** Mixin doesn't save reference to original method.
```javascript
const WrapperMixin = (Base) => class extends Base {
  process() {
    return "wrapped";
  }
};
class Processor {
  process() { return "original"; }
}
const Wrapped = WrapperMixin(Processor);
const w = new Wrapped();
```

### Error 30: Composition using null component
**Description:** Pass null as a composed component.
```javascript
class Report {
  constructor(formatter) {
    this.formatter = formatter;
  }
  generate(data) {
    return this.formatter.format(data);
  }
}
const r = new Report(null);
r.generate("data");
```

### Error 31: Mixin overriding Symbol.hasInstance
**Description:** Mixin changes instanceof behavior unexpectedly.
```javascript
const InstanceMixin = (Base) => class extends Base {
  static [Symbol.hasInstance](inst) {
    return true;
  }
};
class Concrete {}
const Mixed = InstanceMixin(Concrete);
const c = new Mixed();
console.log({} instanceof Mixed);
```

### Error 32: Composition with async initialization
**Description:** Component needs async setup but constructor is sync.
```javascript
class Database {
  async connect() { this.connected = true; }
}
class App {
  constructor() {
    this.db = new Database();
    this.db.connect();
  }
}
const app = new App();
```

### Error 33: Mixin that modifies base class prototype
**Description:** Mixin adds methods directly to Base class instead of creating subclass.
```javascript
const LoggerMixin = (Base) => {
  Base.prototype.log = function(msg) {
    console.log(msg);
  };
  return Base;
};
class DataStore {}
const LoggedStore = LoggerMixin(DataStore);
const a = new DataStore();
const b = new LoggedStore();
a.log("test");
```

### Error 34: Multiple inheritance attempt without mixin pattern
**Description:** Try to use extends with two parents using comma.
```javascript
class A { methodA() { return "A"; } }
class B { methodB() { return "B"; } }
class C extends A, B {
  constructor() { super(); }
}
const c = new C();
```

### Error 35: Mixin that doesn't forward constructor args
**Description:** Mixin constructor doesn't pass all args to super.
```javascript
const ConfigMixin = (Base) => class extends Base {
  constructor(opts) {
    super();
    this.config = opts;
  }
};
class Server {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }
}
const ConfigServer = ConfigMixin(Server);
const s = new ConfigServer({ host: "localhost", port: 8080 });
```

### Error 36: Composition with getter delegation missing
**Description:** Compose object but don't delegate getter/setter.
```javascript
class Temperature {
  constructor() { this._celsius = 0; }
  get celsius() { return this._celsius; }
}
class Thermostat {
  constructor() {
    this.temp = new Temperature();
  }
}
const t = new Thermostat();
console.log(t.temp.celsius);
```

### Error 37: Mixin applied to primitive
**Description:** Try to apply mixin to a primitive value.
```javascript
const mixin = { extra() { return "extra"; } };
Object.assign(42, mixin);
```

### Error 38: Mixin overriding constructor completely
**Description:** Mixin defines constructor that doesn't call super.
```javascript
const NoInitMixin = (Base) => class extends Base {
  constructor() {}
};
class Entity {
  constructor(id) { this.id = id; }
}
const BadEntity = NoInitMixin(Entity);
const e = new BadEntity(1);
```

### Error 39: Composition failing because of method name clash
**Description:** Two composed objects have same method name.
```javascript
class Logger {
  write(msg) { console.log(msg); }
}
class FileWriter {
  write(data) { return "writing to file"; }
}
class App {
  constructor() {
    this.logger = new Logger();
    this.writer = new FileWriter();
  }
  write(msg) {
    this.logger.write(msg);
    this.writer.write(msg);
  }
}
const app = new App();
```

### Error 40: Mixin with dynamic property access
**Description:** Mixin uses computed property names that conflict.
```javascript
const createMixin = (prop) => ({
  [prop]: function(val) { this[prop] = val; return this; }
});
class Builder {}
Object.assign(Builder.prototype, createMixin("build"), createMixin("build"));
const b = new Builder();
```

### Error 41: Composition with no null checks
**Description:** Composed component's method is accessed without checking existence.
```javascript
class OrderProcessor {
  constructor(gateway) {
    this.gateway = gateway;
  }
  process(order) {
    return this.gateway.charge(order.total);
  }
}
const op = new OrderProcessor(undefined);
op.process({ total: 100 });
```

### Error 42: Mixin with same name as built-in method
**Description:** Mixin overrides hasOwnProperty or toString.
```javascript
const OverrideMixin = {
  hasOwnProperty: () => true
};
class Data {}
Object.assign(Data.prototype, OverrideMixin);
const d = new Data();
console.log(d.hasOwnProperty("name"));
```

### Error 43: Mixin that doesn't handle edge cases
**Description:** Mixin factory crashes on null/undefined Base.
```javascript
const SafeMixin = (Base) => {
  if (!Base) throw new Error("Base required");
  return class extends Base {};
};
const result = SafeMixin(null);
```

### Error 44: Composition with spread losing methods
**Description:** Use object spread to compose but methods reference internal state.
```javascript
const canEat = {
  eat() { return "eating " + this.food; }
};
const canWalk = {
  walk() { return "walking"; }
};
const creature = { food: "plants", ...canEat, ...canWalk };
console.log(creature.eat());
```

### Error 45: Mixin that accesses out-of-scope variables
**Description:** Mixin closure references variable that changes.
```javascript
let counter = 0;
const CounterMixin = (Base) => class extends Base {
  getCount() { return counter; }
};
counter = 100;
class Test {}
const TestWithCounter = CounterMixin(Test);
const t = new TestWithCounter();
console.log(t.getCount());
```

### Error 46: Composition with this binding issue
**Description:** Component method loses this when passed as callback.
```javascript
class Engine {
  start() { return "started"; }
}
class Car {
  constructor() {
    this.engine = new Engine();
  }
  start() { return this.engine.start; }
}
const c = new Car();
const fn = c.start();
console.log(fn());
```

### Error 47: Mixin applied multiple times to same class
**Description:** Apply same mixin twice causing double wrapping.
```javascript
const M = (Base) => class extends Base {
  method() { return "M:" + super.method(); }
};
class Core {
  method() { return "core"; }
}
const Applied = M(M(Core));
const a = new Applied();
console.log(a.method());
```

### Error 48: Composition with dynamic method delegation
**Description:** Delegate method calls dynamically but forget some methods.
```javascript
class Proxy {
  constructor(target) {
    this.target = target;
  }
  get(name) {
    return this.target[name];
  }
}
const obj = { a: 1, b: 2 };
const p = new Proxy(obj);
console.log(p.get("toString")());
```

### Error 49: Mixin with constructor that returns value
**Description:** Mixin constructor returns a different object.
```javascript
const ReplaceMixin = (Base) => class extends Base {
  constructor(...args) {
    super(...args);
    return { replaced: true };
  }
};
class Data {
  constructor(val) { this.val = val; }
}
const Replaced = ReplaceMixin(Data);
const d = new Replaced(42);
```

### Error 50: Composition with circular delegation
**Description:** Object delegates to another which delegates back.
```javascript
const objA = { name: "A" };
const objB = { name: "B" };
objA.next = objB;
objB.next = objA;
function getNext(obj) {
  return obj.next.name;
}
console.log(getNext(objA));
```

### Error 51: Mixin calling super on non-existent method in chain
**Description:** In mixin chain, one mixin calls super.method that doesn't exist.
```javascript
const A = (Base) => class extends Base {
  save() { return "A:" + super.save(); }
};
const B = (Base) => class extends Base {
  write() { return "B:" + super.write(); }
};
class Core {
  save() { return "core"; }
}
const Final = A(B(Core));
const f = new Final();
console.log(f.save());
```

### Error 52: Composition with over-encapsulation
**Description:** Component hides everything making composition useless.
```javascript
class Secret {
  #value = 42;
  getValue() { return this.#value; }
}
class Container {
  #secret = new Secret();
  getSecretValue() { return this.#secret.getValue(); }
}
const c = new Container();
console.log(c.getValue());
```

### Error 53: Mixin that modifies static properties
**Description:** Mixin accidentally overrides static properties.
```javascript
const StaticMixin = (Base) => {
  Base.config = { from: "mixin" };
  return Base;
};
class Service {
  static config = { from: "service" };
}
const Mixed = StaticMixin(Service);
console.log(Service.config);
```

### Error 54: Composition with dependency cycle
**Description:** Class A depends on B, B depends on A at construction.
```javascript
class A {
  constructor() {
    this.b = new B();
  }
}
class B {
  constructor() {
    this.a = new A();
  }
}
```

### Error 55: Mixin that relies on this being a class instance
**Description:** Mixin method called in static context.
```javascript
const InstanceMixin = {
  identify() { return this.name; }
};
class Group {
  static create() {
    const g = Object.assign({}, InstanceMixin);
    return g.identify();
  }
}
console.log(Group.create());
```

### Error 56: Composition with shallow copy
**Description:** Compose objects using shallow copy, sharing nested state.
```javascript
const defaultConfig = { timeout: 5000, retry: { count: 3 } };
class Client {
  constructor(config = {}) {
    this.config = { ...defaultConfig, ...config };
  }
}
const a = new Client();
const b = new Client();
a.config.retry.count = 5;
console.log(b.config.retry.count);
```

### Error 57: Mixin with incorrect usage of super in arrow
**Description:** Mixin method uses arrow function that loses super.
```javascript
const ArrowMixin = (Base) => class extends Base {
  constructor() {
    super();
    this.get = () => super.getVal();
  }
};
class BaseClass {
  constructor() { this.val = 42; }
  getVal() { return this.val; }
}
const Mixed = ArrowMixin(BaseClass);
const m = new Mixed();
const fn = m.get;
console.log(fn());
```

### Error 58: Composition using mixin pattern with non-class
**Description:** Apply mixin to a non-class target.
```javascript
const mixin = { extra() { return "yes"; } };
const target = "string";
Object.assign(target, mixin);
```

### Error 59: Mixin that forgets to return class
**Description:** Mixin function returns the base class unmodified.
```javascript
const NoopMixin = (Base) => {
  Base.prototype.extra = function() { return "noop"; };
  return Base;
};
class Core {}
const Extended = NoopMixin(Core);
const e = new Extended();
```

### Error 60: Composition with method override collision
**Description:** Two mixins override the same method independently.
```javascript
const M1 = (Base) => class extends Base {
  method() { return "M1:" + super.method(); }
};
const M2 = (Base) => class extends Base {
  method() { return "M2:" + super.method(); }
};
class Core {
  method() { return "core"; }
}
const Final = M1(M2(Core));
const f = new Final();
```

### Error 61: Mixin that relies on this.constructor.name
**Description:** Mixin uses this.constructor.name which gets mangled.
```javascript
const NamedMixin = (Base) => class extends Base {
  getClassName() { return this.constructor.name; }
};
class MyService {}
const Mixed = NamedMixin(MyService);
const m = new Mixed();
console.log(m.getClassName());
```

### Error 62: Composition with event delegation memory leak
**Description:** Add event listeners in composition but never clean up.
```javascript
class Publisher {
  constructor() {
    this.listeners = [];
  }
  subscribe(fn) { this.listeners.push(fn); }
}
class Subscriber {
  constructor(publisher) {
    publisher.subscribe(() => this.handle());
  }
  handle() {}
}
const pub = new Publisher();
for (let i = 0; i < 1000; i++) {
  new Subscriber(pub);
}
```

### Error 63: Mixin applied after class extension
**Description:** Apply mixin to a subclass after creating another subclass.
```javascript
class Base { method() { return "base"; } }
class Middle extends Base {}
const Mix = { method() { return "mixed"; } };
Object.assign(Middle.prototype, Mix);
class Derived extends Middle {}
const d = new Derived();
```

### Error 64: Composition with inconsistent interfaces
**Description:** Components expected to have same interface but don't.
```javascript
class PDFWriter {
  write(data) { return "pdf:" + data; }
}
class HTMLWriter {
  output(data) { return "html:" + data; }
}
class Report {
  constructor(writer) {
    this.writer = writer;
  }
  generate(data) {
    return this.writer.write(data);
  }
}
const r = new Report(new HTMLWriter());
r.generate("test");
```

### Error 65: Mixin that uses both extends and mixin pattern
**Description:** Class extends a parent and then applies a mixin that also extends.
```javascript
class Animal { eat() { return "eating"; } }
const FlyingMixin = (Base) => class extends Base {
  fly() { return "flying"; }
};
class Bird extends FlyingMixin(Animal) {
  chirp() { return "chirp"; }
}
const b = new Bird();
```

### Error 66: Composition with lost context in promise chain
**Description:** Component method used in .then() loses this.
```javascript
class Fetcher {
  async get(url) { return fetch(url); }
}
class App {
  constructor() {
    this.fetcher = new Fetcher();
  }
  load() {
    return this.fetcher.get("/data").then(this.render);
  }
  render(res) { return res.json(); }
}
const app = new App();
app.load();
```

### Error 67: Mixin with constructor side effects
**Description:** Mixin constructor has side effects that break subclassing.
```javascript
const SideEffectMixin = (Base) => class extends Base {
  constructor(...args) {
    console.log("Mixin constructing");
    super(...args);
  }
};
class Service {
  constructor() { this.ready = true; }
}
const Mixed = SideEffectMixin(Service);
const m = new Mixed();
```

### Error 68: Composition with null prototype
**Description:** Create object with null prototype and try to use mixin methods.
```javascript
const mixin = {
  greet() { return "hi"; }
};
const obj = Object.create(null);
Object.assign(obj, mixin);
console.log(obj.greet());
```

### Error 69: Mixin that calls super in static method
**Description:** Mixin static method calls super but parent has no static method.
```javascript
const StaticMixin = (Base) => class extends Base {
  static getAll() {
    return super.getAll();
  }
};
class Store {}
const Mixed = StaticMixin(Store);
Mixed.getAll();
```

### Error 70: Composition with spread overriding methods
**Description:** Using spread to compose objects overrides existing methods.
```javascript
const base = {
  toString() { return "base"; }
};
const extension = {
  toString() { return "extended"; }
};
const result = { ...base, ...extension };
console.log(result.toString());
```

## Issue Snippets

### Issue 1: Unnecessary inheritance when mixin would suffice
**Description:** Use extends to add logging when a mixin would be cleaner.
```javascript
class Logger {
  log(msg) { console.log(msg); }
}
class UserService extends Logger {
  createUser(data) {
    this.log("Creating user");
  }
}
```

### Issue 2: Composition overused for simple extension
**Description:** Using composition when a simple method would work.
```javascript
class Greeter {
  greet(name) {
    return "Hello " + name;
  }
}
class App {
  constructor() {
    this.greeter = new Greeter();
  }
  run(name) {
    return this.greeter.greet(name);
  }
}
```

### Issue 3: Mixin that adds no new functionality
**Description:** Mixin that only wraps existing methods without adding value.
```javascript
const NoopMixin = (Base) => class extends Base {
  doStuff() {
    return super.doStuff();
  }
};
```

### Issue 4: Deep composition chain for simple features
**Description:** Wrapping an object in 5 layers for a simple feature.
```javascript
class Core { get() { return "value"; } }
class Layer1 { constructor(c) { this.core = c; } get() { return this.core.get(); } }
class Layer2 { constructor(l) { this.layer = l; } get() { return this.layer.get(); } }
class Layer3 { constructor(l) { this.layer = l; } get() { return this.layer.get(); } }
```

### Issue 5: Mixin used where class extension works better
**Description:** Using mixin for simple single-inheritance case.
```javascript
const ExtendMixin = (Base) => class extends Base {
  extra() { return "extra"; }
};
class Core {}
const Extended = ExtendMixin(Core);
```

### Issue 6: Choosing composition for is-a relationship
**Description:** Using composition when inheritance models the relationship better.
```javascript
class Animal {
  breathe() { return "breathing"; }
}
class Dog {
  constructor() {
    this.animal = new Animal();
  }
  breathe() {
    return this.animal.breathe();
  }
}
```

### Issue 7: Mixin applied but method never used
**Description:** Mixin adds several methods but only one is used.
```javascript
const FullMixin = {
  a() {}, b() {}, c() {}, d() {}, e() {}
};
class Lightweight {}
Object.assign(Lightweight.prototype, FullMixin);
```

### Issue 8: Composition with too much delegation boilerplate
**Description:** Manually delegating many methods to composed object.
```javascript
class Engine {
  start() {}
  stop() {}
  accelerate() {}
  brake() {}
  checkOil() {}
}
class Car {
  constructor() {
    this.engine = new Engine();
  }
  start() { this.engine.start(); }
  stop() { this.engine.stop(); }
  accelerate() { this.engine.accelerate(); }
  brake() { this.engine.brake(); }
}
```

### Issue 9: Mixin overwrites class method permanently
**Description:** Mixin applied to prototype overwrites existing method.
```javascript
class Greeter {
  hello() { return "Hello"; }
}
const ExcitedGreeter = {
  hello() { return "Hello!"; }
};
Object.assign(Greeter.prototype, ExcitedGreeter);
```

### Issue 10: Composition with unnecessary indirection
**Description:** Adding a composition layer that does nothing.
```javascript
class Simple {
  compute() { return 42; }
}
class Wrapper {
  constructor() {
    this.simple = new Simple();
  }
  compute() { return this.simple.compute(); }
}
```

### Issue 11: More than 3 mixins on one class
**Description:** Applying too many mixins to a single class.
```javascript
const A = (B) => class extends B {};
const B = (B) => class extends B {};
const C = (B) => class extends B {};
const D = (B) => class extends B {};
const E = (B) => class extends B {};
class Base {}
const Final = A(B(C(D(E(Base)))));
```

### Issue 12: Mixins with overlapping responsibilities
**Description:** Two mixins that both handle serialization differently.
```javascript
const JSONMixin = { toJSON() { return JSON.stringify(this); } };
const XMLMixin = { toXML() { return "<xml>" + this + "</xml>"; } };
```

### Issue 13: Composition without interface contract
**Description:** No check that composed component has required methods.
```javascript
class Robot {
  constructor(brain) {
    this.brain = brain;
  }
  think() {
    return this.brain.process();
  }
}
```

### Issue 14: Mixin uses instance variables without initialization
**Description:** Mixin assumes certain instance variables exist.
```javascript
const StateMixin = {
  isReady() { return this.ready === true; }
};
class Device {}
Object.assign(Device.prototype, StateMixin);
```

### Issue 15: Forgetting Object.assign when composing
**Description:** Creating mixin but forgetting to assign to prototype.
```javascript
const FlyMixin = {
  fly() { return "flying"; }
};
class Bird {}
// Forgot: Object.assign(Bird.prototype, FlyMixin);
```

### Issue 16: Composition with mutable shared state
**Description:** Composed components share mutable state accidentally.
```javascript
const sharedState = { count: 0 };
class Counter {
  increment() { sharedState.count++; }
}
class Display {
  show() { return sharedState.count; }
}
```

### Issue 17: Mixin that assumes this has certain properties
**Description:** Mixin method accesses this.name without checking.
```javascript
const NamedMixin = {
  greet() { return "Hi, " + this.name; }
};
```

### Issue 18: Composition vs inheritance decision confusion
**Description:** Class uses both extends and composition for same concern.
```javascript
class Logger {
  log(msg) { console.log(msg); }
}
class Service extends Logger {
  constructor() {
    super();
    this.logger = new Logger();
  }
  log(msg) { this.logger.log(msg); }
}
```

### Issue 19: Mixin dependency on implementation detail
**Description:** Mixin relies on private implementation of base class.
```javascript
const Mixin = (Base) => class extends Base {
  save() {
    if (this._dirty) return super.save();
  }
};
class Model {
  constructor() { this._dirty = false; }
  save() { return "saved"; }
}
```

### Issue 20: Mixin name too generic causing conflicts
**Description:** Mixin named "Mixin" that could conflict with others.
```javascript
const Mixin = (Base) => class extends Base {
  handle() {}
};
```

### Issue 21: Composition with no abstraction boundary
**Description:** Directly accessing nested component properties.
```javascript
class Computer {
  constructor() {
    this.hardDrive = { read() { return "data"; } };
  }
}
const c = new Computer();
console.log(c.hardDrive.read());
```

### Issue 22: Mixin that duplicates class hierarchy
**Description:** Creating mixin versions of existing class hierarchy.
```javascript
const UserMixin = (Base) => class extends Base { login() {} };
const AdminMixin = (Base) => class extends Base { admin() {} };
const SuperAdminMixin = (Base) => class extends Base { superAdmin() {} };
```

### Issue 23: Composition without error handling
**Description:** No error handling when component method fails.
```javascript
class PaymentProcessor {
  constructor(gateway) {
    this.gateway = gateway;
  }
  pay(amount) {
    return this.gateway.charge(amount);
  }
}
```

### Issue 24: Mixins used but class doesn't need them
**Description:** Applying mixins that provide unused functionality.
```javascript
const Flyable = { fly() {} };
const Swimmable = { swim() {} };
const Runnable = { run() {} };
class Animal {}
Object.assign(Animal.prototype, Flyable, Swimmable, Runnable);
```

### Issue 25: Composition with implicit dependencies
**Description:** Component depends on global state instead of explicit injection.
```javascript
class Logger {
  log(msg) { console.log(msg); }
}
class App {
  constructor() {
    this.logger = new Logger();
  }
}
```

### Issue 26: Mixin with constructor args that conflict
**Description:** Mixin constructor expects specific args that clash with base.
```javascript
const Configurable = (Base) => class extends Base {
  constructor(config) {
    super(config);
    this.config = config;
  }
};
```

### Issue 27: Composition patterns mixed inconsistently
**Description:** Some features use inheritance, others use composition inconsistently.
```javascript
class Engine { start() {} }
class Car extends Engine {
  constructor() {
    super();
    this.wheels = new Wheels();
  }
}
class Wheels { rotate() {} }
```

### Issue 28: Over-relying on mixins for code reuse
**Description:** All code reuse done through mixins even for simple cases.
```javascript
const AddMixin = (Base) => class extends Base { add(a, b) { return a + b; } };
const SubtractMixin = (Base) => class extends Base { sub(a, b) { return a - b; } };
```

### Issue 29: Composition with circular object references
**Description:** Objects in composition referencing each other.
```javascript
class Parent {
  constructor() { this.child = null; }
}
class Child {
  constructor() { this.parent = null; }
}
```

### Issue 30: Mixin that overrides constructor without calling super
**Description:** Mixin constructor forgets to call super.
```javascript
const InitMixin = (Base) => class extends Base {
  constructor() {
    this.initialized = true;
  }
};
```

## Modify Snippets

### Modify 1: Create a simple mixin
**Description:** Create a Loggable mixin that adds a log method to any class.
```javascript
// Create Loggable mixin that adds log(msg) method
class Calculator {
  add(a, b) { return a + b; }
}
// Apply Loggable mixin to Calculator
```

### Modify 2: Create a mixin factory
**Description:** Create a TimestampMixin factory that adds timestamp on save.
```javascript
// Create TimestampMixin factory
class Model {
  save() { return "saved"; }
}
// Apply TimestampMixin to Model
```

### Modify 3: Compose an object from multiple sources
**Description:** Create a robot by composing canEat, canSleep, canWork mixins together.
```javascript
const canEat = { eat() { return "eating"; } };
const canSleep = { sleep() { return "sleeping"; } };
const canWork = { work() { return "working"; } };
// Compose a robot object from all three mixins
```

### Modify 4: Create a mixin with super call
**Description:** Create ValidationMixin that overrides save and calls super.
```javascript
// Create ValidationMixin
class Repository {
  save(data) { return "saved"; }
}
// Apply and use
```

### Modify 5: Create a chain of mixins
**Description:** Apply Logging, Validation, and Cache mixins to a DataService.
```javascript
class DataService {
  fetch(id) { return { id }; }
}
// Create LoggingMixin, ValidationMixin, CacheMixin
// Apply all three to DataService
```

### Modify 6: Create a mixin that adds static methods
**Description:** Create a StaticFindMixin that adds static find method.
```javascript
// Create StaticFindMixin
class Model {}
// Apply to Model
```

### Modify 7: Convert inheritance to composition
**Description:** Car extends Engine. Refactor to use composition instead.
```javascript
class Engine {
  start() { return "engine start"; }
}
class Car extends Engine {
  drive() { return "driving"; }
}
// Refactor Car to use composition instead of inheritance
```

### Modify 8: Create a mixin with state
**Description:** Create a Countable mixin that tracks method call count.
```javascript
// Create Countable mixin
class Service {
  process() { return "processed"; }
}
// Apply and track calls
```

### Modify 9: Create a mixin that adds Symbol.iterator
**Description:** Create IterableMixin that adds iteration support.
```javascript
// Create IterableMixin
class Team {
  constructor() { this.members = []; }
}
// Apply to Team
```

### Modify 10: Create a configurable mixin
**Description:** Create a ConfigMixin that takes options.
```javascript
// Create ConfigMixin factory that accepts options
class Server {
  start() { return "started"; }
}
// Apply with { host: 'localhost', port: 3000 }
```

### Modify 11: Create a mixin that adds getters/setters
**Description:** Create ObservableMixin that adds property change notification.
```javascript
// Create ObservableMixin
class Store {
  constructor() { this.data = {}; }
}
// Apply to Store
```

### Modify 12: Compose using class factory pattern
**Description:** Create a withLogger, withValidator function chain.
```javascript
// Create withLogger, withValidator factories
class Handler {
  handle(req) { return req; }
}
// Compose: const Enhanced = withLogger(withValidator(Handler))
```

### Modify 13: Create a mixin that prevents method override
**Description:** Create a SealMixin that prevents overwriting certain methods.
```javascript
// Create SealMixin
class Service {
  critical() { return "critical"; }
}
// Apply SealMixin to protect critical method
```

### Modify 14: Create a mixin for event emission
**Description:** Create EventEmitterMixin that adds on/emit/off methods.
```javascript
// Create EventEmitterMixin
class Button {
  click() {}
}
// Apply to Button
```

### Modify 15: Create a mixin that adds caching
**Description:** Create CacheMixin that caches method results.
```javascript
// Create CacheMixin
class Calculator {
  compute(n) { return n * n; }
}
// Apply to Calculator
```

### Modify 16: Create a mixin for retry logic
**Description:** Create RetryMixin that retries failed methods.
```javascript
// Create RetryMixin
class APIClient {
  async fetch(url) { return fetch(url); }
}
// Apply to APIClient
```

### Modify 17: Create a mixin that adds timeout
**Description:** Create TimeoutMixin that adds timeout to async methods.
```javascript
// Create TimeoutMixin with configurable timeout
class Fetcher {
  async get(url) { return fetch(url); }
}
// Apply to Fetcher
```

### Modify 18: Use composition to build a computer
**Description:** Build a Computer class using CPU, RAM, Storage components.
```javascript
class CPU { process() { return "processing"; } }
class RAM { store() { return "storing"; } }
class Storage { save() { return "saving"; } }
// Build Computer using composition
```

### Modify 19: Create a mixin for singleton pattern
**Description:** Create SingletonMixin that ensures single instance.
```javascript
// Create SingletonMixin
class Database {}
// Apply to Database
```

### Modify 20: Create a mixin that adds validation
**Description:** Create ValidatableMixin that checks required fields.
```javascript
// Create ValidatableMixin
class User {
  constructor(data) { this.data = data; }
}
// Apply to User
```

### Modify 21: Create a mixin for serialization
**Description:** Create SerializableMixin with toJSON and fromJSON.
```javascript
// Create SerializableMixin
class Product {
  constructor(name, price) { this.name = name; this.price = price; }
}
// Apply to Product
```

### Modify 22: Create a benchmark mixin
**Description:** Create BenchmarkMixin that measures method execution time.
```javascript
// Create BenchmarkMixin
class DataProcessor {
  process(data) { return data.map(x => x * 2); }
}
// Apply to DataProcessor
```

### Modify 23: Create a mixin with lifecycle hooks
**Description:** Create LifecycleMixin with before/after hooks for methods.
```javascript
// Create LifecycleMixin
class Service {
  execute(task) { return "done: " + task; }
}
// Apply with before and after hooks
```

### Modify 24: Compose using object.assign pattern
**Description:** Create a user object by composing multiple behavior objects.
```javascript
const canLogin = { login() { return "logged in"; } };
const canPost = { post() { return "posted"; } };
const canAdmin = { admin() { return "admin"; } };
// Compose different user roles
```

### Modify 25: Create a mixin that adds array-like behavior
**Description:** Create ArrayLikeMixin with push, pop, length.
```javascript
// Create ArrayLikeMixin
class Collection {}
// Apply to Collection
```

### Modify 26: Create a mixin for undo/redo
**Description:** Create UndoableMixin that tracks state changes.
```javascript
// Create UndoableMixin
class Editor {
  update(content) { this.content = content; }
}
// Apply to Editor
```

### Modify 27: Create a mixin with method interception
**Description:** Create InterceptMixin that logs all method calls.
```javascript
// Create InterceptMixin using Proxy-like pattern
class Calculator {
  add(a, b) { return a + b; }
  mul(a, b) { return a * b; }
}
// Apply to Calculator
```

### Modify 28: Create a multi-mixin configuration
**Description:** Apply Configurable, Loggable, Validatable mixins to a Form class.
```javascript
const Configurable = (Base) => class extends Base { /* ... */ };
const Loggable = (Base) => class extends Base { /* ... */ };
const Validatable = (Base) => class extends Base { /* ... */ };
class Form {
  submit() { return "submitted"; }
}
// Apply all three mixins
```

### Modify 29: Create a mixin that adds pooling
**Description:** Create PoolMixin that manages object pool.
```javascript
// Create PoolMixin
class Connection {
  query(sql) { return "results"; }
}
// Apply to Connection
```

### Modify 30: Create a priority-based mixin chain
**Description:** Create a mixin ordering system where priority determines chain order.
```javascript
const withAuth = (B) => class extends B { /* auth */ };
const withCache = (B) => class extends B { /* cache */ };
const withLog = (B) => class extends B { /* log */ };
class Handler {
  handle(r) { return r; }
}
// Apply in priority order
```

### Modify 31: Create a mixin for rate limiting
**Description:** Create RateLimitMixin that limits calls per time window.
```javascript
// Create RateLimitMixin
class Fetcher {
  fetch(url) { return "data from " + url; }
}
// Apply to Fetcher
```

### Modify 32: Create a decorator using composition
**Description:** Wrap a service with logging and timing using composition.
```javascript
class ShoppingService {
  checkout(cart) { return "checked out"; }
}
// Create LoggedShoppingService and TimedShoppingService using composition
```

### Modify 33: Create a mixin for observable properties
**Description:** Create ObservablePropertyMixin that notifies on property change.
```javascript
// Create ObservablePropertyMixin
class Profile {
  constructor() { this.name = ""; }
}
// Apply to Profile
```

### Modify 34: Create a mixin that handles errors gracefully
**Description:** Create SafeMixin that catches errors from any method.
```javascript
// Create SafeMixin
class FragileService {
  risky() { throw new Error("fail"); }
}
// Apply SafeMixin to FragileService
```

### Modify 35: Create a mixin for middleware pattern
**Description:** Create MiddlewareMixin that chains middleware functions.
```javascript
// Create MiddlewareMixin
class Server {
  handle(req) { return req; }
}
// Apply with middleware support
```

### Modify 36: Create a mixin for factory methods
**Description:** Create FactoryMixin that adds static create method.
```javascript
// Create FactoryMixin
class User {
  constructor(name) { this.name = name; }
}
// Apply FactoryMixin
```

### Modify 37: Create a mixin for computed properties
**Description:** Create ComputedMixin that adds computed property support.
```javascript
// Create ComputedMixin
class Order {
  constructor(items) { this.items = items; }
}
// Apply with computed total property
```

### Modify 38: Create a strategy pattern using composition
**Description:** Build a PaymentProcessor that composes different payment strategies.
```javascript
// Create CreditCard, PayPal, Crypto payment strategies
class PaymentProcessor {
  constructor(strategy) {}
  pay(amount) {}
}
// Compose strategies
```

### Modify 39: Create a mixin for dependency injection
**Description:** Create InjectableMixin that auto-wires dependencies.
```javascript
// Create InjectableMixin
class ServiceA { doA() { return "A"; } }
class ServiceB { doB() { return "B"; } }
// Apply with DI support
```

### Modify 40: Create a mixin for memoization with TTL
**Description:** Create TTLCacheMixin that caches with time-based expiration.
```javascript
// Create TTLCacheMixin
class ExpensiveComputer {
  compute(key) { return "result"; }
}
// Apply with 5 second TTL
```

### Modify 41: Create a mixin for batch operations
**Description:** Create BatchMixin that batches method calls.
```javascript
// Create BatchMixin
class DBWriter {
  write(record) { return "written"; }
}
// Apply with batch size of 10
```

### Modify 42: Create a composite pattern using composition
**Description:** Build a file system using composite pattern with files and folders.
```javascript
// Create File and Folder classes
// Folder contains Files and sub-Folders
// Both share a common interface
```

### Modify 43: Create a mixin for state machine
**Description:** Create StateMachineMixin that adds state management.
```javascript
// Create StateMachineMixin
class Order {
  process() {}
  ship() {}
}
// Apply with states: pending, processing, shipped
```

### Modify 44: Create a mixin for throttling
**Description:** Create ThrottleMixin that throttles method calls.
```javascript
// Create ThrottleMixin
class SearchService {
  search(query) { return "results"; }
}
// Apply with 300ms throttle
```

### Modify 45: Create a mixin for debouncing
**Description:** Create DebounceMixin that debounces method calls.
```javascript
// Create DebounceMixin
class AutoSave {
  save(data) { return "saved"; }
}
// Apply with 1 second debounce
```

### Modify 46: Create a plugin system using composition
**Description:** Build a PluginHost that can load and compose plugins.
```javascript
// Create PluginHost class
// Create Plugin interface
// Build sample plugins (Logger, Validator, Formatter)
```

### Modify 47: Create a mixin for transaction support
**Description:** Create TransactionalMixin that supports begin/commit/rollback.
```javascript
// Create TransactionalMixin
class Database {
  query(sql) { return "results"; }
}
// Apply with transaction support
```

### Modify 48: Create a mixin for lazy loading
**Description:** Create LazyMixin that lazy-initializes properties.
```javascript
// Create LazyMixin
class HeavyService {
  constructor() { this.data = this.loadData(); }
  loadData() { return "heavy data"; }
}
// Apply with lazy initialization
```

### Modify 49: Create a mixin for audit trail
**Description:** Create AuditableMixin that logs all state changes.
```javascript
// Create AuditableMixin
class Document {
  setContent(text) { this.content = text; }
}
// Apply to Document
```

### Modify 50: Build a full composition example
**Description:** Build a complete e-commerce system using composition patterns.
```javascript
// Create Pricing, Inventory, Shipping, TaxCalculator components
// Build Product, Cart, Order classes
// Use composition to assemble a complete Checkout system
