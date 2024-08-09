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

  app.get("/api/questions", async (req, res) => {
    const allQuestions = await dao.findAllQuestions();
    res.send(allQuestions);
  });

  app.get("/api/quizzes/:qid/questions", async (req, res) => {
    const questions = await dao.findQuestionsByQuiz(req.params.qid);
    res.json(questions);
  });

  app.get("/api/questions/:qid", async (req, res) => {
    const { qid } = req.params;
    const questions = await dao.findQuestions(qid);
    if (questions) {
      res.json(questions);
    } else {
      res.status(404).send("Questions not found");
    }
  });

  app.post("/api/questions/:qid/add", async (req, res) => {
    const question = await dao.addQuestion(req.params.qid, req.body);
    res.json(question);
  });

  app.put("/api/questions/:qid/update/:title", async (req, res) => {
    const { qid, title } = req.params;
    const decodedTitle = decodeURIComponent(title);
    const updatedQuestion = await dao.updateQuestion(
      qid,
      decodedTitle,
      req.body
    );
    res.json(updatedQuestion);
  });

  app.delete("/api/questions/:qid/delete/:title", async (req, res) => {
    const { qid, title } = req.params;
    const decodedTitle = decodeURIComponent(title);
    const status = await dao.deleteQuestion(qid, decodedTitle);
    res.json(status);
  });

  app.get("/api/questions/:qid/question/:title", async (req, res) => {
    const { qid, title } = req.params;
    const decodedTitle = decodeURIComponent(title);
    const questionsSet = await dao.findQuestions(qid);
    const question = questionsSet.questions.find(
      (q) => q.title === decodedTitle
    );
    if (question) {
      res.json(question);
    } else {
      res.status(404).send("Question not found");
    }
  });

  app.post("/api/questions/:qid/question/:title/choices", async (req, res) => {
    const { qid, title } = req.params;
    const decodedTitle = decodeURIComponent(title);
    const newChoice = req.body;
    try {
      const updatedQuestion = await dao.addChoice(qid, decodedTitle, newChoice);
      res.json(updatedQuestion);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.delete(
    "/api/questions/:qid/question/:title/choices/:choiceId",
    async (req, res) => {
      const { qid, title, choiceId } = req.params;
      const decodedTitle = decodeURIComponent(title);
      try {
        const updatedQuestion = await dao.deleteChoice(
          qid,
          decodedTitle,
          choiceId
        );
        res.json(updatedQuestion);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  );

  app.post("/api/questions/:qid/question/:title/blank", async (req, res) => {
    const { qid, title } = req.params;
    const decodedTitle = decodeURIComponent(title);
    const newAnswer = req.body.answer;
    try {
      const updatedQuestion = await dao.addBlank(qid, decodedTitle, newAnswer);
      res.json(updatedQuestion);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.delete(
    "/api/questions/:qid/question/:title/blank/:answer",
    async (req, res) => {
      const { qid, title, answer } = req.params;
      const decodedTitle = decodeURIComponent(title);
      try {
        const updatedQuestion = await dao.deleteBlank(
          qid,
          decodedTitle,
          answer
        );
        res.json(updatedQuestion);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  );
}
