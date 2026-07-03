# Promise Chaining

## The Problem: Nested Callbacks

```javascript
login(user, function(err, userData) {
    if (err) return handleError(err);
    loadProfile(userData.id, function(err, profile) {
        if (err) return handleError(err);
        loadOrders(profile.id, function(err, orders) {
            if (err) return handleError(err);
            loadPayments(orders[0].id, function(err, payments) {
                if (err) return handleError(err);
                render(payments);
            });
        });
    });
});
```

## The Solution: Promise Chain

```javascript
login(user)
    .then(loadProfile)
    .then(loadOrders)
    .then(loadPayments)
    .catch(handleError);
```

## Flow

```
login(user)
   │
   ▼ (fulfills with userData)
loadProfile(userData.id)
   │
   ▼ (fulfills with profile)
loadOrders(profile.id)
   │
   ▼ (fulfills with orders)
loadPayments(orders[0].id)
   │
   ▼ (fulfills with payments)
render(payments)
   │
   ▼ (if any step rejects)
catch(handleError)
```

## How Chaining Works Internally

Each `.then()` returns a **new promise**:

```javascript
const step1 = login(user);
const step2 = step1.then(loadProfile);
const step3 = step2.then(loadOrders);
const step4 = step3.then(loadPayments);
const step5 = step4.catch(handleError);
// step5 is the final promise
```

## Passing Results Down the Chain

```javascript
fetch("/user/1")
    .then(response => response.json())
    .then(user => user.id)
    .then(id => fetch(`/posts/${id}`))
    .then(response => response.json())
    .then(posts => console.log(posts));
```

Each step transforms the value.

## Error Handling in Chains

```javascript
getUser()
    .then(user => getPosts(user.id))
    .then(posts => getComments(posts[0].id))
    .then(comments => render(comments))
    .catch(err => {
        console.error("Something failed:", err);
    });
```

If any step throws or rejects, all subsequent `.then()` handlers are skipped until `.catch()`.

## Conditional Chaining

```javascript
getUser()
    .then(user => {
        if (user.role === "admin") {
            return getAdminDashboard();
        }
        return getUserDashboard(user.id);
    })
    .then(dashboard => render(dashboard))
    .catch(handleError);
```

## Q&A

| Question | Answer |
|----------|--------|
| Which promise returns next promise? | Every `.then()` returns a new promise. |
| Where can error occur? | At any `.then()` handler. Error skips subsequent `.then()` until a `.catch()`. |
| How does data flow between `.then()` calls? | Return value of one `.then()` becomes input to the next. |
| Can you skip a `.then()` conditionally? | Yes. Throw or return `Promise.reject()` to skip to `.catch()`. |
| What if you don't return from a `.then()`? | The next `.then()` receives `undefined`. |
## Next Steps

[Back to Chapter 8](08-then-catch-finally.md): then(), catch(), finally()
[Proceed to Chapter 10](10-async-await.md): async / await to learn about async / await.
