import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    course: String,
    description: String,
    points: String,
    assignmentGroup: String,
    displayGradeAs: String,
    submissionType: String,
    assign: {
      assignTo: String,
      due: String,
      availableFrom: String,
      until: String,
    },
  },
  { collection: "assignments" }
);
export default assignmentSchema;
