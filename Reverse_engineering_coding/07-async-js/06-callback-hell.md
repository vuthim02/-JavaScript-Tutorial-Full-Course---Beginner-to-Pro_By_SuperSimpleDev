# Callback Hell (Pyramid of Doom)

<img src="https://media.giphy.com/media/yYSSBtDgbbRzq/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## The Problem

```javascript
login(user, function() {
    loadProfile(function() {
        loadOrders(function() {
            loadPayments(function() {
                console.log("Done");
            });
        });
    });
});
```

Shape:

```
\
 \
  \
   \
    \
```

Called the **Pyramid of Doom**.

## Problems with Callback Hell

### 1. Hard to Read
Code flows rightward, not downward. Your eyes must track multiple indentation levels.

### 2. Hard to Debug
Which `function` contains the error? Stack traces show the callback, not the context.

### 3. Hard to Maintain
Adding a step requires restructuring the entire pyramid.

### 4. No Error Propagation
Each level needs its own error handling:

```javascript
login(user, function(err) {
    if (err) return handleError(err);
    loadProfile(function(err) {
        if (err) return handleError(err);
        loadOrders(function(err) {
            if (err) return handleError(err);
            loadPayments(function(err) {
                if (err) return handleError(err);
                console.log("Done");
            });
        });
    });
});
```

Error handling doubles the size!

### 5. No Parallelism
Each step must wait for the previous one, even if independent.

## Inversion of Control

When you give a callback to a library, you lose control:

```javascript
paymentGateway.charge(amount, function(err, result) {
    // Can you trust this to be called exactly once?
    // With the right arguments?
    // At the right time?
});
```

**Problems with raw callbacks:**
- Called multiple times (double charge!)
- Called zero times (silent failure)
- Called synchronously (unexpected)
- Called with wrong arguments

## Solutions to Callback Hell

### 1. Name Your Functions

```javascript
function onLoginComplete(err, userData) { /* ... */ }
function onProfileLoaded(err, profile) { /* ... */ }
function onOrdersLoaded(err, orders) { /* ... */ }

login(user, onLoginComplete);
```

Named functions are easier to debug and read.

### 2. Flatten with Promises

```javascript
login(user)
    .then(loadProfile)
    .then(loadOrders)
    .then(loadPayments)
    .then(render)
    .catch(handleError);
```

### 3. Use async/await

```javascript
async function handleUser() {
    const userData = await login(user);
    const profile = await loadProfile(userData.id);
    const orders = await loadOrders(profile.id);
    const payments = await loadPayments(orders[0].id);
    render(payments);
}
```

## Q&A

| Question | Answer |
|----------|--------|
| Why deeply nested? | Each async step requires a callback. Dependent steps naturally nest. |
| Can promises flatten structure? | Yes. Promise chaining (`.then()`) converts nesting into a flat chain. |
| How many levels before unmanageable? | Typically 3+ levels of nesting. |
| What is "inversion of control"? | Giving your callback to someone else, trusting they will call it correctly. Promises restore control: you own the `.then()`. |
| What debugging tools work in callback hell? | Logging at each callback, named functions (instead of anonymous), breakpoints at each call site. |
| What is the best fix for callback hell? | Use async/await for readability, or promise chaining for sequential async operations. |
## Next Steps

[Back to Chapter 5](05-callbacks.md): Callback Functions
[Proceed to Chapter 7](07-promises.md): Promises to learn about promises.
