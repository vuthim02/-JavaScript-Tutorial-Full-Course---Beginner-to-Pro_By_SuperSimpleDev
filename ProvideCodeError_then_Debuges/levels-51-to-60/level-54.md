# Level 54: Advanced Array Patterns

## Challenges 1-70: Error Snippets

### Error 1: Reference vs Value
**Description:** Copy array and modify copy without affecting original
```javascript
const original = [1, 2, 3];
const copy = original;
copy.push(4);
console.log(original);
```

### Error 2: Spread Shallow Copy
**Description:** Deep clone nested array
```javascript
const nested = [[1, 2], [3, 4]];
const copy = [...nested];
copy[0][0] = 99;
console.log(nested[0][0]);
```

### Error 3: Destructuring Undefined
**Description:** Destructure array that may be undefined
```javascript
function getFirst(arr) {
  const [first] = arr;
  return first;
}
console.log(getFirst(undefined));
```

### Error 4: Swap Without Temp
**Description:** Swap two elements in array
```javascript
const arr = [1, 2, 3, 4];
[arr[1], arr[2]] = [arr[2], arr[1]];
console.log(arr);
```

### Error 5: Rest Parameter Position
**Description:** Get first and rest of array
```javascript
const arr = [1, 2, 3, 4, 5];
const [first, ...rest, last] = arr;
console.log(first, rest, last);
```

### Error 6: Array.from with Length
**Description:** Create array of numbers 0 to 4
```javascript
const arr = Array.from({length: 5}, (_, i) => i);
console.log(arr);
```

### Error 7: Spread vs Concat
**Description:** Merge arrays with spread
```javascript
const a = [1, 2];
const b = [3, 4];
const c = [...a, ...b];
console.log(c);
```

### Error 8: Destructuring with Default
**Description:** Destructure with fallback for missing
```javascript
const arr = [1];
const [a, b = 2] = arr;
console.log(a, b);
```

### Error 9: Nested Destructuring
**Description:** Get value from nested arrays
```javascript
const data = [[1, 2], [3, 4]];
const [[a], [b]] = data;
console.log(a, b);
```

### Error 10: Array.from vs Array.of
**Description:** Create array from arguments
```javascript
const arr = Array.from(1, 2, 3);
console.log(arr);
```

### Error 11: Spread in Function Args
**Description:** Pass array elements as arguments
```javascript
const nums = [1, 2, 3];
const max = Math.max(nums);
console.log(max);
```

### Error 12: Rest vs Spread Confusion
**Description:** Collect remaining arguments
```javascript
function sum(a, b, ...rest) {
  return a + b + rest.reduce((s, n) => s + n, 0);
}
console.log(sum(1, 2, 3, 4, 5));
```

### Error 13: Destructuring Return Value
**Description:** Get multiple values from function
```javascript
function getCoords() {
  return [10, 20];
}
const {x, y} = getCoords();
console.log(x, y);
```

### Error 14: Array.from with Single Arg
**Description:** Convert array-like to array
```javascript
const divs = document.querySelectorAll('div');
const arr = Array.from(divs);
console.log(arr);
```

### Error 15: Spread with Strings
**Description:** Convert string to array of characters
```javascript
const str = 'hello';
const chars = {...str};
console.log(chars);
```

### Error 16: Destructuring with Rest
**Description:** Skip first two elements
```javascript
const colors = ['red', 'green', 'blue', 'yellow'];
const [, , ...rest] = colors;
console.log(rest);
```

### Error 17: Spread in Object Destructuring
**Description:** Extract array and rest
```javascript
const data = {items: [1, 2, 3], extra: 'test'};
const {items: [first, ...rest]} = data;
console.log(first, rest);
```

### Error 18: Array.of with Single Number
**Description:** Create array with one number
```javascript
const arr = Array.of(5);
console.log(arr.length);
```

### Error 19: CopyWithin Negative
**Description:** Copy elements using negative indices
```javascript
const arr = [1, 2, 3, 4, 5];
arr.copyWithin(-2, 0, 2);
console.log(arr);
```

### Error 20: Fill with Function
**Description:** Fill array with unique objects
```javascript
const arr = new Array(3).fill(() => ({}));
console.log(arr[0] === arr[1]);
```

### Error 21: Destructuring Dynamic Key
**Description:** Destructure computed property
```javascript
const arr = [1, 2, 3];
const key = 1;
const {[key]: value} = arr;
console.log(value);
```

