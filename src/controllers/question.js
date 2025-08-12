import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../models/question.js";
import UserModel from "../models/user.js";
import AnswerModel from "../models/answer.js";

export const GET_ALL = async (req, res) => {
  try {
    const questions = await QuestionModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      questions: questions,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};

export const INSERT = async (req, res) => {
  try {
    const existingQuestion = await QuestionModel.findOne({
      questionText: req.body.questionText,
    });

    if (existingQuestion) {
      return res.status(409).json({
        message: `Question "${req.body.questionText}" already exists.`,
      });
    }

    const userId = req.body.userId;

    const question = {
      ...req.body,
      id: uuidv4(),
      userId: userId,
      createdAt: new Date(),
    };

    const newQuestion = new QuestionModel(question);
    const savedQuestion = await newQuestion.save();

    await UserModel.findOneAndUpdate(
      { id: userId },
      { $push: { questions: savedQuestion.id } }
    );

    return res.status(201).json({
      message: "Question was added",
      question: savedQuestion,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};

export const DELETE_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const question = await QuestionModel.findOneAndDelete({ id: id });
    const answers = await AnswerModel.deleteMany({ questionId: id });

    if (!question) {
      return res.status(404).json({
        message: `Data with id ${id} does not exist`,
      });
    }

    if (!answers) {
      return res.status(404).json({
        message: "This question has no answers",
      });
    }

    return res.status(200).json({
      message: "Question was deleted",
      question: question,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};
