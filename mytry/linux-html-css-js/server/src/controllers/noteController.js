import { noteService } from "../services/noteService.js";
import { wsHub } from "../ws/hub.js";
import { validate, checkId } from "../utils/validators.js";

export async function listNotes(req, res) {
    const notes = await noteService.getAll();
    res.json({ ok: true, count: notes.length, notes });
}

export async function getNote(req, res) {
    checkId(req.params.id);
    res.json({ ok: true, note: await noteService.getById(req.params.id) });
}

export async function createNote(req, res) {
    validate({ title: "title", body: "body" }, req.body);
    const note = await noteService.create({ ...req.body });
    wsHub.broadcast({ type: "note:created", note: { id: note.id, title: note.title } });
    res.status(201).json({ ok: true, note });
}

export async function updateNote(req, res) {
    checkId(req.params.id);
    if (req.body.title !== undefined) validate({ title: "title" }, req.body);
    if (req.body.body !== undefined) validate({ body: "body" }, req.body);
    const note = await noteService.update(req.params.id, { ...req.body });
    wsHub.broadcast({ type: "note:updated", note: { id: note.id, title: note.title } });
    res.json({ ok: true, note });
}

export async function deleteNote(req, res) {
    checkId(req.params.id);
    const removed = await noteService.remove(req.params.id);
    wsHub.broadcast({ type: "note:deleted", id: removed.id, title: removed.title });
    res.json({ ok: true, removed });
}