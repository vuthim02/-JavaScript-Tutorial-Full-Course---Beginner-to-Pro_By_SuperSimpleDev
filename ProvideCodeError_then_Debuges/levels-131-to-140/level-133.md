# Level 133 - Test-driven development practice (Jasmine + functions)

## Error Snippets

### Error 1: describe block missing callback
**Description:** The describe function needs a callback as second argument.
```javascript
describe("MathUtils");
it("should add two numbers", function() {
  expect(add(2, 3)).toBe(5);
});
```

### Error 2: it block missing callback
**Description:** The it function needs a callback as second argument.
```javascript
describe("MathUtils", function() {
  it("should add two numbers");
});
```

### Error 3: expect without matcher
**Description:** expect must be chained with a matcher like toBe.
```javascript
it("test", function() {
  expect(1 + 1);
});
```

### Error 4: toBe for object comparison
**Description:** Use toEqual instead of toBe for comparing objects.
```javascript
it("should compare objects", function() {
  expect({ a: 1 }).toBe({ a: 1 });
});
```

### Error 5: beforeEach without function
**Description:** beforeEach requires a function argument.
```javascript
describe("Counter", function() {
  beforeEach();
  it("should start at 0", function() {
    expect(counter.count).toBe(0);
  });
});
```

### Error 6: Typo in matcher name
**Description:** Use toBeDefined instead of toBeDefined with wrong spelling.
```javascript
it("should be defined", function() {
  const x = 10;
  expect(x).toBeDefind();
});
```

### Error 7: Missing return in test
**Description:** Promise-based tests must return the promise.
```javascript
it("should fetch data", function() {
  fetch("/api").then(function(res) {
    expect(res.status).toBe(200);
  });
});
```

### Error 8: Using toBe with floating point
**Description:** Use toBeCloseTo for floating point comparisons.
```javascript
it("float math", function() {
  expect(0.1 + 0.2).toBe(0.3);
});
```

### Error 9: Wrong argument order in toHaveBeenCalledWith
**Description:** Check arguments in correct order with toHaveBeenCalledWith.
```javascript
it("should call with args", function() {
  const spy = jasmine.createSpy();
  spy("a", "b");
  expect(spy).toHaveBeenCalledWith("b", "a");
});
```

### Error 10: describe inside it block
**Description:** describe blocks cannot be nested inside it blocks.
```javascript
it("outer test", function() {
  describe("inner suite", function() {
    it("inner test", function() {});
  });
});
```

### Error 11: Creating spy on non-existent method
**Description:** Create spy on a defined method of an object.
```javascript
const obj = { a: 1 };
spyOn(obj, "method");
```

### Error 12: Missing toThrow callback
**Description:** toThrow expects a function to be passed.
```javascript
it("should throw", function() {
  throw new Error("fail");
  expect(throw new Error("fail")).toThrow();
});
```

### Error 13: NotEqual vs notEqual
**Description:** Use expect().not.toBe() instead of not.toBe.
```javascript
it("should not be equal", function() {
  expect(5).notToBe(3);
});
```

### Error 14: toContain with object array
**Description:** toContain uses === for comparison, not deep equality.
```javascript
it("should contain", function() {
  const arr = [{ id: 1 }];
  expect(arr).toContain({ id: 1 });
});
```

### Error 15: Calling async done incorrectly
**Description:** The done callback must be called to signal async completion.
```javascript
it("async test", function(done) {
  setTimeout(function() {
    expect(true).toBe(true);
    // forgot to call done()
  }, 100);
});
```

### Error 16: beforeEach variables not scoped
**Description:** Variables assigned in beforeEach must be declared in describe scope.
```javascript
describe("Test", function() {
  beforeEach(function() {
    value = 10;
  });
  it("should have value", function() {
    expect(value).toBe(10);
  });
});
```

### Error 17: Using fdescribe/xdescribe in committed code
**Description:** Focused tests should not be in the final test suite.
```javascript
fdescribe("Focused Suite", function() {
  it("test", function() {});
});
```

