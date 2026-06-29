# Level 83: Module 17 – Mocks, Spies & Test Doubles

## Error Snippets (70)

### Error 1: Spy setup after the call
**Description:** Spy must be created before the function is called
```javascript
it('spies on method', () => {
  const obj = { save() {} };
  obj.save();
  spyOn(obj, 'save');
  expect(obj.save).toHaveBeenCalled();
});
```
### Error 2: Spy not restored after test
**Description:** Spy persists and affects other tests
```javascript
describe('suite', () => {
  it('spies on math', () => {
    spyOn(Math, 'random').and.returnValue(0.5);
    expect(Math.random()).toBe(0.5);
  });
  it('needs real random', () => {
    expect(Math.random()).not.toBe(0.5);
  });
});
```
### Error 3: createSpyObj without method list
**Description:** createSpyObj requires method names array
```javascript
it('mock object', () => {
  const mock = jasmine.createSpyObj('service');
  mock.get();
  expect(mock.get).toHaveBeenCalled();
});
```
### Error 4: Spy on non-existent method
**Description:** spyOn requires an existing method on the object
```javascript
it('spy missing method', () => {
  const obj = {};
  spyOn(obj, 'fetch');
});
```
### Error 5: and.callThrough not used for real behavior
**Description:** Spy replaces the method; need callThrough to keep real behavior
```javascript
const calc = { add: (a, b) => a + b };
it('adds through spy', () => {
  spyOn(calc, 'add');
  const result = calc.add(2, 3);
  expect(result).toBe(5);
});
```
### Error 6: and.returnValue with promise
**Description:** Should use and.resolveTo for async return
```javascript
it('spy returns promise', () => {
  const svc = { fetch: async () => {} };
  spyOn(svc, 'fetch').and.returnValue({ data: 'test' });
  svc.fetch().then(v => expect(v.data).toBe('test'));
});
```
### Error 7: Multiple spies on same method
**Description:** Creating two spies on the same method causes issues
```javascript
it('double spy', () => {
  const obj = { fn() {} };
  spyOn(obj, 'fn').and.returnValue(1);
  spyOn(obj, 'fn').and.returnValue(2);
  expect(obj.fn()).toBe(2);
});
```
### Error 8: and.callFake wrong signature
**Description:** Fake function must have the same signature
```javascript
it('fake function', () => {
  const obj = { greet(name) { return 'Hello ' + name; } };
  spyOn(obj, 'greet').and.callFake(() => 'Hi');
  expect(obj.greet('Alice')).toBe('Hi Alice');
});
```
### Error 9: toHaveBeenCalledWith wrong argument count
**Description:** Checking with different number of arguments
```javascript
it('wrong args', () => {
  const spy = jasmine.createSpy();
  spy(1, 2, 3);
  expect(spy).toHaveBeenCalledWith(1, 2);
});
```
### Error 10: createSpy without name
**Description:** Anonymous spy makes debugging harder
```javascript
it('unnamed spy', () => {
  const spy = jasmine.createSpy();
  spy();
  expect(spy).toHaveBeenCalled();
});
```
### Error 11: and.returnValues used with single call
**Description:** returnValues provides multiple return values but only one call
```javascript
it('multiple returns', () => {
  const spy = jasmine.createSpy().and.returnValues(1, 2, 3);
  spy();
  expect(spy()).toBe(2);
});
```
### Error 12: Spy on window/DOM without cleanup
**Description:** Global spies must be restored
```javascript
it('spies on alert', () => {
  spyOn(window, 'alert');
  window.alert('test');
  expect(window.alert).toHaveBeenCalledWith('test');
});
```
### Error 13: Not resetting spy calls between tests
**Description:** Spy call count accumulates across tests
```javascript
describe('spy counter', () => {
  const spy = jasmine.createSpy();
  it('first call', () => {
    spy();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('second call', () => {
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
```
### Error 14: calling through spy that returns nothing
**Description:** Original method returns void but test expects a value
```javascript
const logger = { log: (msg) => undefined };
it('logs message', () => {
  spyOn(logger, 'log').and.callThrough();
  const result = logger.log('test');
  expect(result).toBe('test');
});
```
### Error 15: jasmine.any with wrong type
**Description:** Using jasmine.any with a non-constructor
```javascript
it('any type', () => {
  const spy = jasmine.createSpy();
  spy('hello');
  expect(spy).toHaveBeenCalledWith(jasmine.any('string'));
});
```
### Error 16: jasmine.objectContaining with missing key
**Description:** The object doesn't contain the expected key
```javascript
it('object contains', () => {
  const spy = jasmine.createSpy();
  spy({ name: 'Alice' });
  expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({ age: 25 }));
});
```
### Error 17: Spy on primitive value
**Description:** Cannot spy on primitive values
```javascript
it('spy on number', () => {
  const num = 42;
  spyOn(num, 'toString');
});
```
### Error 18: and.stub incorrectly used
**Description:** Stub is the default, and.stub is redundant
```javascript
it('stub method', () => {
  const obj = { get: () => 5 };
  spyOn(obj, 'get').and.stub();
  expect(obj.get()).toBe(5);
});
```
### Error 19: createSpyObj with methods as array
**Description:** Methods should be an array of strings
```javascript
it('spy obj', () => {
  const mock = jasmine.createSpyObj(['get', 'post']);
  expect(mock.get).toBeDefined();
});
```
### Error 20: Spying on getter property
**Description:** spyOn cannot directly spy on getter-defined properties
```javascript
const obj = { get value() { return 42; } };
it('spies getter', () => {
  spyOn(obj, 'value');
  expect(obj.value).toBe(42);
});
```
### Error 21: toHaveBeenCalledWith trying to match undefined
**Description:** Checking with undefined when argument is defined
```javascript
it('match undefined', () => {
  const spy = jasmine.createSpy();
  spy(null);
  expect(spy).toHaveBeenCalledWith(undefined);
});
```
### Error 22: Not spying before method called
**Description:** The spy is installed after the method is already called
```javascript
it('late spy', () => {
  const obj = {
    init() { this.load(); },
    load() {}
  };
  spyOn(obj, 'load');
  obj.init();
  expect(obj.load).toHaveBeenCalled();
});
```
### Error 23: jasmine.any for undefined
**Description:** jasmine.any expects a constructor function
```javascript
it('any undefined', () => {
  const spy = jasmine.createSpy();
  spy(undefined);
  expect(spy).toHaveBeenCalledWith(jasmine.any(undefined));
});
```
### Error 24: Spy on constructor function
**Description:** spying on constructors needs special handling
```javascript
function Person(name) { this.name = name; }
it('spy constructor', () => {
  spyOn(window, 'Person');
  new Person('Alice');
  expect(Person).toHaveBeenCalled();
});
```
### Error 25: Not differentiating between spy calls
**Description:** Multiple spy calls not distinguished
```javascript
it('multiple calls', () => {
  const spy = jasmine.createSpy();
  spy(1);
  spy(2);
  expect(spy).toHaveBeenCalledWith(1);
  expect(spy).toHaveBeenCalledWith(2);
});
```
### Error 26: and.returnValue with undefined
**Description:** Returning undefined when a value is expected
```javascript
it('returns nothing', () => {
  const spy = jasmine.createSpy().and.returnValue(undefined);
  const result = spy();
  expect(result).toBeDefined();
});
```
### Error 27: Spy on native method without restoring
**Description:** Native method spy not restored after test
```javascript
it('spy on fetch', () => {
  spyOn(window, 'fetch').and.resolveTo({ json: () => ({}) });
  // no restore
});
```
### Error 28: jasmine.stringMatching with non-regex
**Description:** stringMatching expects a string or RegExp
```javascript
it('string matching', () => {
  const spy = jasmine.createSpy();
  spy('hello world');
  expect(spy).toHaveBeenCalledWith(jasmine.stringMatching(42));
});
```
### Error 29: Spying on function expression
**Description:** Cannot spy on inline function expressions
```javascript
it('spy inline', () => {
  const fn = () => {};
  spyOn(fn);
  fn();
  expect(fn).toHaveBeenCalled();
});
```
### Error 30: Mock method that doesn't exist
**Description:** createSpyObj creates spies for listed methods only
```javascript
it('mock missing', () => {
  const mock = jasmine.createSpyObj('api', ['get']);
  mock.post();
  expect(mock.post).toHaveBeenCalled();
});
```
### Error 31: and.callFake not returning value
**Description:** Fake function must return the expected value
```javascript
it('fake no return', () => {
  const obj = { double: (n) => n * 2 };
  spyOn(obj, 'double').and.callFake((n) => { n * 2; });
  expect(obj.double(5)).toBe(10);
});
```
### Error 32: Spying on non-configurable property
**Description:** Some properties cannot be spied on
```javascript
it('non-configurable', () => {
  spyOn(Math, 'PI');
});
```
### Error 33: toHaveBeenCalledTimes with wrong count
**Description:** The spy was called a different number of times
```javascript
it('wrong call count', () => {
  const spy = jasmine.createSpy();
  spy();
  spy();
  expect(spy).toHaveBeenCalledTimes(1);
});
```
### Error 34: createSpyObj with no methods
**Description:** An empty methods array creates an empty mock
```javascript
it('empty mock', () => {
  const mock = jasmine.createSpyObj('empty', []);
  mock.doSomething();
  expect(mock.doSomething).toHaveBeenCalled();
});
```
### Error 35: Spy properties ignored
**Description:** jasmine.createSpyObj only creates spy methods, not properties
```javascript
it('spy property', () => {
  const mock = jasmine.createSpyObj('obj', ['get']);
  mock.value = 5;
  expect(mock.value).toBe(5);
});
```
### Error 36: Not catching spy on undefined object
**Description:** Spying on a method of an undefined object
```javascript
let obj;
it('spy undefined', () => {
  spyOn(obj, 'method');
});
```
### Error 37: and.resolveTo without async context
**Description:** Using resolveTo in a synchronous test
```javascript
it('resolve sync', () => {
  const spy = jasmine.createSpy().and.resolveTo(5);
  const result = spy();
  expect(result).toBe(5);
});
```
### Error 38: and.rejectWith without try/catch
**Description:** Rejection not caught in the test
```javascript
it('reject spy', () => {
  const spy = jasmine.createSpy().and.rejectWith('error');
  spy().then(v => expect(v).toBeDefined());
});
```
### Error 39: Spying on prototype method
**Description:** Prototype methods need special handling
```javascript
class User {
  getName() { return 'Alice'; }
}
it('spy prototype', () => {
  const u = new User();
  spyOn(u, 'getName');
  expect(u.getName()).toBe('Alice');
});
```
### Error 40: Multiple expectations with same spy
**Description:** Using same spy to verify different calls incorrectly
```javascript
it('multiple expects', () => {
  const spy = jasmine.createSpy();
  spy(1, 2);
  spy(3, 4);
  expect(spy.calls.allArgs()).toEqual([[1, 2], [3, 4]]);
});
```
### Error 41: Calling spy after restore
**Description:** Using a spy reference after it's restored
```javascript
it('after restore', () => {
  const obj = { fn() {} };
  const spy = spyOn(obj, 'fn');
  obj.fn.and.callThrough();
  obj.fn();
  expect(spy).toHaveBeenCalled();
});
```
### Error 42: toHaveBeenCalledWith using wrong order
**Description:** Arguments checked in wrong order
```javascript
it('wrong order', () => {
  const spy = jasmine.createSpy();
  spy('a', 'b');
  expect(spy).toHaveBeenCalledWith('b', 'a');
});
```
### Error 43: Spying on module imports
**Description:** Direct spyOn on imported functions doesn't work
```javascript
import { helper } from './utils';
it('spy import', () => {
  spyOn(helper);
  helper();
  expect(helper).toHaveBeenCalled();
});
```
### Error 44: Not resetting spy between it blocks
**Description:** Spy.calls persists across tests
```javascript
describe('spy', () => {
  it('first', () => {
    const spy = jasmine.createSpy();
    spy();
    expect(spy.calls.count()).toBe(1);
  });
  it('second', () => {
    const spy = jasmine.createSpy();
    spy();
    spy();
    expect(spy.calls.count()).toBe(2);
  });
});
```
### Error 45: and.returnValue used with callThrough
**Description:** Mixing returnValue and callThrough doesn't work as expected
```javascript
it('mixed return', () => {
  const obj = { get: () => 'real' };
  spyOn(obj, 'get').and.callThrough().and.returnValue('fake');
  expect(obj.get()).toBe('real');
});
```
### Error 46: Spy callFake not calling original
**Description:** callFake completely replaces the original
```javascript
const calculator = {
  add(a, b) { return a + b; }
};
it('fake add', () => {
  spyOn(calculator, 'add').and.callFake((a, b) => a - b);
  expect(calculator.add(5, 3)).toBe(8);
});
```
### Error 47: jasmine.arrayContaining with wrong array
**Description:** The spy was called with an array that doesn't contain expected items
```javascript
it('array containing', () => {
  const spy = jasmine.createSpy();
  spy([1, 2, 3]);
  expect(spy).toHaveBeenCalledWith(jasmine.arrayContaining([4]));
});
```
### Error 48: Spying on method that's called internally
**Description:** Internal calls bypass the spy reference
```javascript
class Service {
  doWork() { return this.helper(); }
  helper() { return 'real'; }
}
it('internal call', () => {
  const svc = new Service();
  spyOn(svc, 'helper').and.returnValue('mock');
  expect(svc.doWork()).toBe('mock');
});
```
### Error 49: and.resolveTo used with sync function
**Description:** resolveTo is for async spies but called synchronously
```javascript
it('resolve sync', () => {
  const spy = jasmine.createSpy().and.resolveTo(5);
  const result = spy();
  expect(result).toBe(5);
});
```
### Error 50: Mock not catching all calls
**Description:** Spy tracks calls but original method still executes
```javascript
const obj = { save() { throw new Error('db error'); } };
it('mock save', () => {
  spyOn(obj, 'save');
  expect(() => obj.save()).not.toThrow();
});
```
### Error 51: Spying on class method in constructor
**Description:** Constructor calls method before spy is installed
```javascript
class Logger {
  constructor() { this.init(); }
  init() { this.log('started'); }
  log(msg) { /* real logging */ }
}
it('spy on log', () => {
  const logger = new Logger();
  spyOn(logger, 'log');
  expect(logger.log).toHaveBeenCalledWith('started');
});
```
### Error 52: toHaveBeenCalledBefore wrong order
**Description:** Calling order doesn't match expectation
```javascript
it('call order', () => {
  const a = jasmine.createSpy();
  const b = jasmine.createSpy();
  a();
  b();
  expect(b).toHaveBeenCalledBefore(a);
});
```
### Error 53: Not passing this context in spy
**Description:** Spy loses the this context of the original method
```javascript
class Counter {
  constructor() { this.count = 0; }
  increment() { this.count++; }
}
it('spy context', () => {
  const c = new Counter();
  spyOn(c, 'increment');
  c.increment();
  expect(c.count).toBe(1);
});
```
### Error 54: and.returnValues array size mismatch
**Description:** More calls than provided return values
```javascript
it('returns exhausted', () => {
  const spy = jasmine.createSpy().and.returnValues(1, 2);
  spy();
  spy();
  spy();
  expect(spy()).toBe(3);
});
```
### Error 55: Spy on array method
**Description:** Spying on array prototype methods
```javascript
it('spy array', () => {
  const arr = [1, 2, 3];
  spyOn(arr, 'map');
  arr.map(x => x * 2);
  expect(arr.map).toHaveBeenCalled();
});
```
### Error 56: Using spy after Jasmine teardown
**Description:** Spy is restored after test, don't reference it
```javascript
let globalSpy;
beforeEach(() => {
  globalSpy = spyOn(Math, 'random');
});
afterEach(() => {
  expect(globalSpy).toHaveBeenCalled();
});
```
### Error 57: jasmine.any on null
**Description:** jasmine.any(null) throws because null is not a constructor
```javascript
it('any null', () => {
  const spy = jasmine.createSpy();
  spy(null);
  expect(spy).toHaveBeenCalledWith(jasmine.any(null));
});
```
### Error 58: createSpyObj with duplicate method names
**Description:** Duplicate method names create only one spy
```javascript
it('duplicate methods', () => {
  const mock = jasmine.createSpyObj('obj', ['get', 'get']);
  mock.get();
  mock.get();
  expect(mock.get).toHaveBeenCalledTimes(2);
});
```
### Error 59: Wrong property name in calls.argsFor
**Description:** calls.argsFor expects a number index
```javascript
it('args for', () => {
  const spy = jasmine.createSpy();
  spy(1, 2);
  expect(spy.calls.argsFor('first')).toEqual([1, 2]);
});
```
### Error 60: Not using and.returnValue for multiple returns
**Description:** Each call to spy should return the same value
```javascript
it('multiple calls', () => {
  const spy = jasmine.createSpy().and.returnValues('a');
  expect(spy()).toBe('a');
  expect(spy()).toBe('a');
});
```
### Error 61: Spy on class static method
**Description:** Static methods need different spy setup
```javascript
class Config {
  static get(key) { return 'value'; }
}
it('spy static', () => {
  spyOn(Config, 'get');
  expect(Config.get('key')).toBe('value');
});
```
### Error 62: Mocking event listener without cleanup
**Description:** Event listener spy persists across tests
```javascript
it('adds listener', () => {
  const spy = jasmine.createSpy();
  document.addEventListener('click', spy);
  document.dispatchEvent(new Event('click'));
  expect(spy).toHaveBeenCalled();
});
```
### Error 63: Spying on null prototype
**Description:** Object with null prototype breaks spyOn
```javascript
it('null proto', () => {
  const obj = Object.create(null);
  spyOn(obj, 'method');
});
```
### Error 64: Not matching partial arguments
**Description:** Using toHaveBeenCalledWith when only some args matter
```javascript
it('partial match', () => {
  const spy = jasmine.createSpy();
  spy('event', { id: 1, name: 'test' });
  expect(spy).toHaveBeenCalledWith('event');
});
```
### Error 65: Stubbing method with incorrect return type
**Description:** Return type mismatch from stub causes test failures
```javascript
it('stub type mismatch', () => {
  const obj = { getCount: () => 5 };
  spyOn(obj, 'getCount').and.returnValue('5');
  const result = obj.getCount() + 1;
  expect(result).toBe(6);
});
```
### Error 66: Spy not matching inherited method
**Description:** Spying on inherited method from prototype
```javascript
class Animal { speak() { return 'sound'; } }
class Dog extends Animal {}
it('spy inherited', () => {
  const dog = new Dog();
  spyOn(dog, 'speak').and.returnValue('bark');
  expect(dog.speak()).toBe('bark');
});
```
### Error 67: Not verifying spy call count after multiple invocations
**Description:** Call count not checked when it could vary
```javascript
it('variable calls', () => {
  const spy = jasmine.createSpy();
  const fn = (cond) => { if (cond) spy(); };
  fn(true);
  fn(false);
  fn(true);
  // Should check count
});
```
### Error 68: and.callFake exception not caught
**Description:** Exception in callFake is not handled
```javascript
it('fake throws', () => {
  const obj = { get: () => 1 };
  spyOn(obj, 'get').and.callFake(() => { throw new Error('fake error'); });
  expect(obj.get()).toBe(1);
});
```
### Error 69: Multiple spies on different methods but same object
**Description:** Multiple spies on the same object cause confusion
```javascript
it('multiple spies', () => {
  const obj = { a() {}, b() {} };
  spyOn(obj, 'a');
  spyOn(obj, 'b');
  obj.a();
  obj.b();
  expect(obj.a).toHaveBeenCalledBefore(obj.b);
});
```
### Error 70: Spy with and.returnValue on void method
**Description:** Method that returns nothing now returns a value
```javascript
it('void returns', () => {
  const obj = { notify() { /* void */ } };
  spyOn(obj, 'notify').and.returnValue(true);
  expect(obj.notify()).toBe(true);
});
```

