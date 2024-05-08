const Faculty = require('./faculty.model');
const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');

const Department = sequelize.define('Department', {
    department_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    faculty_ID: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true
    },
    department_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});
Department.belongsTo(Faculty, { foreignKey: 'faculty_ID' })
Faculty.hasMany(Department, { foreignKey: 'faculty_ID' })
module.exports = Department