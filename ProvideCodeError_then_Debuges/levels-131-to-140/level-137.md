# Level 137 - MVC pattern implementation (model-view-controller)

## Error Snippets

### Error 1: Model directly updating the view
**Description:** Model should not have a reference to the view.
```javascript
class Model {
  constructor() {
    this.data = [];
    this.view = new View();
  }
  add(item) {
    this.data.push(item);
    this.view.render(this.data);
  }
}
```

### Error 2: View directly modifying the model
**Description:** View should emit events, not change model directly.
```javascript
class View {
  constructor() {
    this.input = document.querySelector("input");
    this.input.addEventListener("input", e => {
      model.data = e.target.value;
    });
  }
}
```

### Error 3: Controller not separating concerns
**Description:** Controller should not handle DOM manipulation.
```javascript
class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.view.button.addEventListener("click", () => {
      document.querySelector(".result").textContent = this.model.getData();
    });
  }
}
```

### Error 4: Model exposes internal data directly
**Description:** Model should provide getter/setter, not direct property access.
```javascript
class Model {
  constructor() {
    this.items = [];
  }
}
// Controller accesses model.items directly
```

### Error 5: View stores state that belongs to model
**Description:** State like currentPage should be in the model.
```javascript
class View {
  constructor() {
    this.currentPage = 1;
  }
  render(items) {
    this.items = items;
  }
}
```

### Error 6: Controller not initializing properly
**Description:** Controller must initialize view and model.
```javascript
class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
  }
  // no init() call
}
```

### Error 7: Model with no notification system
**Description:** Model changes should notify controller or view.
```javascript
class Model {
  constructor() {
    this.data = [];
  }
  add(item) {
    this.data.push(item);
    // No notification to controller/view
  }
}
```

### Error 8: View listening to DOM instead of controller
**Description:** View should emit events to controller, not handle logic.
```javascript
class View {
  constructor() {
    this.btn = document.querySelector("#btn");
    this.btn.addEventListener("click", () => {
      // Direct logic instead of notifying controller
      const result = 2 + 2;
      this.display.textContent = result;
    });
  }
}
```

### Error 9: Tight coupling between MVC components
**Description:** Components know about each other's internals.
```javascript
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view._secretCallback = () => {}; // accessing private
  }
}
```

### Error 10: Controller method returns data
**Description:** Controller should coordinate, not return data from model.
```javascript
class Controller {
  getItem(id) {
    return this.model.getItem(id); // bypassing view
  }
}
```

### Error 11: Model as plain object
**Description:** Model should be a class with methods, not a plain object.
```javascript
const model = {
  data: [],
  add(item) { this.data.push(item); }
};
```

### Error 12: View constructor does DOM queries repeatedly
**Description:** Cache DOM queries in constructor.
```javascript
class View {
  getInput() {
    return document.querySelector("#input").value;
  }
  getResult() {
    return document.querySelector("#result");
  }
}
```

### Error 13: No separation of render and update
**Description:** render() called on every small change instead of targeted update.
```javascript
class View {
  render(items) {
    this.list.innerHTML = "";
    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      this.list.appendChild(li);
    });
  }
  // addItem should just append one li
}
```

### Error 14: Model with UI logic
**Description:** Model contains formatting or display logic.
```javascript
class Model {
  formatPrice(price) {
    return "$" + price.toFixed(2);
  }
}
```

### Error 15: Controller too large
**Description:** Controller handles too many responsibilities.
```javascript
class Controller {
  constructor() {
    this.init();
    this.bindEvents();
    this.fetchData();
    this.setupPagination();
    this.configureRouting();
    this.handleAuth();
  }
}
```

### Error 16: View template logic duplicated
**Description:** HTML template strings repeated in multiple view methods.
```javascript
class View {
  renderItem(item) {
    return "<li class='item'>" + item.name + "</li>";
  }
  renderSelected(item) {
    return "<li class='item selected'>" + item.name + "</li>";
  }
}
```

