# Projects: Advanced Algorithms

## Autocomplete System (Trie)

```javascript
class Autocomplete {
    constructor() { this.root = { children: {}, isEnd: false }; }

    insert(word) {
        let node = this.root;
        for (const ch of word.toLowerCase()) {
            if (!node.children[ch]) node.children[ch] = { children: {}, isEnd: false };
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
ac.insert("cat"); ac.insert("car"); ac.insert("care");
ac.insert("card"); ac.insert("cart"); ac.insert("dog"); ac.insert("door");
console.log(ac.autocomplete("ca")); // ["cat", "car", "care", "card", "cart"]
```

## Priority Queue (Min-Heap)

```javascript
class PriorityQueue {
    constructor() { this.heap = []; }

    enqueue(value, priority) {
        this.heap.push({ value, priority });
        let i = this.heap.length - 1;
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.heap[i].priority >= this.heap[p].priority) break;
            [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]]; i = p;
        }
    }

    dequeue() {
        if (!this.heap.length) return null;
        const min = this.heap[0], end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end; let i = 0;
            while (true) {
                let s = i, l = 2*i+1, r = 2*i+2;
                if (l < this.heap.length && this.heap[l].priority < this.heap[s].priority) s = l;
                if (r < this.heap.length && this.heap[r].priority < this.heap[s].priority) s = r;
                if (s === i) break;
                [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]]; i = s;
            }
        }
        return min.value;
    }

    get isEmpty() { return this.heap.length === 0; }
}
```

## Path Finding (Dijkstra)

```javascript
function dijkstra(graph, start) {
    const distances = {}, prev = {}, pq = new PriorityQueue();
    for (const v in graph) { distances[v] = v === start ? 0 : Infinity; prev[v] = null; pq.enqueue(v, distances[v]); }
    while (!pq.isEmpty) {
        const current = pq.dequeue();
        for (const neighbor in graph[current]) {
            const newDist = distances[current] + graph[current][neighbor];
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist; prev[neighbor] = current; pq.enqueue(neighbor, newDist);
            }
        }
    }
    return { distances, prev };
}

const graph = {
    'A': { 'B': 4, 'C': 2 }, 'B': { 'A': 4, 'C': 1, 'D': 5 },
    'C': { 'A': 2, 'B': 1, 'D': 8, 'E': 10 }, 'D': { 'B': 5, 'C': 8, 'E': 2 },
    'E': { 'C': 10, 'D': 2 }
};
console.log(dijkstra(graph, 'A').distances); // { A: 0, B: 3, C: 2, D: 8, E: 10 }
```

## DP Library

Memoization decorator + optimized knapsack:

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

const fib = memoize(function(n) { if (n <= 2) return 1; return fib(n - 1) + fib(n - 2); });
console.log(fib(100)); // 354224848179261915075 (instant)

// Knapsack — optimized 1D DP
function knapsack(weights, values, capacity) {
    const dp = Array(capacity + 1).fill(0);
    for (let i = 0; i < weights.length; i++) {
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

## Sorting Visualizer

```javascript
function visualizeSort(arr, algorithm) {
    const steps = [];
    function log(arr) { steps.push([...arr]); }

    if (algorithm === 'bubble') {
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; log(arr); }
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
            const result = []; let i = 0, j = 0;
            while (i < left.length && j < right.length) result.push(left[i] <= right[j] ? left[i++] : right[j++]);
            const merged = [...result, ...left.slice(i), ...right.slice(j)];
            log(merged); return merged;
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
## Next Steps

[Back to Chapter 23](23-projects.md): Projects: Foundational Data Structures
[Proceed to Chapter 25](25-summary.md): Part 11 Summary to learn about part 11 summary.
