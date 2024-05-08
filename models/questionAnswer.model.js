const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Faculty = require('./faculty.model');
const User = require('./user.model');
const CourseSemester = require('./courseSemester.model');
const Quiz = require('./quiz.model');
const Question = require('./question.model');


const QuestionAnswer = sequelize.define('QuestionAnswer', {
    answer_ID: {  
        type: DataTypes.STRING,
        primaryKey: true
    },
    question_ID: {   
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
       
    },
    is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,  
      },
      answer_number:{
        type: DataTypes.INTEGER,
        allowNull: false,
      }
  
     
});
QuestionAnswer.belongsTo(Question, {foreignKey: 'question_ID'})
Question.hasMany(QuestionAnswer,{foreignKey: 'question_ID'})
module.exports = QuestionAnswer


