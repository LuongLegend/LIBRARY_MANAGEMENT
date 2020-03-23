const seneca = require('seneca')();
const Promise = require('bluebird');
const senecaAct = Promise.promisify(seneca.act, { context: seneca });
seneca.use(require('../service/user_permission_service'));
module.exports.getPermission = async (req, res, next) => {
    try {
        let result = await senecaAct({ role: 'permission', cmd: 'getPermission' });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.addPermission = async (req, res, next) => {
    try {
        let { user_id, permission_id } = req.body;
        let data = { user_id, permission_id };
        let result = await senecaAct({ role: 'permission', cmd: 'addPermission', data: data });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};

module.exports.removePermission = async (req, res, next) => {
    try {
        let { userId, permissionId } = req.params;
        let result = await senecaAct({ role: 'permission', cmd: 'removePermission', userId: userId, permissionId: permissionId });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
};