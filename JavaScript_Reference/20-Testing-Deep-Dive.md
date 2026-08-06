# JavaScript Testing Deep Dive - Complete Research

> **Warning:** This is a reference document. Code examples may need updating for the latest browser/runtime versions. Always verify against [MDN Web Docs](https://developer.mozilla.org/) before using in production.

---

## Table of Contents

1. [Testing Pyramid](#1-testing-pyramid)
2. [Jest](#2-jest)
3. [Vitest](#3-vitest)
4. [React Testing Library](#4-react-testing-library)
5. [Cypress](#5-cypress)
6. [Playwright](#6-playwright)
7. [Mocha + Chai](#7-mocha--chai)
8. [Jasmine](#8-jasmine)
9. [Puppeteer](#9-puppeteer)
10. [Test Doubles](#10-test-doubles)
11. [Code Coverage](#11-code-coverage)
12. [TDD (Red-Green-Refactor)](#12-tdd-red-green-refactor)
13. [BDD (Given-When-Then)](#13-bdd-given-when-then)
14. [Property-Based Testing](#14-property-based-testing)
15. [Snapshot Testing](#15-snapshot-testing)
16. [Visual Regression Testing](#16-visual-regression-testing)
17. [API Testing](#17-api-testing)
18. [Performance Testing](#18-performance-testing)
19. [Security Testing](#19-security-testing)
20. [Accessibility Testing](#20-accessibility-testing)
21. [E2E Testing Patterns and Best Practices](#21-e2e-testing-patterns-and-best-practices)
22. [Test Organization](#22-test-organization)
23. [CI/CD Integration](#23-cicd-integration)
24. [Test-Driven Development Workflow](#24-test-driven-development-workflow)
25. [Mocking Modules, HTTP Requests, Timers, localStorage](#25-mocking-modules-http-requests-timers-localstorage)

---

## 1. Testing Pyramid

The Testing Pyramid, introduced by Mike Cohn in "Succeeding with Agile," is a conceptual framework for structuring automated tests across three layers.

### The Three Layers

```
        /\
       /  \        E2E Tests (10%)
      / E2E\
     /------\
    /        \     Integration Tests (20%)
   / Integration\
  /--------------\
 /                \  Unit Tests (70%)
/    Unit Tests    \
/------------------\
```

### Layer 1: Unit Tests (Base - ~70%)

- **Scope**: Individual functions, methods, or classes in isolation
- **Speed**: Milliseconds to execute
- **Complexity**: Simple to write and maintain, minimal setup
- **Cost**: Low - fast, cheap, easy to debug
- **Purpose**: Verify each unit behaves correctly when run alone
- **Tools**: Jest, Vitest, Mocha
- **Example**: Testing a discount calculation function, verifying a date formatter

### Layer 2: Integration Tests (Middle - ~20%)

- **Scope**: Interactions between multiple components/modules
- **Speed**: Slower than unit tests, may require external dependencies
- **Complexity**: Moderate - requires more setup and teardown
- **Cost**: Medium - tests real interactions
- **Purpose**: Verify components work together correctly (API contracts, database operations, service communication)
- **Tools**: Supertest, Testing Library, Mocha + Chai
- **Example**: Testing API endpoint with database, testing form submission flow

### Layer 3: End-to-End (E2E) Tests (Top - ~10%)

- **Scope**: Complete user workflows through the entire application stack
- **Speed**: Slowest - runs real browser, real network, real database
- **Complexity**: High - brittle, expensive to maintain
- **Cost**: High - slow execution, complex debugging
- **Purpose**: Validate critical user journeys from start to finish
- **Tools**: Cypress, Playwright, Selenium
- **Example**: Complete checkout flow, user registration journey

### Why the Pyramid Matters

- Bugs caught early (unit tests) are cheaper to fix
- Prevents overreliance on slow, brittle E2E tests
- Fewer bugs escape to higher layers, reducing debugging time
- Faster CI/CD pipelines and reliable feedback loops

### Anti-Patterns

- **Ice Cream Cone**: Too many E2E tests, few unit tests
- **Hourglass**: Many unit and E2E tests but few integration tests
- **Diamond**: Too many integration tests, insufficient unit/E2E

### Modern Shift

AI-generated code passes unit tests cleanly but breaks user flows in ways only E2E tests catch. Teams are adjusting ratios, with some moving toward a "testing diamond" or "testing trophy" model emphasizing integration tests.

---

## 2. Jest

Jest is a JavaScript testing framework created by Meta (Facebook). It provides a complete testing solution: test runner, assertion library, mocking utilities, and code coverage - all with zero configuration for most projects.

### Installation and Setup

```bash
# npm
npm install --save-dev jest

# yarn
yarn add --dev jest

# TypeScript
npm install --save-dev jest @types/jest ts-jest
```

### package.json Configuration

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci"
  }
}
```

### jest.config.js

```javascript
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  // TypeScript
  preset: "ts-jest",
  // Coverage
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  // Setup files
  setupFilesAfterEnv: ["<rootDir>/setup-jest.js"],
  // Module paths
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Projects (monorepo)
  projects: ["<rootDir>/packages/*"],
};
```

### Writing Tests

```javascript
// Basic test
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

// With describe blocks
describe("Calculator", () => {
  describe("addition", () => {
    test("adds positive numbers", () => {
      expect(sum(1, 2)).toBe(3);
    });

    test("adds negative numbers", () => {
      expect(sum(-1, -2)).toBe(-3);
    });
  });
});

// test.only, test.skip, test.todo
test.only("focused test", () => {});
test.skip("disabled test", () => {});
test.todo("write test for edge case");
```

### Matchers

```javascript
// Equality
expect(value).toBe(4);            // Object.is strict equality
expect(obj).toEqual({ a: 1 });   // Deep equality
expect(obj).toStrictEqual({ a: 1 }); // Strict deep equality

// Truthiness
expect(n).toBeNull();
expect(n).toBeUndefined();
expect(n).toBeDefined();
expect(n).toBeTruthy();
expect(n).toBeFalsy();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeGreaterThanOrEqual(3);
expect(value).toBeLessThan(5);
expect(value).toBeLessThanOrEqual(5);
expect(value).toBeCloseTo(0.3, 5); // floating point

// Strings
expect(str).toMatch(/reg/i);

// Arrays
expect(arr).toContain("item");
expect(arr).toHaveLength(3);

// Objects
expect(obj).toHaveProperty("a");
expect(obj).toHaveProperty("a", 1);

// Exceptions
expect(() => fn()).toThrow(Error);
expect(() => fn()).toThrow("error message");

// Snapshots
expect(obj).toMatchSnapshot();
expect(obj).toMatchInlineSnapshot(`...`);

// Mock functions
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(1);
expect(mockFn).toHaveBeenCalledWith("arg1", 123);
```

### Setup and Teardown

```javascript
beforeAll(() => { /* runs once before all tests */ });
afterAll(() => { /* runs once after all tests */ });
beforeEach(() => { /* runs before each test */ });
afterEach(() => { /* runs after each test */ });
```

### Mocking: jest.fn() - Mock Functions

```javascript
// Create a mock function
const mockFn = jest.fn();

// Mock implementation
const mockFn = jest.fn(() => 42);
const mockFn = jest.fn((a, b) => a + b);

// Verify calls
mockFn("hello");
expect(mockFn).toHaveBeenCalledTimes(1);
expect(mockFn).toHaveBeenCalledWith("hello");

// Mock return values
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue(42);       // for async
mockFn.mockRejectedValue(new Error("fail")); // for async
mockFn.mockImplementation((x) => x * 2);
mockFn.mockImplementationOnce((x) => x * 2);

// Clear/reset
mockFn.mockClear();    // reset call counts
mockFn.mockReset();    // reset + remove implementation
mockFn.mockRestore();  // restore original implementation
```

### Mocking: jest.mock() - Module Mocking

```javascript
// Mock entire module
jest.mock("./module", () => ({
  fetchData: jest.fn(),
}));

// Mock with factory
jest.mock("./database", () => ({
  connect: jest.fn(),
  query: jest.fn().mockResolvedValue([]),
  disconnect: jest.fn(),
}));

// Mock with partial implementation
jest.mock("./api", () => ({
  ...jest.requireActual("./api"),
  fetchUser: jest.fn().mockResolvedValue({ name: "John" }),
}));

// Access mock in test
const { fetchData } = require("./module");
fetchData.mockResolvedValue({ data: "test" });
```

### Mocking: jest.spyOn() - Spying

```javascript
// Spy on object method
const spy = jest.spyOn(obj, "method");
obj.method();
expect(spy).toHaveBeenCalled();
spy.mockRestore(); // restore original

// Spy with mock implementation
jest.spyOn(obj, "method").mockReturnValue(42);

// Spy on console
jest.spyOn(console, "log").mockImplementation(() => {});
```

### Timer Mocks

```javascript
jest.useFakeTimers();

test("calls callback after 1 second", () => {
  const callback = jest.fn();
  timerGame(callback);

  expect(callback).not.toHaveBeenCalled();

  jest.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalledTimes(1);
});

// Run all pending timers
jest.runAllTimers();

// Run only next timer
jest.runOnlyPendingTimers();

// Restore real timers
jest.useRealTimers();
```

### Snapshot Testing

```javascript
// Regular snapshot
expect(component).toMatchSnapshot();

// Inline snapshot
expect(component).toMatchInlineSnapshot(`
  <div>
    <h1>Hello</h1>
  </div>
`);

// Update snapshots: npx jest -u

// Property-level snapshots
expect(user).toMatchObject({
  name: expect.any(String),
  age: expect.any(Number),
});
```

### Async Testing

```javascript
// Promises
test("fetches data", () => {
  return fetchData().then(data => {
    expect(data).toBe("result");
  });
});

// async/await
test("fetches data", async () => {
  const data = await fetchData();
  expect(data).toBe("result");
});

// Resolves/Rejects
expect(fetchData()).resolves.toBe("result");
expect(fetchData()).rejects.toThrow("error");
```

### Coverage

```bash
npx jest --coverage
npx jest --coverage --collectCoverageFrom="src/**/*.js"
```

### Custom Matchers

```javascript
expect.extend({
  toBeEven(received) {
    const pass = received % 2 === 0;
    return {
      pass,
      message: () => `expected ${received} ${pass ? "not " : ""}to be even`,
    };
  },
});

expect(4).toBeEven();
```

### Jest Projects (Monorepo)

```javascript
// jest.config.js
module.exports = {
  projects: [
    "<rootDir>/packages/core",
    "<rootDir>/packages/utils",
    "<rootDir>/packages/api",
  ],
};
```


---

## 3. Vitest

Vitest is a modern test runner built on top of Vite. It reuses Vite's pipeline for native ESM support, TypeScript, and JSX without extra configuration.

### Installation

```bash
npm install -D vitest
```

### vitest.config.ts

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,           // Use global APIs (describe, it, expect)
    environment: "jsdom",    // or "node"
    include: ["src/**/*.test.{ts,tsx,js,jsx}"],
    coverage: {
      provider: "v8",        // or "istanbul"
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

### Writing Tests

```typescript
// Note: vitest import required by default (disable with globals: true)
import { describe, it, expect, vi } from "vitest";

describe("math", () => {
  it("adds numbers", () => {
    expect(1 + 2).toBe(3);
  });

  it("subtracts numbers", () => {
    expect(5 - 3).toBe(2);
  });
});
```

### Mocking in Vitest (vi API)

```typescript
import { vi } from "vitest";

// Mock functions (equivalent to jest.fn)
const mockFn = vi.fn();
mockFn.mockReturnValue(42);
mockFn.mockImplementation((x) => x * 2);

// Mock modules (equivalent to jest.mock)
vi.mock("./module", () => ({
  fetchData: vi.fn(),
}));

// Spy on methods (equivalent to jest.spyOn)
const spy = vi.spyOn(obj, "method");

// Timer mocks
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
vi.useRealTimers();

// Mock imports
const mod = await vi.importActual("./module");
```

### Comparison: Vitest vs Jest

| Feature | Jest | Vitest |
|---------|------|--------|
| **Speed** | Slower (Babel transform) | Faster (Vite/ESBuild) |
| **ESM Support** | Limited, needs config | Native |
| **TypeScript** | Requires ts-jest/babel | Native |
| **Config Complexity** | ~60 lines typical | ~4 lines typical |
| **Watch Mode** | 9+ sec on large projects | ~2 sec |
| **Cold Start CI** | Slower (Babel overhead) | 30-50% faster |
| **API** | jest.* API | jest-compatible via vi.* |
| **Ecosystem** | Larger, more mature | Growing rapidly |
| **Browser Mode** | JSDOM only | Real browser (Chromium) |

### When to Choose Each

- **Choose Vitest**: New projects, Vite-based projects, ESM-heavy codebases, TypeScript-first projects
- **Choose Jest**: Legacy projects, projects needing extensive plugin ecosystem, non-Vite projects

### Migration from Jest to Vitest

```bash
# Install vitest
npm install -D vitest

# Install compatible expect (optional)
npm install -D @vitest/expect

# Replace jest.fn -> vi.fn, jest.mock -> vi.mock in code
# Update config
# Run: npx vitest
```

### Workspace Support (Monorepo)

```typescript
// vitest.workspace.ts
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "packages/*",
  {
    test: {
      name: "unit",
      include: ["**/*.unit.test.ts"],
    },
  },
  {
    test: {
      name: "integration",
      include: ["**/*.integration.test.ts"],
    },
  },
]);
```

---

## 4. React Testing Library

React Testing Library (RTL) builds on DOM Testing Library to provide APIs for working with React components. Its guiding principle: "The more your tests resemble the way your software is used, the more confidence they can give you."

### Installation

```bash
npm install --save-dev @testing-library/react @testing-library/dom
# With TypeScript
npm install --save-dev @types/react @types/react-dom
# Jest DOM matchers
npm install --save-dev @testing-library/jest-dom
# User event library
npm install --save-dev @testing-library/user-event
```

### render

```javascript
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyComponent from "./MyComponent";

test("renders correctly", () => {
  const { container, unmount, rerender, asFragment } = render(
    <MyComponent name="World" />
  );

  // Rerender with new props
  rerender(<MyComponent name="Universe" />);

  // Unmount
  unmount();

  // Snapshot
  expect(asFragment()).toMatchSnapshot();
});
```

### screen Queries (Finding Elements)

```javascript
// getBy* - returns element or throws
screen.getByRole("button", { name: "Submit" });
screen.getByText("Hello");
screen.getByLabelText("Email");
screen.getByPlaceholderText("Search...");
screen.getByTestId("custom-id");
screen.getByDisplayValue("current value");
screen.getByAltText("image alt");
screen.getByTitle("tooltip");

// queryBy* - returns null or throws
screen.queryByText("Not present"); // null if not found
screen.queryByText("Present");    // element if found

// findBy* - async, waits for element to appear
await screen.findByRole("heading");
await screen.findByText("Loaded!");

// getAllBy*, queryAllBy*, findAllBy* - return arrays
screen.getAllByRole("button");
```

### Which Query to Use? (Priority)

1. `getByRole` - accessible, reflects user experience
2. `getByLabelText` - best for form fields
3. `getByPlaceholderText` - fallback for form fields
4. `getByText` - non-interactive elements
5. `getByDisplayValue` - form elements with values
6. `getByAltText` - images
7. `getByTitle` - tooltip-like elements
8. `getByTestId` - last resort, use `data-testid`

### fireEvent

```javascript
import { fireEvent } from "@testing-library/react";

// Click
fireEvent.click(getByText("Submit"));

// Change input
fireEvent.change(input, { target: { value: "new value" } });

// Submit form
fireEvent.submit(form);

// Keyboard
fireEvent.keyDown(element, { key: "Enter" });
fireEvent.keyUp(element, { key: "ArrowDown" });

// Focus/Blur
fireEvent.focus(input);
fireEvent.blur(input);

// Drag and drop
fireEvent.drop(element, {
  dataTransfer: { files: [new File([""], "test.png", { type: "image/png" })] },
});
```

### userEvent (Preferred Over fireEvent)

```javascript
import userEvent from "@testing-library/user-event";

// Setup before render
const user = userEvent.setup();

// Click (fires full sequence: pointerDown, mouseDown, pointerUp, mouseUp, click)
await user.click(button);

// Type (fires keyDown, keyPress, input, keyUp for each character)
await user.type(input, "Hello World");

// Clear and type
await user.clear(input);
await user.type(input, "New text");

// Tab between elements
await user.tab();

// Select text
await user.tripleClick(element);

// Upload file
const file = new File(["hello"], "hello.txt", { type: "text/plain" });
await user.upload(input, file);

// Clipboard operations
await user.copy();
await user.paste();
```

### waitFor

```javascript
import { waitFor } from "@testing-library/react";

// Wait for assertion to pass
await waitFor(() => {
  expect(mockAPI).toHaveBeenCalledTimes(1);
});

// Wait for element to appear
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});

// With options
await waitFor(() => {
  expect(element).toBeVisible();
}, {
  timeout: 5000,
  interval: 100,
});
```

### act

```javascript
import { act } from "react-dom/test-utils";

// Wraps state updates in act to ensure DOM updates are processed
act(() => {
  // trigger state update
});

// For async
await act(async () => {
  await asyncOperation();
});

// RTL's render, fireEvent, etc. already wrap in act
// You mainly need act for direct state updates
```

### renderHook (Testing Custom Hooks)

```javascript
import { renderHook, act } from "@testing-library/react";

const { result, rerender, unmount } = renderHook(() => useCounter(0));

act(() => {
  result.current.increment();
});

expect(result.current.count).toBe(1);

// With props
const { result } = renderHook(({ initial }) => useCounter(initial), {
  initialProps: { initial: 10 },
});
```

### Practical Example

```javascript
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import UserForm from "./UserForm";

test("calls onUserAdd when form is submitted", async () => {
  const mockOnUserAdd = jest.fn();
  const user = userEvent.setup();

  render(<UserForm onUserAdd={mockOnUserAdd} />);

  // Find elements by role
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const submitButton = screen.getByRole("button", { name: /submit/i });

  // Interact
  await user.type(nameInput, "John Doe");
  await user.type(emailInput, "john@example.com");
  await user.click(submitButton);

  // Assert
  expect(mockOnUserAdd).toHaveBeenCalledWith({
    name: "John Doe",
    email: "john@example.com",
  });
});
```

---

## 5. Cypress

Cypress is a JavaScript-based E2E testing framework that runs directly inside the browser alongside your application.

### Installation and Setup

```bash
npm install --save-dev cypress
npx cypress open    # Opens Cypress Test Runner GUI
npx cypress run     # Runs tests headlessly
```

### Project Structure

```
cypress/
  e2e/                    # Test files (specs)
    login.cy.js
    checkout.cy.js
  fixtures/               # Test data (JSON files)
    users.json
    products.json
  support/                # Custom commands, global setup
    commands.js
    e2e.js
  downloads/
  screenshots/            # Auto-captured on failure
  videos/                 # Auto-captured during run
cypress.config.js
```

### cypress.config.js

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    // Spec pattern
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // Plugins go here
    },
  },
});
```

### Writing Tests

```javascript
describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("displays login form", () => {
    cy.get("input[name='username']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
    cy.get("button[type='submit']").should("contain", "Login");
  });

  it("logs in successfully with valid credentials", () => {
    cy.get("input[name='username']").type("testuser");
    cy.get("input[name='password']").type("password123");
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/dashboard");
    cy.contains("Welcome back").should("be.visible");
  });

  it("shows error with invalid credentials", () => {
    cy.get("input[name='username']").type("wronguser");
    cy.get("input[name='password']").type("wrongpass");
    cy.get("button[type='submit']").click();
    cy.get(".error-message").should("contain", "Invalid credentials");
  });
});
```

### Selectors

```javascript
// CSS selectors
cy.get("button.submit");
cy.get("[data-cy='login-button']");
cy.get("#username");

// By text content
cy.contains("Submit");
cy.contains("a", "Home");

// By role
cy.get("button").contains("Submit");

// Chaining
cy.get("form").find("input[type='text']").first().clear().type("new value");

// Filtering
cy.get("li").filter(".active");
cy.get("li").not(".disabled");

// Within (scoped)
cy.get("form").within(() => {
  cy.get("input").first().type("hello");
  cy.get("button").click();
});
```

### Assertions

```javascript
// Implicit (via should)
cy.get(".element").should("be.visible");
cy.get(".element").should("have.text", "Hello");
cy.get(".element").should("have.value", "test");
cy.get(".list").should("have.length", 5);
cy.get(".element").should("have.class", "active");
cy.get(".element").should("not.exist");
cy.get(".element").should("be.disabled");
cy.get(".checkbox").should("be.checked");

// Chaining with .and
cy.get(".element").should("be.visible").and("have.class", "active");

// Explicit (via expect in .then)
cy.get(".element").then(($el) => {
  expect($el).to.have.attr("href", "/home");
  expect($el.text()).to.contain("Hello");
  expect($el).to.be.visible;
});
```

### Intercepting Requests

```javascript
// Mock API response
beforeEach(() => {
  cy.intercept("GET", "/api/users", { fixture: "users.json" }).as("getUsers");
  cy.intercept("POST", "/api/login", {
    statusCode: 200,
    body: { token: "fake-token" },
  }).as("loginRequest");
  cy.intercept("GET", "/api/products", { statusCode: 500 }).as("apiError");
});

it("loads users from mock", () => {
  cy.visit("/users");
  cy.wait("@getUsers");
  cy.get(".user-list").should("have.length.greaterThan", 0);
});

// Modify request
cy.intercept("GET", "/api/data", (req) => {
  req.headers["Authorization"] = "Bearer fake-token";
  req.reply({ body: { data: "mocked" } });
});

// Wait for intercepted request
cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
```

### Fixtures

```json
// cypress/fixtures/users.json
{
  "validUser": {
    "username": "testuser",
    "password": "password123"
  },
  "invalidUser": {
    "username": "wronguser",
    "password": "wrongpass"
  }
}
```

```javascript
// Loading fixtures
cy.fixture("users.json").then((users) => {
  cy.get("input[name='username']").type(users.validUser.username);
  cy.get("input[name='password']").type(users.validUser.password);
});

// In beforeEach
beforeEach(() => {
  cy.fixture("users").as("usersData");
});
```

### Custom Commands

```javascript
// cypress/support/commands.js
Cypress.Commands.add("login", (username, password) => {
  cy.visit("/login");
  cy.get("input[name='username']").type(username);
  cy.get("input[name='password']").type(password);
  cy.get("button[type='submit']").click();
  cy.url().should("include", "/dashboard");
});

Cypress.Commands.add("getByDataCy", (selector) => {
  return cy.get(`[data-cy='${selector}']`);
});

// Using custom commands
cy.login("testuser", "password123");
cy.getByDataCy("submit-button").click();
```

---

## 6. Playwright

Playwright, developed by Microsoft, provides end-to-end testing across Chromium, Firefox, and WebKit with a unified API.

### Installation

```bash
# Quick setup
npm init playwright@latest

# Manual
npm install -D @playwright/test
npx playwright install          # Download browser binaries
npx playwright install chromium # Single browser only
```

### playwright.config.ts

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

### Writing Tests

```typescript
import { test, expect } from "@playwright/test";

test("should display login form", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).toBeEnabled();
});

test("should login successfully", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("user@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText("Welcome back")).toBeVisible();
});
```

### Locators

```typescript
// Role-based (recommended for accessibility)
page.getByRole("button", { name: "Submit" });
page.getByRole("link", { name: "Home" });
page.getByRole("heading", { name: "Welcome" });
page.getByRole("textbox", { name: "Email" });

// Text
page.getByText("Hello");
page.getByText("Hello", { exact: true });
page.getByText("Hello", { ignoreCase: true });

// Label (form fields)
page.getByLabel("Username");

// Placeholder
page.getByPlaceholder("Search...");

// Alt text (images)
page.getByAltText("Company logo");

// Title
page.getByTitle("Close dialog");

// Test ID
page.getByTestId("submit-button");

// CSS selectors (less recommended)
page.locator("button.submit");
page.locator("[data-testid='submit']");

// Nth, first, last
page.getByRole("listitem").nth(2);
page.getByRole("button").first();
```

### Auto-Waiting

Playwright waits for 6 conditions before every action:
1. Element is attached to DOM
2. Element is visible
3. Element is stable (not animating)
4. Element is enabled
5. Element receives events (not obscured)
6. Element is editable (for fill/type)

```typescript
// These all auto-wait
await page.click("button");        // waits for visible, enabled, stable
await page.fill("input", "text");  // waits for editable
await page.waitForSelector("div"); // explicit (rarely needed)
```

### Assertions

```typescript
// Page assertions
await expect(page).toHaveURL("/dashboard");
await expect(page).toHaveTitle("My App");

// Locator assertions (auto-retry)
await expect(page.getByText("Hello")).toBeVisible();
await expect(page.getByText("Hello")).toBeHidden();
await expect(page.getByText("Hello")).toBeEnabled();
await expect(page.getByText("Hello")).toBeDisabled();
await expect(page.getByText("Hello")).toHaveText("Hello");
await expect(page.getByText("Hello")).toContainText("ell");
await expect(page.getByRole("button")).toBeEnabled();
await expect(page.getByRole("checkbox")).toBeChecked();
await expect(input).toHaveValue("test@email.com");
await expect(page.locator(".error")).toHaveCount(0);

// Negation
await expect(page.getByText("Error")).not.toBeVisible();
```

### Page Object Model

```typescript
// pages/LoginPage.ts
import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.errorMessage = page.getByRole("alert");
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

// tests/login.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("login flow", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("user@example.com", "password123");
  await expect(page).toHaveURL(/dashboard/);
});
```

### Network Interception

```typescript
// Mock API response
await page.route("**/api/users", async (route) => {
  await route.fulfill({
    status: 200,
    body: JSON.stringify([{ name: "John" }]),
  });
});

// Modify request
await page.route("**/api/data", async (route) => {
  await route.continue({
    headers: { ...route.request().headers(), Authorization: "Bearer fake" },
  });
});

// Abort request
await page.route("**/analytics.js", (route) => route.abort());

// Wait for request
const [response] = await Promise.all([
  page.waitForResponse("**/api/data"),
  page.click("button"),
]);
```

### Trace Viewer

```typescript
// Enable in config
trace: "on-first-retry"  // or "on" for all tests

// View traces
npx playwright show-trace trace.zip

// What traces capture:
// - DOM snapshots before/after each action
// - Screenshots at each step
// - Network requests and responses
// - Console messages
// - Source code location
// - Action timeline (scrub like video editor)
```

### Codegen (Test Generation)

```bash
# Generate tests by recording interactions
npx playwright codegen http://localhost:3000

# With specific browser
npx playwright codegen --browser chromium

# With viewport
npx playwright codegen --viewport-size "1280,720"

# Generate test with authentication state
npx playwright codegen --save-storage=auth.json http://localhost:3000
```


---

## 7. Mocha + Chai

Mocha is a flexible test runner with excellent async support. Chai is a BDD/TDD assertion library that pairs with Mocha.

### Installation

```bash
npm install --save-dev mocha chai
# TypeScript
npm install --save-dev @types/mocha @types/chai ts-node
# For mocking
npm install --save-dev sinon
# For code coverage
npm install --save-dev nyc
```

### .mocharc.json

```json
{
  "require": ["ts-node/register"],
  "spec": "test/**/*.spec.ts",
  "timeout": 5000,
  "recursive": true,
  "reporter": "spec",
  "exit": true
}
```

### Writing Tests

```javascript
const { expect } = require("chai");

describe("Calculator", function () {
  describe("addition", function () {
    it("should add two positive numbers", function () {
      expect(add(1, 2)).to.equal(3);
    });

    it("should handle negative numbers", function () {
      expect(add(-1, -2)).to.equal(-3);
    });
  });

  describe("subtraction", function () {
    it("should subtract two numbers", function () {
      expect(subtract(5, 3)).to.equal(2);
    });
  });
});
```

### Chai Assertion Styles

```javascript
// BDD expect style (most common)
const expect = chai.expect;
expect(foo).to.be.a("string");
expect(foo).to.equal("bar");
expect(foo).to.have.lengthOf(3);
expect(foo).to.have.property("name").that.is.a("string");
expect(foo).to.deep.equal({ name: "test" });

// BDD should style
chai.should();
foo.should.be.a("string");
foo.should.equal("bar");
foo.should.have.lengthOf(3);

// TDD assert style
const assert = chai.assert;
assert.typeOf(foo, "string");
assert.equal(foo, "bar");
assert.lengthOf(foo, 3);
assert.deepEqual(obj, { name: "test" });
```

### Hooks (Setup/Teardown)

```javascript
describe("UserService", function () {
  let service;

  before(function () {
    // Runs once before ALL tests in the suite
    service = new UserService();
  });

  beforeEach(function () {
    // Runs before EACH test
    service.clear();
  });

  afterEach(function () {
    // Runs after EACH test
    service.clearCache();
  });

  after(function () {
    // Runs once after ALL tests in the suite
    service.disconnect();
  });

  // Pending test
  it.skip("should handle edge case", function () {
    // Not yet implemented
  });

  // Exclusive test
  it.only("should run this test", function () {});
});
```

### Async Testing

```javascript
// Callback style (done)
it("should fetch data", function (done) {
  fetchData(function (result) {
    expect(result).to.equal("data");
    done(); // Signal completion
  });
});

// Promise style
it("should fetch data", function () {
  return fetchData().then(function (result) {
    expect(result).to.equal("data");
  });
});

// Async/await style
it("should fetch data", async function () {
  const result = await fetchData();
  expect(result).to.equal("data");
});

// Testing rejected promises
it("should throw error", async function () {
  try {
    await riskyOperation();
    expect.fail("Should have thrown");
  } catch (error) {
    expect(error.message).to.equal("Failed");
  }
});
```

### Mocha + Chai HTTP Testing (chai-http)

```javascript
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);

describe("API Routes", function () {
  it("should return all users", function (done) {
    chai.request(app)
      .get("/api/users")
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.an("array");
        done();
      });
  });

  // With async/await
  it("should create a user", async function () {
    const res = await chai.request(app)
      .post("/api/users")
      .send({ name: "John", email: "john@test.com" });
    res.should.have.status(201);
    res.body.should.have.property("name", "John");
  });
});
```

### Mocha Reporters

```
spec   - Default, hierarchical output
dot    - Minimal dot output
nyan   - Nyan cat
TAP    - Test Anything Protocol
min    - Summary only
json   - JSON output
html   - HTML report (third-party: mochawesome)
```

---

## 8. Jasmine

Jasmine is a BDD testing framework for JavaScript that runs in browsers and Node.js. It includes everything out of the box (no separate assertion library needed).

### Installation and Setup

```bash
npm install --save-dev jasmine
npx jasmine init    # Creates spec/support/jasmine.json
```

### spec/support/jasmine.json

```json
{
  "spec_dir": "spec",
  "spec_files": ["**/*[sS]pec.js"],
  "helpers": ["helpers/**/*.js"],
  "random": true
}
```

### Writing Specs

```javascript
describe("Calculator", function () {
  let calculator;

  beforeEach(function () {
    calculator = new Calculator();
  });

  describe("addition", function () {
    it("adds two numbers", function () {
      expect(calculator.add(1, 2)).toBe(3);
    });

    it("handles negative numbers", function () {
      expect(calculator.add(-1, -2)).toBe(-3);
    });
  });
});

// Pending specs
xdescribe("Skipped Suite", function () {
  it("skipped test", function () {});  // Uses xit or xdescribe
});

// Focus specs
fdescribe("Focused Suite", function () {
  fit("focused test", function () {}); // Uses fit or fdescribe
});
```

### Jasmine Matchers

```javascript
// Equality
expect(value).toBe(4);           // Strict equality (===)
expect(value).toEqual({ a: 1 }); // Deep equality
expect(value).not.toBe(5);

// Truthiness
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();
expect(value).toBeTruthy();
expect(value).toBeFalsy();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(5);
expect(value).toBeCloseTo(0.3, 5);

// Strings
expect(str).toMatch(/pattern/);

// Arrays
expect(arr).toContain("item");
expect(arr).toHaveLength(3);

// Objects
expect(obj).toHaveProperty("key");
expect(obj).toHaveProperty("key", "value");

// Type
expect(value).toBeInstanceOf(Object);

// Exceptions
expect(fn).toThrow();
expect(fn).toThrowError("message");
```

### Spies

```javascript
describe("Spies", function () {
  let foo, bar;

  beforeEach(function () {
    foo = {
      setBar: function (value) {
        bar = value;
      },
    };
    bar = null;
  });

  it("tracks calls", function () {
    spyOn(foo, "setBar");

    foo.setBar(123);
    foo.setBar(456, "another param");

    expect(foo.setBar).toHaveBeenCalled();
    expect(foo.setBar).toHaveBeenCalledTimes(2);
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, "another param");
  });

  it("stubs return value", function () {
    spyOn(foo, "setBar").and.returnValue(42);

    const result = foo.setBar(123);
    expect(result).toBe(42);
  });

  it("calls fake implementation", function () {
    spyOn(foo, "setBar").and.callFake(function (value) {
      bar = value * 2;
    });

    foo.setBar(5);
    expect(bar).toBe(10);
  });

  it("calls original implementation", function () {
    spyOn(foo, "setBar").and.callThrough();

    foo.setBar(123);
    expect(bar).toBe(123);
  });
});
```

### Jasmine Custom Matchers

```javascript
beforeEach(function () {
  jasmine.addMatchers({
    toBeEven: function () {
      return {
        compare: function (actual) {
          return {
            pass: actual % 2 === 0,
            message: `expected ${actual} ${actual % 2 === 0 ? "not " : ""}to be even`,
          };
        },
      };
    },
  });
});

expect(4).toBeEven();
```

---

## 9. Puppeteer

Puppeteer is Google's Node.js library for controlling headless Chrome/Chromium via the Chrome DevTools Protocol.

### Installation

```bash
# Bundles Chromium (~170MB)
npm install puppeteer

# Bring your own browser
npm install puppeteer-core
```

### Page Manipulation

```javascript
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigation
  await page.goto("https://example.com", { waitUntil: "networkidle2" });

  // Set viewport
  await page.setViewport({ width: 1920, height: 1080 });

  // Click
  await page.click("button.submit");

  // Type
  await page.type("input[name='email']", "user@example.com");

  // Select
  await page.select("select#country", "US");

  // Evaluate JavaScript in page
  const title = await page.evaluate(() => document.title);

  // Wait for selector
  await page.waitForSelector(".dynamic-content");

  // Get text content
  const text = await page.$eval("h1", (el) => el.textContent);

  // Multiple elements
  const items = await page.$$eval("li", (els) =>
    els.map((el) => el.textContent)
  );

  await browser.close();
})();
```

### Screenshots

```javascript
// Basic screenshot
await page.screenshot({ path: "screenshot.png" });

// Full page
await page.screenshot({ path: "full.png", fullPage: true });

// Specific element
const element = await page.$(".header");
await element.screenshot({ path: "header.png" });

// Clipped region
await page.screenshot({
  path: "clipped.png",
  clip: { x: 0, y: 0, width: 500, height: 300 },
});

// Retina quality
await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });
await page.screenshot({ path: "retina.png" });

// JPEG with quality
await page.screenshot({ path: "photo.jpg", type: "jpeg", quality: 80 });
```

### PDF Generation

```javascript
await page.goto("https://example.com", { waitUntil: "networkidle2" });

await page.pdf({
  path: "document.pdf",
  format: "A4",
  printBackground: true,
  margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
  headerTemplate: "<div style='font-size:8px;text-align:center'>Header</div>",
  footerTemplate: "<div style='font-size:8px;text-align:center'>Page <span class='pageNumber'></span></div>",
  displayHeaderFooter: true,
});

// Only works in headless mode
```

### Browser Launch Options

```javascript
const browser = await puppeteer.launch({
  headless: "new",          // or true, false for visible
  slowMo: 50,               // Slow down operations by 50ms
  devtools: true,           // Open DevTools
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--window-size=1920,1080",
  ],
  executablePath: "/path/to/chrome", // Custom Chrome path
});
```

---

## 10. Test Doubles

Test doubles are objects that replace real dependencies during testing. The term comes from Gerard Meszaros (xUnit Test Patterns).

### The Five Types

```
Test Double (umbrella term)
  |
  +-- Dummy Object    - Passed but never used
  +-- Test Stub       - Returns canned answers (state verification)
  +-- Test Spy        - Records how it was called
  +-- Mock Object     - Pre-programmed with expectations (behavior verification)
  +-- Fake Object     - Working implementation, not suitable for production
```

### 1. Dummy Object

Passed to satisfy method signatures but **never actually used** in the test.

```javascript
class DummyLogger {
  log(message) {}
  error(message) {}
}

test("user creation", () => {
  const dummyLogger = new DummyLogger();
  const service = new UserService(dummyLogger);
  // Logger is never called or asserted upon
  expect(service.validateEmail("test@example.com")).toBe(true);
});
```

### 2. Test Stub

Returns **pre-programmed (canned) responses**. Used for **state verification** - checking the output, not how the function got there.

```javascript
// In Jest
const stub = jest.fn().mockReturnValue("canned response");

// In Sinon
const stub = sinon.stub();
stub.withArgs("user-123").returns({ id: "user-123", name: "John" });
stub.withArgs("user-456").returns(null);

// Usage
const result = stub("user-123");
expect(result.name).toBe("John");
```

### 3. Test Spy

**Records calls** made to it for later verification. You can check what arguments were passed, how many times it was called, etc.

```javascript
// Jest spy
const spy = jest.spyOn(service, "log");

// Use the code under test
service.doSomething();

// Verify
expect(spy).toHaveBeenCalledWith("action completed");
expect(spy).toHaveBeenCalledTimes(1);

// Sinon spy
const spy = sinon.spy();
obj.method(spy);
expect(spy.calledOnce).toBe(true);
```

### 4. Mock Object

Like a spy, but with **pre-programmed expectations**. If expectations aren't met, the test fails. Used for **behavior verification**.

```javascript
// Jest - using jest.fn with expectations
const mockRepo = {
  save: jest.fn().mockResolvedValue({ id: 1 }),
  findById: jest.fn().mockResolvedValue(null),
};

const service = new UserService(mockRepo);
await service.createUser("John");

// Verify interactions
expect(mockRepo.save).toHaveBeenCalledTimes(1);
expect(mockRepo.save).toHaveBeenCalledWith(
  expect.objectContaining({ name: "John" })
);

// Sinon mock
const mock = sinon.mock(repo);
mock.expects("save").once().withArgs(sinon.match.object);
// ... run code ...
mock.verify();    // Throws if expectations not met
mock.restore();
```

### 5. Fake Object

A **working implementation** that is simplified/optimized for testing - not production-ready.

```javascript
class InMemoryUserRepo {
  constructor() {
    this.users = new Map();
  }

  save(user) {
    this.users.set(user.id, { ...user });
    return Promise.resolve(user);
  }

  findById(id) {
    return Promise.resolve(this.users.get(id) || null);
  }

  delete(id) {
    this.users.delete(id);
    return Promise.resolve();
  }
}

// Usage in tests
const fakeRepo = new InMemoryUserRepo();
const service = new UserService(fakeRepo);
```

### Best Practices

- Use the **simplest double** that meets your need (dummy > stub > spy > mock)
- Keep test double logic **minimal** - avoid complexity that itself needs testing
- Focus on **behavior, not implementation details**
- Clean up after tests to prevent state leakage
- When in doubt, prefer stubs over mocks (less brittle tests)

---

## 11. Code Coverage

Code coverage measures what percentage of your codebase is executed during tests. It reveals gaps in your test suite.

### Types of Coverage

| Metric | What It Measures |
|--------|-----------------|
| **Statement Coverage** | Which executable statements were run |
| **Branch Coverage** | Which branches of conditionals (if/else) were taken |
| **Function Coverage** | Which functions/methods were called |
| **Line Coverage** | Which lines of code were executed |

### Example

```javascript
// calculator.ts
function calculate(op, a, b) {         // Line 1
  if (op === "+") {                    // Line 2 (Branch 1)
    return a + b;                      // Line 3
  } else if (op === "-") {             // Line 4 (Branch 2)
    return a - b;                      // Line 5
  } else if (op === "*") {             // Line 6 (Branch 3)
    return a * b;                      // Line 7
  } else {                             // Line 8 (Branch 4)
    return null;                       // Line 9
  }                                    // Line 10
}                                      // Line 11

// Test: calculate('+', 1, 2) and calculate('-', 5, 3)
// Statement coverage: 7/11 = 63%
// Branch coverage: 2/4 = 50%
// Function coverage: 1/1 = 100%
// Line coverage: 7/11 = 63%
```

### Coverage Report

```
-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------|---------|----------|---------|---------|-------------------
All files  |   76.92 |    71.42 |      50 |   76.92 |
 calc.ts   |   76.92 |    71.42 |      50 |   76.92 | 4,16-17
-----------|---------|----------|---------|---------|-------------------
```

### Coverage Tools

| Tool | Language | Notes |
|------|----------|-------|
| **Jest --coverage** | JS/TS | Built-in (uses Istanbul/v8) |
| **Vitest coverage** | JS/TS | V8 or Istanbul provider |
| **nyc (Istanbul)** | JS/TS | CLI coverage tool |
| **c8** | JS/TS | V8 native coverage |
| **JaCoCo** | Java | Industry standard |
| **coverage.py** | Python | |

### Coverage Thresholds (Jest)

```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    // Per-file thresholds
    "./src/critical.js": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
```

### Best Practices

- **80% is the sweet spot** - beyond 85%, cost increases while benefit diminishes
- **Branch coverage is most meaningful** - reveals whether both happy/error paths are tested
- **Tier by criticality**: Payment/auth code needs 90%+, UI components 60-70%
- **Coverage is necessary but not sufficient** - high coverage doesn't guarantee absence of bugs
- **Use coverage to find untested code**, not as a vanity metric
- **Exclude generated code** and test utilities from coverage calculations
- **Integrate with CI/CD** to enforce thresholds on every pull request


---

## 12. TDD (Red-Green-Refactor)

Test-Driven Development is a design technique where you write tests before implementation code. The cycle is: Red -> Green -> Refactor.

### The Cycle

```
flowchart LR
    R[Red: Write a failing test] --> G[Green: Simplest code to pass]
    G --> RF[Refactor: Improve design, tests still green]
    RF --> R
```

### Step 1: Red - Write a Failing Test

Write a test for the next small behavior. Run it. Watch it fail for the *right reason* (actual missing behavior, not a typo).

```javascript
// Write test first
test("calculates total with tax", () => {
  const total = calculateTotal(100, 0.1);
  expect(total).toBe(110);
});
// Run: FAILS (function doesn't exist yet)
```

### Step 2: Green - Simplest Code to Pass

Write the **minimum** code to make the test pass. Hardcode if necessary. Don't solve future tests.

```javascript
// Implementation
function calculateTotal(subtotal, taxRate) {
  return subtotal + subtotal * taxRate;
}
// Run: PASSES
```

### Step 3: Refactor - Improve Design

Clean up code, eliminate duplication, improve names. Tests stay green throughout.

```javascript
// Refactored
function calculateTotal(subtotal, taxRate) {
  const tax = subtotal * taxRate;
  return Math.round((subtotal + tax) * 100) / 100;
}
// Run: STILL PASSES
```

### Triangulation

Kent Beck's rule: don't generalize from one example.

```javascript
// Test 1: hardcode
test("sums one number", () => expect(sum([1])).toBe(1));
// Implementation: function sum(xs) { return 1; }

// Test 2: see pattern, generalize
test("sums two numbers", () => expect(sum([1, 2])).toBe(3));
// Implementation: function sum(xs) { return xs[0] + (xs[1] ?? 0); }

// Test 3: refactor to general case
test("sums many numbers", () => expect(sum([1, 2, 3])).toBe(6));
// Implementation: function sum(xs) { return xs.reduce((a, b) => a + b, 0); }
```

### Outside-In TDD (London School)

Start at the system boundary (HTTP endpoint, UI) and work inward:

1. Write test for user-facing behavior (API endpoint)
2. Mock collaborators that don't exist yet (each mock = TODO for next layer)
3. Implement the collaborator, mocking the next layer down
4. Repeat until leaf functions are reached

### Inside-Out TDD (Chicago School)

Start from leaf functions and build upward:

1. Write test for smallest, most isolated function
2. Implement it
3. Write test for the function that uses it
4. Repeat until you reach the system boundary

### TDD Best Practices

- **Small steps**: One test, one behavior, one assertion per test
- **Run tests frequently**: After every small change
- **Commit after Green and Refactor**: Both are stable points
- **Don't skip Refactor**: Delivery pressure makes this tempting but dangerous
- **Name tests by behavior**: "calculates total" not "test1"
- **Test one thing per test**: If a test name has "and", split it

---

## 13. BDD (Given-When-Then)

Behavior-Driven Development extends TDD by writing tests in a language that non-technical stakeholders can understand.

### Gherkin Syntax

```gherkin
Feature: Shopping Cart
  As a customer
  I want to manage items in my shopping cart
  So that I can purchase products online

  Scenario: Add item to cart
    Given I am on the product page
    When I click "Add to Cart" for product "Laptop"
    Then the item "Laptop" should be in my cart
    And the cart total should show "$999.99"

  Scenario: Remove item from cart
    Given I have "Laptop" in my cart
    When I click "Remove" for item "Laptop"
    Then the item "Laptop" should not be in my cart

  Scenario Outline: Login validation
    Given I am on the login page
    When I enter username "<username>" and password "<password>"
    Then I should see "<message>"

    Examples:
      | username | password  | message              |
      | admin    | pass123   | Welcome back!        |
      | admin    | wrong     | Invalid credentials  |
      |          | pass123   | Username is required |
```

### Steps in BDD

1. **Discovery**: Business, QA, and devs discuss requirements
2. **Formulation**: Write scenarios in Gherkin (Given-When-Then)
3. **Automation**: Implement step definitions that execute the scenarios

### Step Definitions (JavaScript with Cucumber.js)

```javascript
const { Given, When, Then } = require("@cucumber/cucumber");

Given("I am on the product page", async function () {
  await this.page.goto("/products");
});

When('I click "Add to Cart" for product {string}', async function (productName) {
  await this.page.click(`[data-product="${productName}"]`);
});

Then('the item {string} should be in my cart', async function (productName) {
  const cart = await this.page.textContent(".cart-items");
  expect(cart).toContain(productName);
});
```

### BDD with Jest (Describe Blocks)

```javascript
// Using describe/it as BDD-style tests
describe("Shopping Cart", () => {
  describe("when adding an item", () => {
    given("an empty cart", () => { cart = new Cart(); });
    when("adding a laptop", () => { cart.add(laptop); });
    then("cart should contain 1 item", () => {
      expect(cart.count).toBe(1);
    });
    then("cart total should be $999.99", () => {
      expect(cart.total).toBe(999.99);
    });
  });
});
```

### BDD vs TDD

| Aspect | TDD | BDD |
|--------|-----|-----|
| **Focus** | Code correctness | System behavior |
| **Audience** | Developers | Everyone (dev, QA, business) |
| **Syntax** | test/it/describe | Given-When-Then (Gherkin) |
| **Scope** | Unit level | Any level (unit to E2E) |
| **Tools** | Jest, Vitest | Cucumber, SpecFlow, Behave |

---

## 14. Property-Based Testing

Property-based testing generates hundreds of random inputs to verify that your code satisfies certain properties (invariants) regardless of the input.

### fast-check (JavaScript)

```bash
npm install --save-dev fast-check
```

### Basic Example

```javascript
import * as fc from "fast-check";

// Instead of testing specific cases, define properties
test("reverse of reverse is original", () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (arr) => {
      const reversed = [...arr].reverse().reverse();
      expect(reversed).toEqual(arr);
    })
  );
});

test("sorting preserves length", () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (arr) => {
      expect([...arr].sort((a, b) => a - b)).toHaveLength(arr.length);
    })
  );
});

test("sorting produces ordered result", () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (arr) => {
      const sorted = [...arr].sort((a, b) => a - b);
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i]).toBeGreaterThanOrEqual(sorted[i - 1]);
      }
    })
  );
});
```

### Custom Arbitraries (Generators)

```javascript
// Generate random strings
fc.string();

// Generate random objects
fc.record({
  name: fc.string({ minLength: 1 }),
  age: fc.integer({ min: 0, max: 150 }),
  email: fc.emailAddress(),
});

// Generate one of multiple values
fc.constantFrom("add", "subtract", "multiply", "divide");

// Array with constraints
fc.array(fc.integer(), { minLength: 1, maxLength: 10 });

// Unique array
fc.uniqueArray(fc.integer());

// Frequency (weighted random)
fc.frequency(
  { weight: 80, value: fc.constant("success") },
  { weight: 20, value: fc.constant("error") }
);
```

### When to Use Property-Based Testing

- Algorithms with clear invariants (sorting, parsing, serialization)
- Boundary value analysis (generates edge cases automatically)
- Finding bugs that example-based tests miss
- Verifying idempotency, commutativity, or other algebraic properties

### Limitations

- Harder to debug when a failure is found (random input)
- Not suitable for UI tests or tests requiring specific sequences
- Best used alongside example-based tests, not as a replacement

---

## 15. Snapshot Testing

Snapshot testing captures the "rendered output" of a component and compares it against a stored reference. If the output changes, the test fails.

### Jest Snapshots

```javascript
// Component snapshot
import renderer from "react-test-renderer";
import MyComponent from "./MyComponent";

test("renders correctly", () => {
  const tree = renderer.create(<MyComponent name="World" />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Inline snapshot (stored in test file)
test("renders correctly", () => {
  const tree = renderer.create(<MyComponent name="World" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div class="greeting">
      Hello, World!
    </div>
  `);
});
```

### Vitest Snapshots

```typescript
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import MyComponent from "./MyComponent";

test("renders correctly", () => {
  const { container } = render(<MyComponent name="World" />);
  expect(container).toMatchSnapshot();
});
```

### Managing Snapshots

```bash
# Update snapshots (when behavior intentionally changed)
npx jest -u
npx vitest --update

# Delete outdated snapshots
npx jest --updateSnapshot --clean
```

### When Snapshots Help

- Catching unexpected UI changes in components
- Tracking changes to large objects or data structures
- API response format validation
- Complex configuration objects

### When Snapshots Hurt

- Large, unreadable snapshots that no one reviews
- Frequent changes requiring constant updates ("snapshot fatigue")
- Testing implementation details rather than behavior
- Snapshots that always pass (no one checks updates)

### Best Practices

- Keep snapshots small and meaningful
- Review snapshot diffs carefully during code review
- Use inline snapshots for simple values
- Prefer behavioral tests over snapshot tests when possible

---

## 16. Visual Regression Testing

Visual regression testing detects unintended visual changes in your UI by comparing screenshots across versions.

### Playwright Screenshot Comparison

```typescript
import { test, expect } from "@playwright/test";

test("homepage looks correct", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("homepage.png");

  // With options
  await expect(page).toHaveScreenshot("homepage-full.png", {
    fullPage: true,
    maxDiffPixelRatio: 0.01,   // Allow 1% difference
    threshold: 0.2,            // Per-pixel color difference threshold
  });
});

// Element screenshot
test("button looks correct", async ({ page }) => {
  await page.goto("/");
  const button = page.getByRole("button", { name: "Submit" });
  await expect(button).toHaveScreenshot("submit-button.png");
});
```

### Percy (Visual Testing Service)

```bash
npm install --save-dev @percy/cli @percy/cypress
# or
npm install --save-dev @percy/cli @percy/playwright
```

```javascript
// Percy + Cypress
import Percy from "@percy/cypress";

describe("Visual Tests", () => {
  it("captures homepage", () => {
    cy.visit("/");
    cy.percySnapshot("Homepage");
  });
});

// Percy + Playwright
import { percySnapshot } from "@percy/playwright";

test("homepage visual test", async ({ page }) => {
  await page.goto("/");
  await percySnapshot(page, "Homepage");
});
```

### Chromatic (Storybook Visual Testing)

```bash
npm install --save-dev chromatic
npx chromatic --project-token=YOUR_TOKEN
```

- Automatically snapshots every Storybook story
- Visual diff in web UI
- Integrates with GitHub PRs

### Applitools Eyes

```javascript
// Applitools with Cypress
cy.eyesOpen({ appName: "My App", testName: "Login" });
cy.visit("/login");
cy.eyesCheckWindow("Login Page");
cy.eyesClose();
```

### Best Practices

- **Set reasonable thresholds**: Pixel-perfect comparison causes false positives
- **Test critical paths only**: Visual tests are expensive
- **Use responsive snapshots**: Test multiple viewport sizes
- **Exclude dynamic content**: Timestamps, random data, animations
- **Review diffs carefully**: Don't blindly approve visual changes

---

## 17. API Testing

### Supertest (Testing HTTP Servers)

```bash
npm install --save-dev supertest
```

```javascript
const request = require("supertest");
const app = require("../app");

describe("GET /api/users", () => {
  it("returns all users", async () => {
    const res = await request(app)
      .get("/api/users")
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("returns 401 without auth", async () => {
    await request(app)
      .get("/api/users")
      .expect(401);
  });
});

describe("POST /api/users", () => {
  it("creates a user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "John", email: "john@test.com" })
      .set("Authorization", "Bearer fake-token")
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("John");
  });

  it("returns 400 for invalid data", async () => {
    await request(app)
      .post("/api/users")
      .send({ name: "" })
      .expect(400);
  });
});

// Testing file uploads
describe("POST /api/upload", () => {
  it("uploads a file", async () => {
    const res = await request(app)
      .post("/api/upload")
      .attach("file", Buffer.from("test content"), "test.txt")
      .expect(200);

    expect(res.body.filename).toBe("test.txt");
  });
});
```

### MSW (Mock Service Worker)

```bash
npm install --save-dev msw
npx msw init public/ --save    # Creates service worker file
```

```javascript
// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
  // Mock GET request
  http.get("/api/users", () => {
    return HttpResponse.json([
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ]);
  }),

  // Mock POST request
  http.post("/api/users", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      { id: 3, ...body },
      { status: 201 }
    );
  }),

  // Mock with URL params
  http.get("/api/users/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ id, name: "John" });
  }),

  // Mock error response
  http.get("/api/errors", () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }),

  // Mock delayed response
  http.get("/api/slow", async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return HttpResponse.json({ data: "slow response" });
  }),
];

// src/mocks/browser.js
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
```

```javascript
// Setup in test file (Jest/Vitest)
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// In test
test("fetches users", async () => {
  const users = await fetchUsers();
  expect(users).toHaveLength(2);
});

// Override handler for specific test
test("handles error", async () => {
  server.use(
    http.get("/api/users", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  await expect(fetchUsers()).rejects.toThrow("Server error");
});
```


---

## 18. Performance Testing

### Lighthouse CI

```bash
npm install -D @lhci/cli
```

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000"],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.8 }],
        "categories:accessibility": ["warn", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["warn", { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: "lhci",
      serverBaseUrl: "https://your-lhci-server.com",
    },
  },
};
```

```bash
# Run
npx lhci autorun
npx lhci collect   # Just collect
npx lhci assert    # Just assert
npx lhci upload    # Just upload
```

### k6 (Load Testing)

```bash
# Install k6
# macOS: brew install k6
# Linux: sudo snap install k6
```

```javascript
// load-test.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 20 },   // Ramp up to 20 users
    { duration: "1m", target: 20 },    // Stay at 20 users
    { duration: "30s", target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],  // 95% of requests under 500ms
    http_req_failed: ["rate<0.01"],    // Less than 1% failure rate
  },
};

export default function () {
  const res = http.get("https://api.example.com/users");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 500ms": (r) => r.timings.duration < 500,
    "has correct content type": (r) =>
      r.headers["Content-Type"].includes("application/json"),
  });

  sleep(1);
}
```

```bash
k6 run load-test.js
k6 run --out json=results.json load-test.js
```

### WebPageTest

- Free public instance: https://www.webpagetest.org
- Run tests from multiple global locations
- Measures: First Contentful Paint (FCP), Largest Contentful Paint (LCP), Total Blocking Time (TBT), Cumulative Layout Shift (CLS), Time to First Byte (TTFB)
- API available for automated testing

### Web Vitals

```bash
npm install web-vitals
```

```javascript
import { onLCP, onFID, onCLS } from "web-vitals";

function sendToAnalytics({ name, delta, id }) {
  console.log(`${name}: ${delta} (${id})`);
}

onLCP(sendToAnalytics);   // Largest Contentful Paint
onFID(sendToAnalytics);   // First Input Delay
onCLS(sendToAnalytics);   // Cumulative Layout Shift
```

---

## 19. Security Testing

### OWASP ZAP (Zed Attack Proxy)

```bash
# Docker
docker run -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py \
  -t https://your-app.com \
  -r report.html

# Docker with full scan
docker run -t ghcr.io/zaproxy/zaproxy:stable zap-full-scan.py \
  -t https://your-app.com \
  -r report.html
```

```javascript
// ZAP API testing
const ZapClient = require("zaproxy");

const zap = new ZapClient({ apiKey: "your-api-key" });

// Spider the application
await zap.spider.scan("https://your-app.com");

// Active scan
await zap.ascan.scan("https://your-app.com");

// Get alerts
const alerts = await zap.core.alerts("https://your-app.com");
```

### Snyk (Dependency Scanning)

```bash
# Install
npm install -g snyk

# Authenticate
snyk auth

# Test for vulnerabilities
snyk test

# Monitor project
snyk monitor

# CI/CD integration
snyk test --severity-threshold=high
```

### Additional Security Testing

- **npm audit**: Built-in Node.js vulnerability scanning
- **ESLint Security Plugin**: `eslint-plugin-security`
- **Helmet.js**: Security headers for Express apps
- **OWASP Dependency-Check**: Identifies project dependencies with known vulnerabilities

---

## 20. Accessibility Testing

### axe-core (Automated a11y Testing)

```bash
npm install --save-dev axe-core
```

```javascript
// Standalone
const axe = require("axe-core");

// In browser environment
const results = await axe.run(document);
results.violations.forEach(violation => {
  console.error(`[${violation.impact}] ${violation.description}`);
  violation.nodes.forEach(node => {
    console.error(`  Element: ${node.html}`);
    console.error(`  Fix: ${node.failureSummary}`);
  });
});
```

### jest-axe (Jest + axe-core)

```bash
npm install --save-dev jest-axe
```

```javascript
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

test("component has no accessibility violations", async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Cypress + axe (cypress-axe)

```bash
npm install --save-dev cypress-axe axe-core
```

```javascript
// Custom command
Cypress.Commands.add("checkA11y", () => {
  cy.injectAxe();
  cy.checkA11y(null, {
    runOnly: {
      type: "tag",
      values: ["wcag2a", "wcag2aa"],
    },
  });
});

// In tests
describe("Accessibility", () => {
  it("homepage passes a11y audit", () => {
    cy.visit("/");
    cy.checkA11y();
  });

  it("login form passes a11y audit", () => {
    cy.visit("/login");
    cy.checkA11y();
  });
});
```

### Playwright + axe

```typescript
import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

test("page has no accessibility violations", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

### Lighthouse Accessibility

```bash
npx lighthouse https://your-app.com --only-categories=accessibility
```

- Scores accessibility from 0-100
- Checks: ARIA attributes, color contrast, heading order, form labels, etc.

### Manual Accessibility Testing Checklist

- [ ] Keyboard navigation works (Tab, Shift+Tab, Enter, Escape)
- [ ] Screen reader announces content correctly (NVDA, VoiceOver)
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)
- [ ] Focus indicators are visible
- [ ] Images have meaningful alt text
- [ ] Form inputs have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Page has proper heading hierarchy (h1 -> h2 -> h3)
- [ ] Interactive elements are large enough (44x44px minimum)
- [ ] No content relies solely on color to convey meaning

---

## 21. E2E Testing Patterns and Best Practices

### Core Principles

1. **Test user journeys, not implementation details** - Test what users do, not how the code works
2. **Keep tests independent** - Each test should set up its own state and not depend on other tests
3. **Use data-testid or data-cy attributes** - For stable element selection
4. **Avoid hardcoded waits** - Use auto-waiting mechanisms instead
5. **Mock external services** - When testing UI, mock APIs for speed and reliability

### Page Object Model

```javascript
// Page objects encapsulate page interactions
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator("[data-testid='email']");
    this.passwordInput = page.locator("[data-testid='password']");
    this.submitButton = page.locator("[data-testid='submit']");
    this.errorMessage = page.locator("[data-testid='error']");
  }

  async navigate() {
    await this.page.goto("/login");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getError() {
    return this.errorMessage.textContent();
  }
}
```

### Test Data Management

```javascript
// Use fixtures for test data
cy.fixture("users").then((users) => {
  cy.visit("/login");
  cy.get("input[name='username']").type(users.validUser.username);
});

// Create test data via API before tests
beforeEach(() => {
  cy.request("POST", "/api/test-data/seed", { fixtures: ["users", "products"] });
});

// Clean up after tests
afterEach(() => {
  cy.request("DELETE", "/api/test-data/cleanup");
});
```

### Handling Authentication

```javascript
// Option 1: Login via UI (slowest, most realistic)
cy.visit("/login");
cy.get("input[name='username']").type("user");
cy.get("input[name='password']").type("pass");
cy.get("button[type='submit']").click();

// Option 2: Login via API (faster)
cy.request("POST", "/api/auth/login", {
  username: "user",
  password: "pass",
}).then((response) => {
  window.localStorage.setItem("token", response.body.token);
});

// Option 3: Set cookies/session directly (fastest)
cy.setCookie("session", "valid-session-id");
```

### Common Anti-Patterns

```javascript
// BAD: Testing implementation details
cy.get("div.form-container > div.input-wrapper > input[type='text']");

// GOOD: Using semantic selectors
cy.get("[data-testid='email-input']");
cy.getByRole("textbox", { name: "Email" });

// BAD: Hardcoded waits
cy.wait(5000);

// GOOD: Wait for specific condition
cy.get(".loading").should("not.exist");
cy.intercept("**/api/data").as("getData");
cy.wait("@getData");

// BAD: Tests that depend on each other
it("creates user", () => { /* creates user */ });
it("deletes user", () => { /* assumes user exists */ });

// GOOD: Independent tests
it("creates and deletes user", () => {
  cy.request("POST", "/api/users", userData);
  cy.request("DELETE", `/api/users/${userId}`);
});
```

---

## 22. Test Organization

### describe/it Blocks

```javascript
// Group related tests
describe("Calculator", () => {
  describe("addition", () => {
    it("adds positive numbers", () => {});
    it("adds negative numbers", () => {});
    it("adds zero", () => {});
  });

  describe("subtraction", () => {
    it("subtracts positive numbers", () => {});
    it("subtracts negative numbers", () => {});
  });
});
```

### Test File Structure

```
src/
  components/
    Button/
      Button.tsx
      Button.test.tsx        # Tests next to source
      Button.module.css
  utils/
    formatDate.ts
    formatDate.test.ts
  hooks/
    useCounter.ts
    useCounter.test.ts
```

### Naming Conventions

```javascript
// File names: [name].test.[ext] or [name].spec.[ext]
// Button.test.tsx
// formatDate.test.ts
// useCounter.spec.ts

// Test descriptions: should [expected behavior] when [condition]
it("should display error message when email is invalid", () => {});
it("should return formatted date when given valid input", () => {});
it("should increment count when increment button is clicked", () => {});
```

### Co-location vs Separate Test Directory

```javascript
// Co-location (preferred for unit tests)
// src/utils/formatDate.ts
// src/utils/formatDate.test.ts

// Separate directory (common for integration/e2e tests)
// src/utils/formatDate.ts
// tests/integration/formatDate.test.ts
// tests/e2e/calendar.test.ts
```

### Test Pyramid File Organization

```
tests/
  unit/                    # Fast, isolated tests
    utils/
    hooks/
    components/
  integration/             # Component interaction tests
    api/
    pages/
  e2e/                     # Full user journey tests
    login.cy.ts
    checkout.cy.ts
    registration.cy.ts
```

---

## 23. CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run typecheck

      - name: Lint
        run: npm run lint

      - name: Unit tests
        run: npm run test:unit -- --coverage

      - name: Integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test

      - name: E2E tests
        run: npm run test:e2e

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info

      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
          configPath: ./lighthouserc.js
```

### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - test
  - deploy

test:
  stage: test
  image: node:18
  services:
    - postgres:13
  variables:
    POSTGRES_DB: test
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres
  script:
    - npm ci
    - npm run typecheck
    - npm run lint
    - npm run test:unit -- --coverage
    - npm run test:integration
    - npm run test:e2e
  coverage: '/Lines\s*:\s*(\d+\.?\d*)%/'

e2e:
  stage: test
  image: mcr.microsoft.com/playwright:v1.40.0
  script:
    - npm ci
    - npx playwright install --with-deps
    - npx playwright test
  artifacts:
    when: on_failure
    paths:
      - test-results/
      - playwright-report/
```

---

## 24. Test-Driven Development Workflow

### Complete TDD Workflow

```
1. Write a failing test (RED)
   - Describe the behavior you want
   - Run the test, confirm it fails
   - Failure should be for the right reason

2. Write minimal code to pass (GREEN)
   - Implement just enough for the test to pass
   - Hardcode if necessary
   - Don't write more than needed

3. Refactor
   - Remove duplication
   - Improve names
   - Simplify logic
   - Run tests to confirm nothing broke

4. Repeat
```

### TDD with React Components

```javascript
// Step 1: RED - Write failing test
test("displays user name", () => {
  render(<UserProfile name="John" />);
  expect(screen.getByText("John")).toBeInTheDocument();
});
// FAIL: Component doesn't exist

// Step 2: GREEN - Minimal implementation
function UserProfile({ name }) {
  return <div>{name}</div>;
}
// PASS

// Step 3: RED - Next behavior
test("displays user email", () => {
  render(<UserProfile name="John" email="john@test.com" />);
  expect(screen.getByText("john@test.com")).toBeInTheDocument();
});
// FAIL

// Step 4: GREEN - Add email
function UserProfile({ name, email }) {
  return (
    <div>
      <span>{name}</span>
      <span>{email}</span>
    </div>
  );
}
// PASS

// Step 5: REFACTOR
function UserProfile({ name, email }) {
  return (
    <div className="user-profile">
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}
// STILL PASS
```

### TDD with API Routes

```javascript
// Step 1: RED - Write failing test
test("GET /api/users returns all users", async () => {
  const res = await request(app).get("/api/users").expect(200);
  expect(res.body).toBeInstanceOf(Array);
});
// FAIL: Route doesn't exist

// Step 2: GREEN - Minimal route
app.get("/api/users", (req, res) => {
  res.json([]);
});
// PASS

// Step 3: RED - Test with data
test("GET /api/users returns seeded users", async () => {
  await db.seed();
  const res = await request(app).get("/api/users").expect(200);
  expect(res.body.length).toBeGreaterThan(0);
});
// FAIL

// Step 4: GREEN - Fetch from database
app.get("/api/users", async (req, res) => {
  const users = await db.query("SELECT * FROM users");
  res.json(users);
});
// PASS

// Step 5: REFACTOR - Extract service layer
app.get("/api/users", async (req, res) => {
  const users = await UserService.getAll();
  res.json(users);
});
```

---

## 25. Mocking Modules, HTTP Requests, Timers, localStorage

### Mocking Modules

```javascript
// Jest
jest.mock("./database", () => ({
  connect: jest.fn(),
  query: jest.fn().mockResolvedValue([{ id: 1, name: "John" }]),
  disconnect: jest.fn(),
}));

// Vitest
vi.mock("./database", () => ({
  connect: vi.fn(),
  query: vi.fn().mockResolvedValue([{ id: 1, name: "John" }]),
  disconnect: vi.fn(),
}));

// Partial mock (keep some real implementation)
jest.mock("./api", () => ({
  ...jest.requireActual("./api"),
  fetchUsers: jest.fn().mockResolvedValue([]),
}));
```

### Mocking HTTP Requests

```javascript
// Jest/Vitest - using fetch mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: "mocked" }),
    ok: true,
    status: 200,
  })
);

// Or using MSW (recommended)
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  http.get("/api/users", () => {
    return HttpResponse.json([{ id: 1, name: "John" }]);
  })
);

// Or using nock
const nock = require("nock");
nock("https://api.example.com")
  .get("/users")
  .reply(200, [{ id: 1, name: "John" }]);

// Or using axios-mock-adapter
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(axios);
mock.onGet("/api/users").reply(200, [{ id: 1, name: "John" }]);
```

### Mocking Timers

```javascript
// Jest
jest.useFakeTimers();

test("calls callback after 1 second", () => {
  const callback = jest.fn();
  setTimeout(callback, 1000);

  jest.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalledTimes(1);
});

test("calls interval callback", () => {
  const callback = jest.fn();
  setInterval(callback, 1000);

  jest.advanceTimersByTime(3000);
  expect(callback).toHaveBeenCalledTimes(3);
});

jest.useRealTimers();

// Vitest
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
vi.useRealTimers();
```

### Mocking localStorage

```javascript
// Method 1: Manual mock
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    removeItem: jest.fn((key) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Method 2: Before each test
beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("user", JSON.stringify({ name: "John" }));
});

test("reads user from localStorage", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  expect(user.name).toBe("John");
});

test("saves data to localStorage", () => {
  localStorage.setItem("token", "abc123");
  expect(localStorage.setItem).toHaveBeenCalledWith("token", "abc123");
});

// Method 3: jest-localstorage-mock (npm package)
// Automatically mocks localStorage and sessionStorage
```

### Mocking window.location

```javascript
// Mock window.location
delete window.location;
window.location = { href: "http://localhost:3000" };

// Mock specific properties
Object.defineProperty(window, "location", {
  value: {
    href: "http://localhost:3000",
    pathname: "/login",
    search: "?return=/dashboard",
    assign: jest.fn(),
  },
  writable: true,
});
```

### Mocking window.matchMedia

```javascript
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

### Mocking IntersectionObserver

```javascript
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});

window.IntersectionObserver = mockIntersectionObserver;
```

### Mocking window.scrollTo

```javascript
window.scrollTo = jest.fn();
Object.defineProperty(window, "scrollTo", {
  value: jest.fn(),
  writable: true,
});
```

---

## Quick Reference: Choosing the Right Tool

| Need | Tool |
|------|------|
| Unit tests (JS/TS) | Jest or Vitest |
| React component tests | React Testing Library + Jest/Vitest |
| API/server integration tests | Supertest + MSW |
| E2E tests (simple setup) | Cypress |
| E2E tests (cross-browser) | Playwright |
| Visual regression | Playwright screenshots, Percy, Chromatic |
| Load testing | k6 |
| Accessibility | axe-core, jest-axe, Lighthouse |
| Security scanning | Snyk, OWASP ZAP |
| Performance monitoring | Lighthouse CI, Web Vitals |
| Mock HTTP requests | MSW (Mock Service Worker) |
| Property-based testing | fast-check |
| Test doubles | jest.fn/mock/spyOn or vitest vi.fn/mock/spyOn |

---

*Research compiled from official documentation and multiple authoritative sources. Last updated: July 2026.*
