# Level 16: HTML Structure and Basic Tags

## Error Snippets (1-70)

### Error 1: Missing DOCTYPE declaration
**Description:** Create a basic HTML page
```html
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <p>Hello World</p>
</body>
</html>
```

### Error 2: Missing closing html tag
**Description:** Create a complete HTML document
```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<body>
  <p>Content</p>
</body>
```

### Error 3: Missing closing head tag
**Description:** Create a page with metadata
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
  <meta charset="UTF-8">
<body>
  <p>Hello</p>
</body>
</html>
```

### Error 4: Missing closing body tag
**Description:** Create a page with content
```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<body>
  <h1>Title</h1>
  <p>Paragraph</p>
</html>
```

### Error 5: Self-closing div tag
**Description:** Create a container div
```html
<div />
```

### Error 6: Incorrect nesting of tags
**Description:** Create a paragraph with bold text
```html
<p>This is <b>bold</p></b>
```

### Error 7: Duplicate id attributes
**Description:** Create two elements with the same id
```html
<div id="main">Content 1</div>
<div id="main">Content 2</div>
```

### Error 8: Missing alt attribute on img
**Description:** Display an image
```html
<img src="photo.jpg">
```

### Error 9: Unquoted attribute value
**Description:** Create a link with a class
```html
<a href=https://example.com class=link>Click</a>
```

### Error 10: Single-quoted attribute in HTML
**Description:** Create an input with a placeholder
```html
<input type='text' placeholder='Enter name'>
```

### Error 11: Missing href in anchor tag
**Description:** Create a clickable link
```html
<a>Click here</a>
```

### Error 12: Void element with closing tag
**Description:** Add a line break
```html
<br></br>
```

### Error 13: Non-void element self-closed
**Description:** Create a paragraph with content
```html
<p />Some text
```

### Error 14: Missing charset meta tag
**Description:** Create a page with special characters
```html
<!DOCTYPE html>
<html>
<head>
  <title>Café Menu</title>
</head>
<body>
  <p>Café</p>
</body>
</html>
```

### Error 15: Title tag in body
**Description:** Create a page with title in body
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <title>Wrong Place</title>
  <p>Content</p>
</body>
</html>
```

### Error 16: Style tag in body
**Description:** Add CSS styles to a page
```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<body>
  <style>p { color: red; }</style>
  <p>Hello</p>
</body>
</html>
```

### Error 17: Script tag in head without async/defer
**Description:** Add a JavaScript file reference
```html
<!DOCTYPE html>
<html>
<head>
  <script src="app.js"></script>
  <title>Test</title>
</head>
<body>
  <p>Content</p>
</body>
</html>
```

### Error 18: Multiple body tags
**Description:** Create a page with two body sections
```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<body>
  <p>First section</p>
</body>
<body>
  <p>Second section</p>
</body>
</html>
```

### Error 19: Multiple html tags
**Description:** Create a page with duplicate html elements
```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<html>
<body>
  <p>Content</p>
</body>
</html>
```

### Error 20: Missing lang attribute on html
**Description:** Create an HTML page without language declaration
```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<body>
  <p>Hello</p>
</body>
</html>
```

### Error 21: Unclosed list item
**Description:** Create an unordered list
```html
<ul>
  <li>Item 1
  <li>Item 2
</ul>
```

### Error 22: Div inside a paragraph
**Description:** Create a paragraph with a nested div
```html
<p>Some text <div>inner</div> more text</p>
```

### Error 23: Link inside a link
**Description:** Create nested anchor tags
```html
<a href="page1">Outer <a href="page2">Inner</a></a>
```

### Error 24: Button inside a form with wrong type
**Description:** Create a form submit button
```html
<form>
  <input type="text">
  <button>Submit</button>
</form>
```

### Error 25: Missing action attribute on form
**Description:** Create a form that submits data
```html
<form method="POST">
  <input type="text" name="name">
  <button type="submit">Send</button>
</form>
```

### Error 26: Colspan on td without table
**Description:** Use colspan on a td element
```html
<td colspan="2">Cell</td>
```

### Error 27: Th element outside tr
**Description:** Create a table header
```html
<table>
  <th>Name</th>
  <th>Age</th>
  <tr>
    <td>Alice</td>
    <td>30</td>
  </tr>
</table>
```

### Error 28: Tr outside table
**Description:** Create a table row directly in body
```html
<tr>
  <td>Cell</td>
</tr>
```