### Error 17: Not using event delegation in view
**Description:** Event listeners on each child instead of container.
```javascript
class View {
  render(users) {
    this.list.innerHTML = "";
    users.forEach(u => {
      const div = document.createElement("div");
      div.addEventListener("click", () => this.onUserClick(u));
      this.list.appendChild(div);
    });
  }
}
```

### Error 18: Controller directly calls view render with model data
**Description:** Controller should pass data through proper channels.
```javascript
class Controller {
  onSearch(query) {
    const results = this.model.search(query);
    this.view.results.innerHTML = results.map(r => "<div>" + r + "</div>").join("");
  }
}
```

### Error 19: View exposes DOM element references
**Description:** View should not expose internal elements to controller.
```javascript
class View {
  constructor() {
    this.input = document.querySelector("#input");
    this.submitBtn = document.querySelector("#submit");
    this.resultsContainer = document.querySelector("#results");
  }
}
```

### Error 20: Model holds view callback references
**Description:** Model stores callbacks that create tight coupling.
```javascript
class Model {
  constructor() {
    this.onChange = null;
  }
  set onChange(cb) { this._cb = cb; }
  add(item) {
    this.data.push(item);
    if (this._cb) this._cb(this.data);
  }
}
```

### Error 21: Controller handles HTTP requests directly
**Description:** HTTP requests should be in a separate service layer.
```javascript
class Controller {
  async loadUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    this.model.setUsers(data);
  }
}
```

### Error 22: View logic for formatting dates
**Description:** Formatting should be in a helper/formatter, not in view.
```javascript
class View {
  renderDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { weekday: "long" });
  }
}
```

### Error 23: Model duplicates data from API
**Description:** Model stores API response without transformation.
```javascript
class UserModel {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this.company = data.company;
    this.website = data.website;
  }
}
```

### Error 24: View re-renders entire component on change
**Description:** Inefficient re-rendering instead of targeted DOM updates.
```javascript
class View {
  updateCount(count) {
    this.el.innerHTML = "<span>" + count + "</span>"; // re-parses HTML
  }
}
```

### Error 25: Controller watching model via polling
**Description:** Controller polls model for changes instead of event-based.
```javascript
class Controller {
  start() {
    setInterval(() => {
      if (this.model.hasChanged()) {
        this.view.render(this.model.getData());
      }
    }, 100);
  }
}
```

### Error 26: Model with static data
**Description:** Model data should be instance-based, not static.
```javascript
class Model {
  static data = [];
  static add(item) { this.data.push(item); }
}
```

### Error 27: No observable pattern for model changes
**Description:** Model changes not observed by controller.
```javascript
class Model {
  setData(data) { this.data = data; }
}
class Controller {
  updateModel(data) {
    this.model.setData(data);
    this.view.render(data); // manually synced
  }
}
```

### Error 28: View creates elements but doesnt cache
**Description:** Creating same elements repeatedly instead of caching.
```javascript
class View {
  showLoading() {
    const spinner = document.createElement("div");
    spinner.className = "spinner";
    this.container.appendChild(spinner);
  }
  hideLoading() {
    const spinner = this.container.querySelector(".spinner");
    if (spinner) spinner.remove();
  }
}
```

### Error 29: Multiple controllers conflict
**Description:** Multiple controllers manipulating same view.
```javascript
class UserController { constructor() { /* binds to search btn */ } }
class SearchController { constructor() { /* also binds to search btn */ } }
```

### Error 30: View uses innerHTML with user data
**Description:** XSS vulnerability in view rendering.
```javascript
class View {
  renderComment(text) {
    this.el.innerHTML = "<p>" + text + "</p>";
  }
}
```

### Error 31: Model stores derived data
**Description:** Model stores values that can be computed from other values.
```javascript
class CartModel {
  constructor() {
    this.items = [];
    this.total = 0;
    this.count = 0;
  }
  add(item) {
    this.items.push(item);
    this.total = this.items.reduce((s, i) => s + i.price, 0);
    this.count = this.items.length;
  }
}
```

### Error 32: Controller tight to specific view implementation
**Description:** Controller depends on view method names that may change.
```javascript
class Controller {
  onSuccess(data) {
    this.view.showDataInTableFormat(data); // too specific
  }
}
```

