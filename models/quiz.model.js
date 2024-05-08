const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Faculty = require('./faculty.model');
const User = require('./user.model');
const CourseSemester = require('./courseSemester.model');


const Quiz = sequelize.define('Quiz', {
    quiz_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    quiz_title: {   
        type: DataTypes.STRING,
        allowNull: false,
    },
    quiz_notes: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,  
      },
      end_date:{
        type: DataTypes.DATE,
        allowNull: false,
      },
      quiz_grade:{
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      course_cycle_ID:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      instructor_ID:{
        type: DataTypes.STRING,
        allowNull: false,
      }
     
});
Quiz.belongsTo(CourseSemester, {foreignKey: 'course_cycle_ID'})
Quiz.belongsTo(User, {foreignKey: 'instructor_ID'})
CourseSemester.hasMany(Quiz, {foreignKey: 'course_cycle_ID'})
User.hasMany(Quiz,{foreignKey: 'instructor_ID'})
module.exports = Quiz