### Error 29: Unclosed select tag
**Description:** Create a dropdown menu
```html
<select>
  <option value="1">One</option>
  <option value="2">Two</option>
```

### Error 30: Option outside select
**Description:** Create a standalone option
```html
<option value="test">Test</option>
```

### Error 31: Input outside form
**Description:** Create a text input without form
```html
<input type="text" name="username">
```

### Error 32: Missing name attribute on input
**Description:** Create a form input for submission
```html
<form>
  <input type="text">
  <button type="submit">Send</button>
</form>
```

### Error 33: For attribute on label pointing to wrong id
**Description:** Create a label for an input
```html
<label for="email">Email:</label>
<input type="email" id="email">
```

### Error 34: Id with spaces
**Description:** Create an element with an id containing spaces
```html
<div id="my element">Content</div>
```

### Error 35: Class name starting with number
**Description:** Create an element with a class starting with digit
```html
<div class="1st-item">First</div>
```

### Error 36: Comment inside a tag
**Description:** Add a comment inside a div tag
```html
<div <!-- comment -->>Content</div>
```

### Error 37: Unclosed comment
**Description:** Add an HTML comment
```html
<!-- This is a comment
<p>Content</p>
```

### Error 38: Incorrect DOCTYPE for HTML5
**Description:** Create an HTML5 document
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
<head>
  <title>Test</title>
</head>
<body>
  <p>Content</p>
</body>
</html>
```

### Error 39: Deprecated center tag
**Description:** Center some text on the page
```html
<center>Centered text</center>
```

### Error 40: Deprecated font tag
**Description:** Change font color
```html
<font color="red">Red text</font>
```

### Error 41: Deprecated big tag
**Description:** Make text larger
```html
<big>Larger text</big>
```

### Error 42: Deprecated strike tag
**Description:** Create strikethrough text
```html
<strike>Strikethrough</strike>
```

### Error 43: Missing thead in table
**Description:** Create a table with a header section
```html
<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>30</td>
  </tr>
</table>
```

### Error 44: Tbody without table
**Description:** Create a table body outside table
```html
<tbody>
  <tr><td>Data</td></tr>
</tbody>
```

### Error 45: Multiple h1 tags
**Description:** Create a page with two main headings
```html
<h1>First Title</h1>
<h1>Second Title</h1>
```

### Error 46: Heading inside paragraph
**Description:** Nest an h2 inside a paragraph
```html
<p><h2>Subtitle</h2> Some text</p>
```

### Error 47: List inside a heading
**Description:** Create a heading containing a list
```html
<h1>Topics<ul><li>HTML</li></ul></h1>
```

### Error 48: Block element inside inline element
**Description:** Place a div inside a span
```html
<span><div>Block inside inline</div></span>
```

### Error 49: Form inside a paragraph
**Description:** Nest a form inside a paragraph
```html
<p><form><input type="text"></form></p>
```

### Error 50: Table inside a paragraph
**Description:** Place a table inside a paragraph
```html
<p><table><tr><td>Data</td></tr></table></p>
```

### Error 51: Head inside body
**Description:** Put the head element in the body
```html
<!DOCTYPE html>
<html>
<body>
  <head>
    <title>Wrong</title>
  </head>
  <p>Content</p>
</body>
</html>
```

### Error 52: HTML inside body
**Description:** Nest html element inside body
```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<body>
  <html>
    <p>Content</p>
  </html>
