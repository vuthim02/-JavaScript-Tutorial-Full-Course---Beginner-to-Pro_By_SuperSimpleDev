# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

# Part 17 — Testing, Quality Assurance, and CI/CD

## (Reverse Engineering Coding Tactical Edition)

---

# Mission

Most developers learn to write code.

Senior engineers learn to write code that does not break.

Testing is not a chore. It is a design tool. A safety net. A form of documentation that never goes out of date. It forces you to write modular, testable code from the start.

Without testing:

```
Write code → Push to production → Pray → Find bug → Fix → Repeat
```

With testing:

```
Write code → Write test → Test passes → Push → Confident
```

This part covers:

* Why testing is the most important investment you can make
* Unit, integration, end-to-end, snapshot, and visual regression testing
* Jest — the dominant testing framework
* Vitest — the modern, fast alternative
* DOM testing with jsdom and Testing Library
* E2E testing with Playwright
* Test-Driven Development (TDD)
* Code quality automation: ESLint, Prettier, Husky, lint-staged
* CI/CD pipelines with GitHub Actions
* Coverage thresholds, mocking strategies, and real-world patterns

---

# Overall Architecture

```text
Testing Pyramid
                    ┌───────┐
                    │ E2E   │  ← few, slow, expensive
                   ┌┴───────┴┐
                   │Integration│ ← some, medium
                  ┌┴─────────┴┐
                  │  Unit     │  ← many, fast, cheap
                  └───────────┘

CI/CD Pipeline
Source Code → Lint → Type Check → Unit Tests → Integration Tests → E2E → Deploy
```

---

# Chapter 1 — Why Testing Matters

## The Cost of Bugs

The later a bug is found, the more it costs:

| Phase Found | Relative Cost |
|-------------|---------------|
| Development | 1x |
| Code Review | 5x |
| QA / Staging | 15x |
| Production | 50x-100x |

A typo in a pricing calculation caught in production can cost millions.

---

## Regression Prevention

Every new feature risks breaking existing behavior.

Tests catch regressions instantly:

```javascript
// After refactoring a function
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// The test tells you if it still works
test("calculateTotal returns correct sum", () => {
  expect(calculateTotal([{ price: 10, quantity: 2 }])).toBe(20);
});
```

---

## Tests as Documentation

A test is executable documentation:

```javascript
test("discount is applied when coupon code is valid", () => {
  const result = applyCoupon(100, "SAVE20");
  expect(result).toBe(80);
});
```

Anyone reading this test knows exactly what `applyCoupon` does. The test cannot go out of date — if the code changes, the test breaks.

---

## Design Pressure

Untestable code is usually poorly designed. Testing forces:

* Dependency injection instead of hardcoded globals
* Pure functions with explicit inputs and outputs
* Loose coupling between modules
* Single Responsibility Principle

```javascript
// Hard to test — database call inside function
function getUserName(userId) {
  const user = db.query(`SELECT name FROM users WHERE id = ${userId}`);
  return user.name;
}

// Easy to test — database dependency injected
function getUserName(userId, db) {
  const user = db.query(`SELECT name FROM users WHERE id = ${userId}`);
  return user.name;
}
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why do bugs cost more in production? | Users are impacted, data may be corrupted, hotfixes must go through deployment |
| How does testing drive better design? | Forces dependency injection, pure functions, loose coupling |
| Can tests replace documentation? | No, but they supplement it with executable, always-accurate specs |
| What is regression? | A previously working feature breaking after a change |

---

# Chapter 2 — Types of Tests

## Unit Tests

Test a single unit (function, module, class) in isolation.

```javascript
// Pure function — easy unit test
function add(a, b) {
  return a + b;
}

