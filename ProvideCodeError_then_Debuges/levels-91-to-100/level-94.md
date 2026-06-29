# Level 94 - Inheritance vs composition deep dive (Module 19: Inheritance)

## Error Snippets

### Error 1: Using inheritance when behavior varies across instances
**Description:** Different animals need different sounds but inheritance fixes one sound per class.
```javascript
class Animal {
  speak() { return "generic"; }
}
class Dog extends Animal {
  speak() { return "Woof"; }
}
class Cat extends Animal {
  speak() { return "Meow"; }
}
const pets = [new Dog(), new Cat(), new Dog()];
```

### Error 2: Inheritance causes brittle base class
**Description:** Changing base class breaks all subclasses.
```javascript
class Parser {
  parse(data) {
    return data.split(",");
  }
}
class CSVParser extends Parser {
  parse(data) {
    return super.parse(data).map(s => s.trim());
  }
}
class TSVParser extends Parser {
  parse(data) {
    return super.parse(data);
  }
}
```

### Error 3: Deep inheritance for configuration
**Description:** Configuration classes with 5 levels of inheritance for simple differences.
```javascript
class Config { constructor() { this.host = "localhost"; } }
class DevConfig extends Config { constructor() { super(); this.debug = true; } }
class StagingConfig extends DevConfig { constructor() { super(); this.host = "staging"; } }
class ProdConfig extends StagingConfig { constructor() { super(); this.host = "prod"; this.debug = false; } }
class TestConfig extends ProdConfig { constructor() { super(); this.mock = true; } }
```

### Error 4: Inheritance used where interface extraction is needed
**Description:** Different output formats forced into inheritance hierarchy.
```javascript
class Outputter {
  output(data) { return data; }
}
class JSONOutputter extends Outputter {
  output(data) { return JSON.stringify(data); }
}
class HTMLOutputter extends Outputter {
  output(data) { return "<html>" + data + "</html>"; }
}
class XMLOutputter extends Outputter {
  output(data) { return "<xml>" + data + "</xml>"; }
}
```

### Error 5: Composition avoiding inheritance but with massive delegation
**Description:** Delegating 20 methods manually instead of using inheritance.
```javascript
class Engine {
  start() { return "start"; }
  stop() { return "stop"; }
  accelerate() { return "accel"; }
  brake() { return "brake"; }
}
class Car {
  constructor() { this.engine = new Engine(); }
  start() { return this.engine.start(); }
  stop() { return this.engine.stop(); }
  accelerate() { return this.engine.accelerate(); }
  brake() { return this.engine.brake(); }
}
```

### Error 6: Inheritance misuse for utility classes
**Description:** Creating inheritance chain for formatting utilities.
```javascript
class BaseFormatter {
  format(s) { return s; }
}
class UpperFormatter extends BaseFormatter {
  format(s) { return s.toUpperCase(); }
}
class LowerFormatter extends UpperFormatter {
  format(s) { return s.toLowerCase(); }
}
class CapitalizeFormatter extends LowerFormatter {
  format(s) { return s[0].toUpperCase() + s.slice(1); }
}
```

### Error 7: Using inheritance when behavior is selected at runtime
**Description:** Switch on type to determine behavior, defeating inheritance purpose.
```javascript
class PaymentMethod {
  pay(amount) { return "paid"; }
}
class CreditCard extends PaymentMethod {}
class PayPal extends PaymentMethod {}
class Cash extends PaymentMethod {}
function process(payment, amount) {
  if (payment instanceof CreditCard) amount += amount * 0.03;
  if (payment instanceof PayPal) amount += 0.5;
  return payment.pay(amount);
}
```

### Error 8: Composition with no abstraction layer
**Description:** Directly using component objects without encapsulation.
```javascript
class Order {
  constructor() {
    this.taxCalculator = new TaxCalculator();
    this.shippingCalculator = new ShippingCalculator();
  }
  getTotal() {
    return this.subtotal + this.taxCalculator.calculate(this.subtotal) + this.shippingCalculator.calculate(this.weight);
  }
}
```

### Error 9: Inheritance causes code duplication across branches
**Description:** Two sibling classes need same feature but can't share without restructuring.
```javascript
class Bird {
  layEgg() { return "egg"; }
}
class FlyingBird extends Bird {
  fly() { return "flying"; }
}
class SwimmingBird extends Bird {
  swim() { return "swimming"; }
}
class FlyingSwimmingBird extends FlyingBird {
  swim() { return "swimming"; }
}
```

### Error 10: Overriding methods with type-specific logic but using instanceof anyway
**Description:** Using instanceof checks in addition to polymorphism.
```javascript
class Animal {
  makeSound() { return "sound"; }
}
class Dog extends Animal {
  makeSound() { return "bark"; }
}
class Cat extends Animal {
  makeSound() { return "meow"; }
}
function listen(animal) {
  if (animal instanceof Dog) return animal.makeSound() + " loudly";
  return animal.makeSound();
}
```

### Error 11: Inheriting from concrete class with many methods
**Description:** Need one method but inherits dozens.
```javascript
class WebServer {
  start() {}
  stop() {}
  configure() {}
  addRoute() {}
  handleRequest() {}
  listen() {}
  close() {}
}
class HealthCheckServer extends WebServer {
  constructor() {
    super();
    this.addRoute("/health", (req, res) => res.send("ok"));
  }
}
```

### Error 12: Inheritance hierarchy that is too deep for simple concept
**Description:** 6-level hierarchy for a simple UI button.
```javascript
class UIElement {}
class InteractiveElement extends UIElement {}
class ClickableElement extends InteractiveElement {}
class ButtonBase extends ClickableElement {}
class StyledButton extends ButtonBase {}
class PrimaryButton extends StyledButton {}
```

### Error 13: Composition with leaked implementation
**Description:** Component's internal state accessible from outside.
```javascript
class Engine {
  constructor() { this.fuelLevel = 100; }
}
class Car {
  constructor() {
    this.engine = new Engine();
  }
}
const c = new Car();
c.engine.fuelLevel = 0;
```

### Error 14: Using extends just to access protected-like methods
**Description:** Extending a class just to access its internal methods.
```javascript
class Database {
  _query(sql) { return "data"; }
}
class UserService extends Database {
  getUsers() { return this._query("SELECT * FROM users"); }
}
```