### Error 18: Using fit/xit in committed code
**Description:** Focused individual tests should not be committed.
```javascript
describe("Suite", function() {
  fit("focused test", function() {});
  it("other test", function() {});
});
```

### Error 19: toThrowError wrong constructor
**Description:** toThrowError expects an Error constructor.
```javascript
it("type check", function() {
  expect(function() { throw "string error"; }).toThrowError(Error);
});
```

### Error 20: Expecting boolean with toBeTruthy
**Description:** toBeTruthy checks truthiness, not boolean true.
```javascript
it("truthy", function() {
  expect(1).toBeTruthy();
});
```

### Error 21: Spying on undefined method
**Description:** Spy must be on an existing method of an object.
```javascript
const obj = { greet: function() { return "hi"; } };
spyOn(obj, "farewell");
```

### Error 22: Not restoring spy after test
**Description:** Spies should be restored to clean up.
```javascript
describe("Test", function() {
  it("spy", function() {
    spyOn(console, "log");
    console.log("test");
  });
  it("clean", function() {
    // console.log spy still active
  });
});
```

### Error 23: Using toMatch with wrong regex
**Description:** toMatch expects a string or RegExp pattern.
```javascript
it("match", function() {
  expect("Hello World").toMatch(42);
});
```

### Error 24: Calling expect with no value
**Description:** expect() requires a value argument.
```javascript
it("test", function() {
  expect().toBe(5);
});
```

### Error 25: Wrong matcher for null check
**Description:** Use toBeNull for null checks.
```javascript
it("null check", function() {
  expect(null).toBe(null);
});
```

### Error 26: Throwing inside expect callback
**Description:** The function passed to expect must throw, not the expect itself.
```javascript
it("should throw", function() {
  expect(JSON.parse("invalid")).toThrow();
});
```

### Error 27: Not returning promise from async test
**Description:** Promise-based tests must return the promise for Jasmine to wait.
```javascript
it("async", function() {
  return Promise.resolve().then(function() {
    expect(true).toBe(true);
  });
});
```

### Error 28: toBeNaN vs toBeNaN
**Description:** Use toBeNaN matcher for NaN checks.
```javascript
it("nan", function() {
  expect(NaN).toBe(NaN);
});
```

### Error 29: Wrong setup for beforeAll
**Description:** beforeAll runs once before all tests in the describe.
```javascript
describe("Suite", function() {
  beforeAll(function() {
    this.data = "setup";
  });
  it("test", function() {
    expect(this.data).toBe("setup");
  });
});
```

### Error 30: Creating jasmine clock without installing
**Description:** Call jasmine.clock().install() before using mock clock.
```javascript
it("clock", function() {
  jasmine.clock().mockDate(new Date("2024-01-01"));
  expect(new Date().getFullYear()).toBe(2024);
});
```

### Error 31: Using pending() incorrectly
**Description:** pending() marks a test as pending without a reason.
```javascript
describe("Suite", function() {
  it("pending test", function() {
    pending();
    expect(1).toBe(1);
  });
});
```

### Error 32: fail() not in catch block
**Description:** fail() should be used in catch blocks of async tests.
```javascript
it("async error", function() {
  Promise.reject("error").catch(function(e) {
    fail(e);
  });
});
```

### Error 33: Not matching spy arguments precisely
**Description:** toHaveBeenCalledWith checks exact arguments.
```javascript
it("spy args", function() {
  const spy = jasmine.createSpy();
  spy("a", "b", "c");
  expect(spy).toHaveBeenCalledWith("a");
});
```

### Error 34: Multiple describes with same name
**Description:** Duplicate describe names cause confusion.
```javascript
describe("Math", function() {});
describe("Math", function() {}); // duplicate
```

### Error 35: Using this in arrow function
**Description:** Arrow functions share parent this, not the test context.
```javascript
describe("Suite", function() {
  beforeEach(function() { this.value = 5; });
  it("test", () => {
    expect(this.value).toBe(5);
  });
});
```

### Error 36: expect.any without argument
**Description:** expect.any() requires a constructor argument.
```javascript
it("type check", function() {
  expect("hello").toEqual(jasmine.any());
});
```

