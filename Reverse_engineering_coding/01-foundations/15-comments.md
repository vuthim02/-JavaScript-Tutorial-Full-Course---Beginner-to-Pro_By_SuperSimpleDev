# Comments in JavaScript

<img src="https://media.giphy.com/media/Q61LJj43H48z1FIK4X/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Are Comments?

Comments are **notes for humans** that JavaScript ignores. They help you (and other developers) understand what your code does.

```javascript
// This is a comment — JavaScript won't run this line
console.log("Hello"); // Comments can go after code too
```

---

## Single-Line Comments

Use `//` for comments that fit on one line:

```javascript
// Calculate the total price with tax
let total = price * 1.08;

// Anything after // on this line is ignored
console.log(total); // This comment explains the output
```

---

## Multi-Line Comments

Use `/* */` for comments that span multiple lines:

```javascript
/*
  This is a multi-line comment.
  It can span several lines.
  Great for explaining complex logic.
*/
let result = 5 + 3;
```

---

## Documentation Comments (JSDoc)

Use `/** */` for documenting functions — editors use these for tooltips:

```javascript
/**
 * Converts Celsius to Fahrenheit
 * @param {number} celsius - The temperature in Celsius
 * @returns {number} The temperature in Fahrenheit
 */
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
```

When you type `toFahrenheit(`, your editor will show you the description.

---

## Commenting Out Code

Use comments to **temporarily disable** code while debugging:

```javascript
// console.log("This won't run");
console.log("This will run");

/*
  let x = 10;
  let y = 20;
  console.log(x + y);
*/
```

---

## Best Practices

| Do | Don't |
|---|---|
| Explain WHY, not what | Don't state the obvious: `x++; // increment x by 1` |
| Use JSDoc for functions | Don't leave commented-out code in production |
| Keep comments up to date | Don't write novels — be concise |
| Explain tricky logic | Don't comment every single line |

---

## Reverse Engineering: Comments

| Question | Answer |
|---|---|
| Does JavaScript run comments? | No — they are completely ignored |
| Why use `/** */` instead of `/* */`? | `/** */` enables editor tooltips and documentation generation |
| Can I nest `/* */` inside `/* */`? | No — nested block comments cause syntax errors |
| What's the shortcut to comment code? | `Ctrl+/` (Windows/Linux) or `Cmd+/` (Mac) toggles comments |
| How do I temporarily disable code? | Comment it out with `//` or `/* */` |
## Next Steps

[Back to Chapter 14](14-reverse-engineering-tactics.md): Reverse Engineering Tactical Training
[Proceed to Chapter 16](16-if-else.md): If-Else Statements and Control Flow to learn about if-else statements and control flow.
