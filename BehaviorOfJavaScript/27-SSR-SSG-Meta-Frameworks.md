# SSR, SSG, and Meta-Frameworks: Complete Research Guide

---

# PART 1 — Next.js

---

## 1. Next.js App Router: Pages, Layouts, Loading, Error, Not-Found

The App Router (stable since Next.js 13.4) uses a file-system based routing convention inside the `app/` directory. Every folder is a route segment, and special files define what renders at that segment.

### File Conventions

| File | Purpose |
|---|---|
| `page.tsx` | The UI for a route. Export a React component. |
| `layout.tsx` | Shared layout that wraps child pages. Persists across navigations (no re-mount). |
| `template.tsx` | Like layout but re-mounts on every navigation (useful for resetting form state). |
| `loading.tsx` | Loading UI — automatic `<Suspense>` fallback for the segment. |
| `error.tsx` | Error boundary — must be a Client Component (`'use client'`). |
| `not-found.tsx` | Custom 404 UI for the route segment. |
| `default.tsx` | Fallback for Parallel Route slots when URL doesn't match. |
| `route.ts` | API endpoint (Route Handler). Cannot coexist with `page.tsx` at same level. |

### Key Behaviors

- **Layouts persist across navigations.** If user navigates from `/dashboard/settings` to `/dashboard/profile`, the dashboard layout stays mounted. No teardown, no re-render. This preserves scroll position and sidebar state.
- **Layouts do NOT receive `searchParams`.** Only `page.tsx` receives `searchParams`. This is intentional for caching stability.
- **`loading.tsx` is Suspense sugar.** It wraps `page.tsx` in a `<Suspense>` boundary. Does NOT show on cached navigations (router cache holds for ~30s).
- **`error.tsx` must be `'use client'`** because React error boundaries rely on client-side lifecycle. It does NOT catch errors in the same segment's `layout.tsx` — you need a parent-level error boundary for layout errors.
- **`not-found.tsx`** renders when you call `notFound()` in a route segment.

### Dynamic Routes

Wrap folder name in square brackets: `[slug]` → `/blog/my-post`. Access via `params` prop:

```tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // ...
}
```

### Root Layout (Required)

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

### Route Groups

Parenthesized folders like `(marketing)` organize code without affecting the URL.

---

## 2. Next.js Pages Router: getServerSideProps, getStaticProps, getStaticPaths

The Pages Router lives in the `pages/` directory and uses three server-side data fetching functions.

### `getStaticProps`

Runs at **build time** on the server. Use when data is available ahead of time.

```tsx
export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchData()
  return {
    props: { data },
    revalidate: 60, // ISR: revalidate every 60 seconds
  }
}
```

- Returns `{ props }` → page receives data as props
- Returns `{ redirect: { destination } }` → redirects
- Returns `{ notFound: true }` → shows 404
- Does NOT have access to request (no cookies, headers, query params)

### `getStaticPaths`

Required when a page uses dynamic routes with `getStaticProps`. Tells Next.js which paths to pre-generate.

```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
    ],
    fallback: false, // | true | 'blocking'
  }
}
```

**Fallback modes:**
- `false` → unknown paths return 404
- `true` → serve fallback version, generate full page in background
- `'blocking'` → server-render on first request, cache for subsequent (user waits but no loading state)

### `getServerSideProps`

Runs on **every request** on the server. Use when content depends on request-time data.

```tsx
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, params, query } = context
  // Access cookies, headers, etc.
  const data = await fetchData(params.id)
  return { props: { data } }
}
```

### Comparison Table

| Function | When it runs | Use case |
|---|---|---|
| `getStaticProps` | Build time | Blog posts, landing pages |
| `getStaticPaths` + `getStaticProps` | Build time (per path) | Dynamic static pages (products) |
| `getServerSideProps` | Every request | User-specific, auth-dependent pages |

---

## 3. Server Components vs Client Components

Next.js App Router uses React Server Components (RSC) by default.

### Server Components (default)

- Render on the server, send HTML to client
- Can be `async` — directly `await` data fetches
- Can access databases, API keys, filesystem
- Zero JavaScript sent to the client for these components
- Cannot use state (`useState`), effects (`useEffect`), event handlers, or browser APIs

```tsx
// This is a Server Component by default
export default async function Page() {
  const data = await db.query('SELECT * FROM posts')
  return <div>{data.map(p => <Post key={p.id} post={p} />)}</div>
}
```

### Client Components

Add `'use client'` directive at top of file:

```tsx
'use client'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

- Can use state, effects, event handlers, browser APIs
- JavaScript is sent to the client for hydration
- All imports of a Client Component are included in the client bundle

### How They Work Together

**On the server:**
1. Server Components render to RSC Payload (compact binary format)
2. Client Components + RSC Payload prerender to HTML

**On the client (first load):**
1. HTML shows fast non-interactive preview
2. RSC Payload reconciles component trees
3. JavaScript hydrates Client Components

**Subsequent navigations:**
- RSC Payload fetched and cached (instant navigation)
- Client Components render entirely on the client

### Interleaving Pattern

Pass Server Components as children to Client Components:

```tsx
// page.tsx (Server Component)
import Modal from './modal'  // Client Component
import Cart from './cart'     // Server Component

export default function Page() {
  return (
    <Modal>
      <Cart />  {/* Server Component rendered on server, passed as prop */}
    </Modal>
  )
}
```

### Best Practices

- Add `'use client'` only to specific interactive components, not entire layouts
- Use `server-only` package to prevent accidental client imports
- Use `client-only` package to mark client-only modules
- Context providers must be Client Components (wrap them, pass children)

---

## 4. Server Actions

Server Actions (now called React Server Functions) let you call server-side functions directly from client components.

### Defining Server Actions

```tsx
// app/lib/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  // Validate, save to database...
  revalidatePath('/posts')
  redirect('/posts')
}
```

### Using with Forms

```tsx
// Server Component — works without JS
import { createPost } from '@/app/actions'

export default function Form() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  )
}
```

### Using in Client Components

```tsx
'use client'
import { createPost } from '@/app/actions'

export function Button() {
  return <button formAction={createPost}>Create</button>
}
```

### Key Features

- **Single-roundtrip response**: Returns updated UI + data in one server call
- **Progressive enhancement**: Forms work even without JavaScript
- **Pending states**: Use `useActionState` or `useTransition` for loading indicators
- **Revalidation**: Call `revalidatePath` or `revalidateTag` to update cached data
- **Redirect**: Call `redirect()` after mutation
- **Sequential dispatch**: Actions dispatch one at a time (no parallel mutations)
- **Security**: Always verify auth inside every action — they're reachable via direct POST

### With Event Handlers

```tsx
'use client'
import { incrementLike } from './actions'
import { useState } from 'react'

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)
  return (
    <button onClick={async () => {
      const updated = await incrementLike()
      setLikes(updated)
    }}>
      {likes} likes
    </button>
  )
}
```

---

## 5. Route Handlers (API Routes)

Route Handlers create API endpoints in the App Router using Web Standard `Request`/`Response` APIs.

### Basic Usage

```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const users = await db.getUsers()
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const user = await db.createUser(body)
  return NextResponse.json(user, { status: 201 })
}
```

### Multiple HTTP Methods

Export named functions: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`.

