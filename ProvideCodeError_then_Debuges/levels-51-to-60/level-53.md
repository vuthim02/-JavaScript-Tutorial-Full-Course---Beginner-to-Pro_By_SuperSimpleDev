# Level 53: Array Methods

## Challenges 1-70: Error Snippets

### Error 1: ForEach Return Value
**Description:** Create new array with doubled values
```javascript
const nums = [1, 2, 3];
const doubled = nums.forEach(n => n * 2);
console.log(doubled);
```

### Error 2: Map Without Return
**Description:** Add exclamation to each word
```javascript
const words = ['hello', 'world'];
const excited = words.map(w => {
  w + '!';
});
console.log(excited);
```

### Error 3: Filter False Condition
**Description:** Get numbers greater than 5
```javascript
const nums = [3, 7, 2, 9, 1];
const filtered = nums.filter(n => n < 5);
console.log(filtered);
```

### Error 4: Reduce Without Initial Value
**Description:** Sum all numbers
```javascript
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((a, b) => a + b);
console.log(sum);
```

### Error 5: ForEach Break
**Description:** Stop iterating when 3 is found
```javascript
const nums = [1, 2, 3, 4, 5];
nums.forEach(n => {
  if (n === 3) break;
  console.log(n);
});
```

### Error 6: Filter Modifying Array
**Description:** Remove all odd numbers from original
```javascript
const nums = [1, 2, 3, 4, 5, 6];
nums.filter(n => n % 2 === 0);
console.log(nums);
```

### Error 7: Map with Index Confusion
**Description:** Create array of indices
```javascript
const arr = ['a', 'b', 'c'];
const indices = arr.map((item, index) => index);
console.log(indices);
```

### Error 8: Reduce Wrong Accumulator
**Description:** Flatten array of arrays
```javascript
const arr = [[1, 2], [3, 4], [5, 6]];
const flat = arr.reduce((a, b) => {
  return a.push(b);
}, []);
console.log(flat);
```

### Error 9: Sort Without Compare
**Description:** Sort numbers descending
```javascript
const nums = [1, 10, 2, 20, 3];
nums.sort((a, b) => a - b);
console.log(nums);
```

### Error 10: Reverse Mutating Original
**Description:** Create reversed copy
```javascript
const original = [1, 2, 3];
const reversed = original.reverse();
console.log(original);
```

### Error 11: Every Short Circuit
**Description:** Check all positive numbers
```javascript
const nums = [1, 2, -3, 4, 5];
const result = nums.every(n => {
  console.log('checking', n);
  return n > 0;
});
console.log(result);
```

### Error 12: Some vs Includes
**Description:** Check if array contains NaN
```javascript
const arr = [1, 2, NaN, 4];
const has = arr.some(n => n === NaN);
console.log(has);
```

### Error 13: Find vs Filter
**Description:** Get all even numbers
```javascript
const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.find(n => n % 2 === 0);
console.log(evens);
```

### Error 14: FlatMap vs Map
**Description:** Double and flatten
```javascript
const nums = [1, 2, 3];
const result = nums.flatMap(n => n * 2);
console.log(result);
```

### Error 15: ForEach with Async
**Description:** Fetch data for each URL
```javascript
const urls = ['/a', '/b', '/c'];
urls.forEach(async url => {
  const data = await fetch(url);
  console.log(data);
});
console.log('done');
```

### Error 16: Reduce to Object
**Description:** Convert array to object
```javascript
const entries = [['a', 1], ['b', 2]];
const obj = entries.reduce((acc, [k, v]) => {
  acc[k] = v;
}, {});
console.log(obj);
```

### Error 17: Filter with Index
**Description:** Get elements at even indices
```javascript
const arr = [10, 20, 30, 40, 50];
const evens = arr.filter((val, i) => i % 2 === 0);
console.log(evens);
```

### Error 18: Map with ParseInt
**Description:** Convert strings to integers
```javascript
const strs = ['1', '2', '3'];
const nums = strs.map(parseInt);
console.log(nums);
```

### Error 19: Reduce for Grouping
**Description:** Group objects by property
```javascript
const items = [
  {type: 'fruit', name: 'apple'},
  {type: 'fruit', name: 'banana'},
  {type: 'veg', name: 'carrot'}
];
const grouped = items.reduce((acc, item) => {
  acc[item.type].push(item);
  return acc;
}, {});
console.log(grouped);
```

### Error 20: ForEach Index Argument
**Description:** Log elements with 1-based index
```javascript
const items = ['a', 'b', 'c'];
items.forEach((item, index) => {
  console.log(index + 1, item);
});
```

### Error 21: Splice in ForEach
**Description:** Remove inactive users
```javascript
const users = [
  {name: 'A', active: true},
  {name: 'B', active: false},
  {name: 'C', active: true}
];
users.forEach((user, i) => {
  if (!user.active) users.splice(i, 1);
});
console.log(users);
```

