import * as dao from "./dao.js";
export default function AnswersRoutes(app) {
  app.put("/api/answers/:id", async (req, res) => {
    const answer = await dao.updateAnswer(req.params.id, req.body);
    res.json(answer);
  });

  app.delete("/api/answers/:id", async (req, res) => {
    const status = await dao.deleteAnswer(req.params.id);
    res.json(status);
  });

  app.post("/api/quizzes/:qid/users/:uid/answers", async (req, res) => {
    const newAnswerSet = await dao.createAnswer({
      ...req.body,
      quiz: req.params.qid,
      user: req.params.uid,
    });
    res.send(newAnswerSet);
  });

  app.get("/api/quizzes/:qid/users/:uid/answers", async (req, res) => {
    const answer = await dao.findAnswersByUser(req.params.qid, req.params.uid);
    res.json(answer);
  });

  app.get("/api/answers/:id", async (req, res) => {
    const answer = await dao.findAnswerSet(req.params.id);
    if (answer) {
      res.json(answer);
    } else {
      res.status(404).send("Answers not found");
    }
  });
}
