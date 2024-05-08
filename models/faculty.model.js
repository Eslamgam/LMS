const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const userRoles = require('../utils/userRoles');
const University = require('./univer.model');

const Faculty = sequelize.define('Faculty', {
    faculty_ID: { 
        type: DataTypes.STRING,
        primaryKey: true
    },
    university_ID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    faculty_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    levels: {
        type: DataTypes.INTEGER,
        allowNull: false,  
      },
      Logo_path:{
        type: DataTypes.STRING,
        allowNull: false,
      }
});
Faculty.belongsTo(University, {foreignKey: 'university_ID'})
University.hasMany(Faculty, {foreignKey: 'university_ID'})
module.exports = Faculty