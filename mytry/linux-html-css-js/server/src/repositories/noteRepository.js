import { JsonRepository } from "./baseRepository.js";

export class NoteRepository extends JsonRepository {
    async findById(id) {
        const db = await this.load();
        return db.notes.find((n) => n.id === id) || null;
    }

    async findAll() {
        const db = await this.load();
        return [...db.notes].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    }

    async create(data) {
        const db = await this.load();
        const now = new Date().toISOString();
        const note = { id: this.nextId(), createdAt: now, updatedAt: now, ...data };
        db.notes.push(note);
        await this.save();
        return note;
    }

    async update(id, data) {
        const db = await this.load();
        const note = db.notes.find((n) => n.id === id);
        if (!note) return null;
        Object.assign(note, data, { updatedAt: new Date().toISOString() });
        await this.save();
        return note;
    }

    async remove(id) {
        const db = await this.load();
        const idx = db.notes.findIndex((n) => n.id === id);
        if (idx === -1) return false;
        const [removed] = db.notes.splice(idx, 1);
        await this.save();
        return removed;
    }

    async bumpVisitors() {
        const db = await this.load();
        db.visitors += 1;
        await this.save();
        return db.visitors;
    }
}

export const noteRepository = new NoteRepository();