### Error 33: View method does too much
**Description:** View method renders, fetches, and processes.
```javascript
class View {
  async loadAndRender() {
    const res = await fetch("/api/data");
    const data = await res.json();
    const processed = data.map(d => d.toUpperCase());
    this.container.textContent = processed.join(", ");
  }
}
```

### Error 34: Model not validating data
**Description:** Model accepts any data without validation.
```javascript
class UserModel {
  setAge(age) {
    this.age = age; // no validation
  }
}
```

### Error 35: Controller stores view state
**Description:** Controller tracks scroll position, focus state, etc.
```javascript
class Controller {
  constructor() {
    this.scrollPos = 0;
    this.focusedElement = null;
  }
}
```

### Error 36: No service layer for API calls
**Description:** API calls scattered across controller and model.
```javascript
class Model {
  async fetchUsers() { return fetch("/api/users"); }
}
class Controller {
  async loadUsers() { return fetch("/api/users"); }
}
```

### Error 37: View uses magic numbers for styling
**Description:** View hardcodes pixel values.
```javascript
class View {
  show() {
    this.el.style.top = "50px";
    this.el.style.left = "100px";
  }
}
```

### Error 38: Model and view both format data
**Description:** Formatting logic duplicated in model and view.
```javascript
class Model {
  formatName(name) { return name.toUpperCase(); }
}
class View {
  formatName(name) { return name.toUpperCase(); }
}
```

### Error 39: Controller does data transformation
**Description:** Transforming data belongs in model or service layer.
```javascript
class Controller {
  onDataLoaded(data) {
    const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
    const filtered = sorted.filter(d => d.active);
    this.view.render(filtered);
  }
}
```

### Error 40: Not using observer pattern correctly
**Description:** Implementing custom observer instead of using EventTarget.
```javascript
class Model {
  constructor() {
    this.listeners = [];
  }
  subscribe(fn) { this.listeners.push(fn); }
  notify() { this.listeners.forEach(fn => fn()); }
}
```

### Error 41: View mixes template and logic
**Description:** Complex JavaScript logic inside template strings.
```javascript
class View {
  render(users) {
    return users
      .filter(u => u.active)
      .sort((a, b) => a.name > b.name ? 1 : -1)
      .map(u => "<div>" + u.name + " (" + u.email + ")</div>")
      .join("");
  }
}
```

### Error 42: No loading state in view
**Description:** View does not show loading indicator.
```javascript
class View {
  render(items) {
    this.el.innerHTML = items.map(i => "<li>" + i + "</li>").join("");
  }
}
```

### Error 43: Error handling in controller only
**Description:** Error UI shown in controller instead of view.
```javascript
class Controller {
  async load() {
    try {
      const data = await this.model.fetch();
      this.view.render(data);
    } catch (e) {
      this.view.el.innerHTML = "<div>Error: " + e.message + "</div>";
    }
  }
}
```

### Error 44: Model with side effects in getter
**Description:** Getter modifies state or logs.
```javascript
class Model {
  get items() {
    console.log("items accessed");
    return this._items;
  }
}
```

### Error 45: View methods not returning this for chaining
**Description:** View methods could be chainable.
```javascript
class View {
  show() { this.el.style.display = "block"; }
  setText(t) { this.el.textContent = t; }
}
```

### Error 46: Controller not using dependency injection
**Description:** Creating dependencies inside controller constructor.
```javascript
class Controller {
  constructor() {
    this.model = new UserModel();
    this.view = new UserView();
  }
}
```

### Error 47: Model emits raw DOM events
**Description:** Model should not create or dispatch DOM events.
```javascript
class Model {
  change() {
    const event = new Event("modelChange");
    window.dispatchEvent(event);
  }
}
```

### Error 48: View accesses window or document directly
**Description:** View should receive references to external dependencies.
```javascript
class View {
  constructor() {
    this.w = window.innerWidth;
  }
}
```

### Error 49: View with hardcoded text
**Description:** All text strings should be configurable.
```javascript
class View {
  render() {
    this.el.innerHTML = "<h1>My App</h1><p>Welcome to my application</p>";
  }
}
```

