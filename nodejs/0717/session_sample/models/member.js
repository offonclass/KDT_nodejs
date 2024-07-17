const { DataTypes } = require('sequelize')

const member = (seq) => {

    return seq.define('member', {
        // id는 자동으로 pk, ai로 생성해줌
        userId: {
            type: DataTypes.STRING(31),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}

module.exports = member