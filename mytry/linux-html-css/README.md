# Linux & Linus Torvalds — HTML & CSS Only

A personal website built with **zero JavaScript** — pure HTML and CSS. This is the
"full stack HTML & CSS" half of a two-part learning project. The JavaScript
version (terminal simulator, REST API, WebSocket, PWA) lives in the sibling
folder `linux-html-css-js/`.

This is a **learning project**. The full source is here as a *reference*, but you
will learn the most by **rewriting it yourself, step by step**. Do not
copy-paste — type every line, think about each tag and property, then check your
result against it.

---

## 1. Project structure

A small multi-page "static" website follows this layout:

```
linux-html-css/
├── index.html                     # Home page (entry point)
├── pages/
│   ├── history.html               # History of Linux (timeline)
│   ├── linus.html                 # About Linus Torvalds
│   ├── about-me.html              # About the site author
│   └── showcase.html              # HTML & CSS feature showcase
├── assets/
│   ├── css/
│   │   ├── style.css              # Shared styles (all pages)
│   │   └── showcase.css           # Styles only for showcase.html
│   └── images/
│       ├── linus.webp             # Original photo
│       ├── linus-200.webp         # Resized variants (responsive images)
│       ├── linus-300.webp
│       ├── linus-454.webp
│       └── icon.svg               # Favicon (static SVG, like a logo)
└── README.md                      # This file
```

**Convention recap**

- `index.html` always lives in the root — servers look for it automatically.
- One folder per concern: `assets/css`, `assets/images`.
- Pages folder keeps subpages tidy; links between them use **relative paths**:
  - from root → `pages/history.html`
  - from `pages/` → `../assets/css/style.css`
- Keep shared styles in `style.css`; page-specific layout for the showcase goes
  in `showcase.css` (loaded *after* `style.css`).
- No repetition of rules across CSS files.

---

## 2. The pages & what each one teaches

| Page            | Practise                                                                    |
| --------------- | --------------------------------------------------------------------------- |
| `index.html`    | Semantic layout, hero section, cards (grid), stats, table, blockquote       |
| `history.html`  | Timeline via pseudo-elements, `progress`/`meter`, `pre/code`, a table       |
| `linus.html`    | Two-column `grid`, figure/figcaption, checked-list with `::before`          |
| `about-me.html` | Simple page: section split, definition/check list, contact card             |
| `showcase.html` | The "max features" page — most HTML elements + advanced CSS                 |

---

## 3. Build order (recommended)

> Start from an empty folder. After each step open the page in a browser to verify.

### Step 1 — root skeleton + shared CSS
1. `mkdir pages assets assets/css assets/images`
2. Create `assets/css/style.css` and define the **design system** in `:root`:
   - color variables (`--color-bg`, `--color-accent`, …), shadow, fonts
3. Write `index.html`: the `head` (charset, viewport, title, stylesheet link),
   a `<header class="navbar">`, a `<main>`, and a `<footer>`.
4. Style: reset (`* { box-sizing: border-box }`), navbar (sticky), container,
   hero, section titles, cards, footer. Add `@media (max-width: 700px)`.

### Step 2 — copy the navbar recipe to subpages
5. Create `pages/history.html` reusing the same navbar/header/footer markup with
   a `.active` class on the current link.
6. Point its stylesheet at `../assets/css/style.css`.
7. Build the vertical **timeline**: `.timeline` + `.timeline-item`, the vertical
   line and year dots drawn with `::before`.

### Step 3 — the Linus page (two-column layouts)
8. Create `pages/linus.html`. Use a `.split` grid
   (`grid-template-columns: 1fr 1fr`).
9. Add the photo as a circular `<figure>` + `<figcaption>`.
10. Add a "key facts" list whose bullets are `::before` check marks.

### Step 4 — index polish
11. Back in `index.html`, add: cards grid, a stats grid, a `<table>` with
    `<thead>/<tbody>/<tfoot>`, a `<blockquote><cite>`, and `<details>/<summary>`.
12. The footer year is **hard-coded** here (`© 2026`) — no JS to update it.

### Step 5 — About Me + footer link walkthrough
13. Create `pages/about-me.html` reusing the shared layout — no new CSS needed.

