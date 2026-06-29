# MutationObserver

<img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Watching DOM Changes

```javascript
new MutationObserver()
```

```javascript
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        console.log("Type:", mutation.type); // "childList", "attributes", "characterData"
        
        if (mutation.type === "childList") {
            console.log("Added nodes:", mutation.addedNodes);
            console.log("Removed nodes:", mutation.removedNodes);
        }
        
        if (mutation.type === "attributes") {
            console.log("Attribute changed:", mutation.attributeName);
            console.log("Old value:", mutation.oldValue);
        }
    });
});

// Start observing
observer.observe(document.getElementById("target"), {
    childList: true,      // Watch for added/removed children
    attributes: true,     // Watch for attribute changes
    characterData: true,  // Watch for text changes
    subtree: true,        // Watch descendants too
    attributeOldValue: true, // Record old attribute value
    characterDataOldValue: true // Record old text value
});

// Stop observing
observer.disconnect();
```

---

## Use Cases

```javascript
// 1. Extensions: detect changes on dynamic pages
const pageObserver = new MutationObserver(() => {
    const newElement = document.querySelector(".dynamic-content");
    if (newElement) {
        processElement(newElement);
    }
});

pageObserver.observe(document.body, {
    childList: true,
    subtree: true
});

// 2. Detect when element is added
const waitForElement = (selector) => {
    return new Promise((resolve) => {
        const existing = document.querySelector(selector);
        if (existing) return resolve(existing);
        
        const observer = new MutationObserver(() => {
            const element = document.querySelector(selector);
            if (element) {
                observer.disconnect();
                resolve(element);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
};

// Usage
const modal = await waitForElement(".modal");
console.log("Modal appeared:", modal);
```

---

## Performance Warning

```javascript
// BAD: very expensive (watches every attribute on every node)
observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: [] // ALL attributes
});

// GOOD: only watch specific attributes
observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ["class", "style"] // Only these
});
```
## Next Steps

[Back to Chapter 28](28-requestanimationframe.md): requestAnimationFrame
[Proceed to Chapter 30](30-senior-checklist.md): Senior Reverse Engineering Checklist to learn about senior reverse engineering checklist.