### Error 22: Spread with Null
**Description:** Spread null into array
```javascript
const arr = [...null];
console.log(arr);
```

### Error 23: Array.from with Map Function
**Description:** Create squared numbers
```javascript
const squares = Array.from([1, 2, 3], x => x * x);
console.log(squares);
```

### Error 24: Destructuring with Computed
**Description:** Use computed index in destructuring
```javascript
const arr = [10, 20, 30];
const i = 2;
const {[i]: val} = arr;
console.log(val);
```

### Error 25: Spread vs Rest in Function
**Description:** Use spread to call function
```javascript
function logThree(a, b, c) {
  console.log(a, b, c);
}
const args = [1, 2, 3];
logThree(...args);
```

### Error 26: Array.from Length Zero
**Description:** Create empty array from length
```javascript
const arr = Array.from({length: 0});
console.log(arr.length);
```

### Error 27: Destructuring with Boolean
**Description:** Destructure array from boolean
```javascript
const flag = true;
const [val] = flag;
console.log(val);
```

### Error 28: CopyWithin Past Bounds
**Description:** Copy beyond array length
```javascript
const arr = [1, 2, 3];
arr.copyWithin(5, 0, 2);
console.log(arr);
```

### Error 29: Spread in Array Push
**Description:** Use push with spread
```javascript
const arr = [1, 2];
const other = [3, 4];
arr.push(...other);
console.log(arr);
```

### Error 30: Destructuring and Mutation
**Description:** Swap variables without destructuring
```javascript
let a = 1, b = 2;
let temp = a;
a = b;
b = temp;
console.log(a, b);
```

### Error 31: Array.from with Iterator
**Description:** Create array from Set
```javascript
const set = new Set([1, 2, 3]);
const arr = Array.from(set);
console.log(arr);
```

### Error 32: Nested Rest
**Description:** Get first, second, rest
```javascript
const nums = [1, 2, 3, 4, 5];
const [a, ...[b, ...rest]] = nums;
console.log(a, b, rest);
```

### Error 33: Fill with Mutable
**Description:** Fill with empty arrays
```javascript
const arr = new Array(3);
arr.fill([]);
arr[0].push(1);
console.log(arr[1]);
```

### Error 34: Spread with Array-like
**Description:** Spread array-like object
```javascript
const arrLike = {0: 'a', 1: 'b', length: 2};
const arr = [...arrLike];
console.log(arr);
```

### Error 35: Destructuring Return of Push
**Description:** Get new length from push
```javascript
const arr = [1, 2, 3];
const [newLen] = arr.push(4);
console.log(newLen);
```

### Error 36: Rest in Array Pattern
**Description:** Destructure with rest in middle
```javascript
const arr = [1, 2, 3, 4, 5];
const [a, ...rest, b] = arr;
console.log(a, b, rest);
```

### Error 37: Array.of vs Array
**Description:** Create array with single element
```javascript
const arr = Array(3);
const brr = Array.of(3);
console.log(arr.length, brr.length);
```

### Error 38: Spread with Undefined
**Description:** Spread undefined into array
```javascript
const arr = [1, ...undefined, 2];
console.log(arr);
```

### Error 39: Destructuring Iterator
**Description:** Destructure map iterator
```javascript
const map = new Map([['a', 1], ['b', 2]]);
const [[k1, v1], [k2, v2]] = map;
console.log(k1, v1);
```

### Error 40: Reference in Reduce
**Description:** Accumulator reference issue
```javascript
const items = [{v: 1}, {v: 2}];
const result = items.reduce((acc, item) => {
  acc.push(item);
  return acc;
}, []);
console.log(result);
```

### Error 41: Destructuring with Getter
**Description:** Destructure from getter array
```javascript
const obj = {
  get items() {
    return [1, 2, 3];
  }
};
const [a, , c] = obj.items();
console.log(a, c);
```

### Error 42: Array.from with Null Map
**Description:** Create array with null map function
```javascript
const arr = Array.from({length: 3}, null);
console.log(arr);
```

### Error 43: Spread Shallow Concern
**Description:** Clone array of primitives
```javascript
const nums = [1, 2, 3];
const clone = [...nums];
console.log(clone);
```

### Error 44: Destructuring with Math
**Description:** Get min and max from array
```javascript
const nums = [3, 7, 2, 9, 5];
const [min, max] = [Math.min(nums), Math.max(nums)];
console.log(min, max);
```

