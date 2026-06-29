# Binary Search Tree

<img src="https://media.giphy.com/media/l0HlwKpPGceLgQC9W/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Tree Structure

```
      50        ← Root
     /  \
   30    70     ← Children
  / \   / \
 20 40 60 80   ← Leaves
```

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

## BST Rules

For any node: left subtree → all values < node.value, right subtree → all values > node.value.

## Insert — O(log n) average, O(n) worst

```javascript
insert(value) {
    const node = new Node(value);
    if (!this.root) { this.root = node; return this; }
    let current = this.root;
    while (true) {
        if (value === current.value) return undefined;
        if (value < current.value) {
            if (!current.left) { current.left = node; return this; }
            current = current.left;
        } else {
            if (!current.right) { current.right = node; return this; }
            current = current.right;
        }
    }
}
```

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
// BFS: [50, 30, 70, 20, 40]
```

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
// [50, 30, 20, 40, 70]
```

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
// [20, 30, 40, 50, 70] — SORTED!
```

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
// [20, 40, 30, 70, 50]
```

## Delete — O(log n) average

```javascript
delete(value) { this.root = this._deleteNode(this.root, value); }

_deleteNode(node, value) {
    if (!node) return null;
    if (value < node.value) node.left = this._deleteNode(node.left, value);
    else if (value > node.value) node.right = this._deleteNode(node.right, value);
    else {
        if (!node.left && !node.right) return null;       // Leaf
        if (!node.left) return node.right;                 // One child
        if (!node.right) return node.left;                 // One child
        let minRight = node.right;                         // Two children
        while (minRight.left) minRight = minRight.left;   // Find in-order successor
        node.value = minRight.value;
        node.right = this._deleteNode(node.right, minRight.value);
    }
    return node;
}
```

## Tree Complexity

| Operation | Average | Worst (unbalanced) |
|---|---|---|
| Insert | O(log n) | O(n) |
| Find | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

Worst case occurs with sorted insertion:
```
10 → 20 → 30 → 40 → 50  (effectively a linked list)
```
Use balanced trees (AVL, Red-Black) to prevent this.

## Tree Traversal Comparison

| Algorithm | Order | Uses | Space |
|---|---|---|---|
| BFS | Level by level | Shortest path, level-order | O(n) (queue) |
| DFS Pre-Order | Root first | Serializing a tree | O(log n) (stack) |
| DFS In-Order | Sorted order (BST) | Getting sorted values | O(log n) |
| DFS Post-Order | Children before parent | Deleting tree | O(log n) |

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Is tree balanced? | Check subtree heights. If they differ by >1, it's unbalanced. |
| Is data sorted? | In-order traversal of BST yields sorted values. |
| Need sorted order? | Use in-order traversal O(n) or keep separate sorted structure. |
| What traversal reconstructs tree? | Pre-order [root, left, right] can reconstruct the tree. |
## Next Steps

[Back to Chapter 6](06-hash-table.md): Hash Table
[Proceed to Chapter 8](08-heap.md): Binary Heap to learn about binary heap.
