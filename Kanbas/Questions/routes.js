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
    const questions = await dao.findQuestionsByQuiz(req.params.qid);
    res.json(questions);
  });

  app.get("/api/questions/:id", async (req, res) => {
    const questions = await dao.findQuestions(req.params.id);
    if (questions) {
      res.json(questions);
    } else {
      res.status(404).send("Questions not found");
    }
  });

  app.post("/api/questions/:qid/new", async (req, res) => {
    const newQuestion = req.body;
    const updatedQuestionSet = await dao.addQuestionToSet(
      req.params.qid,
      newQuestion
    );
    res.json(updatedQuestionSet);
  });

  app.put("/api/questions/:qid/:index", async (req, res) => {
    const updatedQuestion = req.body;
    const updatedQuestionSet = await dao.updateQuestionInSet(
      req.params.qid,
      req.params.index,
      updatedQuestion
    );
    res.json(updatedQuestionSet);
  });

  app.delete("/api/questions/:qid/:index", async (req, res) => {
    const updatedQuestionSet = await dao.removeQuestionFromSet(
      req.params.qid,
      req.params.index
    );
    res.json(updatedQuestionSet);
  });
}
