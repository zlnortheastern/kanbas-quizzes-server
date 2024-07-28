import * as dao from "./dao.js";
import { createEnrollment, deleteEnrollments } from "../Enrollments/dao.js";
export default function CourseRoutes(app) {
  app.put("/api/courses/:id", async (req, res) => {
    const course = await dao.updateCourse(req.params.id, req.body);
    res.json(course);
  });

  app.delete("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const status = await dao.deleteCourse(id);
    const status1 = await deleteEnrollments(id);
    res.json(status);
  });

  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  });
  app.post("/api/courses/:uid", async (req, res) => {
    const course = await dao.createCourse(req.body);
    await createEnrollment({
      user: req.params.uid,
      course: course._id,
    });
    res.json(course);
  });
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
}
