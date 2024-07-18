const { DataTypes } = require('sequelize')

const profile = (seq) => {

    return seq.define('profile_study', {
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        userId: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'user_studies',
                key: 'id'
            },
            onDelete: 'CASCADE'
        }
    })
}

module.exports = profile