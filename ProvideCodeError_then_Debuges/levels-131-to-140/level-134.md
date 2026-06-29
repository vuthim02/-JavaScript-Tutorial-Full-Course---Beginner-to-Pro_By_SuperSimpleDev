# Level 134 - Class-based UI component system

## Error Snippets

### Error 1: Component class without render method
**Description:** Every UI component must implement a render method.
```javascript
class Button {
  constructor(text) {
    this.text = text;
  }
}
const btn = new Button("Click");
btn.render();
```

### Error 2: Forgetting to call parent constructor
**Description:** Subclass constructor must call super() before using this.
```javascript
class Component {
  constructor(el) {
    this.el = el;
  }
}
class Button extends Component {
  constructor(text) {
    this.text = text;
    this.el = document.createElement("button");
  }
}
```

### Error 3: Direct DOM manipulation without append
**Description:** Append the created element to the document body.
```javascript
class Panel {
  render() {
    const div = document.createElement("div");
    div.textContent = "Panel";
  }
}
const p = new Panel();
p.render();
```

### Error 4: InnerHTML XSS vulnerability
**Description:** Sanitize user input before using innerHTML.
```javascript
class Message {
  render(text) {
    const div = document.createElement("div");
    div.innerHTML = text;
    return div;
  }
}
const msg = new Message();
msg.render("<script>alert('xss')</script>");
```

### Error 5: Event listener memory leak
**Description:** Remove event listeners when component is destroyed.
```javascript
class Modal {
  constructor() {
    this.el = document.createElement("div");
    window.addEventListener("resize", this.handleResize);
  }
  destroy() {
    this.el.remove();
  }
}
```

### Error 6: Missing bind for event handler this
**Description:** Bind this in event handler to maintain context.
```javascript
class Toggle {
  constructor() {
    this.active = false;
    this.btn = document.createElement("button");
    this.btn.addEventListener("click", this.handleClick);
  }
  handleClick() {
    this.active = !this.active;
  }
}
```

### Error 7: Component state mutation direct
**Description:** Update state through a setState method instead of direct mutation.
```javascript
class Counter {
  constructor() {
    this.state = { count: 0 };
  }
  increment() {
    this.state.count++;
  }
}
```

### Error 8: Not returning element from render
**Description:** Component render must return the element.
```javascript
class Header {
  render() {
    const h1 = document.createElement("h1");
    h1.textContent = "Title";
  }
}
const h = new Header();
document.body.appendChild(h.render());
```

### Error 9: Query selector returns null
**Description:** Check if element exists before attaching component.
```javascript
class App {
  constructor() {
    this.root = document.querySelector("#app");
  }
  mount() {
    this.root.appendChild(this.render());
  }
}
```

### Error 10: Using innerHTML += 
**Description:** Using innerHTML += re-parses the entire DOM.
```javascript
class List {
  constructor() {
    this.el = document.querySelector("#list");
    this.el.innerHTML = "";
  }
  addItem(text) {
    this.el.innerHTML += "<li>" + text + "</li>";
  }
}
```

### Error 11: Not using createDocumentFragment
**Description:** Use document fragment for batch DOM operations.
```javascript
class Table {
  render(rows) {
    const table = document.createElement("table");
    rows.forEach(r => {
      const tr = document.createElement("tr");
      tr.textContent = r;
      table.appendChild(tr);
    });
    return table;
  }
}
```

### Error 12: Event handler not removed before re-render
**Description:** Clean up old event listeners when re-rendering.
```javascript
class Input {
  constructor() {
    this.el = document.createElement("input");
    this.el.addEventListener("input", this.onInput);
  }
  reRender() {
    this.el = document.createElement("input");
  }
}
```

### Error 13: Arrow function in render creates new fn each time
**Description:** Arrow functions in render create new functions on every call.
```javascript
class Button {
  render() {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => this.handleClick());
    return btn;
  }
}
```

### Error 14: Missing template literal for dynamic content
**Description:** Use template literals for dynamic attributes.
```javascript
class Image {
  render(src) {
    const img = document.createElement("img");
    img.setAttribute("src", src);
    return img;
  }
}
```

