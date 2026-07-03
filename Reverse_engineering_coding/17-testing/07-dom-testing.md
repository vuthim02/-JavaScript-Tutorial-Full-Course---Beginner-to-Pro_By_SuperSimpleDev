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

## @testing-library/react

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

React component:

```jsx
export function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

Test:

```jsx
import { render, screen } from "@testing-library/react";
import { Greeting } from "./Greeting";

test("renders greeting with name", () => {
  render(<Greeting name="Alice" />);
  expect(screen.getByText("Hello, Alice!")).toBeInTheDocument();
});
```

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

## Testing Asynchronous DOM Updates

```javascript
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

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What does jsdom provide? | A browser-like environment in Node.js (document, window, etc.) |
| Why prefer `@testing-library/user-event` over `fireEvent`? | It simulates realistic user interactions (clicks, typing) |
| What is the difference between `getByText` and `findByText`? | `getByText` throws if not found immediately; `findByText` waits up to a timeout |
| What does `toBeInTheDocument()` check? | Whether the element exists in the DOM |
| Why is `@testing-library/jest-dom` useful? | Adds DOM-specific matchers like `toBeVisible`, `toHaveClass`, `toBeDisabled` |
## Next Steps

[Back to Chapter 6](06-testing-async-code.md): Chapter 6 — Testing Asynchronous Code
[Proceed to Chapter 8](08-playwright-e2e.md): Chapter 8 — E2E Testing with Playwright to learn about chapter 8 — e2e testing with playwright.
