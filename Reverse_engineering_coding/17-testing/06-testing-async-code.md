# Chapter 6 — Testing Asynchronous Code

## Callbacks

```javascript
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

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What happens if `done` is never called in a callback test? | Jest times out after 5000ms |
| Do you need to `return` promises in tests? | Yes, unless you use `async/await` |
| What does `.resolves` do? | Unwraps a fulfilled promise for assertion |
| Can you chain `.resolves` with other matchers? | Yes: `expect(promise).resolves.toEqual(value)` |
## Next Steps

[Back to Chapter 5](05-vitest.md): Chapter 5 — Vitest
[Proceed to Chapter 7](07-dom-testing.md): Chapter 7 — DOM Testing to learn about chapter 7 — dom testing.
