const User=require("./../models/userModel");
const AppError=require("./../utils/appError");
const catchAsync=require("./../utils/catchAsync");

exports.setUserID=catchAsync(async(req,res,next)=>{
    req.params.id=req.user._id;
    next();
})

exports.getAllUsers=catchAsync(async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        stat:"success",
        results:users.length,
        data:{
            users
        }
    });
})


exports.getUser=catchAsync(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user)
        return next(new AppError("No user exists with that ID",400));
    res.status(200).json({
        stat:"success",
        data:{
            user
        }
    })
})


exports.createUser=catchAsync(async(req,res,next)=>{
    res.status(500).json({
        stat:"success",
        message:"This route isn't believed"
    })
})


exports.updateUser=catchAsync(async(req,res,next)=>{
    const updatedUser=await User.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        stat:"success",
        data:{
            updatedUser
        }
    })
})


exports.deleteUser=catchAsync(async(req,res,next)=>{
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
        stat:"success",
        data:null
    })
})