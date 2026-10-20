import { test } from "node:test";
import assert from "node:assert/strict";
import { validate, checkId } from "../src/utils/validators.js";
import { AppError } from "../src/utils/AppError.js";

test("validate: accepts a valid note payload", () => {
    assert.equal(validate({ title: "title", body: "body" }, { title: "Great day", body: "linux is fun" }), true);
});

test("validate: rejects short title and body", () => {
    assert.throws(
        () => validate({ title: "title", body: "body" }, { title: "x", body: "y" }),
        (err) => err instanceof AppError && err.statusCode === 400 && err.details.length === 2
    );
});

test("validate: rejects non-string values", () => {
    assert.throws(
        () => validate({ title: "title" }, { title: 42 }),
        (err) => err instanceof AppError && err.statusCode === 400
    );
});

test("validate: user rule for auth tokens", () => {
    assert.equal(validate({ user: "user" }, { user: "tim" }), true);
    assert.throws(() => validate({ user: "user" }, { user: "t" }));
});

test("checkId: accepts UUIDs, rejects anything else", () => {
    checkId("123e4567-e89b-12d3-a456-426614174000");
    assert.throws(() => checkId("nope"));
    assert.throws(() => checkId(undefined));
    assert.throws(() => checkId("123e4567-e89b-12d3-a456-426614174000-extra"));
});