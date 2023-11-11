import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: String,
  },
});

export default mongoose.model("Todo", todoSchema, "Todo_List");
