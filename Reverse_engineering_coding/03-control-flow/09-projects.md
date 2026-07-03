# Projects — Applying Control Flow, Recursion, and Error Handling

## Project 1: Multiplication Table Generator

```javascript
function multiplicationTable(n) {
    if (typeof n !== "number" || n < 1 || !Number.isInteger(n)) {
        throw new Error("Please provide a positive integer");
    }

    for (let i = 1; i <= n; i++) {
        let row = "";
        for (let j = 1; j <= n; j++) {
            row += (i * j).toString().padStart(4, " ");
        }
        console.log(row);
    }
}

try {
    multiplicationTable(5);
} catch (error) {
    console.error(error.message);
}
```

**Reverse Engineering Questions:**

| Question | Answer |
|----------|--------|
| How many times does the inner loop run per outer iteration? | `n` times |
| What is the total number of iterations? | `n * n` (O(n²)) |
| What does `padStart(4, " ")` do? | Pads the number to 4 characters for alignment |
| What input would crash this? | Non-numeric, negative, or non-integer values |
| What type of error does invalid input throw? | A generic `Error` — could be more specific (e.g., `TypeError`, `RangeError`) |

## Project 2: Guess the Number Game

```javascript
function guessTheNumber(max = 100) {
    const secret = Math.floor(Math.random() * max) + 1;
    let attempts = 0;
    let guess;

    console.log(`Guess a number between 1 and ${max}`);

    do {
        guess = parseInt(prompt("Your guess:"), 10);
        attempts++;

        if (isNaN(guess)) {
            console.log("Please enter a valid number");
            continue;
        }

        if (guess < secret) {
            console.log("Too low!");
        } else if (guess > secret) {
            console.log("Too high!");
        } else {
            console.log(`Correct! You got it in ${attempts} attempts.`);
            return attempts;
        }
    } while (true);
}
```

**Reverse Engineering Questions:**

| Question | Answer |
|----------|--------|
| Why is `do...while` used? | The body must execute at least once before checking if the game ends |
| What happens if the user enters text? | `parseInt` returns `NaN`, caught by `isNaN` check |
| How does the game terminate? | When `guess === secret`, the `return` exits the function (and the infinite loop) |
| What is the range of `secret`? | 1 to `max` (inclusive) |
| Could this loop become truly infinite? | No — the user can always guess correctly (in theory) |
| How could we add a max attempts limit? | Add `if (attempts >= maxAttempts) { console.log("Out of attempts"); return; }` |

## Project 3: Recursive Factorial with Error Handling

```javascript
function factorial(n) {
    if (typeof n !== "number" || !Number.isInteger(n)) {
        throw new TypeError("Input must be an integer");
    }
    if (n < 0) {
        throw new RangeError("Input must be non-negative");
    }
    if (n > 170) {
        throw new RangeError("Input exceeds maximum safe factorial (170)");
    }
    if (n === 0 || n === 1) {
        return 1;  // base case
    }
    return n * factorial(n - 1);  // recursive case
}

// Wrapper with safe defaults
function safeFactorial(n) {
    try {
        const result = factorial(n);
        return result;
    } catch (error) {
        if (error instanceof TypeError) {
            return 0;  // gracefully degrade for type errors
        }
        if (error instanceof RangeError) {
            return Infinity;  // gracefully degrade for range errors
        }
        throw error;  // re-throw unexpected errors
    }
}

console.log(safeFactorial(5));    // 120
console.log(safeFactorial(-1));   // Infinity (graceful degradation)
console.log(safeFactorial(200));  // Infinity (too large)
console.log(safeFactorial("abc")); // 0 (type error)
```

**Reverse Engineering Questions:**

| Question | Answer |
|----------|--------|
| What are the three base cases? | n < 0 (error), n ≤ 1 (return 1), n > 170 (error) |
| Which error types are used? | TypeError for wrong type, RangeError for out of range |
| What is the maximum depth of the call stack? | Equal to `n` — 170 frames maximum |
| Why does `factorial(200)` throw? | The result exceeds `Number.MAX_VALUE` |
| What does the wrapper do? | Catches specific errors and returns sensible fallback values |
| Is this function stack-safe? | No — deep recursion (n > ~10000) will overflow the stack |

## Project 4: Calculator with Error Handling

```javascript
class CalculationError extends Error {
    constructor(message, operation) {
        super(message);
        this.name = "CalculationError";
        this.operation = operation;
    }
}

function calculate(a, b, operation) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("Both operands must be numbers");
    }

    switch (operation) {
        case "add":
            return a + b;
        case "subtract":
            return a - b;
        case "multiply":
            return a * b;
        case "divide":
            if (b === 0) {
                throw new CalculationError("Cannot divide by zero", "divide");
            }
            return a / b;
        case "power":
            return a ** b;
        case "modulo":
            if (b === 0) {
                throw new CalculationError("Cannot modulo by zero", "modulo");
            }
            return a % b;
        default:
            throw new CalculationError(`Unknown operation: "${operation}"`, operation);
    }
}

function runCalculator() {
    const operations = ["add", "subtract", "multiply", "divide", "power", "modulo"];

    for (const op of operations) {
        try {
            const result = calculate(10, 3, op);
            console.log(`10 ${op} 3 = ${result}`);
        } catch (error) {
            if (error instanceof CalculationError) {
                console.error(`Calculation error (${error.operation}): ${error.message}`);
            } else {
                console.error(`Unexpected error: ${error.message}`);
            }
        }
    }
}

runCalculator();
```

**Reverse Engineering Questions:**

| Question | Answer |
|----------|--------|
| What custom error type is defined? | `CalculationError` with an `operation` property |
| How many operations are supported? | 6: add, subtract, multiply, divide, power, modulo |
| What happens on division by zero? | A `CalculationError` is thrown |
| What happens with unknown operations? | A `CalculationError` is thrown from `default` |
| How is the switch different from if/else? | It uses strict equality and evaluates the expression once |
| Could we add more operations? | Yes — add more `case` clauses |

## Project 5: Prime Number Checker

```javascript
function isPrime(num) {
    if (typeof num !== "number" || !Number.isInteger(num)) {
        throw new TypeError("Input must be an integer");
    }
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i * i <= num; i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

function listPrimes(limit) {
    if (typeof limit !== "number" || limit < 1) {
        throw new RangeError("Limit must be a positive number");
    }

    const primes = [];
    for (let i = 2; i <= limit; i++) {
        try {
            if (isPrime(i)) {
                primes.push(i);
            }
        } catch (error) {
            console.warn(`Skipping ${i}: ${error.message}`);
        }
    }
    return primes;
}

console.log(listPrimes(30));
// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

## Reverse Engineering Q&A

| Question | Answer |
|----------|--------|
| What patterns does each project demonstrate? | Loops, conditionals, recursion, error handling, input validation |
| What error handling strategies are used? | try/catch, custom error classes, graceful degradation, guard clauses |
| Which projects use recursion? | Project 3 (factorial) |
| Which projects use loops? | All of them (for, while, do...while) |
| Which projects use conditional logic? | All of them (if/else, switch, ternary) |
| How could these projects be extended? | Add user input, persistence, UI, more operations |
## Next Steps

[Back to Chapter 8](08-reverse-engineering-checklist.md): Senior Engineer Reverse Engineering Checklist
[Proceed to Module 4](../04-arrays-objects/README.md): Arrays, Objects, Memory Model, Built-in Methods to learn about working with arrays and objects in JavaScript.
