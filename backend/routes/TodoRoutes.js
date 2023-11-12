import express from "express";
import {
  addTodo,
  getTodoList,
  removeTodo,
  updateTodo,
} from "../controllers/Todo.controller.js";
import {
  markTodoComplete,
  markTodoIncomplete,
} from "../controllers/TodoOperations.controller.js";
const todoRouter = express.Router();

todoRouter.post("/get", getTodoList);
todoRouter.post("/", addTodo);
todoRouter.delete("/", removeTodo);
todoRouter.put("/", updateTodo);
todoRouter.post("/complete", markTodoComplete);
todoRouter.post("/incomplete", markTodoIncomplete);

export default todoRouter;
