import * as dao from "./dao.js";
export default function QuizzesRoutes(app) {
  app.put("/api/quizzes/:qid", async (req, res) => {
    const quiz = await dao.updateQuiz(req.params.qid, req.body);
    res.json(quiz);
  });

  app.delete("/api/quizzes/:qid", async (req, res) => {
    const status = await dao.deleteQuiz(req.params.qid);
    res.json(status);
  });

  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    const newQuiz = await dao.createQuiz({
      ...req.body,
      course: req.params.cid,
      published:false,
    });
    res.send(newQuiz);
  });

  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const quizzes = await dao.findQuizzes(req.params.cid);
    res.json(quizzes);
  });

  app.get("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.findQuiz(qid);
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).send("Quiz not found");
    }
  });
}