### Dynamic Routes

```tsx
// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return NextResponse.json({ id })
}
```

### Caching Behavior

- GET Route Handlers are NOT cached by default
- Opt into caching with `export const dynamic = 'force-static'`
- Other methods (POST, etc.) are never cached

### Proxy Pattern (BFF)

```tsx
export async function GET(request: NextRequest) {
  const res = await fetch('https://external-api.com/data', {
    headers: { authorization: request.headers.get('authorization')! }
  })
  return NextResponse.json(await res.json())
}
```

### Shared Middleware Pattern

```tsx
function withAuth(handler: Function) {
  return async (req: NextRequest, ctx: any) => {
    const token = req.cookies.get('token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return handler(req, ctx)
  }
}

export const GET = withAuth(secretGET)
```

---

## 6. Middleware

Middleware runs before a request is completed. Placed at the root of the project.

```tsx
// middleware.ts
import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
}
```

### Capabilities

- **Authentication**: Redirect unauthenticated users
- **A/B Testing**: Split traffic between variants
- **Locale Detection**: Redirect based on `Accept-Language`
- **Rewrites**: Rewrite URLs transparently
- **Headers**: Add/remove response headers

### Constraints

- Runs on Edge runtime (no Node.js APIs like `fs`, Prisma)
- Keep middleware thin: check cookies, redirect, set headers
- Heavy logic belongs in Server Components or Route Handlers

---

## 7. Parallel Routes and Intercepting Routes

### Parallel Routes

Render multiple pages simultaneously using named slots:

```
app/
├── layout.tsx      # receives { analytics, user } as props
├── page.tsx
├── @analytics/
│   ├── page.tsx
│   └── loading.tsx
└── @user/
    ├── page.tsx
    └── default.tsx  # Required! Fallback for unmatched navigations
```

```tsx
// app/layout.tsx
export default function Layout({ children, analytics, user }) {
  return (
    <div>
      <main>{children}</main>
      <aside>{analytics}</aside>
      <aside>{user}</aside>
    </div>
  )
}
```

- Each slot loads and fails independently
- Each has its own `loading.tsx`, `error.tsx`, `page.tsx`
- **Must add `default.tsx`** in each slot — without it, navigation to unmatched routes returns 404

### Intercepting Routes

Intercept navigation and show alternative view (modals):

```
app/
├── photo/[id]/
│   └── page.tsx          # Full photo page
├── @modal/
│   └── (.)photo/
│       └── [id]/
│           └── page.tsx  # Modal view (intercepted)
```

- `(.)` = intercept at same level
- `(..)` = intercept one level up
- `(...)` = intercept at root level

**Classic pattern:** Click photo → modal opens (intercepted route). Refresh page → full page renders (direct route).

---

## 8. Metadata API

### Static Metadata

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  description: 'A Next.js application',
}
```

### Dynamic Metadata

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, images: [post.coverImage] }
  }
}
```

### Features

- Type-safe with TypeScript
- Resolves before streaming begins for bots
- For capable crawlers, metadata can stream alongside content
- `generateMetadata` is async and runs on the server
- Built-in support for OpenGraph, Twitter cards, JSON-LD, canonical URLs
- `title.template` in layout: `%s | My Site` pattern

---

## 9. Image Optimization (`next/image`)

The `<Image>` component extends HTML `<img>` with automatic optimization.

### Basic Usage

```tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  width={800}
  height={400}
  alt="Hero image"
  priority  // For above-the-fold images
/>
```

### Core Features

| Feature | Description |
|---|---|
| **Format Optimization** | Auto-converts to WebP/AVIF based on browser support |
| **Responsive Sizing** | Generates multiple sizes, serves appropriate one per device |
| **Lazy Loading** | Default behavior — images load when entering viewport |
| **Layout Shift Prevention** | Reserves space via width/height, prevents CLS |
| **On-Demand Optimization** | Optimizes at request time, not build time |
| **Priority Loading** | `priority` prop preloads critical above-the-fold images |
| **Blur Placeholders** | `placeholder="blur"` shows blur-up effect while loading |
| **Fill Mode** | `fill` prop makes image fill parent container |

### Key Props

- `src` — image source (local import or remote string)
- `width` / `height` — required for remote images
- `alt` — always required for accessibility
- `priority` — preload for LCP images (use sparingly)
- `sizes` — responsive breakpoints string
- `quality` — compression quality (1-100, default 75)
- `placeholder` — `"blur"`, `"empty"`, or data URL
- `fill` — fill parent container (parent needs `position: relative`)

### Performance Impact

- 40-60% reduction in image file sizes
- 2-3x faster Largest Contentful Paint
- Near-zero Cumulative Layout Shift
- 25-35% improvement in overall page load

### Custom Loaders (CDN)

```tsx
<Image
  src="/hero.jpg"
  loader={({ src, width, quality }) =>
    `https://cdn.example.com/${src}?w=${width}&q=${quality || 75}`
  }
/>
```

---

## 10. Font Optimization (`next/font`)

`next/font` optimizes fonts at build time — downloads fonts during build, self-hosts them, and creates optimal CSS.

### Usage

```tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const mono = Roboto_Mono({ subsets: ['latin'], variable: '--font-mono' })

export default function Layout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### Benefits

- **Zero layout shift**: Fonts are sized with font-size-adjust and size-adjust
- **Self-hosted**: No external requests to Google Fonts
- **Built-in CSS subsetting**: Only loads characters used on page
- **Variable font support**: Single file for all weights
- **No FOUT**: Text remains visible using system fallback

---

## 11. Caching: Fetch Cache, Revalidate, Dynamic

### Fetch-Level Caching

```tsx
// Force cache this request
const data = await fetch('https://api.example.com/data', { cache: 'force-cache' })

// Never cache (dynamic)
const data = await fetch('https://api.example.com/data', { cache: 'no-store' })

// Revalidate after 60 seconds
const data = await fetch('https://api.example.com/data', { next: { revalidate: 60 } })
```

### Route Segment Config

```tsx
// page.tsx or layout.tsx
export const dynamic = 'auto'      // 'auto' | 'force-dynamic' | 'error' | 'force-static'
export const revalidate = false    // false | 0 | number (seconds)
export const fetchCache = 'auto'   // Controls caching behavior of all fetches in segment
```

- `dynamic = 'force-dynamic'` → equivalent to `getServerSideProps`
- `dynamic = 'error'` → equivalent to `getStaticProps` (errors if dynamic APIs used)
- `revalidate = 3600` → ISR: revalidate every hour

### On-Demand Revalidation