### Step 6 — the Showcase page (the big one)
14. Create `pages/showcase.html` + `assets/css/showcase.css` and link **both**
    stylesheets: `style.css` first, then `showcase.css`.
15. Build sections in this order: text elements → media (`picture`, `audio`,
    `video`, `canvas`) → iframe → form with many input types → merged-cell
    table → `dialog`/`popover`/`details` → lists + counters → layout
    (grid areas, float, columns) → gradients/effects/filters → scroll-snap →
    typography → pseudo/attribute selectors → container queries.
16. The `canvas`/`dialog`/`template` demos need JavaScript to do anything
    interactive — here they stay inert on purpose. They still demonstrate the
    **markup**. The interactive versions live in the JS project.

### Step 7 — navigation + final checks
17. Every page has the same 5-link navbar (Home, History of Linux, About Linus,
    About Me, Showcase) — no dead links.
18. Run a local server and click every link:
    ```bash
    cd linux-html-css && python3 -m http.server 8000
    ```

---

## 4. HTML concepts you'll practise (by area)

- **Head/meta:** charset, viewport, description, theme-color, favicon.
- **Semantic layout:** `header`, `nav`, `main`, `section`, `article`, `footer`.
- **Text:** `h1–h3`, `p`, `strong`, `em`, `mark`, `small`, `sub/sup`,
  `abbr`, `blockquote`, `cite`, `address`, `dl/dt/dd`, `ruby`, `bdi`.
- **Media:** `img`, `picture`+`source`+`srcset`, `audio`, `video`, `iframe`,
  `canvas`, `figure/figcaption`.
- **Forms:** every `input` type, `select`+`optgroup`+`datalist`, `textarea`,
  `fieldset/legend`, `checkbox/radio`, `range`, `file`, `hidden`, `output`,
  `novalidate`, `formnovalidate`, required/disabled/readonly/pattern.
- **Tables:** `caption`, `thead/tbody/tfoot`, `colspan`/`rowspan`.
- **Interactive:** `details/summary`, `dialog`, `popover`, `template`,
  `contenteditable`, `tabindex`, `hidden`, `noscript`.
- **Lists:** `ol` (reversed/start/type), nested `ul`, `menu`.
- **Attributes:** `lang`, `data-*`, `aria-*`, `role`, `draggable`, `title`.

## 5. CSS concepts you'll practise (by area)

- **Selectors:** element, class, id, descendant, `>`, `+`, `~`, attribute
  `[type="…"]`, `:hover`, `:focus`, `:checked`, `:not()`, `:is()`,
  `:where()`, `:has()`, `:nth-child`, `:target`.
- **Pseudo-elements:** `::before`, `::after`, `::selection`, `::placeholder`,
  `::marker`, `::backdrop`, `::first-line`.
- **Box model:** margin, padding, border, border-radius, box-shadow (incl. inset).
- **Layout:** flexbox (direction, justify/align, wrap, gap), grid
  (template-areas, auto-fit/minmax, span), `float`+`clear`, multi-column
  (`column-count`), `position` (static/relative/absolute/sticky).
- **Colors & effects:** `linear/radial/conic/repeating` gradients,
  `background-clip: text`, `filter`, `clip-path`, `backdrop-filter`,
  `mix-blend-mode`, opacity.
- **Responsive:** `clamp()`, `min()/max()`, `vw/vh`, `@media` queries,
  `@container`, `prefers-reduced-motion`, `aspect-ratio`.
- **Motion:** `transition`, `transform`, `@keyframes` animation.
- **Modern extras:** custom properties (variables), `@supports`, logical
  properties, `scroll-snap`, `line-clamp`, custom scrollbars, print styles.

---

## 6. Rules for a clean rewrite

- Write your own text/code. Read the reference only when stuck.
- Keep `index.html` in the root, everything else under `pages/` or `assets/`.
- One stylesheet-first approach: style naming with a `-` prefix
  (`.card`, `.navbar-inner`) and group rules with comment banners.
- After each page, run the local server and click every link on the page.
- Validate: all tags closed, `alt` on images, `<label for>` matches input ids.
- There is deliberately **no `.js` folder and no `<script>` tag** anywhere:
  if a page needs a script, that feature has already moved to the JS project.