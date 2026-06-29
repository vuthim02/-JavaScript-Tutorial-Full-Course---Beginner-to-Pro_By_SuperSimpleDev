# Level 79: MVC Pattern Implementation

## Error Snippets (1-70)

### Error 1: View Directly Accesses Model Data
**Description:** The view reads from the model instead of using the controller.
```javascript
class CartView {
  render() {
    const items = cartModel.items; // direct model access
    // render items
  }
}
```

### Error 2: Controller Doesn't Update View After Model Change
**Description:** The controller updates the model but forgets to tell the view to re-render.
```javascript
class CartController {
  addItem(product) {
    this.model.addItem(product);
    // Missing: this.view.render();
  }
}
```

### Error 3: Model Emits Events But No Listener Attached
**Description:** The model emits change events but the controller never subscribes.
```javascript
class CartModel {
  addItem(item) {
    this.items.push(item);
    this.emit('change');
  }
}
class CartController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    // Missing: model.on('change', () => view.render());
  }
}
```

### Error 4: View Creates Its Own Controller
**Description:** The view instantiates a controller, creating a circular dependency.
```javascript
class CartView {
  constructor() {
    this.controller = new CartController(this);
  }
}
```

### Error 5: Controller Contains View Logic
**Description:** The controller directly manipulates DOM instead of going through the view.
```javascript
class CartController {
  updateQuantity(id, qty) {
    this.model.updateQuantity(id, qty);
    document.getElementById('total').textContent = this.model.getTotal();
  }
}
```

### Error 6: Model Contains UI Logic
**Description:** The model updates the DOM when data changes.
```javascript
class CartModel {
  addItem(item) {
    this.items.push(item);
    document.querySelector('.cart-count').textContent = this.items.length;
  }
}
```

### Error 7: View Holds Reference to Model
**Description:** The view takes a model reference and reads data directly.
```javascript
class CartView {
  constructor(model) {
    this.model = model;
  }
  render() {
    this.model.items.forEach(item => { /* render */ });
  }
}
```

### Error 8: Controller Not Initialized
**Description:** The controller is created but never initialized with model data.
```javascript
const model = new CartModel();
const view = new CartView();
const controller = new CartController(model, view);
// controller.init() is never called
```

### Error 9: Multiple Views Share One Model Without Sync
**Description:** Two views display the same model data but don't stay in sync.
```javascript
class CartController {
  constructor(model, cartView, summaryView) {
    this.model = model;
    this.cartView = cartView;
    this.summaryView = summaryView;
    model.on('change', () => {
      this.cartView.render(); // summaryView not updated
    });
  }
}
```

### Error 10: View Renders on Every Model Change Inefficiently
**Description:** The view re-renders the entire component on every tiny change.
```javascript
model.on('change', () => view.render());
// Called 100 times for 100 quantity changes
```

### Error 11: Model Exposes Internal State Publicly
**Description:** The model's internal state is a public property.
```javascript
class CartModel {
  constructor() {
    this.items = []; // public, should be private
  }
}
```

### Error 12: Controller Event Handlers Not Bound
**Description:** Event handler methods lose their `this` context when passed as callbacks.
```javascript
class CartController {
  constructor(model, view) {
    this.view = view;
    this.view.onCheckout = this.handleCheckout; // 'this' will be wrong
  }
  handleCheckout() {
    this.model.processCheckout(); // Error: this.model is undefined
  }
}
```

### Error 13: View Adds Event Listeners in Render Instead of Init
**Description:** Event listeners are attached every time the view renders.
```javascript
class CartView {
  render() {
    this.element.innerHTML = '<button class="checkout">Checkout</button>';
    document.querySelector('.checkout').addEventListener('click', () => {
      this.onCheckout();
    });
  }
}
```

### Error 14: Controller and View Tightly Coupled
**Description:** The controller knows about view internals (specific CSS classes).
```javascript
class CartController {
  showError(msg) {
    this.view.element.querySelector('.error-msg').textContent = msg;
  }
}
```

### Error 15: Missing Model State After Page Reload
**Description:** The model doesn't persist state, so data is lost on refresh.
```javascript
class CartModel {
  constructor() {
    this.items = []; // always empty on page load
  }
}
```

