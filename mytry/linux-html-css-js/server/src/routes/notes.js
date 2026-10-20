import { Router } from "express";
import * as notes from "../controllers/noteController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const notesRouter = Router();

notesRouter.get("/", asyncHandler(notes.listNotes));
notesRouter.get("/:id", asyncHandler(notes.getNote));
notesRouter.post("/", asyncHandler(notes.createNote));
notesRouter.put("/:id", asyncHandler(notes.updateNote));
notesRouter.delete("/:id", asyncHandler(notes.deleteNote));