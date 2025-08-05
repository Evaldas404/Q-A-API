import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export default mongoose.model("Question", questionSchema);
