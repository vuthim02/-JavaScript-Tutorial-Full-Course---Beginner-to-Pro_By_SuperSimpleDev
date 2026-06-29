# Debugging Challenge - Level 62

## Module 13: Advanced Functions Pt 2 - Function Composition and Recursion

---

### Error 1: Compose order reversed
**Description:** compose should apply functions right-to-left but applies left-to-right
```javascript
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}
const add1 = x => x + 1;
const double = x => x * 2;
const composed = compose(add1, double);
```

### Error 2: Pipe order wrong
**Description:** pipe should apply functions left-to-right but applies right-to-left
```javascript
function pipe(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}
```

### Error 3: Recursion missing base case
**Description:** factorial function has no base case, causes infinite recursion
```javascript
function factorial(n) {
  return n * factorial(n - 1);
}
```

### Error 4: Recursion wrong return value
**Description:** fibonacci returns wrong value for base cases
```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

### Error 5: Compose with no arguments
**Description:** compose with no arguments should return identity function
```javascript
function compose(...fns) {
  return fns.reduce((f, g) => x => f(g(x)));
}
```

### Error 6: Recursive flatten not flattening
**Description:** flatten function should recursively flatten nested arrays
```javascript
function flatten(arr) {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(val);
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}
```

### Error 7: Deep clone recursion circular
**Description:** deep clone should handle circular references
```javascript
function deepClone(obj) {
  const clone = {};
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      clone[key] = deepClone(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  }
  return clone;
}
```

### Error 8: Composition with async functions
**Description:** compose should handle async functions correctly
```javascript
function composeAsync(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}
```

### Error 9: Recursive sum off by one
**Description:** sum function returns incorrect value due to off-by-one error
```javascript
function sum(n) {
  if (n === 0) return 0;
  return n + sum(n - 1);
}
```

### Error 10: Pipe function not passing this
**Description:** pipe should preserve the this context
```javascript
function pipe(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}
```

### Error 11: Recursive object keys wrong
**Description:** get all keys from nested object recursively
```javascript
function getAllKeys(obj) {
  let keys = [];
  for (let key in obj) {
    keys.push(key);
    if (typeof obj[key] === 'object') {
      getAllKeys(obj[key]);
    }
  }
  return keys;
}
```

### Error 12: Composition with multiple args
**Description:** compose should handle functions that take multiple arguments
```javascript
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}
```

### Error 13: Recursive deep equality wrong
**Description:** deep equality check returns wrong result for nested objects
```javascript
function deepEqual(a, b) {
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object') return a === b;
  for (let key in a) {
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}
```

### Error 14: Pipe with zero functions
**Description:** pipe with no arguments should return identity
```javascript
function pipe(...fns) {
  return fns.reduce((acc, fn) => fn(acc));
}
```

### Error 15: Recursive string reversal
**Description:** reverse string recursively but returns wrong result
```javascript
function reverse(str) {
  if (str.length <= 1) return str;
  return str[0] + reverse(str.slice(1));
}
```

### Error 16: Compose logging side effect
**Description:** compose should not lose intermediate values with side effects
```javascript
function compose(f, g) {
  return function(x) {
    console.log(g(x));
    return f(g(x));
  };
}
```

### Error 17: Recursive binary search wrong
**Description:** binary search returns wrong index
```javascript
function binarySearch(arr, target, left, right) {
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearch(arr, target, left, mid - 1);
  return binarySearch(arr, target, mid + 1, right);
}
```

### Error 18: Recursive deep freeze
**Description:** Object.freeze should be applied recursively but skips nested
```javascript
function deepFreeze(obj) {
  Object.freeze(obj);
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      deepFreeze(obj[key]);
    }
  }
  return obj;
}
```

### Error 19: Recursive tree traversal wrong order
**Description:** in-order traversal visits nodes in wrong order
```javascript
function inOrder(node) {
  if (!node) return [];
  return [...inOrder(node.left), node.value, ...inOrder(node.right)];
}
```

### Error 20: Composition with function arrays
**Description:** compose should work with array of functions
```javascript
function composeAll(fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc));
  };
}
```

### Error 21: Recursive array chunk
**Description:** chunk array into smaller arrays recursively
```javascript
function chunk(arr, size) {
  if (arr.length === 0) return [];
  return [arr.slice(0, size), chunk(arr.slice(size), size)];
}
```

### Error 22: Compose with promises
**Description:** compose should properly chain promises
```javascript
function composeP(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}
```

### Error 23: Recursive GCD wrong
**Description:** greatest common divisor returns wrong result
```javascript
function gcd(a, b) {
  if (b === 0) return b;
  return gcd(b, a % b);
}
```

### Error 24: Pipe with mixed sync and async
**Description:** pipe should handle sync and async functions
```javascript
function pipeMixed(...fns) {
  return function(x) {
    return fns.reduce(async (acc, fn) => {
      const val = await acc;
      return fn(val);
    }, x);
  };
}
```

### Error 25: Recursive array product
**Description:** multiply all numbers in nested arrays
```javascript
function product(arr) {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      return product(val);
    }
    return acc * val;
  }, 1);
}
```

### Error 26: Compose with methods
**Description:** compose should work with object methods preserving this
```javascript
function composeMethods(fns, context) {
  return function(x) {
    return fns.reduce((acc, fn) => fn.call(context, acc), x);
  };
}
```

### Error 27: Recursive palindrome check
**Description:** palindrome check returns wrong result
```javascript
function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}
```

### Error 28: Recursive deep merge wrong
**Description:** deep merge should combine nested objects recursively
```javascript
function deepMerge(a, b) {
  const result = { ...a };
  for (let key in b) {
    if (typeof b[key] === 'object') {
      result[key] = deepMerge(a[key], b[key]);
    } else {
      result[key] = b[key];
    }
  }
  return result;
}
```

### Error 29: Recursive string length
**Description:** calculate string length recursively without .length
```javascript
function strLength(str) {
  if (str === '') return 0;
  return 1 + strLength(str.slice(1));
}
```

### Error 30: Compose with argument transformation
**Description:** compose should transform arguments between functions
```javascript
function compose(...fns) {
  return function(...args) {
    return fns.reduce((acc, fn) => fn(acc), args);
  };
}
```

### Error 31: Recursive array sum wrong
**Description:** sum of array elements returns wrong value
```javascript
function arraySum(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + arraySum(arr.slice(1));
}
```

### Error 32: Pipe with error handling
**Description:** pipe should propagate errors correctly
```javascript
function pipeWithError(...fns) {
  return function(x) {
    try {
      return fns.reduce((acc, fn) => fn(acc), x);
    } catch(e) {
      return x;
    }
  };
}
```

### Error 33: Recursive power function
**Description:** calculate power recursively with wrong exponent handling
```javascript
function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}
```

### Error 34: Recursive array reverse
**Description:** reverse array recursively but modifies original
```javascript
function reverseArr(arr) {
  if (arr.length <= 1) return arr;
  return [arr.pop(), ...reverseArr(arr)];
}
```

### Error 35: Compose with null checks
**Description:** compose should handle null/undefined intermediate values
```javascript
function compose(f, g) {
  return function(x) {
    const res = g(x);
    if (res == null) return null;
    return f(res);
  };
}
```

### Error 36: Recursive tower of hanoi
**Description:** tower of hanoi prints wrong instructions
```javascript
function hanoi(n, from, to, aux) {
  if (n === 1) {
    console.log(Move disk from ${from} to ${to});
    return;
  }
  hanoi(n - 1, from, aux, to);
  console.log(Move disk from ${from} to ${to});
  hanoi(n - 1, aux, to, from);
}
```

### Error 37: Recursive object filter
**Description:** filter object properties recursively based on predicate
```javascript
function deepFilter(obj, predicate) {
  const result = {};
  for (let key in obj) {
    if (predicate(key, obj[key])) {
      result[key] = obj[key];
    } else if (typeof obj[key] === 'object') {
      result[key] = deepFilter(obj[key], predicate);
    }
  }
  return result;
}
```

### Error 38: Composition with logging
**Description:** compose with logging should not change function behavior
```javascript
function composeWithLog(f, g) {
  return function(x) {
    console.log('Input:', x);
    const afterG = g(x);
    console.log('After g:', afterG);
    const afterF = f(afterG);
    console.log('After f:', afterF);
    return afterF;
  };
}
```

### Error 39: Recursive countdown wrong
**Description:** countdown should print numbers from n to 1
```javascript
function countdown(n) {
  if (n <= 0) return;
  console.log(n);
  countdown(n);
}
```

### Error 40: Pipe with array of functions
**Description:** pipe should accept array of functions
```javascript
function pipeArray(fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc));
  };
}
```

### Error 41: Recursive permutation
**Description:** generate all permutations of a string
```javascript
function permute(str) {
  if (str.length <= 1) return [str];
  const result = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remaining = str.slice(0, i) + str.slice(i + 1);
    const perms = permute(remaining);
    for (let perm of perms) {
      result.push(char + perm);
    }
  }
  return result;
}
```

### Error 42: Recursive array flatten depth
**Description:** flatten array to specific depth
```javascript
function flattenDepth(arr, depth) {
  if (depth === 0) return arr;
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flattenDepth(val, depth - 1));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}
```

### Error 43: Compose with multiple return values
**Description:** compose should handle functions returning arrays
```javascript
function composeArray(f, g) {
  return function(x) {
    return f(...g(x));
  };
}
```

### Error 44: Recursive directory tree
**Description:** build directory tree structure from flat paths
```javascript
function buildTree(paths) {
  const tree = {};
  for (let path of paths) {
    const parts = path.split('/');
    let current = tree;
    for (let part of parts) {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
  }
  return tree;
}
```

### Error 45: Recursive object comparison
**Description:** compare two objects recursively ignoring order
```javascript
function deepCompare(a, b) {
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object') return a === b;
  const keysA = Object.keys(a).sort();
  const keysB = Object.keys(b).sort();
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key, i) => key === keysB[i] && deepCompare(a[key], b[keysB[i]]));
}
```

### Error 46: Pipe with context
**Description:** pipe should allow passing context to functions
```javascript
function pipeWithContext(...fns) {
  return function(x, ctx) {
    return fns.reduce((acc, fn) => fn.call(ctx, acc), x);
  };
}
```

### Error 47: Recursive number to words
**Description:** convert number to English words recursively
```javascript
function numberToWords(n) {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  if (n < 10) return ones[n];
  if (n < 20) {
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    return teens[n - 10];
  }
  if (n < 100) {
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    return tens[Math.floor(n / 10)] + ' ' + numberToWords(n % 10);
  }
  return numberToWords(Math.floor(n / 100)) + ' hundred ' + numberToWords(n % 100);
}
```

### Error 48: Recursive array intersection
**Description:** find common elements across arrays recursively
```javascript
function intersection(...arrs) {
  if (arrs.length === 0) return [];
  if (arrs.length === 1) return arrs[0];
  const first = arrs[0];
  const rest = intersection(...arrs.slice(1));
  return first.filter(x => rest.includes(x));
}
```

### Error 49: Compose with side effects
**Description:** compose should not mutate arguments
```javascript
function compose(f, g) {
  return function(x) {
    const copy = { ...x };
    return f(g(copy));
  };
}
```

### Error 50: Recursive object paths
**Description:** get nested object property by dot-separated path
```javascript
function getPath(obj, path) {
  const parts = path.split('.');
  if (parts.length === 0) return obj;
  const [first, ...rest] = parts;
  if (obj[first] === undefined) return undefined;
  return getPath(obj[first], rest.join('.'));
}
```

### Error 51: Recursive set theory union
**Description:** union of multiple arrays recursively
```javascript
function union(...arrs) {
  if (arrs.length === 0) return [];
  if (arrs.length === 1) return [...new Set(arrs[0])];
  const [first, ...rest] = arrs;
  const restUnion = union(...rest);
  return [...new Set([...first, ...restUnion])];
}
```

### Error 52: Pipe with function modification
**Description:** pipe should not modify original functions
```javascript
function pipeAndLog(fns) {
  const augmented = fns.map(fn => {
    return function(x) {
      console.log('Calling:', fn.name);
      return fn(x);
    };
  });
  return function(x) {
    return augmented.reduce((acc, fn) => fn(acc), x);
  };
}
```

### Error 53: Recursive object map
**Description:** apply function to all values in nested object
```javascript
function deepMap(obj, fn) {
  const result = {};
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      result[key] = deepMap(obj[key], fn);
    } else {
      result[key] = fn(key, obj[key]);
    }
  }
  return result;
}
```

### Error 54: Recursive combination sum
**Description:** find all combinations that sum to target
```javascript
function combinationSum(candidates, target) {
  const result = [];
  function backtrack(start, current, sum) {
    if (sum === target) {
      result.push([...current]);
      return;
    }
    if (sum > target) return;
    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      backtrack(i, current, sum + candidates[i]);
      current.pop();
    }
  }
  backtrack(0, [], 0);
  return result;
}
```

### Error 55: Compose with validation
**Description:** compose with input validation between functions
```javascript
function composeValidated(f, g, validate) {
  return function(x) {
    const afterG = g(x);
    if (!validate(afterG)) throw new Error('Validation failed');
    return f(afterG);
  };
}
```

### Error 56: Recursive object assign deep
**Description:** deep assign properties from multiple sources
```javascript
function deepAssign(target, ...sources) {
  for (let source of sources) {
    for (let key in source) {
      if (typeof source[key] === 'object') {
        if (!target[key]) target[key] = {};
        deepAssign(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
```

### Error 57: Recursive XML parser
**Description:** parse simple XML string recursively
```javascript
function parseXML(xml) {
  if (!xml || xml.length === 0) return null;
  const tagMatch = xml.match(/<(\w+)>(.*?)<\/\1>/);
  if (!tagMatch) return xml;
  const [, tag, content] = tagMatch;
  return { tag, children: parseXML(content) };
}
```

### Error 58: Pipe with default value
**Description:** pipe with default value when intermediate result is undefined
```javascript
function pipeWithDefault(defaultVal, ...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => {
      if (acc === undefined) return defaultVal;
      return fn(acc);
    }, x);
  };
}
```

### Error 59: Recursive string compression
**Description:** compress consecutive duplicate characters
```javascript
function compress(str) {
  if (str.length <= 1) return str;
  let count = 1;
  let i = 1;
  while (i < str.length && str[i] === str[0]) {
    count++;
    i++;
  }
  return str[0] + count + compress(str.slice(i));
}
```

### Error 60: Recursive memoized fibonacci
**Description:** memoized fibonacci still slow due to scope issue
```javascript
function memoFib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = memoFib(n - 1, memo) + memoFib(n - 2, memo);
  return memo[n];
}
```

### Error 61: Recursive cartesian product
**Description:** compute cartesian product of arrays
```javascript
function cartesian(...arrays) {
  if (arrays.length === 0) return [[]];
  const [first, ...rest] = arrays;
  const restProduct = cartesian(...rest);
  const result = [];
  for (let item of first) {
    for (let product of restProduct) {
      result.push([item, ...product]);
    }
  }
  return result;
}
```

### Error 62: Recursive quick sort
**Description:** quick sort implementation has wrong pivot handling
```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x <= pivot);
  const right = arr.slice(1).filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

### Error 63: Recursive object omit
**Description:** omit keys from nested object recursively
```javascript
function deepOmit(obj, keys) {
  const result = {};
  for (let key in obj) {
    if (keys.includes(key)) continue;
    if (typeof obj[key] === 'object') {
      result[key] = deepOmit(obj[key], keys);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}
```

### Error 64: Recursive string expansion
**Description:** expand string with repeated patterns
```javascript
function expand(str) {
  const match = str.match(/(\d+)\[([a-z]+)\]/);
  if (!match) return str;
  const [, num, content] = match;
  const index = str.indexOf(match[0]);
  const before = str.slice(0, index);
  const after = str.slice(index + match[0].length);
  return before + content.repeat(parseInt(num)) + expand(after);
}
```

### Error 65: Recursive merge sort
**Description:** merge sort implementation has bug in merge step
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
  while (i < left.length || j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result;
}
```

### Error 66: Recursive JSON stringify
**Description:** custom JSON stringify for nested objects
```javascript
function stringify(obj) {
  if (typeof obj === 'string') return '"' + obj + '"';
  if (typeof obj === 'number') return String(obj);
  if (Array.isArray(obj)) {
    return '[' + obj.map(stringify).join(',') + ']';
  }
  const pairs = Object.entries(obj).map(([k, v]) => '"' + k + '":' + stringify(v));
  return '{' + pairs.join(',') + '}';
}
```

### Error 67: Recursive longest common subsequence
**Description:** find longest common subsequence of two strings
```javascript
function lcs(a, b) {
  if (a.length === 0 || b.length === 0) return '';
  if (a[0] === b[0]) return a[0] + lcs(a.slice(1), b.slice(1));
  const opt1 = lcs(a.slice(1), b);
  const opt2 = lcs(a, b.slice(1));
  return opt1.length > opt2.length ? opt1 : opt2;
}
```

### Error 68: Recursive tree node sum
**Description:** sum all values in a tree structure
```javascript
function treeSum(node) {
  if (!node) return 0;
  let sum = node.value || 0;
  if (node.children) {
    for (let child of node.children) {
      sum += treeSum(child);
    }
  }
  return sum;
}
```

### Error 69: Recursive zip arrays
**Description:** zip multiple arrays together into tuples
```javascript
function zip(...arrays) {
  if (arrays.some(arr => arr.length === 0)) return [];
  const heads = arrays.map(arr => arr[0]);
  const tails = arrays.map(arr => arr.slice(1));
  return [heads, ...zip(...tails)];
}
```

### Error 70: Recursive sudoku solver
**Description:** sudoku solver backtracking missing undo step
```javascript
function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
          }
        }
        return false;
      }
    }
  }
  return true;
}
function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}
```

### Issue 1: Recursion without memoization
**Description:** recursive fibonacci recalculates same values many times
```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