## Issue Snippets (30)

### Issue 1: Over-mocking simple operations
**Description:** Mocking functions that don't need mocking
```javascript
it('adds numbers', () => {
  const addMock = jasmine.createSpy('add').and.returnValue(5);
  const result = addMock(2, 3);
  expect(result).toBe(5);
});
```
### Issue 2: Testing implementation not behavior with spies
**Description:** Checking internal method calls instead of outcomes
```javascript
it('processes order', () => {
  const svc = new OrderService();
  spyOn(svc, 'calculateTax');
  svc.processOrder({ items: [] });
  expect(svc.calculateTax).toHaveBeenCalled();
});
```
### Issue 3: Not restoring global mocks
**Description:** Global object mocks persist across test files
```javascript
beforeAll(() => {
  spyOn(window, 'fetch').and.resolveTo({ json: () => ({}) });
});
```
### Issue 4: Spy that returns undefined but code expects value
**Description:** Default spy returns undefined, causing downstream errors
```javascript
it('spy default', () => {
  const svc = { getData: () => ({ items: [] }) };
  spyOn(svc, 'getData');
  const result = svc.getData();
  expect(result.items.length).toBe(0);
});
```
### Issue 5: Creating mocks for unused dependencies
**Description:** Mocking dependencies that aren't used in the test
```javascript
it('sends email', () => {
  const emailMock = jasmine.createSpyObj('email', ['send']);
  const loggerMock = jasmine.createSpyObj('logger', ['log']);
  const cacheMock = jasmine.createSpyObj('cache', ['get']);
  sendEmail('test@test.com', emailMock);
  expect(emailMock.send).toHaveBeenCalled();
});
```
### Issue 6: Not verifying spy was called with specific arguments
**Description:** Only checking toHaveBeenCalled, not with what
```javascript
it('saves user', () => {
  const saveSpy = jasmine.createSpy();
  saveUser({ id: 1, name: 'Alice' }, saveSpy);
  expect(saveSpy).toHaveBeenCalled();
});
```
### Issue 7: Mocking methods that are tested elsewhere
**Description:** Redundant mocking of already-tested methods
```javascript
it('processes payment', () => {
  spyOn(PaymentService.prototype, 'validate').and.returnValue(true);
  spyOn(EmailService.prototype, 'send').and.returnValue(true);
  // test already tested methods again
});
```
### Issue 8: Using real objects instead of mocks for external APIs
**Description:** Tests hit real external services
```javascript
it('fetches weather', () => {
  const svc = new WeatherService();
  svc.getTemperature('NYC').then(temp => {
    expect(temp).toBeDefined();
  });
});
```
### Issue 9: Over-specifying mock interactions
**Description:** Too many specific expectations on mocks
```javascript
it('validates order', () => {
  const mock = jasmine.createSpyObj('validator', ['check', 'verify', 'approve']);
  validateOrder({ id: 1 }, mock);
  expect(mock.check).toHaveBeenCalledWith({ id: 1 });
  expect(mock.check).toHaveBeenCalledTimes(1);
  expect(mock.check).toHaveBeenCalledBefore(mock.verify);
  expect(mock.verify).toHaveBeenCalled();
});
```
### Issue 10: Not using jasmine.any for irrelevant arguments
**Description:** Being too strict about arguments that don't matter
```javascript
it('logs message', () => {
  const logSpy = jasmine.createSpy();
  logMessage('hello', logSpy, { timestamp: Date.now(), level: 'info' });
  expect(logSpy).toHaveBeenCalledWith('hello', { timestamp: 1234567890, level: 'info' });
});
```
### Issue 11: Leaking spies between tests via shared scope
**Description:** Spies defined in describe scope affect multiple tests
```javascript
describe('suite', () => {
  const spy = jasmine.createSpy();
  it('test 1', () => { spy(); });
  it('test 2', () => { expect(spy).toHaveBeenCalledTimes(0); });
});
```
### Issue 12: Mocking without asserting interaction
**Description:** Mock is created but never checked for calls
```javascript
it('processes', () => {
  const mock = jasmine.createSpyObj('service', ['process']);
  runService(mock);
});
```
### Issue 13: Brittle tests from mock return value changes
**Description:** Tests break when mock return values change in unrelated code
```javascript
it('gets config', () => {
  spyOn(ConfigService, 'get').and.returnValue({ theme: 'dark', lang: 'en' });
  const result = getTheme();
  expect(result).toBe('dark');
});
```
### Issue 14: Spying on methods that are called in constructor
**Description:** Constructor calls happen before spy is installed
```javascript
class Service {
  constructor() { this.init(); }
  init() { this.load(); }
  load() {}
}
it('spies on load', () => {
  const svc = new Service();
  spyOn(svc, 'load');
  expect(svc.load).toHaveBeenCalled();
});
```
### Issue 15: Not testing error paths through mocks
**Description:** Mocks always return success, never test failure
```javascript
it('handles api', () => {
  spyOn(api, 'fetch').and.resolveTo({ data: [] });
  // Never test when fetch rejects
});
```
### Issue 16: Mocking modules instead of using dependency injection
**Description:** Hard-to-maintain module-level mocks
```javascript
import * as db from './database';
it('fetches user', () => {
  spyOn(db, 'query').and.returnValue([{ id: 1 }]);
});
```
### Issue 17: Creating spies in beforeAll when beforeEach is appropriate
**Description:** Shared state across tests leads to test coupling
```javascript
beforeAll(() => {
  spyOn(service, 'getData').and.returnValue('mock');
});
```
### Issue 18: Mock return values that don't match real types
**Description:** Mocks return impossible or incorrect data shapes
```javascript
it('returns user', () => {
  spyOn(UserService, 'get').and.returnValue('not a user');
  const user = UserService.get(1);
  expect(user.name).toBe('Alice');
});
```
### Issue 19: Using toHaveBeenCalledWith with many arguments
**Description:** Excessive argument verification makes tests fragile
```javascript
it('calls with many args', () => {
  const spy = jasmine.createSpy();
  spy(1, 'a', true, null, { x: 1 });
  expect(spy).toHaveBeenCalledWith(1, 'a', true, null, { x: 1 });
});
```
### Issue 20: Not cleaning up DOM event spy
**Description:** Event handler spies remain after test
```javascript
it('handles click', () => {
  const handler = jasmine.createSpy();
  document.getElementById('btn').addEventListener('click', handler);
  document.getElementById('btn').click();
  expect(handler).toHaveBeenCalled();
});
```
### Issue 21: Stubbing Date.now without restoration
**Description:** Date.now mock affects all subsequent tests
```javascript
it('freezes time', () => {
  spyOn(Date, 'now').and.returnValue(1000000);
  expect(Date.now()).toBe(1000000);
});
```
### Issue 22: Calling and.returnValue without understanding callThrough
**Description:** Spy replaces method when callThrough is needed
```javascript
it('needs real behavior', () => {
  spyOn(validator, 'check').and.returnValue(true);
  // validator.check has side effects that are now lost
});
```
### Issue 23: Creating mocks for every test individually
**Description:** Duplicated mock creation across tests
```javascript
it('test 1', () => {
  const mock = jasmine.createSpyObj('svc', ['get']);
  // ...
});
it('test 2', () => {
  const mock = jasmine.createSpyObj('svc', ['get']);
  // ...
});
```
### Issue 24: Mocking but not using the mock in the test
**Description:** Mock is defined but the real object is used
```javascript
it('processes with mock', () => {
  const mockDb = jasmine.createSpyObj('db', ['save']);
  const service = new Service(realDb);
  service.save({ id: 1 });
  expect(mockDb.save).toHaveBeenCalled();
});
```
### Issue 25: Checking spy calls with too much precision
**Description:** Testing exact timestamp values that will change
```javascript
it('logs with timestamp', () => {
  const spy = jasmine.createSpy();
  log('message', spy);
  expect(spy).toHaveBeenCalledWith('message', Date.now());
});
```
### Issue 26: Using spies to verify unrelated behavior
**Description:** Spying on methods not relevant to the test's purpose
```javascript
it('adds item', () => {
  const cart = new Cart();
  spyOn(cart, 'calculateTotal');
  spyOn(cart, 'updateUI');
  spyOn(cart, 'log');
  cart.addItem('apple');
  expect(cart.items.length).toBe(1);
});
```
### Issue 27: Stubbing Math.random for non-random tests
**Description:** Unnecessary stubbing of Math.random
```javascript
it('parses JSON', () => {
  spyOn(Math, 'random');
  const result = JSON.parse('{"a":1}');
  expect(result.a).toBe(1);
});
```
### Issue 28: Mock implementation doesn't match interface
**Description:** Mock methods return wrong types
```javascript
it('process payment', () => {
  const paymentMock = jasmine.createSpyObj('payment', ['charge']);
  paymentMock.charge.and.returnValue('success');
  const result = processPayment(paymentMock, 100);
  expect(result.confirmation).toBeDefined();
});
```
### Issue 29: Overusing createSpyObj when simple spy is enough
**Description:** Creating spy objects when a single spy would suffice
```javascript
it('calls callback', () => {
  const mock = jasmine.createSpyObj('cb', ['call']);
  execute(mock.call);
  expect(mock.call).toHaveBeenCalled();
});
```
### Issue 30: Not resetting module-level spies
**Description:** Spies on module-level objects persist across test files
```javascript
beforeAll(() => {
  spyOn(console, 'log');
});
```

