# 07 — yield: Pause, Resume, and Two-Way Communication

## Pause and Resume

`yield` acts like:

```
pause – return a value – wait for next call – resume
```

```javascript
function* test() {
    console.log("A");
    yield 1;
    console.log("B");
    yield 2;
}
```

Sequence:
- `g.next()` → A (log), yields 1, pauses
- `g.next()` → B (log), yields 2, pauses
- `g.next()` → (no more yields), done

---

## yield Sends a Value Out

```javascript
function* producer() {
    yield "first";
    yield "second";
}
```

The value after `yield` is what `next()` returns as `value`.

---

## yield Receives a Value In (Two-Way)

```javascript
function* twoWay() {
    const x = yield "give me something";
    console.log("Received:", x);
    const y = yield "give me more";
    console.log("Received:", y);
    return x + y;
}

const g = twoWay();
console.log(g.next());        // { value: "give me something", done: false }
console.log(g.next(10));      // logs "Received: 10", { value: "give me more", done: false }
console.log(g.next(20));      // logs "Received: 20", { value: 30, done: true }
```

The argument to `next()` becomes the **result of `yield`** inside the generator.

---

## yield* Delegation

A generator can delegate to another generator:

```javascript
function* inner() {
    yield "a";
    yield "b";
}

function* outer() {
    yield "x";
    yield* inner(); // Delegates to inner generator
    yield "y";
}

console.log([...outer()]); // ["x", "a", "b", "y"]
```

---

## yield* with Iterables

```javascript
function* flatten(...iterables) {
    for (const iterable of iterables) {
        yield* iterable; // Delegates to any iterable
    }
}

const flat = flatten([1, 2], "Hi", new Set([3, 4]));
console.log([...flat]); // [1, 2, "H", "i", 3, 4]
```

---

## Generator Return

```javascript
function* withReturn() {
    yield 1;
    yield 2;
    return 3; // Done with a value
}

const g = withReturn();
console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 2, done: false }
console.log(g.next()); // { value: 3, done: true }  ← return value

// for...of ignores the return value:
for (const v of withReturn()) {
    console.log(v); // 1, 2 (3 is not included)
}
```

---

## Generator Throw

```javascript
function* safe() {
    try {
        yield "try this";
        yield "this will be skipped";
    } catch (err) {
        console.log("Caught inside:", err.message);
        yield "recovered";
    }
}

const g = safe();
console.log(g.next());                           // { value: "try this", done: false }
console.log(g.throw(new Error("Oops")));         // Caught inside: Oops
                                                 // { value: "recovered", done: false }
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What does `yield` do? | Pauses execution, returns a value to the caller. |
| Can you send values back into a generator? | Yes. `next(value)` – the value becomes the result of the `yield` expression. |
| What is `yield*`? | Delegates to another generator or iterable. |
| Can a generator catch errors from outside? | Yes. `generator.throw(error)` injects an error at the yield point. |
## Next Steps

[Back to Chapter 6](06-generators.md): 06 — Generators
[Proceed to Chapter 8](08-map.md): 08 — Map to learn about 08 — map.
