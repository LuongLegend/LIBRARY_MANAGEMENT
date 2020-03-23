const router = require('express').Router();
const Controllers = require('../controllers/user_permisison');
router.get('/', Controllers.getPermission);
router.post('/', Controllers.addPermission);
router.delete('/:userId/permission/:permissionId', Controllers.removePermission);
module.exports = router;