### Error 15: Composition but forgetting to delegate
**Description:** Car has Engine but doesn't expose start method.
```javascript
class Engine {
  start() { return "vroom"; }
}
class Car {
  constructor() {
    this.engine = new Engine();
  }
}
const c = new Car();
console.log(c.start());
```

### Error 16: Inheritance when only one method differs
**Description:** Logger classes differ only in output format.
```javascript
class Logger {
  log(msg) { console.log(msg); }
}
class FileLogger extends Logger {
  log(msg) { fs.writeFileSync("log.txt", msg); }
}
class NetworkLogger extends Logger {
  log(msg) { fetch("/log", { method: "POST", body: msg }); }
}
```

### Error 17: Composition with no interface contract
**Description:** Components don't implement a shared interface.
```javascript
class PaypalGateway {
  sendPayment(amount) { return "paid"; }
}
class StripeGateway {
  charge(amount) { return "charged"; }
}
class Checkout {
  constructor(gateway) {
    this.gateway = gateway;
  }
  process(amount) {
    return this.gateway.charge(amount);
  }
}
```

### Error 18: Inheritance used for cross-cutting concerns
**Description:** Logging mixed into business logic via inheritance.
```javascript
class LoggedService {
  log(msg) { console.log(msg); }
}
class UserService extends LoggedService {
  createUser(data) {
    this.log("Creating user");
  }
}
class ProductService extends LoggedService {
  createProduct(data) {
    this.log("Creating product");
  }
}
```

### Error 19: Subclass violates Liskov substitution principle
**Description:** Child class has stronger preconditions than parent.
```javascript
class Rectangle {
  setWidth(w) { this.width = w; }
  setHeight(h) { this.height = h; }
  getArea() { return this.width * this.height; }
}
class Square extends Rectangle {
  setWidth(w) {
    this.width = w;
    this.height = w;
  }
  setHeight(h) {
    this.width = h;
    this.height = h;
  }
}
```

### Error 20: Composition without dependency injection
**Description:** Creating dependencies inside constructor, hard to test.
```javascript
class OrderService {
  constructor() {
    this.db = new Database();
    this.email = new EmailService();
    this.logger = new Logger();
  }
  place(order) {
    this.db.save(order);
    this.email.send(order);
    this.logger.log("Order placed");
  }
}
```

### Error 21: Inheritance hierarchy that mirrors database tables
**Description:** One class per database table with deep inheritance.
```javascript
class Record {}
class UserRecord extends Record {}
class AdminRecord extends UserRecord {}
class SuperAdminRecord extends AdminRecord {}
```

### Error 22: Using inheritance when strategy pattern is better
**Description:** Different encryption algorithms via inheritance.
```javascript
class Encryptor {
  encrypt(data) { return data; }
}
class AESEncryptor extends Encryptor {
  encrypt(data) { return "AES:" + data; }
}
class DESEncryptor extends Encryptor {
  encrypt(data) { return "DES:" + data; }
}
```

### Error 23: Composition with tight coupling
**Description:** Component classes know about each other.
```javascript
class Engine {
  constructor(car) { this.car = car; }
  start() { return "Engine started for " + this.car.model; }
}
class Car {
  constructor(model) {
    this.model = model;
    this.engine = new Engine(this);
  }
}
```

### Error 24: Inheritance creates god base class
**Description:** Base class has 30 methods, most unused by subclasses.
```javascript
class GodClass {
  save() {}
  delete() {}
  update() {}
  find() {}
  validate() {}
  export() {}
  import() {}
  backup() {}
  restore() {}
  notify() {}
}
class Lightweight extends GodClass {
  get() {}
}
```

### Error 25: Composition with shared mutable state
**Description:** Multiple components reference same mutable object.
```javascript
const state = { count: 0 };
class CounterA {
  increment() { state.count++; }
}
class CounterB {
  increment() { state.count++; }
}
const a = new CounterA();
const b = new CounterB();
a.increment();
```

### Error 26: Using inheritance for singleton components
**Description:** Singleton pattern broken by inheritance.
```javascript
class AppConfig {
  static instance;
  constructor() {
    if (AppConfig.instance) return AppConfig.instance;
    AppConfig.instance = this;
    this.theme = "light";
  }
}
class DevConfig extends AppConfig {
  constructor() {
    super();
    this.debug = true;
  }
}
```

### Error 27: Composition pattern with cyclic initialization
**Description:** Component A needs B, B needs A.
```javascript
class ServiceA {
  constructor() {
    this.b = new ServiceB();
  }
}
class ServiceB {
  constructor() {
    this.a = new ServiceA();
  }
}
```

### Error 28: Inheritance misused for filter/sort variations
**Description:** Different sorting algorithms via inheritance.
```javascript
class Sorter {
  sort(arr) { return arr; }
}
class BubbleSorter extends Sorter {
  sort(arr) { return arr.sort((a, b) => a - b); }
}
class QuickSorter extends Sorter {
  sort(arr) { return arr.sort((a, b) => a - b); }
}
```

### Error 29: Composition exposing internal methods
**Description:** Component's helper methods exposed to host.
```javascript
class TaxCalculator {
  calculate(subtotal) { return subtotal * 0.1; }
  getTaxRate() { return 0.1; }
  validateZipCode(zip) { return zip.length === 5; }
}
class Invoice {
  constructor() {
    this.tax = new TaxCalculator();
  }
  generate(items) {
    return this.tax.calculate(items.reduce((s, i) => s + i.price, 0));
  }
}
```

### Error 30: Inheritance for feature flags
**Description:** Feature toggling via class hierarchy.
```javascript
class BasicPlan {
  maxUsers() { return 10; }
}
class ProPlan extends BasicPlan {
  maxUsers() { return 100; }
}
class EnterprisePlan extends ProPlan {
  maxUsers() { return Infinity; }
}
```

### Error 31: Composition with incorrect granularity
**Description:** One component does too many things.
```javascript
class EverythingService {
  validate() {}
  save() {}
  sendEmail() {}
  generatePDF() {}
  log() {}
  cache() {}
}
class App {
  constructor() {
    this.service = new EverythingService();
  }
}
```

