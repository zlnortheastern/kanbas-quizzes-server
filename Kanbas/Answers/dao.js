import model from "./model.js";
export const createAnswer = (answer) => {
  delete answer._id;
  return model.create(answer);
};

export const findAnswerSet = (answerId) => model.findById(answerId);
export const findAnswersByUser = (qid, uid) =>
  model.find({ user: uid, quiz: qid });
export const updateAnswer = (quiestionsId, quiestions) =>
  model.updateOne({ _id: quiestionsId }, { $set: quiestions });
export const deleteAnswer = (quiestionsId) =>
  model.deleteOne({ _id: quiestionsId });
