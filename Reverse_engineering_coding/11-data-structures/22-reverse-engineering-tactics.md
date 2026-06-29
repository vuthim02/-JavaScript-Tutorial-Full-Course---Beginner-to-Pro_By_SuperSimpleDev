# Reverse Engineering Tactics

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


When reading ANY algorithm, ask these questions:

## What is input?
Array? Object? Tree? Graph? Primitive? Size?

## What is output?
Single value? Array? Modified input? Side effect?

## Which data structure stores data?
- Array (O(1) access, O(n) insert/delete)
- Object/Map (O(1) lookup)
- Set (unique values)
- Stack (LIFO)
- Queue (FIFO)
- Tree (hierarchical)
- Graph (relationships)
- Heap (priority)

## Which algorithm transforms data?
Searching (linear, binary), Sorting, Traversal (BFS, DFS), Recursion, DP, Greedy, Backtracking.

## Time complexity?
Count loops. Check for nested loops (O(n²)), division (O(log n)), branching (O(2ⁿ)).

## Space complexity?
New arrays created? Recursion stack depth? Auxiliary data structures?

## Is recursion used?
Base case? Recursive case? Could it overflow?

## Is iteration used?
Single loop (O(n)), nested (O(n²)), two-pointer (O(n) without nesting)?

## Can memoization help?
Repeated calculations with the same inputs?

## Is sorting needed first?
Binary search needs sorted data. Two-pointer on sorted array is O(n).

## Is data already sorted?
Binary search O(log n) > linear search O(n).

## Need queue?
BFS, level-order traversal, task scheduling.

## Need stack?
DFS, parsing (parentheses), undo, function calls.

## Need hash map?
Fast lookup, caching, frequency counting, removing nested loops.

## Need graph?
Relationships, paths, connections, networks, dependencies.

## Need tree?
Hierarchical data, sorted data needing fast ops, DOM, file systems.

## Need heap?
Priority queue, Dijkstra, scheduling, top K elements.

## Need BFS?
Shortest path in unweighted graph, level-order traversal.

## Need DFS?
Maze solving, cycle detection, topological sort, all paths.

## Need dynamic programming?
Optimal substructure + overlapping subproblems.

## Need greedy strategy?
Local optimum leads to global optimum (coin change, activity selection).

## Need backtracking?
Constraint satisfaction (N-Queens, Sudoku), generate all possibilities.

## Is there repeated work?
Recursive calls with same arguments, nested loops scanning same data.

## Which step is bottleneck?
Operation with highest complexity. Optimize that first.

## Can complexity improve?
- O(n²) → O(n log n) with sorting + binary search
- O(n²) → O(n) with hash map or two pointers
- O(2ⁿ) → O(n²) with DP

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
2. What do i, j represent? — Indices into array.
3. Can hashing remove loop? — Yes. Store seen values, check complement in O(1).
4. Can sorting help? — Sort + two pointers reduces O(n²) to O(n log n).
5. Can two pointers help? — Yes, if array sorted.
6. Can recursion simplify? — Not needed here.
7. Complexity? — O(n²) time, O(1) space.
8. Memory usage? — Minimal.
9. Known pattern? — Two Sum (hash map version is standard).

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
## Next Steps

[Back to Chapter 21](21-bit-manipulation.md): Bit Manipulation
[Proceed to Chapter 23](23-projects.md): Projects: Foundational Data Structures to learn about projects: foundational data structures.
