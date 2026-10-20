import { api, ApiError } from "../modules/api.js";
import { store } from "../modules/store.js";
import { idb } from "../modules/db.js";
import { formatUptime, escapeHTML, debounce } from "../modules/utils.js";
import { eventBus } from "../modules/events.js";

const els = {
    statusLine: document.getElementById("server-status"),
    statusText: document.getElementById("server-status-text"),
    statusStats: document.getElementById("status-stats"),
    btnStatus: document.getElementById("btn-status"),
    noteForm: document.getElementById("note-form"),
    noteTitle: document.getElementById("note-title"),
    noteBody: document.getElementById("note-body"),
    notesList: document.getElementById("notes-list"),
    jwtUser: document.getElementById("jwt-user"),
    btnToken: document.getElementById("btn-token"),
    btnProtected: document.getElementById("btn-protected"),
    btnNoToken: document.getElementById("btn-no-token"),
    tokenDisplay: document.getElementById("token-display"),
    requestLog: document.getElementById("request-log"),
    btnIdbSave: document.getElementById("btn-idb-save"),
    btnIdbLoad: document.getElementById("btn-idb-load"),
    btnIdbClear: document.getElementById("btn-idb-clear"),
    idbStats: document.getElementById("idb-stats"),
    idbList: document.getElementById("idb-list"),
};

function log(html) {
    const line = document.createElement("div");
    line.innerHTML = html;
    els.requestLog.append(line);
    els.requestLog.scrollTop = els.requestLog.scrollHeight;
}

function setStatus(state, text) {
    els.statusLine.className = `status-line ${state}`;
    els.statusText.textContent = text;
}

function updateStatusStats(data) {
    if (!data?.server) return;
    const stats = [
        [formatUptime(data.server.uptimeSeconds), "uptime"],
        [data.server.node, "node version"],
        [data.live.connectedClients, "live clients"],
        [data.notes.count, `notes stored (${data.notes.totalChars} chars)`],
    ];
    els.statusStats.innerHTML = stats
        .map(
            ([num, label]) =>
                `<div class="stat"><div class="number">${escapeHTML(String(num))}</div><div class="label">${escapeHTML(label)}</div></div>`
        )
        .join("");
}

async function refreshStatus() {
    els.btnStatus.disabled = true;
    setStatus("connecting", "fetching /api/v1/system/status…");
    log('<span class="info">→ GET /api/v1/system/status</span>');
    try {
        const data = await api.get("/api/v1/system/status");
        updateStatusStats(data);
        setStatus("online", `API online · v${data.server.version}`);
        log(`<span class="ok">← 200 OK · uptime ${formatUptime(data.server.uptimeSeconds)}</span>`);
        return true;
    } catch (err) {
        setStatus("offline", offlineMessage(err));
        logError(err);
        return false;
    } finally {
        els.btnStatus.disabled = false;
    }
}

const offlineMessage = (err) =>
    err instanceof ApiError
        ? `API offline (${err.code}). Start the server, see README.`
        : "API unreachable. Start the server, see README.";

function logError(err) {
    log(
        `<span class="err">✕ ${escapeHTML(err.name)} [${escapeHTML(err.code)}] ${escapeHTML(err.message)}</span>`
    );
    if (err.details?.length) {
        log(`<span class="err">  details: ${escapeHTML(JSON.stringify(err.details))}</span>`);
    }
}

