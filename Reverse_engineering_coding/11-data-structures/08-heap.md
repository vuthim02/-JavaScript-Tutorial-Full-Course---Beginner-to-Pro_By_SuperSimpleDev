# Binary Heap

## Max Heap Property

Parent is always ≥ children:
```
      100
     /   \
   50     70
   / \
  30 40
```

## Min Heap Property

Parent is always ≤ children:
```
      10
     /  \
   20    30
   / \
  40 50
```

## Array Representation

```javascript
// For node at index i:
//   left child:  2i + 1
//   right child: 2i + 2
//   parent:      Math.floor((i - 1) / 2)

// [100, 50, 70, 30, 40]
//   0    1   2   3   4
```

## Max Heap Implementation

```javascript
class MaxHeap {
    constructor() { this.values = []; }

    parentIndex(i) { return Math.floor((i - 1) / 2); }
    leftChildIndex(i) { return 2 * i + 1; }
    rightChildIndex(i) { return 2 * i + 2; }

    insert(value) {
        this.values.push(value);
        this._bubbleUp();
    }

    _bubbleUp() {
        let index = this.values.length - 1;
        while (index > 0) {
            const parent = this.parentIndex(index);
            if (this.values[index] <= this.values[parent]) break;
            [this.values[index], this.values[parent]] = [this.values[parent], this.values[index]];
            index = parent;
        }
    }

    extractMax() {
        if (this.values.length === 0) return undefined;
        const max = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) { this.values[0] = end; this._sinkDown(); }
        return max;
    }

    _sinkDown() {
        let index = 0;
        const length = this.values.length;
        while (true) {
            let left = this.leftChildIndex(index);
            let right = this.rightChildIndex(index);
            let swap = null;
            if (left < length && this.values[left] > this.values[index]) swap = left;
            if (right < length && this.values[right] > this.values[index]) {
                if (!swap || this.values[right] > this.values[left]) swap = right;
            }
            if (!swap) break;
            [this.values[index], this.values[swap]] = [this.values[swap], this.values[index]];
            index = swap;
        }
    }

    peek() { return this.values[0]; }
    get size() { return this.values.length; }
}
```

## Min Heap Implementation

```javascript
class MinHeap {
    constructor() { this.values = []; }

    insert(value) { this.values.push(value); this._bubbleUp(); }

    _bubbleUp() {
        let index = this.values.length - 1;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.values[index] >= this.values[parent]) break;
            [this.values[index], this.values[parent]] = [this.values[parent], this.values[index]];
            index = parent;
        }
    }

    extractMin() {
        if (this.values.length === 0) return undefined;
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) { this.values[0] = end; this._sinkDown(); }
        return min;
    }

    _sinkDown() {
        let index = 0;
        while (true) {
            let left = 2 * index + 1, right = 2 * index + 2, swap = null;
            if (left < this.values.length && this.values[left] < this.values[index]) swap = left;
            if (right < this.values.length && this.values[right] < this.values[index]) {
                if (!swap || this.values[right] < this.values[left]) swap = right;
            }
            if (!swap) break;
            [this.values[index], this.values[swap]] = [this.values[swap], this.values[index]];
            index = swap;
        }
    }
}
```

## Applications

### Priority Queue
```javascript
class PriorityQueue {
    constructor() { this.heap = new MinHeap(); }
    enqueue(value, priority) { this.heap.insert({ value, priority }); }
    dequeue() { return this.heap.extractMin()?.value; }
}
```

### Heap Sort, Dijkstra's Algorithm

## Complexity

| Operation | Complexity |
|---|---|
| Insert | O(log n) |
| Extract Max/Min | O(log n) |
| Peek | O(1) |
| Build from array | O(n) |

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Need priority queue? | Use a heap. Insert/extract are O(log n). |
| Max heap or min heap? | Max heap: largest at root. Min heap: smallest at root. |
| How is heap stored? | Array: children at 2i+1 and 2i+2. No pointers needed. |
## Next Steps

[Back to Chapter 7](07-bst.md): Binary Search Tree
[Proceed to Chapter 9](09-graph.md): Graph to learn about graph.