### Error 16: View Listens to DOM Events That Don't Exist
**Description:** The view tries to listen for events on elements not yet rendered.
```javascript
class CartView {
  constructor() {
    document.getElementById('checkout-btn').addEventListener('click', () => {
      this.onCheckout();
    });
  }
}
```

### Error 17: Controller Duplicates Model Logic
**Description:** The controller reimplements model calculations.
```javascript
class CartController {
  getTotal() {
    return this.model.items.reduce((s, i) => s + i.price, 0); // Should call model.getTotal()
  }
}
```

### Error 18: Model Uses Static Data Instead of API
**Description:** The model uses hardcoded data instead of fetching from the API.
```javascript
class ProductModel {
  constructor() {
    this.products = [
      { id: 1, name: 'T-Shirt', price: 29.99 }
    ];
  }
}
```

### Error 19: View Not Resetting on Model Clear
**Description:** The view doesn't clear when the model is reset.
```javascript
class CartController {
  clearCart() {
    this.model.clear();
    // View still shows old items
  }
}
```

### Error 20: Controller Handles Routing
**Description:** The controller is responsible for navigation/routing.
```javascript
class CartController {
  goToCheckout() {
    window.location.href = '/checkout.html';
  }
}
```

### Error 21: View Renders With Undefined Data
**Description:** The view tries to render before the model data is loaded.
```javascript
class CartController {
  async init() {
    await this.model.load();
    // View.render() not called after load
  }
}
```

### Error 22: Model Getter Returns Reference to Internal Array
**Description:** Model's getter returns the actual array reference, allowing external mutation.
```javascript
class CartModel {
  getItems() {
    return this.items; // returns reference, not copy
  }
}
```

### Error 23: Controller Passes Raw DOM Events to Model
**Description:** The controller passes the raw DOM event object to the model.
```javascript
class CartController {
  handleSubmit(event) {
    this.model.addItem(event); // passing event instead of data
  }
}
```

### Error 24: View HTML Template Has Syntax Error
**Description:** The view's template string has an unterminated string.
```javascript
class CartView {
  render() {
    this.element.innerHTML = `<div class="cart">`;
  }
}
```

### Error 25: Model State Mutation via Direct Property Access
**Description:** External code mutates model properties directly.
```javascript
const model = new CartModel();
model.items.push({ id: 1, name: 'Test' }); // bypasses model methods
```

### Error 26: Controller Forgets to Pass Data to View
**Description:** The controller updates the model but calls view.render() without data.
```javascript
class CartController {
  async loadProducts() {
    const products = await this.model.fetchProducts();
    this.view.render(); // Missing: pass products to view
  }
}
```

### Error 27: View Creates DOM Elements Incorrectly
**Description:** The view creates duplicate elements on each render.
```javascript
class CartView {
  render() {
    this.element.innerHTML = '<div class="cart"></div>';
  }
}
```

### Error 28: Model Event Emitter Not Implemented
**Description:** The model tries to emit events but has no event system.
```javascript
class CartModel {
  addItem(item) {
    this.items.push(item);
    this.emit('change'); // emit doesn't exist
  }
}
```

### Error 29: Controller Calls View Before DOM Ready
**Description:** The controller initializes the view before the DOM is fully loaded.
```javascript
const model = new CartModel();
const view = new CartView();
const controller = new CartController(model, view);
controller.init(); // DOM might not be ready
```

### Error 30: View Uses Inline Styles Instead of CSS Classes
**Description:** The view applies styles directly to elements instead of using CSS classes.
```javascript
class CartView {
  render() {
    const div = document.createElement('div');
    div.style.color = 'red';
    div.style.fontSize = '14px';
    div.style.padding = '10px';
  }
}
```

### Error 31: Model Validation in Wrong Layer
**Description:** Input validation is in the model instead of the controller.
```javascript
class CartModel {
  addItem(item) {
    if (!item.name) throw new Error('Name required');
    if (item.price < 0) throw new Error('Invalid price');
    this.items.push(item);
  }
}
```

