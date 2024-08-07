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
    try {
      const newQuestion = req.body;
      const updatedQuestionSet = await dao.createQuestion(
        req.params.qid,
        newQuestion
      );
      res.json(updatedQuestionSet);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

  app.get("/api/quizzes/:qid/questions", async (req, res) => {
    const questions = await dao.findQuestionsByQuiz(req.params.qid);
    res.json(questions);
  });

  app.get("/api/questions/:id", async (req, res) => {
    const question = await dao.findQuestion(req.params.id);
    if (question) {
      res.json(question);
    } else {
      res.status(404).send("Question not found");
    }
  });

  app.post("/api/questions/:qid/new", async (req, res) => {
    const newQuestion = req.body;
    const createdQuestion = await dao.createQuestion(
      req.params.qid,
      newQuestion
    );
    res.json(createdQuestion);
  });

  app.put("/api/questions/:qid/:id", async (req, res) => {
    const updatedQuestion = await dao.updateQuestion(req.params.id, req.body);
    res.json(updatedQuestion);
  });

  app.delete("/api/questions/:qid/:id", async (req, res) => {
    const status = await dao.deleteQuestion(req.params.id);
    res.json(status);
  });

  app.get("/api/questions/:questionId/choices", async (req, res) => {
    try {
      const choices = await dao.findChoicesForQuestion(req.params.questionId);
      res.json(choices);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });
}
