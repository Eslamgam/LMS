const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Faculty = require('./faculty.model');
const User = require('./user.model');
const CourseSemester = require('./courseSemester.model');

 
const StudentEnrollment = sequelize.define('StudentEnrollment', {
    student_ID: {  
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
  primaryKeys: ['course_cycle_ID', 'student_ID'],
});

StudentEnrollment.belongsTo(User, { foreignKey: 'student_ID' });
StudentEnrollment.belongsTo(CourseSemester, { foreignKey: 'course_cycle_ID' }); 


module.exports = StudentEnrollment
