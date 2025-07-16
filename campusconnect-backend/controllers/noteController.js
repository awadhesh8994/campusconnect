// backend/controllers/noteController.js
import Note from "../models/Note.js";
import path from "path";
import fs from "fs";

// Upload a note
export const uploadNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!fileUrl) return res.status(400).json({ message: "File is required" });

    const note = new Note({
      title,
      description,
      fileUrl,
      uploadedBy: req.user.id,
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("uploadedBy", "name email");
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a note by ID
export const deleteNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (
      note.uploadedBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const filePath = path.join("uploads", path.basename(note.fileUrl));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await note.remove();
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get notes uploaded by a specific user
export const getNotesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notes = await Note.find({ uploadedBy: userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
