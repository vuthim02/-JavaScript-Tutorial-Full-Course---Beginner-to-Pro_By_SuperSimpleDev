# Graph

## Graph Structure

```
  A ---- B
  |      |
  C ---- D

Vertices: A, B, C, D
Edges: A-B, A-C, B-D, C-D
```

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

## Graph Class (Adjacency List)

```javascript
class Graph {
    constructor() { this.adjacencyList = {}; }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(v1, v2) {  // Undirected
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }

    removeEdge(v1, v2) {
        this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
        this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
    }

    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const adj = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adj);
        }
        delete this.adjacencyList[vertex];
    }
}
```

## DFS (Stack / Recursion)

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
// DFS from A: ['A', 'B', 'D', 'C']
```

## BFS (Queue)

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

## Complexity

| Operation | Adjacency List | Adjacency Matrix |
|---|---|---|
| Add vertex | O(1) | O(V²) |
| Add edge | O(1) | O(1) |
| Remove vertex | O(V + E) | O(V²) |
| Remove edge | O(E) | O(1) |
| Find edge | O(V) worst | O(1) |
| Traverse (BFS/DFS) | O(V + E) | O(V²) |
| Space | O(V + E) | O(V²) |

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Relationships? Connections? | The problem involves graphs. |
| Directed or undirected? | Directed: edges have direction (Twitter follow). Undirected: bidirectional (Facebook friends). |
| Weighted? | Edges have costs (maps, network routing). |
| Need shortest path? | BFS (unweighted) or Dijkstra (weighted). |
| Need connected components? | Union-Find or DFS/BFS. |
## Next Steps

[Back to Chapter 8](08-heap.md): Binary Heap
[Proceed to Chapter 10](10-trie.md): Trie (Prefix Tree) to learn about trie (prefix tree).