```tsx
// In a Server Action or Route Handler
import { revalidateTag, revalidatePath } from 'next/cache'

revalidateTag('posts')      // Invalidate all fetches tagged 'posts'
revalidatePath('/blog')     // Invalidate all data for /blog
```

### Tagging Fetches

```tsx
const data = await fetch('https://api.example.com/posts', {
  next: { tags: ['posts'] }
})
```

### Request-time APIs

Using `cookies()`, `headers()`, `useSearchParams()` forces dynamic rendering for the route.

---

## 12. ISR (Incremental Static Regeneration)

ISR allows static pages to be updated after deployment without rebuilding.

### Pages Router ISR

```tsx
export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchData()
  return {
    props: { data },
    revalidate: 60, // Revalidate every 60 seconds
  }
}
```

### App Router ISR

```tsx
// Option 1: Per-fetch revalidation
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 }
})

// Option 2: Route segment config
export const revalidate = 3600
```

### How It Works

1. Page is statically generated at build time
2. After `revalidate` seconds, next request triggers background regeneration
3. Old version served while new version generates
4. New version replaces old in cache
5. Process repeats

### On-Demand ISR

```tsx
// Trigger revalidation from Server Action
revalidateTag('products')
revalidatePath('/products')
```

### Fallback: 'blocking' (Pages Router)

For pages not generated at build time, server renders on first request, caches, serves from cache subsequently.

---

## 13. Streaming and Suspense

Streaming sends HTML progressively using chunked transfer encoding.

### How It Works

1. **Static shell** (layouts, nav, Suspense fallbacks) renders and streams immediately
2. **Suspense boundaries** stream in independently as data resolves
3. **Component payload** (RSC) arrives inline for hydration
4. **Selective hydration** — React hydrates components as they stream in

### Using `loading.tsx`

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />
}
```

Wraps entire `page.tsx` in a `<Suspense>` boundary.

### Granular Streaming with `<Suspense>`

```tsx
export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Loading revenue...</p>}>
        <Revenue />
      </Suspense>
      <Suspense fallback={<p>Loading orders...</p>}>
        <RecentOrders />
      </Suspense>
    </div>
  )
}
```

Each Suspense boundary resolves independently. Fast data appears first.

### Streaming Data to Client Components

```tsx
// Server Component
export default function Dashboard() {
  const statsPromise = getStats()  // Start fetch, don't await
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <StatsChart dataPromise={statsPromise} />
    </Suspense>
  )
}

// Client Component
'use client'
import { use } from 'react'

export function StatsChart({ dataPromise }) {
  const stats = use(dataPromise)  // Suspends until resolved
  return <div>{/* render chart */}</div>
}
```

### Key Principles

- Keep LCP elements **outside** Suspense boundaries
- Design skeleton fallbacks that **match final dimensions** (minimize CLS)
- Push dynamic access (`params`, `cookies()`) down into Suspense boundaries
- HTTP status code is committed before streaming starts — cannot change later
- `loading.tsx` = page-level, `<Suspense>` = granular control

---

## 14. Internationalization (i18n)

Next.js supports i18n through configuration and routing.

### Approach: Locale-Prefixed Routes

```
/en/about
/fr/about
/de/about
```

### Common Libraries

- **`next-intl`** — popular for App Router
- **`i18next` + `react-i18next`** — mature ecosystem
- **`next-i18next`** — Pages Router focused

### Implementation with `next-intl`

```
app/
├── [locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   └── about/
│       └── page.tsx
├── i18n/
│   └── request.ts
└── messages/
    ├── en.json
    └── fr.json
```

### Features

- Locale-aware routing with automatic detection
- Localized metadata (SEO-friendly)
- Language switcher component
- Dynamic translation loading
- Middleware for locale detection and redirects

### Config in `next.config.js`

```js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  }
}
```

---

## 15. Authentication in Next.js

### Common Solutions

| Solution | Description |
|---|---|
| **NextAuth.js (Auth.js)** | Most popular — OAuth, email, session management |
| **Clerk** | Managed auth with React components |
| **Supabase Auth** | Auth with Supabase backend |
| **Custom JWT** | Manual token management |

### Middleware-Based Auth

```tsx
// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('session')
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}
```

### Server Component Auth

```tsx
import { auth } from '@/lib/auth'

export default async function Dashboard() {
  const session = await auth()
  if (!session) redirect('/login')
  return <div>Welcome, {session.user.name}</div>
}
```

### Best Practices

- Verify auth in middleware (coarse check) AND Server Components (fine-grained)
- Never trust client-side auth alone
- Use `server-only` to protect auth modules
- Store sessions in HTTP-only cookies

---

## 16. Database Integration

### Common ORMs

| ORM | Description |
|---|---|
| **Prisma** | Type-safe, schema-first, most popular |
| **Drizzle** | Lightweight, SQL-like API, fast |
| **TypeORM** | Decorator-based, traditional |
| **Kysely** | SQL query builder, type-safe |

### Usage in Server Components

```tsx
import { db } from '@/lib/db'
import { posts } from '@/lib/schema'

export default async function PostsPage() {
  const allPosts = await db.select().from(posts)
  return <PostList posts={allPosts} />
}
```

### Connection Pooling

```tsx
// lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

### Server Actions for Mutations

```tsx
'use server'
import { db } from '@/lib/db'
import { posts } from '@/lib/schema'

export async function createPost(formData: FormData) {
  await db.insert(posts).values({
    title: formData.get('title') as string,
  })
  revalidatePath('/posts')
}
```

---

## 17. Deployment

### Vercel (Recommended)

- Zero-config deployment
- Automatic CI/CD from Git
- Edge Runtime support
- Image optimization built-in
- ISR and streaming support
- Serverless functions for API routes

```bash
npx vercel deploy
```

### Self-Hosted