### Error 45: Rest in forEach
**Description:** Use rest in forEach callback
```javascript
const arr = [[1, 2], [3, 4], [5, 6]];
arr.forEach(([a, b]) => console.log(a + b));
```

### Error 46: Fill then Map
**Description:** Create ranged array
```javascript
const arr = new Array(5).fill(0).map((_, i) => i);
console.log(arr);
```

### Error 47: Destructuring Null Guard
**Description:** Safely destructure possibly null array
```javascript
const data = null;
const [first = 0] = data || [];
console.log(first);
```

### Error 48: Spread for Max
**Description:** Find max with spread
```javascript
const nums = [1, 2, 3];
const max = Math.max(...nums);
console.log(max);
```

### Error 49: Array.from with This
**Description:** Use this in Array.from map
```javascript
const obj = {mult: 2};
const nums = Array.from([1, 2, 3], function(n) {
  return n * this.mult;
}, obj);
console.log(nums);
```

### Error 50: Destructuring and Default
**Description:** Destructure with defaults for nested
```javascript
const data = [[1]];
const [[a, b = 2]] = data;
console.log(a, b);
```

### Error 51: Spread in New Array
**Description:** Create array with spread in constructor
```javascript
const arr = new Array(...[1, 2, 3]);
console.log(arr);
```

### Error 52: Destructuring String
**Description:** Destructure characters from string
```javascript
const [first, second] = 'hello';
console.log(first, second);
```

### Error 53: Array.from Length NaN
**Description:** Create array with NaN length
```javascript
const arr = Array.from({length: NaN});
console.log(arr.length);
```

### Error 54: Rest in Arrow
**Description:** Rest parameters in arrow function
```javascript
const sum = (...args) => args.reduce((a, b) => a + b, 0);
console.log(sum(1, 2, 3));
```

### Error 55: Spread with Set
**Description:** Convert Set to array with spread
```javascript
const set = new Set([1, 2, 3]);
const arr = [...set];
console.log(arr);
```

### Error 56: Destructuring with Slice
**Description:** Get first and last elements
```javascript
const arr = [1, 2, 3, 4, 5];
const [first, ...middle, last] = arr;
console.log(first, last);
```

### Error 57: Array.from with String
**Description:** Create array from characters
```javascript
const arr = Array.from('hello');
console.log(arr);
```

### Error 58: Spread Arguments Object
**Description:** Spread arguments into array
```javascript
function logArgs() {
  console.log(...arguments);
}
logArgs(1, 2, 3);
```

### Error 59: Destructuring with Variable Swap
**Description:** Swap array elements at positions
```javascript
const arr = [1, 2, 3, 4];
[arr[1], arr[3]] = [arr[3], arr[1]];
console.log(arr);
```

### Error 60: Array.of vs Spread
**Description:** Create array from iterable
```javascript
const set = new Set([1, 2, 3]);
const arr = Array.of(...set);
console.log(arr);
```

### Error 61: Destructuring Array of Objects
**Description:** Extract property from nested destructuring
```javascript
const users = [{name: 'Alice'}, {name: 'Bob'}];
const [{name: firstName}, {name: secondName}] = users;
console.log(firstName, secondName);
```

### Error 62: Spread with Sparse
**Description:** Spread sparse array
```javascript
const sparse = [1, , 3];
const dense = [...sparse];
console.log(dense.length);
```

### Error 63: Array.from with Index
**Description:** Create array of index pairs
```javascript
const arr = Array.from({length: 3}, (_, i) => [i, i * 2]);
console.log(arr);
```

### Error 64: Destructuring Computed Property
**Description:** Use expression as destructuring source
```javascript
const arr = [1, 2, 3];
const [a, b] = arr.length > 2 ? arr : [0, 0];
console.log(a, b);
```

### Error 65: Spread with Generator
**Description:** Spread generator into array
```javascript
function* gen() {
  yield 1; yield 2; yield 3;
}
const arr = [...gen()];
console.log(arr);
```

### Error 66: Fill with Same Reference
**Description:** Create array of unique objects
```javascript
const arr = new Array(3).fill({count: 0});
arr[0].count++;
console.log(arr[1].count);
```

### Error 67: Destructuring with Conditional
**Description:** Destructure with fallback for empty
```javascript
const arr = [];
const [a = 1, b = 2] = arr;
console.log(a, b);
```

### Error 68: Array.from with Undefined Length
**Description:** Handle undefined length gracefully
```javascript
function create(len) {
  return Array.from({length: len}, (_, i) => i);
}
console.log(create(undefined));
```

