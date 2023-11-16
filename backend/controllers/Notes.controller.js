import notesModel from "../models/notes.model.js";

const getAllNotes = async (req, res) => {
  try {
    const notes = await notesModel.find({});
    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({ msg: "An unknown error occoured." });
  }
};

const addNewNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title) {
      return res.status(401).json({ msg: "Note title is required." });
    }
    if (!content) {
      return res.status(401).json({ msg: "Content is required." });
    }
    const newNote = await notesModel.create({
      title,
      content,
    });
    await newNote.save();
    return res.status(200).json({ msg: "New note added successfully." });
  } catch (err) {}
};

export { getAllNotes, addNewNotes };