### Issue 2: Deep recursion may cause stack overflow
**Description:** recursive function depth depends on input size
```javascript
function sumRange(n) {
  if (n <= 0) return 0;
  return n + sumRange(n - 1);
}
sumRange(100000);
```

### Issue 3: Function composition with too many functions
**Description:** composing 20 functions makes debugging difficult
```javascript
const composed = compose(
  fn1, fn2, fn3, fn4, fn5,
  fn6, fn7, fn8, fn9, fn10,
  fn11, fn12, fn13, fn14, fn15,
  fn16, fn17, fn18, fn19, fn20
);
```

### Issue 4: Recursive function modifying external state
**Description:** recursion that modifies an external array is impure
```javascript
const result = [];
function collectValues(node) {
  result.push(node.value);
  if (node.children) {
    node.children.forEach(collectValues);
  }
}
```

### Issue 5: Pipe with mutable intermediate state
**Description:** pipe functions mutate shared state between calls
```javascript
function pipe(...fns) {
  return function(x) {
    let state = { value: x };
    fns.forEach(fn => {
      state = fn(state);
    });
    return state.value;
  };
}
```

### Issue 6: Recursion instead of iteration
**Description:** using recursion where a simple loop would be clearer
```javascript
function range(start, end) {
  if (start > end) return [];
  return [start, ...range(start + 1, end)];
}
```

