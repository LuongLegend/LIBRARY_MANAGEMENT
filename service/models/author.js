const {DataTypes} = require('sequelize');
const connectDB = require('../../config/connectDB');

module.exports = connectDB.define('author', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255)
    },
    description: {
        type: DataTypes.TEXT
    },
    email: {
        type: DataTypes.STRING(255)
    }
});