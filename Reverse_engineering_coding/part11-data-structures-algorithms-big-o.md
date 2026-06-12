# ABSOLUTE JAVASCRIPT ECOSYSTEM MASTERY

# Part 11 — Data Structures, Algorithms, Big-O Analysis, and Reverse Engineering Tactics

---

# Mission

Data structures and algorithms are the foundation of:

* Backend systems
* Databases
* Search engines
* Compilers
* Operating systems
* Games
* AI systems

Frameworks and libraries eventually rely on these concepts.

---

# Mental Model

Every problem involves:

```text
Input (raw data)
    ↓
Data Structure (organized storage)
    ↓
Algorithm (transformation steps)
    ↓
Output (result)
```

---

# Senior Engineer Thinking

When reading code, ask:

1. What data structure stores information?
2. Which algorithm manipulates it?
3. Time complexity?
4. Space complexity?
5. Can it scale?
6. Is there a better approach?

---

# PART I — BIG O ANALYSIS

---

# Chapter 1 — Why Big O Exists

## Measuring Growth, Not Speed

Without Big O:

```javascript
// Processing 10 elements
```

might seem fast.

But:

```javascript
// Processing 10 million elements
```

may become extremely slow.

Big O measures **growth rate** — how time or space increases as input size grows.

---

## Common Big O Categories

```text
Notation      Name            Example
──────────────────────────────────────────
O(1)          Constant        Array access by index
O(log n)      Logarithmic     Binary search
O(n)          Linear          Single loop
O(n log n)    Linearithmic    Merge sort, Quick sort (avg)
O(n²)         Quadratic       Nested loops
O(2ⁿ)         Exponential     Recursive Fibonacci (naive)
O(n!)         Factorial       Permutations (traveling salesman)
```

---

## Visualizing Growth

```text
n = 10
──────────────────────────────────────────
O(1):      1 operation
O(log n):  ~3 operations
O(n):      10 operations
O(n log n):~33 operations
O(n²):     100 operations
O(2ⁿ):     1024 operations
O(n!):     3,628,800 operations

n = 100
──────────────────────────────────────────
O(1):      1 operation
O(log n):  ~7 operations
O(n):      100 operations
O(n log n):~664 operations
O(n²):     10,000 operations
O(2ⁿ):     1.26e30 operations (impossible)
O(n!):     9.3e157 operations (impossible)
```

---

## Big O Rules

### 1. Drop Constants

```javascript
// O(n) not O(2n)
for (let i = 0; i < n; i++) { /* 1 */ }
for (let i = 0; i < n; i++) { /* 2 */ }
// Still O(n) — two passes, but constant factor is dropped
```

### 2. Drop Lower-Order Terms

```javascript
// O(n²) not O(n² + n)
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) { }
}
for (let i = 0; i < n; i++) { }
// O(n² + n) → O(n²) — n is insignificant compared to n²
```

### 3. Consider Worst Case

```javascript
// Array search: O(n) worst case (element at end or not present)
function find(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}
```

---

## Space Complexity

```javascript
// O(1) space — no extra memory proportional to input
function sum(arr) {
    let total = 0;                  // single variable
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}

// O(n) space — creates array proportional to input
function double(arr) {
    const result = [];              // grows with input
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i] * 2);
    }
    return result;
}

// O(n²) space — 2D matrix
function matrix(n) {
    const m = [];
    for (let i = 0; i < n; i++) {
        m.push(new Array(n).fill(0));
    }
    return m;
}
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does operation depend on input size? | If yes, it's not O(1). Check loops, recursion, or method complexity. |
| Nested loop? | Likely O(n²) or higher. Each nesting level adds a factor of n. |
| Recursion? | Trace the recursion tree. If it branches exponentially, O(2ⁿ). |
| Divide by two? | Likely O(log n) — binary search, tree operations, divide-and-conquer. |
| Single loop? | O(n) — linear scan. |
| What about built-in methods? | `.sort()` is typically O(n log n). `.indexOf()` is O(n). `Map.get()` is O(1). |

---

# PART II — ARRAYS

---

# Chapter 2 — Array Internals

## Contiguous Memory

```javascript
let arr = [10, 20, 30];
```

Memory layout (simplified):

```text
Address    Value
1000       10    ← arr[0]
1008       20    ← arr[1]
1016       30    ← arr[2]
```

Array elements are stored in **contiguous** memory locations. Each element takes the same amount of space (8 bytes for a reference in JS).

---

## Access by Index — O(1)

```javascript
arr[1]  // 20
```

The engine calculates: `baseAddress + (index * elementSize)`. No matter if the array has 10 or 10 million elements, this calculation is constant time.

---

## push() — Amortized O(1)

```javascript
arr.push(40); // Add to end
```

If there's room in the allocated memory, it's O(1). If the array needs to grow (reallocate), it copies all elements — but this happens rarely, so the **amortized** cost is O(1).

---

## pop() — O(1)

```javascript
arr.pop(); // Remove from end
```

Simply decrements the length. No elements are moved.

---

## shift() — O(n)

```javascript
arr.shift(); // Remove from front
```

Every element must be **shifted left** by one position:

```text
Before: [10, 20, 30]
          │
          ▼ shift()
After:  [20, 30, undefined]
length: 2
```

---

## unshift() — O(n)

```javascript
arr.unshift(5); // Add to front
```

Every element must be **shifted right** by one position:

```text
Before: [10, 20, 30]
          │
          ▼ unshift(5)
After:  [5, 10, 20, 30]
```

---

## splice() — O(n)

```javascript
arr.splice(1, 1);    // Remove at index 1 — O(n) (shift left)
arr.splice(1, 0, 5); // Insert at index 1 — O(n) (shift right)
```

---

## Array Complexity Summary

| Operation | Complexity | Notes |
|-----------|------------|-------|
| Access by index | O(1) | Direct memory calculation |
| push() | O(1) amortized | May trigger resize |
| pop() | O(1) | Just decrement length |
| shift() | O(n) | Every element shifts left |
| unshift() | O(n) | Every element shifts right |
| splice() | O(n) | Shifts remaining elements |
| indexOf() | O(n) | Linear search |
| includes() | O(n) | Linear search |
| sort() | O(n log n) | Timsort (V8) |
| filter() | O(n) | Creates new array |
| map() | O(n) | Creates new array |
| reduce() | O(n) | Single pass |
| forEach() | O(n) | Single pass |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does data move? | `shift()` and `unshift()` move all elements. `splice()` moves elements after the affected index. |
| Which elements shift? | For `shift()`: all elements shift left by one. For `unshift()`: all shift right by one. |
| Is `shift()` expensive? | Yes, O(n). For frequent front insertions/removals, use a linked list or deque instead. |
| Is array access always O(1)? | Yes. Index calculation is constant. |
| Why is `pop()` O(1) but `shift()` O(n)? | `pop` changes only the length. `shift` must move every element in memory. |

---

# PART III — LINKED LISTS

---

# Chapter 3 — Singly Linked List

## Node Structure

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
```

---

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

Memory:

```text
head → [10 | next] → [20 | next] → [30 | next → null]
        ↑                                ↑
      node                             tail
```

---

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

---

## Pop — O(n)

```javascript
pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail = current;
    while (current.next) {  // Traverse to end
        newTail = current;
        current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
        this.head = null;
        this.tail = null;
    }
    return current;
}
```

Must traverse to find the second-to-last node. This is O(n).

---

## Shift (Remove Front) — O(1)

```javascript
shift() {
    if (!this.head) return undefined;
    const currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    if (this.length === 0) this.tail = null;
    return currentHead;
}
```

---

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

---

## Get — O(n)

```javascript
get(index) {
    if (index < 0 || index >= this.length) return null;
    let current = this.head;
    for (let i = 0; i < index; i++) {
        current = current.next;
    }
    return current;
}
```

No random access — must traverse from head.

---

## Insert — O(n) to find position, O(1) to link

```javascript
insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);
    
    const prev = this.get(index - 1);  // O(n)
    const node = new Node(value);
    node.next = prev.next;
    prev.next = node;
    this.length++;
    return true;
}
```

---

## Remove — O(n)

```javascript
remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    
    const prev = this.get(index - 1);  // O(n)
    const removed = prev.next;
    prev.next = removed.next;
    this.length--;
    return removed;
}
```

---

## Reverse — O(n)

```javascript
reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next = null;
    let prev = null;
    for (let i = 0; i < this.length; i++) {
        next = node.next;
        node.next = prev;
        prev = node;
        node = next;
    }
    return this;
}
```

Transforms:

```text
10 → 20 → 30 → null
           ↓ reverse
null ← 10 ← 20 ← 30
```

---

## Linked List vs Array

