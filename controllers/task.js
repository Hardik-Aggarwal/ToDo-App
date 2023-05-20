import ErrorHandler from "../middlewares/error.js";
import {Task} from "../models/task.js";
 

export const newTask = async (req,res)=>{

    try {
        const {title,description} = req.body;

        await Task.create({
            title,
            description,
            user:req.user
        });

        res.status(201).json({
            message:"Task created"
        });
    } catch (error) {
        next(error)
    }
    
};

export const getAllTasks = async (req,res)=>{
    try{
        const myID = req.user._id;
        const tasks = await Task.find({user:myID});

        res.status(200).json({
            success:true,
            tasks,
        });
    }
    catch(error)
    {
        next(error);
    }
    
}

export const updateTask = async (req,res)=>{

    try {
        const {taskID} = req.params;

        const task = await Task.findById(taskID);

        if(!task)
        {
            next(new ErrorHandler("Task Not Found",404));
        }

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success:true,
            message:`Task ${task.title} updated`
        });
    } catch (error) {
        next(error);
    }

}

export const deleteTask = async (req,res)=>{

    try {
        const {taskID} = req.params;

        const task = await Task.findById(taskID);
        if(!task)
        {
            next(new ErrorHandler("Task Not Found",404));
        }
        await task.deleteOne();

        res.status(200).json({
            success:true,
            message:`Task ${task.title} deleted`
        });
    } catch (error) {
        next(error);
    }
    
}