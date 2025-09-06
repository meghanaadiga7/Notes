const express=require("express");
const globalErrorHandler=require("./controllers/errController");
const AppError=require("./utils/appError");
const userRouter=require("./routers/userRouter");
const notesSetRouter=require("./routers/notesSetRouter")
const notesListRouter=require("./routers/notesListRouter");
const rateLimit=require("express-rate-limit");
const helmet=require("helmet");
const mongoSanitize=require("express-mongo-sanitize");
const xss=require("xss-clean")

const app=express();

//Rate limiting
const limiter=rateLimit({
    max:100,
    windowMs:60*60*1000,
    message:"Too many requests from same IP.Please try in an hour"
})

app.use("/api",limiter);

//helmet
app.use(helmet());

//body-parser
app.use(express.json());

//Sanitization
//app.use(mongoSanitize());
//app.use(xss());

//Routes
app.use("/api/v1/notes/users",userRouter);
app.use("/api/v1/notes/notesSet",notesSetRouter);
app.use("/api/v1/notes/notesList",notesListRouter);
app.all("/{*any}",(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`,400));
})

//Global Error Handler
app.use(globalErrorHandler);

module.exports=app;