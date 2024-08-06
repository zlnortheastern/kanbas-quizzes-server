import model from "./model.js";
export const createQuestionSet = (questions) => {
  delete questions._id;
  questions.quiz = quizzes._id;
  return model.create(questions);
};

export const findQuestions = (questionsId) => model.findById(questionsId);
export const findQuestionsByQuiz = (quizId) => model.findOne({ quiz: quizId });
export const updateQuestions = (quiestionsId, quiestions) =>
  model.updateOne({ _id: quiestionsId }, { $set: quiestions });
export const deleteQuestions = (quiestionsId) =>
  model.deleteOne({ _id: quiestionsId });

export const addQuestionToSet = async (questionsId, newQuestion) => {
  const questionsSet = await model.findById(questionsId);
  questionsSet.questions.push(newQuestion);
  return questionsSet.save();
};

export const updateQuestionInSet = async (
  questionsId,
  questionIndex,
  updatedQuestion
) => {
  const questionsSet = await model.findById(questionsId);
  questionsSet.questions[questionIndex] = updatedQuestion;
  return questionsSet.save();
};

export const removeQuestionFromSet = async (questionsId, questionIndex) => {
  const questionsSet = await model.findById(questionsId);
  questionsSet.questions.splice(questionIndex, 1);
  return questionsSet.save();
};
