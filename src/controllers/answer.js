import { v4 as uuidv4 } from "uuid";
import AnswerModel from "../models/answer.js";
import UserModel from "../models/user.js";
import QuestionModel from "../models/question.js";

export const GET_BY_QUESTION_ID = async (req, res) => {
  try {
    const questionId = req.params.id;
    const answers = await AnswerModel.find({ questionId: questionId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ answers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "We have some problems" });
  }
};

export const INSERT = async (req, res) => {
  try {
    const userId = req.body.userId;
    const questionId = req.params.id;

    const user = await UserModel.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const question = await QuestionModel.findOne({ id: questionId });
    if (!question) {
      return res.status(404).json({
        message: "Question not found.",
      });
    }

    const answer = {
      ...req.body,
      id: uuidv4(),
      userId: userId,
      questionId: questionId,
      createdAt: new Date(),
    };

    const newAnswer = new AnswerModel(answer);
    const savedAnswer = await newAnswer.save();

    await UserModel.findOneAndUpdate(
      { id: userId },
      { $push: { answered: savedAnswer.id } }
    );

    await QuestionModel.findOneAndUpdate(
      { id: questionId },
      { $push: { answers: savedAnswer.id } }
    );

    return res.status(201).json({
      message: "Answer was added",
      answer: savedAnswer,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "We have some problems",
      error: err.message,
    });
  }
};

export const DELETE_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const answer = await AnswerModel.findOneAndDelete(id);

    if (!answer) {
      return res.status(404).json({
        message: `Data with id ${id} does not exist`,
      });
    }

    return res.status(200).json({
      message: "Answer was deleted",
      answer: answer,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};
