import express from "express";
import auth from "../middlewares/auth.js";
import validate from "../middlewares/validation.js";
import {
  GET_BY_QUESTION_ID,
  INSERT,
  DELETE_BY_ID,
} from "../controllers/answer.js";
import answerSchema from "../schemas/answer.js";

const router = express.Router();

router.get("/question/:id/answers", auth, GET_BY_QUESTION_ID);
router.post("/question/:id/answers", validate(answerSchema), auth, INSERT);
router.delete("/:id", auth, DELETE_BY_ID);

export default router;
