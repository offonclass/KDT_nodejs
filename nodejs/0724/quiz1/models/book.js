const { DataTypes } = require('sequelize')

const book = (seq) => {

    return seq.define('book', {
        bookName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        author: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        publishDate: {
            type: DataTypes.DATE,
            allowNull: false
        },

        exist: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    })
}

module.exports = book