### Error 50: Controller passes entire model to view
**Description:** View should receive only the data it needs.
```javascript
class Controller {
  render() {
    this.view.render(this.model);
  }
}
```

### Error 51: View HTML in JavaScript string
**Description:** Large HTML blocks in JS strings instead of templates.
```javascript
class View {
  render() {
    this.el.innerHTML = "<div class='container'><header><h1>Title</h1></header>" +
      "<main><section><p>Content</p></section></main>" +
      "<footer><p>Footer</p></footer></div>";
  }
}
```

### Error 52: Controller handling multiple models
**Description:** One controller managing multiple unrelated models.
```javascript
class Controller {
  constructor() {
    this.userModel = new UserModel();
    this.productModel = new ProductModel();
    this.orderModel = new OrderModel();
    this.cartModel = new CartModel();
  }
}
```

### Error 53: Model direct access in view template
**Description:** View template references model properties directly.
```javascript
class View {
  render() {
    this.el.innerHTML = "<p>" + this.model.user.name + "</p>";
  }
}
```

### Error 54: No abstract base for MVC components
**Description:** No shared base class for models, views, or controllers.
```javascript
class UserModel { /* has init, destroy */ }
class ProductModel { /* has init, destroy - duplicated */ }
```

### Error 55: Controller logic in event handlers
**Description:** Complex business logic in controller event callbacks.
```javascript
class Controller {
  constructor() {
    this.view.on("click", async (e) => {
      const data = await fetch("/api/" + e.detail.id);
      const json = await data.json();
      const processed = this.processData(json);
      this.model.update(processed);
      this.view.showSuccess();
    });
  }
}
```

### Error 56: View creates model instance
**Description:** View should not instantiate model.
```javascript
class View {
  constructor() {
    this.model = new Model();
  }
}
```

### Error 57: Not using data binding
**Description:** Manual DOM updates instead of two-way binding.
```javascript
class View {
  update(data) {
    this.nameEl.textContent = data.name;
    this.emailEl.textContent = data.email;
    this.ageEl.textContent = data.age;
  }
}
```

### Error 58: Controller method returns view HTML
**Description:** Controller generating HTML strings.
```javascript
class Controller {
  getItemHTML(item) {
    return "<div class='item'>" + item.name + "</div>";
  }
}
```

### Error 59: No error view state
**Description:** View has no method for displaying errors.
```javascript
class View {
  render(data) { /* success state */ }
  // no showError method
}
```

### Error 60: Multiple views share same controller
**Description:** One controller managing multiple views that need different logic.
```javascript
class Controller {
  constructor() {
    this.mobileView = new MobileView();
    this.desktopView = new DesktopView();
  }
}
```

### Error 61: Model uses local storage directly
**Description:** Persistence should be abstracted behind repository.
```javascript
class Model {
  save() {
    localStorage.setItem("data", JSON.stringify(this.data));
  }
  load() {
    this.data = JSON.parse(localStorage.getItem("data"));
  }
}
```

### Error 62: View re-queries DOM on every render
**Description:** DOM queries inside render that should be cached.
```javascript
class View {
  render(data) {
    const list = document.querySelector("#list");
    list.innerHTML = "";
    data.forEach(d => {
      list.appendChild(this.createItem(d));
    });
  }
}
```

### Error 63: Controller using setTimeout instead of event
**Description:** Polling with timers instead of event-based updates.
```javascript
class Controller {
  startSync() {
    setInterval(() => {
      this.model.sync();
      this.view.refresh();
    }, 5000);
  }
}
```

### Error 64: View method naming inconsistency
**Description:** Different naming patterns in view (render, show, display, draw).
```javascript
class View {
  renderUsers() {}
  showError() {}
  displayItems() {}
  drawChart() {}
}
```

### Error 65: Not using requestAnimationFrame for batch updates
**Description:** Multiple DOM updates without batching.
```javascript
class View {
  update(data) {
    data.forEach(d => {
      const el = document.getElementById(d.id);
      el.textContent = d.value;
    });
  }
}
```