| Operation | Array | Linked List |
|-----------|-------|-------------|
| Access by index | O(1) | O(n) |
| Push (end) | O(1) amortized | O(1) |
| Pop (end) | O(1) | O(n) (singly) / O(1) (doubly) |
| Shift (front) | O(n) | O(1) |
| Unshift (front) | O(n) | O(1) |
| Insert anywhere | O(n) | O(n) to find + O(1) to link |
| Memory per element | One slot | Node + next pointer |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Need random access? | Use array (O(1) index access). |
| Frequent insertions at front? | Use linked list (O(1) unshift vs O(n) array unshift). |
| Is this a singly or doubly linked list? | Check for `prev` pointer on nodes. |
| Can we access tail directly? | If `tail` is stored, O(1). If not, O(n) traversal. |

---

# PART IV — STACK

---

# Chapter 4 — Stack

## LIFO — Last In, First Out

```text
Push: add to top
Pop:  remove from top

    ┌─────┐
    │  30 │ ← Top (most recent)
    ├─────┤
    │  20 │
    ├─────┤
    │  10 │
    └─────┘
```

---

## Array-Based Stack

```javascript
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(value) {        // O(1)
        this.items.push(value);
    }
    
    pop() {              // O(1)
        return this.items.pop();
    }
    
    peek() {             // O(1)
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    get size() {
        return this.items.length;
    }
}
```

---

## Linked List Stack

```javascript
class Stack {
    constructor() {
        this.head = null;
        this._size = 0;
    }
    
    push(value) {                    // O(1)
        const node = { value, next: this.head };
        this.head = node;
        this._size++;
    }
    
    pop() {                          // O(1)
        if (!this.head) return undefined;
        const value = this.head.value;
        this.head = this.head.next;
        this._size--;
        return value;
    }
    
    peek() {
        return this.head?.value;
    }
}
```

---

## Applications

### 1. Function Call Stack

```javascript
function a() { b(); }
function b() { c(); }
function c() { console.log("Hello"); }

a();

// Stack frames:
// Global → a() → b() → c()  (push)
// c() returns → b() returns → a() returns  (pop)
```

### 2. Undo System

```javascript
class UndoManager {
    constructor() {
        this.stack = [];
    }
    
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
        if (pairs[char]) {
            stack.push(char);        // Opening bracket
        } else {
            const last = stack.pop(); // Closing bracket
            if (pairs[last] !== char) return false;
        }
    }
    
    return stack.length === 0;
}

console.log(isBalanced("()"));       // true
console.log(isBalanced("({[]})"));   // true
console.log(isBalanced("({)"));      // false
```

### 4. Browser History (Back button)

```javascript
class BrowserHistory {
    constructor() {
        this.backStack = [];
        this.forwardStack = [];
    }
    
    visit(url) {
        this.backStack.push(url);
        this.forwardStack = []; // Clear forward on new visit
    }
    
    back() {
        if (this.backStack.length <= 1) return;
        this.forwardStack.push(this.backStack.pop());
    }
    
    forward() {
        if (this.forwardStack.length === 0) return;
        this.backStack.push(this.forwardStack.pop());
    }
    
    get current() {
        return this.backStack[this.backStack.length - 1];
    }
}
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does newest item leave first? | Yes — LIFO behavior. Stack pop returns the most recently pushed item. |
| Is recursion involved? | Recursion uses the call stack. Deep recursion can overflow the stack. |
| What data structure is best for undo? | Stack — push actions, pop to undo. |

---

# PART V — QUEUE

---

# Chapter 5 — Queue

## FIFO — First In, First Out

```text
Dequeue (remove from front)
    ←
  [10][20][30]
    →
Enqueue (add to back)
```

---

## Array-Based Queue (Inefficient)

```javascript
class Queue {
    constructor() {
        this.items = [];
    }
    
    enqueue(value) {      // O(1)
        this.items.push(value);
    }
    
    dequeue() {           // O(n) — shift moves everything
        return this.items.shift();
    }
    
    front() {
        return this.items[0];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}
```

`dequeue` is O(n) because `shift()` moves all elements. For efficiency, use a linked list or an object-based queue.

---

## Object-Based Queue (Efficient)

```javascript
class Queue {
    constructor() {
        this.items = {};
        this.frontIndex = 0;
        this.backIndex = 0;
    }
    
    enqueue(value) {              // O(1)
        this.items[this.backIndex] = value;
        this.backIndex++;
    }
    
    dequeue() {                   // O(1)
        if (this.isEmpty()) return undefined;
        const value = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;
        return value;
    }
    
    front() {
        return this.items[this.frontIndex];
    }
    
    isEmpty() {
        return this.frontIndex === this.backIndex;
    }
    
    get size() {
        return this.backIndex - this.frontIndex;
    }
}
```

---

## Linked List Queue

```javascript
class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }
    
    enqueue(value) {               // O(1)
        const node = { value, next: null };
        if (this.tail) this.tail.next = node;
        this.tail = node;
        if (!this.head) this.head = node;
        this._size++;
    }
    
    dequeue() {                    // O(1)
        if (!this.head) return undefined;
        const value = this.head.value;
        this.head = this.head.next;
        if (!this.head) this.tail = null;
        this._size--;
        return value;
    }
}
```

---

## Applications

### 1. Task Scheduling

```javascript
class TaskScheduler {
    constructor() {
        this.queue = new Queue();
    }
    
    addTask(task) {
        this.queue.enqueue(task);
    }
    
    processNext() {
        const task = this.queue.dequeue();
        if (task) task.execute();
    }
}
```

### 2. Breadth-First Search

Queue is used to explore nodes level by level (see BFS section).

### 3. Print Queue

```javascript
class PrintQueue {
    constructor() {
        this.jobs = [];
    }
    
    addJob(document) {
        this.jobs.push(document);
    }
    
    printNext() {
        const job = this.jobs.shift();
        if (job) console.log(`Printing: ${job}`);
    }
}
```

### 4. Event Loop (Macrotask Queue)

The browser's event loop uses a queue of macrotasks (setTimeout, click events, I/O).

---

## Deque (Double-Ended Queue)

```javascript
class Deque {
    constructor() {
        this.items = {};
        this.front = 0;
        this.back = 0;
    }
    
    addFront(value) {                    // O(1)
        this.front--;
        this.items[this.front] = value;
    }
    
    addBack(value) {                     // O(1)
        this.items[this.back] = value;
        this.back++;
    }
    
    removeFront() {                      // O(1)
        if (this.isEmpty()) return undefined;
        const value = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return value;
    }
    
    removeBack() {                       // O(1)
        if (this.isEmpty()) return undefined;
        this.back--;
        const value = this.items[this.back];
        delete this.items[this.back];
        return value;
    }
    
    isEmpty() {
        return this.front === this.back;
    }
}
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does oldest item leave first? | Yes — FIFO behavior. Queue dequeue returns the earliest enqueued item. |
| Is this BFS? | BFS uses a queue. If you see a queue being used for graph traversal, it's likely BFS. |
| Is the queue implemented efficiently? | Check if `dequeue` uses `shift()` (O(n)) or an index-based approach (O(1)). |

---

# PART VI — HASH TABLE

---

# Chapter 6 — Hash Table

## How Hash Tables Work

```text
Key → Hash Function → Hash → Index → Bucket → Value

"name" → hash("name") → 137 → 137 % 16 = 9 → bucket[9] → "John"
```

---

## JavaScript Objects and Maps

JavaScript objects and Maps are implemented using hash tables.

```javascript
const obj = {};
obj["name"] = "John";  // Hash of "name" determines storage location
obj["age"] = 30;

const map = new Map();
map.set("name", "John"); // Similar internal mechanism
map.set(obj, "metadata"); // Object keys also hashed
```

---

## Hash Collisions

When two different keys produce the same hash index:

```text
"name" → hash → index 9 → bucket[9] → "John"
"mane" → hash → index 9 → bucket[9] → "lion" ???
```

**Solution: Chaining** — Each bucket stores a linked list of entries.

```text
bucket[9] → ["name", "John"] → ["mane", "lion"]
```

---

## Simple Hash Function (Educational)

```javascript
function simpleHash(key, tableSize) {
    let hash = 0;
    const str = String(key);
    for (let i = 0; i < str.length; i++) {
        hash = (hash + str.charCodeAt(i) * (i + 1)) % tableSize;
    }
    return hash;
}
```

---

## Hash Table Implementation

```javascript
class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }
    
    _hash(key) {
        let total = 0;
        const PRIME = 31; // Prime numbers reduce collisions
        const str = String(key);
        for (let i = 0; i < Math.min(str.length, 100); i++) {
            const code = str.charCodeAt(i) - 96;
            total = (total * PRIME + code) % this.keyMap.length;
        }
        return total;
    }
    
    set(key, value) {                               // O(1) average
        const index = this._hash(key);
        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }
        // Check if key exists and update
        for (let pair of this.keyMap[index]) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }
        this.keyMap[index].push([key, value]);
    }
    
    get(key) {                                      // O(1) average
        const index = this._hash(key);
        if (this.keyMap[index]) {
            for (let pair of this.keyMap[index]) {
                if (pair[0] === key) return pair[1];
            }
        }
        return undefined;
    }
    
    keys() {
        const keys = [];
        for (let bucket of this.keyMap) {
            if (bucket) {
                for (let [key] of bucket) {
                    keys.push(key);
                }
            }
        }
        return keys;
    }
    
    values() {
        const values = [];
        for (let bucket of this.keyMap) {
            if (bucket) {
                for (let [, value] of bucket) {
                    values.push(value);
                }
            }
        }
        return values;
    }
}
```