### Error 37: toHaveBeenCalledTimes with wrong number
**Description:** Check the exact call count with toHaveBeenCalledTimes.
```javascript
it("call count", function() {
  const spy = jasmine.createSpy();
  spy();
  spy();
  expect(spy).toHaveBeenCalledTimes(3);
});
```

### Error 38: Missing jasmine.createSpyObj
**Description:** Create spy objects with jasmine.createSpyObj.
```javascript
it("spy object", function() {
  const mock = jasmine.createSpyObj("service", ["fetch"]);
  // mock.fetch is a spy
});
```

### Error 39: Not testing edge cases
**Description:** Test only the happy path without edge cases.
```javascript
it("adds numbers", function() {
  expect(add(1, 2)).toBe(3);
  // Missing: negative, zero, overflow, decimals
});
```

### Error 40: Wrong order of describe/it nesting
**Description:** Tests must be inside it blocks inside describe blocks.
```javascript
// Top level test without describe
it("top level test", function() {});
```

### Error 41: async beforeEach without returning
**Description:** Async beforeEach must return the promise.
```javascript
describe("Suite", function() {
  beforeEach(function() {
    return fetch("/setup").then(function(r) { return r.json(); });
  });
  it("test", function() {});
});
```

### Error 42: Using not with toThrow
**Description:** not.toThrow checks that no error is thrown.
```javascript
it("no throw", function() {
  expect(function() {}).not.toThrow();
});
```

### Error 43: Checking property with wrong matcher
**Description:** Use toHaveProperty to check object properties.
```javascript
it("property", function() {
  const obj = { name: "test" };
  expect(obj.name).toEqual("test");
});
```

### Error 44: Testing private function indirectly
**Description:** Private functions should be tested through public API.
```javascript
// Private function not exported
function internalHelper() { return "internal"; }
// Test file tries to import it
```

### Error 45: Not cleaning up test data
**Description:** Test data persists between tests.
```javascript
describe("DB", function() {
  let db;
  beforeAll(function() { db = createDB(); });
  // no afterAll cleanup
});
```

### Error 46: Using global state in tests
**Description:** Tests that modify global state should restore it.
```javascript
it("modifies global", function() {
  window.x = 10;
  expect(window.x).toBe(10);
  // Must restore window.x
});
```

### Error 47: Test interdependence
**Description:** Tests should not depend on each other's execution order.
```javascript
describe("Suite", function() {
  let counter = 0;
  it("first", function() { counter++; expect(counter).toBe(1); });
  it("second", function() { counter++; expect(counter).toBe(2); });
});
```

### Error 48: Over-specifying implementation
**Description:** Testing internal implementation instead of behavior.
```javascript
it("uses array", function() {
  const result = process([1, 2, 3]);
  expect(result.someInternalMethod).toBeDefined();
});
```

### Error 49: Using only in production test
**Description:** Tests should not be tagged with only for production.
```javascript
// This should not be committed
describe("Suite", function() {
  fit("ONLY TEST", function() {});
});
```

### Error 50: toBeUndefined for null
**Description:** toBeUndefined checks for undefined, not null.
```javascript
it("null check", function() {
  const x = null;
  expect(x).toBeUndefined();
});
```

### Error 51: Missing jasmine module in Node
**Description:** Jasmine must be required in Node environments.
```javascript
// Missing: const jasmine = require("jasmine");
```

### Error 52: Wrong spec file naming
**Description:** Spec files should follow naming conventions.
```javascript
// Wrong: math-test.js
// Correct: math.spec.js
```

### Error 53: expect in beforeEach
**Description:** Put expectations in it blocks, not beforeEach.
```javascript
describe("Suite", function() {
  beforeEach(function() {
    expect(1).toBe(1);
  });
  it("test", function() {});
});
```

### Error 54: Not handling rejected promises
**Description:** Promise rejection in async test must be caught.
```javascript
it("async reject", function() {
  return Promise.reject("error").then(function(v) {
    expect(v).toBe("data");
  });
});
```

### Error 55: toHaveBeenCalledWith extra args
**Description:** toHaveBeenCalledWith fails if there are additional arguments.
```javascript
it("args", function() {
  const spy = jasmine.createSpy();
  spy("a");
  expect(spy).toHaveBeenCalledWith("a", "b");
});
```

