import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { NoteRepository } from "../src/repositories/noteRepository.js";
import { NoteService } from "../src/services/noteService.js";
import { AppError } from "../src/utils/AppError.js";

const makeService = async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "linuxlib-svc-"));
    const repo = new NoteRepository(path.join(dir, "db.json"));
    const service = new NoteService(repo);
    return { dir, service };
};

test("service: create then stats reflects the note", async () => {
    const { dir, service } = await makeService();
    const note = await service.create({ title: "Linux lessons", body: "typed arrays!" });
    const stats = await service.stats();
    assert.equal(stats.count, 1);
    assert.equal(stats.averageTitle, "Linux lessons".length);
    assert.equal(note.title, "Linux lessons");
    await fs.rm(dir, { recursive: true, force: true });
});

test("service: getById throws 404 for missing notes", async () => {
    const { dir, service } = await makeService();
    await assert.rejects(
        () => service.getById("missing"),
        (err) => err instanceof AppError && err.statusCode === 404
    );
    await fs.rm(dir, { recursive: true, force: true });
});

test("service: update only patches provided fields", async () => {
    const { dir, service } = await makeService();
    const a = await service.create({ title: "hello", body: "world" });
    const updated = await service.update(a.id, { title: "  hi  " });
    assert.equal(updated.title, "hi");
    assert.equal(updated.body, "world");
    await fs.rm(dir, { recursive: true, force: true });
});

test("service: remove returns the note, second time 404s", async () => {
    const { dir, service } = await makeService();
    const a = await service.create({ title: "temp", body: "note" });
    const removed = await service.remove(a.id);
    assert.equal(removed.title, "temp");
    await assert.rejects(() => service.remove(a.id), /not found/);
    await fs.rm(dir, { recursive: true, force: true });
});

test("service: registers visitors through the repo", async () => {
    const { dir, service } = await makeService();
    assert.equal(await service.registerVisitor(), 1);
    assert.equal(await service.registerVisitor(), 2);
    assert.equal(await service.visitorCount(), 2);
    await fs.rm(dir, { recursive: true, force: true });
});