async function renderNotes() {
    els.notesList.innerHTML =
        '<p class="status-line connecting"><span class="status-dot"></span> loading notes…</p>';
    log('<span class="info">→ GET /api/v1/notes</span>');
    try {
        const data = await api.get("/api/v1/notes");
        log(`<span class="ok">← 200 OK · ${data.count} note(s)</span>`);
        if (!data.notes.length) {
            els.notesList.innerHTML =
                '<p style="color: var(--color-muted); margin-top: 1rem;">No notes yet — create one above!</p>';
            return;
        }
        els.notesList.innerHTML = data.notes
            .map(
                (n) => `
                <article class="note-item" data-id="${escapeHTML(n.id)}">
                    <div>
                        <strong>${escapeHTML(n.title)}</strong>
                        <div class="note-body">${escapeHTML(n.body)}</div>
                        <div class="note-meta">created ${escapeHTML(new Date(n.createdAt).toLocaleString())}</div>
                    </div>
                    <div class="note-actions">
                        <button type="button" class="lab-btn" data-action="edit">Edit</button>
                        <button type="button" class="lab-btn danger" data-action="delete">Delete</button>
                    </div>
                </article>`
            )
            .join("");
    } catch (err) {
        els.notesList.innerHTML = "";
        logError(err);
    }
}

els.noteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = els.noteTitle.value.trim();
    const body = els.noteBody.value.trim();
    if (!title || !body) return;
    log(`<span class="info">→ POST /api/v1/notes ${escapeHTML(JSON.stringify({ title, body }))}</span>`);
    try {
        const data = await api.post("/api/v1/notes", { title, body });
        log(`<span class="ok">← 201 created “${escapeHTML(data.note.title)}”</span>`);
        eventBus.emit("note:created", data.note);
        els.noteForm.reset();
        await renderNotes();
    } catch (err) {
        logError(err);
    }
});

els.notesList.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const item = btn.closest(".note-item");
    const id = item?.dataset.id;
    if (!id) return;

    if (btn.dataset.action === "delete") {
        log(`<span class="info">→ DELETE /api/v1/notes/${id}</span>`);
        try {
            const data = await api.delete(`/api/v1/notes/${id}`);
            log(`<span class="ok">← 200 removed “${escapeHTML(data.removed.title)}”</span>`);
            await renderNotes();
        } catch (err) {
            logError(err);
        }
    } else if (btn.dataset.action === "edit") {
        editNoteInPlace(id, item);
    }
});

function editNoteInPlace(id, item) {
    const titleEl = item.querySelector("strong");
    const bodyEl = item.querySelector(".note-body");
    const originalTitle = titleEl.textContent;
    const originalBody = bodyEl.textContent;
    item.innerHTML = `
        <div style="flex: 1;">
            <input type="text" class="edit-title" value="${escapeHTML(originalTitle)}" maxlength="120" required />
            <textarea class="edit-body" rows="2" maxlength="5000" required>${escapeHTML(originalBody)}</textarea>
        </div>
        <div class="note-actions">
            <button type="button" class="lab-btn primary" data-action="save">Save (PUT)</button>
            <button type="button" class="lab-btn" data-action="cancel">Cancel</button>
        </div>`;
    item.querySelector(".edit-title").focus();
}

els.notesList.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    if (btn.dataset.action !== "save" && btn.dataset.action !== "cancel") return;
    const item = btn.closest(".note-item");
    const id = item?.dataset.id;
    if (!id) return;

    if (btn.dataset.action === "cancel") {
        await renderNotes();
        return;
    }
    const title = item.querySelector(".edit-title").value.trim();
    const body = item.querySelector(".edit-body").value.trim();
    if (!title || !body) return;
    log(`<span class="info">→ PUT /api/v1/notes/${id}</span>`);
    try {
        const data = await api.put(`/api/v1/notes/${id}`, { title, body });
        log(`<span class="ok">← 200 updated “${escapeHTML(data.note.title)}”</span>`);
        await renderNotes();
    } catch (err) {
        logError(err);
    }
});

let lastToken = store.get("jwt", null);

async function getToken() {
    const user = els.jwtUser.value.trim() || "anonymous";
    log(`<span class="info">→ POST /api/v1/auth/token {"user":"${escapeHTML(user)}"}</span>`);
    try {
        const data = await api.post("/api/v1/auth/token", { user });
        lastToken = data.token;
        store.set("jwt", data.token, 3600 * 1000);
        els.tokenDisplay.hidden = false;
        els.tokenDisplay.textContent = data.token;
        log(`<span class="ok">← 201 token issued (HS256, 1h expiry)</span>`);
        return data.token;
    } catch (err) {
        logError(err);
        return null;
    }
}

