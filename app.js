import cookieParser from "cookie-parser";
import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {config} from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();
config({
    path: "./data/config.env",
  });


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URI],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use("/users",userRouter); 
app.use("/task",taskRouter);


app.get("/",(req,res)=>{
    res.send("Nice");
})

app.use(errorMiddleware); 