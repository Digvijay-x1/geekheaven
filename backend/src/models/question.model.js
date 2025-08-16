import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  title: String,
  url: String,
  yt_link: String,
  p1_link: String,
  p2_link: String,
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy",
  },
  tags: [String],
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
