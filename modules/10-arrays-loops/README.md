# Module 11: Arrays and Loops

**Duration:** ~159 minutes  
**Video Timestamp:** 09:28:26 - (continued)

## Learning Objectives

- Create and manipulate arrays
- Use array methods (push, pop, shift, unshift)
- Iterate with for loops and while loops
- Use forEach, map, filter, reduce
- Find and sort array elements
- Work with nested arrays

## What are Arrays?

Arrays are ordered collections of values. They let you store multiple items in a single variable.

```javascript
const fruits = ['Apple', 'Banana', 'Orange'];
console.log(fruits);        // ['Apple', 'Banana', 'Orange']
console.log(fruits.length); // 3
```

## Creating Arrays

### Array Literal Syntax

```javascript
const empty = [];
const numbers = [1, 2, 3, 4, 5];
const mixed = ['Hello', 42, true, null];
const strings = ['one', 'two', 'three'];
```

### Array Constructor

```javascript
const empty = new Array();
const zeros = new Array(5);        // [undefined, undefined, undefined, undefined, undefined]
const arr = new Array(1, 2, 3);    // [1, 2, 3]
```

## Accessing Elements

### Indexing

Arrays are zero-indexed (first element is at index 0):

```javascript
const fruits = ['Apple', 'Banana', 'Orange'];

console.log(fruits[0]);  // Apple
console.log(fruits[1]);  // Banana
console.log(fruits[2]);  // Orange
console.log(fruits[3]);  // undefined (doesn't exist)
```

## Modifying Arrays

### Adding Elements

```javascript
const arr = [1, 2, 3];

// Add to end
arr.push(4);           // [1, 2, 3, 4]
arr.push(5, 6);        // [1, 2, 3, 4, 5, 6]

// Add to beginning
arr.unshift(0);        // [0, 1, 2, 3, 4, 5, 6]
```

### Removing Elements

```javascript
const arr = [1, 2, 3, 4, 5];

// Remove from end
const last = arr.pop();    // last = 5, arr = [1, 2, 3, 4]

// Remove from beginning
const first = arr.shift(); // first = 1, arr = [2, 3, 4]
```

### Splicing Arrays

```javascript
const arr = [1, 2, 3, 4, 5];

// Remove/add elements at index 2
// arr.splice(start, deleteCount, itemsToAdd)
arr.splice(2, 1);              // Remove 1 element at index 2 → [1, 2, 4, 5]

// Insert without removing
arr.splice(2, 0, 'new');      // Insert 'new' at index 2 → [1, 2, 'new', 3, 4, 5]

// Replace elements
arr.splice(2, 2, 'a', 'b');   // Replace 2 elements starting at index 2
```

## Loops

### For Loop

```javascript
const fruits = ['Apple', 'Banana', 'Orange'];

// Traditional for loop
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

### While Loop

```javascript
let count = 0;

while (count < 5) {
  console.log(count);
  count++;
}
// 0, 1, 2, 3, 4
```

### forEach Method

```javascript
const numbers = [1, 2, 3];

numbers.forEach(function(num) {
  console.log(num);
});

// Arrow function
numbers.forEach(num => console.log(num));
```

### for...of Loop

```javascript
const fruits = ['Apple', 'Banana', 'Orange'];

for (const fruit of fruits) {
  console.log(fruit);
}
```

## Array Methods

### map()

Create a new array by transforming each element:

```javascript
const numbers = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers.map(num => num * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]
```

### filter()

Create a new array with elements that pass a test:

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter even numbers
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens);  // [2, 4, 6, 8, 10]
```

### reduce()

Reduce array to a single value:

```javascript
const numbers = [1, 2, 3, 4, 5];

// Sum all numbers
const sum = numbers.reduce((acc, cur) => acc + cur, 0);
console.log(sum);  // 15
```

### find() and findIndex()

```javascript
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];

const user = users.find(u => u.name === 'Jane');
console.log(user);  // { name: 'Jane', age: 25 }

const index = users.findIndex(u => u.name === 'Jane');
console.log(index);  // 1
```

### some() and every()

```javascript
const numbers = [1, 3, 5, 7, 9];

const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven);  // false

const allOdd = numbers.every(num => num % 2 !== 0);
console.log(allOdd);  // true
```

## Sorting Arrays

```javascript
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// Sort numbers correctly
numbers.sort((a, b) => a - b);
console.log(numbers);  // [1, 1, 2, 3, 4, 5, 6, 9]
```

## Todo List Project

```javascript
let todos = [];

function addTodo(text) {
  todos.push({
    text: text,
    completed: false
  });
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function renderTodos() {
  document.querySelector('.todo-list').innerHTML = todos.map((todo, i) => `
    <div class="todo-item ${todo.completed ? 'completed' : ''}">
      <span>${todo.text}</span>
      <button onclick="deleteTodo(${i})">Delete</button>
      <button onclick="toggleTodo(${i})">${todo.completed ? 'Undo' : 'Complete'}</button>
    </div>
  `).join('');
}
```

## Practice Exercises

### Exercise 11.1: Array Basics
Create an array of your 5 favorite movies.

### Exercise 11.2: Filter and Map
Given an array of numbers, create a new array with squares of even numbers.

### Exercise 11.3: Sum and Average
Calculate the sum and average of an array.

### Exercise 11.4: Todo List
Create a todo list with add, remove, and toggle functionality.

## Summary

- Arrays store ordered collections of values
- Access elements by index (0-based)
- Add/remove: push, pop, shift, unshift, splice
- Loop: for, while, for...of, forEach
- Transform: map, filter, reduce

## Next Steps

Proceed to Module 12: Advanced Functions.
