# Level 148 - Performance optimization (caching, debounce, throttle) (Modules 19-20: Inheritance, Backend, Async/Await)

## Error Snippets

### Error 1: setInterval instead of throttle for scroll
**Description:** Use throttle to limit scroll handler execution to once per 100ms.
```javascript
window.addEventListener("scroll", () => {
  checkPosition();
});
```

### Error 2: Not debouncing search input
**Description:** Debounce the search API call by 300ms after the user stops typing.
```javascript
input.addEventListener("input", (e) => {
  fetch("/api/search?q=" + e.target.value)
    .then(r => r.json())
    .then(setResults);
});
```

### Error 3: Cache never invalidated
**Description:** Set a TTL (time-to-live) on cached data.
```javascript
const cache = new Map();
async function getData(url) {
  if (cache.has(url)) return cache.get(url);
  const res = await fetch(url);
  const data = await res.json();
  cache.set(url, data);
  return data;
}
```

### Error 4: Expensive operation in render loop
**Description:** Move the expensive calculation out of the render function.
```javascript
function ExpensiveList({ items }) {
  const sorted = items.sort((a, b) => b.value - a.value);
  const filtered = sorted.filter(item => item.active);
  return <div>{filtered.map(item => <div key={item.id}>{item.name}</div>)}</div>;
}
```

### Error 5: Not using useMemo for computed values
**Description:** Memoize the computed value with useMemo.
```javascript
function Dashboard({ transactions }) {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  return <div>Total: {total}</div>;
}
```

### Error 6: Not using useCallback for event handlers
**Description:** Memoize the event handler with useCallback.
```javascript
function List({ items, onDelete }) {
  return items.map(item => (
    <Item key={item.id} item={item} onDelete={() => onDelete(item.id)} />
  ));
}
```

### Error 7: Creating new arrays in render
**Description:** Memoize the filtered array with useMemo.
```javascript
function ProductList({ products, category }) {
  const filtered = products.filter(p => p.category === category);
  return filtered.map(p => <div key={p.id}>{p.name}</div>);
}
```

### Error 8: Not using React.memo for pure components
**Description:** Wrap the component in React.memo to prevent unnecessary re-renders.
```javascript
function UserCard({ user }) {
  return <div>{user.name}</div>;
}
```

### Error 9: Unnecessary state updates
**Description:** Only update state when the value actually changes.
```javascript
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <div>{count}</div>;
}
```

### Error 10: Not using requestAnimationFrame for animations
**Description:** Use requestAnimationFrame instead of setTimeout for smooth animations.
```javascript
function animate() {
  element.style.left = pos + "px";
  pos += 1;
  setTimeout(animate, 16);
}
```

### Error 11: Large dependency array in useEffect
**Description:** Reduce the dependency array to only the necessary values.
```javascript
function Profile({ user, settings, theme, language }) {
  useEffect(() => {
    fetch("/api/profile/" + user.id).then(r => r.json()).then(setData);
  }, [user, settings, theme, language]);
  return <div>{data}</div>;
}
```

### Error 12: Inline function in JSX props
**Description:** Define the function outside the render or use useCallback.
```javascript
function ButtonList({ items }) {
  return items.map(item => (
    <button key={item.id} onClick={() => handleClick(item.id)}>
      {item.name}
    </button>
  ));
}
```

### Error 13: Not using key prop in lists
**Description:** Add a unique key prop to each list item.
```javascript
function List({ items }) {
  return items.map(item => <div>{item.name}</div>);
}
```

### Error 14: Not breaking up large components
**Description:** Split the large component into smaller, focused components.
```javascript
function Dashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [analytics, setAnalytics] = useState({});
  // 200 lines of JSX
  return <div>{/* huge JSX tree */}</div>;
}
```

### Error 15: Forgetting to remove event listeners
**Description:** Clean up event listeners in the useEffect return function.
```javascript
useEffect(() => {
  window.addEventListener("resize", handleResize);
}, []);
```

### Error 16: Not using Context selectors
**Description:** Use multiple contexts or useMemo to prevent unnecessary re-renders.
```javascript
const AppContext = createContext();
function Consumer() {
  const { user, theme, language } = useContext(AppContext);
  return <div>{user.name}</div>;
}
```

