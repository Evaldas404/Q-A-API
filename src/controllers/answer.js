import { v4 as uuidv4 } from "uuid";
import AnswerModel from "../models/answer.js";
import UserModel from "../models/user.js";

export const GET_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    const answer = await AnswerModel.findOne({ id: id });

    if (!answer) {
      return res.status(404).json({
        message: "Answer does not exist",
      });
    }

    return res.status(200).json({
      answer: answer,
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
    const userId = req.body.userId;
    const questionId = req.params.questionId;

    const user = await UserModel.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const answer = {
      ...req.body,
      id: uuidv4(),
      author: userId,
      questionId: questionId,
      createdAt: new Date(),
    };

    const newAnswer = new AnswerModel(answer);
    const savedAnswer = await newAnswer.save();

    await UserModel.findOneAndUpdate(
      { id: userId },
      { $push: { answered: savedAnswer } }
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

    const answer = await AnswerModel.findOneAndDelete({ id: id });

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
