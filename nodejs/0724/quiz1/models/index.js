'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize)
db.Rental = require('./rental')(sequelize)
db.Book = require('./book')(sequelize)

db.User.hasMany(db.Rental, {foreignkey: 'userId', onDelete: 'CASCADE'})
db.Rental.belongsTo(db.User, {foreignkey: 'userId', onDelete: 'CASCADE'})

db.Book.hasMany(db.Rental, {foreignkey: 'bookId', onDelete: 'CASCADE'})
db.Rental.belongsTo(db.Book, {foreignkey: 'bookId', onDelete: 'CASCADE'})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