**Node.js Server:**
```bash
npm run build
npm start  # Starts on port 3000
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Static Export:**
```js
// next.config.js
module.exports = {
  output: 'export'  // No server features
}
```

### Deployment Considerations

| Feature | Vercel | Self-Hosted |
|---|---|---|
| ISR | ✅ Built-in | ✅ With caching |
| Streaming | ✅ Native | ✅ Node.js |
| Image Optimization | ✅ Built-in | ⚠️ Requires setup |
| Edge Runtime | ✅ | ⚠️ Limited |
| Cost | Pay per request | Fixed server cost |

---

## 18. Next.js vs Remix vs Astro

| Feature | Next.js | Remix | Astro |
|---|---|---|---|
| **UI Library** | React | React (v2), Preact fork (v3 beta) | Any (React, Vue, Svelte, etc.) |
| **Default Rendering** | SSR + Static | SSR | Static (0KB JS) |
| **Data Loading** | Server Components + fetch | `loader` functions | Content Collections |
| **Mutations** | Server Actions | `action` functions | N/A (static focus) |
| **Routing** | File-system (app/) | File-system (routes/) | File-system (pages/) |
| **Nested Layouts** | ✅ Native | ✅ Via `<Outlet>` | ✅ Native |
| **Streaming** | ✅ Full support | ✅ Partial | ✅ Server Islands |
| **Progressive Enhancement** | ✅ Partial | ✅ Core philosophy | ✅ Core philosophy |
| **Multi-Framework** | ❌ React only | ❌ React only | ✅ Any framework |
| **JS by Default** | Server Components opt-out | Ships JS | Zero JS by default |
| **Best For** | Full-stack apps | Form-heavy apps | Content sites |
| **Learning Curve** | Medium-High | Medium | Low |
| **Ecosystem** | Largest | Growing | Large for content |

---

# PART 2 — Nuxt.js

---

## 19. Nuxt 3 Basics: Pages, Layouts, Components

Nuxt 3 is a Vue 3 meta-framework with convention-over-configuration.

### Directory Structure

```
├── pages/          # File-based routing
├── layouts/        # Page layouts
├── components/     # Auto-imported components
├── composables/    # Auto-imported composables
├── server/         # Server routes & middleware
├── stores/         # Pinia stores (auto-imported)
├── plugins/        # Nuxt plugins
├── middleware/      # Route middleware
├── assets/         # Static assets
├── public/         # Public static files
├── app.vue         # Root component
└── nuxt.config.ts  # Single configuration file
```

### Pages: File-Based Routing

```
pages/
├── index.vue         → /
├── about.vue         → /about
├── blog/
│   ├── index.vue     → /blog
│   └── [slug].vue    → /blog/:slug
└── dashboard/
    ├── settings.vue  → /dashboard/settings
    └── profile.vue   → /dashboard/profile
```

No router configuration file needed — the filesystem IS the router config.

### Layouts

```vue
<!-- layouts/default.vue -->
<template>
  <div>
    <header>Nav</header>
    <main><slot /></main>
    <footer>Footer</footer>
  </div>
</template>
```

```vue
<!-- pages/admin.vue -->
<script setup>
definePageMeta({ layout: 'admin' })
</script>
<template>
  <div>Admin page</div>
</template>
```

- Layouts wrap pages, not nested inside routing tree
- Page declares which layout it wants via `definePageMeta`
- Layouts swap on navigation, never re-mount
- Default layout: `layouts/default.vue`

### Components

Drop any `.vue` file into `components/` and use it in templates without importing:

```
components/
├── TheHeader.vue    → <TheHeader />
├── UserCard.vue     → <UserCard />
└── base/
    └── Button.vue   → <BaseButton />
```

Naming derived from file path, converted to PascalCase.

---

## 20. Auto-Imports and Convention Over Configuration

Nuxt scans known directories and auto-imports symbols at build time.

### Auto-Imported by Default

**Vue reactivity:**
- `ref`, `reactive`, `computed`, `watch`, `watchEffect`, `toRef`, `toRefs`

**Vue lifecycle hooks:**
- `onMounted`, `onBeforeMount`, `onUnmounted`, `onUpdated`

**Nuxt composables:**
- `useRoute`, `useRouter`, `useFetch`, `useAsyncData`, `useState`, `useHead`, `useSeoMeta`, `navigateTo`, `useRuntimeConfig`

**Your code:**
- Anything in `composables/` (exported as function starting with `use`)
- Anything in `utils/` (any exported function)
- Components in `components/` (auto-registered in templates)
- Pinia stores in `stores/` (if `@pinia/nuxt` installed)

### The `unimport` Library

Auto-imports powered by the `unimport` library under the hood. Build-time transform finds references and inserts import statements before bundling.

### Limitations

- Does NOT work in `server/` directory (separate auto-import scope)
- Does NOT work outside conventional directories
- Does NOT work in `<script>` blocks without `setup`

### Extending Auto-Imports

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    dirs: ['composables/**', 'lib/auto/**']
  }
})
```

### `nuxt.config.ts`

The single configuration file:
- `modules` — plug in integrations (Pinia, i18n, auth, etc.)
- `runtimeConfig` — environment variables (server-only + public)
- `app` — head, page transitions, layout transitions
- `routeRules` — per-route rendering config

---

## 21. Server Routes and Middleware

Nuxt 3 includes a built-in server engine powered by Nitro.

### Server API Routes

```
server/
├── api/
│   ├── users.get.ts     → GET /api/users
│   ├── users.post.ts    → POST /api/users
│   └── users/
│       └── [id].get.ts  → GET /api/users/:id
├── routes/
│   └── health.ts        → GET /health
├── middleware/
│   └── auth.ts          → Runs on every request
└── utils/
    └── db.ts            → Server-only utilities
```

### Route Handler

```ts
// server/api/users.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const users = await db.getUsers(query)
  return users
})
```

### Server Middleware

```ts
// server/middleware/auth.ts
export default defineEventHandler((event) => {
  const token = getCookie(event, 'auth')
  if (!token && event.path.startsWith('/api/')) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
})
```

### Auto-Imports in Server

Server has its own auto-import scope:
- `defineEventHandler`, `getQuery`, `readBody`, `getCookie`, `setCookie`
- `createError`, `sendRedirect`
- Utilities from `server/utils/`

---

## 22. `useAsyncData` and `useFetch`

### `useFetch`

Simplified data fetching composable:

```vue
<script setup>
const { data: posts, pending, error, refresh } = await useFetch('/api/posts')
</script>
```

- Automatically deduplicates requests
- Handles SSR hydration (fetches on server, hydrates on client)
- Returns `data`, `pending`, `error`, `refresh`

### `useAsyncData`

More flexible — wraps any async function:

```vue
<script setup>
const { data: user } = await useAsyncData('user', async () => {
  const res = await fetch('https://api.example.com/user')
  return res.json()
})
</script>
```

- First arg is cache key (for deduplication)
- Works with any data source (ORM, API, filesystem)

### Key Features

- **SSR-safe**: Fetches on server, avoids hydration mismatch
- **Deduplication**: Same key = single request
- **Cached**: Data cached across components during render
- **Lazy loading**: Use `lazy: true` option for non-blocking fetch
- **Watch**: Re-fetch when dependencies change: `watch: [slug]`

---

## 23. Pinia State Management

```ts
// stores/counter.ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() { count.value++ }
  return { count, doubleCount, increment }
})
```

```vue
<script setup>
const counter = useCounterStore()
// Auto-imported — no import needed
</script>

<template>
  <button @click="counter.increment()">{{ counter.count }}</button>
</template>
```

### Features

- **Auto-imported** from `stores/` directory
- **SSR-compatible** with Nuxt integration
- **DevTools support** for debugging
- **Hot module replacement** during development
- **TypeScript support** out of the box

---

## 24. Nuxt 3 Deployment

### Vercel

```bash
npx vercel deploy
```

Auto-detected. Supports ISR via `routeRules`.

