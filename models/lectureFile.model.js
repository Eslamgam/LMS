const sequelize = require('./sequelize');
const { DataTypes } = require('sequelize');
const userRoles = require('../utils/userRoles');
const Lecture = require('./lecture.model');


const LectureFile = sequelize.define('LectureFile', {
    lecture_file_ID: {  
        type: DataTypes.STRING,
        primaryKey: true
    },
    lecture_ID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    lecture_file_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
LectureFile.belongsTo(Lecture, { foreignKey: 'lecture_ID' })
Lecture.hasMany(LectureFile, { foreignKey: 'lecture_ID' })
module.exports = LectureFile

