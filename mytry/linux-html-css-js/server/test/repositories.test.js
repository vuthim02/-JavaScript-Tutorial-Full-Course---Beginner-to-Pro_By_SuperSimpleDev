import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { NoteRepository } from "../src/repositories/noteRepository.js";

const makeTempRepo = async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "linuxlib-test-"));
    const file = path.join(dir, "db.json");
    const repo = new NoteRepository(file);
    return { dir, repo };
};

test("repository: creates and reads back a note", async () => {
    const { dir, repo } = await makeTempRepo();
    const created = await repo.create({ title: "Hello", body: "world!" });
    assert.equal(created.title, "Hello");
    assert.ok(created.id);
    assert.equal((await repo.findById(created.id)).body, "world!");
    assert.equal(await repo.findById("missing"), null);
    await fs.rm(dir, { recursive: true, force: true });
});

test("repository: findAll sorts by newest first", async () => {
    const { dir, repo } = await makeTempRepo();
    const a = await repo.create({ title: "first", body: "aaa" });
    const b = await repo.create({ title: "second", body: "bbb" });
    const all = await repo.findAll();
    assert.deepEqual([all[0].id, all[1].id], [b.id, a.id]);
    await fs.rm(dir, { recursive: true, force: true });
});

test("repository: update patches fields and bumps updatedAt", async () => {
    const { dir, repo } = await makeTempRepo();
    const a = await repo.create({ title: "old", body: "text" });
    const updated = await repo.update(a.id, { title: "new" });
    assert.equal(updated.title, "new");
    assert.equal(updated.body, "text");
    assert.ok(new Date(updated.updatedAt) >= new Date(a.updatedAt));
    assert.equal(await repo.update("missing", { title: "x" }), null);
    await fs.rm(dir, { recursive: true, force: true });
});

test("repository: remove returns the note or false", async () => {
    const { dir, repo } = await makeTempRepo();
    const a = await repo.create({ title: "bye", body: "!!!" });
    const removed = await repo.remove(a.id);
    assert.equal(removed.title, "bye");
    assert.equal(await repo.findById(a.id), null);
    assert.equal(await repo.remove(a.id), false);
    await fs.rm(dir, { recursive: true, force: true });
});

test("repository: bumpVisitors increments the counter", async () => {
    const { dir, repo } = await makeTempRepo();
    assert.equal(await repo.bumpVisitors(), 1);
    assert.equal(await repo.bumpVisitors(), 2);
    await fs.rm(dir, { recursive: true, force: true });
});