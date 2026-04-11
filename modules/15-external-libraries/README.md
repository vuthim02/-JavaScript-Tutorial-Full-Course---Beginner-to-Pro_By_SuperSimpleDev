# Module 15: External Libraries

**Duration:** ~93 minutes  
**Video Timestamp:** 13:56:33 - 15:29:41

## Learning Objectives

- Understand how to use external JavaScript libraries
- Include libraries via CDN
- Install and use npm packages
- Learn popular utility libraries
- Manage library dependencies

## What are External Libraries?

Libraries are pre-written code that you can use in your projects. They provide:
- Reusable functionality
- Optimized implementations
- Community support
- Regular updates

## Including Libraries

### CDN (Content Delivery Network)

```html
<!-- Include from CDN -->
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>

<!-- Then use in your code -->
<script>
  console.log(_.chunk([1, 2, 3, 4, 5], 2));
</script>
```

### npm (Node Package Manager)

```bash
# Install a package
npm install lodash

# Use in code
import _ from 'lodash';
console.log(_.chunk([1, 2, 3, 4, 5], 2));
```

## Popular Libraries

### Lodash - Utility Functions

Lodash provides helpful utility functions for working with arrays, objects, and strings.

```javascript
import _ from 'lodash';

// Array utilities
_.chunk([1, 2, 3, 4, 5], 2);    // [[1, 2], [3, 4], [5]]
_.compact([0, 1, false, 2, '', 3]);  // [1, 2, 3]
_.flatten([1, [2, [3, [4]], 5]]);  // [1, 2, [3, [4]], 5]
_.flattenDeep([1, [2, [3, [4]]]]); // [1, 2, 3, 4]

// Collection utilities
_.filter([1, 2, 3, 4], n => n % 2 === 0);  // [2, 4]
_.find([1, 2, 3, 4], n => n > 2);           // 3
_.groupBy(['one', 'two', 'three'], 'length'); // {3: ['one', 'two'], 5: ['three']}
_.sortBy([{n: 3}, {n: 1}, {n: 2}], 'n');     // [{n: 1}, {n: 2}, {n: 3}]

// Object utilities
_.pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);   // { a: 1, c: 3 }
_.omit({ a: 1, b: 2, c: 3 }, ['b']);         // { a: 1, c: 3 }
_.merge({ a: 1 }, { b: 2 });                 // { a: 1, b: 2 }
_.cloneDeep({ a: 1, b: { c: 2 } });           // Deep clone

// String utilities
_.camelCase('Hello World');      // 'helloWorld'
_.kebabCase('Hello World');      // 'hello-world'
_.snakeCase('Hello World');      // 'hello_world'
_.startCase('hello world');      // 'Hello World'

// Number utilities
_.random(1, 10);                 // Random between 1-10
_.clamp(15, 1, 10);              // 10 (clamped to range)
_.debounce(func, 300);           // Debounced function
```

### Day.js - Date Handling

Lightweight alternative to Moment.js:

```html
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

```javascript
import dayjs from 'dayjs';

// Current date
dayjs().format('YYYY-MM-DD');        // '2024-01-15'
dayjs().format('MMMM D, YYYY');      // 'January 15, 2024'
dayjs().format('dddd');               // 'Monday'

// Parsing
dayjs('2024-01-15').format('YYYY-MM-DD');
dayjs.unix(1705334400).format('YYYY-MM-DD');

// Manipulating
dayjs().add(1, 'day').format('YYYY-MM-DD');
dayjs().subtract(1, 'week').format('YYYY-MM-DD');
dayjs().startOf('month').format('YYYY-MM-DD');
dayjs().endOf('day').format('YYYY-MM-DD HH:mm');

// Relative time
dayjs().add(3, 'day').fromNow();    // 'in 3 days'
dayjs().subtract(2, 'day').fromNow(); // '2 days ago'

// Comparing
dayjs().isBefore('2024-01-20');      // true/false
dayjs().isSame('2024-01-15');       // true/false
dayjs().diff('2024-01-10', 'day');  // 5 days difference
```

### Luxon - More Powerful Dates

```javascript
import { DateTime } from 'luxon';

const now = DateTime.now();
console.log(now.toISO());            // '2024-01-15T10:30:00.000Z'
console.log(now.toLocaleString());   // '1/15/2024'

// Plus duration
const later = now.plus({ days: 5 });
console.log(later.toFormat('yyyy-MM-dd'));

// Timezones
const local = DateTime.now().setZone('America/New_York');
console.log(local.toFormat('HH:mm'));
```

### Axios - HTTP Requests

Better than fetch for many use cases:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

```javascript
import axios from 'axios';