</body>
</html>
```

### Error 53: Unencoded ampersand in URL
**Description:** Create a link with query parameters
```html
<a href="page.php?name=Alice&age=30">Link</a>
```

### Error 54: Unencoded less-than in text
**Description:** Display a less-than symbol in text
```html
<p>5 < 10 is true</p>
```

### Error 55: Unencoded greater-than in text
**Description:** Display a greater-than symbol
```html
<p>10 > 5 is true</p>
```

### Error 56: Space in URL
**Description:** Create a link with a space in the URL
```html
<a href="my page.html">My Page</a>
```

### Error 57: Relative path with wrong slash
**Description:** Reference an image in a subdirectory
```html
<img src="images\photo.jpg" alt="Photo">
```

### Error 58: Missing file extension in script src
**Description:** Load a JavaScript file
```html
<script src="app"></script>
```

### Error 59: Missing file extension in link href
**Description:** Load a CSS stylesheet
```html
<link rel="stylesheet" href="styles">
```

### Error 60: Wrong rel attribute on link
**Description:** Link to a CSS stylesheet
```html
<link rel="stylesheet" href="styles.css">
```

### Error 61: Meta charset with wrong case
**Description:** Set the character encoding
```html
<meta charset="utf-8">
```

### Error 62: Script with wrong MIME type
**Description:** Add a JavaScript file with obsolete type
```html
<script type="text/javascript" src="app.js"></script>
```

### Error 63: Link with wrong type attribute
**Description:** Link to a stylesheet
```html
<link rel="stylesheet" type="text/css" href="styles.css">
```

### Error 64: Obsolete align attribute
**Description:** Align text to the right
```html
<p align="right">Right aligned</p>
```

### Error 65: Obsolete bgcolor attribute
**Description:** Set the background color of a div
```html
<div bgcolor="blue">Content</div>
```

### Error 66: Obsolete border attribute on image
**Description:** Add a border around an image
```html
<img src="photo.jpg" border="1">
```

### Error 67: Obsolete width attribute on image without CSS
**Description:** Set image width
```html
<img src="photo.jpg" width="200">
```

### Error 68: Unclosed textarea tag
**Description:** Create a multi-line text input
```html
<textarea rows="4" cols="50">
Default text
```

### Error 69: Iframe without src
**Description:** Create an inline frame
```html
<iframe>Fallback content</iframe>
```

### Error 70: Default type on script is not JavaScript
**Description:** Add a script with wrong type
```html
<script type="module" src="app.js"></script>
```

## Issue Snippets (1-30)

### Issue 1: Using div for navigation instead of nav
**Description:** Create a navigation section
```html
<div class="navigation">
  <a href="/">Home</a>
  <a href="/about">About</a>
</div>
```

### Issue 2: Using div for article content instead of article
**Description:** Create a blog post section
```html
<div class="post">
  <h2>Title</h2>
  <p>Content</p>
</div>
```

### Issue 3: Using div for sidebar instead of aside
**Description:** Create a sidebar section
```html
<div class="sidebar">
  <p>Related links</p>
</div>
```

### Issue 4: Using div for footer instead of footer
**Description:** Create a page footer
```html
<div class="footer">
  <p>&copy; 2024</p>
</div>
```

### Issue 5: Using div for header instead of header
**Description:** Create a page header
```html
<div class="header">
  <h1>Site Name</h1>
</div>
```

### Issue 6: Using br for spacing instead of CSS
**Description:** Add vertical spacing between elements
```html
<p>First paragraph</p>
<br><br>
<p>Second paragraph</p>
```

### Issue 7: Using table for layout instead of CSS
**Description:** Create a two-column layout
```html
<table width="100%">
  <tr>
    <td width="50%">Left column</td>
    <td width="50%">Right column</td>
  </tr>
</table>
```

### Issue 8: Missing main landmark
**Description:** Create a page with primary content
```html
<body>
  <header>Site Header</header>
  <div class="content">Main content here</div>
  <footer>Footer</footer>
</body>
```

### Issue 9: Using b instead of strong
**Description:** Create important text
```html
<p>This is <b>important</b> text</p>
```

### Issue 10: Using i instead of em
**Description:** Create emphasized text
```html
<p>This is <i>emphasized</i> text</p>
```

### Issue 11: Inline styles instead of classes
**Description:** Style multiple elements with the same color
```html
<p style="color: blue">First</p>
<p style="color: blue">Second</p>
<p style="color: blue">Third</p>
```

### Issue 12: Missing alt text on decorative images
**Description:** Add decorative icons
```html
<img src="star-icon.png">
<img src="heart-icon.png">
```

### Issue 13: Empty paragraph for spacing
**Description:** Add space between sections
```html
<p>&nbsp;</p>
```

### Issue 14: Using hr for visual separation only
**Description:** Add a thematic break
```html
<hr>
```

### Issue 15: Missing label for input
**Description:** Create a form input
```html
<form>
  <input type="text" placeholder="Enter your name">
  <button type="submit">Submit</button>
</form>
```

### Issue 16: Using div instead of button for clickable area
**Description:** Create a clickable button
```html
<div class="btn" onclick="submit()">Submit</div>
```

### Issue 17: Not grouping related form fields
**Description:** Create a form with personal details
```html
<form>
  <label>Name: <input type="text"></label>
  <label>Email: <input type="email"></label>
  <h3>Address</h3>
  <label>Street: <input type="text"></label>
  <label>City: <input type="text"></label>
  <button type="submit">Submit</button>
