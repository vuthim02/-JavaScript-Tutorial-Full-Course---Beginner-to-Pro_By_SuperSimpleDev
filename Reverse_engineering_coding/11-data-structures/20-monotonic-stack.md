# Monotonic Stack

## Next Greater Element

A monotonic stack maintains elements in increasing or decreasing order. Each element is pushed and popped at most once, giving O(n) time — a significant improvement over the O(n²) brute force.

```javascript
function nextGreaterElement(arr) {
    const result = new Array(arr.length).fill(-1);
    const stack = []; // Stores indices (monotonically decreasing values)

    for (let i = 0; i < arr.length; i++) {
        // While current element is greater than element at stack top
        while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = arr[i]; // Current element is the next greater
        }
        stack.push(i);
    }

    return result;
}

console.log(nextGreaterElement([2, 1, 3, 4, 0, 5]));
// [3, 3, 4, 5, 5, -1]
// O(n) — each element pushed and popped once
```

How it works: The stack holds indices whose next greater element hasn't been found yet. When a larger element appears, it resolves all smaller elements on the stack.

## Daily Temperatures (Warmer Day)

```javascript
function dailyTemperatures(temps) {
    const result = new Array(temps.length).fill(0);
    const stack = []; // Indices with no warmer day found yet

    for (let i = 0; i < temps.length; i++) {
        while (stack.length > 0 && temps[i] > temps[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = i - idx; // Days until warmer
        }
        stack.push(i);
    }

    return result;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
// [1, 1, 4, 2, 1, 1, 0, 0]
// O(n) time, O(n) space
```

## Largest Rectangle in Histogram

```javascript
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;

    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];

        while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }

        stack.push(i);
    }

    return maxArea;
}

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
// O(n) — processes each bar once
```

The stack maintains bars in increasing height order. When a shorter bar comes, it calculates the area for all taller bars using the current index as the right boundary.

When solving these problems, think about what the stack should store (indices or values) and what order to maintain (increasing or decreasing). Usually indices are stored because you need position info for width/distance calculations.

## When to Use Monotonic Stack

- **Next Greater Element**: Find next larger value for each position (given `[2,1,3]` → `[3,3,-1]`)
- **Previous Greater Element**: Same stack, but resolve on the way in instead of out
- **Next Smaller Element**: Reverse comparison (use `>` instead of `<`)
- **Stock Span**: Consecutive days with lower price before current day
- **Maximum Histogram Area**: Largest rectangle that fits under the histogram bars

The monotonic stack is a "relationship problem" solver — it answers questions about how elements relate to their neighbors in terms of magnitude.

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Need next/previous greater/smaller? | Monotonic stack finds all of them in O(n). |
| Range-based problem? | Histogram, stock span, temperature problems use monotonic stacks. |
| Can sorting help? | No — order matters (original positions are needed). Stack preserves order. |
## Next Steps

[Back to Chapter 19](19-prefix-sum.md): Prefix Sum
[Proceed to Chapter 21](21-bit-manipulation.md): Bit Manipulation to learn about bit manipulation.