### Error 32: Deep inheritance for UI components
**Description:** Complex UI widget hierarchy for simple components.
```javascript
class Widget {
  render() { return ""; }
}
class ContainerWidget extends Widget {}
class StyledWidget extends ContainerWidget {}
class ClickableWidget extends StyledWidget {}
class ButtonWidget extends ClickableWidget {}
```

### Error 33: Composition pattern ignored - using instanceof
**Description:** Type-checking instead of polymorphic dispatch.
```javascript
class Payment {
  process() {}
}
class Refund extends Payment {
  process() { return "refund"; }
}
class Charge extends Payment {
  process() { return "charge"; }
}
function handle(payment) {
  if (payment instanceof Refund) return "processing refund";
  if (payment instanceof Charge) return "processing charge";
}
```

### Error 34: Inheritance used for data transfer objects
**Description:** DTOs in inheritance hierarchy.
```javascript
class BaseDTO {
  constructor() { this.created = new Date(); }
}
class UserDTO extends BaseDTO {
  constructor(name) {
    super();
    this.name = name;
  }
}
class AdminDTO extends UserDTO {
  constructor(name) {
    super(name);
    this.role = "admin";
  }
}
```

### Error 35: Composition with hidden dependencies
**Description:** Component creates its own dependencies internally.
```javascript
class ReportGenerator {
  constructor() {
    this.fetcher = new DataFetcher();
    this.formatter = new ReportFormatter();
    this.printer = new ReportPrinter();
  }
}
```

### Error 36: Inheritance leads to yo-yo problem
**Description:** Need to read up and down hierarchy to understand a method.
```javascript
class A { method() { return "A"; } }
class B extends A { method() { return super.method() + "B"; } }
class C extends B { method() { return super.method() + "C"; } }
class D extends C { method() { return super.method() + "D"; } }
class E extends D { method() { return super.method() + "E"; } }
```

### Error 37: Composition without clear ownership
**Description:** Both parent and child manage same resource.
```javascript
class ConnectionPool {
  constructor() { this.connections = []; }
  acquire() { this.connections.push("conn"); }
  release() { this.connections.pop(); }
}
class Service {
  constructor() { this.pool = new ConnectionPool(); }
  run() { this.pool.acquire(); }
}
```

### Error 38: Inheritance from concrete collection classes
**Description:** Extending Array/Map for simple use cases.
```javascript
class UserList extends Array {
  add(user) { this.push(user); }
  getByName(name) { return this.find(u => u.name === name); }
}
```

### Error 39: Composition with too many small objects
**Description:** Splitting into too many tiny components.
```javascript
class FirstNameValidator { validate(name) { return name.length > 0; } }
class LastNameValidator { validate(name) { return name.length > 0; } }
class EmailValidator { validate(email) { return email.includes("@"); } }
class AgeValidator { validate(age) { return age > 0; } }
class PhoneValidator { validate(phone) { return phone.length > 9; } }
class UserValidator {
  constructor() {
    this.firstName = new FirstNameValidator();
    this.lastName = new LastNameValidator();
    this.email = new EmailValidator();
    this.age = new AgeValidator();
    this.phone = new PhoneValidator();
  }
}
```

### Error 40: Using inheritance for strategy selection
**Description:** Strategy pattern implemented with switch + inheritance.
```javascript
class Compressor {
  compress(data) { return data; }
}
class ZipCompressor extends Compressor {
  compress(data) { return "zip:" + data; }
}
class GzipCompressor extends Compressor {
  compress(data) { return "gzip:" + data; }
}
function getCompressor(type) {
  if (type === "zip") return new ZipCompressor();
  if (type === "gzip") return new GzipCompressor();
}
```

### Error 41: Composition without error boundaries
**Description:** Error in one component crashes the whole system.
```javascript
class PaymentGateway {
  charge() { throw new Error("gateway down"); }
}
class Checkout {
  constructor() { this.gateway = new PaymentGateway(); }
  process() { return this.gateway.charge(); }
}
```

### Error 42: Inheritance used when behavior per instance differs
**Description:** Same class hierarchy but each instance needs custom behavior.
```javascript
class Greeter {
  greet() { return "Hello"; }
}
class FormalGreeter extends Greeter {
  greet() { return "Good day"; }
}
class CasualGreeter extends Greeter {
  greet() { return "Hey"; }
}
```

### Error 43: Composition without interface abstraction
**Description:** Direct coupling to concrete component class.
```javascript
class MySQLDatabase {
  query(sql) { return "mysql result"; }
}
class UserRepository {
  constructor() {
    this.db = new MySQLDatabase();
  }
  find(id) { return this.db.query("SELECT * FROM users WHERE id = " + id); }
}
```

### Error 44: Inheritance for validation rules
**Description:** Each validation rule as a subclass.
```javascript
class Rule {
  validate(value) { return true; }
}
class RequiredRule extends Rule {
  validate(value) { return value != null; }
}
class MinLengthRule extends RequiredRule {
  validate(value) { return super.validate(value) && value.length >= 3; }
}
class EmailRule extends MinLengthRule {
  validate(value) { return super.validate(value) && value.includes("@"); }
}
```

### Error 45: Composition with no lifecycle management
**Description:** Components created but never cleaned up.
```javascript
class EventBus {
  constructor() { this.listeners = []; }
  on(fn) { this.listeners.push(fn); }
}
class Service {
  constructor() {
    this.bus = new EventBus();
    this.bus.on(() => this.handle());
  }
  handle() {}
}
```

### Error 46: Inheritance overused for form field types
**Description:** Each form field type as a separate class in hierarchy.
```javascript
class FormField { }
class TextField extends FormField { }
class NumberField extends TextField { }
class EmailField extends NumberField { }
class PasswordField extends EmailField { }
```

### Error 47: Composition with static coupling
**Description:** Components instantiated statically, not injectable.
```javascript
class Logger {
  static log(msg) { console.log(msg); }
}
class Service {
  process() {
    Logger.log("processing");
  }
}
```

### Error 48: Forcing composition where inheritance is natural
**Description:** Using composition for clear is-a relationship.
```javascript
class Animal {
  breathe() { return "air"; }
}
class Dog {
  constructor() { this.animal = new Animal(); }
  breathe() { return this.animal.breathe(); }
  bark() { return "woof"; }
}
```

