# Error Handling Patterns in Functions

<img src="https://media.giphy.com/media/NSzHiAwAcazs7dcDr9/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## `try/catch/finally` Basics

### Syntax

```javascript
try {
    // code that may throw
} catch (error) {
    // handle the error
} finally {
    // always runs (with or without error)
}
```

### Behavior

```javascript
function divide(a, b) {
    try {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    } catch (err) {
        console.error("Error:", err.message);
        return null; // fallback value
    } finally {
        console.log("divide() completed");
    }
}

divide(10, 2); // 5, then "divide() completed"
divide(10, 0); // "Error: Division by zero", null, then "divide() completed"
```

### `finally` Always Runs — Even on Return

```javascript
function demo() {
    try {
        return "from try";
    } catch {
        return "from catch";
    } finally {
        console.log("finally runs"); // ALWAYS runs before the return
    }
}

console.log(demo());
// Output:
// finally runs
// from try
```

---

## Error Propagation in Call Chains

### Errors Propagate Up the Call Stack

```javascript
function a() { b(); }
function b() { c(); }
function c() {
    throw new Error("Boom!");
}

try {
    a();
} catch (err) {
    console.log(err.message); // "Boom!"
}
// Error propagates from c → b → a → try/catch
```

### Catching at Different Levels

```javascript
// Catch at the right level — not too deep, not too shallow

// ❌ Too much nesting
function processUserData(data) {
    try {
        const parsed = JSON.parse(data);
        try {
            const validated = validate(parsed);
            try {
                saveToDB(validated);
            } catch (dbErr) { /* ... */ }
        } catch (valErr) { /* ... */ }
    } catch (parseErr) { /* ... */ }
}

// ✅ Single try/catch — let errors propagate
function processUserData(data) {
    try {
        const parsed = JSON.parse(data);
        const validated = validate(parsed);
        saveToDB(validated);
    } catch (err) {
        if (err instanceof SyntaxError) { /* parse error */ }
        else if (err instanceof ValidationError) { /* validation error */ }
        else { /* db or unknown error */ }
    }
}
```

---

## Custom Error Types

```javascript
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "NetworkError";
        this.statusCode = statusCode;
    }
}

function validateUser(user) {
    if (!user.name) throw new ValidationError("Name is required", "name");
    if (!user.email) throw new ValidationError("Email is required", "email");
    return user;
}

function fetchUser(id) {
    if (id < 0) throw new NetworkError("Invalid ID", 400);
    return { id, name: "Alice" };
}

// Catch specific errors
try {
    validateUser({ name: "Bob" });
    fetchUser(-1);
} catch (err) {
    if (err instanceof ValidationError) {
        console.log(`Validation failed on ${err.field}: ${err.message}`);
    } else if (err instanceof NetworkError) {
        console.log(`Network error (${err.statusCode}): ${err.message}`);
    } else {
        console.log("Unknown error:", err);
    }
}
```

---

## Async Error Handling

### `try/catch` with `async/await`

```javascript
async function fetchWithRetry(url, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            console.log(`Attempt ${attempt} failed: ${err.message}`);
            if (attempt === retries) throw err; // re-throw on last attempt
        }
    }
}

// Caller handles the final error
try {
    const data = await fetchWithRetry("/api/data");
    console.log(data);
} catch (err) {
    console.error("All retries exhausted:", err.message);
}
```

### Unhandled Promise Rejections

```javascript
// ❌ Unhandled — this will log "Unhandled Promise Rejection"
async function bad() {
    throw new Error("Lost error");
}
bad();
// The rejected promise is never handled

// ✅ Always handle or propagate
async function good() {
    try {
        await risky();
    } catch (err) {
        console.error("Handled:", err.message);
    }
}
```

---

## Error Handling in Function Composition

```javascript
const pipe = (...fns) => async (input) => {
    let value = input;
    for (const fn of fns) {
        try {
            value = await fn(value);
        } catch (err) {
            throw new Error(`Pipeline failed at ${fn.name || "anonymous"}: ${err.message}`);
        }
    }
    return value;
};

const parse = (data) => JSON.parse(data);
const validate = (user) => { if (!user.name) throw new Error("Invalid user"); return user; };
const save = async (user) => { /* db save */ };

const processUser = pipe(parse, validate, save);

try {
    await processUser('{"name":"Alice"}');
} catch (err) {
    console.error(err.message); // "Pipeline failed at validate: Invalid user"
}
```

---

## Reverse Engineering Questions

| Question                              | Answer                                              |
|---------------------------------------|-----------------------------------------------------|
| Does `finally` run after `return`?    | Yes — finally runs before the return completes      |
| Can you catch multiple error types?   | Yes — use `instanceof` checks in the catch block    |
| What if catch itself throws?          | The new error propagates up; finally still runs     |
| Should you catch or propagate?        | Catch if you can handle; propagate if not           |
| Can async errors be caught with try/catch? | Yes — if you use `await`                      |
| What are custom error classes for?    | To distinguish error types (validation, network, etc.) |
| How to add context to errors?         | Wrap in a new Error with a descriptive message      |
| What happens to unhandled rejections? | Node logs a warning (future: crash on unhandled)    |
## Next Steps

[Back to Chapter 29](29-method-shorthand-computed-get-set.md): Method Shorthand, Computed Properties, Getters & Setters
[Proceed to Chapter 31](31-optional-chaining-function-calls.md): Optional Chaining & Nullish Coalescing with Functions to learn about optional chaining & nullish coalescing with functions.