---

## Complexity

| Operation | Average | Worst |
|-----------|---------|-------|
| Insert | O(1) | O(n) — many collisions |
| Lookup | O(1) | O(n) — all keys in same bucket |
| Delete | O(1) | O(n) |
| Resize | O(n) | O(n) |

Worst case is rare with a good hash function and proper load factor management.

---

## Applications

### 1. Caching / Memoization

```javascript
const memo = new Map();

function expensiveComputation(n) {
    if (memo.has(n)) return memo.get(n);
    const result = n * 1000; // Simulated expensive work
    memo.set(n, result);
    return result;
}
```

### 2. Counting Frequencies

```javascript
function countFrequencies(arr) {
    const freq = {};
    for (const item of arr) {
        freq[item] = (freq[item] || 0) + 1;
    }
    return freq;
}

console.log(countFrequencies([1, 2, 2, 3, 1, 2]));
// { 1: 2, 2: 3, 3: 1 }
```

### 3. Detecting Duplicates

```javascript
function hasDuplicates(arr) {
    const seen = new Set();
    for (const item of arr) {
        if (seen.has(item)) return true;
        seen.add(item);
    }
    return false;
}

console.log(hasDuplicates([1, 2, 3, 1])); // true
console.log(hasDuplicates([1, 2, 3]));    // false
```

### 4. Two Sum (Classic Problem)

```javascript
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
// O(n) time, O(n) space
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Need fast lookup? | Hash table — O(1) average lookup. |
| Can we avoid nested loops with a hash map? | Yes. If you have nested loops to find matches, a hash map can often reduce O(n²) to O(n). |
| Is a hash table being used for caching? | Check for `Map`, `Set`, `WeakMap`, or `{}` used to store computed results. |
| Are there hash collisions? | With a good hash function and load factor, collisions are rare. Worst case: many keys in one bucket. |

---

# PART VII — TREES

---

# Chapter 7 — Binary Search Tree

## Tree Structure

```text
      50        ← Root
     /  \
   30    70     ← Children
  / \   / \
 20 40 60 80   ← Leaves
```

---

## Node

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;   // Smaller values
        this.right = null;  // Larger values
    }
}
```

---

## BST Rules

```text
For any node:
  left subtree  → all values < node.value
  right subtree → all values > node.value
```

---

## Insert — O(log n) average, O(n) worst

```javascript
insert(value) {
    const node = new Node(value);
    if (!this.root) {
        this.root = node;
        return this;
    }
    
    let current = this.root;
    while (true) {
        if (value === current.value) return undefined; // No duplicates
        if (value < current.value) {
            if (!current.left) {
                current.left = node;
                return this;
            }
            current = current.left;
        } else {
            if (!current.right) {
                current.right = node;
                return this;
            }
            current = current.right;
        }
    }
}
```

---

## Find — O(log n) average, O(n) worst

```javascript
find(value) {
    if (!this.root) return undefined;
    let current = this.root;
    while (current) {
        if (value === current.value) return current;
        if (value < current.value) current = current.left;
        else current = current.right;
    }
    return undefined;
}
```

---

## Traversal: BFS (Level Order)

```javascript
BFS() {
    const queue = [this.root];
    const visited = [];
    
    while (queue.length) {
        const node = queue.shift();
        visited.push(node.value);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    return visited;
}
//      50
//     /  \
//   30    70
//   / \
//  20 40
// BFS: [50, 30, 70, 20, 40]
```

---

## Traversal: DFS Pre-Order (Root → Left → Right)

```javascript
DFSPreOrder() {
    const visited = [];
    function traverse(node) {
        visited.push(node.value);
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return visited;
}
// DFS Pre-Order: [50, 30, 20, 40, 70]
```

---

## Traversal: DFS In-Order (Left → Root → Right)

```javascript
DFSInOrder() {
    const visited = [];
    function traverse(node) {
        if (node.left) traverse(node.left);
        visited.push(node.value);
        if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return visited;
}
// DFS In-Order: [20, 30, 40, 50, 70]  ← SORTED!
```

---

## Traversal: DFS Post-Order (Left → Right → Root)

```javascript
DFSPostOrder() {
    const visited = [];
    function traverse(node) {
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
        visited.push(node.value);
    }
    traverse(this.root);
    return visited;
}
// DFS Post-Order: [20, 40, 30, 70, 50]
```

---

## Delete — O(log n) average

```javascript
delete(value) {
    this.root = this._deleteNode(this.root, value);
}

_deleteNode(node, value) {
    if (!node) return null;
    
    if (value < node.value) {
        node.left = this._deleteNode(node.left, value);
    } else if (value > node.value) {
        node.right = this._deleteNode(node.right, value);
    } else {
        // Case 1: Leaf node
        if (!node.left && !node.right) return null;
        
        // Case 2: One child
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        
        // Case 3: Two children — find minimum in right subtree
        let minRight = node.right;
        while (minRight.left) minRight = minRight.left;
        node.value = minRight.value;
        node.right = this._deleteNode(node.right, minRight.value);
    }
    return node;
}
```

---

## Tree Complexity

| Operation | Average | Worst (unbalanced) |
|-----------|---------|-------------------|
| Insert | O(log n) | O(n) |
| Find | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

Worst case occurs when data is inserted in sorted order:

```text
Insert: 10, 20, 30, 40, 50

10
 \
  20
   \
    30
     \
      40
       \
        50
```

This is effectively a linked list. Use **balanced trees** (AVL, Red-Black) to prevent this.

---

## Tree Traversal Comparison

| Algorithm | Order | Uses | Space |
|-----------|-------|------|-------|
| BFS | Level by level | Shortest path, level-order | O(n) (queue) |
| DFS Pre-Order | Root first | Serializing a tree | O(log n) (stack) |
| DFS In-Order | Sorted order (BST) | Getting sorted values | O(log n) |
| DFS Post-Order | Children before parent | Deleting tree | O(log n) |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is tree balanced? | Check heights of left and right subtrees. If they differ by more than 1, it's unbalanced. |
| Is data sorted? | In-order traversal of a BST yields sorted values. |
| Need sorted order? | Use in-order traversal O(n) or keep a separate sorted structure. |
| What traversal produces the tree structure? | Pre-order: [root, left, right] can be used to reconstruct the tree. |

---

# PART VIII — HEAP

---

# Chapter 8 — Binary Heap

## Max Heap Property

```text
Parent is always ≥ children

      100
     /   \
   50     70
   / \
  30 40
```

---

## Min Heap Property

```text
Parent is always ≤ children

      10
     /  \
   20    30
   / \
  40 50
```

---

## Array Representation

```javascript
// Heap is stored as an array
// For node at index i:
//   left child:  2i + 1
//   right child: 2i + 2
//   parent:      Math.floor((i - 1) / 2)

// [100, 50, 70, 30, 40]
//   0   1   2   3   4
```

---

## Max Heap Implementation

```javascript
class MaxHeap {
    constructor() {
        this.values = [];
    }
    
    parentIndex(i) { return Math.floor((i - 1) / 2); }
    leftChildIndex(i) { return 2 * i + 1; }
    rightChildIndex(i) { return 2 * i + 2; }
    
    insert(value) {                     // O(log n)
        this.values.push(value);
        this._bubbleUp();
    }
    
    _bubbleUp() {
        let index = this.values.length - 1;
        while (index > 0) {
            const parent = this.parentIndex(index);
            if (this.values[index] <= this.values[parent]) break;
            [this.values[index], this.values[parent]] = 
                [this.values[parent], this.values[index]];
            index = parent;
        }
    }
    
    extractMax() {                      // O(log n)
        if (this.values.length === 0) return undefined;
        const max = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this._sinkDown();
        }
        return max;
    }
    
    _sinkDown() {
        let index = 0;
        const length = this.values.length;
        while (true) {
            let left = this.leftChildIndex(index);
            let right = this.rightChildIndex(index);
            let swap = null;
            
            if (left < length && this.values[left] > this.values[index]) {
                swap = left;
            }
            if (right < length && this.values[right] > this.values[index]) {
                if (!swap || this.values[right] > this.values[left]) {
                    swap = right;
                }
            }
            if (!swap) break;
            [this.values[index], this.values[swap]] = 
                [this.values[swap], this.values[index]];
            index = swap;
        }
    }
    
    peek() {
        return this.values[0];
    }
    
    get size() {
        return this.values.length;
    }
}
```

