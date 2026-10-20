import { createToken } from "../utils/jwt.js";
import { validate } from "../utils/validators.js";

export function issueToken(req, res) {
    validate({ user: "user" }, req.body);
    const user = req.body.user.trim();
    const token = createToken({ user }, 3600);
    res.status(201).json({
        ok: true,
        token,
        expiresIn: 3600,
        decodedHint: { user },
    });
}

export function protectedInfo(req, res) {
    res.json({
        ok: true,
        msg: "You reached a protected endpoint with a valid JWT.",
        user: req.user,
        serverTime: new Date().toISOString(),
    });
}