### Error 32: View Hardcodes Text Content
**Description:** The view contains hardcoded text strings instead of using a localization system.
```javascript
class CartView {
  render() {
    return '<h1>Shopping Cart</h1><p>Your cart is empty</p>';
  }
}
```

### Error 33: Controller Doesn't Handle Async Errors
**Description:** The controller doesn't catch errors from async model operations.
```javascript
class CartController {
  async loadProducts() {
    const products = await this.model.fetchProducts();
    this.view.render(products);
  }
}
```

### Error 34: Model and View Created in Wrong Order
**Description:** The view is created before the model it depends on.
```javascript
const view = new CartView();
const model = new CartModel();
const controller = new CartController(model, view);
```

### Error 35: View Event Delegation Not Used
**Description:** The view attaches individual event listeners to each item instead of delegating.
```javascript
class CartView {
  render(items) {
    items.forEach(item => {
      const btn = document.createElement('button');
      btn.addEventListener('click', () => this.onRemove(item.id)); // one per item
      this.element.appendChild(btn);
    });
  }
}
```

### Error 36: Controller Creates Multiple Model Instances
**Description:** The controller creates a new model instance when it should use the singleton.
```javascript
class CartController {
  addItem(product) {
    const model = new CartModel(); // new instance every time
    model.addItem(product);
  }
}
```

### Error 37: View Uses `innerHTML` Without Sanitization
**Description:** The view sets innerHTML with user input that could contain malicious content.
```javascript
class CartView {
  render(item) {
    this.element.innerHTML = `<div>${item.name}</div>`; // XSS vulnerability
  }
}
```

### Error 38: Model Uses Callbacks Instead of Events
**Description:** The model uses callback functions instead of a proper event system.
```javascript
class CartModel {
  constructor() {
    this.onChange = null;
  }
  addItem(item) {
    this.items.push(item);
    if (this.onChange) this.onChange();
  }
}
```

### Error 39: Controller Not Separated From App Entry
**Description:** The app initialization and controller creation are mixed together.
```javascript
const model = new CartModel();
const view = new CartView(document.getElementById('app'));
const controller = new CartController(model, view);
controller.init();
```

### Error 40: View Querying DOM in Constructor
**Description:** The view queries the DOM in its constructor, which may run before DOM is ready.
```javascript
class CartView {
  constructor() {
    this.element = document.getElementById('cart'); // might be null
  }
}
```

### Error 41: Model Exposes Setter Without Validation
**Description:** The model has a setter that allows setting invalid values.
```javascript
class CartModel {
  set items(val) {
    this._items = val; // no validation
  }
}
```

### Error 42: Controller Has Too Many Responsibilities
**Description:** The controller handles cart, checkout, and payment logic.
```javascript
class CartController {
  addItem() { /* cart */ }
  processCheckout() { /* checkout */ }
  processPayment() { /* payment */ }
  sendConfirmation() { /* email */ }
}
```

### Error 43: View Mixes Multiple Concerns
**Description:** The view renders cart items, checkout form, and payment summary.
```javascript
class CartView {
  renderCart() { /* ... */ }
  renderCheckoutForm() { /* ... */ }
  renderPaymentSummary() { /* ... */ }
}
```

### Error 44: Model Event Bubbling Causes Infinite Loop
**Description:** Model change event triggers a controller that updates the model, causing a loop.
```javascript
model.on('change', () => {
  controller.syncData(); // which calls model.update() -> emits 'change' again
});
```

### Error 45: View Not Unmounting Event Listeners
**Description:** The view doesn't clean up event listeners when removed, causing memory leaks.
```javascript
class CartView {
  render() {
    window.addEventListener('resize', this.handleResize);
  }
  destroy() {
    // No cleanup
  }
}
```

### Error 46: Controller Passes Model to View
**Description:** The controller passes the entire model to the view instead of just the data.
```javascript
class CartController {
  render() {
    this.view.render(this.model); // passing model, not data
  }
}
```

### Error 47: Model Initializes Data Synchronously When It Should Be Async
**Description:** The model constructor tries to load data synchronously.
```javascript
class CartModel {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')); // sync
  }
}
```