### Error 17: Large bundle size from unused imports
**Description:** Remove unused imports to reduce bundle size.
```javascript
import { map, filter, reduce, find, sortBy, groupBy, debounce, throttle, flatten } from "lodash";
```

### Error 18: Not using code splitting
**Description:** Use dynamic import() for route-level code splitting.
```javascript
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Profile from "./Profile";
```

### Error 19: Not debouncing window resize
**Description:** Debounce the resize handler to avoid excessive calculations.
```javascript
window.addEventListener("resize", () => {
  recalculateLayout();
});
```

### Error 20: Not throttling scroll listener
**Description:** Throttle the scroll listener to once every 200ms.
```javascript
window.addEventListener("scroll", () => {
  loadMoreItems();
});
```

### Error 21: Forcing layout thrashing
**Description:** Batch DOM reads and writes to prevent layout thrashing.
```javascript
elements.forEach(el => {
  const width = el.offsetWidth;
  el.style.height = width + "px";
});
```

### Error 22: Not using CSS animations instead of JS
**Description:** Use CSS transitions/animations instead of JavaScript for simple animations.
```javascript
function fadeIn(element) {
  let opacity = 0;
  const interval = setInterval(() => {
    opacity += 0.1;
    element.style.opacity = opacity;
    if (opacity >= 1) clearInterval(interval);
  }, 50);
}
```

### Error 23: Not using virtual scrolling for large lists
**Description:** Implement virtual scrolling to render only visible items.
```javascript
function LongList({ items }) {
  return items.map(item => <div key={item.id}>{item.name}</div>);
}
```

### Error 24: Heavy computation in render
**Description:** Move heavy computation to a web worker.
```javascript
function HeavyComponent({ data }) {
  const result = expensiveCalculation(data);
  return <div>{result}</div>;
}
```

### Error 25: Not lazy loading images
**Description:** Use loading="lazy" on images below the fold.
```javascript
function ImageGallery({ images }) {
  return images.map(src => <img src={src} alt="" />);
}
```

### Error 26: Not using useTransition for urgent updates
**Description:** Use useTransition to mark non-urgent state updates.
```javascript
function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
    fetch("/api/search?q=" + query).then(r => r.json()).then(setResults);
  }, [query]);
  return <div>...</div>;
}
```

### Error 27: Redundant API calls on mount
**Description:** Fetch data only once on mount, not in multiple places.
```javascript
function Header() {
  useEffect(() => { fetch("/api/user").then(r => r.json()).then(setUser); }, []);
  return <div>{user?.name}</div>;
}
function Sidebar() {
  useEffect(() => { fetch("/api/user").then(r => r.json()).then(setUser); }, []);
  return <div>{user?.name}</div>;
}
```

### Error 28: Not using blob URLs for large data
**Description:** Use URL.createObjectURL for binary data instead of base64.
```javascript
async function loadImage(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  const reader = new FileReader();
  reader.onload = () => setSrc(reader.result);
  reader.readAsDataURL(blob);
}
```

### Error 29: Deep object comparison in useEffect
**Description:** Use a stable reference or stringify for deep comparison.
```javascript
useEffect(() => {
  fetch("/api/search", { method: "POST", body: JSON.stringify(filters) })
    .then(r => r.json())
    .then(setResults);
}, [filters]);
```

### Error 30: Not using IndexedDB for large caches
**Description:** Use IndexedDB instead of localStorage for large cached data.
```javascript
const cache = {};
async function getCached(key) {
  if (cache[key]) return cache[key];
  const data = await fetch("/api/data/" + key).then(r => r.json());
  cache[key] = data;
  return data;
}
```

### Error 31: Not using web workers for CPU-intensive tasks
**Description:** Move the CPU-intensive task to a web worker.
```javascript
function processData(data) {
  let result = 0;
  for (let i = 0; i < 1000000000; i++) result += data[i % data.length];
  return result;
}
```

### Error 32: Multiple re-renders from sequential state updates
**Description:** Batch related state updates together.
```javascript
function handleSubmit(data) {
  setLoading(true);
  setError(null);
  setSuccess(false);
  fetch("/api/submit", { method: "POST", body: JSON.stringify(data) })
    .then(r => r.json())
    .then(() => {
      setLoading(false);
      setSuccess(true);
    });
}
```