---

## Min Heap Implementation

```javascript
class MinHeap {
    constructor() {
        this.values = [];
    }
    
    insert(value) {
        this.values.push(value);
        this._bubbleUp();
    }
    
    _bubbleUp() {
        let index = this.values.length - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.values[index] >= this.values[parent]) break;
            [this.values[index], this.values[parent]] = 
                [this.values[parent], this.values[index]];
            index = parent;
        }
    }
    
    extractMin() {
        if (this.values.length === 0) return undefined;
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this._sinkDown();
        }
        return min;
    }
    
    _sinkDown() {
        let index = 0;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let swap = null;
            
            if (left < this.values.length && this.values[left] < this.values[index]) {
                swap = left;
            }
            if (right < this.values.length && this.values[right] < this.values[index]) {
                if (!swap || this.values[right] < this.values[left]) {
                    swap = right;
                }
            }
            if (!swap) break;
            [this.values[index], this.values[swap]] = 
                [this.values[swap], this.values[index]];
            index = swap;
        }
    }
}
```

---

## Heap Applications

### 1. Priority Queue

```javascript
class PriorityQueue {
    constructor() {
        this.heap = new MinHeap(); // Lower priority number = higher priority
    }
    
    enqueue(value, priority) {
        this.heap.insert({ value, priority });
    }
    
    dequeue() {
        return this.heap.extractMin()?.value;
    }
}
```

### 2. Heap Sort (see Sorting section)

### 3. Dijkstra's Algorithm (shortest path)

---

## Heap Complexity

| Operation | Complexity |
|-----------|------------|
| Insert | O(log n) |
| Extract Max/Min | O(log n) |
| Peek | O(1) |
| Build from array | O(n) |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Need priority queue? | Use a heap. Insert and extract are O(log n). |
| Is this a max heap or min heap? | Check comparison: max heap has largest at root, min heap has smallest. |
| How is the heap stored? | Array: children at 2i+1 and 2i+2. No pointers needed. |

---

# PART IX — GRAPH

---

# Chapter 9 — Graph

## Graph Structure

```text
  A ---- B
  |      |
  C ---- D
  
  Vertices: A, B, C, D
  Edges: A-B, A-C, B-D, C-D
```

---

## Representations

### Adjacency List (Most Common)

```javascript
const graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
};
```

### Adjacency Matrix

```javascript
// Rows = source, Columns = target
//   A  B  C  D
// A 0  1  1  0
// B 1  0  0  1
// C 1  0  0  1
// D 0  1  1  0

const matrix = [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
];
```

---

## Graph Class (Adjacency List)

```javascript
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    
    addVertex(vertex) {                     // O(1)
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    
    addEdge(v1, v2) {                       // O(1)
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);    // Undirected graph
    }
    
    removeEdge(v1, v2) {                    // O(n)
        this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
        this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
    }
    
    removeVertex(vertex) {                  // O(n)
        while (this.adjacencyList[vertex].length) {
            const adjacent = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacent);
        }
        delete this.adjacencyList[vertex];
    }
}
```

---

## Graph Traversal — DFS (Stack)

```javascript
DFSRecursive(start) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;
    
    function dfs(vertex) {
        if (!vertex) return;
        visited[vertex] = true;
        result.push(vertex);
        for (const neighbor of adjacencyList[vertex]) {
            if (!visited[neighbor]) dfs(neighbor);
        }
    }
    
    dfs(start);
    return result;
}

// Graph: A-B-D-C
// DFS from A: ['A', 'B', 'D', 'C']
```

---

## Graph Traversal — BFS (Queue)

```javascript
BFS(start) {
    const queue = [start];
    const result = [];
    const visited = { [start]: true };
    
    while (queue.length) {
        const vertex = queue.shift();
        result.push(vertex);
        
        for (const neighbor of this.adjacencyList[vertex]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }
    
    return result;
}

// BFS from A: ['A', 'B', 'C', 'D']
```

---

## Graph Complexity

| Operation | Adjacency List | Adjacency Matrix |
|-----------|---------------|------------------|
| Add vertex | O(1) | O(V²) (resize) |
| Add edge | O(1) | O(1) |
| Remove vertex | O(V + E) | O(V²) |
| Remove edge | O(E) | O(1) |
| Find edge | O(V) worst | O(1) |
| Traverse (BFS/DFS) | O(V + E) | O(V²) |
| Space | O(V + E) | O(V²) |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Relationships? Connections? | The problem involves graphs. |
| Is this directed or undirected? | Directed: edges have direction (Twitter follow). Undirected: bidirectional (Facebook friends). |
| Is this weighted? | Edges have costs/distances (maps, network routing). |
| Need shortest path? | BFS (unweighted) or Dijkstra (weighted). |
| Need connected components? | Union-Find or DFS/BFS. |

---

# PART X — TRIE

---

# Chapter 10 — Trie (Prefix Tree)

## Word Storage

```text
Root
 │
 └── c
      │
      └── a
           │
           ├── t ← "cat" (end)
           │
           └── r
                │
                └── e ← "care" (end)
```

---

## Implementation

```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {                              // O(n) — n = word length
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }
    
    search(word) {                              // O(n)
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return node.isEndOfWord;
    }
    
    startsWith(prefix) {                        // O(n)
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return true;
    }
    
    autocomplete(prefix) {                      // O(n + m)
        const results = [];
        let node = this.root;
        
        // Navigate to end of prefix
        for (const char of prefix) {
            if (!node.children[char]) return results;
            node = node.children[char];
        }
        
        // Collect all words from this node
        function collect(node, word) {
            if (node.isEndOfWord) results.push(word);
            for (const [char, child] of Object.entries(node.children)) {
                collect(child, word + char);
            }
        }
        
        collect(node, prefix);
        return results;
    }
}
```

---

## Applications

### Autocomplete

```javascript
const trie = new Trie();
trie.insert("cat");
trie.insert("car");
trie.insert("care");
trie.insert("card");
trie.insert("cart");

console.log(trie.autocomplete("ca"));
// ["cat", "car", "care", "card", "cart"]

console.log(trie.autocomplete("car"));
// ["car", "care", "card", "cart"]
```

---

## Trie vs Hash Table

| Feature | Trie | Hash Table |
|---------|------|------------|
| Prefix search | O(n) | O(n × m) — must scan all keys |
| Memory | More (child pointers) | Less |
| Insert | O(n) | O(1) average |
| Search | O(n) | O(1) average |
| Ordered traversal | Yes (alphabetical) | No |
| Key deletion | Complex | O(1) average |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this a word/prefix lookup? | Trie is ideal for dictionary and autocomplete problems. |
| Need prefix search? | Trie can find all words with a given prefix in O(n + m) time. |
| Is this a spell checker? | Trie + BFS/DFS for closest word suggestions. |

---

# PART XI — SEARCHING ALGORITHMS

---

# Chapter 11 — Linear Search

## Unsorted Array

```javascript
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}

console.log(linearSearch([10, 20, 30, 40], 30)); // 2
console.log(linearSearch([10, 20, 30, 40], 50)); // -1
```

Complexity: O(n) — worst case: element not present.

---

## Application: Built-in Methods

```javascript
arr.indexOf(30);     // O(n)
arr.includes(30);    // O(n)
arr.find(x => x > 20); // O(n)
arr.findIndex(x => x > 20); // O(n)
```

---

# Chapter 12 — Binary Search

## Sorted Array Required

```javascript
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1; // Not found
}

console.log(binarySearch([10, 20, 30, 40, 50], 30)); // 2
console.log(binarySearch([10, 20, 30, 40, 50], 5));  // -1
```

Complexity: O(log n)

---

## Execution Trace for [10, 20, 30, 40, 50], target 40

```text
left = 0, right = 4
mid = (0+4)/2 = 2 → arr[2] = 30 < 40 → left = 3

left = 3, right = 4
mid = (3+4)/2 = 3 → arr[3] = 40 = target → return 3
```

---

## Recursive Binary Search

```javascript
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
    return binarySearchRecursive(arr, target, left, mid - 1);
}
```

---

## Binary Search Variations

### Find First Occurrence

```javascript
function findFirst(arr, target) {
    let left = 0, right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching left
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}

console.log(findFirst([1, 2, 2, 2, 3, 4], 2)); // 1
```

### Find Last Occurrence

```javascript
function findLast(arr, target) {
    let left = 0, right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching right
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}
```

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Sorted data? | Use binary search O(log n) instead of linear search O(n). |
| Can divide by two? | Binary search divides the search space in half each iteration. |
| Is data sorted but modified? | Sorted data + frequent inserts → maintain sortedness or use BST. |

---

# PART XII — SORTING

---

# Chapter 13 — Bubble Sort

## Repeated Swaps