### Error 48: View Template Engine Not Used
**Description:** The view manually creates elements instead of using a template engine.
```javascript
class CartView {
  renderItem(item) {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.textContent = item.name;
    div.appendChild(h3);
    // ... more manual element creation
  }
}
```

### Error 49: Controller Method Returns View HTML
**Description:** The controller generates HTML strings instead of the view doing it.
```javascript
class CartController {
  getItemHTML(item) {
    return `<div>${item.name}</div>`; // view logic in controller
  }
}
```

### Error 50: Model Uses Global State
**Description:** The model accesses global variables instead of being self-contained.
```javascript
class CartModel {
  addItem(item) {
    window.cart.push(item); // global state
  }
}
```

### Error 51: View Doesn't Show Loading State
**Description:** The view has no loading indicator while data is being fetched.
```javascript
class CartView {
  render() {
    // Shows empty state even while loading
  }
}
```

### Error 52: Controller Handles Keyboard Events Incorrectly
**Description:** The controller's key handler doesn't check event.target.
```javascript
class CartController {
  constructor() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
}
```

### Error 53: Model Methods Return Internal Data
**Description:** Model methods return mutable internal objects.
```javascript
class CartModel {
  getItem(id) {
    return this.items.find(i => i.id === id); // returns reference
  }
}
```

### Error 54: View Renders Empty State Incorrectly
**Description:** The view shows "cart empty" even when items exist.
```javascript
class CartView {
  render(items) {
    if (!items) {
      this.element.innerHTML = '<p>Cart is empty</p>';
    }
    // Also renders items below even when empty
  }
}
```

### Error 55: Controller Ignores View's Public API
**Description:** The controller manipulates view internals instead of calling view methods.
```javascript
class CartController {
  update() {
    this.view.element.innerHTML = ''; // bypassing view API
  }
}
```

### Error 56: Model Validation After State Change
**Description:** The model validates data after it's already been added.
```javascript
class CartModel {
  addItem(item) {
    this.items.push(item);
    if (item.price < 0) {
      this.items.pop(); // compensating after fact
    }
  }
}
```

### Error 57: View Creates Circular References
**Description:** The view stores a reference to the controller, preventing garbage collection.
```javascript
class CartView {
  constructor(controller) {
    this.controller = controller;
  }
}
```

### Error 58: Controller Overwrites View Methods
**Description:** The controller replaces methods on the view object.
```javascript
class CartController {
  constructor(model, view) {
    view.render = this.customRender; // overwriting view method
  }
}
```

### Error 59: Model Event Names Inconsistent
**Description:** The model uses different event naming conventions.
```javascript
class CartModel {
  addItem() { this.emit('itemAdded'); }
  removeItem() { this.emit('item_removed'); }
  clear() { this.emit('CART_CLEARED'); }
}
```

### Error 60: View Uses `document.write`
**Description:** The view uses document.write which overwrites the document.
```javascript
class CartView {
  render() {
    document.write('<h1>Cart</h1>'); // destroys existing content
  }
}
```

### Error 61: Controller Initialization Order Wrong
**Description:** Controller tries to use model/view before they're fully initialized.
```javascript
class CartController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }
  init() {
    this.model.load(); // model might not be ready
  }
}
```

### Error 62: Model Data Not Normalized
**Description:** The model stores data in inconsistent formats.
```javascript
class CartModel {
  addItem(item) {
    this.items.push({
      id: item.id,
      productName: item.name,
      price: item.price,
      qty: 1
    });
  }
  addItemFromAPI(apiItem) {
    this.items.push({
      product_id: apiItem.id,
      title: apiItem.title,
      cost: apiItem.price
    }); // different format!
  }
}
```

### Error 63: View Renders When Controller Is Destroyed
**Description:** The view continues to render even after the controller is destroyed.
```javascript
class CartController {
  destroy() {
    // view still has event listeners and can render
  }
}
```

### Error 64: Controller Missing Error State Handling
**Description:** The controller has no error state when model operations fail.
```javascript
class CartController {
  async addItem(productId) {
    await this.model.addItem(productId);
    this.view.render(this.model.getItems());
    // No catch for errors
  }
}
```

