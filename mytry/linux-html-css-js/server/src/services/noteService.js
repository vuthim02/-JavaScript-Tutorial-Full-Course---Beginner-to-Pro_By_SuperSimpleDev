import { AppError } from "../utils/AppError.js";
import { noteRepository } from "../repositories/noteRepository.js";

class NoteService {
    constructor(repo = noteRepository) {
        this.repo = repo;
    }

    async getAll() {
        return this.repo.findAll();
    }

    async getById(id) {
        const note = await this.repo.findById(id);
        if (!note) throw AppError.notFound(`Note ${id} not found`);
        return note;
    }

    async create(input) {
        const title = input.title.trim();
        const body = input.body.trim();
        return this.repo.create({ title, body });
    }

    async update(id, input) {
        const existing = await this.repo.findById(id);
        if (!existing) throw AppError.notFound(`Note ${id} not found`);
        const patch = {};
        if (input.title !== undefined) patch.title = input.title.trim();
        if (input.body !== undefined) patch.body = input.body.trim();
        return this.repo.update(id, patch);
    }

    async remove(id) {
        const removed = await this.repo.remove(id);
        if (!removed) throw AppError.notFound(`Note ${id} not found`);
        return removed;
    }

    async stats() {
        const all = await this.repo.findAll();
        return {
            count: all.length,
            totalChars: all.reduce((sum, n) => sum + n.title.length + n.body.length, 0),
            averageTitle: all.length
                ? Math.round(all.reduce((s, n) => s + n.title.length, 0) / all.length)
                : 0,
        };
    }

    async registerVisitor() {
        return this.repo.bumpVisitors();
    }

    async visitorCount() {
        const db = await this.repo.load();
        return db.visitors;
    }
}

export const noteService = new NoteService();
export { NoteService };