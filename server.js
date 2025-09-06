const dotenv=require("dotenv");
const mongoose=require("mongoose");
const app=require("./app");

process.on("uncaughtExpression",err=>{
    console.log("Uncaught Expression. Shutting down...");
    console.log(err.name,err.message);
    process.exit(1);
})

dotenv.config({path:"./config.env"});

const port=process.env.PORT||8087;

const DB=process.env.DB;
mongoose.connect(DB).then(console.log("Connected to DB"));

const server=app.listen(port,()=>{
    console.log("Listening on port "+port);
})

process.on("unhandledRejection",err=>{
    console.log("Unhandled Rejection.Shutting down...");
    console.log(err.name,err.message);
    server.close(()=>{
        process.exit(1);
    })
})