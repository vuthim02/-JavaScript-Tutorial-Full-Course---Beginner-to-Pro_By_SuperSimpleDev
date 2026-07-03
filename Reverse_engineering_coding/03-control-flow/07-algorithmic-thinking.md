# Algorithmic Thinking — Problem Solving with Code

## The Problem-Solving Template

When faced with any coding problem, follow this structured approach:

| Step | Description | Example |
|------|-------------|---------|
| 1. Understand | Read the problem. Identify inputs and expected outputs. | "Find the maximum number in an array" |
| 2. Edge Cases | What are the boundary conditions? | Empty array, single element, all negatives |
| 3. Brute Force | Solve it the simplest way first. | Loop through and compare each element |
| 4. Optimize | Can we make it faster or use less memory? | Use a single pass instead of nested loops |
| 5. Implement | Write clean, working code. | Handle edge cases, use meaningful names |
| 6. Test | Verify with examples AND edge cases. | `[]`, `[5]`, `[1, 2, 3]`, `[-1, -5, -2]` |

## Problem 1: Find Maximum

```javascript
function findMax(arr) {
    if (arr.length === 0) return undefined;     // edge case
    let max = arr[0];                           // assume first is max
    for (let i = 1; i < arr.length; i++) {      // start from second element
        if (arr[i] > max) {
            max = arr[i];                       // new maximum found
        }
    }
    return max;
}

console.log(findMax([3, 7, 2, 9, 5]));  // 9
console.log(findMax([]));               // undefined
console.log(findMax([5]));              // 5
```

## Problem 2: Contains Duplicate

```javascript
function containsDuplicate(arr) {
    const seen = new Set();
    for (const item of arr) {
        if (seen.has(item)) {
            return true;                // found a duplicate
        }
        seen.add(item);
    }
    return false;                       // all unique
}

console.log(containsDuplicate([1, 2, 3, 1]));   // true
console.log(containsDuplicate([1, 2, 3]));       // false
console.log(containsDuplicate([]));              // false
```

## Problem 3: Palindrome Check

A palindrome reads the same forward and backward: "racecar", "madam".

```javascript
function isPalindrome(str) {
    // Normalize: lowercase and remove non-alphanumeric characters
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;               // mismatch found
        }
        left++;
        right--;
    }
    return true;                        // all characters matched
}

console.log(isPalindrome("racecar"));           // true
console.log(isPalindrome("hello"));             // false
console.log(isPalindrome("A man, a plan, a canal: Panama"));  // true
```

### Recursive Palindrome

```javascript
function isPalindromeRecursive(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (str.length <= 1) return true;   // base case
    if (str[0] !== str[str.length - 1]) return false;
    return isPalindromeRecursive(str.slice(1, -1));
}
```

## Problem 4: Two Sum

Given an array and a target, find two numbers that add up to the target.

```javascript
// Brute force — O(n²)
function twoSumBrute(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

// Optimized — O(n) using a Map
function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];  // found the pair
        }
        seen.set(nums[i], i);                  // store current number
    }
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]
console.log(twoSum([3, 3], 6));          // [0, 1]
```

## Problem 5: FizzBuzz

Classic interview problem — print numbers 1 to n, but:
- Multiples of 3 → "Fizz"
- Multiples of 5 → "Buzz"
- Multiples of both → "FizzBuzz"

```javascript
function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

// Alternative: build string
function fizzBuzz2(n) {
    for (let i = 1; i <= n; i++) {
        let output = "";
        if (i % 3 === 0) output += "Fizz";
        if (i % 5 === 0) output += "Buzz";
        console.log(output || i);
    }
}
```

## Problem 6: Prime Number Checker

```javascript
function isPrime(num) {
    if (num <= 1) return false;          // 0 and 1 are not prime
    if (num <= 3) return true;           // 2 and 3 are prime
    if (num % 2 === 0 || num % 3 === 0) return false;

    // Check divisors up to sqrt(num)
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}

console.log(isPrime(2));    // true
console.log(isPrime(17));   // true
console.log(isPrime(25));   // false
console.log(isPrime(1));    // false
```

## Reverse Engineering Q&A

| Question | Answer |
|----------|--------|
| What is the problem asking for? | Restate the problem in your own words |
| What are the inputs and outputs? | List types, ranges, and edge cases |
| What is the brute force solution? | Simplest working solution first |
| Can we optimize? | Look for redundant work, nested loops, or unnecessary operations |
| What are the edge cases? | Empty input, single element, negative numbers, duplicates |
| Is there a simpler approach? | Consider Set, Map, or sorting to simplify |
| Does the solution handle all cases? | Test with examples AND edge cases |
| Can the solution be refactored? | Extract helper functions, improve naming |
## Next Steps

[Back to Chapter 6](06-error-handling.md): 06 — Error Handling: `try`/`catch`/`finally`, Custom Errors, Defensive Programming
[Proceed to Chapter 8](08-reverse-engineering-checklist.md): Senior Engineer Reverse Engineering Checklist to learn about senior engineer reverse engineering checklist.
