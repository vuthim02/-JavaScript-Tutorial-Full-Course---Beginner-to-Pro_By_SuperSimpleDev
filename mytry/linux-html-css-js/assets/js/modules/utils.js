export const debounce = (fn, delay = 300) => {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};

export const throttle = (fn, interval = 250) => {
    let last = 0;
    let timer = null;
    return (...args) => {
        const now = Date.now();
        const remaining = interval - (now - last);
        if (remaining <= 0) {
            last = now;
            fn(...args);
        } else if (!timer) {
            timer = setTimeout(() => {
                last = Date.now();
                timer = null;
                fn(...args);
            }, remaining);
        }
    };
};

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const pad = (n, width = 2) => String(n).padStart(width, "0");

export const escapeHTML = (s) =>
    String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

export const formatDate = (iso) => {
    try {
        return new Date(iso).toLocaleString();
    } catch {
        return String(iso);
    }
};

export const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const parts = [];
    if (h) parts.push(`${h}h`);
    if (m) parts.push(`${m}m`);
    parts.push(`${s}s`);
    return parts.join(" ");
};

export const randomId = () =>
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export function* range(start, end, step = 1) {
    if (typeof end === "undefined") {
        end = start;
        start = 0;
    }
    if (step === 0) throw new Error("step cannot be 0");
    if (step > 0) {
        for (let i = start; i < end; i += step) yield i;
    } else {
        for (let i = start; i > end; i += step) yield i;
    }
}

export function* chunks(byteArray, size) {
    for (let offset = 0; offset < byteArray.length; offset += size) {
        yield byteArray.subarray(offset, offset + size);
    }
}

export const fnv1a = (input) => {
    const bytes =
        typeof input === "string" ? new TextEncoder().encode(input) : input;
    let hash = 0x811c9dc5;
    for (const byte of bytes) {
        hash ^= byte;
        hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
};

export const fnv1aHex = (input) => fnv1a(input).toString(16).padStart(8, "0");