### Error 69: Rest in Array Destructuring
**Description:** Collect remaining into array
```javascript
const [x, y, ...others] = [1, 2, 3, 4, 5];
console.log(others);
```

### Error 70: Spread with Arguments
**Description:** Convert arguments to array with spread
```javascript
function toArray() {
  return [...arguments];
}
console.log(toArray(1, 2, 3));
```

## Challenges 71-100: Issue Snippets

### Issue 1: Manual Array Copy
**Description:** Clone an array
```javascript
const source = [1, 2, 3];
const target = [];
for (let i = 0; i < source.length; i++) {
  target[i] = source[i];
}
console.log(target);
```

### Issue 2: Nested Manual Copy
**Description:** Deep clone 2D array
```javascript
const matrix = [[1, 2], [3, 4]];
const clone = [];
for (let i = 0; i < matrix.length; i++) {
  clone[i] = [];
  for (let j = 0; j < matrix[i].length; j++) {
    clone[i][j] = matrix[i][j];
  }
}
console.log(clone);
```

### Issue 3: Index Assignment in Loop
**Description:** Create array of squared numbers
```javascript
const squares = [];
for (let i = 0; i < 5; i++) {
  squares[i] = i * i;
}
console.log(squares);
```

### Issue 4: Manual Concat
**Description:** Merge two arrays
```javascript
const a = [1, 2, 3];
const b = [4, 5, 6];
const c = [];
for (let i = 0; i < a.length; i++) c.push(a[i]);
for (let i = 0; i < b.length; i++) c.push(b[i]);
console.log(c);
```

### Issue 5: Extract with Loop
**Description:** Get first 3 elements
```javascript
const arr = [1, 2, 3, 4, 5];
const first3 = [];
for (let i = 0; i < 3; i++) {
  first3.push(arr[i]);
}
console.log(first3);
```

### Issue 6: Manual Array Fill
**Description:** Create array filled with zeros
```javascript
const arr = [];
for (let i = 0; i < 10; i++) {
  arr[i] = 0;
}
console.log(arr);
```

### Issue 7: Loop for Object from Array
**Description:** Convert array to object
```javascript
const arr = ['a', 'b', 'c'];
const obj = {};
for (let i = 0; i < arr.length; i++) {
  obj[i] = arr[i];
}
console.log(obj);
```

### Issue 8: Manual Splice Insert
**Description:** Insert element at index 2
```javascript
const arr = [1, 2, 4, 5];
const newArr = [];
const insert = 3;
for (let i = 0; i < arr.length; i++) {
  if (i === 2) newArr.push(insert);
  newArr.push(arr[i]);
}
console.log(newArr);
```

### Issue 9: Loop for Reverse
**Description:** Reverse array manually
```javascript
const arr = [1, 2, 3, 4, 5];
const reversed = [];
for (let i = arr.length - 1; i >= 0; i--) {
  reversed.push(arr[i]);
}
console.log(reversed);
```

### Issue 10: Manual Flat
**Description:** Flatten nested array manually
```javascript
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = [];
for (let i = 0; i < nested.length; i++) {
  for (let j = 0; j < nested[i].length; j++) {
    flat.push(nested[i][j]);
  }
}
console.log(flat);
```

### Issue 11: Temp Variable Swap
**Description:** Swap two elements
```javascript
const arr = [1, 2, 3, 4];
const temp = arr[1];
arr[1] = arr[2];
arr[2] = temp;
console.log(arr);
```

### Issue 12: Manual Unique with Loop
**Description:** Get unique values
```javascript
const nums = [1, 2, 2, 3, 4, 4, 5];
const unique = [];
for (let i = 0; i < nums.length; i++) {
  let found = false;
  for (let j = 0; j < unique.length; j++) {
    if (nums[i] === unique[j]) found = true;
  }
  if (!found) unique.push(nums[i]);
}
console.log(unique);
```

### Issue 13: Loop for First/Last
**Description:** Get first and last element
```javascript
const arr = [10, 20, 30, 40, 50];
const first = arr[0];
const last = arr[arr.length - 1];
console.log(first, last);
```

### Issue 14: Manual Chunk Using Loop
**Description:** Split array into chunks
```javascript
const arr = [1, 2, 3, 4, 5, 6];
const chunks = [];
for (let i = 0; i < arr.length; i += 2) {
  chunks.push([arr[i], arr[i + 1]]);
}
console.log(chunks);
```

