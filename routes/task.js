import express from "express";
import { isAutenticated } from "../middlewares/auth.js";
import { newTask,getAllTasks,updateTask,deleteTask } from "../controllers/task.js";
const router = express.Router();

router.post("/new",isAutenticated,newTask)
router.get("/myTasks",isAutenticated,getAllTasks)


router.route("/:taskID").put(isAutenticated,updateTask).delete(isAutenticated,deleteTask);

export default router;