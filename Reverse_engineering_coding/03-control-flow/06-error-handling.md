# 06 — Error Handling: `try`/`catch`/`finally`, Custom Errors, Defensive Programming

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20250915122545914329/error_handling.webp" alt="Animated GIF" style="width:400px; height:300px;">


## The Problem

Errors happen. Without error handling, the program crashes:

```javascript
console.log("Start");
console.log(user.name);   // TypeError: Cannot read properties of undefined
console.log("End");       // never executed — program crashes
```

## `try...catch`

```javascript
try {
    // code that may throw
} catch (error) {
    // handle the error
}
```

The program survives and continues:

```javascript
console.log("Start");

try {
    console.log(user.name);   // throws ReferenceError
} catch (error) {
    console.log("Error caught:", error.message);
}

console.log("End");           // executes normally

// Output:
// Start
// Error caught: user is not defined
// End
```

## The `error` Object

```javascript
try {
    JSON.parse("{invalid}");
} catch (error) {
    console.log(error.name);      // "SyntaxError"
    console.log(error.message);   // "Unexpected token i in JSON at position 0"
    console.log(error.stack);     // stack trace string
}
```

### Error Object Properties

| Property  | Description                    | Example                              |
|-----------|--------------------------------|--------------------------------------|
| `name`    | Type of error                  | `"TypeError"`                        |
| `message` | Human-readable description     | `"Cannot read property 'x' of null"` |
| `stack`   | Call stack at error point      | Multi-line string with trace         |

## `try...catch...finally`

`finally` executes **regardless** of whether an error occurred or was caught:

```javascript
function processFile(filename) {
    let file;
    try {
        file = openFile(filename);    // may throw
        // process file
    } catch (error) {
        console.error("Error:", error.message);
        throw error;                  // re-throw
    } finally {
        if (file) {
            file.close();             // ALWAYS executes — cleanup
        }
    }
}
```

### Execution Flow

```
Case 1: No error
  try → finally → continue

Case 2: Error, caught
  try (error) → catch → finally → continue

Case 3: Error, caught, re-thrown
  try (error) → catch → finally → error propagates

Case 4: Error, not caught
  try (error) → finally → error propagates (catch skipped)
```

### When `finally` Runs (Even on `return`)

```javascript
function test() {
    try {
        return "from try";    // return is deferred
    } finally {
        console.log("finally runs");  // executes BEFORE the return
    }
}

console.log(test());
// Output:
// finally runs
// from try
```

## `throw`

You can throw your own errors:

```javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

try {
    console.log(divide(10, 0));
} catch (error) {
    console.log(error.message); // "Cannot divide by zero"
}
```

### What Can Be Thrown

```javascript
throw new Error("message");         // most common
throw new TypeError("type error");
throw new SyntaxError("syntax");
throw new RangeError("range");
throw "string error";               // works but not recommended
throw 42;                           // not recommended
throw { code: 500, message: "Server error" }; // not recommended
```

**Best practice:** Always throw `Error` instances (or subclasses). They include stack traces.

## Error Types

| Type            | When It Occurs                          | Example                               |
|-----------------|-----------------------------------------|---------------------------------------|
| `Error`         | Generic error (base type)               | `new Error("msg")`                    |
| `SyntaxError`   | Parser failure (catchable only from `eval`) | `eval("if(")`                     |
| `ReferenceError`| Accessing undefined variable            | `console.log(notDefined)`             |
| `TypeError`     | Wrong type operation                    | `null.name`, `5()`                    |
| `RangeError`    | Value out of allowed range              | `new Array(-1)`, stack overflow       |
| `URIError`      | Invalid URI functions                   | `decodeURI("%invalid")`               |

### Custom Error Types

```javascript
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

try {
    throw new ValidationError("Email is required", "email");
} catch(error) {
    if (error instanceof ValidationError) {
        console.log(`Field '${error.field}': ${error.message}`);
    }
}
```

## Optional Catch Binding (ES2019+)

If you don't need the error object, omit it:

```javascript
try {
    JSON.parse(data);
} catch {
    console.log("Invalid JSON");      // no error variable needed
}
```

## `try...catch` Is Synchronous

`try...catch` only works for synchronous errors:

```javascript
// This does NOT work:
try {
    setTimeout(() => {
        throw new Error("Async error");  // not caught by outer try!
    }, 1000);
} catch(e) {
    console.log("Never reached");
}
```

