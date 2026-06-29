# 20 — Immutability & Object Pooling

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Why Immutability Improves Performance

### The Problem

```javascript
let user = { name: "Alice", age: 25 };
user.age = 26; // Mutates existing object
```

Mutation:
- Can trigger unexpected side effects (because other references see the change).
- Makes change detection expensive (need deep comparison).

### Immutability

```javascript
const user = { name: "Alice", age: 25 };
const updatedUser = { ...user, age: 26 }; // New object
```

Benefits:
- **Shared references are safe** — no unexpected mutation.
- **Change detection is O(1)** — compare references (`old !== new`).
- **Time travel debugging** — each state is a snapshot.

### Usage in React

```javascript
// React re-renders when reference changes
this.setState(prev => ({
    items: [...prev.items, newItem]  // New array reference
}));
```

### Performance Trade-offs

| Aspect | Mutation | Immutability |
|--------|----------|--------------|
| Memory | Same object reused | New objects created |
| GC pressure | Lower | Higher (more garbage) |
| Change detection | Deep comparison needed | Reference comparison O(1) |
| Side effect safety | Unsafe | Safe |

### Optimizing Immutability with Libraries

```javascript
// Immer — write mutable code, get immutable result
import produce from 'immer';

const nextState = produce(state, draft => {
    draft.user.age = 26; // Looks mutable, but produces immutable result
});
```

## Object Pooling: Reducing GC Pressure

### The Problem

```javascript
function createParticle(x, y) {
    return { x, y, vx: 0, vy: 0, life: 1 };
}

function update(p) {
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.01;
    return p;
}

// In game loop (60fps):
const particles = [];
for (let i = 0; i < 1000; i++) {
    particles.push(createParticle(Math.random() * 100, Math.random() * 100));
}
// Every frame, some particles die, new ones created
// Creates GC pressure = 60 GCs per second
```

### The Solution: Object Pool

```javascript
class ParticlePool {
    constructor(size) {
        this.pool = [];
        this.active = [];

        for (let i = 0; i < size; i++) {
            this.pool.push({ x: 0, y: 0, vx: 0, vy: 0, life: 0 });
        }
    }

    acquire(x, y) {
        const p = this.pool.pop();
        if (!p) return null; // Pool exhausted

        p.x = x;
        p.y = y;
        p.vx = 0;
        p.vy = 0;
        p.life = 1;
        this.active.push(p);
        return p;
    }

    release(p) {
        const idx = this.active.indexOf(p);
        if (idx !== -1) {
            this.active.splice(idx, 1);
            this.pool.push(p);
        }
    }
}

// Usage — zero allocations per frame
const pool = new ParticlePool(1000);

function gameLoop() {
    // Reuse existing objects instead of creating new ones
    if (shouldSpawnParticle()) {
        pool.acquire(mouseX, mouseY);
    }

    for (const p of pool.active) {
        update(p);
    }
}
```

### Benefits

| Metric | Without Pool | With Pool |
|--------|-------------|-----------|
| Allocations per frame | 50+ | 0 |
| GC collections per minute | 60+ | ~5 |
| Frame time variance | High (GC pauses) | Stable |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is object creation excessive? | Check allocation rate in profiler |
| Are objects short-lived? | Yes → pool candidate |
| Is GC running frequently? | Yes → reduce churn |
| Is mutation causing bugs? | Consider immutability |
| Need change detection? | Immutability gives O(1) reference check |
## Next Steps

[Back to Chapter 19](19-profiling.md): 19 — Profiling & Bottleneck Identification
[Proceed to Chapter 21](21-strings-weak-references.md): 21 — String Interning & Weak References to learn about 21 — string interning & weak references.
