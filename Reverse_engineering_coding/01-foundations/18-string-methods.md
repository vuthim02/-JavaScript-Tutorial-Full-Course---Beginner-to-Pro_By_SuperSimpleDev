# String Methods

<img src="https://media.giphy.com/media/E470LZUmy2Jiw/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Strings Have Built-in Methods

Every string comes with methods you can call to inspect or transform it.

---

## Length — How Many Characters?

```javascript
let text = "Hello";
console.log(text.length); // 5

console.log("".length);   // 0
console.log("A B".length); // 3 (space counts)
```

---

## Accessing Characters

```javascript
let str = "Hello";

console.log(str[0]);          // "H" — first character (zero-indexed)
console.log(str[1]);          // "e"
console.log(str[str.length - 1]); // "o" — last character
```

---

## Changing Case

```javascript
let str = "Hello, World!";

console.log(str.toUpperCase()); // "HELLO, WORLD!"
console.log(str.toLowerCase()); // "hello, world!"
```

These **return a new string** — the original is unchanged.

---

## Finding Things Inside a String

```javascript
let str = "Hello, World!";

// indexOf — returns position or -1 if not found
console.log(str.indexOf("World")); // 7
console.log(str.indexOf("Bob"));   // -1

// includes — returns true/false
console.log(str.includes("World")); // true
console.log(str.includes("Bob"));   // false

// startsWith / endsWith
console.log(str.startsWith("Hello")); // true
console.log(str.endsWith("!"));       // true
```

---

## Extracting Parts of a String

```javascript
let str = "Hello, World!";

// slice(start, end) — end is exclusive
console.log(str.slice(0, 5));   // "Hello"
console.log(str.slice(7));      // "World!" (to the end)
console.log(str.slice(-6));     // "World!" (negative = from end)
```

---

## Modifying Strings

These all return a **new string** — original is unchanged:

```javascript
let str = "  Hello, World!  ";

// trim — removes whitespace from both ends
console.log(str.trim()); // "Hello, World!"

// replace — replaces first occurrence
console.log(str.trim().replace("World", "JS")); // "Hello, JS!"

// replaceAll — replaces all occurrences (ES2021)
console.log("a-b-c".replaceAll("-", "/")); // "a/b/c"
```

---

## Splitting a String into an Array

```javascript
console.log("a,b,c".split(","));   // ["a", "b", "c"]
console.log("hello".split(""));    // ["h", "e", "l", "l", "o"]
console.log("one two three".split(" ")); // ["one", "two", "three"]
```

---

## Practical Patterns

```javascript
// Capitalize first letter
function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}
console.log(capitalize("hello")); // "Hello"

// Check if string is empty
function isEmpty(str) {
    return str.length === 0;
}

// Count occurrences of a character
"hello".split("l").length - 1; // 2 (count of "l")
```

---

## Reverse Engineering: String Methods

| Question | Answer |
|---|---|
| Do methods modify the original string? | No — strings are immutable; every method returns a new string |
| What does `indexOf` return if not found? | `-1` |
| What does `str[0]` give you? | The first character (strings are zero-indexed) |
| How do I get the last character? | `str[str.length - 1]` |
| What's the difference between `replace` and `replaceAll`? | `replace` replaces only the first match; `replaceAll` replaces all |
## Next Steps

[Back to Chapter 17](17-ternary-operator.md): Ternary Operator and Special Operators
[Proceed to Module 2](../02-core-concepts/README.md): Core Programming Concepts to learn about fundamental programming concepts in JavaScript.