For async errors:
- Promise `.catch()`: `Promise.reject("error").catch(e => console.log(e));`
- `async/await` with `try...catch`:
  ```javascript
  async function run() {
      try {
          await riskyOperation();
      } catch(e) {
          console.log(e);
      }
  }
  ```

## Defensive Programming

Writing code that anticipates invalid inputs, edge cases, and unexpected states.

### Guard Clauses

```javascript
function processUser(user) {
    if (!user) return;
    if (!user.profile) return;
    if (!user.profile.email) return;
    sendEmail(user.profile.email);
}
```

### Type Checking

```javascript
function greet(name) {
    if (typeof name !== "string") {
        throw new TypeError("Expected string for 'name', got " + typeof name);
    }
    console.log("Hello, " + name.toUpperCase());
}
```

### Default Values

```javascript
// With || (replaces falsy values)
function createUser(name, role) {
    return {
        name: name || "Anonymous",
        role: role || "user",
        createdAt: new Date()
    };
}

// Better with nullish coalescing (preserves valid falsy values)
function config(options) {
    return {
        timeout: options.timeout ?? 5000,
        retries: options.retries ?? 3
    };
}
```

### Input Validation

```javascript
function divide(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("Both arguments must be numbers");
    }
    if (b === 0) {
        throw new RangeError("Division by zero");
    }
    return a / b;
}
```

### Boundary Checks

```javascript
function getElement(arr, index) {
    if (!Array.isArray(arr)) {
        throw new TypeError("First argument must be an array");
    }
    if (index < 0 || index >= arr.length) {
        throw new RangeError(`Index ${index} out of bounds (0-${arr.length - 1})`);
    }
    return arr[index];
}
```

### Common Defensive Patterns

```javascript
// Null/undefined check — optional chaining
value?.property

// Nullish coalescing
value ?? defaultValue

// Empty collection check
function processItems(items) {
    if (!items || items.length === 0) {
        return [];
    }
    return items.map(process);
}

// Number validation
function calculateInterest(principal, rate, years) {
    if (!Number.isFinite(principal) || principal <= 0) {
        throw new RangeError("Principal must be a positive finite number");
    }
    if (!Number.isFinite(rate) || rate < 0) {
        throw new RangeError("Rate must be a non-negative finite number");
    }
}
```

### Balance Defense with Readability

```javascript
// Too defensive — hard to read
function process(data) {
    if (data === null || data === undefined) throw ...;
    if (typeof data !== "object") throw ...;
    if (!Array.isArray(data.items)) throw ...;
    if (data.items.length === 0) return [];
    // main logic
}

// Better — concise
function process(data) {
    if (!data?.items?.length) return [];
    // main logic
}
```

## Error Handling in Async Patterns

### Async Retry with try/catch

```javascript
async function fetchWithRetry(url, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (err) {
            console.log(`Attempt ${attempt} failed: ${err.message}`);
            if (attempt === retries) throw err; // re-throw on last attempt
        }
    }
}

try {
    const data = await fetchWithRetry("/api/data");
} catch (err) {
    console.error("All retries exhausted:", err.message);
}
```

## Error Handling in Function Composition

When composing functions with `pipe`, wrap errors with context to trace where the pipeline failed:

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

## Reverse Engineering Q&A

| Question | Answer |
|----------|--------|
| Which line may fail? | The code inside `try`. |
| What happens after failure? | `catch` runs, program continues. |
| What resources need cleanup? | Put cleanup in `finally`. |
| Is this error recoverable? | Can the program continue meaningfully? |
| Should we re-throw? | If the caller needs to handle it too. |
| What type of error is expected? | Check which specific error types are caught. |
| Is the error handled or swallowed? | Empty `catch` swallows errors — makes debugging hard. |
| Is `try...catch` covering async code? | If so, it won't work — need promises or async/await. |
| What invalid inputs could exist? | null, undefined, wrong type, empty, out of range. |
| What assumptions are dangerous? | Assuming a value exists, is a certain type, or within range. |
## Next Steps

[Back to Chapter 5](05-recursion.md): 05 — Recursion, Call Stack & Stack Overflow
[Proceed to Chapter 7](07-algorithmic-thinking.md): Algorithmic Thinking — Problem Solving with Code to learn about algorithmic thinking — problem solving with code.