### Error 15: Using classList incorrectly
**Description:** Use classList.add and classList.remove properly.
```javascript
class Badge {
  constructor(type) {
    this.el = document.createElement("span");
    this.el.className = type;
  }
}
```

### Error 16: Setting textContent with HTML
**Description:** Use textContent for text, innerHTML for HTML.
```javascript
class Label {
  render(text) {
    const span = document.createElement("span");
    span.textContent = "<strong>" + text + "</strong>";
    return span;
  }
}
```

### Error 17: Forgetting to namespace CSS classes
**Description:** Use prefixed class names to avoid collisions.
```javascript
class Card {
  render() {
    const div = document.createElement("div");
    div.className = "container";
    return div;
  }
}
```

### Error 18: Component not checking if mounted
**Description:** Check if component is already mounted before mounting again.
```javascript
class Tabs {
  constructor() {
    this.mounted = false;
  }
  mount(el) {
    el.appendChild(this.render());
    this.mounted = true;
  }
  mount(el) {
    el.appendChild(this.render()); // mounts again
  }
}
```

### Error 19: Using createElement for text nodes
**Description:** Use createTextNode for plain text content.
```javascript
class Text {
  render(content) {
    const el = document.createElement("text");
    el.textContent = content;
    return el;
  }
}
```

### Error 20: Wrong data attribute syntax
**Description:** Use dataset property for data attributes.
```javascript
class Item {
  render(id) {
    const div = document.createElement("div");
    div.setAttribute("data-id", id);
    return div;
  }
}
```

### Error 21: Not preventing default on form submit
**Description:** Prevent form submission from reloading the page.
```javascript
class Form {
  constructor() {
    this.form = document.createElement("form");
    this.form.addEventListener("submit", this.onSubmit);
  }
  onSubmit(e) {
    console.log("submitted");
  }
}
```

### Error 22: Dispatching custom event incorrectly
**Description:** Use dispatchEvent with correct CustomEvent syntax.
```javascript
class Dropdown {
  constructor() {
    this.el = document.createElement("div");
  }
  open() {
    const event = new CustomEvent("open");
    this.el.dispatchEvent("open");
  }
}
```

### Error 23: Shadow DOM without attachShadow
**Description:** Use attachShadow for Shadow DOM encapsulation.
```javascript
class Widget {
  constructor() {
    this.el = document.createElement("div");
    this.el.shadowRoot.innerHTML = "<style>p {color:red}</style><p>Hello</p>";
  }
}
```

### Error 24: Wrong component lifecycle order
**Description:** Lifecycle methods must be called in correct order.
```javascript
class Lifecycle {
  constructor() {
    this.init();
    this.render();
    this.mount();
  }
  init() {}
  render() {}
  mount() {}
}
```

### Error 25: setInterval not cleared
**Description:** Clear intervals in destroy method.
```javascript
class Timer {
  constructor() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  destroy() {
    // interval not cleared
  }
}
```

### Error 26: Using outerHTML to replace
**Description:** outerHTML replaces the element, losing references.
```javascript
class Badge {
  constructor() {
    this.el = document.createElement("span");
  }
  update(text) {
    this.el.outerHTML = "<span class='badge'>" + text + "</span>";
  }
}
```

### Error 27: Insert adjacent HTML wrong position
**Description:** Use correct position argument in insertAdjacentHTML.
```javascript
class List {
  constructor() {
    this.el = document.querySelector("ul");
  }
  addItem(text) {
    this.el.insertAdjacentHTML("beforebegin", "<li>" + text + "</li>");
  }
}
```

### Error 28: Removing element without removing listeners
**Description:** Remove element from DOM but event listeners remain in memory.
```javascript
class Toast {
  close() {
    this.el.remove();
  }
}
```

### Error 29: Using document.write in component
**Description:** Never use document.write in component-based architecture.
```javascript
class Legacy {
  render() {
    document.write("<p>hello</p>");
  }
}
```

### Error 30: Creating component without new keyword
**Description:** Instantiate component class using new.
```javascript
class Component {
  constructor() { this.name = "comp"; }
}
const c = Component();
```

### Error 31: Not checking element type in constructor
**Description:** Validate that the provided element exists.
```javascript
class Component {
  constructor(el) {
    this.el = el;
  }
}
const c = new Component(); // el is undefined
```

