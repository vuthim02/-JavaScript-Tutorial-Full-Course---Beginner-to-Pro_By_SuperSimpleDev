# DOM (Document Object Model)

## What is the DOM?

DOM = Document Object Model. A tree representation of the HTML document.

HTML:

```html
<h1>Hello</h1>
```

Becomes a tree of objects:

```
document
 │
 └── html
      │
      └── body
           │
           └── h1
                │
                └── text "Hello"
```

---

## Every Node is an Object

```javascript
console.log(typeof document);          // "object"
console.log(document.nodeType);        // 9 (DOCUMENT_NODE)
console.log(document.documentElement); // <html> element
console.log(document.body);            // <body> element
console.log(document.head);            // <head> element
```

---

## Node Types

| Constant | Value | Represents |
|----------|-------|------------|
| `ELEMENT_NODE` | 1 | HTML element (div, p, h1) |
| `ATTRIBUTE_NODE` | 2 | Attribute (deprecated) |
| `TEXT_NODE` | 3 | Text content |
| `COMMENT_NODE` | 8 | HTML comment `<!-- -->` |
| `DOCUMENT_NODE` | 9 | `document` itself |

```javascript
const div = document.createElement("div");
console.log(div.nodeType === Node.ELEMENT_NODE); // true

const text = document.createTextNode("Hello");
console.log(text.nodeType === Node.TEXT_NODE); // true
```

---

## DOM is Live

If you change the DOM, the page updates immediately:

```javascript
document.body.style.backgroundColor = "red";
// Background turns red instantly
```

But if you hold a reference to a removed element, it stays in memory:

```javascript
const div = document.getElementById("temp");
document.body.removeChild(div);
// div still exists in memory (detached from DOM)
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which HTML element does this object represent? | Check `element.tagName` or `element.id`. |
| Who created it? | The browser parser creates the initial DOM. JavaScript can create/modify more nodes. |
| Is this node attached to the DOM? | Check `document.contains(element)`. If false, it's detached. |
| What node type is this? | Check `element.nodeType`. |
## Next Steps

[Back to Chapter 2](02-window-object.md): Browser Object Model (BOM)
[Proceed to Chapter 4](04-selecting-elements.md): Selecting Elements to learn about selecting elements.