### Error 22: Map with Void Return
**Description:** Log each element with map
```javascript
const arr = [1, 2, 3];
arr.map(n => console.log(n));
```

### Error 23: Filter on Empty
**Description:** Filter null from array
```javascript
const arr = [1, null, 2, undefined, 3];
const clean = arr.filter(x => x != null);
console.log(clean);
```

### Error 24: Reduce String Concatenation
**Description:** Concatenate array of strings
```javascript
const words = ['Hello', ' ', 'World'];
const sentence = words.reduce((a, b) => a + b);
console.log(sentence);
```

### Error 25: Sort String Numbers
**Description:** Sort numeric strings
```javascript
const nums = ['10', '2', '1', '20'];
nums.sort((a, b) => a - b);
console.log(nums);
```

### Error 26: Flat with Wrong Depth
**Description:** Fully flatten nested array
```javascript
const arr = [1, [2, [3, [4]]]];
const flat = arr.flat(1);
console.log(flat);
```

### Error 27: Every on Empty Array
**Description:** Check empty array condition
```javascript
const arr = [];
const result = arr.every(n => n > 0);
console.log(result);
```

### Error 28: Reduce Initial Value Object
**Description:** Count occurrences with reduce
```javascript
const items = ['a', 'b', 'a', 'c'];
const counts = items.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
});
console.log(counts);
```

### Error 29: FindIndex NotFound
**Description:** Find index of missing element
```javascript
const arr = [1, 2, 3, 4, 5];
const idx = arr.findIndex(n => n === 99);
console.log(idx);
```

### Error 30: Some with Empty
**Description:** Check if any element matches
```javascript
const arr = [];
const result = arr.some(n => n > 0);
console.log(result);
```

### Error 31: Fill with Array
**Description:** Create 2D array filled with zeros
```javascript
const grid = new Array(3).fill(new Array(3).fill(0));
grid[0][0] = 1;
console.log(grid[1][0]);
```

### Error 32: Sort with Undefined
**Description:** Sort array with undefined values
```javascript
const arr = [3, undefined, 1, null, 2];
arr.sort((a, b) => a - b);
console.log(arr);
```

### Error 33: Map with Conditional
**Description:** Return 'even' or 'odd' for each number
```javascript
const nums = [1, 2, 3, 4];
const labels = nums.map(n => {
  if (n % 2 === 0) 'even';
  else 'odd';
});
console.log(labels);
```

### Error 34: Filter with Mutation
**Description:** Remove items that are too long
```javascript
const words = ['hi', 'hello', 'hey', 'greetings'];
words.filter(w => w.length <= 4);
console.log(words);
```

### Error 35: ReduceRight Usage
**Description:** Subtract numbers right to left
```javascript
const nums = [1, 2, 3, 4];
const result = nums.reduceRight((a, b) => a - b);
console.log(result);
```

### Error 36: ForEach with Return
**Description:** Early exit from forEach
```javascript
const nums = [1, 2, 3, 4, 5];
nums.forEach(n => {
  if (n > 3) return;
  console.log(n);
});
```

### Error 37: Map with Side Effects
**Description:** Toggle boolean values
```javascript
const flags = [true, false, true];
flags.map(f => !f);
console.log(flags);
```

### Error 38: Reduce Sum of Objects
**Description:** Sum price property of objects
```javascript
const items = [{price: 10}, {price: 20}, {price: 30}];
const total = items.reduce((sum, item) => sum + item.price, 0);
console.log(total);
```

### Error 39: Filter with Boolean
**Description:** Remove falsy values
```javascript
const arr = [0, 1, false, 2, '', 3];
const clean = arr.filter(Boolean);
console.log(clean);
```

### Error 40: IndexOf NaN
**Description:** Find index of NaN
```javascript
const arr = [1, NaN, 2, 3];
const idx = arr.indexOf(NaN);
console.log(idx);
```

### Error 41: Includes -0
**Description:** Check for -0 in array
```javascript
const arr = [1, -0, 2];
console.log(arr.includes(-0));
```

### Error 42: Sort Stable
**Description:** Sort by even/odd then by value
```javascript
const nums = [1, 2, 3, 4, 5, 6];
nums.sort((a, b) => {
  if (a % 2 !== b % 2) return a % 2 - b % 2;
  return a - b;
});
console.log(nums);
```

### Error 43: FlatMap vs Map Filter
**Description:** Filter and transform in one pass
```javascript
const nums = [1, 2, 3, 4, 5, 6];
const result = nums.flatMap(n => n % 2 === 0 ? n * 2 : []);
console.log(result);
```

### Error 44: Reduce Without Return
**Description:** Find longest word
```javascript
const words = ['short', 'medium', 'verylong'];
const longest = words.reduce((a, b) => {
  if (b.length > a.length) return b;
});
console.log(longest);
```