### Error 49: Inheritance causes namespace pollution
**Description:** Child class has methods inherited that make no sense.
```javascript
class FileHandler {
  read() {}
  write() {}
  delete() {}
  list() {}
}
class ReadOnlyFile extends FileHandler {
  write() { throw new Error("read only"); }
  delete() { throw new Error("read only"); }
}
```

### Error 50: Composition without delegation pattern
**Description:** Forgetting to delegate a required method.
```javascript
class Engine {
  start() { return "started"; }
}
class Car {
  constructor(engine) {
    this.engine = engine;
  }
  drive() { return this.engine.start() + " then driving"; }
}
const c = new Car(new Engine());
console.log(c.start());
```

### Error 51: Inheritance used for caching layers
**Description:** Extending a class to add caching.
```javascript
class DataFetcher {
  fetch(url) { return fetch(url); }
}
class CachedFetcher extends DataFetcher {
  fetch(url) {
    if (this.cache[url]) return this.cache[url];
    this.cache[url] = super.fetch(url);
    return this.cache[url];
  }
}
```

### Error 52: Composition with tight lifecycle coupling
**Description:** Parent component lifecycle tied to child.
```javascript
class Server {
  constructor() {
    this.connection = new Connection();
  }
}
class Connection {
  constructor() {
    this.connect();
  }
  connect() {}
}
```

### Error 53: Inheritance for template method pattern misuse
**Description:** Using inheritance when a callback would work.
```javascript
class Report {
  generate() {
    const data = this.fetchData();
    const formatted = this.format(data);
    return this.output(formatted);
  }
  fetchData() { return []; }
  format(data) { return data; }
  output(data) { return data; }
}
```

### Error 54: Composition without testability
**Description:** Hard to mock components when testing.
```javascript
class AuthenticationService {
  constructor() {
    this.provider = new GoogleAuthProvider();
  }
  login(token) { return this.provider.verify(token); }
}
```

### Error 55: Inheritance for configuration profiles
**Description:** User profile types as class hierarchy.
```javascript
class Profile {
  getPermissions() { return []; }
}
class UserProfile extends Profile {
  getPermissions() { return ["read"]; }
}
class ModeratorProfile extends UserProfile {
  getPermissions() { return super.getPermissions().concat(["delete"]); }
}
class AdminProfile extends ModeratorProfile {
  getPermissions() { return super.getPermissions().concat(["manage"]); }
}
```

### Error 56: Composition with too many constructor arguments
**Description:** Component takes 8 dependencies in constructor.
```javascript
class CheckoutService {
  constructor(cart, user, payment, shipping, tax, inventory, email, logger) {
    this.cart = cart;
    this.user = user;
    this.payment = payment;
    this.shipping = shipping;
    this.tax = tax;
    this.inventory = inventory;
    this.email = email;
    this.logger = logger;
  }
}
```

### Error 57: Inheritance where parent is used as namespace
**Description:** Parent class only exists to group related subclasses.
```javascript
class PaymentMethods {}
class CreditCard extends PaymentMethods {}
class DebitCard extends PaymentMethods {}
class PayPal extends PaymentMethods {}
```

### Error 58: Composition with shared configuration
**Description:** Multiple components read from same config object.
```javascript
const config = { apiKey: "abc", endpoint: "https://api.example.com" };
class APIClient {
  constructor() { this.config = config; }
}
class AnalyticsClient {
  constructor() { this.config = config; }
}
```

### Error 59: Inheritance used when decorator pattern is better
**Description:** Adding features through inheritance instead of decoration.
```javascript
class Coffee {
  cost() { return 5; }
}
class MilkCoffee extends Coffee {
  cost() { return super.cost() + 2; }
}
class SugarMilkCoffee extends MilkCoffee {
  cost() { return super.cost() + 1; }
}
class WhippedCreamSugarMilkCoffee extends SugarMilkCoffee {
  cost() { return super.cost() + 3; }
}
```

### Error 60: Composition with interface mismatch
**Description:** Component expects camelCase but gets snake_case.
```javascript
class UserService {
  constructor(db) {
    this.db = db;
  }
  getUser(id) {
    return this.db.find_user({ id: id });
  }
}
class Database {
  findUser(query) { return {}; }
}
```

### Error 61: Inheritance causes feature envy
**Description:** Subclass methods mostly use parent data.
```javascript
class Order {
  constructor() { this.items = []; this.total = 0; }
}
class DiscountedOrder extends Order {
  applyDiscount(percent) {
    return this.total * (percent / 100);
  }
}
```

### Error 62: Composition with circular event chains
**Description:** Component A updates B, B updates A, causing loop.
```javascript
class Model {
  constructor() { this.view = null; }
  setData(data) {
    this.data = data;
    if (this.view) this.view.update(data);
  }
}
class View {
  constructor() { this.model = null; }
  update(data) {
    this.render(data);
    if (this.model) this.model.setData(data);
  }
}
```

### Error 63: Inheritance for utility aggregation
**Description:** Aggregating unrelated utilities via inheritance.
```javascript
class StringUtils {
  static capitalize(s) { return s[0].toUpperCase() + s.slice(1); }
}
class DateUtils extends StringUtils {
  static formatDate(d) { return d.toISOString(); }
}
class FileUtils extends DateUtils {
  static readFile(p) { return "content"; }
}
```

### Error 64: Composition with implicit contract
**Description:** No validation that component implements required method.
```javascript
class Renderer {
  constructor(engine) {
    this.engine = engine;
  }
  render(template) {
    return this.engine.compile(template);
  }
}
```

### Error 65: Inheritance used for A/B testing variants
**Description:** Different algorithm versions as subclasses.
```javascript
class Algorithm {
  run() { return "base"; }
}
class AlgorithmV1 extends Algorithm {
  run() { return "v1"; }
}
class AlgorithmV2 extends Algorithm {
  run() { return "v2"; }
}
```

### Error 66: Composition without error propagation
**Description:** Component errors swallowed silently.
```javascript
class Validator {
  validate(data) {
    if (!data.name) throw new Error("name required");
  }
}
class FormHandler {
  constructor() {
    this.validator = new Validator();
  }
  submit(data) {
    this.validator.validate(data);
  }
}
```

