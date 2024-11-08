import Note from "../models/Note.js";
import middleware from "../middleware/middle.js";
import express from 'express';

const router = express.Router(); 

// Create Note
router.post('/add', middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!description) {
      return res.status(400).json({ success: false, msg: "Description is required" });
    }

    const newNote = new Note({
      title, 
      description, 
      userId: req.user.id
    });

    await newNote.save();
    return res.status(200).json({ success: true, msg: "Note created successfully" });
  } catch (error) {
    console.log("Error in note creation:", error);
    res.status(500).json({ success: false, msg: "Error in note creation process" });
  }
});

// Fetch Notes
router.get('/', middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error fetching notes" });
  }
});

// Update Note
router.put('/:id', middleware, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ success: true, updatedNote });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error updating note" });
  }
});

// Delete Note
router.delete("/:id", middleware, async (req, res) => {
  try { 
    const id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(id);
    return res.status(200).json({ success: true, deletedNote });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error deleting note" });
  }
});

export default router;
