# Debugging Challenge - Level 42
## Module 9: DOM Events - Event Listeners, onclick

---

### Error 1: onclick set to function call instead of reference
**Description:** Attach a click handler that logs a message
```javascript
const btn = document.querySelector('#logBtn');
function logMessage() { console.log('Button clicked'); }
btn.onclick = logMessage();
```

### Error 2: onclick overwrites existing handler
**Description:** Add two click handlers to the same button
```javascript
const btn = document.querySelector('#multiBtn');
btn.onclick = function() { console.log('First'); };
btn.onclick = function() { console.log('Second'); };
```

### Error 3: addEventListener with parentheses
**Description:** Add a submit event to a form
```javascript
const form = document.querySelector('#myForm');
form.addEventListener('submit', handleSubmit());
function handleSubmit(e) { e.preventDefault(); }
```

### Error 4: Event listener not removed causing memory leak
**Description:** Add and remove a scroll listener
```javascript
function handleScroll() { console.log('Scrolling'); }
window.addEventListener('scroll', handleScroll);
window.removeEventListener('scroll', handleScroll);
```

### Error 5: DOM not loaded when script runs
**Description:** Access an element before the DOM is ready
```javascript
const heading = document.querySelector('h1');
heading.textContent = 'Page Title';
```

### Error 6: addEventListener with wrong event name
**Description:** Listen for a click event
```javascript
const btn = document.querySelector('#actionBtn');
btn.addEventListener('onclick', function() { alert('Clicked'); });
```

### Error 7: Missing event parameter in handler
**Description:** Prevent default link behavior
```javascript
const link = document.querySelector('a');
link.addEventListener('click', function() {
  preventDefault();
});
```

### Error 8: Anonymous function prevents removeEventListener
**Description:** Add a one-time click listener
```javascript
const btn = document.querySelector('#onceBtn');
btn.addEventListener('click', function() {
  alert('First click');
  btn.removeEventListener('click', this);
});
```

### Error 9: Incorrect this context in event handler
**Description:** Log the button text when clicked
```javascript
const btn = document.querySelector('#showText');
btn.addEventListener('click', function() {
  console.log(btn.textContent);
});
```

### Error 10: Event listener added to wrong element
**Description:** Detect clicks on a specific div
```javascript
const container = document.querySelector('.container');
const innerDiv = document.querySelector('.inner');
container.addEventListener('click', function(e) {
  if (e.target === innerDiv) {
    console.log('Inner clicked');
  }
});
```

### Error 11: Forgetting to prevent default on form
**Description:** Handle form submission with AJAX
```javascript
const form = document.querySelector('#signupForm');
form.addEventListener('submit', function() {
  const data = new FormData(form);
  console.log(data);
});
```

### Error 12: stopPropagation not called
**Description:** Prevent parent click when child is clicked
```javascript
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');
parent.addEventListener('click', () => console.log('Parent'));
child.addEventListener('click', () => console.log('Child'));
```

### Error 13: Multiple identical event listeners
**Description:** Add the same listener twice
```javascript
const btn = document.querySelector('#doubleBtn');
function handler() { console.log('Clicked'); }
btn.addEventListener('click', handler);
btn.addEventListener('click', handler);
```

### Error 14: Wrong event for detecting value change
**Description:** Log input value on every change
```javascript
const input = document.querySelector('#nameInput');
input.addEventListener('keypress', function() {
  console.log(this.value);
});
```

### Error 15: Event listener on removed element
**Description:** Add click to a dynamically removed element
```javascript
const btn = document.createElement('button');
btn.textContent = 'Click';
document.body.appendChild(btn);
document.body.removeChild(btn);
btn.addEventListener('click', () => alert('Still there?'));
```

### Error 16: onclick assigned before element exists
**Description:** Set up a button click handler
```javascript
document.querySelector('#setupBtn').onclick = function() {
  console.log('Setup complete');
};
```

