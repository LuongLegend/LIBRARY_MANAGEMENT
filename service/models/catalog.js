const Sequelize = require('sequelize');
const connectDB = require('../../config/connectDB');

module.exports = connectDB.define('catalog', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(255)
    },
    alias: {
        type: Sequelize.STRING(255)
    },
    create_time: {
        type: Sequelize.INTEGER
    },
    create_by: {
        type: Sequelize.INTEGER
    },
    last_update_time: {
        type: Sequelize.INTEGER
    },
    last_update_by: {
        type: Sequelize.INTEGER
    }
});