# 44 — Web Performance & Core Web Vitals

## Why Web Vitals?

Core Web Vitals are Google's metrics for real-world user experience. They directly impact search ranking and user retention. Unlike synthetic benchmarks, they measure what real users experience.

## The Three Core Web Vitals

| Metric | What It Measures | Good | Poor |
|--------|-----------------|------|------|
| **LCP** (Largest Contentful Paint) | Loading — when the main content is visible | ≤ 2.5s | > 4.0s |
| **INP** (Interaction to Next Paint) | Interactivity — responsiveness to clicks/taps | ≤ 200ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | Visual stability — unexpected layout shifts | ≤ 0.1 | > 0.25 |

INP replaced FID (First Input Delay) in March 2024. Unlike FID (which only measured the delay before handling), INP measures the **full duration** from input to the next frame.

## Measuring Web Vitals

### Lighthouse (Lab Data)

```bash
# Run from Chrome DevTools → Lighthouse tab
# Or from CLI:
npx lighthouse https://example.com --view
```

Generates a report with scores (0–100) for Performance, Accessibility, Best Practices, SEO, and PWA.

### web-vitals Library (Field Data)

```javascript
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP(metric => console.log('LCP:', metric.value));
onINP(metric => console.log('INP:', metric.value));
onCLS(metric => console.log('CLS:', metric.value));

// Send to analytics
function sendToAnalytics(metric) {
    navigator.sendBeacon('/analytics', JSON.stringify(metric));
}
onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
```

### Performance Observer API (Manual)

```javascript
const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime, entry.element);
        }
        if (entry.entryType === 'layout-shift') {
            if (!entry.hadRecentInput) {
                console.log('CLS:', entry.value);
            }
        }
    }
});

observer.observe({ type: 'largest-contentful-paint', buffered: true });
observer.observe({ type: 'layout-shift', buffered: true });
```

## Performance Budgets

Define targets and fail CI when they're exceeded:

```javascript
// budgets.json (used by Lighthouse CI)
[
    { "path": "/", "resourceSizes": [{ "resourceType": "total", "budget": 500 }] },
    { "path": "/", "timings": [{ "metric": "interactive", "budget": 3500 }] }
]
```

```yaml
# .github/workflows/performance.yml
- name: Lighthouse CI
  run: |
    npm install -g @lhci/cli
    lhci autorun --config=./lighthousesrc.json
```

## The RAIL Model

| Phase | Goal | User Expectation |
|-------|------|-----------------|
| **R**esponse | < 100ms | Acknowledge input instantly |
| **A**nimation | < 16ms per frame (60fps) | Smooth visual updates |
| **I**dle | < 50ms max | Main thread available for input |
| **L**oad | < 5s (3G), < 2s (repeat) | Content visible quickly |

## Optimization Strategies by Metric

### Improve LCP

```html
<!-- Preload the LCP image (hero image) -->
<link rel="preload" as="image" href="hero.webp">

<!-- Use modern formats -->
<picture>
    <source srcset="hero.avif" type="image/avif">
    <source srcset="hero.webp" type="image/webp">
    <img src="hero.jpg" alt="Hero" fetchpriority="high">
</picture>
```

```javascript
// Lazy-load non-critical images
const img = document.querySelector('img[loading="lazy"]');
// Native lazy loading — HTML: <img loading="lazy" src="..." />
```

Strategies:
- Preload hero images
- Use responsive images (`srcset`, `sizes`)
- Serve next-gen formats (AVIF, WebP)
- Minimize render-blocking resources
- SSR critical content to avoid client-side rendering delay

### Improve INP

```javascript
// Break up long tasks with scheduler.yield() or setTimeout()
async function processItems(items) {
    for (const item of items) {
        doWork(item);

        // Yield to the main thread every 5 items
        if (i % 5 === 0) {
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }
}

// Use isInputPending() to check if user is trying to interact
while (tasks.length > 0) {
    if (navigator.scheduling?.isInputPending()) {
        await new Promise(resolve => setTimeout(resolve, 0));
    }
    tasks.shift()();
}
```

Strategies:
- Break long tasks into < 50ms chunks
- Avoid heavy synchronous work on interaction handlers
- Use `setTimeout` or `scheduler.yield()` to defer non-critical work
- Debounce expensive handlers
- Consider Web Workers for CPU-heavy processing

### Improve CLS

```html
<!-- Always set width and height on images -->
<img src="photo.jpg" width="800" height="600" alt="Photo">

<!-- Reserve space for dynamic content -->
<div style="min-height: 300px" id="ad-slot"></div>
```

```css
/* Prevent layout shift from web fonts */
@font-face {
    font-family: 'CustomFont';
    src: url('/fonts/custom.woff2');
    font-display: swap; /* Use fallback font until custom loads */
}

/* Set explicit aspect ratios */
.aspect-ratio-box {
    aspect-ratio: 16 / 9;
}
```

Strategies:
- Set explicit dimensions on all media elements
- Reserve space for injected content (ads, embeds, toasts)
- Use `aspect-ratio` CSS property
- Use `font-display: swap` for web fonts
- Avoid inserting content above existing content after page load

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| What is the LCP element? | Chrome DevTools → Performance → Timings → LCP |
| What is the INP interaction? | DevTools → Performance → Interactions track |
| Are there layout shifts? | DevTools → Performance → Layout Shifts track |
| Are images lazy-loaded? | Check for `loading="lazy"` attribute |
| Are there render-blocking resources? | DevTools → Coverage tab or Lighthouse report |
| Is the main thread busy? | DevTools → Performance → Main thread flame chart |
| Are long tasks present? | DevTools → Performance → Long Tasks (red triangle top-right) |
| Are dimensions set? | Check media elements for `width`/`height` attributes |
| Is there a performance budget? | Check CI config for Lighthouse thresholds |
| Are fonts causing CLS? | Check for `font-display: swap` in CSS |
## Next Steps

[Back to Chapter 43](43-dom-performance.md): 43 — DOM Performance Optimization

[Proceed to Module 10](../10-advanced-js/README.md): Advanced JavaScript to learn about advanced JavaScript features and metaprogramming.
