const mongoose=require("mongoose");

const noteSetSchema=new mongoose.Schema({
    noteSetTitle:{
        type:String,
        default:"Notes",
        trim:true
    },
    createdAt:{
        type:Date,
        default:new Date(Date.now())
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }   
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

noteSetSchema.virtual("notes",{
    ref:"Note",
    foreignField:"noteSetID",
    localField:"_id"
})


const NoteSet=mongoose.model("NoteSet",noteSetSchema);
module.exports=NoteSet;