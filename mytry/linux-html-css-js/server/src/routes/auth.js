import { Router } from "express";
import * as auth from "../controllers/authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";

export const authRouter = Router();

authRouter.post("/token", asyncHandler(auth.issueToken));
authRouter.get("/protected", requireAuth, asyncHandler(auth.protectedInfo));