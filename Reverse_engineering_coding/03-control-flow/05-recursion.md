# 05 — Recursion, Call Stack & Stack Overflow

<img src="https://media.giphy.com/media/l0HlwKpPGceLgQC9W/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Is Recursion?

A function that calls itself is **recursive**.

```javascript
function countdown(n) {
    if (n === 0) return;     // base case
    console.log(n);          // 5, 4, 3, 2, 1
    countdown(n - 1);        // recursive call
}
countdown(5);
```

## The Two Essential Parts

### 1. Base Case

The condition that stops recursion. Without it, the function calls itself forever.

```javascript
function countdown(n) {
    if (n === 0) return;     // ← BASE CASE: stops when n reaches 0
    console.log(n);
    countdown(n - 1);
}
```

### 2. Recursive Case

The function calls itself with modified arguments, moving toward the base case.

```javascript
countdown(n - 1);            // ← RECURSIVE CASE: moves toward 0
```

## Classic Recursive Examples

### Factorial

```javascript
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
console.log(factorial(5)); // 120
```

**Call stack for `factorial(5)`:**
```
factorial(5)
  → 5 * factorial(4)
      → 4 * factorial(3)
          → 3 * factorial(2)
              → 2 * factorial(1)
                  → return 1          (base case)
              → return 2 * 1 = 2
          → return 3 * 2 = 6
      → return 4 * 6 = 24
  → return 5 * 24 = 120
```
Maximum stack depth: 5 frames.

### Fibonacci

```javascript
function fibonacci(n) {
    if (n <= 1) return n;         // base cases: fib(0)=0, fib(1)=1
    return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(6)); // 8
```

**Call tree for `fibonacci(4)`:**
```
                 fib(4)
                /      \
          fib(3)        fib(2)
          /    \        /    \
     fib(2)   fib(1) fib(1) fib(0)
     /    \
 fib(1) fib(0)
```
Many redundant calculations — this is why memoization is needed.

### Sum of Array (Recursive)

```javascript
function sumArray(arr) {
    if (arr.length === 0) return 0;
    return arr[0] + sumArray(arr.slice(1));
}
console.log(sumArray([1, 2, 3, 4, 5])); // 15
```

### Reverse a String (Recursive)

```javascript
function reverse(str) {
    if (str === "") return "";
    return reverse(str.slice(1)) + str[0];
}
console.log(reverse("hello")); // "olleh"
```

### Flatten Nested Arrays

```javascript
function flatten(arr) {
    let result = [];
    for (const item of arr) {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item));  // recursive
        } else {
            result.push(item);                      // base case
        }
    }
    return result;
}
console.log(flatten([1, [2, [3, 4], 5], 6])); // [1, 2, 3, 4, 5, 6]
```

## Recursion vs Iteration

| Aspect              | Recursion                        | Iteration                        |
|---------------------|----------------------------------|----------------------------------|
| Memory              | Stack frames (O(depth))          | Single frame (O(1))              |
| Performance         | Slower (function call overhead)  | Faster                           |
| Readability         | Often more elegant               | Can be verbose                   |
| Stack overflow risk | Yes (deep recursion)             | No                               |
| Best for            | Tree traversal, divide-and-conquer | Simple linear tasks            |
| Mutual recursion    | Possible                         | Not applicable                   |

## Tail Recursion

A recursive call is **tail-recursive** if it is the **last operation** in the function and its result is returned directly (no further computation).

```javascript
// NOT tail-recursive — result is used in multiplication
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);   // multiplication after recursive call
}

// Tail-recursive — result is returned directly
function factorialTail(n, accumulator = 1) {
    if (n <= 1) return accumulator;
    return factorialTail(n - 1, n * accumulator);  // no pending operation
}
```

**Tail call optimization (TCO):** Some engines can optimize tail-recursive calls to reuse the current stack frame instead of creating a new one. However, V8 (Node/Chrome) does NOT implement TCO. Deno and Bun may vary.

## Memoization (Optimizing Recursion)

Store computed results to avoid redundant calculations:

```javascript
function memoizedFibonacci() {
    const cache = {};

    function fib(n) {
        if (n <= 1) return n;
        if (cache[n] !== undefined) {
            return cache[n];
        }
        cache[n] = fib(n - 1) + fib(n - 2);
        return cache[n];
    }

    return fib;
}

const fib = memoizedFibonacci();
console.log(fib(50)); // 12586269025 — instant, no stack overflow
```

## Stack Overflow

Each function call creates a stack frame. If calls are nested too deeply, the call stack runs out of memory, throwing a `RangeError: Maximum call stack size exceeded`.

```javascript
function infiniteRecursion() {
    infiniteRecursion();
}
infiniteRecursion();
// RangeError: Maximum call stack size exceeded
```

### Typical Stack Limits

| Environment | Approximate Limit |
|-------------|-------------------|
| Node.js     | ~10,000 frames    |
| Chrome      | ~10,000 frames    |
| Firefox     | ~30,000 frames    |
| Safari      | ~50,000 frames    |

### Causes of Stack Overflow

1. **Missing base case** — recursive call with no termination.
2. **Base case never reached** — e.g., `countdown(n - 2)` skips over 0.
3. **Too deep recursion** — valid algorithm but input exceeds stack limit.
4. **Accidental recursion** — e.g., a getter that returns `this.value`.

### Preventing Stack Overflow

**Solution 1: Iterative Rewrite**

```javascript
// Recursive — may overflow
function factorialR(n) {
    if (n <= 1) return 1;
    return n * factorialR(n - 1);
}

// Iterative — no stack growth
function factorialI(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

**Solution 2: Trampoline**

```javascript
function trampoline(fn) {
    return function(...args) {
        let result = fn(...args);
        while (typeof result === "function") {
            result = result();
        }
        return result;
    };
}

function factorialT(n, acc = 1) {
    if (n <= 1) return acc;
    return () => factorialT(n - 1, n * acc);  // return thunk instead of calling
}

const factorial = trampoline(factorialT);
console.log(factorial(100000)); // Works — no stack overflow
```

## Reverse Engineering Q&A

| Question | Answer |
|----------|--------|
| Where is the base case? | The condition that stops recursion. |
| Which parameter changes each call? | Moves toward the base case. |
| Does recursion eventually stop? | Only if the base case is reachable. |
| What is the depth of recursion? | How many nested calls before base case? |
| Is this stack-safe? | Could it overflow for large input? |
| Could this be rewritten iteratively? | Recursion can always be converted to iteration (with a manual stack). |
| Is there redundant computation? | Fibonacci without memoization recomputes subtrees. |
| Is this tail-recursive? | If the recursive call is the last operation. |
| Why isn't the function returning? | No base case or it's unreachable. |
## Next Steps

[Back to Chapter 4](04-iteration-loops.md): 04 — Iteration: `while`, `do...while`, `for`, `for...in`, `for...of`
[Proceed to Chapter 6](06-error-handling.md): 06 — Error Handling: `try`/`catch`/`finally`, Custom Errors, Defensive Programming to learn about 06 — error handling: `try`/`catch`/`finally`, custom errors, defensive programming.
