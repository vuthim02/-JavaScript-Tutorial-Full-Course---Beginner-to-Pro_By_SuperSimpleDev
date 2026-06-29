const curriculum = [
  {
    id: 'html-basics',
    title: 'HTML Basics',
    category: 'Frontend',
    order: 1,
    duration: '30 min',
    content: `HTML (HyperText Markup Language) is the backbone of every webpage.

Key concepts:
• Elements & Tags: <div>, <p>, <h1>-<h6>, <a>, <img>
• Attributes: id, class, src, href
• Semantic HTML: <header>, <nav>, <main>, <section>, <article>, <footer>
• Forms: <form>, <input>, <button>, <select>, <textarea>
• Media: <img>, <video>, <audio>, <iframe>

Practice:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Page</title>
</head>
<body>
  <header>
    <h1>Welcome</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
    </nav>
  </header>
  <main>
    <section>
      <h2>About Me</h2>
      <p>Hello! I'm learning full-stack development.</p>
    </section>
  </main>
  <footer>
    <p>&copy; 2026</p>
  </footer>
</body>
</html>
\`\`\`

Resources:
• freeCodeCamp: https://www.freecodecamp.org/learn/2022/responsive-web-design/
• MDN Docs: https://developer.mozilla.org/en-US/docs/Web/HTML
• YouTube (SuperSimpleDev tutorials)`,
    exercises: [
      'Create a personal portfolio page with header, main, and footer',
      'Build a form with name, email, and message fields',
      'Add an image gallery with 3 responsive images'
    ]
  },
  {
    id: 'css-basics',
    title: 'CSS Basics & Layout',
    category: 'Frontend',
    order: 2,
    duration: '45 min',
    content: `CSS brings your HTML to life with colors, layouts, and animations.

Key concepts:
• Selectors: element, .class, #id, descendant, child, pseudo-classes
• Box Model: margin, border, padding, content
• Flexbox: display:flex, justify-content, align-items, flex-wrap
• Grid: display:grid, grid-template-columns, gap
• Responsive Design: @media queries, rem/em units
• Colors: named, hex, rgb, hsl

Practice:
\`\`\`css
/* Flexbox layout */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

/* Grid layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
\`\`\`

Resources:
• freeCodeCamp: https://www.freecodecamp.org/learn/2022/responsive-web-design/
• CSS-Tricks: https://css-tricks.com/guides/
• YouTube (SuperSimpleDev CSS tutorials)`,
    exercises: [
      'Style your portfolio page with Flexbox layout',
      'Create a responsive card grid using CSS Grid',
      'Build a responsive navbar that collapses on mobile'
    ]
  },
  {
    id: 'js-fundamentals',
    title: 'JavaScript Fundamentals',
    category: 'Frontend',
    order: 3,
    duration: '60 min',
    content: `JavaScript makes your pages interactive. Master the fundamentals first.

Key concepts:
• Variables: let, const, var (prefer const/let)
• Data Types: string, number, boolean, null, undefined, object, array
• Functions: declarations, expressions, arrow functions
• Control Flow: if/else, switch, loops (for, while, forEach)
• Scope & Hoisting: global, function, block scope
• Template Literals: \`Hello \${name}\`

Practice:
\`\`\`js
// Arrow functions & template literals
const greet = (name) => \`Hello, \${name}! Welcome to JavaScript.\`;

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// DOM manipulation
document.querySelector('button').addEventListener('click', () => {
  document.querySelector('h1').textContent = 'Clicked!';
});
\`\`\`

Resources:
• freeCodeCamp: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/
• JavaScript.info: https://javascript.info/
• GeeksforGeeks: https://www.geeksforgeeks.org/javascript/
• YouTube (SuperSimpleDev JS tutorials)`,
    exercises: [
      'Build a counter app with increment/decrement/reset buttons',
      'Create a to-do list where you can add/remove items',
      'Write functions to filter, map, and reduce an array of objects'
    ]
  },
  {
    id: 'git-github',
    title: 'Git & GitHub',
    category: 'Tools',
    order: 4,
    duration: '30 min',
    content: `Version control is essential for every developer.

Key concepts:
• git init, clone, add, commit, push, pull
• Branching: git branch, checkout, merge, rebase
• Remote repos: origin, upstream, fork
• Pull Requests & Code Review
• .gitignore: what NOT to commit

Practice:
\`\`\`bash
# Start a project
git init
git add .
git commit -m "Initial commit"

# Branch workflow
git checkout -b feature-login
# ... make changes ...
git add .
git commit -m "Add login feature"
git checkout main
git merge feature-login

# Push to GitHub
git remote add origin https://github.com/your-username/repo.git
git push -u origin main
\`\`\`

Resources:
• GitHub Skills: https://skills.github.com/
• freeCodeCamp Git教程
• Oh Shit, Git!?!: https://ohshitgit.com/`,
    exercises: [
      'Initialize a repo, make 3 commits, push to GitHub',
      'Create a branch, make changes, merge it back to main',
      'Fork a repo, clone it, submit a PR with an improvement'
    ]
  },
  {
    id: 'js-dom',
    title: 'DOM Manipulation & Events',
    category: 'Frontend',
    order: 5,
    duration: '45 min',
    content: `The DOM (Document Object Model) lets JS interact with HTML.

Key concepts:
• Selecting: querySelector, querySelectorAll, getElementById
• Manipulating: textContent, innerHTML, classList, style
• Creating: createElement, appendChild, removeChild
• Events: click, submit, keydown, input, mouseover
• Event Delegation & Propagation (bubbling/capturing)

Practice:
\`\`\`js
// Event delegation
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('done');
  }
});

// Form handling
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('#task-input');
  addTask(input.value);
  input.value = '';
});
\`\`\`

Resources:
• MDN DOM: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
• JavaScript.info DOM: https://javascript.info/document`,
    exercises: [
      'Create a modal that opens/closes on button click',
      'Build a dynamic table that adds rows from form input',
      'Make a drag-and-drop list'
    ]
  },
  {
    id: 'async-js',
    title: 'Asynchronous JavaScript',
    category: 'Frontend',
    order: 6,
    duration: '45 min',
    content: `Master async programming — crucial for API calls and modern JS.

Key concepts:
• Callbacks: traditional async handling
• Promises: .then(), .catch(), .finally()
• Async/Await: cleaner async code
• Fetch API: GET, POST, PUT, DELETE
• Error Handling: try/catch with async/await

Practice:
\`\`\`js
// Fetch API with async/await
async function getUser(id) {
  try {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const user = await res.json();
    return user;
  } catch (err) {
    console.error('Failed to fetch user:', err);
  }
}

// Promise.all for parallel requests
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);
\`\`\`

Resources:
• MDN Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
• freeCodeCamp: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/
• JavaScript.info: https://javascript.info/async`,
    exercises: [
      'Fetch data from a public API and display it in a table',
      'Build a weather app using a free weather API',
      'Implement a search input that debounces API calls'
    ]
  },
  {
    id: 'react-basics',
    title: 'React Basics',
    category: 'Frontend',
    order: 7,
    duration: '60 min',
    content: `React is the most popular frontend framework. Build UI with components.

Key concepts:
• Components: function components, JSX
• Props: passing data to components
• State: useState hook
• Effects: useEffect hook
• Conditional Rendering: ternary, && operator
• Lists & Keys: .map() with unique keys

Practice:
\`\`\`jsx
import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

Resources:
• React Docs: https://react.dev/learn
• freeCodeCamp React: https://www.freecodecamp.org/learn/front-end-development-libraries/
• YouTube (SuperSimpleDev React tutorials)`,
    exercises: [
      'Build a counter component with useState',
      'Create a user list component that fetches from an API',
      'Build a todo app with add/delete/toggle complete using React state'
    ]
  },
  {
    id: 'node-express',
    title: 'Node.js & Express',
    category: 'Backend',
    order: 8,
    duration: '60 min',
    content: `Node.js lets you run JavaScript on the server. Express is the go-to framework.

Key concepts:
• Modules: require, module.exports, ES modules
• HTTP: req, res, status codes, headers
• Express Router: modular route handlers
• Middleware: express.json(), cors, custom middleware
• RESTful API: GET, POST, PUT, DELETE endpoints

Practice:
\`\`\`js
const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
let items = [];

// CRUD routes
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const item = { id: Date.now(), ...req.body };
  items.push(item);
  res.status(201).json(item);
});

app.put('/api/items/:id', (req, res) => {
  const idx = items.findIndex(i => i.id === +req.params.id);
  if (idx === -1) return res.status(404).send('Not found');
  items[idx] = { ...items[idx], ...req.body };
  res.json(items[idx]);
});

app.delete('/api/items/:id', (req, res) => {
  items = items.filter(i => i.id !== +req.params.id);
  res.status(204).send();
});

app.listen(3000, () => console.log('Server running on port 3000'));
\`\`\`

Resources:
• Node.js Docs: https://nodejs.org/en/docs/
• Express Guide: https://expressjs.com/en/guide/routing.html
• freeCodeCamp Node: https://www.freecodecamp.org/learn/back-end-development-and-apis/`,
    exercises: [
      'Build a REST API for a blog with posts and comments',
      'Add input validation and error handling middleware',
      'Create a file-based logging middleware'
    ]
  },
  {
    id: 'databases',
    title: 'Databases (MongoDB & SQL)',
    category: 'Backend',
    order: 9,
    duration: '45 min',
    content: `Persist your data with databases — SQL and NoSQL.

Key concepts:
• MongoDB: documents, collections, Mongoose ODM
• SQL (PostgreSQL): tables, rows, joins, indexes
• CRUD: create, read, update, delete operations
• Relationships: one-to-one, one-to-many, many-to-many
• ORM vs raw queries

Practice (MongoDB with Mongoose):
\`\`\`js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// CRUD
await User.create({ name: 'John', email: 'john@example.com' });
const users = await User.find();
const user = await User.findById('id');
await User.findByIdAndUpdate('id', { name: 'Jane' });
await User.findByIdAndDelete('id');
\`\`\`

Resources:
• MongoDB University: https://university.mongodb.com/
• PostgreSQL Tutorial: https://www.postgresqltutorial.com/
• freeCodeCamp DB tutorials
• MIT OpenCourseWare DB lectures`,
    exercises: [
      'Model a blog with User, Post, and Comment schemas in Mongoose',
      'Write SQL queries to JOIN users with their orders',
      'Build a REST API connected to MongoDB'
    ]
  },
  {
    id: 'fullstack-integration',
    title: 'Full-Stack Integration',
    category: 'Full Stack',
    order: 10,
    duration: '60 min',
    content: `Connect frontend, backend, and database into one application.

Key concepts:
• Environment Variables: .env for config
• CORS: allowing cross-origin requests
• API Design: consistent error responses, pagination
• Authentication: JWT tokens, bcrypt for passwords
• Deployment: Vercel (frontend), Render/Railway (backend)

Project structure:
\`\`\`
project/
├── client/          # React frontend
│   ├── src/
│   └── package.json
├── server/          # Express backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── package.json
└── .env
\`\`\`

Practice - Full stack auth flow:
\`\`\`js
// Backend - JWT middleware
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
};
\`\`\`

Resources:
• JWT.io: https://jwt.io/
• OWASP Security: https://owasp.org/www-project-top-ten/
• Railway Deploy: https://railway.app/`,
    exercises: [
      'Build a full-stack notes app with auth',
      'Deploy the backend on Railway and frontend on Vercel',
      'Add pagination and search to your API'
    ]
  },
  {
    id: 'testing',
    title: 'Testing & Debugging',
    category: 'Tools',
    order: 11,
    duration: '30 min',
    content: `Write tests to catch bugs early and ship with confidence.

Key concepts:
• Unit Tests: test individual functions
• Integration Tests: test API endpoints
• Testing Libraries: Jest, Vitest, Supertest
• Debugging: console, debugger, VS Code debugger
• TDD: Test-Driven Development (red-green-refactor)

Practice:
\`\`\`js
// Jest test
const { sum, filterEven } = require('./utils');

describe('Utils', () => {
  test('sum adds numbers', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(-1, 1)).toBe(0);
  });

  test('filterEven returns only even numbers', () => {
    expect(filterEven([1, 2, 3, 4])).toEqual([2, 4]);
    expect(filterEven([])).toEqual([]);
  });
});

// API test with Supertest
const request = require('supertest');
const app = require('../app');

describe('GET /api/items', () => {
  it('returns all items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
\`\`\`

Resources:
• Jest Docs: https://jestjs.io/docs/getting-started
• freeCodeCamp testing tutorials`,
    exercises: [
      'Write unit tests for a utility function library',
      'Write integration tests for your Express API',
      'Practice TDD: write tests before implementing a feature'
    ]
  },
  {
    id: 'deployment',
    title: 'Deployment & DevOps',
    category: 'DevOps',
    order: 12,
    duration: '30 min',
    content: `Ship your apps to the world with modern deployment tools.

Key concepts:
• CI/CD: GitHub Actions for automated testing & deploy
• Hosting: Vercel (frontend), Railway/Render (backend)
• Environment Config: separate dev/staging/prod
• Monitoring: error logging, uptime monitoring
• Domains & SSL: custom domains, free SSL

Quick deploy with Vercel:
\`\`\`bash
npm i -g vercel
vercel           # Deploy frontend
vercel --prod    # Deploy to production
\`\`\`

Resources:
• Vercel Docs: https://vercel.com/docs
• GitHub Actions: https://docs.github.com/en/actions
• MIT OCW DevOps lectures`,
    exercises: [
      'Deploy your frontend on Vercel',
      'Deploy your backend on Railway',
      'Set up a GitHub Actions workflow to run tests on push'
    ]
  }
];