### Error 17: Capturing vs bubbling confusion
**Description:** Handle event in capture phase
```javascript
const outer = document.querySelector('.outer');
outer.addEventListener('click', () => console.log('Outer'), true);
const inner = document.querySelector('.inner');
inner.addEventListener('click', () => console.log('Inner'));
```

### Error 18: preventDefault on non-cancelable event
**Description:** Try to prevent a custom event
```javascript
const evt = new Event('custom', { cancelable: false });
document.addEventListener('custom', function(e) {
  e.preventDefault();
  console.log('Prevented?');
});
document.dispatchEvent(evt);
```

### Error 19: Event listener with wrong handler signature
**Description:** Access the clicked element
```javascript
const container = document.querySelector('.container');
container.addEventListener('click', function(event, element) {
  console.log(element);
});
```

### Error 20: Not using event delegation
**Description:** Add click to each list item individually
```javascript
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', () => console.log(item.textContent));
});
```

### Error 21: removeEventListener with different function reference
**Description:** Remove a named handler
```javascript
const btn = document.querySelector('#removeBtn');
btn.addEventListener('click', function handleClick() {
  console.log('Clicked');
});
btn.removeEventListener('click', handleClick);
```

### Error 22: Event listener added in loop without closure
**Description:** Add click to buttons showing their index
```javascript
const buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    console.log('Button ' + i);
  });
}
```

### Error 23: Wrong event for DOM ready
**Description:** Execute code when DOM loads
```javascript
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('h1').textContent = 'Ready';
});
```

### Error 24: Missing event argument in arrow function
**Description:** Get mouse coordinates on click
```javascript
document.addEventListener('click', () => {
  console.log(event.clientX, event.clientY);
});
```

### Error 25: click event on disabled button
**Description:** Handle click on a disabled submit button
```javascript
const btn = document.querySelector('#submitBtn');
btn.disabled = true;
btn.addEventListener('click', () => console.log('Clicked'));
```

### Error 26: Event fired before listener attached
**Description:** Handle a load event on an image
```javascript
const img = document.querySelector('img');
img.addEventListener('load', () => console.log('Loaded'));
img.src = 'image.jpg';
```

### Error 27: Submit event on wrong element
**Description:** Handle form submission on button instead of form
```javascript
const btn = document.querySelector('#submitBtn');
btn.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('Submitted');
});
```

### Error 28: Not returning false from onclick attribute
**Description:** Prevent link navigation
```javascript
const link = document.querySelector('a');
link.onclick = function() { return false; };
```

### Error 29: MouseEvent button property confusion
**Description:** Detect right-click on an element
```javascript
const el = document.querySelector('.click-area');
el.addEventListener('click', function(e) {
  if (e.button === 2) console.log('Right click');
});
```

### Error 30: Scroll event performance issue
**Description:** Log scroll position continuously
```javascript
window.addEventListener('scroll', function() {
  console.log(window.scrollY);
});
```

### Error 31: Change event on text input
**Description:** Log input value in real-time
```javascript
const input = document.querySelector('#liveInput');
input.addEventListener('change', function() {
  console.log(this.value);
});
```

### Error 32: Resize event on wrong target
**Description:** Log window dimensions on resize
```javascript
const div = document.querySelector('.container');
div.addEventListener('resize', () => console.log('Resized'));
```

### Error 33: Event propagation stopped incorrectly
**Description:** Stop all event propagation
```javascript
const btn = document.querySelector('#stopBtn');
btn.addEventListener('click', function(e) {
  e.stopPropagation();
  e.stopImmediatePropagation();
});
```

### Error 34: Keydown event not checking key
**Description:** Submit form on Enter key
```javascript
const input = document.querySelector('#searchInput');
input.addEventListener('keydown', function(e) {
  console.log('Key pressed');
});
```