## Modification Snippets (50)

### Modify 1: Add spy to verify method call
**Description:** Use spyOn to verify that save was called
```javascript
class UserService {
  save(user) { /* saves to DB */ }
}
it('saves user', () => {
  const service = new UserService();
  service.save({ id: 1 });
  // Verify save was called
});
```
### Modify 2: Implement mock return value
**Description:** Use a spy to control the return value of getData
```javascript
class DataService {
  getData() { return fetch('/api/data'); }
}
it('returns mock data', () => {
  const service = new DataService();
  // Mock getData to return test data
});
```
### Modify 3: Add spy restoration in afterEach
**Description:** Ensure all spies are restored after each test
```javascript
describe('spy tests', () => {
  it('spies on random', () => {
    spyOn(Math, 'random').and.returnValue(0.5);
    expect(Math.random()).toBe(0.5);
  });
  it('uses real random', () => {
    // Should use real Math.random
  });
});
```
### Modify 4: Create a spy object for API service
**Description:** Use createSpyObj to mock an API service
```javascript
class ApiService {
  getUsers() { return fetch('/users'); }
  getPosts() { return fetch('/posts'); }
  getComments() { return fetch('/comments'); }
}
it('works with mocked API', () => {
  // Create a spy object for ApiService
});
```
### Modify 5: Use callThrough to preserve real behavior
**Description:** Spy on a method but let the real implementation run
```javascript
const logger = {
  log(msg) {
    console.log(msg);
    return msg.length;
  }
};
it('logs and returns length', () => {
  spyOn(logger, 'log');
  const result = logger.log('hello');
  expect(result).toBe(5);
});
```
### Modify 6: Implement callFake for custom behavior
**Description:** Use callFake to implement custom spy logic
```javascript
const auth = {
  login(user, pass) { return user === 'admin' && pass === 'secret'; }
};
it('fake login', () => {
  // Create a spy that only accepts 'admin'/'admin'
});
```
### Modify 7: Add and.returnValues for multiple calls
**Description:** Return different values on successive calls
```javascript
const counter = {
  next() { return Math.random(); }
};
it('returns sequence', () => {
  spyOn(counter, 'next');
  // Return 1, 2, 3 on successive calls
});
```
### Modify 8: Use jasmine.any for argument matching
**Description:** Verify spy was called with any number
```javascript
it('logs numeric id', () => {
  const logSpy = jasmine.createSpy();
  processUser({ id: 42, name: 'Alice' }, logSpy);
  // Verify logSpy was called with any number as first arg
});
```
### Modify 9: Implement jasmine.objectContaining
**Description:** Verify spy was called with object containing specific keys
```javascript
it('saves user data', () => {
  const saveSpy = jasmine.createSpy();
  saveUser({ name: 'Alice', age: 30, email: 'alice@test.com' }, saveSpy);
  // Verify saveSpy received an object with name and email
});
```
### Modify 10: Add spy on async method with resolveTo
**Description:** Mock an async method to resolve with test data
```javascript
class WeatherAPI {
  async getForecast(city) {
    const res = await fetch(`/weather/${city}`);
    return res.json();
  }
}
it('returns forecast', async () => {
  const api = new WeatherAPI();
  // Mock getForecast to return test data
});
```
### Modify 11: Use and.rejectWith for error testing
**Description:** Make an async spy reject to test error handling
```javascript
class PaymentAPI {
  async charge(amount) {
    const res = await fetch('/charge', { method: 'POST' });
    return res.json();
  }
}
it('handles charge failure', async () => {
  const api = new PaymentAPI();
  // Mock charge to reject
});
```
### Modify 12: Verify spy call order with toHaveBeenCalledBefore
**Description:** Check that methods are called in the correct order
```javascript
const service = {
  validate() {},
  process() {},
  notify() {}
};
it('process in order', () => {
  service.validate();
  service.process();
  service.notify();
  // Verify call order
});
```
### Modify 13: Add spy calls tracking
**Description:** Use spy.calls to inspect call details
```javascript
it('tracks all calls', () => {
  const spy = jasmine.createSpy();
  spy(1, 2);
  spy(3, 4);
  spy(5, 6);
  // Inspect all calls, args for second call, and call count
});
```
### Modify 14: Implement jasmine.stringMatching
**Description:** Use string matching for flexible argument verification
```javascript
it('logs formatted message', () => {
  const logSpy = jasmine.createSpy();
  logMessage('User created: id=42', logSpy);
  // Verify message contains 'User created'
});
```
### Modify 15: Create mock with default implementations
**Description:** Use createSpyObj with method arrays and configure returns
```javascript
class Database {
  connect() {}
  query(sql) { return []; }
  close() {}
}
it('mocks database', () => {
  // Create a fully mocked database
});
```
### Modify 16: Add spy to verify function was not called
**Description:** Ensure a spy was never invoked
```javascript
it('does not call send when invalid', () => {
  const sendSpy = jasmine.createSpy();
  validateAndSend({ name: '' }, sendSpy);
  // Verify sendSpy was not called
});
```
### Modify 17: Implement spy on static method
**Description:** Spy on a static class method
```javascript
class Config {
  static get(key) {
    return localStorage.getItem(key);
  }
}
it('gets config value', () => {
  // Spy on Config.get
});
```
### Modify 18: Use jasmine.arrayContaining in tests
**Description:** Verify an array argument contains expected elements
```javascript
it('processes items', () => {
  const spy = jasmine.createSpy();
  processItems(['apple', 'banana', 'cherry'], spy);
  // Verify spy was called with array containing 'apple' and 'cherry'
});
```
### Modify 19: Add beforeEach to create shared spies
**Description:** Create common spy objects in beforeEach
```javascript
describe('payment tests', () => {
  let paymentMock, emailMock, loggerMock;
  beforeEach(() => {
    // Create shared mocks
  });
  it('processes payment', () => {});
  it('handles failure', () => {});
});
```
### Modify 20: Implement spy on getter property
**Description:** Use Object.defineProperty to spy on a getter
```javascript
const user = {
  firstName: 'Alice',
  lastName: 'Smith',
  get fullName() { return `${this.firstName} ${this.lastName}`; }
};
it('spies on fullName', () => {
  // Spy on the fullName getter
});
```
### Modify 21: Add partial argument matching
**Description:** Use jasmine.any for arguments that vary
```javascript
it('logs with timestamp', () => {
  const logSpy = jasmine.createSpy();
  logEvent('click', { x: 10, y: 20 }, logSpy);
  // Verify first arg is 'click', second is object with x, y
});
```
### Modify 22: Create async spy with callFake
**Description:** Implement async behavior using callFake
```javascript
class SearchService {
  async search(query) {
    const res = await fetch(`/search?q=${query}`);
    return res.json();
  }
}
it('returns search results', async () => {
  const service = new SearchService();
  // Mock search with callFake
});
```
### Modify 23: Implement spy cleanup for document methods
**Description:** Add afterEach to restore document spies
```javascript
describe('DOM spies', () => {
  it('spies on getElementById', () => {
    spyOn(document, 'getElementById').and.returnValue(null);
  });
  it('uses real getElementById', () => {
    // Need real behavior
  });
});
```
### Modify 24: Use and.callThrough with conditional logic
**Description:** Spy that sometimes calls through, sometimes returns mock
```javascript
const api = {
  fetch(path) { return fetch(path).then(r => r.json()); }
};
it('conditional mock', () => {
  // Spy on fetch: for '/users' return mock data, others call through
});
```
### Modify 25: Add verification for spy arguments with multiple calls
**Description:** Check different arguments for each call
```javascript
it('multiple different calls', () => {
  const spy = jasmine.createSpy();
  spy('init');
  spy('process', { id: 1 });
  spy('cleanup');
  // Verify each call's arguments
});
```
### Modify 26: Implement spy for addEventListener
**Description:** Spy on event listener registration
```javascript
class Button {
  constructor() {
    this.element = document.createElement('button');
  }
  onClick(handler) {
    this.element.addEventListener('click', handler);
  }
}
it('registers click handler', () => {
  const btn = new Button();
  // Spy on addEventListener
});
```
### Modify 27: Create mock for Date constructor
**Description:** Mock the Date constructor to return a fixed date
```javascript
function getExpiryDate() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date;
}
it('returns 30 day expiry', () => {
  // Mock new Date() to return a known date
});
```
### Modify 28: Add spy to test throttle implementation
**Description:** Use spy to verify throttled function calls
```javascript
function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}
it('throttles calls', () => {
  const spy = jasmine.createSpy();
  const throttled = throttle(spy, 100);
  // Call multiple times and verify
});
```
### Modify 29: Implement fetch mock using spy
**Description:** Mock the global fetch function
```javascript
async function loadUser(id) {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}
it('loads user', async () => {
  // Mock fetch to return user data
});
```
### Modify 30: Add spy to test callback registry
**Description:** Verify callbacks are properly registered and called
```javascript
class EventBus {
  constructor() { this.handlers = {}; }
  on(event, handler) {
    (this.handlers[event] ||= []).push(handler);
  }
  emit(event, data) {
    (this.handlers[event] || []).forEach(h => h(data));
  }
}
it('registers and fires callbacks', () => {
  const bus = new EventBus();
  // Use spies to verify
});
```
### Modify 31: Use jasmine.createSpy for callback verification
**Description:** Create an anonymous spy for callback testing
```javascript
function processItems(items, callback) {
  items.forEach(item => callback(item));
}
it('calls callback for each item', () => {
  // Create a spy and verify it's called for each item
});
```
### Modify 32: Add mock for localStorage
**Description:** Mock localStorage methods using spies
```javascript
function savePreferences(prefs) {
  localStorage.setItem('prefs', JSON.stringify(prefs));
}
function loadPreferences() {
  return JSON.parse(localStorage.getItem('prefs'));
}
it('saves and loads preferences', () => {
  // Mock localStorage
});
```
### Modify 33: Implement spy with and.returnValue for chain
**Description:** Create a method chain using spies
```javascript
class QueryBuilder {
  where(condition) { return this; }
  orderBy(field) { return this; }
  limit(n) { return this; }
  execute() { return []; }
}
it('builds query chain', () => {
  const builder = new QueryBuilder();
  // Spy and verify chain works
});
```
### Modify 34: Add verification for no unexpected calls
**Description:** Verify that no extra calls were made
```javascript
it('only calls save once', () => {
  const saveSpy = jasmine.createSpy();
  processOrder({ id: 1 }, saveSpy);
  // Verify only one call and no extra methods called
});
```
### Modify 35: Create mock for WebSocket
**Description:** Mock WebSocket for testing real-time features
```javascript
class ChatClient {
  constructor() { this.socket = null; }
  connect(url) {
    this.socket = new WebSocket(url);
  }
  send(message) {
    this.socket.send(JSON.stringify(message));
  }
}
it('sends message via websocket', () => {
  // Mock WebSocket
});
```
### Modify 36: Use spy to test error boundary
**Description:** Spy on error handler to verify it's called
```javascript
class ErrorBoundary {
  handleError(error) {
    console.error(error);
    return { recovered: true };
  }
}
it('handles errors', () => {
  const boundary = new ErrorBoundary();
  // Spy on handleError
});
```
### Modify 37: Implement spy for IntersectionObserver
**Description:** Mock the IntersectionObserver API
```javascript
function observeVisibility(element, callback) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => callback(entry.isIntersecting));
  });
  observer.observe(element);
  return observer;
}
it('observes visibility', () => {
  // Mock IntersectionObserver
});
```
### Modify 38: Add mock for clipboard API
**Description:** Mock navigator.clipboard.writeText
```javascript
async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}
it('copies text to clipboard', async () => {
  // Mock clipboard API
});
```
### Modify 39: Create mock for geolocation
**Description:** Mock navigator.geolocation for testing
```javascript
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
it('gets current position', async () => {
  // Mock geolocation
});
```
### Modify 40: Add spy to test module initialization
**Description:** Verify that init methods are called when module loads
```javascript
class Application {
  constructor() {
    this.db = new Database();
    this.cache = new Cache();
    this.router = new Router();
  }
  init() {
    this.db.connect();
    this.cache.load();
    this.router.start();
  }
}
it('initializes all components', () => {
  const app = new Application();
  // Spy on init methods
});
```
### Modify 41: Use jasmine.clock with spy for timing
**Description:** Combine fake clock with spies for timer tests
```javascript
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
it('debounces calls with clock', () => {
  const spy = jasmine.createSpy();
  const debounced = debounce(spy, 500);
  // Use jasmine.clock().install and tick
});
```
### Modify 42: Implement spy for history.pushState
**Description:** Spy on browser history API
```javascript
function navigateTo(path) {
  window.history.pushState({}, '', path);
}
it('updates URL', () => {
  // Spy on history.pushState
});
```
### Modify 43: Add mock for Notification API
**Description:** Mock the browser Notification API
```javascript
function showNotification(title, body) {
  if (Notification.permission === 'granted') {
    new Notification(title, { body });
  }
}
it('shows notification', () => {
  // Mock Notification
});
```
### Modify 44: Create spy for Service Worker registration
**Description:** Mock navigator.serviceWorker.register
```javascript
async function registerSW() {
  const registration = await navigator.serviceWorker.register('/sw.js');
  return registration;
}
it('registers service worker', async () => {
  // Mock serviceWorker
});
```
### Modify 45: Use spy to verify analytics tracking
**Description:** Spy on analytics service to verify tracking calls
```javascript
class Analytics {
  track(event, data) {
    console.log(`Track: ${event}`, data);
  }
}
it('tracks page view', () => {
  const analytics = new Analytics();
  // Spy on track
});
```
### Modify 46: Implement mock for indexedDB
**Description:** Mock IndexedDB for storage tests
```javascript
class OfflineStorage {
  async save(key, value) {
    const db = await openDB('app', 1);
    await db.put('store', value, key);
  }
  async load(key) {
    const db = await openDB('app', 1);
    return await db.get('store', key);
  }
}
it('saves offline data', async () => {
  const storage = new OfflineStorage();
  // Mock indexedDB
});
```
### Modify 47: Add spy for error logging
**Description:** Spy on error logging to verify errors are reported
```javascript
class Logger {
  error(message, details) {
    console.error(message, details);
    // Also sends to error tracking service
  }
}
it('logs errors', () => {
  const logger = new Logger();
  // Spy on error method
});
```
### Modify 48: Create mock for ResizeObserver
**Description:** Mock ResizeObserver for responsive component tests
```javascript
class ResponsiveComponent {
  constructor(element) {
    this.element = element;
    this.observer = new ResizeObserver(() => this.handleResize());
    this.observer.observe(element);
  }
  handleResize() { /* handle resize */ }
}
it('handles resize', () => {
  // Mock ResizeObserver
});
```
### Modify 49: Use spy to verify DOM manipulation
**Description:** Spy on DOM methods to verify element creation
```javascript
class ComponentRenderer {
  render() {
    const div = document.createElement('div');
    div.className = 'component';
    div.textContent = 'Hello';
    document.body.appendChild(div);
  }
}
it('creates DOM elements', () => {
  const renderer = new ComponentRenderer();
  // Spy on createElement and appendChild
});
```
### Modify 50: Implement spy with and.returnValue for complex mock
**Description:** Create a complex mock for a service with multiple methods
```javascript
class AuthService {
  async login(email, password) { /* real logic */ }
  async logout() { /* real logic */ }
  async refreshToken() { /* real logic */ }
  isAuthenticated() { return !!this.token; }
  getUser() { return this.user; }
}
it('mocks auth service', async () => {
  // Create comprehensive mock for all methods
});
```
