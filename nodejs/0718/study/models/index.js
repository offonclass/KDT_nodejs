'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize)
db.Profile = require('./profile')(sequelize)

db.User.hasOne(db.Profile, {foreignkey: 'userId', onDelete: 'CASCADE'} )
db.Profile.belongsTo(db.User, {foreignkey: 'userId', onDelete: 'CASCADE'} )

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
