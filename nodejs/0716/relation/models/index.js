'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);


// 모델
db.Member = require('./member')(sequelize)
db.Profile = require('./profile')(sequelize)
db.Post = require('./post')(sequelize)
db.Comment = require('./comment')(sequelize)
db.Student = require('./student')(sequelize)
db.Course = require('./course')(sequelize)
db.StudentCourse = require('./studentCourse')(sequelize)

// 1:1관계
db.Member.hasOne(db.Profile, { foreignkey: 'memberId', onDelete: 'CASCADE' })
// foreignkey: 'memberId' : Profile 모델에서 참조하는 외래키
db.Profile.belongsTo(db.Member, { foreinkey: 'memberId', onDelete: 'CASCADE' })

// 1:다

db.Post.hasMany(db.Comment)
db.Comment.belongsTo(db.Post)
// db.Post.hasMany(db.Comment, {foreignkey: 'postId', onDelete: 'CASCADE'})
// db.Comment.belongsTo(db.Post, {foreignkey: 'postId', onDelete: 'CASCADE'})

// 다:다
db.Student.belongsToMany(db.Course, {through: db.StudentCourse, foreignkey: 'studentId', onDelete: 'CASCADE'})
db.Course.belongsToMany(db.Student, {through: db.StudentCourse, foreignkey: 'courseId', onDelete: 'CASCADE'})


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
