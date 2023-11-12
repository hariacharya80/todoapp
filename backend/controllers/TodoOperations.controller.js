import todoModel from "../models/todo.model.js";

export const markTodoComplete = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(401).json({ msg: "Unable to update: ID is missing." });
    }
    const updatedTodo = await todoModel.findOneAndUpdate(
      { _id },
      {
        completed: true,
      }
    );
    console.log(updatedTodo);
    if (updatedTodo) {
      return res.status(200).json({ msg: "Todo updated successfully." });
    }
    return res.status(401).json({ msg: "Error updating todo." });
  } catch (e) {
    return res
      .status(500)
      .json({ msg: "An unknown internal server error occoured." });
  }
};

export const markTodoIncomplete = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(401).json({ msg: "Unable to update: ID is missing." });
    }
    const updatedTodo = await todoModel.findOneAndUpdate(
      { _id },
      {
        completed: false,
      }
    );
    console.log(updatedTodo);
    if (updatedTodo) {
      return res.status(200).json({ msg: "Todo updated successfully." });
    }
    return res.status(401).json({ msg: "Error updating todo." });
  } catch (e) {
    return res
      .status(500)
      .json({ msg: "An unknown internal server error occoured." });
  }
};
