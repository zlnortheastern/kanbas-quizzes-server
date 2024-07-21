import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import cors from "cors";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import QuizzesRoutes from "./Kanbas/Quizzes/routes.js";
import UserRoutes from "./Kanbas/User/routes.js";
import EnrollmentsRoutes from "./Kanbas/Enrollments/routes.js";
const app = express();
app.use(cors());
app.use(express.json());
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
QuizzesRoutes(app);
Lab5(app);
Hello(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
