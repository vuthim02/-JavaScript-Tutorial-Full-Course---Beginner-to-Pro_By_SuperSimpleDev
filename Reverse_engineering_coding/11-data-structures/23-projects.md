# Projects: Foundational Data Structures

<img src="https://media.giphy.com/media/wcgn5fVDjvR7pdvz4C/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Stack Calculator (RPN)

Evaluate postfix expressions using a stack:

```javascript
function evaluateRPN(expression) {
    const stack = [];
    const tokens = expression.split(' ');
    for (const token of tokens) {
        if (!isNaN(token)) {
            stack.push(Number(token));
        } else {
            const b = stack.pop(), a = stack.pop();
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

## Queue Scheduler

Task scheduler with priority levels:

```javascript
class TaskScheduler {
    constructor() { this.high = []; this.medium = []; this.low = []; }
    addTask(task, priority = 'medium') { this[priority].push(task); }
    processNext() {
        if (this.high.length) return this.high.shift();
        if (this.medium.length) return this.medium.shift();
        if (this.low.length) return this.low.shift();
        return null;
    }
    processAll() { let t; while ((t = this.processNext())) console.log(`Processing: ${t}`); }
}
```

## Linked List Library

Full list with reverse, cycle detection, find middle:

```javascript
class Node {
    constructor(value) { this.value = value; this.next = null; }
}

class LinkedList {
    constructor() { this.head = null; this.tail = null; this.length = 0; }

    push(value) {
        const node = new Node(value);
        if (!this.head) { this.head = node; this.tail = node; }
        else { this.tail.next = node; this.tail = node; }
        this.length++; return this;
    }

    pop() {
        if (!this.head) return undefined;
        let c = this.head, nt = c;
        while (c.next) { nt = c; c = c.next; }
        this.tail = nt; this.tail.next = null; this.length--;
        if (this.length === 0) this.head = this.tail = null;
        return c;
    }

    detectCycle() {
        let slow = this.head, fast = this.head;
        while (fast && fast.next) {
            slow = slow.next; fast = fast.next.next;
            if (slow === fast) return true;
        }
        return false;
    }

    findMiddle() {
        let slow = this.head, fast = this.head;
        while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
        return slow?.value;
    }

    fromArray(arr) { for (const v of arr) this.push(v); return this; }
    toArray() { const r = []; let c = this.head; while (c) { r.push(c.value); c = c.next; } return r; }
}
```

## Binary Search Tree

Full BST with insert, find, traversals, balance check:

```javascript
class BST {
    constructor() { this.root = null; }

    insert(value) {
        const node = new Node(value);
        if (!this.root) { this.root = node; return this; }
        let c = this.root;
        while (true) {
            if (value === c.value) return undefined;
            if (value < c.value) { if (!c.left) { c.left = node; return this; } c = c.left; }
            else { if (!c.right) { c.right = node; return this; } c = c.right; }
        }
    }

    find(value) {
        let c = this.root;
        while (c) { if (value === c.value) return c; c = value < c.value ? c.left : c.right; }
        return undefined;
    }

    inOrder() {
        const v = [];
        function t(n) { if (n.left) t(n.left); v.push(n.value); if (n.right) t(n.right); }
        t(this.root); return v;
    }

    isBalanced() {
        function check(n) {
            if (!n) return 0;
            const l = check(n.left), r = check(n.right);
            if (l === -1 || r === -1 || Math.abs(l - r) > 1) return -1;
            return Math.max(l, r) + 1;
        }
        return check(this.root) !== -1;
    }
}
```

## Graph Traversal Engine

BFS, DFS, shortest path, connected components:

```javascript
class Graph {
    constructor() { this.list = {}; }
    addVertex(v) { this.list[v] = []; }
    addEdge(v1, v2) { this.list[v1].push(v2); this.list[v2].push(v1); }

    shortestPath(start, end) {
        const queue = [start], visited = { [start]: null };
        while (queue.length) {
            const c = queue.shift();
            if (c === end) { const p = []; let n = end;
                while (n !== null) { p.unshift(n); n = visited[n]; } return p; }
            for (const nb of this.list[c]) { if (!(nb in visited)) { visited[nb] = c; queue.push(nb); } }
        }
        return null;
    }

    connectedComponents() {
        const visited = new Set(), components = [];
        for (const v in this.list) {
            if (!visited.has(v)) {
                const comp = [], queue = [v]; visited.add(v);
                while (queue.length) {
                    const c = queue.shift(); comp.push(c);
                    for (const nb of this.list[c]) { if (!visited.has(nb)) { visited.add(nb); queue.push(nb); } }
                }
                components.push(comp);
            }
        }
        return components;
    }
}
```

## Maze Solver (BFS)

```javascript
const maze = [
    [0, 1, 0, 0, 0], [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]
];

function solveMazeBFS(maze, start, end) {
    const R = maze.length, C = maze[0].length;
    const q = [[...start]], v = new Set([`${start[0]},${start[1]}`]), prev = {};
    const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
    while (q.length) {
        const [r, c] = q.shift();
        if (r === end[0] && c === end[1]) { const p = []; let k = `${r},${c}`;
            while (k) { const [pr, pc] = k.split(',').map(Number); p.unshift([pr, pc]); k = prev[k]; } return p; }
        for (const [dr, dc] of dirs) { const nr = r+dr, nc = c+dc, k = `${nr},${nc}`;
            if (nr>=0 && nr<R && nc>=0 && nc<C && maze[nr][nc]===0 && !v.has(k))
                { v.add(k); prev[k]=`${r},${c}`; q.push([nr, nc]); }
        }
    }
    return null;
}
```
## Next Steps

[Back to Chapter 22](22-reverse-engineering-tactics.md): Reverse Engineering Tactics
[Proceed to Chapter 24](24-advanced-projects.md): Projects: Advanced Algorithms to learn about projects: advanced algorithms.
