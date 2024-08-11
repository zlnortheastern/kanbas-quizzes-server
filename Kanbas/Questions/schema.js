import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
  quiz: String,
  type: {
    type: String,
    enum: ["TRUE_OR_FALSE", "MULTIPLE_CHOICE", "FILL_IN_BLANK"],
  },
  title: String,
  points: Number,
  question: String,
  true_or_false: Boolean,
  choices: [
    {
      _id: String,
      choice: String,
      correct: Boolean,
    },
  ],
  blank: [String],
});
const questionSetSchema = new mongoose.Schema(
  {
    quiz: String,
    questions: [questionSchema],
  },
  { collection: "questions" }
);
export default questionSetSchema;
