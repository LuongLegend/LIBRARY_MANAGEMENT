const Sequelize = require('sequelize');
const connectDB = require('../../config/connectDB');

module.exports = connectDB.define('author', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255)
    },
    description: {
        type: Sequelize.TEXT
    },
    email: {
        type: Sequelize.STRING(255)
    }
});