const jwt=require("jsonwebtoken");
const AppError=require("./../utils/appError");
const catchAsync=require("./../utils/catchAsync");
const User=require("./../models/userModel");
const {promisify}=require("util");
const sendEmail=require("./../utils/sendEmail");
const crypto=require("crypto");

const createJWT=(id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
}

exports.signup=catchAsync(async(req,res,next)=>{
    const newUser=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm
    })
    const token=createJWT(newUser._id);
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRY*24*60*60*1000),
        //secure:true,
        httpOnly:true
    });
    res.status(201).json({
        stat:"success",
        token,
        data:{
            user:newUser
        }
    })
})

exports.login=catchAsync(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password)
        return next(new AppError("Please enter email and password",401));
    const user=await User.findOne({email:email}).select("+password");
    const correctPassword=await user?.checkCorrectPassword(password,user.password);
    if(!user || !correctPassword)
        return next(new AppError("Incorrect email or password",401));
    const token=createJWT(user._id);
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRY*24*60*60*1000), 
        //secure:true,
        httpOnly:true
    });
    res.status(200).json({
        stat:"success",
        token
    })
})

exports.protect=catchAsync(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        token=req.headers.authorization.split(" ")[1];
    if(!token)
        return next(new AppError("You are not logged in. Please log in",401));
    const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    const user=await User.findById(decoded.id);
    if(!user)
        return next(new AppError("User was recently deleted.Please signup again",401));
    if(user.changedPasswordAfter(decoded.iat))
        return next(new AppError("User recently changed his password.Please login again",401));
    req.user=user;
    next();
})

exports.restrictTo=(role)=>{
    return function(req,res,next){
        if(req.user.role != role)
            return next(new AppError("You are not allowed to perform this action!",403));
        next();
    }
}

exports.forgotPassword=catchAsync(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user)
        return next(new AppError("No user found with that email ID",401));
    const resetToken=user.createResetToken();
    await user.save({validateBeforeSave:false});
    const resetURL=`${req.protocol}://${req.get("host")}/api/v1/notes/users/resetPassword/${resetToken}`
    const text=`Enter your new password by clicking on this link ${resetURL}.Please ignore the message if you haven't forgotten the password`;
    try{
        await sendEmail({
            email:user.email,
            subject:"Reset to your new password. Token valid for only 10 mins",
            text:text
        })
    }catch(err){
        user.passwordResetToken=undefined;
        user.passwordResetTokenExpiry=undefined;
        await user.save({validateBeforeSave:false});
        return next(new AppError("There was an error sending the email.Try again later",500));
    }
    res.status(200).json({
        stat:"success",
        message:"Token sent to email"
    })
})

exports.resetPassword=catchAsync(async(req,res,next)=>{
    const resetToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user=await User.findOne({passwordResetToken:resetToken,passwordResetTokenExpiry:{$gte:Date.now()}});
    if(!user)
        return next(new AppError("Invalid token or token has expired",401));
    user.password=req.body.password;
    user.passwordConfirm=req.body.passwordConfirm;
    user.passwordResetToken=undefined;
    user.passwordResetTokenExpiry=undefined;
    await user.save();
    const token=createJWT(user._id);
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRY*24*60*60*1000),
        //secure:true,
        httpOnly:true
    });
    res.status(200).json({
        stat:"success",
        token
    })
})

exports.updateMyPassword=catchAsync(async(req,res,next)=>{
    const user=await User.findOne({email:req.user.email}).select("+password");
    const isPasswordCorrect=await user.checkCorrectPassword(req.body.password,user.password);
    if(!isPasswordCorrect)
        return next(new AppError("Your password is incorrect"),401);
    user.password=req.body.newPassword;
    user.passwordConfirm=req.body.newPasswordConfirm;
    await user.save();
    const token=createJWT(user._id);
    res.status(200).json({
        stat:"success",
        token,
        message:"Password changed successfully"
    })
})

exports.updateDetails=catchAsync(async(req,res,next)=>{
    if(req.body.password || req.body.passwordConfirm)
        return next(new AppError("You can't change password here",403));
   const updatedUser=await User.findByIdAndUpdate(req.user._id,req.body,{
    new:true,
    runValidators:true
   });
   res.status(200).json({
    stat:"success",
    data:{
        user:updatedUser
    }
   })
})

exports.deleteMe=catchAsync(async(req,res,next)=>{
    await User.findByIdAndDelete(req.user._id);
    res.status(204).json({
        stat:"success",
        data:null
    })
})