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

const router: Router = Router();

router.post("/tasks", validate(taskSchema), addTask);
router.get("/tasks", getTasks);
router.get("/tasks/:taskId", getTaskById);
router.put("/tasks/:taskId", validate(taskSchema), editTaskById);
router.delete("/tasks/:taskId", deleteTaskById);

export default router;