```javascript
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break; // Already sorted — optimization
    }
    return arr;
}

// Complexity: O(n²) worst, O(n) best (already sorted)
// Space: O(1) (in-place)
```

---

# Chapter 14 — Selection Sort

## Find Minimum Repeatedly

```javascript
function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

// Complexity: O(n²) always
// Space: O(1)
```

---

# Chapter 15 — Insertion Sort

## Insert into Correct Position

```javascript
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}

// Complexity: O(n²) worst, O(n) best (nearly sorted)
// Space: O(1)
```

---

# Chapter 16 — Merge Sort

## Divide, Conquer, Merge

```javascript
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    
    return [...result, ...left.slice(i), ...right.slice(j)];
}

// Complexity: O(n log n) always
// Space: O(n) (not in-place)
```

---

## Merge Sort Trace

```text
Input: [38, 27, 43, 3, 9, 82, 10]

Divide:
[38, 27, 43, 3]    [9, 82, 10]
[38, 27] [43, 3]    [9, 82] [10]
[38] [27] [43] [3]  [9] [82] [10]

Merge:
[27, 38] [3, 43]    [9, 82] [10]
[3, 27, 38, 43]     [9, 10, 82]
[3, 9, 10, 27, 38, 43, 82]
```

---

# Chapter 17 — Quick Sort

## Pivot and Partition

```javascript
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left >= right) return;
    
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
    
    return arr;
}

function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left - 1;
    
    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
}

// Complexity: O(n log n) average, O(n²) worst (bad pivot)
// Space: O(log n) (recursion stack)
```

---

## In-Place Quick Sort Trace

```text
Input: [10, 80, 30, 90, 40, 50, 70]
Pivot = 70

Partition:
[10, 30, 40, 50, 70, 90, 80]
                 ↑ pivot in correct position

Recurse left:  [10, 30, 40, 50]
Recurse right: [90, 80]
```

---

# Chapter 18 — Heap Sort

## Uses Heap

```javascript
function heapSort(arr) {
    const heap = new MaxHeap();
    
    // Build heap
    for (const value of arr) {
        heap.insert(value);
    }
    
    // Extract max in reverse order
    const sorted = [];
    while (heap.values.length) {
        sorted.unshift(heap.extractMax()); // Or push and reverse
    }
    
    return sorted;
}

// Complexity: O(n log n) always
// Space: O(n) or O(1) if done in-place
```

---

## In-Place Heap Sort

```javascript
function heapSortInPlace(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}
```

---

## Sorting Comparison

| Algorithm | Average | Worst | Space | Stable | In-Place |
|-----------|---------|-------|-------|--------|----------|
| Bubble Sort | O(n²) | O(n²) | O(1) | Yes | Yes |
| Selection Sort | O(n²) | O(n²) | O(1) | No | Yes |
| Insertion Sort | O(n²) | O(n²) | O(1) | Yes | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes | No |
| Quick Sort | O(n log n) | O(n²) | O(log n) | No | Yes |
| Heap Sort | O(n log n) | O(n log n) | O(1) | No | Yes |
| Timsort (V8) | O(n log n) | O(n log n) | O(n) | Yes | No |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Need stable sort? | Stable = preserves original order of equal elements. Merge sort is stable, quick sort is not. |
| Memory constraints? | Use in-place sort: heap sort (O(1) space) or quick sort (O(log n)). |
| Divide-and-conquer? | Merge sort and quick sort both divide the problem. |
| Nearly sorted data? | Insertion sort is O(n) on nearly sorted data. |

---

# PART XIII — RECURSION

---

# Chapter 19 — Recursion

## Function Calls Itself

```javascript
function factorial(n) {
    if (n === 1) return 1;       // Base case
    return n * factorial(n - 1); // Recursive case
}

console.log(factorial(5)); // 120
```

---

## Call Stack Trace

```text
factorial(5):
   5 * factorial(4)
        4 * factorial(3)
             3 * factorial(2)
                  2 * factorial(1)
                        return 1
                   return 2 * 1 = 2
              return 3 * 2 = 6
         return 4 * 6 = 24
    return 5 * 24 = 120
```

---

## Base Case vs Recursive Case

Every recursive function must have:

1. **Base case** — stops recursion (prevents infinite loop)
2. **Recursive case** — calls itself with modified arguments

---

## Common Recursion Patterns

### Tail Recursion

```javascript
function factorialTail(n, accumulator = 1) {
    if (n === 1) return accumulator;
    return factorialTail(n - 1, n * accumulator);
}
// Some engines optimize this (TCO)
```

### Helper Method Recursion

```javascript
function collectOdd(arr) {
    const result = [];
    
    function helper(input) {
        if (input.length === 0) return;
        if (input[0] % 2 !== 0) result.push(input[0]);
        helper(input.slice(1));
    }
    
    helper(arr);
    return result;
}
```

### Pure Recursion

```javascript
function collectOddPure(arr) {
    if (arr.length === 0) return [];
    if (arr[0] % 2 !== 0) {
        return [arr[0], ...collectOddPure(arr.slice(1))];
    }
    return collectOddPure(arr.slice(1));
}
```

---

## Recursion vs Iteration

| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| Readability | More readable for tree/graph problems | More readable for simple loops |
| Stack | Uses call stack (limited) | No extra stack |
| Performance | Function call overhead | Faster |
| Memory | O(depth) stack frames | O(1) typically |
| Infinite | Stack overflow | Infinite loop |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Base case? | The condition that stops the recursion (e.g., `n === 0`, `arr.length === 0`). |
| Recursive case? | The code path that calls the function again (e.g., `n * factorial(n-1)`). |
| Could this overflow? | If depth > ~10,000, stack overflow occurs. Consider iteration or tail recursion. |
| Is this tail-recursive? | The recursive call is the last operation. Some engines optimize this. |

---

# PART XIV — DYNAMIC PROGRAMMING

---

# Chapter 20 — Memoization

## Storing Repeated Results

```javascript
// Naive Fibonacci — O(2ⁿ)
function fib(n) {
    if (n <= 2) return 1;
    return fib(n - 1) + fib(n - 2);
}
// fib(40) → 331,160,281 calls!
```

---

## Memoized Fibonacci — O(n)

```javascript
function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// fibMemo(40) → 39 calls (each n computed once)
// fibMemo(1000) → works instantly
```

---

## Tabulation (Bottom-Up)

```javascript
function fibTab(n) {
    if (n <= 2) return 1;
    const table = [0, 1, 1]; // table[0] unused, table[1]=1, table[2]=1
    for (let i = 3; i <= n; i++) {
        table[i] = table[i - 1] + table[i - 2];
    }
    return table[n];
}
// O(n) time, O(n) space — can be optimized to O(1) space
```

---

## Classic DP: Knapsack Problem

```javascript
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}

// weights = [2, 3, 4, 5]
// values  = [3, 4, 5, 6]
// capacity = 8
// knapsack → 10 (items 0 and 3: 3 + 6 = 10, weight 2 + 5 = 7)
```

---

## Classic DP: Longest Common Subsequence

```javascript
function LCS(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

console.log(LCS("ABCD", "ACBD")); // 3 ("ABD" or "ACD")
```

---

## Memoization vs Tabulation

| Aspect | Memoization (Top-Down) | Tabulation (Bottom-Up) |
|--------|----------------------|----------------------|
| Approach | Recursive + cache | Iterative + table |
| Implementation | Easier (modify recursive) | More code but explicit |
| Performance | Slightly slower (recursion) | Faster (no recursion) |
| Space | O(n) stack + O(n) cache | O(n) table (can optimize) |
| Subproblems solved | Only needed ones | All possible ones |

---

# Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Repeated subproblems? | The same calculation appears multiple times in the recursion tree. DP eliminates this. |
| Overlapping calculations? | DP stores results the first time and reuses them. |
| Can memoization help? | If the function is pure and called repeatedly with the same arguments. |
| Is this top-down or bottom-up? | Top-down = recursion + memo. Bottom-up = iterative table. |

---

# PART XV — GREEDY ALGORITHMS

---

# Chapter 21 — Greedy Strategy

## Choose Best at Each Step

Greedy algorithms make the **locally optimal** choice at each step, hoping it leads to the globally optimal solution.

---

## Example: Coin Change

```javascript
function coinChange(coins, amount) {
    coins.sort((a, b) => b - a); // Descending
    let count = 0;
    let remaining = amount;
    
    for (const coin of coins) {
        while (remaining >= coin) {
            remaining -= coin;
            count++;
        }
    }
    
    return remaining === 0 ? count : -1;
}

console.log(coinChange([25, 10, 5, 1], 63));
// 25 + 25 + 10 + 1 + 1 + 1 = 6 coins
```

Note: Greedy only works for canonical coin systems (not all). For arbitrary coins, use DP.

---

## Example: Activity Selection

