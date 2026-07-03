# Sliding Window

## Efficient Subarray Problems

The sliding window technique maintains a window (subarray) that slides across the array, avoiding redundant recalculations. It reduces O(n × k) to O(n).

Key insight: Instead of recalculating each window from scratch, the window is updated incrementally — subtract the element leaving, add the element entering.

## Fixed Window Size

Maximum sum of any subarray of size k:

```javascript
function maxSubarraySum(arr, k) {
    if (arr.length < k) return null;

    let maxSum = 0;
    let windowSum = 0;

    // First window
    for (let i = 0; i < k; i++) windowSum += arr[i];
    maxSum = windowSum;

    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i]; // Remove left, add right
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}

console.log(maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39 (10+23+3+1+2)
console.log(maxSubarraySum([2, 3, 4, 1, 5], 2)); // 7 (3+4)
// O(n) time, O(1) space
```

## Brute Force — O(n × k)

Without sliding window, each window is recalculated from scratch:

```javascript
function maxSubarraySumNaive(arr, k) {
    let max = -Infinity;
    for (let i = 0; i <= arr.length - k; i++) {
        let sum = 0;
        for (let j = i; j < i + k; j++) sum += arr[j];
        max = Math.max(max, sum);
    }
    return max;
}
// O(n × k) — recalculates sum for each window from scratch
```

Compare: for arr.length=1000 and k=100, naive does 100×1000 = 100K operations. Sliding window does 1000 operations. The difference grows as n and k increase.

## Variable Window Size

Smallest subarray with sum >= target:

```javascript
function minSubarrayLength(arr, target) {
    let left = 0;
    let sum = 0;
    let minLength = Infinity;

    for (let right = 0; right < arr.length; right++) {
        sum += arr[right]; // Expand window to the right

        while (sum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            sum -= arr[left]; // Shrink from the left
            left++;
        }
    }

    return minLength === Infinity ? 0 : minLength;
}

console.log(minSubarrayLength([2, 3, 1, 2, 4, 3], 7)); // 2 ([4, 3])
// O(n) time — each element added once, removed at most once
```

Variable window (expanding/shrinking) is common for problems like "longest substring without repeating characters" or "minimum window substring." Fixed window is for problems like "maximum sum of subarray of size k."

## Common Sliding Window Problems

| Problem | Window Type | Condition to Shrink |
|---|---|---|
| Maximum sum of size k | Fixed (k) | N/A (window slides, no shrink) |
| Minimum size subarray sum >= target | Variable (expand right) | Sum >= target (shrink left) |
| Longest substring without repeating chars | Variable (expand right) | Duplicate found (shrink left) |
| Longest substring with at most k distinct chars | Variable (expand right) | > k distinct (shrink left) |

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Subarray/substring problem? | Sliding window is often the optimal O(n) approach. |
| Fixed or variable window? | Fixed: subtract left, add right. Variable: expand right, shrink left. |
| Can brute force be improved? | If you see nested loops recalculating ranges, sliding window can help. |
| What about strings? | Same technique — use character frequency maps instead of sums. |
## Next Steps

[Back to Chapter 16](16-backtracking.md): Backtracking
[Proceed to Chapter 18](18-two-pointers.md): Two Pointers to learn about two pointers.