### Error 65: Model Uses Server Time Instead of Local
**Description:** The model uses server timestamps that may be wrong.
```javascript
class CartModel {
  addItem(item) {
    item.addedAt = serverTimestamp; // might be off
  }
}
```

### Error 66: View Has Dead Code From Old Requirements
**Description:** The view contains rendering code for features that no longer exist.
```javascript
class CartView {
  render() {
    this.renderItems();
    this.renderCouponInput(); // coupon feature removed
    this.renderGiftWrap(); // gift wrap feature removed
  }
}
```

### Error 67: Controller Directly Accesses View Element
**Description:** The controller directly queries DOM elements instead of using view methods.
```javascript
class CartController {
  showSuccess() {
    document.querySelector('.success-msg').classList.add('visible');
  }
}
```

### Error 68: Model Setter Triggers Side Effects
**Description:** The model setter emits events that cause external side effects.
```javascript
class CartModel {
  set items(val) {
    this._items = val;
    this.emit('change'); // side effect in setter
  }
}
```

### Error 69: View Event Handlers Not Namespaced
**Description:** View event handlers conflict with other views on the same page.
```javascript
class CartView {
  render() {
    document.querySelector('.btn').addEventListener('click', this.handleClick);
  }
}
```

### Error 70: Controller and Model Created in Different Scopes
**Description:** The model is created in a different scope, causing module-level state issues.
```javascript
function createController() {
  const model = new CartModel();
  const view = new CartView();
  return new CartController(model, view);
}
// Each call creates a new model - state not shared
```

## Issue Snippets (1-30)

### Issue 1: Monolithic Controller
**Description:** The controller handles cart, checkout, payment, and user auth.
```javascript
class MainController {
  addToCart() { /* ... */ }
  processCheckout() { /* ... */ }
  processPayment() { /* ... */ }
  login() { /* ... */ }
  logout() { /* ... */ }
  searchProducts() { /* ... */ }
}
```

### Issue 2: No Separation Between Model, View, Controller
**Description:** The entire cart logic is in one class/module.
```javascript
class Cart {
  constructor() { this.items = []; }
  addItem(item) { this.items.push(item); this.render(); }
  render() { /* DOM manipulation */ }
  handleClick(e) { /* event handling */ }
}
```

### Issue 3: View Contains Business Logic
**Description:** The view calculates totals and taxes instead of just displaying them.
```javascript
class CartView {
  render(items) {
    const total = items.reduce((s, i) => s + i.price, 0);
    const tax = total * 0.08;
    this.element.innerHTML = `Total: $${(total + tax).toFixed(2)}`;
  }
}
```

### Issue 4: No Observer Pattern for Model-View Communication
**Description:** The controller polls the model for changes instead of listening to events.
```javascript
class CartController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    setInterval(() => {
      this.view.render(this.model.getItems());
    }, 1000); // polling every second
  }
}
```

### Issue 5: Model Methods Modify Multiple Things
**Description:** Adding an item to the model also sends network requests and updates UI.
```javascript
class CartModel {
  addItem(item) {
    this.items.push(item);
    localStorage.setItem('cart', JSON.stringify(this.items));
    fetch('/api/cart/update', { method: 'POST', body: JSON.stringify(item) });
  }
}
```

### Issue 6: View Creates New Elements on Every Render
**Description:** The view destroys and recreates all DOM elements on every render.
```javascript
class CartView {
  render(items) {
    this.element.innerHTML = '';
    items.forEach(item => {
      this.element.appendChild(this.createItemElement(item));
    });
  }
}
```

### Issue 7: No Loading State in MVC
**Description:** The view has no concept of loading while data is being fetched.
```javascript
// View immediately renders empty state
```

### Issue 8: Controller Methods Too Long
**Description:** Controller methods handle too many responsibilities.
```javascript
class CartController {
  async addItem(productId) {
    // 50+ lines handling validation, API calls, UI updates, error handling
  }
}
```

### Issue 9: Model Event Names Too Generic
**Description:** Model emits `change` for every type of change.
```javascript
class CartModel {
  addItem(item) { this.emit('change'); }
  removeItem(id) { this.emit('change'); }
  clear() { this.emit('change'); }
  updateQuantity(id, qty) { this.emit('change'); }
}
```

