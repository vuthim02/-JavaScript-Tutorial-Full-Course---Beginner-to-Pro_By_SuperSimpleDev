# Modifying Content

## Setting Text

```javascript
title.textContent = "Welcome";
```

This replaces all content with plain text. Safe from XSS.

---

## Setting HTML

```javascript
title.innerHTML = "<b>Welcome</b>";
```

This parses and inserts HTML. **XSS risk** if content contains user input:

```javascript
// DANGEROUS:
const username = "<script>stealCookies()</script>";
title.innerHTML = "Welcome, " + username; // Script executes!

// SAFE:
title.textContent = "Welcome, " + username; // Text only
```

---

## Inserting Adjacent HTML

```javascript
// Insert before the element
element.insertAdjacentHTML("beforebegin", "<div>Before</div>");

// Insert as first child
element.insertAdjacentHTML("afterbegin", "<div>First child</div>");

// Insert as last child
element.insertAdjacentHTML("beforeend", "<div>Last child</div>");

// Insert after the element
element.insertAdjacentHTML("afterend", "<div>After</div>");
```

More efficient than `innerHTML` += because it does not re-parse the entire element.

---

## replaceChildren (Modern Bulk Update)

```javascript
// Clear all children and add new ones in one operation
element.replaceChildren();              // Remove all children
element.replaceChildren(newLi1, newLi2); // Replace with new elements
element.replaceChildren(...items);       // Spread an array of elements

// More efficient than innerHTML = "" for element removal
```

## Modifying Styles

```javascript
element.style.color = "red";
element.style.backgroundColor = "blue";     // camelCase for CSS props
element.style.cssText = "color: red; font-size: 16px;"; // Set multiple at once
element.style.setProperty("--custom-prop", "value");    // CSS variables
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Are tags required? | For `textContent`: no. For `innerHTML`: if you want HTML, yes. |
| Is this vulnerable to XSS? | If you put user input into `innerHTML`, yes. Use `textContent` for untrusted data. |
| What is `insertAdjacentHTML` good for? | Inserting HTML snippets at specific positions without re-parsing the whole element. |
| What is the difference between `style.property` and `cssText`? | `style.property` sets one property; `cssText` replaces all inline styles at once (more performant). |
| How to set CSS custom properties? | `element.style.setProperty("--name", "value")`. |
## Next Steps

[Back to Chapter 5](05-reading-content.md): Reading Content
[Proceed to Chapter 7](07-attributes.md): Attributes to learn about attributes.
