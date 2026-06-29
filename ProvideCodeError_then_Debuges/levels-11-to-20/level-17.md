# Level 17: CSS Basics and Selectors

## Error Snippets (1-70)

### Error 1: Missing semicolon in CSS declaration
**Description:** Set the text color to red
```css
p {
  color: red
}
```

### Error 2: Missing colon between property and value
**Description:** Set the font size to 16px
```css
body {
  font-size 16px;
}
```

### Error 3: Invalid color value
**Description:** Set the background to red
```css
div {
  background-color: redd;
}
```

### Error 4: Missing closing brace
**Description:** Style a paragraph element
```css
p {
  color: blue;
  font-size: 14px;
```

### Error 5: Missing opening brace
**Description:** Style a heading element
```css
h1
  color: navy;
  font-family: Arial;
}
```

### Error 6: Invalid selector with special characters
**Description:** Style an element with id containing special chars
```css
#my-element! {
  color: red;
}
```

### Error 7: Using HTML comment syntax in CSS
**Description:** Add a comment to CSS
```css
p {
  <!-- color: red; -->
  font-size: 14px;
}
```

### Error 8: Multiple classes without dots
**Description:** Select an element with two classes
```css
.button primary {
  background: blue;
}
```

### Error 9: Space between selector and pseudo-class
**Description:** Style links on hover
```css
a :hover {
  color: red;
}
```

### Error 10: Invalid unit for property
**Description:** Set width to 100 percent
```css
.container {
  width: 100%;
}
```

### Error 11: Missing unit for length value
**Description:** Set margin to 20 pixels
```css
.box {
  margin: 20;
}
```

### Error 12: Wrong number of values in shorthand
**Description:** Set margin with 5 values
```css
.box {
  margin: 10px 20px 30px 40px 50px;
}
```

### Error 13: Invalid font shorthand
**Description:** Set font family and size
```css
p {
  font: 16px Arial sans-serif;
}
```

### Error 14: Using padding shorthand incorrectly
**Description:** Set padding 10px top/bottom and 20px left/right
```css
.box {
  padding: 10px 20px 30px;
}
```

### Error 15: Missing quotes in font-family with spaces
**Description:** Set font to Times New Roman
```css
p {
  font-family: Times New Roman;
}
```

### Error 16: Invalid background shorthand
**Description:** Set background color and image
```css
div {
  background: url(image.jpg) blue no-repeat;
}
```

### Error 17: Border shorthand missing width
**Description:** Set a solid red border
```css
.box {
  border: solid red;
}
```

### Error 18: Hex color with wrong number of digits
**Description:** Set text color to red using hex
```css
p {
  color: #ff000;
}
```

### Error 19: Hex color without hash
**Description:** Set text color to blue using hex
```css
p {
  color: 0000ff;
}
```

### Error 20: RGB value out of range
**Description:** Set background color to red using rgb
```css
div {
  background-color: rgb(300, 0, 0);
}
```

### Error 21: RGBA missing alpha
**Description:** Set semi-transparent red background
```css
div {
  background-color: rgba(255, 0, 0);
}
```

### Error 22: HSL with missing hue
**Description:** Set color to red using hsl
```css
p {
  color: hsl(100%, 50%);
}
```

### Error 23: Invalid selector for child combinator
**Description:** Select direct child li of ul
```css
ul li {
  list-style: none;
}
```

### Error 24: Adjacent sibling with wrong combinator
**Description:** Select p immediately after h2
```css
h2 p {
  margin-top: 0;
}
```

### Error 25: General sibling with wrong combinator
**Description:** Select all p after h2
```css
h2 > p {
  color: gray;
}
```

### Error 26: Attribute selector without brackets
**Description:** Select input with type text
```css
input[type=text] {
  border: 1px solid gray;
}
```

### Error 27: Attribute selector with unquoted value containing space
**Description:** Select elements with class containing spaces
```css
[class~=my class] {
  color: red;
}
```

### Error 28: Pseudo-element with single colon incorrectly
**Description:** Style the first letter of a paragraph
```css
p:first-letter {
  font-size: 200%;
}
```