### Error 35: Event listener memory leak with closures
**Description:** Create 1000 buttons with listeners
```javascript
for (let i = 0; i < 1000; i++) {
  const btn = document.createElement('button');
  btn.addEventListener('click', () => console.log(i));
  document.body.appendChild(btn);
}
```

### Error 36: Focus event not bubbling
**Description:** Detect focus on any input in a form
```javascript
const form = document.querySelector('#myForm');
form.addEventListener('focus', function(e) {
  console.log('Focused on', e.target);
});
```

### Error 37: Double event firing from nested elements
**Description:** Handle click on a button inside a label
```javascript
const label = document.querySelector('label');
const btn = document.querySelector('#nestedBtn');
label.addEventListener('click', () => console.log('Label'));
btn.addEventListener('click', () => console.log('Button'));
```

### Error 38: Touch event on desktop
**Description:** Detect swipe gesture
```javascript
const el = document.querySelector('.swipe-area');
el.addEventListener('touchstart', function(e) {
  console.log('Touch started');
});
```

### Error 39: Event listener added inside another listener
**Description:** Show a tooltip on first click
```javascript
const btn = document.querySelector('#tooltipBtn');
btn.addEventListener('click', function() {
  const tooltip = document.createElement('div');
  document.body.appendChild(tooltip);
  tooltip.addEventListener('click', function() {
    console.log('Tooltip clicked');
  });
});
```

### Error 40: Wrong this in arrow function event handler
**Description:** Log the element that was clicked
```javascript
const btn = document.querySelector('#showMe');
btn.addEventListener('click', () => {
  console.log(this.textContent);
});
```

### Error 41: Event.preventDefault called on keydown
**Description:** Allow only numbers in an input
```javascript
const input = document.querySelector('#numberInput');
input.addEventListener('keydown', function(e) {
  if (isNaN(e.key)) {
    e.preventDefault();
  }
});
```

### Error 42: Input event with wrong property
**Description:** Get the current input value
```javascript
const input = document.querySelector('#textField');
input.addEventListener('input', function(e) {
  console.log(e.target.textContent);
});
```

### Error 43: Click event on invisible element
**Description:** Detect click on a hidden overlay
```javascript
const overlay = document.querySelector('.overlay');
overlay.style.display = 'none';
overlay.addEventListener('click', () => console.log('Overlay clicked'));
```

### Error 44: Beforeunload with wrong return
**Description:** Confirm before leaving the page
```javascript
window.addEventListener('beforeunload', function(e) {
  return 'Are you sure?';
});
```

### Error 45: Mouseover vs mouseenter confusion
**Description:** Highlight element on hover without bubbling
```javascript
const item = document.querySelector('.menu-item');
item.addEventListener('mouseover', function() {
  this.classList.add('highlight');
});
```

### Error 46: Event handler not bound after clone
**Description:** Clone a button and keep its click handler
```javascript
const btn = document.querySelector('#cloneBtn');
btn.addEventListener('click', () => alert('Clicked'));
const clone = btn.cloneNode(true);
document.body.appendChild(clone);
```

### Error 47: Submit handler not preventing default
**Description:** Validate form before submission
```javascript
const form = document.querySelector('#loginForm');
form.addEventListener('submit', function() {
  const email = document.querySelector('#email').value;
  if (!email.includes('@')) {
    console.log('Invalid email');
  }
});
```

### Error 48: Error event not handled
**Description:** Handle image load failure
```javascript
const img = document.querySelector('img');
img.addEventListener('error', function() {
  this.src = 'fallback.jpg';
});
```

### Error 49: Animationend event misspelling
**Description:** Remove element after animation
```javascript
const box = document.querySelector('.animated-box');
box.addEventListener('animationend', function() {
  this.remove();
});
```

### Error 50: Transitionend with multiple properties
**Description:** Log when a transition completes
```javascript
const el = document.querySelector('.transition-el');
el.addEventListener('transitionend', function() {
  console.log('Transition ended');
});
```

