const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Faculty = require('./faculty.model');
const User = require('./user.model');
const CourseSemester = require('./courseSemester.model');
const Quiz = require('./quiz.model');

 
const Question = sequelize.define('Question', {
    question_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    quiz_ID: {   
        type: DataTypes.STRING,
        allowNull: false,
    },
    question_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    question_type: {
        type: DataTypes.STRING,
        allowNull: false,  
      },
      question_number:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question_grade:{
        type: DataTypes.FLOAT,
        allowNull: false,
      },
     
});
Question.belongsTo(Quiz, {foreignKey: 'quiz_ID'})
Quiz.hasMany(Question,{foreignKey: 'quiz_ID'})
module.exports = Question