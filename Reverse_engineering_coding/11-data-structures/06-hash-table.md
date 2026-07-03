# Hash Table

## How Hash Tables Work

```
Key → Hash Function → Hash → Index → Bucket → Value
"name" → hash("name") → 137 → 137 % 16 = 9 → bucket[9] → "John"
```

## JavaScript Objects and Maps

```javascript
const obj = {};
obj["name"] = "John";  // Hash of "name" determines storage location
obj["age"] = 30;

const map = new Map();
map.set("name", "John");
map.set(obj, "metadata"); // Object keys also hashed
```

## Hash Collisions

When two keys produce the same hash index:

```
"name" → hash → index 9 → bucket[9] → "John"
"mane" → hash → index 9 → bucket[9] → "lion" ???
```

**Solution: Chaining** — each bucket stores a linked list of entries.

```
bucket[9] → ["name", "John"] → ["mane", "lion"]
```

## Simple Hash Function (Educational)

```javascript
function simpleHash(key, tableSize) {
    let hash = 0;
    const str = String(key);
    for (let i = 0; i < str.length; i++) {
        hash = (hash + str.charCodeAt(i) * (i + 1)) % tableSize;
    }
    return hash;
}
```

## Hash Table Implementation

```javascript
class HashTable {
    constructor(size = 53) { this.keyMap = new Array(size); }

    _hash(key) {
        let total = 0;
        const PRIME = 31;
        const str = String(key);
        for (let i = 0; i < Math.min(str.length, 100); i++) {
            total = (total * PRIME + str.charCodeAt(i) - 96) % this.keyMap.length;
        }
        return total;
    }

    set(key, value) {
        const index = this._hash(key);
        if (!this.keyMap[index]) this.keyMap[index] = [];
        for (let pair of this.keyMap[index]) {
            if (pair[0] === key) { pair[1] = value; return; }
        }
        this.keyMap[index].push([key, value]);
    }

    get(key) {
        const index = this._hash(key);
        if (this.keyMap[index]) {
            for (let pair of this.keyMap[index]) {
                if (pair[0] === key) return pair[1];
            }
        }
        return undefined;
    }

    keys() {
        const keys = [];
        for (let bucket of this.keyMap) {
            if (bucket) for (let [key] of bucket) keys.push(key);
        }
        return keys;
    }

    values() {
        const values = [];
        for (let bucket of this.keyMap) {
            if (bucket) for (let [, value] of bucket) values.push(value);
        }
        return values;
    }
}
```

## Complexity

| Operation | Average | Worst |
|---|---|---|
| Insert | O(1) | O(n) — many collisions |
| Lookup | O(1) | O(n) — all keys in same bucket |
| Delete | O(1) | O(n) |
| Resize | O(n) | O(n) |

## Applications

### Caching / Memoization
```javascript
const memo = new Map();
function expensiveComputation(n) {
    if (memo.has(n)) return memo.get(n);
    const result = n * 1000;
    memo.set(n, result);
    return result;
}
```

### Counting Frequencies
```javascript
function countFrequencies(arr) {
    const freq = {};
    for (const item of arr) freq[item] = (freq[item] || 0) + 1;
    return freq;
}
console.log(countFrequencies([1, 2, 2, 3, 1, 2])); // { 1: 2, 2: 3, 3: 1 }
```

### Detecting Duplicates
```javascript
function hasDuplicates(arr) {
    const seen = new Set();
    for (const item of arr) { if (seen.has(item)) return true; seen.add(item); }
    return false;
}
```

### Two Sum (Classic Problem)
```javascript
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) return [map.get(complement), i];
        map.set(nums[i], i);
    }
    return [];
}
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
// O(n) time, O(n) space
```

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Need fast lookup? | Hash table — O(1) average lookup. |
| Avoid nested loops? | Yes. Hash map can often reduce O(n²) to O(n). |
| Hash table used for caching? | Check for `Map`, `Set`, `WeakMap`, or `{}` to store computed results. |
| Hash collisions? | Good hash + load factor makes them rare. Worst: many keys in one bucket. |
## Next Steps

[Back to Chapter 5](05-queue.md): Queue
[Proceed to Chapter 7](07-bst.md): Binary Search Tree to learn about binary search tree.