### Error 51: Hashchange event not updating content
**Description:** Change content based on URL hash
```javascript
window.addEventListener('hashchange', function() {
  const section = document.querySelector(window.location.hash);
  section.style.display = 'block';
});
```

### Error 52: Popstate event not triggered
**Description:** Handle browser back button
```javascript
window.addEventListener('popstate', function() {
  console.log('Back button pressed');
});
```

### Error 53: Online event not detected
**Description:** Show online/offline status
```javascript
window.addEventListener('offline', function() {
  document.querySelector('.status').textContent = 'Offline';
});
```

### Error 54: Copy event preventing default
**Description:** Prevent copying content
```javascript
document.addEventListener('copy', function(e) {
  e.preventDefault();
});
```

### Error 55: Paste event sanitization
**Description:** Clean pasted HTML content
```javascript
const editor = document.querySelector('.editor');
editor.addEventListener('paste', function(e) {
  const text = e.clipboardData.getData('text/html');
  e.preventDefault();
  document.execCommand('insertText', false, text);
});
```

### Error 56: Drag and drop events order
**Description:** Handle file drop zone
```javascript
const dropZone = document.querySelector('.drop-zone');
dropZone.addEventListener('dragenter', () => console.log('Enter'));
dropZone.addEventListener('dragover', (e) => e.preventDefault());
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  console.log('Dropped');
});
```

### Error 57: Focusout event bubbling
**Description:** Validate input on focus loss
```javascript
const input = document.querySelector('#validatedInput');
input.addEventListener('focusout', function() {
  if (this.value.length < 3) {
    console.log('Too short');
  }
});
```

### Error 58: Wheel event delta mode
**Description:** Detect scroll direction
```javascript
const area = document.querySelector('.scroll-area');
area.addEventListener('wheel', function(e) {
  if (e.deltaY > 0) console.log('Down');
  else console.log('Up');
});
```

### Error 59: Toggle event on details element
**Description:** React to details/summary toggle
```javascript
const details = document.querySelector('details');
details.addEventListener('toggle', function() {
  console.log('Toggled:', this.open);
});
```

### Error 60: Playing event on video
**Description:** Track video playback
```javascript
const video = document.querySelector('video');
video.addEventListener('play', function() {
  console.log('Video started');
});
```

### Error 61: Fullscreenchange event
**Description:** Detect fullscreen mode
```javascript
document.addEventListener('fullscreenchange', function() {
  console.log('Fullscreen:', document.fullscreen);
});
```

### Error 62: Visibilitychange for page visibility
**Description:** Pause video when tab hidden
```javascript
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    video.pause();
  }
});
```

### Error 63: Message event from postMessage
**Description:** Receive cross-origin messages
```javascript
window.addEventListener('message', function(e) {
  if (e.origin === 'https://example.com') {
    console.log(e.data);
  }
});
```

### Error 64: Storage event synchronization
**Description:** Sync across tabs
```javascript
window.addEventListener('storage', function(e) {
  console.log(e.key, e.newValue);
});
```

### Error 65: Playing audio with user gesture
**Description:** Auto-play muted video
```javascript
const video = document.querySelector('video');
video.play();
```

### Error 66: ResizeObserver missing
**Description:** Detect element size changes
```javascript
const box = document.querySelector('.resizable');
box.addEventListener('resize', () => console.log('Resized'));
```

### Error 67: Scrollend event not supported
**Description:** Detect when scrolling stops
```javascript
const container = document.querySelector('.scroll-container');
container.addEventListener('scroll', function() {
  clearTimeout(this.scrollTimer);
  this.scrollTimer = setTimeout(() => console.log('Scroll ended'), 150);
});
```

### Error 68: Pointer events vs mouse events
**Description:** Handle both mouse and touch
```javascript
const el = document.querySelector('.interactive');
el.addEventListener('pointerdown', function(e) {
  console.log('Pointer:', e.pointerType);
});
```

