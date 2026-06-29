# Bit Manipulation

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Bitwise Operators

Bitwise operators work on the binary representation of numbers. In JavaScript, numbers are 32-bit signed integers for bitwise operations.

```javascript
const and  = 5 & 3;    // 0101 & 0011 = 0001 → 1
const or   = 5 | 3;    // 0101 | 0011 = 0111 → 7
const xor  = 5 ^ 3;    // 0101 ^ 0011 = 0110 → 6
const not  = ~5;       // ~0101 = 1010 → -6 (two's complement)
const left = 5 << 1;   // 0101 << 1 = 1010 → 10 (multiply by 2)
const right = 5 >> 1;  // 0101 >> 1 = 0010 → 2 (divide by 2)
```

## Common Bit Operations

```javascript
// Check if bit at position k is set
function isBitSet(num, k) { return (num & (1 << k)) !== 0; }

// Set bit at position k to 1
function setBit(num, k) { return num | (1 << k); }

// Clear bit at position k (set to 0)
function clearBit(num, k) { return num & ~(1 << k); }

// Toggle bit at position k
function toggleBit(num, k) { return num ^ (1 << k); }

// Get the rightmost 1-bit (lowest set bit)
function lowestSetBit(num) { return num & -num; }

// Count set bits (naive — O(number of bits))
function countBits(n) {
    let count = 0;
    while (n) { count += n & 1; n >>>= 1; }
    return count;
}

// Brian Kernighan's algorithm (faster — O(number of set bits))
function countBitsFast(n) {
    let count = 0;
    while (n) {
        n = n & (n - 1); // Clears the lowest set bit
        count++;
    }
    return count;
}

console.log(countBitsFast(13)); // 1101 → 3
```

## Applications

```javascript
// Find single number (all others appear twice) — XOR cancels duplicates
function singleNumber(arr) {
    return arr.reduce((acc, n) => acc ^ n, 0);
}
console.log(singleNumber([1, 2, 3, 2, 1])); // 3

// Check if number is a power of two
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}
console.log(isPowerOfTwo(16)); // true (10000)
console.log(isPowerOfTwo(18)); // false (10010)

// Check if two numbers have opposite signs
function oppositeSigns(a, b) { return (a ^ b) < 0; }
console.log(oppositeSigns(5, -3)); // true

// Swap two numbers without temp variable
let a = 5, b = 7;
a ^= b; b ^= a; a ^= b;
console.log(a, b); // 7, 5

// Check if k-th bit is set
console.log(isBitSet(5, 2)); // 5=0101, bit 2=1 → true
console.log(isBitSet(5, 1)); // 5=0101, bit 1=0 → false
```

Bit manipulation is also used for: permissions/flags systems, hash functions, checksums (CRC), cryptography, and low-level hardware control. Many compression algorithms (Huffman, LZW) use bit-level operations.

## Common Bit Masks

```javascript
const PERM_READ   = 1 << 0;  // 001 → 1
const PERM_WRITE  = 1 << 1;  // 010 → 2
const PERM_EXEC   = 1 << 2;  // 100 → 4

let permissions = 0;
permissions |= PERM_READ | PERM_WRITE;  // Set read + write (011 = 3)
console.log(permissions & PERM_EXEC);   // Check execute → 0 (false)
permissions ^= PERM_WRITE;              // Toggle write (001 = 1)
```

This is how Unix file permissions work: `chmod 755` sets rwxr-xr-x using bit masks.

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Duplicates with XOR? | XOR of a number with itself is 0. Great for finding unique elements. |
| Power of two check? | `n > 0 && (n & (n - 1)) === 0` — fast and idiomatic. |
| Need to toggle bits? | Use XOR with a mask. Each 1 in mask toggles the corresponding bit. |
| Need to extract bits? | Use AND with a mask to isolate specific bits. |
| Faster arithmetic? | Left shift (<<1) multiplies by 2, right shift (>>1) divides by 2. |
## Next Steps

[Back to Chapter 20](20-monotonic-stack.md): Monotonic Stack
[Proceed to Chapter 22](22-reverse-engineering-tactics.md): Reverse Engineering Tactics to learn about reverse engineering tactics.