### Issue 7: Composition with unused intermediate results
**Description:** compose creates intermediate results that are never used
```javascript
function compose(...fns) {
  return function(x) {
    let result = x;
    fns.forEach(fn => {
      result = fn(result);
      console.log('Intermediate:', result);
    });
    return result;
  };
}
```

### Issue 8: Recursion in production without safety check
**Description:** no maximum recursion depth check in production code
```javascript
function traverseDOM(node) {
  console.log(node.tagName);
  for (let child of node.children) {
    traverseDOM(child);
  }
}
```

### Issue 9: Multiple recursive calls without caching
**Description:** recursive function calls itself multiple times with same arguments
```javascript
function paths(n) {
  if (n <= 0) return 1;
  return paths(n - 1) + paths(n - 2) + paths(n - 3);
}
```

### Issue 10: Function composition array recreated each call
**Description:** composing creates new closure chain every call
```javascript
function createPipeline() {
  const steps = [trim, capitalize, addPeriod];
  return function(text) {
    return steps.reduce((acc, step) => step(acc), text);
  };
}
```

### Issue 11: Recursion with side effects in base case
**Description:** base case has side effects making function impure
```javascript
function printAndCount(n) {
  if (n <= 0) {
    console.log('Done');
    return 0;
  }
  console.log(n);
  return 1 + printAndCount(n - 1);
}
```