### Issue 10: View Not Using Template Literals Properly
**Description:** The view concatenates strings instead of using template literals.
```javascript
class CartView {
  renderItem(item) {
    return '<div class="item">' + item.name + ' - $' + item.price + '</div>';
  }
}
```

### Issue 11: No Error View State
**Description:** The view has no way to display error states.
```javascript
class CartView {
  render(items) {
    if (items.length === 0) {
      this.element.innerHTML = '<p>Cart is empty</p>';
    } else {
      // render items
    }
    // No error state
  }
}
```

### Issue 12: Controller Duplicates Model Methods
**Description:** The controller has methods that mirror the model's methods.
```javascript
class CartController {
  addItem(item) { this.model.addItem(item); }
  removeItem(id) { this.model.removeItem(id); }
  clear() { this.model.clear(); }
  getTotal() { return this.model.getTotal(); }
}
```

### Issue 13: Model Data Not Immutable
**Description:** Model data can be mutated from outside.
```javascript
const model = new CartModel();
const items = model.getItems();
items.push({ id: 1 }); // mutates model's internal array
```

### Issue 14: View Renders Too Often
**Description:** Multiple rapid model changes trigger too many renders.
```javascript
// Adding 100 items triggers 100 renders
```

### Issue 15: No View Interface/Contract
**Description:** No defined interface for what view methods the controller can call.
```javascript
// Controller might call view.render() or view.update() or view.refresh()
```

### Issue 16: Model Not Testable Without View
**Description:** The model is coupled to the view, making unit testing difficult.
```javascript
class CartModel {
  constructor(view) {
    this.view = view;
  }
}
```

