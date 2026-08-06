# Complete List of JavaScript Frameworks & Libraries

> A comprehensive reference of JavaScript frameworks, libraries, and tools.
> Popular = widely adopted / maintained / high community activity.
> Not popular = niche, smaller adoption, experimental, or legacy.

---

## 1. Frontend UI Frameworks

### Popular
| Framework | Type | Notes |
|---|---|---|
| **React** | Library | Virtual DOM, component-based, maintained by Meta. World's #1 |
| **Vue.js** | Framework | Progressive, gentle learning curve, by Evan You |
| **Angular** | Framework | Full-featured, TypeScript-first, maintained by Google |
| **Svelte** | Compiler | Compiles away the framework, no virtual DOM |
| **Preact** | Library | Tiny 3kb React alternative, same API |
| **SolidJS** | Library | Fine-grained reactivity, best performance |
| **Qwik** | Framework | Resumability, instant loading by builder.io |
| **Lit** | Library | Web Components, by Google |
| **Alpine.js** | Library | Minimal, HTML-first, like Tailwind for JS |
| **Stencil** | Compiler | Web Components compiler by Ionic |

### Not Popular / Niche / Legacy
| Framework | Type | Notes |
|---|---|---|
| **Ember.js** | Framework | Convention-over-configuration, once very popular, now declining |
| **Backbone.js** | Library | Legacy, was popular 2010s, now rarely used |
| **Mithril.js** | Framework | Small, fast, older |
| **Inferno** | Library | React-like, very fast, minimal adoption |
| **Riot.js** | Framework | Web component style, small community |
| **Meteor.js** | Full-stack | Real-time full-stack, once big, declining |
| **Aurelia** | Framework | Modern ES6 framework, small community |
| **CanJS** | Framework | Obsolete, replaced by other tools |
| **Dojo** | Framework | Legacy enterprise framework, largely retired |
| **Marko** | Framework | By eBay, streaming server-side rendering |
| **Glimmer** | Rendering | Glimmer VM from Ember, internal use |
| **Deku** | Library | Virtual DOM, minimal |
| **Choo** | Framework | 4kb framework, tiny community |
| **Svelte Native** | Framework | Svelte for native mobile, niche |
| **SolidJS alternatives** | — | see Solid |

---

## 2. Backend / Server Frameworks

### Popular
| Framework | Type | Notes |
|---|---|---|
| **Express.js** | Framework | Minimal HTTP, the classic Node standard |
| **NestJS** | Framework | Angular-style, TypeScript-first, enterprise |
| **Next.js** | React meta-framework | SSR, static, API routes, by Vercel |
| **Nuxt.js** | Vue meta-framework | SSR/SSG for Vue |
| **SvelteKit** | Svelte meta-framework | SSR/SSG for Svelte |
| **Fastify** | Framework | High performance, schema-based |
| **Koa.js** | Framework | Express successor, by TJ Holowaychuk |
| **Hono** | Framework | Fast, edge-ready, Web-standard friendly |
| **tRPC** | Library | Type-safe APIs between client/server |
| **AdonisJS** | Framework | Full-featured Laravel-style for Node |
| **Hapi.js** | Framework | Enterprise, config-driven |

### Not Popular / Niche / Legacy
| Framework | Type | Notes |
|---|---|---|
| **Sails.js** | Framework | MVC, Rails-like, declining |
| **LoopBack** | Framework | IBM API framework, largely deprecated |
| **Feathers.js** | Framework | Real-time REST/WebSocket, niche |
| **Restify** | Framework | Optimized for REST APIs, legacy-ish |
| **Moleculer** | Microservices | Niche microservices framework |
| **Actionhero** | Framework | Multi-node API framework, niche |
| **Derby.js** | Framework | Real-time, based on Racer, nearly dead |
| **Total.js** | Framework | All-in-one, small community |
| **Frisbee** | — | discontinued |
| **Kraken.js** | Framework | By PayPal, legacy |
| **Rails-ish Express wraps** | — | e.g. Express 3.x era plugins |

---

## 3. Static Site Generators (SSG)

