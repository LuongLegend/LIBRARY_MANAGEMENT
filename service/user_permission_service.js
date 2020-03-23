const { user_permission, user } = require('./models/index');
const { Op } = require('sequelize');
module.exports = function (options) {
    this.add('role:permission,cmd:getPermission', getPermission);
    this.add('role:permission,cmd:addPermission', addPermission);
    this.add('role:permission,cmd:removePermission', removePermission);

    async function getPermission(msg, reply) {
        try {
            let result = await user.findAll({
                include: {
                    model: user_permission,
                    attributes: ['permission_id', 'create_by', 'create_time'],
                    required: true //INNER JOIN
                },
                where: {
                    status: {
                        [Op.gte]: 0
                    }
                }
            });
            reply(null, result);
        } catch (err) {
            console.log(err);
            reply(err);
        }
    }

    async function addPermission(msg, reply) {
        try {
            let { data } = msg;
            let result = await user_permission.create(data);
            reply(null, { msg: 'add Permission successfully', result });
        } catch (err) {
            console.log(err);
            reply(err);
        }
    }

    async function removePermission(msg, reply) {
        try {
            let { userId, permissionId } = msg;
            let result = await user_permission.destroy({
                where: {
                    user_id: userId,
                    permission_id: permissionId
                }
            });
            reply(null, {msg: `removed completely! user: ${userId}, permission: ${permissionId}`});
        } catch (err) {
            console.log(err);
            reply(err);
        }
    }
}