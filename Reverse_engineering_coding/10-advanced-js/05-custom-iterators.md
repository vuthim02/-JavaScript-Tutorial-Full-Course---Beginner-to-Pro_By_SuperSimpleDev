# 05 — Custom Iterators

## Making Any Object Iterable

To make an object iterable, add a `[Symbol.iterator]` function that returns an iterator (an object with `next()`).

```javascript
let counter = {
    start: 1,
    end: 3,

    [Symbol.iterator]() {
        let current = this.start;
        let last = this.end;

        return {
            next() {
                if (current <= last) {
                    return {
                        value: current++,
                        done: false
                    };
                }

                return {
                    done: true
                };
            }
        };
    }
};
```

---

## Using the Custom Iterator

```javascript
for (let x of counter) {
    console.log(x); // 1, 2, 3
}

console.log([...counter]); // [1, 2, 3]

const [first, second] = counter;
console.log(first, second); // 1 2
```

---

## Iterator with return() (Cleanup)

```javascript
let iterable = {
    [Symbol.iterator]() {
        let i = 0;
        return {
            next() {
                i++;
                if (i <= 5) return { value: i, done: false };
                return { done: true };
            },
            return() {
                console.log("Iterator cleaned up!");
                return { done: true };
            }
        };
    }
};

for (let x of iterable) {
    if (x > 2) break; // Triggers return()
}
// "Iterator cleaned up!"
```

---

## Practical Example: Range Iterator

```javascript
function range(start, end, step = 1) {
    return {
        [Symbol.iterator]() {
            let current = start;
            return {
                next() {
                    if (current <= end) {
                        const value = current;
                        current += step;
                        return { value, done: false };
                    }
                    return { done: true };
                }
            };
        }
    };
}

for (const n of range(1, 10, 2)) {
    console.log(n); // 1, 3, 5, 7, 9
}

console.log([...range(5, 15, 5)]); // [5, 10, 15]
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| How to make an object iterable? | Add a `[Symbol.iterator]()` method that returns an iterator object with `next()`. |
| What must `next()` return? | `{ value: any, done: boolean }`. |
| What is `return()` for? | Cleanup when iteration ends early (break, error). |
| Does `[Symbol.iterator]` need to return a new iterator each time? | Yes. Multiple `for...of` loops should each get a fresh iterator. |
## Next Steps

[Back to Chapter 4](04-for-of-manual.md): 04 — Manual Iterator Usage & for...of Internals
[Proceed to Chapter 6](06-generators.md): 06 — Generators to learn about 06 — generators.
