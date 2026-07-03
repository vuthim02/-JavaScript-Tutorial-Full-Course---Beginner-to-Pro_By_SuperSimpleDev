# Stack

## LIFO — Last In, First Out

```
Push: add to top    Pop: remove from top
    ┌─────┐
    │  30 │ ← Top (most recent)
    ├─────┤
    │  20 │
    ├─────┤
    │  10 │
    └─────┘
```

## Array-Based Stack

```javascript
class Stack {
    constructor() { this.items = []; }
    push(value) { this.items.push(value); }         // O(1)
    pop() { return this.items.pop(); }              // O(1)
    peek() { return this.items[this.items.length - 1]; }
    isEmpty() { return this.items.length === 0; }
    get size() { return this.items.length; }
}
```

## Linked List Stack

```javascript
class Stack {
    constructor() { this.head = null; this._size = 0; }
    push(value) {
        this.head = { value, next: this.head };
        this._size++;
    }
    pop() {
        if (!this.head) return undefined;
        const value = this.head.value;
        this.head = this.head.next;
        this._size--;
        return value;
    }
    peek() { return this.head?.value; }
}
```

All operations O(1).

## Applications

### 1. Function Call Stack

```javascript
function a() { b(); }
function b() { c(); }
function c() { console.log("Hello"); }
a();
// Stack frames: Global → a() → b() → c() (push)
// c() → b() → a() → Global (pop)
```

### 2. Undo System

```javascript
class UndoManager {
    constructor() { this.stack = []; }
    execute(command) {
        this.stack.push(command);
        command.execute();
    }
    undo() {
        const command = this.stack.pop();
        if (command) command.undo();
    }
}
```

### 3. Balanced Parentheses

```javascript
function isBalanced(str) {
    const stack = [];
    const pairs = { '(': ')', '{': '}', '[': ']' };
    for (const char of str) {
        if (pairs[char]) stack.push(char);
        else {
            const last = stack.pop();
            if (pairs[last] !== char) return false;
        }
    }
    return stack.length === 0;
}
console.log(isBalanced("({[]})")); // true
console.log(isBalanced("({)"));    // false
```

### 4. Browser History

```javascript
class BrowserHistory {
    constructor() {
        this.backStack = [];
        this.forwardStack = [];
    }
    visit(url) {
        this.backStack.push(url);
        this.forwardStack = [];
    }
    back() {
        if (this.backStack.length <= 1) return;
        this.forwardStack.push(this.backStack.pop());
    }
    forward() {
        if (this.forwardStack.length === 0) return;
        this.backStack.push(this.forwardStack.pop());
    }
    get current() { return this.backStack[this.backStack.length - 1]; }
}
```

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Does newest item leave first? | Yes — LIFO. Stack pop returns most recently pushed item. |
| Is recursion involved? | Recursion uses the call stack. Deep recursion can overflow. |
| Best for undo? | Stack — push actions, pop to undo. |
## Next Steps

[Back to Chapter 3](03-linked-lists.md): Singly Linked List
[Proceed to Chapter 5](05-queue.md): Queue to learn about queue.
