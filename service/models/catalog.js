const {DataTypes} = require('sequelize');
const connectDB = require('../../config/connectDB');

module.exports = connectDB.define('catalog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255)
    },
    alias: {
        type: DataTypes.STRING(255),
        unique: true
    },
    create_time: {
        type: DataTypes.INTEGER
    },
    create_by: {
        type: DataTypes.INTEGER
    },
    last_update_time: {
        type: DataTypes.INTEGER
    },
    last_update_by: {
        type: DataTypes.INTEGER
    }
});