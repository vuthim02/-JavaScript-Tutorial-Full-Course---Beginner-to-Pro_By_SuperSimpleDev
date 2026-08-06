# 18 - React, Vue, Angular & Svelte: Framework Patterns & Concepts

## Table of Contents

1. [React Fundamentals](#1-react-fundamentals)
2. [Hooks Complete Guide](#2-hooks-complete-guide)
3. [Custom Hooks](#3-custom-hooks)
4. [Component Patterns](#4-component-patterns)
5. [State Management](#5-state-management)
6. [React Router](#6-react-router)
7. [Performance Optimization](#7-performance-optimization)
8. [Error Handling](#8-error-handling)
9. [Forms](#9-forms)
10. [React Server Components (RSC)](#10-react-server-components-rsc)
11. [Server Actions](#11-server-actions)
12. [Next.js Patterns](#12-nextjs-patterns)
13. [Styling Approaches](#13-styling-approaches)
14. [Testing](#14-testing)
15. [Refs and forwardRef](#15-refs-and-forwardref)
16. [Context Patterns](#16-context-patterns)
17. [Key Patterns and Reconciliation](#17-key-patterns-and-reconciliation)
18. [Portal](#18-portal)
19. [Suspense and Concurrent Features](#19-suspense-and-concurrent-features)
20. [React 19 New Features](#20-react-19-new-features)
21. [Vue.js Fundamentals & Patterns](#21-vuejs-fundamentals--patterns)
22. [Angular Fundamentals & Patterns](#22-angular-fundamentals--patterns)
23. [Svelte Fundamentals](#23-svelte-fundamentals)
24. [React vs Vue vs Angular vs Svelte](#24-react-vs-vue-vs-angular-vs-svelte)

---

## 1. React Fundamentals

### JSX (JavaScript XML)

JSX is not HTML — it is syntactic sugar that Babel compiles into `React.createElement()` calls.

```jsx
// JSX compiles to:
const element = React.createElement('h1', { className: 'greeting' }, 'Hello');

// Key differences from HTML:
// - class → className
// - for → htmlFor
// - tabindex → tabIndex
// - Inline styles are objects: style={{ color: 'red' }}
// - Must close self-closing tags: <img />, <br />
// - Expressions in curly braces {} (no if/for statements, use ternaries/map)
// - Components must be capitalized: <MyComponent /> not <myComponent />
```

**JSX Rules:**
- Must return a single root element (use `<>...</>` fragments)
- All tags must be closed
- camelCase for attribute names
- JavaScript expressions inside `{}` — functions, ternaries, `.map()`, variables

### Components

React components are **functions that return JSX**. Class components are legacy since React 16.8.

```jsx
// Function component (modern)
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Arrow function variant
const Welcome = ({ name }) => <h1>Hello, {name}!</h1>;

// Component composition
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}
```

### Props (Properties)

Props are **read-only** function parameters passed from parent to child. They implement **unidirectional (one-way) data flow**.

```jsx
// Passing props
<UserCard name="Alice" age={30} isPremium={true} />

// Destructuring with defaults
function UserCard({ name, age = 18, isPremium = false }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isPremium && <span>Premium</span>}
    </div>
  );
}

// Spread props
<Avatar {...userProps} />

// Children prop (composition)
<Card>
  <p>This is card content</p>
</Card>
```

**Props Rules:**
- Props are immutable — never modify them in the child
- Props are snapshots — each render gets a new version
- Use default values via destructuring (`size = 100`)
- `children` receives nested JSX content

### State

State is **component-local mutable data** managed via hooks. Unlike props, state is owned and controlled by the component.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // Functional update (when new state depends on previous)
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </div>
  );
}
```

**State Rules:**
- State updates are **asynchronous** — React batches updates
- **Never mutate** state directly — always create new objects/arrays
- State is a **snapshot** — `setCount(count + 1)` uses the value at call time
- Use **functional updates** (`setState(prev => newValue)`) when new state depends on previous
- If two siblings need shared state, **lift state up** to the common parent

### Lifecycle

Class component lifecycle methods are replaced by hooks in function components:

| Class Method | Hook Equivalent |
|---|---|
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | `useEffect(() => { return cleanup }, [])` |
| `shouldComponentUpdate` | `React.memo` |
| `getDerivedStateFromProps` | Derived state during render |
| `componentDidCatch` | Error Boundaries |

**Lifecycle Order:**
1. Mount → render → commit to DOM → effects run (`useEffect`)
2. Update → re-render → commit → cleanup old effects → run new effects
3. Unmount → cleanup effects

---

## 2. Hooks Complete Guide

### Rules of Hooks

1. **Only call hooks at the top level** — never inside loops, conditions, or nested functions
2. **Only call hooks from React functions** — function components or other custom hooks
3. **Name must start with `use`** — enables ESLint enforcement

### useState

```jsx
const [state, setState] = useState(initialValue);

// Lazy initialization (for expensive defaults)
const [state, setState] = useState(() => computeExpensiveValue());

// Functional update
setState(prev => prev + 1);

// Updating objects (immutably)
setPerson({ ...person, name: 'New Name' });

// Updating arrays (immutably)
setList([...list, newItem]);
setList(list.map(item => item.id === id ? { ...item, done: true } : item));
```

### useEffect

Runs **after render** to synchronize with external systems. Replaces componentDidMount, componentDidUpdate, and componentWillUnmount.

```jsx
useEffect(() => {
  // Side effect here
  const subscription = api.subscribe(id);
  
  // Cleanup function (runs before next effect and on unmount)
  return () => subscription.unsubscribe();
}, [id]); // Dependency array — effect re-runs when deps change
```

**Dependency Array Rules:**
- `[]` — runs once on mount only
- `[a, b]` — runs when `a` or `b` changes
- Omitted — runs after every render (usually wrong)
- Include **every value** the effect reads
- **Never suppress** the exhaustive-deps lint warning

**Common Patterns:**
```jsx
// Data fetching with cleanup
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(setData);
  return () => controller.abort();
}, [url]);

// Event listener
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

### useContext

```jsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext); // No prop drilling needed
  return <div className={theme} />;
}
```

### useReducer

Alternative to `useState` for complex state logic with multiple sub-values.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: throw new Error('Unknown action');
  }
}

// Usage
dispatch({ type: 'increment' });
```

**When to choose `useReducer` over `useState`:**
- State has multiple related sub-values
- Next state depends heavily on previous state
- State transitions follow clear action patterns
- Want to centralize and test update logic independently

### useMemo

Caches the result of an expensive computation. Only recalculates when dependencies change.

```jsx
const sorted = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

**When to use:** Expensive computations (sorting/filtering 1K+ items), referential stability for objects passed as props to memoized children.

### useCallback

Caches a function reference. Same as `useMemo(() => fn, deps)`.

```jsx
const handleSubmit = useCallback((data) => {
  api.submit(data);
}, []); // Stable reference across renders
```

**When to use:** Passed as props to `React.memo`-wrapped children, used in `useEffect` dependency arrays.

### useRef

Returns a mutable ref object that persists across renders without triggering re-renders.

```jsx
const inputRef = useRef(null);
// DOM access
inputRef.current.focus();

// Mutable value (timer ID, previous value)
const prevCount = useRef(count);
useEffect(() => { prevCount.current = count; });
```

### useLayoutEffect

Runs **synchronously after DOM mutations but before browser paint**. Use for DOM measurements/mutations that must happen before the user sees the screen.

```jsx
useLayoutEffect(() => {
  const rect = ref.current.getBoundingClientRect();
  setPosition({ top: rect.top, left: rect.left });
}, []);
```

### useImperativeHandle

Customizes the instance value exposed with `forwardRef`.

```jsx
const inputRef = useRef(null);
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus(),
  clear: () => { inputRef.current.value = ''; }
}));
```

### useId

Generates a stable unique ID safe for SSR hydration.

```jsx
const id = useId(); // ":r1:" (consistent between server and client)
<input id={id} aria-describedby={`${id}-error`} />
```

### useDeferredValue

Defers updating a value, showing the previous value until React has time to render the new one.

```jsx
const deferredQuery = useDeferredValue(query);
// Shows stale results while new results compute
```

### useTransition

Marks state updates as non-urgent, keeping the UI responsive.

```jsx
const [isPending, startTransition] = useTransition();

function handleSearch(value) {
  startTransition(() => {
    setSearchQuery(value); // Non-urgent update
  });
}
```

### useSyncExternalStore

Subscribe to external stores (Redux, Zustand, etc.) with automatic tearing prevention in concurrent mode.

```jsx
const snapshot = useSyncExternalStore(
  store.subscribe,    // Subscribe function
  store.getSnapshot,  // Get current value
  store.getServerSnapshot // Optional: for SSR
);
```

### useInsertionEffect

Runs before DOM mutations. Designed for CSS-in-JS libraries to inject styles.

---

## 3. Custom Hooks

Custom hooks are **plain functions starting with `use`** that call other hooks. They share **logic, not state** — each component gets its own isolated copy.

### Common Custom Hooks

```jsx
// useToggle
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn(v => !v), []);
  return { on, toggle, setTrue: () => setOn(true), setFalse: () => setOn(false) };
}

// useDebounce
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// useLocalStorage
function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const setValue = (value) => {
    const v = value instanceof Function ? value(stored) : value;
    setStored(v);
    localStorage.setItem(key, JSON.stringify(v));
  };
  return [stored, setValue];
}

// useFetch (with AbortController)
function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [url]);

  return { data, error, loading };
}

// useMediaQuery
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}
```

### Design Principles

- **Single responsibility** — one concern per hook
- **Stable references** — return memoized callbacks with `useCallback`
- **SSR-safe** — guard browser APIs with `typeof window !== 'undefined'`
- **Clean up everything** — event listeners, timers, subscriptions, AbortController
- **Return clear contracts** — `{ data, error, isLoading, refetch }` not internals

---

## 4. Component Patterns

### Custom Hooks (Modern Default)

The primary pattern for sharing stateful logic. Preferred over all others in modern React.

```jsx
function useUserData(userId) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);
  return { user: data, loading, error };
}

function Profile({ userId }) {
  const { user, loading } = useUserData(userId);
  if (loading) return <Skeleton />;
  return <UserCard user={user} />;
}
```

### Compound Components

Related components share implicit state via Context. Used for flexible UI APIs (tabs, accordions, selects).

```jsx
const AccordionContext = createContext();

function Accordion({ children }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <AccordionContext.Provider value={{ openIndex, toggle: setOpenIndex }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ index, children }) {
  const { openIndex, toggle } = useContext(AccordionContext);
  return (
    <div>
      <button onClick={() => toggle(openIndex === index ? null : index)}>
        {children}
      </button>
    </div>
  );
}
```

### Container/Presentational

Separates data logic (container) from UI rendering (presentational). In modern React, the "container" is often a custom hook.

```jsx
// Presentational — pure UI
function UserCard({ name, email, avatar }) {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}

// Container — data fetching
function UserCardContainer({ userId }) {
  const { data: user, isLoading } = useFetch(`/api/users/${userId}`);
  if (isLoading) return <Skeleton />;
  return <UserCard {...user} />;
}
```

### Render Props

A component calls a function prop to delegate rendering. Still used by headless UI libraries.

```jsx
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>
      {render(pos)}
    </div>
  );
}

// Usage
<MouseTracker render={({ x, y }) => <Cursor x={x} y={y} />} />
```

### Higher-Order Components (HOC)

A function that takes a component and returns an enhanced component. **Largely replaced by custom hooks.**

```jsx
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();
    if (loading) return <Spinner />;
    if (!user) return <Navigate to="/login" />;
    return <WrappedComponent {...props} user={user} />;
  };
}

const ProtectedDashboard = withAuth(Dashboard);
```

**HOC Problems:** Wrapper hell, prop collisions, poor TypeScript inference, hard to trace prop origins.

### Provider Pattern

Uses React Context to share global data without prop drilling.

```jsx
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = async (credentials) => {
    const user = await api.login(credentials);
    setUser(user);
  };
  const value = useMemo(() => ({ user, login }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Split contexts by domain to avoid unnecessary re-renders
```

---

## 5. State Management

### State Types in 2026

| Type | What | Typical Tool |
|---|---|---|
| Local State | Single component data | `useState`, `useReducer` |
| Global State | Shared across components | Zustand, Context, Redux Toolkit |
| Server State | API data | TanStack Query, SWR |
| URL State | Search params, pagination | `useSearchParams`, router |
| Form State | Complex forms | React Hook Form, Zod |

### React Context API

Built-in, zero-bundle, good for infrequently changing values (theme, locale, auth).

```jsx
const ThemeContext = createContext({ theme: 'light', toggle: () => {} });

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggle = useCallback(() => setTheme(t => t === 'light' ? 'dark' : 'light'), []);
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

**Context Limitations:** Re-renders all consumers on any value change. No selector support. Not ideal for frequently changing state.

### Zustand (~1.2KB) — The New Default

```jsx
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}));

// Usage — no Provider needed
function Counter() {
  const count = useStore(state => state.count);
  const increment = useStore(state => state.increment);
  return <button onClick={increment}>{count}</button>;
}

// Middleware: persist, devtools, immer
const useStore = create(
  persist(
    (set) => ({ count: 0, increment: () => set(s => ({ count: s.count + 1 })) }),
    { name: 'storage-key' }
  )
);
```

### Redux Toolkit (~11KB) — Enterprise Standard

```jsx
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; }, // Immer — mutable style, immutable output
    decrement: (state) => { state.value -= 1; },
  },
});

const store = configureStore({ reducer: { counter: counterSlice.reducer } });

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(counterSlice.actions.increment())}>{count}</button>;
}
```

### Jotai (~3.5KB) — Atomic State

```jsx
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);
const doubledAtom = atom((get) => get(countAtom) * 2); // Derived atom

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Recoil — Archived by Meta (2025)

Recoil has been archived. Jotai is the closest spiritual successor with smaller bundle size (3.5KB vs 22KB) and no string key requirement.

### MobX — Observable Reactivity

```jsx
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

class TimerStore {
  seconds = 0;
  constructor() { makeAutoObservable(this); }
  increment() { this.seconds += 1; }
}

const store = new TimerStore();
const Timer = observer(() => <p>{store.seconds}s</p>);
```

### Signals

Fine-grained reactivity that bypasses React's reconciliation. Preact Signals can be used with React but are fragile across versions. The TC39 Signals proposal is at Stage 1 (Feb 2026). React's team does not support signals as they conflict with React's "UI as function of state" model.

### Decision Matrix

| Criteria | Context | Zustand | Redux Toolkit | Jotai | MobX |
|---|---|---|---|---|---|
| Bundle size | 0KB | ~1.2KB | ~11KB | ~3.5KB | ~16KB |
| Learning curve | Low | Low | Medium-High | Low-Medium | Medium |
| Boilerplate | Low | Very Low | Medium | Very Low | Low |
| Selective subscription | No | Yes (selectors) | Yes (useSelector) | Yes (per atom) | Yes (auto-tracking) |
| Provider required | Yes | No | Yes | Optional | No |
| DevTools | React DevTools | Redux DevTools | Redux DevTools (best) | Jotai DevTools | MobX DevTools |

---

## 6. React Router

### React Router v7 (2026)

React Router v7 combines React Router v6 and Remix into a single full-stack framework.

**Three Modes:**
- **Declarative** — `<BrowserRouter>`, `<Routes>`, `<Route>` (simple SPAs)
- **Data** — `createBrowserRouter` + `RouterProvider` (loaders, actions, error boundaries)
- **Framework** — File-system routing with route modules (full-stack apps)

### Declarative Routing

```jsx
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <main><Outlet /></main> {/* Child routes render here */}
    </div>
  );
}
```

### Data Router (Modern Pattern)

```jsx
import { createBrowserRouter, RouterProvider, useLoaderData, useParams, redirect } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: async () => {
          const res = await fetch('/api/stats');
          return res.json();
        },
      },
      {
        path: 'contacts/new',
        element: <NewContact />,
        action: async ({ request }) => {
          const formData = await request.formData();
          await createContact(Object.fromEntries(formData));
          return redirect('/contacts');
        },
      },
      {
        path: 'users/:userId',
        element: <UserProfile />,
        loader: async ({ params }) => {
          const res = await fetch(`/api/users/${params.userId}`);
          if (!res.ok) throw new Response('Not Found', { status: 404 });
          return res.json();
        },
      },
    ],
  },
]);

function Dashboard() {
  const data = useLoaderData(); // Data from loader
  return <h1>{data.title}</h1>;
}
```

### Key Hooks

| Hook | Purpose |
|---|---|
| `useNavigate` | Programmatic navigation: `navigate('/home')` |
| `useParams` | Read URL params: `const { id } = useParams()` |
| `useLoaderData` | Access loader results |
| `useLocation` | Read current URL info |
| `useSubmit` | Trigger actions imperatively |
| `useNavigation` | Loading/pending state |

---

## 7. Performance Optimization

### React.memo

Skips re-rendering when props are shallowly equal.

```jsx
const MemoizedList = React.memo(function List({ items, onSelect }) {
  return items.map(item => (
    <ListItem key={item.id} item={item} onSelect={onSelect} />
  ));
});
```

**When to use:** Component re-renders often with same props AND render is expensive. Profile first with React DevTools.

### React Compiler (React 19)

Automatically applies memoization at build time, reducing need for manual `React.memo`, `useMemo`, `useCallback`.

```jsx
// Before (manual memoization)
const handleClick = useCallback(() => setCount(c => c + 1), []);
const filtered = useMemo(() => items.filter(i => i.active), [items]);

// After (React Compiler handles it)
const handleClick = () => setCount(c => c + 1);
const filtered = items.filter(i => i.active);
```

### Code Splitting with React.lazy

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Admin = lazy(() => import('./pages/Admin'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Suspense>
  );
}
```

### Virtualization

For lists with 100+ items, render only visible DOM nodes.

```jsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div key={virtualRow.index} style={{ height: '50px' }}>
            {items[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Performance Checklist

1. **Profile first** — React DevTools Profiler before any optimization
2. **Route-level code splitting** — always do this
3. **Virtualize lists** — 100+ items
4. **Memo selectively** — only after profiling shows >50ms renders
5. **useTransition** — for non-urgent state updates (search, filters)
6. **Split Contexts** — separate by update frequency
7. **Stable keys** — never use array index for reorderable lists
8. **Images** — `loading="lazy"`, explicit `width`/`height`

---

## 8. Error Handling

### Error Boundaries

React class components that catch JavaScript errors in their child component tree.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

**Error Boundaries catch:**
- Rendering errors in child components
- Lifecycle method errors
- Constructor errors

**Error Boundaries do NOT catch:**
- Event handler errors (use try/catch)
- Async code (setTimeout, promises)
- Server-side rendering
- Errors in the boundary itself

### Next.js error.tsx

```tsx
// app/dashboard/error.tsx — must be a Client Component
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

---

## 9. Forms

### Controlled Components

State drives the input value. React re-renders on every keystroke.

```jsx
function ControlledForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    api.login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Uncontrolled Components

DOM holds the value. Read via refs or FormData on submit.

```jsx
function UncontrolledForm() {
  const inputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### React 19 Form Actions

```jsx
// No preventDefault needed — React handles it
function SignupForm() {
  async function signup(formData) {
    'use server';
    await createUser(formData);
  }
  return (
    <form action={signup}>
      <input name="email" />
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

### React Hook Form (~13KB)

Industry standard for forms. Uses uncontrolled inputs with refs — minimal re-renders.

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data) => {
    await api.login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type="email" />
      {errors.email && <p role="alert">{errors.email.message}</p>}
      <input {...register('password')} type="password" />
      {errors.password && <p role="alert">{errors.password.message}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
```

### Formik — Legacy

Formik uses a single Context that re-renders all consumers on every keystroke. **Not recommended for new projects.** React Hook Form is the modern replacement.

| Feature | React Hook Form | Formik |
|---|---|---|
| Re-renders | Per-field only | Entire form |
| Validation | Zod, Yup, custom | Yup, custom |
| Bundle | ~13KB | ~45KB |
| React 19 | Full support | No roadmap |
| Status | Active development | Frozen |

---

## 10. React Server Components (RSC)

Server Components run **only on the server**, send **zero JavaScript** to the client, and can directly access databases, file systems, and secrets.

```jsx
// This is a Server Component (default in Next.js App Router)
import { db } from '@/lib/db';

export default async function UserProfile({ userId }) {
  const user = await db.user.findUnique({ where: { id: userId } });
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {/* Client Component for interactivity */}
      <FollowButton userId={userId} />
    </div>
  );
}
```

**Server vs Client Components:**

| Feature | Server Component | Client Component |
|---|---|---|
| Directive | None (default) | `'use client'` |
| useState/useEffect | No | Yes |
| Browser APIs | No | Yes |
| Direct DB access | Yes | No |
| JS bundle cost | Zero | Full component JS |

**Rule:** Push `'use client'` as far down the tree as possible. A page can be a Server Component that passes data to a small Client Component leaf.

---

## 11. Server Actions

Server Actions let Client Components call async functions executed on the server.

```jsx
// Server Action (in a Server Component)
'use server';

export async function createPost(formData) {
  const title = formData.get('title');
  await db.post.create({ data: { title } });
  revalidatePath('/posts');
  redirect('/posts');
}

// Used in a Client Component
'use client';

function NewPostForm() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <button type="submit">Create Post</button>
    </form>
  );
}
```

**Composition with React 19:**
```jsx
'use client';

import { useActionState, useOptimistic } from 'react';
import { createPost } from './actions';

function NewPostForm() {
  const [state, formAction, isPending] = useActionState(createPost, null);

  return (
    <form action={formAction}>
      <input name="title" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Post'}
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

---

## 12. Next.js Patterns

### App Router Structure

```
app/
├── layout.tsx           # Root layout (wraps everything)
├── page.tsx             # Home page (/)
├── loading.tsx          # Global loading UI
├── error.tsx            # Global error boundary
├── not-found.tsx        # 404 page
├── (marketing)/         # Route group (no URL segment)
│   ├── layout.tsx       # Marketing layout
│   ├── about/page.tsx   # /about
│   └── pricing/page.tsx # /pricing
├── (app)/               # Authenticated route group
│   ├── layout.tsx       # App layout (sidebar)
│   └── dashboard/
│       ├── page.tsx     # /dashboard
│       └── loading.tsx  # Dashboard loading state
├── api/                 # Route Handlers (API routes)
│   └── users/route.ts
└── blog/
    └── [slug]/
        └── page.tsx     # /blog/:slug
```

### File Conventions

| File | Purpose |
|---|---|
| `page.tsx` | Route UI — makes URL accessible |
| `layout.tsx` | Wraps pages, persists across navigation |
| `loading.tsx` | Automatic Suspense boundary |
| `error.tsx` | Error boundary (must be `'use client'`) |
| `not-found.tsx` | 404 UI |
| `template.tsx` | Like layout but remounts on navigation |
| `route.ts` | API route (no UI) |
| `default.tsx` | Fallback for parallel routes |

### Data Fetching

```tsx
// Static (cached)
const data = await fetch('https://api.example.com/data');

// ISR (revalidate every 60s)
const data = await fetch('https://api.example.com/news', {
  next: { revalidate: 60 },
});

// Dynamic (every request)
const data = await fetch('https://api.example.com/stock', {
  cache: 'no-store',
});

// Tag-based invalidation
const data = await fetch(url, { next: { tags: [`product:${id}`] } });
// Later:
revalidateTag(`product:${id}`);
```

### ISR, SSR, SSG Comparison

| Strategy | When | Config |
|---|---|---|
| **SSG** (Static) | Content never changes | Default behavior |
| **ISR** | Changes hourly/daily | `export const revalidate = 3600` |
| **SSR** | Per-user data | `export const dynamic = 'force-dynamic'` |
| **PPR** | Mixed static + dynamic | `export const experimental_ppr = true` |

### Middleware

```ts
// middleware.ts — runs on every matched request
import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('session');
  if (request.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*'],
};
```

### Dynamic Routes (Next.js 15+)

```tsx
// params is now a Promise — must await
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <Article post={post} />;
}

// Pre-render known dynamic routes
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}
```

---

## 13. Styling Approaches

### CSS Modules

Scoped CSS per component. Zero runtime cost.

```css
/* Button.module.css */
.primary { background: blue; color: white; }
```

```jsx
import styles from './Button.module.css';
<button className={styles.primary}>Click</button>
```

### Tailwind CSS

Utility-first CSS framework. Most popular in 2026.

```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Click
</button>
```

### CSS-in-JS (styled-components)

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'gray'};
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
`;
```

### Comparison

| Approach | Runtime Cost | SSR | Scope | Performance |
|---|---|---|---|---|
| CSS Modules | Zero | Native | Per component | Best |
| Tailwind | Zero (build-time) | Native | Utility classes | Excellent |
| styled-components | Runtime | Requires setup | Per component | Good |
| Vanilla Extract | Zero (build-time) | Native | Per component | Excellent |

---

## 14. Testing

### Testing Stack (2026)

| Tool | Role |
|---|---|
| **Vitest** | Test runner (modern default, replaces Jest) |
| **React Testing Library** | Component rendering + assertions |
| **Playwright** | End-to-end testing |
| **MSW** | API mocking at network level |
| **@testing-library/user-event** | Realistic user interactions |
| **jest-axe** | Accessibility testing |

### Vitest Config

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

### Component Testing

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';

describe('LoginForm', () => {
  const user = userEvent.setup();

  it('submits form and shows success', async () => {
    server.use(
      http.post('/api/login', () => HttpResponse.json({ success: true }))
    );

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
  });
});
```

### Query Priority (RTL Philosophy)

```
1. getByRole        → Best (what screen readers see)
2. getByLabelText   → Good (form inputs with labels)
3. getByText        → OK (visible text)
4. getByAltText     → OK (images)
5. getByTestId      → Last resort
```

### E2E Testing with Playwright

```ts
import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Welcome')).toBeVisible();
});
```

### Testing Best Practices

- **Test behavior, not implementation** — query by role/label, not CSS class
- **Mock at network boundary** — MSW, not mocking `fetch` directly
- **Use `findBy*`** for async content (retries until element appears)
- **Suppress `console.error`** when testing Error Boundaries
- **Include accessibility checks** — `jest-axe` in component tests

---

## 15. refs and forwardRef

### useRef

```jsx
const inputRef = useRef(null);

// DOM access
useEffect(() => {
  inputRef.current.focus();
}, []);

return <input ref={inputRef} />;
```

### forwardRef (Legacy in React 19)

React 19 lets you pass `ref` as a regular prop — `forwardRef` is no longer needed.

```jsx
// React 18
const Input = forwardRef((props, ref) => <input ref={ref} {...props} />);

// React 19 — ref is just a prop
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

### useImperativeHandle

Customizes what `ref.current` exposes.

```jsx
function FancyInput({ ref }) {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
  }));
  return <input ref={inputRef} />;
}

// Parent
const ref = useRef();
<FancyInput ref={ref} />
<button onClick={() => ref.current.clear()}>Clear</button>
```

---

## 16. Context Patterns

### Split Contexts by Update Frequency

```jsx
// Bad: One monolithic context
<AppContext.Provider value={{ user, theme, notifications, settings }}>
  {/* Everything re-renders when anything changes */}
</AppContext.Provider>

// Good: Split by domain
<UserContext.Provider value={user}>
  <ThemeContext.Provider value={theme}>
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  </ThemeContext.Provider>
</UserContext.Provider>
```

### Memoize Context Value

```jsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggle = useCallback(() => setTheme(t => t === 'light' ? 'dark' : 'light'), []);
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
```

### Context + Reducer Pattern

```jsx
const TodoContext = createContext();
const TodoDispatchContext = createContext();

function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  return (
    <TodoContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  );
}

function useTodos() { return useContext(TodoContext); }
function useTodoDispatch() { return useContext(TodoDispatchContext); }
```

### Context Selector Pattern

```jsx
// Instead of consuming entire context
const { theme, user, settings } = useContext(AppContext); // Re-renders on ANY change

// Split into separate contexts or use a library like use-context-selector
const theme = useContext(ThemeContext);   // Only re-renders when theme changes
const user = useContext(UserContext);     // Only re-renders when user changes
```

---

## 17. Key Patterns and Reconciliation

### Reconciliation Algorithm

React uses a "diffing" algorithm to compare old and new virtual DOM trees:

1. **Different element types** → destroy old tree, build new tree
2. **Same element type** → update only changed props
3. **Keys** → identify which items in a list changed, were added, or removed

### Key Rules

```jsx
// Bad — using index as key (breaks when list reorders)
{items.map((item, index) => <Item key={index} item={item} />)}

// Good — using stable unique ID
{items.map(item => <Item key={item.id} item={item} />)}

// Bad — generating keys (defeats the purpose)
{items.map(item => <Item key={Math.random()} item={item} />)}
```

**When keys matter:**
- List items are reordered
- Items are inserted or deleted
- Items have local state that should be preserved

**When index keys are OK:**
- List is static and never reorders
- Items are generated during render and have no stable ID

### State Preservation with Keys

```jsx
// Reset component state by changing key
<Input key={formId} />

// Preserve component state (no key change)
<Input />
```

---

## 18. Portal

Portals render children into a different part of the DOM tree (typically `document.body`), while maintaining the React context hierarchy.

```jsx
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body // Render target
  );
}
```

**Portals are useful for:**
- Modals, dialogs, popovers
- Tooltips
- Dropdown menus
- Anything that needs to escape CSS `overflow: hidden` or `z-index` stacking

**Context still works** — a Portal maintains the React context hierarchy, so `useContext` inside the portal reads from the component tree where the portal was created, not where it renders in the DOM.

---

## 19. Suspense and Concurrent Features

### Suspense

Lets a component "wait" for an async resource and render a fallback meanwhile.

```jsx
import { Suspense, lazy } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />
      </Suspense>
    </div>
  );
}
```

**Nested Suspense boundaries:**
```jsx
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<MetricsSkeleton />}>
    <SlowMetrics />
  </Suspense>
  <Suspense fallback={<ChartSkeleton />}>
    <SlowChart />
  </Suspense>
</Suspense>
```

### useTransition

Marks updates as non-urgent. Keeps UI responsive during expensive computations.

```jsx
function SearchResults() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value); // Urgent: update input immediately
    startTransition(() => {
      setFilteredResults(filterItems(value)); // Non-urgent: can be interrupted
    });
  };

  return (
    <>
      <input value={query} onChange={handleSearch} />
      {isPending && <Spinner />}
      <ResultsList items={filteredResults} />
    </>
  );
}
```

### useDeferredValue

Defers a value you receive from props/parent.

```jsx
function ProductList({ products, query }) {
  const deferredQuery = useDeferredValue(query);
  const filtered = useMemo(
    () => products.filter(p => p.name.includes(deferredQuery)),
    [products, deferredQuery]
  );

  return (
    <>
      {query !== deferredQuery && <Spinner />}
      <ResultList items={filtered} />
    </>
  );
}
```

### useTransition vs useDeferredValue

| | useTransition | useDeferredValue |
|---|---|---|
| **Control** | You own the state update | Value comes from outside |
| **Mechanism** | Wraps `setState` call | Wraps the value itself |
| **Use when** | You control the update | Value arrives via props |

### Concurrent Rendering

React 18+ features that improve responsiveness:
1. **Interruptible render phase** — scheduler can pause in-progress renders
2. **Update priorities** — typing/clicks are urgent, transitions are not
3. **Automatic batching** — all state updates batched, even in promises/timeouts

---

## 20. React 19 New Features

### useActionState

Manages form submission state with pending flag.

```jsx
const [state, formAction, isPending] = useActionState(
  async (previousState, formData) => {
    const result = await createPost(formData);
    return result;
  },
  null // initial state
);
```

### useOptimistic

Show immediate UI feedback while async operations complete. Auto-reverts on failure.

```jsx
function TodoList({ todos }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, id: 'temp', sending: true }]
  );

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id} style={{ opacity: todo.sending ? 0.5 : 1 }}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}
```

### useFormStatus

Reads submission status of the nearest ancestor `<form>`.

```jsx
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>;
}
```

### use() Hook

Reads Promises or Context during render. Can be called conditionally (unlike other hooks).

```jsx
function UserProfile({ userPromise }) {
  const user = use(userPromise); // Suspends until resolved
  return <h1>{user.name}</h1>;
}
```

### Other React 19 Changes

- **`ref` as a prop** — `forwardRef` no longer needed
- **Document Metadata** — render `<title>`, `<meta>`, `<link>` in components
- **Stylesheets** — React ensures stylesheets load before content reveals
- **Resource Preloading** — `preinit`, `preload`, `prefetchDNS` APIs
- **React Compiler** — automatic memoization (formerly React Forget)
- **Stable RSC and Server Actions** — full production support
- **`startTransition` accepts async** — can do async work inside transitions

---

## 21. Vue.js Fundamentals & Patterns

### Core Philosophy

Vue is a **progressive framework** — adopt incrementally from sprinkling into a page to a full SPA. Uses templates with reactive data binding.

### Single-File Components (SFC)

```vue
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);
const increment = () => count.value++;
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
  <p>Doubled: {{ doubled }}</p>
</template>

<style scoped>
button { color: blue; }
</style>
```

### Reactivity System

| API | Purpose |
|---|---|
| `ref()` | Reactive primitive value |
| `reactive()` | Reactive object (Proxy-based) |
| `computed()` | Derived cached value |
| `watch()` | Watch specific source |
| `watchEffect()` | Auto-tracking side effect |

```vue
<script setup>
import { ref, watchEffect } from 'vue';

const name = ref('Alice');
const user = reactive({ name: 'Alice', age: 30 });

watchEffect(() => {
  console.log(`Name changed to ${name.value}`);
});
</script>
```

### Composition API Patterns

```vue
<script setup>
import { ref, onMounted } from 'vue';

// Composable (similar to custom hook)
function useCounter(initial = 0) {
  const count = ref(initial);
  const increment = () => count.value++;
  const decrement = () => count.value--;
  return { count, increment, decrement };
}

const { count, increment } = useCounter(10);
</script>
```

### Vue vs React

| Feature | Vue | React |
|---|---|---|
| Learning curve | Easier | Moderate |
| Reactivity | Fine-grained (Proxy) | Coarse-grained (Virtual DOM) |
| Component format | SFC (.vue) | JSX |
| State management | Pinia (official) | External (Zustand, Redux) |
| Meta-framework | Nuxt | Next.js |
| Bundle size | ~23KB | ~42KB |
| Job market | #2 | #1 |

### Vapor Mode (Vue 3.6)

Bypasses the Virtual DOM entirely with compiler-driven direct DOM manipulation. 97% faster renders than Virtual DOM approach.

---

## 22. Angular Fundamentals & Patterns

### Core Philosophy

Full platform — includes routing, forms, HTTP, testing, DI. **Batteries included.** TypeScript-first.

### Components

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="increment()">Count: {{ count() }}</button>
    <p>Doubled: {{ doubled() }}</p>
  `,
})
export class CounterComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);
  increment() { this.count.update(n => n + 1); }
}
```

### Angular Signals

```typescript
import { signal, computed, effect } from '@angular/core';

// Signal — fine-grained reactive primitive
const count = signal(0);
count.set(5);
count.update(n => n + 1);

// Computed — derived value
const doubled = computed(() => count() * 2);

// Effect — side effect that tracks dependencies
effect(() => console.log(`Count: ${count()}`));
```

### Dependency Injection

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  getUser(id: string) {
    return this.http.get<User>(`/api/users/${id}`);
  }
}

@Component({ ... })
export class UserProfile {
  constructor(private userService: UserService) {}
}
```

### Angular vs React

| Feature | Angular | React |
|---|---|---|
| Type | Full framework | Library |
| Learning curve | Steepest | Moderate |
| TypeScript | Required (first-class) | Supported |
| State mgmt | Services + Signals | External libraries |
| DI | Built-in | Not built-in |
| Bundle size | ~65KB | ~42KB |
| Change detection | Signals + Zone.js (optional) | Virtual DOM |
| Best for | Enterprise, large teams | Everything |

---

## 23. Svelte Fundamentals

### Core Philosophy

**Compiler-first** — no Virtual DOM. Components compile to vanilla JavaScript at build time that updates DOM directly.

### Basic Component

```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);

  function increment() {
    count++;
  }
</script>

<button on:click={increment}>
  Count: {count}
</button>
<p>Doubled: {doubled}</p>
```

### Svelte 5 Runes

| Rune | Purpose |
|---|---|
| `$state` | Reactive state variable |
| `$derived` | Computed value |
| `$effect` | Side effect |
| `$props` | Component props |
| `$bindable` | Two-way binding prop |

```svelte
<script>
  let { items = [], onSelect } = $props();
  let selected = $state(null);
  let itemCount = $derived(items.length);

  $effect(() => {
    console.log('Selected:', selected);
  });
</script>
```

### Stores (Shared State)

```js
// store.js
import { writable } from 'svelte/store';
export const count = writable(0);
```

```svelte
<script>
  import { count } from './store.js';
  $: doubled = $count * 2; // $ prefix auto-subscribes
</script>
<button on:click={() => $count++}>Count: {$count}</button>
```

### Svelte vs React

| Feature | Svelte | React |
|---|---|---|
| Approach | Compiler | Runtime (Virtual DOM) |
| Bundle size | ~2KB | ~42KB |
| Boilerplate | Least | Moderate |
| Reactivity | Fine-grained (compiled) | Coarse-grained (diffing) |
| Learning curve | Easy | Moderate |
| Ecosystem | Smaller | Largest |
| Meta-framework | SvelteKit | Next.js |

---

## 24. React vs Vue vs Angular vs Svelte

### Overview Comparison (2026)

| Feature | React | Vue | Angular | Svelte |
|---|---|---|---|---|
| Type | Library | Progressive framework | Full framework | Compiler |
| Reactivity | Coarse (Virtual DOM) | Fine-grained (Proxy) | Fine-grained (Signals) | Fine-grained (Compiled) |
| Bundle size | ~42KB | ~23KB | ~65KB+ | ~2KB |
| Learning curve | Moderate | Easiest | Steepest | Easy |
| Job market | #1 | #2 | Enterprise-heavy | Small |
| Meta-framework | Next.js | Nuxt | Analog | SvelteKit |
| TypeScript | Supported | Supported | Required | Excellent |
| Mobile | React Native | Capacitor | Ionic | Capacitor |
| Backed by | Meta | Community | Google | Vercel/Community |
| Best for | Maximum flexibility | Simplicity + DX | Enterprise scale | Performance |

### Reactivity Model Comparison

| Framework | Model | Core Primitive | Update Granularity |
|---|---|---|---|
| React | Virtual DOM diffing | `useState` / hooks | Component subtree |
| Vue | Proxy-based tracking | `ref()` / `reactive()` | Dependency-tracked nodes |
| Angular | Signals (Zone.js optional) | `signal()` | Signal consumers only |
| Svelte | Compile-time | `$state` / `$derived` | Compiled DOM bindings |

### Performance Comparison

| Framework | Virtual DOM | Compilation | Runtime Performance |
|---|---|---|---|
| React | Yes | React Compiler (auto-memo) | Good |
| Vue | Yes (+ Vapor Mode) | Vue Vapor | Very Good (Vapor) |
| Angular | Yes (Signals replace) | AOT compilation | Good (improving) |
| Svelte | None | Full compile-time | Excellent |

### When to Choose Each

| Scenario | Recommendation |
|---|---|
| Maximum job opportunities | React + Next.js |
| Fastest side project | Vue or Svelte |
| Large enterprise team | Angular |
| Best performance + smallest bundles | Svelte + SvelteKit |
| Full-stack with SSR | Next.js or Nuxt |
| Content-heavy site | Astro + framework islands |
| Learning first framework | Vue (gentlest curve) |
| Safest default | React |

### Key Trend: Virtual DOM Is Dying

In 2026, three major frameworks shipped compiler-driven alternatives to the Virtual DOM:
- **Svelte** — never had one (compiler-first since inception)
- **Vue 3.6 Vapor Mode** — bypasses VDOM entirely, 97% faster renders
- **Angular 22** — zoneless signals as default, eliminating Zone.js
- **React** — React Compiler + Server Components reduce VDOM costs but don't eliminate it

The convergence is toward **direct, fine-grained reactivity** — updating only specific DOM nodes that changed, without diffing an intermediate representation. React remains the most popular framework due to ecosystem size and hiring market, but the architectural direction is clear.

### The Meta-Framework Matters Most

In 2026, the meta-framework choice often matters more than the underlying UI library:

| Meta-Framework | Framework | Key Features |
|---|---|---|
| Next.js | React | Server Components, ISR, streaming, PPR |
| Nuxt | Vue | Universal rendering, auto-imports, Nitro server |
| SvelteKit | Svelte | Edge-first, minimal JS, excellent DX |
| Analog | Angular | Vite-powered, file-based routing |

---

*This guide covers the complete landscape of modern frontend frameworks as of 2026. React remains the ecosystem leader, but all frameworks have converged on similar ideas: server-first rendering, fine-grained reactivity, TypeScript, and compiler-driven optimization.*