### Issue 15: Type Coercion Loop
**Description:** Filter by type
```javascript
const mixed = [1, 'a', 2, 'b', true, 3];
const numbers = [];
for (let i = 0; i < mixed.length; i++) {
  if (typeof mixed[i] === 'number') numbers.push(mixed[i]);
}
console.log(numbers);
```

### Issue 16: Manual Zip
**Description:** Zip two arrays
```javascript
const names = ['Alice', 'Bob', 'Charlie'];
const ages = [25, 30, 35];
const zipped = [];
for (let i = 0; i < names.length; i++) {
  zipped.push([names[i], ages[i]]);
}
console.log(zipped);
```

### Issue 17: Loop for Intersection
**Description:** Find common elements
```javascript
const a = [1, 2, 3, 4, 5];
const b = [3, 4, 5, 6, 7];
const intersection = [];
for (let i = 0; i < a.length; i++) {
  for (let j = 0; j < b.length; j++) {
    if (a[i] === b[j]) {
      intersection.push(a[i]);
      break;
    }
  }
}
console.log(intersection);
```

### Issue 18: Manual Sort with Indices
**Description:** Sort and keep original indices
```javascript
const arr = [3, 1, 4, 1, 5];
const indexed = arr.map((v, i) => ({v, i}));
indexed.sort((a, b) => a.v - b.v);
console.log(indexed);
```

### Issue 19: Loop for Flatten Deep
**Description:** Flatten deeply nested array
```javascript
function flatten(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      const sub = flatten(arr[i]);
      for (let j = 0; j < sub.length; j++) {
        result.push(sub[j]);
      }
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
console.log(flatten([1, [2, [3, [4]]]]));
```

### Issue 20: Manual Frequency with Array
**Description:** Count frequencies with array
```javascript
const items = ['a', 'b', 'a', 'c', 'b'];
const freq = [];
for (let i = 0; i < items.length; i++) {
  const idx = freq.findIndex(f => f.key === items[i]);
  if (idx >= 0) freq[idx].count++;
  else freq.push({key: items[i], count: 1});
}
console.log(freq);
```

### Issue 21: Loop for Pagination
**Description:** Get paginated slice
```javascript
const data = Array.from({length: 20}, (_, i) => i + 1);
const page = 1;
const perPage = 5;
const result = data.slice(page * perPage, (page + 1) * perPage);
console.log(result);
```

### Issue 22: Copy with Push Loop
**Description:** Copy array using push
```javascript
const original = [1, 2, 3];
const copy = [];
original.forEach(x => copy.push(x));
console.log(copy);
```

### Issue 23: Loop for Padding
**Description:** Pad array to certain length
```javascript
const arr = [1, 2, 3];
const targetLen = 5;
for (let i = arr.length; i < targetLen; i++) {
  arr.push(0);
}
console.log(arr);
```

### Issue 24: Manual Drop While
**Description:** Drop elements while condition holds
```javascript
const nums = [1, 2, 3, 4, 5, 6];
const result = [];
let dropping = true;
for (let i = 0; i < nums.length; i++) {
  if (nums[i] < 3 && dropping) continue;
  dropping = false;
  result.push(nums[i]);
}
console.log(result);
```

### Issue 25: Loop for Moving Window
**Description:** Create sliding windows
```javascript
const arr = [1, 2, 3, 4, 5];
const windows = [];
for (let i = 0; i < arr.length - 2; i++) {
  windows.push([arr[i], arr[i + 1], arr[i + 2]]);
}
console.log(windows);
```

### Issue 26: Reduce with Spread
**Description:** Build array with reduce spread pattern
```javascript
const nums = [1, 2, 3, 4, 5];
const result = nums.reduce((acc, n) => [...acc, n * 2], []);
console.log(result);
```

### Issue 27: Loop for Partition
**Description:** Partition array by condition
```javascript
const nums = [1, 2, 3, 4, 5, 6];
const evens = [];
const odds = [];
for (const n of nums) {
  if (n % 2 === 0) evens.push(n);
  else odds.push(n);
}
console.log({evens, odds});
```

### Issue 28: Multiple Spread Copies
**Description:** Create multiple copies with spread
```javascript
const base = [1, 2, 3];
const copies = Array.from({length: 3}, () => [...base]);
copies[0][0] = 99;
console.log(copies[1][0]);
```