### Error 29: Pseudo-class with double colon
**Description:** Style links on hover
```css
a::hover {
  color: red;
}
```

### Error 30: Invalid pseudo-class
**Description:** Select the fifth child
```css
li:child(5) {
  color: red;
}
```

### Error 31: Empty CSS rule
**Description:** Add a CSS rule for a class
```css
.highlight {
}
```

### Error 32: Duplicate property in same rule
**Description:** Set color twice in the same rule
```css
p {
  color: red;
  color: blue;
}
```

### Error 33: Invalid property name
**Description:** Set text color
```css
p {
  text-colour: red;
}
```

### Error 34: Using padding for margin
**Description:** Add space outside an element
```css
.box {
  padding: 20px;
}
```

### Error 35: Using margin for padding
**Description:** Add space inside an element
```css
.box {
  margin: 20px;
}
```

### Error 36: Display: inline on block with width
**Description:** Create an inline element with specific width
```css
span {
  display: inline;
  width: 200px;
}
```

### Error 37: Setting height on inline element
**Description:** Set the height of a span
```css
span {
  height: 50px;
}
```

### Error 38: Negative padding
**Description:** Reduce padding inside a box
```css
.box {
  padding: -10px;
}
```

### Error 39: Using visibility: hidden without collapsing
**Description:** Hide an element but keep its space
```css
.hidden {
  visibility: hidden;
  width: 0;
}
```

### Error 40: Float on absolute positioned element
**Description:** Float an absolutely positioned element
```css
.modal {
  position: absolute;
  float: right;
}
```

### Error 41: Z-index without position
**Description:** Stack an element above others
```css
.overlay {
  z-index: 100;
}
```

### Error 42: Percentage height without parent height
**Description:** Set a child to 50% height
```css
.child {
  height: 50%;
}
```

### Error 43: Invalid display value
**Description:** Create an inline-block element
```css
.item {
  display: inline-blok;
}
```

### Error 44: Missing fallback in font-face
**Description:** Set a custom font without fallback
```css
p {
  font-family: 'MyCustomFont';
}
```

### Error 45: Using id selector when class would suffice
**Description:** Style a unique element that appears once
```css
#main-title {
  font-size: 24px;
}
```

### Error 46: Overly specific selector
**Description:** Style a paragraph inside a div
```css
html body div p {
  color: black;
}
```

### Error 47: Using !important for simple overrides
**Description:** Override a color property
```css
p {
  color: red !important;
}
```

### Error 48: Invalid @import syntax
**Description:** Import an external stylesheet
```css
@import "reset.css";
```

### Error 49: @import after other CSS rules
**Description:** Import a font after styles
```css
body { font-family: Arial; }
@import url('fonts.css');
```

### Error 50: Missing media type in @media
**Description:** Apply styles only on screens
```css
@media {
  body { background: white; }
}
```

### Error 51: Invalid media feature
**Description:** Apply styles for mobile devices
```css
@media (max-width: 768px) {
  body { font-size: 14px; }
}
```

### Error 52: Calc with no spaces around operator
**Description:** Set width to 100% minus 20px
```css
.box {
  width: calc(100%-20px);
}
```

### Error 53: Calc with invalid units
**Description:** Set height to 100vh minus 50px
```css
.section {
  height: calc(100vh - 50);
}
```

### Error 54: Invalid gradient syntax
**Description:** Create a linear gradient background
```css
div {
  background: linear-gradient(red blue);
}
```

### Error 55: Missing vendor prefix for older browsers
**Description:** Add a CSS transition
```css
.box {
  transition: all 0.3s;
}
```

### Error 56: Transition on non-animatable property
**Description:** Animate the display property
```css
.box {
  transition: display 0.5s;
}
```

### Error 57: Transform on inline element
**Description:** Rotate a span element
```css
span {
  transform: rotate(45deg);
}
```

### Error 58: Animation without keyframes
**Description:** Create a fade-in animation
```css
.fade-in {
  animation: fadeIn 1s;
}
```