### Error 56: Not using and.returnValue
**Description:** Setup spy return values with and.returnValue.
```javascript
it("spy return", function() {
  const spy = jasmine.createSpy();
  spy();
  expect(spy()).toBe(42);
});
```

### Error 57: Testing with real timers
**Description:** Real timers make tests slow and flaky.
```javascript
it("timeout", function() {
  setTimeout(function() {
    expect(true).toBe(true);
  }, 5000);
});
```

### Error 58: Wrong toThrowError for custom error
**Description:** toThrowError expects a specific error type.
```javascript
class CustomError extends Error {}
it("custom error", function() {
  expect(function() { throw new CustomError(); }).toThrowError(Error);
});
```

### Error 59: Passing string to toThrow
**Description:** toThrow expects no argument or Error type.
```javascript
it("throw string", function() {
  expect(function() { throw "error"; }).toThrow("error");
});
```

### Error 60: Forgetting to compile spec files
**Description:** Spec files need to be included in the test runner.
```javascript
// jasmine.json missing specs:
// "spec_files": ["**/*[sS]pec.js"]
```

### Error 61: Using toEqual for DOM elements
**Description:** DOM element comparison needs special matchers.
```javascript
it("dom", function() {
  const el = document.createElement("div");
  expect(el).toEqual(document.createElement("div"));
});
```

### Error 62: Not testing error messages
**Description:** Error message content should also be verified.
```javascript
it("error msg", function() {
  expect(function() { throw new Error("fail"); }).toThrowError(Error);
  // should check message too
});
```

### Error 63: Async done called multiple times
**Description:** done() should only be called once per test.
```javascript
it("async", function(done) {
  setTimeout(function() { done(); }, 100);
  setTimeout(function() { done(); }, 200); // second call
});
```

### Error 64: Not rethrowing in catch for fail
**Description:** fail() does not stop test execution.
```javascript
it("catch", function() {
  Promise.reject("error").catch(function(e) {
    fail(e);
    // test continues
  });
});
```

### Error 65: Testing with hardcoded dates
**Description:** Tests that fail on specific dates due to hardcoded values.
```javascript
it("current year", function() {
  expect(new Date().getFullYear()).toBe(2024);
});
```

### Error 66: Not creating spec helper
**Description:** Spec helpers for common setup are missing.
```javascript
// No spec helper file for shared mock setup
```

### Error 67: Using HTML report in Node
**Description:** Node Jasmine should use the console reporter.
```javascript
// Wrong reporter for Node env
jasmine.getEnv().addReporter(new jasmine.HtmlReporter());
```

### Error 68: Not resetting module state
**Description:** Module-level state persists across tests.
```javascript
// Module code:
let counter = 0;
export function increment() { return ++counter; }
```

### Error 69: Location of spec files
**Description:** Spec files should be in spec/ directory or alongside source.
```javascript
// Spec file in wrong location
```

### Error 70: Running all tests without filter
**Description:** Running entire suite when only one spec is needed.
```javascript
// Use --filter option to run specific tests
```

## Issue Snippets

### Issue 1: Testing implementation details
**Description:** Tests check internal state instead of behavior.
```javascript
it("adds item", function() {
  const list = new List();
  list.add("item");
  expect(list._items.length).toBe(1);
});
```

### Issue 2: No tests for negative cases
**Description:** Only positive test cases exist.
```javascript
it("divides positive", function() { expect(divide(10, 2)).toBe(5); });
// No divide by zero, negative numbers, fractions
```

### Issue 3: Excessively long test names
**Description:** Test names that are too long and descriptive.
```javascript
it("should correctly add two numbers when the first number is 2 and the second number is 3 and the result should be 5 and this is way too long", function() {});
```

### Issue 4: Hardcoded test data duplication
**Description:** Test data repeated across multiple tests.
```javascript
it("test1", function() { expect(add(2, 3)).toBe(5); });
it("test2", function() { expect(add(2, 3)).toBe(5); });
it("test3", function() { expect(add(2, 3)).toBe(5); });
```