### Error 67: Inheritance for state machine states
**Description:** Each state as a class in inheritance chain.
```javascript
class OrderState {
  next() { return this; }
}
class PendingState extends OrderState {
  next() { return new ShippedState(); }
}
class ShippedState extends PendingState {
  next() { return new DeliveredState(); }
}
class DeliveredState extends ShippedState {
  next() { return this; }
}
```

### Error 68: Composition with missing null object pattern
**Description:** No null checks before using components.
```javascript
class Report {
  constructor(header, body, footer) {
    this.header = header;
    this.body = body;
    this.footer = footer;
  }
  generate() {
    return this.header.render() + this.body.render() + this.footer.render();
  }
}
```

### Error 69: Inheritance causing ambiguous method resolution
**Description:** Multiple inheritance simulation through prototypes.
```javascript
class A { method() { return "A"; } }
class B { method() { return "B"; } }
class C extends A {}
Object.assign(C.prototype, B.prototype);
const c = new C();
console.log(c.method());
```

### Error 70: Composition with resource leak
**Description:** Component opens resources but never closes.
```javascript
class FileReader {
  read(path) {
    const fd = fs.openSync(path);
    const data = fs.readFileSync(fd);
    return data;
  }
}
class TextProcessor {
  constructor() {
    this.reader = new FileReader();
  }
  process(path) {
    return this.reader.read(path).toString();
  }
}
```

## Issue Snippets

### Issue 1: Shallow inheritance hierarchy that could be composition
**Description:** Two-level hierarchy where child only adds one method.
```javascript
class Shape {
  area() { return 0; }
}
class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
  area() { return Math.PI * this.r * this.r; }
}
```

### Issue 2: Composition with too much indirection
**Description:** Wrapping a simple object in multiple unnecessary layers.
```javascript
class Data { get() { return "data"; } }
class DataWrapper { constructor(d) { this.data = d; } get() { return this.data.get(); } }
class DataWrapper2 { constructor(d) { this.data = d; } get() { return this.data.get(); } }
```

### Issue 3: Class hierarchy based on optional features
**Description:** Each optional feature adds a subclass.
```javascript
class Car {}
class CarWithAC extends Car {}
class CarWithACAndSunroof extends CarWithAC {}
class CarWithACAndSunroofAndLeather extends CarWithACAndSunroof {}
```

### Issue 4: Inheritance used over interface-like abstraction
**Description:** Forcing shared code through inheritance when interface would suffice.
```javascript
class Database {
  connect() {}
}
class MySQLDatabase extends Database {}
class PostgreSQLDatabase extends Database {}
```

### Issue 5: Composition with no error handling
**Description:** Component method failures not handled.
```javascript
class Payment {
  constructor(processor) {
    this.processor = processor;
  }
  pay(amount) {
    return this.processor.charge(amount);
  }
}
```

### Issue 6: Using inheritance for what should be a parameter
**Description:** Behavioral difference implemented as subclass instead of parameter.
```javascript
class Greeter {
  greet(name) { return "Hello " + name; }
}
class FormalGreeter extends Greeter {
  greet(name) { return "Good day " + name; }
}
```

### Issue 7: Composition without clear interfaces
**Description:** No interface definition for composed components.
```javascript
class NotificationService {
  send(user, message) {}
}
class OrderService {
  constructor() { this.notifier = new NotificationService(); }
}
```

### Issue 8: Inheritance hierarchy mimics HTML elements
**Description:** Complex HTML element class hierarchy.
```javascript
class Element {}
class ContainerElement extends Element {}
class FormElement extends ContainerElement {}
class InputElement extends FormElement {}
class TextInputElement extends InputElement {}
```

### Issue 9: Composition with tightly coupled factories
**Description:** Factory method creates and couples components.
```javascript
class ServiceFactory {
  create() {
    const db = new Database();
    const cache = new Cache(db);
    const logger = new Logger(cache);
    return new Service(db, cache, logger);
  }
}
```

### Issue 10: Inheritance tree with leaf classes only
**Description:** All subclasses are leaves with no further extension.
```javascript
class Animal {}
class Mammal extends Animal {}
class Bird extends Animal {}
class Fish extends Animal {}
class Reptile extends Animal {}
```

### Issue 11: Composition overused for simple data transformation
**Description:** Each transformation step as a separate component.
```javascript
class TrimStep { execute(s) { return s.trim(); } }
class UpperStep { execute(s) { return s.toUpperCase(); } }
class PadStep { execute(s) { return s.padEnd(10); } }
class Pipeline {
  constructor() { this.steps = [new TrimStep(), new UpperStep(), new PadStep()]; }
}
```

### Issue 12: Using inheritance to share configuration
**Description:** Sharing config defaults via inheritance.
```javascript
class BaseConfig {
  constructor() {
    this.timeout = 5000;
    this.retries = 3;
  }
}
class APIConfig extends BaseConfig {
  constructor() {
    super();
    this.endpoint = "https://api.example.com";
  }
}
```

### Issue 13: Composition with manual method forwarding
**Description:** Manually forwarding each method to component.
```javascript
class Engine {
  start() {}
  stop() {}
  accelerate() {}
  brake() {}
}
class Car {
  constructor() { this.engine = new Engine(); }
  start() { this.engine.start(); }
  stop() { this.engine.stop(); }
}
```

### Issue 14: Inheritance used when data differs, not behavior
**Description:** Subclasses that only differ in data values.
```javascript
class Config {
  getHost() { return "localhost"; }
}
class DevConfig extends Config {
  getHost() { return "dev.example.com"; }
}
class ProdConfig extends Config {
  getHost() { return "example.com"; }
}
```

### Issue 15: Composition component doing too much
**Description:** A single component handles validation, formatting, and persistence.
```javascript
class AllInOne {
  validate() {}
  format() {}
  save() {}
  sendEmail() {}
  generateReport() {}
}
```

