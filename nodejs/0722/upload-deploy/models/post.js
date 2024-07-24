module.exports = (seq, DataTypes) => {
    return seq.define('post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: DataTypes.TEXT('medium'),
    });
};
