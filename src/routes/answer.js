import express from "express";
import auth from "../middlewares/auth.js";
import validate from "../middlewares/validation.js";
import { GET_BY_ID, INSERT, DELETE_BY_ID } from "../controllers/answer.js";
import answerSchema from "../schemas/answer.js";

const router = express.Router();

router.get("/", auth, GET_BY_ID);
router.post("/", validate(answerSchema), auth, INSERT);
router.delete("/:id", auth, DELETE_BY_ID);
