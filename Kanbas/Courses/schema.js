import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    number: String,
    name: String,
    startDate: String,
    endDate: String,
    department: Date,
    credits: Number,
    description:String,
  },
  { collection: "courses" }
);
export default courseSchema;