### Popular
| Tool | Notes |
|---|---|
| **Next.js** | React + SSG/SSR |
| **Astro** | Content-first, ships zero JS by default |
| **Nuxt** | Vue + SSG/SSR |
| **SvelteKit** | Svelte SSG/SSR |
| **Gatsby** | React + GraphQL, large plugin ecosystem |
| **Eleventy (11ty)** | Simple, template-agnostic |
| **VitePress** | Vue, docs-oriented |
| **Docusaurus** | React, docs-oriented by Meta |
| **Gridsome** | Vue static, GraphQL |

### Not Popular / Niche / Legacy
| Tool | Notes |
|---|---|
| **Hexo** | Blog-oriented, small community |
| **Hugo** | (Go-based) — not JS, for reference |
| **Phenomic** | Discontinued |
| **Saber** | Vue static, nearly inactive |
| **After.js** | React SSR, inactive |
| **Razzle** | SSR toolkit, less maintained |
| **TiddlyWiki** | Wiki system, niche |
| **Docz** | Docs tool, unmaintained |

---

## 4. Testing Frameworks

### Popular
| Tool | Notes |
|---|---|
| **Jest** | All-in-one, by Meta |
| **Vitest** | Vite-native, fast |
| **Mocha** | Flexible, classic runner |
| **Cypress** | E2E testing |
| **Playwright** | E2E by Microsoft |
| **Testing Library** | Testing utilities for components |
| **Puppeteer** | Headless Chrome automation |
| **Jasmine** | Behavior-driven, classic |

### Not Popular / Niche / Legacy
| Tool | Notes |
|---|---|
| **Karma** | Old test runner, deprecated in favor of Jest/Vitest |
| **Ava** | Minimal runner, niche |
| **Tape** | Minimal TAP-based, niche |
| **Enzyme** | React testing, deprecated |
| **Selenium WebDriver** | E2E, older heavy approach |
| **Nightwatch** | E2E, less maintained |
| **WebdriverIO** | E2E, moderate |
| **QUnit** | jQuery-era unit tests, legacy |
| **Chai** | Assertion lib, used with Mocha |

---

## 5. State Management

### Popular
| Tool | Notes |
|---|---|
| **Redux / Redux Toolkit** | React's standard |
| **Zustand** | Small, fast, hooks-based |
| **Jotai** | Atomic state |
| **Recoil** | By Meta |
| **MobX** | Reactive state |
| **Pinia** | Vue's official store |
| **Vuex** | Vue legacy store |
| **TanStack Query** | Server state / data fetching |
| **SWR** | Next.js data fetching |

### Not Popular / Niche / Legacy
| Tool | Notes |
|---|---|
| **XState** | State machines, niche |
| **Effector** | Reactive state, niche |
| **Dexie** | IndexedDB wrapper (data), niche |
| **Akita** | State, less maintained |
| **Rematch** | Redux wrapper, niche |
| **Easy Peasy** | Redux wrapper, niche |
| **Flux** | Legacy architecture pattern (pre-Redux) |
| **Unstated** | Minimal React state, niche |

---

## 6. Data Visualization / Charts

### Popular
| Tool | Notes |
|---|---|
| **Chart.js** | Simple charts |
| **D3.js** | Data-driven documents, full control |
| **Recharts** | React charts |
| **Victory** | React charts |
| **ECharts** | Powerful, Chinese ecosystem |
| **Highcharts** | Commercial, popular |
| **Three.js** | 3D graphics / WebGL |
| **Framer Motion** | Animations |
| **GSAP** | Animations |

### Not Popular / Niche / Legacy
| Tool | Notes |
|---|---|
| **Vis.js** | Network graphs, less maintained |
| **Plotly.js** | Scientific plotting, moderate |
| **Dc.js** | D3-based dashboards, niche |
| **Nivo** | React charts, moderate |
| **C3.js** | D3 wrapper, unmaintained |
| **Rickshaw** | Legacy, unmaintained |
| **Flot** | Legacy jQuery charts, dead |
| **Chartist** | Legacy, unmaintained |
| **uPlot** | Fast micro-charts, niche |
| **Babylon.js** | 3D engine, less common than Three.js |

---

## 7. Utility / Data Libraries

