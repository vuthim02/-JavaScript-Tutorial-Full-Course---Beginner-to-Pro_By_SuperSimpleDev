# Event Delegation

## The Problem

If you have 1,000 list items, adding a listener to each is wasteful:

```javascript
// BAD: adding 1000 listeners
document.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => handleClick(li));
});
```

---

## The Solution

Use **one** listener on a parent element. The event bubbles up from whatever child was clicked.

```javascript
list.addEventListener("click", e => {
    const li = e.target.closest("li"); // Find the <li> ancestor
    if (li) handleClick(li);
});
```

---

## Benefits

```
Faster:
  - One listener vs thousands
  - Less memory
  - Faster setup

Dynamic elements:
  - New children automatically work (no need to re-attach)
  - Even elements added later are caught

Cleaner:
  - Event logic is centralized
  - Easy to remove (one removeEventListener)
```

---

## Delegation Pattern

```javascript
// HTML: <ul id="list"><li>Item 1</li><li>Item 2</li>...</ul>

document.getElementById("list").addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return; // Not a list item

    console.log("Clicked:", li.textContent);

    // Identify which item
    if (li.dataset.action === "delete") {
        deleteItem(li.dataset.id);
    }
});
```

---

## Delegation with Data Attributes

```html
<ul id="toolbar">
    <li data-action="save">Save</li>
    <li data-action="delete">Delete</li>
    <li data-action="edit">Edit</li>
</ul>
```

```javascript
document.getElementById("toolbar").addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (!action) return;
    
    switch (action) {
        case "save":   saveDocument(); break;
        case "delete": deleteDocument(); break;
        case "edit":   editDocument(); break;
    }
});
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is listener attached to child? | Direct listener on each element (no delegation). |
| Or parent? | Listener on ancestor, using event.target to find the actual element. |
| What if the clicked element contains child elements? | Use `e.target.closest(selector)` to find the intended element, not `e.target` directly. |
| Does delegation work for dynamically added elements? | Yes — because the listener is on the parent, not the child. |
## Next Steps

[Back to Chapter 13](13-event-propagation.md): Event Propagation
[Proceed to Chapter 15](15-forms-basics.md): Forms — Input Elements to learn about forms — input elements.
