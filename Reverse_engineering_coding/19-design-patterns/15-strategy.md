# Strategy Pattern

## What Problem It Solves

An object needs to use different algorithms at different times. Instead of conditional statements (`if`/`switch`), you encapsulate each algorithm and make them interchangeable.

## Implementation

```javascript
// Strategy interface (conceptual)
class SortStrategy {
    sort(data) { throw new Error("Must implement sort()"); }
}

// Concrete strategies
class BubbleSort extends SortStrategy {
    sort(data) {
        const arr = [...data];
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
        return arr;
    }
}

class QuickSort extends SortStrategy {
    sort(data) {
        if (data.length <= 1) return data;
        const arr = [...data];
        const pivot = arr[Math.floor(arr.length / 2)];
        const left = arr.filter(x => x < pivot);
        const middle = arr.filter(x => x === pivot);
        const right = arr.filter(x => x > pivot);
        return [...this.sort(left), ...middle, ...this.sort(right)];
    }
}

class BuiltInSort extends SortStrategy {
    sort(data) { return [...data].sort((a, b) => a - b); }
}

// Context
class Sorter {
    constructor(strategy = new BuiltInSort()) { this._strategy = strategy; }

    setStrategy(strategy) { this._strategy = strategy; }

    sort(data) {
        const start = performance.now();
        const result = this._strategy.sort(data);
        const elapsed = performance.now() - start;
        console.log(`${this._strategy.constructor.name} took ${elapsed.toFixed(2)}ms`);
        return result;
    }
}

const sorter = new Sorter();
const data = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));

sorter.setStrategy(new QuickSort());
sorter.sort(data);
sorter.setStrategy(new BubbleSort());
sorter.sort(data);
```

## Strategy with Functions

Since strategies are single-method objects, we can use functions directly:

```javascript
const strategies = {
    percentage(price, discount) { return price * (1 - discount / 100); },
    fixed(price, discount) { return Math.max(0, price - discount); },
    buyOneGetOne(price, quantity) { return price * Math.ceil(quantity / 2); }
};

class PriceCalculator {
    constructor(strategy = "percentage") { this.strategy = strategies[strategy]; }
    setStrategy(name) { this.strategy = strategies[name]; }
    calculate(price, quantity, discount) { return this.strategy(price, discount, quantity); }
}

const calc = new PriceCalculator("percentage");
console.log(calc.calculate(100, 1, 10)); // 90
calc.setStrategy("fixed");
console.log(calc.calculate(100, 1, 15)); // 85
```

## Real-World Use Case

Express middleware functions are strategies. Authentication strategies in Passport.js. Compression algorithms (gzip, brotli). Logging levels and formats.

```javascript
const authStrategies = {
    jwt: (req) => {
        const token = req.headers.authorization?.split(" ")[1];
        return { id: 1, role: "user" };
    },
    session: (req) => { return req.session?.user || null; },
    apiKey: (req) => {
        return req.headers["x-api-key"] === "secret" ? { id: 1, role: "admin" } : null;
    }
};

class Authenticator {
    constructor(strategies = ["jwt", "session"]) { this.strategies = strategies; }

    authenticate(req) {
        for (const name of this.strategies) {
            const user = authStrategies[name](req);
            if (user) return { user, strategy: name };
        }
        return { user: null, strategy: null };
    }
}
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | How does Strategy differ from State? |
| 2 | What advantages do function-based strategies have over class-based ones? |
| 3 | How would you dynamically load strategies from a configuration file? |
| 4 | When would using Strategy be worse than a simple `if/else`? |
## Next Steps

[Back to Chapter 14](14-command.md): Command Pattern
[Proceed to Chapter 16](16-state.md): State Pattern to learn about state pattern.
