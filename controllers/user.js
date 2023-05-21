import {User} from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {sendCookie} from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";



export const login = async (req,res,next)=>{

    try {
        const {email,password} = req.body;
        let user = await User.findOne({ email }).select("+password");
        if(!user)
        {
            
            next(new ErrorHandler("Invalid Email or Password",404))
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            next(new ErrorHandler("Invalid Email or Password",404))
        }
        sendCookie(user,res,200,`Welcome ${user.name}`);
    } catch (error) {
        next(error);
    }
    
};

export const register = async (req,res,next)=>{

    try {
        const {name,email,password}  = req.body;
        let user = await User.findOne({ email });
        if(user)
        {
            next(new ErrorHandler("ALready a User",400))
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password:hashedPassword });

        sendCookie(user,res,201,"User Registered successfully")
    } catch (error) {
        next(error);
    }
    

};
export const logout = (req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==='Development'?'lax':"none",//https://web.dev/samesite-cookies-explained/
        secure:process.env.NODE_ENV==='Development'?false:true
    }).json({
        success:true,
        message:"Logged Out"
    })
}
export const getMyProfile = (req,res)=>{

    res.status(200).json({
        success:true,
        user:req.user
    })
};