### Error 59: Keyframes with invalid name
**Description:** Define a bounce animation
```css
@keyframes 123bounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-20px); }
}
```

### Error 60: Flex property on non-flex container
**Description:** Use flex properties on a regular div
```css
.item {
  flex: 1;
}
```

### Error 61: Invalid flex value
**Description:** Set flex-grow and flex-shrink
```css
.item {
  flex: 1 0 auto;
}
```

### Error 62: Grid property on non-grid container
**Description:** Place an item in a grid column
```css
.item {
  grid-column: 1 / 3;
}
```

### Error 63: Invalid grid template syntax
**Description:** Create a 3-column grid
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

### Error 64: Box-sizing on wrong element
**Description:** Apply border-box globally
```css
div {
  box-sizing: border-box;
}
```

### Error 65: Overflow clip without position
**Description:** Clip overflowing content
```css
.container {
  overflow: clip;
}
```

### Error 66: Invalid cursor value
**Description:** Set cursor to hand (pointer)
```css
button {
  cursor: hand;
}
```

### Error 67: Object-fit on replaced element
**Description:** Fit an image within its container
```css
img {
  object-fit: cover;
}
```

### Error 68: Position fixed without specifying location
**Description:** Fix a header to the top
```css
header {
  position: fixed;
}
```

### Error 69: Clearfix without clear property
**Description:** Clear floated children
```css
.container::after {
  content: '';
  display: table;
}
```

### Error 70: Using text-align to center block element
**Description:** Center a div horizontally
```css
div {
  text-align: center;
}
```

## Issue Snippets (1-30)

### Issue 1: Using px instead of rem for font sizes
**Description:** Set base font size for the page
```css
body {
  font-size: 16px;
}
h1 {
  font-size: 32px;
}
p {
  font-size: 14px;
}
```

### Issue 2: Duplicate CSS rules across files
**Description:** Style buttons in multiple stylesheets
```css
/* In main.css */
.button { background: blue; }
/* In theme.css */
.button { background: green; }
```

### Issue 3: Using px for responsive elements
**Description:** Set container width for desktop
```css
.container {
  width: 960px;
}
```

### Issue 4: Using !important to fix specificity issues
**Description:** Override a style from another framework
```css
.custom-widget {
  color: red !important;
  font-size: 14px !important;
  margin: 10px !important;
}
```

### Issue 5: Extremely long selector chains
**Description:** Style a deeply nested element
```css
body div#content div.main article.post p.intro {
  font-weight: bold;
}
```

### Issue 6: Using color names instead of hex
**Description:** Set brand colors
```css
.header { background: blue; }
.footer { background: black; }
.button { background: green; }
```

### Issue 7: Missing :focus styles for accessibility
**Description:** Style interactive elements
```css
button {
  background: blue;
  color: white;
}
a {
  color: blue;
}
input {
  border: 1px solid gray;
}
```

### Issue 8: Using negative margins for layout
**Description:** Create overlapping design
```css
.card {
  margin-top: -20px;
}
```

### Issue 9: Using height: 100% instead of min-height: 100vh
**Description:** Make a section fill the viewport
```css
.hero {
  height: 100%;
}
```

### Issue 10: Using absolute positioning for layout
**Description:** Position elements in a row
```css
.nav-item {
  position: absolute;
  left: 100px;
}
.nav-item:nth-child(2) {
  left: 200px;
}
```

### Issue 11: Inline styles in HTML files
**Description:** Style multiple elements
```html
<p style="color: red; font-size: 14px;">Text</p>
<p style="color: red; font-size: 14px;">More text</p>
```

### Issue 12: Not grouping selectors with same styles
**Description:** Style headings with the same font
```css
h1 { font-family: Arial; color: navy; }
h2 { font-family: Arial; color: navy; }
h3 { font-family: Arial; color: navy; }
```

### Issue 13: Using redundant vendor prefixes unnecessarily
**Description:** Add rounded corners
```css
.box {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
}
```

