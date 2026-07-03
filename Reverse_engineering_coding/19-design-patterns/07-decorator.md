# Decorator Pattern

## What Problem It Solves

You need to add behavior to individual objects without modifying the class. Subclassing every combination leads to class explosion. Decorators wrap an object with new behavior.

## Implementation

```javascript
class Coffee {
    cost() { return 5; }
    description() { return "Coffee"; }
}

class MilkDecorator {
    constructor(coffee) { this.coffee = coffee; }
    cost() { return this.coffee.cost() + 2; }
    description() { return `${this.coffee.description()}, Milk`; }
}

class SugarDecorator {
    constructor(coffee) { this.coffee = coffee; }
    cost() { return this.coffee.cost() + 1; }
    description() { return `${this.coffee.description()}, Sugar`; }
}

class WhippedCreamDecorator {
    constructor(coffee) { this.coffee = coffee; }
    cost() { return this.coffee.cost() + 3; }
    description() { return `${this.coffee.description()}, Whipped Cream`; }
}

let myCoffee = new Coffee();
myCoffee = new MilkDecorator(myCoffee);
myCoffee = new SugarDecorator(myCoffee);
myCoffee = new WhippedCreamDecorator(myCoffee);

console.log(myCoffee.description()); // "Coffee, Milk, Sugar, Whipped Cream"
console.log(myCoffee.cost());        // 11
```

## Decorator Using Function Composition

```javascript
function withLogging(fn) {
    return function (...args) {
        console.log(`Calling with args: ${JSON.stringify(args)}`);
        const result = fn(...args);
        console.log(`Result: ${JSON.stringify(result)}`);
        return result;
    };
}

function withTiming(fn) {
    return function (...args) {
        const start = performance.now();
        const result = fn(...args);
        const elapsed = performance.now() - start;
        console.log(`Took ${elapsed.toFixed(2)}ms`);
        return result;
    };
}

function withRetry(fn, maxRetries = 3) {
    return async function (...args) {
        for (let i = 0; i < maxRetries; i++) {
            try { return await fn(...args); }
            catch (error) { if (i === maxRetries - 1) throw error; }
        }
    };
}

const fetchData = withRetry(withLogging(withTiming(async (url) => {
    const response = await fetch(url);
    return response.json();
})));
```

## Real-World Use Case

Express middleware is a chain of decorators. Higher-Order Components (HOCs) in React are decorators. TypeScript's "experimentalDecorators" implement this pattern at the language level.

```javascript
function withAuth(handler) {
    return function (req, res, next) {
        if (!req.headers.authorization) return res.status(401).json({ error: "Unauthorized" });
        return handler(req, res, next);
    };
}

function withLogging(handler) {
    return function (req, res, next) {
        console.log(`${req.method} ${req.url}`);
        return handler(req, res, next);
    };
}

const protectedHandler = withAuth(withLogging(async (req, res) => {
    res.json({ data: "sensitive" });
}));
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | How does the Decorator pattern differ from inheritance? |
| 2 | What is the "transparent wrapper" concept? |
| 3 | Why does the order of decorators matter? |
| 4 | How would you remove a specific decorator at runtime? |
| 5 | What are the downsides of heavy decorator chains? |
## Next Steps

[Back to Chapter 6](06-adapter.md): Adapter Pattern
[Proceed to Chapter 8](08-facade.md): Facade Pattern to learn about facade pattern.
