# Singleton Pattern

## What Problem It Solves

Some resources must have *exactly one* instance: database connection pool, logger, configuration manager, cache.

Without Singleton, creating multiple instances wastes memory and can corrupt state (e.g., two logger instances writing to the same file simultaneously).

## Implementation

The classic Singleton ensures a class can only be instantiated once. Subsequent calls return the same instance.

```javascript
class Singleton {
    constructor() {
        if (Singleton._instance) {
            return Singleton._instance;
        }
        this.createdAt = Date.now();
        Singleton._instance = this;
    }

    static getInstance() {
        if (!Singleton._instance) {
            Singleton._instance = new Singleton();
        }
        return Singleton._instance;
    }
}

const a = new Singleton();
const b = new Singleton();
console.log(a === b); // true
```

## Modern Singleton with Module System

ES modules are singletons by nature — they execute once and cache the exports.

```javascript
// logger.js
class Logger {
    log(message) {
        console.log(`[${Date.now()}] ${message}`);
    }
}

export default new Logger();

// app.js
import logger from "./logger.js";
logger.log("App started");
```

## Real-World Use Case

A database connection manager that reuses the same pool across the entire application:

```javascript
class DatabasePool {
    constructor() {
        if (DatabasePool._instance) {
            return DatabasePool._instance;
        }
        this.connections = [];
        this.maxSize = 10;
        DatabasePool._instance = this;
    }

    async connect(uri) {
        this.uri = uri;
        console.log(`Connected to ${uri}`);
        return this;
    }

    query(sql) {
        console.log(`Executing: ${sql}`);
    }
}

const pool1 = new DatabasePool();
const pool2 = new DatabasePool();
console.log(pool1 === pool2); // true
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | What happens if the Singleton constructor throws an error? Is the instance still cached? |
| 2 | How would you make a Singleton work correctly with `async` initialization? |
| 3 | How do you reset a Singleton (e.g., for testing between test cases)? |
| 4 | Why is it difficult to unit test code that imports a Singleton directly? |
| 5 | How could two library versions in `node_modules` each create their own Singleton instance? How would you solve this? |
## Next Steps

[Back to Chapter 1](01-intro-design-patterns.md): Design Patterns in JavaScript
[Proceed to Chapter 3](03-factory.md): Factory Method Pattern to learn about factory method pattern.