```javascript
function activitySelection(activities) {
    // Sort by finish time
    activities.sort((a, b) => a.end - b.end);
    
    const selected = [activities[0]];
    let lastEnd = activities[0].end;
    
    for (let i = 1; i < activities.length; i++) {
        if (activities[i].start >= lastEnd) {
            selected.push(activities[i]);
            lastEnd = activities[i].end;
        }
    }
    
    return selected;
}

const activities = [
    { start: 1, end: 4 },
    { start: 3, end: 5 },
    { start: 0, end: 6 },
    { start: 5, end: 7 },
    { start: 8, end: 9 }
];

console.log(activitySelection(activities));
// Selected: [1-4, 5-7, 8-9] — max 3 activities
```

---

## When Greedy Works

| Problem | Greedy Works? | Alternative |
|---------|--------------|-------------|
| Activity selection | Yes | — |
| Coin change (canonical) | Yes | DP for general case |
| Huffman coding | Yes | — |
| Dijkstra's shortest path | Yes | — |
| Minimum spanning tree | Yes (Prim, Kruskal) | — |
| Knapsack (fractional) | Yes | — |
| Knapsack (0/1) | No | DP |

---

# Chapter 22 — BACKTRACKING

## Explore, Undo, Try Again

```javascript
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    
    function isSafe(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        // Check upper-left diagonal
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        // Check upper-right diagonal
        for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        return true;
    }
    
    function placeQueens(row) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q';   // Try
                placeQueens(row + 1);     // Recurse
                board[row][col] = '.';    // Backtrack (undo)
            }
        }
    }
    
    placeQueens(0);
    return result;
}

console.log(solveNQueens(4));
// [
//   ['.Q..', '...Q', 'Q...', '..Q.'],
//   ['..Q.', 'Q...', '...Q', '.Q..']
// ]
```

---

## Backtracking Patterns

```javascript
function backtrack(state, options, result) {
    if (isSolution(state)) {
        result.push(copy(state));
        return;
    }
    
    for (const option of options) {
        if (isValid(option, state)) {
            makeMove(option, state);  // Try
            backtrack(state, options, result); // Recurse
            undoMove(option, state);  // Backtrack
        }
    }
}
```

---

## Applications: Sudoku Solver

```javascript
function solveSudoku(board) {
    function isValid(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) return false;
            if (board[i][col] === num) return false;
            const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const boxCol = 3 * Math.floor(col / 3) + (i % 3);
            if (board[boxRow][boxCol] === num) return false;
        }
        return true;
    }
    
    function solve() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === '.') {
                    for (let num = 1; num <= 9; num++) {
                        const char = String(num);
                        if (isValid(board, row, col, char)) {
                            board[row][col] = char;  // Try
                            if (solve()) return true; // Recurse
                            board[row][col] = '.';    // Backtrack
                        }
                    }
                    return false; // No valid number — backtrack
                }
            }
        }
        return true; // All cells filled
    }
    
    solve();
    return board;
}
```

---

# Chapter 23 — SLIDING WINDOW

## Efficient Subarray Problems

```javascript
// Maximum sum of any subarray of size k
function maxSubarraySum(arr, k) {
    if (arr.length < k) return null;
    
    let maxSum = 0;
    let windowSum = 0;
    
    // First window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i]; // Remove left, add right
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

console.log(maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39 (10+23+3+1+2)
// O(n) time, O(1) space
```

---

## Without Sliding Window (Brute Force) — O(n × k)

```javascript
function maxSubarraySumNaive(arr, k) {
    let max = -Infinity;
    for (let i = 0; i <= arr.length - k; i++) {
        let sum = 0;
        for (let j = i; j < i + k; j++) {
            sum += arr[j];
        }
        max = Math.max(max, sum);
    }
    return max;
}
// O(n × k) — recalculates sum for each window from scratch
```

---

## Variable Window Size

```javascript
// Smallest subarray with sum >= target
function minSubarrayLength(arr, target) {
    let left = 0;
    let sum = 0;
    let minLength = Infinity;
    
    for (let right = 0; right < arr.length; right++) {
        sum += arr[right]; // Expand window
        
        while (sum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            sum -= arr[left]; // Shrink from left
            left++;
        }
    }
    
    return minLength === Infinity ? 0 : minLength;
}

console.log(minSubarrayLength([2, 3, 1, 2, 4, 3], 7)); // 2 ([4, 3])
```

---

# Chapter 24 — TWO POINTERS

## Efficient Pair Problems

```javascript
// Two Sum in Sorted Array
function twoSumSorted(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        if (sum < target) left++;
        else right--;
    }
    
    return [-1, -1];
}

console.log(twoSumSorted([1, 3, 5, 7, 9, 11], 10)); // [1, 3] (3 + 7)
// O(n) time, O(1) space — instead of O(n²) brute force
```

---

## Remove Duplicates In-Place

```javascript
function removeDuplicates(arr) {
    if (arr.length === 0) return 0;
    
    let left = 0;
    for (let right = 1; right < arr.length; right++) {
        if (arr[right] !== arr[left]) {
            left++;
            arr[left] = arr[right];
        }
    }
    
    return left + 1; // New length
}

const arr = [1, 1, 2, 2, 3, 4, 4, 5];
const len = removeDuplicates(arr);
console.log(arr.slice(0, len)); // [1, 2, 3, 4, 5]
// O(n) time, O(1) space
```

---

## Three Sum

```javascript
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// [[-1, -1, 2], [-1, 0, 1]]
// O(n²) — much better than O(n³) brute force
```

---

# Chapter 25 — PREFIX SUM

## Fast Range Queries

```javascript
class PrefixSum {
    constructor(arr) {
        this.prefix = [0];
        for (let i = 0; i < arr.length; i++) {
            this.prefix[i + 1] = this.prefix[i] + arr[i];
        }
    }
    
    sumRange(left, right) {
        return this.prefix[right + 1] - this.prefix[left];
    }
}

const arr = [3, 1, 4, 1, 5, 9, 2, 6];
const ps = new PrefixSum(arr);

console.log(ps.sumRange(0, 2)); // 3 + 1 + 4 = 8
console.log(ps.sumRange(2, 5)); // 4 + 1 + 5 + 9 = 19
console.log(ps.sumRange(3, 7)); // 1 + 5 + 9 + 2 + 6 = 23
// O(n) build, O(1) query
```

---

## Use Cases

```javascript
// Number of subarrays with sum = k
function subarraySum(arr, k) {
    const prefixCount = new Map();
    prefixCount.set(0, 1);
    let sum = 0;
    let count = 0;
    
    for (const num of arr) {
        sum += num;
        // If prefix sum difference equals k, we found a subarray
        count += prefixCount.get(sum - k) || 0;
        prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
    }
    
    return count;
}

console.log(subarraySum([1, 1, 1], 2)); // 2 ([1,1] at index 0 and index 1)
```

---

# Chapter 26 — MONOTONIC STACK

## Next Greater Element

```javascript
function nextGreaterElement(arr) {
    const result = new Array(arr.length).fill(-1);
    const stack = []; // Stores indices
    
    for (let i = 0; i < arr.length; i++) {
        while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = arr[i];
        }
        stack.push(i);
    }
    
    return result;
}

console.log(nextGreaterElement([2, 1, 3, 4, 0, 5]));
// [3, 3, 4, 5, 5, -1]
// O(n) — each element pushed and popped once
```

---

## Largest Rectangle in Histogram

```javascript
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];
        
        while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
```

---

# Chapter 27 — BIT MANIPULATION

## Bitwise Operators

```javascript
// Basic operators
const and = 5 & 3;    // 0101 & 0011 = 0001 → 1
const or = 5 | 3;     // 0101 | 0011 = 0111 → 7
const xor = 5 ^ 3;    // 0101 ^ 0011 = 0110 → 6
const not = ~5;       // ~0101 = 1010 → -6 (two's complement)
const left = 5 << 1;  // 0101 << 1 = 1010 → 10
const right = 5 >> 1; // 0101 >> 1 = 0010 → 2
```

---

## Common Bit Operations

```javascript
// Check if bit at position k is set
function isBitSet(num, k) {
    return (num & (1 << k)) !== 0;
}

// Set bit at position k
function setBit(num, k) {
    return num | (1 << k);
}

// Clear bit at position k
function clearBit(num, k) {
    return num & ~(1 << k);
}

// Toggle bit at position k
function toggleBit(num, k) {
    return num ^ (1 << k);
}

// Count set bits
function countBits(n) {
    let count = 0;
    while (n) {
        count += n & 1;
        n >>>= 1; // Unsigned right shift
    }
    return count;
}

// Brian Kernighan's algorithm (faster)
function countBitsFast(n) {
    let count = 0;
    while (n) {
        n = n & (n - 1); // Clears the lowest set bit
        count++;
    }
    return count;
}
```

---

## Applications