### Issue 14: Magic numbers in CSS
**Description:** Center a modal dialog
```css
.modal {
  position: absolute;
  top: 137px;
  left: 42%;
}
```

### Issue 15: Using float for layout instead of flexbox
**Description:** Create a horizontal navigation
```css
.nav-item {
  float: left;
  width: 25%;
}
```

### Issue 16: Not resetting margins on body
**Description:** Style the page body
```css
body {
  font-family: Arial;
}
```

### Issue 17: Overusing the universal selector
**Description:** Reset all margins and paddings
```css
* {
  margin: 0;
  padding: 0;
}
```

### Issue 18: Missing fallback fonts
**Description:** Set a custom font
```css
body {
  font-family: 'Open Sans';
}
```

### Issue 19: Using same value for all responsive breakpoints
**Description:** Set breakpoints for mobile and desktop
```css
@media (max-width: 768px) {
  .container { width: 100%; }
}
@media (max-width: 768px) {
  .sidebar { display: none; }
}
```

### Issue 20: Not using shorthand properties
**Description:** Set margin on all sides
```css
.box {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
}
```

### Issue 21: Using too many font-face declarations
**Description:** Load multiple font weights
```css
@font-face {
  font-family: 'MyFont';
  src: url('MyFont-Regular.woff2');
}
@font-face {
  font-family: 'MyFont';
  src: url('MyFont-Bold.woff2');
  font-weight: bold;
}
@font-face {
  font-family: 'MyFont';
  src: url('MyFont-Italic.woff2');
  font-style: italic;
}
```

### Issue 22: Hardcoded colors in multiple places
**Description:** Use the same brand color across elements
```css
.header { background-color: #1a73e8; }
.button { background-color: #1a73e8; }
.link { color: #1a73e8; }
.footer { border-color: #1a73e8; }
```

### Issue 23: Using display: none for accessibility
**Description:** Hide a checkbox visually
```css
.hidden-checkbox {
  display: none;
}
```

### Issue 24: Setting width and padding without box-sizing
**Description:** Create a 50% width column with padding
```css
.column {
  width: 50%;
  padding: 20px;
}
```

### Issue 25: Using text-indent for image replacement
**Description:** Replace text with a logo image
```css
.logo {
  text-indent: -9999px;
  background: url('logo.png');
}
```

### Issue 26: Empty CSS rules from unused classes
**Description:** Define styles for a component
```css
.unused-component { }
```

### Issue 27: CSS comments with // instead of /*
**Description:** Add a comment explaining the section
```css
// Header styles
.header { background: white; }
// Main content
.main { padding: 20px; }
```

### Issue 28: Too many breakpoints
**Description:** Make responsive layout
```css
@media (max-width: 1200px) { ... }
@media (max-width: 992px) { ... }
@media (max-width: 768px) { ... }
@media (max-width: 576px) { ... }
@media (max-width: 480px) { ... }
@media (max-width: 320px) { ... }
```

### Issue 29: Not using currentColor
**Description:** Set border to match text color
```css
.button {
  color: blue;
  border: 1px solid blue;
}
```

### Issue 30: Using ID selectors for styling
**Description:** Style a component that appears once
```css
#sidebar {
  width: 300px;
  background: gray;
}
#sidebar-title {
  font-size: 18px;
}
#sidebar-list {
  list-style: none;
}
```

## Modify Snippets (1-50)

### Modify 1: Add flexbox centering
**Description:** Center a div both horizontally and vertically
```css
.container {
  height: 500px;
}
```

### Modify 2: Create a sticky footer
**Description:** Make footer stick to bottom when content is short
```html
<body>
  <main>Content</main>
  <footer>Footer</footer>
</body>
```

### Modify 3: Add responsive grid layout
**Description:** Create a responsive 3-column grid
```css
.grid {
  display: block;
}
.grid-item {
  width: 33.33%;
  float: left;
}
```

### Modify 4: Implement CSS variables for theming
**Description:** Use CSS custom properties for colors
```css
.header { background-color: #333; color: white; }
.button { background-color: #007bff; color: white; }
.link { color: #007bff; }
```

