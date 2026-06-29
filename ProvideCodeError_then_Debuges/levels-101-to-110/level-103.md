# Debugging Challenges - Level 103
## Theme: HTML Page Generator with JS Variables

---

### Error 1: Missing document.write variable
**Description:** Should write a variable to the document
```javascript
let title = "My Page";
document.write(<h1> + title + </h1>);
```

### Error 2: innerHTML typo
**Description:** Should set HTML content of element
```javascript
document.getElementById("main").innerHTMl = "<p>Hello</p>";
```

### Error 3: getElementById missing quotes
**Description:** Should get element by its ID
```javascript
let el = document.getElementById(main);
el.textContent = "Hello";
```

### Error 4: createElement syntax
**Description:** Should create a new div element
```javascript
let div = document.createElement(div);
div.textContent = "New div";
```

### Error 5: appendChild typo
**Description:** Should append child to body
```javascript
let p = document.createElement("p");
document.body.appendchild(p);
```

### Error 6: querySelector with wrong prefix
**Description:** Should select element by class
```javascript
let el = document.querySelector("#myClass");
```

### Error 7: classList typo
**Description:** Should add a CSS class to element
```javascript
let el = document.getElementById("box");
el.classList.add("highlight");
```

### Error 8: style property case
**Description:** Should set background color
```javascript
let el = document.getElementById("box");
el.style.background-color = "red";
```

### Error 9: textContent vs innerHTML
**Description:** Should set HTML content, not text
```javascript
let el = document.getElementById("main");
el.textContent = "<strong>Bold text</strong>";
```

### Error 10: setAttribute wrong order
**Description:** Should set href attribute on link
```javascript
let link = document.getElementById("myLink");
link.setAttribute("https://example.com", "href");
```

### Error 11: removeChild missing parent
**Description:** Should remove a child element
```javascript
let child = document.getElementById("child");
document.removeChild(child);
```

### Error 12: insertBefore arguments wrong
**Description:** Should insert new element before reference
```javascript
let parent = document.getElementById("list");
let newItem = document.createElement("li");
let ref = document.getElementById("first");
parent.insertBefore(ref, newItem);
```

### Error 13: getElementsByClassName typo
**Description:** Should get all elements with class "item"
```javascript
let items = document.getElementsByClass("item");
console.log(items.length);
```

### Error 14: getElementsByTagName plural
**Description:** Should get all div elements
```javascript
let divs = document.getElementsByTagName("div");
console.log(divs[0]);
```

### Error 15: childNodes vs children
**Description:** Should get only element children
```javascript
let parent = document.getElementById("list");
console.log(parent.childNodes.length);
```

### Error 16: parentNode typo
**Description:** Should get parent of element
```javascript
let child = document.getElementById("child");
console.log(child.parent);
```

### Error 17: nextSibling vs nextElementSibling
**Description:** Should get next element sibling
```javascript
let el = document.getElementById("first");
console.log(el.nextSibling);
```

### Error 18: previousSibling typo
**Description:** Should get previous element sibling
```javascript
let el = document.getElementById("second");
console.log(el.previousSibling);
```

### Error 19: firstChild vs firstElementChild
**Description:** Should get first child element
```javascript
let parent = document.getElementById("list");
console.log(parent.firstChild);
```

### Error 20: lastChild vs lastElementChild
**Description:** Should get last child element
```javascript
let parent = document.getElementById("list");
console.log(parent.lastChild);
```

### Error 21: cloneNode depth missing
**Description:** Should deep clone an element
```javascript
let original = document.getElementById("original");
let clone = original.cloneNode();
document.body.appendChild(clone);
```

### Error 22: replaceChild arguments
**Description:** Should replace old child with new
```javascript
let parent = document.getElementById("parent");
let old = document.getElementById("old");
let newEl = document.createElement("div");
parent.replaceChild(old, newEl);
```

### Error 23: hasChildNodes check
**Description:** Should check if element has children
```javascript
let el = document.getElementById("test");
if (el.hasChildNodes) {
  console.log("has children");
}
```

### Error 24: contains method
**Description:** Should check if parent contains child
```javascript
let parent = document.getElementById("parent");
let child = document.getElementById("child");
console.log(parent.contains(child));
```

