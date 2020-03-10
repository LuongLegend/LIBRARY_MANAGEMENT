const Sequelize = require('sequelize');
const connectDB = require('../../config/connectDB');

module.exports = connectDB.define('user',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING(255)
    },
    fullname: {
        type: Sequelize.STRING(255)
    },
    email: {
        type: Sequelize.STRING(255),
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING(60)
    },
    status: {
        type: Sequelize.INTEGER
    },
    block_message: {
        type: Sequelize.STRING(512)
    },
    block_time: {
        type: Sequelize.INTEGER
    },
    create_time: {
        type: Sequelize.INTEGER
    },
    create_by: {
        type: Sequelize.INTEGER
    }
});