test("add returns the sum of two numbers", () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
});
```

Characteristics:

* Fast (milliseconds)
* No external dependencies (no database, no network)
* High confidence in individual pieces
* Thousands of tests run in seconds

---

## Integration Tests

Test how multiple units work together.

```javascript
// Integration: controller + service + database
test("POST /users creates a user in the database", async () => {
  const response = await request(app)
    .post("/users")
    .send({ name: "Alice", email: "alice@example.com" });

  expect(response.status).toBe(201);

  const user = await db.query("SELECT * FROM users WHERE email = $1", ["alice@example.com"]);
  expect(user.rows[0].name).toBe("Alice");
});
```

Characteristics:

* Slower than unit tests
* Exercise real interactions between components
* Catch contract mismatches between layers
* Use real or in-memory databases

---

## End-to-End (E2E) Tests

Test the entire system from the user's perspective.

```javascript
// Playwright — real browser test
test("user can sign up and see dashboard", async ({ page }) => {
  await page.goto("https://example.com/signup");
  await page.fill("#name", "Alice");
  await page.fill("#email", "alice@example.com");
  await page.fill("#password", "secure123");
  await page.click("button[type='submit']");
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.locator("h1")).toHaveText("Welcome, Alice");
});
```

Characteristics:

* Slowest (seconds to minutes per test)
* Simulate real user interactions
* Test the full stack: frontend → API → database
* Few in number, high in value

---

## Snapshot Tests

Capture the output of a component to detect unexpected changes.

```javascript
test("Button component matches snapshot", () => {
  const { container } = render(<Button label="Click me" variant="primary" />);
  expect(container).toMatchSnapshot();
});
```

When the component changes intentionally, update the snapshot:

```bash
npm test -- --updateSnapshot
```

---

## Visual Regression Tests

Compare screenshots pixel-by-pixel to catch visual bugs.

```javascript
// Playwright visual comparison
test("homepage matches visual baseline", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveScreenshot("homepage.png", {
    maxDiffPixels: 100,
  });
});
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the difference between unit and integration tests? | Unit tests isolate a single unit; integration tests verify cooperation between units |
| Why not only write E2E tests? | E2E tests are slow, flaky, and expensive to maintain. The pyramid prioritizes fast, reliable unit tests |
| When would you update a snapshot? | When the UI change is intentional and verified visually |
| What is a visual regression? | A pixel-level difference in rendered output, not caught by DOM assertion |

---

# Chapter 3 — Jest: The Foundation

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

---

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

---

## Matchers

Jest provides a rich set of matchers:

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
expect(0.1 + 0.2).toBeCloseTo(0.3); // avoid floating point issues

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

---

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

---

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

afterEach(() => {
  // clean up side effects
});

test("inserts a record", () => {
  database.insert({ id: 1, name: "Alice" });
  expect(database.count()).toBe(1);
});

test("clears between tests", () => {
  expect(database.count()).toBe(0); // because beforeEach clears
});
```

---

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

  describe("find", () => {
    // scoped hooks
  });
});
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What does `expect(0.1 + 0.2).toBe(0.3)` return? | Fails due to floating point precision |
| What matcher avoids floating point issues? | `toBeCloseTo` |
| When does `beforeEach` run? | Before each `it`/`test` block within the same `describe` scope |
| Can you have nested `describe` scopes? | Yes, hooks apply hierarchically |
| What is the difference between `toBe` and `toEqual`? | `toBe` uses `Object.is` (reference), `toEqual` does deep equality |

---

# Chapter 4 — Mocking in Jest

## Why Mock

Eliminate external dependencies:

* Network requests (fetch, axios)
* Databases
* File system
* Timers (setTimeout, setInterval)
* Randomness (Math.random, Date.now)

---

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

---

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

---

## jest.mock()

Mock entire modules:

```javascript
// __mocks__/fetchData.js (or inline)
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

---

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

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| When would you use `jest.fn()` vs `jest.spyOn()`? | `jest.fn()` creates a new mock; `jest.spyOn()` wraps an existing method |
| What does `mockRestore()` do? | Restores the original implementation of a spied method |
| How do you mock a module that returns a Promise? | `mockResolvedValue()` or `mockResolvedValueOnce()` |
| Why use fake timers? | To test time-dependent code without waiting in real time |
| What is the `__mocks__` directory? | A directory where Jest looks for manual module mocks |

---

# Chapter 5 — Vitest

## Why Vitest

Vitest is the modern alternative to Jest with:

* Native Vite integration (uses Vite transform pipeline)
* Significantly faster (esbuild under the hood)
* Compatible API with Jest (same `describe`, `it`, `expect`)
* Built-in TypeScript support
* ESM-first
* HMR for tests (re-run changed tests instantly)

---

## Setup

```bash
npm install --save-dev vitest
```

`vitest.config.js`:

```javascript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.js"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
});
```

`package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

---

## Writing Tests

Same API as Jest:

```javascript
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("math", () => {
  it("adds numbers", () => {
    expect(1 + 1).toBe(2);
  });
});

