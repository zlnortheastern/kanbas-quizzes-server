import * as dao from "./dao.js";
export default function QuestionsRoutes(app) {
  app.put("/api/questions/:qid", async (req, res) => {
    const questions = await dao.updateQuestions(req.params.qid, req.body);
    res.json(questions);
  });

  app.delete("/api/questions/:qid", async (req, res) => {
    const status = await dao.deleteQuestions(req.params.qid);
    res.json(status);
  });

  app.post("/api/quizzes/:qid/questions", async (req, res) => {
    const newQuestionSet = await dao.createQuestionSet({
      ...req.body,
      quiz: req.params.qid,
    });
    res.send(newQuestionSet);
  });

  app.get("/api/quizzes/:qid/questions", async (req, res) => {
    try {
      const questions = await dao.findQuestionsByQuiz(req.params.qid);
      if (questions) {
        res.json(questions);
      } else {
        console.log(`The current quizId is ${req.params.qid}`);
        res.json({ questions: [] });
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/api/questions/:id", async (req, res) => {
    const questions = await dao.findQuestions(req.params.id);
    if (questions) {
      res.json(questions);
    } else {
      res.status(404).send("Questions not found");
    }
  });
}
