# 06 — Generators

## What is a Generator?

A special function that can pause and resume execution. It returns a **Generator object** that is both iterable and an iterator.

```javascript
function* generate() {
}
```

The `*` marks it as a generator.

---

## Yielding Values

```javascript
function* numbers() {
    yield 1;
    yield 2;
    yield 3;
}
```

---

## Creating and Using a Generator

```javascript
let g = numbers();

console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 2, done: false }
console.log(g.next()); // { value: 3, done: false }
console.log(g.next()); // { value: undefined, done: true }
```

---

## Generators are Iterable

```javascript
function* colors() {
    yield "red";
    yield "green";
    yield "blue";
}

for (const c of colors()) {
    console.log(c); // "red", "green", "blue"
}

console.log([...colors()]); // ["red", "green", "blue"]
```

---

## Memory Diagram

```
function* numbers() { yield 1; yield 2; yield 3; }
                           │
                           ▼
Generator Object (returned by numbers())
 │
 ├── next() → resumes execution until next yield
 ├── return() → finishes the generator
 ├── throw() → throws error into the generator
 │
 └── [Symbol.iterator]() → returns itself (generator is its own iterator)

State: "suspended" (paused at yield)
       "closed" (after return/done)
```

---

## Generator Execution State

```javascript
function* demo() {
    console.log("A");
    yield 1;
    console.log("B");
    yield 2;
    console.log("C");
}

const g = demo();
console.log("Created – generator is suspended");

console.log(g.next()); // logs "A", returns { value: 1, done: false }
console.log(g.next()); // logs "B", returns { value: 2, done: false }
console.log(g.next()); // logs "C", returns { value: undefined, done: true }
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Why isn't function finished? | Because `yield` pauses execution. The generator is "suspended" until the next `.next()` call. |
| Does the generator run on creation? | No. `function*()` returns a generator object, but the body does NOT execute until the first `.next()`. |
| Is a generator an iterator? | Yes. It has `next()`, `return()`, `throw()`, and `[Symbol.iterator]`. |
| Can a generator be `for...of`-ed? | Yes, because it's iterable. |
## Next Steps

[Back to Chapter 5](05-custom-iterators.md): 05 — Custom Iterators
[Proceed to Chapter 7](07-yield.md): 07 — yield: Pause, Resume, and Two-Way Communication to learn about 07 — yield: pause, resume, and two-way communication.
