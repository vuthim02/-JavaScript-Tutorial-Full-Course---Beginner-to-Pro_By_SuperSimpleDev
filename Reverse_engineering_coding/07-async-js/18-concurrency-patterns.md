# Concurrency Patterns

## Sequential Execution — One at a Time

```javascript
await a();
await b();
await c();
```

Order:

```
a → b → c
```

Total time: sum of all operations (e.g., 3 + 3 + 3 = 9 seconds).

### When Sequential is Correct

Use sequential when each step depends on the previous:

```javascript
const user = await fetchUser(id);
const profile = await fetchProfile(user.id);
const posts = await fetchPosts(profile.id);
```

### Sequential Loop

```javascript
async function processAll(items) {
    const results = [];
    for (const item of items) {
        const result = await process(item);
        results.push(result);
    }
    return results;
}
// Total time: N * time_per_item
```

### Sequential with Error Handling

```javascript
async function sequential() {
    const a = await step1();
    const b = await step2(a);
    const c = await step3(b);
    return c;
}
// If step1 fails, step2 and step3 never run
```

## Parallel Execution — All at Once

```javascript
await Promise.all([a(), b(), c()]);
```

Total time: time of slowest operation (e.g., 3 seconds if all take 3s).

### When Parallel is Correct

Use parallel when operations are **independent**:

```javascript
const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments(),
]);
```

### Parallel Map

```javascript
async function processAll(items) {
    return Promise.all(items.map(item => process(item)));
}
// Total time: time_of_slowest_item
```

## Mixed Sequential + Parallel

```javascript
async function mixed() {
    // Step 1: parallel (independent)
    const [user, config] = await Promise.all([
        fetchUser(),
        fetchConfig(),
    ]);

    // Step 2: sequential (depends on step 1)
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);

    return { user, config, posts, comments };
}
```

## Bounded Parallelism (Concurrency Limit)

Control how many operations run simultaneously. Useful for rate-limited APIs.

```javascript
async function mapConcurrent(items, fn, concurrency = 3) {
    const results = [];
    const executing = new Set();

    for (const [index, item] of items.entries()) {
        const promise = fn(item).then(result => {
            results[index] = result;
            executing.delete(promise);
        });

        executing.add(promise);

        if (executing.size >= concurrency) {
            await Promise.race(executing);
        }
    }

    await Promise.all(executing);
    return results;
}

// Example: download 10 files, max 3 at a time
const urls = ["url1", "url2", "url3", "url4", "url5"];
const results = await mapConcurrent(urls, async url => {
    const response = await fetch(url);
    return response.text();
}, 3);
```

### Alternative: Chunk-Based Concurrency

```javascript
async function inChunks(items, fn, chunkSize = 3) {
    const results = [];
    for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize);
        const chunkResults = await Promise.all(chunk.map(fn));
        results.push(...chunkResults);
    }
    return results;
}

// Wait for each chunk to finish before starting the next
```

## Pipeline Pattern (Sequential Stages, Parallel Within)

```javascript
async function pipeline(data) {
    // Stage 1: validate all items (parallel)
    const validated = await Promise.all(
        data.map(item => validate(item))
    );

    // Stage 2: transform all validated (parallel)
    const transformed = await Promise.all(
        validated.map(item => transform(item))
    );

    // Stage 3: store sequential (depends on DB order)
    for (const item of transformed) {
        await store(item);
    }

    return transformed;
}
```

## Error Handling in Parallel Operations

```javascript
// All or nothing
try {
    const results = await Promise.all(tasks);
} catch (err) {
    // At least one task failed
}

// Partial results
const results = await Promise.allSettled(tasks);
const successes = results.filter(r => r.status === "fulfilled").map(r => r.value);
const failures = results.filter(r => r.status === "rejected").map(r => r.reason);
```

## Race Pattern (First Successful Result)

```javascript
async function firstSuccessful(promises) {
    const results = await Promise.allSettled(promises);
    for (const result of results) {
        if (result.status === "fulfilled") return result.value;
    }
    throw new AggregateError(
        results.map(r => r.reason),
        "All promises failed"
    );
}
```

## Decision Flowchart

```
Need results from multiple async operations?
    ├─ Each step depends on previous?
    │       └─ Sequential (await each)
    │
    ├─ Steps are independent?
    │       ├─ Need fastest possible?
    │       │       └─ Parallel (Promise.all)
    │       └─ Need rate limiting?
    │               └─ Bounded concurrency (mapConcurrent)
    │
    ├─ Some depend on others?
    │       └─ Mixed (parallel group → sequential chain)
    │
    └─ Need first successful result?
            └─ Promise.any / firstSuccessful
```

## Q&A

| Question | Answer |
|----------|--------|
| When must you use sequential? | When each step depends on the previous step's result |
| What is the cost of sequential? | Total time = sum of all operation times |
| Can sequential cause a freeze? | No, because the function is suspended between `await`s. Other code can run |
| Independent tasks? | Do any depend on each other's results? If not, parallel |
| What is fastest possible time? | Time of the slowest single operation (bottleneck) |
| How to limit concurrency? | Use `mapConcurrent` with `Promise.race` or chunk-based approach |
| What if one parallel task fails? | `Promise.all` short-circuits. `Promise.allSettled` waits for all |
| How to handle rate limits? | Use bounded parallelism + exponential backoff on 429 responses |
## Next Steps

[Back to Chapter 17](17-error-handling.md): Async Error Handling
[Proceed to Chapter 19](19-debounce-throttle.md): Debouncing and Throttling to learn about debouncing and throttling.
