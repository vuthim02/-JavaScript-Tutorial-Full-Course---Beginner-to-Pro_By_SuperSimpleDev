# Level 51: Arrays Basics

## Challenges 1-70: Error Snippets

### Error 1: Array Index Out of Bounds
**Description:** Get the last element from an array
```javascript
const fruits = ['apple', 'banana', 'cherry'];
const last = fruits[fruits.length];
console.log(last);
```

### Error 2: Push Return Value
**Description:** Add an item to an array and store the new array
```javascript
const numbers = [1, 2, 3];
const result = numbers.push(4);
console.log(result);
```

### Error 3: Splice Arguments Wrong Order
**Description:** Remove 2 elements starting at index 1
```javascript
const items = ['a', 'b', 'c', 'd'];
items.splice(2, 1);
console.log(items);
```

### Error 4: Unshift Return Value
**Description:** Add items to the beginning and get new length
```javascript
const colors = ['red', 'blue'];
const len = colors.unshift();
console.log(len);
```

### Error 5: Pop on Empty Array
**Description:** Remove the last element safely
```javascript
const empty = [];
const last = empty.pop();
if (empty.pop() === undefined) {
  console.log('array was empty');
}
```

### Error 6: Shift Return Undefined
**Description:** Remove the first element multiple times
```javascript
const queue = ['first', 'second', 'third'];
const first = queue.shift();
const second = queue.shift();
const third = queue.shift();
const fourth = queue.shift();
console.log(fourth);
```

### Error 7: Concat Not Mutating
**Description:** Merge two arrays
```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
arr1.concat(arr2);
console.log(arr1);
```

### Error 8: IndexOf NaN
**Description:** Find NaN in an array
```javascript
const values = [1, 2, NaN, 4];
const index = values.indexOf(NaN);
console.log(index);
```

### Error 9: Includes vs indexOf
**Description:** Check if -0 exists in array
```javascript
const nums = [1, -0, 2];
const has = nums.indexOf(-0) !== -1;
console.log(has);
```

### Error 10: Slice End Index
**Description:** Get first three elements
```javascript
const data = [10, 20, 30, 40, 50];
const firstThree = data.slice(0, 3);
console.log(firstThree);
```

### Error 11: Splice Insert Syntax
**Description:** Insert 'x' at index 2 without removing anything
```javascript
const arr = ['a', 'b', 'c', 'd'];
arr.splice(2, 0, 'x');
console.log(arr);
```

### Error 12: Array Length Not Read-Only
**Description:** Clear an array by setting length to 0
```javascript
const items = [1, 2, 3, 4, 5];
items.length = 0;
console.log(items.length);
```

### Error 13: Using Length to Add
**Description:** Add element using length property
```javascript
const arr = ['a', 'b'];
arr[arr.length] = 'c';
console.log(arr);
```

### Error 14: Delete Leaves Holes
**Description:** Remove element at index 2 completely
```javascript
const arr = [1, 2, 3, 4];
delete arr[2];
console.log(arr.length);
```

### Error 15: Array Constructor with Single Number
**Description:** Create array with one element: 5
```javascript
const arr = new Array(5);
console.log(arr.length);
```

### Error 16: Join vs Split Confusion
**Description:** Convert array to comma-separated string
```javascript
const words = ['hello', 'world'];
const str = words.split(',');
console.log(str);
```

### Error 17: Reverse Mutates
**Description:** Reverse an array without mutating original
```javascript
const original = [1, 2, 3];
const reversed = original.reverse();
console.log(original);
```

### Error 18: Sort Without Compare
**Description:** Sort numbers ascending
```javascript
const numbers = [10, 5, 80, 2, 30];
numbers.sort();
console.log(numbers);
```

### Error 19: Fill with Object Reference
**Description:** Create array of 3 empty objects
```javascript
const arr = new Array(3).fill({});
arr[0].name = 'test';
console.log(arr[1].name);
```

### Error 20: Flat Depth
**Description:** Flatten nested array completely
```javascript
const nested = [1, [2, [3, [4]]]];
const flat = nested.flat();
console.log(flat);
```

### Error 21: From with Map
**Description:** Create array of squares from array-like
```javascript
const obj = { length: 3 };
const squares = Array.from(obj, x => x * x);
console.log(squares);
```

