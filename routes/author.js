const router = require('express').Router();
const Controllers = require('../controllers/author');
router.post('/', Controllers.addAuthor);
router.put('/:id', Controllers.updateAuthor);
router.get('/:id', Controllers.getAnAuthor);
router.get('/', Controllers.getOrFindAuthor);
module.exports = router;