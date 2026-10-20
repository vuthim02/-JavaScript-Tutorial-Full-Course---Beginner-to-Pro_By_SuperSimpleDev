import { config } from "../config.js";
import { noteService } from "../services/noteService.js";
import { wsHub } from "../ws/hub.js";

const startedAt = new Date();

export async function getStatus(req, res) {
    const [count, visitors, stats] = await Promise.all([
        wsHub.clientCount(),
        noteService.visitorCount(),
        noteService.stats(),
    ]);

    res.json({
        ok: true,
        server: {
            name: "linux-lib API",
            version: "1.0.0",
            uptimeSeconds: Math.floor((Date.now() - startedAt.getTime()) / 1000),
            startedAt: startedAt.toISOString(),
            node: process.version,
            platform: process.platform,
        },
        live: { connectedClients: count },
        notes: stats,
        visitors,
        now: new Date().toISOString(),
    });
}

export async function joinVisitor(req, res) {
    const visitors = await noteService.registerVisitor();
    wsHub.broadcast({ type: "visitor:join", total: visitors });
    res.status(201).json({ ok: true, visitors });
}

export async function getVisitors(req, res) {
    res.json({ ok: true, visitors: await noteService.visitorCount() });
}