### Issue 17: Controller Knows About Router
**Description:** The controller handles URL navigation directly.
```javascript
class CartController {
  goToProduct(id) {
    window.location.hash = `#/products/${id}`;
  }
}
```

### Issue 18: View Selectors Hardcoded
**Description:** The view uses hardcoded CSS selectors instead of configurable ones.
```javascript
class CartView {
  constructor() {
    this.container = document.querySelector('#app .cart'); // hardcoded
  }
}
```

### Issue 19: No Destroy/Cleanup Method
**Description:** MVC components can't be properly cleaned up when removed.
```javascript
// No destroy() method on any MVC component
```

### Issue 20: Model Methods Return Promises Inconsistently
**Description:** Some model methods return promises, others return values.
```javascript
class CartModel {
  getItems() { return this.items; } // sync
  addItem(item) { return this.save(item); } // async
}
```

### Issue 21: View Doesn't Handle Edge Cases
**Description:** Empty state, loading state, error state not handled.
```javascript
class CartView {
  render(items) {
    items.forEach(item => { ... }); // crashes if items is null
  }
}
```

### Issue 22: No Separation of Data and Presentation
**Description:** The view receives raw model data and formats it inline.
```javascript
class CartView {
  render(items) {
    items.forEach(item => {
      const formattedPrice = `$${item.price.toFixed(2)}`;
      // display
    });
  }
}
```

### Issue 23: Controller Contains Form Validation
**Description:** Form validation logic is in the controller instead of a separate validator.
```javascript
class CartController {
  validateQuantity(value) {
    return value > 0 && value < 100;
  }
}
```

### Issue 24: Model Uses LocalStorage Directly
**Description:** The model directly accesses localStorage instead of using a storage service.
```javascript
class CartModel {
  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
}
```

### Issue 25: MVC Not Used for Simple Components
**Description:** Even simple UI elements have full MVC structure.
```javascript
// MVC for a simple button component
class ButtonModel { }
class ButtonView { }
class ButtonController { }
```

### Issue 26: View Has Too Many Render Methods
**Description:** The view has 20+ different render methods for different states.
```javascript
class CartView {
  renderHeader() { }
  renderItems() { }
  renderItem() { }
  renderSummary() { }
  renderTotal() { }
  renderTax() { }
  renderShipping() { }
  renderDiscount() { }
  renderCoupon() { }
  renderActions() { }
  renderEmpty() { }
  renderError() { }
  renderLoading() { }
}
```

### Issue 27: Controller Initializes in Constructor
**Description:** The controller does setup work in its constructor, making testing hard.
```javascript
class CartController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.setupEventListeners();
    this.loadInitialData();
  }
}
```

### Issue 28: Model State Not Serializable
**Description:** The model contains non-serializable data (functions, DOM references).
```javascript
class CartModel {
  constructor() {
    this.items = [];
    this.callbacks = [];
    this.element = document.getElementById('app'); // DOM reference
  }
}
```

### Issue 29: View Assumes Element Exists
**Description:** The view doesn't check if its container element exists.
```javascript
class CartView {
  constructor(containerId) {
    this.element = document.getElementById(containerId);
    // No null check
  }
}
```

### Issue 30: No Dispatcher/Action System
**Description:** No centralized action dispatcher for complex MVC interactions.
```javascript
// Direct method calls everywhere
controller.addItem(item);
model.addItem(item);
view.render(items);
```

## Modification Snippets (1-50)

### Modify 1: Refactor to MVC Pattern
**Description:** Separate a monolithic Cart class into Model, View, and Controller components.
```javascript
class Cart {
  constructor() {
    this.items = [];
  }
  addItem(item) { this.items.push(item); this.render(); }
  render() { document.getElementById('cart').innerHTML = /* ... */ }
}
```

### Modify 2: Create CartModel With Event System
**Description:** Add an event system to the model so views can subscribe to changes.
```javascript
class CartModel {
  constructor() {
    this.items = [];
  }
  addItem(item) {
    this.items.push(item);
  }
}
```

### Modify 3: Create CartView With Render Method
**Description:** Extract DOM manipulation into a separate view class.
```javascript
// Currently DOM logic is mixed with data logic
```

### Modify 4: Create CartController
**Description:** Create a controller that coordinates between model and view.
```javascript
// Currently model and view communicate directly
```

### Modify 5: Add Event Binding in Controller
**Description:** Subscribe the controller to model events to update the view.
```javascript
// Model emits events but no one listens
```

### Modify 6: Add View Event Delegation
**Description:** Use event delegation instead of individual event listeners.
```javascript
// Currently each item has its own event listener
```

### Modify 7: Separate Delivery Options MVC
**Description:** Create a separate MVC structure for delivery options.
```javascript
// Delivery logic mixed with cart MVC
```

### Modify 8: Create ProductModel
**Description:** Create a model for product data separate from the cart.
```javascript
// Products are currently handled inline
```

### Modify 9: Create ProductView
**Description:** Create a view for displaying product listings.
```javascript
// Products rendered inline
```

### Modify 10: Create ProductController
**Description:** Create a controller for product interactions.
```javascript
// No controller for products
```

### Modify 11: Add Model Data Persistence
**Description:** Add localStorage persistence to the model.
```javascript
// Model state lost on page refresh
```

### Modify 12: Add Loading State to View
**Description:** Show loading indicator while data is being fetched.
```javascript
// No loading state
```

### Modify 13: Add Error State to View
**Description:** Display error messages when operations fail.
```javascript
// Errors not shown to user
```

### Modify 14: Add Empty State to View
**Description:** Show appropriate message when cart is empty.
```javascript
// Empty state not handled
```

### Modify 15: Bind Controller Event Handlers
**Description:** Properly bind `this` context for event handler methods.
```javascript
class CartController {
  constructor() {
    this.view.onCheckout = this.handleCheckout;
  }
  handleCheckout() {
    // 'this' is undefined
  }
}
```

### Modify 16: Extract Checkout MVC
**Description:** Create separate MVC components for the checkout flow.
```javascript
// Checkout logic in main controller
```

### Modify 17: Add Model Validation
**Description:** Add input validation to the model before accepting data.
```javascript
// No validation in model
```

### Modify 18: Create View Render Helper
**Description:** Create helper methods for common rendering tasks.
```javascript
// Manual DOM creation everywhere
```

### Modify 19: Add Controller Error Handling
**Description:** Add try-catch blocks to controller async methods.
```javascript
// Async errors unhandled
```

### Modify 20: Implement Observer Pattern
**Description:** Implement a proper observer pattern for model-view communication.
```javascript
// Currently direct calls
```

### Modify 21: Add View Cleanup Method
**Description:** Add a destroy method to clean up view resources.
```javascript
// Event listeners never removed
```

### Modify 22: Create Payment MVC
**Description:** Create MVC components for payment processing.
```javascript
// Payment logic in checkout controller
```

### Modify 23: Add Model Data Copy Method
**Description:** Return copies of data instead of references.
```javascript
class CartModel {
  getItems() {
    return this.items; // returns reference
  }
}
```

### Modify 24: Separate Order Summary MVC
**Description:** Create MVC for order summary display.
```javascript
// Order summary in cart view
```

### Modify 25: Add URL-Based View State
**Description:** Use URL (hash) to determine which view to show.
```javascript
// Single view for everything
```

### Modify 26: Create AddressForm MVC
**Description:** Create MVC for address input forms.
```javascript
// Address form in checkout view
```

### Modify 27: Add Animation to View Transitions
**Description:** Add smooth transitions between view states.
```javascript
// Instant view changes
```

### Modify 28: Implement View Caching
**Description:** Cache rendered DOM elements for better performance.
```javascript
// Full re-render on every change
```

### Modify 29: Add Unit Tests for Model
**Description:** Write unit tests for the model logic.
```javascript
// No tests
```

### Modify 30: Add Integration Tests for Controller
**Description:** Write integration tests for controller-view interaction.
```javascript
// No tests
```

### Modify 31: Create Search MVC
**Description:** Create MVC for product search functionality.
```javascript
// Search in main controller
```

### Modify 32: Add Keyboard Navigation to View
**Description:** Support keyboard navigation in the view.
```javascript
// No keyboard support
```

### Modify 33: Implement View History/Undo
**Description:** Add undo support for destructive actions.
```javascript
// No undo
```

### Modify 34: Create Notification MVC
**Description:** Create MVC for toast/notification messages.
```javascript
// Inline alert() calls
```

### Modify 35: Add Batch Updates to Model
**Description:** Batch multiple model changes into a single view update.
```javascript
// Each change triggers immediate view update
```

### Modify 36: Implement View Recycling
**Description:** Reuse DOM elements instead of creating new ones.
```javascript
// New elements created on every render
```

### Modify 37: Add Accessibility to View
**Description:** Add ARIA attributes and keyboard support to the view.
```javascript
// No accessibility
```

### Modify 38: Create Confirmation MVC
**Description:** Create MVC for the order confirmation page.
```javascript
// Confirmation in checkout view
```

### Modify 39: Add Model Rollback
**Description:** Add ability to roll back model changes on failure.
```javascript
// No rollback
```

### Modify 40: Implement View Component Composition
**Description:** Compose views from smaller reusable view components.
```javascript
// Monolithic views
```

### Modify 41: Add Form Validation MVC
**Description:** Create MVC for form validation.
```javascript
// Validation in controller
```

### Modify 42: Implement Lazy View Rendering
**Description:** Only render views when they're visible.
```javascript
// All views rendered immediately
```

### Modify 43: Add Viewport-Aware Rendering
**Description:** Only render items visible in the viewport.
```javascript
// All items rendered regardless of visibility
```

### Modify 44: Create Settings MVC
**Description:** Create MVC for user preferences/settings.
```javascript
// Settings not in MVC
```

### Modify 45: Add Drag and Drop to View
**Description:** Implement drag and drop in the view.
```javascript
// No drag and drop
```

### Modify 46: Implement Virtual Scrolling in View
**Description:** Use virtual scrolling for large lists.
```javascript
// All items rendered at once
```

### Modify 47: Add Model Snapshotting
**Description:** Take snapshots of model state for debugging.
```javascript
// No state history
```

### Modify 48: Create Discount MVC
**Description:** Create MVC for coupon/discount functionality.
```javascript
// Discount in cart controller
```

### Modify 49: Implement Optimistic Updates
**Description:** Update view immediately before API confirms.
```javascript
// Wait for API response before updating view
```

### Modify 50: Add Routing MVC
**Description:** Create a routing MVC component for navigation.
```javascript
// No routing pattern
```