// Mocking
const mockFn = vi.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();

// Spying
const spy = vi.spyOn(console, "log");
```

---

## Performance

| Aspect | Jest | Vitest |
|--------|------|--------|
| Transform | Babel | esbuild |
| Cold start | ~2-5s | ~200ms |
| HMR | No | Yes |
| ESM | Experimental | Native |
| TypeScript | Needs config | Built-in |

---

## Running Vitest

```bash
# Watch mode (default for development)
vitest

# Run once (CI)
vitest run

# With coverage
vitest run --coverage

# Specific test file
vitest run src/math.test.js

# UI mode
vitest --ui
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is Vitest a drop-in replacement for Jest? | Almost. The API is identical but some Jest-specific features differ |
| Why is Vitest faster than Jest? | Uses esbuild for transforms, native ESM, and HMR |
| Do you need Babel with Vitest? | No. esbuild handles transforms natively |
| How do you mock in Vitest? | Use `vi.fn()`, `vi.spyOn()`, `vi.mock()` (same pattern as Jest) |

---

# Chapter 6 — Testing Asynchronous Code

## Callbacks

```javascript
// Function with callback
function fetchData(callback) {
  setTimeout(() => {
    callback(null, { id: 1, name: "Alice" });
  }, 100);
}

// Test with callback — use `done`
test("fetches data via callback", (done) => {
  fetchData((error, data) => {
    expect(error).toBeNull();
    expect(data.name).toBe("Alice");
    done(); // tell Jest the test is complete
  });
});
```

If `done` is never called, Jest times out (default 5000ms).

---

## Promises

Return the promise:

```javascript
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, name: "Alice" }), 100);
  });
}

test("fetches data via promise", () => {
  return fetchData().then((data) => {
    expect(data.name).toBe("Alice");
  });
});
```

Using `.resolves`:

```javascript
test("fetches data via promise (resolves syntax)", () => {
  return expect(fetchData()).resolves.toEqual({ id: 1, name: "Alice" });
});
```

Rejected promises:

```javascript
function failRequest() {
  return Promise.reject(new Error("Network error"));
}

test("handles rejection", () => {
  return expect(failRequest()).rejects.toThrow("Network error");
});
```

---

## async / await

```javascript
test("fetches data with async/await", async () => {
  const data = await fetchData();
  expect(data.name).toBe("Alice");
});

test("handles async rejection", async () => {
  await expect(failRequest()).rejects.toThrow("Network error");
});
```

No need to return the promise. `async` functions implicitly return a promise Jest waits for.

---

## Real-World Example: API Client

```javascript
// api.js
export async function getUser(id) {
  const response = await fetch(`https://api.example.com/users/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

// api.test.js
import { describe, it, expect, vi } from "vitest";

global.fetch = vi.fn();

describe("getUser", () => {
  it("returns user data on success", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, name: "Alice" }),
    });

    const user = await getUser(1);
    expect(user.name).toBe("Alice");
    expect(fetch).toHaveBeenCalledWith("https://api.example.com/users/1");
  });

  it("throws on HTTP error", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getUser(999)).rejects.toThrow("HTTP 404");
  });
});
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What happens if `done` is never called in a callback test? | Jest times out after 5000ms |
| Do you need to `return` promises in tests? | Yes, unless you use `async/await` |
| What does `.resolves` do? | Unwraps a fulfilled promise for assertion |
| Can you chain `.resolves` with other matchers? | Yes: `expect(promise).resolves.toEqual(value)` |

---

# Chapter 7 — DOM Testing

## jsdom

Simulate a browser environment in Node.js:

```bash
npm install --save-dev jest-environment-jsdom
```

In Jest config:

```javascript
export default {
  testEnvironment: "jsdom",
};
```

In Vitest config:

```javascript
export default defineConfig({
  test: {
    environment: "jsdom",
  },
});
```

Example:

```javascript
test("creates a DOM element", () => {
  document.body.innerHTML = "<div id='root'></div>";
  const root = document.getElementById("root");
  root.innerHTML = "<h1>Hello</h1>";
  expect(root.querySelector("h1").textContent).toBe("Hello");
});
```

---

## @testing-library/dom

```bash
npm install --save-dev @testing-library/dom
```

