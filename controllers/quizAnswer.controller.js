const asyncWrapper = require("../middelware/asyncWrapper");
const appError = require("../utils/appError");
const { v4: uuid } = require('uuid')
const httpStatusText = require('../utils/httpStatusText');
const Quiz = require("../models/quiz.model");
const QuestionAnswer = require("../models/questionAnswer.model");
const Question = require("../models/question.model");
const QuizAnswer = require("../models/quizAnswer.model");
const StudentQuizGrade = require("../models/studentQuizGrade.model");



exports.submit = asyncWrapper(
  async (req, res, next) => {
    const { quiz_ID, answers } = req.body;
    const quiz = await Quiz.findOne({
      where: { quiz_ID },
    });
    if (!quiz) {
      return next(appError.create('Quiz not found', 404, httpStatusText.FAIL));
    }
    const student = await StudentQuizGrade.findOne({
      where: { student_ID: req.currentUser.user_ID },
    })
    if (student) {
      return next(appError.create('You have already taken this quiz', 404, httpStatusText.FAIL));
    }

    let totalGrade = 0;
    const possibleQuestions = await Question.findAll({
      where: { quiz_ID },
    });
    const questionMap = possibleQuestions.reduce((map, question) => {
      map[question.question_ID] = question.question_grade;
      return map;
    }, {});
    // console.log("questionMap => ",questionMap);
    for (const answer of answers) {
      const { questionId, answerId } = answer;
      const question = await Question.findOne({
        where: { question_ID: questionId },
      });
      if (!question) {
        continue;
      }
      const correctAnswer = await QuestionAnswer.findOne({
        // where: { question_ID: questionId, is_correct: true },
        where: { answer_ID: answerId },
      });
      let answerGrade = 0
      // console.log("correctAnswer.is_correct => ",correctAnswer.is_correct);
      if (correctAnswer.is_correct) {
        totalGrade += questionMap[questionId]
        answerGrade = questionMap[questionId]
      }
      await QuizAnswer.create({
        quiz_answer_ID: uuid(), student_ID: req.currentUser.user_ID, question_answers_ID: answerId, quizAnswerGrade: answerGrade
      })
    }
    // console.log("totalGrade=> ", totalGrade);
    await StudentQuizGrade.create({ student_ID: req.currentUser.user_ID, quiz_ID, grade: totalGrade, });
    return res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Quiz submitted successfully', data: { grade: totalGrade }, });
  }
)





// async (req, res, next) => {
//   const {quiz_ID, ansewrs } = req.body
// let grade = 0
// for(const i of ansewrs){
// const { question_ID, answer_ID } = i
//     const question = await Question.findOne({
//       where: { question_ID },
//     })
//     const questionAnswer = await QuestionAnswer.findOne({
//       where: { answer_ID },
//     })

//    let  answerGrade = 0

//     if(questionAnswer.is_correct){
//       grade += question.question_grade
//       answerGrade = question.question_grade
//   }
//   await QuizAnswer.create({
//     quiz_answer_ID: uuid(), student_ID: req.currentUser.user_ID, question_answers_ID:answer_ID, quizAnswerGrade:answerGrade
//   })

// }


// await StudentQuizGrade.create({
//   student_ID: req.currentUser.user_ID, quiz_ID, grade
//  })

//   return res.json({ status: httpStatusText.SUCCESS , data: { grade } })
// }