### Issue 5: No describe nesting for organization
**Description:** All tests at the same level without grouping.
```javascript
it("adds numbers", function() {});
it("subtracts numbers", function() {});
it("multiplies numbers", function() {});
it("divides numbers", function() {});
```

### Issue 6: Testing too many things in one test
**Description:** Single test checks multiple unrelated behaviors.
```javascript
it("math operations", function() {
  expect(add(1, 2)).toBe(3);
  expect(subtract(5, 3)).toBe(2);
  expect(multiply(2, 3)).toBe(6);
});
```

### Issue 7: Not using describe for setup
**Description:** Common setup in each test instead of before blocks.
```javascript
it("test1", function() {
  const obj = new MyClass();
  expect(obj.method()).toBe("a");
});
it("test2", function() {
  const obj = new MyClass();
  expect(obj.method()).toBe("b");
});
```

### Issue 8: No test for edge input values
**Description:** Empty strings, null, undefined not tested.
```javascript
it("greets user", function() { expect(greet("Alice")).toBe("Hello, Alice!"); });
// Missing: greet(""), greet(null), greet()
```

### Issue 9: All tests pass but code is wrong
**Description:** Tests pass because they test wrong things.
```javascript
it("validates email", function() {
  expect(validateEmail("bad-email")).toBe(true); // bug: returns true for bad emails
});
```

### Issue 10: Using real network calls
**Description:** Tests make real HTTP requests.
```javascript
it("fetches users", function() {
  fetch("https://api.example.com/users").then(function(r) {
    expect(r.status).toBe(200);
  });
});
```

### Issue 11: No toHaveBeenCalledTimes checks
**Description:** Spies are not checked for call count.
```javascript
it("calls callback", function() {
  const cb = jasmine.createSpy();
  executeWithCallback(cb);
  expect(cb).toHaveBeenCalled();
  // Should check how many times
});
```

### Issue 12: Using magic numbers in tests
**Description:** Unexplained numeric values in expectations.
```javascript
it("calculates", function() {
  expect(calculate(42)).toBe(1337);
});
```

### Issue 13: Not resetting mocks between tests
**Description:** Mock state leaks between test cases.
```javascript
describe("Suite", function() {
  let mock;
  beforeAll(function() { mock = jasmine.createSpyObj("svc", ["call"]); });
  // Should use beforeEach, not beforeAll
});
```

### Issue 14: No test for loading states
**Description:** Async function loading/loading states not tested.
```javascript
// Tests only check success and error, not the loading state
```

### Issue 15: Fragile tests with toEqual for large objects
**Description:** Full object comparison breaks with any property addition.
```javascript
it("returns user", function() {
  expect(getUser(1)).toEqual({
    id: 1, name: "Alice", email: "alice@test.com",
    phone: "123", address: "123 St", city: "NYC",
    zip: "10001", country: "USA"
  });
});
```

### Issue 16: Slow tests with real timeouts
**Description:** Tests waiting on real setTimeout calls.
```javascript
it("delayed", function(done) {
  setTimeout(function() { done(); }, 3000);
});
```

### Issue 17: Not testing error paths
**Description:** Only success path has tests.
```javascript
it("fetches data", function() { /* success */ });
// No test for network error, timeout, 500 response
```

### Issue 18: Testing with actual database
**Description:** Tests connect to real database instead of mocking.
```javascript
it("saves user", function() {
  const db = new Database("prod-url");
  db.save(user);
  expect(db.find(user.id)).toBeDefined();
});
```

### Issue 19: No test comments for complex logic
**Description:** Complex test setup has no explanation.
```javascript
it("complex", function() {
  // Complex setup with no comments
  const a = x(y(z(transform(something))));
  expect(a).toBe("expected");
});
```

### Issue 20: Tests depend on test order
**Description:** Tests pass only when run in specific order.
```javascript
describe("Order", function() {
  let items = [];
  it("adds", function() { items.push("a"); expect(items.length).toBe(1); });
  it("clears", function() { items = []; expect(items.length).toBe(0); });
});
```

