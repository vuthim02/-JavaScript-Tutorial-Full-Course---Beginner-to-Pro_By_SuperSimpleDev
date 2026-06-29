# Attributes

## Reading and Writing Attributes

HTML:

```html
<img src="cat.jpg">
```

Read:

```javascript
img.getAttribute("src");
```

Set:

```javascript
img.setAttribute("src", "dog.jpg");
```

Remove:

```javascript
img.removeAttribute("src");
```

---

## Properties vs Attributes

Some HTML attributes have corresponding DOM properties:

```html
<input id="email" type="text" value="user@example.com">
```

```javascript
// Attribute access
console.log(input.getAttribute("value")); // "user@example.com" (initial value)

// Property access
console.log(input.value); // Current value (changes as user types)
```

**Key difference:** Properties are **live** (current state). Attributes are **initial** (HTML source). For `value`, `checked`, `disabled`, `selected` — properties reflect current state.

---

## Boolean Attributes

```html
<button disabled>Click</button>
```

```javascript
// Checking boolean attributes
console.log(button.disabled); // true (property)
console.log(button.hasAttribute("disabled")); // true

// Setting
button.disabled = true; // Adds disabled attribute
button.disabled = false; // Removes disabled attribute

// Using setAttribute
button.setAttribute("disabled", ""); // Any value = true
button.removeAttribute("disabled"); // Removes
```

---

## data-* Attributes

```html
<div data-user-id="42" data-role="admin">John</div>
```

```javascript
console.log(div.dataset.userId); // "42" (camelCase!)
console.log(div.dataset.role);   // "admin"

div.dataset.userId = "100";
// Updates data-user-id in HTML
```

---

## class and id Attributes

```javascript
// id
element.id = "newId";

// class (use classList instead of setAttribute)
element.className = "box active"; // Replaces all classes
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Property? | `.value`, `.id`, `.disabled` — access current state. |
| Attribute? | `getAttribute("value")` — access initial HTML value. |
| Not always identical. | Property is live; attribute is initial. Check which one you need. |
| How to store custom data? | Use `data-*` attributes and `dataset` property. |
## Next Steps

[Back to Chapter 6](06-modifying-content.md): Modifying Content
[Proceed to Chapter 8](08-classes.md): Classes to learn about classes.