```javascript
import { screen, getByText, fireEvent } from "@testing-library/dom";

test("button click updates text", () => {
  document.body.innerHTML = `
    <button id="clickme">Click me</button>
    <p id="message">Original</p>
  `;

  const button = screen.getByText("Click me");
  fireEvent.click(button);

  const message = document.getElementById("message");
  message.textContent = "Updated";
  expect(message.textContent).toBe("Updated");
});
```

---

## @testing-library/react

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

React component:

```jsx
// Greeting.jsx
export function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

Test:

```jsx
// Greeting.test.jsx
import { render, screen } from "@testing-library/react";
import { Greeting } from "./Greeting";

test("renders greeting with name", () => {
  render(<Greeting name="Alice" />);
  expect(screen.getByText("Hello, Alice!")).toBeInTheDocument();
});
```

---

## @testing-library/jest-dom

Extends `expect` with DOM-specific matchers:

```javascript
import "@testing-library/jest-dom";

test("extended DOM matchers", () => {
  render(<MyComponent />);

  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("Submit")).toBeVisible();
  expect(screen.getByLabelText("Email")).toBeEnabled();
  expect(screen.getByTestId("loader")).toHaveClass("spinner");
  expect(screen.getByRole("alert")).toHaveTextContent("Error");
});
```

---

## User Events

Prefer `@testing-library/user-event` over `fireEvent` for realistic interactions:

```javascript
import userEvent from "@testing-library/user-event";

test("user can type into input", async () => {
  const user = userEvent.setup();

  render(<SearchInput />);

  const input = screen.getByRole("textbox");
  await user.type(input, "JavaScript");

  expect(input).toHaveValue("JavaScript");
});
```

---

## Testing Asynchronous DOM Updates

```javascript
// Component that loads data
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then(setUser);
  }, [userId]);

  if (!user) return <div>Loading...</div>;
  return <h1>{user.name}</h1>;
}

// Test
test("displays user name after loading", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ name: "Alice" }),
  });

  render(<UserProfile userId={1} />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  const name = await screen.findByText("Alice");
  expect(name).toBeInTheDocument();
});
```

Use `findBy*` (returns a promise that waits) instead of `getBy*` (throws immediately) when elements appear asynchronously.

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What does jsdom provide? | A browser-like environment in Node.js (document, window, etc.) |
| Why prefer `@testing-library/user-event` over `fireEvent`? | It simulates realistic user interactions (clicks, typing) |
| What is the difference between `getByText` and `findByText`? | `getByText` throws if not found immediately; `findByText` waits up to a timeout |
| What does `toBeInTheDocument()` check? | Whether the element exists in the DOM |
| Why is `@testing-library/jest-dom` useful? | Adds DOM-specific matchers like `toBeVisible`, `toHaveClass`, `toBeDisabled` |

---

# Chapter 8 — E2E Testing with Playwright

## Setup

```bash
npm install --save-dev @playwright/test
npx playwright install
```

`playwright.config.js`:

```javascript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Writing Tests

```javascript
// e2e/login.spec.js
import { test, expect } from "@playwright/test";

test("user can log in", async ({ page }) => {
  await page.goto("/login");

  await page.fill("#email", "alice@example.com");
  await page.fill("#password", "secure123");
  await page.click("button[type='submit']");

  await expect(page).toHaveURL("/dashboard");
  await expect(page.locator("h1")).toHaveText("Welcome, Alice");
});
```

---

## Locators

```javascript
// Playwright locators — auto-waiting and resilient
await page.getByRole("button", { name: "Submit" }).click();
await page.getByLabel("Email").fill("alice@example.com");
await page.getByPlaceholder("Enter your name").fill("Alice");
await page.getByTestId("user-profile").isVisible();
await page.getByText("Welcome back").isVisible();
await page.locator("nav a").first().click();
```

---

## Assertions

```javascript
await expect(page).toHaveTitle("My App");
await expect(page).toHaveURL("/dashboard");
await expect(page.locator(".error")).toHaveText("Invalid credentials");
await expect(page.locator("button")).toBeEnabled();
await expect(page.locator("img")).toHaveAttribute("src", "/logo.png");
await expect(page.locator("ul li")).toHaveCount(5);
```

---

## Fixtures

```javascript
// fixtures.js
import { test as base, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  authenticatedPage: async ({ page }, use) => {
    await page.goto("/login");
    await page.fill("#email", "alice@example.com");
    await page.fill("#password", "secure123");
    await page.click("button[type='submit']");
    await use(page);
  },
});

export { expect };

// usage
test("can access profile page", async ({ authenticatedPage, page }) => {
  await page.goto("/profile");
  await expect(page.locator("h1")).toHaveText("Alice's Profile");
});
```