### Error 32: Fragment appendChild chain
**Description:** Creating DocumentFragment but not using it correctly.
```javascript
class List {
  render(items) {
    const frag = document.createDocumentFragment();
    items.forEach(i => frag.appendChild(document.createElement("li")));
    return frag;
  }
}
```

### Error 33: Setting style with string
**Description:** Use style property object instead of style attribute string.
```javascript
class Box {
  render() {
    const div = document.createElement("div");
    div.setAttribute("style", "color: red; font-size: 14px");
    return div;
  }
}
```

### Error 34: MutationObserver not disconnected
**Description:** Disconnect observers when component is destroyed.
```javascript
class Watcher {
  constructor(el) {
    this.observer = new MutationObserver(() => {});
    this.observer.observe(el, { childList: true });
  }
  destroy() {
    // observer not disconnected
  }
}
```

### Error 35: Using removeChild instead of remove
**Description:** Use element.remove() instead of parent.removeChild().
```javascript
class Item {
  constructor() {
    this.el = document.createElement("div");
  }
  remove() {
    this.el.parentNode.removeChild(this.el);
  }
}
```

### Error 36: Not using closest for parent finding
**Description:** Use closest() to find parent element matching selector.
```javascript
class Cell {
  constructor(el) {
    this.el = el;
  }
  getRow() {
    return this.el.parentElement.parentElement;
  }
}
```

### Error 37: Dynamic tag name not sanitized
**Description:** Sanitize tag names used with createElement.
```javascript
class Dynamic {
  render(tag) {
    const el = document.createElement(tag);
    el.textContent = "dynamic";
    return el;
  }
}
```

### Error 38: Wrong event type string
**Description:** Use correct event type names (e.g., "click" not "onclick").
```javascript
class Button {
  constructor() {
    this.el = document.createElement("button");
    this.el.addEventListener("onclick", this.handleClick);
  }
}
```

### Error 39: Not checking if element has attribute
**Description:** Use hasAttribute before reading attribute value.
```javascript
class Input {
  constructor(el) {
    if (el.getAttribute("required") === "true") {
      this.required = true;
    }
  }
}
```

### Error 40: Using appendChild for text
**Description:** Use textContent or createTextNode for text nodes.
```javascript
class Label {
  render(text) {
    const span = document.createElement("span");
    span.appendChild(text);
    return span;
  }
}
```

### Error 41: setAttribute with non-string value
**Description:** setAttribute converts values to strings.
```javascript
class Progress {
  render(value) {
    const bar = document.createElement("div");
    bar.setAttribute("data-value", value);
    return bar;
  }
}
```

### Error 42: Not using replaceWith for swapping
**Description:** Use replaceWith to swap elements cleanly.
```javascript
class Swapper {
  swap(oldEl, newEl) {
    oldEl.parentNode.insertBefore(newEl, oldEl);
    oldEl.parentNode.removeChild(oldEl);
  }
}
```

### Error 43: Touch event passive listener
**Description:** Set passive: true for scroll/touch listeners.
```javascript
class Scrollable {
  constructor(el) {
    el.addEventListener("touchmove", this.onTouch);
  }
}
```

### Error 44: Wrong aria attribute setter
**Description:** Use setAttribute for ARIA attributes.
```javascript
class Accessible {
  constructor(el) {
    el.ariaLabel = "Close";
  }
}
```

### Error 45: Not using template element
**Description:** Use <template> for reusable HTML fragments.
```javascript
class Card {
  render() {
    const div = document.createElement("div");
    div.innerHTML = "<h2>Title</h2><p>Content</p>";
    return div.cloneNode(true);
  }
}
```

### Error 46: Focus management ignored
**Description:** Manage focus when showing/hiding components.
```javascript
class Modal {
  open() {
    this.el.style.display = "block";
  }
  close() {
    this.el.style.display = "none";
  }
}
```

### Error 47: Scroll position not preserved
**Description:** Preserve scroll position when re-rendering.
```javascript
class Feed {
  reRender(items) {
    window.scrollY = 0;
    this.el.innerHTML = "";
    items.forEach(i => this.el.appendChild(i));
  }
}
```

### Error 48: Not checking for text overflow
**Description:** Check and handle text overflow in components.
```javascript
class Cell {
  render(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div;
  }
}
```

