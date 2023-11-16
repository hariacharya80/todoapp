import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
});

export default mongoose.model("Notes", notesSchema, "Notes");
