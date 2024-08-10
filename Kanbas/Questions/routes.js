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

  app.put("/api/questions/:qid/update/:index", async (req, res) => {
    const { qid, index } = req.params;
    const questionIndex = parseInt(index, 10);
    const updatedQuestion = await dao.updateQuestion(
      qid,
      questionIndex,
      req.body
    );
    res.json(updatedQuestion);
  });

  app.delete("/api/questions/:qid/delete/:index", async (req, res) => {
    const { qid, index } = req.params;
    const questionIndex = parseInt(index, 10);
    const status = await dao.deleteQuestion(qid, questionIndex);
    res.json(status);
  });

  app.get("/api/questions/:qid/question/:index", async (req, res) => {
    const { qid, index } = req.params;
    const questionIndex = parseInt(index, 10);
    const questionsSet = await dao.findQuestions(qid);
    const question = questionsSet.questions[questionIndex];
    if (question) {
      res.json(question);
    } else {
      res.status(404).send("Question not found");
    }
  });

  app.post("/api/questions/:qid/question/:index/choices", async (req, res) => {
    const { qid, index } = req.params;
    const questionIndex = parseInt(index, 10);
    const newChoice = req.body;
    try {
      const updatedQuestion = await dao.addChoice(
        qid,
        questionIndex,
        newChoice
      );
      res.json(updatedQuestion);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.delete(
    "/api/questions/:qid/question/:index/choices/:choiceId",
    async (req, res) => {
      const { qid, index, choiceId } = req.params;
      const questionIndex = parseInt(index, 10);
      try {
        const updatedQuestion = await dao.deleteChoice(
          qid,
          questionIndex,
          choiceId
        );
        res.json(updatedQuestion);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  );

  app.post("/api/questions/:qid/question/:index/blank", async (req, res) => {
    const { qid, index } = req.params;
    const questionIndex = parseInt(index, 10);
    const newAnswer = req.body.answer;
    try {
      const updatedQuestion = await dao.addBlank(qid, questionIndex, newAnswer);
      res.json(updatedQuestion);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.delete(
    "/api/questions/:qid/question/:index/blank/:answer",
    async (req, res) => {
      const { qid, index, answer } = req.params;
      const questionIndex = parseInt(index, 10);
      try {
        const updatedQuestion = await dao.deleteBlank(
          qid,
          questionIndex,
          answer
        );
        res.json(updatedQuestion);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  );
}
