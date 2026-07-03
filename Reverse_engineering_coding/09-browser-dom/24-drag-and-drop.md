# Drag and Drop

## HTML5 Drag and Drop API

Events:

```
Drag source:          dragstart, drag, dragend
Drop target:          dragenter, dragover, dragleave, drop
```

---

## Dragging an Element

```javascript
const draggable = document.getElementById("item");

draggable.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", draggable.id);
    e.dataTransfer.effectAllowed = "move";
    draggable.classList.add("dragging");
});

draggable.addEventListener("dragend", (e) => {
    draggable.classList.remove("dragging");
});
```

---

## Drop Target

```javascript
const dropZone = document.getElementById("dropZone");

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault(); // Required to allow drop
    e.dataTransfer.dropEffect = "move";
    dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");

    const id = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(id);
    dropZone.appendChild(draggedElement); // Move the element
});
```

---

## Drag Data (dataTransfer)

```javascript
// Set data types
e.dataTransfer.setData("text/plain", "Some text");
e.dataTransfer.setData("text/html", "<b>HTML</b>");
e.dataTransfer.setData("application/json", JSON.stringify(obj));

// Get data (on drop)
const text = e.dataTransfer.getData("text/plain");

// Drag image
e.dataTransfer.setDragImage(imgElement, offsetX, offsetY);

// Available effects
e.dataTransfer.effectAllowed = "copy";     // Copy only
e.dataTransfer.effectAllowed = "move";     // Move only
e.dataTransfer.effectAllowed = "link";     // Link only
e.dataTransfer.effectAllowed = "all";      // Any (default)
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is drag and drop implemented? | Check for `dragstart`, `dragover`, `drop` event listeners. |
| What data is being dragged? | Check `e.dataTransfer.getData("...")` in the drop handler. |
| Is the element moved or copied? | `effectAllowed` on dragstart and `dropEffect` on dragover determine the behavior. |
| Can files be dropped? | Check for `e.dataTransfer.files` in the drop handler. |
| Why isn't drop working? | `dragover` must call `e.preventDefault()` to allow dropping. |

## File Drag and Drop

```javascript
dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
        console.log("Dropped file:", file.name, file.size, file.type);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            showPreview(e.target.result); // data URL
        };
        reader.readAsDataURL(file);
    });
});
```
## Next Steps

[Back to Chapter 23](23-clipboard-geolocation.md): Clipboard API
[Proceed to Chapter 25](25-fetch-api.md): Fetch API to learn about fetch api.
