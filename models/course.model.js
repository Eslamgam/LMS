const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const userRoles = require('../utils/userRoles');
const Faculty = require('./faculty.model');

const Course = sequelize.define('Course', {
    course_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    course_name: {    
        type: DataTypes.STRING,
        allowNull: false,
    },
    course_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    image_path: {
        type: DataTypes.STRING,
        allowNull: false,  
        
      },
      faculty_ID:{
        type: DataTypes.STRING,
        allowNull: false,
      }
     
});
Course.belongsTo(Faculty, {foreignKey: 'faculty_ID'})
Faculty.hasMany(Course, {foreignKey: 'faculty_ID'})
module.exports = Course