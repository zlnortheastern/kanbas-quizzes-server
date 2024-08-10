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

export const deleteQuestions = (quiestionsId) =>
  model.deleteOne({ _id: quiestionsId });

export const addQuestion = async (questionsId, newQuestion) => {
  return model.updateOne(
    { _id: questionsId },
    { $push: { questions: newQuestion } }
  );
};

export const updateQuestion = async (
  questionsId,
  questionIndex,
  updatedQuestion
) => {
  const query = {};
  query[`questions.${questionIndex}`] = updatedQuestion;

  return model.updateOne({ _id: questionsId }, { $set: query });
};

export const deleteQuestion = async (questionsId, questionIndex) => {
  const questions = await model.findOne({ _id: questionsId });
  if (!questions || !questions.questions[questionIndex]) return null;

  questions.questions.splice(questionIndex, 1);

  return model.updateOne(
    { _id: questionsId },
    { $set: { questions: questions.questions } }
  );
};

export const addChoice = async (questionsId, questionIndex, newChoice) => {
  const query = {};
  query[`questions.${questionIndex}.choices`] = newChoice;

  return model.updateOne({ _id: questionsId }, { $push: query });
};

export const deleteChoice = async (questionsId, questionIndex, choiceId) => {
  const questions = await model.findOne({ _id: questionsId });
  if (!questions || !questions.questions[questionIndex]) return null;

  const question = questions.questions[questionIndex];
  question.choices = question.choices.filter(
    (choice) => choice._id !== choiceId
  );

  const query = {};
  query[`questions.${questionIndex}.choices`] = question.choices;

  return model.updateOne({ _id: questionsId }, { $set: query });
};

export const addBlank = async (questionsId, questionIndex, newAnswer) => {
  const query = {};
  query[`questions.${questionIndex}.blank`] = newAnswer;

  return model.updateOne({ _id: questionsId }, { $push: query });
};

export const deleteBlank = async (questionsId, questionIndex, answer) => {
  const questions = await model.findOne({ _id: questionsId });
  if (!questions || !questions.questions[questionIndex]) return null;

  const question = questions.questions[questionIndex];
  question.blank = question.blank.filter((b) => b !== answer);

  const query = {};
  query[`questions.${questionIndex}.blank`] = question.blank;

  return model.updateOne({ _id: questionsId }, { $set: query });
};
