const catchAsync=require("./../utils/catchAsync");
const AppError=require("./../utils/appError");
const NoteSet=require("../models/noteSetModel");
const APIFeatures=require("./../utils/apiFeatures");

exports.getAllNotesSet=catchAsync(async(req,res,next)=>{
    const features=new APIFeatures(NoteSet.find(),req.query).filter(req.user._id).sort().limit().paginate();
    const notesSet=await features.query;
    res.status(200).json({
        stat:"success",
        result:notesSet.length,
        data:{
            notesSet
        }
    })
})

exports.createNoteSet=catchAsync(async(req,res,next)=>{
    const newNotesSet=await NoteSet.create({
        user:req.user._id,
        noteSetTitle:req.body.noteTitle
    });
    res.status(201).json({
        stat:"success",
        data:{
            newNotesSet
        }
    })
})

exports.getNoteSet=catchAsync(async(req,res,next)=>{
    const noteSet=await NoteSet.findById(req.params.id).populate({path:"notes"}).select("-__v");
    if(!noteSet)
        return next(new AppError("No noteset with that id",404));
    res.status(200).json({
        stat:"success",
        data:{
            noteSet
        }
    })
})


exports.updateNoteSet=catchAsync(async(req,res,next)=>{
    const updatedNoteSet=await NoteSet.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    if(!updatedNoteSet)
        return next(new AppError("No noteset with that ID",404));
    res.status(200).json({
        stat:"success",
        data:{
            updatedNoteSet
        }
    })
})

exports.deleteNoteSet=catchAsync(async(req,res,next)=>{
    const noteSet=await NoteSet.findByIdAndDelete(req.params.id);
    if(!noteSet)
        return next(new AppError("No noteset with that ID",404));
    res.status(204).json({
        stat:"success",
        data:null
    })
})