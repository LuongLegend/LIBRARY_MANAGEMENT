const router = require('express').Router();
const Controllers = require('../controllers/user');
router.get('/',Controllers.getAll);
router.get('/:userId', Controllers.getOne);
router.post('/', Controllers.addUser);
router.put('/:userId', Controllers.updateUser);
router.put('/:userId/block', Controllers.blockUser);
module.exports = router;