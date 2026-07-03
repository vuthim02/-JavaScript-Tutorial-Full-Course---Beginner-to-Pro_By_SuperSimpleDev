# Senior Engineer Reverse Engineering Checklist

<img src="https://media1.tenor.com/m/e6gf3Da-UW4AAAAd/ishowspeed-speed.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Purpose

When reading unfamiliar code, use these questions to systematically understand what it does, how it flows, and where it could break.

---

## 1. Entry Point

| Question | Look For |
|----------|----------|
| Where does execution begin? | Event handler, function call, script tag, module import |
| Is there an IIFE or module wrapper? | `(function() { })()` or top-level `await` |
| What triggers this code to run? | User action, timer, network response, DOMContentLoaded |
| Is initialization required before this runs? | Check for setup steps before main logic |

```javascript
// Common entry points:
document.addEventListener("DOMContentLoaded", init);
window.addEventListener("load", init);
button.addEventListener("click", handleClick);
fetch("/api/data").then(processData);
```

## 2. Control Flow

| Question | Look For |
|----------|----------|
| What path does execution take? | Trace the if/else, switch, ternary branches |
| Are there early returns? | Guard clauses that exit before main logic |
| Is there hidden control flow? | `&&`, `||`, `??` with side effects |
| Could a condition be wrong? | Check truthy/falsy traps, type coercion |
| Is error handling in place? | `try/catch`, `.catch()`, error boundaries |

```javascript
// Trace this function through all paths:
function processOrder(order) {
    if (!order) return "No order";           // path 1
    if (!order.items.length) return "Empty"; // path 2
    if (!order.isPaid) return "Unpaid";      // path 3
    return shipOrder(order);                 // path 4
}
```

## 3. Functions — What Does Each One Do?

| Question | Look For |
|----------|----------|
| What are the inputs? | Parameters, types, defaults, destructuring |
| What is the output? | Return value (or side effect if no return) |
| Does this function have side effects? | Modifying external variables, DOM, API calls |
| Is this function pure? | Same input always → same output, no side effects |
| What is the scope of variables? | Global, function, block — check for closures |
| Is this function async? | Returns a promise, uses `await`, has `.then()` |

```javascript
// Analyzing a function:
function calculateTotal(items, taxRate = 0.1) {
    // Input: array of items, optional tax rate
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    // Output: total (pure function — no side effects)
    return Math.round(total * 100) / 100;
}
```

## 4. Data Structures — What Is Being Stored?

| Question | Look For |
|----------|----------|
| What data structure is this? | Array, object, Map, Set, WeakMap |
| What are the keys/properties? | String keys, Symbols, numeric indices |
| Is data mutated or replaced? | Mutation changes in place; reassignment changes reference |
| Are there shared references? | Multiple variables pointing to the same object |
| Is data copied correctly? | Shallow copy vs deep copy for nested structures |
| Is immutability maintained? | Spread, Object.assign, structuredClone, or libraries |

```javascript
// Analyze what happens to data:
let state = { users: [], selectedId: null };

function addUser(state, user) {
    // Mutation approach:
    state.users.push(user);
    return state;

    // Immutable approach (preferred):
    return { ...state, users: [...state.users, user] };
}
```

## 5. Error Handling

| Question | Look For |
|----------|----------|
| What can go wrong? | Invalid input, network failure, missing data |
| Is the error caught and handled? | try/catch, .catch(), or unhandled? |
| Is the error swallowed? | Empty catch block — makes debugging impossible |
| Does cleanup happen? | finally block for closing files, removing spinners |
| Is the error meaningful? | Custom error messages, proper error types |
| Are async errors handled? | Promises without .catch(), async functions without try |

```javascript
function fetchUserData(userId) {
    return fetch(`/api/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Failed to fetch user:", error.message);
            return null;  // graceful degradation
        });
}
```

## 6. Performance Red Flags

| Question | Look For |
|----------|----------|
| Are there nested loops? | O(n²) or worse complexity |
| Is DOM accessed in a loop? | Causes layout thrashing — batch reads and writes |
| Are there unnecessary re-renders? | Functions/objects created inline in React components |
| Is there memory leaking? | Event listeners not removed, intervals not cleared |
| Are large data structures copied unnecessarily? | Avoid deep cloning large objects if possible |
| Is there unnecessary work? | Computations that could be cached or memoized |

## 7. Security

| Question | Look For |
|----------|----------|
| Is user input sanitized? | XSS prevention, SQL injection, command injection |
| Is innerHTML used with unsanitized data? | Use textContent or sanitize first |
| Are secrets hardcoded? | API keys, passwords, tokens in source code |
| Is eval or new Function used? | Code injection risk — avoid if possible |
| Are URLs validated? | Open redirect vulnerabilities |

## Reverse Engineering Q&A

| Question | Answer |
|----------|--------|
| What is the first line that runs? | Find the entry point |
| What conditions control execution flow? | Trace all if/else, switch, and short-circuit paths |
| What data is modified and where? | Track mutations through the code |
| Where could this code crash? | Identify unhandled errors, null references, type mismatches |
| Is this code efficient enough? | Check loops, recursion depth, DOM access patterns |
| Is this code secure? | Check input handling, data exposure, code injection risks |
| What assumptions does this code make? | Implicit assumptions about input types, value ranges, existence |
## Next Steps

[Back to Chapter 7](07-algorithmic-thinking.md): Algorithmic Thinking — Problem Solving with Code
[Proceed to Chapter 9](09-projects.md): Projects — Applying Control Flow, Recursion, and Error Handling to learn about projects — applying control flow, recursion, and error handling.
