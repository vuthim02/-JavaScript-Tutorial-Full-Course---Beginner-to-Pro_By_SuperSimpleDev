# 🎨 UX/UI Design — Complete Cheat Sheet

---

## 📐 1. UX Process — The Double Diamond

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  DISCOVER    │→ │   DEFINE     │→ │   DEVELOP    │→ │   DELIVER    │
│  (Research)  │  │  (Strategy)  │  │   (Design)   │  │   (Launch)   │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🔍 2. UX Research Methods

| Method              | When to Use                        |
| ------------------- | ---------------------------------- |
| User Interviews     | Understand pain points             |
| Surveys             | Gather data at scale               |
| Competitor Analysis | Find gaps & opportunities          |
| A/B Testing         | Compare design options             |
| Usability Testing   | Validate prototypes                |
| Personas            | Represent target users             |
| Journey Maps        | Visualize user flow                |
| Card Sorting        | Organize content & IA              |
| Contextual Inquiry  | Observe real-world usage           |

### Key Questions to Always Ask

> - **Who** is the user?
> - **What** is their goal?
> - **Where** do they currently fail?
> - **Why** do they need this?

---

## 🧠 3. UI Principles

### Gestalt Principles

| Principle      | Meaning                                     |
| -------------- | ------------------------------------------- |
| **Proximity**  | Nearby items = related                      |
| **Similarity** | Similar look = same function                |
| **Continuity** | Eye follows lines & curves                  |
| **Closure**    | Brain completes incomplete shapes            |
| **Figure/Ground** | Foreground vs background                 |
| **Common Region** | Shared container = grouped                |

### Core Design Principles

| Principle        | Meaning                                          |
| ---------------- | ------------------------------------------------ |
| **Hierarchy**    | Guide the eye (size, color, weight)              |
| **Contrast**     | Make important things stand out                  |
| **Alignment**    | Create order and connection                      |
| **Repetition**   | Consistency builds familiarity                   |
| **Balance**      | Symmetrical = stable, Asymmetrical = dynamic     |
| **White Space**  | Let content breathe                              |
| **Consistency**  | Same patterns everywhere                         |
| **Affordance**   | Design hints at how to use it                    |

---

## 🌈 4. Color

### Color Roles

| Role        | Purpose                            |
| ----------- | ---------------------------------- |
| **Primary**   | Brand identity (1 color)         |
| **Secondary** | Supporting / accent (1-2 colors) |
| **Neutral**   | Backgrounds, text (grays)        |
| **Semantic**  | Meaning-based feedback            |

### Semantic Colors

| Color   | Hex (Example) | Meaning       |
| ------- | ------------- | ------------- |
| 🟢 Green  | `#22C55E`    | Success       |
| 🟡 Yellow | `#EAB308`    | Warning       |
| 🔴 Red    | `#EF4444`    | Error         |
| 🔵 Blue   | `#3B82F6`    | Info          |

### 60-30-10 Rule

```
60% ██████████████████████  Dominant   (backgrounds)
30% ████████████            Secondary  (cards, sections)
10% ██████                  Accent     (buttons, icons)
```

### Contrast Ratios (WCAG)

| Use Case            | Min Ratio |
| ------------------- | --------- |
| Normal text (< 18px) | 4.5:1    |
| Large text (≥ 18px bold or ≥ 24px) | 3:1 |
| UI components & icons | 3:1      |

---

## 🔤 5. Typography

### Rules

| Rule              | Value                          |
| ----------------- | ------------------------------ |
| Font families     | Max **2** per project          |
| Line height       | **1.4–1.6×** font size         |
| Line length       | **45–75** characters           |
| Font weights      | **2–3** max per font           |

### Type Scale

```
H1  — 48px Bold        ← One per page
H2  — 32px Semibold    ← Section title
H3  — 24px Medium      ← Sub-section
H4  — 20px Medium      ← Card title
Body — 16px Regular    ← Paragraphs
Small — 14px Regular   ← Secondary text
Caption — 12px Light   ← Metadata, labels
```

### Font Pairing Examples

```
Sans-Serif: Inter, Roboto, SF Pro, Helvetica Neue
Serif:      Merriweather, Playfair Display, Lora
Monospace:  JetBrains Mono, Fira Code
```

---

## 📏 6. Spacing & Layout

### 8px Grid System

All spacing in multiples of **8px**:

```
 4px  │░░░│  Tiny gaps (icon padding)
 8px  │░░░░░░░░░│  Small gaps (inline elements)
16px  │░░░░░░░░░░░░░░░░░│  Default padding
24px  │░░░░░░░░░░░░░░░░░░░░░░░░░│  Between sections
32px  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  Large gaps
48px  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  Major sections
64px  │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  Page-level
```

### Responsive Breakpoints