### Error 22: IsArray Check
**Description:** Check if value is an array
```javascript
const value = [1, 2, 3];
console.log(typeof value === 'array');
```

### Error 23: ForEach Break with Continue
**Description:** Log numbers but skip 3
```javascript
const nums = [1, 2, 3, 4, 5];
nums.forEach(n => {
  if (n === 3) continue;
  console.log(n);
});
```

### Error 24: ForEach Return
**Description:** Find first number > 2 in array
```javascript
const nums = [1, 2, 3, 4];
let found = null;
nums.forEach(n => {
  if (n > 2) {
    found = n;
    return n;
  }
});
console.log(found);
```

### Error 25: Map Without Return
**Description:** Double all numbers in array
```javascript
const nums = [1, 2, 3];
const doubled = nums.map(n => {
  n * 2;
});
console.log(doubled);
```

### Error 26: Filter Predicate Inverted
**Description:** Remove all values less than 0
```javascript
const nums = [-2, -1, 0, 1, 2];
const positive = nums.filter(n => n < 0);
console.log(positive);
```

### Error 27: Reduce Without Initial Value Empty
**Description:** Sum all numbers in array
```javascript
const nums = [];
const sum = nums.reduce((a, b) => a + b);
console.log(sum);
```

### Error 28: Reduce Return Wrong Type
**Description:** Count occurrences of each string
```javascript
const items = ['a', 'b', 'a', 'c', 'b', 'a'];
const counts = items.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
}, {});
console.log(counts);
```

### Error 29: Some vs Every
**Description:** Check if all numbers are positive
```javascript
const nums = [1, -2, 3, 4];
const allPositive = nums.some(n => n > 0);
console.log(allPositive);
```

### Error 30: Find vs Filter
**Description:** Get first even number
```javascript
const nums = [1, 3, 5, 6, 7];
const firstEven = nums.filter(n => n % 2 === 0);
console.log(firstEven);
```

### Error 31: Array of Arrays Reference
**Description:** Create a 3x3 grid filled with 0
```javascript
const grid = new Array(3).fill(new Array(3).fill(0));
grid[0][0] = 1;
console.log(grid[1][0]);
```

### Error 32: Spread in Wrong Place
**Description:** Combine two arrays into one
```javascript
const a = [1, 2];
const b = [3, 4];
const combined = a.push(...b);
console.log(combined);
```

### Error 33: Rest Parameter with Array
**Description:** Sum all arguments passed to function
```javascript
function sum(...args) {
  return args.reduce((a, b) => a + b);
}
console.log(sum(1, 2, 3));
```

### Error 34: Destructuring Null
**Description:** Destructure array from null value
```javascript
const data = null;
const [first, second] = data;
console.log(first);
```

### Error 35: Swap Variables Wrong
**Description:** Swap two variables using destructuring
```javascript
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b);
```

### Error 36: Nested Destructuring
**Description:** Get inner array value
```javascript
const matrix = [[1, 2], [3, 4]];
const [, [ , four]] = matrix;
console.log(four);
```

### Error 37: Array Equality
**Description:** Check if two arrays are equal
```javascript
const a = [1, 2, 3];
const b = [1, 2, 3];
console.log(a === b);
```

### Error 38: Slice vs Splice Confusion
**Description:** Extract elements from index 1 to 3
```javascript
const arr = [10, 20, 30, 40, 50];
const extracted = arr.splice(1, 3);
console.log(extracted);
```

### Error 39: String Split Return
**Description:** Split string by comma
```javascript
const str = 'a,b,c';
const arr = str.split(',');
console.log(arr);
```

### Error 40: Array toString
**Description:** Convert array to string without commas
```javascript
const arr = [1, 2, 3];
const str = arr.toString('');
console.log(str);
```

### Error 41: FlatMap Depth
**Description:** Map and flatten one level
```javascript
const arr = ['hello', 'world'];
const chars = arr.flatMap(w => w.split(''));
console.log(chars);
```

### Error 42: Keys vs Values
**Description:** Get all values from array
```javascript
const fruits = ['apple', 'banana'];
const values = fruits.keys();
console.log(values);
```

### Error 43: Entries Iteration
**Description:** Iterate over array entries
```javascript
const colors = ['red', 'green'];
for (const entry of colors.entries()) {
  console.log(entry);
}
```

