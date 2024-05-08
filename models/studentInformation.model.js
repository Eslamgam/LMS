const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const userRoles = require('../utils/userRoles');
const University = require('./univer.model');
const User = require('./user.model');
const Department = require('./department.model');

const StudentInformation = sequelize.define('StudentInformation', {
    academic_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    user_ID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    department_ID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    student_level: {
        type: DataTypes.INTEGER,
        allowNull: false,  
      },
});


StudentInformation.belongsTo(User, { foreignKey: 'user_ID' }); 
StudentInformation.belongsTo(Department, { foreignKey: 'department_ID' }); 
User.hasMany(StudentInformation, { foreignKey: 'user_ID' }); 
Department.hasMany(StudentInformation, { foreignKey: 'department_ID' }); 

module.exports = StudentInformation