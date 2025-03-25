import { Router } from "express";
import { 
    addTask, 
    getTaskById, 
    getTasks, 
    editTaskById, 
    deleteTaskById 
} from "../controllers/taskController";

const router: Router = Router();

router.post("/tasks", addTask);
router.get("/tasks", getTasks);
router.get("/tasks/:taskId", getTaskById);
router.put("/tasks/:taskId", editTaskById);
router.delete("/tasks/:taskId", deleteTaskById);

export default router;