### Error 45: Map with Gaps
**Description:** Process sparse array
```javascript
const arr = [1, , 3, , 5];
const doubled = arr.map(n => n * 2);
console.log(doubled);
```

### Error 46: Filter Delete
**Description:** Remove element at specific index
```javascript
const arr = ['a', 'b', 'c', 'd'];
const filtered = arr.filter((_, i) => i !== 2);
console.log(filtered);
```

### Error 47: Reduce for Max
**Description:** Find maximum value
```javascript
const nums = [3, 7, 2, 9, 5];
const max = nums.reduce((a, b) => Math.max(a, b));
console.log(max);
```

### Error 48: Sort Copy
**Description:** Sort array without mutation
```javascript
const arr = [3, 1, 4, 1, 5];
const sorted = arr.sort();
console.log(arr);
```

### Error 49: Every vs Some
**Description:** Check if any number is negative
```javascript
const nums = [1, 2, -3, 4, 5];
const hasNeg = nums.every(n => n < 0);
console.log(hasNeg);
```

### Error 50: Find vs FindIndex
**Description:** Get index of even number
```javascript
const nums = [1, 3, 5, 6, 7];
const idx = nums.find(n => n % 2 === 0);
console.log(idx);
```

### Error 51: ForEach ThisArg
**Description:** Use this context in forEach
```javascript
const obj = {
  multiplier: 2,
  double: function(nums) {
    return nums.forEach(function(n) {
      console.log(n * this.multiplier);
    });
  }
};
obj.double([1, 2, 3]);
```

### Error 52: Map with Index Offset
**Description:** Create 1-indexed labels
```javascript
const items = ['a', 'b', 'c'];
const labels = items.map((item, i) => `Item ${i}: ${item}`);
console.log(labels);
```

### Error 53: Filter with This
**Description:** Filter using external threshold
```javascript
const threshold = 5;
const nums = [3, 7, 2, 8, 1];
const big = nums.filter(function(n) {
  return n > this;
}, threshold);
console.log(big);
```

### Error 54: Reduce for Average
**Description:** Calculate average of numbers
```javascript
const nums = [10, 20, 30, 40];
const avg = nums.reduce((a, b) => a + b) / nums.length;
console.log(avg);
```

### Error 55: FlatMap Strings
**Description:** Split words into characters
```javascript
const words = ['hi', 'bye'];
const chars = words.flatMap(w => w.split(''));
console.log(chars);
```

### Error 56: Some with Arrow
**Description:** Check if any object satisfies condition
```javascript
const items = [{v: 1}, {v: 2}, {v: 3}];
const has = items.some(item => item.v > 2);
console.log(has);
```

### Error 57: Find with Index
**Description:** Find element and its index
```javascript
const arr = [10, 20, 30, 40];
const found = arr.find((n, i) => {
  if (n === 30) return {value: n, index: i};
});
console.log(found);
```

### Error 58: ForEach Skip Undefined
**Description:** Process only defined elements
```javascript
const arr = [1, undefined, 3, null, 5];
arr.forEach(n => {
  if (n === undefined) return;
  console.log(n * 2);
});
```

### Error 59: Map with External Array
**Description:** Create pairs from two arrays
```javascript
const names = ['A', 'B', 'C'];
const ages = [25, 30, 35];
const people = names.map((name, i) => ({name, age: ages[i]}));
console.log(people);
```

### Error 60: Reduce Early Exit
**Description:** Stop reducing early
```javascript
const nums = [1, 2, 3, 4, 5];
const result = nums.reduce((acc, n) => {
  if (n > 3) return acc;
  return acc + n;
}, 0);
console.log(result);
```

### Error 61: Filter by Index Parity
**Description:** Remove elements at odd indices
```javascript
const arr = [1, 2, 3, 4, 5];
const evens = arr.filter((v, i) => i % 2 === 0);
console.log(evens);
```

### Error 62: Sort by Property
**Description:** Sort objects by name
```javascript
const users = [
  {name: 'Charlie'},
  {name: 'Alice'},
  {name: 'Bob'}
];
users.sort((a, b) => a.name - b.name);
console.log(users);
```

### Error 63: Includes vs Some
**Description:** Check if object exists in array
```javascript
const users = [{id: 1}, {id: 2}];
const has = users.includes({id: 1});
console.log(has);
```

### Error 64: FlatMap Depth Issue
**Description:** Flatten array of arrays of arrays
```javascript
const arr = [[[1]], [[2]], [[3]]];
const flat = arr.flatMap(x => x);
console.log(flat);
```

### Error 65: Reduce to Map
**Description:** Convert array to Map object
```javascript
const entries = [['a', 1], ['b', 2]];
const map = entries.reduce((m, [k, v]) => {
  m.set(k, v);
  return m;
}, new Map());
console.log(map);
```

### Error 66: ForEach with Delete
**Description:** Delete property from each object
```javascript
const users = [
  {name: 'A', temp: true},
  {name: 'B', temp: true}
];
users.forEach(u => delete u.temp);
console.log(users);
```

