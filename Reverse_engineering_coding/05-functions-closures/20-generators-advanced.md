# Generators — Advanced Topics

<img src="https://media.giphy.com/media/l0HlwKpPGceLgQC9W/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Generator Return and Throw

```javascript
function* gen() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } catch (err) {
        console.log("Caught:", err.message);
        yield "recovered";
    } finally {
        console.log("Finally always runs");
    }
}

const g = gen();
g.next();           // { value: 1, done: false }
g.throw(new Error("Oops")); // "Caught: Oops" → { value: "recovered", done: false }
g.return("early");  // "Finally always runs" → { value: "early", done: true }
```

## Infinite Sequences (Lazy Evaluation)

```javascript
// This would be impossible with arrays (infinite memory)
function* naturals() {
    let n = 0;
    while (true) yield n++;
}

function* take(n, iterable) {
    let count = 0;
    for (const value of iterable) {
        if (count++ >= n) return;
        yield value;
    }
}

function* filter(predicate, iterable) {
    for (const value of iterable) {
        if (predicate(value)) yield value;
    }
}

// First 5 even natural numbers — computed lazily
const evenNaturals = filter(n => n % 2 === 0, naturals());
console.log([...take(5, evenNaturals)]); // [0, 2, 4, 6, 8]
```

## Async Generators

```javascript
async function* paginate(url) {
    let page = 1;
    while (true) {
        const response = await fetch(`${url}?page=${page}`);
        const data = await response.json();
        if (!data.items.length) return;
        yield* data.items; // yield each item from this page
        page++;
    }
}

// Consume all paginated results
for await (const item of paginate("/api/products")) {
    console.log(item);
}
```

## Real-World Use Cases

```javascript
// 1. Custom iterables
class LinkedList {
    // ...
    *[Symbol.iterator]() {
        let current = this.head;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }
}

// 2. State machines
function* trafficLight() {
    while (true) {
        yield "green";
        yield "yellow";
        yield "red";
    }
}

// 3. ID generator
function* idGen(prefix = "id") {
    let n = 0;
    while (true) yield `${prefix}_${++n}`;
}
const userId = idGen("user");
userId.next().value; // "user_1"
userId.next().value; // "user_2"
```

## Generator Reverse Engineering Checklist

| Question | Answer |
|----------|--------|
| What is `function*`? | A generator function — returns a Generator object |
| What does `yield` do? | Pauses execution, emits a value |
| What does `.next()` return? | `{ value: ..., done: boolean }` |
| Can you send values in? | Yes — `gen.next(value)` becomes the yield expression's result |
| When is `done: true`? | When function returns or falls off the end |
| Is a generator iterable? | Yes — can use `for...of`, spread, destructure |
| What is `yield*`? | Delegates to another iterable |
## Next Steps

[Back to Chapter 19](19-generators-basics.md): Generator Functions & `yield`
[Proceed to Chapter 21](21-garbage-collection.md): Garbage Collection to learn about garbage collection.
