# Part 11 Summary

<img src="https://media.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Key Concepts

| Concept | Key Takeaway |
|---|---|
| Big O | Measures growth rate (not speed). Drop constants, drop lower-order terms, consider worst case. |
| O(1) | Constant time — array access, hash table lookup |
| O(log n) | Logarithmic — binary search, balanced tree operations |
| O(n) | Linear — single loop, linear search |
| O(n log n) | Linearithmic — merge sort, quick sort (avg), heap sort |
| O(n²) | Quadratic — nested loops, bubble sort, selection sort |
| O(2ⁿ) | Exponential — naive Fibonacci, subsets |
| Arrays | O(1) access, O(n) shift/unshift, O(1) push/pop |
| Linked Lists | O(1) front insert/delete, O(n) access/search |
| Stack | LIFO — push/pop O(1) — undo, parsing, DFS |
| Queue | FIFO — enqueue/dequeue O(1) — task scheduling, BFS |
| Hash Table | O(1) avg lookup — Map, Set, Object |
| BST | O(log n) avg insert/find/delete — sorted data |
| Heap | O(log n) insert/extract — priority queue |
| Graph | O(V+E) traversal — BFS (queue), DFS (stack) |
| Trie | O(n) prefix search — autocomplete, dictionary |
| Binary Search | O(log n) — requires sorted data |
| Linear Search | O(n) — unsorted or small data |
| Merge Sort | O(n log n) — stable, O(n) space |
| Quick Sort | O(n log n) avg, O(n²) worst — in-place |
| Recursion | Base case + recursive case — stack depth O(n) |
| Dynamic Programming | Memoization (top-down) + Tabulation (bottom-up) — eliminates repeated work |
| Greedy | Local optimum at each step — not always globally optimal |
| Backtracking | Try → recurse → undo — constraint satisfaction |
| Sliding Window | O(n) — subarray/substring problems |
| Two Pointers | O(n) — sorted pair problems, in-place duplicates |
| Prefix Sum | O(1) range sum queries after O(n) build |
| Monotonic Stack | O(n) — next greater element, histogram |
| Bit Manipulation | &, \|, ^, ~, <<, >> — flags, permissions, fast math |

## Which Algorithm When?

| Scenario | Recommended Approach |
|---|---|
| Unsorted data, small n | Linear search |
| Sorted data | Binary search |
| Need stable sort | Merge sort |
| Memory constrained | Quick sort or heap sort |
| Nearly sorted input | Insertion sort (O(n)) |
| Find shortest path (unweighted) | BFS |
| Find any path / cycle detection | DFS |
| Shortest path (weighted) | Dijkstra (heap-based) |
| Find all permutations | Backtracking |
| Repeated expensive calculations | Memoization / DP |
| Locally optimal decisions | Greedy |

## Complexity Quick Reference

```
O(1)      → Array access, hash table get, push/pop, stack peek
O(log n)  → Binary search, BST insert/find, heap insert/extract
O(n)      → Linear search, array shift/unshift, BFS/DFS traversal
O(n log n)→ Merge sort, quick sort (avg), heap sort
O(n²)     → Bubble sort, selection sort, nested loops
O(2ⁿ)     → Naive Fibonacci, subsets
```

## Memory Trade-offs

| Data Structure | Time | Space | Trade-off |
|---|---|---|---|
| Array | O(1) access, O(n) insert/delete | O(n) | Fast access, slow mutation |
| Linked List | O(1) front ops, O(n) access | O(n) + pointers | Fast front, no random access |
| Hash Table | O(1) avg | O(n) | Fast lookups, unsorted |
| BST | O(log n) avg | O(n) | Sorted, balanced needed |
| Heap | O(log n) insert/extract | O(n) | Priority, no search |
| Graph (adj list) | O(V+E) traversal | O(V+E) | Sparse-friendly |
| Graph (adj matrix) | O(1) edge check | O(V²) | Dense-friendly |

## Choosing the Right Data Structure

```
Need fast O(1) lookup?              → Hash table (Map/Set/Object)
Need to maintain insertion order?   → Array or Linked List
Frequent front insertions/removals? → Linked List (O(1) vs Array O(n))
Last-In-First-Out needed?           → Stack
First-In-First-Out needed?          → Queue
Priority-based processing?          → Heap (Priority Queue)
Hierarchical/sorted data?           → BST
Relationships/connections?          → Graph
Prefix/autocomplete search?         → Trie
Range sum queries?                  → Prefix Sum
Subarray/substring optimization?    → Sliding Window
```

## Algorithm Strategy Selection

```
Searching:       Linear (O(n)) or Binary (O(log n) — sorted only)
Sorting:         Merge (stable, O(n) space) or Quick (in-place, O(log n) space)
Traversal:       BFS (queue, shortest path) or DFS (stack, all paths)
Optimization:    DP (overlapping subproblems) or Greedy (local → global)
Constraint:      Backtracking (try → undo)
```

## Next Part (Part 12)

Memory Management, V8 Engine Internals, Execution Pipeline, JIT Compilation, Hidden Classes, Inline Caching, Garbage Collection, and Performance Engineering
## Next Steps

[Back to Chapter 24](24-advanced-projects.md): Projects: Advanced Algorithms
[Proceed to Module 12](../12-v8-engine/README.md): V8 Engine Internals, Memory Management, JIT, Garbage Collection & Performance to learn about V8 internals and performance optimization.