### Error 67: Map with Short Arrow
**Description:** Return object from arrow function
```javascript
const nums = [1, 2, 3];
const objs = nums.map(n => {val: n});
console.log(objs);
```

### Error 68: Filter on Sparse
**Description:** Remove empty slots from array
```javascript
const arr = [1, , 2, , 3];
const clean = arr.filter(() => true);
console.log(clean);
```

### Error 69: Reduce Concatenate Arrays
**Description:** Merge all arrays into one
```javascript
const arrays = [[1, 2], [3, 4], [5, 6]];
const merged = arrays.reduce((a, b) => a.concat(b));
console.log(merged);
```

### Error 70: Every Index
**Description:** Check if first element is largest
```javascript
const nums = [5, 4, 3, 2, 1];
const result = nums.every((n, i, arr) => n >= arr[i + 1]);
console.log(result);
```

## Challenges 71-100: Issue Snippets

### Issue 1: ForEach for Filtering
**Description:** Get active users
```javascript
const users = [
  {name: 'A', active: true},
  {name: 'B', active: false}
];
const active = [];
users.forEach(u => {
  if (u.active) active.push(u);
});
console.log(active);
```

### Issue 2: ForEach for Mapping
**Description:** Double all numbers
```javascript
const nums = [1, 2, 3, 4, 5];
const doubled = [];
nums.forEach(n => doubled.push(n * 2));
console.log(doubled);
```

### Issue 3: Manual Reduce with ForEach
**Description:** Sum all numbers
```javascript
const nums = [10, 20, 30];
let sum = 0;
nums.forEach(n => sum += n);
console.log(sum);
```

### Issue 4: Nested ForEach for Flat
**Description:** Flatten 2D array
```javascript
const matrix = [[1,2],[3,4],[5,6]];
const flat = [];
matrix.forEach(arr => arr.forEach(n => flat.push(n)));
console.log(flat);
```

### Issue 5: ForEach for Find
**Description:** Find first even number
```javascript
const nums = [1, 3, 5, 6, 7];
let found;
nums.forEach(n => {
  if (n % 2 === 0 && !found) found = n;
});
console.log(found);
```

### Issue 6: Map with Void Callback
**Description:** Trigger side effect for each element
```javascript
const ids = [1, 2, 3];
ids.map(id => console.log('processing', id));
```

### Issue 7: Filter then Map then Reduce
**Description:** Process chain with multiple passes
```javascript
const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.filter(n => n % 2 === 0);
const doubled = evens.map(n => n * 2);
const sum = doubled.reduce((a, b) => a + b, 0);
console.log(sum);
```

### Issue 8: Sort with Wrong Compare
**Description:** Sort numbers without proper compare
```javascript
const arr = [10, 5, 80, 2, 30];
arr.sort((a, b) => a > b ? 1 : -1);
console.log(arr);
```

### Issue 9: Reduce for String Building
**Description:** Build HTML list from array
```javascript
const items = ['A', 'B', 'C'];
const html = items.reduce((acc, item) => {
  return acc + '<li>' + item + '</li>';
}, '<ul>') + '</ul>';
console.log(html);
```

### Issue 10: ForEach for Object Group
**Description:** Group items by category
```javascript
const products = [
  {cat: 'food', name: 'apple'},
  {cat: 'drink', name: 'soda'},
  {cat: 'food', name: 'banana'}
];
const grouped = {};
products.forEach(p => {
  if (!grouped[p.cat]) grouped[p.cat] = [];
  grouped[p.cat].push(p);
});
console.log(grouped);
```

### Issue 11: Multiple Filter Calls
**Description:** Filter by multiple conditions
```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8];
const evens = nums.filter(n => n % 2 === 0);
const bigEvens = evens.filter(n => n > 4);
console.log(bigEvens);
```

### Issue 12: Map with Nested Loop
**Description:** Create multiplication pairs
```javascript
const nums = [1, 2, 3];
const pairs = nums.map(a => {
  const result = [];
  for (let b = 1; b <= 3; b++) {
    result.push(a * b);
  }
  return result;
});
console.log(pairs);
```

### Issue 13: ForEach Count Occurrences
**Description:** Count word frequency
```javascript
const words = ['a', 'b', 'a', 'c', 'b'];
const counts = {};
words.forEach(w => counts[w] = (counts[w] || 0) + 1);
console.log(counts);
```

### Issue 14: Filter with Complex Condition
**Description:** Get items matching multiple criteria
```javascript
const items = [
  {name: 'A', price: 10, inStock: true},
  {name: 'B', price: 5, inStock: false},
  {name: 'C', price: 20, inStock: true}
];
const filtered = items.filter(i => i.price > 5 && i.inStock);
console.log(filtered);
```