### Issue 12: Pipe function loses error stack trace
**Description:** error in pipe loses original stack trace
```javascript
function pipe(...fns) {
  return function(x) {
    try {
      return fns.reduce((acc, fn) => fn(acc), x);
    } catch(e) {
      throw new Error('Pipeline failed');
    }
  };
}
```

### Issue 13: Recursion with string concatenation
**Description:** recursive string building creates many intermediate strings
```javascript
function repeat(str, n) {
  if (n <= 0) return '';
  return str + repeat(str, n - 1);
}
```

### Issue 14: Compose with functions that have different arities
**Description:** composing functions with different argument counts
```javascript
const add = (a, b) => a + b;
const double = x => x * 2;
const composed = compose(double, add);
```

### Issue 15: Recursive function in event handler
**Description:** recursive call in event handler may cause stack overflow on rapid clicks
```javascript
button.addEventListener('click', function handleClick() {
  updateState();
  if (shouldContinue) {
    handleClick();
  }
});
```

### Issue 16: Deep compose with many functions
**Description:** deeply nested compose creates hard-to-read code
```javascript
const finalFn = compose(
  step1,
  compose(step2, step3),
  compose(step4, compose(step5, step6))
);
```

### Issue 17: Recursive object traversal without cycle detection
**Description:** traversing object that may have circular references
```javascript
function printAll(obj) {
  for (let key in obj) {
    console.log(key, ':', obj[key]);
    if (typeof obj[key] === 'object') {
      printAll(obj[key]);
    }
  }
}
```

