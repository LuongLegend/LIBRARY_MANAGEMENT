const seneca = require('seneca')();
const Promise = require('bluebird');
const senecaAct = Promise.promisify(seneca.act, { context: seneca });
seneca.use(require('../service/user_service'))
module.exports.getAll = async (req, res, next) => {
    try {
        let result = await senecaAct(`role:user,cmd:getAll`);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.getOne = async (req, res, next) => {
    try {
        let result = await senecaAct({ role: 'user', cmd: 'getOne',userId: req.params.userId});
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.addUser = async (req, res, next) => {
    try {
        let data = { username, fullname, email, status, password } = req.body;
        data['create_time'] = Date.now();
        let result = await senecaAct({ role: 'user', cmd: 'addUser', data: data });
        res.json(result);
    } catch (err) {
        console.log(err);      
        res.json(err.message);
    }
};

module.exports.updateUser = async (req, res, next) => {
    try {
        let userId = req.params.userId;
        let data = { username, fullname, email, status } = req.body;
        let result = await senecaAct({ role: 'user', cmd: 'updateUser',userId: userId, data: data });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.blockUser = async (req, res, next) => {
    try {
        let userId = req.params.userId;
        let data = {};
        data.block_message = req.body.block_message;
        data.block_time = Date.now();
        let result = await senecaAct({ role: 'user', cmd: 'updateUser', userId: userId, data: data });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};
