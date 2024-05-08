const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');


const University = sequelize.define('University', {

    university_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    university_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Logo_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },


});


module.exports = University