### Error 69: Slotchange event on web components
**Description:** Detect slot content changes
```javascript
const slot = document.querySelector('slot');
slot.addEventListener('slotchange', function() {
  console.log('Slot changed');
});
```

### Error 70: Invalid event listener options
**Description:** Add passive scroll listener
```javascript
window.addEventListener('scroll', handler, { passive: true, once: true });
```

---

### Issue 1: Using onclick attribute in HTML
**Description:** Add click behavior to submit button
```javascript
<button onclick="submitForm()">Submit</button>
```

### Issue 2: Inline event handlers in JS strings
**Description:** Create button dynamically with onclick
```javascript
const html = '<button onclick="handleClick()">Click</button>';
```

### Issue 3: Not using event delegation for dynamic elements
**Description:** Add click to list items that don't exist yet
```javascript
document.querySelectorAll('.dynamic-item').forEach(el => {
  el.addEventListener('click', handler);
});
```

### Issue 4: Multiple event listeners creating duplicates
**Description:** Attach the same handler on every render
```javascript
function render() {
  button.innerHTML = 'Click';
  button.addEventListener('click', handleClick);
}
```

### Issue 5: Not removing event listeners on cleanup
**Description:** Clean up component
```javascript
function destroy() {
  element.remove();
  // Event listeners still attached
}
```

### Issue 6: Event listener inside loop without closure fix
**Description:** Create buttons with different actions
```javascript
for (var i = 0; i < 5; i++) {
  btn.addEventListener('click', () => console.log(i));
}
```

### Issue 7: Using return false instead of preventDefault
**Description:** Stop form submission
```javascript
form.onsubmit = function() { return false; };
```

### Issue 8: Not using event delegation on dynamic content
**Description:** Handle clicks on a list that gets new items
```javascript
list.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    console.log('Item clicked');
  }
});
```

### Issue 9: Attaching same event type multiple times
**Description:** Add multiple click handlers
```javascript
btn.addEventListener('click', handler1);
btn.addEventListener('click', handler2);
btn.addEventListener('click', handler3);
```

### Issue 10: Not checking event target in delegation
**Description:** Handle click on any child
```javascript
parent.addEventListener('click', function(e) {
  console.log('Clicked something');
});
```

### Issue 11: Using deprecated event properties
**Description:** Get mouse coordinates
```javascript
document.addEventListener('click', function(e) {
  console.log(e.pageX, e.pageY);
});
```

### Issue 12: Event listener on window instead of element
**Description:** Handle clicks on a specific button
```javascript
window.addEventListener('click', function(e) {
  if (e.target.id === 'myButton') {
    console.log('Clicked');
  }
});
```

### Issue 13: Not using once option for one-time events
**Description:** Handle first click only
```javascript
btn.addEventListener('click', function() {
  alert('First click');
  btn.removeEventListener('click', this);
});
```

### Issue 14: Throwing errors in event handlers
**Description:** Handle JSON parsing in click handler
```javascript
btn.addEventListener('click', function() {
  const data = JSON.parse(localStorage.getItem('data'));
  console.log(data);
});
```

### Issue 15: Event listener preventing garbage collection
**Description:** Create and remove elements
```javascript
function createWidget() {
  const widget = document.createElement('div');
  document.body.appendChild(widget);
  widget.addEventListener('click', function() {
    console.log(widget.dataset.id);
  });
  document.body.removeChild(widget);
}
```

### Issue 16: Using setAttribute for event handlers
**Description:** Add click via setAttribute
```javascript
btn.setAttribute('onclick', 'alert("Clicked")');
```

### Issue 17: Not using passive listeners for scroll
**Description:** Improve scroll performance
```javascript
window.addEventListener('scroll', handler);
```

### Issue 18: Event handler with side effects
**Description:** Toggle class on click
```javascript
btn.addEventListener('click', function() {
  this.classList.toggle('active');
  saveToDatabase(this.id);
  sendAnalytics('click');
  updateUI();
});
```

