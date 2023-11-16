import todoModel from "../models/todo.model.js";

export async function getTodoList(req, res) {
  try {
    const { email } = req.body;
    const todoList = await todoModel.find({ user: email });
    return res.status(200).json({ list: todoList });
  } catch (err) {
    return res.status(500).json({ msg: "An unexpected error occurred." });
  }
}

export async function addTodo(req, res) {
  const { email, name } = req.body;
  const newTodo = await todoModel.create({ user: email, name: name });
  await newTodo.save();
  return res.status(200).json({ msg: "Todo added successfully." });
}

export async function removeTodo(req, res) {
  const { _id } = req.body;
  const removedTodo = await todoModel.findOneAndDelete({ _id: _id });
  if (!removedTodo) {
    return res.status(401).json({ msg: "The todo was not found." });
  }
  return res.status(200).json({ msg: "Todo deleted successfully." });
}
export async function updateTodo(req, res) {
  try {
    const { _id, name } = req.body;
    const updatedTodo = await todoModel.findOneAndUpdate(
      { _id },
      {
        name: name,
      }
    );
    if (!updatedTodo) {
      return res
        .status(401)
        .json({ msg: "The todo was not updated successfully." });
    }
    return res.status(200).json({ msg: "Todo updated successfully." });
  } catch (e) {
    return res.status(500).json({ msg: "An error occurred while updating." });
  }
}