### Error 25: isEqualNode usage
**Description:** Should compare two elements for equality
```javascript
let a = document.getElementById("a");
let b = document.getElementById("b");
console.log(a.isEqualNode);
```

### Error 26: matches selector
**Description:** Should check if element matches CSS selector
```javascript
let el = document.getElementById("test");
console.log(el.matches);
```

### Error 27: closest selector
**Description:** Should find closest ancestor matching selector
```javascript
let el = document.getElementById("child");
console.log(el.closest);
```

### Error 28: getAttribute typo
**Description:** Should get value of data attribute
```javascript
let el = document.getElementById("test");
console.log(el.getAttribute("data-value"));
```

### Error 29: removeAttribute typo
**Description:** Should remove class attribute
```javascript
let el = document.getElementById("test");
el.removeAttribute("class");
```

### Error 30: hasAttribute typo
**Description:** Should check if element has href attribute
```javascript
let link = document.getElementById("myLink");
console.log(link.hasAttribute("href"));
```

### Error 31: dataset property
**Description:** Should access data-value attribute via dataset
```javascript
let el = document.getElementById("test");
console.log(el.dataset.value);
```

### Error 32: classList toggle
**Description:** Should toggle a class on element
```javascript
let el = document.getElementById("box");
el.classList.toggle;
```

### Error 33: classList contains
**Description:** Should check if element has class
```javascript
let el = document.getElementById("box");
console.log(el.classList.contains);
```

### Error 34: className assignment
**Description:** Should replace all classes with new one
```javascript
let el = document.getElementById("box");
el.className = "new-class";
```

### Error 35: id property assignment
**Description:** Should change element's id
```javascript
let el = document.getElementById("oldId");
el.id = "newId";
```

### Error 36: tagName property
**Description:** Should get element's tag name
```javascript
let el = document.getElementById("test");
console.log(el.tagName);
```

### Error 37: innerHTML injection XSS
**Description:** Should safely set user input as text
```javascript
let userInput = "<script>alert('xss')</script>";
document.getElementById("output").innerHTML = userInput;
```

### Error 38: createTextNode vs textContent
**Description:** Should create a text node
```javascript
let text = document.createTextNode("hello");
document.body.appendChild(text);
```

### Error 39: insertAdjacentHTML position
**Description:** Should insert HTML after element
```javascript
let el = document.getElementById("test");
el.insertAdjacentHTML("afterend", "<p>after</p>");
```

### Error 40: insertAdjacentElement position typo
**Description:** Should insert element before element
```javascript
let el = document.getElementById("test");
let newEl = document.createElement("div");
el.insertAdjacentElement("beforebegin", newEl);
```

### Error 41: scrollIntoView typo
**Description:** Should scroll element into view
```javascript
let el = document.getElementById("bottom");
el.scrollIntoView();
```

### Error 42: focus method
**Description:** Should focus on an input element
```javascript
let input = document.getElementById("name");
input.focus;
```

### Error 43: blur method
**Description:** Should remove focus from element
```javascript
let input = document.getElementById("name");
input.blur;
```

### Error 44: click method
**Description:** Should programmatically click a button
```javascript
let btn = document.getElementById("submit");
btn.click;
```

### Error 45: offsetWidth vs clientWidth
**Description:** Should get width including padding and border
```javascript
let el = document.getElementById("box");
console.log(el.clientWidth);
```

### Error 46: offsetHeight vs clientHeight
**Description:** Should get height including padding but not border
```javascript
let el = document.getElementById("box");
console.log(el.offsetHeight);
```

### Error 47: getBoundingClientRect typo
**Description:** Should get element position relative to viewport
```javascript
let el = document.getElementById("box");
console.log(el.getBoundingClientRect());
```

### Error 48: scrollTop assignment
**Description:** Should scroll element to top position
```javascript
let el = document.getElementById("container");
el.scrollTop = 0;
```

### Error 49: scrollLeft assignment
**Description:** Should scroll element horizontally
```javascript
let el = document.getElementById("container");
el.scrollLeft = 100;
```

### Error 50: addEventListener typo
**Description:** Should add click event listener
```javascript
let btn = document.getElementById("myBtn");
btn.addEventListener("click", function() {
  console.log("clicked");
});
```

### Error 51: removeEventListener typo
**Description:** Should remove event listener
```javascript
function handler() { console.log("clicked"); }
let btn = document.getElementById("myBtn");
btn.addEventListener("click", handler);
btn.removeEventListener(handler);
```

