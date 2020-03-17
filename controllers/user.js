const seneca = require('seneca')();
seneca
    .use(require('../service/user_service'))

module.exports.getAll = (req, res, next) => {
    seneca.act(`role:user,cmd:getAll`, (err, result) => {
        if (err) {
            console.log(err);
            res.json(err.message);
        } else {
            res.json(result);
        }
    });
};
module.exports.getOne = (req, res, next) => {
    seneca.act(`role:user,cmd:getOne,userId:${req.params.userId}`, (err, result) => {
        if (err) {
            console.log(err);
            res.json(err.message);
        } else {
            res.json(result);
        }
    });
}
module.exports.addUser = (req, res, next) => {
    let infor = { username, fullname, email, status, password } = req.body;
    infor['create_time'] = Date.now();
    seneca.act({ role: 'user', cmd: 'addUser', infor: infor }, (err, result) => {
        if (err) {
            console.log(err);
            res.json(err.message);
        } else {
            console.log(result);
            res.json({ msg: "created a new user", result });
        }
    })
}

module.exports.updateUser = (req, res, next) => {
    let userId = req.params.userId;
    let infor = { username, fullname, email, status }
        = req.body;
    seneca.act({ role: 'user', cmd: 'updateUser', userId: userId, infor: infor }, (err, result) => {
        if (err) {
            console.log(err);
            res.json(err.message);
        } else {
            res.json(result);
        }
    });
}

module.exports.blockUser = (req, res, next) => {
    let userId = req.params.userId;
    let {block_message} = req.body;
    let block_time = Date.now();
    let infor = {};
    infor.block_message = block_message;
    infor.block_time = block_time
    
    seneca.act({ role: 'user', cmd: 'blockUser', userId: userId,infor:infor }, (err,result) => {
        if (err) {
            console.log(err);
            res.json(err.message);
        } else {
            res.json(result);
        }
    });
}