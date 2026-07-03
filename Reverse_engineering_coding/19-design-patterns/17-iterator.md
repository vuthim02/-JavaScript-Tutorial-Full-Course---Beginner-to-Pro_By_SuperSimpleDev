# Iterator Pattern

## What Problem It Solves

Different data structures (arrays, trees, maps) need a uniform way to traverse their elements without exposing their internal structure.

## JavaScript Built-In Iterator Protocol

JavaScript has a standard iterator protocol: objects with a `next()` method that returns `{ value, done }`.

```javascript
// Manual iterator
function createRangeIterator(start, end, step = 1) {
    let current = start;

    return {
        next() {
            if (current >= end) return { value: undefined, done: true };
            const value = current;
            current += step;
            return { value, done: false };
        },

        [Symbol.iterator]() { return this; }
    };
}

const range = createRangeIterator(0, 5, 1);
console.log([...range]); // [0, 1, 2, 3, 4]
```

## Custom Iterable with Generator

```javascript
class TreeNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    // In-order traversal iterator
    *[Symbol.iterator]() {
        if (this.left) yield* this.left;
        yield this.value;
        if (this.right) yield* this.right;
    }
}

//       1
//      / \
//     2   3
//    / \
//   4   5

const root = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3)
);

console.log([...root]); // [4, 2, 5, 1, 3]
```

## Custom Iterator Class

```javascript
class LinkedList {
    constructor() { this.head = null; }

    add(value) {
        const node = { value, next: null };
        if (!this.head) { this.head = node; return; }
        let current = this.head;
        while (current.next) current = current.next;
        current.next = node;
    }

    [Symbol.iterator]() {
        let current = this.head;
        return {
            next() {
                if (!current) return { value: undefined, done: true };
                const value = current.value;
                current = current.next;
                return { value, done: false };
            }
        };
    }
}

const list = new LinkedList();
list.add("a");
list.add("b");
list.add("c");

for (const item of list) {
    console.log(item); // "a", "b", "c"
}
```

## Real-World Use Case

`Array.prototype[Symbol.iterator]`, `Map.prototype[Symbol.iterator]`, `Set.prototype[Symbol.iterator]`. Spread operator `[...iterable]` and `for...of` both depend on the iterator protocol.

```javascript
// Pagination iterator
class PaginatedAPI {
    constructor(url, pageSize = 10) { this.url = url; this.pageSize = pageSize; }

    async *[Symbol.asyncIterator]() {
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            const response = await fetch(`${this.url}?page=${page}&limit=${this.pageSize}`);
            const data = await response.json();
            yield* data.items;
            hasMore = data.hasMore;
            page++;
        }
    }
}

// for await (const item of new PaginatedAPI("/api/users")) {
//     console.log(item);
// }
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | What is the difference between iterable and iterator? |
| 2 | How does `yield*` work for delegation? |
| 3 | Why is it important that an iterator can also be iterable? |
| 4 | What happens if you modify a collection while iterating over it? |
## Next Steps

[Back to Chapter 16](16-state.md): State Pattern
[Proceed to Chapter 18](18-chain-of-responsibility.md): Chain of Responsibility Pattern to learn about chain of responsibility pattern.
