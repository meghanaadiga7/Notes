const AppError = require("../utils/appError")

const sendErrorDev=(err,res)=>{
    res.status(err.statusCode).json({
        stat:err.status,
        message:err.message,
        stack:err.stack,
        error:err
    })
}

const sendErrorProd=(err,res)=>{
    if(err.isOperational){
        res.status(err.statusCode).json({
            stat:err.status,
            message:err.message
        })
    }else{
        res.status(err.statusCode).json({
            stat:err.status,
            message:"Something went wrong"
        })
    }
}

const handleDuplicateKeys=(error)=>{
    const message=`Duplicate Keys:${error}`;
    return new AppError("An user already exists with this email. Log in or enter new email",400);
}

const handleValidationError=(error)=>{
    return new AppError(error.message,400)
}

const handleCastError=(error)=>{
    const message=`Invalid ${error.path}:${error.value}`;
    return new AppError(message,400)
}

const handleJwtError=()=>{
    return new AppError("JWT is invalid.Please login again",401);
}

const handleJWTExpired=()=>{
    return new AppError("JWT is expired. Please login again",401);
}

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.status=err.status || "error";
    if(process.env.NODE_ENV=="development")
        sendErrorDev(err,res);
    else if(process.env.NODE_ENV.trim()=="production"){
        let error={...err};
        console.log(err);
        if(error.code==11000)
            error=handleDuplicateKeys(err);
        if(err.name=="ValidationError")
            error=handleValidationError(err);
        if(err.name=="CastError")
            error=handleCastError(err);
        if(err.name=="JsonWebTokenError")
            error=handleJwtError();
        if(err.name=="TokenExpiredError")
            error=handleJWTExpired();
        sendErrorProd(error,res)
    }
}