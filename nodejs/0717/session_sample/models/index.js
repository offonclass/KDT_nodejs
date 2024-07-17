'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);


// 모델
db.Member = require('./member')(sequelize)
db.Profile = require('./profile')(sequelize)


// 1:1관계
db.Member.hasOne(db.Profile, { foreignkey: 'memberId', onDelete: 'CASCADE' })
// foreignkey: 'memberId' : Profile 모델에서 참조하는 외래키
db.Profile.belongsTo(db.Member, { foreinkey: 'memberId', onDelete: 'CASCADE' })




db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