### Error 33: Not using Suspense for data fetching
**Description:** Wrap async components in Suspense with a fallback.
```javascript
function App() {
  return (
    <div>
      <Dashboard />
      <Settings />
    </div>
  );
}
```

### Error 34: Recreating objects in render
**Description:** Define objects outside render or use useMemo.
```javascript
function ConfigPanel() {
  const defaultConfig = { theme: "dark", fontSize: 14 };
  return <ConfigEditor config={defaultConfig} />;
}
```

### Error 35: Not using WeakMap for private data
**Description:** Use WeakMap to store private data without memory leaks.
```javascript
const privateData = new Map();
class User {
  constructor(name) {
    privateData.set(this, { name });
  }
  getName() { return privateData.get(this).name; }
}
```

### Error 36: Inline styles creating new objects
**Description:** Define style objects outside the render method.
```javascript
function StyledDiv() {
  return <div style={{ color: "red", fontSize: 16 }}>Hello</div>;
}
```

### Error 37: Not using display name in production
**Description:** Remove console.log statements in production builds.
```javascript
function calculateTotal(items) {
  console.log("Calculating total for", items.length, "items");
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### Error 38: Not preloading critical resources
**Description:** Add preload links for critical fonts and images.
```javascript
// No preload tags
```

### Error 39: Not using content visibility
**Description:** Use content-visibility: auto for off-screen sections.
```javascript
<div className="section">
  {/* content */}
</div>
```

### Error 40: Fetch polyfill slowing down modern browsers
**Description:** Use native fetch instead of a polyfill in modern browsers.
```javascript
import "whatwg-fetch";
```

### Error 41: Not compressing large JSON responses
**Description:** Enable gzip compression on the server for JSON responses.
```javascript
res.json(largeData);
```

### Error 42: Not using CDN for static assets
**Description:** Serve static assets from a CDN.
```javascript
<script src="/static/bundle.js"></script>
```

### Error 43: No cache headers on static assets
**Description:** Set Cache-Control with a long max-age for static assets.
```javascript
app.use(express.static("public"));
```

### Error 44: Too many HTTP requests
**Description:** Bundle multiple API requests into a single batch request.
```javascript
fetch("/api/user").then(r => r.json());
fetch("/api/posts").then(r => r.json());
fetch("/api/comments").then(r => r.json());
```

### Error 45: Not using connection pooling for DB
**Description:** Use a connection pool instead of creating new connections.
```javascript
app.get("/api/users", (req, res) => {
  const conn = mysql.createConnection(config);
  conn.query("SELECT * FROM users", (err, users) => {
    res.json(users);
    conn.end();
  });
});
```

### Error 46: Not using database indexes
**Description:** Add database indexes on frequently queried fields.
```javascript
db.query("SELECT * FROM users WHERE email = ?", [email]);
```

### Error 47: N+1 query problem
**Description:** Use JOIN or batch loading instead of per-item queries.
```javascript
const users = await db.findAll("users");
for (const user of users) {
  user.posts = await db.findAll("posts", { where: { userId: user.id } });
}
```

### Error 48: Not using Redis for session storage
**Description:** Use Redis instead of in-memory session storage for scalability.
```javascript
app.use(session({
  store: new MemoryStore(),
  secret: "keyboard cat"
}));
```

### Error 49: Synchronous file read in server
**Description:** Use asynchronous file operations to avoid blocking the event loop.
```javascript
const config = JSON.parse(fs.readFileSync("config.json"));
app.get("/api/data", (req, res) => {
  res.json(config);
});
```

### Error 50: Not paginating database queries
**Description:** Add LIMIT and OFFSET to database queries.
```javascript
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, users) => {
    res.json(users);
  });
});
```

### Error 51: Oversized state in React context
**Description:** Split the context into smaller, focused contexts.
```javascript
const AppContext = createContext();
function App() {
  const value = { user, settings, theme, notifications, permissions, config };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
```

### Error 52: Not using immutable data structures
**Description:** Use immutable patterns with spread operator instead of mutations.
```javascript
function addItem(items, newItem) {
  items.push(newItem);
  return items;
}
```

### Error 53: Prop drilling through many layers
**Description:** Use context or component composition to avoid prop drilling.
```javascript
function Page({ user }) {
  return <Header user={user} />;
}
function Header({ user }) {
  return <UserMenu user={user} />;
}
function UserMenu({ user }) {
  return <div>{user.name}</div>;
}
```

### Error 54: Not using Fragment to avoid extra divs
**Description:** Use React.Fragment instead of wrapping divs.
```javascript
function Columns() {
  return (
    <div>
      <td>Column 1</td>
      <td>Column 2</td>
    </div>
  );
}
```

### Error 55: Too many re-renders from context changes
**Description:** Split context to avoid unrelated changes triggering re-renders.
```javascript
const ThemeContext = createContext();
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button style={{ color: theme.color }}>Click</button>;
}
```

### Error 56: Not using server-side rendering for initial load
**Description:** Implement SSR for faster initial page load.
```javascript
// Client-side rendering only
const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

