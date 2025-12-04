const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
	noteName: {
		type: String,
		trim: true,
		minlength: [1, "Enter the task name"],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false,
	},
	noteSetID: {
		type: mongoose.Schema.ObjectId,
		ref: "NoteSet",
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		select: false,
	},
	striked: {
		type: Boolean,
		default: false,
	},
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
