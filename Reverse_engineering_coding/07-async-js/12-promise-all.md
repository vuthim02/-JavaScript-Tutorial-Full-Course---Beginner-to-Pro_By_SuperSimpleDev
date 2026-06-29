# Promise.all()

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Running Tasks Concurrently

Waits for **all** promises to fulfill. Rejects immediately if **any** rejects.

```javascript
Promise.all([p1, p2, p3]);
```

## Example

```javascript
let result = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
]);
```

## Execution Timeline

```
Time ──────────────────────────────────>
fetchUser()   ████████████████████░░░░░░░░░░░░
fetchPosts()  ██████████████████████████████░░
fetchComments() ██████████░░░░░░░░░░░░░░░░░░░░
              ↑ all start at same time
                          ↑ all finish → Promise.all resolves
```

All three start at roughly the same time (concurrently).

## Parallel vs Sequential Timing

```javascript
// SEQUENTIAL: 3 seconds total (if each takes 1s)
async function sequential() {
    const a = await delay(1000);
    const b = await delay(1000);
    const c = await delay(1000);
    return [a, b, c];
}

// PARALLEL: 1 second total
async function parallel() {
    const [a, b, c] = await Promise.all([
        delay(1000),
        delay(1000),
        delay(1000),
    ]);
    return [a, b, c];
}
```

## Destructuring the Result

```javascript
const [users, posts, comments] = await Promise.all([
    fetch("/users").then(r => r.json()),
    fetch("/posts").then(r => r.json()),
    fetch("/comments").then(r => r.json()),
]);
```

The result array matches the order of the input promises.

## Error Behavior

```javascript
const fast = Promise.reject("Fast error");
const slow = new Promise(resolve => setTimeout(() => resolve("Slow"), 3000));

Promise.all([fast, slow])
    .then(results => console.log("All done", results))
    .catch(err => console.log("Failed:", err));
// Output (immediately): "Failed: Fast error"
// (slow continues executing but its result is discarded)
```

`Promise.all` **short-circuits** on the first rejection.

## Empty Array

```javascript
Promise.all([]).then(results => {
    console.log(results); // [] – resolves immediately
});
```

## Practical Example: Dashboard Data

```javascript
async function loadDashboard(userId) {
    // All three fetches start simultaneously
    const [user, posts, notifications] = await Promise.all([
        fetch(`/api/users/${userId}`).then(r => r.json()),
        fetch(`/api/users/${userId}/posts`).then(r => r.json()),
        fetch(`/api/users/${userId}/notifications`).then(r => r.json()),
    ]);

    return { user, posts, notifications };
}
// Total time = max(users, posts, notifications) not the sum
```

## Q&A

| Question | Answer |
|----------|--------|
| Independent tasks? | If none depend on each other's results, they can run in parallel. |
| Can they run together? | Yes. `Promise.all` starts all promises concurrently. |
| What if one rejects? | `Promise.all` rejects immediately with that error. Others continue but results are ignored. |
| What if you need all results even if some fail? | Use `Promise.allSettled` instead. |
| Does order of results match input order? | Yes. Always. |
| Can you use Promise.all with non-promise values? | Yes. Non-promise values are wrapped with `Promise.resolve()`. |
## Next Steps

[Back to Chapter 11](11-fetch-api.md): Fetch API
[Proceed to Chapter 13](13-promise-race-allsettled-any.md): Promise.race(), Promise.allSettled(), Promise.any() to learn about promise.race(), promise.allsettled(), promise.any().
