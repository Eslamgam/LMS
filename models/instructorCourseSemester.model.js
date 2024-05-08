const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Faculty = require('./faculty.model');
const User = require('./user.model');
const CourseSemester = require('./courseSemester.model');


const InstructorCourseSemester = sequelize.define('InstructorCourseSemester', {
  instructor_ID: {   
    type: DataTypes.STRING(50), 
    primaryKey:true,
    allowNull: false,          
  },
  course_cycle_ID: {
    type: DataTypes.STRING(50), 
    primaryKey:true,
    allowNull: false,           
  },
  
}, {
  primaryKeys: ['course_cycle_ID', 'instructor_ID'], 
});

InstructorCourseSemester.belongsTo(User, { foreignKey: 'instructor_ID' }); 
InstructorCourseSemester.belongsTo(CourseSemester, { foreignKey: 'course_cycle_ID' }); 


module.exports = InstructorCourseSemester
