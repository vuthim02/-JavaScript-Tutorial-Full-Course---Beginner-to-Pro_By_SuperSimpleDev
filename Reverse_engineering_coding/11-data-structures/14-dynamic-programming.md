# Dynamic Programming

<img src="https://media.giphy.com/media/10zxDv7Hv5RF9C/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Memoization — Storing Repeated Results

Naive Fibonacci — O(2ⁿ) — repeated calculations explode exponentially:

```javascript
function fib(n) {
    if (n <= 2) return 1;
    return fib(n - 1) + fib(n - 2);
}
// fib(40) → 331,160,281 calls!
// fib(100) → impossibly slow
```

Memoized Fibonacci — O(n) — each n computed once and cached:

```javascript
function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// fibMemo(40) → 39 calls (each n computed once)
// fibMemo(1000) → works instantly
```

## Tabulation (Bottom-Up)

Build a table iteratively from the base case up:

```javascript
function fibTab(n) {
    if (n <= 2) return 1;
    const table = [0, 1, 1]; // table[0] unused, table[1]=1, table[2]=1
    for (let i = 3; i <= n; i++) table[i] = table[i - 1] + table[i - 2];
    return table[n];
}
// O(n) time, O(n) space — can be optimized to O(1) space with two vars
```

## Classic DP: Knapsack Problem

```javascript
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][capacity];
}

// weights = [2, 3, 4, 5], values = [3, 4, 5, 6], capacity = 8
// knapsack → 10 (items 0 and 3: 3 + 6 = 10, weight 2 + 5 = 7)
```

## Classic DP: Longest Common Subsequence

```javascript
function LCS(str1, str2) {
    const m = str1.length, n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}

console.log(LCS("ABCD", "ACBD")); // 3 ("ABD" or "ACD")
```

## Memoization vs Tabulation

| Aspect | Memoization (Top-Down) | Tabulation (Bottom-Up) |
|---|---|---|
| Approach | Recursive + cache | Iterative + table |
| Implementation | Easier (modify recursive) | More code but explicit |
| Performance | Slightly slower (recursion) | Faster (no recursion) |
| Space | O(n) stack + O(n) cache | O(n) table (can optimize) |
| Subproblems solved | Only needed ones | All possible ones |

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Repeated subproblems? | The same calculation appears multiple times in the recursion tree. DP eliminates this. |
| Overlapping calculations? | DP stores results the first time and reuses them. |
| Can memoization help? | If the function is pure and called repeatedly with the same arguments. |
| Is this top-down or bottom-up? | Top-down = recursion + memo. Bottom-up = iterative table. |
## Next Steps

[Back to Chapter 13](13-recursion.md): Recursion
[Proceed to Chapter 15](15-greedy.md): Greedy Algorithms to learn about greedy algorithms.
