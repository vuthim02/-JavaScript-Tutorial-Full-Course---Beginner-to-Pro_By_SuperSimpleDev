import { Router } from "express";
import * as system from "../controllers/systemController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const systemRouter = Router();

systemRouter.get("/status", asyncHandler(system.getStatus));
systemRouter.get("/visitors", asyncHandler(system.getVisitors));
systemRouter.post("/visitors/join", asyncHandler(system.joinVisitor));