### Error 57: Unoptimized images
**Description:** Use optimized image formats like WebP with responsive sizes.
```javascript
<img src="/photo.jpg" alt="photo" />
```

### Error 58: Not using text compression
**Description:** Enable text compression (gzip, brotli) on the server.
```javascript
// No compression middleware
```

### Error 59: Render blocking CSS and JS
**Description:** Defer non-critical CSS and JS.
```javascript
<link rel="stylesheet" href="styles.css" />
<script src="app.js"></script>
```

### Error 60: Not using tree shaking
**Description:** Use ES module imports that support tree shaking.
```javascript
const lodash = require("lodash");
```

### Error 61: Multiple state updates in loop
**Description:** Batch all updates and apply them at once.
```javascript
function updateAll(items) {
  items.forEach(item => {
    setState(prev => ({ ...prev, [item.id]: item }));
  });
}
```

### Error 62: Not using useRef for mutable values
**Description:** Use useRef for values that should not trigger re-renders.
```javascript
function Timer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <div>{count}</div>;
}
```

### Error 63: Not using memo for selector functions
**Description:** Memoize Redux selector functions with createSelector.
```javascript
const selectUsers = (state) => state.users;
const selectActiveUsers = (state) => state.users.filter(u => u.active);
```

### Error 64: Unsubscribed observables
**Description:** Unsubscribe from observables on component unmount.
```javascript
useEffect(() => {
  const subscription = observable.subscribe(setData);
}, []);
```

### Error 65: Not using cache-control for API responses
**Description:** Set appropriate Cache-Control headers on API responses.
```javascript
app.get("/api/products", (req, res) => {
  res.json(products);
});
```

### Error 66: Not using HTTP/2 multiplexing
**Description:** Serve assets from the same origin to leverage HTTP/2.
```javascript
<script src="https://cdn1.example.com/bundle.js"></script>
<script src="https://cdn2.example.com/vendor.js"></script>
```

### Error 67: Blocking event loop with heavy sync work
**Description:** Offload heavy synchronous work to a child process or worker.
```javascript
function processCSV(data) {
  const rows = data.split("\n");
  const result = [];
  for (const row of rows) {
    result.push(parseRow(row));
  }
  return result;
}
```

### Error 68: Not using requestIdleCallback for non-critical work
**Description:** Use requestIdleCallback for low-priority background tasks.
```javascript
function saveDraft() {
  localStorage.setItem("draft", JSON.stringify(draft));
}
```

### Error 69: Creating functions in render
**Description:** Define functions outside the render or use useCallback.
```javascript
function Form() {
  const [value, setValue] = useState("");
  return <input onChange={(e) => setValue(e.target.value)} />;
}
```

### Error 70: Not profiling and measuring performance
**Description:** Use React DevTools Profiler to identify performance bottlenecks.
```javascript
// No performance measurements
```

## Issue Snippets

### Issue 1: No memoization for repeated API calls
**Description:** Cache API responses mapped by URL.
```javascript
async function fetchUser(id) {
  const res = await fetch("/api/users/" + id);
  return res.json();
}
```

### Issue 2: Expensive sort in render
**Description:** Memoize the sorted list with useMemo.
```javascript
function SortedList({ items }) {
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
  return sorted.map(item => <div key={item.id}>{item.name}</div>);
}
```

