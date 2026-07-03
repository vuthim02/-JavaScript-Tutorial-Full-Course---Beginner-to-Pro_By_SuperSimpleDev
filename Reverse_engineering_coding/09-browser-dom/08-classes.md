# Classes

## classList API

The modern way to manage CSS classes.

Add:

```javascript
element.classList.add("active");
```

Remove:

```javascript
element.classList.remove("active");
```

Toggle:

```javascript
element.classList.toggle("active"); // Adds if missing, removes if present
element.classList.toggle("active", condition); // Force add/remove based on condition
```

Contains:

```javascript
element.classList.contains("active"); // true/false
```

---

## Multiple Classes

```javascript
element.classList.add("box", "highlight", "visible");
element.classList.remove("hidden", "inactive");
element.classList.replace("old-class", "new-class");
```

---

## className (Older Way)

```javascript
// Gets all classes as a string
console.log(element.className); // "box active"

// Sets all classes (replaces everything)
element.className = "box highlight"; // Previous classes are lost

// Append to existing
element.className += " highlight";
```

`classList` is preferred because it is more precise and does not accidentally wipe existing classes.

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Which CSS class changes appearance? | Check the element's `classList` or CSS rules in DevTools Styles panel. |
| How to check if an element has a class? | `element.classList.contains("classname")`. |
| How to toggle a class? | `element.classList.toggle("classname")`. |
## Next Steps

[Back to Chapter 7](07-attributes.md): Attributes
[Proceed to Chapter 9](09-creating-elements.md): Creating Elements to learn about creating elements.