```javascript
// Find single number (all others appear twice)
function singleNumber(arr) {
    return arr.reduce((acc, n) => acc ^ n, 0);
}
console.log(singleNumber([1, 2, 3, 2, 1])); // 3

// Check if number is power of two
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}
console.log(isPowerOfTwo(16)); // true
console.log(isPowerOfTwo(18)); // false
```

---

# ABSOLUTE REVERSE ENGINEERING TACTICAL QUESTIONS

When reading ANY algorithm ask:

---

### What is input?

Array? Object? Tree? Graph? Primitive? Size?

---

### What is output?

Single value? Array? Modified input? Side effect?

---

### Which data structure stores data?

Array (O(1) access, O(n) insert/delete)?
Object/Map (O(1) lookup)?
Set (unique values)?
Stack (LIFO)?
Queue (FIFO)?
Tree (hierarchical)?
Graph (relationships)?
Heap (priority)?

---

### Which algorithm transforms data?

Searching (linear, binary)?
Sorting (comparison, non-comparison)?
Traversal (BFS, DFS)?
Recursion (divide and conquer)?
Dynamic programming (memoization, tabulation)?
Greedy (local optimum)?
Backtracking (try-undo)?

---

### Time complexity?

Count the loops. Check for nested loops (O(n²)), division (O(log n)), or branching (O(2ⁿ)).

---

### Space complexity?

Are new arrays created? Recursion stack depth? Auxiliary data structures?

---

### Is recursion used?

What is the base case? Recursive case? Could it overflow?

---

### Is iteration used?

Single loop (O(n)), nested (O(n²)), two-pointer (O(n) without nesting)?

---

### Can memoization help?

Are there repeated calculations with the same inputs?

---

### Is sorting needed first?

Binary search needs sorted data. Two-pointer on sorted array is O(n).

---

### Is data already sorted?

If yes, binary search O(log n) > linear search O(n).

---

### Need queue?

BFS, level-order traversal, task scheduling.

---

### Need stack?

DFS, parsing (parentheses), undo, function calls.

---

### Need hash map?

Fast lookup, caching, frequency counting, removing nested loops.

---

### Need graph?

Relationships, paths, connections, networks, dependencies.

---

### Need tree?

Hierarchical data, sorted data needing fast operations, DOM, file systems.

---

### Need heap?

Priority queue, Dijkstra, scheduling, top K elements.

---

### Need BFS?

Shortest path in unweighted graph, level-order traversal.

---

### Need DFS?

Maze solving, cycle detection, topological sort, all paths.

---

### Need dynamic programming?

Optimal substructure + overlapping subproblems.

---

### Need greedy strategy?

Local optimum leads to global optimum (coin change, activity selection).

---

### Need backtracking?

Constraint satisfaction (N-Queens, Sudoku), generate all possibilities.

---

### Is there repeated work?

Identified by recursive calls with same arguments, nested loops scanning same data.

---

### Which step is bottleneck?

The operation with highest complexity. Optimize that first.

---

### Can complexity improve?

O(n²) → O(n log n) with sorting + binary search?
O(n²) → O(n) with hash map or two pointers?
O(2ⁿ) → O(n²) with DP?

---

# Senior Engineer Reverse Coding Process

Given code:

```javascript
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (arr[i] + arr[j] === target) return [i, j];
    }
}
```

Ask:

1. Why loop? — To check all pairs.
2. What does i, j represent? — Indices into array.
3. Can hashing remove loop? — Yes. Store seen values, check complement in O(1).
4. Can sorting help? — Sort + two pointers reduces O(n²) to O(n log n + n) = O(n log n).
5. Can two pointers help? — Yes, if array sorted.
6. Can recursion simplify? — Not needed here.
7. Complexity? — O(n²) time, O(1) space.
8. Memory usage? — Minimal.
9. Is there a known pattern? — Two Sum (hash map version is standard).

Improved version:

```javascript
function twoSum(arr, target) {
    const seen = {};
    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        if (complement in seen) return [seen[complement], i];
        seen[arr[i]] = i;
    }
    return [-1, -1];
}
// O(n) time, O(n) space
```

---

# Projects To Build

## Stack Calculator

Implement a calculator that uses a stack to evaluate postfix (RPN) expressions:

```javascript
// Input:  "3 4 + 2 *" → (3 + 4) * 2 = 14
function evaluateRPN(expression) {
    const stack = [];
    const tokens = expression.split(' ');
    
    for (const token of tokens) {
        if (!isNaN(token)) {
            stack.push(Number(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(a / b); break;
            }
        }
    }
    
    return stack.pop();
}

console.log(evaluateRPN("3 4 + 2 *")); // 14
console.log(evaluateRPN("5 1 2 + 4 * + 3 -")); // 14
```

---

## Queue Scheduler

Build a task scheduler with priority levels:

```javascript
class TaskScheduler {
    constructor() {
        this.high = [];
        this.medium = [];
        this.low = [];
    }
    
    addTask(task, priority = 'medium') {
        this[priority].push(task);
    }
    
    processNext() {
        if (this.high.length) return this.high.shift();
        if (this.medium.length) return this.medium.shift();
        if (this.low.length) return this.low.shift();
        return null;
    }
    
    processAll() {
        let task;
        while ((task = this.processNext())) {
            console.log(`Processing: ${task}`);
        }
    }
}
```

---

## Linked List Library

Build a full-featured linked list with reverse, detect cycle, find middle:

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    
    push(value) { /* O(1) */ }
    pop() { /* O(n) */ }
    get(index) { /* O(n) */ }
    set(index, value) { /* O(n) */ }
    insert(index, value) { /* O(n) */ }
    remove(index) { /* O(n) */ }
    reverse() { /* O(n) */ }
    
    detectCycle() {
        let slow = this.head;
        let fast = this.head;
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow === fast) return true;
        }
        return false;
    }
    
    findMiddle() {
        let slow = this.head;
        let fast = this.head;
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow?.value;
    }
    
    fromArray(arr) {
        for (const value of arr) this.push(value);
        return this;
    }
    
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}
```

---

## Binary Search Tree

Full BST with insert, find, delete, traverse:

```javascript
class BST {
    constructor() {
        this.root = null;
    }
    
    insert(value) { /* O(log n) average */ }
    find(value) { /* O(log n) average */ }
    delete(value) { /* O(log n) average */ }
    
    inOrder() { /* returns sorted array */ }
    preOrder() { /* root first */ }
    postOrder() { /* leaves first */ }
    
    isBalanced() {
        function check(node) {
            if (!node) return 0;
            const left = check(node.left);
            const right = check(node.right);
            if (left === -1 || right === -1 || Math.abs(left - right) > 1) return -1;
            return Math.max(left, right) + 1;
        }
        return check(this.root) !== -1;
    }
}
```

---

## Graph Traversal Engine

Build a graph with BFS, DFS, shortest path, connected components:

```javascript
class Graph {
    constructor() {
        this.list = {};
    }
    
    addVertex(v) { this.list[v] = []; }
    addEdge(v1, v2) { this.list[v1].push(v2); this.list[v2].push(v1); }
    
    BFS(start) { /* uses queue */ }
    DFS(start) { /* uses stack or recursion */ }
    
    shortestPath(start, end) {
        const queue = [start];
        const visited = { [start]: null };
        
        while (queue.length) {
            const current = queue.shift();
            if (current === end) {
                const path = [];
                let node = end;
                while (node !== null) {
                    path.unshift(node);
                    node = visited[node];
                }
                return path;
            }
            for (const neighbor of this.list[current]) {
                if (!(neighbor in visited)) {
                    visited[neighbor] = current;
                    queue.push(neighbor);
                }
            }
        }
        return null;
    }
    
    connectedComponents() {
        const visited = new Set();
        const components = [];
        
        for (const vertex in this.list) {
            if (!visited.has(vertex)) {
                const component = [];
                const queue = [vertex];
                visited.add(vertex);
                while (queue.length) {
                    const current = queue.shift();
                    component.push(current);
                    for (const neighbor of this.list[current]) {
                        if (!visited.has(neighbor)) {
                            visited.add(neighbor);
                            queue.push(neighbor);
                        }
                    }
                }
                components.push(component);
            }
        }
        return components;
    }
}
```

---

## Maze Solver (BFS + DFS)

```javascript
const maze = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
];
// 0 = open, 1 = wall

