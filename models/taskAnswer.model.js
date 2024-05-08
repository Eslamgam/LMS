const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Faculty = require('./faculty.model');
const User = require('./user.model');
const CourseSemester = require('./courseSemester.model');
const Task = require('./task.model');



const TaskAnswer = sequelize.define('TaskAnswer', {
    answer_ID: {     
        type: DataTypes.STRING,
        primaryKey: true
    },
    task_ID: {   
        type: DataTypes.STRING,
        allowNull: false,
    },
    student_ID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,  
      },
      task_answer_status:{
        type: DataTypes.STRING,
        defaultValue: 'PENDING'
      },
      task_answer_grade:{
        type: DataTypes.FLOAT,
        allowNull: false,
      },  
});
TaskAnswer.belongsTo(Task, {foreignKey: 'task_ID'})
TaskAnswer.belongsTo(User, {foreignKey: 'student_ID'})
Task.hasMany(TaskAnswer, {foreignKey: 'task_ID'})
User.hasMany(TaskAnswer,{foreignKey: 'student_ID'})
module.exports = TaskAnswer