### Issue 19: Not handling event errors gracefully
**Description:** Fetch data on button click
```javascript
submitBtn.addEventListener('click', async function() {
  const response = await fetch('/api/data');
  const data = await response.json();
  console.log(data);
});
```

### Issue 20: Using event.type in conditionals
**Description:** Handle different event types
```javascript
function handler(e) {
  if (e.type === 'click') doClick();
  else if (e.type === 'dblclick') doDblClick();
}
```

### Issue 21: Not using KeyboardEvent.key
**Description:** Detect Enter key press
```javascript
input.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) submitForm();
});
```

### Issue 22: Event handler modifying DOM in loop
**Description:** Update elements on each click
```javascript
btn.addEventListener('click', function() {
  for (let i = 0; i < items.length; i++) {
    items[i].textContent = 'Updated';
  }
});
```

### Issue 23: Not debouncing resize events
**Description:** Handle window resize
```javascript
window.addEventListener('resize', function() {
  console.log(window.innerWidth);
});
```

### Issue 24: Using event.srcElement
**Description:** Get the target of an event
```javascript
parent.addEventListener('click', function(e) {
  console.log(e.srcElement);
});
```

### Issue 25: Event listener in constructor
**Description:** Add listener in class constructor
```javascript
class Widget {
  constructor() {
    document.addEventListener('click', this.handleClick);
  }
}
```

### Issue 26: Not using capture for focus events
**Description:** Detect focus on any input
```javascript
document.addEventListener('focusin', function(e) {
  console.log('Focus on', e.target);
});
```

### Issue 27: Multiple window load listeners
**Description:** Run code on page load
```javascript
window.addEventListener('load', init);
window.addEventListener('load', setupAnalytics);
window.addEventListener('load', loadData);
```

### Issue 28: Not checking clipboard API support
**Description:** Copy text to clipboard
```javascript
navigator.clipboard.writeText('Copied!');
```

### Issue 29: Event handler without error boundary
**Description:** Parse JSON in event
```javascript
btn.addEventListener('click', function() {
  const settings = JSON.parse(localStorage.settings);
  applySettings(settings);
});
```

### Issue 30: Using HTML event handler attributes
**Description:** Call multiple functions on click
```javascript
<button onclick="func1(); func2(); func3()">Click</button>
```

---

### Modify 1: Convert onclick to addEventListener
**Description:** Attach a click handler to a button
```javascript
const btn = document.querySelector('#clickBtn');
btn.onclick = function() { alert('Clicked'); };
```

### Modify 2: Remove an event listener properly
**Description:** Add and then remove a click handler
```javascript
const btn = document.querySelector('#tempBtn');
function handleClick() { console.log('Clicked'); }
btn.addEventListener('click', handleClick);
```

### Modify 3: Fix the event listener reference error
**Description:** Log when a form is submitted
```javascript
const form = document.querySelector('#signup');
form.addEventListener('submit', handleSubmit());
function handleSubmit(e) {
  e.preventDefault();
  console.log('Submitted');
}
```

### Modify 4: Add event delegation for a dynamic list
**Description:** Handle clicks on list items that may be added later
```javascript
const list = document.querySelector('#itemList');
```

### Modify 5: Prevent default link behavior
**Description:** Stop a link from navigating
```javascript
const link = document.querySelector('#myLink');
link.addEventListener('click', function() {
  console.log('Link clicked');
});
```

### Modify 6: Add a passive scroll listener
**Description:** Improve scroll performance
```javascript
window.addEventListener('scroll', function() {
  console.log(window.scrollY);
});
```

### Modify 7: Use event delegation for buttons
**Description:** Handle clicks on all buttons in a container
```javascript
const toolbar = document.querySelector('.toolbar');
```