### Issue 15: Map then Filter
**Description:** Get lengths of short words
```javascript
const words = ['hi', 'hello', 'hey', 'greetings'];
const lengths = words.map(w => w.length).filter(l => l <= 5);
console.log(lengths);
```

### Issue 16: ForEach with Temporal Array
**Description:** Build array of squared evens
```javascript
const nums = [1, 2, 3, 4, 5];
const result = [];
nums.forEach(n => {
  if (n % 2 === 0) result.push(n * n);
});
console.log(result);
```

### Issue 17: Sort Without Copy
**Description:** Get sorted copy preserving original
```javascript
const original = [3, 1, 4, 1, 5];
const sorted = [...original].sort((a, b) => a - b);
console.log(sorted);
```

### Issue 18: Reduce with Array Spread
**Description:** Build array with reduce using spread
```javascript
const nums = [1, 2, 3, 4, 5];
const result = nums.reduce((acc, n) => [...acc, n * 2], []);
console.log(result);
```

### Issue 19: Filter then Find
**Description:** Get first expensive product
```javascript
const products = [
  {name: 'A', price: 5},
  {name: 'B', price: 15},
  {name: 'C', price: 25}
];
const expensive = products.filter(p => p.price > 10);
console.log(expensive[0]);
```

### Issue 20: ForEach for Validation
**Description:** Check all values are positive
```javascript
const nums = [1, 2, -3, 4, 5];
let allPositive = true;
nums.forEach(n => {
  if (n <= 0) allPositive = false;
});
console.log(allPositive);
```

### Issue 21: Map with Branching
**Description:** Categorize scores
```javascript
const scores = [45, 72, 88, 95, 60];
const grades = scores.map(s => {
  if (s >= 90) return 'A';
  if (s >= 80) return 'B';
  if (s >= 70) return 'C';
  if (s >= 60) return 'D';
  return 'F';
});
console.log(grades);
```

### Issue 22: Multiple Reducers
**Description:** Calculate sum and count
```javascript
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((a, b) => a + b, 0);
const count = nums.reduce((a) => a + 1, 0);
console.log(sum, count);
```

### Issue 23: Filter with Side Effect
**Description:** Filter and log each removal
```javascript
const nums = [1, 2, 3, 4, 5];
const filtered = nums.filter(n => {
  if (n < 3) return false;
  console.log('keeping', n);
  return true;
});
console.log(filtered);
```

### Issue 24: Map to Boolean
**Description:** Check if each number is even
```javascript
const nums = [1, 2, 3, 4, 5];
const booleans = nums.map(n => !!(n % 2));
console.log(booleans);
```

### Issue 25: ForEach with Index Arg
**Description:** Create index-label pairs
```javascript
const foods = ['pizza', 'pasta', 'salad'];
const labeled = [];
foods.forEach((f, i) => labeled.push(`${i + 1}. ${f}`));
console.log(labeled);
```

### Issue 26: Chain Ordering
**Description:** Sort numbers, filter, map
```javascript
const nums = [5, 3, 8, 1, 9, 2, 7];
nums.sort((a, b) => a - b);
const evens = nums.filter(n => n % 2 === 0);
const doubled = evens.map(n => n * 2);
console.log(doubled);
```

### Issue 27: Reduce to Two Results
**Description:** Find min and max simultaneously
```javascript
const nums = [3, 7, 2, 9, 5];
const result = nums.reduce((acc, n) => {
  return {
    min: Math.min(acc.min, n),
    max: Math.max(acc.max, n)
  };
}, {min: Infinity, max: -Infinity});
console.log(result);
```

### Issue 28: FlatMap with Undefined
**Description:** Filter undefined from flatMap
```javascript
const nums = [1, 2, 3, 4, 5];
const result = nums.flatMap(n => n % 2 === 0 ? n : undefined);
console.log(result);
```

### Issue 29: ForEach to Populate Object
**Description:** Create lookup table from array
```javascript
const users = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bob'}
];
const byId = {};
users.forEach(u => byId[u.id] = u);
console.log(byId);
```

### Issue 30: Sort Strings with Locale
**Description:** Sort words alphabetically
```javascript
const words = ['banana', 'Apple', 'cherry', 'apple'];
words.sort((a, b) => a.localeCompare(b));
console.log(words);
```

## Challenges 101-150: Modification Snippets

### Modify 1: Convert forEach to Map
**Description:** Get lengths of each word
```javascript
const words = ['hello', 'world', 'javascript'];
const lengths = [];
words.forEach(w => lengths.push(w.length));
console.log(lengths);
```

### Modify 2: Add Chaining
**Description:** Filter even, double, sum
```javascript
const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.filter(n => n % 2 === 0);
const doubled = evens.map(n => n * 2);
const sum = doubled.reduce((a, b) => a + b, 0);
console.log(sum);
```

