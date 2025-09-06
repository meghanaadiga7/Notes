const express=require("express");
const noteController=require("../controllers/notesListController")
const authController=require("./../controllers/authController");

const router=express.Router({mergeParams:true});

router.use(authController.protect);

router.route("/").get(noteController.getAllNote).post(noteController.createNote);
router.route("/:id").get(noteController.getNote).patch(noteController.updateNote).delete(noteController.deleteNote);

module.exports=router;