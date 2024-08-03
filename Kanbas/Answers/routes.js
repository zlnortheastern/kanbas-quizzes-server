import { findQuestionsByQuiz } from "../Questions/dao.js";
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
    const { qid, uid } = req.params;
    const questions = await findQuestionsByQuiz(qid);
    const answer = req.body;
    let score = 0;
    let total = 0;
    questions.questions.forEach((question, index) => {
      const relatedAnswer = answer.answers[index];
      const upateScore = () => {
        score += question.points;
        relatedAnswer.score = question.points;
      };
      total += question.points;
      switch (question.type) {
        case "FILL_IN_BLANK":
          if (question.blank.includes(relatedAnswer.blank)) {
            upateScore();
          }
        case "MULTIPLE_CHOICE":
          if (question.choices[relatedAnswer.choice]) {
            upateScore();
          }
        case "TRUE_OR_FALSE":
          if (question.true_or_false === relatedAnswer.true_or_false) {
            upateScore();
          }
        default:
          return;
      }
    });
    const newAnswerSet = await dao.createAnswer({
      ...answer,
      quiz: qid,
      user: uid,
      score: score,
      total: total,
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