### Error 49: Window resize handler not debounced
**Description:** Debounce resize event handlers for performance.
```javascript
class Layout {
  constructor() {
    window.addEventListener("resize", this.onResize);
  }
  onResize() {
    // complex layout calculation
  }
}
```

### Error 50: Using getComputedStyle on detached element
**Description:** Element must be in DOM for getComputedStyle to work.
```javascript
class StyleReader {
  getDimensions() {
    const div = document.createElement("div");
    return getComputedStyle(div).width;
  }
}
```

### Error 51: className overwriting existing classes
**Description:** Use classList.add instead of className assignment.
```javascript
class Button {
  render() {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.className = "btn-large";
    return btn;
  }
}
```

### Error 52: Not using requestAnimationFrame for animations
**Description:** Use rAF for smooth animations instead of setTimeout.
```javascript
class Animator {
  fadeIn(el) {
    let opacity = 0;
    const interval = setInterval(() => {
      opacity += 0.1;
      el.style.opacity = opacity;
      if (opacity >= 1) clearInterval(interval);
    }, 50);
  }
}
```

### Error 53: IntersectionObserver not disconnected
**Description:** Disconnect IntersectionObserver on destroy.
```javascript
class LazyImage {
  constructor(el) {
    this.observer = new IntersectionObserver(() => {});
    this.observer.observe(el);
  }
}
```

### Error 54: ResizeObserver not disconnected
**Description:** Disconnect ResizeObserver in cleanup.
```javascript
class Resizable {
  constructor(el) {
    this.observer = new ResizeObserver(() => {});
    this.observer.observe(el);
  }
}
```

### Error 55: Not preventing event bubbling
**Description:** Stop event propagation when appropriate.
```javascript
class MenuItem {
  constructor(el) {
    el.addEventListener("click", this.onClick);
  }
  onClick(e) {
    console.log("item clicked");
  }
}
```

### Error 56: insertBefore with null reference
**Description:** insertBefore requires a valid reference node.
```javascript
class List {
  insert(item) {
    const first = this.el.firstChild;
    this.el.insertBefore(item, first);
  }
}
```

### Error 57: Not using matches for event delegation
**Description:** Use matches() in event delegation to filter elements.
```javascript
class Table {
  constructor(el) {
    el.addEventListener("click", this.onCellClick);
  }
  onCellClick(e) {
    console.log(e.target); // might not be a cell
  }
}
```

### Error 58: Wrong this in event delegation
**Description:** Maintain correct this context in event delegation.
```javascript
class Dropdown {
  constructor() {
    this.open = false;
    document.addEventListener("click", function() {
      this.open = false;
    });
  }
}
```

### Error 59: Not using once option for one-time listeners
**Description:** Use { once: true } for one-time event listeners.
```javascript
class Splash {
  constructor() {
    this.el = document.createElement("div");
    this.el.addEventListener("click", this.dismiss);
  }
  dismiss() {
    this.remove();
  }
}
```

### Error 60: Forgetting to call super in lifecycle
**Description:** Subclass lifecycle must call parent lifecycle.
```javascript
class BaseComponent {
  init() { console.log("base init"); }
}
class Dialog extends BaseComponent {
  init() { console.log("dialog init"); }
}
```

### Error 61: cloneNode with deep false
**Description:** Use deep: true to clone children.
```javascript
class Template {
  render() {
    const template = document.querySelector("#card");
    return template.content.cloneNode(false);
  }
}
```

### Error 62: Not handling disabled state
**Description:** Add disabled attribute handling to components.
```javascript
class Button {
  constructor() {
    this.el = document.createElement("button");
  }
  disable() {
    // should set disabled attribute
  }
}
```

### Error 63: Tab index not managed
**Description:** Manage tabindex for keyboard navigation.
```javascript
class NavBar {
  render() {
    const nav = document.createElement("nav");
    // items need tabindex
    return nav;
  }
}
```

### Error 64: Title attribute not set for accessibility
**Description:** Set title attribute for accessibility.
```javascript
class Icon {
  render(name) {
    const span = document.createElement("span");
    span.textContent = name;
    return span;
  }
}
```

