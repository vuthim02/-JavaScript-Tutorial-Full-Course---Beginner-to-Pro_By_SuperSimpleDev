import { eventBus } from "./events.js";
import { store } from "./store.js";
import { api } from "./api.js";
import { debounce, escapeHTML } from "./utils.js";

const has = (id) => document.getElementById(id);

/* ---------- 1. Scroll reveal via IntersectionObserver ---------- */
(function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );
    items.forEach((el, i) => {
        el.style.setProperty("--reveal-delay", `${Math.min(i % 6, 5) * 90}ms`);
        io.observe(el);
    });
})();

/* ---------- 2. Live clock ([data-clock]) via setInterval ---------- */
(function initClock() {
    const el = has("live-clock");
    if (!el) return;
    const tick = () => {
        const now = new Date();
        el.textContent = now.toLocaleTimeString();
    };
    tick();
    setInterval(tick, 1000);
})();

/* ---------- 3. API status widget on home page ---------- */
(async function initApiStatus() {
    const widget = has("api-status");
    if (!widget) return;
    const timeEl = widget.querySelector("[data-status-time]");
    const noteEl = widget.querySelector("[data-status-notes]");
    const liveEl = widget.querySelector("[data-status-live]");
    const stateEl = widget.querySelector("[data-status-state]");

    const setState = (text, ok) => {
        stateEl.textContent = text;
        stateEl.className = ok ? "status-dot online" : "status-dot offline";
    };

    try {
        const data = await api.get("/api/v1/system/status");
        if (timeEl) timeEl.textContent = new Date(data.now).toLocaleTimeString();
        if (noteEl) noteEl.textContent = String(data.notes.count);
        if (liveEl) liveEl.textContent = String(data.live.connectedClients);
        setState(liveEl ? "API online" : "online", true);
        eventBus.emit("api:status", data);
    } catch (err) {
        setState("offline", false);
        const tip = widget.querySelector("[data-status-error]");
        if (tip) tip.hidden = false;
    }
})();

/* ---------- 4. Visitor registration (once per browser) ---------- */
(async function registerVisitor() {
    if (store.get("visited", false)) return;
    try {
        const data = await api.post("/api/v1/visitors/join", {});
        store.set("visited", true);
        eventBus.emit("visitor:registered", data);
    } catch {
        store.set("visited", true);
    }
})();

/* ---------- 5. Search filter helper ([data-filter] + list) ---------- */
(function initFilter() {
    const input = document.querySelector("[data-filter]");
    const list = document.querySelector("[data-filter-list]");
    if (!input || !list) return;

    const apply = debounce(() => {
        const q = input.value.trim().toLowerCase();
        list.querySelectorAll("[data-filter-item]").forEach((item) => {
            item.hidden = !item.textContent.toLowerCase().includes(q);
        });
    }, 200);
    input.addEventListener("input", apply);
})();

/* ---------- 6. Toast helper via CustomEvent ---------- */
window.showToast = (message, kind = "info") => {
    const box = document.getElementById("toast-box");
    if (!box) return;
    const toast = document.createElement("div");
    toast.className = `toast ${kind}`;
    toast.textContent = message;
    box.append(toast);
    setTimeout(() => toast.remove(), 3500);
};

/* ---------- 7. Service worker (PWA) ---------- */
if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./sw.js")
            .then((reg) => console.log("[sw] registered scope", reg.scope))
            .catch((err) => console.warn("[sw] registration failed", err.message));
    });
}

export { eventBus as bus, store as storage };