import model from "./model.js";
export const createEnrollment = (enrollment) => {
  delete enrollment._id;
  return model.create(enrollment);
};
export const findEnrollments = (userId) => model.find({ user: userId });
export const findEnrollment = (userId, courseId) =>
  model.find({ user: userId, course: courseId });
export const findEnrollables = (userId, courseId) =>
  model.find({ user: userId, course: courseId });
export const deleteEnrollments = (courseId) =>
  model.deleteMany({ course: courseId });
