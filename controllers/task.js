import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask=async (req,res)=>{
    try {
        const {title,description}=req.body;
        await Task.create({title,description,user:req.user});
        res.status(201).json({success:true,message:"Task created successfully"});
    } catch (error) {
        next(error);
    }
}

export const getMyTasks=async (req,res,next)=>{
    try {
        const tasks=await Task.find({user:req.user._id});

    res.status(200).json({
        success:true,
        data:tasks
    })
    } catch (error) {
        next(error);
    }
}

export const updateTheStatus=async (req,res,next)=>{
    try {
        const {id}=req.params;
    const task=await Task.findById(id);
    if(!task){
        return next(new ErrorHandler("Task not found",404))
    }
    task.isCompleted=!task.isCompleted;

    await task.save();
    res.status(200).json({
        success:true,
        message:"Task status updated successfully"
    })
    } catch (error) {
        next(error);
    }
}

export const deleteTask=async (req,res,next)=>{
    try {
        const {id}=req.params;
    const task=await Task.findById(id);
    if(!task){
        return next(new Error("Task not found"))
    }
    await Task.deleteOne({_id:id})
    res.status(200).json({
        success:true,
        message:"Task deleted successfully"
    })
    } catch (error) {
      next(error);
    }
}