</form>
```

### Issue 18: Using br inside list items for multi-line
**Description:** Create list items with multiple lines
```html
<ul>
  <li>Line 1<br>Line 2</li>
  <li>Line 3<br>Line 4</li>
</ul>
```

### Issue 19: Too many nested divs
**Description:** Create a simple card layout
```html
<div class="wrapper">
  <div class="inner">
    <div class="content">
      <div class="card">
        <p>Card content</p>
      </div>
    </div>
  </div>
</div>
```

### Issue 20: Missing semantic headings hierarchy
**Description:** Create a page with improper heading order
```html
<h3>Section</h3>
<h1>Main Title</h1>
<h4>Subsection</h4>
```

### Issue 21: Using HTML entities for decorative characters
**Description:** Add a checkmark character
```html
<p>&#10003; Completed</p>
```

### Issue 22: Not using figure for images with captions
**Description:** Display an image with a caption
```html
<img src="photo.jpg" alt="Sunset">
<p>Beautiful sunset at the beach</p>
```

### Issue 23: Inline script in HTML instead of external file
**Description:** Add JavaScript functionality
```html
<body>
  <h1>Welcome</h1>
  <script>
    alert('Hello!');
  </script>
</body>
```

### Issue 24: Using empty div as spacer
**Description:** Create a flexible spacer between elements
```html
<div style="height: 20px"></div>
```

### Issue 25: Using u tag for non-underline purposes
**Description:** Visually highlight text
```html
<p>This text is <u>highlighted</u></p>
```

### Issue 26: Not using fieldset for form groups
**Description:** Group related form fields
```html
<form>
  <legend>Personal Info</legend>
  <label>Name: <input type="text"></label>
  <label>Age: <input type="number"></label>
</form>
```

### Issue 27: Using target="_blank" without rel="noopener"
**Description:** Open a link in a new tab
```html
<a href="https://example.com" target="_blank">Visit</a>
```

### Issue 28: Using inline event handlers instead of addEventListener
**Description:** Handle a button click
```html
<button onclick="handleClick()">Click</button>
```

### Issue 29: Missing viewport meta tag for responsive design
**Description:** Create a mobile-friendly page
```html
<head>
  <title>Responsive Page</title>
</head>
```

### Issue 30: Using deprecated summary/details incorrectly
**Description:** Create an expandable section
```html
<details>
  <summary>Click to expand</summary>
  <p>Hidden content</p>
</details>
```

## Modify Snippets (1-50)

### Modify 1: Add semantic HTML structure
**Description:** Convert div-based layout to semantic elements
```html
<div class="header">Site Header</div>
<div class="nav">Navigation</div>
<div class="main">Content</div>
<div class="footer">Footer</div>
```

### Modify 2: Add proper form submission
**Description:** Complete the form with method and action
```html
<form>
  <input type="text" name="username">
  <button type="submit">Submit</button>
</form>
```

### Modify 3: Add labels to form inputs
**Description:** Associate labels with form inputs
```html
<form>
  Name: <input type="text" id="name">
  Email: <input type="email" id="email">
  <button type="submit">Submit</button>
</form>
```

### Modify 4: Add required attributes to form validation
**Description:** Make name and email required fields
```html
<form>
  <label for="name">Name:</label>
  <input type="text" id="name">
  <label for="email">Email:</label>
  <input type="email" id="email">
  <button type="submit">Submit</button>
</form>
```

### Modify 5: Add proper table structure
**Description:** Complete the table with thead, tbody, tfoot
```html
<table>
  <tr><th>Product</th><th>Price</th></tr>
  <tr><td>Apple</td><td>$1</td></tr>
  <tr><td>Banana</td><td>$2</td></tr>
  <tr><td>Total</td><td>$3</td></tr>
</table>
```

### Modify 6: Add image with proper alt text
**Description:** Display a profile picture with fallback text
```html
<img src="profile.jpg">
```

### Modify 7: Create a navigation menu
**Description:** Build a proper nav with links
```html
<div>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</div>
```

### Modify 8: Add figure and figcaption
**Description:** Display a chart with description
```html
<img src="chart.png" alt="Sales chart">
<p>Monthly sales for 2024</p>
```

### Modify 9: Create a contact form with all fields
**Description:** Build a complete contact form
```html
<form>
  <input type="text" placeholder="Name">
  <input type="email" placeholder="Email">
  <textarea placeholder="Message"></textarea>
  <button type="submit">Send</button>
