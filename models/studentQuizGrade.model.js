const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const User = require('./user.model');
const Quiz = require('./quiz.model');

const StudentQuizGrade = sequelize.define('StudentQuizGrade', {
    student_ID: {     
        type: DataTypes.STRING,
        primaryKey: true
    },
    quiz_ID: {   
        type: DataTypes.STRING,
        primaryKey: true
    },
    grade: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
   

},
{
    primaryKeys: ['student_ID', 'quiz_ID'],
}

);
StudentQuizGrade.belongsTo(User, {foreignKey: 'student_ID'})
StudentQuizGrade.belongsTo(Quiz, {foreignKey: 'quiz_ID'})

module.exports = StudentQuizGrade