### Nitro Presets

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    preset: 'node-server'  // | 'vercel' | 'netlify' | 'cloudflare' | 'static' | 'deno' | 'aws-lambda'
  }
})
```

### Static Generation

```bash
npx nuxi generate
```

Outputs pure HTML/CSS/JS. No server required.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

### Options

| Method | Description |
|---|---|
| `npx nuxi dev` | Development server |
| `npx nuxi build` | Production build |
| `npx nuxi generate` | Static site generation |
| `npx nuxi preview` | Preview production build |
| Docker | Container with Node.js server |
| Vercel/Netlify | Zero-config deployment |

---

# PART 3 — SvelteKit

---

## 25. SvelteKit Basics: Routes, Layouts, Pages

SvelteKit is the full-stack framework built on the Svelte compiler with file-based routing.

### Directory Structure

```
src/
├── routes/
│   ├── +layout.svelte     # Root layout
│   ├── +page.svelte       # Home page (/)
│   ├── about/
│   │   └── +page.svelte   # /about
│   ├── blog/
│   │   ├── +page.svelte   # /blog
│   │   ├── [slug]/
│   │   │   ├── +page.svelte      # /blog/:slug
│   │   │   └── +page.server.js   # Server load for this page
│   │   └── +layout.svelte        # Blog-specific layout
│   └── settings/
│       ├── +layout.svelte        # Settings layout
│       ├── profile/
│       │   └── +page.svelte      # /settings/profile
│       └── notifications/
│           └── +page.svelte      # /settings/notifications
├── lib/
│   └── server/             # Server-only code (not in client bundle)
└── app.html                # HTML shell
```

### Pages

```svelte
<!-- src/routes/+page.svelte -->
<script>
  export let data  // From load function
</script>

<h1>{data.title}</h1>
```

### Route Files

Each route directory can contain:

| File | Purpose |
|---|---|
| `+page.svelte` | Page component |
| `+page.js` / `+page.server.js` | Page data loading |
| `+layout.svelte` | Layout wrapping child routes |
| `+layout.js` / `+layout.server.js` | Layout data loading |
| `+server.js` | API endpoint |
| `+error.svelte` | Error boundary |

### Layouts

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<slot />  <!-- Child routes render here -->
```

Layouts nest: root layout wraps all pages, nested layouts wrap their children.

### Dynamic Routes

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data  // data.slug is available
</script>

<h1>{data.title}</h1>
```

---

## 26. Load Functions

SvelteKit splits data loading into two types.

### Universal Load (`+page.js`)

Runs on server for initial request, in browser for client-side navigation:

```js
// src/routes/blog/[slug]/+page.js
export async function load({ params, fetch }) {
  const res = await fetch(`/api/posts/${params.slug}`)
  const post = await res.json()
  return { post }
}
```

### Server Load (`+page.server.js`)

Runs ONLY on server. Has access to cookies, database, secrets:

```js
// src/routes/dashboard/+page.server.js
import { db } from '$lib/server/database'

export async function load({ locals }) {
  if (!locals.user) throw redirect(302, '/login')
  const posts = await db.getPosts(locals.user.id)
  return { posts }
}
```

### Layout Load Functions

- `+layout.js` / `+layout.server.js` — data available to all child routes
- Data cascades: parent layout data available to children
- Load functions intelligently rerun only when needed

### Key Behaviors

- Universal loads are serialized (must return serializable data)
- Server loads have full access to server APIs
- Load functions run on every relevant navigation (not just initial)
- Data from parent layouts automatically passed to children
- `depends()` can declare dependencies for manual invalidation

---

## 27. Form Actions

Form actions handle data mutations via standard HTML `<form>` elements.

### Defining Actions

```js
// src/routes/posts/new/+page.server.js
import { fail, redirect } from '@sveltejs/kit'

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData()
    const title = formData.get('title')
    const content = formData.get('content')

    if (!title) {
      return fail(400, { title, content, error: 'Title required' })
    }

    const post = await db.createPost({ title, content, authorId: locals.user.id })
    throw redirect(303, `/posts/${post.id}`)
  }
}
```

### Named Actions

```js
export const actions = {
  create: async ({ request }) => { /* ... */ },
  update: async ({ request }) => { /* ... */ },
  delete: async ({ request }) => { /* ... */ }
}
```

### Using in Forms

```svelte
<!-- src/routes/posts/new/+page.svelte -->
<script>
  export let form  // Action return data
</script>

<form method="POST" action="?/create">
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  <input name="title" value={form?.title ?? ''} />
  <textarea name="content">{form?.content ?? ''}</textarea>
  <button type="submit">Create</button>
</form>
```

### Progressive Enhancement with `use:enhance`

```svelte
<script>
  import { enhance } from '$app/forms'
</script>

<form method="POST" use:enhance>
  <!-- Enhances with JS: pending states, optimistic updates, no full reload -->
</form>
```

Without `use:enhance`, forms submit as regular HTML forms (no JS required). With it, the experience is enhanced with client-side behavior.

---

## 28. Svelte Components vs SvelteKit

### Svelte (the compiler)

- Component framework compiles to vanilla JavaScript
- Scoped CSS, reactivity, transitions at compile time
- No routing, no data loading, no SSR built-in
- Zero runtime overhead — compiled away

### SvelteKit (the framework)

- Full-stack framework built ON TOP of Svelte
- Adds: routing, SSR, data loading, form actions, API endpoints, adapters
- Vite-powered development (HMR, fast builds)
- Production optimization: code splitting, prerendering, streaming

### When to Use What

| Scenario | Use |
|---|---|
| Widget, embedded component | Svelte only |
| Full application | SvelteKit |
| Static site | SvelteKit + `adapter-static` |
| SPA | SvelteKit with `ssr = false` |

---

## 29. Adapter System

SvelteKit uses adapters to build for different deployment targets.

### Official Adapters

| Adapter | Target |
|---|---|
| `adapter-auto` | Auto-detects environment (default) |
| `adapter-node` | Node.js server / Docker |
| `adapter-vercel` | Vercel (serverless + edge) |
| `adapter-netlify` | Netlify (serverless + edge) |
| `adapter-cloudflare` | Cloudflare Workers/Pages |
| `adapter-static` | Static HTML generation |
| `adapter-cloudrun` | Google Cloud Run |

### Configuration

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-node'

export default {
  kit: {
    adapter: adapter({ out: 'build' })
  }
}
```

### Rendering Modes

Per-route exports in `+page.js` or `+layout.js`:

```js
export const ssr = true      // Server-side render (default)
export const csr = true      // Client-side render
export const prerender = true // Static generation
```

### Build Output

Different adapters produce different outputs:
- `adapter-node` → `build/` with Node.js server
- `adapter-static` → `build/` with HTML files
- `adapter-vercel` → `.vercel/output/` with serverless functions
- `adapter-cloudflare` → `_worker.js/` with Workers format

---

# PART 4 — Astro

---

## 30. Astro Basics: Islands Architecture

Astro pioneered the Islands Architecture — most of the page is static HTML, with small "islands" of JavaScript for interactivity.