---

## Page Object Model

```javascript
// pages/LoginPage.js
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.submitButton = page.getByRole("button", { name: "Sign in" });
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

// test
test("login via page object", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("alice@example.com", "secure123");
  await expect(page).toHaveURL("/dashboard");
});
```

---

## Running Playwright

```bash
# All tests, all browsers
npx playwright test

# Specific browser
npx playwright test --project=chromium

# UI mode (interactive)
npx playwright test --ui

# Debug mode
npx playwright test --debug

# Show report
npx playwright show-report
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the advantage of Playwright over jsdom? | Playwright runs in a real browser, testing actual rendering and behavior |
| What does auto-waiting mean? | Playwright waits for elements to be actionable before interacting |
| Why use the Page Object Model? | Encapsulates page logic, reduces duplication in tests |
| What are fixtures in Playwright? | Reusable setup/state shared across tests (like `beforeEach` but more powerful) |
| How do you run Playwright in CI? | Use `npx playwright test --ci` with `retries: 2` and `workers: 1` |

---

# Chapter 9 — Test-Driven Development (TDD)

## The Red-Green-Refactor Cycle

```text
1. RED   → Write a failing test
2. GREEN → Write the minimum code to pass
3. REFACTOR → Clean up without changing behavior
```

---

## Example: FizzBuzz

Step 1 — Write the failing test (RED):

```javascript
describe("fizzbuzz", () => {
  it("returns 'Fizz' for multiples of 3", () => {
    expect(fizzbuzz(3)).toBe("Fizz");
    expect(fizzbuzz(6)).toBe("Fizz");
  });

  it("returns 'Buzz' for multiples of 5", () => {
    expect(fizzbuzz(5)).toBe("Buzz");
    expect(fizzbuzz(10)).toBe("Buzz");
  });

  it("returns 'FizzBuzz' for multiples of 3 and 5", () => {
    expect(fizzbuzz(15)).toBe("FizzBuzz");
  });

  it("returns the number as string otherwise", () => {
    expect(fizzbuzz(1)).toBe("1");
    expect(fizzbuzz(7)).toBe("7");
  });
});
```

Run: test fails (fizzbuzz is not defined). RED.

---

Step 2 — Write minimum code to pass (GREEN):

```javascript
function fizzbuzz(n) {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return String(n);
}
```

Run: all tests pass. GREEN.

---

Step 3 — Refactor:

```javascript
const isDivisibleBy = (n, divisor) => n % divisor === 0;