### Error 66: Model notifications not batched
**Description:** Multiple model changes fire separate notifications.
```javascript
class Model {
  setAll(data) {
    this.data = data;
    this.notify();
    this.total = data.length;
    this.notify();
    this.active = data.filter(d => d.active).length;
    this.notify();
  }
}
```

### Error 67: View creates global event listeners
**Description:** View attaches to window without cleanup.
```javascript
class View {
  constructor() {
    window.addEventListener("resize", this.onResize);
  }
}
```

### Error 68: Controller not handling empty model state
**Description:** No empty state view when model has no data.
```javascript
class Controller {
  render() {
    this.view.render(this.model.getAll());
  }
}
```

### Error 69: View renders before model is ready
**Description:** View called before async model initialization.
```javascript
class Controller {
  async init() {
    this.model = new Model();
    this.view = new View();
    this.view.render(this.model.getData()); // data not loaded yet
    await this.model.load();
  }
}
```

### Error 70: Model as singleton when it shouldnt be
**Description:** Using singleton model when multiple independent instances needed.
```javascript
class Model {
  static instance = null;
  constructor() {
    if (Model.instance) return Model.instance;
    Model.instance = this;
  }
}
```

## Issue Snippets

### Issue 1: Fat controller with business logic
**Description:** Controller contains business logic that belongs in model.
```javascript
class Controller {
  calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
}
```

### Issue 2: Anemic model with no behavior
**Description:** Model is just a data container with getters/setters.
```javascript
class UserModel {
  constructor() { this.name = ""; this.email = ""; }
  getName() { return this.name; }
  setName(n) { this.name = n; }
  getEmail() { return this.email; }
  setEmail(e) { this.email = e; }
}
```

### Issue 3: View containing complex logic
**Description:** View has filtering, sorting, and transformation logic.
```javascript
class View {
  render(data) {
    const sorted = [...data].sort((a, b) => b.score - a.score);
    const top5 = sorted.slice(0, 5);
    const formatted = top5.map(d => ({ ...d, label: d.name.toUpperCase() }));
    this.el.innerHTML = formatted.map(d => "<li>" + d.label + "</li>").join("");
  }
}
```

### Issue 4: No loading/empty/error states
**Description:** View only handles success state.
```javascript
class View {
  render(data) { /* shows data */ }
  // Missing: showLoading(), showEmpty(), showError()
}
```

### Issue 5: MVC components in single file
**Description:** Model, View, Controller all in one large file.
```javascript
// todo-mvc.js - 500 lines containing everything
class TodoModel {}
class TodoView {}
class TodoController {}
```

### Issue 6: No event unbinding in view
**Description:** Event listeners never removed, causing memory leaks.
```javascript
class View {
  bindEvents() {
    this.btn.addEventListener("click", this.handler);
  }
}
```

### Issue 7: Model returns raw data instead of copies
**Description:** External code can mutate model data directly.
```javascript
class Model {
  getItems() { return this.items; } // returns reference
}
```

### Issue 8: Controller not using async/await
**Description:** Promise chains instead of cleaner async/await.
```javascript
class Controller {
  load() {
    this.model.fetch().then(data => {
      this.view.render(data);
    }).catch(err => {
      this.view.showError(err);
    });
  }
}
```

### Issue 9: Tight coupling via constructor injection
**Description:** Controller depends on concrete classes not interfaces.
```javascript
class Controller {
  constructor() {
    this.model = new MySQLModel();
    this.view = new HTMLView();
  }
}
```

### Issue 10: View generates HTML with string concatenation
**Description:** Messy HTML generation instead of template literals or document.createElement.
```javascript
class View {
  renderItem(item) {
    return "<div class='" + (item.active ? "active" : "") + "'>" + item.name + "</div>";
  }
}
```

### Issue 11: No validation in model setters
**Description:** Model accepts invalid data silently.
```javascript
class Model {
  setEmail(email) { this.email = email; }
}
```

### Issue 12: Model fires events on every property change
**Description:** Too many events cause excessive re-renders.
```javascript
class Model {
  set name(v) { this._name = v; this.emit("change"); }
  set age(v) { this._age = v; this.emit("change"); }
  set email(v) { this._email = v; this.emit("change"); }
}
```