### Issue 18: Recursive function using default parameters
**Description:** default parameter accumulator grows stack
```javascript
function sum(arr, acc = 0) {
  if (arr.length === 0) return acc;
  return sum(arr.slice(1), acc + arr[0]);
}
```

### Issue 19: Composition with redundant wrappers
**Description:** each compose call creates extra wrapper functions
```javascript
const pipeline = compose(
  x => fn1(x),
  x => fn2(x),
  x => fn3(x)
);
```

### Issue 20: Recursive generation of all subsets
**Description:** 2^n recursive calls for n elements
```javascript
function subsets(arr) {
  if (arr.length === 0) return [[]];
  const [first, ...rest] = arr;
  const subs = subsets(rest);
  return [...subs, ...subs.map(s => [first, ...s])];
}
```

### Issue 21: Pipe with non-function entries
**Description:** pipe should validate entries are functions
```javascript
function pipe(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => {
      if (typeof fn !== 'function') return acc;
      return fn(acc);
    }, x);
  };
}
```

### Issue 22: Recursive function with closure in loop
**Description:** recursion inside loop creating closures
```javascript
function createRecursiveFunctions() {
  const fns = [];
  for (let i = 0; i < 3; i++) {
    fns.push(function recurse(n) {
      if (n <= 0) return i;
      return recurse(n - 1);
    });
  }
  return fns;
}
```