### Zero JavaScript by Default

```astro
---
// src/pages/index.astro
const title = "Hello World"
---

<html>
  <body>
    <h1>{title}</h1>
    <p>This is static HTML with zero JS</p>
  </body>
</html>
```

### Client Islands (Interactive Components)

```astro
---
import ReactCounter from '../components/Counter'
import VueTodo from '../components/TodoList'
---

<h1>Static content here</h1>

<!-- This React component hydrates on the client -->
<ReactCounter client:load />

<!-- This Vue component loads when browser is idle -->
<VueTodo client:idle />
```

### Client Directives

| Directive | Behavior |
|---|---|
| `client:load` | Hydrate immediately on page load |
| `client:idle` | Hydrate when browser is idle |
| `client:visible` | Hydrate when scrolled into view |
| `client:media={QUERY}` | Hydrate when media query matches |
| `client:only={FRAMEWORK}` | Client-only rendering (no SSR) |

### Server Islands

```astro
---
import UserAvatar from '../components/UserAvatar.astro'
---

<!-- This renders its dynamic content on the server, separately -->
<UserAvatar server:defer />
```

Server islands render dynamic content separately — the main page can be aggressively cached while personalized parts load on-demand.

### Benefits

- **Performance**: 0KB JS by default, JS only where needed
- **Parallel loading**: Islands load and hydrate independently
- **Multi-framework**: Mix React, Vue, Svelte in one project
- **Progressive loading**: Control when each component loads

---

## 31. Content Collections

Content Collections manage sets of content (Markdown, MDX, JSON, YAML) with type safety.

### Defining Collections

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    draft: z.boolean().default(false),
  })
})

export const collections = { blog }
```

### Querying Collections

```astro
---
import { getCollection } from 'astro:content'

const posts = await getCollection('blog')
const published = posts.filter(p => !p.data.draft)
---

{published.map(post => (
  <article>
    <h2>{post.data.title}</h2>
    <time>{post.data.date}</time>
  </article>
))}
```

### Rendering Content

```astro
---
import { render } from 'astro:content'
const { Content } = await render(post)
---

<article>
  <Content />
</article>
```

### Loaders

- **`glob()`** — reads Markdown/MDX/JSON/YAML files from a directory
- **`file()`** — creates entries from a single file
- **Custom loaders** — fetch from CMS, API, database

### Content Layer API (Astro 5+)

- Caches data locally between builds
- Scales to tens of thousands of entries
- Incremental updates via data store
- Type-safe with auto-generated TypeScript

---

## 32. Component Integrations (React, Vue, Svelte)

### Installing Integrations

```bash
npx astro add react    # or vue, svelte, preact, solid
```

### Using Multiple Frameworks

```astro
---
import ReactCard from '../components/Card'
import VueWidget from '../components/Widget'
import SvelteCounter from '../components/Counter'
---

<ReactCard client:visible />
<VueWidget client:load />
<SvelteCounter client:idle />
```

### Mixing Frameworks on One Page

Astro components can contain components from any framework. Each runs in isolation but can share state.

### Passing Children

```astro
---
import ReactModal from '../components/Modal'
---

<!-- Astro passes children to framework components -->
<ReactModal client:load>
  <p>This is Astro content inside a React component</p>
</ReactModal>
```

### Constraints

- Framework components cannot import `.astro` files
- Each framework's runtime is bundled separately (shared if same framework)
- Astro components have no client-side runtime (HTML-only)

---

## 33. Static Site Generation

Astro generates static HTML by default.

### Build Output

```bash
npx astro build
# Output: dist/ with HTML, CSS, JS files
```

### Dynamic Routes

```astro
// src/pages/blog/[...slug].astro
---
import { getCollection } from 'astro:content'

export async function getStaticPaths() {
  const posts = await getCollection('blog')
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post }
  }))
}

const { post } = Astro.props
const { Content } = await render(post)
---

<article>
  <h1>{post.data.title}</h1>
  <Content />
</article>
```

### Output Modes

```ts
// astro.config.mjs
export default defineConfig({
  output: 'static'       // Default: SSG
  // output: 'server'    // SSR with adapter
  // output: 'hybrid'    // Mix of static and server
})
```

---

## 34. Server-Side Rendering

### Enabling SSR

```ts
// astro.config.mjs
import node from '@astrojs/node'

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' })
})
```

### Server Endpoints

```ts
// src/pages/api/users.ts
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request }) => {
  return new Response(JSON.stringify({ users: [] }), {
    headers: { 'Content-Type': 'application/json' }
  })
}
```

### When to Use SSR

- Personalized content (user dashboards)
- Real-time data (live feeds)
- API endpoints
- Forms processing
- Authentication-gated pages

### Hybrid Mode

```ts
// astro.config.mjs
export default defineConfig({
  output: 'hybrid'
})
```

```astro
// This page is server-rendered
// src/pages/dashboard.astro
---
export const prerender = false
const user = await getUser(Astro.request)
---
```

---

# PART 5 — Remix

---

## 35. Remix Basics: Loaders, Actions, Forms

Remix is a full-stack React framework built on web standards.

### Loaders (Data Fetching)

```tsx
// app/routes/posts.tsx
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
  const post = await db.getPost(params.id)
  if (!post) throw new Response('Not Found', { status: 404 })
  return json({ post })
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()
  return <h1>{post.title}</h1>
}
```

### Actions (Mutations)

```tsx
// app/routes/posts.new.tsx
import type { ActionFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const title = formData.get('title')

  if (!title) {
    return json({ error: 'Title is required' }, { status: 400 })
  }

  const post = await db.createPost({ title })
  return redirect(`/posts/${post.id}`)
}

export default function NewPost() {
  const actionData = useActionData<typeof action>()

  return (
    <Form method="post">
      <input name="title" />
      {actionData?.error && <p>{actionData.error}</p>}
      <button type="submit">Create</button>
    </Form>
  )
}
```

### Forms

- Use native HTML `<Form>` from `@remix-run/react` (not `<form>`)
- Works without JavaScript (progressive enhancement)
- Remix handles serialization, error display, pending states
- `useFetcher()` for non-navigation mutations (like/dislike buttons)

---

## 36. Nested Routes

Remix uses nested routing with file-system conventions.

### File Structure

```
app/routes/
├── blog.tsx              # /blog layout (parent)
├── blog._index.tsx       # /blog (index)
├── blog.$slug.tsx        # /blog/:slug
├── dashboard.tsx         # /dashboard layout
├── dashboard.settings.tsx # /dashboard/settings
└── dashboard.profile.tsx  # /dashboard/profile
```

### Parent Layout with `<Outlet>`

```tsx
// app/routes/blog.tsx
import { Outlet } from '@remix-run/react'

