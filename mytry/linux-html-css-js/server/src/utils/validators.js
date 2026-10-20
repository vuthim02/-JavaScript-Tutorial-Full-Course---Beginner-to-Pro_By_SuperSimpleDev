import { AppError } from "./AppError.js";

const rules = {
    title: (v) => typeof v === "string" && v.trim().length >= 3 && v.trim().length <= 120,
    body: (v) => typeof v === "string" && v.trim().length >= 3 && v.trim().length <= 5000,
    user: (v) => typeof v === "string" && v.trim().length >= 2 && v.trim().length <= 64,
    message: (v) => typeof v === "string" && v.trim().length >= 1 && v.trim().length <= 500,
};

export function validate(schema, data) {
    const errors = [];
    for (const [field, rule] of Object.entries(schema)) {
        if (rules[rule] && !rules[rule](data?.[field])) {
            errors.push({ field, rule });
        }
    }
    if (errors.length) {
        throw AppError.badRequest("Validation failed", errors);
    }
    return true;
}

export function checkId(id) {
    if (!/^[a-f0-9-]{36}$/i.test(String(id))) {
        throw AppError.badRequest("Invalid id format");
    }
}