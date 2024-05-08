const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Semester = require('./semester.model');
const Course = require('./course.model');


const CourseSemester = sequelize.define('CourseSemester', {
    cycle_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    semester_ID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    course_ID: {
        type: DataTypes.STRING,
        allowNull: false,

    },
});
CourseSemester.belongsTo(Semester, { foreignKey: 'semester_ID' })
CourseSemester.belongsTo(Course, { foreignKey: 'course_ID' })
Semester.hasMany(CourseSemester, { foreignKey: 'semester_ID' })
Course.hasMany(CourseSemester, { foreignKey: 'course_ID' })
module.exports = CourseSemester