### Modify 5: Add hover effects to buttons
**Description:** Add smooth hover transitions to buttons
```css
button {
  background: blue;
  color: white;
}
```

### Modify 6: Create a responsive navigation
**Description:** Make nav horizontal on desktop, vertical on mobile
```css
nav a {
  display: block;
  padding: 10px;
}
```

### Modify 7: Add CSS animations
**Description:** Create a fade-in animation for page load
```css
.page {
  opacity: 0;
}
```

### Modify 8: Create a card component with shadow
**Description:** Style a card with border radius and shadow
```css
.card {
  border: 1px solid #ddd;
  padding: 20px;
}
```

### Modify 9: Add smooth scrolling
**Description:** Enable smooth scrolling for anchor links
```css
html {
  scroll-behavior: auto;
}
```

### Modify 10: Implement dark mode
**Description:** Add dark mode support using CSS variables
```css
:root {
  --bg: white;
  --text: black;
}
body {
  background: var(--bg);
  color: var(--text);
}
```

### Modify 11: Create a gradient background
**Description:** Apply a linear gradient to the hero section
```css
.hero {
  background: white;
}
```

### Modify 12: Add responsive images
**Description:** Make images responsive within their container
```css
img {
  width: 100%;
}
```

### Modify 13: Build a modal overlay
**Description:** Style a modal with backdrop and centered content
```css
.modal-backdrop {
  background: black;
  opacity: 0.5;
}
.modal-content {
  background: white;
  padding: 20px;
}
```

### Modify 14: Add custom scrollbar
**Description:** Style the scrollbar for WebKit browsers
```css
::-webkit-scrollbar {
  width: 10px;
}
```

### Modify 15: Create a loading spinner
**Description:** Build a CSS-only loading spinner
```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ddd;
}
```

### Modify 16: Implement CSS reset
**Description:** Reset default margin and padding
```css
body {
  margin: 8px;
}
```

### Modify 17: Add typography scale
**Description:** Create a consistent typography system
```css
h1 { font-size: 32px; }
h2 { font-size: 24px; }
p { font-size: 16px; }
```

### Modify 18: Build a tooltip with CSS
**Description:** Create a pure CSS tooltip on hover
```css
.tooltip {
  position: relative;
}
.tooltip-text {
  display: none;
}
```

### Modify 19: Create a button group
**Description:** Style buttons that are grouped together
```css
.btn-group button {
  border: 1px solid gray;
}
```

### Modify 20: Add form input focus styles
**Description:** Style focused input fields
```css
input {
  border: 1px solid #ddd;
  padding: 8px;
}
```

### Modify 21: Create a breadcrumb navigation
**Description:** Style a breadcrumb trail with separators
```css
.breadcrumb a {
  color: blue;
  text-decoration: underline;
}
```

### Modify 22: Implement a badge component
**Description:** Style a notification badge
```css
.badge {
  background: red;
  color: white;
  border-radius: 50%;
}
```

### Modify 23: Build a progress bar
**Description:** Create a styled progress bar
```css
.progress-bar {
  background: #eee;
  height: 20px;
}
.progress-fill {
  background: green;
  height: 100%;
  width: 50%;
}
```

### Modify 24: Create a responsive table
**Description:** Make tables scrollable on mobile
```css
table {
  width: 100%;
}
```

### Modify 25: Add print styles
**Description:** Hide navigation and sidebar when printing
```css
@media print {
  body { font-size: 12pt; }
}
```

### Modify 26: Create a masonry-like layout
**Description:** Build a grid with different item heights
```css
.grid {
  display: flex;
  flex-wrap: wrap;
}
```

### Modify 27: Implement image overlay effect
**Description:** Add a dark overlay on hover over images
```css
.image-container img {
  width: 100%;
}
```

### Modify 28: Build an accordion with CSS
**Description:** Create expandable sections using details/summary
```css
details {
  border: 1px solid #ddd;
}
summary {
  padding: 10px;
  cursor: pointer;
}
```

