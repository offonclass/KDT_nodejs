const { DataTypes } = require('sequelize');

const member = (seq) => {
    return seq.define('member', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //not null
            primaryKey: true,
            autoIncrement: true,
        },
        userid: {
            type: DataTypes.STRING(31),
            allowNull: false,
        },
        pw: {
            type: DataTypes.STRING(127),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(31),
            allowNull: false,
        },
    });
};

module.exports = member;