### Issue 23: Recursive deep clone with prototype
**Description:** deep clone copies prototype chain unnecessarily
```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  const clone = Object.create(Object.getPrototypeOf(obj));
  for (let key in obj) {
    clone[key] = deepClone(obj[key]);
  }
  return clone;
}
```

### Issue 24: Multiple recursive calls in non-tail position
**Description:** non-tail recursion uses more stack memory
```javascript
function doubleRecursion(n) {
  if (n <= 0) return 1;
  return doubleRecursion(n - 1) + doubleRecursion(n - 1);
}
```

### Issue 25: Composition with functions that have side effects
**Description:** composing impure functions makes pipeline unpredictable
```javascript
const pipeline = compose(
  writeToFile,
  transformData,
  validateInput
);
```

### Issue 26: Recursive find with early return missing
**Description:** recursive find continues even after finding target
```javascript
function findNode(tree, target) {
  if (tree.value === target) return tree;
  if (tree.children) {
    for (let child of tree.children) {
      return findNode(child, target);
    }
  }
  return null;
}
```

### Issue 27: Multiple recursive calls without memo
**Description:** recursive calls with overlapping subproblems
```javascript
function gridPaths(m, n) {
  if (m === 1 || n === 1) return 1;
  return gridPaths(m - 1, n) + gridPaths(m, n - 1);
}
```

### Issue 28: Recursive function with too many parameters
**Description:** recursion with 5+ parameters is hard to read
```javascript
function complexRecur(data, index, acc, seen, depth, maxDepth) {
  if (depth > maxDepth) return acc;
  if (index >= data.length) return acc;
  if (seen.has(index)) return acc;
  seen.add(index);
  return complexRecur(data, index + 1, acc + data[index], seen, depth + 1, maxDepth);
}
```

### Issue 29: Pipe with mutation of accumulator
**Description:** pipe functions mutate accumulator object
```javascript
function pipe(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => {
      fn(acc);
      return acc;
    }, x);
  };
}
```

### Issue 30: Recursive validation without context
**Description:** recursive validator doesn't carry error context
```javascript
function validate(obj, rules) {
  for (let key in rules) {
    if (typeof obj[key] === 'object') {
      validate(obj[key], rules[key]);
    } else if (!rules[key](obj[key])) {
      return false;
    }
  }
  return true;
}
```

