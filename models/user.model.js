const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const userRoles = require('../utils/userRoles');
const Faculty = require('./faculty.model');
const { generateRandomFourDigitNumber } = require('../controllers/auth.controller.js/sendEmail/generateRandomCode');

const User = sequelize.define('User', {
    user_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    full_name: {  
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    faculty_ID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_status: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['active', 'inactive']],
        },
        defaultValue: 'active',
    },
    user_role: {
        type: DataTypes.STRING,
        validate: {
            isIn: [[userRoles.USER, userRoles.ADMIN]],
        },
        defaultValue: userRoles.USER,
    },
    verfiyCode: {
        type: DataTypes.INTEGER,
        defaultValue: generateRandomFourDigitNumber
    },
});

User.belongsTo(Faculty, { foreignKey: 'faculty_ID' })
Faculty.hasMany(User, { foreignKey: 'faculty_ID' })
module.exports = User