### Modify 3: Convert forEach to Reduce
**Description:** Count occurrences of each word
```javascript
const words = ['a', 'b', 'a', 'c', 'b', 'a'];
const counts = {};
words.forEach(w => {
  counts[w] = (counts[w] || 0) + 1;
});
console.log(counts);
```

### Modify 4: Add Method Chain
**Description:** Get unique sorted active user names
```javascript
const users = [
  {name: 'Alice', active: true},
  {name: 'Bob', active: false},
  {name: 'Alice', active: true},
  {name: 'Charlie', active: true}
];
// TODO: Chain filter, map, unique, sort
```

### Modify 5: Convert forEach to Filter
**Description:** Get numbers greater than 10
```javascript
const nums = [5, 12, 8, 15, 3, 20];
const big = [];
nums.forEach(n => {
  if (n > 10) big.push(n);
});
console.log(big);
```

### Modify 6: Add Reduce for Total
**Description:** Calculate total price with tax
```javascript
const cart = [
  {price: 10, tax: 0.1},
  {price: 20, tax: 0.2},
  {price: 30, tax: 0.15}
];
let total = 0;
for (const item of cart) {
  total += item.price + item.price * item.tax;
}
console.log(total);
```

### Modify 7: Convert to FlatMap
**Description:** Split sentences into words
```javascript
const sentences = ['hello world', 'foo bar', 'baz qux'];
const words = [];
sentences.forEach(s => {
  s.split(' ').forEach(w => words.push(w));
});
console.log(words);
```

### Modify 8: Add Sort with Compare
**Description:** Sort products by price descending
```javascript
const products = [
  {name: 'A', price: 20},
  {name: 'B', price: 10},
  {name: 'C', price: 30}
];
products.sort();
console.log(products);
```

### Modify 9: Convert to Some
**Description:** Check if any score is passing
```javascript
const scores = [45, 62, 38, 71, 55];
let hasPassing = false;
for (const s of scores) {
  if (s >= 60) {
    hasPassing = true;
    break;
  }
}
console.log(hasPassing);
```

### Modify 10: Add Reduce for Aggregation
**Description:** Group transactions by type
```javascript
const transactions = [
  {type: 'credit', amount: 100},
  {type: 'debit', amount: 50},
  {type: 'credit', amount: 200}
];
const grouped = {};
transactions.forEach(t => {
  if (!grouped[t.type]) grouped[t.type] = [];
  grouped[t.type].push(t);
});
console.log(grouped);
```

### Modify 11: Convert to Every
**Description:** Check all numbers are positive
```javascript
const nums = [1, 2, 3, 4, 5];
let allPositive = true;
for (const n of nums) {
  if (n <= 0) {
    allPositive = false;
    break;
  }
}
console.log(allPositive);
```

### Modify 12: Add Method Chaining
**Description:** Get top 3 longest words
```javascript
const words = ['short', 'medium', 'longest', 'tiny', 'large'];
words.sort((a, b) => b.length - a.length);
const top3 = words.slice(0, 3);
console.log(top3);
```

### Modify 13: Convert to Find
**Description:** Find first out-of-stock product
```javascript
const products = [
  {name: 'A', inStock: true},
  {name: 'B', inStock: true},
  {name: 'C', inStock: false},
  {name: 'D', inStock: true}
];
let outOfStock = null;
for (const p of products) {
  if (!p.inStock) {
    outOfStock = p;
    break;
  }
}
console.log(outOfStock);
```

### Modify 14: Add FlatMap for Expansion
**Description:** Expand abbreviation pairs
```javascript
const pairs = [['JS', 'JavaScript'], ['TS', 'TypeScript']];
const expanded = [];
pairs.forEach(([abbr, full]) => {
  expanded.push(abbr);
  expanded.push(full);
});
console.log(expanded);
```

### Modify 15: Convert to Reduce for Histogram
**Description:** Create age histogram
```javascript
const ages = [22, 25, 22, 30, 25, 22, 35];
const hist = {};
ages.forEach(a => {
  hist[a] = (hist[a] || 0) + 1;
});
console.log(hist);
```

### Modify 16: Add Sort with Locale
**Description:** Sort names case-insensitive
```javascript
const names = ['alice', 'Bob', 'charlie', 'Alice'];
names.sort();
console.log(names);
```

### Modify 17: Convert to Filter Map Chain
**Description:** Get names of active users
```javascript
const users = [
  {name: 'Alice', active: true},
  {name: 'Bob', active: false},
  {name: 'Charlie', active: true}
];
const names = [];
for (const u of users) {
  if (u.active) names.push(u.name);
}
console.log(names);
```

### Modify 18: Add Flat for Nested
**Description:** Flatten one level of nesting
```javascript
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = [];
for (const arr of nested) {
  for (const n of arr) {
    flat.push(n);
  }
}
console.log(flat);
```

### Modify 19: Convert to Some with Condition
**Description:** Check if any word has 'x'
```javascript
const words = ['hello', 'world', 'xray', 'test'];
let hasX = false;
for (const w of words) {
  if (w.includes('x')) {
    hasX = true;
    break;
  }
}
console.log(hasX);
```

