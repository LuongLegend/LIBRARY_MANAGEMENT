const {DataTypes} = require('sequelize');
const connectDB = require('../../config/connectDB');
const user = connectDB.define('user',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(255),
        unique: true
    },
    fullname: {
        type: DataTypes.STRING(255)
    },
    email: {
        type: DataTypes.STRING(255),
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER
    },
    block_message: {
        type: DataTypes.STRING(512)
    },
    block_time: {
        type: DataTypes.INTEGER
    },
    create_time: {
        type: DataTypes.INTEGER
    },
    create_by: {
        type:DataTypes.INTEGER
    }
});

module.exports = user;