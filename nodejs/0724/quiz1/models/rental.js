const { DataTypes } = require('sequelize')

const rental = (seq) => {

    return seq.define('rental', {
        userName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        bookName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        rentalDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        bookId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'books',
                key: 'id'
            },
            onDelete: 'CASCADE'
        }
    })
}

module.exports = rental