// GET request
axios.get('/api/users')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// With async/await
async function getUsers() {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// POST request
axios.post('/api/users', {
  name: 'John',
  email: 'john@example.com'
})
  .then(response => console.log(response.data));

// With config
axios({
  method: 'post',
  url: '/api/data',
  data: { key: 'value' },
  timeout: 5000,
  headers: { 'Authorization': 'Bearer token' }
});
```

### Chart.js - Charts and Graphs

```html
<canvas id="myChart"></canvas>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

```javascript
import Chart from 'chart.js/auto';

const ctx = document.getElementById('myChart').getContext('2d');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        // ...
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        // ...
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true }
    }
  }
});
```

### Toastify.js - Notifications

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
<script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
```

```javascript
// Success toast
Toastify({
  text: "Item added to cart!",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "right", // `left`, `center` or `right`
  backgroundColor: "#4CAF50"
}).showToast();

// Error toast
Toastify({
  text: "Something went wrong!",
  backgroundColor: "#f44336"
}).showToast();
```

### Sortable.js - Drag and Drop

```html
<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
```

```javascript
import Sortable from 'sortablejs';

const el = document.getElementById('list');
new Sortable(el, {
  animation: 150,
  ghostClass: 'blue-background-class',
  onEnd: function (evt) {
    console.log('Moved', evt.item, 'from', evt.oldIndex, 'to', evt.newIndex);
  }
});
```

## Using npm

### Setting Up a Project

```bash
# Initialize npm project
npm init -y

# Install a package
npm install lodash

# Install as dev dependency
npm install --save-dev eslint

# Install specific version
npm install lodash@4.17.21

# Install from package.json
npm install
```

### package.json

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {
    "lodash": "^4.17.21",
    "dayjs": "^1.11.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0"
  }
}
```

### Using Packages

```javascript
// ES6 modules
import _ from 'lodash';

// CommonJS
const _ = require('lodash');
```

## Library Best Practices

### 1. Check Before Adding

Do you really need the library?
```javascript
// Don't need Lodash for this
const sum = arr.reduce((a, b) => a + b, 0);

// Just use native methods
const reversed = str.split('').reverse().join('');
```

### 2. Use Lightweight Alternatives

```javascript
// Instead of Moment.js (67kb)
import dayjs from 'dayjs';  // 2kb

// Instead of jQuery
// Use native DOM methods
document.querySelector();
element.classList.add();
```

### 3. Tree Shaking

Import only what you need:
```javascript
// Import entire library
import _ from 'lodash';           // Full bundle

// Import specific functions
import chunk from 'lodash/chunk';  // Only chunk function
import { chunk, compact } from 'lodash-es';  // Named imports
```

### 4. Check for Updates

```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Update specific package
npm update lodash
```

## Common Library Patterns

### Date Formatting

```javascript
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(relativeTime);
dayjs.extend(calendar);

dayjs().format('MMMM D, YYYY');           // 'January 15, 2024'
dayjs().add(5, 'day').fromNow();         // 'in 5 days'
dayjs().calendar(dayjs().subtract(1, 'day'));  // 'Yesterday'
```

### Deep Clone

```javascript
import _ from 'lodash';

// Deep clone an object
const original = { a: 1, b: { c: 2 } };
const clone = _.cloneDeep(original);
clone.b.c = 3;
console.log(original.b.c);  // 2 (unchanged!)
```

### Debounce and Throttle

```javascript
import { debounce, throttle } from 'lodash';

// Debounce - delay until user stops typing
const handleSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 500);

// Throttle - limit how often function runs
const handleScroll = throttle(() => {
  console.log('Scrolled!');
}, 100);
```

## Practice Exercises

### Exercise 15.1: Use Lodash in a Project

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
</head>
<body>
  <script>
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // Use Lodash methods
    console.log('Chunked:', _.chunk(data, 3));
    console.log('Shuffled:', _.shuffle(data));
    console.log('Sample:', _.sample(data));
    console.log('Sum:', _.sum(data));
    console.log('Mean:', _.mean(data));
  </script>
</body>
</html>
```

### Exercise 15.2: Create a Date Formatter

```javascript
import dayjs from 'dayjs';

function formatDate(date, format = 'default') {
  const d = dayjs(date);
  
  const formats = {
    default: 'MMM D, YYYY',
    short: 'MM/DD/YY',
    long: 'MMMM D, YYYY',
    time: 'h:mm A',
    datetime: 'MMM D, YYYY h:mm A',
    iso: 'YYYY-MM-DD'
  };
  
  return d.format(formats[format] || format);
}

console.log(formatDate('2024-01-15'));          // Jan 15, 2024
console.log(formatDate('2024-01-15', 'short')); // 01/15/24
console.log(formatDate('2024-01-15', 'iso'));   // 2024-01-15
```

### Exercise 15.3: API Request with Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000
});

async function fetchUsers() {
  const response = await api.get('/users');
  return response.data;
}

async function fetchUserPosts(userId) {
  const response = await api.get(`/posts?userId=${userId}`);
  return response.data;
}

async function createPost(data) {
  const response = await api.post('/posts', data);
  return response.data;
}
```

## Summary

- Libraries provide pre-built functionality
- Include via CDN for quick setup
- Use npm for larger projects
- Popular: Lodash, Day.js, Axios, Chart.js
- Only import what you need
- Native methods often suffice

## Next Steps

Proceed to Module 16: Object-Oriented Programming to learn advanced JavaScript patterns.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)