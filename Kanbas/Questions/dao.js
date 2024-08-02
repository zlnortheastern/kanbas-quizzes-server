import model from "./model.js";
export const createQuestionSet = (questions) => {
  delete questions._id;
  return model.create(questions);
};

export const findQuestions = (questionsId) => model.findById(questionsId);
export const findQuestionsByQuiz = (quizId) => model.findOne({ quiz: quizId });
export const updateQuestions = (quiestionsId, quiestions) =>
  model.updateOne({ _id: quiestionsId }, { $set: quiestions });
export const deleteQuestions = (quiestionsId) => model.deleteOne({ _id: quiestionsId });