### Issue 29: Loop for Difference
**Description:** Find elements in A not in B
```javascript
const a = [1, 2, 3, 4, 5];
const b = [3, 4, 6];
const diff = [];
for (const x of a) {
  if (!b.includes(x)) diff.push(x);
}
console.log(diff);
```

### Issue 30: Loop for Run-Length
**Description:** Encode run-length
```javascript
const arr = [1, 1, 1, 2, 2, 3, 3, 3, 3];
const encoded = [];
let count = 1;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === arr[i + 1]) {
    count++;
  } else {
    encoded.push([arr[i], count]);
    count = 1;
  }
}
console.log(encoded);
```

## Challenges 101-150: Modification Snippets

### Modify 1: Convert to Spread Copy
**Description:** Clone array using spread
```javascript
const original = [1, 2, 3, 4, 5];
const copy = [];
for (let i = 0; i < original.length; i++) {
  copy[i] = original[i];
}
console.log(copy);
```

### Modify 2: Add Destructuring for Swap
**Description:** Swap first and last elements
```javascript
const arr = [1, 2, 3, 4, 5];
const temp = arr[0];
arr[0] = arr[arr.length - 1];
arr[arr.length - 1] = temp;
console.log(arr);
```

### Modify 3: Convert to Destructuring
**Description:** Get first two elements
```javascript
const colors = ['red', 'green', 'blue', 'yellow'];
const first = colors[0];
const second = colors[1];
console.log(first, second);
```

### Modify 4: Add Rest for Remaining
**Description:** Extract first element, keep rest
```javascript
const scores = [95, 88, 76, 92, 84];
const first = scores[0];
const rest = scores.slice(1);
console.log(first, rest);
```

### Modify 5: Convert to Spread Merge
**Description:** Combine multiple arrays
```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const combined = arr1.concat(arr2).concat(arr3);
console.log(combined);
```

### Modify 6: Add Array.from
**Description:** Create array from range
```javascript
const start = 1;
const end = 5;
const result = [];
for (let i = start; i <= end; i++) {
  result.push(i);
}
console.log(result);
```

### Modify 7: Convert to Destructuring Defaults
**Description:** Get config values with defaults
```javascript
const config = [true, 100];
const debug = config[0] !== undefined ? config[0] : false;
const timeout = config[1] !== undefined ? config[1] : 5000;
console.log(debug, timeout);
```

### Modify 8: Add Nested Destructuring
**Description:** Extract values from nested arrays
```javascript
const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const a = matrix[1][0];
const b = matrix[1][1];
const c = matrix[1][2];
console.log(a, b, c);
```

### Modify 9: Convert to Spread in Function
**Description:** Find max value in array
```javascript
const nums = [3, 7, 2, 9, 5];
let max = nums[0];
for (let i = 1; i < nums.length; i++) {
  if (nums[i] > max) max = nums[i];
}
console.log(max);
```

### Modify 10: Add Destructuring for Return
**Description:** Return first and last from function
```javascript
function getEnds(arr) {
  return {first: arr[0], last: arr[arr.length - 1]};
}
const result = getEnds([10, 20, 30, 40]);
console.log(result.first, result.last);
```

### Modify 11: Convert to Spread Copy Nested
**Description:** Deep clone array of arrays
```javascript
const nested = [[1, 2], [3, 4], [5, 6]];
const clone = nested.map(arr => [...arr]);
console.log(clone);
```

### Modify 12: Add Rest in Function
**Description:** Accept variable arguments
```javascript
function sum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
console.log(sum(1, 2, 3, 4, 5));
```

### Modify 13: Convert to Array.from Map
**Description:** Create array of random numbers
```javascript
const count = 5;
const randoms = [];
for (let i = 0; i < count; i++) {
  randoms.push(Math.random());
}
console.log(randoms);
```

### Modify 14: Add Destructuring with Rename
**Description:** Destructure with variable renaming
```javascript
const point = [10, 20];
const x = point[0];
const y = point[1];
console.log(x, y);
```

### Modify 15: Convert to Spread for Insert
**Description:** Insert element at beginning
```javascript
const arr = [2, 3, 4];
const newArr = [1];
for (let i = 0; i < arr.length; i++) {
  newArr.push(arr[i]);
}
console.log(newArr);
```

### Modify 16: Add Array.of Usage
**Description:** Create array from arguments safely
```javascript
function createArray(a, b, c) {
  return [a, b, c];
}
console.log(createArray(1, 2, 3));
```

