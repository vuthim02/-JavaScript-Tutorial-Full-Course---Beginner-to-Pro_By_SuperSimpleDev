# Recursion

## Function Calls Itself

```javascript
function factorial(n) {
    if (n === 1) return 1;       // Base case
    return n * factorial(n - 1); // Recursive case
}

console.log(factorial(5)); // 120
```

A recursive function calls itself with modified arguments until it reaches a base case that stops the recursion.

## Call Stack Trace

```
factorial(5):
   5 * factorial(4)
       4 * factorial(3)
           3 * factorial(2)
               2 * factorial(1)
                   return 1
               return 2 * 1 = 2
           return 3 * 2 = 6
       return 4 * 6 = 24
   return 5 * 24 = 120
```

Each call is pushed onto the call stack. When the base case is reached, values unwind back up.

## Base Case vs Recursive Case

Every recursive function must have:

1. **Base case** — stops recursion (prevents infinite loop / stack overflow)
2. **Recursive case** — calls itself with modified arguments (progressing toward base case)

## Common Recursion Patterns

### Tail Recursion

```javascript
function factorialTail(n, accumulator = 1) {
    if (n === 1) return accumulator;
    return factorialTail(n - 1, n * accumulator);
}
// Some engines optimize this (TCO — Tail Call Optimization)
// No additional work after recursive call returns
```

### Helper Method Recursion

```javascript
function collectOdd(arr) {
    const result = [];

    function helper(input) {
        if (input.length === 0) return;
        if (input[0] % 2 !== 0) result.push(input[0]);
        helper(input.slice(1));
    }

    helper(arr);
    return result;
}

console.log(collectOdd([1, 2, 3, 4, 5])); // [1, 3, 5]
```

### Pure Recursion

```javascript
function collectOddPure(arr) {
    if (arr.length === 0) return [];
    if (arr[0] % 2 !== 0) return [arr[0], ...collectOddPure(arr.slice(1))];
    return collectOddPure(arr.slice(1));
}

console.log(collectOddPure([1, 2, 3, 4, 5])); // [1, 3, 5]
```

## Recursion vs Iteration

| Aspect | Recursion | Iteration |
|---|---|---|
| Readability | More readable for tree/graph problems | More readable for simple loops |
| Stack | Uses call stack (limited) | No extra stack |
| Performance | Function call overhead | Faster |
| Memory | O(depth) stack frames | O(1) typically |
| Infinite | Stack overflow | Infinite loop |

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Base case? | The condition that stops the recursion (e.g., `n === 0`, `arr.length === 0`). |
| Recursive case? | The code path that calls the function again (e.g., `n * factorial(n-1)`). |
| Could this overflow? | If depth > ~10,000, stack overflow occurs. Consider iteration or tail recursion. |
| Is this tail-recursive? | The recursive call is the last operation. Some engines optimize this (TCO). |
## Next Steps

[Back to Chapter 12](12-sorting.md): Sorting
[Proceed to Chapter 14](14-dynamic-programming.md): Dynamic Programming to learn about dynamic programming.
