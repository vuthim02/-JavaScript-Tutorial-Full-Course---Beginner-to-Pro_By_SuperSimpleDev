# Sorting

## Bubble Sort — O(n²)

Repeated swaps, largest bubbles to the end.

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
        if (!swapped) break; // Optimization: already sorted
    }
    return arr;
}
// O(n²) worst, O(n) best (already sorted), O(1) space
```

## Selection Sort — O(n²)

Find minimum and place at front.

```javascript
function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
        if (minIndex !== i) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}
// O(n²) always, O(1) space
```

## Insertion Sort — O(n²)

Insert each element into its correct position in the sorted portion.

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
// O(n²) worst, O(n) best (nearly sorted), O(1) space
```

## Merge Sort — O(n log n)

Divide, conquer, merge.

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
// O(n log n) always, O(n) space, stable
```

### Merge Sort Trace
```
Input: [38, 27, 43, 3, 9, 82, 10]
Divide: [38, 27, 43, 3] [9, 82, 10] → [38,27] [43,3] [9,82] [10]
Merge:  [27,38] [3,43] [9,82] [10] → [3,27,38,43] [9,10,82] → [3,9,10,27,38,43,82]
```

## Quick Sort — O(n log n) average

Pivot and partition, recurse.

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
// O(n log n) average, O(n²) worst (bad pivot), O(log n) space
```

### Quick Sort Trace
```
Input: [10, 80, 30, 90, 40, 50, 70], Pivot = 70
Partition: [10, 30, 40, 50, 70, 90, 80] → pivot in correct position
Recurse left: [10, 30, 40, 50]  Recurse right: [90, 80]
```

## Heap Sort — O(n log n)

```javascript
function heapSortInPlace(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1, right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}
// O(n log n) always, O(1) space
```

## Sorting Comparison

| Algorithm | Average | Worst | Space | Stable | In-Place |
|---|---|---|---|---|---|
| Bubble Sort | O(n²) | O(n²) | O(1) | Yes | Yes |
| Selection Sort | O(n²) | O(n²) | O(1) | No | Yes |
| Insertion Sort | O(n²) | O(n²) | O(1) | Yes | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes | No |
| Quick Sort | O(n log n) | O(n²) | O(log n) | No | Yes |
| Heap Sort | O(n log n) | O(n log n) | O(1) | No | Yes |
| Timsort (V8) | O(n log n) | O(n log n) | O(n) | Yes | No |

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Need stable sort? | Stable = preserves original order of equal elements. Merge sort is stable, quick sort is not. |
| Memory constraints? | Use in-place sort: heap sort (O(1) space) or quick sort (O(log n)). |
| Divide-and-conquer? | Merge sort and quick sort both divide the problem. |
| Nearly sorted data? | Insertion sort is O(n) on nearly sorted data. |
## Next Steps

[Back to Chapter 11](11-searching.md): Searching
[Proceed to Chapter 13](13-recursion.md): Recursion to learn about recursion.
