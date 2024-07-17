const { DataTypes } = require('sequelize')
const post = (seq) => {
    return seq.define('post', {
        title: {
            type: DataTypes.STRING(30),
            allowNull:false
        },
        content: DataTypes.TEXT('medium'),
    })
}

module.exports = post