### Modify 8: Add a one-time event listener
**Description:** Handle the first click only
```javascript
const btn = document.querySelector('#oneClickBtn');
```

### Modify 9: Fix the event listener memory leak
**Description:** Clean up listeners when removing element
```javascript
function createWidget() {
  const widget = document.createElement('div');
  widget.addEventListener('click', () => console.log('Widget'));
  document.body.appendChild(widget);
  return widget;
}
```

### Modify 10: Add keyboard event for Escape
**Description:** Close modal on Escape key
```javascript
const modal = document.querySelector('#myModal');
```

### Modify 11: Add a debounced input handler
**Description:** Search as user types with delay
```javascript
const searchInput = document.querySelector('#searchBox');
```

### Modify 12: Fix the closure in a loop
**Description:** Add click handlers to buttons with their index
```javascript
const buttons = document.querySelectorAll('.item-btn');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    console.log('Item ' + i);
  });
}
```

### Modify 13: Add form validation on submit
**Description:** Validate email before form submission
```javascript
const form = document.querySelector('#emailForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();
});
```

### Modify 14: Use once option for event
**Description:** Show welcome message on first click
```javascript
const welcomeBtn = document.querySelector('#welcomeBtn');
```

### Modify 15: Fix the event name typo
**Description:** Listen for mouse click
```javascript
const btn = document.querySelector('#actionBtn');
btn.addEventListener('onclick', function() { console.log('Action'); });
```

### Modify 16: Add a context menu handler
**Description:** Show custom context menu
```javascript
const target = document.querySelector('.context-target');
```

### Modify 17: Add a drag-and-drop handler
**Description:** Make an element droppable
```javascript
const dropZone = document.querySelector('#dropTarget');
```

### Modify 18: Fix the missing event parameter
**Description:** Get the clicked element's text
```javascript
const container = document.querySelector('.gallery');
container.addEventListener('click', function() {
  console.log(target.textContent);
});
```

### Modify 19: Add a visibility change handler
**Description:** Pause video when tab is hidden
```javascript
const video = document.querySelector('video');
```

### Modify 20: Add a media query match listener
**Description:** React to screen size changes
```javascript
const mq = window.matchMedia('(max-width: 600px)');
```

### Modify 21: Fix the addEventListener on wrong element
**Description:** Handle click on the close button in a modal
```javascript
const modal = document.querySelector('#modal');
const closeBtn = modal.querySelector('.close-btn');
document.addEventListener('click', closeModal);
```

### Modify 22: Add a transition end handler
**Description:** Remove element after slide-out transition
```javascript
const panel = document.querySelector('.slide-panel');
panel.classList.add('slide-out');
```

### Modify 23: Fix the this context in event handler
**Description:** Log the button text when clicked
```javascript
const btn = document.querySelector('#textBtn');
btn.addEventListener('click', () => {
  console.log(this.textContent);
});
```

### Modify 24: Add an intersection observer for lazy loading
**Description:** Load image when it becomes visible
```javascript
const lazyImage = document.querySelector('.lazy-img');
```

### Modify 25: Fix the multiple event listeners issue
**Description:** Attach click handler without duplicates on re-render
```javascript
function render() {
  const btn = document.querySelector('#saveBtn');
  btn.addEventListener('click', saveData);
}
```

### Modify 26: Add a pointer lock handler
**Description:** Lock pointer for game controls
```javascript
const gameArea = document.querySelector('#game');
```

### Modify 27: Add a beforeunload handler
**Description:** Warn about unsaved changes
```javascript
const form = document.querySelector('#editForm');
```

### Modify 28: Fix the event listener with wrong method name
**Description:** Listen for click events
```javascript
const btn = document.querySelector('#myBtn');
btn.addEventListener('click', handleClick);
btn.removeEventListener('click', handleClick);
```

### Modify 29: Add a hash change handler
**Description:** Navigate to section based on URL hash
```javascript
window.addEventListener('hashchange', function() {
  const sectionId = window.location.hash;
});
```

