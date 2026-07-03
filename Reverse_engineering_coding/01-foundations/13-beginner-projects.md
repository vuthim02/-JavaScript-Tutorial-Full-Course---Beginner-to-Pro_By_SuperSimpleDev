# Beginner Projects

## Project 1: Temperature Converter

Converts Celsius to Fahrenheit.

```javascript
let celsius = 30;
let fahrenheit = (celsius * 9 / 5) + 32;
console.log(fahrenheit); // 86
```

| Line | What It Does |
|---|---|
| `let celsius = 30;` | Creates a variable `celsius` with value 30 |
| `(celsius * 9 / 5) + 32` | Applies the formula: °F = (°C × 9/5) + 32 |
| `let fahrenheit = ...` | Stores the calculated result |
| `console.log(fahrenheit)` | Outputs 86 |

**Interactive version:**

```javascript
function convertCelsiusToFahrenheit() {
    let celsius = Number(prompt("Enter temperature in Celsius:"));
    let fahrenheit = (celsius * 9 / 5) + 32;
    console.log(`${celsius}°C = ${fahrenheit}°F`);
}

// Reverse: Fahrenheit to Celsius
let f = 86;
let c = (f - 32) * 5 / 9;
console.log(c); // 30
```

---

## Project 2: Circle Area Calculator

```javascript
const pi = 3.14;
let radius = 5;
let area = pi * radius ** 2;
console.log(area); // 78.5
```

**Using Math.PI for more precision:**

```javascript
const pi = Math.PI; // 3.141592653589793
let radius = 5;
let area = pi * radius ** 2;
console.log(area); // 78.53981633974483

// As a reusable function
function circleArea(radius) {
    return Math.PI * radius ** 2;
}
console.log(circleArea(5));   // 78.53...
console.log(circleArea(10));  // 314.15...
```

---

## Project 3: Age Calculator

```javascript
let birthYear = 2000;
let currentYear = 2026;
let age = currentYear - birthYear;
console.log(age); // 26
```

**Improved with Date object:**

```javascript
const birthYear = 2000;
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;
console.log(age);
```

---

## Project 4: Simple Calculator

```javascript
const num1 = Number(prompt("Enter first number:"));
const operator = prompt("Enter operator (+, -, *, /):");
const num2 = Number(prompt("Enter second number:"));

let result;

if (operator === "+") {
    result = num1 + num2;
} else if (operator === "-") {
    result = num1 - num2;
} else if (operator === "*") {
    result = num1 * num2;
} else if (operator === "/") {
    result = num1 / num2;
} else {
    result = "Invalid operator";
}

console.log(`${num1} ${operator} ${num2} = ${result}`);
```

**Key concepts:**
- `Number(prompt(...))` — converts string input to a number
- `===` — strict equality to check the operator
- `if / else if / else` — branching logic
- Template literals — embedding variables in output

---

## Project 5: Swap Two Variables

```javascript
let a = 5;
let b = 10;

// Method 1: Classic — using a temporary variable
let temp = a;
a = b;
b = temp;
console.log(a, b); // 10 5

// Method 2: Modern — ES6 destructuring
[a, b] = [b, a];
console.log(a, b); // 5 10 (swapped back)
```

---

## Project 6: Even or Odd Checker

```javascript
const number = Number(prompt("Enter a number:"));
const isEven = number % 2 === 0;
console.log(`${number} is ${isEven ? "even" : "odd"}`);
```

**The ternary operator** `isEven ? "even" : "odd"`:
- Format: `condition ? valueIfTrue : valueIfFalse`
- Compact `if/else` in one line

---

## Project 7: FizzBuzz (Classic)

```javascript
function fizzBuzz(n) {
    if (n % 3 === 0 && n % 5 === 0) {
        return "FizzBuzz";
    } else if (n % 3 === 0) {
        return "Fizz";
    } else if (n % 5 === 0) {
        return "Buzz";
    } else {
        return n;
    }
}

console.log(fizzBuzz(15)); // FizzBuzz
console.log(fizzBuzz(9));  // Fizz
console.log(fizzBuzz(10)); // Buzz
console.log(fizzBuzz(7));  // 7
```

**Key concepts:**
- `%` (modulus) to check divisibility
- `&&` to combine conditions
- `if / else if / else` branching
- Order matters — check combined condition first

---

## Project 8: Rock Paper Scissors Logic

Generate a random computer move and determine the winner:

```javascript
function getComputerMove() {
    const random = Math.random();
    if (random < 1 / 3) {
        return "rock";
    } else if (random < 2 / 3) {
        return "paper";
    } else {
        return "scissors";
    }
}

function getWinner(player, computer) {
    if (player === computer) {
        return "Tie";
    }
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "You win!";
    }
    return "Computer wins!";
}

console.log(getWinner("rock", getComputerMove()));
```

**Key concepts:**
- `Math.random()` with `if/else` for weighted random choice
- Functions composing together
- Complex boolean logic with `||` and `&&`
- String comparison for game rules
## Next Steps

[Back to Chapter 12](12-input-and-output.md): Input and Output, Statements, and Comments
[Proceed to Chapter 14](14-reverse-engineering-tactics.md): Reverse Engineering Tactical Training to learn about reverse engineering tactical training.
