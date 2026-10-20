import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { config } from "../config.js";

const DEFAULT_DB = {
    notes: [],
    visitors: 0,
};

export class JsonRepository {
    constructor(file = config.dataFile) {
        this.file = file;
        this.cache = null;
        this.writeQueue = Promise.resolve();
    }

    async load() {
        if (this.cache) return this.cache;
        try {
            const raw = await fs.readFile(this.file, "utf8");
            this.cache = { ...DEFAULT_DB, ...JSON.parse(raw) };
        } catch (err) {
            if (err.code === "ENOENT") {
                await fs.mkdir(path.dirname(this.file), { recursive: true });
                this.cache = { ...DEFAULT_DB };
                await this.save();
            } else {
                throw err;
            }
        }
        return this.cache;
    }

    save() {
        this.writeQueue = this.writeQueue.then(async () => {
            await fs.writeFile(this.file, JSON.stringify(this.cache, null, 2), "utf8");
        });
        return this.writeQueue;
    }

    nextId() {
        return crypto.randomUUID();
    }
}