# Web Components

## Custom, Reusable HTML Elements

Web Components allow creating custom HTML elements with encapsulated style and behavior.

Three technologies:
```
1. Custom Elements  — Define new HTML tags
2. Shadow DOM       — Encapsulated DOM and CSS
3. HTML Templates   — Reusable markup fragments
```

## Custom Elements

```javascript
class MyButton extends HTMLElement {
    constructor() {
        super();
        this.addEventListener("click", () => {
            alert("Custom button clicked!");
        });
    }

    // Called when element is added to DOM
    connectedCallback() {
        this.textContent = "Custom Button";
    }

    // Called when element is removed from DOM
    disconnectedCallback() {
        console.log("Element removed");
    }

    // Called when observed attributes change
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} changed: ${oldValue} → ${newValue}`);
    }

    // Specify which attributes to observe
    static get observedAttributes() {
        return ["disabled", "label"];
    }
}

customElements.define("my-button", MyButton);
```

```html
<my-button disabled></my-button>
```

## Shadow DOM (Style Encapsulation)

```javascript
class Tooltip extends HTMLElement {
    constructor() {
        super();
        // Attach shadow root (encapsulated from main DOM)
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .tooltip {
                    background: #333;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                }
            </style>
            <span class="tooltip">${this.getAttribute("text") || "Tooltip"}</span>
        `;
    }
}

customElements.define("my-tooltip", Tooltip);
```

```html
<my-tooltip text="Hello World"></my-tooltip>
```

## HTML Templates

```html
<template id="card-template">
    <style>
        .card {
            border: 1px solid #ddd;
            padding: 16px;
            border-radius: 8px;
        }
        .title { font-weight: bold; }
    </style>
    <div class="card">
        <div class="title"><slot name="title">Default Title</slot></div>
        <div class="content"><slot name="content">Default content</slot></div>
    </div>
</template>
```

```javascript
class MyCard extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById("card-template");
        const content = template.content.cloneNode(true);
        this.attachShadow({ mode: "open" }).appendChild(content);
    }
}

customElements.define("my-card", MyCard);
```

```html
<my-card>
    <span slot="title">My Card Title</span>
    <p slot="content">This is the card content</p>
</my-card>
```

## Lifecycle Methods

| Method | When It Runs |
|--------|-------------|
| `constructor()` | Element is created (before DOM attachment) |
| `connectedCallback()` | Element is added to the DOM |
| `disconnectedCallback()` | Element is removed from the DOM |
| `attributeChangedCallback(name, old, new)` | Observed attribute changes |
| `adoptedCallback()` | Element is moved to a new document |

## Benefits vs Frameworks

```
Pros:
  - Native browser support (no framework needed)
  - Framework-agnostic (works with React, Vue, Angular, or vanilla)
  - Encapsulated styles (no CSS leaks)
  - Reusable across projects

Cons:
  - More verbose than framework components
  - No built-in reactivity (must implement yourself)
  - Smaller ecosystem than React/Vue components
  - SSR support varies
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is this a Web Component? | Check for `customElements.define()`, `attachShadow()`. |
| Where is it defined? | Search for the custom tag name (e.g., `my-button`) in JavaScript. |
| Is Shadow DOM used? | Check if the component uses `attachShadow()`. Styles may be scoped. |
| What attributes does it accept? | Check `observedAttributes` getter. |
| What's the component's structure? | Inspect the `shadowRoot` in DevTools Elements panel. |
## Next Steps

[Back to Chapter 38](38-canvas.md): Canvas API
[Proceed to Chapter 40](40-cors.md): CORS (Cross-Origin Resource Sharing) to learn about cors (cross-origin resource sharing).
