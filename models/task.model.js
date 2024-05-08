const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Faculty = require('./faculty.model');
const User = require('./user.model');
const CourseSemester = require('./courseSemester.model');



const Task = sequelize.define('Task', {
    task_ID: {   
        type: DataTypes.STRING,
        primaryKey: true
    },
    task_title: {   
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,  
      },
      task_grade:{
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      file_path:{
        type: DataTypes.STRING,
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
Task.belongsTo(CourseSemester, {foreignKey: 'course_cycle_ID'})
Task.belongsTo(User, {foreignKey: 'instructor_ID'})
CourseSemester.hasMany(Task, {foreignKey: 'course_cycle_ID'})
User.hasMany(Task,{foreignKey: 'instructor_ID'})
module.exports = Task