els.btnToken.addEventListener("click", getToken);

els.btnProtected.addEventListener("click", async () => {
    if (!lastToken) {
        lastToken = store.get("jwt", null);
    }
    if (!lastToken) {
        log('<span class="warn">! No token yet — click “Get token” first.</span>');
        return;
    }
    log('<span class="info">→ GET /api/v1/auth/protected (w/ Bearer token)</span>');
    try {
        const data = await api.get("/api/v1/auth/protected", {
            headers: { Authorization: `Bearer ${lastToken}` },
        });
        log(`<span class="ok">← 200 hello ${escapeHTML(data.user.user)} · protected route reached.</span>`);
    } catch (err) {
        logError(err);
    }
});

els.btnNoToken.addEventListener("click", async () => {
    log('<span class="info">→ GET /api/v1/auth/protected (no token)</span>');
    try {
        await api.get("/api/v1/auth/protected");
        log('<span class="warn">← unexpected 200 (server should have blocked this!)</span>');
    } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
            log('<span class="ok">← 401 UNAUTHORIZED — correctly blocked. Nice.</span>');
        } else {
            logError(err);
        }
    }
});

const reloadNotesWhenOnline = async () => {
    const up = await refreshStatus();
    if (up) await renderNotes();
};

els.btnStatus.addEventListener("click", refreshStatus);
eventBus.on("visitor:registered", refreshStatus);

eventBus.on("note:updated:anywhere", ({ ok }) => {
    if (ok) renderNotes();
});

async function renderIdbStats() {
    if (!idb.supported()) {
        els.idbStats.innerHTML =
            '<div class="stat"><div class="number">✕</div><div class="label">unsupported</div></div>';
        return;
    }
    try {
        const rows = await idb.getAll();
        els.idbStats.innerHTML =
            `<div class="stat"><div class="number">${rows.length}</div><div class="label">cached notes</div></div>`;
        return rows;
    } catch (err) {
        els.idbStats.innerHTML =
            '<div class="stat"><div class="number">!</div><div class="label">db error</div></div>';
        return [];
    }
}

els.btnIdbSave.addEventListener("click", async () => {
    log('<span class="info">→ GET /api/v1/notes (to cache in IndexedDB)</span>');
    try {
        const data = await api.get("/api/v1/notes");
        const rows = await idb.putAll(data.notes);
        log(`<span class="ok">← cached ${data.notes.length} note(s) into IndexedDB (async, promise-wrapped)</span>`);
        await renderIdbStats();
    } catch (err) {
        logError(err);
    }
});

els.btnIdbLoad.addEventListener("click", async () => {
    log('<span class="info">→ IndexedDB getAll("notes") — no network needed</span>');
    const rows = await renderIdbStats();
    if (!rows.length) {
        els.idbList.innerHTML = '<p style="color: var(--color-muted); margin-top: 1rem;">Cache is empty — save notes first.</p>';
        log('<span class="ok">← 0 cached rows</span>');
        return;
    }
    els.idbList.innerHTML = rows
        .map(
            (n) => `
            <div class="note-item">
                <div>
                    <strong>${escapeHTML(n.title)}</strong>
                    <div class="note-body">${escapeHTML(n.body)}</div>
                    <div class="note-meta">offline copy · saved ${escapeHTML(new Date(n.cachedAt ?? n.createdAt).toLocaleString())}</div>
                </div>
            </div>`
        )
        .join("");
    log(`<span class="ok">← read ${rows.length} note(s) straight from the browser database</span>`);
});

els.btnIdbClear.addEventListener("click", async () => {
    await idb.removeAll();
    els.idbList.innerHTML = "";
    log('<span class="warn">! IndexedDB "notes" store cleared</span>');
    await renderIdbStats();
});

reloadNotesWhenOnline();