### Issue 16: Inheritance misused for permission levels
**Description:** User permission levels as class hierarchy.
```javascript
class User {
  getPermissions() { return ["read"]; }
}
class Editor extends User {
  getPermissions() { return super.getPermissions().concat(["write"]); }
}
class Admin extends Editor {
  getPermissions() { return super.getPermissions().concat(["delete"]); }
}
```

### Issue 17: Composition with ambiguous responsibility
**Description:** Unclear which component owns what logic.
```javascript
class CartManager {
  addItem() {}
  removeItem() {}
  calculateTotal() {}
}
class OrderManager {
  createOrder() {}
  calculateTotal() {}  // Duplicate
}
```

### Issue 18: Inheritance hierarchy with parallel branches
**Description:** Two branches of hierarchy with duplicated methods.
```javascript
class Animal { eat() {} }
class Mammal extends Animal { breathe() {} }
class Bird extends Animal { breathe() {} }
```

### Issue 19: Composition without lifecycle hooks
**Description:** No way to initialize or clean up components.
```javascript
class Service {
  constructor() { this.component = new Component(); }
}
class Component {
  constructor() { this.initialize(); }
  initialize() {}
}
```

### Issue 20: Inheritance for what should be traits/mixins
**Description:** Using single inheritance line for multiple orthogonal features.
```javascript
class BlogPost {
  save() {}
}
class LoggableBlogPost extends BlogPost {
  save() { this.log(); super.save(); }
}
class CachedBlogPost extends LoggableBlogPost {
  save() { this.cache(); super.save(); }
}
```

### Issue 21: Composition with no abstraction boundary
**Description:** Components access each other's internal state directly.
```javascript
class ShoppingCart {
  constructor() { this.items = []; }
}
class Checkout {
  constructor(cart) { this.cart = cart; }
  process() { return this.cart.items; }
}
```

### Issue 22: Inheritance used for event types
**Description:** Each event type as a separate class.
```javascript
class Event {}
class ClickEvent extends Event {}
class HoverEvent extends Event {}
class DragEvent extends Event {}
class DropEvent extends DragEvent {}
```

### Issue 23: Composition without dependency inversion
**Description:** High-level component depends on low-level component directly.
```javascript
class UserController {
  constructor() {
    this.db = new MySQLDatabase();
  }
  getUsers() { return this.db.query("SELECT * FROM users"); }
}
```

### Issue 24: Inheritance tree with only one subclass each
**Description:** Each class has exactly one child.
```javascript
class A {}
class B extends A {}
class C extends B {}
class D extends C {}
```

### Issue 25: Composition with duplicated configuration
**Description:** Each component has own copy of same config.
```javascript
class ServiceA {
  constructor() { this.apiKey = "abc123"; }
}
class ServiceB {
  constructor() { this.apiKey = "abc123"; }
}
```

### Issue 26: Using extends to access private data
**Description:** Subclass accessing parent's supposedly private members.
```javascript
class Account {
  constructor() { this._balance = 0; }
}
class SavingsAccount extends Account {
  getBalance() { return this._balance; }
}
```

### Issue 27: Composition with inconsistent granularity
**Description:** Some components are tiny, others are huge.
```javascript
class NameValidator { validate(n) { return n.length > 0; } }
class EverythingProcessor {
  validate() {}
  transform() {}
  save() {}
  notify() {}
  log() {}
}
```

### Issue 28: Inheritance for notification channels
**Description:** Each notification channel as subclass.
```javascript
class Notifier { send(msg) {} }
class EmailNotifier extends Notifier { send(msg) {} }
class SMSNotifier extends Notifier { send(msg) {} }
class PushNotifier extends Notifier { send(msg) {} }
```

### Issue 29: Composition with procedural-style code
**Description:** Using composition but writing procedural code.
```javascript
class ReportGenerator {
  constructor() {
    this.fetcher = new DataFetcher();
    this.parser = new DataParser();
    this.formatter = new Formatter();
  }
  generate() {
    const raw = this.fetcher.fetch();
    const parsed = this.parser.parse(raw);
    return this.formatter.format(parsed);
  }
}
```

### Issue 30: Inheritance hierarchy with mixed abstractions
**Description:** Mixing different abstraction levels in same hierarchy.
```javascript
class Database {}
class SQLDatabase extends Database {}
class MySQLDatabase extends SQLDatabase {}
class ConnectionPool extends MySQLDatabase {}
```

## Modify Snippets

### Modify 1: Refactor inheritance to composition
**Description:** Convert Car extends Engine to use composition.
```javascript
class Engine {
  start() { return "engine start"; }
  stop() { return "engine stop"; }
}
class Car extends Engine {
  drive() { return this.start() + " then drive"; }
}
// Refactor to composition
```

### Modify 2: Replace instanceof checks with polymorphism
**Description:** Replace type checking with polymorphic method calls.
```javascript
class Animal {}
class Dog extends Animal { sound() { return "woof"; } }
class Cat extends Animal { sound() { return "meow"; } }
function makeSound(animal) {
  if (animal instanceof Dog) return "Dog says " + animal.sound();
  if (animal instanceof Cat) return "Cat says " + animal.sound();
}
// Refactor to use polymorphism
```

### Modify 3: Implement strategy pattern
**Description:** Replace inheritance-based sorting with strategy pattern.
```javascript
class Sorter {
  sort(arr) { return arr; }
}
class AscendingSorter extends Sorter {
  sort(arr) { return arr.sort((a, b) => a - b); }
}
class DescendingSorter extends Sorter {
  sort(arr) { return arr.sort((a, b) => b - a); }
}
// Refactor to strategy pattern
```

### Modify 4: Extract interface from inheritance
**Description:** Create interface from base class and compose.
```javascript
class Database {
  connect() {}
  query(sql) {}
}
class MySQLDatabase extends Database {}
class PostgreSQLDatabase extends Database {}
// Create interface and use composition
```

### Modify 5: Replace god class with composition
**Description:** Break a large class into composed components.
```javascript
class UserService {
  validate(user) { /* ... */ }
  save(user) { /* ... */ }
  sendEmail(user) { /* ... */ }
  generateReport(user) { /* ... */ }
  logActivity(user) { /* ... */ }
}
// Refactor to composition
```

