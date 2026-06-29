# Singly Linked List

<img src="https://media.giphy.com/media/Npdl9kOaKFJHuRCBGx/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Node Structure

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
```

## Linked List Structure

```javascript
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
}
```

```
head → [10 | next] → [20 | next] → [30 | next → null]
        ↑                                ↑
      node                             tail
```

## Push — O(1)

```javascript
push(value) {
    const node = new Node(value);
    if (!this.head) {
        this.head = node;
        this.tail = node;
    } else {
        this.tail.next = node;
        this.tail = node;
    }
    this.length++;
    return this;
}
```

## Pop — O(n)

```javascript
pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;
    while (current.next) {
        newTail = current;
        current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) this.head = this.tail = null;
    return current;
}
```

Must traverse to find second-to-last node. O(n).

## Shift (Remove Front) — O(1)

```javascript
shift() {
    if (!this.head) return undefined;
    const head = this.head;
    this.head = head.next;
    this.length--;
    if (this.length === 0) this.tail = null;
    return head;
}
```

## Unshift (Add Front) — O(1)

```javascript
unshift(value) {
    const node = new Node(value);
    if (!this.head) {
        this.head = node;
        this.tail = node;
    } else {
        node.next = this.head;
        this.head = node;
    }
    this.length++;
    return this;
}
```

## Get — O(n)

```javascript
get(index) {
    if (index < 0 || index >= this.length) return null;
    let current = this.head;
    for (let i = 0; i < index; i++) current = current.next;
    return current;
}
```

No random access — must traverse from head.

## Insert — O(n)

```javascript
insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);
    const prev = this.get(index - 1);
    const node = new Node(value);
    node.next = prev.next;
    prev.next = node;
    this.length++;
    return true;
}
```

## Remove — O(n)

```javascript
remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    const prev = this.get(index - 1);
    const removed = prev.next;
    prev.next = removed.next;
    this.length--;
    return removed;
}
```

## Reverse — O(n)

```javascript
reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next = null, prev = null;
    for (let i = 0; i < this.length; i++) {
        next = node.next;
        node.next = prev;
        prev = node;
        node = next;
    }
    return this;
}
```

```
10 → 20 → 30 → null  →  null ← 10 ← 20 ← 30
```

## Linked List vs Array

| Operation | Array | Linked List |
|---|---|---|
| Access by index | O(1) | O(n) |
| Push (end) | O(1) amortized | O(1) |
| Pop (end) | O(1) | O(n) |
| Shift (front) | O(n) | O(1) |
| Unshift (front) | O(n) | O(1) |
| Insert anywhere | O(n) | O(n) find + O(1) link |
| Memory per element | One slot | Node + next pointer |

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Need random access? | Use array (O(1) index access). |
| Frequent front insertions? | Use linked list (O(1) unshift vs O(n) array unshift). |
| Singly or doubly linked? | Check for `prev` pointer on nodes. |
| Can we access tail directly? | If `tail` is stored, O(1). If not, O(n) traversal. |
## Next Steps

[Back to Chapter 2](02-arrays.md): Arrays
[Proceed to Chapter 4](04-stack.md): Stack to learn about stack.
