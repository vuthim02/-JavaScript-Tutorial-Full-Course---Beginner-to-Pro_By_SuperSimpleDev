import crypto from "node:crypto";
import { config } from "../config.js";

const toB64Url = (buf) =>
    Buffer.from(buf).toString("base64url");

const b64urlToBuf = (str) =>
    Buffer.from(str, "base64url");

const encodePart = (obj) => toB64Url(JSON.stringify(obj));

function sign(input) {
    return crypto.createHmac("sha256", config.jwtSecret).update(input).digest("base64url");
}

export function createToken(payload, expiresInSec = 3600) {
    const header = { alg: "HS256", typ: "JWT" };
    const now = Math.floor(Date.now() / 1000);
    const body = { ...payload, iat: now, exp: now + expiresInSec };
    const headPart = encodePart(header);
    const bodyPart = encodePart(body);
    const signature = sign(`${headPart}.${bodyPart}`);
    return `${headPart}.${bodyPart}.${signature}`;
}

export function verifyToken(token) {
    if (typeof token !== "string" || !token.includes(".")) {
        throw new Error("Malformed token");
    }
    const [head, body, sig, ...rest] = token.split(".");
    if (rest.length > 0) throw new Error("Malformed token");
    const expected = sign(`${head}.${body}`);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
        throw new Error("Invalid signature");
    }
    const payload = JSON.parse(b64urlToBuf(body).toString("utf8"));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        throw new Error("Token expired");
    }
    return payload;
}