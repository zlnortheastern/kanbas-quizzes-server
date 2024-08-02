import mongoose from "mongoose";
const answerSetSchema = new mongoose.Schema(
  {
    user: String,
    quiz: String,
    score: Number,
    total: Number,
    answers: [
      {
        type: {
          type: String,
          enum: ["TRUE_OR_FALSE", "MULTIPLE_CHOICE", "FILL_IN_BLANK"],
        },
        score: Number,
        true_or_false: Boolean,
        choice: Number,
        blank: String,
      },
    ],
    submit_time: String,
    time_used: Number,
  },
  { collection: "answers" }
);
export default answerSetSchema;
