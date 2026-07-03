# Side Effects

## What Is a Side Effect?

Any observable interaction with the **outside world** — anything beyond computing a return value.

```javascript
// All of these are side effects:
console.log("message");          // I/O
fetch("/api/data");              // network
document.body.style.color = "red"; // DOM mutation
localStorage.setItem("k", "v");  // storage
fs.writeFileSync("f.txt", "x");  // file system
db.query("INSERT ...");          // database
global.counter++;                // global mutation
arr.push(item);                  // argument mutation
Math.random();                   // non-deterministic
Date.now();                      // non-deterministic
throw new Error("!");            // exceptions
```

## Push Side Effects to the Edges

The most powerful architectural pattern: keep your **core logic pure** and push side effects to **thin outer layers**.

```javascript
// ❌ Mixed — hard to test, hard to reason about
function processOrder(orderId) {
    const order = database.getOrder(orderId); // side effect
    if (order.total < 0) throw new Error("Invalid"); // side effect

    const tax = order.total * 0.1; // pure logic
    const finalTotal = order.total + tax; // pure logic

    database.updateOrder(orderId, { finalTotal }); // side effect
    email.send(order.email, `Total: ${finalTotal}`); // side effect
}

// ✅ Separated — pure core, thin impure shell
// PURE: pure business logic — fully testable without mocks
function calculateOrderTotal(order) {
    if (order.total < 0) throw new Error("Invalid total");
    const tax = order.total * 0.1;
    return { ...order, tax, finalTotal: order.total + tax };
}

// IMPURE: thin shell that orchestrates side effects
async function processOrder(orderId) {
    const order        = await database.getOrder(orderId);
    const updatedOrder = calculateOrderTotal(order);       // pure
    await database.updateOrder(orderId, updatedOrder);
    await email.send(order.email, `Total: ${updatedOrder.finalTotal}`);
    return updatedOrder;
}
```

---

# Senior Engineer Checklist

## The Complete Question Set

Use these questions whenever you're reading unfamiliar function code:

### Call Site Analysis

| Question | Why It Matters |
|----------|---------------|
| Who calls this function? | Reveals the call graph and program flow |
| What arguments are passed? | Defines the function's actual interface |
| Is the return value used? | If ignored, function is called for side effects |
| Is it called immediately or stored? | `fn()` vs `fn` — reference or invocation |
| Is it called once or many times? | Performance and state implications |

### Function Mechanics

| Question | Why It Matters |
|----------|---------------|
| Declaration or expression? | Affects hoisting |
| Arrow or regular? | Affects `this`, `arguments`, constructability |
| Any default parameters? | What happens with missing args |
| Is rest used? | What happens with extra args |
| Is it recursive? | Stack depth and base case analysis |
| What is `this`? | Trace the call pattern to determine binding |

### Closure Analysis

| Question | Why It Matters |
|----------|---------------|
| Does it close over anything? | Variables from outer scope |
| What variables are captured? | What stays alive |
| How long does the closure live? | Memory retention analysis |
| Are captured variables shared? | Multiple closures sharing same variable |
| Could it cause a memory leak? | If closure lives longer than needed |

### Async Analysis

| Question | Why It Matters |
|----------|---------------|
| Is this async? | Does it return a Promise? |
| Is `await` missing? | Common bug — returns Promise, not value |
| Sequential or parallel? | Performance implications |
| Where can it throw? | Need try/catch? |
| Is it a generator? | Does it use `yield`? Can be paused? |

### Memory Analysis

| Question | Why It Matters |
|----------|---------------|
| Can GC remove this? | Any reachable reference prevents collection |
| Why is this still in memory? | Trace all references |
| Is there an event listener not removed? | Common leak vector |
| Is there a timer not cleared? | Common leak vector |
| Is a cache unbounded? | Growing forever |
| Should this use WeakRef? | If cache shouldn't prevent GC |

### Design Analysis

| Question | Why It Matters |
|----------|---------------|
| Is this a HOF? | Takes or returns functions |
| Is this a factory? | Creates and returns objects |
| Is this pure? | Can it be safely memoized and tested? |
| What are the side effects? | What does it touch outside itself? |
| Could this be composed? | Can it be broken into smaller pure pieces? |
| What would break if removed? | Understand essential vs accidental complexity |
| Can I rewrite this from memory? | True understanding test |
## Next Steps

[Back to Chapter 24](24-composition-and-pure-functions.md): Function Composition
[Proceed to Chapter 26](26-projects-part1.md): Projects — Part 1 to learn about projects — part 1.