### Issue 21: Not skipping broken tests
**Description:** Broken tests left in suite failing CI.
```javascript
it("broken test", function() {
  expect(true).toBe(false);
});
```

### Issue 22: Testing console output
**Description:** Tests that rely on console.log output without spying.
```javascript
it("logs", function() {
  logMessage("hello");
  // Visual inspection needed
});
```

### Issue 23: No test for boundary conditions
**Description:** Min/max values not tested.
```javascript
it("validates age", function() { expect(validateAge(25)).toBe(true); });
// Missing: 0, -1, 150, Infinity
```

### Issue 24: Over-mocking
**Description:** Everything is mocked, testing nothing real.
```javascript
it("over mocked", function() {
  const mockA = jasmine.createSpyObj("a", ["get"]);
  const mockB = jasmine.createSpyObj("b", ["process"]);
  mockA.get.and.returnValue("x");
  mockB.process.and.returnValue("y");
  expect(compose(mockA, mockB)).toBe("y");
});
```

### Issue 25: Not testing async error handling
**Description:** Async errors are not caught in tests.
```javascript
it("async", function() {
  asyncFunction().then(function(r) {
    expect(r).toBe("data");
    // No .catch handler
  });
});
```

### Issue 26: Expecting exact error message
**Description:** Error message tests are too brittle.
```javascript
it("error", function() {
  expect(function() { parse("bad"); }).toThrowError("Unexpected token b in JSON at position 0");
});
```

### Issue 27: No data-driven tests
**Description:** Multiple similar tests with different inputs not parameterized.
```javascript
it("add 1+1", function() { expect(add(1, 1)).toBe(2); });
it("add 2+2", function() { expect(add(2, 2)).toBe(4); });
it("add 3+3", function() { expect(add(3, 3)).toBe(6); });
```

### Issue 28: Not isolating DOM tests
**Description:** DOM tests leave behind elements.
```javascript
it("creates div", function() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  expect(document.body.children.length).toBe(1);
  // No cleanup
});
```

### Issue 29: Tests with side effects
**Description:** Tests that modify global state.
```javascript
it("changes theme", function() {
  document.body.className = "dark";
  expect(document.body.className).toBe("dark");
});
```

### Issue 30: Duplicate test logic
**Description:** Repeated test patterns not extracted into helpers.
```javascript
it("a", function() { const x = createComplexSetup(); expect(x.a).toBe(1); });
it("b", function() { const x = createComplexSetup(); expect(x.b).toBe(2); });
```

## Modify Snippets

### Modify 1: Create a describe block for Calculator
**Description:** Wrap the following tests in a describe("Calculator") block.
```javascript
it("adds numbers", function() { expect(add(1, 2)).toBe(3); });
it("subtracts numbers", function() { expect(subtract(5, 3)).toBe(2); });
```

### Modify 2: Add a test for divide by zero
**Description:** Write a test that expects divide(5, 0) to throw an error.
```javascript
// Test for divide by zero
```

### Modify 3: Convert to async test with done
**Description:** Use done callback for an async setTimeout test.
```javascript
it("async delay", function() {
  setTimeout(function() {
    expect(true).toBe(true);
  }, 100);
});
```

### Modify 4: Add spy on console.log
**Description:** Spy on console.log and verify it was called.
```javascript
it("logs message", function() {
  logger("hello");
  // Add spy and assertion
});
```

### Modify 5: Test array contains value
**Description:** Use toContain matcher to check array has "apple".
```javascript
it("has apple", function() {
  const fruits = ["banana", "apple", "orange"];
  // Add expectation
});
```

### Modify 6: Add beforeEach for common setup
**Description:** Create a beforeEach that initializes a counter to 0.
```javascript
describe("Counter", function() {
  // Add beforeEach
  it("starts at 0", function() { expect(counter).toBe(0); });
});
```

### Modify 7: Create spy object for API service
**Description:** Use jasmine.createSpyObj to mock an API service with fetch method.
```javascript
it("uses API service", function() {
  // Create spy object for ApiService with fetch method
});
```