### Error 65: Not using role attribute
**Description:** Add ARIA role to semantic components.
```javascript
class TabPanel {
  render() {
    const div = document.createElement("div");
    // missing role="tabpanel"
    return div;
  }
}
```

### Error 66: Empty alt text on images
**Description:** Set alt attribute on image elements.
```javascript
class Avatar {
  render(src) {
    const img = document.createElement("img");
    img.src = src;
    return img;
  }
}
```

### Error 67: Not handling loading state
**Description:** Show loading spinner while content loads.
```javascript
class DataTable {
  async load() {
    const data = await fetch("/api/data");
    this.render(data);
  }
}
```

### Error 68: Error boundary not implemented
**Description:** Catch render errors to prevent whole app crash.
```javascript
class App {
  render() {
    // if this throws, app crashes
    return this.currentView.render();
  }
}
```

### Error 69: Using querySelectorAll without length check
**Description:** Check length before iterating NodeList.
```javascript
class Tabs {
  constructor() {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(t => this.setupTab(t));
  }
}
```

### Error 70: Not using isConnected check
**Description:** Check if element is still in DOM before operating.
```javascript
class Updater {
  tick() {
    this.el.textContent = Date.now();
  }
}
```

## Issue Snippets

### Issue 1: Too many DOM queries in constructor
**Description:** Query DOM once and cache references.
```javascript
class Panel {
  constructor() {
    this.header = document.querySelector("#header");
    this.body = document.querySelector("#body");
    this.footer = document.querySelector("#footer");
  }
}
```

### Issue 2: Long inline styles in JavaScript
**Description:** Use CSS classes instead of inline styles.
```javascript
class Banner {
  render() {
    const div = document.createElement("div");
    div.style.backgroundColor = "#007bff";
    div.style.color = "#ffffff";
    div.style.padding = "10px";
    div.style.borderRadius = "4px";
    div.style.fontSize = "16px";
    return div;
  }
}
```

### Issue 3: No separation of concerns
**Description:** Component handles data fetching and rendering.
```javascript
class UserCard {
  async render(userId) {
    const data = await fetch("/api/users/" + userId);
    const user = await data.json();
    const div = document.createElement("div");
    div.textContent = user.name;
    return div;
  }
}
```

### Issue 4: Creating elements in a tight loop
**Description:** Batch DOM operations with DocumentFragment.
```javascript
function createList(items) {
  const ul = document.querySelector("ul");
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}
```

### Issue 5: Component state stored in DOM
**Description:** Store state in component instance, not in DOM.
```javascript
class Toggle {
  constructor(el) {
    this.el = el;
    el.addEventListener("click", () => {
      if (el.dataset.active === "true") {
        el.dataset.active = "false";
      } else {
        el.dataset.active = "true";
      }
    });
  }
}
```

### Issue 6: Hardcoded selectors throughout
**Description:** Use configurable selectors instead of hardcoded strings.
```javascript
class Modal {
  open() {
    document.querySelector(".modal-overlay").style.display = "block";
    document.querySelector(".modal-content").style.display = "block";
  }
}
```

### Issue 7: Not using event delegation
**Description:** Add listener to each child instead of parent.
```javascript
class List {
  constructor() {
    this.items = document.querySelectorAll("li");
    this.items.forEach(item => {
      item.addEventListener("click", () => this.onItemClick(item));
    });
  }
}
```

### Issue 8: Constructor does too much work
**Description:** Constructor should only initialize, not render.
```javascript
class HeavyComponent {
  constructor() {
    this.init();
    this.fetchData();
    this.render();
    this.attachEvents();
    this.startPolling();
  }
}
```

### Issue 9: Not handling empty state
**Description:** Component shows nothing when data is empty.
```javascript
class Feed {
  render(items) {
    items.forEach(item => {
      this.el.appendChild(this.renderItem(item));
    });
  }
}
```

### Issue 10: Direct children manipulation in parent
**Description:** Parent component accesses child element internals.
```javascript
class Tabs {
  render() {
    this.tab1 = new Tab("One");
    this.tab2 = new Tab("Two");
    this.el.appendChild(this.tab1.el);
    this.el.appendChild(this.tab2.el);
  }
}
```