function fizzbuzz(n) {
  const output =
    (isDivisibleBy(n, 3) ? "Fizz" : "") +
    (isDivisibleBy(n, 5) ? "Buzz" : "");

  return output || String(n);
}
```

Tests still pass. REFACTOR complete.

---

## Benefits of TDD

* Confidence that code meets requirements
* Tests are written by someone who understands the code (you)
* Forces you to think about API design before implementation
* Shorter feedback loops (fail fast)
* Naturally high test coverage

---

## When TDD Works Best

* Pure business logic (algorithms, calculations, validators)
* APIs with clear inputs and outputs
* Bug fixes (write a test that exposes the bug, then fix)

---

## When TDD Is Less Useful

* Exploratory programming (you do not know what you are building yet)
* UI-heavy code (tests become brittle)
* Legacy code with no tests (add tests when refactoring)

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What are the three phases of TDD? | Red (failing test), Green (passing test), Refactor (clean code) |
| How much code should you write in the GREEN phase? | The absolute minimum to pass the test |
| Does TDD guarantee bug-free code? | No. It only guarantees the code passes your tests |
| Should you always use TDD? | No. Use it where it adds value (logic, APIs, bug fixes) |
| What is the first step in fixing a bug with TDD? | Write a test that reproduces the bug |

---

# Chapter 10 — Code Quality Tools

## ESLint

Static analysis for finding and fixing problems:

```bash
npm install --save-dev eslint
npx eslint --init
```

```javascript
// eslint.config.js (flat config — ESLint 9+)
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-console": "warn",
      "prefer-const": "error",
      "eqeqeq": ["error", "always"],
      "curly": "error",
      "no-var": "error",
    },
  },
];
```

Running:

```bash
npx eslint src/
npx eslint src/ --fix
```

---

## Prettier

Opinionated code formatter:

```bash
npm install --save-dev prettier
```

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

Running:

```bash
npx prettier --write src/
npx prettier --check src/
```

---

## ESLint + Prettier Together

```bash
npm install --save-dev eslint-config-prettier
```

```javascript
// eslint.config.js
import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  prettier, // must be last — disables rules that conflict with Prettier
  {
    rules: {
      // your custom rules
    },
  },
];
```

---

## Husky

Git hooks made easy:

```bash
npm install --save-dev husky
npx husky init
```

```bash
# .husky/pre-commit
npx lint-staged
```

```bash
# .husky/pre-push
npm run test:ci
```

---

## lint-staged

Run linters only on staged files:

```bash
npm install --save-dev lint-staged
```

```json
// package.json
{
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"],
    "*.jsx": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

Workflow:

```
Edit file → git add → git commit
                        ↓
                Husky triggers lint-staged
                        ↓
                ESLint + Prettier only on staged files
                        ↓
                If any fail → commit blocked
```

---

## Full Setup Script

```bash
npm install --save-dev eslint prettier eslint-config-prettier husky lint-staged
npx eslint --init
npx prettier --write src/
npx husky init
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the difference between ESLint and Prettier? | ESLint finds logical errors; Prettier formats code consistently |
| Why use lint-staged instead of running ESLint on everything? | Speed — only check changed files |
| What does `eslint-config-prettier` do? | Disables ESLint rules that conflict with Prettier |
| When does the pre-push hook run? | After `git push` is called, before the push completes |

---

# Chapter 11 — CI/CD with GitHub Actions

## What is CI/CD?

* **CI (Continuous Integration)**: Automatically test every commit
* **CD (Continuous Deployment/Delivery)**: Automatically deploy to production

---

## Basic CI Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Unit tests
        run: npm run test:ci

      - name: Coverage
        run: npm run test:coverage
```

---

## Full Pipeline with E2E and Deploy

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/

  e2e:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - name: Install Playwright
        run: npx playwright install --with-deps
      - name: Run E2E tests
        run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  deploy:
    needs: e2e
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: |
          echo "Deploying..."
          # Actual deploy command here
          # e.g., vercel --prod, serverless deploy, rsync, etc.
```

---

## Skipping Tests

```yaml
on:
  push:
    branches: [main]
    paths-ignore:
      - "*.md"
      - "docs/**"
```

---

## Caching Dependencies

```yaml
- name: Cache npm dependencies
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

---

## Environment Variables and Secrets

```yaml
- name: Run tests with secrets
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
    API_KEY: ${{ secrets.API_KEY }}
  run: npm test
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the difference between CI and CD? | CI tests every commit; CD deploys after tests pass |
| What does `npm ci` do vs `npm install`? | `npm ci` installs exact versions from lockfile (faster, stricter) |
| Why use a matrix strategy? | Test against multiple Node.js versions or OS platforms |
| How do you access secrets in GitHub Actions? | `${{ secrets.MY_SECRET }}` |
| What happens if a CI job fails? | The PR is blocked from merging (if branch protection is configured) |

---

# Chapter 12 — Coverage Thresholds

## What is Coverage?

Measures how much of your code is executed during tests:

* **Line coverage**: percentage of executable lines executed
* **Branch coverage**: percentage of branches (if/else, switch cases) executed
* **Function coverage**: percentage of functions called
* **Statement coverage**: percentage of statements executed

```bash
npm test -- --coverage
```

Output:

```text
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #
-----------------|---------|----------|---------|---------|-------------------
All files        |   87.5  |    80.0  |   90.0  |   87.5  |
 src/math.js     |     100 |      100 |     100 |     100 |
 src/api.js      |   66.66 |       50 |     100 |   66.66 | 15-18
 src/utils.js    |     100 |      100 |     100 |     100 |
-----------------|---------|----------|---------|---------|-------------------
```

---

## Setting Thresholds

Jest:

```javascript
export default {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    "./src/critical/**/*.js": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
```

Vitest:

```javascript
export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
});
```

---

## Coverage Reporting

```json
{
  "scripts": {
    "test:coverage": "vitest run --coverage",
    "test:coverage:check": "vitest run --coverage --coverage.thresholds.branches=90"
  }
}
```

HTML reports:

```bash
open coverage/index.html
```

---

## Coverage-Driven Development

```text
Start: 40% coverage
Goal:  Add tests for uncovered branches
Result: 85% coverage → threshold passes CI
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What does 100% branch coverage mean? | Every possible branch (if/else, switch) was executed |
| Is 100% coverage a guarantee of no bugs? | No. It only proves code was executed, not that it's correct |
| Why set per-file thresholds? | Critical files (pricing, auth, payments) demand higher coverage |
| What is the difference between line and branch coverage? | Line = lines executed; Branch = decision paths taken |