</form>
```

### Modify 10: Add ARIA labels for accessibility
**Description:** Add accessible labels to navigation
```html
<nav>
  <a href="/">Home</a>
  <a href="/search">Search</a>
</nav>
```

### Modify 11: Create an article with proper structure
**Description:** Build a blog article with semantic tags
```html
<div>
  <h2>Article Title</h2>
  <p>Published on Jan 1, 2024</p>
  <p>Article content goes here...</p>
</div>
```

### Modify 12: Add responsive image attributes
**Description:** Make an image responsive with srcset
```html
<img src="photo.jpg" alt="Description">
```

### Modify 13: Create a video embed with fallback
**Description:** Add a video player with multiple sources
```html
<video controls>
  <source src="video.mp4" type="video/mp4">
</video>
```

### Modify 14: Add audio element with formats
**Description:** Embed an audio player with fallbacks
```html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>
```

### Modify 15: Build a description list
**Description:** Create a terms and definitions list
```html
<ul>
  <li>HTML - HyperText Markup Language</li>
  <li>CSS - Cascading Style Sheets</li>
</ul>
```

### Modify 16: Add proper form validation attributes
**Description:** Add minlength, maxlength, and pattern to inputs
```html
<form>
  <label for="username">Username:</label>
  <input type="text" id="username">
  <label for="password">Password:</label>
  <input type="password" id="password">
  <button type="submit">Register</button>
</form>
```

### Modify 17: Create a multi-step form structure
**Description:** Build a form with multiple sections
```html
<form>
  <h2>Step 1: Personal Info</h2>
  <label>Name: <input type="text"></label>
  <h2>Step 2: Address</h2>
  <label>Street: <input type="text"></label>
  <button type="submit">Submit</button>
</form>
```

### Modify 18: Add a search form
**Description:** Build a search input with button
```html
<form>
  <input type="text" placeholder="Search...">
  <button type="submit">Search</button>
</form>
```

### Modify 19: Create a login form
**Description:** Build a login form with username and password
```html
<form>
  <label>Username: <input type="text"></label>
  <label>Password: <input type="text"></label>
  <button type="submit">Log In</button>
</form>
```

### Modify 20: Build a registration form
**Description:** Create a complete registration form
```html
<form>
  <label>Full Name: <input type="text"></label>
  <label>Email: <input type="email"></label>
  <label>Password: <input type="password"></label>
  <label>Confirm Password: <input type="password"></label>
  <button type="submit">Register</button>
</form>
```

### Modify 21: Add meta tags for SEO
**Description:** Add description and keywords meta tags
```html
<head>
  <title>My Site</title>
</head>
```

### Modify 22: Create a page with sections
**Description:** Structure a page with header, main, aside, footer
```html
<div id="page">
  <div id="header">Header</div>
  <div id="main">Main Content</div>
  <div id="sidebar">Sidebar</div>
  <div id="footer">Footer</div>
</div>
```

### Modify 23: Add accessibility skip link
**Description:** Add a skip-to-content link for keyboard users
```html
<body>
  <nav>Navigation links here</nav>
  <main>Main content here</main>
</body>
```

### Modify 24: Create a numbered list of instructions
**Description:** Display step-by-step instructions
```html
<div>
  <p>Step 1: Open the app</p>
  <p>Step 2: Click start</p>
  <p>Step 3: Follow instructions</p>
</div>
```

### Modify 25: Build a product card with proper HTML
**Description:** Display a product with image, title, price
```html
<div>
  <img src="product.jpg" alt="Product">
  <h3>Product Name</h3>
  <p>$19.99</p>
  <button>Add to Cart</button>
</div>
```

### Modify 26: Add proper heading structure
**Description:** Fix heading hierarchy for a page
```html
<body>
  <h3>Site Title</h3>
  <h4>Section</h4>
  <h5>Subsection</h5>
</body>
```

### Modify 27: Create a form with radio buttons
**Description:** Build a gender selection using radio buttons
```html
<form>
  <span>Gender:</span>
  <input type="radio" name="gender" value="male"> Male
  <input type="radio" name="gender" value="female"> Female
  <button type="submit">Submit</button>
</form>
```

### Modify 28: Create a checkbox group
**Description:** Build a list of interests with checkboxes
```html
<form>
  <span>Interests:</span>
  <input type="checkbox" value="sports"> Sports
  <input type="checkbox" value="music"> Music
  <button type="submit">Submit</button>