### Issue 3: Unnecessary effect re-runs
**Description:** Specify the correct dependency array for useEffect.
```javascript
useEffect(() => {
  fetch("/api/data").then(r => r.json()).then(setData);
});
```

### Issue 4: No debounce on typeahead search
**Description:** Debounce the search handler to reduce API calls.
```javascript
function SearchBox() {
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetch("/api/search?q=" + query).then(r => r.json()).then(setResults);
  }, [query]);
  return <input onChange={e => setQuery(e.target.value)} />;
}
```

### Issue 5: Too many useState calls
**Description:** Combine related state into a single object or use useReducer.
```javascript
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [age, setAge] = useState(0);
const [role, setRole] = useState("user");
```

### Issue 6: Component re-renders on parent state change
**Description:** Use React.memo to prevent unnecessary child re-renders.
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  return <div>
    <ExpensiveChild />
    <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
  </div>;
}
```

### Issue 7: No throttle on resize handler
**Description:** Throttle the resize handler to improve performance.
```javascript
window.addEventListener("resize", () => {
  chart.resize();
});
```

### Issue 8: Large context value causing unnecessary updates
**Description:** Split the context into smaller values.
```javascript
const StoreContext = createContext();
function StoreProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const value = { user, setUser, cart, setCart, orders, setOrders };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
```

### Issue 9: Not using React.lazy for route components
**Description:** Lazy load route components with React.lazy.
```javascript
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
```

### Issue 10: Deeply nested component tree
**Description:** Flatten the component tree to reduce overhead.
```javascript
function App() {
  return <div>
    <div>
      <div>
        <div>
          <div>
            <p>Deeply nested</p>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
```

### Issue 11: No image lazy loading
**Description:** Add loading="lazy" to images.
```javascript
function Gallery() {
  return images.map(src => <img src={src} alt="" />);
}
```

### Issue 12: Heavy computation in event handler
**Description:** Move heavy computation to a web worker or debounce it.
```javascript
input.addEventListener("input", (e) => {
  const results = expensiveSearch(e.target.value);
  showResults(results);
});
```

### Issue 13: Loading all data at once
**Description:** Implement pagination or infinite scroll.
```javascript
async function loadAll() {
  const everything = await fetch("/api/all-data").then(r => r.json());
  setData(everything);
}
```

### Issue 14: Not using stable keys in lists
**Description:** Use a stable unique identifier as the key prop.
```javascript
function List({ items }) {
  return items.map((item, index) => <div key={index}>{item.name}</div>);
}
```

### Issue 15: Frequent localStorage writes
**Description:** Throttle or debounce writes to localStorage.
```javascript
function saveState(state) {
  localStorage.setItem("app_state", JSON.stringify(state));
}
```

### Issue 16: Not using IntersectionObserver for lazy loading
**Description:** Use IntersectionObserver instead of scroll events for lazy loading.
```javascript
window.addEventListener("scroll", () => {
  document.querySelectorAll("[data-src]").forEach(img => {
    if (isInViewport(img)) {
      img.src = img.dataset.src;
    }
  });
});
```

### Issue 17: Large inline source maps in production
**Description:** Use external source maps or disable them in production.
```javascript
// webpack config
devtool: "inline-source-map"
```

### Issue 18: Not using static file caching
**Description:** Serve static files with far-future cache headers.
```javascript
app.use(express.static("build"));
```

### Issue 19: No bundle size monitoring
**Description:** Use a tool to monitor and alert on bundle size changes.
```javascript
// No bundle analysis
```

### Issue 20: Not using compression in Express
**Description:** Add compression middleware to Express.
```javascript
const express = require("express");
const app = express();
```

### Issue 21: Multiple useEffect for related effects
**Description:** Combine related logic into a single useEffect.
```javascript
useEffect(() => {
  fetch("/api/user").then(r => r.json()).then(setUser);
}, []);
useEffect(() => {
  fetch("/api/settings").then(r => r.json()).then(setSettings);
}, []);
```

### Issue 22: Not using aria attributes impacting accessibility
**Description:** Add proper aria attributes for accessibility.
```javascript
<button onClick={handleClick}>Submit</button>
```

### Issue 23: No service worker for caching
**Description:** Register a service worker for offline caching.
```javascript
// No service worker
```

### Issue 24: Not using preconnect for third-party origins
**Description:** Add preconnect links for external resources.
```javascript
<script src="https://third-party.com/sdk.js"></script>
```

### Issue 25: Font loading causes layout shift
**Description:** Use font-display: swap to prevent layout shift.
```javascript
@font-face {
  font-family: "CustomFont";
  src: url("/fonts/custom.woff2");
}
```

### Issue 26: Not using code coverage analysis
**Description:** Remove unused code identified by code coverage tools.
```javascript
function unusedFunction() {
  // never called
}
```

### Issue 27: Over-fetching data from API
**Description:** Request only the fields needed from the API.
```javascript
app.get("/api/users/:id", (req, res) => {
  db.findById("users", req.params.id, (err, user) => {
    res.json(user);
  });
});
```

### Issue 28: Not using response streaming
**Description:** Stream large responses instead of buffering them.
```javascript
app.get("/api/large-report", (req, res) => {
  const data = generateReport();
  res.json(data);
});
```

### Issue 29: No debounce on expensive calculations
**Description:** Debounce expensive input processing.
```javascript
input.addEventListener("input", (e) => {
  const processed = processInput(e.target.value);
  displayResults(processed);
});
```

### Issue 30: Not using tiered storage strategy
**Description:** Use memory cache first, then IndexedDB, then network.
```javascript
async function getData(url) {
  const res = await fetch(url);
  return res.json();
}
```

## Modify Snippets

### Modify 1: Add debounce to search input
**Description:** Debounce the API call by 300ms after the user stops typing.
```javascript
input.addEventListener("input", (e) => {
  fetch("/api/search?q=" + e.target.value)
    .then(r => r.json())
    .then(setResults);
});
```

### Modify 2: Add throttle to scroll handler
**Description:** Limit scroll handler execution to once every 200ms.
```javascript
window.addEventListener("scroll", () => {
  checkPosition();
});
```

### Modify 3: Add cache with TTL to API calls
**Description:** Cache fetch responses with a 60-second timeout.
```javascript
async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}
```

### Modify 4: Add useMemo to expensive calculation
**Description:** Memoize the sorted and filtered list.
```javascript
function ItemList({ items, filter }) {
  const filtered = items.filter(i => i.category === filter).sort((a, b) => a.name.localeCompare(b.name));
  return filtered.map(i => <div key={i.id}>{i.name}</div>);
}
```

### Modify 5: Add React.memo to pure component
**Description:** Wrap the component in React.memo to avoid unnecessary re-renders.
```javascript
function UserRow({ user, onSelect }) {
  return <tr onClick={() => onSelect(user.id)}><td>{user.name}</td></tr>;
}
```

### Modify 6: Add useCallback to event handler
**Description:** Memoize the click handler with useCallback.
```javascript
function ItemList({ items, onDelete }) {
  return items.map(item => (
    <Item key={item.id} item={item} onDelete={() => onDelete(item.id)} />
  ));
}
```

### Modify 7: Add cleanup to event listener
**Description:** Remove the event listener on unmount.
```javascript
useEffect(() => {
  window.addEventListener("resize", handleResize);
}, []);
```

### Modify 8: Add proper dependency array to useEffect
**Description:** Specify the correct dependencies for the effect.
```javascript
useEffect(() => {
  fetch("/api/user/" + userId).then(r => r.json()).then(setUser);
}); // missing dependency array
```

### Modify 9: Add code splitting with React.lazy
**Description:** Lazy load the heavy dashboard component.
```javascript
import Dashboard from "./Dashboard";
```

### Modify 10: Add key prop to list items
**Description:** Add a unique key prop to each mapped element.
```javascript
function List({ items }) {
  return items.map(item => <div>{item.name}</div>);
}
```

### Modify 11: Add content-visibility to off-screen sections
**Description:** Apply content-visibility: auto to long sections.
```javascript
function LongSection({ content }) {
  return <div className="section">{content}</div>;
}
```

### Modify 12: Add loading="lazy" to images
**Description:** Lazy load images below the fold.
```javascript
function ImageComponent({ src, alt }) {
  return <img src={src} alt={alt} />;
}
```

### Modify 13: Add requestAnimationFrame for smooth animations
**Description:** Use rAF instead of setTimeout for animation.
```javascript
function animateElement(el, targetPos) {
  let pos = 0;
  const step = () => {
    pos += 1;
    el.style.transform = translateX(${pos}px);
    if (pos < targetPos) setTimeout(step, 16);
  };
  step();
}
```

### Modify 14: Add pagination to large list
**Description:** Implement client-side pagination for a large array.
```javascript
function DataTable({ allData }) {
  return allData.map(d => <tr key={d.id}><td>{d.name}</td></tr>);
}
```

### Modify 15: Add virtual scrolling to long list
**Description:** Use a virtual scroller library for lists with 10000+ items.
```javascript
function LongList({ items }) {
  return items.map(item => <div key={item.id}>{item.name}</div>);
}
```

### Modify 16: Add batch state updates
**Description:** Combine multiple setState calls into one.
```javascript
function handleLoad(data) {
  setLoading(false);
  setError(null);
  setData(data);
}
```

### Modify 17: Add useRef for interval ID
**Description:** Store the interval ID in a ref to avoid stale closures.
```javascript
function Timer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, 1000);
  }, []);
  return <div>{count}</div>;
}
```

### Modify 18: Add compression middleware to Express
**Description:** Enable gzip compression for all HTTP responses.
```javascript
const express = require("express");
const app = express();
app.get("/api/data", (req, res) => res.json({ data: "test" }));
```

### Modify 19: Add cache headers to static files
**Description:** Set Cache-Control with max-age for static assets.
```javascript
app.use(express.static("public", { maxAge: 0 }));
```

### Modify 20: Add preload for critical resources
**Description:** Preload the main font and hero image.
```javascript
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

