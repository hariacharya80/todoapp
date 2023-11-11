import express from "express";
import {
  addTodo,
  getTodoList,
  removeTodo,
  updateTodo,
} from "../controllers/Todo.controller.js";
const todoRouter = express.Router();

todoRouter.post("/get", getTodoList);
todoRouter.post("/", addTodo);
todoRouter.delete("/", removeTodo);
todoRouter.put("/", updateTodo);

export default todoRouter;
