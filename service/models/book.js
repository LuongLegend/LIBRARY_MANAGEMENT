const {DataTypes} = require('sequelize');
const connectDB = require('../../config/connectDB');

module.exports = connectDB.define('book',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author_id: {
        type: DataTypes.INTEGER
    },
    catalog_id: {
        type: DataTypes.INTEGER
    },
    title : {
        type: DataTypes.STRING(255)
    },
    isbn : {
        type: DataTypes.STRING(20)
    },
    status: {
        type: DataTypes.TINYINT(4)
    },
    description: {
        type: DataTypes.TEXT
    },
    create_time : {
        type: DataTypes.INTEGER
    },
    create_by : {
        type: DataTypes.INTEGER
    },
    approved_time : {
        type: DataTypes.INTEGER
    },
    approved_by: {
        type: DataTypes.INTEGER
    }
},{
    underscored: true
});