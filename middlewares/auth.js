import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const isAutenticated = async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token)
    {
        res.status(404).json({message:"Not Logged in"});
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
     req.user = await User.findById(decoded._id);
     next();
}