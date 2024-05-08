const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const userRoles = require('../utils/userRoles');
const University = require('./univer.model');
const Faculty = require('./faculty.model');

const Semester = sequelize.define('Semester', {
    semester_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    faculty_ID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_Date: {    
        type: DataTypes.DATE,
        allowNull: false,

    },
    end_Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    years: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    semester_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

});
Semester.belongsTo(Faculty, { foreignKey: 'faculty_ID' })
Faculty.hasMany(Semester, { foreignKey: 'faculty_ID' })
module.exports = Semester