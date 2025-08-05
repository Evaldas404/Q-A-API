import express from "express";
import auth from "../middlewares/auth.js";
import questionSchema from "../schemas/question.js";
import validate from "../middlewares/validation.js";
import { GET_ALL, INSERT, DELETE_BY_ID } from "../controllers/question.js";

const router = express.Router();

router.get("/", auth, GET_ALL);
router.post("/", validate(questionSchema), auth, INSERT);
router.delete("/:id", auth, DELETE_BY_ID);
