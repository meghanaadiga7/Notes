const catchAsync=require("./../utils/catchAsync");
const AppError=require("./../utils/appError");
const Note=require("./../models/noteModel");
const APIFeatures=require("./../utils/apiFeatures");

exports.getAllNote=catchAsync(async(req,res,next)=>{
    if(!req.params.noteSetID)
        return next(new AppError("Your lists should belong to a note set. So please providea note set ID",404));
    const features=new APIFeatures(Note.find(),req.query).filterNotes(req.params.noteSetID).sort().limit().paginate();
    const notes=await features.query;
    res.status(200).json({
        stat:"success",
        results:notes.length,
        data:{
            notes
        }
    })
})

exports.getNote=catchAsync(async(req,res,next)=>{
    const note=await Note.findById(req.params.id);
    if(!note)
        return next(new AppError("No note with that ID",404));
    res.status(200).json({
        stat:"success",
        data:{
            note
        }
    })
})

exports.createNote=catchAsync(async(req,res,next)=>{
    const note=await Note.create({
        noteName:req.body.noteName,
        userID:req.user._id,
        noteSetID:req.params.noteSetID
    });
    res.status(200).json({
        stat:"success",
        data:{
            note
        }
    })
})

exports.updateNote=catchAsync(async(req,res,next)=>{
    const updatedNote=await Note.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
});
    if(!updatedNote)
        return next(new AppError("No note with that ID",404));
    res.status(200).json({
        stat:"success",
        data:{
            note:updatedNote
        }
    })
})

exports.deleteNote=catchAsync(async(req,res,next)=>{
    const note=await Note.findByIdAndDelete(req.params.id);
    if(!note)
        return next(new AppError("No note with that ID",404));
    res.status(204).json({
        stat:"success",
        data:null
    })
})