import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: { type: String, required: true },
  liked: { type: [String], required: true },
  disliked: { type: [String], required: true },
  createdAt: { type: Date, required: true },
});

export default mongoose.model("User", userSchema);