const resources = {
  freeCodeCamp: {
    description: 'Free interactive coding platform with certifications',
    url: 'https://www.freecodecamp.org/learn/',
    tracks: {
      'Responsive Web Design': 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
      'JavaScript Algorithms': 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
      'Front End Libraries': 'https://www.freecodecamp.org/learn/front-end-development-libraries/',
      'Back End Development': 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
      'Quality Assurance': 'https://www.freecodecamp.org/learn/quality-assurance/'
    }
  },
  geeksforgeeks: {
    description: 'Computer science portal with tutorials and interview prep',
    url: 'https://www.geeksforgeeks.org/',
    topics: {
      'Data Structures': 'https://www.geeksforgeeks.org/data-structures/',
      'Algorithms': 'https://www.geeksforgeeks.org/fundamentals-of-algorithms/',
      'System Design': 'https://www.geeksforgeeks.org/system-design/'
    }
  },
  mitOCW: {
    description: 'MIT OpenCourseWare - free MIT course materials',
    url: 'https://ocw.mit.edu/',
    courses: {
      'Introduction to CS': 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/',
      'Software Engineering': 'https://ocw.mit.edu/courses/6-005-software-construction-spring-2016/',
      'Data Structures': 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/'
    }
  },
  github: {
    description: 'Explore the best repositories for learning',
    url: 'https://github.com/',
    repos: [
      { name: 'freeCodeCamp/freeCodeCamp', desc: 'Open source curriculum' },
      { name: 'EbookFoundation/free-programming-books', desc: 'Free programming books' },
      { name: 'kamranahmedse/developer-roadmap', desc: 'Full-stack roadmap' },
      { name: '30-seconds/30-seconds-of-code', desc: 'Short code snippets' },
      { name: 'getify/You-Dont-Know-JS', desc: 'Deep JS book series' },
      { name: 'trekhleb/javascript-algorithms', desc: 'Algorithms in JS' },
      { name: 'practical-tutorials/project-based-learning', desc: 'Project-based tutorials' },
      { name: 'florinpop17/app-ideas', desc: 'App ideas for practice' }
    ]
  }
};

function getLesson(id) {
  return curriculum.find(l => l.id === id);
}

function getLessonsByCategory(category) {
  return curriculum.filter(l => l.category === category);
}

function getNextLesson(currentId) {
  const current = curriculum.find(l => l.id === currentId);
  if (!current) return curriculum[0];
  return curriculum.find(l => l.order === current.order + 1);
}

const categories = [...new Set(curriculum.map(l => l.category))];

module.exports = { curriculum, resources, getLesson, getLessonsByCategory, getNextLesson, categories };