</form>
```

### Modify 29: Build a dropdown menu with optgroups
**Description:** Create a select with grouped options
```html
<select>
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
</select>
```

### Modify 30: Add a progress bar element
**Description:** Display a download progress indicator
```html
<div>Downloading: 75%</div>
```

### Modify 31: Create a meter element
**Description:** Display a storage usage gauge
```html
<div>Storage: 60% used</div>
```

### Modify 32: Add time element with datetime attribute
**Description:** Display a publication date
```html
<p>Published: January 15, 2024</p>
```

### Modify 33: Create an address block
**Description:** Display a contact address
```html
<div>
  123 Main Street<br>
  New York, NY 10001<br>
  USA
</div>
```

### Modify 34: Add blockquote with citation
**Description:** Display a quoted text with citation
```html
<p>"The only limit is your imagination."</p>
<p>- Someone Famous</p>
```

### Modify 35: Build a code snippet display
**Description:** Display JavaScript code with proper formatting
```html
<p>Use <b>console.log()</b> to print to the console</p>
```

### Modify 36: Add preformatted text
**Description:** Display ASCII art or code with preserved formatting
```html
<p>function hello() {
  console.log('Hi');
}</p>
```

### Modify 37: Create an abbreviation with tooltip
**Description:** Display HTML abbreviation with full form
```html
<p>HTML is awesome</p>
```

### Modify 38: Add subscript and superscript
**Description:** Display mathematical formula E=mc²
```html
<p>E=mc2</p>
```

### Modify 39: Create a definition term
**Description:** Display a term and its definition inline
```html
<p>A <i>variable</i> stores data in JavaScript.</p>
```

### Modify 40: Add bidirectional text isolation
**Description:** Display a Hebrew greeting in an English paragraph
```html
<p>The greeting שלום means hello in Hebrew.</p>
```

### Modify 41: Build a complete page from scratch
**Description:** Create a full HTML page with all required elements
```html
<!DOCTYPE html>
<html>
<head>
  <title>Complete Page</title>
</head>
<body>
  <h1>Welcome</h1>
  <p>This is a complete page.</p>
</body>
</html>
```

### Modify 42: Add proper language declaration
**Description:** Set the page language to English
```html
<html>
<head>
  <title>English Page</title>
</head>
<body>
  <p>Hello World</p>
</body>
</html>
```

### Modify 43: Add character encoding
**Description:** Set UTF-8 encoding for special characters
```html
<!DOCTYPE html>
<html>
<head>
  <title>Special Chars: ñ, ü, é</title>
</head>
<body>
  <p>Café, Piñata, Über</p>
</body>
</html>
```

### Modify 44: Add viewport meta tag
**Description:** Make the page responsive on mobile devices
```html
<!DOCTYPE html>
<html>
<head>
  <title>Responsive</title>
</head>
<body>
  <p>Content</p>
</body>
</html>
```

### Modify 45: Add Open Graph meta tags
**Description:** Add social media preview tags
```html
<head>
  <title>My Article</title>
</head>
```

### Modify 46: Create a favicon link
**Description:** Add a favicon to the page
```html
<head>
  <title>Site with Favicon</title>
</head>
```

### Modify 47: Build a complex table with merged cells
**Description:** Create a schedule table with colspan and rowspan
```html
<table>
  <tr>
    <td>Monday</td>
    <td>9:00</td>
    <td>10:00</td>
  </tr>
  <tr>
    <td>Tuesday</td>
    <td>9:00</td>
    <td>10:00</td>
  </tr>
</table>
```

### Modify 48: Create a form with file upload
**Description:** Build a file upload form with proper encoding
```html
<form method="POST">
  <label>Upload File:</label>
  <input type="file">
  <button type="submit">Upload</button>
</form>
```

### Modify 49: Add hidden input fields
**Description:** Add CSRF token and other hidden fields to a form
```html
<form method="POST" action="/submit">
  <label>Name: <input type="text" name="name"></label>
  <button type="submit">Submit</button>
</form>
```

### Modify 50: Create a section with multiple articles
**Description:** Display a blog feed with multiple posts
```html
<section>
  <h2>Blog Posts</h2>
  <div>
    <h3>First Post</h3>
    <p>Content here</p>
  </div>
  <div>
    <h3>Second Post</h3>
    <p>Content here</p>
  </div>
</section>
```