export default function BlogLayout() {
  return (
    <div>
      <nav>Sidebar</nav>
      <Outlet />  {/* Child routes render here */}
    </div>
  )
}
```

### Benefits

- Parent data loads once, doesn't re-fetch on child navigation
- Only the changing child route re-fetches data
- Shared UI stays stable (no layout flicker)
- Automatic code splitting per route

---

## 37. Progressive Enhancement

Remix apps work without JavaScript by default.

### How It Works

1. HTML forms submit via standard `POST`
2. Server processes the action
3. Server re-renders the page with new data
4. Browser receives fresh HTML
5. JavaScript enhances the experience after loading

### Native Behavior

```tsx
// This works without JavaScript
<Form method="post">
  <input name="title" />
  <button type="submit">Create</button>
</Form>
```

### Enhancement with JavaScript

```tsx
import { Form, useNavigation } from '@remix-run/react'

export default function Form() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Form method="post">
      <input name="title" />
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create'}
      </button>
    </Form>
  )
}
```

### Key Principles

- App works even if JS fails to load
- Enhances progressively when JS loads
- Uses native `fetch()`, `Response`, `FormData` APIs
- Respects `Cache-Control`, `ETag` headers
- No proprietary APIs — web standards throughout

---

## 38. Data Mutations

### Optimistic UI

```tsx
import { useFetcher } from '@remix-run/react'

function LikeButton({ postId, likes }) {
  const fetcher = useFetcher()

  // Optimistic update
  const displayLikes = fetcher.formData
    ? likes + 1  // Show +1 immediately
    : likes

  return (
    <fetcher.Form method="post" action={`/posts/${postId}/like`}>
      <button disabled={fetcher.state !== 'idle'}>
        {displayLikes} likes {fetcher.state !== 'idle' && '...'}
      </button>
    </fetcher.Form>
  )
}
```

### Revalidation After Mutations

- After any action, Remix automatically revalidates ALL route data
- This ensures UI stays in sync with server state
- Use `shouldRevalidate` to optimize (skip unnecessary re-fetches)

### Error Handling

```tsx
// Throw responses in loaders/actions
throw new Response('Not Found', { status: 404 })

