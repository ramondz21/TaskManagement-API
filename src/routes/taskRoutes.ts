import { Router } from "express";
import { 
    addTask, 
    getTaskById, 
    getTasks, 
    editTaskById, 
    deleteTaskById 
} from "../controllers/taskController";
import { taskSchema } from "../validation/taskValidation";
import validate from "../middleware/validate";
import authMiddleware from '../middleware/authMiddleware'

const router: Router = Router();

router.post("/tasks", authMiddleware, validate(taskSchema), addTask);
router.get("/tasks", authMiddleware, getTasks);
router.get("/tasks/:taskId", authMiddleware, getTaskById);
router.put("/tasks/:taskId", authMiddleware, validate(taskSchema), editTaskById);
router.delete("/tasks/:taskId", authMiddleware, deleteTaskById);

export default router;
