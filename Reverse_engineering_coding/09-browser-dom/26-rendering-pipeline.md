# Rendering Pipeline

## The Critical Rendering Path

The browser performs these steps for every frame:

```
1. DOM Construction
   HTML → Tokens → Nodes → DOM Tree
   
2. CSSOM Construction
   CSS → Tokens → Nodes → CSSOM Tree
   
3. Render Tree
   DOM + CSSOM → visible nodes with computed styles
   
4. Layout (Reflow)
   Calculate position and size for each node
   
5. Paint
   Fill pixels (colors, images, shadows, text)
   
6. Composite
   Stack painted layers together
```

---

## Step 1: DOM Construction

```
Bytes → Characters → Tokens → Nodes → DOM Tree

<html>
  <body>
    <h1>Hello</h1>
    <p>World</p>
  </body>
</html>
```

The browser parser builds the DOM **incrementally** — it can start building before the full HTML is downloaded.

---

## Step 2: CSSOM Construction

CSS is **render-blocking**: the browser waits for CSS before rendering.

```
body { font-size: 16px; }
h1 { color: blue; }
p { margin: 10px; }
```

---

## Step 3: Render Tree

The render tree contains only **visible** nodes:

```
html, body, h1, p   ← included
<head>, <script>    ← not rendered (no box)
display: none       ← not in render tree
visibility: hidden  ← IN render tree (occupies space, just invisible)
```

---

## Step 4: Layout (Reflow)

Calculate geometry:

```
body: x=0, y=0, width=800, height=600
h1:   x=8, y=8, width=784, height=32
p:    x=8, y=48, width=784, height=20
```

**Expensive** — affects all descendants.

---

## Step 5: Paint

Fill pixels:

```
Fill body with white background
Fill h1 with blue text
Fill p with black text
Draw borders, shadows, images
```

---

## Step 6: Composite

If the page has layers (transform, opacity, will-change, iframe, video):

```
Layer 1: Background
Layer 2: Fixed header
Layer 3: Scrolling content
     ↓
Composite: stack layers together
```
## Next Steps

[Back to Chapter 25](25-fetch-api.md): Fetch API
[Proceed to Chapter 27](27-reflow-vs-repaint.md): Reflow vs Repaint to learn about reflow vs repaint.