### Issue 13: Domain logic in view templates
**Description:** Business rules in template conditionals.
```javascript
class View {
  render(user) {
    return "<div>" + (user.age >= 18 ? "Adult" : "Minor") + "</div>";
  }
}
```

### Issue 14: Router mixed into controller
**Description:** Navigation logic mixed with presentation logic.
```javascript
class UserController {
  show(id) {
    window.location.hash = "#users/" + id;
    this.model.load(id).then(d => this.view.render(d));
  }
}
```

### Issue 15: View directly imports model
**Description:** View imports model module directly.
```javascript
import { Model } from "./Model.js";
class View {
  constructor() { this.model = new Model(); }
}
```

### Issue 16: Not using PubSub pattern
**Description:** Direct method calls instead of pub/sub for decoupling.
```javascript
// Instead of this.model.on("change", () => this.view.render());
this.model.onChange = () => this.view.render();
```

### Issue 17: Controller selects DOM elements
**Description:** DOM selection logic in controller instead of view.
```javascript
class Controller {
  highlight(id) {
    document.querySelector("[data-id='" + id + "']").classList.add("highlight");
  }
}
```

### Issue 18: Model with UI-specific data shapes
**Description:** Model returns data formatted for specific view.
```javascript
class Model {
  getTableData() { /* returns data as table rows */ }
  getChartData() { /* returns data as chart points */ }
}
```

### Issue 19: Duplicate event binding across components
**Description:** Both model and view bind to same DOM events.
```javascript
class Model { constructor() { window.addEventListener("storage", this.sync); } }
class View { constructor() { window.addEventListener("storage", this.refresh); } }
```

### Issue 20: View calls controller methods directly
**Description:** View imports and calls controller, creating circular dependency.
```javascript
import { Controller } from "./Controller.js";
class View {
  onClick() { Controller.handleClick(); }
}
```

### Issue 21: No abstract interface for model
**Description:** Swapping model implementation requires controller changes.
```javascript
class Controller {
  constructor() { this.model = new LocalStorageModel(); }
  // Switching to APIModel requires changes here
}
```

### Issue 22: Controller handles keyboard events globally
**Description:** Global keyboard shortcuts in controller that should be in view.
```javascript
class Controller {
  constructor() {
    document.addEventListener("keydown", this.onKeyDown);
  }
}
```

### Issue 23: Model contains computed/derived state
**Description:** Storing values that can be derived from other state.
```javascript
class CartModel {
  constructor() { this.items = []; this.total = 0; }
  add(item) { this.items.push(item); this.total += item.price; }
}
```

### Issue 24: No unsubscribing from model events
**Description:** View subscribes to model but never unsubscribes.
```javascript
class View {
  constructor(model) {
    model.on("change", this.render);
    // never calls model.off("change", this.render)
  }
}
```

### Issue 25: View re-renders on every model change
**Description:** Even unrelated model changes trigger full re-render.
```javascript
class Model {
  constructor() { this.data = {}; }
  set(key, val) { this.data[key] = val; this.emit("change"); }
}
class View {
  constructor(model) { model.on("change", this.render); }
  render() { /* full re-render */ }
}
```

### Issue 26: Controller handles form validation
**Description:** Form validation should be in view or model, not controller.
```javascript
class Controller {
  onSubmit(data) {
    if (!data.name) this.view.showError("Name required");
    if (!data.email) this.view.showError("Email required");
  }
}
```

### Issue 27: View creates entire DOM tree on each render
**Description:** Recreating DOM elements instead of reusing them.
```javascript
class View {
  render(items) {
    this.el.innerHTML = "";
    items.forEach(i => this.el.appendChild(this.createItem(i)));
  }
}
```

### Issue 28: Business logic in event handlers
**Description:** Event handlers contain business rules.
```javascript
class View {
  constructor() {
    this.btn.addEventListener("click", () => {
      if (this.input.value.length < 3) return alert("Too short");
      // business rule in view
    });
  }
}
```