### Error 44: CopyWithin Syntax
**Description:** Copy first two elements to end
```javascript
const arr = [1, 2, 3, 4, 5];
arr.copyWithin(3, 0, 2);
console.log(arr);
```

### Error 45: Array Of Method
**Description:** Create array from arguments
```javascript
const arr = Array.of(1, 2, 3);
console.log(arr.length);
```

### Error 46: Length with Negative Index
**Description:** Get second-to-last element
```javascript
const arr = [10, 20, 30, 40];
const val = arr[-2];
console.log(val);
```

### Error 47: Push Multiple Returns
**Description:** Push multiple items and log new length
```javascript
const arr = [1];
const len = arr.push(2, 3, 4);
console.log(len);
```

### Error 48: Unshift Multiple
**Description:** Add items to front
```javascript
const arr = [3, 4];
const len = arr.unshift();
console.log(len);
```

### Error 49: Splice Delete All
**Description:** Remove all elements from index 2
```javascript
const arr = [1, 2, 3, 4, 5];
const removed = arr.splice(2);
console.log(removed);
```

### Error 50: Splice Replace
**Description:** Replace element at index 1
```javascript
const arr = ['a', 'b', 'c'];
arr.splice(1, 'x');
console.log(arr);
```

### Error 51: Array Like Arguments
**Description:** Use arguments as array
```javascript
function logArgs() {
  arguments.forEach(a => console.log(a));
}
logArgs(1, 2, 3);
```

### Error 52: Sort Strings Number
**Description:** Sort array of number strings
```javascript
const nums = ['10', '2', '30', '1'];
nums.sort();
console.log(nums);
```

### Error 53: Reverse String
**Description:** Reverse a string using array methods
```javascript
const str = 'hello';
const reversed = str.split('').reverse.join('');
console.log(reversed);
```

### Error 54: Fill with Map
**Description:** Create array 0 to 4
```javascript
const arr = new Array(5).fill(0).map((_, i) => i);
console.log(arr);
```

### Error 55: IndexOf Object
**Description:** Find object in array
```javascript
const objs = [{id: 1}, {id: 2}];
const index = objs.indexOf({id: 1});
console.log(index);
```

### Error 56: Includes NaN
**Description:** Check array includes NaN
```javascript
const arr = [1, NaN, 3];
console.log(arr.indexOf(NaN) !== -1);
```

### Error 57: Reduce Right
**Description:** Flatten array right to left
```javascript
const arr = [[1], [2], [3]];
const flat = arr.reduceRight((a, b) => a.concat(b));
console.log(flat);
```

### Error 58: Filter Index
**Description:** Remove every second element
```javascript
const arr = ['a', 'b', 'c', 'd'];
const filtered = arr.filter((_, i) => i % 2 === 0);
console.log(filtered);
```

### Error 59: Map Index
**Description:** Create array of indices
```javascript
const arr = ['x', 'y', 'z'];
const indices = arr.map(i => i);
console.log(indices);
```

### Error 60: Every Early Exit
**Description:** Check all even numbers
```javascript
const nums = [2, 4, 6, 7, 8];
const allEven = nums.every(n => {
  console.log('checking', n);
  return n % 2 === 0;
});
console.log(allEven);
```

### Error 61: Some Short Circuit
**Description:** Find if any number > 10
```javascript
const nums = [1, 5, 3, 15, 2];
const found = nums.some(n => {
  console.log('testing', n);
  return n > 10;
});
console.log(found);
```

### Error 62: FindIndex Usage
**Description:** Find index of first even number
```javascript
const nums = [1, 3, 5, 6, 7];
const idx = nums.findIndex(n => n % 2 === 0);
console.log(idx);
```

### Error 63: Includes from Index
**Description:** Check if 2 appears after index 3
```javascript
const nums = [1, 2, 3, 2, 1];
const has = nums.includes(2, 3);
console.log(has);
```

### Error 64: LastIndexOf
**Description:** Find last occurrence of 'a'
```javascript
const arr = ['a', 'b', 'a', 'c'];
const idx = arr.indexOf('a');
console.log(idx);
```

### Error 65: FlatMap vs Map Flat
**Description:** Double then flatten
```javascript
const arr = [[1], [2], [3]];
const result = arr.flatMap(x => x * 2);
console.log(result);
```

