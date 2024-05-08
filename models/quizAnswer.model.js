const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Faculty = require('./faculty.model');
const User = require('./user.model');
const CourseSemester = require('./courseSemester.model');
const Quiz = require('./quiz.model');
const Question = require('./question.model');
const QuestionAnswer = require('./questionAnswer.model');

const QuizAnswer = sequelize.define('QuizAnswer', {
    quiz_answer_ID: {    
        type: DataTypes.STRING,
        primaryKey: true
    },
    student_ID: {   
        type: DataTypes.STRING,
        allowNull: false,
    },
    question_answers_ID:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      quizAnswerGrade:{
        type: DataTypes.FLOAT,
      }
  
     
});
QuizAnswer.belongsTo(User, {foreignKey: 'student_ID'})
QuizAnswer.belongsTo(QuestionAnswer, {foreignKey: 'question_answers_ID'})


module.exports = QuizAnswer


