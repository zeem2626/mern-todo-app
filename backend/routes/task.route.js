import { Router } from "express";
import {
   getTasks,
   addTask,
   updateTask,
   deleteTask,
   searchTask
} from "../controllers/task.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verifyUser, getTasks);
router.post("/", verifyUser, addTask);
router.put("/:taskId", verifyUser, updateTask);
router.delete("/:taskId", verifyUser, deleteTask);
router.get("/search", verifyUser, searchTask);

export default router;