### Modify 20: Add Reduce for Nested Sum
**Description:** Sum nested array values
```javascript
const nested = [[1,2], [3,4], [5,6]];
let sum = 0;
for (const arr of nested) {
  for (const n of arr) {
    sum += n;
  }
}
console.log(sum);
```

### Modify 21: Convert to Map with Index
**Description:** Create formatted strings with index
```javascript
const items = ['pen', 'book', 'ruler'];
const formatted = [];
for (let i = 0; i < items.length; i++) {
  formatted.push(`${i + 1}. ${items[i]}`);
}
console.log(formatted);
```

### Modify 22: Add Filter Chain
**Description:** Filter products by price range
```javascript
const products = [
  {name: 'A', price: 5},
  {name: 'B', price: 15},
  {name: 'C', price: 25},
  {name: 'D', price: 8}
];
const filtered = [];
for (const p of products) {
  if (p.price >= 10 && p.price <= 20) {
    filtered.push(p);
  }
}
console.log(filtered);
```

### Modify 23: Convert to FindIndex
**Description:** Find index of first inactive user
```javascript
const users = [
  {name: 'A', active: true},
  {name: 'B', active: true},
  {name: 'C', active: false},
  {name: 'D', active: true}
];
let foundIdx = -1;
for (let i = 0; i < users.length; i++) {
  if (!users[i].active) {
    foundIdx = i;
    break;
  }
}
console.log(foundIdx);
```

### Modify 24: Add Reduce to Object
**Description:** Convert array of pairs to object
```javascript
const pairs = [['name', 'Alice'], ['age', 30], ['city', 'NYC']];
const obj = {};
for (const [k, v] of pairs) {
  obj[k] = v;
}
console.log(obj);
```

### Modify 25: Convert to Every with Predicate
**Description:** Verify all users have email
```javascript
const users = [
  {name: 'A', email: 'a@test.com'},
  {name: 'B', email: 'b@test.com'},
  {name: 'C', email: null}
];
let allHaveEmail = true;
for (const u of users) {
  if (!u.email) {
    allHaveEmail = false;
    break;
  }
}
console.log(allHaveEmail);
```

### Modify 26: Add Sort with Multiple Fields
**Description:** Sort users by age then name
```javascript
const users = [
  {name: 'Alice', age: 25},
  {name: 'Bob', age: 20},
  {name: 'Charlie', age: 25}
];
users.sort((a, b) => a.age - b.age);
console.log(users);
```

### Modify 27: Convert to Filter Map Chain
**Description:** Get squared values of even numbers
```javascript
const nums = [1, 2, 3, 4, 5, 6];
const result = [];
for (const n of nums) {
  if (n % 2 === 0) result.push(n * n);
}
console.log(result);
```

### Modify 28: Add Reduce for Pipe
**Description:** Chain multiple functions
```javascript
const nums = [1, 2, 3, 4, 5];
const result = nums
  .map(n => n * 2)
  .filter(n => n > 5)
  .reduce((a, b) => a + b, 0);
console.log(result);
```

### Modify 29: Convert to Includes
**Description:** Check if 'banana' is in the array
```javascript
const fruits = ['apple', 'orange', 'banana', 'grape'];
let hasBanana = false;
for (const f of fruits) {
  if (f === 'banana') {
    hasBanana = true;
    break;
  }
}
console.log(hasBanana);
```

### Modify 30: Add FlatMap for Multiple Values
**Description:** Generate range pairs
```javascript
const ranges = [[1, 3], [2, 4]];
const expanded = [];
ranges.forEach(([start, end]) => {
  for (let i = start; i <= end; i++) {
    expanded.push(i);
  }
});
console.log(expanded);
```

### Modify 31: Convert to Sort with Compare
**Description:** Sort dates chronologically
```javascript
const dates = ['2023-01-15', '2022-05-20', '2024-03-10'];
dates.sort();
console.log(dates);
```

### Modify 32: Add Reduce to Map/Filter
**Description:** Calculate product of all positive numbers
```javascript
const nums = [-2, 3, -1, 4, -5, 6];
let product = 1;
for (const n of nums) {
  if (n > 0) product *= n;
}
console.log(product);
```

### Modify 33: Convert to FlatMap with Condition
**Description:** Get words from tagged sentences
```javascript
const data = [
  {text: 'hello world', tag: 'greeting'},
  {text: 'goodbye world', tag: 'farewell'}
];
const words = [];
data.forEach(d => {
  d.text.split(' ').forEach(w => words.push(w));
});
console.log(words);
```

### Modify 34: Add Chain for Data Pipeline
**Description:** Process user data pipeline
```javascript
const rawUsers = [
  {name: ' Alice ', age: 25},
  {name: ' BOB ', age: 17},
  {name: 'Charlie', age: 30}
];
const processed = rawUsers
  .filter(u => u.age >= 18)
  .map(u => ({name: u.name.trim().toLowerCase(), age: u.age}));
console.log(processed);
```

