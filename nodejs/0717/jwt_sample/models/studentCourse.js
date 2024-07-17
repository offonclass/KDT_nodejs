const { DataTypes } = require('sequelize');

const studentCourse = (seq) => {
    return seq.define('studentCourse',{
        studentId: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'student',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        courseId: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'course',
                key: 'id',
            },
            onDelete: 'CASCADE'
        }
    })
}

module.exports = studentCourse