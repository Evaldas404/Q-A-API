import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  likes: { type: Number, default: 0, required: true },
  dislikes: { type: Number, default: 0, required: true },
  questionId: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export default mongoose.model("Answer", answerSchema);
