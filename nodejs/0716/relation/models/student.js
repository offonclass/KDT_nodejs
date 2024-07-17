const { DataTypes } = require('sequelize')

const student = (seq) => {
    return seq.define('student', {
        name: {
            type: DataTypes.STRING(31),
            allowNull: false,
            
        }
    })
}

module.exports = student