### Modify 21: Add database index to frequently queried field
**Description:** Create an index on the email field.
```javascript
db.query("SELECT * FROM users WHERE email = ?", [email]);
```

### Modify 22: Add useTransition for non-urgent updates
**Description:** Mark search results update as non-urgent.
```javascript
function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
    fetch("/api/search?q=" + query).then(r => r.json()).then(setResults);
  }, [query]);
  return <div>...</div>;
}
```

### Modify 23: Add useDeferredValue for slow renders
**Description:** Defer the rendering of the slow list.
```javascript
function SearchResults({ query }) {
  const results = useMemo(() => {
    return allItems.filter(i => i.name.includes(query));
  }, [query, allItems]);
  return results.map(i => <div key={i.id}>{i.name}</div>);
}
```

### Modify 24: Add requestIdleCallback for background save
**Description:** Save the draft during idle time.
```javascript
function autoSave(draft) {
  localStorage.setItem("draft", JSON.stringify(draft));
}
```

### Modify 25: Add connection pooling for database
**Description:** Replace single connection with a connection pool.
```javascript
const connection = mysql.createConnection(config);
app.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, users) => res.json(users));
});
```

### Modify 26: Add N+1 query fix with JOIN
**Description:** Use a JOIN query to fetch users with their posts.
```javascript
const users = await db.findAll("users");
for (const user of users) {
  user.posts = await db.findAll("posts", { where: { userId: user.id } });
}
```

