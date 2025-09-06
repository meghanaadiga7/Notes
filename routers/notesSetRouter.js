const express=require("express");
const notesSetController=require("../controllers/notesSetController");
const authController=require("./../controllers/authController");
const notesRouter=require("./notesListRouter");

const router=express.Router();

router.use(authController.protect);

router.use("/:noteSetID/notesList",notesRouter);

router.route("/").get(notesSetController.getAllNotesSet).post(notesSetController.createNoteSet);
router.route("/:id").get(notesSetController.getNoteSet).patch(notesSetController.updateNoteSet).delete(notesSetController.deleteNoteSet);

module.exports=router;

