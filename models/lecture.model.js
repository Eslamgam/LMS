const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const userRoles = require('../utils/userRoles');
const Faculty = require('./faculty.model');
const CourseSemester = require('./courseSemester.model');

const Lecture = sequelize.define('Lecture', {
    lecture_ID: {   
        type: DataTypes.STRING,
        primaryKey: true
    },
    course_cycle_ID: {   
        type: DataTypes.STRING,
        allowNull: false,
    },
    lecture_title: { 
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    lecture_type: {
        type: DataTypes.STRING,
        allowNull: false,  
      },
});
Lecture.belongsTo(CourseSemester, {foreignKey: 'course_cycle_ID'})
CourseSemester.hasMany(Lecture, {foreignKey: 'course_cycle_ID'})
module.exports = Lecture