| Device  | Width        | Columns |
| ------- | ------------ | ------- |
| Mobile  | `< 768px`    | 4       |
| Tablet  | `768–1024px` | 8       |
| Desktop | `1024–1440px`| 12      |
| Large   | `> 1440px`   | 12 (constrained) |

---

## 🧩 7. Components

### Buttons

| Type        | Style                     | Use Case           |
| ----------- | ------------------------- | ------------------ |
| **Primary**   | Filled, bold color      | Main action (1 per screen) |
| **Secondary** | Outlined / lighter      | Alternative action |
| **Tertiary**  | Text only               | Low emphasis       |
| **Danger**    | Red filled              | Destructive action |

### Button States

```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Default  │→ │  Hover   │→ │  Active  │→ │ Disabled │→ │ Loading  │
│ ████████ │  │ ▓▓▓▓▓▓▓▓ │  │ ▒▒▒▒▒▒▒▒ │  │ ░░░░░░░░ │  │ ⟳ ⟳ ⟳   │
└──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘
```

### Form Best Practices

- ✅ Labels **above** inputs (not floating)
- ✅ Error messages **below** input, inline
- ✅ Required fields marked with `*`
- ✅ Group related fields together
- ✅ Single column on mobile
- ✅ Clear placeholder text

### Navigation Rules

- Max **5–7** items in main nav
- Always show current location
- Consistent across all pages
- **Mobile:** hamburger menu or bottom nav bar

---

## ⚡ 8. Interaction Design

| Pattern            | Use Case                          |
| ------------------ | --------------------------------- |
| Loading Skeleton   | Content is loading                |
| Pull to Refresh    | Mobile content update             |
| Infinite Scroll    | Feeds, long lists                 |
| Toast / Snackbar   | Brief notifications               |
| Modal              | Focused decision needed           |
| Bottom Sheet       | Mobile options / actions          |
| Tabs               | Switch between related views      |
| Accordion          | Progressive disclosure            |
| Stepper            | Multi-step forms                  |
| Tooltip            | Hover hints                       |

### Response Time Rules

```
< 0.1s   │ Instant        │ Button press, toggle
0.1–1s   │ Loading        │ Spinner
1–5s     │ Progress       │ Progress bar
> 5s     │ Status         │ Percentage + message
```

---

## ♿ 9. Accessibility (WCAG 2.1)

### Checklist

- [ ] Color contrast **4.5:1** minimum
- [ ] All images have **alt text**
- [ ] Everything **keyboard-navigable** (Tab, Enter, Esc)
- [ ] **Focus states** clearly visible
- [ ] **Screen reader** tested
- [ ] No **color-only** information
- [ ] Touch targets **44×44px** minimum
- [ ] Form **labels linked** to inputs
- [ ] Error messages are **descriptive**
- [ ] **Skip navigation** link available

---

## 🖼️ 10. Icons & Imagery

### Icons

| Rule                    | Value                        |
| ----------------------- | ---------------------------- |
| Style                   | Consistent (all outline OR all filled) |
| Default size            | 24×24px                      |
| Small size              | 16×16px                      |
| Feature size            | 48×48px+                     |
| Labels                  | Pair with text when possible |

### Images

| Type            | Example                        |
| --------------- | ------------------------------ |
| Hero            | `16:9` aspect ratio            |
| Cards           | `4:3` aspect ratio             |
| Avatars         | `1:1` (square/circle)          |
| Format          | WebP (optimized), lazy loaded  |
| Style           | Real > Stock (authentic wins)  |

---

## 🎬 11. Motion & Animation

### Types

| Type         | Purpose                         |
| ------------ | ------------------------------- |
| **Entry**      | Elements appear (fade, slide up) |
| **Exit**       | Elements disappear (fade out)    |
| **Emphasis**   | Draw attention (scale, bounce)   |
| **Transition** | Between states (color change)    |

### Timing Rules

```
UI Micro-interactions  →  150–300ms
Page transitions       →  300–500ms
Easing: ease-out (entering), ease-in (exiting)
```

### Motion Rules

- ✅ Guide attention
- ✅ Show relationships
- ✅ Give feedback
- ❌ Never block the user
- ❌ Never delay interaction
- ❌ Never animate just for fun

---

## 📱 12. Responsive Design

### Layout by Device

```
┌──────────────────────────────┐
│  MOBILE  (< 768px)           │
│  Single column, stacked      │
│  Touch targets 44px+         │
│  Bottom nav or hamburger     │
├──────────────────────────────┤
│  TABLET  (768–1024px)        │
│  2 columns, side nav         │
│  More breathing room         │
├──────────────────────────────┤
│  DESKTOP  (1024–1440px)      │
│  Full layout, 12-col grid    │
│  Hover states enabled        │
├──────────────────────────────┤
│  LARGE  (> 1440px)           │
│  Constrained max-width 1200px│
│  Same as desktop             │
└──────────────────────────────┘
```

