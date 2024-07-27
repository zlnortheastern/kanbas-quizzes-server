import * as dao from "./dao.js";
import { findAllCourses } from "../Courses/dao.js";
export default function EnrollmentsRoutes(app) {
  app.delete("/api/enrollments/:uid/:cid", async (req, res) => {
    const { uid, cid } = req.params;
    db.enrollments = db.enrollments.filter(
      (e) => e.course !== cid && e.user !== uid
    );
    res.sendStatus(200);
  });

  app.post("/api/enrollments/:uid/:cid", async (req, res) => {
    const { uid, cid } = req.params;
    const check = await dao.findEnrollment(uid, cid);
    if (check && check.length !== 0)
      return res.status(400).send({ error: "Enrollment deuplicated!" });
    const enrollment = {
      user: uid,
      course: cid,
    };
    const newEnrollment = await dao.createEnrollment(enrollment);
    res.send(newEnrollment);
  });

  app.get("/api/enrollments/:uid", async (req, res) => {
    const enrollments = await dao.findEnrollments(req.params.uid);
    res.json(enrollments.map((e) => e.course));
  });

  app.get("/api/enrollments/:uid/enrollable", async (req, res) => {
    const { uid } = req.params;
    const enrollments = await dao.findEnrollments(uid);
    const courses = await findAllCourses(uid);
    const result = courses.filter((c) => {
      return !enrollments.map((e) => e.course).includes(c._id.toString());
    });
    res.json(result);
  });
}