### Modify 17: Convert to Destructuring with Defaults
**Description:** Parse CSV row with defaults
```javascript
const row = 'Alice,25';
const parts = row.split(',');
const name = parts[0] || 'Unknown';
const age = parseInt(parts[1]) || 0;
console.log(name, age);
```

### Modify 18: Add Spread for Remove
**Description:** Remove element without mutation
```javascript
const arr = [1, 2, 3, 4, 5];
const index = 2;
const result = arr.slice(0, index).concat(arr.slice(index + 1));
console.log(result);
```

### Modify 19: Convert to Rest Params
**Description:** Collect all arguments after first
```javascript
function process(first) {
  const rest = Array.from(arguments).slice(1);
  console.log(first, rest);
}
process('header', 1, 2, 3);
```

### Modify 20: Add Array.from for NodeList
**Description:** Convert NodeList to array and map
```javascript
const divs = document.querySelectorAll('div');
const texts = [];
for (let i = 0; i < divs.length; i++) {
  texts.push(divs[i].textContent);
}
console.log(texts);
```

### Modify 21: Convert to Spread for Max
**Description:** Find min in array
```javascript
const temps = [72, 85, 68, 90, 75];
let min = Infinity;
for (const t of temps) {
  if (t < min) min = t;
}
console.log(min);
```

### Modify 22: Add Destructuring for Coordinates
**Description:** Parse coordinate string
```javascript
const coord = '10,20';
const parts = coord.split(',');
const lat = parseFloat(parts[0]);
const lng = parseFloat(parts[1]);
console.log(lat, lng);
```

### Modify 23: Convert to Array.from with Length
**Description:** Create sequence of squares
```javascript
const n = 5;
const squares = [];
for (let i = 1; i <= n; i++) {
  squares.push(i * i);
}
console.log(squares);
```

### Modify 24: Add Reference Copy Warning
**Description:** Create independent nested copy
```javascript
const original = [[1, 2], [3, 4]];
const shallowCopy = [...original];
shallowCopy[0].push(99);
console.log(original[0]);
```

### Modify 25: Convert to Spread in Object
**Description:** Convert array entries to object
```javascript
const entries = [['a', 1], ['b', 2], ['c', 3]];
const obj = {};
for (const [k, v] of entries) {
  obj[k] = v;
}
console.log(obj);
```

### Modify 26: Add Destructuring for API Response
**Description:** Parse array response from API
```javascript
const response = {data: [1, 2, 3, 4, 5], status: 200};
const data = response.data;
const firstItem = data[0];
console.log(firstItem);
```

### Modify 27: Convert to Spread for Append
**Description:** Append item immutably
```javascript
const arr = [1, 2, 3];
const newArr = arr.concat([4]);
console.log(newArr);
```

### Modify 28: Add Array.from for Unique
**Description:** Deduplicate using Set and Array.from
```javascript
const nums = [1, 2, 2, 3, 4, 4, 5];
const unique = [];
for (const n of nums) {
  if (!unique.includes(n)) unique.push(n);
}
console.log(unique);
```

### Modify 29: Convert to Rest for Tail
**Description:** Get all but first element
```javascript
const arr = ['a', 'b', 'c', 'd'];
const tail = arr.slice(1);
console.log(tail);
```

### Modify 30: Add Destructuring for Enum
**Description:** Destructure array as enum
```javascript
const statuses = ['pending', 'active', 'inactive'];
const pending = statuses[0];
const active = statuses[1];
const inactive = statuses[2];
console.log(pending, active, inactive);
```

### Modify 31: Convert to Spread with Slice
**Description:** Replace element at index
```javascript
const arr = [1, 2, 3, 4, 5];
const idx = 2;
const newVal = 99;
const result = [...arr.slice(0, idx), newVal, ...arr.slice(idx + 1)];
console.log(result);
```

### Modify 32: Add Array.from with Arrow
**Description:** Create lookup table from pairs
```javascript
const pairs = [['id', 1], ['name', 'Alice']];
const map = new Map(pairs);
console.log(map);
```

### Modify 33: Convert to Spread for Union
**Description:** Union of two arrays
```javascript
const a = [1, 2, 3];
const b = [2, 3, 4];
const union = a.concat(b.filter(x => !a.includes(x)));
console.log(union);
```

### Modify 34: Add Destructuring for Function Args
**Description:** Accept array as function args
```javascript
function drawPoint(x, y) {
  console.log(`Drawing at ${x}, ${y}`);
}
const point = [10, 20];
drawPoint(point[0], point[1]);
```

