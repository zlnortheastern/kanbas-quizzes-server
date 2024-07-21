import Database from "../Database/index.js";
export default function CourseRoutes(app) {
  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    Database.courses = Database.courses.map((c) =>
      c._id === id ? { ...c, ...course } : c
    );
    res.sendStatus(204);
  });

  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses.filter((c) => c._id !== id);
    // Clear up enrollments while deleting a course.
    Database.enrollments = Database.enrollments.filter((e) => {
      e.course !== id;
    });
    res.sendStatus(204);
  });

  app.post("/api/courses", (req, res) => {
    const course = { ...req.body, _id: new Date().getTime().toString() };
    Database.courses.push(course);
    res.send(course);
  });

  app.post("/api/courses/:uid", (req, res) => {
    const { uid } = req.params;
    const course = { ...req.body, _id: "RS" + new Date().getTime().toString() };
    Database.courses.push(course);
    Database.enrollments.push({
      _id: new Date().getTime().toString(),
      user: uid,
      course: course._id,
    });
    res.send(course);
  });

  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });
}