### Issue 29: Controller exposes model methods
**Description:** Controller is a pass-through to model.
```javascript
class Controller {
  getUsers() { return this.model.getUsers(); }
  addUser(u) { return this.model.addUser(u); }
  deleteUser(id) { return this.model.deleteUser(id); }
  updateUser(u) { return this.model.updateUser(u); }
}
```

### Issue 30: No separation of app state vs UI state
**Description:** Navigation state (active tab, scroll) mixed with business data.
```javascript
class Model {
  constructor() {
    this.users = [];
    this.activeTab = "users";
    this.scrollPosition = 0;
    this.selectedUserId = null;
  }
}
```

## Modify Snippets

### Modify 1: Create a basic Model class
**Description:** Create a Model class with getData and setData methods.
```javascript
// Create Model with private _data and getter/setter
```

### Modify 2: Create a basic View class
**Description:** Create a View class with render(data) method that updates el.
```javascript
// Create View with constructor(el) and render method
```

### Modify 3: Create a Controller class
**Description:** Create Controller that connects Model and View.
```javascript
// Create Controller(model, view) with init method
```

### Modify 4: Add observer pattern to Model
**Description:** Add subscribe and notify methods to Model.
```javascript
class Model {
  constructor() { this._data = []; }
  // Add subscribe and notify
}
```

### Modify 5: Add event handler in View
**Description:** Add a bindAddItem method that listens to form submit.
```javascript
class View {
  constructor(el) { this.el = el; }
  // Add bindAddItem(handler)
}
```

### Modify 6: Create TodoMVC model
**Description:** Create TodoModel with add, remove, toggle methods.
```javascript
// Create TodoModel
```

### Modify 7: Create TodoItem view
**Description:** Create TodoView with render method for a single todo.
```javascript
// Create TodoView that renders a todo item
```

### Modify 8: Connect TodoController
**Description:** Create TodoController that coordinates TodoModel and TodoView.
```javascript
// Create TodoController
```

### Modify 9: Add render method to View
**Description:** View.render() should clear and re-render all items.
```javascript
class View {
  constructor(el) { this.el = el; }
  // Add render(items) method
}
```

### Modify 10: Add model change listener
**Description:** View should subscribe to model changes and re-render.
```javascript
class View {
  constructor(el, model) {
    // Subscribe to model changes
  }
}
```

### Modify 11: Add remove method to model
**Description:** Add remove(id) method that filters out item.
```javascript
class Model {
  constructor() { this.items = []; }
  // Add remove(id)
}
```

### Modify 12: Add toggle complete method
**Description:** Add toggle(id) to model that toggles item.completed.
```javascript
class TodoModel {
  // Add toggle(id)
}
```

### Modify 13: Create filter functionality
**Description:** Model gets filter method that returns active/completed/all.
```javascript
class TodoModel {
  // Add getFiltered(status)
}
```

### Modify 14: Add clear completed button handler
**Description:** View adds clear completed button with event handler.
```javascript
class View {
  // Add clearCompleted button and handler
}
```

### Modify 15: Create observable Model base
**Description:** Create ObservableModel base class with subscribe/notify.
```javascript
// Create ObservableModel base class
```

### Modify 16: Extend View from base View
**Description:** Create BaseView with common lifecycle methods.
```javascript
// Create BaseView with init, render, destroy
```

### Modify 17: Add render method for empty state
**Description:** View should show "No items" when data is empty.
```javascript
class View {
  render(items) {
    // Show empty state if no items
  }
}
```

### Modify 18: Add loading state to View
**Description:** Add showLoading/hideLoading methods to View.
```javascript
class View {
  // Add loading state methods
}
```

### Modify 19: Add error display to View
**Description:** Add showError(message) method to View.
```javascript
class View {
  // Add showError method
}
```

### Modify 20: Create a service layer
**Description:** Create ApiService that handles HTTP requests.
```javascript
// Create ApiService class with get/post methods
```

### Modify 21: Add dependency injection to Controller
**Description:** Controller receives model and view via constructor params.
```javascript
// Create Controller with DI
```

### Modify 22: Create event bus for communication
**Description:** Create a simple EventBus pub/sub system.
```javascript
// Create EventBus class
```

