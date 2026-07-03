# Searching

## Linear Search — O(n)

Works on unsorted arrays.

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

### Built-in Methods Using Linear Search

```javascript
arr.indexOf(30);          // O(n)
arr.includes(30);         // O(n)
arr.find(x => x > 20);    // O(n)
arr.findIndex(x => x > 20); // O(n)
```

## Binary Search — O(log n)

Requires sorted array.

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
    return -1;
}

console.log(binarySearch([10, 20, 30, 40, 50], 30)); // 2
console.log(binarySearch([10, 20, 30, 40, 50], 5));  // -1
```

### Execution Trace

```
left=0, right=4  →  mid=2  →  arr[2]=30 < 40  →  left=3
left=3, right=4  →  mid=3  →  arr[3]=40 = target  →  return 3
```

### Recursive Binary Search

```javascript
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
    return binarySearchRecursive(arr, target, left, mid - 1);
}
```

## Binary Search Variations

### Find First Occurrence

```javascript
function findFirst(arr, target) {
    let left = 0, right = arr.length - 1, result = -1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) { result = mid; right = mid - 1; }
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return result;
}
console.log(findFirst([1, 2, 2, 2, 3, 4], 2)); // 1
```

### Find Last Occurrence

```javascript
function findLast(arr, target) {
    let left = 0, right = arr.length - 1, result = -1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) { result = mid; left = mid + 1; }
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return result;
}
```

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Sorted data? | Use binary search O(log n) instead of linear O(n). |
| Can divide by two? | Binary search halves search space each iteration. |
| Sorted but modified? | Sorted data + frequent inserts → maintain sortedness or use BST. |
## Next Steps

[Back to Chapter 10](10-trie.md): Trie (Prefix Tree)
[Proceed to Chapter 12](12-sorting.md): Sorting to learn about sorting.
