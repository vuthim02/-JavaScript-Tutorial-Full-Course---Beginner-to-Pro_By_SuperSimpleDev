import { test } from "node:test";
import assert from "node:assert/strict";
import { createToken, verifyToken } from "../src/utils/jwt.js";

test("jwt: creates a well-formed HS256 token", () => {
    const token = createToken({ user: "tim" });
    const parts = token.split(".");
    assert.equal(parts.length, 3);
    const header = JSON.parse(Buffer.from(parts[0], "base64url").toString());
    assert.equal(header.alg, "HS256");
    assert.equal(header.typ, "JWT");
});

test("jwt: verify returns the payload with exp bets", () => {
    const token = createToken({ user: "tim" }, 60);
    const payload = verifyToken(token);
    assert.equal(payload.user, "tim");
    assert.ok(typeof payload.iat === "number");
    assert.ok(payload.exp > payload.iat);
});

test("jwt: tampered token is rejected", () => {
    const token = createToken({ user: "tim" });
    const tampered = token.slice(0, -2) + (token.endsWith("aa") ? "bb" : "aa");
    assert.throws(() => verifyToken(tampered), /Invalid signature/);
});

test("jwt: expired token is rejected", () => {
    const expired = createToken({ user: "tim" }, -5);
    assert.throws(() => verifyToken(expired), /Token expired/);
});

test("jwt: malformed tokens are rejected", () => {
    assert.throws(() => verifyToken("not.a.token.with.extras"), /Malformed token/);
    assert.throws(() => verifyToken("garbage"), /Malformed token/);
});