### Modify 6: Convert decorator inheritance to composition
**Description:** Replace coffee decorator hierarchy with composition.
```javascript
class Coffee { cost() { return 5; } }
class MilkCoffee extends Coffee { cost() { return super.cost() + 2; } }
class SugarCoffee extends MilkCoffee { cost() { return super.cost() + 1; } }
// Refactor to compositional decorator
```

### Modify 7: Implement dependency injection
**Description:** Refactor hard-coded dependencies to injected ones.
```javascript
class OrderService {
  constructor() {
    this.db = new Database();
    this.email = new EmailService();
  }
}
// Refactor to dependency injection
```

### Modify 8: Replace deep hierarchy with flat composition
**Description:** Flatten a 5-level deep class tree into composed objects.
```javascript
class A { doA() {} }
class B extends A { doB() {} }
class C extends B { doC() {} }
class D extends C { doD() {} }
// Flatten into composition
```

### Modify 9: Extract utility inheritance to modules
**Description:** Move utility methods from base class to separate modules.
```javascript
class BaseService {
  log(msg) { console.log(msg); }
  format(data) { return JSON.stringify(data); }
  validate(data) { return data != null; }
}
class UserService extends BaseService {}
// Extract utilities to modules
```

### Modify 10: Implement adapter pattern
**Description:** Create adapter to make incompatible interfaces work.
```javascript
class PayPalAPI {
  sendPayment(amount) { return "paypal:" + amount; }
}
class Checkout {
  process(gateway) { return gateway.charge(100); }
}
// Create adapter to make PayPalAPI work with Checkout
```

### Modify 11: Replace inheritance with factory pattern
**Description:** Convert class-per-type hierarchy to factory with config.
```javascript
class Logger {
  constructor(type) {
    if (type === "console") return new ConsoleLogger();
    if (type === "file") return new FileLogger();
  }
}
class ConsoleLogger extends Logger {}
class FileLogger extends Logger {}
// Refactor to factory pattern
```

### Modify 12: Implement facade pattern
**Description:** Create a facade that simplifies complex composition.
```javascript
// Create Facade for: Database, Cache, Logger, EmailService, Queue
// Compose them into a simple OrderProcessor facade
```

### Modify 13: Replace inheritance with mixins
**Description:** Convert class inheritance to mixin-based composition.
```javascript
class Animal { breathe() {} }
class FlyingAnimal extends Animal { fly() {} }
class SwimmingAnimal extends Animal { swim() {} }
// Convert to mixins: canFly, canSwim
```

### Modify 14: Implement observer pattern
**Description:** Replace tight coupling with observer pattern.
```javascript
class Model {
  constructor(view) { this.view = view; }
  setData(data) { this.data = data; this.view.update(data); }
}
class View { update(data) { this.render(data); } }
// Refactor to observer pattern
```

### Modify 15: Replace switch with strategy composition
**Description:** Convert switch statement to composed strategy objects.
```javascript
function compress(type, data) {
  switch(type) {
    case "zip": return zipCompress(data);
    case "gzip": return gzipCompress(data);
    case "rar": return rarCompress(data);
  }
}
// Refactor to strategy composition
```

### Modify 16: Implement builder pattern
**Description:** Replace constructor with many parameters with builder.
```javascript
class Pizza {
  constructor(size, cheese, pepperoni, mushrooms, olives, onions) {
    // 6 parameters
  }
}
// Refactor to builder pattern
```

### Modify 17: Create a plugin architecture
**Description:** Design a plugin system using composition.
```javascript
// Create a TextProcessor that accepts plugins
// Plugins: UppercasePlugin, ReversePlugin, RemoveSpacesPlugin
```

### Modify 18: Implement chain of responsibility
**Description:** Replace if-else chain with composed handlers.
```javascript
function handle(request) {
  if (request.auth) { /* auth */ }
  else if (request.validate) { /* validate */ }
  else if (request.process) { /* process */ }
}
// Refactor to chain of responsibility
```

### Modify 19: Replace inheritance with composition for UI
**Description:** Convert UI component hierarchy to compositional approach.
```javascript
class Button {
  render() { return "<button></button>"; }
}
class IconButton extends Button {
  render() { return "<button><i class='icon'></i></button>"; }
}
// Refactor to composition
```

### Modify 20: Implement state pattern
**Description:** Replace state-based conditionals with state objects.
```javascript
class Order {
  process() {
    if (this.status === "pending") { /* ... */ }
    else if (this.status === "shipped") { /* ... */ }
  }
}
// Refactor to state pattern
```

### Modify 21: Create a composite pattern
**Description:** Build a tree structure using composition.
```javascript
// Create File and Folder where Folder can contain Files
// Both implement a common interface
```

### Modify 22: Implement proxy pattern
**Description:** Create a proxy that controls access to a composed object.
```javascript
class APIClient {
  request(url) { return fetch(url); }
}
// Create a Proxy that adds caching, logging, rate limiting
```

### Modify 23: Replace inheritance with composition for validation
**Description:** Convert validation class hierarchy to composed validators.
```javascript
class Validator { validate(v) { return true; } }
class RequiredValidator extends Validator {}
class EmailValidator extends RequiredValidator {}
class MinLengthValidator extends EmailValidator {}
// Refactor to composition
```

### Modify 24: Implement mediator pattern
**Description:** Reduce coupling between components using a mediator.
```javascript
class ComponentA { constructor(b) { this.b = b; } }
class ComponentB { constructor(a) { this.a = a; } }
// Refactor with mediator
```

### Modify 25: Replace inheritance with composition for caching
**Description:** Extract caching concern from business logic.
```javascript
class CachedUserService {
  constructor() { this.cache = {}; }
  getUser(id) {
    if (this.cache[id]) return this.cache[id];
    return this.cache[id] = this.fetchUser(id);
  }
  fetchUser(id) { return { id }; }
}
// Extract cache into separate component
```

### Modify 26: Implement null object pattern
**Description:** Create null object to avoid null checks.
```javascript
class Logger {
  log(msg) { console.log(msg); }
}
class Service {
  constructor(logger) { this.logger = logger; }
  run() { if (this.logger) this.logger.log("running"); }
}
// Create NullLogger
```

