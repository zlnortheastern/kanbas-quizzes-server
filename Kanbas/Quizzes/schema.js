import mongoose from "mongoose";
const moduleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    quizType: String,
    points: Number,
    assignmentGroup: String,
    shuffleAnswers: Boolean,
    timeLimit: Number,
    multipleAttempts: Boolean,
    attemptLimit: Number,
    showCorrectAnswers: String,
    accessCode: String,
    oneQuestionAtATime: Boolean,
    webcamRequired: Boolean,
    lockQuestionsAfterAnswering: Boolean,
    dueDate: String,
    availableDate: String,
    availableUntilDate: String,
    description: String,
    lastModified: String,
    course: String,
    published: Boolean,
  },
  { collection: "quizzes" }
);
export default moduleSchema;
