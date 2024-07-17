'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')['development'];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);


// model
db.User = require('./user')(sequelize); //축약형

/* 
  const user = require('./user')
  const model = user(sequelize)
  db.User = model
*/




db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
