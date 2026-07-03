# Greedy Algorithms

## Choose Best at Each Step

Greedy algorithms make the **locally optimal** choice at each step, hoping it leads to the globally optimal solution. They don't backtrack — once a decision is made, it's final.

Greedy works when a locally optimal choice leads to a globally optimal solution (optimal substructure property). Not all problems have this property.

## Example: Coin Change

```javascript
function coinChange(coins, amount) {
    coins.sort((a, b) => b - a); // Descending — use largest first
    let count = 0, remaining = amount;

    for (const coin of coins) {
        while (remaining >= coin) {
            remaining -= coin;
            count++;
        }
    }

    return remaining === 0 ? count : -1;
}

console.log(coinChange([25, 10, 5, 1], 63));
// 25 + 25 + 10 + 1 + 1 + 1 = 6 coins
```

Note: Greedy only works for canonical coin systems (standard US/EU currencies). For arbitrary coin values like `[1, 3, 4]` with amount 6, greedy picks `4+1+1=3` coins but optimal is `3+3=2` coins. Use Dynamic Programming for this.

## Example: Activity Selection

```javascript
function activitySelection(activities) {
    // Sort by finish time — earliest finishing first
    activities.sort((a, b) => a.end - b.end);

    const selected = [activities[0]];
    let lastEnd = activities[0].end;

    for (let i = 1; i < activities.length; i++) {
        if (activities[i].start >= lastEnd) {
            selected.push(activities[i]);
            lastEnd = activities[i].end;
        }
    }

    return selected;
}

const activities = [
    { start: 1, end: 4 }, { start: 3, end: 5 },
    { start: 0, end: 6 }, { start: 5, end: 7 },
    { start: 8, end: 9 }
];

console.log(activitySelection(activities));
// Selected: [1-4, 5-7, 8-9] — max 3 activities
```

Strategy: Always pick the activity that finishes earliest, then remove conflicting activities. This maximizes the number of activities.

Greedy algorithms are usually simple to implement and very fast (O(n log n) with sorting, or O(n) without). The challenge is proving they work for your specific problem.

## Example: Huffman Coding

Huffman coding builds an optimal prefix code by repeatedly merging the two least frequent characters. This greedy strategy produces the minimum possible weighted path length — it always works because of the optimal substructure of the problem.

## When Greedy Works

| Problem | Greedy Works? | Alternative |
|---|---|---|
| Activity selection | Yes | — |
| Coin change (canonical) | Yes | DP for general case |
| Huffman coding | Yes | — |
| Dijkstra's shortest path | Yes | — |
| Minimum spanning tree | Yes (Prim, Kruskal) | — |
| Knapsack (fractional) | Yes | — |
| Knapsack (0/1) | No | DP |

## Greedy vs DP

| Aspect | Greedy | Dynamic Programming |
|---|---|---|
| Decision | One choice at each step (final) | Explores all choices, picks best later |
| Backtracking | None | May reconsider earlier decisions |
| Proof required | Must prove local → global | Guaranteed optimal via subproblem solutions |
| Complexity | Usually faster (O(n log n)) | Usually slower (O(n²) or more) |
| Examples | Activity selection, Huffman | Knapsack, LCS, edit distance |

Remember: Greedy is fast and simple when it works. Always test with edge cases to verify optimality.

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Does local choice lead to global optimum? | If yes, greedy works. If choices affect future options, greedy may fail. |
| Is there a counterexample? | Test with edge cases. If greedy fails on any case, use DP. |
| Can sorting help? | Greedy often requires sorting first (by finish time, value, weight ratio, etc.). |
| Fractional vs 0/1? | Fractional knapsack is greedy-friendly (take highest value/weight). 0/1 knapsack needs DP. |
## Next Steps

[Back to Chapter 14](14-dynamic-programming.md): Dynamic Programming
[Proceed to Chapter 16](16-backtracking.md): Backtracking to learn about backtracking.
