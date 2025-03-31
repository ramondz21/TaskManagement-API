import { Router } from "express";
import { register, login, refreshToken } from "../controllers/authController";
import { authSchema } from "../validation/authValidation";
import validate from "../middleware/validate";

const router: Router = Router();

router.post("/register", validate(authSchema), register);
router.post("/login", validate(authSchema), login);
router.post("/refresh-token", refreshToken);

export default router;