### Modify 23: Add batch update to Model
**Description:** Model.add should batch notify on multiple changes.
```javascript
class Model {
  add(items) {
    // Add multiple items with single notification
  }
}
```

### Modify 24: Add undo support to Model
**Description:** Model saves previous state for undo.
```javascript
class Model {
  // Add undo support with history
}
```

### Modify 25: Create a render helper
**Description:** Create helper function for creating DOM elements.
```javascript
// Create createElement(tag, attrs, children) helper
```

### Modify 26: Implement two-way data binding
**Description:** Create a simple binding between input and model.
```javascript
// Implement bindInputToModel(input, model, key)
```

### Modify 27: Create a Router
**Description:** Create Router that maps URLs to controllers.
```javascript
// Create Router class
```

### Modify 28: Add view caching
**Description:** Cache rendered DOM elements for performance.
```javascript
class View {
  // Add element caching
}
```

### Modify 29: Implement form validation in Model
**Description:** Add validate method to model.
```javascript
class Model {
  // Add validate method
}
```

### Modify 30: Create computed properties
**Description:** Add computed properties that derive from other data.
```javascript
class Model {
  // Add computed property for total
}
```

### Modify 31: Add lifecycle hooks
**Description:** Add beforeRender and afterRender hooks to View.
```javascript
class View {
  // Add lifecycle hooks
}
```

### Modify 32: Create pagination support
**Description:** Model adds pagination with page and limit.
```javascript
class Model {
  // Add pagination methods
}
```

### Modify 33: Add sorting to Model
**Description:** Model returns sorted data by given field.
```javascript
class Model {
  // Add getSorted(field, order)
}
```

### Modify 34: Create search filter in Model
**Description:** Model filters items by search query.
```javascript
class Model {
  // Add search(query) method
}
```

### Modify 35: Add export data feature
**Description:** Model exports data as JSON.
```javascript
class Model {
  // Add exportJSON method
}
```

### Modify 36: Create inline editing view
**Description:** View supports clicking item text to edit inline.
```javascript
class View {
  // Add inline editing
}
```

### Modify 37: Add drag and drop reorder
**Description:** View supports drag and drop to reorder items.
```javascript
// Add drag and drop to view
```

### Modify 38: Create bulk actions in model
**Description:** Model adds selectAll and clearSelected.
```javascript
class Model {
  // Add bulk actions
}
```

### Modify 39: Add keyboard shortcuts
**Description:** View handles keyboard shortcuts (Ctrl+Z for undo).
```javascript
// Add keyboard shortcuts
```

### Modify 40: Create data persistence
**Description:** Model auto-saves to localStorage on changes.
```javascript
class Model {
  // Add auto-save to localStorage
}
```

### Modify 41: Add optimistic updates
**Description:** Model updates UI before API confirms.
```javascript
class Model {
  // Add optimistic update pattern
}
```

### Modify 42: Create view transition animations
**Description:** View adds CSS classes for enter/leave animations.
```javascript
class View {
  // Add animation classes
}
```

### Modify 43: Add debounced save
**Description:** Auto-save debounces rapid changes.
```javascript
class Model {
  // Add debounced auto-save
}
```

### Modify 44: Create multi-select in view
**Description:** View supports selecting multiple items with Shift+Click.
```javascript
class View {
  // Add multi-select
}
```

### Modify 45: Add count indicators
**Description:** View shows total, active, completed counts.
```javascript
class View {
  // Add count display
}
```

### Modify 46: Create focused state management
**Description:** Model tracks which item is focused/selected.
```javascript
class Model {
  // Add selectedId state
}
```

### Modify 47: Add URL hash routing
**Description:** Controller reads URL hash for filter state.
```javascript
class Controller {
  // Add hash change listener
}
```

### Modify 48: Create test for MVC interaction
**Description:** Write a test that model update triggers view render.
```javascript
// Test MVC flow
```

### Modify 49: Add persistent state via URL
**Description:** Model serializes state to URL query params.
```javascript
class Controller {
  // Sync state with URL
}
```

### Modify 50: Create complete MVC todo app
**Description:** Integrate all MVC parts into working Todo app.
```javascript
// Create and wire up complete MVC Todo app
```
