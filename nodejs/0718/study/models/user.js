const { DataTypes } = require('sequelize')

const user = (seq) => {

    return seq.define('user_study', {
        userId: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    })
}

module.exports = user