### Modify 8: Test that function throws
**Description:** Write a test that calling parseJSON("invalid") throws.
```javascript
it("throws for invalid JSON", function() {
  // Use toThrowError matcher
});
```

### Modify 9: Add toHaveBeenCalledWith check
**Description:** Verify that sendMessage was called with "Hello".
```javascript
it("sends message", function() {
  const sendMessage = jasmine.createSpy();
  execute(sendMessage);
  // Check it was called with "Hello"
});
```

### Modify 10: Test object equality
**Description:** Test that getUser(1) returns { id: 1, name: "Alice" }.
```javascript
it("returns user object", function() {
  // Use toEqual matcher
});
```

### Modify 11: Add negative test case
**Description:** Test that subtract(2, 5) returns a negative number.
```javascript
it("returns negative for larger subtrahend", function() {
  // Test subtract(2, 5)
});
```

### Modify 12: Use toBeCloseTo for float
**Description:** Test that 0.1 + 0.2 is close to 0.3.
```javascript
it("float addition", function() {
  // Use toBeCloseTo
});
```

### Modify 13: Create a nested describe
**Description:** Add a nested describe("#add") around the add tests.
```javascript
describe("Calculator", function() {
  // Add nested describe for #add
  it("adds two numbers", function() {});
});
```

### Modify 14: Add afterEach cleanup
**Description:** Add afterEach that resets a shared array.
```javascript
describe("List", function() {
  let items = [];
  // Add afterEach to clear items
});
```

### Modify 15: Test with toMatch
**Description:** Test that string "Hello World" matches /World/.
```javascript
it("contains World", function() {
  // Use toMatch with regex
});
```

### Modify 16: Test array length after push
**Description:** Create an empty array, push "a", and check length is 1.
```javascript
it("push increases length", function() {
  // Create array, push, check length
});
```

### Modify 17: Verify spy call count
**Description:** Create a spy, call it 3 times, verify with toHaveBeenCalledTimes.
```javascript
it("called three times", function() {
  const spy = jasmine.createSpy();
  // Call spy 3 times and verify
});
```

### Modify 18: Test with toBeUndefined
**Description:** Test that accessing a non-existent property returns undefined.
```javascript
it("undefined property", function() {
  const obj = {};
  // Check obj.nonExistent is undefined
});
```

### Modify 19: Test with toBeNull
**Description:** Test that findUser("nonexistent") returns null.
```javascript
it("returns null for missing user", function() {
  // Use toBeNull matcher
});
```

### Modify 20: Add async test with fetch
**Description:** Write an async test that mocks fetch and returns data.
```javascript
it("fetches data", function() {
  // Use spy on window.fetch and test
});
```

### Modify 21: Test string startsWith
**Description:** Test that "JavaScript" starts with "Java".
```javascript
it("starts with Java", function() {
  // Use toMatch with ^Java
});
```

### Modify 22: Add custom matcher usage
**Description:** Use a custom matcher (if available) or jasmine matcher.
```javascript
it("custom matcher", function() {
  // Use jasmine.objectContaining
});
```

### Modify 23: Test number range
**Description:** Test that random number is between 0 and 1.
```javascript
it("random in range", function() {
  const r = Math.random();
  // Check it's >= 0 and < 1
});
```

### Modify 24: Test property existence
**Description:** Use toHaveProperty to check object has "name" key.
```javascript
it("has name property", function() {
  const user = { name: "Alice" };
  // Use toHaveProperty
});
```

### Modify 25: Create data-driven test loop
**Description:** Test add function with multiple inputs using a loop.
```javascript
it("adds various numbers", function() {
  const cases = [[1, 1, 2], [2, 3, 5], [10, 20, 30]];
  // Loop and test each case
});
```

### Modify 26: Return promise from async test
**Description:** Fix the async test to return the promise.
```javascript
it("async without return", function() {
  fetch("/api").then(function(r) { expect(r.status).toBe(200); });
});
```

### Modify 27: Test error message content
**Description:** Test that error message contains "Invalid".
```javascript
it("error has message", function() {
  // Check error message includes "Invalid"
});
```

