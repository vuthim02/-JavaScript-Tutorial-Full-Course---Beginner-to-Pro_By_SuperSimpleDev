# Adapter Pattern

<img src="https://media.giphy.com/media/Npdl9kOaKFJHuRCBGx/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Problem It Solves

Two parts of a system expect different interfaces. Instead of modifying either one, you write an *adapter* that translates calls from one interface to the other.

## Implementation

```javascript
// Existing interface (old system)
class OldCalculator {
    compute(a, b, operation) {
        switch (operation) {
            case "add": return a + b;
            case "sub": return a - b;
            default: return NaN;
        }
    }
}

// New interface (expected by the client)
class NewCalculator {
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
}

// Adapter makes OldCalculator work with NewCalculator interface
class CalculatorAdapter {
    constructor() { this.calculator = new OldCalculator(); }

    add(a, b) { return this.calculator.compute(a, b, "add"); }
    subtract(a, b) { return this.calculator.compute(a, b, "sub"); }
}

function performOperations(calc) {
    console.log(calc.add(10, 5));      // 15
    console.log(calc.subtract(10, 5)); // 5
}

const adapter = new CalculatorAdapter();
performOperations(adapter);
```

### Adapter for Third-Party APIs

```javascript
// Third-party library
class StripePayment {
    charge(amount, currency) {
        return { status: "success", transactionId: `stripe_${Date.now()}` };
    }
}

// Our application expects this interface
class PaymentProcessor {
    pay(amountInUSD) { throw new Error("Must implement pay()"); }
}

class StripeAdapter extends PaymentProcessor {
    constructor() { super(); this.stripe = new StripePayment(); }

    pay(amountInUSD) {
        const result = this.stripe.charge(amountInUSD, "usd");
        return result.status === "success";
    }
}

const processor = new StripeAdapter();
const paid = processor.pay(29.99);
```

## Real-World Use Case

Promise-based adapters for callback-based APIs. The `util.promisify` function in Node.js is a universal adapter:

```javascript
const fs = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
readFileAsync("/path/to/file.txt", "utf8").then(console.log);
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | How does Adapter differ from Facade? |
| 2 | When would you need a two-way adapter? |
| 3 | What are the performance implications of using adapters in a hot path? |
| 4 | How would you test an adapter without the real underlying system? |
## Next Steps

[Back to Chapter 5](05-prototype.md): Prototype Pattern
[Proceed to Chapter 7](07-decorator.md): Decorator Pattern to learn about decorator pattern.