### Modify 30: Add a mutation observer for DOM changes
**Description:** React to new comments being added
```javascript
const commentSection = document.querySelector('#comments');
```

### Modify 31: Fix the stopPropagation usage
**Description:** Prevent parent click when child is clicked
```javascript
const child = document.querySelector('.child');
child.addEventListener('click', function(e) {
  console.log('Child clicked');
});
```

### Modify 32: Add a copy event handler
**Description:** Show a tooltip when content is copied
```javascript
const codeBlock = document.querySelector('pre code');
```

### Modify 33: Add a paste sanitization handler
**Description:** Strip HTML from pasted text
```javascript
const richEditor = document.querySelector('.editor');
```

### Modify 34: Fix the inline onclick refactor
**Description:** Move inline handler to addEventListener
```javascript
function submitForm() { console.log('Submitted'); }
// <button onclick="submitForm()">Submit</button>
```

### Modify 35: Add a focus trap handler
**Description:** Keep focus inside a modal dialog
```javascript
const dialog = document.querySelector('#myDialog');
```

### Modify 36: Add a resize observer
**Description:** Adjust layout when container size changes
```javascript
const sidebar = document.querySelector('.sidebar');
```

### Modify 37: Fix the event listener not being called
**Description:** Handle click on dynamically created button
```javascript
function addButton() {
  const btn = document.createElement('button');
  btn.textContent = 'New';
  document.body.appendChild(btn);
  btn.onclick = handleClick;
}
```

### Modify 38: Add a custom event dispatch
**Description:** Trigger a custom event when data loads
```javascript
const dataContainer = document.querySelector('#data');
function loadData() {
  // data loaded here
}
```

### Modify 39: Add an animation event listener
**Description:** Loop an animation when it ends
```javascript
const animated = document.querySelector('.bounce');
```

### Modify 40: Fix the input event type
**Description:** React to every character typed
```javascript
const input = document.querySelector('#typeHere');
input.addEventListener('change', function() {
  console.log(this.value);
});
```

### Modify 41: Add keyboard shortcut handler
**Description:** Save on Ctrl+S
```javascript
document.addEventListener('keydown', function(e) {
  // handle Ctrl+S
});
```

### Modify 42: Add a touch event handler
**Description:** Detect swipe direction on mobile
```javascript
const slider = document.querySelector('.carousel');
```

### Modify 43: Fix the event handler with wrong arguments
**Description:** Pass additional data to handler
```javascript
const btn = document.querySelector('#dataBtn');
function handleClick(id, name) {
  console.log(id, name);
}
btn.addEventListener('click', handleClick(42, 'Alice'));
```

### Modify 44: Add an error event handler for images
**Description:** Show fallback image on error
```javascript
const profileImg = document.querySelector('.profile-pic');
profileImg.src = 'avatar.jpg';
```

### Modify 45: Add a storage event listener
**Description:** Sync settings across tabs
```javascript
const theme = document.querySelector('.theme-toggle');
```

### Modify 46: Fix the missing passive option
**Description:** Optimize touch scroll
```javascript
document.addEventListener('touchstart', function(e) {
  console.log('Touch');
});
```

### Modify 47: Add a scrollend polyfill
**Description:** Detect when scrolling stops
```javascript
const scrollContainer = document.querySelector('.scrollable');
scrollContainer.addEventListener('scroll', function() {
  // detect scroll end
});
```

### Modify 48: Add a form reset handler
**Description:** Clear form and show confirmation
```javascript
const form = document.querySelector('#settingsForm');
```

### Modify 49: Fix the event handler with wrong context
**Description:** Use the element that was clicked
```javascript
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', function() {
    console.log(this.textContent);
  });
});
```

### Modify 50: Add a window focus handler
**Description:** Refresh data when window gains focus
```javascript
window.addEventListener('focus', function() {
  console.log('Window focused');
});
