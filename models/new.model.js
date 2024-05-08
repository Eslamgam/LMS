const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const Faculty = require('./faculty.model');
const User = require('./user.model');
const New = sequelize.define('New', {
    new_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    content: {   
        type: DataTypes.STRING,
        allowNull: false,
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_ID: {
        type: DataTypes.STRING,
        allowNull: false,  
      },
      faculty_ID:{
        type: DataTypes.STRING,
        allowNull: false,
      }
     
});
New.belongsTo(Faculty, {foreignKey: 'faculty_ID'})
New.belongsTo(User, {foreignKey: 'user_ID'})
Faculty.hasMany(New, {foreignKey: 'faculty_ID'})
User.hasMany(New,{foreignKey: 'user_ID'})
module.exports = New