---

# Chapter 13 — Mocking Strategies

## Network Requests

```javascript
// Mock fetch globally
global.fetch = vi.fn();

// Simulate a successful response
fetch.mockResolvedValueOnce({
  ok: true,
  json: async () => ({ id: 1 }),
});

// Simulate a network error
fetch.mockRejectedValueOnce(new Error("Network failure"));
```

---

## Axios

```javascript
import axios from "axios";

vi.mock("axios");

test("fetches users via axios", async () => {
  axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: "Alice" }] });

  const users = await getUsers();

  expect(users).toEqual([{ id: 1, name: "Alice" }]);
  expect(axios.get).toHaveBeenCalledWith("/users");
});
```

---

## Database

```javascript
// Mock database client
vi.mock("../db", () => ({
  query: vi.fn(),
}));

import { query } from "../db";

test("fetches user from database", async () => {
  query.mockResolvedValueOnce({ rows: [{ id: 1, name: "Alice" }] });

  const user = await findUserById(1);

  expect(user.name).toBe("Alice");
  expect(query).toHaveBeenCalledWith(
    "SELECT * FROM users WHERE id = $1",
    [1],
  );
});
```

---

## Date.now and Math.random

```javascript
beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2025-01-15T12:00:00Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

test("generates timestamp", () => {
  const result = generateTimestamp();
  expect(result).toBe("2025-01-15T12:00:00.000Z");
});

// Math.random
const mockRandom = vi.spyOn(Math, "random").mockReturnValue(0.5);

test("random value is deterministic", () => {
  expect(Math.random()).toBe(0.5);
});

mockRandom.mockRestore();
```

---

## Partial Mocks

Mock some methods of a module while keeping others:

```javascript
vi.mock("../payment-processor", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    chargeCustomer: vi.fn().mockResolvedValue({ success: true }),
  };
});
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Should you mock every dependency? | No. Mock external I/O (network, DB); use real implementations for pure logic |
| What is the risk of over-mocking? | Tests pass but code breaks in production because mocks are wrong |
| How do you mock a specific method while keeping the rest? | Use `vi.mock` with the factory returning the original plus overrides |
| How do you reset mocks between tests? | `vi.clearAllMocks()` or `beforeEach` with `vi.resetAllMocks()` |

---

# Chapter 14 — Putting It All Together: A Complete Project Setup

## Project Structure

```text
project/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── src/
│   ├── math.js
│   ├── api.js
│   ├── db.js
│   └── app.js
│
├── tests/
│   ├── unit/
│   │   ├── math.test.js
│   │   └── api.test.js
│   ├── integration/
│   │   └── user-flow.test.js
│   └── e2e/
│       └── login.spec.js
│
├── node_modules/
│
├── package.json
├── vitest.config.js
├── eslint.config.js
├── .prettierrc
├── .husky/
│   ├── pre-commit
│   └── pre-push
│
├── playwright.config.js
└── README.md
```

---

## package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:ci": "vitest run --reporter=junit --outputFile=junit.xml",
    "test:e2e": "playwright test",
    "lint": "eslint src/ tests/",
    "lint:fix": "eslint src/ tests/ --fix",
    "format": "prettier --write 'src/**/*.js' 'tests/**/*.js'",
    "format:check": "prettier --check 'src/**/*.js' 'tests/**/*.js'",
    "prepare": "husky"
  }
}
```

---

## Full CI Workflow

```yaml
name: Full CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check

  unit-and-integration:
    runs-on: ubuntu-latest
    needs: lint-and-format
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - run: npm run test:ci
      - run: npm run test:coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/

  e2e:
    runs-on: ubuntu-latest
    needs: unit-and-integration
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Common Gotchas

```javascript
// GOTCHA 1: Forgetting to return/await a promise
test("this test will always pass", () => {
  expect(1).toBe(2); // fail
  // but test passes because no return/await
});