### Error 52: event object usage
**Description:** Should get target of event
```javascript
document.getElementById("btn").addEventListener("click", function(e) {
  console.log(e.Target);
});
```

### Error 53: preventDefault typo
**Description:** Should prevent form submission
```javascript
document.getElementById("form").addEventListener("submit", function(e) {
  e.preventdefault();
});
```

### Error 54: stopPropagation typo
**Description:** Should stop event propagation
```javascript
document.getElementById("child").addEventListener("click", function(e) {
  e.stopPropagation();
});
```

### Error 55: window.onload assignment
**Description:** Should execute code when page loads
```javascript
window.onload = function() {
  console.log("loaded");
};
```

### Error 56: DOMContentLoaded typo
**Description:** Should run when DOM is ready
```javascript
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM ready");
});
```

### Error 57: setTimeout syntax
**Description:** Should run function after 1 second
```javascript
setTimeout(function() {
  console.log("done");
}, 1000);
```

### Error 58: setInterval clear
**Description:** Should stop interval after 3 executions
```javascript
let count = 0;
let id = setInterval(function() {
  count++;
  console.log(count);
  if (count === 3) clearInterval();
}, 1000);
```

### Error 59: requestAnimationFrame typo
**Description:** Should request animation frame
```javascript
function animate() {
  console.log("frame");
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

### Error 60: location.href assignment
**Description:** Should navigate to new URL
```javascript
window.location.href = "https://example.com";
```

### Error 61: location.reload typo
**Description:** Should reload the page
```javascript
location.reload(true);
```

### Error 62: history.back typo
**Description:** Should go back in browser history
```javascript
history.back;
```

### Error 63: navigator.userAgent
**Description:** Should get browser user agent
```javascript
console.log(navigator.userAgent);
```

### Error 64: screen.width typo
**Description:** Should get screen width
```javascript
console.log(screen.width);
```

### Error 65: cookie read access
**Description:** Should read document cookies
```javascript
console.log(document.cookie);
```

### Error 66: localStorage typo
**Description:** Should store data in local storage
```javascript
localStorage.setItem("key", "value");
console.log(localStorage.getItem("key"));
```

### Error 67: sessionStorage vs localStorage
**Description:** Should use session storage
```javascript
sessionStorage.setItem("key", "value");
console.log(sessionStorage.getItem("key"));
```

### Error 68: JSON parse typo
**Description:** Should parse JSON string
```javascript
let json = '{"name": "John"}';
console.log(JSON.parse(json));
```

### Error 69: JSON stringify typo
**Description:** Should convert object to JSON
```javascript
let obj = {name: "John", age: 30};
console.log(JSON.stringify(obj));
```

### Error 70: FormData usage
**Description:** Should create form data from form element
```javascript
let form = document.getElementById("myForm");
let data = new FormData(form);
console.log(data.get("username"));
```

---

### Issue 1: Append in wrong order
**Description:** Should append items in correct order (1, 2, 3)
```javascript
let list = document.getElementById("list");
for (let i = 1; i <= 3; i++) {
  let li = document.createElement("li");
  li.textContent = i;
  list.appendChild(li);
}
```

### Issue 2: Overwriting innerHTML
**Description:** Should add new content without removing existing
```javascript
let div = document.getElementById("output");
div.innerHTML = "<p>First</p>";
div.innerHTML = "<p>Second</p>";
```

### Issue 3: Creating elements in loop but not appending
**Description:** Should append all created elements
```javascript
let parent = document.getElementById("list");
for (let i = 0; i < 5; i++) {
  let li = document.createElement("li");
  li.textContent = "Item " + i;
}
```

### Issue 4: Multiple IDs
**Description:** Should create unique IDs for each element
```javascript
for (let i = 0; i < 3; i++) {
  let div = document.createElement("div");
  div.id = "item";
  document.body.appendChild(div);
}
```

### Issue 5: Wrong selector for multiple elements
**Description:** Should select all elements with class "item"
```javascript
let items = document.querySelector(".item");
console.log(items.length);
```

### Issue 6: Event listener inside loop
**Description:** Each button should log its own number
```javascript
for (let i = 0; i < 3; i++) {
  let btn = document.createElement("button");
  btn.textContent = i;
  btn.addEventListener("click", function() {
    console.log(i);
  });
  document.body.appendChild(btn);
}
```

### Issue 7: innerHTML vs createElement for user data
**Description:** Should safely display user-provided text
```javascript
let userText = "<b>bold</b>";
document.getElementById("output").innerHTML = userText;
```

### Issue 8: Style property with camelCase
**Description:** Should set font-size using JavaScript
```javascript
let el = document.getElementById("text");
el.style.fontSize = "20px";
```

### Issue 9: getComputedStyle usage
**Description:** Should get computed style of element
```javascript
let el = document.getElementById("box");
let style = window.getComputedStyle(el);
console.log(style.width);
```

### Issue 10: classList.add with multiple classes
**Description:** Should add multiple classes at once
```javascript
let el = document.getElementById("box");
el.classList.add("class1", "class2", "class3");
```

### Issue 11: Selecting by attribute
**Description:** Should select element with data-role="main"
```javascript
let el = document.querySelector("[data-role=main]");
console.log(el);
```

### Issue 12: Creating table rows
**Description:** Should create table with 3 rows and 3 columns
```javascript
let table = document.createElement("table");
for (let r = 0; r < 3; r++) {
  let row = document.createElement("tr");
  for (let c = 0; c < 3; c++) {
    let cell = document.createElement("td");
    cell.textContent = `${r},${c}`;
  }
  table.appendChild(row);
}
document.body.appendChild(table);
```

### Issue 13: Fragment optimization not used
**Description:** Should use document fragment for batch adds
```javascript
let list = document.getElementById("list");
for (let i = 0; i < 100; i++) {
  let li = document.createElement("li");
  li.textContent = i;
  list.appendChild(li);
}
```

### Issue 14: Text node vs element
**Description:** Should append text as text node
```javascript
let div = document.getElementById("output");
div.appendChild("hello");
```

### Issue 15: Attribute vs property for checked
**Description:** Should set checkbox to checked
```javascript
let checkbox = document.getElementById("agree");
checkbox.setAttribute("checked", true);
```

### Issue 16: Form input value vs textContent
**Description:** Should get value of input element
```javascript
let input = document.getElementById("name");
console.log(input.textContent);
```

### Issue 17: Select option selected
**Description:** Should select option with value "2"
```javascript
let select = document.getElementById("choices");
select.value = 2;
```

### Issue 18: Disabled property
**Description:** Should disable a button
```javascript
let btn = document.getElementById("submit");
btn.disabled = "disabled";
```

### Issue 19: Placeholder vs value
**Description:** Should set placeholder, not value, on input
```javascript
let input = document.getElementById("search");
input.value = "Search...";
```

### Issue 20: Anchor href vs text
**Description:** Should set link text, not href, on anchor
```javascript
let link = document.getElementById("myLink");
link.href = "Click here";
```

### Issue 21: Image src assignment
**Description:** Should set image source
```javascript
let img = document.getElementById("photo");
img.src = "image.jpg";
```

### Issue 22: Image alt text missing
**Description:** Should set alt attribute on image
```javascript
let img = document.createElement("img");
img.src = "photo.jpg";
document.body.appendChild(img);
```

### Issue 23: Video source element
**Description:** Should set video source correctly
```javascript
let video = document.getElementById("myVideo");
video.src = "video.mp4";
```

### Issue 24: Audio playback
**Description:** Should play audio element
```javascript
let audio = document.getElementById("myAudio");
audio.play;
```

### Issue 25: Canvas context
**Description:** Should get 2D context from canvas
```javascript
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
console.log(ctx);
```

### Issue 26: Canvas drawing coordinates
**Description:** Should draw a rectangle at (10, 10) size 100x50
```javascript
let ctx = document.getElementById("c").getContext("2d");
ctx.fillRect(10, 10, 100, 50);
```

### Issue 27: Canvas fillStyle
**Description:** Should fill rectangle with red color
```javascript
let ctx = document.getElementById("c").getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 50, 50);
```

### Issue 28: SVG namespace
**Description:** Should create SVG circle element
```javascript
let circle = document.createElement("circle");
circle.setAttribute("cx", "50");
circle.setAttribute("cy", "50");
circle.setAttribute("r", "40");
document.body.appendChild(circle);
```

### Issue 29: DOMParser usage
**Description:** Should parse XML string into DOM
```javascript
let xml = "<root><item>test</item></root>";
let parser = new DOMParser();
let doc = parser.parseFromString(xml, "text/xml");
console.log(doc);
```

### Issue 30: XMLSerializer usage
**Description:** Should serialize DOM to string
```javascript
let el = document.getElementById("test");
let serializer = new XMLSerializer();
console.log(serializer.serializeToString(el));
```

---

### Modify 1: Add header generator
**Description:** Generate h1-h6 elements with given text
```javascript
function createHeading(level, text) {
  return document.createElement("h1");
}
```

### Modify 2: Add paragraph generator
**Description:** Create paragraph elements with class and text
```javascript
function createParagraph(text) {
  return document.createElement("p");
}
```

### Modify 3: Add link generator
**Description:** Create anchor element with href and text
```javascript
function createLink(url, text) {
  return document.createElement("a");
}
```

### Modify 4: Add list generator
**Description:** Create ul/ol lists from array of items
```javascript
function createList(items, ordered) {
  return document.createElement("ul");
}
```

### Modify 5: Add table generator
**Description:** Create table from 2D array
```javascript
function createTable(data) {
  return document.createElement("table");
}
```

### Modify 6: Add form generator
**Description:** Create form with input fields from config
```javascript
function createForm(fields) {
  return document.createElement("form");
}
```

### Modify 7: Add button generator
**Description:** Create button element with text and click handler
```javascript
function createButton(text, onClick) {
  return document.createElement("button");
}
```

### Modify 8: Add image gallery
**Description:** Create image gallery from array of URLs
```javascript
function createGallery(images) {
  return document.createElement("div");
}
```

### Modify 9: Add card component
**Description:** Create card with title, text, and image
```javascript
function createCard(title, text, imgUrl) {
  return document.createElement("div");
}
```

### Modify 10: Add navbar generator
**Description:** Create navigation bar with links
```javascript
function createNavbar(links) {
  return document.createElement("nav");
}
```

### Modify 11: Add modal generator
**Description:** Create modal dialog with title and content
```javascript
function createModal(title, content) {
  return document.createElement("div");
}
```

### Modify 12: Add accordion component
**Description:** Create accordion with toggle sections
```javascript
function createAccordion(sections) {
  return document.createElement("div");
}
```

### Modify 13: Add tab component
**Description:** Create tabs with show/hide panels
```javascript
function createTabs(tabs) {
  return document.createElement("div");
}
```

### Modify 14: Add progress bar
**Description:** Create progress bar that fills based on percentage
```javascript
function createProgressBar(percent) {
  return document.createElement("div");
}
```

### Modify 15: Add badge generator
**Description:** Create badge element with text and color
```javascript
function createBadge(text, color) {
  return document.createElement("span");
}
```

### Modify 16: Add tooltip generator
**Description:** Create tooltip that shows on hover
```javascript
function createTooltip(element, text) {
  return document.createElement("span");
}
```

### Modify 17: Add breadcrumb component
**Description:** Create breadcrumb navigation from path array
```javascript
function createBreadcrumb(paths) {
  return document.createElement("nav");
}
```

### Modify 18: Add pagination component
**Description:** Create pagination with page numbers
```javascript
function createPagination(total, current) {
  return document.createElement("nav");
}
```

### Modify 19: Add alert component
**Description:** Create alert box with message and type
```javascript
function createAlert(message, type) {
  return document.createElement("div");
}
```

### Modify 20: Add spinner component
**Description:** Create loading spinner element
```javascript
function createSpinner() {
  return document.createElement("div");
}
```

### Modify 21: Add avatar component
**Description:** Create avatar with initials from name
```javascript
function createAvatar(name, size) {
  return document.createElement("div");
}
```

### Modify 22: Add chip/tag component
**Description:** Create removable chip with text
```javascript
function createChip(text, onRemove) {
  return document.createElement("span");
}
```

### Modify 23: Add rating component
**Description:** Create star rating widget (1-5)
```javascript
function createRating(value, max) {
  return document.createElement("div");
}
```

### Modify 24: Add slider component
**Description:** Create range slider with value display
```javascript
function createSlider(min, max, value) {
  return document.createElement("input");
}
```

### Modify 25: Add toggle switch
**Description:** Create on/off toggle switch
```javascript
function createToggle(checked) {
  return document.createElement("label");
}
```

### Modify 26: Add dropdown component
**Description:** Create select dropdown with options
```javascript
function createDropdown(options, selected) {
  return document.createElement("select");
}
```

### Modify 27: Add autocomplete input
**Description:** Create input with suggestions dropdown
```javascript
function createAutocomplete(suggestions) {
  return document.createElement("input");
}
```

### Modify 28: Add date picker
**Description:** Create date input with formatting
```javascript
function createDatePicker() {
  return document.createElement("input");
}
```

### Modify 29: Add color picker
**Description:** Create color input with preview
```javascript
function createColorPicker(initialColor) {
  return document.createElement("input");
}
```

### Modify 30: Add file uploader
**Description:** Create file input with preview
```javascript
function createFileUploader(accept) {
  return document.createElement("input");
}
```

### Modify 31: Add responsive grid
**Description:** Create CSS grid layout from array of elements
```javascript
function createGrid(items, columns) {
  return document.createElement("div");
}
```

### Modify 32: Add flex layout
**Description:** Create flexbox container with items
```javascript
function createFlexRow(items) {
  return document.createElement("div");
}
```

### Modify 33: Add sidebar layout
**Description:** Create sidebar + main content layout
```javascript
function createSidebar(sidebarContent, mainContent) {
  return document.createElement("div");
}
```

### Modify 34: Add hero section
**Description:** Create hero banner with title and subtitle
```javascript
function createHero(title, subtitle, bgImage) {
  return document.createElement("section");
}
```

### Modify 35: Add footer generator
**Description:** Create page footer with links and copyright
```javascript
function createFooter(links, copyright) {
  return document.createElement("footer");
}
```

### Modify 36: Add testimonial card
**Description:** Create testimonial with quote, author, role
```javascript
function createTestimonial(quote, author, role) {
  return document.createElement("div");
}
```

### Modify 37: Add pricing card
**Description:** Create pricing card with plan, price, features
```javascript
function createPricingCard(plan, price, features) {
  return document.createElement("div");
}
```

### Modify 38: Add feature list
**Description:** Create feature list with icons and descriptions
```javascript
function createFeatureList(features) {
  return document.createElement("div");
}
```

### Modify 39: Add statistics counter
**Description:** Create animated counter for statistics
```javascript
function createCounter(target, duration) {
  return document.createElement("span");
}
```

### Modify 40: Add notification badge
**Description:** Create badge showing notification count
```javascript
function createNotificationBadge(count) {
  return document.createElement("span");
}
```

### Modify 41: Add timeline component
**Description:** Create vertical timeline with events
```javascript
function createTimeline(events) {
  return document.createElement("div");
}
```

### Modify 42: Add stepper component
**Description:** Create step progress indicator
```javascript
function createStepper(steps, current) {
  return document.createElement("div");
}
```

### Modify 43: Add speed dial
**Description:** Create floating action button with quick actions
```javascript
function createSpeedDial(actions) {
  return document.createElement("div");
}
```

### Modify 44: Add snackbar/toast
**Description:** Create temporary notification message
```javascript
function createSnackbar(message, duration) {
  return document.createElement("div");
}
```

### Modify 45: Add drawer component
**Description:** Create side drawer that slides in/out
```javascript
function createDrawer(content) {
  return document.createElement("div");
}
```

### Modify 46: Add chip input
**Description:** Create input that shows chips for entered values
```javascript
function createChipInput() {
  return document.createElement("div");
}
```

### Modify 47: Add virtual scroll
**Description:** Create list that only renders visible items
```javascript
function createVirtualList(items, itemHeight, containerHeight) {
  return document.createElement("div");
}
```

### Modify 48: Add lazy loading
**Description:** Create image that loads when visible
```javascript
function createLazyImage(src, placeholder) {
  return document.createElement("img");
}
```

### Modify 49: Add infinite scroll
**Description:** Load more content when scrolling to bottom
```javascript
function createInfiniteScroll(container, loadMore) {
  return document.createElement("div");
}
```

### Modify 50: Add drag-and-drop
**Description:** Make element draggable within container
```javascript
function makeDraggable(element, container) {
  return element;
}
```
