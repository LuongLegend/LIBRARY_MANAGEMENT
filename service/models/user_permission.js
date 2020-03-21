const { DataTypes } = require('sequelize');
const connectDB = require('../../config/connectDB');
const user_permission = connectDB.define('user_permission', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    permission_id: {
        type: DataTypes.INTEGER
    },
    create_time: {
        type: DataTypes.INTEGER
    },
    create_by: {
        type: DataTypes.INTEGER
    }
},
    {
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'permission_id']
            }
        ],
        underscored: true
    }
);
module.exports = user_permission;