/**
 * PART 11 — Data Structures & Algorithms: Stack, Queue, Linked List, Binary Search, Bubble Sort
 * Run with: node part11-dsa.js
 */

// ---------------------------------------------------------------
// 1. Stack — LIFO (Last In, First Out)
// ---------------------------------------------------------------

class Stack {
  constructor() {
    this.items = [];
  }

  // Add item to the top
  push(item) {
    this.items.push(item);
  }

  // Remove and return item from the top
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  // View the top item without removing
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

console.log('Stack (LIFO):');
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log('  pop:', stack.pop()); // 30
console.log('  peek:', stack.peek()); // 20
console.log('  size:', stack.size()); // 2

// ---------------------------------------------------------------
// 2. Queue — FIFO (First In, First Out)
// ---------------------------------------------------------------

class Queue {
  constructor() {
    this.items = [];
  }

  // Add to the back
  enqueue(item) {
    this.items.push(item);
  }

  // Remove from the front
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }

  // View front item
  front() {
    if (this.isEmpty()) return null;
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

console.log('Queue (FIFO):');
const queue = new Queue();
queue.enqueue('A');
queue.enqueue('B');
queue.enqueue('C');
console.log('  dequeue:', queue.dequeue()); // 'A'
console.log('  front:', queue.front()); // 'B'
console.log('  size:', queue.size()); // 2

// ---------------------------------------------------------------
// 3. Linked List Node — building block for linked structures
// ---------------------------------------------------------------

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null; // Points to the next node
  }
}

// Singly Linked List
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Add to the end
  append(value) {
    const node = new ListNode(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.tail.next = node;
    this.tail = node;
  }

  // Add to the beginning
  prepend(value) {
    const node = new ListNode(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    node.next = this.head;
    this.head = node;
  }

  // Find a value
  find(value) {
    let current = this.head;
    while (current !== null) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  // Convert to array for easy display
  toArray() {
    const result = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

console.log('Linked List:');
const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);
console.log('  toArray:', list.toArray()); // [0, 1, 2, 3]
console.log('  find(2):', list.find(2)?.value); // 2
console.log('  find(99):', list.find(99)); // null

// ---------------------------------------------------------------
// 4. Binary Search — O(log n) on sorted array
// ---------------------------------------------------------------

function binarySearch(sortedArr, target) {
  let left = 0;
  let right = sortedArr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const guess = sortedArr[mid];

    if (guess === target) return mid; // Found
    if (guess < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }

  return -1; // Not found
}

const sortedNumbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log('Binary Search:');
console.log('  find 7 at index:', binarySearch(sortedNumbers, 7)); // 3
console.log('  find 1 at index:', binarySearch(sortedNumbers, 1)); // 0
console.log('  find 15 at index:', binarySearch(sortedNumbers, 15)); // 7
console.log('  find 8 (not found):', binarySearch(sortedNumbers, 8)); // -1

// ---------------------------------------------------------------
// 5. Bubble Sort — O(n²) — simple but slow
// ---------------------------------------------------------------

function bubbleSort(arr) {
  const result = [...arr]; // Make a copy to avoid mutation
  const n = result.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // After each pass, the largest element "bubbles" to the end
    for (let j = 0; j < n - 1 - i; j++) {
      if (result[j] > result[j + 1]) {
        // Swap
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }

    // If no swaps happened, array is already sorted — early exit
    if (!swapped) break;
  }

  return result;
}

const unsorted = [64, 34, 25, 12, 22, 11, 90];
console.log('Bubble Sort:');
console.log('  before:', unsorted);
console.log('  after:', bubbleSort(unsorted));
console.log('  original unchanged:', unsorted);
