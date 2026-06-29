# Queue

<img src="https://media.licdn.com/dms/image/v2/D5622AQG2KlVjS5v_SQ/feedshare-shrink_1280/B56ZcMy0DhHUAk-/0/1748266340488?e=2147483647&v=beta&t=LkOcLT81sIiwzgNaaDot-mBeBF2OfiyHMnR4bq-S3Ek" alt="Animated GIF" style="width:400px; height:300px;">


## FIFO — First In, First Out

```
Dequeue (remove front) ← [10][20][30] ← Enqueue (add back)
```

## Array-Based Queue (Inefficient)

```javascript
class Queue {
    constructor() { this.items = []; }
    enqueue(value) { this.items.push(value); }   // O(1)
    dequeue() { return this.items.shift(); }     // O(n) — shift moves everything
    front() { return this.items[0]; }
    isEmpty() { return this.items.length === 0; }
}
```

`dequeue` is O(n) because `shift()` moves all elements.

## Object-Based Queue (Efficient)

```javascript
class Queue {
    constructor() {
        this.items = {};
        this.frontIndex = 0;
        this.backIndex = 0;
    }
    enqueue(value) {
        this.items[this.backIndex] = value;
        this.backIndex++;
    }
    dequeue() {
        if (this.isEmpty()) return undefined;
        const value = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;
        return value;
    }
    front() { return this.items[this.frontIndex]; }
    isEmpty() { return this.frontIndex === this.backIndex; }
    get size() { return this.backIndex - this.frontIndex; }
}
```

Both enqueue and dequeue are O(1).

## Linked List Queue

```javascript
class Queue {
    constructor() { this.head = null; this.tail = null; this._size = 0; }
    enqueue(value) {
        const node = { value, next: null };
        if (this.tail) this.tail.next = node;
        this.tail = node;
        if (!this.head) this.head = node;
        this._size++;
    }
    dequeue() {
        if (!this.head) return undefined;
        const value = this.head.value;
        this.head = this.head.next;
        if (!this.head) this.tail = null;
        this._size--;
        return value;
    }
}
```

## Applications

### Task Scheduling
```javascript
class TaskScheduler {
    constructor() { this.queue = new Queue(); }
    addTask(task) { this.queue.enqueue(task); }
    processNext() { const task = this.queue.dequeue(); if (task) task.execute(); }
}
```

### BFS
Queue is used to explore nodes level by level in graph traversal.

### Print Queue
```javascript
class PrintQueue {
    constructor() { this.jobs = []; }
    addJob(doc) { this.jobs.push(doc); }
    printNext() { const job = this.jobs.shift(); if (job) console.log(`Printing: ${job}`); }
}
```

### Event Loop
The browser's event loop uses a queue of macrotasks (setTimeout, click events, I/O).

## Deque (Double-Ended Queue)

```javascript
class Deque {
    constructor() { this.items = {}; this.front = 0; this.back = 0; }
    addFront(value) { this.front--; this.items[this.front] = value; }
    addBack(value) { this.items[this.back] = value; this.back++; }
    removeFront() {
        if (this.isEmpty()) return undefined;
        const v = this.items[this.front]; delete this.items[this.front]; this.front++; return v;
    }
    removeBack() {
        if (this.isEmpty()) return undefined;
        this.back--; const v = this.items[this.back]; delete this.items[this.back]; return v;
    }
    isEmpty() { return this.front === this.back; }
}
```

All operations O(1).

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Does oldest item leave first? | Yes — FIFO. Dequeue returns earliest enqueued item. |
| Is this BFS? | BFS uses a queue. |
| Is queue efficient? | Check if `dequeue` uses `shift()` (O(n)) or index approach (O(1)). |
## Next Steps

[Back to Chapter 4](04-stack.md): Stack
[Proceed to Chapter 6](06-hash-table.md): Hash Table to learn about hash table.
