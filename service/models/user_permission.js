const Sequelize = require('sequelize');
const connectDB = require('../../config/connectDB');

module.exports = connectDB.define('user_permission', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    permission_id: {
        type: Sequelize.INTEGER
    },
    create_time: {
        type: Sequelize.INTEGER
    },
    create_by: {
        type: Sequelize.INTEGER
    }
},
    {
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'permission_id']
            }
        ]
    }
);