### Modify 35: Convert to Some with Async
**Description:** Check if any URL responds successfully
```javascript
const urls = ['https://example.com', 'https://test.com'];
let anySuccess = false;
// TODO: Use Promise.any or some with fetch
```

### Modify 36: Add Reduce for Moving Average
**Description:** Calculate moving average
```javascript
const prices = [10, 12, 11, 13, 14, 12, 15];
// TODO: Calculate 3-day moving average
```

### Modify 37: Convert to Every Edge Case
**Description:** Check array is not empty and all positive
```javascript
const nums = [1, 2, 3];
let valid = nums.length > 0;
for (const n of nums) {
  if (n <= 0) valid = false;
}
console.log(valid);
```

### Modify 38: Add Filter with Boolean
**Description:** Remove falsy values
```javascript
const mixed = [0, 1, '', 'hello', null, undefined, false, true];
const truthy = [];
for (const v of mixed) {
  if (v) truthy.push(v);
}
console.log(truthy);
```

### Modify 39: Convert to Map with Fallback
**Description:** Parse numbers with default
```javascript
const inputs = ['10', 'abc', '20', 'xyz'];
const nums = [];
for (const s of inputs) {
  const n = parseInt(s);
  nums.push(isNaN(n) ? 0 : n);
}
console.log(nums);
```

### Modify 40: Add Reduce for Running Total
**Description:** Create running total array
```javascript
const nums = [1, 2, 3, 4, 5];
const running = [];
let sum = 0;
for (const n of nums) {
  sum += n;
  running.push(sum);
}
console.log(running);
```

### Modify 41: Convert to Filter with Index
**Description:** Keep elements at even indices only
```javascript
const arr = ['a', 'b', 'c', 'd', 'e'];
const result = [];
for (let i = 0; i < arr.length; i++) {
  if (i % 2 === 0) result.push(arr[i]);
}
console.log(result);
```

### Modify 42: Add Sort with Custom Compare
**Description:** Sort by string length then alphabetically
```javascript
const words = ['cat', 'banana', 'apple', 'dog', 'elephant'];
words.sort();
console.log(words);
```

### Modify 43: Convert to Reduce for Union
**Description:** Union of multiple arrays
```javascript
const arrays = [[1, 2], [2, 3], [3, 4]];
let union = [];
for (const arr of arrays) {
  for (const n of arr) {
    if (!union.includes(n)) union.push(n);
  }
}
console.log(union);
```

### Modify 44: Add FlatMap for Cartesian Product
**Description:** Create cartesian product of two arrays
```javascript
const colors = ['red', 'blue'];
const sizes = ['S', 'M', 'L'];
const product = [];
colors.forEach(c => {
  sizes.forEach(s => {
    product.push(`${c} ${s}`);
  });
});
console.log(product);
```

### Modify 45: Convert to Map with Object Spread
**Description:** Add discount property to products
```javascript
const products = [
  {name: 'A', price: 100},
  {name: 'B', price: 200}
];
const withDiscount = [];
for (const p of products) {
  withDiscount.push({...p, discount: p.price * 0.1});
}
console.log(withDiscount);
```

### Modify 46: Add Reduce for Nested Group
**Description:** Group by category then subcategory
```javascript
const items = [
  {cat: 'food', sub: 'fruit', name: 'apple'},
  {cat: 'food', sub: 'veg', name: 'carrot'},
  {cat: 'drink', sub: 'soda', name: 'cola'}
];
// TODO: Group by cat then sub
```

### Modify 47: Convert to Some Short Circuit
**Description:** Find if consecutive duplicate exists
```javascript
const arr = [1, 2, 2, 3, 4];
let hasConsecutive = false;
for (let i = 0; i < arr.length - 1; i++) {
  if (arr[i] === arr[i + 1]) {
    hasConsecutive = true;
    break;
  }
}
console.log(hasConsecutive);
```

### Modify 48: Add Filter with Unique
**Description:** Get unique values using filter
```javascript
const nums = [1, 2, 2, 3, 4, 4, 5];
const unique = [];
for (const n of nums) {
  if (!unique.includes(n)) unique.push(n);
}
console.log(unique);
```

### Modify 49: Convert to Reduce for Max/Min
**Description:** Find both min and max
```javascript
const temps = [72, 85, 68, 90, 75];
let min = temps[0];
let max = temps[0];
for (const t of temps) {
  if (t < min) min = t;
  if (t > max) max = t;
}
console.log({min, max});
```

### Modify 50: Add Chain with Spread
**Description:** Combine and deduplicate arrays
```javascript
const a = [1, 2, 3];
const b = [2, 3, 4];
const c = [3, 4, 5];
// TODO: Combine all, get unique, sort
```
