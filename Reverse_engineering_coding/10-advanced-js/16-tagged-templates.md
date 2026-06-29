# 16 — Tagged Template Literals

<img src="https://media.giphy.com/media/l46ChKeGsmsfE3Un6/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Template Literals

```javascript
const name = "John";
const message = `Hello ${name}`;
```

---

## Tagged Templates

A function that receives the template parts and interpolated values:

```javascript
function tag(strings, ...values) {
    console.log(strings); // Array of string parts
    console.log(values);  // Array of interpolated values
    return "processed";
}

const name = "John";
const age = 30;
const result = tag`Hello ${name}, age ${age}`;
// strings: ["Hello ", ", age ", ""]
// values: ["John", 30]
```

---

## How Tagged Templates Work

```javascript
const name = "John";
const result = tag`Hello ${name}!`;
// Equivalent to:
// tag(["Hello ", "!"], "John")
```

The `strings` array always has one more element than `values`.

---

## Practical: Safe HTML Builder

```javascript
function html(strings, ...values) {
    let result = "";
    strings.forEach((str, i) => {
        result += str;
        if (i < values.length) {
            // Escape HTML special characters
            result += String(values[i])
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
        }
    });
    return result;
}

const userInput = "<script>alert('xss')</script>";
const safe = html`<div>${userInput}</div>`;
console.log(safe); // <div>&lt;script&gt;alert('xss')&lt;/script&gt;</div>
// Safe – no script injection
```

---

## Practical: CSS-in-JS (Styled Components Pattern)

```javascript
const styled = {};

function createStyled(tag) {
    return function(strings, ...values) {
        return function(props = {}) {
            let css = "";
            strings.forEach((str, i) => {
                css += str;
                if (i < values.length) {
                    const value = values[i];
                    css += typeof value === "function" ? value(props) : value;
                }
            });
            const element = document.createElement(tag);
            element.style.cssText = css;
            return element;
        };
    };
}

// Usage
const Button = createStyled("button")`
    background: ${props => props.primary ? "blue" : "gray"};
    color: white;
    padding: 10px 20px;
`;

const btn = Button({ primary: true });
document.body.appendChild(btn);
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this a tagged template? | Look for a function name (or expression) immediately before a template literal. |
| What does the tag function receive? | First argument: array of string parts. Remaining arguments: interpolated values. |
| Why use tagged templates? | Custom processing of template strings (escaping, localization, CSS-in-JS). |
## Next Steps

[Back to Chapter 15](15-regexp.md): 15 — Regular Expressions
[Proceed to Chapter 17](17-intl.md): 17 — Internationalization API (Intl) to learn about 17 — internationalization api (intl).
