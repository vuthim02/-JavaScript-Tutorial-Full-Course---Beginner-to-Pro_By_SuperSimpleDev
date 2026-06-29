# Reflow vs Repaint

<img src="https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Reflow (Layout)

Changes that affect **geometry**:

```javascript
element.style.width = "200px";
element.style.margin = "10px";
element.style.fontSize = "20px";
element.style.display = "none";
element.style.top = "100px";
```

Triggers layout recalculation for the element (and often its children, ancestors).

**Most expensive operation.**

---

## Repaint (Paint)

Changes that affect **appearance only**:

```javascript
element.style.color = "red";
element.style.background = "blue";
element.style.visibility = "hidden";  // Still occupies space
element.style.outline = "1px solid";
```

**Less expensive** (no geometry calculation).

---

## Composite Only (Best)

Changes that only affect the **composite layer**:

```javascript
element.style.transform = "translateX(100px)";
element.style.opacity = "0.5";
```

**Cheapest** — no layout, no repaint. GPU accelerated.

---

## Performance Hierarchy

```
Composite only (transform, opacity)
    → Fastest (GPU)
    
Repaint (color, background, visibility)
    → Moderate (CPU paint)
    
Reflow (width, height, margin, padding, font-size)
    → Slowest (layout calculation)
```

---

## Minimizing Reflows

```javascript
// BAD: multiple reflows
element.style.width = "100px";
element.style.height = "200px";
element.style.margin = "10px";

// GOOD: single reflow via class
element.className = "box-active";

// OR: batch with cssText
element.style.cssText = "width: 100px; height: 200px; margin: 10px;";
```

---

## Reading Triggers Reflow

```javascript
// Reading these forces an immediate reflow (to give you the correct value):
element.offsetWidth;     // Forces reflow
element.offsetHeight;
element.getBoundingClientRect();
element.scrollTop;
window.getComputedStyle(element);
```

**Batch your reads and writes:**

```javascript
// BAD: read → write → read → write (multiple reflows)
const w = box.offsetWidth;
box.style.width = (w + 10) + "px";
const h = box.offsetHeight;
box.style.height = (h + 10) + "px";

// GOOD: read → read → write → write (one reflow)
const w = box.offsetWidth;
const h = box.offsetHeight;
box.style.width = (w + 10) + "px";
box.style.height = (h + 10) + "px";
```

---

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Does this change trigger layout? | Width, height, margin, padding, font-size, top, left → yes (reflow). |
| Does it trigger paint? | Color, background, shadow, outline → yes (repaint). |
| Is it GPU-accelerated? | Transform, opacity → yes (composite only). |
| How to check in DevTools? | Performance tab → record → see Layout, Paint, Composite events. |
## Next Steps

[Back to Chapter 26](26-rendering-pipeline.md): Rendering Pipeline
[Proceed to Chapter 28](28-requestanimationframe.md): requestAnimationFrame to learn about requestanimationframe.
