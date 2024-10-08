import { User } from "../models/user.js";
import bcrypt from "bcrypt" 
import jwt from "jsonwebtoken"
import { sendCookie } from "../utils/features.js";
import cookieParser from "cookie-parser";
import ErrorHandler from "../middlewares/error.js";

export const login = async(req,res,next)=>{
      try {
        const {email,password}=req.body;
      const user = await User.findOne({email}).select("+password");
      
      if(!user) return next(new ErrorHandler("Invalid email or password",400))
      const isMatch=await bcrypt.compare(password,user.password);

      if(!isMatch) return next(new ErrorHandler("Invalid email or password",400))

      sendCookie(user,res,`Welcome back, ${user.name}`,200)
      } catch (error) {
        next(error);
      }

}

export const getAllUsers=async(req,res)=>{
}

export const getMyDetail= (req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user,
    })
}




export const newUser=async (req,res)=>{
    try {
        const {name,email,password} = req.body;

    let user=await User.findOne({email});

    if(user) return next(new ErrorHandler("User Already Exists",400))
    const hashedPass=await bcrypt.hash(password,10);
    user=await User.create({name,email,password:hashedPass});

    sendCookie(user,res,"Registered  Successfully",201);
    } catch (error) {
        next(error);
    }
}

export const logout=(req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:"none",
        secure:true,
    }).json({
        success:true,
        message:"Logged out successfully"
    })
}