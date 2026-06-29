# Selecting Elements

<img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## By ID

```javascript
document.getElementById()
```

Returns one element (or `null` if not found).

```javascript
let title = document.getElementById("heading");
```

---

## By Class

```javascript
document.getElementsByClassName()
```

Returns a live `HTMLCollection`.

```javascript
const boxes = document.getElementsByClassName("box");
console.log(boxes.length); // Number of elements with class "box"
```

**Live** = if the DOM changes after selection, the collection updates automatically.

---

## By Tag

```javascript
document.getElementsByTagName()
```

Also returns a live `HTMLCollection`.

```javascript
const paragraphs = document.getElementsByTagName("p");
```

---

## Modern: querySelector

```javascript
document.querySelector()
```

Returns the **first** match. Uses CSS selector syntax.

```javascript
document.querySelector(".box");          // Class
document.querySelector("#heading");      // ID
document.querySelector("div p");         // Descendant
document.querySelector("[data-type]");   // Attribute
document.querySelector("ul > li:first-child"); // Pseudo-class
```

---

## querySelectorAll

```javascript
document.querySelectorAll()
```

Returns a **static** `NodeList` (not live).

```javascript
const items = document.querySelectorAll(".item");
items.forEach(item => console.log(item.textContent));
```

---

## Performance Comparison

| Method | Speed | Returns | Live? |
|--------|-------|---------|-------|
| `getElementById` | Fastest | Element | N/A |
| `getElementsByClassName` | Very fast | HTMLCollection | Yes |
| `getElementsByTagName` | Very fast | HTMLCollection | Yes |
| `querySelector` | Moderate | Element | N/A |
| `querySelectorAll` | Moderate | NodeList | No |

---

## Selecting from a Specific Element

```javascript
const list = document.getElementById("myList");
const firstItem = list.querySelector("li"); // Only searches inside list
const allItems = list.querySelectorAll("li");
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| One element? | Use `getElementById` or `querySelector` (returns one or null). |
| Multiple elements? | Use `querySelectorAll` (NodeList) or `getElementsByClassName` (HTMLCollection). |
| CSS selector? | `querySelector` and `querySelectorAll` accept any CSS selector. |
| Live or static? | `HTMLCollection` is live. `querySelectorAll` returns a static snapshot. |
## Next Steps

[Back to Chapter 3](03-dom-tree-nodes.md): DOM (Document Object Model)
[Proceed to Chapter 5](05-reading-content.md): Reading Content to learn about reading content.
