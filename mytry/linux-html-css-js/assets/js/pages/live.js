import { eventBus } from "../modules/events.js";
import { escapeHTML } from "../modules/utils.js";
import { createObservedStore } from "../modules/store.js";

const els = {
    status: document.getElementById("ws-status"),
    statusText: document.getElementById("ws-status-text"),
    feed: document.getElementById("live-feed"),
    chatForm: document.getElementById("chat-form"),
    chatMessage: document.getElementById("chat-message"),
    btnPing: document.getElementById("btn-ping"),
    traceCanvas: document.getElementById("trace-canvas"),
};

const activityLog = createObservedStore({ latest: null });

let ws = null;
let socketId = null;
let attempts = 0;
let reconnectTimer = null;
const MAX_DELAY = 15_000;
let baseUrl = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws`;

function setStatus(state, text) {
    els.status.className = `status-line ${state}`;
    els.statusText.textContent = text;
}

function addEvent(message, cls = "system") {
    const el = document.createElement("div");
    el.className = `live-event ${cls}`;
    el.innerHTML = message;
    els.feed.append(el);
    els.feed.scrollTop = els.feed.scrollHeight;
}

function time() {
    return new Date().toLocaleTimeString();
}

const trace = new Float32Array(180);
let traceIdx = 0;

function pokeTrace(level) {
    trace[traceIdx % trace.length] = level;
    traceIdx++;
    activityLog.latest = { level, at: Date.now() };
}

function drawTrace() {
    const canvas = els.traceCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth || 300;
    const h = 120;
    if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(140,150,170,0.25)";
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    const stride = w / trace.length;
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#2ec4b6";
    ctx.beginPath();
    for (let i = 0; i < trace.length; i++) {
        const value = trace[(traceIdx + i) % trace.length];
        const x = i * stride;
        const y = h - 6 - value * (h - 24);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
    requestAnimationFrame(drawTrace);
}

function connect() {
    clearTimeout(reconnectTimer);
    setStatus("connecting", attempts ? `reconnecting… (attempt ${attempts})` : "connecting…");

    ws = new WebSocket(baseUrl);

    ws.addEventListener("open", () => {
        attempts = 0;
        setStatus("online", `connected · ${ws.protocol}`);
        addEvent(`<b>[${time()}]</b> connection opened (${ws.protocol})`, "system");
        eventBus.emit("ws:open", ws);
    });

    ws.addEventListener("message", (event) => {
        let data;
        try {
            data = JSON.parse(event.data);
        } catch {
            addEvent(`<b>[${time()}]</b> non-JSON message received`, "error");
            pokeTrace(0.9);
            return;
        }
        pokeTrace(data.type === "pong" ? 1 : 0.45);
        if (data.type === "welcome") {
            socketId = data.id;
            addEvent(`<b>[${time()}]</b> welcome! you are client <b>${escapeHTML(data.id.slice(0, 8))}</b> (${data.total} connected)`, "system");
        } else if (data.type === "visitor:join") {
            addEvent(`<b>[${time()}]</b> 👤 client <b>${escapeHTML(data.id.slice(0, 8))}</b> joined · now ${data.total} connected`, "visitor");
        } else if (data.type === "visitor:leave") {
            addEvent(`<b>[${time()}]</b> 🚪 client <b>${escapeHTML(data.id.slice(0, 8))}</b> left · now ${data.total} connected`, "visitor");
        } else if (data.type === "chat") {
            addEvent(`<b>[${time()}]</b> ${data.id === socketId ? "(you)" : escapeHTML(data.id.slice(0, 8))}: ${escapeHTML(data.message)}`, "chat");
        } else if (data.type === "pong") {
            addEvent(`<b>[${time()}]</b> pong from server (round-trip took ~0ms client-side)`, "system");
        } else if (data.type === "note:created") {
            addEvent(`<b>[${time()}]</b> 📝 note created: “${escapeHTML(data.note.title)}”`, "visitor");
        } else if (data.type === "note:deleted") {
            addEvent(`<b>[${time()}]</b> 🗑 note deleted: “${escapeHTML(data.title)}”`, "visitor");
        } else if (data.type === "server:shutdown") {
            addEvent(`<b>[${time()}]</b> server is shutting down`, "error");
        } else if (data.type === "error") {
            addEvent(`<b>[${time()}]</b> server error: ${escapeHTML(data.message)}`, "error");
        } else {
            addEvent(`<b>[${time()}]</b> unknown event: ${escapeHTML(JSON.stringify(data))}`, "system");
        }
    });

    ws.addEventListener("error", () => {
        setStatus("offline", "connection error");
        addEvent(`<b>[${time()}]</b> socket error`, "error");
    });

    ws.addEventListener("close", () => {
        setStatus("offline", "disconnected");
        addEvent(`<b>[${time()}]</b> connection closed`, "error");
        scheduleReconnect();
    });
}

function scheduleReconnect() {
    attempts += 1;
    const delay = Math.min(500 * 2 ** Math.min(attempts - 1, 6), MAX_DELAY);
    setStatus("connecting", `reconnecting in ${(delay / 1000).toFixed(1)}s…`);
    reconnectTimer = setTimeout(connect, delay);
}

els.chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = els.chatMessage.value.trim();
    if (!message || !ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: "chat", message }));
    els.chatMessage.value = "";
    els.chatMessage.focus();
});

els.btnPing.addEventListener("click", () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: "ping" }));
});

window.addEventListener("beforeunload", () => ws?.close(1000, "page closed"));

connect();
requestAnimationFrame(drawTrace);