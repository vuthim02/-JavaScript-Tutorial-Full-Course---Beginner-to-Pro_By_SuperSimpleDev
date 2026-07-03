# 04 — Iteration: `while`, `do...while`, `for`, `for...in`, `for...of`

## `while` Loop

```javascript
while (condition) {
    // body — executes as long as condition is truthy
}
```

**Execution flow:** Evaluate condition → if truthy execute body → repeat. If falsy, exit.

```javascript
let i = 1;
while (i <= 5) {
    console.log(i);  // 1, 2, 3, 4, 5
    i++;
}
```

### Common `while` Patterns

```javascript
// Countdown
let count = 10;
while (count > 0) {
    console.log(count);
    count--;
}
console.log("Blast off!");

// Processing queue until empty
let queue = ["task1", "task2", "task3"];
while (queue.length > 0) {
    let task = queue.shift();
    console.log(`Processing ${task}`);
}

// Infinite loop with break
while (true) {
    if (someCondition) break;
}
```

## `do...while` Loop

Always executes the body **at least once**, even if the condition is falsy from the start.

```javascript
do {
    // body — executes at least once
} while (condition);
```

```javascript
// Body executes before condition is checked
let i = 10;
do {
    console.log(i);  // 10 (executes once)
    i++;
} while (i <= 5);    // 11 <= 5 → false → exit

// while would never run:
let j = 10;
while (j <= 5) {     // 10 <= 5 → false → body never executes
    console.log(j);
}
```

### When to Use `do...while`

```javascript
// User input validation — ask at least once
let input;
do {
    input = prompt("Enter a positive number:");
} while (input <= 0);

// Game loop — play at least one round
let playAgain;
do {
    playGame();
    playAgain = confirm("Play again?");
} while (playAgain);
```

## `for` Loop

```javascript
for (initialization; condition; update) {
    // body
}
```

**Execution flow:**
1. Initialization (executed ONCE before loop)
2. Condition check (before each iteration)
3. If truthy → execute body → execute update → go to step 2
4. If falsy → exit loop

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}
```

### All Three Parts of `for`

| Part     | Purpose                          | Examples                            |
|----------|----------------------------------|-------------------------------------|
| Init     | Executed once                    | `let i = 0`, `let x=10, y=20`      |
| Condition| Checked before each iteration    | `i < arr.length`, `true`, omitted   |
| Update   | Executed after each body         | `i++`, `i--`, `i += 2`, omitted     |

### Common `for` Loop Patterns

```javascript
// Iterating array
for (let i = 0; i < arr.length; i++) { console.log(arr[i]); }

// Reverse iteration
for (let i = arr.length - 1; i >= 0; i--) { console.log(arr[i]); }

// Stepping
for (let i = 0; i < 10; i += 2) { console.log(i); }  // 0, 2, 4, 6, 8

// Two variables
for (let i = 0, j = 10; i <= j; i++, j--) {
    console.log(i, j);  // (0,10) (1,9) ...
}

// Infinite loop with break
for (;;) {
    let input = prompt("Enter 'quit' to exit:");
    if (input === "quit") break;
}
```

### Scope in `for` Loops

```javascript
for (let i = 0; i < 3; i++) { }
console.log(i); // ReferenceError — let is block-scoped to the loop

for (var j = 0; j < 3; j++) { }
console.log(j); // 3 — var leaks outside the loop
```

## `break` and `continue`

### `break` — Exit Loop Immediately

```javascript
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break;          // loop stops immediately
    }
    console.log(i);     // 0, 1, 2, 3, 4
}
```

### `continue` — Skip to Next Iteration

```javascript
for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue;       // skip rest of this iteration
    }
    console.log(i);     // 0, 1, 3, 4
}
```

### Filtering with `continue`

```javascript
const arr = [1, "hello", null, 3, undefined, 5, ""];
for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number") {
        continue;       // skip non-numbers
    }
    console.log(arr[i]); // 1, 3, 5
}
```

### Labeled Statements

```javascript
outer: for (let i = 0; i < 3; i++) {
    inner: for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break outer;    // breaks BOTH loops
        }
        console.log(i, j);
    }
}
// Output: (0,0) (0,1) (0,2) (1,0)
```

## `for...of` Loop

Iterates over **values** of an iterable (arrays, strings, Maps, Sets, etc.).

```javascript
const numbers = [10, 20, 30];
for (const num of numbers) {
    console.log(num);     // 10, 20, 30
}

// Strings
for (const char of "Hello") {
    console.log(char);    // "H", "e", "l", "l", "o"
}

// With index via .entries()
for (const [index, color] of colors.entries()) {
    console.log(index, color);
}
```

## `for...in` Loop

Iterates over **enumerable property keys** of an object (including inherited ones).

```javascript
const user = { name: "John", age: 25, city: "Boston" };
for (const key in user) {
    console.log(key, user[key]);
}
// name John, age 25, city Boston
```

### `for...in` on Arrays (Not Recommended)

```javascript
const arr = [10, 20, 30];
for (const key in arr) {
    console.log(key, arr[key]);  // "0" 10, "1" 20, "2" 30 — keys are strings!
}
```

**Why not use `for...in` on arrays:**
1. Keys are strings, not numbers.
2. Iterates over inherited properties.
3. Iterates in arbitrary order.
4. Slower than `for` or `for...of`.

### Filtering Inherited Properties

```javascript
for (const key in obj) {
    if (obj.hasOwnProperty(key)) {     // or Object.hasOwn(obj, key) (ES2022)
        console.log(key, obj[key]);    // own properties only
    }
}
```

## Loop Comparison

| Loop        | Best For                       | Gives           | Works On                  |
|-------------|--------------------------------|-----------------|---------------------------|
| `while`     | Unknown iteration count        | Manual control  | Any condition             |
| `do...while`| Body must run at least once    | Manual control  | Any condition             |
| `for`       | Known count, index access      | Index           | Indexable collections      |
| `for...of`  | Iterating values               | Values          | Iterables (arrays, strings, Map, Set) |
| `for...in`  | Iterating object keys          | Keys (strings)  | Objects (avoid on arrays) |

## Reverse Engineering Q&A

| Question | Answer |
|----------|--------|
| Which variable changes each iteration? | The loop variable. |
| Can the condition ever become false? | If yes, the loop terminates. If no, infinite loop. |
| How many iterations? | Trace the variable changes to count. |
| What stops the loop? | The exit condition or a `break`. |
| Which iteration was skipped? | Where `continue` was triggered. |
| Is there a risk of infinite loop? | Check if the exit condition is reachable. |
| Are we iterating keys or values? | `for...in` gives keys (strings); `for...of` gives values. |
| Is `for...in` used on an array? | If so, it's likely wrong — keys are strings, inherited props included. |
## Next Steps

[Back to Chapter 3](03-if-else-switch-ternary.md): 03 — Control Flow: `if`/`else`, `switch`, Ternary
[Proceed to Chapter 5](05-recursion.md): 05 — Recursion, Call Stack & Stack Overflow to learn about 05 — recursion, call stack & stack overflow.
