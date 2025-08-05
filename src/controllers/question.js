import { v4 as uuidv4 } from "uuid";
import questionModel from "../models/question.js";

export const GET_ALL = async (req, res) => {
  try {
    const questions = await questionModel.find();

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
    const existingQuestion = await questionModel.findOne({
      title: req.body.title,
    });

    if (existingQuestion) {
      return res.status(409).json({
        messgage: `Game ${req.body.title} already exist`,
      });
    }

    const question = {
      ...req.body,
      id: uuidv4(),
      cratedAt: new Date(),
    };

    const response = new BoardGameModel(question);

    const data = await response.save();

    return res.status(201).json({
      messgage: "Question was added",
      question: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "We have some problems",
    });
  }
};

export const DELETE_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const question = await questionModel.findOneAndDelete({ id: id });

    if (!question) {
      return res.status(404).json({
        message: `Data with id ${id} does not exist`,
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
