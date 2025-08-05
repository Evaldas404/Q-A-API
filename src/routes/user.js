import express from "express";
import validate from "../middlewares/validation.js";
import loginSchema from "../schemas/login.js";
import registerSchema from "../schemas/register.js";
import { LOGIN_USER, REGISTER_USER } from "../controllers/user.js";

const router = express.Router();

router.post("/register", validate(registerSchema), REGISTER_USER);
router.post("/login", validate(loginSchema), LOGIN_USER);

export default router;