### Modify 35: Convert to Array.from for Range
**Description:** Generate range with step
```javascript
function range(start, end, step) {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}
console.log(range(0, 10, 2));
```

### Modify 36: Add Spread for Copy and Modify
**Description:** Add element immutably
```javascript
const todos = ['buy milk', 'pay bills'];
const newTodo = 'walk dog';
const updated = [...todos, newTodo];
console.log(updated);
```

### Modify 37: Convert to Destructuring for Config
**Description:** Extract config array into variables
```javascript
const appConfig = {settings: [true, 3000, 'light']};
const debug = appConfig.settings[0];
const timeout = appConfig.settings[1];
const theme = appConfig.settings[2];
console.log(debug, timeout, theme);
```

### Modify 38: Add Array.of for Variable Args
**Description:** Safely create array from arguments
```javascript
const items = Array.of('a', 'b', 'c');
console.log(items);
```

### Modify 39: Convert to Spread for Merge
**Description:** Merge with override
```javascript
const defaults = [false, 5000, 'dark'];
const overrides = [true, null, null];
const merged = defaults.map((d, i) => overrides[i] != null ? overrides[i] : d);
console.log(merged);
```

### Modify 40: Add Destructuring for CSV
**Description:** Parse CSV line
```javascript
const csv = 'John,Doe,30,Engineer';
const parts = csv.split(',');
const firstName = parts[0];
const lastName = parts[1];
const age = parseInt(parts[2]);
const title = parts[3];
console.log(firstName, lastName, age, title);
```

### Modify 41: Convert to Array.from Entries
**Description:** Create array from object values
```javascript
const obj = {a: 1, b: 2, c: 3};
const values = [];
for (const key in obj) {
  values.push(obj[key]);
}
console.log(values);
```

### Modify 42: Add Spread for Dedupe
**Description:** Combine and deduplicate
```javascript
const a = [1, 2, 3];
const b = [3, 4, 5];
const combined = [...new Set([...a, ...b])];
console.log(combined);
```

### Modify 43: Convert to Destructuring for Query
**Description:** Parse query string array
```javascript
const query = 'name=Alice&age=30';
const pairs = query.split('&').map(p => p.split('='));
const params = {};
for (const [k, v] of pairs) {
  params[k] = v;
}
console.log(params);
```

### Modify 44: Add Reference Independence
**Description:** Ensure independent array copies
```javascript
function createGrid(rows, cols) {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
}
console.log(createGrid(3, 3));
```

### Modify 45: Convert to Spread for Rotation
**Description:** Rotate array left by one
```javascript
const arr = [1, 2, 3, 4, 5];
const rotated = arr.slice(1).concat(arr[0]);
console.log(rotated);
```

### Modify 46: Add Destructuring for Tuple
**Description:** Return and destructure tuple
```javascript
function getMinMax(nums) {
  let min = Infinity, max = -Infinity;
  for (const n of nums) {
    if (n < min) min = n;
    if (n > max) max = n;
  }
  return [min, max];
}
const result = getMinMax([3, 7, 2, 9, 5]);
console.log(`Min: ${result[0]}, Max: ${result[1]}`);
```

### Modify 47: Convert to Array.from with Function
**Description:** Create identity matrix
```javascript
const size = 3;
const matrix = [];
for (let i = 0; i < size; i++) {
  matrix[i] = [];
  for (let j = 0; j < size; j++) {
    matrix[i][j] = i === j ? 1 : 0;
  }
}
console.log(matrix);
```

### Modify 48: Add Spread for Immutable Remove
**Description:** Remove element without mutation
```javascript
const items = ['a', 'b', 'c', 'd'];
const removeIdx = 2;
const newItems = items.filter((_, i) => i !== removeIdx);
console.log(newItems);
```

### Modify 49: Convert to Destructuring for Pair
**Description:** Handle coordinate pairs
```javascript
const lines = ['10,20', '30,40', '50,60'];
const points = lines.map(l => {
  const parts = l.split(',');
  return {x: parseInt(parts[0]), y: parseInt(parts[1])};
});
console.log(points);
```

### Modify 50: Add Array.from for Sequence
**Description:** Generate sequence with mapping
```javascript
const count = 5;
const seq = Array.from({length: count}, (_, i) => `Item ${i + 1}`);
console.log(seq);
```
