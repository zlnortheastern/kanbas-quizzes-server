import model from "./model.js";
export const createQuestionSet = (questions) => {
  delete questions._id;
  return model.create(questions);
};

export const findAllQuestions = () => model.find();

export const findQuestions = (questionsId) => model.findById(questionsId);

export const findQuestionsByQuiz = (quizId) => model.findOne({ quiz: quizId });

export const updateQuestions = (quiestionsId, quiestions) =>
  model.updateOne({ _id: quiestionsId }, { $set: quiestions });

export const updateQuestionsByQuizId = (quizId, quiestions) =>
  model.updateOne({ quiz: quizId }, { $set: quiestions });

export const deleteQuestions = (quiestionsId) =>
  model.deleteOne({ _id: quiestionsId });