### Modify 29: Create a tag/chip component
**Description:** Style a tag with background and close button
```css
.tag {
  display: inline;
  background: #eee;
  padding: 2px 8px;
  border-radius: 3px;
}
```

### Modify 30: Add line clamp for text truncation
**Description:** Truncate text after 3 lines
```css
.card-text {
  overflow: hidden;
}
```

### Modify 31: Build a side-by-side layout
**Description:** Create two equal columns using flexbox
```html
<div class="row">
  <div class="col">Left</div>
  <div class="col">Right</div>
</div>
```

### Modify 32: Create a responsive hamburger menu
**Description:** Style a hamburger icon for mobile navigation
```css
.hamburger {
  width: 30px;
  height: 3px;
  background: black;
}
```

### Modify 33: Implement sticky navigation
**Description:** Make the nav bar stick to top on scroll
```css
nav {
  position: static;
}
```

### Modify 34: Add parallax scrolling effect
**Description:** Create a parallax background effect
```css
.parallax {
  background-image: url('bg.jpg');
}
```

### Modify 35: Build a CSS-only dropdown
**Description:** Create hover-based dropdown menu
```css
.dropdown-menu {
  display: none;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
```

### Modify 36: Create a notification toast
**Description:** Style a notification that slides in from top
```css
.toast {
  position: fixed;
  top: -100px;
  background: #333;
  color: white;
  padding: 15px;
}
```

### Modify 37: Add ribbon/badge overlay
**Description:** Create a diagonal ribbon on a card corner
```css
.ribbon {
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  color: white;
}
```

### Modify 38: Implement a timeline layout
**Description:** Create a vertical timeline with alternating sides
```css
.timeline-item {
  position: relative;
  padding: 20px;
}
```

### Modify 39: Build a testimonial card
**Description:** Style a quote card with avatar and text
```css
.testimonial {
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 8px;
}
```

### Modify 40: Create a feature grid
**Description:** Display features in a 3-column grid
```css
.features {
  display: block;
}
.feature {
  width: 33.33%;
  float: left;
}
```

### Modify 41: Add call-to-action button styles
**Description:** Style a prominent CTA button
```css
.cta-button {
  background: blue;
  color: white;
  font-size: 16px;
}
```

### Modify 42: Build a pricing table
**Description:** Create styled pricing cards
```css
.pricing-card {
  border: 1px solid #ddd;
  text-align: center;
  padding: 30px;
}
.pricing-card.featured {
  border-color: gold;
}
```

### Modify 43: Create an avatar component
**Description:** Style a circular user avatar
```css
.avatar {
  width: 50px;
  height: 50px;
}
```

### Modify 44: Implement skeleton loading
**Description:** Create a skeleton screen loading effect
```css
.skeleton {
  background: #eee;
  height: 20px;
  margin-bottom: 10px;
}
```

### Modify 45: Build a star rating widget
**Description:** Style star ratings with CSS
```css
.star {
  color: #ddd;
  font-size: 24px;
}
.star.filled {
  color: gold;
}
```

### Modify 46: Create a toggle switch
**Description:** Style a CSS-only toggle switch
```css
.toggle {
  width: 50px;
  height: 25px;
  background: #ccc;
  border-radius: 25px;
}
.toggle.active {
  background: green;
}
```

### Modify 47: Add animated underline to links
**Description:** Create hover underline animation for links
```css
nav a {
  text-decoration: none;
  color: black;
}
```

### Modify 48: Build a notification badge
**Description:** Style a number badge on icons
```css
.icon-badge {
  position: relative;
}
.badge-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
}
```

### Modify 49: Create a split screen layout
**Description:** Create two equal halves side by side
```html
<div class="split">
  <div class="left">Left half</div>
  <div class="right">Right half</div>
</div>
```

### Modify 50: Implement CSS grid for page layout
**Description:** Create a full page layout with header, sidebar, main, footer
```css
.page {
  display: block;
}
.header { }
.sidebar { }
.main { }
.footer { }
```
