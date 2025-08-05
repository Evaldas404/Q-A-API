import { v4 as uuidv4 } from "uuid";
import answerModel from "../models/answer.js";

export const GET_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    const answer = await answerModel.findOne({ id: id });

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
    const answer = {
      ...req.body,
      id: uuidv4(),
      createdAt: new Date(),
    };

    const response = new answerModel(answer);

    const data = await response.save();

    return res.status(201).json({
      messgage: "Question was added",
      answer: data,
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

    const answer = await answerModel.findOneAndDelete({ id: id });

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
