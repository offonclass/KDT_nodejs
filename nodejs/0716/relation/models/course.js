const {DataTypes} = require('sequelize')
const course = (seq) => {
    return seq.define('course', {
        title: {
            type: DataTypes.STRING(31),
            allowNull: false,
        },
        
    })
}

module.exports = course;
