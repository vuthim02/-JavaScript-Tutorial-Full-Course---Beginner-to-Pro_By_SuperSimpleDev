# Two Pointers

## Efficient Pair Problems

Two pointers use left and right indices moving toward each other. This eliminates nested loops, reducing O(n²) to O(n).

## Two Sum in Sorted Array — O(n)

```javascript
function twoSumSorted(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        if (sum < target) left++;   // Need larger sum
        else right--;                // Need smaller sum
    }

    return [-1, -1];
}

console.log(twoSumSorted([1, 3, 5, 7, 9, 11], 10)); // [1, 3] (3 + 7)
// O(n) time, O(1) space — instead of O(n²) brute force
```

Key insight: With a sorted array, moving left increases the sum, moving right decreases it.

## Remove Duplicates In-Place

```javascript
function removeDuplicates(arr) {
    if (arr.length === 0) return 0;

    let left = 0;
    for (let right = 1; right < arr.length; right++) {
        if (arr[right] !== arr[left]) {
            left++;
            arr[left] = arr[right];
        }
    }

    return left + 1; // New length
}

const arr = [1, 1, 2, 2, 3, 4, 4, 5];
const len = removeDuplicates(arr);
console.log(arr.slice(0, len)); // [1, 2, 3, 4, 5]
// O(n) time, O(1) space
```

## Three Sum — O(n²)

```javascript
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// [[-1, -1, 2], [-1, 0, 1]]
// O(n²) — much better than O(n³) brute force
```

These problems all follow the same pattern: two indices moving toward each other (or one chasing the other), each making at most O(n) moves.

The key realization is that the brute-force O(n²) pair check can be replaced by two pointers moving in opposite directions, each making at most n moves total.

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Sorted array + pair search? | Two pointers can find the pair in O(n). |
| Can two pointers replace nested loops? | Yes, when the inner loop can be collapsed by moving pointers independently. |
| Is the array sorted? | Two pointers often require sorted input (except for in-place removal patterns). |
## Next Steps

[Back to Chapter 17](17-sliding-window.md): Sliding Window
[Proceed to Chapter 19](19-prefix-sum.md): Prefix Sum to learn about prefix sum.
