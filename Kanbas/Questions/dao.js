import model from "./model.js";
export const createQuestionSet = (questions) => {
  delete questions._id;
  questions.quiz = quizId;
  return model.create(questions);
};

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
  questionTitle,
  updatedQuestion
) => {
  return model.updateOne(
    { _id: questionsId, "questions.title": questionTitle },
    { $set: { "questions.$": updatedQuestion } }
  );
};

export const deleteQuestion = async (questionsId, questionTitle) => {
  return model.updateOne(
    { _id: questionsId },
    { $pull: { questions: { title: questionTitle } } }
  );
};

export const addChoice = async (questionsId, questionTitle, newChoice) => {
  return model.updateOne(
    { _id: questionsId, "questions.title": questionTitle },
    { $push: { "questions.$.choices": newChoice } }
  );
};

export const deleteChoice = async (questionsId, questionTitle, choiceId) => {
  return model.updateOne(
    { _id: questionsId, "questions.title": questionTitle },
    { $pull: { "questions.$.choices": { _id: choiceId } } }
  );
};

export const addBlank = async (questionsId, questionTitle, newAnswer) => {
  return model.updateOne(
    { _id: questionsId, "questions.title": questionTitle },
    { $push: { "questions.$.blank": newAnswer } }
  );
};
export const deleteBlank = async (questionsId, questionTitle, answer) => {
  return model.updateOne(
    { _id: questionsId, "questions.title": questionTitle },
    { $pull: { "questions.$.blank": answer } }
  );
};