// FIX:
test("this test will fail correctly", async () => {
  await expect(1).toBe(2);
});

// GOTCHA 2: Mock not reset between tests
test("test A", () => {
  fetch.mockResolvedValue({ data: "A" });
});

test("test B", () => {
  // fetch still returns { data: "A" } from test A
});

// FIX:
beforeEach(() => {
  vi.clearAllMocks();
});

// GOTCHA 3: Testing async state updates synchronously
test("fails because state is async", () => {
  render(<Counter />);
  fireEvent.click(screen.getByText("Increment"));
  expect(screen.getByTestId("count")).toHaveTextContent("1"); // may fail
});

// FIX: Use waitFor or findBy*
test("works with async state", async () => {
  render(<Counter />);
  fireEvent.click(screen.getByText("Increment"));
  await waitFor(() => {
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });
});
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the most common mistake in async tests? | Forgetting to `return` the promise or use `await` |
| Why do tests pass despite failing assertions? | The test function finishes before the assertion runs |
| How do you prevent mock leakage between tests? | Call `vi.clearAllMocks()` in `beforeEach` |
| How does `waitFor` work? | Retries the callback until it passes or the timeout expires |
| What order should CI jobs run? | Lint → Unit → Integration → E2E → Deploy |

---

# Part 17 Summary

| Concept | Key Takeaway |
|---------|-------------|
| Testing Pyramid | Unit (fast, many) → Integration (medium) → E2E (slow, few) |
| Unit Test | Tests a single function/module in isolation |
| Integration Test | Tests cooperation between components |
| E2E Test | Tests the full system from user perspective |
| Snapshot Test | Captures output to detect unexpected changes |
| Visual Regression | Pixel-level comparison against baseline screenshots |
| Jest | Mature testing framework with rich matchers and mocking |
| Vitest | Fast, Vite-native alternative to Jest with same API |
| `describe` | Groups related tests |
| `it`/`test` | Defines an individual test case |
| `expect` | Creates assertions with matchers |
| `toBe` | Reference equality (`Object.is`) |
| `toEqual` | Deep equality for objects/arrays |
| `beforeAll`/`afterAll` | Run once per describe scope |
| `beforeEach`/`afterEach` | Run before/after each test |
| `jest.fn()` / `vi.fn()` | Creates a mock function |
| `jest.spyOn()` / `vi.spyOn()` | Wraps an existing method for tracking |
| `jest.mock()` / `vi.mock()` | Mocks an entire module |
| `mockResolvedValue()` | Mocks a resolved promise return |
| `mockRejectedValue()` | Mocks a rejected promise return |
| Fake timers | Simulates time without waiting |
| jsdom | Browser-like environment in Node.js |
| @testing-library/react | Renders React components in tests |
| @testing-library/jest-dom | DOM-specific matchers |
| Playwright | Cross-browser E2E testing framework |
| Page Object Model | Encapsulates page logic in reusable classes |
| TDD | Red (fail) → Green (pass) → Refactor (clean) |
| ESLint | Static analysis for code quality |
| Prettier | Opinionated code formatting |
| Husky | Git hooks for running checks before commit/push |
| lint-staged | Runs linters only on staged files |
| GitHub Actions | CI/CD platform integrated with GitHub |
| CI | Continuous Integration — test every commit |
| CD | Continuous Deployment — deploy automatically |
| Coverage | Measures % of code executed by tests |
| Coverage Threshold | Fails CI if coverage drops below minimum |
| Branch coverage | Percentage of decision paths tested |
| Line coverage | Percentage of executable lines executed |
| Mocking | Replacing real dependencies with test doubles |
| Over-mocking | Mocking too much, causing false confidence |

---

# Next Part (Part 18)

We will enter one of the most important sections of the JavaScript ecosystem:

# TypeScript, Type Systems, Advanced Generics, and Production Type Safety

including:

* TypeScript fundamentals: types, interfaces, enums
* Advanced generics and utility types
* Type narrowing and discriminated unions
* Declaration files and `.d.ts`
* tsconfig and strict mode
* TypeScript with React
* TypeScript with Node.js/Express
* Migration strategies from JavaScript
* Type testing with `expect-type`
* Monorepo TypeScript project references
* Reverse engineering TypeScript codebases
