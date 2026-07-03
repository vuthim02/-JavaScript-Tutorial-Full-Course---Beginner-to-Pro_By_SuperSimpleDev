# 23 — Code Splitting

## Loading Only What's Needed

Instead of one large 1MB bundle for the entire app, split into chunks:

```
Home page      → 200KB
Dashboard      → 300KB
Settings       → 150KB
Admin panel    → 350KB
```

Loaded only when the user visits that route.

## Dynamic Import

The key to code splitting:

```javascript
// Static import (loaded immediately, included in bundle)
import { processData } from "./utils/data.js";

// Dynamic import (loaded on demand)
const module = await import("./admin.js");
```

`import()` returns a Promise. The module is fetched when the `import()` call executes.

## Dynamic Import in Action

```javascript
// Instead of:
import { AdminDashboard } from "./pages/Admin.js";

// Do:
const AdminDashboard = React.lazy(() => import("./pages/Admin.js"));

// Or vanilla:
button.addEventListener("click", async () => {
    const { showAdmin } = await import("./admin.js");
    showAdmin();
});
```

## How the Bundler Splits

```
Entry: src/main.js
          │
          ▼
Dependency graph:
  main.js
    ├─ home.js        → included in main chunk
    ├─ dashboard.js   → included in main chunk
    └─ import("./admin.js") → SEPARATE CHUNK

Output:
  dist/main.a1b2.js         (shared code + home + dashboard)
  dist/admin.c3d4.js        (admin module, loaded on demand)
```

## Route-Based Splitting (React Example)

```javascript
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Admin = lazy(() => import("./pages/Admin"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
```

## Chunk Naming

```javascript
// vite.config.js
export default {
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: "chunks/[name]-[hash].js",
                manualChunks: {
                    vendor: ["react", "react-dom"], // Separate vendor chunk
                },
            },
        },
    },
};
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is module loaded immediately? | Static `import` = immediate. Dynamic `import()` = on demand. |
| Or lazily? | Check for `import()`, `React.lazy()`, or route-based dynamic imports. |
| What is the split point? | The location of the `import()` call defines the split boundary. |
| How many chunks does the app produce? | Check the `dist/` folder for multiple JS files. |
## Next Steps

[Back to Chapter 22](22-minification.md): 22 — Minification
[Proceed to Chapter 24](24-environment-variables.md): 24 — Environment Variables to learn about 24 — environment variables.