### Popular
| Tool | Notes |
|---|---|
| **Lodash** | Utility functions |
| **Day.js** | Date manipulation |
| **date-fns** | Date functions |
| **Moment.js** | Legacy dates (still widely used) |
| **Axios** | HTTP client |
| **Zod** | Runtime schema validation |
| **Yup** | Schema validation |
| **Dotenv** | Env variables |
| **Underscore** | Utility, legacy cousin of Lodash |
| **Ramda** | Functional utilities |
| **Immutable.js** | Immutable data structures |

### Not Popular / Niche / Legacy
| Tool | Notes |
|---|---|
| **Bignumber.js** | Big numbers, niche |
| **Decimal.js** | Decimal math, niche |
| **Sift** | Mongo-style query lib, niche |
| **NeDB** | Embedded DB, unmaintained |
| **LowDB** | Small JSON DB, niche |
| **Pino** | Logging (actually popular in backend) |
| **Winston** | Logging (actually popular) |
| **Joi** | Validation, less common now vs Zod |

---

## 8. Mobile / Desktop (Cross-Platform)

### Popular
| Tool | Notes |
|---|---|
| **React Native** | Mobile, by Meta |
| **Electron** | Desktop, by GitHub |
| **Tauri** | Desktop (Rust core + JS frontend) |
| **Expo** | React Native toolchain |
| **Capacitor** | Web → native apps, by Ionic |
| **Ionic** | Hybrid mobile UI framework |

