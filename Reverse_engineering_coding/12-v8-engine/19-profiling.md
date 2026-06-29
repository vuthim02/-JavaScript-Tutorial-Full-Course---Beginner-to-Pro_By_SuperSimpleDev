# 19 — Profiling & Bottleneck Identification

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Browser Performance Tools

### Performance Tab

```
Chrome DevTools → Performance → Record
```

What you can see:

- **Frames** — green = smooth, red = jank.
- **Timings** — where time is spent (scripts, rendering, painting).
- **Call stack** — which functions are expensive.
- **GC events** — yellow bars indicating garbage collection pauses.

### Memory Tab

```
Chrome DevTools → Memory
```

Three profiling types:

| Type | What It Shows |
|------|---------------|
| **Heap snapshot** | All objects, retainers, sizes |
| **Allocation instrumentation** | Where objects are allocated over time |
| **Allocation sampling** | Memory allocation at regular intervals |

### Interpreting Heap Snapshots

```
1. Take snapshot (baseline)
2. Perform action
3. Take snapshot (comparison)
4. Look for:
   - Objects not freed (should be zero)
   - Detached DOM nodes
   - Size growth
```

## Node.js Profiling

```bash
# Run with inspector
node --inspect-brk app.js

# Generate CPU profile
node --prof app.js
node --prof-process isolate-*.log > processed.txt

# Using clinic.js
npx clinic doctor -- node app.js
```

## Identifying Bottlenecks

### Systematic Approach

```
1. Profiling data available?
   ├── Yes → Identify top time consumer
   └── No  → Add profiling, reproduce, then analyze

2. Top consumer is:
   ├── CPU (scripting)
   │   ├── Find hot function (JIT candidate)
   │   ├── Check time complexity
   │   └── Consider worker
   │
   ├── Memory (GC)
   │   ├── Check allocation rate
   │   ├── Check GC frequency
   │   └── Reduce object churn
   │
   ├── Rendering
   │   ├── Batch DOM updates
   │   ├── Use transform/opacity (composite only)
   │   └── Avoid layout thrashing
   │
   └── Network
       ├── Cache responses
       ├── Compress payloads
       └── Reduce request count
```

### Common Reduction Strategies

| Bottleneck | Strategy |
|------------|----------|
| CPU (nested loops) | Hash map, early break |
| CPU (repeated computation) | Memoization |
| Memory (allocation) | Object pooling |
| Memory (growing cache) | LRU, size limits |
| Rendering (reflow) | Batch writes, DocumentFragment |
| Rendering (paint) | `will-change`, GPU compositing |
| Network (many requests) | Debounce, caching, HTTP/2 |

## Profiling Checklist

When debugging performance, ask these questions:

| Question | Tool/Data Source |
|----------|-----------------|
| Is slowdown CPU-bound? | Performance tab → Scripting time |
| Is slowdown memory-bound? | Memory tab → Heap size, GC frequency |
| Is slowdown network-bound? | Network tab → Request/response timing |
| Is slowdown render-bound? | Performance tab → Rendering/Painting time |
| What function is the bottleneck? | Performance tab → Bottom-up call tree |
| Is object creation excessive? | Allocation instrumentation → allocation hotspots |
| Is GC running frequently? | Performance tab → Yellow GC bars |
| Which operation happens millions of times? | Profiling data → top inclusive time |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is slowdown CPU-bound? | Check Scripting time in Performance tab |
| Is slowdown memory-bound? | Check Heap size + GC frequency |
| Is slowdown network-bound? | Check request waterfall |
| Is slowdown render-bound? | Check Rendering/Painting time |
| What function is the bottleneck? | Bottom-up call tree |
| Is profiling data available? | Never optimize without data. Measure first. |
## Next Steps

[Back to Chapter 18](18-event-loop.md): 18 — Event Loop: Microtasks vs Macrotasks
[Proceed to Chapter 20](20-immutability-object-pooling.md): 20 — Immutability & Object Pooling to learn about 20 — immutability & object pooling.