// Or throw Error objects
throw new Error('Something went wrong')
```

Remix shows the nearest `ErrorBoundary` or `CatchBoundary`.

### Resource Routes (API Endpoints)

```tsx
// app/routes/api.posts.ts
import type { ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

export async function loader() {
  const posts = await db.getPosts()
  return json(posts)
}

export async function action({ request }: ActionFunctionArgs) {
  // Handle POST, PUT, DELETE
}
```

---

# PART 6 — SSR/SSG Concepts

---

## 39. Server-Side Rendering Mechanics

### How SSR Works

1. **Request arrives** at server
2. **Server executes** component tree (data fetching, rendering)
3. **Server generates HTML** string from component tree
4. **HTML sent to client** (fast First Contentful Paint)
5. **Client receives HTML** — user sees content immediately
6. **Client downloads JavaScript** bundles
7. **Hydration** — React attaches event listeners, makes interactive
8. **Client-side navigation** takes over (SPA behavior)

### Benefits

- **SEO**: Search engines get fully rendered HTML
- **Performance**: First paint is fast (no blank screen)
- **Social Sharing**: Meta tags rendered in HTML
- **Performance on slow devices**: Rendering on server, not client

### Trade-offs

- Server load per request
- Time-to-first-byte higher than static
- Requires Node.js server (or serverless)
- More complex than client-side rendering

### When to Use

- Content that changes per request
- User-specific pages (dashboards, profiles)
- SEO-critical pages
- Pages requiring request-time data (cookies, headers)

---

## 40. Static Site Generation

### How SSG Works

1. **At build time**, framework executes all routes
2. **Generates HTML** for each route from component tree
3. **Outputs static files** (HTML, CSS, JS, assets)
4. **Deployed to CDN** — served from edge locations
5. **No server required** — pure static file serving

### Benefits

- **Performance**: Served from CDN, near-instant load
- **Scalability**: Static files scale infinitely
- **Security**: No server to attack
- **Cost**: Cheap hosting (Vercel, Netlify, S3)
- **Reliability**: No server crashes

### Trade-offs

- **Build time** increases with number of pages
- **Content stale** until rebuild
- **No personalization** without client-side fetching
- **Dynamic content** requires workarounds

### When to Use

- Marketing sites, blogs, documentation
- Content that changes infrequently
- Pages with identical content for all users
- SEO-critical content

---

## 41. Hydration Process

### What is Hydration

Hydration is React's process of attaching event handlers to server-rendered HTML to make it interactive.

### Step by Step

1. Server sends pre-rendered HTML
2. Browser displays HTML (content visible, not interactive)
3. Browser downloads JavaScript bundles
4. React "hydrates" — walks the HTML, attaches event listeners
5. Component becomes interactive

### Hydration Mismatches

When server HTML doesn't match client-rendered HTML:

```tsx
// ❌ This causes hydration mismatch
<div>{new Date().toLocaleString()}</div>

// ✅ Fix with useEffect
<div>{dateString}</div>
```

### Selective Hydration

With Suspense boundaries, React hydrates components independently:

```tsx
<Suspense fallback={<Loading />}>
  <SlowComponent />  <!-- Hydrates when ready -->
</Suspense>
<Suspense fallback={<Loading />}>
  <AnotherSlowComponent />  <!-- Hydrates independently -->
</Suspense>
```

Benefits: Smaller hydration tasks, better responsiveness, user can interact with hydrated parts sooner.

---

## 42. Partial Hydration / Islands Architecture

### Concept

Only hydrate the parts of the page that need interactivity. The rest remains static HTML.

### Traditional SPA

```
Full page → Full JavaScript bundle → Full hydration
[100% of page hydrated]
```

### Islands Architecture

```
Static HTML ──────────────────────────────────
Island 1 (counter)    → Hydrated [JS: 5KB]
Island 2 (carousel)   → Hydrated [JS: 15KB]  (lazy)
Island 3 (search)     → Hydrated [JS: 10KB]  (on visible)
```

### Implementation

| Framework | Approach |
|---|---|
| **Astro** | `client:*` directives on components |
| **Next.js** | Server Components (zero JS) + Client Components |
| **Qwik** | Resumability (no hydration at all) |
| **Partial hydrated React** | `@shopify/hydrogen` |

### Benefits

- **Smaller bundles**: Only interactive code shipped
- **Faster load**: Less JavaScript to parse/execute
- **Better Core Web Vitals**: Improved LCP, FID, CLS
- **Parallel hydration**: Islands hydrate independently

---

## 43. Streaming SSR

### What is Streaming SSR

Instead of waiting for the entire page to render, the server sends HTML progressively as it becomes ready.

### Traditional SSR

```
Server: [wait for all data] → [render full HTML] → [send to client]
Client: [blank screen for entire duration] → [show complete page]
```

### Streaming SSR

```
Server: [send layout + fallbacks] → [send section 1] → [send section 2]
Client: [show layout immediately] → [section 1 appears] → [section 2 appears]
```

### How It Works

1. Server renders static shell (layouts, nav, Suspense fallbacks)
2. Sends immediately via chunked transfer encoding
3. As async components resolve, server streams HTML chunks
4. Browser progressively renders as chunks arrive
5. Each `<Suspense>` boundary is an independent stream point

### Impact on Web Vitals

- **TTFB**: Low — static shell sent immediately
- **FCP**: Fast — layout paints before data loads
- **LCP**: Can be fast if LCP element is outside Suspense
- **CLS**: Requires careful skeleton sizing
- **INP**: Better — selective hydration from streaming

### Framework Support

| Framework | Support |
|---|---|
| Next.js | Full — via `loading.tsx` and `<Suspense>` |
| SvelteKit | Full — via `+page.svelte` streaming |
| Remix | Partial — through React 18 |
| Nuxt 3 | Via `useAsyncData` with `lazy: true` |
| Astro | Via server islands |

---

## 44. React Server Components

### What Are RSC

React Server Components are components that render exclusively on the server. They never ship JavaScript to the client.

### Key Differences from Client Components

| Feature | Server Components | Client Components |
|---|---|---|
| `useState` | ❌ | ✅ |
| `useEffect` | ❌ | ✅ |
| Event handlers | ❌ | ✅ |
| `async/await` | ✅ | ❌ |
| Direct DB access | ✅ | ❌ |
| Browser APIs | ❌ | ✅ |
| JavaScript bundle | 0KB | Included |

### RSC Payload

Binary format containing:
- Rendered Server Component output
- Client Component placeholders + JS references
- Props passed from Server to Client Components

### Server Component as Default

In Next.js App Router, all components in `app/` are Server Components by default. Add `'use client'` only to interactive components.

### Benefits

- Zero JavaScript for server-rendered UI
- Direct database/file access on server
- Secrets never exposed to client
- Smaller client bundles
- Better performance metrics

### Composing RSC and Client Components

```tsx
// Server Component (default)
import ClientButton from './button'  // 'use client'

export default async function Page() {
  const data = await fetchData()  // Server-only
  return <ClientButton data={data} />  // Pass serializable data
}
```

---

## 45. Edge Rendering

### What is Edge Rendering

Running server-side code at CDN edge locations (close to users) instead of a central server.

### Traditional Server

```
User (Tokyo) → [network hop] → Server (US-East) → [response]
Latency: ~200ms
```

### Edge Rendering

```
User (Tokyo) → [edge node Tokyo] → [response]
Latency: ~20ms
```

### Framework Support

| Framework | Edge Support |
|---|---|
| **Next.js** | Middleware + Edge Runtime config |
| **Cloudflare Pages** | Workers-based (all edge) |
| **Vercel Edge Functions** | Edge config, middleware |
| **Deno Deploy** | All edge by default |

### Edge Constraints

- No Node.js APIs (no `fs`, no `crypto`)
- Limited runtime (Web APIs only)
- Small bundle size limits
- No long-running processes
- V8 isolate model (not full Node.js)

### When to Use Edge

- Authentication checks (JWT verification)
- A/B testing and feature flags
- Geolocation-based redirects
- Rate limiting
- API proxies

### Limitations

- Cannot access databases directly (need HTTP APIs)
- Cannot use npm packages that require Node.js APIs
- Cold starts can be higher than serverless in some cases

---

## 46. Comparison Table of All Meta-Frameworks

| Feature | Next.js | Nuxt 3 | SvelteKit | Astro | Remix |
|---|---|---|---|---|---|
| **UI Library** | React | Vue 3 | Svelte | Any | React |
| **Default Rendering** | SSR + Static | SSR | SSR + Static | Static (0KB JS) | SSR |
| **Routing** | File-system (`app/`) | File-system (`pages/`) | File-system (`routes/`) | File-system (`pages/`) | File-system (`routes/`) |
| **Data Loading** | Server Components + fetch | `useFetch` / `useAsyncData` | `load` functions | Content Collections | `loader` functions |
| **Mutations** | Server Actions | Server routes | Form actions | N/A (static focus) | `action` functions |
| **Nested Layouts** | ✅ Native | ✅ `definePageMeta` | ✅ `+layout.svelte` | ✅ Native | ✅ `<Outlet>` |
| **Streaming** | ✅ Full support | Via lazy loading | ✅ Full support | ✅ Server Islands | ✅ Partial |
| **Progressive Enhancement** | ✅ Partial | ✅ Yes | ✅ Core philosophy | ✅ Core philosophy | ✅ Core philosophy |
| **Multi-Framework** | ❌ React only | ❌ Vue only | ❌ Svelte only | ✅ Any framework | ❌ React only |
| **JS by Default** | Server opt-out | Client opt-out | Client opt-out | Zero JS by default | Ships JS |
| **TypeScript** | ✅ Built-in | ✅ Built-in | ✅ Built-in | ✅ Built-in | ✅ Built-in |
| **Image Optimization** | ✅ `next/image` | ✅ `nuxt/image` | Via adapter | ✅ Built-in | Via package |
| **ISR** | ✅ Built-in | ✅ Via route rules | ✅ Via adapter | ❌ Static only | ❌ Not built-in |
| **Auth** | NextAuth/Auth.js | @sidebase/nauth | Lucia Auth | N/A | N/A |
| **Database** | Prisma, Drizzle | Prisma, Drizzle | Any (server-only) | N/A | Any |
| **Deployment** | Vercel (optimal) | Vercel, Docker | Vercel, Docker | Any static host | Vercel, Docker |
| **Learning Curve** | Medium-High | Medium | Medium | Low | Medium |
| **Ecosystem Size** | Largest | Large (Vue) | Growing | Large (content) | Growing |
| **Best For** | Full-stack apps | Vue full-stack | Performance apps | Content/marketing | Form-heavy apps |
| **Build Speed** | Medium | Medium | Fast (Vite) | Very Fast | Medium |
| **Bundle Size** | Medium | Medium | Small | Minimal | Medium |
| **SSG Support** | ✅ | ✅ | ✅ | ✅ (primary) | ❌ |
| **SPA Support** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **API Routes** | Route Handlers | Server routes | `+server.js` | Endpoints | Resource routes |

### Decision Guide

| Need | Recommendation |
|---|---|
| React ecosystem, full-stack app | **Next.js** |
| Vue ecosystem, full-stack app | **Nuxt 3** |
| Maximum performance, small bundles | **SvelteKit** |
| Content-heavy site, zero JS | **Astro** |
| Form-heavy app, progressive enhancement | **Remix** |
| Multi-framework team | **Astro** |
| Static marketing site | **Astro** or **Next.js** (static export) |
| Real-time dashboard | **Next.js** or **Remix** |
| Blog with CMS | **Astro** (content collections) |
| E-commerce | **Next.js** or **Remix** |

---

*Research compiled from official documentation and multiple sources. Covers Next.js 16, Nuxt 3, SvelteKit 2, Astro 5, and Remix 2.*
