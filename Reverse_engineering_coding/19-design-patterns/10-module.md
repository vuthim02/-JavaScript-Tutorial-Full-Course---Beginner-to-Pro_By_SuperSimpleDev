# Module Pattern

## What Problem It Solves

JavaScript before ES modules had no built-in encapsulation. Variables leaked globally. The Module pattern uses closures to create private state and expose a controlled public API.

## Implementation (IIFE-Based Module)

```javascript
const UserModule = (function () {
    // Private
    const users = [];
    let nextId = 1;

    function validateEmail(email) {
        return email.includes("@");
    }

    // Public
    return {
        add(name, email) {
            if (!validateEmail(email)) throw new Error("Invalid email");
            const user = { id: nextId++, name, email };
            users.push(user);
            return user;
        },

        find(id) { return users.find(u => u.id === id) || null; },

        getAll() { return [...users]; },

        remove(id) {
            const index = users.findIndex(u => u.id === id);
            if (index !== -1) return users.splice(index, 1)[0];
            return null;
        },

        get count() { return users.length; }
    };
})();

console.log(UserModule.add("Alice", "alice@example.com"));
console.log(UserModule.count);              // 1
// console.log(UserModule.users);           // undefined (private)
```

## Revealing Module Pattern

A variation where you define all functions privately, then reveal only the ones you want:

```javascript
const Calculator = (function () {
    function add(a, b) { return a + b; }
    function subtract(a, b) { return a - b; }
    function multiply(a, b) { return a * b; }
    function divide(a, b) {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    }

    return { add, subtract, multiply, divide };
})();
```

## ES Module Pattern

ES modules provide encapsulation natively — everything is private unless exported:

```javascript
// counter.js
let count = 0;

export function increment() { count += 1; return count; }
export function decrement() { count -= 1; return count; }
export function getCount() { return count; }

// app.js
import { increment, getCount } from "./counter.js";
console.log(increment()); // 1
console.log(getCount());  // 1
```

## Real-World Use Case

Every npm package is a module. jQuery, Lodash, and modern frameworks all use module patterns.

```javascript
// Node.js module pattern
const privateVar = "secret";

function privateHelper() { return privateVar.toUpperCase(); }

module.exports = {
    publicMethod() { return privateHelper(); }
};
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | How does the Module pattern relate to the Single Responsibility Principle? |
| 2 | Why is the Revealing Module pattern preferred over the classic Module pattern? |
| 3 | How does tree-shaking work with ES modules but not with IIFE modules? |
| 4 | What happens to module-level state when a module is imported in multiple files? |
| 5 | How would you test private functions in a module? |
## Next Steps

[Back to Chapter 9](09-proxy.md): Proxy Pattern
[Proceed to Chapter 11](11-mixin.md): Mixin Pattern to learn about mixin pattern.