### Issue 11: Component assumes element IDs are unique
**Description:** Using IDs in reusable components causes duplicates.
```javascript
class Accordion {
  render() {
    const div = document.createElement("div");
    div.id = "accordion";
    return div;
  }
}
```

### Issue 12: Not using data binding
**Description:** Manual DOM updates instead of binding to state.
```javascript
class Profile {
  setUser(user) {
    this.nameEl.textContent = user.name;
    this.emailEl.textContent = user.email;
    this.avatarEl.src = user.avatar;
  }
}
```

### Issue 13: No loading indicator for async
**Description:** No visual feedback during data fetching.
```javascript
class AsyncList {
  async load() {
    const data = await fetch("/api/items");
    this.render(await data.json());
  }
}
```

### Issue 14: Component not removable
**Description:** No destroy/cleanup method on component.
```javascript
class Toast {
  constructor(msg) {
    this.el = document.createElement("div");
    this.el.textContent = msg;
    document.body.appendChild(this.el);
  }
}
```

### Issue 15: Inconsistent rendering methods
**Description:** Some components use render(), others use build(), create().
```javascript
class Button { render() {} }
class Card { build() {} }
class List { create() {} }
```

### Issue 16: No validation for required props
**Description:** Component does not validate required constructor parameters.
```javascript
class Image {
  constructor(src) {
    this.img = document.createElement("img");
    this.img.src = src;
  }
}
```

### Issue 17: Using innerHTML for user content
**Description:** XSS risk when setting innerHTML with user content.
```javascript
class Comment {
  render(text) {
    const div = document.createElement("div");
    div.innerHTML = text;
    return div;
  }
}
```

### Issue 18: Not using CSS custom properties
**Description:** Hardcoded colors instead of CSS variables.
```javascript
class Badge {
  render() {
    const span = document.createElement("span");
    span.style.backgroundColor = "#e74c3c";
    return span;
  }
}
```

### Issue 19: Class names too generic
**Description:** Generic class names like "container" cause conflicts.
```javascript
class Wrapper {
  render() {
    const div = document.createElement("div");
    div.className = "wrapper";
    return div;
  }
}
```

### Issue 20: MutationObserver memory leak
**Description:** Observer keeps reference to DOM even after component destroyed.
```javascript
class Tracker {
  constructor(el) {
    new MutationObserver(() => {}).observe(el, { attributes: true });
  }
}
```

### Issue 21: No error state in components
**Description:** Components do not handle error states.
```javascript
class UserProfile {
  async load(id) {
    try {
      const res = await fetch("/api/user/" + id);
      this.render(await res.json());
    } catch (e) {
      // no error handling
    }
  }
}
```

### Issue 22: Too many event listeners
**Description:** Creating event listeners in render creates duplicates.
```javascript
class Button {
  render() {
    const btn = document.createElement("button");
    btn.addEventListener("click", this.onClick);
    btn.addEventListener("mouseenter", this.onHover);
    btn.addEventListener("mouseleave", this.onLeave);
    btn.addEventListener("focus", this.onFocus);
    btn.addEventListener("blur", this.onBlur);
    return btn;
  }
}
```

### Issue 23: Using global event bus
**Description:** Tight coupling through global events instead of props/callbacks.
```javascript
class Cart {
  addItem(item) {
    window.dispatchEvent(new CustomEvent("cart:add", { detail: item }));
  }
}
```

### Issue 24: No default props pattern
**Description:** Missing default values for optional props.
```javascript
class Alert {
  constructor(message, type) {
    this.el = document.createElement("div");
    this.el.className = "alert alert-" + type;
    this.el.textContent = message;
  }
}
```

### Issue 25: Fixed sizing instead of responsive
**Description:** Fixed pixel values instead of relative units.
```javascript
class Container {
  render() {
    const div = document.createElement("div");
    div.style.width = "960px";
    return div;
  }
}
```

### Issue 26: Not using closest for nested components
**Description:** Traversing parent chain manually instead of closest.
```javascript
function findRow(el) {
  while (el && !el.classList.contains("row")) {
    el = el.parentElement;
  }
  return el;
}
```

### Issue 27: No keyboard support
**Description:** Components not accessible via keyboard.
```javascript
class Menu {
  constructor() {
    this.el = document.createElement("div");
    this.el.addEventListener("click", this.onClick);
  }
}
```