### Modify 1: Implement compose function
**Description:** compose functions right-to-left
```javascript
function compose(...fns) {
  // TODO: implement compose
}
```

### Modify 2: Implement pipe function
**Description:** pipe functions left-to-right
```javascript
function pipe(...fns) {
  // TODO: implement pipe
}
```

### Modify 3: Create recursive factorial with memoization
**Description:** factorial with caching for performance
```javascript
function memoFactorial(n) {
  // TODO: implement with memo
}
```

### Modify 4: Implement recursive deep flatten
**Description:** flatten nested arrays to any depth
```javascript
function deepFlatten(arr) {
  // TODO: implement recursively
}
```

### Modify 5: Create a recursive object path setter
**Description:** set value at nested path recursively
```javascript
function setPath(obj, path, value) {
  // TODO: implement recursively
}
```

### Modify 6: Implement function composition with error handling
**Description:** each step in compose should catch errors
```javascript
function composeSafe(...fns) {
  // TODO: implement with error handling
}
```

### Modify 7: Create recursive array deduplicate
**Description:** remove duplicates from nested arrays
```javascript
function deepUnique(arr) {
  // TODO: implement recursively
}
```

### Modify 8: Implement recursive object pick
**Description:** pick specific keys from nested object
```javascript
function deepPick(obj, keys) {
  // TODO: implement recursively
}
```

### Modify 9: Create recursive tree filter
**Description:** filter tree nodes based on predicate
```javascript
function filterTree(node, predicate) {
  // TODO: implement recursively
}
```

### Modify 10: Implement compose with async support
**Description:** compose that handles both sync and async functions
```javascript
function composeAsync(...fns) {
  // TODO: implement async compose
}
```

### Modify 11: Create recursive groupBy for nested data
**Description:** group array items by nested property
```javascript
function deepGroupBy(arr, keyPath) {
  // TODO: implement recursively
}
```

### Modify 12: Implement pipe with logging middleware
**Description:** add logging between pipe steps
```javascript
function pipeWithLog(...fns) {
  // TODO: implement with logging
}
```

### Modify 13: Create recursive text search in object
**Description:** find all values matching search string in nested object
```javascript
function deepSearch(obj, query) {
  // TODO: implement recursively
}
```

### Modify 14: Implement recursive array chunk
**Description:** split array into chunks recursively
```javascript
function chunk(arr, size) {
  // TODO: implement recursively
}
```

### Modify 15: Create compose that limits function arity
**Description:** compose should handle multi-arg functions
```javascript
function composeN(...fns) {
  // TODO: implement with arity handling
}
```

### Modify 16: Implement recursive object diff
**Description:** find differences between two nested objects
```javascript
function deepDiff(a, b) {
  // TODO: implement recursively
}
```

### Modify 17: Create recursive tree map
**Description:** transform every node in a tree
```javascript
function mapTree(node, fn) {
  // TODO: implement recursively
}
```

### Modify 18: Implement pipe with concurrency limits
**Description:** limit concurrent async operations in pipe
```javascript
function pipeConcurrent(limit, ...fns) {
  // TODO: implement with concurrency
}
```

### Modify 19: Create recursive object sorting
**Description:** sort keys of nested object alphabetically
```javascript
function deepSort(obj) {
  // TODO: implement recursively
}
```

### Modify 20: Implement compose with context preservation
**Description:** preserve this context through composed functions
```javascript
function composeWithContext(...fns) {
  // TODO: implement with context
}
```

### Modify 21: Create recursive URL parameter parser
**Description:** parse nested URL query parameters
```javascript
function parseParams(str) {
  // TODO: implement recursively
}
```

### Modify 22: Implement recursive string template
**Description:** replace nested template placeholders
```javascript
function renderTemplate(str, data) {
  // TODO: implement recursively
}
```

### Modify 23: Create recursive permutation generator
**Description:** generate all permutations with memoization
```javascript
function permutations(arr) {
  // TODO: implement with memo
}
```

### Modify 24: Implement compose with function names
**Description:** compose that tracks function names for debugging
```javascript
function composeNamed(...fns) {
  // TODO: implement with names
}
```

### Modify 25: Create recursive file size calculator
**Description:** calculate total size of nested file structure
```javascript
function totalSize(tree) {
  // TODO: implement recursively
}
```

