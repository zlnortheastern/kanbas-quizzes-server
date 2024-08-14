import { deleteAnswersByQuiz } from "../Answers/dao.js";
import { createQuiz, updateQuiz } from "../Quizzes/dao.js";
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

  app.get("/api/questions", async (req, res) => {
    const allQuestions = await dao.findAllQuestions();
    res.send(allQuestions);
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

  app.put("/api/quizzes/:qid/questions", async (req, res) => {
    const { qid } = req.params;
    const updatedQuiz = await updateQuiz(qid, req.body.quiz);
    const updatedQuestion = await dao.updateQuestionsByQuizId(
      qid,
      req.body.questionSet
    );
    if (updatedQuiz && updatedQuestion) await deleteAnswersByQuiz(qid);
    res.json({ updatedQuiz, updatedQuestion });
  });

  app.post("/api/courses/:cid/quizzes/questions", async (req, res) => {
    const { cid } = req.params;
    const createdQuiz = await createQuiz({ ...req.body.quiz, course: cid });
    const createdQuestionSet = await dao.createQuestionSet({
      ...req.body.questionSet,
      quiz: createdQuiz._id,
    });
    res.json({ createdQuiz, createdQuestionSet });
  });
}
