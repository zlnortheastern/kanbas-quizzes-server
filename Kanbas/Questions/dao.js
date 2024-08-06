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

export const addQuestionToQuiz = async (quizId, newQuestion) => {
  const questionsSet = await model.findOne({ quiz: quizId });
  if (questionsSet) {
    questionsSet.questions.push(newQuestion);
    return questionsSet.save();
  } else {
    throw new Error("Questions set not found for the given quiz ID");
  }
};

export const updateQuestion = async (
  questionsId,
  questionIndex,
  updatedQuestion
) => {
  const questionsSet = await model.findById(questionsId);
  questionsSet.questions[questionIndex] = updatedQuestion;
  return questionsSet.save();
};

export const deleteQuestion = async (questionsId, questionIndex) => {
  const questionsSet = await model.findById(questionsId);
  questionsSet.questions.splice(questionIndex, 1);
  return questionsSet.save();
};
