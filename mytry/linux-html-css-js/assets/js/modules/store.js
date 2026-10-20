const PREFIX = "linuxlib:";

class LocalStore {
    constructor(prefix = PREFIX) {
        this.prefix = prefix;
        this.memory = new Map();
    }

    get(key, fallback = null) {
        const full = this.prefix + key;
        try {
            const raw = localStorage.getItem(full);
            if (raw === null) return fallback;
            const parsed = JSON.parse(raw);
            if (parsed && parsed.__ttl && parsed.__expires < Date.now()) {
                localStorage.removeItem(full);
                return fallback;
            }
            return parsed && "__expires" in parsed ? parsed.__value : parsed;
        } catch (err) {
            console.warn("[store] get failed:", err.message);
            return fallback;
        }
    }

    set(key, value, ttlMs = 0) {
        const full = this.prefix + key;
        try {
            const record =
                ttlMs > 0
                    ? { __value: value, __expires: Date.now() + ttlMs, __ttl: true }
                    : value;
            localStorage.setItem(full, JSON.stringify(record));
            return true;
        } catch (err) {
            console.warn("[store] set failed:", err.message);
            return false;
        }
    }

    remove(key) {
        localStorage.removeItem(this.prefix + key);
        return this;
    }

    has(key) {
        return localStorage.getItem(this.prefix + key) !== null;
    }

    keys() {
        const out = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i) || "";
            if (k.startsWith(this.prefix)) out.push(k.slice(this.prefix.length));
        }
        return out;
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i) || "";
            if (k.startsWith(this.prefix)) {
                yield { key: k.slice(this.prefix.length), value: this.get(k.slice(this.prefix.length)) };
            }
        }
    }

    clear() {
        for (const { key } of this) this.remove(key);
    }

    getJSON(key) {
        return this.get(key);
    }
}

const createObservedStore = (target, { log = false } = {}) =>
    new Proxy(target, {
        get(target, prop, receiver) {
            if (log && typeof prop === "string") {
                console.log(`[store.proxy] → get("${prop}")`);
            }
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
            if (prop === "set" || prop === "get") {
                console.warn(`[store.proxy] blocked direct call of ${String(prop)}`);
                return true;
            }
            return Reflect.set(target, prop, value, receiver);
        },
    });

const store = new LocalStore();
const observedStore = createObservedStore(store, { log: true });
export { LocalStore, store, observedStore, createObservedStore };