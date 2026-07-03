# Chapter 4 — Mocking in Jest

## Why Mock

Eliminate external dependencies:

- Network requests (fetch, axios)
- Databases
- File system
- Timers (setTimeout, setInterval)
- Randomness (Math.random, Date.now)

## jest.fn()

Create a mock function:

```javascript
const mockCallback = jest.fn();

mockCallback("arg1", "arg2");
mockCallback("arg3");

expect(mockCallback).toHaveBeenCalled();
expect(mockCallback).toHaveBeenCalledTimes(2);
expect(mockCallback).toHaveBeenCalledWith("arg1", "arg2");
expect(mockCallback).toHaveBeenLastCalledWith("arg3");
```

Return values:

```javascript
const mockFn = jest.fn()
  .mockReturnValue(42)
  .mockReturnValueOnce(100)
  .mockReturnValueOnce(200);

console.log(mockFn()); // 100  (once)
console.log(mockFn()); // 200  (once)
console.log(mockFn()); // 42   (default)
```

Implementation:

```javascript
const mockFilter = jest.fn((items, predicate) => {
  return items.filter(predicate);
});

expect(mockFilter([1, 2, 3, 4], (n) => n > 2)).toEqual([3, 4]);
```

## jest.spyOn()

Spy on existing methods:

```javascript
const math = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

const addSpy = jest.spyOn(math, "add");

const result = math.add(2, 3);

expect(addSpy).toHaveBeenCalledWith(2, 3);
expect(result).toBe(5);

addSpy.mockRestore(); // restore original
```

Spy on console:

```javascript
test("logs a warning", () => {
  const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

  myFunction();

  expect(warnSpy).toHaveBeenCalledWith("Warning: something went wrong");

  warnSpy.mockRestore();
});
```

## jest.mock()

Mock entire modules:

```javascript
jest.mock("../services/api");

const { fetchData } = require("../services/api");
fetchData.mockResolvedValue({ id: 1, name: "Alice" });

test("uses mocked fetchData", async () => {
  const data = await fetchData("/users/1");
  expect(data.name).toBe("Alice");
});
```

Manual mock directory (`__mocks__/`):

```javascript
// __mocks__/fs.js
const fs = jest.createMockFromModule("fs");

const mockFiles = {};

fs.readFileSync = jest.fn((path) => mockFiles[path]);
fs.writeFileSync = jest.fn((path, content) => {
  mockFiles[path] = content;
});

module.exports = fs;
```

## Timers

```javascript
jest.useFakeTimers();

test("setTimeout callback fires after 1 second", () => {
  const callback = jest.fn();

  setTimeout(callback, 1000);

  expect(callback).not.toHaveBeenCalled();

  jest.advanceTimersByTime(1000);

  expect(callback).toHaveBeenCalledTimes(1);
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| When would you use `jest.fn()` vs `jest.spyOn()`? | `jest.fn()` creates a new mock; `jest.spyOn()` wraps an existing method |
| What does `mockRestore()` do? | Restores the original implementation of a spied method |
| How do you mock a module that returns a Promise? | `mockResolvedValue()` or `mockResolvedValueOnce()` |
| Why use fake timers? | To test time-dependent code without waiting in real time |
| What is the `__mocks__` directory? | A directory where Jest looks for manual module mocks |
## Next Steps

[Back to Chapter 3](03-jest-foundation.md): Chapter 3 — Jest: The Foundation
[Proceed to Chapter 5](05-vitest.md): Chapter 5 — Vitest to learn about chapter 5 — vitest.