function solveMazeBFS(maze, start, end) {
    const rows = maze.length;
    const cols = maze[0].length;
    const queue = [[...start]];
    const visited = new Set([`${start[0]},${start[1]}`]);
    const prev = {};
    
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    while (queue.length) {
        const [r, c] = queue.shift();
        if (r === end[0] && c === end[1]) {
            // Reconstruct path
            const path = [];
            let key = `${r},${c}`;
            while (key) {
                const [pr, pc] = key.split(',').map(Number);
                path.unshift([pr, pc]);
                key = prev[key];
            }
            return path;
        }
        
        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            const key = `${nr},${nc}`;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                maze[nr][nc] === 0 && !visited.has(key)) {
                visited.add(key);
                prev[key] = `${r},${c}`;
                queue.push([nr, nc]);
            }
        }
    }
    return null; // No path
}
```

---

## Autocomplete System (Trie)

Full trie with insertion and prefix-based retrieval:

```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Autocomplete {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let node = this.root;
        for (const ch of word.toLowerCase()) {
            if (!node.children[ch]) node.children[ch] = new TrieNode();
            node = node.children[ch];
        }
        node.isEnd = true;
    }
    
    autocomplete(prefix) {
        let node = this.root;
        for (const ch of prefix.toLowerCase()) {
            if (!node.children[ch]) return [];
            node = node.children[ch];
        }
        return this._collect(node, prefix.toLowerCase());
    }
    
    _collect(node, prefix) {
        const results = [];
        if (node.isEnd) results.push(prefix);
        for (const [ch, child] of Object.entries(node.children)) {
            results.push(...this._collect(child, prefix + ch));
        }
        return results;
    }
}

const ac = new Autocomplete();
ac.insert("cat"); ac.insert("car"); ac.insert("care"); ac.insert("card");
ac.insert("cart"); ac.insert("dog"); ac.insert("door");
console.log(ac.autocomplete("ca")); // ["cat", "car", "care", "card", "cart"]
```

---

## Priority Queue (Heap)

Full priority queue with min-heap:

```javascript
class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    
    enqueue(value, priority) {
        this.heap.push({ value, priority });
        this._bubbleUp();
    }
    
    dequeue() {
        if (this.heap.length === 0) return null;
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this._sinkDown();
        }
        return min.value;
    }
    
    _bubbleUp() {
        let i = this.heap.length - 1;
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.heap[i].priority >= this.heap[parent].priority) break;
            [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
            i = parent;
        }
    }
    
    _sinkDown() {
        let i = 0;
        while (true) {
            let smallest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            if (left < this.heap.length && this.heap[left].priority < this.heap[smallest].priority) smallest = left;
            if (right < this.heap.length && this.heap[right].priority < this.heap[smallest].priority) smallest = right;
            if (smallest === i) break;
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            i = smallest;
        }
    }
    
    get size() { return this.heap.length; }
    get isEmpty() { return this.heap.length === 0; }
}
```

---

## Path Finding System (Dijkstra)

```javascript
function dijkstra(graph, start) {
    const distances = {};
    const prev = {};
    const pq = new PriorityQueue();
    
    // Initialize
    for (const vertex in graph) {
        distances[vertex] = vertex === start ? 0 : Infinity;
        prev[vertex] = null;
        pq.enqueue(vertex, distances[vertex]);
    }
    
    while (!pq.isEmpty) {
        const current = pq.dequeue();
        
        for (const neighbor in graph[current]) {
            const weight = graph[current][neighbor];
            const newDist = distances[current] + weight;
            
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                prev[neighbor] = current;
                pq.enqueue(neighbor, newDist);
            }
        }
    }
    
    return { distances, prev };
}

// Graph: weighted adjacency object
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 1, 'D': 5 },
    'C': { 'A': 2, 'B': 1, 'D': 8, 'E': 10 },
    'D': { 'B': 5, 'C': 8, 'E': 2 },
    'E': { 'C': 10, 'D': 2 }
};

const { distances, prev } = dijkstra(graph, 'A');
console.log(distances); // { A: 0, B: 3, C: 2, D: 8, E: 10 }
```

---

## Sudoku Solver (Backtracking)

```javascript
function solveSudoku(board) {
    function isValid(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) return false;
            if (board[i][col] === num) return false;
            const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const boxCol = 3 * Math.floor(col / 3) + (i % 3);
            if (board[boxRow][boxCol] === num) return false;
        }
        return true;
    }
    
    function solve() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === '.') {
                    for (let num = 1; num <= 9; num++) {
                        const char = String(num);
                        if (isValid(board, row, col, char)) {
                            board[row][col] = char;
                            if (solve()) return true;
                            board[row][col] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    solve();
    return board;
}

const puzzle = [
    ['5','3','.','.','7','.','.','.','.'],
    ['6','.','.','1','9','5','.','.','.'],
    ['.','9','8','.','.','.','.','6','.'],
    ['8','.','.','.','6','.','.','.','3'],
    ['4','.','.','8','.','3','.','.','1'],
    ['7','.','.','.','2','.','.','.','6'],
    ['.','6','.','.','.','.','2','8','.'],
    ['.','.','.','4','1','9','.','.','5'],
    ['.','.','.','.','8','.','.','7','9']
];

console.log(solveSudoku(puzzle));
```

---

## Dynamic Programming Library

Memoization decorator + classic DP problems:

```javascript
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const fib = memoize(function(n) {
    if (n <= 2) return 1;
    return fib(n - 1) + fib(n - 2);
});

console.log(fib(100)); // 354224848179261915075 (instant)

// Knapsack
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(capacity + 1).fill(0);
    for (let i = 0; i < n; i++) {
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[capacity];
}

// Longest Common Subsequence
function LCS(str1, str2) {
    const m = str1.length, n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = str1[i-1] === str2[j-1]
                ? 1 + dp[i-1][j-1]
                : Math.max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}
```

---

## Sorting Visualizer

Basic sorting algorithms with step logging:

```javascript
function visualizeSort(arr, algorithm) {
    console.log(`Sorting: [${arr}] using ${algorithm}`);
    const steps = [];
    
    function log(arr) {
        steps.push([...arr]);
    }
    
    if (algorithm === 'bubble') {
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    log(arr);
                }
            }
        }
    }
    
    if (algorithm === 'merge') {
        function mergeSort(arr) {
            if (arr.length <= 1) return arr;
            const mid = Math.floor(arr.length / 2);
            const left = mergeSort(arr.slice(0, mid));
            const right = mergeSort(arr.slice(mid));
            return merge(left, right);
        }
        function merge(left, right) {
            const result = [];
            let i = 0, j = 0;
            while (i < left.length && j < right.length) {
                result.push(left[i] <= right[j] ? left[i++] : right[j++]);
            }
            const merged = [...result, ...left.slice(i), ...right.slice(j)];
            log(merged);
            return merged;
        }
        arr = mergeSort(arr);
    }
    
    log(arr);
    console.log('Steps:', steps);
    return arr;
}

visualizeSort([5, 3, 8, 4, 2], 'bubble');
visualizeSort([5, 3, 8, 4, 2], 'merge');
```

---

# Part 11 Summary

| Concept | Key Takeaway |
|---------|-------------|
| Big O | Measures growth rate (not speed). Drop constants, drop lower-order terms, consider worst case. |
| O(1) | Constant time — array access, hash table lookup |
| O(log n) | Logarithmic — binary search, balanced tree operations |
| O(n) | Linear — single loop, linear search |
| O(n log n) | Linearithmic — merge sort, quick sort (average), heap sort |
| O(n²) | Quadratic — nested loops, bubble sort, selection sort |
| O(2ⁿ) | Exponential — naive Fibonacci, subsets |
| Arrays | O(1) access, O(n) shift/unshift, O(1) push/pop |
| Linked Lists | O(1) front insert/delete, O(n) access/search |
| Stack | LIFO — push/pop O(1) — undo systems, parsing, DFS |
| Queue | FIFO — enqueue/dequeue O(1) — task scheduling, BFS |
| Hash Table | O(1) average lookup — Map, Set, Object |
| BST | O(log n) average insert/find/delete — sorted data |
| Heap | O(log n) insert/extract — priority queue |
| Graph | O(V+E) traversal — BFS (queue), DFS (stack) |
| Trie | O(n) prefix search — autocomplete, dictionary |
| Binary Search | O(log n) — requires sorted data |
| Linear Search | O(n) — unsorted or small data |
| Merge Sort | O(n log n) — stable, O(n) space |
| Quick Sort | O(n log n) average, O(n²) worst — in-place |
| Recursion | Base case + recursive case — stack depth O(n) |
| Dynamic Programming | Memoization (top-down) + Tabulation (bottom-up) — eliminates repeated work |
| Greedy | Local optimum at each step — not always globally optimal |
| Backtracking | Try → recurse → undo — constraint satisfaction |
| Sliding Window | O(n) — subarray/substring problems |
| Two Pointers | O(n) — sorted pair problems, in-place duplicates |
| Prefix Sum | O(1) range sum queries after O(n) build |
| Monotonic Stack | O(n) — next greater element, histogram |
| Bit Manipulation | &, \|, ^, ~, <<, >> — flags, permissions, fast math |

---

# Next Part (Part 12)

We will enter one of the deepest areas of the JavaScript ecosystem:

# Memory Management, V8 Engine Internals, Execution Pipeline, JIT Compilation, Hidden Classes, Inline Caching, Garbage Collection, and Performance Engineering

This is the level where JavaScript engine developers and senior performance engineers think.
