module.exports = (seq, DataTypes) => {
    return seq.define('image', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'posts',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    });
};