### Modify 27: Add tree-shaking friendly imports
**Description:** Import only the needed functions from lodash.
```javascript
import _ from "lodash";
```

### Modify 28: Add service worker registration
**Description:** Register a service worker for offline caching.
```javascript
// No service worker registration
```

### Modify 29: Add preconnect for third-party API
**Description:** Preconnect to the API server to reduce latency.
```javascript
fetch("https://api.example.com/data");
```

### Modify 30: Add font-display: swap
**Description:** Prevent invisible text during font loading.
```javascript
@font-face {
  font-family: "BodyFont";
  src: url("/fonts/body.woff2");
}
```

### Modify 31: Add useMemo for context value
**Description:** Memoize the context value to prevent unnecessary re-renders.
```javascript
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const value = { theme, setTheme };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
```

### Modify 32: Add pagination to API endpoint
**Description:** Add LIMIT and OFFSET with page parameter.
```javascript
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, users) => {
    res.json(users);
  });
});
```

### Modify 33: Add request batching
**Description:** Batch multiple API requests into one.
```javascript
async function getUser(id) { return fetch("/api/users/" + id).then(r => r.json()); }
async function getPosts(id) { return fetch("/api/users/" + id + "/posts").then(r => r.json()); }
```

### Modify 34: Add IndexedDB for large data cache
**Description:** Store large cached data in IndexedDB instead of memory.
```javascript
const memoryCache = new Map();
async function getCached(url) {
  if (memoryCache.has(url)) return memoryCache.get(url);
  const data = await fetch(url).then(r => r.json());
  memoryCache.set(url, data);
  return data;
}
```

