# Chapter 3 — Jest: The Foundation

<img src="https://media.giphy.com/media/UcK7JalnjCz0k/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Setup

```bash
npm install --save-dev jest
```

In `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

With a config file (`jest.config.js` or `jest.config.mjs`):

```javascript
export default {
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.js", "**/*.test.js"],
  collectCoverageFrom: ["src/**/*.js", "!src/index.js"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

## describe, it, expect

```javascript
const { sum, multiply } = require("./math");

describe("math utilities", () => {
  describe("sum", () => {
    it("adds two positive numbers", () => {
      expect(sum(1, 2)).toBe(3);
    });

    it("adds a positive and a negative number", () => {
      expect(sum(5, -3)).toBe(2);
    });
  });

  describe("multiply", () => {
    it("multiplies two numbers", () => {
      expect(multiply(3, 4)).toBe(12);
    });

    it("returns zero when multiplying by zero", () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });
});
```

## Matchers

```javascript
// Exact equality
expect(value).toBe(42);
expect(value).not.toBe(0);

// Object/array equality (recursive)
expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
expect([1, 2, 3]).toEqual([1, 2, 3]);

// Partial matching
expect({ name: "Alice", age: 30 }).toMatchObject({ name: "Alice" });

// Truthiness
expect(true).toBeTruthy();
expect(0).toBeFalsy();
expect(null).toBeNull();
expect(undefined).toBeUndefined();
expect(1).toBeDefined();

// Numbers
expect(2.5).toBeGreaterThan(2);
expect(2.5).toBeGreaterThanOrEqual(2.5);
expect(2.5).toBeLessThan(3);
expect(0.1 + 0.2).toBeCloseTo(0.3);

// Strings
expect("Hello World").toMatch(/World/);
expect("Hello World").toContain("World");

// Arrays and iterables
expect([1, 2, 3]).toContain(2);
expect([1, 2, 3]).toHaveLength(3);

// Exceptions
expect(() => JSON.parse("invalid")).toThrow();
expect(() => JSON.parse("invalid")).toThrow(SyntaxError);
expect(() => {
  throw new Error("custom message");
}).toThrow("custom message");
```

## Custom Matchers

```javascript
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
      pass: false,
    };
  },
});

test("numeric ranges", () => {
  expect(100).toBeWithinRange(90, 110);
});
```

## Setup and Teardown

```javascript
let database;

beforeAll(async () => {
  database = await createDatabase();
});

afterAll(async () => {
  await database.close();
});

beforeEach(() => {
  database.clear();
});

afterEach(() => {});

test("inserts a record", () => {
  database.insert({ id: 1, name: "Alice" });
  expect(database.count()).toBe(1);
});

test("clears between tests", () => {
  expect(database.count()).toBe(0);
});
```

## Grouping with describe

```javascript
describe("Database operations", () => {
  let db;

  beforeAll(() => {
    db = new Database();
  });

  describe("insert", () => {
    beforeEach(() => {
      db.clear();
    });

    it("adds a record", () => {
      db.insert({ id: 1 });
      expect(db.count()).toBe(1);
    });
  });

  describe("find", () => {});
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What does `expect(0.1 + 0.2).toBe(0.3)` return? | Fails due to floating point precision |
| What matcher avoids floating point issues? | `toBeCloseTo` |
| When does `beforeEach` run? | Before each `it`/`test` block within the same `describe` scope |
| Can you have nested `describe` scopes? | Yes, hooks apply hierarchically |
| What is the difference between `toBe` and `toEqual`? | `toBe` uses `Object.is` (reference), `toEqual` does deep equality |
## Next Steps

[Back to Chapter 2](02-testing-pyramid.md): Chapter 2 — Types of Tests
[Proceed to Chapter 4](04-jest-mocking.md): Chapter 4 — Mocking in Jest to learn about chapter 4 — mocking in jest.
