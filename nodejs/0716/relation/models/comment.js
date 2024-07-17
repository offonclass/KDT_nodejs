const {DataTypes} = require('sequelize')

const comment = (seq) => {
    return seq.define('comment', {
        comment: DataTypes.STRING,
        postId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'posts',
            key: 'id',
        },
        onDelete: 'CASCADE',
        },
    })
}

module.exports = comment;