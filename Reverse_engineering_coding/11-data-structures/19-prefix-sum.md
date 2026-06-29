# Prefix Sum

<img src="https://media.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Fast Range Queries

Prefix sum builds an array where `prefix[i]` is the sum of elements `arr[0..i-1]`. This enables O(1) range sum queries after O(n) build time.

```javascript
class PrefixSum {
    constructor(arr) {
        this.prefix = [0];
        for (let i = 0; i < arr.length; i++) {
            this.prefix[i + 1] = this.prefix[i] + arr[i];
        }
    }

    // Sum of elements from index 'left' to 'right' (inclusive)
    sumRange(left, right) {
        return this.prefix[right + 1] - this.prefix[left];
    }
}

const arr = [3, 1, 4, 1, 5, 9, 2, 6];
const ps = new PrefixSum(arr);

console.log(ps.sumRange(0, 2)); // 3 + 1 + 4 = 8
console.log(ps.sumRange(2, 5)); // 4 + 1 + 5 + 9 = 19
console.log(ps.sumRange(3, 7)); // 1 + 5 + 9 + 2 + 6 = 23
// O(n) build, O(1) per query
```

How it works: `prefix[i]` stores the cumulative sum up to index `i-1`. The range sum `arr[left..right]` is `prefix[right+1] - prefix[left]`.

Without prefix sum, each `sumRange(left, right)` call would be O(n) — looping through the range.

## Use Case: Subarray Sum Equals K

```javascript
function subarraySum(arr, k) {
    const prefixCount = new Map();
    prefixCount.set(0, 1); // Empty prefix has sum 0
    let sum = 0;
    let count = 0;

    for (const num of arr) {
        sum += num;
        // If sum - k was seen before, subarrays between those indices sum to k
        count += prefixCount.get(sum - k) || 0;
        prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
    }

    return count;
}

console.log(subarraySum([1, 1, 1], 2)); // 2 ([1,1] at index 0 and index 1)
console.log(subarraySum([1, 2, 3], 3)); // 2 ([1,2] and [3])
// O(n) time, O(n) space
```

## Use Case: 2D Prefix Sum (Matrix)

For an image or matrix, prefix sum extends to 2D: `sum = prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]`. This enables O(1) queries on any submatrix.

### Visualization

```
arr =     [3,  1,  4,  1,  5,  9,  2,  6]
prefix = [0,  3,  4,  8,  9, 14, 23, 25, 31]
          ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑
          0   1   2   3   4   5   6   7   8

sumRange(2, 5) = prefix[6] - prefix[2] = 23 - 4 = 19
sumRange(3, 7) = prefix[8] - prefix[3] = 31 - 8 = 23
```

Prefix sum is a building block for more advanced algorithms like difference arrays (for range updates) and 2D prefix sums (for matrices).

Prefix sum is also useful for balancing queries (checking if a subarray can be split evenly) and for problems involving cumulative statistics like "number of subarrays with sum divisible by k" (using modulo on the prefix sums).

Another common pattern: prefix XOR for range XOR queries (same logic as prefix sum but with XOR instead of addition). For example, XOR of `arr[left..right]` = `prefixXOR[right+1] ^ prefixXOR[left]`.

Unlike prefix sum for sum queries, prefix XOR also works well with hash maps for counting subarrays with a specific XOR value.

## Applications Summary

- **Range sum queries** (1D): O(1) per query with prefix sum array
- **Range sum queries** (2D): O(1) per query with 2D prefix sum
- **Subarray sum equals k**: prefix sum + hash map
- **Range updates**: difference array (inverse of prefix sum) — O(1) per update
- **Running totals**: prefix sum applied live as data arrives

### Performance Comparison

```
Method          Build   Query   Space
Naive loop      O(1)    O(n)    O(1)
Prefix sum      O(n)    O(1)    O(n)
Fenwick tree    O(n)    O(log n) O(n)
Segment tree    O(n)    O(log n) O(n)
```

Prefix sum is the simplest and fastest for static arrays (no updates). For dynamic arrays with updates, use Fenwick tree or segment tree.

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Need range sum queries? | Prefix sum gives O(1) queries after O(n) build. |
| Repeated range calculations? | Prefix sum eliminates O(n) per query iteration. |
| Need prefix count as well? | Combine prefix sum with a hash map for subarray problems. |
| 2D range queries? | Extend to 2D prefix sum for O(1) submatrix sums. |
## Next Steps

[Back to Chapter 18](18-two-pointers.md): Two Pointers
[Proceed to Chapter 20](20-monotonic-stack.md): Monotonic Stack to learn about monotonic stack.