### Error 66: Array Spread in Object
**Description:** Create object from array entries
```javascript
const entries = [['a', 1], ['b', 2]];
const obj = {...entries};
console.log(obj);
```

### Error 67: Array from Set
**Description:** Get unique values from array
```javascript
const nums = [1, 2, 2, 3, 1];
const unique = Array.from(new Set(nums));
console.log(unique);
```

### Error 68: Length Assign Truncate
**Description:** Truncate array to first 2 elements
```javascript
const arr = [1, 2, 3, 4, 5];
arr.length = 2;
console.log(arr);
```

### Error 69: Multidimensional Access
**Description:** Access element in 2D array
```javascript
const grid = [[1, 2], [3, 4], [5, 6]];
const val = grid[1][2];
console.log(val);
```

### Error 70: Array Hole Iteration
**Description:** Iterate array with empty slots
```javascript
const arr = [1, , 3];
arr.forEach(n => console.log(n));
```

## Challenges 71-100: Issue Snippets

### Issue 1: For Loop Instead of forEach
**Description:** Log each fruit in the array
```javascript
const fruits = ['apple', 'banana', 'cherry'];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

### Issue 2: Manual Index Tracking
**Description:** Find index of 'target' in array
```javascript
const items = ['a', 'b', 'target', 'c'];
let foundIndex = -1;
for (let i = 0; i < items.length; i++) {
  if (items[i] === 'target') {
    foundIndex = i;
    break;
  }
}
console.log(foundIndex);
```

### Issue 3: Using Delete on Array
**Description:** Remove element at index 2
```javascript
const arr = [1, 2, 3, 4, 5];
delete arr[2];
console.log(arr);
```

### Issue 4: Manual Array Copy Loop
**Description:** Copy one array to another
```javascript
const source = [1, 2, 3];
const target = [];
for (let i = 0; i < source.length; i++) {
  target[i] = source[i];
}
console.log(target);
```

### Issue 5: Nested Loops for Pairing
**Description:** Find all pairs that sum to 10
```javascript
const nums = [1, 2, 3, 7, 8, 9];
for (let i = 0; i < nums.length; i++) {
  for (let j = 0; j < nums.length; j++) {
    if (nums[i] + nums[j] === 10) {
      console.log(nums[i], nums[j]);
    }
  }
}
```

### Issue 6: Length Caching Not Needed
**Description:** Double each number
```javascript
const nums = [1, 2, 3, 4, 5];
const len = nums.length;
const result = new Array(len);
for (let i = 0; i < len; i++) {
  result[i] = nums[i] * 2;
}
console.log(result);
```

### Issue 7: Manual Sum Loop
**Description:** Sum all numbers in array
```javascript
const prices = [10, 20, 30];
let total = 0;
for (let i = 0; i < prices.length; i++) {
  total += prices[i];
}
console.log(total);
```

### Issue 8: Manual Filter Loop
**Description:** Get only even numbers
```javascript
const nums = [1, 2, 3, 4, 5, 6];
const evens = [];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 === 0) {
    evens.push(nums[i]);
  }
}
console.log(evens);
```

### Issue 9: Manual Map Loop
**Description:** Convert strings to uppercase
```javascript
const words = ['hello', 'world'];
const upper = [];
for (let i = 0; i < words.length; i++) {
  upper.push(words[i].toUpperCase());
}
console.log(upper);
```

### Issue 10: Variable Reassignment Pattern
**Description:** Find maximum value
```javascript
const nums = [3, 7, 2, 9, 5];
let max = nums[0];
for (let i = 1; i < nums.length; i++) {
  if (nums[i] > max) {
    max = nums[i];
  }
}
console.log(max);
```

### Issue 11: Inefficient Includes in Loop
**Description:** Find duplicates in array
```javascript
const arr = [1, 2, 3, 2, 4, 1];
const dups = [];
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] === arr[j] && !dups.includes(arr[i])) {
      dups.push(arr[i]);
    }
  }
}
console.log(dups);
```

### Issue 12: Flat Array Building
**Description:** Flatten nested arrays manually
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

### Issue 13: Array Mutation in Loop
**Description:** Remove all odd numbers
```javascript
const nums = [1, 2, 3, 4, 5, 6];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 !== 0) {
    nums.splice(i, 1);
  }
}
console.log(nums);
```

### Issue 14: Push in For Loop
**Description:** Build array of squares
```javascript
const squares = [];
for (let i = 1; i <= 5; i++) {
  squares.push(i * i);
}
console.log(squares);
```

### Issue 15: Split Join Inefficiency
**Description:** Replace commas with spaces
```javascript
const str = 'a,b,c';
const result = str.split(',').join(' ');
console.log(result);
```

### Issue 16: Nested Ternary in Map
**Description:** Categorize numbers as small/medium/large
```javascript
const nums = [1, 5, 10, 15, 20];
const categories = nums.map(n => {
  if (n < 5) return 'small';
  else if (n < 15) return 'medium';
  else return 'large';
});
console.log(categories);
```

### Issue 17: Multiple Passes
**Description:** Filter then transform array
```javascript
const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.filter(n => n % 2 === 0);
const doubled = evens.map(n => n * 2);
console.log(doubled);
```

### Issue 18: for...in on Array
**Description:** Iterate over array elements
```javascript
const arr = ['a', 'b', 'c'];
for (const key in arr) {
  console.log(arr[key]);
}
```

### Issue 19: Type Check in Loop
**Description:** Get only string elements from mixed array
```javascript
const mixed = [1, 'hello', true, 'world', 42];
const strings = [];
for (let i = 0; i < mixed.length; i++) {
  if (typeof mixed[i] === 'string') {
    strings.push(mixed[i]);
  }
}
console.log(strings);
```

### Issue 20: Reverse Loop
**Description:** Reverse array elements
```javascript
const arr = [1, 2, 3, 4, 5];
const reversed = [];
for (let i = arr.length - 1; i >= 0; i--) {
  reversed.push(arr[i]);
}
console.log(reversed);
```

### Issue 21: Chunking with Loop
**Description:** Split array into chunks of 2
```javascript
const arr = [1, 2, 3, 4, 5, 6];
const chunks = [];
for (let i = 0; i < arr.length; i += 2) {
  chunks.push([arr[i], arr[i + 1]]);
}
console.log(chunks);
```

### Issue 22: Array to Object Manual
**Description:** Convert array to object with indices
```javascript
const colors = ['red', 'green', 'blue'];
const obj = {};
for (let i = 0; i < colors.length; i++) {
  obj[i] = colors[i];
}
console.log(obj);
```

### Issue 23: FizzBuzz with Loop
**Description:** FizzBuzz for array of numbers
```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = [];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 3 === 0 && nums[i] % 5 === 0) {
    result.push('FizzBuzz');
  } else if (nums[i] % 3 === 0) {
    result.push('Fizz');
  } else if (nums[i] % 5 === 0) {
    result.push('Buzz');
  } else {
    result.push(nums[i]);
  }
}
console.log(result);
```

### Issue 24: Manual Unique Filter
**Description:** Get unique values from array
```javascript
const nums = [1, 2, 2, 3, 4, 4, 5];
const unique = [];
for (let i = 0; i < nums.length; i++) {
  if (unique.indexOf(nums[i]) === -1) {
    unique.push(nums[i]);
  }
}
console.log(unique);
```

### Issue 25: For Loop with Break
**Description:** Find first element > 10
```javascript
const nums = [3, 7, 12, 5, 9];
let found = null;
for (let i = 0; i < nums.length; i++) {
  if (nums[i] > 10) {
    found = nums[i];
    break;
  }
}
console.log(found);
```

### Issue 26: Concatenating Arrays in Loop
**Description:** Merge multiple arrays into one
```javascript
const arrays = [[1, 2], [3, 4], [5, 6]];
let result = [];
for (let i = 0; i < arrays.length; i++) {
  result = result.concat(arrays[i]);
}
console.log(result);
```

### Issue 27: Index Check in Loop
**Description:** Log element and its index
```javascript
const fruits = ['apple', 'banana', 'cherry'];
for (let i = 0; i < fruits.length; i++) {
  console.log(i + ': ' + fruits[i]);
}
```

### Issue 28: Array Sharing Reference
**Description:** Create independent copies in loop
```javascript
const base = [1, 2, 3];
const copies = [];
for (let i = 0; i < 3; i++) {
  copies.push(base);
}
copies[0][0] = 99;
console.log(copies[1][0]);
```

### Issue 29: Nested Loop Matrix
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

### Issue 30: Word Counting with Loop
**Description:** Count word frequency in array
```javascript
const words = ['a', 'b', 'a', 'c', 'b', 'a'];
const counts = {};
for (let i = 0; i < words.length; i++) {
  counts[words[i]] = (counts[words[i]] || 0) + 1;
}
console.log(counts);
```

## Challenges 101-150: Modification Snippets

### Modify 1: Convert For Loop to forEach
**Description:** Log each color to console
```javascript
const colors = ['red', 'green', 'blue'];
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}
```

### Modify 2: Convert forEach to Map
**Description:** Double each number in the array
```javascript
const nums = [1, 2, 3, 4, 5];
const doubled = [];
nums.forEach(n => {
  doubled.push(n * 2);
});
console.log(doubled);
```

### Modify 3: Add Accumulator Pattern
**Description:** Calculate total price from cart items
```javascript
const cart = [{price: 10}, {price: 20}, {price: 30}];
let total = 0;
for (let i = 0; i < cart.length; i++) {
  total += cart[i].price;
}
console.log(total);
```

### Modify 4: Implement Array Chunking
**Description:** Split array into chunks of size 3
```javascript
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// TODO: Split into [[1,2,3],[4,5,6],[7,8,9]]
```

### Modify 5: Convert to Method Chaining
**Description:** Get even numbers, double them, sum them
```javascript
const nums = [1, 2, 3, 4, 5, 6];
let evens = [];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 === 0) {
    evens.push(nums[i]);
  }
}
let doubled = [];
for (let i = 0; i < evens.length; i++) {
  doubled.push(evens[i] * 2);
}
let sum = 0;
for (let i = 0; i < doubled.length; i++) {
  sum += doubled[i];
}
console.log(sum);
```

### Modify 6: Convert for Loop to forEach
**Description:** Add '!' to each string in array
```javascript
const words = ['hello', 'world'];
const excited = [];
for (let i = 0; i < words.length; i++) {
  excited.push(words[i] + '!');
}
console.log(excited);
```

### Modify 7: Add Accumulator Pattern
**Description:** Find the longest word in array
```javascript
const words = ['short', 'medium', 'longest'];
let longest = '';
for (let i = 0; i < words.length; i++) {
  if (words[i].length > longest.length) {
    longest = words[i];
  }
}
console.log(longest);
```

### Modify 8: Convert forEach to Filter
**Description:** Get only strings longer than 3 characters
```javascript
const words = ['hi', 'hello', 'hey', 'greetings'];
const long = [];
words.forEach(w => {
  if (w.length > 3) long.push(w);
});
console.log(long);
```

### Modify 9: Convert to Method Chaining
**Description:** Filter active users and get their names
```javascript
const users = [
  {name: 'Alice', active: true},
  {name: 'Bob', active: false},
  {name: 'Charlie', active: true}
];
const activeNames = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].active) {
    activeNames.push(users[i].name);
  }
}
console.log(activeNames);
```

### Modify 10: Implement Array Chunking
**Description:** Group students into pairs
```javascript
const students = ['A', 'B', 'C', 'D', 'E', 'F'];
// TODO: Group into [['A','B'],['C','D'],['E','F']]
```

### Modify 11: Convert for Loop to forEach
**Description:** Log each product name and price
```javascript
const products = [
  {name: 'Shirt', price: 20},
  {name: 'Pants', price: 40}
];
for (let i = 0; i < products.length; i++) {
  console.log(products[i].name + ': $' + products[i].price);
}
```

### Modify 12: Add Accumulator Pattern
**Description:** Calculate average of numbers
```javascript
const scores = [85, 92, 78, 95, 88];
// TODO: Calculate average score
```

### Modify 13: Convert forEach to Map
**Description:** Create full name from first and last
```javascript
const people = [
  {first: 'John', last: 'Doe'},
  {first: 'Jane', last: 'Smith'}
];
const fullNames = [];
people.forEach(p => {
  fullNames.push(p.first + ' ' + p.last);
});
console.log(fullNames);
```

### Modify 14: Convert to Method Chaining
**Description:** Get unique even numbers sorted descending
```javascript
const nums = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
// TODO: Chain filter, sort, and unique operations
```

### Modify 15: Implement Array Chunking
**Description:** Split array into pages of 5 items
```javascript
const items = [1,2,3,4,5,6,7,8,9,10,11,12];
// TODO: Create pages of 5 items each
```

### Modify 16: Convert for Loop to forEach
**Description:** Calculate total characters in all words
```javascript
const words = ['hello', 'world', 'javascript'];
let total = 0;
for (let i = 0; i < words.length; i++) {
  total += words[i].length;
}
console.log(total);
```

### Modify 17: Add Accumulator Pattern
**Description:** Build a sentence from array of words
```javascript
const words = ['JavaScript', 'is', 'fun'];
// TODO: Build sentence with spaces
```

### Modify 18: Convert forEach to Filter
**Description:** Get all numbers greater than 10
```javascript
const nums = [5, 12, 8, 15, 3, 20];
const big = [];
nums.forEach(n => {
  if (n > 10) big.push(n);
});
console.log(big);
```

### Modify 19: Convert to Method Chaining
**Description:** Get top 3 highest scores
```javascript
const scores = [45, 78, 92, 34, 88, 76, 95];
// TODO: Sort descending and take top 3
```

### Modify 20: Implement Array Chunking
**ClassName:** Split daily tasks into weeks of 7
```javascript
const tasks = Array.from({length: 30}, (_, i) => 'Task ' + (i + 1));
// TODO: Group into weeks of 7
```

### Modify 21: Convert for Loop to forEach
**Description:** Create list of file extensions
```javascript
const files = ['photo.jpg', 'doc.pdf', 'song.mp3'];
const extensions = [];
for (let i = 0; i < files.length; i++) {
  extensions.push(files[i].split('.').pop());
}
console.log(extensions);
```

### Modify 22: Add Accumulator Pattern
**Description:** Count how many numbers are positive
```javascript
const nums = [-2, 5, -1, 8, 0, 3];
// TODO: Count positive numbers
```

### Modify 23: Convert forEach to Map
**Description:** Format prices with currency symbol
```javascript
const prices = [10, 25, 50];
const formatted = [];
prices.forEach(p => {
  formatted.push('$' + p.toFixed(2));
});
console.log(formatted);
```

### Modify 24: Convert to Method Chaining
**Description:** Flatten, filter, and unique
```javascript
const arrays = [[1,2,3], [2,3,4], [3,4,5]];
// TODO: Flatten, get unique, sort
```

### Modify 25: Implement Array Chunking
**Description:** Split data into batches for API calls
```javascript
const data = Array.from({length: 25}, (_, i) => 'item' + (i + 1));
// TODO: Split into batches of 10
```

### Modify 26: Convert for Loop to forEach
**Description:** Calculate total price with tax
```javascript
const items = [{price: 10, tax: 1}, {price: 20, tax: 2}];
let total = 0;
for (let i = 0; i < items.length; i++) {
  total += items[i].price + items[i].tax;
}
console.log(total);
```

### Modify 27: Add Accumulator Pattern
**Description:** Build HTML list items from array
```javascript
const fruits = ['Apple', 'Banana', 'Cherry'];
// TODO: Generate <li> elements
```

### Modify 28: Convert forEach to Filter
**Description:** Get all products in stock
```javascript
const products = [
  {name: 'A', stock: 5},
  {name: 'B', stock: 0},
  {name: 'C', stock: 2}
];
const available = [];
products.forEach(p => {
  if (p.stock > 0) available.push(p);
});
console.log(available);
```

### Modify 29: Convert to Method Chaining
**Description:** Normalize, filter, and average
```javascript
const data = [10, 20, 30, 40, 50];
// TODO: Remove outliers (>2 std dev), calculate average
```

### Modify 30: Implement Array Chunking
**Description:** Split array into overlapping windows of 3
```javascript
const arr = [1, 2, 3, 4, 5];
// TODO: Create [[1,2,3],[2,3,4],[3,4,5]]
```

### Modify 31: Convert for Loop to forEach
**Description:** Count occurrences of each letter
```javascript
const letters = ['a', 'b', 'a', 'c', 'b'];
const counts = {};
for (let i = 0; i < letters.length; i++) {
  counts[letters[i]] = (counts[letters[i]] || 0) + 1;
}
console.log(counts);
```

### Modify 32: Add Accumulator Pattern
**Description:** Find product of all numbers
```javascript
const nums = [2, 3, 4];
// TODO: Calculate product (2 * 3 * 4 = 24)
```

### Modify 33: Convert forEach to Map
**Description:** Create array of lengths
```javascript
const words = ['cat', 'elephant', 'dog'];
const lengths = [];
words.forEach(w => {
  lengths.push(w.length);
});
console.log(lengths);
```

### Modify 34: Convert to Method Chaining
**Description:** Get names of users over 18 sorted
```javascript
const users = [
  {name: 'A', age: 20}, {name: 'B', age: 15}, {name: 'C', age: 25}
];
// TODO: Filter, map, sort in one chain
```

### Modify 35: Implement Array Chunking
**Description:** Split chess board into rows of 8
```javascript
const squares = Array.from({length: 64}, (_, i) => 'sq' + i);
// TODO: Group into 8 rows of 8
```

### Modify 36: Convert for Loop to forEach
**Description:** Find all indices of target value
```javascript
const arr = [1, 2, 3, 2, 4, 2];
const target = 2;
const indices = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) indices.push(i);
}
console.log(indices);
```

### Modify 37: Add Accumulator Pattern
**Description:** Concatenate all strings in array
```javascript
const parts = ['Hello', ' ', 'World', '!'];
// TODO: Concatenate into single string
```

### Modify 38: Convert forEach to Filter
**Description:** Get completed todos
```javascript
const todos = [
  {task: 'A', done: true},
  {task: 'B', done: false},
  {task: 'C', done: true}
];
const done = [];
todos.forEach(t => {
  if (t.done) done.push(t);
});
console.log(done);
```

### Modify 39: Convert to Method Chaining
**Description:** Calculate total order value
```javascript
const order = [
  {item: 'A', qty: 2, price: 10},
  {item: 'B', qty: 1, price: 20}
];
// TODO: Chain map and reduce
```

### Modify 40: Implement Array Chunking
**Description:** Split array with offset stride
```javascript
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// TODO: Chunk with stride pattern
```

### Modify 41: Convert for Loop to forEach
**Description:** Add indices to array elements
```javascript
const fruits = ['apple', 'banana', 'cherry'];
const indexed = [];
for (let i = 0; i < fruits.length; i++) {
  indexed.push({index: i, fruit: fruits[i]});
}
console.log(indexed);
```

### Modify 42: Add Accumulator Pattern
**Description:** Calculate total minutes from hours array
```javascript
const hours = [1.5, 2, 0.5, 3];
// TODO: Convert to total minutes
```

### Modify 43: Convert forEach to Map
**Description:** Create boolean array for even check
```javascript
const nums = [1, 2, 3, 4, 5];
const isEven = [];
nums.forEach(n => {
  isEven.push(n % 2 === 0);
});
console.log(isEven);
```

### Modify 44: Convert to Method Chaining
**Description:** Process grades - drop lowest, average rest
```javascript
const grades = [85, 92, 78, 95, 88];
// TODO: Drop lowest, calculate average of rest
```

### Modify 45: Implement Array Chunking
**Description:** Split array with remainder handling
```javascript
const arr = [1, 2, 3, 4, 5, 6, 7];
// TODO: Chunk into 3, handle last incomplete chunk
```

### Modify 46: Convert for Loop to forEach
**Description:** Create a frequency map from array
```javascript
const items = ['pen', 'book', 'pen', 'ruler', 'book', 'pen'];
const freq = {};
for (let i = 0; i < items.length; i++) {
  freq[items[i]] = (freq[items[i]] || 0) + 1;
}
console.log(freq);
```

### Modify 47: Add Accumulator Pattern
**Description:** Find difference between max and min
```javascript
const temps = [72, 85, 68, 90, 75];
// TODO: Calculate temperature range
```

### Modify 48: Convert forEach to Map
**Description:** Extract domain from email addresses
```javascript
const emails = ['a@test.com', 'b@example.org'];
const domains = [];
emails.forEach(e => {
  domains.push(e.split('@')[1]);
});
console.log(domains);
```

### Modify 49: Convert to Method Chaining
**Description:** Find most common word in array
```javascript
const words = ['a', 'b', 'a', 'c', 'b', 'a'];
// TODO: Chain reduce to find most frequent
```

### Modify 50: Implement Array Chunking
**Description:** Split array for pagination
```javascript
const items = Array.from({length: 12}, (_, i) => 'Item ' + (i + 1));
// TODO: Create paginate function returning page of 4
```
