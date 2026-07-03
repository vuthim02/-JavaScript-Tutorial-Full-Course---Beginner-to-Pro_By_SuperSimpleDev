# Async Error Handling

## try/catch with async/await

```javascript
try {
    await fetchData();
} catch (error) {
    console.log(error);
}
```

## Catching in Promise Chains

```javascript
fetch("/data")
    .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    })
    .then(data => process(data))
    .catch(err => {
        console.error("Something went wrong:", err);
        showErrorMessage(err.message);
    });
```

## Error Propagation in Chains

```javascript
getUser()
    .then(user => getPosts(user.id))
    .then(posts => getComments(posts[0].id))
    .then(comments => render(comments))
    .catch(err => {
        console.error("Something failed:", err);
    });
```

If any step throws or rejects, all subsequent `.then()` handlers skip to `.catch()`.

## Multiple Catch Blocks (Granular Error Handling)

```javascript
try {
    const user = await fetchUser(id);
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    return comments;
} catch (err) {
    if (err.message.includes("404")) {
        console.warn("Resource not found, using defaults");
        return [];
    }
    if (err.message.includes("NetworkError")) {
        console.error("Network is down");
        throw new Error("Please check your connection");
    }
    throw err;
}
```

## Granular try/catch per Operation

```javascript
async function robustLoad() {
    let user;
    try {
        user = await fetchUser();
    } catch {
        user = { name: "Guest", id: -1 }; // Fallback
    }

    let posts;
    try {
        posts = await fetchPosts(user.id);
    } catch {
        posts = [];
    }

    return { user, posts };
}
```

## Custom Error Classes

```javascript
class AppError extends Error {
    constructor(message, code, statusCode = 500) {
        super(message);
        this.name = "AppError";
        this.code = code;
        this.statusCode = statusCode;
    }
}

class NotFoundError extends AppError {
    constructor(resource) {
        super(`${resource} not found`, "NOT_FOUND", 404);
        this.name = "NotFoundError";
    }
}

class ValidationError extends AppError {
    constructor(field, message) {
        super(message, "VALIDATION_ERROR", 400);
        this.name = "ValidationError";
        this.field = field;
    }
}

// Usage
async function getUser(id) {
    const user = await db.findUser(id);
    if (!user) throw new NotFoundError("User");
    return user;
}

async function handleRequest(id) {
    try {
        const user = await getUser(id);
        return { success: true, data: user };
    } catch (err) {
        if (err instanceof NotFoundError) {
            return { success: false, error: err.message, status: 404 };
        }
        if (err instanceof ValidationError) {
            return { success: false, error: err.message, field: err.field, status: 400 };
        }
        return { success: false, error: "Internal error", status: 500 };
    }
}
```

## Error Recovery Patterns

### Retry

```javascript
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        } catch (err) {
            if (i === retries - 1) throw err;
            console.log(`Retry ${i + 1}/${retries} after error: ${err.message}`);
            await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        }
    }
}
```

### Fallback

```javascript
async function loadConfig() {
    try {
        return await fetch("/config.json").then(r => r.json());
    } catch {
        // Fallback to default config
        return { theme: "light", language: "en" };
    }
}
```

### Timeout

```javascript
function withTimeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
        )
    ]);
}

async function load() {
    try {
        return await withTimeout(fetch("/slow-api"), 5000);
    } catch (err) {
        if (err.message.includes("Timed out")) {
            return { error: "Request timed out", cached: getCachedData() };
        }
        throw err;
    }
}
```

## Global Error Handlers

```javascript
// Browser: unhandled promise rejections
window.addEventListener("unhandledrejection", event => {
    console.error("Unhandled rejection:", event.reason);
    event.preventDefault(); // Prevent Node.js-like warning
});

// Browser: general errors
window.addEventListener("error", event => {
    console.error("Uncaught error:", event.error);
});

// Node.js
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    process.exit(1); // Required in Node.js to avoid undefined state
});
```

## Q&A

| Question | Answer |
|----------|--------|
| Can try/catch around async function call catch its rejection? | Yes, if you `await` it |
| What if you don't `await` inside a `try` block? | The rejection is not caught. The `try` block exits before the promise rejects |
| Why does `.catch()` at end of chain catch all errors? | Errors propagate down the chain. If any `.then()` throws, chain skips to next `.catch()` |
| What is an unhandled rejection? | A rejected promise with no `.catch()` attached. Triggers a global event |
| How to create custom error types? | Extend `Error` class. Set `this.name` for proper `instanceof` |
| What's the retry pattern? | Loop with try/catch, exponential backoff, re-throw after max retries reached |
| How to implement timeout for promises? | `Promise.race` with a promise that rejects after the timeout period |
| Can you partially recover and continue? | Yes — use granular try/catch blocks to handle each operation independently |
## Next Steps

[Back to Chapter 16](16-event-listeners.md): Event Listeners
[Proceed to Chapter 18](18-concurrency-patterns.md): Concurrency Patterns to learn about concurrency patterns.
