import model from "./model.js";
export const createQuestionSet = (questions) => {
  delete questions._id;
  questions.quiz = quizId;
  return model.create(questions);
};

export const createQuestion = (quizId, question) => {
  delete question._id;
  question.quiz = quizId;
  return model.create(question);
};

export const findQuestions = (questionsId) => model.findById(questionsId);
export const findQuestion = (id) => model.findById(id);

export const findQuestionsByQuiz = (quizId) => model.findOne({ quiz: quizId });
export const findQuestionsByType = (type, quizId) =>
  model.find({ questionType: type, quizID: quizId });

export const updateQuestions = (quiestionsId, quiestions) =>
  model.updateOne({ _id: quiestionsId }, { $set: quiestions });
export const updateQuestion = (id, question) =>
  model.updateOne({ _id: id }, { $set: question });
export const deleteQuestions = (quiestionsId) =>
  model.deleteOne({ _id: quiestionsId });
export const deleteQuestion = (id) => model.deleteOne({ _id: id });

export const findChoicesForQuestion = async (questionId) => {
  const question = await model.findById(questionId);
  if (question) {
    return question.choices;
  } else {
    throw new Error("Question not found for the given ID");
  }
};
