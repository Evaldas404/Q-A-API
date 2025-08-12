import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
  id: { type: String, required: true },
  answerText: { type: String, required: true },
  userId: { type: String, required: true, ref: "User" },
  questionId: { type: String, required: true, ref: "Question" },
  likedBy: [{ type: String, ref: "User" }],
  dislikedBy: [{ type: String, ref: "User" }],
  createdAt: { type: Date, required: true },
});

export default mongoose.model("Answer", answerSchema);
