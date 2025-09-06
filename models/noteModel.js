const mongoose=require("mongoose");

const noteSchema=new mongoose.Schema({
    noteName:{
        type:String,
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    noteSetID:{
        type:mongoose.Schema.ObjectId,
        ref:"NoteSet",
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        select:false
    }
})

const Note=mongoose.model("Note",noteSchema);
module.exports=Note;