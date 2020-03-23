const jwt = require('jsonwebtoken');
const { user_permission } = require('../service/models/index');
const { listNoAuthen, listPermission } = require('../constant/path');
const { PARAMS, SECRET_OR_KEY } = process.env;

function checkPath(arrCurrentPath, arrComparePath) {
    if (arrCurrentPath.length !== arrComparePath.length) return false;
    let i;
    for (i = 0; i < arrCurrentPath.length; i++) {
        if (arrCurrentPath[i] == arrComparePath[i] || arrComparePath[i] == PARAMS || arrComparePath[i].indexOf('?') !== -1)
            continue;
        else break;
    }
    return (i === arrCurrentPath.length) ? true : false;
}

module.exports = async function (req, res, next) {
    try {
        let currentPath = req.method + req.originalUrl;
        const arrCurrentPath = currentPath.split('/');
        for (let noAuthenPath of listNoAuthen) {
            let arrPathNoAuthen = noAuthenPath.split('/');
            if (checkPath(arrCurrentPath, arrPathNoAuthen)) return next();
        }
        const bearerHeader = req.headers['authorization'];//get bearerHeader
        if (bearerHeader) {
            const token = bearerHeader.split(' ')[1];
            req.token = token;
            //find permission of current Path
            let permission_id = -1;
            for (let permission in listPermission) { //permission is permission_id
                for (let permissionPath of listPermission[permission]) {
                    let arrPermissionPath = permissionPath.split('/');

                    if (checkPath(arrCurrentPath, arrPermissionPath)) {
                        permission_id = permission;
                        break;
                    }
                }
                if (permission_id !== -1) break;
            }
            //check permisison_id
            if (permission_id === -1) res.sendStatus(401);
            else {
                try {
                    let authData = await jwt.verify(req.token, SECRET_OR_KEY);
                    const { sub } = authData; //sub is userID
                    try {
                        let result = await user_permission.findOne({
                            where: {
                                user_id: sub,
                                permission_id: permission_id
                            }
                        });
                        if (!result) res.sendStatus(401);
                        else {
                            req.id = sub;
                            return next();
                        }
                    } catch (err) {
                        console.log(err);
                        return res.status(403).json(err.message);
                    }
                } catch (err) {
                    console.log(err);
                    res.status(401).json(err.message);
                }
            }
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        console.log(err);
        res.status(403);
    }
}