### Responsive Checklist

- [ ] No horizontal scrolling
- [ ] Readable without zoom (16px body)
- [ ] Touch vs mouse interaction
- [ ] Thumb-reachable zones (mobile)
- [ ] Images scale properly
- [ ] Text wraps correctly

---

## 🏗️ 13. Design Systems

### Core Components

```
┌─────────────────────────────────────────┐
│           DESIGN SYSTEM                 │
├───────────────┬─────────────────────────┤
│ Design Tokens │ Colors, spacing, fonts  │
│ Components    │ Reusable UI blocks      │
│ Patterns      │ Solutions to problems   │
│ Documentation │ How to use everything   │
└───────────────┴─────────────────────────┘
```

### Component States to Define

```
Default → Hover → Active → Focused → Disabled → Loading → Error → Empty
```

---

## 🛠️ 14. Prototyping & Tools

| Fidelity  | Tools                        | Use Case          |
| --------- | ---------------------------- | ----------------- |
| **Low**     | Paper, Balsamiq            | Quick ideas       |
| **Mid**     | Figma, Sketch              | Layout & flow     |
| **High**    | Figma, ProtoPie            | Realistic inter.  |
| **Code**    | HTML / CSS / JS            | Production-ready  |

### Prototype Types

| Type         | What It Does                    |
| ------------ | ------------------------------- |
| **Clickable**  | Screen-to-screen navigation   |
| **Animated**   | Shows transitions & motion    |
| **Functional** | Coded, fully working          |

---

## 📊 15. UX Metrics

| Metric                      | What It Tells You             |
| --------------------------- | ----------------------------- |
| **Task Success Rate**       | Can users complete goals?     |
| **Time on Task**            | How efficient is the design?  |
| **Error Rate**              | How often do users fail?      |
| **SUS Score**               | Overall usability (0–100)     |
| **NPS**                     | Would users recommend?        |
| **Conversion Rate**         | Are designs driving action?   |
| **Bounce Rate**             | Are users leaving immediately?|

---

## 🧠 16. Psychology Tricks

| Law / Effect           | What It Means                           |
| ---------------------- | --------------------------------------- |
| **Hick's Law**         | Fewer choices = faster decisions        |
| **Fitts's Law**        | Bigger/closer targets = faster clicks   |
| **Miller's Law**       | Chunks of 5–9 items max                 |
| **Jakob's Law**        | Users prefer familiar patterns          |
| **Peak-End Rule**      | Users judge by peak moment & end        |
| **Von Restorff Effect**| Standout items get remembered           |
| **Zeigarnik Effect**   | Incomplete tasks stay in mind           |
| **Loss Aversion**      | Fear of loss > desire for gain          |
| **Social Proof**       | Others using it = trust                 |
| **Anchoring**          | First number sets expectations          |

---

## ⚠️ 17. Common Mistakes

| ❌ Mistake                        | ✅ Fix                              |
| --------------------------------- | ----------------------------------- |
| Too many fonts, colors, styles    | Limit to 2 fonts, 3-5 colors       |
| No visual hierarchy               | Use size, weight, color to guide eye|
| Walls of text                     | Break into scannable chunks         |
| Hidden navigation                 | Keep it visible & consistent        |
| Ignoring mobile                   | Design mobile-first                 |
| Low contrast / small text         | Follow WCAG ratios, 16px+ body      |
| Inconsistent spacing              | Use 8px grid system                 |
| No error or loading states        | Design all states                   |
| Designing for yourself            | Test with real users                |
| Skipping user testing             | Test early, test often              |

---

## 📚 18. Learning Resources

| Type         | Recommendation                              |
| ------------ | ------------------------------------------- |
| 📖 Book       | "The Design of Everyday Things" — Don Norman |
| 🏋️ Practice   | Daily UI Challenge (dailyui.co)             |
| 💡 Inspiration| Dribbble, Mobbin, Muzli                    |
| 🎓 Courses    | Google UX Certificate, Nielsen Norman Group |
| 📐 Principles | Laws of UX (lawsofux.com)                  |
| 🏗️ Systems    | Material Design, Apple Human Interface Guide|

---

## 🚀 TL;DR — Priority Order

```
1. ✦  Learn the process  (research → define → design → test)
2. ✦  Master hierarchy, contrast, spacing
3. ✦  Use the 8px grid system
4. ✦  Follow WCAG accessibility basics
5. ✦  Prototype in Figma
6. ✦  Test with real users
7. ✦  Iterate based on feedback
```

---

> *"Design is not just what it looks like and feels like. Design is how it works."*
> — **Steve Jobs**
