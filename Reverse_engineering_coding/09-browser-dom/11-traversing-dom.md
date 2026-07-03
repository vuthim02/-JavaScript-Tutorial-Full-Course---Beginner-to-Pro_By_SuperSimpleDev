# Traversing DOM

## Navigating the DOM Tree

Parent:

```javascript
element.parentElement     // Element parent (excludes text/comment nodes)
element.parentNode        // Any parent node (including document)
```

Children:

```javascript
element.children           // HTMLCollection of child elements
element.childNodes         // NodeList of all child nodes (text, comment, element)
element.firstElementChild  // First child element
element.lastElementChild   // Last child element
element.firstChild         // First child node (could be text)
element.lastChild          // Last child node
```

Siblings:

```javascript
element.nextElementSibling     // Next sibling element
element.previousElementSibling // Previous sibling element
element.nextSibling            // Next sibling node
element.previousSibling        // Previous sibling node
```

---

## Closest (Traversing Up)

```javascript
// Find nearest ancestor matching a selector
const card = button.closest(".card");
// Traverses up: button → li → div.card (stops at first match)
```

Useful for event delegation to find the relevant parent.

---

## Contains (Check Descendant)

```javascript
// Is child inside parent?
const isInside = parent.contains(child); // true/false
```

---

## Traversal Diagram

```
         document
            │
          <html>
            │
          <body>
            │
     ┌──────┼──────┐
     │             │
   <header>      <main>
     │             │
   <nav>        <article>
     │             │
   <a>           <section>
                    │
                  <p>
```

```javascript
const article = document.querySelector("article");
console.log(article.parentElement);      // <main>
console.log(article.children);           // [<section>]
console.log(article.previousElementSibling); // <header>
console.log(article.nextElementSibling); // null (no sibling after main)
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Parent? | `element.parentElement` (element) or `element.parentNode` (any node). |
| Child? | `element.children` (elements) or `element.childNodes` (all nodes). |
| Sibling? | `element.nextElementSibling` or `element.previousElementSibling`. |
| How to find the closest ancestor matching a condition? | `element.closest(selector)`. |
## Next Steps

[Back to Chapter 10](10-removing-elements.md): Removing Elements
[Proceed to Chapter 12](12-events-basics.md): Events to learn about events.