### Issue 28: Using visibility hidden instead of display
**Description:** visibility hidden still occupies space.
```javascript
class Spacer {
  hide() {
    this.el.style.visibility = "hidden";
  }
}
```

### Issue 29: Tight parent-child coupling
**Description:** Child component accesses parent directly.
```javascript
class Tab {
  activate() {
    this.parent.deactivateAll();
    this.active = true;
  }
}
```

### Issue 30: Not using slot/content projection
**Description:** Hardcoded child content instead of flexible slots.
```javascript
class Card {
  render() {
    const div = document.createElement("div");
    div.innerHTML = "<h2>Fixed Title</h2><p>Fixed Content</p>";
    return div;
  }
}
```

## Modify Snippets

### Modify 1: Create a basic Button component class
**Description:** Create a Button class with render() that returns a button element.
```javascript
// Create Button class with render method
```

### Modify 2: Add click handler to Button
**Description:** Add an onClick callback to the Button component.
```javascript
class Button {
  constructor(text, onClick) {
    // Store text and onClick
  }
  render() {
    // Create button with event listener
  }
}
```

### Modify 3: Create a component with mount method
**Description:** Add a mount(target) method that appends render() to target.
```javascript
class Component {
  render() { return document.createElement("div"); }
  // Add mount method
}
```

### Modify 4: Add destroyed lifecycle
**Description:** Add a destroy() method that removes listeners and elements.
```javascript
class Modal {
  constructor() {
    this.el = document.createElement("div");
    this.el.addEventListener("click", this.close);
  }
  // Add destroy method
}
```

### Modify 5: Create a Header component
**Description:** Create a Header component that renders an h1 with given text.
```javascript
// Create Header component
```

### Modify 6: Add CSS class to component
**Description:** Add class name "btn-primary" to the Button element.
```javascript
class Button {
  render() {
    const btn = document.createElement("button");
    // Add class "btn-primary"
    return btn;
  }
}
```

### Modify 7: Create a List component with items
**Description:** Create a List component that renders an ul with li items from array.
```javascript
// Create List component
```

### Modify 8: Add state management to Counter
**Description:** Add setState and getState to a Counter component.
```javascript
class Counter {
  constructor() {
    this.state = { count: 0 };
  }
  // Add setState and getState
}
```

### Modify 9: Create a TextInput component
**Description:** Create an input component with value getter.
```javascript
// Create TextInput with get value()
```

### Modify 10: Add disabled state to Button
**Description:** Add enable()/disable() methods to Button.
```javascript
class Button {
  constructor(text) {
    this.el = document.createElement("button");
  }
  // Add enable and disable methods
}
```

### Modify 11: Create a Card component
**Description:** Create Card with title and content sections.
```javascript
// Create Card component
```

### Modify 12: Add event delegation to List
**Description:** Attach single click listener to list instead of per item.
```javascript
class List {
  constructor() {
    this.el = document.createElement("ul");
  }
  // Add event delegation
}
```

### Modify 13: Create a Tabs component
**Description:** Create Tabs component with tab switching.
```javascript
// Create Tabs component
```

### Modify 14: Add loading state to component
**Description:** Add a showLoading() method that shows a spinner.
```javascript
class DataComponent {
  // Add loading state
}
```

### Modify 15: Create a Modal component
**Description:** Create Modal with open() and close() methods.
```javascript
// Create Modal component
```

### Modify 16: Create a ProgressBar component
**Description:** Create ProgressBar with setProgress(value) method.
```javascript
// Create ProgressBar component
```

### Modify 17: Add data attribute to component
**Description:** Add data-id attribute to rendered element.
```javascript
class Item {
  render(id) {
    const div = document.createElement("div");
    // Add data-id attribute
    return div;
  }
}
```

### Modify 18: Create a Tooltip component
**Description:** Create Tooltip that shows text on hover.
```javascript
// Create Tooltip component
```

### Modify 19: Add destroy to Timer component
**Description:** Ensure Timer clears interval in destroy.
```javascript
class Timer {
  constructor() {
    this.id = setInterval(() => this.tick(), 1000);
  }
  // Add destroy that clears interval
}
```

### Modify 20: Create a Badge component
**Description:** Create Badge that shows a count number.
```javascript
// Create Badge component
```

