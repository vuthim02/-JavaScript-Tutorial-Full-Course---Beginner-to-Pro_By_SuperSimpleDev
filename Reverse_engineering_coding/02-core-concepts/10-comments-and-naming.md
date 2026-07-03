# Comments and Naming Conventions

## Comments in JavaScript

### Single-Line Comments

```javascript
// This is a single-line comment
let x = 5;  // Inline comment after code
```

### Multi-Line Comments

```javascript
/*
 This is a multi-line comment.
 It can span several lines.
 */
let y = 10;
```

### JSDoc Comments (Documentation)

```javascript
/**
 * Calculates the total price including tax.
 * @param {number} price - The base price
 * @param {number} taxRate - The tax rate (e.g., 0.1 for 10%)
 * @returns {number} The total price
 */
function calculateTotal(price, taxRate) {
    return price + (price * taxRate);
}
```

### When to Comment

```javascript
// ❌ Bad: commenting what the code does (code should speak for itself)
// Increment i by 1
i = i + 1;

// ❌ Bad: obvious comments
let name = "Tim";  // set name to Tim

// ✅ Good: explaining WHY, not WHAT
// Using Math.round to fix floating-point precision for currency display
let displayAmount = Math.round(amount * 100) / 100;

// ✅ Good: explaining complex business logic
// Tax calculation: first $10,000 is tax-free, then 10% up to $50,000,
// 20% for $50,000-$100,000, and 30% above $100,000
function calculateTax(income) { ... }

// ✅ Good: TODO reminders
// TODO: Remove this mock data when the API is ready
// FIXME: This crashes when input is negative
// HACK: Workaround for Safari bug #45231
```

## Naming Conventions

### Variables and Functions — camelCase

```javascript
let firstName = "Tim";
let totalPrice = 100;
let isLoggedIn = true;
function getUserData() { }
function calculateTotalPrice() { }
```

### Classes and Constructors — PascalCase

```javascript
class ShoppingCart { }
class UserProfile { }
function CarModel(name) { this.name = name; }
```

### Constants — UPPER_SNAKE_CASE

```javascript
const MAX_RETRIES = 3;
const API_BASE_URL = "https://api.example.com";
const TAX_RATE = 0.1;
```

### Private Properties (Convention) — _underscorePrefix

```javascript
class User {
    constructor(name) {
        this._privateId = Math.random();  // convention — not truly private
    }
}
```

### Boolean Variables — Prefix with is/has/can/should

```javascript
let isActive = true;
let hasPermission = false;
let canEdit = true;
let shouldUpdate = false;
```

## Meaningful Names

```javascript
// ❌ Bad: meaningless names
function d(a, b) { return a + b; }
let x = 5;
let arr = [1, 2, 3];

// ✅ Good: descriptive names
function add(num1, num2) { return num1 + num2; }
let maxRetryCount = 5;
let userScores = [1, 2, 3];
```

### Avoid These Bad Practices

```javascript
// ❌ Single letters (except loop counters)
let a = 10;
let b = "hello";

// ❌ Abbreviations that aren't obvious
let usrNm = "Tim";
let calcTot = fn();

// ❌ Similar names that are easy to confuse
let userData;
let userDate;   // easy to mistype!

// ❌ Negated booleans
let isNotDisabled = true;  // use isEnabled instead
```

## Reverse Engineering Q&A

| Question | Answer |
|----------|--------|
| What does this comment explain? | Should explain WHY, not WHAT |
| Is this name descriptive? | Can you tell what it holds/does without reading the implementation? |
| Is this a constant? | Use UPPER_SNAKE_CASE for values that shouldn't change |
| Is this a class? | Use PascalCase |
| Is this a boolean? | Prefix with is/has/can/should |
| Could this name be confused with another? | Avoid similar-looking names |
| Is this comment outdated? | Stale comments are worse than no comments — keep them updated |
## Next Steps

[Back to Chapter 9](09-optional-chaining-nullish-coalescing.md): Optional Chaining (?.) and Nullish Coalescing (??)
[Proceed to Module 3](../03-control-flow/README.md): Control Flow, Iteration, Recursion & Error Handling to learn about controlling program flow in JavaScript.
