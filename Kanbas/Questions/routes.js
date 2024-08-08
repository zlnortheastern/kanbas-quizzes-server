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
    const question = await dao.addQuestion(req.params.qid, req.body);
    res.json(question);
  });

  app.put("/api/questions/:qid/update/:title", async (req, res) => {
    const updatedQuestion = await dao.updateQuestion(
      req.params.qid,
      req.params.title,
      req.body
    );
    res.json(updatedQuestion);
  });

  app.delete("/api/questions/:qid/delete/:title", async (req, res) => {
    const status = await dao.deleteQuestion(req.params.qid, req.params.title);
    res.json(status);
  });
}