### Not Popular / Niche / Legacy
| Tool | Notes |
|---|---|
| **Cordova** | Legacy hybrid, replaced by Capacitor |
| **NativeScript** | Mobile, small community |
| **Flutter** | (Dart-based) — not JS, for reference |
| **PhoneGap** | Discontinued (Cordova's brand) |
| **ReactXP** | Deprecated by Microsoft |
| **Ionic 1/2 (legacy)** | Legacy versions |
| **NW.js** | Electron alternative, niche |
| **Quasar** | Vue-based cross-platform, moderate |

---

## 9. Rendering / UI Component Libraries

### Popular
| Tool | Notes |
|---|---|
| **Tailwind CSS** | (CSS) utility-first |
| **Material UI (MUI)** | React components |
| **Ant Design** | React components |
| **Chakra UI** | React components |
| **shadcn/ui** | React components (copy-paste style) |
| **Radix UI** | Headless React primitives |
| **Headless UI** | Headless components by Tailwind |
| **Bootstrap** | CSS/JS UI kit |
| **Vuetify** | Vue Material components |
| **Element Plus** | Vue components |
| **NextUI** | React components |

### Not Popular / Niche / Legacy
| Tool | Notes |
|---|---|
| **Semantic UI** | Legacy, unmaintained |
| **Foundation** | Legacy UI kit |
| **Blueprint** | React components, niche |
| **Onsen UI** | Mobile components, niche |
| **React Toolbox** | Legacy |
| **Grommet** | React components, small |
| **Semantic UI React** | Legacy wrapper, unmaintained |
| **MDC (Material Components)** | Legacy |
| **Keystone** | CMS (actually a headless CMS) |

---

## 10. Forms / Routing / Misc Popular Libraries

### Popular
| Tool | Notes |
|---|---|
| **React Router** | Routing |
| **TanStack Router** | Routing (type-safe) |
| **Vue Router** | Routing for Vue |
| **React Hook Form** | Forms |
| **Formik** | Forms |
| **Framer Motion** | Animation |
| **i18next** | Internationalization |
| **Fuse.js** | Fuzzy search |
| **Algolia** | Search |
| **pdf.js** | PDF rendering by Mozilla |
| **Prism / Highlight.js** | Code highlighting |

### Not Popular / Niche / Legacy
| Tool | Notes |
|---|---|
| **React Final Form** | Forms, niche |
| **Formal** | Forms, niche |
| **Redux Form** | Legacy, deprecated |
| **React Navigation (web)** | Niche |
| **History.js** | Legacy routing helper |
| **Page.js** | Legacy routing, niche |
| **Crossroads.js** | Legacy routing, niche |
| **Basil.js** | Cookies/storage, niche |

---

## 11. Notable Utilities (Sortable, Clipboard, Etc.)

| Tool | Popularity | Notes |
|---|---|---|
| **SortableJS** | Popular | Drag & drop |
| **dnd-kit** | Popular | React drag & drop |
| **react-beautiful-dnd** | Moderate→Legacy | Deprecated by Atlassian |
| **Clipboard.js** | Popular | Copy to clipboard |
| **html2canvas** | Moderate | Screenshots in browser |
| **crypto-js** | Popular | Hashing (not for security-critical) |
| **UUID** | Popular | ID generation |
| **nanoid** | Popular | Tiny unique IDs |
| **qs / query-string** | Popular | Query parsing |

---

## 12. JavaScript Runtimes / Engines (for reference)

| Tool | Popularity | Notes |
|---|---|---|
| **Node.js** | Popular | Server runtime (V8) |
| **Deno** | Growing | Secure runtime, by Node creator |
| **Bun** | Growing | Fast runtime + bundler + package manager |
| **V8 / SpiderMonkey / JSC** | Popular | Engines (not user-facing) |
| **QuickJS** | Niche | Embeddable, small engine |

---

## 13. Build Tools / Bundlers / Package Managers

### Popular
| Tool | Notes |
|---|---|
| **Vite** | Next-gen dev server + bundler |
| **Webpack** | The classic bundler |
| **esbuild** | Ultra-fast bundler |
| **Rollup** | Library bundler |
| **Parcel** | Zero-config bundler |
| **Turbopack** | By Vercel, Next.js 14+ |
| **Rspack** | Rust-based webpack alternative |
| **npm** | Package manager |
| **pnpm** | Fast package manager |
| **yarn** | Package manager |
| **Babel** | Compiler / transpiler |
| **SWC** | Rust-based transpiler |
| **TypeScript** | Typed superset (compiles to JS) |
| **tsup / tsc** | TS bundling tools |

### Not Popular / Niche / Legacy
| Tool | Notes |
|---|---|
| **Gulp** | Task runner, legacy |
| **Grunt** | Task runner, legacy |
| **Browserify** | Legacy bundler, dead |
| **SystemJS** | Dynamic module loader, niche |
| **RequireJS** | Legacy AMD loader, dead |
| **StealJS** | Legacy, dead |
| **Lerna** | Monorepo tool, niche (moved to nx) |
| **Nx** | Actually popular, monorepo |
| **Broccoli** | Legacy build tool |

---

## 14. Headless CMS (JavaScript-Based)

### Popular
| Tool | Notes |
|---|---|
| **Strapi** | Self-hosted, Node.js |
| **Directus** | Node.js |
| **Contentful** | SaaS (API-based) |
| **Sanity** | Real-time headless CMS |
| **Keystone.js** | Node.js |

### Not Popular / Niche / Legacy
| Tool | Notes |
|---|---|
| **Ghost** | Blog platform, moderate |
| **Payload CMS** | Node.js, growing |
| **Netlify CMS** | Renamed Decap, moderate |
| **Prismic** | SaaS, moderate |

---

## 15. CLI / Tooling Frameworks

| Tool | Popularity | Notes |
|---|---|---|
| **Commander.js** | Popular | CLI argument parsing |
| **Yargs** | Popular | CLI parsing |
| **Inquirer.js** | Popular | Interactive prompts |
| **Chalk** | Popular | Terminal colors |
| **Ora** | Popular | Spinners |
| **Gluegun** | Niche | CLI framework by Infinite Red |
| **Vorpal** | Legacy | Interactive CLI, unmaintained |

---

## Quick Popularity Summary

**Most Popular (must-know):**
React, Vue, Angular, Svelte, Next.js, Nuxt, Express, Node.js, TypeScript, Vite, Webpack, Jest, Vitest, Cypress, Playwright, Redux, Zustand, TanStack Query, Tailwind, Material UI, Axios, Lodash, Zod, React Native, Electron, D3.js, Chart.js, Three.js, Framer Motion, i18next, React Router.

**Legacy / Declining (learn for history):**
Backbone, Ember (declining), jQuery-era tools, Moment.js, Gulp, Grunt, RequireJS, Browserify, Karma, Enzyme, Redux Form, Cordova/PhoneGap, Sails, LoopBack, Sematic UI.

**Niche / Experimental (explore if interested):**
Qwik, SolidJS, Hono, tRPC, Effector, XState, uPlot, Nivo, Vis.js, Moleculer, NativeScript.

---

*Last updated: July 2026*
