import db from "../Database/index.js";
export default function EnrollmentsRoutes(app) {
  app.delete("/api/enrollments/:uid/:cid", (req, res) => {
    const { uid, cid } = req.params;
    db.enrollments = db.enrollments.filter(
      (e) => e.course != cid && e.user != uid
    );
    res.sendStatus(200);
  });
  app.post("/api/enrollments/:uid/:cid", (req, res) => {
    const { uid, cid } = req.params;
    const check = db.enrollments.find(
      (e) => e.course === cid && e.user === uid
    );
    if (check && check.length != 0)
      return res.status(400).send({ error: "Enrollment deuplicated!" });
    const newEnrollment = {
      _id: new Date().getTime().toString(),
      user: uid,
      course: cid,
    };
    db.enrollments.push(newEnrollment);
    res.send(newEnrollment);
  });
  app.get("/api/enrollments/:uid", (req, res) => {
    const { uid } = req.params;
    const enrollments = db.enrollments.filter((e) => e.user === uid);
    res.json(enrollments.map((e) => e.course));
  });

  app.get("/api/enrollments/:uid/enrollable", (req, res) => {
    const { uid } = req.params;
    const enrollments = db.enrollments.filter((e) => e.user != uid);
    res.json(enrollments.map((e) => e.course));
  });
}