### Modify 27: Replace single inheritance with multiple mixins
**Description:** Convert deep single chain to multiple composed mixins.
```javascript
class Animal { eat() {} }
class Mammal extends Animal { nurse() {} }
class Bat extends Mammal { fly() {} }
// Convert to: Bat composes canEat, canNurse, canFly mixins
```

### Modify 28: Implement decorator pattern
**Description:** Create a decorator that wraps and extends behavior.
```javascript
class TextService {
  render(text) { return text; }
}
// Create BoldDecorator, ItalicDecorator, UnderlineDecorator
```

### Modify 29: Replace Large inheritance with smaller composed classes
**Description:** Break a large class into single-responsibility composed pieces.
```javascript
class ShoppingCart {
  addItem() {}
  removeItem() {}
  calculateTax() {}
  calculateShipping() {}
  applyDiscount() {}
  checkout() {}
  generateInvoice() {}
  sendConfirmation() {}
}
// Break into smaller composed classes
```

### Modify 30: Implement template method via composition
**Description:** Replace template method inheritance with strategy.
```javascript
class ReportGenerator {
  generate() {
    const data = this.fetchData();
    const formatted = this.formatData(data);
    return this.output(formatted);
  }
  fetchData() { return []; }
  formatData(d) { return d; }
  output(d) { return d; }
}
// Refactor to composition with strategies
```

### Modify 31: Refactor to command pattern
**Description:** Convert method calls to command objects.
```javascript
class Editor {
  bold() { /* ... */ }
  italic() { /* ... */ }
  underline() { /* ... */ }
}
// Implement undoable commands via composition
```

### Modify 32: Replace inheritance chain with pipeline composition
**Description:** Convert deep method call chain into pipeline.
```javascript
class Pipeline {
  process(data) {
    return data;
  }
}
// Compose: trim -> validate -> transform -> output pipeline
```

### Modify 33: Implement composition root pattern
**Description:** Create a single composition root that wires dependencies.
```javascript
// Create AppCompositionRoot that wires all dependencies
// Database, Repositories, Services, Controllers
```

### Modify 34: Replace inheritance with event-driven composition
**Description:** Convert tightly coupled classes to event-driven.
```javascript
class OrderService {
  place(order) {
    this.inventory.update(order);
    this.email.send(order);
    this.logger.log(order);
  }
}
// Refactor to emit events instead
```

### Modify 35: Implement specification pattern
**Description:** Create composable business rules.
```javascript
// Create AndSpec, OrSpec, NotSpec
// Compose rules: isPremium AND (isActive OR isNew)
```

### Modify 36: Replace inheritance with object schemas
**Description:** Convert class-per-type to schema-based objects.
```javascript
class User { constructor(d) { this.name = d.name; } }
class Admin extends User { constructor(d) { super(d); this.role = "admin"; } }
// Replace with schema composition
```

### Modify 37: Implement fluent interface via composition
**Description:** Create a fluent builder using composition.
```javascript
// Create QueryBuilder with composed where, orderBy, limit, offset methods
// Each returns this for chaining
```

### Modify 38: Replace inheritance with aspect-oriented composition
**Description:** Extract cross-cutting concerns into aspects.
```javascript
class Service {
  save() {
    // logging, validation, transaction should be separate
  }
}
// Extract aspects using composition
```

### Modify 39: Implement visitor pattern
**Description:** Create a visitor that works with composed object structure.
```javascript
// Create FileSystem with File and Directory
// Create SizeVisitor, CountVisitor, SearchVisitor
```

### Modify 40: Replace inheritance tree with strategy map
**Description:** Convert class hierarchy to map of strategies.
```javascript
class PaymentMethod { pay(a) {} }
class CreditCard extends PaymentMethod {}
class PayPal extends PaymentMethod {}
class Crypto extends PaymentMethod {}
// Replace with strategy map
```

### Modify 41: Implement service locator pattern
**Description:** Create a service locator for managing composed services.
```javascript
// Create ServiceLocator
// Register: Database, Cache, Logger, EmailService
// Resolve services when needed
```

### Modify 42: Replace inheritance with configuration objects
**Description:** Convert class-per-variant to configurable objects.
```javascript
class Logger { constructor(level) { this.level = level; } }
class DebugLogger extends Logger { constructor() { super("debug"); } }
class InfoLogger extends Logger { constructor() { super("info"); } }
// Replace with configuration
```

### Modify 43: Implement prototype pattern
**Description:** Use prototype-based cloning instead of class hierarchy.
```javascript
// Create a base object with methods
// Clone and extend instead of using class inheritance
```

### Modify 44: Replace inheritance with functional composition
**Description:** Use higher-order functions instead of class inheritance.
```javascript
class Processor {
  process(data) { return data; }
}
class FilteredProcessor extends Processor {
  process(data) { return data.filter(Boolean); }
}
// Replace with function composition
```

### Modify 45: Implement module pattern
**Description:** Use module pattern for encapsulation instead of classes.
```javascript
// Create a module with private state and public methods
// Compose modules together
```

### Modify 46: Replace deep inheritance with middleware composition
**Description:** Convert request processing hierarchy to middleware stack.
```javascript
class Handler {
  handle(req) { return req; }
}
class AuthHandler extends Handler {}
class ValidHandler extends AuthHandler {}
class ProcessHandler extends ValidHandler {}
// Convert to middleware composition
```

### Modify 47: Implement flyweight pattern
**Description:** Share common state across composed objects.
```javascript
// Create a flyweight for character formatting
// Share font, size, color objects across many characters
```

### Modify 48: Replace inheritance with pipes and filters
**Description:** Convert data processing chain to pipes and filters.
```javascript
class Processor {
  process(data) {
    data = this.step1(data);
    data = this.step2(data);
    data = this.step3(data);
    return data;
  }
}
// Convert to pipe/filter architecture
```

### Modify 49: Implement blackboard pattern
**Description:** Create shared blackboard for composed components.
```javascript
// Create a Blackboard shared data store
// Multiple components read/write to the blackboard
// Components: Parser, Analyzer, Renderer
```

### Modify 50: Complete architecture refactoring
**Description:** Refactor a monolithic inherited system to composed architecture.
```javascript
// Given a monolith with deep inheritance (6 levels)
// Refactor to use: Strategy, Observer, Decorator, Factory patterns
// Use composition throughout
