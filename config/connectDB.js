require('dotenv').config();
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
}, {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.log('Unable to connect the database: ' + err));
sequelize.sync();

module.exports = sequelize;