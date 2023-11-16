import express from "express";
import { addNewNotes, getAllNotes } from "../controllers/Notes.controller.js";
const NotesRouter = express.Router();

NotesRouter.get("/", getAllNotes);
NotesRouter.post("/", addNewNotes);

export default NotesRouter;