### Modify 26: Implement recursive array rotation
**Description:** rotate array elements recursively
```javascript
function rotate(arr, n) {
  // TODO: implement recursively
}
```

### Modify 27: Create pipe with data transformation
**Description:** transform data shape through pipe steps
```javascript
function pipeTransform(transformers) {
  // TODO: implement with transforms
}
```

### Modify 28: Implement recursive number base converter
**Description:** convert number between bases recursively
```javascript
function toBase(n, base) {
  // TODO: implement recursively
}
```

### Modify 29: Create recursive HTML entity decoder
**Description:** decode nested HTML entities
```javascript
function decodeEntities(str) {
  // TODO: implement recursively
}
```

### Modify 30: Implement compose with intermediate validation
**Description:** validate data between compose steps
```javascript
function composeWithValidation(schemas, ...fns) {
  // TODO: implement with validation
}
```

### Modify 31: Create recursive neural network layer
**Description:** compute forward pass through nested layers
```javascript
function forward(layers, input) {
  // TODO: implement recursively
}
```

### Modify 32: Implement recursive CSV parser
**Description:** parse CSV with nested quotes and escapes
```javascript
function parseCSV(str) {
  // TODO: implement recursively
}
```

### Modify 33: Create pipe with retry logic
**Description:** retry failed steps in pipeline
```javascript
function pipeWithRetry(retries, ...fns) {
  // TODO: implement with retry
}
```

### Modify 34: Implement recursive XML builder
**Description:** build XML string from nested objects
```javascript
function buildXML(obj) {
  // TODO: implement recursively
}
```

### Modify 35: Create compose with rate limiting
**Description:** rate-limit each function in compose chain
```javascript
function composeRated(limits, ...fns) {
  // TODO: implement with rate limits
}
```

### Modify 36: Implement recursive markdown parser
**Description:** parse nested markdown elements
```javascript
function parseMarkdown(text) {
  // TODO: implement recursively
}
```

### Modify 37: Create recursive state updater
**Description:** update nested state immutably
```javascript
function updateState(state, path, updater) {
  // TODO: implement recursively
}
```

### Modify 38: Implement pipe with caching
**Description:** cache intermediate results in pipe
```javascript
function pipeWithCache(...fns) {
  // TODO: implement with caching
}
```

### Modify 39: Create recursive query builder
**Description:** build ORM-style queries recursively
```javascript
function buildQuery(filters) {
  // TODO: implement recursively
}
```

### Modify 40: Implement compose with progress callback
**Description:** report progress through composed functions
```javascript
function composeWithProgress(onProgress, ...fns) {
  // TODO: implement with progress
}
```

### Modify 41: Create recursive JSON patcher
**Description:** apply JSON Patch operations recursively
```javascript
function applyPatch(obj, patch) {
  // TODO: implement recursively
}
```

### Modify 42: Implement recursive schema validator
**Description:** validate data against nested schema
```javascript
function validateSchema(data, schema) {
  // TODO: implement recursively
}
```

### Modify 43: Create pipe with timeout for each step
**Description:** timeout each function in pipeline
```javascript
function pipeWithTimeout(timeouts, ...fns) {
  // TODO: implement with timeouts
}
```

### Modify 44: Implement recursive CSS selector parser
**Description:** parse nested CSS selectors
```javascript
function parseSelector(selector) {
  // TODO: implement recursively
}
```

### Modify 45: Create recursive dependency resolver
**Description:** resolve nested dependencies in order
```javascript
function resolveDependencies(tree) {
  // TODO: implement recursively
}
```

### Modify 46: Implement compose with memoized steps
**Description:** memoize intermediate results in compose
```javascript
function composeMemo(...fns) {
  // TODO: implement with memoization
}
```

### Modify 47: Create recursive trie builder
**Description:** build a trie from array of strings
```javascript
function buildTrie(words) {
  // TODO: implement recursively
}
```

### Modify 48: Implement recursive JSON schema generator
**Description:** generate JSON schema from sample data
```javascript
function generateSchema(data) {
  // TODO: implement recursively
}
```

### Modify 49: Create pipe with circuit breaker
**Description:** stop pipeline after N failures
```javascript
function pipeWithBreaker(maxFailures, ...fns) {
  // TODO: implement circuit breaker
}
```

### Modify 50: Implement recursive nested route handler
**Description:** match and handle nested URL routes
```javascript
function routeHandler(routes) {
  // TODO: implement recursively
}
```
