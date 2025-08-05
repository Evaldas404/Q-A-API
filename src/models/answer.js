import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  questionId: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export default mongoose.model("Answer", answerSchema);
