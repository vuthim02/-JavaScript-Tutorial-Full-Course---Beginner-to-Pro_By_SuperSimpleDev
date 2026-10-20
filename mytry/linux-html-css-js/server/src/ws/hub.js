import { WebSocketServer, WebSocket } from "ws";
import { randomUUID } from "node:crypto";

class WsHub {
    constructor() {
        this.clients = new Map();
        this.startedAt = new Date();
        this.cleaned = new WeakSet();
    }

    attach(server) {
        this.wss = new WebSocketServer({ server, path: "/ws" });
        this.wss.on("connection", (socket, req) => {
            const client = { id: randomUUID(), socket, ip: req.socket.remoteAddress };
            this.clients.set(client.id, client);
            this.sendTo(client, { type: "welcome", id: client.id, total: this.clients.size });
            this.broadcast({ type: "visitor:join", id: client.id, total: this.clients.size });

            socket.on("message", (raw) => this.handleMessage(client, raw));
            socket.on("close", () => this.drop(client));
            socket.on("error", () => this.drop(client));
        });
    }

    drop(client) {
        if (this.cleaned.has(client.socket)) return;
        this.cleaned.add(client.socket);
        this.clients.delete(client.id);
        this.broadcast({ type: "visitor:leave", id: client.id, total: this.clients.size });
    }

    handleMessage(client, raw) {
        let data;
        try {
            data = JSON.parse(raw.toString());
        } catch {
            this.sendTo(client, { type: "error", message: "Invalid JSON payload" });
            return;
        }
        if (data.type === "chat") {
            const message = String(data.message || "").trim().slice(0, 500);
            if (message) {
                this.broadcast({ type: "chat", id: client.id, message, ts: Date.now() });
            }
        } else if (data.type === "ping") {
            this.sendTo(client, { type: "pong", ts: Date.now() });
        }
    }

    sendTo(client, payload) {
        if (client.socket.readyState === WebSocket.OPEN) {
            client.socket.send(JSON.stringify(payload));
        }
    }

    broadcast(payload) {
        const json = JSON.stringify(payload);
        for (const client of this.clients.values()) {
            if (client.socket.readyState === WebSocket.OPEN) {
                client.socket.send(json);
            }
        }
    }

    clientCount() {
        return this.clients.size;
    }
}

export const wsHub = new WsHub();