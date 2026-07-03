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

## Locators

```javascript
await page.getByRole("button", { name: "Submit" }).click();
await page.getByLabel("Email").fill("alice@example.com");
await page.getByPlaceholder("Enter your name").fill("Alice");
await page.getByTestId("user-profile").isVisible();
await page.getByText("Welcome back").isVisible();
await page.locator("nav a").first().click();
```

## Assertions

```javascript
await expect(page).toHaveTitle("My App");
await expect(page).toHaveURL("/dashboard");
await expect(page.locator(".error")).toHaveText("Invalid credentials");
await expect(page.locator("button")).toBeEnabled();
await expect(page.locator("img")).toHaveAttribute("src", "/logo.png");
await expect(page.locator("ul li")).toHaveCount(5);
```

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

test("can access profile page", async ({ authenticatedPage, page }) => {
  await page.goto("/profile");
  await expect(page.locator("h1")).toHaveText("Alice's Profile");
});
```

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

test("login via page object", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("alice@example.com", "secure123");
  await expect(page).toHaveURL("/dashboard");
});
```

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

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the advantage of Playwright over jsdom? | Playwright runs in a real browser, testing actual rendering and behavior |
| What does auto-waiting mean? | Playwright waits for elements to be actionable before interacting |
| Why use the Page Object Model? | Encapsulates page logic, reduces duplication in tests |
| What are fixtures in Playwright? | Reusable setup/state shared across tests (like `beforeEach` but more powerful) |
| How do you run Playwright in CI? | Use `npx playwright test --ci` with `retries: 2` and `workers: 1` |
## Next Steps

[Back to Chapter 7](07-dom-testing.md): Chapter 7 — DOM Testing
[Proceed to Chapter 9](09-tdd.md): Chapter 9 — Test-Driven Development (TDD) to learn about chapter 9 — test-driven development (tdd).