### Modify 35: Add IntersectionObserver for lazy loading
**Description:** Use IntersectionObserver instead of scroll event.
```javascript
function lazyLoadImages() {
  document.querySelectorAll("[data-src]").forEach(img => {
    if (isInViewport(img)) {
      img.src = img.dataset.src;
    }
  });
}
window.addEventListener("scroll", lazyLoadImages);
```

### Modify 36: Add web worker for heavy computation
**Description:** Move the expensive calculation to a web worker.
```javascript
function processLargeArray(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += complexCalculation(data[i]);
  }
  return sum;
}
```

### Modify 37: Add split context to prevent unnecessary updates
**Description:** Split the large context into user and theme contexts.
```javascript
const AppContext = createContext();
function App() {
  const value = { user, theme, language, notifications };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
```

### Modify 38: Add memo to Redux selector
**Description:** Memoize the filtered users selector.
```javascript
const selectActiveUsers = (state) => state.users.filter(u => u.active);
```

### Modify 39: Add Fragment to avoid extra DOM nodes
**Description:** Use React.Fragment instead of a wrapper div.
```javascript
function Table() {
  return <div>
    <td>Column A</td>
    <td>Column B</td>
  </div>;
}
```

### Modify 40: Add defer to non-critical scripts
**Description:** Defer loading of non-critical JavaScript.
```javascript
<script src="analytics.js"></script>
<script src="app.js"></script>
```

### Modify 41: Add async to external scripts
**Description:** Load external scripts asynchronously.
```javascript
<script src="https://third-party.com/widget.js"></script>
```

### Modify 42: Add server-side caching with Redis
**Description:** Cache API responses in Redis with a TTL.
```javascript
app.get("/api/products", async (req, res) => {
  const products = await db.findAll("products");
  res.json(products);
});
```

### Modify 43: Add CDN for static assets
**Description:** Serve assets from a CDN URL.
```javascript
<script src="/js/bundle.js"></script>
```

### Modify 44: Add proper error boundary for error recovery
**Description:** Wrap the component tree in an error boundary.
```javascript
function App() {
  return <Dashboard />;
}
```

### Modify 45: Add useRef for previous value comparison
**Description:** Track the previous value to avoid unnecessary updates.
```javascript
function CountDisplay({ count }) {
  const [prevCount, setPrevCount] = useState(count);
  if (count !== prevCount) {
    setPrevCount(count);
    console.log("Count changed from", prevCount, "to", count);
  }
  return <div>{count}</div>;
}
```

### Modify 46: Add render optimization with selector
**Description:** Subscribe only to the slice of state the component needs.
```javascript
function UserName({ userId }) {
  const user = useSelector(state => state.users.find(u => u.id === userId));
  return <div>{user?.name}</div>;
}
```

### Modify 47: Add stable object references
**Description:** Define objects outside the component to maintain reference stability.
```javascript
function ConfigForm() {
  return <Form initialValues={{ theme: "dark", fontSize: 14 }} />;
}
```

### Modify 48: Add request deduplication layer
**Description:** Prevent duplicate in-flight requests to the same URL.
```javascript
async function fetchDeduped(url) {
  const res = await fetch(url);
  return res.json();
}
```

### Modify 49: Add lazy hydration for below-fold content
**Description:** Defer hydration of components below the viewport.
```javascript
function BelowFold() {
  return <ExpensiveComponent />;
}
```

### Modify 50: Add progressive image loading
**Description:** Load a blurry thumbnail first, then the full image.
```javascript
function ProgressiveImage({ src, thumbSrc }) {
  return <img src={src} alt="" />;
}
```
