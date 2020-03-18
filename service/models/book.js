const Sequelize = require('sequelize');
const connectDB = require('../../config/connectDB');

module.exports = connectDB.define('book',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author_id: {
        type: Sequelize.INTEGER
    },
    catalog_id: {
        type: Sequelize.INTEGER
    },
    title : {
        type: Sequelize.STRING(255)
    },
    isbn : {
        type: Sequelize.STRING(20)
    },
    status: {
        type: Sequelize.TINYINT(4)
    },
    description: {
        type: Sequelize.TEXT
    },
    create_time : {
        type: Sequelize.INTEGER
    },
    create_by : {
        type: Sequelize.INTEGER
    },
    approved_time : {
        type: Sequelize.INTEGER
    },
    approved_by: {
        type: Sequelize.INTEGER
    }
});