import model from "./model.js";
export const createQuiz = (quiz) => {
  delete quiz._id;
  return model.create(quiz);
};
export const findQuizzes = (courseId) => model.find({ course: courseId });
export const findQuiz = (quizId) => model.findById(quizId);
export const updateQuiz = (moduleId, module) =>
  model.updateOne({ _id: moduleId }, { $set: module });
export const deleteQuiz = (moduleId) => model.deleteOne({ _id: moduleId });