### Modify 28: Add falsy test
**Description:** Test that empty string, 0, null, undefined are falsy.
```javascript
it("falsy values", function() {
  // Use toBeFalsy for different values
});
```

### Modify 29: Test with jasmine.any
**Description:** Use jasmine.any(Number) to check type.
```javascript
it("returns number", function() {
  const result = getCount();
  // Use jasmine.any(Number)
});
```

### Modify 30: Create a pending test
**Description:** Create an intentionally pending test with pending().
```javascript
it("feature not implemented", function() {
  // Mark as pending
});
```

### Modify 31: Test object key count
**Description:** Test that an object has exactly 3 keys.
```javascript
it("three keys", function() {
  const obj = { a: 1, b: 2, c: 3 };
  // Check Object.keys length
});
```

### Modify 32: Spy on object method
**Description:** Create an object with a method and spy on it.
```javascript
it("spy on method", function() {
  const obj = { greet() { return "hi"; } };
  // Spy on greet
});
```

### Modify 33: Test with toBeNaN
**Description:** Test that parseInt("abc") returns NaN.
```javascript
it("parseInt non-numeric", function() {
  // Use toBeNaN matcher
});
```

### Modify 34: Add setup with beforeAll
**Description:** Use beforeAll to set up a configuration object once.
```javascript
describe("Config", function() {
  // Use beforeAll for shared setup
});
```

### Modify 35: Test callback is called
**Description:** Create a function that calls a callback, test the callback was called.
```javascript
it("calls callback", function() {
  // Create spy, pass to function, verify called
});
```

### Modify 36: Test modulo operation
**Description:** Test that 10 % 3 equals 1.
```javascript
it("modulo", function() {
  // Test 10 % 3 === 1
});
```

### Modify 37: Create test for string reverse
**Description:** Write a test for a reverse function.
```javascript
it("reverses string", function() {
  // Test reverse("hello") === "olleh"
});
```

### Modify 38: Test boolean toggling
**Description:** Test that !true is false.
```javascript
it("not operator", function() {
  // Test boolean negation
});
```

### Modify 39: Test array destructuring
**Description:** Test that destructuring [a, b] = [1, 2] works.
```javascript
it("array destructuring", function() {
  // Test destructured values
});
```

### Modify 40: Test object spread
**Description:** Test that object spread copies properties.
```javascript
it("object spread", function() {
  // Test spread operator
});
```

### Modify 41: Test typeof operator
**Description:** Test that typeof "hello" is "string".
```javascript
it("typeof string", function() {
  // Use typeof
});
```

### Modify 42: Test instanceof check
**Description:** Test that new Array() instanceof Array.
```javascript
it("instanceof Array", function() {
  // Use instanceof
});
```

### Modify 43: Test default parameters
**Description:** Test function with default parameters.
```javascript
it("default params", function() {
  // Test greet(name = "World")
});
```

### Modify 44: Test rest parameters
**Description:** Test a sum function using rest parameters.
```javascript
it("rest params sum", function() {
  // Test sum(1, 2, 3) === 6
});
```

### Modify 45: Test template literals
**Description:** Test template literal interpolation.
```javascript
it("template literal", function() {
  const name = "World";
  // Test `Hello, ${name}!`
});
```

### Modify 46: Add test for edge case empty array
**Description:** Test that sum([]) returns 0.
```javascript
it("empty array sum", function() {
  // Test sum of empty array
});
```

### Modify 47: Use jasmine.clock for time test
**Description:** Use jasmine.clock() to test setTimeout.
```javascript
it("timeout with mock clock", function() {
  // Install clock, set timeout, tick, verify
});
```

### Modify 48: Test array filter
**Description:** Test that [1,2,3,4].filter(isEven) returns [2,4].
```javascript
it("filter evens", function() {
  // Test array filter
});
```

### Modify 49: Test array map
**Description:** Test that [1,2,3].map(x => x * 2) returns [2,4,6].
```javascript
it("map double", function() {
  // Test array map
});
```

### Modify 50: Test array reduce
**Description:** Test that [1,2,3,4,5].reduce(add) returns 15.
```javascript
it("reduce sum", function() {
  // Test array reduce
});
```