### Modify 21: Create a Dropdown component
**Description:** Create Dropdown with toggle open/close.
```javascript
// Create Dropdown component
```

### Modify 22: Add aria-label for accessibility
**Description:** Add aria-label attribute to Button.
```javascript
class Button {
  render() {
    const btn = document.createElement("button");
    // Add aria-label
    return btn;
  }
}
```

### Modify 23: Create a Breadcrumb component
**Description:** Create breadcrumb navigation from path array.
```javascript
// Create Breadcrumb component
```

### Modify 24: Create a Pagination component
**Description:** Create Pagination with page numbers.
```javascript
// Create Pagination component
```

### Modify 25: Add error boundary component
**Description:** Create ErrorBoundary that catches render errors.
```javascript
// Create ErrorBoundary component
```

### Modify 26: Create a Spinner component
**Description:** Create CSS-based loading spinner component.
```javascript
// Create Spinner component
```

### Modify 27: Create an Avatar component
**Description:** Create Avatar with image and fallback initials.
```javascript
// Create Avatar component
```

### Modify 28: Create an Accordion component
**Description:** Create Accordion with expandable sections.
```javascript
// Create Accordion component
```

### Modify 29: Add reactive rendering
**Description:** Auto re-render when state changes via proxy or setState.
```javascript
class ReactiveComponent {
  constructor() {
    this.state = {};
  }
  // Implement reactive rendering
}
```

### Modify 30: Create a Table component
**Description:** Create Table from array of objects with headers.
```javascript
// Create Table component
```

### Modify 31: Create a Chip component
**Description:** Create Chip with remove button callback.
```javascript
// Create Chip component
```

### Modify 32: Create a RadioGroup component
**Description:** Create radio button group with onChange.
```javascript
// Create RadioGroup component
```

### Modify 33: Create a Checkbox component
**Description:** Create Checkbox with checked state.
```javascript
// Create Checkbox component
```

### Modify 34: Create a ToggleSwitch component
**Description:** Create toggle switch with on/off state.
```javascript
// Create ToggleSwitch component
```

### Modify 35: Create a DatePicker component stub
**Description:** Create DatePicker with input that shows date.
```javascript
// Create DatePicker stub
```

### Modify 36: Create a TagInput component
**Description:** Create input that adds tags on Enter.
```javascript
// Create TagInput component
```

### Modify 37: Create a Toast notification component
**Description:** Create Toast that auto-dismisses after 3 seconds.
```javascript
// Create Toast component
```

### Modify 38: Create a Rating component
**Description:** Create star rating component with click handler.
```javascript
// Create Rating component
```

### Modify 39: Create a Stepper component
**Description:** Create step progress indicator.
```javascript
// Create Stepper component
```

### Modify 40: Create a SplitPane component
**Description:** Create horizontal split pane with two panels.
```javascript
// Create SplitPane component
```

### Modify 41: Create a VirtualList stub
**Description:** Create VirtualList concept that only renders visible items.
```javascript
// Create VirtualList stub
```

### Modify 42: Create a ResizablePanel component
**Description:** Create panel with drag-to-resize handle.
```javascript
// Create ResizablePanel component
```

### Modify 43: Create a ColorPicker component
**Description:** Create color picker with preset colors.
```javascript
// Create ColorPicker component
```

### Modify 44: Create a Slider component
**Description:** Create range slider with min, max, value.
```javascript
// Create Slider component
```

### Modify 45: Create a Snackbar component
**Description:** Create snackbar with action button.
```javascript
// Create Snackbar component
```

### Modify 46: Create a TreeView component
**Description:** Create collapsible tree from nested data.
```javascript
// Create TreeView component
```

### Modify 47: Create a CodeBlock component
**Description:** Create code block with copy button.
```javascript
// Create CodeBlock component
```

### Modify 48: Create a Skeleton loader component
**Description:** Create skeleton placeholder for loading content.
```javascript
// Create Skeleton component
```

### Modify 49: Create a Carousel component
**Description:** Create image carousel with prev/next buttons.
```javascript
// Create Carousel component
```

### Modify 50: Create an Overlay component
**Description:** Create full-screen overlay with close on backdrop click.
```javascript
// Create Overlay component
```
